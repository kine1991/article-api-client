import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'site-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public signInForm;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl('test1@mail.ru'),
      password: new FormControl('123456')
    });
  }

  submit() {
    console.log('sss', this.signInForm.value);
    const { email, password } = this.signInForm.value;
    this.authService.signIn({ email, password }).subscribe(auth => {
      console.log('auth', auth);
    });
  }

  checkAuth() {
    this.authService.checkAuth().subscribe(auth => {
      console.log('auth - checkAuth', auth);
    });
  }
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGExZDViMDE5MGIyMTQzNjBkYzA1NyIsImlhdCI6MTU5MTcxNTUyOSwiZXhwIjoxNTk5NDkxNTI5fQ.bKbBIC0PUtU1TVNhVApZA8w2PIDXEWuIBqfLLaREyno
}
