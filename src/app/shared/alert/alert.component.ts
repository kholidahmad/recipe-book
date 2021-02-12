import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"],
})
export class AlertComponent implements OnInit {
  @Input() alertMessage: string;
  @Output() tutup = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    Swal.fire({
      icon: "error",
      title: this.alertMessage,
      text: "",
      // footer:
      //   '<button class="btn btn-secondary" (click)="onClose()">close</button>',
    });
  }

  onClose() {
    this.tutup.emit();
  }
}
