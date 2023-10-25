import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonComponent } from "./button.component";

@NgModule({
  declarations: [
    ButtonComponent,
    // ButtonBase
  ],
  imports: [CommonModule],
  exports: [ButtonComponent]
})
export class ButtonModule {}
