import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { PetModel } from './pet.model';
import { PetService } from './pet.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  readonly apiHost = 'https://petstore.swagger.io';
  readonly apiVersion = 'v2';

  // ### METHODS ###
  // <<   POST |   ADD A NEW PET >>  petstore.swagger.io/v2/pet
  // <<    PUT |        EDIT PET >>  petstore.swagger.io/v2/pet
  // <<    GET |  FIND PET BY ID >>  petstore.swagger.io/v2/pet/{petId}
  // << DELETE |   DELETES A PET >>  petstore.swagger.io/v2/pet/{petId}

  constructor(private http: HttpClient, private petService: PetService) {}

  storePets() {
    const pets = this.petService.getPetsArray();
    this.http
      .post(`${this.apiHost}/${this.apiVersion}/pet`, pets)
      .subscribe((response) => {
        console.log(response);
      });
  }

  editPets() {
    const pets = this.petService.getPetsArray();
    this.http
      .put(`${this.apiHost}/${this.apiVersion}/pet`, pets)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchPets() {
    const pets = this.petService.getPetsArray();
    this.http
      .get<PetModel[]>(`${this.apiHost}/${this.apiVersion}/pet/{petId}`)
      .subscribe((petsResponse) => {
        console.log(petsResponse);
        this.petService.setPets(petsResponse);
      });
  }
  deletePets() {
    const pets = this.petService.getPetsArray();
    this.http
      .delete<PetModel[]>(`${this.apiHost}/${this.apiVersion}/pet/{petId}`)
      .subscribe((petsResponse) => {
        console.log(petsResponse);
        this.petService.setPets(petsResponse);
      });
  }

  //   // <<   POST |   ADD A NEW PET >>  petstore.swagger.io/v2/pet
  //     storePet(): Observable<any> {
  //       return this.http
  //         .post(`${this.apiHost}/${this.apiVersion}/pet`)
  //         .pipe(catchError(this.handleError));
  //     }

  // //<<    PUT |        EDIT PET >>  petstore.swagger.io/v2/pet
  //   editPet(): Observable<any> {
  //     return this.http
  //       .put(`${this.apiHost}/${this.apiVersion}/pet`)
  //       .pipe(catchError(this.handleError));
  //   }

  // //<<    GET |  FIND PET BY ID >>  petstore.swagger.io/v2/pet/{petId}
  //   getPet(): Observable<any> {
  //     return this.http
  //       .get(`${this.apiHost}/${this.apiVersion}/pet/{petId}`)
  //       .pipe(catchError(this.handleError));
  //   }
  // // << DELETE |   DELETES A PET >>  petstore.swagger.io/v2/pet/{petId}
  //   deletePet(): Observable<any> {
  //     return this.http
  //       .delete(`${this.apiHost}/${this.apiVersion}/pet/{petId}`)
  //       .pipe(catchError(this.handleError));
  //   }

  // private handleError(error: any) {
  //   console.error('server error:', error);
  //   if (error.error instanceof Error) {
  //     const errMessage = error.error.message;
  //     return Observable.throw(errMessage);
  //   }
  //   return Observable.throw(error || 'Server error');
}
