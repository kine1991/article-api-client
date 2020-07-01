import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'site-card-mini',
  templateUrl: './card-mini.component.html',
  styleUrls: ['./card-mini.component.scss']
})
export class CardMiniComponent implements OnInit {
  @Input() public article;

  constructor() { }

  ngOnInit() {
  }

  getSize(item) {
    console.log(item);
    if(item === 'description') {
      if(this.article.description.length > 170) return '11px'
      if(this.article.description.length >= 140 && this.article.description.length <= 170) return '12px'
      if(this.article.description.length >= 100 && this.article.description.length <= 139) return '13px'
      if(this.article.description.length > 50 && this.article.description.length < 100) return '16px'
      if(this.article.description.length >= 49) return '20px'
    } else if(item === 'title') {
      if(this.article.title.length > 90) return '11px';
      if(this.article.title.length <= 90 && this.article.title.length > 80) return '11px';
      if(this.article.title.length <= 80 && this.article.title.length > 60) return '12px';
      if(this.article.title.length <= 60) return '14px';
      return '16px';
    }
  }

}
