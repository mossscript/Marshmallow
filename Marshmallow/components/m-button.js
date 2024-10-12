/*** m-button.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-button> 
export default class MButton extends HTMLElement {
   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
   }
   static get observedAttributes() {
      return ['color'];
   }
   connectedCallback() {
      this.#render();
      this.#observeResize();
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            this.color = newValue;
            this.#render();
            break;
      }
   }
   #render() {
      this.shadow.innerHTML = `
            <div part="bg"></div>
            <div part="inner"><slot></slot></div>
        `;
      this.#setColor(this.background);
   }
   #observeResize() {
      let bg = this.shadow.querySelector('[part="bg"]');
      let inner = this.shadow.querySelector('[part="inner"]');
      let resizeObserver = new ResizeObserver(() => {
         bg.style.width = `${inner.offsetWidth}px`;
         bg.style.height = `${inner.offsetHeight}px`;
      });
      resizeObserver.observe(inner);
   }
   #setColor(param) {
      let bg = this.shadow.querySelector('[part="bg"]');
      let inner = this.shadow.querySelector('[part="inner"]');
      if (param) {
         let TC = new TestColor();
         let testColor = TC.test(param);
         let color = param;
         if (/^@/.test(param)) {
            let val = getComputedStyle(this.shadow.host).getPropertyValue(color.replace('@', '--m-'));
            color = val ? val : color;
            testColor = !!val;
         } else if (/^var\((--[a-zA-Z0-9-]+)\)$/.test(param)) {
            let val = getComputedStyle(this.shadow.host).getPropertyValue(color.match(/^var\((--[a-zA-Z0-9-]+)\)$/)[1]);
            color = val ? val : color;
            testColor = !!val;
         }
         bg.style.background = testColor ? color : 'var(--m-primary)';
         let innerColor = TC.inner(color);
         if (/^@/.test(param)) {
            let val = getComputedStyle(this.shadow.host).getPropertyValue(param.replace('@', '--m-on-'));
            innerColor = val ? val : innerColor;
         }
         inner.style.color = innerColor;
      } else {
         bg.style.background = 'var(--m-primary)';
         inner.style.color = 'var(--m-on-primary)';
      }
   }
}