import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './components/auth/auth.reducer';
import * as fromRole from './components/auth/role.reducer';

// This reducer will is the access point to check if the user is authenticated or not.
export interface State {
    auth: fromAuth.State;
    role: fromRole.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.authReducer,
    role: fromRole.roleReducer
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

export const getRoleState = createFeatureSelector<fromRole.State>('role');
export const getWhichRole = createSelector(getRoleState, fromRole.getWhichRole);
