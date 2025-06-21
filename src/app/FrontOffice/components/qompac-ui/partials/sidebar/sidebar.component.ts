import { Component,  ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import Scrollbar from 'smooth-scrollbar'
import { Observable } from 'rxjs';
import {sidebar_type} from 'src/app/store/setting/actions';
import * as SettingSelectors from 'src/app/store/setting/selector';
import { Store, select } from '@ngrx/store';
import {SettingState} from 'src/app/model/setting.model';
@Component({
  selector: '[iq-sidebar]',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements AfterViewInit {

  @ViewChild('sidebar', { static: true }) sidebarScroll!: ElementRef;

  sidebarTypeSelector$: Observable<any>;

  sidebarValue = []

  constructor(private store: Store<{ settingObject: SettingState}>,) {
    this.sidebarTypeSelector$ = store.pipe(select(SettingSelectors.sidebarTypeSelector));
    this.sidebarTypeSelector$.subscribe((value) => this.sidebarValue = value)
  }

  ngAfterViewInit(): void {
    Scrollbar.init(this.sidebarScroll.nativeElement, {
      continuousScrolling: false,
    })
  }

  toggleSidebar (value: any) {
    const sidebar = value
    if(sidebar.includes('sidebar-mini')) {
      this.store.dispatch(sidebar_type({value: sidebar.filter((x: string) => x != 'sidebar-mini')}))
    } else {
      this.store.dispatch(sidebar_type({value: [...sidebar,'sidebar-mini']}))
    }
  }
}
