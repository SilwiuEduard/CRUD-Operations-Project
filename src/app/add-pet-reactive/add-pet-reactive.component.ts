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
  petForm = this.fb.group({
    id: [''],
    category: this.fb.group({
      id: [''],
      name: [''],
    }),
    name: [''],
    photoUrls: this.fb.array([]),
    tags: this.fb.array([]),
    status: ['available'],
  });

  get id() {
    return this.petForm.get('id');
  }
  get catId() {
    return this.petForm.get('category.id');
  }
  get catName() {
    return this.petForm.get('category.name');
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

  addPetValues: any = {};

  msgSuccess: boolean = false;
  msgWarning: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.fb.group({
      id: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      category: this.fb.group({
        id: '',
        name: 'not selected',
      }),
      name: ['', Validators.required, Validators.pattern('[a-zA-Z].*')],
      photoUrls: [''],
      // this.fb.array([this.fb.control(null)]),
      tags: [''],
      // this.fb.array([
      //   this.fb.group({
      //     id: this.fb.control(''),
      //     name: this.fb.control(''),
      //   }),
      // ]),
      status: ['available', Validators.required],
    });
  }

  getValues() {
    console.log(this.petForm, this.petForm.value);
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
        this.router.navigate(['/list']);
        window.scrollTo(0, 0);
      }, 1000);
    }
    // debugger;
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
      this.dataStorageService.addPet(this.addPetValues);
      this.addPetValues = {};
    }

    console.log(this.petForm);
  }

  onAddPhotos() {
    const control = new FormControl('', Validators.required);
    (this.petForm.get('photoUrls') as FormArray).push(control);
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
}