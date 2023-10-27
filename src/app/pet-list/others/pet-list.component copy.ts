import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { PetModel } from '../shared/pet.model';
import { PetService } from '../shared/pet.service';
import { DataStorageService } from '../shared/dataStorage.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit {
  @Input() pet: PetModel;
  index: number;
  hardcodePetArray: PetModel[];

  petEdit: PetModel[];

  // @Input()
  // petIndex: number;

  constructor(
    private router: Router,
    private petService: PetService,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      this.pet = this.petService.gethardcodedPet(this.index);
    });

    this.hardcodePetArray = this.petService.gethardcodedPetArray();

    // de verificat si de implementat Pet List-ul din server aici
  }
  displayedColumns: string[] = [
    'id',
    // 'category',
    'name',
    // 'photo',
    // 'tags',
    'status',
    'actions',
  ];

  onEditPetClick(index: any) {
    this.petService.startedEditing.next(index);
    // this.router.navigate(['/list/{{pet.id +1/edit']);
  }

  OnDeletePet(index: any) {
    this.dataStorageService.deletePets();
  }

  // // ! TO IMPLEMENT - FILTER DATA ON TABLE
  // applyFilter(filterValue: string) {
  //   this.data.filter = filterValue.trim().toLowerCase();
  // }
  // // TO FILTER DATA IN TABLE - END
}
