import {NgModule} from '@angular/core';
import {InputDirective} from './input.directive';
import {TextareaAutosizeDirective} from './textarea-autosize.directive';

@NgModule({
  declarations: [
    InputDirective,
    TextareaAutosizeDirective
  ],
  exports: [
    InputDirective,
    TextareaAutosizeDirective
  ]
})
export class InputModule {}
