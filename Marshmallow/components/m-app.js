/*** m-app.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-app> 
export default class MApp extends HTMLElement {
   #tc;
   constructor() {
      super();
      this.shadow = this.attachShadow({mode:'open'});
      this.#tc = new TestColor();
      this.background = 'var(--m-background)';
      this.color = 'var(--m-on-background)';
   }
   static get observedAttributes() {
      return ['background'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      if (name == 'background') {
         this.background = newValue;
         if (this.#tc.test(this.background)) {
            this.color = this.#tc.inner(this.background);
            this.background = this.#tc.bg(this.background);
         }
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   #render() {
      this.shadow.innerHTML = `
         <style>
            :host {
               display: block;
               position: relative;
               width: 100vw;
               height: 100vh;
               overflow: hidden auto;
               box-sizing: border-box;
               background:${this.background};
               color: ${this.color};
            }
         </style>
         <slot></slot>
      `;
   }
}