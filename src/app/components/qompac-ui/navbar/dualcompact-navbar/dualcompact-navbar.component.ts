import { Component, Inject, OnInit, HostListener, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {SettingState} from '../../../../model/setting.model';
import {theme_scheme, theme_scheme_direction} from '../../../../store/setting/actions';
import {themeSchemeSelector, themeSchemeDirectionSelector} from '../../../../store/setting/selector';

@Component({
  selector: 'iq-dualcompact-navbar',
  templateUrl: './dualcompact-navbar.component.html',
  styles: [
    `
      .dropdown-toggle::after {
        display: none;
      }
    `
  ]
})
export class DualcompactNavbarComponent implements OnInit {

  themeScheme$: Observable<string>;
  themeSchemeDirection$: Observable<string>;

  elem: any;

  fullScreen: boolean = false;

  public isMenuCollapsed = true;

  constructor(@Inject(DOCUMENT) private document: any, private store: Store<{ settingObject: SettingState}>,) {
    this.themeScheme$ = store.pipe(select(themeSchemeSelector));
    this.themeSchemeDirection$ = store.pipe(select(themeSchemeDirectionSelector));
  }

  ngOnInit(): void {
    this.chkScreenMode();
    this.elem = document.documentElement;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(){
    this.chkScreenMode();
  }

  chkScreenMode(){
    if(document.fullscreenElement){
      this.fullScreen = true;
    }else{
      this.fullScreen = false;
    }
  }

  changeThemeScheme(value: string) {
    this.store.dispatch(theme_scheme({value: value}))
  }
  changeThemeSchemeDirection(value: string) {
    this.store.dispatch(theme_scheme_direction({value: value}))
  }

  toggleFullScreen() {
    if (this.fullScreen) {
      this.fullScreen = false
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    } else {
      this.fullScreen = true
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    }
  }
  
}
