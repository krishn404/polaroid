if(!self.define){let e,a={};const i=(i,c)=>(i=new URL(i+".js",c).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,s)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(a[f])return;let t={};const n=e=>i(e,f),d={module:{uri:f},exports:t,require:n};a[f]=Promise.all(c.map((e=>d[e]||n(e)))).then((e=>(s(...e),t)))}}define(["./workbox-4d767a27"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Polaroid1.jpg",revision:"dde99609a0abc271f1bf6e6076de08cc"},{url:"/Polaroid2.jpg",revision:"79e8bafd56befc4e898fdae9b381a287"},{url:"/Polaroid3.jpg",revision:"c205d85c86ee3cc28ba24d709a6a9ccf"},{url:"/Polaroid4.jpg",revision:"8d9349e088594bf0afaa96b904ce37b4"},{url:"/Retrova.jpg",revision:"098c579701afb76f167f7aae8b6988f6"},{url:"/_next/app-build-manifest.json",revision:"4e315f9e49c697c7d12051c7dc50881e"},{url:"/_next/static/chunks/117-f47ea8712918a273.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/559-a92b50311d985970.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/ad2866b8-fe78772e8e3901c2.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/app/_not-found/page-77eac46ba97e2099.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/app/layout-c621c9d85c2ae2bd.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/app/page-56ac2ec7c67ac578.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/fd9d1056-ee274d2cbacd5e18.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/main-11fe3345e219a7ca.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/main-app-d3a999f6a00abba3.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-488cde5bd9645fa8.js",revision:"lNxb1Dg7pL0M2CLy0XNR2"},{url:"/_next/static/css/0c70e9e2ac739442.css",revision:"0c70e9e2ac739442"},{url:"/_next/static/css/3a4b916bd71d9238.css",revision:"3a4b916bd71d9238"},{url:"/_next/static/lNxb1Dg7pL0M2CLy0XNR2/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/lNxb1Dg7pL0M2CLy0XNR2/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/05f970ec0bd776d8-s.p.woff2",revision:"7ffc20a9fbd02e6802396a664bd7a081"},{url:"/_next/static/media/080434eb75e77883-s.woff2",revision:"4b5c858a70c5fb8037cf08b57f37c46c"},{url:"/_next/static/media/08410f27a0a34b38-s.p.woff2",revision:"82826aed984e5ebec8b34de03c64825d"},{url:"/_next/static/media/09f7b6b7f4b56175-s.p.woff2",revision:"ceedb0aac1b044daf23883e32006fbed"},{url:"/_next/static/media/0b30a44b5eb1a594-s.p.woff2",revision:"832bb9f6dfb82d55bd6c51be048941ae"},{url:"/_next/static/media/0bbebd155e89f1d0-s.woff2",revision:"751f37c002bbebbe7ce1aa293efff5f9"},{url:"/_next/static/media/147bfce26dd9c7af-s.woff2",revision:"0a3cde428a1b9aea068302ad32f82068"},{url:"/_next/static/media/14a9d6843fc4297c-s.woff2",revision:"6cae8abf15e8421a3802735373064031"},{url:"/_next/static/media/1a07f137f9550015-s.woff2",revision:"d85a56f03e8ed936d2f5d7821309f9b9"},{url:"/_next/static/media/1b3800ed4c918892-s.p.woff2",revision:"e253ab00a4ae4563e11649db12bf94ed"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/26d8bdd419bd16d8-s.woff2",revision:"175d044ea389b87ed0f7a166e1ef118a"},{url:"/_next/static/media/2a3bb53ac186ca26-s.p.woff2",revision:"8e85f6c016dfe8736f057e647d2e3821"},{url:"/_next/static/media/2f9a19ba2f2d8ddb-s.woff2",revision:"ef5a0e2ff7d22cf8448a378d863906fc"},{url:"/_next/static/media/33417c49c7529ced-s.p.woff2",revision:"50607655bf31ddde30e505c00e4c6a3e"},{url:"/_next/static/media/340e5f507627f4a0-s.p.woff2",revision:"bccfa8ca20e12ca9688a849b02c2fc9b"},{url:"/_next/static/media/3782aa48a2ea3076-s.woff2",revision:"a1699bc237804263b52781fc0e36f1ca"},{url:"/_next/static/media/3bd9a93c89179028-s.p.woff2",revision:"ee874148e318f3e535d0ae5fc84b0a09"},{url:"/_next/static/media/3c0a36d4615ad53c-s.woff2",revision:"192fa73323a2be4d628daabfbe7303ab"},{url:"/_next/static/media/41e7ce1ad66c1045-s.p.woff2",revision:"80e55008a1c597e5caf735d73dd22125"},{url:"/_next/static/media/429c0cf53a00861d-s.woff2",revision:"0cc0da91a7687bdb461f6441668c2a5e"},{url:"/_next/static/media/43e2f55ae95f1ff6-s.woff2",revision:"c581fab780505ad60982c96981e27379"},{url:"/_next/static/media/4c5ce8dda3f2e57a-s.woff2",revision:"03cf188204d8993592a82cbacd11f870"},{url:"/_next/static/media/4c72e9df442243b8-s.p.woff2",revision:"6abc8e74908890ea515a3451e8ff2bdd"},{url:"/_next/static/media/548d4a6452851abd-s.woff2",revision:"e07daf06ed71ab976d2104779c0a4c0d"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/5ad472feaf66a382-s.woff2",revision:"e641740006a6e44b4c99c6b16182d99a"},{url:"/_next/static/media/5efdc3eaf2429a0c-s.p.woff2",revision:"7e63abf1eb0e520ca6b29c08f2b1f423"},{url:"/_next/static/media/5f0cdbb46ad22d73-s.p.woff2",revision:"71f31febd3d4006516904558a502e4d6"},{url:"/_next/static/media/625f738085e6aa17-s.p.woff2",revision:"152219adc2edeee3d4451848ea7b7e1c"},{url:"/_next/static/media/64579aaceba9f83a-s.p.woff2",revision:"44025666cfb90c19f4a7aaafc7132b9a"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/78bc89dafd10ae87-s.p.woff2",revision:"da76bc360b7f449b91670d70fb197b67"},{url:"/_next/static/media/797ceaad3c9a531e-s.woff2",revision:"d55229de741075f3bc957f837914716d"},{url:"/_next/static/media/89f9cb1a88b9175b-s.woff2",revision:"7bef170a9f21137583e3f063b69732ac"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a1b489d74e9003ff-s.p.woff2",revision:"3581be239f83479de4fd1ba1c1a0b328"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/b17c9b6dae28e60b-s.woff2",revision:"6d7ad0615036a6087d071c1447d37a71"},{url:"/_next/static/media/bbe178ab8b70b75e-s.woff2",revision:"0788467ba47dd3aecc4dff229dd13a2f"},{url:"/_next/static/media/be2407ec0e8b92bf-s.woff2",revision:"a86a05dd276cf60440d8bf6454160887"},{url:"/_next/static/media/bf273aca3d6b346f-s.p.woff2",revision:"3698184e9c630f266ae6b549165aa845"},{url:"/_next/static/media/c59e126942bb935a-s.woff2",revision:"c1403e3e348a07c3d724f16338201aee"},{url:"/_next/static/media/c6582816bbb82cec-s.woff2",revision:"f7afc30033c03db8ce6193274d91b046"},{url:"/_next/static/media/c89cfa4ee44cbc90-s.woff2",revision:"265b689bbce63c706c7cfe1b9403bf27"},{url:"/_next/static/media/cedc0d4e6b719cc0-s.p.woff2",revision:"26f7bf116b51e60d99cc17554e9a5315"},{url:"/_next/static/media/d14523e549eb010c-s.woff2",revision:"85964479247c3a9915ddd4d7e797cf70"},{url:"/_next/static/media/d8587557c8677295-s.p.woff2",revision:"6a2b9c150774ca3e809b7a601c52cff6"},{url:"/_next/static/media/dd053ec84d009e81-s.p.woff2",revision:"3f8a9f93af4d2a7206b0a312c53aedd5"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/e37e706ec359dc87-s.woff2",revision:"9c7615f5f431af488357352f8f61f783"},{url:"/_next/static/media/e7b354626d982aa8-s.woff2",revision:"13a00bde1987dec0dca7b91d629eb48c"},{url:"/_next/static/media/e9b60341794c6df7-s.p.woff2",revision:"b2529f613a5fd75a4e38f090cfa1ecbc"},{url:"/_next/static/media/e9c77e354c009cc8-s.woff2",revision:"16bb99df46face2f2538ed0220478ac6"},{url:"/_next/static/media/ee36c2082ce7e575-s.p.woff2",revision:"9280792a6da1e2895f0bf077929cc2b1"},{url:"/_next/static/media/f88a66689baaaeee-s.woff2",revision:"1548bf862ca9654564c09394c830fb7d"},{url:"/_next/static/media/fad5e1188f09afdc-s.p.woff2",revision:"fd3b11f7f465baa5fd052d7b5d9e9a5e"},{url:"/_next/static/media/ff2fcc32bb54d74c-s.woff2",revision:"af12f457185fc3f34694b77358a2266b"},{url:"/icon-192x192.png",revision:"f6e59711a8965bac20564b3a13c1b00f"},{url:"/icon-512x512.png",revision:"f1171a4a426c6a4405db2514a39ec07a"},{url:"/icons/icon-144x144.png",revision:"9c6838792476cd1e4de8070760604bbf"},{url:"/icons/icon-192x192.png",revision:"f6e59711a8965bac20564b3a13c1b00f"},{url:"/icons/icon-512x512.png",revision:"f1171a4a426c6a4405db2514a39ec07a"},{url:"/icons/icon-72x72.png",revision:"a1a41ddc82d198657b4ab205ffccafbe"},{url:"/icons/icon-96x96.png",revision:"1ff1968942d49b97d88e9e2e7be3e213"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
