import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataStorageService } from '../../core/dataStorage.service';
import { PetInterface } from '../../core/pet.interface';

@Component({
  selector: 'app-edit-pet-mat-dialog',
  templateUrl: './edit-pet-mat-dialog.component.html',
  styleUrls: ['./edit-pet-mat-dialog.component.css'],
})
export class EditPetMatDialogComponent {
  @Output() onSaveSuccess: EventEmitter<void> = new EventEmitter<void>();

  petFormEdit: FormGroup;
  petEditArray!: PetInterface;
  category: any = null;
  messageSuccess = false;
  error = null;

  categories = [
    { id: 1, name: 'Not selected' },
    { id: 2, name: 'Dog' },
    { id: 3, name: 'Cat' },
    { id: 4, name: 'Bird' },
    { id: 5, name: 'Fish' },
  ];

  statuses = [
    { id: 'available', name: 'Available' },
    { id: 'pending', name: 'Pending' },
    { id: 'sold', name: 'Sold' },
  ];

  constructor(
    private dataStorageService: DataStorageService,
    private matDialogRef: MatDialogRef<EditPetMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: PetInterface
  ) {
    this.buildForm();
    this.getPetById(data);
  }

  buildForm(): void {
    this.petFormEdit = new FormGroup({
      id: new FormControl([null, Validators.required]),
      category: new FormControl({
        id: new FormControl(null),
        name: new FormControl([null]),
      }),
      name: new FormControl([
        null,
        [Validators.required, Validators.pattern('[a-zA-Z].*')],
      ]),
      photoUrls: new FormControl([null]),
      tags: new FormControl([
        {
          id: new FormControl(null),
          name: new FormControl(null),
        },
      ]),
      status: new FormControl([null, Validators.required]),
    });
  }

  getPetById(id: PetInterface): void {
    this.dataStorageService.getPetById(id).subscribe({
      next: (res: PetInterface) => {
        this.petEditArray = res;
        this.petFormEdit.patchValue(res);
        this.category = res.category;
      },
      error: (err: any) => {
        alert('Pet not found');
        this.close();
      },
    });
  }

  close(): void {
    this.matDialogRef.close();
  }

  save() {
    let data: any = this.petFormEdit.value;
    this.categories.forEach((item) => {
      if (item.id === data.category) {
        data.category = item;
      }
    });
    this.messageSuccess = true;
    this.dataStorageService.updatePet(data).subscribe({
      next: () => {
        setTimeout(() => {
          this.messageSuccess = false;
          this.matDialogRef.close();
          this.onSaveSuccess.emit();
          // alert('Pet uploaded');
        }, 1000);
      },

      error: (err: any) => {
        this.error = err.message;
        console.error('Error deleting pet: ', err);
        // alert('Pet not found');
        this.close();
      },
    });
  }

  onHandleError() {
    this.error = null;
  }

  getValues() {
    // console.log('console.log petFormEdit: ', this.petFormEdit);
    console.log('console.log petFormEdit.value: ', this.petFormEdit.value);
  }
}
