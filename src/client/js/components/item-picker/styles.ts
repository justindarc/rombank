import { css } from 'lit';

export const styles = css`
*, ::after, ::before {
  box-sizing: border-box;
}

#rb-item-picker {
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
}

#rb-item-picker-button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.25rem;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
  border: 0;
  border-radius: calc(.25rem - 1px);
  overflow-anchor: none;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, border-radius .15s ease;
}

#rb-item-picker-button:not(:disabled) {
  cursor: pointer;
}

#rb-item-picker.expanded #rb-item-picker-button {
  color: #0c63e4;
  background-color: #e7f1ff;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,.125);
}

#rb-item-picker.expanded #rb-item-picker-button::after {
  transform: rotate(-180deg);
}

#rb-item-picker-button::after {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;
  content: "";
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230c63e4'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 1.25rem;
  transition: transform .2s ease-in-out;
}

#rb-item-picker-button:hover {
  z-index: 2;
}

#rb-item-picker-button:focus,
#rb-item-picker.expanded #rb-item-picker-button:focus {
  z-index: 3;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 .25rem rgba(13,110,253,.25);
}

#rb-item-picker-header {
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 500;
  line-height: 1.2;
}

#rb-item-picker:not(.expanded) #rb-item-picker-collapsible {
  display: none;
}

#rb-item-picker-body {
  max-height: 10.25rem;
  overflow: auto;
}

#rb-item-picker-list {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin: 0;
}

.rb-item-picker-list-item {
  cursor: pointer;
  position: relative;
  display: block;
  padding: .25rem 1rem;
  color: #212529;
  text-decoration: none;
  background-color: #fff;
  border-bottom: 1px solid rgba(0,0,0,.125);
}

.rb-item-picker-list-item:last-child {
  border-bottom-width: 0;
}

.rb-item-picker-list-item:focus,
.rb-item-picker-list-item:hover {
  z-index: 1;
  color: #495057;
  text-decoration: none;
  background-color: #f8f9fa;
}

.rb-item-picker-list-item.selected {
  z-index: 2;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
`;
