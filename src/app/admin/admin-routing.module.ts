import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './container/site/site.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticlePreviewComponent } from './pages/article-preview/article-preview.component';
import { AdminComponent } from './container/admin/admin.component';
import { SettingsLayoutWithNavbarComponent } from './container/settings-layout-with-navbar/settings-layout-with-navbar.component';
import { SettingsMainComponent } from './pages/settings-main/settings-main.component';
import { SettingsEditComponent } from './pages/settings-edit/settings-edit.component';
import { SettingsChangePasswordComponent } from './pages/settings-change-password/settings-change-password.component';


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
        component: ArticlePreviewComponent
      },
      {
        path: 'settings',
        component: SettingsLayoutWithNavbarComponent,
        children: [
          {
            path: '',
            component: SettingsMainComponent
          },
          {
            path: 'edit',
            component: SettingsEditComponent
          },
          {
            path: 'change-password',
            component: SettingsChangePasswordComponent
          },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
