import { Action } from '@ngrx/store';

export const SUPERVISOR = 'Supervisor';
export const ADMIN = 'Admin';
export const LOGOUT = 'Logout';


export class SetSupervisor implements Action {
  readonly type = SUPERVISOR;
}

export class SetAdmin implements Action {
  readonly type = ADMIN;
}

export class SetLogout implements Action {
  readonly type = LOGOUT;
}

export type RoleActions = SetSupervisor | SetAdmin | SetLogout;
