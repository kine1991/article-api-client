import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from './pages/article/article.component';
import { SiteComponent } from './container/site/site.component';
import { ArticlesByCategoryComponent } from './pages/articles-by-category/articles-by-category.component';
import { ArticlesByAuthorComponent } from './pages/articles-by-author/articles-by-author.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';


const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: 'articles',
        component: ArticlesComponent
      },
      {
        path: 'articles/:id',
        component: ArticleComponent
      },
      // {
      //   path: 'term/category'
      // },
      {
        path: 'term/category/:categoryName',
        component: ArticlesByCategoryComponent
      },
      {
        path: 'term/category/:categoryName/:page',
        component: ArticlesByCategoryComponent
      },
      {
        path: 'term/category/:categoryName/:page/:limit',
        component: ArticlesByCategoryComponent
      },
      {
        path: 'term/author/:authorName',
        component: ArticlesByAuthorComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'users/:userId',
        component: UserComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
