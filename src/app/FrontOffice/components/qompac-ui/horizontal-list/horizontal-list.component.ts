import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iq-horizontal-list',
  templateUrl: './horizontal-list.component.html',
  styles: [
  ]
})
export class HorizontalListComponent implements OnInit {
  @Input() class!: string;
  @Input() responsiveList!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
