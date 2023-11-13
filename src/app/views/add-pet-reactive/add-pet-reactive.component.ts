import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { DataStorageService } from '../../core/dataStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet-reactive',
  templateUrl: './add-pet-reactive.component.html',
  styleUrls: ['./add-pet-reactive.component.css'],
})
export class AddPetReactiveComponent {
  addPetValues: any = {};
  msgSuccess: boolean = false;
  msgWarning: boolean = false;
  error = null;

  petForm = this.fb.group({
    id: [''],
    category: this.fb.group({
      id: [''],
      name: [''],
    }),
    name: [''],
    photoUrls: this.fb.array([]),
    tags: this.fb.array([]),
    status: [''],
  });

  get id() {
    return this.petForm.get('id');
  }
  get name() {
    return this.petForm.get('name');
  }
  get photoUrls() {
    return (this.petForm.get('photoUrls') as FormArray).controls;
  }
  get tags() {
    return (this.petForm.get('tags') as FormArray).controls;
  }
  get status() {
    return this.petForm.get('status');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.petForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      category: this.fb.group({
        id: ['1'],
        name: ['Not selected'],
      }),
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z].*')]],
      photoUrls: this.fb.array([]),
      tags: this.fb.array([]),
      status: ['available', Validators.required],
    });
  }

  getValues() {
    console.log(
      'console.log petForm: ',
      this.petForm,
      'console.log petForm.value: ',
      this.petForm.value
    );
  }
  onInputChange() {
    if (this.petForm.valid) {
      this.msgWarning = false;
    } else {
      this.msgWarning = true;
      this.msgSuccess = false;
    }
  }

  onCategorySelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    let categoryId = '1';
    let categoryName = 'Not selected';
    console.log(selectedValue);
    if (selectedValue === '2') {
      categoryId = '2';
      categoryName = 'Dog';
    } else if (selectedValue === '3') {
      categoryId = '3';
      categoryName = 'Cat';
    } else if (selectedValue === '4') {
      categoryId = '4';
      categoryName = 'Bird';
    } else if (selectedValue === '5') {
      categoryId = '5';
      categoryName = 'Fish';
    }

    this.petForm.get('category.id').setValue(categoryId);
    this.petForm.get('category.name').setValue(categoryName);
  }

  submitForm() {
    if (this.petForm.valid) {
      this.msgSuccess = true;
      this.msgWarning = false;
    } else {
      this.msgWarning = true;
      this.msgSuccess = false;
    }

    this.addPetValues.id = this.petForm.get('id').value;
    this.addPetValues.category = {
      id: this.petForm.get('category.id').value,
      name: this.petForm.get('category.name').value,
    };
    this.addPetValues.name = this.petForm.get('name').value;
    this.addPetValues.photoUrls = this.petForm.get('photoUrls').value;
    this.addPetValues.tags = this.petForm.get('tags').value;
    this.addPetValues.status = this.petForm.get('status').value;

    if (this.addPetValues.name !== '' && this.addPetValues.status !== '') {
      this.dataStorageService.addPet(this.addPetValues).subscribe({
        next: () => {
          if (this.msgSuccess === true) {
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
      this.addPetValues = {};
    }

    // console.log(this.petForm, 'console.log on submitForm');
  }

  onAddPhotos() {
    const newPhotoUrl = new FormControl('', Validators.required);
    (this.petForm.get('photoUrls') as FormArray).push(newPhotoUrl);
  }

  onAddTags() {
    (this.petForm.get('tags') as FormArray).push(
      new FormGroup({
        id: new FormControl(null, [
          Validators.required,
          ,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        name: new FormControl(null, Validators.required),
      })
    );
  }

  onDeletePhoto(index: number) {
    (<FormArray>this.petForm.get('photoUrls')).removeAt(index);
  }

  onDeleteTag(index: number) {
    (<FormArray>this.petForm.get('tags')).removeAt(index);
  }

  onCancel() {
    this.petForm.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
