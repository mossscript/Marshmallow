/*** input.js v1.1 ***/
class Input extends HTMLElement {
   #elm;
   #attr;
   #input;
   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {
         type: 'text',
         value: '',
         placeholder: '',
         disabled: false,
         readonly: false,
         required: false,
         maxlength: null,
         minlength: null,
         min: null,
         max: null,
         step: null,
         pattern: '',
         name: '',
         autofocus: false,
         autocomplete: 'on',
         spellcheck: false,
         inputmode: '',
         tabindex: 0,
         focused: false
         
      }
      
      this.#elm.innerHTML = `
         <style>
            [[["STYLE"]]]
         </style>
         <input>
      `;
      this.#input = this.#elm.querySelector('input');
      let form = this.closest('form');
      if (form) {
         form.addEventListener('reset', (this.#resetToDefault.bind(this)))
         form.addEventListener('submit', (event) => {
            if (!this.#input.checkValidity()) {
               event.preventDefault();
               this.#input.reportValidity();
            }
         });
      }
      // event
      this.#input.addEventListener('focus', () => {
         if (!this.hasAttribute('focused')) this.setAttribute('focused', '');
      });
      this.#input.addEventListener('blur', () => {
         if (this.hasAttribute('focused')) this.removeAttribute('focused');
      });
      this.#input.addEventListener('input', () => {
         this.#attr.value = this.#input.value;
      });
   }
   
   // private function 
   #resetToDefault() {
      this.value = '';
   }
   
   // observed attributes
   static get observedAttributes() {
      return ['type', 'value', 'placeholder', 'disabled', 'readonly', 'required', 'maxlength', 'minlength', 'min', 'max', 'step', 'pattern', 'name', 'autofocus', 'autocomplete', 'spellcheck', 'inputmode', 'tabindex', 'focused'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'type':
            this.#attr.type = newValue;
            this.#input.setAttribute('type', newValue);
            break;
         case 'placeholder':
            this.#attr.placeholder = newValue;
            this.#input.setAttribute('placeholder', newValue);
            break;
case 'maxlength':
this.#attr.maxlength = newValue;
this.#input.setAttribute('maxlength', newValue);
break;
case 'minlength':
this.#attr.maxlength = newValue;
this.#input.setAttribute('minlength', newValue);
break;
case 'max':
this.#attr.max = newValue;
this.#input.setAttribute('max', newValue);
break;
case 'min':
this.#attr.min = newValue;
this.#input.setAttribute('min', newValue);
break;
         case 'value':
            this.#attr.value = newValue;
            this.#input.value = newValue;
            break;
         case 'required':
            this.#attr.required = this.hasAttribute('required');
            this.hasAttribute('required') ? this.#input.setAttribute('required', '') : this.#input.removeAttribute('required');
            break;
         case 'disabled':
            this.#attr.disabled = this.hasAttribute(name);
            break;
         case 'focused':
            if (this.hasAttribute('focused')) {
               if (document.activeElement !== this.#input) {
                  this.#input.focus();
               }
            } else {
               if (document.activeElement === this.#input) {
                  this.#input.blur();
               }
            }
            break;
      }
   }
   
   //  setter & getter
   set value(val) {
      this.setAttribute('value', val);
   }
   get value() {
      return this.#attr.value
   }
}