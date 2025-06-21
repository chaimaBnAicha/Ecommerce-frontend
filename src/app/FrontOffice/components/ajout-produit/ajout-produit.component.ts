import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService, ProduitDTO } from 'src/app/services/produit.service';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.scss']
})
export class AjoutProduitComponent implements OnInit {
  produitForm: FormGroup;
  isClassique = true;
  isEnchere = false;
  imagePreview: string | null = null;
  additionalImages: string[] = [];
  
  categories = [
    { id: 1, nom: 'Électronique' },
    { id: 2, nom: 'Mode' },
    { id: 3, nom: 'Maison' },
    { id: 4, nom: 'Beauté' },
    { id: 5, nom: 'Sport' }
  ];

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private toastr: ToastrService
  ) {
    this.produitForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      typeProduit: ['CLASSIQUE', Validators.required],
      categorie: [null, Validators.required],
      prixFixe: [null, [Validators.min(0)]],
      prixReduit: [null, [Validators.min(0)]],
      quantite: [0, [Validators.required, Validators.min(0)]],
      prixDepart: [null, [Validators.min(0)]],
      dateDebut: [''],
      dateFin: [''],
      imageUrl: [''],
      poids: [null, [Validators.min(0)]],
      longueur: [null, [Validators.min(0)]],
      largeur: [null, [Validators.min(0)]],
      hauteur: [null, [Validators.min(0)]],
      tags: [''],
      enVedette: [false]
    });

    this.onTypeChange();
  }

 ngOnInit(): void {
  if (!localStorage.getItem('auth_token')) {
    localStorage.setItem('auth_token', 'fake-token-for-testing');
    console.log('Token fake ajouté dans localStorage pour tests');
  }

  // déclenche automatique sur changement du select
  this.produitForm.get('typeProduit')?.valueChanges.subscribe(() => {
    this.onTypeChange();
  });
}


onTypeChange(): void {
  const type = this.produitForm.get('typeProduit')?.value;

  this.isClassique = type === 'CLASSIQUE';
  this.isEnchere = type === 'ENCHERE';

  // Réinitialisation des validateurs
  this.produitForm.get('prixFixe')?.clearValidators();
  this.produitForm.get('prixReduit')?.clearValidators();
  this.produitForm.get('quantite')?.clearValidators();
  this.produitForm.get('prixDepart')?.clearValidators();
  this.produitForm.get('dateDebut')?.clearValidators();
  this.produitForm.get('dateFin')?.clearValidators();

  if (this.isClassique) {
    this.produitForm.get('prixFixe')?.setValidators([Validators.required, Validators.min(0)]);
    this.produitForm.get('quantite')?.setValidators([Validators.required, Validators.min(0)]);
    // prixReduit est optionnel, mais on met min(0) si saisi
    this.produitForm.get('prixReduit')?.setValidators([Validators.min(0)]);

    this.produitForm.get('prixDepart')?.reset();
    this.produitForm.get('dateDebut')?.reset();
    this.produitForm.get('dateFin')?.reset();
  }

  if (this.isEnchere) {
    this.produitForm.get('prixDepart')?.setValidators([Validators.required, Validators.min(0)]);
    this.produitForm.get('dateDebut')?.setValidators([Validators.required]);
    this.produitForm.get('dateFin')?.setValidators([Validators.required]);

    this.produitForm.get('prixFixe')?.reset();
    this.produitForm.get('prixReduit')?.reset();
    this.produitForm.get('quantite')?.reset();
  }

  // Mise à jour de l’état des validateurs
  Object.keys(this.produitForm.controls).forEach(controlName => {
    this.produitForm.get(controlName)?.updateValueAndValidity();
  });
}


  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.produitForm.patchValue({ imageUrl: this.imagePreview });
      };
      reader.readAsDataURL(file);
    } else {
      alert('La taille de l\'image ne doit pas dépasser 2MB');
    }
  }

  onAdditionalImagesSelected(event: any): void {
    const files = event.target.files;
    const maxFiles = Math.min(files.length, 5 - this.additionalImages.length);

    for (let i = 0; i < maxFiles; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.additionalImages.push(e.target.result);
      reader.readAsDataURL(files[i]);
    }
  }

  removeAdditionalImage(index: number): void {
    this.additionalImages.splice(index, 1);
  }

  onSubmit(): void {
    console.log('Form submitted');
    console.log('Form value complet:', this.produitForm.value);
    console.log('Form valid:', this.produitForm.valid);

    if (this.produitForm.invalid) {
      console.log('Form invalid:', this.produitForm.value);
      this.markFormGroupTouched(this.produitForm);
      return;
    }

    // On récupère le token (il est forcément présent grâce à ngOnInit)
    const token = localStorage.getItem('auth_token');
    console.log('Token utilisé:', token);

    const formValue = this.produitForm.value;
    const produit: ProduitDTO = {
      ...formValue,
      dateDebut: formValue.dateDebut ? formatDate(formValue.dateDebut, 'yyyy-MM-dd', 'en-US') : undefined,
      dateFin: formValue.dateFin ? formatDate(formValue.dateFin, 'yyyy-MM-dd', 'en-US') : undefined
    };

    console.log('Produit envoyé:', produit);

    this.produitService.ajouterProduit(produit).subscribe({
      next: () => {
        this.toastr.success('Produit ajouté avec succès');
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur HTTP:', err);
        this.toastr.error(err.error?.message || 'Une erreur est survenue');
      },
    });
  }

  resetForm(): void {
    this.produitForm.reset({
      typeProduit: 'CLASSIQUE',
      quantite: 0,
      enVedette: false
    });
    this.imagePreview = null;
    this.additionalImages = [];
    this.onTypeChange();
  }

  cancel(): void {
    if (confirm('Voulez-vous vraiment annuler ? Les modifications non enregistrées seront perdues.')) {
      this.resetForm();
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
