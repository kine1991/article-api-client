import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './container/site/site.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from './pages/article/article.component';


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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
