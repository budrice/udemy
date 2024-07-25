import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveTitle, resolveUsername, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, _segments) => {
  const router = inject(Router);
  // run code to determine if can access. It could be an html call to a server or what have you.
  return true // boolean - you can return false but it is better to redirect
  // return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'Easy Task'
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    // static data
    data: {
      message: 'hello',
    },
    // dynamic data
    resolve: {
      username: resolveUsername
    },
    title: resolveTitle
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

