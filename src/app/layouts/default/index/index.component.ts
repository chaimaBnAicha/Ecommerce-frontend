import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router,ActivationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingState } from '../../../model/setting.model';
import { sidebarMenuStyleSelector, sidebarColorSelector, sidebarTypeSelector, pageLayoutSelector, themeColorSelector } from '../../../store/setting/selector';
@Component({
  selector: 'iq-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './index.component.scss',
  ],
  encapsulation: ViewEncapsulation.None

})
export class IndexComponent implements OnInit, AfterViewInit {

  isBanner: boolean = false
  sidebarColorSelector$: Observable<string>;
  sidebarTypeSelector$: Observable<any>;
  sidebarMenuStyleSelector$: Observable<string>;
  pageLayoutSelector$: Observable<string>;
  themeColorSelector$: Observable<any>;


  constructor(private store: Store<{ settingObject: SettingState }>, private router: Router) {
    this.sidebarColorSelector$ = store.pipe(select(sidebarColorSelector));
    this.sidebarTypeSelector$ = store.pipe(select(sidebarTypeSelector));
    this.sidebarMenuStyleSelector$ = store.pipe(select(sidebarMenuStyleSelector));
    this.pageLayoutSelector$ = store.pipe(select(pageLayoutSelector));
    this.themeColorSelector$ = store.pipe(select(themeColorSelector));

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        this.checkIsBanner()
      }
    });
    setTimeout(() => {
      this.checkIsBanner()
    }, 200)
  }

  checkIsBanner() {
    const url = this.router.url.split('?')[0]
    switch (url) {
      case '/dashboard':
      case '/ecommerce-dashboard':
      case '/analytics-dashboard':
      case '/crypto-dashboard':
        this.isBanner = false
        return true
        break;
      default:
        this.isBanner = true
        return true
        break;
    }
  }

}
