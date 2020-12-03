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
  private activeLogoutTimer: any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginUser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    const serverURL = environment.serverURL + environment.authSubPath + '/login';
    return this.http.post<any>(serverURL, { email, password })
      .pipe(map(result => {
        this.saveCurrentUserData(result);
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


        this.saveCurrentUserData(resData);

      }, catchError(err => err)));
  }

  private autoLogout(futureTime: number) {
    const duration = futureTime - ((new Date()).getTime() / 1000);
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  private saveCurrentUserData(result: any): void {
    // login successful if there is a jwt token in the response
    if (result && result.user && result.token) {
      const date = result.user.date ? new Date(result.user.date) : new Date();
      const userObj = new LoginUser(
        result.user.id,
        result.user.name,
        result.user.email,
        result.token,
        result.exp,
        date
      );
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(userObj));
      this.autoLogout(userObj.tokenExpDate);
      this.currentUserSubject.next(userObj);
    } else {
      throw result;
    }
  }
}
