/*** m-button.js alpha 0.00 ***/
// import lib
import TestColor from '../TestColor.js';

// <m-button> 
export default class MButton extends HTMLElement {
   #tc;#settings;
   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.#tc = new TestColor();
      this.#settings = {
         background: 'var(--m-primary)',
         color: 'var(--m-on-primary)',
         badgeBackground: 'var(--m-error)',
         badgeColor: 'var(--m-on-error)',
         badgeAlign: 'right',
         badge: undefined,
      }
      Object.seal(this.#settings)
   }
   static get observedAttributes() {
      return ['color', 'badge', 'badge-color', 'badge-align'];
   }
   connectedCallback() {
      this.#render();
   }
   attributeChangedCallback(name, oldValue, newValue) {
      if (name == 'color') {
         
      }
      switch (name) {
         case 'color':
            this.#settings.background = newValue;
            break;
         case 'badge':
            this.#settings.badge = newValue;
            break;
         case 'badge-color':
            this.#settings.badgeBackground = newValue;
            break;
         case 'badge-align':
            this.#settings.badgeAlign = newValue;
            break;
      }
      this.#render();
   }
   #render() {
      let background = this.#settings.background;
      let color = this.#settings.color;
      let badgeBackground = this.#settings.badgeBackground;
      let badgeColor = this.#settings.badgeColor;
      let badgeAlignStyle = '';
      if (this.#tc.test(background)) {
         background = this.#tc.bg(this.#settings.background);
         color = this.#tc.inner(this.#settings.background);
      }
      if (this.#tc.test(badgeBackground)) {
         badgeBackground = this.#tc.bg(this.#settings.badgeBackground);
         badgeColor = this.#tc.inner(this.#settings.badgeBackground);
      }
      if (this.hasAttribute('badge-align')) {
         switch (this.getAttribute('badge-align')) {
            case 'right':
               badgeAlignStyle = 'right: -6px';
               break;
            case 'left':
               badgeAlignStyle = 'left: -6px';
               break;
            case 'center':
               badgeAlignStyle = 'left: 50%;translate: -50% 0';
               break;
         }
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
                  ${badgeAlignStyle};
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
                  background: ${badgeBackground};
                  color: ${badgeColor};
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
            </style>
            <div part="bg"></div>
            <slot part="inner"></slot>
            ${this.#settings.badge != undefined ? '<slot part="badge">'+this.getAttribute('badge')+'</slot>':''}
        `;
   }
}