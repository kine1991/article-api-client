import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-settings-change-password',
  templateUrl: './settings-change-password.component.html',
  styleUrls: ['./settings-change-password.component.scss']
})
export class SettingsChangePasswordComponent implements OnInit {

  public userPasswordForm;
  public errorMessage;
  public successMessage;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userPasswordForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      newPasswordConfirm: new FormControl(null, this.validateAreEqual.bind(this)),
    });
  }

  private validateAreEqual(fieldControl: FormControl) {
    if(this.userPasswordForm) {
      return fieldControl.value === this.userPasswordForm.get('newPassword').value ? null : {
        notEqual: true
      };
    }
  }

  submit() {
    this.errorMessage = undefined;
    this.successMessage = undefined;
    if(this.userPasswordForm.valid) {
      const { password, newPassword, newPasswordConfirm } = this.userPasswordForm.value;
      console.log(this.userPasswordForm.value)
      this.userService.changePassword({ password, newPassword, newPasswordConfirm }).pipe(
        catchError(error => {
          console.log('error', error.error.errors[0]);
          this.errorMessage = error.error.errors[0].message;
          return error;
        })
      ).subscribe(data => {
        this.successMessage = 'Your password was changed!'
        console.log('data', data);
      });
        
    }
  }

}
