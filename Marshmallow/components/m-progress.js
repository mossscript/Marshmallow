/*** m-progress.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-progress>
export default class MProgress extends HTMLElement {
   #tc;
   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.#tc = new TestColor();
      this.color = 'var(--m-primary)';
      this.value = undefined;
      this.min = 0;
      this.max = 100;
      this.label = null;
   }

   static get observedAttributes() {
      return ['color', 'value', 'type', 'min', 'max', 'label'];
   }

   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            this.color = newValue;
            break;
         case 'value':
            this.value = newValue;
            break;
         case 'type':
            this.type = newValue;
            break;
         case 'min':
            this.min = newValue;
            break;
         case 'max':
            this.max = newValue;
            break;
         case 'label':
            this.label = newValue;
            break;
      }
      this.#render();
   }

   connectedCallback() {
      this.#render();
   }
   #render() {
      let clamp = (min, max, num) => Math.max(min,Math.min(max,num));
      let w, h, l, radius, circumference, offset, svg, rx;
      let min = this.min || 0;
      let max = this.max || 100;
      let progress = clamp(min,max,this.value) || 0;
      if (this.type == 'linear') {
      } else if (this.type == 'circular') {
         progress = (progress-min)/(max-min) *100;
         w = 50;
         l = 5;
         radius = w/2 - l/2;
         circumference = 2 * Math.PI * radius;
         offset = circumference * ((100-progress)/100);
         svg = `
         <style>
            :host {
               display: inline-flex;
               padding: 0;
               position: relative;
               width: ${w}px;
               height: ${w}px;
               background: var(--m-primary-container);
               border-radius: ${w}px;
               padding: 8px;
            }
            :host::part(svg){
               position: absolute;
               left: 50%;
               top: 50%;
               translate: -50% -50%;
               width: ${w}px;
               height: ${w}px;
            }
            :host::part(progress){
               animation: ${this.value?'load 1s':'loop 2s linear infinite'};
               transform-origin: center;
               rotate: -90deg;
            }
            :host::part(value){
               display: flex;
               justify-content: center;
               align-items: center;
               position: absolute;
               left: 50%;
               top: 50%;
               translate: -50% -50%;
               color: ${this.color};
               font-weight: 900;
               width: ${w}px;
               height: ${w}px;
               font-size: ${w/3}px;
               text-overflow: ellipsis;
               overflow: hidden;
               white-space: nowrap;
            }
            @keyframes load{
               from {stroke-dashoffset: ${circumference}}
               to {stroke-dashoffset: ${offset}}
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
         <div part="value">${this.label}</div>
         <svg part="svg" viewBox="0 0 ${w} ${w}" xmlns="http://www.w3.org/2000/svg">
            <circle part="progress" cx="${w/2}" cy="${w/2}" r="${radius}" stroke="${this.color}" stroke-width="${l}" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
         </svg>`
      }

      this.shadow.innerHTML = `${svg}`;
   }
}