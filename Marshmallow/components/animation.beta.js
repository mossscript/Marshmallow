class Animation extends HTMLElement {
   #elm;
   #attr;
   #slot;
   #rafId;
   #startTime;
   #progressStartValue;
   #event;

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
         start: undefined,
         end: undefined,
         iteration: undefined,
         progress: 0,
         frame: 0
      };

      this.#elm.innerHTML = `
      <style>
        [[["STYLE"]]]
      </style>
      <slot></slot>
    `;
      this.#slot = this.#elm.querySelector('slot');

      if (this.#attr.state === 'running') {
         this.#startProgressTracking();
      }

      this.#slot.addEventListener('animationstart', (callback) => {
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

   static get observedAttributes() {
      return ['name', 'dur', 'count', 'delay', 'fill', 'dir', 'state', 'timing', 'onstart', 'onend', 'oniteration',
         'progress', 'frame'];
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
            if (newValue === 'running') {
               this.#startProgressTracking(this.#attr.progress);
            } else if (this.#rafId) {
               cancelAnimationFrame(this.#rafId);
               this.#rafId = null;
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
         case 'progress':
            this.progress = newValue;
            break;
         case 'frame':
            this.frame = newValue;
            break;
      }
   }

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

   set progress(val) {
      val = Math.max(0, Math.min(1, parseFloat(val) || 0));
      this.#attr.progress = val;
      this.#attr.frame = val; // همگام سازی frame با progress

      if (this.#rafId) {
         cancelAnimationFrame(this.#rafId);
         this.#rafId = null;
      }

      const duration = this.#parseTimeToMs(this.#attr.dur);
      const newDelay = -(duration * val);
      this.#slot.style.animationDelay = `${newDelay}ms`;

      if (this.#attr.state === 'running') {
         this.#startProgressTracking(val);
      } else {
         this.#slot.style.animationPlayState = 'paused';
      }

      this.#dispatchProgressEvent();
   }

   get progress() {
      return this.#attr.progress;
   }

   set frame(val) {
      val = Math.max(0, Math.min(1, parseFloat(val) || 0));
      this.state = 'paused';
      this.#attr.frame = val;
      this.#attr.progress = val; // همگام سازی progress با frame

      if (this.#rafId) {
         cancelAnimationFrame(this.#rafId);
         this.#rafId = null;
      }

      const duration = this.#parseTimeToMs(this.#attr.dur);
      const newDelay = -(duration * val);
      this.#slot.style.animationDelay = `${newDelay}ms`;


      this.#dispatchProgressEvent();
   }

   get frame() {
      return this.#attr.frame;
   }

   set onProgress(callback) {
      this.#event.addEventListener('progress', callback);
   }

   get onProgress() {
      return undefined;
   }

   #startProgressTracking(startValue = 0) {
      if (this.#rafId) {
         cancelAnimationFrame(this.#rafId);
      }

      this.#progressStartValue = startValue;
      this.#startTime = performance.now();
      const duration = this.#parseTimeToMs(this.#attr.dur);

      const updateProgress = () => {
         const elapsed = performance.now() - this.#startTime;
         const newProgress = this.#progressStartValue + (elapsed / duration);

         if (newProgress <= 1) {
            this.#attr.progress = newProgress;
            this.#attr.frame = newProgress;
            this.#dispatchProgressEvent();
            this.#rafId = requestAnimationFrame(updateProgress);
         } else {
            this.#attr.progress = 1;
            this.#attr.frame = 1;
            this.#dispatchProgressEvent();
            this.#rafId = null;
         }
      };

      this.#rafId = requestAnimationFrame(updateProgress);
   }

   set onStart(fn) {
      console.log(fn)
      if (typeof fn === 'function') this.#attr.start = fn;
   }
   get onStart() { return this.#attr.start; }

   set onEnd(fn) { if (typeof fn === 'function') this.#attr.end = fn; }
   get onEnd() { return this.#attr.end; }

   set onIteration(fn) { if (typeof fn === 'function') this.#attr.iteration = fn; }
   get onIteration() { return this.#attr.iteration; }

   set name(val) { this.setAttribute('name', val); }
   get name() { return this.#attr.name; }

   set dur(val) { this.setAttribute('dur', val); }
   get dur() { return this.#attr.dur; }

   set count(val) { this.setAttribute('count', val); }
   get count() { return this.#attr.count; }

   set delay(val) { this.setAttribute('delay', val); }
   get delay() { return this.#attr.delay; }

   set fill(val) { this.setAttribute('fill', val); }
   get fill() { return this.#attr.fill; }

   set dir(val) { this.setAttribute('dir', val); }
   get dir() { return this.#attr.dir; }

   set state(val) { this.setAttribute('state', val); }
   get state() { return this.#attr.state; }

   set timing(val) { this.setAttribute('timing', val); }
   get timing() { return this.#attr.timing; }

   start() {
      this.state = 'running';
      this.#startProgressTracking(this.#attr.progress);
   }

   pause() {
      this.state = 'paused';
      if (this.#rafId) {
         cancelAnimationFrame(this.#rafId);
         this.#rafId = null;
      }
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
      if (this.#attr.state === 'running') {
         this.#startProgressTracking();
      }
   }
}