// import { Injectable } from '@angular/core';
// import {
//   Resolve,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';

// import { PetModel } from '../shared/pet.model';
// import { DataStorageService } from '../shared/dataStorage.service';
// import { PetService } from '../shared/pet.service';

// @Injectable({ providedIn: 'root' })
// export class PetsResolverService implements Resolve<PetModel[]> {
//   constructor(
//     private dataStorageService: DataStorageService,
//     private petService: PetService
//   ) {}

// // ! To fix the resolve syntax
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const pets = this.petService.getPetsArray();

//     if (pets.length === 0) {
//       return this.dataStorageService.fetchPets();
//     } else {
//       return pets;
//     }
//   }
// }
