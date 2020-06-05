import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface GetArticlesResponse {
  results: number,
  status: string
  data: {
    articles: [Article]
  },
}

export interface GetArticleResponse {
  status: string,
  data: {
    article: Article
  },
}

export interface GetFilterResponse {
  status: string,
  data: {
    categories: [string],
    authors: [string],
    priorities: [string]
  }
}

export interface Article {
  id: string,
  author: string,
  category: string,
  publisher: string,
  title: string,
  description: string,
  priority: number,
  imageUrl?: string,
  imagesUrl?: string[] | [],
  private?: boolean,
  createdAt?: "2020-05-30T12:54:49.710Z"
  updatedAt?: "2020-05-30T12:54:49.710Z"
  _id?: string,
}

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(
    private http: HttpClient
  ) { }

  getArticles(params) {
    return this.http.get<GetArticlesResponse>(`${environment.url}/articles`, { params });
  }

  getArticle (id) {
    return this.http.get<GetArticleResponse>(`${environment.url}/articles/${id}`);
  }

  getCountArticles(params?) {
    return this.http.get<{count: number}>(`${environment.url}/articles/count`, { params });
  }

  getArticlesByCategory({ category, page, limit }) {
    console.log(category, page, limit);
    return this.http.get<GetArticlesResponse>(`${environment.url}/articles/category/${category}/${page}/${limit}`)
  }

  getFilter () {
    return this.http.get<GetFilterResponse>(`${environment.url}/articles/filter`);
  }
}
