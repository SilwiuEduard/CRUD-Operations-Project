import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { DataStorageService } from 'src/app/shared/dataStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet-reactive',
  templateUrl: './add-pet-reactive.component.html',
  styleUrls: ['./add-pet-reactive.component.css'],
})
export class AddPetReactiveComponent {
  petForm: FormGroup = new FormGroup({
    id: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[1-9]d*$'),
    ]),
    category: new FormControl(null),
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'),
    ]),
    photoUrls: new FormControl(null),
    tags: new FormControl(null),
    status: new FormControl('available', Validators.required),
  });

  get id() {
    return this.petForm.get('id');
  }
  get category() {
    return this.petForm.get('category');
  }
  get name() {
    return this.petForm.get('name');
  }
  get photoUrls() {
    return this.petForm.get('photoUrls');
  }
  get tags() {
    return this.petForm.get('tags');
  }
  get status() {
    return this.petForm.get('status');
  }

  addPetValues: any = {};

  msgSuccess: boolean = false;
  msgWarning: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.petForm = this.formBuilder.group({
      // Starting Values
      id: '',
      category: '',
      name: '',
      photoUrls: '',
      tags: '',
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
        this.router.navigate(['/list']);
      }, 1000);
    }

    this.addPetValues.id = this.petForm.get('id').value;
    this.addPetValues.category = {
      id: 0, // de implementat corect Categorie - Id
      name: this.petForm.get('category').value,
    };
    this.addPetValues.name = this.petForm.get('name').value;
    this.addPetValues.photoUrls = [this.petForm.get('photoUrls').value];
    this.addPetValues.tags = [
      {
        id: 0, // de implementat corect Tags[] - Id
        name: 'tag',
      },
    ];
    this.addPetValues.status = this.petForm.get('status').value;

    if (this.addPetValues.name !== '' && this.addPetValues.status !== '') {
      this.dataStorageService.addPet(this.addPetValues);
      this.addPetValues = {};
    }
  }

  onCancel() {
    this.petForm.reset();
  }
}
