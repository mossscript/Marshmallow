/*** m-app.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-app> 
export default class MApp extends HTMLElement {
   constructor() {
      super();
      this.shadow = this.attachShadow({mode:'open'});
   }
   static get observedAttributes() {
      return ['color'];
   }
   connectedCallback() {
      this.#render();
   }
   attributeChangedCallback(name, oldValue, newValue) {
      if (name == 'background') {
         this.background = newValue;
         this.#render();
      }
   }
   #render() {
      this.shadow.innerHTML = `<slot></slot>`;
      this.#setBackground(this.background);
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
            let val = getComputedStyle(host).getPropertyValue(color.match(/^var\((--[a-zA-Z0-9-]+)\)$/)[1]);
            color = val ? val : color;
            testColor = !!val;
         }
         host.style.background = testColor ? color : 'var(--m-background)';
         let innerColor = TC.inner(color);
         if (/^@/.test(param)) {
            let val = getComputedStyle(host).getPropertyValue(param.replace('@', '--m-on-'));
            innerColor = val ? val : inner
         }
         host.style.color = innerColor;
      } else {
         host.style.background = 'var(--m-background)';
         host.style.color = 'var(--m-on-background)';
      }
   }
}