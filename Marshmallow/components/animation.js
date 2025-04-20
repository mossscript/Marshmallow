/*** animation.js v1 ***/
class Animation extends HTMLElement {
   // private variable 
   #elm;
   #attr;

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {}
      this.#T = new Tools();

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
      return [];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         
      }
   }

   // setter & getter
   
}