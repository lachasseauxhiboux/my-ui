import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DestroyService } from "@core";
import { UniqueIdDecorator } from "../decorators/uniqueId.decorator";
import { FocusMonitor } from "@angular/cdk/a11y";

const INPUT_FLOATING_LABEL_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFloatingLabelComponent),
  multi: true,
};

@UniqueIdDecorator()
@Component({
  selector: 'my-fl-input',
  templateUrl: './input-floating-label.component.html',
  styleUrls: ['./input-floating-label.component.scss'],
  providers: [INPUT_FLOATING_LABEL_CONTROL_VALUE_ACCESSOR, DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InputFloatingLabelComponent implements ControlValueAccessor {
  @Input()
  id: unknown;

  private _value?: string;

  @Input()
  set value(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value!;
  }

  @Input()
  label: string = '';

  @Input()
  placeholder?: string;

  @Input() svgUrl?: string;

constructor(
  private focusMonitor: FocusMonitor,
  private destroy$: DestroyService,
  private elementRef: ElementRef
) {}

  private onChange: (_: string) => void = () => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    if (value !== undefined && value !== null) {
      this.value = value;
    }
  }
  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  updateValue(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
