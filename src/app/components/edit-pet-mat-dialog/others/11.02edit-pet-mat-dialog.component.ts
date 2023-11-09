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
  petEditArray: PetInterface;

  @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<EditPetMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) pet: PetInterface
  ) {
    this.petEditArray = pet;

    // debugger;
    console.log('log petEditArray: ', this.petEditArray, 'log pet: ', pet);

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
          id: this.fb.control(pet.tags),
          name: this.fb.control(pet.tags),
        }),
      ]),
      status: [pet.status, Validators.required],
    });

    console.log('log: petFormEdit', this.petFormEdit);
  }

  ngOnInit() {
    const nameControl = this.petFormEdit.get('name');
    if (nameControl) {
      nameControl.valueChanges.subscribe(() => {
        this.updateDialogTitle();
      });
    }

    let categoryId;
    let categoryName;

    switch (this.petEditArray.category.id) {
      case 1:
        categoryId = 1;
        categoryName = 'Not selected';
        break;
      case 2:
        categoryId = 2;
        categoryName = 'Dog';
        break;
      case 3:
        categoryId = 3;
        categoryName = 'Cat';
        break;
      case 4:
        categoryId = 4;
        categoryName = 'Bird';
        break;
      case 5:
        categoryId = 5;
        categoryName = 'Fish';
        break;
      default:
        categoryId = 1;
        categoryName = 'Not selected';
        break;
    }

    this.petFormEdit.get('category.id').setValue(categoryId);
    this.petFormEdit.get('category.name').setValue(categoryName);
  }

  onCategorySelect(event: Event) {
    const selectedValue = parseInt(
      (event.target as HTMLSelectElement).value,
      10
    );
    let categoryId;
    let categoryName;

    console.log(selectedValue);

    if (selectedValue === 1) {
      categoryId = 1;
      categoryName = 'Not Selected';
    } else if (selectedValue === 2) {
      categoryId = 2;
      categoryName = 'Dog';
    } else if (selectedValue === 3) {
      categoryId = 3;
      categoryName = 'Cat';
    } else if (selectedValue === 4) {
      categoryId = 4;
      categoryName = 'Bird';
    } else if (selectedValue === 5) {
      categoryId = 5;
      categoryName = 'Fish';
    }

    this.petFormEdit.get('category.id').setValue(categoryId);
    this.petFormEdit.get('category.name').setValue(categoryName);
  }

  close(): void {
    this.matDialogRef.close();
  }

  save(): void {
    this.dataStorageService.editPet(this.petFormEdit.value);
  }

  updateDialogTitle(): void {
    const nameControl = this.petFormEdit.get('name');
    if (nameControl) {
      this.petEditArray.name = nameControl.value;
    }
  }

  getValues() {
    console.log(
      'console.log petFormEdit: ',
      this.petFormEdit,
      'console.log petFormEdit.value: ',
      this.petFormEdit.value
    );
  }
}
