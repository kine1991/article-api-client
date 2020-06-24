import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentService } from 'src/app/site/services/comment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'site-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit, OnDestroy {
  @Input() public comment;
  @Input() public articleId;
  public authSubscription: Subscription;
  public currentUser;
  public commentContent;
  public isEdit = false;
  
  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  updateComment(commentId) {
    // console.log('@', this.articleId, commentId, this.commentContent);
    this.commentService.updateComment({ 
      articleId: this.articleId, 
      commentId, 
      comment: this.commentContent
    }).subscribe(comment => {
      this.comment = comment.data.comment;
      this.isEdit = false
      console.log('updateComment', comment);
    });
  }

  deleteComment(commentId) {
    console.log(commentId);
  }

  ngOnDestroy() {
    if(this.authSubscription) this.authSubscription.unsubscribe();
  }
}
