import {
  Component,
  inject,
  input,
} from '@angular/core';
import { ResolveFn, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userTasks = input.required<Task[]>();
  userId = input.required<string>();
  order = input<'asc' | 'desc' | undefined>();
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  _routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      task => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};






// import {
//   Component,
//   computed,
//   DestroyRef,
//   inject,
//   input,
//   OnInit,
//   signal,
// } from '@angular/core';

// import { TaskComponent } from './task/task.component';
// import { TasksService } from './tasks.service';
// import {
//   ActivatedRoute,
//   RouterLink,
// } from '@angular/router';

// @Component({
//   selector: 'app-tasks',
//   standalone: true,
//   templateUrl: './tasks.component.html',
//   styleUrl: './tasks.component.css',
//   imports: [TaskComponent, RouterLink],
// })
// export class TasksComponent implements OnInit {
//   private tasksService = inject(TasksService);
//   private activatedRoute = inject(ActivatedRoute);
//   private destroy = inject(DestroyRef);

//   userId = input.required<string>();
//   userTasks = computed(() =>
//     this.tasksService.allTasksById(this.userId()).sort((a, b) => {
//       if (this.order() === 'desc') {
//         return a.id > b.id ? -1 : 1;
//       } else {
//         return a.id > b.id ? 1 : -1;
//       }
//     })
//   );
//   order = signal<'asc' | 'desc'>('desc');

//   ngOnInit(): void {
//     const sub = this.activatedRoute.queryParams.subscribe({
//       next: (params) => this.order.set(params['order']),
//     });
//     this.destroy.onDestroy(() => sub.unsubscribe());
//   }
//   // private tasksService = inject(TasksService);
//   // private activatedRoute = inject(ActivatedRoute);
//   // private destroy = inject(DestroyRef);

//   // id = signal<string>('');
//   // userTasks: Task[] = [];
//   // ngOnInit(): void {
//   //   const sub = this.activatedRoute.paramMap.subscribe({
//   //     next: (paramMap) => {
//   //       this.id.update(() => paramMap.get('userId') || '');
//   //       this.userTasks = this.tasksService.allTasksById(this.id());
//   //       console.log(paramMap.get('userId'));
//   //     }
//   //   });
//   //   this.destroy.onDestroy(() => {
//   //     sub.unsubscribe();
//   //   });
//   // }
// }
