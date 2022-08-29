import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthContants } from '../constants/auth.constants';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`;
  private expirationTimer: any = null;
  public userSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.loginUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(() =>
            this.handleAuthenticationError(errorResponse)
          );
        }),
        tap((authResponse: AuthResponse) => {
          this.handleAuthenticationSuccess(authResponse);
        })
      );
  }

  public autoLogin() {
    const storedUser: {
      email: string;
      userId: string;
      _expirationDate: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('loggedInUser')!);
    if (!storedUser) {
      return;
    }
    const user = new User(
      storedUser._expirationDate,
      storedUser.userId,
      storedUser._token,
      new Date(storedUser._expirationDate)
    );
    if (user.token) {
      this.autoLogout(
        new Date(storedUser._expirationDate).getTime() - new Date().getTime()
      );
      this.userSubject.next(user);
    } else {
      this.logout();
    }
  }

  public autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  public logout() {
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }
    localStorage.removeItem('loggedInUser');
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

  private handleAuthenticationError(errorResponse: HttpErrorResponse): string {
    let message = 'Something went wrong !';
    if (!errorResponse.error || !errorResponse.error.error) {
      return message;
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        message = AuthContants.EMAIL_NOT_FOUND;
        break;
      case 'INVALID_PASSWORD':
        message = AuthContants.INVALID_PASSWORD;
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message = AuthContants.TOO_MANY_ATTEMPTS_TRY_LATER;
    }
    return message;
  }

  private handleAuthenticationSuccess(authResponse: AuthResponse): void {
    const expirationDate = new Date(
      new Date().getTime() + +authResponse.expiresIn * 1000
    );
    const user = new User(
      authResponse.email,
      authResponse.localId,
      authResponse.idToken,
      expirationDate
    );
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.autoLogout(+authResponse.expiresIn * 1000);
    this.userSubject.next(user);
  }
}
