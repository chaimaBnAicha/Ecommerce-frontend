import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { IndexDualCompactComponent } from '../../../views/index-dual-compact/index-dual-compact.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [

      {
        path: 'dual-compact',
        component:IndexDualCompactComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DualCompactRoutingModule { }
