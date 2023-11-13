import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { HomePageComponent } from '../app/views/home-page/home-page.component';
import { PetListComponent } from '../app/views/pet-list/pet-list.component';
import { PetDetailsComponent } from '../app/components/pet-details/pet-details.component';
import { AddPetComponent } from '../app/views/add-pet/add-pet.component';
import { AddPetReactiveComponent } from '../app/views/add-pet-reactive/add-pet-reactive.component';
import { EditPetMatDialogComponent } from '../app/components/edit-pet-mat-dialog/edit-pet-mat-dialog.component';
// import { PetsResolverService } from './shared/pets-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'list', component: PetListComponent },
  {
    path: 'view/:id',
    component: PetDetailsComponent,
    // resolve: [PetsResolverService],
  },

  { path: 'add', component: AddPetComponent },
  { path: 'addR', component: AddPetReactiveComponent },
  { path: 'editMD', component: EditPetMatDialogComponent },
  { path: 'editMD2', component: EditPetMatDialogComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
