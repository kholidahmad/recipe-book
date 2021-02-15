import { environment } from "./../../environments/environment";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

// interface diexport agar bisa diimport dari luar, yaitu auth.component.ts
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // BehaviorSubject berfungsi agar dapat mengakses ke previous value
  user = new BehaviorSubject<User>(null);
  private tokenExiprationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    // url endpoint dari https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          environment.FirebaseAPI,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((respn) => {
          this.handleAuth(
            respn.email,
            respn.localId,
            respn.idToken,
            +respn.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userDataSession");
    if (this.tokenExiprationTimer) {
      clearTimeout(this.tokenExiprationTimer);
    }
    this.tokenExiprationTimer = null;
  }

  autoLogout(expirationTime: number) {
    console.log(expirationTime);
    this.tokenExiprationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  singUp(email: string, password: string) {
    // lihat dokumentasi di https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          environment.FirebaseAPI,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      ) //tap berfungsi untuk menjalankan suatu kode tanpa mengubah nilai dari response
      .pipe(
        catchError(this.handleError),
        tap((respn) => {
          this.handleAuth(
            respn.email,
            respn.localId,
            respn.idToken,
            +respn.expiresIn
          );
        })
      );
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const waktuKadaluarsa = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, waktuKadaluarsa);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    // data user disimpan di browser
    // bisa dicek di browser > application > local storage
    localStorage.setItem("userDataSession", JSON.stringify(user));
  }

  autoLogin() {
    const userDataSession: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userDataSession"));
    if (!userDataSession) {
      return;
    }

    const loadedUser = new User(
      userDataSession.email,
      userDataSession.id,
      userDataSession._token,
      new Date(userDataSession._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const exipirationDuration =
        new Date(userDataSession._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(exipirationDuration);
    }
  }

  private handleError(errorResp: HttpErrorResponse) {
    let isError = "Terjadi Kesalahan!";
    if (!errorResp || !errorResp.error.error) {
      return throwError(isError);
    }
    switch (errorResp.error.error.message) {
      case "EMAIL_EXISTS":
        isError = "Email sudah terdaftar, coba email yang lain!";
        break;
      case "EMAIL_NOT_FOUND":
        isError = "Email belum terdaftar!";
        break;
      case "INVALID_PASSWORD":
        isError = "Password salah!";
        break;
      case "USER_DISABLED":
        isError = "USER_DISABLED!";
        break;
    }
    return throwError(isError);
  }
}
