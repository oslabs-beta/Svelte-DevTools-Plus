import * as data from '../src/pages/Panel/mock-components.json';

interface ComponentData {
  _root: any;
}

class ComponentData {
  constructor() {
    this._root = JSON.parse(JSON.stringify(data));
  }

  get root() {
    return this._root;
  }

  updateComponentWithRequest(request: any) {
    function helper(data: any, request: any) {
      const id = request.componentId;
      if (data.id === id) return data;
      for (let i = 0; i < data.children.length; i++) {
        const child = data.children[i];
        const component: any = helper(child, request);
        if (component) {
          const newState = request.newState;
          for (let i = 0; i < component.detail.ctx.length; i++) {
            const state = component.detail.ctx[i];
            console.log(state);
            console.log(newState);
            if (state.key === Object.keys(newState)[0]) {
              console.log(typeof state);
              state.value = Object.values(newState)[0];
              return;
            }
          }
          return;
        }
      }
      return;
    }
    helper(this._root, request);
  }
}

const componentData = new ComponentData();

export default componentData;
