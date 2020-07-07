import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ArticleService } from '../../services/article.service';
import { ResponsiveService } from '../../services/responsive.service';
import { CreateArticleDialogComponent } from '../../components/create-article-dialog/create-article-dialog.component';
import { DeleteArticleDialogComponent } from '../../components/delete-article-dialog/delete-article-dialog.component';
import { ArticlesFilterDialogComponent } from '../../components/articles-filter-dialog/articles-filter-dialog.component';
import { EditArticleDialogComponent } from '../../components/edit-article-dialog/edit-article-dialog.component';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss']
})
export class MyArticlesComponent implements OnInit {
  private widthWithoutSidebarSubscription: Subscription;
  public currentUserId;
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
    private authService: AuthService,
    private responsiveService: ResponsiveService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  fetchData(currentUserId) {
    this.route.queryParams.pipe(
      switchMap((params: Params) => {
        this.isLoaded = false;
        this.isLoading = true;
        // const { page, limit } = params;
        return this.articleService.getArticles({ ...params, publisher: currentUserId, fields: '-content -__v' });
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

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUserId = user._id;
      this.fetchData(this.currentUserId);
      // console.log('user', user);
    })

    this.widthWithoutSidebarSubscription = this.responsiveService.currentWidthWithoutSidebar$.subscribe(currentWidthWithoutSidebar => {
      this.currentWidthWithoutSidebar = currentWidthWithoutSidebar;
      this.displayedColumns = ['imageUrl', 'author', 'category', 'priority', 'edit', 'remove', 'view'];
      if(currentWidthWithoutSidebar <= 800) {
      } else {
        this.displayedColumns = ['imageUrl', 'author', 'category', 'title', 'priority', 'createdAt', 'edit', 'remove', 'view'];
      }
    });
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
      width: '950px',
      data: {name: 'name1'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'reload') {
        this.fetchData(this.currentUserId);
      }
    });
  }

  edit(id) {
    const dialogRef = this.dialog.open(EditArticleDialogComponent, {
      width: '950px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'reload') {
        this.fetchData(this.currentUserId);
      }
    });
  }

  remove(id) {
    const dialogRef = this.dialog.open(DeleteArticleDialogComponent, {
      width: '300px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'reload') {
        this.fetchData(this.currentUserId);
      }
    });
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
    if(this.widthWithoutSidebarSubscription) this.widthWithoutSidebarSubscription.unsubscribe();
  }


}
