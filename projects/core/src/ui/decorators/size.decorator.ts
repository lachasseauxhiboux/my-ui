import { MySize } from '@core';
import { HostBinding, Input } from '@angular/core';

export function SizeDecorator(defaultSize: MySize = 'm'): ClassDecorator {
  return function (constructor: any) {
    const originalOnInit = constructor.prototype.ngOnInit || function () {};

    constructor.prototype.ngOnInit = function () {
      originalOnInit.call(this);
      if (!this.size) {
        this.size = defaultSize;
      }
      if (this.elementRef && this.renderer) {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'my-size', this.size);
      }
    };

    Object.defineProperty(constructor.prototype, 'size', {
      get() {
        return this._size;
      },
      set(value: MySize) {
        this._size = value;
      },
      enumerable: true,
      configurable: true,
    });

    Input()(constructor.prototype, 'size');
    HostBinding('attr.my-size')(constructor.prototype, 'size');
  };
}
