import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-delete-article-dialog',
  templateUrl: './delete-article-dialog.component.html',
  styleUrls: ['./delete-article-dialog.component.scss']
})
export class DeleteArticleDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private _snackBar: MatSnackBar,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
  }

  delete() {
    this.articleService.deleteArticle(this.data.id).subscribe(() => {
      this.dialogRef.close('reload');
      this._snackBar.open('article was deleted', 'close', { duration: 4000 });
    }, error => {
      if(error.status === 401) {
        this._snackBar.open(error.error.errors[0].message, 'close', { duration: 4000 });
      } else {
        console.log('error ', error);
      }

    });
  }

}
