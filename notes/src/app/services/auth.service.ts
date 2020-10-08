import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public signupUser(value: {username: string, email: string, password: string}) {
    const url = 'http://localhost:8080/auth/signup';
    return this.http.put(url, {
      username: value.username,
      email: value.email,
      password: value.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public loginUser(value: {email: string, password: string}) {
    const url = 'http://localhost:8080/auth/login';
    return this.http.put(url, {
      email: value.email,
      password: value.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAuth');
    MessageService.sendMessage(null);
    this.router.navigate(['user/login']);
  }

  public checkExpiry() {
    const token = localStorage.getItem('token');
    if (this.helper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }

  }
}
