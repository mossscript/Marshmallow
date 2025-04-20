/*** switch.js v1 ***/
class Switch extends HTMLElement {
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

      // template 
      this.#elm.innerHTML = `
         <style>
            [[["STYLE"]]]
         </style>
         <div id="handle"></div>
      `;
      this.addEventListener('click', this.#toggle.bind(this));
      let form = this.closest('form');
      if (form) { form.addEventListener('reset', this.#resetToDefault.bind(this)) }
      this.#form();
   }

   // private function 
   #toggle() {
      let newValue = !this.checked;
      this.value = this.value !== 'on' && this.value !== 'off' ? this.value : (newValue ? 'on' : 'off');
      this.checked = newValue;
      this.#form();
      this.dispatchEvent(new Event('change', { bubbles: true }));
      this.dispatchEvent(new Event('input', { bubbles: true }));
   }
   #resetToDefault() {
      this.checked = false;
      this.#form();
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
         hiddenInput.type = 'checkbox';
         hiddenInput.name = this.name;
         this.checked ? hiddenInput.setAttribute('checked', '') : hiddenInput.removeAttribute('checked');
         hiddenInput.value = this.value;
      }
   }

   // observed attributes
   static get observedAttributes() {
      return ['color', 'inner-color', 'value', 'checked', 'name', 'disabled'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            if (this.#T.test(newValue)) {
               let color = this.#T.color(newValue);
               this.#attr.color = color;
               this.style.setProperty('--color', color);
               if (!this.hasAttribute('inner-color')) {
                  let innerColor = this.#T.innerColor(newValue);
                  this.#attr.innerColor = innerColor;
                  this.style.setProperty('--inner-color', innerColor);
               }
            }
            break;
         case 'inner-color':
            if (this.#T.test(newValue)) {
               let innerColor = this.#T.innerColor(newValue);
               this.#attr.innerColor = innerColor;
               this.style.setProperty('--inner-color', innerColor);
            }
            break;
         case 'value':
            this.#attr.value = newValue || 'off';
            this.checked = newValue === 'on';
            break;
         case 'checked':
            this.#attr.checked = this.hasAttribute(name);
            break;
         case 'disabled':
            this.#attr.disabled = this.hasAttribute(name);
            break;
         case 'name':
            this.#attr.name = newValue;
            break;
      }
   }

   //  setter & getter
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

   set value(val) {
      this.setAttribute('value', val)
   }
   get value() {
      return this.#attr.value
   }

   set checked(val) {
      if (val === false || val === null) {
         this.removeAttribute('checked');
      } else if (val === true) {
         this.setAttribute('checked', '');
      }
   }
   get checked() {
      return this.#attr.checked
   }

   set name(val) {
      this.setAttribute('name', val)
   }
   get name() {
      return this.#attr.name
   }

   set disabled(val) {
      if (val === false || val === null) {
         this.removeAttribute('disabled');
      } else if (val == true) {
         this.setAttribute('disabled', '');
      }
   }
   get disabled() {
      return this.#attr.disabled
   }

   // property 
   toggleChecked() {
      this.checked = !this.checked
   }
   toggleDisabled() {
      this.disabled = !this.disabled
   }
}