import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-notes',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'notes';
  isAuthenticated: any  = false;

  constructor(
    public auth: AuthService
  ) {

  }

  ngOnInit() {
    const expiryDate = localStorage.getItem('expiryDate');
    const token = localStorage.getItem('token');
    if (expiryDate && (new Date(expiryDate) <= new Date()) ) {
      this.auth.logoutUser();
    }
    if (!token) {
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
    }
  }
}
