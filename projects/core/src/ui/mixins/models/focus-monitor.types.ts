import { FocusMonitor } from "@angular/cdk/a11y";
import { OnDestroy, OnInit } from "@angular/core";
import { HasElementRef } from "./has-element-ref.interface";
import { Constructor } from "./constructor.type";

export interface CanMonitorFocus extends HasElementRef {
  focusMonitor: FocusMonitor;
}

/** Starts monitoring on init and stops on destroy */
export interface FocusMonitorable extends CanMonitorFocus, OnInit, OnDestroy {}

export type FocusMonitorableCtor = Constructor<FocusMonitorable>;
export type CanMonitorFocusCtor = Constructor<CanMonitorFocus>;

