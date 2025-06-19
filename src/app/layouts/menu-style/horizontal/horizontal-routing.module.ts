import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { IndexHorizontalComponent } from '../../../views/index-horizontal/index-horizontal.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      
      {
        path: 'index-horizontal',
        component:IndexHorizontalComponent,
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorizontalRoutingModule { }
