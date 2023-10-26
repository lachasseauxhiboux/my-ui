import { ChangeDetectionStrategy, Component, HostListener, ViewEncapsulation } from "@angular/core";

import { ButtonComponent } from "../button.component";

@Component({
  selector: 'button[my-action-button]',
  templateUrl: './action-button.component.html',
  styleUrls: ['../button.component.scss', './action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ActionButtonComponent extends ButtonComponent {

  isToggled = false;

  @HostListener('click')
  onClick() {
    this.isToggled = !this.isToggled;
    this.elementRef.nativeElement.classList.toggle('active');
  }
}

