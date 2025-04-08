/*** <m-radio> ***/
class MRadio extends HTMLElement {
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
         checked: false,
         value: undefined,
         name: undefined,
         disabled: false,
      }
      this.addEventListener('click', this.#radio.bind(this))
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
            this.#attr.value = newValue;
            this.#render()
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
   get innerColor() { return this.#attr.innerColor }
   get value() { return this.#attr.value }
   get checked() { return this.#attr.checked }
   get name() { return this.#attr.name }
   set color(val) { this.setAttribute('color', val) }
   set innerColor(val) { this.setAttribute('inner-color', val) }
   set value(val) { this.setAttribute('value', val) }
   set checked(val) { if (val == true || val == false) { val ? this.setAttribute('checked', '') : this.removeAttribute('checked') } }
   set name(val) { this.setAttribute('name', val) }
   get disabled() { return this.#attr.disabled }
   set disabled(val) { if (val == true || val == false) { val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled') } }
   toggleChecked() { this.checked = !this.checked }
   toggleDisabled() { this.disabled = !this.disabled }
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
         hiddenInput.type = 'radio';
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
               border-radius: 15px;
               vertical-align: middle;
               position: relative;
               user-select: none;
               cursor: pointer;
               transition: 0.3s;
            }
            :host::before{
               content: '';
               display: block;
               position: absolute;
               width: ${!this.checked?'8px':'16px'};
               height: ${!this.checked?'8px':'16px'};
               border-radius: 15px;
               transition: 0.3s;
               border: 3px solid ${this.checked?`var(--m-checkbox-inner-color,${this.innerColor})`:'var(--m-checkbox-inner-color-checked,var(--m-on-surface-container-high))'};
               top: 50%;
               left: 50%;
               translate: -50% -50%;
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