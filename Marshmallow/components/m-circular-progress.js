/*** m-circular-progress.js alpha 0.00 ***/

// <m-circular-progress> 
export default class MCircularProgress extends HTMLElement{
   #shadow;#value;#min;#max;#label;#size;
   constructor() {
      super();
      this.#shadow = this.attachShadow({mode: 'open'});
      this.#value = undefined;
      this.#min = 0;
      this.#max = 100;
      this.#label = 'none';
      this.#size = 50;
   }
   static get observedAttributes() {
      return ['value', 'min', 'max', 'label', 'size'];
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
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   #render(){
      let size = this.#size;
      let clamp = (min, max, num) => Math.max(min, Math.min(max, num));
      let truncateString = (str)=> str.length < size/10 ? str : str.slice(0, (size/20).toFixed(0)) + "...";
      let min = this.#min || 0;
      let max = this.#max || 100;
      let progress = clamp(min, max, this.#value) || 0;
      let percent = (progress - min) / (max - min) * 100;
      let l = 5;
      let radius = size/2 - l/2;
      let circumference = 2 * Math.PI * radius;
      let offset = circumference*((100-percent)/100);
      let label = truncateString(this.#label);
      switch (this.#label) {
         case 'none':
            label = '';
            break;
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
               width: ${size}px;
               height: ${size}px;
               background: none;
               border-radius: ${size/2}px;
               padding: 0px;
               margin: 4px 0;
               vertical-align: middle;
            }
            :host::part(label){
               display: flex;
               justify-content: center;
               align-items: center;
               position: absolute;
               left: 50%;
               top: 50%;
               translate: -50% -50%;
               color: ${this.color};
               font-weight: 900;
               width: ${size}px;
               height: ${size}px;
               font-size: ${size/4}px;
               text-overflow: ellipsis;
               overflow: hidden;
               white-space: nowrap;
            }
            :host::part(svg){
               position: absolute;
               left: 50%;
               top: 50%;
               translate: -50% -50%;
               width: ${size}px;
               height: ${size}px;
            }
            :host::part(progress-background){
               stroke: var(--m-circular-progress-background,var(--m-progress-background,var(--m-surface-container-high)));
               stroke-width: ${l}px;
               fill: none;
            }
            :host::part(progress){
               stroke: var(--m-circular-progress-color,var(--m-progress-color,var(--m-primary)));
               stroke-width: ${l}px;
               stroke-linecap: round;
               stroke-linejoin: round;
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
         <div part="label">${label}</div>
         <svg part="svg" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <circle part="progress-background" cx="${size/2}" cy="${size/2}" r="${radius}" />
            <circle part="progress" cx="${size/2}" cy="${size/2}" r="${radius}" />
         </svg>
      `;
   }
}