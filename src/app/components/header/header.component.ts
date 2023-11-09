import { Component } from '@angular/core';
import { DataStorageService } from '../../core/dataStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  // onFetchData() {
  //   this.dataStorageService.fetchPets();
  // }

  redirectTo() {
    this.router.navigate(['/']);
    window.scrollTo(0, 0);
  }
}
