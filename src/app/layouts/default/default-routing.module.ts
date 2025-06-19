import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../views/views.module').then(m => m.ViewsModule),
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
