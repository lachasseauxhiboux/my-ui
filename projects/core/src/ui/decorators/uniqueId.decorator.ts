import { Input, HostBinding } from '@angular/core';

const MY_ID_PREFIX = 'my-id';
let uniqueIdCounter = Math.random();

export function UniqueIdDecorator(): ClassDecorator {
  return function (constructor: any) {
    const original = constructor.prototype.ngOnInit;

    constructor.prototype.ngOnInit = function (...args: any[]) {
      this.id = `${MY_ID_PREFIX}-${uniqueIdCounter++}`;
      original && typeof original === 'function' && original.apply(this, args);
    };

    Object.defineProperty(constructor.prototype, 'id', {
      get: function () {
        return this._id;
      },
      set: function (id) {
        this._id = id;
      },
      configurable: true,
    });

    HostBinding('attr.id')(constructor.prototype, 'id');
    Input()(constructor.prototype, 'id');
  };
}
