import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentService } from 'src/app/site/services/comment.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCommentDialogComponent } from '../delete-comment-dialog/delete-comment-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'site-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit, OnDestroy {
  @Input() public comment;
  @Output() public onDeleteComment = new EventEmitter();
  public authSubscription: Subscription;
  public currentUser;
  public commentContent;
  public isEdit = false;
  
  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  updateComment(commentId) {
    this.commentService.updateComment({ commentId, comment: this.commentContent }).subscribe(comment => {
      this.comment = comment.data.comment;
      this.isEdit = false;
      this._snackBar.open('comment was updated', 'close', { duration: 4000 });
    });
  }

  deleteComment(commentId) {
    console.log(commentId);
    const dialogRef = this.dialog.open(DeleteCommentDialogComponent, {
      width: '300px',
      data: { commentId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'reload') {
        this.onDeleteComment.emit();
      }
    });
  }

  ngOnDestroy() {
    if(this.authSubscription) this.authSubscription.unsubscribe();
  }
}
