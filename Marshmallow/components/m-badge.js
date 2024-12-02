/*** m-badge.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-badge> 
export default class MBadge extends HTMLElement {
   #shadow;
   #background;
   #color;
   #tc;
   #size;
   constructor() {
      super();
      this.#shadow = this.attachShadow({ mode: 'open' });
      this.#tc = new TestColor();
      this.#background = 'var(--m-primary)';
      this.#color = 'var(--m-on-primary)';
      this.#size = 'medium';
   }
   static get observedAttributes() {
      return ['color', 'size'];
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
         case 'size':
            this.#size = newValue;
            break;

      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   set size(x) { this.setAttribute('size', x) }
   get size() { return this.getAttribute('size') }
   #render() {
      let [w, fs, sw] = [24, 14, 16];
      switch (this.#size.toLocaleLowerCase()) {
         case 'small':
            w = 20;
            sw = 12;
            fs = 10;
            break;
         case 'medium':
            w = 24;
            sw = 16;
            fs = 14;
            break;
         case 'large':
            w = 28;
            sw = 20;
            fs = 18;
            break;
      }
      this.#shadow.innerHTML = `
         <style>
            :host{
               display: inline-flex;
               flex-flow: row nowrap;
               justify-content: center;
               align-items: center;
               font-size: ${fs}px;
               font-weight: 600;
               user-select: none;
               min-width: ${w}px;
               height: ${w}px;
               padding: 4px;
               line-height: 0;
               background: var(--m-badge-background,${this.#background});
               color: var(--m-badge-color,${this.#color});
               border-radius: calc(var(--m-radius) + 8px);
               vertical-align: middle;
               box-sizing: border-box;
            }
            ::slotted(m-symbol){
               width: ${sw}px;
            }
         </style>
         <slot></slot>
      `;
   }
}