import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
  selector: 'app-settings-layout-with-navbar',
  templateUrl: './settings-layout-with-navbar.component.html',
  styleUrls: ['./settings-layout-with-navbar.component.scss']
})
export class SettingsLayoutWithNavbarComponent implements OnInit, OnDestroy {
  public userSubscription: Subscription;
  public responsiveSubscription: Subscription;

  public user;
  public widthWithoutSidebar;

  constructor(
    private authService: AuthService,
    private responsiveService: ResponsiveService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(auth => {
      this.user = auth;
    });

    this.responsiveService.currentWidthWithoutSidebar$.subscribe(widthWithoutSidebar => {
      this.widthWithoutSidebar = widthWithoutSidebar;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.responsiveSubscription.unsubscribe();
  }


}
