import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@core/ui/button';
import { HttpClientModule } from '@angular/common/http';
import { SvgIconModule } from '@core';
import { IconButtonsDemoComponent } from './icon-buttons-demo/icon-buttons-demo.component';

const routes = [{ path: '', component: IconButtonsDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IconButtonsDemoRoutingModule {}

@NgModule({
  declarations: [IconButtonsDemoComponent],
  imports: [CommonModule, ButtonModule, HttpClientModule, SvgIconModule.forRoot(), IconButtonsDemoRoutingModule],
  exports: [],
})
export class IconButtonsDemoModule {}
