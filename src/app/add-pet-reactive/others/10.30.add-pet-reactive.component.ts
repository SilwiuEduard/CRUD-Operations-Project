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
  // ! inainte sa transform totul in FormBuilder

  petForm: FormGroup = new FormGroup({
    id: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[1-9]d*$'),
    ]),
    category: new FormGroup({
      catId: new FormControl(null),
      catName: new FormControl(null),
    }),
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'),
    ]),
    photoUrls2: new FormArray([]),
    tags: new FormArray([]),
    status: new FormControl('available', Validators.required),
  });

  get id() {
    return this.petForm.get('id');
  }
  // get catId() {
  //   return this.petForm.get('category.catId');
  // }
  // get catName() {
  //   return this.petForm.get('category.catName');
  // }
  get name() {
    return this.petForm.get('name');
  }

  // get photoUrls() {
  //   return this.petForm.get('photoUrls');
  // }
  // get tagsId() {
  //   return this.petForm.get('tags.tagsId');
  // }
  // get tagsName() {
  //   return this.petForm.get('tags.tagsName');
  // }
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
    this.petForm = this.fb.group({
      // Starting Values
      id: null,
      category: this.fb.group({
        id: '',
        name: '',
      }),
      photoUrls2: this.fb.array([]),
      tags: this.fb.array([]),
      status: 'available',
    });
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

    this.addPetValues.id = this.petForm.get('id').value;
    // (this.addPetValues.category = {
    //   catId: this.petForm.get('category.catId').value,
    //   catName: this.petForm.get('category.catName'),
    // }),
    // this.addPetValues.category.catName = this.petForm.get('catName');
    this.addPetValues.name = this.petForm.get('name').value;
    this.addPetValues.photoUrls2 = this.petForm.get('photoUrls2').value;
    // this.addPetValues.tags = [
    //   {
    //     tagsId: this.petForm.get('tags.tagsId').value,
    //     tagsName: this.petForm.get('tags.tagsName'),
    //   },
    // ];
    this.addPetValues.status = this.petForm.get('status').value;

    if (this.addPetValues.name !== '' && this.addPetValues.status !== '') {
      this.dataStorageService.addPet(this.addPetValues); // send to
      this.addPetValues = {}; // reset form sau cu  this.petForm.reset();
    }

    console.log(this.petForm);
  }

  get photoUrls2() {
    return (this.petForm.get('photoUrls2') as FormArray).controls;
  }

  get tags2() {
    return (this.petForm.get('tags') as FormArray).controls;
  }
  onAddPhotos() {
    const control = new FormControl(null);
    (this.petForm.get('photoUrls2') as FormArray).push(control);
  }

  onAddTags() {
    (this.petForm.get('tags') as FormArray).push(
      new FormGroup({
        id: new FormControl(null, [Validators.pattern(/^[1-9]+[0-9]*$/)]),
        name: new FormControl(null),
      })
    );
  }

  onDeleteTag(index: number) {
    (<FormArray>this.petForm.get('tags')).removeAt(index);
  }

  onDeletePhoto(index: number) {
    (<FormArray>this.petForm.get('photoUrls2')).removeAt(index);
  }

  onCancel() {
    this.petForm.reset();
  }
}
