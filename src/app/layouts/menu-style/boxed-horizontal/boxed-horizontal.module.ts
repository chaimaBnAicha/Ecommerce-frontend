import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxedHorizontalRoutingModule } from './boxed-horizontal-routing.module';
import { IndexComponent } from './index/index.component';
import { QompacUiModule } from '../../../components/qompac-ui/qompac-ui.module'



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    BoxedHorizontalRoutingModule,
    QompacUiModule
  ],
  exports: [
    IndexComponent
  ]
})
export class BoxedHorizontalModule { }
