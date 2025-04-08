/*** <m-checkbox> v1 ***/
class MCheckbox extends HTMLElement {
   #T;
   #elm;
   #attr;
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#T = new Tools();
      this.#attr = {
         color: 'var(--m-primary)',
         innerColor: 'var(--m-on-primary)',
         value: 'off',
         checked: false,
         name: undefined,
         disabled: false,
      }
      this.addEventListener('click', this.#toggle.bind(this));
      let form = this.closest('form');
      if (form) { form.addEventListener('reset', this.#resetToDefault.bind(this)) }
   }
   static get observedAttributes() {
      return ['color', 'inner-color', 'value', 'checked', 'name', 'disabled'];
   }
   connectedCallback() {
      this.#input();
      this.#render();
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'color':
            if (this.#T.test(newValue)) {
               this.#attr.color = this.#T.color(newValue);
               if (!this.hasAttribute('inner-color')) {
                  this.#attr.innerColor = this.#T.innerColor(newValue);
               }
               this.#render();
            }
            break;
         case 'inner-color':
            if (this.#T.test(newValue)) {
               this.#attr.innerColor = this.#T.color(newValue);
               this.#render();
            }
            break;
         case 'value':
            this.#attr.value = newValue || 'off';
            this.#render();
            break;
         case 'checked':
            this.#attr.checked = this.hasAttribute('checked');
            this.#render();
            break;
         case 'disabled':
            this.#attr.disabled = this.hasAttribute('disabled');
            this.#render();
            break;
         case 'name':
            this.#attr.name = newValue;
            this.#render();
            break;
      }
   }
   get color() { return this.#attr.color }
   set color(val) { this.setAttribute('color', val) }
   get innerColor() { return this.#attr.innerColor }
   set innerColor(val) { this.setAttribute('inner-color', val) }
   get value() { return this.#attr.value }
   set value(val) { this.setAttribute('value', val) }
   get checked() { return this.#attr.checked }
   set checked(val) { if (val == true || val == false) { val ? this.setAttribute('checked', '') : this.removeAttribute('checked') } }
   get name() { return this.#attr.name }
   set name(val) { this.setAttribute('name', val) }
   get disabled() { return this.#attr.disabled }
   set disabled(val) { if (val == true || val == false) { val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled') } }
   toggleChecked() { this.checked = !this.checked }
   toggleDisabled() { this.disabled = !this.disabled }
   #toggle() {
      if (this.disabled) {
         event.preventDefault();
         event.stopPropagation();
         return;
      }
      let newValue = !this.#attr.checked;
      this.checked = newValue;
      this.value = this.#attr.value !== 'on' && this.#attr.value !== 'off' ? this.#attr.value : (newValue ? 'on' : 'off');
      this.#input();
      this.dispatchEvent(new Event('change', { bubbles: true }));
      this.dispatchEvent(new Event('input', { bubbles: true }));
   }
   #resetToDefault() {
      this.checked = false;
      this.#input()
      this.#render();
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
   #render() {
      this.#elm.innerHTML = `
         <style>
            :host{
               display: inline-block;
               background: ${this.checked?`var(--m-checkbox-color,${this.color})`:'var(--m-checkbox-color-checked,var(--m-surface-container-high))'};
               width: 30px;
               height: 30px;
               border-radius: 10px;
               vertical-align: middle;
               position: relative;
               user-select: none;
               cursor: pointer;
               transition: 0.3s;
            }
            :host::before,:host::after{
               content: '';
               display: block;
               position: absolute;
               width: 4px;
               border-radius: 5px;
               transition: 0.3s;
               background: ${this.checked?`var(--m-checkbox-inner-color,${this.innerColor})`:'var(--m-checkbox-inner-color-checked,var(--m-on-surface-container-high))'};
            }
            :host::before{
               top: ${this.#attr.checked?'13px':'5px'};
               left: ${this.#attr.checked?'10px':'13px'};
               height: ${this.#attr.checked?'10px':'20px'};
               rotate: ${this.#attr.checked?'-30deg':'45deg'};
            }
            :host::after{
               top: ${this.#attr.checked?'6.5px':'5px'};
               left: ${this.#attr.checked?'15.5px':'13px'};
               height: ${this.#attr.checked?'17px':'20px'};
               rotate: ${this.#attr.checked?'30deg':'-45deg'};
            }
            :host(:active){
               scale: 0.9;
            }
            :host([disabled]) {
               opacity: 0.5;
               cursor: not-allowed;
               pointer-events: none;
            }
         </style>
      `;
   }
}