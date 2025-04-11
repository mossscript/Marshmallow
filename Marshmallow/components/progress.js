/*** progress.js v1 ***/
class Progress extends HTMLElement {
   // private variable 
   #elm;
   #attr;
   #T;
   #progress

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {
         color: 'var(--m-primary)',
         value: 2,
         min: 0,
         max: 100,
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
      this.#progress = this.#elm.querySelector('[part="progress"]');
      this.#progressStyle(this.value);
   }

   // private function
   #clamp(min, max, num) {
      return Math.max(min, Math.min(max, num));
   }
   #percent(min, max, num) {
      return ((Math.max(min, Math.min(max, num)) - min) / (max - min)) * 100;
   }
   #progresst(num) {

   }
   #progressStyle(val) {
      console.log(this.#progress)
   ll
   }


   // observed attributes
   static get observedAttributes() {
      return ['color', 'value', 'min', 'max'];
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
         case 'value':
            if (!isNaN(parseFloat(newValue))) {
               this.#attr.value = parseFloat(newValue);
               if (this.isConnected) this.#progressStyle(newValue);
            }
            break;
         case 'min':
            if (!isNaN(parseFloat(newValue))) {
               this.#attr.min = parseFloat(newValue);
            }
            break;
         case 'max':
            if (!isNaN(parseFloat(newValue))) {
               this.#attr.max = parseFloat(newValue);
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