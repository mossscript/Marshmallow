((global) => {
   class FontAwesome {
      // privet variable 
      
      
      // constructor
      constructor() {
         this.version = "1.0.0";
         this.eventTarget = new EventTarget();
      }
      
      // event 
      set onstart(callback) {
         this.eventTarget.addEventListener('start', callback)
      }
      get onstart() {
         return undefined
      }
      set onprogress (callback) {
         this.eventTarget.addEventListener('progress', callback)
      }
      get onprogress() {
         return undefined
      }
      set onfinish(callback) {
         this.eventTarget.addEventListener('finish', callback)
      }
      get onfinish() {
         return undefined
      }
      
      // method 
      load(path) {
         fetch(path)
            .then(response => response.json())
            .then(data => {
               this.configs = data;
               if (this.configs) this.#getSource();
               let renderEvent = new CustomEvent('start', {});
               this.eventTarget.dispatchEvent(renderEvent);
            })
      }
      
      // privet method 
      #getSource() {
         const classNames = Object.keys(this.configs);
         const elementNames = Object.values(this.configs).map(obj => obj.name);
         const srcs = Object.values(this.configs).map(obj => obj.script);
         let blobUrl = undefined;
         let i = 0;
         const loop = () => {
            if (i >= srcs.length) {
               this.#finishUrl();
               return;
            }
            fetch(srcs[i])
               .then(res => res.text())
               .then(data => {
                  if (blobUrl) URL.revokeObjectURL(blobUrl);
                  data += `\ncustomElements.define('${elementNames[i]}', ${classNames[i]});`;
                  const blob = new Blob([data], { type: 'application/javascript' });
                  blobUrl = URL.createObjectURL(blob);
                  const oldScript = document.querySelector('#FONT-AWESOME');
                  if (oldScript) oldScript.remove();
                  const script = document.createElement('script');
                  script.id = 'FONT-AWESOME';
                  script.src = blobUrl;
                  script.onload = () => {
                     i++;
                     loop();
                     let renderEvent = new CustomEvent('progress', { detail: { max: classNames.length, progress: i } });
                     this.eventTarget.dispatchEvent(renderEvent);
                  };
                  document.head.appendChild(script);
               });
         };
         loop();
      }
      #finishUrl() {
         let renderEvent = new CustomEvent('finish', {});
         this.eventTarget.dispatchEvent(renderEvent);
      }
   }
   
   global.FontAwesome = FontAwesome;
})(globalThis);