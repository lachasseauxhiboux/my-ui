import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyDemoComponent } from "./typography-demo/typography-demo.component";
import { RouterModule } from "@angular/router";

const routes = [{path: '', component: TypographyDemoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypographyDemoRoutingModule {
}

@NgModule({
  declarations: [
    TypographyDemoComponent
  ],
  imports: [
    CommonModule,

    TypographyDemoRoutingModule
  ]
})
export class TypographyDemoModule {
}
