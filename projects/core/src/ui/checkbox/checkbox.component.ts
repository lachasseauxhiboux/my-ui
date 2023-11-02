import { FocusMonitor } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultCssClassDecorator, FocusMonitorDecorator } from '../decorators';
import { UniqueIdDecorator } from '../decorators/uniqueId.decorator';

const DEFAULT_CSS_CLASS = 'my-checkbox';

@DefaultCssClassDecorator(DEFAULT_CSS_CLASS)
@FocusMonitorDecorator()
@UniqueIdDecorator()
@Component({
  selector: 'my-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements OnInit {
  @Input()
  id: string = '';

  private _inputId: string = '';

  @Input() set inputId(id: string) {
    this._inputId = id;
  }

  get inputId(): string {
    return this._inputId || `${this.id}_input`;
  }

  @Input()
  checked = false;

  @Input()
  name?: string;

  private _indeterminate = false;

  @Input()
  set indeterminate(value: boolean) {
    this._indeterminate = value;
    if (value) {
      this.checked = false;
    }
  }

  get indeterminate(): boolean {
    return this._indeterminate;
  }

  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  @Output()
  checkedChange = new EventEmitter<boolean>();

  @Input()
  animateOnInit = false;

  private onTouchedFn = () => {};
  private onChangeFn: (_: any) => void = () => {};

  animate = false;

  constructor(
    private cd: ChangeDetectorRef,
    public focusMonitor: FocusMonitor,
    public elementRef: ElementRef,
  ) {}

  ngOnInit() {
    if (this.animateOnInit) {
      this.animate = this.animateOnInit;
    }
  }

  writeValue(value: boolean) {
    this.checked = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onCheckedChange(event: Event) {
    if (this.disabled) {
      return;
    }

    this.animate = true;

    const input = event.target as HTMLInputElement;

    if (this.indeterminate) {
      this.indeterminate = false;
    }

    this.checked = input.checked;

    event.stopPropagation();
    this.checkedChange.emit(this.checked);
    this.onChangeFn(this.checked);
    this.onTouchedFn();
  }
}
