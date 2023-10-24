import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PetModel } from '../shared/pet.model';
import { PetService } from '../shared/pet.service';
import { DataStorageService } from '../shared/dataStorage.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css'],
})
export class PetDetailsComponent implements OnInit {
  pet: any;
  id: number;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.pet = this.dataStorageService.getPetById(this.id);
    });
    // const id = this.route.snapshot.params['id']; //varianta 1
    // // this.data = this.petService.getGeneralData();
  }
}

// export class PetDetailsComponentOriginal implements OnInit {
//   pet: PetModel;
//   id: number;

//   constructor(
//     private petService: PetService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.route.params.subscribe((params: Params) => {
//       this.id = +params['id'];
//       this.pet = this.petService.gethardcodedPet(this.id);
//     });
//     // const id = this.route.snapshot.params['id']; //varianta 1
//     // // this.data = this.petService.getGeneralData();
//   }
// }
