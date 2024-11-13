/*** m-button.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-button> 
export default class MButton extends HTMLElement {
   #tc;
   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.#tc = new TestColor();
      this.background = 'var(--m-primary)';
      this.color = 'var(--m-on-primary)';
      this.badge = undefined;
      this.badgeBackground = 'var(--m-error)';
      this.badgeColor = 'var(--m-on-error)';
      this.backgroundOpacity = 1;
      this.badgeAlign = 'right';
      this.badgeAlignStyle = 'right: -6px';
   }
   static get observedAttributes() {
      return ['color', 'badge', 'badge-color', 'badge-align', 'background-opacity'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            this.background = newValue;
            if (this.#tc.test(this.background)) {
               this.color = this.#tc.inner(this.background);
               this.background = this.#tc.bg(this.background);
            }
            break;
         case 'badge':
            this.badge = newValue;
            break;
         case 'badge-color':
            this.badgeBackground = newValue;
            if (this.#tc.test(this.badgeBackground)) {
               this.badgeColor = this.#tc.inner(this.badgeBackground);
               this.badgeBackground = this.#tc.bg(this.badgeBackground);
            }
            break;
         case 'badge-align':
            this.badgeAlign = newValue;
            switch (newValue) {
               case 'right':
                  this.badgeAlignStyle = 'right: -6px';
                  break;
               case 'left':
                  this.badgeAlignStyle = 'left: -6px';
                  break;
               case 'center':
                  this.badgeAlignStyle = 'left: 50%;translate: -50% 0';
                  break;
            }
            break;
         case 'background-opacity':
            this.backgroundOpacity = newValue;
            break;
      }
      this.#render();
   }
   connectedCallback() {
      this.#render();
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
                  background: ${this.background};
                  width: 100%;
                  height: 100%;
                  transition: 0.3s;
                  border-radius: calc(var(--m-radius) + 8px);
                  opacity: ${this.backgroundOpacity};
               }
               :host::part(inner) {
                  position: relative;
                  z-index: 2;
                  display: block;
                  padding: 0;
                  font-size: calc(var(--m-font-size) + 0px);
                  color:${this.color};
                  font-weight: 600;
                  user-select: none;
                  transition: 0.3s;
               }
               :host::part(badge) {
                  position: absolute;
                  top: -7px;
                  ${this.badgeAlignStyle};
                  z-index: 3;
                  display: flex;
                  flex-flow: row nowrap;
                  justify-content: center;
                  align-items: center;
                  gap: 4px;
                  height: 18px;
                  font-size: calc(var(--m-font-size) - 3px);
                  font-weight: 600;
                  user-select: none;
                  background: ${this.badgeBackground};
                  color: ${this.badgeColor};
                  border-radius: calc(var(--m-radius) + 4px);
                  padding: 0 9px;
               }
               :host(:active){
                  scale: 0.9;
                  border-radius: calc(var(--m-radius) + 4px);
               }
               :host(:active)::part(bg){
                  border-radius: calc(var(--m-radius) + 4px);
               }
               m-symbol{
                  
               }
            </style>
            <div part="bg"></div>
            <slot part="inner"></slot>
            ${this.badge != undefined ? '<slot part="badge">'+this.getAttribute('badge')+'</slot>':''}
        `;
   }
}