/*** Marshmallow alpha ***/

// import lib
import Mushroom from './Mushroom.js';

// import components
import MApp from './components/m-app.js';
import MBadge from './components/m-badge.js'; 
import MSymbol from './components/m-symbol.js';
import MLinearProgress from './components/m-linear-progress.js';
import MCircularProgress from './components/m-circular-progress.js';

// Marshmallow class
export default class Marshmallow {
   #settings;#PCS;
   constructor(primarySettings) {
      // Primary Settings 
      this.#settings = {
         color: 'crimson',
         theme: 'auto',
         contrast: 0,
         fontSize: 14,
         radius: 8,
         symbolType: 'rounded',
         symbolsPath: {
            rounded: 'Marshmallow/symbol/symbols-rounded.woff2',
            outlined: 'Marshmallow/symbol/symbols-outlined.woff2',
            sharp: 'Marshmallow/symbol/symbols-sharp.woff2',
         },
      }
      Object.seal(this.#settings);
      Object.assign(this.#settings, primarySettings);

      // return 
      this.version = 'Alpha';
      this.mushroom;
      this.color = this.#settings.color;
      this.theme = this.#settings.theme;
      this.contrast = this.#settings.contrast;
      this.fontSize = this.#settings.fontSize;
      this.radius = this.#settings.radius;
      this.symbolType = this.#settings.symbolType;
      this.symbolsPath = this.#settings.symbolsPath;

      // mushroom 
      this.#setUpMushroom();

      // Grow
      this.#grow();

      // defineElements
      this.#defineElements();
      
      // change theme
      this.#PCS = window.matchMedia("(prefers-color-scheme:dark)");
      this.#PCS.onchange = () => {
         if (this.#settings.theme === 'auto') {
            this.#grow();
         }
      }
   }
   setColor(color){
      this.mushroom.setColor(color);
      this.color = this.mushroom.color;
      this.#grow();
   }
   #defineElements() {
      customElements.define('m-app', MApp);
      customElements.define('m-badge', MBadge);
      customElements.define('m-symbol', MSymbol);
      customElements.define('m-linear-progress', MLinearProgress);
      customElements.define('m-circular-progress', MCircularProgress);
   }
   #setUpMushroom() {
      this.mushroom = new Mushroom({
         color: this.color,
         theme: this.theme,
         contrast: this.contrast,
         sprout: false,
         root: 'm-app',
         prefix: 'm',
         hasSubPalette: true,
         reverseSubPalette: true,
         parts: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
         customRoots: {
            '.m-fixedcolor': {
               reverseSubPalette: false,
               hasPalette: false,
            },
         },
      });
   }
   #grow() {
      let code = '';
      let symbolsPath = '';
      let style = document.querySelector('#MUSHROOM-VARIABLE');
      if (!style) {
         style = document.createElement('style');
         document.head.appendChild(style)
         style.id = 'MUSHROOM';
      }
      for (let i in this.symbolsPath) {
         symbolsPath += `
         @font-face {
            font-family: 'm-symbol-${i}';
            font-style: normal;
            font-weight: 100 700;
            src: url(${this.symbolsPath[i]}) format(woff2);
         }`
      }
      code += `
      /*** Marshmallow ${this.version} ***/
      /* Fonts */
      ${symbolsPath}
      /* Variable */
      :root{
         --m-font-size: ${this.fontSize}px;
         --m-radius: ${this.radius}px;
         --m-symbol-font: 'm-symbol-${this.symbolType}';
      }
      /* Mushroom v${this.mushroom.version} */
      ${this.mushroom.code}
      /* body */
      body{
         padding: 0;
         margin: 0;
         width: 100vw;
         height: 100vh;
      }`;
      style.innerHTML = code;
   }
}