import { Component, OnInit } from '@angular/core';
import { ArticleService } from './services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(article => {
      console.log(article);
    })
  }

}
