/*** m-linear-progress.js alpha 0.00 ***/

// <m-linear-progress> 
export default class MLinearProgress extends HTMLElement {
   #value;#min;#max;#sharp;
   constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
      this.#value = undefined;
      this.#min = 0;
      this.#max = 100;
      this.#sharp = false;
   }
   static get observedAttributes() {
      return ['value','min','max','sharp'];
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
         case 'sharp':
            this.#sharp = this.hasAttribute('sharp');
            break;
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   set value(x) {this.setAttribute('value', x)}
   set min(x) {this.setAttribute('min', x)}
   set max(x) {this.setAttribute('max', x)}
   set sharp(x) {x?this.setAttribute('sharp',''):this.removeAttribute('sharp')}
   get value() {this.getAttribute('value')}
   get min() {this.getAttribute('min')}
   get max() {this.getAttribute('max')}
   get sharp() {this.hasAttribute('sharp')}
   #render() {
      let sharp = this.#sharp;
      let clamp = (min, max, num) => Math.max(min,Math.min(max,num));
      let min = this.#min || 0;
      let max = this.#max || 100;
      let progress = clamp(min, max, this.#value) || 0;
      let h = 16;
      {this.shadow.innerHTML = `
         <style>
            :host::part(progress){
               stroke: var(--m-progress-color,var(--m-primary));
               animation: ${this.#value?'':'loop 2s infinite linear'};
            }
            :host::part(progress-background){
               stroke: var(--m-progress-background,var(--m-surface-container-high));
            }
            @keyframes loop {
               0% {
                  stroke-dasharray: 100, 900;
                  stroke-dashoffset: 1000;
               }
               50% {
                  stroke-dasharray: 800, 1000;
                  stroke-dashoffset: 500;
               }
               100% {
                  stroke-dasharray: 100, 900;
                  stroke-dashoffset: -1000;
               }
            }
         </style>
         <svg width="100%" height="${h}px" viewbox="-${h} 0 ${1000+h*2} ${h}" xmlns="http://www.w3.org/2000/svg">
            <line 
               part="progress-background"
               x1="0" 
               y1="${h/2}" 
               x2="${1000}" 
               y2="${h/2}" 
               stroke-width="${h}"
               stroke-linecap="${sharp?'square':'round'}"/>
            <line 
               part="progress"
               x1="0" 
               y1="${h/2}" 
               x2="${this.#value ? progress*10 : 1000}" 
               y2="${h/2}"
               stroke-width="${(this.#value == 0? 0 : h)}"
               stroke-linecap="${sharp?'square':'round'}"/>
         </svg>
      `;}
   }
}