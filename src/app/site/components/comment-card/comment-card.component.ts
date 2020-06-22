import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'site-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() public comment;
  
  constructor() { }

  ngOnInit(): void {
  }

}
