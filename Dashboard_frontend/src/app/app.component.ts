import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleDefining } from './models/role-defining.model';
import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';
import { LocalStorageService } from './services/local-storage.service';
import * as AuthActions from './components/auth/auth.actions';
import * as RoleAction from './components/auth/role.actions';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Role } from './models/role.enum';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dashboardFrontend';
  isAuthenticated$: Observable<boolean>;
  roles$: Observable<RoleDefining>;
  client: any;
  option: any;
  user: string;

  constructor(
    private store: Store<fromRoot.State>,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router,
    public location: Location) {
  }

  ngOnInit() {
    this.autoLogin();
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
    this.roles$ = this.store.select(fromRoot.getWhichRole);
    const tokenObject = this.localStorageService.getTokenObject();
    this.user = tokenObject ? tokenObject.Name : '';
  }

  autoLogin() {
    const userId = this.localStorageService.getUserId();
    if (userId) {
      // FIX THE NAVIGATE TO LOGIN!!
      const path = window.location.pathname;
      this.store.dispatch(new AuthActions.SetAuthenticated());
      this.userService.getUserById(userId).subscribe(result => {
        if (result.role.name === Role.Supervisor) {
          this.store.dispatch(new RoleAction.SetSupervisor());
        } else if (result.role.name === Role.Admin) {
          this.store.dispatch(new RoleAction.SetAdmin());
        }
        this.router.navigate([this.location.path()]);
      });
    }
  }

  logout() {
    this.store.dispatch(new RoleAction.SetLogout());
    this.store.dispatch(new AuthActions.SetUnauthenticated());
    this.localStorageService.removeToken();
    this.router.navigate(['']);
  }
}
