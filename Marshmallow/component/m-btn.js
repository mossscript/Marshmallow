export class MBtn extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open' });
   }
   static get observedAttributes() {
      return ['color', 'badge', 'badge-color', 'badge-align', 'icon-align', 'disabled'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      this.render();
   }
   connectedCallback() {
      this.render();
      this.addSlotListeners();
      this.addClickListener();
   }
   addSlotListeners() {
      let badgeSlot = this.shadowRoot.querySelector('slot[name="badge"]');
      let iconSlot = this.shadowRoot.querySelector('slot[name="icon"]');
      this.shadowRoot.addEventListener('slotchange', (event) => {
         if (badgeSlot && !badgeSlot.assignedNodes().length) badgeSlot.parentElement.remove();
         if (iconSlot && !iconSlot.assignedNodes().length) iconSlot.parentElement.remove();
      });
   }
   addClickListener() {
      let button = this.shadowRoot.querySelector('button');
      button.addEventListener('click', (event) => {
         if (this.getAttribute('type') === 'submit' || this.getAttribute('type') === 'reset') {
            let form = this.closest('form');
            if (form) {
               event.preventDefault();
               if (this.getAttribute('type') === 'submit') {
                  form.submit();
               } else if (this.getAttribute('type') === 'reset') {
                  form.reset();
               }
            }
         }
      });
   }
   get disabled() {
      return this.hasAttribute('disabled');
   }
   set disabled(value) {
      if (value) {
         this.setAttribute('disabled', '');
      } else {
         this.removeAttribute('disabled');
      }
      this.render();
      this.addSlotListeners();
      this.addClickListener();
   }
   render() {
      this.shadowRoot.innerHTML = `
      <button part="button" ${this.hasAttribute('disabled') ? 'disabled' : ''}>
        ${this.hasAttribute('badge') ? `<span part="badge">${this.getAttribute('badge')}</span>` : '<span part="badge"><slot name="badge"></slot></span>'}
        <span part="icon"><slot name="icon"></slot></span>
        <span part="text"><slot></slot></span>
      </button>
    `;
      let button = this.shadowRoot.querySelector('button');
      let arr = ['name', 'type'];
      Array.from(this.attributes).forEach(attr => {
         if (arr.includes(attr.name)) {
            button.setAttribute(attr.name, attr.value);
         }
      });
   }
}