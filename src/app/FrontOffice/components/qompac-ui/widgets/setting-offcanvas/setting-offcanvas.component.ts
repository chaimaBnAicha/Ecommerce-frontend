import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {SettingState} from 'src/app/model/setting.model';
import * as SettingSelectors from 'src/app/store/setting/selector';
import * as SettingActions from 'src/app/store/setting/actions';


@Component({
  selector: 'iq-setting-offcanvas',
  templateUrl: './setting-offcanvas.component.html',
  providers: [NgbOffcanvasConfig, NgbOffcanvas]
})
export class SettingOffcanvasComponent implements OnInit {

  appName$: Observable<string>;
  themeScheme$: Observable<string>;
  themeSchemeDirection$: Observable<string>;
  themeColorSelector$: Observable<any>;
  pageLayoutSelector$: Observable<string>;
  sidebarColorSelector$: Observable<string>;
  sidebarTypeSelector$: Observable<any>;
  sidebarMenuStyleSelector$: Observable<string>;
  offcanvasRef: TemplateRef<any> | undefined;

  appName: string = '';

  constructor(private store: Store<{ settingObject: SettingState}>, private offcanvasService: NgbOffcanvas, config: NgbOffcanvasConfig) {
    this.appName$ = this.store.pipe(select(SettingSelectors.appNameSelector));
    this.appName$.subscribe(appName => {
      this.appName = appName
    })
    this.themeScheme$ = store.pipe(select(SettingSelectors.themeSchemeSelector));
    this.themeSchemeDirection$ = store.pipe(select(SettingSelectors.themeSchemeDirectionSelector));
    this.themeColorSelector$ = store.pipe(select(SettingSelectors.themeColorSelector));
    this.pageLayoutSelector$ = store.pipe(select(SettingSelectors.pageLayoutSelector));
    this.sidebarColorSelector$ = store.pipe(select(SettingSelectors.sidebarColorSelector));
    this.sidebarTypeSelector$ = store.pipe(select(SettingSelectors.sidebarTypeSelector));
    this.sidebarMenuStyleSelector$ = store.pipe(select(SettingSelectors.sidebarMenuStyleSelector));

    // Offcanvas Config
    config.position = 'end';
    config.panelClass = 'live-customizer'
    config.backdrop = false
    config.scroll = true

    //  For Customizer on rtl change
    this.themeSchemeDirection$.subscribe(value => {
      this.offcanvasService.dismiss('On RTL')
      if (value === 'rtl') {
        config.position = 'start'
      } else {
        config.position = 'end'
      }
      if (this.offcanvasRef !== undefined) {
        setTimeout(() => {
          this.offcanvasService.open(this.offcanvasRef)
        }, 0);
      }
    })
  }

  ngOnInit(): void {
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasRef = content
    this.offcanvasService.open(this.offcanvasRef);
  }
  changeAppName() {
    this.store.dispatch(SettingActions.app_name({value: this.appName}))
  }
  changeThemeScheme(value: string) {
    this.store.dispatch(SettingActions.theme_scheme({value: value}))
  }
  changeThemeSchemeDirection(value: string) {
    this.store.dispatch(SettingActions.theme_scheme_direction({value: value}))
  }
  changeThemeColor(object: any) {
    const themeColor = {
      colors: {
        '--{{prefix}}primary': object.primary,
        '--{{prefix}}secondary': object.secondary,
        // '--{{prefix}}tertiray': object.tertiray,

      },
      value: object.value
    }
    this.store.dispatch(SettingActions.theme_color(themeColor))
  }
  changePageLayout(value: string) {
    this.store.dispatch(SettingActions.page_layout({value: value}))
  }
  changeSidebarColor(value: string) {
    this.store.dispatch(SettingActions.sidebar_color({value: value}))
  }
  changeSidebarType(value: Array<string>) {
    this.store.dispatch(SettingActions.sidebar_type({value: value}))
  }
  changeSidebarMenuStyle(value: string) {
    this.store.dispatch(SettingActions.sidebar_menu_style({value: value}))
  }
  resetSetting() {
    this.store.dispatch(SettingActions.reset_state())
  }
  copyConfig () {
    console.log('copied')
  }
  checkboxCheckValue (selector: Array<string>, value: string) {
    if (selector.includes(value)) {
      return true
    }
    return false
  }

  onCheckboxUpdate (defaultChecked: Array<string>, value: string){
    if (this.checkboxCheckValue(defaultChecked, value)) {
      return [...defaultChecked.filter((item: string) => item !== value)]
    } else {
      return [...defaultChecked, value]
    }
  }
}
