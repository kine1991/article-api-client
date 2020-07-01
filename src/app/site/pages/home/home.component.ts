import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public categories;
  public categoriesObj;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.articleService.getRandomArticles().subscribe(article => {
      console.log('article', article.data.articles.categories);
      // this.categories = article.data.articles;

      this.categoriesObj = article.data.articles;
      // console.log('category', category);
      this.categories = Object.keys(article.data.articles).map(category => {
        return category;
      })
    });
  }

}
