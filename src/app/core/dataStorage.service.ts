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

  // pets: PetInterface[] = []; // later to change any

  constructor(private http: HttpClient) {}

  getAvailablePets(): Observable<any> {
    return this.http.get<any>(this.apiPetStatus + 'available');
  }

  getPendingPets(): Observable<any> {
    return this.http.get<any>(this.apiPetStatus + 'pending');
  }

  getSoldPets(): Observable<any> {
    return this.http.get<any>(this.apiPetStatus + 'sold');
  }

  getPetById(id: any): Observable<any> {
    return this.http.get<any>(this.apiPet + id);
  }

  addPet(petForm: any): Observable<any> {
    return this.http.post<any>(this.apiPet, petForm);
  }

  updatePet(data: any): Observable<any> {
    return this.http.put<any>(this.apiPet, data);
  }

  deletePet(id: string): Observable<any> {
    return this.http.delete<any>(this.apiPet + id);
  }
}
