import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'iq-sub-header',
  templateUrl: './sub-header.component.html',
  styles: [
  ]
})
export class SubHeaderComponent implements OnInit {

  pageName: string = 'Dashboard'

  constructor(private router: Router) { 
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

}
