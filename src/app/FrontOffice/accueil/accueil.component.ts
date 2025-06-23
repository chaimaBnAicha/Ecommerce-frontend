import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from '../../services/produit.service';
import { ProduitDetailsDialogComponent } from '../produit-details-dialog/produit-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
interface Product {
  id: number;
  nom: string;
  description: string;
  imageUrl: string;
  prixFixe?: number;
  prixDepart?: number;
  dateDebut?: string;
  dateFin?: string;
  typeProduit: 'PRODUITCLASSIQUE' | 'PRODUITENCHERE';
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
export class AccueilComponent implements OnInit {
  produitsClassiques: Product[] = [];
  produitsEncheres: Product[] = [];
  cart: Product[] = [];

  promos: Promo[] = [
    {
      id: 1,
      title: 'Promo Été',
      description: "Profitez de réductions exceptionnelles jusqu'à -50% !",
      image: 'assets/images/promo_ete.png'
    },
    {
      id: 2,
      title: 'Électronique',
      description: 'Offres spéciales sur les appareils électroniques.',
      image: 'assets/images/promo_electronique.jpg'
    }
  ];

  constructor(
    private router: Router,
    private produitService: ProduitService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

chargerProduits(): void {
  this.produitService.getAllProduits().subscribe({
    next: (data: Product[]) => {
      console.log('Produits reçus:', data);
      const types = Array.from(new Set(data.map(p => p.typeProduit)));
      console.log('Types trouvés:', types);

      this.produitsClassiques = data.filter(p => p.typeProduit === 'PRODUITCLASSIQUE');
      this.produitsEncheres = data.filter(p => p.typeProduit === 'PRODUITENCHERE');

      console.log('Classiques:', this.produitsClassiques);
      console.log('Enchères:', this.produitsEncheres);
    },
    error: (err) => console.error('Erreur chargement produits:', err)
  });
}



  goToAjoutProduit(): void {
    this.router.navigate(['/ajouter-produit']);
  }

  voirDetails(produit: Product): void {
    this.dialog.open(ProduitDetailsDialogComponent, {
      width: '100%',
      maxWidth: '100vw',
      height: '100vh',
      panelClass: 'full-screen-dialog',
      backdropClass: 'dialog-backdrop',
      data: { produit },
      disableClose: false
    });
  }

  onAddToCart(p: Product): void {
    this.cart.push(p);
    // Logique panier à compléter
  }
}
