import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'site-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  public selectedColor = 'white';
  public showPalette = false;

  constructor() { }

  ngOnInit() {

  }

}
