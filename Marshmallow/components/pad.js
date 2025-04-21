/*** pad.js v1 ***/
class Pad extends HTMLElement {
   // private variable 
   #elm;
   #padding;

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#padding = '16px;'

      // template 
      this.#elm.innerHTML = `
         <style>
            [[["STYLE"]]]
         </style>
         <slot></slot>
      `;
   }

   // observed attributes
   static get observedAttributes() {
      return ['padding'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      if (name == 'padding') {
         this.#padding = newValue;
         this.style.setProperty('--padding', newValue);
      }
   }

   // setter & getter
   set padding(val) {
      this.setAttribute('padding', val)
   }
   get padding() {
      return this.#padding
   }
}