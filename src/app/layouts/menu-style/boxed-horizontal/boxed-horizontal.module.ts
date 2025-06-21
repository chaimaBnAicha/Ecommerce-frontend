import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Update the import path below to the correct relative path where ajout-produit.component actually exists
import { AjoutProduitComponent } from 'src/app/FrontOffice/components/ajout-produit/ajout-produit.component';
// Example: If the correct path is '../../../../components/ajout-produit/ajout-produit.component', update as follows:
// import { AjoutProduitComponent } from '../../../../components/ajout-produit/ajout-produit.component';
import { HttpClientModule } from '@angular/common/http'; // ✅ à ajouter
import { ReactiveFormsModule } from '@angular/forms';

import { BoxedHorizontalRoutingModule } from './boxed-horizontal-routing.module';
import { IndexComponent } from './index/index.component';
import { QompacUiModule } from 'src/app/FrontOffice/components/qompac-ui/qompac-ui.module';
const routes: Routes = [
  { path: 'ajouter-produit', component: AjoutProduitComponent }
];


@NgModule({
  declarations: [
    IndexComponent,    
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BoxedHorizontalRoutingModule,
    QompacUiModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  exports: [
    IndexComponent,
    RouterModule]
  
})
export class BoxedHorizontalModule { }
