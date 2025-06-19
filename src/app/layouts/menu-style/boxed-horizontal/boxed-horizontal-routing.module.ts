import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { IndexBoxedComponent } from '../../../views/index-boxed/index-boxed.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [

      {
        path: 'index-boxed',
        component:IndexBoxedComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxedHorizontalRoutingModule { }
