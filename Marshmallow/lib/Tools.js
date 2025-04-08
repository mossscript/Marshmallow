/*** Tools v1 ***/
class Tools {
   constructor() {
      this.version = "1";
   }
   checkCssVar(varName, target) {
      if (!target) {
         target = document.documentElement;
      }
      return getComputedStyle(target).getPropertyValue(varName) !== '';
   }
   test(color) {
      let C = new Colors();
      switch (true) {
         case /^@[a-zA-Z0-9-]*-(\d{1,3})$/.test(color):
            return (this.checkCssVar(color.replace('@', '--m-')))
            break;
         case /^@/.test(color):
            return (this.checkCssVar(color.replace('@', '--m-')))
            break;
         case C.test(color):
            return true;
         default:
            return false
      }
   }
   color(color) {
      let C = new Colors();
      switch (true) {
         case /^@/.test(color):
            if (this.checkCssVar(color.replace('@', '--m-'))) {
               return `var(${color.replace('@', '--m-')})`;
            }
            break;
         case C.test(color):
            return color;
            break;
         default:
            return undefined
      }
   }
   innerColor(color, range = 70) {
      let C = new Colors();
      let lightness = (x) => {
         let a;
         if (x >= range) {
            a = x - range;
         } else if (x <= (100 - range)) {
            a = x + range;
         } else if (x > (100 - range) && x < range) {
            if (x <= 50) {
               a = x + 50;
            } else {
               a = x - 50;
            }
         }
         return a;
      }

      switch (true) {
         case /^@[a-zA-Z0-9-]*-(\d{1,3})$/.test(color):
            if (this.checkCssVar(color.replace('@', '--m-'))) {
               let pattern = /^@([a-zA-Z0-9-]*)-(\d{1,3})$/;
               let name = color.match(pattern)[1];
               let num = Number(color.match(pattern)[2]);
               return `var(--m-${name}-${lightness(num)})`;
            }
            break;
         case /^@/.test(color):
            if (this.checkCssVar(color.replace('@', '--m-')) && !color.includes('outline')) {
               return `var(${color.replace('@','--m-on-')})`;
            }
            break;
         case C.test(color):
            let { h, s, l } = C.toHslObj(color);
            return C.hslObjToHex(h, s, lightness(l));
            break;
         default:
            return undefined
      }
   }
}