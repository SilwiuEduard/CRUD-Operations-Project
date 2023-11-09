import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PetService } from '../../core/pet.service';
import { DataStorageService } from '../../core/dataStorage.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css'],
})
export class EditPetComponent {
  OnCancel() {}
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetService,
    private cdr: ChangeDetectorRef,
    private dataStorageService: DataStorageService
  ) {}
  // messageSuccess: boolean = false;
  // messageWarning: boolean = false;
  // infoPet: any[] = [];
  // categories: any[] = [];
  // editPetValues: any = {};
  // // editPetForm: FormGroup = new FormGroup({
  // //   name: new FormControl('', [
  // //     Validators.required,
  // //     Validators.minLength(3),
  // //     Validators.pattern('[a-zA-Z].*'),
  // //   ]),
  // //   status: new FormControl('', Validators.required),
  // //   category: new FormControl(''),
  // // });
  // // get name() {
  // //   return this.editPetForm.get('name');
  // // }
  // // get status() {
  // //   return this.editPetForm.get('status');
  // // }
  // // get category() {
  // //   return this.editPetForm.get('category');
  // // }
  // ngOnInit() {
  //   // let pets: any[] = []
  //   // pets = this.apiService.getPets("all")
  //   // for(let i;i<pets.length;i++){
  //   //     const result = this.categories.filter(x => x.includes(pets[i].category.name))
  //   //     if(!result){
  //   //       this.categories.push(pets[i].category.name);
  //   //     }
  //   // }
  //   this.route.params.subscribe((params) => {
  //     this.petService.petId = Number(params['id']);
  //   });
  //   this.infoPet = this.dataStorageService.getPetById(this.petService.petId);
  // }
  // // onInputChange() {
  // //   if (this.editPetForm.valid) {
  // //     this.messageWarning = false;
  // //   } else {
  // //     this.messageWarning = true;
  // //     this.messageSuccess = false;
  // //   }
  // // }
  // // ngAfterViewChecked() {
  //   this.cdr.detectChanges();
  // // }
  // // onSave() {
  // //   if (this.editPetForm.valid) {
  // //     this.messageSuccess = true;
  // //     this.messageWarning = false;
  // //   } else {
  // //     this.messageWarning = true;
  // //     this.messageSuccess = false;
  // //   }
  // //   if (this.messageSuccess === true) {
  // //     setTimeout(() => {
  // //       this.router.navigate(['/list']);
  // //     }, 1000);
  // //   }
  // //   this.editPetValues.id = this.petService.petId;
  // //   this.editPetValues.category = {
  // //     id: 0,
  // //     name: this.editPetForm.get('category').value,
  // //   };
  // //   this.editPetValues.name = this.editPetForm.get('name').value;
  // //   this.editPetValues.photoUrls = ['string'];
  // //   this.editPetValues.tags = [
  // //     {
  // //       id: 0,
  // //       name: 'string',
  // //     },
  // //   ];
  // //   this.editPetValues.status = this.editPetForm.get('status').value;
  // //   this.dataStorageService.editPet(this.editPetValues);
  // // }
}
