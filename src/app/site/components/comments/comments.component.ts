import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'site-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Output() public onGetCountComments = new EventEmitter();
  public comments;
  public articleId;
  public commentsCount;

  public sort;
  public limit = 10;
  public selectedSort = 'new';

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
  ) { }

  getComments() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        this.articleId = params.get('articleId');
        return this.commentService.getCommentsByArcicle({ articleId: params.get('articleId'), limit: this.limit, sort: this.sort });
      })
    ).subscribe((data) => {
      this.comments = data.data.comments;
      this.commentsCount = data.allResults;
      this.onGetCountComments.emit(data.allResults);
    });
  }

  ngOnInit() {
    this.getComments();
  }

  reloadComment() {
    this.getComments();
  }

  moreComments() {
    this.limit = this.limit + 10;
    this.getComments();
  }

  sortBy(event) {
    if(this.selectedSort !== event){
      this.limit = 10;
      this.selectedSort = event;
      if (this.selectedSort === 'old') this.sort = 'createdAt';
      if (this.selectedSort === 'new') this.sort = '-createdAt';
      this.getComments();
    }
  }


}
