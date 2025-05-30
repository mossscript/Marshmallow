/*** app.js v1 ***/
class App extends HTMLElement {
   // private variable 
   #elm;
   #attr;
   #T;

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {
         color: 'var(--m-background)',
         innerColor: 'var(--m-on-background)',
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
      return ['color', 'inner-color'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            if (this.#T.test(newValue)) {
               let color = this.#T.color(newValue);
               this.#attr.color = color;
               this.style.setProperty('--color', color);
               if (!this.hasAttribute('inner-color')) {
                  let innerColor = this.#T.innerColor(newValue);
                  this.#attr.innerColor = innerColor;
                  this.style.setProperty('--inner-color', innerColor);
               }
            }
            break;
         case 'inner-color':
            if (this.#T.test(newValue)) {
               let innerColor = this.#T.innerColor(newValue);
               this.#attr.innerColor = innerColor;
               this.style.setProperty('--inner-color', innerColor);
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

   set innerColor(val) {
      this.setAttribute('inner-color', val)
   }
   get innerColor() {
      return this.#attr.innerColor
   }
}