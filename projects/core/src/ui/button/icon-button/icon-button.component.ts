import { FocusMonitor } from "@angular/cdk/a11y";
import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from "@angular/core";
import { ButtonBaseDecorator, ButtonTypeDecorator, ColorDecorator, FocusMonitorDecorator, SizeDecorator } from "@core/ui/decorators";

@ButtonBaseDecorator()
@ButtonTypeDecorator()
@ColorDecorator()
@FocusMonitorDecorator()
@SizeDecorator()
@Component({
  selector: 'button[my-icon-button]',
  template: `
    <span class="my-button_icon">
      <ng-content></ng-content>
    </span>
  `,
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  inputs: ['size', 'color']
})
export class IconButtonComponent {
  constructor(
    public focusMonitor: FocusMonitor,
    public elementRef: ElementRef,
    public renderer: Renderer2
  ) {
    this.focusMonitor = focusMonitor;
    this.elementRef = elementRef;
    this.renderer = renderer;
  }
}
