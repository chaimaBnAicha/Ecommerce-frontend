import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';  // Adjusted path
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: []
})
export class SignInComponent implements OnInit {
  username: string = ''; // Declare username
  password: string = ''; // Declare password
  errorMessage: string = ''; // To hold error messages
  usernameError: string = ''; // Error message for username
  passwordError: string = ''; // Error message for password

  constructor(private parseService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    // Reset error messages
    this.usernameError = '';
    this.passwordError = '';
    this.errorMessage = '';

    // Validate username and password
    if (!this.username) {
      this.usernameError = 'Le champ "Nom Utilisateur" est requis.'; // En français
    }

    if (!this.password) {
      this.passwordError = 'Le champ "Mot de passe" est requis.'; // En français
    }

    // Exit if there are validation errors
    if (this.usernameError || this.passwordError) {
      return;
    }

    // Call the logIn method from the Parse service
    this.parseService.logIn(this.username, this.password).then((user: Parse.User) => {
      console.log('Utilisateur connecté :', user);
      this.router.navigate(['/dashboard']);
    }).catch((error: any) => {
      console.error('Erreur lors de la connexion :', error);
      if (error.code === 101) {
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe invalide. Veuillez réessayer.'; // En français
      } else if (error.code === 200) {
        this.errorMessage = 'Erreur réseau. Veuillez vérifier votre connexion internet.'; // En français
      } else {
        this.errorMessage = 'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.'; // En français
      }
    });
  }
}
