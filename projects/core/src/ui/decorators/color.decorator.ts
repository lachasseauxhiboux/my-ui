import { HostBinding, Input } from "@angular/core";

type MyColor = 'primary' | 'secondary' | 'filled' | 'user-defined';

const DEFAULT_COLOR = 'primary';

export function ColorDecorator(defaultColor: MyColor = DEFAULT_COLOR): ClassDecorator {
  return function (constructor: any) {
    const originalOnInit = constructor.prototype.ngOnInit || function () { };

    constructor.prototype.ngOnInit = function () {
      originalOnInit.call(this);
      if (!this.color) {
        this.color = defaultColor;
      }
      if (this.elementRef && this.renderer) {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'my-color', this.color);
      }
    };

    Object.defineProperty(constructor.prototype, 'color', {
      get() { return this._color; },
      set(value: MyColor) { this._color = value; },
      enumerable: true,
      configurable: true
    });

    Input()(constructor.prototype, 'color');
    HostBinding('attr.my-color')(constructor.prototype, 'color');
  }
}

