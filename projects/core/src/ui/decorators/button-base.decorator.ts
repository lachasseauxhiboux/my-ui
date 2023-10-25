const BUTTON_VARIANTS = [
  'my-button',
  'my-round-button',
  'my-action-button',
  'my-icon-button'
];

export function ButtonBaseDecorator(): ClassDecorator {
  return function (constructor: any) {
    const originalNgOnInit = constructor.prototype.ngOnInit || function () { };

    constructor.prototype.ngOnInit = function () {
      originalNgOnInit.call(this);
      this.setCSSClass();
    };

    constructor.prototype.hasAttribute = function (attribute: string): boolean {
      return this.elementRef.nativeElement.hasAttribute(attribute);
    };

    constructor.prototype.setCSSClass = function () {
      const buttonAttribute = BUTTON_VARIANTS.find(variant => this.hasAttribute(variant));
      if (buttonAttribute) {
        this.elementRef.nativeElement.classList.add(buttonAttribute);
      }
    };
  }
}

