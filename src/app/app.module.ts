import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { HomePageComponent } from '../app/views/home-page/home-page.component';
import { PetListComponent } from '../app/views/pet-list/pet-list.component';
import { PetDetailsComponent } from '../app/components/pet-details/pet-details.component';
import { AddPetComponent } from '../app/views/add-pet/add-pet.component';
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
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
