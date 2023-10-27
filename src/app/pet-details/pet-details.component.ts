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
  infoPet: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.petService.petId = Number(params['id']);
    });
    this.infoPet = this.dataStorageService.getPetById(this.petService.petId);
    console.log(this.infoPet);
  }
}
