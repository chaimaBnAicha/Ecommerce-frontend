import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: [
  ]
})
export class SignUpComponent implements OnInit {
  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  mail : any
  fullName : any 
  errorMessage: any;
  Sexe : any
  submit  = false ;

  constructor() { }

  ngOnInit(): void {
  }

  isValidateEmail(email: string): boolean {
    return this.emailPattern.test(email);
}




signupUser() {   
  this.submit = true ;
  console.log(this.errorMessage)
  this.errorMessage = '';

  if (!this.isValidateEmail(this.mail)) {
    this.errorMessage = "Email non valide.";
    console.log(this.errorMessage)
    return;
  }
}
 

}
