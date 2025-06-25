import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService, ProduitDTO } from '../../services/produit.service';
import { ProduitDetailsDialogComponent } from '../produit-details-dialog/produit-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  Classiques: ProduitDTO[] = [];
  Encheres: ProduitDTO[] = [];
  cart: ProduitDTO[] = [];
  favoris: number[] = [];
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
      image: 'assets/images/eclectronique.png!sw800'
    }
  ];

  constructor(
    private router: Router,
    private produitService: ProduitService,
    private dialog: MatDialog,
        private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
    setInterval(() => {
      this.Encheres = [...this.Encheres];
    }, 1000);
  }

  chargerProduits(): void {
    this.produitService.getProduitsParType('CLASSIQUE').subscribe({
      next: (data) => this.Classiques = data,
      error: (err) => console.error('Erreur chargement Classiques', err)
    });

    this.produitService.getProduitsParType('ENCHERE').subscribe({
      next: (data) => this.Encheres = data,
      error: (err) => console.error('Erreur chargement Enchères', err)
    });
  }
  
  chargerFavoris(): void {
    // Charger depuis le localStorage ou une API
    const fav = localStorage.getItem('favoris');
    this.favoris = fav ? JSON.parse(fav) : [];
  }

  private ensureImageArray(images: any): string[] {
    if (Array.isArray(images)) return images;
    if (typeof images === 'string') return [images];
    return ['assets/images/default-product.png'];
  }

  toggleFavori(produitId: number): void {
    const index = this.favoris.indexOf(produitId);
    if (index === -1) {
      this.favoris.push(produitId);
      this.snackBar.open('Ajouté aux favoris', 'Fermer', { duration: 2000 });
    } else {
      this.favoris.splice(index, 1);
      this.snackBar.open('Retiré des favoris', 'Fermer', { duration: 2000 });
    }
    localStorage.setItem('favoris', JSON.stringify(this.favoris));
  }

  estFavori(produitId: number): boolean {
    return this.favoris.includes(produitId);
  }

  getFirstImage(produit: ProduitDTO): string {
    return produit.imageUrls[0];
  }

  voirDetails(produit: ProduitDTO): void {
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

  goToAjoutProduit(): void {
    this.router.navigate(['/ajouter-produit']);
  }

  

  onAddToCart(p: ProduitDTO): void {
    this.cart.push(p);
    console.log('Ajouté au panier', p);
  }

  getTempsRestant(dateFin: string): string {
    const fin = new Date(dateFin).getTime();
    const maintenant = Date.now();
    const diff = fin - maintenant;

    if (diff <= 0) return 'Terminé';

    const heures = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((diff % (1000 * 60)) / 1000);

    return `${heures}h ${minutes}m ${secondes}s`;
  }

  scrollLeft(container: HTMLElement): void {
    container.scrollLeft -= 150;
  }

  scrollRight(container: HTMLElement): void {
    container.scrollLeft += 150;
  }
}

