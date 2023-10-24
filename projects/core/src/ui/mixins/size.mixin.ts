import { MySize } from "@core";
import { Constructor } from "./models";
import { Directive, HostBinding, Input } from "@angular/core";

interface Resizable<BaseType = MySize> {
  size: BaseType;
}

type ResizableCtor<BaseTypeSize> = Constructor<Resizable<BaseTypeSize>>;

const DEFAULT_SIZE = 'm';

export function sizeMixinFunction<
BaseTypeCtor extends Constructor,
BaseTypeSize extends string = MySize
>(
  base: BaseTypeCtor, defaultSize = DEFAULT_SIZE
): BaseTypeCtor & ResizableCtor<BaseTypeSize> {
  @Directive()
  // eslint-disable-next-line @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix,  @angular-eslint/component-selector
  class Mixin extends base {
    @Input()
    @HostBinding('attr.my-size')
    size: BaseTypeSize = defaultSize as BaseTypeSize;

    constructor(...args: any[]) { super(...args); }
  }

  return Mixin;
}
