import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-notes-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainNotesComponent implements OnInit {
jwtStatus;
  constructor(
      private router: Router,
      private auth: AuthService
  ) {
  }
  ngOnInit() {
    this.jwtStatus = this.auth.checkExpiry();
    if (this.jwtStatus) {
      this.router.navigate(['user/login']);
    }
  }
}
