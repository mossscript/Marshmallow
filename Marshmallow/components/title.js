/*** title.js v1 ***/
class Title extends HTMLElement {
   // private variable 
   #elm;
   #attr;
   #T

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {
         color: 'currentColor',
         align: 'auto',
         wight: 700,
         size: '28px'
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
      return ['color', 'align'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            if (this.#T.test(newValue)) {
               let color = this.#T.color(newValue);
               this.#attr.color = color;
               this.style.setProperty('--color', color);
            }
            break;
         case 'align':
            if (/^(right|center|left|auto)$/i.test(newValue)) {
               let align = newValue.replace(/\s+/g, '').toLowerCase();
               this.#attr.align = align;
               this.style.setProperty('--align', align);
            }
            break;
         case 'wight':
            if(!isNaN(parseFloat(newValue))){
               let wight = parseFloat(newValue);
               this.#attr.wight = wight;
               this.style.setProperty('--wight', wight);
            }
            break;
         case 'size':
            if(!isNaN(parseFloat(newValue))){
               let size = parseFloat(newValue);
               this.#attr.size = size;
               this.style.setProperty('--size', size);
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

   set align(val) {
      this.setAttribute('align', val)
   }
   get align() {
      return this.#attr.align
   }
   
   set weight(val) {
      this.setAttribute('weight', val)
   }
   get weight() {
      return this.#attr.weight
   }
   
   set size(val) {
      this.setAttribute('size', val)
   }
   get size() {
      return this.#attr.size
   }
}