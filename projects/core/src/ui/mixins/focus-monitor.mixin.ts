import { OnDestroy, OnInit } from '@angular/core';
import { CanMonitorFocusCtor, FocusMonitorableCtor } from './models/focus-monitor.types';
import { Constructor } from './models/constructor.type';

export function focusMonitorMixin<T extends CanMonitorFocusCtor>(base: T): T & FocusMonitorableCtor {
  class Mixin extends (base as Constructor) implements OnInit, OnDestroy {
    constructor(...args: any[]) { super(...args); }

    ngOnInit() {
      this.focusMonitor.monitor(this.elementRef.nativeElement, true);
    }

    ngOnDestroy() {
      this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
  }

  return Mixin;
}

