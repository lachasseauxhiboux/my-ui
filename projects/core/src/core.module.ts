import { ModuleWithProviders, NgModule } from '@angular/core';
import { InputModule } from './ui/input';
import { SvgIconModule } from './ui/svg-icon';
import { HttpClientModule } from '@angular/common/http';

const modules = [
  HttpClientModule,
  InputModule,
  SvgIconModule
]

export interface CoreConfig {}

@NgModule({
  imports: [ ...modules ],
  exports: [ ...modules ]
})
export class CoreModule {
 static forRoot(config: CoreConfig): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: []
    }
 }
}

