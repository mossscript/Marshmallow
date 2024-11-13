/*** TestColor.js Alpha ***/
export default class TestColor {
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
   constructor() {
      this.version = 'alpha'
   }
   test(color) {
      if (color) {
         if (/^@/.test(color)) {
            let elm = document.querySelector('m-app');
            let val = getComputedStyle(elm).getPropertyValue(color.toLowerCase().replace('@','--m-'));
            if (val !== '' && !val.includes('outline')) {
               return true
            } else {
               return false
            }
         } else {
            return (!!this.#testColor(color))
         }
      } else {
         return false;
      }
   }
   bg(color) {
      if (color) {
         if (/^@/.test(color)) {
            let elm = document.querySelector('m-app');
            let val = getComputedStyle(elm).getPropertyValue(color.toLowerCase().replace('@','--m-'));
            if (val !== '' && !val.includes('outline')) {
               return `var(${color.toLowerCase().replace('@','--m-')})`;
            }
         } else {
            return color.replaceAll(' ','')
         }
      }
   }
   inner(color) {
      let l2 = (x) => {
         let a;
         if (x >= 60) {
            a = x - 60;
         } else if (x <= 40) {
            a = x + 60;
         } else if (x > 40 && x < 60) {
            if (x <= 50) {
               a = x + 50;
            } else {
               a = x - 50;
            }
         }
         return a;
      }
      if (/^@[a-zA-Z0-9-]*-(\d{1,3})$/.test(color)) {
         let elm = document.querySelector('m-app');
         let val = getComputedStyle(elm).getPropertyValue(color.toLowerCase().replace('@', '--m-'));
         let name = color.match(/^@([a-zA-Z0-9-]*)-(\d{1,3})$/)[1].toLowerCase();
         let num = Number(color.match(/^@([a-zA-Z0-9-]*)-(\d{1,3})$/)[2]);
         if (val !== '') {
            return `var(--m-${name}-${l2(num)})`;
         }
      } else if (/^@/.test(color)) {
         let elm = document.querySelector('m-app');
         let val = getComputedStyle(elm).getPropertyValue(color.toLowerCase().replace('@', '--m-'));
         if (val !== '' && !val.includes('outline')) {
            return `var(${color.toLowerCase().replace('@','--m-on-')})`;
         }
      } else if (this.test(color)) {
         let { h, s, l } = this.#getHsl(color);
         return this.#toHex(h, s, l2(l));
      } else {
         return undefined;
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
}