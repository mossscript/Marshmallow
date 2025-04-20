/*** progress.js v1 ***/
class Progress extends HTMLElement {
   // private variable 
   #elm;
   #attr;
   #T;
   #styleElm;
   #progressElm;
   #progressBg;

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
         type: 'linear',
      }
      this.#T = new Tools();

      // template 
      this.#styleElm = `
         <style>
            [[["STYLE"]]]
         </style>
      `;
      this.#elm.innerHTML = `
         ${this.#styleElm}
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
      let { min, max, type } = this;
      let clamp = this.#clamp(min, max, num);
      let percent = this.#percent(min, max, clamp);
      if (type == 'linear') {
         if (num != undefined) {
            this.#attr.value = clamp;
            this.#progressElm.style.width = percent + '%';
            this.#progressElm.style.animation = 'none';
         } else {
            this.#attr.value = undefined;
            this.#progressElm.style.animation = 'loop 1s linear infinite';
         }
      } else if (type == 'circular') {
         let size = 50;
         let weight = 5;
         let radius = size / 2 - weight / 2;
         let circumference = 2 * Math.PI * radius;
         let offset = circumference * ((100 - percent) / 100) || 0;

         this.#progressElm.style.strokeDasharray = circumference;
         this.#progressElm.style.strokeDashoffset = offset;
         this.#progressElm.style.setProperty('--circumference', circumference);
         this.#progressElm.style.setProperty('--circumference2', circumference/5);
         
         if (num != undefined) {
            this.#progressElm.style.animation = 'none';
         } else {
            this.#progressElm.style.animation = 'loop2 1.5s linear infinite';
         }
      }
   }
   #changeType(type) {
      if (type == 'linear') {
         this.#elm.innerHTML = `
            ${this.#styleElm}
            <div part="progress"></div>
         `;
         this.#progressBg = undefined;
         this.#progressElm = this.#elm.querySelector('[part="progress"]');
      } else if (type == 'circular') {
         this.#elm.innerHTML = `
            ${this.#styleElm}
            <svg part="svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
               <circle part="progress-background" cx="25" cy="25" r="22.5"/>
               <circle part="progress" cx="25" cy="25" r="22.5"/>
            </svg>
         `;
         this.#progressBg = this.#elm.querySelector('[part="progress-background"]');
         this.#progressElm = this.#elm.querySelector('[part="progress"]');
      }
   }

   // observed attributes
   static get observedAttributes() {
      return ['color', 'value', 'min', 'max', 'sharp', 'type'];
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
         case 'type':
            if (/^(linear|circular)$/i.test(newValue)) {
               let type = newValue.replace(/\s+/g, '').toLowerCase();
               this.#attr.type = type;
               this.#changeType(type);
               this.#progress(this.value);
            }
            break;
         case 'value':
            if (!isNaN(parseFloat(newValue))) {
               this.#attr.value = parseFloat(newValue);
               this.#progress(newValue);
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

   set type(val) {
      this.setAttribute('type', val)
   }
   get type() {
      return this.#attr.type
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
      if (this.value == undefined) this.value = 0;
      this.value += parseFloat(num);
   }
}