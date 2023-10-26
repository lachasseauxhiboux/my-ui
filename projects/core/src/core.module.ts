import { NgModule } from '@angular/core';
import { InputModule } from './ui/input';
import { SvgIconModule } from './ui/svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from './ui/button';

const modules = [
  HttpClientModule,
  ButtonModule,
  InputModule,
  SvgIconModule
]

@NgModule({
  imports: [ ...modules ],
  exports: [ ...modules ]
})
export class CoreModule {
}

