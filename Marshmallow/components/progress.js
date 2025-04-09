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
   }

   // connect element
   connectedCallback() {
      this.#elm.innerHTML = `
         <style>
            [[["STYLE"]]]
         </style>
         <div part="progress"></div>
      `;
   }

   // observed attributes
   static get observedAttributes() {
      return ['color'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            if (this.#T.test(newValue)) {
               let color = this.#T.color(newValue);
               this.#attr.color = color;
               this.style.setProperty('--m-progress-color', color);
            }
            break;
         
      }
   }

   // getter & setter 
   get color() {
      return this.#attr.color
   }
   set color(val) {
      this.setAttribute('color', val)
   }
}