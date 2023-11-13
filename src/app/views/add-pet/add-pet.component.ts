import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PetModel } from '../../shared/pet.model';
import { DataStorageService } from '../../core/dataStorage.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'],
})
export class AddPetComponent {
  @ViewChild('formAddRef') submitForm: NgForm;
  defaultStatus = 'available';
  isSubmitted: boolean = false;
  error = null;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  onSubmit(form: NgForm) {
    this.isSubmitted = true;

    const petProps = form.value;
    const newPet = new PetModel(
      petProps.id,
      {
        id: petProps.categoryI,
        name: petProps.categoryN,
      },
      petProps.name,
      [petProps.photo],
      [{ id: petProps.tagI, name: petProps.tagN }],
      petProps.status
    );
    this.dataStorageService.addPet(newPet).subscribe({
      next: () => {
        if (this.isSubmitted === true) {
          setTimeout(() => {
            this.router.navigate(['/list']);
            window.scrollTo(0, 0);
          }, 1000);
        }
      },
      error: (err) => {
        this.error = err.message;
        console.error('Error deleting pet: ', err);
      },
    });

    console.log(form);
  }

  onCancel() {
    this.submitForm.reset();
  }
}
