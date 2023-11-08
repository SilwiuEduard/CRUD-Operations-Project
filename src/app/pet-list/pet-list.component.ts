import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetModel } from '../shared/pet.model';
import { PetService } from '../shared/pet.service';
import { PetInterface } from '../shared/pet.interface';
import { DataStorageService } from '../shared/dataStorage.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditPetMatDialogComponent } from '../edit-pet-mat-dialog/edit-pet-mat-dialog.component';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit {
  apiPets: PetInterface[] = [];
  selectedPetIndex: number = -1; // because in HTML index value is i + 1
  selectedPetData: any = null;
  messageRemove = false;
  id: number; // prop to store index
  // fetchPetsLoading = false; //loading animation
  error = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetService,
    private dataStorageService: DataStorageService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    // this.fetchPetsLoading = true;
    this.apiPets = this.dataStorageService.fetchPets('all');
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    // this.fetchPetsLoading = false;
  }

  ngAfterViewInit() {
    const selectElement = document.getElementById(
      'statusSelect'
    ) as HTMLSelectElement;
    selectElement.addEventListener('change', () => {
      this.onSelectStatus();
    });
  }

  onSelectStatus() {
    const selectElement = document.getElementById(
      'statusSelect'
    ) as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.apiPets = this.dataStorageService.fetchPets(selectedValue);
  }

  // petClasses() {
  // ! DE PUS METODA LA NGCLASS SI DE REFACUT METODA AICI
  //   if (this.pet && this.pet.status) {
  //     return {
  //       available: this.pet.status === 'available',
  //       pending: this.pet.status === 'pending',
  //       sold: this.pet.status === 'sold',
  //     };
  //   }
  //   return {};
  // }

  onView(petIndex: number) {
    // debugger;
    this.selectedPetIndex = petIndex;
    this.selectedPetData = this.apiPets[petIndex];

    if (this.selectedPetIndex > -1) {
      this.petService.singlePetInfo = [];

      this.petService.addPetInfo(this.selectedPetData);

      console.log();
      this.id = this.selectedPetData.id;

      this.router.navigate(['/view', this.id]);
    }
  }

  editPetDialog(pet: PetInterface) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = pet;

    const dialogRef = this.matDialog.open(
      EditPetMatDialogComponent,
      dialogConfig
    );
  }

  onDelete(petIndex: number) {
    this.selectedPetIndex = petIndex;
    this.selectedPetData = this.apiPets[petIndex];

    const backdrop = document.querySelector('.backdrop') as HTMLElement;
    const modal = document.querySelector('.myModal') as HTMLElement;
    backdrop.classList.add('open');
    modal.classList.add('open');
  }

  // ! De IMPLEMENTAT
  confirmDelete() {
    // debugger;
    const backdrop = document.querySelector('.backdrop') as HTMLElement;
    const modal = document.querySelector('.myModal') as HTMLElement;

    if (this.selectedPetIndex > -1) {
      this.dataStorageService.deletePet(this.selectedPetData.id);
      this.apiPets.splice(this.selectedPetIndex, 1);
      this.selectedPetIndex = -1;
      this.selectedPetData = null;
      this.messageRemove = true;
      setTimeout(() => {
        this.messageRemove = false;
        backdrop.classList.remove('open');
        modal.classList.remove('open');
      }, 1000);
    }

    this.apiPets = this.dataStorageService.fetchPets('all');
  }

  cancelDelete() {
    const backdrop = document.querySelector('.backdrop') as HTMLElement;
    const modal = document.querySelector('.myModal') as HTMLElement;
    backdrop.classList.remove('open');
    modal.classList.remove('open');
  }

  // onHandleError() {
  //   this.error = null;
  // }
}
