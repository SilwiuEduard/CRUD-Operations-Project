import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { DataStorageService } from 'src/app/shared/dataStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet-reactive',
  templateUrl: './add-pet-reactive.component.html',
  styleUrls: ['./add-pet-reactive.component.css'],
})
export class AddPetReactiveComponent {
  petForm: FormGroup;

  addPetValues: any = {};

  msgSuccess: boolean = false;
  msgWarning: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onInputChange() {
    if (this.petForm.valid) {
      this.msgWarning = false;
    } else {
      this.msgWarning = true;
      this.msgSuccess = false;
    }
  }

  submitForm() {
    if (this.petForm.valid) {
      this.msgSuccess = true;
      this.msgWarning = false;
    } else {
      this.msgWarning = true;
      this.msgSuccess = false;
    }

    if (this.msgSuccess === true) {
      setTimeout(() => {
        // this.router.navigate(['/list']);
      }, 1000);
    }
    this.dataStorageService.addPet(this.petForm.value);
    this.onCancel();
  }

  private initForm() {
    let petId = '';
    let petCategory = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
    });
    let petName = '';
    let petPhotoUrls = new FormArray([]);
    let petTags = new FormArray([]);
    let petStatus = '';

    this.petForm = new FormGroup({
      id: new FormControl(petId, [
        Validators.required,
        Validators.pattern('^[1-9]d*$'),
      ]),
      category: petCategory,
      name: new FormControl(petName, [
        Validators.required,
        Validators.pattern('[a-zA-Z].*'),
      ]),
      // photoUrls: this.petPhotoUrls.push
      // tags: petTags,
      status: new FormControl('available', Validators.required),
    });
  }

  onAddPhotos() {
    const control = new FormControl(null);
    (this.petForm.get('photoUrls2') as FormArray).push(control);
  }

  onAddTags() {
    (this.petForm.get('tags') as FormArray).push(
      new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null),
      })
    );
  }
  onCancel() {
    this.petForm.reset();
  }

  onDeletePhoto(index: number) {
    (<FormArray>this.petForm.get('photoUrls2')).removeAt(index);
  }

  onDeleteTag(index: number) {
    (<FormArray>this.petForm.get('tags')).removeAt(index);
  }
}
