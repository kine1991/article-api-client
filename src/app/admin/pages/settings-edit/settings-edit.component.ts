import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.scss']
})
export class SettingsEditComponent implements OnInit, OnDestroy {
  public userSubscription: Subscription;

  public user;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(auth => {
      this.user = auth;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
