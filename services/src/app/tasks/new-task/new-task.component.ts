import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  private tasksService = inject(TasksServiceToken);

  onAddTask(title: string, description: string) {
    const data = {
      title,
      description
    };
    this.tasksService.addTask(data);
    this.formEl()?.nativeElement.reset();
  }
}
