import { OnDestroy, OnInit } from '@angular/core';
import { Constructor } from './models/constructor.type';
import { FocusMonitor } from '@angular/cdk/a11y';
import { HasElementRef } from './models';

interface CanMonitorFocus extends HasElementRef {
  focusMonitor: FocusMonitor;
}

/** Starts monitoring on init and stops on destroy */
interface FocusMonitorable extends CanMonitorFocus, OnInit, OnDestroy {}

export type FocusMonitorableCtor = Constructor<FocusMonitorable>;
export type CanMonitorFocusCtor = Constructor<CanMonitorFocus>;

export function focusMonitorMixinFunction<BaseType extends CanMonitorFocusCtor>(BaseClass: BaseType): BaseType & FocusMonitorableCtor {

  return class extends BaseClass implements OnInit, OnDestroy {
    constructor(...args: any[]) { super(...args); }

    ngOnInit() {
      this.startMonitoring();
    }

    ngOnDestroy() {
      this.stopMonitoring();
    }

    private startMonitoring() {
      this.focusMonitor.monitor(this.elementRef.nativeElement, true);
    }

    private stopMonitoring() {
      this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
  };
}

