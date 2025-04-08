/*** hr.js v1 ***/
class Hr extends HTMLElement {
   // private variable 
   #elm;
   #attr;
   #T;

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {
         color: 'var(--m-primary)',
         size: 2,
         style: 'solid',
      }
      this.#T = new Tools();
   }

   // connect element
   connectedCallback() {
      this.#elm.innerHTML = `
         <style>
            [[["STYLE"]]]
         </style>
      `;
   }

   // observed attributes
   static get observedAttributes() {
      return ['color', 'type', 'size'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            if (this.#T.test(newValue)) {
               let color = this.#T.color(newValue);
               this.#attr.color = color;
               this.style.setProperty('--m-hr-color', color);
            }
            break;
         case 'size':
            if (!isNaN(parseInt(newValue))) {
               let size = parseInt(newValue);
               this.#attr.size = size;
               this.style.setProperty('--m-hr-size', size + 'px');
            }
            break;
         case 'style':
            if (/^(dashed|dotted|solid)$/i.test(newValue)) {
               let style = newValue.toLowerCase();
               this.#attr.style = style;
               this.style.setProperty('--m-hr-style', style);
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
   get style() {
      return this.#attr.style
   }
   set style(val) {
      this.setAttribute('style', val)
   }
   get size() {
      return this.#attr.size
   }
   set size(val) {
      this.setAttribute('size', val)
   }
   
}