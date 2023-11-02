import { FocusMonitor } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {
  ButtonTypeDecorator,
  ColorDecorator,
  DefaultCssClassDecorator,
  FocusMonitorDecorator,
  SizeDecorator,
} from '@core/ui/decorators';

const DEFAULT_CSS_CLASS = 'my-action-button';

@DefaultCssClassDecorator(DEFAULT_CSS_CLASS)
@ButtonTypeDecorator()
@ColorDecorator()
@FocusMonitorDecorator()
@SizeDecorator()
@Component({
  selector: 'button[my-action-button]',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ActionButtonComponent {
  @Input() size: unknown;
  @Input() color: unknown;

  @HostListener('click')
  onClick() {
    this.isToggled = !this.isToggled;
    this.elementRef.nativeElement.classList.toggle('active');
  }

  constructor(
    public focusMonitor: FocusMonitor,
    public elementRef: ElementRef,
    public renderer: Renderer2,
  ) {
    this.focusMonitor = focusMonitor;
    this.elementRef = elementRef;
    this.renderer = renderer;
  }

  isToggled = false;
}
