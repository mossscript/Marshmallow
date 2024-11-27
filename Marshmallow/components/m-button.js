/*** m-button.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-button> 
export default class MButton extends HTMLElement {
   #tc;
   #shadow;
   #background;
   #color;
   #badgePosition;
   #badge;
   #badgeColor;
   #badgeSize;
   #progress;
   #progressMin;
   #progressMax;
   constructor() {
      super();
      this.#shadow = this.attachShadow({ mode: 'open' });
      this.#tc = new TestColor();
      this.#background = 'var(--m-primary)';
      this.#color = 'var(--m-on-primary)';
      this.#badge = undefined;
      this.#badgeSize = undefined;
      this.#badgeColor = undefined;
      this.#badgePosition = 'top right';
      this.#progress = undefined;
      this.#progressMin = undefined;
      this.#progressMax = undefined;
   }
   static get observedAttributes() {
      return ['color', 'badge', 'badgecolor', 'badgesize', 'badgeposition', 'progress'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            this.#background = newValue;
            if (this.#tc.test(this.#background)) {
               this.#color = this.#tc.inner(this.#background);
               this.#background = this.#tc.bg(this.#background);
            }
            break;
         case 'badge':
            this.#badge = newValue;
            break;
         case 'badgecolor':
            this.#badgeColor = newValue;
            break;
         case 'badgesize':
            this.#badgeSize = newValue;
            break;
         case 'badgeposition':
            this.#badgePosition = newValue;
            break;
         case 'progress':
            this.#progress = newValue;
            break;

      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   #render() {
      let x, y, dx, dy;
      switch (this.#badgePosition.toLocaleLowerCase().replaceAll(' ', '')) {
         case 'topright':
            [x, y, dx, dy] = ['right', 'top', 25, -25];
            break;
         case 'righttop':
            [x, y, dx, dy] = ['right', 'top', 25, -25];
            break;
         case 'bottomright':
            [x, y, dx, dy] = ['right', 'bottom', 25, 25];
            break;
         case 'rightbottom':
            [x, y, dx, dy] = ['right', 'bottom', 25, 25];
            break;
         case 'topleft':
            [x, y, dx, dy] = ['left', 'top', -25, -25];
            break;
         case 'lefttop':
            [x, y, dx, dy] = ['left', 'top', -25, -25];
            break;
         case 'bottomleft':
            [x, y, dx, dy] = ['left', 'bottom', -25, 25];
            break;
         case 'leftbottom':
            [x, y, dx, dy] = ['left', 'bottom', -25, 25];
            break;
         default:
            [x, y, dx, dy] = ['right', 'top', 25, ];
      }
      this.#shadow.innerHTML = `
         <style>
            :host{
               display: inline-flex;
               cursor: pointer;
               box-sizing: border-box;
               -webkit-tap-highlight-color: transparent;
               position: relative;
               height: 40px;
               vertical-align: middle;
               user-select: none;
               transition-property: scale;
               transition-duration: 0.3s;
            }
            :host::part(background) {
               position: absolute;
               top: 0;
               left: 0;
               z-index: 0;
               display: block;
               background: var(--m-button-background,${this.#background});
               width: 100%;
               height: 100%;
               border-radius: var(--m-button-radius,calc(var(--m-radius) + 10px));
               transition-property: border-radius;
               transition-duration: 0.3s;
               overflow: hidden;
            }
            :host::part(inner) {
               position: relative;
               width: 100%;
               height: 100%;
               display: flex;
               flex-flow: row nowrap;
               justify-content: center;
               align-items: center;
               padding: 0 16px;
               gap: 8px;
               z-index: 3;
               color: var(--m-button-color,${this.#color});
            }
            ::slotted(m-symbol){
               vertical-align: middle;
            }
            ::slotted(m-badge),m-badge{
               position: absolute;
               ${x}: 0;
               ${y}: 0;
               transform: translate(${dx}%, ${dy}%);
            }
            ::slotted(m-linear-progress),m-linear-progress{
               position: absolute;
               top: 0;
               left: 0;
               margin: 0;
               height: 100%;
               z-index: 2;
               --m-progress-background: transparent;
               --m-progress-color: var(--m-button-color,${this.#color});
               opacity: 0.2;
            }
            :host(:active){
               scale: 0.9;
            }
            :host(:active)::part(background){
               border-radius: var(--m-button-radius-active,calc(var(--m-radius) + 2px));
            }
         </style>
         <div part="background"></div>
         <div part="inner">
            <slot></slot>
         </div>
      `;
      if (this.#badge) {
         let badge = this.#shadow.querySelector('m-badge');
         if (badge == null) {
            badge = document.createElement('m-badge');
            this.#shadow.appendChild(badge);
         }
         badge.setAttribute('color', this.#badgeColor ? this.#badgeColor : '@error');
         badge.setAttribute('size', this.#badgeSize ? this.#badgeSize : 'small');
         badge.innerText = this.#badge;
      }
      if (this.#progress || this.hasAttribute('progress')) {
         let progress = this.#shadow.querySelector('m-linear-progress');
         if (progress == null) {
            progress = document.createElement('m-linear-progress');
            this.#shadow.querySelector('div[part="background"]').appendChild(progress);
         }
         progress.sharp = true;
         progress.min = this.#progressMin || 0;
         progress.max = this.#progressMax || 100;
         progress.value = this.#progress;
         console.log(progress)
      }
   }
}