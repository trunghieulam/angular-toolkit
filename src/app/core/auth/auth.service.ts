import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = '';
  public redirectUrl: string;

  constructor(
    private cookie: CookieService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  public isAuthenticated(): boolean {
    let jwtToken: any = this.cookie.get('jwtToken');

    if (jwtToken && jwtToken !== '') {
      try {
        jwtToken = JSON.parse(jwtToken);
      } catch {
        return false;
      }
      this.token = jwtToken.token;

      const current = Math.floor(new Date().getTime() / 1000);

      if (jwtToken.exp < current) {
        this.cookie.set('jwtToken', '');
        return false;
      }

      return true;
    }

    return false;
  }

  login(loginContext: {
    email: string,
    password: string
  }) {
    this.httpClient.post('/auth/login', loginContext).subscribe(
      (response: any) => {
        this.cookie.set('jwtToken', JSON.stringify(response));
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        } else {
          this.router.navigate(['home']);
        }
      }
    )
  }

  logout() {
    this.cookie.set('jwtToken', '');
  }

  getTokenString() {
    return this.token;
  }
}
