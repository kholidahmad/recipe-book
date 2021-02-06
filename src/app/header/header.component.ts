import { DataStorageService } from "./../shared/data-storage.service";
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorage: DataStorageService) {}

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes();
  }
}
