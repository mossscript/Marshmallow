/*** animation.js v1 ***/
class Animation extends HTMLElement {
   // private variable 
   #elm;
   #attr;
   #slot;

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#attr = {
         name: 'fade',
         dur: '1s',
         count: '1',
         delay: '0s',
         dir: 'normal',
         timing: 'ease',
         fill: 'forwards',
         state: 'running',
         start: undefined,
         end: undefined,
         iteration: undefined,
      }

      // template 
      this.#elm.innerHTML = `
         <style>
            [[["STYLE"]]]
         </style>
         <slot></slot>
      `;
      this.#slot = this.#elm.querySelector('slot');

      // event

      this.#slot.addEventListener('animationstart', (callback) => {
         if (typeof this.#attr.start === 'function') this.#attr.start(callback);
         this.dispatchEvent(new Event('start'));
      });
      this.#slot.addEventListener('animationend', (callback) => {
         if (typeof this.#attr.end === 'function') this.#attr.end(callback);
         this.dispatchEvent(new Event('end'));
      });
      this.#slot.addEventListener('animationiteration', (callback) => {
         if (typeof this.#attr.iteration === 'function') this.#attr.iteration(callback);
         this.dispatchEvent(new Event('iteration'));
      });
   }

   // observed attributes
   static get observedAttributes() {
      return ['name', 'dur', 'count', 'delay', 'fill', 'dir', 'state', 'timing', 'onstart', 'onend', 'oniteration'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'name':
            this.#attr.name = newValue;
            this.#slot.style.setProperty('--name', newValue);
            break;
         case 'dur':
            this.#attr.dur = newValue;
            this.#slot.style.setProperty('--dur', newValue);
            break;
         case 'count':
            this.#attr.count = newValue;
            this.#slot.style.setProperty('--count', newValue);
            break;
         case 'delay':
            this.#attr.delay = newValue;
            this.#slot.style.setProperty('--delay', newValue);
            break;
         case 'fill':
            this.#attr.fill = newValue;
            this.#slot.style.setProperty('--fill', newValue);
            break;
         case 'dir':
            this.#attr.dir = newValue;
            this.#slot.style.setProperty('--dir', newValue);
            break;
         case 'state':
            this.#attr.state = newValue;
            this.#slot.style.setProperty('--state', newValue);
            break;
         case 'timing':
            this.#attr.timing = newValue;
            this.#slot.style.setProperty('--timing', newValue);
            break;
         case 'onstart':
            this.#attr.start = new Function(newValue);
            break;
         case 'onend':
            this.#attr.end = new Function(newValue);
            break;
         case 'oniteration':
            this.#attr.iteration = new Function(newValue);
            break;
      }
   }

   // event
   set onStart(fn) {
      if (typeof fn === 'function') this.#attr.start = fn;
   }
   get onStart() {
      return this.#attr.start;
   }

   set onEnd(fn) {
      if (typeof fn === 'function') this.#attr.end = fn;
   }
   get onEnd() {
      return this.#attr.end;
   }

   set onIteration(fn) {
      if (typeof fn === 'function') this.#attr.iteration = fn;
   }
   get onIteration() {
      return this.#attr.iteration;
   }

   // setter & getter
   set name(val) {
      this.setAttribute('name', val)
   }
   get name() {
      return this.#attr.name
   }

   set dur(val) {
      this.setAttribute('dur', val)
   }
   get dur() {
      return this.#attr.dur
   }

   set count(val) {
      this.setAttribute('count', val)
   }
   get count() {
      return this.#attr.count
   }

   set delay(val) {
      this.setAttribute('delay', val)
   }
   get delay() {
      return this.#attr.delay
   }

   set fill(val) {
      this.setAttribute('fill', val)
   }
   get fill() {
      return this.#attr.fill
   }

   set dir(val) {
      this.setAttribute('dir', val)
   }
   get dir() {
      return this.#attr.dir
   }

   set state(val) {
      this.setAttribute('state', val)
   }
   get state() {
      return this.#attr.state
   }

   set timing(val) {
      this.setAttribute('timing', val)
   }
   get timing() {
      return this.#attr.timing
   }

   // property 
   start() {
      this.state = 'running';
   }
   pause() {
      this.state = 'paused';
   }
   restart() {
      this.#slot.style.animation = 'none';
      this.#slot.offsetWidth;
      this.#slot.style.animation = 'var(--name) var(--dur) var(--timing) var(--delay) var(--count) var(--dir) var(--fill)';
   }
}