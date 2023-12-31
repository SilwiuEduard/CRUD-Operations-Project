import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../core/dataStorage.service';
import { PetInterface } from 'src/app/core/pet.interface';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css'],
})
export class PetDetailsComponent implements OnInit {
  petArray: any[] = [];
  error = null;
  petId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id: any = Number(params['id']);
      this.petId = id;
      this.getPetById(id);
    });
  }

  getPetById(id: PetInterface): void {
    this.dataStorageService.getPetById(id).subscribe({
      next: (responsePet: PetInterface) => {
        this.petArray = [responsePet];

        // if (responsePet.photoUrls) {
        //   responsePet.photoUrls = responsePet.photoUrls.filter(
        //     (url: string) => url.trim() !== ''
        //   );
        // }
      },
      error: (err) => {
        this.error = err.message;
        console.error('Error fetching pet details:', err);
      },
    });
  }

  isEmptyPhotoArray(photoUrls: string[]): boolean {
    // ( !photoUrls || photoUrls.length === 0 )
    if (!photoUrls) {
      return true; // Array is empty
    }
    // Check if there are any non-empty URLs in the array
    return !photoUrls.some((url) => url.trim() !== '');
  }

  isEmptyTagsArray(tags: { id: number; name: string }[]): boolean {
    if (!tags || tags.length === 0) {
      return true; // Array is empty
    }
    // Check if there are any non-empty URLs in the array
    return !tags.some((tag) => tag.name && tag.name.trim() !== '');
  }

  backToList() {
    this.router.navigate(['/list']);
    window.scrollTo(0, 0);
  }

  onHandleError() {
    this.error = null;
    this.backToList();
  }
}
