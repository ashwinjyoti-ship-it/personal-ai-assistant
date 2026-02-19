var Ma=Object.defineProperty;var St=t=>{throw TypeError(t)};var ja=(t,e,a)=>e in t?Ma(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var E=(t,e,a)=>ja(t,typeof e!="symbol"?e+"":e,a),dt=(t,e,a)=>e.has(t)||St("Cannot "+a);var v=(t,e,a)=>(dt(t,e,"read from private field"),a?a.call(t):e.get(t)),O=(t,e,a)=>e.has(t)?St("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),k=(t,e,a,r)=>(dt(t,e,"write to private field"),r?r.call(t,a):e.set(t,a),a),C=(t,e,a)=>(dt(t,e,"access private method"),a);var It=(t,e,a,r)=>({set _(s){k(t,e,s,a)},get _(){return v(t,e,r)}});var Ot=(t,e,a)=>(r,s)=>{let n=-1;return o(0);async function o(i){if(i<=n)throw new Error("next() called multiple times");n=i;let l,d=!1,u;if(t[i]?(u=t[i][0][0],r.req.routeIndex=i):u=i===t.length&&s||void 0,u)try{l=await u(r,()=>o(i+1))}catch(h){if(h instanceof Error&&e)r.error=h,l=await e(h,r),d=!0;else throw h}else r.finalized===!1&&a&&(l=await a(r));return l&&(r.finalized===!1||d)&&(r.res=l),r}},Ba=Symbol(),Pa=async(t,e=Object.create(null))=>{const{all:a=!1,dot:r=!1}=e,n=(t instanceof Zt?t.raw.headers:t.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?Ua(t,{all:a,dot:r}):{}};async function Ua(t,e){const a=await t.formData();return a?Ga(a,e):{}}function Ga(t,e){const a=Object.create(null);return t.forEach((r,s)=>{e.all||s.endsWith("[]")?Ha(a,s,r):a[s]=r}),e.dot&&Object.entries(a).forEach(([r,s])=>{r.includes(".")&&(Fa(a,r,s),delete a[r])}),a}var Ha=(t,e,a)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(a):t[e]=[t[e],a]:e.endsWith("[]")?t[e]=[a]:t[e]=a},Fa=(t,e,a)=>{let r=t;const s=e.split(".");s.forEach((n,o)=>{o===s.length-1?r[n]=a:((!r[n]||typeof r[n]!="object"||Array.isArray(r[n])||r[n]instanceof File)&&(r[n]=Object.create(null)),r=r[n])})},Kt=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},qa=t=>{const{groups:e,path:a}=za(t),r=Kt(a);return Wa(r,e)},za=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(a,r)=>{const s=`@${r}`;return e.push([s,a]),s}),{groups:e,path:t}},Wa=(t,e)=>{for(let a=e.length-1;a>=0;a--){const[r]=e[a];for(let s=t.length-1;s>=0;s--)if(t[s].includes(r)){t[s]=t[s].replace(r,e[a][1]);break}}return t},Qe={},Ka=(t,e)=>{if(t==="*")return"*";const a=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const r=`${t}#${e}`;return Qe[r]||(a[2]?Qe[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,a[1],new RegExp(`^${a[2]}(?=/${e})`)]:[t,a[1],new RegExp(`^${a[2]}$`)]:Qe[r]=[t,a[1],!0]),Qe[r]}return null},wt=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return e(a)}catch{return a}})}},Ja=t=>wt(t,decodeURI),Jt=t=>{const e=t.url,a=e.indexOf("/",e.indexOf(":")+4);let r=a;for(;r<e.length;r++){const s=e.charCodeAt(r);if(s===37){const n=e.indexOf("?",r),o=e.indexOf("#",r),i=n===-1?o===-1?void 0:o:o===-1?n:Math.min(n,o),l=e.slice(a,i);return Ja(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(s===63||s===35)break}return e.slice(a,r)},Ya=t=>{const e=Jt(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},ke=(t,e,...a)=>(a.length&&(e=ke(e,...a)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Yt=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),a=[];let r="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){a.length===0&&r===""?a.push("/"):a.push(r);const n=s.replace("?","");r+="/"+n,a.push(r)}else r+="/"+s}),a.filter((s,n,o)=>o.indexOf(s)===n)},ct=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?wt(t,Xt):t):t,Vt=(t,e,a)=>{let r;if(!a&&e&&!/[%+]/.test(e)){let o=t.indexOf("?",8);if(o===-1)return;for(t.startsWith(e,o+1)||(o=t.indexOf(`&${e}`,o+1));o!==-1;){const i=t.charCodeAt(o+e.length+1);if(i===61){const l=o+e.length+2,d=t.indexOf("&",l);return ct(t.slice(l,d===-1?void 0:d))}else if(i==38||isNaN(i))return"";o=t.indexOf(`&${e}`,o+1)}if(r=/[%+]/.test(t),!r)return}const s={};r??(r=/[%+]/.test(t));let n=t.indexOf("?",8);for(;n!==-1;){const o=t.indexOf("&",n+1);let i=t.indexOf("=",n);i>o&&o!==-1&&(i=-1);let l=t.slice(n+1,i===-1?o===-1?void 0:o:i);if(r&&(l=ct(l)),n=o,l==="")continue;let d;i===-1?d="":(d=t.slice(i+1,o===-1?void 0:o),r&&(d=ct(d))),a?(s[l]&&Array.isArray(s[l])||(s[l]=[]),s[l].push(d)):s[l]??(s[l]=d)}return e?s[e]:s},Va=Vt,Xa=(t,e)=>Vt(t,e,!0),Xt=decodeURIComponent,Ct=t=>wt(t,Xt),Oe,H,ae,Qt,ea,gt,ne,Gt,Zt=(Gt=class{constructor(t,e="/",a=[[]]){O(this,ae);E(this,"raw");O(this,Oe);O(this,H);E(this,"routeIndex",0);E(this,"path");E(this,"bodyCache",{});O(this,ne,t=>{const{bodyCache:e,raw:a}=this,r=e[t];if(r)return r;const s=Object.keys(e)[0];return s?e[s].then(n=>(s==="json"&&(n=JSON.stringify(n)),new Response(n)[t]())):e[t]=a[t]()});this.raw=t,this.path=e,k(this,H,a),k(this,Oe,{})}param(t){return t?C(this,ae,Qt).call(this,t):C(this,ae,ea).call(this)}query(t){return Va(this.url,t)}queries(t){return Xa(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((a,r)=>{e[r]=a}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await Pa(this,t))}json(){return v(this,ne).call(this,"text").then(t=>JSON.parse(t))}text(){return v(this,ne).call(this,"text")}arrayBuffer(){return v(this,ne).call(this,"arrayBuffer")}blob(){return v(this,ne).call(this,"blob")}formData(){return v(this,ne).call(this,"formData")}addValidatedData(t,e){v(this,Oe)[t]=e}valid(t){return v(this,Oe)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[Ba](){return v(this,H)}get matchedRoutes(){return v(this,H)[0].map(([[,t]])=>t)}get routePath(){return v(this,H)[0].map(([[,t]])=>t)[this.routeIndex].path}},Oe=new WeakMap,H=new WeakMap,ae=new WeakSet,Qt=function(t){const e=v(this,H)[0][this.routeIndex][1][t],a=C(this,ae,gt).call(this,e);return a&&/\%/.test(a)?Ct(a):a},ea=function(){const t={},e=Object.keys(v(this,H)[0][this.routeIndex][1]);for(const a of e){const r=C(this,ae,gt).call(this,v(this,H)[0][this.routeIndex][1][a]);r!==void 0&&(t[a]=/\%/.test(r)?Ct(r):r)}return t},gt=function(t){return v(this,H)[1]?v(this,H)[1][t]:t},ne=new WeakMap,Gt),Za={Stringify:1},ta=async(t,e,a,r,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const n=t.callbacks;return n!=null&&n.length?(s?s[0]+=t:s=[t],Promise.all(n.map(i=>i({phase:e,buffer:s,context:r}))).then(i=>Promise.all(i.filter(Boolean).map(l=>ta(l,e,!1,r,s))).then(()=>s[0]))):Promise.resolve(t)},Qa="text/plain; charset=UTF-8",ut=(t,e)=>({"Content-Type":t,...e}),ze,We,Z,Ce,Q,G,Ke,Re,De,fe,Je,Ye,oe,Se,Ht,er=(Ht=class{constructor(t,e){O(this,oe);O(this,ze);O(this,We);E(this,"env",{});O(this,Z);E(this,"finalized",!1);E(this,"error");O(this,Ce);O(this,Q);O(this,G);O(this,Ke);O(this,Re);O(this,De);O(this,fe);O(this,Je);O(this,Ye);E(this,"render",(...t)=>(v(this,Re)??k(this,Re,e=>this.html(e)),v(this,Re).call(this,...t)));E(this,"setLayout",t=>k(this,Ke,t));E(this,"getLayout",()=>v(this,Ke));E(this,"setRenderer",t=>{k(this,Re,t)});E(this,"header",(t,e,a)=>{this.finalized&&k(this,G,new Response(v(this,G).body,v(this,G)));const r=v(this,G)?v(this,G).headers:v(this,fe)??k(this,fe,new Headers);e===void 0?r.delete(t):a!=null&&a.append?r.append(t,e):r.set(t,e)});E(this,"status",t=>{k(this,Ce,t)});E(this,"set",(t,e)=>{v(this,Z)??k(this,Z,new Map),v(this,Z).set(t,e)});E(this,"get",t=>v(this,Z)?v(this,Z).get(t):void 0);E(this,"newResponse",(...t)=>C(this,oe,Se).call(this,...t));E(this,"body",(t,e,a)=>C(this,oe,Se).call(this,t,e,a));E(this,"text",(t,e,a)=>!v(this,fe)&&!v(this,Ce)&&!e&&!a&&!this.finalized?new Response(t):C(this,oe,Se).call(this,t,e,ut(Qa,a)));E(this,"json",(t,e,a)=>C(this,oe,Se).call(this,JSON.stringify(t),e,ut("application/json",a)));E(this,"html",(t,e,a)=>{const r=s=>C(this,oe,Se).call(this,s,e,ut("text/html; charset=UTF-8",a));return typeof t=="object"?ta(t,Za.Stringify,!1,{}).then(r):r(t)});E(this,"redirect",(t,e)=>{const a=String(t);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,e??302)});E(this,"notFound",()=>(v(this,De)??k(this,De,()=>new Response),v(this,De).call(this,this)));k(this,ze,t),e&&(k(this,Q,e.executionCtx),this.env=e.env,k(this,De,e.notFoundHandler),k(this,Ye,e.path),k(this,Je,e.matchResult))}get req(){return v(this,We)??k(this,We,new Zt(v(this,ze),v(this,Ye),v(this,Je))),v(this,We)}get event(){if(v(this,Q)&&"respondWith"in v(this,Q))return v(this,Q);throw Error("This context has no FetchEvent")}get executionCtx(){if(v(this,Q))return v(this,Q);throw Error("This context has no ExecutionContext")}get res(){return v(this,G)||k(this,G,new Response(null,{headers:v(this,fe)??k(this,fe,new Headers)}))}set res(t){if(v(this,G)&&t){t=new Response(t.body,t);for(const[e,a]of v(this,G).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=v(this,G).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of r)t.headers.append("set-cookie",s)}else t.headers.set(e,a)}k(this,G,t),this.finalized=!0}get var(){return v(this,Z)?Object.fromEntries(v(this,Z)):{}}},ze=new WeakMap,We=new WeakMap,Z=new WeakMap,Ce=new WeakMap,Q=new WeakMap,G=new WeakMap,Ke=new WeakMap,Re=new WeakMap,De=new WeakMap,fe=new WeakMap,Je=new WeakMap,Ye=new WeakMap,oe=new WeakSet,Se=function(t,e,a){const r=v(this,G)?new Headers(v(this,G).headers):v(this,fe)??new Headers;if(typeof e=="object"&&"headers"in e){const n=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[o,i]of n)o.toLowerCase()==="set-cookie"?r.append(o,i):r.set(o,i)}if(a)for(const[n,o]of Object.entries(a))if(typeof o=="string")r.set(n,o);else{r.delete(n);for(const i of o)r.append(n,i)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??v(this,Ce);return new Response(t,{status:s,headers:r})},Ht),M="ALL",tr="all",ar=["get","post","put","delete","options","patch"],aa="Can not add a route since the matcher is already built.",ra=class extends Error{},rr="__COMPOSED_HANDLER",sr=t=>t.text("404 Not Found",404),Rt=(t,e)=>{if("getResponse"in t){const a=t.getResponse();return e.newResponse(a.body,a)}return console.error(t),e.text("Internal Server Error",500)},q,j,sa,z,me,tt,at,Ae,nr=(Ae=class{constructor(e={}){O(this,j);E(this,"get");E(this,"post");E(this,"put");E(this,"delete");E(this,"options");E(this,"patch");E(this,"all");E(this,"on");E(this,"use");E(this,"router");E(this,"getPath");E(this,"_basePath","/");O(this,q,"/");E(this,"routes",[]);O(this,z,sr);E(this,"errorHandler",Rt);E(this,"onError",e=>(this.errorHandler=e,this));E(this,"notFound",e=>(k(this,z,e),this));E(this,"fetch",(e,...a)=>C(this,j,at).call(this,e,a[1],a[0],e.method));E(this,"request",(e,a,r,s)=>e instanceof Request?this.fetch(a?new Request(e,a):e,r,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${ke("/",e)}`,a),r,s)));E(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(C(this,j,at).call(this,e.request,e,void 0,e.request.method))})});[...ar,tr].forEach(n=>{this[n]=(o,...i)=>(typeof o=="string"?k(this,q,o):C(this,j,me).call(this,n,v(this,q),o),i.forEach(l=>{C(this,j,me).call(this,n,v(this,q),l)}),this)}),this.on=(n,o,...i)=>{for(const l of[o].flat()){k(this,q,l);for(const d of[n].flat())i.map(u=>{C(this,j,me).call(this,d.toUpperCase(),v(this,q),u)})}return this},this.use=(n,...o)=>(typeof n=="string"?k(this,q,n):(k(this,q,"*"),o.unshift(n)),o.forEach(i=>{C(this,j,me).call(this,M,v(this,q),i)}),this);const{strict:r,...s}=e;Object.assign(this,s),this.getPath=r??!0?e.getPath??Jt:Ya}route(e,a){const r=this.basePath(e);return a.routes.map(s=>{var o;let n;a.errorHandler===Rt?n=s.handler:(n=async(i,l)=>(await Ot([],a.errorHandler)(i,()=>s.handler(i,l))).res,n[rr]=s.handler),C(o=r,j,me).call(o,s.method,s.path,n)}),this}basePath(e){const a=C(this,j,sa).call(this);return a._basePath=ke(this._basePath,e),a}mount(e,a,r){let s,n;r&&(typeof r=="function"?n=r:(n=r.optionHandler,r.replaceRequest===!1?s=l=>l:s=r.replaceRequest));const o=n?l=>{const d=n(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};s||(s=(()=>{const l=ke(this._basePath,e),d=l==="/"?0:l.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(d)||"/",new Request(h,u)}})());const i=async(l,d)=>{const u=await a(s(l.req.raw),...o(l));if(u)return u;await d()};return C(this,j,me).call(this,M,ke(e,"*"),i),this}},q=new WeakMap,j=new WeakSet,sa=function(){const e=new Ae({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,k(e,z,v(this,z)),e.routes=this.routes,e},z=new WeakMap,me=function(e,a,r){e=e.toUpperCase(),a=ke(this._basePath,a);const s={basePath:this._basePath,path:a,method:e,handler:r};this.router.add(e,a,[r,s]),this.routes.push(s)},tt=function(e,a){if(e instanceof Error)return this.errorHandler(e,a);throw e},at=function(e,a,r,s){if(s==="HEAD")return(async()=>new Response(null,await C(this,j,at).call(this,e,a,r,"GET")))();const n=this.getPath(e,{env:r}),o=this.router.match(s,n),i=new er(e,{path:n,matchResult:o,env:r,executionCtx:a,notFoundHandler:v(this,z)});if(o[0].length===1){let d;try{d=o[0][0][0][0](i,async()=>{i.res=await v(this,z).call(this,i)})}catch(u){return C(this,j,tt).call(this,u,i)}return d instanceof Promise?d.then(u=>u||(i.finalized?i.res:v(this,z).call(this,i))).catch(u=>C(this,j,tt).call(this,u,i)):d??v(this,z).call(this,i)}const l=Ot(o[0],this.errorHandler,v(this,z));return(async()=>{try{const d=await l(i);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return C(this,j,tt).call(this,d,i)}})()},Ae),na=[];function or(t,e){const a=this.buildAllMatchers(),r=((s,n)=>{const o=a[s]||a[M],i=o[2][n];if(i)return i;const l=n.match(o[0]);if(!l)return[[],na];const d=l.indexOf("",1);return[o[1][d],l]});return this.match=r,r(t,e)}var st="[^/]+",He=".*",Fe="(?:|/.*)",Ie=Symbol(),ir=new Set(".\\+*[^]$()");function lr(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===He||t===Fe?1:e===He||e===Fe?-1:t===st?1:e===st?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var ye,ve,W,_e,dr=(_e=class{constructor(){O(this,ye);O(this,ve);O(this,W,Object.create(null))}insert(e,a,r,s,n){if(e.length===0){if(v(this,ye)!==void 0)throw Ie;if(n)return;k(this,ye,a);return}const[o,...i]=e,l=o==="*"?i.length===0?["","",He]:["","",st]:o==="/*"?["","",Fe]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const u=l[1];let h=l[2]||st;if(u&&l[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw Ie;if(d=v(this,W)[h],!d){if(Object.keys(v(this,W)).some(y=>y!==He&&y!==Fe))throw Ie;if(n)return;d=v(this,W)[h]=new _e,u!==""&&k(d,ve,s.varIndex++)}!n&&u!==""&&r.push([u,v(d,ve)])}else if(d=v(this,W)[o],!d){if(Object.keys(v(this,W)).some(u=>u.length>1&&u!==He&&u!==Fe))throw Ie;if(n)return;d=v(this,W)[o]=new _e}d.insert(i,a,r,s,n)}buildRegExpStr(){const a=Object.keys(v(this,W)).sort(lr).map(r=>{const s=v(this,W)[r];return(typeof v(s,ve)=="number"?`(${r})@${v(s,ve)}`:ir.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof v(this,ye)=="number"&&a.unshift(`#${v(this,ye)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},ye=new WeakMap,ve=new WeakMap,W=new WeakMap,_e),ot,Ve,Ft,cr=(Ft=class{constructor(){O(this,ot,{varIndex:0});O(this,Ve,new dr)}insert(t,e,a){const r=[],s=[];for(let o=0;;){let i=!1;if(t=t.replace(/\{[^}]+\}/g,l=>{const d=`@\\${o}`;return s[o]=[d,l],o++,i=!0,d}),!i)break}const n=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=s.length-1;o>=0;o--){const[i]=s[o];for(let l=n.length-1;l>=0;l--)if(n[l].indexOf(i)!==-1){n[l]=n[l].replace(i,s[o][1]);break}}return v(this,Ve).insert(n,e,r,v(this,ot),a),r}buildRegExp(){let t=v(this,Ve).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const a=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,n,o)=>n!==void 0?(a[++e]=Number(n),"$()"):(o!==void 0&&(r[Number(o)]=++e),"")),[new RegExp(`^${t}`),a,r]}},ot=new WeakMap,Ve=new WeakMap,Ft),ur=[/^$/,[],Object.create(null)],rt=Object.create(null);function oa(t){return rt[t]??(rt[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function pr(){rt=Object.create(null)}function mr(t){var d;const e=new cr,a=[];if(t.length===0)return ur;const r=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[y,f])=>u?1:y?-1:h.length-f.length),s=Object.create(null);for(let u=0,h=-1,y=r.length;u<y;u++){const[f,b,_]=r[u];f?s[b]=[_.map(([c])=>[c,Object.create(null)]),na]:h++;let x;try{x=e.insert(b,h,f)}catch(c){throw c===Ie?new ra(b):c}f||(a[h]=_.map(([c,p])=>{const m=Object.create(null);for(p-=1;p>=0;p--){const[g,w]=x[p];m[g]=w}return[c,m]}))}const[n,o,i]=e.buildRegExp();for(let u=0,h=a.length;u<h;u++)for(let y=0,f=a[u].length;y<f;y++){const b=(d=a[u][y])==null?void 0:d[1];if(!b)continue;const _=Object.keys(b);for(let x=0,c=_.length;x<c;x++)b[_[x]]=i[b[_[x]]]}const l=[];for(const u in o)l[u]=a[o[u]];return[n,l,s]}function Ee(t,e){if(t){for(const a of Object.keys(t).sort((r,s)=>s.length-r.length))if(oa(a).test(e))return[...t[a]]}}var ie,le,it,ia,qt,hr=(qt=class{constructor(){O(this,it);E(this,"name","RegExpRouter");O(this,ie);O(this,le);E(this,"match",or);k(this,ie,{[M]:Object.create(null)}),k(this,le,{[M]:Object.create(null)})}add(t,e,a){var i;const r=v(this,ie),s=v(this,le);if(!r||!s)throw new Error(aa);r[t]||[r,s].forEach(l=>{l[t]=Object.create(null),Object.keys(l[M]).forEach(d=>{l[t][d]=[...l[M][d]]})}),e==="/*"&&(e="*");const n=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const l=oa(e);t===M?Object.keys(r).forEach(d=>{var u;(u=r[d])[e]||(u[e]=Ee(r[d],e)||Ee(r[M],e)||[])}):(i=r[t])[e]||(i[e]=Ee(r[t],e)||Ee(r[M],e)||[]),Object.keys(r).forEach(d=>{(t===M||t===d)&&Object.keys(r[d]).forEach(u=>{l.test(u)&&r[d][u].push([a,n])})}),Object.keys(s).forEach(d=>{(t===M||t===d)&&Object.keys(s[d]).forEach(u=>l.test(u)&&s[d][u].push([a,n]))});return}const o=Yt(e)||[e];for(let l=0,d=o.length;l<d;l++){const u=o[l];Object.keys(s).forEach(h=>{var y;(t===M||t===h)&&((y=s[h])[u]||(y[u]=[...Ee(r[h],u)||Ee(r[M],u)||[]]),s[h][u].push([a,n-d+l+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(v(this,le)).concat(Object.keys(v(this,ie))).forEach(e=>{t[e]||(t[e]=C(this,it,ia).call(this,e))}),k(this,ie,k(this,le,void 0)),pr(),t}},ie=new WeakMap,le=new WeakMap,it=new WeakSet,ia=function(t){const e=[];let a=t===M;return[v(this,ie),v(this,le)].forEach(r=>{const s=r[t]?Object.keys(r[t]).map(n=>[n,r[t][n]]):[];s.length!==0?(a||(a=!0),e.push(...s)):t!==M&&e.push(...Object.keys(r[M]).map(n=>[n,r[M][n]]))}),a?mr(e):null},qt),de,ee,zt,gr=(zt=class{constructor(t){E(this,"name","SmartRouter");O(this,de,[]);O(this,ee,[]);k(this,de,t.routers)}add(t,e,a){if(!v(this,ee))throw new Error(aa);v(this,ee).push([t,e,a])}match(t,e){if(!v(this,ee))throw new Error("Fatal error");const a=v(this,de),r=v(this,ee),s=a.length;let n=0,o;for(;n<s;n++){const i=a[n];try{for(let l=0,d=r.length;l<d;l++)i.add(...r[l]);o=i.match(t,e)}catch(l){if(l instanceof ra)continue;throw l}this.match=i.match.bind(i),k(this,de,[i]),k(this,ee,void 0);break}if(n===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(v(this,ee)||v(this,de).length!==1)throw new Error("No active router has been determined yet.");return v(this,de)[0]}},de=new WeakMap,ee=new WeakMap,zt),je=Object.create(null),ce,P,be,$e,B,te,he,Ne,fr=(Ne=class{constructor(e,a,r){O(this,te);O(this,ce);O(this,P);O(this,be);O(this,$e,0);O(this,B,je);if(k(this,P,r||Object.create(null)),k(this,ce,[]),e&&a){const s=Object.create(null);s[e]={handler:a,possibleKeys:[],score:0},k(this,ce,[s])}k(this,be,[])}insert(e,a,r){k(this,$e,++It(this,$e)._);let s=this;const n=qa(a),o=[];for(let i=0,l=n.length;i<l;i++){const d=n[i],u=n[i+1],h=Ka(d,u),y=Array.isArray(h)?h[0]:d;if(y in v(s,P)){s=v(s,P)[y],h&&o.push(h[1]);continue}v(s,P)[y]=new Ne,h&&(v(s,be).push(h),o.push(h[1])),s=v(s,P)[y]}return v(s,ce).push({[e]:{handler:r,possibleKeys:o.filter((i,l,d)=>d.indexOf(i)===l),score:v(this,$e)}}),s}search(e,a){var l;const r=[];k(this,B,je);let n=[this];const o=Kt(a),i=[];for(let d=0,u=o.length;d<u;d++){const h=o[d],y=d===u-1,f=[];for(let b=0,_=n.length;b<_;b++){const x=n[b],c=v(x,P)[h];c&&(k(c,B,v(x,B)),y?(v(c,P)["*"]&&r.push(...C(this,te,he).call(this,v(c,P)["*"],e,v(x,B))),r.push(...C(this,te,he).call(this,c,e,v(x,B)))):f.push(c));for(let p=0,m=v(x,be).length;p<m;p++){const g=v(x,be)[p],w=v(x,B)===je?{}:{...v(x,B)};if(g==="*"){const A=v(x,P)["*"];A&&(r.push(...C(this,te,he).call(this,A,e,v(x,B))),k(A,B,w),f.push(A));continue}const[T,I,R]=g;if(!h&&!(R instanceof RegExp))continue;const D=v(x,P)[T],N=o.slice(d).join("/");if(R instanceof RegExp){const A=R.exec(N);if(A){if(w[I]=A[0],r.push(...C(this,te,he).call(this,D,e,v(x,B),w)),Object.keys(v(D,P)).length){k(D,B,w);const F=((l=A[0].match(/\//))==null?void 0:l.length)??0;(i[F]||(i[F]=[])).push(D)}continue}}(R===!0||R.test(h))&&(w[I]=h,y?(r.push(...C(this,te,he).call(this,D,e,w,v(x,B))),v(D,P)["*"]&&r.push(...C(this,te,he).call(this,v(D,P)["*"],e,w,v(x,B)))):(k(D,B,w),f.push(D)))}}n=f.concat(i.shift()??[])}return r.length>1&&r.sort((d,u)=>d.score-u.score),[r.map(({handler:d,params:u})=>[d,u])]}},ce=new WeakMap,P=new WeakMap,be=new WeakMap,$e=new WeakMap,B=new WeakMap,te=new WeakSet,he=function(e,a,r,s){const n=[];for(let o=0,i=v(e,ce).length;o<i;o++){const l=v(e,ce)[o],d=l[a]||l[M],u={};if(d!==void 0&&(d.params=Object.create(null),n.push(d),r!==je||s&&s!==je))for(let h=0,y=d.possibleKeys.length;h<y;h++){const f=d.possibleKeys[h],b=u[d.score];d.params[f]=s!=null&&s[f]&&!b?s[f]:r[f]??(s==null?void 0:s[f]),u[d.score]=!0}}return n},Ne),we,Wt,yr=(Wt=class{constructor(){E(this,"name","TrieRouter");O(this,we);k(this,we,new fr)}add(t,e,a){const r=Yt(e);if(r){for(let s=0,n=r.length;s<n;s++)v(this,we).insert(t,r[s],a);return}v(this,we).insert(t,e,a)}match(t,e){return v(this,we).search(t,e)}},we=new WeakMap,Wt),xe=class extends nr{constructor(t={}){super(t),this.router=t.router??new gr({routers:[new hr,new yr]})}},vr=t=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(n=>typeof n=="string"?n==="*"?()=>n:o=>n===o?o:null:typeof n=="function"?n:o=>n.includes(o)?o:null)(a.origin),s=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(a.allowMethods);return async function(o,i){var u;function l(h,y){o.res.headers.set(h,y)}const d=await r(o.req.header("origin")||"",o);if(d&&l("Access-Control-Allow-Origin",d),a.credentials&&l("Access-Control-Allow-Credentials","true"),(u=a.exposeHeaders)!=null&&u.length&&l("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),o.req.method==="OPTIONS"){a.origin!=="*"&&l("Vary","Origin"),a.maxAge!=null&&l("Access-Control-Max-Age",a.maxAge.toString());const h=await s(o.req.header("origin")||"",o);h.length&&l("Access-Control-Allow-Methods",h.join(","));let y=a.allowHeaders;if(!(y!=null&&y.length)){const f=o.req.header("Access-Control-Request-Headers");f&&(y=f.split(/\s*,\s*/))}return y!=null&&y.length&&(l("Access-Control-Allow-Headers",y.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await i(),a.origin!=="*"&&o.header("Vary","Origin",{append:!0})}};function la(){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="theme-color" content="#0e0e10">
  <title>Karna</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
  <style>
    /* === KARNA v3.1 — Threads + Dashboard + Mobile + Self-building === */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0e0e10; --bg-elevated: #16161a; --bg-hover: #1e1e22;
      --bg-overlay: rgba(14, 14, 16, 0.85);
      --text-primary: #e8e6e3; --text-secondary: #8b8a88; --text-muted: #555553;
      --accent: #4fd1c5; --accent-dim: rgba(79, 209, 197, 0.15);
      --border: rgba(255, 255, 255, 0.06);
      --danger: #e55; --warning: #f6ad55; --success: #68d391;
      --font-body: 'Inter', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --safe-top: env(safe-area-inset-top, 0px);
      --safe-bottom: env(safe-area-inset-bottom, 0px);
      --safe-left: env(safe-area-inset-left, 0px);
      --safe-right: env(safe-area-inset-right, 0px);
    }
    html, body { height:100%; background:var(--bg); color:var(--text-primary); font-family:var(--font-body); font-size:15px; line-height:1.65; -webkit-font-smoothing:antialiased; overflow:hidden; }
    #app { height:100%; display:flex; flex-direction:column; padding-top:var(--safe-top); }
    
    /* === Top Bar === */
    .topbar { display:flex; align-items:center; justify-content:space-between; padding:12px 20px; padding-left:calc(20px + var(--safe-left)); padding-right:calc(20px + var(--safe-right)); border-bottom:1px solid var(--border); flex-shrink:0; backdrop-filter:blur(20px); z-index:10; }
    .topbar-left, .topbar-right { display:flex; align-items:center; gap:4px; }
    .topbar-btn { background:none; border:none; color:var(--text-secondary); cursor:pointer; padding:10px; border-radius:8px; transition:all 0.2s; font-size:24px; min-width:48px; min-height:48px; display:flex; align-items:center; justify-content:center; }
    .topbar-btn:hover { color:var(--text-primary); background:var(--accent-dim); }
    .topbar-btn.active { color:var(--accent); background:var(--accent-dim); }
    .topbar-title { font-size:13px; font-weight:500; letter-spacing:2px; text-transform:uppercase; color:var(--text-secondary); }
    .status-dot { width:6px; height:6px; border-radius:50%; background:var(--accent); display:inline-block; margin-right:8px; animation:pulse 3s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .thread-title-display { font-size:12px; color:var(--text-muted); max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-left:8px; }

    /* === Notification Bell === */
    .notif-btn { position:relative; }
    .notif-badge { position:absolute; top:4px; right:4px; min-width:16px; height:16px; background:var(--danger); color:#fff; font-size:10px; font-weight:700; border-radius:8px; display:flex; align-items:center; justify-content:center; padding:0 4px; line-height:1; pointer-events:none; }
    .notif-badge.hidden { display:none; }
    .notif-dropdown { position:fixed; top:56px; right:16px; width:340px; max-width:calc(100vw - 32px); max-height:420px; background:var(--bg-elevated); border:1px solid var(--border); border-radius:12px; box-shadow:0 8px 32px rgba(0,0,0,0.5); z-index:120; display:none; flex-direction:column; overflow:hidden; animation:fadeIn 0.2s ease; }
    .notif-dropdown.open { display:flex; }
    .notif-header { padding:12px 16px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
    .notif-header-title { font-size:11px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; color:var(--text-muted); }
    .notif-list { flex:1; overflow-y:auto; padding:4px 0; min-height:0; }
    .notif-item { padding:10px 16px; cursor:pointer; transition:background 0.15s; border-bottom:1px solid var(--border); }
    .notif-item:last-child { border-bottom:none; }
    .notif-item:hover { background:var(--bg-hover); }
    .notif-item.unread { border-left:3px solid var(--accent); }
    .notif-item-title { font-size:13px; font-weight:500; color:var(--text-primary); margin-bottom:2px; overflow-wrap:break-word; word-break:break-word; }
    .notif-item-body { font-size:12px; color:var(--text-muted); line-height:1.4; overflow-wrap:break-word; word-break:break-word; }
    .notif-item-time { font-size:10px; color:var(--text-muted); margin-top:4px; }
    .notif-empty { padding:32px 16px; text-align:center; color:var(--text-muted); font-size:13px; }

    /* === Main Content === */
    .main-content { flex:1; overflow:hidden; display:flex; flex-direction:column; }
    .chat-area { flex:1; overflow-y:auto; padding:32px 20px; padding-left:calc(20px + var(--safe-left)); padding-right:calc(20px + var(--safe-right)); scroll-behavior:smooth; -webkit-overflow-scrolling:touch; }
    .chat-area::-webkit-scrollbar { width:3px; }
    .chat-area::-webkit-scrollbar-thumb { background:var(--border); border-radius:3px; }
    .message-group { max-width:720px; margin:0 auto 28px; animation:fadeIn 0.3s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    .msg-user { font-weight:500; color:var(--text-primary); margin-bottom:6px; font-size:15px; }
    .msg-assistant { color:var(--text-secondary); font-weight:300; font-size:15px; line-height:1.75; }
    .msg-assistant strong { color:var(--text-primary); font-weight:500; }
    .msg-assistant code { font-family:var(--font-mono); font-size:13px; background:var(--bg-elevated); padding:2px 6px; border-radius:4px; color:var(--accent); }
    .msg-assistant pre { background:var(--bg-elevated); padding:14px 16px; border-radius:8px; margin:12px 0; overflow-x:auto; border:1px solid var(--border); }
    .msg-assistant pre code { background:none; padding:0; }
    .msg-assistant ul, .msg-assistant ol { padding-left:20px; margin:8px 0; }
    .msg-assistant li { margin:4px 0; }
    .msg-assistant a { color:var(--accent); text-decoration:none; }
    .msg-assistant a:hover { text-decoration:underline; }
    .msg-assistant a.msg-link { display:inline-flex; align-items:center; gap:4px; padding:1px 6px; border-radius:4px; background:var(--accent-dim); transition:background 0.2s; word-break:break-all; }
    .msg-assistant a.msg-link:hover { background:rgba(79,209,197,0.25); text-decoration:none; }
    .msg-assistant a.yt-link { background:rgba(255,0,0,0.1); color:#ff6b6b; }
    .msg-assistant a.yt-link:hover { background:rgba(255,0,0,0.2); }
    .link-icon { font-size:12px; flex-shrink:0; }
    .yt-icon { color:#ff4444; } .map-icon { color:#4caf50; }

    /* Thinking indicator */
    .thinking { max-width:720px; margin:0 auto; color:var(--text-muted); font-size:14px; }
    .thinking-cursor { display:inline-block; width:2px; height:16px; background:var(--accent); vertical-align:text-bottom; animation:blink 1s infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .progress-bar { position:fixed; top:var(--safe-top); left:0; height:2px; background:linear-gradient(90deg,var(--accent),transparent); width:0; transition:width 0.3s; z-index:100; opacity:0; }
    .progress-bar.active { opacity:1; animation:progressPulse 2s infinite; }
    @keyframes progressPulse { 0%{width:0} 50%{width:60%} 100%{width:85%} }
    
    /* Tool execution indicators */
    .tool-indicator { display:flex; align-items:center; gap:8px; padding:8px 12px; background:var(--bg-elevated); border:1px solid var(--border); border-radius:8px; margin:8px 0; font-size:13px; color:var(--text-muted); animation:fadeIn 0.3s ease; }
    .tool-indicator.running { border-color:var(--accent); }
    .tool-indicator.completed { border-color:rgba(104,211,145,0.4); }
    .tool-indicator.error { border-color:rgba(238,85,85,0.4); }
    .tool-spinner { width:14px; height:14px; border:2px solid var(--border); border-top-color:var(--accent); border-radius:50%; animation:spin 0.8s linear infinite; }
    .tool-check { color:var(--success); font-size:16px; }
    .tool-error-icon { color:var(--danger); font-size:16px; }
    @keyframes spin { to { transform:rotate(360deg); } }
    .tool-name { font-weight:500; color:var(--text-primary); }
    .tool-result { font-size:12px; color:var(--text-muted); margin-top:4px; max-height:60px; overflow:hidden; text-overflow:ellipsis; }
    .streaming-response { max-width:720px; margin:0 auto; }
    .streaming-text { color:var(--text-secondary); font-weight:300; font-size:15px; line-height:1.75; min-height:20px; }

    /* === Input Area === */
    .input-area { padding:12px 20px; padding-bottom:calc(12px + var(--safe-bottom)); padding-left:calc(20px + var(--safe-left)); padding-right:calc(20px + var(--safe-right)); border-top:1px solid var(--border); flex-shrink:0; background:var(--bg); }
    .input-wrap { max-width:720px; margin:0 auto; position:relative; display:flex; align-items:flex-end; gap:8px; background:var(--bg-elevated); border:1px solid var(--border); border-radius:12px; padding:8px 12px; transition:border-color 0.2s; }
    .input-wrap:focus-within { border-color:var(--accent); }
    .input-field { flex:1; background:transparent; border:none; color:var(--text-primary); font-family:var(--font-body); font-size:16px; line-height:1.5; resize:none; outline:none; min-height:24px; max-height:40vh; white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; }
    .input-field::placeholder { color:var(--text-muted); }
    .input-actions { display:flex; align-items:center; gap:4px; flex-shrink:0; }
    .input-btn { background:none; border:none; color:var(--text-muted); cursor:pointer; padding:6px; border-radius:6px; font-size:22px; display:flex; align-items:center; justify-content:center; transition:all 0.15s; min-width:40px; min-height:40px; }
    .input-btn:hover { color:var(--text-primary); background:var(--accent-dim); }
    .input-btn.send-btn { color:var(--accent); }
    .input-btn.send-btn:hover { background:var(--accent); color:#0a0a0a; }
    .file-chip { display:inline-flex; align-items:center; gap:6px; background:var(--accent-dim); color:var(--accent); padding:4px 10px; border-radius:6px; font-size:12px; margin-bottom:6px; }
    .file-chip button { background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:14px; padding:0 2px; }

    /* === Dashboard === */
    .dashboard { max-width:720px; margin:0 auto; padding:20px 0; }
    .dash-greeting { font-size:22px; font-weight:300; color:var(--text-secondary); margin-bottom:4px; }
    .dash-subtitle { font-size:13px; color:var(--text-muted); margin-bottom:28px; }
    .dash-cards { display:grid; grid-template-columns:repeat(auto-fill, minmax(155px, 1fr)); gap:12px; margin-bottom:28px; }
    .dash-card { background:var(--bg-elevated); border:1px solid var(--border); border-radius:10px; padding:16px; cursor:pointer; transition:all 0.2s; -webkit-tap-highlight-color:transparent; }
    .dash-card:hover, .dash-card:active { border-color:var(--accent); transform:translateY(-1px); }
    .dash-card-icon { font-size:32px; margin-bottom:8px; }
    .dash-card-value { font-size:22px; font-weight:600; color:var(--text-primary); }
    .dash-card-label { font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; margin-top:2px; }
    .dash-section-title { font-size:11px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--text-muted); margin-bottom:12px; }
    .dash-threads { display:flex; flex-direction:column; gap:8px; }
    .dash-thread { background:var(--bg-elevated); border:1px solid var(--border); border-radius:8px; padding:12px 14px; cursor:pointer; transition:all 0.2s; -webkit-tap-highlight-color:transparent; }
    .dash-thread:hover, .dash-thread:active { border-color:rgba(255,255,255,0.12); background:var(--bg-hover); }
    .dash-thread-title { font-size:14px; font-weight:500; color:var(--text-primary); margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .dash-thread-meta { font-size:11px; color:var(--text-muted); display:flex; gap:12px; }

    /* === Thread Sidebar (Overlay) === */
    .overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:var(--bg-overlay); backdrop-filter:blur(24px); z-index:50; display:none; opacity:0; transition:opacity 0.25s ease; }
    .overlay.active { display:flex; opacity:1; }
    #threadsOverlay.active { background:transparent; backdrop-filter:none; }
    #threadsOverlay .overlay-close { background:transparent; }
    .overlay-panel { width:380px; max-width:100%; height:100%; background:var(--bg-elevated); border-right:1px solid var(--border); padding:0; overflow:hidden; animation:slideIn 0.25s ease; display:flex; flex-direction:column; padding-top:var(--safe-top); }
    .overlay-panel.right { margin-left:auto; border-right:none; border-left:1px solid var(--border); animation:slideInRight 0.25s ease; padding:0; padding-top:var(--safe-top); }
    .settings-header { padding:16px 16px 0; padding-right:calc(16px + var(--safe-right)); flex-shrink:0; }
    .settings-scroll { flex:1; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:0 16px 16px; padding-right:calc(16px + var(--safe-right)); padding-bottom:calc(16px + var(--safe-bottom)); min-height:0; }
    @keyframes slideIn { from{transform:translateX(-20px);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes slideInRight { from{transform:translateX(20px);opacity:0} to{transform:translateX(0);opacity:1} }
    .overlay-close { position:absolute; top:0; left:0; width:100%; height:100%; z-index:-1; }

    /* Thread sidebar specifics */
    .thread-sidebar-header { padding:16px 20px; border-bottom:1px solid var(--border); flex-shrink:0; display:flex; align-items:center; justify-content:space-between; }
    .thread-sidebar-header .panel-title { margin:0; }
    .thread-sidebar-footer { flex-shrink:0; padding:8px 12px; border-top:1px solid var(--border); display:flex; gap:6px; padding-bottom:calc(8px + var(--safe-bottom)); }
    .thread-footer-btn { flex:1; background:var(--bg); border:1px solid var(--border); color:var(--text-secondary); padding:10px 8px; border-radius:6px; font-size:12px; font-weight:500; cursor:pointer; transition:all 0.15s; display:flex; align-items:center; justify-content:center; gap:6px; min-height:40px; }
    .thread-footer-btn:hover { color:var(--text-primary); border-color:var(--accent); background:var(--accent-dim); }
    .thread-footer-btn span { font-size:22px; }
    .thread-new-btn { background:var(--accent); color:#0a0a0a; border:none; padding:8px 16px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; transition:opacity 0.2s; min-height:44px; }
    .thread-new-btn:hover { opacity:0.85; }
    .thread-list { flex:1; overflow-y:auto; padding:8px 12px; -webkit-overflow-scrolling:touch; }
    .thread-item { padding:12px 14px; border-radius:8px; cursor:pointer; transition:all 0.15s; margin-bottom:2px; position:relative; -webkit-tap-highlight-color:transparent; }
    .thread-item:hover { background:var(--bg-hover); }
    .thread-item.active { background:var(--accent-dim); border-left:2px solid var(--accent); }
    .thread-item-title { font-size:14px; font-weight:500; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:2px; }
    .thread-item-preview { font-size:12px; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .thread-item-meta { font-size:10px; color:var(--text-muted); margin-top:4px; display:flex; justify-content:space-between; }
    .thread-item-actions { position:absolute; right:8px; top:50%; transform:translateY(-50%); display:none; gap:4px; }
    .thread-item:hover .thread-item-actions { display:flex; }
    .thread-action-btn { background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:13px; padding:8px; border-radius:4px; min-width:36px; min-height:36px; display:flex; align-items:center; justify-content:center; }
    .thread-action-btn:hover { color:var(--text-primary); background:rgba(255,255,255,0.08); }
    .thread-action-btn.danger:hover { color:var(--danger); }
    .thread-section-label { font-size:10px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; color:var(--text-muted); padding:16px 14px 6px; }

    /* === Settings Overlay (right panel) === */
    .panel-title { font-size:11px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--text-muted); margin-bottom:20px; flex-shrink:0; }
    .tabs { display:flex; gap:0; margin-bottom:0; border-bottom:1px solid var(--border); overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; flex-shrink:0; }
    .tabs::-webkit-scrollbar { display:none; }
    .tab { padding:10px 10px; font-size:12px; font-weight:500; color:var(--text-muted); cursor:pointer; border-bottom:2px solid transparent; transition:all 0.2s; white-space:nowrap; min-height:40px; display:flex; align-items:center; }
    .tab:hover { color:var(--text-secondary); }
    .tab.active { color:var(--accent); border-bottom-color:var(--accent); }
    .tab-content { display:none; }
    .tab-content.active { display:block; }

    /* === Auth Screens === */
    .auth-screen { height:100%; display:flex; align-items:center; justify-content:center; flex-direction:column; padding:20px; }
    .auth-form { width:320px; max-width:100%; }
    .auth-title { font-size:24px; font-weight:300; letter-spacing:4px; text-transform:uppercase; color:var(--text-primary); text-align:center; margin-bottom:8px; }
    .auth-subtitle { font-size:13px; color:var(--text-muted); text-align:center; margin-bottom:32px; }

    /* === Form Elements === */
    .field { margin-bottom:16px; }
    .field label { display:block; font-size:11px; font-weight:500; letter-spacing:1px; text-transform:uppercase; color:var(--text-muted); margin-bottom:6px; }
    .field input, .field textarea, .field select { width:100%; background:var(--bg-elevated); border:1px solid var(--border); color:var(--text-primary); font-family:var(--font-body); font-size:16px; padding:12px 14px; border-radius:8px; outline:none; transition:border-color 0.2s; -webkit-appearance:none; }
    .field input:focus, .field textarea:focus { border-color:var(--accent); }
    .field textarea { min-height:80px; resize:vertical; }
    .btn { width:100%; padding:12px; background:transparent; border:1px solid var(--accent); color:var(--accent); font-family:var(--font-body); font-size:13px; font-weight:500; letter-spacing:1px; text-transform:uppercase; border-radius:8px; cursor:pointer; transition:all 0.2s; min-height:44px; -webkit-tap-highlight-color:transparent; }
    .btn:hover, .btn:active { background:var(--accent-dim); }
    .btn:disabled { opacity:0.4; cursor:not-allowed; }
    .btn-small { width:auto; padding:8px 14px; font-size:11px; }
    .btn-danger { border-color:var(--danger); color:var(--danger); }
    .btn-danger:hover, .btn-danger:active { background:rgba(238,85,85,0.1); }
    .error-text { color:var(--danger); font-size:13px; margin-top:8px; }
    .success-text { color:var(--accent); font-size:13px; margin-top:8px; }

    /* === Item Cards (memory, schedules, errors, features) === */
    .item-card { padding:12px; border:1px solid var(--border); border-radius:8px; margin-bottom:8px; transition:border-color 0.2s; overflow:hidden; min-width:0; }
    .item-card:hover { border-color:rgba(255,255,255,0.12); }
    .item-card-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; gap:8px; flex-wrap:wrap; }
    .item-card-title { font-size:13px; font-weight:500; color:var(--text-primary); min-width:0; overflow-wrap:break-word; word-break:break-word; }
    .item-card-meta { font-size:11px; color:var(--text-muted); }
    .item-card-body { font-size:13px; color:var(--text-secondary); line-height:1.5; overflow-wrap:break-word; word-break:break-word; white-space:pre-wrap; }
    .tag { display:inline-block; font-size:10px; padding:2px 8px; border-radius:4px; background:var(--accent-dim); color:var(--accent); text-transform:uppercase; letter-spacing:0.5px; }

    /* === Toggle Switch === */
    .toggle { position:relative; width:36px; height:20px; cursor:pointer; }
    .toggle input { display:none; }
    .toggle-track { width:100%; height:100%; background:var(--border); border-radius:10px; transition:background 0.2s; }
    .toggle input:checked + .toggle-track { background:var(--accent); }
    .toggle-thumb { position:absolute; top:2px; left:2px; width:16px; height:16px; background:var(--text-primary); border-radius:50%; transition:transform 0.2s; }
    .toggle input:checked ~ .toggle-thumb { transform:translateX(16px); }

    /* === Welcome === */
    .welcome { max-width:720px; margin:0 auto; text-align:center; padding-top:8vh; }
    .welcome h2 { font-size:20px; font-weight:300; color:var(--text-secondary); margin-bottom:8px; }
    .welcome p { font-size:14px; color:var(--text-muted); line-height:1.6; }

    /* === Toast Notifications === */
    .toast-container { position:fixed; top:calc(16px + var(--safe-top)); right:calc(16px + var(--safe-right)); z-index:200; display:flex; flex-direction:column; gap:8px; }
    .toast { background:var(--bg-elevated); border:1px solid var(--border); border-radius:8px; padding:12px 16px; font-size:13px; color:var(--text-secondary); animation:fadeIn 0.3s ease; max-width:320px; display:flex; align-items:center; gap:8px; }
    .toast.success { border-color:rgba(104,211,145,0.3); }
    .toast.error { border-color:rgba(238,85,85,0.3); }

    /* === Responsive — Mobile first === */
    @media (max-width:640px) {
      .overlay-panel { width:100%; }
      .overlay-panel.right { padding:0; padding-top:calc(16px + var(--safe-top)); }
      .settings-header { padding:16px 16px 0; }
      .settings-scroll { padding:0 16px 16px; padding-bottom:calc(16px + var(--safe-bottom)); }
      .chat-area { padding:16px; }
      .input-area { padding:8px 12px; padding-bottom:calc(8px + var(--safe-bottom)); }
      .dash-cards { grid-template-columns:repeat(2, 1fr); gap:8px; }
      .thread-title-display { display:none; }
      .topbar { padding:8px 12px; }
      .topbar-btn { padding:8px; min-width:44px; min-height:44px; font-size:22px; }
      .thread-item-actions { display:flex; } /* Always show on mobile (no hover) */
      .message-group { margin-bottom:20px; }
      .dash-greeting { font-size:18px; }
      .tabs { gap:0; }
      .tab { padding:8px 8px; font-size:11px; }
    }

    @media (max-width:380px) {
      .dash-cards { grid-template-columns:1fr 1fr; }
      .dash-card { padding:12px; }
      .dash-card-value { font-size:18px; }
    }

    /* Feature request status badges */
    .feat-proposed { color:#f6ad55; }
    .feat-approved { color:var(--accent); }
    .feat-rejected { color:var(--danger); }
    .feat-in_progress { color:#63b3ed; }
    .feat-implemented { color:var(--success); }
    .feat-deferred { color:var(--text-muted); }
  </style>
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
    threads: [],
    activeThreadId: null,
    view: 'dashboard',
    assistantName: 'Karna',
    gmailUnread: 0,
    pendingFiles: [],
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

  function saveSession(d) { state.session = d; localStorage.setItem('karna_session', JSON.stringify(d)); if (d && d.user && d.user.username) localStorage.setItem('karna_last_username', d.user.username); }
  function loadSession() { var s = localStorage.getItem('karna_session'); if (s) state.session = JSON.parse(s); }
  function clearSession() { state.session = null; localStorage.removeItem('karna_session'); }

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
    return result.join('<br>');
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
      if (!data.hasUsers) { renderSetup(container); } else { renderLogin(container); }
    });
  }

  function renderSetup(container) {
    container.innerHTML = '<div class="auth-screen"><div class="auth-form">' +
      '<div class="auth-title">Karna</div>' +
      '<div class="auth-subtitle">First time setup \\u2014 create your profile</div>' +
      '<div class="field"><label>Username</label><input type="text" id="setupUsername" placeholder="ashwin" autocomplete="off"></div>' +
      '<div class="field"><label>Display Name</label><input type="text" id="setupName" placeholder="Ashwin Jyoti"></div>' +
      '<div class="field"><label>PIN (4+ characters)</label><div style="display:flex;gap:8px;align-items:center;"><input type="password" id="setupPin" placeholder="Your secret PIN" style="flex:1;"></div></div>' +
      '<div class="field"><label>Personality Instructions (optional)</label><textarea id="setupPersonality" placeholder="How should Karna talk to you?"></textarea></div>' +
      '<div class="field"><label>Timezone</label><select id="setupTimezone"><option value="Asia/Kolkata" selected>Asia/Kolkata (IST)</option><option value="America/New_York">America/New_York (EST)</option><option value="Europe/London">Europe/London (GMT)</option><option value="Asia/Tokyo">Asia/Tokyo (JST)</option><option value="UTC">UTC</option></select></div>' +
      '<button class="btn" id="setupBtn">Create Profile</button>' +
      '<div id="setupError" class="error-text"></div></div></div>';
    document.getElementById('setupBtn').onclick = handleSetup;
  }

  function renderLogin(container) {
    var lastUser = localStorage.getItem('karna_last_username') || '';
    container.innerHTML = '<div class="auth-screen"><div class="auth-form">' +
      '<div class="auth-title">Karna</div><div class="auth-subtitle">Welcome back</div>' +
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
      personality_prompt: document.getElementById('setupPersonality').value.trim(),
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
        '<div class="notif-header"><span class="notif-header-title">Notifications</span><button class="btn btn-small" id="notifReadAll" style="width:auto;padding:4px 10px;font-size:10px;">Mark all read</button></div>' +
        '<div class="notif-list" id="notifList"><div class="notif-empty">No notifications</div></div>' +
      '</div>' +
      '<div class="main-content" id="mainContent"></div>' +
      '<!-- Thread Sidebar -->' +
      '<div class="overlay" id="threadsOverlay">' +
        '<div class="overlay-panel">' +
          '<div class="thread-sidebar-header"><span class="panel-title" style="margin:0;">Conversations</span><button class="thread-new-btn" id="sidebarNewBtn">+ New</button></div>' +
          '<div class="thread-list" id="threadList"></div>' +
          '<div class="thread-sidebar-footer">' +
            '<button class="thread-footer-btn" id="sidebarDashBtn"><span>⌂</span> Dashboard</button>' +
            '<button class="thread-footer-btn" id="sidebarSettingsBtn"><span>⚙</span> Settings</button>' +
          '</div>' +
        '</div><div class="overlay-close" id="threadsClose"></div></div>' +
      '<!-- Settings Overlay -->' +
      '<div class="overlay" id="settingsOverlay">' +
        '<div class="overlay-close" id="settingsClose"></div>' +
        '<div class="overlay-panel right">' +
          '<div class="settings-header">' +
            '<div class="panel-title">Settings</div>' +
            '<div class="tabs">' +
              '<div class="tab active" data-tab="profile">Profile</div>' +
              '<div class="tab" data-tab="credentials">Keys</div>' +
              '<div class="tab" data-tab="telegram">Telegram</div>' +
              '<div class="tab" data-tab="features">Features</div>' +
              '<div class="tab" data-tab="schedules">Tasks</div>' +
              '<div class="tab" data-tab="memory">Memory</div>' +
              '<div class="tab" data-tab="errors">Errors</div>' +
            '</div>' +
          '</div>' +
          '<div class="settings-scroll" id="settingsContent"></div>' +
        '</div></div>';

    // Event listeners
    document.getElementById('threadsBtn').onclick = function() { toggleOverlay('threadsOverlay'); };
    document.getElementById('threadsClose').onclick = function() { toggleOverlay(null); };
    document.getElementById('dashBtn').onclick = function() { state.view = 'dashboard'; state.activeThreadId = null; renderView(); };
    document.getElementById('newThreadBtn').onclick = startNewThread;
    document.getElementById('exportBtn').onclick = exportChat;
    document.getElementById('settingsBtn').onclick = function() { closeNotifDropdown(); toggleOverlay('settingsOverlay'); renderSettingsTab(); };
    document.getElementById('settingsClose').onclick = function() { toggleOverlay(null); };
    document.getElementById('sidebarNewBtn').onclick = function() { toggleOverlay(null); startNewThread(); };
    document.getElementById('sidebarDashBtn').onclick = function() { toggleOverlay(null); state.view = 'dashboard'; state.activeThreadId = null; renderView(); };
    document.getElementById('sidebarSettingsBtn').onclick = function() { toggleOverlay('settingsOverlay'); renderSettingsTab(); };

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

    $$('.tab').forEach(function(tab) {
      tab.onclick = function() {
        $$('.tab').forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        state.settingsTab = tab.dataset.tab;
        renderSettingsTab();
      };
    });

    loadAssistantName();
    loadNotificationCount();
    // Poll notification count every 60s
    setInterval(loadNotificationCount, 60000);
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
    } else {
      if (exp) exp.style.display = 'inline-block';
      renderChatView(mc);
    }
  }

  // ============================================================
  // DASHBOARD
  // ============================================================

  async function renderDashboard(container) {
    container.innerHTML = '<div class="chat-area"><div class="dashboard" id="dashContent"><div style="color:var(--text-muted);font-size:13px;">Loading dashboard...</div></div></div>';
    try {
      var data = await api('/chat/dashboard');
      var dc = document.getElementById('dashContent');
      if (!dc) return;
      var userName = state.session && state.session.user ? state.session.user.name : '';
      var hour = new Date().getHours();
      var greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

      var html = '<div class="dash-greeting">' + greeting + (userName ? ', ' + escapeHtml(userName.split(' ')[0]) : '') + '</div>' +
        '<div class="dash-subtitle">Here\\u2019s what\\u2019s happening with ' + escapeHtml(state.assistantName || 'Karna') + '</div>';

      // Status cards — each card navigates to its feature
      html += '<div class="dash-cards">';
      html += '<div class="dash-card" onclick="showConversations()"><div class="dash-card-icon">&#128172;</div><div class="dash-card-value">' + (data.threads || 0) + '</div><div class="dash-card-label">Conversations</div></div>';
      html += '<div class="dash-card" onclick="toggleOverlay(\\'settingsOverlay\\');state.settingsTab=\\'schedules\\';renderSettingsTab();"><div class="dash-card-icon">&#9200;</div><div class="dash-card-value">' + (data.active_schedules || 0) + '</div><div class="dash-card-label">Active Tasks</div></div>';
      html += '<div class="dash-card" onclick="toggleOverlay(\\'settingsOverlay\\');state.settingsTab=\\'memory\\';renderSettingsTab();"><div class="dash-card-icon">&#129504;</div><div class="dash-card-value">' + (data.memories || 0) + '</div><div class="dash-card-label">Memories</div></div>';
      html += '<div class="dash-card" id="dashGmailCard" onclick="dashGmailClick()"><div class="dash-card-icon">&#9993;</div><div class="dash-card-value" id="dashGmailCount"><span style=\\'color:var(--text-muted);font-size:13px;\\'>...</span></div><div class="dash-card-label">Unread Gmail</div></div>';
      if (data.errors > 0) {
        html += '<div class="dash-card" style="border-color:rgba(238,85,85,0.3);" onclick="toggleOverlay(\\'settingsOverlay\\');state.settingsTab=\\'errors\\';renderSettingsTab();"><div class="dash-card-icon">&#9888;</div><div class="dash-card-value" style="color:var(--danger);">' + data.errors + '</div><div class="dash-card-label">Errors</div></div>';
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
          if (th.last_message) { html += '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(th.last_message.substring(0, 80)) + '</div>'; }
          html += '</div>';
        }
        html += '</div>';
      }

      html += '<div style="margin-top:28px;text-align:center;"><button class="btn btn-small" style="width:auto;padding:10px 28px;" onclick="startNewThread()">Start new conversation</button></div>';
      dc.innerHTML = html;

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
        '<div style="flex:1;display:flex;flex-direction:column;">' +
          '<div id="fileChips" style="display:none;flex-wrap:wrap;gap:4px;margin-bottom:4px;"></div>' +
          '<textarea class="input-field" id="inputField" placeholder="Type something..." rows="2"></textarea>' +
        '</div>' +
        '<div class="input-actions">' +
          '<button class="input-btn" id="attachBtn" title="Attach file">&#128206;</button>' +
          '<button class="input-btn send-btn" id="sendBtn" title="Send">&#10148;</button>' +
        '</div>' +
      '</div></div>';

    var input = document.getElementById('inputField');
    input.onkeydown = function(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
    input.oninput = function() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, window.innerHeight * 0.4) + 'px'; };
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
          if (uploadData.file_id) {
            fileInfo.push({ file_id: uploadData.file_id, name: uploadData.name, type: uploadData.type, size: uploadData.size, text_preview: uploadData.text_preview || '' });
          }
        } catch(ue) {
          addMessage('assistant', 'Failed to upload ' + files[fi].name + ': ' + ue.message, 'error');
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
          ctx.streamingText.innerHTML = '<span style="color:var(--danger)">' + escapeHtml(data.error || 'An error occurred') + '</span>';
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
      'drive_upload': 'Uploading to Drive',
      'store_memory': 'Saving Memory',
      'search_memory': 'Searching Memory',
      'create_schedule': 'Creating Schedule',
      'list_schedules': 'Listing Schedules',
      'browse_web': 'Browsing Web',
      'check_gmail': 'Checking Gmail',
      'check_outlook_mail': 'Checking Outlook',
      'check_outlook_calendar': 'Checking Outlook Calendar',
      'suggest_feature': 'Suggesting Feature',
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
        group.innerHTML = '<div class="msg-assistant">' + md(content) + '<br><br><button class="btn btn-small" onclick="toggleOverlay(\\'settingsOverlay\\');state.settingsTab=\\'credentials\\';renderSettingsTab();">Open Settings</button></div>';
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
      if (groups.today.length > 0) { html += '<div class="thread-section-label">Today</div>'; html += renderThreadGroup(groups.today); }
      if (groups.yesterday.length > 0) { html += '<div class="thread-section-label">Yesterday</div>'; html += renderThreadGroup(groups.yesterday); }
      if (groups.older.length > 0) { html += '<div class="thread-section-label">Older</div>'; html += renderThreadGroup(groups.older); }
      html += '<div style="padding:16px 14px;"><a href="#" onclick="loadArchivedThreads();return false;" style="color:var(--text-muted);font-size:12px;">View archived conversations</a></div>';
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
      html += '<div class="thread-item' + (isActive ? ' active' : '') + '" onclick="openThread(' + t.id + ',\\'' + escapeHtml(t.title).replace(/'/g, "\\\\'") + '\\')">';
      html += '<div class="thread-item-title">' + escapeHtml(t.title) + '</div>';
      if (t.last_message) { html += '<div class="thread-item-preview">' + escapeHtml(t.last_message.substring(0, 60)) + '</div>'; }
      html += '<div class="thread-item-meta"><span>' + (t.message_count || 0) + ' msgs</span><span>' + formatRelativeDate(t.updated_at) + '</span></div>';
      html += '<div class="thread-item-actions">';
      html += '<button class="thread-action-btn" onclick="event.stopPropagation();archiveThread(' + t.id + ')" title="Archive">&#128230;</button>';
      html += '<button class="thread-action-btn danger" onclick="event.stopPropagation();deleteThread(' + t.id + ')" title="Delete">&#128465;</button>';
      html += '</div></div>';
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
    await api('/chat/threads/' + id, { method:'DELETE' });
    if (state.activeThreadId === id) { state.activeThreadId = null; state.view = 'dashboard'; renderView(); }
    loadThreadSidebar();
    showToast('Conversation deleted', '');
  }

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
        html += '<div class="notif-item' + (isUnread ? ' unread' : '') + '" data-notif-id="' + n.id + '" data-notif-unread="' + (isUnread ? '1' : '0') + '">';
        html += '<div class="notif-item-title">' + typeIcon + ' ' + escapeHtml(n.title) + '</div>';
        if (n.body) { var plain = mdToPlain(n.body); html += '<div class="notif-item-body">' + escapeHtml(plain.length > 200 ? plain.substring(0, 200) + '…' : plain) + '</div>'; }
        html += '<div class="notif-item-time">' + formatRelativeDate(n.created_at) + '</div>';
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
    } catch(e) {
      list.innerHTML = '<div class="notif-empty" style="color:var(--danger);">Failed to load notifications.</div>';
    }
  }

  async function markAllNotificationsRead() {
    await api('/chat/notifications/read-all', { method:'PUT' });
    loadNotificationCount();
    loadNotifications();
    showToast('All notifications marked read', 'success');
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

  async function renderSettingsTab() {
    var content = document.getElementById('settingsContent');
    if (!content) return;

    // Sync active tab underline with state.settingsTab
    $$('.tab').forEach(function(t) {
      if (t.dataset.tab === state.settingsTab) { t.classList.add('active'); }
      else { t.classList.remove('active'); }
    });

    try {
      switch (state.settingsTab) {
        case 'profile': return await renderProfileTab(content);
        case 'credentials': return await renderCredentialsTab(content);
        case 'telegram': return await renderTelegramTab(content);
        case 'features': return await renderFeaturesTab(content);
        case 'schedules': return await renderSchedulesTab(content);
        case 'memory': return await renderMemoryTab(content);
        case 'errors': return await renderErrorsTab(content);
      }
    } catch(err) {
      content.innerHTML = '<div style="color:var(--danger);font-size:13px;padding:12px;">Error: ' + (err.message || 'Unknown') + '<br><button class="btn btn-small btn-danger" style="margin-top:12px;" onclick="clearSession();render();">Logout</button></div>';
    }
  }

  async function renderProfileTab(container) {
    var data = await api('/settings/profile');
    if (data.error) { container.innerHTML = '<div style="color:var(--danger);font-size:13px;">Profile error: ' + escapeHtml(data.error) + '<br><button class="btn btn-small btn-danger" onclick="clearSession();render();">Logout</button></div>'; return; }
    container.innerHTML = '<div class="field"><label>Name</label><input type="text" id="profName" value="' + escapeHtml(data.name || '') + '"></div>' +
      '<div class="field"><label>Role</label><input type="text" id="profRole" value="' + escapeHtml(data.role || '') + '"></div>' +
      '<div class="field"><label>Assistant Name</label><input type="text" id="profAssistantName" value="' + escapeHtml(data.assistant_name || 'Karna') + '" placeholder="What should your assistant be called?"><div style="font-size:11px;color:var(--text-muted);margin-top:4px;">The name your assistant uses.</div></div>' +
      '<div class="field"><label>Telegram Chat ID</label><input type="text" id="profTelegram" value="' + escapeHtml(data.telegram_chat_id || '') + '" placeholder="Your Telegram chat ID"><div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Get this by messaging @userinfobot on Telegram, or use /start with your bot.</div></div>' +
      '<div class="field"><label>Timezone</label><select id="profTimezone"><option value="Asia/Kolkata"' + (data.timezone==='Asia/Kolkata'?' selected':'') + '>Asia/Kolkata (IST)</option><option value="America/New_York"' + (data.timezone==='America/New_York'?' selected':'') + '>America/New_York (EST)</option><option value="Europe/London"' + (data.timezone==='Europe/London'?' selected':'') + '>Europe/London (GMT)</option><option value="UTC"' + (data.timezone==='UTC'?' selected':'') + '>UTC</option></select></div>' +
      '<div class="field"><label>Personality Instructions</label><textarea id="profPersonality" rows="4" placeholder="Describe personality, tone, style...">' + escapeHtml(data.personality_prompt || '') + '</textarea></div>' +
      '<button class="btn" id="profSave">Save Profile</button><div id="profMsg" class="success-text"></div>' +
      '<div style="margin-top:24px;border-top:1px solid var(--border);padding-top:16px;"><button class="btn btn-danger btn-small" id="logoutBtn">Logout</button></div>';
    document.getElementById('profSave').onclick = async function() {
      await api('/settings/profile', { method:'PUT', body:JSON.stringify({
        name: document.getElementById('profName').value.trim(),
        role: document.getElementById('profRole').value.trim(),
        assistant_name: document.getElementById('profAssistantName').value.trim() || 'Karna',
        telegram_chat_id: document.getElementById('profTelegram').value.trim(),
        timezone: document.getElementById('profTimezone').value,
        personality_prompt: document.getElementById('profPersonality').value.trim(),
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
      { title:'BROWSER AUTOMATION', desc:'Steel.dev + Browser Use for Outlook and web automation.', items:[
        {key:'steel_api_key',label:'Steel.dev API Key',placeholder:'steel_...'},
        {key:'browser_use_api_key',label:'Browser Use API Key',placeholder:'bu_...'}
      ]},
      { title:'GOOGLE WORKSPACE', desc:'OAuth 2.0 for Sheets, Calendar, Docs, Drive, and Gmail.', items:[], custom_after:'google_oauth_section' },
      { title:'GOOGLE API KEY', desc:'Maps, Places, Directions, Translate, YouTube.', items:[
        {key:'google_api_key',label:'Google API Key',placeholder:'AIzaSy...'}
      ]},
      { title:'OUTLOOK \\u2014 PRIMARY', desc:'Primary Outlook account for browser automation.', items:[
        {key:'outlook_email',label:'Outlook Email',placeholder:'you@org.com'},
        {key:'outlook_password',label:'Outlook Password',placeholder:'Password',isPassword:true}
      ]},
      { title:'OUTLOOK \\u2014 SECONDARY', desc:'Optional second Outlook account.', items:[
        {key:'outlook_email_2',label:'Outlook Email (2nd)',placeholder:'you@personal.com'},
        {key:'outlook_password_2',label:'Outlook Password (2nd)',placeholder:'Password',isPassword:true}
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
          html += '<div style="font-size:11px;color:var(--text-muted);margin:8px 0 12px;padding:10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid var(--border);line-height:1.6;">';
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
        html += '<button class="btn btn-small" id="googleConnectBtn" onclick="connectGoogleAccount()" style="background:var(--accent);color:#0a0a0a;font-weight:600;">Connect Google Account</button>';
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

  async function connectGoogleAccount() {
    try {
      var data = await api('/settings/google/auth-url');
      if (data.error) { var r = document.getElementById('googleTestResult'); if (r) { r.style.color = 'var(--danger)'; r.textContent = data.error; } return; }
      var popup = window.open(data.auth_url, 'google_oauth', 'width=600,height=700,scrollbars=yes');
      window.addEventListener('message', function handler(e) {
        if (e.data && e.data.type === 'google_oauth_complete') {
          window.removeEventListener('message', handler);
          if (e.data.success) { loadGoogleStatus(); showToast('Google connected: ' + e.data.email, 'success'); }
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
    showToast('Google disconnected', '');
  }

  async function saveCred(service) {
    var input = document.getElementById('cred_' + service);
    if (!input || !input.value.trim()) return;
    await api('/settings/credentials', { method:'PUT', body:JSON.stringify({service:service, value:input.value.trim()}) });
    input.value = '';
    renderSettingsTab();
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
    renderSettingsTab();
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
    renderSettingsTab();
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
    html += '<span class="tag" style="' + (webhookStatus.configured ? 'background:rgba(79,209,197,0.2);color:var(--accent);' : '') + '">' + (webhookStatus.configured ? 'configured' : 'not set') + '</span></div>';
    html += '<div class="item-card-body" style="margin-top:4px;">Create a bot with <a href="https://t.me/BotFather" target="_blank" style="color:var(--accent);">@BotFather</a> on Telegram. Use /newbot, give it a name, then copy the token here (Settings \\u2192 Keys \\u2192 Telegram Bot Token).</div></div>';
    
    // Step 2: Chat ID — with auto-detect
    html += '<div class="item-card"><div class="item-card-header"><span class="item-card-title">Step 2: Chat ID</span>';
    html += '<span class="tag" style="' + (chatId ? 'background:rgba(79,209,197,0.2);color:var(--accent);' : '') + '">' + (chatId ? chatId : 'not set') + '</span></div>';
    html += '<div class="item-card-body" style="margin-top:4px;"><strong>Easiest way:</strong> Send any message to your bot on Telegram, then click the button below.</div>';
    html += '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">';
    html += '<button class="btn btn-small" id="detectChatIdBtn" onclick="detectTelegramChatId()" style="background:var(--accent);color:#0a0a0a;font-weight:600;">\\ud83d\\udd0d Detect My Chat ID</button>';
    html += '</div>';
    html += '<div id="detectChatIdMsg" style="font-size:12px;margin-top:8px;line-height:1.5;"></div>';
    html += '<div style="font-size:11px;color:var(--text-muted);margin-top:8px;line-height:1.5;">Or manually: message <a href="https://t.me/userinfobot" target="_blank" style="color:var(--accent);">@userinfobot</a> on Telegram to get your ID, then set it in Settings \\u2192 Profile.</div></div>';
    
    // Step 3: Webhook
    html += '<div class="item-card"><div class="item-card-header"><span class="item-card-title">Step 3: Webhook</span>';
    if (webhookStatus.has_webhook) {
      html += '<span class="tag" style="background:rgba(79,209,197,0.2);color:var(--accent);">active</span></div>';
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
    setTimeout(function() { renderSettingsTab(); }, 2000);
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
    setTimeout(function() { renderSettingsTab(); }, 2000);
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
        setTimeout(function() { renderSettingsTab(); }, 2000);
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
  // FEATURES TAB (Self-building)
  // ============================================================

  async function renderFeaturesTab(container) {
    container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">Loading features...</div>';
    var data = await api('/settings/features');
    var features = data.features || [];
    
    var html = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:12px;line-height:1.6;">Karna can suggest its own improvements. Features proposed during conversation appear here. You can approve, reject, or propose your own.</div>';
    
    // Propose button
    html += '<div style="margin-bottom:16px;"><button class="btn btn-small" onclick="showProposeFeatureForm()" id="proposeBtn" style="background:var(--accent);color:#0a0a0a;font-weight:600;">+ Propose Feature</button></div>';
    html += '<div id="proposeForm" style="display:none;margin-bottom:16px;padding:12px;border:1px solid var(--border);border-radius:8px;">';
    html += '<div class="field"><label>Title</label><input type="text" id="propTitle" placeholder="Feature title"></div>';
    html += '<div class="field"><label>Description</label><textarea id="propDesc" rows="3" placeholder="What should it do?"></textarea></div>';
    html += '<div style="display:flex;gap:8px;"><select id="propPriority" style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:14px;"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option></select>';
    html += '<select id="propCategory" style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:14px;"><option value="general">General</option><option value="tool">Tool</option><option value="ui">UI</option><option value="integration">Integration</option><option value="performance">Performance</option><option value="security">Security</option></select></div>';
    html += '<div style="margin-top:10px;display:flex;gap:8px;"><button class="btn btn-small" onclick="submitFeature()">Submit</button><button class="btn btn-small btn-danger" onclick="document.getElementById(\\'proposeForm\\').style.display=\\'none\\'">Cancel</button></div></div>';
    
    // Stats
    var statusCounts = {};
    features.forEach(function(f) { statusCounts[f.status] = (statusCounts[f.status] || 0) + 1; });
    if (features.length > 0) {
      html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">';
      var parts = [];
      if (statusCounts.proposed) parts.push('\\ud83d\\udca1 ' + statusCounts.proposed + ' proposed');
      if (statusCounts.approved) parts.push('\\u2705 ' + statusCounts.approved + ' approved');
      if (statusCounts.in_progress) parts.push('\\ud83d\\udd27 ' + statusCounts.in_progress + ' in progress');
      if (statusCounts.implemented) parts.push('\\ud83c\\udf89 ' + statusCounts.implemented + ' implemented');
      html += parts.join(' \\u00b7 ') + '</div>';
    }
    
    // Feature list
    if (features.length === 0) {
      html += '<div style="color:var(--text-muted);font-size:13px;padding:20px 0;text-align:center;">No feature requests yet.<br>Ask Karna to suggest improvements, or propose your own above.</div>';
    } else {
      for (var i = 0; i < features.length; i++) {
        var f = features[i];
        var statusColors = { proposed:'var(--warning)', approved:'var(--accent)', rejected:'var(--danger)', in_progress:'#63b3ed', implemented:'var(--success)', deferred:'var(--text-muted)' };
        var sc = statusColors[f.status] || 'var(--text-muted)';
        html += '<div class="item-card"><div class="item-card-header">';
        html += '<span class="item-card-title">' + escapeHtml(f.title) + '</span>';
        html += '<div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;">';
        html += '<span class="tag" style="color:' + sc + ';border:1px solid ' + sc + '33;background:transparent;">' + f.status + '</span>';
        html += '<span class="tag">' + f.priority + '</span>';
        html += '<span class="tag" style="background:rgba(255,255,255,0.04);color:var(--text-muted);">' + (f.proposed_by === 'assistant' ? '\\ud83e\\udd16 karna' : '\\ud83d\\udc64 you') + '</span>';
        html += '</div></div>';
        html += '<div class="item-card-body" style="margin-top:4px;">' + escapeHtml(f.description) + '</div>';
        if (f.rationale) { html += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-style:italic;">' + escapeHtml(f.rationale) + '</div>'; }
        if (f.implementation_notes) { html += '<div style="font-size:11px;color:var(--accent);margin-top:4px;">Notes: ' + escapeHtml(f.implementation_notes) + '</div>'; }
        html += '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;">';
        if (f.status === 'proposed') {
          html += '<button class="btn btn-small" style="color:var(--accent);" onclick="updateFeature(' + f.id + ',\\'approved\\')">Approve</button>';
          html += '<button class="btn btn-small btn-danger" onclick="updateFeature(' + f.id + ',\\'rejected\\')">Reject</button>';
          html += '<button class="btn btn-small" style="color:var(--text-muted);" onclick="updateFeature(' + f.id + ',\\'deferred\\')">Defer</button>';
        }
        if (f.status === 'approved') {
          html += '<button class="btn btn-small" style="color:#63b3ed;" onclick="updateFeature(' + f.id + ',\\'in_progress\\')">Mark In Progress</button>';
        }
        if (f.status === 'in_progress') {
          html += '<button class="btn btn-small" style="color:var(--success);" onclick="updateFeature(' + f.id + ',\\'implemented\\')">Mark Implemented</button>';
        }
        html += '<button class="btn btn-small btn-danger" onclick="deleteFeature(' + f.id + ')">\\u00d7</button>';
        html += '</div></div>';
      }
    }
    
    container.innerHTML = html;
  }

  function showProposeFeatureForm() {
    var form = document.getElementById('proposeForm');
    if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }

  async function submitFeature() {
    var title = document.getElementById('propTitle').value.trim();
    var desc = document.getElementById('propDesc').value.trim();
    if (!title || !desc) { showToast('Title and description required', 'error'); return; }
    await api('/settings/features', { method:'POST', body:JSON.stringify({
      title: title,
      description: desc,
      priority: document.getElementById('propPriority').value,
      category: document.getElementById('propCategory').value,
    })});
    showToast('Feature proposed', 'success');
    renderSettingsTab();
  }

  async function updateFeature(id, status) {
    await api('/settings/features/' + id, { method:'PUT', body:JSON.stringify({status:status}) });
    renderSettingsTab();
  }

  async function deleteFeature(id) {
    await api('/settings/features/' + id, { method:'DELETE' });
    renderSettingsTab();
  }

  // ============================================================
  // REMAINING SETTINGS TABS
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
        '<div class="item-card-body">' + (job.schedule_type==='interval'?'Every '+job.schedule_value+' min':'Daily at '+job.schedule_value) + ' \\u00b7 ' + escapeHtml(job.action_type) + '</div>' +
        (config.description ? '<div class="item-card-meta" style="margin-top:4px">' + escapeHtml(config.description) + '</div>' : '') +
        (job.next_run ? '<div class="item-card-meta">Next: ' + new Date(job.next_run).toLocaleString() + '</div>' : '') +
        (job.last_run ? '<div class="item-card-meta">Last: ' + new Date(job.last_run).toLocaleString() + '</div>' : '') + '</div>';
    }
    container.innerHTML = html;
  }
  async function toggleSchedule(id, enabled) { await api('/settings/schedules/' + id + '/toggle', {method:'PUT',body:JSON.stringify({enabled:enabled})}); }
  async function deleteSchedule(id) { await api('/settings/schedules/' + id, {method:'DELETE'}); renderSettingsTab(); }

  async function renderMemoryTab(container) {
    var data = await api('/settings/memory');
    var memories = data.memories || [];
    if (memories.length === 0) { container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">No memories yet. Important info will be remembered as you chat.</div>'; return; }
    var html = '<div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">Working memory is always in context. Long-term is searched on demand.</div>';
    for (var i = 0; i < memories.length; i++) {
      var m = memories[i];
      var tc = m.tier === 'working' ? 'rgba(79,209,197,0.2)' : 'rgba(255,255,255,0.06)';
      var ttc = m.tier === 'working' ? 'var(--accent)' : 'var(--text-muted)';
      html += '<div class="item-card"><div class="item-card-header"><span class="item-card-title">' + escapeHtml(m.title) + '</span>' +
        '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">' +
        '<span class="tag" style="background:' + tc + ';color:' + ttc + ';">' + (m.tier==='working'?'active':'archive') + '</span>' +
        '<span class="tag">' + m.type + '</span><span class="tag" style="font-size:10px;">\\u2605' + m.importance + '</span>' +
        '<button class="btn btn-small btn-danger" onclick="deleteMemory(' + m.id + ')">\\u00d7</button></div></div>' +
        '<div class="item-card-body">' + escapeHtml(m.content) + '</div></div>';
    }
    container.innerHTML = html;
  }
  async function deleteMemory(id) { await api('/settings/memory/' + id, {method:'DELETE'}); renderSettingsTab(); }

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
  async function clearErrors() { await api('/settings/errors', {method:'DELETE'}); renderSettingsTab(); }

  // === Init ===
  loadSession();
  if (state.session) {
    api('/auth/me').then(function(data) {
      if (data.error) { clearSession(); }
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
  <\/script>
</body>
</html>`}const _t="AES-GCM",br=256;async function da(t){const e=new TextEncoder,a=await crypto.subtle.importKey("raw",e.encode(t.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:e.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},a,{name:_t,length:br},!1,["encrypt","decrypt"])}async function xt(t,e){const a=await da(e),r=crypto.getRandomValues(new Uint8Array(12)),s=new TextEncoder,n=await crypto.subtle.encrypt({name:_t,iv:r},a,s.encode(t)),o=new Uint8Array(r.length+new Uint8Array(n).length);return o.set(r),o.set(new Uint8Array(n),r.length),btoa(String.fromCharCode(...o))}async function U(t,e){const a=await da(e),r=new Uint8Array(atob(t).split("").map(i=>i.charCodeAt(0))),s=r.slice(0,12),n=r.slice(12),o=await crypto.subtle.decrypt({name:_t,iv:s},a,n);return new TextDecoder().decode(o)}async function lt(t){const a=new TextEncoder().encode(t+"karna-pin-salt"),r=await crypto.subtle.digest("SHA-256",a);return btoa(String.fromCharCode(...new Uint8Array(r)))}async function ca(t,e){return await lt(t)===e}const wr=Object.freeze(Object.defineProperty({__proto__:null,decrypt:U,encrypt:xt,hashPin:lt,verifyPin:ca},Symbol.toStringTag,{value:"Module"})),pe=new xe;pe.get("/check",async t=>{const e=await t.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return t.json({hasUsers:((e==null?void 0:e.cnt)||0)>0})});pe.post("/setup",async t=>{const{username:e,name:a,pin:r,personality_prompt:s,timezone:n}=await t.req.json();if(!e||!a||!r)return t.json({error:"Username, name, and PIN are required"},400);if(r.length<4)return t.json({error:"PIN must be at least 4 characters"},400);if(await t.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(e).first())return t.json({error:"Username already taken"},409);const i=await lt(r);await t.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(e,a,i,s||"",n||"Asia/Kolkata").run();const l=await t.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(e).first(),d=crypto.randomUUID(),u=new Date(Date.now()+10080*60*1e3).toISOString();return await t.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(d,l.id,"web",u).run(),t.json({success:!0,sessionId:d,user:{id:l.id,username:l.username,name:l.name}})});pe.post("/login",async t=>{const{username:e,pin:a}=await t.req.json();if(!e||!a)return t.json({error:"Username and PIN required"},400);const r=await t.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(e).first();if(!r)return t.json({error:"User not found"},404);if(!await ca(a,r.pin_hash))return t.json({error:"Invalid PIN"},401);const n=crypto.randomUUID(),o=new Date(Date.now()+10080*60*1e3).toISOString();return await t.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(n,r.id,"web",o).run(),t.json({success:!0,sessionId:n,user:{id:r.id,username:r.username,name:r.name}})});pe.post("/logout",async t=>{var a;const e=(a=t.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");return e&&await t.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(e).run(),t.json({success:!0})});pe.get("/users/hints",async t=>{const a=((await t.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(r=>{var s;return{username:r.username,name_hint:r.name.split(" ")[0],created:((s=r.created_at)==null?void 0:s.split(" ")[0])||""}});return t.json({users:a,count:a.length})});pe.post("/reset-pin",async t=>{var i;const{username:e,name:a,new_pin:r}=await t.req.json();if(!e||!a||!r)return t.json({error:"Username, display name, and new PIN are required"},400);if(r.length<4)return t.json({error:"PIN must be at least 4 characters"},400);const s=await t.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(e).first();if(!s)return t.json({error:"User not found"},404);if(s.name.toLowerCase().trim()!==a.toLowerCase().trim())return t.json({error:"Display name does not match. This is required for identity verification."},403);const n=await lt(r);await t.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,s.id).run();const o=await t.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(s.id).run();return await t.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(s.id).run(),t.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((i=o.meta)==null?void 0:i.changes)||0})});pe.get("/me",async t=>{var r;const e=(r=t.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!e)return t.json({error:"No session"},401);const a=await t.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();return a?t.json({user:{id:a.uid,username:a.username,name:a.name,role:a.role,timezone:a.timezone}}):t.json({error:"Invalid or expired session"},401)});const qe={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},Dt=100,At=5e5;class ua{constructor(e,a){this.db=e,this.userId=a}getToday(){return new Date().toISOString().split("T")[0]}async checkCaps(){const e=this.getToday(),a=await this.db.prepare(`SELECT COALESCE(SUM(tokens_used), 0) as total_tokens, COALESCE(SUM(request_count), 0) as total_requests 
       FROM provider_usage WHERE user_id = ? AND usage_date = ?`).bind(this.userId,e).first(),r=(a==null?void 0:a.total_tokens)||0,s=(a==null?void 0:a.total_requests)||0,n=await this.getCap("daily_tokens")||At,o=await this.getCap("daily_requests")||Dt;return r>=n?{allowed:!1,reason:`Daily token limit reached (${r.toLocaleString()}/${n.toLocaleString()}). Resets at midnight.`}:s>=o?{allowed:!1,reason:`Daily request limit reached (${s}/${o}). Resets at midnight.`}:{allowed:!0}}async getCap(e){const a=this.getToday(),r=await this.db.prepare("SELECT daily_limit FROM usage_caps WHERE user_id = ? AND cap_type = ? AND usage_date = ?").bind(this.userId,e,a).first();return(r==null?void 0:r.daily_limit)||null}async getUsageSummary(){const e=this.getToday(),a=await this.db.prepare(`SELECT COALESCE(SUM(tokens_used), 0) as total_tokens, COALESCE(SUM(request_count), 0) as total_requests 
       FROM provider_usage WHERE user_id = ? AND usage_date = ?`).bind(this.userId,e).first(),r=await this.getCap("daily_tokens")||At,s=await this.getCap("daily_requests")||Dt;return`Today: ${((a==null?void 0:a.total_tokens)||0).toLocaleString()}/${r.toLocaleString()} tokens, ${(a==null?void 0:a.total_requests)||0}/${s} requests`}}async function S(t,e,a,r,s,n={}){try{await t.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(e,a,r,s,JSON.stringify(n)).run()}catch(o){console.error("Failed to log error:",o)}}class pa{constructor(e,a="claude-sonnet-4-20250514",r="https://api.anthropic.com",s="anthropic"){E(this,"name");E(this,"apiKey");E(this,"model");E(this,"apiBase");this.apiKey=e,this.model=a,this.apiBase=r,this.name=s}async chat(e,a){var u,h,y,f;const r=e.find(b=>b.role==="system"),s=e.filter(b=>b.role!=="system"),n={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:s.map(b=>({role:b.role,content:b.content}))};r&&(n.system=r.content),a!=null&&a.tools&&a.tools.length>0&&(n.tools=a.tools.map(b=>({name:b.name,description:b.description,input_schema:b.parameters})));const o=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(n)});if(!o.ok){const b=await o.text();throw new Error(this.name+" API error "+o.status+": "+b)}const i=await o.json(),l=((u=i.content)==null?void 0:u.filter(b=>b.type==="text"))||[],d=((h=i.content)==null?void 0:h.filter(b=>b.type==="tool_use"))||[];return{content:l.map(b=>b.text).join(`
`),toolCalls:d.map(b=>({id:b.id,name:b.name,arguments:b.input})),usage:{promptTokens:((y=i.usage)==null?void 0:y.input_tokens)||0,completionTokens:((f=i.usage)==null?void 0:f.output_tokens)||0}}}async streamChat(e,a){const r=e.find(d=>d.role==="system"),s=e.filter(d=>d.role!=="system"),n={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:s.map(d=>({role:d.role,content:d.content}))};r&&(n.system=r.content);const o=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(n)});if(!o.ok){const d=await o.text();throw new Error(this.name+" stream error "+o.status+": "+d)}const i=o.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(d){var b;const{done:u,value:h}=await i.read();if(u){d.close();return}const f=l.decode(h,{stream:!0}).split(`
`);for(const _ of f)if(_.startsWith("data: ")){const x=_.slice(6);if(x==="[DONE]")continue;try{const c=JSON.parse(x);c.type==="content_block_delta"&&((b=c.delta)!=null&&b.text)&&d.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:c.delta.text})+`

`))}catch{}}}})}}function _r(t){const e={},a=t||{};if(e.type=a.type||"object",e.type==="object"){const r=a.properties;if(r&&typeof r=="object"&&Object.keys(r).length>0){const s={};for(const[n,o]of Object.entries(r))o&&typeof o=="object"?s[n]=ft(o):s[n]=o;e.properties=s}else e.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(a.required)?e.required=a.required:e.required=[]}return a.description&&(e.description=a.description),e}function ft(t){const e={...t};if(e.type||(e.type="string"),e.type==="object"){const a=e.properties;if(a&&typeof a=="object"&&Object.keys(a).length>0){const r={};for(const[s,n]of Object.entries(a))n&&typeof n=="object"?r[s]=ft(n):r[s]=n;e.properties=r}else e.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(e.required)||(e.required=[])}return e.type==="array"&&e.items?typeof e.items=="object"&&(e.items=ft(e.items)):e.type==="array"&&!e.items&&(e.items={type:"string"}),e}class ma{constructor(e,a,r,s){E(this,"name");E(this,"apiKey");E(this,"model");E(this,"apiBase");this.apiKey=e,this.model=a,this.apiBase=r.replace(/\/+$/,""),this.name=s}async chat(e,a){var l,d,u,h,y,f;const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:e.map(b=>({role:b.role,content:b.content}))},s=this.apiBase.includes("routellm.abacus.ai");a!=null&&a.tools&&a.tools.length>0&&!s&&(r.tools=a.tools.map(b=>({type:"function",function:{name:b.name,description:b.description,parameters:_r(b.parameters||{})}})));const n=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)});if(!n.ok){const b=await n.text();throw new Error(this.name+" API error "+n.status+": "+b)}const o=await n.json(),i=(l=o.choices)==null?void 0:l[0];return{content:((d=i==null?void 0:i.message)==null?void 0:d.content)||"",toolCalls:(h=(u=i==null?void 0:i.message)==null?void 0:u.tool_calls)==null?void 0:h.map(b=>({id:b.id,name:b.function.name,arguments:typeof b.function.arguments=="string"?JSON.parse(b.function.arguments||"{}"):b.function.arguments||{}})),usage:{promptTokens:((y=o.usage)==null?void 0:y.prompt_tokens)||0,completionTokens:((f=o.usage)==null?void 0:f.completion_tokens)||0}}}async streamChat(e,a){const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:e.map(i=>({role:i.role,content:i.content}))},s=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)});if(!s.ok){const i=await s.text();throw new Error(this.name+" stream error "+s.status+": "+i)}const n=s.body.getReader(),o=new TextDecoder;return new ReadableStream({async pull(i){var y,f,b;const{done:l,value:d}=await n.read();if(l){i.close();return}const h=o.decode(d,{stream:!0}).split(`
`);for(const _ of h)if(_.startsWith("data: ")){const x=_.slice(6);if(x==="[DONE]")continue;try{const p=(b=(f=(y=JSON.parse(x).choices)==null?void 0:y[0])==null?void 0:f.delta)==null?void 0:b.content;p&&i.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:p})+`

`))}catch{}}}})}}function yt(t,e,a,r){const s=qe[t];if(!s)throw new Error(`Unknown LLM provider: ${t}`);const n=r||s.defaultModel;return s.apiFormat==="anthropic"?new pa(e,n,s.apiBase,a):new ma(e,n,s.apiBase,a)}class ha{constructor(e,a){this.db=e,this.userId=a}getToday(){return new Date().toISOString().split("T")[0]}async getUsageStats(){const e=this.getToday();return(await this.db.prepare("SELECT provider, tokens_used, request_count, last_error, cooldown_until FROM provider_usage WHERE user_id = ? AND usage_date = ?").bind(this.userId,e).all()).results||[]}async pickProvider(e){this.getToday();const a=new Date().toISOString(),r=await this.getUsageStats(),s=new Map;for(const o of r)s.set(o.provider,o);const n=e.filter(o=>{const i=s.get(o);return i?!(i.cooldown_until&&i.cooldown_until>a):!0});return n.length===0?null:(n.sort((o,i)=>{var u,h;const l=((u=s.get(o))==null?void 0:u.tokens_used)||0,d=((h=s.get(i))==null?void 0:h.tokens_used)||0;return l-d}),n[0])}async recordUsage(e,a){const r=this.getToday();await this.db.prepare(`INSERT INTO provider_usage (user_id, provider, tokens_used, request_count, usage_date)
       VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(user_id, provider, usage_date) DO UPDATE SET
         tokens_used = provider_usage.tokens_used + excluded.tokens_used,
         request_count = provider_usage.request_count + 1,
         updated_at = CURRENT_TIMESTAMP`).bind(this.userId,e,a,r).run()}async recordError(e,a,r=5){const s=this.getToday(),n=new Date(Date.now()+r*60*1e3).toISOString();await this.db.prepare(`INSERT INTO provider_usage (user_id, provider, tokens_used, request_count, last_error, cooldown_until, usage_date)
       VALUES (?, ?, 0, 0, ?, ?, ?)
       ON CONFLICT(user_id, provider, usage_date) DO UPDATE SET
         last_error = excluded.last_error,
         cooldown_until = excluded.cooldown_until,
         updated_at = CURRENT_TIMESTAMP`).bind(this.userId,e,a,n,s).run()}async getStatusText(){const e=await this.getUsageStats();if(e.length===0)return"No provider usage recorded today.";const a=new Date().toISOString();return e.map(r=>{const n=r.cooldown_until&&r.cooldown_until>a?"⏸ cooldown":"▶ active";return r.provider+": "+r.tokens_used.toLocaleString()+" tokens / "+r.request_count+" requests ["+n+"]"}).join(`
`)}}const xr=["llm_slot_1","llm_slot_2","llm_slot_3"],Er=["anthropic","openai"];async function Xe(t,e,a){const{decrypt:r}=await Promise.resolve().then(()=>wr),s=new ha(t,e),n=new ua(t,e),o=await n.checkCaps();if(!o.allowed)throw new Error(o.reason||"Daily usage limit reached.");const i=[];for(const f of xr){const b=await t.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(e,f).first();if(b)try{const _=await r(b.encrypted_value,a),x=JSON.parse(_);if(x.provider&&x.apiKey&&qe[x.provider]){const p=x.provider,m=yt(x.provider,x.apiKey,p,x.model);i.push({name:p,provider:m})}}catch(_){console.error(`Failed to load ${f}:`,_)}}const l=new Set(i.map(f=>f.name));for(const f of Er){if(l.has(f))continue;const b=await t.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(e,f).first();if(b)try{const _=await r(b.encrypted_value,a);if(qe[f]){const c=yt(f,_,f);i.push({name:f,provider:c})}}catch{console.error(`Failed to decrypt legacy ${f} key`)}}if(i.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const d=i.map(f=>f.name),u=await s.pickProvider(d);if(!u)return console.warn("All providers in cooldown, using first available"),{provider:i[0].provider,rotation:s,costGuard:n};const h=i.find(f=>f.name===u);return{provider:Tr(h.provider,i,s),rotation:s,costGuard:n}}function Tr(t,e,a){return e.length<=1?t:{name:t.name,async chat(r,s){try{return await t.chat(r,s)}catch(n){const o=n.message||"";if(!(o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")))throw n;console.warn(`Provider ${t.name} auth/billing error, trying fallback...`),await a.recordError(t.name,o,1440);const l=e.filter(d=>d.name!==t.name);for(const d of l)try{const u=await d.provider.chat(r,s);return this.name=d.name,u}catch(u){const h=u.message||"";if(h.includes("401")||h.includes("403")||h.includes("authentication")||h.includes("credit balance")||h.includes("properties field not found")){await a.recordError(d.name,h,1440);continue}throw u}throw new Error(`All LLM providers failed. Primary (${t.name}): ${o.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(r,s){return await t.streamChat(r,s)}}}const nt=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:pa,CostGuard:ua,OpenAICompatibleProvider:ma,ProviderRotation:ha,createProviderFromConfig:yt,createRotatingProvider:Xe,logError:S},Symbol.toStringTag,{value:"Module"})),pt=20,kr=2e3,Sr=2e3,ga=4;function Ir(t){return Math.ceil(t.length/ga)}function $t(t,e){const a=e*ga;return t.length<=a?t:t.slice(0,a)+`
[...truncated to fit token budget]`}class ue{constructor(e){this.db=e}async store(e,a,r,s,n=5,o="working"){const i=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(e,a,r).first();i?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,n,o,i.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(e,a,r,s,n,o).run(),o==="working"&&await this.enforceWorkingMemoryCap(e)}async enforceWorkingMemoryCap(e){const a=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(e).first();if(((a==null?void 0:a.cnt)||0)>pt){const r=((a==null?void 0:a.cnt)||0)-pt;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ? AND tier = 'working' AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' 
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(e,e,r).run()}}async getWorkingMemory(e){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(e,pt).all()).results||[]}async getAll(e,a,r=50){return a?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(e,a,r).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(e,r).all()).results||[]}async search(e,a,r=10){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(e,`%${a}%`,`%${a}%`,r).all()).results||[]}async update(e,a,r){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,e,a).run()}async promote(e,a){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(e,a).run(),await this.enforceWorkingMemoryCap(a)}async demote(e,a){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(e,a).run()}async remove(e,a){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(e,a).run()}async buildContext(e){const a=await this.getWorkingMemory(e);if(a.length===0)return"";const r={};for(const n of a)r[n.type]||(r[n.type]=[]),r[n.type].push(n);let s=`
## Working Memory (Active Context)
`;for(const[n,o]of Object.entries(r)){s+=`
### ${n.charAt(0).toUpperCase()+n.slice(1)}s
`;for(const i of o)s+=`- **${i.title}**: ${i.content}
`}return $t(s,kr)}static truncatePersonality(e){return $t(e,Sr)}async getRecentConversations(e,a=20,r){return r?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(e,r,a).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(e,a).all()).results||[]).reverse()}async storeMessage(e,a,r,s,n="{}",o){const i=Ir(s);o?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(e,a,r,s,n,i,o).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(e,a,r,s,n,i).run()}async compactHistory(e,a=30){const r=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(e).first();((r==null?void 0:r.cnt)||0)<=a*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(e,e,a).run()}}const Ge="https://api.browser-use.com/api/v2",Or="gpt-4o",Cr=4e3,Nt=18e4,fa=50;class Rr{constructor(e){E(this,"apiKey");this.apiKey=e}get headers(){return{"Content-Type":"application/json","X-Browser-Use-API-Key":this.apiKey}}async createSession(e={}){const a=await fetch(`${Ge}/sessions`,{method:"POST",headers:this.headers,body:JSON.stringify({profileId:e.profileId||void 0,keepAlive:e.keepAlive??!0,persistMemory:e.persistMemory??!0})});if(!a.ok){const s=await a.text();throw new Error(`Browser Use session creation failed (${a.status}): ${s}`)}const r=await a.json();return{sessionId:r.id,liveUrl:r.liveUrl||""}}async runTask(e,a={}){const r={task:e,llm:a.llm||Or,maxSteps:a.maxSteps||fa};a.sessionId&&(r.sessionId=a.sessionId),a.startUrl&&(r.startUrl=a.startUrl),a.structuredOutput&&(r.structuredOutput=JSON.stringify(a.structuredOutput));const s=await fetch(`${Ge}/tasks`,{method:"POST",headers:this.headers,body:JSON.stringify(r)});if(!s.ok){const l=await s.text();throw new Error(`Browser Use task creation failed (${s.status}): ${l}`)}const o=(await s.json()).id;if(!o)throw new Error("Browser Use task created but no task ID returned");const i=await this.pollTaskCompletion(o);return{output:i.output||"",steps:i.steps||0,taskId:o}}async pollTaskCompletion(e){var r;const a=Date.now();for(;Date.now()-a<Nt;){const s=await fetch(`${Ge}/tasks/${e}`,{headers:{"X-Browser-Use-API-Key":this.apiKey}});if(!s.ok)throw new Error(`Failed to check task status (${s.status})`);const n=await s.json();if(n.status==="finished"||n.status==="completed")return{output:typeof n.output=="string"?n.output:JSON.stringify(n.output||n.result||""),steps:((r=n.steps)==null?void 0:r.length)||n.stepCount||0};if(n.status==="failed"||n.status==="error"||n.status==="stopped"){const o=n.error||n.message||n.failureReason||"Unknown error";throw new Error(`Browser task ${n.status}: ${o}`)}await new Promise(o=>setTimeout(o,Cr))}throw new Error(`Browser task timed out after ${Nt/1e3}s`)}async stopSession(e){try{await fetch(`${Ge}/sessions/${e}/stop`,{method:"PUT",headers:this.headers})}catch{}}}class se{constructor(e,a){E(this,"db");E(this,"userId");this.db=e,this.userId=a}async getCredential(e,a){const r=await this.db.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(this.userId,e).first();return r?U(r.encrypted_value,a):null}async logTask(e,a,r,s="",n=""){await this.db.prepare("INSERT INTO browser_task_log (user_id, session_id, task_type, task_description, status, result, error) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(this.userId,null,e,a,r,s,n).run()}async getRunner(e){const a=await this.getCredential("browser_use_api_key",e);return a?new Rr(a):null}getOutlookCredKeys(e="primary"){return e==="secondary"?{emailKey:"outlook_email_2",passKey:"outlook_password_2",label:"secondary"}:{emailKey:"outlook_email",passKey:"outlook_password",label:"primary"}}async checkOutlookMail(e,a="primary"){const r=await this.getRunner(e);if(!r)return"Browser Use API key not configured. Add it in Settings → Keys → Browser Automation.";const{emailKey:s,passKey:n,label:o}=this.getOutlookCredKeys(a),i=await this.getCredential(s,e),l=await this.getCredential(n,e);if(!i||!l)return`Outlook ${o} account credentials not configured. Add your email and password in Settings → Keys → Outlook — ${o.toUpperCase()}.`;try{const d=`Go to https://outlook.live.com. Log in with email "${i}" and password "${l}". After logging in, go to the inbox. List the latest 2 emails with: sender name, subject line, date received, and whether it's read or unread. Return as structured text.`,u=await r.runTask(d,{startUrl:"https://outlook.live.com",maxSteps:40});return await this.logTask("check_outlook_mail",`Check Outlook inbox (${o})`,"completed",u.output),u.output||"No output returned from browser agent."}catch(d){return await this.logTask("check_outlook_mail",`Check Outlook inbox (${o})`,"failed","",d.message),await S(this.db,this.userId,"browser","outlook_mail",d.message),`Failed to check Outlook (${o}): ${d.message}`}}async composeDraft(e,a,r,s,n="primary"){const o=await this.getRunner(e);if(!o)return"Browser Use API key not configured.";const{emailKey:i,passKey:l,label:d}=this.getOutlookCredKeys(n),u=await this.getCredential(i,e),h=await this.getCredential(l,e);if(!u||!h)return`Outlook ${d} account credentials not configured.`;try{const y=`Go to https://outlook.live.com. Log in with email "${u}" and password "${h}". After logging in, compose a new email. Set the recipient to "${a}", subject to "${r}", and body to: "${s}". Save it as a draft — do NOT send it. Confirm the draft was saved.`,f=await o.runTask(y,{startUrl:"https://outlook.live.com",maxSteps:40});return await this.logTask("compose_draft",`Draft to ${a}: ${r} (${d})`,"completed",f.output),f.output||"Draft operation completed."}catch(y){return await this.logTask("compose_draft",`Draft to ${a}: ${r} (${d})`,"failed","",y.message),await S(this.db,this.userId,"browser","compose_draft",y.message),`Failed to compose draft (${d}): ${y.message}`}}async checkOutlookCalendar(e,a="primary"){const r=await this.getRunner(e);if(!r)return"Browser Use API key not configured.";const{emailKey:s,passKey:n,label:o}=this.getOutlookCredKeys(a),i=await this.getCredential(s,e),l=await this.getCredential(n,e);if(!i||!l)return`Outlook ${o} account credentials not configured.`;try{const d=`Go to https://outlook.live.com. Log in with email "${i}" and password "${l}". After logging in, navigate to the Calendar view. List all events for today and tomorrow with: event title, time, location (if any), and attendees (if visible). Return as structured text.`,u=await r.runTask(d,{startUrl:"https://outlook.live.com",maxSteps:40});return await this.logTask("check_outlook_calendar",`Check Outlook calendar (${o})`,"completed",u.output),u.output||"No calendar events found."}catch(d){return await this.logTask("check_outlook_calendar",`Check Outlook calendar (${o})`,"failed","",d.message),await S(this.db,this.userId,"browser","outlook_calendar",d.message),`Failed to check calendar (${o}): ${d.message}`}}async checkGmail(e){const a=await this.getRunner(e);if(!a)return"Browser Use API key not configured. Add it in Settings → Keys → Browser Automation.";try{const s=await a.runTask("Go to https://mail.google.com. If a Google sign-in page appears, report that manual login is required. Once inside Gmail inbox, list the 10 most recent emails with: sender name, subject line, snippet/preview, date received, and whether it's read or unread. Return as structured text.",{startUrl:"https://mail.google.com",maxSteps:40});return await this.logTask("check_gmail","Check Gmail inbox","completed",s.output),s.output||"No output returned."}catch(r){return await this.logTask("check_gmail","Check Gmail inbox","failed","",r.message),await S(this.db,this.userId,"browser","gmail_inbox",r.message),`Failed to check Gmail: ${r.message}`}}async composeGmailDraft(e,a,r,s){const n=await this.getRunner(e);if(!n)return"Browser Use API key not configured.";try{const o=await n.runTask(`In Gmail, click Compose. Set the recipient to "${a}", subject to "${r}", and body to: "${s}". Do NOT click Send. Close the compose window so it saves as a draft. Confirm the draft was saved.`,{startUrl:"https://mail.google.com",maxSteps:30});return await this.logTask("compose_gmail_draft",`Gmail draft to ${a}: ${r}`,"completed",o.output),o.output||"Draft operation completed."}catch(o){return await this.logTask("compose_gmail_draft",`Gmail draft to ${a}: ${r}`,"failed","",o.message),await S(this.db,this.userId,"browser","gmail_compose",o.message),`Failed to compose Gmail draft: ${o.message}`}}async searchGmail(e,a){const r=await this.getRunner(e);if(!r)return"Browser Use API key not configured.";try{const s=await r.runTask(`In Gmail, use the search bar to search for: "${a}". List the top 10 results with: sender name, subject line, snippet, and date. Return as structured text.`,{startUrl:"https://mail.google.com",maxSteps:30});return await this.logTask("search_gmail",`Gmail search: ${a}`,"completed",s.output),s.output||"No results found."}catch(s){return await this.logTask("search_gmail",`Gmail search: ${a}`,"failed","",s.message),await S(this.db,this.userId,"browser","gmail_search",s.message),`Failed to search Gmail: ${s.message}`}}async browseWeb(e,a){const r=await this.getRunner(e);if(!r)return"Browser Use API key not configured. Add it in Settings → Keys → Browser Automation.";try{const s=await r.runTask(a,{maxSteps:fa});return await this.logTask("browse_web",a.substring(0,200),"completed",s.output),s.output||"Task completed but no output returned."}catch(s){return await this.logTask("browse_web",a.substring(0,200),"failed","",s.message),await S(this.db,this.userId,"browser","browse_web",s.message),`Browser task failed: ${s.message}`}}async validateSteelKey(e){try{const a=await fetch("https://api.steel.dev/v1/sessions",{method:"POST",headers:{"Content-Type":"application/json","steel-api-key":e},body:JSON.stringify({timeout:3e4})});if(a.ok){const r=await a.json();try{await fetch(`https://api.steel.dev/v1/sessions/${r.id}/release`,{method:"POST",headers:{"steel-api-key":e}})}catch{}return{valid:!0,message:"Steel.dev API key is valid. Session created and released."}}return a.status===401||a.status===403?{valid:!1,message:"Invalid Steel.dev API key. Check your key at app.steel.dev."}:{valid:!1,message:`Steel.dev responded with status ${a.status}.`}}catch(a){return{valid:!1,message:`Connection failed: ${a.message}`}}}async validateBrowserUseKey(e){try{const a=await fetch(`${Ge}/tasks?limit=1`,{headers:{"X-Browser-Use-API-Key":e}});return a.ok?{valid:!0,message:"Browser Use API key is valid."}:a.status===401||a.status===403?{valid:!1,message:"Invalid Browser Use API key. Check your key at cloud.browser-use.com."}:{valid:!1,message:`Browser Use responded with status ${a.status}.`}}catch(a){return{valid:!1,message:`Connection failed: ${a.message}`}}}}const Dr="https://accounts.google.com/o/oauth2/v2/auth",ya="https://oauth2.googleapis.com/token",Ar="https://www.googleapis.com/oauth2/v2/userinfo",$r=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let Y=null;async function vt(t,e,a){const r=await t.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(e,"google_oauth_tokens").first();if(!r)return null;try{const s=await U(r.encrypted_value,a);return JSON.parse(s)}catch{return null}}async function Nr(t,e,a,r){const s=await xt(JSON.stringify(r),a);await t.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(e,s).run()}function va(t,e,a){const r=new URLSearchParams({client_id:t,redirect_uri:e,response_type:"code",scope:$r,access_type:"offline",prompt:"consent",state:a,include_granted_scopes:"true"});return`${Dr}?${r}`}async function ba(t,e,a,r){const s=await fetch(ya,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:t,client_id:e,client_secret:a,redirect_uri:r,grant_type:"authorization_code"})}),n=await s.text();if(!s.ok)throw new Error(`Token exchange failed (${s.status}): ${n.substring(0,300)}`);return JSON.parse(n)}async function Lr(t,e,a){const r=await fetch(ya,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:t,client_id:e,client_secret:a,grant_type:"refresh_token"})}),s=await r.text();if(!r.ok)throw r.status===400||r.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${r.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function wa(t){const e=await fetch(Ar,{headers:{Authorization:`Bearer ${t}`}});if(!e.ok)throw new Error(`Failed to fetch user info: ${e.status}`);return await e.json()}async function Le(t,e,a,r,s){if(!r||!s)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(Y&&Y.userId===e&&Y.expiresAt>Date.now()/1e3+60){const i=await vt(t,e,a);return{token:Y.token,email:(i==null?void 0:i.email)||"unknown"}}const n=await vt(t,e,a);if(!n)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const o=await Lr(n.refresh_token,r,s);return Y={userId:e,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{token:o.access_token,email:n.email}}async function Et(t,e,a){try{const r=await vt(t,e,a);return r?{connected:!0,email:r.email,connectedAt:r.connected_at}:{connected:!1}}catch{return{connected:!1}}}function _a(t,e){return!!(t&&e&&t.includes(".apps.googleusercontent.com"))}async function xa(t,e,a,r,s,n,o){const i=await ba(r,n,o,s);if(!i.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await wa(i.access_token),d={refresh_token:i.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await Nr(t,e,a,d),Y={userId:e,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{email:l.email,name:l.name}}async function Ea(t,e){await t.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(e).run(),(Y==null?void 0:Y.userId)===e&&(Y=null)}const Be="https://sheets.googleapis.com/v4/spreadsheets";class Ta{constructor(e,a,r,s,n){this.db=e,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:e}=await Le(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async readRange(e,a){const r=await this.authHeaders(),s=encodeURIComponent(a),n=await fetch(`${Be}/${e}/values/${s}`,{headers:r});if(!n.ok){const i=await n.text();throw new Error(`Sheets read failed (${n.status}): ${i}`)}return(await n.json()).values||[]}async writeRange(e,a,r){const s=await this.authHeaders(),n=encodeURIComponent(a),o=await fetch(`${Be}/${e}/values/${n}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:s,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!o.ok){const l=await o.text();throw new Error(`Sheets write failed (${o.status}): ${l}`)}return{updatedCells:(await o.json()).updatedCells||0}}async appendRows(e,a,r){var l;const s=await this.authHeaders(),n=encodeURIComponent(a),o=await fetch(`${Be}/${e}/values/${n}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:s,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!o.ok){const d=await o.text();throw new Error(`Sheets append failed (${o.status}): ${d}`)}return{updatedCells:((l=(await o.json()).updates)==null?void 0:l.updatedCells)||r.length}}async createSpreadsheet(e,a){const r=await this.authHeaders(),s={properties:{title:e},sheets:a&&a.length>0?a.map(i=>({properties:{title:i}})):[{properties:{title:"Sheet1"}}]},n=await fetch(Be,{method:"POST",headers:r,body:JSON.stringify(s)});if(!n.ok){const i=await n.text();throw new Error(`Sheets create failed (${n.status}): ${i}`)}const o=await n.json();return{spreadsheetId:o.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${o.spreadsheetId}/edit`}}async getMetadata(e){const a=await this.authHeaders(),r=await fetch(`${Be}/${e}?fields=properties.title,sheets.properties.title`,{headers:a});if(!r.ok){const n=await r.text();throw new Error(`Sheets metadata failed (${r.status}): ${n}`)}const s=await r.json();return{title:s.properties.title,sheets:s.sheets.map(n=>n.properties.title)}}}const Pe="https://www.googleapis.com/calendar/v3";class ka{constructor(e,a,r,s,n){this.db=e,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:e}=await Le(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async listEvents(e="primary",a={}){const r=await this.authHeaders(),s=new URLSearchParams;a.timeMin&&s.set("timeMin",a.timeMin),a.timeMax&&s.set("timeMax",a.timeMax),s.set("maxResults",String(a.maxResults||20)),s.set("singleEvents","true"),s.set("orderBy","startTime"),a.query&&s.set("q",a.query);const n=await fetch(`${Pe}/calendars/${encodeURIComponent(e)}/events?${s}`,{headers:r});if(!n.ok){const i=await n.text();throw new Error(`Calendar list failed (${n.status}): ${i}`)}return(await n.json()).items||[]}async createEvent(e="primary",a){var i;const r=await this.authHeaders(),s=a.timeZone||"Asia/Kolkata",n={summary:a.summary,description:a.description||"",location:a.location||"",start:{dateTime:a.startDateTime,timeZone:s},end:{dateTime:a.endDateTime,timeZone:s}};(i=a.attendees)!=null&&i.length&&(n.attendees=a.attendees.map(l=>({email:l})));const o=await fetch(`${Pe}/calendars/${encodeURIComponent(e)}/events`,{method:"POST",headers:r,body:JSON.stringify(n)});if(!o.ok){const l=await o.text();throw new Error(`Calendar create failed (${o.status}): ${l}`)}return await o.json()}async updateEvent(e="primary",a,r){const s=await this.authHeaders(),n=r.timeZone||"Asia/Kolkata",o={};r.summary&&(o.summary=r.summary),r.description&&(o.description=r.description),r.location&&(o.location=r.location),r.startDateTime&&(o.start={dateTime:r.startDateTime,timeZone:n}),r.endDateTime&&(o.end={dateTime:r.endDateTime,timeZone:n});const i=await fetch(`${Pe}/calendars/${encodeURIComponent(e)}/events/${a}`,{method:"PATCH",headers:s,body:JSON.stringify(o)});if(!i.ok){const l=await i.text();throw new Error(`Calendar update failed (${i.status}): ${l}`)}return await i.json()}async deleteEvent(e="primary",a){const r=await this.authHeaders(),s=await fetch(`${Pe}/calendars/${encodeURIComponent(e)}/events/${a}`,{method:"DELETE",headers:r});if(!s.ok&&s.status!==410){const n=await s.text();throw new Error(`Calendar delete failed (${s.status}): ${n}`)}}async listCalendars(){const e=await this.authHeaders(),a=await fetch(`${Pe}/users/me/calendarList`,{headers:e});if(!a.ok){const s=await a.text();throw new Error(`Calendar list calendars failed (${a.status}): ${s}`)}return((await a.json()).items||[]).map(s=>({id:s.id,summary:s.summary,primary:s.primary||!1}))}}const et="https://docs.googleapis.com/v1/documents",Mr="https://www.googleapis.com/drive/v3/files";class Sa{constructor(e,a,r,s,n){this.db=e,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:e}=await Le(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async createDocument(e){const a=await this.authHeaders(),r=await fetch(et,{method:"POST",headers:a,body:JSON.stringify({title:e})});if(!r.ok){const n=await r.text();throw new Error(`Docs create failed (${r.status}): ${n}`)}const s=await r.json();return{documentId:s.documentId,url:`https://docs.google.com/document/d/${s.documentId}/edit`}}async readDocument(e){var o,i;const a=await this.authHeaders(),r=await fetch(`${et}/${e}`,{headers:a});if(!r.ok){const l=await r.text();throw new Error(`Docs read failed (${r.status}): ${l}`)}const s=await r.json();let n="";for(const l of((o=s.body)==null?void 0:o.content)||[])if(l.paragraph)for(const d of l.paragraph.elements)(i=d.textRun)!=null&&i.content&&(n+=d.textRun.content);return{title:s.title,content:n.trim()}}async appendText(e,a){const r=await this.authHeaders(),s=await fetch(`${et}/${e}`,{headers:r});if(!s.ok){const l=await s.text();throw new Error(`Docs read for append failed (${s.status}): ${l}`)}const n=await s.json(),o=n.body.content[n.body.content.length-1].endIndex-1,i=await fetch(`${et}/${e}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{insertText:{location:{index:o},text:a}}]})});if(!i.ok){const l=await i.text();throw new Error(`Docs append failed (${i.status}): ${l}`)}}async shareDocument(e,a,r="writer"){const s=await this.authHeaders(),n=await fetch(`${Mr}/${e}/permissions`,{method:"POST",headers:s,body:JSON.stringify({type:"user",role:r,emailAddress:a})});if(!n.ok){const o=await n.text();throw new Error(`Share failed (${n.status}): ${o}`)}}}class J{constructor(e,a,r,s,n){E(this,"sheets");E(this,"calendar");E(this,"docs");E(this,"db");E(this,"userId");E(this,"pinHash");this.db=e,this.userId=a,this.pinHash=r,this.sheets=new Ta(e,a,r,s,n),this.calendar=new ka(e,a,r,s,n),this.docs=new Sa(e,a,r,s,n)}async isConnected(){return Et(this.db,this.userId,this.pinHash)}}const Ue=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:ka,GoogleDocs:Sa,GoogleServices:J,GoogleSheets:Ta,completeOAuthFlow:xa,disconnectGoogle:Ea,exchangeCodeForTokens:ba,fetchUserInfo:wa,generateAuthUrl:va,getGoogleAuth:Le,isGoogleConnected:Et,isOAuthClientConfigured:_a},Symbol.toStringTag,{value:"Module"}));async function jr(t,e,a={}){const r={textQuery:e,languageCode:"en",pageSize:8};if(a.type&&(r.includedType=a.type),a.location){const l=a.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(r.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:a.radius||5e3}})}const s=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),n=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":t,"X-Goog-FieldMask":s},body:JSON.stringify(r)});if(!n.ok){const l=await n.text();return{results:[],error:`Places API error (${n.status}): ${l.substring(0,200)}`}}const o=await n.json();return!o.places||o.places.length===0?{results:[]}:{results:o.places.map(l=>{var d,u,h;return{name:((d=l.displayName)==null?void 0:d.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(u=l.currentOpeningHours)==null?void 0:u.openNow,types:(h=l.types)==null?void 0:h.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function Br(t,e){var n,o,i;const a=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),r=await fetch(`https://places.googleapis.com/v1/places/${e}`,{method:"GET",headers:{"X-Goog-Api-Key":t,"X-Goog-FieldMask":a}});if(!r.ok){const l=await r.text();return{error:`Place Details API error (${r.status}): ${l.substring(0,200)}`}}const s=await r.json();return{details:{name:((n=s.displayName)==null?void 0:n.text)||"",address:s.formattedAddress||"",phone:s.internationalPhoneNumber,website:s.websiteUri,rating:s.rating,reviews:(o=s.reviews)==null?void 0:o.slice(0,3).map(l=>{var d,u,h;return{author:((d=l.authorAttribution)==null?void 0:d.displayName)||"Anonymous",rating:l.rating||0,text:((h=(u=l.text)==null?void 0:u.text)==null?void 0:h.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(i=s.currentOpeningHours)==null?void 0:i.weekdayDescriptions,location:s.location?{lat:s.location.latitude,lng:s.location.longitude}:void 0,googleMapsUri:s.googleMapsUri}}}async function Pr(t,e,a,r={}){var d;const s=new URLSearchParams({origin:e,destination:a,key:t,mode:r.mode||"driving"});(r.mode==="driving"||!r.mode)&&s.set("departure_time","now");const n=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${s}`);if(!n.ok)return{error:`Directions API error: ${n.status}`};const o=await n.json();if(o.status!=="OK")return{error:`Directions: ${o.status} — ${o.error_message||""}`};const i=o.routes[0],l=i.legs[0];return{route:{summary:i.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(d=l.duration_in_traffic)==null?void 0:d.text,steps:l.steps.slice(0,10).map(u=>{var h,y,f;return{instruction:((h=u.html_instructions)==null?void 0:h.replace(/<[^>]*>/g,""))||"",distance:((y=u.distance)==null?void 0:y.text)||"",duration:((f=u.duration)==null?void 0:f.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function Ur(t,e,a,r){var l,d;const s={q:e,target:a,key:t,format:"text"};r&&(s.source=r);const n=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok){const u=await n.text();return{translatedText:"",error:`Translate API error (${n.status}): ${u.substring(0,200)}`}}const i=(d=(l=(await n.json()).data)==null?void 0:l.translations)==null?void 0:d[0];return i?{translatedText:i.translatedText,detectedSourceLang:i.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function Gr(t,e){const a=new URLSearchParams({address:e,key:t}),r=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${a}`);if(!r.ok)return{results:[],error:`Geocoding API error: ${r.status}`};const s=await r.json();return s.status!=="OK"&&s.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${s.status} — ${s.error_message||""}`}:{results:(s.results||[]).slice(0,5).map(n=>{var o;return{address:n.formatted_address,lat:n.geometry.location.lat,lng:n.geometry.location.lng,placeId:n.place_id,types:(o=n.types)==null?void 0:o.slice(0,3)}})}}async function Hr(t,e,a={}){const r=new URLSearchParams({part:"snippet",q:e,key:t,type:a.type||"video",maxResults:String(a.maxResults||5),order:a.order||"relevance"}),s=await fetch(`https://www.googleapis.com/youtube/v3/search?${r}`);if(!s.ok){const o=await s.text();return{results:[],error:`YouTube API error (${s.status}): ${o.substring(0,200)}`}}return{results:((await s.json()).items||[]).map(o=>{var i,l,d,u,h,y,f,b;return{title:o.snippet.title,channelTitle:o.snippet.channelTitle,description:(i=o.snippet.description)==null?void 0:i.substring(0,200),videoId:((l=o.id)==null?void 0:l.videoId)||((d=o.id)==null?void 0:d.channelId)||((u=o.id)==null?void 0:u.playlistId)||"",publishedAt:o.snippet.publishedAt,url:(h=o.id)!=null&&h.videoId?`https://www.youtube.com/watch?v=${o.id.videoId}`:(y=o.id)!=null&&y.channelId?`https://www.youtube.com/channel/${o.id.channelId}`:"",thumbnailUrl:(b=(f=o.snippet.thumbnails)==null?void 0:f.medium)==null?void 0:b.url}})}}async function Ia(t,e={}){const a=Math.min(e.num||5,10),r=e.site?`site:${e.site} ${t}`:t;try{const s=new URLSearchParams({q:r}),n=await fetch(`https://html.duckduckgo.com/html/?${s}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!n.ok)return{results:[],error:`Search request failed (${n.status})`};const o=await n.text(),i=[],l=o.split(/class="result results_links/g).slice(1);for(const d of l){if(i.length>=a)break;const u=d.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),h=d.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(u){let y=u[1];const f=y.match(/uddg=([^&]+)/);f?y=decodeURIComponent(f[1]):y.startsWith("//")&&(y="https:"+y);const b=c=>c.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),_=b(u[2]),x=h?b(h[1]):"";if(_&&y.startsWith("http")){const c=y.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];i.push({title:_,link:y,snippet:x,displayLink:c})}}}return i.length===0?{results:[],error:void 0}:{results:i}}catch(s){return{results:[],error:`Web search error: ${s.message}`}}}async function Fr(t,e,a,r="driving"){var l,d,u,h;const s=new URLSearchParams({origins:e,destinations:a,key:t,mode:r,departure_time:"now"}),n=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${s}`);if(!n.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${n.status}`};const o=await n.json(),i=(u=(d=(l=o.rows)==null?void 0:l[0])==null?void 0:d.elements)==null?void 0:u[0];return!i||i.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(i==null?void 0:i.status)||o.status}`}:{distance:i.distance.text,duration:i.duration.text,durationInTraffic:(h=i.duration_in_traffic)==null?void 0:h.text}}const re="https://gmail.googleapis.com/gmail/v1/users/me";class ge{constructor(e,a,r,s,n){this.db=e,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:e}=await Le(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}async listMessages(e={}){var i;const a=await this.authHeaders(),r=new URLSearchParams;if(r.set("maxResults",String(e.maxResults||10)),e.query&&r.set("q",e.query),(i=e.labelIds)!=null&&i.length)for(const l of e.labelIds)r.append("labelIds",l);const s=await fetch(`${re}/messages?${r}`,{headers:a});if(!s.ok){const l=await s.text();throw new Error(`Gmail list failed (${s.status}): ${l.substring(0,200)}`)}const n=await s.json();if(!n.messages||n.messages.length===0)return[];const o=[];for(const l of n.messages.slice(0,e.maxResults||10))try{const d=await this.getMessage(l.id,a);d&&o.push(d)}catch{}return o}async getMessage(e,a){const r=a||await this.authHeaders(),s=await fetch(`${re}/messages/${e}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:r});if(!s.ok)return null;const n=await s.json(),o=i=>{var l,d,u;return((u=(d=(l=n.payload)==null?void 0:l.headers)==null?void 0:d.find(h=>h.name.toLowerCase()===i.toLowerCase()))==null?void 0:u.value)||""};return{id:n.id,threadId:n.threadId,snippet:n.snippet||"",subject:o("Subject")||"(no subject)",from:o("From"),to:o("To"),date:o("Date")||new Date(parseInt(n.internalDate)).toISOString(),isUnread:(n.labelIds||[]).includes("UNREAD"),labels:n.labelIds||[]}}async getMessageBody(e){const a=await this.authHeaders(),r=await fetch(`${re}/messages/${e}?format=full`,{headers:a});if(!r.ok){const n=await r.text();throw new Error(`Gmail message body failed (${r.status}): ${n.substring(0,200)}`)}const s=await r.json();return Oa(s.payload)}async search(e,a=10){return this.listMessages({query:e,maxResults:a})}async send(e,a,r,s={}){const n=await this.authHeaders(),o=[`To: ${e}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];s.cc&&o.push(`Cc: ${s.cc}`),s.bcc&&o.push(`Bcc: ${s.bcc}`),s.replyToMessageId&&(o.push(`In-Reply-To: ${s.replyToMessageId}`),o.push(`References: ${s.replyToMessageId}`)),o.push("",r);const i=o.join(`\r
`),d={raw:btoa(unescape(encodeURIComponent(i))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};s.threadId&&(d.threadId=s.threadId);const u=await fetch(`${re}/messages/send`,{method:"POST",headers:n,body:JSON.stringify(d)});if(!u.ok){const h=await u.text();throw new Error(`Gmail send failed (${u.status}): ${h.substring(0,200)}`)}return await u.json()}async createDraft(e,a,r){const s=await this.authHeaders(),o=[`To: ${e}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8","",r].join(`\r
`),i=btoa(unescape(encodeURIComponent(o))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),l=await fetch(`${re}/drafts`,{method:"POST",headers:s,body:JSON.stringify({message:{raw:i}})});if(!l.ok){const d=await l.text();throw new Error(`Gmail draft failed (${l.status}): ${d.substring(0,200)}`)}return await l.json()}async markAsRead(e){const a=await this.authHeaders();await fetch(`${re}/messages/${e}/modify`,{method:"POST",headers:a,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async getUnreadCount(){const e=await this.authHeaders(),a=await fetch(`${re}/labels/INBOX`,{headers:e});return a.ok&&(await a.json()).messagesUnread||0}async getProfile(){const e=await this.authHeaders(),a=await fetch(`${re}/profile`,{headers:e});if(!a.ok)throw new Error("Failed to get Gmail profile");return await a.json()}}function Oa(t){var e,a,r;if(!t)return"";if((e=t.body)!=null&&e.data)return mt(t.body.data);if(t.parts){for(const s of t.parts)if(s.mimeType==="text/plain"&&((a=s.body)!=null&&a.data))return mt(s.body.data);for(const s of t.parts)if(s.mimeType==="text/html"&&((r=s.body)!=null&&r.data)){const n=mt(s.body.data);return qr(n)}for(const s of t.parts)if(s.parts){const n=Oa(s);if(n)return n}}return t.snippet||""}function mt(t){const e=t.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(e)))}catch{return atob(e)}}function qr(t){return t.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const zr=8e3,Wr=8e3;async function Ca(t,e){try{const a=new AbortController,r=setTimeout(()=>a.abort(),Wr),s=await fetch(t,{signal:a.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(clearTimeout(r),!s.ok)return{text:"",error:`HTTP ${s.status}`};const n=s.headers.get("content-type")||"";if(!n.includes("text/html")&&!n.includes("text/plain")&&!n.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${n.split(";")[0]}`};const o=await s.text(),i=Kr(o);return i.length<50?{text:"",error:"Page has too little readable content"}:{text:i.substring(0,e||zr)}}catch(a){return{text:"",error:a.name==="AbortError"?"Timeout":a.message}}}function Kr(t){let e=t;return e=e.replace(/<script[\s\S]*?<\/script>/gi,""),e=e.replace(/<style[\s\S]*?<\/style>/gi,""),e=e.replace(/<nav[\s\S]*?<\/nav>/gi,""),e=e.replace(/<footer[\s\S]*?<\/footer>/gi,""),e=e.replace(/<header[\s\S]*?<\/header>/gi,""),e=e.replace(/<aside[\s\S]*?<\/aside>/gi,""),e=e.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),e=e.replace(/<!--[\s\S]*?-->/g,""),e=e.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),e=e.replace(/<li[^>]*>/gi,`
• `),e=e.replace(/<[^>]+>/g,""),e=e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(a,r)=>String.fromCharCode(parseInt(r))),e=e.replace(/[ \t]+/g," "),e=e.replace(/\n\s*\n/g,`

`),e=e.split(`
`).map(a=>a.trim()).filter(a=>a.length>0).join(`
`),e.trim()}async function Ra(t,e,a={}){const r=a.maxPages||(a.depth==="thorough"?5:3),s=a.maxResults||(a.depth==="thorough"?8:5),n=await Ia(t,{num:s,site:a.site});if(n.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${n.error}`};if(n.results.length===0)return{report:`No web results found for "${t}".`,sources:[],pagesRead:0};const i=n.results.slice(0,r).map(async y=>{const f=await Ca(y.link);return{title:y.title,url:y.link,displayLink:y.displayLink,snippet:y.snippet,content:f.text,error:f.error}}),d=(await Promise.all(i)).filter(y=>y.content.length>50);if(d.length===0){const y=n.results.map((b,_)=>`[${_+1}] ${b.title}
${b.snippet}
Source: ${b.link}`).join(`

`);return{report:await Lt(t,y,e,"snippets"),sources:n.results.map(b=>({title:b.title,url:b.link})),pagesRead:0}}const u=d.map((y,f)=>`--- SOURCE ${f+1}: ${y.title} (${y.displayLink}) ---
${y.content}
--- END SOURCE ${f+1} ---`).join(`

`);return{report:await Lt(t,u,e,"full"),sources:d.map(y=>({title:y.title,url:y.url})),pagesRead:d.length}}async function Lt(t,e,a,r){const n=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

${r==="full"?"I have fetched and read the full content of several web pages related to the research query.":"I could only retrieve search snippets (page fetching failed). Base the analysis on available snippet information and note this limitation."}

Instructions:
- Analyze ALL the source material provided below
- Write a clear, well-structured report answering the research query
- Include specific facts, numbers, and details from the sources
- Note any conflicting information between sources
- End with a brief conclusion or recommendation
- Cite sources by number [1], [2], etc.
- Keep the report concise but thorough — aim for 300-600 words
- Do NOT make up information not found in the sources
- If the sources don't adequately answer the query, say so honestly`,o=`Research query: "${t}"

Source material:
${e}

Write a synthesized research report answering the query above.`;try{return(await a.chat([{role:"system",content:n},{role:"user",content:o}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(i){return`Research synthesis error: ${i.message}. Raw search results were found but could not be analyzed.`}}const Jr=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:Ra,fetchPageContent:Ca},Symbol.toStringTag,{value:"Module"})),Yr=2e3,Vr=2e3,Da=4;function ht(t){return Math.ceil(t.length/Da)}function Mt(t,e){const a=e*Da;return t.length<=a?t:t.slice(0,a)+`
[...truncated to fit token budget]`}const Aa=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily"],description:"interval = every N minutes, daily = at a specific time"},schedule_value:{type:"string",description:'For interval: number of minutes (e.g. "30"). For daily: time in HH:MM format (e.g. "08:00")'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","schedule_value","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:"Store a piece of information the user wants you to remember. Use for facts, preferences, decisions, or important context.",parameters:{type:"object",properties:{type:{type:"string",enum:["fact","preference","decision","context"],description:"Category of memory"},title:{type:"string",description:"Short title/key for this memory"},content:{type:"string",description:"The information to remember"},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for critical info that should stay in working memory."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:"Read data from a Google Sheet. Requires Google account to be connected via OAuth. Returns cell values as rows.",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:D10", "Sheet1!A:A")'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. Use this to add new entries (expenses, logs, records) to an existing sheet.",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"check_gmail",description:"Check Gmail inbox for recent emails. Uses browser automation (Steel + Browser Use) to access Gmail and list unread/recent emails. Requires Steel and Browser Use API keys to be configured. Note: First-time use may require the user to complete Google sign-in through the Steel session viewer.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Maximum number of emails to retrieve. Default: 10"}}}},{name:"compose_gmail_draft",description:"Compose a draft email in Gmail without sending it. The draft will be saved in Drafts for the user to review.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject line"},body:{type:"string",description:"Email body text"}},required:["to","subject","body"]}},{name:"search_gmail",description:"Search Gmail for specific emails by query. Uses Gmail's search syntax (from:, to:, subject:, has:attachment, etc.).",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:john subject:meeting", "has:attachment newer_than:7d")'}},required:["query"]}},{name:"check_outlook_mail",description:"Check Outlook inbox for recent emails. Uses Browser Use Cloud to log into Outlook and list recent emails. Requires Browser Use API key in Settings. The user may have two Outlook accounts configured: primary (work) and secondary (personal). Default to primary unless the user specifies otherwise.",parameters:{type:"object",properties:{account:{type:"string",enum:["primary","secondary"],description:"Which Outlook account to check. Default: primary."}}}},{name:"compose_email_draft",description:"Compose an email draft in Outlook without sending it. The draft will be saved in the Drafts folder for the user to review and send manually. Supports primary and secondary Outlook accounts.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject line"},body:{type:"string",description:"Email body text"},account:{type:"string",enum:["primary","secondary"],description:"Which Outlook account to compose from. Default: primary."}},required:["to","subject","body"]}},{name:"check_outlook_calendar",description:"Check Outlook calendar for today and tomorrow events. Lists event title, time, location, and attendees. Supports primary and secondary Outlook accounts.",parameters:{type:"object",properties:{account:{type:"string",enum:["primary","secondary"],description:"Which Outlook account calendar to check. Default: primary."}}}},{name:"browse_web",description:"Browse the web and interact with websites using Browser Use Cloud AI agent. Use this for any web task: reading pages, filling forms, extracting data, or navigating sites. Requires Browser Use API key in Settings.",parameters:{type:"object",properties:{instruction:{type:"string",description:'Natural language instruction for what to do on the web (e.g., "Go to weather.com and get the forecast for Mumbai")'}},required:["instruction"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:"Send an email via Gmail. Uses Google OAuth directly. The email is sent immediately from the user's Gmail account. Use with care — confirm with the user before sending.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_upload",description:"Upload a file to Google Drive. The file must have been previously uploaded via the chat attachment. Specify the file_id from the attached file metadata. Optionally specify a folder name or ID.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id of the uploaded file (from attached file metadata)"},folder_name:{type:"string",description:"Optional: Name of the Drive folder to upload into. Will search for it or create if not found."},folder_id:{type:"string",description:"Optional: Specific Google Drive folder ID to upload into"}},required:["file_id"]}},{name:"parse_document",description:"Parse and extract text content from an uploaded file. Supports text files, CSV, JSON, XML, and other text-based formats. For binary formats (PDF, DOCX, images), returns the base64 data and detected type. Use this to read the full contents of an attached file.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id of the uploaded file to parse"}},required:["file_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets. Use for quick facts, links, current events, prices. Fast (~1s), no API key.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:"Deep web research — searches, reads multiple pages, and synthesizes a report with sources. Use when user needs analysis, comparisons, fact-checking, or thorough answers. Returns a compiled report, not links. (~10-15s)",parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Is Abacus AI good for agentic tool calls?", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"suggest_feature",description:"Propose a new feature or improvement for yourself. Use this when you notice something that could make you more useful — a missing tool, a better workflow, a UI improvement, or an integration opportunity. The user can approve or reject it later.",parameters:{type:"object",properties:{title:{type:"string",description:"Short, clear feature title"},description:{type:"string",description:"Detailed description of the feature — what it does, how it works"},rationale:{type:"string",description:"Why this would be valuable — what problem it solves or what it improves"},priority:{type:"string",enum:["low","medium","high","critical"],description:"Suggested priority"},category:{type:"string",enum:["general","tool","ui","integration","performance","security"],description:"Feature category"}},required:["title","description","rationale"]}},{name:"list_feature_requests",description:"List all feature requests and their statuses. Use to check what improvements have been proposed, approved, or implemented.",parameters:{type:"object",properties:{status:{type:"string",enum:["proposed","approved","rejected","in_progress","implemented","deferred","all"],description:"Filter by status. Default: all"}}}},{name:"update_feature_request",description:"Update the status or notes of a feature request. Use when the user approves, rejects, or provides feedback on a suggested feature.",parameters:{type:"object",properties:{feature_id:{type:"number",description:"ID of the feature request"},status:{type:"string",enum:["proposed","approved","rejected","in_progress","implemented","deferred"],description:"New status"},notes:{type:"string",description:"Implementation notes or feedback"}},required:["feature_id"]}}];function $a(t,e){const a=t.assistant_name||"Karna",r=t.personality_prompt?Mt(`## Personality Instructions
${t.personality_prompt}
`,Yr):"",s=Mt(e,Vr);return`You are ${a} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic. Your name is ${a} — always refer to yourself by this name if asked.

## Your Core Identity
- You are a cloud-based personal assistant with memory, scheduling, Google Workspace integration (Sheets, Calendar, Docs), and browser-automation capabilities — you can check Gmail, Outlook, calendar, and browse the web.
- You remember past conversations and learn from every interaction.
- You can create scheduled tasks, reminders, and recurring checks through natural conversation.
- You always check your memory before responding to provide continuity.

## Current User
- **Name**: ${t.name}
- **Username**: ${t.username}
- **Role**: ${t.role}
- **Timezone**: ${t.timezone}

${r}

${s}

## How You Work — Composable Capabilities

### Core Philosophy
Your tools are **building blocks**, not isolated features. Every tool is a capability that can be chained with any other tool. When the user gives a request — even a complex one — break it into steps and execute them in sequence. Don't ask permission between steps. Just do it and present the final result.

Think of it this way:
- **Gathering** tools find information (web_search, research, read_url, gmail_list, list_calendar_events, drive_search, search_places)
- **Creating** tools produce output (create_doc, create_sheet, gmail_draft, gmail_send, create_calendar_event)
- **Writing** tools save content (create_doc, append_to_doc, write_sheet, append_sheet, drive_upload, store_memory)
- **Reading** tools retrieve content (read_doc, read_sheet, gmail_read, read_url, parse_document)

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

### Information Retrieval (4 tiers)
1. **web_search** — Quick lookup (~1s). Returns titles, URLs, snippets. Use for: facts, links, news, prices, quick answers.
2. **read_url** — Read one page (~3-5s). Fetches and extracts text from a URL. Use for: reading articles, docs, blog posts, specific pages from search results.
3. **research** — Deep analysis (~10-15s). Searches, reads 3-5 pages, synthesizes a report with citations. Use for: "research X", "is X good for Y?", "compare A vs B", complex questions.
4. **browse_web** — Interactive browser (~30s+). Fills forms, clicks, logs in. Use only when the other tools can't do the job.

**Trigger words**: "research", "look into", "investigate", "analyze", "compare" → use **research**. "Search for", "find", "what is" → use **web_search**. "Read this page/article/link" → use **read_url**.

### Writing & Storage
- **create_doc** — Create a new Google Doc with content. Always pass the full text as the content parameter.
- **append_to_doc** — Add content to an existing Google Doc. Use when the user wants to add to an existing document.
- **create_sheet** + **write_sheet** / **append_sheet** — Create and populate spreadsheets.
- **drive_upload** — Upload attached files to Drive.
- **gmail_draft** / **gmail_send** — Send content via email.
- **store_memory** — Remember user info long-term.

When the user says "save this", "write to a doc", "put this in Drive" — create a Google Doc with the content. Always use a descriptive title.

### Memory & Scheduling
- store_memory — Remember important info (facts, preferences, decisions). Always check memory for context.
- search_memory — Recall previously stored info.
- create_schedule / list_schedules / toggle_schedule — Manage recurring tasks and reminders.

### Google Workspace
- Sheets: read_sheet, write_sheet, append_sheet, create_sheet — formulas like =SUM(), =SUMIF() work in write_sheet/append_sheet
- Calendar: list_calendar_events, create_calendar_event
- Docs: create_doc, read_doc, append_to_doc
- Drive: drive_list, drive_search, drive_upload, parse_document
- If Google is not connected, tell the user: Settings → Keys → Google Workspace.
- **Important**: When you create a doc or sheet, you automatically remember its ID. So when the user later says "add to my budget sheet", check memory for the spreadsheet ID — don't ask them for it.

### Spreadsheet Patterns
When creating tracked sheets (budgets, logs, inventories):
- Set up headers + formulas in the first write_sheet call
- Use =SUM(), =SUMIF(), =COUNTIF() for automatic running totals
- Example budget: headers [Date, Category, Amount(Rs), Running Total], row 2 formula: =SUM($C$2:C2) for running total
- To add entries later: use append_sheet with the remembered spreadsheet_id
- To query data: use read_sheet to get all rows, then analyze/summarize the data yourself

### Email
- **Gmail API (preferred)**: gmail_list, gmail_read, gmail_search, gmail_send, gmail_draft, gmail_unread_count
- **Browser fallback**: check_gmail, compose_gmail_draft, search_gmail — only if API fails
- **Outlook**: check_outlook_mail, compose_email_draft, check_outlook_calendar

### Location, Translation, YouTube
- search_places, get_place_details, get_directions, get_travel_time — places and navigation
- translate_text — 100+ languages
- search_youtube — videos, tutorials, reviews
- geocode_address — addresses to coordinates

### Self-Improvement
- suggest_feature, list_feature_requests, update_feature_request

### Response Style
- Be concise but human. Never robotic.
- Don't announce tool usage — just do it and present results naturally.
- If a tool fails, explain simply and suggest alternatives.
- When the user's request involves multiple steps, execute them all and present the combined result.
- When confirming ambiguity, be brief and offer the most likely option first: "Add Uber ₹700 to your Monthly Budget?" not a long explanation.
- After the user confirms a pattern, store it and never ask about that pattern again.

## Current Date & Time
${Xr(t.timezone)} (${t.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.`}async function jt(t,e,a){var d;const s=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${a.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${t}`}})).json();let n;((d=s.files)==null?void 0:d.length)>0?n=s.files[0].id:n=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({name:a,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${e}?fields=parents`,{headers:{Authorization:`Bearer ${t}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${e}?addParents=${n}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:n,folderName:a}}function Xr(t){try{const e=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:t,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(e)}catch{return new Date().toISOString()}}async function Na(t,e,a,r,s,n,o,i,l,d,u){var y,f,b,_,x;const h=new ue(a);switch(t){case"create_schedule":{const c=new Date;let p;const m=d||"UTC";if(e.schedule_type==="interval"){const g=parseInt(e.schedule_value,10);p=new Date(c.getTime()+g*60*1e3)}else{const[g,w]=e.schedule_value.split(":").map(Number),T=c.toLocaleString("en-US",{timeZone:m}),I=new Date(T),R=new Date(I);R.setHours(g,w,0,0),R<=I&&R.setDate(R.getDate()+1);const D=new Date(R.toLocaleString("en-US",{timeZone:"UTC"})),N=new Date(R.toLocaleString("en-US",{timeZone:m})),A=D.getTime()-N.getTime();p=new Date(R.getTime()+A)}return await a.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(r,e.name,e.description||e.action_description||"",e.schedule_type,e.schedule_value,e.action_type,JSON.stringify({description:e.action_description||e.description||""}),p.toISOString()).run(),`Schedule created: "${e.name}" — ${e.schedule_type==="interval"?`every ${e.schedule_value} minutes`:`daily at ${e.schedule_value}`}. State: active. Next run: ${p.toISOString()}`}case"list_schedules":{const p=(await a.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(r).all()).results||[];return p.length===0?"No scheduled tasks found.":p.map(m=>`[ID:${m.id}] ${m.enabled?"▶":"⏸"} "${m.name}" — ${m.schedule_type==="interval"?`every ${m.schedule_value} min`:`daily at ${m.schedule_value}`} — ${m.action_type} — state: ${m.state||"active"} — next: ${m.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const c=e.enabled?1:0,p=c?"active":"paused";return await a.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(c,p,e.job_id,r).run(),`Schedule ${e.job_id} ${c?"enabled (active)":"paused"}.`}case"update_schedule_state":{const c=["created","active","reminding","paused","completed"],p=e.state;if(!c.includes(p))return`Invalid state "${p}". Valid states: ${c.join(", ")}`;const m=p==="completed"||p==="paused"?0:1;return await a.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(p,m,e.job_id,r).run(),`Schedule ${e.job_id} state updated to "${p}".`}case"delete_schedule":return await a.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(e.job_id,r).run(),`Schedule ${e.job_id} deleted.`;case"store_memory":{const c=e.importance||5,p=c>=7?"working":"long_term";return await h.store(r,e.type,e.title,e.content,c,p),`Stored in ${p==="working"?"working":"long-term"} memory: [${e.type}] ${e.title} (importance: ${c})`}case"search_memory":{const c=await h.search(r,e.query);return c.length===0?"No matching memories found.":c.map(p=>`[${p.tier||"long_term"}] [${p.type}] **${p.title}**: ${p.content}`).join(`
`)}case"get_system_status":{const c=await a.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),p=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),m=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(r).first(),g=await a.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),w=await a.prepare("SELECT * FROM heartbeat_log ORDER BY created_at DESC LIMIT 1").first(),T=new Date().toISOString().split("T")[0],R=((await a.prepare("SELECT provider, tokens_used, request_count FROM provider_usage WHERE user_id = ? AND usage_date = ?").bind(r,T).all()).results||[]).map(N=>`  ${N.provider}: ${N.tokens_used.toLocaleString()} tokens / ${N.request_count} requests`).join(`
`),D=await a.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first();return`System Status:
- Active schedules: ${(c==null?void 0:c.cnt)||0}
- Memory: ${(m==null?void 0:m.cnt)||0} working / ${(p==null?void 0:p.cnt)||0} total
- Total messages: ${(g==null?void 0:g.cnt)||0}
- Unread errors: ${(D==null?void 0:D.cnt)||0}
- Last heartbeat: ${(w==null?void 0:w.status)||"N/A"} at ${(w==null?void 0:w.created_at)||"never"}
- Provider usage today:
${R||"  No usage recorded"}`}case"read_sheet":{if(!s)return"Authentication context unavailable.";try{const p=await new J(a,r,s,n||"",o||"").sheets.readRange(e.spreadsheet_id,e.range);return p.length===0?"No data found in the specified range.":p.map(m=>m.join("	| ")).join(`
`)}catch(c){return await S(a,r,"google","read_sheet",c.message),`Failed to read sheet: ${c.message}`}}case"write_sheet":{if(!s)return"Authentication context unavailable.";try{return`Written ${(await new J(a,r,s,n||"",o||"").sheets.writeRange(e.spreadsheet_id,e.range,e.values)).updatedCells} cells to ${e.range}.`}catch(c){return await S(a,r,"google","write_sheet",c.message),`Failed to write sheet: ${c.message}`}}case"append_sheet":{if(!s)return"Authentication context unavailable.";try{return`Appended ${(await new J(a,r,s,n||"",o||"").sheets.appendRows(e.spreadsheet_id,e.range,e.values)).updatedCells} cells to ${e.range}.`}catch(c){return await S(a,r,"google","append_sheet",c.message),`Failed to append to sheet: ${c.message}`}}case"create_sheet":{if(!s)return"Authentication context unavailable.";try{const c=new J(a,r,s,n||"",o||"");if(!(await c.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const m=await c.sheets.createSpreadsheet(e.title,e.sheet_names);let g="";if(e.folder_name)try{const{token:w}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(a,r,s,n||"",o||"");g=`
Folder: "${(await jt(w,m.spreadsheetId,e.folder_name)).folderName}"`}catch(w){g=`
(Could not move to folder "${e.folder_name}": ${w.message})`}try{await new ue(a).store(r,"context",`Spreadsheet: ${e.title}`,`Spreadsheet ID: ${m.spreadsheetId} | URL: ${m.url} | Sheets: ${(e.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${e.title}"${g}
ID: ${m.spreadsheetId}
URL: ${m.url}`}catch(c){return await S(a,r,"google","create_sheet",c.message),`Failed to create spreadsheet: ${c.message}`}}case"list_calendar_events":{if(!s)return"Authentication context unavailable.";try{const c=new J(a,r,s,n||"",o||""),p=e.calendar_id||"primary",m=e.days_ahead||7,g=new Date,w=new Date(g.getTime()+m*24*60*60*1e3),T=await c.calendar.listEvents(p,{timeMin:g.toISOString(),timeMax:w.toISOString(),query:e.query});return T.length===0?`No events found in the next ${m} days.`:T.map(I=>{var F;const R=I.start.dateTime||I.start.date||"TBD",D=I.end.dateTime||I.end.date||"",N=I.location?` 📍 ${I.location}`:"",A=((F=I.attendees)==null?void 0:F.map(X=>X.email).join(", "))||"";return`• ${I.summary} — ${R} to ${D}${N}${A?`
  Attendees: ${A}`:""}`}).join(`
`)}catch(c){return await S(a,r,"google","list_calendar",c.message),`Failed to list events: ${c.message}`}}case"create_calendar_event":{if(!s)return"Authentication context unavailable.";try{const c=new J(a,r,s,n||"",o||""),p=e.calendar_id||"primary",m=await c.calendar.createEvent(p,{summary:e.summary,description:e.description,location:e.location,startDateTime:e.start_datetime,endDateTime:e.end_datetime,attendees:e.attendees});return`Event created: "${m.summary}"
ID: ${m.id}
Start: ${m.start.dateTime||m.start.date}`}catch(c){return await S(a,r,"google","create_event",c.message),`Failed to create event: ${c.message}`}}case"create_doc":{if(!s)return"Authentication context unavailable.";try{const c=new J(a,r,s,n||"",o||"");if(!(await c.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const m=await c.docs.createDocument(e.title);e.content&&await c.docs.appendText(m.documentId,e.content);let g="";if(e.folder_name)try{const{token:w}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(a,r,s,n||"",o||"");g=`
Folder: "${(await jt(w,m.documentId,e.folder_name)).folderName}"`}catch(w){g=`
(Could not move to folder "${e.folder_name}": ${w.message})`}try{await new ue(a).store(r,"context",`Document: ${e.title}`,`Document ID: ${m.documentId} | URL: ${m.url}`,6,"working")}catch{}return`Document created: "${e.title}"${g}
ID: ${m.documentId}
URL: ${m.url}`}catch(c){return await S(a,r,"google","create_doc",c.message),`Failed to create document: ${c.message}`}}case"read_doc":{if(!s)return"Authentication context unavailable.";try{const p=await new J(a,r,s,n||"",o||"").docs.readDocument(e.document_id);return`Document: "${p.title}"

${p.content}`}catch(c){return await S(a,r,"google","read_doc",c.message),`Failed to read document: ${c.message}`}}case"append_to_doc":{if(!s)return"Authentication context unavailable.";try{const c=new J(a,r,s,n||"",o||"");if(!(await c.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.';await c.docs.appendText(e.document_id,e.content);let m=e.document_id;try{m=(await c.docs.readDocument(e.document_id)).title}catch{}return`Content appended to "${m}".
URL: https://docs.google.com/document/d/${e.document_id}/edit`}catch(c){return await S(a,r,"google","append_to_doc",c.message),`Failed to append to document: ${c.message}`}}case"gmail_list":{if(!s)return"Authentication context unavailable.";try{const p=await new ge(a,r,s,n||"",o||"").listMessages({maxResults:e.max_results||10,query:e.query});return p.length===0?"No messages found.":p.map((m,g)=>`${m.isUnread?"● ":"  "}${g+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(c){return await S(a,r,"gmail","list",c.message),(y=c.message)!=null&&y.includes("not connected")?c.message:`Gmail list error: ${c.message}`}}case"gmail_read":{if(!s)return"Authentication context unavailable.";try{const c=new ge(a,r,s,n||"",o||""),p=await c.getMessage(e.message_id);if(!p)return"Message not found.";const m=await c.getMessageBody(e.message_id);return`**${p.subject}**
From: ${p.from}
To: ${p.to}
Date: ${p.date}

${m}`}catch(c){return await S(a,r,"gmail","read",c.message),`Gmail read error: ${c.message}`}}case"gmail_search":{if(!s)return"Authentication context unavailable.";try{const p=await new ge(a,r,s,n||"",o||"").search(e.query,e.max_results||10);return p.length===0?`No results for: ${e.query}`:p.map((m,g)=>`${m.isUnread?"● ":"  "}${g+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(c){return await S(a,r,"gmail","search",c.message),`Gmail search error: ${c.message}`}}case"gmail_send":{if(!s)return"Authentication context unavailable.";try{const p=await new ge(a,r,s,n||"",o||"").send(e.to,e.subject,e.body,{cc:e.cc});return`Email sent successfully to ${e.to}. Subject: "${e.subject}" [Message ID: ${p.id}]`}catch(c){return await S(a,r,"gmail","send",c.message),`Gmail send error: ${c.message}`}}case"gmail_draft":{if(!s)return"Authentication context unavailable.";try{const p=await new ge(a,r,s,n||"",o||"").createDraft(e.to,e.subject,e.body);return`Draft created. To: ${e.to}, Subject: "${e.subject}" — Review and send from Gmail. [Draft ID: ${p.id}]`}catch(c){return await S(a,r,"gmail","draft",c.message),`Gmail draft error: ${c.message}`}}case"gmail_unread_count":{if(!s)return"Authentication context unavailable.";try{const p=await new ge(a,r,s,n||"",o||"").getUnreadCount();return`You have ${p} unread email${p!==1?"s":""} in Gmail.`}catch(c){return(f=c.message)!=null&&f.includes("not connected")?c.message:`Gmail error: ${c.message}`}}case"drive_list":{if(!s)return"Authentication context unavailable.";try{const{token:c}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(a,r,s,n||"",o||""),p=new URLSearchParams;p.set("pageSize",String(e.max_results||10)),p.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),p.set("orderBy","modifiedTime desc");let m="";e.folder_id?m=`'${e.folder_id}' in parents and trashed = false`:e.query?m=`${e.query} and trashed = false`:m="trashed = false",p.set("q",m);const g=await fetch(`https://www.googleapis.com/drive/v3/files?${p}`,{headers:{Authorization:`Bearer ${c}`}});if(!g.ok)throw new Error(`Drive API error (${g.status})`);const w=await g.json();return(b=w.files)!=null&&b.length?w.files.map((T,I)=>{var A,F;const R=((A=T.mimeType)==null?void 0:A.split(".").pop())||T.mimeType,D=T.size?`${(parseInt(T.size)/1024).toFixed(1)} KB`:"",N=((F=T.modifiedTime)==null?void 0:F.split("T")[0])||"";return`${I+1}. **${T.name}** (${R})
   ${D} · Modified: ${N}
   ${T.webViewLink||""}`}).join(`

`):"No files found."}catch(c){return await S(a,r,"google","drive_list",c.message),`Drive list error: ${c.message}`}}case"drive_search":{if(!s)return"Authentication context unavailable.";try{const{token:c}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(a,r,s,n||"",o||""),p=`fullText contains '${e.query.replace(/'/g,"\\'")}' and trashed = false`,m=new URLSearchParams;m.set("q",p),m.set("pageSize",String(e.max_results||10)),m.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),m.set("orderBy","modifiedTime desc");const g=await fetch(`https://www.googleapis.com/drive/v3/files?${m}`,{headers:{Authorization:`Bearer ${c}`}});if(!g.ok)throw new Error(`Drive API error (${g.status})`);const w=await g.json();return(_=w.files)!=null&&_.length?w.files.map((T,I)=>{var N,A;const R=((N=T.mimeType)==null?void 0:N.split(".").pop())||T.mimeType,D=((A=T.modifiedTime)==null?void 0:A.split("T")[0])||"";return`${I+1}. **${T.name}** (${R}) — Modified: ${D}
   ${T.webViewLink||""}`}).join(`

`):`No files found for: "${e.query}"`}catch(c){return await S(a,r,"google","drive_search",c.message),`Drive search error: ${c.message}`}}case"drive_upload":{if(!s)return"Authentication context unavailable.";try{const c=e.file_id;if(!c)return"file_id is required.";const p=await a.prepare("SELECT * FROM uploaded_files WHERE id = ? AND user_id = ?").bind(c,r).first();if(!p)return`File not found (id: ${c}). It may have been deleted or expired.`;const{token:m}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(a,r,s,n||"",o||"");let g=e.folder_id||void 0;if(!g&&e.folder_name){const X=e.folder_name,kt=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${X}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${m}`}})).json();((x=kt.files)==null?void 0:x.length)>0?g=kt.files[0].id:g=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({name:X,mimeType:"application/vnd.google-apps.folder"})})).json()).id}const w=Uint8Array.from(atob(p.data_base64),X=>X.charCodeAt(0)),T={name:p.name};g&&(T.parents=[g]);const I="-------karna_upload_boundary",R=JSON.stringify(T),D="--"+I+`\r
Content-Type: application/json; charset=UTF-8\r
\r
`+R+`\r
--`+I+`\r
Content-Type: `+p.mime_type+`\r
Content-Transfer-Encoding: base64\r
\r
`+p.data_base64+`\r
--`+I+"--",N=await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,size",{method:"POST",headers:{Authorization:`Bearer ${m}`,"Content-Type":`multipart/related; boundary=${I}`},body:D});if(!N.ok){const X=await N.text();throw new Error(`Drive upload failed (${N.status}): ${X}`)}const A=await N.json(),F=e.folder_name?` in folder "${e.folder_name}"`:"";return`✅ Uploaded **${A.name}**${F} to Google Drive.
📎 ${A.webViewLink||"https://drive.google.com/file/d/"+A.id}`}catch(c){return await S(a,r,"google","drive_upload",c.message),`Drive upload error: ${c.message}`}}case"parse_document":try{const c=e.file_id;if(!c)return"file_id is required.";const p=await a.prepare("SELECT id, name, mime_type, size, text_preview, data_base64 FROM uploaded_files WHERE id = ? AND user_id = ?").bind(c,r).first();if(!p)return`File not found (id: ${c}).`;const m=p.mime_type,g=p.name;if(m.startsWith("text/")||m==="application/json"||m==="application/xml"||m==="text/csv"||m==="application/csv"){const I=new TextDecoder,R=Uint8Array.from(atob(p.data_base64),A=>A.charCodeAt(0)),D=I.decode(R),N=D.length>8e3?D.substring(0,8e3)+`

[...truncated at 8000 chars, total: `+D.length+" chars]":D;return`📄 **${g}** (${m}, ${Math.round(p.size/1024)}KB)

\`\`\`
${N}
\`\`\``}const w=Math.round(p.size/1024);let T=`📄 **${g}** (${m}, ${w}KB)

`;return m==="application/pdf"?(T+="This is a PDF file. Text extraction from PDF requires external services. ",T+="You can upload it to Google Drive using drive_upload, then use Google Docs to open and read it."):m.includes("word")||m.includes("document")||g.endsWith(".docx")||g.endsWith(".doc")?T+="This is a Word document. Upload it to Google Drive using drive_upload to view/edit.":m.includes("spreadsheet")||m.includes("excel")||g.endsWith(".xlsx")||g.endsWith(".xls")?T+="This is a spreadsheet. Upload it to Google Drive using drive_upload to view/edit with Google Sheets.":m.startsWith("image/")?T+="This is an image file ("+m+"). Upload it to Google Drive using drive_upload for storage.":m.startsWith("audio/")||m.startsWith("video/")?T+="This is a media file ("+m+"). Upload it to Google Drive using drive_upload for storage.":T+="Binary file detected. Upload it to Google Drive using drive_upload.",p.text_preview&&(T+=`

**Partial text extracted:**
\`\`\`
`+p.text_preview.substring(0,2e3)+"\n```"),T}catch(c){return`Document parse error: ${c.message}`}case"check_gmail":return s?await new se(a,r).checkGmail(s):"Authentication context unavailable for browser actions.";case"compose_gmail_draft":return s?await new se(a,r).composeGmailDraft(s,e.to,e.subject,e.body):"Authentication context unavailable for browser actions.";case"search_gmail":return s?await new se(a,r).searchGmail(s,e.query):"Authentication context unavailable for browser actions.";case"check_outlook_mail":{if(!s)return"Authentication context unavailable for browser actions.";const c=new se(a,r),p=e.account||"primary";return await c.checkOutlookMail(s,p)}case"compose_email_draft":{if(!s)return"Authentication context unavailable for browser actions.";const c=new se(a,r),p=e.account||"primary";return await c.composeDraft(s,e.to,e.subject,e.body,p)}case"check_outlook_calendar":{if(!s)return"Authentication context unavailable for browser actions.";const c=new se(a,r),p=e.account||"primary";return await c.checkOutlookCalendar(s,p)}case"browse_web":return s?await new se(a,r).browseWeb(s,e.instruction):"Authentication context unavailable for browser actions.";case"web_search":try{const c=await Ia(e.query,{num:e.num_results||5,site:e.site});return c.error?`Web search failed: ${c.error}`:c.results.length===0?`No results found for "${e.query}".`:c.results.map((p,m)=>`${m+1}. **${p.title}**
   ${p.link}
   ${p.snippet}`).join(`

`)}catch(c){return await S(a,r,"search","web_search",c.message),`Web search error: ${c.message}`}case"read_url":try{const c=e.url;if(!c||!c.startsWith("http://")&&!c.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const p=Math.min(e.max_length||8e3,15e3),{fetchPageContent:m}=await Promise.resolve().then(()=>Jr),g=await m(c,p);return g.error?`Failed to read page: ${g.error}`:!g.text||g.text.length<20?`Page at ${c} returned no readable content.`:`Content from ${c} (${g.text.length} chars):

${g.text}`}catch(c){return await S(a,r,"search","read_url",c.message),`Read URL error: ${c.message}`}case"research":{if(!u)return"Research tool requires an LLM provider but none is available.";try{const c=await Ra(e.query,u,{depth:e.depth||"quick",site:e.site});if(c.error)return`Research failed: ${c.error}`;let p=c.report;return c.sources.length>0&&(p+=`

---
**Sources** (`+c.pagesRead+` pages read):
`,p+=c.sources.map((m,g)=>`[${g+1}] ${m.title}
    ${m.url}`).join(`
`)),p}catch(c){return await S(a,r,"research","research",c.message),`Research error: ${c.message}`}}case"search_places":{if(!s)return"Authentication context unavailable.";try{const c=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!c)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const p=await U(c.encrypted_value,s),m=await jr(p,e.query,{type:e.type});return m.error?`Places search failed: ${m.error}`:m.results.length===0?`No places found for "${e.query}".`:m.results.map((g,w)=>{const T=g.rating?` ★${g.rating} (${g.userRatingsTotal||0} reviews)`:"",I=g.openNow!==void 0?g.openNow?" · Open now":" · Closed":"",R=g.googleMapsUri?`
   ${g.googleMapsUri}`:"";return`${w+1}. **${g.name}**${T}${I}
   ${g.address}${R}
   [place_id: ${g.placeId}]`}).join(`

`)}catch(c){return await S(a,r,"google_api","search_places",c.message),`Places search error: ${c.message}`}}case"get_place_details":{if(!s)return"Authentication context unavailable.";try{const c=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await U(c.encrypted_value,s),m=await Br(p,e.place_id);if(m.error)return`Details lookup failed: ${m.error}`;if(!m.details)return"No details found.";const g=m.details;let w=`**${g.name}**
📍 ${g.address}`;if(g.phone&&(w+=`
📞 ${g.phone}`),g.website&&(w+=`
🌐 ${g.website}`),g.rating&&(w+=`
★ ${g.rating}`),g.googleMapsUri&&(w+=`
📌 ${g.googleMapsUri}`),g.openingHours&&(w+=`

Opening Hours:
${g.openingHours.join(`
`)}`),g.reviews&&g.reviews.length>0){w+=`

Recent Reviews:`;for(const T of g.reviews)w+=`
— ${T.author} (★${T.rating}, ${T.time}): "${T.text}"`}return w}catch(c){return await S(a,r,"google_api","place_details",c.message),`Place details error: ${c.message}`}}case"get_directions":{if(!s)return"Authentication context unavailable.";try{const c=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await U(c.encrypted_value,s),m=await Pr(p,e.origin,e.destination,{mode:e.mode||"driving"});if(m.error)return`Directions failed: ${m.error}`;if(!m.route)return"No route found.";const g=m.route;let w=`**${g.startAddress}** → **${g.endAddress}**
`;return w+=`📏 ${g.distance} · ⏱️ ${g.duration}`,g.durationInTraffic&&(w+=` (with traffic: ${g.durationInTraffic})`),w+=`
via ${g.summary}`,w+=`

Steps:`,g.steps.forEach((T,I)=>{w+=`
${I+1}. ${T.instruction} (${T.distance}, ${T.duration})`}),w}catch(c){return await S(a,r,"google_api","directions",c.message),`Directions error: ${c.message}`}}case"get_travel_time":{if(!s)return"Authentication context unavailable.";try{const c=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await U(c.encrypted_value,s),m=await Fr(p,e.origin,e.destination,e.mode||"driving");if(m.error)return`Travel time lookup failed: ${m.error}`;let g=`${e.origin} → ${e.destination}: ${m.distance}, ${m.duration}`;return m.durationInTraffic&&(g+=` (with traffic: ${m.durationInTraffic})`),g}catch(c){return await S(a,r,"google_api","travel_time",c.message),`Travel time error: ${c.message}`}}case"translate_text":{if(!s)return"Authentication context unavailable.";try{const c=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await U(c.encrypted_value,s),m=await Ur(p,e.text,e.target_language,e.source_language);return m.error?`Translation failed: ${m.error}`:`[${m.detectedSourceLang||e.source_language||"auto"} → ${e.target_language}]

${m.translatedText}`}catch(c){return await S(a,r,"google_api","translate",c.message),`Translation error: ${c.message}`}}case"search_youtube":{if(!s)return"Authentication context unavailable.";try{const c=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await U(c.encrypted_value,s),m=await Hr(p,e.query,{maxResults:e.max_results||5,order:e.order||"relevance"});return m.error?`YouTube search failed: ${m.error}`:m.results.length===0?`No YouTube results for "${e.query}".`:m.results.map((g,w)=>{var T;return`${w+1}. **${g.title}**
   ${g.channelTitle} · ${((T=g.publishedAt)==null?void 0:T.split("T")[0])||""}
   ${g.description}
   ${g.url}`}).join(`

`)}catch(c){return await S(a,r,"google_api","youtube_search",c.message),`YouTube search error: ${c.message}`}}case"geocode_address":{if(!s)return"Authentication context unavailable.";try{const c=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await U(c.encrypted_value,s),m=await Gr(p,e.address);return m.error?`Geocoding failed: ${m.error}`:m.results.length===0?`Location not found: "${e.address}"`:m.results.map((g,w)=>`${w+1}. ${g.address}
   Coordinates: ${g.lat}, ${g.lng}`).join(`
`)}catch(c){return await S(a,r,"google_api","geocode",c.message),`Geocoding error: ${c.message}`}}case"suggest_feature":try{const c=e.title,p=e.description,m=e.rationale||"",g=e.priority||"medium",w=e.category||"general",T=e.proposed_by||"assistant";return await a.prepare("INSERT INTO feature_requests (user_id, title, description, rationale, priority, category, proposed_by) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(r,c,p,m,g,w,T).run(),`Feature proposed: "${c}" (${g} priority, ${w}). The user can review it in Settings → Features or ask to list feature requests.`}catch(c){return await S(a,r,"system","suggest_feature",c.message),`Error proposing feature: ${c.message}`}case"list_feature_requests":try{const c=e.status||"all";let p="SELECT * FROM feature_requests WHERE user_id = ?";const m=[r];c!=="all"&&(p+=" AND status = ?",m.push(c)),p+=" ORDER BY created_at DESC LIMIT 30";const w=(await a.prepare(p).bind(...m).all()).results||[];if(w.length===0)return c==="all"?"No feature requests yet. I'll suggest improvements as I notice opportunities.":`No feature requests with status "${c}".`;const T={proposed:"💡",approved:"✅",rejected:"❌",in_progress:"🔧",implemented:"🎉",deferred:"⏸️"};return w.map((I,R)=>`${R+1}. ${T[I.status]||"•"} **${I.title}** [${I.status}] (${I.priority})
   ${I.description}
   ${I.rationale?"Why: "+I.rationale:""}
   Category: ${I.category} · ID: ${I.id}`).join(`

`)}catch(c){return await S(a,r,"system","list_features",c.message),`Error listing features: ${c.message}`}case"update_feature_request":try{const c=e.feature_id,p=[],m=[];return e.status&&(p.push("status = ?"),m.push(e.status)),e.notes&&(p.push("implementation_notes = ?"),m.push(e.notes)),p.length===0?"No updates specified.":(p.push("updated_at = CURRENT_TIMESTAMP"),m.push(c,r),await a.prepare(`UPDATE feature_requests SET ${p.join(", ")} WHERE id = ? AND user_id = ?`).bind(...m).run(),`Feature request #${c} updated.`)}catch(c){return await S(a,r,"system","update_feature",c.message),`Error updating feature: ${c.message}`}default:return`Unknown tool: ${t}`}}async function Tt(t,e,a,r,s,n){var _;const o=new ue(e),i=(_=t.metadata)==null?void 0:_.thread_id,l=await o.buildContext(r.id),d=await o.getRecentConversations(r.id,15,i),h=[{role:"system",content:$a(r,l)},...d.map(x=>({role:x.role,content:x.content})),{role:"user",content:t.text}];await o.storeMessage(r.id,t.channel,"user",t.text,"{}",i);const y=10;let f="",b=0;for(let x=0;x<y;x++)try{const c=await a.chat(h,{tools:Aa});if(c.usage&&(b+=c.usage.promptTokens+c.usage.completionTokens),c.toolCalls&&c.toolCalls.length>0){c.content&&h.push({role:"assistant",content:c.content});for(const p of c.toolCalls)try{const m=await Na(p.name,p.arguments,e,r.id,r.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,r.timezone,a);h.push({role:"user",content:`[Tool Result for ${p.name}]: ${m}`})}catch(m){await S(e,r.id,"tool",p.name,m.message||"Tool execution failed"),h.push({role:"user",content:`[Tool Error for ${p.name}]: ${m.message||"Execution failed"}`})}continue}f=c.content;break}catch(c){if(s){const p=c.message||"",m=p.includes("401")||p.includes("403")||p.includes("authentication")||p.includes("credit balance"),g=p.includes("429"),w=m?1440:g?10:5;await s.recordError(a.name,p,w)}throw await S(e,r.id,"llm","provider_error",c.message||"Unknown LLM error",{provider:a.name,turn:x}),c}return s&&b>0&&await s.recordUsage(a.name,b),await o.storeMessage(r.id,t.channel,"assistant",f,"{}",i),await o.compactHistory(r.id,30),f}const Bt={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function Zr(t){for(const[e,a]of Object.entries(Bt))if(t.toLowerCase().includes(e.toLowerCase()))return a;return Bt.default}function Qr(t,e,a,r){const s=Zr(r),n=Math.floor(s*.75),o=[];let i=0,l=!1;const d=ht(t);o.push({role:"system",content:t}),i+=d;const u=ht(a);i+=u;const h=n-i,y=[];let f=0;for(let b=e.length-1;b>=0;b--){const _=e[b],x=ht(_.content);if(f+x<=h)y.unshift({role:_.role,content:_.content}),f+=x;else{l=!0;break}}return o.push(...y),o.push({role:"user",content:a}),i+=f,{maxTokens:s,usedTokens:i,messages:o,wasTruncated:l}}async function*es(t,e,a,r,s,n){var x;const o=new ue(e),i=(x=t.metadata)==null?void 0:x.thread_id;yield{type:"thinking",data:{threadId:i,provider:a.name}};const l=await o.buildContext(r.id),d=await o.getRecentConversations(r.id,20,i),u=$a(r,l),h=Qr(u,d,t.text,a.name);await o.storeMessage(r.id,t.channel,"user",t.text,"{}",i);const y=10;let f="",b=0;const _=[...h.messages];for(let c=0;c<y;c++)try{c>0&&(yield{type:"thinking",data:{threadId:i}});const p=await a.chat(_,{tools:Aa});if(p.usage&&(b+=p.usage.promptTokens+p.usage.completionTokens),p.toolCalls&&p.toolCalls.length>0){p.content&&(yield{type:"chunk",data:{text:p.content,threadId:i}},_.push({role:"assistant",content:p.content}));for(const g of p.toolCalls){yield{type:"tool_start",data:{tool:g.name,toolArgs:g.arguments,threadId:i}};try{const w=await Na(g.name,g.arguments,e,r.id,r.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,r.timezone,a);yield{type:"tool_end",data:{tool:g.name,toolResult:w.substring(0,500)+(w.length>500?"...":""),threadId:i}},_.push({role:"user",content:`[Tool Result for ${g.name}]: ${w}`})}catch(w){await S(e,r.id,"tool",g.name,w.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:g.name,toolResult:`Error: ${w.message||"Execution failed"}`,threadId:i}},_.push({role:"user",content:`[Tool Error for ${g.name}]: ${w.message||"Execution failed"}`})}}continue}f=p.content;const m=50;for(let g=0;g<f.length;g+=m)yield{type:"chunk",data:{text:f.substring(g,g+m),threadId:i}},g+m<f.length&&await new Promise(T=>setTimeout(T,10));break}catch(p){if(s){const m=p.message||"",g=m.includes("401")||m.includes("403")||m.includes("authentication")||m.includes("credit balance"),w=m.includes("429"),T=g?1440:w?10:5;await s.recordError(a.name,m,T)}await S(e,r.id,"llm","provider_error",p.message||"Unknown LLM error",{provider:a.name,turn:c}),yield{type:"error",data:{error:p.message||"An error occurred",threadId:i}};return}s&&b>0&&await s.recordUsage(a.name,b),await o.storeMessage(r.id,t.channel,"assistant",f,"{}",i),await o.compactHistory(r.id,30),yield{type:"done",data:{threadId:i,provider:a.name,tokenCount:b}}}const L=new xe;async function ts(t,e){var s;const a=(s=t.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!a)return t.json({error:"Authentication required"},401);const r=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return t.json({error:"Invalid session"},401);t.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),t.set("sessionId",a),await e()}L.use("/*",ts);L.get("/threads",async t=>{const e=t.get("user"),a=t.req.query("archived")==="1",r=parseInt(t.req.query("limit")||"30"),s=await t.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(e.id,a?1:0,r).all();return t.json({threads:s.results||[]})});L.post("/threads",async t=>{const e=t.get("user"),{title:a}=await t.req.json(),r=await t.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(e.id,a||"New conversation").first();return t.json({thread:r})});L.put("/threads/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),r=await t.req.json(),s=[],n=[];return r.title!==void 0&&(s.push("title = ?"),n.push(r.title)),r.is_archived!==void 0&&(s.push("is_archived = ?"),n.push(r.is_archived?1:0)),s.push("updated_at = CURRENT_TIMESTAMP"),n.push(a,e.id),s.length<=1?t.json({error:"Nothing to update"},400):(await t.env.DB.prepare(`UPDATE threads SET ${s.join(", ")} WHERE id = ? AND user_id = ?`).bind(...n).run(),t.json({success:!0}))});L.delete("/threads/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(a,e.id).run(),await t.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});L.post("/upload",async t=>{const e=t.get("user");try{const r=(await t.req.formData()).get("file");if(!r)return t.json({error:"No file provided"},400);if(r.size>5*1024*1024)return t.json({error:"File too large. Maximum size is 5MB."},400);const s=await r.arrayBuffer(),n=btoa(String.fromCharCode(...new Uint8Array(s))),o=crypto.randomUUID();let i="";const l=r.type||"application/octet-stream";return(l.startsWith("text/")||l==="application/json"||l==="application/xml"||l==="text/csv")&&(i=new TextDecoder().decode(s).substring(0,2e3)),await t.env.DB.prepare(`INSERT INTO uploaded_files (id, user_id, name, mime_type, size, data_base64, text_preview, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`).bind(o,e.id,r.name,l,r.size,n,i).run(),t.json({file_id:o,name:r.name,type:l,size:r.size,text_preview:i?i.substring(0,500):""})}catch(a){return t.json({error:`Upload failed: ${a.message}`},500)}});L.post("/send",async t=>{const e=t.get("user"),{message:a,channel:r="web",thread_id:s,files:n}=await t.req.json();if(!a||typeof a!="string"||a.trim().length===0)return t.json({error:"Message is required"},400);let o="";if(n&&Array.isArray(n)&&n.length>0){o=`

[Attached files:
`;for(const d of n)o+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(o+=`
  Preview: ${d.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=s;if(!i){const d=await t.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(e.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();i=d==null?void 0:d.id}const l={userId:e.id,username:e.username,channel:r,text:a.trim()+o,sessionId:t.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:d,rotation:u,costGuard:h}=await Xe(t.env.DB,e.id,e.pin_hash),y=await Tt(l,t.env.DB,d,e,u,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID});return!s&&i?await t.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run():i&&await t.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),t.json({response:y,timestamp:new Date().toISOString(),channel:l.channel,provider:d.name,thread_id:i})}catch(d){console.error("Chat error:",d);const u=d.message||"";if(u.includes("No LLM provider configured"))return t.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400);if(u.includes("All LLM providers failed"))return t.json({error:u,type:"no_provider",thread_id:i},400);if(u.includes("limit reached"))return t.json({error:u,type:"cost_limit",thread_id:i},429);const h=u.includes("401")||u.includes("403")||u.includes("authentication")||u.includes("credit balance")||u.includes("invalid")&&u.includes("key");try{const{logError:y}=await Promise.resolve().then(()=>nt);await y(t.env.DB,e.id,"llm","chat_error",u)}catch{}return t.json({error:h?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:u,type:h?"no_provider":void 0,thread_id:i},h?400:500)}});function Pt(t){return`event: ${t.type}
data: ${JSON.stringify(t.data)}

`}L.post("/stream",async t=>{const e=t.get("user"),{message:a,channel:r="web",thread_id:s,files:n}=await t.req.json();if(!a||typeof a!="string"||a.trim().length===0)return t.json({error:"Message is required"},400);let o="";if(n&&Array.isArray(n)&&n.length>0){o=`

[Attached files:
`;for(const d of n)o+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(o+=`
  Preview: ${d.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=s;if(!i){const d=await t.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(e.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();i=d==null?void 0:d.id}const l={userId:e.id,username:e.username,channel:r,text:a.trim()+o,sessionId:t.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:d,rotation:u}=await Xe(t.env.DB,e.id,e.pin_hash),h=new ReadableStream({async start(y){const f=new TextEncoder;try{const b=es(l,t.env.DB,d,e,u,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID});for await(const _ of b)_.data.threadId||(_.data.threadId=i),y.enqueue(f.encode(Pt(_)));i&&await t.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),y.close()}catch(b){const _={type:"error",data:{error:b.message||"An error occurred",threadId:i}};y.enqueue(f.encode(Pt(_))),y.close()}}});return new Response(h,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(i||"")}})}catch(d){console.error("Stream setup error:",d);const u=d.message||"";return u.includes("No LLM provider configured")?t.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400):u.includes("limit reached")?t.json({error:u,type:"cost_limit",thread_id:i},429):t.json({error:"Something went wrong setting up the stream.",details:u,thread_id:i},500)}});L.get("/threads/:id/messages",async t=>{var n;const e=t.get("user"),a=parseInt(t.req.param("id")),r=parseInt(t.req.query("limit")||"50"),s=await t.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(e.id,a,r).all();return t.json({messages:(s.results||[]).reverse(),total:((n=s.results)==null?void 0:n.length)||0})});L.get("/history",async t=>{var l;const e=t.get("user"),a=parseInt(t.req.query("limit")||"50"),r=parseInt(t.req.query("offset")||"0"),s=t.req.query("thread_id");let n,o;s?(n=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[e.id,parseInt(s),a,r]):(n=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[e.id,a,r]);const i=await t.env.DB.prepare(n).bind(...o).all();return t.json({messages:(i.results||[]).reverse(),total:((l=i.results)==null?void 0:l.length)||0})});L.delete("/history",async t=>{const e=t.get("user"),a=t.req.query("thread_id");return a?await t.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(e.id,parseInt(a)).run():await t.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(e.id).run(),t.json({success:!0})});L.get("/dashboard",async t=>{const e=t.get("user"),a=new Date().toISOString().split("T")[0],[r,s,n,o,i,l,d]=await Promise.all([t.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(e.id).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(e.id).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(e.id).first(),t.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(e.id).all(),t.env.DB.prepare("SELECT provider, tokens_used, request_count FROM provider_usage WHERE user_id = ? AND usage_date = ?").bind(e.id,a).all(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(e.id).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(e.id).first()]);return t.json({threads:(r==null?void 0:r.cnt)||0,active_schedules:(s==null?void 0:s.cnt)||0,memories:(n==null?void 0:n.cnt)||0,recent_threads:o.results||[],provider_usage:i.results||[],unread_notifications:(l==null?void 0:l.cnt)||0,errors:(d==null?void 0:d.cnt)||0})});L.get("/gmail/unread",async t=>{const e=t.get("user");try{const a=t.env.GOOGLE_CLIENT_ID,r=t.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return t.json({count:null,reason:"google_not_configured"});const n=await new ge(t.env.DB,e.id,e.pin_hash,a,r).getUnreadCount();return t.json({count:n})}catch(a){return t.json({count:null,reason:a.message})}});L.get("/providers",async t=>{const e=t.get("user"),{ProviderRotation:a}=await Promise.resolve().then(()=>nt),r=new a(t.env.DB,e.id),s=await r.getUsageStats(),n=await r.getStatusText();return t.json({stats:s,statusText:n})});L.get("/notifications/count",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(e.id).first();return t.json({count:(a==null?void 0:a.cnt)||0})});L.get("/notifications",async t=>{const e=t.get("user"),a=parseInt(t.req.query("limit")||"20"),r=await t.env.DB.prepare(`SELECT id, type, title, body, is_read, source, action_url, created_at 
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(e.id,a).all();return t.json({notifications:r.results||[]})});L.put("/notifications/:id/read",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});L.put("/notifications/read-all",async t=>{const e=t.get("user");return await t.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(e.id).run(),t.json({success:!0})});L.delete("/notifications",async t=>{const e=t.get("user");return await t.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(e.id).run(),t.json({success:!0})});const $=new xe;async function as(t,e){var s;const a=(s=t.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!a)return t.json({error:"Authentication required"},401);const r=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return t.json({error:"Invalid session"},401);t.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),await e()}$.use("/*",as);$.get("/profile",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(e.id).first();return t.json({id:e.id,username:e.username,name:(a==null?void 0:a.name)||e.name,role:(a==null?void 0:a.role)||e.role,personality_prompt:(a==null?void 0:a.personality_prompt)||e.personality_prompt,telegram_chat_id:(a==null?void 0:a.telegram_chat_id)||e.telegram_chat_id,timezone:(a==null?void 0:a.timezone)||e.timezone,assistant_name:(a==null?void 0:a.assistant_name)||"Karna"})});$.put("/profile",async t=>{const e=t.get("user"),a=await t.req.json(),r=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],s=[],n=[];for(const o of r)a[o]!==void 0&&(s.push(`${o} = ?`),n.push(a[o]));return s.length===0?t.json({error:"No valid fields to update"},400):(s.push("updated_at = CURRENT_TIMESTAMP"),n.push(e.id),await t.env.DB.prepare(`UPDATE users SET ${s.join(", ")} WHERE id = ?`).bind(...n).run(),t.json({success:!0}))});const bt=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","outlook_email","outlook_password","outlook_email_2","outlook_password_2","steel_api_key","browser_use_api_key"];$.get("/credentials",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT id, service, label, created_at, updated_at FROM credentials WHERE user_id = ?").bind(e.id).all();return t.json({credentials:(a.results||[]).map(r=>({...r,configured:!0})),available_services:bt,llm_providers:qe})});$.put("/credentials",async t=>{const e=t.get("user"),{service:a,value:r,label:s}=await t.req.json();if(!a||!r)return t.json({error:"Service name and value are required"},400);if(!bt.includes(a))return t.json({error:`Invalid service. Must be one of: ${bt.join(", ")}`},400);const n=await xt(r,e.pin_hash);return await t.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(e.id,a,s||a,n).run(),t.json({success:!0,service:a})});$.delete("/credentials/:service",async t=>{const e=t.get("user"),a=t.req.param("service");return await t.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(e.id,a).run(),t.json({success:!0})});$.get("/memory",async t=>{const e=t.get("user"),a=t.req.query("type"),s=await new ue(t.env.DB).getAll(e.id,a||void 0,100);return t.json({memories:s})});$.post("/memory",async t=>{const e=t.get("user"),{type:a,title:r,content:s,importance:n}=await t.req.json();return!a||!r||!s?t.json({error:"Type, title, and content are required"},400):(await new ue(t.env.DB).store(e.id,a,r,s,n||5),t.json({success:!0}))});$.delete("/memory/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await new ue(t.env.DB).remove(a,e.id),t.json({success:!0})});$.get("/schedules",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(e.id).all();return t.json({schedules:a.results||[]})});$.put("/schedules/:id/toggle",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),{enabled:r}=await t.req.json();return await t.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r?1:0,a,e.id).run(),t.json({success:!0})});$.delete("/schedules/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});$.get("/errors",async t=>{const e=t.get("user"),a=await t.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(e.id).all();return t.json({errors:a.results||[]})});$.delete("/errors",async t=>{const e=t.get("user");return await t.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(e.id).run(),t.json({success:!0})});$.post("/credentials/validate",async t=>{const e=t.get("user"),{service:a,value:r}=await t.req.json();if(!a||!r)return t.json({error:"Service and value required"},400);const s=new se(t.env.DB,e.id);switch(a){case"steel_api_key":{const n=await s.validateSteelKey(r);return t.json(n)}case"browser_use_api_key":{const n=await s.validateBrowserUseKey(r);return t.json(n)}case"anthropic":try{const n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return n.ok?t.json({valid:!0,message:"Anthropic API key is valid."}):n.status===401?t.json({valid:!1,message:"Invalid Anthropic API key."}):t.json({valid:!1,message:`Anthropic responded with status ${n.status}.`})}catch(n){return t.json({valid:!1,message:`Connection failed: ${n.message}`})}case"openai":try{const n=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${r}`}});return n.ok?t.json({valid:!0,message:"OpenAI API key is valid."}):n.status===401?t.json({valid:!1,message:"Invalid OpenAI API key."}):t.json({valid:!1,message:`OpenAI responded with status ${n.status}.`})}catch(n){return t.json({valid:!1,message:`Connection failed: ${n.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const n=JSON.parse(r);if(!n.provider||!n.apiKey)return t.json({valid:!1,message:"Missing provider or API key."});const o=qe[n.provider];if(!o)return t.json({valid:!1,message:`Unknown provider: ${n.provider}`});if(o.apiFormat==="anthropic"){const i=await fetch(o.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":n.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:o.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return i.ok?t.json({valid:!0,message:`${o.label} API key is valid.`}):i.status===401?t.json({valid:!1,message:`Invalid ${o.label} API key.`}):t.json({valid:!1,message:`${o.label} responded with status ${i.status}.`})}else{const i=o.apiBase+(o.validatePath||"/v1/models"),l=await fetch(i,{headers:{Authorization:`Bearer ${n.apiKey}`}});if(l.ok)return t.json({valid:!0,message:`${o.label} API key is valid.`});if(l.status===401||l.status===403)return t.json({valid:!1,message:`Invalid ${o.label} API key.`});if(l.status===404)try{const d=await fetch(o.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.apiKey}`},body:JSON.stringify({model:o.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return d.ok||d.status===200?t.json({valid:!0,message:`${o.label} API key is valid.`}):d.status===401||d.status===403?t.json({valid:!1,message:`Invalid ${o.label} API key.`}):t.json({valid:!1,message:`${o.label} responded with status ${d.status}.`})}catch(d){return t.json({valid:!1,message:`${o.label} chat test failed: ${d.message}`})}return t.json({valid:!1,message:`${o.label} responded with status ${l.status}.`})}}catch(n){return n instanceof SyntaxError?t.json({valid:!1,message:"Invalid slot data format."}):t.json({valid:!1,message:`Connection failed: ${n.message}`})}case"google_oauth_client":return t.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});default:return t.json({valid:!0,message:"Saved (validation not available for this service)."})}});$.get("/google/status",async t=>{const e=t.get("user");try{const a=await Et(t.env.DB,e.id,e.pin_hash),r=_a(t.env.GOOGLE_CLIENT_ID,t.env.GOOGLE_CLIENT_SECRET);return t.json({...a,oauth_client_configured:r})}catch(a){return t.json({connected:!1,error:a.message})}});$.get("/google/auth-url",async t=>{var e;t.get("user");try{const a=t.env.GOOGLE_CLIENT_ID,r=t.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return t.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const s=new URL(t.req.url),n=`${s.protocol}//${s.host}/auth/google/callback`,o=btoa(JSON.stringify({sessionId:(e=t.req.header("Authorization"))==null?void 0:e.replace("Bearer ",""),ts:Date.now()})),i=va(a,n,o);return t.json({auth_url:i,redirect_uri:n})}catch(a){return t.json({error:`Failed to generate auth URL: ${a.message}`},500)}});$.post("/google/disconnect",async t=>{const e=t.get("user");try{return await Ea(t.env.DB,e.id),t.json({success:!0,message:"Google account disconnected."})}catch(a){return t.json({error:a.message},500)}});$.post("/google/test",async t=>{const e=t.get("user");try{const{token:a,email:r}=await Le(t.env.DB,e.id,e.pin_hash,t.env.GOOGLE_CLIENT_ID,t.env.GOOGLE_CLIENT_SECRET),s=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${a}`}}),n=!0,o=s.ok;return t.json({success:!0,email:r,scopes:{sheets:n,calendar:o,docs:n,drive:n},message:o?`Connected as ${r} — all services working.`:`Connected as ${r} — calendar access issue (${s.status}).`})}catch(a){return t.json({success:!1,error:a.message})}});$.get("/features",async t=>{const e=t.get("user"),a=t.req.query("status");let r="SELECT * FROM feature_requests WHERE user_id = ?";const s=[e.id];a&&a!=="all"&&(r+=" AND status = ?",s.push(a)),r+=" ORDER BY created_at DESC LIMIT 50";const n=await t.env.DB.prepare(r).bind(...s).all();return t.json({features:n.results||[]})});$.put("/features/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id")),r=await t.req.json(),s=["status","implementation_notes","priority"],n=[],o=[];for(const i of s)r[i]!==void 0&&(n.push(`${i} = ?`),o.push(r[i]));return n.length===0?t.json({error:"No valid fields to update"},400):(n.push("updated_at = CURRENT_TIMESTAMP"),o.push(a,e.id),await t.env.DB.prepare(`UPDATE feature_requests SET ${n.join(", ")} WHERE id = ? AND user_id = ?`).bind(...o).run(),t.json({success:!0}))});$.delete("/features/:id",async t=>{const e=t.get("user"),a=parseInt(t.req.param("id"));return await t.env.DB.prepare("DELETE FROM feature_requests WHERE id = ? AND user_id = ?").bind(a,e.id).run(),t.json({success:!0})});$.post("/features",async t=>{const e=t.get("user"),{title:a,description:r,priority:s,category:n}=await t.req.json();return!a||!r?t.json({error:"Title and description required"},400):(await t.env.DB.prepare("INSERT INTO feature_requests (user_id, title, description, priority, category, proposed_by) VALUES (?, ?, ?, ?, ?, 'user')").bind(e.id,a,r,s||"medium",n||"general").run(),t.json({success:!0}))});const Me=new xe;Me.get("/health",async t=>{try{const e=Date.now();await t.env.DB.prepare("SELECT 1").first();const a=Date.now()-e;return t.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:a,version:"3.1.0"})}catch{return t.json({status:"error",error:"Database unreachable"},500)}});Me.post("/heartbeat",async t=>{try{const e=Date.now();await t.env.DB.prepare("SELECT 1").first();const a=Date.now()-e;return await t.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",a,JSON.stringify({timestamp:new Date().toISOString()})).run(),await t.env.DB.prepare(`DELETE FROM heartbeat_log WHERE id NOT IN (
        SELECT id FROM heartbeat_log ORDER BY created_at DESC LIMIT 1000
      )`).run(),t.json({status:"ok",latency_ms:a})}catch(e){return t.json({status:"error",error:e.message},500)}});Me.get("/status",async t=>{var d;const e=(d=t.req.header("Authorization"))==null?void 0:d.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const r=a.user_id,[s,n,o,i,l]=await Promise.all([t.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),t.env.DB.prepare("SELECT status, latency_ms, created_at FROM heartbeat_log ORDER BY created_at DESC LIMIT 1").first(),t.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first()]);return t.json({active_schedules:(s==null?void 0:s.cnt)||0,memory_entries:(n==null?void 0:n.cnt)||0,total_messages:(o==null?void 0:o.cnt)||0,unread_errors:(l==null?void 0:l.cnt)||0,heartbeat:i||{status:"unknown"},version:"3.1.0"})});async function rs(t,e,a,r){try{const s=await t.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(e).first();if(!s)return;const n=await U(s.encrypted_value,s.pin_hash),o=4e3,i=r.length>o?r.substring(0,o-3)+"...":r;(await fetch(`https://api.telegram.org/bot${n}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:i,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${n}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:i})})}catch{}}function ss(t){const e=new Date().toLocaleString("en-US",{timeZone:t});return new Date(e)}Me.post("/cron/execute",async t=>{const e=t.req.header("X-Cron-Secret")||"",a=t.env.CRON_SECRET||"karna-cron-default-v1";if(e!==a)return t.json({error:"Unauthorized"},401);const r=new Date,s=r.toISOString();try{await t.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:s})).run()}catch{}const n=await t.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')`).bind(s).all(),o=[];for(const i of n.results||[])try{const l=i.user_timezone||"UTC";let d;if(i.schedule_type==="interval"){const y=parseInt(i.schedule_value,10);d=new Date(r.getTime()+y*60*1e3)}else if(i.schedule_type==="daily"){const[y,f]=i.schedule_value.split(":").map(Number),b=ss(l),_=new Date(b);_.setHours(y,f,0,0),_<=b&&_.setDate(_.getDate()+1);const x=new Date(_.toLocaleString("en-US",{timeZone:"UTC"})),c=new Date(_.toLocaleString("en-US",{timeZone:l})),p=x.getTime()-c.getTime();d=new Date(_.getTime()+p)}else d=new Date(r.getTime()+3600*1e3);await t.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,d.toISOString(),i.id).run();const h=(JSON.parse(i.action_config||"{}").description||i.description)&&(i.action_type==="check_mail"||i.action_type==="check_calendar"||i.action_type==="check_sheet"||i.action_type==="custom");o.push({job_id:i.id,name:i.name,status:"dispatched",needs_agent:h,next_run:d.toISOString()})}catch(l){o.push({job_id:i.id,name:i.name,status:"error",error:l.message})}return t.json({executed:o.length,results:o,timestamp:s})});Me.post("/cron/run-task/:jobId",async t=>{const e=t.req.header("X-Cron-Secret")||"",a=t.env.CRON_SECRET||"karna-cron-default-v1";if(e!==a)return t.json({error:"Unauthorized"},401);const r=parseInt(t.req.param("jobId"),10);if(!r)return t.json({error:"Invalid job ID"},400);const s=await t.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(r).first();if(!s)return t.json({error:"Job not found"},404);const o=JSON.parse(s.action_config||"{}").description||s.description||"",i="⏰ "+(s.name||"Scheduled Task"),l=new Date().toISOString();let d="";try{const y={id:s.user_id,username:s.username||"user",name:s.user_name||"User",pin_hash:s.pin_hash||"",role:s.user_role||"",personality_prompt:s.personality_prompt||"",telegram_chat_id:s.telegram_chat_id||"",timezone:s.user_timezone||"UTC",assistant_name:s.assistant_name||"Karna",created_at:"",updated_at:""},f={userId:s.user_id,username:y.username,channel:"web",text:`[Scheduled task "${s.name}"]: ${o}. Respond with a short, clean plain-text summary. No markdown headers, no bold markers. Use simple numbered lines.`,sessionId:"cron-"+s.id,timestamp:l},{provider:b,rotation:_}=await Xe(t.env.DB,s.user_id,s.pin_hash);d=await Tt(f,t.env.DB,b,y,_,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID})}catch(y){const f=y.message||"unknown error",b=f.includes("rate_limit")||f.includes("429")||f.includes("quota"),_=f.includes("timeout")||f.includes("Timeout");b?d="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":_?d="Task timed out. Will retry at next scheduled time.":d="Task encountered an error. Will retry at next scheduled time.",await S(t.env.DB,s.user_id,"cron_agent","execution_error",f,{job_id:s.id})}const u=d||o||"Time for your scheduled task.",h=i+`
`+u;return await t.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(s.user_id,"reminder",i,u,"cron:"+s.id).run(),await t.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(s.user_id,"system","assistant",h,JSON.stringify({type:"cron",job_id:s.id})).run(),s.telegram_chat_id&&await rs(t.env.DB,s.user_id,s.telegram_chat_id,h),t.json({job_id:r,status:"completed",response_length:d.length})});function ns(t,e,a,r){return{userId:t,username:e,channel:"telegram",text:a,sessionId:`telegram-${r}`,timestamp:new Date().toISOString()}}function os(t,e){return t.replace(/\*\*(.*?)\*\*/g,"*$1*").replace(/#{1,3}\s/g,"*").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const Ze=new xe,is=4e3;async function K(t,e,a,r="Markdown"){var n,o;const s=ds(a,is);for(const i of s)try{const l=await fetch(`https://api.telegram.org/bot${t}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e,text:i,parse_mode:r,disable_web_page_preview:!1})});if(!l.ok){const d=await l.json().catch(()=>null);((n=d==null?void 0:d.description)!=null&&n.includes("parse")||(o=d==null?void 0:d.description)!=null&&o.includes("entities"))&&await fetch(`https://api.telegram.org/bot${t}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e,text:i})})}}catch{}}async function ls(t,e){try{await fetch(`https://api.telegram.org/bot${t}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:e,action:"typing"})})}catch{}}function ds(t,e){if(t.length<=e)return[t];const a=[];let r=t;for(;r.length>0;){if(r.length<=e){a.push(r);break}let s=r.lastIndexOf(`
`,e);s<e*.3&&(s=r.lastIndexOf(" ",e)),s<e*.3&&(s=e),a.push(r.substring(0,s)),r=r.substring(s).trimStart()}return a}async function cs(t,e,a,r,s){switch(t.split("@")[0].toLowerCase()){case"/start":{const o=(r==null?void 0:r.name)||"there",i=(r==null?void 0:r.assistant_name)||"Karna",l=`👋 *Hello, ${o}!*

I'm ${i}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/new — Start a fresh conversation

Just type normally to chat. Everything works — schedules, memory, Gmail, Google Workspace, and more.`+(r?"":`

⚠️ Your Telegram chat ID is *${e}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`);return await K(a,e,l),!0}case"/help":{const i=`🛠 *${(r==null?void 0:r.assistant_name)||"Karna"} — Commands*

/start — Welcome message
/help — This help text
/status — System status & stats
/new — Start new conversation thread

*What I can do:*
• Manage your schedule and reminders
• Read and send Gmail
• Google Sheets, Calendar, Docs, Drive
• Check Outlook mail
• Search places, get directions
• Translate text, search YouTube
• Browse the web
• Remember important things about you

Just type naturally — I'll figure out the rest.`;return await K(a,e,i),!0}case"/status":{if(!r)return await K(a,e,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app."),!0;try{const[o,i,l,d]=await Promise.all([s.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r.id).first(),s.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r.id).first(),s.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(r.id).first(),s.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(r.id).first()]),u=`📊 *System Status*

Active tasks: ${(o==null?void 0:o.cnt)||0}
Memories: ${(i==null?void 0:i.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(d==null?void 0:d.cnt)||0}

Status: ✅ Online`;await K(a,e,u)}catch{await K(a,e,"✅ Online — but had trouble fetching stats.")}return!0}case"/new":return r?(await K(a,e,"🆕 Starting fresh conversation. Your next message begins a new thread."),!0):(await K(a,e,"⚠️ Account not linked."),!0);default:return!1}}Ze.post("/webhook",async t=>{var e,a,r;try{const n=(await t.req.json()).message;if(!(n!=null&&n.text))return t.json({ok:!0});const o=String(n.chat.id),i=n.text,l=await t.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(o).first();let d=null;if(l){const f=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(l.id,"telegram_bot_token").first();f&&(d=await U(f.encrypted_value,l.pin_hash))}if(!d){const f=await t.env.DB.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
         JOIN users u ON c.user_id = u.id 
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();f&&(d=await U(f.encrypted_value,f.pin_hash))}if(!d)return t.json({ok:!0,message:"Bot token not configured"});if(i.startsWith("/")&&await cs(i,o,d,l,t.env.DB))return t.json({ok:!0});if(!l)return await K(d,o,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${o}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`),t.json({ok:!0});await ls(d,o);const u=ns(l.id,l.username,i,o);let h,y;try{const f=await Xe(t.env.DB,l.id,l.pin_hash);h=f.provider,y=f.rotation}catch(f){console.error("Telegram provider setup error:",f);const b=(e=f.message)!=null&&e.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(a=f.message)!=null&&a.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${f.message||"Unknown error"}`;return await K(d,o,b),t.json({ok:!0})}try{const f=await Tt(u,t.env.DB,h,l,y,{GOOGLE_CLIENT_ID:t.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:t.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:t.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:t.env.GOOGLE_CSE_ID}),b=os(f,"telegram");await K(d,o,b||"(empty response)")}catch(f){console.error("Telegram agent error:",f);const b=(r=f.message)!=null&&r.includes("API error")?`⚠️ AI provider returned an error. The provider (${h.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(f.message||"Unknown").substring(0,200)}`;await K(d,o,b);try{const{logError:_}=await Promise.resolve().then(()=>nt);await _(t.env.DB,l.id,"telegram","agent_error",f.message||"Agent error",{provider:h.name})}catch{}}return t.json({ok:!0})}catch(s){console.error("Telegram webhook error:",s);try{const{logError:n}=await Promise.resolve().then(()=>nt);await n(t.env.DB,null,"telegram","webhook_error",s.message||"Unknown telegram error")}catch{}return t.json({ok:!0,error:s.message})}});Ze.post("/setup-webhook",async t=>{var l;const e=(l=t.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const{webhook_url:r}=await t.req.json(),s=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!s)return t.json({error:"Telegram bot token not configured in Settings"},400);const n=await U(s.encrypted_value,a.pin_hash);if(!r){const u=await(await fetch(`https://api.telegram.org/bot${n}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return t.json(u)}const i=await(await fetch(`https://api.telegram.org/bot${n}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r,allowed_updates:["message"],drop_pending_updates:!1})})).json();return t.json(i)});Ze.get("/webhook-status",async t=>{var n,o,i,l,d,u;const e=(n=t.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const r=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return t.json({configured:!1,error:"Bot token not set"});const s=await U(r.encrypted_value,a.pin_hash);try{const y=await(await fetch(`https://api.telegram.org/bot${s}/getWebhookInfo`)).json();return t.json({configured:!0,webhook_url:((o=y.result)==null?void 0:o.url)||"",has_webhook:!!((i=y.result)!=null&&i.url),pending_updates:((l=y.result)==null?void 0:l.pending_update_count)||0,last_error:((d=y.result)==null?void 0:d.last_error_message)||"",last_error_date:((u=y.result)==null?void 0:u.last_error_date)||null})}catch(h){return t.json({configured:!0,error:h.message})}});Ze.post("/detect-chat-id",async t=>{var n,o;const e=(n=t.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!e)return t.json({error:"Auth required"},401);const a=await t.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(e).first();if(!a)return t.json({error:"Invalid session"},401);const r=await t.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return t.json({error:"Bot token not configured"},400);const s=await U(r.encrypted_value,a.pin_hash);try{const d=((o=(await(await fetch(`https://api.telegram.org/bot${s}/getWebhookInfo`)).json()).result)==null?void 0:o.url)||"";await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(x=>setTimeout(x,500));const h=await(await fetch(`https://api.telegram.org/bot${s}/getUpdates?limit=10&timeout=0`)).json();d&&await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:d,allowed_updates:["message"]})});const y=h.result||[];if(y.length===0)return t.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const f=[],b=new Set;for(let x=y.length-1;x>=0;x--){const c=y[x].message;if(c&&c.chat){const p=String(c.chat.id);b.has(p)||(b.add(p),f.push({chat_id:p,name:[c.chat.first_name,c.chat.last_name].filter(Boolean).join(" ")||c.chat.title||"Unknown",username:c.chat.username||"",date:new Date((c.date||0)*1e3).toISOString()}))}}if(f.length===0)return t.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const _=f[0].chat_id;return await t.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(_,a.user_id).run(),t.json({found:!0,chat_id:_,name:f[0].name,all_chats:f,message:`Chat ID ${_} detected and saved to your profile.`})}catch(i){return t.json({error:`Detection failed: ${i.message}`},500)}});const V=new xe;V.use("/api/*",vr());V.route("/api/auth",pe);V.route("/api/chat",L);V.route("/api/settings",$);V.route("/api/system",Me);V.route("/api/telegram",Ze);V.get("/auth/google/callback",async t=>{const e=new URL(t.req.url),a=e.searchParams.get("code"),r=e.searchParams.get("state"),s=e.searchParams.get("error");if(s)return t.html(Te(!1,`Google denied access: ${s}`));if(!a||!r)return t.html(Te(!1,"Missing authorization code or state parameter."));try{const o=JSON.parse(atob(r)).sessionId;if(!o)return t.html(Te(!1,"Invalid state parameter — missing session."));const i=await t.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(o).first();if(!i)return t.html(Te(!1,"Session expired. Please log in again and retry."));const l=i.user_id,d=i.pin_hash,u=`${e.protocol}//${e.host}/auth/google/callback`,h=await xa(t.env.DB,l,d,a,u,t.env.GOOGLE_CLIENT_ID,t.env.GOOGLE_CLIENT_SECRET);return t.html(Te(!0,`Connected as ${h.email}`,h.email))}catch(n){return t.html(Te(!1,`OAuth failed: ${n.message}`))}});V.get("/",t=>(t.header("Cache-Control","no-cache, no-store, must-revalidate"),t.header("Pragma","no-cache"),t.header("Expires","0"),t.html(la())));V.get("*",t=>t.req.path.startsWith("/api/")?t.json({error:"Not found"},404):(t.header("Cache-Control","no-cache, no-store, must-revalidate"),t.header("Pragma","no-cache"),t.header("Expires","0"),t.html(la())));function Te(t,e,a){return`<!DOCTYPE html>
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
</body></html>`}const us={fetch:V.fetch},Ut=new xe,ps=Object.assign({"/src/index.tsx":us});let La=!1;for(const[,t]of Object.entries(ps))t&&(Ut.all("*",e=>{let a;try{a=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,a)}),Ut.notFound(e=>{let a;try{a=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,a)}),La=!0);if(!La)throw new Error("Can't import modules from ['/src/index.tsx']");export{Ut as default};
