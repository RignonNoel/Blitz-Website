import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import GlobalService from './globalService';

interface AuthenticationResponse {
  token: string;
}

@Injectable()
export class AuthenticationService extends GlobalService {

  url_authentication = environment.url_base_api + environment.paths_api.authentication;
  url_reset_password = environment.url_base_api + environment.paths_api.reset_password;

  constructor(public http: HttpClient) {
    super();
  }

  authenticate(login: string, password: string): Observable<AuthenticationResponse> {
    const headers = this.getHeaders();
    return this.http.post<AuthenticationResponse>(
      this.url_authentication,
      {
        username: login,
        password: password
      },
      {headers: headers}
    );
  }

  logout(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(
      this.url_authentication + '/' + localStorage.getItem('token'),
      {headers: headers}
    );
  }

  resetPassword(email: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      this.url_reset_password,
      {
        email: email
      },
      {headers: headers}
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }

  isAdmin() {
    return this.getProfile().is_superuser;
  }

  getProfile() {
    return JSON.parse(localStorage.getItem('userProfile'));
  }
}