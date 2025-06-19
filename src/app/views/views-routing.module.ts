import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AdminComponent } from './admin/admin.component';
import { ProjetListComponent } from './projets/projet-list/projet-list.component';
import { ProjetAddComponent } from './projets/projet-add/projet-add.component';
import { ActionListComponent } from './actions/action-list/action-list.component';
import { ActionAddComponent } from './actions/action-add/action-add.component';
import { ActionDetailsComponent } from './actions/action-details/action-details.component';
import { ProjetDetailsComponent } from './projets/projet-details/projet-details.component';

const routes: Routes = [
  // Component Routes
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {routeName: 'default.dashboard', pageTitle:'Tableau de bord'}
  },
  {
    path: 'projets/projet-list',
    component: ProjetListComponent,
    data: {routeName: 'projets.projet-list', pageTitle:'Liste Projets'}
  },
  {
    path: 'projets/projet-add',
    component: ProjetAddComponent,
    data: {routeName: 'projets.projet-add', pageTitle:'Ajouter Projet'}
  },
  {
    path: 'projets/projet-details',
    component: ProjetDetailsComponent,
    data: {routeName: 'projets.projet-details', pageTitle:'Details Projet'}
  },


  {
    path: 'actions/action-list',
    component: ActionListComponent,
    data: {routeName: 'actions.action-list', pageTitle:'List Actions'}
  },
  {
    path: 'actions/action-add',
    component: ActionAddComponent,
    data: {routeName: 'actions.action-add', pageTitle:'Ajouter Action'}
  },
  {
    path: 'actions/action-details',
    component: ActionDetailsComponent,
    data: {routeName: 'actions.action-details', pageTitle:'Details Action'}
  },
  {
    path: 'users/user-profile',
    component: UserProfileComponent,
    data: {routeName: 'users.user-profile', pageTitle:'User'}
  },
  {
    path: 'users/user-add',
    component: UserAddComponent,
    data: {routeName: 'users.user-add', pageTitle:'Ajouter User'}
  },
  {
    path: 'users/user-list',
    component: UserListComponent,
    data: {routeName: 'users.user-list', pageTitle:'List Users '}
  },

  {
    path: 'admin',
    component:AdminComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
