import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetInterface } from './pet.interface';

// ### METHODS ###
// <<   POST |   ADD A NEW PET >>  petstore.swagger.io/v2/pet
// <<    PUT |        EDIT PET >>  petstore.swagger.io/v2/pet
// <<    GET |  FIND PET BY ID >>  petstore.swagger.io/v2/pet/{petId}
// << DELETE |   DELETES A PET >>  petstore.swagger.io/v2/pet/{petId}

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  readonly apiHost = 'https://petstore.swagger.io';
  readonly apiVersion = 'v2';
  readonly apiPet = `${this.apiHost}/${this.apiVersion}/pet/`;
  readonly apiPetStatus = `${this.apiPet}findByStatus?status=`;

  // pets: PetInterface[] = [];

  constructor(private http: HttpClient) {}

  getAvailablePets(): Observable<PetInterface> {
    return this.http.get<PetInterface>(this.apiPetStatus + 'available');
  }

  getPendingPets(): Observable<PetInterface> {
    return this.http.get<PetInterface>(this.apiPetStatus + 'pending');
  }

  getSoldPets(): Observable<PetInterface> {
    return this.http.get<PetInterface>(this.apiPetStatus + 'sold');
  }

  getPetById(id: PetInterface): Observable<PetInterface> {
    return this.http.get<PetInterface>(this.apiPet + id);
  }

  addPet(petForm: any): Observable<PetInterface> {
    return this.http.post<PetInterface>(this.apiPet, petForm);
  }

  updatePet(data: PetInterface): Observable<PetInterface> {
    return this.http.put<PetInterface>(this.apiPet, data);
  }

  deletePet(id: PetInterface): Observable<PetInterface> {
    return this.http.delete<PetInterface>(this.apiPet + id);
  }
}
