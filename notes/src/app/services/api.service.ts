import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public appendJWTToken() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
  }
  public addNote(formdata): Observable<any> {
    const url = 'http://localhost:8080/notes/create';
    return this.http.post(url, formdata, this.appendJWTToken());
  }

  public getNotes(): Observable<any> {
    const url = 'http://localhost:8080/notes/view_notes';
    return this.http.get(url, this.appendJWTToken());
  }

  public getNoteDetails(id: string): Observable<any> {
    const url = 'http://localhost:8080/notes/single_note/' + id;
    return this.http.get(url, this.appendJWTToken());
  }

  public getNoteDocument(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const url = 'http://localhost:8080/notes/download/' + id;
    window.open(url);
    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/pdf',
        Authorization: 'Bearer ' + token
      }
    });
  }

  public deleteNote(id: string): Observable<any> {
    const url = 'http://localhost:8080/notes/delete_note/' + id;
    return this.http.delete(url, this.appendJWTToken());
  }

  public updateNote(formData, id): Observable<any> {
    const url = 'http://localhost:8080/notes/update_note/' + id;
    return this.http.post(url, formData, this.appendJWTToken());
  }

  public getUserDetails(userId)  {
    const url = 'http://localhost:8080/user/view_profile/' + userId;
    return this.http.get(url, this.appendJWTToken());
  }
}
