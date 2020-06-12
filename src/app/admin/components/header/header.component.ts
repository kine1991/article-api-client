import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ResizedEvent } from 'angular-resize-event';
import { ResponsiveService } from '../../services/responsive.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private widthSubscription: Subscription;
  private widthWithoutSidebarSubscription: Subscription;
  public user;
  public isOpenSideBar = true;
  
  public currentWidth;


  constructor(
    private authService: AuthService,
    private responsiveService: ResponsiveService,
  ) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(auth => {
      this.user = auth;
    });

    this.widthSubscription = this.responsiveService.currentWidth$.subscribe(currentWidth => {
      this.currentWidth = currentWidth;
    });

  }

  logout() {
    this.authService.logout().subscribe(auth => {
      this.authService.user$.next(auth.data.user);
      console.log('AdminHeader logout - ', auth);
    });

  }

  onResized(event: ResizedEvent) {
    this.responsiveService.currentWidth$.next(event.newWidth);  
  }

  onResizedWithoutSidebar(event: ResizedEvent) {
    this.responsiveService.currentWidthWithoutSidebar$.next(event.newWidth);  
  }

  ngOnDestroy() {
    this.responsiveService.currentWidth$.unsubscribe();
    this.responsiveService.currentWidthWithoutSidebar$.unsubscribe();
  }

}
