/*** Mushroom V5 Alpha ***/
export default class Mushroom {
   #settings;
   #customRootsSettings;
   #PCS;
   #startTime;
   #colors = {
      'aliceblue': [240, 248, 255],
      'antiquewhite': [250, 235, 215],
      'aqua': [0, 255, 255],
      'aquamarine': [127, 255, 212],
      'azure': [240, 255, 255],
      'beige': [245, 245, 220],
      'bisque': [255, 228, 196],
      'black': [0, 0, 0],
      'blanchedalmond': [255, 235, 205],
      'blue': [0, 0, 255],
      'blueviolet': [138, 43, 226],
      'brown': [165, 42, 42],
      'burlywood': [222, 184, 135],
      'cadetblue': [95, 158, 160],
      'chartreuse': [127, 255, 0],
      'chocolate': [210, 105, 30],
      'coral': [255, 127, 80],
      'cornflowerblue': [100, 149, 237],
      'cornsilk': [255, 248, 220],
      'crimson': [220, 20, 60],
      'cyan': [0, 255, 255],
      'darkblue': [0, 0, 139],
      'darkcyan': [0, 139, 139],
      'darkgoldenrod': [184, 134, 11],
      'darkgray': [169, 169, 169],
      'darkgreen': [0, 100, 0],
      'darkgrey': [169, 169, 169],
      'darkkhaki': [189, 183, 107],
      'darkmagenta': [139, 0, 139],
      'darkolivegreen': [85, 107, 47],
      'darkorange': [255, 140, 0],
      'darkorchid': [153, 50, 204],
      'darkred': [139, 0, 0],
      'darksalmon': [233, 150, 122],
      'darkseagreen': [143, 188, 143],
      'darkslateblue': [72, 61, 139],
      'darkslategray': [47, 79, 79],
      'darkslategrey': [47, 79, 79],
      'darkturquoise': [0, 206, 209],
      'darkviolet': [148, 0, 211],
      'deeppink': [255, 20, 147],
      'deepskyblue': [0, 191, 255],
      'dimgray': [105, 105, 105],
      'dimgrey': [105, 105, 105],
      'dodgerblue': [30, 144, 255],
      'firebrick': [178, 34, 34],
      'floralwhite': [255, 250, 240],
      'forestgreen': [34, 139, 34],
      'fuchsia': [255, 0, 255],
      'gainsboro': [220, 220, 220],
      'ghostwhite': [248, 248, 255],
      'gold': [255, 215, 0],
      'goldenrod': [218, 165, 32],
      'gray': [128, 128, 128],
      'green': [0, 128, 0],
      'greenyellow': [173, 255, 47],
      'grey': [128, 128, 128],
      'honeydew': [240, 255, 240],
      'hotpink': [255, 105, 180],
      'indianred': [205, 92, 92],
      'indigo': [75, 0, 130],
      'ivory': [255, 255, 240],
      'khaki': [240, 230, 140],
      'lavender': [230, 230, 250],
      'lavenderblush': [255, 240, 245],
      'lawngreen': [124, 252, 0],
      'lemonchiffon': [255, 250, 205],
      'lightblue': [173, 216, 230],
      'lightcoral': [240, 128, 128],
      'lightcyan': [224, 255, 255],
      'lightgoldenrodyellow': [250, 250, 210],
      'lightgray': [211, 211, 211],
      'lightgreen': [144, 238, 144],
      'lightgrey': [211, 211, 211],
      'lightpink': [255, 182, 193],
      'lightsalmon': [255, 160, 122],
      'lightseagreen': [32, 178, 170],
      'lightskyblue': [135, 206, 250],
      'lightslategray': [119, 136, 153],
      'lightslategrey': [119, 136, 153],
      'lightsteelblue': [176, 196, 222],
      'lightyellow': [255, 255, 224],
      'lime': [0, 255, 0],
      'limegreen': [50, 205, 50],
      'linen': [250, 240, 230],
      'magenta': [255, 0, 255],
      'maroon': [128, 0, 0],
      'mediumaquamarine': [102, 205, 170],
      'mediumblue': [0, 0, 205],
      'mediumorchid': [186, 85, 211],
      'mediumpurple': [147, 112, 219],
      'mediumseagreen': [60, 179, 113],
      'mediumslateblue': [123, 104, 238],
      'mediumspringgreen': [0, 250, 154],
      'mediumturquoise': [72, 209, 204],
      'mediumvioletred': [199, 21, 133],
      'midnightblue': [25, 25, 112],
      'mintcream': [245, 255, 250],
      'mistyrose': [255, 228, 225],
      'moccasin': [255, 228, 181],
      'navajowhite': [255, 222, 173],
      'navy': [0, 0, 128],
      'oldlace': [253, 245, 230],
      'olive': [128, 128, 0],
      'olivedrab': [107, 142, 35],
      'orange': [255, 165, 0],
      'orangered': [255, 69, 0],
      'orchid': [218, 112, 214],
      'palegoldenrod': [238, 232, 170],
      'palegreen': [152, 251, 152],
      'paleturquoise': [175, 238, 238],
      'palevioletred': [219, 112, 147],
      'papayawhip': [255, 239, 213],
      'peachpuff': [255, 218, 185],
      'peru': [205, 133, 63],
      'pink': [255, 192, 203],
      'plum': [221, 160, 221],
      'powderblue': [176, 224, 230],
      'purple': [128, 0, 128],
      'rebeccapurple': [102, 51, 153],
      'red': [255, 0, 0],
      'rosybrown': [188, 143, 143],
      'royalblue': [65, 105, 225],
      'saddlebrown': [139, 69, 19],
      'salmon': [250, 128, 114],
      'sandybrown': [244, 164, 96],
      'seagreen': [46, 139, 87],
      'seashell': [255, 245, 238],
      'sienna': [160, 82, 45],
      'silver': [192, 192, 192],
      'skyblue': [135, 206, 235],
      'slateblue': [106, 90, 205],
      'slategray': [112, 128, 144],
      'slategrey': [112, 128, 144],
      'snow': [255, 250, 250],
      'springgreen': [0, 255, 127],
      'steelblue': [70, 130, 180],
      'tan': [210, 180, 140],
      'teal': [0, 128, 128],
      'thistle': [216, 191, 216],
      'tomato': [255, 99, 71],
      'turquoise': [64, 224, 208],
      'violet': [238, 130, 238],
      'wheat': [245, 222, 179],
      'white': [255, 255, 255],
      'whitesmoke': [245, 245, 245],
      'yellow': [255, 255, 0],
      'yellowgreen': [154, 205, 50]
   }
   constructor(primarySettings) {
      this.#startTime = performance.now();
      this.version = '5';
      this.#settings = {
         sprout: true,
         color: 'Royal Blue',
         root: ':root',
         prefix: '',
         theme: 'auto',
         contrast: 'auto',
         colorScheme: 'Analogous',
         hasPalette: true,
         hasSubPalette: false,
         reverseSubPalette: false,
         parts: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
         customColor: {},
         dynamicColor: false,
      };
      this.#customRootsSettings = {};

      this.#setupSettings(primarySettings);
      if (!!primarySettings && !!primarySettings.customRoots) {
         this.#setupCustomRootsSettings(primarySettings.customRoots);
      }

      this.#PCS = window.matchMedia("(prefers-color-scheme:dark)");
      this.#PCS.onchange = () => {
         if (this.#settings.theme === 'auto') {
            this.#getDarkmode();
            this.#grow();
         }
         for (let i in this.#customRootsSettings) {
            if (this.#customRootsSettings[i].theme === 'auto') {
               this.#getDarkmode(this.#customRootsSettings[i]);
               this.#grow();
            }
         }
      }
      this.#grow();
   }
   setColor(color) {
      let start = performance.now();
      let result = this.#setSettings({ color: color });
      if (result) {
         this.#grow();
      }
   }
   setTheme(val) {
      let result = this.#setSettings({ theme: val });
      if (result) {
         this.#grow();
      }
   }
   toggleTheme() {
      let result = this.#setSettings({ theme: (this.#settings.darkmode) ? 'light' : 'dark' });
      if (result) {
         this.#grow();
      }
   }
   setParts(arr) {
      let result = this.#setSettings({ parts: arr });
      if (result) {
         this.#grow();
      }
   }
   setPalette(bool) {
      let result = this.#setSettings({ hasPalette: bool });
      if (result) {
         this.#grow();
      }
   }
   setSubPalette(bool) {
      let result = this.#setSettings({ hasSubPalette: boll });
      if (result) {
         this.#grow();
      }
   }
   setReverseSubPalette(bool) {
      let result = this.#setSettings({ reverseSubPalette: bool });
      if (result) {
         this.#grow();
      }
   }
   setHue(num) {
      num = (num >= 0) ? (num % 360) + 1 : 360 - ((-num) % 360);
      let result = this.#setSettings({ color: `hsl(${num},${this.#getHsl(this.#settings.color).s}%,${this.#getHsl(this.#settings.color).l}%)` });
      if (result) {
         this.#grow();
      }
   }
   setSaturation(num) {
      num = (num >= 0) ? (num % 100) + 1 : 100 - ((-num) % 100);
      let result = this.#setSettings({ color: `hsl(${this.#getHsl(this.#settings.color).h},${num}%,${this.#getHsl(this.#settings.color).l}%)` });
      if (result) {
         this.#grow();
      }
   }
   setLightness(num) {
      num = (num >= 0) ? (num % 100) + 1 : 100 - ((-num) % 100);
      let result = this.#setSettings({ color: `hsl(${this.#getHsl(this.#settings.color).h},${this.#getHsl(this.#settings.color).s}%,${num}%)` });
      if (result) {
         this.#grow();
      }
   }
   setContrast(val) {
      let result = this.#setSettings({ contrast: val });
      if (result) {
         this.#grow();
      }
   }
   random() {
      let h = Math.round(Math.random() * 360);
      let s = Math.round(Math.random() * 100);
      let l = Math.round(Math.random() * 100);
      let result = this.#setSettings({ color: this.#toHex(h, s, l) });
      if (result) {
         this.#grow();
      }
   }
   addCustomColor(key, color) {
      let arg = {};
      arg[key] = color;
      let obj = Object.assign(this.#settings.customColor, arg);
      let result = this.#setSettings({ customColor: obj });
      if (result) {
         this.#grow();
      }
   }
   setCustomColor(obj) {
      let result = this.#setSettings({ customColor: obj });
      if (result) {
         this.#grow();
      }
   }
   setColorScheme(val) {
      let result = this.#setSettings({ colorScheme: val });
      if (result) {
         this.#grow();
      }
   }
   removeCustomColor(key) {
      let obj = this.#settings.customColor;
      delete obj[key]
      let result = this.#setSettings({ customColor: obj });
      if (result) {
         this.#grow();
      }
   }
   clearCustomColor() {
      let result = this.#setSettings({ customColor: {} });
      if (result) {
         this.#grow();
      }
   }
   setDynamicColor(img) {
      let result = this.#setSettings({ dynamicColor: img });
      if (result) {
         this.#grow();
      }
   }
   addRoot(root, settings) {
      let result = this.#setCustomRootsSettings(root, settings);
      if (result) {
         this.#grow();
      }
   }
   removeRoot(root) {
      delete this.#customRootsSettings[root];
      this.#grow();
   }
   renameRoot(oldVal, newVal) {
      if (/^(?:[a-z_][a-z0-9_-]*|\*[a-z0-9_-]*|\.[a-z_][a-z0-9_-]*|#[a-z_][a-z0-9_-]*)$/i.test(newVal)) {
         this.#customRootsSettings[newVal] = this.#customRootsSettings[oldVal];
         this.#customRootsSettings[oldVal];
         this.#grow();
      } else {
         // write error 
      }
   }
   roots(root) {
      let obj = {
         addSettings: (key, value) => {
            let result = this.#setCustomRootsSettings(root, { key: value });
            if (result) {
               this.#grow();
            }
         },
         removeSettings: (key) => {
            delete this.#customRootsSettings[root][settings];
            this.#grow();
         },
         setColor: (color) => {
            let result = this.#setCustomRootsSettings(root, { color: color });
            if (result) {
               this.#grow();
            }
         },
         setTheme: (val) => {
            let result = this.#setCustomRootsSettings(root, { theme: val });
            if (result) {
               this.#grow();
            }
         },
         toggleTheme: () => {
            let result = this.#setCustomRootsSettings(root, { theme: (this.#settings.darkmode) ? 'light' : 'dark' });
            if (result) {
               this.#grow();
            }
         },
         setParts: (arr) => {
            let result = this.#setCustomRootsSettings(root, { parts: arr });
            if (result) {
               this.#grow();
            }
         },
         setPalette: (bool) => {
            let result = this.#setCustomRootsSettings(root, { hasPalette: bool });
            if (result) {
               this.#grow();
            }
         },
         setSubPalette: (bool) => {
            let result = this.#setCustomRootsSettings(root, { hasSubPalette: bool });
            if (result) {
               this.#grow();
            }
         },
         setReverseSubPalette: (bool) => {
            let result = this.#setCustomRootsSettings(root, { reverseSubPalette: bool });
            if (result) {
               this.#grow();
            }
         },
         setHue: (num) => {
            num = (num >= 0) ? (num % 360) + 1 : 360 - ((-num) % 360);
            let result = this.#setCustomRootsSettings(root, { color: `hsl(${num},${this.#getHsl(this.#settings.color).s}%,${this.#getHsl(this.#settings.color).l}%)` });
            if (result) {
               this.#grow();
            }
         },
         setSaturation: (num) => {
            num = (num >= 0) ? (num % 100) + 1 : 100 - ((-num) % 100);
            let result = this.#setCustomRootsSettings(root, { color: `hsl(${this.#getHsl(this.#settings.color).h},${num}%,${this.#getHsl(this.#settings.color).l}%)` });
            if (result) {
               this.#grow();
            }
         },
         setLightness: (num) => {
            num = (num >= 0) ? (num % 100) + 1 : 100 - ((-num) % 100);
            let result = this.#setCustomRootsSettings(root, { color: `hsl(${this.#getHsl(this.#settings.color).h},${this.#getHsl(this.#settings.color).s}%,${num}%)` });
            if (result) {
               this.#grow();
            }
         },
         setContrast: (num) => {
            let result = this.#setCustomRootsSettings(root, { contrast: val });
            if (result) {
               this.#grow();
            }
         },
         random: () => {
            let h = Math.round(Math.random() * 360);
            let s = Math.round(Math.random() * 100);
            let l = Math.round(Math.random() * 100);
            let result = this.#setCustomRootsSettings(root, { color: this.#toHex(h, s, l) });
            if (result) {
               this.#grow();
            }
         },
         addCustomColor: (key, color) => {
            let obj = Object.assign(this.#settings.customColor, { key: color });
            let result = this.#setCustomRootsSettings(root, { customColor: obj });
            if (result) {
               this.#grow();
            }
         },
         setCustomColor: (obj) => {
            let result = this.#setCustomRootsSettings(root, { customColor: obj });
            if (result) {
               this.#grow();
            }
         },
         setColorScheme: (val) => {
            let result = this.#setCustomRootsSettings(root, { colorScheme: val });
            if (result) {
               this.#grow();
            }
         },
         removeCustomColor: (key) => {
            let obj = this.#settings.customColor;
            delete obj[key]
            let result = this.#setCustomRootsSettings(root, { customColor: obj });
            if (result) {
               this.#grow();
            }
         },
         clearCustomColor: () => {
            let result = this.#setCustomRootsSettings(root, { customColor: {} });
            if (result) {
               this.#grow();
            }
         },
         setDynamicColor: (img) => {
            let result = this.#setCustomRootsSettings(root, { dynamicColor: img });
            if (result) {
               this.#grow();
            }
         },
         remove: () => {
            delete this.#customRootsSettings[root];
            this.#grow();
         },
         rename: (str) => {
            if (/^(?:[a-z_][a-z0-9_-]*|\*[a-z0-9_-]*|\.[a-z_][a-z0-9_-]*|#[a-z_][a-z0-9_-]*)$/i.test(newVal)) {
               this.#customRootsSettings[str] = this.#customRootsSettings[root];
               this.#customRootsSettings[root];
               this.#grow();
            } else {
               // write error
            }
         },
      }
      return Object.assign(obj, this.#customRootsSettings[root])
   };
   #setSettings(settings) {
      let log = this.#setupSettings(settings);
      return Object.values(log).every(item => item);
   }
   #setCustomRootsSettings(root, settings) {
      let obj = {};
      obj[root] = settings;
      let log = this.#setupCustomRootsSettings(obj);
      return Object.values(log).every(item => item);
   }
   #setupSettings(settings) {
      let log = {}
      for (let i in settings) {
         switch (i) {
            case 'sprout':
               if (typeof settings[i] == 'boolean') {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'color':
               if (this.#testColor(settings[i])) {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'root':
               if (/^(?:[a-z_][a-z0-9_-]*|\*[a-z0-9_-]*|\.[a-z_][a-z0-9_-]*|#[a-z_][a-z0-9_-]*)$/i.test(settings[i])) {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'prefix':
               if (/^[a-z_-][a-z0-9_-]*$/i.test(settings[i])) {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'theme':
               if (/^(dark|light|auto)$/i.test(settings[i])) {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break
            case 'contrast':
               if ((settings[i] == 'auto') || (typeof settings[i] == 'number' && settings[i] >= 0 && settings[i] <= 100)) {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'colorScheme':
               if (/^(analogous|complementary|tetradic|compound|split-complementary|monochromatic|triadic|square)$/i.test(settings[i])) {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'hasPalette':
               if (typeof settings[i] == 'boolean') {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'hasSubPalette':
               if (typeof settings[i] == 'boolean') {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'reverseSubPalette':
               if (typeof settings[i] == 'boolean') {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'parts':
               if (Array.isArray(settings[i]) && settings[i].every(item => typeof item === 'number')) {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'customColor':
               if (typeof settings[i] == 'object' && !Array.isArray(settings[i]) && Object.values(settings[i]).every(item => this.#testColor(item)) && Object.keys(settings[i]).every(item => /^[a-z][a-z0-9]*$/i.test(item))) {
                  this.#settings[i] = settings[i];
                  log[i] = true;
               } else {
                  log[i] = false;
               }
               break;
            case 'dynamicColor':
               if (typeof settings[i] == 'string') {
                  let img = new Image();
                  img.src = settings[i];
                  img.onload = () => {
                     let dc = this.#getColorOfImage(img);
                     let accentColor = dc.accent;
                     let neutraColor = dc.neutra;
                     let accentName = ['secondary', 'tertiary', 'quaternary'];
                     if (accentColor.length == 0 && neutraColor.length == 0) {
                        // write error
                     } else {
                        this.#settings.colorScheme = 'monochromatic';
                        if (accentColor.length == 0) {
                           this.#settings.color = neutraColor[0];
                        } else if (accentColor.length == 1) {
                           this.#settings.color = accentColor[0];
                        } else if (accentColor.length > 1) {
                           this.#settings.color = accentColor[0];
                           accentColor.shift();
                           let obj = {};
                           for (let i = 0; i < Math.min(accentColor.length, 3); i++) {
                              obj[accentName[i]] = accentColor[i];
                           }
                           this.#settings.customColor = obj;
                        }
                        log[i] = true;
                     }
                  }
               } else if (settings[i] instanceof Element) {
                  let dc = this.#getColorOfImage(settings[i]);
                  let accentColor = dc.accent;
                  let neutraColor = dc.neutra;
                  let accentName = ['secondary', 'tertiary', 'quaternary'];
                  if (accentColor.length == 0 && neutraColor.length == 0) {
                     // write error
                  } else {
                     this.#settings.colorScheme = 'monochromatic';
                     if (accentColor.length == 0) {
                        this.#settings.color = neutraColor[0];
                     } else if (accentColor.length == 1) {
                        this.#settings.color = accentColor[0];
                     } else if (accentColor.length > 1) {
                        this.#settings.color = accentColor[0];
                        accentColor.shift();
                        let obj = {};
                        for (let i = 0; i < Math.min(accentColor.length, 3); i++) {
                           obj[accentName[i]] = accentColor[i];
                        }
                        this.#settings.customColor = obj;
                     }
                     log[i] = true;
                  }
               } else {
                  log[i] = false;
               }
               break;
            default:
               // write error
         }
      }
      return log;
   }
   #setupCustomRootsSettings(obj) {
      let log = {};
      let arrID = Object.keys(obj);
      if (arrID.length != 0) {
         for (let j of arrID) {
            let settings = obj[j];
            if (/^(?:[a-z_][a-z0-9_-]*|\*[a-z0-9_-]*|\.[a-z_][a-z0-9_-]*|#[a-z_][a-z0-9_-]*)$/i.test(j)) {
               this.#customRootsSettings[j] = {};
               Object.assign(this.#customRootsSettings[j], this.#settings);
               this.#customRootsSettings[j]['root'] = j;
               log['root'] = true;
               for (let i in settings) {
                  switch (i) {
                     case 'sprout':
                        if (typeof settings[i] == 'boolean') {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           log[i] = false;
                        }
                        break;
                     case 'color':
                        if (this.#testColor(settings[i])) {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           this.#customRootsSettings[j][i] = this.#settings[i];
                           log[i] = false;
                        }
                        break;
                     case 'prefix':
                        if (/^[a-z_-][a-z0-9_-]*$/i.test(settings[i])) {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           this.#customRootsSettings[j][i] = this.#settings[i];
                           log[i] = false;
                        }
                        break;
                     case 'theme':
                        if (/^(dark|light|auto)$/i.test(settings[i])) {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           this.#customRootsSettings[j][i] = this.#settings[i];
                           log[i] = false;
                        }
                        break
                     case 'contrast':
                        if ((settings[i] == 'auto') || (typeof settings[i] == 'number' && settings[i] >= 0 && settings[i] <= 100)) {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           this.#customRootsSettings[j][i] = this.#settings[i];
                           log[i] = false;
                        }
                        break;
                     case 'colorScheme':
                        if (/^(analogous|complementary|tetradic|compound|split-complementary|monochromatic|triadic|square)$/i.test(settings[i])) {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           this.#customRootsSettings[j][i] = this.#settings[i];
                           log[i] = false;
                        }
                        break;
                     case 'hasPalette':
                        if (typeof settings[i] == 'boolean') {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           this.#customRootsSettings[j][i] = this.#settings[i];
                           log[i] = false;
                        }
                        break;
                     case 'hasSubPalette':
                        if (typeof settings[i] == 'boolean') {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           this.#customRootsSettings[j][i] = this.#settings[i];
                           log[i] = false;
                        }
                        break;
                     case 'reverseSubPalette':
                        if (typeof settings[i] == 'boolean') {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           this.#customRootsSettings[j][i] = this.#settings[i];
                           log[i] = false;
                        }
                        break;
                     case 'parts':
                        if (Array.isArray(settings[i]) && settings[i].every(item => typeof item === 'number')) {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           this.#customRootsSettings[j][i] = this.#settings[i];
                           log[i] = false;
                        }
                        break;
                     case 'customColor':
                        if (typeof settings[i] === 'object' && !Array.isArray(settings[i]) && Object.values(settings[i]).every(item => !this.#testColor(item)) && Object.keys(settings[i]).every(item => /^[a-z][a-z0-9]*$/i.test(item))) {
                           this.#customRootsSettings[j][i] = settings[i];
                           log[i] = true;
                        } else {
                           this.#customRootsSettings[j][i] = this.#settings[i];
                           log[i] = false;
                        }
                        break;
                     case 'dynamicColor':
                        if (typeof settings[i] == 'string') {
                           let img = new Image();
                           img.src = settings[i];
                           img.onload = () => {
                              let dc = this.#getColorOfImage(img);
                              let accentColor = dc.accent;
                              let neutraColor = dc.neutra;
                              let accentName = ['secondary', 'tertiary', 'quaternary'];
                              if (accentColor.length == 0 && neutraColor.length == 0) {
                                 // write error
                              } else {
                                 this.#customRootsSettings[j]['colorScheme'] = 'monochromatic';
                                 if (accentColor.length == 0) {
                                    this.#customRootsSettings[j]['color'] = neutraColor[0];
                                 } else if (accentColor.length == 1) {
                                    this.#customRootsSettings[j]['color'] = accentColor[0];
                                 } else if (accentColor.length > 1) {
                                    this.#customRootsSettings[j]['color'] = accentColor[0];
                                    accentColor.shift();
                                    let obj = {};
                                    for (let i = 0; i < Math.min(accentColor.length, 3); i++) {
                                       obj[accentName[i]] = accentColor[i];
                                    }
                                    this.#customRootsSettings[j]['customColor'] = obj;
                                 }
                                 log[i] = true;
                              }
                           }
                        } else if (settings[i] instanceof Element) {
                           let dc = this.#getColorOfImage(settings[i]);
                           let accentColor = dc.accent;
                           let neutraColor = dc.neutra;
                           let accentName = ['secondary', 'tertiary', 'quaternary'];
                           if (accentColor.length == 0 && neutraColor.length == 0) {
                              // write error
                           } else {
                              this.#customRootsSettings[j]['colorScheme'] = 'monochromatic';
                              if (accentColor.length == 0) {
                                 this.#customRootsSettings[j]['color'] = neutraColor[0];
                              } else if (accentColor.length == 1) {
                                 this.#customRootsSettings[j]['color'] = accentColor[0];
                              } else if (accentColor.length > 1) {
                                 this.#customRootsSettings[j]['color'] = accentColor[0];
                                 accentColor.shift();
                                 let obj = {};
                                 for (let i = 0; i < Math.min(accentColor.length, 3); i++) {
                                    obj[accentName[i]] = accentColor[i];
                                 }
                                 this.#customRootsSettings[j]['customColor'] = obj;
                              }
                              log[i] = true;
                           }
                        } else {
                           log[i] = false;
                        }
                        break;
                     default:
                        // write error
                  }
               }
            } else {
               log['root'] = false;
            }
         }
      }
      return log
   }
   #getDarkmode(root = this.#settings) {
      if (root.theme == 'auto') {
         root.darkmode = (this.#PCS.matches);
      } else {
         root.darkmode = (root.theme == 'dark') ? true : false;
      }
   }
   #hexToHsl(hex) {
      hex = hex.replace('#', '');
      if (hex.length === 3) {
         hex = hex.replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3');
      } else if (hex.length === 4) {
         hex = hex.replace(/^(.)(.)(.)(.)$/, '$1$1$2$2$3$3$4$4');
      }
      let result;
      if (hex.length === 6) {
         result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      } else if (hex.length === 8) {
         result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      }
      let r = parseInt(result[1], 16);
      let g = parseInt(result[2], 16);
      let b = parseInt(result[3], 16);
      let a = result[4] ? parseInt(result[4], 16) / 255 : 1;
      r /= 255;
      g /= 255;
      b /= 255;
      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      if (max == min) {
         h = s = 0;
      } else {
         let d = max - min;
         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
         switch (max) {
            case r:
               h = (g - b) / d + (g < b ? 6 : 0);
               break;
            case g:
               h = (b - r) / d + 2;
               break;
            case b:
               h = (r - g) / d + 4;
               break;
         }
         h /= 6;
      }
      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      return { h: h, s: s, l: l, a: a };
   }
   #rgbToHsl(rgb) {
      let nums = rgb.match(/\d+(\.\d+)?/g).map(Number);
      let r = nums[0];
      let g = nums[1];
      let b = nums[2];
      let a = nums[3] ? nums[3] : 1;
      r /= 255;
      g /= 255;
      b /= 255;
      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      if (max == min) {
         h = s = 0;
      } else {
         let d = max - min;
         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
         switch (max) {
            case r:
               h = (g - b) / d + (g < b ? 6 : 0);
               break;
            case g:
               h = (b - r) / d + 2;
               break;
            case b:
               h = (r - g) / d + 4;
               break;
         }
         h /= 6;
      }
      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      return { h: h, s: s, l: l, a: a }
   }
   #hslToHsl(hsl) {
      let nums = hsl.match(/\d+(\.\d+)?/g).map(Number);
      let h = nums[0];
      let s = nums[1];
      let l = nums[2];
      let a = nums[3] ? nums[3] : 1;
      return { h: h, s: s, l: l, a: a }
   }
   #nameToHsl(name) {
      let rgb = this.#colors[name.replaceAll(' ', '').toLowerCase()];
      let r = rgb[0];
      let g = rgb[1];
      let b = rgb[2];
      let a = 1;
      r /= 255;
      g /= 255;
      b /= 255;
      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      if (max == min) {
         h = s = 0;
      } else {
         let d = max - min;
         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
         switch (max) {
            case r:
               h = (g - b) / d + (g < b ? 6 : 0);
               break;
            case g:
               h = (b - r) / d + 2;
               break;
            case b:
               h = (r - g) / d + 4;
               break;
         }
         h /= 6;
      }
      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      return { h: h, s: s, l: l, a: a }
   }
   #toHex(h, s, l, a = 1) {
      h /= 360;
      s /= 100;
      l /= 100;
      let r, g, b;
      if (s === 0) {
         r = g = b = l;
      } else {
         let hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
         };
         let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
         let p = 2 * l - q;
         r = hue2rgb(p, q, h + 1 / 3);
         g = hue2rgb(p, q, h);
         b = hue2rgb(p, q, h - 1 / 3);
      }
      let toHex = x => {
         let hex = Math.round(x * 255).toString(16);
         return hex.length === 1 ? '0' + hex : hex;
      };
      if (a !== 1) {
         return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
      } else {
         return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      }
   }
   #testColor(color) {
      switch (true) {
         case /^#([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i.test(color):
            return 'hex';
            break;
         case /^rgba?\(\s*(2[0-4]\d|25[0-5]|1?\d{1,2})\s*,?\s*(2[0-4]\d|25[0-5]|1?\d{1,2})\s*,?\s*(2[0-4]\d|25[0-5]|1?\d{1,2})\s*(?:,?\s*(0|1|0?\.\d+)\s*)?\)$|^rgba?\(\s*(2[0-4]\d|25[0-5]|1?\d{1,2})\s+\d{1,3}\s+\d{1,3}\s*(?:\/\s*(0|1|0?\.\d+)\s*)?\)$/i.test(color):
            return 'rgb';
            break;
         case /^hsla?\(\s*(360|3[0-5]\d|[12]?\d{1,2})(deg)?\s*,?\s*(100|[1-9]?\d)%\s*,?\s*(100|[1-9]?\d)%\s*(?:,?\s*(0|1|0?\.\d+)\s*)?\)$|^hsla?\(\s*(360|3[0-5]\d|[12]?\d{1,2})(deg)?\s+\d{1,3}%\s+\d{1,3}%\s*(?:\/\s*(0|1|0?\.\d+)\s*)?\)$/i.test(color):
            return 'hsl';
            break;
         case !!(this.#colors[color.replaceAll(' ', '').toLowerCase()]):
            return 'name';
            break;
         default:
            return undefined;
      }
   }
   #getHsl(color) {
      let type = this.#testColor(color);
      switch (type) {
         case 'hex':
            return this.#hexToHsl(color);
            break;
         case 'rgb':
            return this.#rgbToHsl(color);
            break;
         case 'hsl':
            return this.#hslToHsl(color);
            break;
         case 'name':
            return this.#nameToHsl(color);
            break;
         default:
            return undefined;
      }
   }
   #accentHue() {
      switch (this.#settings.colorScheme.toLowerCase()) {
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
            this.#settings.colorScheme = 'Analogous';
            return [0, 30, -30];
      }
   }
   #palette(root = this.#settings) {
      let h = this.#getHsl(root.color).h;
      let s = this.#getHsl(root.color).s;
      let l = root.contrast != 'auto' ? root.contrast : this.#getHsl(root.color).l;
      let accentName = ['primary', 'secondary', 'tertiary', 'quaternary'];
      let ah = this.#accentHue();
      let mode = root.darkmode ? 'dark' : 'light';
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
            accent: ah.map(i => i + h > 360 ? i + h - 360 : i + h),
            error: 0,
            surface: h,
            background: h,
            outline: h,
            custom: []
         },
         saturation: {
            accent: s,
            error: 100,
            surface: s / 3,
            background: s / 3,
            outline: [s / 3, s / 2],
            custom: [],
         },
         lightness: {
            light: {
               accent: [[35, 100], [80 + l / 10, 20 - l / 10]],
               accentLD: [[45, 100], [25, 100]],
               surface: [
                  [85 + l / 10, 30 - l / 10],
                  [83 + l / 10, 30 - l / 10],
                  [80 + l / 10, 30 - l / 10],
                  [78 + l / 10, 30 - l / 10],
                  [70 + l / 10, 30 - l / 10]],
               background: [90 + l / 10, 20 - l / 10],
               outline: [60, 80],
               inverse: [70, 10],
               inverseSurface: [15 + l / 10, 80 - l / 10]
            },
            dark: {
               accent: [[70, 10], [20 - l / 10, 70 + l / 10]],
               accentLD: [[80, 10], [60, 10]],
               surface: [
                  [15 - l / 10, 65 + l / 10],
                  [17 - l / 10, 65 + l / 10],
                  [19 - l / 10, 65 + l / 10],
                  [21 - l / 10, 65 + l / 10],
                  [30 - l / 10, 65 + l / 10]],
               background: [10 - l / 10, 70 + l / 10],
               outline: [40, 20],
               inverse: [35, 100],
               inverseSurface: [85 - l / 10, 25 + l / 10]
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
               result[data.flag.a[k] + data.name.accent[i] + data.flag.b[j]] = this.#toHex(data.hue.accent[i], data.saturation.accent, data.lightness[mode].accent[j][k], data.alpha.accent);
            }
         }
         for (let j in data.flag.f) {
            for (let k in data.flag.a) {
               result[data.flag.a[k] + data.flag.f[j] + data.name.accent[i]] = this.#toHex(data.hue.accent[i], data.saturation.accent, data.lightness[mode].accentLD[j][k], data.alpha.accent);
            }
         }
      }
      for (let i in data.flag.b) {
         for (let j in data.flag.a) {
            result[data.flag.a[j] + data.name.error + data.flag.b[i]] = this.#toHex(data.hue.error, data.saturation.error, data.lightness[mode].accent[i][j], data.alpha.error);
         }
      }
      for (let j in data.flag.f) {
         for (let k in data.flag.a) {
            result[data.flag.a[k] + data.flag.f[j] + data.name.error] = this.#toHex(data.hue.error, data.saturation.error, data.lightness[mode].accentLD[j][k], data.alpha.error);
         }
      }
      for (let i in data.name.accent) {
         for (let j in data.flag.a) {
            result[data.flag.a[j] + data.flag.e + data.name.accent[i]] = this.#toHex(data.hue.accent[i], data.saturation.accent, data.lightness[mode].inverse[j], data.alpha.accent);
         }
      }
      for (let i in data.flag.a) {
         result[data.flag.a[i] + data.flag.e + data.name.error] = this.#toHex(data.hue.error, data.saturation.error, data.lightness[mode].inverse[i], data.alpha.error);
      }
      for (let j in data.flag.a) {
         result[data.flag.a[j] + data.flag.e + data.name.surface] = this.#toHex(data.hue.surface, data.saturation.surface, data.lightness[mode].inverseSurface[j], data.alpha.surface);
      }
      for (let i in data.flag.a) {
         result[data.flag.a[i] + data.name.background] = this.#toHex(data.hue.background, data.saturation.background, data.lightness[mode].background[i], data.alpha.background);
      }
      for (let i in data.flag.c) {
         for (let j in data.flag.a) {
            result[data.flag.a[j] + data.name.surface + data.flag.c[i]] = this.#toHex(data.hue.surface, data.saturation.surface, data.lightness[mode].surface[i][j], data.alpha.surface);
         }
      }
      for (let i in data.flag.d) {
         result[data.name.outline + data.flag.d[i]] = this.#toHex(data.hue.outline, data.saturation.outline[i], data.lightness[mode].outline[i], data.alpha.outline);
      }
      for (let i in root.customColor) {
         let limit = Object.keys(result);
         let allowed = ['primary', 'secondary', 'tertiary', 'quaternary', 'error'];
         if (limit.includes(i) == false || allowed.includes(i)) {
            data.name.custom.push(i);
            data.hue.custom.push(this.#getHsl(root.customColor[i]).h);
            data.saturation.custom.push(this.#getHsl(root.customColor[i]).s);
            data.alpha.custom.push(this.#getHsl(root.customColor[i]).a);
         } else {
            // write error
         }
      }
      for (let i in data.name.custom) {
         for (let j in data.flag.b) {
            for (let k in data.flag.a) {
               result[data.flag.a[k] + data.name.custom[i] + data.flag.b[j]] = this.#toHex(data.hue.custom[i], data.saturation.custom[i], data.lightness[mode].accent[j][k], data.alpha.custom[i]);
            }
         }
         for (let j in data.flag.f) {
            for (let k in data.flag.a) {
               result[data.flag.a[k] + data.flag.f[j] + data.name.custom[i]] = this.#toHex(data.hue.custom[i], data.saturation.custom, data.lightness[mode].accentLD[j][k], data.alpha.custom);
            }
         }
      }
      for (let i in data.name.custom) {
         for (let j in data.flag.a) {
            result[data.flag.a[j] + data.flag.e + data.name.custom[i]] = this.#toHex(data.hue.custom[i], data.saturation.custom[i], data.lightness[mode].inverse[j], data.alpha.custom[i]);
         }
      }
      return result;
   }
   #subPalette(root = this.#settings) {
      let h = this.#getHsl(root.color).h;
      let s = this.#getHsl(root.color).s;
      let accentName = ['primary', 'secondary', 'tertiary', 'quaternary'];
      let ah = this.#accentHue();
      let mode = root.darkmode;
      let result = {};
      let data = {
         name: {
            accent: accentName.slice(0, ah.length),
            error: 'error',
            custom: [],
            neutral: ['neutral', 'neutral-variant']
         },
         hue: {
            accent: ah.map(i => i + h > 360 ? i + h - 360 : i + h),
            error: 0,
            custom: [],
            neutral: h
         },
         saturation: {
            accent: s,
            error: 100,
            custom: [],
            neutral: [s / 4, s / 2]
         },
         alpha: {
            accent: 1,
            error: 1,
            custom: [],
            neutral: 1
         }
      };
      for (let i in root.customColor) {
         data.name.custom.push(i);
         data.hue.custom.push(this.#getHsl(root.customColor[i]).h);
         data.saturation.custom.push(this.#getHsl(root.customColor[i]).s);
         data.alpha.custom.push(this.#getHsl(root.customColor[i]).a);
      }
      if (!root.reverseSubPalette || !mode) {
         for (let i in data.name.accent) {
            for (let j in root.parts) {
               result[data.name.accent[i] + '-' + root.parts[j]] = this.#toHex(data.hue.accent[i], data.saturation.accent, root.parts[j], data.alpha.accent);
            }
         }
         for (let i in root.parts) {
            result[data.name.error + '-' + root.parts[i]] = this.#toHex(data.hue.error, data.saturation.error, root.parts[i], data.alpha.error);
         }
         for (let i in data.name.custom) {
            for (let j in root.parts) {
               result[data.name.custom[i] + '-' + root.parts[j]] = this.#toHex(data.hue.custom[i], data.saturation.custom[i], root.parts[j], data.alpha.custom[i]);
            }
         }
         for (let i in data.name.neutral) {
            for (let j in root.parts) {
               result[data.name.neutral[i] + '-' + root.parts[j]] = this.#toHex(data.hue.neutral, data.saturation.neutral[i], root.parts[j], data.alpha.neutral);
            }
         }
      } else if (mode) {
         for (let i in data.name.accent) {
            for (let j in root.parts) {
               result[data.name.accent[i] + '-' + root.parts[j]] = this.#toHex(data.hue.accent[i], data.saturation.accent, root.parts[root.parts.length - 1] - root.parts[j], data.alpha.accent[i]);
            }
         }
         for (let i in root.parts) {
            result[data.name.error + '-' + root.parts[i]] = this.#toHex(data.hue.error, data.saturation.error, root.parts[root.parts.length - 1] - root.parts[i], data.alpha.error);
         }
         for (let i in data.name.custom) {
            for (let j in root.parts) {
               result[data.name.custom[i] + '-' + root.parts[j]] = this.#toHex(data.hue.custom[i], data.saturation.custom[i], root.parts[root.parts.length - 1] - root.parts[j], data.alpha.custom[i]);
            }
         }
         for (let i in data.name.neutral) {
            for (let j in root.parts) {
               result[data.name.neutral[i] + '-' + root.parts[j]] = this.#toHex(data.hue.neutral, data.saturation.neutral[i], root.parts[root.parts.length - 1] - root.parts[j], data.alpha.neutral);
            }
         }
      }
      return result;
   }
   #filterAccentColor(hsl) {
      let f1 = hsl.filter(color => {
         return color.l <= 80 && color.l >= 20;
      });
      let f2 = f1.filter(color => {
         return color.s >= 20;
      });
      let uniqueColors = new Map();
      let f3 = f2.filter(color => {
         let key = `${color.h}-${color.s}`;
         if (!uniqueColors.has(key)) {
            uniqueColors.set(key, color);
            return false;
         }
         return true;
      });
      f3 = f3.sort((a, b) => a.s - b.s);
      let f4 = f3.filter((color, index) => {
         for (let i = index + 1; i < f3.length; i++) {
            const hDiff = Math.abs(color.h - f3[i].h);
            const normalizedDiff = Math.min(hDiff, 360 - hDiff);
            if (normalizedDiff < 20) {
               return false;
            }
         }
         return true;
      });
      let f5 = f4.sort((a, b) => b.s - a.s).slice(0, 6);
      let colors = [];
      for (let i of f5) {
         colors.push(this.#toHex(i.h, i.s, i.l));
      }
      return colors;
   }
   #filterNeutraColor(hsl) {
      let f1 = hsl.filter(color => {
         return color.l <= 99 && color.l >= 80 || color.l <= 20 && color.l >= 1;
      });
      let f2 = f1.filter(color => {
         return color.s < 30;
      });
      let uniqueColors = new Map();
      let f3 = f2.filter(color => {
         let key = `${color.h}-${color.s}`;
         if (!uniqueColors.has(key)) {
            uniqueColors.set(key, color);
            return false;
         }
         return true;
      });
      let f4 = f3.sort((a, b) => a.s - b.s);
      let f5 = f4.filter((color, index) => {
         for (let i = index + 1; i < f3.length; i++) {
            const hDiff = Math.abs(color.h - f3[i].h);
            const normalizedDiff = Math.min(hDiff, 360 - hDiff);
            if (normalizedDiff < 20) {
               return false;
            }
         }
         return true;
      });
      let f6 = f5.sort((a, b) => b.s - a.s).slice(0, 3);
      let colors = [];
      for (let i of f6) {
         colors.push(this.#toHex(i.h, i.s, i.l));
      }
      return colors;
   }
   #getColorOfImage(img) {
      let minDimension = 50;
      let scaleWidth = minDimension / img.width;
      let scaleHeight = minDimension / img.height;
      let scale = Math.max(scaleWidth, scaleHeight);
      let newWidth = Math.floor(img.width * scale);
      let newHeight = Math.floor(img.height * scale);
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let hsl = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
         let r = imageData.data[i];
         let g = imageData.data[i + 1];
         let b = imageData.data[i + 2];
         let rgb = `rgb(${r},${g},${b})`;
         hsl.push(this.#getHsl(rgb));
      }

      let obj = {
         accent: this.#filterAccentColor(hsl),
         neutra: this.#filterNeutraColor(hsl)
      };
      return obj;
   }
   #code(obj, root = this.#settings) {
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
      let CSS = document.querySelector('MUSHROOM');
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
      this.#getDarkmode();
      let palette = this.#settings.hasPalette ? this.#palette() : undefined;
      let subPalette = this.#settings.hasSubPalette ? this.#subPalette() : undefined;
      let code = '';
      let style = '';
      let sprout = '';
      if (palette && subPalette) {
         style = code += this.#code(palette);
         style = code += this.#code(subPalette);
      } else if (palette) {
         style = code = this.#code(palette);
      } else if (subPalette) {
         style = code = this.#code(subPalette);
      }
      this.#settings.code = code;
      let arrID = Object.keys(this.#customRootsSettings);
      if (arrID.length != 0) {
         for (let j of arrID) {
            this.#getDarkmode(this.#customRootsSettings[j]);
            let customCode = '';
            let customPalette = this.#customRootsSettings[j].hasPalette ? this.#palette(this.#customRootsSettings[j]) : undefined;
            let customSubPalette = this.#customRootsSettings[j].hasSubPalette ? this.#subPalette(this.#customRootsSettings[j]) : undefined;
            if (customPalette && customSubPalette) {
               customCode += this.#code(customPalette, this.#customRootsSettings[j]);
               customCode += this.#code(customSubPalette, this.#customRootsSettings[j]);
            } else if (customPalette) {
               customCode = this.#code(customPalette, this.#customRootsSettings[j]);
            } else if (customSubPalette) {
               customCode = this.#code(customSubPalette, this.#customRootsSettings[j]);
            }
            this.#customRootsSettings[j].palette = customPalette;
            this.#customRootsSettings[j].subPalette = customSubPalette;
            this.#customRootsSettings[j].hue = this.#getHsl(this.#customRootsSettings[j].color).h;
            this.#customRootsSettings[j].saturation = this.#getHsl(this.#customRootsSettings[j].color).s;
            this.#customRootsSettings[j].lightness = this.#getHsl(this.#customRootsSettings[j].color).l;
            this.#customRootsSettings[j].style = customCode;
            code += customCode;
         }
      }
      if (this.#settings.sprout) {
         sprout += this.#settings.style;
      }
      for (let i in this.#customRootsSettings) {
         if (this.#customRootsSettings[i].sprout) {
            sprout += this.#customRootsSettings[i].style;
         }
      }
      if (sprout !== '' && (palette || subPalette)) {
         this.#sprout(sprout)

      }

      this.palette = palette;
      this.subPalette = subPalette;
      this.style = style;
      this.code = code;

      this.darkmode = this.#settings.darkmode;
      this.hue = this.#getHsl(this.#settings.color).h;
      this.saturation = this.#getHsl(this.#settings.color).s;
      this.lightness = this.#getHsl(this.#settings.color).l;

      this.sprout = this.#settings.sprout;
      this.root = this.#settings.root;
      this.color = this.#settings.color;
      this.theme = this.#settings.theme;
      this.parts = this.#settings.parts;
      this.prefix = this.#settings.prefix;
      this.contrast = this.#settings.contrast;
      this.colorScheme = this.#settings.colorScheme;
      this.hasPalette = this.#settings.hasPalette;
      this.hasSubPalette = this.#settings.hasSubPalette;
      this.reverseSubPalette = this.#settings.reverseSubPalette;
      this.customColor = this.#settings.customColor;
      this.customRoots = this.#customRootsSettings;

      this.growTime = Number((performance.now() - this.#startTime).toFixed(1)) / 1000;
   }
}