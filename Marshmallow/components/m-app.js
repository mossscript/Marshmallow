/*** m-app.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-app> 
export default class MApp extends HTMLElement {
   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
   }
   static get observedAttributes() {
      return ['background', 'color'];
   }
   connectedCallback() {
      this.#render();
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'background':
            this.background = newValue;
            this.#render();
            break;
         case 'color':
            this.color = newValue;
            this.#render();
            break;
      }
   }
   #render() {
      this.shadow.innerHTML = `<slot></slot>`;
      this.#setBackground(this.background);
      this.#setColor(this.color);
   }
   #setBackground(param) {
      let host = this.shadow.host;
      if (param) {
         let TC = new TestColor();
         let testColor = TC.test(param);
         let color = param;
         if (/^@/.test(param)) {
            let val = getComputedStyle(host).getPropertyValue(color.replace('@', '--m-'));
            color = val ? val : color;
            testColor = !!val;
         } else if (/^var\((--[a-zA-Z0-9-]+)\)$/.test(param)) {
            let val = getComputedStyle(this.shadow.host).getPropertyValue(color.match(/^var\((--[a-zA-Z0-9-]+)\)$/)[1]);
            color = val ? val : color;
            testColor = !!val;
         }
         host.style.background = testColor ? color : 'var(--m-background)';
         if (!this.color && testColor) {
            let innerColor = TC.inner(color);
            if (/^@/.test(param)) {
               let val = getComputedStyle(this.shadow.host).getPropertyValue(param.replace('@', '--m-on-'));
               innerColor = val ? val : inner
            }
            this.color = innerColor;
            this.#setColor(color);
         }
      } else {
         host.style.background = 'var(--m-background)';
      }
   }
   #setColor(param) {
      let TC = new TestColor();
      let host = this.shadow.host;
      if (param) {
         let color = param;
         if (/^var\((--[a-zA-Z0-9-]+)\)$/.test(color)) {
            let val = getComputedStyle(this.shadow.host).getPropertyValue(color.match(/^var\((--[a-zA-Z0-9-]+)\)$/)[1]);
            color = val;
         }
         host.style.color = TC.test(color) ? color : 'var(--m-on-background)';
      } else {
         host.style.color = 'var(--m-on-background)';
      }
   }
}