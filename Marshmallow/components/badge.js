/*** badge.js v1 ***/
class Badge extends HTMLElement {
   // private variable 
   #elm;
   #attr;
   #T

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {
         color: 'var(--m-primary)',
         innerColor: 'var(--m-on-primary)',
         size: 'medium',
      }
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
      return ['color', 'size'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            if (this.#T.test(newValue)) {
               let color = this.#T.color(newValue);
               this.#attr.color = color;
               this.style.setProperty('--m-badge-color', color);
               if (!this.hasAttribute('inner-color')) {
                  let innerColor = this.#T.innerColor(newValue);
                  this.#attr.innerColor = innerColor;
                  this.style.setProperty('--m-badge-inner-color', innerColor);
               }
            }
            break;
         case 'inner-color':
            if (this.#T.test(newValue)) {
               let innerColor = this.#T.innerColor(newValue);
               this.#attr.innerColor = innerColor;
               this.style.setProperty('--m-badge-inner-color', innerColor);
            }
            break;
         case 'size':
            if (/^(small|medium|large)$/i.test(newValue)) {
               let align = newValue.replace(/\s+/g, '').toLowerCase();
               this.#attr.align = align;
            }
            break;
      }
   }

   // setter & getter
   set color(val) {
      this.setAttribute('color', val)
   }
   get color() {
      return this.#attr.color
   }

   set size(val) {
      this.setAttribute('size', size)
   }
   get size() {
      return this.#attr.size
   }
}