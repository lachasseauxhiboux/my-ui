export function ButtonTypeDecorator(): ClassDecorator {
  return function (constructor: any) {
    const originalNgAfterViewInit = constructor.prototype.ngAfterViewInit || function () {};

    constructor.prototype.ngAfterViewInit = function () {
      originalNgAfterViewInit.call(this);
      this.setButtonType();
    };

    constructor.prototype.setButtonType = function () {
      let buttonType = '';

      if (this.hasIcon() && this.hasText()) {
        buttonType = 'icon-with-text';
      } else if (this.hasIcon()) {
        buttonType = 'icon';
      } else if (this.hasText()) {
        buttonType = 'text';
      }

      if (buttonType) {
        this.elementRef.nativeElement.setAttribute('my-button-type', buttonType);
      }
    };

    constructor.prototype.hasIcon = function () {
      return !!this.svg?.nativeElement?.childNodes.length;
    };

    constructor.prototype.hasText = function () {
      return !!this.text?.nativeElement?.childNodes.length;
    };
  };
}
