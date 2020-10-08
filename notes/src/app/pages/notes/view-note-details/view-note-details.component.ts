import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Note } from '../notes.model';

@Component({
  selector: 'app-view-note-details',
  templateUrl: './view-note-details.component.html',
  styleUrls: ['./view-note-details.component.scss']
})
export class ViewNoteDetailsComponent implements OnInit {
noteDetails;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: {_id: string}) => {
      this.apiService.getNoteDetails(params._id).subscribe((result: Note) => {
        this.noteDetails = result;
      });
    });
  }

  downloadPDF() {
    this.apiService.getNoteDocument(this.noteDetails.note._id).subscribe(result => {
      console.log(result);
    });
 }

}
