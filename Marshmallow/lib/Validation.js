/*** Validation v1 ***/
class Validation {
   #color;
   constructor() {
      this.version = '1';
      this.#color = new Colors();
   }
   bool(val) {
      return typeof val == 'boolean';
   }
   string(val) {
      return typeof val == 'string';
   }

   sprout(val) {
      return this.bool(val);
   }
   color(val) {
      return typeof val == 'string' && this.#color.test(val);
   }
   surfaceColor(val) {
      return typeof val == 'string' && this.#color.test(val) || /^(primary|secondary|tertiary|quaternary)$/i.test(val);
   }
   root(val) {
      try {
         document.querySelector(val);
         return true
      } catch {
         return false
      }
   }
   prefix(val) {
      return /^[a-z]*$/i.test(val);
   }
   theme(val) {
      return /^(dark|light|auto)$/i.test(val);
   }
   contrast(val) {
      return (val == 'auto') || (typeof val == 'number' && val >= 0 && val <= 100);
   }
   colorScheme(val) {
      return /^(analogous|complementary|tetradic|compound|split-complementary|monochromatic|triadic|square)$/i.test(val);
   }
   consoleLog(val) {
      return this.bool(val);
   }
   hasPalette(val) {
      return this.bool(val);
   }
   hasSubPalette(val) {
      return this.bool(val);
   }
   reverseSubPalette(val) {
      return this.bool(val);
   }
   parts(val) {
      return Array.isArray(val) && val.every(i => typeof i == 'number' && i >= 0 && i <= 100);
   }
   customColors(val) {
      return typeof val == 'object' && !Array.isArray(val) && Object.values(val).every(i => this.#color.test(i)) && Object.keys(val).every(i => /^[a-z][a-z0-9]*$/i.test(i));
   }
   followMainTheme(val) {
      return this.bool(val);
   }

   log(obj) {
      let log = {};
      for (let i in obj) {
         switch (i) {
            case 'sprout':
               log[i] = this.sprout(obj[i]);
               break;
            case 'color':
               log[i] = this.color(obj[i]);
               break;
            case 'surfaceColor':
               log[i] = this.surfaceColor(obj[i]);
               break;
            case 'root':
               log[i] = this.root(obj[i]);
               break;
            case 'prefix':
               log[i] = this.prefix(obj[i]);
               break;
            case 'theme':
               log[i] = this.theme(obj[i]);
               break;
            case 'contrast':
               log[i] = this.contrast(obj[i]);
               break;
            case 'colorScheme':
               log[i] = this.colorScheme(obj[i]);
               break;
            case 'hasPalette':
               log[i] = this.hasPalette(obj[i]);
               break;
            case 'hasSubPalette':
               log[i] = this.hasSubPalette(obj[i]);
               break;
            case 'reverseSubPalette':
               log[i] = this.reverseSubPalette(obj[i]);
               break;
            case 'consoleLog':
               log[i] = this.consoleLog(obj[i]);
               break;
            case 'parts':
               log[i] = this.parts(obj[i]);
               break;
            case 'customColors':
               log[i] = this.customColors(obj[i]);
               break;
            case 'followMainTheme':
               log[i] = this.followMainTheme(obj[i]);
               break;
         }
      }
      return log;
   }
   all(obj) {
      let log = this.log(obj);
      return Object.values(log).every(i => i);
   }
}