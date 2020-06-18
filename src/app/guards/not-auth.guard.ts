import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { skipWhile, take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isAuthenticated$
      .pipe(
        map(value => {
          // console.log('value', value);
          return !value;
        }),
        skipWhile(value => value === null),
        take(1),
        tap(authenticated => {
          // console.log('NotAuthGuard - authenticated', authenticated);
          if(!authenticated) {
            this.router.navigateByUrl('/');
          }
        })
      );
  }
  
}
