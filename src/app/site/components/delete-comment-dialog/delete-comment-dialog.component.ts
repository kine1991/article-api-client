import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/site/services/comment.service';
// import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-delete-comment-dialog',
  templateUrl: './delete-comment-dialog.component.html',
  styleUrls: ['./delete-comment-dialog.component.scss']
})
export class DeleteCommentDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { commentId: string },
    private _snackBar: MatSnackBar,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
  }

  delete() {
    console.log('id', this.data.commentId);
    this.commentService.deleteComment(this.data.commentId).subscribe(() => {
      this.dialogRef.close('reload');
      this._snackBar.open('comment was deleted', 'close', { duration: 4000 });
    });
  }

}
