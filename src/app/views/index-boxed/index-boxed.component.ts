import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-index-boxed',
  templateUrl: './index-boxed.component.html',
  styles: [
  ]
})
export class IndexBoxedComponent implements OnInit, OnDestroy {

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.document.body.classList.add('boxed')
  }

  ngOnDestroy() {
    this.document.body.classList.remove('boxed')
  }


}
