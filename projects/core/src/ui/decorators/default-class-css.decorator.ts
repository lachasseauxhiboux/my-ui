export function DefaultCssClassDecorator(defaultClass: string): ClassDecorator {
  return function (constructor: any) {
    const originalOnInit = constructor.prototype.ngOnInit || function () { };

    constructor.prototype.ngOnInit = function () {
      originalOnInit.call(this);
      if (this.elementRef && this.elementRef.nativeElement) {
        this.elementRef.nativeElement.classList.add(defaultClass);
      }
    };
  };
}

