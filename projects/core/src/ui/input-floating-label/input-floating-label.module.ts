import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputFloatingLabelComponent } from "./input-floating-label.component";
import { FormsModule } from "@angular/forms";
import { SvgIconModule } from "../svg-icon";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SvgIconModule,
  ],
  declarations: [InputFloatingLabelComponent],
  exports: [InputFloatingLabelComponent]
})
export class InputFloatingLabelModule {}
