/* Cache file statis agar kunjungan berikutnya cepat. Permintaan API (POST ke Apps Script) tidak pernah di-cache. */
var V='sbb-xxi-v1',HOSTS=['cdnjs.cloudflare.com','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
 var r=e.request;if(r.method!=='GET')return;
 var u=new URL(r.url),same=u.origin===self.location.origin;
 if(!same&&HOSTS.indexOf(u.hostname)<0)return;
 var nav=r.mode==='navigate'||(same&&/\/(index\.html)?$/.test(u.pathname));
 if(nav){e.respondWith(fetch(r).then(function(x){var c=x.clone();caches.open(V).then(function(h){h.put(r,c)});return x}).catch(function(){return caches.match(r)}));return}
 e.respondWith(caches.open(V).then(function(h){return h.match(r).then(function(m){
  var f=fetch(r).then(function(x){if(x&&(x.ok||x.type==='opaque'))h.put(r,x.clone());return x}).catch(function(){return m});
  return m||f})}));
});
