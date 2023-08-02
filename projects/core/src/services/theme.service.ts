import {OverlayRef} from '@angular/cdk/overlay';
import {Injectable, InjectionToken} from '@angular/core';

export const THEME = new InjectionToken('Color theme');

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

const THEME_ATTRIBUTE_NAME = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  getCurrentTheme(elementFrom: HTMLElement): Theme | undefined {
    let currentEl: HTMLElement | null = elementFrom;
    while (currentEl) {
      const themeAttribute = currentEl.getAttribute(THEME_ATTRIBUTE_NAME);
      if (themeAttribute) {
        return themeAttribute as Theme;
      }

      currentEl = currentEl.parentNode as HTMLElement;
    }

    return undefined;
  }

  setTheme(theme: Theme) {
    document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, theme);
  }

  setThemeToElement(element: HTMLElement, theme: Theme) {
    element.setAttribute(THEME_ATTRIBUTE_NAME, theme);
  }

  setThemeToOverlay(overlayRef: OverlayRef, theme: Theme) {
    this.setThemeToElement(overlayRef.overlayElement, theme);

    if (overlayRef.backdropElement) {
      this.setThemeToElement(overlayRef.backdropElement, theme);
    }
  }
}
