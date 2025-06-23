import { Component } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  cartCount = 0;

  onSearchChanged(search: string) {
    // à connecter plus tard selon besoin
  }

  onCategorySelected(cat: string) {
    // à connecter plus tard selon besoin
  }
}
