import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddPetReactiveComponent } from './add-pet-reactive/add-pet-reactive/add-pet-reactive.component';
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
  {
    path: 'edit/:id',
    component: EditPetComponent,
    // resolve: [PetsResolverService],
  },
  { path: 'add', component: AddPetComponent },
  { path: 'addR', component: AddPetReactiveComponent },
  { path: 'edit', component: EditPetComponent },
  { path: 'test', component: PetDetailsComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
