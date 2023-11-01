import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CheckboxDemoComponent } from "./checkbox-demo/checkbox.component";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "@core/ui/checkbox";

const routes = [{path: '', component: CheckboxDemoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckboxDemoRoutingModule {
}

@NgModule({
  declarations: [
    CheckboxDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,

    CheckboxDemoRoutingModule
  ]
})
export class CheckboxDemoModule {
}
