import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
formSubmitted = false;
public signupForm;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // TODO: Add confirm Password
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    });
  }

  ngOnInit() {
  }

  onFormSubmit() {
    this.formSubmitted = true;
    this.authService.signupUser(this.signupForm.value)
    .subscribe(result => {
      this.router.navigate(['user/login']);
    });
  }
}
