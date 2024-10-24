/*** m-button.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-button> 
export default class MButton extends HTMLElement {
   #tc;#color;#background;
   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.#tc = new TestColor();
      this.#background = 'var(--m-primary)';
      this.#color = 'var(--m-on-primary)';
   }
   static get observedAttributes() {
      return ['color', 'badge'];
   }
   connectedCallback() {
      this.#render();
   }
   attributeChangedCallback(name, oldValue, newValue) {
      if (name == 'color') {
         
      }
      switch (name) {
         case 'color':
            this.#background = newValue;
            break;
         case 'badge':
            this.badge = newValue;
            break;
      }
      this.#render();
   }
   #render() {
      let background = this.#background;
      let color = this.#color;
      if (this.#tc.test(background)) {
         background = this.#tc.bg(this.#background);
         color = this.#tc.inner(this.#background);
      }
      this.shadow.innerHTML = `
            <style>
               :host{
                  display: inline-flex;
                  cursor: pointer;
                  box-sizing: border-box;
                  -webkit-tap-highlight-color: transparent;
                  position: relative;
                  border-radius: calc(var(--m-radius) + 8px);
                  height: 40px;
                  transition: 0.3s;
               }
               :host::part(bg) {
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 0;
                  display: block;
                  box-shadow: inset 0 0 0 20px ${background};
                  width: 100%;
                  height: 100%;
                  transition: 0.3s;
                  border-radius: calc(var(--m-radius) + 8px);
               }
               :host::part(inner) {
                  position: relative;
                  z-index: 2;
                  display: block;
                  padding: 12px 24px;
                  font-size: calc(var(--m-font-size) + 0px);
                  color:${color};
                  font-weight: 600;
                  user-select: none;
                  transition: 0.3s;
               }
               :host::part(badge) {
                  position: absolute;
                  top: -7px;
                  right: -7px;
                  z-index: 3;
                  display: flex;
                  flex-flow: row nowrap;
                  justify-content: center;
                  align-items: center;
                  gap: 4px;
                  height: 20px;
                  font-size: calc(var(--m-font-size) - 4px);
                  font-weight: 400;
                  user-select: none;
                  background: var(--m-error);
                  color: var(--m-on-error);
                  border-radius: calc(var(--m-radius) + 4px);
                  padding: 0 10px;
               }
               :host(:active){
                  scale: 0.9;
                  border-radius: calc(var(--m-radius) + 4px);
               }
               :host(:active)::part(bg){
                  border-radius: calc(var(--m-radius) + 4px);
               }
            </style>
            <div part="bg"></div>
            <slot part="inner"></slot>
            ${this.badge != undefined ? '<slot part="badge">'+this.getAttribute('badge')+'</slot>':''}
        `;
   }
}