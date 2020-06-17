import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.scss']
})
export class SettingsEditComponent implements OnInit, OnDestroy {
  public userSubscription: Subscription;

  public userForm;
  public user;
  
  public imagePreview;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(auth => {
      this.user = auth;
      this.imagePreview = auth.photo;

      this.userForm = new FormGroup({
        name: new FormControl(auth.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        email: new FormControl(auth.email, Validators.required),
        photo: new FormControl(auth.photo, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        }),
      })
    });
  }

  submit() {
    // console.log('111', this.userForm.value);
    if(this.userForm.valid) {
      console.log(this.userForm.value);
      const { name, email, photo } = this.userForm.value;
      this.userService.updateMe({ name, email, photo })
      .subscribe(data => {
        console.log('data', data);
      });
    } else {
      console.log('invalid');
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userForm.patchValue({ photo: file });
    this.userForm.get('photo').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);

    // console.log(this.userForm.get('photo'));
    // console.log('event', event.target);
    // console.log('file', file);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
