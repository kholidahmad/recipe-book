import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appPlaceholder]",
})
export class PlaceHoderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
