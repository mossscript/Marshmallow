/*** Marshmallow alpha ***/

// import lib
import Mushroom from './Mushroom.js';

// import components
import MApp from './components/m-app.js';

// Marshmallow class
export default class Marshmallow {
   #settings;
   constructor(primarySettings) {
      // Primary Settings 
      this.#settings = {
         color: 'crimson',
         theme: 'auto',
         contrast: 0,
         fontSize: 14,
         radius: 8,
      }
      Object.seal(this.#settings);
      Object.assign(this.#settings,primarySettings);
      
      // return 
      this.version = 'Alpha';
      this.mushroom;
      this.color = this.#settings.color;
      this.theme = this.#settings.theme;
      this.contrast = this.#settings.contrast;
      this.fontSize = this.#settings.fontSize;
      this.radius = this.#settings.radius;
      
      // mushroom 
      this.#setUpMushroom();
      
      // Grow
      this.#grow();
      
      // defineElements
      this.#defineElements();
   }
   #defineElements(){
      customElements.define('m-app', MApp);
   }
   #setUpMushroom(){
      this.mushroom = new Mushroom({
         color: this.color,
         theme: this.theme,
         contrast: this.contrast,
         sprout: false,
         root: 'm-app',
         prefix: 'm',
         hasSubPalette: true,
         reverseSubPalette: true,
         parts: [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100],
         customRoots: {
            'm-fixedcolor': {
               reverseSubPalette: false,
               hasPalette: false,
            },
         },
      });
   }
   #grow(){
      let code = '';
      let style = document.querySelector('#MUSHROOM-VARIABLE');
      if (!style) {
         style = document.createElement('style');
         document.head.appendChild(style)
         style.id = 'MUSHROOM-VARIABLE';
      }
      code += `/*** Marshmallow ${this.version} ***/\n`;
      code += '/* Variable */\n';
      code += `:root{\n`;
      code += `   --m-font-size: ${this.fontSize}px;\n`;
      code += `   --m-radius: ${this.radius}px;\n`;
      code += `}\n`;
      code += `/* Mushroom v${this.mushroom.version} */\n`;
      code += this.mushroom.code;
      style.innerHTML = code;
   }
}