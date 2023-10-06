import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { PetModel } from '../shared/pet.model';
import { PetService } from '../shared/pet.service';
import { DataStorageService } from '../shared/dataStorage.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'],
})
export class AddPetComponent {
  @ViewChild('formEditRef') submitForm: NgForm;
  defaultStatus = 'Available';

  submitted = false;

  constructor(
    private router: Router,
    private petService: PetService,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  onAddSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;

    const value = form.value;
    const newPet = new PetModel(
      value.index,
      {
        id: value.categoryI,
        name: value.categoryN,
      },
      value.name,
      [value.photo],
      [{ id: value.tagI, name: value.tagN }],
      value.status
    );
    this.petService.addPet(newPet);

    this.router.navigate(['/list']);
    form.reset();
  }

  onSaveData() {
    this.dataStorageService.storePets();
  }

  OnCancel() {
    this.submitForm.reset();
  }
}
