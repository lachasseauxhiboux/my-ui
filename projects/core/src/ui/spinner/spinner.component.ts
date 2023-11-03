import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Theme, ThemeService } from '@core';

let spinnerUniqIdIndex = 0;

@Component({
  selector: 'my-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {

  readonly darkColorFrom = '#556979';
  readonly darkColorTo = '#fffffe';

  readonly lightColorFrom = '#a6bfd1';
  readonly lightColorTo = '#556979';

  private get currentTheme(): Theme | undefined {
    return this.themeService.getCurrentTheme(this.elementRef.nativeElement);
  }

  readonly colorFrom = this.currentTheme === Theme.LIGHT ? this.lightColorFrom : this.darkColorFrom;
  readonly colorTo = this.currentTheme === Theme.LIGHT ? this.lightColorTo : this.darkColorTo;

  @Input()
  size = 64;

  spinnerUniqId = `spinner_${++spinnerUniqIdIndex}_`;

  constructor(private elementRef: ElementRef, private themeService: ThemeService) {}

  ngOnInit() {
    const inline = this.elementRef.nativeElement.hasAttribute('inline');
    this.elementRef.nativeElement.classList.add(inline ? 'no-wrapper' : 'wrapper');

    const parentNode = this.elementRef.nativeElement.parentNode;
    if (!parentNode) {
      return;
    }
    parentNode.style.position = 'relative';
  }
}
