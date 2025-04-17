/*** button.js v1 ***/
class Button extends HTMLElement {
   // private variable
   #elm;
   #attr;
   #T;

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {
         color: 'var(--m-primary)',
         innerColor: 'var(--m-on-primary)',
         full: false,
         outline: false,
         text: false,
         size: 'medium',
         disabled: false,
         shadow: 0,
      }
      this.#T = new Tools();

      // template 
      this.#elm.innerHTML = `
         <style>
            [[["STYLE"]]]
         </style>
         <slot></slot>
      `;
      this.addEventListener('click', this.#handleClick.bind(this));
   }

   // observed attributes
   static get observedAttributes() {
      return ['color', 'inner-color', 'full', 'outline', 'size', 'shadow', 'text', 'disabled'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            if (this.#T.test(newValue)) {
               let color = this.#T.color(newValue);
               this.#attr.color = color;
               this.style.setProperty('--m-button-color', color);
               if (!this.hasAttribute('inner-color')) {
                  let innerColor = this.#T.innerColor(newValue);
                  this.#attr.innerColor = innerColor;
                  this.style.setProperty('--m-button-inner-color', innerColor);
               }
            }
            break;
         case 'inner-color':
            if (this.#T.test(newValue)) {
               let innerColor = this.#T.innerColor(newValue);
               this.#attr.innerColor = innerColor;
               this.style.setProperty('--m-button-inner-color', innerColor);
            }
            break;
         case 'full':
            this.#attr.full = this.hasAttribute(name);
            break;
         case 'disabled':
            this.#attr.disabled = this.hasAttribute(name);
            break;
         case 'outline':
            this.#attr.outline = this.hasAttribute(name);
            break;
         case 'size':
            if (/^(small|medium|large)$/i.test(newValue)) {
               this.#attr.outline = newValue.replace(/\s+/g, '').toLowerCase();
            }
            break;
         case 'shadow':
            let shadow;
            if (!isNaN(parseInt(newValue)) && (parseInt(newValue) >= 0) && (parseInt(newValue) <= 10)) {
               shadow = parseInt(newValue);
            } else if (newValue == '') {
               shadow = 5;
            } else {
               shadow = 0;
            }
            this.#attr.shadow = shadow;
            this.style.setProperty('--m-button-shadow', `0 ${shadow}px ${shadow*3}px #0004`);
            break;
         case 'text':
            this.#attr.text = this.hasAttribute(name);
            break;
      }
   }

   // private function 
   #handleClick() {
      if (this.disabled) {
         event.preventDefault();
         event.stopPropagation();
         return;
      }
      let parentForm = this.closest('form');
      let type = this.getAttribute('type');
      if (parentForm) {
         if (type == 'submit') {
            parentForm.submit();
         } else if (type == 'reset') {
            parentForm.reset();
         }
      }
   }

   // setter & getter
   set color(val) {
      this.setAttribute('color', val)
   }
   get color() {
      return this.#attr.color
   }

   set innerColor(val) {
      this.setAttribute('inner-color', val)
   }
   get innerColor() {
      return this.#attr.innerColor
   }

   set full(val) {
      if (val === true) {
         this.setAttribute('full', '');
      } else if (val === null || val === false) {
         this.removeAttribute('full')
      }
   }
   get full() {
      return this.#attr.full
   }

   set disabled(val) {
      if (val === true) {
         this.setAttribute('disabled', '');
      } else if (val === null || val === false) {
         this.removeAttribute('disabled')
      }
   }
   get disabled() {
      return this.#attr.disabled
   }

   set outline(val) {
      if (val === true) {
         this.setAttribute('outline', '');
      } else if (val === null || val === false) {
         this.removeAttribute('outline')
      }
   }
   get outline() {
      return this.#attr.outline
   }

   set text(val) {
      if (val === true) {
         this.setAttribute('text', '');
      } else if (val === null || val === false) {
         this.removeAttribute('text')
      }
   }
   get text() {
      return this.#attr.text
   }

   set size(val) {
      this.setAttribute('size', val)
   }
   get size() {
      return this.#attr.size
   }

   set shadow(val) {
      this.setAttribute('shadow', val)
   }
   get shadow() {
      return this.#attr.shadow
   }

   set type(val) {
      this.setAttribute('type', val)
   }
   get type() {
      return this.getAttribute('type')
   }

   // property 
   toggleFull() {
      this.full = !this.full
   }
   toggleDisabled() {
      this.disabled = !this.disabled
   }
   toggleText() {
      this.text = !this.text
   }
   toggleOutline() {
      this.outline = !this.outline
   }
}