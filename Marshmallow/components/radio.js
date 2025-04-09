/*** radio.js v1 ***/
class Radio extends HTMLElement {
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
         value: 'off',
         checked: false,
         name: undefined,
         disabled: false,
         required: false,
      }
      this.#T = new Tools();
      this.addEventListener('click', this.#radio.bind(this));
      let form = this.closest('form');
      if (form) { form.addEventListener('reset', this.#resetToDefault.bind(this)) }
   }

   // connect element
   connectedCallback() {
      this.#elm.innerHTML = `
         <style>
            [[["STYLE"]]]
         </style>
         <div id="handle"></div>
      `;
   }

   // private function 
   #radio() {
      if (this.disabled) {
         event.preventDefault();
         event.stopPropagation();
         return;
      }
      if (this.checked) return;
      let radios = document.querySelectorAll(`m-radio[name="${this.name}"]`);
      radios.forEach(radio => {
         if (radio !== this) {
            radio.checked = false;
         }
      });
      this.checked = true;
      this.#form();
      this.dispatchEvent(new Event('change', { bubbles: true }));
      this.dispatchEvent(new Event('input', { bubbles: true }));
   }
   #resetToDefault() {
      this.checked = false;
      this.#form()
   }
   #form() {
      let form = this.closest("form");
      if (form) {
         let formData = new FormData(form);
         formData.set(this.name, this.value);
         let hiddenInput = this.querySelector('input');
         if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            this.appendChild(hiddenInput);
         }
         hiddenInput.setAttribute('hidden', '');
         hiddenInput.type = 'radio';
         hiddenInput.name = this.name;
         this.checked ? hiddenInput.setAttribute('checked', '') : hiddenInput.removeAttribute('checked');
         hiddenInput.value = this.value;
         hiddenInput.required = this.required;
      }
   }

   // observed attributes
   static get observedAttributes() {
      return ['color', 'inner-color', 'value', 'checked', 'name', 'disabled', 'required'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            if (this.#T.test(newValue)) {
               let color = this.#T.color(newValue);
               this.#attr.color = color;
               this.style.setProperty('--m-radio-color', color);
               if (!this.hasAttribute('inner-color')) {
                  let innerColor = this.#T.innerColor(newValue);
                  this.#attr.innerColor = innerColor;
                  this.style.setProperty('--m-switch-radio-color', innerColor);
               }
            }
            break;
         case 'inner-color':
            if (this.#T.test(newValue)) {
               let innerColor = this.#T.innerColor(newValue);
               this.#attr.innerColor = innerColor;
               this.style.setProperty('--m-radio-inner-color', innerColor);
            }
            break;
         case 'value':
            this.#attr.value = newValue || 'off';
            break;
         case 'checked':
            this.#attr.checked = this.hasAttribute('checked');
            break;
         case 'disabled':
            this.#attr.disabled = this.hasAttribute('disabled');
            break;
         case 'name':
            this.#attr.name = newValue;
            break;
         case 'required':
this.#attr.required = this.hasAttribute('required');
break;
      }
   }

   // getter & setter 
   get color() {
      return this.#attr.color
   }
   set color(val) {
      this.setAttribute('color', val)
   }
   get innerColor() {
      return this.#attr.innerColor
   }
   set innerColor(val) {
      this.setAttribute('inner-color', val)
   }
   get value() {
      return this.#attr.value
   }
   set value(val) {
      this.setAttribute('value', val)
   }
   get checked() {
      return this.#attr.checked
   }
   set checked(val) {
      if (val === false || val === null) {
         this.removeAttribute('checked');
      } else if (val === true) {
         this.setAttribute('checked', '');
      }
   }
   get name() {
      return this.#attr.name
   }
   set name(val) {
      this.setAttribute('name', val)
   }
   get disabled() {
      return this.#attr.disabled
   }
   set disabled(val) {
      if (val === false || val === null) {
         this.removeAttribute('disabled');
      } else if (val == true) {
         this.setAttribute('disabled', '');
      }
   }
   get required() {
      return this.#attr.required;
   }
   set required(val) {
      if (val === false || val === null) {
         this.removeAttribute('required');
      } else if (val == true) {
         this.setAttribute('required', '');
      }
   }

   // property 
   toggleChecked() {
      this.checked = !this.checked
   }
   toggleDisabled() {
      this.disabled = !this.disabled
   }
}