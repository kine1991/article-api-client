import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'site-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user;
  public isOpenSideBar = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(auth => {
      this.user = auth;
    });
  }

  logout() {
    this.authService.logout().subscribe(auth => {
      this.authService.user$.next(auth.data.user);
      this.authService.isAuthenticated$.next(false);
      // this.router.navigate(['/']);
    });
  }

}
