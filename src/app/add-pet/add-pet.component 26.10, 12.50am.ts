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
  defaultStatus = 'Available';

  isSubmitted: boolean = false; // pentru fereastra confirmare/eroare dupa submit

  constructor(
    private router: Router,
    private petService: PetService,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  onSubmit(form: NgForm) {
    console.log(form);
    this.isSubmitted = true;

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

    setTimeout(() => {
      this.isSubmitted = false;
      window.scrollTo(0, 0);
      this.router.navigate(['/list']);
    }, 1500);
  }

  onCancel() {
    this.submitForm.reset();
  }
}

// submitedForm(form: NgForm) {
//   console.log(form.value);
//   this.isSubmitted = true;

//   const value = form.value;
//   const newPet = new PetModel(
//     value.id,
//     {
//       id: value.categoryI,
//       name: value.categoryN,
//     },
//     value.name,
//     [value.photo],
//     [{ id: value.tagI, name: value.tagN }],
//     value.status
//   );
//   this.petService.addPet(newPet);

//   this.router.navigate(['/list']);
//   form.reset();
// }

// onCancel() {
//   this.submitForm.reset();
// }

// onSavePet(form) {
//   this.dataStorageService.addPet(form);
// }

// onSubmit(petForm: NgForm) {
//   console.log('form : ', petForm.form.value, petForm);
//   const petData = new PetModel(
//     this.model.id,
//     { id: this.model.category.id, name: this.model.category.name },
//     this.model.name,
//     this.model.photoUrls,
//     this.model.tags.map((tag) => ({ id: tag.id, name: tag.name })),
//     this.model.status
//   );
//   this.dataStorageService.addPet(petForm.form.value).subscribe({
//     next: (res) => {
//       console.log('console.log: res: ', res);
//       this.isSubmitted = true;
//       petForm.resetForm();
//       setTimeout(() => {
//         this.isSubmitted = false;
//         window.scrollTo(0, 0);
//         this.router.navigate(['/list']);
//       }, 1500);
//     },
//     error: (err) => console.log(err),
//   });

// const value = petForm.value;
// const newPet = new PetModel(
//   value.id,
//   {
//     id: value.id,
//     name: value.name,
//   },
//   value.name,
//   [value.photo],
//   [{ id: value.id, name: value.name }],
//   value.status
// );
// this.dataStorageService.addPet(petForm.form.value).subscribe({
//   next: (res) => {
//     console.log('console.log: res: ', res);
//     this.isSubmitted = true;
//     petForm.resetForm();
//     setTimeout(() => {
//       this.isSubmitted = false;
//       window.scrollTo(0, 0);
//       this.router.navigate(['/list']);
//     }, 1500);
//   },
//   error: (err) => console.log(err),
// });
