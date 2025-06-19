import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router,NavigationEnd, ActivationEnd  } from '@angular/router';


@Component({
  selector: 'iq-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styles: [
  ]
})
export class VerticalNavComponent implements OnInit {

  currentRoute: string = '/';
  routeName: string = '';
  accoardionCollapse: string = ''



  constructor(private router: Router) {
    
    router.events.subscribe((event: any) => {
      if(event instanceof ActivationEnd) {
        const currentObj = event.snapshot.data
        if(currentObj['routeName'] !== undefined) {
          this.routeName = currentObj['routeName']
          this.accoardionCollapse = this.routeName
        }
      }
      if(event instanceof NavigationEnd) {
        this.currentRoute = event.url
      }
    })
  }
  ngOnInit(): void {
  }

  @ViewChild('sidebar', { static: true }) sidebarScroll!: ElementRef;

  

  checkAccording(value: string): boolean {
    return this.accoardionCollapse.includes(value)
  }

  changeAccordion(value: string): string {
    if (value === this.accoardionCollapse && value.includes('.')) {
      const menu = this.accoardionCollapse.split('.')
      return this.accoardionCollapse = menu[menu.length - 2]
    }
    if (value !== this.accoardionCollapse && this.accoardionCollapse.includes(value)) {
      return this.accoardionCollapse = ''
    }
    if (value !== this.accoardionCollapse) {
      return this.accoardionCollapse = value
    }
    if (value === this.accoardionCollapse) {
      return this.accoardionCollapse = ''
    }
    return this.accoardionCollapse = ''
  }
}
