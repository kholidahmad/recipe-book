import { DropdownDirective } from "./dropdown.directive";
import { PlaceHoderDirective } from "./placeholder/placeholder.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AlertComponent } from "./alert/alert.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceHoderDirective,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceHoderDirective,
    DropdownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
