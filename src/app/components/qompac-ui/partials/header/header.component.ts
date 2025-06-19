import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router,ActivationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import {SettingState} from '../../../../model/setting.model';
import {theme_font_size, sidebar_type} from '../../../../store/setting/actions';
import {themeFontSizeSelector, sidebarTypeSelector} from '../../../../store/setting/selector';
@Component({
  selector: 'iq-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  themeFontSizeSelector$: Observable<string>;

  sidebarTypeSelector$: Observable<any>;

  sidebarValue = []

  pageName: string = 'Dashboard'

  constructor(private router: Router, private store: Store<{ settingObject: SettingState}>) {
    this.themeFontSizeSelector$ = store.pipe(select(themeFontSizeSelector));
    this.sidebarTypeSelector$ = store.pipe(select(sidebarTypeSelector));
    this.sidebarTypeSelector$.subscribe((value) => this.sidebarValue = value)
    this.router.events.subscribe((val) => {
      if(val instanceof ActivationEnd) {
        const currentObj = val.snapshot.data
        if(currentObj['pageTitle'] !== undefined) {
          this.pageName = currentObj['pageTitle']
        }
      }
    });
  }

  ngOnInit(): void {
  }

  changeThemeFontSize(value: string) {
    this.store.dispatch(theme_font_size({value: value}))
  }

  toggleSidebar(value: any) {
    const sidebar = value
    if (sidebar.includes('sidebar-mini')) {
      this.store.dispatch(sidebar_type({ value: sidebar.filter((x: string) => x != 'sidebar-mini') }))
    } else {
      this.store.dispatch(sidebar_type({ value: [...sidebar, 'sidebar-mini'] }))
    }
  }
}
