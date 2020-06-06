import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-articles-by-author',
  templateUrl: './articles-by-author.component.html',
  styleUrls: ['./articles-by-author.component.scss']
})
export class ArticlesByAuthorComponent implements OnInit {
  public articles;
  public author;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
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
}
