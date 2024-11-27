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
   #symbol;
   #symbolFill;
   #symbolWght;
   #symbolGrad;
   #symbolOpsz;
   #symbolAlign;
   #outline;
   #full;
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
      this.#symbol = undefined;
      this.#symbolFill = undefined;
      this.#symbolWght = undefined;
      this.#symbolGrad = undefined;
      this.#symbolOpsz = undefined;
      this.#symbolAlign = 'end';
      this.#outline = undefined;
      this.#full = false;
   }
   static get observedAttributes() {
      return [
         'color',
         'badge', 
         'badgecolor', 
         'badgesize', 
         'badgeposition', 
         'progress', 
         'outline', 
         'full', 
         'symbol', 
         'symbolfill',
         'symbolwght',
         'symbolgrad',
         'symbolopsz',
         'symbolalign',
       ];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            this.#background = newValue;
            if (this.#tc.test(newValue)) {
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
         case 'symbol':
            this.#symbol = newValue;
            break;
         case 'symbolfill':
            this.#symbolFill = newValue;
            break;
         case 'symbolwght':
            this.#symbolWght = newValue;
            break;
         case 'symbolgrad':
            this.#symbolGrad = newValue;
            break;
         case 'symbolopsz':
            this.#symbolOpsz = newValue;
            break;
            case 'symbolalign':
            this.#symbolAlign = newValue;
         break;
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   #render() {
      let outlin = this.hasAttribute('outline');
      let full = this.hasAttribute('full');
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
               display: ${full?'flex':'inline-flex'};
               cursor: pointer;
               box-sizing: border-box;
               -webkit-tap-highlight-color: transparent;
               position: relative;
               height: 40px;
               vertical-align: middle;
               font-weight: ${outlin?600:400};
               user-select: none;
               transition-property: scale;
               transition-duration: 0.3s;
               color: var(--m-button-color,${outlin?this.#background:this.#color});
               
            }
            :host::part(background) {
               position: absolute;
               top: 0;
               left: 0;
               z-index: 0;
               display: block;
               ${outlin?'border: 2px solid var(--m-button-background,'+this.#background+')':'background: var(--m-button-background,'+this.#background+')'};
               box-sizing: border-box;
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
            }
            ::slotted(m-symbol),m-symbol{
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
               --m-progress-color: currentColor;
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
         if (this.#progressMin) progress.min = this.#progressMin;
         if (this.#progressMax) progress.max = this.#progressMax;
         progress.value = this.#progress;
      }
      if (this.#symbol) {
         let symbol = this.#shadow.querySelector('m-symbol');
         if (symbol == null) {
            symbol = document.createElement('m-symbol');
            switch (this.#symbolAlign) {
               case 'start':
                  this.#shadow.querySelector('div[part="inner"]').prepend(symbol);
                  break;
               case 'end':
                  this.#shadow.querySelector('div[part="inner"]').appendChild(symbol);
                  break;
               default:
                  this.#shadow.querySelector('div[part="inner"]').appendChild(symbol);
            }
         }
         symbol.innerText = this.#symbol;
         if (this.#symbolFill) symbol.fill = this.#symbolFill;
         if (this.#symbolWght) symbol.wght = this.#symbolWght;
         if (this.#symbolGrad) symbol.graf = this.#symbolGrad;
         if (this.#symbolOpsz) symbol.opsz = this.#symbolOpsz;
         console.log(this)
      }
      console.log(this.#symbol)
   }
}