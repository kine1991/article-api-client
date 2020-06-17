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
  public responsiveSubscription: Subscription;

  public widthWithoutSidebar;

  constructor(
    private responsiveService: ResponsiveService,
  ) { }

  ngOnInit() {
    this.responsiveService.currentWidthWithoutSidebar$.subscribe(widthWithoutSidebar => {
      this.widthWithoutSidebar = widthWithoutSidebar;
    });
  }

  ngOnDestroy() {
  }


}
