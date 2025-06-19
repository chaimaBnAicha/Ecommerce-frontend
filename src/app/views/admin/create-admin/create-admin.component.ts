import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent {
  adminForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.adminForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      image: [null]  // You can handle image upload separately
    });
  }

  async onSubmit() {
    if (this.adminForm.invalid) {
      return; // Handle form validation errors
    }

    const userData = this.adminForm.value;

    try {
      await this.userService.createAdmin(userData, userData.image);
      console.log('Admin created successfully');
      // You might want to reset the form or redirect the user
    } catch (error: any) { // Specify the type of error as 'any'
      console.error('Error creating admin:', error.message || error); // Access the error message
      // Handle error accordingly, e.g., show a notification or alert
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.adminForm.patchValue({
        image: file
      });
    }
  }
}
