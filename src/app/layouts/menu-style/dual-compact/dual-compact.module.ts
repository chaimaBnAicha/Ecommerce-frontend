import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DualCompactRoutingModule } from './dual-compact-routing.module';
import { IndexComponent } from './index/index.component';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    DualCompactRoutingModule,
  ],
  exports: [
    IndexComponent
  ]
})
export class DualCompactModule { }
