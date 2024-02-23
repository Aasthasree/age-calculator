//Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//Components
import { AgeComponent } from './age.component';




@NgModule({
  declarations: [
    AgeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AgeModule { }
