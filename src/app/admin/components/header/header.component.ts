import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ResizedEvent } from 'angular-resize-event';
import { Subject } from 'rxjs';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user;
  public isOpenSideBar = true;
  public currentWidth$ = new Subject();
  public currentWidth;


  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(auth => {
      this.user = auth;
    });

    this.currentWidth$.subscribe(currentWidth => {
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
    this.currentWidth$.next(event.newWidth);  
  }

  ngOnDestroy(): void {
    this.currentWidth$.unsubscribe();
  }

}
