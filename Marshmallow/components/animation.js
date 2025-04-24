/*** animation.js v1 ***/
class Animation extends HTMLElement {
   // private variable 
   #elm;
   #attr;
   #slot;
   #RAF;
   #event;

   // constructor
   constructor() {
      super();
      this.#elm = this.attachShadow({ mode: 'open' });
      this.#event = new EventTarget();
      this.#attr = {
         name: 'fade',
         dur: '1s',
         count: '1',
         delay: '0s',
         dir: 'normal',
         timing: 'ease',
         fill: 'forwards',
         state: 'running',
         progress: 0,
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
         this.#startProgressTracking();
         if (typeof this.#attr.start === 'function') this.#attr.start(callback);
         this.dispatchEvent(new Event('start'));
      });
      this.#slot.addEventListener('animationend', (callback) => {
         if (typeof this.#attr.end === 'function') this.#attr.end(callback);
         this.dispatchEvent(new Event('end'));
      });
      this.#slot.addEventListener('animationiteration', (callback) => {
         this.#startProgressTracking();
         if (typeof this.#attr.iteration === 'function') this.#attr.iteration(callback);
         this.dispatchEvent(new Event('iteration'));
      });
   }

   // disconnect element 
   disconnectedCallback() {
      this.#stopProgressTracking();
   }

   // privet function 
   #dispatchProgressEvent() {
      this.#event.dispatchEvent(new CustomEvent('progress', {}));
   }
   #parseTimeToMs(time) {
      if (!time) return 0;
      if (time.endsWith('ms')) {
         return parseFloat(time);
      } else if (time.endsWith('s')) {
         return parseFloat(time) * 1000;
      }
      return parseFloat(time) || 0;
   }
   #stopProgressTracking() {
      if (this.#RAF) {
         cancelAnimationFrame(this.#RAF);
         this.#RAF = null;
      }
   }
   #startProgressTracking(startValue = 0) {
      if (this.#RAF) {
         cancelAnimationFrame(this.#RAF);
      }
      let st = performance.now();
      let duration = this.#parseTimeToMs(this.#attr.dur);

      let updateProgress = () => {
         let elapsed = performance.now() - st;
         let newProgress = startValue + (elapsed / this.#parseTimeToMs(this.#attr.dur));
         this.#attr.progress = !isFinite(Number(this.#attr.count)) ? newProgress % 1 : Math.min(1, newProgress);
         this.#dispatchProgressEvent();
         if (this.#attr.state === 'running') {
            this.#RAF = requestAnimationFrame(updateProgress);
         }
      };
      this.#RAF = requestAnimationFrame(updateProgress);
   }

   // observed attributes
   static get observedAttributes() {
      return ['name', 'dur', 'count', 'delay', 'fill', 'dir', 'state', 'timing', 'progress', 'onstart', 'onend',
         'oniteration', 'onprogress'];
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
            if (newValue == 'running') {
               this.#startProgressTracking(this.#attr.progress);
            } else if (newValue == 'paused') {
               this.#stopProgressTracking();
            }
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

   set progress(val) {
      val = Math.max(0, Math.min(1, parseFloat(val) || 0));
      this.state = 'paused';
      this.#attr.progress = val;

      this.#stopProgressTracking();

      let duration = this.#parseTimeToMs(this.#attr.dur);
      let newDelay = -(duration * val);
      this.delay = `${newDelay}ms`;

      this.#dispatchProgressEvent();
   }
   get progress() {
      return this.#attr.progress;
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
      this.#startProgressTracking(this.progress);
   }
   pause() {
      this.state = 'paused';
      this.#stopProgressTracking();
   }
   toggleStartPause() {
      this.state = this.state == 'paused' ? 'running' : 'paused';
   }
   restart() {
      this.#slot.style.animation = 'none';
      this.#slot.offsetWidth;
      this.#slot.style.animation =
         'var(--name) var(--dur) var(--timing) var(--delay) var(--count) var(--dir) var(--fill)';
      this.#attr.progress = 0;
      this.#dispatchProgressEvent();
   }
}