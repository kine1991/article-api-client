import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'site-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public signInForm;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl('test1@mail.ru', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  submit() {
    const { email, password } = this.signInForm.value;
    this.authService.signIn({ email, password }).subscribe(auth => {
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
