import { Injectable, NgZone } from '@angular/core';
import { throttle } from 'lodash-es';
import { Observable } from 'rxjs';

export interface ResizeInfo {
  predicateValue: boolean;
  clientRect: ClientRect;
}

@Injectable({
  providedIn: 'root',
})
export class ElementSizeService {
  constructor(private ngZone: NgZone) {}

  observe$(
    el: HTMLElement,
    predicate: (clientRect: ClientRect) => boolean = () => true,
    predicateTimeoutMs: number,
    // zonejs does not support ResizeObserver API and does not run cd when it fires
    // that's why we run it in separated zone
    useZone = false,
  ): Observable<ResizeInfo> {
    return new Observable<ResizeInfo>(subscriber => {
      const onObserve = () => subscriber.next(this.checkResize(el, predicate));

      const primaryCallback = throttle(onObserve, predicateTimeoutMs);

      const callback = useZone ? () => this.ngZone.run(primaryCallback) : primaryCallback;

      const resizeObserver = new ResizeObserver(callback);
      resizeObserver.observe(el);
      subscriber.next(this.checkResize(el, predicate));
      return () => resizeObserver.unobserve(el);
    });
  }

  private checkResize(el: HTMLElement, predicate: (clientRect: ClientRect) => boolean): ResizeInfo {
    const clientRect = el.getBoundingClientRect();
    const predicateValue = predicate(clientRect);
    return { predicateValue, clientRect };
  }
}
