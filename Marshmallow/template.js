/*** Marshmallow [[["VERSION"]]] ***/
((global) => {
   /*** lib ***/
   [[["LIBS"]]]

   /*** components ***/
   [[["COMPONENTS"]]]

   /***  Marshmallow class ***/
   class Marshmallow {
      // privet variable
      #M;
      #hasGrown;
      #eventTarget;

      // constructor
      constructor(configs) {
         this.version = '[[["VERSION"]]]';
         this.#eventTarget = new EventTarget();
         this.configs = {
            color: 'Medium Red Violet',
            theme: 'light',
            colorScheme: 'analogous',
            surfaceColor: 'primary',
            contrast: 0,
         };
         Object.assign(this.configs, configs)

         this.#M = new Mushroom({
            clearConsole: false,
            color: this.configs.color,
            theme: this.configs.theme,
            contrast: this.configs.contrast,
            surfaceColor: this.configs.surfaceColor,
            colorScheme: this.configs.colorScheme,
            sprout: false,
            prefix: 'm',
            hasSubPalette: true,
            reverseSubPalette: true,
            parts: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
            customRoots: {
               '.m-fixed': {
                  followMainTheme: true,
                  reverseSubPalette: false,
                  hasPalette: true,
               },
            },
         });
         
         console.log(this.#M.toggleTheme())

         this.#M.ongrow = () => {
            console.log('Grow')
            this.#grow();
         }
         this.#M.onerror = (e) => this.#error(e.detail.wrong);
         this.#defineElements();
      }

      // event
      set ongrow(callback) {
         this.#eventTarget.addEventListener('grow', callback);
         if (this.#hasGrown) this.#eventTarget.dispatchEvent(new Event("grow"));
      }
      get ongrow() {
         return undefined;
      }

      // getter & setter 
      set color(val) {
         this.setColor(val);
      }
      get color() {
         return this.#M.color;
      }
      set theme(val) {
         this.setTheme(val);
      }
      get theme() {
         return this.#M.theme;
      }
      set darkmode(val) {
         this.setDarkmode(val);
      }
      get darkmode() {
         return this.#M.darkmode;
      }
      set surfaceColor(val) {
         this.setSurfaceColor(val);
      }
      get surfaceColor() {
         return this.#M.surfaceColor;
      }
      set contrast(val) {
         this.setContrast(val);
      }
      get contrast() {
         return this.#M.contrast;
      }

      // property
      setColor(val) {
         this.#M.setColor(val);
      }
      setTheme(val) {
         this.#M.setTheme(val);
      }
      setDarkmode(val) {
         this.#M.setDarkmode(val);
      }
      setSurfaceColor(val) {
         this.#M.setSurfaceColor(val);
      }
      setContrast(val) {
         this.#M.setContrast(val);
      }
      toggleTheme() {
         this.#M.toggleTheme();
      }
      randomColor() {
         this.#M.randomColor();
      }

      // privet property
      #defineElements() {
         [[["DEFINE-ELEMENTS"]]]
      }
      #info(title, message) {
         if (message != undefined) {
            console.log(
               `%c${title}%c\n %c${message}`,
               `background: ${this.#M.palette['primary']}; color: ${this.#M.palette['on-primary']}; font-weight: 900; padding: 4px; border-radius: 8px`,
               '',
               `background: ${this.#M.palette['primary-container']}; color: ${this.#M.palette['on-primary-container']}; font-weight: 400; padding: 4px; border-radius: 8px; font-family: sreif; font-size: 13px;`
            )
         } else {
            console.log(
               `%c${title}`,
               `background: ${this.#M.palette['primary']}; color: ${this.#M.palette['on-primary']}; font-weight: 900; padding: 4px; border-radius: 8px`
            )
         }
      }
      #error(message) {
         console.log(
            `%cMarshmallow Error:%c\n %c${message}`,
            `background: var(--m-error); color: var(--m-on-error); font-weight: 900; padding: 4px; border-radius: 8px`,
            '',
            `background: var(--m-error-container); color: var(--m-on-error-container); font-weight: 400; padding: 4px; border-radius: 8px; font-family: sreif; font-size: 13px;`
         )
      }
      #grow() {
         let code = '';
         let style = document.querySelector('#MARSHMALLOW');
         if (!style) {
            style = document.createElement('style');
            document.head.appendChild(style)
            style.id = 'MARSHMALLOW';
         }
         code += '/*** Marshmallow Style ***/';
         code += this.#M.code;
         code += `::selection{background:var(--m-secondary,var(--m-primary));color:var(--m-on-scondary,var(--m-on-primary));}`;
         code += '*{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}';
         code += 'body{padding:0;margin:0;width:100vw;height:100vh}';
         style.textContent = code;
         this.#hasGrown = true;
         let event = new CustomEvent('grow', {});
         this.#eventTarget.dispatchEvent(event);
      }
   }

   global.Marshmallow = Marshmallow;
})(this);