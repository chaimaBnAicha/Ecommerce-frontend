import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Input() cartCount: number = 0;
  @Output() searchChanged = new EventEmitter<string>();

  searchValue: string = '';

  constructor(private router: Router) {}

  onSearch(event: Event): void {
    event.preventDefault();
    this.searchChanged.emit(this.searchValue);
  }

  onInputChange(): void {
    // Option: emit search changes in real-time
    // this.searchChanged.emit(this.searchValue);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToAccount(): void {
    this.router.navigate(['/account']);
  }
}