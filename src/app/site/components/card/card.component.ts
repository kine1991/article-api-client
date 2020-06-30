import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'site-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public article;
  @Input() public currentUser;
  public isLikeMe = true;
  public countLikes;

  constructor(
    private siteService: SiteService
  ) { }

  ngOnInit() {
    // this.isLikeMe = this.article.likes.includes(this.currentUser._id);
    // console.log('isLikeMe', this.isLikeMe);
    // console.log('article.likes', this.article.likes);
    // console.log('currentUser', this.currentUser._id);
    // console.log('article', this.article);
  }

  likesArticle() {
    this.siteService.likesArticle(this.article.id).subscribe(article => {
      this.article = article.data.article;
      console.log('article', article);
      this.countLikes = article.data.article.likes.length;
    });
  }

}
