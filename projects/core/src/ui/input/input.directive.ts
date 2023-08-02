import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Size } from '../../models/size-type';

@Directive({
  selector: 'input[myInput], textarea[myInput]',
  exportAs: 'myInput',
})
export class InputDirective implements OnInit, OnDestroy {
  private static uniqueId = Math.random();

  @Input()
  @HostBinding('attr.my-size')
  size: Size = 'm';

  /** Forces a single space to set appropriate placeholder-shown styles */
  @Input()
  @HostBinding('attr.placeholder')
  placeholder = ' ';

  @Input()
  @HostBinding('attr.autocomplete')
  autocomplete?: string;

  @Input()
  @HostBinding('attr.autofill')
  autofill = 'off';

  @Input()
  @HostBinding('attr.id')
  id?: string;

  @HostBinding('class.my-input')
  readonly enableDefaultCSSClass = true;

  constructor(
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef
  ) {
    InputDirective.uniqueId++;
    this.id = `my-input-id-${InputDirective.uniqueId++}`;
    this.autocomplete = `my-input-id-${InputDirective.uniqueId++}`;
  }

  ngOnInit() {
    this.focusMonitor.monitor(this.elementRef.nativeElement, true);
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
  }
}
