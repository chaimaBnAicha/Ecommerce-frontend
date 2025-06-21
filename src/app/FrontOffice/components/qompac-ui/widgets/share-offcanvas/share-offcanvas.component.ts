import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-share-offcanvas',
  templateUrl: './share-offcanvas.component.html',
  styles: [
  ]
})
export class ShareOffcanvasComponent implements OnInit {
  constructor(private offcanvasService: NgbOffcanvas) {}
  
  ngOnInit(): void {
  }

}
