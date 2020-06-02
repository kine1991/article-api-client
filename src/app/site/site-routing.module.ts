import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './container/admin/admin.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from '../article/article.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
