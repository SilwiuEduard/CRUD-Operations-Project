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
    id: [''], //  new FormControl('');
    category: this.fb.group({
      id: [''],
      name: [''],
    }), //new FormGroup({})
    name: [''], //  new FormControl('');
    photoUrls: this.fb.array([]), //new FormArray([]); //   this.fb.control('')
    tags: this.fb.array([]), //new FormArray([new FormGroup({})]); //  this.fb.group({id: this.fb.control(''), name: this.fb.control('')}),
    status: ['available'], //  new FormControl('');
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

  // get photoUrls() {
  //   return this.petForm.get('photoUrls');
  // }
  // get tagsId() {
  //   return this.petForm.get('tags.id');
  // }
  // get tagsName() {
  //   return this.petForm.get('tags.name');
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
    this.fb.group({
      id: ['', Validators.required, Validators.pattern('^[1-9]d*$')],
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
    console.log(this.petForm.value);
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
    // (this.addPetValues.tags.id = this.petForm.get('id').value),
    //   (this.addPetValues.tags.name = this.petForm.get('name').value),

    this.addPetValues.tags = this.petForm.get('tags').value;
    // this.addPetValues.tags = [
    //   {
    //     id: this.petForm.get('tags.id').value,
    //     name: this.petForm.get('tags.name').value,
    //   },
    // ];

    // = [
    //   id: this.petForm.get('tags.id').value,
    //   name: this.petForm.get('tags.name').value,
    // ];
    this.addPetValues.status = this.petForm.get('status').value;

    if (this.addPetValues.name !== '' && this.addPetValues.status !== '') {
      this.dataStorageService.addPet(this.addPetValues); // send to
      this.addPetValues = {}; // reset form sau cu  this.petForm.reset();
    }

    console.log(this.petForm);
  }

  // Access the FormArray control	A getter provides access to the aliases in the form array instance compared to repeating the profileForm.get() method to get each instance. The form array instance represents an undefined number of controls in an array. It's convenient to access a control through a getter, and this approach is straightforward to repeat for additional controls.
  // Use the getter syntax to create an aliases class property to retrieve the alias's form array control from the parent form group. [ https://angular.io/guide/reactive-forms#introduction-to-formbuilder ]

  get photoUrls() {
    return (this.petForm.get('photoUrls') as FormArray).controls;
  }

  onAddPhotos() {
    const control = new FormControl('');
    (this.petForm.get('photoUrls') as FormArray).push(control);
  }

  get tags() {
    return (this.petForm.get('tags') as FormArray).controls;
  }

  onAddTags() {
    (this.petForm.get('tags') as FormArray).push(
      new FormGroup({
        id: new FormControl('', [Validators.pattern(/^[1-9]+[0-9]*$/)]),
        name: new FormControl(''),
      })
    );
  }

  onDeleteTag(index: number) {
    (<FormArray>this.petForm.get('tags')).removeAt(index);
  }

  onDeletePhoto(index: number) {
    (<FormArray>this.petForm.get('photoUrls')).removeAt(index);
  }

  onCancel() {
    this.petForm.reset();
  }
}
