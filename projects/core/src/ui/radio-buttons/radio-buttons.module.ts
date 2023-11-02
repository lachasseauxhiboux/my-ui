import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonsComponent } from './radio-buttons.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RadioButtonsComponent, RadioButtonComponent],
  exports: [RadioButtonsComponent, RadioButtonComponent],
})
export class RadioButtonsModule {}
