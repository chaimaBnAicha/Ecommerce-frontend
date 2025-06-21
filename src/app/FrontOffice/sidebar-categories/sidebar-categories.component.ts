import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-categories',
  templateUrl: './sidebar-categories.component.html',
  styleUrls: ['./sidebar-categories.component.scss']
})
export class SidebarCategoriesComponent {
  categories = [
    'Tous',
    'Vêtements',
    'Électronique',
    'Maison',
    'Beauté',
    'Sport',
    'Livres'
  ];
  selectedCategory = 'Tous';

  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.categorySelected.emit(cat);
  }
}
