import { FocusMonitor } from "@angular/cdk/a11y";
import { Directive, ElementRef } from "@angular/core";
import { BUTTON_VARIANTS } from "./button.types";

@Directive()
export class ButtonBase {
  constructor(
    public elementRef: ElementRef,
    public focusMonitor: FocusMonitor
  ) {
    this.setCSSClass();
  }

  protected hasAttribute(attribute: string): boolean {
    return this.elementRef.nativeElement.hasAttribute(attribute);
  }

  protected setCSSClass() {
    const buttonAttribute = BUTTON_VARIANTS.find(variant => this.hasAttribute(variant));

    this.elementRef.nativeElement.classList.add(buttonAttribute);
  }
}
