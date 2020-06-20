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
    this.authService.user$.subscribe(auth => {
      console.log('user', auth);
      this.user = auth;
    });
  }

  createComment() {
    if(this.comment) {
      this.commentService.createComment({ articleId: this.articleId, comment: this.comment}).subscribe(data => {
        console.log('data', data);
        this.onCreateComment.emit();
      });
    }
    console.log('comment', this.comment);
  }
}
