import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonComponent } from "./button.component";
import { IconButtonComponent } from "./icon-button/icon-button.component";
import { ActionButtonComponent } from "./action-button/action-button.component";

@NgModule({
  declarations: [
    ActionButtonComponent,
    ButtonComponent,
    IconButtonComponent
  ],
  imports: [CommonModule],
  exports: [
    ActionButtonComponent,
    ButtonComponent,
    IconButtonComponent
  ]
})
export class ButtonModule {}
