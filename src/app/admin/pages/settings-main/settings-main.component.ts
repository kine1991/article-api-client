import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.scss']
})
export class SettingsMainComponent implements OnInit, OnDestroy {
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
