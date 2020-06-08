import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { NavigationExtras, ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public articles;
  public count;

  public page = 1;
  public pageSize = 20;
  public limit = 20;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
    });

    this.route.queryParams.pipe(
      switchMap((params: Params) => {
        return this.siteService.getArticles({ ...params, fields: '-content' })
      })
    ).subscribe(article => {
      console.log('article', article)
      this.limit = article.allResults;
      this.articles = article.data.articles
    });;
  }

  pageChange(event) {
    console.log(event)

    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { 
        page: +event.pageIndex + 1,
        limit: +event.pageSize,
      },
    };

    console.log(navigationExtras);

    this.router.navigate(['/articles'], navigationExtras);
  }

}
