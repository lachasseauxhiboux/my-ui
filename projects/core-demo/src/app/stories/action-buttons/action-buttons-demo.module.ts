import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ActionButtonsDemoComponent } from "./action-buttons-demo/action-buttons-demo.component";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "@core/ui/button";
import { HttpClientModule } from "@angular/common/http";
import { SvgIconModule } from "@core";

const routes = [{path: '', component: ActionButtonsDemoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionButtonsDemoRoutingModule {}

@NgModule({
  declarations: [
    ActionButtonsDemoComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    HttpClientModule,
    SvgIconModule.forRoot(),

    ActionButtonsDemoRoutingModule
  ],
  exports: []
})
export class ActionButtonsDemoModule {}
