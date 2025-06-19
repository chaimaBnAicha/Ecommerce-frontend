import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { Error404Component } from '../../views/utilities/error404/error404.component';
import { Error500Component } from '../../views/utilities/error500/error500.component';
import { MaintenanceComponent } from '../../views/utilities/maintenance/maintenance.component';
import { SignInComponent } from '../../views/auth/sign-in/sign-in.component';
import { SignUpComponent } from '../../views/auth/sign-up/sign-up.component';
import { ConfirmMailComponent } from '../../views/auth/confirm-mail/confirm-mail.component';
import { LockScreenComponent } from '../../views/auth/lock-screen/lock-screen.component';
import { RecoverPasswordComponent } from '../../views/auth/recover-password/recover-password.component';
import { TwoFactorComponent } from '../../views/auth/two-factor/two-factor.component';
import { AccountDeactivateComponent } from '../../views/auth/account-deactivate/account-deactivate.component';



const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'utilities/error404',
        component: Error404Component,
        data: {routeName: 'utilities.error404', pageTitle:'Error404'}
      },
      {
        path: 'utilities/error500',
        component: Error500Component,
        data: {routeName: 'utilities.error500', pageTitle:'Error500'}
      },
      {
        path: 'utilities/maintenance',
        component: MaintenanceComponent,
        data: {routeName: 'utilities.maintenance', pageTitle:'Maintenance'}
      },
      {
        path: 'auth/sign-in',
        component: SignInComponent,
        data: {routeName: 'auth.sign-in', pageTitle:'Sign In'}
      },
      {
        path: 'auth/sign-up',
        component: SignUpComponent,
        data: {routeName: 'auth.sign-up', pageTitle:'Sign Up'}
      },
      {
        path: 'auth/confirm-mail',
        component: ConfirmMailComponent,
        data: {routeName: 'auth.confirm-mail', pageTitle:'Confirm Mail'}
      },
      {
        path: 'auth/lock-screen',
        component: LockScreenComponent,
        data: {routeName: 'auth.lock-screen', pageTitle:'Lock Screen'}
      },
      {
        path: 'auth/recover-password',
        component: RecoverPasswordComponent,
        data: {routeName: 'auth.recover-password', pageTitle:'Recover Password'}
      },
      {
        path: 'auth/two-factor',
        component: TwoFactorComponent,
        data: {routeName: 'auth.two-factor', pageTitle:'Two Factor'}
      },
      {
        path: 'auth/account-deactivate',
        component: AccountDeactivateComponent,
        data: {routeName: 'auth.account-deactivate', pageTitle:'Account Deactivater'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleRoutingModule { }
