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
import { DeleteArticleDialogComponent } from './components/delete-article-dialog/delete-article-dialog.component';
import { EditArticleDialogComponent } from './components/edit-article-dialog/edit-article-dialog.component';
import { SettingsLayoutWithNavbarComponent } from './container/settings-layout-with-navbar/settings-layout-with-navbar.component';
import { AdminComponent } from './container/admin/admin.component';
import { SettingsMainComponent } from './pages/settings-main/settings-main.component';
import { SettingsEditComponent } from './pages/settings-edit/settings-edit.component';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    ArticleComponent, 
    ArticlesComponent, 
    HeaderComponent, 
    SiteComponent, 
    CardComponent, CreateArticleDialogComponent, ArticlesFilterDialogComponent, ArticlePreviewComponent, DeleteArticleDialogComponent, EditArticleDialogComponent, SettingsLayoutWithNavbarComponent, AdminComponent, SettingsMainComponent, SettingsEditComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
