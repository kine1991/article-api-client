import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article;

  constructor(
    private siteService: SiteService
  ) { }

  ngOnInit() {
    this.siteService.getArticle('5ed2579b6943a710b0255a40').subscribe(article => {
      console.log(article.data.article);
      this.article = article.data.article;
    })
  }

}
