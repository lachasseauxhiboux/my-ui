export function DefaultCssClassDecorator(defaultClass: string): ClassDecorator {
  return function (target: any) {
    // Override constructor to add default CSS class
    const originalConstructor = target.prototype.constructor;

    target.prototype.constructor = function (...args: any[]) {
      originalConstructor.apply(this, args);
      this.elementRef.nativeElement.classList.add(defaultClass);
    };
  };
}
