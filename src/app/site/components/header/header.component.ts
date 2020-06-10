import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'site-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user;
  public isOpenSideBar = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(auth => {
      this.user = auth;
    });
  }

  logout() {
    this.authService.logout().subscribe(auth => {
      this.authService.user$.next(auth.data.user);
      console.log('Header logout - ', auth);
    });
  }

}
