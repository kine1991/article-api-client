import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public articles;

  constructor(
    private siteService: SiteService
  ) { }

  ngOnInit() {
    const params = {
      fields: '-content',
      limit: 10
    }
    this.siteService.getArticles(params).subscribe(article => {
      console.log('articles', article.data.articles);
      this.articles = article.data.articles
    });

  }

}
