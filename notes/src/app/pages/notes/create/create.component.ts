import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NoteDetail } from '../notes.model';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
pdfDoc: any;
isUpdate: any = false;
updateFormValue: any = null;
createNotesForm: FormGroup;
formsubmitted: any = false;
  constructor(
      public dialogRef: MatDialogRef<CreateComponent>,
      @Inject(MAT_DIALOG_DATA) public data: NoteDetail,
      public apiService: ApiService,
      private router: Router
    ) {
      this.createNotesForm = new FormGroup({
        title: new FormControl(this.data ? this.data.title : '', Validators.required),
        description: new FormControl(this.data ? this.data.description : '', Validators.required),
        standard: new FormControl(this.data ? this.data.standard : '', Validators.required),
        subject: new FormControl(this.data ? this.data.subject : '', Validators.required),
        file: new FormControl('', Validators.required)
      });
    }

  ngOnInit() {
    if (this.data) {
      this.isUpdate = true;
      this.updateFormValue = this.data;
    }
  }

  onFormSubmit() {
    this.formsubmitted = true;
    this.dialogRef.close();
    const formdata = new FormData();
    const formValue = this.createNotesForm.value;
    formdata.append('title', formValue.title);
    formdata.append('description', formValue.description);
    formdata.append('standard', formValue.standard);
    formdata.append('subject', formValue.subject);
    formdata.append('file', formValue.file ? formValue.file._files[0] : '');
    if (this.isUpdate) {
      this.apiService.updateNote(formdata, this.data._id)
      .subscribe(result => {
        this.router.navigate(['notes']);
      });
    } else {
      this.apiService.addNote(formdata)
      .subscribe(result => {
        this.router.navigate(['notes']);
      });
    }
  }

}
