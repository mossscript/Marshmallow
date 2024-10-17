/*** m-button.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-button> 
export default class MButton extends HTMLElement {
   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.background = undefined;
      this.color = undefined;
      this.active = false;
   }
   static get observedAttributes() {
      return ['color'];
   }
   connectedCallback() {
      this.#render();
      this.#setColor(this.color);
   }
   attributeChangedCallback(name, oldValue, newValue) {
      if (name == 'color') {
         this.color = newValue;
         this.#render();
      }
   }
   #render() {
      this.shadow.innerHTML = `
            <style>
               :host{
                  display: inline-flex;
                  cursor: pointer;
                  box-sizing: border-box;
                  -webkit-tap-highlight-color: transparent;
                  position: relative;
                  overflow: hidden;
                  color:${this.color?this.color:'var(--m-on-primary)'};
                  border-radius: calc(var(--m-radius) + 8px);
                  font-weight: 600;
                  transition: 0.3s;
               }
               :host::part(bg) {
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 0;
                  display: block;
                  background: ${this.background?this.background:'var(--m-primary)'};
                  width: 100%;
                  height: 100%;
                  transition: 0.3s;
                  
               }
               :host::part(inner) {
                  position: relative;
                  z-index: 2;
                  display: block;
                  padding: 12px 24px;
                  font-size: calc(var(--m-font-size) + 0px);
                  user-select: none;
               }
               :host(:active){
                  scale: 0.9;
                  border-radius: calc(var(--m-radius) + 4px);
               }
            </style>
            <div part="bg"></div>
            <slot part="inner"></slot>
        `;
   }
   #setColor(param) {
      let host = this.shadow.host;
      if (param) {
         let TC = new TestColor();
         let testColor = TC.test(param);
         let color = param;
         if (/^@/.test(param)) {
            let val = getComputedStyle(host).getPropertyValue(param.toLowerCase().replace('@', '--m-'));
            color = val ? `var(${param.toLowerCase().replace('@', '--m-')})` : color;
            testColor = !!val;
         }
         this.background = testColor ? color : 'var(--m-primary)';
         let innerColor = TC.inner(color);
         if (/^@/.test(param)) {
            let val = getComputedStyle(host).getPropertyValue(param.toLowerCase().replace('@', '--m-on-'));
            let innerColor = val ? `var(${param.toLowerCase().replace('@', '--m-on-')})` : innerColor;
            console.log(innerColor)
         } 
         this.color = innerColor;
         this.#render();
      }
   }
}