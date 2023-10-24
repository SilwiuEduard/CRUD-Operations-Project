import { Component } from '@angular/core';
import { DataStorageService } from '../shared/dataStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}

  // onFetchData() {
  //   this.dataStorageService.fetchPets();
  // }
}
