import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArchiveComponent } from './components/admin/archive/archive.component';
import { Role } from './models/role.enum';
import { AuthGuard } from './components/auth/auth.guard';
import { TrespassComponent } from './components/trespass/trespass.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { CameraComponent } from './components/admin/camera/camera.component';
import { CompanyComponent } from './components/admin/company/company.component';
import { SiteComponent } from './components/admin/site/site.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PdfGeneratorComponent } from './components/pdf-generator/pdf-generator.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/archief', component: ArchiveComponent, canActivate: [AuthGuard], data: {role: Role.Admin}},
  { path: 'admin/GebruikerLijst', component: UserListComponent, canActivate: [AuthGuard], data: {role: Role.Admin} },
  { path: 'admin/archief', component: ArchiveComponent, canActivate: [AuthGuard], data: {role: Role.Admin}  },
  { path: 'admin/GebruikerLijst', component: UserListComponent, canActivate: [AuthGuard], data: {role: Role.Admin}  },
  { path: 'trespass', component: TrespassComponent, canActivate: [AuthGuard] },
  { path: 'camera', component: CameraComponent, canActivate: [AuthGuard] },
  { path: 'admin/site', component: SiteComponent, canActivate: [AuthGuard], data: {role: Role.Admin} },
  { path: 'admin/bedrijf', component: CompanyComponent, canActivate: [AuthGuard], data: {role: Role.Admin}},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: 'outprint', component: PdfGeneratorComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]

})
export class AppRoutingModule { }
