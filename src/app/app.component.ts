import { Component, HostListener } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { update_setting, page_layout, theme_color, theme_scheme_direction } from './store/setting/actions';
import { Observable } from 'rxjs';
import {sidebar_type, theme_scheme, sidebar_color, sidebar_menu_style, } from './store/setting/actions';
import * as SettingSelectors from './store/setting/selector';
import { Store, select } from '@ngrx/store';
import {SettingState} from './model/setting.model';
@Component({
  selector: 'iq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarTypeSelector$: Observable<any>;
  sidebarValue: any = [];
  layout: string = '';
  constructor(private store: Store<{ settingObject: SettingState}>, route: ActivatedRoute) {
    this.store.dispatch(update_setting())
    this.sidebarTypeSelector$ = store.pipe(select(SettingSelectors.sidebarTypeSelector));
    this.sidebarTypeSelector$.subscribe((value) => this.sidebarValue = value)
    route.queryParams.subscribe((e) => {
      if(e['layout'] !== undefined) {
        this.layout = e['layout']
        this.changeSetting()
      }
    })
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const sidebarResponsive = document.querySelector('[data-sidebar="responsive"]')
    if (event.target.innerWidth < 1199) {
      this.store.dispatch(sidebar_type({value: [...this.sidebarValue,'sidebar-mini']}))
    } else {
      this.store.dispatch(sidebar_type({value: this.sidebarValue.filter((x: string) => x != 'sidebar-mini')}))
    }
  }

  changeSetting(): void {
    switch (this.layout) {
      case 'dark':
        this.store.dispatch(theme_scheme({value: 'dark'}))
        break;
      case 'semi-dark':
        this.store.dispatch(theme_scheme({value: 'light'}))
        this.store.dispatch(sidebar_color({value: 'sidebar-dark'}))
        break;
      case 'full-width':
        this.store.dispatch(page_layout({value: 'container-fluid'}))
        break;
      case 'mini':
        this.store.dispatch(sidebar_type({value: ['sidebar-mini']}))
        this.store.dispatch(sidebar_menu_style({value: 'sidebar-default navs-rounded-all'}))
        this.store.dispatch(page_layout({value: 'container-fluid'}))
        break;
      case 'sidebar-pill-all':
        this.store.dispatch(sidebar_menu_style({value: 'sidebar-default navs-pill-all'}))
        this.store.dispatch(page_layout({value: 'container-fluid'}))
        this.store.dispatch(theme_color({
          colors: {
            '--{{prefix}}primary': '#2185F4',
            '--{{prefix}}secondary': '#B1BBC6',    
          },
          value: 'theme-color-blue'
        }))
        break;
      case 'sidebar-pill-one':
        this.store.dispatch(sidebar_menu_style({value: 'sidebar-default navs-pill'}))
        this.store.dispatch(page_layout({value: 'container-fluid'}))
        this.store.dispatch(theme_color({
          colors: {
            '--{{prefix}}primary': '#fa6aae',
            '--{{prefix}}secondary': '#cfc6c6',    
          },
          value: 'theme-color-pink'
        }))
        break;
      case 'sidebar-rounded-one':
        this.store.dispatch(sidebar_menu_style({value: 'sidebar-default navs-rounded'}))
        this.store.dispatch(page_layout({value: 'container-fluid'}))
        this.store.dispatch(theme_color({
          colors: {
            '--{{prefix}}primary': '#34A853',
            '--{{prefix}}secondary': '#B1C6B7',    
          },
          value: 'theme-color-green'
        }))
          break;
      case 'sidebar-rounded-all':
        this.store.dispatch(sidebar_menu_style({value: 'sidebar-default navs-rounded-all'}))
        this.store.dispatch(page_layout({value: 'container-fluid'}))
        this.store.dispatch(theme_color({
          colors: {
            '--{{prefix}}primary': '#553AF9',
            '--{{prefix}}secondary': '#B4B1C6',    
          },
          value: 'theme-color-royal-blue'
        }))
          break;
      case 'rtl':
        this.store.dispatch(theme_scheme_direction({value: 'rtl'}))
          break;
      case 'dark-rtl':
        this.store.dispatch(theme_scheme({value: 'dark'}))
        this.store.dispatch(theme_scheme_direction({value: 'rtl'}))
          break;
      default:
        break;
    }
  }
}


