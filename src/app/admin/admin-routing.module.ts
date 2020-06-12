import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './container/site/site.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticlePreviewComponent } from './pages/article-preview/article-preview.component';


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
        component: ArticlePreviewComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
