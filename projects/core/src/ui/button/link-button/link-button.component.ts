import { FocusMonitor } from "@angular/cdk/a11y";
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
import { DestroyService } from "@core";
import { ButtonBaseDecorator, FocusMonitorDecorator } from "@core/ui/decorators";
import { filter, fromEvent, takeUntil } from "rxjs";

@ButtonBaseDecorator()
@FocusMonitorDecorator()
@Component({
  selector: 'a[my-link-button]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class LinkButtonComponent implements OnInit {
  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  @HostBinding('attr.tabindex')
  get computedTabIndex(): number {
    return this.disabled ? -1 : 0;
  }

  constructor(
    public elementRef: ElementRef,
    public focusMonitor: FocusMonitor,
    public renderer: Renderer2,
    private destroyService: DestroyService
  ) {
    this.focusMonitor = focusMonitor;
    this.elementRef = elementRef;
    this.renderer = renderer;
  }

  ngOnInit() {
    this.subscribeToParentClick();
  }

  private subscribeToParentClick() {
    const el = this.elementRef.nativeElement;

    fromEvent<Event>(el.parentNode, 'click', { capture: true })
      .pipe(
        filter(() => this.disabled),
        takeUntil(this.destroyService)
      )
      .subscribe((event: Event) => {
        this.preventAndStopEvent(event);
      });
  }

  private preventAndStopEvent(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
 }
