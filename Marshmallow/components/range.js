/*** range.js v1 ***/
class Range extends HTMLElement {
   // private variables
   #elm;
   #attr;
   #T;
   #handle;
   #truck;
   #progress;

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {
         color: 'var(--m-primary)',
         innerColor: 'var(--m-on-primary)',
         value: 0,
         min: 0,
         max: 100,
         step: 0,
         disabled: false,
         required: false,
         type: 'fancy',
         name: '',
      };
      this.#T = new Tools();
      let form = this.closest('form');
      if (form) { form.addEventListener('reset', this.#resetToDefault.bind(this)) };
   }

   // connect element 
   connectedCallback() {
      this.#elm.innerHTML = `
         <style>
         [[["STYLE"]]]
         </style>
         <div part="truck">
            <div part="progress"></div>
            <div part="handle"></div>
         </div>
      `;
      this.#handle = this.#elm.querySelector('[part="handle"]');
      this.#truck = this.#elm.querySelector('[part="truck"]');
      this.#progress = this.#elm.querySelector('[part="progress"]');

      let move = (e) => this.#range(e);
      this.addEventListener('pointerdown', move);
      this.addEventListener('pointermove', move);

      this.#rangeStyle(this.#step(this.value, this.step));
   }

   // private function
   #clamp(min, max, num) {
      return Math.max(min, Math.min(max, num));
   }
   #percent(min, max, num) {
      return ((Math.max(min, Math.min(max, num)) - min) / (max - min)) * 100;
   }
   #step(num, step) {
      if (step === 0) return parseFloat(num.toFixed(0));
      let decimals = (step.toString().split('.')[1] || '').length;
      return parseFloat((Math.round(num / step) * step).toFixed(decimals));
   }

   #range(event) {
      let rect = this.#truck.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let width = rect.width;
      let clampedX = Math.max(0, Math.min(x, width));
      let min = this.min;
      let max = this.max;
      let step = this.step;

      let progress = (this.#percent(min, max, (clampedX / width) * (max - min) + min));
      let value = ((progress / 100) * (max - min) + min);

      this.value = this.#step(value, step);
      this.#form();
      this.dispatchEvent(new Event('change', { bubbles: true }));
      this.dispatchEvent(new Event('input', { bubbles: true }));
   }
   #rangeStyle(num) {
      let min = this.min;
      let max = this.max;
      let width = this.#truck.getBoundingClientRect().width;
      let height = this.#truck.getBoundingClientRect().height;

      let value = this.#clamp(min, max, num);
      let percent = this.#percent(min, max, value);
      let x = (percent / 100) * width;

      if (this.#progress && this.#handle) {
         this.#progress.style.width = `${x + height/2}px`;
         this.#handle.style.left = `${x}px`;
      }

   }
   #form() {
      let form = this.closest("form");
      if (form) {
         let formData = new FormData(form);
         formData.set(this.name, this.value);
         let hiddenInput = this.querySelector('input');
         if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            this.appendChild(hiddenInput);
         }
         hiddenInput.setAttribute('hidden', '');
         hiddenInput.type = 'range';
         hiddenInput.min = this.min;
         hiddenInput.max = this.max;
         hiddenInput.name = this.name;
         hiddenInput.value = this.value;
      }
   }
   #resetToDefault() {
      this.value = 0;
      this.#form()
   }


   // observed attributes
   static get observedAttributes() {
      return ['color', 'inner-color', 'value', 'min', 'max', 'step', 'disabled', 'name', 'required', 'type'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            if (this.#T.test(newValue)) {
               let color = this.#T.color(newValue);
               this.#attr.color = color;
               this.style.setProperty('--m-range-color', color);
               if (!this.hasAttribute('inner-color')) {
                  let innerColor = this.#T.innerColor(newValue);
                  this.#attr.innerColor = innerColor;
                  this.style.setProperty('--m-range-inner-color', innerColor);
               }
            }
            break;
         case 'inner-color':
            if (this.#T.test(newValue)) {
               let innerColor = this.#T.innerColor(newValue);
               this.#attr.innerColor = innerColor;
               this.style.setProperty('--m-range-inner-color', innerColor);
            }
            break;
         case 'value':
            if (!isNaN(parseFloat(newValue))) {
               this.#attr.value = parseFloat(newValue);
               if (this.isConnected) this.#rangeStyle(newValue);
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
         case 'step':
            if (!isNaN(parseFloat(newValue)) && parseFloat(newValue) >= 0) {
               this.#attr.step = parseFloat(newValue);
            }
            break;
         case 'disabled':
            this.#attr.disabled = this.hasAttribute('disabled');
            break;
         case 'name':
            this.#attr.name = newValue ?? '';
            break;
         case 'type':
            if (/^(fancy|simple)$/i.test(newValue)) {
               this.#attr.type = newValue.toLowerCase();
            }
      }
   }

   // getter & setter
   get color() {
      return this.#attr.color;
   }
   set color(val) {
      this.setAttribute('color', val);
   }
   get innerColor() {
      return this.#attr.innerColor;
   }
   set innerColor(val) {
      this.setAttribute('inner-color', val);
   }
   get value() {
      return this.#attr.value;
   }
   set value(val) {
      this.setAttribute('value', val);
   }
   get min() {
      return this.#attr.min;
   }
   set min(val) {
      this.setAttribute('min', val);
   }
   get max() {
      return this.#attr.max;
   }
   set max(val) {
      this.setAttribute('max', val);
   }
   get step() {
      return this.#attr.step;
   }
   set step(val) {
      this.setAttribute('step', val);
   }
   get disabled() {
      return this.#attr.disabled;
   }
   set disabled(val) {
      if (val === false || val === null) {
         this.removeAttribute('required');
      } else if (val === true) {
         this.setAttribute('required', '');
      }
   }
   get name() {
      return this.#attr.name;
   }
   set name(val) {
      this.setAttribute('name', val);
   }
   get type() {
      return this.#attr.name;
   }
   set type(val) {
      this.setAttribute('name', val);
   }
   // property 
   toggleDisabled() {
      this.disabled = !this.disabled;
   }
}