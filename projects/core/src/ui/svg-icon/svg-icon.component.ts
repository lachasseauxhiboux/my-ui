import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Input,
  KeyValueChangeRecord,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SvgIconRegistryService } from './svg-icon-registry.service';

@Component({
  selector: 'svg-icon',
  template: '<ng-content></ng-content>',
  styleUrls: ['./svg-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SvgIconComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
  @Input() src?: string | null;
  @Input() name?: string;
  @Input() stretch = false;
  @Input() applyClass = false;
  @Input() svgClass: any;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('class') klass: any;
  @Input() viewBox?: string;

  // Adapted from ngStyle (see:  angular/packages/common/src/directives/ng_style.ts)
  @Input()
  set svgStyle(v: { [key: string]: any } | undefined) {
    this._svgStyle = v;
    if (!this.differ && v) {
      this.differ = this.differs.find(v).create();
    }
  }

  private svg?: SVGElement;
  private icnSub?: Subscription;
  private differ?: KeyValueDiffer<string, string | number>;
  private _svgStyle?: { [key: string]: any };
  private loaded = false;

  constructor(
    public readonly elementRef: ElementRef,
    private differs: KeyValueDiffers,
    private renderer: Renderer2,
    private iconReg: SvgIconRegistryService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.destroy();
  }

  ngOnChanges(changeRecord: SimpleChanges) {
    const elemSvg = this.elementRef.nativeElement.firstChild;

    if (changeRecord.src || changeRecord.name) {
      this.destroy();
      this.init();
    }
    if (changeRecord.stretch) {
      this.stylize();
    }

    if (changeRecord.applyClass) {
      if (this.applyClass) {
        this.setClass(elemSvg, '', this.klass);
      } else {
        this.setClass(elemSvg, this.klass, '');
      }
    }

    if (changeRecord.svgClass) {
      this.setClass(elemSvg, changeRecord.svgClass.previousValue, changeRecord.svgClass.currentValue);
    }

    if (changeRecord.klass) {
      const elem = this.elementRef.nativeElement;
      this.setClass(elem, changeRecord.klass.previousValue, changeRecord.klass.currentValue);

      if (this.applyClass) {
        this.setClass(elemSvg, changeRecord.klass.previousValue, changeRecord.klass.currentValue);
      } else {
        this.setClass(elemSvg, changeRecord.klass.previousValue, '');
      }
    }

    if (changeRecord.viewBox) {
      if (this.loaded) {
        this.destroy();
      }
      this.init();
    }
  }

  ngDoCheck() {
    if (this.svg && this.differ && this._svgStyle) {
      const changes = this.differ.diff(this._svgStyle);
      if (changes) {
        this.applyChanges(changes);
      }
    }
  }

  private init() {
    if (this.name) {
      const targetName = this.name;
      this.icnSub = this.iconReg
        .getSvgByName(this.name)
        ?.pipe(filter(() => targetName === this.name))
        .subscribe(this.initSvg.bind(this));
    } else if (this.src) {
      const targetSrc = this.src;
      this.icnSub = this.iconReg
        .loadSvg(this.src)
        ?.pipe(filter(() => targetSrc === this.src))
        .subscribe(this.initSvg.bind(this));
    } else {
      const elem = this.elementRef.nativeElement;
      elem.innerHTML = '';
      this.cd.markForCheck();
    }
  }

  private initSvg(svg: SVGElement | undefined): void {
    if (!svg) {
      return;
    }

    if (!this.loaded) {
      this.setSvg(svg);
      this.resetDiffer();
    }
  }

  private destroy() {
    this.svg = undefined;
    this.differ = undefined;
    this.loaded = false;
    this.icnSub?.unsubscribe();
    this.icnSub = undefined;
  }

  private resetDiffer() {
    if (this._svgStyle && !this.differ) {
      this.differ = this.differs.find(this._svgStyle).create();
    }
  }

  private setSvg(svg: SVGElement) {
    if (!this.loaded && svg) {
      this.svg = svg;
      const icon = svg.cloneNode(true) as SVGElement;
      const elem = this.elementRef.nativeElement;

      elem.innerHTML = '';
      this.renderer.appendChild(elem, icon);
      this.loaded = true;

      this.copyNgContentAttribute(elem, icon);

      if (this.klass && this.applyClass) {
        this.setClass(elem.firstChild, '', this.klass);
      }

      if (this.svgClass) {
        this.setClass(elem.firstChild, '', this.svgClass);
      }

      if (this.viewBox) {
        if (this.viewBox === 'auto') {
          // Attempt to convert height & width to a viewBox.
          const w = icon.getAttribute('width');
          const h = icon.getAttribute('height');
          if (h && w) {
            const vb = `0 0 ${w} ${h}`;
            this.renderer.setAttribute(icon, 'viewBox', vb);
            this.renderer.removeAttribute(icon, 'width');
            this.renderer.removeAttribute(icon, 'height');
          }
        } else if (this.viewBox !== '') {
          this.renderer.setAttribute(icon, 'viewBox', this.viewBox);
          this.renderer.removeAttribute(icon, 'width');
          this.renderer.removeAttribute(icon, 'height');
        }
      }

      this.stylize();

      this.cd.markForCheck();
    }
  }

  private copyNgContentAttribute(hostElem: any, icon: SVGElement) {
    const attributes = hostElem.attributes as NamedNodeMap;
    const len = attributes.length;
    for (let i = 0; i < len; i += 1) {
      const attribute = attributes.item(i);
      if (attribute?.name.startsWith('_ngcontent')) {
        this.setNgContentAttribute(icon, attribute.name);
        break;
      }
    }
  }

  private setNgContentAttribute(parent: Node, attributeName: string) {
    this.renderer.setAttribute(parent, attributeName, '');
    const len = parent.childNodes.length;
    for (let i = 0; i < len; i += 1) {
      const child = parent.childNodes[i];
      if (child instanceof Element) {
        this.setNgContentAttribute(child, attributeName);
      }
    }
  }

  private stylize() {
    if (this.svg) {
      const svg = this.elementRef.nativeElement.firstChild;

      if (this.stretch === true) {
        this.renderer.setAttribute(svg, 'preserveAspectRatio', 'none');
      } else if (this.stretch === false) {
        this.renderer.removeAttribute(svg, 'preserveAspectRatio');
      }
    }
  }

  private applyChanges(changes: KeyValueChanges<string, string | number>) {
    changes.forEachRemovedItem((record: KeyValueChangeRecord<string, string | number>) =>
      this.setStyle(record.key, null),
    );
    changes.forEachAddedItem((record: KeyValueChangeRecord<string, string | number>) =>
      this.setStyle(record.key, record.currentValue),
    );
    changes.forEachChangedItem((record: KeyValueChangeRecord<string, string | number>) =>
      this.setStyle(record.key, record.currentValue),
    );
  }

  private setStyle(nameAndUnit: string, value: string | number | null | undefined) {
    const [name, unit] = nameAndUnit.split('.');
    value = value !== null && unit ? `${value}${unit}` : value;
    const svg = this.elementRef.nativeElement.firstChild;

    if (value !== null) {
      this.renderer.setStyle(svg, name, value as string);
    } else {
      this.renderer.removeStyle(svg, name);
    }
  }

  private setClass(target: HTMLElement | SVGSVGElement, previous: string | string[], current: string | string[]) {
    if (target) {
      if (previous) {
        const klasses = Array.isArray(previous) ? previous : previous.split(' ');
        for (const k of klasses) {
          this.renderer.removeClass(target, k);
        }
      }
      if (current) {
        const klasses = Array.isArray(current) ? current : current.split(' ');
        for (const k of klasses) {
          this.renderer.addClass(target, k);
        }
      }
    }
  }
}
