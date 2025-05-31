/*** bundle.now.js v1 ***/
(() => {
   class Bundle {
      constructor(path) {
         this.version = "1";
         this.eventTarget = new EventTarget();
         if (path) this.load(path);
      }
      // events 
      set onload(callback) {
         this.eventTarget.addEventListener('load', callback)
      }
      get onload() {
         return undefined
      }
      set onrender(callback) {
         this.eventTarget.addEventListener('render', callback)
      }
      get onrender() {
         return undefined
      }
      set onapply(callback) {
         this.eventTarget.addEventListener('apply', callback)
      }
      get onapply() {
         return undefined
      }

      //property
      load(path) {
         fetch(path)
            .then(response => response.json())
            .then(data => {
               this.configs = data;
               if (this.configs) this.#getPath();
               let renderEvent = new CustomEvent('load', {});
               this.eventTarget.dispatchEvent(renderEvent);
            })
      }
      download(name) {
         let blob = new Blob([this.code], { type: "application/javascript" });
         let link = document.createElement("a");
         link.href = URL.createObjectURL(blob);
         link.download = name ? name + '.js' : `Marshmallow.${this.configs.version}.js`;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(link.href);
      }
      apply() {
         let blob = new Blob([this.code], { type: "application/javascript" });
         let url = URL.createObjectURL(blob);
         let script = document.createElement("script");
         script.src = url;
         document.head.appendChild(script);
         script.onload = () => {
            URL.revokeObjectURL(url);
            let renderEvent = new CustomEvent('apply', {});
            this.eventTarget.dispatchEvent(renderEvent);
         };
      }

      // private property 
      #retryFetch(url, retries = 20) {
         return fetch(url).then(res => {
            if (!res.ok && res.status !== 404) {
               if (retries > 0) return this.#retryFetch(url, retries - 1);
               else throw new Error(`Failed to fetch ${url} after retries`);
            }
            return res;
         }).catch(err => {
            if (retries > 0) return this.#retryFetch(url, retries - 1);
            else throw err;
         });
      }
      #getPath() {
         let promiseArr = [];

         promiseArr.push(this.#retryFetch(this.configs.template)
            .then(response => response.text())
            .then(data => this.configs.template = data));

         for (let i in this.configs.libs) {
            promiseArr.push(this.#retryFetch(this.configs.libs[i])
               .then(response => response.text())
               .then(y => this.configs.libs[i] = y));
         }

         for (let i in this.configs.components) {
            promiseArr.push(this.#retryFetch(this.configs.components[i].script)
               .then(response => response.text())
               .then(y => this.configs.components[i].script = y));

            promiseArr.push(this.#retryFetch(this.configs.components[i].style)
               .then(response => response.text())
               .then(y => this.configs.components[i].style = y));
         }

         Promise.all(promiseArr).then(() => this.#insert());
      }
      #insert() {
         let template = this.configs.template;
         let libs = '';
         let components = '';
         let defineElements = '';

         for (let i in this.configs.libs) {
            let src = this.configs.libs[i];
            if (src) {
               let raw = String.raw`${this.#extractBlock(src)}`
               libs += `class ${i} ${raw}\n   `;
            }
         }
         for (let i in this.configs.components) {
            
            let { name, script, style } = this.configs.components[i];
            if (name && script && style) {
               let raw = String.raw`${this.#extractBlock(script)}`
               raw = this.#write(raw, 'STYLE', style);
               components += `class ${i} extends HTMLElement ${raw}\n   `;
               defineElements += `customElements.define('${name}', ${i});\n         `;
            }
         }

         template = this.#write(template, 'VERSION', this.configs.version);
         template = this.#write(template, 'LIBS', libs);
         template = this.#write(template, 'COMPONENTS', components);
         template = this.#write(template, 'DEFINE-ELEMENTS', defineElements);
         this.code = template;
         let renderEvent = new CustomEvent('render', {});
         this.eventTarget.dispatchEvent(renderEvent);

      }
      #write(template, key, string) {
         let placeholder = `[[["${key}"]]]`;
         let safeString = String.raw`${string}`;
         return template.replaceAll(placeholder, safeString);
      }
      #extractBlock(code) {
         let start = code.indexOf('{');
         let end = code.lastIndexOf('}');
         if (start === -1 || end === -1 || start >= end) {
            return "";
         }
         return code.substring(start, end + 1);
      }
   }
   window.Bundle = Bundle;
})()