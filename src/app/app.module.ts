import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "./shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { CoreModule } from "./core.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  // hanya boleh satu tempat saja untuk declarations component
  declarations: [AppComponent, HeaderComponent],
  // BrowserModule cukup diiport di app.module saja
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
