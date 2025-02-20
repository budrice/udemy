import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

import { Task, TASK_STATUS_OPTIONS, TaskStatus } from '../../task.model';
import { TasksServiceToken } from '../../../../main';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  private tasksService = inject(TasksServiceToken);
  task = input.required<Task>();
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);  
  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(id: number, newStatus: string) {
    let status: TaskStatus = 'OPEN';

    switch (newStatus) {
      case 'open':
        status = 'OPEN';
        break;
      case 'in-progress':
        status = 'IN_PROGRESS';
        break;
      case 'done':
        status = 'DONE';
        break;
      default:
        break;
    }

    this.tasksService.updateTaskStatus(id, status);
  }
}
