import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultCssClassDecorator, FocusMonitorDecorator } from '@core/ui/decorators';
import { UniqueIdDecorator } from '@core/ui/decorators/uniqueId.decorator';
import { RadioButtonsComponent } from '../radio-buttons.component';

const DEFAULT_CSS_CLASS = 'my-radio-button';

@DefaultCssClassDecorator(DEFAULT_CSS_CLASS)
@FocusMonitorDecorator()
@UniqueIdDecorator()
@Component({
  selector: 'my-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    },
  ],
})
export class RadioButtonComponent<T> implements ControlValueAccessor{
  @Input()
  id: unknown;

  @Input()
  value!: T;

  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  @Input()
  checked = false;

  @Input()
  name = '';

  @Output()
  checkedChange = new EventEmitter<T>();

  private onTouchedFn = () => {};
  private onChangeFn: (d: T) => void = () => {};

  constructor(
    private cd: ChangeDetectorRef,
    @Optional()
    private radioButtons: RadioButtonsComponent | null,
    public focusMonitor: FocusMonitor,
    public elementRef: ElementRef
  ) {}

  get computedName(): string {
    return this.name || this.radioButtons?.name || '';
  }

  writeValue(value: any) {
    this.checked = value === this.value;

    this.cd.markForCheck();
  }

  registerOnChange(fn: () => void) {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onChange(e: Event) {
    this.checked = (e.target as HTMLInputElement).checked;
    e.stopPropagation();
    if (!this.checked) {
       return;
    }
    this.checkedChange.emit(this.value);
    this.onChangeFn(this.value);
    this.onTouchedFn();
  }
}
