import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/dataStorage.service';

@Component({
  selector: 'app-add-pet-reactive',
  templateUrl: './add-pet-reactive.component.html',
  styleUrls: ['./add-pet-reactive.component.css'],
})
export class AddPetReactiveComponent {
  petForm: FormGroup = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9]d*$'),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'),
    ]),
    status: new FormControl('available', Validators.required),
    // photoUrls: new FormControl(''),
    category: new FormControl('not selected'),
  });

  get id() {
    return this.petForm.get('id');
  }
  get name() {
    return this.petForm.get('name');
  }
  get status() {
    return this.petForm.get('status');
  }
  // get photoUrls() {
  //   return this.petForm.get('photoUrls');
  // }
  get category() {
    return this.petForm.get('category');
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
      id: '',
      name: '',
      status: 'Available',
      // photoUrls: '',
      category: 'Not selected',
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
      id: 0,
      name: this.petForm.get('category').value,
    };
    this.addPetValues.name = this.petForm.get('name').value;
    this.addPetValues.photoUrls = ['string'];
    this.addPetValues.tags = [
      {
        id: 0,
        name: 'string',
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
