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

  defaultOptionForCategory: any; // for category mat-option

  @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<EditPetMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) pet: PetInterface
  ) {
    this.petEditArray = pet;
    this.defaultOptionForCategory = pet.category.id.toString();
    console.log(this.defaultOptionForCategory, 'log defaultOptionForCategory');

    // debugger;
    // console.log('log petEditArray: ', this.petEditArray, 'log pet: ', pet);

    this.petFormEdit = fb.group({
      id: [pet.id],
      category: this.fb.group({
        id: [pet.category.id.toString()],
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

    // console.log('log: petFormEdit', this.petFormEdit);
  }

  ngOnInit() {}

  onCategorySelect() {
    const selectedCategoryId = parseInt(
      (event.target as HTMLSelectElement).value,
      10
    );
    // this.defaultOptionForCategory = selectedCategoryId;
    let categoryId = this.petFormEdit.get('category').get('id');
    let categoryName: any = this.petFormEdit.get('category').get('name');

    if (selectedCategoryId >= 1 && selectedCategoryId <= 5) {
      switch (selectedCategoryId) {
        case '1':
          categoryName = 'Not selected';
          break;
        case '2':
          categoryName = 'Dog';
          break;
        case '3':
          categoryName = 'Cat';
          break;
        case '4':
          categoryName = 'Bird';
          break;
        case '5':
          categoryName = 'Fish';
          break;
        default:
          categoryName = ''; // sau orice altă valoare implicită pe care dorești să o setezi

          this.petFormEdit.get('category').get('name').setValue(categoryName);
      }
    }

    // Poți să păstrezi valorile în variabile de clasă pentru a le utiliza ulterior
    // this.categoryId = categoryId;
    // this.categoryName = categoryName;
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
