import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetModel } from '../shared/pet.model';
import { PetService } from '../shared/pet.service';
import { PetInterface } from '../shared/pet.interface';
import { DataStorageService } from '../shared/dataStorage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit {
  @Input() pet: PetModel;
  index: number;
  hardcodePetArray: PetModel[];

  petEdit: PetModel[];

  // #####

  // apiPets: any[] = []; // Multimea unde va fi stocata data de la API
  apiPets: PetInterface[] = [];

  selectedPetIndex: number = -1; // Index pet ajustat pentru ca in tabel incepe de la 1, nu de la 0 ca multimile // * <td>{{ i + 1 }}</td>

  filteredPets: PetInterface[] = []; //  Aici se obțin datele corespunzătoare randului selectat din lista numita filteredPets.

  selectedPetData: any = null;

  id: number; // Proprietate pentru stocare index obiecte

  // fetchPetsLoading = false; //loading animation

  error = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetService,
    private dataStorageService: DataStorageService
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

  onSelectStatus() {
    const selectElement = document.getElementById(
      'statusSelect'
    ) as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.apiPets = this.dataStorageService.fetchPets(selectedValue);
  }

  ngAfterViewInit() {
    const selectElement = document.getElementById(
      'statusSelect'
    ) as HTMLSelectElement;
    selectElement.addEventListener('change', () => {
      this.onSelectStatus();
    });
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
    this.selectedPetIndex = petIndex;
    this.selectedPetData = this.filteredPets[petIndex]; // Aici, se obțin datele corespunzătoare rândului selectat dintr-o listă numită filteredPets.
    if (this.selectedPetData && this.selectedPetIndex > -1) {
      this.petService.singlePetInfo = []; // Aceasta golește un vector sau o listă numită singlePetInfo în serviciul PetServiceV2. Golirea acestei liste poate fi efectuată pentru a face loc pentru noile detalii ale elementului selectat.
      this.petService.addPetInfo(this.selectedPetData); // Acest lucru adaugă datele rândului selectat (selectedRowData) în vectorul sau lista menționată mai devreme (singlePetInfo) folosind serviciul myService. Aceasta poate fi utilizată ulterior pentru a furniza date pentru afișare sau procesare în altă parte a aplicației.
      this.id = this.selectedPetData.id;
      this.router.navigate(['/list', this.id]);
    }
  }

  onEditPetClick(index: any) {
    // ! de implementat
  }

  onDelete(rowIndex: number) {
    this.selectedPetIndex = rowIndex;
    this.selectedPetData = this.filteredPets[rowIndex];
    // const modal = document.getElementById('deleteModal') as HTMLElement;
    // modal.style.display = 'block';
  }

  // onHandleError() {
  //   this.error = null;
  // }
}
