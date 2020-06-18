import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from './pages/article/article.component';
import { SiteComponent } from './container/site/site.component';
import { ArticlesByCategoryComponent } from './pages/articles-by-category/articles-by-category.component';
import { ArticlesByAuthorComponent } from './pages/articles-by-author/articles-by-author.component';
import { PublishersComponent } from './pages/publishers/publishers.component';
import { PublisherComponent } from './pages/publisher/publisher.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NotAuthGuard } from '../guards/not-auth.guard';


const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: 'sign-in',
        canActivate: [NotAuthGuard],
        component: SignInComponent
      },
      {
        path: 'sign-up',
        canActivate: [NotAuthGuard],
        component: SignUpComponent
      },
      {
        path: 'articles',
        component: ArticlesComponent
      },
      {
        path: 'articles/:id',
        component: ArticleComponent
      },
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
        path: 'term/author/:authorName/:page',
        component: ArticlesByAuthorComponent
      },
      {
        path: 'term/author/:authorName/:limit',
        component: ArticlesByAuthorComponent
      },
      {
        path: 'publishers',
        component: PublishersComponent
      },
      {
        path: 'publishers/:userId',
        component: PublisherComponent
      },
      {
        path: 'publishers/:userId/:page',
        component: PublisherComponent
      },
      {
        path: 'publishers/:userId/:page/:limit',
        component: PublisherComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
