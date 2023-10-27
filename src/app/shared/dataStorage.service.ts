import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

import { PetService } from './pet.service';
import { PetModel } from './pet.model';
import { PetInterface } from '../shared/pet.interface';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  pets: any[] = [];

  readonly apiHost = 'https://petstore.swagger.io';
  readonly apiVersion = 'v2';

  // ### METHODS ###
  // <<   POST |   ADD A NEW PET >>  petstore.swagger.io/v2/pet
  // <<    PUT |        EDIT PET >>  petstore.swagger.io/v2/pet
  // <<    GET |  FIND PET BY ID >>  petstore.swagger.io/v2/pet/{petId}
  // << DELETE |   DELETES A PET >>  petstore.swagger.io/v2/pet/{petId}

  // pets: PetInterface[] = [];

  constructor(private http: HttpClient, private petService: PetService) {}

  fetchPets(status: string) {
    this.pets = [];

    if (status === 'all') {
      this.http
        .get<any[]>(
          `${this.apiHost}/${this.apiVersion}/pet/findByStatus?status=available`
        )
        // .pipe(catchError(this.handleError))
        .subscribe((data: any[]) => {
          console.log('pets on available list : ', data.length);
          for (let i = 0; i < data.length; i++) {
            this.pets.push(data[i]);
          }
        });
      this.http
        .get<any[]>(
          `${this.apiHost}/${this.apiVersion}/pet/findByStatus?status=pending`
        )
        // .pipe(catchError(this.handleError))
        .subscribe((data: any[]) => {
          console.log('pets on pending list : ', data.length);
          for (let i = 0; i < data.length; i++) {
            this.pets.push(data[i]);
          }
        });
      this.http
        .get<any[]>(
          `${this.apiHost}/${this.apiVersion}/pet/findByStatus?status=sold`
        )
        // .pipe(catchError(this.handleError))
        .subscribe((data: any[]) => {
          console.log('pets on sold list : ', data.length, data);
          for (let i = 0; i < data.length; i++) {
            this.pets.push(data[i]);
          }
        });
    } else {
      this.http
        .get<any[]>(
          `${this.apiHost}/${this.apiVersion}/pet/findByStatus?status=${status}`
        )
        // .pipe(catchError(this.handleError))
        .subscribe((data: any[]) => {
          for (let i = 0; i < data.length; i++) {
            this.pets.push(data[i]);
          }
        });
    }
    return this.pets;
  }

  getPetById(petId: number) {
    let pet: any[] = [];
    this.http
      .get<any>(`${this.apiHost}/${this.apiVersion}/pet/${petId}`)
      // .pipe(catchError(this.handleError))
      .subscribe((petsInfos: any[]) => {
        this.pets = petsInfos;
      });
    return pet;
  }

  // ! CODUL INAINTE
  // getPetById(petId: number) {
  //   let pet: any[] = [];
  //   this.http
  //     .get<any>(`${this.apiHost}/${this.apiVersion}/pet/${petId}`)
  //     .pipe(catchError(this.handleError))
  //     .subscribe((data: any[]) => {
  //       pet.push(data);
  //     });
  //   return pet;
  // }

  addPet(petForm: any) {
    this.pets = [];
    this.http
      .post<any>(`${this.apiHost}/${this.apiVersion}/pet`, petForm)
      // .pipe(catchError(this.handleError))
      .subscribe((data) => {
        this.pets = data;
      });
    return this.pets;
  }

  editPet(editedPetForm: any) {
    this.pets = [];
    this.http
      .put<any>(`${this.apiHost}/${this.apiVersion}/pet`, editedPetForm)
      .subscribe((data) => {
        this.pets = data;
      });
    return this.pets;
  }

  deletePets(petId: number) {
    this.pets = [];
    this.http
      .delete<any>(`${this.apiHost}/${this.apiVersion}/pet/${petId}`)
      // .pipe(catchError(this.handleError))
      .subscribe((data) => {
        this.pets = data;
      });
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Server error');
  }
}
