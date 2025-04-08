/*** checkbox.js v1 ***/
class Checkbox extends HTMLElement {
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
      }
      this.#T = new Tools();
      this.addEventListener('click', this.#toggle.bind(this));
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
   #toggle() {
      let newValue = !this.checked;
      this.value = this.value !== 'on' && this.value !== 'off' ? this.value : (newValue ? 'on' : 'off');
      this.checked = newValue;
      this.#input();
      this.dispatchEvent(new Event('change', { bubbles: true }));
      this.dispatchEvent(new Event('input', { bubbles: true }));
   }
   #resetToDefault() {
      this.checked = false;
      this.#input();
   }
   #input() {
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
               this.style.setProperty('--m-checkbox-color', color);
               if (!this.hasAttribute('inner-color')) {
                  let innerColor = this.#T.innerColor(newValue);
                  this.#attr.innerColor = innerColor;
                  this.style.setProperty('--m-checkbox-inner-color', innerColor);
               }
            }
            break;
         case 'inner-color':
            if (this.#T.test(newValue)) {
               let innerColor = this.#T.innerColor(newValue);
               this.#attr.innerColor = innerColor;
               this.style.setProperty('--m-checkbox-inner-color', innerColor);
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
      if (val == true || val == false) {
         val ? this.setAttribute('checked', '') : this.removeAttribute('checked')
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
      if (val == true || val == false) {
         val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled')
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