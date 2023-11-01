import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
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
export class EditPetMatDialogComponent {
  petFormEdit: FormGroup;
  petEditArray: any;

  @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<EditPetMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) pet: PetInterface
  ) {
    this.petEditArray = pet;

    console.log('petEditArray: ', this.petEditArray);

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

    console.log(this.petFormEdit, 'console.log: petFormEdit');
  }

  close(): void {
    this.matDialogRef.close();
  }

  save() {
    this.dataStorageService.editPet(this.petFormEdit.value);
  }
}
