import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@core/ui/button';
import { HttpClientModule } from '@angular/common/http';
import { SvgIconModule } from '@core';
import { LinkButtonsDemoComponent } from './link-buttons-demo/link-buttons-demo.component';

const routes = [{ path: '', component: LinkButtonsDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkButtonsDemoRoutingModule {}

@NgModule({
  declarations: [LinkButtonsDemoComponent],
  imports: [CommonModule, ButtonModule, HttpClientModule, SvgIconModule.forRoot(), LinkButtonsDemoRoutingModule],
  exports: [],
})
export class LinkButtonsDemoModule {}
