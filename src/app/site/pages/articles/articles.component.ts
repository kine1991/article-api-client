import { Component, OnInit, OnDestroy } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { NavigationExtras, ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'site-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  public authSubscription;
  public currentUser;
  public articles;
  public count;

  public page = 1;
  public pageSize = 20;
  public limit = 20;

  constructor(
    private siteService: SiteService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user
    });
    this.route.queryParams.pipe(
      switchMap((params: Params) => {
        return this.siteService.getArticles({ ...params, fields: '-content' })
      })
    ).subscribe(article => {
      console.log(article.data.articles);
      this.limit = article.allResults;
      this.articles = article.data.articles;
    });;
  }

  pageChange(event) {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { 
        page: +event.pageIndex + 1,
        limit: +event.pageSize,
      },
    };

    this.router.navigate(['/articles'], navigationExtras);
  }

  ngOnDestroy() {
    if(this.authSubscription) this.authSubscription.uns
  }

}
