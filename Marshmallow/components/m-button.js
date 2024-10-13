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
               }
               :host::part(btn) {
                  position: relative;
                  display: block;
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
                  z-index: 1;
                  display: block;
                  padding: 12px 24px;
                  font-size: calc(var(--m-font-size)+0px);
                  user-select: none;
               }
               :host::part(btn):active{
                  scale: 0.9;
                  border-radius: calc(var(--m-radius) + 4px);
               }
            </style>
            <div part="btn">
               <div part="bg"></div>
               <slot part="inner"></slot>
            </div>
        `;
   }
   #setColor(param) {
      let host = this.shadow.host;
      if (param) {
         let TC = new TestColor();
         let testColor = TC.test(param);
         let color = param;
         if (/^@/.test(param)) {
            let val = getComputedStyle(host).getPropertyValue(color.toLowerCase().replace('@', '--m-'));
            color = val ? val : color;
            testColor = !!val;
         } else if (/^var\((--[a-zA-Z0-9-]+)\)$/.test(param)) {
            let val = getComputedStyle(host).getPropertyValue(color.match(/^var\((--[a-zA-Z0-9-]+)\)$/)[1]);
            color = val ? val : color;
            testColor = !!val;
         }
         this.background = testColor ? color : 'var(--m-primary)';
         let innerColor = TC.inner(color);
         if (/^@/.test(param)) {
            let val = getComputedStyle(host).getPropertyValue(param.toLowerCase().replace('@', '--m-on-'));
            innerColor = val ? val : inner
         }
         this.color = innerColor;
         this.#render();
      }
   }
}