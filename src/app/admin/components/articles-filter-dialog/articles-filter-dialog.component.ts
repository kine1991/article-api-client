import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleService } from '../../services/article.service';
import { tap, delay, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-articles-filter-dialog',
  templateUrl: './articles-filter-dialog.component.html',
  styleUrls: ['./articles-filter-dialog.component.scss']
})
export class ArticlesFilterDialogComponent implements OnInit {
  public authors;
  public categories;
  public priorities;
  
  public selectedAuthor;
  public selectedCategory;
  public selectedPriority;
  
  public isLoading = true;

  constructor(
    public dialogRef: MatDialogRef<ArticlesFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.isLoading = true;
    this.route.queryParams.pipe(
      switchMap((params: Params) => {
        const { author, category, priority } = params;
        console.log('params', author, category, priority);
        this.selectedAuthor = author;
        this.selectedCategory = category;
        this.selectedPriority = priority;
        return this.articleService.getFilter().pipe(
          tap(() => {
            this.isLoading = true;
          }),
          delay(300)
        )
      })
    ).subscribe(filter => {
      this.isLoading = false;
      this.authors = filter.data.authors;
      this.categories = filter.data.categories;
      this.priorities = filter.data.priorities;
      console.log('filter', filter.data);
    })
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
