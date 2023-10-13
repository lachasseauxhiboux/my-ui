import { Component } from '@angular/core';
import { Section, sections } from './sections';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme, ThemeService } from '@core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly SECTIONS = sections;

  activeSection = sections[0];

  readonly THEME = Theme;

  selectedTheme = Theme.LIGHT;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.setTheme(Theme.LIGHT);
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
