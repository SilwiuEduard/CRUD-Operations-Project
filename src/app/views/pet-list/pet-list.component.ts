import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataStorageService } from '../../core/dataStorage.service';
import { PetService } from '../../core/pet.service';
import { PetInterface } from '../../core/pet.interface';
import { EditPetMatDialogComponent } from '../../components/edit-pet-mat-dialog/edit-pet-mat-dialog.component';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit {
  apiPets: Array<any> = null;
  selectedPetIndex: number = -1; // because in HTML index value is i + 1
  filteredPets: any[] = [];
  selectedPetData: any = null;
  messageSuccess = false;
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
    this.getAllPets();
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
  }

  getAllPets(): void {
    this.apiPets = null;
    this.dataStorageService.getAvailablePets().subscribe({
      next: (available: any) => {
        this.apiPets = [];
        available.forEach((pet) => {
          this.apiPets.push(pet);
        });
        console.log('available pets: ', available);
      },
      complete: () => {
        this.dataStorageService.getPendingPets().subscribe({
          next: (pending: any) => {
            pending.forEach((pet) => {
              this.apiPets.push(pet);
            });
            console.log('pending pets: ', pending);
          },
          complete: () => {
            this.dataStorageService.getSoldPets().subscribe({
              next: (sold: any) => {
                sold.forEach((pet) => {
                  this.apiPets.push(pet);
                });
                console.log('sold pets: ', sold);
              },
            });
          },
        });
      },
    });
  }

  getAvailablePets(): void {
    this.apiPets = null;
    this.dataStorageService.getAvailablePets().subscribe({
      next: (available: any) => {
        this.apiPets = [];
        available.forEach((pet) => {
          this.apiPets.push(pet);
        });
      },
    });
  }

  getPendingPets(): void {
    this.apiPets = null;
    this.dataStorageService.getPendingPets().subscribe({
      next: (pending: any) => {
        this.apiPets = [];
        pending.forEach((pet) => {
          this.apiPets.push(pet);
        });
      },
    });
  }

  getSoldPets(): void {
    this.apiPets = null;
    this.dataStorageService.getSoldPets().subscribe({
      next: (sold: any) => {
        this.apiPets = [];
        sold.forEach((pet) => {
          this.apiPets.push(pet);
        });
      },
    });
  }

  selectStatus($event): void {
    const target: string = $event.target.value;
    console.log('console log target: ', target);

    if (target === 'all') this.getAllPets();
    if (target === 'available') this.getAvailablePets();
    if (target === 'pending') this.getPendingPets();
    if (target === 'sold') this.getSoldPets();
  }

  statusCSSclass(pet): any {
    return {
      available: this.petAvailable(pet),
      pending: this.petPending(pet),
      sold: this.petSold(pet),
    };
  }

  petAvailable(pet: any): boolean {
    return pet.status === 'available';
  }

  petPending(pet: any): boolean {
    return pet.status === 'pending';
  }

  petSold(pet: any): boolean {
    return pet.status === 'sold';
  }

  onView(petIndex: number) {
    this.selectedPetIndex = petIndex;
    this.selectedPetData = this.apiPets[petIndex];
    if (this.selectedPetIndex > -1) {
      this.petService.singlePetInfo = [];
      this.petService.addPetInfo(this.selectedPetData);
      this.id = this.selectedPetData.id;
      this.router.navigate(['/view', this.id]);
    }
  }

  onEditPetDialog(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = id;

    const dialogRef = this.matDialog
      .open(EditPetMatDialogComponent, dialogConfig)
      .afterClosed();

    dialogRef
      .subscribe({
        next: () => {
          this.getAllPets();
        },
      })
      .add()
      .unsubscribe();
  }

  onDelete(petIndex: number) {
    this.selectedPetIndex = petIndex;
    this.selectedPetData = this.apiPets[petIndex];

    const backdrop = document.querySelector('.backdrop') as HTMLElement;
    const modal = document.querySelector('.myModal') as HTMLElement;
    backdrop.classList.add('open');
    modal.classList.add('open');
  }

  confirmDelete() {
    const backdrop = document.querySelector('.backdrop') as HTMLElement;
    const modal = document.querySelector('.myModal') as HTMLElement;

    if (this.selectedPetIndex > -1) {
      this.dataStorageService.deletePet(this.selectedPetData.id).subscribe({
        next: () => {
          // Delete element from local list after successfully delete
          this.apiPets.splice(this.selectedPetIndex, 1);
          // Reset index and data
          this.selectedPetIndex = -1;
          this.selectedPetData = null;
          // Show succes message
          this.messageSuccess = true;
          setTimeout(() => {
            this.messageSuccess = false;
            this.resetStatus();
            backdrop.classList.remove('open');
            modal.classList.remove('open');
          }, 1000);
        },
        error: (err) => {
          this.error = err.message;
          console.error('Error deleting pet: ', err);
        },
      });
    }
  }

  cancelDelete() {
    const backdrop = document.querySelector('.backdrop') as HTMLElement;
    const modal = document.querySelector('.myModal') as HTMLElement;
    backdrop.classList.remove('open');
    modal.classList.remove('open');
  }

  resetStatus() {
    const selectElement = document.getElementById(
      'statusSelect'
    ) as HTMLSelectElement;
    selectElement.value = 'all';
    this.selectStatus({ target: selectElement });
  }

  onHandleError() {
    this.cancelDelete();
    this.error = null;
  }
}
