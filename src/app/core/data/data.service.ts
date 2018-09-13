import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // dev host
  private host: string = '/api/v1/';

  private token: string;
  private headers: HttpHeaders;

  public categories = [];

  constructor(private http: HttpClient) {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.token = userData.token
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token,
        'Accept': 'application/json;q=0.9,*/*;q=0.8'
      });
    }
  }

  login(credentials) {
    const url = this.host + 'auth/login/'
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json;q=0.9,*/*;q=0.8'
    })

    return this.http.post(url, JSON.stringify(credentials), {headers: headers})
  }

  registerUser(credentials) {
    const url = this.host + 'auth/'
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json;q=0.9,*/*;q=0.8'
    })

    return this.http.post(url, JSON.stringify(credentials), {headers: headers})
  }

  setAuthData(token, credentials) {
    this.token = token
    this.headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'JWT ' + this.token,
      'Accept': 'application/json;q=0.9,*/*;q=0.8'
    })
    credentials['token'] = this.token
    localStorage.setItem('userData', JSON.stringify(credentials))
  }

  getCategories() {
    let url = this.host + 'blog/category/'
    return this.http.get(url, {headers: this.headers})
  }

  getPosts(filter, page) {
    let url = this.host + 'blog/post/?page=' + page
    let query_params = []
    for (let key in filter) {
      query_params.push(`${key}=${filter[key]}`)
    }
    if (query_params.length > 0) {
      url += "&" + query_params.join('&')
    }

    return this.http.get(url, {headers: this.headers})
  }

  getPost(slug) {
    const url = this.host + 'blog/post/' + slug + '/'
    return this.http.get(url, {headers: this.headers})
  }

  getComments(slug) {
    let url = this.host + 'blog/comment/?slug=' + slug
    return this.http.get(url, {headers: this.headers})
  }

  postComment(slug, comment) {
    const url = this.host + 'blog/comment/'
    const data = {
      slug: slug,
      text: comment.text
    }
    return this.http.post(url, JSON.stringify(data), {headers: this.headers})
  }

  postRate(slug, rating) {
    const url = this.host + 'blog/rate/'
    const data = {
      slug: slug,
      rate: rating.rate
    }
    return this.http.post(url, JSON.stringify(data), {headers: this.headers})
  }

  publishPost(data) {
    const url = this.host + 'blog/post/'
    return this.http.post(url, JSON.stringify(data), {headers: this.headers})
  }


}
