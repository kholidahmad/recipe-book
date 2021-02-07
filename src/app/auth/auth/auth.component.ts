import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./../auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  isError: string = null;

  constructor(private authSrvc: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit_FormAuth(form: NgForm) {
    if (!form.value) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    // dibuat authObservbl agar DRY= Dont Repeat Yourself
    let authObservbl: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservbl = this.authSrvc.login(email, password);
    } else {
      authObservbl = this.authSrvc.singUp(email, password);
    }

    authObservbl.subscribe(
      (resp) => {
        console.log(resp);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      (peasanError) => {
        console.log(peasanError);
        this.isError = peasanError;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
