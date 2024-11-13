/*** m-badge.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-badge> 
export default class MBadge extends HTMLElement {
   #background;#color;#tc;
   constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
      this.#tc = new TestColor();
      this.#background = 'var(--m-primary)';
      this.#color = 'var(--m-on-primary)';
   }
   static get observedAttributes() {
      return ['color'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            this.#background = newValue;
            if (this.#tc.test(this.#background)) {
               this.#color = this.#tc.inner(this.#background);
               this.#background = this.#tc.bg(this.#background);
            }
            break;
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   #render() {
      this.shadow.innerHTML = `
         <style>
            :host{
               display: inline-flex;
               flex-flow: row nowrap;
               justify-content: center;
               align-items: center;
               font-size: 16px;
               font-weight: 600;
               --m-symbol-wght: 600;
               user-select: none;
               min-width: 24px;
               min-height: 24px;
               padding: 2px;
               line-height: 0;
               background: var(--m-badge-background,${this.#background});
               color: var(--m-badge-color,${this.#color});
               border-radius: calc(var(--m-radius) + 4px);
               vertical-align: middle;
               box-sizing: border-box;
            }
         </style>
         <slot></slot>
      `;
   }
}