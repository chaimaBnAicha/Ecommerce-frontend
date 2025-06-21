import { Component, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() selectedCategory: string = 'Tous';
  @Input() search: string = '';
  @Output() addToCart = new EventEmitter<Product>();

  products: Product[] = [
    { id: 1, name: 'T-shirt Homme', price: 19.99, image: 'https://via.placeholder.com/150', category: 'Vêtements' },
    { id: 2, name: 'Casque Bluetooth', price: 49.99, image: 'https://via.placeholder.com/150', category: 'Électronique' },
    { id: 3, name: 'Lampe de chevet', price: 29.99, image: 'https://via.placeholder.com/150', category: 'Maison' },
    { id: 4, name: 'Crème hydratante', price: 15.99, image: 'https://via.placeholder.com/150', category: 'Beauté' },
    { id: 5, name: 'Ballon de foot', price: 24.99, image: 'https://via.placeholder.com/150', category: 'Sport' },
    { id: 6, name: 'Roman policier', price: 12.99, image: 'https://via.placeholder.com/150', category: 'Livres' },
  ];

  filteredProducts: Product[] = [];

  ngOnInit() {
    this.filterProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(p => {
      const matchCat = this.selectedCategory === 'Tous' || p.category === this.selectedCategory;
      const matchSearch = !this.search || p.name.toLowerCase().includes(this.search.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  onAddToCart(product: Product) {
    this.addToCart.emit(product);
  }
}
