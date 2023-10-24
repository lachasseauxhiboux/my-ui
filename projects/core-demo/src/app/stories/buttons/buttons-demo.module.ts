import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonsDemoComponent } from "./buttons-demo/buttons-demo.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { SvgIconModule } from "@core";

const routes = [{path: '', component: ButtonsDemoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsDemoRoutingModule {}

@NgModule({
  declarations: [
    ButtonsDemoComponent
  ],
  imports: [
    CommonModule,
    // ButtonModule,
    HttpClientModule,
    SvgIconModule.forRoot(),

    ButtonsDemoRoutingModule
  ],
  exports: []
})
export class ButtonsDemoModule {}
