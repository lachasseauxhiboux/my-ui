import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import {
  ButtonTypeDecorator,
  ColorDecorator,
  DefaultCssClassDecorator,
  FocusMonitorDecorator,
  SizeDecorator,
} from '@core/ui/decorators';

const DEFAULT_CSS_CLASS = 'my-round-button';

@DefaultCssClassDecorator(DEFAULT_CSS_CLASS)
@ButtonTypeDecorator()
@ColorDecorator()
@FocusMonitorDecorator()
@SizeDecorator()
@Component({
  selector: 'button[my-round-button]',
  template: `
    <span class="my-button_icon">
      <ng-content></ng-content>
    </span>
  `,
  styleUrls: ['./round-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  inputs: ['size', 'color'],
})
export class RoundButtonComponent {
  @Input() size: unknown;
  @Input() color: unknown;

  constructor(
    public focusMonitor: FocusMonitor,
    public elementRef: ElementRef,
    public renderer: Renderer2,
  ) {
    this.focusMonitor = focusMonitor;
    this.elementRef = elementRef;
    this.renderer = renderer;
  }
}
