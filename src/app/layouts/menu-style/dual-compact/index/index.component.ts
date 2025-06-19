import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingState } from '../../../../model/setting.model';
import { pageLayoutSelector } from '../../../../store/setting/selector';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './index.component.scss',
  ],
  encapsulation: ViewEncapsulation.None

})
export class IndexComponent implements OnInit {


  isBanner: boolean = false

  pageLayoutSelector$: Observable<string>;

  constructor(private store: Store<{ settingObject: SettingState }>, private router: Router) {
    this.pageLayoutSelector$ = store.pipe(select(pageLayoutSelector));
  }

  ngOnInit(): void {
  }

}
