import { Injectable } from '@angular/core';
import Parse from 'parse';
import { ParseService } from '../parse.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserName: string = '';
  constructor() {} // Injecter ParseService

  logIn(username: string, password: string) {
    Parse.User.enableUnsafeCurrentUser();
    return Parse.User.logIn(username, password);
  }

  async logOut() {
    try {
      await Parse.User.logOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  getCurrentUser() {
    Parse.User.enableUnsafeCurrentUser();
    return Parse.User.current();
  }

  getNameAndFirstName(): string | null {
    const user = this.getCurrentUser();
    
    if (user) {
      const username = user.get('name') || '';
      const firstName = user.get('firstName') || ''; // Assuming the first name is stored under 'firstName'
      const fullName = `${firstName} ${username}`.trim();
      return fullName; // Combine first name and username
    }
    
    return null;  // Return null if no user is found
  }
  

   getCurrentUserName() {
    const currentUser = Parse.User.current();
    if (currentUser) {
      this.currentUserName = currentUser.get('username') || ''; // Get the username or handle accordingly
      console.log('Current User Name:', this.currentUserName); // Log the current user's name
    } else {
      console.log('No current user logged in.');
    }
    return this.currentUserName; // Optionally return the username
  }

  resetPassword(email: string): Promise<void> {
    return Parse.User.requestPasswordReset(email)
      .then(() => {
        // Password reset request was successful
        return Promise.resolve();
      })
      .catch((error) => {
        // Handle errors
        return Promise.reject(error);
      });
  }

  getName(): string | null {
      const user = this.getCurrentUser();
      return user ? user.get('username') : null;  // Return the username directly
    }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  validatePhoneNumber(phone: string): boolean {
    const phonePattern = /^\+?[0-9]{10,15}$/;
    return phonePattern.test(phone);
  }


  validatePassword(password: string): boolean {
    
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordPattern.test(password);
  }


  confirmPassword(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  async createAdmin(userData: any, imageFile?: File): Promise<void> {
    if (!this.validateEmail(userData.email)) {
      throw new Error("Email non valide");
    }
    if (!this.validatePhoneNumber(userData.phone)) {
      throw new Error("Numéro de téléphone non valide");
    }
    if (!this.validatePassword(userData.password)) {
      throw new Error("Mot de passe non valide : au moins 8 caractères, une majuscule, un chiffre et un symbole");
    }
    if (!this.confirmPassword(userData.password, userData.confirmPassword)) {
      throw new Error("Les mots de passe ne correspondent pas");
    }
    // Créer un nouvel utilisateur Parse
    const adminUser = new Parse.User();
    
    // Définir les champs de l'utilisateur
    adminUser.set('username', userData.username);
    adminUser.set('password', userData.password);
    adminUser.set('email', userData.email);
    adminUser.set('phone', userData.phone);
    adminUser.set('name', userData.name);
    adminUser.set('firstname', userData.firstname);
    adminUser.set('isAdmin', true); // Définir l'attribut isAdmin à true
  
    // Gestion du téléchargement d'image si nécessaire
    if (imageFile) {
        const parseFile = new Parse.File(imageFile.name, imageFile);
        try {
            await parseFile.save(); // Sauvegarder le fichier sur Parse avant de l'associer à l'utilisateur
            adminUser.set('image', parseFile);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'image:', error);
            throw error; // Relancer l'erreur pour gestion dans le composant si nécessaire
        }
    }
  
    // Définir les ACL pour l'utilisateur
    const groupACL = new Parse.ACL();
    groupACL.setPublicReadAccess(true);
    groupACL.setRoleWriteAccess('admin', true);
    adminUser.setACL(groupACL);
  
    try {
        // Sauvegarder l'utilisateur d'abord
        await adminUser.save(); // Utiliser save pour créer l'utilisateur admin
        console.log('Admin créé avec succès');
  
        // Assignation du rôle admin
        const Role = Parse.Object.extend('_Role');
        const roleQuery = new Parse.Query(Role);
        
        // Récupérer le rôle admin
        const adminRole = await roleQuery.get(ParseService.admin);
  
        // Cast adminRole en Parse.Role pour accéder à getUsers
        const castedAdminRole = adminRole as Parse.Role;
  
        // Ajouter l'utilisateur au rôle admin
        castedAdminRole.getUsers().add(adminUser); // Ajouter le nouvel utilisateur admin au rôle
        await castedAdminRole.save(); // Sauvegarder le rôle mis à jour
        console.log('Utilisateur assigné au rôle admin avec succès');
    } catch (error) {
        console.error('Erreur lors de la création de l\'admin:', error);
        throw error; // Relancer l'erreur pour gestion dans le composant si nécessaire
    }
  }
  
  async createUser(userData: any, imageFile?: File): Promise<void> {
    // Create a new Parse User
    if (!this.validateEmail(userData.email)) {
      throw new Error("Email non valide");
    }
    if (!this.validatePhoneNumber(userData.phone)) {
      throw new Error("Numéro de téléphone non valide");
    }
    if (!this.confirmPassword(userData.password, userData.confirmPassword)) {
      throw new Error("Les mots de passe ne correspondent pas");
    }
    const parseUser = new Parse.User();
    
    // Set user fields
    parseUser.set('username', userData.username);
    parseUser.set('password', userData.password);
    parseUser.set('email', userData.email);
    parseUser.set('phone', userData.phone);
    parseUser.set('name', userData.name);
    parseUser.set('firstname', userData.firstname);
    parseUser.set('isAdmin', false); // Set the isAdmin attribute to false
  
    // Handle the image upload if necessary
    if (imageFile) {
      const parseFile = new Parse.File(imageFile.name, imageFile);
      try {
        await parseFile.save(); // Save the file to Parse before setting it to the user
        parseUser.set('image', parseFile);
      } catch (error) {
        console.error('Error saving image:', error);
        throw error; // Re-throw error for handling in the component if needed
      }
    }
  
    // Set ACL for the user
    const groupACL = new Parse.ACL();
    groupACL.setPublicReadAccess(true);
    groupACL.setRoleWriteAccess('admin', true);
    parseUser.setACL(groupACL);
  
    try {
      await parseUser.save(); // Use save to create the user
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Re-throw the error for handling in the component if needed
    }
  }
  
  async loadUserById(userId: string): Promise<any> {
    const userQuery = new Parse.Query(Parse.User);
    try {
      const user = await userQuery.get(userId);
      return user; // Retourne l'objet utilisateur complet
    } catch (error) {
      console.error('Erreur lors du chargement de l\'utilisateur:', error);
      throw error;
    }
  }

  async updateUser(userId: string, userData: any, imageFile?: File): Promise<void> {
  
    // Valider l'email et le numéro de téléphone
    if (!this.validateEmail(userData.email)) {
      throw new Error("Email non valide");
    }
  
    if (!this.validatePhoneNumber(userData.phone)) {
      throw new Error("Numéro de téléphone non valide");
    }
  
    const userQuery = new Parse.Query(Parse.User);
    try {
      const user = await userQuery.get(userId);
  
      // Mettez à jour les champs de l'utilisateur
      user.set('username', userData.username);
      user.set('email', userData.email);
      user.set('phone', userData.phone);
      user.set('name', userData.name);
      user.set('firstname', userData.firstname);
  
      // Gérer l'upload de l'image si nécessaire
      if (imageFile) {
        const parseFile = new Parse.File(imageFile.name, imageFile);
        await parseFile.save();
        user.set('image', parseFile);
      }
  
      await user.save();
      console.log('Utilisateur mis à jour avec succès');
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error;
    }
  }
  

  async deleteUser(userId: string): Promise<void> {
    const userQuery = new Parse.Query(Parse.User);
    try {
      const user = await userQuery.get(userId);
      await user.destroy();
      console.log('Utilisateur ou administrateur supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }
  // Méthode pour récupérer tous les utilisateurs
  async getAllUsers(): Promise<Parse.User[]> {
    const userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('isAdmin', false);
    try {
      const users = await userQuery.find();
      console.log('Tous les utilisateurs récupérés avec succès');
      return users;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  }
  // Méthode pour récupérer tous les administrateurs
  async getAllAdmins(): Promise<Parse.User[]> {
    const adminQuery = new Parse.Query(Parse.User);
    adminQuery.equalTo('isAdmin', true); // Filtrer par isAdmin = true
    try {
      const admins = await adminQuery.find();
      console.log('Tous les administrateurs récupérés avec succès');
      return admins;
    } catch (error) {
      console.error('Erreur lors de la récupération des administrateurs:', error);
      throw error;
    }
  }

}
