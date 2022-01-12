import { RemoteFile } from '@/interfaces/remotefile.interface';
import { TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ItemPicker } from '../item-picker';
import { styles } from './styles';

@customElement('rb-remote-file-picker')
export class RemoteFilePicker extends ItemPicker {
  // Define scoped styles
  static styles = ItemPicker.styles.concat([styles]);

  constructor() {
    super();

    this.reloadData(this.value || this.root);
  }

  @property({ type: String })
  get value(): string { return super.value; }
  set value(value: string) {
    super.value = value;

    const type = this.selectedListItemElement?.dataset.type;
    if (type !== 'directory') {
      return;
    }

    const path = this.selectedListItemElement?.dataset.path;
    if (!path) {
      return;
    }

    this.reloadData(path);
  }

  @property({ type: String })
  root: string = '/';

  @property({ attribute: false })
  listItemElementToValue: (element: HTMLAnchorElement) => string = (element: HTMLAnchorElement) => element.dataset.path;

  @property({ attribute: false })
  listItemToValue: (item: RemoteFile) => string = (item: RemoteFile) => item.path;

  @property({ attribute: false })
  listItemRenderer: (item: RemoteFile, index: number) => TemplateResult<1> = (item: RemoteFile, index: number) => {
    const icon = item.type === 'directory' ?
      html`<i class="far fa-folder"></i>` :
      html`<i class="far fa-file"></i>`;
    return html`
      <a class="rb-item-picker-list-item" href="#" data-name="${item.name}" data-path="${item.path}" data-type="${item.type}" data-index="${index}">
        ${icon}
        ${item.name}
      </a>
    `;
  };

  protected async reloadData(path: string) {
    try {
      const response = await fetch(`/api/files${path}`);
      const json = await response.json();
      const files = json.data as RemoteFile[];
      if (path !== this.root) {
        files.unshift({
          name: '..',
          path: this.pathUp(path),
          type: 'directory'
        });
      }
      files.unshift({
        name: '.',
        path: path,
        type: 'directory'
      });
      this.items = files;

      const listItem = this.renderRoot.querySelector(`.rb-item-picker-list-item[data-name="."]`) as HTMLAnchorElement;
      if (listItem) {
        this.selectListItemElement(listItem);
        this.selectedListItemElement?.scrollIntoView();
      }
    } catch (error) {
      console.error(error);
    }
  }

  protected pathUp(path: string): string {
    const parts = path.split('/');
    if (parts.length > 2) {
      parts.pop();
      return this.sanitizePath(parts.join('/'));
    }

    return this.sanitizePath('/');
  }

  protected sanitizePath(path: string): string {
    if (!path.startsWith(this.root) || path.length < this.root.length) {
      return this.root;
    }

    return path;
  }
}
