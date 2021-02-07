import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

// Guard berfungsi untuk mengecek setiap akan mengakses router
// setelah itu daftarkan guard di app-routing.module
export class AuthGuard implements CanActivate {
  constructor(private authSrvc: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSrvc.user.pipe(
      // take berfungsi untuk mengambil data terakhir dari user, setelah itu unsubscribe
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(["/auth"]);
      })
    );
  }
}
