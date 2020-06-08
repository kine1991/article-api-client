import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from './pages/article/article.component';
import { SharedModule } from '../shared/shared.module';
import { SiteComponent } from './container/site/site.component';
import { ArticlesByCategoryComponent } from './pages/articles-by-category/articles-by-category.component';
import { ArticlesByAuthorComponent } from './pages/articles-by-author/articles-by-author.component';
import { FilterComponent } from './components/filter/filter.component';
import { PublisherComponent } from './pages/publisher/publisher.component';
import { PublishersComponent } from './pages/publishers/publishers.component';



@NgModule({
  declarations: [
    SiteComponent, 
    HeaderComponent, 
    CardComponent, 
    ArticlesComponent, 
    ArticleComponent, 
    ArticlesByCategoryComponent, 
    ArticlesByAuthorComponent, 
    FilterComponent, 
    PublisherComponent, 
    PublishersComponent,
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    SharedModule
  ]
})
export class SiteModule { }
