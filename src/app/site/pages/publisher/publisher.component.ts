import { Component, OnInit } from '@angular/core';
import { SiteService, Publisher } from '../../services/site.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {
  public publisher$ = new Subject<Publisher>();
  public publisher;
  public articles;
  
  public page;
  public limit;
  public allResults;
  public allPages;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        this.page = params.get('page') ? params.get('page') : 1;
        this.limit = params.get('limit') ? params.get('limit') : 20;
        return this.siteService.getPublisher(params.get('userId'))
      })
    ).subscribe(publisher => {
      this.publisher$.next(publisher.data.user);
      this.publisher = publisher.data.user;
    });

    this.publisher$.pipe(
      switchMap(publisher => {
        return this.siteService.getArticlesByPublishers({ publisher: publisher.id, page: this.page, limit: this.limit })
      })
    ).subscribe(article => {
      this.articles = article.data.articles;
      this.allResults = article.allResults;
      this.allPages = Math.ceil(article.allResults/this.limit);
    });
  }

  prev() {
    let userId = this.route.snapshot.paramMap.get('userId');
    // let page = this.route.snapshot.paramMap.get('page');
    // let limit = this.route.snapshot.paramMap.get('limit');

    this.page = +this.page - 1;
    this.router.navigate(['publishers', userId, this.page, this.limit]); 
  }

  next() {
    let userId = this.route.snapshot.paramMap.get('userId');
    // let page = this.route.snapshot.paramMap.get('page');
    // let limit = this.route.snapshot.paramMap.get('limit');

    this.page = +this.page + 1;
    this.router.navigate(['publishers', userId, this.page, this.limit]);
  }
}
