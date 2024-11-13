/*** m-linear-progress.js alpha 0.00 ***/

// <m-linear-progress> 
export default class MLinearProgress extends HTMLElement {
   #value;
   constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
      this.#value = 25;
   }
   static get observedAttributes() {
      return ['value'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'value':
            this.#value = newValue;
            break;
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   #render() {
      let h = 20;
      this.shadow.innerHTML = `
         <style>
            :host{}
         </style>
         <svg width="100%" height="${h}px" viewbox="0 0 1000 ${h}" xmlns="http://www.w3.org/2000/svg">
            <rect 
               x="0"
               y="0"
               width="1000"
               height="${h}"
               rx="${h/2}"
               fill="var(--m-surface-container-high)"/>
            <rect 
               x="0"
               y="0"
               width="50"
               height="${h}"
               rx="${h/2}"
               fill="var(--m-primary)">
               <animate
                  attributeName="x"
                  values="0;1000;0"
                  keyTimes="0;1;1"
                  dur="2s"
                  repeatCount="indefinite"/>
               <animate
                  attributeName="width"
                  values="50;500;1000"
                  keyTimes="0;0.5;1"
                  dur="4s"
                  repeatCount="indefinite"/>
               </rect>
         </svg>
      `;
   }
}