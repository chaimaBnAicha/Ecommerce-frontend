// src/app/parse.service.ts

import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root' // Ce service sera disponible dans toute l'application
})
export class ParseService {
  static admin: string = "J7C9b7Prv0";
  static user: string = "3wmSNrpJl6";
  static intern: string = "tx0Dmvu4WQ";
  constructor() {
    // Initialiser Parse avec vos identifiants et l'URL de votre serveur
    Parse.initialize('QbtGNBEEoo9OB6ZlWJ1gIFC3Okpi6xg2gV2YeupH', '3Uxq3esdrFKY34h6LYySQXsz7eiIbubvWAqvfYli');
    Parse.serverURL = 'https://parseapi.back4app.com'; // Remplacez par l'URL de votre serveur Parse
  }
}
