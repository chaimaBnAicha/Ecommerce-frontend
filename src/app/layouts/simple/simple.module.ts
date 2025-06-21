import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleRoutingModule } from './simple-routing.module';
import { IndexComponent } from './index/index.component';
import { QompacUiModule } from 'src/app/FrontOffice/components/qompac-ui/qompac-ui.module'





@NgModule({
  declarations: [
    IndexComponent,

    
  ],
  imports: [
    CommonModule,
    QompacUiModule,
    SimpleRoutingModule
  ],
  exports: [
    IndexComponent
  ]
})
export class SimpleModule { }
