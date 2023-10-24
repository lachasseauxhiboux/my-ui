import { Directive, HostBinding, Input } from "@angular/core";
import { Constructor } from "./models";

type MyColor = 'primary' | 'secondary' | 'filled' | 'call-end' | 'user-defined';

interface Colorable<BaseTypeColor = MyColor> {
  color: BaseTypeColor;
}

type ColorableCtor<BaseTypeColor> = Constructor<Colorable<BaseTypeColor>>;

const DEFAULT_COLOR = 'primary';

export function colorMixinFunction<
BaseTypeCtor extends Constructor,
BaseTypeColor extends string = MyColor
>(
  BaseClass: BaseTypeCtor, defaultColor = DEFAULT_COLOR
): BaseTypeCtor & ColorableCtor<BaseTypeColor> {
  @Directive()
  // eslint-disable-next-line @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix, @angular-eslint/component-selector
  class Mixin extends BaseClass {
    @Input()
    @HostBinding('attr.my-color')
    color: BaseTypeColor = defaultColor as BaseTypeColor;

    constructor(...args: any[]) { super(...args); }
  }
  return Mixin;
}
