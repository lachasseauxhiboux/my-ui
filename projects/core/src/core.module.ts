import { NgModule } from '@angular/core';
import { InputModule } from './ui/input';
import { SvgIconModule } from './ui/svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from './ui/button';
import { CheckboxModule } from './ui/checkbox';
import { RadioButtonsModule } from './ui/radio';

const modules = [
  HttpClientModule,
  ButtonModule,
  CheckboxModule,
  InputModule,
  RadioButtonsModule,
  SvgIconModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class CoreModule {}
