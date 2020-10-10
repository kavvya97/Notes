import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateComponent } from './create/create.component';
import { Notes, NoteDetail, UserDetail, Note } from './notes.model';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
jwtStatus;
notesdata: Notes = null;
noteInfo: Note = null;
detailView = false;
  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params._id) {
        this.detailView = true;
      } else {
        this.detailView = false;
      }
    });
    this.jwtStatus = this.auth.checkExpiry();
    if (this.jwtStatus) {
      this.router.navigate(['user/login']);
    } else  {
      this.getNotes();
    }
  }

  getNotes() {
    this.apiService.getNotes().subscribe((result: Notes) => {
      this.notesdata = result;
    });
  }

  onCreatePost() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getNotes();
    });
  }

  editNoteDetails(note: NoteDetail) {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '600px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getNotes();
    });
  }

  viewNoteDetails(details: NoteDetail) {
    this.detailView = true;
    this.router.navigate([`notes/${details._id}`]);
  }

  deleteNote(details: NoteDetail) {
    this.apiService.deleteNote(details._id).subscribe(result => {
      this.getNotes();
    });
  }

  checkUserDetails(note: NoteDetail) {
    const currentUser = localStorage.getItem('userId');
    if (note.userId._id.toString() !== currentUser) {
      return false;
    }
    return true;
  }

}
