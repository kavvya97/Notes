import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
formSubmitted = false;
remainingMilliseconds = 60 * 60 * 1000;
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    });
   }

  ngOnInit() {
  }
  onFormSubmit() {
    this.formSubmitted = true;
    this.authService.loginUser(this.loginForm.value)
    .subscribe((result: {token: string, userId: string})  => {
      MessageService.sendMessage({
        isAuth: true,
        userId: result.userId,
        token: result.token
      });
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.userId);
      const expiryDate = new Date(
        new Date().getTime() + this.remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      this.setAutoLogout(this.remainingMilliseconds);
      this.router.navigate(['notes']);
    }, error => {
      
    });
  }

  /**
   * logs out the user
   * automatically after specified timerange
   */
  setAutoLogout(millisec) {
    setTimeout(() => {
      this.logoutHandler();
    }, millisec);
  }

  logoutHandler() {
    this.authService.logoutUser();
  }
}
/**
 * TODO: if user enters a wrong password,
 * Wrong password. Try again or click Forgot password to reset it.
 */
