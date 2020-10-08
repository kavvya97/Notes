import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private static subject = new BehaviorSubject<any>(null);
  constructor() {}


   static sendMessage(state: object) {
    MessageService.subject.next(state);
  }

  static clearMessage() {
    MessageService.subject.next(null);
  }

  static getMessage(): Observable<any> {
      return MessageService.subject.asObservable();
  }
}
