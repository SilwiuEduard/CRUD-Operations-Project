import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../core/dataStorage.service';
import { PetService } from '../../core/pet.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css'],
})
export class PetDetailsComponent implements OnInit {
  petArray: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id: any = Number(params['id']);
      this.petService.petId = id;
      this.getPetById(id);
    });
  }
  getPetById(id: any): void {
    this.dataStorageService.getPetById(id).subscribe({
      next: (res: any) => {
        this.petArray = res;
        this.petArray.forEach((pet) => {
          if (pet.photoUrls) {
            pet.photoUrls = pet.photoUrls.filter(
              (url: string) => url.trim() !== ''
            );
          }
        });
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
}
