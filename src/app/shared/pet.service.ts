import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PetModel } from './pet.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  singlePetInfo: any[] = []; // this.PetServiceV2.singlePetInfo = [];: Aceasta golește un vector sau o listă numită singlePetInfo în serviciul PetServiceV2. Golirea acestei liste poate fi efectuată pentru a face loc pentru noile detalii ale elementului selectat.

  selectedPetIndex: number = -1;

  infosPet: any[] = [];
  editList: any[] = [];
  id: number;
  petId: number;

  addPetInfo(infos: any) {
    this.singlePetInfo.push(infos);
  }

  addInfo(information: any) {
    this.infosPet.push(information);
  }

  getListLength() {
    return this.infosPet.length;
  }
  getList() {
    return this.infosPet;
  }
}
