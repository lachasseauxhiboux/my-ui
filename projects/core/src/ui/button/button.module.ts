import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonComponent } from "./button.component";
import { ButtonBase } from "./button.directive";

@NgModule({
  declarations: [
    ButtonComponent,
    ButtonBase
  ],
  imports: [CommonModule],
  exports: []
})
export class ButtonModule {}
