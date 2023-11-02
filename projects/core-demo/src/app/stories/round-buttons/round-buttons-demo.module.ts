import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@core/ui/button';
import { HttpClientModule } from '@angular/common/http';
import { SvgIconModule } from '@core';
import { RoundButtonsDemoComponent } from './round-buttons-demo/round-buttons-demo.component';

const routes = [{ path: '', component: RoundButtonsDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoundButtonsDemoRoutingModule {}

@NgModule({
  declarations: [RoundButtonsDemoComponent],
  imports: [CommonModule, ButtonModule, HttpClientModule, SvgIconModule.forRoot(), RoundButtonsDemoRoutingModule],
  exports: [],
})
export class RoundButtonsDemoModule {}
