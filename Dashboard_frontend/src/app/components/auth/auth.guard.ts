import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuth: boolean;
  hasRightRole: boolean;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (route.data.role) {
          this.store.select(fromRoot.getWhichRole).pipe(take(1)).subscribe(result => {
            return result[route.data.role] ? resolve(true) : this.router.navigate(['/forbidden']);
          });
        } else {
          this.store.select(fromRoot.getIsAuth).pipe(take(1)).subscribe(result => {
            return result ? resolve(true) : this.router.navigate(['/forbidden']);
          });
        }
      }, 150);
    });
  }
}
