import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-change-password',
  templateUrl: './settings-change-password.component.html',
  styleUrls: ['./settings-change-password.component.scss']
})
export class SettingsChangePasswordComponent implements OnInit {

  public userPasswordForm;

  constructor() { }

  ngOnInit() {
    this.userPasswordForm = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
      newPassword: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
    });
  }

  submit() {
    
  }

}
