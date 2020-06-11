import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { NavigationExtras, Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap, delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateArticleDialogComponent } from '../../components/create-article-dialog/create-article-dialog.component';
import { ArticlesFilterDialogComponent } from '../../components/articles-filter-dialog/articles-filter-dialog.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public articles = [];
  public pageSize;
  public page = 1;
  public limit;
  
  public isLoading = true;
  public isLoaded;

  displayedColumns: string[] = ['imageUrl', 'author', 'category', 'title', 'createdAt', 'edit', 'remove'];

  // https://vk.com/images/camera_400.png?ava=1
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap((params: Params) => {
        this.isLoaded = false;
        this.isLoading = true;
        const { page, limit } = params;
        return this.articleService.getArticles({ ...params, fields: '-content -__v' });
      }),
      delay(2000),
    ).subscribe(article => {
      console.log('article.data.articles', article.data.articles)
      this.articles = article.data.articles;
      this.limit = article.allResults;
      this.pageSize = article.results;

      this.isLoaded = true;
      this.isLoading = false;
    });;
  }

  pageChange(event) {
    console.log('event', event);
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { 
        page: +event.pageIndex + 1,
        limit: +event.pageSize,
      },
    };

    this.router.navigate(['/admin/articles'], navigationExtras);
  }

  create() {
    const dialogRef = this.dialog.open(CreateArticleDialogComponent, {
      width: '750px',
      data: {name: 'name1'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog CREATE was closed', result);
    });
  }

  edit(id) {
    console.log('edit id: ', id)
  }

  remove(id) {
    console.log('remove id: ', id)
  }

  filter() {
    const dialogRef = this.dialog.open(ArticlesFilterDialogComponent, {
      width: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog Filter was closed', result);

      const navigationExtras: NavigationExtras = {
        queryParamsHandling: 'merge',
        queryParams: result,
      };
  
      this.router.navigate(['/admin/articles'], navigationExtras);
    });
  }

}
