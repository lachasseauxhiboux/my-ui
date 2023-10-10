import {Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';

export class NgWithContext<T> {
  constructor(public $implicit: T | null | undefined) {
  }
}

@Directive({
  selector: '[ngWith][ngWithAs]'
})
export class NgWithDirective<T> {

  value: T | null | undefined = null;
  ref?: EmbeddedViewRef<NgWithContext<T>>;

  constructor(
    private template: TemplateRef<NgWithContext<T>>,
    private vcr: ViewContainerRef
  ) {}

  get ngWithAs(): T | null | undefined {
    return this.value;
  }

  @Input()
  set ngWithAs(val: T | null | undefined) {
    this.value = val;
    if (this.ref) {
      this.ref.context.$implicit = val;
    } else {
      this.init();
    }
  }

  private init(): void {
    this.ref = this.vcr.createEmbeddedView(this.template, new NgWithContext<T>(this.value));
  }
}
