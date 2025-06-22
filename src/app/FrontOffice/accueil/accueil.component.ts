import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Promo {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  selectedCategory: string = 'Tous';
  search: string = '';
  cart: Product[] = [];
  promos: Promo[] = [
    {
      id: 1,
      title: 'Promo Été',
      description: "Profitez de réductions exceptionnelles jusqu'à -50% sur notre sélection estivale !",
      image: 'assets/images/promo_ete.png'
    },
    { 
      id: 2, 
      title: 'Électronique en Fête', 
      description: 'Découvrez nos offres spéciales sur les derniers appareils électroniques.', 
      image: 'assets/images/promo_electronique.jpg' 
    },
    { 
      id: 3, 
      title: 'Nouveautés', 
      description: 'Découvrez nos nouveaux produits arrivés cette semaine.', 
      image: 'assets/images/promo_nouveautes.jpg' 
    }
  ];

  constructor(private router: Router) {}

  onCategorySelected(cat: string): void {
    this.selectedCategory = cat;
  }

  onSearchChanged(search: string): void {
    this.search = search;
  }

  onAddToCart(product: Product): void {
    this.cart.push(product);
    // Option: Ajouter une notification/toast
  }

  get cartCount(): number {
    return this.cart.length;
  }

  goToAjoutProduit(): void {
    this.router.navigate(['/ajouter-produit']);

  }
}