import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'site-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article;
  public countLikes;
  public isLike;
  public articleId;
  public currentUser;
  public largeText = false;

  constructor(
    private siteService: SiteService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  // ngOnInit() {
  //   this.authService.user$.subscribe(auth => {
  //     console.log('***auth', auth);
  //     const currentUserId = auth.id;
  //     this.currentUserId = currentUserId;
  //     console.log('currentUserId', currentUserId);

    //   this.route.paramMap.subscribe(({ params }: Params) => {
    //     this.articleId = params.articleId;
    //     this.siteService.getArticle(params.articleId).subscribe(article => {
    //       this.article = article.data.article;
    //       this.countLikes = this.article.likes ? this.article.likes.length : 0;
    //       if(currentUserId) {
    //         this.isLike = this.article.likes ? this.article.likes.includes(currentUserId) : false;
    //       } else {
    //         this.isLike = false;
    //       }
    //     });
    //   });
    // });

  // }
  
  // likesArticle() {
    // this.siteService.likesArticle(this.articleId).subscribe(article => {
    //   console.log('art', article);
    //   this.countLikes = this.article.likes ? this.article.likes.length : 0;
    //   if(this.currentUserId) {
    //     this.isLike = this.article.likes ? this.article.likes.includes(this.currentUserId) : false;
    //   } else {
    //     this.isLike = false;
    //   }
    // });
  // }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      // console.log('isAuth', isAuth);
      if(isAuth) {
        this.authService.user$.subscribe(user => {
          this.currentUser = user;
          this.getArticle(user._id);
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
    this.siteService.likesArticle(this.articleId).subscribe(article => {
      console.log('art', article.data.article.likes);
      // this.article.likes
      this.countLikes = article.data.article.likes ? article.data.article.likes.length : 0;
      if(this.currentUser) {
        this.isLike = article.data.article.likes ? article.data.article.likes.includes(this.currentUser.id) : false;
      } else {
        this.isLike = false;
      }
    });
  }
}
