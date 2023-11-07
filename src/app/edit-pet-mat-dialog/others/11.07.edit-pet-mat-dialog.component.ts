import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PetInterface } from '../shared/pet.interface';
import { DataStorageService } from '../shared/dataStorage.service';

@Component({
  selector: 'app-edit-pet-mat-dialog',
  templateUrl: './edit-pet-mat-dialog.component.html',
  styleUrls: ['./edit-pet-mat-dialog.component.css'],
})
export class EditPetMatDialogComponent implements OnInit {
  petFormEdit: FormGroup;
  petEditArray: any;
  addPetEditValues: any = {};

  defaultOptionForCategory: any; // for category mat-option

  @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<EditPetMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) pet: any
  ) {
    this.petEditArray = pet;
    // this.defaultOptionForCategory = pet.category.id.toString();
    console.log(this.defaultOptionForCategory, 'log defaultOptionForCategory');

    // debugger;
    console.log('log petEditArray: ', this.petEditArray);
    console.log('log pet: ', pet);

    this.petFormEdit = fb.group({
      id: [pet.id],
      category: this.fb.group({
        id: [pet.category.id],
        name: [pet.category.name, Validators.required],
      }),
      name: [pet.name, [Validators.required, Validators.pattern('[a-zA-Z].*')]],
      photoUrls: [pet.photoUrls],
      tags: this.fb.array([
        this.fb.group({
          id: this.fb.control(pet.tags.id),
          name: this.fb.control(pet.tags.name),
        }),
      ]),
      status: [pet.status, Validators.required],
    });

    // console.log('log: petFormEdit', this.petFormEdit);
  }

  ngOnInit() {}

  onCategorySelect() {
    const categoryName = this.petFormEdit.get('category').get('name').value;

    switch (categoryName) {
      case 'Not selected':
        this.petFormEdit.get('category').get('id').setValue(1);
        break;
      case 'Dog':
        this.petFormEdit.get('category').get('id').setValue(2);
        break;
      case 'Cat':
        this.petFormEdit.get('category').get('id').setValue(3);
        break;
      case 'Bird':
        this.petFormEdit.get('category').get('id').setValue(4);
        break;
      case 'Fish':
        this.petFormEdit.get('category').get('id').setValue(5);
        break;
      default:
        this.petFormEdit.get('category').get('name').value;
        break;
    }
  }

  close(): void {
    this.matDialogRef.close();
  }

  save() {
    // debugger;
    this.addPetEditValues.id = this.petFormEdit.get('id').value;
    this.addPetEditValues.category = {
      id: this.petFormEdit.get('category.id').value,
      name: this.petFormEdit.get('category.name').value,
    };
    this.addPetEditValues.name = this.petFormEdit.get('name').value;
    this.addPetEditValues.photoUrls = this.petFormEdit.get('photoUrls').value;
    this.addPetEditValues.tags = this.petFormEdit.get('tags').value;
    this.addPetEditValues.status = this.petFormEdit.get('status').value;

    if (
      this.addPetEditValues.name !== '' &&
      this.addPetEditValues.status !== ''
    ) {
      this.dataStorageService.editPet(this.addPetEditValues);
      this.addPetEditValues = {};
    }

    console.log(this.petFormEdit, 'console.log on submitForm');
    this.dataStorageService.fetchPets('all');
    this.matDialogRef.close();
  }

  // save() {
  //   if (this.petFormEdit.valid) {
  //     this.dataStorageService.editPet(this.petFormEdit.value).subscribe(
  //       () => {
  //         // Success
  //         this.matDialogRef.close();
  //       },
  //       (error) => {
  //         // Error
  //         console.log(error);
  //       }
  //     );
  //   } else {
  //     console.log('Invalid form');
  //   }
  // }

  // updateDialogTitle(): void {
  //   const nameControl = this.petFormEdit.get('name');
  //   if (nameControl) {
  //     this.petEditArray.name = nameControl.value;
  //   }
  // }

  getValues() {
    // console.log('console.log petFormEdit: ', this.petFormEdit);
    console.log('console.log petFormEdit.value: ', this.petFormEdit.value);
  }
}
