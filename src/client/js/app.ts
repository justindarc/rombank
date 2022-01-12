import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';

import { ItemPicker } from './components/item-picker';
import './components/remote-file-picker';
import './components/route';
import './components/router';

@customElement('rb-app')
export class App extends LitElement {

  @query('#item-picker')
  private itemPicker: ItemPicker;

  async firstUpdated() {
    this.itemPicker.items = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg'];
  }

  render() {
    const links = html`
    <div>
      <ul>
        <li><a href="/">Root</a></li>
        <li><a href="/foo">FOO</a></li>
        <li><a href="/bar">BAR</a></li>
        <li><a href="/baz">BAZ</a></li>
        <li><a href="/baz/123">BAZ (123)</a></li>
        <li><a href="/baz/456">BAZ (456)</a></li>
      </ul>
    </div>
    `;

    return html`
    <rb-item-picker id="item-picker"></rb-item-picker>
    <rb-router>
      <rb-route path="/">
        <p>This is the root route</p>
        ${links}
      </rb-route>
      <rb-route path="/foo">
        <p>This is the 'FOO' route</p>
        ${links}
      </rb-route>
      <rb-route path="/bar">
        <p>This is the 'BAR' route</p>
        ${links}
      </rb-route>
      <rb-route path="/baz/:param">
        <p>This is the 'BAZ' route (TODO: figure out how to get the param)</p>
        ${links}
      </rb-route>
    </rb-router>
    `;
  }
}
