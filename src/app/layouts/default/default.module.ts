import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultRoutingModule } from './default-routing.module';
import { IndexComponent } from './index/index.component';
import { QompacUiModule } from '../../FrontOffice/components/qompac-ui/qompac-ui.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    QompacUiModule,
    DefaultRoutingModule
  ],
  exports: [
    IndexComponent
  ]
})
export class DefaultModule { }
