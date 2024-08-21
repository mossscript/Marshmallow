export class MAppbar extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
   }
   render() {
      this.shadowRoot.innerHTML = `
      <div part="inner">
         <slot></slot>
      </div>
      `;
   }
}