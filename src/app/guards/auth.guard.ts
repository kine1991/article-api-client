import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { take, skipWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    let isGuard
    this.authService.isAuthenticated$.subscribe(data => {
      isGuard = data;
    });
    return isGuard;
    return this.authService.isAuthenticated$
    .pipe(
      skipWhile(value => value === null),
      take(1),
      tap(authenticated => {
        console.log('AuthGuard - authenticated', authenticated);
        if(!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
