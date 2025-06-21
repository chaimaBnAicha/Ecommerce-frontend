import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ShareOffcanvasComponent } from 'src/app/FrontOffice/components/qompac-ui/widgets/share-offcanvas/share-offcanvas.component';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
  ]
})
export class UserProfileComponent implements OnInit {
  constructor(private offcanvasService: NgbOffcanvas) { }
  add() {
    this.offcanvasService.open(ShareOffcanvasComponent, { position: 'bottom' });
  }


  

  ngOnInit(): void {
  }

}
