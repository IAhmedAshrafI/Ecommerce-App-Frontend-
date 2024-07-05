import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/Models/user';
import { ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  _baseURL = environment.baseURl;
  private currentUser = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUser.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this._baseURL + 'Account/get-current-user', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    )
  }

  login(value: any) {
    return this.http.post(this._baseURL + 'Account/Login', value).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    )
  }

  register(value: any) {
    return this.http.post(this._baseURL + 'Account/Register', value).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }

  cehckEmailExist(email: string) {
    return this.http.get(this._baseURL + 'Account/check-email-exist?email=' + email);
  }
}
