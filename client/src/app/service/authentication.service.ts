import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { LoginUser } from '../models/loginUser.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<LoginUser>;
  public currentUser: Observable<LoginUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginUser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    const serverURL = environment.serverURL + environment.authSubPath + '/login';
    return this.http.post<any>(serverURL, { username: email, password })
      .pipe(map(result => {
        // login successful if there is a jwt token in the response
        if (result && result.user && result.token) {
          const userObj = new LoginUser(
            result.user.id,
            result.user.name,
            result.user.email,
            result.token,
            result.exp,
            new Date(result.user.date)
          );
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(userObj));
          this.currentUserSubject.next(userObj);
        }
        return result;
      }));
  }

  logout(): void {
    // remove user from local storage and logOut
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(email: string, password: string, name: string, other: string) {
    const serverURL = environment.serverURL + environment.authSubPath + '/register';
    return this.http.post<any>(serverURL, { name, email, password, other })
      .pipe(map(resData => {
        // Register successful if there is userID
        if (resData && resData.user.id) {
          this.login(email, password)
            .subscribe(
              data => {
                return data;
              },
              error => {
                throw error;
              });
        } else {
          // Register failed
          throw resData;
        }
      }, catchError(err => err)));
  }
}
