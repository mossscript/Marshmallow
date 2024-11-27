/*** m-circular-progress.js alpha 0.00 ***/

// <m-circular-progress> 
export default class MCircularProgress extends HTMLElement {
   #shadow;
   #value;
   #min;
   #max;
   #label;
   #size;
   #weight;
   #sharp;
   constructor() {
      super();
      this.#shadow = this.attachShadow({ mode: 'open' });
      this.#value = undefined;
      this.#min = 0;
      this.#max = 100;
      this.#label = '';
      this.#size = 50;
      this.#weight = 5;
      this.#sharp = false;
   }
   static get observedAttributes() {
      return ['value', 'min', 'max', 'label', 'size', 'weight', 'sharp'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'value':
            this.#value = newValue;
            break;
         case 'min':
            this.#min = newValue;
            break;
         case 'max':
            this.#max = newValue;
            break;
         case 'label':
            this.#label = newValue;
            break;
         case 'size':
            this.#size = newValue;
            break;
         case 'weight':
            this.#weight = newValue;
            break;
         case 'sharp':
            this.#sharp = this.hasAttribute('sharp');
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   set value(x) { this.setAttribute('value', x) }
   set min(x) { this.setAttribute('min', x) }
   set max(x) { this.setAttribute('max', x) }
   set label(x) { this.setAttribute('label', x) }
   set size(x) { this.setAttribute('size', x) }
   set weight(x) { this.setAttribute('weight', x) }
   set sharp(x) { this.setAttribute('sharp', '') }
   get value() { return this.getAttribute('value') }
   get min() { return this.getAttribute('min') }
   get max() { return this.getAttribute('max') }
   get label() { return this.getAttribute('label') }
   get size() { return this.getAttribute('size') }
   get weight() { return this.getAttribute('weight') }
   get sharp() { return this.hasAttribute('sharp') }
   #render() {
      let sharp = this.#sharp;
      let size = this.#size;
      let min = this.#min || 0;
      let max = this.#max || 100;
      let clamp = (min, max, num) => Math.max(min, Math.min(max, num));
      let progress = clamp(min, max, this.#value) || 0;
      let percent = (progress - min) / (max - min) * 100;
      let weight = this.#weight;
      let radius = size / 2 - weight / 2;
      let circumference = 2 * Math.PI * radius;
      let offset = circumference * ((100 - percent) / 100);
      let label = this.#label;
      switch (this.#label) {
         case 'percent':
            label = percent.toFixed(0) + '%';
            break;
         case 'value':
            label = progress.toFixed(0);
            break;
      }
      this.#shadow.innerHTML = `
         <style>
            :host {
               display: inline-flex;
               padding: 0;
               position: relative;
               width: var(--m-progress-width,${size}px);
               aspect-ratio: 1;
               background: none;
               border-radius: ${size}px;
               margin: 0;
               vertical-align: middle;
            }
            :host::part(label){
               display: block;
               text-align: center;
               position: absolute;
               left: 50%;
               top: 50%;
               translate: -50% -50%;
               color: var(--m-progress-label-color,var(--m-primary));
               font-weight: 900;
               max-width: ${size-weight*4}px;
               max-height: ${size-weight*4}px;
               font-size: ${Math.round(size/4)}px;
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
               box-sizing: border-box;
            }
            :host::part(svg){
               position: absolute;
               left: 50%;
               top: 50%;
               translate: -50% -50%;
               width: 100%;
            }
            :host::part(progress-background){
               stroke: var(--m-circular-progress-background,var(--m-progress-background,var(--m-surface-container-high)));
               stroke-width: ${weight}px;
               fill: none;
            }
            :host::part(progress){
               stroke: var(--m-circular-progress-color,var(--m-progress-color,var(--m-primary)));
               stroke-width: ${weight}px;
               stroke-linecap: ${sharp?'square':'round'};
               stroke-linejoin: ${sharp?'square':'round'};
               stroke-dasharray: ${circumference};
               stroke-dashoffset: ${offset};
               fill: none;
               transform-origin: center;
               rotate: -90deg;
               ${this.#value?'':'animation: loop 2s linear infinite;'}
            }
            @keyframes loop{
               0% {
                  stroke-dashoffset: ${circumference};
                  rotate: 0deg;
               }
               50% {
                  stroke-dashoffset: ${circumference/5};
                  rotate: 180deg;
               }
               100% {
                  stroke-dashoffset: ${circumference};
                  rotate: 720deg;
               }
            }
         </style>
         <slot part="label">${label}</slot>
         <svg part="svg" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <circle part="progress-background" cx="${size/2}" cy="${size/2}" r="${radius}" />
            <circle part="progress" cx="${size/2}" cy="${size/2}" r="${radius}" />
         </svg>
      `;
   }
}