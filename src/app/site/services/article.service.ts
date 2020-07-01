import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface GetArticlesRandomResponse {
  status: string
  data: {
    articles: {
      categories: [Article]
    }
  },
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
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  getRandomArticles() {
    return this.http.get<GetArticlesRandomResponse>(`${environment.url}/articles/random`);
  }
}
