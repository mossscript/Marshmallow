export class MApp extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
   }
   render() {
      this.shadowRoot.innerHTML = `<slot></slot>`;
   }
}