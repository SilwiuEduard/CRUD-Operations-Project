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
  } // Acest lucru adaugă datele rândului selectat (selectedRowData) în vectorul sau lista menționată mai devreme (singlePetInfo) folosind serviciul myService. Aceasta poate fi utilizată ulterior pentru a furniza date pentru afișare sau procesare în altă parte a aplicației.

  addInfo(informations: any) {
    this.infosPet.push(informations);
  }

  getListLength() {
    return this.infosPet.length;
  }
  getList() {
    return this.infosPet;
  }
}
