import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'site-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {
  @Input() public articleId;
  @Output() onCreateComment = new EventEmitter();
  public user;
  public comment;

  constructor(
    private authService: AuthService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    // this.authService.isAuthenticated$.subscribe(auth => )
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  createComment() {
    if(this.comment) {
      this.commentService.createComment({ articleId: this.articleId, comment: this.comment}).subscribe(data => {
        this.onCreateComment.emit();
        this.comment = undefined;
      });
    }
  }
}
