import { PlaceHoderDirective } from "./../../shared/placeholder/placeholder.directive";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./../auth.service";
import { AlertComponent } from "src/app/shared/alert/alert.component";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  isError: string = null;
  @ViewChild(PlaceHoderDirective) alertHost: PlaceHoderDirective;

  constructor(
    private authSrvc: AuthService,
    private router: Router,
    private componentFactoryResolvr: ComponentFactoryResolver
  ) {}

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

  // showErrorAlert(pesan: string) {
  //   const alertCompFctry = this.componentFactoryResolvr.resolveComponentFactory(
  //     AlertComponent
  //   );
  // }

  onHandleError() {
    console.log("no errorrrr");
    this.isError = null;
  }
}
