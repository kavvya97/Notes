import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateComponent } from '../notes/create/create.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Notes } from '../notes/notes.model';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.component.html',
  styleUrls: ['./navtab.component.scss']
})
export class NavtabComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  viewUserProfile() {
    const userId = localStorage.getItem('userId');
    this.router.navigate([`user/${userId}`]);
  }

  viewUserNotes() {

  }

  logoutUser() {
    this.authService.logoutUser();
  }

  onCreateNote() {
    // accessing Add button id DOM
    const button = document.getElementById('note_add');
    button.click();
  }

}
