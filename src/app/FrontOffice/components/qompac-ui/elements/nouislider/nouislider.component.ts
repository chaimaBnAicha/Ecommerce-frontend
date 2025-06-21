import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
// @ts-ignore
import noUiSlider from 'nouislider';

@Component({
  selector: 'iq-nouislider',
  templateUrl: './nouislider.component.html',
  styleUrls: [
    './nouislider.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class NouisliderComponent implements OnInit, AfterViewInit {

  @ViewChild('noUiSliderElem') noUiSliderElem!: ElementRef


  constructor() { }


  @Output() valueChange = new EventEmitter();
  valueUpdated(values: any) {
    this.valueChange.emit(values);
  }
  ngAfterViewInit(): void {
    const slider = noUiSlider.create(this.noUiSliderElem.nativeElement, {
      start: [0, 100],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    }).on('slide', (value) => {
      this.valueUpdated(value)
    });
  }

  ngOnInit(): void {
  }

}
