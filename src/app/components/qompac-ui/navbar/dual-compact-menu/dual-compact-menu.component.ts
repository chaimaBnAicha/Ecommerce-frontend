import { Component, Inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'iq-dual-compact-menu',
  templateUrl: './dual-compact-menu.component.html',
  styles: [
  ]
})
export class DualCompactMenuComponent implements OnInit, OnDestroy {
  public isCollapsed = false;

  constructor(@Inject(DOCUMENT) private document: any) { }
  ngOnInit(): void {
    this.chkScreenMode();
    this.elem = document.documentElement;
    this.document.body.classList.add('dual-compact')
  }

  ngOnDestroy() {
    this.document.body.classList.remove('dual-compact')
  }

  elem: any;

  fullScreen: boolean = false;

  public isMenuCollapsed = true;

  

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
