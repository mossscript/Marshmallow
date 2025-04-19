/*** Mushroom v5.1 ***/
class Mushroom {
   // private variable 
   #Colors;
   #Validation;
   #eventTarget;
   #clearConsole;
   #hasGrown;
   #configs;
   #roots;
   #PCS;

   // constructor
   constructor(configs) {
      this.version = "5.1";
      this.#Colors = new Colors();
      this.#Validation = new Validation();
      this.#eventTarget = new EventTarget();
      this.#clearConsole = false;
      this.#PCS = window.matchMedia("(prefers-color-scheme:dark)");
      this.#configs = {
         sprout: true,
         color: 'Woodland',
         surfaceColor: 'primary',
         root: ':root',
         prefix: '',
         theme: 'auto',
         contrast: 'auto',
         colorScheme: 'Analogous',
         hasPalette: true,
         hasSubPalette: false,
         followMainTheme: true,
         reverseSubPalette: false,
         parts: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
         customColors: {},
      };
      this.#roots = {};
      this.#roots[this.#configs.root] = this.#configs;

      this.#setUp(configs);

      if (configs.clearConsole) {
         if (this.#Validation.sprout(configs.clearConsole)) {
            this.#clearConsole = configs.clearConsole;
         } else {
            this.#errorLib(10, configs.clearConsole);
         }
      }
      this.#PCS.onchange = () => {
         if (this.theme == 'auto') {
            this.#grow();
         }
      }
      this.#grow();
      this.#info(`Mushroom ${this.version}`);
   }

   // events
   set ongrow(callback) {
      this.#eventTarget.addEventListener('grow', callback);
      if (this.#hasGrown) this.#eventTarget.dispatchEvent(new Event("grow"));
   }
   get ongrow() {
      return undefined;
   }
   set onerror(callback) {
      this.#eventTarget.addEventListener('error', callback)
   }
   get onerror() {
      return undefined;
   }

   // setter & getter 
   set color(val) {
      this.setColor(val);
   }
   get color() {
      return this.#configs.color;
   }
   set surfaceColor(val) {
      this.setSurfaceColor(val);
   }
   get surfaceColor() {
      return this.#configs.surfaceColor;
   }
   set theme(val) {
      this.setTheme(val);
   }
   get theme() {
      return this.#configs.theme;
   }
   set colorScheme(val) {
      this.setColorScheme(val);
   }
   get colorScheme() {
      return this.#configs.colorScheme;
   }
   set hue(val) {
      this.setHue(val);
   }
   get hue() {
      return this.#Colors.toHslObj(this.#configs.color).h;
   }
   set saturation(val) {
      this.setSaturation(val);
   }
   get saturation() {
      return this.#Colors.toHslObj(this.#configs.color).s;
   }
   set lightness(val) {
      this.setLightness(val);
   }
   get lightness() {
      return this.#Colors.toHslObj(this.#configs.color).l;
   }
   set contrast(val) {
      this.setContrast(val);
   }
   get contrast() {
      return this.#configs.contrast;
   }
   set prefix(val) {
      this.setPrefix(val);
   }
   get prefix() {
      return this.#configs.prefix;
   }
   set root(val) {
      this.setRoot(val);
   }
   get root() {
      return this.#configs.root;
   }
   set parts(val) {
      this.setParts(val);
   }
   get parts() {
      return this.#configs.parts;
   }
   set sprout(val) {
      this.setSprout(val);
   }
   get sprout() {
      return this.#configs.sprout;
   }
   set palette(val) {
      this.setPalette(val);
   }
   get palette() {
      return this.getPalette();
   }
   set hasPalette(val) {
      this.setPalette(val);
   }
   get hasPalette() {
      return this.#configs.hasPalette;
   }
   set subPalette(val) {
      this.setSubPalette(val);
   }
   get subPalette() {
      return this.getSubPalette();
   }
   set hasSubPalette(val) {
      this.setSubPalette(val);
   }
   get hasSubPalette() {
      return this.#configs.hasSubPalette;
   }
   set reverseSubPalette(val) {
      this.setReverseSubPalette(val);
   }
   get reverseSubPalette() {
      return this.#configs.reverseSubPalette;
   }
   set customColors(val) {
      this.setCustomColors(val);
   }
   get customColors() {
      return this.#configs.customColors;
   }
   set darkmode(val) {
      this.setDarkmode(val);
   }
   get darkmode() {
      if (this.theme == 'auto') {
         return (this.#PCS.matches);
      } else {
         return (this.theme == 'dark') ? true : false;
      }
   }
   set followMainTheme(val) {
      this.setFollowMainTheme(val);
   }
   get followMainTheme() {
      return this.#configs.followMainTheme;
   }

   // property 
   setColor(val, root = this.#configs.root) {
      let valid = this.#Validation.color(val);
      if (valid) {
         this.#setting('color', val, root);
      } else {
         this.#errorLib(1, val);
      }
   }
   setSurfaceColor(val, root = this.#configs.root) {
      let valid = this.#Validation.surfaceColor(val);
      if (valid) {
         this.#setting('surfaceColor', val, root);
      } else {
         this.#errorLib(2, val);
      }
   }
   setTheme(val, root = this.#configs.root) {
      let valid = this.#Validation.theme(val);
      if (valid) {
         this.#setting('theme', val, root);
      } else {
         this.#errorLib(3, val);
      }
   }
   setColorScheme(val, root = this.#configs.root) {
      let valid = this.#Validation.colorScheme(val);
      console.log(valid,val)
      if (valid) {
         this.#setting('colorScheme', val, root);
      } else {
         this.#errorLib(4, val);
      }
   }
   setHue(val, root = this.#configs.root) {
      let { s, l } = this.#Colors.toHslObj(this.#roots[root].color);
      let h = (val >= 0) ? (val % 360) : 360 - ((-val) % 360);
      let hsl = `hsl(${h}deg ${s}% ${l}%)`;
      let valid = this.#Validation.color(hsl);
      if (valid) {
         this.#setting('color', hsl, root);
      } else {
         this.#errorLib(5, val);
      }
   }
   setSaturation(val, root = this.#configs.root) {
      let { h, l } = this.#Colors.toHslObj(this.#roots[root].color);
      let hsl = `hsl(${h}deg ${val}% ${l}%)`;
      let valid = this.#Validation.color(hsl);
      if (valid) {
         this.#setting('color', hsl, root);
      } else {
         this.#errorLib(6, val);
      }
   }
   setLightness(val, root = this.#configs.root) {
      let { h, s } = this.#Colors.toHslObj(this.#roots[root].color);
      let hsl = `hsl(${h}deg ${s}% ${val}%)`;
      let valid = this.#Validation.color(hsl);
      if (valid) {
         this.#setting('color', hsl, root);
      } else {
         this.#errorLib(6, val);
      }
   }
   setContrast(val, root = this.#configs.root) {
      let valid = this.#Validation.contrast(val);
      if (valid) {
         this.#setting('contrast', val, root);
      } else {
         this.#errorLib(6, val);
      }
   }
   setPrefix(val, root = this.#configs.root) {
      let valid = this.#Validation.prefix(val);
      if (valid) {
         this.#setting('prefix', val, root);
      } else {
         this.#errorLib(7, val);
      }
   }
   setParts(val, root = this.#configs.root) {
      let valid = this.#Validation.parts(val);
      if (valid) {
         this.#setting('parts', val.sort(), root);
      } else {
         this.#errorLib(9, val);
      }
   }
   setSprout(val, root = this.#configs.root) {
      let valid = this.#Validation.sprout(val);
      if (valid) {
         this.#setting('sprout', val, root);
      } else {
         this.#errorLib(10, val);
      }
   }
   setPalette(val, root = this.#configs.root) {
      let valid = this.#Validation.hasPalette(val);
      if (valid) {
         this.#setting('hasPalette', val, root);
      } else {
         this.#errorLib(10, val);
      }
   }
   setSubPalette(val, root = this.#configs.root) {
      let valid = this.#Validation.hasSubPalette(val);
      if (valid) {
         this.#setting('hasSubPalette', val, root);
      } else {
         this.#errorLib(10, val);
      }
   }
   setReverseSubPalette(val, root = this.#configs.root) {
      let valid = this.#Validation.reverseSubPalette(val);
      if (valid) {
         this.#setting('reverseSubPalette', val, root);
      } else {
         this.#errorLib(10, val);
      }
   }
   setDarkmode(val, root = this.#configs.root) {
      let valid = this.#Validation.bool(val);
      if (valid) {
         this.#setting('theme', val ? 'dark' : 'light', root);
      } else {
         this.#errorLib(10, val);
      }
   }
   setFollowMainTheme(val, root = this.#configs.root) {
      let valid = this.#Validation.followMainTheme(val);
      if (valid) {
         if (root != this.#configs.root) {
            this.#setting('followMainTheme', val, root);
         } else if (root == this.#configs.root) {
            for (let i in this.#roots) {
               if (this.#roots[i].followMainTheme == this.#configs.followMainTheme) this.#roots[i].followMainTheme = val;
               this.#setting('followMainTheme', val, root);
            }
         }
      } else {
         this.#errorLib(10, val);
      }
   }
   setCustomColors(val, root = this.#configs.root) {
      let valid = this.#Validation.customColors(val);
      if (valid) {
         this.#setting('customColors', val, root);
      } else {
         this.#errorLib(11, val);
      }
   }
   addCustomColors(key, val, root = this.#configs.root) {
      let arg = {};
      arg[key] = val;
      let obj = Object.assign(this.#roots[root].customColors, arg);
      let valid = this.#Validation.customColors(obj);
      if (valid) {
         this.#setting('customColors', obj, root);
      } else {
         this.#errorLib(11, val);
      }
   }
   removeCustomColors(key, root = this.#configs.root) {
      delete this.#roots[root].customColors[key];
      this.#grow();
   }
   clearCustomColors(val, root = this.#configs.root) {
      this.#roots[root].customColors = {};
      this.#grow();
   }
   toggleTheme(root = this.#configs.root) {
      this.setTheme(this.#roots[root].theme == 'light' ? 'dark' : 'light', root)
      this.#grow();
   }
   getPalette(root = this.#configs.root) {
      return this.#roots[root].palette;
   }
   getSubPalette(root = this.#configs.root) {
      return this.#roots[root].palette;
   }
   randomColor(root = this.#configs.root) {
      let h = Math.round(Math.random() * 360);
      let s = Math.round(Math.random() * 100);
      let l = Math.round(Math.random() * 100);
      this.setColor(this.#Colors.hslObjToHex(h, s, l), root);
   }

   // root
   addRoot(val, opt) {
      if (Object.keys(this.#roots).includes(val)) {
         this.#errorLib(12, val);
      } else if (this.#Validation.root(val)) {
         this.#roots[val] = {};
         Object.assign(this.#roots[val], this.#configs);
         if (opt) {
            let log = this.#Validation.log(opt);
            for (let i in log) {
               if (log[i]) {
                  this.#roots[val][i] = opt[i];
               } else {
                  this.roots(val)[i] = opt[i];
               }
            }
         }
         this.#grow();
      } else {
         this.#errorLib(8, val);
      }
   }
   removeRoot(val) {
      if (this.#configs.root !== val) {
         delete this.#roots[val]
      } else {
         this.#errorLib(13, val);
      }
   }
   renameRoot(root, val) {
      if (Object.keys(this.#roots).includes(root)) {
         if (!Object.keys(this.#roots).includes(val)) {
            if (this.#Validation.root(val)) {
               let obj = this.#roots[root];
               delete this.#roots[root]
               this.#roots[val] = obj;
               this.#roots[val].root = val;
            } else {
               this.#errorLib(8, root);
            }
         } else {
            this.#errorLib(14, root);
         }
      } else {
         this.#errorLib(15, root);
      }
   }
   setRoot(val, root = this.#configs.root) {
      this.renameRoot(root, val);

   }
   roots(root) {
      console.log(this.#roots[root].palette)
      let r = new this.#Root(this.#roots[root]);
      r.onsuccess = () => {
         this.#roots[root] = r.configs;
         if (root != r.configs.root) {
            this.renameRoot(root, r.configs.root)
         }
         this.#grow();
      }
      r.onerror = (e) => {
         this.#errorLib(e.detail.key, e.detail.wrong)
      }
      return r;
   }
   getAllRoots() {
      return this.#roots;
   }

   // class
   #Root = class {
      // private variable 
      #Colors;
      #Validation;
      #eventTarget

      // constructor
      constructor(configs) {
         this.configs = configs;
         this.#Colors = new Colors();
         this.#Validation = new Validation();
         this.#eventTarget = new EventTarget();
      }

      // event 
      set onerror(callback) {
         this.#eventTarget.addEventListener('error', callback)
      }
      get onerror() {
         return undefined;
      }
      set onsuccess(callback) {
         this.#eventTarget.addEventListener('success', callback)
      }
      get onsuccess() {
         return undefined;
      }

      // getter & setter
      set color(val) {
         this.setColor(val);
      }
      get color() {
         return this.configs.color;
      }
      set surfaceColor(val) {
         this.setSurfaceColor(val);
      }
      get surfaceColor() {
         return this.configs.surfaceColor;
      }
      set theme(val) {
         this.setTheme(val);
      }
      get theme() {
         return this.configs.theme;
      }
      set colorScheme(val) {
         this.setColorScheme(val);
      }
      get colorScheme() {
         return this.configs.colorScheme;
      }
      set hue(val) {
         this.setHue(val);
      }
      get hue() {
         return this.#Colors.toHslObj(this.configs.color).h;
      }
      set saturation(val) {
         this.setSaturation(val);
      }
      get saturation() {
         return this.#Colors.toHslObj(this.configs.color).s;
      }
      set lightness(val) {
         this.setLightness(val);
      }
      get lightness() {
         return this.#Colors.toHslObj(this.configs.color).l;
      }
      set contrast(val) {
         this.setContrast(val);
      }
      get contrast() {
         return this.configs.contrast;
      }
      set prefix(val) {
         this.setPrefix(val);
      }
      get prefix() {
         return this.configs.prefix;
      }
      set root(val) {
         this.setRoot(val);
      }
      get root() {
         return this.configs.root;
      }
      set parts(val) {
         this.setParts(val);
      }
      get parts() {
         return this.configs.parts;
      }
      set sprout(val) {
         this.setSprout(val);
      }
      get sprout() {
         return this.configs.sprout;
      }
      set palette(val) {
         this.setPalette(val);
      }
      get palette() {
         return this.this.configs.palette;
      }
      set hasPalette(val) {
         this.setPalette(val);
      }
      get hasPalette() {
         return this.configs.hasPalette;
      }
      set subPalette(val) {
         this.setSubPalette(val);
      }
      get subPalette() {
         return this.configs.subPalette;
      }
      set hasSubPalette(val) {
         this.setSubPalette(val);
      }
      get hasSubPalette() {
         return this.configs.hasSubPalette;
      }
      set reverseSubPalette(val) {
         this.setReverseSubPalette(val);
      }
      get reverseSubPalette() {
         return this.configs.reverseSubPalette;
      }
      set customColors(val) {
         this.setCustomColors(val);
      }
      get customColors() {
         return this.configs.customColors;
      }
      set darkmode(val) {
         this.setDarkmode(val);
      }
      get darkmode() {
         if (this.theme == 'auto') {
            return (this.#PCS.matches);
         } else {
            return (this.theme == 'dark') ? true : false;
         }
      }

      // property 
      setColor(val) {
         let valid = this.#Validation.color(val);
         if (valid) {
            this.configs.color = val;
            this.#success()
         } else {
            this.#error(1, val)
         }
      }
      setSurfaceColor(val) {
         let valid = this.#Validation.surfaceColor(val);
         if (valid) {
            this.configs.surfaceColor = val;
            this.#success();
         } else {
            this.#error(2, val);
         }
      }
      setTheme(val) {
         let valid = this.#Validation.theme(val);
         if (valid) {
            this.configs.theme = val;
            this.#success();
         } else {
            this.#error(3, val);
         }
      }
      setColorScheme(val) {
         let valid = this.#Validation.colorScheme(val);
         if (valid) {
            this.configs.colorScheme = val;
            this.#success();
         } else {
            this.#error(4, val);
         }
      }
      setHue(val) {
         let { s, l } = this.#Colors.toHslObj(configs.color);
         let h = (val >= 0) ? (val % 360) : 360 - ((-val) % 360);
         let hsl = `hsl(${h}deg ${s}% ${l}%)`;
         let valid = this.#Validation.color(hsl);
         if (valid) {
            this.configs.color = hsl;
            this.#success();
         } else {
            this.#error(5, val);
         }
      }
      setSaturation(val) {
         let { h, l } = this.#Colors.toHslObj(configs.color);
         let hsl = `hsl(${h}deg ${val}% ${l}%)`;
         let valid = this.#Validation.color(hsl);
         if (valid) {
            this.configs.color = hsl;
            this.#success();
         } else {
            this.#error(6, val);
         }
      }
      setLightness(val) {
         let { h, s } = this.#Colors.toHslObj(configs.color);
         let hsl = `hsl(${h}deg ${s}% ${val}%)`;
         let valid = this.#Validation.color(hsl);
         if (valid) {
            this.configs.color = hsl;
            this.#success();
         } else {
            this.#error(6, val);
         }
      }
      setContrast(val) {
         let valid = this.#Validation.contrast(val);
         if (valid) {
            this.configs.contrast = val;
            this.#success();
         } else {
            this.#error(6, val);
         }
      }
      setPrefix(val) {
         let valid = this.#Validation.prefix(val);
         if (valid) {
            this.configs.prefix = val;
            this.#success();
         } else {
            this.#error(7, val);
         }
      }
      setRoot(val) {
         let valid = this.#Validation.root(val);
         if (valid) {
            this.configs.root = val;
            this.#success();
         } else {
            this.#error(8, val);
         }
      }
      setParts(val) {
         let valid = this.#Validation.parts(val);
         if (valid) {
            this.configs.parts = val;
            this.#success();
         } else {
            this.#error(9, val);
         }
      }
      setSprout(val) {
         let valid = this.#Validation.sprout(val);
         if (valid) {
            this.configs.sprout = val;
            this.#success();
         } else {
            this.#error(10, val);
         }
      }
      setPalette(val) {
         let valid = this.#Validation.hasPalette(val);
         if (valid) {
            this.configs.hasPalette = val;
            this.#success();
         } else {
            this.#error(10, val);
         }
      }
      setSubPalette(val) {
         let valid = this.#Validation.hasSubPalette(val);
         if (valid) {
            this.configs.hasSubPalette = val;
            this.#success();
         } else {
            this.#error(10, val);
         }
      }
      setReverseSubPalette(val) {
         let valid = this.#Validation.reverseSubPalette(val);
         if (valid) {
            this.configs.reverseSubPalette = val;
            this.#success();
         } else {
            this.#error(10, val);
         }
      }
      setDarkmode(val) {
         let valid = this.#Validation.bool(val);
         if (valid) {
            this.configs.theme = val ? 'dark' : 'light';
            this.#success();
         } else {
            this.#error(10, val);
         }
      }
      setCustomColors(val) {
         let valid = this.#Validation.customColors(val);
         if (valid) {
            this.configs.customColors = val;
            this.#success();
         } else {
            this.#error(11, val);
         }
      }
      addCustomColors(key, val) {
         let arg = {};
         arg[key] = val;
         let obj = Object.assign(this.#roots[root].customColors, arg);
         let valid = this.#Validation.customColors(obj);
         if (valid) {
            this.configs.customColors = obj;
            this.#success();
         } else {
            this.#error(11, val);
         }
      }
      removeCustomColors(key) {
         delete this.configs.customColors[key];
         this.#success();
      }
      clearCustomColors(val) {
         this.configs.customColors = {};
         this.#success();
      }
      toggleTheme() {
         this.configs.theme = this.configs.theme == 'light' ? 'dark' : 'light';
         this.#success();
      }

      // event handler 
      #success() {
         let event = new CustomEvent('success', {});
         this.#eventTarget.dispatchEvent(event);
      }
      #error(key, wrong) {
         let event = new CustomEvent('error', { detail: { key, wrong } });
         this.#eventTarget.dispatchEvent(event);
      }
   }

   // private property
   #setUp(configs) {
      if (configs) {
         let log = this.#Validation.log(configs);
         for (let i in log) {
            if (log[i]) {
               this.#configs[i] = configs[i];
            } else {
               this[i] = configs[i];
            }
         }
         this.#roots[this.#configs.root] = this.#configs;
      }
      if (configs && configs.customRoots) {
         for (let root in configs.customRoots) {
            if (this.#Validation.root(root)) {
               this.#roots[root] = {};
               Object.assign(this.#roots[root], this.#configs);
               this.#roots[root].root = root
               let log = this.#Validation.log(configs.customRoots[root]);
               for (let i in log) {
                  if (log[i]) {
                     this.#roots[root][i] = configs.customRoots[root][i];
                  } else {
                     this.roots(root)[i] = configs.customRoots[root][i];
                  }
               }
            }
         }
      }
   }
   #setting(key, val, root) {
      for (let i in this.#roots) {
         if (this.#roots[i].followMainTheme && this.#roots[i][key] == this.#configs[key] && this.#roots[i].root != this.#configs.root) {
            this.#roots[i][key] = val;
         }
      }
      
      if (root == this.#configs.root) this.#configs[key] = val;
      this.#roots[root][key] = val;
      this.#grow();
   }
   #info(title, message) {
      if (!this.#clearConsole) {
         if (message != undefined) {
            console.log(
               `%c${title}%c\n %c${message}`,
               `background: ${this.palette['primary']}; color: ${this.palette['on-primary']}; font-weight: 900; padding: 4px; border-radius: 8px`,
               '',
               `background: ${this.palette['primary-container']}; color: ${this.palette['on-primary-container']}; font-weight: 400; padding: 4px; border-radius: 8px; font-family: sreif; font-size: 13px;`
            )
         } else {
            console.log(
               `%c${title}`,
               `background: ${this.palette['primary']}; color: ${this.palette['on-primary']}; font-weight: 900; padding: 4px; border-radius: 8px`
            )
         }
      }
   }
   #error(message) {
      if (!this.#clearConsole) {
         if (this.palette == undefined) this.#grow();
         console.log(
            `%cMushroom Error:%c\n %c${message}`,
            `background: ${this.palette['error']}; color: ${this.palette['on-error']}; font-weight: 900; padding: 4px; border-radius: 8px`,
            '',
            `background: ${this.palette['error-container']}; color: ${this.palette['on-error-container']}; font-weight: 400; padding: 4px; border-radius: 8px; font-family: sreif; font-size: 13px;`
         )
      }
   }
   #errorLib(key, wrong) {
      let lib = {
         1: `Invalid input: "${wrong}". The value must be a valid color in HEX, RGB, HSL, a recognized color name, or one of the following: primary, secondary, tertiary, quaternary.`,
         2: `Invalid input: "${wrong}". The value must be one of the following: "primary", "secondary", "tertiary", "quaternary"`,
         3: `Invalid input: "${wrong}". The value must be one of the following: light, dark, or auto.`,
         4: `Invalid input: "${wrong}". The value must be one of the following: analogous, complementary, tetradic, compound, split-complementary, monochromatic, triadic, or square.`,
         5: `Invalid input: "${wrong}". The value must be a number.`,
         6: `Invalid input: "${wrong}". Input must be a number between 0 and 100:`,
         7: `Invalid input: "${wrong}". The value must start with a letter and contain only letters and numbers.`,
         8: `Invalid input: "${wrong}". The value must be a valid CSS selector, including tag names, IDs, classes, attributes, combinators, pseudo-classes, or pseudo-elements.`,
         9: `Invalid input: "${wrong}". The value must be an array of numbers, where each number is between 0 and 100.`,
         10: `Invalid input: "${wrong}". The value must be either "true" or "false".`,
         11: `Invalid input: "${wrong}". The value must be an object where all keys are alphanumeric strings, and all values must be valid colors.`,
         12: `Invalid input: "${wrong}". This value already exists as a root.`,
         13: `Operation not allowed: "${wrong}". The main root cannot be removed.`,
         14: `Invalid input: The name "${wrong}" is already assigned to a root.`,
         15: `Not found: No root exists with the name "${wrong}".`,
         16: `Operation not allowed: You cannot manually change the theme of root "${wrong}" because its "followMainTheme" property is set to true.`,
      }
      this.#error(lib[key]);
      let event = new CustomEvent('error', { detail: { key, wrong: lib[key] } });
      this.#eventTarget.dispatchEvent(event);
   }
   #getDarkmode(root = this.#configs.root) {
      if (this.theme == 'auto') {
         return (this.#PCS.matches);
      } else {
         return (this.#roots[root].theme == 'dark') ? true : false;
      }
   }
   #getTheme(root = this.#configs.root) {
      if (this.theme == 'auto') {
         return (this.#PCS.matches) ? 'dark' : 'light';
      } else {
         return this.#roots[root].theme;
      }
   }
   #accentHue(root = this.#configs.root) {
      switch (this.#roots[root].colorScheme.toLowerCase()) {
         case 'analogous':
            return [0, 30, -30];
            break;
         case 'complementary':
            return [0, 180];
            break;
         case 'tetradic':
            return [0, 60, 180, 240];
            break;
         case 'compound':
            return [0, 150, -150];
            break;
         case 'split-complementary':
            return [0, 30, 180, 210];
            break;
         case 'monochromatic':
            return [0];
            break;
         case 'triadic':
            return [0, 120, -120];
            break;
         case 'square':
            return [0, 90, -90, 180];
            break;
         default:
            return [0, 30, -30];
      }
   }
   #palette(root) {
      let { h, s } = this.#Colors.toHslObj(root.color);
      let l = root.contrast != 'auto' ? root.contrast : this.#Colors.toHslObj(root.color).l;
      let accentName = ['primary', 'secondary', 'tertiary', 'quaternary'];
      let ah = this.#accentHue(root.root);
      let hueArr = ah.map(i => i + h > 360 ? i + h - 360 : i + h);
      let sh, ss, sl;
      if (this.#Colors.test(root.surfaceColor)) {
         sh = this.#Colors.toHslObj(root.surfaceColor).h;
         ss = this.#Colors.toHslObj(root.surfaceColor).s;
         sl = root.contrast != 'auto' ? root.contrast : this.#Colors.toHslObj(root.surfaceColor).l;
      } else {
         ss = s;
         sl = l;
         switch (root.surfaceColor) {
            case 'primary':
               sh = h;
               break;
            case 'secondary':
               if (hueArr.length > 1) sh = hueArr[1];
               break;
            case 'tertiary':
               if (hueArr.length > 2) sh = hueArr[2];
               break;
            case 'quaternary':
               if (hueArr.length > 3) sh = hueArr[3];
               break;
            default:
               sh = h;
         }
      }
      let mode = this.#getTheme(root.root).toLowerCase();
      let result = {};
      let data = {
         name: {
            accent: accentName.slice(0, ah.length),
            error: 'error',
            surface: 'surface',
            background: 'background',
            outline: 'outline',
            custom: []
         },
         hue: {
            accent: hueArr,
            error: 0,
            surface: sh,
            background: sh,
            outline: h,
            custom: []
         },
         saturation: {
            accent: s,
            error: 100,
            surface: ss / 3,
            background: ss / 3,
            outline: [s / 3, s / 2],
            custom: [],
         },
         lightness: {
            light: {
               accent: [
                  [35, 100],
                  [80 + l / 10, 20 - l / 10]
               ],
               accentLD: [
                  [45, 100],
                  [25, 100]
               ],
               surface: [
                  [87 + sl / 10, 30 - sl / 10],
                  [85 + sl / 10, 30 - sl / 10],
                  [83 + sl / 10, 30 - sl / 10],
                  [80 + sl / 10, 30 - sl / 10],
                  [78 + sl / 10, 30 - sl / 10]
               ],
               background: [90 + sl / 10, 20 - sl / 10],
               outline: [60, 80],
               inverse: [70, 10],
               inverseSurface: [15 - sl / 10, 65 + sl / 10]
            },
            dark: {
               accent: [
                  [70, 10],
                  [20 - l / 10, 70 + l / 10]
               ],
               accentLD: [
                  [80, 10],
                  [60, 10]
               ],
               surface: [
                  [15 - sl / 10, 65 + sl / 10],
                  [17 - sl / 10, 65 + sl / 10],
                  [19 - sl / 10, 65 + sl / 10],
                  [21 - sl / 10, 65 + sl / 10],
                  [30 - sl / 10, 65 + sl / 10]
               ],
               background: [10 - sl / 10, 70 + sl / 10],
               outline: [40, 20],
               inverse: [35, 100],
               inverseSurface: [87 + sl / 10, 30 - sl / 10]
            },
         },
         alpha: {
            accent: 1,
            error: 1,
            surface: 1,
            background: 1,
            outline: 1,
            inverse: 1,
            custom: []
         },
         flag: {
            a: ['', 'on-'],
            b: ['', '-container'],
            c: ['', '-container-low', '-container', '-container-high', '-variant'],
            d: ['', '-variant'],
            e: 'inverse-',
            f: ['light-', 'dark-']
         }
      };
      for (let i in data.name.accent) {
         for (let j in data.flag.b) {
            for (let k in data.flag.a) {
               result[data.flag.a[k] + data.name.accent[i] + data.flag.b[j]] = this.#Colors.hslObjToHex(data.hue.accent[i], data.saturation.accent, data.lightness[mode].accent[j][k], data.alpha.accent);
            }
         }
         for (let j in data.flag.f) {
            for (let k in data.flag.a) {
               result[data.flag.a[k] + data.flag.f[j] + data.name.accent[i]] = this.#Colors.hslObjToHex(data.hue.accent[i], data.saturation.accent, data.lightness[mode].accentLD[j][k], data.alpha.accent);
            }
         }
      }
      for (let i in data.flag.b) {
         for (let j in data.flag.a) {
            result[data.flag.a[j] + data.name.error + data.flag.b[i]] = this.#Colors.hslObjToHex(data.hue.error, data.saturation.error, data.lightness[mode].accent[i][j], data.alpha.error);
         }
      }
      for (let j in data.flag.f) {
         for (let k in data.flag.a) {
            result[data.flag.a[k] + data.flag.f[j] + data.name.error] = this.#Colors.hslObjToHex(data.hue.error, data.saturation.error, data.lightness[mode].accentLD[j][k], data.alpha.error);
         }
      }
      for (let i in data.name.accent) {
         for (let j in data.flag.a) {
            result[data.flag.a[j] + data.flag.e + data.name.accent[i]] = this.#Colors.hslObjToHex(data.hue.accent[i], data.saturation.accent, data.lightness[mode].inverse[j], data.alpha.accent);
         }
      }
      for (let i in data.flag.a) {
         result[data.flag.a[i] + data.flag.e + data.name.error] = this.#Colors.hslObjToHex(data.hue.error, data.saturation.error, data.lightness[mode].inverse[i], data.alpha.error);
      }
      for (let j in data.flag.a) {
         result[data.flag.a[j] + data.flag.e + data.name.surface] = this.#Colors.hslObjToHex(data.hue.surface, data.saturation.surface, data.lightness[mode].inverseSurface[j], data.alpha.surface);
      }
      for (let i in data.flag.a) {
         result[data.flag.a[i] + data.name.background] = this.#Colors.hslObjToHex(data.hue.background, data.saturation.background, data.lightness[mode].background[i], data.alpha.background);
      }
      for (let i in data.flag.c) {
         for (let j in data.flag.a) {
            result[data.flag.a[j] + data.name.surface + data.flag.c[i]] = this.#Colors.hslObjToHex(data.hue.surface, data.saturation.surface, data.lightness[mode].surface[i][j], data.alpha.surface);
         }
      }
      for (let i in data.flag.d) {
         result[data.name.outline + data.flag.d[i]] = this.#Colors.hslObjToHex(data.hue.outline, data.saturation.outline[i], data.lightness[mode].outline[i], data.alpha.outline);
      }
      for (let i in root.customColors) {
         let limit = Object.keys(result);
         let allowed = ['primary', 'secondary', 'tertiary', 'quaternary', 'error'];
         if (limit.includes(i) == false || allowed.includes(i)) {
            data.name.custom.push(i);
            data.hue.custom.push(this.#Colors.toHslObj(root.customColors[i]).h);
            data.saturation.custom.push(this.#Colors.toHslObj(root.customColors[i]).s);
            data.alpha.custom.push(this.#Colors.toHslObj(root.customColors[i]).a);
         } else {
            if (root == this) {
               // error
            } else {
               // error for custom root
            }
         }
      }
      for (let i in data.name.custom) {
         for (let j in data.flag.b) {
            for (let k in data.flag.a) {
               result[data.flag.a[k] + data.name.custom[i] + data.flag.b[j]] = this.#Colors.hslObjToHex(data.hue.custom[i], data.saturation.custom[i], data.lightness[mode].accent[j][k], data.alpha.custom[i]);
            }
         }
         for (let j in data.flag.f) {
            for (let k in data.flag.a) {
               result[data.flag.a[k] + data.flag.f[j] + data.name.custom[i]] = this.#Colors.hslObjToHex(data.hue.custom[i], data.saturation.custom, data.lightness[mode].accentLD[j][k], data.alpha.custom);
            }
         }
      }
      for (let i in data.name.custom) {
         for (let j in data.flag.a) {
            result[data.flag.a[j] + data.flag.e + data.name.custom[i]] = this.#Colors.hslObjToHex(data.hue.custom[i], data.saturation.custom[i], data.lightness[mode].inverse[j], data.alpha.custom[i]);
         }
      }
      return result;
   }
   #subPalette(root) {
      let { h, s } = this.#Colors.toHslObj(root.color);
      let accentName = ['primary', 'secondary', 'tertiary', 'quaternary'];
      let ah = this.#accentHue(root.root);
      let hueArr = ah.map(i => i + h > 360 ? i + h - 360 : i + h);
      let sh, ss
      if (this.#Colors.test(root.surfaceColor)) {
         sh = this.#Colors.toHslObj(root.surfaceColor).h;
         ss = this.#Colors.toHslObj(root.surfaceColor).s;
      } else {
         ss = s;
         switch (root.surfaceColor) {
            case 'primary':
               sh = h;
               break;
            case 'secondary':
               if (hueArr.length > 1) sh = hueArr[1];
               break;
            case 'tertiary':
               if (hueArr.length > 2) sh = hueArr[2];
               break;
            case 'quaternary':
               if (hueArr.length > 3) sh = hueArr[3];
               break;
            default:
               sh = h;
         }
      }
      let mode = this.#getTheme(root.root).toLowerCase();
      let result = {};
      let data = {
         name: {
            accent: accentName.slice(0, ah.length),
            error: 'error',
            custom: [],
            neutral: ['neutral', 'neutral-variant']
         },
         hue: {
            accent: hueArr,
            error: 0,
            custom: [],
            neutral: sh
         },
         saturation: {
            accent: s,
            error: 100,
            custom: [],
            neutral: [ss / 4, ss / 2]
         },
         alpha: {
            accent: 1,
            error: 1,
            custom: [],
            neutral: 1
         }
      };
      for (let i in root.customColors) {
         data.name.custom.push(i);
         data.hue.custom.push(this.#Colors.toHslObj(root.customColors[i]).h);
         data.saturation.custom.push(this.#Colors.toHslObj(root.customColors[i]).s);
         data.alpha.custom.push(this.#Colors.toHslObj(root.customColors[i]).a);
      }
      if (!root.reverseSubPalette || !mode) {
         for (let i in data.name.accent) {
            for (let j in root.parts) {
               result[data.name.accent[i] + '-' + root.parts[j]] = this.#Colors.hslObjToHex(data.hue.accent[i], data.saturation.accent, root.parts[j], data.alpha.accent);
            }
         }
         for (let i in root.parts) {
            result[data.name.error + '-' + root.parts[i]] = this.#Colors.hslObjToHex(data.hue.error, data.saturation.error, root.parts[i], data.alpha.error);
         }
         for (let i in data.name.custom) {
            for (let j in root.parts) {
               result[data.name.custom[i] + '-' + root.parts[j]] = this.#Colors.hslObjToHex(data.hue.custom[i], data.saturation.custom[i], root.parts[j], data.alpha.custom[i]);
            }
         }
         for (let i in data.name.neutral) {
            for (let j in root.parts) {
               result[data.name.neutral[i] + '-' + root.parts[j]] = this.#Colors.hslObjToHex(data.hue.neutral, data.saturation.neutral[i], root.parts[j], data.alpha.neutral);
            }
         }
      } else if (mode) {
         for (let i in data.name.accent) {
            for (let j in root.parts) {
               result[data.name.accent[i] + '-' + root.parts[j]] = this.#Colors.hslObjToHex(data.hue.accent[i], data.saturation.accent, root.parts[root.parts.length - 1] - root.parts[j], data.alpha.accent[i]);
            }
         }
         for (let i in root.parts) {
            result[data.name.error + '-' + root.parts[i]] = this.#Colors.hslObjToHex(data.hue.error, data.saturation.error, root.parts[root.parts.length - 1] - root.parts[i], data.alpha.error);
         }
         for (let i in data.name.custom) {
            for (let j in root.parts) {
               result[data.name.custom[i] + '-' + root.parts[j]] = this.#Colors.hslObjToHex(data.hue.custom[i], data.saturation.custom[i], root.parts[root.parts.length - 1] - root.parts[j], data.alpha.custom[i]);
            }
         }
         for (let i in data.name.neutral) {
            for (let j in root.parts) {
               result[data.name.neutral[i] + '-' + root.parts[j]] = this.#Colors.hslObjToHex(data.hue.neutral, data.saturation.neutral[i], root.parts[root.parts.length - 1] - root.parts[j], data.alpha.neutral);
            }
         }
      }
      return result;
   }
   #code(obj, root) {
      let keys = Object.keys(obj);
      let values = Object.values(obj);
      let code = `\n${root.root} {\n`;
      let prefix = (root.prefix == '') ? '' : root.prefix + '-';
      for (let i in keys) {
         code += `   --${prefix}${keys[i]}: ${values[i]};\n`;
      }
      code += '}';
      return code;
   }
   #sprout() {
      let CSS = document.querySelector('#MUSHROOM');
      if (!CSS) {
         CSS = document.createElement('style');
         CSS.id = 'MUSHROOM';
         let head = document.querySelector('head');
         head.appendChild(CSS);
      }
      let code = `/**** Mushroom v${this.version} ****/`;
      for (let i in arguments) {
         code += '\n' + arguments[i];
      }
      CSS.innerHTML = code;
      return code;
   }
   #grow() {
      let code = '';
      for (let root in this.#roots) {
         this.#roots[root].palette = this.#palette(this.#roots[root]);
         this.#roots[root].subPalette = this.#subPalette(this.#roots[root]);
      }
      for (let root in this.#roots) {
         code += this.#code(this.#roots[root].palette, this.#roots[root]);
         code += this.#code(this.#roots[root].subPalette, this.#roots[root]);
      }
      for (var root in this.#roots) {
         if (this.#roots[root].sprout && code != '') {
            this.#sprout(code);
         }
      }
      this.code = code;
      this.#hasGrown = true;
      let event = new CustomEvent('grow', {});
      this.#eventTarget.dispatchEvent(event);
   }
}