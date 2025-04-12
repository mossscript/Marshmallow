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
         value: undefined,
         min: 0,
         max: 100,
         sharp: false,
      }
      this.#T = new Tools();
      // template 
      this.#elm.innerHTML = `
         <style>
            [[["STYLE"]]]
         </style>
         <div part="progress"></div>
      `;
      this.#progress = this.#elm.querySelector('[part="progress"]');
   }


   // private function
   #clamp(min, max, num) {
      return Math.max(min, Math.min(max, num));
   }
   #percent(min, max, num) {
      return ((Math.max(min, Math.min(max, num)) - min) / (max - min)) * 100;
   }
   #progresst(num) {
      let { min, max } = this;
      if (num != undefined) {
         let clamp = this.#clamp(min, max, num);
         let percent = this.#percent(min, max, clamp);
         this.#attr.value = clamp;
         this.#progress.style.width = percent + '%';
         this.#progress.style.animation = 'none';
      } else {
         this.#attr.value = undefined;
         this.#progress.style.animation = 'loop 1s linear infinite';
      }
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
               this.#progresst(newValue);
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
         case 'sharp':
            this.#attr.sharp = this.hasAttributes(name);
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
   get min() {
      return this.#attr.min
   }
   set min(val) {
      this.setAttribute('min', val)
   }
   get max() {
      return this.#attr.max
   }
   set max(val) {
      this.setAttribute('max', val)
   }
   get value() {
      return this.#attr.value
   }
   set value(val) {
      this.setAttribute('value', val)
   }
   get sharp() {
      return this.#attr.value
   }
   set sharp(val) {
      this.setAttribute('sharp', val)
   }
}