import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DualCompactRoutingModule } from './dual-compact-routing.module';
import { IndexComponent } from './index/index.component';
import { QompacUiModule } from '../../../components/qompac-ui/qompac-ui.module'



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    DualCompactRoutingModule,
    QompacUiModule
  ],
  exports: [
    IndexComponent
  ]
})
export class DualCompactModule { }
