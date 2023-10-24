import { AfterViewInit, ElementRef } from "@angular/core";
import { Constructor, HasElementRef, focusMonitorMixinFunction } from "../mixins";
import { ButtonBase } from "./button.directive";
import { colorMixinFunction } from "../mixins/color.mixin";
import { sizeMixinFunction } from "../mixins/size.mixin";

export const ButtonMixinBase =
  focusMonitorMixinFunction(
    colorMixinFunction(
      sizeMixinFunction(
        ButtonBase
      )
    )
  );

// The button type attribute must be set on the standard button to ensure proper placement of text and/or icon
// export const StandardButtonMixinBase = buttonTypeMixin(ButtonMixinBase);

function buttonTypeMixin<T extends Constructor<HasElementRef & AfterViewInit>>(base: T): T {
  return class extends base implements AfterViewInit {
    svg?: ElementRef<HTMLSpanElement>;
    text?: ElementRef<HTMLSpanElement>;

    constructor(...args: any[]) {
      super(...args);
    }

    get hasIcon(): boolean {
      return !!this.svg?.nativeElement?.childNodes.length;
    }

    get hasText(): boolean {
      return !!this.text?.nativeElement?.childNodes.length;
    }

    override ngAfterViewInit() {
      this.setButtonType();
    }

    protected setButtonType() {
      let buttonType = '';

      if (this.hasIcon && this.hasText) {
        buttonType = 'icon-with-text';
      } else if (this.hasIcon) {
        buttonType = 'icon';
      } else if (this.hasText) {
        buttonType = 'text';
      }

      if (buttonType) {
        this.elementRef.nativeElement.setAttribute('my-button-type', buttonType);
      }
    }
  };
}
