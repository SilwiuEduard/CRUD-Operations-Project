import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PetModel } from './pet.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  singlePetInfo: any[] = []; // this.PetServiceV2.singlePetInfo = [];: Aceasta golește un vector sau o listă numită singlePetInfo în serviciul PetServiceV2. Golirea acestei liste poate fi efectuată pentru a face loc pentru noile detalii ale elementului selectat.

  addPetInfo(infos: any) {
    this.singlePetInfo.push(infos);
  } // Acest lucru adaugă datele rândului selectat (selectedRowData) în vectorul sau lista menționată mai devreme (singlePetInfo) folosind serviciul myService. Aceasta poate fi utilizată ulterior pentru a furniza date pentru afișare sau procesare în altă parte a aplicației.

  // ! #############################

  // puse "sa mearga" din ce scrisesem eu initial, // ! de sters

  startedEditing = new Subject<number>();
  petsChanged = new Subject<PetModel[]>();

  private hardcodePetArray: PetModel[] = [
    new PetModel(
      1,
      { id: 1, name: 'Dog' },
      'Grivei',
      [
        'https://rasedecaini.ro/wp-content/uploads/2019/05/rasa-bichon-maltez-730x438.jpg',
      ],
      [{ id: 1, name: 'Fluffy' }],
      'Available'
    ),
    new PetModel(
      2,
      { id: 1, name: 'Dog' },
      'Spike',
      ['https://www.dogmagazin.ro/wp-content/uploads/2020/10/bucovinean-1.jpg'],
      [
        // { id: 1, name: 'Fluffy' },
        { id: 2, name: 'Energic' },
      ],
      'Pending'
    ),
    new PetModel(
      3,
      { id: 1, name: 'Dog' },
      'Alfie',
      [
        'https://i2-prod.mirror.co.uk/incoming/article95765.ece/ALTERNATES/s615/alfie-pic-swns-203913228.jpg',
      ],
      [{ id: 2, name: 'Energic' }],
      'Sold'
    ),
    new PetModel(
      4,
      { id: 2, name: 'Cat' },
      'Flixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      [
        'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRoT6NNDUONDQmlthWrqIi_frTjsjQT4UZtsJsuxqxLiaFGNl5s3_pBIVxS6-VsFUP_',
      ],
      [{ id: 3, name: 'Lazy' }],
      'Available'
    ),

    // to delete
  ];

  private pets: PetModel[] = []; // for HttpRequests

  getPetsArray() {
    return this.pets.slice();
  }

  // * Loading a single pet by Id
  gethardcodedPet(index: number) {
    return this.hardcodePetArray[index];
  }

  setPets(pets: PetModel[]) {
    this.pets = pets;
    this.petsChanged.next(this.pets.slice());
  }

  addPet(pet: PetModel) {
    this.hardcodePetArray.push(pet);
    this.petsChanged.next(this.hardcodePetArray.slice());
  }

  upgradePet(index: number, newPet: PetModel) {
    this.hardcodePetArray[index] = newPet;
    this.petsChanged.next(this.hardcodePetArray.slice());
  }

  deletePet(index: number) {
    this.hardcodePetArray.splice(index, 1);
    this.petsChanged.next(this.hardcodePetArray.slice());
  }

  // * Loading a copy of hardcoded pet Array
  gethardcodedPetArray() {
    return this.hardcodePetArray.slice();
  }
}
