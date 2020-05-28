import { RoleActions, SUPERVISOR, ADMIN, LOGOUT } from './role.actions';

export interface State {
  Supervisor: boolean;
  Admin: boolean;
}

const initialState: State = {
  Supervisor: false,
  Admin: false
};

export function roleReducer(state = initialState, action: RoleActions) {
  switch (action.type) {
    case SUPERVISOR:
      return {
        Supervisor: true,
        Admin: false
      };
    case ADMIN:
      return {
        Supervisor: false,
        Admin: true
      };
    case LOGOUT:
        return {
          Supervisor: false,
          Admin: false
        };
    default: {
      return state;
    }
  }
}

export const getWhichRole = (state: State) => state;
