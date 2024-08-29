import { currentSnapshot } from "./store";
import { Component } from '../types';

export function setCurrentSnapshot(rootComponent: Component) {
  currentSnapshot.update(state => {
    return { ...state, rootComponent };
  });
}