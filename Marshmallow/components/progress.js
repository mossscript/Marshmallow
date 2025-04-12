/*** progress.js v1 ***/
class Progress extends HTMLElement {
   // private variable 
   #elm;
   #attr;
   #T;
   #progressElm

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
      this.#progressElm = this.#elm.querySelector('[part="progress"]');
   }

   // private function
   #clamp(min, max, num) {
      return Math.max(min, Math.min(max, num));
   }
   #percent(min, max, num) {
      return ((Math.max(min, Math.min(max, num)) - min) / (max - min)) * 100;
   }
   #progress(num) {
      let { min, max } = this;
      if (num != undefined) {
         let clamp = this.#clamp(min, max, num);
         let percent = this.#percent(min, max, clamp);
         this.#attr.value = clamp;
         this.#progressElm.style.width = percent + '%';
         this.#progressElm.style.animation = 'none';
      } else {
         this.#attr.value = undefined;
         this.#progressElm.style.animation = 'loop 1s linear infinite';
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
               this.#progress(newValue);
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

   // setter & getter
   set color(val) {
      this.setAttribute('color', val)
   }
   get color() {
      return this.#attr.color
   }

   set min(val) {
      this.setAttribute('min', val)
   }
   get min() {
      return this.#attr.min
   }

   set max(val) {
      this.setAttribute('max', val)
   }
   get max() {
      return this.#attr.max
   }

   set value(val) {
      this.setAttribute('value', val)
   }
   get value() {
      return this.#attr.value
   }

   set sharp(val) {
      if (val === false || val === null) {
         this.removeAttribute('sharp');
      } else if (val === true) {
         this.setAttribute('sharp', '');
      }
   }
   get sharp() {
      return this.#attr.value
   }

   // property 
   increase(num) {
      this.value = this.value + parseFloat(num);
   }
}