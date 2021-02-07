import { AuthService } from "./auth/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private authSrvc: AuthService) {}
  ngOnInit() {
    this.authSrvc.autoLogin();
  }
}
