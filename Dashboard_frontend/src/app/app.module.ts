import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchiveComponent } from './components/admin/archive/archive.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { TrespassComponent } from './components/trespass/trespass.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { CameraComponent } from './components/admin/camera/camera.component';
import { NameFilterPipe } from './filters/nameFilter.pipe';
import { DateFilterPipe } from './filters/dateFilter.pipe';
import { SiteComponent } from './components/admin/site/site.component';
import { ChartsModule } from 'ng2-charts';
import { CompanyComponent } from './components/admin/company/company.component';
import { AuthGuard} from './components/auth/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { PdfGeneratorComponent } from './components/pdf-generator/pdf-generator.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ArchiveComponent,
    TrespassComponent,
    UserListComponent,
    CameraComponent,
    NameFilterPipe,
    DateFilterPipe,
    SiteComponent,
    CompanyComponent,
    PageNotFoundComponent,
    ForbiddenComponent,
    PdfGeneratorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NgbModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
