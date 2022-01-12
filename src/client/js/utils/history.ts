export function pushState(state: any, title: string, url?: string | URL | null) {
  history.pushState.call(history, state, title, url);
  window.dispatchEvent(new CustomEvent('pushstate', {
    detail: { state, title, url }
  }));
}

export function replaceState(state: any, title: string, url?: string | URL | null) {
  history.replaceState.call(history, state, title, url);
  window.dispatchEvent(new CustomEvent('replacestate', {
    detail: { state, title, url }
  }));
}
