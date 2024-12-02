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
   #size;
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
      this.#size = 'medium';
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
         'size',
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
         case 'size':
            this.#size = newValue;
            break;
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   set color(x) { this.setAttribute('color', x) }
   set badge(x) { this.setAttribute('badge', x) }
   set badgePosition(x) { this.setAttribute('badgePosition', x) }
   set badgeColor(x) { this.setAttribute('badgeColor', x) }
   set badgeSize(x) { this.setAttribute('badgeSize', x) }
   set progress(x) { this.setAttribute('progress', x) }
   set progressMin(x) { this.setAttribute('progressMin', x) }
   set progressMax(x) { this.setAttribute('progressMax', x) }
   set symbol(x) { this.setAttribute('symbol', x) }
   set symbolFill(x) { this.setAttribute('symbolFill', x) }
   set symbolWght(x) { this.setAttribute('symbolWght', x) }
   set symbolGrad(x) { this.setAttribute('symbolGrad', x) }
   set symbolOpsz(x) { this.setAttribute('symbolOpsz', x) }
   set symbolAlign(x) { this.setAttribute('symbolAlign', x) }
   set size(x) { this.setAttribute('size', x) }
   set outline(x) { x == true ? this.setAttribute('outline', '') : this.removeAttribute('outline') }
   set full(x) { x == true ? this.setAttribute('full', '') : this.removeAttribute('full') }
   get color() { return this.getAttribute('color') }
   get badge() { return this.getAttribute('badge') }
   get badgePosition() { return this.getAttribute('badgePosition') }
   get badgeColor() { return this.getAttribute('badgeColor') }
   get badgeSize() { return this.getAttribute('badgeSize') }
   get progress() { return this.getAttribute('progress') }
   get progressMin() { return this.getAttribute('progressMin') }
   get progressMax() { return this.getAttribute('progressMax') }
   get symbol() { return this.getAttribute('symbol') }
   get symbolFill() { return this.getAttribute('symbolFill') }
   get symbolWght() { return this.getAttribute('symbolWght') }
   get symbolGrad() { return this.getAttribute('symbolGrad') }
   get symbolOpsz() { return this.getAttribute('symbolOpsz') }
   get symbolAlign() { return this.getAttribute('symbolAlign') }
   get size() { return this.getAttribute('size') }
   get outline() { return this.hasAttribute('outline') }
   get full() { return this.hasAttribute('full') }
   #render() {
      let outlin = this.hasAttribute('outline');
      let full = this.hasAttribute('full');
      let [x, y, dx, dy] = ['right', 'top', 25, -25];
      let [h, fs] = [40, 2];
      switch (this.#size.toLocaleLowerCase()) {
         case 'small':
            h = 32;
            fs = 0;
            break;
         case 'medium':
            h = 40;
            fs = 2;
            break;
         case 'large':
            h = 56;
            fs = 4;
            break;
      }
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
      }
      if (this.#tc.test(this.#background)) {
         this.#color = this.#tc.inner(this.#background);
         this.#background = this.#tc.bg(this.#background);
      }
      this.#shadow.innerHTML = `
         <style>
            :host{
               display: ${full?'flex':'inline-flex'};
               cursor: pointer;
               box-sizing: border-box;
               -webkit-tap-highlight-color: transparent;
               position: relative;
               height: ${h}px;
               vertical-align: middle;
               font-weight: ${outlin?700:500};
               font-size: calc(var(--m-font-size) + ${fs}px);
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
               border-radius: var(--m-button-radius,calc(var(--m-radius) + ${h/4}px));
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
               padding: 0 ${h/2}px;
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
               border-radius: var(--m-button-radius-active,calc(var(--m-radius) + ${h/8}px));
            }
         </style>
         <div part="background"></div>
         <div part="inner">
            <slot></slot>
         </div>
      `;
      {
         let badge = this.querySelector('m-badge');
         if (this.#badge != undefined || badge != null) {
            if (badge == null) {
               badge = document.createElement('m-badge');
               this.appendChild(badge);
            }
            badge.setAttribute('color', this.#badgeColor || badge.getAttribute('color') || '@error');
            badge.setAttribute('size', this.#badgeSize || badge.getAttribute('size') || 'small');
            badge.innerText = this.#badge || badge.innerText;
         }
      }
      {
         let progress = this.querySelector('m-linear-progress');
         if (this.#progress || progress != null) {
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
      }
   }
}