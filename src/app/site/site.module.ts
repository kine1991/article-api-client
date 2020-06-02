import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { AdminComponent } from './container/admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from './pages/article/article.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent, 
    HeaderComponent, 
    CardComponent, 
    ArticlesComponent, 
    ArticleComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    SharedModule
  ]
})
export class SiteModule { }
