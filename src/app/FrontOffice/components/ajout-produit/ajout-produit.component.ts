import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService, ProduitDTO } from 'src/app/services/produit.service';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  dragOver = false;

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
    private toastr: ToastrService,
    private router: Router
  ) {
    this.produitForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      typeProduit: ['CLASSIQUE', Validators.required],
      categorie: [null, Validators.required],
      prixFixe: [null],    // Validators ajoutés dynamiquement
      prixDepart: [null],  // Validators ajoutés dynamiquement
      dateDebut: [''],     // Validators ajoutés dynamiquement
      dateFin: [''],       // Validators ajoutés dynamiquement
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('auth_token')) {
      localStorage.setItem('auth_token', 'fake-token-for-testing');
    }

    let isChangingType = false;

    this.produitForm.get('typeProduit')?.valueChanges.subscribe(() => {
      if (!isChangingType) {
        isChangingType = true;
        this.onTypeChange();
        isChangingType = false;
      }
    });

    this.onTypeChange();

    // Pour debug validité
    this.produitForm.statusChanges.subscribe(status => {
      console.log('Statut formulaire:', status);
    });
  }

  onTypeChange(): void {
    const type = this.produitForm.get('typeProduit')?.value;

    this.isClassique = type === 'CLASSIQUE';
    this.isEnchere = type === 'ENCHERE';

    // Clear validators first
    this.produitForm.get('prixFixe')?.clearValidators();
    this.produitForm.get('prixDepart')?.clearValidators();
    this.produitForm.get('dateDebut')?.clearValidators();
    this.produitForm.get('dateFin')?.clearValidators();

    if (this.isClassique) {
      this.produitForm.get('prixFixe')?.setValidators([Validators.required, Validators.min(0)]);
      this.produitForm.get('prixDepart')?.setValue(null, { emitEvent: false });
      this.produitForm.get('dateDebut')?.setValue('', { emitEvent: false });
      this.produitForm.get('dateFin')?.setValue('', { emitEvent: false });
    }

    if (this.isEnchere) {
      this.produitForm.get('prixDepart')?.setValidators([Validators.required, Validators.min(0)]);
      this.produitForm.get('dateDebut')?.setValidators([Validators.required]);
      this.produitForm.get('dateFin')?.setValidators([Validators.required]);
      this.produitForm.get('prixFixe')?.setValue(null, { emitEvent: false });
    }

    // Update validity after validators changed
    Object.keys(this.produitForm.controls).forEach(controlName => {
      this.produitForm.get(controlName)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.isValidImage(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.produitForm.patchValue({ imageUrl: this.imagePreview });
      };
      reader.readAsDataURL(file);
    } else {
      this.toastr.error('Format non supporté ou taille > 2MB (JPG, PNG)');
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.produitForm.patchValue({ imageUrl: null });
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      if (this.isValidImage(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
          this.produitForm.patchValue({ imageUrl: this.imagePreview });
        };
        reader.readAsDataURL(file);
      } else {
        this.toastr.error('Format non supporté ou taille > 2MB (JPG, PNG)');
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  onSubmit(): void {
    if (this.produitForm.invalid) {
      this.markFormGroupTouched(this.produitForm);
      this.toastr.error('Veuillez corriger les erreurs dans le formulaire.');
      return;
    }

    const formValue = this.produitForm.value;

    const produit: ProduitDTO = {
      nom: formValue.nom,
      description: formValue.description,
      typeProduit: formValue.typeProduit,
      prixFixe: formValue.typeProduit === 'CLASSIQUE' ? formValue.prixFixe : undefined,
      prixDepart: formValue.typeProduit === 'ENCHERE' ? formValue.prixDepart : undefined,
      dateDebut: formValue.typeProduit === 'ENCHERE' ? formatDate(formValue.dateDebut, 'yyyy-MM-dd', 'en-US') : undefined,
      dateFin: formValue.typeProduit === 'ENCHERE' ? formatDate(formValue.dateFin, 'yyyy-MM-dd', 'en-US') : undefined,
      imageUrl: formValue.imageUrl,
      categorie: formValue.categorie
    };

    this.produitService.ajouterProduit(produit).subscribe({
      next: () => {
        this.toastr.success('Produit ajouté avec succès');
        this.router.navigate(['/accueil']);
      },
      error: (err) => {
        console.error('Erreur HTTP:', err);
        this.toastr.error(err.error?.message || 'Une erreur est survenue');
      }
    });
  }

  resetForm(): void {
    this.produitForm.reset({
      nom: '',
      description: '',
      typeProduit: 'CLASSIQUE',
      categorie: null,
      prixFixe: null,
      prixDepart: null,
      dateDebut: '',
      dateFin: '',
      imageUrl: ''
    });
    this.imagePreview = null;
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

  private isValidImage(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type) && file.size <= 2 * 1024 * 1024;
  }
}
