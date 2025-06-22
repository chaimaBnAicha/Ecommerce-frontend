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
    'Livres',
    'Jouets',
    'Alimentation',
    'Bébé',
    'Jardin'
  ];
  filteredCategories: string[];
  selectedCategory = 'Tous';

  @Output() categorySelected = new EventEmitter<string>();

  constructor() {
    this.filteredCategories = [...this.categories];
  }

  selectCategory(cat: string): void {
    this.selectedCategory = cat;
    this.categorySelected.emit(cat);
  }

  filterCategories(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();
    
    this.filteredCategories = this.categories.filter(cat => 
      cat.toLowerCase().includes(searchTerm)
    );
  }

  clearFilter(): void {
    this.selectedCategory = 'Tous';
    this.categorySelected.emit('Tous');
  }
}