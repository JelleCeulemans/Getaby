import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuth } from 'src/app/models/user-auth.model';
import { Store } from '@ngrx/store';
import * as fromAuth from '../auth.reducer';
import * as AuthActions from '../auth.actions';
import * as fromRole from '../role.reducer';
import * as RoleActions from '../role.actions';
import * as fromRoot from '../../../app.reducer';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private store: Store<{ ui: fromAuth.State, us: fromRole.State }>,
    private localStorageService: LocalStorageService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      employeeNumber: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] })
    });
  }

  submit() {
    const { employeeNumber, password } = this.loginForm.value;
    this.authService.authenticate(new UserAuth(employeeNumber, password)).subscribe(result => {
      if (result.role.name === 'Supervisor') {
        this.store.dispatch(new AuthActions.SetAuthenticated());
        this.store.dispatch(new RoleActions.SetSupervisor());
        this.localStorageService.setToken(result.token);
        this.router.navigate(['/dashboard']);
      } else if (result.role.name === 'Admin') {
        this.store.dispatch(new AuthActions.SetAuthenticated());
        this.store.dispatch(new RoleActions.SetAdmin());
        this.localStorageService.setToken(result.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.store.dispatch(new AuthActions.SetUnauthenticated());
        this.store.dispatch(new RoleActions.SetLogout());
      }
    }, error => console.log(error));
  }
}
