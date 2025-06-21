import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorizontalRoutingModule } from './horizontal-routing.module';
import { IndexComponent } from './index/index.component';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    HorizontalRoutingModule,
    
  ],
  exports: [
    IndexComponent
  ]
})
export class HorizontalModule { }
