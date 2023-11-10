import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PetService {
  singlePetInfo: any[] = [];
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
