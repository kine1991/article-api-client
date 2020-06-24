import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface CommentsResponse {
  status: string
  results: number,
  allResults: number,
  data: {
    comments: [Comment]
  }
}

export interface CommentResponse {
  status: string,
  data: {
    comment: Comment
  }
}

interface Comment {
  _id: string;
  id: string;
  comment: string;
  article: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  getCommentsByArcicle({ articleId, limit, sort }) {
    let params = new HttpParams();
    if(limit) params = params.append('limit', limit);
    if(sort) params = params.append('sort', sort);
    return this.http.get<CommentsResponse>(`${environment.url}/articles/${articleId}/comments`, {
      params
    });
  }

  createComment({ articleId, comment }) {
    return this.http.post<CommentResponse>(`${environment.url}/articles/${articleId}/comments`, { comment: comment }, {
      withCredentials: true
    });
  }

  updateComment({ articleId, commentId, comment}) {
    return this.http.patch<CommentResponse>(`${environment.url}/articles/${articleId}/comments/${commentId}`, { comment }, {
      withCredentials: true
    });
  }
}
