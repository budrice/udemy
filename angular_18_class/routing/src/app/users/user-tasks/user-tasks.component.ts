import {
  Component,
  inject,
  input
} from '@angular/core';


import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class UserTasksComponent {
  username = input.required<string>();
}
export const resolveUsername: ResolveFn<string> = (
  activatedRoute,
  _routerState
) => {
  const usersService = inject(UsersService);
  const username = usersService
    .allUsers()
    .find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name;
  return username || '';
};
export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
) => {
  console.log(resolveUsername(activatedRoute, routerState) + '\'s Tasks');
  return resolveUsername(activatedRoute, routerState) + '\'s Tasks';
}
