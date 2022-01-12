import { LitElement, TemplateResult, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';

import { styles } from './styles';

@customElement('rb-item-picker')
export class ItemPicker extends LitElement {
  // Define scoped styles
  static styles = [styles];

  // Declare reactive properties
  @property({ type: Boolean })
  expanded?: boolean = false;

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  get value(): string { return this._value; }
  set value(value: string) {
    this.selectedListItemElement?.classList.remove('selected');

    const index = this.items.findIndex(item => this.listItemToValue(item) === value);
    if (index === -1) {
      this._value = '';
      return;
    }

    const listItem = this.renderRoot.querySelector(`.rb-item-picker-list-item[data-index="${index}"]`) as HTMLAnchorElement;
    if (!listItem) {
      this._value = '';
      return;
    }

    this.selectListItemElement(listItem);
    this._value = value;
  }
  protected _value = '';

  @property({ attribute: false })
  items: any[] = [];

  @property({ attribute: false })
  listItemElementToValue: (element: HTMLAnchorElement) => string = (element: HTMLAnchorElement) => element.dataset.name;

  @property({ attribute: false })
  listItemToValue: (item: any) => string = (item: any) => item;

  @property({ attribute: false })
  listItemRenderer: (item: any, index: number) => TemplateResult<1> = (item: any, index: number) => {
    return html`
      <a class="rb-item-picker-list-item" href="#" data-name="${item}" data-index="${index}">
        ${item}
      </a>
    `;
  };

  protected selectedListItemElement?: HTMLAnchorElement;

  private rootClasses = {
    'expanded': this.expanded
  };

  // Render as a function of component state
  render() {
    return html`
      <input type="hidden" name="${this.name}" value="${this.value}">
      <div id="rb-item-picker" class="${classMap(this.rootClasses)}">
        <h2 id="rb-item-picker-header">
          <button id="rb-item-picker-button" type="button" @click="${this.onButtonClick}" aria-controls="rb-item-picker-collapsible" aria-expanded="${this.expanded}">
            ${this.value}
          </button>
        </h2>
        <div id="rb-item-picker-collapsible" aria-labelledby="rb-item-picker-header">
          <div id="rb-item-picker-body">
            <div id="rb-item-picker-list" @click="${this.onListItemClick}">
              ${this.items.map(this.listItemRenderer)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  protected onButtonClick = (_event: Event) => {
    this.expanded = !this.expanded;
    this.rootClasses['expanded'] = this.expanded;

    this.dispatchEvent(new CustomEvent(this.expanded ? 'expanded' : 'collapsed', {
      detail: { value: this.value }
    }));
  }

  protected onListItemClick = (event: Event) => {
    const target = event.target as HTMLAnchorElement;
    if (!target.matches('.rb-item-picker-list-item')) {
      return;
    }

    this.value = this.listItemElementToValue(target) ?? '';
    this.requestUpdate();

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value }
    }));

    event.preventDefault();
  }

  protected selectListItemElement(listItemElement: HTMLAnchorElement) {
    this.selectedListItemElement?.classList.remove('selected');
    this.selectedListItemElement = listItemElement;
    listItemElement.classList.add('selected');
  }
}
