import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'site-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  public comments;
  public commentsCount;
  public articleId;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
  ) { }

  getComments() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        console.log('a', params);
        this.articleId = params.get('articleId');
        return this.commentService.getCommentsByArcicle(params.get('articleId'))
      })
    ).subscribe((data) => {
      this.comments = data.data.comments;
      this.commentsCount = data.results;
      console.log('data', data.data.comments);
    });
  }

  ngOnInit() {
    this.getComments();
  }

  reloadComment() {
    this.getComments();
  }

}
