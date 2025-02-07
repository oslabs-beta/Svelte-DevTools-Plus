import { highlightedComponent } from './store';
import type { Component } from '../types';

export function setHighlightedComponent(payload: Component) {
  highlightedComponent.set(payload);
}

export function updateHighlightedComponent(payload: Component) {
  highlightedComponent.update((current) => ({
    ...current,
    detail: payload.detail,
    tagName: payload.tagName,
  }));
}
