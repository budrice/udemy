import { Routes } from '@angular/router';

import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';
import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage]
  },
];


// import { Routes } from "@angular/router";
// import { TasksComponent } from "../tasks/tasks.component";
// import { NewTaskComponent } from "../tasks/new-task/new-task.component";

// export const routes : Routes = [         
//    {
//       path: '',
//       redirectTo: 'tasks',
//       pathMatch: 'prefix'
//    },
//    {
//       path:'tasks',
//       component: TasksComponent
//    },
//    {
//       path:'tasks/new',
//       component: NewTaskComponent
//    }
// ];

