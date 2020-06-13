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

export interface CreateArticleResponse {
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
  content: string,
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
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  getArticles(params?) {
    return this.http.get<GetArticlesResponse>(`${environment.url}/articles`, { params });
  }

  getArticle(id) {
    return this.http.get<GetArticleResponse>(`${environment.url}/articles/${id}`);
  }

  createArticle(data) {
    return this.http.post<CreateArticleResponse>(`${environment.url}/articles`, data, {
      withCredentials: true
    });
  }

  getFilter() {
    return this.http.get<GetFilterResponse>(`${environment.url}/articles/filter`);
  }

  updateArticle({ id, ...data }) {
    return this.http.patch(`${environment.url}/articles/${id}`, data, {
      withCredentials: true
    });
  }

  deleteArticle(id) {
    return this.http.delete(`${environment.url}/articles/${id}`, {
      withCredentials: true
    });
  }
}
