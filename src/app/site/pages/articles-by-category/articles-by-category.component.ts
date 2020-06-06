import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-articles-by-category',
  templateUrl: './articles-by-category.component.html',
  styleUrls: ['./articles-by-category.component.scss']
})
export class ArticlesByCategoryComponent implements OnInit {
  public articles;
  public category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        console.log('params', params);
        this.category = params.get('categoryName');
        return this.siteService.getArticlesByCategory({ category: params.get('categoryName'), page: params.get('page'), limit: params.get('limit') });
      })
    ).subscribe(article => {
      console.log(article);
      this.articles = article.data.articles;
    });
  }
}
