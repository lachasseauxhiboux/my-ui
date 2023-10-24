import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { FocusMonitor } from "@angular/cdk/a11y";
import { ButtonAlign } from "./button.types";

@Component({
  selector: 'button[my-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  inputs: ['size', 'color']
})
export class ButtonComponent {
  @Input()
  @HostBinding('attr.my-align')
  align: ButtonAlign = 'center';

  @Input()
  applyColorForIcon = false;

  @ViewChild('svg', {static: false}) svg?: ElementRef<HTMLSpanElement>;
  @ViewChild('text', {static: false}) text?: ElementRef<HTMLSpanElement>;

  constructor(
    elementRef: ElementRef,
    focusMonitor: FocusMonitor
  ) {
    super(elementRef, focusMonitor);
  }
}

