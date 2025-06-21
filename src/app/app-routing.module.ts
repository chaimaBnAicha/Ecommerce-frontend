import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
  {path:'SignUpComponent',redirectTo:'/auth/sign-up',pathMatch:'full'},
  {path:'DashboardComponent',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'ProjetListComponent',redirectTo:'/projets/projet-list',pathMatch:'full'},
  {path:'ProjetAddComponent',redirectTo:'components/ajout-produit',pathMatch:'full'},
  { path: '', loadChildren: () => import('./layouts/default/default.module').then(m => m.DefaultModule) },
  { path: '', loadChildren: () => import('./layouts/simple/simple.module').then(m => m.SimpleModule) },
  { path: '', loadChildren: () => import('./layouts/menu-style/horizontal/horizontal.module').then(m => m.HorizontalModule) },
  { path: '', loadChildren: () => import('./layouts/menu-style/dual-compact/dual-compact.module').then(m => m.DualCompactModule) },
  { path: '', loadChildren: () => import('./layouts/menu-style/boxed-horizontal/boxed-horizontal.module').then(m => m.BoxedHorizontalModule) },


 



  // { path: '**', component:  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
