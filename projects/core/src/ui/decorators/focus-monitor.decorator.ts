export function FocusMonitorDecorator(): ClassDecorator {
  return function (constructor: any) {
    const originalOnInit = constructor.prototype.ngOnInit || function () {};
    const originalOnDestroy = constructor.prototype.ngOnDestroy || function () {};

    constructor.prototype.ngOnInit = function () {
      originalOnInit.call(this);
      this.startMonitoring();
    };

    constructor.prototype.ngOnDestroy = function () {
      originalOnDestroy.call(this);
      this.stopMonitoring();
    };

    constructor.prototype.startMonitoring = function () {
      this.focusMonitor.monitor(this.elementRef.nativeElement, true);
    };

    constructor.prototype.stopMonitoring = function () {
      this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
  };
}
