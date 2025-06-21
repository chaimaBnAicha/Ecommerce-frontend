import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'iq-loader',
  templateUrl: './loader.component.html',
  styles: [
  ]
})
export class LoaderComponent implements OnInit {

  @Input('loader') loader: boolean = true;

  show: boolean = true;

  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      this.show = false
    }, 1000)
  }

}
