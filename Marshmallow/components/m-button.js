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
      this.width = undefined;
      this.height = undefined;
   }
   static get observedAttributes() {
      return ['color'];
   }
   connectedCallback() {
      this.#render();
      this.#observeResize();
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
               :host {
                  position: relative;
                  display: inline-block;
                  cursor: pointer;
                  box-sizing: border-box;
                  webkit-tap-highlight-color: transparent;
                  width:${this.width}px;
                  height:${this.height}px;
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
               }
               :host::part(inner) {
                  position: relative;
                  z-index: 1;
                  display: block;
                  padding: 10px;
                  color:${this.color?this.color:'var(--m-on-primary)'};
               }
            </style>
            <div part="bg"></div>
            <div part="inner"><slot></slot></div>
        `;
   }
   #observeResize() {
      let bg = this.shadow.querySelector('[part="bg"]');
      let inner = this.shadow.querySelector('[part="inner"]');
      let resizeObserver = new ResizeObserver(() => {
         this.width = inner.offsetWidth;
         this.height = inner.offsetHeight;
      });
      resizeObserver.observe(inner);
      this.#render();
   }
   #setColor(param) {
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
         this.background = testColor ? color : 'var(--m-primary)';
         let innerColor = TC.inner(color);
         if (/^@/.test(param)) {
            let val = getComputedStyle(host).getPropertyValue(param.replace('@', '--m-on-'));
            innerColor = val ? val : inner
         }
         this.color = innerColor;
         this.#render();
      }
   }
}