import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { HomePageComponent } from '../app/views/home-page/home-page.component';
import { PetListComponent } from '../app/views/pet-list/pet-list.component';
import { PetDetailsComponent } from '../app/components/pet-details/pet-details.component';
import { AddPetComponent } from '../app/views/add-pet/add-pet.component'; // temple-driven
import { AddPetReactiveComponent } from '../app/views/add-pet-reactive/add-pet-reactive.component';
import { EditPetComponent } from '../app/components/edit-pet/edit-pet.component'; // before deployment to delete
import { EditPetMatDialogComponent } from '../app/components/edit-pet-mat-dialog/edit-pet-mat-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    PetListComponent,
    PetDetailsComponent,
    AddPetComponent,
    AddPetReactiveComponent,
    EditPetComponent,
    EditPetMatDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  providers: [PetListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
