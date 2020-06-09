import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'site-articles-by-author',
  templateUrl: './articles-by-author.component.html',
  styleUrls: ['./articles-by-author.component.scss']
})
export class ArticlesByAuthorComponent implements OnInit {
  public articles;
  public author;

  public limit = 20;
  public page = 1;
  public pageSize = 20;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        console.log('params', params);
        this.author = params.get('authorName');
        return this.siteService.getArticlesByAuthors({ author: params.get('authorName'), page: params.get('page'), limit: params.get('limit') });
      })
    ).subscribe(article => {
      this.articles = article.data.articles;
    });
  }

  pageChange(event) {
    this.router.navigate(['/term/category', this.author, +event.pageIndex + 1, +event.pageSize]);
  }
}
