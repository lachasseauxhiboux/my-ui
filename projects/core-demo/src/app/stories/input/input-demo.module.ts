import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SvgIconModule } from '@core';
import { InputModule } from '@core/ui/input/input.module';
import { InputDemoComponent } from './input-demo/input-demo.component';
import { InputFloatingLabelModule } from '@core/ui/input-floating-label';

const routes = [{ path: '', component: InputDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputDemoRoutingModule {}

@NgModule({
  declarations: [InputDemoComponent],
  imports: [
    CommonModule,
    InputModule,
    InputFloatingLabelModule,
    FormsModule,
    HttpClientModule,
    SvgIconModule.forRoot(),
    InputDemoRoutingModule
  ],
})
export class InputDemoModule {}
