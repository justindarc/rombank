import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { styles } from './styles';
import { Route } from '../route';
import { pushState } from '../../utils/history';

@customElement('rb-router')
export class Router extends LitElement {
  // Define scoped styles
  static styles = [styles];

  // Declare reactive properties
  @property({ type: Route, attribute: false })
  get currentRoute(): Route | null { return this._currentRoute; }
  set currentRoute(value: Route | null) {
    if (this._currentRoute) {
      this._currentRoute.slot = '';
    }

    this._currentRoute = value;
    if (this._currentRoute) {
      this._currentRoute.slot = 'current';
    }
  }
  protected _currentRoute: Route | null = null;

  private getMatchingRoute(path: string = location.pathname): Route | null {
    const routes: NodeListOf<Route> = this.querySelectorAll('rb-route');
    for (let route of routes) {
      if (!route.matchesPath(path)) {
        continue;
      }

      return route;
    }

    return null;
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('pushstate', this.onPushState);
    this.addEventListener('click', this.onAnchorClick);
    this.addEventListener('submit', this.onFormSubmit);

    const matchingRoute = this.getMatchingRoute();
    if (matchingRoute) {
      this.currentRoute = matchingRoute;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('pushstate', this.onPushState);
    this.removeEventListener('click', this.onAnchorClick);
    this.removeEventListener('submit', this.onFormSubmit);
  }

  // Render as a function of component state
  render() {
    return html`
      <div id="rb-router">
        <slot name="current"></slot>
      </div>
    `;
  }

  protected onPushState = (_event: Event) => {
    const matchingRoute = this.getMatchingRoute();
    if (matchingRoute) {
      this.currentRoute = matchingRoute;
    }
  }

  protected onAnchorClick = (event: Event) => {
    const target = event.target as HTMLAnchorElement;
    if (!target.matches('a')) {
      return;
    }

    event.preventDefault();

    pushState({}, '', target.href);
  }

  protected onFormSubmit = (event: Event) => {
    const target = event.target as HTMLFormElement;
    if (!target.matches('form')) {
      return;
    }

    event.preventDefault();

    // TODO: Handle form submissions
  }
}
