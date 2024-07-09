import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({ providedIn: 'root' })
export class TasksService {
   private msg = inject(LoggingService);
   private tasks = signal<Task[]>([]);
   allTasks = this.tasks.asReadonly();

   getNewId() {
      const len = this.tasks().length;
      let lastId = 0;
      if (len > 0) {
         lastId = this.tasks()[0].id;
      }
      return Math.floor(lastId + 1);
   }
   addTask(data: {title: string, description: string}) {
      const newTask: Task = {
         ...data,
         id: this.getNewId(),
         status: 'OPEN'
      };
      this.tasks.update((oldTasks) => [newTask, ...oldTasks]);
      this.msg.log('new task added: ' + data.title);
   }
   updateTaskStatus(id: number, status: TaskStatus) {
      const i = this.tasks().findIndex(t => t.id === id);
      this.tasks.update(oldTasks => oldTasks.map(task => task.id === id ? { ...task, status }: task));
      this.msg.log('task ' + id + ' updated to ' + status);
   }


}