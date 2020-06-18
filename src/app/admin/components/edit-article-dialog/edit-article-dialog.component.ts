import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from '../../services/article.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-article-dialog',
  templateUrl: './edit-article-dialog.component.html',
  styleUrls: ['./edit-article-dialog.component.scss']
})
export class EditArticleDialogComponent implements OnInit, OnDestroy {
  public articleSubscription: Subscription;
  public filterSubscription: Subscription;

  public editArticleForm;
  public filterData;
  
  public isSelectAuthor = true;
  public isSelectCategory = true;

  constructor(
    public dialogRef: MatDialogRef<EditArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private _snackBar: MatSnackBar,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.articleSubscription = this.articleService.getArticle(this.data.id).subscribe(article => {
      const { title, author, category, description, priority, imageUrl, content } = article.data.article;
      this.editArticleForm = new FormGroup({
        title: new FormControl(title, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
        author: new FormControl(author, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        category: new FormControl(category, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
        description: new FormControl(description, [Validators.required, Validators.minLength(2), Validators.maxLength(350)]),
        priority: new FormControl(priority),
        imageUrl: new FormControl(imageUrl),
        content: new FormControl(content, [Validators.required, Validators.minLength(100)]),
      });
    });

    this.filterSubscription = this.articleService.getFilter().subscribe(filter => {
      this.filterData = filter.data;
      console.log(filter);
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    if (this.editArticleForm.valid) {
      this.articleService.updateArticle({ id: this.data.id, ...this.editArticleForm.value}).subscribe(data => {
          console.log('data', data);
          this.dialogRef.close('reload');
          this._snackBar.open('article was edited', 'close', { duration: 4000 });
      });
      console.log(this.editArticleForm.value);
    }
  }

  isSelectAuthorChange(value) {
    this.isSelectAuthor = value;
  }

  isSelectCategoryChange(value) {
    console.log(value)
    this.isSelectCategory = value;
  }

  ngOnDestroy() {
    if(this.articleSubscription) this.articleSubscription.unsubscribe();
    if(this.filterSubscription) this.filterSubscription.unsubscribe();
  }

}
