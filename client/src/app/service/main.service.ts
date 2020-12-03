import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.entity';


@Injectable({
  providedIn: 'root'
})
export class MainService {
  private readonly serverURL = environment.serverURL;

  private _users = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead

      // Let the app keep running by returning an empty result.
      // return of(result as T);
      throw (error);
    };
  }


  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(this.serverURL + '/api/users').pipe(
      take(1),
      map(data => {
        const resultList = new Array<User>();
        data.map((userData: User) => {
          resultList.push(new User(
            userData.id,
            userData.name,
            userData.email,
            undefined,
            userData.date,
            userData.other
          ));
        });
        return resultList;
      }),
      tap(fetchedUsers => {
        this._users.next(fetchedUsers);
      }),
      catchError(this.handleError('getListNames', null))
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.serverURL}/api/users/${id}`).pipe(
      map((r: User) => {
        return new User(
          r.id,
          r.name,
          r.email,
          undefined,
          r.date,
          r.other
        );
      }),
      catchError(this.handleError('getTodo', null))
    );
  }


}
