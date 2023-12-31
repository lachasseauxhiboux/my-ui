import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgWithDirective } from './ng-with.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgWithDirective],
  exports: [NgWithDirective],
  providers: [],
})
export class NgWithModule {}
