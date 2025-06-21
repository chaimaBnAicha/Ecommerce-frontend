// Core Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Plugin Modules
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from "ng-apexcharts";
import { CountUpModule } from 'ngx-countup';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// import { AppointmentModule } from '../components/modules/appointment/appointment.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { SwiperModule } from "swiper/angular";
import { BarRatingModule } from 'ngx-bar-rating';
import { NgDragDropModule } from 'ng-drag-drop';






FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])
//sss

// Components
import { DashboardComponent } from './dashboard/dashboard.component';

// Modules
import { ViewsRoutingModule } from './views-routing.module';
import { QompacUiModule } from 'src/app/FrontOffice/components/qompac-ui/qompac-ui.module';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { Error404Component } from './utilities/error404/error404.component';
import { Error500Component } from './utilities/error500/error500.component';
import { MaintenanceComponent } from './utilities/maintenance/maintenance.component';
import { AdminComponent } from './admin/admin.component';
import { IndexHorizontalComponent } from './index-horizontal/index-horizontal.component';
import { IndexDualCompactComponent } from './index-dual-compact/index-dual-compact.component';
import { IndexBoxedComponent } from './index-boxed/index-boxed.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ConfirmMailComponent } from './auth/confirm-mail/confirm-mail.component';
import { LockScreenComponent } from './auth/lock-screen/lock-screen.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { TwoFactorComponent } from './auth/two-factor/two-factor.component';
import { AccountDeactivateComponent } from './auth/account-deactivate/account-deactivate.component';
import { ProjetListComponent } from './projets/projet-list/projet-list.component';
import { ProjetAddComponent } from './projets/projet-add/projet-add.component';
import { ProjetDetailsComponent } from './projets/projet-details/projet-details.component';
import { ActionListComponent } from './actions/action-list/action-list.component';
import { ActionAddComponent } from './actions/action-add/action-add.component';
import { ActionDetailsComponent } from './actions/action-details/action-details.component';

import { CreateAdminComponent } from './admin/create-admin/create-admin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UserAddComponent,
    UserListComponent,
    Error404Component,
    Error500Component,
    MaintenanceComponent,
    AdminComponent,
    IndexHorizontalComponent,
    IndexDualCompactComponent,
    IndexBoxedComponent,
    SignInComponent,
    SignUpComponent,
    ConfirmMailComponent,
    LockScreenComponent,
    RecoverPasswordComponent,
    TwoFactorComponent,
    AccountDeactivateComponent,
    ProjetListComponent,
    ProjetAddComponent,
    ProjetDetailsComponent,
    ActionListComponent,
    ActionAddComponent,
    ActionDetailsComponent,
    CreateAdminComponent,





  ],
  imports: [
    CommonModule,
    QompacUiModule,
    NgbModule,
    NgApexchartsModule,
    ViewsRoutingModule,
    FormsModule,
    Ng2FlatpickrModule,
    CountUpModule,
    Ng2SearchPipeModule,
    // AppointmentModule,
    FullCalendarModule,
    SwiperModule,
    BarRatingModule,
    NgDragDropModule.forRoot()
  ],
  exports: [
    DashboardComponent,
    QompacUiModule,
    UserProfileComponent,
    UserAddComponent,
    UserListComponent,
    Error404Component,
    Error500Component,
    MaintenanceComponent,
    AdminComponent,
    IndexHorizontalComponent,
    IndexDualCompactComponent,
    IndexBoxedComponent,
    SignInComponent,
    SignUpComponent,
    ConfirmMailComponent,
    LockScreenComponent,
    RecoverPasswordComponent,
    TwoFactorComponent,
    AccountDeactivateComponent,
    ProjetListComponent,
    ProjetAddComponent,
    ProjetDetailsComponent,
    ActionListComponent,
    ActionAddComponent,
    ActionDetailsComponent,




  ]
})
export class ViewsModule { }
