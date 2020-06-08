import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationExtras } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { switchMap, delay } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-articles-by-category',
  templateUrl: './articles-by-category.component.html',
  styleUrls: ['./articles-by-category.component.scss']
})
export class ArticlesByCategoryComponent implements OnInit {
  public articles;
  public category;
  public isLoading = false;
  
  public limit = 20;
  public page = 1;
  public pageSize = 20;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        this.isLoading = true
        this.category = params.get('categoryName');
        return this.siteService.getArticlesByCategory({ category: params.get('categoryName'), page: params.get('page'), limit: params.get('limit') });
      }),
      delay(1000)
    ).subscribe(article => {
      this.articles = article.data.articles;
      this.limit = article.allResults;
      this.isLoading = false;
    });
  }

  pageChange(event) {
    this.router.navigate(['/term/category', this.category, +event.pageIndex + 1, +event.pageSize]);
  }

}
