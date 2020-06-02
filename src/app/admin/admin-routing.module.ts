import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from './pages/article/article.component';
import { SiteComponent } from './container/site/site.component';


const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: '',
        component: ArticlesComponent
      },
      {
        path: ':id',
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
