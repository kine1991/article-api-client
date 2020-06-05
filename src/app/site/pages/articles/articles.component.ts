import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public articles;
  public count;

  constructor(
    private siteService: SiteService
  ) { }

  ngOnInit() {
    const params = {
      fields: '-content',
      limit: 10
    }
    this.siteService.getArticles(params).subscribe(article => {
      this.articles = article.data.articles
    });

    this.siteService.getCountArticles().subscribe(article => {
      this.count = article.count;
    });

  }

}
