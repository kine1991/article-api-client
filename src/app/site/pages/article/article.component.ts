import { Component, OnInit, OnDestroy } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'site-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  public authSubscription: Subscription;

  public article;
  public countLikes;
  public countComments;
  public isLike:any = undefined;
  public articleId;
  public currentUser;
  public largeText = false;

  constructor(
    private siteService: SiteService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuth => {
      // console.log('isAuth', isAuth);
      if(isAuth) {
        this.authService.user$.subscribe(user => {
          if(user) {
            this.currentUser = user;
            this.getArticle(user._id);
          } else {
            this.currentUser = null;
            this.getArticle();
          }
        });
      } else {
        this.getArticle();
      }
    });
  }

  getArticle(currentUserId?) {
    this.route.paramMap.subscribe(({ params }: Params) => {
      this.articleId = params.articleId;
      this.siteService.getArticle(params.articleId).subscribe(article => {
        this.article = article.data.article;
        this.countLikes = this.article.likes ? this.article.likes.length : 0;
        if(currentUserId) {
          this.isLike = this.article.likes ? this.article.likes.includes(currentUserId) : false;
        } else {
          this.isLike = false;
        }
      });
    });
  }


  likesArticle() {
    if(this.currentUser) {
      this.siteService.likesArticle(this.articleId).subscribe(article => {
        // this.article.likes
        this.countLikes = article.data.article.likes ? article.data.article.likes.length : 0;
        if(this.currentUser) {
          this.isLike = article.data.article.likes ? article.data.article.likes.includes(this.currentUser.id) : false;
        } else {
          this.isLike = false;
        }
      });
    } else {
      this.router.navigate(['sign-in']);
    }
  }

  getCountComments(count) {
    this.countComments = count;
  }

  scroll(el: HTMLElement) {
    console.log('el', el)
  }

  ngOnDestroy() {
    if(this.authSubscription) this.authSubscription.unsubscribe();
  }
}
