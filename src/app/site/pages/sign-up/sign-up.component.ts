import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'site-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl('Nikolay Kiselev', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      email: new FormControl('kine1991@mail.ru', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      passwordConfirm: new FormControl('123456', this.validateAreEqual.bind(this)),
      photo: new FormControl('')
    });
  }

  private validateAreEqual(fieldControl: FormControl) {
    if(this.signUpForm) {
      return fieldControl.value === this.signUpForm.get("password").value ? null : {
        notEqual: true
      };
    }
  }

  submit() {
    const { name, email, password, passwordConfirm, photo } = this.signUpForm.value;
    this.authService.signUp({ name, email, password, passwordConfirm, photo }).subscribe(auth => {
      this.authService.user$.next(auth.data.user);
      if(auth.data.user) {
        this.authService.isAuthenticated$.next(true);
      } else {
        this.authService.isAuthenticated$.next(false);
      }
      this.router.navigate(['/']);
    });
  }
}
