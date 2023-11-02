import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { LinkButtonComponent } from './link-button/link-button.component';
import { StandardButtonComponent } from './standard-button/standard-button.component';
import { RoundButtonComponent } from './round-button/round-button.component';

@NgModule({
  declarations: [
    ActionButtonComponent,
    IconButtonComponent,
    LinkButtonComponent,
    RoundButtonComponent,
    StandardButtonComponent,
  ],
  imports: [CommonModule],
  exports: [
    ActionButtonComponent,
    IconButtonComponent,
    LinkButtonComponent,
    RoundButtonComponent,
    StandardButtonComponent,
  ],
})
export class ButtonModule {}
