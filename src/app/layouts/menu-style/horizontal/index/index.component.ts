import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingState } from '../../../../model/setting.model';
import { sidebarMenuStyleSelector, sidebarColorSelector, sidebarTypeSelector, pageLayoutSelector, themeColorSelector } from '../../../../store/setting/selector';

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
  sidebarColorSelector$: Observable<string>;
  sidebarTypeSelector$: Observable<any>;
  sidebarMenuStyleSelector$: Observable<string>;
  pageLayoutSelector$: Observable<string>;
  themeColorSelector$: Observable<any>;

  constructor(private store: Store<{ settingObject: SettingState }>, private router: Router) {
    this.pageLayoutSelector$ = store.pipe(select(pageLayoutSelector));
    this.sidebarColorSelector$ = store.pipe(select(sidebarColorSelector));
    this.sidebarTypeSelector$ = store.pipe(select(sidebarTypeSelector));
    this.sidebarMenuStyleSelector$ = store.pipe(select(sidebarMenuStyleSelector));
    this.pageLayoutSelector$ = store.pipe(select(pageLayoutSelector));
    this.themeColorSelector$ = store.pipe(select(themeColorSelector));
  }
  ngOnInit(): void {
  }

}
