/*** m-symbol.js alpha 0.00 ***/
// <m-symbol> 
export default class MSymbol extends HTMLElement {
   #shadow;#fill;#wght;#grad;#opsz;
   constructor() {
      super();
      this.#shadow = this.attachShadow({mode: 'open'});
      this.#fill = 0;
      this.#wght = 300;
      this.#grad = 0;
      this.#opsz = 24;
   }
   static get observedAttributes() {
      return ['fill','wght','grad','opsz'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'fill':
            this.#fill = newValue;
            break;
         case 'wght':
            this.#wght = newValue;
            break;
         case 'grad':
            this.#grad = newValue;
            break;
         case 'opsz':
            this.#opsz = newValue;
            break;
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
   }
   set fill(x){this.setAttribute('fill',x)}
   set wght(x){this.setAttribute('wght',x)}
   set grad(x){this.setAttribute('grad',x)}
   set opsz(x){this.setAttribute('opsz',x)}
   get fill(){this.getAttribute('fill')}
   get wght(){this.getAttribute('wght')}
   get grad(){this.getAttribute('grad')}
   get opsz(){this.getAttribute('opsz')}
   #render() {
      if (this.hasAttribute('fill') && this.getAttribute('fill') == '') this.#fill = 1;
      this.#shadow.innerHTML = `
         <style>
            :host{
               display: inline-flex;
               flex-flow: row nowrap;
               justify-content: center;
               align-items: center;
               font-family: var(--m-symbol-font);
               font-weight: normal;
               font-style: normal;
               font-size: 1.4em;
               vertical-align: bottom;
               letter-spacing: normal;
               text-transform: none;
               white-space: nowrap;
               word-wrap: normal;
               box-sizing: border-box;
               direction: ltr;
               -webkit-font-feature-settings: 'liga';
               -webkit-font-smoothing: antialiased;
               font-variation-settings: 
                  'FILL' var(--m-symbol-fill,${this.#fill}),
                  'wght' var(--m-symbol-wght,${this.#wght}),
                  'GRAD' var(--m-symbol-grad,${this.#grad}),
                  'opsz' var(--m-symbol-opsz,${this.#opsz});
            }
         </style>
         <slot></slot>
      `;
   }
}