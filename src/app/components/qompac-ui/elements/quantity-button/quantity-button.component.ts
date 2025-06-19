import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-button',
  templateUrl: './quantity-button.component.html',
  styles: [
  ]
})
export class QuantityButtonComponent implements OnInit {
  @Input("value") value = 0;

  @Input("step") step = 1;

  @Input("min") min: number | null | undefined;

  @Input("max") max: number | null | undefined;

  @Input('color') color: string  = 'light'

  @Output() valueChange = new EventEmitter();

  valueUpdated(newValue: number) {
    this.valueChange.emit(newValue);
  }

  valueUpdate(type: string) {
    if (type === "increement") {
      if (this.checkMaxValue(this.value)) {
        this.increement();
      }
    } else {
      if (this.checkMinValue(this.value)) {
        this.decreement();
      }
    }
    this.valueUpdated(this.value);
  }

  checkMaxValue(value: number) {
    if (this.max !== undefined && this.max !== null) {
      if (this.max > value) {
        return true;
      }
    }
    return false;
  }

  checkMinValue(value: number) {
    if (this.min !== undefined && this.min !== null) {
      if (this.min < value) {
        return true;
      }
    }
    return false;
  }

  increement() {
    console.log('test')
    this.value += this.step;
  }

  decreement() {
    this.value -= this.step;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
