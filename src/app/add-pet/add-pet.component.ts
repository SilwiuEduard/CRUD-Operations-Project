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
  @ViewChild('formAddRef') submitForm: NgForm;
  defaultStatus = 'available';

  isSubmitted: boolean = false; // pentru fereastra confirmare/eroare dupa submit

  constructor(
    private router: Router,
    private petService: PetService,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  onSubmit(form: NgForm) {
    this.isSubmitted = true;

    const value = form.value;
    const newPet = new PetModel(
      value.id,
      {
        id: value.categoryI,
        name: value.categoryN,
      },
      value.name,
      [value.photo],
      [{ id: value.tagI, name: value.tagN }],
      value.status
    );
    this.dataStorageService.addPet(newPet);

    console.log(form);

    setTimeout(() => {
      this.isSubmitted = false;
      this.router.navigate(['/list']);
      window.scrollTo(0, 0);
    }, 1500);
  }

  onCancel() {
    this.submitForm.reset();
  }
}
