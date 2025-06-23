import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './FrontOffice/accueil/accueil.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AjoutProduitComponent } from './FrontOffice/components/ajout-produit/ajout-produit.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'accueil', component: AccueilComponent },
      { path: 'ajouter-produit', component: AjoutProduitComponent },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' }
    ]
  },
  { path: 'SignUpComponent', redirectTo: '/auth/sign-up', pathMatch: 'full' },
  { path: 'DashboardComponent', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'ProjetListComponent', redirectTo: '/projets/projet-list', pathMatch: 'full' },
  
  { path: '', loadChildren: () => import('./layouts/default/default.module').then(m => m.DefaultModule) },
  { path: '', loadChildren: () => import('./layouts/simple/simple.module').then(m => m.SimpleModule) },
  { path: '', loadChildren: () => import('./layouts/menu-style/horizontal/horizontal.module').then(m => m.HorizontalModule) },
  { path: '', loadChildren: () => import('./layouts/menu-style/dual-compact/dual-compact.module').then(m => m.DualCompactModule) },
  { path: '', loadChildren: () => import('./layouts/menu-style/boxed-horizontal/boxed-horizontal.module').then(m => m.BoxedHorizontalModule) }
];




  // { path: '**', component:  }


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
