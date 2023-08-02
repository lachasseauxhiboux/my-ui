import {Directive, ElementRef, forwardRef, HostListener, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const TEXTAREA_BORDERS_OFFSET = 2;

@Directive({
 selector: 'textarea[myAutoSize]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaAutosizeDirective),
    multi: true
  }]
})
export class TextareaAutosizeDirective implements ControlValueAccessor {
  @Input()
  myAutoSizeMax?: number;

  constructor(private elementRef: ElementRef) {}

  private onChangeFn: (_: any) => void = () => {};

  registerOnChange(fn: any) {
    this.onChangeFn = fn;
  }

  registerOnTouched() {}

  writeValue(value: string) {
    this.elementRef.nativeElement.value = value || '';
    this.updateHeight();
  }

  @HostListener('input')
  onInput() {
    this.onChangeFn(this.elementRef.nativeElement.value);
    this.updateHeight();
  }

  private updateHeight() {
    this.elementRef.nativeElement.style.height = '';
    const newHeight = this.myAutoSizeMax
      ? Math.min(this.myAutoSizeMax, this.elementRef.nativeElement.scrollHeight)
      : this.elementRef.nativeElement.scrollHeight;
    this.elementRef.nativeElement.style.height = `${newHeight + TEXTAREA_BORDERS_OFFSET}px`;
  }
}
