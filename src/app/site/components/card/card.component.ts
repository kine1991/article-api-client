import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'site-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() article
  constructor() { }

  ngOnInit(): void {
  }

}
