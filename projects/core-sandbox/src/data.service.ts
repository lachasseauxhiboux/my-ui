import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  deletePost(postId: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`).pipe(map(x => x));
  }
}
