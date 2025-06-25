import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProduitDTO {
  id: number;
  nom: string;
  description: string;
  typeProduit: 'CLASSIQUE' | 'ENCHERE';
  prixFixe?: number;
  prixDepart?: number;
  dateDebut?: string;
  dateFin?: string;
    imageUrls: string[];  // Changé de imageUrl à imageUrls (tableau)

  categorie: number;

}


@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private baseUrl = 'http://localhost:8081/api/produits';

  constructor(private http: HttpClient) {}
ajouterProduit(produit: ProduitDTO): Observable<any> {
  let token = localStorage.getItem('auth_token');

  if (!token) {
    // Token bidon pour test uniquement
    token = 'fake-token-for-testing';
  }
  
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.post(`${this.baseUrl}/ajoutProduit`, produit, { headers });
}
  getAllProduits(): Observable<ProduitDTO[]> {
    return this.http.get<ProduitDTO[]>(`${this.baseUrl}`);
  }

  getProduitsParType(type: 'CLASSIQUE' | 'ENCHERE'): Observable<ProduitDTO[]> {
    return this.http.get<ProduitDTO[]>(`${this.baseUrl}/type/${type}`);
  }


}
