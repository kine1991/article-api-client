import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  public currentWidth$ = new Subject();
  public currentWidthWithoutSidebar$ = new Subject();

  constructor() { }
}
