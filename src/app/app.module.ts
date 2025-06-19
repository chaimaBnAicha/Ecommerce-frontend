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

@NgModule({
  declarations: [
    AppComponent
    
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot(StoreState),
    CountUpModule,

  ],


  providers: [ParseService],
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


