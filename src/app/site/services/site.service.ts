import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface GetArticlesResponse {
  results: number,
  allResults: number,
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

export interface GetPublishersResponse {
  status: string
  results: number,
  allResults: number,
  data: {
    users: [Publisher]
  },
}

export interface GetPublisherResponse {
  status: string
  data: {
    user: Publisher
  },
}

export interface Publisher {
  id: string
  role: string,
  name: string,
  email: string,
  photo: string,
  _id: string,
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
  likes?: [string],
  createdAt?: Date
  updatedAt?: Date
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

  getArticlesByAuthors({ author, page, limit }) {
    // console.log(author, page, limit );
    return this.http.get<GetArticlesResponse>(`${environment.url}/articles/author/${author}/${page}/${limit}`)
  }

  getArticlesByPublishers({ publisher, page, limit }) {
    return this.http.get<GetArticlesResponse>(`${environment.url}/articles/publisher/${publisher}/${page}/${limit}`);
  }

  getFilter() {
    return this.http.get<GetFilterResponse>(`${environment.url}/articles/filter`);
  }

  getPublishers() {
    return this.http.get<GetPublishersResponse>(`${environment.url}/users`);
  }

  getPublisher(id) {
    return this.http.get<GetPublisherResponse>(`${environment.url}/users/${id}`);
  }

  likesArticle(articleId) {
    return this.http.get<GetArticleResponse>(`${environment.url}/articles/like/${articleId}`, {
      withCredentials: true
    });
  }
}
