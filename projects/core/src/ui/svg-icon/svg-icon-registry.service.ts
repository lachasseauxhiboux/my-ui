import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, InjectionToken, Optional, PLATFORM_ID, SkipSelf } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, share, tap } from 'rxjs/operators';
import { SvgLoader } from './svg-loader';

export const SERVER_URL = new InjectionToken<string>('SERVER_URL');

@Injectable()
export class SvgIconRegistryService {
  private document: Document;
  private iconsByUrl = new Map<string, SVGElement>();
  private iconsLoadingByUrl = new Map<string, Observable<SVGElement>>();

  constructor(
    private loader: SvgLoader,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(SERVER_URL) protected serverUrl: string,
    @Optional() @Inject(DOCUMENT) private _document: any
  ) {
    this.document = this._document;
  }

  /** Add a SVG to the registry by passing a name and the SVG. */
  addSvg(name: string, data: string) {
    if (!this.iconsByUrl.has(name)) {
      const div = this.document.createElement('DIV');
      div.innerHTML = data;
      const svg = div.querySelector('svg') as SVGElement;
      this.iconsByUrl.set(name, svg);
    }
  }

  /** Load a SVG to the registry from a URL. */
  loadSvg(url: string, name: string = url): Observable<SVGElement | undefined> | undefined {
    // not sure if there should be a possibility to use name for server usage
    // so overriding it for now if provided
    // maybe should separate functionality for url and name use-cases
    if (this.serverUrl && url.match(/^(http(s)?):/) === null) {
      url = this.serverUrl + url;
      name = url;
    }

    if (this.iconsByUrl.has(name)) {
      return of(this.iconsByUrl.get(name));
    } else if (this.iconsLoadingByUrl.has(name)) {
      return this.iconsLoadingByUrl.get(name);
    }
    const o = this.loader.getSvg(url).pipe(
      map(svg => {
        const div = this.document.createElement('DIV');
        div.innerHTML = svg;
        return div.querySelector('svg') as SVGElement;
      }),
      tap(svg => this.iconsByUrl.set(name, svg)),
      catchError(err => throwError(err)),
      finalize(() => this.iconsLoadingByUrl.delete(name)),
      share()
    ) as Observable<SVGElement>;

    this.iconsLoadingByUrl.set(name, o);
    return o;
  }

  /** Get loaded SVG from registry by name. (also works by url because of blended map) */
  getSvgByName(name: string): Observable<SVGElement | undefined> | undefined {
    if (this.iconsByUrl.has(name)) {
      return of(this.iconsByUrl.get(name));
    } else if (this.iconsLoadingByUrl.has(name)) {
      return this.iconsLoadingByUrl.get(name);
    }
    return throwError(`No svg with name '${name}' has been loaded`);
  }

  /** Remove a SVG from the registry by URL (or name). */
  unloadSvg(url: string) {
    if (this.iconsByUrl.has(url)) {
      this.iconsByUrl.delete(url);
    }
  }
}

export function SVG_ICON_REGISTRY_PROVIDER_FACTORY(
  parentRegistry: SvgIconRegistryService,
  loader: SvgLoader,
  // eslint-disable-next-line @typescript-eslint/ban-types
  platformId: object,
  serverUrl?: string,
  document?: any
) {
  return parentRegistry || new SvgIconRegistryService(loader, platformId, serverUrl!, document);
}

export const SVG_ICON_REGISTRY_PROVIDER = {
  provide: SvgIconRegistryService,
  deps: [
    [new Optional(), new SkipSelf(), SvgIconRegistryService],
    SvgLoader,
    [PLATFORM_ID as InjectionToken<any>],
    [new Optional(), SERVER_URL as InjectionToken<string>],
    [new Optional(), DOCUMENT as InjectionToken<any>],
  ],
  useFactory: SVG_ICON_REGISTRY_PROVIDER_FACTORY,
};
