import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {SettingState} from '../../../../model/setting.model';
import {appNameSelector} from '../../../../store/setting/selector';

@Component({
  selector: '[iq-brand-name]',
  templateUrl: './brand-name.component.html',
  styles: [
  ]
})
export class BrandNameComponent implements OnInit {

  appNameSelector$: Observable<string>;
  constructor(private store: Store<{ settingObject: SettingState}>) {
    this.appNameSelector$ = store.pipe(select(appNameSelector));
  }

  ngOnInit(): void {
  }

}
