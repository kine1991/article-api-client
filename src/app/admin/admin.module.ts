import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ArticleComponent } from './pages/article/article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { HeaderComponent } from './components/header/header.component';
import { SiteComponent } from './container/site/site.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ArticleComponent, 
    ArticlesComponent, 
    HeaderComponent, 
    SiteComponent, 
    CardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
