import { Subscription } from "rxjs";
import { AuthService } from "./../auth/auth.service";
import { DataStorageService } from "./../shared/data-storage.service";
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubs: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private authSrvc: AuthService
  ) {}

  ngOnInit() {
    this.userSubs = this.authSrvc.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authSrvc.logout();
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
}
