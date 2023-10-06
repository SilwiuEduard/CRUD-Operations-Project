import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PetModel } from '../shared/pet.model';
import { PetService } from '../shared/pet.service';
import { DataStorageService } from '../shared/dataStorage.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css'],
})
export class EditPetComponent implements OnInit, OnDestroy {
  defaultStatus = 'available';
  pet: PetModel;
  id: number;
  // #####
  @ViewChild('formEditRef', { static: false }) EditForm: NgForm;
  // #####
  subscription$: Subscription;
  editedPetIndex: number;
  editedPet: PetModel;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   this.pet = this.petService.gethardcodedPet(this.id);
    // });
    this.subscription$ = this.petService.startedEditing.subscribe(
      (index: number) => {
        this.editedPetIndex = index;
        this.editedPet = this.petService.gethardcodedPet(index);
        this.EditForm.setValue({
          index: this.editedPet.id,
          category: {
            categoryI: this.editedPet.category.id,
            categoryN: this.editedPet.category.name,
          },
          name: this.editedPet.name,
          //  photoUrls: [photo: this.editedPet.photoUrls],
          //  tags: [{tagI: this.editedPet.tags.id, tagN: this.editedPet.tags.name}],
          status: this.editedPet.status,
        });

        // #### v2 #####
        //    this.EditForm.setValue({
        //  index: this.editedPet.id,
        //   categoryI: this.editedPet.category.id,
        //   categoryN: this.editedPet.category.name,
        //   name: this.editedPet.name,
        //   photo: this.editedPet.photoUrls,
        //   tagI: this.editedPet.tags.id, // ! ??? de ce nu merge
        //   tagN: this.editedPet.tags.name, // ! ??? de ce nu merge
        //   status: this.editedPet.status,
        //    })
      }
    );
  }

  onEditPet(form: NgForm) {
    console.log(this.EditForm);
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
    this.petService.upgradePet(this.editedPetIndex, newPet);
    this.router.navigate(['/list']);
    form.reset();
  }

  OnEditData() {
    this.dataStorageService.storePets();
  }

  OnCancel() {
    this.EditForm.reset();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
