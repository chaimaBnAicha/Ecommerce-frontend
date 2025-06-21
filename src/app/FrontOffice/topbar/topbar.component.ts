import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Input() cartCount: number = 0;
  @Output() searchChanged = new EventEmitter<string>();

  searchValue: string = '';

  onSearch(event: Event) {
    event.preventDefault();
    this.searchChanged.emit(this.searchValue);
  }
}
