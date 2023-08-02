require('jest-preset-angular/setup-jest');
require('core-js/proposals/reflect-metadata');

Object.defineProperty(window, 'DragEvent', {
  value: class DragEvent {}
});

Object.defineProperty(window, 'ResizeObserver', {
  value: class ResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
  }
});

Object.defineProperty(window, 'IntersectionObserver', {
  value: class IntersectionObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  }
});

jest.mock('ip-regex', () => ({
  ...jest.requireActual('ip-regex'),
  __esModule: true,
  default: {
    v4: () => '',
    v6: () => '',
  }
}));

jest.mock('date-fns/locale', () => ({
  enUs: {},
  ru: {}
}));

window.HTMLElement.prototype.scrollIntoView = jest.fn()
