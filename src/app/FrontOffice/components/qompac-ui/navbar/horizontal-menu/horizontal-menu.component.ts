import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'iq-horizontal-menu',
  templateUrl: './horizontal-menu.component.html'
})
export class HorizontalMenuComponent implements OnInit {

  constructor(private offcanvasService: NgbOffcanvas) { }
  open(content: any) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then();
  }

  ngOnInit(): void {
  }

}
