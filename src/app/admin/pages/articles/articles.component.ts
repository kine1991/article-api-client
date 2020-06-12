import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { NavigationExtras, Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap, delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateArticleDialogComponent } from '../../components/create-article-dialog/create-article-dialog.component';
import { ArticlesFilterDialogComponent } from '../../components/articles-filter-dialog/articles-filter-dialog.component';
import { ResponsiveService } from '../../services/responsive.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  private widthWithoutSidebarSubscription: Subscription
  public articles = [];
  public pageSize;
  public page = 1;
  public limit;
  
  public isLoading = true;
  public isLoaded;
  public currentWidthWithoutSidebar;

  public displayedColumns = ['imageUrl', 'title', 'category', 'author', 'createdAt', 'edit', 'remove'];

  // https://vk.com/images/camera_400.png?ava=1
  constructor(
    private articleService: ArticleService,
    private responsiveService: ResponsiveService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchData();
    // this.route.queryParams.pipe(
    //   switchMap((params: Params) => {
    //     this.isLoaded = false;
    //     this.isLoading = true;
    //     // const { page, limit } = params;
    //     return this.articleService.getArticles({ ...params, fields: '-content -__v' });
    //   }),
    //   delay(300),
    // ).subscribe(article => {
    //   this.articles = article.data.articles;
    //   this.limit = article.allResults;
    //   this.pageSize = article.results;

    //   this.isLoaded = true;
    //   this.isLoading = false;
    // });

    this.widthWithoutSidebarSubscription = this.responsiveService.currentWidthWithoutSidebar$.subscribe(currentWidthWithoutSidebar => {
      this.currentWidthWithoutSidebar = currentWidthWithoutSidebar;
      this.displayedColumns = ['imageUrl', 'author', 'category', 'priority', 'edit', 'remove', 'view'];
      if(currentWidthWithoutSidebar <= 800) {
      } else {
        this.displayedColumns = ['imageUrl', 'author', 'category', 'title', 'priority', 'createdAt', 'edit', 'remove', 'view'];
      }
    })
  }

  pageChange(event) {
    // console.log('event', event);
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
      console.log('result', result)
      if(result === 'reload') {
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.route.queryParams.pipe(
      switchMap((params: Params) => {
        this.isLoaded = false;
        this.isLoading = true;
        // const { page, limit } = params;
        return this.articleService.getArticles({ ...params, fields: '-content -__v' });
      }),
      delay(300),
    ).subscribe(article => {
      this.articles = article.data.articles;
      this.limit = article.allResults;
      this.pageSize = article.results;
      this.isLoaded = true;
      this.isLoading = false;
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
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: 'merge',
        queryParams: {
          ...result,
          page: undefined,
          limit: undefined
        },
      };
  
      this.router.navigate(['/admin/articles'], navigationExtras);
    });
  }

  ngOnDestroy() {
    this.widthWithoutSidebarSubscription.unsubscribe();
  }

}
