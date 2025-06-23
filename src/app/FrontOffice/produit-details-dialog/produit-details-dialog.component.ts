import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Product {
  id: number;
  nom: string;
  description: string;
  imageUrl: string;
  prixFixe?: number;
  prixDepart?: number;
  typeProduit: 'CLASSIQUE' | 'ENCHERE';
}

@Component({
  selector: 'app-produit-details-dialog',
  templateUrl: './produit-details-dialog.component.html',
  styleUrls: ['./produit-details-dialog.component.scss']
})
export class ProduitDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { produit: Product },
    private dialogRef: MatDialogRef<ProduitDetailsDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  addToCart(): void {
    this.snackBar.open('Produit ajouté au panier', 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
    this.dialogRef.close(this.data.produit);
  }
}