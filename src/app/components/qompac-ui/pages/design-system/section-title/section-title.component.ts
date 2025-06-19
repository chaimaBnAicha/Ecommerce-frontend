import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-section-title]',
  templateUrl: './section-title.component.html',
  styles: [
  ]
})
export class SectionTitleComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() urlLink: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
