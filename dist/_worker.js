var Pr=Object.defineProperty;var na=t=>{throw TypeError(t)};var Br=(t,e,a)=>e in t?Pr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var C=(t,e,a)=>Br(t,typeof e!="symbol"?e+"":e,a),Lt=(t,e,a)=>e.has(t)||na("Cannot "+a);var _=(t,e,a)=>(Lt(t,e,"read from private field"),a?a.call(t):e.get(t)),H=(t,e,a)=>e.has(t)?na("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),$=(t,e,a,r)=>(Lt(t,e,"write to private field"),r?r.call(t,a):e.set(t,a),a),K=(t,e,a)=>(Lt(t,e,"access private method"),a);var ia=(t,e,a,r)=>({set _(s){$(t,e,s,a)},get _(){return _(t,e,r)}});var oa=(t,e,a)=>(r,s)=>{let n=-1;return i(0);async function i(o){if(o<=n)throw new Error("next() called multiple times");n=o;let l,c=!1,d;if(t[o]?(d=t[o][0][0],r.req.routeIndex=o):d=o===t.length&&s||void 0,d)try{l=await d(r,()=>i(o+1))}catch(m){if(m instanceof Error&&e)r.error=m,l=await e(m,r),c=!0;else throw m}else r.finalized===!1&&a&&(l=await a(r));return l&&(r.finalized===!1||c)&&(r.res=l),r}},jr=Symbol(),Ur=async(t,e=Object.create(null))=>{const{all:a=!1,dot:r=!1}=e,n=(t instanceof La?t.raw.headers:t.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?Hr(t,{all:a,dot:r}):{}};async function Hr(t,e){const a=await t.formData();return a?Gr(a,e):{}}function Gr(t,e){const a=Object.create(null);return t.forEach((r,s)=>{e.all||s.endsWith("[]")?Fr(a,s,r):a[s]=r}),e.dot&&Object.entries(a).forEach(([r,s])=>{r.includes(".")&&(qr(a,r,s),delete a[r])}),a}var Fr=(t,e,a)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(a):t[e]=[t[e],a]:e.endsWith("[]")?t[e]=[a]:t[e]=a},qr=(t,e,a)=>{let r=t;const s=e.split(".");s.forEach((n,i)=>{i===s.length-1?r[n]=a:((!r[n]||typeof r[n]!="object"||Array.isArray(r[n])||r[n]instanceof File)&&(r[n]=Object.create(null)),r=r[n])})},Oa=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},Wr=t=>{const{groups:e,path:a}=zr(t),r=Oa(a);return Kr(r,e)},zr=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(a,r)=>{const s=`@${r}`;return e.push([s,a]),s}),{groups:e,path:t}},Kr=(t,e)=>{for(let a=e.length-1;a>=0;a--){const[r]=e[a];for(let s=t.length-1;s>=0;s--)if(t[s].includes(r)){t[s]=t[s].replace(r,e[a][1]);break}}return t},Tt={},Yr=(t,e)=>{if(t==="*")return"*";const a=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const r=`${t}#${e}`;return Tt[r]||(a[2]?Tt[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,a[1],new RegExp(`^${a[2]}(?=/${e})`)]:[t,a[1],new RegExp(`^${a[2]}$`)]:Tt[r]=[t,a[1],!0]),Tt[r]}return null},Jt=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return e(a)}catch{return a}})}},Jr=t=>Jt(t,decodeURI),Ca=t=>{const e=t.url,a=e.indexOf("/",e.indexOf(":")+4);let r=a;for(;r<e.length;r++){const s=e.charCodeAt(r);if(s===37){const n=e.indexOf("?",r),i=e.indexOf("#",r),o=n===-1?i===-1?void 0:i:i===-1?n:Math.min(n,i),l=e.slice(a,o);return Jr(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(s===63||s===35)break}return e.slice(a,r)},Vr=t=>{const e=Ca(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},Ke=(t,e,...a)=>(a.length&&(e=Ke(e,...a)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Ra=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),a=[];let r="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){a.length===0&&r===""?a.push("/"):a.push(r);const n=s.replace("?","");r+="/"+n,a.push(r)}else r+="/"+s}),a.filter((s,n,i)=>i.indexOf(s)===n)},Mt=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?Jt(t,Aa):t):t,Na=(t,e,a)=>{let r;if(!a&&e&&!/[%+]/.test(e)){let i=t.indexOf("?",8);if(i===-1)return;for(t.startsWith(e,i+1)||(i=t.indexOf(`&${e}`,i+1));i!==-1;){const o=t.charCodeAt(i+e.length+1);if(o===61){const l=i+e.length+2,c=t.indexOf("&",l);return Mt(t.slice(l,c===-1?void 0:c))}else if(o==38||isNaN(o))return"";i=t.indexOf(`&${e}`,i+1)}if(r=/[%+]/.test(t),!r)return}const s={};r??(r=/[%+]/.test(t));let n=t.indexOf("?",8);for(;n!==-1;){const i=t.indexOf("&",n+1);let o=t.indexOf("=",n);o>i&&i!==-1&&(o=-1);let l=t.slice(n+1,o===-1?i===-1?void 0:i:o);if(r&&(l=Mt(l)),n=i,l==="")continue;let c;o===-1?c="":(c=t.slice(o+1,i===-1?void 0:i),r&&(c=Mt(c))),a?(s[l]&&Array.isArray(s[l])||(s[l]=[]),s[l].push(c)):s[l]??(s[l]=c)}return e?s[e]:s},Zr=Na,Xr=(t,e)=>Na(t,e,!0),Aa=decodeURIComponent,la=t=>Jt(t,Aa),Ze,me,xe,Ma,$a,Ft,De,Ta,La=(Ta=class{constructor(t,e="/",a=[[]]){H(this,xe);C(this,"raw");H(this,Ze);H(this,me);C(this,"routeIndex",0);C(this,"path");C(this,"bodyCache",{});H(this,De,t=>{const{bodyCache:e,raw:a}=this,r=e[t];if(r)return r;const s=Object.keys(e)[0];return s?e[s].then(n=>(s==="json"&&(n=JSON.stringify(n)),new Response(n)[t]())):e[t]=a[t]()});this.raw=t,this.path=e,$(this,me,a),$(this,Ze,{})}param(t){return t?K(this,xe,Ma).call(this,t):K(this,xe,$a).call(this)}query(t){return Zr(this.url,t)}queries(t){return Xr(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((a,r)=>{e[r]=a}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await Ur(this,t))}json(){return _(this,De).call(this,"text").then(t=>JSON.parse(t))}text(){return _(this,De).call(this,"text")}arrayBuffer(){return _(this,De).call(this,"arrayBuffer")}blob(){return _(this,De).call(this,"blob")}formData(){return _(this,De).call(this,"formData")}addValidatedData(t,e){_(this,Ze)[t]=e}valid(t){return _(this,Ze)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[jr](){return _(this,me)}get matchedRoutes(){return _(this,me)[0].map(([[,t]])=>t)}get routePath(){return _(this,me)[0].map(([[,t]])=>t)[this.routeIndex].path}},Ze=new WeakMap,me=new WeakMap,xe=new WeakSet,Ma=function(t){const e=_(this,me)[0][this.routeIndex][1][t],a=K(this,xe,Ft).call(this,e);return a&&/\%/.test(a)?la(a):a},$a=function(){const t={},e=Object.keys(_(this,me)[0][this.routeIndex][1]);for(const a of e){const r=K(this,xe,Ft).call(this,_(this,me)[0][this.routeIndex][1][a]);r!==void 0&&(t[a]=/\%/.test(r)?la(r):r)}return t},Ft=function(t){return _(this,me)[1]?_(this,me)[1][t]:t},De=new WeakMap,Ta),Qr={Stringify:1},Pa=async(t,e,a,r,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const n=t.callbacks;return n!=null&&n.length?(s?s[0]+=t:s=[t],Promise.all(n.map(o=>o({phase:e,buffer:s,context:r}))).then(o=>Promise.all(o.filter(Boolean).map(l=>Pa(l,e,!1,r,s))).then(()=>s[0]))):Promise.resolve(t)},es="text/plain; charset=UTF-8",$t=(t,e)=>({"Content-Type":t,...e}),ht,gt,be,Xe,_e,le,ft,Qe,et,Pe,yt,vt,Ie,Ye,xa,ts=(xa=class{constructor(t,e){H(this,Ie);H(this,ht);H(this,gt);C(this,"env",{});H(this,be);C(this,"finalized",!1);C(this,"error");H(this,Xe);H(this,_e);H(this,le);H(this,ft);H(this,Qe);H(this,et);H(this,Pe);H(this,yt);H(this,vt);C(this,"render",(...t)=>(_(this,Qe)??$(this,Qe,e=>this.html(e)),_(this,Qe).call(this,...t)));C(this,"setLayout",t=>$(this,ft,t));C(this,"getLayout",()=>_(this,ft));C(this,"setRenderer",t=>{$(this,Qe,t)});C(this,"header",(t,e,a)=>{this.finalized&&$(this,le,new Response(_(this,le).body,_(this,le)));const r=_(this,le)?_(this,le).headers:_(this,Pe)??$(this,Pe,new Headers);e===void 0?r.delete(t):a!=null&&a.append?r.append(t,e):r.set(t,e)});C(this,"status",t=>{$(this,Xe,t)});C(this,"set",(t,e)=>{_(this,be)??$(this,be,new Map),_(this,be).set(t,e)});C(this,"get",t=>_(this,be)?_(this,be).get(t):void 0);C(this,"newResponse",(...t)=>K(this,Ie,Ye).call(this,...t));C(this,"body",(t,e,a)=>K(this,Ie,Ye).call(this,t,e,a));C(this,"text",(t,e,a)=>!_(this,Pe)&&!_(this,Xe)&&!e&&!a&&!this.finalized?new Response(t):K(this,Ie,Ye).call(this,t,e,$t(es,a)));C(this,"json",(t,e,a)=>K(this,Ie,Ye).call(this,JSON.stringify(t),e,$t("application/json",a)));C(this,"html",(t,e,a)=>{const r=s=>K(this,Ie,Ye).call(this,s,e,$t("text/html; charset=UTF-8",a));return typeof t=="object"?Pa(t,Qr.Stringify,!1,{}).then(r):r(t)});C(this,"redirect",(t,e)=>{const a=String(t);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,e??302)});C(this,"notFound",()=>(_(this,et)??$(this,et,()=>new Response),_(this,et).call(this,this)));$(this,ht,t),e&&($(this,_e,e.executionCtx),this.env=e.env,$(this,et,e.notFoundHandler),$(this,vt,e.path),$(this,yt,e.matchResult))}get req(){return _(this,gt)??$(this,gt,new La(_(this,ht),_(this,vt),_(this,yt))),_(this,gt)}get event(){if(_(this,_e)&&"respondWith"in _(this,_e))return _(this,_e);throw Error("This context has no FetchEvent")}get executionCtx(){if(_(this,_e))return _(this,_e);throw Error("This context has no ExecutionContext")}get res(){return _(this,le)||$(this,le,new Response(null,{headers:_(this,Pe)??$(this,Pe,new Headers)}))}set res(t){if(_(this,le)&&t){t=new Response(t.body,t);for(const[e,a]of _(this,le).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=_(this,le).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of r)t.headers.append("set-cookie",s)}else t.headers.set(e,a)}$(this,le,t),this.finalized=!0}get var(){return _(this,be)?Object.fromEntries(_(this,be)):{}}},ht=new WeakMap,gt=new WeakMap,be=new WeakMap,Xe=new WeakMap,_e=new WeakMap,le=new WeakMap,ft=new WeakMap,Qe=new WeakMap,et=new WeakMap,Pe=new WeakMap,yt=new WeakMap,vt=new WeakMap,Ie=new WeakSet,Ye=function(t,e,a){const r=_(this,le)?new Headers(_(this,le).headers):_(this,Pe)??new Headers;if(typeof e=="object"&&"headers"in e){const n=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[i,o]of n)i.toLowerCase()==="set-cookie"?r.append(i,o):r.set(i,o)}if(a)for(const[n,i]of Object.entries(a))if(typeof i=="string")r.set(n,i);else{r.delete(n);for(const o of i)r.append(n,o)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??_(this,Xe);return new Response(t,{status:s,headers:r})},xa),re="ALL",as="all",rs=["get","post","put","delete","options","patch"],Ba="Can not add a route since the matcher is already built.",ja=class extends Error{},ss="__COMPOSED_HANDLER",ns=t=>t.text("404 Not Found",404),ca=(t,e)=>{if("getResponse"in t){const a=t.getResponse();return e.newResponse(a.body,a)}return console.error(t),e.text("Internal Server Error",500)},he,se,Ua,ge,Me,xt,kt,tt,is=(tt=class{constructor(e={}){H(this,se);C(this,"get");C(this,"post");C(this,"put");C(this,"delete");C(this,"options");C(this,"patch");C(this,"all");C(this,"on");C(this,"use");C(this,"router");C(this,"getPath");C(this,"_basePath","/");H(this,he,"/");C(this,"routes",[]);H(this,ge,ns);C(this,"errorHandler",ca);C(this,"onError",e=>(this.errorHandler=e,this));C(this,"notFound",e=>($(this,ge,e),this));C(this,"fetch",(e,...a)=>K(this,se,kt).call(this,e,a[1],a[0],e.method));C(this,"request",(e,a,r,s)=>e instanceof Request?this.fetch(a?new Request(e,a):e,r,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${Ke("/",e)}`,a),r,s)));C(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(K(this,se,kt).call(this,e.request,e,void 0,e.request.method))})});[...rs,as].forEach(n=>{this[n]=(i,...o)=>(typeof i=="string"?$(this,he,i):K(this,se,Me).call(this,n,_(this,he),i),o.forEach(l=>{K(this,se,Me).call(this,n,_(this,he),l)}),this)}),this.on=(n,i,...o)=>{for(const l of[i].flat()){$(this,he,l);for(const c of[n].flat())o.map(d=>{K(this,se,Me).call(this,c.toUpperCase(),_(this,he),d)})}return this},this.use=(n,...i)=>(typeof n=="string"?$(this,he,n):($(this,he,"*"),i.unshift(n)),i.forEach(o=>{K(this,se,Me).call(this,re,_(this,he),o)}),this);const{strict:r,...s}=e;Object.assign(this,s),this.getPath=r??!0?e.getPath??Ca:Vr}route(e,a){const r=this.basePath(e);return a.routes.map(s=>{var i;let n;a.errorHandler===ca?n=s.handler:(n=async(o,l)=>(await oa([],a.errorHandler)(o,()=>s.handler(o,l))).res,n[ss]=s.handler),K(i=r,se,Me).call(i,s.method,s.path,n)}),this}basePath(e){const a=K(this,se,Ua).call(this);return a._basePath=Ke(this._basePath,e),a}mount(e,a,r){let s,n;r&&(typeof r=="function"?n=r:(n=r.optionHandler,r.replaceRequest===!1?s=l=>l:s=r.replaceRequest));const i=n?l=>{const c=n(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};s||(s=(()=>{const l=Ke(this._basePath,e),c=l==="/"?0:l.length;return d=>{const m=new URL(d.url);return m.pathname=m.pathname.slice(c)||"/",new Request(m,d)}})());const o=async(l,c)=>{const d=await a(s(l.req.raw),...i(l));if(d)return d;await c()};return K(this,se,Me).call(this,re,Ke(e,"*"),o),this}},he=new WeakMap,se=new WeakSet,Ua=function(){const e=new tt({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,$(e,ge,_(this,ge)),e.routes=this.routes,e},ge=new WeakMap,Me=function(e,a,r){e=e.toUpperCase(),a=Ke(this._basePath,a);const s={basePath:this._basePath,path:a,method:e,handler:r};this.router.add(e,a,[r,s]),this.routes.push(s)},xt=function(e,a){if(e instanceof Error)return this.errorHandler(e,a);throw e},kt=function(e,a,r,s){if(s==="HEAD")return(async()=>new Response(null,await K(this,se,kt).call(this,e,a,r,"GET")))();const n=this.getPath(e,{env:r}),i=this.router.match(s,n),o=new ts(e,{path:n,matchResult:i,env:r,executionCtx:a,notFoundHandler:_(this,ge)});if(i[0].length===1){let c;try{c=i[0][0][0][0](o,async()=>{o.res=await _(this,ge).call(this,o)})}catch(d){return K(this,se,xt).call(this,d,o)}return c instanceof Promise?c.then(d=>d||(o.finalized?o.res:_(this,ge).call(this,o))).catch(d=>K(this,se,xt).call(this,d,o)):c??_(this,ge).call(this,o)}const l=oa(i[0],this.errorHandler,_(this,ge));return(async()=>{try{const c=await l(o);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return K(this,se,xt).call(this,c,o)}})()},tt),Ha=[];function os(t,e){const a=this.buildAllMatchers(),r=((s,n)=>{const i=a[s]||a[re],o=i[2][n];if(o)return o;const l=n.match(i[0]);if(!l)return[[],Ha];const c=l.indexOf("",1);return[i[1][c],l]});return this.match=r,r(t,e)}var Dt="[^/]+",dt=".*",ut="(?:|/.*)",Je=Symbol(),ls=new Set(".\\+*[^]$()");function cs(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===dt||t===ut?1:e===dt||e===ut?-1:t===Dt?1:e===Dt?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var Be,je,fe,Ge,ds=(Ge=class{constructor(){H(this,Be);H(this,je);H(this,fe,Object.create(null))}insert(e,a,r,s,n){if(e.length===0){if(_(this,Be)!==void 0)throw Je;if(n)return;$(this,Be,a);return}const[i,...o]=e,l=i==="*"?o.length===0?["","",dt]:["","",Dt]:i==="/*"?["","",ut]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const d=l[1];let m=l[2]||Dt;if(d&&l[2]&&(m===".*"||(m=m.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(m))))throw Je;if(c=_(this,fe)[m],!c){if(Object.keys(_(this,fe)).some(g=>g!==dt&&g!==ut))throw Je;if(n)return;c=_(this,fe)[m]=new Ge,d!==""&&$(c,je,s.varIndex++)}!n&&d!==""&&r.push([d,_(c,je)])}else if(c=_(this,fe)[i],!c){if(Object.keys(_(this,fe)).some(d=>d.length>1&&d!==dt&&d!==ut))throw Je;if(n)return;c=_(this,fe)[i]=new Ge}c.insert(o,a,r,s,n)}buildRegExpStr(){const a=Object.keys(_(this,fe)).sort(cs).map(r=>{const s=_(this,fe)[r];return(typeof _(s,je)=="number"?`(${r})@${_(s,je)}`:ls.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof _(this,Be)=="number"&&a.unshift(`#${_(this,Be)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},Be=new WeakMap,je=new WeakMap,fe=new WeakMap,Ge),It,wt,ka,us=(ka=class{constructor(){H(this,It,{varIndex:0});H(this,wt,new ds)}insert(t,e,a){const r=[],s=[];for(let i=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,l=>{const c=`@\\${i}`;return s[i]=[c,l],i++,o=!0,c}),!o)break}const n=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=s.length-1;i>=0;i--){const[o]=s[i];for(let l=n.length-1;l>=0;l--)if(n[l].indexOf(o)!==-1){n[l]=n[l].replace(o,s[i][1]);break}}return _(this,wt).insert(n,e,r,_(this,It),a),r}buildRegExp(){let t=_(this,wt).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const a=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,n,i)=>n!==void 0?(a[++e]=Number(n),"$()"):(i!==void 0&&(r[Number(i)]=++e),"")),[new RegExp(`^${t}`),a,r]}},It=new WeakMap,wt=new WeakMap,ka),ms=[/^$/,[],Object.create(null)],St=Object.create(null);function Ga(t){return St[t]??(St[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function ps(){St=Object.create(null)}function hs(t){var c;const e=new us,a=[];if(t.length===0)return ms;const r=t.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,m],[g,w])=>d?1:g?-1:m.length-w.length),s=Object.create(null);for(let d=0,m=-1,g=r.length;d<g;d++){const[w,f,T]=r[d];w?s[f]=[T.map(([x])=>[x,Object.create(null)]),Ha]:m++;let v;try{v=e.insert(f,m,w)}catch(x){throw x===Je?new ja(f):x}w||(a[m]=T.map(([x,E])=>{const O=Object.create(null);for(E-=1;E>=0;E--){const[N,P]=v[E];O[N]=P}return[x,O]}))}const[n,i,o]=e.buildRegExp();for(let d=0,m=a.length;d<m;d++)for(let g=0,w=a[d].length;g<w;g++){const f=(c=a[d][g])==null?void 0:c[1];if(!f)continue;const T=Object.keys(f);for(let v=0,x=T.length;v<x;v++)f[T[v]]=o[f[T[v]]]}const l=[];for(const d in i)l[d]=a[i[d]];return[n,l,s]}function We(t,e){if(t){for(const a of Object.keys(t).sort((r,s)=>s.length-r.length))if(Ga(a).test(e))return[...t[a]]}}var Oe,Ce,Ot,Fa,Sa,gs=(Sa=class{constructor(){H(this,Ot);C(this,"name","RegExpRouter");H(this,Oe);H(this,Ce);C(this,"match",os);$(this,Oe,{[re]:Object.create(null)}),$(this,Ce,{[re]:Object.create(null)})}add(t,e,a){var o;const r=_(this,Oe),s=_(this,Ce);if(!r||!s)throw new Error(Ba);r[t]||[r,s].forEach(l=>{l[t]=Object.create(null),Object.keys(l[re]).forEach(c=>{l[t][c]=[...l[re][c]]})}),e==="/*"&&(e="*");const n=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const l=Ga(e);t===re?Object.keys(r).forEach(c=>{var d;(d=r[c])[e]||(d[e]=We(r[c],e)||We(r[re],e)||[])}):(o=r[t])[e]||(o[e]=We(r[t],e)||We(r[re],e)||[]),Object.keys(r).forEach(c=>{(t===re||t===c)&&Object.keys(r[c]).forEach(d=>{l.test(d)&&r[c][d].push([a,n])})}),Object.keys(s).forEach(c=>{(t===re||t===c)&&Object.keys(s[c]).forEach(d=>l.test(d)&&s[c][d].push([a,n]))});return}const i=Ra(e)||[e];for(let l=0,c=i.length;l<c;l++){const d=i[l];Object.keys(s).forEach(m=>{var g;(t===re||t===m)&&((g=s[m])[d]||(g[d]=[...We(r[m],d)||We(r[re],d)||[]]),s[m][d].push([a,n-c+l+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(_(this,Ce)).concat(Object.keys(_(this,Oe))).forEach(e=>{t[e]||(t[e]=K(this,Ot,Fa).call(this,e))}),$(this,Oe,$(this,Ce,void 0)),ps(),t}},Oe=new WeakMap,Ce=new WeakMap,Ot=new WeakSet,Fa=function(t){const e=[];let a=t===re;return[_(this,Oe),_(this,Ce)].forEach(r=>{const s=r[t]?Object.keys(r[t]).map(n=>[n,r[t][n]]):[];s.length!==0?(a||(a=!0),e.push(...s)):t!==re&&e.push(...Object.keys(r[re]).map(n=>[n,r[re][n]]))}),a?hs(e):null},Sa),Re,Ee,Da,fs=(Da=class{constructor(t){C(this,"name","SmartRouter");H(this,Re,[]);H(this,Ee,[]);$(this,Re,t.routers)}add(t,e,a){if(!_(this,Ee))throw new Error(Ba);_(this,Ee).push([t,e,a])}match(t,e){if(!_(this,Ee))throw new Error("Fatal error");const a=_(this,Re),r=_(this,Ee),s=a.length;let n=0,i;for(;n<s;n++){const o=a[n];try{for(let l=0,c=r.length;l<c;l++)o.add(...r[l]);i=o.match(t,e)}catch(l){if(l instanceof ja)continue;throw l}this.match=o.match.bind(o),$(this,Re,[o]),$(this,Ee,void 0);break}if(n===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(_(this,Ee)||_(this,Re).length!==1)throw new Error("No active router has been determined yet.");return _(this,Re)[0]}},Re=new WeakMap,Ee=new WeakMap,Da),it=Object.create(null),Ne,oe,Ue,at,ie,Te,$e,rt,ys=(rt=class{constructor(e,a,r){H(this,Te);H(this,Ne);H(this,oe);H(this,Ue);H(this,at,0);H(this,ie,it);if($(this,oe,r||Object.create(null)),$(this,Ne,[]),e&&a){const s=Object.create(null);s[e]={handler:a,possibleKeys:[],score:0},$(this,Ne,[s])}$(this,Ue,[])}insert(e,a,r){$(this,at,++ia(this,at)._);let s=this;const n=Wr(a),i=[];for(let o=0,l=n.length;o<l;o++){const c=n[o],d=n[o+1],m=Yr(c,d),g=Array.isArray(m)?m[0]:c;if(g in _(s,oe)){s=_(s,oe)[g],m&&i.push(m[1]);continue}_(s,oe)[g]=new rt,m&&(_(s,Ue).push(m),i.push(m[1])),s=_(s,oe)[g]}return _(s,Ne).push({[e]:{handler:r,possibleKeys:i.filter((o,l,c)=>c.indexOf(o)===l),score:_(this,at)}}),s}search(e,a){var l;const r=[];$(this,ie,it);let n=[this];const i=Oa(a),o=[];for(let c=0,d=i.length;c<d;c++){const m=i[c],g=c===d-1,w=[];for(let f=0,T=n.length;f<T;f++){const v=n[f],x=_(v,oe)[m];x&&($(x,ie,_(v,ie)),g?(_(x,oe)["*"]&&r.push(...K(this,Te,$e).call(this,_(x,oe)["*"],e,_(v,ie))),r.push(...K(this,Te,$e).call(this,x,e,_(v,ie)))):w.push(x));for(let E=0,O=_(v,Ue).length;E<O;E++){const N=_(v,Ue)[E],P=_(v,ie)===it?{}:{..._(v,ie)};if(N==="*"){const I=_(v,oe)["*"];I&&(r.push(...K(this,Te,$e).call(this,I,e,_(v,ie))),$(I,ie,P),w.push(I));continue}const[W,F,B]=N;if(!m&&!(B instanceof RegExp))continue;const G=_(v,oe)[W],q=i.slice(c).join("/");if(B instanceof RegExp){const I=B.exec(q);if(I){if(P[F]=I[0],r.push(...K(this,Te,$e).call(this,G,e,_(v,ie),P)),Object.keys(_(G,oe)).length){$(G,ie,P);const L=((l=I[0].match(/\//))==null?void 0:l.length)??0;(o[L]||(o[L]=[])).push(G)}continue}}(B===!0||B.test(m))&&(P[F]=m,g?(r.push(...K(this,Te,$e).call(this,G,e,P,_(v,ie))),_(G,oe)["*"]&&r.push(...K(this,Te,$e).call(this,_(G,oe)["*"],e,P,_(v,ie)))):($(G,ie,P),w.push(G)))}}n=w.concat(o.shift()??[])}return r.length>1&&r.sort((c,d)=>c.score-d.score),[r.map(({handler:c,params:d})=>[c,d])]}},Ne=new WeakMap,oe=new WeakMap,Ue=new WeakMap,at=new WeakMap,ie=new WeakMap,Te=new WeakSet,$e=function(e,a,r,s){const n=[];for(let i=0,o=_(e,Ne).length;i<o;i++){const l=_(e,Ne)[i],c=l[a]||l[re],d={};if(c!==void 0&&(c.params=Object.create(null),n.push(c),r!==it||s&&s!==it))for(let m=0,g=c.possibleKeys.length;m<g;m++){const w=c.possibleKeys[m],f=d[c.score];c.params[w]=s!=null&&s[w]&&!f?s[w]:r[w]??(s==null?void 0:s[w]),d[c.score]=!0}}return n},rt),He,Ia,vs=(Ia=class{constructor(){C(this,"name","TrieRouter");H(this,He);$(this,He,new ys)}add(t,e,a){const r=Ra(e);if(r){for(let s=0,n=r.length;s<n;s++)_(this,He).insert(t,r[s],a);return}_(this,He).insert(t,e,a)}match(t,e){return _(this,He).search(t,e)}},He=new WeakMap,Ia),ke=class extends is{constructor(t={}){super(t),this.router=t.router??new fs({routers:[new gs,new vs]})}},ws=t=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(n=>typeof n=="string"?n==="*"?()=>n:i=>n===i?i:null:typeof n=="function"?n:i=>n.includes(i)?i:null)(a.origin),s=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(a.allowMethods);return async function(i,o){var d;function l(m,g){i.res.headers.set(m,g)}const c=await r(i.req.header("origin")||"",i);if(c&&l("Access-Control-Allow-Origin",c),a.credentials&&l("Access-Control-Allow-Credentials","true"),(d=a.exposeHeaders)!=null&&d.length&&l("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),i.req.method==="OPTIONS"){a.origin!=="*"&&l("Vary","Origin"),a.maxAge!=null&&l("Access-Control-Max-Age",a.maxAge.toString());const m=await s(i.req.header("origin")||"",i);m.length&&l("Access-Control-Allow-Methods",m.join(","));let g=a.allowHeaders;if(!(g!=null&&g.length)){const w=i.req.header("Access-Control-Request-Headers");w&&(g=w.split(/\s*,\s*/))}return g!=null&&g.length&&(l("Access-Control-Allow-Headers",g.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),a.origin!=="*"&&i.header("Vary","Origin",{append:!0})}};function qa(){return`<!DOCTYPE html>
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
    container.innerHTML = '<div class="chat-area" id="chatArea"><div id="messages"></div><div id="thinking" class="thinking" style="display:none">Thinking…<span class="thinking-cursor"></span></div></div>' +
      '<div class="input-area"><div class="input-wrap">' +
        '<input type="file" id="fileInput" style="display:none" multiple>' +
        '<button class="input-btn" id="attachBtn" title="Attach file">&#128206;</button>' +
        '<div style="flex:1;display:flex;flex-direction:column;">' +
          '<div id="fileChips" style="display:none;flex-wrap:wrap;gap:4px;margin-bottom:4px;"></div>' +
          '<textarea class="input-field" id="inputField" placeholder="Message Karna…" rows="5"></textarea>' +
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
      'get_place_details': 'Getting Place Details',
      'get_directions': 'Getting Directions',
      'get_travel_time': 'Getting Travel Time',
      'geocode_address': 'Geocoding',
      'translate_text': 'Translating',
      'search_youtube': 'YouTube Search',
      'gmail_list': 'Checking Gmail',
      'gmail_read': 'Reading Email',
      'gmail_search': 'Searching Gmail',
      'gmail_send': 'Sending Email',
      'gmail_draft': 'Creating Draft',
      'gmail_unread_count': 'Checking Unread',
      'gmail_modify': 'Updating Email',
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
      'drive_read_file': 'Reading Drive File',
      'drive_delete_file': 'Deleting File',
      'drive_organise': 'Organising File',
      'parse_document': 'Parsing Document',
      'store_memory': 'Saving Memory',
      'search_memory': 'Searching Memory',
      'delete_memory': 'Deleting Memory',
      'update_memory': 'Updating Memory',
      'create_schedule': 'Creating Schedule',
      'list_schedules': 'Listing Schedules',
      'update_schedule': 'Updating Schedule',
      'delete_schedule': 'Deleting Schedule',
      'toggle_schedule': 'Toggling Schedule',
      'create_skill': 'Creating Skill',
      'list_skills': 'Listing Skills',
      'get_system_status': 'Checking Status',
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
    var credProviderIds = {};
    (data.credentials || []).forEach(function(c) { configured[c.service] = true; credLabels[c.service] = c.label || ''; if (c.provider_id) credProviderIds[c.service] = c.provider_id; });
    var llmProviders = data.llm_providers || {};

    // Build provider dropdown options (with optional pre-selected value)
    function buildProviderOptions(selectedId) {
      var opts = '<option value="">-- Select Provider --</option>';
      var providerKeys = Object.keys(llmProviders);
      for (var pk = 0; pk < providerKeys.length; pk++) {
        var prov = llmProviders[providerKeys[pk]];
        opts += '<option value="' + prov.id + '"' + (prov.id === selectedId ? ' selected' : '') + '>' + escapeHtml(prov.label) + '</option>';
      }
      return opts;
    }
    var providerOptions = buildProviderOptions('');

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
      ]},
      { title:'BROWSER AUTOMATION', desc:'Browser Use Cloud runs a real browser agent — fills forms, clicks, navigates any site. Get your API key at cloud.browser-use.com.', items:[
        {key:'browser_use_api_key',label:'Browser Use API Key',placeholder:'bu_...'}
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
          var savedProviderId = credProviderIds[slotKey] || '';
          var badgeColor = isSlotSet ? 'rgba(79,209,197,0.2)' : 'rgba(255,255,255,0.06)';
          var badgeTextColor = isSlotSet ? 'var(--accent)' : 'var(--text-muted)';
          var badgeText = isSlotSet ? slotProviderLabel || 'active' : 'empty';

          html += '<div class="item-card" style="margin-bottom:10px">';
          html += '<div class="item-card-header"><span class="item-card-title">' + slotLabel + '</span>';
          html += '<span class="tag" style="background:' + badgeColor + ';color:' + badgeTextColor + ';">' + escapeHtml(badgeText) + '</span></div>';
          // Row 1: Provider dropdown (pre-selected if saved) + API key
          html += '<div style="margin-top:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">';
          html += '<select id="slotProvider_' + slotKey + '" onchange="onSlotProviderChange(\\'' + slotKey + '\\')" style="flex:0 0 auto;min-width:160px;background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:10px;border-radius:6px;font-size:13px;outline:none;">' + buildProviderOptions(savedProviderId) + '</select>';
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

    // === Secret Vault section ===
    html += '<div style="margin-top:32px;">';
    html += '<div style="font-size:10px;font-weight:600;letter-spacing:1.5px;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;">SECRET VAULT</div>';
    html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;line-height:1.5;">Store login credentials for websites. Used automatically when you say "log into my LinkedIn" or pass a site name to a browser task. Credentials are encrypted with your PIN.</div>';
    html += '<div id="vaultEntries" style="margin-bottom:10px;"></div>';
    html += '<div style="display:flex;flex-direction:column;gap:6px;">';
    html += '<input id="vaultName" type="text" placeholder="Site name (e.g. LinkedIn)" style="background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px 10px;font-size:12px;">';
    html += '<input id="vaultUser" type="text" placeholder="Username or email" autocomplete="off" style="background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px 10px;font-size:12px;">';
    html += '<input id="vaultPass" type="password" placeholder="Password" autocomplete="new-password" style="background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px 10px;font-size:12px;">';
    html += '<button class="btn btn-small" onclick="saveVaultEntry()" style="align-self:flex-start;">Save Credential</button>';
    html += '</div>';
    html += '<div id="vaultMsg" class="success-text" style="margin-top:6px;"></div>';
    html += '</div>';

    container.innerHTML = html;
    loadGoogleStatus();
    loadVaultEntries();
  }

  async function loadVaultEntries() {
    var el = document.getElementById('vaultEntries');
    if (!el) return;
    var data = await api('/settings/site-vault');
    if (!data.entries || data.entries.length === 0) {
      el.innerHTML = '<div style="font-size:11px;color:var(--text-muted);font-style:italic;">No credentials saved yet.</div>';
      return;
    }
    var h = '';
    for (var i = 0; i < data.entries.length; i++) {
      var e = data.entries[i];
      h += '<div style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;background:var(--input-bg);border:1px solid var(--border);border-radius:6px;margin-bottom:5px;">';
      h += '<span style="font-size:12px;color:var(--text);font-weight:500;">' + escapeHtml(e.name) + '</span>';
      h += '<button class="btn btn-small btn-danger" onclick="deleteVaultEntry(' + e.id + ')">Remove</button>';
      h += '</div>';
    }
    el.innerHTML = h;
  }

  window.saveVaultEntry = async function() {
    var name = (document.getElementById('vaultName') as HTMLInputElement)?.value.trim();
    var username = (document.getElementById('vaultUser') as HTMLInputElement)?.value.trim();
    var password = (document.getElementById('vaultPass') as HTMLInputElement)?.value;
    var msg = document.getElementById('vaultMsg');
    if (!name || !username || !password) { if (msg) { msg.style.color = 'var(--danger)'; msg.textContent = 'All fields required.'; } return; }
    var res = await api('/settings/site-vault', { method: 'PUT', body: JSON.stringify({ name, username, password }) });
    if (res.success) {
      (document.getElementById('vaultName') as HTMLInputElement).value = '';
      (document.getElementById('vaultUser') as HTMLInputElement).value = '';
      (document.getElementById('vaultPass') as HTMLInputElement).value = '';
      if (msg) { msg.style.color = 'var(--accent)'; msg.textContent = 'Saved.'; setTimeout(function() { if (msg) msg.textContent = ''; }, 2000); }
      loadVaultEntries();
    } else {
      if (msg) { msg.style.color = 'var(--danger)'; msg.textContent = res.error || 'Save failed.'; }
    }
  };

  window.deleteVaultEntry = async function(id) {
    await api('/settings/site-vault/' + id, { method: 'DELETE' });
    loadVaultEntries();
  };

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
    // If fields are populated, test those; otherwise test the saved credential
    var body = (provider && apiKey)
      ? JSON.stringify({service: slotKey, value: JSON.stringify({provider: provider, apiKey: apiKey})})
      : JSON.stringify({service: slotKey});
    try {
      var r = await api('/settings/credentials/validate', {method:'POST', body: body});
      if (el) { el.innerHTML = r.valid ? '<span style="color:var(--accent);">\\u2713 ' + escapeHtml(r.message) + '</span>' : '<span style="color:var(--danger);">\\u2717 ' + escapeHtml(r.error || r.message) + '</span>'; setTimeout(function(){if(el)el.innerHTML='';},6000); }
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
    // If field is empty, test the stored credential — server will decrypt and validate it
    var body = value
      ? JSON.stringify({service: service, value: value})
      : JSON.stringify({service: service});
    try {
      var r = await api('/settings/credentials/validate', {method:'POST', body: body});
      if (el) { el.innerHTML = r.valid ? '<span style="color:var(--accent);">\\u2713 ' + escapeHtml(r.message) + '</span>' : '<span style="color:var(--danger);">\\u2717 ' + escapeHtml(r.error || r.message) + '</span>'; setTimeout(function(){if(el)el.innerHTML='';},6000); }
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
</html>`}const Vt="AES-GCM",bs=256;async function Wa(t){const e=new TextEncoder,a=await crypto.subtle.importKey("raw",e.encode(t.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:e.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},a,{name:Vt,length:bs},!1,["encrypt","decrypt"])}async function Ct(t,e){const a=await Wa(e),r=crypto.getRandomValues(new Uint8Array(12)),s=new TextEncoder,n=await crypto.subtle.encrypt({name:Vt,iv:r},a,s.encode(t)),i=new Uint8Array(r.length+new Uint8Array(n).length);return i.set(r),i.set(new Uint8Array(n),r.length),btoa(String.fromCharCode(...i))}async function J(t,e){const a=await Wa(e),r=new Uint8Array(atob(t).split("").map(o=>o.charCodeAt(0))),s=r.slice(0,12),n=r.slice(12),i=await crypto.subtle.decrypt({name:Vt,iv:s},a,n);return new TextDecoder().decode(i)}async function Rt(t){const a=new TextEncoder().encode(t+"karna-pin-salt"),r=await crypto.subtle.digest("SHA-256",a);return btoa(String.fromCharCode(...new Uint8Array(r)))}async function za(t,e){return await Rt(t)===e}const Zt=Object.freeze(Object.defineProperty({__proto__:null,decrypt:J,encrypt:Ct,hashPin:Rt,verifyPin:za},Symbol.toStringTag,{value:"Module"})),Ae=new ke;Ae.get("/check",async t=>{const e=await t.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return t.json({hasUsers:((e==null?void 0:e.cnt)||0)>0})});Ae.post("/setup",async t=>{const{username:e,name:a,pin:r,personality_prompt:s,timezone:n}=await t.req.json();if(!e||!a||!r)return t.json({error:"Username, name, and PIN are required"},400);if(r.length<4)return t.json({error:"PIN must be at least 4 characters"},400);if(await t.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(e).first())return t.json({error:"Username already taken"},409);const o=await Rt(r);await t.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(e,a,o,s||"",n||"Asia/Kolkata").run();const l=await t.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(e).first(),c=crypto.randomUUID(),d=new Date(Date.now()+10080*60*1e3).toISOString();return await t.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(c,l.id,"web",d).run(),t.json({success:!0,sessionId:c,user:{id:l.id,username:l.username,name:l.name}})});Ae.post("/login",async t=>{const{username:e,pin:a}=await t.req.json();if(!e||!a)return t.json({error:"Username and PIN required"},400);const r=await t.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(e).first();if(!r)return t.json({error:"User not found"},404);if(!await za(a,r.pin_hash))return t.json({error:"Invalid PIN"},401);const n=crypto.randomUUID(),i=new Date(Date.now()+10080*60*1e3).toISOString();return await t.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(n,r.id,"web",i).run(),t.json({success:!0,sessionId:n,user:{id:r.id,username:r.username,name:r.name}})});Ae.post("/logout",async t=>{var a;const e=(a=t.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");return e&&await t.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(e).run(),t.json({success:!0})});Ae.get("/users/hints",async t=>{const a=((await t.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(r=>{var s;return{username:r.username,name_hint:r.name.split(" ")[0],created:((s=r.created_at)==null?void 0:s.split(" ")[0])||""}});return t.json({users:a,count:a.length})});Ae.post("/reset-pin",async t=>{var o;const{username:e,name:a,new_pin:r}=await t.req.json();if(!e||!a||!r)return t.json({error:"Username, display name, and new PIN are required"},400);if(r.length<4)return t.json({error:"PIN must be at least 4 characters"},400);const s=await t.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(e).first();if(!s)return t.json({error:"User not found"},404);if(s.name.toLowerCase().trim()!==a.toLowerCase().trim())return t.json({error:"Display name does not match. This is required for identity verification."},403);const n=await Rt(r);await t.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,s.id).run();const i=await t.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(s.id).run();return await t.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(s.id).run(),t.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((o=i.meta)==null?void 0:o.changes)||0})});Ae.get("/me",async t=>{var r;const e=(r=t.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!e)return t.json({error:"No session"},401);const a=await t.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();return a?t.json({user:{id:a.uid,username:a.username,name:a.name,role:a.role,timezone:a.timezone}}):t.json({error:"Invalid or expired session"},401)});const mt={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},_s=55e3;function Ka(t,e){return Promise.race([t,new Promise((a,r)=>setTimeout(()=>r(new Error(`LLM timeout: ${e} did not respond within 25 seconds. Try again or switch providers in Settings → Keys.`)),_s))])}async function j(t,e,a,r,s,n={}){try{await t.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(e,a,r,s,JSON.stringify(n)).run()}catch(i){console.error("Failed to log error:",i)}}async function Pt(t,e,a,r,s,n){try{const i=`provider_alert:${r}:${a}`;if(await t.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(e,i).first())return;await j(t,e,"provider_alert",i,`${r} failed: ${n.substring(0,200)}`,{alertType:a,failedProvider:r,fallbackProvider:s});let l;a==="all_providers_down"?l=`🚨 All LLM providers failed

Last error from ${r}: ${da(n)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:l=`⚠️ LLM Provider Issue

${r}: ${da(n)}
Switched to: ${s}

Check your ${r} API credit balance or key.`;const{decrypt:c}=await Promise.resolve().then(()=>Zt),d=await t.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(e).first();if(!(d!=null&&d.telegram_chat_id))return;const m=await t.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(e).first();if(!m)return;const g=await c(m.encrypted_value,d.pin_hash);await fetch(`https://api.telegram.org/bot${g}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d.telegram_chat_id,text:l})})}catch(i){console.error("Failed to send provider alert:",i)}}function da(t){return t.includes("credit balance")||t.includes("insufficient")||t.includes("402")?"Credits exhausted or balance too low":t.includes("429")||t.includes("rate_limit")||t.includes("quota")?"Rate limit / quota exceeded":t.includes("401")||t.includes("authentication")||t.includes("invalid")&&t.includes("key")?"API key invalid or expired":t.includes("403")?"Access denied (key may lack permissions)":t.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":t.includes("properties field not found")?"Schema compatibility issue":"API error"}class Ya{constructor(e,a="claude-sonnet-4-20250514",r="https://api.anthropic.com",s="anthropic"){C(this,"name");C(this,"apiKey");C(this,"model");C(this,"apiBase");this.apiKey=e,this.model=a,this.apiBase=r,this.name=s}async chat(e,a){var d,m,g,w;const r=e.find(f=>f.role==="system"),s=e.filter(f=>f.role!=="system"),n={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:s.map(f=>({role:f.role,content:f.content}))};r&&(n.system=r.content),a!=null&&a.tools&&a.tools.length>0&&(n.tools=a.tools.map(f=>({name:f.name,description:f.description,input_schema:f.parameters})),a.toolChoice==="required"&&(n.tool_choice={type:"any"}));const i=await Ka(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(n)}),this.name);if(!i.ok){const f=await i.text();throw new Error(this.name+" API error "+i.status+": "+f)}const o=await i.json(),l=((d=o.content)==null?void 0:d.filter(f=>f.type==="text"))||[],c=((m=o.content)==null?void 0:m.filter(f=>f.type==="tool_use"))||[];return{content:l.map(f=>f.text).join(`
`),toolCalls:c.map(f=>({id:f.id,name:f.name,arguments:f.input})),usage:{promptTokens:((g=o.usage)==null?void 0:g.input_tokens)||0,completionTokens:((w=o.usage)==null?void 0:w.output_tokens)||0}}}async streamChat(e,a){const r=e.find(c=>c.role==="system"),s=e.filter(c=>c.role!=="system"),n={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:s.map(c=>({role:c.role,content:c.content}))};r&&(n.system=r.content);const i=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(n)});if(!i.ok){const c=await i.text();throw new Error(this.name+" stream error "+i.status+": "+c)}const o=i.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(c){var f;const{done:d,value:m}=await o.read();if(d){c.close();return}const w=l.decode(m,{stream:!0}).split(`
`);for(const T of w)if(T.startsWith("data: ")){const v=T.slice(6);if(v==="[DONE]")continue;try{const x=JSON.parse(v);x.type==="content_block_delta"&&((f=x.delta)!=null&&f.text)&&c.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:x.delta.text})+`

`))}catch{}}}})}}function Es(t){const e={},a=t||{};if(e.type=a.type||"object",e.type==="object"){const r=a.properties;if(r&&typeof r=="object"&&Object.keys(r).length>0){const s={};for(const[n,i]of Object.entries(r))i&&typeof i=="object"?s[n]=qt(i):s[n]=i;e.properties=s}else e.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(a.required)?e.required=a.required:e.required=[]}return a.description&&(e.description=a.description),e}function qt(t){const e={...t};if(e.type||(e.type="string"),e.type==="object"){const a=e.properties;if(a&&typeof a=="object"&&Object.keys(a).length>0){const r={};for(const[s,n]of Object.entries(a))n&&typeof n=="object"?r[s]=qt(n):r[s]=n;e.properties=r}else e.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(e.required)||(e.required=[])}return e.type==="array"&&e.items?typeof e.items=="object"&&(e.items=qt(e.items)):e.type==="array"&&!e.items&&(e.items={type:"string"}),e}class Ja{constructor(e,a,r,s){C(this,"name");C(this,"apiKey");C(this,"model");C(this,"apiBase");this.apiKey=e,this.model=a,this.apiBase=r.replace(/\/+$/,""),this.name=s}async chat(e,a){var l,c,d,m,g,w;const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:e.map(f=>({role:f.role,content:f.content}))},s=this.apiBase.includes("routellm.abacus.ai");if(a!=null&&a.tools&&a.tools.length>0&&s)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");a!=null&&a.tools&&a.tools.length>0&&(r.tools=a.tools.map(f=>({type:"function",function:{name:f.name,description:f.description,parameters:Es(f.parameters||{})}})),a.toolChoice==="required"&&(r.tool_choice="required"));const n=await Ka(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)}),this.name);if(!n.ok){const f=await n.text();throw new Error(this.name+" API error "+n.status+": "+f)}const i=await n.json(),o=(l=i.choices)==null?void 0:l[0];return{content:((c=o==null?void 0:o.message)==null?void 0:c.content)||"",toolCalls:(m=(d=o==null?void 0:o.message)==null?void 0:d.tool_calls)==null?void 0:m.map(f=>({id:f.id,name:f.function.name,arguments:(()=>{try{return typeof f.function.arguments=="string"?JSON.parse(f.function.arguments||"{}"):f.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((g=i.usage)==null?void 0:g.prompt_tokens)||0,completionTokens:((w=i.usage)==null?void 0:w.completion_tokens)||0}}}async streamChat(e,a){const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:e.map(o=>({role:o.role,content:o.content}))},s=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)});if(!s.ok){const o=await s.text();throw new Error(this.name+" stream error "+s.status+": "+o)}const n=s.body.getReader(),i=new TextDecoder;return new ReadableStream({async pull(o){var g,w,f;const{done:l,value:c}=await n.read();if(l){o.close();return}const m=i.decode(c,{stream:!0}).split(`
`);for(const T of m)if(T.startsWith("data: ")){const v=T.slice(6);if(v==="[DONE]")continue;try{const E=(f=(w=(g=JSON.parse(v).choices)==null?void 0:g[0])==null?void 0:w.delta)==null?void 0:f.content;E&&o.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:E})+`

`))}catch{}}}})}}function Wt(t,e,a,r){const s=mt[t];if(!s)throw new Error(`Unknown LLM provider: ${t}`);const n=r||s.defaultModel;return s.apiFormat==="anthropic"?new Ya(e,n,s.apiBase,a):new Ja(e,n,s.apiBase,a)}class Va{constructor(){C(this,"errorLog",new Map);C(this,"usageLog",new Map)}async pickProvider(e){const a=Date.now(),r=e.filter(s=>{const n=this.errorLog.get(s);return n?n.cooldownUntil<=a:!0});return r.length>0?r[0]:null}async recordUsage(e,a){const r=this.usageLog.get(e)||{tokens:0,requests:0};this.usageLog.set(e,{tokens:r.tokens+a,requests:r.requests+1})}async recordError(e,a,r=5){this.errorLog.set(e,{error:a,cooldownUntil:Date.now()+r*60*1e3})}}const Ts=["llm_slot_1","llm_slot_2","llm_slot_3"],xs=["anthropic","openai"];async function bt(t,e,a){const{decrypt:r}=await Promise.resolve().then(()=>Zt),s=new Va,n=[];for(const m of Ts){const g=await t.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(e,m).first();if(g)try{const w=await r(g.encrypted_value,a),f=JSON.parse(w);if(f.provider&&f.apiKey&&mt[f.provider]){const v=f.provider,x=Wt(f.provider,f.apiKey,v,f.model);n.push({name:v,provider:x})}}catch(w){console.error(`Failed to load ${m}:`,w)}}const i=new Set(n.map(m=>m.name));for(const m of xs){if(i.has(m))continue;const g=await t.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(e,m).first();if(g)try{const w=await r(g.encrypted_value,a);if(mt[m]){const T=Wt(m,w,m);n.push({name:m,provider:T})}}catch{console.error(`Failed to decrypt legacy ${m} key`)}}if(n.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const o=n.map(m=>m.name),l=await s.pickProvider(o);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:n[0].provider,rotation:s};const c=n.find(m=>m.name===l);return{provider:ks(c.provider,n,s,t,e),rotation:s}}function ks(t,e,a,r,s){const n=o=>o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")||o.includes("TOOLS_UNSUPPORTED"),i=o=>o.includes("429")||o.toLowerCase().includes("rate limit")||o.toLowerCase().includes("too many requests");return e.length<=1?{name:t.name,async chat(o,l){try{return await t.chat(o,l)}catch(c){const d=c.message||"";throw n(d)&&!d.includes("TOOLS_UNSUPPORTED")&&Pt(r,s,"all_providers_down",t.name,null,d),c}},async streamChat(o,l){return await t.streamChat(o,l)}}:{name:t.name,async chat(o,l){try{return await t.chat(o,l)}catch(c){const d=c.message||"",m=i(d);if(!n(d)&&!m)throw c;const g=d.includes("TOOLS_UNSUPPORTED"),w=g?1:m?10:1440;console.warn(`Provider ${t.name} ${m?"rate limited":g?"tools unsupported":"auth/billing error"}, trying fallback...`),await a.recordError(t.name,d,w);const f=e.filter(T=>T.name!==t.name);for(const T of f)try{const v=await T.provider.chat(o,l);return this.name=T.name,!g&&!m&&Pt(r,s,"provider_switched",t.name,T.name,d),v}catch(v){const x=v.message||"";if(n(x)||i(x)){await a.recordError(T.name,x,i(x)?10:1440);continue}throw v}throw Pt(r,s,"all_providers_down",t.name,null,d),new Error(`All LLM providers failed. Primary (${t.name}): ${d.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(o,l){return await t.streamChat(o,l)}}}const Ve=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:Ya,OpenAICompatibleProvider:Ja,ProviderRotation:Va,createProviderFromConfig:Wt,createRotatingProvider:bt,logError:j},Symbol.toStringTag,{value:"Module"})),Bt=20,Ss=2e3,Ds=2e3,Za=4;function Is(t){return Math.ceil(t.length/Za)}function ua(t,e){const a=e*Za;return t.length<=a?t:t.slice(0,a)+`
[...truncated to fit token budget]`}class Q{constructor(e){this.db=e}async store(e,a,r,s,n=5,i="working"){const o=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(e,a,r).first();o?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,n,i,o.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(e,a,r,s,n,i).run(),i==="working"&&await this.enforceWorkingMemoryCap(e)}async cleanupDoneTasks(e){await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND type = 'task' AND status = 'done' AND tier = 'working'
       AND updated_at < datetime('now', '-7 days')`).bind(e).run()}async enforceWorkingMemoryCap(e){const a=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(e).first();if(((a==null?void 0:a.cnt)||0)>Bt){const r=((a==null?void 0:a.cnt)||0)-Bt;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND tier = 'working' AND importance < 8 AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' AND importance < 8
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(e,e,r).run()}}async getWorkingMemory(e){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(e,Bt).all()).results||[]}async getAll(e,a,r=50){return a?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(e,a,r).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(e,r).all()).results||[]}async search(e,a,r=10){const n=(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(e,`%${a}%`,`%${a}%`,r).all()).results||[];if(n.length>0)return await this.touchMemories(e,n.map(d=>d.id)),n;const i=a.split(/\s+/).filter(d=>d.length>2);if(i.length===0)return[];const o=new Map,l=new Map;for(const d of i){const m=await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) LIMIT ?").bind(e,`%${d}%`,`%${d}%`,r*2).all();for(const g of m.results||[])o.set(g.id,(o.get(g.id)||0)+1),l.set(g.id,g)}const c=[...l.values()].sort((d,m)=>(o.get(m.id)||0)-(o.get(d.id)||0)).slice(0,r);return c.length>0&&await this.touchMemories(e,c.map(d=>d.id)),c}async searchLongTerm(e,a,r=5){const n=(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(e,`%${a}%`,`%${a}%`,r).all()).results||[];if(n.length>0)return await this.touchMemories(e,n.map(d=>d.id)),n;const i=a.split(/\s+/).filter(d=>d.length>2);if(i.length===0)return[];const o=new Map,l=new Map;for(const d of i){const m=await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) LIMIT ?").bind(e,`%${d}%`,`%${d}%`,r*2).all();for(const g of m.results||[])o.set(g.id,(o.get(g.id)||0)+1),l.set(g.id,g)}const c=[...l.values()].sort((d,m)=>(o.get(m.id)||0)-(o.get(d.id)||0)).slice(0,r);return c.length>0&&await this.touchMemories(e,c.map(d=>d.id)),c}async touchMemories(e,a){for(const r of a)await this.db.prepare("UPDATE memory SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,e).run()}async update(e,a,r){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,e,a).run()}async promote(e,a){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(e,a).run(),await this.enforceWorkingMemoryCap(a)}async demote(e,a){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(e,a).run()}async remove(e,a){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(e,a).run()}async buildContext(e){const a=await this.getWorkingMemory(e);if(a.length===0)return"";const r={};for(const n of a)r[n.type]||(r[n.type]=[]),r[n.type].push(n);let s=`
## Working Memory (Active Context)
`;for(const[n,i]of Object.entries(r)){s+=`
### ${n.charAt(0).toUpperCase()+n.slice(1)}s
`;for(const o of i)s+=`- **${o.title}**: ${o.content}
`}return ua(s,Ss)}static truncatePersonality(e){return ua(e,Ds)}async getRecentConversations(e,a=20,r){return r?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(e,r,a).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(e,a).all()).results||[]).reverse()}async storeMessage(e,a,r,s,n="{}",i){const o=Is(s);i?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(e,a,r,s,n,o,i).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(e,a,r,s,n,o).run()}async compactHistory(e,a=30){const r=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(e).first();((r==null?void 0:r.cnt)||0)<=a*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(e,e,a).run()}}const Os=Object.freeze(Object.defineProperty({__proto__:null,MemoryService:Q},Symbol.toStringTag,{value:"Module"})),Cs="https://accounts.google.com/o/oauth2/v2/auth",Xa="https://oauth2.googleapis.com/token",Rs="https://www.googleapis.com/oauth2/v2/userinfo",Ns=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let ye=null;async function zt(t,e,a){const r=await t.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(e,"google_oauth_tokens").first();if(!r)return null;try{const s=await J(r.encrypted_value,a);return JSON.parse(s)}catch{return null}}async function As(t,e,a,r){const s=await Ct(JSON.stringify(r),a);await t.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(e,s).run()}function Qa(t,e,a){const r=new URLSearchParams({client_id:t,redirect_uri:e,response_type:"code",scope:Ns,access_type:"offline",prompt:"consent",state:a,include_granted_scopes:"true"});return`${Cs}?${r}`}async function er(t,e,a,r){const s=await fetch(Xa,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:t,client_id:e,client_secret:a,redirect_uri:r,grant_type:"authorization_code"})}),n=await s.text();if(!s.ok)throw new Error(`Token exchange failed (${s.status}): ${n.substring(0,300)}`);return JSON.parse(n)}async function Ls(t,e,a){const r=await fetch(Xa,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:t,client_id:e,client_secret:a,grant_type:"refresh_token"})}),s=await r.text();if(!r.ok)throw r.status===400||r.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${r.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function tr(t){const e=await fetch(Rs,{headers:{Authorization:`Bearer ${t}`}});if(!e.ok)throw new Error(`Failed to fetch user info: ${e.status}`);return await e.json()}async function st(t,e,a,r,s){if(!r||!s)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(ye&&ye.userId===e&&ye.expiresAt>Date.now()/1e3+60){const o=await zt(t,e,a);return{token:ye.token,email:(o==null?void 0:o.email)||"unknown"}}const n=await zt(t,e,a);if(!n)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const i=await Ls(n.refresh_token,r,s);return ye={userId:e,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{token:i.access_token,email:n.email}}async function Xt(t,e,a){try{const r=await zt(t,e,a);return r?{connected:!0,email:r.email,connectedAt:r.connected_at}:{connected:!1}}catch{return{connected:!1}}}function ar(t,e){return!!(t&&e&&t.includes(".apps.googleusercontent.com"))}async function rr(t,e,a,r,s,n,i){const o=await er(r,n,i,s);if(!o.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await tr(o.access_token),c={refresh_token:o.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await As(t,e,a,c),ye={userId:e,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{email:l.email,name:l.name}}async function sr(t,e){await t.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(e).run(),(ye==null?void 0:ye.userId)===e&&(ye=null)}const ot="https://sheets.googleapis.com/v4/spreadsheets";class nr{constructor(e,a,r,s,n){this.db=e,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:e}=await st(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async readRange(e,a){const r=await this.authHeaders(),s=encodeURIComponent(a),n=await fetch(`${ot}/${e}/values/${s}`,{headers:r});if(!n.ok){const o=await n.text();throw new Error(`Sheets read failed (${n.status}): ${o}`)}return(await n.json()).values||[]}async writeRange(e,a,r){const s=await this.authHeaders(),n=encodeURIComponent(a),i=await fetch(`${ot}/${e}/values/${n}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:s,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!i.ok){const l=await i.text();throw new Error(`Sheets write failed (${i.status}): ${l}`)}return{updatedCells:(await i.json()).updatedCells||0}}async appendRows(e,a,r){var l;const s=await this.authHeaders(),n=encodeURIComponent(a),i=await fetch(`${ot}/${e}/values/${n}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:s,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!i.ok){const c=await i.text();throw new Error(`Sheets append failed (${i.status}): ${c}`)}return{updatedCells:((l=(await i.json()).updates)==null?void 0:l.updatedCells)||r.length}}async createSpreadsheet(e,a){const r=await this.authHeaders(),s={properties:{title:e},sheets:a&&a.length>0?a.map(o=>({properties:{title:o}})):[{properties:{title:"Sheet1"}}]},n=await fetch(ot,{method:"POST",headers:r,body:JSON.stringify(s)});if(!n.ok){const o=await n.text();throw new Error(`Sheets create failed (${n.status}): ${o}`)}const i=await n.json();return{spreadsheetId:i.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${i.spreadsheetId}/edit`}}async getMetadata(e){const a=await this.authHeaders(),r=await fetch(`${ot}/${e}?fields=properties.title,sheets.properties.title`,{headers:a});if(!r.ok){const n=await r.text();throw new Error(`Sheets metadata failed (${r.status}): ${n}`)}const s=await r.json();return{title:s.properties.title,sheets:s.sheets.map(n=>n.properties.title)}}}const lt="https://www.googleapis.com/calendar/v3";class Qt{constructor(e,a,r,s,n){this.db=e,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:e}=await st(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async listEvents(e="primary",a={}){const r=await this.authHeaders(),s=new URLSearchParams;a.timeMin&&s.set("timeMin",a.timeMin),a.timeMax&&s.set("timeMax",a.timeMax),s.set("maxResults",String(a.maxResults||20)),s.set("singleEvents","true"),s.set("orderBy","startTime"),a.query&&s.set("q",a.query);const n=await fetch(`${lt}/calendars/${encodeURIComponent(e)}/events?${s}`,{headers:r});if(!n.ok){const o=await n.text();throw new Error(`Calendar list failed (${n.status}): ${o}`)}return(await n.json()).items||[]}async createEvent(e="primary",a){var o;const r=await this.authHeaders(),s=a.timeZone||"Asia/Kolkata",n={summary:a.summary,description:a.description||"",location:a.location||"",start:{dateTime:a.startDateTime,timeZone:s},end:{dateTime:a.endDateTime,timeZone:s}};(o=a.attendees)!=null&&o.length&&(n.attendees=a.attendees.map(l=>({email:l})));const i=await fetch(`${lt}/calendars/${encodeURIComponent(e)}/events`,{method:"POST",headers:r,body:JSON.stringify(n)});if(!i.ok){const l=await i.text();throw new Error(`Calendar create failed (${i.status}): ${l}`)}return await i.json()}async updateEvent(e="primary",a,r){const s=await this.authHeaders(),n=r.timeZone||"Asia/Kolkata",i={};r.summary&&(i.summary=r.summary),r.description&&(i.description=r.description),r.location&&(i.location=r.location),r.startDateTime&&(i.start={dateTime:r.startDateTime,timeZone:n}),r.endDateTime&&(i.end={dateTime:r.endDateTime,timeZone:n});const o=await fetch(`${lt}/calendars/${encodeURIComponent(e)}/events/${a}`,{method:"PATCH",headers:s,body:JSON.stringify(i)});if(!o.ok){const l=await o.text();throw new Error(`Calendar update failed (${o.status}): ${l}`)}return await o.json()}async deleteEvent(e="primary",a){const r=await this.authHeaders(),s=await fetch(`${lt}/calendars/${encodeURIComponent(e)}/events/${a}`,{method:"DELETE",headers:r});if(!s.ok&&s.status!==410){const n=await s.text();throw new Error(`Calendar delete failed (${s.status}): ${n}`)}}async listCalendars(){const e=await this.authHeaders(),a=await fetch(`${lt}/users/me/calendarList`,{headers:e});if(!a.ok){const s=await a.text();throw new Error(`Calendar list calendars failed (${a.status}): ${s}`)}return((await a.json()).items||[]).map(s=>({id:s.id,summary:s.summary,primary:s.primary||!1}))}}const jt="https://docs.googleapis.com/v1/documents",Ms="https://www.googleapis.com/drive/v3/files";class ir{constructor(e,a,r,s,n){this.db=e,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:e}=await st(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async createDocument(e){const a=await this.authHeaders(),r=await fetch(jt,{method:"POST",headers:a,body:JSON.stringify({title:e})});if(!r.ok){const n=await r.text();throw new Error(`Docs create failed (${r.status}): ${n}`)}const s=await r.json();return{documentId:s.documentId,url:`https://docs.google.com/document/d/${s.documentId}/edit`}}async readDocument(e){var i,o;const a=await this.authHeaders(),r=await fetch(`${jt}/${e}`,{headers:a});if(!r.ok){const l=await r.text();throw new Error(`Docs read failed (${r.status}): ${l}`)}const s=await r.json();let n="";for(const l of((i=s.body)==null?void 0:i.content)||[])if(l.paragraph)for(const c of l.paragraph.elements)(o=c.textRun)!=null&&o.content&&(n+=c.textRun.content);return{title:s.title,content:n.trim()}}async appendText(e,a){const r=await this.authHeaders(),s=await fetch(`${jt}/${e}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{insertText:{endOfSegmentLocation:{},text:a}}]})});if(!s.ok){const n=await s.text();throw new Error(`Docs append failed (${s.status}): ${n}`)}}async shareDocument(e,a,r="writer"){const s=await this.authHeaders(),n=await fetch(`${Ms}/${e}/permissions`,{method:"POST",headers:s,body:JSON.stringify({type:"user",role:r,emailAddress:a})});if(!n.ok){const i=await n.text();throw new Error(`Share failed (${n.status}): ${i}`)}}}class ue{constructor(e,a,r,s,n){C(this,"sheets");C(this,"calendar");C(this,"docs");C(this,"db");C(this,"userId");C(this,"pinHash");this.db=e,this.userId=a,this.pinHash=r,this.sheets=new nr(e,a,r,s,n),this.calendar=new Qt(e,a,r,s,n),this.docs=new ir(e,a,r,s,n)}async isConnected(){return Xt(this.db,this.userId,this.pinHash)}}const Le=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:Qt,GoogleDocs:ir,GoogleServices:ue,GoogleSheets:nr,completeOAuthFlow:rr,disconnectGoogle:sr,exchangeCodeForTokens:er,fetchUserInfo:tr,generateAuthUrl:Qa,getGoogleAuth:st,isGoogleConnected:Xt,isOAuthClientConfigured:ar},Symbol.toStringTag,{value:"Module"}));async function or(t,e,a={}){const r={textQuery:e,languageCode:"en",pageSize:8};if(a.type&&(r.includedType=a.type),a.location){const l=a.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(r.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:a.radius||5e3}})}const s=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),n=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":t,"X-Goog-FieldMask":s},body:JSON.stringify(r)});if(!n.ok){const l=await n.text();return{results:[],error:`Places API error (${n.status}): ${l.substring(0,200)}`}}const i=await n.json();return!i.places||i.places.length===0?{results:[]}:{results:i.places.map(l=>{var c,d,m;return{name:((c=l.displayName)==null?void 0:c.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(d=l.currentOpeningHours)==null?void 0:d.openNow,types:(m=l.types)==null?void 0:m.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function lr(t,e){var n,i,o;const a=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),r=await fetch(`https://places.googleapis.com/v1/places/${e}`,{method:"GET",headers:{"X-Goog-Api-Key":t,"X-Goog-FieldMask":a}});if(!r.ok){const l=await r.text();return{error:`Place Details API error (${r.status}): ${l.substring(0,200)}`}}const s=await r.json();return{details:{name:((n=s.displayName)==null?void 0:n.text)||"",address:s.formattedAddress||"",phone:s.internationalPhoneNumber,website:s.websiteUri,rating:s.rating,reviews:(i=s.reviews)==null?void 0:i.slice(0,3).map(l=>{var c,d,m;return{author:((c=l.authorAttribution)==null?void 0:c.displayName)||"Anonymous",rating:l.rating||0,text:((m=(d=l.text)==null?void 0:d.text)==null?void 0:m.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(o=s.currentOpeningHours)==null?void 0:o.weekdayDescriptions,location:s.location?{lat:s.location.latitude,lng:s.location.longitude}:void 0,googleMapsUri:s.googleMapsUri}}}async function cr(t,e,a,r={}){var c;const s=new URLSearchParams({origin:e,destination:a,key:t,mode:r.mode||"driving"});(r.mode==="driving"||!r.mode)&&s.set("departure_time","now");const n=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${s}`);if(!n.ok)return{error:`Directions API error: ${n.status}`};const i=await n.json();if(i.status!=="OK")return{error:`Directions: ${i.status} — ${i.error_message||""}`};const o=i.routes[0],l=o.legs[0];return{route:{summary:o.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(c=l.duration_in_traffic)==null?void 0:c.text,steps:l.steps.slice(0,10).map(d=>{var m,g,w;return{instruction:((m=d.html_instructions)==null?void 0:m.replace(/<[^>]*>/g,""))||"",distance:((g=d.distance)==null?void 0:g.text)||"",duration:((w=d.duration)==null?void 0:w.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function dr(t,e,a,r){var l,c;const s={q:e,target:a,key:t,format:"text"};r&&(s.source=r);const n=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok){const d=await n.text();return{translatedText:"",error:`Translate API error (${n.status}): ${d.substring(0,200)}`}}const o=(c=(l=(await n.json()).data)==null?void 0:l.translations)==null?void 0:c[0];return o?{translatedText:o.translatedText,detectedSourceLang:o.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function ur(t,e){const a=new URLSearchParams({address:e,key:t}),r=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${a}`);if(!r.ok)return{results:[],error:`Geocoding API error: ${r.status}`};const s=await r.json();return s.status!=="OK"&&s.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${s.status} — ${s.error_message||""}`}:{results:(s.results||[]).slice(0,5).map(n=>{var i;return{address:n.formatted_address,lat:n.geometry.location.lat,lng:n.geometry.location.lng,placeId:n.place_id,types:(i=n.types)==null?void 0:i.slice(0,3)}})}}async function mr(t,e,a={}){const r=new URLSearchParams({part:"snippet",q:e,key:t,type:a.type||"video",maxResults:String(a.maxResults||5),order:a.order||"relevance"}),s=await fetch(`https://www.googleapis.com/youtube/v3/search?${r}`);if(!s.ok){const i=await s.text();return{results:[],error:`YouTube API error (${s.status}): ${i.substring(0,200)}`}}return{results:((await s.json()).items||[]).map(i=>{var o,l,c,d,m,g,w,f;return{title:i.snippet.title,channelTitle:i.snippet.channelTitle,description:(o=i.snippet.description)==null?void 0:o.substring(0,200),videoId:((l=i.id)==null?void 0:l.videoId)||((c=i.id)==null?void 0:c.channelId)||((d=i.id)==null?void 0:d.playlistId)||"",publishedAt:i.snippet.publishedAt,url:(m=i.id)!=null&&m.videoId?`https://www.youtube.com/watch?v=${i.id.videoId}`:(g=i.id)!=null&&g.channelId?`https://www.youtube.com/channel/${i.id.channelId}`:"",thumbnailUrl:(f=(w=i.snippet.thumbnails)==null?void 0:w.medium)==null?void 0:f.url}})}}async function Nt(t,e={}){const a=Math.min(e.num||5,10),r=e.site?`site:${e.site} ${t}`:t;try{const s=new URLSearchParams({q:r}),n=await fetch(`https://html.duckduckgo.com/html/?${s}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!n.ok)return{results:[],error:`Search request failed (${n.status})`};const i=await n.text(),o=[],l=i.split(/class="result results_links/g).slice(1);for(const c of l){if(o.length>=a)break;const d=c.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),m=c.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(d){let g=d[1];const w=g.match(/uddg=([^&]+)/);w?g=decodeURIComponent(w[1]):g.startsWith("//")&&(g="https:"+g);const f=x=>x.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),T=f(d[2]),v=m?f(m[1]):"";if(T&&g.startsWith("http")){const x=g.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];o.push({title:T,link:g,snippet:v,displayLink:x})}}}return o.length===0?{results:[],error:void 0}:{results:o}}catch(s){return{results:[],error:`Web search error: ${s.message}`}}}async function pr(t,e,a,r="driving"){var l,c,d,m;const s=new URLSearchParams({origins:e,destinations:a,key:t,mode:r,departure_time:"now"}),n=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${s}`);if(!n.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${n.status}`};const i=await n.json(),o=(d=(c=(l=i.rows)==null?void 0:l[0])==null?void 0:c.elements)==null?void 0:d[0];return!o||o.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(o==null?void 0:o.status)||i.status}`}:{distance:o.distance.text,duration:o.duration.text,durationInTraffic:(m=o.duration_in_traffic)==null?void 0:m.text}}const $s=Object.freeze(Object.defineProperty({__proto__:null,geocode:ur,getDirections:cr,getDistanceMatrix:pr,getPlaceDetails:lr,searchPlaces:or,searchYouTube:mr,translateText:dr,webSearch:Nt},Symbol.toStringTag,{value:"Module"})),ve="https://gmail.googleapis.com/gmail/v1/users/me";class we{constructor(e,a,r,s,n){this.db=e,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:e}=await st(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async listMessages(e={}){var o;const a=await this.authHeaders(),r=new URLSearchParams;if(r.set("maxResults",String(e.maxResults||10)),e.query&&r.set("q",e.query),(o=e.labelIds)!=null&&o.length)for(const l of e.labelIds)r.append("labelIds",l);const s=await fetch(`${ve}/messages?${r}`,{headers:a});if(!s.ok){const l=await s.text();throw new Error(`Gmail list failed (${s.status}): ${l.substring(0,200)}`)}const n=await s.json();if(!n.messages||n.messages.length===0)return[];const i=[];for(const l of n.messages.slice(0,e.maxResults||10))try{const c=await this.getMessage(l.id,a);c&&i.push(c)}catch{}return i}async getMessage(e,a){const r=a||await this.authHeaders(),s=await fetch(`${ve}/messages/${e}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:r});if(!s.ok)return null;const n=await s.json(),i=o=>{var l,c,d;return((d=(c=(l=n.payload)==null?void 0:l.headers)==null?void 0:c.find(m=>m.name.toLowerCase()===o.toLowerCase()))==null?void 0:d.value)||""};return{id:n.id,threadId:n.threadId,snippet:n.snippet||"",subject:i("Subject")||"(no subject)",from:i("From"),to:i("To"),date:i("Date")||new Date(parseInt(n.internalDate)).toISOString(),isUnread:(n.labelIds||[]).includes("UNREAD"),labels:n.labelIds||[]}}async getMessageBody(e){const a=await this.authHeaders(),r=await fetch(`${ve}/messages/${e}?format=full`,{headers:a});if(!r.ok){const n=await r.text();throw new Error(`Gmail message body failed (${r.status}): ${n.substring(0,200)}`)}const s=await r.json();return hr(s.payload)}async search(e,a=10){return this.listMessages({query:e,maxResults:a})}async send(e,a,r,s={}){const n=await this.authHeaders(),i=[`To: ${e}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];s.cc&&i.push(`Cc: ${s.cc}`),s.bcc&&i.push(`Bcc: ${s.bcc}`),s.replyToMessageId&&(i.push(`In-Reply-To: ${s.replyToMessageId}`),i.push(`References: ${s.replyToMessageId}`)),i.push("",r);const o=i.join(`\r
`),c={raw:ma(o)};s.threadId&&(c.threadId=s.threadId);const d=await fetch(`${ve}/messages/send`,{method:"POST",headers:n,body:JSON.stringify(c)});if(!d.ok){const m=await d.text();throw new Error(`Gmail send failed (${d.status}): ${m.substring(0,200)}`)}return await d.json()}async createDraft(e,a,r,s={}){const n=await this.authHeaders(),i=[`To: ${e}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];s.cc&&i.push(`Cc: ${s.cc}`),i.push("",r);const o=i.join(`\r
`),l=ma(o),c=await fetch(`${ve}/drafts`,{method:"POST",headers:n,body:JSON.stringify({message:{raw:l}})});if(!c.ok){const d=await c.text();throw new Error(`Gmail draft failed (${c.status}): ${d.substring(0,200)}`)}return await c.json()}async markAsRead(e){const a=await this.authHeaders();await fetch(`${ve}/messages/${e}/modify`,{method:"POST",headers:a,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(e,a){const r=await this.authHeaders();let s={};switch(a){case"archive":s={removeLabelIds:["INBOX"]};break;case"trash":s={addLabelIds:["TRASH"]};break;case"read":s={removeLabelIds:["UNREAD"]};break;case"unread":s={addLabelIds:["UNREAD"]};break;case"star":s={addLabelIds:["STARRED"]};break;case"unstar":s={removeLabelIds:["STARRED"]};break}const n=await fetch(`${ve}/messages/${e}/modify`,{method:"POST",headers:{...r,"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok){const i=await n.text();throw new Error(`Failed to modify message: ${i}`)}return!0}async getUnreadCount(){const e=await this.authHeaders(),a=await fetch(`${ve}/labels/INBOX`,{headers:e});return a.ok&&(await a.json()).messagesUnread||0}async getProfile(){const e=await this.authHeaders(),a=await fetch(`${ve}/profile`,{headers:e});if(!a.ok)throw new Error("Failed to get Gmail profile");return await a.json()}}function hr(t){var e,a,r;if(!t)return"";if((e=t.body)!=null&&e.data)return Ut(t.body.data);if(t.parts){for(const s of t.parts)if(s.mimeType==="text/plain"&&((a=s.body)!=null&&a.data))return Ut(s.body.data);for(const s of t.parts)if(s.mimeType==="text/html"&&((r=s.body)!=null&&r.data)){const n=Ut(s.body.data);return Ps(n)}for(const s of t.parts)if(s.parts){const n=hr(s);if(n)return n}}return t.snippet||""}function ma(t){const e=new TextEncoder().encode(t);let a="";for(let r=0;r<e.length;r++)a+=String.fromCharCode(e[r]);return btoa(a).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Ut(t){const e=t.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(e)))}catch{return atob(e)}}function Ps(t){return t.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const Bs=1e4,js=1e4;async function gr(t,e){try{const a=new AbortController,r=setTimeout(()=>a.abort(),js),s=await fetch(t,{signal:a.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(!s.ok)return{text:"",error:`HTTP ${s.status}`};const n=s.headers.get("content-type")||"";if(!n.includes("text/html")&&!n.includes("text/plain")&&!n.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${n.split(";")[0]}`};const i=await s.text();clearTimeout(r);const o=i.length>2e5?i.substring(0,2e5):i,l=Us(o);return l.length<50?{text:"",error:"Page has too little readable content"}:{text:l.substring(0,e||Bs)}}catch(a){return{text:"",error:a.name==="AbortError"?"Timeout":a.message}}}function Us(t){let e=t;return e=e.replace(/<script[\s\S]*?<\/script>/gi,""),e=e.replace(/<style[\s\S]*?<\/style>/gi,""),e=e.replace(/<nav[\s\S]*?<\/nav>/gi,""),e=e.replace(/<footer[\s\S]*?<\/footer>/gi,""),e=e.replace(/<header[\s\S]*?<\/header>/gi,""),e=e.replace(/<aside[\s\S]*?<\/aside>/gi,""),e=e.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),e=e.replace(/<!--[\s\S]*?-->/g,""),e=e.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),e=e.replace(/<li[^>]*>/gi,`
• `),e=e.replace(/<[^>]+>/g,""),e=e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(a,r)=>String.fromCharCode(parseInt(r))),e=e.replace(/[ \t]+/g," "),e=e.replace(/\n\s*\n/g,`

`),e=e.split(`
`).map(a=>a.trim()).filter(a=>a.length>0).join(`
`),e.trim()}const Hs=1e4;async function Gs(t,e){var s,n,i;const a=new AbortController,r=setTimeout(()=>a.abort(),Hs);try{const o=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",signal:a.signal,headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar-pro",messages:[{role:"user",content:t}],max_tokens:2e3})});if(clearTimeout(r),!o.ok)return{report:"",sources:[],pagesRead:0,error:`Perplexity error ${o.status}`};const l=await o.json(),c=((i=(n=(s=l==null?void 0:l.choices)==null?void 0:s[0])==null?void 0:n.message)==null?void 0:i.content)||"",m=((l==null?void 0:l.citations)||[]).map(g=>({title:g,url:g,snippet:""}));return{report:c,sources:m,pagesRead:m.length}}catch(o){return clearTimeout(r),{report:"",sources:[],pagesRead:0,error:`Perplexity request failed: ${o.message}`}}}async function fr(t,e,a={}){if(a.perplexityApiKey){const g=await Gs(t,a.perplexityApiKey);if(!g.error)return g}const r=a.maxPages||(a.depth==="thorough"?5:3),s=a.maxResults||(a.depth==="thorough"?8:5),n=await Nt(t,{num:s,site:a.site});if(n.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${n.error}`};if(n.results.length===0)return{report:`No web results found for "${t}".`,sources:[],pagesRead:0};const o=n.results.slice(0,r).map(async g=>{const w=await gr(g.link);return{title:g.title,url:g.link,displayLink:g.displayLink,snippet:g.snippet,content:w.text,error:w.error}}),c=(await Promise.all(o)).filter(g=>g.content.length>50);if(c.length===0){const g=n.results.map((f,T)=>`[${T+1}] ${f.title}
${f.snippet}
Source: ${f.link}`).join(`

`);return{report:await pa(t,g,e,"snippets"),sources:n.results.map(f=>({title:f.title,url:f.link})),pagesRead:0}}const d=c.map((g,w)=>`--- SOURCE ${w+1}: ${g.title} (${g.displayLink}) ---
${g.content}
--- END SOURCE ${w+1} ---`).join(`

`);return{report:await pa(t,d,e,"full"),sources:c.map(g=>({title:g.title,url:g.url})),pagesRead:c.length}}async function pa(t,e,a,r){const n=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

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

Write a synthesized research report answering the query above.`;try{return(await a.chat([{role:"system",content:n},{role:"user",content:i}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(o){return`Research synthesis error: ${o.message}. Raw search results were found but could not be analyzed.`}}const Fs=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:fr,fetchPageContent:gr},Symbol.toStringTag,{value:"Module"})),Kt="https://api.browser-use.com/api/v2",qs=4e3,Ws=55e3,yr=new Set(["finished","stopped"]);async function zs(t,e,a){const r=(a==null?void 0:a.timeoutMs)??Ws;let s;try{const i={task:t};a!=null&&a.secrets&&Object.keys(a.secrets).length>0&&(i.secrets=a.secrets);const o=await fetch(`${Kt}/tasks`,{method:"POST",headers:{"X-Browser-Use-API-Key":e,"Content-Type":"application/json"},body:JSON.stringify(i)});if(!o.ok){const c=await o.text().catch(()=>"");return{output:null,taskId:"",status:"failed",error:`HTTP ${o.status}: ${c}`}}if(s=(await o.json()).id,!s)return{output:null,taskId:"",status:"failed",error:"No id in create response"}}catch(i){return{output:null,taskId:"",status:"failed",error:i.message}}const n=Date.now()+r;for(;Date.now()<n;){await new Promise(i=>setTimeout(i,qs));try{const i=await fetch(`${Kt}/tasks/${s}/status`,{headers:{"X-Browser-Use-API-Key":e}});if(!i.ok)continue;const o=await i.json();if(yr.has(o.status))return o.status==="finished"?{output:o.output??null,taskId:s,status:"completed"}:{output:o.output??null,taskId:s,status:"failed",error:o.output??"Task was stopped before completing"}}catch{}}return{output:null,taskId:s,status:"timeout"}}async function Ks(t,e){try{const a=await fetch(`${Kt}/tasks/${t}/status`,{headers:{"X-Browser-Use-API-Key":e}});if(!a.ok)return{status:"error",output:null,done:!1};const r=await a.json();return{status:r.status,output:r.output??null,done:yr.has(r.status)}}catch{return{status:"error",output:null,done:!1}}}async function vr(t){const e=t instanceof Buffer?new Uint8Array(t):t,a=new DataView(e.buffer,e.byteOffset,e.byteLength);let r=0;for(;r<e.length-30&&a.getUint32(r,!0)===67324752;){const s=a.getUint16(r+6,!0),n=a.getUint16(r+8,!0),i=a.getUint32(r+18,!0),o=a.getUint32(r+22,!0),l=a.getUint16(r+26,!0),c=a.getUint16(r+28,!0),d=new TextDecoder().decode(e.slice(r+30,r+30+l)),m=r+30+l+c;if(d==="word/document.xml"){const g=e.slice(m,m+i);let w;if(n===0)w=g;else{const v=new DecompressionStream("deflate-raw"),x=v.writable.getWriter();x.write(g),x.close();const E=v.readable.getReader(),O=[];let N=!1;for(;!N;){const F=await E.read();F.done?N=!0:O.push(F.value)}const P=O.reduce((F,B)=>F+B.length,0);w=new Uint8Array(o||P);let W=0;for(const F of O)w.set(F,W),W+=F.length}return new TextDecoder().decode(w).replace(/<\/w:p>/g,`
`).replace(/<\/w:tr>/g,`
`).replace(/<[^>]+>/g,"").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim()}r=m+i,s&8&&(r+=16)}return""}const Ys=Object.freeze(Object.defineProperty({__proto__:null,extractDocxTextFromBuffer:vr},Symbol.toStringTag,{value:"Module"})),Js=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,weight:.9},{pattern:/\bremi[a-z]{0,5}\s+(me|us)\b/i,weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,weight:.95},{pattern:/^[Tt]ask:\s*/,weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,weight:.9},{pattern:/\b(change\s+(the\s+)?time|update\s+(the\s+)?(reminder|schedule|alarm)|reschedule|move\s+it\s+to|cancel\s+(the\s+)?(reminder|schedule|alarm)|delete\s+(the\s+)?(reminder|schedule|alarm))\b/i,weight:.9},{pattern:/\b(show\s+(me\s+)?(my\s+)?(reminders?|schedules?|alarms?)|what\s+reminders?|any\s+reminders?|do\s+i\s+have.*remind|when\s+is\s+my\s+remind)\b/i,weight:.9},{pattern:/\b(stop|turn\s+off|switch\s+off|disable|deactivate)\s+(that|the|this|my)?\s*(reminder|schedule|alarm|notification)\b/i,weight:.9},{pattern:/\b(snooze|postpone|push\s+back|remind\s+me\s+later|later\s+reminder)\b/i,weight:.9},{pattern:/\b(change|update|edit|move|shift)\s+(it|this|that)\s+(to|for)\b/i,weight:.85},{pattern:/\bset\s+it\s+(for|at|to)\b/i,weight:.85},{pattern:/\b(what\s+time|when)\s+(did\s+i\s+set|is\s+(the|my)\s+remind|does\s+(it|that)\s+go\s+off)\b/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,weight:.9},{pattern:/\b(update\s+cell|change\s+cell|delete\s+row|remove\s+row|create\s+(a\s+)?(new\s+)?(tab|sheet)|add\s+(a\s+)?tab|what.{0,15}(column|row\s+\d|cell\s+[A-Z])|sum\s+of|total\s+(in|of))\b/i,weight:.9},{pattern:/\b(forward\s+(that\s+)?(email|message)|reply\s+to\s+(that|the|an?\s+)?email|respond\s+to\s+(that|the)\s+email|mark\s+(it|that|this|email)\s+as|(got|received)\s+an?\s+email\s+from)\b/i,weight:.85},{pattern:/\b(cancel\s+(the\s+)?(event|meeting|appointment)|reschedule\s+(the\s+|my\s+)?(meeting|event|appointment)|delete\s+(from|the)\s+calendar|remove\s+(the\s+)?(event|meeting)\s+from\s+calendar)\b/i,weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,weight:.9},{pattern:/\b(keep\s+(that\s+)?in\s+mind|always\s+(do|use|prefer|remember)|update\s+(my\s+)?(memory|preference)|delete\s+(that\s+)?memory|forget\s+that|what\s+did\s+i\s+tell\s+you\s+about)\b/i,weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,weight:.9}];function ea(t,e){for(const a of Js)if(a.pattern.test(t))return{agent:"multi",confidence:a.weight,reasoning:"Keyword match — full agent"};return e&&t.trim().length<80&&e.split(`
`).slice(-16).some(s=>/\[TOOLS_USED:/i.test(s)||/\b(reminder|reminders|schedule|scheduled|cron|alarm|next_run|set for|going off|remind)\b/i.test(s)||/\b(i['']ll\s+(search|research|find|look\s+up|check|add|create|book)|just\s+a\s+moment|pulling\s+that\s+together|on\s+it\b|let\s+me\s+(search|research|find|look))\b/i.test(s))?{agent:"multi",confidence:.8,reasoning:"Active tool session follow-up — full agent"}:e&&/spreadsheet|sheet|google\s*sheet/i.test(e)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(t)?{agent:"multi",confidence:.85,reasoning:"Memory context — full agent"}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function wr(t){const e=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')]+/);if(e&&/\b(delete|trash|remove)\b/i.test(t))return{tool:"drive_delete_file",args:{url_or_id:e[0].replace(/[.,;)]$/,"")}};if(/\b(list|show|display)\s+(my\s+)?(google\s+)?drive\s+(files?|docs?|documents?|folders?)\b|\bwhat\s+(files?|docs?|documents?)\s+(do\s+i\s+have|are|is)\s+(in|on)\s+(my\s+)?(google\s+)?drive\b/i.test(t))return{tool:"drive_list",args:{}};const a=t.match(/\b(?:search|find|look\s+(?:for|up))\s+(?:(?:in|on|my|the|google)\s+)*drive\s+(?:for\s+)?(.{3,60}?)(?:\s*[?.!,])?$/i);return a?{tool:"drive_search",args:{query:a[1].trim()}}:/\b(how\s+many\s+unread|unread\s+(count|emails?|messages?)|any\s+unread\s+(emails?|messages?))\b/i.test(t)?{tool:"gmail_unread_count",args:{}}:/\b(list|show|display)\s+(my\s+)?(upcoming\s+)?(calendar\s+)?(events?|meetings?|appointments?)\b/i.test(t)&&!/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+week|this\s+week|\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))\b/i.test(t)?{tool:"list_calendar_events",args:{}}:/\b(list|show|display)\s+(my\s+)?(active\s+)?(reminders?|schedules?|alarms?)\b|\bwhat\s+reminders?\s+(do\s+i\s+have|are\s+set|are\s+active)\b/i.test(t)?{tool:"list_schedules",args:{}}:null}function br(t,e){if(/\b(delete|trash|remove)\b.{0,50}\b(file|doc|document|sheet|spreadsheet|folder)\b|\b(file|doc|document|sheet|spreadsheet)\b.{0,50}\b(delete|trash|remove)\b/i.test(t)){const a=e.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(a)return{tool:"drive_delete_file",args:{url_or_id:a[0].replace(/[.,;)]$/,"")}}}if(/\b(move|rename|organise|organize)\b.{0,50}\b(file|doc|document|sheet)\b/i.test(t)){const a=e.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(a){const r={url_or_id:a[0].replace(/[.,;)]$/,"")},s=t.match(/\bto\s+(?:the\s+)?(?:folder\s+)?["']?([A-Za-z0-9 _-]{2,40})["']?\s*(?:folder\b|$)/i),n=t.match(/\brename\b.{0,30}\bto\s+["']?([A-Za-z0-9 _.-]{2,60})["']?/i);if(s&&(r.folder_name=s[1].trim()),n&&(r.new_name=n[1].trim()),r.folder_name||r.new_name)return{tool:"drive_organise",args:r}}}return null}function _r(t,e,a,r,s,n){const i=e.assistant_name||"Karna",o=e.personality_prompt?`
## Personality
${e.personality_prompt.substring(0,2e3)}
`:"",l=a?`
## Active Memory (ALWAYS consult before responding)
${a}
`:"";let c="";try{const m=new Date;c=new Intl.DateTimeFormat("en-GB",{timeZone:e.timezone,day:"numeric",month:"short",year:"numeric"}).format(m)}catch{c=""}const d=`
## Current User
- **Name**: ${e.name}
- **Timezone**: ${e.timezone}
- **Time**: ${s}
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
- **HARD RULE — no false confirmations**: You have ZERO tool access. You CANNOT set reminders, create schedules, send emails, read sheets, or perform any action. NEVER output phrases like "Reminder set for...", "I've scheduled...", "Done ✅", "Task created", or any language implying an action was completed. If the user wants an action, say: "I can do that — just send your message and I'll take care of it." Do NOT simulate the outcome.`;default:return""}}const Vs=Object.freeze(Object.defineProperty({__proto__:null,buildSubAgentPrompt:_r,classifyIntentFast:ea,detectDeterministicOp:wr,detectTierTwoOp:br},Symbol.toStringTag,{value:"Module"})),Zs=2e3,Xs=2e3,Er=4;function Ht(t){return Math.ceil(t.length/Er)}function ha(t,e){const a=e*Er;return t.length<=a?t:t.slice(0,a)+`
[...truncated to fit token budget]`}function Tr(t){const e=new Set(["(Previous response was not recorded.)","(Previous request did not complete. Please try again.)","(My previous response was cut off before completing. Starting fresh.)"]),a=[];for(const s of t){const n=typeof s.content=="string"?s.content:"";if(s.role==="assistant"&&e.has(n.trim())&&a.length>0&&a[a.length-1].role==="user"){a.pop();continue}a.push(s)}const r=[];for(const s of a){let n=s.content;s.role==="assistant"&&typeof n=="string"&&(n=n.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim(),n||(n="(Previous response was not recorded.)"));const i=n!==s.content?{...s,content:n}:s;r.length>0&&r[r.length-1].role===i.role&&i.role!=="system"?r[r.length-1]={...r[r.length-1],content:r[r.length-1].content+`

`+i.content}:r.push(i)}return r}const ga=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes, daily = at a specific time (HH:MM), weekly = day of week at time (e.g. "Friday 17:00"), once = specific date and time (e.g. "2026-03-12 14:30")'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration requests: "in 5 minutes", "in 2 hours", "in half an hour". Do NOT use for any request that mentions a specific time or date ("at 13:00", "tomorrow at noon", "next Friday") — use schedule_value instead. Examples: "in 5 minutes" = 5, "in 2 hours" = 120.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"update_schedule",description:'Update an existing scheduled task — change its name, description, or reschedule it to a new time. Use this when the user wants to change the time of a reminder or rename it. You MUST call this tool — never say "updated" without calling it.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to update (get it from list_schedules first if unknown)"},name:{type:"string",description:"New name for the task (optional)"},description:{type:"string",description:"New description (optional)"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:"New schedule type (required if changing the time)"},schedule_value:{type:"string",description:"New schedule value matching the schedule_type format (required if changing the time)"},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration changes ("in 30 minutes", "in 2 hours"). Do NOT use if the user specifies a clock time or date — use schedule_value instead.'}},required:["job_id"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:'Store a PERMANENT rule, preference, or standing instruction that Ruby should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts (orders, deliveries, single events) — those go to create_schedule. Ask yourself: "Will this still be relevant in 6 months?" If no, do not store it.',parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"delete_memory",description:'Delete a stored memory entry by its ID. Use when the user says "forget that", "remove that rule", or "that preference is wrong". Always call search_memory first to confirm the correct ID. Confirm with the user if there is any ambiguity about which entry to remove.',parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to delete"}},required:["id"]}},{name:"update_memory",description:"Update the content of an existing memory entry by its ID. Use when the user wants to correct or change a stored rule or preference. Always call search_memory first to find the correct ID.",parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to update"},content:{type:"string",description:"The new content to replace the existing entry"}},required:["id","content"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. STRICT RULES — violating any of these is a critical error: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm. (2) NEVER fabricate email body content. Only use data you retrieved from tools in this same conversation. If you do not have the actual content (costs, numbers, details), do NOT call this — tell the user exactly what information is missing and ask them to provide it. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_read_file",description:"Read the content of a specific Google Drive file by URL or file ID. Supports Google Docs (exported as text), Sheets (exported as CSV), PDFs (extracted via AI), and other text files. Use this when the user shares a Google Drive or Google Docs link and wants you to read, summarize, or analyze the file contents.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive or Google Docs URL (e.g. https://drive.google.com/file/d/... or https://docs.google.com/document/d/...) or bare file ID"},extract_focus:{type:"string",description:'Optional: specific content to focus extraction on (e.g. "financial figures", "action items", "table of contents")'}},required:["url_or_id"]}},{name:"drive_delete_file",description:"Move a Google Drive file or document to trash. The file can be restored from Drive trash within 30 days. Use when the user asks to delete, remove, or trash a file.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to trash"}},required:["url_or_id"]}},{name:"drive_organise",description:"Move a Google Drive file to a folder and/or rename it. Creates the folder if it does not exist. Use when the user wants to organise, move, or rename a file in Drive.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to move/rename"},folder_name:{type:"string",description:"Name of the destination folder. Creates it if it does not exist."},new_name:{type:"string",description:"Optional: new name for the file"}},required:["url_or_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets (~1s). Use ONLY for: real-time news/headlines where the user wants links, or as a fallback when research fails. For everything else (weather, recommendations, comparisons, travel) use research instead — it gives synthesized answers not raw snippets.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:'Deep web research — synthesizes a detailed report from multiple sources. Uses Perplexity Sonar when available (~5s), otherwise fetches and reads 3-5 pages (~15s). Use for: weather forecasts, travel recommendations, packing lists, comparisons (A vs B), "is X good for Y?", best-of recommendations, anything needing a synthesized answer rather than a raw link list.',parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"browser_task",description:'Run a complete browser automation workflow using a real cloud browser. The cloud agent handles ALL steps — navigation, clicks, form fills, extraction — in a single call. CRITICAL: Always pass the ENTIRE multi-step workflow as one task description. Never split a browser workflow across multiple browser_task calls. Wrong: call 1 "go to site", call 2 "click X", call 3 "extract Y". Correct: one call with "go to site, click X, extract Y". Use for: JS-heavy sites, form submission, clicking through pages, any site requiring a real browser.',parameters:{type:"object",properties:{task:{type:"string",description:'Full Plain-English description of the COMPLETE workflow (e.g. "Go to news.ycombinator.com and return the top 5 story titles and URLs", "Go to books.toscrape.com, click the Mystery category, list the first 5 books with their star rating and price")'},site_name:{type:"string",description:'Optional: name of a saved Secret Vault entry (e.g. "LinkedIn", "Gmail backup") to inject login credentials automatically. The credentials will be passed securely to the browser agent.'}},required:["task"]}},{name:"browser_task_status",description:"Check the status of a previously started browser task that was still running when it timed out. Use when the user asks what happened with a browser task. Get the task_id from memory.",parameters:{type:"object",properties:{task_id:{type:"string",description:"The task ID returned by the earlier browser_task call (stored in memory)"}},required:["task_id"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"parse_document",description:"Read and extract text content from an uploaded file (PDF, Word/DOCX, or text). Call this whenever the user uploads a document and wants you to read it, extract information, or work with its contents.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id returned when the file was uploaded"},extract_focus:{type:"string",description:'Optional: specific information to focus on extracting (e.g., "quantities and equipment names", "dates and amounts", "all text content")'}},required:["file_id"]}},{name:"create_skill",description:"Create a new reusable skill — a named workflow that can be invoked by name in future conversations. Use this when the user asks you to create a skill, save a workflow, or build a reusable automation. IMPORTANT: Before calling this, ask the user clarifying questions to understand: what the skill should do, what inputs it needs, what tools it uses, and what the expected output is.",parameters:{type:"object",properties:{name:{type:"string",description:'Human-readable skill name (e.g., "Equipment List Parser", "Daily Expense Logger")'},description:{type:"string",description:"One-sentence description of what the skill does"},instructions:{type:"string",description:"Detailed step-by-step instructions for executing the skill. Be specific about which tools to use, in what order, and what to do with the results."},required_tools:{type:"array",items:{type:"string"},description:'List of tool names this skill needs (e.g. ["parse_document", "append_sheet", "create_sheet"])'},parameters:{type:"object",description:"JSON schema describing the inputs this skill accepts. Use standard JSON schema format."},examples:{type:"array",description:"Optional example inputs and expected outputs to guide execution",items:{type:"object",properties:{input:{type:"object"},output:{type:"string"}}}}},required:["name","description","instructions"]}},{name:"list_skills",description:"List all custom skills the user has created. Shows name, description, and usage count for each.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled skills. Default: false"}}}}];async function ta(t,e){try{const r=((await t.prepare("SELECT slug, name, description, parameters FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at ASC").bind(e).all()).results||[]).map(s=>{let n={};try{n=JSON.parse(s.parameters)||{}}catch{}return n.properties||(n={type:"object",properties:{inputs:{type:"string",description:"Any additional context or specific instructions for this skill execution"}}}),{name:s.slug,description:`[Custom Skill] ${s.description}`,parameters:n}});return[...ga,...r]}catch{return ga}}async function aa(t,e){try{const r=(await t.prepare("SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(e).all()).results||[];return r.length===0?"":r.map(s=>`- ${s.content}`).join(`
`)}catch{return""}}function xr(t,e,a,r){const s=t.assistant_name||"Karna",n=t.personality_prompt?ha(`## Personality Instructions
${t.personality_prompt}
`,Zs):"",i=r!=null&&r.trim()?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. They are fixed — do not store copies of these in your memory or contradict them.
${r}
`:"",o=ha(e,Xs);return`You are ${s} — a personal AI assistant. Your name is ${s} — always refer to yourself by this name if asked.

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

${n}

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

**browser_task is always ONE call.** A browser workflow with 10 steps (navigate → click → fill → submit → extract) is still ONE browser_task call — describe the entire sequence in the task field. Never call browser_task more than once for the same user request.

### Information Retrieval (3 tiers)

**Decision order — follow this strictly:**
1. **Answer from knowledge first** — If the question is a static fact you know with confidence (capital cities, country/currency/language facts, historical dates, definitions, math, general knowledge), answer directly. Do NOT call any tool. Example: "Capital of France?" → "Paris." No tool needed.
2. **research** — Use for anything requiring up-to-date or synthesized information: weather forecasts, travel & packing advice, recommendations ("best X in Y"), comparisons ("A vs B"), current events, prices, "is X good for Y?", anything where your training knowledge may be stale or incomplete. Uses Perplexity Sonar when available (~5s), otherwise fetches and reads pages (~15s).
3. **web_search** — Use ONLY for real-time news/headlines where the user explicitly wants links or a list of results (not a synthesized answer), OR as a fallback if research fails. Do not use web_search where research would give a better answer.
4. **read_url** — Read one page (~3-5s). Use when the user provides a specific URL to read. **Max 2 attempts**: if the first read_url fails, try ONE alternative URL. After 2 failures, answer from knowledge: "I couldn't load that page. Based on what I know: [answer]".

**Examples**: "Capital of France?" → knowledge (no tool). "Weather in Bangkok May 12-19?" → research. "Latest cricket scores?" → web_search. "Best hotels in Bali?" → research. "What does API mean?" → knowledge (no tool).

### Writing & Storage
- **create_doc** — Create a new Google Doc with content. Always pass the full text as the content parameter. **Single-use per request**: once create_doc returns a document ID and URL, the document is fully created. Reply immediately with the URL — never call create_doc again for the same request.
- **append_to_doc** — Add content to an existing Google Doc. Use when the user wants to add to an existing document.
- **create_sheet** + **write_sheet** / **append_sheet** — Create and populate spreadsheets.
- **gmail_draft** / **gmail_send** — Send content via email.
- **store_memory** — Remember user info long-term.
- **drive_delete_file** — Trash a Drive file by URL or ID. File is recoverable from Drive trash for 30 days.
- **drive_organise** — Move a file to a folder and/or rename it. Pass \`folder_name\`, \`new_name\`, or both.

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
- Drive: drive_list, drive_search, drive_delete_file, drive_organise
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
- **News and search results**: When presenting news headlines, articles, or search results, always include the source link as a markdown link — \`[Title](URL)\`. Never list news or articles without a clickable link.
- If a tool fails, explain simply and suggest alternatives.
- When the user's request involves multiple steps, execute them all and present the combined result.
- **CRITICAL: Every multi-step action MUST end with an explicit completion reply.** Never silently finish. After all tools have run:
  - ✅ On success: confirm what was done and include any relevant links (sheet URL, doc URL, email sent to, etc.)
  - ❌ On failure: clearly state what failed, what was completed before the failure, and what the user should do next.
  - This applies to ALL workflows: sheet creation, document parsing, email chains, calendar events, reminders, Drive uploads, research tasks — everything.
- When confirming ambiguity, be brief and offer the most likely option first: "Add Uber ₹700 to your Monthly Budget?" not a long explanation.
- After the user confirms a pattern, store it and never ask about that pattern again.

## Current Date & Time
${kr(t.timezone)} (${t.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${a==="telegram"?`

## TELEGRAM CONSTRAINTS — 25-second hard limit
- **Essays / documents**: Keep written content under 400 words. Write directly from your knowledge — do NOT call web_search before writing. Call create_doc in one shot immediately.
- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).
- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use \`schedule_value\` with the exact datetime in the user's local timezone — NEVER use \`minutes_from_now\` for clock-time requests (it causes wrong times). Only use \`minutes_from_now\` for pure duration requests like "in 30 minutes" or "in 2 hours".
- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I'll now..." — just call the tool.
- **Long content intent check**: When asked to write long-form content (essay, article, report — likely over 200 words) WITHOUT a save destination specified, do NOT start writing. Ask first: "Should I save this as a Google Doc and send you the link, or write it here in chat?" Wait for the response. If Drive/Doc, call \`create_doc\` with full content and return only the link. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**`:""}`}async function Gt(t,e,a){var c;const s=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${a.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${t}`}})).json();let n;((c=s.files)==null?void 0:c.length)>0?n=s.files[0].id:n=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({name:a,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${e}?fields=parents`,{headers:{Authorization:`Bearer ${t}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${e}?addParents=${n}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:n,folderName:a}}function kr(t){try{const e=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:t,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}catch{return new Date().toISOString()}}async function pt(t,e,a,r,s,n,i,o,l,c,d,m,g){const w=Date.now();let f=!0,T="",v="";try{return v=await en(t,e,a,r,n,i,o,l,c,d,m,g),v}catch(x){throw f=!1,T=x.message||"Unknown error",x}finally{const x=Date.now()-w;try{await a.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(r,s.agentType||null,s.providerName||null,t,JSON.stringify(e).substring(0,2e3),(f?v:"").substring(0,500),f?1:0,T||null,x,s.isEnforcementRetry?1:0,s.channel||"web").run()}catch{}}}function Sr(t){const e=t.length;for(let a=0;a<e-1;a++){const r=t[a];if(r.role!=="user"||typeof r.content!="string")continue;const s=e-1-a,n=s<=2?12e3:s<=4?5e3:2e3;r.content.length>n&&(t[a]={...r,content:r.content.substring(0,n)+`
[...truncated in history to reduce context size]`})}}function Qs(t){const e=[];let a=[],r="",s=!1,n=0;const i=t.length;for(;n<i;){const o=t[n];if(s){if(o==='"'){if(t[n+1]==='"'){r+='"',n+=2;continue}s=!1,n++;continue}r+=o,n++;continue}if(o==='"'){s=!0,n++;continue}if(o===","){a.push(r),r="",n++;continue}if(o==="\r"&&t[n+1]===`
`){a.push(r),e.push(a),a=[],r="",n+=2;continue}if(o===`
`||o==="\r"){a.push(r),e.push(a),a=[],r="",n++;continue}r+=o,n++}for((r||a.length)&&(a.push(r),e.push(a));e.length&&e[e.length-1].every(o=>o==="");)e.pop();return e}async function en(t,e,a,r,s,n,i,o,l,c,d,m){var w,f,T,v,x,E,O,N,P,W,F,B,G,q,I,L;const g=new Q(a);switch(t){case"create_schedule":{const u=new Date;let y;const p=c||"UTC";if(e.minutes_from_now&&typeof e.minutes_from_now=="number"&&e.minutes_from_now>0){y=new Date(u.getTime()+e.minutes_from_now*60*1e3);const D=y.toLocaleString("en-US",{timeZone:p,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[R,U,A]=(D[0]||"").split("/");e.schedule_value=`${A}-${R}-${U} ${D[1]||"00:00"}`,e.schedule_type="once"}else if(e.schedule_type==="interval"){const S=parseInt(e.schedule_value,10);y=new Date(u.getTime()+S*60*1e3)}else if(e.schedule_type==="daily"){const[S,D]=e.schedule_value.split(":").map(Number),R=u.toLocaleString("en-US",{timeZone:p}),U=new Date(R),A=new Date(U);A.setHours(S,D,0,0),A<=U&&A.setDate(A.getDate()+1);const M=new Date(A.toLocaleString("en-US",{timeZone:"UTC"})),z=new Date(A.toLocaleString("en-US",{timeZone:p})),Y=M.getTime()-z.getTime();y=new Date(A.getTime()+Y)}else if(e.schedule_type==="weekly"){const[S,D]=e.schedule_value.split(" "),[R,U]=(D||"00:00").split(":").map(Number),M=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(qe=>qe.toLowerCase()===S.toLowerCase()),z=u.toLocaleString("en-US",{timeZone:p}),Y=new Date(z),Z=new Date(Y);Z.setHours(R,U,0,0);let ee=(M-Z.getDay()+7)%7;ee===0&&Z<=Y&&(ee=7),Z.setDate(Z.getDate()+ee);const X=new Date(Z.toLocaleString("en-US",{timeZone:"UTC"})),ne=new Date(Z.toLocaleString("en-US",{timeZone:p})),ce=X.getTime()-ne.getTime();y=new Date(Z.getTime()+ce)}else if(e.schedule_type==="once"){const[S,D]=e.schedule_value.split(" "),[R,U,A]=S.split("-").map(Number),[M,z]=(D||"00:00").split(":").map(Number),Y=u.toLocaleString("en-US",{timeZone:p}),Z=new Date(Y),ee=new Date(Z);ee.setFullYear(R,U-1,A),ee.setHours(M,z,0,0);const X=new Date(ee.toLocaleString("en-US",{timeZone:"UTC"})),ne=new Date(ee.toLocaleString("en-US",{timeZone:p})),ce=X.getTime()-ne.getTime();y=new Date(ee.getTime()+ce);const qe=new Date(u.getTime()+120*1e3);if(y.getTime()<u.getTime()+60*1e3){const At=y.toISOString();y=qe;const nt=` [Note: The requested time ${e.schedule_value} in ${p} resolved to ${At} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${y.toISOString()}.]`;e._pastTimeWarning=nt}}else y=new Date(u.getTime()+3600*1e3);if(await a.prepare("SELECT id FROM cron_jobs WHERE user_id = ? AND name = ? AND schedule_type = ? AND schedule_value = ? AND state != 'completed' LIMIT 1").bind(r,e.name,e.schedule_type,e.schedule_value).first()){const S=y.toLocaleString("en-US",{timeZone:p,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule already exists: "${e.name}" is already set for ${S} (${p}). No duplicate created.`}await a.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(r,e.name,e.description||e.action_description||"",e.schedule_type,e.schedule_value,e.action_type,JSON.stringify({description:e.action_description||e.description||""}),y.toISOString()).run();const b=e._pastTimeWarning||"",k=y.toLocaleString("en-US",{timeZone:p,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${e.name}" — ${e.schedule_type}. Will fire at ${k} (${p}). [UTC: ${y.toISOString()}]${b}. IMPORTANT: Use the exact time "${k}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const y=(await a.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(r).all()).results||[];return y.length===0?"No scheduled tasks found.":y.map(p=>`[ID:${p.id}] ${p.enabled?"▶":"⏸"} "${p.name}" — [${p.schedule_type}] ${p.schedule_value} — ${p.action_type} — state: ${p.state||"active"} — next: ${p.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const u=e.enabled?1:0,y=u?"active":"paused";return await a.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,y,e.job_id,r).run(),`Schedule ${e.job_id} ${u?"enabled (active)":"paused"}.`}case"update_schedule_state":{const u=["created","active","reminding","paused","completed"],y=e.state;if(!u.includes(y))return`Invalid state "${y}". Valid states: ${u.join(", ")}`;const p=y==="completed"||y==="paused"?0:1;return await a.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(y,p,e.job_id,r).run(),`Schedule ${e.job_id} state updated to "${y}".`}case"update_schedule":{const u=e.job_id,y=c||"UTC",p=new Date,h=["updated_at = CURRENT_TIMESTAMP"],b=[];e.name&&(h.push("name = ?"),b.push(e.name)),e.description&&(h.push("description = ?"),b.push(e.description));let k=null,S=e.schedule_type,D=e.schedule_value;if(e.minutes_from_now&&typeof e.minutes_from_now=="number"&&e.minutes_from_now>0){k=new Date(p.getTime()+e.minutes_from_now*60*1e3);const A=k.toLocaleString("en-US",{timeZone:y,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[M,z,Y]=(A[0]||"").split("/");D=`${Y}-${M}-${z} ${A[1]||"00:00"}`,S="once"}else if(S&&D){if(S==="interval")k=new Date(p.getTime()+parseInt(D,10)*60*1e3);else if(S==="daily"){const[U,A]=D.split(":").map(Number),M=new Date(p.toLocaleString("en-US",{timeZone:y})),z=new Date(M);z.setHours(U,A,0,0),z<=M&&z.setDate(z.getDate()+1);const Y=new Date(z.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(z.toLocaleString("en-US",{timeZone:y})).getTime();k=new Date(z.getTime()+Y)}else if(S==="weekly"){const[U,A]=D.split(" "),[M,z]=(A||"00:00").split(":").map(Number),Z=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(qe=>qe.toLowerCase()===U.toLowerCase()),ee=new Date(p.toLocaleString("en-US",{timeZone:y})),X=new Date(ee);X.setHours(M,z,0,0);let ne=(Z-X.getDay()+7)%7;ne===0&&X<=ee&&(ne=7),X.setDate(X.getDate()+ne);const ce=new Date(X.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(X.toLocaleString("en-US",{timeZone:y})).getTime();k=new Date(X.getTime()+ce)}else if(S==="once"){const[U,A]=D.split(" "),[M,z,Y]=U.split("-").map(Number),[Z,ee]=(A||"00:00").split(":").map(Number),X=new Date(p.toLocaleString("en-US",{timeZone:y})),ne=new Date(X);ne.setFullYear(M,z-1,Y),ne.setHours(Z,ee,0,0);const ce=new Date(ne.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(ne.toLocaleString("en-US",{timeZone:y})).getTime();k=new Date(ne.getTime()+ce),k.getTime()<p.getTime()+60*1e3&&(k=new Date(p.getTime()+120*1e3))}}if(S&&(h.push("schedule_type = ?"),b.push(S)),D&&(h.push("schedule_value = ?"),b.push(D)),k&&(h.push("next_run = ?"),b.push(k.toISOString())),h.length===1)return"No changes provided. Specify name, description, or schedule fields to update.";b.push(u,r),await a.prepare(`UPDATE cron_jobs SET ${h.join(", ")} WHERE id = ? AND user_id = ?`).bind(...b).run();const R=k?k.toLocaleString("en-US",{timeZone:y,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):null;return`Schedule ${u} updated.${R?` New fire time: ${R} (${y}).`:""} IMPORTANT: Use this exact time "${R}" when confirming to the user.`}case"delete_schedule":return await a.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(e.job_id,r).run(),`Schedule ${e.job_id} deleted.`;case"store_memory":{const u=e.importance||5,y=e.type==="task"?"preference":e.type,p=u>=7?"working":"long_term";return await g.store(r,y,e.title,e.content,u,p),`Stored in ${p==="working"?"working":"long-term"} memory: [${y}] ${e.title} (importance: ${u})`}case"search_memory":{const u=await g.search(r,e.query);return u.length===0?"No matching memories found.":u.map(y=>`[id:${y.id}] [${y.tier||"long_term"}] [${y.type}] **${y.title}**: ${y.content}`).join(`
`)}case"delete_memory":return await g.remove(e.id,r),`Memory entry ${e.id} deleted.`;case"update_memory":return await g.update(e.id,r,e.content),`Memory entry ${e.id} updated.`;case"get_system_status":{const u=await a.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),y=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),p=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(r).first(),h=await a.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),b=await a.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first();return`System Status:
- Active schedules: ${(u==null?void 0:u.cnt)||0}
- Memory: ${(p==null?void 0:p.cnt)||0} working / ${(y==null?void 0:y.cnt)||0} total
- Total messages: ${(h==null?void 0:h.cnt)||0}
- Unread errors: ${(b==null?void 0:b.cnt)||0}`}case"read_sheet":{if(!s)return"Authentication context unavailable.";try{const u=new ue(a,r,s,n||"",i||""),y=e.spreadsheet_id;let p=e.range;const h=await u.sheets.getMetadata(y),b=h.sheets;p.includes("!")||(p=`${b[0]}!${p}`);let k;try{k=await u.sheets.readRange(y,p)}catch(D){if((w=D.message)!=null&&w.includes("Unable to parse range")||(f=D.message)!=null&&f.includes("400")){const R=p.includes("!")?p.split("!")[1]:p;p=`${b[0]}!${R}`,k=await u.sheets.readRange(y,p)}else throw D}let S=`[Spreadsheet: "${h.title}" | Reading tab: "${p.split("!")[0]}" | All tabs in this spreadsheet: ${b.map(D=>`"${D}"`).join(", ")}]
`;return b.length>1&&(S+=`[To read a different tab, call read_sheet again with range like "${b[1]}!A1:Z500"]
`),k.length===0?S+"No data found in the specified range.":S+k.map(D=>D.join("	| ")).join(`
`)}catch(u){return await j(a,r,"google","read_sheet",u.message),`Failed to read sheet: ${u.message}`}}case"write_sheet":{if(!s)return"Authentication context unavailable.";try{const u=new ue(a,r,s,n||"",i||"");if(!(await u.isConnected()).connected){if(e.spreadsheet_id&&e.range&&e.values)try{const A=new Q(a),M=JSON.stringify(e.values);await A.store(r,"context",`Pending sheet write: ${e.spreadsheet_id} — ${e.range}`,JSON.stringify({tool:"write_sheet",spreadsheet_id:e.spreadsheet_id,range:e.range,values:M.length>15e3?"[[truncated — re-provide values on retry]]":e.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(e.spreadsheet_id&&e.range?`

The sheet write has been saved to temporary memory. After reconnecting, tell me "write the pending sheet data" to complete this.`:"")}const p=e.values;let h=e.range;const S=Math.max(...p.map(A=>A.length))+4,D=p.map(A=>{const M=[...A];for(;M.length<S;)M.push("");return M}),R=h.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(R){const A=R[1]||"",M=R[2],z=R[3],Y=R[5],ee=M.toUpperCase().charCodeAt(0)-64+S-1,X=ee<=26?String.fromCharCode(64+ee):"Z";h=`${A}${M}${z}:${X}${Y}`}return`Written ${(await u.sheets.writeRange(e.spreadsheet_id,h,D)).updatedCells} cells to ${h}.`}catch(u){return await j(a,r,"google","write_sheet",u.message),`Failed to write sheet: ${u.message}`}}case"append_sheet":{if(!s)return"Authentication context unavailable.";try{const u=new ue(a,r,s,n||"",i||"");if(!(await u.isConnected()).connected){if(e.spreadsheet_id&&e.range&&e.values)try{await new Q(a).store(r,"context",`Pending sheet append: ${e.spreadsheet_id} — ${e.range}`,JSON.stringify({tool:"append_sheet",spreadsheet_id:e.spreadsheet_id,range:e.range,values:e.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(e.spreadsheet_id&&e.range?`

The append data has been saved to temporary memory. After reconnecting, tell me "append the pending sheet data" to complete this.`:"")}return`Appended ${(await u.sheets.appendRows(e.spreadsheet_id,e.range,e.values)).updatedCells} cells to ${e.range}.`}catch(u){return await j(a,r,"google","append_sheet",u.message),`Failed to append to sheet: ${u.message}`}}case"create_sheet":{if(!s)return"Authentication context unavailable.";try{const u=new ue(a,r,s,n||"",i||"");if(!(await u.isConnected()).connected){if(e.title)try{await new Q(a).store(r,"context",`Pending spreadsheet create: "${e.title}"`,JSON.stringify({tool:"create_sheet",title:e.title,sheet_names:e.sheet_names??null,folder_name:e.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(e.title?`

The spreadsheet request has been saved to temporary memory. After reconnecting, tell me "create the pending spreadsheet" and I'll complete this automatically.`:"")}const p=await u.sheets.createSpreadsheet(e.title,e.sheet_names);let h="";if(e.folder_name)try{const{token:b}=await(await Promise.resolve().then(()=>Le)).getGoogleAuth(a,r,s,n||"",i||"");h=`
Folder: "${(await Gt(b,p.spreadsheetId,e.folder_name)).folderName}"`}catch(b){h=`
(Note: spreadsheet saved to Drive root — could not place in folder "${e.folder_name}": ${b.message})`}try{await new Q(a).store(r,"context",`Spreadsheet: ${e.title}`,`Spreadsheet ID: ${p.spreadsheetId} | URL: ${p.url} | Sheets: ${(e.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${e.title}"${h}
ID: ${p.spreadsheetId}
URL: ${p.url}`}catch(u){return await j(a,r,"google","create_sheet",u.message),`Failed to create spreadsheet: ${u.message}`}}case"list_calendar_events":{if(!s)return"Authentication context unavailable.";try{const u=new ue(a,r,s,n||"",i||""),y=e.calendar_id||"primary",p=e.days_ahead||7,h=new Date,b=new Date(h.getTime()+p*24*60*60*1e3),k=await u.calendar.listEvents(y,{timeMin:h.toISOString(),timeMax:b.toISOString(),query:e.query});return k.length===0?`No events found in the next ${p} days.`:k.map(S=>{var M;const D=S.start.dateTime||S.start.date||"TBD",R=S.end.dateTime||S.end.date||"",U=S.location?` 📍 ${S.location}`:"",A=((M=S.attendees)==null?void 0:M.map(z=>z.email).join(", "))||"";return`• ${S.summary} — ${D} to ${R}${U}${A?`
  Attendees: ${A}`:""}`}).join(`
`)}catch(u){return await j(a,r,"google","list_calendar",u.message),`Failed to list events: ${u.message}`}}case"create_calendar_event":{if(!s)return"Authentication context unavailable.";try{const u=new ue(a,r,s,n||"",i||"");if(!(await u.isConnected()).connected){if(e.summary&&e.start_datetime&&e.end_datetime)try{await new Q(a).store(r,"context",`Pending calendar event: "${e.summary}"`,JSON.stringify({tool:"create_calendar_event",summary:e.summary,description:e.description??null,location:e.location??null,start_datetime:e.start_datetime,end_datetime:e.end_datetime,attendees:e.attendees??null,calendar_id:e.calendar_id??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(e.summary&&e.start_datetime?`

The calendar event has been saved to temporary memory. After reconnecting, tell me "create the pending event" and I'll add it to your calendar.`:"")}const p=e.calendar_id||"primary",h=await u.calendar.createEvent(p,{summary:e.summary,description:e.description,location:e.location,startDateTime:e.start_datetime,endDateTime:e.end_datetime,attendees:e.attendees});return`Event created: "${h.summary}"
ID: ${h.id}
Start: ${h.start.dateTime||h.start.date}`}catch(u){return await j(a,r,"google","create_event",u.message),`Failed to create event: ${u.message}`}}case"create_doc":{if(!s)return"Authentication context unavailable.";const u=new ue(a,r,s,n||"",i||"");if(!(await u.isConnected()).connected){if(e.title&&e.content)try{await new Q(a).store(r,"context",`Pending Google Doc save: "${e.title}"`,JSON.stringify({tool:"create_doc",title:e.title,content:e.content,folder_name:e.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(e.title&&e.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" and I'll complete this automatically.`:"")}let p;try{p=await u.docs.createDocument(e.title)}catch(b){return await j(a,r,"google","create_doc",b.message),`Failed to create document: ${b.message}`}if(e.content)try{await u.docs.appendText(p.documentId,e.content)}catch(b){return await j(a,r,"google","create_doc_append",b.message),`Document created but content could not be written (${b.message}).
ID: ${p.documentId}
URL: ${p.url}

Use append_to_doc with the document ID above to add content.`}let h="";if(e.folder_name)try{const{token:b}=await(await Promise.resolve().then(()=>Le)).getGoogleAuth(a,r,s,n||"",i||"");h=`
Folder: "${(await Gt(b,p.documentId,e.folder_name)).folderName}"`}catch(b){h=`
(Note: document saved to Drive root — could not place in folder "${e.folder_name}": ${b.message})`}try{await new Q(a).store(r,"context",`Document: ${e.title}`,`Document ID: ${p.documentId} | URL: ${p.url}`,6,"working")}catch{}return`Document created: "${e.title}"${h}
ID: ${p.documentId}
URL: ${p.url}`}case"read_doc":{if(!s)return"Authentication context unavailable.";try{const y=await new ue(a,r,s,n||"",i||"").docs.readDocument(e.document_id);return`Document: "${y.title}"

${y.content}`}catch(u){return await j(a,r,"google","read_doc",u.message),`Failed to read document: ${u.message}`}}case"append_to_doc":{if(!s)return"Authentication context unavailable.";try{const u=new ue(a,r,s,n||"",i||"");if(!(await u.isConnected()).connected){if(e.document_id&&e.content)try{await new Q(a).store(r,"context",`Pending append to doc: "${e.document_id}"`,JSON.stringify({tool:"append_to_doc",document_id:e.document_id,content:e.content}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.'+(e.document_id&&e.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" to complete this.`:"")}await u.docs.appendText(e.document_id,e.content);let p=e.document_id;try{p=(await u.docs.readDocument(e.document_id)).title}catch{}return`Content appended to "${p}".
URL: https://docs.google.com/document/d/${e.document_id}/edit`}catch(u){return await j(a,r,"google","append_to_doc",u.message),`Failed to append to document: ${u.message}`}}case"gmail_list":{if(!s)return"Authentication context unavailable.";try{const y=await new we(a,r,s,n||"",i||"").listMessages({maxResults:e.max_results||10,query:e.query});return y.length===0?"No messages found.":y.map((p,h)=>`${p.isUnread?"● ":"  "}${h+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(u){return await j(a,r,"gmail","list",u.message),(T=u.message)!=null&&T.includes("not connected")?u.message:`Gmail list error: ${u.message}`}}case"gmail_read":{if(!s)return"Authentication context unavailable.";try{const u=new we(a,r,s,n||"",i||""),y=await u.getMessage(e.message_id);if(!y)return"Message not found.";const p=await u.getMessageBody(e.message_id);return`**${y.subject}**
From: ${y.from}
To: ${y.to}
Date: ${y.date}

${p}`}catch(u){return await j(a,r,"gmail","read",u.message),`Gmail read error: ${u.message}`}}case"gmail_search":{if(!s)return"Authentication context unavailable.";try{const y=await new we(a,r,s,n||"",i||"").search(e.query,e.max_results||10);return y.length===0?`No results for: ${e.query}`:y.map((p,h)=>`${p.isUnread?"● ":"  "}${h+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(u){return await j(a,r,"gmail","search",u.message),`Gmail search error: ${u.message}`}}case"gmail_send":{if(!s)return"Authentication context unavailable.";try{const u=new we(a,r,s,n||"",i||"");if(!(await new ue(a,r,s,n||"",i||"").isConnected()).connected){if(e.to&&e.subject&&e.body)try{await new Q(a).store(r,"context",`Pending email: "${e.subject}"`,JSON.stringify({tool:"gmail_send",to:e.to,subject:e.subject,body:e.body,cc:e.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(e.to&&e.subject&&e.body?`

Your email has been saved to temporary memory. After reconnecting, tell me "send the pending email" and I'll send it automatically.`:"")}const h=await u.send(e.to,e.subject,e.body,{cc:e.cc});return`Email sent successfully to ${e.to}. Subject: "${e.subject}" [Message ID: ${h.id}]`}catch(u){return await j(a,r,"gmail","send",u.message),`Gmail send error: ${u.message}`}}case"gmail_draft":{if(!s)return"Authentication context unavailable.";try{const u=new we(a,r,s,n||"",i||"");if(!(await new ue(a,r,s,n||"",i||"").isConnected()).connected){if(e.to&&e.subject&&e.body)try{await new Q(a).store(r,"context",`Pending draft: "${e.subject}"`,JSON.stringify({tool:"gmail_draft",to:e.to,subject:e.subject,body:e.body,cc:e.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(e.to&&e.subject&&e.body?`

Your draft has been saved to temporary memory. After reconnecting, tell me "create the pending draft" and I'll save it to Gmail.`:"")}const h=await u.createDraft(e.to,e.subject,e.body,{cc:e.cc}),b=e.cc?`, CC: ${e.cc}`:"";return`Draft created. To: ${e.to}${b}, Subject: "${e.subject}" — Review and send from Gmail. [Draft ID: ${h.id}]`}catch(u){return await j(a,r,"gmail","draft",u.message),`Gmail draft error: ${u.message}`}}case"gmail_modify":{if(!s)return"Authentication context unavailable.";try{return await new we(a,r,s,n||"",i||"").modifyMessage(e.message_id,e.action),`Message ${e.message_id} successfully ${e.action}ed.`}catch(u){return await j(a,r,"gmail","modify",u.message),`Gmail modify error: ${u.message}`}}case"gmail_unread_count":{if(!s)return"Authentication context unavailable.";try{const y=await new we(a,r,s,n||"",i||"").getUnreadCount();return`You have ${y} unread email${y!==1?"s":""} in Gmail.`}catch(u){return(v=u.message)!=null&&v.includes("not connected")?u.message:`Gmail error: ${u.message}`}}case"drive_list":{if(!s)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Le)).getGoogleAuth(a,r,s,n||"",i||""),y=new URLSearchParams;y.set("pageSize",String(e.max_results||10)),y.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),y.set("orderBy","modifiedTime desc");let p="";e.folder_id?p=`'${e.folder_id}' in parents and trashed = false`:e.query?p=`${e.query} and trashed = false`:p="trashed = false",y.set("q",p);const h=await fetch(`https://www.googleapis.com/drive/v3/files?${y}`,{headers:{Authorization:`Bearer ${u}`}});if(!h.ok)throw new Error(`Drive API error (${h.status})`);const b=await h.json();return(x=b.files)!=null&&x.length?b.files.map((k,S)=>{var A,M;const D=((A=k.mimeType)==null?void 0:A.split(".").pop())||k.mimeType,R=k.size?`${(parseInt(k.size)/1024).toFixed(1)} KB`:"",U=((M=k.modifiedTime)==null?void 0:M.split("T")[0])||"";return`${S+1}. **${k.name}** (${D})
   ${R} · Modified: ${U}
   ${k.webViewLink||""}`}).join(`

`):"No files found."}catch(u){return await j(a,r,"google","drive_list",u.message),`Drive list error: ${u.message}`}}case"drive_search":{if(!s)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Le)).getGoogleAuth(a,r,s,n||"",i||""),y=`fullText contains '${e.query.replace(/'/g,"\\'")}' and trashed = false`,p=new URLSearchParams;p.set("q",y),p.set("pageSize",String(e.max_results||10)),p.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),p.set("orderBy","modifiedTime desc");const h=await fetch(`https://www.googleapis.com/drive/v3/files?${p}`,{headers:{Authorization:`Bearer ${u}`}});if(!h.ok)throw new Error(`Drive API error (${h.status})`);const b=await h.json();return(E=b.files)!=null&&E.length?b.files.map((k,S)=>{var U,A;const D=((U=k.mimeType)==null?void 0:U.split(".").pop())||k.mimeType,R=((A=k.modifiedTime)==null?void 0:A.split("T")[0])||"";return`${S+1}. **${k.name}** (${D}) — Modified: ${R}
   ${k.webViewLink||""}`}).join(`

`):`No files found for: "${e.query}"`}catch(u){return await j(a,r,"google","drive_search",u.message),`Drive search error: ${u.message}`}}case"drive_read_file":{if(!s)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Le)).getGoogleAuth(a,r,s,n||"",i||""),y=e.url_or_id.trim();let p=y;const h=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/\/presentation\/d\/([a-zA-Z0-9_-]+)/,/\/forms\/d\/([a-zA-Z0-9_-]+)/,/[?&]id=([a-zA-Z0-9_-]+)/,/\/d\/([a-zA-Z0-9_-]+)/];for(const Y of h){const Z=y.match(Y);if(Z){p=Z[1];break}}const b=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?fields=id,name,mimeType,size`,{headers:{Authorization:`Bearer ${u}`}});if(!b.ok)throw new Error(`Drive API error (${b.status}): could not fetch file metadata`);const k=await b.json(),{name:S,mimeType:D}=k,R=e.extract_focus,U=R?`Focus specifically on extracting: ${R}`:"Extract and return all readable text content. Preserve structure where relevant.",A={"application/vnd.google-apps.document":"text/plain","application/vnd.google-apps.spreadsheet":"text/csv","application/vnd.google-apps.presentation":"text/plain"};if(A[D]){const Y=A[D],Z=await fetch(`https://www.googleapis.com/drive/v3/files/${p}/export?mimeType=${encodeURIComponent(Y)}`,{headers:{Authorization:`Bearer ${u}`}});if(!Z.ok)throw new Error(`Drive export error (${Z.status})`);const ee=await Z.text();if(D==="application/vnd.google-apps.spreadsheet"){const X=Qs(ee),ne=X.length,ce=((O=X[0])==null?void 0:O.length)??0;return`**${S}** (Google Sheet — ${ne} rows × ${ce} columns)

Parsed rows (JSON, ready for write_sheet/append_sheet):
${JSON.stringify(X)}`}return`**${S}**

${ee.substring(0,2e4)}`}if(D==="application/pdf"||S.toLowerCase().endsWith(".pdf")){const Y=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?alt=media`,{headers:{Authorization:`Bearer ${u}`}});if(!Y.ok)throw new Error(`Drive download error (${Y.status})`);const Z=await Y.arrayBuffer(),ee=Buffer.from(Z).toString("base64");let X=null,ne="claude-haiku-4-5-20251001";for(const nt of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const sa=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,nt).first();if(sa&&s){const $r=await J(sa.encrypted_value,s),Et=JSON.parse($r);if(Et.provider==="anthropic"){X=Et.apiKey,Et.model&&(ne=Et.model);break}}}catch{}if(!X)return`"${S}" is a PDF. An Anthropic API key is required to extract PDF content. Please configure one in Settings → Keys.`;const ce=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":X,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:ne,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:ee}},{type:"text",text:U}]}]})});if(!ce.ok){const nt=await ce.text();throw new Error(`Anthropic PDF extraction error: ${nt.substring(0,200)}`)}const At=((P=(N=(await ce.json()).content)==null?void 0:N[0])==null?void 0:P.text)||"";return`**${S}** (PDF from Drive)

${At}`}const M=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?alt=media`,{headers:{Authorization:`Bearer ${u}`}});if(!M.ok)throw new Error(`Drive download error (${M.status})`);const z=await M.text();return`**${S}** (${D})

${z.substring(0,2e4)}`}catch(u){return await j(a,r,"google","drive_read_file",u.message),`Drive read error: ${u.message}`}}case"drive_delete_file":{if(!s)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Le)).getGoogleAuth(a,r,s,n||"",i||""),y=e.url_or_id.trim();let p=y;const h=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const D of h){const R=y.match(D);if(R){p=R[1];break}}const b=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?fields=name`,{headers:{Authorization:`Bearer ${u}`}});if(!b.ok)throw new Error(`Drive API error (${b.status})`);const k=await b.json(),S=await fetch(`https://www.googleapis.com/drive/v3/files/${p}`,{method:"PATCH",headers:{Authorization:`Bearer ${u}`,"Content-Type":"application/json"},body:JSON.stringify({trashed:!0})});if(!S.ok)throw new Error(`Drive API error (${S.status})`);return`"${k.name}" moved to trash. You can restore it from Drive trash within 30 days.`}catch(u){return await j(a,r,"google","drive_delete_file",u.message),`Drive delete error: ${u.message}`}}case"drive_organise":{if(!s)return"Authentication context unavailable.";if(!e.folder_name&&!e.new_name)return"Please provide at least a folder_name to move to or a new_name to rename.";try{const{token:u}=await(await Promise.resolve().then(()=>Le)).getGoogleAuth(a,r,s,n||"",i||""),y=e.url_or_id.trim();let p=y;const h=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const k of h){const S=y.match(k);if(S){p=S[1];break}}const b=[];if(e.new_name){const k=await fetch(`https://www.googleapis.com/drive/v3/files/${p}`,{method:"PATCH",headers:{Authorization:`Bearer ${u}`,"Content-Type":"application/json"},body:JSON.stringify({name:e.new_name})});if(!k.ok)throw new Error(`Drive rename error (${k.status})`);b.push(`Renamed to "${e.new_name}"`)}if(e.folder_name){const{folderName:k}=await Gt(u,p,e.folder_name);b.push(`Moved to folder "${k}"`)}return b.join(". ")+"."}catch(u){return await j(a,r,"google","drive_organise",u.message),`Drive organise error: ${u.message}`}}case"web_search":try{const u=await Nt(e.query,{num:e.num_results||5,site:e.site});return u.error?`Web search failed: ${u.error}. Answer this question directly from your training knowledge and clearly state you are doing so.`:u.results.length===0?`Web search returned no results for "${e.query}". Answer this question directly from your training knowledge and clearly state you are doing so instead of searching.`:u.results.map((y,p)=>`${p+1}. [${y.title}](${y.link})
   ${y.snippet}`).join(`

`)}catch(u){return await j(a,r,"search","web_search",u.message),`Web search error: ${u.message}`}case"read_url":try{const u=e.url;if(!u||!u.startsWith("http://")&&!u.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const y=Math.min(e.max_length||8e3,15e3),{fetchPageContent:p}=await Promise.resolve().then(()=>Fs),h=await p(u,y);return h.error?`Failed to read page: ${h.error}`:!h.text||h.text.length<20?`Page at ${u} returned no readable content.`:`Content from ${u} (${h.text.length} chars):

${h.text}`}catch(u){return await j(a,r,"search","read_url",u.message),`Read URL error: ${u.message}`}case"research":{if(!d)return"Research tool requires an LLM provider but none is available.";try{let u;try{const S=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"perplexity_api_key").first();S&&s&&(u=await J(S.encrypted_value,s))}catch{}const y=2e4,p=fr(e.query,d,{depth:e.depth||"quick",site:e.site,perplexityApiKey:u}),h=new Promise(S=>setTimeout(()=>S(null),y)),b=await Promise.race([p,h]);if(b===null){const{webSearch:S}=await Promise.resolve().then(()=>$s),D=await S(e.query,{num:5});if(D.error||D.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let R=`Research took too long, but here are the top search results:

`;return R+=D.results.map((U,A)=>`${A+1}. [${U.title}](${U.link})
   ${U.snippet}`).join(`

`),R}if(b.error)return`Research failed: ${b.error}`;let k=b.report;b.sources.length>0&&(k+=`

---
**Sources** (`+b.pagesRead+` pages read):
`,k+=b.sources.map((S,D)=>`[${D+1}] [${S.title}](${S.url})`).join(`
`));try{const S=new Q(a),D=b.report.substring(0,600);await S.store(r,"context",`Research: ${e.query.substring(0,80)}`,D,6,"long_term")}catch{}return k}catch(u){return await j(a,r,"research","research",u.message),`Research error: ${u.message}`}}case"browser_task":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"browser_use_api_key").first();if(!u)return"Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key (get one at cloud.browser-use.com).";const y=(await J(u.encrypted_value,s)).trim();let p;if(e.site_name){const k=await a.prepare("SELECT encrypted_blob FROM site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE").bind(r,e.site_name).first();if(k){const S=JSON.parse(await J(k.encrypted_blob,s));p={username:S.username,password:S.password}}}const h=await zs(e.task,y,{secrets:p});if(h.status==="completed")return h.output??"Task completed but returned no output.";if(h.status==="timeout"){try{await new Q(a).store(r,"context",`Browser task in progress: ${h.taskId}`,JSON.stringify({task_id:h.taskId,task:e.task}),9,"working")}catch{}return`The browser is still working on this (task ID: \`${h.taskId}\`). Ask me "what happened with the browser task?" in about a minute and I'll check the result.`}const b=[h.error,h.output].filter(Boolean).join(" — ");return`Browser task failed (ID: \`${h.taskId}\`): ${b||"No details returned. Check your Browser Use dashboard at cloud.browser-use.com."}`}catch(u){return await j(a,r,"browser","browser_task",u.message),`Browser task error: ${u.message}`}}case"browser_task_status":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"browser_use_api_key").first();if(!u)return"Browser Use API key not configured.";const y=await J(u.encrypted_value,s),p=await Ks(e.task_id,y);if(p.done){try{const h=new Q(a),b=await h.search(r,`Browser task in progress: ${e.task_id}`);for(const k of b)await h.remove(k.id,r)}catch{}return p.status==="completed"?p.output??"Task completed but returned no output.":`Browser task ended with status: ${p.status}`}return`Browser task is still running (status: ${p.status}). Try again in 30 seconds.`}catch(u){return await j(a,r,"browser","browser_task_status",u.message),`Browser status check error: ${u.message}`}}case"search_places":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const y=await J(u.encrypted_value,s),p=await or(y,e.query,{type:e.type});return p.error?`Places search failed: ${p.error}`:p.results.length===0?`No places found for "${e.query}".`:p.results.map((h,b)=>{const k=h.rating?` ★${h.rating} (${h.userRatingsTotal||0} reviews)`:"",S=h.openNow!==void 0?h.openNow?" · Open now":" · Closed":"",D=h.googleMapsUri?`
   ${h.googleMapsUri}`:"";return`${b+1}. **${h.name}**${k}${S}
   ${h.address}${D}
   [place_id: ${h.placeId}]`}).join(`

`)}catch(u){return await j(a,r,"google_api","search_places",u.message),`Places search error: ${u.message}`}}case"get_place_details":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,s),p=await lr(y,e.place_id);if(p.error)return`Details lookup failed: ${p.error}`;if(!p.details)return"No details found.";const h=p.details;let b=`**${h.name}**
📍 ${h.address}`;if(h.phone&&(b+=`
📞 ${h.phone}`),h.website&&(b+=`
🌐 ${h.website}`),h.rating&&(b+=`
★ ${h.rating}`),h.googleMapsUri&&(b+=`
📌 ${h.googleMapsUri}`),h.openingHours&&(b+=`

Opening Hours:
${h.openingHours.join(`
`)}`),h.reviews&&h.reviews.length>0){b+=`

Recent Reviews:`;for(const k of h.reviews)b+=`
— ${k.author} (★${k.rating}, ${k.time}): "${k.text}"`}return b}catch(u){return await j(a,r,"google_api","place_details",u.message),`Place details error: ${u.message}`}}case"get_directions":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,s),p=await cr(y,e.origin,e.destination,{mode:e.mode||"driving"});if(p.error)return`Directions failed: ${p.error}`;if(!p.route)return"No route found.";const h=p.route;let b=`**${h.startAddress}** → **${h.endAddress}**
`;return b+=`📏 ${h.distance} · ⏱️ ${h.duration}`,h.durationInTraffic&&(b+=` (with traffic: ${h.durationInTraffic})`),b+=`
via ${h.summary}`,b+=`

Steps:`,h.steps.forEach((k,S)=>{b+=`
${S+1}. ${k.instruction} (${k.distance}, ${k.duration})`}),b}catch(u){return await j(a,r,"google_api","directions",u.message),`Directions error: ${u.message}`}}case"get_travel_time":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,s),p=await pr(y,e.origin,e.destination,e.mode||"driving");if(p.error)return`Travel time lookup failed: ${p.error}`;let h=`${e.origin} → ${e.destination}: ${p.distance}, ${p.duration}`;return p.durationInTraffic&&(h+=` (with traffic: ${p.durationInTraffic})`),h}catch(u){return await j(a,r,"google_api","travel_time",u.message),`Travel time error: ${u.message}`}}case"translate_text":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,s),p=await dr(y,e.text,e.target_language,e.source_language);return p.error?`Translation failed: ${p.error}`:`[${p.detectedSourceLang||e.source_language||"auto"} → ${e.target_language}]

${p.translatedText}`}catch(u){return await j(a,r,"google_api","translate",u.message),`Translation error: ${u.message}`}}case"search_youtube":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,s),p=await mr(y,e.query,{maxResults:e.max_results||5,order:e.order||"relevance"});return p.error?`YouTube search failed: ${p.error}`:p.results.length===0?`No YouTube results for "${e.query}".`:p.results.map((h,b)=>{var k;return`${b+1}. **${h.title}**
   ${h.channelTitle} · ${((k=h.publishedAt)==null?void 0:k.split("T")[0])||""}
   ${h.description}
   ${h.url}`}).join(`

`)}catch(u){return await j(a,r,"google_api","youtube_search",u.message),`YouTube search error: ${u.message}`}}case"geocode_address":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,s),p=await ur(y,e.address);return p.error?`Geocoding failed: ${p.error}`:p.results.length===0?`Location not found: "${e.address}"`:p.results.map((h,b)=>`${b+1}. ${h.address}
   Coordinates: ${h.lat}, ${h.lng}`).join(`
`)}catch(u){return await j(a,r,"google_api","geocode",u.message),`Geocoding error: ${u.message}`}}case"parse_document":{const u=e.file_id,y=e.extract_focus;if(!u)return"file_id is required to parse a document.";const p=await a.prepare("SELECT file_name, file_type, file_data, file_size, extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(u,r).first();if(!p)return"File not found. The file may have expired or the file_id is incorrect.";if(p.extracted_text)return`Document: ${p.file_name}

${p.extracted_text}`;const{file_name:h,file_type:b}=p;let{file_data:k}=p;if(k==="r2"){if(!m)return`File "${h}" is stored in R2 but no storage bucket is configured.`;const S=await m.get(u);if(!S)return`File "${h}" not found in storage. It may have been deleted.`;const D=await S.arrayBuffer();k=Buffer.from(D).toString("base64")}if(b.startsWith("text/"))try{const S=Buffer.from(k,"base64").toString("utf-8");return`Document: ${h}

${S.substring(0,2e4)}`}catch{return`Could not decode text file: ${h}`}if(b==="application/pdf"||b==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||h.toLowerCase().endsWith(".pdf")||h.toLowerCase().endsWith(".docx")){if(b==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||h.toLowerCase().endsWith(".docx")){try{const R=await vr(Buffer.from(k,"base64"));if(R.length>50)return`Document: ${h}

${R.substring(0,2e4)}`}catch{}return`Could not extract text from "${h}". Try uploading to Google Drive and sharing the link — Drive can open and export Word documents directly.`}let S=null,D="claude-haiku-4-5-20251001";for(const R of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const U=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,R).first();if(U&&s){const A=await J(U.encrypted_value,s),M=JSON.parse(A);if(M.provider==="anthropic"){S=M.apiKey,M.model&&(D=M.model);break}}}catch{}if(S)try{const R=y?`Focus specifically on extracting: ${y}`:"Extract and return all readable text content from this document. Preserve structure where relevant.",U=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":S,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:D,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:k}},{type:"text",text:R}]}]})});if(U.ok){const M=((F=(W=(await U.json()).content)==null?void 0:W[0])==null?void 0:F.text)||"";return`Document: ${h}

${M}`}else{const A=await U.text();return`Could not parse ${h} via Anthropic API: ${A.substring(0,200)}`}}catch(R){return`Document parsing error for ${h}: ${R.message}`}return"To parse PDF documents, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set."}try{const S=Buffer.from(k,"base64").toString("utf-8").substring(0,2e3);return`Document: ${h} (${b})

Content preview:
${S}`}catch{return`Cannot read file: ${h} (${b})`}}case"create_skill":{const u=(B=e.name)==null?void 0:B.trim(),y=(G=e.description)==null?void 0:G.trim(),p=(q=e.instructions)==null?void 0:q.trim();if(!u||!y||!p)return"create_skill requires name, description, and instructions.";let h=u.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"");h||(h=`skill_${Date.now()}`);const b=await a.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(r,`${h}%`).all();(I=b.results)!=null&&I.some(R=>R.slug===h)&&(h=`${h}_${(((L=b.results)==null?void 0:L.length)||0)+1}`);const k=JSON.stringify(e.parameters||{}),S=JSON.stringify(e.required_tools||[]),D=JSON.stringify(e.examples||[]);return await a.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(r,u,h,y,p,k,S,D).run(),`Skill created: **${u}** (invoke as: "${h}")

You can now ask me to run "${u}" at any time. The skill will appear in Settings → Skills. You can also say "run my ${u} skill" to execute it.`}case"list_skills":{const y=e.include_disabled===!0?"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? ORDER BY created_at DESC":"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC",h=(await a.prepare(y).bind(r).all()).results||[];if(h.length===0)return`You haven't created any custom skills yet. Ask me to create one: "Create a skill that..."`;const b=h.map(k=>`• **${k.name}** (${k.slug}): ${k.description} [used ${k.usage_count} times${k.enabled?"":" — disabled"}]`).join(`
`);return`Your custom skills (${h.length}):

${b}`}default:{const u=t,y=await a.prepare("SELECT id, name, description, instructions, required_tools FROM user_skills WHERE user_id = ? AND slug = ? AND enabled = 1").bind(r,u).first();if(y){await a.prepare("UPDATE user_skills SET usage_count = usage_count + 1, last_used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(y.id).run();const p=(()=>{try{return JSON.parse(y.required_tools).join(", ")}catch{return""}})(),h=Object.keys(e).length>0?`

Inputs provided: ${JSON.stringify(e)}`:"";return`[SKILL: ${y.name}] Follow these instructions exactly:

${y.instructions}${h}

${p?`Tools to use: ${p}`:""}

Execute the steps above using your available tools. When complete, provide a clear summary of what was done and any results.`}return`Unknown tool: ${t}`}}}async function Dr(t,e,a,r,s){if(e.length>0&&e[e.length-1].role==="user"){const n="(Previous request did not complete. Please try again.)";await t.storeMessage(a,r,"assistant",n,"{}",s),e.push({id:-1,user_id:a,channel:r,role:"assistant",content:n,metadata:"{}",token_estimate:n.length,created_at:new Date().toISOString()})}}function Ir(t){for(let e=t.length-1;e>=0;e--)if(t[e].role==="assistant"){const a=typeof t[e].content=="string"?t[e].content:"";a.length<300&&/^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(a.trim())&&(t[e]={...t[e],content:"(My previous response was cut off before completing. Starting fresh.)"});break}}async function fa(t,e,a,r,s,n,i){var q,I,L,u,y;const o=new Q(e),l=(q=t.metadata)==null?void 0:q.thread_id,c=Date.now(),[d,m]=await Promise.all([o.buildContext(r.id),aa(e,r.id)]),g=await o.getRecentConversations(r.id,30,l);await Dr(o,g,r.id,t.channel,l);const w=xr(r,d,t.channel,m),f=Tr([{role:"system",content:w},...g.map(p=>({role:p.role,content:p.content})),{role:"user",content:t.text}]);Ir(f);const T=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],v=(d.match(/^- /gm)||[]).length;if(T.some(p=>p.test(t.text))||v<3)try{const p=await o.searchLongTerm(r.id,t.text,5);if(p.length>0){const h=p.map(b=>`- [${b.type}] ${b.title}: ${b.content}`).join(`
`);f.splice(f.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${h}]`})}}catch{}await o.storeMessage(r.id,t.channel,"user",t.text,"{}",l);const E=(i==null?void 0:i.maxTurns)??10,O=(i==null?void 0:i.tools)??await ta(e,r.id);let N="",P=0;const W=[];for(let p=0;p<E;p++)try{p>0&&Sr(f);const h=await a.chat(f,{tools:O,toolChoice:p===0&&(i!=null&&i.forceToolUseOnFirstTurn)?"required":void 0});if(h.usage&&(P+=h.usage.promptTokens+h.usage.completionTokens),h.toolCalls&&h.toolCalls.length>0){const b=h.content||`[calling: ${h.toolCalls.map(S=>{const D=S.arguments||{},R=Object.entries(D).filter(([U])=>!["content","values","body"].includes(U)).map(([U,A])=>`${U}="${String(A).substring(0,100)}"`).join(", ");return`${S.name}(${R})`}).join(", ")}]`;f.push({role:"assistant",content:b});for(const S of h.toolCalls)W.push(S.name);const k=await Promise.all(h.toolCalls.map(async S=>{try{const D=await pt(S.name,S.arguments,e,r.id,{agentType:"full",providerName:a.name,channel:t.channel},r.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,r.timezone,a,n==null?void 0:n.DOCUMENTS_BUCKET),R=["parse_document","drive_read_file"].includes(S.name)?2e4:8e3,U=D.length>R?D.substring(0,R)+`
[...result truncated to prevent token limit — full content was extracted]`:D;return`[Tool Result for ${S.name}]: ${U}`}catch(D){return await j(e,r.id,"tool",S.name,D.message||"Tool execution failed"),`[Tool Error for ${S.name}]: ${D.message||"Execution failed"}`}}));f.push({role:"user",content:k.join(`

`)});continue}N=h.content;break}catch(h){if(s){const b=h.message||"",k=b.includes("401")||b.includes("403")||b.includes("authentication")||b.includes("credit balance"),S=b.includes("429"),D=k?1440:S?10:5;await s.recordError(a.name,b,D)}throw await j(e,r.id,"llm","provider_error",h.message||"Unknown LLM error",{provider:a.name,turn:p}),h}if(N=(N==null?void 0:N.trim())??"",!N)try{((I=f[f.length-1])==null?void 0:I.role)==="user"&&f.push({role:"assistant",content:"[gathering results]"}),f.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),N=(await a.chat(f,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me directly and I will answer from my knowledge."}catch{N="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge."}if(s&&P>0)try{await s.recordUsage(a.name,P)}catch{}try{await e.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(r.id,a.name,"full",P,Date.now()-c,1,t.channel).run()}catch{}const F=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your|the)\s+(sheet|spreadsheet))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc)\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a Google Document but create_doc was never called. You MUST call create_doc NOW.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+)?(document|google\s+doc|doc)|added\s+(the\s+)?(content|text)\s+to\s+(the\s+)?(document|doc)|i.ve\s+appended\s+(to\s+)?(the\s+)?(document|doc))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"}];for(const p of F){const h=p.claimPattern.test(N),b=p.requiredTools.some(k=>W.includes(k));if(h&&!b){try{await j(e,r.id,"llm",p.logType,"LLM claimed action without tool call",{response:N.substring(0,200)}),f.push({role:"assistant",content:N}),f.push({role:"user",content:p.enforcementMsg});const k=await a.chat(f,{tools:O.filter(S=>p.requiredTools.includes(S.name)),temperature:0});if((L=k.toolCalls)!=null&&L.length){for(const D of k.toolCalls){const R=await pt(D.name,D.arguments,e,r.id,{agentType:"full",providerName:a.name,channel:t.channel},r.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,r.timezone,a,n==null?void 0:n.DOCUMENTS_BUCKET);W.push(D.name),f.push({role:"assistant",content:"",toolCalls:k.toolCalls}),f.push({role:"user",content:R})}const S=await a.chat(f,{tools:[]});S.content&&(N=S.content)}else N="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}let B=N.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim();if(!B&&W.length>0){const p=[...new Set(W)].join(", ");try{((u=f[f.length-1])==null?void 0:u.role)==="user"&&f.push({role:"assistant",content:"[completed tools]"}),f.push({role:"user",content:"Please summarise what you just did and provide the result to the user."}),B=((y=(await a.chat(f,{tools:[]})).content)==null?void 0:y.trim())||`Done. I used the following tools: ${p}.`}catch{B=`Done. I used the following tools: ${p}.`}}const G=W.length>0?`[TOOLS_USED: ${[...new Set(W)].join(", ")}] `:"";await o.storeMessage(r.id,t.channel,"assistant",G+B,"{}",l),await o.compactHistory(r.id,30);try{const p=await e.prepare("SELECT COUNT(*) as c FROM conversations WHERE user_id = ? AND role = ?").bind(r.id,"assistant").first();p&&p.c%5===0&&p.c>0&&await Promise.race([tn(e,a,r,o,f),new Promise(h=>setTimeout(h,5e3))])}catch{}return B}async function tn(t,e,a,r,s){var d;const n=s.filter(m=>m.role!=="system").slice(-10);if(n.length<4)return;const o=[{role:"system",content:`Review this conversation and extract any information worth remembering long-term.
Only extract genuinely durable information — things that will still be relevant in future conversations.
Good examples: addresses, phone numbers, account IDs, spreadsheet IDs, document links, explicit preferences, recurring needs, key decisions.
Bad examples: temporary topics, one-off requests, information already in the system prompt.

For each item, output a line: TYPE|TITLE|CONTENT|IMPORTANCE
Types: fact, preference, context, decision
Importance: 1-10 (8+ = standing rules, 5-7 = regular facts)
If nothing worth extracting, output: NONE`},...n,{role:"user",content:"Extract durable information from the above conversation."}],c=((d=(await e.chat(o,{tools:[]})).content)==null?void 0:d.trim())||"";if(!(!c||c==="NONE"))for(const m of c.split(`
`)){const g=m.trim().split("|");if(g.length<4)continue;const[w,f,T,v]=g,x=["fact","preference","context","decision","summary","task"].find(O=>O===w.trim().toLowerCase());if(!x||!(f!=null&&f.trim())||!(T!=null&&T.trim()))continue;const E=Math.min(10,Math.max(1,parseInt(v)||5));await r.store(a.id,x,f.trim(),T.trim(),E,"long_term")}}const ya={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function an(t){for(const[e,a]of Object.entries(ya))if(t.toLowerCase().includes(e.toLowerCase()))return a;return ya.default}function rn(t,e,a,r){const s=an(r),n=Math.floor(s*.75),i=[];let o=0,l=!1;const c=Ht(t);i.push({role:"system",content:t}),o+=c;const d=Ht(a);o+=d;const m=n-o,g=[];let w=0;for(let f=e.length-1;f>=0;f--){const T=e[f],v=Ht(T.content);if(w+v<=m)g.unshift({role:T.role,content:T.content}),w+=v;else{l=!0;break}}return i.push(...g),i.push({role:"user",content:a}),o+=w,{maxTokens:s,usedTokens:o,messages:i,wasTruncated:l}}async function*sn(t,e,a,r,s,n){var P,W;const i=new Q(e),o=(P=t.metadata)==null?void 0:P.thread_id,l=Date.now();yield{type:"thinking",data:{threadId:o,provider:a.name}};const[c,d]=await Promise.all([i.buildContext(r.id),aa(e,r.id)]),m=await i.getRecentConversations(r.id,30,o);await Dr(i,m,r.id,t.channel,o);const g=xr(r,c,t.channel,d),w=rn(g,m,t.text,a.name);await i.storeMessage(r.id,t.channel,"user",t.text,"{}",o);const f=await ta(e,r.id),T=10;let v="",x=0;const E=[...w.messages],O=[];Ir(E);for(let F=0;F<T;F++)try{F>0&&(yield{type:"thinking",data:{threadId:o}},Sr(E));const B=await a.chat(E,{tools:f});if(B.usage&&(x+=B.usage.promptTokens+B.usage.completionTokens),B.toolCalls&&B.toolCalls.length>0){B.content&&(yield{type:"chunk",data:{text:B.content,threadId:o}});const q=B.content||`[calling: ${B.toolCalls.map(L=>{const u=L.arguments||{},y=Object.entries(u).filter(([p])=>!["content","values","body"].includes(p)).map(([p,h])=>`${p}="${String(h).substring(0,100)}"`).join(", ");return`${L.name}(${y})`}).join(", ")}]`;E.push({role:"assistant",content:q});const I=[];for(const L of B.toolCalls){yield{type:"tool_start",data:{tool:L.name,toolArgs:L.arguments,threadId:o}};try{const u=await pt(L.name,L.arguments,e,r.id,{agentType:"full",providerName:a.name,channel:t.channel},r.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,r.timezone,a,n==null?void 0:n.DOCUMENTS_BUCKET);O.push(L.name),yield{type:"tool_end",data:{tool:L.name,toolResult:u.substring(0,500)+(u.length>500?"...":""),threadId:o}};const y=["parse_document","drive_read_file"].includes(L.name)?2e4:8e3,p=u.length>y?u.substring(0,y)+`
[...result truncated to prevent token limit — full content was extracted]`:u;I.push(`[Tool Result for ${L.name}]: ${p}`)}catch(u){await j(e,r.id,"tool",L.name,u.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:L.name,toolResult:`Error: ${u.message||"Execution failed"}`,threadId:o}},I.push(`[Tool Error for ${L.name}]: ${u.message||"Execution failed"}`)}}E.push({role:"user",content:I.join(`

`)});continue}v=B.content,await i.storeMessage(r.id,t.channel,"assistant",v.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,""),"{}",o);const G=50;for(let q=0;q<v.length;q+=G)yield{type:"chunk",data:{text:v.substring(q,q+G),threadId:o}},q+G<v.length&&await new Promise(L=>setTimeout(L,10));break}catch(B){if(s){const I=B.message||"",L=I.includes("401")||I.includes("403")||I.includes("authentication")||I.includes("credit balance"),u=I.includes("429"),y=L?1440:u?10:5;await s.recordError(a.name,I,y)}await j(e,r.id,"llm","provider_error",B.message||"Unknown LLM error",{provider:a.name,turn:F});const G=B.message||"An error occurred",q=G.includes("429")||G.toLowerCase().includes("rate limit")||G.toLowerCase().includes("too many requests")?"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.":G;try{await i.storeMessage(r.id,t.channel,"assistant",`⚠️ ${q}`,"{}",o)}catch{}yield{type:"error",data:{error:q,threadId:o}};return}if(v=(v==null?void 0:v.trim())??"",!v)try{E.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),v=(await a.chat(E,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me to answer directly from my knowledge.",await i.storeMessage(r.id,t.channel,"assistant",v.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,""),"{}",o);const B=50;for(let G=0;G<v.length;G+=B)yield{type:"chunk",data:{text:v.substring(G,G+B),threadId:o}},G+B<v.length&&await new Promise(q=>setTimeout(q,10))}catch{v="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.",await i.storeMessage(r.id,t.channel,"assistant",v,"{}",o).catch(()=>{}),yield{type:"chunk",data:{text:v,threadId:o}}}if(s&&x>0)try{await s.recordUsage(a.name,x)}catch{}try{await e.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(r.id,a.name,"full",x,Date.now()-l,1,t.channel).run()}catch{}const N=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your\s+|the\s+)(sheet|spreadsheet))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc)\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a Google Document but create_doc was never called. You MUST call create_doc NOW.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+)?(document|google\s+doc|doc)|added\s+(the\s+)?(content|text)\s+to\s+(the\s+)?(document|doc)|i.ve\s+appended\s+(to\s+)?(the\s+)?(document|doc))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"}];for(const F of N){const B=F.claimPattern.test(v),G=F.requiredTools.some(q=>O.includes(q));if(B&&!G){try{await j(e,r.id,"llm",F.logType,"LLM claimed action without tool call (streaming)",{response:v.substring(0,200)}),E.push({role:"assistant",content:v}),E.push({role:"user",content:F.enforcementMsg});const q=await a.chat(E,{tools:f.filter(I=>F.requiredTools.includes(I.name)),temperature:0});if((W=q.toolCalls)!=null&&W.length){for(const L of q.toolCalls){const u=await pt(L.name,L.arguments,e,r.id,{agentType:"full",providerName:a.name,channel:t.channel},r.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,r.timezone,a,n==null?void 0:n.DOCUMENTS_BUCKET);O.push(L.name),E.push({role:"assistant",content:"",toolCalls:q.toolCalls}),E.push({role:"user",content:u})}const I=await a.chat(E,{tools:[]});I.content&&(v=I.content)}else v="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}await i.compactHistory(r.id,30),yield{type:"done",data:{threadId:o,provider:a.name,tokenCount:x}}}async function va(t,e,a,r,s,n,i,o){await n.storeMessage(s.id,e.channel,"user",e.text,"{}",o);const l=await pt(t.tool,t.args,a,s.id,{agentType:"direct",channel:e.channel},s.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,s.timezone,r,i==null?void 0:i.DOCUMENTS_BUCKET);return await n.storeMessage(s.id,e.channel,"assistant",`[TOOLS_USED: ${t.tool}] ${l}`,"{}",o),l}async function ra(t,e,a,r,s,n){var f;const i=new Q(e),o=(f=t.metadata)==null?void 0:f.thread_id,l=await i.buildContext(r.id),c=ea(t.text,l);if(c.agent==="conversation")return Or(t,e,a,r,l,s,o);const d=wr(t.text);if(d)return va(d,t,e,a,r,i,n,o);const m=(await i.getRecentConversations(r.id,10,o)).map(T=>T.content).join(`
`),g=br(t.text,m);if(g)return va(g,t,e,a,r,i,n,o);const w=c.confidence>=.85;if(t.channel==="telegram"){const T=await ta(e,r.id);return fa(t,e,a,r,s,n,{maxTurns:10,tools:T,forceToolUseOnFirstTurn:w})}return fa(t,e,a,r,s,n,{forceToolUseOnFirstTurn:w})}async function Or(t,e,a,r,s,n,i){const o=new Q(e),l=Date.now(),c=kr(r.timezone),d=await aa(e,r.id),m=d?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. Do not store copies in memory or contradict them.
${d}

${s}`:s,g=_r("conversation",r,m,r.timezone,c,t.channel),w=(await o.getRecentConversations(r.id,30,i)).filter(E=>!E.content.startsWith("[Autonomous Scheduled Task]")&&!E.content.startsWith("[Scheduled Reminder]")),f=Tr([{role:"system",content:g},...w.map(E=>({role:E.role,content:E.content})),{role:"user",content:t.text}]);await o.storeMessage(r.id,t.channel,"user",t.text,"{}",i);let T=0,v="";try{const E=await a.chat(f,{temperature:.8});E.usage&&(T=E.usage.promptTokens+E.usage.completionTokens),v=E.content}catch(E){if(n){const O=E.message||"",N=O.includes("401")||O.includes("403")||O.includes("authentication")||O.includes("credit balance"),P=O.includes("429"),W=N?1440:P?10:5;await n.recordError(a.name,O,W)}throw await j(e,r.id,"llm","conversation_error",E.message,{provider:a.name}),E}if(n&&T>0)try{await n.recordUsage(a.name,T)}catch{}try{await e.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(r.id,a.name,"conversation",T,Date.now()-l,1,t.channel).run()}catch{}const x=v.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"");return await o.storeMessage(r.id,t.channel,"assistant",x,"{}",i),await o.compactHistory(r.id,30),x}async function*nn(t,e,a,r,s,n){var d;const i=new Q(e),o=(d=t.metadata)==null?void 0:d.thread_id,l=await i.buildContext(r.id),c=ea(t.text,l);if(yield{type:"thinking",data:{threadId:o,provider:a.name}},c.agent!=="conversation"){yield*sn(t,e,a,r,s,n);return}try{const m=await Or(t,e,a,r,l,s,o),g=50;for(let w=0;w<m.length;w+=g)yield{type:"chunk",data:{text:m.substring(w,w+g),threadId:o}},w+g<m.length&&await new Promise(f=>setTimeout(f,10))}catch(m){yield{type:"error",data:{error:m.message||"An error occurred",threadId:o}};return}yield{type:"done",data:{threadId:o,provider:a.name,tokenCount:0}}}const ae=new ke;async function on(t,e){var s;const a=(s=t.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!a)return t.json({error:"Authentication required"},401);const r=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return t.json({error:"Invalid session"},401);t.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),t.set("sessionId",a),await e()}ae.use("/*",on);ae.get("/threads",async t=>{const e=t.get("user"),a=t.req.query("archived")==="1",r=parseInt(t.req.query("limit")||"30"),s=await t.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(e.id,a?1:0,r).all();return t.json({threads:s.results||[]})});ae.post("/threads",async t=>{const e=t.get("user"),{title:a}=await t.req.json(),r=await t.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(e.id,a||"New conversation").first();return t.json({thread:r})});ae.put("/threads/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),r=await t.req.json(),s=[],n=[];return r.title!==void 0&&(s.push("title = ?"),n.push(r.title)),r.is_archived!==void 0&&(s.push("is_archived = ?"),n.push(r.is_archived?1:0)),s.push("updated_at = CURRENT_TIMESTAMP"),n.push(a,e.id),s.length<=1?t.json({error:"Nothing to update"},400):(await t.env.DB.prepare(`UPDATE threads SET ${s.join(", ")} WHERE id = ? AND user_id = ?`).bind(...n).run(),t.json({success:!0}))});ae.delete("/threads/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(a,e.id).run(),await t.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});ae.post("/upload",async t=>{const e=t.get("user"),a=!!t.env.DOCUMENTS_BUCKET,r=a?100*1024*1024:700*1024;let s,n,i,o=null,l=null;try{if((t.req.header("Content-Type")||"").includes("multipart/form-data")){const v=(await t.req.formData()).get("file");if(!v)return t.json({error:"No file provided."},400);if(s=v.name,n=v.type||"application/octet-stream",i=v.size,i>r)return t.json({error:`File too large (max ${a?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);o=await v.arrayBuffer()}else{const T=await t.req.json();if(!T.file_name||!T.file_data)return t.json({error:"file_name and file_data are required."},400);if(s=T.file_name,n=T.file_type||"application/octet-stream",l=T.file_data,i=T.file_size||Math.round(l.length*.75),i>r)return t.json({error:`File too large (max ${a?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);if(a){const v=atob(l);o=new ArrayBuffer(v.length);const x=new Uint8Array(o);for(let E=0;E<v.length;E++)x[E]=v.charCodeAt(E)}}const d=crypto.randomUUID();let m;a&&o?(await t.env.DOCUMENTS_BUCKET.put(d,o,{httpMetadata:{contentType:n},customMetadata:{fileName:s,userId:String(e.id)}}),m="r2"):m=l||(o?Buffer.from(o).toString("base64"):""),await t.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(d,e.id,s,n,m,i).run();const g=n==="application/pdf"||s.toLowerCase().endsWith(".pdf"),w=n==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||s.toLowerCase().endsWith(".docx");if(w)try{const{extractDocxTextFromBuffer:T}=await Promise.resolve().then(()=>Ys),v=l?Buffer.from(l,"base64"):o?Buffer.from(o):null;if(v){const x=await T(v);x.length>50&&await t.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(x,d).run()}}catch{}if(g&&e.pin_hash){const T=l||(o?Buffer.from(o).toString("base64"):null),v=e.pin_hash,x=e.id,E=t.env.DB,O=t.env.DOCUMENTS_BUCKET,N=(async()=>{var P,W;try{let F=null,B="claude-haiku-4-5-20251001";const{decrypt:G}=await Promise.resolve().then(()=>Zt);for(const y of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const p=await E.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(x,y).first();if(p){const h=await G(p.encrypted_value,v),b=JSON.parse(h);if(b.provider==="anthropic"){F=b.apiKey,b.model&&(B=b.model);break}}}catch{}if(!F)return;let q;if(m==="r2"&&O){const y=await O.get(d);if(!y)return;q=Buffer.from(await y.arrayBuffer()).toString("base64")}else if(T)q=T;else return;const I=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":F,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:B,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:q}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!I.ok)return;const u=((W=(P=(await I.json()).content)==null?void 0:P[0])==null?void 0:W.text)||"";u&&await E.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(u,d).run()}catch{}})();try{t.executionCtx.waitUntil(N)}catch{}}let f="";if(n.startsWith("text/"))try{const T=l||(o?Buffer.from(o).toString("base64"):"");f=Buffer.from(T,"base64").toString("utf-8").substring(0,500)}catch{}return t.json({file_id:d,name:s,type:n,size:i,text_preview:f,storage:a?"r2":"d1",extracting:g&&!w})}catch(c){console.error("File upload error:",c);try{const{logError:d}=await Promise.resolve().then(()=>Ve);await d(t.env.DB,e.id,"upload","upload_error",c.message||"Unknown upload error")}catch{}return t.json({error:`Upload failed: ${c.message||"Unknown error"}`},500)}});ae.post("/send",async t=>{const e=t.get("user"),{message:a,channel:r="web",thread_id:s,files:n}=await t.req.json();if(!a||typeof a!="string"||a.trim().length===0)return t.json({error:"Message is required"},400);let i="";if(n&&Array.isArray(n)&&n.length>0){i=`

[Attached files:
`;for(const c of n)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=s;if(!o){const c=await t.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(e.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:e.id,username:e.username,channel:r,text:a.trim()+i,sessionId:t.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await bt(t.env.DB,e.id,e.pin_hash),m=await ra(l,t.env.DB,c,e,d,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:t.env.DOCUMENTS_BUCKET});return!s&&o?await t.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run():o&&await t.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),t.json({response:m,timestamp:new Date().toISOString(),channel:l.channel,provider:c.name,thread_id:o})}catch(c){console.error("Chat error:",c);const d=c.message||"";if(d.includes("No LLM provider configured"))return t.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400);if(d.includes("All LLM providers failed"))return t.json({error:d,type:"no_provider",thread_id:o},400);if(d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests"))return t.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429);const m=d.includes("401")||d.includes("403")||d.includes("authentication")||d.includes("credit balance")||d.includes("invalid")&&d.includes("key");try{const{logError:g}=await Promise.resolve().then(()=>Ve);await g(t.env.DB,e.id,"llm","chat_error",d)}catch{}return t.json({error:m?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:d,type:m?"no_provider":void 0,thread_id:o},m?400:500)}});function wa(t){return`event: ${t.type}
data: ${JSON.stringify(t.data)}

`}ae.post("/stream",async t=>{const e=t.get("user"),{message:a,channel:r="web",thread_id:s,files:n}=await t.req.json();if(!a||typeof a!="string"||a.trim().length===0)return t.json({error:"Message is required"},400);let i="";if(n&&Array.isArray(n)&&n.length>0){i=`

[Attached files:
`;for(const c of n)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=s;if(!o){const c=await t.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(e.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:e.id,username:e.username,channel:r,text:a.trim()+i,sessionId:t.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await bt(t.env.DB,e.id,e.pin_hash),m=new ReadableStream({async start(g){const w=new TextEncoder;try{const f=nn(l,t.env.DB,c,e,d,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:t.env.DOCUMENTS_BUCKET});for await(const T of f)T.data.threadId||(T.data.threadId=o),g.enqueue(w.encode(wa(T)));o&&await t.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),g.close()}catch(f){const T={type:"error",data:{error:f.message||"An error occurred",threadId:o}};g.enqueue(w.encode(wa(T))),g.close()}}});return new Response(m,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(o||"")}})}catch(c){console.error("Stream setup error:",c);const d=c.message||"";return d.includes("No LLM provider configured")?t.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400):d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests")?t.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429):t.json({error:"Something went wrong setting up the stream.",details:d,thread_id:o},500)}});ae.get("/threads/:id/messages",async t=>{var n;const e=t.get("user"),a=parseInt(t.req.param("id")),r=parseInt(t.req.query("limit")||"50"),s=await t.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(e.id,a,r).all();return t.json({messages:(s.results||[]).reverse(),total:((n=s.results)==null?void 0:n.length)||0})});ae.get("/history",async t=>{var l;const e=t.get("user"),a=parseInt(t.req.query("limit")||"50"),r=parseInt(t.req.query("offset")||"0"),s=t.req.query("thread_id");let n,i;s?(n=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[e.id,parseInt(s),a,r]):(n=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[e.id,a,r]);const o=await t.env.DB.prepare(n).bind(...i).all();return t.json({messages:(o.results||[]).reverse(),total:((l=o.results)==null?void 0:l.length)||0})});ae.delete("/history",async t=>{const e=t.get("user"),a=t.req.query("thread_id");return a?await t.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(e.id,parseInt(a)).run():await t.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(e.id).run(),t.json({success:!0})});ae.get("/dashboard",async t=>{const e=t.get("user"),[a,r,s,n,i,o,l]=await Promise.all([t.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(e.id).first().catch(()=>null),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(e.id).first().catch(()=>null),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(e.id).first().catch(()=>null),t.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(e.id).all().catch(()=>({results:[]})),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(e.id).first().catch(()=>null),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(e.id).first().catch(()=>null),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM user_skills WHERE user_id = ? AND enabled = 1").bind(e.id).first().catch(()=>null)]);return t.json({threads:(a==null?void 0:a.cnt)||0,active_schedules:(r==null?void 0:r.cnt)||0,memories:(s==null?void 0:s.cnt)||0,recent_threads:n.results||[],provider_usage:[],unread_notifications:(i==null?void 0:i.cnt)||0,errors:(o==null?void 0:o.cnt)||0,skills_count:(l==null?void 0:l.cnt)||0})});ae.get("/gmail/unread",async t=>{const e=t.get("user");try{const a=t.env.GOOGLE_CLIENT_ID,r=t.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return t.json({count:null,reason:"google_not_configured"});const n=await new we(t.env.DB,e.id,e.pin_hash,a,r).getUnreadCount();return t.json({count:n})}catch(a){return t.json({count:null,reason:a.message})}});ae.get("/providers",async t=>t.json({stats:[],statusText:"Provider rotation active (in-memory)."}));ae.get("/notifications/count",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(e.id).first();return t.json({count:(a==null?void 0:a.cnt)||0})});ae.get("/notifications",async t=>{const e=t.get("user"),a=parseInt(t.req.query("limit")||"20"),r=await t.env.DB.prepare(`SELECT id, type, title, body, is_read, source, action_url, created_at 
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(e.id,a).all();return t.json({notifications:r.results||[]})});ae.put("/notifications/:id/read",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});ae.put("/notifications/read-all",async t=>{const e=t.get("user");return await t.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(e.id).run(),t.json({success:!0})});ae.delete("/notifications/all",async t=>{const e=t.get("user");return await t.env.DB.prepare("DELETE FROM notifications WHERE user_id = ?").bind(e.id).run(),t.json({success:!0})});ae.delete("/notifications/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});ae.delete("/notifications",async t=>{const e=t.get("user");return await t.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(e.id).run(),t.json({success:!0})});const V=new ke;async function ln(t,e){var s;const a=(s=t.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!a)return t.json({error:"Authentication required"},401);const r=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return t.json({error:"Invalid session"},401);t.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),await e()}V.use("/*",ln);V.get("/profile",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(e.id).first();return t.json({id:e.id,username:e.username,name:(a==null?void 0:a.name)||e.name,role:(a==null?void 0:a.role)||e.role,personality_prompt:(a==null?void 0:a.personality_prompt)||e.personality_prompt,telegram_chat_id:(a==null?void 0:a.telegram_chat_id)||e.telegram_chat_id,timezone:(a==null?void 0:a.timezone)||e.timezone,assistant_name:(a==null?void 0:a.assistant_name)||"Karna"})});V.put("/profile",async t=>{const e=t.get("user"),a=await t.req.json(),r=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],s=[],n=[];for(const i of r)a[i]!==void 0&&(s.push(`${i} = ?`),n.push(a[i]));return s.length===0?t.json({error:"No valid fields to update"},400):(s.push("updated_at = CURRENT_TIMESTAMP"),n.push(e.id),await t.env.DB.prepare(`UPDATE users SET ${s.join(", ")} WHERE id = ?`).bind(...n).run(),t.json({success:!0}))});const Yt=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","perplexity_api_key","browser_use_api_key"];V.get("/credentials",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT id, service, label, encrypted_value, created_at, updated_at FROM credentials WHERE user_id = ?").bind(e.id).all(),r=["llm_slot_1","llm_slot_2","llm_slot_3"],s=await Promise.all((a.results||[]).map(async n=>{let i;if(r.includes(n.service))try{const o=await J(n.encrypted_value,e.pin_hash);i=JSON.parse(o).provider}catch{}return{id:n.id,service:n.service,label:n.label,created_at:n.created_at,updated_at:n.updated_at,configured:!0,...i?{provider_id:i}:{}}}));return t.json({credentials:s,available_services:Yt,llm_providers:mt})});V.put("/credentials",async t=>{const e=t.get("user"),{service:a,value:r,label:s}=await t.req.json();if(!a||!r)return t.json({error:"Service name and value are required"},400);if(!Yt.includes(a))return t.json({error:`Invalid service. Must be one of: ${Yt.join(", ")}`},400);const n=await Ct(r,e.pin_hash);return await t.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(e.id,a,s||a,n).run(),t.json({success:!0,service:a})});V.delete("/credentials/:service",async t=>{const e=t.get("user"),a=t.req.param("service");return await t.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(e.id,a).run(),t.json({success:!0})});V.get("/memory",async t=>{const e=t.get("user"),a=t.req.query("type"),s=await new Q(t.env.DB).getAll(e.id,a||void 0,100);return t.json({memories:s})});V.post("/memory",async t=>{const e=t.get("user"),{type:a,title:r,content:s,importance:n}=await t.req.json();return!a||!r||!s?t.json({error:"Type, title, and content are required"},400):(await new Q(t.env.DB).store(e.id,a,r,s,n||5),t.json({success:!0}))});V.delete("/memory/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await new Q(t.env.DB).remove(a,e.id),t.json({success:!0})});V.get("/preferences",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT id, content, created_at FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(e.id).all();return t.json({preferences:a.results||[]})});V.post("/preferences",async t=>{const e=t.get("user"),{content:a}=await t.req.json();return a!=null&&a.trim()?(await t.env.DB.prepare("INSERT INTO preferences (user_id, content) VALUES (?, ?)").bind(e.id,a.trim()).run(),t.json({success:!0})):t.json({error:"Content required"},400)});V.put("/preferences/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),{content:r}=await t.req.json();return r!=null&&r.trim()?(await t.env.DB.prepare("UPDATE preferences SET content = ? WHERE id = ? AND user_id = ?").bind(r.trim(),a,e.id).run(),t.json({success:!0})):t.json({error:"Content required"},400)});V.delete("/preferences/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM preferences WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});V.get("/schedules",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(e.id).all();return t.json({schedules:a.results||[]})});V.put("/schedules/:id/toggle",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),{enabled:r}=await t.req.json();return await t.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r?1:0,a,e.id).run(),t.json({success:!0})});V.delete("/schedules/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});V.get("/errors",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(e.id).all();return t.json({errors:a.results||[]})});V.delete("/errors",async t=>{const e=t.get("user");return await t.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(e.id).run(),t.json({success:!0})});V.post("/credentials/validate",async t=>{const e=t.get("user"),{service:a,value:r}=await t.req.json();if(!a)return t.json({error:"Service required"},400);let s=r;if(!s){const n=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(e.id,a).first();if(!n)return t.json({valid:!1,message:"No credential saved for this slot."});try{s=await J(n.encrypted_value,e.pin_hash)}catch{return t.json({valid:!1,message:"Failed to decrypt stored credential."})}}switch(a){case"anthropic":try{const n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":s,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return n.ok?t.json({valid:!0,message:"Anthropic API key is valid."}):n.status===401?t.json({valid:!1,message:"Invalid Anthropic API key."}):t.json({valid:!1,message:`Anthropic responded with status ${n.status}.`})}catch(n){return t.json({valid:!1,message:`Connection failed: ${n.message}`})}case"openai":try{const n=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${s}`}});return n.ok?t.json({valid:!0,message:"OpenAI API key is valid."}):n.status===401?t.json({valid:!1,message:"Invalid OpenAI API key."}):t.json({valid:!1,message:`OpenAI responded with status ${n.status}.`})}catch(n){return t.json({valid:!1,message:`Connection failed: ${n.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const n=JSON.parse(s);if(!n.provider||!n.apiKey)return t.json({valid:!1,message:"Missing provider or API key."});const i=mt[n.provider];if(!i)return t.json({valid:!1,message:`Unknown provider: ${n.provider}`});if(i.apiFormat==="anthropic"){const o=await fetch(i.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":n.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return o.ok?t.json({valid:!0,message:`${i.label} API key is valid.`}):o.status===401?t.json({valid:!1,message:`Invalid ${i.label} API key.`}):t.json({valid:!1,message:`${i.label} responded with status ${o.status}.`})}else{const o=i.apiBase+(i.validatePath||"/v1/models"),l=await fetch(o,{headers:{Authorization:`Bearer ${n.apiKey}`}});if(l.ok)return t.json({valid:!0,message:`${i.label} API key is valid.`});if(l.status===401||l.status===403)return t.json({valid:!1,message:`Invalid ${i.label} API key.`});if(l.status===404)try{const c=await fetch(i.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.apiKey}`},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return c.ok||c.status===200?t.json({valid:!0,message:`${i.label} API key is valid.`}):c.status===401||c.status===403?t.json({valid:!1,message:`Invalid ${i.label} API key.`}):t.json({valid:!1,message:`${i.label} responded with status ${c.status}.`})}catch(c){return t.json({valid:!1,message:`${i.label} chat test failed: ${c.message}`})}return t.json({valid:!1,message:`${i.label} responded with status ${l.status}.`})}}catch(n){return n instanceof SyntaxError?t.json({valid:!1,message:"Invalid slot data format."}):t.json({valid:!1,message:`Connection failed: ${n.message}`})}case"google_oauth_client":return t.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});case"perplexity_api_key":try{const n=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar",messages:[{role:"user",content:"test"}],max_tokens:1})});return n.ok||n.status===400?t.json({valid:!0,message:"Perplexity API key is valid."}):n.status===401?t.json({valid:!1,message:"Invalid Perplexity API key."}):t.json({valid:!1,message:`Perplexity responded with status ${n.status}.`})}catch(n){return t.json({valid:!1,message:`Connection failed: ${n.message}`})}default:return t.json({valid:!0,message:"Saved (validation not available for this service)."})}});V.get("/google/status",async t=>{const e=t.get("user");try{const a=await Xt(t.env.DB,e.id,e.pin_hash),r=ar(t.env.GOOGLE_CLIENT_ID,t.env.GOOGLE_CLIENT_SECRET);return t.json({...a,oauth_client_configured:r})}catch(a){return t.json({connected:!1,error:a.message})}});V.get("/google/auth-url",async t=>{var e;t.get("user");try{const a=t.env.GOOGLE_CLIENT_ID,r=t.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return t.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const s=new URL(t.req.url),n=`${s.protocol}//${s.host}/auth/google/callback`,i=btoa(JSON.stringify({sessionId:(e=t.req.header("Authorization"))==null?void 0:e.replace("Bearer ",""),ts:Date.now()})),o=Qa(a,n,i);return t.json({auth_url:o,redirect_uri:n})}catch(a){return t.json({error:`Failed to generate auth URL: ${a.message}`},500)}});V.post("/google/disconnect",async t=>{const e=t.get("user");try{return await sr(t.env.DB,e.id),t.json({success:!0,message:"Google account disconnected."})}catch(a){return t.json({error:a.message},500)}});V.post("/google/test",async t=>{const e=t.get("user");try{const{token:a,email:r}=await st(t.env.DB,e.id,e.pin_hash,t.env.GOOGLE_CLIENT_ID,t.env.GOOGLE_CLIENT_SECRET),s=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${a}`}}),n=!0,i=s.ok;return t.json({success:!0,email:r,scopes:{sheets:n,calendar:i,docs:n,drive:n},message:i?`Connected as ${r} — all services working.`:`Connected as ${r} — calendar access issue (${s.status}).`})}catch(a){return t.json({success:!1,error:a.message})}});V.get("/site-vault",async t=>{const e=t.get("user");try{const a=await t.env.DB.prepare("SELECT id, name, created_at, updated_at FROM site_credentials WHERE user_id = ? ORDER BY name ASC").bind(e.id).all();return t.json({entries:a.results||[]})}catch{return t.json({entries:[]})}});V.put("/site-vault",async t=>{const e=t.get("user"),{name:a,username:r,password:s,notes:n}=await t.req.json();if(!(a!=null&&a.trim())||!(r!=null&&r.trim())||!(s!=null&&s.trim()))return t.json({error:"name, username, and password are required"},400);const i=JSON.stringify({username:r.trim(),password:s,...n?{notes:n}:{}}),o=await Ct(i,e.pin_hash);return await t.env.DB.prepare(`INSERT INTO site_credentials (user_id, name, encrypted_blob)
     VALUES (?, ?, ?)
     ON CONFLICT(user_id, name) DO UPDATE SET
       encrypted_blob = excluded.encrypted_blob,
       updated_at = CURRENT_TIMESTAMP`).bind(e.id,a.trim(),o).run(),t.json({success:!0,name:a.trim()})});V.delete("/site-vault/:id",async t=>{const e=t.get("user"),a=Number(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM site_credentials WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});const Se=new ke;Se.get("/debug/time",t=>{const e=new Date,a=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return t.json({utc_iso:e.toISOString(),utc_ms:e.getTime(),formatted_ist:a.format(e),toLocaleString_ist:e.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});Se.get("/health",async t=>{try{const e=Date.now();await t.env.DB.prepare("SELECT 1").first();const a=Date.now()-e;return t.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:a,version:"3.1.0"})}catch{return t.json({status:"error",error:"Database unreachable"},500)}});Se.post("/heartbeat",async t=>{try{const e=Date.now();await t.env.DB.prepare("SELECT 1").first();const a=Date.now()-e;return t.json({status:"ok",latency_ms:a})}catch(e){return t.json({status:"error",error:e.message},500)}});Se.get("/status",async t=>{var l;const e=(l=t.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const r=a.user_id,[s,n,i,o]=await Promise.all([t.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first()]);return t.json({active_schedules:(s==null?void 0:s.cnt)||0,memory_entries:(n==null?void 0:n.cnt)||0,total_messages:(i==null?void 0:i.cnt)||0,unread_errors:(o==null?void 0:o.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});async function cn(t,e,a,r){try{const s=await t.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(e).first();if(!s)return;const n=await J(s.encrypted_value,s.pin_hash),i=4e3,o=r.length>i?r.substring(0,i-3)+"...":r;(await fetch(`https://api.telegram.org/bot${n}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:o,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${n}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:o})})}catch{}}function ba(t){const e=new Date().toLocaleString("en-US",{timeZone:t});return new Date(e)}Se.post("/cron/execute",async t=>{const e=t.req.header("X-Cron-Secret")||"",a=t.env.CRON_SECRET||"karna-cron-default-v1";if(e!==a)return t.json({error:"Unauthorized"},401);const r=new Date,s=r.toISOString();try{await t.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:s})).run()}catch{}const n=await t.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(s).all(),i=[];for(const o of n.results||[])try{await t.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(s,o.id).run();const l=o.user_timezone||"UTC";let c,d=!1,m=o.state||"active";if(o.schedule_type==="interval"){const f=parseInt(o.schedule_value,10);c=new Date(r.getTime()+f*60*1e3)}else if(o.schedule_type==="daily"){const[f,T]=o.schedule_value.split(":").map(Number),v=ba(l),x=new Date(v);x.setHours(f,T,0,0),x<=v&&x.setDate(x.getDate()+1);const E=new Date(x.toLocaleString("en-US",{timeZone:"UTC"})),O=new Date(x.toLocaleString("en-US",{timeZone:l})),N=E.getTime()-O.getTime();c=new Date(x.getTime()+N)}else if(o.schedule_type==="weekly"){const[f,T]=o.schedule_value.split(" "),[v,x]=(T||"00:00").split(":").map(Number),O=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(q=>q.toLowerCase()===f.toLowerCase()),N=ba(l),P=new Date(N);P.setHours(v,x,0,0);let W=(O-P.getDay()+7)%7;W===0&&P<=N&&(W=7),P.setDate(P.getDate()+W);const F=new Date(P.toLocaleString("en-US",{timeZone:"UTC"})),B=new Date(P.toLocaleString("en-US",{timeZone:l})),G=F.getTime()-B.getTime();c=new Date(P.getTime()+G)}else o.schedule_type==="once"?(d=!0,m="completed",c=new Date(r.getTime()+365*24*60*60*1e3)):c=new Date(r.getTime()+3600*1e3);await t.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,c.toISOString(),d?0:o.enabled,m,o.id).run();const w=(JSON.parse(o.action_config||"{}").description||o.description)&&(o.action_type==="check_mail"||o.action_type==="check_calendar"||o.action_type==="check_sheet"||o.action_type==="custom");i.push({job_id:o.id,name:o.name,status:"dispatched",needs_agent:w,next_run:c.toISOString()})}catch(l){i.push({job_id:o.id,name:o.name,status:"error",error:l.message})}try{const{MemoryService:o}=await Promise.resolve().then(()=>Os),l=await t.env.DB.prepare("SELECT id FROM users").all();for(const c of l.results||[])await new o(t.env.DB).cleanupDoneTasks(c.id)}catch{}return t.json({executed:i.length,results:i,timestamp:s})});Se.post("/cron/run-task/:jobId",async t=>{const e=t.req.header("X-Cron-Secret")||"",a=t.env.CRON_SECRET||"karna-cron-default-v1";if(e!==a)return t.json({error:"Unauthorized"},401);const r=parseInt(t.req.param("jobId"),10);if(!r)return t.json({error:"Invalid job ID"},400);const s=await t.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(r).first();if(!s)return t.json({error:"Job not found"},404);const i=JSON.parse(s.action_config||"{}").description||s.description||"",o="⏰ "+(s.name||"Scheduled Task"),l=new Date().toISOString();let c="";const d=s.action_type==="reminder",m=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!d&&s.action_type==="custom"&&m.test(i),d)c=i||s.name||"Time for your scheduled task.";else try{const T={id:s.user_id,username:s.username||"user",name:s.user_name||"User",pin_hash:s.pin_hash||"",role:s.user_role||"",personality_prompt:s.personality_prompt||"",telegram_chat_id:s.telegram_chat_id||"",timezone:s.user_timezone||"UTC",assistant_name:s.assistant_name||"Karna",created_at:"",updated_at:""},v={userId:s.user_id,username:T.username,channel:"cron",text:dn(s.name,i,s.action_type),sessionId:"cron-"+s.id,timestamp:l},{provider:x,rotation:E}=await bt(t.env.DB,s.user_id,s.pin_hash);c=await ra(v,t.env.DB,x,T,E,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID})}catch(T){const v=T.message||"unknown error",x=v.includes("rate_limit")||v.includes("429")||v.includes("quota"),E=v.includes("timeout")||v.includes("Timeout");x?c="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":E?c="Task timed out. Will retry at next scheduled time.":c="Task encountered an error. Will retry at next scheduled time.",await j(t.env.DB,s.user_id,"cron_agent","execution_error",v,{job_id:s.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(s.action_type))try{const T=await t.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(s.user_id).first();(!T||T.cnt===0)&&await j(t.env.DB,s.user_id,"cron_verification","no_tools_called",`Cron job "${s.name}" (${s.action_type}) completed without any tool calls`,{job_id:s.id,action_type:s.action_type,response_preview:c.substring(0,200)})}catch{}let w=c||i||"Time for your scheduled task.";w=w.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const f=o+`
`+w;return await t.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(s.user_id,"reminder",o,w,"cron:"+s.id).run(),d&&await t.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(s.user_id,"system","assistant",f,JSON.stringify({type:"cron",job_id:s.id})).run(),s.telegram_chat_id&&await cn(t.env.DB,s.user_id,s.telegram_chat_id,f),t.json({job_id:r,status:"completed",response_length:c.length})});async function Cr(t){var r;const e=(r=t.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!e)return null;const a=await t.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(e).first();return(a==null?void 0:a.user_id)||null}Se.get("/health/tools",async t=>{var a;const e=await Cr(t);if(!e)return t.json({error:"Not authenticated"},401);try{const r=await t.env.DB.prepare(`SELECT tool_name,
              COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) as failures,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name != '__enforcement_trigger'
       GROUP BY tool_name
       ORDER BY total DESC`).bind(e).all(),s=await t.env.DB.prepare(`SELECT agent_type, provider_name, COUNT(*) as triggers,
              SUM(CASE WHEN was_enforcement_retry = 1 THEN 1 ELSE 0 END) as retries_that_worked
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name = '__enforcement_trigger'
       GROUP BY agent_type, provider_name`).bind(e).all(),n=await t.env.DB.prepare(`SELECT COUNT(*) as total_retries,
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
       ORDER BY calls DESC`).bind(e).all();return t.json({period:"last_24h",tool_stats:r.results,enforcement:{triggers:s.results,retry_results:((a=n.results)==null?void 0:a[0])||{total_retries:0,successful_retries:0}},cron:{executions:i.results,warnings:o.results},providers:l.results})}catch(r){return t.json({error:r.message||"Failed to fetch metrics"},500)}});Se.get("/health/tools/recent",async t=>{const e=await Cr(t);if(!e)return t.json({error:"Not authenticated"},401);try{const a=await t.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
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
- Example: "Couldn't retrieve Amazon order status — requires login."`;function dn(t,e,a){return a==="reminder"?`[Scheduled Reminder] "${t}": ${e||"Time for your reminder."}`:a==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
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
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${ct}`:`[Scheduled task "${t}"]: ${e||"Execute this scheduled task."}${ct}`}function un(t,e,a,r){return{userId:t,username:e,channel:"telegram",text:a,sessionId:`telegram-${r}`,timestamp:new Date().toISOString()}}function mn(t,e){return t.replace(/\*\*(.*?)\*\*/gs,"*$1*").replace(/^#{1,3}\s+(.+)$/gm,"*$1*").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const _t=new ke,pn=4e3;async function te(t,e,a,r="Markdown",s,n){var c,d;const i=gn(a,pn),o=[];let l=!0;for(let m=0;m<i.length;m++){const g=i[m];let w=!1,f="";for(let T=0;T<3;T++)try{const v=await fetch(`https://api.telegram.org/bot${t}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e,text:g,parse_mode:r,disable_web_page_preview:!1})});if(v.ok){w=!0;break}const x=await v.json().catch(()=>null);if(f=`HTTP ${v.status}: ${(x==null?void 0:x.description)||"Unknown error"}`,(c=x==null?void 0:x.description)!=null&&c.includes("parse")||(d=x==null?void 0:x.description)!=null&&d.includes("entities")){if((await fetch(`https://api.telegram.org/bot${t}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e,text:g})})).ok){w=!0;break}f+=" (plain-text retry also failed)"}if(v.status===429||v.status>=500){const E=Math.pow(2,T)*1e3;await new Promise(O=>setTimeout(O,E));continue}break}catch(v){if(f=`Network error: ${v.message}`,T<2){const x=Math.pow(2,T)*1e3;await new Promise(E=>setTimeout(E,x));continue}}w||(l=!1,o.push(`Chunk ${m+1}/${i.length}: ${f}`))}if(!l&&s&&n&&o.length>0)try{const{logError:m}=await Promise.resolve().then(()=>Ve);await m(s,n,"telegram","send_failed",o.join(" | "))}catch{}return{success:l,errors:o}}async function hn(t,e){try{await fetch(`https://api.telegram.org/bot${t}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e,action:"typing"})})}catch{}}function gn(t,e){if(t.length<=e)return[t];const a=[];let r=t;for(;r.length>0;){if(r.length<=e){a.push(r);break}let s=r.lastIndexOf(`
`,e);s<e*.3&&(s=r.lastIndexOf(" ",e)),s<e*.3&&(s=e),a.push(r.substring(0,s)),r=r.substring(s).trimStart()}return a}async function fn(t,e,a,r,s){switch(t.split("@")[0].toLowerCase()){case"/start":{const i=(r==null?void 0:r.name)||"there",o=(r==null?void 0:r.assistant_name)||"Karna",l=`👋 *Hello, ${i}!*

I'm ${o}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/tasks — Show open tasks
/new — Start a fresh conversation

Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.`+(r?"":`

⚠️ Your Telegram chat ID is *${e}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`),c=await te(a,e,l,"Markdown",s,r==null?void 0:r.id);return!c.success&&c.errors.length>0&&console.warn(`[/start] Failed to send message: ${c.errors.join(" | ")}`),!0}case"/help":{const o=`🛠 *${(r==null?void 0:r.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`,l=await te(a,e,o,"Markdown",s,r==null?void 0:r.id);return!l.success&&l.errors.length>0&&console.warn(`[/help] Failed to send message: ${l.errors.join(" | ")}`),!0}case"/status":{if(!r){const i=await te(a,e,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app.","Markdown",s);return i.success||console.warn(`[/status] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const[i,o,l,c]=await Promise.all([s.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r.id).first(),s.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r.id).first(),s.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(r.id).first(),s.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(r.id).first()]),d=`📊 *System Status*

Active tasks: ${(i==null?void 0:i.cnt)||0}
Memories: ${(o==null?void 0:o.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(c==null?void 0:c.cnt)||0}

Status: ✅ Online`,m=await te(a,e,d,"Markdown",s,r.id);m.success||console.warn(`[/status] Failed to send message: ${m.errors.join(" | ")}`)}catch{const o=await te(a,e,"✅ Online — but had trouble fetching stats.","Markdown",s,r==null?void 0:r.id);o.success||console.warn(`[/status error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/new":{if(!r){const o=await te(a,e,"⚠️ Account not linked.","Markdown",s);return o.success||console.warn(`[/new] Failed to send message: ${o.errors.join(" | ")}`),!0}await s.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(r.id).run();const i=await te(a,e,"🆕 Starting fresh conversation. Your next message begins a new thread.","Markdown",s,r.id);return i.success||console.warn(`[/new] Failed to send message: ${i.errors.join(" | ")}`),!0}case"/tasks":case"/task":{if(!r){const i=await te(a,e,"⚠️ Account not linked.","Markdown",s);return i.success||console.warn(`[/tasks] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await s.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(r.id).all()).results||[];if(o.length===0){const f=await te(a,e,"✅ No open tasks. You're all clear.","Markdown",s,r.id);return f.success||console.warn(`[/tasks] Failed to send message: ${f.errors.join(" | ")}`),!0}const l=new Date,c=l.toISOString().slice(0,10),d=new Date(l);d.setDate(d.getDate()+1);const m=d.toISOString().slice(0,10),g=[`📋 *Open Tasks (${o.length})*
`];for(const f of o){let T="";if(f.due_date){const v=f.due_date.slice(0,10);v<c?T=" ⚠️ _overdue_":v===c?T=" 🔴 _due today_":v===m?T=" 🟡 _due tomorrow_":T=` _${new Date(f.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}g.push(`☐ ${f.title}${T}`)}g.push(`
_Say "mark [task] as done" to close a task._`);const w=await te(a,e,g.join(`
`),"Markdown",s,r.id);w.success||console.warn(`[/tasks] Failed to send message: ${w.errors.join(" | ")}`)}catch(i){const o=await te(a,e,"❌ Could not fetch tasks: "+i.message,"Markdown",s,r==null?void 0:r.id);o.success||console.warn(`[/tasks error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}default:return!1}}_t.post("/webhook",async t=>{let e;try{e=await t.req.json()}catch{return t.json({ok:!0})}const a=t.env.DB,r={GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID},s=async()=>{var n,i,o,l,c;try{if(e.callback_query){await yn(a,e.callback_query);return}const d=e.message;if(!d)return;const m=!!d.text,g=!!d.voice,w=!!d.document,f=!!d.photo,T=!!d.caption;if(!m&&!g&&!w&&!f)return;const v=String(d.chat.id);let x=d.text||"";const E=await a.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(v).first();let O=null;if(E){const I=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(E.id,"telegram_bot_token").first();I&&(O=await J(I.encrypted_value,E.pin_hash))}if(!O){const I=await a.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();I&&(O=await J(I.encrypted_value,I.pin_hash))}if(!O||x.startsWith("/")&&await fn(x,v,O,E,a))return;if(!E){const I=await te(O,v,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${v}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`,"Markdown",a);I.success||console.warn(`Failed to send unlinked account message: ${I.errors.join(" | ")}`);return}if(d.voice&&O&&E)try{const I=await te(O,v,"🎤 Processing voice note...","Markdown",a,E.id);I.success||console.warn(`[voice start] Failed to send message: ${I.errors.join(" | ")}`);const u=await(await fetch(`https://api.telegram.org/bot${O}/getFile?file_id=${d.voice.file_id}`)).json();if(u.ok&&((n=u.result)!=null&&n.file_path)){const p=await(await fetch(`https://api.telegram.org/file/bot${O}/${u.result.file_path}`)).blob();let h="",b="",k="whisper-1";const S=await t.env.DB.prepare("SELECT service, encrypted_value FROM credentials WHERE user_id = ? AND (service IN ('llm_slot_1', 'llm_slot_2', 'llm_slot_3', 'openai'))").bind(E.id).all();for(const M of S.results){const z=await J(M.encrypted_value,E.pin_hash);if(M.service==="openai"){h="https://api.openai.com/v1/audio/transcriptions",b=z;break}else if(M.service.startsWith("llm_slot_"))try{const Y=JSON.parse(z);if(Y.provider==="openai"){h="https://api.openai.com/v1/audio/transcriptions",b=Y.apiKey;break}else if(Y.provider==="groq"){h="https://api.groq.com/openai/v1/audio/transcriptions",b=Y.apiKey,k="whisper-large-v3";break}}catch{}}if(!h){const M=await te(O,v,"⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys).","Markdown",a,E.id);M.success||console.warn(`[voice no stt] Failed to send message: ${M.errors.join(" | ")}`);return}const D=new FormData;D.append("file",p,"voice.ogg"),D.append("model",k),D.append("language","en");const R=await fetch(h,{method:"POST",headers:{Authorization:`Bearer ${b}`},body:D});if(!R.ok){const M=await R.text(),z=await te(O,v,`⚠️ Transcription failed: ${R.status} ${M}`,"Markdown",a,E.id);z.success||console.warn(`[voice transcription error] Failed to send message: ${z.errors.join(" | ")}`);return}x=(await R.json()).text;const A=await te(O,v,`🗣️ *You said:* ${x}`,"Markdown",a,E.id);A.success||console.warn(`[voice transcript echo] Failed to send message: ${A.errors.join(" | ")}`)}}catch(I){const L=await te(O,v,`⚠️ Failed to process voice note: ${I.message}`,"Markdown",a,E==null?void 0:E.id);L.success||console.warn(`[voice processing error] Failed to send message: ${L.errors.join(" | ")}`);return}if((w||f)&&O&&E)try{let I,L="unknown",u="unknown",y=0;if(w)I=d.document.file_id,L=d.document.file_name||"document",u=d.document.mime_type||"unknown",y=d.document.file_size||0;else if(f){const p=d.photo[d.photo.length-1];I=p.file_id,L="photo.jpg",u="image/jpeg",y=p.file_size||0}if(I){const h=await(await fetch(`https://api.telegram.org/bot${O}/getFile?file_id=${I}`)).json();let b="";if(h.ok&&((i=h.result)!=null&&i.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(L)||/^text\/|application\/json|application\/xml|application\/csv/i.test(u))&&y<5e4)try{b=await(await fetch(`https://api.telegram.org/file/bot${O}/${h.result.file_path}`)).text()}catch{}const k=d.caption||"",S=`[Telegram file received: "${L}" (${u}, ${Math.round(y/1024)}KB)]`;b?x=`${k?k+`

`:""}${S}
File contents:
${b.substring(0,8e3)}${b.length>8e3?`
[...truncated]`:""}`:x=`${k?k+`

`:""}${S}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(I){if(T&&d.caption)x=d.caption;else{const L=await te(O,v,`⚠️ Received your file but couldn't process it: ${I.message}`,"Markdown",a,E==null?void 0:E.id);L.success||console.warn(`[file processing error] Failed to send message: ${L.errors.join(" | ")}`);return}}if(!x)return;hn(O,v).catch(()=>{});let N=await a.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(E.id).first();N?await a.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(N.id).run():N={id:(await a.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(E.id).run()).meta.last_row_id};const P=un(E.id,E.username,x,v);P.metadata={thread_id:N.id};let W,F;try{const I=await bt(a,E.id,E.pin_hash);W=I.provider,F=I.rotation}catch(I){console.error("Telegram provider setup error:",I);const L=(o=I.message)!=null&&o.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(l=I.message)!=null&&l.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${I.message||"Unknown error"}`,u=await te(O,v,L,"Markdown",a,E.id);u.success||console.warn(`[provider error] Failed to send message: ${u.errors.join(" | ")}`);return}const{classifyIntentFast:B}=await Promise.resolve().then(()=>Vs);if(B(x).agent==="multi"){const I=await te(O,v,"🔍 On it…","Markdown",a,E.id);I.success||console.warn(`[ack] Failed to send: ${I.errors.join(" | ")}`)}const G=9e4;let q=!1;try{const I=await Promise.race([ra(P,a,W,E,F,r),new Promise((y,p)=>setTimeout(()=>p(new Error("TELEGRAM_TIMEOUT")),G))]),L=mn(I,"telegram"),u=await te(O,v,L||"(empty response)","Markdown",a,E.id);if(q=u.success,!u.success){console.error(`[CRITICAL] Agent response failed to send to Telegram for user ${E.id}:`,u.errors);try{const{logError:y}=await Promise.resolve().then(()=>Ve);await y(a,E.id,"telegram","response_send_failed",`Failed to deliver response: ${u.errors.join(" | ")}`)}catch{}}}catch(I){console.error("Telegram agent error:",I);const L=I.message==="TELEGRAM_TIMEOUT",u=L?`⏱️ This took longer than Telegram allows (25s limit).

For long essays, please use the web app — it handles long generation without time limits.`:(c=I.message)!=null&&c.includes("API error")?`⚠️ AI provider returned an error. The provider (${W.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(I.message||"Unknown").substring(0,200)}`,y=await te(O,v,u,"Markdown",a,E.id);q=y.success,y.success||console.error(`[CRITICAL] Error message failed to send to Telegram for user ${E.id}:`,y.errors);try{const{logError:p}=await Promise.resolve().then(()=>Ve);await p(a,E.id,"telegram",L?"timeout":"agent_error",I.message||"Agent error",{provider:W.name})}catch{}}}catch(d){console.error("Telegram webhook error:",d);try{const{logError:m}=await Promise.resolve().then(()=>Ve);await m(a,null,"telegram","webhook_error",d.message||"Unknown telegram error")}catch{}}};return t.executionCtx.waitUntil(s()),t.json({ok:!0})});_t.post("/setup-webhook",async t=>{var l;const e=(l=t.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const{webhook_url:r}=await t.req.json(),s=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!s)return t.json({error:"Telegram bot token not configured in Settings"},400);const n=await J(s.encrypted_value,a.pin_hash);if(!r){const d=await(await fetch(`https://api.telegram.org/bot${n}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return t.json(d)}const o=await(await fetch(`https://api.telegram.org/bot${n}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r,allowed_updates:["message"],drop_pending_updates:!1})})).json();return t.json(o)});_t.get("/webhook-status",async t=>{var n,i,o,l,c,d;const e=(n=t.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const r=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return t.json({configured:!1,error:"Bot token not set"});const s=await J(r.encrypted_value,a.pin_hash);try{const g=await(await fetch(`https://api.telegram.org/bot${s}/getWebhookInfo`)).json();return t.json({configured:!0,webhook_url:((i=g.result)==null?void 0:i.url)||"",has_webhook:!!((o=g.result)!=null&&o.url),pending_updates:((l=g.result)==null?void 0:l.pending_update_count)||0,last_error:((c=g.result)==null?void 0:c.last_error_message)||"",last_error_date:((d=g.result)==null?void 0:d.last_error_date)||null})}catch(m){return t.json({configured:!0,error:m.message})}});_t.post("/detect-chat-id",async t=>{var n,i;const e=(n=t.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const r=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return t.json({error:"Bot token not configured"},400);const s=await J(r.encrypted_value,a.pin_hash);try{const c=((i=(await(await fetch(`https://api.telegram.org/bot${s}/getWebhookInfo`)).json()).result)==null?void 0:i.url)||"";await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(v=>setTimeout(v,500));const m=await(await fetch(`https://api.telegram.org/bot${s}/getUpdates?limit=10&timeout=0`)).json();c&&await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:c,allowed_updates:["message"]})});const g=m.result||[];if(g.length===0)return t.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const w=[],f=new Set;for(let v=g.length-1;v>=0;v--){const x=g[v].message;if(x&&x.chat){const E=String(x.chat.id);f.has(E)||(f.add(E),w.push({chat_id:E,name:[x.chat.first_name,x.chat.last_name].filter(Boolean).join(" ")||x.chat.title||"Unknown",username:x.chat.username||"",date:new Date((x.date||0)*1e3).toISOString()}))}}if(w.length===0)return t.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const T=w[0].chat_id;return await t.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(T,a.user_id).run(),t.json({found:!0,chat_id:T,name:w[0].name,all_chats:w,message:`Chat ID ${T} detected and saved to your profile.`})}catch(o){return t.json({error:`Detection failed: ${o.message}`},500)}});async function yn(t,e){var T;const{id:a,data:r,message:s,from:n}=e;if(!r||!s)return;const i=r.split(":");if(i[0]!=="briefing_toggle"||i.length<3)return;const o=i[1],l=parseInt(i[2]);if(!l||!o)return;const c=String(s.chat.id),d=await t.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(c).first();if(!d)return;const m=await t.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(d.id,l,o).first();if(!m)return;const g=m.checked?0:1;await t.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(g,g,m.id).run();const w=await t.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(d.id).first();if(!w)return;const f=await J(w.encrypted_value,w.pin_hash);try{const v=await fetch(`https://api.telegram.org/bot${f}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:a,text:g?"✅ Checked!":"☐ Unchecked"})});v.ok||console.warn(`[callback answer] Failed to answer callback: HTTP ${v.status}`)}catch(v){console.warn(`[callback answer] Error answering callback: ${v.message}`)}if((T=s.reply_markup)!=null&&T.inline_keyboard){const v=s.reply_markup.inline_keyboard.map(x=>x.map(E=>{var O;if((O=E.callback_data)!=null&&O.includes(o)){const N=g?"✅":"☐",P=E.text.replace(/^[☐✅]\s*/,"");return{...E,text:`${N} ${P}`}}return E}));try{await fetch(`https://api.telegram.org/bot${f}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:c,message_id:s.message_id,reply_markup:{inline_keyboard:v}})})}catch{}}}function vn(t){const e=new Date,a=new Date(e.toLocaleString("en-US",{timeZone:t})),r=new Date(a);r.setDate(r.getDate()+1),r.setHours(0,0,0,0);const s=new Date(r);s.setHours(23,59,59,999);const n=r.toISOString().split("T")[0];return{start:r.toISOString(),end:s.toISOString(),dateStr:n}}async function wn(t,e,a,r,s,n){try{return(await new Qt(t,e,a,r,s).listEvents("primary",{timeMin:n.start,timeMax:n.end,maxResults:50})).map(l=>{var c;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(c=l.attendees)==null?void 0:c.map(d=>d.displayName||d.email),source:"google"}})}catch(i){return console.error("Google Calendar fetch error:",i.message),[]}}async function bn(t,e,a,r,s){try{const n=new we(t,e,a,r,s),i=await n.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),o=await n.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const m of i){const g=m.from.split("<")[0].trim()||m.from;l[g]=(l[g]||0)+1}const c=Object.entries(l).sort(([,m],[,g])=>g-m).slice(0,5).map(([m])=>m),d=i.some(m=>m.subject.toLowerCase().includes("urgent")||m.subject.toLowerCase().includes("asap")||m.subject.toLowerCase().includes("immediately"));return{unreadCount:i.length,importantCount:o.length,topSenders:c,hasUrgent:d}}catch(n){return console.error("Gmail fetch error:",n.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function _n(t,e){try{const a=await t.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(e).all(),r=new Date,s=new Date(r);s.setDate(s.getDate()+1),s.setHours(23,59,59,999);const n=a.results||[],i=n.map(l=>{if(l.due_date){const c=new Date(l.due_date),d=c<=r?"overdue":c<=s?"due today":c.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${l.title} [${d}]`}return l.title}),o=n.filter(l=>l.due_date?new Date(l.due_date)<=s:!1).length;return{pending:n.length,dueToday:o,items:i}}catch(a){return console.error("Tasks fetch error:",a.message),{pending:0,dueToday:0,items:[]}}}async function En(t,e){try{const a=Math.floor((Date.now()-1728e5)/1e3),r=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(t)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${a},points>10`,s=await fetch(r,{headers:{"User-Agent":"Karna/1.0"}});return s.ok?((await s.json()).hits||[]).filter(i=>i.url&&!e.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const _a=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function Tn(t,e,a){const r=t.length>0?t.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],s=new Set;if(e&&a)try{((await e.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(a).all()).results||[]).forEach(c=>s.add(c.url))}catch{}const n=[];if(r.some(l=>_a.some(c=>l.toLowerCase().includes(c.toLowerCase())))){const l=r.find(d=>_a.some(m=>d.toLowerCase().includes(m.toLowerCase())))||"AI agents",c=await En(l,s);for(const d of c)n.push(d),s.add(d.url)}for(const l of r){if(n.length>=8)break;const c=`latest ${l} news today`;try{const d=await Nt(c,{num:5});if(d.results)for(const m of d.results){if(n.length>=8)break;s.has(m.link)||(n.push({title:m.title,summary:m.snippet,url:m.link,source:m.displayLink}),s.add(m.link))}}catch(d){console.error(`News search error for "${c}":`,d.message)}}const o=n.slice(0,7);if(e&&a&&o.length>0)for(const l of o)try{await e.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(a,l.url,l.title).run()}catch{}return o}function xn(t,e){const a=[];let r="20:00";{const[i,o]=e.split(":"),l=parseInt(i,10),c=o||"00",d=l>=12?"PM":"AM";r=`${l===0?12:l>12?l-12:l}:${c} ${d}`}a.push(`🗓 Your ${r} Brief — ${t.targetDate}`),a.push("");const s=t.calendar.totalCount;if(s>0){a.push(`📅 Tomorrow: ${s} event${s===1?"":"s"}`);for(const i of t.calendar.google.slice(0,5)){const o=i.startTime?new Date(i.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";a.push(`   • ${o} ${i.title}`)}}else a.push("📅 Tomorrow: Nothing scheduled");a.push("");const n=t.emails.gmail.unreadCount;if(n>0?(a.push(`📧 Gmail: ${n} unread`),t.emails.gmail.importantCount>0&&a.push(`   ★ ${t.emails.gmail.importantCount} marked important`),t.emails.gmail.hasUrgent&&a.push("   ⚠️ Urgent messages present"),t.emails.gmail.topSenders.length>0&&a.push(`   From: ${t.emails.gmail.topSenders.slice(0,3).join(", ")}`)):a.push("📧 Gmail: Inbox clear"),a.push(""),t.tasks.pending>0){a.push(`✅ Open Tasks (${t.tasks.pending}):`);for(const i of t.tasks.items)a.push(`   ☐ ${i}`)}else a.push("✅ Tasks: All clear");if(a.push(""),t.news.items.length>0){a.push("📡 Today's Signal:");for(const i of t.news.items){const o=i.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${i.source}`;a.push(`   • ${i.title.substring(0,90)}${i.title.length>90?"…":""}`),a.push(`     ${o} — ${i.summary.substring(0,80)}${i.summary.length>80?"…":""}`)}}return a.join(`
`)}function kn(t){const e=[];let a=0;for(const r of t.calendar.google)e.push({type:"calendar",key:r.id,text:`${r.title} - ${new Date(r.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:r},sortOrder:a++});t.emails.gmail.unreadCount>0&&e.push({type:"email",key:"gmail-unread",text:`Review ${t.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:t.emails.gmail.unreadCount},sortOrder:a++});for(const r of t.tasks.items)e.push({type:"task",key:`task-${r}`,text:r,metadata:{},sortOrder:a++});for(const r of t.news.items)e.push({type:"news",key:`news-${r.url}`,text:`📰 ${r.title}`,metadata:{url:r.url,source:r.source},sortOrder:a++});return e}async function Sn(t,e){const a=await t.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(e).first();if(!a)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let r;try{const n=JSON.parse(a.components);r={google_calendar:n.google_calendar!==!1,gmail:n.gmail!==!1,tasks:n.tasks!==!1,news:n.news!==!1}}catch{r={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const s=a.news_topics?a.news_topics.split(",").map(n=>n.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:r,newsTopics:s}}async function Rr(t,e,a){var E,O;const r=e.timezone||"Asia/Kolkata",s=vn(r),{components:n,newsTopics:i}=await Sn(t,e.id),o=[],l=[];n.google_calendar&&(o.push(wn(t,e.id,e.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET,s)),l.push("googleEvents")),n.gmail&&(o.push(bn(t,e.id,e.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),n.tasks&&(o.push(_n(t,e.id)),l.push("tasks")),n.news&&(o.push(Tn(i,t,e.id)),l.push("news"));const c=await Promise.all(o),d={};l.forEach((N,P)=>{d[N]=c[P]});const m={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},g={pending:0,dueToday:0,items:[]},w={generatedAt:new Date().toISOString(),targetDate:s.dateStr,calendar:{google:d.googleEvents||[],totalCount:((E=d.googleEvents)==null?void 0:E.length)||0},emails:{gmail:d.gmailSummary||m},tasks:d.tasks||g,news:{items:d.news||[],fetchedAt:new Date().toISOString()},summary:""},f=((O=await t.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(e.id).first())==null?void 0:O.briefing_time)||"20:00";w.summary=xn(w,f);const T=kn(w),v=await t.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(e.id,JSON.stringify(w)).first(),x=(v==null?void 0:v.id)||0;for(const N of T)await t.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(x,N.type,N.key,N.text,JSON.stringify(N.metadata),N.sortOrder).run();return{briefingId:x,content:w,items:T}}async function Dn(t,e,a){const r=await t.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,e).first();if(!r)return null;const s=await t.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(a).all();return{briefing:{...r,content:JSON.parse(r.content_json||"{}")},items:s.results||[]}}async function In(t,e,a,r){if(!await t.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,e).first())return null;const n=await t.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(r,a).first();if(!n)return null;const i=n.checked?0:1;return await t.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(i,i,r,a).run(),{checked:i===1}}async function On(t,e,a=10){return((await t.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.sent_at DESC
    LIMIT ?
  `).bind(e,a).all()).results||[]).map(s=>({...s,content:JSON.parse(s.content_json||"{}")}))}function Cn(t,e,a=new Date){const r=new Date(a.toLocaleString("en-US",{timeZone:e})),s=r.getHours(),n=r.getMinutes(),[i,o]=t.split(":").map(Number),l=s*60+n,c=i*60+o;return l===c}function Nr(t,e){const a=t.summary,r=[];for(const s of e.slice(0,10))r.push([{text:`☐ ${s.text.substring(0,40)}${s.text.length>40?"...":""}`,callback_data:`briefing_toggle:${s.key}`}]);return{text:a,inlineKeyboard:r}}const de=new ke;async function Rn(t,e){var s;if(t.req.path.includes("/cron/"))return e();const a=(s=t.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!a)return t.json({error:"Authentication required"},401);const r=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return t.json({error:"Invalid session"},401);t.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),t.set("sessionId",a),await e()}de.use("/*",Rn);de.get("/briefings",async t=>{const e=t.get("user"),a=parseInt(t.req.query("limit")||"10");try{const r=await On(t.env.DB,e.id,a);return t.json({briefings:r})}catch(r){return t.json({error:r.message},500)}});de.get("/briefings/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));try{const r=await Dn(t.env.DB,e.id,a);return r?t.json(r):t.json({error:"Briefing not found"},404)}catch(r){return t.json({error:r.message},500)}});de.post("/briefings/:id/items/:itemId/toggle",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),r=parseInt(t.req.param("itemId"));try{const s=await In(t.env.DB,e.id,a,r);return s?t.json(s):t.json({error:"Item not found"},404)}catch(s){return t.json({error:s.message},500)}});de.post("/briefings/generate",async t=>{const e=t.get("user");try{const a=await Rr(t.env.DB,e,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET});return t.json(a)}catch(a){return t.json({error:a.message},500)}});de.get("/briefing-preferences",async t=>{const e=t.get("user");try{const a=await t.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(e.id).first();if(!a){const s={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return t.json({preferences:s})}const r={briefingTime:a.briefing_time,briefingEnabled:a.briefing_enabled!==0,components:JSON.parse(a.components),newsTopics:a.news_topics.split(",").map(s=>s.trim()).filter(Boolean),notificationChannels:JSON.parse(a.notification_channels),proactiveLevel:a.proactive_level};return t.json({preferences:r})}catch(a){return t.json({error:a.message},500)}});de.post("/briefing-preferences",async t=>{const e=t.get("user"),a=await t.req.json(),r=[];if(a.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(a.briefingTime)||r.push("Invalid time format. Use HH:MM (e.g., 20:00)")),a.newsTopics&&(a.newsTopics.length>5&&r.push("Maximum 5 news topics allowed"),a.newsTopics.some(s=>s.length>50)&&r.push("Each news topic must be 50 characters or less")),a.proactiveLevel&&!["conservative","moderate","aggressive"].includes(a.proactiveLevel)&&r.push("Invalid proactive level. Use conservative, moderate, or aggressive"),r.length>0)return t.json({error:r.join("; ")},400);try{const s=await t.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(e.id).first(),n=a.components?JSON.stringify(a.components):null,i=a.notificationChannels?JSON.stringify(a.notificationChannels):null,o=a.newsTopics?a.newsTopics.join(", "):null;if(s){const l=[],c=[];a.briefingTime!==void 0&&(l.push("briefing_time = ?"),c.push(a.briefingTime)),a.briefingEnabled!==void 0&&(l.push("briefing_enabled = ?"),c.push(a.briefingEnabled?1:0)),n!==null&&(l.push("components = ?"),c.push(n)),o!==null&&(l.push("news_topics = ?"),c.push(o)),i!==null&&(l.push("notification_channels = ?"),c.push(i)),a.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),c.push(a.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),c.push(e.id),await t.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...c).run())}else await t.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(e.id,a.briefingTime||"20:00",n||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',o||"AI, LLM, Tools, Agentic Workflows, AI Features",i||'{"telegram":true,"web":true}',a.proactiveLevel||"moderate").run();return t.json({success:!0})}catch(s){return t.json({error:s.message},500)}});de.post("/briefing-preferences/init-defaults",async t=>{const e=t.get("user");try{return await t.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(e.id).first()?t.json({success:!0,message:"Preferences already exist"}):(await t.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(e.id).run(),t.json({success:!0,message:"Default preferences created"}))}catch(a){return t.json({error:a.message},500)}});de.post("/cron/evening-briefing",async t=>{const e=t.req.header("X-Cron-Secret")||"",a=t.env.CRON_SECRET||"karna-cron-default-v1";if(e!==a)return t.json({error:"Unauthorized"},401);try{const r=await t.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),s=[],n=new Date;for(const i of r.results||[]){if(!i.briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.briefing_time||"20:00";if(Cn(l,o,n))try{const c=await Rr(t.env.DB,i,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET});if(i.telegram_chat_id){const{text:d,inlineKeyboard:m}=Nr(c.content,c.items);await Ar(t.env.DB,i,d,m,c.briefingId)}s.push({user_id:i.id,status:"success",briefing_id:c.briefingId,briefing_time:l,timezone:o})}catch(c){s.push({user_id:i.id,status:"error",error:c.message})}}return t.json({executed:s.length,results:s})}catch(r){return t.json({error:r.message},500)}});de.post("/cron/meeting-reminders",async t=>{const e=t.req.header("X-Cron-Secret")||"",a=t.env.CRON_SECRET||"karna-cron-default-v1";if(e!==a)return t.json({error:"Unauthorized"},401);try{const r=await t.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id IS NOT NULL").all(),s=[],n=new Date,i=new Date(n.getTime()+600*1e3).toISOString(),o=new Date(n.getTime()+900*1e3).toISOString();for(const l of r.results||[])try{const c=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!c)continue;const d=await J(c.encrypted_value,l.pin_hash),g=JSON.parse(d).access_token;if(!g)continue;const w=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(n.toISOString())}&timeMax=${encodeURIComponent(o)}&maxResults=10`,{headers:{Authorization:`Bearer ${g}`}});if(!w.ok)continue;const T=((await w.json()).items||[]).filter(E=>{var N;const O=(N=E.start)==null?void 0:N.dateTime;return O?O>=n.toISOString()&&O<=i:!1});if(T.length===0){s.push({user_id:l.id,reminders_sent:0});continue}const v=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(l.id).first();if(!v)continue;const x=await J(v.encrypted_value,l.pin_hash);for(const E of T){const O=new Date(E.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),N=E.location?`
📍 ${E.location}`:"",P=`⏰ Meeting in 10 minutes!

*${E.summary||"Untitled Event"}*
🕐 ${O}${N}`;await fetch(`https://api.telegram.org/bot${x}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l.telegram_chat_id,text:P,parse_mode:"Markdown"})})}s.push({user_id:l.id,reminders_sent:T.length})}catch(c){s.push({user_id:l.id,status:"error",error:c.message})}return t.json({executed:s.length,results:s})}catch(r){return t.json({error:r.message},500)}});async function Ar(t,e,a,r,s){try{const n=await t.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(e.id).first();if(!n)return;const i=await J(n.encrypted_value,n.pin_hash);if(!(await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e.telegram_chat_id,text:a,parse_mode:"Markdown",reply_markup:{inline_keyboard:r.map(c=>c.map(d=>({...d,callback_data:`${d.callback_data}:${s}`})))}})})).json()).ok){const d=await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e.telegram_chat_id,text:a.replace(/[_*[\]`]/g,""),reply_markup:{inline_keyboard:r.map(m=>m.map(g=>({...g,callback_data:`${g.callback_data}:${s}`})))}})})).json();if(!d.ok){console.error("Telegram briefing send failed:",d.description,"chat_id:",e.telegram_chat_id);return}}await t.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(s).run()}catch(n){console.error("Telegram briefing error:",n.message)}}de.post("/briefings/:id/resend",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));try{const r=await t.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(a,e.id).first();if(!r)return t.json({error:"Briefing not found"},404);const s=JSON.parse(r.content||"{}"),n=await t.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(a).all(),{text:i,inlineKeyboard:o}=Nr(s,n.results||[]);await t.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(a).run(),await Ar(t.env.DB,e,i,o,a);const l=await t.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(a).first();return l!=null&&l.delivered_telegram?t.json({success:!0,message:"Briefing sent to Telegram"}):t.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(r){return t.json({error:r.message},500)}});de.delete("/briefings/:id",async t=>{const e=t.get("user"),a=t.req.param("id");return await t.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});const Fe=new ke;async function Nn(t,e){var s;const a=(s=t.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!a)return t.json({error:"Authentication required"},401);const r=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return t.json({error:"Invalid session"},401);t.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),t.set("sessionId",a),await e()}Fe.use("/*",Nn);function Lr(t){return t.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"")}Fe.get("/",async t=>{const e=t.get("user"),a=await t.env.DB.prepare(`SELECT id, name, slug, description, instructions, parameters, required_tools, examples, enabled, usage_count, last_used_at, created_at, updated_at
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`).bind(e.id).all();return t.json({skills:a.results||[]})});Fe.post("/",async t=>{var c,d,m;const e=t.get("user"),a=await t.req.json();if(!((c=a.name)!=null&&c.trim()))return t.json({error:"name is required"},400);if(!((d=a.description)!=null&&d.trim()))return t.json({error:"description is required"},400);if(!((m=a.instructions)!=null&&m.trim()))return t.json({error:"instructions is required"},400);let r=Lr(a.name);r||(r=`skill_${Date.now()}`);const s=await t.env.DB.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(e.id,`${r}%`).all();s.results&&s.results.length>0&&s.results.map(w=>w.slug).includes(r)&&(r=`${r}_${s.results.length+1}`);const n=JSON.stringify(a.parameters||{}),i=JSON.stringify(a.required_tools||[]),o=JSON.stringify(a.examples||[]),l=await t.env.DB.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(e.id,a.name.trim(),r,a.description.trim(),a.instructions.trim(),n,i,o).first();return t.json({skill:l,created:!0})});Fe.get("/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));if(isNaN(a))return t.json({error:"Invalid skill ID"},400);const r=await t.env.DB.prepare("SELECT * FROM user_skills WHERE id = ? AND user_id = ?").bind(a,e.id).first();return r?t.json({skill:r}):t.json({error:"Skill not found"},404)});Fe.put("/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));if(isNaN(a))return t.json({error:"Invalid skill ID"},400);const r=await t.req.json(),s=[],n=[];return r.name!==void 0&&(s.push("name = ?","slug = ?"),n.push(r.name.trim(),Lr(r.name))),r.description!==void 0&&(s.push("description = ?"),n.push(r.description.trim())),r.instructions!==void 0&&(s.push("instructions = ?"),n.push(r.instructions.trim())),r.parameters!==void 0&&(s.push("parameters = ?"),n.push(JSON.stringify(r.parameters))),r.required_tools!==void 0&&(s.push("required_tools = ?"),n.push(JSON.stringify(r.required_tools))),r.examples!==void 0&&(s.push("examples = ?"),n.push(JSON.stringify(r.examples))),r.enabled!==void 0&&(s.push("enabled = ?"),n.push(r.enabled?1:0)),s.length===0?t.json({error:"Nothing to update"},400):(s.push("updated_at = CURRENT_TIMESTAMP"),n.push(a,e.id),await t.env.DB.prepare(`UPDATE user_skills SET ${s.join(", ")} WHERE id = ? AND user_id = ?`).bind(...n).run(),t.json({success:!0}))});Fe.delete("/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return isNaN(a)?t.json({error:"Invalid skill ID"},400):(await t.env.DB.prepare("DELETE FROM user_skills WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0}))});const pe=new ke;pe.use("/api/*",ws());pe.route("/api/auth",Ae);pe.route("/api/chat",ae);pe.route("/api/settings",V);pe.route("/api/system",Se);pe.route("/api/telegram",_t);pe.route("/api/proactive",de);pe.route("/api/skills",Fe);pe.get("/auth/google/callback",async t=>{const e=new URL(t.req.url),a=e.searchParams.get("code"),r=e.searchParams.get("state"),s=e.searchParams.get("error");if(s)return t.html(ze(!1,`Google denied access: ${s}`));if(!a||!r)return t.html(ze(!1,"Missing authorization code or state parameter."));try{const i=JSON.parse(atob(r)).sessionId;if(!i)return t.html(ze(!1,"Invalid state parameter — missing session."));const o=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(i).first();if(!o)return t.html(ze(!1,"Session expired. Please log in again and retry."));const l=o.user_id,c=o.pin_hash,d=`${e.protocol}//${e.host}/auth/google/callback`,m=await rr(t.env.DB,l,c,a,d,t.env.GOOGLE_CLIENT_ID,t.env.GOOGLE_CLIENT_SECRET);return t.html(ze(!0,`Connected as ${m.email}`,m.email))}catch(n){return t.html(ze(!1,`OAuth failed: ${n.message}`))}});pe.get("/",t=>(t.header("Cache-Control","no-cache, no-store, must-revalidate"),t.header("Pragma","no-cache"),t.header("Expires","0"),t.html(qa())));pe.get("*",t=>t.req.path.startsWith("/api/")?t.json({error:"Not found"},404):(t.header("Cache-Control","no-cache, no-store, must-revalidate"),t.header("Pragma","no-cache"),t.header("Expires","0"),t.html(qa())));function ze(t,e,a){return`<!DOCTYPE html>
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
</body></html>`}async function An(t,e,a){const r="https://karna-5xs.pages.dev",n={"Content-Type":"application/json","X-Cron-Secret":e.CRON_SECRET||"karna-cron-default-v1"};try{const o=await(await fetch(`${r}/api/system/cron/execute`,{method:"POST",headers:n})).json();if(o.results&&o.results.length>0){const c=o.results.filter(m=>m.needs_agent&&m.status==="dispatched");if(c.length>0){const m=c.map(g=>fetch(`${r}/api/system/cron/run-task/${g.job_id}`,{method:"POST",headers:n}).then(w=>w.json()).catch(w=>({job_id:g.job_id,error:w.message})));a.waitUntil(Promise.allSettled(m).then(g=>{console.log(`Cron: ${o.executed} dispatched, ${c.length} agent tasks`,JSON.stringify(g.map(w=>w.status==="fulfilled"?w.value:w.reason)))}))}const d=o.results.filter(m=>!m.needs_agent&&m.status==="dispatched");if(d.length>0){const m=d.map(g=>fetch(`${r}/api/system/cron/run-task/${g.job_id}`,{method:"POST",headers:n}).catch(()=>{}));a.waitUntil(Promise.allSettled(m))}}a.waitUntil(fetch(`${r}/api/proactive/cron/evening-briefing`,{method:"POST",headers:n}).then(c=>c.json()).then(c=>{c.executed>0&&console.log("Evening briefing result:",JSON.stringify(c))}).catch(c=>{console.error("Evening briefing error:",c.message)})),new Date().getMinutes()%5<2&&a.waitUntil(fetch(`${r}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:n}).then(c=>c.json()).then(c=>{var d;(d=c.results)!=null&&d.some(m=>m.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(c))}).catch(()=>{}))}catch(i){console.error("Scheduled cron error:",i.message||i)}}const Ln={fetch:pe.fetch,scheduled:An},Ea=new ke,Mn=Object.assign({"/src/index.tsx":Ln});let Mr=!1;for(const[,t]of Object.entries(Mn))t&&(Ea.all("*",e=>{let a;try{a=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,a)}),Ea.notFound(e=>{let a;try{a=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,a)}),Mr=!0);if(!Mr)throw new Error("Can't import modules from ['/src/index.tsx']");export{Ea as default};
