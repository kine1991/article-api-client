import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ArticleComponent } from './pages/article/article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { HeaderComponent } from './components/header/header.component';
import { SiteComponent } from './container/site/site.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from '../shared/shared.module';
import { CreateArticleDialogComponent } from './components/create-article-dialog/create-article-dialog.component';
import { ArticlesFilterDialogComponent } from './components/articles-filter-dialog/articles-filter-dialog.component';
import { ArticlePreviewComponent } from './pages/article-preview/article-preview.component';


@NgModule({
  declarations: [
    ArticleComponent, 
    ArticlesComponent, 
    HeaderComponent, 
    SiteComponent, 
    CardComponent, CreateArticleDialogComponent, ArticlesFilterDialogComponent, ArticlePreviewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
