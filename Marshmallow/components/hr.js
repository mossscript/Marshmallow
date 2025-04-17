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
         color: 'var(--m-surface-container-high)',
         size: 2,
         type: 'solid',
      }
      this.#T = new Tools();

      // template 
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
         case 'type':
            if (/^(dashed|dotted|solid)$/i.test(newValue)) {
               let type = newValue.replace(/\s+/g, '').toLowerCase();
               this.#attr.type = type;
               this.style.setProperty('--m-hr-type', type);
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

   set type(val) {
      this.setAttribute('type', val)
   }
   get type() {
      return this.#attr.type
   }

   set size(val) {
      this.setAttribute('size', val)
   }
   get size() {
      return this.#attr.size
   }
}