import { NgModule } from "@angular/core";
import { RadioButtonsDemoComponent } from "./radio-buttons-demo/radio-buttons-demo.component";
import { RouterModule } from "@angular/router";
import { RadioButtonsModule } from "@core/ui/radio-buttons";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

const routes = [{path: '', component: RadioButtonsDemoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioButtonsDemoRoutingModule {
}

@NgModule({
  imports: [
    RadioButtonsModule,
    CommonModule,
    FormsModule,

    RadioButtonsDemoRoutingModule
  ],
  declarations: [RadioButtonsDemoComponent]
})
export class RadioButtonsDemoModule {
}
