//Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Custom Module
import { AppRoutingModule } from './app-routing.module';
import { AgeModule } from './age/age.module';
//Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }