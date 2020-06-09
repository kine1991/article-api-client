import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    this.authService.checkAuth().subscribe(auth => {
      console.log('app - checkAuth', auth);
      this.authService.user$.next(auth.data.user);
    });
  }
}
