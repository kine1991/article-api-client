import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms'; 

@Component({
  selector: 'site-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl('Nikolay Kiselev'),
      email: new FormControl('kine1991@mail.ru'),
      password: new FormControl('123456'),
      passwordConfirm: new FormControl('123456'),
      photo: new FormControl('https://sun9-23.userapi.com/iF2G3PzlBo98CQWy6yQ_EwRVN1h2FnQNVpBSRw/78DA2RMPkZw.jpg?ava=1')
    });
  }

  submit() {
    console.log('sss', this.signUpForm.value);
    const { name, email, password, passwordConfirm, photo } = this.signUpForm.value;
    this.authService.signUp({ name, email, password, photo }).subscribe(auth => {
      this.authService.user$.next(auth.data.user);
      console.log('auth', auth);
    });
  }
}
