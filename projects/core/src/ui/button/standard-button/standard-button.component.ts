import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { ButtonAlign } from "../button.types";
import { ButtonTypeDecorator } from "../../decorators/button-type.decorator";
import { ColorDecorator } from "../../decorators/color.decorator";
import { FocusMonitorDecorator } from "../../decorators/focus-monitor.decorator";
import { SizeDecorator } from "../../decorators/size.decorator";
import { ButtonBaseDecorator } from "../../decorators/button-base.decorator";
import { FocusMonitor } from "@angular/cdk/a11y";

@ButtonBaseDecorator()
@ButtonTypeDecorator()
@ColorDecorator()
@FocusMonitorDecorator()
@SizeDecorator()
@Component({
  selector: 'button[my-button]',
  templateUrl: './standard-button.component.html',
  styleUrls: ['./standard-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  inputs: ['size', 'color']
})
export class StandardButtonComponent {
  @Input()
  @HostBinding('attr.my-align')
  align: ButtonAlign = 'center';

  @Input()
  applyColorForIcon = false;

  @ViewChild('svg', {static: false}) svg?: ElementRef<HTMLSpanElement>;
  @ViewChild('text', {static: false}) text?: ElementRef<HTMLSpanElement>;

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

