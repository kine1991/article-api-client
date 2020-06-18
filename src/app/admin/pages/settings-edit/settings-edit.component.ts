import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { UserService } from '../../services/user.service';
import { delay, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.scss']
})
export class SettingsEditComponent implements OnInit, OnDestroy {
  public userSubscription: Subscription;

  public userForm;
  public user;
  
  public refPhoto;
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

    this.userForm.get('photo').valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(data => {
      if(this.refPhoto) {
        this.imagePreview = data;
      }
      console.log('data', data);
    })
  }


  submit() {
    // console.log('111', this.userForm.value);
    if(this.userForm.valid) {
      console.log(this.userForm.value);
      const { name, email, photo } = this.userForm.value;
      // console.log({ name, email, photo });
      this.userService.updateMe({ name, email, photo })
      .subscribe(data => {
        this.authService.user$.next(data.data.user);
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
  }

  changeUploadPhoto(event) {
    this.refPhoto = event.checked;
    // if(event.checked) {
    //   this.userForm.get('photo').setValue(null);
    // }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
