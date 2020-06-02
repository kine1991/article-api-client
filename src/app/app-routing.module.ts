import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: ArticleComponent
  // },
  // {
  //   path: 'articles',
  //   component: ArticleComponent
  // },
  // {
  //   path: 'sign-in',
  //   component: SignInComponent
  // },
  // {
  //   path: 'sign-up',
  //   component: SignUpComponent
  // },
  {
    path: '',
    loadChildren: () => import('./site/site.module').then(module => module.SiteModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
