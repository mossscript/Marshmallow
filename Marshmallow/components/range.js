/*** range.js v1 ***/
class Range extends HTMLElement {
   // private variable 
   #elm;
   #attr;
   #T;
   #handle;
   #progress;
   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {
         color: 'var(--m-primary)',
         innerColor: 'var(--m-on-primary)',
         dir: 'ltr',
         name: undefined,
         value: 0,
         min: 0,
         max: 100,
         step: 0,
         disabled: false,
      }
      this.#T = new Tools();
   }

   // connect element
   connectedCallback() {
      this.#elm.innerHTML = `
         <style>
            [[["STYLE"]]]
         </style>
         <div part="progress">
            <div part="handle"></div>
         </div>
      `;
      let percent = (min, max, num) => ((Math.max(min, Math.min(max, num)) - min) / (max - min)) * 100;
      this.#handle = this.#elm.querySelector('[part="handle"]');
      this.#progress = this.#elm.querySelector('[part="progress"]');
      this.#progress.style[['rtl', 'ltr'].includes(this.dir) ? 'width' : 'height'] = percent(this.#attr.min, this.#attr.max, this.#attr.value) + '%';
      this.addEventListener('pointerdown', this.#range.bind(this));
      this.addEventListener('pointermove', this.#range.bind(this));
      this.addEventListener('pointerup', () => { this.#progress.style.padding = '5px' });
      this.addEventListener('change', () => { this.#progress.style.padding = '5px' });
      let form = this.closest('form');
      if (form) { form.addEventListener('reset', this.#resetToDefault.bind(this)) }
   }

   // private function 
   #range(event) {
      let percent = (min, max, num) => ((Math.max(min, Math.min(max, num)) - min) / (max - min)) * 100;
      let roundToStep = (num, step) => parseFloat((Math.round(num / step) * step).toFixed(3));
      let { left, right, top, bottom, width, height } = this.getBoundingClientRect();
      let [x, y] = [event.clientX, event.clientY];
      let min = this.#attr.min;
      let max = this.#attr.max;
      let step = this.#attr.step;
      let progress, value, stepCount, stepWidth, progressWidth;

      switch (this.#attr.dir) {
         case 'ltr':
            progress = Math.round(percent(min, max, ((x - 30 - left) / (width - 30)) * (max - min) + min));
            value = parseFloat(((progress / 100) * (max - min) + min).toFixed(3));
            stepCount = step > 0 ? (max - min) / step : (max - min);
            stepWidth = (width + 30) / stepCount;
            progressWidth = step > 0 ? Math.round((this.#attr.value - min) / step) * stepWidth : x - left + 15;
            break;
         case 'rtl':
            progress = Math.round(percent(min, max, ((right - x - 30) / (width - 30)) * (max - min) + min));
            value = parseFloat(((progress / 100) * (max - min) + min).toFixed(3));
            stepCount = step > 0 ? (max - min) / step : (max - min);
            stepWidth = (width - 30) / stepCount;
            progressWidth = step > 0 ? Math.round((this.#attr.value - min) / step) * stepWidth : right - x + 15;
            break;
         case 'utd':
            progress = Math.round(percent(min, max, ((y - 30 - top) / (height - 30)) * (max - min) + min));
            value = parseFloat(((progress / 100) * (max - min) + min).toFixed(3));
            stepCount = step > 0 ? (max - min) / step : (max - min);
            stepWidth = (height + 30) / stepCount;
            progressWidth = step > 0 ? Math.round((this.#attr.value - min) / step) * stepWidth : y - top + 15;
            break;
         case 'dtu':
            progress = Math.round(percent(min, max, ((bottom - y - 30) / (height - 30)) * (max - min) + min));
            value = parseFloat(((progress / 100) * (max - min) + min).toFixed(3));
            stepCount = step > 0 ? (max - min) / step : (max - min);
            stepWidth = (height + 30) / stepCount;
            progressWidth = step > 0 ? Math.round((this.#attr.value - min) / step) * stepWidth : bottom - y + 15;
            break;
      }

      if (['rtl', 'ltr'].includes(this.dir)) {
         this.#progress.style.width = progressWidth + 'px';
      } else {
         this.#progress.style.height = progressWidth + 'px';
      }

      this.#attr.value = step > 0 ? roundToStep(value, step) : value;
      this.#progress.style.padding = '2px';
      this.#input();
      this.dispatchEvent(new Event('change', { bubbles: true }));
      this.dispatchEvent(new Event('input', { bubbles: true }));
   }
   #input() {
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
      hiddenInput.value = 0;
      this.#input()
   }

   // observed attributes
   static get observedAttributes() {
      return ['color', 'inner-color', 'value', 'min', 'max', 'step', 'dir', 'disabled'];
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
         case 'min':
            if (!isNaN(Number(newValue)) && Number(newValue)) {
               this.#attr.min = Number(newValue);
            }
            break;
         case 'min':
            if (!isNaN(Number(newValue)) && Number(newValue)) {
               this.#attr.min = Number(newValue);
            }
            break;
         case 'max':
            if (!isNaN(Number(newValue)) && Number(newValue)) {
               this.#attr.max = Number(newValue);
            }
            break;
         case 'step':
            if (!isNaN(Number(newValue)) && Number(newValue)) {
               this.#attr.step = Number(newValue);
            }
            break;
         case 'value':
            if (!isNaN(Number(newValue)) && Number(newValue)) {
               this.#attr.value = Number(newValue);
            }
            break;
         case 'name':
            this.#attr.name = newValue;
            break;
         case 'dir':
            if (/^(rtl|ltr|utd|dtu)$/i.test(newValue)) {
               this.#attr.dir = newValue.toLowerCase();
            }
            break;
         case 'disabled':
this.#attr.disabled = this.hasAttribute('disabled');
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
   get innerColor() {
      return this.#attr.innerColor
   }
   set innerColor(val) {
      this.setAttribute('inner-color', val)
   }
   get value() {
      return this.#attr.value
   }
   set value(val) {
      this.setAttribute('value', val)
   }
   get name() {
      return this.#attr.name
   }
   set name(val) {
      this.setAttribute('name', val)
   }
   get min() {
      return this.#attr.min
   }
   set min(val) {
      this.setAttribute('min', val)
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
   get dir() {
      return this.#attr.dir
   }
   set dir(val) {
      this.setAttribute('dir', val)
   }
get disabled() {
      return this.#attr.disabled
   }
   set disabled(val) {
      if (val == true || val == false) {
         val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled')
      }
   }
}