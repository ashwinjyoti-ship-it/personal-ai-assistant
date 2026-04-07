var Ar=Object.defineProperty;var ra=t=>{throw TypeError(t)};var Lr=(t,e,a)=>e in t?Ar(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var O=(t,e,a)=>Lr(t,typeof e!="symbol"?e+"":e,a),At=(t,e,a)=>e.has(t)||ra("Cannot "+a);var _=(t,e,a)=>(At(t,e,"read from private field"),a?a.call(t):e.get(t)),W=(t,e,a)=>e.has(t)?ra("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),M=(t,e,a,r)=>(At(t,e,"write to private field"),r?r.call(t,a):e.set(t,a),a),K=(t,e,a)=>(At(t,e,"access private method"),a);var na=(t,e,a,r)=>({set _(n){M(t,e,n,a)},get _(){return _(t,e,r)}});var sa=(t,e,a)=>(r,n)=>{let s=-1;return i(0);async function i(o){if(o<=s)throw new Error("next() called multiple times");s=o;let l,c=!1,d;if(t[o]?(d=t[o][0][0],r.req.routeIndex=o):d=o===t.length&&n||void 0,d)try{l=await d(r,()=>i(o+1))}catch(p){if(p instanceof Error&&e)r.error=p,l=await e(p,r),c=!0;else throw p}else r.finalized===!1&&a&&(l=await a(r));return l&&(r.finalized===!1||c)&&(r.res=l),r}},Mr=Symbol(),$r=async(t,e=Object.create(null))=>{const{all:a=!1,dot:r=!1}=e,s=(t instanceof Aa?t.raw.headers:t.headers).get("Content-Type");return s!=null&&s.startsWith("multipart/form-data")||s!=null&&s.startsWith("application/x-www-form-urlencoded")?Br(t,{all:a,dot:r}):{}};async function Br(t,e){const a=await t.formData();return a?jr(a,e):{}}function jr(t,e){const a=Object.create(null);return t.forEach((r,n)=>{e.all||n.endsWith("[]")?Pr(a,n,r):a[n]=r}),e.dot&&Object.entries(a).forEach(([r,n])=>{r.includes(".")&&(Ur(a,r,n),delete a[r])}),a}var Pr=(t,e,a)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(a):t[e]=[t[e],a]:e.endsWith("[]")?t[e]=[a]:t[e]=a},Ur=(t,e,a)=>{let r=t;const n=e.split(".");n.forEach((s,i)=>{i===n.length-1?r[s]=a:((!r[s]||typeof r[s]!="object"||Array.isArray(r[s])||r[s]instanceof File)&&(r[s]=Object.create(null)),r=r[s])})},Ia=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},Hr=t=>{const{groups:e,path:a}=Gr(t),r=Ia(a);return Fr(r,e)},Gr=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(a,r)=>{const n=`@${r}`;return e.push([n,a]),n}),{groups:e,path:t}},Fr=(t,e)=>{for(let a=e.length-1;a>=0;a--){const[r]=e[a];for(let n=t.length-1;n>=0;n--)if(t[n].includes(r)){t[n]=t[n].replace(r,e[a][1]);break}}return t},Et={},Wr=(t,e)=>{if(t==="*")return"*";const a=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const r=`${t}#${e}`;return Et[r]||(a[2]?Et[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,a[1],new RegExp(`^${a[2]}(?=/${e})`)]:[t,a[1],new RegExp(`^${a[2]}$`)]:Et[r]=[t,a[1],!0]),Et[r]}return null},zt=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return e(a)}catch{return a}})}},qr=t=>zt(t,decodeURI),Ca=t=>{const e=t.url,a=e.indexOf("/",e.indexOf(":")+4);let r=a;for(;r<e.length;r++){const n=e.charCodeAt(r);if(n===37){const s=e.indexOf("?",r),i=e.indexOf("#",r),o=s===-1?i===-1?void 0:i:i===-1?s:Math.min(s,i),l=e.slice(a,o);return qr(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(n===63||n===35)break}return e.slice(a,r)},zr=t=>{const e=Ca(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},ze=(t,e,...a)=>(a.length&&(e=ze(e,...a)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Oa=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),a=[];let r="";return e.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){a.length===0&&r===""?a.push("/"):a.push(r);const s=n.replace("?","");r+="/"+s,a.push(r)}else r+="/"+n}),a.filter((n,s,i)=>i.indexOf(n)===s)},Lt=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?zt(t,Na):t):t,Ra=(t,e,a)=>{let r;if(!a&&e&&!/[%+]/.test(e)){let i=t.indexOf("?",8);if(i===-1)return;for(t.startsWith(e,i+1)||(i=t.indexOf(`&${e}`,i+1));i!==-1;){const o=t.charCodeAt(i+e.length+1);if(o===61){const l=i+e.length+2,c=t.indexOf("&",l);return Lt(t.slice(l,c===-1?void 0:c))}else if(o==38||isNaN(o))return"";i=t.indexOf(`&${e}`,i+1)}if(r=/[%+]/.test(t),!r)return}const n={};r??(r=/[%+]/.test(t));let s=t.indexOf("?",8);for(;s!==-1;){const i=t.indexOf("&",s+1);let o=t.indexOf("=",s);o>i&&i!==-1&&(o=-1);let l=t.slice(s+1,o===-1?i===-1?void 0:i:o);if(r&&(l=Lt(l)),s=i,l==="")continue;let c;o===-1?c="":(c=t.slice(o+1,i===-1?void 0:i),r&&(c=Lt(c))),a?(n[l]&&Array.isArray(n[l])||(n[l]=[]),n[l].push(c)):n[l]??(n[l]=c)}return e?n[e]:n},Kr=Ra,Yr=(t,e)=>Ra(t,e,!0),Na=decodeURIComponent,ia=t=>zt(t,Na),Ve,pe,xe,La,Ma,Ht,De,Ea,Aa=(Ea=class{constructor(t,e="/",a=[[]]){W(this,xe);O(this,"raw");W(this,Ve);W(this,pe);O(this,"routeIndex",0);O(this,"path");O(this,"bodyCache",{});W(this,De,t=>{const{bodyCache:e,raw:a}=this,r=e[t];if(r)return r;const n=Object.keys(e)[0];return n?e[n].then(s=>(n==="json"&&(s=JSON.stringify(s)),new Response(s)[t]())):e[t]=a[t]()});this.raw=t,this.path=e,M(this,pe,a),M(this,Ve,{})}param(t){return t?K(this,xe,La).call(this,t):K(this,xe,Ma).call(this)}query(t){return Kr(this.url,t)}queries(t){return Yr(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((a,r)=>{e[r]=a}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await $r(this,t))}json(){return _(this,De).call(this,"text").then(t=>JSON.parse(t))}text(){return _(this,De).call(this,"text")}arrayBuffer(){return _(this,De).call(this,"arrayBuffer")}blob(){return _(this,De).call(this,"blob")}formData(){return _(this,De).call(this,"formData")}addValidatedData(t,e){_(this,Ve)[t]=e}valid(t){return _(this,Ve)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[Mr](){return _(this,pe)}get matchedRoutes(){return _(this,pe)[0].map(([[,t]])=>t)}get routePath(){return _(this,pe)[0].map(([[,t]])=>t)[this.routeIndex].path}},Ve=new WeakMap,pe=new WeakMap,xe=new WeakSet,La=function(t){const e=_(this,pe)[0][this.routeIndex][1][t],a=K(this,xe,Ht).call(this,e);return a&&/\%/.test(a)?ia(a):a},Ma=function(){const t={},e=Object.keys(_(this,pe)[0][this.routeIndex][1]);for(const a of e){const r=K(this,xe,Ht).call(this,_(this,pe)[0][this.routeIndex][1][a]);r!==void 0&&(t[a]=/\%/.test(r)?ia(r):r)}return t},Ht=function(t){return _(this,pe)[1]?_(this,pe)[1][t]:t},De=new WeakMap,Ea),Jr={Stringify:1},$a=async(t,e,a,r,n)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const s=t.callbacks;return s!=null&&s.length?(n?n[0]+=t:n=[t],Promise.all(s.map(o=>o({phase:e,buffer:n,context:r}))).then(o=>Promise.all(o.filter(Boolean).map(l=>$a(l,e,!1,r,n))).then(()=>n[0]))):Promise.resolve(t)},Vr="text/plain; charset=UTF-8",Mt=(t,e)=>({"Content-Type":t,...e}),mt,ht,be,Ze,_e,le,gt,Xe,Qe,$e,ft,yt,Ie,Ke,Ta,Zr=(Ta=class{constructor(t,e){W(this,Ie);W(this,mt);W(this,ht);O(this,"env",{});W(this,be);O(this,"finalized",!1);O(this,"error");W(this,Ze);W(this,_e);W(this,le);W(this,gt);W(this,Xe);W(this,Qe);W(this,$e);W(this,ft);W(this,yt);O(this,"render",(...t)=>(_(this,Xe)??M(this,Xe,e=>this.html(e)),_(this,Xe).call(this,...t)));O(this,"setLayout",t=>M(this,gt,t));O(this,"getLayout",()=>_(this,gt));O(this,"setRenderer",t=>{M(this,Xe,t)});O(this,"header",(t,e,a)=>{this.finalized&&M(this,le,new Response(_(this,le).body,_(this,le)));const r=_(this,le)?_(this,le).headers:_(this,$e)??M(this,$e,new Headers);e===void 0?r.delete(t):a!=null&&a.append?r.append(t,e):r.set(t,e)});O(this,"status",t=>{M(this,Ze,t)});O(this,"set",(t,e)=>{_(this,be)??M(this,be,new Map),_(this,be).set(t,e)});O(this,"get",t=>_(this,be)?_(this,be).get(t):void 0);O(this,"newResponse",(...t)=>K(this,Ie,Ke).call(this,...t));O(this,"body",(t,e,a)=>K(this,Ie,Ke).call(this,t,e,a));O(this,"text",(t,e,a)=>!_(this,$e)&&!_(this,Ze)&&!e&&!a&&!this.finalized?new Response(t):K(this,Ie,Ke).call(this,t,e,Mt(Vr,a)));O(this,"json",(t,e,a)=>K(this,Ie,Ke).call(this,JSON.stringify(t),e,Mt("application/json",a)));O(this,"html",(t,e,a)=>{const r=n=>K(this,Ie,Ke).call(this,n,e,Mt("text/html; charset=UTF-8",a));return typeof t=="object"?$a(t,Jr.Stringify,!1,{}).then(r):r(t)});O(this,"redirect",(t,e)=>{const a=String(t);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,e??302)});O(this,"notFound",()=>(_(this,Qe)??M(this,Qe,()=>new Response),_(this,Qe).call(this,this)));M(this,mt,t),e&&(M(this,_e,e.executionCtx),this.env=e.env,M(this,Qe,e.notFoundHandler),M(this,yt,e.path),M(this,ft,e.matchResult))}get req(){return _(this,ht)??M(this,ht,new Aa(_(this,mt),_(this,yt),_(this,ft))),_(this,ht)}get event(){if(_(this,_e)&&"respondWith"in _(this,_e))return _(this,_e);throw Error("This context has no FetchEvent")}get executionCtx(){if(_(this,_e))return _(this,_e);throw Error("This context has no ExecutionContext")}get res(){return _(this,le)||M(this,le,new Response(null,{headers:_(this,$e)??M(this,$e,new Headers)}))}set res(t){if(_(this,le)&&t){t=new Response(t.body,t);for(const[e,a]of _(this,le).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=_(this,le).headers.getSetCookie();t.headers.delete("set-cookie");for(const n of r)t.headers.append("set-cookie",n)}else t.headers.set(e,a)}M(this,le,t),this.finalized=!0}get var(){return _(this,be)?Object.fromEntries(_(this,be)):{}}},mt=new WeakMap,ht=new WeakMap,be=new WeakMap,Ze=new WeakMap,_e=new WeakMap,le=new WeakMap,gt=new WeakMap,Xe=new WeakMap,Qe=new WeakMap,$e=new WeakMap,ft=new WeakMap,yt=new WeakMap,Ie=new WeakSet,Ke=function(t,e,a){const r=_(this,le)?new Headers(_(this,le).headers):_(this,$e)??new Headers;if(typeof e=="object"&&"headers"in e){const s=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[i,o]of s)i.toLowerCase()==="set-cookie"?r.append(i,o):r.set(i,o)}if(a)for(const[s,i]of Object.entries(a))if(typeof i=="string")r.set(s,i);else{r.delete(s);for(const o of i)r.append(s,o)}const n=typeof e=="number"?e:(e==null?void 0:e.status)??_(this,Ze);return new Response(t,{status:n,headers:r})},Ta),re="ALL",Xr="all",Qr=["get","post","put","delete","options","patch"],Ba="Can not add a route since the matcher is already built.",ja=class extends Error{},en="__COMPOSED_HANDLER",tn=t=>t.text("404 Not Found",404),oa=(t,e)=>{if("getResponse"in t){const a=t.getResponse();return e.newResponse(a.body,a)}return console.error(t),e.text("Internal Server Error",500)},he,ne,Pa,ge,Le,Tt,xt,et,an=(et=class{constructor(e={}){W(this,ne);O(this,"get");O(this,"post");O(this,"put");O(this,"delete");O(this,"options");O(this,"patch");O(this,"all");O(this,"on");O(this,"use");O(this,"router");O(this,"getPath");O(this,"_basePath","/");W(this,he,"/");O(this,"routes",[]);W(this,ge,tn);O(this,"errorHandler",oa);O(this,"onError",e=>(this.errorHandler=e,this));O(this,"notFound",e=>(M(this,ge,e),this));O(this,"fetch",(e,...a)=>K(this,ne,xt).call(this,e,a[1],a[0],e.method));O(this,"request",(e,a,r,n)=>e instanceof Request?this.fetch(a?new Request(e,a):e,r,n):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${ze("/",e)}`,a),r,n)));O(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(K(this,ne,xt).call(this,e.request,e,void 0,e.request.method))})});[...Qr,Xr].forEach(s=>{this[s]=(i,...o)=>(typeof i=="string"?M(this,he,i):K(this,ne,Le).call(this,s,_(this,he),i),o.forEach(l=>{K(this,ne,Le).call(this,s,_(this,he),l)}),this)}),this.on=(s,i,...o)=>{for(const l of[i].flat()){M(this,he,l);for(const c of[s].flat())o.map(d=>{K(this,ne,Le).call(this,c.toUpperCase(),_(this,he),d)})}return this},this.use=(s,...i)=>(typeof s=="string"?M(this,he,s):(M(this,he,"*"),i.unshift(s)),i.forEach(o=>{K(this,ne,Le).call(this,re,_(this,he),o)}),this);const{strict:r,...n}=e;Object.assign(this,n),this.getPath=r??!0?e.getPath??Ca:zr}route(e,a){const r=this.basePath(e);return a.routes.map(n=>{var i;let s;a.errorHandler===oa?s=n.handler:(s=async(o,l)=>(await sa([],a.errorHandler)(o,()=>n.handler(o,l))).res,s[en]=n.handler),K(i=r,ne,Le).call(i,n.method,n.path,s)}),this}basePath(e){const a=K(this,ne,Pa).call(this);return a._basePath=ze(this._basePath,e),a}mount(e,a,r){let n,s;r&&(typeof r=="function"?s=r:(s=r.optionHandler,r.replaceRequest===!1?n=l=>l:n=r.replaceRequest));const i=s?l=>{const c=s(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};n||(n=(()=>{const l=ze(this._basePath,e),c=l==="/"?0:l.length;return d=>{const p=new URL(d.url);return p.pathname=p.pathname.slice(c)||"/",new Request(p,d)}})());const o=async(l,c)=>{const d=await a(n(l.req.raw),...i(l));if(d)return d;await c()};return K(this,ne,Le).call(this,re,ze(e,"*"),o),this}},he=new WeakMap,ne=new WeakSet,Pa=function(){const e=new et({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,M(e,ge,_(this,ge)),e.routes=this.routes,e},ge=new WeakMap,Le=function(e,a,r){e=e.toUpperCase(),a=ze(this._basePath,a);const n={basePath:this._basePath,path:a,method:e,handler:r};this.router.add(e,a,[r,n]),this.routes.push(n)},Tt=function(e,a){if(e instanceof Error)return this.errorHandler(e,a);throw e},xt=function(e,a,r,n){if(n==="HEAD")return(async()=>new Response(null,await K(this,ne,xt).call(this,e,a,r,"GET")))();const s=this.getPath(e,{env:r}),i=this.router.match(n,s),o=new Zr(e,{path:s,matchResult:i,env:r,executionCtx:a,notFoundHandler:_(this,ge)});if(i[0].length===1){let c;try{c=i[0][0][0][0](o,async()=>{o.res=await _(this,ge).call(this,o)})}catch(d){return K(this,ne,Tt).call(this,d,o)}return c instanceof Promise?c.then(d=>d||(o.finalized?o.res:_(this,ge).call(this,o))).catch(d=>K(this,ne,Tt).call(this,d,o)):c??_(this,ge).call(this,o)}const l=sa(i[0],this.errorHandler,_(this,ge));return(async()=>{try{const c=await l(o);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return K(this,ne,Tt).call(this,c,o)}})()},et),Ua=[];function rn(t,e){const a=this.buildAllMatchers(),r=((n,s)=>{const i=a[n]||a[re],o=i[2][s];if(o)return o;const l=s.match(i[0]);if(!l)return[[],Ua];const c=l.indexOf("",1);return[i[1][c],l]});return this.match=r,r(t,e)}var St="[^/]+",dt=".*",ut="(?:|/.*)",Ye=Symbol(),nn=new Set(".\\+*[^]$()");function sn(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===dt||t===ut?1:e===dt||e===ut?-1:t===St?1:e===St?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var Be,je,fe,He,on=(He=class{constructor(){W(this,Be);W(this,je);W(this,fe,Object.create(null))}insert(e,a,r,n,s){if(e.length===0){if(_(this,Be)!==void 0)throw Ye;if(s)return;M(this,Be,a);return}const[i,...o]=e,l=i==="*"?o.length===0?["","",dt]:["","",St]:i==="/*"?["","",ut]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const d=l[1];let p=l[2]||St;if(d&&l[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw Ye;if(c=_(this,fe)[p],!c){if(Object.keys(_(this,fe)).some(h=>h!==dt&&h!==ut))throw Ye;if(s)return;c=_(this,fe)[p]=new He,d!==""&&M(c,je,n.varIndex++)}!s&&d!==""&&r.push([d,_(c,je)])}else if(c=_(this,fe)[i],!c){if(Object.keys(_(this,fe)).some(d=>d.length>1&&d!==dt&&d!==ut))throw Ye;if(s)return;c=_(this,fe)[i]=new He}c.insert(o,a,r,n,s)}buildRegExpStr(){const a=Object.keys(_(this,fe)).sort(sn).map(r=>{const n=_(this,fe)[r];return(typeof _(n,je)=="number"?`(${r})@${_(n,je)}`:nn.has(r)?`\\${r}`:r)+n.buildRegExpStr()});return typeof _(this,Be)=="number"&&a.unshift(`#${_(this,Be)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},Be=new WeakMap,je=new WeakMap,fe=new WeakMap,He),It,vt,xa,ln=(xa=class{constructor(){W(this,It,{varIndex:0});W(this,vt,new on)}insert(t,e,a){const r=[],n=[];for(let i=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,l=>{const c=`@\\${i}`;return n[i]=[c,l],i++,o=!0,c}),!o)break}const s=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=n.length-1;i>=0;i--){const[o]=n[i];for(let l=s.length-1;l>=0;l--)if(s[l].indexOf(o)!==-1){s[l]=s[l].replace(o,n[i][1]);break}}return _(this,vt).insert(s,e,r,_(this,It),a),r}buildRegExp(){let t=_(this,vt).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const a=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,s,i)=>s!==void 0?(a[++e]=Number(s),"$()"):(i!==void 0&&(r[Number(i)]=++e),"")),[new RegExp(`^${t}`),a,r]}},It=new WeakMap,vt=new WeakMap,xa),cn=[/^$/,[],Object.create(null)],kt=Object.create(null);function Ha(t){return kt[t]??(kt[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function dn(){kt=Object.create(null)}function un(t){var c;const e=new ln,a=[];if(t.length===0)return cn;const r=t.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,p],[h,w])=>d?1:h?-1:p.length-w.length),n=Object.create(null);for(let d=0,p=-1,h=r.length;d<h;d++){const[w,f,x]=r[d];w?n[f]=[x.map(([T])=>[T,Object.create(null)]),Ua]:p++;let y;try{y=e.insert(f,p,w)}catch(T){throw T===Ye?new ja(f):T}w||(a[p]=x.map(([T,E])=>{const C=Object.create(null);for(E-=1;E>=0;E--){const[R,$]=y[E];C[R]=$}return[T,C]}))}const[s,i,o]=e.buildRegExp();for(let d=0,p=a.length;d<p;d++)for(let h=0,w=a[d].length;h<w;h++){const f=(c=a[d][h])==null?void 0:c[1];if(!f)continue;const x=Object.keys(f);for(let y=0,T=x.length;y<T;y++)f[x[y]]=o[f[x[y]]]}const l=[];for(const d in i)l[d]=a[i[d]];return[s,l,n]}function We(t,e){if(t){for(const a of Object.keys(t).sort((r,n)=>n.length-r.length))if(Ha(a).test(e))return[...t[a]]}}var Ce,Oe,Ct,Ga,ka,pn=(ka=class{constructor(){W(this,Ct);O(this,"name","RegExpRouter");W(this,Ce);W(this,Oe);O(this,"match",rn);M(this,Ce,{[re]:Object.create(null)}),M(this,Oe,{[re]:Object.create(null)})}add(t,e,a){var o;const r=_(this,Ce),n=_(this,Oe);if(!r||!n)throw new Error(Ba);r[t]||[r,n].forEach(l=>{l[t]=Object.create(null),Object.keys(l[re]).forEach(c=>{l[t][c]=[...l[re][c]]})}),e==="/*"&&(e="*");const s=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const l=Ha(e);t===re?Object.keys(r).forEach(c=>{var d;(d=r[c])[e]||(d[e]=We(r[c],e)||We(r[re],e)||[])}):(o=r[t])[e]||(o[e]=We(r[t],e)||We(r[re],e)||[]),Object.keys(r).forEach(c=>{(t===re||t===c)&&Object.keys(r[c]).forEach(d=>{l.test(d)&&r[c][d].push([a,s])})}),Object.keys(n).forEach(c=>{(t===re||t===c)&&Object.keys(n[c]).forEach(d=>l.test(d)&&n[c][d].push([a,s]))});return}const i=Oa(e)||[e];for(let l=0,c=i.length;l<c;l++){const d=i[l];Object.keys(n).forEach(p=>{var h;(t===re||t===p)&&((h=n[p])[d]||(h[d]=[...We(r[p],d)||We(r[re],d)||[]]),n[p][d].push([a,s-c+l+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(_(this,Oe)).concat(Object.keys(_(this,Ce))).forEach(e=>{t[e]||(t[e]=K(this,Ct,Ga).call(this,e))}),M(this,Ce,M(this,Oe,void 0)),dn(),t}},Ce=new WeakMap,Oe=new WeakMap,Ct=new WeakSet,Ga=function(t){const e=[];let a=t===re;return[_(this,Ce),_(this,Oe)].forEach(r=>{const n=r[t]?Object.keys(r[t]).map(s=>[s,r[t][s]]):[];n.length!==0?(a||(a=!0),e.push(...n)):t!==re&&e.push(...Object.keys(r[re]).map(s=>[s,r[re][s]]))}),a?un(e):null},ka),Re,Ee,Sa,mn=(Sa=class{constructor(t){O(this,"name","SmartRouter");W(this,Re,[]);W(this,Ee,[]);M(this,Re,t.routers)}add(t,e,a){if(!_(this,Ee))throw new Error(Ba);_(this,Ee).push([t,e,a])}match(t,e){if(!_(this,Ee))throw new Error("Fatal error");const a=_(this,Re),r=_(this,Ee),n=a.length;let s=0,i;for(;s<n;s++){const o=a[s];try{for(let l=0,c=r.length;l<c;l++)o.add(...r[l]);i=o.match(t,e)}catch(l){if(l instanceof ja)continue;throw l}this.match=o.match.bind(o),M(this,Re,[o]),M(this,Ee,void 0);break}if(s===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(_(this,Ee)||_(this,Re).length!==1)throw new Error("No active router has been determined yet.");return _(this,Re)[0]}},Re=new WeakMap,Ee=new WeakMap,Sa),st=Object.create(null),Ne,oe,Pe,tt,ie,Te,Me,at,hn=(at=class{constructor(e,a,r){W(this,Te);W(this,Ne);W(this,oe);W(this,Pe);W(this,tt,0);W(this,ie,st);if(M(this,oe,r||Object.create(null)),M(this,Ne,[]),e&&a){const n=Object.create(null);n[e]={handler:a,possibleKeys:[],score:0},M(this,Ne,[n])}M(this,Pe,[])}insert(e,a,r){M(this,tt,++na(this,tt)._);let n=this;const s=Hr(a),i=[];for(let o=0,l=s.length;o<l;o++){const c=s[o],d=s[o+1],p=Wr(c,d),h=Array.isArray(p)?p[0]:c;if(h in _(n,oe)){n=_(n,oe)[h],p&&i.push(p[1]);continue}_(n,oe)[h]=new at,p&&(_(n,Pe).push(p),i.push(p[1])),n=_(n,oe)[h]}return _(n,Ne).push({[e]:{handler:r,possibleKeys:i.filter((o,l,c)=>c.indexOf(o)===l),score:_(this,tt)}}),n}search(e,a){var l;const r=[];M(this,ie,st);let s=[this];const i=Ia(a),o=[];for(let c=0,d=i.length;c<d;c++){const p=i[c],h=c===d-1,w=[];for(let f=0,x=s.length;f<x;f++){const y=s[f],T=_(y,oe)[p];T&&(M(T,ie,_(y,ie)),h?(_(T,oe)["*"]&&r.push(...K(this,Te,Me).call(this,_(T,oe)["*"],e,_(y,ie))),r.push(...K(this,Te,Me).call(this,T,e,_(y,ie)))):w.push(T));for(let E=0,C=_(y,Pe).length;E<C;E++){const R=_(y,Pe)[E],$=_(y,ie)===st?{}:{..._(y,ie)};if(R==="*"){const D=_(y,oe)["*"];D&&(r.push(...K(this,Te,Me).call(this,D,e,_(y,ie))),M(D,ie,$),w.push(D));continue}const[P,B,F]=R;if(!p&&!(F instanceof RegExp))continue;const H=_(y,oe)[P],q=i.slice(c).join("/");if(F instanceof RegExp){const D=F.exec(q);if(D){if($[B]=D[0],r.push(...K(this,Te,Me).call(this,H,e,_(y,ie),$)),Object.keys(_(H,oe)).length){M(H,ie,$);const j=((l=D[0].match(/\//))==null?void 0:l.length)??0;(o[j]||(o[j]=[])).push(H)}continue}}(F===!0||F.test(p))&&($[B]=p,h?(r.push(...K(this,Te,Me).call(this,H,e,$,_(y,ie))),_(H,oe)["*"]&&r.push(...K(this,Te,Me).call(this,_(H,oe)["*"],e,$,_(y,ie)))):(M(H,ie,$),w.push(H)))}}s=w.concat(o.shift()??[])}return r.length>1&&r.sort((c,d)=>c.score-d.score),[r.map(({handler:c,params:d})=>[c,d])]}},Ne=new WeakMap,oe=new WeakMap,Pe=new WeakMap,tt=new WeakMap,ie=new WeakMap,Te=new WeakSet,Me=function(e,a,r,n){const s=[];for(let i=0,o=_(e,Ne).length;i<o;i++){const l=_(e,Ne)[i],c=l[a]||l[re],d={};if(c!==void 0&&(c.params=Object.create(null),s.push(c),r!==st||n&&n!==st))for(let p=0,h=c.possibleKeys.length;p<h;p++){const w=c.possibleKeys[p],f=d[c.score];c.params[w]=n!=null&&n[w]&&!f?n[w]:r[w]??(n==null?void 0:n[w]),d[c.score]=!0}}return s},at),Ue,Da,gn=(Da=class{constructor(){O(this,"name","TrieRouter");W(this,Ue);M(this,Ue,new hn)}add(t,e,a){const r=Oa(e);if(r){for(let n=0,s=r.length;n<s;n++)_(this,Ue).insert(t,r[n],a);return}_(this,Ue).insert(t,e,a)}match(t,e){return _(this,Ue).search(t,e)}},Ue=new WeakMap,Da),ke=class extends an{constructor(t={}){super(t),this.router=t.router??new mn({routers:[new pn,new gn]})}},fn=t=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(s=>typeof s=="string"?s==="*"?()=>s:i=>s===i?i:null:typeof s=="function"?s:i=>s.includes(i)?i:null)(a.origin),n=(s=>typeof s=="function"?s:Array.isArray(s)?()=>s:()=>[])(a.allowMethods);return async function(i,o){var d;function l(p,h){i.res.headers.set(p,h)}const c=await r(i.req.header("origin")||"",i);if(c&&l("Access-Control-Allow-Origin",c),a.credentials&&l("Access-Control-Allow-Credentials","true"),(d=a.exposeHeaders)!=null&&d.length&&l("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),i.req.method==="OPTIONS"){a.origin!=="*"&&l("Vary","Origin"),a.maxAge!=null&&l("Access-Control-Max-Age",a.maxAge.toString());const p=await n(i.req.header("origin")||"",i);p.length&&l("Access-Control-Allow-Methods",p.join(","));let h=a.allowHeaders;if(!(h!=null&&h.length)){const w=i.req.header("Access-Control-Request-Headers");w&&(h=w.split(/\s*,\s*/))}return h!=null&&h.length&&(l("Access-Control-Allow-Headers",h.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),a.origin!=="*"&&i.header("Vary","Origin",{append:!0})}};function Fa(){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#000000">
  <link rel="manifest" href="/manifest.json">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Karna">
  <title>Karna</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/karna.css">
</head>
<body>
  <div id="app"></div>
  <div class="progress-bar" id="progressBar"></div>
  <div class="toast-container" id="toasts"></div>

  <script>
  // === Karna v3.1 Frontend ===
  var API = '/api';
  var state = {
    session: null,
    messages: [],
    loading: false,
    activeOverlay: null,
    settingsTab: 'profile',
    settingsSection: null,
    prevView: 'dashboard',
    threads: [],
    activeThreadId: null,
    view: 'dashboard',
    assistantName: 'Karna',
    gmailUnread: 0,
    pendingFiles: [],
    selectMode: false,
    selectedThreadIds: {},
  };

  // === Utility ===
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }
  
  async function api(path, options) {
    options = options || {};
    var headers = { 'Content-Type': 'application/json' };
    if (options.headers) { for (var k in options.headers) { headers[k] = options.headers[k]; } }
    if (state.session && state.session.sessionId) {
      headers['Authorization'] = 'Bearer ' + state.session.sessionId;
    }
    var res = await fetch(API + path, { method: options.method || 'GET', headers: headers, body: options.body });
    var text = await res.text();
    try { return JSON.parse(text); } catch(e) { return { error: 'Non-JSON response (' + res.status + '): ' + text.substring(0, 100) }; }
  }

  function saveSession(d) { state.session = d; try { localStorage.setItem('karna_session', JSON.stringify(d)); if (d && d.user && d.user.username) localStorage.setItem('karna_last_username', d.user.username); } catch(e) {} }
  function loadSession() { try { var s = localStorage.getItem('karna_session'); if (s) { var parsed = JSON.parse(s); if (parsed && typeof parsed === 'object') state.session = parsed; } } catch(e) { try { localStorage.removeItem('karna_session'); } catch(e2) {} } }
  function clearSession() { state.session = null; try { localStorage.removeItem('karna_session'); } catch(e) {} }

  function showToast(msg, type) {
    var c = document.getElementById('toasts');
    if (!c) return;
    var t = document.createElement('div');
    t.className = 'toast ' + (type || '');
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function() { t.style.opacity = '0'; setTimeout(function() { t.remove(); }, 300); }, 3000);
  }

  // Simple markdown to HTML with auto-linkification
  function md(text) {
    if (!text) return '';
    var s = text;
    s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    s = s.replace(/\\[([^\\]]+)\\]\\((https?:\\/\\/[^)]+)\\)/g, function(m, label, url) { return linkify(url, label); });
    s = s.replace(/(?<!href=["'])(?<!">)(https?:\\/\\/[^\\s<"'\\)]+)/g, function(url) { return linkify(url); });
    s = s.replace(/\`\`\`([\\s\\S]*?)\`\`\`/g, '<pre><code>$1</code></pre>');
    s = s.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
    s = s.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
    s = s.replace(/(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)/g, '<em>$1</em>');
    // Headings — must run before list processing so #-prefixed lines aren't misread
    s = s.replace(/^#{4} (.+)$/gm, '<h4>$1</h4>');
    s = s.replace(/^#{3} (.+)$/gm, '<h3>$1</h3>');
    s = s.replace(/^#{2} (.+)$/gm, '<h2>$1</h2>');
    s = s.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    s = s.replace(/^---+$/gm, '<hr>');
    s = s.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
    var lines = s.split('\\n');
    var result = [];
    var inList = false;
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].indexOf('<li>') === 0) {
        if (!inList) { result.push('<ul>'); inList = true; }
        result.push(lines[i]);
      } else {
        if (inList) { result.push('</ul>'); inList = false; }
        result.push(lines[i]);
      }
    }
    if (inList) result.push('</ul>');
    // Join with <br> but skip the separator when the current or next line is a block element
    var out = '';
    for (var j = 0; j < result.length; j++) {
      out += result[j];
      if (j < result.length - 1) {
        var cur = result[j], nxt = result[j + 1];
        var isBlock = /^<[/]?(?:h[1-6]|ul|li|pre|hr)/.test(cur) || /^<[/]?(?:h[1-6]|ul|li|pre|hr)/.test(nxt);
        if (!isBlock) out += '<br>';
      }
    }
    return out;
  }

  function linkify(url, label) {
    var clean = url.replace(/&amp;/g, '&');
    var icon = ''; var cls = 'msg-link';
    if (clean.match(/youtube\\.com\\/watch|youtu\\.be\\//)) { icon = '<span class="link-icon yt-icon">&#9654;</span>'; cls += ' yt-link'; if (!label) { var vid = clean.match(/[?&]v=([^&]+)/); label = vid ? 'YouTube Video' : 'YouTube'; } }
    else if (clean.match(/google\\.com\\/maps|maps\\.google/)) { icon = '<span class="link-icon map-icon">&#128205;</span>'; cls += ' map-link'; if (!label) label = 'Google Maps'; }
    else if (clean.match(/docs\\.google\\.com\\/spreadsheets/)) { icon = '<span class="link-icon">&#128196;</span>'; if (!label) label = 'Google Sheet'; }
    else if (clean.match(/docs\\.google\\.com\\/document/)) { icon = '<span class="link-icon">&#128196;</span>'; if (!label) label = 'Google Doc'; }
    if (!label) label = clean.length > 60 ? clean.substring(0, 57) + '...' : clean;
    return '<a href="' + clean + '" target="_blank" rel="noopener" class="' + cls + '">' + icon + label + '</a>';
  }

  function escapeHtml(text) { var d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
  function mdToPlain(text) {
    if (!text) return '';
    try {
      var linkRe = new RegExp('\\\\[([^\\\\]]+)\\\\]\\\\([^)]+\\\\)', 'g');
      var tickRe = new RegExp(String.fromCharCode(96) + '(.+?)' + String.fromCharCode(96), 'g');
      var headRe = new RegExp('^#{1,6}\\\\s+', 'gm');
      var boldRe = new RegExp('\\\\*\\\\*(.+?)\\\\*\\\\*', 'g');
      var italicRe = new RegExp('\\\\*(.+?)\\\\*', 'g');
      var bulletRe = new RegExp('^[-*]\\\\s+', 'gm');
      var numRe = new RegExp('^\\\\d+\\\\.\\\\s+', 'gm');
      var hrRe = new RegExp('^\\\\s*---+\\\\s*$', 'gm');
      var bullet = String.fromCharCode(8226) + ' ';
      return text
        .replace(headRe, '')
        .replace(boldRe, '$1')
        .replace(italicRe, '$1')
        .replace(/__(.+?)__/g, '$1')
        .replace(/_(.+?)_/g, '$1')
        .replace(tickRe, '$1')
        .replace(bulletRe, bullet)
        .replace(numRe, '')
        .replace(hrRe, '')
        .replace(linkRe, '$1')
        .replace(/\\n{3,}/g, '\\n\\n')
        .trim();
    } catch(e) {
      return text.replace(/[#*_~\\[\\]()]/g, '').trim();
    }
  }

  // === Render Core ===
  function render() {
    var app = document.getElementById('app');
    if (!state.session) { renderAuth(app); } else { renderMain(app); }
  }

  function renderAuth(container) {
    api('/auth/check').then(function(data) {
      if (!data || data.error) { renderLogin(container); } else if (!data.hasUsers) { renderSetup(container); } else { renderLogin(container); }
    }).catch(function(err) {
      console.error('Auth check error:', err);
      renderLogin(container);
    });
  }

  function renderSetup(container) {
    container.innerHTML = '<div class="auth-screen"><div class="auth-form">' +
      '<div class="auth-title">Karna</div>' +
      '<div class="auth-tagline">AI Personal Assistant</div>' +
      '<div class="auth-subtitle">First time setup \\u2014 create your profile</div>' +
      '<div class="field"><label>Username</label><input type="text" id="setupUsername" placeholder="ashwin" autocomplete="off"></div>' +
      '<div class="field"><label>Display Name</label><input type="text" id="setupName" placeholder="Ashwin Jyoti"></div>' +
      '<div class="field"><label>PIN (4+ characters)</label><div style="display:flex;gap:8px;align-items:center;"><input type="password" id="setupPin" placeholder="Your secret PIN" style="flex:1;"></div></div>' +
      '<div class="field"><label>Timezone</label><select id="setupTimezone"><option value="Asia/Kolkata" selected>Asia/Kolkata (IST)</option><option value="America/New_York">America/New_York (EST)</option><option value="Europe/London">Europe/London (GMT)</option><option value="Asia/Tokyo">Asia/Tokyo (JST)</option><option value="UTC">UTC</option></select></div>' +
      '<button class="btn" id="setupBtn">Create Profile</button>' +
      '<div id="setupError" class="error-text"></div></div></div>';
    document.getElementById('setupBtn').onclick = handleSetup;
  }

  function renderLogin(container) {
    var lastUser = localStorage.getItem('karna_last_username') || '';
    container.innerHTML = '<div class="auth-screen"><div class="auth-form">' +
      '<div class="auth-title">Karna</div><div class="auth-tagline">AI Personal Assistant</div><div class="auth-subtitle">Welcome back</div>' +
      '<div class="field"><label>Username</label><input type="text" id="loginUsername" placeholder="username" autocomplete="off" value="' + escapeHtml(lastUser) + '"></div>' +
      '<div class="field"><label>PIN</label><div style="display:flex;gap:8px;align-items:center;"><input type="password" id="loginPin" placeholder="Your PIN" style="flex:1;"><button class="btn btn-small" id="loginBtn" style="width:auto;min-width:60px;flex-shrink:0;">➜</button></div></div>' +
      '<div id="loginError" class="error-text"></div>' +
      '<div style="display:flex;justify-content:space-between;margin-top:16px;">' +
      '<a href="#" id="showForgot" style="color:var(--text-muted);font-size:12px;">Forgot credentials?</a>' +
      '<a href="#" id="showSetup" style="color:var(--text-muted);font-size:12px;">Create new account</a></div></div></div>';
    document.getElementById('loginBtn').onclick = handleLogin;
    document.getElementById('loginPin').onkeydown = function(e) { if (e.key === 'Enter') handleLogin(); };
    document.getElementById('showSetup').onclick = function(e) { e.preventDefault(); renderSetup(container); };
    document.getElementById('showForgot').onclick = function(e) { e.preventDefault(); renderForgotScreen(container); };
    if (lastUser) { document.getElementById('loginPin').focus(); } else { document.getElementById('loginUsername').focus(); }
  }

  // === Forgot Screen ===
  function renderForgotScreen(container) {
    container.innerHTML = '<div class="auth-screen"><div class="auth-form">' +
      '<div class="auth-title" style="font-size:18px;">Recovery</div>' +
      '<div class="auth-subtitle">Forgot your username or need to reset your PIN?</div>' +
      '<div id="forgotContent" style="color:var(--text-muted);font-size:13px;">Loading accounts...</div>' +
      '<div style="margin-top:24px;border-top:1px solid var(--border);padding-top:16px;">' +
      '<div style="font-size:11px;font-weight:600;letter-spacing:1px;color:var(--text-muted);text-transform:uppercase;margin-bottom:12px;">Reset PIN</div>' +
      '<div style="font-size:12px;color:var(--text-muted);margin-bottom:12px;line-height:1.5;">Verify identity with username and full display name. <span style="color:var(--danger);">Warning: All saved API keys will be cleared.</span></div>' +
      '<div class="field"><label>Username</label><input type="text" id="resetUsername" placeholder="Your username" autocomplete="off"></div>' +
      '<div class="field"><label>Full Display Name (as registered)</label><input type="text" id="resetName" placeholder="Exact name you registered with"></div>' +
      '<div class="field"><label>New PIN (4+ characters)</label><input type="password" id="resetNewPin" placeholder="Choose a new PIN"></div>' +
      '<button class="btn" id="resetPinBtn">Reset PIN</button><div id="resetMsg" style="font-size:13px;margin-top:8px;"></div></div>' +
      '<div style="text-align:center;margin-top:20px;"><a href="#" id="backToLogin" style="color:var(--text-muted);font-size:12px;">\\u2190 Back to login</a></div></div></div>';
    document.getElementById('backToLogin').onclick = function(e) { e.preventDefault(); renderLogin(container); };
    document.getElementById('resetPinBtn').onclick = handlePinReset;
    api('/auth/users/hints').then(function(hints) {
      var content = document.getElementById('forgotContent');
      if (content && hints.users && hints.users.length > 0) {
        var html = '<div style="font-size:11px;font-weight:600;letter-spacing:1px;color:var(--text-muted);text-transform:uppercase;margin-bottom:8px;">Registered Accounts</div>';
        for (var i = 0; i < hints.users.length; i++) {
          var u = hints.users[i];
          html += '<div class="item-card" style="margin-bottom:6px;cursor:pointer;" onclick="document.getElementById(\\'resetUsername\\').value=\\'' + u.username + '\\'">';
          html += '<div class="item-card-header"><span class="item-card-title" style="color:var(--accent);">' + escapeHtml(u.username) + '</span>';
          html += '<span class="item-card-meta">Created: ' + u.created + '</span></div>';
          html += '<div class="item-card-body">Name starts with: <strong>' + escapeHtml(u.name_hint) + '</strong></div></div>';
        }
        content.innerHTML = html;
      } else if (content) { content.innerHTML = '<div style="color:var(--text-muted);">No accounts found.</div>'; }
    }).catch(function() {});
  }

  async function handlePinReset() {
    var btn = document.getElementById('resetPinBtn');
    var msg = document.getElementById('resetMsg');
    if (btn) btn.disabled = true;
    if (msg) { msg.style.color = 'var(--text-muted)'; msg.textContent = 'Verifying...'; }
    var username = document.getElementById('resetUsername').value.trim().toLowerCase();
    var name = document.getElementById('resetName').value.trim();
    var newPin = document.getElementById('resetNewPin').value;
    if (!username || !name || !newPin) { if (msg) { msg.style.color = 'var(--danger)'; msg.textContent = 'All fields required.'; } if (btn) btn.disabled = false; return; }
    try {
      var result = await api('/auth/reset-pin', { method:'POST', body:JSON.stringify({username:username,name:name,new_pin:newPin}) });
      if (result.error) { if (msg) { msg.style.color = 'var(--danger)'; msg.textContent = result.error; } if (btn) btn.disabled = false; return; }
      localStorage.setItem('karna_last_username', username);
      if (msg) { msg.style.color = 'var(--accent)'; msg.innerHTML = '\\u2713 ' + escapeHtml(result.message) + '<br><br><a href="#" onclick="render();return false;" style="color:var(--accent);">Go to login \\u2192</a>'; }
    } catch(e) { if (msg) { msg.style.color = 'var(--danger)'; msg.textContent = 'Request failed: ' + e.message; } if (btn) btn.disabled = false; }
  }

  // === Auth Handlers ===
  async function handleSetup() {
    document.getElementById('setupBtn').disabled = true;
    document.getElementById('setupError').textContent = '';
    var data = await api('/auth/setup', { method:'POST', body:JSON.stringify({
      username: document.getElementById('setupUsername').value.trim().toLowerCase(),
      name: document.getElementById('setupName').value.trim(),
      pin: document.getElementById('setupPin').value,
      timezone: document.getElementById('setupTimezone').value,
    })});
    if (data.error) { document.getElementById('setupError').textContent = data.error; document.getElementById('setupBtn').disabled = false; return; }
    saveSession({ sessionId: data.sessionId, user: data.user });
    render();
  }

  async function handleLogin() {
    document.getElementById('loginBtn').disabled = true;
    document.getElementById('loginError').textContent = '';
    var data = await api('/auth/login', { method:'POST', body:JSON.stringify({
      username: document.getElementById('loginUsername').value.trim().toLowerCase(),
      pin: document.getElementById('loginPin').value,
    })});
    if (data.error) { document.getElementById('loginError').textContent = data.error; document.getElementById('loginBtn').disabled = false; return; }
    saveSession({ sessionId: data.sessionId, user: data.user });
    render();
  }

  // ============================================================
  // MAIN APP — Dashboard + Chat + Threads
  // ============================================================

  function renderMain(container) {
    state.view = 'dashboard';
    state.activeThreadId = null;
    container.innerHTML = '<div class="topbar">' +
      '<div class="topbar-left">' +
        '<button class="topbar-btn" id="threadsBtn" title="Threads">&#9776;</button>' +
        '<button class="topbar-btn" id="dashBtn" title="Dashboard">&#9632;</button>' +
        '' +
        '<span class="thread-title-display" id="threadTitleDisplay"></span>' +
      '</div>' +
      '<div class="topbar-title"><span class="status-dot"></span><span id="assistantNameDisplay">KARNA</span></div>' +
      '<div class="topbar-right">' +
        '<button class="topbar-btn notif-btn" id="notifBtn" title="Notifications">&#128276;<span class="notif-badge hidden" id="notifBadge">0</span></button>' +
        '<button class="topbar-btn" id="newThreadBtn" title="New conversation">&#x2b;</button>' +
        '<button class="topbar-btn" id="exportBtn" title="Export chat" style="display:none;">&#x21e9;</button>' +
        '<button class="topbar-btn" id="settingsBtn" title="Settings">&#9881;</button>' +
      '</div></div>' +
      '<!-- Notification Dropdown -->' +
      '<div class="notif-dropdown" id="notifDropdown">' +
        '<div class="notif-header"><span class="notif-header-title">Notifications</span><button class="btn btn-small" id="notifReadAll" style="width:auto;padding:4px 10px;font-size:10px;">Mark all done</button></div>' +
        '<div class="notif-list" id="notifList"><div class="notif-empty">No notifications</div></div>' +
      '</div>' +
      '<div class="main-content" id="mainContent"></div>' +
      '<!-- Thread Sidebar -->' +
      '<div class="overlay" id="threadsOverlay">' +
        '<div class="overlay-panel">' +
          '<div class="thread-sidebar-header"><span class="panel-title" style="margin:0;">Conversations</span><div style="display:flex;gap:6px;"><button class="thread-new-btn" id="sidebarSelectBtn" title="Select to delete">&#9745;</button><button class="thread-new-btn" id="sidebarNewBtn">+ New</button></div></div>' +
          '<div class="thread-list" id="threadList"></div>' +
          '<div class="thread-sidebar-footer">' +
            '<button class="thread-footer-btn" id="sidebarDashBtn"><span>⌂</span> Dashboard</button>' +
            '<button class="thread-footer-btn" id="sidebarSkillsBtn"><span>⚡</span> Skills</button>' +
            '<button class="thread-footer-btn" id="sidebarSettingsBtn"><span>⚙</span> Settings</button>' +
          '</div>' +
        '</div><div class="overlay-close" id="threadsClose"></div></div>';

    // Event listeners
    document.getElementById('threadsBtn').onclick = function() { toggleOverlay('threadsOverlay'); };
    document.getElementById('threadsClose').onclick = function() { toggleOverlay(null); };
    document.getElementById('dashBtn').onclick = function() { state.view = 'dashboard'; state.activeThreadId = null; renderView(); };
    // documentsBtn removed in v4
    document.getElementById('newThreadBtn').onclick = startNewThread;
    document.getElementById('exportBtn').onclick = exportChat;
    document.getElementById('settingsBtn').onclick = function() { closeNotifDropdown(); state.prevView = state.view; state.view = 'settings'; state.settingsSection = null; renderView(); };
    document.getElementById('sidebarNewBtn').onclick = function() { toggleOverlay(null); startNewThread(); };
    document.getElementById('sidebarSelectBtn').onclick = function() { state.selectMode = !state.selectMode; state.selectedThreadIds = {}; loadThreadSidebar(); };
    document.getElementById('sidebarDashBtn').onclick = function() { toggleOverlay(null); state.view = 'dashboard'; state.activeThreadId = null; renderView(); };
    document.getElementById('sidebarSkillsBtn').onclick = function() { toggleOverlay(null); state.prevView = state.view; state.view = 'skills'; renderView(); };
    document.getElementById('sidebarSettingsBtn').onclick = function() { toggleOverlay(null); state.prevView = state.view; state.view = 'settings'; state.settingsSection = null; renderView(); };

    // Notification bell
    document.getElementById('notifBtn').onclick = toggleNotifDropdown;
    document.getElementById('notifReadAll').onclick = markAllNotificationsRead;
    document.addEventListener('click', function(e) {
      var dd = document.getElementById('notifDropdown');
      var btn = document.getElementById('notifBtn');
      if (dd && dd.classList.contains('open') && !dd.contains(e.target) && !btn.contains(e.target)) {
        dd.classList.remove('open');
      }
    });

    loadAssistantName();
    loadNotificationCount();
    // Poll notification count every 60s
    setInterval(loadNotificationCount, 60000);
    // Check Google connection status on load and every 5 minutes
    checkGoogleConnectionBanner();
    if (googleStatusInterval) clearInterval(googleStatusInterval);
    googleStatusInterval = setInterval(checkGoogleConnectionBanner, 5 * 60 * 1000);
    renderView();
  }

  function renderView() {
    var mc = document.getElementById('mainContent');
    if (!mc) return;
    var exp = document.getElementById('exportBtn');
    var ttl = document.getElementById('threadTitleDisplay');
    if (state.view === 'dashboard') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = '';
      renderDashboard(mc);
    } else if (state.view === 'documents') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = 'Documents';
      renderDocumentsView(mc);
    } else if (state.view === 'settings') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = '';
      renderSettingsView(mc);
    } else if (state.view === 'skills') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = '';
      renderSkillsView(mc);
    } else {
      if (exp) exp.style.display = 'inline-block';
      renderChatView(mc);
    }
  }

  // Helper: open a settings sub-section (global — called from rendered HTML)
  window.openSection = function(section) {
    state.settingsSection = section;
    renderView();
  };

  // Helper: go back from settings/skills to previous view (global — called from rendered HTML)
  window.goBack = function() {
    var prev = state.prevView || 'dashboard';
    state.view = prev;
    state.settingsSection = null;
    if (prev === 'dashboard') state.activeThreadId = null;
    renderView();
  };

  // ============================================================
  // DASHBOARD
  // ============================================================

  async function renderDashboard(container) {
    container.innerHTML = '<div class="chat-area has-dash-bg"><div class="dashboard" id="dashContent"><div style="color:var(--text-muted);font-size:13px;">Loading dashboard...</div></div></div>';
    try {
      var data = await api('/chat/dashboard');
      var dc = document.getElementById('dashContent');
      if (!dc) return;
      var userName = state.session && state.session.user ? state.session.user.name : '';
      var hour = new Date().getHours();
      var greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

      // drops removed
      // Drop data: [widthPx, heightPx, top%, right%]
      // drops removed
      var html = '<div class="dash-greeting">' + greeting + (userName ? ', ' + escapeHtml(userName.split(' ')[0]) : '') + '</div>' +
        '<div class="dash-subtitle">Here\\u2019s what\\u2019s happening with ' + escapeHtml(state.assistantName || 'Karna') + '</div>';

      // Status cards — each card navigates to its feature
      html += '<div class="dash-cards">';
      html += '<div class="dash-card" onclick="showConversations()"><div class="dash-card-icon">&#128172;</div><div class="dash-card-value">' + (data.threads || 0) + '</div><div class="dash-card-label">Conversations</div></div>';
      html += '<div class="dash-card" onclick="viewTasksModal()"><div class="dash-card-icon">&#9200;</div><div class="dash-card-value">' + (data.active_schedules || 0) + '</div><div class="dash-card-label">Active Tasks</div></div>';
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'skills\\';renderView();"><div class="dash-card-icon">&#9889;</div><div class="dash-card-value">' + (data.skills_count || 0) + '</div><div class="dash-card-label">Skills</div></div>';
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'preferences\\';renderView();"><div class="dash-card-icon">&#127775;</div><div class="dash-card-value">' + (data.preferences_count || data.memories || 0) + '</div><div class="dash-card-label">Preferences</div></div>';
      html += '<div class="dash-card" id="dashGmailCard" onclick="dashGmailClick()"><div class="dash-card-icon">&#9993;</div><div class="dash-card-value" id="dashGmailCount"><span style=\\'color:var(--text-muted);font-size:13px;\\'>...</span></div><div class="dash-card-label">Unread Gmail</div></div>';
      if (data.errors > 0) {
        html += '<div class="dash-card dash-card-error" onclick="state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'errors\\';renderView();"><div class="dash-card-icon">&#9888;</div><div class="dash-card-value" style="color:#e05a40;">' + data.errors + '</div><div class="dash-card-label">Errors</div></div>';
      }
      html += '</div>';

      // Provider usage today
      if (data.provider_usage && data.provider_usage.length > 0) {
        html += '<div style="margin-bottom:24px;">';
        html += '<div class="dash-section-title">API usage today</div>';
        // Provider display name mapping
        var providerLabels = {
          'anthropic': 'Anthropic Claude',
          'openai': 'OpenAI GPT',
          'deepseek': 'DeepSeek',
          'gemini': 'Google Gemini',
          'grok': 'xAI Grok',
          'openrouter': 'OpenRouter',
          'abacus': 'Abacus AI'
        };
        for (var p = 0; p < data.provider_usage.length; p++) {
          var pu = data.provider_usage[p];
          var displayName = providerLabels[pu.provider] || pu.provider;
          html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">' + escapeHtml(displayName) + ': ' + (pu.tokens_used || 0).toLocaleString() + ' tokens / ' + (pu.request_count || 0) + ' requests</div>';
        }
        html += '</div>';
      }

      // Recent threads
      if (data.recent_threads && data.recent_threads.length > 0) {
        html += '<div class="dash-section-title">Recent conversations</div>';
        html += '<div class="dash-threads">';
        for (var t = 0; t < data.recent_threads.length; t++) {
          var th = data.recent_threads[t];
          var d = th.updated_at ? new Date(th.updated_at).toLocaleDateString() : '';
          html += '<div class="dash-thread" onclick="openThread(' + th.id + ',\\'' + escapeHtml(th.title).replace(/'/g, "\\\\'") + '\\')">';
          html += '<div class="dash-thread-title">' + escapeHtml(th.title) + '</div>';
          html += '<div class="dash-thread-meta"><span>' + (th.message_count || 0) + ' messages</span><span>' + d + '</span></div>';
          if (th.last_message) { html += '<div class="dash-thread-preview">' + escapeHtml(th.last_message.substring(0, 80)) + '</div>'; }
          html += '</div>';
        }
        html += '</div>';
      }

      html += '<div style="margin-top:28px;text-align:center;"><button class="dash-new-btn" onclick="startNewThread()">Start New Conversation</button></div>';
      dc.innerHTML = html;
      // drops removed

      // Fetch Gmail unread count asynchronously (non-blocking)
      loadDashGmailCount();
    } catch(err) {
      var dc2 = document.getElementById('dashContent');
      if (dc2) dc2.innerHTML = '<div class="welcome"><h2>Hello' + (state.session && state.session.user ? ', ' + state.session.user.name : '') + '</h2><p>' + escapeHtml(state.assistantName || 'Karna') + ' is ready. Start a new conversation.</p><button class="btn btn-small" style="width:auto;margin-top:16px;padding:10px 28px;" onclick="startNewThread()">New conversation</button></div>';
    }
  }

  async function loadDashGmailCount() {
    var el = document.getElementById('dashGmailCount');
    var card = document.getElementById('dashGmailCard');
    try {
      var data = await api('/chat/gmail/unread');
      if (!el) return;
      if (data.count !== null && data.count !== undefined) {
        el.textContent = data.count;
        if (data.count > 0) {
          el.style.color = 'var(--accent)';
          if (card) card.style.borderColor = 'rgba(79,209,197,0.3)';
        }
        state.gmailUnread = data.count;
      } else {
        el.innerHTML = '\\u2014';
        el.style.fontSize = '12px';
        el.style.color = 'var(--text-muted)';
        if (card) card.title = data.reason === 'google_not_configured' ? 'Connect Google in Settings \\u2192 Keys' : 'Connect Google account to see unread count';
      }
    } catch(e) {
      if (el) { el.textContent = '\\u2014'; el.style.color = 'var(--text-muted)'; }
    }
  }

  function dashGmailClick() {
    if (state.gmailUnread > 0) {
      startNewThread();
      setTimeout(function() {
        var input = document.getElementById('inputField');
        if (input) { input.value = 'Check my Gmail inbox — list the latest unread messages'; input.focus(); }
      }, 300);
    } else {
      startNewThread();
      setTimeout(function() {
        var input = document.getElementById('inputField');
        if (input) { input.value = 'Check my Gmail inbox'; input.focus(); }
      }, 300);
    }
  }

  // ============================================================
  // CHAT VIEW
  // ============================================================

  function renderChatView(container) {
    container.innerHTML = '<div class="chat-area" id="chatArea"><div id="messages"></div><div id="thinking" class="thinking" style="display:none"><span class="thinking-cursor"></span></div></div>' +
      '<div class="input-area"><div class="input-wrap">' +
        '<input type="file" id="fileInput" style="display:none" multiple>' +
        '<div style="flex:1;display:flex;flex-direction:column;position:relative;">' +
          '<div id="fileChips" style="display:none;flex-wrap:wrap;gap:4px;margin-bottom:4px;"></div>' +
          '<textarea class="input-field" id="inputField" placeholder="Message Karna…" rows="5" style="padding-bottom:40px;"></textarea>' +
          '<button class="input-btn" id="attachBtn" title="Attach file" style="position:absolute;bottom:4px;left:4px;z-index:1;">&#128206;</button>' +
        '</div>' +
        '<div class="input-actions">' +
          '<button class="input-btn send-btn" id="sendBtn" title="Send">&#10148;</button>' +
        '</div>' +
      '</div></div>';

    var input = document.getElementById('inputField');
    input.onkeydown = function(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
    input.oninput = function() { input.style.height = 'auto'; input.style.height = Math.max(120, Math.min(input.scrollHeight, window.innerHeight * 0.4)) + 'px'; };
    input.style.height = '120px';
    document.getElementById('sendBtn').onclick = handleSend;
    document.getElementById('attachBtn').onclick = function() { document.getElementById('fileInput').click(); };
    document.getElementById('fileInput').onchange = handleFileSelect;
    input.focus();

    // Update thread title display
    var ttl = document.getElementById('threadTitleDisplay');
    if (ttl && state.activeThreadId) {
      var found = state.threads.find(function(t) { return t.id === state.activeThreadId; });
      if (found) ttl.textContent = found.title;
    }

    if (state.activeThreadId) { loadThreadMessages(state.activeThreadId); }
  }

  async function loadThreadMessages(threadId) {
    var messagesEl = document.getElementById('messages');
    if (!messagesEl) return;
    var data = await api('/chat/threads/' + threadId + '/messages?limit=50');
    messagesEl.innerHTML = '';
    if (!data.messages || data.messages.length === 0) {
      messagesEl.innerHTML = '<div class="welcome"><h2>New conversation</h2><p>Start typing below. ' + escapeHtml(state.assistantName || 'Karna') + ' is listening.</p></div>';
      return;
    }
    for (var i = 0; i < data.messages.length; i++) {
      var msg = data.messages[i];
      var group = document.createElement('div');
      group.className = 'message-group';
      if (msg.role === 'user') { group.innerHTML = '<div class="msg-user">' + escapeHtml(msg.content) + '</div>'; }
      else { group.innerHTML = '<div class="msg-assistant">' + md(msg.content) + '</div>'; }
      messagesEl.appendChild(group);
    }
    scrollToBottom();
  }

  // File upload handling
  function handleFileSelect(e) {
    var files = e.target.files;
    if (!files || files.length === 0) return;
    for (var i = 0; i < files.length; i++) { state.pendingFiles.push(files[i]); }
    renderFileChips();
    e.target.value = '';
  }

  function renderFileChips() {
    var container = document.getElementById('fileChips');
    if (!container) return;
    if (state.pendingFiles.length === 0) { container.style.display = 'none'; container.innerHTML = ''; return; }
    container.style.display = 'flex';
    var html = '';
    for (var i = 0; i < state.pendingFiles.length; i++) {
      var f = state.pendingFiles[i];
      var sizeKb = Math.round(f.size / 1024);
      var sizeStr = sizeKb > 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : sizeKb + ' KB';
      html += '<div class="file-chip"><span>&#128196;</span> ' + escapeHtml(f.name) + ' (' + sizeStr + ')<button onclick="removeFile(' + i + ')">\\u00d7</button></div>';
    }
    container.innerHTML = html;
  }

  function removeFile(index) {
    state.pendingFiles.splice(index, 1);
    renderFileChips();
  }

  async function handleSend() {
    var input = document.getElementById('inputField');
    var text = input.value.trim();
    var hasFiles = state.pendingFiles.length > 0;
    if ((!text && !hasFiles) || state.loading) return;
    input.value = ''; input.style.height = 'auto';
    state.loading = true;

    // Upload files first if present
    var fileInfo = [];
    if (hasFiles) {
      var files = state.pendingFiles.slice();
      state.pendingFiles = [];
      renderFileChips();
      var fileNames = files.map(function(f) { return f.name; }).join(', ');
      addMessage('user', (text ? text + '\\n\\n' : '') + '\\ud83d\\udcce Attached: ' + fileNames);
      showThinking(true);
      document.getElementById('progressBar').classList.add('active');

      for (var fi = 0; fi < files.length; fi++) {
        try {
          var formData = new FormData();
          formData.append('file', files[fi]);
          var uploadRes = await fetch('/api/chat/upload', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + (state.session.sessionId || state.session.token) },
            body: formData
          });
          var uploadData = await uploadRes.json();
          if (!uploadRes.ok) {
            addMessage('assistant', 'Upload failed for ' + escapeHtml(files[fi].name) + ': ' + (uploadData.error || 'Server error ' + uploadRes.status), 'error');
          } else if (uploadData.file_id) {
            fileInfo.push({ file_id: uploadData.file_id, name: uploadData.name, type: uploadData.type, size: uploadData.size, text_preview: uploadData.text_preview || '' });
            if (uploadData.extracting) {
              addMessage('assistant', '⏳ Extracting text from “' + escapeHtml(uploadData.name) + '” in the background. For best results, wait about 30 seconds before asking Karna to parse it.', 'info');
            }
          }
        } catch(ue) {
          addMessage('assistant', 'Failed to upload ' + escapeHtml(files[fi].name) + ': ' + ue.message, 'error');
        }
      }

      if (!text && fileInfo.length > 0) {
        text = 'I uploaded ' + (fileInfo.length === 1 ? 'a file: ' + fileInfo[0].name : fileInfo.length + ' files: ' + fileInfo.map(function(f){return f.name;}).join(', ')) + '. What would you like me to do with ' + (fileInfo.length === 1 ? 'it' : 'them') + '?';
      }
    } else {
      addMessage('user', text);
      showThinking(true);
      document.getElementById('progressBar').classList.add('active');
    }

    // Use SSE streaming for better UX
    await handleStreamingSend(text, fileInfo);
  }

  // SSE Streaming send function
  async function handleStreamingSend(text, fileInfo) {
    var input = document.getElementById('inputField');
    var messagesEl = document.getElementById('messages');
    var streamingContainer = null;
    var streamingText = null;
    var toolsContainer = null;
    var accumulatedText = '';
    var activeTools = {};

    try {
      var body = { message: text };
      if (state.activeThreadId) body.thread_id = state.activeThreadId;
      if (fileInfo && fileInfo.length > 0) body.files = fileInfo;

      var response = await fetch(API + '/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (state.session.sessionId || state.session.token)
        },
        body: JSON.stringify(body)
      });

      // Check for non-SSE error response
      if (!response.ok || !response.headers.get('content-type')?.includes('text/event-stream')) {
        var errorData = await response.json().catch(function() { return { error: 'Connection failed' }; });
        showThinking(false);
        document.getElementById('progressBar').classList.remove('active');
        addMessage('assistant', errorData.error || 'Something went wrong', errorData.type === 'no_provider' ? 'error-provider' : 'error');
        state.loading = false;
        input.focus();
        return;
      }

      // Get thread ID from header
      var threadIdHeader = response.headers.get('X-Thread-Id');
      if (threadIdHeader && !state.activeThreadId) {
        state.activeThreadId = parseInt(threadIdHeader);
        state.view = 'chat';
        var ttl = document.getElementById('threadTitleDisplay');
        if (ttl) ttl.textContent = text.substring(0, 60);
      }

      // Create streaming response container
      var welcome = messagesEl.querySelector('.welcome');
      if (welcome) welcome.remove();

      streamingContainer = document.createElement('div');
      streamingContainer.className = 'message-group streaming-response';
      streamingContainer.innerHTML = '<div class="tools-container"></div><div class="streaming-text msg-assistant"></div>';
      messagesEl.appendChild(streamingContainer);
      toolsContainer = streamingContainer.querySelector('.tools-container');
      streamingText = streamingContainer.querySelector('.streaming-text');

      // Read the SSE stream
      var reader = response.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';

      while (true) {
        var result = await reader.read();
        if (result.done) break;

        buffer += decoder.decode(result.value, { stream: true });
        var lines = buffer.split('\\n');
        buffer = lines.pop() || '';

        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (line.startsWith('event: ')) {
            var eventType = line.substring(7);
            var dataLine = lines[++i] || '';
            if (dataLine.startsWith('data: ')) {
              try {
                var eventData = JSON.parse(dataLine.substring(6));
                handleSSEEvent(eventType, eventData, {
                  streamingText: streamingText,
                  toolsContainer: toolsContainer,
                  accumulatedText: accumulatedText,
                  activeTools: activeTools,
                  onTextUpdate: function(newText) { accumulatedText = newText; }
                });
              } catch (parseErr) {
                console.error('SSE parse error:', parseErr);
              }
            }
          }
        }
        scrollToBottom();
      }

      // Stream completed
      showThinking(false);
      document.getElementById('progressBar').classList.remove('active');

      // Remove tool indicators after stream completes — they clutter the final message.
      // Replace with a minimal inline badge showing tool names used.
      if (toolsContainer) {
        var toolEls = toolsContainer.querySelectorAll('.tool-indicator');
        if (toolEls.length > 0) {
          var toolNames = [];
          toolEls.forEach(function(el) {
            var nameEl = el.querySelector('.tool-name');
            if (nameEl) toolNames.push(nameEl.textContent);
          });
          toolsContainer.innerHTML = '';
          if (toolNames.length > 0) {
            var badge = document.createElement('div');
            badge.className = 'tools-used-badge';
            badge.textContent = toolNames.join(' · ');
            toolsContainer.appendChild(badge);
          }
        }
      }

      // Finalize the response - apply markdown rendering
      if (streamingText && accumulatedText) {
        streamingText.innerHTML = md(accumulatedText);
      }

    } catch(err) {
      showThinking(false);
      document.getElementById('progressBar').classList.remove('active');
      if (streamingContainer) streamingContainer.remove();
      addMessage('assistant', 'Connection lost. Check your network and try again.', 'error');
    }
    state.loading = false;
    if (input) input.focus();
  }

  // Handle individual SSE events
  function handleSSEEvent(eventType, data, ctx) {
    switch (eventType) {
      case 'thinking':
        showThinking(true);
        break;

      case 'tool_start':
        if (ctx.toolsContainer && data.tool) {
          var toolId = 'tool-' + Date.now() + '-' + Math.random().toString(36).substring(7);
          ctx.activeTools[data.tool] = toolId;
          var toolEl = document.createElement('div');
          toolEl.id = toolId;
          toolEl.className = 'tool-indicator running';
          var toolDisplayName = formatToolName(data.tool);
          toolEl.innerHTML = '<div class="tool-spinner"></div><span class="tool-name">' + escapeHtml(toolDisplayName) + '</span><span style="color:var(--text-muted)">running...</span>';
          ctx.toolsContainer.appendChild(toolEl);
          scrollToBottom();
        }
        break;

      case 'tool_end':
        if (data.tool && ctx.activeTools[data.tool]) {
          var toolEl = document.getElementById(ctx.activeTools[data.tool]);
          if (toolEl) {
            var isError = data.toolResult && data.toolResult.startsWith('Error:');
            toolEl.className = 'tool-indicator ' + (isError ? 'error' : 'completed');
            var icon = isError ? '<span class="tool-error-icon">\\u2717</span>' : '<span class="tool-check">\\u2713</span>';
            var toolDisplayName = formatToolName(data.tool);
            toolEl.innerHTML = icon + '<span class="tool-name">' + escapeHtml(toolDisplayName) + '</span><span style="color:var(--text-muted)">' + (isError ? 'failed' : 'done') + '</span>';
            if (data.toolResult && !isError) {
              var resultPreview = data.toolResult.substring(0, 100) + (data.toolResult.length > 100 ? '...' : '');
              toolEl.innerHTML += '<div class="tool-result">' + escapeHtml(resultPreview) + '</div>';
            }
          }
          delete ctx.activeTools[data.tool];
        }
        showThinking(false);
        break;

      case 'chunk':
        showThinking(false);
        if (data.text && ctx.streamingText) {
          ctx.accumulatedText = (ctx.accumulatedText || '') + data.text;
          ctx.onTextUpdate(ctx.accumulatedText);
          // Display plain text during streaming, render markdown when done
          ctx.streamingText.textContent = ctx.accumulatedText;
          scrollToBottom();
        }
        break;

      case 'done':
        showThinking(false);
        // Final markdown render is done in handleStreamingSend after loop
        break;

      case 'error':
        showThinking(false);
        if (ctx.streamingText) {
          ctx.streamingText.className = 'streaming-text msg-assistant msg-error';
          ctx.streamingText.innerHTML = '<span style="color:var(--danger)">⚠️ ' + escapeHtml(data.error || 'An error occurred') + '</span>';
        }
        break;
    }
  }

  // Format tool names for display
  function formatToolName(toolName) {
    var nameMap = {
      'web_search': 'Web Search',
      'research': 'Deep Research',
      'read_url': 'Reading Page',
      'search_places': 'Places Search',
      'get_directions': 'Getting Directions',
      'translate_text': 'Translating',
      'search_youtube': 'YouTube Search',
      'gmail_list': 'Checking Gmail',
      'gmail_search': 'Searching Gmail',
      'gmail_send': 'Sending Email',
      'gmail_draft': 'Creating Draft',
      'list_calendar_events': 'Checking Calendar',
      'create_calendar_event': 'Creating Event',
      'read_sheet': 'Reading Sheet',
      'write_sheet': 'Writing Sheet',
      'append_sheet': 'Adding to Sheet',
      'create_sheet': 'Creating Spreadsheet',
      'create_doc': 'Creating Document',
      'read_doc': 'Reading Document',
      'append_to_doc': 'Adding to Document',
      'drive_list': 'Listing Drive Files',
      'drive_search': 'Searching Drive',
      'store_memory': 'Saving Memory',
      'search_memory': 'Searching Memory',
      'create_schedule': 'Creating Schedule',
      'list_schedules': 'Listing Schedules',
      'research': 'Researching',
      'read_url': 'Reading Page',
    };
    return nameMap[toolName] || toolName.replace(/_/g, ' ').replace(/\\b\\w/g, function(l) { return l.toUpperCase(); });
  }

  function addMessage(role, content, type) {
    var messagesEl = document.getElementById('messages');
    if (!messagesEl) return;
    var welcome = messagesEl.querySelector('.welcome');
    if (welcome) welcome.remove();

    var group = document.createElement('div');
    group.className = 'message-group';
    if (role === 'user') {
      group.innerHTML = '<div class="msg-user">' + escapeHtml(content) + '</div>';
    } else {
      if (type === 'error-provider') {
        group.innerHTML = '<div class="msg-assistant">' + md(content) + '<br><br><button class="btn btn-small" onclick="state.prevView=state.view;state.view=\\'settings\\';state.settingsSection=\\'credentials\\';renderView();">Open Settings</button></div>';
      } else if (type === 'error') {
        group.innerHTML = '<div class="msg-assistant" style="color:var(--danger)">' + md(content) + '</div>';
      } else {
        group.innerHTML = '<div class="msg-assistant">' + md(content) + '</div>';
      }
    }
    messagesEl.appendChild(group);
    scrollToBottom();
  }

  function showThinking(show) { var el = document.getElementById('thinking'); if (el) el.style.display = show ? 'block' : 'none'; if (show) scrollToBottom(); }
  function scrollToBottom() { var area = document.getElementById('chatArea'); if (area) setTimeout(function() { area.scrollTop = area.scrollHeight; }, 50); }

  // ============================================================
  // THREAD MANAGEMENT
  // ============================================================

  async function startNewThread() {
    state.activeThreadId = null;
    state.view = 'chat';
    renderView();
    toggleOverlay(null);
  }

  function openThread(threadId, title) {
    state.activeThreadId = threadId;
    state.view = 'chat';
    renderView();
    toggleOverlay(null);
  }

  async function loadThreadSidebar() {
    var list = document.getElementById('threadList');
    if (!list) return;
    list.innerHTML = '<div style="padding:16px;color:var(--text-muted);font-size:13px;">Loading...</div>';
    
    try {
      var data = await api('/chat/threads?limit=50');
      state.threads = data.threads || [];
      
      if (state.threads.length === 0) {
        list.innerHTML = '<div style="padding:16px;color:var(--text-muted);font-size:13px;">No conversations yet. Start one!</div>';
        return;
      }

      var today = new Date().toISOString().split('T')[0];
      var yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      var groups = { today: [], yesterday: [], older: [] };
      for (var i = 0; i < state.threads.length; i++) {
        var t = state.threads[i];
        var d = (t.updated_at || t.created_at || '').split('T')[0];
        if (d === today) groups.today.push(t);
        else if (d === yesterday) groups.yesterday.push(t);
        else groups.older.push(t);
      }

      var html = '';
      if (state.selectMode) {
        html += '<div style="padding:8px 14px;background:rgba(255,107,74,0.08);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
          '<span style="font-size:12px;color:var(--text-muted);" id="selectCount">0 selected</span>' +
          '<div style="display:flex;gap:6px;">' +
          '<button class="btn btn-small" onclick="selectAllThreads()">All</button>' +
          '<button class="btn btn-small btn-danger" id="deleteSelectedBtn" onclick="deleteSelectedThreads()" disabled>Delete</button>' +
          '<button class="btn btn-small" onclick="state.selectMode=false;state.selectedThreadIds={};loadThreadSidebar();">Cancel</button>' +
          '</div></div>';
      }
      if (groups.today.length > 0) { html += '<div class="thread-section-label">Today</div>'; html += renderThreadGroup(groups.today); }
      if (groups.yesterday.length > 0) { html += '<div class="thread-section-label">Yesterday</div>'; html += renderThreadGroup(groups.yesterday); }
      if (groups.older.length > 0) { html += '<div class="thread-section-label">Older</div>'; html += renderThreadGroup(groups.older); }
      if (!state.selectMode) {
        html += '<div style="padding:16px 14px;"><a href="#" onclick="loadArchivedThreads();return false;" style="color:var(--text-muted);font-size:12px;">View archived conversations</a></div>';
      }
      list.innerHTML = html;
    } catch(e) {
      list.innerHTML = '<div style="padding:16px;color:var(--danger);font-size:13px;">Error loading threads.</div>';
    }
  }

  function renderThreadGroup(threads) {
    var html = '';
    for (var i = 0; i < threads.length; i++) {
      var t = threads[i];
      var isActive = t.id === state.activeThreadId;
      var isChecked = !!state.selectedThreadIds[t.id];
      if (state.selectMode) {
        html += '<div class="thread-item' + (isChecked ? ' active' : '') + '" data-id="' + t.id + '" onclick="toggleThreadSelect(' + t.id + ')" style="cursor:pointer;">';
        html += '<div style="display:flex;align-items:center;gap:10px;">';
        html += '<input type="checkbox" ' + (isChecked ? 'checked' : '') + ' onclick="event.stopPropagation();toggleThreadSelect(' + t.id + ')" style="width:16px;height:16px;flex-shrink:0;cursor:pointer;">';
        html += '<div style="flex:1;min-width:0;"><div class="thread-item-title">' + escapeHtml(t.title) + '</div>';
        html += '<div class="thread-item-meta"><span>' + (t.message_count || 0) + ' msgs</span><span>' + formatRelativeDate(t.updated_at) + '</span></div></div>';
        html += '</div></div>';
      } else {
        html += '<div class="thread-item' + (isActive ? ' active' : '') + '" data-id="' + t.id + '" onclick="openThread(' + t.id + ',\\'' + escapeHtml(t.title).replace(/'/g, "\\\\'") + '\\')">';
        html += '<div class="thread-item-title">' + escapeHtml(t.title) + '</div>';
        if (t.last_message) { html += '<div class="thread-item-preview">' + escapeHtml(t.last_message.substring(0, 60)) + '</div>'; }
        html += '<div class="thread-item-meta"><span>' + (t.message_count || 0) + ' msgs</span><span>' + formatRelativeDate(t.updated_at) + '</span></div>';
        html += '<div class="thread-item-actions">';
        html += '<button class="thread-action-btn" onclick="event.stopPropagation();archiveThread(' + t.id + ')" title="Archive">&#128230;</button>';
        html += '<button class="thread-action-btn danger" onclick="event.stopPropagation();deleteThread(' + t.id + ')" title="Delete">&#128465;</button>';
        html += '</div></div>';
      }
    }
    return html;
  }

  async function loadArchivedThreads() {
    var list = document.getElementById('threadList');
    if (!list) return;
    var data = await api('/chat/threads?archived=1&limit=30');
    var threads = data.threads || [];
    if (threads.length === 0) { showToast('No archived conversations', ''); return; }
    var html = '<div class="thread-section-label">Archived</div>';
    for (var i = 0; i < threads.length; i++) {
      var t = threads[i];
      html += '<div class="thread-item" onclick="unarchiveAndOpen(' + t.id + ',\\'' + escapeHtml(t.title).replace(/'/g, "\\\\'") + '\\')">';
      html += '<div class="thread-item-title" style="color:var(--text-muted);">' + escapeHtml(t.title) + '</div>';
      html += '<div class="thread-item-meta"><span>' + (t.message_count || 0) + ' msgs</span></div></div>';
    }
    html += '<div style="padding:16px 14px;"><a href="#" onclick="loadThreadSidebar();return false;" style="color:var(--text-muted);font-size:12px;">\\u2190 Back to active</a></div>';
    list.innerHTML = html;
  }

  async function archiveThread(id) {
    await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_archived:true}) });
    if (state.activeThreadId === id) { state.activeThreadId = null; state.view = 'dashboard'; renderView(); }
    loadThreadSidebar();
    showToast('Conversation archived', 'success');
  }

  async function unarchiveAndOpen(id, title) {
    await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_archived:false}) });
    openThread(id, title);
  }

  async function deleteThread(id) {
    if (!confirm('Delete this conversation? This cannot be undone.')) return;
    // Optimistic removal — remove from DOM immediately
    var el = document.querySelector('.thread-item[data-id="' + id + '"]');
    if (el) el.remove();
    // Remove from local state cache too
    state.threads = state.threads ? state.threads.filter(function(t) { return t.id !== id; }) : [];
    var result = await api('/chat/threads/' + id, { method:'DELETE' });
    if (result && result.error) {
      showToast('Delete failed: ' + result.error, 'error');
      loadThreadSidebar(); // Restore from server
      return;
    }
    if (state.activeThreadId === id) { state.activeThreadId = null; state.view = 'dashboard'; renderView(); }
    loadThreadSidebar();
    showToast('Conversation deleted', '');
  }

  window.toggleThreadSelect = function(id) {
    if (state.selectedThreadIds[id]) {
      delete state.selectedThreadIds[id];
    } else {
      state.selectedThreadIds[id] = true;
    }
    var count = Object.keys(state.selectedThreadIds).length;
    var countEl = document.getElementById('selectCount');
    if (countEl) countEl.textContent = count + ' selected';
    var delBtn = document.getElementById('deleteSelectedBtn');
    if (delBtn) delBtn.disabled = count === 0;
    // Re-render just the checkboxes without reloading
    var items = document.querySelectorAll('.thread-item[data-id]');
    items.forEach(function(item) {
      var tid = parseInt(item.getAttribute('data-id'), 10);
      var cb = item.querySelector('input[type=checkbox]');
      if (cb) cb.checked = !!state.selectedThreadIds[tid];
      if (state.selectedThreadIds[tid]) item.classList.add('active'); else item.classList.remove('active');
    });
  };

  window.selectAllThreads = function() {
    var allSelected = state.threads.every(function(t) { return state.selectedThreadIds[t.id]; });
    state.selectedThreadIds = {};
    if (!allSelected) state.threads.forEach(function(t) { state.selectedThreadIds[t.id] = true; });
    loadThreadSidebar();
  };

  window.deleteSelectedThreads = async function() {
    var ids = Object.keys(state.selectedThreadIds).map(Number);
    if (ids.length === 0) return;
    if (!confirm('Delete ' + ids.length + ' conversation' + (ids.length > 1 ? 's' : '') + '? This cannot be undone.')) return;
    var delBtn = document.getElementById('deleteSelectedBtn');
    if (delBtn) { delBtn.disabled = true; delBtn.textContent = 'Deleting...'; }
    var failed = 0;
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      try {
        await api('/chat/threads/' + id, { method: 'DELETE' });
        state.threads = state.threads ? state.threads.filter(function(t) { return t.id !== id; }) : [];
        if (state.activeThreadId === id) { state.activeThreadId = null; state.view = 'dashboard'; renderView(); }
      } catch (e) { failed++; }
    }
    state.selectedThreadIds = {};
    state.selectMode = false;
    loadThreadSidebar();
    showToast(failed === 0 ? (ids.length + ' conversations deleted') : (ids.length - failed + ' deleted, ' + failed + ' failed'), failed === 0 ? '' : 'error');
  };

  function formatRelativeDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    var now = new Date();
    var diff = now.getTime() - d.getTime();
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
    return d.toLocaleDateString();
  }

  // ============================================================
  // EXPORT CHAT
  // ============================================================

  async function exportChat() {
    if (!state.activeThreadId) { showToast('No active conversation to export', 'error'); return; }
    var data = await api('/chat/threads/' + state.activeThreadId + '/messages?limit=500');
    if (!data.messages || data.messages.length === 0) { showToast('No messages to export', 'error'); return; }

    var thread = state.threads.find(function(t) { return t.id === state.activeThreadId; });
    var title = thread ? thread.title : 'Conversation';
    var text = '# ' + title + '\\n# Exported from Karna on ' + new Date().toISOString() + '\\n\\n';
    for (var i = 0; i < data.messages.length; i++) {
      var m = data.messages[i];
      var time = m.created_at ? new Date(m.created_at).toLocaleString() : '';
      if (m.role === 'user') { text += '[You] (' + time + ')\\n' + m.content + '\\n\\n'; }
      else { text += '[' + escapeHtml(state.assistantName || 'Karna') + '] (' + time + ')\\n' + m.content + '\\n\\n'; }
    }

    var blob = new Blob([text], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 40) + '_export.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Chat exported', 'success');
  }

  // ============================================================
  // OVERLAYS
  // ============================================================

  function toggleOverlay(id) {
    $$('.overlay').forEach(function(o) { o.classList.remove('active'); });
    closeNotifDropdown();
    if (id) {
      var overlay = document.getElementById(id);
      if (overlay) overlay.classList.add('active');
      if (id === 'threadsOverlay') loadThreadSidebar();
    }
  }

  // ============================================================
  // NOTIFICATIONS (bell icon + dropdown)
  // ============================================================

  async function loadNotificationCount() {
    try {
      var data = await api('/chat/notifications/count');
      var badge = document.getElementById('notifBadge');
      if (!badge) return;
      var count = data.count || 0;
      badge.textContent = count > 99 ? '99+' : String(count);
      if (count > 0) { badge.classList.remove('hidden'); } else { badge.classList.add('hidden'); }
    } catch(e) {}
  }

  function toggleNotifDropdown() {
    var dd = document.getElementById('notifDropdown');
    if (!dd) return;
    if (dd.classList.contains('open')) { dd.classList.remove('open'); return; }
    dd.classList.add('open');
    loadNotifications();
  }

  function closeNotifDropdown() {
    var dd = document.getElementById('notifDropdown');
    if (dd) dd.classList.remove('open');
  }

  async function loadNotifications() {
    var list = document.getElementById('notifList');
    if (!list) return;
    list.innerHTML = '<div style="padding:16px;color:var(--text-muted);font-size:12px;">Loading...</div>';
    try {
      var data = await api('/chat/notifications?limit=30');
      var notifs = data.notifications || [];
      if (notifs.length === 0) {
        list.innerHTML = '<div class="notif-empty">No notifications yet.\\nScheduled tasks and system alerts will appear here.</div>';
        return;
      }
      var html = '';
      for (var i = 0; i < notifs.length; i++) {
        var n = notifs[i];
        var isUnread = !n.is_read;
        var typeIcon = '\\ud83d\\udd14';
        if (n.type === 'reminder') typeIcon = '\\u23f0';
        else if (n.type === 'mail') typeIcon = '\\u2709';
        else if (n.type === 'calendar') typeIcon = '\\ud83d\\udcc5';
        else if (n.type === 'error') typeIcon = '\\u26a0';
        else if (n.type === 'system') typeIcon = '\\u2699';
        html += '<div class="notif-item' + (isUnread ? ' unread' : '') + '" data-notif-id="' + n.id + '" data-notif-unread="' + (isUnread ? '1' : '0') + '" style="display:flex;align-items:flex-start;gap:6px;">';
        html += '<div style="flex:1;min-width:0;">';
        html += '<div class="notif-item-title">' + typeIcon + ' ' + escapeHtml(n.title) + '</div>';
        if (n.body) { var plain = mdToPlain(n.body); html += '<div class="notif-item-body">' + escapeHtml(plain.length > 200 ? plain.substring(0, 200) + '…' : plain) + '</div>'; }
        html += '<div class="notif-item-time">' + formatRelativeDate(n.created_at) + '</div>';
        html += '</div>';
        html += '<button class="notif-del-btn" data-del-id="' + n.id + '" title="Dismiss" style="flex-shrink:0;background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:10px;padding:2px 6px;border-radius:4px;line-height:1;opacity:0.6;letter-spacing:0.03em;font-family:var(--font-body);font-weight:500;">ok</button>';
        html += '</div>';
      }
      list.innerHTML = html;
      // Attach click handlers via delegation
      list.querySelectorAll('.notif-item[data-notif-id]').forEach(function(el) {
        el.addEventListener('click', function() {
          var nid = el.getAttribute('data-notif-id');
          var unread = el.getAttribute('data-notif-unread') === '1';
          if (unread && nid) {
            api('/chat/notifications/' + nid + '/read', { method:'PUT' }).then(function() {
              loadNotificationCount();
              loadNotifications();
            });
          }
        });
      });
      // Dismiss (delete) individual notification
      list.querySelectorAll('.notif-del-btn[data-del-id]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          var nid = btn.getAttribute('data-del-id');
          api('/chat/notifications/' + nid, { method:'DELETE' }).then(function() {
            loadNotificationCount();
            loadNotifications();
          });
        });
      });
    } catch(e) {
      list.innerHTML = '<div class="notif-empty" style="color:var(--danger);">Failed to load notifications.</div>';
    }
  }

  async function markAllNotificationsRead() {
    var confirmed = window.confirm('Delete all notifications? This cannot be undone.');
    if (!confirmed) return;
    await api('/chat/notifications/all', { method:'DELETE' });
    loadNotificationCount();
    loadNotifications();
    showToast('All notifications cleared', 'success');
  }

  function showConversations() {
    // Switch main area to chat view so it's not blank behind the sidebar
    if (state.view !== 'chat') {
      state.activeThreadId = null;
      state.view = 'chat';
      renderView();
    }
    toggleOverlay('threadsOverlay');
  }

  async function loadAssistantName() {
    var data = await api('/settings/profile');
    state.assistantName = data.assistant_name || 'Karna';
    var el = document.getElementById('assistantNameDisplay');
    if (el) el.textContent = state.assistantName.toUpperCase();
  }

  // ============================================================
  // SETTINGS PANEL
  // ============================================================

  // ============================================================
  // SETTINGS VIEW — Full-page, replaces overlay
  // ============================================================

  function settingsRow(icon, label, section) {
    return '<div class="settings-row" onclick="openSection(' + "'" + section + "'" + ')">' +
      '<span class="settings-row-icon">' + icon + '</span>' +
      '<span class="settings-row-label">' + label + '</span>' +
      '<span class="settings-row-chevron">&#8250;</span>' +
    '</div>';
  }

  function settingsRowLink(icon, label, action) {
    return '<div class="settings-row" onclick="' + action + '">' +
      '<span class="settings-row-icon">' + icon + '</span>' +
      '<span class="settings-row-label">' + label + '</span>' +
      '<span class="settings-row-chevron" style="font-size:12px;color:var(--accent);">&#8599;</span>' +
    '</div>';
  }

  var settingsSections = [
    { group: 'Account', items: [
      { icon: '👤', label: 'Profile', section: 'profile' },
      { icon: '🔑', label: 'API Keys', section: 'credentials' },
      { icon: '💬', label: 'Preferences', section: 'preferences' },
    ]},
    { group: 'Integrations', items: [
      { icon: '✈️', label: 'Telegram', section: 'telegram' },
      { icon: '🔔', label: 'Proactive & Briefings', section: 'proactive' },
    ]},
    { group: 'Automations', items: [
      { icon: '🗓', label: 'Scheduled Tasks', section: 'schedules' },
      { icon: '⚡', label: 'Skills ↗', section: '_skills_link' },
    ]},
    { group: 'System', items: [
      { icon: '❤️', label: 'Health', section: 'health' },
      { icon: '⚠️', label: 'Errors', section: 'errors' },
    ]},
  ];

  var sectionLabels = {
    profile: 'Profile', credentials: 'API Keys', preferences: 'Preferences',
    telegram: 'Telegram', proactive: 'Proactive & Briefings',
    schedules: 'Scheduled Tasks', health: 'Health', errors: 'Errors',
  };

  async function renderSettingsView(container) {
    var isDesktop = window.innerWidth >= 900;
    var section = state.settingsSection;

    // Helper: render section content into a target element
    async function renderSectionContent(target, sec) {
      try {
        switch (sec) {
          case 'profile': return await renderProfileTab(target);
          case 'credentials': return await renderCredentialsTab(target);
          case 'telegram': return await renderTelegramTab(target);
          case 'proactive': return await renderProactiveTab(target);
          case 'schedules': return await renderSchedulesTab(target);
          case 'preferences': return await renderPreferencesTab(target);
          case 'health': return await renderHealthTab(target);
          case 'errors': return await renderErrorsTab(target);
          default: target.innerHTML = '<div style="color:var(--text-muted);padding:24px;font-size:13px;">Select a section.</div>';
        }
      } catch(err) {
        target.innerHTML = '<div style="color:var(--danger);font-size:13px;padding:12px;">Error: ' + (err.message || 'Unknown') + '<br><button class="btn btn-small btn-danger" style="margin-top:12px;" onclick="clearSession();render();">Logout</button></div>';
      }
    }

    if (isDesktop) {
      // Two-column layout
      var activeSection = section || 'profile';
      var navHtml = '';
      for (var gi = 0; gi < settingsSections.length; gi++) {
        var grp = settingsSections[gi];
        navHtml += '<div class="settings-nav-group-label">' + grp.group + '</div>';
        for (var ii = 0; ii < grp.items.length; ii++) {
          var item = grp.items[ii];
          if (item.section === '_skills_link') {
            navHtml += '<div class="settings-nav-item" onclick="state.prevView=\\'settings\\';state.view=\\'skills\\';renderView();">' +
              '<span class="settings-nav-item-icon">' + item.icon + '</span>' + item.label + '</div>';
          } else {
            var isActive = activeSection === item.section;
            navHtml += '<div class="settings-nav-item' + (isActive ? ' active' : '') + '" onclick="openSection(' + "'" + item.section + "'" + ')">' +
              '<span class="settings-nav-item-icon">' + item.icon + '</span>' + item.label + '</div>';
          }
        }
      }
      container.innerHTML = '<div class="page-view">' +
        '<div class="page-header">' +
          '<button class="page-back-btn" onclick="goBack()">&#8592;</button>' +
          '<h2 class="page-title">Settings</h2>' +
        '</div>' +
        '<div class="settings-two-col">' +
          '<div class="settings-nav-col">' + navHtml + '</div>' +
          '<div class="settings-content-col" id="settingsContentCol"></div>' +
        '</div>' +
      '</div>';
      var col = document.getElementById('settingsContentCol');
      if (col) await renderSectionContent(col, activeSection);
    } else {
      // Mobile: single-column
      if (!section) {
        // Landing list
        var listHtml = '<div class="page-view">' +
          '<div class="page-header">' +
            '<button class="page-back-btn" onclick="goBack()">&#8592;</button>' +
            '<h2 class="page-title">Settings</h2>' +
          '</div>' +
          '<div class="settings-page">';
        for (var g = 0; g < settingsSections.length; g++) {
          var grp2 = settingsSections[g];
          listHtml += '<div class="settings-group">' +
            '<div class="settings-group-label">' + grp2.group + '</div>';
          for (var i = 0; i < grp2.items.length; i++) {
            var item2 = grp2.items[i];
            if (item2.section === '_skills_link') {
              listHtml += settingsRowLink(item2.icon, item2.label, 'state.prevView=\\'settings\\';state.view=\\'skills\\';renderView()');
            } else {
              listHtml += settingsRow(item2.icon, item2.label, item2.section);
            }
          }
          listHtml += '</div>';
        }
        listHtml += '</div></div>';
        container.innerHTML = listHtml;
      } else {
        // Sub-page
        var label = sectionLabels[section] || section;
        container.innerHTML = '<div class="page-view">' +
          '<div class="page-header">' +
            '<button class="page-back-btn" onclick="openSection(null)">&#8592; Settings</button>' +
            '<h2 class="page-title">' + label + '</h2>' +
          '</div>' +
          '<div class="settings-section-content" id="settingsContent"></div>' +
        '</div>';
        var sc = document.getElementById('settingsContent');
        if (sc) await renderSectionContent(sc, section);
      }
    }
  }

  async function renderProfileTab(container) {
    var data = await api('/settings/profile');
    if (data.error) { container.innerHTML = '<div style="color:var(--danger);font-size:13px;">Profile error: ' + escapeHtml(data.error) + '<br><button class="btn btn-small btn-danger" onclick="clearSession();render();">Logout</button></div>'; return; }
    container.innerHTML = '<div class="field"><label>Name</label><input type="text" id="profName" value="' + escapeHtml(data.name || '') + '"></div>' +
      '<div class="field"><label>Role</label><input type="text" id="profRole" value="' + escapeHtml(data.role || '') + '" placeholder="e.g. Founder, Software Engineer, Student"><div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Your professional context. Helps Karna tailor responses to your background.</div></div>' +
      '<div class="field"><label>Assistant Name</label><input type="text" id="profAssistantName" value="' + escapeHtml(data.assistant_name || 'Karna') + '" placeholder="What should your assistant be called?"><div style="font-size:11px;color:var(--text-muted);margin-top:4px;">The name your assistant uses.</div></div>' +
      '<div class="field"><label>Telegram Chat ID</label><input type="text" id="profTelegram" value="' + escapeHtml(data.telegram_chat_id || '') + '" placeholder="Your Telegram chat ID"><div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Get this by messaging @userinfobot on Telegram, or use /start with your bot.</div></div>' +
      '<div class="field"><label>Timezone</label><select id="profTimezone"><option value="Asia/Kolkata"' + (data.timezone==='Asia/Kolkata'?' selected':'') + '>Asia/Kolkata (IST)</option><option value="America/New_York"' + (data.timezone==='America/New_York'?' selected':'') + '>America/New_York (EST)</option><option value="Europe/London"' + (data.timezone==='Europe/London'?' selected':'') + '>Europe/London (GMT)</option><option value="UTC"' + (data.timezone==='UTC'?' selected':'') + '>UTC</option></select></div>' +
      '<button class="btn" id="profSave">Save Profile</button><div id="profMsg" class="success-text"></div>' +
      '<div style="margin-top:24px;border-top:1px solid var(--border);padding-top:16px;"><button class="btn btn-danger btn-small" id="logoutBtn">Logout</button></div>';
    document.getElementById('profSave').onclick = async function() {
      await api('/settings/profile', { method:'PUT', body:JSON.stringify({
        name: document.getElementById('profName').value.trim(),
        role: document.getElementById('profRole').value.trim(),
        assistant_name: document.getElementById('profAssistantName').value.trim() || 'Karna',
        telegram_chat_id: document.getElementById('profTelegram').value.trim(),
        timezone: document.getElementById('profTimezone').value,
      })});
      document.getElementById('profMsg').textContent = 'Saved';
      loadAssistantName();
      setTimeout(function() { var m = document.getElementById('profMsg'); if (m) m.textContent = ''; }, 2000);
    };
    document.getElementById('logoutBtn').onclick = async function() { await api('/auth/logout',{method:'POST'}); clearSession(); render(); };
  }

  async function renderCredentialsTab(container) {
    var data = await api('/settings/credentials');
    if (data.error) { container.innerHTML = '<div style="color:var(--danger);font-size:13px;">' + escapeHtml(data.error) + '</div>'; return; }
    state._lastCredData = data; // Cache for onSlotProviderChange
    var configured = {};
    var credLabels = {};
    (data.credentials || []).forEach(function(c) { configured[c.service] = true; credLabels[c.service] = c.label || ''; });
    var llmProviders = data.llm_providers || {};

    // Build provider dropdown options
    var providerOptions = '<option value="">-- Select Provider --</option>';
    var providerKeys = Object.keys(llmProviders);
    for (var pk = 0; pk < providerKeys.length; pk++) {
      var prov = llmProviders[providerKeys[pk]];
      providerOptions += '<option value="' + prov.id + '">' + escapeHtml(prov.label) + '</option>';
    }

    var slotNames = ['llm_slot_1','llm_slot_2','llm_slot_3'];
    var slotLabels = ['LLM Slot 1','LLM Slot 2','LLM Slot 3'];

    var sections = [
      { title:'AI PROVIDERS', desc:'Configure up to 3 LLM providers. Pick any company from the dropdown and paste your API key. Requests auto-rotate between all active slots.', items:[], custom_after:'llm_slots_section' },
      { title:'COMMUNICATION', desc:'Connect Karna to your messaging channels.', items:[
        {key:'telegram_bot_token',label:'Telegram Bot Token',placeholder:'Token from @BotFather'}
      ]},
      { title:'GOOGLE WORKSPACE', desc:'OAuth 2.0 for Sheets, Calendar, Docs, Drive, and Gmail.', items:[], custom_after:'google_oauth_section' },
      { title:'GOOGLE API KEY', desc:'Maps, Places, Directions, Translate, YouTube.', items:[
        {key:'google_api_key',label:'Google API Key',placeholder:'AIzaSy...'}
      ]},
      { title:'SEARCH & RESEARCH', desc:'Perplexity AI delivers faster, higher-quality research results. When configured, the research tool uses Perplexity instead of the default DuckDuckGo chain.', items:[
        {key:'perplexity_api_key',label:'Perplexity API Key',placeholder:'pplx-...'}
      ]}
    ];

    var html = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;">All credentials encrypted with your PIN.</div>';
    for (var s = 0; s < sections.length; s++) {
      var sec = sections[s];
      html += '<div style="font-size:10px;font-weight:600;letter-spacing:1.5px;color:var(--text-muted);margin:' + (s>0?'24px':'8px') + ' 0 6px;text-transform:uppercase;">' + sec.title + '</div>';
      html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;line-height:1.5;">' + sec.desc + '</div>';

      // === Generic LLM Slots Section ===
      if (sec.custom_after === 'llm_slots_section') {
        for (var sl = 0; sl < slotNames.length; sl++) {
          var slotKey = slotNames[sl];
          var slotLabel = slotLabels[sl];
          var isSlotSet = configured[slotKey];
          var slotProviderLabel = credLabels[slotKey] || '';
          var badgeColor = isSlotSet ? 'rgba(79,209,197,0.2)' : 'rgba(255,255,255,0.06)';
          var badgeTextColor = isSlotSet ? 'var(--accent)' : 'var(--text-muted)';
          var badgeText = isSlotSet ? slotProviderLabel || 'active' : 'empty';

          html += '<div class="item-card" style="margin-bottom:10px">';
          html += '<div class="item-card-header"><span class="item-card-title">' + slotLabel + '</span>';
          html += '<span class="tag" style="background:' + badgeColor + ';color:' + badgeTextColor + ';">' + escapeHtml(badgeText) + '</span></div>';
          // Row 1: Provider dropdown + API key
          html += '<div style="margin-top:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">';
          html += '<select id="slotProvider_' + slotKey + '" onchange="onSlotProviderChange(\\'' + slotKey + '\\')" style="flex:0 0 auto;min-width:160px;background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:10px;border-radius:6px;font-size:13px;outline:none;">' + providerOptions + '</select>';
          html += '<input type="text" id="slotKey_' + slotKey + '" placeholder="' + (isSlotSet ? '\\u2022\\u2022\\u2022 (enter new to update)' : 'Paste API key...') + '" style="flex:1;min-width:150px;background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:10px;border-radius:6px;font-size:14px;font-family:var(--font-mono);outline:none;">';
          html += '</div>';
          // Row 2: Model override (optional)
          html += '<div style="margin-top:6px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">';
          html += '<input type="text" id="slotModel_' + slotKey + '" placeholder="Model (optional — uses default if blank)" style="flex:1;background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:8px 10px;border-radius:6px;font-size:12px;font-family:var(--font-mono);outline:none;">';
          html += '<button class="btn btn-small" onclick="saveLLMSlot(\\'' + slotKey + '\\')">\\u2713 Save</button>';
          if (isSlotSet) {
            html += '<button class="btn btn-small" onclick="validateLLMSlot(\\'' + slotKey + '\\')" style="color:var(--accent);">Test</button>';
            html += '<button class="btn btn-small btn-danger" onclick="deleteCred(\\'' + slotKey + '\\')">\\u00d7</button>';
          }
          html += '</div>';
          html += '<div id="slotModelHint_' + slotKey + '" style="font-size:10px;color:var(--text-muted);margin-top:3px;min-height:0;"></div>';
          html += '<div id="credValidation_' + slotKey + '" style="font-size:11px;margin-top:4px;min-height:0;"></div>';
          html += '</div>';
        }

        // Show legacy keys notice if old anthropic/openai keys exist
        var hasLegacy = configured['anthropic'] || configured['openai'];
        if (hasLegacy) {
          html += '<div style="font-size:11px;color:var(--text-muted);margin:8px 0 12px;padding:10px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid var(--border-glass);line-height:1.6;">';
          html += '<strong style="color:var(--accent);">Legacy keys detected:</strong> ';
          if (configured['anthropic']) html += 'Anthropic ';
          if (configured['openai']) html += 'OpenAI ';
          html += '<br>These still work! But you can migrate them to the slots above for a cleaner setup. Once migrated, remove legacy keys below.';
          html += '<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">';
          if (configured['anthropic']) html += '<button class="btn btn-small btn-danger" onclick="deleteCred(\\'anthropic\\')">Remove legacy Anthropic</button>';
          if (configured['openai']) html += '<button class="btn btn-small btn-danger" onclick="deleteCred(\\'openai\\')">Remove legacy OpenAI</button>';
          html += '</div></div>';
        }
        continue;
      }

      for (var i = 0; i < sec.items.length; i++) {
        var svc = sec.items[i];
        var isSet = configured[svc.key];
        var badge = '<span class="tag">' + (isSet?'configured':'not set') + '</span>';
        html += '<div class="item-card" style="margin-bottom:10px"><div class="item-card-header"><span class="item-card-title">' + svc.label + '</span>' + badge + '</div>';
        html += '<div style="margin-top:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">';
        html += '<input type="' + (svc.isPassword?'password':'text') + '" id="cred_' + svc.key + '" placeholder="' + (isSet?'\\u2022\\u2022\\u2022 (enter new to update)':svc.placeholder) + '" style="flex:1;min-width:150px;background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:10px;border-radius:6px;font-size:14px;font-family:var(--font-mono);outline:none;">';
        html += '<button class="btn btn-small" onclick="saveCred(\\'' + svc.key + '\\')">✓ Save</button>';
        if (isSet) {
          html += '<button class="btn btn-small" onclick="validateCred(\\'' + svc.key + '\\')" style="color:var(--accent);">Test</button>';
          html += '<button class="btn btn-small btn-danger" onclick="deleteCred(\\'' + svc.key + '\\')">\\u00d7</button>';
        }
        html += '</div><div id="credValidation_' + svc.key + '" style="font-size:11px;margin-top:4px;min-height:0;"></div></div>';
      }
      if (sec.custom_after === 'google_oauth_section') {
        html += '<div id="googleOAuthSection" class="item-card" style="margin-bottom:10px;margin-top:4px;">';
        html += '<div class="item-card-header"><span class="item-card-title">Google Account</span><span class="tag" id="googleStatusBadge">loading...</span></div>';
        html += '<div id="googleStatusInfo" style="font-size:12px;color:var(--text-muted);margin:8px 0;line-height:1.6;"></div>';
        html += '<div style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;">';
        html += '<button class="btn btn-small" id="googleConnectBtn" onclick="connectGoogleAccount()" style="background:var(--accent);color:#080b11;font-weight:600;">Connect Google Account</button>';
        html += '<button class="btn btn-small" id="googleTestBtn" onclick="testGoogleConnection()" style="display:none;color:var(--accent);">Test</button>';
        html += '<button class="btn btn-small btn-danger" id="googleDisconnectBtn" onclick="disconnectGoogleAccount()" style="display:none;">Disconnect</button>';
        html += '</div><div id="googleTestResult" style="font-size:11px;margin-top:6px;min-height:0;"></div></div>';
      }
    }
    html += '<div id="credMsg" class="success-text"></div>';
    container.innerHTML = html;
    loadGoogleStatus();
  }

  async function loadGoogleStatus() {
    try {
      var status = await api('/settings/google/status');
      var badge = document.getElementById('googleStatusBadge');
      var info = document.getElementById('googleStatusInfo');
      var connectBtn = document.getElementById('googleConnectBtn');
      var testBtn = document.getElementById('googleTestBtn');
      var disconnectBtn = document.getElementById('googleDisconnectBtn');
      if (status.connected) {
        if (badge) { badge.textContent = 'connected'; badge.style.background = 'rgba(79,209,197,0.2)'; badge.style.color = 'var(--accent)'; }
        if (info) info.innerHTML = 'Connected as <strong style="color:var(--accent);">' + status.email + '</strong>' + (status.connectedAt ? '<br>Since: ' + new Date(status.connectedAt).toLocaleDateString() : '');
        if (connectBtn) connectBtn.textContent = 'Reconnect';
        if (testBtn) testBtn.style.display = 'inline-block';
        if (disconnectBtn) disconnectBtn.style.display = 'inline-block';
      } else {
        if (badge) { badge.textContent = 'not connected'; badge.style.background = ''; badge.style.color = ''; }
        if (info) { if (!status.oauth_client_configured) { info.innerHTML = 'Google OAuth not configured on deployment.'; if (connectBtn) { connectBtn.disabled = true; connectBtn.style.opacity = '0.4'; } } else { info.textContent = 'Click to connect Google account.'; } }
        if (connectBtn) connectBtn.textContent = 'Connect Google Account';
        if (testBtn) testBtn.style.display = 'none';
        if (disconnectBtn) disconnectBtn.style.display = 'none';
      }
    } catch(e) {}
  }

  var googleStatusInterval = null;

  async function checkGoogleConnectionBanner() {
    try {
      var status = await api('/settings/google/status');
      var existing = document.getElementById('googleDisconnectedBanner');
      if (!status.connected && status.oauth_client_configured) {
        if (!existing) {
          var banner = document.createElement('div');
          banner.id = 'googleDisconnectedBanner';
          banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:999;' +
            'background:#7a5c00;color:#fff5cc;font-size:12px;padding:8px 16px;' +
            'display:flex;align-items:center;justify-content:space-between;gap:12px;';
          banner.innerHTML =
            '<span>⚠️ Google account disconnected — Docs, Sheets, Calendar, Gmail unavailable.</span>' +
            '<span style="display:flex;gap:10px;align-items:center;">' +
              '<a href="#" style="color:#fff5cc;text-decoration:underline;font-size:12px;" ' +
                'onclick="event.preventDefault();state.prevView=state.view;state.view=\\'settings\\';state.settingsSection=\\'credentials\\';renderView();">' +
                'Connect in Settings →</a>' +
              '<button onclick="document.getElementById(\\'googleDisconnectedBanner\\').remove();" ' +
                'style="background:none;border:none;color:#fff5cc;cursor:pointer;font-size:16px;line-height:1;padding:0;">' +
                '×</button>' +
            '</span>';
          document.body.appendChild(banner);
        }
      } else {
        if (existing) existing.remove();
      }
    } catch(e) { /* ignore */ }
  }

  async function connectGoogleAccount() {
    try {
      var data = await api('/settings/google/auth-url');
      if (data.error) { var r = document.getElementById('googleTestResult'); if (r) { r.style.color = 'var(--danger)'; r.textContent = data.error; } return; }
      var popup = window.open(data.auth_url, 'google_oauth', 'width=600,height=700,scrollbars=yes');
      window.addEventListener('message', function handler(e) {
        if (e.data && e.data.type === 'google_oauth_complete') {
          window.removeEventListener('message', handler);
          if (e.data.success) { loadGoogleStatus(); checkGoogleConnectionBanner(); showToast('Google connected: ' + e.data.email, 'success'); }
        }
      });
    } catch(e) {}
  }
  async function testGoogleConnection() {
    var el = document.getElementById('googleTestResult');
    if (el) { el.style.color = 'var(--text-muted)'; el.textContent = 'Testing...'; }
    var r = await api('/settings/google/test', {method:'POST'});
    if (el) { el.style.color = r.success ? 'var(--accent)' : 'var(--danger)'; el.textContent = r.success ? r.message : (r.error || 'Test failed'); }
  }
  async function disconnectGoogleAccount() {
    if (!confirm('Disconnect Google? Karna will lose access to Sheets, Calendar, Docs, Drive, Gmail.')) return;
    await api('/settings/google/disconnect', {method:'POST'});
    loadGoogleStatus();
    checkGoogleConnectionBanner();
    showToast('Google disconnected', '');
  }

  async function saveCred(service) {
    var input = document.getElementById('cred_' + service);
    if (!input || !input.value.trim()) return;
    await api('/settings/credentials', { method:'PUT', body:JSON.stringify({service:service, value:input.value.trim()}) });
    input.value = '';
    renderView();
    showToast('Credential saved', 'success');
  }
  async function saveLLMSlot(slotKey) {
    var providerSelect = document.getElementById('slotProvider_' + slotKey);
    var keyInput = document.getElementById('slotKey_' + slotKey);
    var modelInput = document.getElementById('slotModel_' + slotKey);
    if (!providerSelect || !keyInput) return;
    var provider = providerSelect.value;
    var apiKey = keyInput.value.trim();
    var model = modelInput ? modelInput.value.trim() : '';
    if (!provider) { showToast('Please select a provider', ''); return; }
    if (!apiKey) { showToast('Please enter an API key', ''); return; }
    var slotObj = {provider: provider, apiKey: apiKey};
    if (model) slotObj.model = model;
    var slotValue = JSON.stringify(slotObj);
    var providerLabel = providerSelect.options[providerSelect.selectedIndex].text;
    var labelWithModel = model ? providerLabel + ' (' + model + ')' : providerLabel;
    await api('/settings/credentials', { method:'PUT', body:JSON.stringify({service: slotKey, value: slotValue, label: labelWithModel}) });
    keyInput.value = '';
    providerSelect.value = '';
    if (modelInput) modelInput.value = '';
    renderView();
    showToast(labelWithModel + ' saved to ' + slotKey.replace('llm_slot_','Slot '), 'success');
  }
  function onSlotProviderChange(slotKey) {
    var providerSelect = document.getElementById('slotProvider_' + slotKey);
    var keyInput = document.getElementById('slotKey_' + slotKey);
    var modelInput = document.getElementById('slotModel_' + slotKey);
    var hintEl = document.getElementById('slotModelHint_' + slotKey);
    if (!providerSelect) return;
    var providerId = providerSelect.value;
    // Get provider config from the llm_providers data we already have
    var credData = state._lastCredData;
    if (credData && credData.llm_providers && credData.llm_providers[providerId]) {
      var config = credData.llm_providers[providerId];
      if (keyInput) keyInput.placeholder = config.keyPlaceholder || 'Paste API key...';
      if (modelInput) modelInput.placeholder = config.defaultModel + ' (default)';
      if (hintEl) hintEl.textContent = config.modelHint ? 'Models: ' + config.modelHint : '';
    } else {
      if (keyInput) keyInput.placeholder = 'Paste API key...';
      if (modelInput) modelInput.placeholder = 'Model (optional — uses default if blank)';
      if (hintEl) hintEl.textContent = '';
    }
  }
  async function validateLLMSlot(slotKey) {
    var el = document.getElementById('credValidation_' + slotKey);
    if (el) el.innerHTML = '<span style="color:var(--text-muted);">Testing...</span>';
    var providerSelect = document.getElementById('slotProvider_' + slotKey);
    var keyInput = document.getElementById('slotKey_' + slotKey);
    var provider = providerSelect ? providerSelect.value : '';
    var apiKey = keyInput ? keyInput.value.trim() : '';
    if (!provider || !apiKey) { if (el) el.innerHTML = '<span style="color:var(--text-muted);">Select provider and enter key to test.</span>'; return; }
    try {
      var testValue = JSON.stringify({provider: provider, apiKey: apiKey});
      var r = await api('/settings/credentials/validate', {method:'POST', body:JSON.stringify({service: slotKey, value: testValue})});
      if (el) { el.innerHTML = r.valid ? '<span style="color:var(--accent);">\\u2713 ' + escapeHtml(r.message) + '</span>' : '<span style="color:var(--danger);">\\u2717 ' + escapeHtml(r.message) + '</span>'; setTimeout(function(){if(el)el.innerHTML='';},5000); }
    } catch(e) { if (el) el.innerHTML = '<span style="color:var(--danger);">\\u2717 Validation failed</span>'; }
  }
  async function deleteCred(service) {
    await api('/settings/credentials/' + service, {method:'DELETE'});
    renderView();
  }
  async function validateCred(service) {
    var el = document.getElementById('credValidation_' + service);
    if (el) el.innerHTML = '<span style="color:var(--text-muted);">Testing...</span>';
    var input = document.getElementById('cred_' + service);
    var value = input && input.value.trim() ? input.value.trim() : null;
    if (!value) { if (el) el.innerHTML = '<span style="color:var(--text-muted);">Enter a key to test.</span>'; return; }
    try {
      var r = await api('/settings/credentials/validate', {method:'POST', body:JSON.stringify({service:service,value:value})});
      if (el) { el.innerHTML = r.valid ? '<span style="color:var(--accent);">\\u2713 ' + escapeHtml(r.message) + '</span>' : '<span style="color:var(--danger);">\\u2717 ' + escapeHtml(r.message) + '</span>'; setTimeout(function(){if(el)el.innerHTML='';},5000); }
    } catch(e) { if (el) el.innerHTML = '<span style="color:var(--danger);">\\u2717 Validation failed</span>'; }
  }

  // ============================================================
  // TELEGRAM TAB
  // ============================================================

  async function renderTelegramTab(container) {
    container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">Loading Telegram status...</div>';
    
    var webhookStatus = await api('/telegram/webhook-status');
    var profileData = await api('/settings/profile');
    var chatId = profileData.telegram_chat_id || '';
    
    var html = '<div style="font-size:11px;font-weight:600;letter-spacing:1.5px;color:var(--text-muted);margin-bottom:12px;text-transform:uppercase;">Telegram Bot Setup</div>';
    
    // Step 1: Bot Token
    html += '<div class="item-card"><div class="item-card-header"><span class="item-card-title">Step 1: Bot Token</span>';
    html += '<span class="tag" style="' + (webhookStatus.configured ? 'background:var(--accent-dim);color:var(--accent-bright);' : '') + '">' + (webhookStatus.configured ? 'configured' : 'not set') + '</span></div>';
    html += '<div class="item-card-body" style="margin-top:4px;">Create a bot with <a href="https://t.me/BotFather" target="_blank" style="color:var(--accent);">@BotFather</a> on Telegram. Use /newbot, give it a name, then copy the token here (Settings \\u2192 Keys \\u2192 Telegram Bot Token).</div></div>';
    
    // Step 2: Chat ID — with auto-detect
    html += '<div class="item-card"><div class="item-card-header"><span class="item-card-title">Step 2: Chat ID</span>';
    html += '<span class="tag" style="' + (chatId ? 'background:var(--accent-dim);color:var(--accent-bright);' : '') + '">' + (chatId ? chatId : 'not set') + '</span></div>';
    html += '<div class="item-card-body" style="margin-top:4px;"><strong>Easiest way:</strong> Send any message to your bot on Telegram, then click the button below.</div>';
    html += '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">';
    html += '<button class="btn btn-small" id="detectChatIdBtn" onclick="detectTelegramChatId()" style="background:var(--accent);color:#080b11;font-weight:600;">\\ud83d\\udd0d Detect My Chat ID</button>';
    html += '</div>';
    html += '<div id="detectChatIdMsg" style="font-size:12px;margin-top:8px;line-height:1.5;"></div>';
    html += '<div style="font-size:11px;color:var(--text-muted);margin-top:8px;line-height:1.5;">Or manually: message <a href="https://t.me/userinfobot" target="_blank" style="color:var(--accent);">@userinfobot</a> on Telegram to get your ID, then set it in Settings \\u2192 Profile.</div></div>';
    
    // Step 3: Webhook
    html += '<div class="item-card"><div class="item-card-header"><span class="item-card-title">Step 3: Webhook</span>';
    if (webhookStatus.has_webhook) {
      html += '<span class="tag" style="background:var(--accent-dim);color:var(--accent-bright);">active</span></div>';
      html += '<div class="item-card-body" style="margin-top:4px;font-family:var(--font-mono);font-size:12px;word-break:break-all;">' + escapeHtml(webhookStatus.webhook_url || '') + '</div>';
      if (webhookStatus.last_error) {
        html += '<div style="color:var(--danger);font-size:12px;margin-top:6px;">Last error: ' + escapeHtml(webhookStatus.last_error) + '</div>';
      }
      html += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Pending updates: ' + (webhookStatus.pending_updates || 0) + '</div>';
    } else {
      html += '<span class="tag">not set</span></div>';
      html += '<div class="item-card-body" style="margin-top:4px;">Click the button below to register the webhook with Telegram.</div>';
    }
    html += '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">';
    html += '<button class="btn btn-small" id="setupWebhookBtn" onclick="setupTelegramWebhook()">Set Webhook</button>';
    html += '<button class="btn btn-small btn-danger" id="removeWebhookBtn" onclick="removeTelegramWebhook()">Remove Webhook</button>';
    html += '</div><div id="webhookMsg" style="font-size:11px;margin-top:6px;"></div></div>';
    
    // Commands reference
    html += '<div style="font-size:11px;font-weight:600;letter-spacing:1.5px;color:var(--text-muted);margin:24px 0 8px;text-transform:uppercase;">Bot Commands</div>';
    html += '<div class="item-card"><div class="item-card-body" style="font-size:13px;line-height:1.8;">' +
      '<strong>/start</strong> \\u2014 Welcome message + chat ID<br>' +
      '<strong>/help</strong> \\u2014 Available commands<br>' +
      '<strong>/status</strong> \\u2014 System stats<br>' +
      '<strong>/new</strong> \\u2014 Start fresh conversation<br>' +
      'Plus any natural language \\u2014 same as web chat' +
      '</div></div>';

    container.innerHTML = html;
  }

  async function setupTelegramWebhook() {
    var msg = document.getElementById('webhookMsg');
    if (msg) { msg.style.color = 'var(--text-muted)'; msg.textContent = 'Setting webhook...'; }
    var webhookUrl = window.location.origin + '/api/telegram/webhook';
    var result = await api('/telegram/setup-webhook', { method:'POST', body:JSON.stringify({ webhook_url: webhookUrl }) });
    if (msg) {
      if (result.ok) { msg.style.color = 'var(--accent)'; msg.textContent = '\\u2713 Webhook set: ' + webhookUrl; showToast('Telegram webhook active', 'success'); }
      else { msg.style.color = 'var(--danger)'; msg.textContent = '\\u2717 ' + (result.error || result.description || 'Failed'); }
    }
    setTimeout(function() { renderView(); }, 2000);
  }

  async function removeTelegramWebhook() {
    var msg = document.getElementById('webhookMsg');
    if (msg) { msg.style.color = 'var(--text-muted)'; msg.textContent = 'Removing webhook...'; }
    // Use a blank URL to remove
    var result = await api('/telegram/setup-webhook', { method:'POST', body:JSON.stringify({ webhook_url: '' }) });
    if (msg) {
      if (result.ok) { msg.style.color = 'var(--accent)'; msg.textContent = '\\u2713 Webhook removed'; showToast('Webhook removed', ''); }
      else { msg.style.color = 'var(--danger)'; msg.textContent = '\\u2717 ' + (result.error || 'Failed'); }
    }
    setTimeout(function() { renderView(); }, 2000);
  }

  async function detectTelegramChatId() {
    var msg = document.getElementById('detectChatIdMsg');
    var btn = document.getElementById('detectChatIdBtn');
    if (btn) btn.disabled = true;
    if (msg) { msg.style.color = 'var(--text-muted)'; msg.innerHTML = '\\ud83d\\udd0e Searching for your message... (make sure you sent something to the bot first)'; }
    try {
      var result = await api('/telegram/detect-chat-id', { method:'POST' });
      if (result.found) {
        if (msg) { msg.style.color = 'var(--accent)'; msg.innerHTML = '\\u2713 <strong>Found!</strong> Chat ID <strong>' + escapeHtml(result.chat_id) + '</strong> (' + escapeHtml(result.name) + ') — saved to your profile automatically.'; }
        showToast('Telegram Chat ID saved: ' + result.chat_id, 'success');
        // Refresh the tab to show updated badge
        setTimeout(function() { renderView(); }, 2000);
      } else if (result.error) {
        if (msg) { msg.style.color = 'var(--danger)'; msg.textContent = '\\u2717 ' + result.error; }
      } else {
        if (msg) { msg.style.color = 'var(--warning)'; msg.innerHTML = '\\u26a0 ' + escapeHtml(result.message || 'No messages found.') + '<br><strong>Try this:</strong> Open Telegram, send "hello" to your bot, wait 5 seconds, then click Detect again.'; }
      }
    } catch(e) {
      if (msg) { msg.style.color = 'var(--danger)'; msg.textContent = '\\u2717 Request failed: ' + e.message; }
    }
    if (btn) btn.disabled = false;
  }

  // ============================================================
  // PROACTIVE INTELLIGENCE TAB
  // ============================================================

  async function renderProactiveTab(container) {
    container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">Loading proactive settings...</div>';
    
    // Fetch briefings and preferences
    var briefingsData = await api('/proactive/briefings?limit=10');
    var prefsData = await api('/proactive/briefing-preferences');
    var briefings = briefingsData.briefings || [];
    var prefs = prefsData.preferences || {
      briefingTime: '20:00',
      briefingEnabled: true,
      components: { google_calendar: true, gmail: true, tasks: true, news: true },
      newsTopics: ['AI', 'LLM', 'Tools', 'Agentic Workflows', 'AI Features'],
      notificationChannels: { telegram: true, web: true },
      proactiveLevel: 'moderate'
    };
    
    var html = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;line-height:1.6;">' +
      '<strong>Proactive Intelligence</strong> keeps you ahead with configurable briefings, smart meeting reminders, and custom triggers.' +
      '</div>';
    
    // === Briefing Preferences Section ===
    html += '<div style="margin-bottom:20px;padding:16px;border:1px solid var(--border-glass);border-radius:10px;background:var(--bg-glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);">';
    // Briefing enabled toggle
    var briefingEnabled = prefs.briefingEnabled !== false; // default true
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">';
    html += '<div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);">🗓 Your Brief — scheduled at ' + escapeHtml(prefs.briefingTime || '20:00') + '</div>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;">';
    html += '<span style="color:var(--text-muted);">' + (briefingEnabled ? 'Enabled' : 'Disabled') + '</span>';
    html += '<div style="position:relative;width:36px;height:20px;">';
    html += '<input type="checkbox" id="briefingEnabled" ' + (briefingEnabled ? 'checked' : '') + ' style="opacity:0;width:0;height:0;position:absolute;" onchange="toggleBriefingEnabled(this.checked)">';
    html += '<div id="briefingToggleTrack" style="cursor:pointer;width:36px;height:20px;background:' + (briefingEnabled ? 'var(--accent)' : 'var(--border)') + ';border-radius:10px;transition:background 0.2s;"></div>';
    html += '<div id="briefingToggleThumb" style="cursor:pointer;position:absolute;top:2px;' + (briefingEnabled ? 'left:18px' : 'left:2px') + ';width:16px;height:16px;background:#fff;border-radius:50%;transition:left 0.2s;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>';
    html += '</div></label></div>';
    
    // Time picker
    html += '<div style="margin-bottom:12px;">';
    html += '<label style="display:block;font-size:12px;font-weight:500;margin-bottom:4px;">Briefing Time (uses your profile timezone)</label>';
    html += '<input type="time" id="briefingTime" value="' + escapeHtml(prefs.briefingTime) + '" style="background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:14px;width:120px;">';
    html += '</div>';
    
    // Components checkboxes
    html += '<div style="margin-bottom:12px;">';
    html += '<label style="display:block;font-size:12px;font-weight:500;margin-bottom:8px;">Briefing Components</label>';
    html += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">';
    
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="comp_google_calendar" ' + (prefs.components.google_calendar ? 'checked' : '') + '> Google Calendar</label>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="comp_gmail" ' + (prefs.components.gmail ? 'checked' : '') + '> Gmail Summary</label>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="comp_tasks" ' + (prefs.components.tasks ? 'checked' : '') + '> Tasks Overview</label>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="comp_weather" ' + (prefs.components.weather ? 'checked' : '') + '> Weather Forecast</label>';
    
    html += '</div>';
    html += '</div>';
    
    // News & Updates with topics text box
    html += '<div style="margin-bottom:12px;padding:10px;border:1px solid var(--border-glass);border-radius:8px;background:rgba(255,255,255,0.04);">';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;margin-bottom:8px;">' +
      '<input type="checkbox" id="comp_news" ' + (prefs.components.news ? 'checked' : '') + '> News & Updates</label>';
    html += '<div style="margin-left:22px;">';
    html += '<label style="display:block;font-size:11px;color:var(--text-muted);margin-bottom:4px;">News Topics (max 5, comma-separated)</label>';
    html += '<input type="text" id="newsTopics" value="' + escapeHtml(prefs.newsTopics.join(', ')) + '" placeholder="e.g., AI, LLM, Agentic Workflows" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:13px;" oninput="onUpdateTopicCount(this)">';
    html += '<div style="display:flex;justify-content:space-between;margin-top:4px;"><span style="font-size:10px;color:var(--text-muted);">Default: AI, LLM, Tools, Agentic Workflows, AI Features</span><span id="topicCountHint" style="font-size:10px;color:var(--text-muted);">' + prefs.newsTopics.length + '/5 topics</span></div>';
    html += '</div>';
    html += '</div>';
    
    // Notification channels
    html += '<div style="margin-bottom:12px;">';
    html += '<label style="display:block;font-size:12px;font-weight:500;margin-bottom:8px;">Notification Channels</label>';
    html += '<div style="display:flex;gap:16px;">';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="channel_telegram" ' + (prefs.notificationChannels.telegram ? 'checked' : '') + '> Telegram</label>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="channel_web" ' + (prefs.notificationChannels.web ? 'checked' : '') + '> Web</label>';
    html += '</div>';
    html += '</div>';
    
    // Proactive level
    html += '<div style="margin-bottom:12px;">';
    html += '<label style="display:block;font-size:12px;font-weight:500;margin-bottom:8px;">Proactive Level</label>';
    html += '<div style="display:flex;gap:16px;">';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="radio" name="proactiveLevel" value="conservative" ' + (prefs.proactiveLevel === 'conservative' ? 'checked' : '') + '> Conservative</label>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="radio" name="proactiveLevel" value="moderate" ' + (prefs.proactiveLevel === 'moderate' ? 'checked' : '') + '> Moderate</label>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="radio" name="proactiveLevel" value="aggressive" ' + (prefs.proactiveLevel === 'aggressive' ? 'checked' : '') + '> Aggressive</label>';
    html += '</div>';
    html += '</div>';
    
    // Save button and Generate Now
    html += '<div style="display:flex;gap:8px;margin-top:12px;">';
    html += '<button class="btn btn-small" style="background:var(--accent);color:#080b11;font-weight:600;" onclick="saveBriefingPreferences()">Save Preferences</button>';
    html += '<button class="btn btn-small" onclick="generateBriefingNow()">Generate Now</button>';
    html += '</div>';
    html += '</div>';
    
    // === Recent Briefings ===
    if (briefings.length > 0) {
      html += '<div style="margin-bottom:20px;">';
      html += '<div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">Recent Briefings</div>';
      for (var i = 0; i < briefings.length; i++) {
        var b = briefings[i];
        var date = new Date(b.sent_at).toLocaleDateString();
        var checkedCount = b.checked_count || 0;
        var totalCount = b.item_count || 0;
        html += '<div class="item-card" style="display:flex;justify-content:space-between;align-items:center;">';
        html += '<div style="flex:1;cursor:pointer;" onclick="viewBriefing(' + b.id + ')">';
        var briefTime = b.content && b.content.generatedAt ? new Date(b.content.generatedAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : '';
        html += '<div class="item-card-header" style="border:none;padding-bottom:0;"><span class="item-card-title">' + date + ' Briefing' + (briefTime ? ' (' + briefTime + ')' : '') + '</span>';
        html += '<span class="tag">' + checkedCount + '/' + totalCount + ' checked</span>';
        html += '<span class="tag" style="color:' + (b.delivered_telegram ? 'var(--success)' : 'var(--danger)') + ';">' + (b.delivered_telegram ? '✓ sent' : '✗ not sent') + '</span>';
        html += '</div>';
        html += '</div>';
        html += '<button class="btn btn-small" style="margin-left:6px;padding:4px 8px;min-width:auto;" onclick="resendBriefing(' + b.id + ')" title="Resend to Telegram">&#9992;</button>';
        html += '<button class="btn btn-small btn-danger" style="margin-left:4px;padding:4px 8px;min-width:auto;" onclick="deleteBriefing(' + b.id + ')" title="Delete">&times;</button>';
        html += '</div>';
      }
      html += '</div>';
    }
    
    // === Custom Triggers (not yet implemented) ===
    html += '<div style="margin-bottom:20px;padding:12px;border:1px dashed var(--border);border-radius:8px;">';
    html += '<div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px;">⚡ Custom Triggers</div>';
    html += '<div style="font-size:12px;color:var(--text-muted);">Conditional alerts (e.g. inbox over threshold, empty calendar) — coming soon.</div>';
    html += '</div>';
    
    // === Meeting Reminders ===
    html += '<div style="padding:12px;border:1px solid var(--border-glass);border-radius:10px;background:var(--bg-glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);">';
    html += '<div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">⏰ Meeting Reminders</div>';
    html += '<div style="font-size:13px;color:var(--text-secondary);">Automatic reminders <strong>30 minutes before</strong> Google Calendar events via Telegram.</div>';
    html += '</div>';
    
    container.innerHTML = html;
    
    // Attach toggle click handlers (avoids inline onclick escaping issues)
    var toggleTrack = document.getElementById('briefingToggleTrack');
    var toggleThumb = document.getElementById('briefingToggleThumb');
    function clickToggle() {
      var cb = document.getElementById('briefingEnabled');
      if (cb) { cb.checked = !cb.checked; cb.dispatchEvent(new Event('change')); }
    }
    if (toggleTrack) toggleTrack.onclick = clickToggle;
    if (toggleThumb) toggleThumb.onclick = clickToggle;
  }
  
  // Proactive helper functions (global scope)
  window.saveBriefingPreferences = async function() {
    // Collect values from form
    var briefingTime = document.getElementById('briefingTime').value || '20:00';
    var newsTopicsRaw = document.getElementById('newsTopics').value || '';
    var newsTopics = newsTopicsRaw.split(',').map(function(t) { return t.trim(); }).filter(Boolean);
    
    // Validate max 5 topics
    if (newsTopics.length > 5) {
      showToast('Maximum 5 news topics allowed', 'error');
      return;
    }
    
    var components = {
      google_calendar: document.getElementById('comp_google_calendar').checked,
      gmail: document.getElementById('comp_gmail').checked,
      tasks: document.getElementById('comp_tasks').checked,
      news: document.getElementById('comp_news').checked,
      weather: document.getElementById('comp_weather').checked
    };
    
    var notificationChannels = {
      telegram: document.getElementById('channel_telegram').checked,
      web: document.getElementById('channel_web').checked
    };
    
    var proactiveLevel = document.querySelector('input[name="proactiveLevel"]:checked');
    proactiveLevel = proactiveLevel ? proactiveLevel.value : 'moderate';
    
    var briefingEnabledEl = document.getElementById('briefingEnabled');
    var briefingEnabled = briefingEnabledEl ? briefingEnabledEl.checked : true;
    
    showToast('Saving preferences...', '');
    var result = await api('/proactive/briefing-preferences', {
      method: 'POST',
      body: JSON.stringify({
        briefingTime: briefingTime,
        briefingEnabled: briefingEnabled,
        components: components,
        newsTopics: newsTopics,
        notificationChannels: notificationChannels,
        proactiveLevel: proactiveLevel
      })
    });
    
    if (result.error) {
      showToast(result.error, 'error');
      return;
    }
    showToast('Preferences saved!', 'success');
  };
  
  window.resendBriefing = async function(id) {
    showToast('Sending to Telegram...', '');
    var result = await api('/proactive/briefings/' + id + '/resend', { method: 'POST' });
    if (result && result.error) {
      showToast(result.error, 'error');
    } else {
      showToast('Briefing sent to Telegram ✓', 'success');
      renderView();
    }
  };

  window.deleteBriefing = async function(id) {
    // Custom confirm to avoid browser dialog blocking (e.g. in some mobile webviews)
    var confirmed = await new Promise(function(resolve) {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;';
      overlay.innerHTML = '<div style="background:var(--bg-glass-deep);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--border-glass);border-radius:16px;padding:24px;max-width:320px;width:90%;text-align:center;">' +
        '<div style="font-size:15px;font-weight:600;margin-bottom:8px;">Delete Briefing?</div>' +
        '<div style="font-size:13px;color:var(--text-muted);margin-bottom:20px;">This cannot be undone.</div>' +
        '<div style="display:flex;gap:10px;justify-content:center;">' +
        '<button id="cfmCancel" class="btn" style="min-width:80px;">Cancel</button>' +
        '<button id="cfmOk" class="btn btn-danger" style="min-width:80px;">Delete</button>' +
        '</div></div>';
      document.body.appendChild(overlay);
      overlay.querySelector('#cfmOk').onclick = function() { document.body.removeChild(overlay); resolve(true); };
      overlay.querySelector('#cfmCancel').onclick = function() { document.body.removeChild(overlay); resolve(false); };
    });
    if (!confirmed) return;
    var result = await api('/proactive/briefings/' + id, { method: 'DELETE' });
    if (result && result.error) {
      showToast('Delete failed: ' + result.error, 'error');
    } else {
      showToast('Briefing deleted', 'success');
      if (state.view === 'settings') {
        state.settingsSection = 'proactive';
      }
      renderView();
    }
  };

  window.onUpdateTopicCount = function(el) {
    var count = el.value.split(',').map(function(t) { return t.trim(); }).filter(Boolean).length;
    var hint = document.getElementById('topicCountHint');
    if (hint) {
      hint.textContent = count + '/5 topics';
      hint.style.color = count > 5 ? 'var(--danger)' : 'var(--text-muted)';
    }
  };

  window.toggleBriefingEnabled = async function(enabled) {
    try {
      await api('/proactive/briefing-preferences', {
        method: 'POST',
        body: JSON.stringify({ briefingEnabled: enabled })
      });
      showToast(enabled ? 'Briefing enabled' : 'Briefing disabled', 'success');
      // Refresh the tab to update the toggle visual
      renderView();
    } catch (e) {
      showToast('Failed to update', 'error');
    }
  };

  window.generateBriefingNow = async function() {
    showToast('Generating briefing...', '');
    var result = await api('/proactive/briefings/generate', {method:'POST'});
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast('Briefing generated!', 'success');
    renderView();
  };
  
  window.viewBriefing = async function(id) {
    try {
      var result = await api('/proactive/briefings/' + id);
      if (result.error) { showToast(result.error, 'error'); return; }
      if (!result.briefing) { showToast('Briefing not found', 'error'); return; }
      var b = result.briefing;
      var items = result.items || [];
      var content = b.content || {};
      
      // Close settings and show briefing in main chat area
      toggleOverlay(null);
      state.view = 'chat';
      
      // Build beautiful briefing view in main chat area
      var html = '<div style="max-width:720px;margin:0 auto;padding:24px;">';
      
      // Header
      html += '<div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border);">';
      html += '<h2 style="font-size:24px;font-weight:600;margin:0 0 8px 0;color:var(--text-primary);">📋 Briefing</h2>';
      html += '<div style="font-size:14px;color:var(--text-muted);">' + new Date(b.sent_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + '</div>';
      html += '</div>';
      
      // Calendar Events
      if (content.calendar && content.calendar.totalCount > 0) {
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:12px;border:1px solid var(--border-glass);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">📅 Tomorrow&apos;s Schedule</h3>';
        var googleEvents = content.calendar.google || [];
        var allEvents = googleEvents;
        for (var e = 0; e < allEvents.length; e++) {
          var evt = allEvents[e];
          var time = evt.startTime ? new Date(evt.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
          html += '<div style="margin-bottom:12px;padding:12px;background:rgba(201,137,63,0.07);border-radius:8px;border-left:3px solid var(--accent);">';
          html += '<div style="font-size:14px;font-weight:500;color:var(--text-primary);margin-bottom:4px;">' + escapeHtml(evt.title) + '</div>';
          html += '<div style="font-size:13px;color:var(--text-muted);">⏰ ' + time;
          if (evt.location) html += ' • 📍 ' + escapeHtml(evt.location);
          html += '</div></div>';
        }
        html += '</div>';
      }
      
      // Emails
      var gmailUnread = (content.emails && content.emails.gmail) ? content.emails.gmail.unreadCount : 0;
      var totalUnread = gmailUnread;
      if (totalUnread > 0) {
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:12px;border:1px solid var(--border-glass);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">📧 Email Summary</h3>';
        
        if (content.emails && content.emails.gmail && content.emails.gmail.unreadCount > 0) {
          html += '<div style="margin-bottom:12px;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px;">';
          html += '<div style="font-size:14px;font-weight:500;margin-bottom:4px;">Gmail: ' + content.emails.gmail.unreadCount + ' unread</div>';
          if (content.emails.gmail.hasUrgent) {
            html += '<div style="font-size:13px;color:#ff6b6b;margin-bottom:4px;">⚠️ Contains urgent messages</div>';
          }
          if (content.emails.gmail.topSenders && content.emails.gmail.topSenders.length > 0) {
            html += '<div style="font-size:12px;color:var(--text-muted);">Top senders: ' + content.emails.gmail.topSenders.slice(0, 3).join(', ') + '</div>';
          }
          html += '</div>';
        }
        
        // Outlook removed in v4
        html += '</div>';
      }
      
      // Tasks
      if (content.tasks && content.tasks.pending > 0) {
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:12px;border:1px solid var(--border-glass);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">✅ Open Tasks (' + content.tasks.pending + ')</h3>';
        if (content.tasks.items && content.tasks.items.length > 0) {
          for (var t = 0; t < content.tasks.items.length; t++) {
            html += '<div style="padding:8px 12px;background:rgba(255,255,255,0.04);border-radius:6px;margin-bottom:6px;font-size:13px;display:flex;align-items:center;gap:8px;"><span style="color:var(--text-muted);">☐</span>' + escapeHtml(content.tasks.items[t]) + '</div>';
          }
        }
        html += '</div>';
      } else if (content.tasks) {
        html += '<div style="margin-bottom:24px;padding:12px 16px;background:var(--bg-glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:12px;border:1px solid var(--border-glass);font-size:13px;color:var(--text-muted);">✅ Tasks: All clear</div>';
      }
      
      // News
      if (content.news && content.news.items && content.news.items.length > 0) {
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:12px;border:1px solid var(--border-glass);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">📡 Today&#39;s Signal</h3>';
        for (var n = 0; n < content.news.items.length; n++) {
          var newsItem = content.news.items[n];
          html += '<div style="margin-bottom:12px;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px;">';
          html += '<a href="' + escapeHtml(newsItem.url) + '" target="_blank" style="font-size:14px;font-weight:500;color:var(--accent);text-decoration:none;display:block;margin-bottom:4px;">' + escapeHtml(newsItem.title) + ' ↗</a>';
          html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">' + escapeHtml(newsItem.summary) + '</div>';
          var isHN = newsItem.source === 'news.ycombinator.com';
          html += '<div style="font-size:11px;color:var(--text-muted);">' + (isHN ? '🟠 HN · ' : '🔗 ') + escapeHtml(newsItem.source) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }
      
      // Interactive Checklist
      if (items.length > 0) {
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:12px;border:1px solid var(--border-glass);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">📝 Action Items</h3>';
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var checked = item.checked ? '✅' : '☐';
          var opacity = item.checked ? '0.6' : '1';
          html += '<div class="item-card" style="cursor:pointer;opacity:' + opacity + ';" onclick="toggleBriefingCheckbox(' + b.id + ',' + item.id + ')">';
          html += '<span style="margin-right:8px;font-size:16px;">' + checked + '</span>';
          html += '<span style="font-size:14px;">' + escapeHtml(item.item_text) + '</span>';
          html += '</div>';
        }
        html += '</div>';
      }
      
      // Footer
      html += '<div style="text-align:center;padding-top:16px;border-top:1px solid var(--border);">';
      html += '<button class="btn btn-small" onclick="location.reload()">← Back to Chat</button>';
      html += '</div>';
      
      html += '</div>';
      
      // Get chat area - it may be messages (chat view) or dashContent (dashboard view)
      var chat = document.getElementById('messages');
      if (!chat) {
        // If not in chat view, switch to chat view first
        state.view = 'chat';
        state.activeThreadId = null;
        renderView();
        // Try again after rendering
        chat = document.getElementById('messages');
      }
      if (!chat) { showToast('Chat area not found', 'error'); return; }
      chat.innerHTML = html;
    } catch (err) {
      console.error('Error viewing briefing:', err);
      showToast('Error displaying briefing: ' + err.message, 'error');
    }
  };
  
  window.toggleBriefingCheckbox = async function(briefingId, itemId) {
    var result = await api('/proactive/briefings/' + briefingId + '/items/' + itemId + '/toggle', {method:'POST'});
    if (result.error) { showToast(result.error, 'error'); return; }
    viewBriefing(briefingId);
  };
  
  window.initDefaultTriggers = async function() {
    var result = await api('/proactive/triggers/init-defaults', {method:'POST'});
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast('Default triggers created!', 'success');
    renderView();
  };
  
  window.toggleTriggerEnabled = async function(id, enabled) {
    await api('/proactive/triggers/' + id, {method:'PUT', body:JSON.stringify({enabled:enabled})});
    renderView();
  };
  
  window.deleteTriggerItem = async function(id) {
    if (!confirm('Delete this trigger?')) return;
    await api('/proactive/triggers/' + id, {method:'DELETE'});
    renderView();
  };
  
  window.showAddTriggerForm = function() {
    document.getElementById('addTriggerForm').style.display = 'block';
  };
  
  window.hideAddTriggerForm = function() {
    document.getElementById('addTriggerForm').style.display = 'none';
  };
  
  window.saveTrigger = async function() {
    var name = document.getElementById('triggerName').value.trim();
    var type = document.getElementById('triggerType').value;
    var keywords = document.getElementById('triggerKeywords').value.split(',').map(function(k) { return k.trim(); }).filter(Boolean);
    
    if (!name) { showToast('Name is required', 'error'); return; }
    
    var result = await api('/proactive/triggers', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        type: type,
        conditions: { keywords: keywords },
        actions: { notify: true, telegram: true, log: true }
      })
    });
    
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast('Trigger created!', 'success');
    hideAddTriggerForm();
    renderView();
  };

  // ============================================================
  // REMAINING SETTINGS TABS (features tab removed in v4)
  // ============================================================

  async function renderSchedulesTab(container) {
    var data = await api('/settings/schedules');
    var schedules = data.schedules || [];
    if (schedules.length === 0) { container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">No scheduled tasks. Ask in chat to set reminders.</div>'; return; }
    var html = '';
    for (var i = 0; i < schedules.length; i++) {
      var job = schedules[i];
      var config = JSON.parse(job.action_config || '{}');
      var stateColors = {created:'#888',active:'#4fd1c5',reminding:'#f6ad55',paused:'#a0aec0',completed:'#68d391'};
      var sc = stateColors[job.state] || '#888';
      html += '<div class="item-card"><div class="item-card-header"><span class="item-card-title">' + escapeHtml(job.name) + '</span>' +
        '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
        '<span class="tag" style="background:rgba(255,255,255,0.04);color:' + sc + ';border:1px solid ' + sc + '33;">' + (job.state||'active') + '</span>' +
        '<label class="toggle"><input type="checkbox"' + (job.enabled?' checked':'') + ' onchange="toggleSchedule(' + job.id + ',this.checked)"><div class="toggle-track"></div><div class="toggle-thumb"></div></label>' +
        '<button class="btn btn-small btn-danger" onclick="deleteSchedule(' + job.id + ')">\\u00d7</button></div></div>' +
        '<div class="item-card-body">' + 
          (job.schedule_type === 'interval' ? 'Every ' + job.schedule_value + ' min' : 
           job.schedule_type === 'daily' ? 'Daily at ' + job.schedule_value : 
           job.schedule_type === 'weekly' ? 'Weekly on ' + job.schedule_value : 
           job.schedule_type === 'once' ? 'Once at ' + job.schedule_value : 
           job.schedule_type + ' at ' + job.schedule_value) + ' \\u00b7 ' + escapeHtml(job.action_type) + '</div>' +
        (config.description ? '<div class="item-card-meta" style="margin-top:4px">' + escapeHtml(config.description) + '</div>' : '') +
        (job.next_run ? '<div class="item-card-meta">Next: ' + new Date(job.next_run).toLocaleString() + '</div>' : '') +
        (job.last_run ? '<div class="item-card-meta">Last: ' + new Date(job.last_run).toLocaleString() + '</div>' : '') + '</div>';
    }
    container.innerHTML = html;
  }
  async function toggleSchedule(id, enabled) { await api('/settings/schedules/' + id + '/toggle', {method:'PUT',body:JSON.stringify({enabled:enabled})}); }
  async function deleteSchedule(id) { await api('/settings/schedules/' + id, {method:'DELETE'}); renderView(); }

  // Open Tasks as floating centered overlay modal (works from any view)
  window.viewTasksModal = async function() {
    var data = await api('/settings/schedules');
    var schedules = data.schedules || [];
    var existing = document.getElementById('tasksFloatOverlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'tasksFloatOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

    var panel = document.createElement('div');
    panel.style.cssText = 'width:100%;max-width:680px;max-height:80vh;overflow-y:auto;background:var(--bg-glass-deep);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--border-glass);border-radius:20px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,0.5);';

    var stateColors = {created:'#888',active:'var(--accent)',reminding:'#f6ad55',paused:'#a0aec0',completed:'var(--success)'};
    var inner = '<div style="margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">';
    inner += '<h2 style="font-size:22px;font-weight:600;margin:0;color:var(--text-primary);">⏰ Scheduled Tasks</h2>';
    inner += '<button id="tasksFloatClose" class="btn btn-small">✕ Close</button>';
    inner += '</div>';
    if (schedules.length === 0) {
      inner += '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No scheduled tasks. Ask in chat to set reminders or recurring tasks.</div>';
    } else {
      for (var i = 0; i < schedules.length; i++) {
        var job = schedules[i];
        var config = JSON.parse(job.action_config || '{}');
        var sc = stateColors[job.state] || '#888';
        var freq = job.schedule_type === 'interval' ? 'Every ' + job.schedule_value + ' min' :
                   job.schedule_type === 'daily'    ? 'Daily at ' + job.schedule_value :
                   job.schedule_type === 'weekly'   ? 'Weekly on ' + job.schedule_value :
                   job.schedule_type === 'once'     ? 'Once at ' + job.schedule_value :
                   job.schedule_type + ' ' + job.schedule_value;
        inner += '<div style="padding:14px 16px;margin-bottom:10px;background:var(--bg-glass);border:1px solid var(--border-glass);border-radius:12px;">';
        inner += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">';
        inner += '<span style="font-size:14px;font-weight:600;color:var(--text-primary);">' + escapeHtml(job.name) + '</span>';
        inner += '<span style="font-size:11px;font-weight:600;color:' + sc + ';padding:2px 8px;border:1px solid ' + sc + '44;border-radius:10px;">' + (job.state||'active') + '</span>';
        inner += '</div>';
        inner += '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px;">&#128257; ' + escapeHtml(freq) + ' &nbsp;&middot;&nbsp; ' + escapeHtml(job.action_type) + '</div>';
        if (config.description) inner += '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">' + escapeHtml(config.description) + '</div>';
        if (job.next_run && job.state !== 'completed') inner += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Next: ' + new Date(job.next_run).toLocaleString() + '</div>';
        if (job.last_run) inner += '<div style="font-size:11px;color:var(--text-muted);">Last: ' + new Date(job.last_run).toLocaleString() + '</div>';
        inner += '</div>';
      }
    }
    inner += '<div style="margin-top:16px;"><button id="tasksFloatManage" class="btn">Manage in Settings &#8594;</button></div>';
    panel.innerHTML = inner;
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Attach button handlers via JS (avoids inline onclick quoting issues)
    document.getElementById('tasksFloatClose').onclick = function() { overlay.remove(); };
    document.getElementById('tasksFloatManage').onclick = function() {
      overlay.remove();
      state.prevView = state.view;
      state.view = 'settings';
      state.settingsSection = 'schedules';
      renderView();
    };
    function onKeyDown(e) { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', onKeyDown); } }
    document.addEventListener('keydown', onKeyDown);
  };

  // Open Memory as floating centered modal
  window.viewMemoryModal = async function() {
    var data = await api('/settings/memory');
    var memories = data.memories || [];
    // Build floating overlay modal
    var existing = document.getElementById('memoryFloatOverlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.id = 'memoryFloatOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    var panel = document.createElement('div');
    panel.style.cssText = 'width:100%;max-width:680px;max-height:80vh;overflow-y:auto;background:var(--bg-glass-deep);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--border-glass);border-radius:20px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,0.5);';
    var html = '<div style="margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">';
    html += '<h2 style="font-size:22px;font-weight:600;margin:0;color:var(--text-primary);">U0001f9e0 Memories</h2>';
    html += '<button id="memFloatClose" class="btn btn-small">✕ Close</button>';
    html += '</div>';
    if (memories.length === 0) {
      html += '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No memories yet. Important info will be remembered as you chat.</div>';
    } else {
      html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:14px;">Working memory is always in context. Long-term is searched on demand.</div>';
      for (var i = 0; i < memories.length; i++) {
        var m = memories[i];
        var tc = m.tier === 'working' ? 'rgba(255,107,74,0.18)' : 'rgba(255,255,255,0.05)';
        var ttc = m.tier === 'working' ? 'var(--accent)' : 'var(--text-muted)';
        html += '<div style="padding:14px 16px;margin-bottom:10px;background:' + tc + ';border:1px solid var(--border-glass);border-radius:12px;">';
        html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">';
        html += '<span style="font-size:13px;font-weight:600;color:var(--text-primary);flex:1;">' + escapeHtml(m.title) + '</span>';
        html += '<span style="font-size:10px;font-weight:600;color:' + ttc + ';padding:2px 7px;border:1px solid ' + ttc + '44;border-radius:8px;">' + (m.tier==='working'?'active':'archive') + '</span>';
        html += '<span style="font-size:10px;color:var(--text-muted);padding:2px 7px;border:1px solid var(--border);border-radius:8px;">' + escapeHtml(m.type) + '</span>';
        html += '<span style="font-size:10px;color:var(--text-muted);">&#9733;' + m.importance + '</span>';
        html += '<button data-memid="' + m.id + '" class="mem-del-btn" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:14px;padding:2px 6px;border-radius:6px;" title="Delete">&#215;</button>';
        html += '</div>';
        html += '<div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">' + escapeHtml(m.content) + '</div>';
        html += '</div>';
      }
    }
    html += '<div style="margin-top:16px;"><button id="memFloatManage" class="btn">Manage in Settings &#8594;</button></div>';
    panel.innerHTML = html;
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Attach handlers via JS — no inline onclick quoting issues
    document.getElementById('memFloatClose').onclick = function() { overlay.remove(); };
    document.getElementById('memFloatManage').onclick = function() {
      overlay.remove();
      state.prevView = state.view;
      state.view = 'settings';
      state.settingsSection = 'preferences';
      renderView();
    };
    panel.querySelectorAll('.mem-del-btn').forEach(function(btn) {
      btn.onclick = function() {
        var mid = parseInt(btn.getAttribute('data-memid'), 10);
        deleteMemory(mid);
        overlay.remove();
        viewMemoryModal();
      };
    });
    function onKeyDown(e) { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', onKeyDown); } }
    document.addEventListener('keydown', onKeyDown);
  };

  // ============================================================
  // SKILLS VIEW — Full-page primary section
  // ============================================================

  function renderSkillCard(s) {
    var enabledBadge = s.enabled ? '' : '<span style="font-size:10px;color:var(--danger);background:rgba(220,53,69,0.15);padding:1px 6px;border-radius:4px;margin-left:6px;">disabled</span>';
    return '<div class="skill-card' + (s.enabled ? '' : ' skill-disabled') + '">' +
      '<div class="skill-card-name">' + escapeHtml(s.name) + enabledBadge + '</div>' +
      '<div class="skill-card-slug">' + escapeHtml(s.slug) + '</div>' +
      '<div class="skill-card-desc">' + escapeHtml(s.description) + '</div>' +
      '<div class="skill-card-meta">Used ' + (s.usage_count || 0) + ' times' + (s.last_used_at ? ' &middot; Last: ' + formatRelativeDate(s.last_used_at) : '') + '</div>' +
      '<div class="skill-card-actions">' +
        '<button class="btn btn-small" onclick="toggleSkill(' + s.id + ',' + (s.enabled ? 'false' : 'true') + ')">' + (s.enabled ? 'Disable' : 'Enable') + '</button>' +
        '<button class="btn btn-small" onclick="editSkill(' + s.id + ')">Edit</button>' +
        '<button class="btn btn-small btn-danger" onclick="deleteSkill(' + s.id + ')">Delete</button>' +
      '</div>' +
    '</div>';
  }

  async function renderSkillsView(container) {
    var data = await api('/skills');
    var skills = data.skills || [];

    var html = '<div class="page-view">' +
      '<div class="page-header">' +
        '<button class="page-back-btn" onclick="goBack()">&#8592;</button>' +
        '<h2 class="page-title">Skills</h2>' +
        '<button class="btn btn-small" onclick="showCreateSkillModal()" style="width:auto;padding:7px 14px;">+ New</button>' +
      '</div>' +
      '<div class="skills-page">';

    if (skills.length === 0) {
      html += '<div class="skills-empty">' +
        '<div class="skills-empty-icon">&#9889;</div>' +
        '<div class="skills-empty-title">No skills yet</div>' +
        '<div class="skills-empty-hint">Ask Karna in chat:<br><code>"Create a skill that..."</code><br><br>Or tap <strong>+ New</strong> above to create one manually.</div>' +
      '</div>';
    } else {
      for (var i = 0; i < skills.length; i++) {
        html += renderSkillCard(skills[i]);
      }
    }

    html += '</div></div>';
    container.innerHTML = html;
  }

  window.showCreateSkillModal = function() {
    var existing = document.getElementById('createSkillModal');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.id = 'createSkillModal';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    var panel = document.createElement('div');
    panel.style.cssText = 'background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;';
    panel.innerHTML =
      '<div style="font-size:16px;font-weight:600;margin-bottom:16px;">Create New Skill</div>' +
      '<div class="field"><label>Name</label><input type="text" id="newSkillName" placeholder="e.g. Equipment List Parser" style="font-size:16px;"></div>' +
      '<div class="field"><label>Description</label><input type="text" id="newSkillDesc" placeholder="What this skill does in one sentence" style="font-size:16px;"></div>' +
      '<div class="field"><label>Instructions</label><textarea id="newSkillInstructions" rows="6" placeholder="Step-by-step instructions for Karna to follow when this skill is invoked..." style="font-size:16px;"></textarea></div>' +
      '<div class="field"><label>Required Tools <span style="font-size:11px;color:var(--text-muted)">(comma-separated)</span></label><input type="text" id="newSkillTools" placeholder="e.g. parse_document, append_sheet" style="font-size:16px;"></div>' +
      '<div style="display:flex;gap:8px;margin-top:4px;">' +
        '<button class="btn" id="newSkillSave">Create Skill</button>' +
        '<button class="btn" id="newSkillCancel">Cancel</button>' +
      '</div>' +
      '<div id="newSkillMsg" style="font-size:13px;margin-top:8px;color:var(--danger);"></div>';
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    document.getElementById('newSkillCancel').onclick = function() { overlay.remove(); };
    document.getElementById('newSkillSave').onclick = async function() {
      var name = document.getElementById('newSkillName').value.trim();
      var desc = document.getElementById('newSkillDesc').value.trim();
      var instructions = document.getElementById('newSkillInstructions').value.trim();
      var toolsStr = document.getElementById('newSkillTools').value.trim();
      var msg = document.getElementById('newSkillMsg');
      if (!name || !desc || !instructions) { msg.textContent = 'Name, description, and instructions are required.'; return; }
      var required_tools = toolsStr ? toolsStr.split(',').map(function(t) { return t.trim(); }).filter(Boolean) : [];
      var res = await api('/skills', { method: 'POST', body: JSON.stringify({ name: name, description: desc, instructions: instructions, required_tools: required_tools }) });
      if (res.created) {
        overlay.remove();
        showToast('Skill created: ' + res.skill.slug, 'success');
        renderView();
      } else {
        msg.textContent = 'Error: ' + (res.error || 'Unknown error');
      }
    };
    setTimeout(function() { var f = document.getElementById('newSkillName'); if (f) f.focus(); }, 50);
  };

  async function toggleSkill(id, enabled) {
    await api('/skills/' + id, { method: 'PUT', body: JSON.stringify({ enabled }) });
    renderView();
  }

  async function deleteSkill(id) {
    if (!confirm('Delete this skill? This cannot be undone.')) return;
    await api('/skills/' + id, { method: 'DELETE' });
    renderView();
  }

  async function editSkill(id) {
    var data = await api('/skills/' + id);
    if (!data.skill) return;
    var s = data.skill;

    // Create an edit overlay
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    var panel = document.createElement('div');
    panel.style.cssText = 'background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:24px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;';
    panel.innerHTML =
      '<div style="font-size:15px;font-weight:600;margin-bottom:16px;">Edit Skill: ' + escapeHtml(s.name) + '</div>' +
      '<div class="field"><label>Name</label><input type="text" id="editSkillName" value="' + escapeHtml(s.name) + '"></div>' +
      '<div class="field"><label>Description</label><input type="text" id="editSkillDesc" value="' + escapeHtml(s.description) + '"></div>' +
      '<div class="field"><label>Instructions</label><textarea id="editSkillInstructions" rows="8">' + escapeHtml(s.instructions) + '</textarea></div>' +
      '<div class="field"><label>Required Tools</label><input type="text" id="editSkillTools" value="' + escapeHtml((JSON.parse(s.required_tools || '[]')).join(', ')) + '"></div>' +
      '<div style="display:flex;gap:8px;margin-top:16px;">' +
        '<button class="btn" id="editSkillSave">Save</button>' +
        '<button class="btn" id="editSkillCancel">Cancel</button>' +
      '</div>' +
      '<div id="editSkillMsg" class="success-text"></div>';
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    document.getElementById('editSkillCancel').onclick = function() { overlay.remove(); };
    document.getElementById('editSkillSave').onclick = async function() {
      var name = document.getElementById('editSkillName').value.trim();
      var desc = document.getElementById('editSkillDesc').value.trim();
      var instructions = document.getElementById('editSkillInstructions').value.trim();
      var toolsStr = document.getElementById('editSkillTools').value.trim();
      var required_tools = toolsStr ? toolsStr.split(',').map(function(t) { return t.trim(); }).filter(Boolean) : [];
      var editMsg = document.getElementById('editSkillMsg');
      var res = await api('/skills/' + id, { method: 'PUT', body: JSON.stringify({ name, description: desc, instructions, required_tools }) });
      if (res.success) {
        editMsg.textContent = 'Saved.';
        setTimeout(function() { overlay.remove(); renderView(); }, 800);
      } else {
        editMsg.textContent = 'Error: ' + (res.error || 'Unknown');
      }
    };
  }

  async function renderPreferencesTab(container) {
    var data = await api('/settings/preferences');
    var prefs = data.preferences || [];
    var html = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;">Standing instructions Karna follows in every conversation. Add anything you want remembered permanently.</div>';
    if (prefs.length === 0) {
      html += '<div style="color:var(--text-muted);font-size:13px;margin-bottom:16px;">No preferences yet.</div>';
    }
    for (var i = 0; i < prefs.length; i++) {
      var p = prefs[i];
      html += '<div class="item-card pref-item" data-pref-id="' + p.id + '" style="margin-bottom:8px;">' +
        '<div class="pref-view" style="display:flex;align-items:flex-start;gap:8px;">' +
        '<div style="flex:1;font-size:13px;line-height:1.5;white-space:pre-wrap;word-break:break-word;">' + escapeHtml(p.content) + '</div>' +
        '<div style="display:flex;gap:4px;flex-shrink:0;">' +
        '<button class="btn btn-small" onclick="editPref(' + p.id + ')" title="Edit" style="padding:3px 8px;">&#9998;</button>' +
        '<button class="btn btn-small btn-danger" onclick="deletePref(' + p.id + ')" title="Delete" style="padding:3px 8px;">&#215;</button>' +
        '</div></div>' +
        '<div class="pref-edit" style="display:none;">' +
        '<textarea style="width:100%;min-height:80px;background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px;font-size:13px;resize:vertical;box-sizing:border-box;">' + escapeHtml(p.content) + '</textarea>' +
        '<div style="display:flex;gap:6px;margin-top:6px;justify-content:flex-end;">' +
        '<button class="btn btn-small" onclick="cancelEditPref(' + p.id + ')">Cancel</button>' +
        '<button class="btn btn-small btn-primary" onclick="savePref(' + p.id + ')">Save</button>' +
        '</div></div>' +
        '</div>';
    }
    html += '<div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border);">' +
      '<textarea id="newPrefInput" placeholder="e.g. Always check Outlook for meetings" style="width:100%;min-height:72px;background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px;font-size:13px;resize:vertical;box-sizing:border-box;"></textarea>' +
      '<button class="btn btn-primary" style="margin-top:8px;width:100%;" onclick="addPref()">Add Preference</button>' +
      '</div>';
    container.innerHTML = html;
  }
  window.editPref = function(id) {
    var card = document.querySelector('[data-pref-id="' + id + '"]');
    if (!card) return;
    card.querySelector('.pref-view').style.display = 'none';
    card.querySelector('.pref-edit').style.display = 'block';
    card.querySelector('textarea').focus();
  };
  window.cancelEditPref = function(id) {
    var card = document.querySelector('[data-pref-id="' + id + '"]');
    if (!card) return;
    card.querySelector('.pref-view').style.display = 'flex';
    card.querySelector('.pref-edit').style.display = 'none';
  };
  window.savePref = async function(id) {
    var card = document.querySelector('[data-pref-id="' + id + '"]');
    if (!card) return;
    var content = card.querySelector('.pref-edit textarea').value.trim();
    if (!content) return;
    await api('/settings/preferences/' + id, {method:'PUT', body:JSON.stringify({content})});
    renderView();
  };
  window.deletePref = async function(id) {
    await api('/settings/preferences/' + id, {method:'DELETE'});
    renderView();
  };
  window.addPref = async function() {
    var inp = document.getElementById('newPrefInput');
    var content = inp ? inp.value.trim() : '';
    if (!content) return;
    await api('/settings/preferences', {method:'POST', body:JSON.stringify({content})});
    renderView();
  };

  // === Health Dashboard Tab ===
  async function renderHealthTab(container) {
    container.innerHTML = '<div style="padding:16px;color:var(--text-muted);font-size:13px;">Loading health metrics...</div>';
    try {
      var data = await api('/system/health/tools');
      if (data.error) { container.innerHTML = '<div style="color:var(--danger);padding:16px;font-size:13px;">Error: ' + escapeHtml(data.error) + '</div>'; return; }

      var html = '<div style="padding:16px;">';
      html += '<div style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;">Tool Execution (24h)</div>';

      // Tool stats table
      if (data.tool_stats && data.tool_stats.length > 0) {
        html += '<div style="overflow-x:auto;margin-bottom:20px;"><table style="width:100%;font-size:12px;border-collapse:collapse;">';
        html += '<tr style="border-bottom:1px solid var(--border);"><th style="text-align:left;padding:6px 8px;color:var(--text-muted);">Tool</th><th style="padding:6px 4px;color:var(--text-muted);">Calls</th><th style="padding:6px 4px;color:var(--text-muted);">OK</th><th style="padding:6px 4px;color:var(--text-muted);">Fail</th><th style="padding:6px 4px;color:var(--text-muted);">Avg ms</th></tr>';
        data.tool_stats.forEach(function(t) {
          var rate = t.total > 0 ? Math.round(t.successes / t.total * 100) : 0;
          var rateColor = rate >= 90 ? 'var(--success)' : rate >= 70 ? 'var(--warning)' : 'var(--danger)';
          html += '<tr style="border-bottom:1px solid var(--border);">';
          html += '<td style="padding:6px 8px;font-family:var(--font-mono);font-size:11px;">' + escapeHtml(t.tool_name) + '</td>';
          html += '<td style="padding:6px 4px;text-align:center;">' + t.total + '</td>';
          html += '<td style="padding:6px 4px;text-align:center;color:var(--success);">' + t.successes + '</td>';
          html += '<td style="padding:6px 4px;text-align:center;color:' + (t.failures > 0 ? 'var(--danger)' : 'var(--text-muted)') + ';">' + t.failures + '</td>';
          html += '<td style="padding:6px 4px;text-align:center;color:' + rateColor + ';">' + (t.avg_latency_ms || 0) + '</td>';
          html += '</tr>';
        });
        html += '</table></div>';
      } else {
        html += '<div style="color:var(--text-muted);font-size:12px;margin-bottom:20px;">No tool calls in last 24h</div>';
      }

      // Enforcement section
      html += '<div style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">Enforcement Triggers</div>';
      if (data.enforcement && data.enforcement.triggers && data.enforcement.triggers.length > 0) {
        html += '<div style="margin-bottom:12px;">';
        data.enforcement.triggers.forEach(function(e) {
          html += '<div style="padding:6px 8px;margin-bottom:4px;background:rgba(192,57,43,0.12);border-radius:6px;font-size:12px;">';
          html += '<span style="color:var(--warning);">&#9888;</span> <strong>' + escapeHtml(e.agent_type || 'unknown') + '</strong> via ' + escapeHtml(e.provider_name || 'unknown') + ' — ' + e.triggers + ' narration(s)';
          html += '</div>';
        });
        html += '</div>';
      } else {
        html += '<div style="color:var(--success);font-size:12px;margin-bottom:16px;">&#10003; No enforcement triggers — all agents called tools correctly</div>';
      }

      // Retry stats
      var retries = data.enforcement && data.enforcement.retry_results ? data.enforcement.retry_results : {};
      if (retries.total_retries > 0) {
        var retryRate = Math.round(retries.successful_retries / retries.total_retries * 100);
        html += '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:16px;">Enforcement retry success: <strong style="color:' + (retryRate >= 80 ? 'var(--success)' : 'var(--warning)') + ';">' + retryRate + '%</strong> (' + retries.successful_retries + '/' + retries.total_retries + ')</div>';
      }

      // Provider performance
      html += '<div style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-top:8px;margin-bottom:8px;">Provider Performance</div>';
      if (data.providers && data.providers.length > 0) {
        data.providers.forEach(function(p) {
          var pRate = p.calls > 0 ? Math.round(p.successes / p.calls * 100) : 0;
          html += '<div style="padding:6px 8px;margin-bottom:4px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:12px;display:flex;justify-content:space-between;">';
          html += '<span>' + escapeHtml(p.provider_name || '?') + ' → ' + escapeHtml(p.agent_type || '?') + '</span>';
          html += '<span>' + p.calls + ' calls, ' + pRate + '% ok, ' + (p.avg_latency_ms || 0) + 'ms avg</span>';
          html += '</div>';
        });
      } else {
        html += '<div style="color:var(--text-muted);font-size:12px;margin-bottom:16px;">No provider data</div>';
      }

      // Cron section
      html += '<div style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-top:16px;margin-bottom:8px;">Cron Executions</div>';
      if (data.cron && data.cron.executions && data.cron.executions.length > 0) {
        data.cron.executions.forEach(function(cx) {
          var ico = cx.status === 'completed' ? '&#10003;' : cx.status === 'failed' ? '&#10007;' : '&#8987;';
          var col = cx.status === 'completed' ? 'var(--success)' : cx.status === 'failed' ? 'var(--danger)' : 'var(--warning)';
          html += '<div style="font-size:12px;margin-bottom:2px;"><span style="color:' + col + ';">' + ico + '</span> ' + escapeHtml(cx.status) + ': ' + cx.count + '</div>';
        });
      } else {
        html += '<div style="color:var(--text-muted);font-size:12px;">No cron executions in last 24h</div>';
      }

      // Cron warnings
      if (data.cron && data.cron.warnings && data.cron.warnings.length > 0) {
        html += '<div style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--warning);margin-top:12px;margin-bottom:8px;">Cron Warnings</div>';
        data.cron.warnings.forEach(function(w) {
          html += '<div style="padding:6px 8px;margin-bottom:4px;background:rgba(201,137,63,0.1);border-radius:6px;font-size:11px;color:var(--text-secondary);">' + escapeHtml(w.message) + '</div>';
        });
      }

      html += '</div>';
      container.innerHTML = html;
    } catch(err) {
      container.innerHTML = '<div style="color:var(--danger);padding:16px;font-size:13px;">Failed to load health metrics: ' + (err.message || 'Unknown') + '</div>';
    }
  }

  async function renderErrorsTab(container) {
    var data = await api('/settings/errors');
    var errors = data.errors || [];
    if (errors.length === 0) { container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">No errors. System clean.</div>'; return; }
    var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span style="font-size:11px;color:var(--text-muted);">' + errors.length + ' error(s)</span><button class="btn btn-small" onclick="clearErrors()">Clear All</button></div>';
    for (var i = 0; i < errors.length; i++) {
      var err = errors[i];
      var srcColor = err.source==='llm'?'#f56565':err.source==='cron'?'#f6ad55':'#a0aec0';
      html += '<div class="item-card" style="margin-bottom:8px"><div class="item-card-header"><span class="item-card-title" style="font-size:12px;">' + escapeHtml(err.error_type) + '</span>' +
        '<div style="display:flex;gap:6px;align-items:center;"><span class="tag" style="color:' + srcColor + ';">' + escapeHtml(err.source) + '</span><span class="tag" style="font-size:10px;">' + (err.created_at||'').split('T')[0] + '</span></div></div>' +
        '<div class="item-card-body" style="font-size:12px;font-family:var(--font-mono);word-break:break-all;">' + escapeHtml(err.message.substring(0,200)) + '</div></div>';
    }
    container.innerHTML = html;
  }
  async function clearErrors() { await api('/settings/errors', {method:'DELETE'}); renderView(); }

  // === Init ===
  // Global error boundary — prevents silent blank white page on unhandled JS errors
  window.onerror = function(msg, src, line, col, err) {
    var app = document.getElementById('app');
    if (app && app.innerHTML.trim() === '') {
      app.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Georgia,serif;color:#5a5248;flex-direction:column;gap:12px;">' +
        '<div style="font-size:18px;">Something went wrong</div>' +
        '<div style="font-size:13px;color:#8a7e72;">Try refreshing the page</div>' +
        '<button onclick="location.reload()" style="margin-top:8px;padding:8px 20px;background:#4f86c6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;">Refresh</button>' +
        '</div>';
    }
    return false;
  };
  loadSession();
  if (state.session) {
    api('/auth/me').then(function(data) {
      if (data.error) { clearSession(); }
      render();
    }).catch(function(err) {
      console.error('Auth error:', err);
      clearSession();
      render();
    });
  } else { render(); }
  document.onkeydown = function(e) { if (e.key === 'Escape') toggleOverlay(null); };

  // Handle iOS keyboard — adjust input area
  if ('visualViewport' in window) {
    window.visualViewport.addEventListener('resize', function() {
      var inputArea = document.querySelector('.input-area');
      if (inputArea) {
        var offset = window.innerHeight - window.visualViewport.height;
        inputArea.style.paddingBottom = (offset > 0 ? offset + 8 : 16) + 'px';
      }
    });
  }

  // ============================================================
  // DOCUMENTS VIEW FUNCTIONS
  // ============================================================
  window.renderDocumentsView = async function(container) {
    container.innerHTML = '<div class="documents-container">' +
      '<div class="documents-header">' +
        '<div class="documents-title">&#128196; Document Intelligence</div>' +
        '<button class="btn btn-small" onclick="showDocumentUpload()">Upload Document</button>' +
      '</div>' +
      '<div class="documents-search">' +
        '<input type="text" id="docSearchInput" placeholder="Search across all documents..." onkeypress="if(event.key===\\'Enter\\')searchDocuments()">' +
        '<button class="btn" onclick="searchDocuments()">Search</button>' +
      '</div>' +
      '<div class="documents-upload-area" id="uploadArea" style="display:none;">' +
        '<div class="document-icon">&#128229;</div>' +
        '<p style="color:var(--text-muted);margin:8px 0;">Drop files here or click to browse</p>' +
        '<p style="color:var(--text-muted);font-size:12px;">PDF, Excel, Word (Max 50MB) - Auto-deleted in 30 min</p>' +
        '<input type="file" id="docFileInput" style="display:none" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*" onchange="handleDocUpload(this)">' +
        '<button class="documents-upload-btn" onclick="document.getElementById(\\'docFileInput\\').click()">Select File</button>' +
        '<div id="uploadProgress" style="margin-top:16px;display:none;">' +
          '<div style="background:rgba(255,255,255,0.08);height:3px;border-radius:2px;overflow:hidden;">' +
            '<div id="uploadBar" style="background:var(--accent);height:100%;width:0%;transition:width 0.3s;"></div>' +
          '</div>' +
          '<p id="uploadStatus" style="font-size:12px;color:var(--text-muted);margin-top:8px;">Uploading...</p>' +
        '</div>' +
      '</div>' +
      '<div id="documentsList" class="documents-list"><p style="color:var(--text-muted);text-align:center;">Loading documents...</p></div>' +
      '<div id="documentChatArea" class="documents-chat-area" style="display:none;">' +
        '<div id="chatMessages" class="documents-chat-messages"></div>' +
        '<div class="documents-chat-input">' +
          '<input type="text" id="docChatInput" placeholder="Ask about your documents..." onkeypress="if(event.key===\\'Enter\\')sendDocChat()">' +
          '<button class="btn" onclick="sendDocChat()">Send</button>' +
        '</div>' +
      '</div>' +
    '</div>';
    
    await loadDocumentsList();
  };

  window.showDocumentUpload = function() {
    var area = document.getElementById('uploadArea');
    area.style.display = area.style.display === 'none' ? 'block' : 'none';
  };

  window.handleDocUpload = async function(input) {
    var file = input.files[0];
    if (!file) return;
    
    var progress = document.getElementById('uploadProgress');
    var bar = document.getElementById('uploadBar');
    var status = document.getElementById('uploadStatus');
    progress.style.display = 'block';
    bar.style.width = '20%';
    
    var formData = new FormData();
    formData.append('file', file);
    
    try {
      status.textContent = 'Uploading...';
      bar.style.width = '50%';
      
      var response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': 'Bearer ' + (state.session ? state.session.id : '') }
      });
      
      bar.style.width = '100%';
      
      if (response.ok) {
        var result = await response.json();
        status.textContent = 'Upload complete! Processing...';
        status.style.color = 'var(--success)';
        showToast('Document uploaded. Processing...', 'success');
        setTimeout(function() {
          document.getElementById('uploadArea').style.display = 'none';
          document.getElementById('docFileInput').value = '';
          progress.style.display = 'none';
          bar.style.width = '0%';
          loadDocumentsList();
        }, 2000);
      } else {
        var err = await response.json();
        throw new Error(err.error || 'Upload failed');
      }
    } catch (error) {
      status.textContent = 'Upload failed: ' + error.message;
      status.style.color = 'var(--danger)';
      showToast(error.message, 'error');
    }
  };

  window.loadDocumentsList = async function() {
    var list = document.getElementById('documentsList');
    if (!list) return;
    
    try {
      var response = await api('/documents', { method: 'GET' });
      if (response.error) throw new Error(response.error);
      
      if (!response.documents || response.documents.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px;">' +
          'No documents yet. Upload PDFs, Excel, or Word files to analyze them with AI.<br><br>' +
          '<span style="font-size:12px;">Files auto-delete after 30 minutes, but extracted data remains.</span></p>';
        return;
      }
      
      var html = '';
      response.documents.forEach(function(doc) {
        var icon = doc.file_type.includes('pdf') ? '&#128196;' : 
                   doc.file_type.includes('excel') || doc.file_type.includes('sheet') ? '&#128197;' :
                   doc.file_type.includes('word') ? '&#128221;' : '&#128196;';
        var statusClass = doc.status;
        var statusText = doc.status === 'processing' ? 'Processing...' : 
                        doc.status === 'completed' ? 'Ready' : 'Failed';
        
        html += '<div class="document-card">' +
          '<div class="document-icon">' + icon + '</div>' +
          '<div class="document-info">' +
            '<div class="document-name">' + escapeHtml(doc.filename) + 
              '<span class="status-badge ' + statusClass + '">' + statusText + '</span></div>' +
            '<div class="document-meta">' + formatFileSize(doc.file_size) + ' • ' + 
              new Date(doc.created_at).toLocaleString() + ' • Expires: ' + new Date(doc.expires_at).toLocaleTimeString() + '</div>';
        
        if (doc.summary && doc.status === 'completed') {
          html += '<div class="document-summary">' + escapeHtml(doc.summary.substring(0, 200)) + '...</div>';
        }
        
        html += '<div class="document-actions">';
        if (doc.status === 'completed') {
          html += '<button class="document-btn" onclick="viewDocumentSummary(\\'" + doc.id + "\\')">Summary</button>' +
            '<button class="document-btn" onclick="chatWithDocument(\\'" + doc.id + "\\')">Chat</button>' +
            '<button class="document-btn" onclick="extractKeyTerms(\\'" + doc.id + "\\')">Key Terms</button>';
        }
        html += '<button class="document-btn" onclick="deleteDocument(\\'" + doc.id + "\\')">Delete</button>' +
          '</div></div></div>';
      });
      
      list.innerHTML = html;
    } catch (error) {
      list.innerHTML = '<p style="color:var(--danger);text-align:center;">Error loading documents: ' + error.message + '</p>';
    }
  };

  window.viewDocumentSummary = async function(docId) {
    try {
      var response = await api('/documents/' + docId, { method: 'GET' });
      if (response.error) throw new Error(response.error);
      
      var summaryHtml = '<div class="documents-container">' +
        '<div class="documents-header">' +
          '<div class="documents-title">&#128196; ' + escapeHtml(response.filename) + '</div>' +
          '<button class="btn btn-small" onclick="state.view=\\'documents\\';renderView();">&larr; Back</button>' +
        '</div>' +
        '<div class="documents-comparison">' +
          '<h3 style="margin-bottom:12px;">Summary</h3>' +
          '<div style="white-space:pre-wrap;color:var(--text-secondary);line-height:1.7;">' + escapeHtml(response.summary || 'No summary available') + '</div>' +
        '</div>';
      
      if (response.key_terms && Object.keys(response.key_terms).length > 0) {
        summaryHtml += '<div class="documents-comparison">' +
          '<h3 style="margin-bottom:12px;">Key Terms</h3>' +
          '<div style="display:grid;gap:8px;">';
        for (var key in response.key_terms) {
          summaryHtml += '<div><strong>' + escapeHtml(key) + ':</strong> ' + escapeHtml(response.key_terms[key]) + '</div>';
        }
        summaryHtml += '</div></div>';
      }
      
      if (response.metadata) {
        summaryHtml += '<div class="documents-comparison">' +
          '<h3 style="margin-bottom:12px;">Document Info</h3>' +
          '<div>Words: ' + (response.metadata.wordCount || 'N/A') + '</div>' +
          '<div>Processed: ' + new Date(response.metadata.processedAt).toLocaleString() + '</div>' +
        '</div>';
      }
      
      summaryHtml += '</div>';
      
      var mc = document.getElementById('mainContent');
      if (mc) mc.innerHTML = summaryHtml;
    } catch (error) {
      showToast('Error: ' + error.message, 'error');
    }
  };

  window.chatWithDocument = async function(docId) {
    state.activeDocId = docId;
    state.docChatHistory = [];
    
    var chatArea = document.getElementById('documentChatArea');
    var chatMessages = document.getElementById('chatMessages');
    chatArea.style.display = 'block';
    chatMessages.innerHTML = '<div class="documents-chat-msg assistant">Ask me anything about this document. I\\'ll search through it to find answers.</div>';
  };

  window.sendDocChat = async function() {
    var input = document.getElementById('docChatInput');
    var question = input.value.trim();
    if (!question) return;
    
    input.value = '';
    var messages = document.getElementById('chatMessages');
    messages.innerHTML += '<div class="documents-chat-msg user">' + escapeHtml(question) + '</div>';
    messages.scrollTop = messages.scrollHeight;
    
    try {
      var response = await api('/documents/chat', {
        method: 'POST',
        body: JSON.stringify({
          question: question,
          document_ids: state.activeDocId ? [state.activeDocId] : null,
          session_id: state.docSessionId || null
        })
      });
      
      if (response.session_id) state.docSessionId = response.session_id;
      
      messages.innerHTML += '<div class="documents-chat-msg assistant">' + escapeHtml(response.answer) + '</div>';
      messages.scrollTop = messages.scrollHeight;
    } catch (error) {
      messages.innerHTML += '<div class="documents-chat-msg assistant" style="color:var(--danger);">Error: ' + escapeHtml(error.message) + '</div>';
    }
  };

  window.extractKeyTerms = async function(docId) {
    try {
      var response = await api('/documents/' + docId, { method: 'GET' });
      if (response.error) throw new Error(response.error);
      
      var terms = response.key_terms || {};
      var html = '<h3 style="margin-bottom:12px;">Key Terms from ' + escapeHtml(response.filename) + '</h3>';
      
      if (Object.keys(terms).length === 0) {
        html += '<p style="color:var(--text-muted);">No key terms extracted.</p>';
      } else {
        html += '<div style="display:grid;gap:12px;">';
        for (var key in terms) {
          html += '<div style="background:rgba(255,255,255,0.04);padding:12px;border-radius:8px;">' +
            '<strong style="color:var(--accent);">' + escapeHtml(key) + '</strong>' +
            '<div style="color:var(--text-secondary);margin-top:4px;">' + escapeHtml(terms[key]) + '</div>' +
          '</div>';
        }
        html += '</div>';
      }
      
      var mc = document.getElementById('mainContent');
      if (mc) {
        mc.innerHTML = '<div class="documents-container">' +
          '<div class="documents-header">' +
            '<div class="documents-title">&#128221; Key Terms</div>' +
            '<button class="btn btn-small" onclick="state.view=\\'documents\\';renderView();">&larr; Back</button>' +
          '</div>' +
          '<div class="documents-comparison">' + html + '</div>' +
        '</div>';
      }
    } catch (error) {
      showToast('Error: ' + error.message, 'error');
    }
  };

  window.searchDocuments = async function() {
    var query = document.getElementById('docSearchInput').value.trim();
    if (!query) return;
    
    try {
      showToast('Searching documents...', 'info');
      var response = await api('/documents/search', {
        method: 'POST',
        body: JSON.stringify({ query: query })
      });
      
      if (response.error) throw new Error(response.error);
      
      var html = '<div class="documents-container">' +
        '<div class="documents-header">' +
          '<div class="documents-title">&#128269; Search Results: ' + escapeHtml(query) + '</div>' +
          '<button class="btn btn-small" onclick="state.view=\\'documents\\';renderView();">&larr; Back</button>' +
        '</div>' +
        '<div class="documents-comparison">';
      
      if (!response.results || response.results.length === 0) {
        html += '<p style="color:var(--text-muted);">No relevant results found.</p>';
      } else {
        html += '<p style="margin-bottom:16px;">Found ' + response.results.length + ' relevant sections:</p>';
        response.results.forEach(function(result, i) {
          html += '<div style="background:rgba(255,255,255,0.04);padding:12px;border-radius:8px;margin-bottom:12px;">' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:8px;">' +
              '<strong style="color:var(--accent);">' + escapeHtml(result.filename) + '</strong>' +
              '<span style="font-size:12px;color:var(--text-muted);">Relevance: ' + (result.relevance_score * 100).toFixed(1) + '%</span>' +
            '</div>' +
            '<div style="color:var(--text-secondary);font-size:13px;line-height:1.6;">' + escapeHtml(result.chunk.substring(0, 300)) + '...</div>' +
          '</div>';
        });
      }
      
      html += '</div></div>';
      
      var mc = document.getElementById('mainContent');
      if (mc) mc.innerHTML = html;
    } catch (error) {
      showToast('Error: ' + error.message, 'error');
    }
  };

  window.deleteDocument = async function(docId) {
    if (!confirm('Delete this document? The extracted data will also be removed.')) return;
    
    try {
      var response = await api('/documents/' + docId, { method: 'DELETE' });
      if (response.error) throw new Error(response.error);
      
      showToast('Document deleted', 'success');
      loadDocumentsList();
    } catch (error) {
      showToast('Error: ' + error.message, 'error');
    }
  };

  window.compareDocuments = async function() {
    // Get selected documents
    var selected = [];
    document.querySelectorAll('.doc-checkbox:checked').forEach(function(cb) {
      selected.push(cb.value);
    });
    
    if (selected.length < 2) {
      showToast('Select at least 2 documents to compare', 'warning');
      return;
    }
    
    try {
      showToast('Comparing documents...', 'info');
      var response = await api('/documents/compare', {
        method: 'POST',
        body: JSON.stringify({ document_ids: selected, comparison_type: 'general' })
      });
      
      var html = '<div class="documents-container">' +
        '<div class="documents-header">' +
          '<div class="documents-title">&#128200; Document Comparison</div>' +
          '<button class="btn btn-small" onclick="state.view=\\'documents\\';renderView();">&larr; Back</button>' +
        '</div>' +
        '<div class="documents-comparison" style="white-space:pre-wrap;line-height:1.7;">' + escapeHtml(response.comparison) + '</div>' +
      '</div>';
      
      var mc = document.getElementById('mainContent');
      if (mc) mc.innerHTML = html;
    } catch (error) {
      showToast('Error: ' + error.message, 'error');
    }
  };

  window.formatFileSize = function(bytes) {
    if (bytes === 0) return '0 Bytes';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Drag and drop for documents
  window.setupDocDragDrop = function() {
    var area = document.getElementById('uploadArea');
    if (!area) return;
    
    area.ondragover = function(e) {
      e.preventDefault();
      area.classList.add('dragover');
    };
    area.ondragleave = function() {
      area.classList.remove('dragover');
    };
    area.ondrop = function(e) {
      e.preventDefault();
      area.classList.remove('dragover');
      var files = e.dataTransfer.files;
      if (files.length > 0) {
        handleDocUpload({ files: files });
      }
    };
  };

  // Auto-refresh documents list every 10 seconds when processing
  setInterval(function() {
    if (state.view === 'documents') {
      var hasProcessing = document.querySelector('.status-badge.processing');
      if (hasProcessing) loadDocumentsList();
    }
  }, 10000);

  <\/script>
</body>
</html>`}const Kt="AES-GCM",yn=256;async function Wa(t){const e=new TextEncoder,a=await crypto.subtle.importKey("raw",e.encode(t.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:e.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},a,{name:Kt,length:yn},!1,["encrypt","decrypt"])}async function Yt(t,e){const a=await Wa(e),r=crypto.getRandomValues(new Uint8Array(12)),n=new TextEncoder,s=await crypto.subtle.encrypt({name:Kt,iv:r},a,n.encode(t)),i=new Uint8Array(r.length+new Uint8Array(s).length);return i.set(r),i.set(new Uint8Array(s),r.length),btoa(String.fromCharCode(...i))}async function X(t,e){const a=await Wa(e),r=new Uint8Array(atob(t).split("").map(o=>o.charCodeAt(0))),n=r.slice(0,12),s=r.slice(12),i=await crypto.subtle.decrypt({name:Kt,iv:n},a,s);return new TextDecoder().decode(i)}async function Ot(t){const a=new TextEncoder().encode(t+"karna-pin-salt"),r=await crypto.subtle.digest("SHA-256",a);return btoa(String.fromCharCode(...new Uint8Array(r)))}async function qa(t,e){return await Ot(t)===e}const Jt=Object.freeze(Object.defineProperty({__proto__:null,decrypt:X,encrypt:Yt,hashPin:Ot,verifyPin:qa},Symbol.toStringTag,{value:"Module"})),Ae=new ke;Ae.get("/check",async t=>{const e=await t.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return t.json({hasUsers:((e==null?void 0:e.cnt)||0)>0})});Ae.post("/setup",async t=>{const{username:e,name:a,pin:r,personality_prompt:n,timezone:s}=await t.req.json();if(!e||!a||!r)return t.json({error:"Username, name, and PIN are required"},400);if(r.length<4)return t.json({error:"PIN must be at least 4 characters"},400);if(await t.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(e).first())return t.json({error:"Username already taken"},409);const o=await Ot(r);await t.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(e,a,o,n||"",s||"Asia/Kolkata").run();const l=await t.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(e).first(),c=crypto.randomUUID(),d=new Date(Date.now()+10080*60*1e3).toISOString();return await t.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(c,l.id,"web",d).run(),t.json({success:!0,sessionId:c,user:{id:l.id,username:l.username,name:l.name}})});Ae.post("/login",async t=>{const{username:e,pin:a}=await t.req.json();if(!e||!a)return t.json({error:"Username and PIN required"},400);const r=await t.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(e).first();if(!r)return t.json({error:"User not found"},404);if(!await qa(a,r.pin_hash))return t.json({error:"Invalid PIN"},401);const s=crypto.randomUUID(),i=new Date(Date.now()+10080*60*1e3).toISOString();return await t.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(s,r.id,"web",i).run(),t.json({success:!0,sessionId:s,user:{id:r.id,username:r.username,name:r.name}})});Ae.post("/logout",async t=>{var a;const e=(a=t.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");return e&&await t.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(e).run(),t.json({success:!0})});Ae.get("/users/hints",async t=>{const a=((await t.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(r=>{var n;return{username:r.username,name_hint:r.name.split(" ")[0],created:((n=r.created_at)==null?void 0:n.split(" ")[0])||""}});return t.json({users:a,count:a.length})});Ae.post("/reset-pin",async t=>{var o;const{username:e,name:a,new_pin:r}=await t.req.json();if(!e||!a||!r)return t.json({error:"Username, display name, and new PIN are required"},400);if(r.length<4)return t.json({error:"PIN must be at least 4 characters"},400);const n=await t.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(e).first();if(!n)return t.json({error:"User not found"},404);if(n.name.toLowerCase().trim()!==a.toLowerCase().trim())return t.json({error:"Display name does not match. This is required for identity verification."},403);const s=await Ot(r);await t.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,n.id).run();const i=await t.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(n.id).run();return await t.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(n.id).run(),t.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((o=i.meta)==null?void 0:o.changes)||0})});Ae.get("/me",async t=>{var r;const e=(r=t.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!e)return t.json({error:"No session"},401);const a=await t.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();return a?t.json({user:{id:a.uid,username:a.username,name:a.name,role:a.role,timezone:a.timezone}}):t.json({error:"Invalid or expired session"},401)});const pt={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},vn=55e3;function za(t,e){return Promise.race([t,new Promise((a,r)=>setTimeout(()=>r(new Error(`LLM timeout: ${e} did not respond within 25 seconds. Try again or switch providers in Settings → Keys.`)),vn))])}async function U(t,e,a,r,n,s={}){try{await t.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(e,a,r,n,JSON.stringify(s)).run()}catch(i){console.error("Failed to log error:",i)}}async function $t(t,e,a,r,n,s){try{const i=`provider_alert:${r}:${a}`;if(await t.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(e,i).first())return;await U(t,e,"provider_alert",i,`${r} failed: ${s.substring(0,200)}`,{alertType:a,failedProvider:r,fallbackProvider:n});let l;a==="all_providers_down"?l=`🚨 All LLM providers failed

Last error from ${r}: ${la(s)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:l=`⚠️ LLM Provider Issue

${r}: ${la(s)}
Switched to: ${n}

Check your ${r} API credit balance or key.`;const{decrypt:c}=await Promise.resolve().then(()=>Jt),d=await t.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(e).first();if(!(d!=null&&d.telegram_chat_id))return;const p=await t.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(e).first();if(!p)return;const h=await c(p.encrypted_value,d.pin_hash);await fetch(`https://api.telegram.org/bot${h}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d.telegram_chat_id,text:l})})}catch(i){console.error("Failed to send provider alert:",i)}}function la(t){return t.includes("credit balance")||t.includes("insufficient")||t.includes("402")?"Credits exhausted or balance too low":t.includes("429")||t.includes("rate_limit")||t.includes("quota")?"Rate limit / quota exceeded":t.includes("401")||t.includes("authentication")||t.includes("invalid")&&t.includes("key")?"API key invalid or expired":t.includes("403")?"Access denied (key may lack permissions)":t.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":t.includes("properties field not found")?"Schema compatibility issue":"API error"}class Ka{constructor(e,a="claude-sonnet-4-20250514",r="https://api.anthropic.com",n="anthropic"){O(this,"name");O(this,"apiKey");O(this,"model");O(this,"apiBase");this.apiKey=e,this.model=a,this.apiBase=r,this.name=n}async chat(e,a){var d,p,h,w;const r=e.find(f=>f.role==="system"),n=e.filter(f=>f.role!=="system"),s={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:n.map(f=>({role:f.role,content:f.content}))};r&&(s.system=r.content),a!=null&&a.tools&&a.tools.length>0&&(s.tools=a.tools.map(f=>({name:f.name,description:f.description,input_schema:f.parameters})));const i=await za(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)}),this.name);if(!i.ok){const f=await i.text();throw new Error(this.name+" API error "+i.status+": "+f)}const o=await i.json(),l=((d=o.content)==null?void 0:d.filter(f=>f.type==="text"))||[],c=((p=o.content)==null?void 0:p.filter(f=>f.type==="tool_use"))||[];return{content:l.map(f=>f.text).join(`
`),toolCalls:c.map(f=>({id:f.id,name:f.name,arguments:f.input})),usage:{promptTokens:((h=o.usage)==null?void 0:h.input_tokens)||0,completionTokens:((w=o.usage)==null?void 0:w.output_tokens)||0}}}async streamChat(e,a){const r=e.find(c=>c.role==="system"),n=e.filter(c=>c.role!=="system"),s={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:n.map(c=>({role:c.role,content:c.content}))};r&&(s.system=r.content);const i=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)});if(!i.ok){const c=await i.text();throw new Error(this.name+" stream error "+i.status+": "+c)}const o=i.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(c){var f;const{done:d,value:p}=await o.read();if(d){c.close();return}const w=l.decode(p,{stream:!0}).split(`
`);for(const x of w)if(x.startsWith("data: ")){const y=x.slice(6);if(y==="[DONE]")continue;try{const T=JSON.parse(y);T.type==="content_block_delta"&&((f=T.delta)!=null&&f.text)&&c.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:T.delta.text})+`

`))}catch{}}}})}}function wn(t){const e={},a=t||{};if(e.type=a.type||"object",e.type==="object"){const r=a.properties;if(r&&typeof r=="object"&&Object.keys(r).length>0){const n={};for(const[s,i]of Object.entries(r))i&&typeof i=="object"?n[s]=Gt(i):n[s]=i;e.properties=n}else e.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(a.required)?e.required=a.required:e.required=[]}return a.description&&(e.description=a.description),e}function Gt(t){const e={...t};if(e.type||(e.type="string"),e.type==="object"){const a=e.properties;if(a&&typeof a=="object"&&Object.keys(a).length>0){const r={};for(const[n,s]of Object.entries(a))s&&typeof s=="object"?r[n]=Gt(s):r[n]=s;e.properties=r}else e.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(e.required)||(e.required=[])}return e.type==="array"&&e.items?typeof e.items=="object"&&(e.items=Gt(e.items)):e.type==="array"&&!e.items&&(e.items={type:"string"}),e}class Ya{constructor(e,a,r,n){O(this,"name");O(this,"apiKey");O(this,"model");O(this,"apiBase");this.apiKey=e,this.model=a,this.apiBase=r.replace(/\/+$/,""),this.name=n}async chat(e,a){var l,c,d,p,h,w;const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:e.map(f=>({role:f.role,content:f.content}))},n=this.apiBase.includes("routellm.abacus.ai");if(a!=null&&a.tools&&a.tools.length>0&&n)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");a!=null&&a.tools&&a.tools.length>0&&(r.tools=a.tools.map(f=>({type:"function",function:{name:f.name,description:f.description,parameters:wn(f.parameters||{})}})));const s=await za(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)}),this.name);if(!s.ok){const f=await s.text();throw new Error(this.name+" API error "+s.status+": "+f)}const i=await s.json(),o=(l=i.choices)==null?void 0:l[0];return{content:((c=o==null?void 0:o.message)==null?void 0:c.content)||"",toolCalls:(p=(d=o==null?void 0:o.message)==null?void 0:d.tool_calls)==null?void 0:p.map(f=>({id:f.id,name:f.function.name,arguments:(()=>{try{return typeof f.function.arguments=="string"?JSON.parse(f.function.arguments||"{}"):f.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((h=i.usage)==null?void 0:h.prompt_tokens)||0,completionTokens:((w=i.usage)==null?void 0:w.completion_tokens)||0}}}async streamChat(e,a){const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:e.map(o=>({role:o.role,content:o.content}))},n=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)});if(!n.ok){const o=await n.text();throw new Error(this.name+" stream error "+n.status+": "+o)}const s=n.body.getReader(),i=new TextDecoder;return new ReadableStream({async pull(o){var h,w,f;const{done:l,value:c}=await s.read();if(l){o.close();return}const p=i.decode(c,{stream:!0}).split(`
`);for(const x of p)if(x.startsWith("data: ")){const y=x.slice(6);if(y==="[DONE]")continue;try{const E=(f=(w=(h=JSON.parse(y).choices)==null?void 0:h[0])==null?void 0:w.delta)==null?void 0:f.content;E&&o.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:E})+`

`))}catch{}}}})}}function Ft(t,e,a,r){const n=pt[t];if(!n)throw new Error(`Unknown LLM provider: ${t}`);const s=r||n.defaultModel;return n.apiFormat==="anthropic"?new Ka(e,s,n.apiBase,a):new Ya(e,s,n.apiBase,a)}class Ja{constructor(){O(this,"errorLog",new Map);O(this,"usageLog",new Map)}async pickProvider(e){const a=Date.now(),r=e.filter(n=>{const s=this.errorLog.get(n);return s?s.cooldownUntil<=a:!0});return r.length>0?r[0]:null}async recordUsage(e,a){const r=this.usageLog.get(e)||{tokens:0,requests:0};this.usageLog.set(e,{tokens:r.tokens+a,requests:r.requests+1})}async recordError(e,a,r=5){this.errorLog.set(e,{error:a,cooldownUntil:Date.now()+r*60*1e3})}}const bn=["llm_slot_1","llm_slot_2","llm_slot_3"],_n=["anthropic","openai"];async function wt(t,e,a){const{decrypt:r}=await Promise.resolve().then(()=>Jt),n=new Ja,s=[];for(const p of bn){const h=await t.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(e,p).first();if(h)try{const w=await r(h.encrypted_value,a),f=JSON.parse(w);if(f.provider&&f.apiKey&&pt[f.provider]){const y=f.provider,T=Ft(f.provider,f.apiKey,y,f.model);s.push({name:y,provider:T})}}catch(w){console.error(`Failed to load ${p}:`,w)}}const i=new Set(s.map(p=>p.name));for(const p of _n){if(i.has(p))continue;const h=await t.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(e,p).first();if(h)try{const w=await r(h.encrypted_value,a);if(pt[p]){const x=Ft(p,w,p);s.push({name:p,provider:x})}}catch{console.error(`Failed to decrypt legacy ${p} key`)}}if(s.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const o=s.map(p=>p.name),l=await n.pickProvider(o);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:s[0].provider,rotation:n};const c=s.find(p=>p.name===l);return{provider:En(c.provider,s,n,t,e),rotation:n}}function En(t,e,a,r,n){const s=i=>i.includes("401")||i.includes("403")||i.includes("authentication")||i.includes("credit balance")||i.includes("invalid")&&i.includes("key")||i.includes("properties field not found")||i.includes("TOOLS_UNSUPPORTED");return e.length<=1?{name:t.name,async chat(i,o){try{return await t.chat(i,o)}catch(l){const c=l.message||"";throw s(c)&&!c.includes("TOOLS_UNSUPPORTED")&&$t(r,n,"all_providers_down",t.name,null,c),l}},async streamChat(i,o){return await t.streamChat(i,o)}}:{name:t.name,async chat(i,o){try{return await t.chat(i,o)}catch(l){const c=l.message||"";if(!s(c))throw l;const d=c.includes("TOOLS_UNSUPPORTED");console.warn(`Provider ${t.name} ${d?"tools unsupported":"auth/billing error"}, trying fallback...`),await a.recordError(t.name,c,d?1:1440);const p=e.filter(h=>h.name!==t.name);for(const h of p)try{const w=await h.provider.chat(i,o);return this.name=h.name,d||$t(r,n,"provider_switched",t.name,h.name,c),w}catch(w){const f=w.message||"";if(s(f)){await a.recordError(h.name,f,1440);continue}throw w}throw $t(r,n,"all_providers_down",t.name,null,c),new Error(`All LLM providers failed. Primary (${t.name}): ${c.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(i,o){return await t.streamChat(i,o)}}}const Je=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:Ka,OpenAICompatibleProvider:Ya,ProviderRotation:Ja,createProviderFromConfig:Ft,createRotatingProvider:wt,logError:U},Symbol.toStringTag,{value:"Module"})),Bt=20,Tn=2e3,xn=2e3,Va=4;function kn(t){return Math.ceil(t.length/Va)}function ca(t,e){const a=e*Va;return t.length<=a?t:t.slice(0,a)+`
[...truncated to fit token budget]`}class ae{constructor(e){this.db=e}async store(e,a,r,n,s=5,i="working"){const o=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(e,a,r).first();o?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,s,i,o.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(e,a,r,n,s,i).run(),i==="working"&&await this.enforceWorkingMemoryCap(e)}async cleanupDoneTasks(e){await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND type = 'task' AND status = 'done' AND tier = 'working'
       AND updated_at < datetime('now', '-7 days')`).bind(e).run()}async enforceWorkingMemoryCap(e){const a=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(e).first();if(((a==null?void 0:a.cnt)||0)>Bt){const r=((a==null?void 0:a.cnt)||0)-Bt;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND tier = 'working' AND importance < 8 AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' AND importance < 8
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(e,e,r).run()}}async getWorkingMemory(e){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(e,Bt).all()).results||[]}async getAll(e,a,r=50){return a?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(e,a,r).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(e,r).all()).results||[]}async search(e,a,r=10){const s=(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(e,`%${a}%`,`%${a}%`,r).all()).results||[];if(s.length>0)return await this.touchMemories(e,s.map(d=>d.id)),s;const i=a.split(/\s+/).filter(d=>d.length>2);if(i.length===0)return[];const o=new Map,l=new Map;for(const d of i){const p=await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) LIMIT ?").bind(e,`%${d}%`,`%${d}%`,r*2).all();for(const h of p.results||[])o.set(h.id,(o.get(h.id)||0)+1),l.set(h.id,h)}const c=[...l.values()].sort((d,p)=>(o.get(p.id)||0)-(o.get(d.id)||0)).slice(0,r);return c.length>0&&await this.touchMemories(e,c.map(d=>d.id)),c}async searchLongTerm(e,a,r=5){const s=(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(e,`%${a}%`,`%${a}%`,r).all()).results||[];if(s.length>0)return await this.touchMemories(e,s.map(d=>d.id)),s;const i=a.split(/\s+/).filter(d=>d.length>2);if(i.length===0)return[];const o=new Map,l=new Map;for(const d of i){const p=await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) LIMIT ?").bind(e,`%${d}%`,`%${d}%`,r*2).all();for(const h of p.results||[])o.set(h.id,(o.get(h.id)||0)+1),l.set(h.id,h)}const c=[...l.values()].sort((d,p)=>(o.get(p.id)||0)-(o.get(d.id)||0)).slice(0,r);return c.length>0&&await this.touchMemories(e,c.map(d=>d.id)),c}async touchMemories(e,a){for(const r of a)await this.db.prepare("UPDATE memory SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,e).run()}async update(e,a,r){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,e,a).run()}async promote(e,a){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(e,a).run(),await this.enforceWorkingMemoryCap(a)}async demote(e,a){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(e,a).run()}async remove(e,a){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(e,a).run()}async buildContext(e){const a=await this.getWorkingMemory(e);if(a.length===0)return"";const r={};for(const s of a)r[s.type]||(r[s.type]=[]),r[s.type].push(s);let n=`
## Working Memory (Active Context)
`;for(const[s,i]of Object.entries(r)){n+=`
### ${s.charAt(0).toUpperCase()+s.slice(1)}s
`;for(const o of i)n+=`- **${o.title}**: ${o.content}
`}return ca(n,Tn)}static truncatePersonality(e){return ca(e,xn)}async getRecentConversations(e,a=20,r){return r?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(e,r,a).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(e,a).all()).results||[]).reverse()}async storeMessage(e,a,r,n,s="{}",i){const o=kn(n);i?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(e,a,r,n,s,o,i).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(e,a,r,n,s,o).run()}async compactHistory(e,a=30){const r=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(e).first();((r==null?void 0:r.cnt)||0)<=a*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(e,e,a).run()}}const Sn=Object.freeze(Object.defineProperty({__proto__:null,MemoryService:ae},Symbol.toStringTag,{value:"Module"})),Dn="https://accounts.google.com/o/oauth2/v2/auth",Za="https://oauth2.googleapis.com/token",In="https://www.googleapis.com/oauth2/v2/userinfo",Cn=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let ye=null;async function Wt(t,e,a){const r=await t.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(e,"google_oauth_tokens").first();if(!r)return null;try{const n=await X(r.encrypted_value,a);return JSON.parse(n)}catch{return null}}async function On(t,e,a,r){const n=await Yt(JSON.stringify(r),a);await t.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(e,n).run()}function Xa(t,e,a){const r=new URLSearchParams({client_id:t,redirect_uri:e,response_type:"code",scope:Cn,access_type:"offline",prompt:"consent",state:a,include_granted_scopes:"true"});return`${Dn}?${r}`}async function Qa(t,e,a,r){const n=await fetch(Za,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:t,client_id:e,client_secret:a,redirect_uri:r,grant_type:"authorization_code"})}),s=await n.text();if(!n.ok)throw new Error(`Token exchange failed (${n.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function Rn(t,e,a){const r=await fetch(Za,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:t,client_id:e,client_secret:a,grant_type:"refresh_token"})}),n=await r.text();if(!r.ok)throw r.status===400||r.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${r.status}): ${n.substring(0,300)}`);return JSON.parse(n)}async function er(t){const e=await fetch(In,{headers:{Authorization:`Bearer ${t}`}});if(!e.ok)throw new Error(`Failed to fetch user info: ${e.status}`);return await e.json()}async function rt(t,e,a,r,n){if(!r||!n)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(ye&&ye.userId===e&&ye.expiresAt>Date.now()/1e3+60){const o=await Wt(t,e,a);return{token:ye.token,email:(o==null?void 0:o.email)||"unknown"}}const s=await Wt(t,e,a);if(!s)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const i=await Rn(s.refresh_token,r,n);return ye={userId:e,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{token:i.access_token,email:s.email}}async function Vt(t,e,a){try{const r=await Wt(t,e,a);return r?{connected:!0,email:r.email,connectedAt:r.connected_at}:{connected:!1}}catch{return{connected:!1}}}function tr(t,e){return!!(t&&e&&t.includes(".apps.googleusercontent.com"))}async function ar(t,e,a,r,n,s,i){const o=await Qa(r,s,i,n);if(!o.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await er(o.access_token),c={refresh_token:o.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await On(t,e,a,c),ye={userId:e,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{email:l.email,name:l.name}}async function rr(t,e){await t.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(e).run(),(ye==null?void 0:ye.userId)===e&&(ye=null)}const it="https://sheets.googleapis.com/v4/spreadsheets";class nr{constructor(e,a,r,n,s){this.db=e,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:e}=await rt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async readRange(e,a){const r=await this.authHeaders(),n=encodeURIComponent(a),s=await fetch(`${it}/${e}/values/${n}`,{headers:r});if(!s.ok){const o=await s.text();throw new Error(`Sheets read failed (${s.status}): ${o}`)}return(await s.json()).values||[]}async writeRange(e,a,r){const n=await this.authHeaders(),s=encodeURIComponent(a),i=await fetch(`${it}/${e}/values/${s}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:n,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!i.ok){const l=await i.text();throw new Error(`Sheets write failed (${i.status}): ${l}`)}return{updatedCells:(await i.json()).updatedCells||0}}async appendRows(e,a,r){var l;const n=await this.authHeaders(),s=encodeURIComponent(a),i=await fetch(`${it}/${e}/values/${s}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:n,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!i.ok){const c=await i.text();throw new Error(`Sheets append failed (${i.status}): ${c}`)}return{updatedCells:((l=(await i.json()).updates)==null?void 0:l.updatedCells)||r.length}}async createSpreadsheet(e,a){const r=await this.authHeaders(),n={properties:{title:e},sheets:a&&a.length>0?a.map(o=>({properties:{title:o}})):[{properties:{title:"Sheet1"}}]},s=await fetch(it,{method:"POST",headers:r,body:JSON.stringify(n)});if(!s.ok){const o=await s.text();throw new Error(`Sheets create failed (${s.status}): ${o}`)}const i=await s.json();return{spreadsheetId:i.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${i.spreadsheetId}/edit`}}async getMetadata(e){const a=await this.authHeaders(),r=await fetch(`${it}/${e}?fields=properties.title,sheets.properties.title`,{headers:a});if(!r.ok){const s=await r.text();throw new Error(`Sheets metadata failed (${r.status}): ${s}`)}const n=await r.json();return{title:n.properties.title,sheets:n.sheets.map(s=>s.properties.title)}}}const ot="https://www.googleapis.com/calendar/v3";class Zt{constructor(e,a,r,n,s){this.db=e,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:e}=await rt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async listEvents(e="primary",a={}){const r=await this.authHeaders(),n=new URLSearchParams;a.timeMin&&n.set("timeMin",a.timeMin),a.timeMax&&n.set("timeMax",a.timeMax),n.set("maxResults",String(a.maxResults||20)),n.set("singleEvents","true"),n.set("orderBy","startTime"),a.query&&n.set("q",a.query);const s=await fetch(`${ot}/calendars/${encodeURIComponent(e)}/events?${n}`,{headers:r});if(!s.ok){const o=await s.text();throw new Error(`Calendar list failed (${s.status}): ${o}`)}return(await s.json()).items||[]}async createEvent(e="primary",a){var o;const r=await this.authHeaders(),n=a.timeZone||"Asia/Kolkata",s={summary:a.summary,description:a.description||"",location:a.location||"",start:{dateTime:a.startDateTime,timeZone:n},end:{dateTime:a.endDateTime,timeZone:n}};(o=a.attendees)!=null&&o.length&&(s.attendees=a.attendees.map(l=>({email:l})));const i=await fetch(`${ot}/calendars/${encodeURIComponent(e)}/events`,{method:"POST",headers:r,body:JSON.stringify(s)});if(!i.ok){const l=await i.text();throw new Error(`Calendar create failed (${i.status}): ${l}`)}return await i.json()}async updateEvent(e="primary",a,r){const n=await this.authHeaders(),s=r.timeZone||"Asia/Kolkata",i={};r.summary&&(i.summary=r.summary),r.description&&(i.description=r.description),r.location&&(i.location=r.location),r.startDateTime&&(i.start={dateTime:r.startDateTime,timeZone:s}),r.endDateTime&&(i.end={dateTime:r.endDateTime,timeZone:s});const o=await fetch(`${ot}/calendars/${encodeURIComponent(e)}/events/${a}`,{method:"PATCH",headers:n,body:JSON.stringify(i)});if(!o.ok){const l=await o.text();throw new Error(`Calendar update failed (${o.status}): ${l}`)}return await o.json()}async deleteEvent(e="primary",a){const r=await this.authHeaders(),n=await fetch(`${ot}/calendars/${encodeURIComponent(e)}/events/${a}`,{method:"DELETE",headers:r});if(!n.ok&&n.status!==410){const s=await n.text();throw new Error(`Calendar delete failed (${n.status}): ${s}`)}}async listCalendars(){const e=await this.authHeaders(),a=await fetch(`${ot}/users/me/calendarList`,{headers:e});if(!a.ok){const n=await a.text();throw new Error(`Calendar list calendars failed (${a.status}): ${n}`)}return((await a.json()).items||[]).map(n=>({id:n.id,summary:n.summary,primary:n.primary||!1}))}}const jt="https://docs.googleapis.com/v1/documents",Nn="https://www.googleapis.com/drive/v3/files";class sr{constructor(e,a,r,n,s){this.db=e,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:e}=await rt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async createDocument(e){const a=await this.authHeaders(),r=await fetch(jt,{method:"POST",headers:a,body:JSON.stringify({title:e})});if(!r.ok){const s=await r.text();throw new Error(`Docs create failed (${r.status}): ${s}`)}const n=await r.json();return{documentId:n.documentId,url:`https://docs.google.com/document/d/${n.documentId}/edit`}}async readDocument(e){var i,o;const a=await this.authHeaders(),r=await fetch(`${jt}/${e}`,{headers:a});if(!r.ok){const l=await r.text();throw new Error(`Docs read failed (${r.status}): ${l}`)}const n=await r.json();let s="";for(const l of((i=n.body)==null?void 0:i.content)||[])if(l.paragraph)for(const c of l.paragraph.elements)(o=c.textRun)!=null&&o.content&&(s+=c.textRun.content);return{title:n.title,content:s.trim()}}async appendText(e,a){const r=await this.authHeaders(),n=await fetch(`${jt}/${e}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{insertText:{endOfSegmentLocation:{},text:a}}]})});if(!n.ok){const s=await n.text();throw new Error(`Docs append failed (${n.status}): ${s}`)}}async shareDocument(e,a,r="writer"){const n=await this.authHeaders(),s=await fetch(`${Nn}/${e}/permissions`,{method:"POST",headers:n,body:JSON.stringify({type:"user",role:r,emailAddress:a})});if(!s.ok){const i=await s.text();throw new Error(`Share failed (${s.status}): ${i}`)}}}class ue{constructor(e,a,r,n,s){O(this,"sheets");O(this,"calendar");O(this,"docs");O(this,"db");O(this,"userId");O(this,"pinHash");this.db=e,this.userId=a,this.pinHash=r,this.sheets=new nr(e,a,r,n,s),this.calendar=new Zt(e,a,r,n,s),this.docs=new sr(e,a,r,n,s)}async isConnected(){return Vt(this.db,this.userId,this.pinHash)}}const lt=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:Zt,GoogleDocs:sr,GoogleServices:ue,GoogleSheets:nr,completeOAuthFlow:ar,disconnectGoogle:rr,exchangeCodeForTokens:Qa,fetchUserInfo:er,generateAuthUrl:Xa,getGoogleAuth:rt,isGoogleConnected:Vt,isOAuthClientConfigured:tr},Symbol.toStringTag,{value:"Module"}));async function ir(t,e,a={}){const r={textQuery:e,languageCode:"en",pageSize:8};if(a.type&&(r.includedType=a.type),a.location){const l=a.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(r.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:a.radius||5e3}})}const n=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),s=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":t,"X-Goog-FieldMask":n},body:JSON.stringify(r)});if(!s.ok){const l=await s.text();return{results:[],error:`Places API error (${s.status}): ${l.substring(0,200)}`}}const i=await s.json();return!i.places||i.places.length===0?{results:[]}:{results:i.places.map(l=>{var c,d,p;return{name:((c=l.displayName)==null?void 0:c.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(d=l.currentOpeningHours)==null?void 0:d.openNow,types:(p=l.types)==null?void 0:p.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function or(t,e){var s,i,o;const a=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),r=await fetch(`https://places.googleapis.com/v1/places/${e}`,{method:"GET",headers:{"X-Goog-Api-Key":t,"X-Goog-FieldMask":a}});if(!r.ok){const l=await r.text();return{error:`Place Details API error (${r.status}): ${l.substring(0,200)}`}}const n=await r.json();return{details:{name:((s=n.displayName)==null?void 0:s.text)||"",address:n.formattedAddress||"",phone:n.internationalPhoneNumber,website:n.websiteUri,rating:n.rating,reviews:(i=n.reviews)==null?void 0:i.slice(0,3).map(l=>{var c,d,p;return{author:((c=l.authorAttribution)==null?void 0:c.displayName)||"Anonymous",rating:l.rating||0,text:((p=(d=l.text)==null?void 0:d.text)==null?void 0:p.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(o=n.currentOpeningHours)==null?void 0:o.weekdayDescriptions,location:n.location?{lat:n.location.latitude,lng:n.location.longitude}:void 0,googleMapsUri:n.googleMapsUri}}}async function lr(t,e,a,r={}){var c;const n=new URLSearchParams({origin:e,destination:a,key:t,mode:r.mode||"driving"});(r.mode==="driving"||!r.mode)&&n.set("departure_time","now");const s=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${n}`);if(!s.ok)return{error:`Directions API error: ${s.status}`};const i=await s.json();if(i.status!=="OK")return{error:`Directions: ${i.status} — ${i.error_message||""}`};const o=i.routes[0],l=o.legs[0];return{route:{summary:o.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(c=l.duration_in_traffic)==null?void 0:c.text,steps:l.steps.slice(0,10).map(d=>{var p,h,w;return{instruction:((p=d.html_instructions)==null?void 0:p.replace(/<[^>]*>/g,""))||"",distance:((h=d.distance)==null?void 0:h.text)||"",duration:((w=d.duration)==null?void 0:w.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function cr(t,e,a,r){var l,c;const n={q:e,target:a,key:t,format:"text"};r&&(n.source=r);const s=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){const d=await s.text();return{translatedText:"",error:`Translate API error (${s.status}): ${d.substring(0,200)}`}}const o=(c=(l=(await s.json()).data)==null?void 0:l.translations)==null?void 0:c[0];return o?{translatedText:o.translatedText,detectedSourceLang:o.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function dr(t,e){const a=new URLSearchParams({address:e,key:t}),r=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${a}`);if(!r.ok)return{results:[],error:`Geocoding API error: ${r.status}`};const n=await r.json();return n.status!=="OK"&&n.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${n.status} — ${n.error_message||""}`}:{results:(n.results||[]).slice(0,5).map(s=>{var i;return{address:s.formatted_address,lat:s.geometry.location.lat,lng:s.geometry.location.lng,placeId:s.place_id,types:(i=s.types)==null?void 0:i.slice(0,3)}})}}async function ur(t,e,a={}){const r=new URLSearchParams({part:"snippet",q:e,key:t,type:a.type||"video",maxResults:String(a.maxResults||5),order:a.order||"relevance"}),n=await fetch(`https://www.googleapis.com/youtube/v3/search?${r}`);if(!n.ok){const i=await n.text();return{results:[],error:`YouTube API error (${n.status}): ${i.substring(0,200)}`}}return{results:((await n.json()).items||[]).map(i=>{var o,l,c,d,p,h,w,f;return{title:i.snippet.title,channelTitle:i.snippet.channelTitle,description:(o=i.snippet.description)==null?void 0:o.substring(0,200),videoId:((l=i.id)==null?void 0:l.videoId)||((c=i.id)==null?void 0:c.channelId)||((d=i.id)==null?void 0:d.playlistId)||"",publishedAt:i.snippet.publishedAt,url:(p=i.id)!=null&&p.videoId?`https://www.youtube.com/watch?v=${i.id.videoId}`:(h=i.id)!=null&&h.channelId?`https://www.youtube.com/channel/${i.id.channelId}`:"",thumbnailUrl:(f=(w=i.snippet.thumbnails)==null?void 0:w.medium)==null?void 0:f.url}})}}async function Rt(t,e={}){const a=Math.min(e.num||5,10),r=e.site?`site:${e.site} ${t}`:t;try{const n=new URLSearchParams({q:r}),s=await fetch(`https://html.duckduckgo.com/html/?${n}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!s.ok)return{results:[],error:`Search request failed (${s.status})`};const i=await s.text(),o=[],l=i.split(/class="result results_links/g).slice(1);for(const c of l){if(o.length>=a)break;const d=c.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),p=c.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(d){let h=d[1];const w=h.match(/uddg=([^&]+)/);w?h=decodeURIComponent(w[1]):h.startsWith("//")&&(h="https:"+h);const f=T=>T.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),x=f(d[2]),y=p?f(p[1]):"";if(x&&h.startsWith("http")){const T=h.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];o.push({title:x,link:h,snippet:y,displayLink:T})}}}return o.length===0?{results:[],error:void 0}:{results:o}}catch(n){return{results:[],error:`Web search error: ${n.message}`}}}async function pr(t,e,a,r="driving"){var l,c,d,p;const n=new URLSearchParams({origins:e,destinations:a,key:t,mode:r,departure_time:"now"}),s=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${n}`);if(!s.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${s.status}`};const i=await s.json(),o=(d=(c=(l=i.rows)==null?void 0:l[0])==null?void 0:c.elements)==null?void 0:d[0];return!o||o.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(o==null?void 0:o.status)||i.status}`}:{distance:o.distance.text,duration:o.duration.text,durationInTraffic:(p=o.duration_in_traffic)==null?void 0:p.text}}const An=Object.freeze(Object.defineProperty({__proto__:null,geocode:dr,getDirections:lr,getDistanceMatrix:pr,getPlaceDetails:or,searchPlaces:ir,searchYouTube:ur,translateText:cr,webSearch:Rt},Symbol.toStringTag,{value:"Module"})),ve="https://gmail.googleapis.com/gmail/v1/users/me";class we{constructor(e,a,r,n,s){this.db=e,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:e}=await rt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async listMessages(e={}){var o;const a=await this.authHeaders(),r=new URLSearchParams;if(r.set("maxResults",String(e.maxResults||10)),e.query&&r.set("q",e.query),(o=e.labelIds)!=null&&o.length)for(const l of e.labelIds)r.append("labelIds",l);const n=await fetch(`${ve}/messages?${r}`,{headers:a});if(!n.ok){const l=await n.text();throw new Error(`Gmail list failed (${n.status}): ${l.substring(0,200)}`)}const s=await n.json();if(!s.messages||s.messages.length===0)return[];const i=[];for(const l of s.messages.slice(0,e.maxResults||10))try{const c=await this.getMessage(l.id,a);c&&i.push(c)}catch{}return i}async getMessage(e,a){const r=a||await this.authHeaders(),n=await fetch(`${ve}/messages/${e}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:r});if(!n.ok)return null;const s=await n.json(),i=o=>{var l,c,d;return((d=(c=(l=s.payload)==null?void 0:l.headers)==null?void 0:c.find(p=>p.name.toLowerCase()===o.toLowerCase()))==null?void 0:d.value)||""};return{id:s.id,threadId:s.threadId,snippet:s.snippet||"",subject:i("Subject")||"(no subject)",from:i("From"),to:i("To"),date:i("Date")||new Date(parseInt(s.internalDate)).toISOString(),isUnread:(s.labelIds||[]).includes("UNREAD"),labels:s.labelIds||[]}}async getMessageBody(e){const a=await this.authHeaders(),r=await fetch(`${ve}/messages/${e}?format=full`,{headers:a});if(!r.ok){const s=await r.text();throw new Error(`Gmail message body failed (${r.status}): ${s.substring(0,200)}`)}const n=await r.json();return mr(n.payload)}async search(e,a=10){return this.listMessages({query:e,maxResults:a})}async send(e,a,r,n={}){const s=await this.authHeaders(),i=[`To: ${e}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];n.cc&&i.push(`Cc: ${n.cc}`),n.bcc&&i.push(`Bcc: ${n.bcc}`),n.replyToMessageId&&(i.push(`In-Reply-To: ${n.replyToMessageId}`),i.push(`References: ${n.replyToMessageId}`)),i.push("",r);const o=i.join(`\r
`),c={raw:da(o)};n.threadId&&(c.threadId=n.threadId);const d=await fetch(`${ve}/messages/send`,{method:"POST",headers:s,body:JSON.stringify(c)});if(!d.ok){const p=await d.text();throw new Error(`Gmail send failed (${d.status}): ${p.substring(0,200)}`)}return await d.json()}async createDraft(e,a,r,n={}){const s=await this.authHeaders(),i=[`To: ${e}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];n.cc&&i.push(`Cc: ${n.cc}`),i.push("",r);const o=i.join(`\r
`),l=da(o),c=await fetch(`${ve}/drafts`,{method:"POST",headers:s,body:JSON.stringify({message:{raw:l}})});if(!c.ok){const d=await c.text();throw new Error(`Gmail draft failed (${c.status}): ${d.substring(0,200)}`)}return await c.json()}async markAsRead(e){const a=await this.authHeaders();await fetch(`${ve}/messages/${e}/modify`,{method:"POST",headers:a,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(e,a){const r=await this.authHeaders();let n={};switch(a){case"archive":n={removeLabelIds:["INBOX"]};break;case"trash":n={addLabelIds:["TRASH"]};break;case"read":n={removeLabelIds:["UNREAD"]};break;case"unread":n={addLabelIds:["UNREAD"]};break;case"star":n={addLabelIds:["STARRED"]};break;case"unstar":n={removeLabelIds:["STARRED"]};break}const s=await fetch(`${ve}/messages/${e}/modify`,{method:"POST",headers:{...r,"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){const i=await s.text();throw new Error(`Failed to modify message: ${i}`)}return!0}async getUnreadCount(){const e=await this.authHeaders(),a=await fetch(`${ve}/labels/INBOX`,{headers:e});return a.ok&&(await a.json()).messagesUnread||0}async getProfile(){const e=await this.authHeaders(),a=await fetch(`${ve}/profile`,{headers:e});if(!a.ok)throw new Error("Failed to get Gmail profile");return await a.json()}}function mr(t){var e,a,r;if(!t)return"";if((e=t.body)!=null&&e.data)return Pt(t.body.data);if(t.parts){for(const n of t.parts)if(n.mimeType==="text/plain"&&((a=n.body)!=null&&a.data))return Pt(n.body.data);for(const n of t.parts)if(n.mimeType==="text/html"&&((r=n.body)!=null&&r.data)){const s=Pt(n.body.data);return Ln(s)}for(const n of t.parts)if(n.parts){const s=mr(n);if(s)return s}}return t.snippet||""}function da(t){const e=new TextEncoder().encode(t);let a="";for(let r=0;r<e.length;r++)a+=String.fromCharCode(e[r]);return btoa(a).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Pt(t){const e=t.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(e)))}catch{return atob(e)}}function Ln(t){return t.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const Mn=1e4,$n=1e4;async function hr(t,e){try{const a=new AbortController,r=setTimeout(()=>a.abort(),$n),n=await fetch(t,{signal:a.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(!n.ok)return{text:"",error:`HTTP ${n.status}`};const s=n.headers.get("content-type")||"";if(!s.includes("text/html")&&!s.includes("text/plain")&&!s.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${s.split(";")[0]}`};const i=await n.text();clearTimeout(r);const o=i.length>2e5?i.substring(0,2e5):i,l=Bn(o);return l.length<50?{text:"",error:"Page has too little readable content"}:{text:l.substring(0,e||Mn)}}catch(a){return{text:"",error:a.name==="AbortError"?"Timeout":a.message}}}function Bn(t){let e=t;return e=e.replace(/<script[\s\S]*?<\/script>/gi,""),e=e.replace(/<style[\s\S]*?<\/style>/gi,""),e=e.replace(/<nav[\s\S]*?<\/nav>/gi,""),e=e.replace(/<footer[\s\S]*?<\/footer>/gi,""),e=e.replace(/<header[\s\S]*?<\/header>/gi,""),e=e.replace(/<aside[\s\S]*?<\/aside>/gi,""),e=e.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),e=e.replace(/<!--[\s\S]*?-->/g,""),e=e.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),e=e.replace(/<li[^>]*>/gi,`
• `),e=e.replace(/<[^>]+>/g,""),e=e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(a,r)=>String.fromCharCode(parseInt(r))),e=e.replace(/[ \t]+/g," "),e=e.replace(/\n\s*\n/g,`

`),e=e.split(`
`).map(a=>a.trim()).filter(a=>a.length>0).join(`
`),e.trim()}const jn=1e4;async function Pn(t,e){var n,s,i;const a=new AbortController,r=setTimeout(()=>a.abort(),jn);try{const o=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",signal:a.signal,headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar-pro",messages:[{role:"user",content:t}],max_tokens:2e3})});if(clearTimeout(r),!o.ok)return{report:"",sources:[],pagesRead:0,error:`Perplexity error ${o.status}`};const l=await o.json(),c=((i=(s=(n=l==null?void 0:l.choices)==null?void 0:n[0])==null?void 0:s.message)==null?void 0:i.content)||"",p=((l==null?void 0:l.citations)||[]).map(h=>({title:h,url:h,snippet:""}));return{report:c,sources:p,pagesRead:p.length}}catch(o){return clearTimeout(r),{report:"",sources:[],pagesRead:0,error:`Perplexity request failed: ${o.message}`}}}async function gr(t,e,a={}){if(a.perplexityApiKey){const h=await Pn(t,a.perplexityApiKey);if(!h.error)return h}const r=a.maxPages||(a.depth==="thorough"?5:3),n=a.maxResults||(a.depth==="thorough"?8:5),s=await Rt(t,{num:n,site:a.site});if(s.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${s.error}`};if(s.results.length===0)return{report:`No web results found for "${t}".`,sources:[],pagesRead:0};const o=s.results.slice(0,r).map(async h=>{const w=await hr(h.link);return{title:h.title,url:h.link,displayLink:h.displayLink,snippet:h.snippet,content:w.text,error:w.error}}),c=(await Promise.all(o)).filter(h=>h.content.length>50);if(c.length===0){const h=s.results.map((f,x)=>`[${x+1}] ${f.title}
${f.snippet}
Source: ${f.link}`).join(`

`);return{report:await ua(t,h,e,"snippets"),sources:s.results.map(f=>({title:f.title,url:f.link})),pagesRead:0}}const d=c.map((h,w)=>`--- SOURCE ${w+1}: ${h.title} (${h.displayLink}) ---
${h.content}
--- END SOURCE ${w+1} ---`).join(`

`);return{report:await ua(t,d,e,"full"),sources:c.map(h=>({title:h.title,url:h.url})),pagesRead:c.length}}async function ua(t,e,a,r){const s=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

${r==="full"?"I have fetched and read the full content of several web pages related to the research query.":"I could only retrieve search snippets (page fetching failed). Base the analysis on available snippet information and note this limitation."}

Instructions:
- Analyze ALL the source material provided below
- Write a clear, well-structured report answering the research query
- Include specific facts, numbers, and details from the sources
- Note any conflicting information between sources
- End with a brief conclusion or recommendation
- Cite sources by number [1], [2], etc.
- Keep the report concise but thorough — aim for 400-800 words
- Do NOT make up information not found in the sources
- If the sources don't adequately answer the query, say so honestly`,i=`Research query: "${t}"

Source material:
${e}

Write a synthesized research report answering the query above.`;try{return(await a.chat([{role:"system",content:s},{role:"user",content:i}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(o){return`Research synthesis error: ${o.message}. Raw search results were found but could not be analyzed.`}}const Un=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:gr,fetchPageContent:hr},Symbol.toStringTag,{value:"Module"}));async function fr(t){const e=t instanceof Buffer?new Uint8Array(t):t,a=new DataView(e.buffer,e.byteOffset,e.byteLength);let r=0;for(;r<e.length-30&&a.getUint32(r,!0)===67324752;){const n=a.getUint16(r+6,!0),s=a.getUint16(r+8,!0),i=a.getUint32(r+18,!0),o=a.getUint32(r+22,!0),l=a.getUint16(r+26,!0),c=a.getUint16(r+28,!0),d=new TextDecoder().decode(e.slice(r+30,r+30+l)),p=r+30+l+c;if(d==="word/document.xml"){const h=e.slice(p,p+i);let w;if(s===0)w=h;else{const y=new DecompressionStream("deflate-raw"),T=y.writable.getWriter();T.write(h),T.close();const E=y.readable.getReader(),C=[];let R=!1;for(;!R;){const B=await E.read();B.done?R=!0:C.push(B.value)}const $=C.reduce((B,F)=>B+F.length,0);w=new Uint8Array(o||$);let P=0;for(const B of C)w.set(B,P),P+=B.length}return new TextDecoder().decode(w).replace(/<\/w:p>/g,`
`).replace(/<\/w:tr>/g,`
`).replace(/<[^>]+>/g,"").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim()}r=p+i,n&8&&(r+=16)}return""}const Hn=Object.freeze(Object.defineProperty({__proto__:null,extractDocxTextFromBuffer:fr},Symbol.toStringTag,{value:"Module"})),Gn=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,weight:.9},{pattern:/\bremi[a-z]{0,5}\s+(me|us)\b/i,weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,weight:.95},{pattern:/^[Tt]ask:\s*/,weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,weight:.9},{pattern:/\b(change\s+(the\s+)?time|update\s+(the\s+)?(reminder|schedule|alarm)|reschedule|move\s+it\s+to|cancel\s+(the\s+)?(reminder|schedule|alarm)|delete\s+(the\s+)?(reminder|schedule|alarm))\b/i,weight:.9},{pattern:/\b(show\s+(me\s+)?(my\s+)?(reminders?|schedules?|alarms?)|what\s+reminders?|any\s+reminders?|do\s+i\s+have.*remind|when\s+is\s+my\s+remind)\b/i,weight:.9},{pattern:/\b(stop|turn\s+off|switch\s+off|disable|deactivate)\s+(that|the|this|my)?\s*(reminder|schedule|alarm|notification)\b/i,weight:.9},{pattern:/\b(snooze|postpone|push\s+back|remind\s+me\s+later|later\s+reminder)\b/i,weight:.9},{pattern:/\b(change|update|edit|move|shift)\s+(it|this|that)\s+(to|for)\b/i,weight:.85},{pattern:/\bset\s+it\s+(for|at|to)\b/i,weight:.85},{pattern:/\b(what\s+time|when)\s+(did\s+i\s+set|is\s+(the|my)\s+remind|does\s+(it|that)\s+go\s+off)\b/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,weight:.9},{pattern:/\b(update\s+cell|change\s+cell|delete\s+row|remove\s+row|create\s+(a\s+)?(new\s+)?(tab|sheet)|add\s+(a\s+)?tab|what.{0,15}(column|row\s+\d|cell\s+[A-Z])|sum\s+of|total\s+(in|of))\b/i,weight:.9},{pattern:/\b(forward\s+(that\s+)?(email|message)|reply\s+to\s+(that|the|an?\s+)?email|respond\s+to\s+(that|the)\s+email|mark\s+(it|that|this|email)\s+as|(got|received)\s+an?\s+email\s+from)\b/i,weight:.85},{pattern:/\b(cancel\s+(the\s+)?(event|meeting|appointment)|reschedule\s+(the\s+|my\s+)?(meeting|event|appointment)|delete\s+(from|the)\s+calendar|remove\s+(the\s+)?(event|meeting)\s+from\s+calendar)\b/i,weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,weight:.9},{pattern:/\b(keep\s+(that\s+)?in\s+mind|always\s+(do|use|prefer|remember)|update\s+(my\s+)?(memory|preference)|delete\s+(that\s+)?memory|forget\s+that|what\s+did\s+i\s+tell\s+you\s+about)\b/i,weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,weight:.9}];function Xt(t,e){for(const a of Gn)if(a.pattern.test(t))return{agent:"multi",confidence:a.weight,reasoning:"Keyword match — full agent"};return e&&t.trim().length<80&&e.split(`
`).slice(-16).some(n=>/\[TOOLS_USED:/i.test(n)||/\b(reminder|reminders|schedule|scheduled|cron|alarm|next_run|set for|going off|remind)\b/i.test(n)||/\b(i['']ll\s+(search|research|find|look\s+up|check|add|create|book)|just\s+a\s+moment|pulling\s+that\s+together|on\s+it\b|let\s+me\s+(search|research|find|look))\b/i.test(n))?{agent:"multi",confidence:.8,reasoning:"Active tool session follow-up — full agent"}:e&&/spreadsheet|sheet|google\s*sheet/i.test(e)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(t)?{agent:"multi",confidence:.85,reasoning:"Memory context — full agent"}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function yr(t,e,a,r,n,s){const i=e.assistant_name||"Karna",o=e.personality_prompt?`
## Personality
${e.personality_prompt.substring(0,2e3)}
`:"",l=a?`
## Active Memory (ALWAYS consult before responding)
${a}
`:"";let c="";try{const p=new Date;c=new Intl.DateTimeFormat("en-GB",{timeZone:e.timezone,day:"numeric",month:"short",year:"numeric"}).format(p)}catch{c=""}const d=`
## Current User
- **Name**: ${e.name}
- **Timezone**: ${e.timezone}
- **Time**: ${n}
- **Today's date for sheets**: ${c}
`;switch(t){case"conversation":return`You are ${i} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic.

${d}${o}${l}

## Your Job
Engage in natural conversation. You handle:
- Greetings and casual chat
- Opinions and creative discussion
- Questions that don't require tools (general knowledge)
- Emotional support and thoughtful responses

### Rules
- Be yourself — use your personality
- Reference memory when relevant (user's preferences, past conversations)
- **IMPORTANT**: If the user's message implies they want a tool action, redirect proactively:
  - "My package hasn't arrived" → "I can check the tracking status. Do you have a tracking number, or should I search your memory/Gmail for it?"
  - "I need to budget" → "I can set up a budget spreadsheet for you. Want me to create one?"
  - "That meeting tomorrow..." → "Want me to check your calendar for tomorrow's events?"
  - "I wonder what the news is" → "I can search for that — any specific topic?"
- Keep it natural and concise
- Time-aware: reference current date/time when relevant
- **HARD RULE — no false confirmations**: You have ZERO tool access. You CANNOT set reminders, create schedules, send emails, read sheets, or perform any action. NEVER output phrases like "Reminder set for...", "I've scheduled...", "Done ✅", "Task created", or any language implying an action was completed. If the user wants an action, say: "I can do that — just send your message and I'll take care of it." Do NOT simulate the outcome.`;default:return""}}const Fn=Object.freeze(Object.defineProperty({__proto__:null,buildSubAgentPrompt:yr,classifyIntentFast:Xt},Symbol.toStringTag,{value:"Module"})),Wn=2e3,qn=2e3,vr=4;function Ut(t){return Math.ceil(t.length/vr)}function pa(t,e){const a=e*vr;return t.length<=a?t:t.slice(0,a)+`
[...truncated to fit token budget]`}function wr(t){const e=new Set(["(Previous response was not recorded.)","(Previous request did not complete. Please try again.)","(My previous response was cut off before completing. Starting fresh.)"]),a=[];for(const n of t){const s=typeof n.content=="string"?n.content:"";if(n.role==="assistant"&&e.has(s.trim())&&a.length>0&&a[a.length-1].role==="user"){a.pop();continue}a.push(n)}const r=[];for(const n of a){let s=n.content;n.role==="assistant"&&typeof s=="string"&&(s=s.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim(),s||(s="(Previous response was not recorded.)"));const i=s!==n.content?{...n,content:s}:n;r.length>0&&r[r.length-1].role===i.role&&i.role!=="system"?r[r.length-1]={...r[r.length-1],content:r[r.length-1].content+`

`+i.content}:r.push(i)}return r}const ma=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes, daily = at a specific time (HH:MM), weekly = day of week at time (e.g. "Friday 17:00"), once = specific date and time (e.g. "2026-03-12 14:30")'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration requests: "in 5 minutes", "in 2 hours", "in half an hour". Do NOT use for any request that mentions a specific time or date ("at 13:00", "tomorrow at noon", "next Friday") — use schedule_value instead. Examples: "in 5 minutes" = 5, "in 2 hours" = 120.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"update_schedule",description:'Update an existing scheduled task — change its name, description, or reschedule it to a new time. Use this when the user wants to change the time of a reminder or rename it. You MUST call this tool — never say "updated" without calling it.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to update (get it from list_schedules first if unknown)"},name:{type:"string",description:"New name for the task (optional)"},description:{type:"string",description:"New description (optional)"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:"New schedule type (required if changing the time)"},schedule_value:{type:"string",description:"New schedule value matching the schedule_type format (required if changing the time)"},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration changes ("in 30 minutes", "in 2 hours"). Do NOT use if the user specifies a clock time or date — use schedule_value instead.'}},required:["job_id"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:'Store a PERMANENT rule, preference, or standing instruction that Ruby should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts (orders, deliveries, single events) — those go to create_schedule. Ask yourself: "Will this still be relevant in 6 months?" If no, do not store it.',parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"delete_memory",description:'Delete a stored memory entry by its ID. Use when the user says "forget that", "remove that rule", or "that preference is wrong". Always call search_memory first to confirm the correct ID. Confirm with the user if there is any ambiguity about which entry to remove.',parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to delete"}},required:["id"]}},{name:"update_memory",description:"Update the content of an existing memory entry by its ID. Use when the user wants to correct or change a stored rule or preference. Always call search_memory first to find the correct ID.",parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to update"},content:{type:"string",description:"The new content to replace the existing entry"}},required:["id","content"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. STRICT RULES — violating any of these is a critical error: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm. (2) NEVER fabricate email body content. Only use data you retrieved from tools in this same conversation. If you do not have the actual content (costs, numbers, details), do NOT call this — tell the user exactly what information is missing and ask them to provide it. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_read_file",description:"Read the content of a specific Google Drive file by URL or file ID. Supports Google Docs (exported as text), Sheets (exported as CSV), PDFs (extracted via AI), and other text files. Use this when the user shares a Google Drive or Google Docs link and wants you to read, summarize, or analyze the file contents.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive or Google Docs URL (e.g. https://drive.google.com/file/d/... or https://docs.google.com/document/d/...) or bare file ID"},extract_focus:{type:"string",description:'Optional: specific content to focus extraction on (e.g. "financial figures", "action items", "table of contents")'}},required:["url_or_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets (~1s). Use ONLY for: real-time news/headlines where the user wants links, or as a fallback when research fails. For everything else (weather, recommendations, comparisons, travel) use research instead — it gives synthesized answers not raw snippets.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:'Deep web research — synthesizes a detailed report from multiple sources. Uses Perplexity Sonar when available (~5s), otherwise fetches and reads 3-5 pages (~15s). Use for: weather forecasts, travel recommendations, packing lists, comparisons (A vs B), "is X good for Y?", best-of recommendations, anything needing a synthesized answer rather than a raw link list.',parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"parse_document",description:"Read and extract text content from an uploaded file (PDF, Word/DOCX, or text). Call this whenever the user uploads a document and wants you to read it, extract information, or work with its contents.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id returned when the file was uploaded"},extract_focus:{type:"string",description:'Optional: specific information to focus on extracting (e.g., "quantities and equipment names", "dates and amounts", "all text content")'}},required:["file_id"]}},{name:"create_skill",description:"Create a new reusable skill — a named workflow that can be invoked by name in future conversations. Use this when the user asks you to create a skill, save a workflow, or build a reusable automation. IMPORTANT: Before calling this, ask the user clarifying questions to understand: what the skill should do, what inputs it needs, what tools it uses, and what the expected output is.",parameters:{type:"object",properties:{name:{type:"string",description:'Human-readable skill name (e.g., "Equipment List Parser", "Daily Expense Logger")'},description:{type:"string",description:"One-sentence description of what the skill does"},instructions:{type:"string",description:"Detailed step-by-step instructions for executing the skill. Be specific about which tools to use, in what order, and what to do with the results."},required_tools:{type:"array",items:{type:"string"},description:'List of tool names this skill needs (e.g. ["parse_document", "append_sheet", "create_sheet"])'},parameters:{type:"object",description:"JSON schema describing the inputs this skill accepts. Use standard JSON schema format."},examples:{type:"array",description:"Optional example inputs and expected outputs to guide execution",items:{type:"object",properties:{input:{type:"object"},output:{type:"string"}}}}},required:["name","description","instructions"]}},{name:"list_skills",description:"List all custom skills the user has created. Shows name, description, and usage count for each.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled skills. Default: false"}}}}];async function Qt(t,e){try{const r=((await t.prepare("SELECT slug, name, description, parameters FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at ASC").bind(e).all()).results||[]).map(n=>{let s={};try{s=JSON.parse(n.parameters)||{}}catch{}return s.properties||(s={type:"object",properties:{inputs:{type:"string",description:"Any additional context or specific instructions for this skill execution"}}}),{name:n.slug,description:`[Custom Skill] ${n.description}`,parameters:s}});return[...ma,...r]}catch{return ma}}async function ea(t,e){const r=(await t.prepare("SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(e).all()).results||[];return r.length===0?"":r.map(n=>`- ${n.content}`).join(`
`)}function br(t,e,a,r){const n=t.assistant_name||"Karna",s=t.personality_prompt?pa(`## Personality Instructions
${t.personality_prompt}
`,Wn):"",i=r!=null&&r.trim()?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. They are fixed — do not store copies of these in your memory or contradict them.
${r}
`:"",o=pa(e,qn);return`You are ${n} — a personal AI assistant. Your name is ${n} — always refer to yourself by this name if asked.

## Personality

**Core Principles**
- Reason carefully before responding. Show your thinking when it adds value.
- Get to the point. No preamble, filler, or false enthusiasm.
- Admit uncertainty, knowledge gaps, and limitations clearly. Say "I don't know" instead of guessing.
- Don't simulate emotions, certainty you lack, or false confidence.
- Present options and implications; let the user decide. Don't manipulate.

**Communication Style**
- Balance analytical rigour with creative intuition.
- Use examples and metaphors to clarify complex ideas.
- Match the user's tone — formal or casual, brief or detailed.
- Correct respectfully when users hold inaccurate assumptions.
- Answer the actual question asked, not what you assume they meant.
- Flag ambiguity before diving into a detailed answer.
- Default to brevity; expand only if requested.
- Offer frameworks when helpful; avoid unnecessary jargon.
- Acknowledge tradeoffs and competing values.

**Boundaries**
- Decline harmful requests clearly, without moral lecturing.
- Don't pretend to have capabilities you lack.
- Be sceptical of oversimplification for complex topics.

**When Uncertain**
- Say "I don't know" instead of guessing.
- Explain what would help you answer better.
- Suggest reliable approaches or sources.

## Your Core Identity
- You are a cloud-based personal assistant with memory, scheduling, and full Google Workspace integration (Sheets, Calendar, Docs, Drive, Gmail).
- You remember past conversations and learn from every interaction.
- You can create scheduled tasks, reminders, and recurring checks through natural conversation.

## Current User
- **Name**: ${t.name}
- **Username**: ${t.username}
- **Role**: ${t.role}
- **Timezone**: ${t.timezone}

${s}

${i}
## Your Active Memory (Your Own Notes — Can Be Updated via store_memory)
**ALWAYS read and apply everything in this section before responding.** This is your stored knowledge about the user — preferences you have noted, referenced documents, data sources, and context. These OVERRIDE default behaviour. Do NOT duplicate anything already covered in Standing Instructions above.
- If a memory entry says "use this Google Sheet for events queries" — then when the user asks about events, you MUST use read_sheet with that spreadsheet ID. Do NOT use calendar or ask the user for the sheet link again.
- If a memory entry references a document or spreadsheet, use the stored ID directly with the appropriate tool (read_sheet, read_doc, etc.).
- If a memory entry records a preference (e.g. "check Outlook for meetings"), follow it without asking.

${o}

## How You Work — Composable Capabilities

### Core Philosophy
Your tools are **building blocks**, not isolated features. Every tool is a capability that can be chained with any other tool. When the user gives a request — even a complex one — break it into steps and execute them in sequence. Don't ask permission between steps. Just do it and present the final result.

Think of it this way:
- **Gathering** tools find information (web_search, research, read_url, gmail_list, list_calendar_events, drive_search, drive_list, search_places)
- **Creating** tools produce output (create_doc, create_sheet, gmail_draft, gmail_send, create_calendar_event)
- **Writing** tools save content (create_doc, append_to_doc, write_sheet, append_sheet, store_memory)
- **Reading** tools retrieve content (read_doc, read_sheet, gmail_read, read_url)

Any gathering tool can feed into any creating/writing tool. Any reading tool can feed into any other step.

### Disambiguation — Confirm When Unsure, Learn, Never Ask Again
**CRITICAL**: Before executing an action that modifies data (writing, sending, creating, deleting), assess your confidence:

**Confidence levels:**
- **HIGH** (just do it): The request is clear AND you have all needed context in memory. Examples: "Check my calendar", "Research DeepSeek API", user says "Uber 700" and memory has a confirmed pattern like "Short expense entries go to Monthly Budget sheet".
- **MEDIUM** (do it but state what you did): You're 80%+ sure from context. Example: User says "Groceries 1000" and memory has a budget sheet but no explicit pattern stored yet. → Go ahead, add to budget, and tell them: "Added Groceries ₹1000 to your Monthly Budget sheet."
- **LOW** (ask first): The request is ambiguous and you could take the wrong action. Example: "Uber 700" with NO budget sheet in memory. Could be a note, a payment, a reminder. → Ask: "Would you like me to add Uber ₹700 as an expense? I can create a budget sheet for you, or just note this down."

**Common ambiguity patterns — how to handle each:**

| User says | Memory has | Confidence | Action |
|-----------|-----------|------------|--------|
| "Uber 700" | Budget sheet + confirmed pattern | HIGH | Append to budget directly |
| "Uber 700" | Budget sheet, no pattern yet | MEDIUM | Append to budget, tell them what you did |
| "Uber 700" | No budget sheet | LOW | Ask: "Add as an expense? I can create a budget sheet." |
| "Send to John" | One John in recent emails | MEDIUM | Draft to that John, confirm before sending |
| "Send to John" | Multiple Johns / no John | LOW | Ask: "Which John? (email address?)" |
| "Save this" | One active doc in context | MEDIUM | Save to that doc |
| "Save this" | Multiple docs or none | LOW | Ask: "Save to a new doc, or add to [doc name]?" |
| "Add to my doc" | One doc in memory | HIGH | Append to that doc |
| "Add to my doc" | Multiple docs | LOW | Ask: "Which one? [list doc names from memory]" |
| "Meeting 3pm tomorrow" | Calendar connected | MEDIUM | Create event, confirm details |
| "Meeting 3pm tomorrow" | No calendar | LOW | Ask: "Want me to create a calendar event?" |
| "Check mail" | Both Gmail and Outlook | LOW | Ask: "Gmail or Outlook?" OR check both |
| "Check mail" | Only Gmail connected | HIGH | Check Gmail |

**The learn-and-never-ask-again rule:**
When you confirm an ambiguous action and the user approves, IMMEDIATELY store a pattern in memory using store_memory:
- Type: "preference"
- Title: descriptive pattern name (e.g., "Expense Entry Pattern", "Default Email Account")
- Content: the resolved pattern (e.g., "Short messages with item + amount are expenses for Monthly Budget sheet (ID: abc123)", "Default mail is Gmail, Outlook only when specified")
- Importance: 8 (working memory — always in context)

Next time the same pattern appears, your confidence is HIGH — just do it. This means:
- First "Uber 700" → ask (LOW confidence)
- User says "yes, add to budget" → add + store_memory("Expense Entry Pattern", "Item + amount entries go to Monthly Budget sheet ID: abc123")
- Second "Groceries 1000" → memory has the pattern → just append (HIGH confidence)
- Third "Coffee 200" → just append, no questions

**When NOT to confirm:**
- Pure information requests: "What's the weather?", "Search for X", "What's in my calendar?"
- Explicit commands: "Create a doc called X with Y content", "Email John at john@example.com about Z"
- Follow-ups in an ongoing conversation: "Now save that to a doc" (the context is clear from the conversation)

### Chaining Examples
- "Research DeepSeek API and save to a doc" → research → create_doc (with full report as content)
- "What's the latest AI news? Write a summary in Google Docs" → web_search → create_doc
- "Read this article https://... and email me the key points" → read_url → gmail_send
- "Check my calendar for tomorrow and create a doc with my schedule" → list_calendar_events → create_doc
- "Find audio stores in Mumbai and make a spreadsheet" → search_places → create_sheet → write_sheet
- "What's in my inbox? Anything from John, save to a doc" → gmail_list → gmail_read → create_doc
- "Research X, then add the findings to my existing doc" → research → append_to_doc
- "Create a budget sheet" → create_sheet → write_sheet (headers + =SUM formula for running total)
- "Uber 700" (first time, no pattern) → ASK "Add Uber ₹700 to your Monthly Budget?" → user says yes → append_sheet + store_memory (pattern)
- "Groceries 1000" (pattern exists) → append_sheet directly (no question)
- "How much on groceries this month?" → search_memory (sheet ID) → read_sheet (all rows) → analyze and answer
- "Write an essay on love and save under 'Philosophy' folder" → create_doc (with content + folder_name)

For requests with 3 or more distinct tasks, chain tool calls one at a time across turns — complete every step before giving a final response. Do not stop mid-chain to summarize.

### Information Retrieval (3 tiers)

**Decision order — follow this strictly:**
1. **Answer from knowledge first** — If the question is a static fact you know with confidence (capital cities, country/currency/language facts, historical dates, definitions, math, general knowledge), answer directly. Do NOT call any tool. Example: "Capital of France?" → "Paris." No tool needed.
2. **research** — Use for anything requiring up-to-date or synthesized information: weather forecasts, travel & packing advice, recommendations ("best X in Y"), comparisons ("A vs B"), current events, prices, "is X good for Y?", anything where your training knowledge may be stale or incomplete. Uses Perplexity Sonar when available (~5s), otherwise fetches and reads pages (~15s).
3. **web_search** — Use ONLY for real-time news/headlines where the user explicitly wants links or a list of results (not a synthesized answer), OR as a fallback if research fails. Do not use web_search where research would give a better answer.
4. **read_url** — Read one page (~3-5s). Use when the user provides a specific URL to read. **Max 2 attempts**: if the first read_url fails, try ONE alternative URL. After 2 failures, answer from knowledge: "I couldn't load that page. Based on what I know: [answer]".

**Examples**: "Capital of France?" → knowledge (no tool). "Weather in Bangkok May 12-19?" → research. "Latest cricket scores?" → web_search. "Best hotels in Bali?" → research. "What does API mean?" → knowledge (no tool).

### Writing & Storage
- **create_doc** — Create a new Google Doc with content. Always pass the full text as the content parameter.
- **append_to_doc** — Add content to an existing Google Doc. Use when the user wants to add to an existing document.
- **create_sheet** + **write_sheet** / **append_sheet** — Create and populate spreadsheets.
- **gmail_draft** / **gmail_send** — Send content via email.
- **store_memory** — Remember user info long-term.

When the user says "save this", "write to a doc", "put this in Drive" — create a Google Doc with the content. Always use a descriptive title.

### Memory & Scheduling
- store_memory — Store PERMANENT rules and preferences only. Things that shape every conversation: writing style, standing instructions, frequently-used resource IDs. NOT for tasks, reminders, or one-off facts.
- search_memory — Recall previously stored permanent info. **Results include the entry ID** — note it before calling delete_memory or update_memory.
- delete_memory — Remove a stored rule or preference. Always call search_memory first to confirm the correct ID. If ambiguous, confirm with the user before deleting.
- update_memory — Change the content of an existing memory entry. Always call search_memory first to confirm the correct ID.
- create_schedule / list_schedules / toggle_schedule / update_schedule / delete_schedule — ALL tasks, reminders, follow-ups, and one-off or recurring actions go here — not into memory.
- **NEVER say "I've set a reminder", "I've scheduled that", "Updated", or "Done" for schedule operations unless you have actually called the relevant tool in this turn.** Fabricating confirmation without a tool call is strictly forbidden.
- **To change the time or name of an existing reminder**: call list_schedules to find the job_id, then call update_schedule with the new values. Never claim it's updated without calling update_schedule.

**Memory vs Schedule — the hard rule:**
- "Always check Outlook for meetings" → store_memory (permanent rule)
- "Use this spreadsheet ID for events" → store_memory (standing reference)
- "Remind me at 6pm to call Rahul" → create_schedule only
- "Follow up with vendor about Tata show" → create_schedule only
- "Note: Kava order placed" → do NOT store anywhere — transient fact, no lasting value
- **"[action]. Task" pattern** — when the user appends "Task" or "as a task", create a schedule with schedule_type="once" at a reasonable near-future time with action_type="reminder". Do NOT store in memory.
- **Time transparency rule** — This applies to ALL create_schedule calls, whether from direct user input or as part of a chained tool flow (e.g. "check my inbox and set a reminder"). When no time was specified by the user: choose a sensible default (9:00 AM next workday for tasks; near-future for follow-ups) and explicitly state it: "Reminder set for [full date + time]. Reply 'change time' to adjust." Never silently pick a time.
- **Reminder content rule — NEVER ask what the reminder is about.** When the user says "remind me to X", "set a reminder for X", or "remind me about X", call create_schedule immediately using the user's own words as the action_description. The user's message IS the reminder — you have everything you need. Only ask for time/date if it is completely absent AND a default would not make sense. Never ask "what would you like to be reminded about?", "any details?", or any question about the reminder's content or purpose.

**Email hallucination is strictly forbidden:**
- NEVER compose email body with data you have not retrieved from a tool in this conversation.
- If the user asks you to send content you don't have (costs, figures, documents), say: "I don't have the [X] — please share it and I'll send it, or I can search your Gmail/Drive for it first."
- NEVER guess, estimate, or fabricate numbers, names, or costs in an email body.

### Google Workspace
- Sheets: read_sheet, write_sheet, append_sheet, create_sheet — formulas like =SUM(), =SUMIF() work in write_sheet/append_sheet
- Calendar: list_calendar_events, create_calendar_event
- Docs: create_doc, read_doc, append_to_doc
- Drive: drive_list, drive_search
- Gmail: gmail_list, gmail_read, gmail_search, gmail_send, gmail_draft, gmail_unread_count, gmail_modify
- If Google is not connected, tell the user: Settings → Keys → Google Workspace.
- **Resuming failed Google operations** — when the user says "try again", "retry", "save/send/create the pending [item]", or similar after reconnecting, ALWAYS call \`search_memory\` first with one of these queries before telling the user you can't proceed:
  - \`'Pending Google Doc'\` — for unsaved documents (create_doc / append_to_doc)
  - \`'Pending spreadsheet'\` or \`'Pending sheet'\` — for unsaved spreadsheets or sheet writes/appends
  - \`'Pending email'\` or \`'Pending draft'\` — for unsent emails or unsaved drafts
  - \`'Pending calendar event'\` — for unsaved calendar events
  - \`'Research:'\` — for cached research findings that can inform a retry
  Parse the JSON payload from the result, call the original tool with recovered args, then call \`delete_memory\` with the entry's \`[id:N]\` to clean up after success.
- **Multi-tab sheet progress** — when writing a sheet with multiple tabs (e.g., 3+ write_sheet calls in one task), after each successful write_sheet call store a progress note: \`store_memory(title='Sheet progress: {spreadsheet_id}', content='Completed tabs: [...]. Remaining: [...]', importance=8)\`. Update this entry after each tab. If a write fails partway, the user can retry and the agent checks \`search_memory('Sheet progress')\` to skip already-written tabs and avoid duplicates.
- **Important**: Only call store_memory for a doc or sheet if the user gives it a specific name they'll reuse (e.g. "my budget sheet", "my workout tracker"). Do NOT store one-off or generated documents — if it won't be referenced again, skip store_memory entirely. When recalling a known resource, always check memory for the ID before asking the user.
- **ALWAYS include the URL in your reply when a document or spreadsheet is created.** Format: \`Doc ready: [Title](URL)\` or \`Sheet ready: [Title](URL)\`. Never confirm creation without providing the link.
- **After ALL data is written to ALL tabs, always send a final reply.** Don't silently finish — say "Done! Here's your sheet: [Title](URL)" so the user knows it's complete.

### Spreadsheet Patterns
When creating tracked sheets (budgets, logs, inventories):
- Set up headers + formulas in the first write_sheet call
- Use =SUM(), =SUMIF(), =COUNTIF() for automatic running totals
- Example budget: headers [Date, Category, Amount(Rs), Running Total], row 2 formula: =SUM($C$2:C2) for running total
- To add entries later: use append_sheet with the remembered spreadsheet_id
- **CRITICAL: ALWAYS read_sheet BEFORE append_sheet** on existing sheets. You must:
  1. Match the exact column order from the headers
  2. Preserve formula columns — copy and increment the formula pattern from the last row
  3. Use plain numbers for amounts ("9443.95" not "₹9,443.95") — currency symbols break SUM
  4. Know the row number you're appending to (for formula references like =SUM($C$2:C6))
- To query data: use read_sheet to get all rows, then analyze/summarize the data yourself. read_sheet always returns a list of ALL tabs — if the user asks about a different month or category, use the tab name from that list (e.g., "February!A1:Z500")

### Location, Translation, YouTube
- search_places, get_place_details, get_directions, get_travel_time — places and navigation
- translate_text — 100+ languages
- search_youtube — videos, tutorials, reviews
- geocode_address — addresses to coordinates

### Document Parsing
When the user uploads or refers to a file (PDF, Word doc, spreadsheet), use **parse_document** with the file_id to read its contents. Once parsed, you can chain with any other tool: extract data → append_sheet, summarize → create_doc, etc.
- If the user uploads a file without instructions: call parse_document, then ask what they'd like to do with the content.
- For structured extraction tasks (equipment lists, expense tables, inventory): parse_document → identify structured data → append_sheet or write_sheet.
- **Multi-tab sheets from a document**: if the document has multiple sections/categories (e.g. Audio, Backline, Networking), extract ALL sections in one pass immediately after parsing. Then call create_sheet to get the spreadsheet ID. Once you have the ID, call ALL write_sheet operations in a **single turn** (batch them together). Do NOT do one tab per turn — that re-sends the full document on every turn and hits rate limits. The pattern is: parse_document → create_sheet → [single turn: write_sheet(tab1) + write_sheet(tab2) + write_sheet(tab3)] → done.
- **Merging uploaded documents**: when asked to merge two or more uploaded files into one Google Doc, call parse_document for ALL files in the **same turn** (they run in parallel). Then immediately call create_doc with the combined content in the **next turn**. Do NOT parse one file per turn — content in prior turns is trimmed from history and the full text will be lost. Pattern: [parse_document(file_1) + parse_document(file_2)] → create_doc(merged content).
- If the user shares a **Google Drive or Google Docs link**, use **drive_read_file** with the URL directly — no need to upload first. Supports Google Docs (text), Sheets (CSV), PDFs (AI extraction), and other text files.
  - For **Google Sheets via Drive**: drive_read_file returns rows as a JSON array (e.g. \`[["Name","Qty"],["Item",1]]\`). Pass that array directly as \`values\` to write_sheet — do NOT re-parse it.
  - For **PDFs via Drive**: extracted text is returned. Identify structured sections, then call write_sheet for each section/tab the same as a direct PDF upload.

### Custom Skills
You can create reusable skills using **create_skill**. A skill is a named, saveable workflow that combines tools.

**When to create a skill:**
- User says "create a skill that...", "save this as a skill", "make this repeatable"
- User performs the same multi-step workflow more than twice and it would benefit from a name

**How to create a skill:**
1. Ask 3-5 clarifying questions: What inputs does it need? What tools will it use? What should the output be? Should it save to a specific sheet or doc?
2. Call create_skill with the gathered details — write clear, executable instructions that another instance of you can follow
3. Confirm the skill name so the user knows how to invoke it

**When a custom skill tool is called** (shown as [Custom Skill] in your tool list):
- Follow the skill's instructions exactly
- Use the tools specified in the skill
- Return a clear summary of what was done

**list_skills** — shows the user all their custom skills.

### Response Style
- Be concise but human. Never robotic.
- **CRITICAL: Never respond with just "Let me check" or "I'll look into that" without calling a tool.** If the user asks you to check something, call the tool IMMEDIATELY in the same turn. Your response should contain the actual results, not a promise to look.
- Don't announce tool usage — just do it and present results naturally.
- If a tool fails, explain simply and suggest alternatives.
- When the user's request involves multiple steps, execute them all and present the combined result.
- **CRITICAL: Every multi-step action MUST end with an explicit completion reply.** Never silently finish. After all tools have run:
  - ✅ On success: confirm what was done and include any relevant links (sheet URL, doc URL, email sent to, etc.)
  - ❌ On failure: clearly state what failed, what was completed before the failure, and what the user should do next.
  - This applies to ALL workflows: sheet creation, document parsing, email chains, calendar events, reminders, Drive uploads, research tasks — everything.
- When confirming ambiguity, be brief and offer the most likely option first: "Add Uber ₹700 to your Monthly Budget?" not a long explanation.
- After the user confirms a pattern, store it and never ask about that pattern again.

## Current Date & Time
${_r(t.timezone)} (${t.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${a==="telegram"?`

## TELEGRAM CONSTRAINTS — 25-second hard limit
- **Essays / documents**: Keep written content under 400 words. Write directly from your knowledge — do NOT call web_search before writing. Call create_doc in one shot immediately.
- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).
- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use \`schedule_value\` with the exact datetime in the user's local timezone — NEVER use \`minutes_from_now\` for clock-time requests (it causes wrong times). Only use \`minutes_from_now\` for pure duration requests like "in 30 minutes" or "in 2 hours".
- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I'll now..." — just call the tool.
- **Long content intent check**: When asked to write long-form content (essay, article, report — likely over 200 words) WITHOUT a save destination specified, do NOT start writing. Ask first: "Should I save this as a Google Doc and send you the link, or write it here in chat?" Wait for the response. If Drive/Doc, call \`create_doc\` with full content and return only the link. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**`:""}`}async function ha(t,e,a){var c;const n=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${a.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${t}`}})).json();let s;((c=n.files)==null?void 0:c.length)>0?s=n.files[0].id:s=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({name:a,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${e}?fields=parents`,{headers:{Authorization:`Bearer ${t}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${e}?addParents=${s}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:s,folderName:a}}function _r(t){try{const e=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:t,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}catch{return new Date().toISOString()}}async function Dt(t,e,a,r,n,s,i,o,l,c,d,p,h){const w=Date.now();let f=!0,x="",y="";try{return y=await Kn(t,e,a,r,s,i,o,l,c,d,p,h),y}catch(T){throw f=!1,x=T.message||"Unknown error",T}finally{const T=Date.now()-w;try{await a.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(r,n.agentType||null,n.providerName||null,t,JSON.stringify(e).substring(0,2e3),(f?y:"").substring(0,500),f?1:0,x||null,T,n.isEnforcementRetry?1:0,n.channel||"web").run()}catch{}}}const ga=12e3;function Er(t){for(let e=0;e<t.length-1;e++){const a=t[e];a.role==="user"&&typeof a.content=="string"&&a.content.length>ga&&(t[e]={...a,content:a.content.substring(0,ga)+`
[...truncated in history to reduce context size]`})}}function zn(t){const e=[];let a=[],r="",n=!1,s=0;const i=t.length;for(;s<i;){const o=t[s];if(n){if(o==='"'){if(t[s+1]==='"'){r+='"',s+=2;continue}n=!1,s++;continue}r+=o,s++;continue}if(o==='"'){n=!0,s++;continue}if(o===","){a.push(r),r="",s++;continue}if(o==="\r"&&t[s+1]===`
`){a.push(r),e.push(a),a=[],r="",s+=2;continue}if(o===`
`||o==="\r"){a.push(r),e.push(a),a=[],r="",s++;continue}r+=o,s++}for((r||a.length)&&(a.push(r),e.push(a));e.length&&e[e.length-1].every(o=>o==="");)e.pop();return e}async function Kn(t,e,a,r,n,s,i,o,l,c,d,p){var w,f,x,y,T,E,C,R,$,P,B,F,H,q,D,j;const h=new ae(a);switch(t){case"create_schedule":{const u=new Date;let v;const m=c||"UTC";if(e.minutes_from_now&&typeof e.minutes_from_now=="number"&&e.minutes_from_now>0){v=new Date(u.getTime()+e.minutes_from_now*60*1e3);const I=v.toLocaleString("en-US",{timeZone:m,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[N,G,A]=(I[0]||"").split("/");e.schedule_value=`${A}-${N}-${G} ${I[1]||"00:00"}`,e.schedule_type="once"}else if(e.schedule_type==="interval"){const k=parseInt(e.schedule_value,10);v=new Date(u.getTime()+k*60*1e3)}else if(e.schedule_type==="daily"){const[k,I]=e.schedule_value.split(":").map(Number),N=u.toLocaleString("en-US",{timeZone:m}),G=new Date(N),A=new Date(G);A.setHours(k,I,0,0),A<=G&&A.setDate(A.getDate()+1);const L=new Date(A.toLocaleString("en-US",{timeZone:"UTC"})),z=new Date(A.toLocaleString("en-US",{timeZone:m})),Y=L.getTime()-z.getTime();v=new Date(A.getTime()+Y)}else if(e.schedule_type==="weekly"){const[k,I]=e.schedule_value.split(" "),[N,G]=(I||"00:00").split(":").map(Number),L=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Fe=>Fe.toLowerCase()===k.toLowerCase()),z=u.toLocaleString("en-US",{timeZone:m}),Y=new Date(z),J=new Date(Y);J.setHours(N,G,0,0);let Q=(L-J.getDay()+7)%7;Q===0&&J<=Y&&(Q=7),J.setDate(J.getDate()+Q);const V=new Date(J.toLocaleString("en-US",{timeZone:"UTC"})),se=new Date(J.toLocaleString("en-US",{timeZone:m})),ce=V.getTime()-se.getTime();v=new Date(J.getTime()+ce)}else if(e.schedule_type==="once"){const[k,I]=e.schedule_value.split(" "),[N,G,A]=k.split("-").map(Number),[L,z]=(I||"00:00").split(":").map(Number),Y=u.toLocaleString("en-US",{timeZone:m}),J=new Date(Y),Q=new Date(J);Q.setFullYear(N,G-1,A),Q.setHours(L,z,0,0);const V=new Date(Q.toLocaleString("en-US",{timeZone:"UTC"})),se=new Date(Q.toLocaleString("en-US",{timeZone:m})),ce=V.getTime()-se.getTime();v=new Date(Q.getTime()+ce);const Fe=new Date(u.getTime()+120*1e3);if(v.getTime()<u.getTime()+60*1e3){const Nt=v.toISOString();v=Fe;const nt=` [Note: The requested time ${e.schedule_value} in ${m} resolved to ${Nt} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${v.toISOString()}.]`;e._pastTimeWarning=nt}}else v=new Date(u.getTime()+3600*1e3);if(await a.prepare("SELECT id FROM cron_jobs WHERE user_id = ? AND name = ? AND schedule_type = ? AND schedule_value = ? AND state != 'completed' LIMIT 1").bind(r,e.name,e.schedule_type,e.schedule_value).first()){const k=v.toLocaleString("en-US",{timeZone:m,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule already exists: "${e.name}" is already set for ${k} (${m}). No duplicate created.`}await a.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(r,e.name,e.description||e.action_description||"",e.schedule_type,e.schedule_value,e.action_type,JSON.stringify({description:e.action_description||e.description||""}),v.toISOString()).run();const b=e._pastTimeWarning||"",S=v.toLocaleString("en-US",{timeZone:m,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${e.name}" — ${e.schedule_type}. Will fire at ${S} (${m}). [UTC: ${v.toISOString()}]${b}. IMPORTANT: Use the exact time "${S}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const v=(await a.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(r).all()).results||[];return v.length===0?"No scheduled tasks found.":v.map(m=>`[ID:${m.id}] ${m.enabled?"▶":"⏸"} "${m.name}" — [${m.schedule_type}] ${m.schedule_value} — ${m.action_type} — state: ${m.state||"active"} — next: ${m.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const u=e.enabled?1:0,v=u?"active":"paused";return await a.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,v,e.job_id,r).run(),`Schedule ${e.job_id} ${u?"enabled (active)":"paused"}.`}case"update_schedule_state":{const u=["created","active","reminding","paused","completed"],v=e.state;if(!u.includes(v))return`Invalid state "${v}". Valid states: ${u.join(", ")}`;const m=v==="completed"||v==="paused"?0:1;return await a.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(v,m,e.job_id,r).run(),`Schedule ${e.job_id} state updated to "${v}".`}case"update_schedule":{const u=e.job_id,v=c||"UTC",m=new Date,g=["updated_at = CURRENT_TIMESTAMP"],b=[];e.name&&(g.push("name = ?"),b.push(e.name)),e.description&&(g.push("description = ?"),b.push(e.description));let S=null,k=e.schedule_type,I=e.schedule_value;if(e.minutes_from_now&&typeof e.minutes_from_now=="number"&&e.minutes_from_now>0){S=new Date(m.getTime()+e.minutes_from_now*60*1e3);const A=S.toLocaleString("en-US",{timeZone:v,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[L,z,Y]=(A[0]||"").split("/");I=`${Y}-${L}-${z} ${A[1]||"00:00"}`,k="once"}else if(k&&I){if(k==="interval")S=new Date(m.getTime()+parseInt(I,10)*60*1e3);else if(k==="daily"){const[G,A]=I.split(":").map(Number),L=new Date(m.toLocaleString("en-US",{timeZone:v})),z=new Date(L);z.setHours(G,A,0,0),z<=L&&z.setDate(z.getDate()+1);const Y=new Date(z.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(z.toLocaleString("en-US",{timeZone:v})).getTime();S=new Date(z.getTime()+Y)}else if(k==="weekly"){const[G,A]=I.split(" "),[L,z]=(A||"00:00").split(":").map(Number),J=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Fe=>Fe.toLowerCase()===G.toLowerCase()),Q=new Date(m.toLocaleString("en-US",{timeZone:v})),V=new Date(Q);V.setHours(L,z,0,0);let se=(J-V.getDay()+7)%7;se===0&&V<=Q&&(se=7),V.setDate(V.getDate()+se);const ce=new Date(V.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(V.toLocaleString("en-US",{timeZone:v})).getTime();S=new Date(V.getTime()+ce)}else if(k==="once"){const[G,A]=I.split(" "),[L,z,Y]=G.split("-").map(Number),[J,Q]=(A||"00:00").split(":").map(Number),V=new Date(m.toLocaleString("en-US",{timeZone:v})),se=new Date(V);se.setFullYear(L,z-1,Y),se.setHours(J,Q,0,0);const ce=new Date(se.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(se.toLocaleString("en-US",{timeZone:v})).getTime();S=new Date(se.getTime()+ce),S.getTime()<m.getTime()+60*1e3&&(S=new Date(m.getTime()+120*1e3))}}if(k&&(g.push("schedule_type = ?"),b.push(k)),I&&(g.push("schedule_value = ?"),b.push(I)),S&&(g.push("next_run = ?"),b.push(S.toISOString())),g.length===1)return"No changes provided. Specify name, description, or schedule fields to update.";b.push(u,r),await a.prepare(`UPDATE cron_jobs SET ${g.join(", ")} WHERE id = ? AND user_id = ?`).bind(...b).run();const N=S?S.toLocaleString("en-US",{timeZone:v,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):null;return`Schedule ${u} updated.${N?` New fire time: ${N} (${v}).`:""} IMPORTANT: Use this exact time "${N}" when confirming to the user.`}case"delete_schedule":return await a.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(e.job_id,r).run(),`Schedule ${e.job_id} deleted.`;case"store_memory":{const u=e.importance||5,v=e.type==="task"?"preference":e.type,m=u>=7?"working":"long_term";return await h.store(r,v,e.title,e.content,u,m),`Stored in ${m==="working"?"working":"long-term"} memory: [${v}] ${e.title} (importance: ${u})`}case"search_memory":{const u=await h.search(r,e.query);return u.length===0?"No matching memories found.":u.map(v=>`[id:${v.id}] [${v.tier||"long_term"}] [${v.type}] **${v.title}**: ${v.content}`).join(`
`)}case"delete_memory":return await h.remove(e.id,r),`Memory entry ${e.id} deleted.`;case"update_memory":return await h.update(e.id,r,e.content),`Memory entry ${e.id} updated.`;case"get_system_status":{const u=await a.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),v=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),m=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(r).first(),g=await a.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),b=await a.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first();return`System Status:
- Active schedules: ${(u==null?void 0:u.cnt)||0}
- Memory: ${(m==null?void 0:m.cnt)||0} working / ${(v==null?void 0:v.cnt)||0} total
- Total messages: ${(g==null?void 0:g.cnt)||0}
- Unread errors: ${(b==null?void 0:b.cnt)||0}`}case"read_sheet":{if(!n)return"Authentication context unavailable.";try{const u=new ue(a,r,n,s||"",i||""),v=e.spreadsheet_id;let m=e.range;const g=await u.sheets.getMetadata(v),b=g.sheets;m.includes("!")||(m=`${b[0]}!${m}`);let S;try{S=await u.sheets.readRange(v,m)}catch(I){if((w=I.message)!=null&&w.includes("Unable to parse range")||(f=I.message)!=null&&f.includes("400")){const N=m.includes("!")?m.split("!")[1]:m;m=`${b[0]}!${N}`,S=await u.sheets.readRange(v,m)}else throw I}let k=`[Spreadsheet: "${g.title}" | Reading tab: "${m.split("!")[0]}" | All tabs in this spreadsheet: ${b.map(I=>`"${I}"`).join(", ")}]
`;return b.length>1&&(k+=`[To read a different tab, call read_sheet again with range like "${b[1]}!A1:Z500"]
`),S.length===0?k+"No data found in the specified range.":k+S.map(I=>I.join("	| ")).join(`
`)}catch(u){return await U(a,r,"google","read_sheet",u.message),`Failed to read sheet: ${u.message}`}}case"write_sheet":{if(!n)return"Authentication context unavailable.";try{const u=new ue(a,r,n,s||"",i||"");if(!(await u.isConnected()).connected){if(e.spreadsheet_id&&e.range&&e.values)try{const A=new ae(a),L=JSON.stringify(e.values);await A.store(r,"context",`Pending sheet write: ${e.spreadsheet_id} — ${e.range}`,JSON.stringify({tool:"write_sheet",spreadsheet_id:e.spreadsheet_id,range:e.range,values:L.length>15e3?"[[truncated — re-provide values on retry]]":e.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(e.spreadsheet_id&&e.range?`

The sheet write has been saved to temporary memory. After reconnecting, tell me "write the pending sheet data" to complete this.`:"")}const m=e.values;let g=e.range;const k=Math.max(...m.map(A=>A.length))+4,I=m.map(A=>{const L=[...A];for(;L.length<k;)L.push("");return L}),N=g.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(N){const A=N[1]||"",L=N[2],z=N[3],Y=N[5],Q=L.toUpperCase().charCodeAt(0)-64+k-1,V=Q<=26?String.fromCharCode(64+Q):"Z";g=`${A}${L}${z}:${V}${Y}`}return`Written ${(await u.sheets.writeRange(e.spreadsheet_id,g,I)).updatedCells} cells to ${g}.`}catch(u){return await U(a,r,"google","write_sheet",u.message),`Failed to write sheet: ${u.message}`}}case"append_sheet":{if(!n)return"Authentication context unavailable.";try{const u=new ue(a,r,n,s||"",i||"");if(!(await u.isConnected()).connected){if(e.spreadsheet_id&&e.range&&e.values)try{await new ae(a).store(r,"context",`Pending sheet append: ${e.spreadsheet_id} — ${e.range}`,JSON.stringify({tool:"append_sheet",spreadsheet_id:e.spreadsheet_id,range:e.range,values:e.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(e.spreadsheet_id&&e.range?`

The append data has been saved to temporary memory. After reconnecting, tell me "append the pending sheet data" to complete this.`:"")}return`Appended ${(await u.sheets.appendRows(e.spreadsheet_id,e.range,e.values)).updatedCells} cells to ${e.range}.`}catch(u){return await U(a,r,"google","append_sheet",u.message),`Failed to append to sheet: ${u.message}`}}case"create_sheet":{if(!n)return"Authentication context unavailable.";try{const u=new ue(a,r,n,s||"",i||"");if(!(await u.isConnected()).connected){if(e.title)try{await new ae(a).store(r,"context",`Pending spreadsheet create: "${e.title}"`,JSON.stringify({tool:"create_sheet",title:e.title,sheet_names:e.sheet_names??null,folder_name:e.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(e.title?`

The spreadsheet request has been saved to temporary memory. After reconnecting, tell me "create the pending spreadsheet" and I'll complete this automatically.`:"")}const m=await u.sheets.createSpreadsheet(e.title,e.sheet_names);let g="";if(e.folder_name)try{const{token:b}=await(await Promise.resolve().then(()=>lt)).getGoogleAuth(a,r,n,s||"",i||"");g=`
Folder: "${(await ha(b,m.spreadsheetId,e.folder_name)).folderName}"`}catch(b){g=`
(Could not move to folder "${e.folder_name}": ${b.message})`}try{await new ae(a).store(r,"context",`Spreadsheet: ${e.title}`,`Spreadsheet ID: ${m.spreadsheetId} | URL: ${m.url} | Sheets: ${(e.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${e.title}"${g}
ID: ${m.spreadsheetId}
URL: ${m.url}`}catch(u){return await U(a,r,"google","create_sheet",u.message),`Failed to create spreadsheet: ${u.message}`}}case"list_calendar_events":{if(!n)return"Authentication context unavailable.";try{const u=new ue(a,r,n,s||"",i||""),v=e.calendar_id||"primary",m=e.days_ahead||7,g=new Date,b=new Date(g.getTime()+m*24*60*60*1e3),S=await u.calendar.listEvents(v,{timeMin:g.toISOString(),timeMax:b.toISOString(),query:e.query});return S.length===0?`No events found in the next ${m} days.`:S.map(k=>{var L;const I=k.start.dateTime||k.start.date||"TBD",N=k.end.dateTime||k.end.date||"",G=k.location?` 📍 ${k.location}`:"",A=((L=k.attendees)==null?void 0:L.map(z=>z.email).join(", "))||"";return`• ${k.summary} — ${I} to ${N}${G}${A?`
  Attendees: ${A}`:""}`}).join(`
`)}catch(u){return await U(a,r,"google","list_calendar",u.message),`Failed to list events: ${u.message}`}}case"create_calendar_event":{if(!n)return"Authentication context unavailable.";try{const u=new ue(a,r,n,s||"",i||"");if(!(await u.isConnected()).connected){if(e.summary&&e.start_datetime&&e.end_datetime)try{await new ae(a).store(r,"context",`Pending calendar event: "${e.summary}"`,JSON.stringify({tool:"create_calendar_event",summary:e.summary,description:e.description??null,location:e.location??null,start_datetime:e.start_datetime,end_datetime:e.end_datetime,attendees:e.attendees??null,calendar_id:e.calendar_id??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(e.summary&&e.start_datetime?`

The calendar event has been saved to temporary memory. After reconnecting, tell me "create the pending event" and I'll add it to your calendar.`:"")}const m=e.calendar_id||"primary",g=await u.calendar.createEvent(m,{summary:e.summary,description:e.description,location:e.location,startDateTime:e.start_datetime,endDateTime:e.end_datetime,attendees:e.attendees});return`Event created: "${g.summary}"
ID: ${g.id}
Start: ${g.start.dateTime||g.start.date}`}catch(u){return await U(a,r,"google","create_event",u.message),`Failed to create event: ${u.message}`}}case"create_doc":{if(!n)return"Authentication context unavailable.";const u=new ue(a,r,n,s||"",i||"");if(!(await u.isConnected()).connected){if(e.title&&e.content)try{await new ae(a).store(r,"context",`Pending Google Doc save: "${e.title}"`,JSON.stringify({tool:"create_doc",title:e.title,content:e.content,folder_name:e.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(e.title&&e.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" and I'll complete this automatically.`:"")}let m;try{m=await u.docs.createDocument(e.title)}catch(b){return await U(a,r,"google","create_doc",b.message),`Failed to create document: ${b.message}`}if(e.content)try{await u.docs.appendText(m.documentId,e.content)}catch(b){return await U(a,r,"google","create_doc_append",b.message),`Document created but content could not be written (${b.message}).
ID: ${m.documentId}
URL: ${m.url}

Use append_to_doc with the document ID above to add content.`}let g="";if(e.folder_name)try{const{token:b}=await(await Promise.resolve().then(()=>lt)).getGoogleAuth(a,r,n,s||"",i||"");g=`
Folder: "${(await ha(b,m.documentId,e.folder_name)).folderName}"`}catch(b){g=`
(Could not move to folder "${e.folder_name}": ${b.message})`}try{await new ae(a).store(r,"context",`Document: ${e.title}`,`Document ID: ${m.documentId} | URL: ${m.url}`,6,"working")}catch{}return`Document created: "${e.title}"${g}
ID: ${m.documentId}
URL: ${m.url}`}case"read_doc":{if(!n)return"Authentication context unavailable.";try{const v=await new ue(a,r,n,s||"",i||"").docs.readDocument(e.document_id);return`Document: "${v.title}"

${v.content}`}catch(u){return await U(a,r,"google","read_doc",u.message),`Failed to read document: ${u.message}`}}case"append_to_doc":{if(!n)return"Authentication context unavailable.";try{const u=new ue(a,r,n,s||"",i||"");if(!(await u.isConnected()).connected){if(e.document_id&&e.content)try{await new ae(a).store(r,"context",`Pending append to doc: "${e.document_id}"`,JSON.stringify({tool:"append_to_doc",document_id:e.document_id,content:e.content}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.'+(e.document_id&&e.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" to complete this.`:"")}await u.docs.appendText(e.document_id,e.content);let m=e.document_id;try{m=(await u.docs.readDocument(e.document_id)).title}catch{}return`Content appended to "${m}".
URL: https://docs.google.com/document/d/${e.document_id}/edit`}catch(u){return await U(a,r,"google","append_to_doc",u.message),`Failed to append to document: ${u.message}`}}case"gmail_list":{if(!n)return"Authentication context unavailable.";try{const v=await new we(a,r,n,s||"",i||"").listMessages({maxResults:e.max_results||10,query:e.query});return v.length===0?"No messages found.":v.map((m,g)=>`${m.isUnread?"● ":"  "}${g+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(u){return await U(a,r,"gmail","list",u.message),(x=u.message)!=null&&x.includes("not connected")?u.message:`Gmail list error: ${u.message}`}}case"gmail_read":{if(!n)return"Authentication context unavailable.";try{const u=new we(a,r,n,s||"",i||""),v=await u.getMessage(e.message_id);if(!v)return"Message not found.";const m=await u.getMessageBody(e.message_id);return`**${v.subject}**
From: ${v.from}
To: ${v.to}
Date: ${v.date}

${m}`}catch(u){return await U(a,r,"gmail","read",u.message),`Gmail read error: ${u.message}`}}case"gmail_search":{if(!n)return"Authentication context unavailable.";try{const v=await new we(a,r,n,s||"",i||"").search(e.query,e.max_results||10);return v.length===0?`No results for: ${e.query}`:v.map((m,g)=>`${m.isUnread?"● ":"  "}${g+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(u){return await U(a,r,"gmail","search",u.message),`Gmail search error: ${u.message}`}}case"gmail_send":{if(!n)return"Authentication context unavailable.";try{const u=new we(a,r,n,s||"",i||"");if(!(await new ue(a,r,n,s||"",i||"").isConnected()).connected){if(e.to&&e.subject&&e.body)try{await new ae(a).store(r,"context",`Pending email: "${e.subject}"`,JSON.stringify({tool:"gmail_send",to:e.to,subject:e.subject,body:e.body,cc:e.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(e.to&&e.subject&&e.body?`

Your email has been saved to temporary memory. After reconnecting, tell me "send the pending email" and I'll send it automatically.`:"")}const g=await u.send(e.to,e.subject,e.body,{cc:e.cc});return`Email sent successfully to ${e.to}. Subject: "${e.subject}" [Message ID: ${g.id}]`}catch(u){return await U(a,r,"gmail","send",u.message),`Gmail send error: ${u.message}`}}case"gmail_draft":{if(!n)return"Authentication context unavailable.";try{const u=new we(a,r,n,s||"",i||"");if(!(await new ue(a,r,n,s||"",i||"").isConnected()).connected){if(e.to&&e.subject&&e.body)try{await new ae(a).store(r,"context",`Pending draft: "${e.subject}"`,JSON.stringify({tool:"gmail_draft",to:e.to,subject:e.subject,body:e.body,cc:e.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(e.to&&e.subject&&e.body?`

Your draft has been saved to temporary memory. After reconnecting, tell me "create the pending draft" and I'll save it to Gmail.`:"")}const g=await u.createDraft(e.to,e.subject,e.body,{cc:e.cc}),b=e.cc?`, CC: ${e.cc}`:"";return`Draft created. To: ${e.to}${b}, Subject: "${e.subject}" — Review and send from Gmail. [Draft ID: ${g.id}]`}catch(u){return await U(a,r,"gmail","draft",u.message),`Gmail draft error: ${u.message}`}}case"gmail_modify":{if(!n)return"Authentication context unavailable.";try{return await new we(a,r,n,s||"",i||"").modifyMessage(e.message_id,e.action),`Message ${e.message_id} successfully ${e.action}ed.`}catch(u){return await U(a,r,"gmail","modify",u.message),`Gmail modify error: ${u.message}`}}case"gmail_unread_count":{if(!n)return"Authentication context unavailable.";try{const v=await new we(a,r,n,s||"",i||"").getUnreadCount();return`You have ${v} unread email${v!==1?"s":""} in Gmail.`}catch(u){return(y=u.message)!=null&&y.includes("not connected")?u.message:`Gmail error: ${u.message}`}}case"drive_list":{if(!n)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>lt)).getGoogleAuth(a,r,n,s||"",i||""),v=new URLSearchParams;v.set("pageSize",String(e.max_results||10)),v.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),v.set("orderBy","modifiedTime desc");let m="";e.folder_id?m=`'${e.folder_id}' in parents and trashed = false`:e.query?m=`${e.query} and trashed = false`:m="trashed = false",v.set("q",m);const g=await fetch(`https://www.googleapis.com/drive/v3/files?${v}`,{headers:{Authorization:`Bearer ${u}`}});if(!g.ok)throw new Error(`Drive API error (${g.status})`);const b=await g.json();return(T=b.files)!=null&&T.length?b.files.map((S,k)=>{var A,L;const I=((A=S.mimeType)==null?void 0:A.split(".").pop())||S.mimeType,N=S.size?`${(parseInt(S.size)/1024).toFixed(1)} KB`:"",G=((L=S.modifiedTime)==null?void 0:L.split("T")[0])||"";return`${k+1}. **${S.name}** (${I})
   ${N} · Modified: ${G}
   ${S.webViewLink||""}`}).join(`

`):"No files found."}catch(u){return await U(a,r,"google","drive_list",u.message),`Drive list error: ${u.message}`}}case"drive_search":{if(!n)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>lt)).getGoogleAuth(a,r,n,s||"",i||""),v=`fullText contains '${e.query.replace(/'/g,"\\'")}' and trashed = false`,m=new URLSearchParams;m.set("q",v),m.set("pageSize",String(e.max_results||10)),m.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),m.set("orderBy","modifiedTime desc");const g=await fetch(`https://www.googleapis.com/drive/v3/files?${m}`,{headers:{Authorization:`Bearer ${u}`}});if(!g.ok)throw new Error(`Drive API error (${g.status})`);const b=await g.json();return(E=b.files)!=null&&E.length?b.files.map((S,k)=>{var G,A;const I=((G=S.mimeType)==null?void 0:G.split(".").pop())||S.mimeType,N=((A=S.modifiedTime)==null?void 0:A.split("T")[0])||"";return`${k+1}. **${S.name}** (${I}) — Modified: ${N}
   ${S.webViewLink||""}`}).join(`

`):`No files found for: "${e.query}"`}catch(u){return await U(a,r,"google","drive_search",u.message),`Drive search error: ${u.message}`}}case"drive_read_file":{if(!n)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>lt)).getGoogleAuth(a,r,n,s||"",i||""),v=e.url_or_id.trim();let m=v;const g=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/\/presentation\/d\/([a-zA-Z0-9_-]+)/,/\/forms\/d\/([a-zA-Z0-9_-]+)/,/[?&]id=([a-zA-Z0-9_-]+)/,/\/d\/([a-zA-Z0-9_-]+)/];for(const Y of g){const J=v.match(Y);if(J){m=J[1];break}}const b=await fetch(`https://www.googleapis.com/drive/v3/files/${m}?fields=id,name,mimeType,size`,{headers:{Authorization:`Bearer ${u}`}});if(!b.ok)throw new Error(`Drive API error (${b.status}): could not fetch file metadata`);const S=await b.json(),{name:k,mimeType:I}=S,N=e.extract_focus,G=N?`Focus specifically on extracting: ${N}`:"Extract and return all readable text content. Preserve structure where relevant.",A={"application/vnd.google-apps.document":"text/plain","application/vnd.google-apps.spreadsheet":"text/csv","application/vnd.google-apps.presentation":"text/plain"};if(A[I]){const Y=A[I],J=await fetch(`https://www.googleapis.com/drive/v3/files/${m}/export?mimeType=${encodeURIComponent(Y)}`,{headers:{Authorization:`Bearer ${u}`}});if(!J.ok)throw new Error(`Drive export error (${J.status})`);const Q=await J.text();if(I==="application/vnd.google-apps.spreadsheet"){const V=zn(Q),se=V.length,ce=((C=V[0])==null?void 0:C.length)??0;return`**${k}** (Google Sheet — ${se} rows × ${ce} columns)

Parsed rows (JSON, ready for write_sheet/append_sheet):
${JSON.stringify(V)}`}return`**${k}**

${Q.substring(0,2e4)}`}if(I==="application/pdf"||k.toLowerCase().endsWith(".pdf")){const Y=await fetch(`https://www.googleapis.com/drive/v3/files/${m}?alt=media`,{headers:{Authorization:`Bearer ${u}`}});if(!Y.ok)throw new Error(`Drive download error (${Y.status})`);const J=await Y.arrayBuffer(),Q=Buffer.from(J).toString("base64");let V=null,se="claude-haiku-4-5-20251001";for(const nt of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const aa=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,nt).first();if(aa&&n){const Nr=await X(aa.encrypted_value,n),_t=JSON.parse(Nr);if(_t.provider==="anthropic"){V=_t.apiKey,_t.model&&(se=_t.model);break}}}catch{}if(!V)return`"${k}" is a PDF. An Anthropic API key is required to extract PDF content. Please configure one in Settings → Keys.`;const ce=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":V,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:se,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:Q}},{type:"text",text:G}]}]})});if(!ce.ok){const nt=await ce.text();throw new Error(`Anthropic PDF extraction error: ${nt.substring(0,200)}`)}const Nt=(($=(R=(await ce.json()).content)==null?void 0:R[0])==null?void 0:$.text)||"";return`**${k}** (PDF from Drive)

${Nt}`}const L=await fetch(`https://www.googleapis.com/drive/v3/files/${m}?alt=media`,{headers:{Authorization:`Bearer ${u}`}});if(!L.ok)throw new Error(`Drive download error (${L.status})`);const z=await L.text();return`**${k}** (${I})

${z.substring(0,2e4)}`}catch(u){return await U(a,r,"google","drive_read_file",u.message),`Drive read error: ${u.message}`}}case"web_search":try{const u=await Rt(e.query,{num:e.num_results||5,site:e.site});return u.error?`Web search failed: ${u.error}. Answer this question directly from your training knowledge and clearly state you are doing so.`:u.results.length===0?`Web search returned no results for "${e.query}". Answer this question directly from your training knowledge and clearly state you are doing so instead of searching.`:u.results.map((v,m)=>`${m+1}. **${v.title}**
   ${v.link}
   ${v.snippet}`).join(`

`)}catch(u){return await U(a,r,"search","web_search",u.message),`Web search error: ${u.message}`}case"read_url":try{const u=e.url;if(!u||!u.startsWith("http://")&&!u.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const v=Math.min(e.max_length||8e3,15e3),{fetchPageContent:m}=await Promise.resolve().then(()=>Un),g=await m(u,v);return g.error?`Failed to read page: ${g.error}`:!g.text||g.text.length<20?`Page at ${u} returned no readable content.`:`Content from ${u} (${g.text.length} chars):

${g.text}`}catch(u){return await U(a,r,"search","read_url",u.message),`Read URL error: ${u.message}`}case"research":{if(!d)return"Research tool requires an LLM provider but none is available.";try{let u;try{const k=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"perplexity_api_key").first();k&&n&&(u=await X(k.encrypted_value,n))}catch{}const v=2e4,m=gr(e.query,d,{depth:e.depth||"quick",site:e.site,perplexityApiKey:u}),g=new Promise(k=>setTimeout(()=>k(null),v)),b=await Promise.race([m,g]);if(b===null){const{webSearch:k}=await Promise.resolve().then(()=>An),I=await k(e.query,{num:5});if(I.error||I.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let N=`Research took too long, but here are the top search results:

`;return N+=I.results.map((G,A)=>`${A+1}. **${G.title}**
   ${G.snippet}
   ${G.link}`).join(`

`),N}if(b.error)return`Research failed: ${b.error}`;let S=b.report;b.sources.length>0&&(S+=`

---
**Sources** (`+b.pagesRead+` pages read):
`,S+=b.sources.map((k,I)=>`[${I+1}] ${k.title}
    ${k.url}`).join(`
`));try{const k=new ae(a),I=b.report.substring(0,600);await k.store(r,"context",`Research: ${e.query.substring(0,80)}`,I,6,"long_term")}catch{}return S}catch(u){return await U(a,r,"research","research",u.message),`Research error: ${u.message}`}}case"search_places":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const v=await X(u.encrypted_value,n),m=await ir(v,e.query,{type:e.type});return m.error?`Places search failed: ${m.error}`:m.results.length===0?`No places found for "${e.query}".`:m.results.map((g,b)=>{const S=g.rating?` ★${g.rating} (${g.userRatingsTotal||0} reviews)`:"",k=g.openNow!==void 0?g.openNow?" · Open now":" · Closed":"",I=g.googleMapsUri?`
   ${g.googleMapsUri}`:"";return`${b+1}. **${g.name}**${S}${k}
   ${g.address}${I}
   [place_id: ${g.placeId}]`}).join(`

`)}catch(u){return await U(a,r,"google_api","search_places",u.message),`Places search error: ${u.message}`}}case"get_place_details":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await X(u.encrypted_value,n),m=await or(v,e.place_id);if(m.error)return`Details lookup failed: ${m.error}`;if(!m.details)return"No details found.";const g=m.details;let b=`**${g.name}**
📍 ${g.address}`;if(g.phone&&(b+=`
📞 ${g.phone}`),g.website&&(b+=`
🌐 ${g.website}`),g.rating&&(b+=`
★ ${g.rating}`),g.googleMapsUri&&(b+=`
📌 ${g.googleMapsUri}`),g.openingHours&&(b+=`

Opening Hours:
${g.openingHours.join(`
`)}`),g.reviews&&g.reviews.length>0){b+=`

Recent Reviews:`;for(const S of g.reviews)b+=`
— ${S.author} (★${S.rating}, ${S.time}): "${S.text}"`}return b}catch(u){return await U(a,r,"google_api","place_details",u.message),`Place details error: ${u.message}`}}case"get_directions":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await X(u.encrypted_value,n),m=await lr(v,e.origin,e.destination,{mode:e.mode||"driving"});if(m.error)return`Directions failed: ${m.error}`;if(!m.route)return"No route found.";const g=m.route;let b=`**${g.startAddress}** → **${g.endAddress}**
`;return b+=`📏 ${g.distance} · ⏱️ ${g.duration}`,g.durationInTraffic&&(b+=` (with traffic: ${g.durationInTraffic})`),b+=`
via ${g.summary}`,b+=`

Steps:`,g.steps.forEach((S,k)=>{b+=`
${k+1}. ${S.instruction} (${S.distance}, ${S.duration})`}),b}catch(u){return await U(a,r,"google_api","directions",u.message),`Directions error: ${u.message}`}}case"get_travel_time":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await X(u.encrypted_value,n),m=await pr(v,e.origin,e.destination,e.mode||"driving");if(m.error)return`Travel time lookup failed: ${m.error}`;let g=`${e.origin} → ${e.destination}: ${m.distance}, ${m.duration}`;return m.durationInTraffic&&(g+=` (with traffic: ${m.durationInTraffic})`),g}catch(u){return await U(a,r,"google_api","travel_time",u.message),`Travel time error: ${u.message}`}}case"translate_text":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await X(u.encrypted_value,n),m=await cr(v,e.text,e.target_language,e.source_language);return m.error?`Translation failed: ${m.error}`:`[${m.detectedSourceLang||e.source_language||"auto"} → ${e.target_language}]

${m.translatedText}`}catch(u){return await U(a,r,"google_api","translate",u.message),`Translation error: ${u.message}`}}case"search_youtube":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await X(u.encrypted_value,n),m=await ur(v,e.query,{maxResults:e.max_results||5,order:e.order||"relevance"});return m.error?`YouTube search failed: ${m.error}`:m.results.length===0?`No YouTube results for "${e.query}".`:m.results.map((g,b)=>{var S;return`${b+1}. **${g.title}**
   ${g.channelTitle} · ${((S=g.publishedAt)==null?void 0:S.split("T")[0])||""}
   ${g.description}
   ${g.url}`}).join(`

`)}catch(u){return await U(a,r,"google_api","youtube_search",u.message),`YouTube search error: ${u.message}`}}case"geocode_address":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await X(u.encrypted_value,n),m=await dr(v,e.address);return m.error?`Geocoding failed: ${m.error}`:m.results.length===0?`Location not found: "${e.address}"`:m.results.map((g,b)=>`${b+1}. ${g.address}
   Coordinates: ${g.lat}, ${g.lng}`).join(`
`)}catch(u){return await U(a,r,"google_api","geocode",u.message),`Geocoding error: ${u.message}`}}case"parse_document":{const u=e.file_id,v=e.extract_focus;if(!u)return"file_id is required to parse a document.";const m=await a.prepare("SELECT file_name, file_type, file_data, file_size, extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(u,r).first();if(!m)return"File not found. The file may have expired or the file_id is incorrect.";if(m.extracted_text)return`Document: ${m.file_name}

${m.extracted_text}`;const{file_name:g,file_type:b}=m;let{file_data:S}=m;if(S==="r2"){if(!p)return`File "${g}" is stored in R2 but no storage bucket is configured.`;const k=await p.get(u);if(!k)return`File "${g}" not found in storage. It may have been deleted.`;const I=await k.arrayBuffer();S=Buffer.from(I).toString("base64")}if(b.startsWith("text/"))try{const k=Buffer.from(S,"base64").toString("utf-8");return`Document: ${g}

${k.substring(0,2e4)}`}catch{return`Could not decode text file: ${g}`}if(b==="application/pdf"||b==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||g.toLowerCase().endsWith(".pdf")||g.toLowerCase().endsWith(".docx")){if(b==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||g.toLowerCase().endsWith(".docx")){try{const N=await fr(Buffer.from(S,"base64"));if(N.length>50)return`Document: ${g}

${N.substring(0,2e4)}`}catch{}return`Could not extract text from "${g}". Try uploading to Google Drive and sharing the link — Drive can open and export Word documents directly.`}let k=null,I="claude-haiku-4-5-20251001";for(const N of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const G=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,N).first();if(G&&n){const A=await X(G.encrypted_value,n),L=JSON.parse(A);if(L.provider==="anthropic"){k=L.apiKey,L.model&&(I=L.model);break}}}catch{}if(k)try{const N=v?`Focus specifically on extracting: ${v}`:"Extract and return all readable text content from this document. Preserve structure where relevant.",G=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":k,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:I,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:S}},{type:"text",text:N}]}]})});if(G.ok){const L=((B=(P=(await G.json()).content)==null?void 0:P[0])==null?void 0:B.text)||"";return`Document: ${g}

${L}`}else{const A=await G.text();return`Could not parse ${g} via Anthropic API: ${A.substring(0,200)}`}}catch(N){return`Document parsing error for ${g}: ${N.message}`}return"To parse PDF documents, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set."}try{const k=Buffer.from(S,"base64").toString("utf-8").substring(0,2e3);return`Document: ${g} (${b})

Content preview:
${k}`}catch{return`Cannot read file: ${g} (${b})`}}case"create_skill":{const u=(F=e.name)==null?void 0:F.trim(),v=(H=e.description)==null?void 0:H.trim(),m=(q=e.instructions)==null?void 0:q.trim();if(!u||!v||!m)return"create_skill requires name, description, and instructions.";let g=u.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"");g||(g=`skill_${Date.now()}`);const b=await a.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(r,`${g}%`).all();(D=b.results)!=null&&D.some(N=>N.slug===g)&&(g=`${g}_${(((j=b.results)==null?void 0:j.length)||0)+1}`);const S=JSON.stringify(e.parameters||{}),k=JSON.stringify(e.required_tools||[]),I=JSON.stringify(e.examples||[]);return await a.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(r,u,g,v,m,S,k,I).run(),`Skill created: **${u}** (invoke as: "${g}")

You can now ask me to run "${u}" at any time. The skill will appear in Settings → Skills. You can also say "run my ${u} skill" to execute it.`}case"list_skills":{const v=e.include_disabled===!0?"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? ORDER BY created_at DESC":"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC",g=(await a.prepare(v).bind(r).all()).results||[];if(g.length===0)return`You haven't created any custom skills yet. Ask me to create one: "Create a skill that..."`;const b=g.map(S=>`• **${S.name}** (${S.slug}): ${S.description} [used ${S.usage_count} times${S.enabled?"":" — disabled"}]`).join(`
`);return`Your custom skills (${g.length}):

${b}`}default:{const u=t,v=await a.prepare("SELECT id, name, description, instructions, required_tools FROM user_skills WHERE user_id = ? AND slug = ? AND enabled = 1").bind(r,u).first();if(v){await a.prepare("UPDATE user_skills SET usage_count = usage_count + 1, last_used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(v.id).run();const m=(()=>{try{return JSON.parse(v.required_tools).join(", ")}catch{return""}})(),g=Object.keys(e).length>0?`

Inputs provided: ${JSON.stringify(e)}`:"";return`[SKILL: ${v.name}] Follow these instructions exactly:

${v.instructions}${g}

${m?`Tools to use: ${m}`:""}

Execute the steps above using your available tools. When complete, provide a clear summary of what was done and any results.`}return`Unknown tool: ${t}`}}}async function Tr(t,e,a,r,n){if(e.length>0&&e[e.length-1].role==="user"){const s="(Previous request did not complete. Please try again.)";await t.storeMessage(a,r,"assistant",s,"{}",n),e.push({id:-1,user_id:a,channel:r,role:"assistant",content:s,metadata:"{}",token_estimate:s.length,created_at:new Date().toISOString()})}}function xr(t){for(let e=t.length-1;e>=0;e--)if(t[e].role==="assistant"){const a=typeof t[e].content=="string"?t[e].content:"";a.length<300&&/^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(a.trim())&&(t[e]={...t[e],content:"(My previous response was cut off before completing. Starting fresh.)"});break}}async function fa(t,e,a,r,n,s,i){var q,D,j,u,v;const o=new ae(e),l=(q=t.metadata)==null?void 0:q.thread_id,c=Date.now(),[d,p]=await Promise.all([o.buildContext(r.id),ea(e,r.id)]),h=await o.getRecentConversations(r.id,30,l);await Tr(o,h,r.id,t.channel,l);const w=br(r,d,t.channel,p),f=wr([{role:"system",content:w},...h.map(m=>({role:m.role,content:m.content})),{role:"user",content:t.text}]);xr(f);const x=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],y=(d.match(/^- /gm)||[]).length;if(x.some(m=>m.test(t.text))||y<3)try{const m=await o.searchLongTerm(r.id,t.text,5);if(m.length>0){const g=m.map(b=>`- [${b.type}] ${b.title}: ${b.content}`).join(`
`);f.splice(f.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${g}]`})}}catch{}await o.storeMessage(r.id,t.channel,"user",t.text,"{}",l);const E=(i==null?void 0:i.maxTurns)??10,C=(i==null?void 0:i.tools)??await Qt(e,r.id);let R="",$=0;const P=[];for(let m=0;m<E;m++)try{m>0&&Er(f);const g=await a.chat(f,{tools:C});if(g.usage&&($+=g.usage.promptTokens+g.usage.completionTokens),g.toolCalls&&g.toolCalls.length>0){const b=g.content||`[calling: ${g.toolCalls.map(k=>k.name).join(", ")}]`;f.push({role:"assistant",content:b});for(const k of g.toolCalls)P.push(k.name);const S=await Promise.all(g.toolCalls.map(async k=>{try{const I=await Dt(k.name,k.arguments,e,r.id,{agentType:"full",providerName:a.name,channel:t.channel},r.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,r.timezone,a,s==null?void 0:s.DOCUMENTS_BUCKET),N=["parse_document","drive_read_file"].includes(k.name)?2e4:8e3,G=I.length>N?I.substring(0,N)+`
[...result truncated to prevent token limit — full content was extracted]`:I;return`[Tool Result for ${k.name}]: ${G}`}catch(I){return await U(e,r.id,"tool",k.name,I.message||"Tool execution failed"),`[Tool Error for ${k.name}]: ${I.message||"Execution failed"}`}}));f.push({role:"user",content:S.join(`

`)});continue}R=g.content;break}catch(g){if(n){const b=g.message||"",S=b.includes("401")||b.includes("403")||b.includes("authentication")||b.includes("credit balance"),k=b.includes("429"),I=S?1440:k?10:5;await n.recordError(a.name,b,I)}throw await U(e,r.id,"llm","provider_error",g.message||"Unknown LLM error",{provider:a.name,turn:m}),g}if(R=(R==null?void 0:R.trim())??"",!R)try{((D=f[f.length-1])==null?void 0:D.role)==="user"&&f.push({role:"assistant",content:"[gathering results]"}),f.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),R=(await a.chat(f,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me directly and I will answer from my knowledge."}catch{R="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge."}if(n&&$>0)try{await n.recordUsage(a.name,$)}catch{}try{await e.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(r.id,a.name,"full",$,Date.now()-c,1,t.channel).run()}catch{}const B=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your|the)\s+(sheet|spreadsheet))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"}];for(const m of B){const g=m.claimPattern.test(R),b=m.requiredTools.some(S=>P.includes(S));if(g&&!b){try{await U(e,r.id,"llm",m.logType,"LLM claimed action without tool call",{response:R.substring(0,200)}),f.push({role:"assistant",content:R}),f.push({role:"user",content:m.enforcementMsg});const S=await a.chat(f,{tools:C.filter(k=>m.requiredTools.includes(k.name)),temperature:0});if((j=S.toolCalls)!=null&&j.length){for(const I of S.toolCalls){const N=await Dt(I.name,I.arguments,e,r.id,{agentType:"full",providerName:a.name,channel:t.channel},r.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,r.timezone,a,s==null?void 0:s.DOCUMENTS_BUCKET);P.push(I.name),f.push({role:"assistant",content:null,toolCalls:S.toolCalls}),f.push({role:"user",content:N})}const k=await a.chat(f,{tools:[]});k.content&&(R=k.content)}else R="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}let F=R.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim();if(!F&&P.length>0){const m=[...new Set(P)].join(", ");try{((u=f[f.length-1])==null?void 0:u.role)==="user"&&f.push({role:"assistant",content:"[completed tools]"}),f.push({role:"user",content:"Please summarise what you just did and provide the result to the user."}),F=((v=(await a.chat(f,{tools:[]})).content)==null?void 0:v.trim())||`Done. I used the following tools: ${m}.`}catch{F=`Done. I used the following tools: ${m}.`}}const H=P.length>0?`[TOOLS_USED: ${[...new Set(P)].join(", ")}] `:"";await o.storeMessage(r.id,t.channel,"assistant",H+F,"{}",l),await o.compactHistory(r.id,30);try{const m=await e.prepare("SELECT COUNT(*) as c FROM conversations WHERE user_id = ? AND role = ?").bind(r.id,"assistant").first();m&&m.c%5===0&&m.c>0&&await Promise.race([Yn(e,a,r,o,f),new Promise(g=>setTimeout(g,5e3))])}catch{}return F}async function Yn(t,e,a,r,n){var d;const s=n.filter(p=>p.role!=="system").slice(-10);if(s.length<4)return;const o=[{role:"system",content:`Review this conversation and extract any information worth remembering long-term.
Only extract genuinely durable information — things that will still be relevant in future conversations.
Good examples: addresses, phone numbers, account IDs, spreadsheet IDs, document links, explicit preferences, recurring needs, key decisions.
Bad examples: temporary topics, one-off requests, information already in the system prompt.

For each item, output a line: TYPE|TITLE|CONTENT|IMPORTANCE
Types: fact, preference, context, decision
Importance: 1-10 (8+ = standing rules, 5-7 = regular facts)
If nothing worth extracting, output: NONE`},...s,{role:"user",content:"Extract durable information from the above conversation."}],c=((d=(await e.chat(o,{tools:[]})).content)==null?void 0:d.trim())||"";if(!(!c||c==="NONE"))for(const p of c.split(`
`)){const h=p.trim().split("|");if(h.length<4)continue;const[w,f,x,y]=h,T=["fact","preference","context","decision","summary","task"].find(C=>C===w.trim().toLowerCase());if(!T||!(f!=null&&f.trim())||!(x!=null&&x.trim()))continue;const E=Math.min(10,Math.max(1,parseInt(y)||5));await r.store(a.id,T,f.trim(),x.trim(),E,"long_term")}}const ya={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function Jn(t){for(const[e,a]of Object.entries(ya))if(t.toLowerCase().includes(e.toLowerCase()))return a;return ya.default}function Vn(t,e,a,r){const n=Jn(r),s=Math.floor(n*.75),i=[];let o=0,l=!1;const c=Ut(t);i.push({role:"system",content:t}),o+=c;const d=Ut(a);o+=d;const p=s-o,h=[];let w=0;for(let f=e.length-1;f>=0;f--){const x=e[f],y=Ut(x.content);if(w+y<=p)h.unshift({role:x.role,content:x.content}),w+=y;else{l=!0;break}}return i.push(...h),i.push({role:"user",content:a}),o+=w,{maxTokens:n,usedTokens:o,messages:i,wasTruncated:l}}async function*Zn(t,e,a,r,n,s){var R,$;const i=new ae(e),o=(R=t.metadata)==null?void 0:R.thread_id,l=Date.now();yield{type:"thinking",data:{threadId:o,provider:a.name}};const[c,d]=await Promise.all([i.buildContext(r.id),ea(e,r.id)]),p=await i.getRecentConversations(r.id,30,o);await Tr(i,p,r.id,t.channel,o);const h=br(r,c,t.channel,d),w=Vn(h,p,t.text,a.name);await i.storeMessage(r.id,t.channel,"user",t.text,"{}",o);const f=await Qt(e,r.id),x=10;let y="",T=0;const E=[...w.messages];xr(E);for(let P=0;P<x;P++)try{P>0&&(yield{type:"thinking",data:{threadId:o}},Er(E));const B=await a.chat(E,{tools:f});if(B.usage&&(T+=B.usage.promptTokens+B.usage.completionTokens),B.toolCalls&&B.toolCalls.length>0){B.content&&(yield{type:"chunk",data:{text:B.content,threadId:o}});const H=B.content||`[calling: ${B.toolCalls.map(D=>D.name).join(", ")}]`;E.push({role:"assistant",content:H});const q=[];for(const D of B.toolCalls){yield{type:"tool_start",data:{tool:D.name,toolArgs:D.arguments,threadId:o}};try{const j=await Dt(D.name,D.arguments,e,r.id,{agentType:"full",providerName:a.name,channel:t.channel},r.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,r.timezone,a,s==null?void 0:s.DOCUMENTS_BUCKET);yield{type:"tool_end",data:{tool:D.name,toolResult:j.substring(0,500)+(j.length>500?"...":""),threadId:o}};const u=["parse_document","drive_read_file"].includes(D.name)?2e4:8e3,v=j.length>u?j.substring(0,u)+`
[...result truncated to prevent token limit — full content was extracted]`:j;q.push(`[Tool Result for ${D.name}]: ${v}`)}catch(j){await U(e,r.id,"tool",D.name,j.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:D.name,toolResult:`Error: ${j.message||"Execution failed"}`,threadId:o}},q.push(`[Tool Error for ${D.name}]: ${j.message||"Execution failed"}`)}}E.push({role:"user",content:q.join(`

`)});continue}y=B.content,await i.storeMessage(r.id,t.channel,"assistant",y.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,""),"{}",o);const F=50;for(let H=0;H<y.length;H+=F)yield{type:"chunk",data:{text:y.substring(H,H+F),threadId:o}},H+F<y.length&&await new Promise(D=>setTimeout(D,10));break}catch(B){if(n){const q=B.message||"",D=q.includes("401")||q.includes("403")||q.includes("authentication")||q.includes("credit balance"),j=q.includes("429"),u=D?1440:j?10:5;await n.recordError(a.name,q,u)}await U(e,r.id,"llm","provider_error",B.message||"Unknown LLM error",{provider:a.name,turn:P});const F=B.message||"An error occurred",H=F.includes("429")?"Rate limit reached — the AI provider is temporarily throttling requests. Please wait a moment and try again.":F;try{await i.storeMessage(r.id,t.channel,"assistant",`⚠️ ${H}`,"{}",o)}catch{}yield{type:"error",data:{error:H,threadId:o}};return}if(y=(y==null?void 0:y.trim())??"",!y)try{E.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),y=(await a.chat(E,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me to answer directly from my knowledge.",await i.storeMessage(r.id,t.channel,"assistant",y.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,""),"{}",o);const B=50;for(let F=0;F<y.length;F+=B)yield{type:"chunk",data:{text:y.substring(F,F+B),threadId:o}},F+B<y.length&&await new Promise(H=>setTimeout(H,10))}catch{y="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.",await i.storeMessage(r.id,t.channel,"assistant",y,"{}",o).catch(()=>{}),yield{type:"chunk",data:{text:y,threadId:o}}}if(n&&T>0)try{await n.recordUsage(a.name,T)}catch{}try{await e.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(r.id,a.name,"full",T,Date.now()-l,1,t.channel).run()}catch{}const C=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your\s+|the\s+)(sheet|spreadsheet))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"}];for(const P of C){const B=P.claimPattern.test(y),F=P.requiredTools.some(H=>toolsCalledList.includes(H));if(B&&!F){try{await U(e,r.id,"llm",P.logType,"LLM claimed action without tool call (streaming)",{response:y.substring(0,200)}),E.push({role:"assistant",content:y}),E.push({role:"user",content:P.enforcementMsg});const H=await a.chat(E,{tools:f.filter(q=>P.requiredTools.includes(q.name)),temperature:0});if(($=H.toolCalls)!=null&&$.length){for(const D of H.toolCalls){const j=await Dt(D.name,D.arguments,e,r.id,{agentType:"full",providerName:a.name,channel:t.channel},r.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,r.timezone,a,s==null?void 0:s.DOCUMENTS_BUCKET);toolsCalledList.push(D.name),E.push({role:"assistant",content:null,toolCalls:H.toolCalls}),E.push({role:"user",content:j})}const q=await a.chat(E,{tools:[]});q.content&&(y=q.content)}else y="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}await i.compactHistory(r.id,30),yield{type:"done",data:{threadId:o,provider:a.name,tokenCount:T}}}async function ta(t,e,a,r,n,s){var d;const i=new ae(e),o=(d=t.metadata)==null?void 0:d.thread_id,l=await i.buildContext(r.id);if(Xt(t.text,l).agent==="conversation")return kr(t,e,a,r,l,n,o);if(t.channel==="telegram"){const p=await Qt(e,r.id);return fa(t,e,a,r,n,s,{maxTurns:10,tools:p})}return fa(t,e,a,r,n,s)}async function kr(t,e,a,r,n,s,i){const o=new ae(e),l=Date.now(),c=_r(r.timezone),d=await ea(e,r.id),p=d?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. Do not store copies in memory or contradict them.
${d}

${n}`:n,h=yr("conversation",r,p,r.timezone,c,t.channel),w=(await o.getRecentConversations(r.id,30,i)).filter(E=>!E.content.startsWith("[Autonomous Scheduled Task]")&&!E.content.startsWith("[Scheduled Reminder]")),f=wr([{role:"system",content:h},...w.map(E=>({role:E.role,content:E.content})),{role:"user",content:t.text}]);await o.storeMessage(r.id,t.channel,"user",t.text,"{}",i);let x=0,y="";try{const E=await a.chat(f,{temperature:.8});E.usage&&(x=E.usage.promptTokens+E.usage.completionTokens),y=E.content}catch(E){if(s){const C=E.message||"",R=C.includes("401")||C.includes("403")||C.includes("authentication")||C.includes("credit balance"),$=C.includes("429"),P=R?1440:$?10:5;await s.recordError(a.name,C,P)}throw await U(e,r.id,"llm","conversation_error",E.message,{provider:a.name}),E}if(s&&x>0)try{await s.recordUsage(a.name,x)}catch{}try{await e.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(r.id,a.name,"conversation",x,Date.now()-l,1,t.channel).run()}catch{}const T=y.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"");return await o.storeMessage(r.id,t.channel,"assistant",T,"{}",i),await o.compactHistory(r.id,30),T}async function*Xn(t,e,a,r,n,s){var d;const i=new ae(e),o=(d=t.metadata)==null?void 0:d.thread_id,l=await i.buildContext(r.id),c=Xt(t.text,l);if(yield{type:"thinking",data:{threadId:o,provider:a.name}},c.agent!=="conversation"){yield*Zn(t,e,a,r,n,s);return}try{const p=await kr(t,e,a,r,l,n,o),h=50;for(let w=0;w<p.length;w+=h)yield{type:"chunk",data:{text:p.substring(w,w+h),threadId:o}},w+h<p.length&&await new Promise(f=>setTimeout(f,10))}catch(p){yield{type:"error",data:{error:p.message||"An error occurred",threadId:o}};return}yield{type:"done",data:{threadId:o,provider:a.name,tokenCount:0}}}const te=new ke;async function Qn(t,e){var n;const a=(n=t.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!a)return t.json({error:"Authentication required"},401);const r=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return t.json({error:"Invalid session"},401);t.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),t.set("sessionId",a),await e()}te.use("/*",Qn);te.get("/threads",async t=>{const e=t.get("user"),a=t.req.query("archived")==="1",r=parseInt(t.req.query("limit")||"30"),n=await t.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(e.id,a?1:0,r).all();return t.json({threads:n.results||[]})});te.post("/threads",async t=>{const e=t.get("user"),{title:a}=await t.req.json(),r=await t.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(e.id,a||"New conversation").first();return t.json({thread:r})});te.put("/threads/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),r=await t.req.json(),n=[],s=[];return r.title!==void 0&&(n.push("title = ?"),s.push(r.title)),r.is_archived!==void 0&&(n.push("is_archived = ?"),s.push(r.is_archived?1:0)),n.push("updated_at = CURRENT_TIMESTAMP"),s.push(a,e.id),n.length<=1?t.json({error:"Nothing to update"},400):(await t.env.DB.prepare(`UPDATE threads SET ${n.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),t.json({success:!0}))});te.delete("/threads/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(a,e.id).run(),await t.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});te.post("/upload",async t=>{const e=t.get("user"),a=!!t.env.DOCUMENTS_BUCKET,r=a?100*1024*1024:700*1024;let n,s,i,o=null,l=null;try{if((t.req.header("Content-Type")||"").includes("multipart/form-data")){const y=(await t.req.formData()).get("file");if(!y)return t.json({error:"No file provided."},400);if(n=y.name,s=y.type||"application/octet-stream",i=y.size,i>r)return t.json({error:`File too large (max ${a?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);o=await y.arrayBuffer()}else{const x=await t.req.json();if(!x.file_name||!x.file_data)return t.json({error:"file_name and file_data are required."},400);if(n=x.file_name,s=x.file_type||"application/octet-stream",l=x.file_data,i=x.file_size||Math.round(l.length*.75),i>r)return t.json({error:`File too large (max ${a?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);if(a){const y=atob(l);o=new ArrayBuffer(y.length);const T=new Uint8Array(o);for(let E=0;E<y.length;E++)T[E]=y.charCodeAt(E)}}const d=crypto.randomUUID();let p;a&&o?(await t.env.DOCUMENTS_BUCKET.put(d,o,{httpMetadata:{contentType:s},customMetadata:{fileName:n,userId:String(e.id)}}),p="r2"):p=l||(o?Buffer.from(o).toString("base64"):""),await t.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(d,e.id,n,s,p,i).run();const h=s==="application/pdf"||n.toLowerCase().endsWith(".pdf"),w=s==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||n.toLowerCase().endsWith(".docx");if(w)try{const{extractDocxTextFromBuffer:x}=await Promise.resolve().then(()=>Hn),y=l?Buffer.from(l,"base64"):o?Buffer.from(o):null;if(y){const T=await x(y);T.length>50&&await t.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(T,d).run()}}catch{}if(h&&e.pin_hash){const x=l||(o?Buffer.from(o).toString("base64"):null),y=e.pin_hash,T=e.id,E=t.env.DB,C=t.env.DOCUMENTS_BUCKET,R=(async()=>{var $,P;try{let B=null,F="claude-haiku-4-5-20251001";const{decrypt:H}=await Promise.resolve().then(()=>Jt);for(const v of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const m=await E.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(T,v).first();if(m){const g=await H(m.encrypted_value,y),b=JSON.parse(g);if(b.provider==="anthropic"){B=b.apiKey,b.model&&(F=b.model);break}}}catch{}if(!B)return;let q;if(p==="r2"&&C){const v=await C.get(d);if(!v)return;q=Buffer.from(await v.arrayBuffer()).toString("base64")}else if(x)q=x;else return;const D=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":B,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:F,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:q}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!D.ok)return;const u=((P=($=(await D.json()).content)==null?void 0:$[0])==null?void 0:P.text)||"";u&&await E.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(u,d).run()}catch{}})();try{t.executionCtx.waitUntil(R)}catch{}}let f="";if(s.startsWith("text/"))try{const x=l||(o?Buffer.from(o).toString("base64"):"");f=Buffer.from(x,"base64").toString("utf-8").substring(0,500)}catch{}return t.json({file_id:d,name:n,type:s,size:i,text_preview:f,storage:a?"r2":"d1",extracting:h&&!w})}catch(c){console.error("File upload error:",c);try{const{logError:d}=await Promise.resolve().then(()=>Je);await d(t.env.DB,e.id,"upload","upload_error",c.message||"Unknown upload error")}catch{}return t.json({error:`Upload failed: ${c.message||"Unknown error"}`},500)}});te.post("/send",async t=>{const e=t.get("user"),{message:a,channel:r="web",thread_id:n,files:s}=await t.req.json();if(!a||typeof a!="string"||a.trim().length===0)return t.json({error:"Message is required"},400);let i="";if(s&&Array.isArray(s)&&s.length>0){i=`

[Attached files:
`;for(const c of s)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=n;if(!o){const c=await t.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(e.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:e.id,username:e.username,channel:r,text:a.trim()+i,sessionId:t.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await wt(t.env.DB,e.id,e.pin_hash),p=await ta(l,t.env.DB,c,e,d,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:t.env.DOCUMENTS_BUCKET});return!n&&o?await t.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run():o&&await t.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),t.json({response:p,timestamp:new Date().toISOString(),channel:l.channel,provider:c.name,thread_id:o})}catch(c){console.error("Chat error:",c);const d=c.message||"";if(d.includes("No LLM provider configured"))return t.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400);if(d.includes("All LLM providers failed"))return t.json({error:d,type:"no_provider",thread_id:o},400);if(d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests"))return t.json({error:"Rate limit reached — the AI provider is temporarily throttling requests. Please wait a moment and try again.",type:"rate_limit",thread_id:o},429);const p=d.includes("401")||d.includes("403")||d.includes("authentication")||d.includes("credit balance")||d.includes("invalid")&&d.includes("key");try{const{logError:h}=await Promise.resolve().then(()=>Je);await h(t.env.DB,e.id,"llm","chat_error",d)}catch{}return t.json({error:p?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:d,type:p?"no_provider":void 0,thread_id:o},p?400:500)}});function va(t){return`event: ${t.type}
data: ${JSON.stringify(t.data)}

`}te.post("/stream",async t=>{const e=t.get("user"),{message:a,channel:r="web",thread_id:n,files:s}=await t.req.json();if(!a||typeof a!="string"||a.trim().length===0)return t.json({error:"Message is required"},400);let i="";if(s&&Array.isArray(s)&&s.length>0){i=`

[Attached files:
`;for(const c of s)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=n;if(!o){const c=await t.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(e.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:e.id,username:e.username,channel:r,text:a.trim()+i,sessionId:t.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await wt(t.env.DB,e.id,e.pin_hash),p=new ReadableStream({async start(h){const w=new TextEncoder;try{const f=Xn(l,t.env.DB,c,e,d,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:t.env.DOCUMENTS_BUCKET});for await(const x of f)x.data.threadId||(x.data.threadId=o),h.enqueue(w.encode(va(x)));o&&await t.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),h.close()}catch(f){const x={type:"error",data:{error:f.message||"An error occurred",threadId:o}};h.enqueue(w.encode(va(x))),h.close()}}});return new Response(p,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(o||"")}})}catch(c){console.error("Stream setup error:",c);const d=c.message||"";return d.includes("No LLM provider configured")?t.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400):d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests")?t.json({error:"Rate limit reached — the AI provider is temporarily throttling requests. Please wait a moment and try again.",type:"rate_limit",thread_id:o},429):t.json({error:"Something went wrong setting up the stream.",details:d,thread_id:o},500)}});te.get("/threads/:id/messages",async t=>{var s;const e=t.get("user"),a=parseInt(t.req.param("id")),r=parseInt(t.req.query("limit")||"50"),n=await t.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(e.id,a,r).all();return t.json({messages:(n.results||[]).reverse(),total:((s=n.results)==null?void 0:s.length)||0})});te.get("/history",async t=>{var l;const e=t.get("user"),a=parseInt(t.req.query("limit")||"50"),r=parseInt(t.req.query("offset")||"0"),n=t.req.query("thread_id");let s,i;n?(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[e.id,parseInt(n),a,r]):(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[e.id,a,r]);const o=await t.env.DB.prepare(s).bind(...i).all();return t.json({messages:(o.results||[]).reverse(),total:((l=o.results)==null?void 0:l.length)||0})});te.delete("/history",async t=>{const e=t.get("user"),a=t.req.query("thread_id");return a?await t.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(e.id,parseInt(a)).run():await t.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(e.id).run(),t.json({success:!0})});te.get("/dashboard",async t=>{const e=t.get("user");new Date().toISOString().split("T")[0];const[a,r,n,s,i,o,l]=await Promise.all([t.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(e.id).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(e.id).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(e.id).first(),t.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(e.id).all(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(e.id).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(e.id).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM user_skills WHERE user_id = ? AND enabled = 1").bind(e.id).first()]);return t.json({threads:(a==null?void 0:a.cnt)||0,active_schedules:(r==null?void 0:r.cnt)||0,memories:(n==null?void 0:n.cnt)||0,recent_threads:s.results||[],provider_usage:[],unread_notifications:(i==null?void 0:i.cnt)||0,errors:(o==null?void 0:o.cnt)||0,skills_count:(l==null?void 0:l.cnt)||0})});te.get("/gmail/unread",async t=>{const e=t.get("user");try{const a=t.env.GOOGLE_CLIENT_ID,r=t.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return t.json({count:null,reason:"google_not_configured"});const s=await new we(t.env.DB,e.id,e.pin_hash,a,r).getUnreadCount();return t.json({count:s})}catch(a){return t.json({count:null,reason:a.message})}});te.get("/providers",async t=>t.json({stats:[],statusText:"Provider rotation active (in-memory)."}));te.get("/notifications/count",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(e.id).first();return t.json({count:(a==null?void 0:a.cnt)||0})});te.get("/notifications",async t=>{const e=t.get("user"),a=parseInt(t.req.query("limit")||"20"),r=await t.env.DB.prepare(`SELECT id, type, title, body, is_read, source, action_url, created_at 
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(e.id,a).all();return t.json({notifications:r.results||[]})});te.put("/notifications/:id/read",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});te.put("/notifications/read-all",async t=>{const e=t.get("user");return await t.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(e.id).run(),t.json({success:!0})});te.delete("/notifications/all",async t=>{const e=t.get("user");return await t.env.DB.prepare("DELETE FROM notifications WHERE user_id = ?").bind(e.id).run(),t.json({success:!0})});te.delete("/notifications/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});te.delete("/notifications",async t=>{const e=t.get("user");return await t.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(e.id).run(),t.json({success:!0})});const Z=new ke;async function es(t,e){var n;const a=(n=t.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!a)return t.json({error:"Authentication required"},401);const r=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return t.json({error:"Invalid session"},401);t.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),await e()}Z.use("/*",es);Z.get("/profile",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(e.id).first();return t.json({id:e.id,username:e.username,name:(a==null?void 0:a.name)||e.name,role:(a==null?void 0:a.role)||e.role,personality_prompt:(a==null?void 0:a.personality_prompt)||e.personality_prompt,telegram_chat_id:(a==null?void 0:a.telegram_chat_id)||e.telegram_chat_id,timezone:(a==null?void 0:a.timezone)||e.timezone,assistant_name:(a==null?void 0:a.assistant_name)||"Karna"})});Z.put("/profile",async t=>{const e=t.get("user"),a=await t.req.json(),r=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],n=[],s=[];for(const i of r)a[i]!==void 0&&(n.push(`${i} = ?`),s.push(a[i]));return n.length===0?t.json({error:"No valid fields to update"},400):(n.push("updated_at = CURRENT_TIMESTAMP"),s.push(e.id),await t.env.DB.prepare(`UPDATE users SET ${n.join(", ")} WHERE id = ?`).bind(...s).run(),t.json({success:!0}))});const qt=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","perplexity_api_key"];Z.get("/credentials",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT id, service, label, created_at, updated_at FROM credentials WHERE user_id = ?").bind(e.id).all();return t.json({credentials:(a.results||[]).map(r=>({...r,configured:!0})),available_services:qt,llm_providers:pt})});Z.put("/credentials",async t=>{const e=t.get("user"),{service:a,value:r,label:n}=await t.req.json();if(!a||!r)return t.json({error:"Service name and value are required"},400);if(!qt.includes(a))return t.json({error:`Invalid service. Must be one of: ${qt.join(", ")}`},400);const s=await Yt(r,e.pin_hash);return await t.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(e.id,a,n||a,s).run(),t.json({success:!0,service:a})});Z.delete("/credentials/:service",async t=>{const e=t.get("user"),a=t.req.param("service");return await t.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(e.id,a).run(),t.json({success:!0})});Z.get("/memory",async t=>{const e=t.get("user"),a=t.req.query("type"),n=await new ae(t.env.DB).getAll(e.id,a||void 0,100);return t.json({memories:n})});Z.post("/memory",async t=>{const e=t.get("user"),{type:a,title:r,content:n,importance:s}=await t.req.json();return!a||!r||!n?t.json({error:"Type, title, and content are required"},400):(await new ae(t.env.DB).store(e.id,a,r,n,s||5),t.json({success:!0}))});Z.delete("/memory/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await new ae(t.env.DB).remove(a,e.id),t.json({success:!0})});Z.get("/preferences",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT id, content, created_at FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(e.id).all();return t.json({preferences:a.results||[]})});Z.post("/preferences",async t=>{const e=t.get("user"),{content:a}=await t.req.json();return a!=null&&a.trim()?(await t.env.DB.prepare("INSERT INTO preferences (user_id, content) VALUES (?, ?)").bind(e.id,a.trim()).run(),t.json({success:!0})):t.json({error:"Content required"},400)});Z.put("/preferences/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),{content:r}=await t.req.json();return r!=null&&r.trim()?(await t.env.DB.prepare("UPDATE preferences SET content = ? WHERE id = ? AND user_id = ?").bind(r.trim(),a,e.id).run(),t.json({success:!0})):t.json({error:"Content required"},400)});Z.delete("/preferences/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM preferences WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});Z.get("/schedules",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(e.id).all();return t.json({schedules:a.results||[]})});Z.put("/schedules/:id/toggle",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),{enabled:r}=await t.req.json();return await t.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r?1:0,a,e.id).run(),t.json({success:!0})});Z.delete("/schedules/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});Z.get("/errors",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(e.id).all();return t.json({errors:a.results||[]})});Z.delete("/errors",async t=>{const e=t.get("user");return await t.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(e.id).run(),t.json({success:!0})});Z.post("/credentials/validate",async t=>{t.get("user");const{service:e,value:a}=await t.req.json();if(!e||!a)return t.json({error:"Service and value required"},400);switch(e){case"anthropic":try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return r.ok?t.json({valid:!0,message:"Anthropic API key is valid."}):r.status===401?t.json({valid:!1,message:"Invalid Anthropic API key."}):t.json({valid:!1,message:`Anthropic responded with status ${r.status}.`})}catch(r){return t.json({valid:!1,message:`Connection failed: ${r.message}`})}case"openai":try{const r=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${a}`}});return r.ok?t.json({valid:!0,message:"OpenAI API key is valid."}):r.status===401?t.json({valid:!1,message:"Invalid OpenAI API key."}):t.json({valid:!1,message:`OpenAI responded with status ${r.status}.`})}catch(r){return t.json({valid:!1,message:`Connection failed: ${r.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const r=JSON.parse(a);if(!r.provider||!r.apiKey)return t.json({valid:!1,message:"Missing provider or API key."});const n=pt[r.provider];if(!n)return t.json({valid:!1,message:`Unknown provider: ${r.provider}`});if(n.apiFormat==="anthropic"){const s=await fetch(n.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:n.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return s.ok?t.json({valid:!0,message:`${n.label} API key is valid.`}):s.status===401?t.json({valid:!1,message:`Invalid ${n.label} API key.`}):t.json({valid:!1,message:`${n.label} responded with status ${s.status}.`})}else{const s=n.apiBase+(n.validatePath||"/v1/models"),i=await fetch(s,{headers:{Authorization:`Bearer ${r.apiKey}`}});if(i.ok)return t.json({valid:!0,message:`${n.label} API key is valid.`});if(i.status===401||i.status===403)return t.json({valid:!1,message:`Invalid ${n.label} API key.`});if(i.status===404)try{const o=await fetch(n.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.apiKey}`},body:JSON.stringify({model:n.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return o.ok||o.status===200?t.json({valid:!0,message:`${n.label} API key is valid.`}):o.status===401||o.status===403?t.json({valid:!1,message:`Invalid ${n.label} API key.`}):t.json({valid:!1,message:`${n.label} responded with status ${o.status}.`})}catch(o){return t.json({valid:!1,message:`${n.label} chat test failed: ${o.message}`})}return t.json({valid:!1,message:`${n.label} responded with status ${i.status}.`})}}catch(r){return r instanceof SyntaxError?t.json({valid:!1,message:"Invalid slot data format."}):t.json({valid:!1,message:`Connection failed: ${r.message}`})}case"google_oauth_client":return t.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});case"perplexity_api_key":try{const r=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar",messages:[{role:"user",content:"test"}],max_tokens:1})});return r.ok||r.status===400?t.json({valid:!0,message:"Perplexity API key is valid."}):r.status===401?t.json({valid:!1,message:"Invalid Perplexity API key."}):t.json({valid:!1,message:`Perplexity responded with status ${r.status}.`})}catch(r){return t.json({valid:!1,message:`Connection failed: ${r.message}`})}default:return t.json({valid:!0,message:"Saved (validation not available for this service)."})}});Z.get("/google/status",async t=>{const e=t.get("user");try{const a=await Vt(t.env.DB,e.id,e.pin_hash),r=tr(t.env.GOOGLE_CLIENT_ID,t.env.GOOGLE_CLIENT_SECRET);return t.json({...a,oauth_client_configured:r})}catch(a){return t.json({connected:!1,error:a.message})}});Z.get("/google/auth-url",async t=>{var e;t.get("user");try{const a=t.env.GOOGLE_CLIENT_ID,r=t.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return t.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const n=new URL(t.req.url),s=`${n.protocol}//${n.host}/auth/google/callback`,i=btoa(JSON.stringify({sessionId:(e=t.req.header("Authorization"))==null?void 0:e.replace("Bearer ",""),ts:Date.now()})),o=Xa(a,s,i);return t.json({auth_url:o,redirect_uri:s})}catch(a){return t.json({error:`Failed to generate auth URL: ${a.message}`},500)}});Z.post("/google/disconnect",async t=>{const e=t.get("user");try{return await rr(t.env.DB,e.id),t.json({success:!0,message:"Google account disconnected."})}catch(a){return t.json({error:a.message},500)}});Z.post("/google/test",async t=>{const e=t.get("user");try{const{token:a,email:r}=await rt(t.env.DB,e.id,e.pin_hash,t.env.GOOGLE_CLIENT_ID,t.env.GOOGLE_CLIENT_SECRET),n=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${a}`}}),s=!0,i=n.ok;return t.json({success:!0,email:r,scopes:{sheets:s,calendar:i,docs:s,drive:s},message:i?`Connected as ${r} — all services working.`:`Connected as ${r} — calendar access issue (${n.status}).`})}catch(a){return t.json({success:!1,error:a.message})}});const Se=new ke;Se.get("/debug/time",t=>{const e=new Date,a=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return t.json({utc_iso:e.toISOString(),utc_ms:e.getTime(),formatted_ist:a.format(e),toLocaleString_ist:e.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});Se.get("/health",async t=>{try{const e=Date.now();await t.env.DB.prepare("SELECT 1").first();const a=Date.now()-e;return t.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:a,version:"3.1.0"})}catch{return t.json({status:"error",error:"Database unreachable"},500)}});Se.post("/heartbeat",async t=>{try{const e=Date.now();await t.env.DB.prepare("SELECT 1").first();const a=Date.now()-e;return t.json({status:"ok",latency_ms:a})}catch(e){return t.json({status:"error",error:e.message},500)}});Se.get("/status",async t=>{var l;const e=(l=t.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const r=a.user_id,[n,s,i,o]=await Promise.all([t.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first()]);return t.json({active_schedules:(n==null?void 0:n.cnt)||0,memory_entries:(s==null?void 0:s.cnt)||0,total_messages:(i==null?void 0:i.cnt)||0,unread_errors:(o==null?void 0:o.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});async function ts(t,e,a,r){try{const n=await t.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(e).first();if(!n)return;const s=await X(n.encrypted_value,n.pin_hash),i=4e3,o=r.length>i?r.substring(0,i-3)+"...":r;(await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:o,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:o})})}catch{}}function wa(t){const e=new Date().toLocaleString("en-US",{timeZone:t});return new Date(e)}Se.post("/cron/execute",async t=>{const e=t.req.header("X-Cron-Secret")||"",a=t.env.CRON_SECRET||"karna-cron-default-v1";if(e!==a)return t.json({error:"Unauthorized"},401);const r=new Date,n=r.toISOString();try{await t.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:n})).run()}catch{}const s=await t.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(n).all(),i=[];for(const o of s.results||[])try{await t.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(n,o.id).run();const l=o.user_timezone||"UTC";let c,d=!1,p=o.state||"active";if(o.schedule_type==="interval"){const f=parseInt(o.schedule_value,10);c=new Date(r.getTime()+f*60*1e3)}else if(o.schedule_type==="daily"){const[f,x]=o.schedule_value.split(":").map(Number),y=wa(l),T=new Date(y);T.setHours(f,x,0,0),T<=y&&T.setDate(T.getDate()+1);const E=new Date(T.toLocaleString("en-US",{timeZone:"UTC"})),C=new Date(T.toLocaleString("en-US",{timeZone:l})),R=E.getTime()-C.getTime();c=new Date(T.getTime()+R)}else if(o.schedule_type==="weekly"){const[f,x]=o.schedule_value.split(" "),[y,T]=(x||"00:00").split(":").map(Number),C=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(q=>q.toLowerCase()===f.toLowerCase()),R=wa(l),$=new Date(R);$.setHours(y,T,0,0);let P=(C-$.getDay()+7)%7;P===0&&$<=R&&(P=7),$.setDate($.getDate()+P);const B=new Date($.toLocaleString("en-US",{timeZone:"UTC"})),F=new Date($.toLocaleString("en-US",{timeZone:l})),H=B.getTime()-F.getTime();c=new Date($.getTime()+H)}else o.schedule_type==="once"?(d=!0,p="completed",c=new Date(r.getTime()+365*24*60*60*1e3)):c=new Date(r.getTime()+3600*1e3);await t.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,c.toISOString(),d?0:o.enabled,p,o.id).run();const w=(JSON.parse(o.action_config||"{}").description||o.description)&&(o.action_type==="check_mail"||o.action_type==="check_calendar"||o.action_type==="check_sheet"||o.action_type==="custom");i.push({job_id:o.id,name:o.name,status:"dispatched",needs_agent:w,next_run:c.toISOString()})}catch(l){i.push({job_id:o.id,name:o.name,status:"error",error:l.message})}try{const{MemoryService:o}=await Promise.resolve().then(()=>Sn),l=await t.env.DB.prepare("SELECT id FROM users").all();for(const c of l.results||[])await new o(t.env.DB).cleanupDoneTasks(c.id)}catch{}return t.json({executed:i.length,results:i,timestamp:n})});Se.post("/cron/run-task/:jobId",async t=>{const e=t.req.header("X-Cron-Secret")||"",a=t.env.CRON_SECRET||"karna-cron-default-v1";if(e!==a)return t.json({error:"Unauthorized"},401);const r=parseInt(t.req.param("jobId"),10);if(!r)return t.json({error:"Invalid job ID"},400);const n=await t.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(r).first();if(!n)return t.json({error:"Job not found"},404);const i=JSON.parse(n.action_config||"{}").description||n.description||"",o="⏰ "+(n.name||"Scheduled Task"),l=new Date().toISOString();let c="";const d=n.action_type==="reminder",p=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!d&&n.action_type==="custom"&&p.test(i),d)c=i||n.name||"Time for your scheduled task.";else try{const x={id:n.user_id,username:n.username||"user",name:n.user_name||"User",pin_hash:n.pin_hash||"",role:n.user_role||"",personality_prompt:n.personality_prompt||"",telegram_chat_id:n.telegram_chat_id||"",timezone:n.user_timezone||"UTC",assistant_name:n.assistant_name||"Karna",created_at:"",updated_at:""},y={userId:n.user_id,username:x.username,channel:"cron",text:as(n.name,i,n.action_type),sessionId:"cron-"+n.id,timestamp:l},{provider:T,rotation:E}=await wt(t.env.DB,n.user_id,n.pin_hash);c=await ta(y,t.env.DB,T,x,E,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID})}catch(x){const y=x.message||"unknown error",T=y.includes("rate_limit")||y.includes("429")||y.includes("quota"),E=y.includes("timeout")||y.includes("Timeout");T?c="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":E?c="Task timed out. Will retry at next scheduled time.":c="Task encountered an error. Will retry at next scheduled time.",await U(t.env.DB,n.user_id,"cron_agent","execution_error",y,{job_id:n.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(n.action_type))try{const x=await t.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(n.user_id).first();(!x||x.cnt===0)&&await U(t.env.DB,n.user_id,"cron_verification","no_tools_called",`Cron job "${n.name}" (${n.action_type}) completed without any tool calls`,{job_id:n.id,action_type:n.action_type,response_preview:c.substring(0,200)})}catch{}let w=c||i||"Time for your scheduled task.";w=w.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const f=o+`
`+w;return await t.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(n.user_id,"reminder",o,w,"cron:"+n.id).run(),d&&await t.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(n.user_id,"system","assistant",f,JSON.stringify({type:"cron",job_id:n.id})).run(),n.telegram_chat_id&&await ts(t.env.DB,n.user_id,n.telegram_chat_id,f),t.json({job_id:r,status:"completed",response_length:c.length})});async function Sr(t){var r;const e=(r=t.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!e)return null;const a=await t.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(e).first();return(a==null?void 0:a.user_id)||null}Se.get("/health/tools",async t=>{var a;const e=await Sr(t);if(!e)return t.json({error:"Not authenticated"},401);try{const r=await t.env.DB.prepare(`SELECT tool_name,
              COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) as failures,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name != '__enforcement_trigger'
       GROUP BY tool_name
       ORDER BY total DESC`).bind(e).all(),n=await t.env.DB.prepare(`SELECT agent_type, provider_name, COUNT(*) as triggers,
              SUM(CASE WHEN was_enforcement_retry = 1 THEN 1 ELSE 0 END) as retries_that_worked
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name = '__enforcement_trigger'
       GROUP BY agent_type, provider_name`).bind(e).all(),s=await t.env.DB.prepare(`SELECT COUNT(*) as total_retries,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successful_retries
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND was_enforcement_retry = 1
       AND tool_name != '__enforcement_trigger'`).bind(e).all(),i=await t.env.DB.prepare(`SELECT status, COUNT(*) as count
       FROM cron_execution_log
       WHERE user_id = ? AND started_at > datetime('now', '-24 hours')
       GROUP BY status`).bind(e).all(),o=await t.env.DB.prepare(`SELECT message, details, created_at
       FROM error_log
       WHERE user_id = ? AND source = 'cron_verification'
       AND created_at > datetime('now', '-24 hours')
       ORDER BY created_at DESC LIMIT 10`).bind(e).all(),l=await t.env.DB.prepare(`SELECT provider_name, agent_type,
              COUNT(*) as calls,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM llm_calls
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       GROUP BY provider_name, agent_type
       ORDER BY calls DESC`).bind(e).all();return t.json({period:"last_24h",tool_stats:r.results,enforcement:{triggers:n.results,retry_results:((a=s.results)==null?void 0:a[0])||{total_retries:0,successful_retries:0}},cron:{executions:i.results,warnings:o.results},providers:l.results})}catch(r){return t.json({error:r.message||"Failed to fetch metrics"},500)}});Se.get("/health/tools/recent",async t=>{const e=await Sr(t);if(!e)return t.json({error:"Not authenticated"},401);try{const a=await t.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
              success, error_message, latency_ms, was_enforcement_retry, channel, created_at
       FROM tool_execution_log
       WHERE user_id = ?
       ORDER BY id DESC LIMIT 50`).bind(e).all();return t.json({logs:a.results})}catch(a){return t.json({error:a.message},500)}});const ct=`

RESPONSE FORMAT: This goes to a Telegram notification. Give ONLY the answer to what was asked.
- Answer the SPECIFIC question — not everything you found:
  "crew" = names only. "schedule" = names + call time. "details" = everything (program, sound, team, CT).
- NO narration ("I checked...", "Let me look...", "Looking at the data...")
- NO markdown, no bold, no headers
- NO process description — just the result
- 1-2 sentences maximum. Telegram notification, not an essay.
- If nothing found, say so in one line.
- NEVER FABRICATE: If search results don't contain the specific data (e.g., order status, delivery date), say "Couldn't find [X]" — do NOT invent a status or guess.
- Example: "TET crew tomorrow: Nikhil, Nazar."
- Example: "TET schedule tomorrow: Nikhil, Nazar. CT 14:00."
- Example: "No events at Tata Theatre tomorrow."
- Example: "Couldn't retrieve Amazon order status — requires login."`;function as(t,e,a){return a==="reminder"?`[Scheduled Reminder] "${t}": ${e||"Time for your reminder."}`:a==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${t}"
Instructions: ${e||"Check Gmail for new/important emails."}
You MUST call gmail_list or gmail_search immediately.${ct}`:a==="check_calendar"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${t}"
Instructions: ${e||"Check calendar for upcoming events."}
You MUST call list_calendar_events immediately.${ct}`:a==="check_sheet"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${t}"
Instructions: ${e}
You MUST call read_sheet immediately with the relevant spreadsheet.${ct}`:a==="custom"&&e?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${t}"
Instructions: ${e}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${ct}`:`[Scheduled task "${t}"]: ${e||"Execute this scheduled task."}${ct}`}function rs(t,e,a,r){return{userId:t,username:e,channel:"telegram",text:a,sessionId:`telegram-${r}`,timestamp:new Date().toISOString()}}function ns(t,e){return t.replace(/\*\*(.*?)\*\*/gs,"*$1*").replace(/^#{1,3}\s+(.+)$/gm,"*$1*").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const bt=new ke,ss=4e3;async function ee(t,e,a,r="Markdown",n,s){var c,d;const i=os(a,ss),o=[];let l=!0;for(let p=0;p<i.length;p++){const h=i[p];let w=!1,f="";for(let x=0;x<3;x++)try{const y=await fetch(`https://api.telegram.org/bot${t}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e,text:h,parse_mode:r,disable_web_page_preview:!1})});if(y.ok){w=!0;break}const T=await y.json().catch(()=>null);if(f=`HTTP ${y.status}: ${(T==null?void 0:T.description)||"Unknown error"}`,(c=T==null?void 0:T.description)!=null&&c.includes("parse")||(d=T==null?void 0:T.description)!=null&&d.includes("entities")){if((await fetch(`https://api.telegram.org/bot${t}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e,text:h})})).ok){w=!0;break}f+=" (plain-text retry also failed)"}if(y.status===429||y.status>=500){const E=Math.pow(2,x)*1e3;await new Promise(C=>setTimeout(C,E));continue}break}catch(y){if(f=`Network error: ${y.message}`,x<2){const T=Math.pow(2,x)*1e3;await new Promise(E=>setTimeout(E,T));continue}}w||(l=!1,o.push(`Chunk ${p+1}/${i.length}: ${f}`))}if(!l&&n&&s&&o.length>0)try{const{logError:p}=await Promise.resolve().then(()=>Je);await p(n,s,"telegram","send_failed",o.join(" | "))}catch{}return{success:l,errors:o}}async function is(t,e){try{await fetch(`https://api.telegram.org/bot${t}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e,action:"typing"})})}catch{}}function os(t,e){if(t.length<=e)return[t];const a=[];let r=t;for(;r.length>0;){if(r.length<=e){a.push(r);break}let n=r.lastIndexOf(`
`,e);n<e*.3&&(n=r.lastIndexOf(" ",e)),n<e*.3&&(n=e),a.push(r.substring(0,n)),r=r.substring(n).trimStart()}return a}async function ls(t,e,a,r,n){switch(t.split("@")[0].toLowerCase()){case"/start":{const i=(r==null?void 0:r.name)||"there",o=(r==null?void 0:r.assistant_name)||"Karna",l=`👋 *Hello, ${i}!*

I'm ${o}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/tasks — Show open tasks
/new — Start a fresh conversation

Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.`+(r?"":`

⚠️ Your Telegram chat ID is *${e}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`),c=await ee(a,e,l,"Markdown",n,r==null?void 0:r.id);return!c.success&&c.errors.length>0&&console.warn(`[/start] Failed to send message: ${c.errors.join(" | ")}`),!0}case"/help":{const o=`🛠 *${(r==null?void 0:r.assistant_name)||"Karna"} — Commands*

/start — Welcome message
/help — This help text
/status — System status & stats
/tasks — Show open tasks as checklist
/new — Start new conversation thread

*What I can do:*
• Manage your schedule and reminders
• Track tasks (say "I need to..." or "note to do...")
• Read and send Gmail
• Google Sheets, Calendar, Docs, Drive
• Check Outlook mail
• Search places, get directions
• Translate text, search YouTube
• Browse the web
• Remember important things about you

Just type naturally — I'll figure out the rest.`,l=await ee(a,e,o,"Markdown",n,r==null?void 0:r.id);return!l.success&&l.errors.length>0&&console.warn(`[/help] Failed to send message: ${l.errors.join(" | ")}`),!0}case"/status":{if(!r){const i=await ee(a,e,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app.","Markdown",n);return i.success||console.warn(`[/status] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const[i,o,l,c]=await Promise.all([n.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r.id).first(),n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r.id).first(),n.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(r.id).first(),n.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(r.id).first()]),d=`📊 *System Status*

Active tasks: ${(i==null?void 0:i.cnt)||0}
Memories: ${(o==null?void 0:o.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(c==null?void 0:c.cnt)||0}

Status: ✅ Online`,p=await ee(a,e,d,"Markdown",n,r.id);p.success||console.warn(`[/status] Failed to send message: ${p.errors.join(" | ")}`)}catch{const o=await ee(a,e,"✅ Online — but had trouble fetching stats.","Markdown",n,r==null?void 0:r.id);o.success||console.warn(`[/status error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/new":{if(!r){const o=await ee(a,e,"⚠️ Account not linked.","Markdown",n);return o.success||console.warn(`[/new] Failed to send message: ${o.errors.join(" | ")}`),!0}await n.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(r.id).run();const i=await ee(a,e,"🆕 Starting fresh conversation. Your next message begins a new thread.","Markdown",n,r.id);return i.success||console.warn(`[/new] Failed to send message: ${i.errors.join(" | ")}`),!0}case"/tasks":case"/task":{if(!r){const i=await ee(a,e,"⚠️ Account not linked.","Markdown",n);return i.success||console.warn(`[/tasks] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await n.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(r.id).all()).results||[];if(o.length===0){const f=await ee(a,e,"✅ No open tasks. You're all clear.","Markdown",n,r.id);return f.success||console.warn(`[/tasks] Failed to send message: ${f.errors.join(" | ")}`),!0}const l=new Date,c=l.toISOString().slice(0,10),d=new Date(l);d.setDate(d.getDate()+1);const p=d.toISOString().slice(0,10),h=[`📋 *Open Tasks (${o.length})*
`];for(const f of o){let x="";if(f.due_date){const y=f.due_date.slice(0,10);y<c?x=" ⚠️ _overdue_":y===c?x=" 🔴 _due today_":y===p?x=" 🟡 _due tomorrow_":x=` _${new Date(f.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}h.push(`☐ ${f.title}${x}`)}h.push(`
_Say "mark [task] as done" to close a task._`);const w=await ee(a,e,h.join(`
`),"Markdown",n,r.id);w.success||console.warn(`[/tasks] Failed to send message: ${w.errors.join(" | ")}`)}catch(i){const o=await ee(a,e,"❌ Could not fetch tasks: "+i.message,"Markdown",n,r==null?void 0:r.id);o.success||console.warn(`[/tasks error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}default:return!1}}bt.post("/webhook",async t=>{let e;try{e=await t.req.json()}catch{return t.json({ok:!0})}const a=t.env.DB,r={GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID},n=async()=>{var s,i,o,l,c;try{if(e.callback_query){await cs(a,e.callback_query);return}const d=e.message;if(!d)return;const p=!!d.text,h=!!d.voice,w=!!d.document,f=!!d.photo,x=!!d.caption;if(!p&&!h&&!w&&!f)return;const y=String(d.chat.id);let T=d.text||"";const E=await a.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(y).first();let C=null;if(E){const D=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(E.id,"telegram_bot_token").first();D&&(C=await X(D.encrypted_value,E.pin_hash))}if(!C){const D=await a.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();D&&(C=await X(D.encrypted_value,D.pin_hash))}if(!C||T.startsWith("/")&&await ls(T,y,C,E,a))return;if(!E){const D=await ee(C,y,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${y}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`,"Markdown",a);D.success||console.warn(`Failed to send unlinked account message: ${D.errors.join(" | ")}`);return}if(d.voice&&C&&E)try{const D=await ee(C,y,"🎤 Processing voice note...","Markdown",a,E.id);D.success||console.warn(`[voice start] Failed to send message: ${D.errors.join(" | ")}`);const u=await(await fetch(`https://api.telegram.org/bot${C}/getFile?file_id=${d.voice.file_id}`)).json();if(u.ok&&((s=u.result)!=null&&s.file_path)){const m=await(await fetch(`https://api.telegram.org/file/bot${C}/${u.result.file_path}`)).blob();let g="",b="",S="whisper-1";const k=await t.env.DB.prepare("SELECT service, encrypted_value FROM credentials WHERE user_id = ? AND (service IN ('llm_slot_1', 'llm_slot_2', 'llm_slot_3', 'openai'))").bind(E.id).all();for(const L of k.results){const z=await X(L.encrypted_value,E.pin_hash);if(L.service==="openai"){g="https://api.openai.com/v1/audio/transcriptions",b=z;break}else if(L.service.startsWith("llm_slot_"))try{const Y=JSON.parse(z);if(Y.provider==="openai"){g="https://api.openai.com/v1/audio/transcriptions",b=Y.apiKey;break}else if(Y.provider==="groq"){g="https://api.groq.com/openai/v1/audio/transcriptions",b=Y.apiKey,S="whisper-large-v3";break}}catch{}}if(!g){const L=await ee(C,y,"⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys).","Markdown",a,E.id);L.success||console.warn(`[voice no stt] Failed to send message: ${L.errors.join(" | ")}`);return}const I=new FormData;I.append("file",m,"voice.ogg"),I.append("model",S),I.append("language","en");const N=await fetch(g,{method:"POST",headers:{Authorization:`Bearer ${b}`},body:I});if(!N.ok){const L=await N.text(),z=await ee(C,y,`⚠️ Transcription failed: ${N.status} ${L}`,"Markdown",a,E.id);z.success||console.warn(`[voice transcription error] Failed to send message: ${z.errors.join(" | ")}`);return}T=(await N.json()).text;const A=await ee(C,y,`🗣️ *You said:* ${T}`,"Markdown",a,E.id);A.success||console.warn(`[voice transcript echo] Failed to send message: ${A.errors.join(" | ")}`)}}catch(D){const j=await ee(C,y,`⚠️ Failed to process voice note: ${D.message}`,"Markdown",a,E==null?void 0:E.id);j.success||console.warn(`[voice processing error] Failed to send message: ${j.errors.join(" | ")}`);return}if((w||f)&&C&&E)try{let D,j="unknown",u="unknown",v=0;if(w)D=d.document.file_id,j=d.document.file_name||"document",u=d.document.mime_type||"unknown",v=d.document.file_size||0;else if(f){const m=d.photo[d.photo.length-1];D=m.file_id,j="photo.jpg",u="image/jpeg",v=m.file_size||0}if(D){const g=await(await fetch(`https://api.telegram.org/bot${C}/getFile?file_id=${D}`)).json();let b="";if(g.ok&&((i=g.result)!=null&&i.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(j)||/^text\/|application\/json|application\/xml|application\/csv/i.test(u))&&v<5e4)try{b=await(await fetch(`https://api.telegram.org/file/bot${C}/${g.result.file_path}`)).text()}catch{}const S=d.caption||"",k=`[Telegram file received: "${j}" (${u}, ${Math.round(v/1024)}KB)]`;b?T=`${S?S+`

`:""}${k}
File contents:
${b.substring(0,8e3)}${b.length>8e3?`
[...truncated]`:""}`:T=`${S?S+`

`:""}${k}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(D){if(x&&d.caption)T=d.caption;else{const j=await ee(C,y,`⚠️ Received your file but couldn't process it: ${D.message}`,"Markdown",a,E==null?void 0:E.id);j.success||console.warn(`[file processing error] Failed to send message: ${j.errors.join(" | ")}`);return}}if(!T)return;is(C,y).catch(()=>{});let R=await a.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(E.id).first();R?await a.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(R.id).run():R={id:(await a.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(E.id).run()).meta.last_row_id};const $=rs(E.id,E.username,T,y);$.metadata={thread_id:R.id};let P,B;try{const D=await wt(a,E.id,E.pin_hash);P=D.provider,B=D.rotation}catch(D){console.error("Telegram provider setup error:",D);const j=(o=D.message)!=null&&o.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(l=D.message)!=null&&l.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${D.message||"Unknown error"}`,u=await ee(C,y,j,"Markdown",a,E.id);u.success||console.warn(`[provider error] Failed to send message: ${u.errors.join(" | ")}`);return}const{classifyIntentFast:F}=await Promise.resolve().then(()=>Fn);if(F(T).agent==="multi"){const D=await ee(C,y,"🔍 On it…","Markdown",a,E.id);D.success||console.warn(`[ack] Failed to send: ${D.errors.join(" | ")}`)}const H=9e4;let q=!1;try{const D=await Promise.race([ta($,a,P,E,B,r),new Promise((v,m)=>setTimeout(()=>m(new Error("TELEGRAM_TIMEOUT")),H))]),j=ns(D,"telegram"),u=await ee(C,y,j||"(empty response)","Markdown",a,E.id);if(q=u.success,!u.success){console.error(`[CRITICAL] Agent response failed to send to Telegram for user ${E.id}:`,u.errors);try{const{logError:v}=await Promise.resolve().then(()=>Je);await v(a,E.id,"telegram","response_send_failed",`Failed to deliver response: ${u.errors.join(" | ")}`)}catch{}}}catch(D){console.error("Telegram agent error:",D);const j=D.message==="TELEGRAM_TIMEOUT",u=j?`⏱️ This took longer than Telegram allows (25s limit).

For long essays, please use the web app — it handles long generation without time limits.`:(c=D.message)!=null&&c.includes("API error")?`⚠️ AI provider returned an error. The provider (${P.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(D.message||"Unknown").substring(0,200)}`,v=await ee(C,y,u,"Markdown",a,E.id);q=v.success,v.success||console.error(`[CRITICAL] Error message failed to send to Telegram for user ${E.id}:`,v.errors);try{const{logError:m}=await Promise.resolve().then(()=>Je);await m(a,E.id,"telegram",j?"timeout":"agent_error",D.message||"Agent error",{provider:P.name})}catch{}}}catch(d){console.error("Telegram webhook error:",d);try{const{logError:p}=await Promise.resolve().then(()=>Je);await p(a,null,"telegram","webhook_error",d.message||"Unknown telegram error")}catch{}}};return t.executionCtx.waitUntil(n()),t.json({ok:!0})});bt.post("/setup-webhook",async t=>{var l;const e=(l=t.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const{webhook_url:r}=await t.req.json(),n=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!n)return t.json({error:"Telegram bot token not configured in Settings"},400);const s=await X(n.encrypted_value,a.pin_hash);if(!r){const d=await(await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return t.json(d)}const o=await(await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r,allowed_updates:["message"],drop_pending_updates:!1})})).json();return t.json(o)});bt.get("/webhook-status",async t=>{var s,i,o,l,c,d;const e=(s=t.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const r=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return t.json({configured:!1,error:"Bot token not set"});const n=await X(r.encrypted_value,a.pin_hash);try{const h=await(await fetch(`https://api.telegram.org/bot${n}/getWebhookInfo`)).json();return t.json({configured:!0,webhook_url:((i=h.result)==null?void 0:i.url)||"",has_webhook:!!((o=h.result)!=null&&o.url),pending_updates:((l=h.result)==null?void 0:l.pending_update_count)||0,last_error:((c=h.result)==null?void 0:c.last_error_message)||"",last_error_date:((d=h.result)==null?void 0:d.last_error_date)||null})}catch(p){return t.json({configured:!0,error:p.message})}});bt.post("/detect-chat-id",async t=>{var s,i;const e=(s=t.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const r=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return t.json({error:"Bot token not configured"},400);const n=await X(r.encrypted_value,a.pin_hash);try{const c=((i=(await(await fetch(`https://api.telegram.org/bot${n}/getWebhookInfo`)).json()).result)==null?void 0:i.url)||"";await fetch(`https://api.telegram.org/bot${n}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(y=>setTimeout(y,500));const p=await(await fetch(`https://api.telegram.org/bot${n}/getUpdates?limit=10&timeout=0`)).json();c&&await fetch(`https://api.telegram.org/bot${n}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:c,allowed_updates:["message"]})});const h=p.result||[];if(h.length===0)return t.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const w=[],f=new Set;for(let y=h.length-1;y>=0;y--){const T=h[y].message;if(T&&T.chat){const E=String(T.chat.id);f.has(E)||(f.add(E),w.push({chat_id:E,name:[T.chat.first_name,T.chat.last_name].filter(Boolean).join(" ")||T.chat.title||"Unknown",username:T.chat.username||"",date:new Date((T.date||0)*1e3).toISOString()}))}}if(w.length===0)return t.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const x=w[0].chat_id;return await t.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(x,a.user_id).run(),t.json({found:!0,chat_id:x,name:w[0].name,all_chats:w,message:`Chat ID ${x} detected and saved to your profile.`})}catch(o){return t.json({error:`Detection failed: ${o.message}`},500)}});async function cs(t,e){var x;const{id:a,data:r,message:n,from:s}=e;if(!r||!n)return;const i=r.split(":");if(i[0]!=="briefing_toggle"||i.length<3)return;const o=i[1],l=parseInt(i[2]);if(!l||!o)return;const c=String(n.chat.id),d=await t.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(c).first();if(!d)return;const p=await t.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(d.id,l,o).first();if(!p)return;const h=p.checked?0:1;await t.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(h,h,p.id).run();const w=await t.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(d.id).first();if(!w)return;const f=await X(w.encrypted_value,w.pin_hash);try{const y=await fetch(`https://api.telegram.org/bot${f}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:a,text:h?"✅ Checked!":"☐ Unchecked"})});y.ok||console.warn(`[callback answer] Failed to answer callback: HTTP ${y.status}`)}catch(y){console.warn(`[callback answer] Error answering callback: ${y.message}`)}if((x=n.reply_markup)!=null&&x.inline_keyboard){const y=n.reply_markup.inline_keyboard.map(T=>T.map(E=>{var C;if((C=E.callback_data)!=null&&C.includes(o)){const R=h?"✅":"☐",$=E.text.replace(/^[☐✅]\s*/,"");return{...E,text:`${R} ${$}`}}return E}));try{await fetch(`https://api.telegram.org/bot${f}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:c,message_id:n.message_id,reply_markup:{inline_keyboard:y}})})}catch{}}}function ds(t){const e=new Date,a=new Date(e.toLocaleString("en-US",{timeZone:t})),r=new Date(a);r.setDate(r.getDate()+1),r.setHours(0,0,0,0);const n=new Date(r);n.setHours(23,59,59,999);const s=r.toISOString().split("T")[0];return{start:r.toISOString(),end:n.toISOString(),dateStr:s}}async function us(t,e,a,r,n,s){try{return(await new Zt(t,e,a,r,n).listEvents("primary",{timeMin:s.start,timeMax:s.end,maxResults:50})).map(l=>{var c;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(c=l.attendees)==null?void 0:c.map(d=>d.displayName||d.email),source:"google"}})}catch(i){return console.error("Google Calendar fetch error:",i.message),[]}}async function ps(t,e,a,r,n){try{const s=new we(t,e,a,r,n),i=await s.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),o=await s.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const p of i){const h=p.from.split("<")[0].trim()||p.from;l[h]=(l[h]||0)+1}const c=Object.entries(l).sort(([,p],[,h])=>h-p).slice(0,5).map(([p])=>p),d=i.some(p=>p.subject.toLowerCase().includes("urgent")||p.subject.toLowerCase().includes("asap")||p.subject.toLowerCase().includes("immediately"));return{unreadCount:i.length,importantCount:o.length,topSenders:c,hasUrgent:d}}catch(s){return console.error("Gmail fetch error:",s.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function ms(t,e){try{const a=await t.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(e).all(),r=new Date,n=new Date(r);n.setDate(n.getDate()+1),n.setHours(23,59,59,999);const s=a.results||[],i=s.map(l=>{if(l.due_date){const c=new Date(l.due_date),d=c<=r?"overdue":c<=n?"due today":c.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${l.title} [${d}]`}return l.title}),o=s.filter(l=>l.due_date?new Date(l.due_date)<=n:!1).length;return{pending:s.length,dueToday:o,items:i}}catch(a){return console.error("Tasks fetch error:",a.message),{pending:0,dueToday:0,items:[]}}}async function hs(t,e){try{const a=Math.floor((Date.now()-1728e5)/1e3),r=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(t)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${a},points>10`,n=await fetch(r,{headers:{"User-Agent":"Karna/1.0"}});return n.ok?((await n.json()).hits||[]).filter(i=>i.url&&!e.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const ba=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function gs(t,e,a){const r=t.length>0?t.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],n=new Set;if(e&&a)try{((await e.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(a).all()).results||[]).forEach(c=>n.add(c.url))}catch{}const s=[];if(r.some(l=>ba.some(c=>l.toLowerCase().includes(c.toLowerCase())))){const l=r.find(d=>ba.some(p=>d.toLowerCase().includes(p.toLowerCase())))||"AI agents",c=await hs(l,n);for(const d of c)s.push(d),n.add(d.url)}for(const l of r){if(s.length>=8)break;const c=`latest ${l} news today`;try{const d=await Rt(c,{num:5});if(d.results)for(const p of d.results){if(s.length>=8)break;n.has(p.link)||(s.push({title:p.title,summary:p.snippet,url:p.link,source:p.displayLink}),n.add(p.link))}}catch(d){console.error(`News search error for "${c}":`,d.message)}}const o=s.slice(0,7);if(e&&a&&o.length>0)for(const l of o)try{await e.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(a,l.url,l.title).run()}catch{}return o}function fs(t,e){const a=[];let r="20:00";{const[i,o]=e.split(":"),l=parseInt(i,10),c=o||"00",d=l>=12?"PM":"AM";r=`${l===0?12:l>12?l-12:l}:${c} ${d}`}a.push(`🗓 Your ${r} Brief — ${t.targetDate}`),a.push("");const n=t.calendar.totalCount;if(n>0){a.push(`📅 Tomorrow: ${n} event${n===1?"":"s"}`);for(const i of t.calendar.google.slice(0,5)){const o=i.startTime?new Date(i.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";a.push(`   • ${o} ${i.title}`)}}else a.push("📅 Tomorrow: Nothing scheduled");a.push("");const s=t.emails.gmail.unreadCount;if(s>0?(a.push(`📧 Gmail: ${s} unread`),t.emails.gmail.importantCount>0&&a.push(`   ★ ${t.emails.gmail.importantCount} marked important`),t.emails.gmail.hasUrgent&&a.push("   ⚠️ Urgent messages present"),t.emails.gmail.topSenders.length>0&&a.push(`   From: ${t.emails.gmail.topSenders.slice(0,3).join(", ")}`)):a.push("📧 Gmail: Inbox clear"),a.push(""),t.tasks.pending>0){a.push(`✅ Open Tasks (${t.tasks.pending}):`);for(const i of t.tasks.items)a.push(`   ☐ ${i}`)}else a.push("✅ Tasks: All clear");if(a.push(""),t.news.items.length>0){a.push("📡 Today's Signal:");for(const i of t.news.items){const o=i.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${i.source}`;a.push(`   • ${i.title.substring(0,90)}${i.title.length>90?"…":""}`),a.push(`     ${o} — ${i.summary.substring(0,80)}${i.summary.length>80?"…":""}`)}}return a.join(`
`)}function ys(t){const e=[];let a=0;for(const r of t.calendar.google)e.push({type:"calendar",key:r.id,text:`${r.title} - ${new Date(r.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:r},sortOrder:a++});t.emails.gmail.unreadCount>0&&e.push({type:"email",key:"gmail-unread",text:`Review ${t.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:t.emails.gmail.unreadCount},sortOrder:a++});for(const r of t.tasks.items)e.push({type:"task",key:`task-${r}`,text:r,metadata:{},sortOrder:a++});for(const r of t.news.items)e.push({type:"news",key:`news-${r.url}`,text:`📰 ${r.title}`,metadata:{url:r.url,source:r.source},sortOrder:a++});return e}async function vs(t,e){const a=await t.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(e).first();if(!a)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let r;try{const s=JSON.parse(a.components);r={google_calendar:s.google_calendar!==!1,gmail:s.gmail!==!1,tasks:s.tasks!==!1,news:s.news!==!1}}catch{r={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const n=a.news_topics?a.news_topics.split(",").map(s=>s.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:r,newsTopics:n}}async function Dr(t,e,a){var E,C;const r=e.timezone||"Asia/Kolkata",n=ds(r),{components:s,newsTopics:i}=await vs(t,e.id),o=[],l=[];s.google_calendar&&(o.push(us(t,e.id,e.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET,n)),l.push("googleEvents")),s.gmail&&(o.push(ps(t,e.id,e.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),s.tasks&&(o.push(ms(t,e.id)),l.push("tasks")),s.news&&(o.push(gs(i,t,e.id)),l.push("news"));const c=await Promise.all(o),d={};l.forEach((R,$)=>{d[R]=c[$]});const p={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},h={pending:0,dueToday:0,items:[]},w={generatedAt:new Date().toISOString(),targetDate:n.dateStr,calendar:{google:d.googleEvents||[],totalCount:((E=d.googleEvents)==null?void 0:E.length)||0},emails:{gmail:d.gmailSummary||p},tasks:d.tasks||h,news:{items:d.news||[],fetchedAt:new Date().toISOString()},summary:""},f=((C=await t.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(e.id).first())==null?void 0:C.briefing_time)||"20:00";w.summary=fs(w,f);const x=ys(w),y=await t.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(e.id,JSON.stringify(w)).first(),T=(y==null?void 0:y.id)||0;for(const R of x)await t.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(T,R.type,R.key,R.text,JSON.stringify(R.metadata),R.sortOrder).run();return{briefingId:T,content:w,items:x}}async function ws(t,e,a){const r=await t.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,e).first();if(!r)return null;const n=await t.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(a).all();return{briefing:{...r,content:JSON.parse(r.content_json||"{}")},items:n.results||[]}}async function bs(t,e,a,r){if(!await t.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,e).first())return null;const s=await t.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(r,a).first();if(!s)return null;const i=s.checked?0:1;return await t.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(i,i,r,a).run(),{checked:i===1}}async function _s(t,e,a=10){return((await t.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.sent_at DESC
    LIMIT ?
  `).bind(e,a).all()).results||[]).map(n=>({...n,content:JSON.parse(n.content_json||"{}")}))}function Es(t,e,a=new Date){const r=new Date(a.toLocaleString("en-US",{timeZone:e})),n=r.getHours(),s=r.getMinutes(),[i,o]=t.split(":").map(Number),l=n*60+s,c=i*60+o;return l===c}function Ir(t,e){const a=t.summary,r=[];for(const n of e.slice(0,10))r.push([{text:`☐ ${n.text.substring(0,40)}${n.text.length>40?"...":""}`,callback_data:`briefing_toggle:${n.key}`}]);return{text:a,inlineKeyboard:r}}const de=new ke;async function Ts(t,e){var n;if(t.req.path.includes("/cron/"))return e();const a=(n=t.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!a)return t.json({error:"Authentication required"},401);const r=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return t.json({error:"Invalid session"},401);t.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),t.set("sessionId",a),await e()}de.use("/*",Ts);de.get("/briefings",async t=>{const e=t.get("user"),a=parseInt(t.req.query("limit")||"10");try{const r=await _s(t.env.DB,e.id,a);return t.json({briefings:r})}catch(r){return t.json({error:r.message},500)}});de.get("/briefings/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));try{const r=await ws(t.env.DB,e.id,a);return r?t.json(r):t.json({error:"Briefing not found"},404)}catch(r){return t.json({error:r.message},500)}});de.post("/briefings/:id/items/:itemId/toggle",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),r=parseInt(t.req.param("itemId"));try{const n=await bs(t.env.DB,e.id,a,r);return n?t.json(n):t.json({error:"Item not found"},404)}catch(n){return t.json({error:n.message},500)}});de.post("/briefings/generate",async t=>{const e=t.get("user");try{const a=await Dr(t.env.DB,e,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET});return t.json(a)}catch(a){return t.json({error:a.message},500)}});de.get("/briefing-preferences",async t=>{const e=t.get("user");try{const a=await t.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(e.id).first();if(!a){const n={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return t.json({preferences:n})}const r={briefingTime:a.briefing_time,briefingEnabled:a.briefing_enabled!==0,components:JSON.parse(a.components),newsTopics:a.news_topics.split(",").map(n=>n.trim()).filter(Boolean),notificationChannels:JSON.parse(a.notification_channels),proactiveLevel:a.proactive_level};return t.json({preferences:r})}catch(a){return t.json({error:a.message},500)}});de.post("/briefing-preferences",async t=>{const e=t.get("user"),a=await t.req.json(),r=[];if(a.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(a.briefingTime)||r.push("Invalid time format. Use HH:MM (e.g., 20:00)")),a.newsTopics&&(a.newsTopics.length>5&&r.push("Maximum 5 news topics allowed"),a.newsTopics.some(n=>n.length>50)&&r.push("Each news topic must be 50 characters or less")),a.proactiveLevel&&!["conservative","moderate","aggressive"].includes(a.proactiveLevel)&&r.push("Invalid proactive level. Use conservative, moderate, or aggressive"),r.length>0)return t.json({error:r.join("; ")},400);try{const n=await t.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(e.id).first(),s=a.components?JSON.stringify(a.components):null,i=a.notificationChannels?JSON.stringify(a.notificationChannels):null,o=a.newsTopics?a.newsTopics.join(", "):null;if(n){const l=[],c=[];a.briefingTime!==void 0&&(l.push("briefing_time = ?"),c.push(a.briefingTime)),a.briefingEnabled!==void 0&&(l.push("briefing_enabled = ?"),c.push(a.briefingEnabled?1:0)),s!==null&&(l.push("components = ?"),c.push(s)),o!==null&&(l.push("news_topics = ?"),c.push(o)),i!==null&&(l.push("notification_channels = ?"),c.push(i)),a.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),c.push(a.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),c.push(e.id),await t.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...c).run())}else await t.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(e.id,a.briefingTime||"20:00",s||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',o||"AI, LLM, Tools, Agentic Workflows, AI Features",i||'{"telegram":true,"web":true}',a.proactiveLevel||"moderate").run();return t.json({success:!0})}catch(n){return t.json({error:n.message},500)}});de.post("/briefing-preferences/init-defaults",async t=>{const e=t.get("user");try{return await t.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(e.id).first()?t.json({success:!0,message:"Preferences already exist"}):(await t.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(e.id).run(),t.json({success:!0,message:"Default preferences created"}))}catch(a){return t.json({error:a.message},500)}});de.post("/cron/evening-briefing",async t=>{const e=t.req.header("X-Cron-Secret")||"",a=t.env.CRON_SECRET||"karna-cron-default-v1";if(e!==a)return t.json({error:"Unauthorized"},401);try{const r=await t.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),n=[],s=new Date;for(const i of r.results||[]){if(!i.briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.briefing_time||"20:00";if(Es(l,o,s))try{const c=await Dr(t.env.DB,i,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET});if(i.telegram_chat_id){const{text:d,inlineKeyboard:p}=Ir(c.content,c.items);await Cr(t.env.DB,i,d,p,c.briefingId)}n.push({user_id:i.id,status:"success",briefing_id:c.briefingId,briefing_time:l,timezone:o})}catch(c){n.push({user_id:i.id,status:"error",error:c.message})}}return t.json({executed:n.length,results:n})}catch(r){return t.json({error:r.message},500)}});de.post("/cron/meeting-reminders",async t=>{const e=t.req.header("X-Cron-Secret")||"",a=t.env.CRON_SECRET||"karna-cron-default-v1";if(e!==a)return t.json({error:"Unauthorized"},401);try{const r=await t.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id IS NOT NULL").all(),n=[],s=new Date,i=new Date(s.getTime()+600*1e3).toISOString(),o=new Date(s.getTime()+900*1e3).toISOString();for(const l of r.results||[])try{const c=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!c)continue;const d=await X(c.encrypted_value,l.pin_hash),h=JSON.parse(d).access_token;if(!h)continue;const w=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(s.toISOString())}&timeMax=${encodeURIComponent(o)}&maxResults=10`,{headers:{Authorization:`Bearer ${h}`}});if(!w.ok)continue;const x=((await w.json()).items||[]).filter(E=>{var R;const C=(R=E.start)==null?void 0:R.dateTime;return C?C>=s.toISOString()&&C<=i:!1});if(x.length===0){n.push({user_id:l.id,reminders_sent:0});continue}const y=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(l.id).first();if(!y)continue;const T=await X(y.encrypted_value,l.pin_hash);for(const E of x){const C=new Date(E.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),R=E.location?`
📍 ${E.location}`:"",$=`⏰ Meeting in 10 minutes!

*${E.summary||"Untitled Event"}*
🕐 ${C}${R}`;await fetch(`https://api.telegram.org/bot${T}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l.telegram_chat_id,text:$,parse_mode:"Markdown"})})}n.push({user_id:l.id,reminders_sent:x.length})}catch(c){n.push({user_id:l.id,status:"error",error:c.message})}return t.json({executed:n.length,results:n})}catch(r){return t.json({error:r.message},500)}});async function Cr(t,e,a,r,n){try{const s=await t.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(e.id).first();if(!s)return;const i=await X(s.encrypted_value,s.pin_hash);if(!(await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e.telegram_chat_id,text:a,parse_mode:"Markdown",reply_markup:{inline_keyboard:r.map(c=>c.map(d=>({...d,callback_data:`${d.callback_data}:${n}`})))}})})).json()).ok){const d=await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e.telegram_chat_id,text:a.replace(/[_*[\]`]/g,""),reply_markup:{inline_keyboard:r.map(p=>p.map(h=>({...h,callback_data:`${h.callback_data}:${n}`})))}})})).json();if(!d.ok){console.error("Telegram briefing send failed:",d.description,"chat_id:",e.telegram_chat_id);return}}await t.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(n).run()}catch(s){console.error("Telegram briefing error:",s.message)}}de.post("/briefings/:id/resend",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));try{const r=await t.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(a,e.id).first();if(!r)return t.json({error:"Briefing not found"},404);const n=JSON.parse(r.content||"{}"),s=await t.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(a).all(),{text:i,inlineKeyboard:o}=Ir(n,s.results||[]);await t.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(a).run(),await Cr(t.env.DB,e,i,o,a);const l=await t.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(a).first();return l!=null&&l.delivered_telegram?t.json({success:!0,message:"Briefing sent to Telegram"}):t.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(r){return t.json({error:r.message},500)}});de.delete("/briefings/:id",async t=>{const e=t.get("user"),a=t.req.param("id");return await t.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});const Ge=new ke;async function xs(t,e){var n;const a=(n=t.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!a)return t.json({error:"Authentication required"},401);const r=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return t.json({error:"Invalid session"},401);t.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),t.set("sessionId",a),await e()}Ge.use("/*",xs);function Or(t){return t.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"")}Ge.get("/",async t=>{const e=t.get("user"),a=await t.env.DB.prepare(`SELECT id, name, slug, description, instructions, parameters, required_tools, examples, enabled, usage_count, last_used_at, created_at, updated_at
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`).bind(e.id).all();return t.json({skills:a.results||[]})});Ge.post("/",async t=>{var c,d,p;const e=t.get("user"),a=await t.req.json();if(!((c=a.name)!=null&&c.trim()))return t.json({error:"name is required"},400);if(!((d=a.description)!=null&&d.trim()))return t.json({error:"description is required"},400);if(!((p=a.instructions)!=null&&p.trim()))return t.json({error:"instructions is required"},400);let r=Or(a.name);r||(r=`skill_${Date.now()}`);const n=await t.env.DB.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(e.id,`${r}%`).all();n.results&&n.results.length>0&&n.results.map(w=>w.slug).includes(r)&&(r=`${r}_${n.results.length+1}`);const s=JSON.stringify(a.parameters||{}),i=JSON.stringify(a.required_tools||[]),o=JSON.stringify(a.examples||[]),l=await t.env.DB.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(e.id,a.name.trim(),r,a.description.trim(),a.instructions.trim(),s,i,o).first();return t.json({skill:l,created:!0})});Ge.get("/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));if(isNaN(a))return t.json({error:"Invalid skill ID"},400);const r=await t.env.DB.prepare("SELECT * FROM user_skills WHERE id = ? AND user_id = ?").bind(a,e.id).first();return r?t.json({skill:r}):t.json({error:"Skill not found"},404)});Ge.put("/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));if(isNaN(a))return t.json({error:"Invalid skill ID"},400);const r=await t.req.json(),n=[],s=[];return r.name!==void 0&&(n.push("name = ?","slug = ?"),s.push(r.name.trim(),Or(r.name))),r.description!==void 0&&(n.push("description = ?"),s.push(r.description.trim())),r.instructions!==void 0&&(n.push("instructions = ?"),s.push(r.instructions.trim())),r.parameters!==void 0&&(n.push("parameters = ?"),s.push(JSON.stringify(r.parameters))),r.required_tools!==void 0&&(n.push("required_tools = ?"),s.push(JSON.stringify(r.required_tools))),r.examples!==void 0&&(n.push("examples = ?"),s.push(JSON.stringify(r.examples))),r.enabled!==void 0&&(n.push("enabled = ?"),s.push(r.enabled?1:0)),n.length===0?t.json({error:"Nothing to update"},400):(n.push("updated_at = CURRENT_TIMESTAMP"),s.push(a,e.id),await t.env.DB.prepare(`UPDATE user_skills SET ${n.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),t.json({success:!0}))});Ge.delete("/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return isNaN(a)?t.json({error:"Invalid skill ID"},400):(await t.env.DB.prepare("DELETE FROM user_skills WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0}))});const me=new ke;me.use("/api/*",fn());me.route("/api/auth",Ae);me.route("/api/chat",te);me.route("/api/settings",Z);me.route("/api/system",Se);me.route("/api/telegram",bt);me.route("/api/proactive",de);me.route("/api/skills",Ge);me.get("/auth/google/callback",async t=>{const e=new URL(t.req.url),a=e.searchParams.get("code"),r=e.searchParams.get("state"),n=e.searchParams.get("error");if(n)return t.html(qe(!1,`Google denied access: ${n}`));if(!a||!r)return t.html(qe(!1,"Missing authorization code or state parameter."));try{const i=JSON.parse(atob(r)).sessionId;if(!i)return t.html(qe(!1,"Invalid state parameter — missing session."));const o=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(i).first();if(!o)return t.html(qe(!1,"Session expired. Please log in again and retry."));const l=o.user_id,c=o.pin_hash,d=`${e.protocol}//${e.host}/auth/google/callback`,p=await ar(t.env.DB,l,c,a,d,t.env.GOOGLE_CLIENT_ID,t.env.GOOGLE_CLIENT_SECRET);return t.html(qe(!0,`Connected as ${p.email}`,p.email))}catch(s){return t.html(qe(!1,`OAuth failed: ${s.message}`))}});me.get("/",t=>(t.header("Cache-Control","no-cache, no-store, must-revalidate"),t.header("Pragma","no-cache"),t.header("Expires","0"),t.html(Fa())));me.get("*",t=>t.req.path.startsWith("/api/")?t.json({error:"Not found"},404):(t.header("Cache-Control","no-cache, no-store, must-revalidate"),t.header("Pragma","no-cache"),t.header("Expires","0"),t.html(Fa())));function qe(t,e,a){return`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Google OAuth — Karna</title>
<style>
  body { margin:0; display:flex; align-items:center; justify-content:center; min-height:100vh;
    background:#0a0a0a; color:#e0e0e0; font-family:'Inter',sans-serif; }
  .card { background:#141414; border:1px solid #222; border-radius:12px; padding:32px; max-width:400px; text-align:center; }
  .icon { font-size:48px; margin-bottom:16px; }
  .msg { font-size:15px; color:#999; margin:12px 0; }
  .email { color:#4fd1c5; font-weight:500; }
  .btn { display:inline-block; margin-top:16px; padding:10px 24px; background:#4fd1c5; color:#0a0a0a;
    border:none; border-radius:8px; font-weight:600; cursor:pointer; text-decoration:none; font-size:14px; }
</style></head><body>
<div class="card">
  <div class="icon">${t?"&#10003;":"&#10007;"}</div>
  <h2 style="margin:0; color:${t?"#4fd1c5":"#ff6b6b"};">${t?"Connected":"Connection Failed"}</h2>
  <p class="msg">${e}</p>
  ${a?'<p class="email">'+a+"</p>":""}
  <a href="/" class="btn">Back to Karna</a>
</div>
<script>
  // Notify the opener window if this was opened in a popup
  if (window.opener) {
    window.opener.postMessage({ type: 'google_oauth_complete', success: ${t}, email: '${a||""}' }, '*');
    setTimeout(function() { window.close(); }, 2000);
  }
<\/script>
</body></html>`}async function ks(t,e,a){const r="https://karna-5xs.pages.dev",s={"Content-Type":"application/json","X-Cron-Secret":e.CRON_SECRET||"karna-cron-default-v1"};try{const o=await(await fetch(`${r}/api/system/cron/execute`,{method:"POST",headers:s})).json();if(o.results&&o.results.length>0){const c=o.results.filter(p=>p.needs_agent&&p.status==="dispatched");if(c.length>0){const p=c.map(h=>fetch(`${r}/api/system/cron/run-task/${h.job_id}`,{method:"POST",headers:s}).then(w=>w.json()).catch(w=>({job_id:h.job_id,error:w.message})));a.waitUntil(Promise.allSettled(p).then(h=>{console.log(`Cron: ${o.executed} dispatched, ${c.length} agent tasks`,JSON.stringify(h.map(w=>w.status==="fulfilled"?w.value:w.reason)))}))}const d=o.results.filter(p=>!p.needs_agent&&p.status==="dispatched");if(d.length>0){const p=d.map(h=>fetch(`${r}/api/system/cron/run-task/${h.job_id}`,{method:"POST",headers:s}).catch(()=>{}));a.waitUntil(Promise.allSettled(p))}}a.waitUntil(fetch(`${r}/api/proactive/cron/evening-briefing`,{method:"POST",headers:s}).then(c=>c.json()).then(c=>{c.executed>0&&console.log("Evening briefing result:",JSON.stringify(c))}).catch(c=>{console.error("Evening briefing error:",c.message)})),new Date().getMinutes()%5<2&&a.waitUntil(fetch(`${r}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:s}).then(c=>c.json()).then(c=>{var d;(d=c.results)!=null&&d.some(p=>p.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(c))}).catch(()=>{}))}catch(i){console.error("Scheduled cron error:",i.message||i)}}const Ss={fetch:me.fetch,scheduled:ks},_a=new ke,Ds=Object.assign({"/src/index.tsx":Ss});let Rr=!1;for(const[,t]of Object.entries(Ds))t&&(_a.all("*",e=>{let a;try{a=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,a)}),_a.notFound(e=>{let a;try{a=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,a)}),Rr=!0);if(!Rr)throw new Error("Can't import modules from ['/src/index.tsx']");export{_a as default};
