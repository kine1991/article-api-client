import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article;
  public  largeText = false;

  constructor(
    private siteService: SiteService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: Params) => {
      console.log(params);
      this.siteService.getArticle(params.id).subscribe(article => {
        console.log(article.data.article);
        this.article = article.data.article;
      })
    });
  }

}
