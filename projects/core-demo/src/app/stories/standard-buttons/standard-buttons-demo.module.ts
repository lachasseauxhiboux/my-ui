import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SvgIconModule } from '@core';
import { ButtonModule } from '@core/ui/button';
import { StandardButtonsDemoComponent } from './standard-buttons-demo/standard-buttons-demo.component';

const routes = [{ path: '', component: StandardButtonsDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandardButtonsDemoRoutingModule {}

@NgModule({
  declarations: [StandardButtonsDemoComponent],
  imports: [CommonModule, ButtonModule, HttpClientModule, SvgIconModule.forRoot(), StandardButtonsDemoRoutingModule],
  exports: [],
})
export class StandardButtonsDemoModule {}
