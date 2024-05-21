import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {ProductionJob} from "../models/production-job.model";
import {PostModel} from "../models/post.model";


@Injectable({
  providedIn:"root"
})

export class PostService{
  private apiUrl = 'http://localhost:5000';


  constructor(private http: HttpClient) { }


  getAllPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.apiUrl}/posts`).pipe(
      tap(value => value.map(post => new PostModel(post)))
    )
  }

}
