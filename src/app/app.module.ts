// Core Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Plugin Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Store Module
import { StoreModule } from '@ngrx/store';
import { StoreState } from './store/index';

// App Routing Module & Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CountUpModule } from 'ngx-countup';
import { ParseService } from './parse.service';
import Parse from 'parse';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SidebarCategoriesComponent } from './FrontOffice/sidebar-categories/sidebar-categories.component';
import { TopbarComponent } from './FrontOffice/topbar/topbar.component';
import { ProductListComponent } from './FrontOffice/product-list/product-list.component';
import { CartComponent } from './FrontOffice/cart/cart.component'; // adapte le chemin si besoin
import { AjoutProduitComponent } from './FrontOffice/components/ajout-produit/ajout-produit.component'; // adapte le chemin si besoin

@NgModule({
  declarations: [
    AppComponent,
    
    SidebarCategoriesComponent,
    TopbarComponent,
    ProductListComponent,
    CartComponent,
        AjoutProduitComponent
    
  ],

  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot(StoreState),
    CountUpModule,
    HttpClientModule,
     BrowserAnimationsModule, // ✅ requis pour ngx-toastr
    ToastrModule.forRoot(), 

  ],


  providers: [
  ParseService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
],

  bootstrap: [AppComponent],
  exports: [
  
  
  
  ]
})



export class AppModule { 

  constructor() {
    Parse.initialize('QbtGNBEEoo9OB6ZlWJ1gIFC3Okpi6xg2gV2YeupH', '3Uxq3esdrFKY34h6LYySQXsz7eiIbubvWAqvfYli','tvX240pDJSBrsPmGh9TQbOW3oa4yttKXnMQxgcT2'); // Replace with your actual Parse app keys
    Parse.serverURL = 'https://parseapi.back4app.com/parse'; // Replace with your Parse Server URL
    Parse.masterKey = 'tvX240pDJSBrsPmGh9TQbOW3oa4yttKXnMQxgcT2';

  }

}


