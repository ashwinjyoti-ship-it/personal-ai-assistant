var Qs=Object.defineProperty;var ga=e=>{throw TypeError(e)};var er=(e,t,a)=>t in e?Qs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var N=(e,t,a)=>er(e,typeof t!="symbol"?t+"":t,a),Gt=(e,t,a)=>t.has(e)||ga("Cannot "+a);var S=(e,t,a)=>(Gt(e,t,"read from private field"),a?a.call(e):t.get(e)),G=(e,t,a)=>t.has(e)?ga("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),$=(e,t,a,s)=>(Gt(e,t,"write to private field"),s?s.call(e,a):t.set(e,a),a),V=(e,t,a)=>(Gt(e,t,"access private method"),a);var fa=(e,t,a,s)=>({set _(r){$(e,t,r,a)},get _(){return S(e,t,s)}});var ya=(e,t,a)=>(s,r)=>{let n=-1;return o(0);async function o(i){if(i<=n)throw new Error("next() called multiple times");n=i;let l,d=!1,c;if(e[i]?(c=e[i][0][0],s.req.routeIndex=i):c=i===e.length&&r||void 0,c)try{l=await c(s,()=>o(i+1))}catch(p){if(p instanceof Error&&t)s.error=p,l=await t(p,s),d=!0;else throw p}else s.finalized===!1&&a&&(l=await a(s));return l&&(s.finalized===!1||d)&&(s.res=l),s}},tr=Symbol(),ar=async(e,t=Object.create(null))=>{const{all:a=!1,dot:s=!1}=t,n=(e instanceof Ka?e.raw.headers:e.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?sr(e,{all:a,dot:s}):{}};async function sr(e,t){const a=await e.formData();return a?rr(a,t):{}}function rr(e,t){const a=Object.create(null);return e.forEach((s,r)=>{t.all||r.endsWith("[]")?nr(a,r,s):a[r]=s}),t.dot&&Object.entries(a).forEach(([s,r])=>{s.includes(".")&&(or(a,s,r),delete a[s])}),a}var nr=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},or=(e,t,a)=>{let s=e;const r=t.split(".");r.forEach((n,o)=>{o===r.length-1?s[n]=a:((!s[n]||typeof s[n]!="object"||Array.isArray(s[n])||s[n]instanceof File)&&(s[n]=Object.create(null)),s=s[n])})},Ga=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},ir=e=>{const{groups:t,path:a}=lr(e),s=Ga(a);return dr(s,t)},lr=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,s)=>{const r=`@${s}`;return t.push([r,a]),r}),{groups:t,path:e}},dr=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[s]=t[a];for(let r=e.length-1;r>=0;r--)if(e[r].includes(s)){e[r]=e[r].replace(s,t[a][1]);break}}return e},Dt={},cr=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const s=`${e}#${t}`;return Dt[s]||(a[2]?Dt[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:Dt[s]=[e,a[1],!0]),Dt[s]}return null},aa=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},ur=e=>aa(e,decodeURI),Fa=e=>{const t=e.url,a=t.indexOf("/",t.indexOf(":")+4);let s=a;for(;s<t.length;s++){const r=t.charCodeAt(s);if(r===37){const n=t.indexOf("?",s),o=t.indexOf("#",s),i=n===-1?o===-1?void 0:o:o===-1?n:Math.min(n,o),l=t.slice(a,i);return ur(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(r===63||r===35)break}return t.slice(a,s)},mr=e=>{const t=Fa(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Ve=(e,t,...a)=>(a.length&&(t=Ve(t,...a)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Wa=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let s="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))s+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){a.length===0&&s===""?a.push("/"):a.push(s);const n=r.replace("?","");s+="/"+n,a.push(s)}else s+="/"+r}),a.filter((r,n,o)=>o.indexOf(r)===n)},Ft=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?aa(e,za):e):e,qa=(e,t,a)=>{let s;if(!a&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const i=e.charCodeAt(o+t.length+1);if(i===61){const l=o+t.length+2,d=e.indexOf("&",l);return Ft(e.slice(l,d===-1?void 0:d))}else if(i==38||isNaN(i))return"";o=e.indexOf(`&${t}`,o+1)}if(s=/[%+]/.test(e),!s)return}const r={};s??(s=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const o=e.indexOf("&",n+1);let i=e.indexOf("=",n);i>o&&o!==-1&&(i=-1);let l=e.slice(n+1,i===-1?o===-1?void 0:o:i);if(s&&(l=Ft(l)),n=o,l==="")continue;let d;i===-1?d="":(d=e.slice(i+1,o===-1?void 0:o),s&&(d=Ft(d))),a?(r[l]&&Array.isArray(r[l])||(r[l]=[]),r[l].push(d)):r[l]??(r[l]=d)}return t?r[t]:r},pr=qa,hr=(e,t)=>qa(e,t,!0),za=decodeURIComponent,va=e=>aa(e,za),et,he,De,Ya,Ja,Vt,Ce,$a,Ka=($a=class{constructor(e,t="/",a=[[]]){G(this,De);N(this,"raw");G(this,et);G(this,he);N(this,"routeIndex",0);N(this,"path");N(this,"bodyCache",{});G(this,Ce,e=>{const{bodyCache:t,raw:a}=this,s=t[e];if(s)return s;const r=Object.keys(t)[0];return r?t[r].then(n=>(r==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=a[e]()});this.raw=e,this.path=t,$(this,he,a),$(this,et,{})}param(e){return e?V(this,De,Ya).call(this,e):V(this,De,Ja).call(this)}query(e){return pr(this.url,e)}queries(e){return hr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,s)=>{t[s]=a}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await ar(this,e))}json(){return S(this,Ce).call(this,"text").then(e=>JSON.parse(e))}text(){return S(this,Ce).call(this,"text")}arrayBuffer(){return S(this,Ce).call(this,"arrayBuffer")}blob(){return S(this,Ce).call(this,"blob")}formData(){return S(this,Ce).call(this,"formData")}addValidatedData(e,t){S(this,et)[e]=t}valid(e){return S(this,et)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[tr](){return S(this,he)}get matchedRoutes(){return S(this,he)[0].map(([[,e]])=>e)}get routePath(){return S(this,he)[0].map(([[,e]])=>e)[this.routeIndex].path}},et=new WeakMap,he=new WeakMap,De=new WeakSet,Ya=function(e){const t=S(this,he)[0][this.routeIndex][1][e],a=V(this,De,Vt).call(this,t);return a&&/\%/.test(a)?va(a):a},Ja=function(){const e={},t=Object.keys(S(this,he)[0][this.routeIndex][1]);for(const a of t){const s=V(this,De,Vt).call(this,S(this,he)[0][this.routeIndex][1][a]);s!==void 0&&(e[a]=/\%/.test(s)?va(s):s)}return e},Vt=function(e){return S(this,he)[1]?S(this,he)[1][e]:e},Ce=new WeakMap,$a),gr={Stringify:1},Va=async(e,t,a,s,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(r?r[0]+=e:r=[e],Promise.all(n.map(i=>i({phase:t,buffer:r,context:s}))).then(i=>Promise.all(i.filter(Boolean).map(l=>Va(l,t,!1,s,r))).then(()=>r[0]))):Promise.resolve(e)},fr="text/plain; charset=UTF-8",Wt=(e,t)=>({"Content-Type":e,...t}),vt,wt,Te,tt,ke,ce,bt,at,st,Ue,_t,Et,Re,Ze,Pa,yr=(Pa=class{constructor(e,t){G(this,Re);G(this,vt);G(this,wt);N(this,"env",{});G(this,Te);N(this,"finalized",!1);N(this,"error");G(this,tt);G(this,ke);G(this,ce);G(this,bt);G(this,at);G(this,st);G(this,Ue);G(this,_t);G(this,Et);N(this,"render",(...e)=>(S(this,at)??$(this,at,t=>this.html(t)),S(this,at).call(this,...e)));N(this,"setLayout",e=>$(this,bt,e));N(this,"getLayout",()=>S(this,bt));N(this,"setRenderer",e=>{$(this,at,e)});N(this,"header",(e,t,a)=>{this.finalized&&$(this,ce,new Response(S(this,ce).body,S(this,ce)));const s=S(this,ce)?S(this,ce).headers:S(this,Ue)??$(this,Ue,new Headers);t===void 0?s.delete(e):a!=null&&a.append?s.append(e,t):s.set(e,t)});N(this,"status",e=>{$(this,tt,e)});N(this,"set",(e,t)=>{S(this,Te)??$(this,Te,new Map),S(this,Te).set(e,t)});N(this,"get",e=>S(this,Te)?S(this,Te).get(e):void 0);N(this,"newResponse",(...e)=>V(this,Re,Ze).call(this,...e));N(this,"body",(e,t,a)=>V(this,Re,Ze).call(this,e,t,a));N(this,"text",(e,t,a)=>!S(this,Ue)&&!S(this,tt)&&!t&&!a&&!this.finalized?new Response(e):V(this,Re,Ze).call(this,e,t,Wt(fr,a)));N(this,"json",(e,t,a)=>V(this,Re,Ze).call(this,JSON.stringify(e),t,Wt("application/json",a)));N(this,"html",(e,t,a)=>{const s=r=>V(this,Re,Ze).call(this,r,t,Wt("text/html; charset=UTF-8",a));return typeof e=="object"?Va(e,gr.Stringify,!1,{}).then(s):s(e)});N(this,"redirect",(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)});N(this,"notFound",()=>(S(this,st)??$(this,st,()=>new Response),S(this,st).call(this,this)));$(this,vt,e),t&&($(this,ke,t.executionCtx),this.env=t.env,$(this,st,t.notFoundHandler),$(this,Et,t.path),$(this,_t,t.matchResult))}get req(){return S(this,wt)??$(this,wt,new Ka(S(this,vt),S(this,Et),S(this,_t))),S(this,wt)}get event(){if(S(this,ke)&&"respondWith"in S(this,ke))return S(this,ke);throw Error("This context has no FetchEvent")}get executionCtx(){if(S(this,ke))return S(this,ke);throw Error("This context has no ExecutionContext")}get res(){return S(this,ce)||$(this,ce,new Response(null,{headers:S(this,Ue)??$(this,Ue,new Headers)}))}set res(e){if(S(this,ce)&&e){e=new Response(e.body,e);for(const[t,a]of S(this,ce).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=S(this,ce).headers.getSetCookie();e.headers.delete("set-cookie");for(const r of s)e.headers.append("set-cookie",r)}else e.headers.set(t,a)}$(this,ce,e),this.finalized=!0}get var(){return S(this,Te)?Object.fromEntries(S(this,Te)):{}}},vt=new WeakMap,wt=new WeakMap,Te=new WeakMap,tt=new WeakMap,ke=new WeakMap,ce=new WeakMap,bt=new WeakMap,at=new WeakMap,st=new WeakMap,Ue=new WeakMap,_t=new WeakMap,Et=new WeakMap,Re=new WeakSet,Ze=function(e,t,a){const s=S(this,ce)?new Headers(S(this,ce).headers):S(this,Ue)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,i]of n)o.toLowerCase()==="set-cookie"?s.append(o,i):s.set(o,i)}if(a)for(const[n,o]of Object.entries(a))if(typeof o=="string")s.set(n,o);else{s.delete(n);for(const i of o)s.append(n,i)}const r=typeof t=="number"?t:(t==null?void 0:t.status)??S(this,tt);return new Response(e,{status:r,headers:s})},Pa),se="ALL",vr="all",wr=["get","post","put","delete","options","patch"],Za="Can not add a route since the matcher is already built.",Xa=class extends Error{},br="__COMPOSED_HANDLER",_r=e=>e.text("404 Not Found",404),wa=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},ge,re,Qa,fe,Be,Ot,Ct,rt,Er=(rt=class{constructor(t={}){G(this,re);N(this,"get");N(this,"post");N(this,"put");N(this,"delete");N(this,"options");N(this,"patch");N(this,"all");N(this,"on");N(this,"use");N(this,"router");N(this,"getPath");N(this,"_basePath","/");G(this,ge,"/");N(this,"routes",[]);G(this,fe,_r);N(this,"errorHandler",wa);N(this,"onError",t=>(this.errorHandler=t,this));N(this,"notFound",t=>($(this,fe,t),this));N(this,"fetch",(t,...a)=>V(this,re,Ct).call(this,t,a[1],a[0],t.method));N(this,"request",(t,a,s,r)=>t instanceof Request?this.fetch(a?new Request(t,a):t,s,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Ve("/",t)}`,a),s,r)));N(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(V(this,re,Ct).call(this,t.request,t,void 0,t.request.method))})});[...wr,vr].forEach(n=>{this[n]=(o,...i)=>(typeof o=="string"?$(this,ge,o):V(this,re,Be).call(this,n,S(this,ge),o),i.forEach(l=>{V(this,re,Be).call(this,n,S(this,ge),l)}),this)}),this.on=(n,o,...i)=>{for(const l of[o].flat()){$(this,ge,l);for(const d of[n].flat())i.map(c=>{V(this,re,Be).call(this,d.toUpperCase(),S(this,ge),c)})}return this},this.use=(n,...o)=>(typeof n=="string"?$(this,ge,n):($(this,ge,"*"),o.unshift(n)),o.forEach(i=>{V(this,re,Be).call(this,se,S(this,ge),i)}),this);const{strict:s,...r}=t;Object.assign(this,r),this.getPath=s??!0?t.getPath??Fa:mr}route(t,a){const s=this.basePath(t);return a.routes.map(r=>{var o;let n;a.errorHandler===wa?n=r.handler:(n=async(i,l)=>(await ya([],a.errorHandler)(i,()=>r.handler(i,l))).res,n[br]=r.handler),V(o=s,re,Be).call(o,r.method,r.path,n)}),this}basePath(t){const a=V(this,re,Qa).call(this);return a._basePath=Ve(this._basePath,t),a}mount(t,a,s){let r,n;s&&(typeof s=="function"?n=s:(n=s.optionHandler,s.replaceRequest===!1?r=l=>l:r=s.replaceRequest));const o=n?l=>{const d=n(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};r||(r=(()=>{const l=Ve(this._basePath,t),d=l==="/"?0:l.length;return c=>{const p=new URL(c.url);return p.pathname=p.pathname.slice(d)||"/",new Request(p,c)}})());const i=async(l,d)=>{const c=await a(r(l.req.raw),...o(l));if(c)return c;await d()};return V(this,re,Be).call(this,se,Ve(t,"*"),i),this}},ge=new WeakMap,re=new WeakSet,Qa=function(){const t=new rt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,$(t,fe,S(this,fe)),t.routes=this.routes,t},fe=new WeakMap,Be=function(t,a,s){t=t.toUpperCase(),a=Ve(this._basePath,a);const r={basePath:this._basePath,path:a,method:t,handler:s};this.router.add(t,a,[s,r]),this.routes.push(r)},Ot=function(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t},Ct=function(t,a,s,r){if(r==="HEAD")return(async()=>new Response(null,await V(this,re,Ct).call(this,t,a,s,"GET")))();const n=this.getPath(t,{env:s}),o=this.router.match(r,n),i=new yr(t,{path:n,matchResult:o,env:s,executionCtx:a,notFoundHandler:S(this,fe)});if(o[0].length===1){let d;try{d=o[0][0][0][0](i,async()=>{i.res=await S(this,fe).call(this,i)})}catch(c){return V(this,re,Ot).call(this,c,i)}return d instanceof Promise?d.then(c=>c||(i.finalized?i.res:S(this,fe).call(this,i))).catch(c=>V(this,re,Ot).call(this,c,i)):d??S(this,fe).call(this,i)}const l=ya(o[0],this.errorHandler,S(this,fe));return(async()=>{try{const d=await l(i);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return V(this,re,Ot).call(this,d,i)}})()},rt),es=[];function Tr(e,t){const a=this.buildAllMatchers(),s=((r,n)=>{const o=a[r]||a[se],i=o[2][n];if(i)return i;const l=n.match(o[0]);if(!l)return[[],es];const d=l.indexOf("",1);return[o[1][d],l]});return this.match=s,s(e,t)}var It="[^/]+",ht=".*",gt="(?:|/.*)",Xe=Symbol(),kr=new Set(".\\+*[^]$()");function xr(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===ht||e===gt?1:t===ht||t===gt?-1:e===It?1:t===It?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var He,Ge,ye,qe,Sr=(qe=class{constructor(){G(this,He);G(this,Ge);G(this,ye,Object.create(null))}insert(t,a,s,r,n){if(t.length===0){if(S(this,He)!==void 0)throw Xe;if(n)return;$(this,He,a);return}const[o,...i]=t,l=o==="*"?i.length===0?["","",ht]:["","",It]:o==="/*"?["","",gt]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const c=l[1];let p=l[2]||It;if(c&&l[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw Xe;if(d=S(this,ye)[p],!d){if(Object.keys(S(this,ye)).some(h=>h!==ht&&h!==gt))throw Xe;if(n)return;d=S(this,ye)[p]=new qe,c!==""&&$(d,Ge,r.varIndex++)}!n&&c!==""&&s.push([c,S(d,Ge)])}else if(d=S(this,ye)[o],!d){if(Object.keys(S(this,ye)).some(c=>c.length>1&&c!==ht&&c!==gt))throw Xe;if(n)return;d=S(this,ye)[o]=new qe}d.insert(i,a,s,r,n)}buildRegExpStr(){const a=Object.keys(S(this,ye)).sort(xr).map(s=>{const r=S(this,ye)[s];return(typeof S(r,Ge)=="number"?`(${s})@${S(r,Ge)}`:kr.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof S(this,He)=="number"&&a.unshift(`#${S(this,He)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},He=new WeakMap,Ge=new WeakMap,ye=new WeakMap,qe),Mt,Tt,Ba,Dr=(Ba=class{constructor(){G(this,Mt,{varIndex:0});G(this,Tt,new Sr)}insert(e,t,a){const s=[],r=[];for(let o=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${o}`;return r[o]=[d,l],o++,i=!0,d}),!i)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=r.length-1;o>=0;o--){const[i]=r[o];for(let l=n.length-1;l>=0;l--)if(n[l].indexOf(i)!==-1){n[l]=n[l].replace(i,r[o][1]);break}}return S(this,Tt).insert(n,t,s,S(this,Mt),a),s}buildRegExp(){let e=S(this,Tt).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,n,o)=>n!==void 0?(a[++t]=Number(n),"$()"):(o!==void 0&&(s[Number(o)]=++t),"")),[new RegExp(`^${e}`),a,s]}},Mt=new WeakMap,Tt=new WeakMap,Ba),Or=[/^$/,[],Object.create(null)],Rt=Object.create(null);function ts(e){return Rt[e]??(Rt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function Cr(){Rt=Object.create(null)}function Rr(e){var d;const t=new Dr,a=[];if(e.length===0)return Or;const s=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,p],[h,_])=>c?1:h?-1:p.length-_.length),r=Object.create(null);for(let c=0,p=-1,h=s.length;c<h;c++){const[_,f,b]=s[c];_?r[f]=[b.map(([k])=>[k,Object.create(null)]),es]:p++;let v;try{v=t.insert(f,p,_)}catch(k){throw k===Xe?new Xa(f):k}_||(a[p]=b.map(([k,E])=>{const C=Object.create(null);for(E-=1;E>=0;E--){const[M,B]=v[E];C[M]=B}return[k,C]}))}const[n,o,i]=t.buildRegExp();for(let c=0,p=a.length;c<p;c++)for(let h=0,_=a[c].length;h<_;h++){const f=(d=a[c][h])==null?void 0:d[1];if(!f)continue;const b=Object.keys(f);for(let v=0,k=b.length;v<k;v++)f[b[v]]=i[f[b[v]]]}const l=[];for(const c in o)l[c]=a[o[c]];return[n,l,r]}function Ye(e,t){if(e){for(const a of Object.keys(e).sort((s,r)=>r.length-s.length))if(ts(a).test(t))return[...e[a]]}}var Ie,Ne,Lt,as,ja,Ir=(ja=class{constructor(){G(this,Lt);N(this,"name","RegExpRouter");G(this,Ie);G(this,Ne);N(this,"match",Tr);$(this,Ie,{[se]:Object.create(null)}),$(this,Ne,{[se]:Object.create(null)})}add(e,t,a){var i;const s=S(this,Ie),r=S(this,Ne);if(!s||!r)throw new Error(Za);s[e]||[s,r].forEach(l=>{l[e]=Object.create(null),Object.keys(l[se]).forEach(d=>{l[e][d]=[...l[se][d]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=ts(t);e===se?Object.keys(s).forEach(d=>{var c;(c=s[d])[t]||(c[t]=Ye(s[d],t)||Ye(s[se],t)||[])}):(i=s[e])[t]||(i[t]=Ye(s[e],t)||Ye(s[se],t)||[]),Object.keys(s).forEach(d=>{(e===se||e===d)&&Object.keys(s[d]).forEach(c=>{l.test(c)&&s[d][c].push([a,n])})}),Object.keys(r).forEach(d=>{(e===se||e===d)&&Object.keys(r[d]).forEach(c=>l.test(c)&&r[d][c].push([a,n]))});return}const o=Wa(t)||[t];for(let l=0,d=o.length;l<d;l++){const c=o[l];Object.keys(r).forEach(p=>{var h;(e===se||e===p)&&((h=r[p])[c]||(h[c]=[...Ye(s[p],c)||Ye(s[se],c)||[]]),r[p][c].push([a,n-d+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(S(this,Ne)).concat(Object.keys(S(this,Ie))).forEach(t=>{e[t]||(e[t]=V(this,Lt,as).call(this,t))}),$(this,Ie,$(this,Ne,void 0)),Cr(),e}},Ie=new WeakMap,Ne=new WeakMap,Lt=new WeakSet,as=function(e){const t=[];let a=e===se;return[S(this,Ie),S(this,Ne)].forEach(s=>{const r=s[e]?Object.keys(s[e]).map(n=>[n,s[e][n]]):[];r.length!==0?(a||(a=!0),t.push(...r)):e!==se&&t.push(...Object.keys(s[se]).map(n=>[n,s[se][n]]))}),a?Rr(t):null},ja),Ae,xe,Ua,Nr=(Ua=class{constructor(e){N(this,"name","SmartRouter");G(this,Ae,[]);G(this,xe,[]);$(this,Ae,e.routers)}add(e,t,a){if(!S(this,xe))throw new Error(Za);S(this,xe).push([e,t,a])}match(e,t){if(!S(this,xe))throw new Error("Fatal error");const a=S(this,Ae),s=S(this,xe),r=a.length;let n=0,o;for(;n<r;n++){const i=a[n];try{for(let l=0,d=s.length;l<d;l++)i.add(...s[l]);o=i.match(e,t)}catch(l){if(l instanceof Xa)continue;throw l}this.match=i.match.bind(i),$(this,Ae,[i]),$(this,xe,void 0);break}if(n===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(S(this,xe)||S(this,Ae).length!==1)throw new Error("No active router has been determined yet.");return S(this,Ae)[0]}},Ae=new WeakMap,xe=new WeakMap,Ua),ut=Object.create(null),Me,ie,Fe,nt,oe,Se,je,ot,Ar=(ot=class{constructor(t,a,s){G(this,Se);G(this,Me);G(this,ie);G(this,Fe);G(this,nt,0);G(this,oe,ut);if($(this,ie,s||Object.create(null)),$(this,Me,[]),t&&a){const r=Object.create(null);r[t]={handler:a,possibleKeys:[],score:0},$(this,Me,[r])}$(this,Fe,[])}insert(t,a,s){$(this,nt,++fa(this,nt)._);let r=this;const n=ir(a),o=[];for(let i=0,l=n.length;i<l;i++){const d=n[i],c=n[i+1],p=cr(d,c),h=Array.isArray(p)?p[0]:d;if(h in S(r,ie)){r=S(r,ie)[h],p&&o.push(p[1]);continue}S(r,ie)[h]=new ot,p&&(S(r,Fe).push(p),o.push(p[1])),r=S(r,ie)[h]}return S(r,Me).push({[t]:{handler:s,possibleKeys:o.filter((i,l,d)=>d.indexOf(i)===l),score:S(this,nt)}}),r}search(t,a){var l;const s=[];$(this,oe,ut);let n=[this];const o=Ga(a),i=[];for(let d=0,c=o.length;d<c;d++){const p=o[d],h=d===c-1,_=[];for(let f=0,b=n.length;f<b;f++){const v=n[f],k=S(v,ie)[p];k&&($(k,oe,S(v,oe)),h?(S(k,ie)["*"]&&s.push(...V(this,Se,je).call(this,S(k,ie)["*"],t,S(v,oe))),s.push(...V(this,Se,je).call(this,k,t,S(v,oe)))):_.push(k));for(let E=0,C=S(v,Fe).length;E<C;E++){const M=S(v,Fe)[E],B=S(v,oe)===ut?{}:{...S(v,oe)};if(M==="*"){const O=S(v,ie)["*"];O&&(s.push(...V(this,Se,je).call(this,O,t,S(v,oe))),$(O,oe,B),_.push(O));continue}const[Y,F,j]=M;if(!p&&!(j instanceof RegExp))continue;const W=S(v,ie)[Y],q=o.slice(d).join("/");if(j instanceof RegExp){const O=j.exec(q);if(O){if(B[F]=O[0],s.push(...V(this,Se,je).call(this,W,t,S(v,oe),B)),Object.keys(S(W,ie)).length){$(W,oe,B);const U=((l=O[0].match(/\//))==null?void 0:l.length)??0;(i[U]||(i[U]=[])).push(W)}continue}}(j===!0||j.test(p))&&(B[F]=p,h?(s.push(...V(this,Se,je).call(this,W,t,B,S(v,oe))),S(W,ie)["*"]&&s.push(...V(this,Se,je).call(this,S(W,ie)["*"],t,B,S(v,oe)))):($(W,oe,B),_.push(W)))}}n=_.concat(i.shift()??[])}return s.length>1&&s.sort((d,c)=>d.score-c.score),[s.map(({handler:d,params:c})=>[d,c])]}},Me=new WeakMap,ie=new WeakMap,Fe=new WeakMap,nt=new WeakMap,oe=new WeakMap,Se=new WeakSet,je=function(t,a,s,r){const n=[];for(let o=0,i=S(t,Me).length;o<i;o++){const l=S(t,Me)[o],d=l[a]||l[se],c={};if(d!==void 0&&(d.params=Object.create(null),n.push(d),s!==ut||r&&r!==ut))for(let p=0,h=d.possibleKeys.length;p<h;p++){const _=d.possibleKeys[p],f=c[d.score];d.params[_]=r!=null&&r[_]&&!f?r[_]:s[_]??(r==null?void 0:r[_]),c[d.score]=!0}}return n},ot),We,Ha,Mr=(Ha=class{constructor(){N(this,"name","TrieRouter");G(this,We);$(this,We,new Ar)}add(e,t,a){const s=Wa(t);if(s){for(let r=0,n=s.length;r<n;r++)S(this,We).insert(e,s[r],a);return}S(this,We).insert(e,t,a)}match(e,t){return S(this,We).search(e,t)}},We=new WeakMap,Ha),ve=class extends Er{constructor(e={}){super(e),this.router=e.router??new Nr({routers:[new Ir,new Mr]})}},Lr=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(n=>typeof n=="string"?n==="*"?()=>n:o=>n===o?o:null:typeof n=="function"?n:o=>n.includes(o)?o:null)(a.origin),r=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(a.allowMethods);return async function(o,i){var c;function l(p,h){o.res.headers.set(p,h)}const d=await s(o.req.header("origin")||"",o);if(d&&l("Access-Control-Allow-Origin",d),a.credentials&&l("Access-Control-Allow-Credentials","true"),(c=a.exposeHeaders)!=null&&c.length&&l("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),o.req.method==="OPTIONS"){a.origin!=="*"&&l("Vary","Origin"),a.maxAge!=null&&l("Access-Control-Max-Age",a.maxAge.toString());const p=await r(o.req.header("origin")||"",o);p.length&&l("Access-Control-Allow-Methods",p.join(","));let h=a.allowHeaders;if(!(h!=null&&h.length)){const _=o.req.header("Access-Control-Request-Headers");_&&(h=_.split(/\s*,\s*/))}return h!=null&&h.length&&(l("Access-Control-Allow-Headers",h.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await i(),a.origin!=="*"&&o.header("Vary","Origin",{append:!0})}};function ss(){return`<!DOCTYPE html>
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
    abortController: null,
  };
  window.state = state;

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
  window.render = render;

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
      var actionCenter = null;
      try { actionCenter = await api('/action-center'); } catch(e) { actionCenter = null; }

      // Status cards — each card navigates to its feature
      html += '<div class="dash-cards">';
      html += '<div class="dash-card" onclick="showConversations()"><div class="dash-card-icon">&#128172;</div><div class="dash-card-value">' + (data.threads || 0) + '</div><div class="dash-card-label">Conversations</div></div>';
      html += '<div class="dash-card" onclick="viewTasksModal()"><div class="dash-card-icon">&#9200;</div><div class="dash-card-value">' + (data.active_schedules || 0) + '</div><div class="dash-card-label">Active Tasks</div></div>';
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'skills\\';renderView();"><div class="dash-card-icon">&#9889;</div><div class="dash-card-value">' + (data.skills_count || 0) + '</div><div class="dash-card-label">Skills</div></div>';
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'preferences\\';renderView();"><div class="dash-card-icon">&#127775;</div><div class="dash-card-value">' + (data.preferences_count || 0) + '</div><div class="dash-card-label">Preferences</div></div>';
      html += '<div class="dash-card" id="dashGmailCard" onclick="dashGmailClick()"><div class="dash-card-icon">&#9993;</div><div class="dash-card-value" id="dashGmailCount"><span style=\\'color:var(--text-muted);font-size:13px;\\'>...</span></div><div class="dash-card-label">Unread Gmail</div></div>';
      html += '<div class="dash-card" onclick="renderActionCenterModal()"><div class="dash-card-icon">&#8984;</div><div class="dash-card-value">' + ((actionCenter && actionCenter.counts && actionCenter.counts.open) || 0) + '</div><div class="dash-card-label">Action Center</div></div>';
      html += '<div class="dash-card" onclick="renderDocumentsModal()"><div class="dash-card-icon">&#128196;</div><div class="dash-card-value">' + ((actionCenter && actionCenter.counts && actionCenter.counts.documents) || 0) + '</div><div class="dash-card-label">Documents</div></div>';
      if (data.errors > 0) {
        html += '<div class="dash-card dash-card-error" onclick="state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'errors\\';renderView();"><div class="dash-card-icon">&#9888;</div><div class="dash-card-value" style="color:#e05a40;">' + data.errors + '</div><div class="dash-card-label">Errors</div></div>';
      }
      html += '</div>';

      if (actionCenter) {
        html += '<div class="command-grid">';
        html += commandPanel('Today', (actionCenter.today && actionCenter.today.reminders || []).slice(0, 4), 'No reminders due today.');
        html += commandPanel('Pending', (actionCenter.pending || []).slice(0, 4), 'No pending actions.');
        html += commandPanel('Needs approval', (actionCenter.needs_approval || []).slice(0, 4), 'No approvals waiting.');
        html += commandPanel('Documents', (actionCenter.documents || []).slice(0, 4), 'No recent documents.');
        html += '</div>';
        html += '<div class="quick-actions"><button class="btn btn-small" onclick="renderActionCenterModal()">Open Action Center</button><button class="btn btn-small" onclick="renderMemoryReviewModal()">Review Memory</button><button class="btn btn-small" onclick="renderDocumentsModal()">Document Library</button><button class="btn btn-small" onclick="prefillChat(\\'Give me my email digest with Gmail and Outlook separated.\\')">Email Digest</button><button class="btn btn-small" onclick="prefillChat(\\'Give me my weekly review.\\')">Weekly Review</button></div>';
      }

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

  function commandPanel(title, items, emptyText) {
    var html = '<div class="command-panel"><div class="dash-section-title">' + escapeHtml(title) + '</div>';
    if (!items || items.length === 0) return html + '<div class="command-empty">' + escapeHtml(emptyText) + '</div></div>';
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      html += '<div class="command-item"><div class="command-title">' + escapeHtml(it.title || it.name || it.body || 'Untitled') + '</div>';
      html += '<div class="command-meta">' + escapeHtml(it.status || it.type || it.source || '') + '</div></div>';
    }
    return html + '</div>';
  }

  function prefillChat(text) {
    startNewThread();
    setTimeout(function() { var input = document.getElementById('inputField'); if (input) { input.value = text; input.focus(); } }, 200);
  }

  function messageActions(content) {
    var safe = encodeURIComponent(content || '');
    return '<div class="msg-actions" data-msg="' + safe + '">' +
      '<button onclick="copyMsgAction(this)">Copy</button>' +
      '<button onclick="messageAction(this, 'Save your previous answer to a Google Doc.')">Save to Doc</button>' +
      '<button onclick="messageAction(this, 'Create a Gmail draft or Outlook browser draft from your previous answer; ask me for recipient and approval before sending.')">Email this</button>' +
      '<button onclick="messageAction(this, 'Turn your previous answer into a task or reminder.')">Task</button>' +
      '<button onclick="rememberMsgAction(this)">Remember</button>' +
      '<button onclick="messageAction(this, 'Make your previous answer shorter.')">Shorter</button>' +
      '<button onclick="messageAction(this, 'Make your previous answer more detailed.')">More detail</button>' +
      '</div>';
  }

  function actionContent(btn) { var wrap = btn.closest('.msg-actions'); return decodeURIComponent(wrap ? wrap.getAttribute('data-msg') || '' : ''); }
  function copyMsgAction(btn) { navigator.clipboard && navigator.clipboard.writeText(actionContent(btn)); showToast('Copied', 'success'); }
  function messageAction(btn, instruction) { prefillChat(instruction); }
  function rememberMsgAction(btn) { prefillChat('Remember this: ' + actionContent(btn).slice(0, 2000)); }

  async function renderActionCenterModal() {
    var data = await api('/action-center');
    var html = '<div class="modal-backdrop" onclick="closeModal(event)"><div class="modal-card wide" onclick="event.stopPropagation()"><div class="modal-header"><h3>Action Center</h3><button onclick="closeModal()">&times;</button></div>';
    html += '<div class="command-grid modal-grid">' + commandPanel('Today', (data.today && data.today.reminders || []), 'No reminders due today.') + commandPanel('Pending', data.pending || [], 'No pending actions.') + commandPanel('Needs approval', data.needs_approval || [], 'No approvals waiting.') + commandPanel('Recent documents', data.documents || [], 'No documents yet.') + '</div></div></div>';
    showModal(html);
  }

  async function renderMemoryReviewModal() {
    var data = await api('/memory/review');
    var html = '<div class="modal-backdrop" onclick="closeModal(event)"><div class="modal-card wide" onclick="event.stopPropagation()"><div class="modal-header"><h3>Memory Review</h3><button onclick="closeModal()">&times;</button></div>';
    html += '<div class="dash-section-title">Suggestions</div>';
    var suggestions = data.suggestions || [];
    if (!suggestions.length) html += '<div class="command-empty">No memory suggestions waiting.</div>';
    for (var i = 0; i < suggestions.length; i++) {
      var s = suggestions[i];
      html += '<div class="review-row"><div><strong>' + escapeHtml(s.title) + '</strong><div class="command-meta">' + escapeHtml(s.type) + ' · importance ' + (s.importance || 5) + '</div><div>' + escapeHtml(s.content) + '</div></div><div><button class="btn btn-small" onclick="decideMemory(' + s.id + ', 'accept')">Accept</button><button class="btn btn-small btn-secondary" onclick="decideMemory(' + s.id + ', 'reject')">Reject</button></div></div>';
    }
    html += '<div class="dash-section-title">Stored Memory</div>';
    var memories = data.memories || [];
    for (var j = 0; j < memories.length; j++) {
      var m = memories[j];
      html += '<div class="review-row"><div><strong>' + escapeHtml(m.title) + '</strong><div class="command-meta">' + escapeHtml(m.type) + ' · ' + escapeHtml(m.tier || '') + '</div><div>' + escapeHtml(m.content) + '</div></div><div><button class="btn btn-small" onclick="memoryTier(' + m.id + ','' + (m.tier === 'working' ? 'demote' : 'promote') + '')">' + (m.tier === 'working' ? 'Archive' : 'Activate') + '</button></div></div>';
    }
    html += '</div></div>';
    showModal(html);
  }

  async function renderDocumentsModal() {
    var data = await api('/documents');
    var docs = data.documents || [];
    var html = '<div class="modal-backdrop" onclick="closeModal(event)"><div class="modal-card wide" onclick="event.stopPropagation()"><div class="modal-header"><h3>Document Library</h3><button onclick="closeModal()">&times;</button></div>';
    if (!docs.length) html += '<div class="command-empty">Uploaded files will appear here.</div>';
    for (var i = 0; i < docs.length; i++) {
      var d = docs[i];
      html += '<div class="review-row"><div><strong>' + escapeHtml(d.name) + '</strong><div class="command-meta">' + escapeHtml(d.source || 'upload') + ' · ' + escapeHtml(d.status || 'uploaded') + '</div><div>' + escapeHtml(d.summary || 'Summary pending.') + '</div></div><div><button class="btn btn-small" onclick="summarizeDocument(' + d.id + ')">Summarize</button><button class="btn btn-small btn-secondary" onclick="askDocument('' + escapeHtml(d.name).replace(/'/g, "\\'") + '')">Ask</button></div></div>';
    }
    html += '</div></div>';
    showModal(html);
  }

  function showModal(html) { var old = document.getElementById('modalRoot'); if (old) old.remove(); var div = document.createElement('div'); div.id = 'modalRoot'; div.innerHTML = html; document.body.appendChild(div); }
  function closeModal(e) { if (e && e.target !== e.currentTarget) return; var el = document.getElementById('modalRoot'); if (el) el.remove(); }
  async function decideMemory(id, action) { await api('/memory-suggestions/' + id + '/' + action, { method:'POST' }); showToast(action === 'accept' ? 'Memory saved' : 'Suggestion rejected', 'success'); renderMemoryReviewModal(); }
  async function memoryTier(id, action) { await api('/memory/' + id + '/' + action, { method:'POST' }); renderMemoryReviewModal(); }
  async function summarizeDocument(id) { var r = await api('/documents/' + id + '/summarize', { method:'POST' }); showToast(r.success ? 'Summary ready' : (r.message || 'Summary pending'), r.success ? 'success' : ''); renderDocumentsModal(); }
  function askDocument(name) { closeModal(); prefillChat('Read or summarize the uploaded document named "' + name + '".'); }

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
        '<div id="fileChips" style="display:none;flex-wrap:wrap;gap:4px;margin-bottom:6px;"></div>' +
        '<textarea class="input-field" id="inputField" placeholder="Message Karna…" rows="3"></textarea>' +
        '<div class="input-toolbar">' +
          '<button class="input-btn" id="attachBtn" title="Attach file">&#128206;</button>' +
          '<div style="flex:1"></div>' +
          '<button class="input-btn send-btn" id="sendBtn" title="Send (Ctrl+Enter)">&#10148;</button>' +
        '</div>' +
      '</div></div>';

    var input = document.getElementById('inputField');
    input.onkeydown = function(e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleSend(); } };
    input.oninput = function() { input.style.height = 'auto'; input.style.height = Math.max(72, Math.min(input.scrollHeight, window.innerHeight * 0.4)) + 'px'; };
    input.style.height = '72px';
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
  window.renderActionCenterModal = renderActionCenterModal;
  window.renderMemoryReviewModal = renderMemoryReviewModal;
  window.renderDocumentsModal = renderDocumentsModal;
  window.prefillChat = prefillChat;
  window.closeModal = closeModal;
  window.decideMemory = decideMemory;
  window.memoryTier = memoryTier;
  window.summarizeDocument = summarizeDocument;
  window.askDocument = askDocument;
  window.copyMsgAction = copyMsgAction;
  window.messageAction = messageAction;
  window.rememberMsgAction = rememberMsgAction;

  async function loadThreadMessages(threadId) {
    var messagesEl = document.getElementById('messages');
    if (!messagesEl) return;
    messagesEl.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">Loading…</div>';
    var data = await api('/chat/threads/' + threadId + '/messages?limit=100');
    if (!messagesEl.isConnected) return; // DOM replaced while loading
    messagesEl.innerHTML = '';
    if (data.error) {
      messagesEl.innerHTML = '<div style="padding:24px;text-align:center;color:var(--danger);font-size:13px;">Couldn’t load messages — ' + escapeHtml(data.error) + '<br><br><a href="#" onclick="loadThreadMessages(' + threadId + ');return false;" style="color:var(--accent);">Try again</a></div>';
      return;
    }
    if (!data.messages || data.messages.length === 0) {
      messagesEl.innerHTML = '<div class="welcome"><h2>New conversation</h2><p>Start typing below. ' + escapeHtml(state.assistantName || 'Karna') + ' is listening.</p></div>';
      return;
    }
    for (var i = 0; i < data.messages.length; i++) {
      var msg = data.messages[i];
      var group = document.createElement('div');
      group.className = 'message-group';
      if (msg.role === 'user') { group.innerHTML = '<div class="msg-user">' + escapeHtml(msg.content) + '</div>'; }
      else { group.innerHTML = '<div class="msg-assistant">' + md(msg.content) + messageActions(msg.content) + '</div>'; }
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

  function updateSendBtn() {
    var btn = document.getElementById('sendBtn');
    if (!btn) return;
    if (state.loading) {
      btn.innerHTML = '&#9632;';
      btn.title = 'Stop';
      btn.classList.add('stop-btn');
      btn.onclick = handleStop;
    } else {
      btn.innerHTML = '&#10148;';
      btn.title = 'Send (Ctrl+Enter)';
      btn.classList.remove('stop-btn');
      btn.onclick = handleSend;
    }
  }

  function handleStop() {
    if (state.abortController) {
      state.abortController.abort();
    }
  }

  async function handleSend() {
    var input = document.getElementById('inputField');
    var text = input.value.trim();
    var hasFiles = state.pendingFiles.length > 0;
    if ((!text && !hasFiles) || state.loading) return;
    input.value = ''; input.style.height = 'auto';
    state.loading = true;
    state.abortController = new AbortController();
    updateSendBtn();

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
        signal: state.abortController ? state.abortController.signal : undefined,
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
        state.abortController = null;
        updateSendBtn();
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
        streamingText.innerHTML = md(accumulatedText) + messageActions(accumulatedText);
      }

    } catch(err) {
      showThinking(false);
      if (streamingContainer) streamingContainer.remove();
      if (!err || err.name !== 'AbortError') {
        addMessage('assistant', 'Connection lost. Check your network and try again.', 'error');
      }
    }
    state.loading = false;
    state.abortController = null;
    updateSendBtn();
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
  window.startNewThread = startNewThread;

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
        if (n.type === 'reminder') {
          html += '<div class="notif-actions"><button data-notif-action="done" data-id="' + n.id + '">Done</button><button data-notif-action="snooze10" data-id="' + n.id + '">10m</button><button data-notif-action="snooze60" data-id="' + n.id + '">1h</button><button data-notif-action="tomorrow" data-id="' + n.id + '">Tomorrow 9</button></div>';
        }
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
      list.querySelectorAll('[data-notif-action]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          var id = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-notif-action');
          var path = '/chat/notifications/' + id + '/done'; var body = null;
          if (act === 'snooze10') { path = '/chat/notifications/' + id + '/snooze'; body = JSON.stringify({ minutes: 10 }); }
          if (act === 'snooze60') { path = '/chat/notifications/' + id + '/snooze'; body = JSON.stringify({ minutes: 60 }); }
          if (act === 'tomorrow') { path = '/chat/notifications/' + id + '/reschedule'; body = JSON.stringify({ preset: 'tomorrow_9' }); }
          api(path, { method:'POST', body: body }).then(function(){ loadNotificationCount(); loadNotifications(); showToast('Reminder updated', 'success'); });
        });
      });
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
      { icon: '🗝', label: 'Secret Vault', section: 'vault' },
      { icon: '💬', label: 'Preferences', section: 'preferences' },
    ]},
    { group: 'Integrations', items: [
      { icon: '✈️', label: 'Telegram', section: 'telegram' },
      { icon: '🔔', label: 'Proactive & Briefings', section: 'proactive' },
      { icon: '📚', label: 'Memory Review', section: '_memory_modal' },
      { icon: '📄', label: 'Document Library', section: '_documents_modal' },
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
    profile: 'Profile', credentials: 'API Keys', vault: 'Secret Vault', preferences: 'Preferences',
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
          case 'vault': return await renderVaultTab(target);
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
          } else if (item.section === '_memory_modal') {
            navHtml += '<div class="settings-nav-item" onclick="renderMemoryReviewModal()"><span class="settings-nav-item-icon">' + item.icon + '</span>' + item.label + '</div>';
          } else if (item.section === '_documents_modal') {
            navHtml += '<div class="settings-nav-item" onclick="renderDocumentsModal()"><span class="settings-nav-item-icon">' + item.icon + '</span>' + item.label + '</div>';
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
            } else if (item2.section === '_memory_modal') {
              listHtml += settingsRowLink(item2.icon, item2.label, 'renderMemoryReviewModal()');
            } else if (item2.section === '_documents_modal') {
              listHtml += settingsRowLink(item2.icon, item2.label, 'renderDocumentsModal()');
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

    container.innerHTML = html;
    loadGoogleStatus();
  }

  async function loadVaultEntries() {
    var el = document.getElementById('vaultEntries');
    if (!el) return;
    var data = await api('/settings/site-vault');
    if (!data.entries || data.entries.length === 0) {
      el.innerHTML = '<div style="font-size:12px;color:var(--text-muted);font-style:italic;padding:8px 0;">No credentials saved yet.</div>';
      return;
    }
    var h = '';
    for (var i = 0; i < data.entries.length; i++) {
      var e = data.entries[i];
      var date = e.updated_at ? new Date(e.updated_at).toLocaleDateString() : '';
      h += '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--input-bg);border:1px solid var(--border);border-radius:8px;margin-bottom:6px;">';
      h += '<div>';
      h += '<div style="font-size:13px;color:var(--text);font-weight:500;">' + escapeHtml(e.name) + '</div>';
      if (date) h += '<div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Saved ' + date + '</div>';
      h += '</div>';
      h += '<button class="btn btn-small btn-danger" onclick="deleteVaultEntry(' + e.id + ')">Remove</button>';
      h += '</div>';
    }
    el.innerHTML = h;
  }

  window.saveVaultEntry = async function() {
    var nameEl = document.getElementById('vaultName');
    var userEl = document.getElementById('vaultUser');
    var passEl = document.getElementById('vaultPass');
    var name = nameEl ? nameEl.value.trim() : '';
    var username = userEl ? userEl.value.trim() : '';
    var password = passEl ? passEl.value : '';
    var msg = document.getElementById('vaultMsg');
    if (!name || !username || !password) { if (msg) { msg.style.color = 'var(--danger)'; msg.textContent = 'All fields required.'; } return; }
    var res = await api('/settings/site-vault', { method: 'PUT', body: JSON.stringify({ name, username, password }) });
    if (res.success) {
      if (nameEl) nameEl.value = '';
      if (userEl) userEl.value = '';
      if (passEl) passEl.value = '';
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

  async function renderVaultTab(container) {
    var html = '';
    html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:20px;line-height:1.6;">';
    html += 'Store login credentials for websites. Karna checks this vault automatically when you ask it to access a password-protected site. Credentials are encrypted with your PIN.';
    html += '</div>';

    // Saved entries
    html += '<div id="vaultEntries" style="margin-bottom:20px;"></div>';

    // Add new entry form
    html += '<div style="background:var(--input-bg);border:1px solid var(--border);border-radius:8px;padding:16px;">';
    html += '<div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;">Add Credential</div>';
    html += '<div style="display:flex;flex-direction:column;gap:8px;">';
    html += '<input id="vaultName" type="text" placeholder="Site name (e.g. Outlook, LinkedIn)" autocomplete="off" style="background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:9px 12px;font-size:13px;">';
    html += '<input id="vaultUser" type="text" placeholder="Username or email" autocomplete="off" style="background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:9px 12px;font-size:13px;">';
    html += '<input id="vaultPass" type="password" placeholder="Password" autocomplete="new-password" style="background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:9px 12px;font-size:13px;">';
    html += '<div style="display:flex;align-items:center;gap:10px;margin-top:4px;">';
    html += '<button class="btn btn-small" onclick="saveVaultEntry()">Save</button>';
    html += '<span id="vaultMsg" style="font-size:12px;"></span>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;
    loadVaultEntries();
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

  function removeGoogleBanner() {
    var b = document.getElementById('googleDisconnectedBanner');
    if (b) b.remove();
    var ia = document.querySelector('.input-area');
    if (ia) ia.style.paddingBottom = '';
  }

  async function checkGoogleConnectionBanner() {
    try {
      var status = await api('/settings/google/status');
      var existing = document.getElementById('googleDisconnectedBanner');
      if (!status.connected && status.oauth_client_configured) {
        if (!existing) {
          var isMobile = window.innerWidth <= 640;
          var banner = document.createElement('div');
          banner.id = 'googleDisconnectedBanner';
          banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:999;' +
            'background:#7a5c00;color:#fff5cc;font-size:13px;' +
            'padding:' + (isMobile ? '10px 14px' : '8px 16px') + ';' +
            'display:flex;align-items:center;justify-content:space-between;gap:12px;';
          banner.innerHTML =
            '<span>⚠️ Google disconnected — Docs, Sheets, Calendar, Gmail unavailable.</span>' +
            '<span style="display:flex;gap:10px;align-items:center;">' +
              '<a href="#" style="color:#fff5cc;text-decoration:underline;font-size:13px;" ' +
                'onclick="event.preventDefault();state.prevView=state.view;state.view=\\'settings\\';state.settingsSection=\\'credentials\\';renderView();">' +
                'Connect →</a>' +
              '<button onclick="removeGoogleBanner();" ' +
                'style="background:none;border:none;color:#fff5cc;cursor:pointer;font-size:18px;line-height:1;padding:0;">' +
                '×</button>' +
            '</span>';
          document.body.appendChild(banner);
          // Push input area up so the fixed banner doesn't overlap it
          var ia = document.querySelector('.input-area');
          if (ia) ia.style.paddingBottom = 'calc(44px + var(--safe-bottom))';
        }
      } else {
        removeGoogleBanner();
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
</html>`}const sa="AES-GCM",$r=256;async function rs(e){const t=new TextEncoder,a=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},a,{name:sa,length:$r},!1,["encrypt","decrypt"])}async function it(e,t){const a=await rs(t),s=crypto.getRandomValues(new Uint8Array(12)),r=new TextEncoder,n=await crypto.subtle.encrypt({name:sa,iv:s},a,r.encode(e)),o=new Uint8Array(s.length+new Uint8Array(n).length);return o.set(s),o.set(new Uint8Array(n),s.length),btoa(String.fromCharCode(...o))}async function K(e,t){const a=await rs(t),s=new Uint8Array(atob(e).split("").map(i=>i.charCodeAt(0))),r=s.slice(0,12),n=s.slice(12),o=await crypto.subtle.decrypt({name:sa,iv:r},a,n);return new TextDecoder().decode(o)}async function $t(e){const a=new TextEncoder().encode(e+"karna-pin-salt"),s=await crypto.subtle.digest("SHA-256",a);return btoa(String.fromCharCode(...new Uint8Array(s)))}async function ns(e,t){return await $t(e)===t}const Pt=Object.freeze(Object.defineProperty({__proto__:null,decrypt:K,encrypt:it,hashPin:$t,verifyPin:ns},Symbol.toStringTag,{value:"Module"})),Le=new ve;Le.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});Le.post("/setup",async e=>{const{username:t,name:a,pin:s,personality_prompt:r,timezone:n}=await e.req.json();if(!t||!a||!s)return e.json({error:"Username, name, and PIN are required"},400);if(s.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const i=await $t(s);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,a,i,r||"",n||"Asia/Kolkata").run();const l=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),d=crypto.randomUUID(),c=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(d,l.id,"web",c).run(),e.json({success:!0,sessionId:d,user:{id:l.id,username:l.username,name:l.name}})});Le.post("/login",async e=>{const{username:t,pin:a}=await e.req.json();if(!t||!a)return e.json({error:"Username and PIN required"},400);const s=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!s)return e.json({error:"User not found"},404);if(!await ns(a,s.pin_hash))return e.json({error:"Invalid PIN"},401);const n=crypto.randomUUID(),o=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(n,s.id,"web",o).run(),e.json({success:!0,sessionId:n,user:{id:s.id,username:s.username,name:s.name}})});Le.post("/logout",async e=>{var a;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});Le.get("/users/hints",async e=>{const a=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(s=>{var r;return{username:s.username,name_hint:s.name.split(" ")[0],created:((r=s.created_at)==null?void 0:r.split(" ")[0])||""}});return e.json({users:a,count:a.length})});Le.post("/reset-pin",async e=>{var i;const{username:t,name:a,new_pin:s}=await e.req.json();if(!t||!a||!s)return e.json({error:"Username, display name, and new PIN are required"},400);if(s.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const r=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!r)return e.json({error:"User not found"},404);if(r.name.toLowerCase().trim()!==a.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const n=await $t(s);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,r.id).run();const o=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(r.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(r.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((i=o.meta)==null?void 0:i.changes)||0})});Le.get("/me",async e=>{var s;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return a?e.json({user:{id:a.uid,username:a.username,name:a.name,role:a.role,timezone:a.timezone}}):e.json({error:"Invalid or expired session"},401)});const ft={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},Pr=55e3;function os(e,t){return Promise.race([e,new Promise((a,s)=>setTimeout(()=>s(new Error(`LLM timeout: ${t} did not respond within 25 seconds. Try again or switch providers in Settings → Keys.`)),Pr))])}async function P(e,t,a,s,r,n={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,a,s,r,JSON.stringify(n)).run()}catch(o){console.error("Failed to log error:",o)}}async function qt(e,t,a,s,r,n){try{const o=`provider_alert:${s}:${a}`;if(await e.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(t,o).first())return;await P(e,t,"provider_alert",o,`${s} failed: ${n.substring(0,200)}`,{alertType:a,failedProvider:s,fallbackProvider:r});let l;a==="all_providers_down"?l=`🚨 All LLM providers failed

Last error from ${s}: ${ba(n)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:l=`⚠️ LLM Provider Issue

${s}: ${ba(n)}
Switched to: ${r}

Check your ${s} API credit balance or key.`;const{decrypt:d}=await Promise.resolve().then(()=>Pt),c=await e.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(t).first();if(!(c!=null&&c.telegram_chat_id))return;const p=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(t).first();if(!p)return;const h=await d(p.encrypted_value,c.pin_hash);await fetch(`https://api.telegram.org/bot${h}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:c.telegram_chat_id,text:l})})}catch(o){console.error("Failed to send provider alert:",o)}}function ba(e){return e.includes("credit balance")||e.includes("insufficient")||e.includes("402")?"Credits exhausted or balance too low":e.includes("429")||e.includes("rate_limit")||e.includes("quota")?"Rate limit / quota exceeded":e.includes("401")||e.includes("authentication")||e.includes("invalid")&&e.includes("key")?"API key invalid or expired":e.includes("403")?"Access denied (key may lack permissions)":e.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":e.includes("properties field not found")?"Schema compatibility issue":"API error"}class is{constructor(t,a="claude-sonnet-4-20250514",s="https://api.anthropic.com",r="anthropic"){N(this,"name");N(this,"apiKey");N(this,"model");N(this,"apiBase");this.apiKey=t,this.model=a,this.apiBase=s,this.name=r}async chat(t,a){var c,p,h,_;const s=t.find(f=>f.role==="system"),r=t.filter(f=>f.role!=="system"),n={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:r.map(f=>({role:f.role,content:f.content}))};s&&(n.system=s.content),a!=null&&a.tools&&a.tools.length>0&&(n.tools=a.tools.map(f=>({name:f.name,description:f.description,input_schema:f.parameters})),a.toolChoice==="required"&&(n.tool_choice={type:"any"}));const o=await os(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(n)}),this.name);if(!o.ok){const f=await o.text();throw new Error(this.name+" API error "+o.status+": "+f)}const i=await o.json(),l=((c=i.content)==null?void 0:c.filter(f=>f.type==="text"))||[],d=((p=i.content)==null?void 0:p.filter(f=>f.type==="tool_use"))||[];return{content:l.map(f=>f.text).join(`
`),toolCalls:d.map(f=>({id:f.id,name:f.name,arguments:f.input})),usage:{promptTokens:((h=i.usage)==null?void 0:h.input_tokens)||0,completionTokens:((_=i.usage)==null?void 0:_.output_tokens)||0}}}async streamChat(t,a){const s=t.find(d=>d.role==="system"),r=t.filter(d=>d.role!=="system"),n={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:r.map(d=>({role:d.role,content:d.content}))};s&&(n.system=s.content);const o=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(n)});if(!o.ok){const d=await o.text();throw new Error(this.name+" stream error "+o.status+": "+d)}const i=o.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(d){var f;const{done:c,value:p}=await i.read();if(c){d.close();return}const _=l.decode(p,{stream:!0}).split(`
`);for(const b of _)if(b.startsWith("data: ")){const v=b.slice(6);if(v==="[DONE]")continue;try{const k=JSON.parse(v);k.type==="content_block_delta"&&((f=k.delta)!=null&&f.text)&&d.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:k.delta.text})+`

`))}catch{}}}})}}function Br(e){const t={},a=e||{};if(t.type=a.type||"object",t.type==="object"){const s=a.properties;if(s&&typeof s=="object"&&Object.keys(s).length>0){const r={};for(const[n,o]of Object.entries(s))o&&typeof o=="object"?r[n]=Zt(o):r[n]=o;t.properties=r}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(a.required)?t.required=a.required:t.required=[]}return a.description&&(t.description=a.description),t}function Zt(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const a=t.properties;if(a&&typeof a=="object"&&Object.keys(a).length>0){const s={};for(const[r,n]of Object.entries(a))n&&typeof n=="object"?s[r]=Zt(n):s[r]=n;t.properties=s}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=Zt(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class ls{constructor(t,a,s,r){N(this,"name");N(this,"apiKey");N(this,"model");N(this,"apiBase");this.apiKey=t,this.model=a,this.apiBase=s.replace(/\/+$/,""),this.name=r}async chat(t,a){var l,d,c,p,h,_;const s={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:t.map(f=>({role:f.role,content:f.content}))},r=this.apiBase.includes("routellm.abacus.ai");if(a!=null&&a.tools&&a.tools.length>0&&r)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");a!=null&&a.tools&&a.tools.length>0&&(s.tools=a.tools.map(f=>({type:"function",function:{name:f.name,description:f.description,parameters:Br(f.parameters||{})}})),a.toolChoice==="required"&&(s.tool_choice="required"));const n=await os(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(s)}),this.name);if(!n.ok){const f=await n.text();throw new Error(this.name+" API error "+n.status+": "+f)}const o=await n.json(),i=(l=o.choices)==null?void 0:l[0];return{content:((d=i==null?void 0:i.message)==null?void 0:d.content)||"",toolCalls:(p=(c=i==null?void 0:i.message)==null?void 0:c.tool_calls)==null?void 0:p.map(f=>({id:f.id,name:f.function.name,arguments:(()=>{try{return typeof f.function.arguments=="string"?JSON.parse(f.function.arguments||"{}"):f.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((h=o.usage)==null?void 0:h.prompt_tokens)||0,completionTokens:((_=o.usage)==null?void 0:_.completion_tokens)||0}}}async streamChat(t,a){const s={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:t.map(i=>({role:i.role,content:i.content}))},r=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(s)});if(!r.ok){const i=await r.text();throw new Error(this.name+" stream error "+r.status+": "+i)}const n=r.body.getReader(),o=new TextDecoder;return new ReadableStream({async pull(i){var h,_,f;const{done:l,value:d}=await n.read();if(l){i.close();return}const p=o.decode(d,{stream:!0}).split(`
`);for(const b of p)if(b.startsWith("data: ")){const v=b.slice(6);if(v==="[DONE]")continue;try{const E=(f=(_=(h=JSON.parse(v).choices)==null?void 0:h[0])==null?void 0:_.delta)==null?void 0:f.content;E&&i.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:E})+`

`))}catch{}}}})}}function Xt(e,t,a,s){const r=ft[e];if(!r)throw new Error(`Unknown LLM provider: ${e}`);const n=s||r.defaultModel;return r.apiFormat==="anthropic"?new is(t,n,r.apiBase,a):new ls(t,n,r.apiBase,a)}class ds{constructor(){N(this,"errorLog",new Map);N(this,"usageLog",new Map)}async pickProvider(t){const a=Date.now(),s=t.filter(r=>{const n=this.errorLog.get(r);return n?n.cooldownUntil<=a:!0});return s.length>0?s[0]:null}async recordUsage(t,a){const s=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:s.tokens+a,requests:s.requests+1})}async recordError(t,a,s=5){this.errorLog.set(t,{error:a,cooldownUntil:Date.now()+s*60*1e3})}}const jr=["llm_slot_1","llm_slot_2","llm_slot_3"],Ur=["anthropic","openai"];async function lt(e,t,a){const{decrypt:s}=await Promise.resolve().then(()=>Pt),r=new ds,n=[];for(const p of jr){const h=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,p).first();if(h)try{const _=await s(h.encrypted_value,a),f=JSON.parse(_);if(f.provider&&f.apiKey&&ft[f.provider]){const v=f.provider,k=Xt(f.provider,f.apiKey,v,f.model);n.push({name:v,provider:k})}}catch(_){console.error(`Failed to load ${p}:`,_)}}const o=new Set(n.map(p=>p.name));for(const p of Ur){if(o.has(p))continue;const h=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,p).first();if(h)try{const _=await s(h.encrypted_value,a);if(ft[p]){const b=Xt(p,_,p);n.push({name:p,provider:b})}}catch{console.error(`Failed to decrypt legacy ${p} key`)}}if(n.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const i=n.map(p=>p.name),l=await r.pickProvider(i);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:n[0].provider,rotation:r};const d=n.find(p=>p.name===l);return{provider:Hr(d.provider,n,r,e,t),rotation:r}}function Hr(e,t,a,s,r){const n=i=>i.includes("401")||i.includes("403")||i.includes("authentication")||i.includes("credit balance")||i.includes("invalid")&&i.includes("key")||i.includes("properties field not found")||i.includes("TOOLS_UNSUPPORTED"),o=i=>i.includes("429")||i.toLowerCase().includes("rate limit")||i.toLowerCase().includes("too many requests");return t.length<=1?{name:e.name,async chat(i,l){try{return await e.chat(i,l)}catch(d){const c=d.message||"";throw n(c)&&!c.includes("TOOLS_UNSUPPORTED")&&qt(s,r,"all_providers_down",e.name,null,c),d}},async streamChat(i,l){return await e.streamChat(i,l)}}:{name:e.name,async chat(i,l){try{return await e.chat(i,l)}catch(d){const c=d.message||"",p=o(c);if(!n(c)&&!p)throw d;const h=c.includes("TOOLS_UNSUPPORTED"),_=h?1:p?10:1440;console.warn(`Provider ${e.name} ${p?"rate limited":h?"tools unsupported":"auth/billing error"}, trying fallback...`),await a.recordError(e.name,c,_);const f=t.filter(b=>b.name!==e.name);for(const b of f)try{const v=await b.provider.chat(i,l);return this.name=b.name,!h&&!p&&qt(s,r,"provider_switched",e.name,b.name,c),v}catch(v){const k=v.message||"";if(n(k)||o(k)){await a.recordError(b.name,k,o(k)?10:1440);continue}throw v}throw qt(s,r,"all_providers_down",e.name,null,c),new Error(`All LLM providers failed. Primary (${e.name}): ${c.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(i,l){return await e.streamChat(i,l)}}}const Qe=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:is,OpenAICompatibleProvider:ls,ProviderRotation:ds,createProviderFromConfig:Xt,createRotatingProvider:lt,logError:P},Symbol.toStringTag,{value:"Module"})),zt=20,Gr=2e3,Fr=2e3,cs=4;function Wr(e){return Math.ceil(e.length/cs)}function _a(e,t){const a=t*cs;return e.length<=a?e:e.slice(0,a)+`
[...truncated to fit token budget]`}class z{constructor(t){this.db=t}async store(t,a,s,r,n=5,o="working"){const i=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,a,s).first();i?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r,n,o,i.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,a,s,r,n,o).run(),o==="working"&&await this.enforceWorkingMemoryCap(t)}async cleanupDoneTasks(t){await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND type = 'task' AND status = 'done' AND tier = 'working'
       AND updated_at < datetime('now', '-7 days')`).bind(t).run()}async enforceWorkingMemoryCap(t){const a=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((a==null?void 0:a.cnt)||0)>zt){const s=((a==null?void 0:a.cnt)||0)-zt;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND tier = 'working' AND importance < 8 AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' AND importance < 8
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,s).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,zt).all()).results||[]}async getAll(t,a,s=50){return a?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,a,s).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,s).all()).results||[]}async search(t,a,s=10){const n=(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${a}%`,`%${a}%`,s).all()).results||[];if(n.length>0)return await this.touchMemories(t,n.map(c=>c.id)),n;const o=a.split(/\s+/).filter(c=>c.length>2);if(o.length===0)return[];const i=new Map,l=new Map;for(const c of o){const p=await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) LIMIT ?").bind(t,`%${c}%`,`%${c}%`,s*2).all();for(const h of p.results||[])i.set(h.id,(i.get(h.id)||0)+1),l.set(h.id,h)}const d=[...l.values()].sort((c,p)=>(i.get(p.id)||0)-(i.get(c.id)||0)).slice(0,s);return d.length>0&&await this.touchMemories(t,d.map(c=>c.id)),d}async searchLongTerm(t,a,s=5){const n=(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${a}%`,`%${a}%`,s).all()).results||[];if(n.length>0)return await this.touchMemories(t,n.map(c=>c.id)),n;const o=a.split(/\s+/).filter(c=>c.length>2);if(o.length===0)return[];const i=new Map,l=new Map;for(const c of o){const p=await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) LIMIT ?").bind(t,`%${c}%`,`%${c}%`,s*2).all();for(const h of p.results||[])i.set(h.id,(i.get(h.id)||0)+1),l.set(h.id,h)}const d=[...l.values()].sort((c,p)=>(i.get(p.id)||0)-(i.get(c.id)||0)).slice(0,s);return d.length>0&&await this.touchMemories(t,d.map(c=>c.id)),d}async touchMemories(t,a){for(const s of a)await this.db.prepare("UPDATE memory SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t).run()}async update(t,a,s){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t,a).run()}async promote(t,a){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,a).run(),await this.enforceWorkingMemoryCap(a)}async demote(t,a){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,a).run()}async remove(t,a){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,a).run()}async buildContext(t){const a=await this.getWorkingMemory(t);if(a.length===0)return"";const s={};for(const n of a)s[n.type]||(s[n.type]=[]),s[n.type].push(n);let r=`
## Working Memory (Active Context)
`;for(const[n,o]of Object.entries(s)){r+=`
### ${n.charAt(0).toUpperCase()+n.slice(1)}s
`;for(const i of o)r+=`- **${i.title}**: ${i.content}
`}return _a(r,Gr)}static truncatePersonality(t){return _a(t,Fr)}async getRecentConversations(t,a=20,s){return s?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,s,a).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,a).all()).results||[]).reverse()}async storeMessage(t,a,s,r,n="{}",o){const i=Wr(r);o?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,a,s,r,n,i,o).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,a,s,r,n,i).run()}async compactHistory(t,a=30){const s=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((s==null?void 0:s.cnt)||0)<=a*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,a).run()}}const qr=Object.freeze(Object.defineProperty({__proto__:null,MemoryService:z},Symbol.toStringTag,{value:"Module"})),zr="https://accounts.google.com/o/oauth2/v2/auth",us="https://oauth2.googleapis.com/token",Kr="https://www.googleapis.com/oauth2/v2/userinfo",Yr=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let be=null;async function Qt(e,t,a){const s=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!s)return null;try{const r=await K(s.encrypted_value,a);return JSON.parse(r)}catch{return null}}async function Jr(e,t,a,s){const r=await it(JSON.stringify(s),a);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,r).run()}function ms(e,t,a){const s=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:Yr,access_type:"offline",prompt:"consent",state:a,include_granted_scopes:"true"});return`${zr}?${s}`}async function ps(e,t,a,s){const r=await fetch(us,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:a,redirect_uri:s,grant_type:"authorization_code"})}),n=await r.text();if(!r.ok)throw new Error(`Token exchange failed (${r.status}): ${n.substring(0,300)}`);return JSON.parse(n)}async function Vr(e,t,a){const s=await fetch(us,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:a,grant_type:"refresh_token"})}),r=await s.text();if(!s.ok)throw s.status===400||s.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${s.status}): ${r.substring(0,300)}`);return JSON.parse(r)}async function hs(e){const t=await fetch(Kr,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function dt(e,t,a,s,r){if(!s||!r)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(be&&be.userId===t&&be.expiresAt>Date.now()/1e3+60){const i=await Qt(e,t,a);return{token:be.token,email:(i==null?void 0:i.email)||"unknown"}}const n=await Qt(e,t,a);if(!n)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const o=await Vr(n.refresh_token,s,r);return be={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{token:o.access_token,email:n.email}}async function ra(e,t,a){try{const s=await Qt(e,t,a);return s?{connected:!0,email:s.email,connectedAt:s.connected_at}:{connected:!1}}catch{return{connected:!1}}}function gs(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function fs(e,t,a,s,r,n,o){const i=await ps(s,n,o,r);if(!i.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await hs(i.access_token),d={refresh_token:i.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await Jr(e,t,a,d),be={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{email:l.email,name:l.name}}async function ys(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(be==null?void 0:be.userId)===t&&(be=null)}const $e="https://sheets.googleapis.com/v4/spreadsheets";class vs{constructor(t,a,s,r,n){this.db=t,this.userId=a,this.pinHash=s,this.clientId=r,this.clientSecret=n}async authHeaders(){const{token:t}=await dt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,a){const s=await this.authHeaders(),r=encodeURIComponent(a),n=await fetch(`${$e}/${t}/values/${r}`,{headers:s});if(!n.ok){const i=await n.text();throw new Error(`Sheets read failed (${n.status}): ${i}`)}return(await n.json()).values||[]}async writeRange(t,a,s){const r=await this.authHeaders(),n=encodeURIComponent(a),o=await fetch(`${$e}/${t}/values/${n}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:r,body:JSON.stringify({range:a,majorDimension:"ROWS",values:s})});if(!o.ok){const l=await o.text();throw new Error(`Sheets write failed (${o.status}): ${l}`)}return{updatedCells:(await o.json()).updatedCells||0}}async appendRows(t,a,s){var l;const r=await this.authHeaders(),n=encodeURIComponent(a),o=await fetch(`${$e}/${t}/values/${n}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:r,body:JSON.stringify({range:a,majorDimension:"ROWS",values:s})});if(!o.ok){const d=await o.text();throw new Error(`Sheets append failed (${o.status}): ${d}`)}return{updatedCells:((l=(await o.json()).updates)==null?void 0:l.updatedCells)||s.length}}async deleteRow(t,a,s){const r=await this.authHeaders(),n=await fetch(`${$e}/${t}?fields=sheets.properties`,{headers:r});if(!n.ok){const p=await n.text();throw new Error(`Failed to get sheet metadata (${n.status}): ${p}`)}const o=await n.json(),i=o.sheets.find(p=>p.properties.title===a);if(!i){const p=o.sheets.map(h=>h.properties.title).join(", ");throw new Error(`Tab "${a}" not found. Available tabs: ${p}`)}const l=i.properties.sheetId,d=s-1,c=await fetch(`${$e}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{deleteDimension:{range:{sheetId:l,dimension:"ROWS",startIndex:d,endIndex:d+1}}}]})});if(!c.ok){const p=await c.text();throw new Error(`Row delete failed (${c.status}): ${p}`)}}async createSpreadsheet(t,a){const s=await this.authHeaders(),r={properties:{title:t},sheets:a&&a.length>0?a.map(i=>({properties:{title:i}})):[{properties:{title:"Sheet1"}}]},n=await fetch($e,{method:"POST",headers:s,body:JSON.stringify(r)});if(!n.ok){const i=await n.text();throw new Error(`Sheets create failed (${n.status}): ${i}`)}const o=await n.json();return{spreadsheetId:o.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${o.spreadsheetId}/edit`}}async getMetadata(t){const a=await this.authHeaders(),s=await fetch(`${$e}/${t}?fields=properties.title,sheets.properties.title`,{headers:a});if(!s.ok){const n=await s.text();throw new Error(`Sheets metadata failed (${s.status}): ${n}`)}const r=await s.json();return{title:r.properties.title,sheets:r.sheets.map(n=>n.properties.title)}}}const mt="https://www.googleapis.com/calendar/v3";class na{constructor(t,a,s,r,n){this.db=t,this.userId=a,this.pinHash=s,this.clientId=r,this.clientSecret=n}async authHeaders(){const{token:t}=await dt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",a={}){const s=await this.authHeaders(),r=new URLSearchParams;a.timeMin&&r.set("timeMin",a.timeMin),a.timeMax&&r.set("timeMax",a.timeMax),r.set("maxResults",String(a.maxResults||20)),r.set("singleEvents","true"),r.set("orderBy","startTime"),a.query&&r.set("q",a.query);const n=await fetch(`${mt}/calendars/${encodeURIComponent(t)}/events?${r}`,{headers:s});if(!n.ok){const i=await n.text();throw new Error(`Calendar list failed (${n.status}): ${i}`)}return(await n.json()).items||[]}async createEvent(t="primary",a){var i;const s=await this.authHeaders(),r=a.timeZone||"Asia/Kolkata",n={summary:a.summary,description:a.description||"",location:a.location||"",start:{dateTime:a.startDateTime,timeZone:r},end:{dateTime:a.endDateTime,timeZone:r}};(i=a.attendees)!=null&&i.length&&(n.attendees=a.attendees.map(l=>({email:l})));const o=await fetch(`${mt}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:s,body:JSON.stringify(n)});if(!o.ok){const l=await o.text();throw new Error(`Calendar create failed (${o.status}): ${l}`)}return await o.json()}async updateEvent(t="primary",a,s){const r=await this.authHeaders(),n=s.timeZone||"Asia/Kolkata",o={};s.summary&&(o.summary=s.summary),s.description&&(o.description=s.description),s.location&&(o.location=s.location),s.startDateTime&&(o.start={dateTime:s.startDateTime,timeZone:n}),s.endDateTime&&(o.end={dateTime:s.endDateTime,timeZone:n});const i=await fetch(`${mt}/calendars/${encodeURIComponent(t)}/events/${a}`,{method:"PATCH",headers:r,body:JSON.stringify(o)});if(!i.ok){const l=await i.text();throw new Error(`Calendar update failed (${i.status}): ${l}`)}return await i.json()}async deleteEvent(t="primary",a){const s=await this.authHeaders(),r=await fetch(`${mt}/calendars/${encodeURIComponent(t)}/events/${a}`,{method:"DELETE",headers:s});if(!r.ok&&r.status!==410){const n=await r.text();throw new Error(`Calendar delete failed (${r.status}): ${n}`)}}async listCalendars(){const t=await this.authHeaders(),a=await fetch(`${mt}/users/me/calendarList`,{headers:t});if(!a.ok){const r=await a.text();throw new Error(`Calendar list calendars failed (${a.status}): ${r}`)}return((await a.json()).items||[]).map(r=>({id:r.id,summary:r.summary,primary:r.primary||!1}))}}const _e="https://docs.googleapis.com/v1/documents",Zr="https://www.googleapis.com/drive/v3/files";function Ea(e){const t=[];for(const a of e.split(`
`)){const s=a.trim();if(s===""||/^---+$/.test(s))continue;let r="NORMAL_TEXT",n=a;const o=s.match(/^###\s+(.+)/),i=!o&&s.match(/^##\s+(.+)/),l=!o&&!i&&s.match(/^#\s+(.+)/);o?(r="HEADING_3",n=o[1]):i?(r="HEADING_2",n=i[1]):l?(r="HEADING_1",n=l[1]):/^\s*[-*]\s/.test(a)&&(n="• "+a.replace(/^\s*[-*]\s+/,""));const{text:d,spans:c}=Xr(n);t.push({text:d,namedStyle:r,spans:c})}return t}function Xr(e){const t=[];let a="",s=0;for(;s<e.length;)if(e[s]==="*"&&e[s+1]==="*"){const r=e.indexOf("**",s+2);if(r!==-1){const n=a.length;a+=e.substring(s+2,r),t.push({start:n,end:a.length,bold:!0}),s=r+2}else a+=e[s++]}else if(e[s]==="_"&&e[s+1]==="_"){const r=e.indexOf("__",s+2);if(r!==-1){const n=a.length;a+=e.substring(s+2,r),t.push({start:n,end:a.length,bold:!0}),s=r+2}else a+=e[s++]}else if(e[s]==="*"&&e[s+1]!=="*"){const r=e.indexOf("*",s+1);if(r!==-1){const n=a.length;a+=e.substring(s+1,r),t.push({start:n,end:a.length,italic:!0}),s=r+1}else a+=e[s++]}else if(e[s]==="_"){const r=e.indexOf("_",s+1);if(r!==-1){const n=a.length;a+=e.substring(s+1,r),t.push({start:n,end:a.length,italic:!0}),s=r+1}else a+=e[s++]}else a+=e[s++];return{text:a,spans:t}}class ws{constructor(t,a,s,r,n){this.db=t,this.userId=a,this.pinHash=s,this.clientId=r,this.clientSecret=n}async authHeaders(){const{token:t}=await dt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const a=await this.authHeaders(),s=await fetch(_e,{method:"POST",headers:a,body:JSON.stringify({title:t})});if(!s.ok){const n=await s.text();throw new Error(`Docs create failed (${s.status}): ${n}`)}const r=await s.json();return{documentId:r.documentId,url:`https://docs.google.com/document/d/${r.documentId}/edit`}}async readDocument(t){var o,i;const a=await this.authHeaders(),s=await fetch(`${_e}/${t}`,{headers:a});if(!s.ok){const l=await s.text();throw new Error(`Docs read failed (${s.status}): ${l}`)}const r=await s.json();let n="";for(const l of((o=r.body)==null?void 0:o.content)||[])if(l.paragraph)for(const d of l.paragraph.elements)(i=d.textRun)!=null&&i.content&&(n+=d.textRun.content);return{title:r.title,content:n.trim()}}async rewriteDocument(t,a){var f;const s=await this.authHeaders(),r=await fetch(`${_e}/${t}`,{headers:s});if(!r.ok){const b=await r.text();throw new Error(`Docs fetch failed (${r.status}): ${b.substring(0,200)}`)}const o=((f=(await r.json()).body)==null?void 0:f.content)||[],i=o[o.length-1],l=(i==null?void 0:i.endIndex)??2,d=Ea(a),c=[];if(l>2&&c.push({deleteContentRange:{range:{startIndex:1,endIndex:l-1}}}),d.length===0){c.length>0&&await fetch(`${_e}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:c})});return}let p="";const h=[];for(const b of d){const v=p.length;p+=b.text+`
`,h.push({start:v,end:p.length,namedStyle:b.namedStyle,spans:b.spans})}c.push({insertText:{location:{index:1},text:p}});for(const b of h){b.namedStyle!=="NORMAL_TEXT"&&c.push({updateParagraphStyle:{range:{startIndex:1+b.start,endIndex:1+b.end},paragraphStyle:{namedStyleType:b.namedStyle},fields:"namedStyleType"}});for(const v of b.spans){const k={},E=[];v.bold&&(k.bold=!0,E.push("bold")),v.italic&&(k.italic=!0,E.push("italic")),E.length>0&&c.push({updateTextStyle:{range:{startIndex:1+b.start+v.start,endIndex:1+b.start+v.end},textStyle:k,fields:E.join(",")}})}}const _=await fetch(`${_e}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:c})});if(!_.ok){const b=await _.text();throw new Error(`Docs rewrite failed (${_.status}): ${b.substring(0,200)}`)}}async appendFormattedContent(t,a){var f;const s=await this.authHeaders(),r=Ea(a);if(r.length===0)return;const n=await fetch(`${_e}/${t}`,{headers:s});if(!n.ok){const b=await n.text();throw new Error(`Docs fetch failed (${n.status}): ${b.substring(0,200)}`)}const i=((f=(await n.json()).body)==null?void 0:f.content)||[],l=i[i.length-1],d=Math.max(1,((l==null?void 0:l.endIndex)??2)-1);let c="";const p=[];for(const b of r){const v=c.length;c+=b.text+`
`,p.push({start:v,end:c.length,namedStyle:b.namedStyle,spans:b.spans})}const h=[{insertText:{location:{index:d},text:c}}];for(const b of p){b.namedStyle!=="NORMAL_TEXT"&&h.push({updateParagraphStyle:{range:{startIndex:d+b.start,endIndex:d+b.end},paragraphStyle:{namedStyleType:b.namedStyle},fields:"namedStyleType"}});for(const v of b.spans){const k={},E=[];v.bold&&(k.bold=!0,E.push("bold")),v.italic&&(k.italic=!0,E.push("italic")),E.length>0&&h.push({updateTextStyle:{range:{startIndex:d+b.start+v.start,endIndex:d+b.start+v.end},textStyle:k,fields:E.join(",")}})}}const _=await fetch(`${_e}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:h})});if(!_.ok){const b=await _.text();throw new Error(`Docs append failed (${_.status}): ${b.substring(0,200)}`)}}async appendText(t,a){const s=await this.authHeaders(),r=await fetch(`${_e}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:[{insertText:{endOfSegmentLocation:{},text:a}}]})});if(!r.ok){const n=await r.text();throw new Error(`Docs append failed (${r.status}): ${n}`)}}async deleteContent(t,a){var o,i,l;const s=await this.authHeaders(),r=await fetch(`${_e}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:[{replaceAllText:{containsText:{text:a,matchCase:!0},replaceText:""}}]})});if(!r.ok){const d=await r.text();throw new Error(`Docs delete content failed (${r.status}): ${d.substring(0,200)}`)}return{occurrencesRemoved:((l=(i=(o=(await r.json()).replies)==null?void 0:o[0])==null?void 0:i.replaceAllText)==null?void 0:l.occurrencesChanged)??0}}async shareDocument(t,a,s="writer"){const r=await this.authHeaders(),n=await fetch(`${Zr}/${t}/permissions`,{method:"POST",headers:r,body:JSON.stringify({type:"user",role:s,emailAddress:a})});if(!n.ok){const o=await n.text();throw new Error(`Share failed (${n.status}): ${o}`)}}}class de{constructor(t,a,s,r,n){N(this,"sheets");N(this,"calendar");N(this,"docs");N(this,"db");N(this,"userId");N(this,"pinHash");this.db=t,this.userId=a,this.pinHash=s,this.sheets=new vs(t,a,s,r,n),this.calendar=new na(t,a,s,r,n),this.docs=new ws(t,a,s,r,n)}async isConnected(){return ra(this.db,this.userId,this.pinHash)}}const Pe=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:na,GoogleDocs:ws,GoogleServices:de,GoogleSheets:vs,completeOAuthFlow:fs,disconnectGoogle:ys,exchangeCodeForTokens:ps,fetchUserInfo:hs,generateAuthUrl:ms,getGoogleAuth:dt,isGoogleConnected:ra,isOAuthClientConfigured:gs},Symbol.toStringTag,{value:"Module"}));async function bs(e,t,a={}){const s={textQuery:t,languageCode:"en",pageSize:8};if(a.type&&(s.includedType=a.type),a.location){const l=a.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(s.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:a.radius||5e3}})}const r=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),n=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":r},body:JSON.stringify(s)});if(!n.ok){const l=await n.text();return{results:[],error:`Places API error (${n.status}): ${l.substring(0,200)}`}}const o=await n.json();return!o.places||o.places.length===0?{results:[]}:{results:o.places.map(l=>{var d,c,p;return{name:((d=l.displayName)==null?void 0:d.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(c=l.currentOpeningHours)==null?void 0:c.openNow,types:(p=l.types)==null?void 0:p.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function _s(e,t){var n,o,i;const a=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),s=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":a}});if(!s.ok){const l=await s.text();return{error:`Place Details API error (${s.status}): ${l.substring(0,200)}`}}const r=await s.json();return{details:{name:((n=r.displayName)==null?void 0:n.text)||"",address:r.formattedAddress||"",phone:r.internationalPhoneNumber,website:r.websiteUri,rating:r.rating,reviews:(o=r.reviews)==null?void 0:o.slice(0,3).map(l=>{var d,c,p;return{author:((d=l.authorAttribution)==null?void 0:d.displayName)||"Anonymous",rating:l.rating||0,text:((p=(c=l.text)==null?void 0:c.text)==null?void 0:p.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(i=r.currentOpeningHours)==null?void 0:i.weekdayDescriptions,location:r.location?{lat:r.location.latitude,lng:r.location.longitude}:void 0,googleMapsUri:r.googleMapsUri}}}async function Es(e,t,a,s={}){var d;const r=new URLSearchParams({origin:t,destination:a,key:e,mode:s.mode||"driving"});(s.mode==="driving"||!s.mode)&&r.set("departure_time","now");const n=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${r}`);if(!n.ok)return{error:`Directions API error: ${n.status}`};const o=await n.json();if(o.status!=="OK")return{error:`Directions: ${o.status} — ${o.error_message||""}`};const i=o.routes[0],l=i.legs[0];return{route:{summary:i.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(d=l.duration_in_traffic)==null?void 0:d.text,steps:l.steps.slice(0,10).map(c=>{var p,h,_;return{instruction:((p=c.html_instructions)==null?void 0:p.replace(/<[^>]*>/g,""))||"",distance:((h=c.distance)==null?void 0:h.text)||"",duration:((_=c.duration)==null?void 0:_.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function Ts(e,t,a,s){var l,d;const r={q:t,target:a,key:e,format:"text"};s&&(r.source=s);const n=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const c=await n.text();return{translatedText:"",error:`Translate API error (${n.status}): ${c.substring(0,200)}`}}const i=(d=(l=(await n.json()).data)==null?void 0:l.translations)==null?void 0:d[0];return i?{translatedText:i.translatedText,detectedSourceLang:i.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function ks(e,t){const a=new URLSearchParams({address:t,key:e}),s=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${a}`);if(!s.ok)return{results:[],error:`Geocoding API error: ${s.status}`};const r=await s.json();return r.status!=="OK"&&r.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${r.status} — ${r.error_message||""}`}:{results:(r.results||[]).slice(0,5).map(n=>{var o;return{address:n.formatted_address,lat:n.geometry.location.lat,lng:n.geometry.location.lng,placeId:n.place_id,types:(o=n.types)==null?void 0:o.slice(0,3)}})}}async function xs(e,t,a={}){const s=new URLSearchParams({part:"snippet",q:t,key:e,type:a.type||"video",maxResults:String(a.maxResults||5),order:a.order||"relevance"}),r=await fetch(`https://www.googleapis.com/youtube/v3/search?${s}`);if(!r.ok){const o=await r.text();return{results:[],error:`YouTube API error (${r.status}): ${o.substring(0,200)}`}}return{results:((await r.json()).items||[]).map(o=>{var i,l,d,c,p,h,_,f;return{title:o.snippet.title,channelTitle:o.snippet.channelTitle,description:(i=o.snippet.description)==null?void 0:i.substring(0,200),videoId:((l=o.id)==null?void 0:l.videoId)||((d=o.id)==null?void 0:d.channelId)||((c=o.id)==null?void 0:c.playlistId)||"",publishedAt:o.snippet.publishedAt,url:(p=o.id)!=null&&p.videoId?`https://www.youtube.com/watch?v=${o.id.videoId}`:(h=o.id)!=null&&h.channelId?`https://www.youtube.com/channel/${o.id.channelId}`:"",thumbnailUrl:(f=(_=o.snippet.thumbnails)==null?void 0:_.medium)==null?void 0:f.url}})}}async function Bt(e,t={}){const a=Math.min(t.num||5,10),s=t.site?`site:${t.site} ${e}`:e;try{const r=new URLSearchParams({q:s}),n=await fetch(`https://html.duckduckgo.com/html/?${r}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!n.ok)return{results:[],error:`Search request failed (${n.status})`};const o=await n.text(),i=[],l=o.split(/class="result results_links/g).slice(1);for(const d of l){if(i.length>=a)break;const c=d.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),p=d.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(c){let h=c[1];const _=h.match(/uddg=([^&]+)/);_?h=decodeURIComponent(_[1]):h.startsWith("//")&&(h="https:"+h);const f=k=>k.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),b=f(c[2]),v=p?f(p[1]):"";if(b&&h.startsWith("http")){const k=h.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];i.push({title:b,link:h,snippet:v,displayLink:k})}}}return i.length===0?{results:[],error:void 0}:{results:i}}catch(r){return{results:[],error:`Web search error: ${r.message}`}}}async function Ss(e,t,a,s="driving"){var l,d,c,p;const r=new URLSearchParams({origins:t,destinations:a,key:e,mode:s,departure_time:"now"}),n=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${r}`);if(!n.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${n.status}`};const o=await n.json(),i=(c=(d=(l=o.rows)==null?void 0:l[0])==null?void 0:d.elements)==null?void 0:c[0];return!i||i.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(i==null?void 0:i.status)||o.status}`}:{distance:i.distance.text,duration:i.duration.text,durationInTraffic:(p=i.duration_in_traffic)==null?void 0:p.text}}const Qr=Object.freeze(Object.defineProperty({__proto__:null,geocode:ks,getDirections:Es,getDistanceMatrix:Ss,getPlaceDetails:_s,searchPlaces:bs,searchYouTube:xs,translateText:Ts,webSearch:Bt},Symbol.toStringTag,{value:"Module"})),Ee="https://gmail.googleapis.com/gmail/v1/users/me";class we{constructor(t,a,s,r,n){this.db=t,this.userId=a,this.pinHash=s,this.clientId=r,this.clientSecret=n}async authHeaders(){const{token:t}=await dt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var i;const a=await this.authHeaders(),s=new URLSearchParams;if(s.set("maxResults",String(t.maxResults||10)),t.query&&s.set("q",t.query),(i=t.labelIds)!=null&&i.length)for(const l of t.labelIds)s.append("labelIds",l);const r=await fetch(`${Ee}/messages?${s}`,{headers:a});if(!r.ok){const l=await r.text();throw new Error(`Gmail list failed (${r.status}): ${l.substring(0,200)}`)}const n=await r.json();if(!n.messages||n.messages.length===0)return[];const o=[];for(const l of n.messages.slice(0,t.maxResults||10))try{const d=await this.getMessage(l.id,a);d&&o.push(d)}catch{}return o}async getMessage(t,a){const s=a||await this.authHeaders(),r=await fetch(`${Ee}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:s});if(!r.ok)return null;const n=await r.json(),o=i=>{var l,d,c;return((c=(d=(l=n.payload)==null?void 0:l.headers)==null?void 0:d.find(p=>p.name.toLowerCase()===i.toLowerCase()))==null?void 0:c.value)||""};return{id:n.id,threadId:n.threadId,snippet:n.snippet||"",subject:o("Subject")||"(no subject)",from:o("From"),to:o("To"),date:o("Date")||new Date(parseInt(n.internalDate)).toISOString(),isUnread:(n.labelIds||[]).includes("UNREAD"),labels:n.labelIds||[]}}async getMessageBody(t){const a=await this.authHeaders(),s=await fetch(`${Ee}/messages/${t}?format=full`,{headers:a});if(!s.ok){const n=await s.text();throw new Error(`Gmail message body failed (${s.status}): ${n.substring(0,200)}`)}const r=await s.json();return Ds(r.payload)}async search(t,a=10){return this.listMessages({query:t,maxResults:a})}async send(t,a,s,r={}){const n=await this.authHeaders(),o=[`To: ${t}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];r.cc&&o.push(`Cc: ${r.cc}`),r.bcc&&o.push(`Bcc: ${r.bcc}`),r.replyToMessageId&&(o.push(`In-Reply-To: ${r.replyToMessageId}`),o.push(`References: ${r.replyToMessageId}`)),o.push("",s);const i=o.join(`\r
`),d={raw:Ta(i)};r.threadId&&(d.threadId=r.threadId);const c=await fetch(`${Ee}/messages/send`,{method:"POST",headers:n,body:JSON.stringify(d)});if(!c.ok){const p=await c.text();throw new Error(`Gmail send failed (${c.status}): ${p.substring(0,200)}`)}return await c.json()}async createDraft(t,a,s,r={}){const n=await this.authHeaders(),o=[`To: ${t}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];r.cc&&o.push(`Cc: ${r.cc}`),o.push("",en(s));const i=o.join(`\r
`),l=Ta(i),d=await fetch(`${Ee}/drafts`,{method:"POST",headers:n,body:JSON.stringify({message:{raw:l}})});if(!d.ok){const c=await d.text();throw new Error(`Gmail draft failed (${d.status}): ${c.substring(0,200)}`)}return await d.json()}async markAsRead(t){const a=await this.authHeaders();await fetch(`${Ee}/messages/${t}/modify`,{method:"POST",headers:a,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,a){const s=await this.authHeaders();let r={};switch(a){case"archive":r={removeLabelIds:["INBOX"]};break;case"trash":r={addLabelIds:["TRASH"]};break;case"read":r={removeLabelIds:["UNREAD"]};break;case"unread":r={addLabelIds:["UNREAD"]};break;case"star":r={addLabelIds:["STARRED"]};break;case"unstar":r={removeLabelIds:["STARRED"]};break}const n=await fetch(`${Ee}/messages/${t}/modify`,{method:"POST",headers:{...s,"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const o=await n.text();throw new Error(`Failed to modify message: ${o}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),a=await fetch(`${Ee}/labels/INBOX`,{headers:t});return a.ok&&(await a.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),a=await fetch(`${Ee}/profile`,{headers:t});if(!a.ok)throw new Error("Failed to get Gmail profile");return await a.json()}}function Ds(e){var t,a,s;if(!e)return"";if((t=e.body)!=null&&t.data)return Kt(e.body.data);if(e.parts){for(const r of e.parts)if(r.mimeType==="text/plain"&&((a=r.body)!=null&&a.data))return Kt(r.body.data);for(const r of e.parts)if(r.mimeType==="text/html"&&((s=r.body)!=null&&s.data)){const n=Kt(r.body.data);return tn(n)}for(const r of e.parts)if(r.parts){const n=Ds(r);if(n)return n}}return e.snippet||""}function en(e){let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return t=t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)","g"),"<em>$1</em>"),`<html><body style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#000000;">${t.split(/\n\n+/).map(r=>{const n=r.split(`
`);return n.every(o=>/^\s*[-*]\s/.test(o)||o.trim()==="")?`<ul>${n.filter(i=>i.trim()).map(i=>`<li>${i.replace(/^\s*[-*]\s+/,"")}</li>`).join("")}</ul>`:n.every(o=>/^\s*\d+\.\s/.test(o)||o.trim()==="")?`<ol>${n.filter(i=>i.trim()).map(i=>`<li>${i.replace(/^\s*\d+\.\s+/,"")}</li>`).join("")}</ol>`:`<p>${n.join("<br>")}</p>`}).join("")}</body></html>`}function Ta(e){const t=new TextEncoder().encode(e);let a="";for(let s=0;s<t.length;s++)a+=String.fromCharCode(t[s]);return btoa(a).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Kt(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function tn(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const an=1e4,sn=1e4;async function Os(e,t){try{const a=new AbortController,s=setTimeout(()=>a.abort(),sn),r=await fetch(e,{signal:a.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(!r.ok)return{text:"",error:`HTTP ${r.status}`};const n=r.headers.get("content-type")||"";if(!n.includes("text/html")&&!n.includes("text/plain")&&!n.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${n.split(";")[0]}`};const o=await r.text();clearTimeout(s);const i=o.length>2e5?o.substring(0,2e5):o,l=rn(i);return l.length<50?{text:"",error:"Page has too little readable content"}:{text:l.substring(0,t||an)}}catch(a){return{text:"",error:a.name==="AbortError"?"Timeout":a.message}}}function rn(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(a,s)=>String.fromCharCode(parseInt(s))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(a=>a.trim()).filter(a=>a.length>0).join(`
`),t.trim()}const nn=1e4;async function on(e,t){var r,n,o;const a=new AbortController,s=setTimeout(()=>a.abort(),nn);try{const i=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",signal:a.signal,headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar-pro",messages:[{role:"user",content:e}],max_tokens:2e3})});if(clearTimeout(s),!i.ok)return{report:"",sources:[],pagesRead:0,error:`Perplexity error ${i.status}`};const l=await i.json(),d=((o=(n=(r=l==null?void 0:l.choices)==null?void 0:r[0])==null?void 0:n.message)==null?void 0:o.content)||"",p=((l==null?void 0:l.citations)||[]).map(h=>({title:h,url:h,snippet:""}));return{report:d,sources:p,pagesRead:p.length}}catch(i){return clearTimeout(s),{report:"",sources:[],pagesRead:0,error:`Perplexity request failed: ${i.message}`}}}async function Cs(e,t,a={}){if(a.perplexityApiKey){const h=await on(e,a.perplexityApiKey);if(!h.error)return h}const s=a.maxPages||(a.depth==="thorough"?5:3),r=a.maxResults||(a.depth==="thorough"?8:5),n=await Bt(e,{num:r,site:a.site});if(n.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${n.error}`};if(n.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const i=n.results.slice(0,s).map(async h=>{const _=await Os(h.link);return{title:h.title,url:h.link,displayLink:h.displayLink,snippet:h.snippet,content:_.text,error:_.error}}),d=(await Promise.all(i)).filter(h=>h.content.length>50);if(d.length===0){const h=n.results.map((f,b)=>`[${b+1}] ${f.title}
${f.snippet}
Source: ${f.link}`).join(`

`);return{report:await ka(e,h,t,"snippets"),sources:n.results.map(f=>({title:f.title,url:f.link})),pagesRead:0}}const c=d.map((h,_)=>`--- SOURCE ${_+1}: ${h.title} (${h.displayLink}) ---
${h.content}
--- END SOURCE ${_+1} ---`).join(`

`);return{report:await ka(e,c,t,"full"),sources:d.map(h=>({title:h.title,url:h.url})),pagesRead:d.length}}async function ka(e,t,a,s){const n=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

${s==="full"?"I have fetched and read the full content of several web pages related to the research query.":"I could only retrieve search snippets (page fetching failed). Base the analysis on available snippet information and note this limitation."}

Instructions:
- Analyze ALL the source material provided below
- Write a clear, well-structured report answering the research query
- Include specific facts, numbers, and details from the sources
- Note any conflicting information between sources
- End with a brief conclusion or recommendation
- Cite sources by number [1], [2], etc.
- Keep the report concise but thorough — aim for 400-800 words
- Do NOT make up information not found in the sources
- If the sources don't adequately answer the query, say so honestly`,o=`Research query: "${e}"

Source material:
${t}

Write a synthesized research report answering the query above.`;try{return(await a.chat([{role:"system",content:n},{role:"user",content:o}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(i){return`Research synthesis error: ${i.message}. Raw search results were found but could not be analyzed.`}}const ln=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:Cs,fetchPageContent:Os},Symbol.toStringTag,{value:"Module"})),Nt="https://api.browser-use.com/api/v2",xa=2e4,ea=6e3,dn=88e3,Rs=new Set(["finished","stopped"]);async function Is(e,t,a){const s=(a==null?void 0:a.timeoutMs)??dn;let r,n;try{const i={task:e};a!=null&&a.secrets&&Object.keys(a.secrets).length>0&&(i.secrets=a.secrets),a!=null&&a.sessionId&&(i.sessionId=a.sessionId);const l=await fetch(`${Nt}/tasks`,{method:"POST",headers:{"X-Browser-Use-API-Key":t,"Content-Type":"application/json"},body:JSON.stringify(i)});if(!l.ok){const c=await l.text().catch(()=>"");return{output:null,taskId:"",status:"failed",error:`HTTP ${l.status}: ${c}`}}const d=await l.json();if(r=d.id,n=d.sessionId||void 0,!r)return{output:null,taskId:"",status:"failed",error:"No id in create response"}}catch(i){return{output:null,taskId:"",status:"failed",error:i.message}}await new Promise(i=>setTimeout(i,xa));const o=Date.now()+(s-xa);for(;Date.now()<o;){try{const i=await fetch(`${Nt}/tasks/${r}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(i.ok){const l=await i.json();if(Rs.has(l.status))return l.status==="finished"?{output:l.output??null,taskId:r,sessionId:n,status:"completed"}:{output:l.output??null,taskId:r,status:"failed",error:l.output??"Task was stopped before completing"}}}catch{}await new Promise(i=>setTimeout(i,ea))}return{output:null,taskId:r,sessionId:n,status:"timeout"}}async function cn(e,t,a){const r=Date.now()+3e4;for(;Date.now()<r;){try{const n=await fetch(`${Nt}/tasks/${e}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(!n.ok){await new Promise(i=>setTimeout(i,ea));continue}const o=await n.json();if(Rs.has(o.status)){const i=await fetch(`${Nt}/tasks/${e}`,{headers:{"X-Browser-Use-API-Key":t}}),l=i.ok?(await i.json()).output??null:o.output??null;return{status:o.status,output:l,done:!0}}}catch{}await new Promise(n=>setTimeout(n,ea))}return{status:"running",output:null,done:!1}}async function Ns(e){const t=e instanceof Buffer?new Uint8Array(e):e,a=new DataView(t.buffer,t.byteOffset,t.byteLength);let s=0;for(;s<t.length-30&&a.getUint32(s,!0)===67324752;){const r=a.getUint16(s+6,!0),n=a.getUint16(s+8,!0),o=a.getUint32(s+18,!0),i=a.getUint32(s+22,!0),l=a.getUint16(s+26,!0),d=a.getUint16(s+28,!0),c=new TextDecoder().decode(t.slice(s+30,s+30+l)),p=s+30+l+d;if(c==="word/document.xml"){const h=t.slice(p,p+o);let _;if(n===0)_=h;else{const v=new DecompressionStream("deflate-raw"),k=v.writable.getWriter();k.write(h),k.close();const E=v.readable.getReader(),C=[];let M=!1;for(;!M;){const F=await E.read();F.done?M=!0:C.push(F.value)}const B=C.reduce((F,j)=>F+j.length,0);_=new Uint8Array(i||B);let Y=0;for(const F of C)_.set(F,Y),Y+=F.length}return new TextDecoder().decode(_).replace(/<\/w:p>/g,`
`).replace(/<\/w:tr>/g,`
`).replace(/<[^>]+>/g,"").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim()}s=p+o,r&8&&(s+=16)}return""}const un=Object.freeze(Object.defineProperty({__proto__:null,extractDocxTextFromBuffer:Ns},Symbol.toStringTag,{value:"Module"})),mn=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,weight:.9},{pattern:/\bremi[a-z]{0,5}\s+(me|us)\b/i,weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,weight:.95},{pattern:/^[Tt]ask:\s*/,weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,weight:.9},{pattern:/\b(change\s+(the\s+)?time|update\s+(the\s+)?(reminder|schedule|alarm)|reschedule|move\s+it\s+to|cancel\s+(the\s+)?(reminder|schedule|alarm)|delete\s+(the\s+)?(reminder|schedule|alarm))\b/i,weight:.9},{pattern:/\b(show\s+(me\s+)?(my\s+)?(reminders?|schedules?|alarms?)|what\s+reminders?|any\s+reminders?|do\s+i\s+have.*remind|when\s+is\s+my\s+remind)\b/i,weight:.9},{pattern:/\b(stop|turn\s+off|switch\s+off|disable|deactivate)\s+(that|the|this|my)?\s*(reminder|schedule|alarm|notification)\b/i,weight:.9},{pattern:/\b(snooze|postpone|push\s+back|remind\s+me\s+later|later\s+reminder)\b/i,weight:.9},{pattern:/\b(change|update|edit|move|shift)\s+(it|this|that)\s+(to|for)\b/i,weight:.85},{pattern:/\bset\s+it\s+(for|at|to)\b/i,weight:.85},{pattern:/\b(what\s+time|when)\s+(did\s+i\s+set|is\s+(the|my)\s+remind|does\s+(it|that)\s+go\s+off)\b/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,weight:.9},{pattern:/\b(add|save|append|write|put)\s+(to|in|into)\s+(my\s+|your\s+|the\s+)?(quick\s+)?notes?\b|\bquick\s+notes\b/i,weight:.88},{pattern:/\b(update\s+cell|change\s+cell|delete\s+row|remove\s+row|delete\s+duplicate|remove\s+duplicate|create\s+(a\s+)?(new\s+)?(tab|sheet)|add\s+(a\s+)?tab|what.{0,15}(column|row\s+\d|cell\s+[A-Z])|sum\s+of|total\s+(in|of))\b/i,weight:.9},{pattern:/\b(forward\s+(that\s+)?(email|message)|reply\s+to\s+(that|the|an?\s+)?email|respond\s+to\s+(that|the)\s+email|mark\s+(it|that|this|email)\s+as|(got|received)\s+an?\s+email\s+from)\b/i,weight:.85},{pattern:/\b(cancel\s+(the\s+)?(event|meeting|appointment)|reschedule\s+(the\s+|my\s+)?(meeting|event|appointment)|delete\s+(from|the)\s+calendar|remove\s+(the\s+)?(event|meeting)\s+from\s+calendar)\b/i,weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,weight:.9},{pattern:/\b(keep\s+(that\s+)?in\s+mind|always\s+(do|use|prefer|remember)|update\s+(my\s+)?(memory|preference)|delete\s+(that\s+)?memory|forget\s+that|what\s+did\s+i\s+tell\s+you\s+about)\b/i,weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,weight:.9}];function oa(e,t){for(const a of mn)if(a.pattern.test(e))return{agent:"multi",confidence:a.weight,reasoning:"Keyword match — full agent"};return t&&e.trim().length<80&&t.split(`
`).slice(-16).some(r=>/\[TOOLS_USED:/i.test(r)||/\b(reminder|reminders|schedule|scheduled|cron|alarm|next_run|set for|going off|remind)\b/i.test(r)||/\b(i['']ll\s+(search|research|find|look\s+up|check|add|create|book)|just\s+a\s+moment|pulling\s+that\s+together|on\s+it\b|let\s+me\s+(search|research|find|look))\b/i.test(r))?{agent:"multi",confidence:.8,reasoning:"Active tool session follow-up — full agent"}:t&&/spreadsheet|sheet|google\s*sheet/i.test(t)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(e)?{agent:"multi",confidence:.85,reasoning:"Memory context — full agent"}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function As(e){const t=e.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')]+/);if(t&&/\b(delete|trash|remove)\b/i.test(e))return{tool:"drive_delete_file",args:{url_or_id:t[0].replace(/[.,;)]$/,"")}};if(/\b(list|show|display)\s+(my\s+)?(google\s+)?drive\s+(files?|docs?|documents?|folders?)\b|\bwhat\s+(files?|docs?|documents?)\s+(do\s+i\s+have|are|is)\s+(in|on)\s+(my\s+)?(google\s+)?drive\b/i.test(e))return{tool:"drive_list",args:{}};const a=e.match(/\b(?:search|find|look\s+(?:for|up))\s+(?:(?:in|on|my|the|google)\s+)*drive\s+(?:for\s+)?(.{3,60}?)(?:\s*[?.!,])?$/i);return a?{tool:"drive_search",args:{query:a[1].trim()}}:/\b(how\s+many\s+unread|unread\s+(count|emails?|messages?)|any\s+unread\s+(emails?|messages?))\b/i.test(e)?{tool:"gmail_unread_count",args:{}}:/\b(list|show|display)\s+(my\s+)?(upcoming\s+)?(calendar\s+)?(events?|meetings?|appointments?)\b/i.test(e)&&!/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+week|this\s+week|\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))\b/i.test(e)?{tool:"list_calendar_events",args:{}}:/\b(list|show|display)\s+(my\s+)?(active\s+)?(reminders?|schedules?|alarms?)\b|\bwhat\s+reminders?\s+(do\s+i\s+have|are\s+set|are\s+active)\b/i.test(e)?{tool:"list_schedules",args:{}}:null}function Ms(e,t){if(/\b(delete|trash|remove)\b.{0,50}\b(file|doc|document|sheet|spreadsheet|folder)\b|\b(file|doc|document|sheet|spreadsheet)\b.{0,50}\b(delete|trash|remove)\b/i.test(e)){const a=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(a)return{tool:"drive_delete_file",args:{url_or_id:a[0].replace(/[.,;)]$/,"")}}}if(/\b(move|rename|organise|organize)\b.{0,50}\b(file|doc|document|sheet)\b/i.test(e)){const a=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(a){const s={url_or_id:a[0].replace(/[.,;)]$/,"")},r=e.match(/\bto\s+(?:the\s+)?(?:folder\s+)?["']?([A-Za-z0-9 _-]{2,40})["']?\s*(?:folder\b|$)/i),n=e.match(/\brename\b.{0,30}\bto\s+["']?([A-Za-z0-9 _.-]{2,60})["']?/i);if(r&&(s.folder_name=r[1].trim()),n&&(s.new_name=n[1].trim()),s.folder_name||s.new_name)return{tool:"drive_organise",args:s}}}return null}function Ls(e,t,a,s,r,n){const o=t.assistant_name||"Karna",i=t.personality_prompt?`
## Personality
${t.personality_prompt.substring(0,2e3)}
`:"",l=a?`
## Active Memory (ALWAYS consult before responding)
${a}
`:"";let d="";try{const p=new Date;d=new Intl.DateTimeFormat("en-GB",{timeZone:t.timezone,day:"numeric",month:"short",year:"numeric"}).format(p)}catch{d=""}const c=`
## Current User
- **Name**: ${t.name}
- **Timezone**: ${t.timezone}
- **Time**: ${r}
- **Today's date for sheets**: ${d}
`;switch(e){case"conversation":return`You are ${o} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic.

${c}${i}${l}

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
- **HARD RULE — no false confirmations**: You have ZERO tool access. You CANNOT set reminders, create schedules, send emails, read sheets, or perform any action. NEVER output phrases like "Reminder set for...", "I've scheduled...", "Done ✅", "Task created", or any language implying an action was completed. If the user wants an action, say: "I can do that — just send your message and I'll take care of it." Do NOT simulate the outcome.`;default:return""}}const pn=Object.freeze(Object.defineProperty({__proto__:null,buildSubAgentPrompt:Ls,classifyIntentFast:oa,detectDeterministicOp:As,detectTierTwoOp:Ms},Symbol.toStringTag,{value:"Module"})),hn=2e3,gn=2e3,$s=4;function Yt(e){return Math.ceil(e.length/$s)}function Sa(e,t){const a=t*$s;return e.length<=a?e:e.slice(0,a)+`
[...truncated to fit token budget]`}function Ps(e){const t=new Set(["(Previous response was not recorded.)","(Previous request did not complete. Please try again.)","(My previous response was cut off before completing. Starting fresh.)"]),a=[];for(const r of e){const n=typeof r.content=="string"?r.content:"";if(r.role==="assistant"&&t.has(n.trim())&&a.length>0&&a[a.length-1].role==="user"){a.pop();continue}a.push(r)}const s=[];for(const r of a){let n=r.content;r.role==="assistant"&&typeof n=="string"&&(n=n.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim(),n||(n="(Previous response was not recorded.)"));const o=n!==r.content?{...r,content:n}:r;s.length>0&&s[s.length-1].role===o.role&&o.role!=="system"?s[s.length-1]={...s[s.length-1],content:s[s.length-1].content+`

`+o.content}:s.push(o)}return s}const Da=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes, daily = at a specific time (HH:MM), weekly = day of week at time (e.g. "Friday 17:00"), once = specific date and time (e.g. "2026-03-12 14:30")'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration requests: "in 5 minutes", "in 2 hours", "in half an hour". Do NOT use for any request that mentions a specific time or date ("at 13:00", "tomorrow at noon", "next Friday") — use schedule_value instead. Examples: "in 5 minutes" = 5, "in 2 hours" = 120.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"update_schedule",description:'Update an existing scheduled task — change its name, description, or reschedule it to a new time. Use this when the user wants to change the time of a reminder or rename it. You MUST call this tool — never say "updated" without calling it.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to update (get it from list_schedules first if unknown)"},name:{type:"string",description:"New name for the task (optional)"},description:{type:"string",description:"New description (optional)"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:"New schedule type (required if changing the time)"},schedule_value:{type:"string",description:"New schedule value matching the schedule_type format (required if changing the time)"},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration changes ("in 30 minutes", "in 2 hours"). Do NOT use if the user specifies a clock time or date — use schedule_value instead.'}},required:["job_id"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:'Store a PERMANENT rule, preference, or standing instruction that Ruby should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts (orders, deliveries, single events) — those go to create_schedule. Ask yourself: "Will this still be relevant in 6 months?" If no, do not store it.',parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"delete_memory",description:'Delete a stored memory entry by its ID. Use when the user says "forget that", "remove that rule", or "that preference is wrong". Always call search_memory first to confirm the correct ID. Confirm with the user if there is any ambiguity about which entry to remove.',parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to delete"}},required:["id"]}},{name:"update_memory",description:"Update the content of an existing memory entry by its ID. Use when the user wants to correct or change a stored rule or preference. Always call search_memory first to find the correct ID.",parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to update"},content:{type:"string",description:"The new content to replace the existing entry"}},required:["id","content"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"delete_sheet_row",description:"Delete a specific row from a Google Sheet tab by row number. The row number is as displayed in the sheet (1-based: row 1 = header, row 2 = first data row). Rows below shift up. ALWAYS call read_sheet first to confirm the exact row number before deleting. Cannot delete row 1 (header).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},sheet_name:{type:"string",description:'Tab name exactly as shown in the sheet (e.g. "Sheet1", "Budget", "January")'},row_number:{type:"number",description:"Row number to delete (1-based, as shown in the sheet). Minimum 2."}},required:["spreadsheet_id","sheet_name","row_number"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"rewrite_doc",description:"Replace the entire content of an existing Google Document with new formatted content. Use this to reformat or clean up a document — clears the current content and rewrites it with proper headings, bold, bullet points etc. Workflow: read_doc to get current content → rewrite_doc with reformatted version.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to rewrite (from URL: docs.google.com/document/d/{ID}/edit)"},content:{type:"string",description:"New formatted content (supports markdown: # ## ### headings, **bold**, *italic*, - bullets)"}},required:["document_id","content"]}},{name:"delete_doc_content",description:"Remove specific text from a Google Document by exact string match. Removes ALL occurrences of the text. Use this to delete a duplicate entry — call read_doc first to find the exact text. If text appears twice (duplicate), both copies are removed; use append_to_doc immediately after to add the single correct version back.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"},text_to_remove:{type:"string",description:"Exact text to remove, including any surrounding whitespace or line breaks needed to cleanly remove the entry."}},required:["document_id","text_to_remove"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. STRICT RULES — violating any of these is a critical error: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm. (2) NEVER fabricate email body content. Only use data you retrieved from tools in this same conversation. If you do not have the actual content (costs, numbers, details), do NOT call this — tell the user exactly what information is missing and ask them to provide it. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_read_file",description:"Read the content of a specific Google Drive file by URL or file ID. Supports Google Docs (exported as text), Sheets (exported as CSV), PDFs (extracted via AI), and other text files. Use this when the user shares a Google Drive or Google Docs link and wants you to read, summarize, or analyze the file contents.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive or Google Docs URL (e.g. https://drive.google.com/file/d/... or https://docs.google.com/document/d/...) or bare file ID"},extract_focus:{type:"string",description:'Optional: specific content to focus extraction on (e.g. "financial figures", "action items", "table of contents")'}},required:["url_or_id"]}},{name:"drive_delete_file",description:"Move a Google Drive file or document to trash. The file can be restored from Drive trash within 30 days. Use when the user asks to delete, remove, or trash a file.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to trash"}},required:["url_or_id"]}},{name:"drive_organise",description:"Move a Google Drive file to a folder and/or rename it. Creates the folder if it does not exist. Use when the user wants to organise, move, or rename a file in Drive.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to move/rename"},folder_name:{type:"string",description:"Name of the destination folder. Creates it if it does not exist."},new_name:{type:"string",description:"Optional: new name for the file"}},required:["url_or_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets (~1s). Use ONLY when: (1) the user wants a list of links to browse, not a synthesized answer, (2) real-time scores or breaking headlines, or (3) fallback if research tool fails. If the user wants an actual answer (not links), use research instead.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:"Deep web research — synthesizes a detailed report from multiple sources. Uses Perplexity Sonar when available (~5s), otherwise fetches and reads 3-5 pages (~15s). Default search tool — use whenever your training knowledge might be stale, uncertain, or high-stakes. Covers: weather, travel, recommendations, comparisons, product questions, reviews, current data, anything needing a verified or up-to-date answer. Only skip this in favor of web_search when user wants raw links or real-time scores.",parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"browser_task",description:'Run a complete browser automation workflow using a real cloud browser. The cloud agent handles ALL steps — navigation, clicks, form fills, extraction — in a single call. CRITICAL: Always pass the ENTIRE multi-step workflow as one task description. Never split a browser workflow across multiple browser_task calls. Wrong: call 1 "go to site", call 2 "click X", call 3 "extract Y". Correct: one call with "go to site, click X, extract Y". Use for: JS-heavy sites, form submission, clicking through pages, any site requiring a real browser.',parameters:{type:"object",properties:{task:{type:"string",description:'Full Plain-English description of the COMPLETE workflow (e.g. "Go to news.ycombinator.com and return the top 5 story titles and URLs", "Go to books.toscrape.com, click the Mystery category, list the first 5 books with their star rating and price")'},site_name:{type:"string",description:'Optional: name of a saved Secret Vault entry (e.g. "LinkedIn", "Gmail backup") to inject login credentials automatically. The credentials will be passed securely to the browser agent.'}},required:["task"]}},{name:"browser_task_status",description:"Check the status of a previously started browser task that was still running when it timed out. Use when the user asks what happened with a browser task. Get the task_id from memory.",parameters:{type:"object",properties:{task_id:{type:"string",description:"The task ID returned by the earlier browser_task call (stored in memory)"}},required:["task_id"]}},{name:"outlook_email_digest",description:"Read recent/unread Outlook mail through Browser Use Cloud and Secret Vault credentials. Gmail uses Google APIs; Outlook MUST use this browser workflow. Returns honest structured output and never guesses if the browser returns no content.",parameters:{type:"object",properties:{max_messages:{type:"number",description:"Maximum recent/unread Outlook messages to inspect. Default 8."}}}},{name:"vault_lookup",description:"Check the Secret Vault for saved login credentials by site name. Returns matching entry names (not actual credentials). Use this BEFORE calling browser_task whenever the user asks to access a site that requires a password or login.",parameters:{type:"object",properties:{site_name:{type:"string",description:'Site or service name to look up (e.g. "LinkedIn", "Gmail backup", "MyBank"). Case-insensitive, partial matches included.'}},required:["site_name"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"parse_document",description:"Read and extract text content from an uploaded file (PDF, Word/DOCX, or text). Call this whenever the user uploads a document and wants you to read it, extract information, or work with its contents.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id returned when the file was uploaded"},extract_focus:{type:"string",description:'Optional: specific information to focus on extracting (e.g., "quantities and equipment names", "dates and amounts", "all text content")'}},required:["file_id"]}},{name:"create_skill",description:"Create a new reusable skill — a named workflow that can be invoked by name in future conversations. Use this when the user asks you to create a skill, save a workflow, or build a reusable automation. IMPORTANT: Before calling this, ask the user clarifying questions to understand: what the skill should do, what inputs it needs, what tools it uses, and what the expected output is.",parameters:{type:"object",properties:{name:{type:"string",description:'Human-readable skill name (e.g., "Equipment List Parser", "Daily Expense Logger")'},description:{type:"string",description:"One-sentence description of what the skill does"},instructions:{type:"string",description:"Detailed step-by-step instructions for executing the skill. Be specific about which tools to use, in what order, and what to do with the results."},required_tools:{type:"array",items:{type:"string"},description:'List of tool names this skill needs (e.g. ["parse_document", "append_sheet", "create_sheet"])'},parameters:{type:"object",description:"JSON schema describing the inputs this skill accepts. Use standard JSON schema format."},examples:{type:"array",description:"Optional example inputs and expected outputs to guide execution",items:{type:"object",properties:{input:{type:"object"},output:{type:"string"}}}}},required:["name","description","instructions"]}},{name:"list_skills",description:"List all custom skills the user has created. Shows name, description, and usage count for each.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled skills. Default: false"}}}}];async function ia(e,t){try{const s=((await e.prepare("SELECT slug, name, description, parameters FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at ASC").bind(t).all()).results||[]).map(r=>{let n={};try{n=JSON.parse(r.parameters)||{}}catch{}return n.properties||(n={type:"object",properties:{inputs:{type:"string",description:"Any additional context or specific instructions for this skill execution"}}}),{name:r.slug,description:`[Custom Skill] ${r.description}`,parameters:n}});return[...Da,...s]}catch{return Da}}async function la(e,t){try{const s=(await e.prepare("SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t).all()).results||[];return s.length===0?"":s.map(r=>`- ${r.content}`).join(`
`)}catch{return""}}function Bs(e,t,a,s){const r=e.assistant_name||"Karna",n=e.personality_prompt?Sa(`## Personality Instructions
${e.personality_prompt}
`,hn):"",o=s!=null&&s.trim()?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. They are fixed — do not store copies of these in your memory or contradict them.
${s}
`:"",i=Sa(t,gn);return`You are ${r} — a personal AI assistant. Your name is ${r} — always refer to yourself by this name if asked.

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
- **Name**: ${e.name}
- **Username**: ${e.username}
- **Role**: ${e.role}
- **Timezone**: ${e.timezone}

${n}

${o}
## Your Active Memory (Your Own Notes — Can Be Updated via store_memory)
**ALWAYS read and apply everything in this section before responding.** This is your stored knowledge about the user — preferences you have noted, referenced documents, data sources, and context. These OVERRIDE default behaviour. Do NOT duplicate anything already covered in Standing Instructions above.
- If a memory entry says "use this Google Sheet for events queries" — then when the user asks about events, you MUST use read_sheet with that spreadsheet ID. Do NOT use calendar or ask the user for the sheet link again.
- If a memory entry references a document or spreadsheet, use the stored ID directly with the appropriate tool (read_sheet, read_doc, etc.).
- If a memory entry records a preference (e.g. "check Outlook for meetings"), follow it without asking.

${i}

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

**browser_task_status is ONE call only.** Call it once when the user asks what happened. If it returns [still-running]: stop immediately, tell the user to ask again in 2–3 minutes — do NOT call it again. If it returns no output: report that to the user — do NOT start a new browser_task to compensate.

**Secret Vault + browser rule:** Any request to check emails, messages, or content on a website that is not Gmail (e.g. Outlook, Hotmail, Yahoo Mail, LinkedIn, Instagram, Office 365, any company webmail) MUST follow this flow — no exceptions:
1. Call \`vault_lookup\` with the site name (e.g. "Outlook", "Yahoo Mail")
2. If a vault entry exists: call \`browser_task\` with \`site_name\` set to the exact vault entry name
3. If no vault entry: respond exactly — "No credentials saved for [site] in your Secret Vault. Add them via Settings → Secret Vault, then try again."

**NEVER** tell the user to "check it yourself", "use the app", or "access it through the web interface". **NEVER** redirect to Gmail as a substitute when Outlook or another site is requested. The vault+browser path is always the answer for any non-Gmail email/site request.

### Information Retrieval — When to Search vs. Answer from Knowledge

Before answering any factual question, apply these four tests:

1. **Recency** — Could this have changed since your training data? Prices, product specs, reviews, people's current roles, availability, rankings, versions, "best of" lists, scores, weather — all change. → **research**
2. **Uncertainty** — Are you less than 90% confident in the specific claim? Nutritional data, compatibility specs, feature details, current regulations, dosages — verify rather than guess. → **research**
3. **Stakes** — How bad if wrong? Health claims, financial advice, safety info, legal questions, specific product recommendations the user will act on. → **research**
4. **User signals** — Does phrasing indicate currency needs? Words like "current", "latest", "now", "today", "recent", "2026", "still", "anymore", "these days" all signal the user wants live information. → **research**

**If none of the four tests trigger** — the fact is stable, well-established, and you are confident — answer from knowledge directly. No tool call needed. This includes: fundamental science, historical facts, math, definitions, geography, philosophy, language explanations, and widely-known general knowledge.

**Calibration check:** Before answering from knowledge, ask yourself: "Am I 90%+ confident this is still accurate today?" If not, use research. Common traps: product specs you "know" may be outdated, nutritional values may be approximate, people's job titles change frequently.

**Tool selection after deciding to search:**
- **research** (default) — synthesized answer from multiple sources. Use for: recommendations, comparisons, "is X good for Y?", travel, weather, product questions, anything where the user wants an answer not a link list. (~5s with Perplexity, ~15s otherwise)
- **web_search** — raw links only. Use ONLY when: (a) user explicitly wants links to browse, (b) real-time scores or breaking headlines, or (c) fallback if research fails. (~1s)
- **read_url** — user provides a specific URL. Max 2 attempts; after 2 failures answer from knowledge.

**Quick-reference examples:**
| Query | Tests triggered | Action |
|-------|----------------|--------|
| "Capital of France?" | None | Knowledge |
| "What is photosynthesis?" | None | Knowledge |
| "What does API stand for?" | None | Knowledge |
| "Is the iPhone 16 worth buying?" | Recency + Stakes | research |
| "Weather in Bangkok next week" | Recency | research |
| "Best hotels in Bali for families" | Recency + Uncertainty | research |
| "How much protein in paneer?" | Uncertainty + Stakes | research |
| "Latest cricket scores" | Recency + User signal | web_search |
| "What happened in the news today?" | Recency + User signal | web_search |

### Writing & Storage
- **create_doc** — Create a new Google Doc with content. Always pass the full text as the content parameter. **Single-use per request**: once create_doc returns a document ID and URL, the document is fully created. Reply immediately with the URL — never call create_doc again for the same request.
- **append_to_doc** — Add content to an existing Google Doc. Use when the user wants to add to an existing document.
- **rewrite_doc** — Replace the entire content of an existing Google Doc with reformatted content. Use for "format this doc", "clean up this document", "fix the formatting". Workflow: read_doc → rewrite the content as clean markdown → rewrite_doc. The existing content is cleared and rewritten with proper headings, bold, bullets.
- **delete_doc_content** — Remove specific text from a Google Doc by exact match. Use for "delete the duplicate entry", "remove this line", "clean up X from the doc". Workflow: read_doc → identify exact text → delete_doc_content. Removes ALL occurrences. If the text appears twice (a true duplicate) and the user wants to keep one copy, follow with append_to_doc to re-add the single correct version.
- **create_sheet** + **write_sheet** / **append_sheet** — Create and populate spreadsheets.
- **delete_sheet_row** — Delete a row from a sheet by row number (1-based, as displayed). Use for "delete row 7", "remove the duplicate entry in row 5", "delete that row". ALWAYS call read_sheet first to confirm the exact row number. Cannot delete row 1 (header).
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

**Browser result hallucination is strictly forbidden:**
- NEVER report email subjects, senders, message content, counts, or any page data that was not explicitly present in the browser_task or browser_task_status tool result text.
- If the tool result contains [NO-OUTPUT]: say exactly — "The browser completed but returned no content. This usually means the site blocked automation, the session expired, or the login failed." Do NOT invent what emails or page content might have said.
- If the user asks "did you find X?" and the browser returned nothing: answer "No — the browser returned no content." Never guess or confirm based on context.
- Outlook email is browser-only in Karna. Use outlook_email_digest or one complete browser_task with Secret Vault credentials; never imply Outlook API support. If Browser Use returns no output, say Outlook returned no content.

### Google Workspace
- Sheets: read_sheet, write_sheet, append_sheet, create_sheet — formulas like =SUM(), =SUMIF() work in write_sheet/append_sheet
- Calendar: list_calendar_events, create_calendar_event
- Docs: create_doc, read_doc, append_to_doc, rewrite_doc
- Drive: drive_list, drive_search, drive_delete_file, drive_organise
- Gmail: gmail_list, gmail_read, gmail_search, gmail_send, gmail_draft, gmail_unread_count, gmail_modify
- If Google is not connected, tell the user: Settings → Keys → Google Workspace.
- **Resuming failed Google operations** — when the user says "try again", "retry", "save/send/create the pending [item]", "I connected", "Google is connected", "connected now", or any similar phrase indicating they have reconnected, ALWAYS call \`search_memory\` first with one of these queries before telling the user you can't proceed:
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
${js(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${a==="telegram"?`

## TELEGRAM CONSTRAINTS — 25-second hard limit
- **Essays / documents**: Keep written content under 400 words. Write directly from your knowledge — do NOT call web_search before writing. Call create_doc in one shot immediately.
- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).
- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use \`schedule_value\` with the exact datetime in the user's local timezone — NEVER use \`minutes_from_now\` for clock-time requests (it causes wrong times). Only use \`minutes_from_now\` for pure duration requests like "in 30 minutes" or "in 2 hours".
- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I'll now..." — just call the tool.
- **Long content intent check**: When asked to write long-form content (essay, article, report — likely over 200 words) WITHOUT a save destination specified, do NOT start writing. Ask first: "Should I save this as a Google Doc and send you the link, or write it here in chat?" Wait for the response. If Drive/Doc, call \`create_doc\` with full content and return only the link. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**`:""}`}async function Jt(e,t,a){var d;const r=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${a.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let n;((d=r.files)==null?void 0:d.length)>0?n=r.files[0].id:n=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:a,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${n}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:n,folderName:a}}function At(e){return e.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").replace(/<function_calls>[\s\S]*?<\/function_calls>/gi,"").replace(/<function_result>[\s\S]*?<\/function_result>/gi,"").trim()}function js(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}async function yt(e,t,a,s,r,n,o,i,l,d,c,p,h){const _=Date.now();let f=!0,b="",v="";try{return v=await yn(e,t,a,s,n,o,i,l,d,c,p,h),v}catch(k){throw f=!1,b=k.message||"Unknown error",k}finally{const k=Date.now()-_;try{await a.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(s,r.agentType||null,r.providerName||null,e,JSON.stringify(t).substring(0,2e3),(f?v:"").substring(0,500),f?1:0,b||null,k,r.isEnforcementRetry?1:0,r.channel||"web").run()}catch{}}}function Us(e){const t=e.length;for(let a=0;a<t-1;a++){const s=e[a];if(s.role!=="user"||typeof s.content!="string")continue;const r=t-1-a,n=r<=2?12e3:r<=4?5e3:2e3;s.content.length>n&&(e[a]={...s,content:s.content.substring(0,n)+`
[...truncated in history to reduce context size]`})}}function fn(e){const t=[];let a=[],s="",r=!1,n=0;const o=e.length;for(;n<o;){const i=e[n];if(r){if(i==='"'){if(e[n+1]==='"'){s+='"',n+=2;continue}r=!1,n++;continue}s+=i,n++;continue}if(i==='"'){r=!0,n++;continue}if(i===","){a.push(s),s="",n++;continue}if(i==="\r"&&e[n+1]===`
`){a.push(s),t.push(a),a=[],s="",n+=2;continue}if(i===`
`||i==="\r"){a.push(s),t.push(a),a=[],s="",n++;continue}s+=i,n++}for((s||a.length)&&(a.push(s),t.push(a));t.length&&t[t.length-1].every(i=>i==="");)t.pop();return t}async function yn(e,t,a,s,r,n,o,i,l,d,c,p){var _,f,b,v,k,E,C,M,B,Y,F,j,W,q,O,U;const h=new z(a);switch(e){case"create_schedule":{const u=new Date;let y;const m=d||"UTC";if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){y=new Date(u.getTime()+t.minutes_from_now*60*1e3);const D=y.toLocaleString("en-US",{timeZone:m,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[I,L,R]=(D[0]||"").split("/");t.schedule_value=`${R}-${I}-${L} ${D[1]||"00:00"}`,t.schedule_type="once"}else if(t.schedule_type==="interval"){const T=parseInt(t.schedule_value,10);y=new Date(u.getTime()+T*60*1e3)}else if(t.schedule_type==="daily"){const[T,D]=t.schedule_value.split(":").map(Number),I=u.toLocaleString("en-US",{timeZone:m}),L=new Date(I),R=new Date(L);R.setHours(T,D,0,0),R<=L&&R.setDate(R.getDate()+1);const A=new Date(R.toLocaleString("en-US",{timeZone:"UTC"})),H=new Date(R.toLocaleString("en-US",{timeZone:m})),J=A.getTime()-H.getTime();y=new Date(R.getTime()+J)}else if(t.schedule_type==="weekly"){const[T,D]=t.schedule_value.split(" "),[I,L]=(D||"00:00").split(":").map(Number),A=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Ke=>Ke.toLowerCase()===T.toLowerCase()),H=u.toLocaleString("en-US",{timeZone:m}),J=new Date(H),Q=new Date(J);Q.setHours(I,L,0,0);let te=(A-Q.getDay()+7)%7;te===0&&Q<=J&&(te=7),Q.setDate(Q.getDate()+te);const ee=new Date(Q.toLocaleString("en-US",{timeZone:"UTC"})),ne=new Date(Q.toLocaleString("en-US",{timeZone:m})),pe=ee.getTime()-ne.getTime();y=new Date(Q.getTime()+pe)}else if(t.schedule_type==="once"){const[T,D]=t.schedule_value.split(" "),[I,L,R]=T.split("-").map(Number),[A,H]=(D||"00:00").split(":").map(Number),J=u.toLocaleString("en-US",{timeZone:m}),Q=new Date(J),te=new Date(Q);te.setFullYear(I,L-1,R),te.setHours(A,H,0,0);const ee=new Date(te.toLocaleString("en-US",{timeZone:"UTC"})),ne=new Date(te.toLocaleString("en-US",{timeZone:m})),pe=ee.getTime()-ne.getTime();y=new Date(te.getTime()+pe);const Ke=new Date(u.getTime()+120*1e3);if(y.getTime()<u.getTime()+60*1e3){const Ht=y.toISOString();y=Ke;const ct=` [Note: The requested time ${t.schedule_value} in ${m} resolved to ${Ht} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${y.toISOString()}.]`;t._pastTimeWarning=ct}}else y=new Date(u.getTime()+3600*1e3);if(await a.prepare("SELECT id FROM cron_jobs WHERE user_id = ? AND name = ? AND schedule_type = ? AND schedule_value = ? AND state != 'completed' LIMIT 1").bind(s,t.name,t.schedule_type,t.schedule_value).first()){const T=y.toLocaleString("en-US",{timeZone:m,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule already exists: "${t.name}" is already set for ${T} (${m}). No duplicate created.`}await a.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(s,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),y.toISOString()).run();const w=t._pastTimeWarning||"",x=y.toLocaleString("en-US",{timeZone:m,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${t.name}" — ${t.schedule_type}. Will fire at ${x} (${m}). [UTC: ${y.toISOString()}]${w}. IMPORTANT: Use the exact time "${x}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const y=(await a.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(s).all()).results||[];return y.length===0?"No scheduled tasks found.":y.map(m=>`[ID:${m.id}] ${m.enabled?"▶":"⏸"} "${m.name}" — [${m.schedule_type}] ${m.schedule_value} — ${m.action_type} — state: ${m.state||"active"} — next: ${m.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const u=t.enabled?1:0,y=u?"active":"paused";return await a.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,y,t.job_id,s).run(),`Schedule ${t.job_id} ${u?"enabled (active)":"paused"}.`}case"update_schedule_state":{const u=["created","active","reminding","paused","completed"],y=t.state;if(!u.includes(y))return`Invalid state "${y}". Valid states: ${u.join(", ")}`;const m=y==="completed"||y==="paused"?0:1;return await a.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(y,m,t.job_id,s).run(),`Schedule ${t.job_id} state updated to "${y}".`}case"update_schedule":{const u=t.job_id,y=d||"UTC",m=new Date,g=["updated_at = CURRENT_TIMESTAMP"],w=[];t.name&&(g.push("name = ?"),w.push(t.name)),t.description&&(g.push("description = ?"),w.push(t.description));let x=null,T=t.schedule_type,D=t.schedule_value;if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){x=new Date(m.getTime()+t.minutes_from_now*60*1e3);const R=x.toLocaleString("en-US",{timeZone:y,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[A,H,J]=(R[0]||"").split("/");D=`${J}-${A}-${H} ${R[1]||"00:00"}`,T="once"}else if(T&&D){if(T==="interval")x=new Date(m.getTime()+parseInt(D,10)*60*1e3);else if(T==="daily"){const[L,R]=D.split(":").map(Number),A=new Date(m.toLocaleString("en-US",{timeZone:y})),H=new Date(A);H.setHours(L,R,0,0),H<=A&&H.setDate(H.getDate()+1);const J=new Date(H.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(H.toLocaleString("en-US",{timeZone:y})).getTime();x=new Date(H.getTime()+J)}else if(T==="weekly"){const[L,R]=D.split(" "),[A,H]=(R||"00:00").split(":").map(Number),Q=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Ke=>Ke.toLowerCase()===L.toLowerCase()),te=new Date(m.toLocaleString("en-US",{timeZone:y})),ee=new Date(te);ee.setHours(A,H,0,0);let ne=(Q-ee.getDay()+7)%7;ne===0&&ee<=te&&(ne=7),ee.setDate(ee.getDate()+ne);const pe=new Date(ee.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(ee.toLocaleString("en-US",{timeZone:y})).getTime();x=new Date(ee.getTime()+pe)}else if(T==="once"){const[L,R]=D.split(" "),[A,H,J]=L.split("-").map(Number),[Q,te]=(R||"00:00").split(":").map(Number),ee=new Date(m.toLocaleString("en-US",{timeZone:y})),ne=new Date(ee);ne.setFullYear(A,H-1,J),ne.setHours(Q,te,0,0);const pe=new Date(ne.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(ne.toLocaleString("en-US",{timeZone:y})).getTime();x=new Date(ne.getTime()+pe),x.getTime()<m.getTime()+60*1e3&&(x=new Date(m.getTime()+120*1e3))}}if(T&&(g.push("schedule_type = ?"),w.push(T)),D&&(g.push("schedule_value = ?"),w.push(D)),x&&(g.push("next_run = ?"),w.push(x.toISOString())),g.length===1)return"No changes provided. Specify name, description, or schedule fields to update.";w.push(u,s),await a.prepare(`UPDATE cron_jobs SET ${g.join(", ")} WHERE id = ? AND user_id = ?`).bind(...w).run();const I=x?x.toLocaleString("en-US",{timeZone:y,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):null;return`Schedule ${u} updated.${I?` New fire time: ${I} (${y}).`:""} IMPORTANT: Use this exact time "${I}" when confirming to the user.`}case"delete_schedule":return await a.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,s).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const u=t.importance||5,y=t.type==="task"?"preference":t.type,m=u>=7?"working":"long_term";return await h.store(s,y,t.title,t.content,u,m),`Stored in ${m==="working"?"working":"long-term"} memory: [${y}] ${t.title} (importance: ${u})`}case"search_memory":{const u=await h.search(s,t.query);return u.length===0?"No matching memories found.":u.map(y=>`[id:${y.id}] [${y.tier||"long_term"}] [${y.type}] **${y.title}**: ${y.content}`).join(`
`)}case"delete_memory":return await h.remove(t.id,s),`Memory entry ${t.id} deleted.`;case"update_memory":return await h.update(t.id,s,t.content),`Memory entry ${t.id} updated.`;case"get_system_status":{const u=await a.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s).first(),y=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s).first(),m=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(s).first(),g=await a.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(s).first(),w=await a.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(s).first();return`System Status:
- Active schedules: ${(u==null?void 0:u.cnt)||0}
- Memory: ${(m==null?void 0:m.cnt)||0} working / ${(y==null?void 0:y.cnt)||0} total
- Total messages: ${(g==null?void 0:g.cnt)||0}
- Unread errors: ${(w==null?void 0:w.cnt)||0}`}case"read_sheet":{if(!r)return"Authentication context unavailable.";try{const u=new de(a,s,r,n||"",o||""),y=t.spreadsheet_id;let m=t.range;const g=await u.sheets.getMetadata(y),w=g.sheets;m.includes("!")||(m=`${w[0]}!${m}`);let x;try{x=await u.sheets.readRange(y,m)}catch(D){if((_=D.message)!=null&&_.includes("Unable to parse range")||(f=D.message)!=null&&f.includes("400")){const I=m.includes("!")?m.split("!")[1]:m;m=`${w[0]}!${I}`,x=await u.sheets.readRange(y,m)}else throw D}let T=`[Spreadsheet: "${g.title}" | Reading tab: "${m.split("!")[0]}" | All tabs in this spreadsheet: ${w.map(D=>`"${D}"`).join(", ")}]
`;return w.length>1&&(T+=`[To read a different tab, call read_sheet again with range like "${w[1]}!A1:Z500"]
`),x.length===0?T+"No data found in the specified range.":T+x.map(D=>D.join("	| ")).join(`
`)}catch(u){return await P(a,s,"google","read_sheet",u.message),`Failed to read sheet: ${u.message}`}}case"write_sheet":{if(!r)return"Authentication context unavailable.";try{const u=new de(a,s,r,n||"",o||"");if(!(await u.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{const R=new z(a),A=JSON.stringify(t.values);await R.store(s,"context",`Pending sheet write: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"write_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:A.length>15e3?"[[truncated — re-provide values on retry]]":t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The sheet write has been saved to temporary memory. After reconnecting, tell me "write the pending sheet data" to complete this.`:"")}const m=t.values;let g=t.range;const T=Math.max(...m.map(R=>R.length))+4,D=m.map(R=>{const A=[...R];for(;A.length<T;)A.push("");return A}),I=g.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(I){const R=I[1]||"",A=I[2],H=I[3],J=I[5],te=A.toUpperCase().charCodeAt(0)-64+T-1,ee=te<=26?String.fromCharCode(64+te):"Z";g=`${R}${A}${H}:${ee}${J}`}const L=await u.sheets.writeRange(t.spreadsheet_id,g,D);try{const R=new z(a),A=await R.search(s,`Pending sheet write: ${t.spreadsheet_id}`);for(const H of A)H.title.startsWith(`Pending sheet write: ${t.spreadsheet_id}`)&&await R.remove(H.id,s)}catch{}return`Written ${L.updatedCells} cells to ${g}.`}catch(u){return await P(a,s,"google","write_sheet",u.message),`Failed to write sheet: ${u.message}`}}case"append_sheet":{if(!r)return"Authentication context unavailable.";try{const u=new de(a,s,r,n||"",o||"");if(!(await u.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{await new z(a).store(s,"context",`Pending sheet append: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"append_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The append data has been saved to temporary memory. After reconnecting, tell me "append the pending sheet data" to complete this.`:"")}const m=await u.sheets.appendRows(t.spreadsheet_id,t.range,t.values);try{const g=new z(a),w=await g.search(s,`Pending sheet append: ${t.spreadsheet_id}`);for(const x of w)x.title.startsWith(`Pending sheet append: ${t.spreadsheet_id}`)&&await g.remove(x.id,s)}catch{}return`Appended ${m.updatedCells} cells to ${t.range}.`}catch(u){return await P(a,s,"google","append_sheet",u.message),`Failed to append to sheet: ${u.message}`}}case"create_sheet":{if(!r)return"Authentication context unavailable.";try{const u=new de(a,s,r,n||"",o||"");if(!(await u.isConnected()).connected){if(t.title)try{await new z(a).store(s,"context",`Pending spreadsheet create: "${t.title}"`,JSON.stringify({tool:"create_sheet",title:t.title,sheet_names:t.sheet_names??null,folder_name:t.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title?`

The spreadsheet request has been saved to temporary memory. After reconnecting, tell me "create the pending spreadsheet" and I'll complete this automatically.`:"")}const m=await u.sheets.createSpreadsheet(t.title,t.sheet_names);let g="";if(t.folder_name)try{const{token:w}=await(await Promise.resolve().then(()=>Pe)).getGoogleAuth(a,s,r,n||"",o||"");g=`
Folder: "${(await Jt(w,m.spreadsheetId,t.folder_name)).folderName}"`}catch(w){g=`
(Note: spreadsheet saved to Drive root — could not place in folder "${t.folder_name}": ${w.message})`}try{await new z(a).store(s,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${m.spreadsheetId} | URL: ${m.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${g}
ID: ${m.spreadsheetId}
URL: ${m.url}`}catch(u){return await P(a,s,"google","create_sheet",u.message),`Failed to create spreadsheet: ${u.message}`}}case"list_calendar_events":{if(!r)return"Authentication context unavailable.";try{const u=new de(a,s,r,n||"",o||""),y=t.calendar_id||"primary",m=t.days_ahead||7,g=new Date,w=new Date(g.getTime()+m*24*60*60*1e3),x=await u.calendar.listEvents(y,{timeMin:g.toISOString(),timeMax:w.toISOString(),query:t.query});return x.length===0?`No events found in the next ${m} days.`:x.map(T=>{var A;const D=T.start.dateTime||T.start.date||"TBD",I=T.end.dateTime||T.end.date||"",L=T.location?` 📍 ${T.location}`:"",R=((A=T.attendees)==null?void 0:A.map(H=>H.email).join(", "))||"";return`• ${T.summary} — ${D} to ${I}${L}${R?`
  Attendees: ${R}`:""}`}).join(`
`)}catch(u){return await P(a,s,"google","list_calendar",u.message),`Failed to list events: ${u.message}`}}case"create_calendar_event":{if(!r)return"Authentication context unavailable.";try{const u=new de(a,s,r,n||"",o||"");if(!(await u.isConnected()).connected){if(t.summary&&t.start_datetime&&t.end_datetime)try{await new z(a).store(s,"context",`Pending calendar event: "${t.summary}"`,JSON.stringify({tool:"create_calendar_event",summary:t.summary,description:t.description??null,location:t.location??null,start_datetime:t.start_datetime,end_datetime:t.end_datetime,attendees:t.attendees??null,calendar_id:t.calendar_id??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.summary&&t.start_datetime?`

The calendar event has been saved to temporary memory. After reconnecting, tell me "create the pending event" and I'll add it to your calendar.`:"")}const m=t.calendar_id||"primary",g=await u.calendar.createEvent(m,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});try{const w=new z(a),x=await w.search(s,`Pending calendar event: "${t.summary}"`);for(const T of x)T.title.startsWith(`Pending calendar event: "${t.summary}"`)&&await w.remove(T.id,s)}catch{}return`Event created: "${g.summary}"
ID: ${g.id}
Start: ${g.start.dateTime||g.start.date}`}catch(u){return await P(a,s,"google","create_event",u.message),`Failed to create event: ${u.message}`}}case"create_doc":{if(!r)return"Authentication context unavailable.";const u=new de(a,s,r,n||"",o||"");if(!(await u.isConnected()).connected){if(t.title&&t.content)try{await new z(a).store(s,"context",`Pending Google Doc save: "${t.title}"`,JSON.stringify({tool:"create_doc",title:t.title,content:t.content,folder_name:t.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" and I'll complete this automatically.`:"")}let m;try{m=await u.docs.createDocument(t.title)}catch(w){return await P(a,s,"google","create_doc",w.message),`Failed to create document: ${w.message}`}if(t.content)try{await u.docs.appendFormattedContent(m.documentId,t.content)}catch(w){return await P(a,s,"google","create_doc_append",w.message),`Document created but content could not be written (${w.message}).
ID: ${m.documentId}
URL: ${m.url}

Use append_to_doc with the document ID above to add content.`}let g="";if(t.folder_name)try{const{token:w}=await(await Promise.resolve().then(()=>Pe)).getGoogleAuth(a,s,r,n||"",o||"");g=`
Folder: "${(await Jt(w,m.documentId,t.folder_name)).folderName}"`}catch(w){g=`
(Note: document saved to Drive root — could not place in folder "${t.folder_name}": ${w.message})`}try{await new z(a).store(s,"context",`Document: ${t.title}`,`Document ID: ${m.documentId} | URL: ${m.url}`,6,"working")}catch{}try{const w=new z(a),x=await w.search(s,`Pending Google Doc save: "${t.title}"`);for(const T of x)T.title.startsWith(`Pending Google Doc save: "${t.title}"`)&&await w.remove(T.id,s)}catch{}return`Document created: "${t.title}"${g}
ID: ${m.documentId}
URL: ${m.url}`}case"read_doc":{if(!r)return"Authentication context unavailable.";try{const y=await new de(a,s,r,n||"",o||"").docs.readDocument(t.document_id);return`Document: "${y.title}"

${y.content}`}catch(u){return await P(a,s,"google","read_doc",u.message),`Failed to read document: ${u.message}`}}case"append_to_doc":{if(!r)return"Authentication context unavailable.";try{const u=new de(a,s,r,n||"",o||"");if(!(await u.isConnected()).connected){if(t.document_id&&t.content)try{await new z(a).store(s,"context",`Pending append to doc: "${t.document_id}"`,JSON.stringify({tool:"append_to_doc",document_id:t.document_id,content:t.content}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.'+(t.document_id&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" to complete this.`:"")}await u.docs.appendFormattedContent(t.document_id,t.content);let m=t.document_id;try{m=(await u.docs.readDocument(t.document_id)).title}catch{}try{const g=new z(a),w=await g.search(s,`Pending append to doc: "${t.document_id}"`);for(const x of w)x.title.startsWith(`Pending append to doc: "${t.document_id}"`)&&await g.remove(x.id,s)}catch{}return`Content appended to "${m}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(u){return await P(a,s,"google","append_to_doc",u.message),`Failed to append to document: ${u.message}`}}case"rewrite_doc":{if(!r)return"Authentication context unavailable.";try{const u=new de(a,s,r,n||"",o||"");if(!(await u.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";await u.docs.rewriteDocument(t.document_id,t.content);let m=t.document_id;try{m=(await u.docs.readDocument(t.document_id)).title}catch{}return`Document "${m}" reformatted successfully.
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(u){return await P(a,s,"google","rewrite_doc",u.message),`Failed to rewrite document: ${u.message}`}}case"delete_sheet_row":{if(!r)return"Authentication context unavailable.";try{const u=new de(a,s,r,n||"",o||"");if(!(await u.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const m=t.row_number;return m<2?"Row 1 is the header row and cannot be deleted. Specify row 2 or higher.":(await u.sheets.deleteRow(t.spreadsheet_id,t.sheet_name,m),`Row ${m} deleted from "${t.sheet_name}". All rows below have shifted up.`)}catch(u){return await P(a,s,"google","delete_sheet_row",u.message),`Failed to delete row: ${u.message}`}}case"delete_doc_content":{if(!r)return"Authentication context unavailable.";try{const u=new de(a,s,r,n||"",o||"");if(!(await u.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const m=await u.docs.deleteContent(t.document_id,t.text_to_remove);return m.occurrencesRemoved===0?"No matching text found in the document. The text must match exactly — check spacing, punctuation, and line breaks.":`Removed ${m.occurrencesRemoved} occurrence${m.occurrencesRemoved===1?"":"s"} from the document.`}catch(u){return await P(a,s,"google","delete_doc_content",u.message),`Failed to delete document content: ${u.message}`}}case"gmail_list":{if(!r)return"Authentication context unavailable.";try{const y=await new we(a,s,r,n||"",o||"").listMessages({maxResults:t.max_results||10,query:t.query});return y.length===0?"No messages found.":y.map((m,g)=>`${m.isUnread?"● ":"  "}${g+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(u){return await P(a,s,"gmail","list",u.message),(b=u.message)!=null&&b.includes("not connected")?u.message:`Gmail list error: ${u.message}`}}case"gmail_read":{if(!r)return"Authentication context unavailable.";try{const u=new we(a,s,r,n||"",o||""),y=await u.getMessage(t.message_id);if(!y)return"Message not found.";const m=await u.getMessageBody(t.message_id);return`**${y.subject}**
From: ${y.from}
To: ${y.to}
Date: ${y.date}

${m}`}catch(u){return await P(a,s,"gmail","read",u.message),`Gmail read error: ${u.message}`}}case"gmail_search":{if(!r)return"Authentication context unavailable.";try{const y=await new we(a,s,r,n||"",o||"").search(t.query,t.max_results||10);return y.length===0?`No results for: ${t.query}`:y.map((m,g)=>`${m.isUnread?"● ":"  "}${g+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(u){return await P(a,s,"gmail","search",u.message),`Gmail search error: ${u.message}`}}case"gmail_send":{if(!r)return"Authentication context unavailable.";try{const u=new we(a,s,r,n||"",o||"");if(!(await new de(a,s,r,n||"",o||"").isConnected()).connected){if(t.to&&t.subject&&t.body)try{await new z(a).store(s,"context",`Pending email: "${t.subject}"`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your email has been saved to temporary memory. After reconnecting, tell me "send the pending email" and I'll send it automatically.`:"")}const g=await u.send(t.to,t.subject,t.body,{cc:t.cc});try{const w=new z(a),x=await w.search(s,`Pending email: "${t.subject}"`);for(const T of x)T.title.startsWith(`Pending email: "${t.subject}"`)&&await w.remove(T.id,s)}catch{}return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${g.id}]`}catch(u){return await P(a,s,"gmail","send",u.message),`Gmail send error: ${u.message}`}}case"gmail_draft":{if(!r)return"Authentication context unavailable.";try{const u=new we(a,s,r,n||"",o||"");if(!(await new de(a,s,r,n||"",o||"").isConnected()).connected){if(t.to&&t.subject&&t.body)try{await new z(a).store(s,"context",`Pending draft: "${t.subject}"`,JSON.stringify({tool:"gmail_draft",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your draft has been saved to temporary memory. After reconnecting, tell me "create the pending draft" and I'll save it to Gmail.`:"")}const g=await u.createDraft(t.to,t.subject,t.body,{cc:t.cc});try{const x=new z(a),T=await x.search(s,`Pending draft: "${t.subject}"`);for(const D of T)D.title.startsWith(`Pending draft: "${t.subject}"`)&&await x.remove(D.id,s)}catch{}const w=t.cc?`, CC: ${t.cc}`:"";return`Draft created. To: ${t.to}${w}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${g.id}]`}catch(u){return await P(a,s,"gmail","draft",u.message),`Gmail draft error: ${u.message}`}}case"gmail_modify":{if(!r)return"Authentication context unavailable.";try{return await new we(a,s,r,n||"",o||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(u){return await P(a,s,"gmail","modify",u.message),`Gmail modify error: ${u.message}`}}case"gmail_unread_count":{if(!r)return"Authentication context unavailable.";try{const y=await new we(a,s,r,n||"",o||"").getUnreadCount();return`You have ${y} unread email${y!==1?"s":""} in Gmail.`}catch(u){return(v=u.message)!=null&&v.includes("not connected")?u.message:`Gmail error: ${u.message}`}}case"drive_list":{if(!r)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Pe)).getGoogleAuth(a,s,r,n||"",o||""),y=new URLSearchParams;y.set("pageSize",String(t.max_results||10)),y.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),y.set("orderBy","modifiedTime desc");let m="";t.folder_id?m=`'${t.folder_id}' in parents and trashed = false`:t.query?m=`${t.query} and trashed = false`:m="trashed = false",y.set("q",m);const g=await fetch(`https://www.googleapis.com/drive/v3/files?${y}`,{headers:{Authorization:`Bearer ${u}`}});if(!g.ok)throw new Error(`Drive API error (${g.status})`);const w=await g.json();return(k=w.files)!=null&&k.length?w.files.map((x,T)=>{var R,A;const D=((R=x.mimeType)==null?void 0:R.split(".").pop())||x.mimeType,I=x.size?`${(parseInt(x.size)/1024).toFixed(1)} KB`:"",L=((A=x.modifiedTime)==null?void 0:A.split("T")[0])||"";return`${T+1}. **${x.name}** (${D})
   ${I} · Modified: ${L}
   ${x.webViewLink||""}`}).join(`

`):"No files found."}catch(u){return await P(a,s,"google","drive_list",u.message),`Drive list error: ${u.message}`}}case"drive_search":{if(!r)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Pe)).getGoogleAuth(a,s,r,n||"",o||""),y=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,m=new URLSearchParams;m.set("q",y),m.set("pageSize",String(t.max_results||10)),m.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),m.set("orderBy","modifiedTime desc");const g=await fetch(`https://www.googleapis.com/drive/v3/files?${m}`,{headers:{Authorization:`Bearer ${u}`}});if(!g.ok)throw new Error(`Drive API error (${g.status})`);const w=await g.json();return(E=w.files)!=null&&E.length?w.files.map((x,T)=>{var L,R;const D=((L=x.mimeType)==null?void 0:L.split(".").pop())||x.mimeType,I=((R=x.modifiedTime)==null?void 0:R.split("T")[0])||"";return`${T+1}. **${x.name}** (${D}) — Modified: ${I}
   ${x.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(u){return await P(a,s,"google","drive_search",u.message),`Drive search error: ${u.message}`}}case"drive_read_file":{if(!r)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Pe)).getGoogleAuth(a,s,r,n||"",o||""),y=t.url_or_id.trim();let m=y;const g=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/\/presentation\/d\/([a-zA-Z0-9_-]+)/,/\/forms\/d\/([a-zA-Z0-9_-]+)/,/[?&]id=([a-zA-Z0-9_-]+)/,/\/d\/([a-zA-Z0-9_-]+)/];for(const J of g){const Q=y.match(J);if(Q){m=Q[1];break}}const w=await fetch(`https://www.googleapis.com/drive/v3/files/${m}?fields=id,name,mimeType,size`,{headers:{Authorization:`Bearer ${u}`}});if(!w.ok)throw new Error(`Drive API error (${w.status}): could not fetch file metadata`);const x=await w.json(),{name:T,mimeType:D}=x,I=t.extract_focus,L=I?`Focus specifically on extracting: ${I}`:"Extract and return all readable text content. Preserve structure where relevant.",R={"application/vnd.google-apps.document":"text/plain","application/vnd.google-apps.spreadsheet":"text/csv","application/vnd.google-apps.presentation":"text/plain"};if(R[D]){const J=R[D],Q=await fetch(`https://www.googleapis.com/drive/v3/files/${m}/export?mimeType=${encodeURIComponent(J)}`,{headers:{Authorization:`Bearer ${u}`}});if(!Q.ok)throw new Error(`Drive export error (${Q.status})`);const te=await Q.text();if(D==="application/vnd.google-apps.spreadsheet"){const ee=fn(te),ne=ee.length,pe=((C=ee[0])==null?void 0:C.length)??0;return`**${T}** (Google Sheet — ${ne} rows × ${pe} columns)

Parsed rows (JSON, ready for write_sheet/append_sheet):
${JSON.stringify(ee)}`}return`**${T}**

${te.substring(0,2e4)}`}if(D==="application/pdf"||T.toLowerCase().endsWith(".pdf")){const J=await fetch(`https://www.googleapis.com/drive/v3/files/${m}?alt=media`,{headers:{Authorization:`Bearer ${u}`}});if(!J.ok)throw new Error(`Drive download error (${J.status})`);const Q=await J.arrayBuffer(),te=Buffer.from(Q).toString("base64");let ee=null,ne="claude-haiku-4-5-20251001";for(const ct of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const ha=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,ct).first();if(ha&&r){const Xs=await K(ha.encrypted_value,r),St=JSON.parse(Xs);if(St.provider==="anthropic"){ee=St.apiKey,St.model&&(ne=St.model);break}}}catch{}if(!ee)return`"${T}" is a PDF. An Anthropic API key is required to extract PDF content. Please configure one in Settings → Keys.`;const pe=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ee,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:ne,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:te}},{type:"text",text:L}]}]})});if(!pe.ok){const ct=await pe.text();throw new Error(`Anthropic PDF extraction error: ${ct.substring(0,200)}`)}const Ht=((B=(M=(await pe.json()).content)==null?void 0:M[0])==null?void 0:B.text)||"";return`**${T}** (PDF from Drive)

${Ht}`}const A=await fetch(`https://www.googleapis.com/drive/v3/files/${m}?alt=media`,{headers:{Authorization:`Bearer ${u}`}});if(!A.ok)throw new Error(`Drive download error (${A.status})`);const H=await A.text();return`**${T}** (${D})

${H.substring(0,2e4)}`}catch(u){return await P(a,s,"google","drive_read_file",u.message),`Drive read error: ${u.message}`}}case"drive_delete_file":{if(!r)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Pe)).getGoogleAuth(a,s,r,n||"",o||""),y=t.url_or_id.trim();let m=y;const g=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const D of g){const I=y.match(D);if(I){m=I[1];break}}const w=await fetch(`https://www.googleapis.com/drive/v3/files/${m}?fields=name`,{headers:{Authorization:`Bearer ${u}`}});if(!w.ok)throw new Error(`Drive API error (${w.status})`);const x=await w.json(),T=await fetch(`https://www.googleapis.com/drive/v3/files/${m}`,{method:"PATCH",headers:{Authorization:`Bearer ${u}`,"Content-Type":"application/json"},body:JSON.stringify({trashed:!0})});if(!T.ok)throw new Error(`Drive API error (${T.status})`);return`"${x.name}" moved to trash. You can restore it from Drive trash within 30 days.`}catch(u){return await P(a,s,"google","drive_delete_file",u.message),`Drive delete error: ${u.message}`}}case"drive_organise":{if(!r)return"Authentication context unavailable.";if(!t.folder_name&&!t.new_name)return"Please provide at least a folder_name to move to or a new_name to rename.";try{const{token:u}=await(await Promise.resolve().then(()=>Pe)).getGoogleAuth(a,s,r,n||"",o||""),y=t.url_or_id.trim();let m=y;const g=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const x of g){const T=y.match(x);if(T){m=T[1];break}}const w=[];if(t.new_name){const x=await fetch(`https://www.googleapis.com/drive/v3/files/${m}`,{method:"PATCH",headers:{Authorization:`Bearer ${u}`,"Content-Type":"application/json"},body:JSON.stringify({name:t.new_name})});if(!x.ok)throw new Error(`Drive rename error (${x.status})`);w.push(`Renamed to "${t.new_name}"`)}if(t.folder_name){const{folderName:x}=await Jt(u,m,t.folder_name);w.push(`Moved to folder "${x}"`)}return w.join(". ")+"."}catch(u){return await P(a,s,"google","drive_organise",u.message),`Drive organise error: ${u.message}`}}case"web_search":try{const u=await Bt(t.query,{num:t.num_results||5,site:t.site});return u.error?`Web search failed: ${u.error}. Answer this question directly from your training knowledge and clearly state you are doing so.`:u.results.length===0?`Web search returned no results for "${t.query}". Answer this question directly from your training knowledge and clearly state you are doing so instead of searching.`:u.results.map((y,m)=>`${m+1}. [${y.title}](${y.link})
   ${y.snippet}`).join(`

`)}catch(u){return await P(a,s,"search","web_search",u.message),`Web search error: ${u.message}`}case"read_url":try{const u=t.url;if(!u||!u.startsWith("http://")&&!u.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const y=Math.min(t.max_length||8e3,15e3),{fetchPageContent:m}=await Promise.resolve().then(()=>ln),g=await m(u,y);return g.error?`Failed to read page: ${g.error}`:!g.text||g.text.length<20?`Page at ${u} returned no readable content.`:`Content from ${u} (${g.text.length} chars):

${g.text}`}catch(u){return await P(a,s,"search","read_url",u.message),`Read URL error: ${u.message}`}case"research":{if(!c)return"Research tool requires an LLM provider but none is available.";try{let u;try{const T=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"perplexity_api_key").first();T&&r&&(u=await K(T.encrypted_value,r))}catch{}const y=2e4,m=Cs(t.query,c,{depth:t.depth||"quick",site:t.site,perplexityApiKey:u}),g=new Promise(T=>setTimeout(()=>T(null),y)),w=await Promise.race([m,g]);if(w===null){const{webSearch:T}=await Promise.resolve().then(()=>Qr),D=await T(t.query,{num:5});if(D.error||D.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let I=`Research took too long, but here are the top search results:

`;return I+=D.results.map((L,R)=>`${R+1}. [${L.title}](${L.link})
   ${L.snippet}`).join(`

`),I}if(w.error)return`Research failed: ${w.error}`;let x=w.report;w.sources.length>0&&(x+=`

---
**Sources** (`+w.pagesRead+` pages read):
`,x+=w.sources.map((T,D)=>`[${D+1}] [${T.title}](${T.url})`).join(`
`));try{const T=new z(a),D=w.report.substring(0,600);await T.store(s,"context",`Research: ${t.query.substring(0,80)}`,D,6,"long_term")}catch{}return x}catch(u){return await P(a,s,"research","research",u.message),`Research error: ${u.message}`}}case"browser_task":{if(!r)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"browser_use_api_key").first();if(!u)return"Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key (get one at cloud.browser-use.com).";const y=(await K(u.encrypted_value,r)).trim();let m,g=t.task,w,x;if(t.site_name)try{const R=await a.prepare("SELECT id, encrypted_blob FROM site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE").bind(s,t.site_name).first();if(R){const A=JSON.parse(await K(R.encrypted_blob,r));m={username:A.username,password:A.password},x=A.sessionId,w=R.id,g=`${g}

When prompted to log in, use username {username} and password {password}.`}}catch{}const T=await Is(g,y,{secrets:m,sessionId:x}),D=async R=>{if(w)try{const A=await a.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(w,s).first();if(!A)return;const H=JSON.parse(await K(A.encrypted_blob,r));H.sessionId=R;const J=await it(JSON.stringify(H),r);await a.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(J,w,s).run()}catch{}},I=async()=>{if(!(!w||!x))try{const R=await a.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(w,s).first();if(!R)return;const A=JSON.parse(await K(R.encrypted_blob,r));delete A.sessionId;const H=await it(JSON.stringify(A),r);await a.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(H,w,s).run()}catch{}};if(T.status==="completed")return T.sessionId&&await D(T.sessionId),T.output??"[NO-OUTPUT] Browser task completed but returned no content — do NOT invent or summarise what the site may have contained. Tell the user the browser returned nothing and suggest they try again.";if(T.status==="timeout"){T.sessionId&&await D(T.sessionId);try{await new z(a).store(s,"context",`Browser task in progress: ${T.taskId}`,JSON.stringify({task_id:T.taskId,task:t.task}),9,"working")}catch{}return`[BROWSER_TIMEOUT:${T.taskId}] Browser task did not finish within the time limit. Tell the user it is still running and ask them to follow up in 2–3 minutes.`}await I();const L=[T.error,T.output].filter(Boolean).join(" — ");return`Browser task failed (ID: \`${T.taskId}\`): ${L||"No details returned. Check your Browser Use dashboard at cloud.browser-use.com."}`}catch(u){return await P(a,s,"browser","browser_task",u.message),`Browser task error: ${u.message}`}}case"browser_task_status":{if(!r)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"browser_use_api_key").first();if(!u)return"Browser Use API key not configured.";const y=await K(u.encrypted_value,r),m=await cn(t.task_id,y);if(m.done){try{const g=new z(a),w=await g.search(s,`Browser task in progress: ${t.task_id}`);for(const x of w)await g.remove(x.id,s)}catch{}return m.status==="finished"||m.status==="completed"?m.output?m.output:'[NO-OUTPUT] Browser task finished but returned no content. Do NOT invent or infer what emails or page data might have said. Tell the user: "The browser finished but returned no content — the site may have blocked automation or the login failed. Would you like to try again?"':`Browser task ended with status "${m.status}" and no output. Do NOT retry — report this to the user.`}return`[still-running] Browser task has not finished yet (status: ${m.status}). STOP — do not call browser_task_status again. Tell the user: "The browser is still working. Ask me 'what happened with the browser task?' in 2–3 minutes."`}catch(u){return await P(a,s,"browser","browser_task_status",u.message),`Browser status check error: ${u.message}`}}case"vault_lookup":try{const u=(t.site_name||"").trim();if(!u)return"No site name provided.";const m=((await a.prepare("SELECT name FROM site_credentials WHERE user_id = ? AND name LIKE ? COLLATE NOCASE").bind(s,`%${u}%`).all()).results||[]).map(g=>g.name);return m.length===0?`No vault entries found matching "${u}".`:`Vault entries matching "${u}": ${m.join(", ")}. Use site_name="${m[0]}" in browser_task to inject credentials automatically.`}catch{return"vault_lookup: could not query Secret Vault (table may not exist — run migrations)."}case"outlook_email_digest":try{const{buildOutlookDigest:u}=await Promise.resolve().then(()=>Yn),y=await a.prepare("SELECT * FROM users WHERE id = ?").bind(s).first();if(!y)return"Outlook digest error: user not found. Do not guess Outlook email content.";const m=await u(a,y);return`Outlook
${m.outlook&&m.outlook.length>0?m.outlook.join(`
`):"Outlook returned no content."}

Status: ${m.outlookStatus}${m.outlookTaskId?`
Browser task ID: ${m.outlookTaskId}`:""}`}catch(u){return`Outlook digest error: ${u.message}. Do not guess Outlook email content.`}case"search_places":{if(!r)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!u)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const y=await K(u.encrypted_value,r),m=await bs(y,t.query,{type:t.type});return m.error?`Places search failed: ${m.error}`:m.results.length===0?`No places found for "${t.query}".`:m.results.map((g,w)=>{const x=g.rating?` ★${g.rating} (${g.userRatingsTotal||0} reviews)`:"",T=g.openNow!==void 0?g.openNow?" · Open now":" · Closed":"",D=g.googleMapsUri?`
   ${g.googleMapsUri}`:"";return`${w+1}. **${g.name}**${x}${T}
   ${g.address}${D}
   [place_id: ${g.placeId}]`}).join(`

`)}catch(u){return await P(a,s,"google_api","search_places",u.message),`Places search error: ${u.message}`}}case"get_place_details":{if(!r)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await K(u.encrypted_value,r),m=await _s(y,t.place_id);if(m.error)return`Details lookup failed: ${m.error}`;if(!m.details)return"No details found.";const g=m.details;let w=`**${g.name}**
📍 ${g.address}`;if(g.phone&&(w+=`
📞 ${g.phone}`),g.website&&(w+=`
🌐 ${g.website}`),g.rating&&(w+=`
★ ${g.rating}`),g.googleMapsUri&&(w+=`
📌 ${g.googleMapsUri}`),g.openingHours&&(w+=`

Opening Hours:
${g.openingHours.join(`
`)}`),g.reviews&&g.reviews.length>0){w+=`

Recent Reviews:`;for(const x of g.reviews)w+=`
— ${x.author} (★${x.rating}, ${x.time}): "${x.text}"`}return w}catch(u){return await P(a,s,"google_api","place_details",u.message),`Place details error: ${u.message}`}}case"get_directions":{if(!r)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await K(u.encrypted_value,r),m=await Es(y,t.origin,t.destination,{mode:t.mode||"driving"});if(m.error)return`Directions failed: ${m.error}`;if(!m.route)return"No route found.";const g=m.route;let w=`**${g.startAddress}** → **${g.endAddress}**
`;return w+=`📏 ${g.distance} · ⏱️ ${g.duration}`,g.durationInTraffic&&(w+=` (with traffic: ${g.durationInTraffic})`),w+=`
via ${g.summary}`,w+=`

Steps:`,g.steps.forEach((x,T)=>{w+=`
${T+1}. ${x.instruction} (${x.distance}, ${x.duration})`}),w}catch(u){return await P(a,s,"google_api","directions",u.message),`Directions error: ${u.message}`}}case"get_travel_time":{if(!r)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await K(u.encrypted_value,r),m=await Ss(y,t.origin,t.destination,t.mode||"driving");if(m.error)return`Travel time lookup failed: ${m.error}`;let g=`${t.origin} → ${t.destination}: ${m.distance}, ${m.duration}`;return m.durationInTraffic&&(g+=` (with traffic: ${m.durationInTraffic})`),g}catch(u){return await P(a,s,"google_api","travel_time",u.message),`Travel time error: ${u.message}`}}case"translate_text":{if(!r)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await K(u.encrypted_value,r),m=await Ts(y,t.text,t.target_language,t.source_language);return m.error?`Translation failed: ${m.error}`:`[${m.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${m.translatedText}`}catch(u){return await P(a,s,"google_api","translate",u.message),`Translation error: ${u.message}`}}case"search_youtube":{if(!r)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await K(u.encrypted_value,r),m=await xs(y,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return m.error?`YouTube search failed: ${m.error}`:m.results.length===0?`No YouTube results for "${t.query}".`:m.results.map((g,w)=>{var x;return`${w+1}. **${g.title}**
   ${g.channelTitle} · ${((x=g.publishedAt)==null?void 0:x.split("T")[0])||""}
   ${g.description}
   ${g.url}`}).join(`

`)}catch(u){return await P(a,s,"google_api","youtube_search",u.message),`YouTube search error: ${u.message}`}}case"geocode_address":{if(!r)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await K(u.encrypted_value,r),m=await ks(y,t.address);return m.error?`Geocoding failed: ${m.error}`:m.results.length===0?`Location not found: "${t.address}"`:m.results.map((g,w)=>`${w+1}. ${g.address}
   Coordinates: ${g.lat}, ${g.lng}`).join(`
`)}catch(u){return await P(a,s,"google_api","geocode",u.message),`Geocoding error: ${u.message}`}}case"parse_document":{const u=t.file_id,y=t.extract_focus;if(!u)return"file_id is required to parse a document.";const m=await a.prepare("SELECT file_name, file_type, file_data, file_size, extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(u,s).first();if(!m)return"File not found. The file may have expired or the file_id is incorrect.";if(m.extracted_text)return`Document: ${m.file_name}

${m.extracted_text}`;const{file_name:g,file_type:w}=m;let{file_data:x}=m;if(x==="r2"){if(!p)return`File "${g}" is stored in R2 but no storage bucket is configured.`;const T=await p.get(u);if(!T)return`File "${g}" not found in storage. It may have been deleted.`;const D=await T.arrayBuffer();x=Buffer.from(D).toString("base64")}if(w.startsWith("text/"))try{const T=Buffer.from(x,"base64").toString("utf-8");return`Document: ${g}

${T.substring(0,2e4)}`}catch{return`Could not decode text file: ${g}`}if(w==="application/pdf"||w==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||g.toLowerCase().endsWith(".pdf")||g.toLowerCase().endsWith(".docx")){if(w==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||g.toLowerCase().endsWith(".docx")){try{const I=await Ns(Buffer.from(x,"base64"));if(I.length>50)return`Document: ${g}

${I.substring(0,2e4)}`}catch{}return`Could not extract text from "${g}". Try uploading to Google Drive and sharing the link — Drive can open and export Word documents directly.`}let T=null,D="claude-haiku-4-5-20251001";for(const I of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const L=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,I).first();if(L&&r){const R=await K(L.encrypted_value,r),A=JSON.parse(R);if(A.provider==="anthropic"){T=A.apiKey,A.model&&(D=A.model);break}}}catch{}if(T)try{const I=y?`Focus specifically on extracting: ${y}`:"Extract and return all readable text content from this document. Preserve structure where relevant.",L=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":T,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:D,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:x}},{type:"text",text:I}]}]})});if(L.ok){const A=((F=(Y=(await L.json()).content)==null?void 0:Y[0])==null?void 0:F.text)||"";return`Document: ${g}

${A}`}else{const R=await L.text();return`Could not parse ${g} via Anthropic API: ${R.substring(0,200)}`}}catch(I){return`Document parsing error for ${g}: ${I.message}`}return"To parse PDF documents, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set."}try{const T=Buffer.from(x,"base64").toString("utf-8").substring(0,2e3);return`Document: ${g} (${w})

Content preview:
${T}`}catch{return`Cannot read file: ${g} (${w})`}}case"create_skill":{const u=(j=t.name)==null?void 0:j.trim(),y=(W=t.description)==null?void 0:W.trim(),m=(q=t.instructions)==null?void 0:q.trim();if(!u||!y||!m)return"create_skill requires name, description, and instructions.";let g=u.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"");g||(g=`skill_${Date.now()}`);const w=await a.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(s,`${g}%`).all();(O=w.results)!=null&&O.some(I=>I.slug===g)&&(g=`${g}_${(((U=w.results)==null?void 0:U.length)||0)+1}`);const x=JSON.stringify(t.parameters||{}),T=JSON.stringify(t.required_tools||[]),D=JSON.stringify(t.examples||[]);return await a.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(s,u,g,y,m,x,T,D).run(),`Skill created: **${u}** (invoke as: "${g}")

You can now ask me to run "${u}" at any time. The skill will appear in Settings → Skills. You can also say "run my ${u} skill" to execute it.`}case"list_skills":{const y=t.include_disabled===!0?"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? ORDER BY created_at DESC":"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC",g=(await a.prepare(y).bind(s).all()).results||[];if(g.length===0)return`You haven't created any custom skills yet. Ask me to create one: "Create a skill that..."`;const w=g.map(x=>`• **${x.name}** (${x.slug}): ${x.description} [used ${x.usage_count} times${x.enabled?"":" — disabled"}]`).join(`
`);return`Your custom skills (${g.length}):

${w}`}default:{const u=e,y=await a.prepare("SELECT id, name, description, instructions, required_tools FROM user_skills WHERE user_id = ? AND slug = ? AND enabled = 1").bind(s,u).first();if(y){await a.prepare("UPDATE user_skills SET usage_count = usage_count + 1, last_used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(y.id).run();const m=(()=>{try{return JSON.parse(y.required_tools).join(", ")}catch{return""}})(),g=Object.keys(t).length>0?`

Inputs provided: ${JSON.stringify(t)}`:"";return`[SKILL: ${y.name}] Follow these instructions exactly:

${y.instructions}${g}

${m?`Tools to use: ${m}`:""}

Execute the steps above using your available tools. When complete, provide a clear summary of what was done and any results.`}return`Unknown tool: ${e}`}}}async function Hs(e,t,a,s,r){if(t.length>0&&t[t.length-1].role==="user"){const n="(Previous request did not complete. Please try again.)";await e.storeMessage(a,s,"assistant",n,"{}",r),t.push({id:-1,user_id:a,channel:s,role:"assistant",content:n,metadata:"{}",token_estimate:n.length,created_at:new Date().toISOString()})}}function Gs(e){for(let t=e.length-1;t>=0;t--)if(e[t].role==="assistant"){const a=typeof e[t].content=="string"?e[t].content:"";a.length<300&&/^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(a.trim())&&(e[t]={...e[t],content:"(My previous response was cut off before completing. Starting fresh.)"});break}}async function Oa(e,t,a,s,r,n,o){var q,O,U,u,y;const i=new z(t),l=(q=e.metadata)==null?void 0:q.thread_id,d=Date.now(),[c,p]=await Promise.all([i.buildContext(s.id),la(t,s.id)]),h=await i.getRecentConversations(s.id,30,l);await Hs(i,h,s.id,e.channel,l);const _=Bs(s,c,e.channel,p),f=Ps([{role:"system",content:_},...h.map(m=>({role:m.role,content:m.content})),{role:"user",content:e.text}]);Gs(f);const b=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],v=(c.match(/^- /gm)||[]).length;if(b.some(m=>m.test(e.text))||v<3)try{const m=await i.searchLongTerm(s.id,e.text,5);if(m.length>0){const g=m.map(w=>`- [${w.type}] ${w.title}: ${w.content}`).join(`
`);f.splice(f.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${g}]`})}}catch{}await i.storeMessage(s.id,e.channel,"user",e.text,"{}",l);const E=(o==null?void 0:o.maxTurns)??10,C=(o==null?void 0:o.tools)??await ia(t,s.id);let M="",B=0;const Y=[];for(let m=0;m<E;m++)try{m>0&&Us(f);const g=await a.chat(f,{tools:C,toolChoice:m===0&&(o!=null&&o.forceToolUseOnFirstTurn)?"required":void 0});if(g.usage&&(B+=g.usage.promptTokens+g.usage.completionTokens),g.toolCalls&&g.toolCalls.length>0){const w=g.content||`[calling: ${g.toolCalls.map(T=>{const D=T.arguments||{},I=Object.entries(D).filter(([L])=>!["content","values","body"].includes(L)).map(([L,R])=>`${L}="${String(R).substring(0,100)}"`).join(", ");return`${T.name}(${I})`}).join(", ")}]`;f.push({role:"assistant",content:w});for(const T of g.toolCalls)Y.push(T.name);const x=await Promise.all(g.toolCalls.map(async T=>{try{const D=await yt(T.name,T.arguments,t,s.id,{agentType:"full",providerName:a.name,channel:e.channel},s.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,s.timezone,a,n==null?void 0:n.DOCUMENTS_BUCKET),I=["parse_document","drive_read_file"].includes(T.name)?2e4:8e3,L=D.length>I?D.substring(0,I)+`
[...result truncated to prevent token limit — full content was extracted]`:D;return`[Tool Result for ${T.name}]: ${L}`}catch(D){return await P(t,s.id,"tool",T.name,D.message||"Tool execution failed"),`[Tool Error for ${T.name}]: ${D.message||"Execution failed"}`}}));f.push({role:"user",content:x.join(`

`)});continue}M=g.content;break}catch(g){if(r){const w=g.message||"",x=w.includes("401")||w.includes("403")||w.includes("authentication")||w.includes("credit balance"),T=w.includes("429"),D=x?1440:T?10:5;await r.recordError(a.name,w,D)}throw await P(t,s.id,"llm","provider_error",g.message||"Unknown LLM error",{provider:a.name,turn:m}),g}if(M=(M==null?void 0:M.trim())??"",!M)try{((O=f[f.length-1])==null?void 0:O.role)==="user"&&f.push({role:"assistant",content:"[gathering results]"}),f.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),M=(await a.chat(f,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me directly and I will answer from my knowledge."}catch{M="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge."}if(r&&B>0)try{await r.recordUsage(a.name,B)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,a.name,"full",B,Date.now()-d,1,e.channel).run()}catch{}const F=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your|the)\s+(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc)\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a Google Document but create_doc was never called. You MUST call create_doc NOW.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const m of F){const g=m.claimPattern.test(M),w=m.requiredTools.some(x=>Y.includes(x));if(g&&!w){try{await P(t,s.id,"llm",m.logType,"LLM claimed action without tool call",{response:M.substring(0,200)}),f.push({role:"assistant",content:M}),f.push({role:"user",content:m.enforcementMsg});const x=await a.chat(f,{tools:C.filter(T=>m.requiredTools.includes(T.name)),temperature:0});if((U=x.toolCalls)!=null&&U.length){for(const D of x.toolCalls){const I=await yt(D.name,D.arguments,t,s.id,{agentType:"full",providerName:a.name,channel:e.channel},s.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,s.timezone,a,n==null?void 0:n.DOCUMENTS_BUCKET);Y.push(D.name),f.push({role:"assistant",content:"",toolCalls:x.toolCalls}),f.push({role:"user",content:I})}const T=await a.chat(f,{tools:[]});T.content&&(M=T.content)}else M="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}let j=M.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim();if(!j&&Y.length>0){const m=[...new Set(Y)].join(", ");try{((u=f[f.length-1])==null?void 0:u.role)==="user"&&f.push({role:"assistant",content:"[completed tools]"}),f.push({role:"user",content:"Please summarise what you just did and provide the result to the user."}),j=((y=(await a.chat(f,{tools:[]})).content)==null?void 0:y.trim())||`Done. I used the following tools: ${m}.`}catch{j=`Done. I used the following tools: ${m}.`}}const W=Y.length>0?`[TOOLS_USED: ${[...new Set(Y)].join(", ")}] `:"";await i.storeMessage(s.id,e.channel,"assistant",At(W+j),"{}",l);try{const m=await t.prepare("SELECT COUNT(*) as c FROM conversations WHERE user_id = ? AND role = ?").bind(s.id,"assistant").first();m&&m.c%5===0&&m.c>0&&await Promise.race([vn(t,a,s,i,f),new Promise(g=>setTimeout(g,5e3))])}catch{}return j}async function vn(e,t,a,s,r){var c;const n=r.filter(p=>p.role!=="system").slice(-10);if(n.length<4)return;const i=[{role:"system",content:`Review this conversation and extract any information worth remembering long-term.
Only extract genuinely durable information — things that will still be relevant in future conversations.
Good examples: addresses, phone numbers, account IDs, spreadsheet IDs, document links, explicit preferences, recurring needs, key decisions.
Bad examples: temporary topics, one-off requests, information already in the system prompt.

For each item, output a line: TYPE|TITLE|CONTENT|IMPORTANCE
Types: fact, preference, context, decision
Importance: 1-10 (8+ = standing rules, 5-7 = regular facts)
If nothing worth extracting, output: NONE`},...n,{role:"user",content:"Extract durable information from the above conversation."}],d=((c=(await t.chat(i,{tools:[]})).content)==null?void 0:c.trim())||"";if(!(!d||d==="NONE"))for(const p of d.split(`
`)){const h=p.trim().split("|");if(h.length<4)continue;const[_,f,b,v]=h,k=["fact","preference","context","decision","summary","task"].find(C=>C===_.trim().toLowerCase());if(!k||!(f!=null&&f.trim())||!(b!=null&&b.trim()))continue;const E=Math.min(10,Math.max(1,parseInt(v)||5));await e.prepare(`INSERT OR IGNORE INTO memory_suggestions (user_id, type, title, content, importance, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`).bind(a.id,k,f.trim(),b.trim(),E).run().catch(async()=>{await s.store(a.id,k,f.trim(),b.trim(),E,"long_term")})}}const Ca={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function wn(e){for(const[t,a]of Object.entries(Ca))if(e.toLowerCase().includes(t.toLowerCase()))return a;return Ca.default}function bn(e,t,a,s){const r=wn(s),n=Math.floor(r*.75),o=[];let i=0,l=!1;const d=Yt(e);o.push({role:"system",content:e}),i+=d;const c=Yt(a);i+=c;const p=n-i,h=[];let _=0;for(let f=t.length-1;f>=0;f--){const b=t[f],v=Yt(b.content);if(_+v<=p)h.unshift({role:b.role,content:b.content}),_+=v;else{l=!0;break}}return o.push(...h),o.push({role:"user",content:a}),i+=_,{maxTokens:r,usedTokens:i,messages:o,wasTruncated:l}}async function*_n(e,t,a,s,r,n){var B,Y;const o=new z(t),i=(B=e.metadata)==null?void 0:B.thread_id,l=Date.now();yield{type:"thinking",data:{threadId:i,provider:a.name}};const[d,c]=await Promise.all([o.buildContext(s.id),la(t,s.id)]),p=await o.getRecentConversations(s.id,30,i);await Hs(o,p,s.id,e.channel,i);const h=Bs(s,d,e.channel,c),_=bn(h,p,e.text,a.name);await o.storeMessage(s.id,e.channel,"user",e.text,"{}",i);const f=await ia(t,s.id),b=10;let v="",k=0;const E=[..._.messages],C=[];Gs(E);for(let F=0;F<b;F++)try{F>0&&(yield{type:"thinking",data:{threadId:i}},Us(E));const j=await a.chat(E,{tools:f});if(j.usage&&(k+=j.usage.promptTokens+j.usage.completionTokens),j.toolCalls&&j.toolCalls.length>0){j.content&&(yield{type:"chunk",data:{text:j.content,threadId:i}});const O=j.content||`[calling: ${j.toolCalls.map(u=>{const y=u.arguments||{},m=Object.entries(y).filter(([g])=>!["content","values","body"].includes(g)).map(([g,w])=>`${g}="${String(w).substring(0,100)}"`).join(", ");return`${u.name}(${m})`}).join(", ")}]`;E.push({role:"assistant",content:O});const U=[];for(const u of j.toolCalls){yield{type:"tool_start",data:{tool:u.name,toolArgs:u.arguments,threadId:i}},C.push(u.name);try{const y=(x,T)=>yt(x,T,t,s.id,{agentType:"full",providerName:a.name,channel:e.channel},s.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,s.timezone,a,n==null?void 0:n.DOCUMENTS_BUCKET);let m;if(u.name==="browser_task"||u.name==="browser_task_status"){const T=y(u.name,u.arguments);e:for(;;){const D=await Promise.race([T.then(I=>({done:!0,r:I})),new Promise(I=>setTimeout(()=>I({done:!1}),15e3))]);if(D.done){m=D.r;break e}yield{type:"thinking",data:{threadId:i}}}if(u.name==="browser_task"){const D=m.match(/^\[BROWSER_TIMEOUT:([^\]]+)\]/);if(D){yield{type:"thinking",data:{threadId:i}};const I=y("browser_task_status",{task_id:D[1]});e:for(;;){const L=await Promise.race([I.then(R=>({done:!0,r:R})),new Promise(R=>setTimeout(()=>R({done:!1}),15e3))]);if(L.done){m=L.r;break e}yield{type:"thinking",data:{threadId:i}}}}}}else m=await y(u.name,u.arguments);yield{type:"tool_end",data:{tool:u.name,toolResult:m.substring(0,500)+(m.length>500?"...":""),threadId:i}};const g=["parse_document","drive_read_file"].includes(u.name)?2e4:8e3,w=m.length>g?m.substring(0,g)+`
[...result truncated to prevent token limit — full content was extracted]`:m;U.push(`[Tool Result for ${u.name}]: ${w}`)}catch(y){await P(t,s.id,"tool",u.name,y.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:u.name,toolResult:`Error: ${y.message||"Execution failed"}`,threadId:i}},U.push(`[Tool Error for ${u.name}]: ${y.message||"Execution failed"}`)}}E.push({role:"user",content:U.join(`

`)});continue}v=j.content;const W=At(v);await o.storeMessage(s.id,e.channel,"assistant",W,"{}",i);const q=50;for(let O=0;O<W.length;O+=q)yield{type:"chunk",data:{text:W.substring(O,O+q),threadId:i}},O+q<W.length&&await new Promise(u=>setTimeout(u,10));break}catch(j){if(r){const O=j.message||"",U=O.includes("401")||O.includes("403")||O.includes("authentication")||O.includes("credit balance"),u=O.includes("429"),y=U?1440:u?10:5;await r.recordError(a.name,O,y)}await P(t,s.id,"llm","provider_error",j.message||"Unknown LLM error",{provider:a.name,turn:F});const W=j.message||"An error occurred",q=W.includes("429")||W.toLowerCase().includes("rate limit")||W.toLowerCase().includes("too many requests")?"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.":W;try{await o.storeMessage(s.id,e.channel,"assistant",`⚠️ ${q}`,"{}",i)}catch{}yield{type:"error",data:{error:q,threadId:i}};return}if(v=(v==null?void 0:v.trim())??"",!v)try{E.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),v=(await a.chat(E,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me to answer directly from my knowledge.";const j=At(v);await o.storeMessage(s.id,e.channel,"assistant",j,"{}",i);const W=50;for(let q=0;q<j.length;q+=W)yield{type:"chunk",data:{text:j.substring(q,q+W),threadId:i}},q+W<j.length&&await new Promise(O=>setTimeout(O,10))}catch{v="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.",await o.storeMessage(s.id,e.channel,"assistant",v,"{}",i).catch(()=>{}),yield{type:"chunk",data:{text:v,threadId:i}}}if(r&&k>0)try{await r.recordUsage(a.name,k)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,a.name,"full",k,Date.now()-l,1,e.channel).run()}catch{}const M=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your\s+|the\s+)(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc)\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a Google Document but create_doc was never called. You MUST call create_doc NOW.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const F of M){const j=F.claimPattern.test(v),W=F.requiredTools.some(q=>C.includes(q));if(j&&!W){try{await P(t,s.id,"llm",F.logType,"LLM claimed action without tool call (streaming)",{response:v.substring(0,200)}),E.push({role:"assistant",content:v}),E.push({role:"user",content:F.enforcementMsg});const q=await a.chat(E,{tools:f.filter(O=>F.requiredTools.includes(O.name)),temperature:0});if((Y=q.toolCalls)!=null&&Y.length){for(const U of q.toolCalls){const u=await yt(U.name,U.arguments,t,s.id,{agentType:"full",providerName:a.name,channel:e.channel},s.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,s.timezone,a,n==null?void 0:n.DOCUMENTS_BUCKET);C.push(U.name),E.push({role:"assistant",content:"",toolCalls:q.toolCalls}),E.push({role:"user",content:u})}const O=await a.chat(E,{tools:[]});O.content&&(v=O.content)}else v="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}yield{type:"done",data:{threadId:i,provider:a.name,tokenCount:k}}}async function Ra(e,t,a,s,r,n,o,i){await n.storeMessage(r.id,t.channel,"user",t.text,"{}",i);const l=await yt(e.tool,e.args,a,r.id,{agentType:"direct",channel:t.channel},r.pin_hash,o==null?void 0:o.GOOGLE_CLIENT_ID,o==null?void 0:o.GOOGLE_CLIENT_SECRET,o==null?void 0:o.GOOGLE_API_KEY,o==null?void 0:o.GOOGLE_CSE_ID,r.timezone,s,o==null?void 0:o.DOCUMENTS_BUCKET),d=`[TOOLS_USED: ${e.tool}] ${l}`.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"");return await n.storeMessage(r.id,t.channel,"assistant",d,"{}",i),l}async function da(e,t,a,s,r,n){var f;const o=new z(t),i=(f=e.metadata)==null?void 0:f.thread_id,l=await o.buildContext(s.id),d=oa(e.text,l);if(d.agent==="conversation")return Fs(e,t,a,s,l,r,i);const c=As(e.text);if(c)return Ra(c,e,t,a,s,o,n,i);const p=(await o.getRecentConversations(s.id,10,i)).map(b=>b.content).join(`
`),h=Ms(e.text,p);if(h)return Ra(h,e,t,a,s,o,n,i);const _=d.confidence>=.85;if(e.channel==="telegram"){const b=await ia(t,s.id);return Oa(e,t,a,s,r,n,{maxTurns:10,tools:b,forceToolUseOnFirstTurn:_})}return Oa(e,t,a,s,r,n,{forceToolUseOnFirstTurn:_})}async function Fs(e,t,a,s,r,n,o){const i=new z(t),l=Date.now(),d=js(s.timezone),c=await la(t,s.id),p=c?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. Do not store copies in memory or contradict them.
${c}

${r}`:r,h=Ls("conversation",s,p,s.timezone,d,e.channel),_=(await i.getRecentConversations(s.id,30,o)).filter(E=>!E.content.startsWith("[Autonomous Scheduled Task]")&&!E.content.startsWith("[Scheduled Reminder]")),f=Ps([{role:"system",content:h},..._.map(E=>({role:E.role,content:E.content})),{role:"user",content:e.text}]);await i.storeMessage(s.id,e.channel,"user",e.text,"{}",o);let b=0,v="";try{const E=await a.chat(f,{temperature:.8});E.usage&&(b=E.usage.promptTokens+E.usage.completionTokens),v=E.content}catch(E){if(n){const C=E.message||"",M=C.includes("401")||C.includes("403")||C.includes("authentication")||C.includes("credit balance"),B=C.includes("429"),Y=M?1440:B?10:5;await n.recordError(a.name,C,Y)}throw await P(t,s.id,"llm","conversation_error",E.message,{provider:a.name}),E}if(n&&b>0)try{await n.recordUsage(a.name,b)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,a.name,"conversation",b,Date.now()-l,1,e.channel).run()}catch{}const k=At(v);return await i.storeMessage(s.id,e.channel,"assistant",k,"{}",o),k}async function*En(e,t,a,s,r,n){var c;const o=new z(t),i=(c=e.metadata)==null?void 0:c.thread_id,l=await o.buildContext(s.id),d=oa(e.text,l);if(yield{type:"thinking",data:{threadId:i,provider:a.name}},d.agent!=="conversation"){yield*_n(e,t,a,s,r,n);return}try{const p=await Fs(e,t,a,s,l,r,i),h=50;for(let _=0;_<p.length;_+=h)yield{type:"chunk",data:{text:p.substring(_,_+h),threadId:i}},_+h<p.length&&await new Promise(f=>setTimeout(f,10))}catch(p){yield{type:"error",data:{error:p.message||"An error occurred",threadId:i}};return}yield{type:"done",data:{threadId:i,provider:a.name,tokenCount:0}}}const X=new ve;async function Tn(e,t){var r;const a=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,role:s.role,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",a),await t()}X.use("/*",Tn);X.get("/threads",async e=>{const t=e.get("user"),a=e.req.query("archived")==="1",s=parseInt(e.req.query("limit")||"30"),r=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(t.id,a?1:0,s).all();return e.json({threads:r.results||[]})});X.post("/threads",async e=>{const t=e.get("user"),{title:a}=await e.req.json(),s=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a||"New conversation").first();return e.json({thread:s})});X.put("/threads/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),s=await e.req.json(),r=[],n=[];return s.title!==void 0&&(r.push("title = ?"),n.push(s.title)),s.is_archived!==void 0&&(r.push("is_archived = ?"),n.push(s.is_archived?1:0)),r.push("updated_at = CURRENT_TIMESTAMP"),n.push(a,t.id),r.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...n).run(),e.json({success:!0}))});X.delete("/threads/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(a,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});X.post("/upload",async e=>{const t=e.get("user"),a=!!e.env.DOCUMENTS_BUCKET,s=a?100*1024*1024:700*1024;let r,n,o,i=null,l=null;try{if((e.req.header("Content-Type")||"").includes("multipart/form-data")){const v=(await e.req.formData()).get("file");if(!v)return e.json({error:"No file provided."},400);if(r=v.name,n=v.type||"application/octet-stream",o=v.size,o>s)return e.json({error:`File too large (max ${a?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);i=await v.arrayBuffer()}else{const b=await e.req.json();if(!b.file_name||!b.file_data)return e.json({error:"file_name and file_data are required."},400);if(r=b.file_name,n=b.file_type||"application/octet-stream",l=b.file_data,o=b.file_size||Math.round(l.length*.75),o>s)return e.json({error:`File too large (max ${a?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);if(a){const v=atob(l);i=new ArrayBuffer(v.length);const k=new Uint8Array(i);for(let E=0;E<v.length;E++)k[E]=v.charCodeAt(E)}}const c=crypto.randomUUID();let p;a&&i?(await e.env.DOCUMENTS_BUCKET.put(c,i,{httpMetadata:{contentType:n},customMetadata:{fileName:r,userId:String(t.id)}}),p="r2"):p=l||(i?Buffer.from(i).toString("base64"):""),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(c,t.id,r,n,p,o).run(),await e.env.DB.prepare(`INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status)
       VALUES (?, ?, 'upload', ?, ?, ?, 'uploaded')
       ON CONFLICT(user_id, file_id) DO UPDATE SET
         name = excluded.name,
         mime_type = excluded.mime_type,
         size = excluded.size,
         updated_at = CURRENT_TIMESTAMP`).bind(t.id,c,r,n,o).run().catch(()=>null);const h=n==="application/pdf"||r.toLowerCase().endsWith(".pdf"),_=n==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||r.toLowerCase().endsWith(".docx");if(_)try{const{extractDocxTextFromBuffer:b}=await Promise.resolve().then(()=>un),v=l?Buffer.from(l,"base64"):i?Buffer.from(i):null;if(v){const k=await b(v);k.length>50&&(await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(k,c).run(),await e.env.DB.prepare("UPDATE document_library SET status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(c,t.id).run().catch(()=>null))}}catch{}if(h&&t.pin_hash){const b=l||(i?Buffer.from(i).toString("base64"):null),v=t.pin_hash,k=t.id,E=e.env.DB,C=e.env.DOCUMENTS_BUCKET,M=(async()=>{var B,Y;try{let F=null,j="claude-haiku-4-5-20251001";const{decrypt:W}=await Promise.resolve().then(()=>Pt);for(const y of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const m=await E.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(k,y).first();if(m){const g=await W(m.encrypted_value,v),w=JSON.parse(g);if(w.provider==="anthropic"){F=w.apiKey,w.model&&(j=w.model);break}}}catch{}if(!F)return;let q;if(p==="r2"&&C){const y=await C.get(c);if(!y)return;q=Buffer.from(await y.arrayBuffer()).toString("base64")}else if(b)q=b;else return;const O=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":F,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:j,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:q}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!O.ok)return;const u=((Y=(B=(await O.json()).content)==null?void 0:B[0])==null?void 0:Y.text)||"";u&&(await E.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(u,c).run(),await E.prepare("UPDATE document_library SET status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(c,k).run().catch(()=>null))}catch{}})();try{e.executionCtx.waitUntil(M)}catch{}}let f="";if(n.startsWith("text/"))try{const b=l||(i?Buffer.from(i).toString("base64"):"");f=Buffer.from(b,"base64").toString("utf-8").substring(0,500),f&&await e.env.DB.prepare("UPDATE document_library SET status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(c,t.id).run().catch(()=>null)}catch{}return e.json({file_id:c,name:r,type:n,size:o,text_preview:f,storage:a?"r2":"d1",extracting:h&&!_})}catch(d){console.error("File upload error:",d);try{const{logError:c}=await Promise.resolve().then(()=>Qe);await c(e.env.DB,t.id,"upload","upload_error",d.message||"Unknown upload error")}catch{}return e.json({error:`Upload failed: ${d.message||"Unknown error"}`},500)}});X.post("/send",async e=>{const t=e.get("user"),{message:a,channel:s="web",thread_id:r,files:n}=await e.req.json();if(!a||typeof a!="string"||a.trim().length===0)return e.json({error:"Message is required"},400);let o="";if(n&&Array.isArray(n)&&n.length>0){o=`

[Attached files:
`;for(const d of n)o+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(o+=`
  Preview: ${d.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=r;if(!i){const d=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();i=d==null?void 0:d.id}const l={userId:t.id,username:t.username,channel:s,text:a.trim()+o,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:d,rotation:c}=await lt(e.env.DB,t.id,t.pin_hash),p=await da(l,e.env.DB,d,t,c,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});return!r&&i?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run():i&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),e.json({response:p,timestamp:new Date().toISOString(),channel:l.channel,provider:d.name,thread_id:i})}catch(d){console.error("Chat error:",d);const c=d.message||"";if(c.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400);if(c.includes("All LLM providers failed"))return e.json({error:c,type:"no_provider",thread_id:i},400);if(c.includes("429")||c.includes("limit reached")||c.includes("rate limit")||c.includes("Too Many Requests"))return e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:i},429);const p=c.includes("401")||c.includes("403")||c.includes("authentication")||c.includes("credit balance")||c.includes("invalid")&&c.includes("key");try{const{logError:h}=await Promise.resolve().then(()=>Qe);await h(e.env.DB,t.id,"llm","chat_error",c)}catch{}return e.json({error:p?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:c,type:p?"no_provider":void 0,thread_id:i},p?400:500)}});function Ia(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}X.post("/stream",async e=>{const t=e.get("user"),{message:a,channel:s="web",thread_id:r,files:n}=await e.req.json();if(!a||typeof a!="string"||a.trim().length===0)return e.json({error:"Message is required"},400);let o="";if(n&&Array.isArray(n)&&n.length>0){o=`

[Attached files:
`;for(const d of n)o+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(o+=`
  Preview: ${d.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=r;if(!i){const d=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();i=d==null?void 0:d.id}const l={userId:t.id,username:t.username,channel:s,text:a.trim()+o,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:d,rotation:c}=await lt(e.env.DB,t.id,t.pin_hash),p=new ReadableStream({async start(h){const _=new TextEncoder;try{const f=En(l,e.env.DB,d,t,c,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});for await(const b of f)b.data.threadId||(b.data.threadId=i),h.enqueue(_.encode(Ia(b)));i&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),h.close()}catch(f){const b={type:"error",data:{error:f.message||"An error occurred",threadId:i}};h.enqueue(_.encode(Ia(b))),h.close()}}});return new Response(p,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(i||"")}})}catch(d){console.error("Stream setup error:",d);const c=d.message||"";return c.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400):c.includes("429")||c.includes("limit reached")||c.includes("rate limit")||c.includes("Too Many Requests")?e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:i},429):e.json({error:"Something went wrong setting up the stream.",details:c,thread_id:i},500)}});X.get("/threads/:id/messages",async e=>{var n;const t=e.get("user"),a=parseInt(e.req.param("id")),s=parseInt(e.req.query("limit")||"50"),r=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,a,s).all();return e.json({messages:(r.results||[]).reverse(),total:((n=r.results)==null?void 0:n.length)||0})});X.get("/history",async e=>{var l;const t=e.get("user"),a=parseInt(e.req.query("limit")||"50"),s=parseInt(e.req.query("offset")||"0"),r=e.req.query("thread_id");let n,o;r?(n=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[t.id,parseInt(r),a,s]):(n=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[t.id,a,s]);const i=await e.env.DB.prepare(n).bind(...o).all();return e.json({messages:(i.results||[]).reverse(),total:((l=i.results)==null?void 0:l.length)||0})});X.delete("/history",async e=>{const t=e.get("user"),a=e.req.query("thread_id");return a?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(a)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});X.get("/dashboard",async e=>{const t=e.get("user"),[a,s,r,n,o,i,l,d]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM user_skills WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM preferences WHERE user_id = ?").bind(t.id).first().catch(()=>null)]);return e.json({threads:(a==null?void 0:a.cnt)||0,active_schedules:(s==null?void 0:s.cnt)||0,memories:(r==null?void 0:r.cnt)||0,recent_threads:n.results||[],provider_usage:[],unread_notifications:(o==null?void 0:o.cnt)||0,errors:(i==null?void 0:i.cnt)||0,skills_count:(l==null?void 0:l.cnt)||0,preferences_count:(d==null?void 0:d.cnt)||0})});X.get("/gmail/unread",async e=>{const t=e.get("user");try{const a=e.env.GOOGLE_CLIENT_ID,s=e.env.GOOGLE_CLIENT_SECRET;if(!a||!s)return e.json({count:null,reason:"google_not_configured"});const n=await new we(e.env.DB,t.id,t.pin_hash,a,s).getUnreadCount();return e.json({count:n})}catch(a){return e.json({count:null,reason:a.message})}});X.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));X.get("/notifications/count",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(a==null?void 0:a.cnt)||0})});X.get("/notifications",async e=>{const t=e.get("user"),a=parseInt(e.req.query("limit")||"20"),s=await e.env.DB.prepare(`SELECT id, type, title, body, is_read, source, action_url, created_at,
            COALESCE(priority, 'normal') as priority, COALESCE(status, 'open') as status, due_at, action_payload
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,a).all();return e.json({notifications:s.results||[]})});X.post("/notifications/:id/done",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1, status = 'done' WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});X.post("/notifications/:id/snooze",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),s=await e.req.json().catch(()=>({})),r=Math.max(1,Math.min(1440*7,Number(s.minutes||10)));return await e.env.DB.prepare("UPDATE notifications SET is_read = 0, status = 'snoozed', due_at = datetime('now', '+' || ? || ' minutes') WHERE id = ? AND user_id = ?").bind(r,a,t.id).run(),e.json({success:!0,minutes:r})});X.post("/notifications/:id/reschedule",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),s=await e.req.json().catch(()=>({}));let r=s.due_at||"";if(s.preset==="tomorrow_9"){const n=new Date;n.setDate(n.getDate()+1),n.setHours(9,0,0,0),r=n.toISOString()}return r?(await e.env.DB.prepare("UPDATE notifications SET is_read = 0, status = 'rescheduled', due_at = ? WHERE id = ? AND user_id = ?").bind(r,a,t.id).run(),e.json({success:!0,due_at:r})):e.json({error:"due_at or preset required"},400)});X.put("/notifications/:id/read",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});X.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});X.delete("/notifications/all",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});X.delete("/notifications/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});X.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const Z=new ve;async function kn(e,t){var r;const a=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,role:s.role,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),await t()}Z.use("/*",kn);Z.get("/profile",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(a==null?void 0:a.name)||t.name,role:(a==null?void 0:a.role)||t.role,personality_prompt:(a==null?void 0:a.personality_prompt)||t.personality_prompt,telegram_chat_id:(a==null?void 0:a.telegram_chat_id)||t.telegram_chat_id,timezone:(a==null?void 0:a.timezone)||t.timezone,assistant_name:(a==null?void 0:a.assistant_name)||"Karna"})});Z.put("/profile",async e=>{const t=e.get("user"),a=await e.req.json(),s=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],r=[],n=[];for(const o of s)a[o]!==void 0&&(r.push(`${o} = ?`),n.push(a[o]));return r.length===0?e.json({error:"No valid fields to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),n.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${r.join(", ")} WHERE id = ?`).bind(...n).run(),e.json({success:!0}))});const ta=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","perplexity_api_key","browser_use_api_key"];Z.get("/credentials",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT id, service, label, encrypted_value, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all(),s=["llm_slot_1","llm_slot_2","llm_slot_3"],r=await Promise.all((a.results||[]).map(async n=>{let o;if(s.includes(n.service))try{const i=await K(n.encrypted_value,t.pin_hash);o=JSON.parse(i).provider}catch{}return{id:n.id,service:n.service,label:n.label,created_at:n.created_at,updated_at:n.updated_at,configured:!0,...o?{provider_id:o}:{}}}));return e.json({credentials:r,available_services:ta,llm_providers:ft})});Z.put("/credentials",async e=>{const t=e.get("user"),{service:a,value:s,label:r}=await e.req.json();if(!a||!s)return e.json({error:"Service name and value are required"},400);if(!ta.includes(a))return e.json({error:`Invalid service. Must be one of: ${ta.join(", ")}`},400);const n=await it(s,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,a,r||a,n).run(),e.json({success:!0,service:a})});Z.delete("/credentials/:service",async e=>{const t=e.get("user"),a=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,a).run(),e.json({success:!0})});Z.get("/memory",async e=>{const t=e.get("user"),a=e.req.query("type"),r=await new z(e.env.DB).getAll(t.id,a||void 0,100);return e.json({memories:r})});Z.post("/memory",async e=>{const t=e.get("user"),{type:a,title:s,content:r,importance:n}=await e.req.json();return!a||!s||!r?e.json({error:"Type, title, and content are required"},400):(await new z(e.env.DB).store(t.id,a,s,r,n||5),e.json({success:!0}))});Z.delete("/memory/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await new z(e.env.DB).remove(a,t.id),e.json({success:!0})});Z.get("/preferences",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT id, content, created_at FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t.id).all();return e.json({preferences:a.results||[]})});Z.post("/preferences",async e=>{const t=e.get("user"),{content:a}=await e.req.json();return a!=null&&a.trim()?(await e.env.DB.prepare("INSERT INTO preferences (user_id, content) VALUES (?, ?)").bind(t.id,a.trim()).run(),e.json({success:!0})):e.json({error:"Content required"},400)});Z.put("/preferences/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),{content:s}=await e.req.json();return s!=null&&s.trim()?(await e.env.DB.prepare("UPDATE preferences SET content = ? WHERE id = ? AND user_id = ?").bind(s.trim(),a,t.id).run(),e.json({success:!0})):e.json({error:"Content required"},400)});Z.delete("/preferences/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM preferences WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});Z.get("/schedules",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:a.results||[]})});Z.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),{enabled:s}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s?1:0,a,t.id).run(),e.json({success:!0})});Z.delete("/schedules/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});Z.get("/errors",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:a.results||[]})});Z.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});Z.post("/credentials/validate",async e=>{const t=e.get("user"),{service:a,value:s}=await e.req.json();if(!a)return e.json({error:"Service required"},400);let r=s;if(!r){const n=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,a).first();if(!n)return e.json({valid:!1,message:"No credential saved for this slot."});try{r=await K(n.encrypted_value,t.pin_hash)}catch{return e.json({valid:!1,message:"Failed to decrypt stored credential."})}}switch(a){case"anthropic":try{const n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return n.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):n.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${n.status}.`})}catch(n){return e.json({valid:!1,message:`Connection failed: ${n.message}`})}case"openai":try{const n=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${r}`}});return n.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):n.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${n.status}.`})}catch(n){return e.json({valid:!1,message:`Connection failed: ${n.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const n=JSON.parse(r);if(!n.provider||!n.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const o=ft[n.provider];if(!o)return e.json({valid:!1,message:`Unknown provider: ${n.provider}`});if(o.apiFormat==="anthropic"){const i=await fetch(o.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":n.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:o.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return i.ok?e.json({valid:!0,message:`${o.label} API key is valid.`}):i.status===401?e.json({valid:!1,message:`Invalid ${o.label} API key.`}):e.json({valid:!1,message:`${o.label} responded with status ${i.status}.`})}else{const i=o.apiBase+(o.validatePath||"/v1/models"),l=await fetch(i,{headers:{Authorization:`Bearer ${n.apiKey}`}});if(l.ok)return e.json({valid:!0,message:`${o.label} API key is valid.`});if(l.status===401||l.status===403)return e.json({valid:!1,message:`Invalid ${o.label} API key.`});if(l.status===404)try{const d=await fetch(o.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.apiKey}`},body:JSON.stringify({model:o.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return d.ok||d.status===200?e.json({valid:!0,message:`${o.label} API key is valid.`}):d.status===401||d.status===403?e.json({valid:!1,message:`Invalid ${o.label} API key.`}):e.json({valid:!1,message:`${o.label} responded with status ${d.status}.`})}catch(d){return e.json({valid:!1,message:`${o.label} chat test failed: ${d.message}`})}return e.json({valid:!1,message:`${o.label} responded with status ${l.status}.`})}}catch(n){return n instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${n.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});case"perplexity_api_key":try{const n=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar",messages:[{role:"user",content:"test"}],max_tokens:1})});return n.ok||n.status===400?e.json({valid:!0,message:"Perplexity API key is valid."}):n.status===401?e.json({valid:!1,message:"Invalid Perplexity API key."}):e.json({valid:!1,message:`Perplexity responded with status ${n.status}.`})}catch(n){return e.json({valid:!1,message:`Connection failed: ${n.message}`})}default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});Z.get("/google/status",async e=>{const t=e.get("user");try{const a=await ra(e.env.DB,t.id,t.pin_hash),s=gs(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...a,oauth_client_configured:s})}catch(a){return e.json({connected:!1,error:a.message})}});Z.get("/google/auth-url",async e=>{var t;e.get("user");try{const a=e.env.GOOGLE_CLIENT_ID,s=e.env.GOOGLE_CLIENT_SECRET;if(!a||!s)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const r=new URL(e.req.url),n=`${r.protocol}//${r.host}/auth/google/callback`,o=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),i=ms(a,n,o);return e.json({auth_url:i,redirect_uri:n})}catch(a){return e.json({error:`Failed to generate auth URL: ${a.message}`},500)}});Z.post("/google/disconnect",async e=>{const t=e.get("user");try{return await ys(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(a){return e.json({error:a.message},500)}});Z.post("/google/test",async e=>{const t=e.get("user");try{const{token:a,email:s}=await dt(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),r=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${a}`}}),n=!0,o=r.ok;return e.json({success:!0,email:s,scopes:{sheets:n,calendar:o,docs:n,drive:n},message:o?`Connected as ${s} — all services working.`:`Connected as ${s} — calendar access issue (${r.status}).`})}catch(a){return e.json({success:!1,error:a.message})}});Z.get("/site-vault",async e=>{const t=e.get("user");try{const a=await e.env.DB.prepare("SELECT id, name, created_at, updated_at FROM site_credentials WHERE user_id = ? ORDER BY name ASC").bind(t.id).all();return e.json({entries:a.results||[]})}catch{return e.json({entries:[]})}});Z.put("/site-vault",async e=>{const t=e.get("user");try{const{name:a,username:s,password:r,notes:n}=await e.req.json();if(!(a!=null&&a.trim())||!(s!=null&&s.trim())||!(r!=null&&r.trim()))return e.json({error:"name, username, and password are required"},400);const o=JSON.stringify({username:s.trim(),password:r,...n?{notes:n}:{}}),i=await it(o,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO site_credentials (user_id, name, encrypted_blob)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, name) DO UPDATE SET
         encrypted_blob = excluded.encrypted_blob,
         updated_at = CURRENT_TIMESTAMP`).bind(t.id,a.trim(),i).run(),e.json({success:!0,name:a.trim()})}catch(a){return e.json({error:(a==null?void 0:a.message)||"Failed to save credential"},500)}});Z.delete("/site-vault/:id",async e=>{const t=e.get("user");try{const a=Number(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM site_credentials WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})}catch(a){return e.json({error:(a==null?void 0:a.message)||"Failed to delete credential"},500)}});const Oe=new ve;Oe.get("/debug/time",e=>{const t=new Date,a=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return e.json({utc_iso:t.toISOString(),utc_ms:t.getTime(),formatted_ist:a.format(t),toLocaleString_ist:t.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});Oe.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const a=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:a,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});Oe.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const a=Date.now()-t;return e.json({status:"ok",latency_ms:a})}catch(t){return e.json({status:"error",error:t.message},500)}});Oe.get("/status",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const s=a.user_id,[r,n,o,i]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(s).first()]);return e.json({active_schedules:(r==null?void 0:r.cnt)||0,memory_entries:(n==null?void 0:n.cnt)||0,total_messages:(o==null?void 0:o.cnt)||0,unread_errors:(i==null?void 0:i.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});async function xn(e,t,a,s){try{const r=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t).first();if(!r)return;const n=await K(r.encrypted_value,r.pin_hash),o=4e3,i=s.length>o?s.substring(0,o-3)+"...":s;(await fetch(`https://api.telegram.org/bot${n}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:i,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${n}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:i})})}catch{}}function Na(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}Oe.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);const s=new Date,r=s.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:r})).run()}catch{}const n=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(r).all(),o=[];for(const i of n.results||[])try{await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(r,i.id).run();const l=i.user_timezone||"UTC";let d,c=!1,p=i.state||"active";if(i.schedule_type==="interval"){const f=parseInt(i.schedule_value,10);d=new Date(s.getTime()+f*60*1e3)}else if(i.schedule_type==="daily"){const[f,b]=i.schedule_value.split(":").map(Number),v=Na(l),k=new Date(v);k.setHours(f,b,0,0),k<=v&&k.setDate(k.getDate()+1);const E=new Date(k.toLocaleString("en-US",{timeZone:"UTC"})),C=new Date(k.toLocaleString("en-US",{timeZone:l})),M=E.getTime()-C.getTime();d=new Date(k.getTime()+M)}else if(i.schedule_type==="weekly"){const[f,b]=i.schedule_value.split(" "),[v,k]=(b||"00:00").split(":").map(Number),C=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(q=>q.toLowerCase()===f.toLowerCase()),M=Na(l),B=new Date(M);B.setHours(v,k,0,0);let Y=(C-B.getDay()+7)%7;Y===0&&B<=M&&(Y=7),B.setDate(B.getDate()+Y);const F=new Date(B.toLocaleString("en-US",{timeZone:"UTC"})),j=new Date(B.toLocaleString("en-US",{timeZone:l})),W=F.getTime()-j.getTime();d=new Date(B.getTime()+W)}else i.schedule_type==="once"?(c=!0,p="completed",d=new Date(s.getTime()+365*24*60*60*1e3)):d=new Date(s.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r,d.toISOString(),c?0:i.enabled,p,i.id).run();const _=(JSON.parse(i.action_config||"{}").description||i.description)&&(i.action_type==="check_mail"||i.action_type==="check_calendar"||i.action_type==="check_sheet"||i.action_type==="custom");o.push({job_id:i.id,name:i.name,status:"dispatched",needs_agent:_,next_run:d.toISOString()})}catch(l){o.push({job_id:i.id,name:i.name,status:"error",error:l.message})}try{const{MemoryService:i}=await Promise.resolve().then(()=>qr),l=await e.env.DB.prepare("SELECT id FROM users").all();for(const d of l.results||[])await new i(e.env.DB).cleanupDoneTasks(d.id)}catch{}return e.json({executed:o.length,results:o,timestamp:r})});Oe.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);const s=parseInt(e.req.param("jobId"),10);if(!s)return e.json({error:"Invalid job ID"},400);const r=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(s).first();if(!r)return e.json({error:"Job not found"},404);const o=JSON.parse(r.action_config||"{}").description||r.description||"",i="⏰ "+(r.name||"Scheduled Task"),l=new Date().toISOString();let d="";const c=r.action_type==="reminder",p=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!c&&r.action_type==="custom"&&p.test(o),c)d=o||r.name||"Time for your scheduled task.";else try{const b={id:r.user_id,username:r.username||"user",name:r.user_name||"User",pin_hash:r.pin_hash||"",role:r.user_role||"",personality_prompt:r.personality_prompt||"",telegram_chat_id:r.telegram_chat_id||"",timezone:r.user_timezone||"UTC",assistant_name:r.assistant_name||"Karna",created_at:"",updated_at:""},v={userId:r.user_id,username:b.username,channel:"cron",text:Sn(r.name,o,r.action_type),sessionId:"cron-"+r.id,timestamp:l},{provider:k,rotation:E}=await lt(e.env.DB,r.user_id,r.pin_hash);d=await da(v,e.env.DB,k,b,E,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(b){const v=b.message||"unknown error",k=v.includes("rate_limit")||v.includes("429")||v.includes("quota"),E=v.includes("timeout")||v.includes("Timeout");k?d="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":E?d="Task timed out. Will retry at next scheduled time.":d="Task encountered an error. Will retry at next scheduled time.",await P(e.env.DB,r.user_id,"cron_agent","execution_error",v,{job_id:r.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(r.action_type))try{const b=await e.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(r.user_id).first();(!b||b.cnt===0)&&await P(e.env.DB,r.user_id,"cron_verification","no_tools_called",`Cron job "${r.name}" (${r.action_type}) completed without any tool calls`,{job_id:r.id,action_type:r.action_type,response_preview:d.substring(0,200)})}catch{}let _=d||o||"Time for your scheduled task.";_=_.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const f=i+`
`+_;return await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(r.user_id,"reminder",i,_,"cron:"+r.id).run(),c&&await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(r.user_id,"system","assistant",f,JSON.stringify({type:"cron",job_id:r.id})).run(),r.telegram_chat_id&&await xn(e.env.DB,r.user_id,r.telegram_chat_id,f),e.json({job_id:s,status:"completed",response_length:d.length})});async function Ws(e){var s;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return null;const a=await e.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(t).first();return(a==null?void 0:a.user_id)||null}Oe.get("/health/tools",async e=>{var a;const t=await Ws(e);if(!t)return e.json({error:"Not authenticated"},401);try{const s=await e.env.DB.prepare(`SELECT tool_name,
              COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) as failures,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name != '__enforcement_trigger'
       GROUP BY tool_name
       ORDER BY total DESC`).bind(t).all(),r=await e.env.DB.prepare(`SELECT agent_type, provider_name, COUNT(*) as triggers,
              SUM(CASE WHEN was_enforcement_retry = 1 THEN 1 ELSE 0 END) as retries_that_worked
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name = '__enforcement_trigger'
       GROUP BY agent_type, provider_name`).bind(t).all(),n=await e.env.DB.prepare(`SELECT COUNT(*) as total_retries,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successful_retries
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND was_enforcement_retry = 1
       AND tool_name != '__enforcement_trigger'`).bind(t).all(),o=await e.env.DB.prepare(`SELECT status, COUNT(*) as count
       FROM cron_execution_log
       WHERE user_id = ? AND started_at > datetime('now', '-24 hours')
       GROUP BY status`).bind(t).all(),i=await e.env.DB.prepare(`SELECT message, details, created_at
       FROM error_log
       WHERE user_id = ? AND source = 'cron_verification'
       AND created_at > datetime('now', '-24 hours')
       ORDER BY created_at DESC LIMIT 10`).bind(t).all(),l=await e.env.DB.prepare(`SELECT provider_name, agent_type,
              COUNT(*) as calls,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM llm_calls
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       GROUP BY provider_name, agent_type
       ORDER BY calls DESC`).bind(t).all();return e.json({period:"last_24h",tool_stats:s.results,enforcement:{triggers:r.results,retry_results:((a=n.results)==null?void 0:a[0])||{total_retries:0,successful_retries:0}},cron:{executions:o.results,warnings:i.results},providers:l.results})}catch(s){return e.json({error:s.message||"Failed to fetch metrics"},500)}});Oe.get("/health/tools/recent",async e=>{const t=await Ws(e);if(!t)return e.json({error:"Not authenticated"},401);try{const a=await e.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
              success, error_message, latency_ms, was_enforcement_retry, channel, created_at
       FROM tool_execution_log
       WHERE user_id = ?
       ORDER BY id DESC LIMIT 50`).bind(t).all();return e.json({logs:a.results})}catch(a){return e.json({error:a.message},500)}});const pt=`

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
- Example: "Couldn't retrieve Amazon order status — requires login."`;function Sn(e,t,a){return a==="reminder"?`[Scheduled Reminder] "${e}": ${t||"Time for your reminder."}`:a==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check Gmail for new/important emails."}
You MUST call gmail_list or gmail_search immediately.${pt}`:a==="check_calendar"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check calendar for upcoming events."}
You MUST call list_calendar_events immediately.${pt}`:a==="check_sheet"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
You MUST call read_sheet immediately with the relevant spreadsheet.${pt}`:a==="custom"&&t?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${pt}`:`[Scheduled task "${e}"]: ${t||"Execute this scheduled task."}${pt}`}function Dn(e,t,a,s){return{userId:e,username:t,channel:"telegram",text:a,sessionId:`telegram-${s}`,timestamp:new Date().toISOString()}}function On(e,t){return e.replace(/\*\*(.*?)\*\*/gs,"*$1*").replace(/^#{1,3}\s+(.+)$/gm,"*$1*").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const kt=new ve,Cn=4e3;async function ae(e,t,a,s="Markdown",r,n){var d,c;const o=In(a,Cn),i=[];let l=!0;for(let p=0;p<o.length;p++){const h=o[p];let _=!1,f="";for(let b=0;b<3;b++)try{const v=await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:h,parse_mode:s,disable_web_page_preview:!1})});if(v.ok){_=!0;break}const k=await v.json().catch(()=>null);if(f=`HTTP ${v.status}: ${(k==null?void 0:k.description)||"Unknown error"}`,(d=k==null?void 0:k.description)!=null&&d.includes("parse")||(c=k==null?void 0:k.description)!=null&&c.includes("entities")){if((await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:h})})).ok){_=!0;break}f+=" (plain-text retry also failed)"}if(v.status===429||v.status>=500){const E=Math.pow(2,b)*1e3;await new Promise(C=>setTimeout(C,E));continue}break}catch(v){if(f=`Network error: ${v.message}`,b<2){const k=Math.pow(2,b)*1e3;await new Promise(E=>setTimeout(E,k));continue}}_||(l=!1,i.push(`Chunk ${p+1}/${o.length}: ${f}`))}if(!l&&r&&n&&i.length>0)try{const{logError:p}=await Promise.resolve().then(()=>Qe);await p(r,n,"telegram","send_failed",i.join(" | "))}catch{}return{success:l,errors:i}}async function Rn(e,t){try{await fetch(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function In(e,t){if(e.length<=t)return[e];const a=[];let s=e;for(;s.length>0;){if(s.length<=t){a.push(s);break}let r=s.lastIndexOf(`
`,t);r<t*.3&&(r=s.lastIndexOf(" ",t)),r<t*.3&&(r=t),a.push(s.substring(0,r)),s=s.substring(r).trimStart()}return a}async function Nn(e,t,a,s,r){switch(e.split("@")[0].toLowerCase()){case"/start":{const o=(s==null?void 0:s.name)||"there",i=(s==null?void 0:s.assistant_name)||"Karna",l=`👋 *Hello, ${o}!*

I'm ${i}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/tasks — Show open tasks
/new — Start a fresh conversation

Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.`+(s?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`),d=await ae(a,t,l,"Markdown",r,s==null?void 0:s.id);return!d.success&&d.errors.length>0&&console.warn(`[/start] Failed to send message: ${d.errors.join(" | ")}`),!0}case"/help":{const i=`🛠 *${(s==null?void 0:s.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`,l=await ae(a,t,i,"Markdown",r,s==null?void 0:s.id);return!l.success&&l.errors.length>0&&console.warn(`[/help] Failed to send message: ${l.errors.join(" | ")}`),!0}case"/status":{if(!s){const o=await ae(a,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app.","Markdown",r);return o.success||console.warn(`[/status] Failed to send message: ${o.errors.join(" | ")}`),!0}try{const[o,i,l,d]=await Promise.all([r.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s.id).first(),r.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s.id).first(),r.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(s.id).first(),r.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(s.id).first()]),c=`📊 *System Status*

Active tasks: ${(o==null?void 0:o.cnt)||0}
Memories: ${(i==null?void 0:i.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(d==null?void 0:d.cnt)||0}

Status: ✅ Online`,p=await ae(a,t,c,"Markdown",r,s.id);p.success||console.warn(`[/status] Failed to send message: ${p.errors.join(" | ")}`)}catch{const i=await ae(a,t,"✅ Online — but had trouble fetching stats.","Markdown",r,s==null?void 0:s.id);i.success||console.warn(`[/status error] Failed to send message: ${i.errors.join(" | ")}`)}return!0}case"/new":{if(!s){const i=await ae(a,t,"⚠️ Account not linked.","Markdown",r);return i.success||console.warn(`[/new] Failed to send message: ${i.errors.join(" | ")}`),!0}await r.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(s.id).run();const o=await ae(a,t,"🆕 Starting fresh conversation. Your next message begins a new thread.","Markdown",r,s.id);return o.success||console.warn(`[/new] Failed to send message: ${o.errors.join(" | ")}`),!0}case"/tasks":case"/task":{if(!s){const o=await ae(a,t,"⚠️ Account not linked.","Markdown",r);return o.success||console.warn(`[/tasks] Failed to send message: ${o.errors.join(" | ")}`),!0}try{const i=(await r.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(s.id).all()).results||[];if(i.length===0){const f=await ae(a,t,"✅ No open tasks. You're all clear.","Markdown",r,s.id);return f.success||console.warn(`[/tasks] Failed to send message: ${f.errors.join(" | ")}`),!0}const l=new Date,d=l.toISOString().slice(0,10),c=new Date(l);c.setDate(c.getDate()+1);const p=c.toISOString().slice(0,10),h=[`📋 *Open Tasks (${i.length})*
`];for(const f of i){let b="";if(f.due_date){const v=f.due_date.slice(0,10);v<d?b=" ⚠️ _overdue_":v===d?b=" 🔴 _due today_":v===p?b=" 🟡 _due tomorrow_":b=` _${new Date(f.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}h.push(`☐ ${f.title}${b}`)}h.push(`
_Say "mark [task] as done" to close a task._`);const _=await ae(a,t,h.join(`
`),"Markdown",r,s.id);_.success||console.warn(`[/tasks] Failed to send message: ${_.errors.join(" | ")}`)}catch(o){const i=await ae(a,t,"❌ Could not fetch tasks: "+o.message,"Markdown",r,s==null?void 0:s.id);i.success||console.warn(`[/tasks error] Failed to send message: ${i.errors.join(" | ")}`)}return!0}default:return!1}}kt.post("/webhook",async e=>{let t;try{t=await e.req.json()}catch{return e.json({ok:!0})}const a=e.env.DB,s={GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID},r=async()=>{var n,o,i,l,d;try{if(t.callback_query){await An(a,t.callback_query);return}const c=t.message;if(!c)return;const p=!!c.text,h=!!c.voice,_=!!c.document,f=!!c.photo,b=!!c.caption;if(!p&&!h&&!_&&!f)return;const v=String(c.chat.id);let k=c.text||"";const E=await a.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(v).first();let C=null;if(E){const O=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(E.id,"telegram_bot_token").first();O&&(C=await K(O.encrypted_value,E.pin_hash))}if(!C){const O=await a.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();O&&(C=await K(O.encrypted_value,O.pin_hash))}if(!C||k.startsWith("/")&&await Nn(k,v,C,E,a))return;if(!E){const O=await ae(C,v,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${v}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`,"Markdown",a);O.success||console.warn(`Failed to send unlinked account message: ${O.errors.join(" | ")}`);return}if(c.voice&&C&&E)try{const O=await ae(C,v,"🎤 Processing voice note...","Markdown",a,E.id);O.success||console.warn(`[voice start] Failed to send message: ${O.errors.join(" | ")}`);const u=await(await fetch(`https://api.telegram.org/bot${C}/getFile?file_id=${c.voice.file_id}`)).json();if(u.ok&&((n=u.result)!=null&&n.file_path)){const m=await(await fetch(`https://api.telegram.org/file/bot${C}/${u.result.file_path}`)).blob();let g="",w="",x="whisper-1";const T=await e.env.DB.prepare("SELECT service, encrypted_value FROM credentials WHERE user_id = ? AND (service IN ('llm_slot_1', 'llm_slot_2', 'llm_slot_3', 'openai'))").bind(E.id).all();for(const A of T.results){const H=await K(A.encrypted_value,E.pin_hash);if(A.service==="openai"){g="https://api.openai.com/v1/audio/transcriptions",w=H;break}else if(A.service.startsWith("llm_slot_"))try{const J=JSON.parse(H);if(J.provider==="openai"){g="https://api.openai.com/v1/audio/transcriptions",w=J.apiKey;break}else if(J.provider==="groq"){g="https://api.groq.com/openai/v1/audio/transcriptions",w=J.apiKey,x="whisper-large-v3";break}}catch{}}if(!g){const A=await ae(C,v,"⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys).","Markdown",a,E.id);A.success||console.warn(`[voice no stt] Failed to send message: ${A.errors.join(" | ")}`);return}const D=new FormData;D.append("file",m,"voice.ogg"),D.append("model",x),D.append("language","en");const I=await fetch(g,{method:"POST",headers:{Authorization:`Bearer ${w}`},body:D});if(!I.ok){const A=await I.text(),H=await ae(C,v,`⚠️ Transcription failed: ${I.status} ${A}`,"Markdown",a,E.id);H.success||console.warn(`[voice transcription error] Failed to send message: ${H.errors.join(" | ")}`);return}k=(await I.json()).text;const R=await ae(C,v,`🗣️ *You said:* ${k}`,"Markdown",a,E.id);R.success||console.warn(`[voice transcript echo] Failed to send message: ${R.errors.join(" | ")}`)}}catch(O){const U=await ae(C,v,`⚠️ Failed to process voice note: ${O.message}`,"Markdown",a,E==null?void 0:E.id);U.success||console.warn(`[voice processing error] Failed to send message: ${U.errors.join(" | ")}`);return}if((_||f)&&C&&E)try{let O,U="unknown",u="unknown",y=0;if(_)O=c.document.file_id,U=c.document.file_name||"document",u=c.document.mime_type||"unknown",y=c.document.file_size||0;else if(f){const m=c.photo[c.photo.length-1];O=m.file_id,U="photo.jpg",u="image/jpeg",y=m.file_size||0}if(O){const g=await(await fetch(`https://api.telegram.org/bot${C}/getFile?file_id=${O}`)).json();let w="";if(g.ok&&((o=g.result)!=null&&o.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(U)||/^text\/|application\/json|application\/xml|application\/csv/i.test(u))&&y<5e4)try{w=await(await fetch(`https://api.telegram.org/file/bot${C}/${g.result.file_path}`)).text()}catch{}const x=c.caption||"",T=`[Telegram file received: "${U}" (${u}, ${Math.round(y/1024)}KB)]`;w?k=`${x?x+`

`:""}${T}
File contents:
${w.substring(0,8e3)}${w.length>8e3?`
[...truncated]`:""}`:k=`${x?x+`

`:""}${T}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(O){if(b&&c.caption)k=c.caption;else{const U=await ae(C,v,`⚠️ Received your file but couldn't process it: ${O.message}`,"Markdown",a,E==null?void 0:E.id);U.success||console.warn(`[file processing error] Failed to send message: ${U.errors.join(" | ")}`);return}}if(!k)return;Rn(C,v).catch(()=>{});let M=await a.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(E.id).first();M?await a.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(M.id).run():M={id:(await a.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(E.id).run()).meta.last_row_id};const B=Dn(E.id,E.username,k,v);B.metadata={thread_id:M.id};let Y,F;try{const O=await lt(a,E.id,E.pin_hash);Y=O.provider,F=O.rotation}catch(O){console.error("Telegram provider setup error:",O);const U=(i=O.message)!=null&&i.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(l=O.message)!=null&&l.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${O.message||"Unknown error"}`,u=await ae(C,v,U,"Markdown",a,E.id);u.success||console.warn(`[provider error] Failed to send message: ${u.errors.join(" | ")}`);return}const{classifyIntentFast:j}=await Promise.resolve().then(()=>pn);if(j(k).agent==="multi"){const O=await ae(C,v,"🔍 On it…","Markdown",a,E.id);O.success||console.warn(`[ack] Failed to send: ${O.errors.join(" | ")}`)}const W=9e4;let q=!1;try{const O=await Promise.race([da(B,a,Y,E,F,s),new Promise((y,m)=>setTimeout(()=>m(new Error("TELEGRAM_TIMEOUT")),W))]),U=On(O,"telegram"),u=await ae(C,v,U||"(empty response)","Markdown",a,E.id);if(await a.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(M.id).run().catch(()=>{}),q=u.success,!u.success){console.error(`[CRITICAL] Agent response failed to send to Telegram for user ${E.id}:`,u.errors);try{const{logError:y}=await Promise.resolve().then(()=>Qe);await y(a,E.id,"telegram","response_send_failed",`Failed to deliver response: ${u.errors.join(" | ")}`)}catch{}}}catch(O){console.error("Telegram agent error:",O);const U=O.message==="TELEGRAM_TIMEOUT",u=U?`⏱️ This took longer than Telegram allows (25s limit).

For long essays, please use the web app — it handles long generation without time limits.`:(d=O.message)!=null&&d.includes("API error")?`⚠️ AI provider returned an error. The provider (${Y.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(O.message||"Unknown").substring(0,200)}`,y=await ae(C,v,u,"Markdown",a,E.id);q=y.success,y.success||console.error(`[CRITICAL] Error message failed to send to Telegram for user ${E.id}:`,y.errors);try{const{logError:m}=await Promise.resolve().then(()=>Qe);await m(a,E.id,"telegram",U?"timeout":"agent_error",O.message||"Agent error",{provider:Y.name})}catch{}}}catch(c){console.error("Telegram webhook error:",c);try{const{logError:p}=await Promise.resolve().then(()=>Qe);await p(a,null,"telegram","webhook_error",c.message||"Unknown telegram error")}catch{}}};return e.executionCtx.waitUntil(r()),e.json({ok:!0})});kt.post("/setup-webhook",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const{webhook_url:s}=await e.req.json(),r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return e.json({error:"Telegram bot token not configured in Settings"},400);const n=await K(r.encrypted_value,a.pin_hash);if(!s){const c=await(await fetch(`https://api.telegram.org/bot${n}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(c)}const i=await(await fetch(`https://api.telegram.org/bot${n}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:s,allowed_updates:["message"],drop_pending_updates:!1})})).json();return e.json(i)});kt.get("/webhook-status",async e=>{var n,o,i,l,d,c;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!s)return e.json({configured:!1,error:"Bot token not set"});const r=await K(s.encrypted_value,a.pin_hash);try{const h=await(await fetch(`https://api.telegram.org/bot${r}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((o=h.result)==null?void 0:o.url)||"",has_webhook:!!((i=h.result)!=null&&i.url),pending_updates:((l=h.result)==null?void 0:l.pending_update_count)||0,last_error:((d=h.result)==null?void 0:d.last_error_message)||"",last_error_date:((c=h.result)==null?void 0:c.last_error_date)||null})}catch(p){return e.json({configured:!0,error:p.message})}});kt.post("/detect-chat-id",async e=>{var n,o;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!s)return e.json({error:"Bot token not configured"},400);const r=await K(s.encrypted_value,a.pin_hash);try{const d=((o=(await(await fetch(`https://api.telegram.org/bot${r}/getWebhookInfo`)).json()).result)==null?void 0:o.url)||"";await fetch(`https://api.telegram.org/bot${r}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(v=>setTimeout(v,500));const p=await(await fetch(`https://api.telegram.org/bot${r}/getUpdates?limit=10&timeout=0`)).json();d&&await fetch(`https://api.telegram.org/bot${r}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:d,allowed_updates:["message"]})});const h=p.result||[];if(h.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const _=[],f=new Set;for(let v=h.length-1;v>=0;v--){const k=h[v].message;if(k&&k.chat){const E=String(k.chat.id);f.has(E)||(f.add(E),_.push({chat_id:E,name:[k.chat.first_name,k.chat.last_name].filter(Boolean).join(" ")||k.chat.title||"Unknown",username:k.chat.username||"",date:new Date((k.date||0)*1e3).toISOString()}))}}if(_.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const b=_[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(b,a.user_id).run(),e.json({found:!0,chat_id:b,name:_[0].name,all_chats:_,message:`Chat ID ${b} detected and saved to your profile.`})}catch(i){return e.json({error:`Detection failed: ${i.message}`},500)}});async function An(e,t){var b;const{id:a,data:s,message:r,from:n}=t;if(!s||!r)return;const o=s.split(":");if(o[0]!=="briefing_toggle"||o.length<3)return;const i=o[1],l=parseInt(o[2]);if(!l||!i)return;const d=String(r.chat.id),c=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(d).first();if(!c)return;const p=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(c.id,l,i).first();if(!p)return;const h=p.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(h,h,p.id).run();const _=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(c.id).first();if(!_)return;const f=await K(_.encrypted_value,_.pin_hash);try{const v=await fetch(`https://api.telegram.org/bot${f}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:a,text:h?"✅ Checked!":"☐ Unchecked"})});v.ok||console.warn(`[callback answer] Failed to answer callback: HTTP ${v.status}`)}catch(v){console.warn(`[callback answer] Error answering callback: ${v.message}`)}if((b=r.reply_markup)!=null&&b.inline_keyboard){const v=r.reply_markup.inline_keyboard.map(k=>k.map(E=>{var C;if((C=E.callback_data)!=null&&C.includes(i)){const M=h?"✅":"☐",B=E.text.replace(/^[☐✅]\s*/,"");return{...E,text:`${M} ${B}`}}return E}));try{await fetch(`https://api.telegram.org/bot${f}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d,message_id:r.message_id,reply_markup:{inline_keyboard:v}})})}catch{}}}function Mn(e){const t=new Date,a=new Date(t.toLocaleString("en-US",{timeZone:e})),s=new Date(a);s.setDate(s.getDate()+1),s.setHours(0,0,0,0);const r=new Date(s);r.setHours(23,59,59,999);const n=s.toISOString().split("T")[0];return{start:s.toISOString(),end:r.toISOString(),dateStr:n}}async function Ln(e,t,a,s,r,n){try{return(await new na(e,t,a,s,r).listEvents("primary",{timeMin:n.start,timeMax:n.end,maxResults:50})).map(l=>{var d;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(d=l.attendees)==null?void 0:d.map(c=>c.displayName||c.email),source:"google"}})}catch(o){return console.error("Google Calendar fetch error:",o.message),[]}}async function $n(e,t,a,s,r){try{const n=new we(e,t,a,s,r),o=await n.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),i=await n.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const p of o){const h=p.from.split("<")[0].trim()||p.from;l[h]=(l[h]||0)+1}const d=Object.entries(l).sort(([,p],[,h])=>h-p).slice(0,5).map(([p])=>p),c=o.some(p=>p.subject.toLowerCase().includes("urgent")||p.subject.toLowerCase().includes("asap")||p.subject.toLowerCase().includes("immediately"));return{unreadCount:o.length,importantCount:i.length,topSenders:d,hasUrgent:c}}catch(n){return console.error("Gmail fetch error:",n.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function Pn(e,t){try{const a=await e.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(t).all(),s=new Date,r=new Date(s);r.setDate(r.getDate()+1),r.setHours(23,59,59,999);const n=a.results||[],o=n.map(l=>{if(l.due_date){const d=new Date(l.due_date),c=d<=s?"overdue":d<=r?"due today":d.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${l.title} [${c}]`}return l.title}),i=n.filter(l=>l.due_date?new Date(l.due_date)<=r:!1).length;return{pending:n.length,dueToday:i,items:o}}catch(a){return console.error("Tasks fetch error:",a.message),{pending:0,dueToday:0,items:[]}}}async function Bn(e,t){try{const a=Math.floor((Date.now()-1728e5)/1e3),s=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${a},points>10`,r=await fetch(s,{headers:{"User-Agent":"Karna/1.0"}});return r.ok?((await r.json()).hits||[]).filter(o=>o.url&&!t.has(o.url)).slice(0,2).map(o=>({title:o.title,summary:`${o.points} pts · ${o.num_comments} comments on HN`,url:o.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const Aa=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function jn(e,t,a){const s=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],r=new Set;if(t&&a)try{((await t.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(a).all()).results||[]).forEach(d=>r.add(d.url))}catch{}const n=[];if(s.some(l=>Aa.some(d=>l.toLowerCase().includes(d.toLowerCase())))){const l=s.find(c=>Aa.some(p=>c.toLowerCase().includes(p.toLowerCase())))||"AI agents",d=await Bn(l,r);for(const c of d)n.push(c),r.add(c.url)}for(const l of s){if(n.length>=8)break;const d=`latest ${l} news today`;try{const c=await Bt(d,{num:5});if(c.results)for(const p of c.results){if(n.length>=8)break;r.has(p.link)||(n.push({title:p.title,summary:p.snippet,url:p.link,source:p.displayLink}),r.add(p.link))}}catch(c){console.error(`News search error for "${d}":`,c.message)}}const i=n.slice(0,7);if(t&&a&&i.length>0)for(const l of i)try{await t.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(a,l.url,l.title).run()}catch{}return i}function Un(e,t){const a=[];let s="20:00";{const[o,i]=t.split(":"),l=parseInt(o,10),d=i||"00",c=l>=12?"PM":"AM";s=`${l===0?12:l>12?l-12:l}:${d} ${c}`}a.push(`🗓 Your ${s} Brief — ${e.targetDate}`),a.push("");const r=e.calendar.totalCount;if(r>0){a.push(`📅 Tomorrow: ${r} event${r===1?"":"s"}`);for(const o of e.calendar.google.slice(0,5)){const i=o.startTime?new Date(o.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";a.push(`   • ${i} ${o.title}`)}}else a.push("📅 Tomorrow: Nothing scheduled");a.push("");const n=e.emails.gmail.unreadCount;if(n>0?(a.push(`📧 Gmail: ${n} unread`),e.emails.gmail.importantCount>0&&a.push(`   ★ ${e.emails.gmail.importantCount} marked important`),e.emails.gmail.hasUrgent&&a.push("   ⚠️ Urgent messages present"),e.emails.gmail.topSenders.length>0&&a.push(`   From: ${e.emails.gmail.topSenders.slice(0,3).join(", ")}`)):a.push("📧 Gmail: Inbox clear"),a.push(""),e.tasks.pending>0){a.push(`✅ Open Tasks (${e.tasks.pending}):`);for(const o of e.tasks.items)a.push(`   ☐ ${o}`)}else a.push("✅ Tasks: All clear");if(a.push(""),e.news.items.length>0){a.push("📡 Today's Signal:");for(const o of e.news.items){const i=o.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${o.source}`;a.push(`   • ${o.title.substring(0,90)}${o.title.length>90?"…":""}`),a.push(`     ${i} — ${o.summary.substring(0,80)}${o.summary.length>80?"…":""}`)}}return a.join(`
`)}function Hn(e){const t=[];let a=0;for(const s of e.calendar.google)t.push({type:"calendar",key:s.id,text:`${s.title} - ${new Date(s.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:s},sortOrder:a++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:a++});for(const s of e.tasks.items)t.push({type:"task",key:`task-${s}`,text:s,metadata:{},sortOrder:a++});for(const s of e.news.items)t.push({type:"news",key:`news-${s.url}`,text:`📰 ${s.title}`,metadata:{url:s.url,source:s.source},sortOrder:a++});return t}async function Gn(e,t){const a=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!a)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let s;try{const n=JSON.parse(a.components);s={google_calendar:n.google_calendar!==!1,gmail:n.gmail!==!1,tasks:n.tasks!==!1,news:n.news!==!1}}catch{s={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const r=a.news_topics?a.news_topics.split(",").map(n=>n.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:s,newsTopics:r}}async function qs(e,t,a){var E,C;const s=t.timezone||"Asia/Kolkata",r=Mn(s),{components:n,newsTopics:o}=await Gn(e,t.id),i=[],l=[];n.google_calendar&&(i.push(Ln(e,t.id,t.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET,r)),l.push("googleEvents")),n.gmail&&(i.push($n(e,t.id,t.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),n.tasks&&(i.push(Pn(e,t.id)),l.push("tasks")),n.news&&(i.push(jn(o,e,t.id)),l.push("news"));const d=await Promise.all(i),c={};l.forEach((M,B)=>{c[M]=d[B]});const p={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},h={pending:0,dueToday:0,items:[]},_={generatedAt:new Date().toISOString(),targetDate:r.dateStr,calendar:{google:c.googleEvents||[],totalCount:((E=c.googleEvents)==null?void 0:E.length)||0},emails:{gmail:c.gmailSummary||p},tasks:c.tasks||h,news:{items:c.news||[],fetchedAt:new Date().toISOString()},summary:""},f=((C=await e.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(t.id).first())==null?void 0:C.briefing_time)||"20:00";_.summary=Un(_,f);const b=Hn(_),v=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(t.id,JSON.stringify(_)).first(),k=(v==null?void 0:v.id)||0;for(const M of b)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(k,M.type,M.key,M.text,JSON.stringify(M.metadata),M.sortOrder).run();return{briefingId:k,content:_,items:b}}async function Fn(e,t,a){const s=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,t).first();if(!s)return null;const r=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(a).all();return{briefing:{...s,content:JSON.parse(s.content_json||"{}")},items:r.results||[]}}async function Wn(e,t,a,s){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,t).first())return null;const n=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(s,a).first();if(!n)return null;const o=n.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(o,o,s,a).run(),{checked:o===1}}async function qn(e,t,a=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.sent_at DESC
    LIMIT ?
  `).bind(t,a).all()).results||[]).map(r=>({...r,content:JSON.parse(r.content_json||"{}")}))}function jt(e,t,a=new Date){const s=new Date(a.toLocaleString("en-US",{timeZone:t})),r=s.getHours(),n=s.getMinutes(),[o,i]=e.split(":").map(Number),l=r*60+n,d=o*60+i;return l===d}function zs(e,t){const a=e.summary,s=[];for(const r of t.slice(0,10))s.push([{text:`☐ ${r.text.substring(0,40)}${r.text.length>40?"...":""}`,callback_data:`briefing_toggle:${r.key}`}]);return{text:a,inlineKeyboard:s}}async function Ut(e,t,a){const s=[];if(a.GOOGLE_CLIENT_ID&&a.GOOGLE_CLIENT_SECRET)try{const o=await new we(e,t.id,t.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET).listMessages({query:"newer_than:7d (is:unread OR is:important)",maxResults:8});for(const i of o)s.push(`${i.from||"Unknown"} — ${i.subject||"(no subject)"}${i.snippet?": "+i.snippet:""}`);o.length===0&&s.push("No unread or important Gmail messages found.")}catch(n){s.push(`Gmail unavailable: ${n.message||"connect Google in Settings."}`)}else s.push("Gmail unavailable: Google OAuth is not configured.");const r=await Ks(e,t);return{gmail:s,...r}}async function Ks(e,t){var r;const a=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'browser_use_api_key'").bind(t.id).first().catch(()=>null);if(!a)return{outlook:["No Browser Use API key configured. Add it in Settings -> API Keys."],outlookStatus:"no_api_key"};const s=await zn(e,t);if(!s)return{outlook:["No Outlook credentials saved in Secret Vault. Add them in Settings -> Secret Vault."],outlookStatus:"not_configured"};try{const n=(await K(a.encrypted_value,t.pin_hash)).trim(),o=JSON.parse(await K(s.encrypted_blob,t.pin_hash)),i=Ys(),l=await Is(i,n,{secrets:{username:o.username,password:o.password},sessionId:o.sessionId,timeoutMs:88e3});return l.sessionId&&await Kn(e,t,s.id,l.sessionId),l.status==="timeout"?{outlook:[`Outlook browser task is still running. Task ID: ${l.taskId}`],outlookStatus:"timeout",outlookTaskId:l.taskId}:l.status!=="completed"?{outlook:[`Outlook browser task failed: ${l.error||"no details returned."}`],outlookStatus:"error",outlookTaskId:l.taskId}:(r=l.output)!=null&&r.trim()?{outlook:l.output.split(`
`).map(d=>d.trim()).filter(Boolean).slice(0,12),outlookStatus:"ok",outlookTaskId:l.taskId}:{outlook:["Outlook returned no content."],outlookStatus:"no_content",outlookTaskId:l.taskId}}catch(n){return{outlook:[`Outlook digest error: ${n.message||"unknown error"}`],outlookStatus:"error"}}}function Ys(){return"Open Outlook on the web at https://outlook.office.com/mail/. This is one complete workflow. If login is requested, use username {username} and password {password}. Inspect the recent and unread Inbox messages only. Return structured plain text lines with sender, subject, date if visible, short snippet, action_needed yes/no, and priority low/normal/high. Do not guess. If no messages or no readable content is visible, return exactly: Outlook returned no content."}async function zn(e,t){const a=["Outlook","Microsoft","Office 365","Office365"];for(const s of a){const r=await e.prepare("SELECT id, name, encrypted_blob FROM site_credentials WHERE user_id = ? AND name LIKE ? COLLATE NOCASE ORDER BY updated_at DESC LIMIT 1").bind(t.id,`%${s}%`).first().catch(()=>null);if(r)return r}return null}async function Kn(e,t,a,s){try{const{encrypt:r}=await Promise.resolve().then(()=>Pt),n=await e.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(a,t.id).first();if(!n)return;const o=JSON.parse(await K(n.encrypted_blob,t.pin_hash));o.sessionId=s;const i=await r(JSON.stringify(o),t.pin_hash);await e.prepare("UPDATE site_credentials SET encrypted_blob = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,a,t.id).run()}catch{}}const Yn=Object.freeze(Object.defineProperty({__proto__:null,buildEmailDigest:Ut,buildOutlookDigest:Ks,buildOutlookDigestTask:Ys},Symbol.toStringTag,{value:"Module"})),le=new ve;async function Jn(e,t){var r;if(e.req.path.includes("/cron/"))return t();const a=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,role:s.role,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",a),await t()}le.use("/*",Jn);le.get("/briefings",async e=>{const t=e.get("user"),a=parseInt(e.req.query("limit")||"10");try{const s=await qn(e.env.DB,t.id,a);return e.json({briefings:s})}catch(s){return e.json({error:s.message},500)}});le.get("/briefings/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));try{const s=await Fn(e.env.DB,t.id,a);return s?e.json(s):e.json({error:"Briefing not found"},404)}catch(s){return e.json({error:s.message},500)}});le.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),s=parseInt(e.req.param("itemId"));try{const r=await Wn(e.env.DB,t.id,a,s);return r?e.json(r):e.json({error:"Item not found"},404)}catch(r){return e.json({error:r.message},500)}});le.post("/briefings/generate",async e=>{const t=e.get("user");try{const a=await qs(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(a)}catch(a){return e.json({error:a.message},500)}});le.get("/briefing-preferences",async e=>{const t=e.get("user");try{const a=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!a){const r={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:r})}const s={briefingTime:a.briefing_time,briefingEnabled:a.briefing_enabled!==0,components:JSON.parse(a.components),newsTopics:a.news_topics.split(",").map(r=>r.trim()).filter(Boolean),notificationChannels:JSON.parse(a.notification_channels),proactiveLevel:a.proactive_level};return e.json({preferences:s})}catch(a){return e.json({error:a.message},500)}});le.post("/briefing-preferences",async e=>{const t=e.get("user"),a=await e.req.json(),s=[];if(a.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(a.briefingTime)||s.push("Invalid time format. Use HH:MM (e.g., 20:00)")),a.newsTopics&&(a.newsTopics.length>5&&s.push("Maximum 5 news topics allowed"),a.newsTopics.some(r=>r.length>50)&&s.push("Each news topic must be 50 characters or less")),a.proactiveLevel&&!["conservative","moderate","aggressive"].includes(a.proactiveLevel)&&s.push("Invalid proactive level. Use conservative, moderate, or aggressive"),s.length>0)return e.json({error:s.join("; ")},400);try{const r=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),n=a.components?JSON.stringify(a.components):null,o=a.notificationChannels?JSON.stringify(a.notificationChannels):null,i=a.newsTopics?a.newsTopics.join(", "):null;if(r){const l=[],d=[];a.briefingTime!==void 0&&(l.push("briefing_time = ?"),d.push(a.briefingTime)),a.briefingEnabled!==void 0&&(l.push("briefing_enabled = ?"),d.push(a.briefingEnabled?1:0)),n!==null&&(l.push("components = ?"),d.push(n)),i!==null&&(l.push("news_topics = ?"),d.push(i)),o!==null&&(l.push("notification_channels = ?"),d.push(o)),a.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),d.push(a.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),d.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...d).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,a.briefingTime||"20:00",n||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',i||"AI, LLM, Tools, Agentic Workflows, AI Features",o||'{"telegram":true,"web":true}',a.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(r){return e.json({error:r.message},500)}});le.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(a){return e.json({error:a.message},500)}});le.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],n=new Date;for(const o of s.results||[]){if(!o.briefing_enabled)continue;const i=o.timezone||"Asia/Kolkata",l=o.briefing_time||"20:00";if(jt(l,i,n))try{const d=await qs(e.env.DB,o,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});if(o.telegram_chat_id){const{text:c,inlineKeyboard:p}=zs(d.content,d.items);await Js(e.env.DB,o,c,p,d.briefingId)}r.push({user_id:o.id,status:"success",briefing_id:d.briefingId,briefing_time:l,timezone:i})}catch(d){r.push({user_id:o.id,status:"error",error:d.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});le.post("/cron/morning-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.morning_enabled, 1) as morning_enabled,
             COALESCE(bp.morning_time, '08:00') as morning_time,
             bp.last_morning_briefing_date
      FROM users u LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=new Date,n=[];for(const o of s.results||[]){if(!o.morning_enabled)continue;const i=o.timezone||"Asia/Kolkata",l=ca(r,i);if(o.last_morning_briefing_date===l||!jt(o.morning_time||"08:00",i,r))continue;const d=await Ut(e.env.DB,o,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),c=ua("Morning Briefing",l,d);await ma(e.env.DB,o.id,"system","Morning briefing",c,"high"),await e.env.DB.prepare("UPDATE briefing_preferences SET last_morning_briefing_date = ? WHERE user_id = ?").bind(l,o.id).run().catch(()=>null),n.push({user_id:o.id,status:"success"})}return e.json({executed:n.length,results:n})}catch(s){return e.json({error:s.message},500)}});le.post("/cron/email-digest",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.email_digest_enabled, 1) as email_digest_enabled,
             COALESCE(bp.morning_time, '08:00') as digest_time,
             bp.last_email_digest_date
      FROM users u LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=new Date,n=[];for(const o of s.results||[]){if(!o.email_digest_enabled)continue;const i=o.timezone||"Asia/Kolkata",l=ca(r,i);if(o.last_email_digest_date===l||!jt(o.digest_time||"08:00",i,r))continue;const d=await Ut(e.env.DB,o,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});await ma(e.env.DB,o.id,"mail","Email digest",ua("Email Digest",l,d),"normal"),await e.env.DB.prepare("UPDATE briefing_preferences SET last_email_digest_date = ? WHERE user_id = ?").bind(l,o.id).run().catch(()=>null),n.push({user_id:o.id,status:"success",outlook_status:d.outlookStatus})}return e.json({executed:n.length,results:n})}catch(s){return e.json({error:s.message},500)}});le.post("/cron/weekly-review",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.weekly_review_enabled, 1) as weekly_review_enabled,
             COALESCE(bp.weekly_review_day, 1) as weekly_review_day,
             COALESCE(bp.weekly_review_time, '09:00') as weekly_review_time,
             bp.last_weekly_review_date
      FROM users u LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=new Date,n=[];for(const o of s.results||[]){if(!o.weekly_review_enabled)continue;const i=o.timezone||"Asia/Kolkata",l=ca(r,i),d=new Date(r.toLocaleString("en-US",{timeZone:i}));if(Number(o.weekly_review_day)!==d.getDay()||o.last_weekly_review_date===l||!jt(o.weekly_review_time||"09:00",i,r))continue;const[c,p,h]=await Promise.all([e.env.DB.prepare("SELECT title FROM action_items WHERE user_id = ? AND status = 'completed' AND completed_at > datetime('now', '-7 days') LIMIT 10").bind(o.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT title FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval','failed') LIMIT 10").bind(o.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT name, summary FROM document_library WHERE user_id = ? AND updated_at > datetime('now', '-7 days') LIMIT 8").bind(o.id).all().catch(()=>({results:[]}))]),_=await Ut(e.env.DB,o,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),f=`Weekly Review - ${l}

Completed
${Ma(c.results,"title")}

Open Tasks
${Ma(p.results,"title")}

Documents
${(h.results||[]).map(b=>`- ${b.name}${b.summary?": "+b.summary.slice(0,120):""}`).join(`
`)||"- None"}

${ua("Important Email",l,_)}`;await ma(e.env.DB,o.id,"system","Weekly review",f,"high"),await e.env.DB.prepare("UPDATE briefing_preferences SET last_weekly_review_date = ? WHERE user_id = ?").bind(l,o.id).run().catch(()=>null),n.push({user_id:o.id,status:"success"})}return e.json({executed:n.length,results:n})}catch(s){return e.json({error:s.message},500)}});le.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id IS NOT NULL").all(),r=[],n=new Date,o=new Date(n.getTime()+600*1e3).toISOString(),i=new Date(n.getTime()+900*1e3).toISOString();for(const l of s.results||[])try{const d=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!d)continue;const c=await K(d.encrypted_value,l.pin_hash),h=JSON.parse(c).access_token;if(!h)continue;const _=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(n.toISOString())}&timeMax=${encodeURIComponent(i)}&maxResults=10`,{headers:{Authorization:`Bearer ${h}`}});if(!_.ok)continue;const b=((await _.json()).items||[]).filter(E=>{var M;const C=(M=E.start)==null?void 0:M.dateTime;return C?C>=n.toISOString()&&C<=o:!1});if(b.length===0){r.push({user_id:l.id,reminders_sent:0});continue}const v=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(l.id).first();if(!v)continue;const k=await K(v.encrypted_value,l.pin_hash);for(const E of b){const C=new Date(E.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),M=E.location?`
📍 ${E.location}`:"",B=`⏰ Meeting in 10 minutes!

*${E.summary||"Untitled Event"}*
🕐 ${C}${M}`;await fetch(`https://api.telegram.org/bot${k}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l.telegram_chat_id,text:B,parse_mode:"Markdown"})})}r.push({user_id:l.id,reminders_sent:b.length})}catch(d){r.push({user_id:l.id,status:"error",error:d.message})}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});async function Js(e,t,a,s,r){try{const n=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!n)return;const o=await K(n.encrypted_value,n.pin_hash);if(!(await(await fetch(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:a,parse_mode:"Markdown",reply_markup:{inline_keyboard:s.map(d=>d.map(c=>({...c,callback_data:`${c.callback_data}:${r}`})))}})})).json()).ok){const c=await(await fetch(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:a.replace(/[_*[\]`]/g,""),reply_markup:{inline_keyboard:s.map(p=>p.map(h=>({...h,callback_data:`${h.callback_data}:${r}`})))}})})).json();if(!c.ok){console.error("Telegram briefing send failed:",c.description,"chat_id:",t.telegram_chat_id);return}}await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(r).run()}catch(n){console.error("Telegram briefing error:",n.message)}}function ca(e,t){const a=new Date(e.toLocaleString("en-US",{timeZone:t})),s=a.getFullYear(),r=String(a.getMonth()+1).padStart(2,"0"),n=String(a.getDate()).padStart(2,"0");return`${s}-${r}-${n}`}function ua(e,t,a){return`${e} - ${t}

Gmail
${a.gmail.map(s=>`- ${s}`).join(`
`)||"- No Gmail items."}

Outlook
${a.outlook.map(s=>`- ${s}`).join(`
`)||"- Outlook returned no content."}`}function Ma(e,t){const a=(e||[]).map(s=>`- ${s[t]}`).filter(Boolean);return a.length?a.join(`
`):"- None"}async function ma(e,t,a,s,r,n){await e.prepare(`INSERT INTO notifications (user_id, type, title, body, priority, status, source)
     VALUES (?, ?, ?, ?, ?, 'open', 'proactive')`).bind(t,a,s,r,n).run()}le.post("/briefings/:id/resend",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));try{const s=await e.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(a,t.id).first();if(!s)return e.json({error:"Briefing not found"},404);const r=JSON.parse(s.content||"{}"),n=await e.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(a).all(),{text:o,inlineKeyboard:i}=zs(r,n.results||[]);await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(a).run(),await Js(e.env.DB,t,o,i,a);const l=await e.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(a).first();return l!=null&&l.delivered_telegram?e.json({success:!0,message:"Briefing sent to Telegram"}):e.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(s){return e.json({error:s.message},500)}});le.delete("/briefings/:id",async e=>{const t=e.get("user"),a=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});const ze=new ve;async function Vn(e,t){var r;const a=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,role:s.role,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",a),await t()}ze.use("/*",Vn);function Vs(e){return e.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"")}ze.get("/",async e=>{const t=e.get("user"),a=await e.env.DB.prepare(`SELECT id, name, slug, description, instructions, parameters, required_tools, examples, enabled, usage_count, last_used_at, created_at, updated_at
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`).bind(t.id).all();return e.json({skills:a.results||[]})});ze.post("/",async e=>{var d,c,p;const t=e.get("user"),a=await e.req.json();if(!((d=a.name)!=null&&d.trim()))return e.json({error:"name is required"},400);if(!((c=a.description)!=null&&c.trim()))return e.json({error:"description is required"},400);if(!((p=a.instructions)!=null&&p.trim()))return e.json({error:"instructions is required"},400);let s=Vs(a.name);s||(s=`skill_${Date.now()}`);const r=await e.env.DB.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(t.id,`${s}%`).all();r.results&&r.results.length>0&&r.results.map(_=>_.slug).includes(s)&&(s=`${s}_${r.results.length+1}`);const n=JSON.stringify(a.parameters||{}),o=JSON.stringify(a.required_tools||[]),i=JSON.stringify(a.examples||[]),l=await e.env.DB.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,a.name.trim(),s,a.description.trim(),a.instructions.trim(),n,o,i).first();return e.json({skill:l,created:!0})});ze.get("/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));if(isNaN(a))return e.json({error:"Invalid skill ID"},400);const s=await e.env.DB.prepare("SELECT * FROM user_skills WHERE id = ? AND user_id = ?").bind(a,t.id).first();return s?e.json({skill:s}):e.json({error:"Skill not found"},404)});ze.put("/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));if(isNaN(a))return e.json({error:"Invalid skill ID"},400);const s=await e.req.json(),r=[],n=[];return s.name!==void 0&&(r.push("name = ?","slug = ?"),n.push(s.name.trim(),Vs(s.name))),s.description!==void 0&&(r.push("description = ?"),n.push(s.description.trim())),s.instructions!==void 0&&(r.push("instructions = ?"),n.push(s.instructions.trim())),s.parameters!==void 0&&(r.push("parameters = ?"),n.push(JSON.stringify(s.parameters))),s.required_tools!==void 0&&(r.push("required_tools = ?"),n.push(JSON.stringify(s.required_tools))),s.examples!==void 0&&(r.push("examples = ?"),n.push(JSON.stringify(s.examples))),s.enabled!==void 0&&(r.push("enabled = ?"),n.push(s.enabled?1:0)),r.length===0?e.json({error:"Nothing to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),n.push(a,t.id),await e.env.DB.prepare(`UPDATE user_skills SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...n).run(),e.json({success:!0}))});ze.delete("/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return isNaN(a)?e.json({error:"Invalid skill ID"},400):(await e.env.DB.prepare("DELETE FROM user_skills WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0}))});const ue=new ve;async function Zn(e,t){var r;const a=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,role:s.role,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),await t()}ue.use("/*",Zn);ue.get("/action-center",async e=>{const t=e.get("user"),a=e.env.DB,[s,r,n,o,i]=await Promise.all([a.prepare("SELECT * FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval','running','failed') ORDER BY priority DESC, COALESCE(due_at, updated_at) ASC LIMIT 40").bind(t.id).all().catch(()=>({results:[]})),a.prepare("SELECT * FROM notifications WHERE user_id = ? AND (is_read = 0 OR status = 'open') ORDER BY created_at DESC LIMIT 20").bind(t.id).all().catch(()=>({results:[]})),a.prepare("SELECT * FROM memory_suggestions WHERE user_id = ? AND status = 'pending' ORDER BY importance DESC, created_at DESC LIMIT 20").bind(t.id).all().catch(()=>({results:[]})),a.prepare("SELECT * FROM document_library WHERE user_id = ? ORDER BY updated_at DESC LIMIT 8").bind(t.id).all().catch(()=>({results:[]})),a.prepare("SELECT * FROM cron_jobs WHERE user_id = ? AND enabled = 1 ORDER BY next_run ASC LIMIT 10").bind(t.id).all().catch(()=>({results:[]}))]),l=s.results||[],d=[...l.filter(h=>h.status==="needs_approval"),...(n.results||[]).map(h=>({...h,type:"memory_suggestion",title:`Remember: ${h.title}`,source:"memory_suggestions"}))],c=new Date().toISOString().slice(0,10),p=(r.results||[]).filter(h=>(h.type==="reminder"||h.due_at)&&String(h.due_at||h.created_at||"").slice(0,10)<=c);return e.json({counts:{open:l.length+(r.results||[]).length,pending:l.filter(h=>h.status==="pending").length,needs_approval:d.length,failed:l.filter(h=>h.status==="failed").length,memory_suggestions:(n.results||[]).length,documents:(o.results||[]).length},today:{reminders:p,schedules:i.results||[]},pending:l.filter(h=>["pending","running","failed"].includes(h.status)),needs_approval:d,notifications:r.results||[],documents:o.results||[]})});ue.get("/action-center/pending",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval','running','failed') ORDER BY updated_at DESC LIMIT 100").bind(t.id).all().catch(()=>({results:[]}));return e.json({items:a.results||[]})});async function pa(e,t){const a=e.get("user"),s=Number(e.req.param("id")),r=t==="completed"?", completed_at = CURRENT_TIMESTAMP":"";return await e.env.DB.prepare(`UPDATE action_items SET status = ?, updated_at = CURRENT_TIMESTAMP${r} WHERE id = ? AND user_id = ?`).bind(t,s,a.id).run(),e.json({success:!0})}ue.post("/action-center/:id/complete",e=>pa(e,"completed"));ue.post("/action-center/:id/cancel",e=>pa(e,"cancelled"));ue.post("/action-center/:id/approve",e=>pa(e,"pending"));ue.post("/action-center/:id/retry",async e=>{const t=e.get("user"),a=Number(e.req.param("id"));return await e.env.DB.prepare("UPDATE action_items SET status = 'pending', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0,message:"Marked pending for retry."})});ue.get("/memory/review",async e=>{const t=e.get("user"),a=e.req.query("type")||void 0,s=e.req.query("tier")||void 0,r=(e.req.query("q")||"").trim(),n=[t.id];let o="SELECT * FROM memory WHERE user_id = ?";a&&(o+=" AND type = ?",n.push(a)),s&&(o+=" AND tier = ?",n.push(s)),r&&(o+=" AND (title LIKE ? OR content LIKE ?)",n.push(`%${r}%`,`%${r}%`)),o+=" ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT 200";const i=await e.env.DB.prepare(o).bind(...n).all(),l=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE user_id = ? AND status = 'pending' ORDER BY importance DESC, created_at DESC LIMIT 50").bind(t.id).all().catch(()=>({results:[]}));return e.json({memories:i.results||[],suggestions:l.results||[]})});ue.post("/memory/:id/promote",async e=>{const t=e.get("user");return await new z(e.env.DB).promote(Number(e.req.param("id")),t.id),e.json({success:!0})});ue.post("/memory/:id/demote",async e=>{const t=e.get("user");return await new z(e.env.DB).demote(Number(e.req.param("id")),t.id),e.json({success:!0})});ue.put("/memory/:id",async e=>{const t=e.get("user"),{content:a}=await e.req.json();return a!=null&&a.trim()?(await new z(e.env.DB).update(Number(e.req.param("id")),t.id,a.trim()),e.json({success:!0})):e.json({error:"Content required"},400)});ue.post("/memory-suggestions/:id/accept",async e=>{const t=e.get("user"),a=Number(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(a,t.id).first();return s?(await new z(e.env.DB).store(t.id,s.type,s.title,s.content,s.importance||5,"long_term"),await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'accepted', decided_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})):e.json({error:"Suggestion not found"},404)});ue.post("/memory-suggestions/:id/reject",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'rejected', decided_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(Number(e.req.param("id")),t.id).run(),e.json({success:!0})});const xt=new ve;async function Xn(e,t){var r;const a=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,role:s.role,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),await t()}xt.use("/*",Xn);xt.get("/",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM document_library WHERE user_id = ? ORDER BY updated_at DESC LIMIT 100").bind(t.id).all().catch(()=>({results:[]}));return e.json({documents:a.results||[]})});xt.post("/:id/summarize",async e=>{var n;const t=e.get("user"),a=Number(e.req.param("id")),s=await e.env.DB.prepare(`SELECT dl.*, uf.extracted_text, uf.file_data, uf.file_type, uf.file_name
     FROM document_library dl
     LEFT JOIN uploaded_files uf ON dl.file_id = uf.id
     WHERE dl.id = ? AND dl.user_id = ?`).bind(a,t.id).first();if(!s)return e.json({error:"Document not found"},404);let r=s.extracted_text||"";if(!r&&s.file_data&&s.file_data!=="r2"&&String(s.file_type||"").startsWith("text/"))try{r=Buffer.from(s.file_data,"base64").toString("utf-8")}catch{r=""}if(!r||r.trim().length<30)return await e.env.DB.prepare("UPDATE document_library SET status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!1,status:"parsed",message:"No extracted text is available yet. Ask Karna to parse the document first, or retry after PDF extraction finishes."});try{const{provider:o}=await lt(e.env.DB,t.id,t.pin_hash),i=`Summarize this document for a personal command center. Return JSON only with keys: summary (short paragraph), key_points (array), dates (array), people_orgs (array), money_amounts (array), action_items (array), risks_unknowns (array).

Document: ${s.name}

${r.slice(0,24e3)}`,l=await o.chat([{role:"user",content:i}],{tools:[],maxTokens:1600}),d=Qn(l.content||"");await e.env.DB.prepare("UPDATE document_library SET summary = ?, key_points = ?, action_items_json = ?, status = 'summarized', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(d.summary,JSON.stringify(d.key_points),JSON.stringify(d.action_items),a,t.id).run();for(const c of d.action_items.slice(0,8))await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, status, priority, source, source_id)
         VALUES (?, 'document_summary', ?, ?, 'pending', 'normal', 'document_library', ?)`).bind(t.id,String(c).slice(0,160),`From ${s.name}`,String(a)).run().catch(()=>null);return e.json({success:!0,summary:d})}catch(o){return await e.env.DB.prepare("UPDATE document_library SET status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a,t.id).run().catch(()=>null),e.json({success:!1,message:(n=o.message)!=null&&n.includes("No LLM provider")?"No AI provider configured. The document is stored; summary is pending.":o.message})}});xt.delete("/:id",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM document_library WHERE id = ? AND user_id = ?").bind(Number(e.req.param("id")),t.id).run(),e.json({success:!0})});function Qn(e){const t=e.replace(/^```json\s*/i,"").replace(/^```\s*/i,"").replace(/```$/i,"").trim();try{const a=JSON.parse(t);return{summary:String(a.summary||"").slice(0,2e3),key_points:Array.isArray(a.key_points)?a.key_points.map(String):[],action_items:Array.isArray(a.action_items)?a.action_items.map(String):[]}}catch{return{summary:t.slice(0,2e3),key_points:[],action_items:[]}}}const me=new ve;me.use("/api/*",Lr());me.route("/api/auth",Le);me.route("/api/chat",X);me.route("/api/settings",Z);me.route("/api/system",Oe);me.route("/api/telegram",kt);me.route("/api/proactive",le);me.route("/api/skills",ze);me.route("/api",ue);me.route("/api/documents",xt);me.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),a=t.searchParams.get("code"),s=t.searchParams.get("state"),r=t.searchParams.get("error");if(r)return e.html(Je(!1,`Google denied access: ${r}`));if(!a||!s)return e.html(Je(!1,"Missing authorization code or state parameter."));try{const o=JSON.parse(atob(s)).sessionId;if(!o)return e.html(Je(!1,"Invalid state parameter — missing session."));const i=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(o).first();if(!i)return e.html(Je(!1,"Session expired. Please log in again and retry."));const l=i.user_id,d=i.pin_hash,c=`${t.protocol}//${t.host}/auth/google/callback`,p=await fs(e.env.DB,l,d,a,c,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(Je(!0,`Connected as ${p.email}`,p.email))}catch(n){return e.html(Je(!1,`OAuth failed: ${n.message}`))}});me.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(ss())));me.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(ss())));function Je(e,t,a){return`<!DOCTYPE html>
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
  <div class="icon">${e?"&#10003;":"&#10007;"}</div>
  <h2 style="margin:0; color:${e?"#4fd1c5":"#ff6b6b"};">${e?"Connected":"Connection Failed"}</h2>
  <p class="msg">${t}</p>
  ${a?'<p class="email">'+a+"</p>":""}
  <a href="/" class="btn">Back to Karna</a>
</div>
<script>
  // Notify the opener window if this was opened in a popup
  if (window.opener) {
    window.opener.postMessage({ type: 'google_oauth_complete', success: ${e}, email: '${a||""}' }, '*');
    setTimeout(function() { window.close(); }, 2000);
  }
<\/script>
</body></html>`}async function eo(e,t,a){const s="https://karna-5xs.pages.dev",n={"Content-Type":"application/json","X-Cron-Secret":t.CRON_SECRET||"karna-cron-default-v1"};try{const i=await(await fetch(`${s}/api/system/cron/execute`,{method:"POST",headers:n})).json();if(i.results&&i.results.length>0){const d=i.results.filter(p=>p.needs_agent&&p.status==="dispatched");if(d.length>0){const p=d.map(h=>fetch(`${s}/api/system/cron/run-task/${h.job_id}`,{method:"POST",headers:n}).then(_=>_.json()).catch(_=>({job_id:h.job_id,error:_.message})));a.waitUntil(Promise.allSettled(p).then(h=>{console.log(`Cron: ${i.executed} dispatched, ${d.length} agent tasks`,JSON.stringify(h.map(_=>_.status==="fulfilled"?_.value:_.reason)))}))}const c=i.results.filter(p=>!p.needs_agent&&p.status==="dispatched");if(c.length>0){const p=c.map(h=>fetch(`${s}/api/system/cron/run-task/${h.job_id}`,{method:"POST",headers:n}).catch(()=>{}));a.waitUntil(Promise.allSettled(p))}}a.waitUntil(fetch(`${s}/api/proactive/cron/evening-briefing`,{method:"POST",headers:n}).then(d=>d.json()).then(d=>{d.executed>0&&console.log("Evening briefing result:",JSON.stringify(d))}).catch(d=>{console.error("Evening briefing error:",d.message)}));for(const d of["morning-briefing","email-digest","weekly-review"])a.waitUntil(fetch(`${s}/api/proactive/cron/${d}`,{method:"POST",headers:n}).then(c=>c.json()).then(c=>{c.executed>0&&console.log(`${d} result:`,JSON.stringify(c))}).catch(c=>{console.error(`${d} error:`,c.message)}));new Date().getMinutes()%5<2&&a.waitUntil(fetch(`${s}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:n}).then(d=>d.json()).then(d=>{var c;(c=d.results)!=null&&c.some(p=>p.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(d))}).catch(()=>{}))}catch(o){console.error("Scheduled cron error:",o.message||o)}}const to={fetch:me.fetch,scheduled:eo},La=new ve,ao=Object.assign({"/src/index.tsx":to});let Zs=!1;for(const[,e]of Object.entries(ao))e&&(La.all("*",t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),La.notFound(t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),Zs=!0);if(!Zs)throw new Error("Can't import modules from ['/src/index.tsx']");export{La as default};
