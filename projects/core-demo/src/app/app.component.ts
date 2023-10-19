import { Component, ViewEncapsulation } from '@angular/core';
import { Section, sections } from './sections';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme, ThemeService } from '@core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  readonly SECTIONS = sections;

  readonly showFooter = true;

  activeSection = sections[0];

  readonly THEME = Theme;

  selectedTheme = Theme.DARK;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.setTheme(Theme.DARK);
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  ngOnInit() {
    this.setActiveSection(this.activeSection);
  }

  isSectionActive(section: Section): boolean {
    return this.activeSection === section;
  }

  setActiveSection(section: Section) {
    this.activeSection = section;
    this.router.navigate([section.url]);
  }
}
