import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { PetService } from './pet.service';
import { PetModel } from './pet.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  readonly apiHost = 'https://petstore.swagger.io';
  readonly apiVersion = 'v2';

  // ### METHODS ###
  // <<   POST |   ADD A NEW PET >>  petstore.swagger.io/v2/pet
  // <<    PUT |        EDIT PET >>  petstore.swagger.io/v2/pet
  // <<    GET |  FIND PET BY ID >>  petstore.swagger.io/v2/pet/{petId}
  // << DELETE |   DELETES A PET >>  petstore.swagger.io/v2/pet/{petId}

  pets: any[] = [];

  constructor(private http: HttpClient, private petService: PetService) {}

  fetchPets(status: string) {
    this.pets = [];

    if (status === 'all') {
      this.http
        .get<any[]>(
          `${this.apiHost}/${this.apiVersion}/pet/findByStatus?status=available`
        )
        .pipe(catchError(this.handleError))
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
        .pipe(catchError(this.handleError))
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
        .pipe(catchError(this.handleError))
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
        .pipe(catchError(this.handleError))
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
      .pipe(catchError(this.handleError))
      .subscribe((data: any[]) => {
        pet.push(data);
      });
    return pet;
  }

  // ! ##########
  storePets() {}

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Server error');
  }

  // storePets() {
  //   const pets = this.petService.getPetsArray();
  //   this.http
  //     .post(`${this.apiHost}/${this.apiVersion}/pet`, pets)
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }

  // editPets() {
  //   const pets = this.petService.getPetsArray();
  //   this.http
  //     .put(`${this.apiHost}/${this.apiVersion}/pet`, pets)
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }

  // }
  // deletePets() {
  //   const pets = this.petService.getPetsArray();
  //   this.http
  //     .delete<PetModel[]>(`${this.apiHost}/${this.apiVersion}/pet/{pet.id}`)
  //     .subscribe((petsResponse) => {
  //       console.log(petsResponse);
  //       this.petService.setPets(petsResponse);
  //     });
  // }

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
}
