import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { styles } from './styles';

@customElement('rb-route')
export class Route extends LitElement {
  // Define scoped styles
  static styles = [styles];

  // Declare reactive properties
  @property({ type: String })
  path: string;

  matchesPath(path: string): boolean {
    const patternParts = this.path.split('/');
    const pathParts = path.split('/');

    for (let i = 0, length = patternParts.length; i < length; i++) {
      const patternPart = patternParts[i];
      const pathPart = pathParts[i];

      if (patternPart !== pathPart && !patternPart.startsWith(':')) {
        return false;
      }
    }

    return true;
  }

  // Render as a function of component state
  render() {
    return html`
      <div id="rb-route">
        <slot></slot>
      </div>
    `;
  }
}
