var Za=Object.defineProperty;var Bt=e=>{throw TypeError(e)};var Qa=(e,t,a)=>t in e?Za(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var k=(e,t,a)=>Qa(e,typeof t!="symbol"?t+"":t,a),vt=(e,t,a)=>t.has(e)||Bt("Cannot "+a);var b=(e,t,a)=>(vt(e,t,"read from private field"),a?a.call(e):t.get(e)),O=(e,t,a)=>t.has(e)?Bt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),D=(e,t,a,r)=>(vt(e,t,"write to private field"),r?r.call(e,a):t.set(e,a),a),L=(e,t,a)=>(vt(e,t,"access private method"),a);var jt=(e,t,a,r)=>({set _(n){D(e,t,n,a)},get _(){return b(e,t,r)}});var Pt=(e,t,a)=>(r,n)=>{let s=-1;return o(0);async function o(i){if(i<=s)throw new Error("next() called multiple times");s=i;let l,c=!1,u;if(e[i]?(u=e[i][0][0],r.req.routeIndex=i):u=i===e.length&&n||void 0,u)try{l=await u(r,()=>o(i+1))}catch(h){if(h instanceof Error&&t)r.error=h,l=await t(h,r),c=!0;else throw h}else r.finalized===!1&&a&&(l=await a(r));return l&&(r.finalized===!1||c)&&(r.res=l),r}},er=Symbol(),tr=async(e,t=Object.create(null))=>{const{all:a=!1,dot:r=!1}=t,s=(e instanceof ia?e.raw.headers:e.headers).get("Content-Type");return s!=null&&s.startsWith("multipart/form-data")||s!=null&&s.startsWith("application/x-www-form-urlencoded")?ar(e,{all:a,dot:r}):{}};async function ar(e,t){const a=await e.formData();return a?rr(a,t):{}}function rr(e,t){const a=Object.create(null);return e.forEach((r,n)=>{t.all||n.endsWith("[]")?nr(a,n,r):a[n]=r}),t.dot&&Object.entries(a).forEach(([r,n])=>{r.includes(".")&&(sr(a,r,n),delete a[r])}),a}var nr=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},sr=(e,t,a)=>{let r=e;const n=t.split(".");n.forEach((s,o)=>{o===n.length-1?r[s]=a:((!r[s]||typeof r[s]!="object"||Array.isArray(r[s])||r[s]instanceof File)&&(r[s]=Object.create(null)),r=r[s])})},aa=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},or=e=>{const{groups:t,path:a}=ir(e),r=aa(a);return lr(r,t)},ir=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,r)=>{const n=`@${r}`;return t.push([n,a]),n}),{groups:t,path:e}},lr=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[r]=t[a];for(let n=e.length-1;n>=0;n--)if(e[n].includes(r)){e[n]=e[n].replace(r,t[a][1]);break}}return e},at={},cr=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const r=`${e}#${t}`;return at[r]||(a[2]?at[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:at[r]=[e,a[1],!0]),at[r]}return null},Rt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},dr=e=>Rt(e,decodeURI),ra=e=>{const t=e.url,a=t.indexOf("/",t.indexOf(":")+4);let r=a;for(;r<t.length;r++){const n=t.charCodeAt(r);if(n===37){const s=t.indexOf("?",r),o=t.indexOf("#",r),i=s===-1?o===-1?void 0:o:o===-1?s:Math.min(s,o),l=t.slice(a,i);return dr(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(n===63||n===35)break}return t.slice(a,r)},ur=e=>{const t=ra(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Oe=(e,t,...a)=>(a.length&&(t=Oe(t,...a)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),na=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let r="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){a.length===0&&r===""?a.push("/"):a.push(r);const s=n.replace("?","");r+="/"+s,a.push(r)}else r+="/"+n}),a.filter((n,s,o)=>o.indexOf(n)===s)},bt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Rt(e,oa):e):e,sa=(e,t,a)=>{let r;if(!a&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const i=e.charCodeAt(o+t.length+1);if(i===61){const l=o+t.length+2,c=e.indexOf("&",l);return bt(e.slice(l,c===-1?void 0:c))}else if(i==38||isNaN(i))return"";o=e.indexOf(`&${t}`,o+1)}if(r=/[%+]/.test(e),!r)return}const n={};r??(r=/[%+]/.test(e));let s=e.indexOf("?",8);for(;s!==-1;){const o=e.indexOf("&",s+1);let i=e.indexOf("=",s);i>o&&o!==-1&&(i=-1);let l=e.slice(s+1,i===-1?o===-1?void 0:o:i);if(r&&(l=bt(l)),s=o,l==="")continue;let c;i===-1?c="":(c=e.slice(i+1,o===-1?void 0:o),r&&(c=bt(c))),a?(n[l]&&Array.isArray(n[l])||(n[l]=[]),n[l].push(c)):n[l]??(n[l]=c)}return t?n[t]:n},pr=sa,mr=(e,t)=>sa(e,t,!0),oa=decodeURIComponent,Ut=e=>Rt(e,oa),Le,K,ce,la,ca,Tt,ue,Vt,ia=(Vt=class{constructor(e,t="/",a=[[]]){O(this,ce);k(this,"raw");O(this,Le);O(this,K);k(this,"routeIndex",0);k(this,"path");k(this,"bodyCache",{});O(this,ue,e=>{const{bodyCache:t,raw:a}=this,r=t[e];if(r)return r;const n=Object.keys(t)[0];return n?t[n].then(s=>(n==="json"&&(s=JSON.stringify(s)),new Response(s)[e]())):t[e]=a[e]()});this.raw=e,this.path=t,D(this,K,a),D(this,Le,{})}param(e){return e?L(this,ce,la).call(this,e):L(this,ce,ca).call(this)}query(e){return pr(this.url,e)}queries(e){return mr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,r)=>{t[r]=a}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await tr(this,e))}json(){return b(this,ue).call(this,"text").then(e=>JSON.parse(e))}text(){return b(this,ue).call(this,"text")}arrayBuffer(){return b(this,ue).call(this,"arrayBuffer")}blob(){return b(this,ue).call(this,"blob")}formData(){return b(this,ue).call(this,"formData")}addValidatedData(e,t){b(this,Le)[e]=t}valid(e){return b(this,Le)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[er](){return b(this,K)}get matchedRoutes(){return b(this,K)[0].map(([[,e]])=>e)}get routePath(){return b(this,K)[0].map(([[,e]])=>e)[this.routeIndex].path}},Le=new WeakMap,K=new WeakMap,ce=new WeakSet,la=function(e){const t=b(this,K)[0][this.routeIndex][1][e],a=L(this,ce,Tt).call(this,t);return a&&/\%/.test(a)?Ut(a):a},ca=function(){const e={},t=Object.keys(b(this,K)[0][this.routeIndex][1]);for(const a of t){const r=L(this,ce,Tt).call(this,b(this,K)[0][this.routeIndex][1][a]);r!==void 0&&(e[a]=/\%/.test(r)?Ut(r):r)}return e},Tt=function(e){return b(this,K)[1]?b(this,K)[1][e]:e},ue=new WeakMap,Vt),hr={Stringify:1},da=async(e,t,a,r,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const s=e.callbacks;return s!=null&&s.length?(n?n[0]+=e:n=[e],Promise.all(s.map(i=>i({phase:t,buffer:n,context:r}))).then(i=>Promise.all(i.filter(Boolean).map(l=>da(l,t,!1,r,n))).then(()=>n[0]))):Promise.resolve(e)},gr="text/plain; charset=UTF-8",wt=(e,t)=>({"Content-Type":e,...t}),Je,Ye,se,Ne,oe,W,Ve,$e,Me,_e,Xe,Ze,pe,Re,Xt,fr=(Xt=class{constructor(e,t){O(this,pe);O(this,Je);O(this,Ye);k(this,"env",{});O(this,se);k(this,"finalized",!1);k(this,"error");O(this,Ne);O(this,oe);O(this,W);O(this,Ve);O(this,$e);O(this,Me);O(this,_e);O(this,Xe);O(this,Ze);k(this,"render",(...e)=>(b(this,$e)??D(this,$e,t=>this.html(t)),b(this,$e).call(this,...e)));k(this,"setLayout",e=>D(this,Ve,e));k(this,"getLayout",()=>b(this,Ve));k(this,"setRenderer",e=>{D(this,$e,e)});k(this,"header",(e,t,a)=>{this.finalized&&D(this,W,new Response(b(this,W).body,b(this,W)));const r=b(this,W)?b(this,W).headers:b(this,_e)??D(this,_e,new Headers);t===void 0?r.delete(e):a!=null&&a.append?r.append(e,t):r.set(e,t)});k(this,"status",e=>{D(this,Ne,e)});k(this,"set",(e,t)=>{b(this,se)??D(this,se,new Map),b(this,se).set(e,t)});k(this,"get",e=>b(this,se)?b(this,se).get(e):void 0);k(this,"newResponse",(...e)=>L(this,pe,Re).call(this,...e));k(this,"body",(e,t,a)=>L(this,pe,Re).call(this,e,t,a));k(this,"text",(e,t,a)=>!b(this,_e)&&!b(this,Ne)&&!t&&!a&&!this.finalized?new Response(e):L(this,pe,Re).call(this,e,t,wt(gr,a)));k(this,"json",(e,t,a)=>L(this,pe,Re).call(this,JSON.stringify(e),t,wt("application/json",a)));k(this,"html",(e,t,a)=>{const r=n=>L(this,pe,Re).call(this,n,t,wt("text/html; charset=UTF-8",a));return typeof e=="object"?da(e,hr.Stringify,!1,{}).then(r):r(e)});k(this,"redirect",(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)});k(this,"notFound",()=>(b(this,Me)??D(this,Me,()=>new Response),b(this,Me).call(this,this)));D(this,Je,e),t&&(D(this,oe,t.executionCtx),this.env=t.env,D(this,Me,t.notFoundHandler),D(this,Ze,t.path),D(this,Xe,t.matchResult))}get req(){return b(this,Ye)??D(this,Ye,new ia(b(this,Je),b(this,Ze),b(this,Xe))),b(this,Ye)}get event(){if(b(this,oe)&&"respondWith"in b(this,oe))return b(this,oe);throw Error("This context has no FetchEvent")}get executionCtx(){if(b(this,oe))return b(this,oe);throw Error("This context has no ExecutionContext")}get res(){return b(this,W)||D(this,W,new Response(null,{headers:b(this,_e)??D(this,_e,new Headers)}))}set res(e){if(b(this,W)&&e){e=new Response(e.body,e);for(const[t,a]of b(this,W).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=b(this,W).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of r)e.headers.append("set-cookie",n)}else e.headers.set(t,a)}D(this,W,e),this.finalized=!0}get var(){return b(this,se)?Object.fromEntries(b(this,se)):{}}},Je=new WeakMap,Ye=new WeakMap,se=new WeakMap,Ne=new WeakMap,oe=new WeakMap,W=new WeakMap,Ve=new WeakMap,$e=new WeakMap,Me=new WeakMap,_e=new WeakMap,Xe=new WeakMap,Ze=new WeakMap,pe=new WeakSet,Re=function(e,t,a){const r=b(this,W)?new Headers(b(this,W).headers):b(this,_e)??new Headers;if(typeof t=="object"&&"headers"in t){const s=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,i]of s)o.toLowerCase()==="set-cookie"?r.append(o,i):r.set(o,i)}if(a)for(const[s,o]of Object.entries(a))if(typeof o=="string")r.set(s,o);else{r.delete(s);for(const i of o)r.append(s,i)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??b(this,Ne);return new Response(e,{status:n,headers:r})},Xt),P="ALL",yr="all",vr=["get","post","put","delete","options","patch"],ua="Can not add a route since the matcher is already built.",pa=class extends Error{},br="__COMPOSED_HANDLER",wr=e=>e.text("404 Not Found",404),Gt=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},V,U,ma,X,be,st,ot,Be,_r=(Be=class{constructor(t={}){O(this,U);k(this,"get");k(this,"post");k(this,"put");k(this,"delete");k(this,"options");k(this,"patch");k(this,"all");k(this,"on");k(this,"use");k(this,"router");k(this,"getPath");k(this,"_basePath","/");O(this,V,"/");k(this,"routes",[]);O(this,X,wr);k(this,"errorHandler",Gt);k(this,"onError",t=>(this.errorHandler=t,this));k(this,"notFound",t=>(D(this,X,t),this));k(this,"fetch",(t,...a)=>L(this,U,ot).call(this,t,a[1],a[0],t.method));k(this,"request",(t,a,r,n)=>t instanceof Request?this.fetch(a?new Request(t,a):t,r,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Oe("/",t)}`,a),r,n)));k(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(L(this,U,ot).call(this,t.request,t,void 0,t.request.method))})});[...vr,yr].forEach(s=>{this[s]=(o,...i)=>(typeof o=="string"?D(this,V,o):L(this,U,be).call(this,s,b(this,V),o),i.forEach(l=>{L(this,U,be).call(this,s,b(this,V),l)}),this)}),this.on=(s,o,...i)=>{for(const l of[o].flat()){D(this,V,l);for(const c of[s].flat())i.map(u=>{L(this,U,be).call(this,c.toUpperCase(),b(this,V),u)})}return this},this.use=(s,...o)=>(typeof s=="string"?D(this,V,s):(D(this,V,"*"),o.unshift(s)),o.forEach(i=>{L(this,U,be).call(this,P,b(this,V),i)}),this);const{strict:r,...n}=t;Object.assign(this,n),this.getPath=r??!0?t.getPath??ra:ur}route(t,a){const r=this.basePath(t);return a.routes.map(n=>{var o;let s;a.errorHandler===Gt?s=n.handler:(s=async(i,l)=>(await Pt([],a.errorHandler)(i,()=>n.handler(i,l))).res,s[br]=n.handler),L(o=r,U,be).call(o,n.method,n.path,s)}),this}basePath(t){const a=L(this,U,ma).call(this);return a._basePath=Oe(this._basePath,t),a}mount(t,a,r){let n,s;r&&(typeof r=="function"?s=r:(s=r.optionHandler,r.replaceRequest===!1?n=l=>l:n=r.replaceRequest));const o=s?l=>{const c=s(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};n||(n=(()=>{const l=Oe(this._basePath,t),c=l==="/"?0:l.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(c)||"/",new Request(h,u)}})());const i=async(l,c)=>{const u=await a(n(l.req.raw),...o(l));if(u)return u;await c()};return L(this,U,be).call(this,P,Oe(t,"*"),i),this}},V=new WeakMap,U=new WeakSet,ma=function(){const t=new Be({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,D(t,X,b(this,X)),t.routes=this.routes,t},X=new WeakMap,be=function(t,a,r){t=t.toUpperCase(),a=Oe(this._basePath,a);const n={basePath:this._basePath,path:a,method:t,handler:r};this.router.add(t,a,[r,n]),this.routes.push(n)},st=function(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t},ot=function(t,a,r,n){if(n==="HEAD")return(async()=>new Response(null,await L(this,U,ot).call(this,t,a,r,"GET")))();const s=this.getPath(t,{env:r}),o=this.router.match(n,s),i=new fr(t,{path:s,matchResult:o,env:r,executionCtx:a,notFoundHandler:b(this,X)});if(o[0].length===1){let c;try{c=o[0][0][0][0](i,async()=>{i.res=await b(this,X).call(this,i)})}catch(u){return L(this,U,st).call(this,u,i)}return c instanceof Promise?c.then(u=>u||(i.finalized?i.res:b(this,X).call(this,i))).catch(u=>L(this,U,st).call(this,u,i)):c??b(this,X).call(this,i)}const l=Pt(o[0],this.errorHandler,b(this,X));return(async()=>{try{const c=await l(i);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return L(this,U,st).call(this,c,i)}})()},Be),ha=[];function xr(e,t){const a=this.buildAllMatchers(),r=((n,s)=>{const o=a[n]||a[P],i=o[2][s];if(i)return i;const l=s.match(o[0]);if(!l)return[[],ha];const c=l.indexOf("",1);return[o[1][c],l]});return this.match=r,r(e,t)}var lt="[^/]+",We=".*",qe="(?:|/.*)",Ae=Symbol(),Er=new Set(".\\+*[^]$()");function Tr(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===We||e===qe?1:t===We||t===qe?-1:e===lt?1:t===lt?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var xe,Ee,Z,Se,kr=(Se=class{constructor(){O(this,xe);O(this,Ee);O(this,Z,Object.create(null))}insert(t,a,r,n,s){if(t.length===0){if(b(this,xe)!==void 0)throw Ae;if(s)return;D(this,xe,a);return}const[o,...i]=t,l=o==="*"?i.length===0?["","",We]:["","",lt]:o==="/*"?["","",qe]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const u=l[1];let h=l[2]||lt;if(u&&l[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw Ae;if(c=b(this,Z)[h],!c){if(Object.keys(b(this,Z)).some(y=>y!==We&&y!==qe))throw Ae;if(s)return;c=b(this,Z)[h]=new Se,u!==""&&D(c,Ee,n.varIndex++)}!s&&u!==""&&r.push([u,b(c,Ee)])}else if(c=b(this,Z)[o],!c){if(Object.keys(b(this,Z)).some(u=>u.length>1&&u!==We&&u!==qe))throw Ae;if(s)return;c=b(this,Z)[o]=new Se}c.insert(i,a,r,n,s)}buildRegExpStr(){const a=Object.keys(b(this,Z)).sort(Tr).map(r=>{const n=b(this,Z)[r];return(typeof b(n,Ee)=="number"?`(${r})@${b(n,Ee)}`:Er.has(r)?`\\${r}`:r)+n.buildRegExpStr()});return typeof b(this,xe)=="number"&&a.unshift(`#${b(this,xe)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},xe=new WeakMap,Ee=new WeakMap,Z=new WeakMap,Se),dt,Qe,Zt,Sr=(Zt=class{constructor(){O(this,dt,{varIndex:0});O(this,Qe,new kr)}insert(e,t,a){const r=[],n=[];for(let o=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const c=`@\\${o}`;return n[o]=[c,l],o++,i=!0,c}),!i)break}const s=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=n.length-1;o>=0;o--){const[i]=n[o];for(let l=s.length-1;l>=0;l--)if(s[l].indexOf(i)!==-1){s[l]=s[l].replace(i,n[o][1]);break}}return b(this,Qe).insert(s,t,r,b(this,dt),a),r}buildRegExp(){let e=b(this,Qe).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,s,o)=>s!==void 0?(a[++t]=Number(s),"$()"):(o!==void 0&&(r[Number(o)]=++t),"")),[new RegExp(`^${e}`),a,r]}},dt=new WeakMap,Qe=new WeakMap,Zt),Ir=[/^$/,[],Object.create(null)],it=Object.create(null);function ga(e){return it[e]??(it[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function Dr(){it=Object.create(null)}function Cr(e){var c;const t=new Sr,a=[];if(e.length===0)return Ir;const r=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[y,v])=>u?1:y?-1:h.length-v.length),n=Object.create(null);for(let u=0,h=-1,y=r.length;u<y;u++){const[v,f,x]=r[u];v?n[f]=[x.map(([E])=>[E,Object.create(null)]),ha]:h++;let _;try{_=t.insert(f,h,v)}catch(E){throw E===Ae?new pa(f):E}v||(a[h]=x.map(([E,d])=>{const g=Object.create(null);for(d-=1;d>=0;d--){const[p,m]=_[d];g[p]=m}return[E,g]}))}const[s,o,i]=t.buildRegExp();for(let u=0,h=a.length;u<h;u++)for(let y=0,v=a[u].length;y<v;y++){const f=(c=a[u][y])==null?void 0:c[1];if(!f)continue;const x=Object.keys(f);for(let _=0,E=x.length;_<E;_++)f[x[_]]=i[f[x[_]]]}const l=[];for(const u in o)l[u]=a[o[u]];return[s,l,n]}function De(e,t){if(e){for(const a of Object.keys(e).sort((r,n)=>n.length-r.length))if(ga(a).test(t))return[...e[a]]}}var me,he,ut,fa,Qt,Or=(Qt=class{constructor(){O(this,ut);k(this,"name","RegExpRouter");O(this,me);O(this,he);k(this,"match",xr);D(this,me,{[P]:Object.create(null)}),D(this,he,{[P]:Object.create(null)})}add(e,t,a){var i;const r=b(this,me),n=b(this,he);if(!r||!n)throw new Error(ua);r[e]||[r,n].forEach(l=>{l[e]=Object.create(null),Object.keys(l[P]).forEach(c=>{l[e][c]=[...l[P][c]]})}),t==="/*"&&(t="*");const s=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=ga(t);e===P?Object.keys(r).forEach(c=>{var u;(u=r[c])[t]||(u[t]=De(r[c],t)||De(r[P],t)||[])}):(i=r[e])[t]||(i[t]=De(r[e],t)||De(r[P],t)||[]),Object.keys(r).forEach(c=>{(e===P||e===c)&&Object.keys(r[c]).forEach(u=>{l.test(u)&&r[c][u].push([a,s])})}),Object.keys(n).forEach(c=>{(e===P||e===c)&&Object.keys(n[c]).forEach(u=>l.test(u)&&n[c][u].push([a,s]))});return}const o=na(t)||[t];for(let l=0,c=o.length;l<c;l++){const u=o[l];Object.keys(n).forEach(h=>{var y;(e===P||e===h)&&((y=n[h])[u]||(y[u]=[...De(r[h],u)||De(r[P],u)||[]]),n[h][u].push([a,s-c+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(b(this,he)).concat(Object.keys(b(this,me))).forEach(t=>{e[t]||(e[t]=L(this,ut,fa).call(this,t))}),D(this,me,D(this,he,void 0)),Dr(),e}},me=new WeakMap,he=new WeakMap,ut=new WeakSet,fa=function(e){const t=[];let a=e===P;return[b(this,me),b(this,he)].forEach(r=>{const n=r[e]?Object.keys(r[e]).map(s=>[s,r[e][s]]):[];n.length!==0?(a||(a=!0),t.push(...n)):e!==P&&t.push(...Object.keys(r[P]).map(s=>[s,r[P][s]]))}),a?Cr(t):null},Qt),ge,ie,ea,Rr=(ea=class{constructor(e){k(this,"name","SmartRouter");O(this,ge,[]);O(this,ie,[]);D(this,ge,e.routers)}add(e,t,a){if(!b(this,ie))throw new Error(ua);b(this,ie).push([e,t,a])}match(e,t){if(!b(this,ie))throw new Error("Fatal error");const a=b(this,ge),r=b(this,ie),n=a.length;let s=0,o;for(;s<n;s++){const i=a[s];try{for(let l=0,c=r.length;l<c;l++)i.add(...r[l]);o=i.match(e,t)}catch(l){if(l instanceof pa)continue;throw l}this.match=i.match.bind(i),D(this,ge,[i]),D(this,ie,void 0);break}if(s===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(b(this,ie)||b(this,ge).length!==1)throw new Error("No active router has been determined yet.");return b(this,ge)[0]}},ge=new WeakMap,ie=new WeakMap,ea),He=Object.create(null),fe,F,Te,je,H,le,we,Pe,Ar=(Pe=class{constructor(t,a,r){O(this,le);O(this,fe);O(this,F);O(this,Te);O(this,je,0);O(this,H,He);if(D(this,F,r||Object.create(null)),D(this,fe,[]),t&&a){const n=Object.create(null);n[t]={handler:a,possibleKeys:[],score:0},D(this,fe,[n])}D(this,Te,[])}insert(t,a,r){D(this,je,++jt(this,je)._);let n=this;const s=or(a),o=[];for(let i=0,l=s.length;i<l;i++){const c=s[i],u=s[i+1],h=cr(c,u),y=Array.isArray(h)?h[0]:c;if(y in b(n,F)){n=b(n,F)[y],h&&o.push(h[1]);continue}b(n,F)[y]=new Pe,h&&(b(n,Te).push(h),o.push(h[1])),n=b(n,F)[y]}return b(n,fe).push({[t]:{handler:r,possibleKeys:o.filter((i,l,c)=>c.indexOf(i)===l),score:b(this,je)}}),n}search(t,a){var l;const r=[];D(this,H,He);let s=[this];const o=aa(a),i=[];for(let c=0,u=o.length;c<u;c++){const h=o[c],y=c===u-1,v=[];for(let f=0,x=s.length;f<x;f++){const _=s[f],E=b(_,F)[h];E&&(D(E,H,b(_,H)),y?(b(E,F)["*"]&&r.push(...L(this,le,we).call(this,b(E,F)["*"],t,b(_,H))),r.push(...L(this,le,we).call(this,E,t,b(_,H)))):v.push(E));for(let d=0,g=b(_,Te).length;d<g;d++){const p=b(_,Te)[d],m=b(_,H)===He?{}:{...b(_,H)};if(p==="*"){const A=b(_,F)["*"];A&&(r.push(...L(this,le,we).call(this,A,t,b(_,H))),D(A,H,m),v.push(A));continue}const[w,T,S]=p;if(!h&&!(S instanceof RegExp))continue;const I=b(_,F)[w],R=o.slice(c).join("/");if(S instanceof RegExp){const A=S.exec(R);if(A){if(m[T]=A[0],r.push(...L(this,le,we).call(this,I,t,b(_,H),m)),Object.keys(b(I,F)).length){D(I,H,m);const N=((l=A[0].match(/\//))==null?void 0:l.length)??0;(i[N]||(i[N]=[])).push(I)}continue}}(S===!0||S.test(h))&&(m[T]=h,y?(r.push(...L(this,le,we).call(this,I,t,m,b(_,H))),b(I,F)["*"]&&r.push(...L(this,le,we).call(this,b(I,F)["*"],t,m,b(_,H)))):(D(I,H,m),v.push(I)))}}s=v.concat(i.shift()??[])}return r.length>1&&r.sort((c,u)=>c.score-u.score),[r.map(({handler:c,params:u})=>[c,u])]}},fe=new WeakMap,F=new WeakMap,Te=new WeakMap,je=new WeakMap,H=new WeakMap,le=new WeakSet,we=function(t,a,r,n){const s=[];for(let o=0,i=b(t,fe).length;o<i;o++){const l=b(t,fe)[o],c=l[a]||l[P],u={};if(c!==void 0&&(c.params=Object.create(null),s.push(c),r!==He||n&&n!==He))for(let h=0,y=c.possibleKeys.length;h<y;h++){const v=c.possibleKeys[h],f=u[c.score];c.params[v]=n!=null&&n[v]&&!f?n[v]:r[v]??(n==null?void 0:n[v]),u[c.score]=!0}}return s},Pe),ke,ta,Lr=(ta=class{constructor(){k(this,"name","TrieRouter");O(this,ke);D(this,ke,new Ar)}add(e,t,a){const r=na(t);if(r){for(let n=0,s=r.length;n<s;n++)b(this,ke).insert(e,r[n],a);return}b(this,ke).insert(e,t,a)}match(e,t){return b(this,ke).search(e,t)}},ke=new WeakMap,ta),ye=class extends _r{constructor(e={}){super(e),this.router=e.router??new Rr({routers:[new Or,new Lr]})}},Nr=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},r=(s=>typeof s=="string"?s==="*"?()=>s:o=>s===o?o:null:typeof s=="function"?s:o=>s.includes(o)?o:null)(a.origin),n=(s=>typeof s=="function"?s:Array.isArray(s)?()=>s:()=>[])(a.allowMethods);return async function(o,i){var u;function l(h,y){o.res.headers.set(h,y)}const c=await r(o.req.header("origin")||"",o);if(c&&l("Access-Control-Allow-Origin",c),a.credentials&&l("Access-Control-Allow-Credentials","true"),(u=a.exposeHeaders)!=null&&u.length&&l("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),o.req.method==="OPTIONS"){a.origin!=="*"&&l("Vary","Origin"),a.maxAge!=null&&l("Access-Control-Max-Age",a.maxAge.toString());const h=await n(o.req.header("origin")||"",o);h.length&&l("Access-Control-Allow-Methods",h.join(","));let y=a.allowHeaders;if(!(y!=null&&y.length)){const v=o.req.header("Access-Control-Request-Headers");v&&(y=v.split(/\s*,\s*/))}return y!=null&&y.length&&(l("Access-Control-Allow-Headers",y.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await i(),a.origin!=="*"&&o.header("Vary","Origin",{append:!0})}};function ya(){return`<!DOCTYPE html>
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
    .overlay-panel { width:480px; max-width:100%; height:100%; background:var(--bg-elevated); border-right:1px solid var(--border); padding:0; overflow:hidden; animation:slideIn 0.25s ease; display:flex; flex-direction:column; padding-top:var(--safe-top); }
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
    .tab { padding:10px 12px; font-size:12px; font-weight:500; color:var(--text-muted); cursor:pointer; border-bottom:2px solid transparent; transition:all 0.2s; white-space:nowrap; min-height:40px; display:flex; align-items:center; }
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

    /* === Documents View === */
    .documents-container { max-width:900px; margin:0 auto; padding:24px; }
    .documents-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
    .documents-title { font-size:20px; font-weight:600; color:var(--text-primary); }
    .documents-upload-area { border:2px dashed var(--border); border-radius:12px; padding:40px; text-align:center; background:var(--bg-elevated); transition:border-color 0.2s; }
    .documents-upload-area:hover { border-color:var(--accent); }
    .documents-upload-area.dragover { border-color:var(--accent); background:var(--accent-dim); }
    .documents-upload-btn { background:var(--accent); color:#0a0a0a; border:none; padding:12px 28px; border-radius:8px; font-weight:600; cursor:pointer; margin-top:16px; }
    .documents-list { display:grid; gap:12px; margin-top:24px; }
    .document-card { background:var(--bg-elevated); border:1px solid var(--border); border-radius:10px; padding:16px; display:flex; gap:16px; align-items:flex-start; }
    .document-icon { font-size:32px; flex-shrink:0; }
    .document-info { flex:1; }
    .document-name { font-weight:500; color:var(--text-primary); margin-bottom:4px; }
    .document-meta { font-size:12px; color:var(--text-muted); }
    .document-summary { font-size:13px; color:var(--text-secondary); margin-top:8px; line-height:1.5; }
    .document-actions { display:flex; gap:8px; margin-top:12px; }
    .document-btn { background:var(--bg-hover); border:none; color:var(--text-secondary); padding:6px 12px; border-radius:6px; cursor:pointer; font-size:12px; transition:all 0.2s; }
    .document-btn:hover { background:var(--accent-dim); color:var(--accent); }
    .documents-search { display:flex; gap:12px; margin-bottom:20px; }
    .documents-search input { flex:1; background:var(--bg-elevated); border:1px solid var(--border); color:var(--text-primary); padding:10px 16px; border-radius:8px; font-size:14px; }
    .documents-chat-area { background:var(--bg-elevated); border:1px solid var(--border); border-radius:10px; padding:16px; margin-top:16px; max-height:300px; overflow-y:auto; }
    .documents-chat-msg { margin-bottom:12px; font-size:13px; }
    .documents-chat-msg.user { color:var(--accent); }
    .documents-chat-msg.assistant { color:var(--text-secondary); }
    .documents-chat-input { display:flex; gap:8px; margin-top:12px; }
    .documents-chat-input input { flex:1; background:var(--bg); border:1px solid var(--border); color:var(--text-primary); padding:10px; border-radius:6px; }
    .documents-comparison { background:var(--bg-elevated); border:1px solid var(--border); border-radius:10px; padding:20px; margin-top:16px; }
    .status-badge { display:inline-block; padding:2px 8px; border-radius:12px; font-size:11px; margin-left:8px; }
    .status-badge.processing { background:var(--warning); color:#000; }
    .status-badge.completed { background:var(--success); color:#000; }
    .status-badge.failed { background:var(--danger); color:#fff; }
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
      if (!data || data.error) { renderLogin(container); } else if (!data.hasUsers) { renderSetup(container); } else { renderLogin(container); }
    }).catch(function(err) {
      console.error('Auth check error:', err);
      renderLogin(container);
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
              '<div class="tab" data-tab="proactive">Proactive</div>' +
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
    // documentsBtn removed in v4
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
    } else if (state.view === 'documents') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = 'Documents';
      renderDocumentsView(mc);
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
        case 'proactive': return await renderProactiveTab(content);
        // features tab removed in v4
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
      { title:'GOOGLE WORKSPACE', desc:'OAuth 2.0 for Sheets, Calendar, Docs, Drive, and Gmail.', items:[], custom_after:'google_oauth_section' },
      { title:'GOOGLE API KEY', desc:'Maps, Places, Directions, Translate, YouTube.', items:[
        {key:'google_api_key',label:'Google API Key',placeholder:'AIzaSy...'}
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
  // PROACTIVE INTELLIGENCE TAB
  // ============================================================

  async function renderProactiveTab(container) {
    container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">Loading proactive settings...</div>';
    
    // Fetch triggers, briefings, and preferences
    var triggersData = await api('/proactive/triggers');
    var briefingsData = await api('/proactive/briefings?limit=5');
    var prefsData = await api('/proactive/briefing-preferences');
    var triggers = triggersData.triggers || [];
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
    html += '<div style="margin-bottom:20px;padding:16px;border:1px solid var(--border);border-radius:8px;background:var(--bg-elevated);">';
    // Briefing enabled toggle
    var briefingEnabled = prefs.briefingEnabled !== false; // default true
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">';
    html += '<div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);">📋 Briefing at ' + escapeHtml(prefs.briefingTime || '20:00') + '</div>';
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
      '';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="comp_gmail" ' + (prefs.components.gmail ? 'checked' : '') + '> Gmail Summary</label>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="comp_tasks" ' + (prefs.components.tasks ? 'checked' : '') + '> Tasks Overview</label>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="comp_weather" ' + (prefs.components.weather ? 'checked' : '') + '> Weather Forecast</label>';
    
    html += '</div>';
    html += '</div>';
    
    // News & Updates with topics text box
    html += '<div style="margin-bottom:12px;padding:10px;border:1px solid var(--border);border-radius:6px;background:var(--bg);">';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;margin-bottom:8px;">' +
      '<input type="checkbox" id="comp_news" ' + (prefs.components.news ? 'checked' : '') + '> News & Updates</label>';
    html += '<div style="margin-left:22px;">';
    html += '<label style="display:block;font-size:11px;color:var(--text-muted);margin-bottom:4px;">News Topics (max 5, comma-separated)</label>';
    html += '<input type="text" id="newsTopics" value="' + escapeHtml(prefs.newsTopics.join(', ')) + '" placeholder="e.g., AI, LLM, Agentic Workflows" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:13px;">';
    html += '<div style="font-size:10px;color:var(--text-muted);margin-top:4px;">Default: AI, LLM, Tools, Agentic Workflows, AI Features</div>';
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
    html += '<button class="btn btn-small" style="background:var(--accent);color:#0a0a0a;font-weight:600;" onclick="saveBriefingPreferences()">Save Preferences</button>';
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
        html += '<span class="tag">' + checkedCount + '/' + totalCount + ' checked</span></div>';
        html += '</div>';
        html += '<button class="btn btn-small btn-danger" style="margin-left:12px;padding:4px 8px;min-width:auto;" onclick="deleteBriefing(' + b.id + ')" title="Delete Briefing">&times;</button>';
        html += '</div>';
      }
      html += '</div>';
    }
    
    // === Custom Triggers Section ===
    html += '<div style="margin-bottom:20px;">';
    html += '<div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">⚡ Custom Triggers</div>';
    html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">Get notified when emails or calendar events match your patterns.</div>';
    
    if (triggers.length === 0) {
      html += '<div style="font-size:13px;color:var(--text-muted);padding:12px;border:1px dashed var(--border);border-radius:8px;text-align:center;">' +
        'No triggers configured.<br><button class="btn btn-small" style="margin-top:8px;" onclick="initDefaultTriggers()">Add Default Triggers</button></div>';
    } else {
      for (var t = 0; t < triggers.length; t++) {
        var trigger = triggers[t];
        html += '<div class="item-card">';
        html += '<div class="item-card-header">';
        html += '<span class="item-card-title">' + escapeHtml(trigger.name) + '</span>';
        html += '<span class="tag" style="' + (trigger.enabled ? '' : 'opacity:0.5;') + '">' + (trigger.enabled ? 'Active' : 'Disabled') + '</span>';
        html += '</div>';
        html += '<div class="item-card-body" style="font-size:12px;margin-top:4px;">';
        html += 'Type: ' + trigger.type.replace(/_/g, ' ') + ' | Triggered: ' + (trigger.trigger_count || 0) + ' times';
        html += '</div>';
        html += '<div style="margin-top:8px;display:flex;gap:8px;">';
        html += '<button class="btn btn-small" onclick="toggleTriggerEnabled(' + trigger.id + ',' + !trigger.enabled + ')">' + (trigger.enabled ? 'Disable' : 'Enable') + '</button>';
        html += '<button class="btn btn-small btn-danger" onclick="deleteTriggerItem(' + trigger.id + ')">Delete</button>';
        html += '</div>';
        html += '</div>';
      }
    }
    
    // Add trigger button
    html += '<button class="btn btn-small" style="margin-top:8px;" onclick="showAddTriggerForm()">+ Add Trigger</button>';
    html += '<div id="addTriggerForm" style="display:none;margin-top:12px;padding:12px;border:1px solid var(--border);border-radius:8px;">';
    html += '<div class="field"><label>Name</label><input type="text" id="triggerName" placeholder="My Custom Trigger"></div>';
    html += '<div class="field"><label>Type</label><select id="triggerType"><option value="email_content">Email Content</option><option value="calendar_event">Calendar Event</option><option value="time_based">Time Based</option></select></div>';
    html += '<div class="field"><label>Keywords (comma-separated)</label><input type="text" id="triggerKeywords" placeholder="urgent, meeting, deadline"></div>';
    html += '<div style="display:flex;gap:8px;"><button class="btn btn-small" onclick="saveTrigger()">Save</button><button class="btn btn-small" onclick="hideAddTriggerForm()">Cancel</button></div>';
    html += '</div>';
    html += '</div>';
    
    // === Meeting Reminders ===
    html += '<div style="padding:12px;border:1px solid var(--border);border-radius:8px;background:var(--bg-elevated);">';
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
  
  window.deleteBriefing = async function(id) {
    if (!confirm('Are you sure you want to delete this briefing?')) return;
    try {
      await api('/proactive/briefings/' + id, { method: 'DELETE' });
      renderSettingsTab(); // refresh proactive tab
    } catch (e) {
      showToast('Failed to delete briefing', 'error');
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
      renderSettingsTab();
    } catch (e) {
      showToast('Failed to update', 'error');
    }
  };

  window.generateBriefingNow = async function() {
    showToast('Generating briefing...', '');
    var result = await api('/proactive/briefings/generate', {method:'POST'});
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast('Briefing generated!', 'success');
    renderSettingsTab();
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
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">📅 Tomorrow&apos;s Schedule</h3>';
        var googleEvents = content.calendar.google || [];
        var allEvents = googleEvents;
        for (var e = 0; e < allEvents.length; e++) {
          var evt = allEvents[e];
          var time = evt.startTime ? new Date(evt.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
          html += '<div style="margin-bottom:12px;padding:12px;background:var(--bg);border-radius:8px;border-left:3px solid var(--accent);">';
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
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">📧 Email Summary</h3>';
        
        if (content.emails && content.emails.gmail && content.emails.gmail.unreadCount > 0) {
          html += '<div style="margin-bottom:12px;padding:12px;background:var(--bg);border-radius:8px;">';
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
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">✅ Tasks</h3>';
        html += '<div style="font-size:14px;color:var(--text-secondary);margin-bottom:8px;">' + content.tasks.pending + ' pending • ' + content.tasks.dueToday + ' due soon</div>';
        if (content.tasks.items && content.tasks.items.length > 0) {
          for (var t = 0; t < content.tasks.items.length; t++) {
            html += '<div style="padding:8px 12px;background:var(--bg);border-radius:6px;margin-bottom:6px;font-size:13px;">• ' + escapeHtml(content.tasks.items[t]) + '</div>';
          }
        }
        html += '</div>';
      }
      
      // News
      if (content.news && content.news.items && content.news.items.length > 0) {
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">🤖 AI & Tech News</h3>';
        for (var n = 0; n < content.news.items.length; n++) {
          var newsItem = content.news.items[n];
          html += '<div style="margin-bottom:12px;padding:12px;background:var(--bg);border-radius:8px;">';
          html += '<a href="' + escapeHtml(newsItem.url) + '" target="_blank" style="font-size:14px;font-weight:500;color:var(--accent);text-decoration:none;display:block;margin-bottom:4px;">' + escapeHtml(newsItem.title) + ' ↗</a>';
          html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">' + escapeHtml(newsItem.summary) + '</div>';
          html += '<div style="font-size:11px;color:var(--text-muted);">Source: ' + escapeHtml(newsItem.source) + '</div>';
          html += '</div>';
        }
        html += '</div>';
      }
      
      // Interactive Checklist
      if (items.length > 0) {
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border);">';
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
    renderSettingsTab();
  };
  
  window.toggleTriggerEnabled = async function(id, enabled) {
    await api('/proactive/triggers/' + id, {method:'PUT', body:JSON.stringify({enabled:enabled})});
    renderSettingsTab();
  };
  
  window.deleteTriggerItem = async function(id) {
    if (!confirm('Delete this trigger?')) return;
    await api('/proactive/triggers/' + id, {method:'DELETE'});
    renderSettingsTab();
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
    renderSettingsTab();
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
          '<div style="background:var(--bg-hover);height:4px;border-radius:2px;overflow:hidden;">' +
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
          html += '<div style="background:var(--bg);padding:12px;border-radius:8px;">' +
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
          html += '<div style="background:var(--bg);padding:12px;border-radius:8px;margin-bottom:12px;">' +
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
</html>`}const At="AES-GCM",$r=256;async function va(e){const t=new TextEncoder,a=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},a,{name:At,length:$r},!1,["encrypt","decrypt"])}async function Lt(e,t){const a=await va(t),r=crypto.getRandomValues(new Uint8Array(12)),n=new TextEncoder,s=await crypto.subtle.encrypt({name:At,iv:r},a,n.encode(e)),o=new Uint8Array(r.length+new Uint8Array(s).length);return o.set(r),o.set(new Uint8Array(s),r.length),btoa(String.fromCharCode(...o))}async function M(e,t){const a=await va(t),r=new Uint8Array(atob(e).split("").map(i=>i.charCodeAt(0))),n=r.slice(0,12),s=r.slice(12),o=await crypto.subtle.decrypt({name:At,iv:n},a,s);return new TextDecoder().decode(o)}async function pt(e){const a=new TextEncoder().encode(e+"karna-pin-salt"),r=await crypto.subtle.digest("SHA-256",a);return btoa(String.fromCharCode(...new Uint8Array(r)))}async function ba(e,t){return await pt(e)===t}const Mr=Object.freeze(Object.defineProperty({__proto__:null,decrypt:M,encrypt:Lt,hashPin:pt,verifyPin:ba},Symbol.toStringTag,{value:"Module"})),ve=new ye;ve.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});ve.post("/setup",async e=>{const{username:t,name:a,pin:r,personality_prompt:n,timezone:s}=await e.req.json();if(!t||!a||!r)return e.json({error:"Username, name, and PIN are required"},400);if(r.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const i=await pt(r);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,a,i,n||"",s||"Asia/Kolkata").run();const l=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),c=crypto.randomUUID(),u=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(c,l.id,"web",u).run(),e.json({success:!0,sessionId:c,user:{id:l.id,username:l.username,name:l.name}})});ve.post("/login",async e=>{const{username:t,pin:a}=await e.req.json();if(!t||!a)return e.json({error:"Username and PIN required"},400);const r=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!r)return e.json({error:"User not found"},404);if(!await ba(a,r.pin_hash))return e.json({error:"Invalid PIN"},401);const s=crypto.randomUUID(),o=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(s,r.id,"web",o).run(),e.json({success:!0,sessionId:s,user:{id:r.id,username:r.username,name:r.name}})});ve.post("/logout",async e=>{var a;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});ve.get("/users/hints",async e=>{const a=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(r=>{var n;return{username:r.username,name_hint:r.name.split(" ")[0],created:((n=r.created_at)==null?void 0:n.split(" ")[0])||""}});return e.json({users:a,count:a.length})});ve.post("/reset-pin",async e=>{var i;const{username:t,name:a,new_pin:r}=await e.req.json();if(!t||!a||!r)return e.json({error:"Username, display name, and new PIN are required"},400);if(r.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const n=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!n)return e.json({error:"User not found"},404);if(n.name.toLowerCase().trim()!==a.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const s=await pt(r);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,n.id).run();const o=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(n.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(n.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((i=o.meta)==null?void 0:i.changes)||0})});ve.get("/me",async e=>{var r;const t=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return a?e.json({user:{id:a.uid,username:a.username,name:a.name,role:a.role,timezone:a.timezone}}):e.json({error:"Invalid or expired session"},401)});const Ke={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}};async function C(e,t,a,r,n,s={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,a,r,n,JSON.stringify(s)).run()}catch(o){console.error("Failed to log error:",o)}}class wa{constructor(t,a="claude-sonnet-4-20250514",r="https://api.anthropic.com",n="anthropic"){k(this,"name");k(this,"apiKey");k(this,"model");k(this,"apiBase");this.apiKey=t,this.model=a,this.apiBase=r,this.name=n}async chat(t,a){var u,h,y,v;const r=t.find(f=>f.role==="system"),n=t.filter(f=>f.role!=="system"),s={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:n.map(f=>({role:f.role,content:f.content}))};r&&(s.system=r.content),a!=null&&a.tools&&a.tools.length>0&&(s.tools=a.tools.map(f=>({name:f.name,description:f.description,input_schema:f.parameters})));const o=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)});if(!o.ok){const f=await o.text();throw new Error(this.name+" API error "+o.status+": "+f)}const i=await o.json(),l=((u=i.content)==null?void 0:u.filter(f=>f.type==="text"))||[],c=((h=i.content)==null?void 0:h.filter(f=>f.type==="tool_use"))||[];return{content:l.map(f=>f.text).join(`
`),toolCalls:c.map(f=>({id:f.id,name:f.name,arguments:f.input})),usage:{promptTokens:((y=i.usage)==null?void 0:y.input_tokens)||0,completionTokens:((v=i.usage)==null?void 0:v.output_tokens)||0}}}async streamChat(t,a){const r=t.find(c=>c.role==="system"),n=t.filter(c=>c.role!=="system"),s={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:n.map(c=>({role:c.role,content:c.content}))};r&&(s.system=r.content);const o=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)});if(!o.ok){const c=await o.text();throw new Error(this.name+" stream error "+o.status+": "+c)}const i=o.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(c){var f;const{done:u,value:h}=await i.read();if(u){c.close();return}const v=l.decode(h,{stream:!0}).split(`
`);for(const x of v)if(x.startsWith("data: ")){const _=x.slice(6);if(_==="[DONE]")continue;try{const E=JSON.parse(_);E.type==="content_block_delta"&&((f=E.delta)!=null&&f.text)&&c.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:E.delta.text})+`

`))}catch{}}}})}}function Br(e){const t={},a=e||{};if(t.type=a.type||"object",t.type==="object"){const r=a.properties;if(r&&typeof r=="object"&&Object.keys(r).length>0){const n={};for(const[s,o]of Object.entries(r))o&&typeof o=="object"?n[s]=kt(o):n[s]=o;t.properties=n}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(a.required)?t.required=a.required:t.required=[]}return a.description&&(t.description=a.description),t}function kt(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const a=t.properties;if(a&&typeof a=="object"&&Object.keys(a).length>0){const r={};for(const[n,s]of Object.entries(a))s&&typeof s=="object"?r[n]=kt(s):r[n]=s;t.properties=r}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=kt(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class _a{constructor(t,a,r,n){k(this,"name");k(this,"apiKey");k(this,"model");k(this,"apiBase");this.apiKey=t,this.model=a,this.apiBase=r.replace(/\/+$/,""),this.name=n}async chat(t,a){var l,c,u,h,y,v;const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:t.map(f=>({role:f.role,content:f.content}))},n=this.apiBase.includes("routellm.abacus.ai");a!=null&&a.tools&&a.tools.length>0&&!n&&(r.tools=a.tools.map(f=>({type:"function",function:{name:f.name,description:f.description,parameters:Br(f.parameters||{})}})));const s=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)});if(!s.ok){const f=await s.text();throw new Error(this.name+" API error "+s.status+": "+f)}const o=await s.json(),i=(l=o.choices)==null?void 0:l[0];return{content:((c=i==null?void 0:i.message)==null?void 0:c.content)||"",toolCalls:(h=(u=i==null?void 0:i.message)==null?void 0:u.tool_calls)==null?void 0:h.map(f=>({id:f.id,name:f.function.name,arguments:typeof f.function.arguments=="string"?JSON.parse(f.function.arguments||"{}"):f.function.arguments||{}})),usage:{promptTokens:((y=o.usage)==null?void 0:y.prompt_tokens)||0,completionTokens:((v=o.usage)==null?void 0:v.completion_tokens)||0}}}async streamChat(t,a){const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:t.map(i=>({role:i.role,content:i.content}))},n=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)});if(!n.ok){const i=await n.text();throw new Error(this.name+" stream error "+n.status+": "+i)}const s=n.body.getReader(),o=new TextDecoder;return new ReadableStream({async pull(i){var y,v,f;const{done:l,value:c}=await s.read();if(l){i.close();return}const h=o.decode(c,{stream:!0}).split(`
`);for(const x of h)if(x.startsWith("data: ")){const _=x.slice(6);if(_==="[DONE]")continue;try{const d=(f=(v=(y=JSON.parse(_).choices)==null?void 0:y[0])==null?void 0:v.delta)==null?void 0:f.content;d&&i.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:d})+`

`))}catch{}}}})}}function St(e,t,a,r){const n=Ke[e];if(!n)throw new Error(`Unknown LLM provider: ${e}`);const s=r||n.defaultModel;return n.apiFormat==="anthropic"?new wa(t,s,n.apiBase,a):new _a(t,s,n.apiBase,a)}class xa{constructor(){k(this,"errorLog",new Map);k(this,"usageLog",new Map)}async pickProvider(t){const a=Date.now(),r=t.filter(n=>{const s=this.errorLog.get(n);return s?s.cooldownUntil<=a:!0});return r.length>0?r[0]:null}async recordUsage(t,a){const r=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:r.tokens+a,requests:r.requests+1})}async recordError(t,a,r=5){this.errorLog.set(t,{error:a,cooldownUntil:Date.now()+r*60*1e3})}}const jr=["llm_slot_1","llm_slot_2","llm_slot_3"],Pr=["anthropic","openai"];async function et(e,t,a){const{decrypt:r}=await Promise.resolve().then(()=>Mr),n=new xa,s=[];for(const h of jr){const y=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,h).first();if(y)try{const v=await r(y.encrypted_value,a),f=JSON.parse(v);if(f.provider&&f.apiKey&&Ke[f.provider]){const _=f.provider,E=St(f.provider,f.apiKey,_,f.model);s.push({name:_,provider:E})}}catch(v){console.error(`Failed to load ${h}:`,v)}}const o=new Set(s.map(h=>h.name));for(const h of Pr){if(o.has(h))continue;const y=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,h).first();if(y)try{const v=await r(y.encrypted_value,a);if(Ke[h]){const x=St(h,v,h);s.push({name:h,provider:x})}}catch{console.error(`Failed to decrypt legacy ${h} key`)}}if(s.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const i=s.map(h=>h.name),l=await n.pickProvider(i);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:s[0].provider,rotation:n};const c=s.find(h=>h.name===l);return{provider:Ur(c.provider,s,n),rotation:n}}function Ur(e,t,a){return t.length<=1?e:{name:e.name,async chat(r,n){try{return await e.chat(r,n)}catch(s){const o=s.message||"";if(!(o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")))throw s;console.warn(`Provider ${e.name} auth/billing error, trying fallback...`),await a.recordError(e.name,o,1440);const l=t.filter(c=>c.name!==e.name);for(const c of l)try{const u=await c.provider.chat(r,n);return this.name=c.name,u}catch(u){const h=u.message||"";if(h.includes("401")||h.includes("403")||h.includes("authentication")||h.includes("credit balance")||h.includes("properties field not found")){await a.recordError(c.name,h,1440);continue}throw u}throw new Error(`All LLM providers failed. Primary (${e.name}): ${o.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(r,n){return await e.streamChat(r,n)}}}const It=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:wa,OpenAICompatibleProvider:_a,ProviderRotation:xa,createProviderFromConfig:St,createRotatingProvider:et,logError:C},Symbol.toStringTag,{value:"Module"})),_t=20,Gr=2e3,Hr=2e3,Ea=4;function zr(e){return Math.ceil(e.length/Ea)}function Ht(e,t){const a=t*Ea;return e.length<=a?e:e.slice(0,a)+`
[...truncated to fit token budget]`}class J{constructor(t){this.db=t}async store(t,a,r,n,s=5,o="working"){const i=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,a,r).first();i?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,s,o,i.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,a,r,n,s,o).run(),o==="working"&&await this.enforceWorkingMemoryCap(t)}async enforceWorkingMemoryCap(t){const a=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((a==null?void 0:a.cnt)||0)>_t){const r=((a==null?void 0:a.cnt)||0)-_t;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ? AND tier = 'working' AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' 
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,r).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,_t).all()).results||[]}async getAll(t,a,r=50){return a?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,a,r).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,r).all()).results||[]}async search(t,a,r=10){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${a}%`,`%${a}%`,r).all()).results||[]}async update(t,a,r){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t,a).run()}async promote(t,a){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,a).run(),await this.enforceWorkingMemoryCap(a)}async demote(t,a){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,a).run()}async remove(t,a){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,a).run()}async buildContext(t){const a=await this.getWorkingMemory(t);if(a.length===0)return"";const r={};for(const s of a)r[s.type]||(r[s.type]=[]),r[s.type].push(s);let n=`
## Working Memory (Active Context)
`;for(const[s,o]of Object.entries(r)){n+=`
### ${s.charAt(0).toUpperCase()+s.slice(1)}s
`;for(const i of o)n+=`- **${i.title}**: ${i.content}
`}return Ht(n,Gr)}static truncatePersonality(t){return Ht(t,Hr)}async getRecentConversations(t,a=20,r){return r?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,r,a).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,a).all()).results||[]).reverse()}async storeMessage(t,a,r,n,s="{}",o){const i=zr(n);o?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,a,r,n,s,i,o).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,a,r,n,s,i).run()}async compactHistory(t,a=30){const r=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((r==null?void 0:r.cnt)||0)<=a*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,a).run()}}const Fr="https://accounts.google.com/o/oauth2/v2/auth",Ta="https://oauth2.googleapis.com/token",Wr="https://www.googleapis.com/oauth2/v2/userinfo",qr=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let te=null;async function Dt(e,t,a){const r=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!r)return null;try{const n=await M(r.encrypted_value,a);return JSON.parse(n)}catch{return null}}async function Kr(e,t,a,r){const n=await Lt(JSON.stringify(r),a);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,n).run()}function ka(e,t,a){const r=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:qr,access_type:"offline",prompt:"consent",state:a,include_granted_scopes:"true"});return`${Fr}?${r}`}async function Sa(e,t,a,r){const n=await fetch(Ta,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:a,redirect_uri:r,grant_type:"authorization_code"})}),s=await n.text();if(!n.ok)throw new Error(`Token exchange failed (${n.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function Jr(e,t,a){const r=await fetch(Ta,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:a,grant_type:"refresh_token"})}),n=await r.text();if(!r.ok)throw r.status===400||r.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${r.status}): ${n.substring(0,300)}`);return JSON.parse(n)}async function Ia(e){const t=await fetch(Wr,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function Ue(e,t,a,r,n){if(!r||!n)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(te&&te.userId===t&&te.expiresAt>Date.now()/1e3+60){const i=await Dt(e,t,a);return{token:te.token,email:(i==null?void 0:i.email)||"unknown"}}const s=await Dt(e,t,a);if(!s)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const o=await Jr(s.refresh_token,r,n);return te={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{token:o.access_token,email:s.email}}async function Nt(e,t,a){try{const r=await Dt(e,t,a);return r?{connected:!0,email:r.email,connectedAt:r.connected_at}:{connected:!1}}catch{return{connected:!1}}}function Da(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function Ca(e,t,a,r,n,s,o){const i=await Sa(r,s,o,n);if(!i.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await Ia(i.access_token),c={refresh_token:i.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await Kr(e,t,a,c),te={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{email:l.email,name:l.name}}async function Oa(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(te==null?void 0:te.userId)===t&&(te=null)}const ze="https://sheets.googleapis.com/v4/spreadsheets";class Ra{constructor(t,a,r,n,s){this.db=t,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await Ue(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,a){const r=await this.authHeaders(),n=encodeURIComponent(a),s=await fetch(`${ze}/${t}/values/${n}`,{headers:r});if(!s.ok){const i=await s.text();throw new Error(`Sheets read failed (${s.status}): ${i}`)}return(await s.json()).values||[]}async writeRange(t,a,r){const n=await this.authHeaders(),s=encodeURIComponent(a),o=await fetch(`${ze}/${t}/values/${s}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:n,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!o.ok){const l=await o.text();throw new Error(`Sheets write failed (${o.status}): ${l}`)}return{updatedCells:(await o.json()).updatedCells||0}}async appendRows(t,a,r){var l;const n=await this.authHeaders(),s=encodeURIComponent(a),o=await fetch(`${ze}/${t}/values/${s}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:n,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!o.ok){const c=await o.text();throw new Error(`Sheets append failed (${o.status}): ${c}`)}return{updatedCells:((l=(await o.json()).updates)==null?void 0:l.updatedCells)||r.length}}async createSpreadsheet(t,a){const r=await this.authHeaders(),n={properties:{title:t},sheets:a&&a.length>0?a.map(i=>({properties:{title:i}})):[{properties:{title:"Sheet1"}}]},s=await fetch(ze,{method:"POST",headers:r,body:JSON.stringify(n)});if(!s.ok){const i=await s.text();throw new Error(`Sheets create failed (${s.status}): ${i}`)}const o=await s.json();return{spreadsheetId:o.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${o.spreadsheetId}/edit`}}async getMetadata(t){const a=await this.authHeaders(),r=await fetch(`${ze}/${t}?fields=properties.title,sheets.properties.title`,{headers:a});if(!r.ok){const s=await r.text();throw new Error(`Sheets metadata failed (${r.status}): ${s}`)}const n=await r.json();return{title:n.properties.title,sheets:n.sheets.map(s=>s.properties.title)}}}const Fe="https://www.googleapis.com/calendar/v3";class $t{constructor(t,a,r,n,s){this.db=t,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await Ue(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",a={}){const r=await this.authHeaders(),n=new URLSearchParams;a.timeMin&&n.set("timeMin",a.timeMin),a.timeMax&&n.set("timeMax",a.timeMax),n.set("maxResults",String(a.maxResults||20)),n.set("singleEvents","true"),n.set("orderBy","startTime"),a.query&&n.set("q",a.query);const s=await fetch(`${Fe}/calendars/${encodeURIComponent(t)}/events?${n}`,{headers:r});if(!s.ok){const i=await s.text();throw new Error(`Calendar list failed (${s.status}): ${i}`)}return(await s.json()).items||[]}async createEvent(t="primary",a){var i;const r=await this.authHeaders(),n=a.timeZone||"Asia/Kolkata",s={summary:a.summary,description:a.description||"",location:a.location||"",start:{dateTime:a.startDateTime,timeZone:n},end:{dateTime:a.endDateTime,timeZone:n}};(i=a.attendees)!=null&&i.length&&(s.attendees=a.attendees.map(l=>({email:l})));const o=await fetch(`${Fe}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:r,body:JSON.stringify(s)});if(!o.ok){const l=await o.text();throw new Error(`Calendar create failed (${o.status}): ${l}`)}return await o.json()}async updateEvent(t="primary",a,r){const n=await this.authHeaders(),s=r.timeZone||"Asia/Kolkata",o={};r.summary&&(o.summary=r.summary),r.description&&(o.description=r.description),r.location&&(o.location=r.location),r.startDateTime&&(o.start={dateTime:r.startDateTime,timeZone:s}),r.endDateTime&&(o.end={dateTime:r.endDateTime,timeZone:s});const i=await fetch(`${Fe}/calendars/${encodeURIComponent(t)}/events/${a}`,{method:"PATCH",headers:n,body:JSON.stringify(o)});if(!i.ok){const l=await i.text();throw new Error(`Calendar update failed (${i.status}): ${l}`)}return await i.json()}async deleteEvent(t="primary",a){const r=await this.authHeaders(),n=await fetch(`${Fe}/calendars/${encodeURIComponent(t)}/events/${a}`,{method:"DELETE",headers:r});if(!n.ok&&n.status!==410){const s=await n.text();throw new Error(`Calendar delete failed (${n.status}): ${s}`)}}async listCalendars(){const t=await this.authHeaders(),a=await fetch(`${Fe}/users/me/calendarList`,{headers:t});if(!a.ok){const n=await a.text();throw new Error(`Calendar list calendars failed (${a.status}): ${n}`)}return((await a.json()).items||[]).map(n=>({id:n.id,summary:n.summary,primary:n.primary||!1}))}}const rt="https://docs.googleapis.com/v1/documents",Yr="https://www.googleapis.com/drive/v3/files";class Aa{constructor(t,a,r,n,s){this.db=t,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await Ue(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const a=await this.authHeaders(),r=await fetch(rt,{method:"POST",headers:a,body:JSON.stringify({title:t})});if(!r.ok){const s=await r.text();throw new Error(`Docs create failed (${r.status}): ${s}`)}const n=await r.json();return{documentId:n.documentId,url:`https://docs.google.com/document/d/${n.documentId}/edit`}}async readDocument(t){var o,i;const a=await this.authHeaders(),r=await fetch(`${rt}/${t}`,{headers:a});if(!r.ok){const l=await r.text();throw new Error(`Docs read failed (${r.status}): ${l}`)}const n=await r.json();let s="";for(const l of((o=n.body)==null?void 0:o.content)||[])if(l.paragraph)for(const c of l.paragraph.elements)(i=c.textRun)!=null&&i.content&&(s+=c.textRun.content);return{title:n.title,content:s.trim()}}async appendText(t,a){const r=await this.authHeaders(),n=await fetch(`${rt}/${t}`,{headers:r});if(!n.ok){const l=await n.text();throw new Error(`Docs read for append failed (${n.status}): ${l}`)}const s=await n.json(),o=s.body.content[s.body.content.length-1].endIndex-1,i=await fetch(`${rt}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{insertText:{location:{index:o},text:a}}]})});if(!i.ok){const l=await i.text();throw new Error(`Docs append failed (${i.status}): ${l}`)}}async shareDocument(t,a,r="writer"){const n=await this.authHeaders(),s=await fetch(`${Yr}/${t}/permissions`,{method:"POST",headers:n,body:JSON.stringify({type:"user",role:r,emailAddress:a})});if(!s.ok){const o=await s.text();throw new Error(`Share failed (${s.status}): ${o}`)}}}class ee{constructor(t,a,r,n,s){k(this,"sheets");k(this,"calendar");k(this,"docs");k(this,"db");k(this,"userId");k(this,"pinHash");this.db=t,this.userId=a,this.pinHash=r,this.sheets=new Ra(t,a,r,n,s),this.calendar=new $t(t,a,r,n,s),this.docs=new Aa(t,a,r,n,s)}async isConnected(){return Nt(this.db,this.userId,this.pinHash)}}const nt=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:$t,GoogleDocs:Aa,GoogleServices:ee,GoogleSheets:Ra,completeOAuthFlow:Ca,disconnectGoogle:Oa,exchangeCodeForTokens:Sa,fetchUserInfo:Ia,generateAuthUrl:ka,getGoogleAuth:Ue,isGoogleConnected:Nt,isOAuthClientConfigured:Da},Symbol.toStringTag,{value:"Module"}));async function La(e,t,a={}){const r={textQuery:t,languageCode:"en",pageSize:8};if(a.type&&(r.includedType=a.type),a.location){const l=a.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(r.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:a.radius||5e3}})}const n=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),s=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":n},body:JSON.stringify(r)});if(!s.ok){const l=await s.text();return{results:[],error:`Places API error (${s.status}): ${l.substring(0,200)}`}}const o=await s.json();return!o.places||o.places.length===0?{results:[]}:{results:o.places.map(l=>{var c,u,h;return{name:((c=l.displayName)==null?void 0:c.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(u=l.currentOpeningHours)==null?void 0:u.openNow,types:(h=l.types)==null?void 0:h.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function Na(e,t){var s,o,i;const a=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),r=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":a}});if(!r.ok){const l=await r.text();return{error:`Place Details API error (${r.status}): ${l.substring(0,200)}`}}const n=await r.json();return{details:{name:((s=n.displayName)==null?void 0:s.text)||"",address:n.formattedAddress||"",phone:n.internationalPhoneNumber,website:n.websiteUri,rating:n.rating,reviews:(o=n.reviews)==null?void 0:o.slice(0,3).map(l=>{var c,u,h;return{author:((c=l.authorAttribution)==null?void 0:c.displayName)||"Anonymous",rating:l.rating||0,text:((h=(u=l.text)==null?void 0:u.text)==null?void 0:h.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(i=n.currentOpeningHours)==null?void 0:i.weekdayDescriptions,location:n.location?{lat:n.location.latitude,lng:n.location.longitude}:void 0,googleMapsUri:n.googleMapsUri}}}async function $a(e,t,a,r={}){var c;const n=new URLSearchParams({origin:t,destination:a,key:e,mode:r.mode||"driving"});(r.mode==="driving"||!r.mode)&&n.set("departure_time","now");const s=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${n}`);if(!s.ok)return{error:`Directions API error: ${s.status}`};const o=await s.json();if(o.status!=="OK")return{error:`Directions: ${o.status} — ${o.error_message||""}`};const i=o.routes[0],l=i.legs[0];return{route:{summary:i.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(c=l.duration_in_traffic)==null?void 0:c.text,steps:l.steps.slice(0,10).map(u=>{var h,y,v;return{instruction:((h=u.html_instructions)==null?void 0:h.replace(/<[^>]*>/g,""))||"",distance:((y=u.distance)==null?void 0:y.text)||"",duration:((v=u.duration)==null?void 0:v.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function Ma(e,t,a,r){var l,c;const n={q:t,target:a,key:e,format:"text"};r&&(n.source=r);const s=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){const u=await s.text();return{translatedText:"",error:`Translate API error (${s.status}): ${u.substring(0,200)}`}}const i=(c=(l=(await s.json()).data)==null?void 0:l.translations)==null?void 0:c[0];return i?{translatedText:i.translatedText,detectedSourceLang:i.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function Ba(e,t){const a=new URLSearchParams({address:t,key:e}),r=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${a}`);if(!r.ok)return{results:[],error:`Geocoding API error: ${r.status}`};const n=await r.json();return n.status!=="OK"&&n.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${n.status} — ${n.error_message||""}`}:{results:(n.results||[]).slice(0,5).map(s=>{var o;return{address:s.formatted_address,lat:s.geometry.location.lat,lng:s.geometry.location.lng,placeId:s.place_id,types:(o=s.types)==null?void 0:o.slice(0,3)}})}}async function ja(e,t,a={}){const r=new URLSearchParams({part:"snippet",q:t,key:e,type:a.type||"video",maxResults:String(a.maxResults||5),order:a.order||"relevance"}),n=await fetch(`https://www.googleapis.com/youtube/v3/search?${r}`);if(!n.ok){const o=await n.text();return{results:[],error:`YouTube API error (${n.status}): ${o.substring(0,200)}`}}return{results:((await n.json()).items||[]).map(o=>{var i,l,c,u,h,y,v,f;return{title:o.snippet.title,channelTitle:o.snippet.channelTitle,description:(i=o.snippet.description)==null?void 0:i.substring(0,200),videoId:((l=o.id)==null?void 0:l.videoId)||((c=o.id)==null?void 0:c.channelId)||((u=o.id)==null?void 0:u.playlistId)||"",publishedAt:o.snippet.publishedAt,url:(h=o.id)!=null&&h.videoId?`https://www.youtube.com/watch?v=${o.id.videoId}`:(y=o.id)!=null&&y.channelId?`https://www.youtube.com/channel/${o.id.channelId}`:"",thumbnailUrl:(f=(v=o.snippet.thumbnails)==null?void 0:v.medium)==null?void 0:f.url}})}}async function mt(e,t={}){const a=Math.min(t.num||5,10),r=t.site?`site:${t.site} ${e}`:e;try{const n=new URLSearchParams({q:r}),s=await fetch(`https://html.duckduckgo.com/html/?${n}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!s.ok)return{results:[],error:`Search request failed (${s.status})`};const o=await s.text(),i=[],l=o.split(/class="result results_links/g).slice(1);for(const c of l){if(i.length>=a)break;const u=c.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),h=c.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(u){let y=u[1];const v=y.match(/uddg=([^&]+)/);v?y=decodeURIComponent(v[1]):y.startsWith("//")&&(y="https:"+y);const f=E=>E.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),x=f(u[2]),_=h?f(h[1]):"";if(x&&y.startsWith("http")){const E=y.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];i.push({title:x,link:y,snippet:_,displayLink:E})}}}return i.length===0?{results:[],error:void 0}:{results:i}}catch(n){return{results:[],error:`Web search error: ${n.message}`}}}async function Pa(e,t,a,r="driving"){var l,c,u,h;const n=new URLSearchParams({origins:t,destinations:a,key:e,mode:r,departure_time:"now"}),s=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${n}`);if(!s.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${s.status}`};const o=await s.json(),i=(u=(c=(l=o.rows)==null?void 0:l[0])==null?void 0:c.elements)==null?void 0:u[0];return!i||i.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(i==null?void 0:i.status)||o.status}`}:{distance:i.distance.text,duration:i.duration.text,durationInTraffic:(h=i.duration_in_traffic)==null?void 0:h.text}}const Vr=Object.freeze(Object.defineProperty({__proto__:null,geocode:Ba,getDirections:$a,getDistanceMatrix:Pa,getPlaceDetails:Na,searchPlaces:La,searchYouTube:ja,translateText:Ma,webSearch:mt},Symbol.toStringTag,{value:"Module"})),re="https://gmail.googleapis.com/gmail/v1/users/me";class ne{constructor(t,a,r,n,s){this.db=t,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await Ue(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var i;const a=await this.authHeaders(),r=new URLSearchParams;if(r.set("maxResults",String(t.maxResults||10)),t.query&&r.set("q",t.query),(i=t.labelIds)!=null&&i.length)for(const l of t.labelIds)r.append("labelIds",l);const n=await fetch(`${re}/messages?${r}`,{headers:a});if(!n.ok){const l=await n.text();throw new Error(`Gmail list failed (${n.status}): ${l.substring(0,200)}`)}const s=await n.json();if(!s.messages||s.messages.length===0)return[];const o=[];for(const l of s.messages.slice(0,t.maxResults||10))try{const c=await this.getMessage(l.id,a);c&&o.push(c)}catch{}return o}async getMessage(t,a){const r=a||await this.authHeaders(),n=await fetch(`${re}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:r});if(!n.ok)return null;const s=await n.json(),o=i=>{var l,c,u;return((u=(c=(l=s.payload)==null?void 0:l.headers)==null?void 0:c.find(h=>h.name.toLowerCase()===i.toLowerCase()))==null?void 0:u.value)||""};return{id:s.id,threadId:s.threadId,snippet:s.snippet||"",subject:o("Subject")||"(no subject)",from:o("From"),to:o("To"),date:o("Date")||new Date(parseInt(s.internalDate)).toISOString(),isUnread:(s.labelIds||[]).includes("UNREAD"),labels:s.labelIds||[]}}async getMessageBody(t){const a=await this.authHeaders(),r=await fetch(`${re}/messages/${t}?format=full`,{headers:a});if(!r.ok){const s=await r.text();throw new Error(`Gmail message body failed (${r.status}): ${s.substring(0,200)}`)}const n=await r.json();return Ua(n.payload)}async search(t,a=10){return this.listMessages({query:t,maxResults:a})}async send(t,a,r,n={}){const s=await this.authHeaders(),o=[`To: ${t}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];n.cc&&o.push(`Cc: ${n.cc}`),n.bcc&&o.push(`Bcc: ${n.bcc}`),n.replyToMessageId&&(o.push(`In-Reply-To: ${n.replyToMessageId}`),o.push(`References: ${n.replyToMessageId}`)),o.push("",r);const i=o.join(`\r
`),c={raw:btoa(unescape(encodeURIComponent(i))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};n.threadId&&(c.threadId=n.threadId);const u=await fetch(`${re}/messages/send`,{method:"POST",headers:s,body:JSON.stringify(c)});if(!u.ok){const h=await u.text();throw new Error(`Gmail send failed (${u.status}): ${h.substring(0,200)}`)}return await u.json()}async createDraft(t,a,r){const n=await this.authHeaders(),o=[`To: ${t}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8","",r].join(`\r
`),i=btoa(unescape(encodeURIComponent(o))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),l=await fetch(`${re}/drafts`,{method:"POST",headers:n,body:JSON.stringify({message:{raw:i}})});if(!l.ok){const c=await l.text();throw new Error(`Gmail draft failed (${l.status}): ${c.substring(0,200)}`)}return await l.json()}async markAsRead(t){const a=await this.authHeaders();await fetch(`${re}/messages/${t}/modify`,{method:"POST",headers:a,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,a){const r=await this.authHeaders();let n={};switch(a){case"archive":n={removeLabelIds:["INBOX"]};break;case"trash":n={addLabelIds:["TRASH"]};break;case"read":n={removeLabelIds:["UNREAD"]};break;case"unread":n={addLabelIds:["UNREAD"]};break;case"star":n={addLabelIds:["STARRED"]};break;case"unstar":n={removeLabelIds:["STARRED"]};break}const s=await fetch(`${re}/messages/${t}/modify`,{method:"POST",headers:{...r,"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){const o=await s.text();throw new Error(`Failed to modify message: ${o}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),a=await fetch(`${re}/labels/INBOX`,{headers:t});return a.ok&&(await a.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),a=await fetch(`${re}/profile`,{headers:t});if(!a.ok)throw new Error("Failed to get Gmail profile");return await a.json()}}function Ua(e){var t,a,r;if(!e)return"";if((t=e.body)!=null&&t.data)return xt(e.body.data);if(e.parts){for(const n of e.parts)if(n.mimeType==="text/plain"&&((a=n.body)!=null&&a.data))return xt(n.body.data);for(const n of e.parts)if(n.mimeType==="text/html"&&((r=n.body)!=null&&r.data)){const s=xt(n.body.data);return Xr(s)}for(const n of e.parts)if(n.parts){const s=Ua(n);if(s)return s}}return e.snippet||""}function xt(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function Xr(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const Zr=1e4,Qr=1e4;async function Ga(e,t){try{const a=new AbortController,r=setTimeout(()=>a.abort(),Qr),n=await fetch(e,{signal:a.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(clearTimeout(r),!n.ok)return{text:"",error:`HTTP ${n.status}`};const s=n.headers.get("content-type")||"";if(!s.includes("text/html")&&!s.includes("text/plain")&&!s.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${s.split(";")[0]}`};const o=await n.text(),i=en(o);return i.length<50?{text:"",error:"Page has too little readable content"}:{text:i.substring(0,t||Zr)}}catch(a){return{text:"",error:a.name==="AbortError"?"Timeout":a.message}}}function en(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(a,r)=>String.fromCharCode(parseInt(r))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(a=>a.trim()).filter(a=>a.length>0).join(`
`),t.trim()}async function Ha(e,t,a={}){const r=a.maxPages||(a.depth==="thorough"?5:3),n=a.maxResults||(a.depth==="thorough"?8:5),s=await mt(e,{num:n,site:a.site});if(s.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${s.error}`};if(s.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const i=s.results.slice(0,r).map(async y=>{const v=await Ga(y.link);return{title:y.title,url:y.link,displayLink:y.displayLink,snippet:y.snippet,content:v.text,error:v.error}}),c=(await Promise.all(i)).filter(y=>y.content.length>50);if(c.length===0){const y=s.results.map((f,x)=>`[${x+1}] ${f.title}
${f.snippet}
Source: ${f.link}`).join(`

`);return{report:await zt(e,y,t,"snippets"),sources:s.results.map(f=>({title:f.title,url:f.link})),pagesRead:0}}const u=c.map((y,v)=>`--- SOURCE ${v+1}: ${y.title} (${y.displayLink}) ---
${y.content}
--- END SOURCE ${v+1} ---`).join(`

`);return{report:await zt(e,u,t,"full"),sources:c.map(y=>({title:y.title,url:y.url})),pagesRead:c.length}}async function zt(e,t,a,r){const s=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

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
- If the sources don't adequately answer the query, say so honestly`,o=`Research query: "${e}"

Source material:
${t}

Write a synthesized research report answering the query above.`;try{return(await a.chat([{role:"system",content:s},{role:"user",content:o}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(i){return`Research synthesis error: ${i.message}. Raw search results were found but could not be analyzed.`}}const tn=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:Ha,fetchPageContent:Ga},Symbol.toStringTag,{value:"Module"})),an=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,agent:"scheduler",weight:.9},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,agent:"scheduler",weight:.9},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,agent:"scheduler",weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,agent:"scheduler",weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,agent:"scheduler",weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,agent:"workspace",weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,agent:"workspace",weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,agent:"workspace",weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,agent:"workspace",weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,agent:"workspace",weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,agent:"workspace",weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,agent:"workspace",weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,agent:"workspace",weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,agent:"workspace",weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,agent:"workspace",weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,agent:"research",weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,agent:"research",weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,agent:"research",weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,agent:"research",weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,agent:"research",weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,agent:"research",weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,agent:"research",weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,agent:"research",weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,agent:"research",weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,agent:"research",weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,agent:"research",weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,agent:"research",weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,agent:"research",weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,agent:"memory",weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory)\b/i,agent:"memory",weight:.9}];function za(e,t){let a=null;const r=new Set;for(const n of an)n.pattern.test(e)&&(r.add(n.agent),(!a||n.weight>a.weight)&&(a={agent:n.agent,weight:n.weight}));return t&&/spreadsheet|sheet|google\s*sheet/i.test(t)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(e)&&(r.add("workspace"),(!a||a.agent!=="workspace")&&(a={agent:"workspace",weight:.85})),r.size>=2?r.has("workspace")&&r.has("research")?{agent:"workspace",confidence:.7,reasoning:"Multi-intent: workspace+research merged"}:r.has("scheduler")&&r.has("research")?{agent:"scheduler",confidence:.85,reasoning:"Multi-intent: scheduler+research — schedule a research task"}:r.has("scheduler")&&r.has("workspace")?{agent:"scheduler",confidence:.85,reasoning:"Multi-intent: scheduler+workspace — schedule a workspace check"}:r.has("memory")&&r.size===2?{agent:[...r].find(s=>s!=="memory")||"conversation",confidence:.7,reasoning:"Multi-intent: memory is context for other agent"}:{agent:"multi",confidence:.5,reasoning:`Multiple intents detected: ${[...r].join(", ")}`}:a?{agent:a.agent,confidence:a.weight,reasoning:`Keyword match: ${a.agent}`}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function Fa(e,t){const a=rn[e];return a?t.filter(r=>a.includes(r.name)):t}const rn={scheduler:["create_schedule","list_schedules","toggle_schedule","update_schedule_state","delete_schedule","store_memory","search_memory"],workspace:["read_sheet","write_sheet","append_sheet","create_sheet","list_calendar_events","create_calendar_event","create_doc","read_doc","append_to_doc","gmail_list","gmail_read","gmail_search","gmail_send","gmail_draft","gmail_unread_count","gmail_modify","drive_list","drive_search","store_memory","search_memory","web_search","read_url","research"],research:["web_search","read_url","research","search_places","get_place_details","get_directions","get_travel_time","translate_text","search_youtube","geocode_address","store_memory","search_memory","create_doc","append_to_doc"],memory:["store_memory","search_memory","get_system_status"],conversation:[]};function ct(e,t,a,r,n){const s=t.assistant_name||"Karna",o=t.personality_prompt?`
## Personality
${t.personality_prompt.substring(0,2e3)}
`:"",i=a?`
## Active Memory (ALWAYS consult before responding)
${a}
`:"",l=`
## Current User
- **Name**: ${t.name}
- **Timezone**: ${t.timezone}
- **Time**: ${n}
`;switch(e){case"scheduler":return`You are ${s}, managing schedules and reminders for the user.

${l}${o}${i}

## NON-NEGOTIABLE RULES
1. **ALWAYS call the appropriate tool immediately.** Never say "I'll set that up" without calling create_schedule in the same turn.
2. **Check memory first** using search_memory if the user references something stored (tracking numbers, recurring patterns, document IDs).
3. **Write machine-executable action_descriptions.** When creating schedules for tasks that need tool execution (delivery tracking, email checks, sheet checks), the action_description MUST be a complete instruction that another agent can execute autonomously. Examples:
   - BAD: "Check delivery status" (too vague for autonomous execution)
   - GOOD: "Use web_search to check delivery status for DTDC tracking number N12345678. Search 'DTDC tracking N12345678 delivery status'. Report current status and expected delivery date."
   - BAD: "Check mail" (no context)
   - GOOD: "Use gmail_search to find recent emails from 'kava@vendor.com' or containing 'KAVA order'. Report sender, subject, and any shipping/delivery updates."

## Your Job
Create, list, modify, and delete scheduled tasks. You handle:
- **Reminders**: "Remind me to..." → create_schedule with action_type 'reminder'
- **Deferred checks**: "Check delivery in 48 hrs" → create_schedule with action_type 'custom', schedule_type 'once', and a DETAILED action_description (see above)
- **Recurring checks**: "Check my email every 2 hours" → create_schedule with action_type 'check_mail', interval
- **One-time alerts**: "Alert me on March 15 at 3pm" → create_schedule with schedule_type 'once'
- **Management**: List, enable/disable, pause, complete, or delete schedules

### Schedule Types
- **interval**: Repeats every N minutes. schedule_value = "30" (minutes). Use for RECURRING tasks: "check mail every 2 hours" → interval 120.
- **daily**: At a specific time every day. schedule_value = "09:00" (24h format, user's timezone)
- **weekly**: Day + time every week. schedule_value = "Friday 17:00"
- **once**: Fire once at a specific date/time. schedule_value = "2026-03-15 14:30" (user's timezone). **Use for ALL one-shot reminders and deferred tasks.**

### CRITICAL: How to handle relative-time one-shot reminders
When the user says "in 45 minutes", "in 2 hours", "after 30 min":
1. Calculate the absolute target time = current user time + offset.
   Example: User time is 18:49 IST, "in 45 minutes" → target 19:34 IST → schedule_value = "YYYY-MM-DD 19:34"
2. Use schedule_type: **once** with the computed absolute datetime.
3. NEVER use interval for one-shot reminders (interval would repeat forever).

When the user says "at 3pm", "tomorrow at 9am", "on March 15 at 2:30pm":
→ schedule_type: **once** or **daily**, with the absolute time directly.

### Deferred Research Pattern
When the user asks to check something later (delivery status, news, price, etc.):
1. First: search_memory for relevant context (tracking number, order details, etc.)
2. Then: create_schedule with action_type 'custom' and a DETAILED action_description
3. The description must contain: which tool to use, exact search query, what to look for, what to report

### Rules
- Always confirm what you created: name, type, time, action
- If user says "stop" or "done" for a reminder, use update_schedule_state → completed
- Convert user's timezone to schedule correctly
- Be concise — confirm the schedule and move on`;case"workspace":return`You are ${s}, handling Google Workspace operations for the user.

${l}${o}${i}

## NON-NEGOTIABLE RULES
1. **ALWAYS call the appropriate tool immediately.** Never say "Let me check" or "I'll look into that" as a standalone response. Call the tool FIRST, then respond with results.
2. **If the user asks to check Gmail, call gmail_list or gmail_search RIGHT NOW.** Do NOT respond with text saying you will check — just do it.
3. **Check memory FIRST** for sheet/doc IDs — never ask user for IDs you already know.
4. **If Google not connected or token expired**: tell user "Your Google connection has expired. Please reconnect in Settings → Keys → Google Workspace."

## Your Job
Manage Google Sheets, Docs, Drive, Calendar, and Gmail.

### Sheets
- **read_sheet**: Read data. Use plain range "A1:Z500". Response includes ALL tab names.
- **write_sheet / append_sheet**: Write data. Supports formulas (=SUM, =SUMIF, etc.)
- **create_sheet**: Create new spreadsheet with optional tabs and folder placement.
- Multi-tab: Read first tab to discover all tabs, then read the correct one.

### Docs & Drive
- **create_doc / read_doc / append_to_doc**: Full document management.
- **drive_list / drive_search**: Find files.
- Auto-remember created docs/sheets (store_memory with ID + URL, importance 7).

### Calendar
- **list_calendar_events**: Check schedule. Default: next 7 days.
- **create_calendar_event**: Create events with attendees.
- "Do I have anything tomorrow" → list_calendar_events with days_ahead: 1

### Gmail
- **gmail_list / gmail_read / gmail_search**: Read and search mail.
- **gmail_send / gmail_draft**: Compose. Prefer drafts for safety.
- **gmail_modify**: Archive, trash, star, mark read/unread.

### Disambiguation — Confirm When Unsure, Learn, Never Ask Again
| User says | Memory has | Confidence | Action |
|-----------|-----------|------------|--------|
| "Uber 700" | Budget sheet + pattern | HIGH | Append directly |
| "Uber 700" | Budget sheet, no pattern | MEDIUM | Append, tell user |
| "Uber 700" | No budget sheet | LOW | Ask: "Add as expense?" |
| "Check mail" | Only Gmail connected | HIGH | Check Gmail |
| "Add to my doc" | One doc in memory | HIGH | Append to that doc |
| "Add to my doc" | Multiple docs | LOW | Ask which one |

**Learn-and-never-ask-again**: When user confirms an ambiguous action, IMMEDIATELY store the pattern using store_memory (type: "preference", importance: 8). Next time, just do it.

### Rules
- Chain actions: "research X and save to doc" → web_search then create_doc
- Be concise — show results, don't narrate process`;case"research":return`You are ${s}, handling information retrieval for the user.

${l}${o}${i}

## NON-NEGOTIABLE RULES
1. **ALWAYS call a search tool immediately.** Never respond with just "Let me look that up" — call web_search or research FIRST, then present the results.
2. **Default to web_search** unless user explicitly asks for deep research. It's faster and more reliable.
3. **Check memory first** using search_memory if the user references something stored (tracking numbers, order IDs, etc.). Use the context to craft a better search query.

## Your Job
Find information from the web, analyze it, and present clear answers.

### 3 Tiers
1. **web_search** (~1s) — Quick facts, news, prices, verification, tracking. DEFAULT choice.
2. **read_url** (~3-5s) — Read a specific page when user provides a URL or you need full article text.
3. **research** (~10-20s) — Deep analysis: "research X", "compare A vs B". WARNING: slow, may timeout.

### Delivery / Order Tracking
When asked to check delivery or order status:
1. search_memory for tracking number, courier name, order details
2. web_search with specific query: "[courier name] tracking [tracking number]"
3. If no tracking number in memory, ask user for it
4. Present: current status, location, expected delivery date

### Google APIs (require API key)
- **search_places / get_place_details**: Find businesses, venues. Returns ratings, hours, reviews.
- **get_directions / get_travel_time**: Navigation and distance.
- **translate_text**: 100+ languages. Auto-detects source.
- **search_youtube**: Videos, tutorials, reviews.
- **geocode_address**: Address <-> coordinates.

### Rules
- For "is this true/fake/real?" → web_search (fast fact-check)
- For "research X thoroughly" → research tool
- If asked to save findings: use create_doc or append_to_doc
- If asked to save to memory: use store_memory
- Cite sources when using research tool
- Be direct — answer first, details second`;case"memory":return`You are ${s}, managing the user's memory and system status.

${l}${o}${i}

## NON-NEGOTIABLE RULES
1. **ALWAYS call the appropriate tool immediately.** When user says "remember X", call store_memory RIGHT NOW.
2. **Deduplicate**: If updating existing info, use the same title — it updates in place.

## Your Job
Store and recall information the user wants to remember.

### Tools
- **store_memory**: Save facts, preferences, decisions, context. Parameters:
  - type: fact | preference | decision | context
  - title: Short key (e.g., "Budget Sheet ID", "DTDC Tracking Number", "Default Email")
  - content: The information
  - importance: 1-10. Use 7+ for working memory (always in prompt). Use 5- for long-term archive.
- **search_memory**: Find previously stored info by keyword.
- **get_system_status**: Active schedules, memory count, messages, errors.

### Learn-and-Never-Ask-Again Pattern
When the user confirms a pattern or preference:
1. Store it immediately with store_memory (type: "preference", importance: 8)
2. Use a descriptive title: "Expense Entry Pattern", "Default Email Account", "Budget Sheet ID"
3. Next time the pattern appears, apply it without asking

### Importance Guidelines
- **8-10**: Critical working memory — always visible. Sheet/doc IDs, active tracking numbers, confirmed patterns.
- **7**: Working memory — visible. Preferences, recurring context.
- **5-6**: Long-term — searched on demand. One-off facts, notes.
- **1-4**: Archive — rarely needed.

### Rules
- When user says "remember X" → store_memory with clear title and content
- When user asks "what do you know about X" → search_memory first, then list working memory if relevant
- Be concise — confirm what was stored/found`;case"conversation":return`You are ${s} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic.

${l}${o}${i}

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
- Time-aware: reference current date/time when relevant`;default:return""}}const nn=2e3,sn=2e3,Wa=4;function Et(e){return Math.ceil(e.length/Wa)}function Ft(e,t){const a=t*Wa;return e.length<=a?e:e.slice(0,a)+`
[...truncated to fit token budget]`}const ht=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes, daily = at a specific time (HH:MM), weekly = day of week at time (e.g. "Friday 17:00"), once = specific date and time (e.g. "2026-03-12 14:30")'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","schedule_value","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:"Store a piece of information the user wants you to remember. Use for facts, preferences, decisions, or important context.",parameters:{type:"object",properties:{type:{type:"string",enum:["fact","preference","decision","context"],description:"Category of memory"},title:{type:"string",description:"Short title/key for this memory"},content:{type:"string",description:"The information to remember"},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for critical info that should stay in working memory."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. Use this to add new entries (expenses, logs, records) to an existing sheet.",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:"Send an email via Gmail. Uses Google OAuth directly. The email is sent immediately from the user's Gmail account. Use with care — confirm with the user before sending.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets. Use for quick facts, links, current events, prices. Fast (~1s), no API key.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:'Deep web research — searches, reads up to 5 pages, and synthesizes a detailed report with sources. Use when user needs analysis, comparisons, fact-checking, thorough answers, or asks you to "research" something. Returns a compiled report with citations (~10-20s).',parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Is Abacus AI good for agentic tool calls?", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}}];function qa(e,t){const a=e.assistant_name||"Karna",r=e.personality_prompt?Ft(`## Personality Instructions
${e.personality_prompt}
`,nn):"",n=Ft(t,sn);return`You are ${a} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic. Your name is ${a} — always refer to yourself by this name if asked.

## Your Core Identity
- You are a cloud-based personal assistant with memory, scheduling, and full Google Workspace integration (Sheets, Calendar, Docs, Drive, Gmail).
- You remember past conversations and learn from every interaction.
- You can create scheduled tasks, reminders, and recurring checks through natural conversation.

## Current User
- **Name**: ${e.name}
- **Username**: ${e.username}
- **Role**: ${e.role}
- **Timezone**: ${e.timezone}

${r}

## CRITICAL — Your Active Memory
**ALWAYS read and apply everything in this section before responding.** This is your stored knowledge about the user — their preferences, referenced documents, data sources, and explicit instructions. These OVERRIDE default behavior.
- If a memory entry says "use this Google Sheet for events queries" — then when the user asks about events, you MUST use read_sheet with that spreadsheet ID. Do NOT use calendar or ask the user for the sheet link again.
- If a memory entry references a document or spreadsheet, use the stored ID directly with the appropriate tool (read_sheet, read_doc, etc.).
- If a memory entry records a preference (e.g. "check Outlook for meetings"), follow it without asking.

${n}

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

### Information Retrieval (3 tiers)
1. **web_search** — Quick lookup (~1s). Returns titles, URLs, snippets. Use for: facts, links, news, prices, quick answers, fact-checking, "is this true/fake/real?".
2. **read_url** — Read one page (~3-5s). Fetches and extracts text from a URL. Use for: reading articles, docs, blog posts, specific pages from search results.
3. **research** — Deep analysis (~10-15s). Searches, reads 3-5 pages, synthesizes a report with citations. Use for: "research X", "is X good for Y?", "compare A vs B", complex questions needing multiple sources. WARNING: This is slow and may timeout — only use when depth is explicitly needed.

**Trigger words**: "research", "look into", "investigate" → use **research**. "Search for", "find", "what is", "is this true", "is this fake", "fact check", "latest news", "check news" → use **web_search**. "Read this page/article/link" → use **read_url**.
**IMPORTANT**: When in doubt between web_search and research, prefer web_search. It's faster and more reliable. Only use research when the user explicitly asks for deep analysis or comparison.

### Writing & Storage
- **create_doc** — Create a new Google Doc with content. Always pass the full text as the content parameter.
- **append_to_doc** — Add content to an existing Google Doc. Use when the user wants to add to an existing document.
- **create_sheet** + **write_sheet** / **append_sheet** — Create and populate spreadsheets.
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
- Drive: drive_list, drive_search
- Gmail: gmail_list, gmail_read, gmail_search, gmail_send, gmail_draft, gmail_unread_count, gmail_modify
- If Google is not connected, tell the user: Settings → Keys → Google Workspace.
- **Important**: When you create a doc or sheet, you automatically remember its ID. So when the user later says "add to my budget sheet", check memory for the spreadsheet ID — don't ask them for it.

### Spreadsheet Patterns
When creating tracked sheets (budgets, logs, inventories):
- Set up headers + formulas in the first write_sheet call
- Use =SUM(), =SUMIF(), =COUNTIF() for automatic running totals
- Example budget: headers [Date, Category, Amount(Rs), Running Total], row 2 formula: =SUM($C$2:C2) for running total
- To add entries later: use append_sheet with the remembered spreadsheet_id
- To query data: use read_sheet to get all rows, then analyze/summarize the data yourself. read_sheet always returns a list of ALL tabs — if the user asks about a different month or category, use the tab name from that list (e.g., "February!A1:Z500")

### Location, Translation, YouTube
- search_places, get_place_details, get_directions, get_travel_time — places and navigation
- translate_text — 100+ languages
- search_youtube — videos, tutorials, reviews
- geocode_address — addresses to coordinates

### Response Style
- Be concise but human. Never robotic.
- **CRITICAL: Never respond with just "Let me check" or "I'll look into that" without calling a tool.** If the user asks you to check something, call the tool IMMEDIATELY in the same turn. Your response should contain the actual results, not a promise to look.
- Don't announce tool usage — just do it and present results naturally.
- If a tool fails, explain simply and suggest alternatives.
- When the user's request involves multiple steps, execute them all and present the combined result.
- When confirming ambiguity, be brief and offer the most likely option first: "Add Uber ₹700 to your Monthly Budget?" not a long explanation.
- After the user confirms a pattern, store it and never ask about that pattern again.

## Current Date & Time
${gt(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.`}async function Wt(e,t,a){var c;const n=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${a.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let s;((c=n.files)==null?void 0:c.length)>0?s=n.files[0].id:s=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:a,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${s}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:s,folderName:a}}function gt(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}async function ft(e,t,a,r,n,s,o,i,l,c,u){var y,v,f,x,_,E;const h=new J(a);switch(e){case"create_schedule":{const d=new Date;let g;const p=c||"UTC";if(t.schedule_type==="interval"){const w=parseInt(t.schedule_value,10);g=new Date(d.getTime()+w*60*1e3)}else if(t.schedule_type==="daily"){const[w,T]=t.schedule_value.split(":").map(Number),S=d.toLocaleString("en-US",{timeZone:p}),I=new Date(S),R=new Date(I);R.setHours(w,T,0,0),R<=I&&R.setDate(R.getDate()+1);const A=new Date(R.toLocaleString("en-US",{timeZone:"UTC"})),N=new Date(R.toLocaleString("en-US",{timeZone:p})),$=A.getTime()-N.getTime();g=new Date(R.getTime()+$)}else if(t.schedule_type==="weekly"){const[w,T]=t.schedule_value.split(" "),[S,I]=(T||"00:00").split(":").map(Number),A=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(yt=>yt.toLowerCase()===w.toLowerCase()),N=d.toLocaleString("en-US",{timeZone:p}),$=new Date(N),G=new Date($);G.setHours(S,I,0,0);let q=(A-G.getDay()+7)%7;q===0&&G<=$&&(q=7),G.setDate(G.getDate()+q);const ae=new Date(G.toLocaleString("en-US",{timeZone:"UTC"})),Ie=new Date(G.toLocaleString("en-US",{timeZone:p})),de=ae.getTime()-Ie.getTime();g=new Date(G.getTime()+de)}else if(t.schedule_type==="once"){const[w,T]=t.schedule_value.split(" "),[S,I,R]=w.split("-").map(Number),[A,N]=(T||"00:00").split(":").map(Number),$=d.toLocaleString("en-US",{timeZone:p}),G=new Date($),q=new Date(G);q.setFullYear(S,I-1,R),q.setHours(A,N,0,0);const ae=new Date(q.toLocaleString("en-US",{timeZone:"UTC"})),Ie=new Date(q.toLocaleString("en-US",{timeZone:p})),de=ae.getTime()-Ie.getTime();g=new Date(q.getTime()+de);const yt=new Date(d.getTime()+120*1e3);if(g.getTime()<d.getTime()+60*1e3){const Va=g.toISOString();g=yt;const Xa=` [Note: The requested time ${t.schedule_value} in ${p} resolved to ${Va} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${g.toISOString()}.]`;t._pastTimeWarning=Xa}}else g=new Date(d.getTime()+3600*1e3);await a.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(r,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),g.toISOString()).run();const m=t._pastTimeWarning||"";return`Schedule created: "${t.name}" — ${t.schedule_type} at ${t.schedule_value}. State: active. Next run: ${g.toISOString()}${m}`}case"list_schedules":{const g=(await a.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(r).all()).results||[];return g.length===0?"No scheduled tasks found.":g.map(p=>`[ID:${p.id}] ${p.enabled?"▶":"⏸"} "${p.name}" — [${p.schedule_type}] ${p.schedule_value} — ${p.action_type} — state: ${p.state||"active"} — next: ${p.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const d=t.enabled?1:0,g=d?"active":"paused";return await a.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(d,g,t.job_id,r).run(),`Schedule ${t.job_id} ${d?"enabled (active)":"paused"}.`}case"update_schedule_state":{const d=["created","active","reminding","paused","completed"],g=t.state;if(!d.includes(g))return`Invalid state "${g}". Valid states: ${d.join(", ")}`;const p=g==="completed"||g==="paused"?0:1;return await a.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(g,p,t.job_id,r).run(),`Schedule ${t.job_id} state updated to "${g}".`}case"delete_schedule":return await a.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,r).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const d=t.importance||5,g=d>=7?"working":"long_term";return await h.store(r,t.type,t.title,t.content,d,g),`Stored in ${g==="working"?"working":"long-term"} memory: [${t.type}] ${t.title} (importance: ${d})`}case"search_memory":{const d=await h.search(r,t.query);return d.length===0?"No matching memories found.":d.map(g=>`[${g.tier||"long_term"}] [${g.type}] **${g.title}**: ${g.content}`).join(`
`)}case"get_system_status":{const d=await a.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),g=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),p=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(r).first(),m=await a.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),w=await a.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first();return`System Status:
- Active schedules: ${(d==null?void 0:d.cnt)||0}
- Memory: ${(p==null?void 0:p.cnt)||0} working / ${(g==null?void 0:g.cnt)||0} total
- Total messages: ${(m==null?void 0:m.cnt)||0}
- Unread errors: ${(w==null?void 0:w.cnt)||0}`}case"read_sheet":{if(!n)return"Authentication context unavailable.";try{const d=new ee(a,r,n,s||"",o||""),g=t.spreadsheet_id;let p=t.range;const m=await d.sheets.getMetadata(g),w=m.sheets;p.includes("!")||(p=`${w[0]}!${p}`);let T;try{T=await d.sheets.readRange(g,p)}catch(I){if((y=I.message)!=null&&y.includes("Unable to parse range")||(v=I.message)!=null&&v.includes("400")){const R=p.includes("!")?p.split("!")[1]:p;p=`${w[0]}!${R}`,T=await d.sheets.readRange(g,p)}else throw I}let S=`[Spreadsheet: "${m.title}" | Reading tab: "${p.split("!")[0]}" | All tabs in this spreadsheet: ${w.map(I=>`"${I}"`).join(", ")}]
`;return w.length>1&&(S+=`[To read a different tab, call read_sheet again with range like "${w[1]}!A1:Z500"]
`),T.length===0?S+"No data found in the specified range.":S+T.map(I=>I.join("	| ")).join(`
`)}catch(d){return await C(a,r,"google","read_sheet",d.message),`Failed to read sheet: ${d.message}`}}case"write_sheet":{if(!n)return"Authentication context unavailable.";try{return`Written ${(await new ee(a,r,n,s||"",o||"").sheets.writeRange(t.spreadsheet_id,t.range,t.values)).updatedCells} cells to ${t.range}.`}catch(d){return await C(a,r,"google","write_sheet",d.message),`Failed to write sheet: ${d.message}`}}case"append_sheet":{if(!n)return"Authentication context unavailable.";try{return`Appended ${(await new ee(a,r,n,s||"",o||"").sheets.appendRows(t.spreadsheet_id,t.range,t.values)).updatedCells} cells to ${t.range}.`}catch(d){return await C(a,r,"google","append_sheet",d.message),`Failed to append to sheet: ${d.message}`}}case"create_sheet":{if(!n)return"Authentication context unavailable.";try{const d=new ee(a,r,n,s||"",o||"");if(!(await d.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const p=await d.sheets.createSpreadsheet(t.title,t.sheet_names);let m="";if(t.folder_name)try{const{token:w}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(a,r,n,s||"",o||"");m=`
Folder: "${(await Wt(w,p.spreadsheetId,t.folder_name)).folderName}"`}catch(w){m=`
(Could not move to folder "${t.folder_name}": ${w.message})`}try{await new J(a).store(r,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${p.spreadsheetId} | URL: ${p.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${m}
ID: ${p.spreadsheetId}
URL: ${p.url}`}catch(d){return await C(a,r,"google","create_sheet",d.message),`Failed to create spreadsheet: ${d.message}`}}case"list_calendar_events":{if(!n)return"Authentication context unavailable.";try{const d=new ee(a,r,n,s||"",o||""),g=t.calendar_id||"primary",p=t.days_ahead||7,m=new Date,w=new Date(m.getTime()+p*24*60*60*1e3),T=await d.calendar.listEvents(g,{timeMin:m.toISOString(),timeMax:w.toISOString(),query:t.query});return T.length===0?`No events found in the next ${p} days.`:T.map(S=>{var $;const I=S.start.dateTime||S.start.date||"TBD",R=S.end.dateTime||S.end.date||"",A=S.location?` 📍 ${S.location}`:"",N=(($=S.attendees)==null?void 0:$.map(G=>G.email).join(", "))||"";return`• ${S.summary} — ${I} to ${R}${A}${N?`
  Attendees: ${N}`:""}`}).join(`
`)}catch(d){return await C(a,r,"google","list_calendar",d.message),`Failed to list events: ${d.message}`}}case"create_calendar_event":{if(!n)return"Authentication context unavailable.";try{const d=new ee(a,r,n,s||"",o||""),g=t.calendar_id||"primary",p=await d.calendar.createEvent(g,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});return`Event created: "${p.summary}"
ID: ${p.id}
Start: ${p.start.dateTime||p.start.date}`}catch(d){return await C(a,r,"google","create_event",d.message),`Failed to create event: ${d.message}`}}case"create_doc":{if(!n)return"Authentication context unavailable.";try{const d=new ee(a,r,n,s||"",o||"");if(!(await d.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const p=await d.docs.createDocument(t.title);t.content&&await d.docs.appendText(p.documentId,t.content);let m="";if(t.folder_name)try{const{token:w}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(a,r,n,s||"",o||"");m=`
Folder: "${(await Wt(w,p.documentId,t.folder_name)).folderName}"`}catch(w){m=`
(Could not move to folder "${t.folder_name}": ${w.message})`}try{await new J(a).store(r,"context",`Document: ${t.title}`,`Document ID: ${p.documentId} | URL: ${p.url}`,6,"working")}catch{}return`Document created: "${t.title}"${m}
ID: ${p.documentId}
URL: ${p.url}`}catch(d){return await C(a,r,"google","create_doc",d.message),`Failed to create document: ${d.message}`}}case"read_doc":{if(!n)return"Authentication context unavailable.";try{const g=await new ee(a,r,n,s||"",o||"").docs.readDocument(t.document_id);return`Document: "${g.title}"

${g.content}`}catch(d){return await C(a,r,"google","read_doc",d.message),`Failed to read document: ${d.message}`}}case"append_to_doc":{if(!n)return"Authentication context unavailable.";try{const d=new ee(a,r,n,s||"",o||"");if(!(await d.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.';await d.docs.appendText(t.document_id,t.content);let p=t.document_id;try{p=(await d.docs.readDocument(t.document_id)).title}catch{}return`Content appended to "${p}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(d){return await C(a,r,"google","append_to_doc",d.message),`Failed to append to document: ${d.message}`}}case"gmail_list":{if(!n)return"Authentication context unavailable.";try{const g=await new ne(a,r,n,s||"",o||"").listMessages({maxResults:t.max_results||10,query:t.query});return g.length===0?"No messages found.":g.map((p,m)=>`${p.isUnread?"● ":"  "}${m+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(d){return await C(a,r,"gmail","list",d.message),(f=d.message)!=null&&f.includes("not connected")?d.message:`Gmail list error: ${d.message}`}}case"gmail_read":{if(!n)return"Authentication context unavailable.";try{const d=new ne(a,r,n,s||"",o||""),g=await d.getMessage(t.message_id);if(!g)return"Message not found.";const p=await d.getMessageBody(t.message_id);return`**${g.subject}**
From: ${g.from}
To: ${g.to}
Date: ${g.date}

${p}`}catch(d){return await C(a,r,"gmail","read",d.message),`Gmail read error: ${d.message}`}}case"gmail_search":{if(!n)return"Authentication context unavailable.";try{const g=await new ne(a,r,n,s||"",o||"").search(t.query,t.max_results||10);return g.length===0?`No results for: ${t.query}`:g.map((p,m)=>`${p.isUnread?"● ":"  "}${m+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(d){return await C(a,r,"gmail","search",d.message),`Gmail search error: ${d.message}`}}case"gmail_send":{if(!n)return"Authentication context unavailable.";try{const g=await new ne(a,r,n,s||"",o||"").send(t.to,t.subject,t.body,{cc:t.cc});return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${g.id}]`}catch(d){return await C(a,r,"gmail","send",d.message),`Gmail send error: ${d.message}`}}case"gmail_draft":{if(!n)return"Authentication context unavailable.";try{const g=await new ne(a,r,n,s||"",o||"").createDraft(t.to,t.subject,t.body);return`Draft created. To: ${t.to}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${g.id}]`}catch(d){return await C(a,r,"gmail","draft",d.message),`Gmail draft error: ${d.message}`}}case"gmail_modify":{if(!n)return"Authentication context unavailable.";try{return await new ne(a,r,n,s||"",o||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(d){return await C(a,r,"gmail","modify",d.message),`Gmail modify error: ${d.message}`}}case"gmail_unread_count":{if(!n)return"Authentication context unavailable.";try{const g=await new ne(a,r,n,s||"",o||"").getUnreadCount();return`You have ${g} unread email${g!==1?"s":""} in Gmail.`}catch(d){return(x=d.message)!=null&&x.includes("not connected")?d.message:`Gmail error: ${d.message}`}}case"drive_list":{if(!n)return"Authentication context unavailable.";try{const{token:d}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(a,r,n,s||"",o||""),g=new URLSearchParams;g.set("pageSize",String(t.max_results||10)),g.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),g.set("orderBy","modifiedTime desc");let p="";t.folder_id?p=`'${t.folder_id}' in parents and trashed = false`:t.query?p=`${t.query} and trashed = false`:p="trashed = false",g.set("q",p);const m=await fetch(`https://www.googleapis.com/drive/v3/files?${g}`,{headers:{Authorization:`Bearer ${d}`}});if(!m.ok)throw new Error(`Drive API error (${m.status})`);const w=await m.json();return(_=w.files)!=null&&_.length?w.files.map((T,S)=>{var N,$;const I=((N=T.mimeType)==null?void 0:N.split(".").pop())||T.mimeType,R=T.size?`${(parseInt(T.size)/1024).toFixed(1)} KB`:"",A=(($=T.modifiedTime)==null?void 0:$.split("T")[0])||"";return`${S+1}. **${T.name}** (${I})
   ${R} · Modified: ${A}
   ${T.webViewLink||""}`}).join(`

`):"No files found."}catch(d){return await C(a,r,"google","drive_list",d.message),`Drive list error: ${d.message}`}}case"drive_search":{if(!n)return"Authentication context unavailable.";try{const{token:d}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(a,r,n,s||"",o||""),g=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,p=new URLSearchParams;p.set("q",g),p.set("pageSize",String(t.max_results||10)),p.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),p.set("orderBy","modifiedTime desc");const m=await fetch(`https://www.googleapis.com/drive/v3/files?${p}`,{headers:{Authorization:`Bearer ${d}`}});if(!m.ok)throw new Error(`Drive API error (${m.status})`);const w=await m.json();return(E=w.files)!=null&&E.length?w.files.map((T,S)=>{var A,N;const I=((A=T.mimeType)==null?void 0:A.split(".").pop())||T.mimeType,R=((N=T.modifiedTime)==null?void 0:N.split("T")[0])||"";return`${S+1}. **${T.name}** (${I}) — Modified: ${R}
   ${T.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(d){return await C(a,r,"google","drive_search",d.message),`Drive search error: ${d.message}`}}case"web_search":try{const d=await mt(t.query,{num:t.num_results||5,site:t.site});return d.error?`Web search failed: ${d.error}`:d.results.length===0?`No results found for "${t.query}".`:d.results.map((g,p)=>`${p+1}. **${g.title}**
   ${g.link}
   ${g.snippet}`).join(`

`)}catch(d){return await C(a,r,"search","web_search",d.message),`Web search error: ${d.message}`}case"read_url":try{const d=t.url;if(!d||!d.startsWith("http://")&&!d.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const g=Math.min(t.max_length||8e3,15e3),{fetchPageContent:p}=await Promise.resolve().then(()=>tn),m=await p(d,g);return m.error?`Failed to read page: ${m.error}`:!m.text||m.text.length<20?`Page at ${d} returned no readable content.`:`Content from ${d} (${m.text.length} chars):

${m.text}`}catch(d){return await C(a,r,"search","read_url",d.message),`Read URL error: ${d.message}`}case"research":{if(!u)return"Research tool requires an LLM provider but none is available.";try{const g=Ha(t.query,u,{depth:t.depth||"quick",site:t.site}),p=new Promise(T=>setTimeout(()=>T(null),45e3)),m=await Promise.race([g,p]);if(m===null){const{webSearch:T}=await Promise.resolve().then(()=>Vr),S=await T(t.query,{num:5});if(S.error||S.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let I=`Research took too long, but here are the top search results:

`;return I+=S.results.map((R,A)=>`${A+1}. **${R.title}**
   ${R.snippet}
   ${R.link}`).join(`

`),I}if(m.error)return`Research failed: ${m.error}`;let w=m.report;return m.sources.length>0&&(w+=`

---
**Sources** (`+m.pagesRead+` pages read):
`,w+=m.sources.map((T,S)=>`[${S+1}] ${T.title}
    ${T.url}`).join(`
`)),w}catch(d){return await C(a,r,"research","research",d.message),`Research error: ${d.message}`}}case"search_places":{if(!n)return"Authentication context unavailable.";try{const d=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!d)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const g=await M(d.encrypted_value,n),p=await La(g,t.query,{type:t.type});return p.error?`Places search failed: ${p.error}`:p.results.length===0?`No places found for "${t.query}".`:p.results.map((m,w)=>{const T=m.rating?` ★${m.rating} (${m.userRatingsTotal||0} reviews)`:"",S=m.openNow!==void 0?m.openNow?" · Open now":" · Closed":"",I=m.googleMapsUri?`
   ${m.googleMapsUri}`:"";return`${w+1}. **${m.name}**${T}${S}
   ${m.address}${I}
   [place_id: ${m.placeId}]`}).join(`

`)}catch(d){return await C(a,r,"google_api","search_places",d.message),`Places search error: ${d.message}`}}case"get_place_details":{if(!n)return"Authentication context unavailable.";try{const d=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!d)return"Google API Key not configured.";const g=await M(d.encrypted_value,n),p=await Na(g,t.place_id);if(p.error)return`Details lookup failed: ${p.error}`;if(!p.details)return"No details found.";const m=p.details;let w=`**${m.name}**
📍 ${m.address}`;if(m.phone&&(w+=`
📞 ${m.phone}`),m.website&&(w+=`
🌐 ${m.website}`),m.rating&&(w+=`
★ ${m.rating}`),m.googleMapsUri&&(w+=`
📌 ${m.googleMapsUri}`),m.openingHours&&(w+=`

Opening Hours:
${m.openingHours.join(`
`)}`),m.reviews&&m.reviews.length>0){w+=`

Recent Reviews:`;for(const T of m.reviews)w+=`
— ${T.author} (★${T.rating}, ${T.time}): "${T.text}"`}return w}catch(d){return await C(a,r,"google_api","place_details",d.message),`Place details error: ${d.message}`}}case"get_directions":{if(!n)return"Authentication context unavailable.";try{const d=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!d)return"Google API Key not configured.";const g=await M(d.encrypted_value,n),p=await $a(g,t.origin,t.destination,{mode:t.mode||"driving"});if(p.error)return`Directions failed: ${p.error}`;if(!p.route)return"No route found.";const m=p.route;let w=`**${m.startAddress}** → **${m.endAddress}**
`;return w+=`📏 ${m.distance} · ⏱️ ${m.duration}`,m.durationInTraffic&&(w+=` (with traffic: ${m.durationInTraffic})`),w+=`
via ${m.summary}`,w+=`

Steps:`,m.steps.forEach((T,S)=>{w+=`
${S+1}. ${T.instruction} (${T.distance}, ${T.duration})`}),w}catch(d){return await C(a,r,"google_api","directions",d.message),`Directions error: ${d.message}`}}case"get_travel_time":{if(!n)return"Authentication context unavailable.";try{const d=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!d)return"Google API Key not configured.";const g=await M(d.encrypted_value,n),p=await Pa(g,t.origin,t.destination,t.mode||"driving");if(p.error)return`Travel time lookup failed: ${p.error}`;let m=`${t.origin} → ${t.destination}: ${p.distance}, ${p.duration}`;return p.durationInTraffic&&(m+=` (with traffic: ${p.durationInTraffic})`),m}catch(d){return await C(a,r,"google_api","travel_time",d.message),`Travel time error: ${d.message}`}}case"translate_text":{if(!n)return"Authentication context unavailable.";try{const d=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!d)return"Google API Key not configured.";const g=await M(d.encrypted_value,n),p=await Ma(g,t.text,t.target_language,t.source_language);return p.error?`Translation failed: ${p.error}`:`[${p.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${p.translatedText}`}catch(d){return await C(a,r,"google_api","translate",d.message),`Translation error: ${d.message}`}}case"search_youtube":{if(!n)return"Authentication context unavailable.";try{const d=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!d)return"Google API Key not configured.";const g=await M(d.encrypted_value,n),p=await ja(g,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return p.error?`YouTube search failed: ${p.error}`:p.results.length===0?`No YouTube results for "${t.query}".`:p.results.map((m,w)=>{var T;return`${w+1}. **${m.title}**
   ${m.channelTitle} · ${((T=m.publishedAt)==null?void 0:T.split("T")[0])||""}
   ${m.description}
   ${m.url}`}).join(`

`)}catch(d){return await C(a,r,"google_api","youtube_search",d.message),`YouTube search error: ${d.message}`}}case"geocode_address":{if(!n)return"Authentication context unavailable.";try{const d=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!d)return"Google API Key not configured.";const g=await M(d.encrypted_value,n),p=await Ba(g,t.address);return p.error?`Geocoding failed: ${p.error}`:p.results.length===0?`Location not found: "${t.address}"`:p.results.map((m,w)=>`${w+1}. ${m.address}
   Coordinates: ${m.lat}, ${m.lng}`).join(`
`)}catch(d){return await C(a,r,"google_api","geocode",d.message),`Geocoding error: ${d.message}`}}default:return`Unknown tool: ${e}`}}async function Ct(e,t,a,r,n,s){var x;const o=new J(t),i=(x=e.metadata)==null?void 0:x.thread_id,l=await o.buildContext(r.id),c=await o.getRecentConversations(r.id,25,i),h=[{role:"system",content:qa(r,l)},...c.map(_=>({role:_.role,content:_.content})),{role:"user",content:e.text}];await o.storeMessage(r.id,e.channel,"user",e.text,"{}",i);const y=10;let v="",f=0;for(let _=0;_<y;_++)try{const E=await a.chat(h,{tools:ht});if(E.usage&&(f+=E.usage.promptTokens+E.usage.completionTokens),E.toolCalls&&E.toolCalls.length>0){E.content&&h.push({role:"assistant",content:E.content});for(const d of E.toolCalls)try{const g=await ft(d.name,d.arguments,t,r.id,r.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,r.timezone,a);h.push({role:"user",content:`[Tool Result for ${d.name}]: ${g}`})}catch(g){await C(t,r.id,"tool",d.name,g.message||"Tool execution failed"),h.push({role:"user",content:`[Tool Error for ${d.name}]: ${g.message||"Execution failed"}`})}continue}v=E.content;break}catch(E){if(n){const d=E.message||"",g=d.includes("401")||d.includes("403")||d.includes("authentication")||d.includes("credit balance"),p=d.includes("429"),m=g?1440:p?10:5;await n.recordError(a.name,d,m)}throw await C(t,r.id,"llm","provider_error",E.message||"Unknown LLM error",{provider:a.name,turn:_}),E}if(n&&f>0)try{await n.recordUsage(a.name,f)}catch{}return await o.storeMessage(r.id,e.channel,"assistant",v,"{}",i),await o.compactHistory(r.id,30),v}const qt={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function on(e){for(const[t,a]of Object.entries(qt))if(e.toLowerCase().includes(t.toLowerCase()))return a;return qt.default}function ln(e,t,a,r){const n=on(r),s=Math.floor(n*.75),o=[];let i=0,l=!1;const c=Et(e);o.push({role:"system",content:e}),i+=c;const u=Et(a);i+=u;const h=s-i,y=[];let v=0;for(let f=t.length-1;f>=0;f--){const x=t[f],_=Et(x.content);if(v+_<=h)y.unshift({role:x.role,content:x.content}),v+=_;else{l=!0;break}}return o.push(...y),o.push({role:"user",content:a}),i+=v,{maxTokens:n,usedTokens:i,messages:o,wasTruncated:l}}async function*cn(e,t,a,r,n,s){var _;const o=new J(t),i=(_=e.metadata)==null?void 0:_.thread_id;yield{type:"thinking",data:{threadId:i,provider:a.name}};const l=await o.buildContext(r.id),c=await o.getRecentConversations(r.id,20,i),u=qa(r,l),h=ln(u,c,e.text,a.name);await o.storeMessage(r.id,e.channel,"user",e.text,"{}",i);const y=10;let v="",f=0;const x=[...h.messages];for(let E=0;E<y;E++)try{E>0&&(yield{type:"thinking",data:{threadId:i}});const d=await a.chat(x,{tools:ht});if(d.usage&&(f+=d.usage.promptTokens+d.usage.completionTokens),d.toolCalls&&d.toolCalls.length>0){d.content&&(yield{type:"chunk",data:{text:d.content,threadId:i}},x.push({role:"assistant",content:d.content}));for(const p of d.toolCalls){yield{type:"tool_start",data:{tool:p.name,toolArgs:p.arguments,threadId:i}};try{const m=await ft(p.name,p.arguments,t,r.id,r.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,r.timezone,a);yield{type:"tool_end",data:{tool:p.name,toolResult:m.substring(0,500)+(m.length>500?"...":""),threadId:i}},x.push({role:"user",content:`[Tool Result for ${p.name}]: ${m}`})}catch(m){await C(t,r.id,"tool",p.name,m.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:p.name,toolResult:`Error: ${m.message||"Execution failed"}`,threadId:i}},x.push({role:"user",content:`[Tool Error for ${p.name}]: ${m.message||"Execution failed"}`})}}continue}v=d.content;const g=50;for(let p=0;p<v.length;p+=g)yield{type:"chunk",data:{text:v.substring(p,p+g),threadId:i}},p+g<v.length&&await new Promise(w=>setTimeout(w,10));break}catch(d){if(n){const g=d.message||"",p=g.includes("401")||g.includes("403")||g.includes("authentication")||g.includes("credit balance"),m=g.includes("429"),w=p?1440:m?10:5;await n.recordError(a.name,g,w)}await C(t,r.id,"llm","provider_error",d.message||"Unknown LLM error",{provider:a.name,turn:E}),yield{type:"error",data:{error:d.message||"An error occurred",threadId:i}};return}if(n&&f>0)try{await n.recordUsage(a.name,f)}catch{}await o.storeMessage(r.id,e.channel,"assistant",v,"{}",i),await o.compactHistory(r.id,30),yield{type:"done",data:{threadId:i,provider:a.name,tokenCount:f}}}async function Mt(e,t,a,r,n,s){var u;const o=new J(t),i=(u=e.metadata)==null?void 0:u.thread_id,l=await o.buildContext(r.id),c=za(e.text,l);if(c.agent==="conversation")return un(e,t,a,r,l,n,i);if(c.agent==="multi"||c.confidence<.5)return Ct(e,t,a,r,n,s);try{return await dn(c.agent,e,t,a,r,l,n,s,i)}catch(h){return await C(t,r.id,"router","subagent_fallback",`${c.agent} failed: ${h.message}`,{route:c}),Ct(e,t,a,r,n,s)}}async function dn(e,t,a,r,n,s,o,i,l){const c=new J(a),u=gt(n.timezone),h=ct(e,n,s,n.timezone,u),y=Fa(e,ht),v=await c.getRecentConversations(n.id,25,l),f=[{role:"system",content:h},...v.map(g=>({role:g.role,content:g.content})),{role:"user",content:t.text}];await c.storeMessage(n.id,t.channel,"user",t.text,"{}",l);const x=10;let _="",E=0,d="";for(let g=0;g<x;g++)try{const p=await r.chat(f,{tools:y.length>0?y:void 0});if(p.usage&&(E+=p.usage.promptTokens+p.usage.completionTokens),p.toolCalls&&p.toolCalls.length>0){p.content&&(d=p.content,f.push({role:"assistant",content:p.content}));for(const m of p.toolCalls)try{const w=await ft(m.name,m.arguments,a,n.id,n.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,n.timezone,r);f.push({role:"user",content:`[Tool Result for ${m.name}]: ${w}`})}catch(w){await C(a,n.id,"tool",m.name,w.message||"Tool execution failed"),f.push({role:"user",content:`[Tool Error for ${m.name}]: ${w.message||"Execution failed"}`})}continue}_=p.content,!_&&d&&(_=d);break}catch(p){if(o){const m=p.message||"",w=m.includes("401")||m.includes("403")||m.includes("authentication")||m.includes("credit balance"),T=m.includes("429"),S=w?1440:T?10:5;await o.recordError(r.name,m,S)}throw await C(a,n.id,"llm","subagent_error",p.message||"Unknown error",{agent:e,provider:r.name,turn:g}),p}if(o&&E>0)try{await o.recordUsage(r.name,E)}catch{}return await c.storeMessage(n.id,t.channel,"assistant",_,"{}",l),await c.compactHistory(n.id,30),_}async function un(e,t,a,r,n,s,o){const i=new J(t),l=gt(r.timezone),c=ct("conversation",r,n,r.timezone,l),u=await i.getRecentConversations(r.id,25,o),h=[{role:"system",content:c},...u.map(f=>({role:f.role,content:f.content})),{role:"user",content:e.text}];await i.storeMessage(r.id,e.channel,"user",e.text,"{}",o);let y=0,v="";try{const f=await a.chat(h,{temperature:.8});f.usage&&(y=f.usage.promptTokens+f.usage.completionTokens),v=f.content}catch(f){if(s){const x=f.message||"",_=x.includes("401")||x.includes("403")||x.includes("authentication")||x.includes("credit balance"),E=x.includes("429"),d=_?1440:E?10:5;await s.recordError(a.name,x,d)}throw await C(t,r.id,"llm","conversation_error",f.message,{provider:a.name}),f}if(s&&y>0)try{await s.recordUsage(a.name,y)}catch{}return await i.storeMessage(r.id,e.channel,"assistant",v,"{}",o),await i.compactHistory(r.id,30),v}async function*pn(e,t,a,r,n,s){var d;const o=new J(t),i=(d=e.metadata)==null?void 0:d.thread_id,l=await o.buildContext(r.id),c=za(e.text,l);if(yield{type:"thinking",data:{threadId:i,provider:a.name}},c.agent==="multi"||c.confidence<.5){yield*cn(e,t,a,r,n,s);return}const u=gt(r.timezone),h=c.agent==="conversation"?ct("conversation",r,l,r.timezone,u):ct(c.agent,r,l,r.timezone,u),y=Fa(c.agent,ht),v=await o.getRecentConversations(r.id,25,i),f=[{role:"system",content:h},...v.map(g=>({role:g.role,content:g.content})),{role:"user",content:e.text}];await o.storeMessage(r.id,e.channel,"user",e.text,"{}",i);const x=10;let _="",E=0;for(let g=0;g<x;g++)try{g>0&&(yield{type:"thinking",data:{threadId:i}});const p=await a.chat(f,{tools:y.length>0?y:void 0});if(p.usage&&(E+=p.usage.promptTokens+p.usage.completionTokens),p.toolCalls&&p.toolCalls.length>0){p.content&&(yield{type:"chunk",data:{text:p.content,threadId:i}},f.push({role:"assistant",content:p.content}));for(const w of p.toolCalls){yield{type:"tool_start",data:{tool:w.name,toolArgs:w.arguments,threadId:i}};try{const T=await ft(w.name,w.arguments,t,r.id,r.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,r.timezone,a);yield{type:"tool_end",data:{tool:w.name,toolResult:T.substring(0,500)+(T.length>500?"...":""),threadId:i}},f.push({role:"user",content:`[Tool Result for ${w.name}]: ${T}`})}catch(T){await C(t,r.id,"tool",w.name,T.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:w.name,toolResult:`Error: ${T.message||"Execution failed"}`,threadId:i}},f.push({role:"user",content:`[Tool Error for ${w.name}]: ${T.message||"Execution failed"}`})}}continue}_=p.content;const m=50;for(let w=0;w<_.length;w+=m)yield{type:"chunk",data:{text:_.substring(w,w+m),threadId:i}},w+m<_.length&&await new Promise(S=>setTimeout(S,10));break}catch(p){if(n){const m=p.message||"",w=m.includes("401")||m.includes("403")||m.includes("authentication")||m.includes("credit balance"),T=m.includes("429"),S=w?1440:T?10:5;await n.recordError(a.name,m,S)}await C(t,r.id,"llm","subagent_stream_error",p.message||"Unknown error",{agent:c.agent,provider:a.name,turn:g}),yield{type:"error",data:{error:p.message||"An error occurred",threadId:i}};return}if(n&&E>0)try{await n.recordUsage(a.name,E)}catch{}await o.storeMessage(r.id,e.channel,"assistant",_,"{}",i),await o.compactHistory(r.id,30),yield{type:"done",data:{threadId:i,provider:a.name,tokenCount:E}}}const B=new ye;async function mn(e,t){var n;const a=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",a),await t()}B.use("/*",mn);B.get("/threads",async e=>{const t=e.get("user"),a=e.req.query("archived")==="1",r=parseInt(e.req.query("limit")||"30"),n=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(t.id,a?1:0,r).all();return e.json({threads:n.results||[]})});B.post("/threads",async e=>{const t=e.get("user"),{title:a}=await e.req.json(),r=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a||"New conversation").first();return e.json({thread:r})});B.put("/threads/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),r=await e.req.json(),n=[],s=[];return r.title!==void 0&&(n.push("title = ?"),s.push(r.title)),r.is_archived!==void 0&&(n.push("is_archived = ?"),s.push(r.is_archived?1:0)),n.push("updated_at = CURRENT_TIMESTAMP"),s.push(a,t.id),n.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${n.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),e.json({success:!0}))});B.delete("/threads/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(a,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});B.post("/upload",async e=>e.json({error:"File upload is not available in this version."},404));B.post("/send",async e=>{const t=e.get("user"),{message:a,channel:r="web",thread_id:n,files:s}=await e.req.json();if(!a||typeof a!="string"||a.trim().length===0)return e.json({error:"Message is required"},400);let o="";if(s&&Array.isArray(s)&&s.length>0){o=`

[Attached files:
`;for(const c of s)o+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(o+=`
  Preview: ${c.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=n;if(!i){const c=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();i=c==null?void 0:c.id}const l={userId:t.id,username:t.username,channel:r,text:a.trim()+o,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:c,rotation:u}=await et(e.env.DB,t.id,t.pin_hash),h=await Mt(l,e.env.DB,c,t,u,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID});return!n&&i?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run():i&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),e.json({response:h,timestamp:new Date().toISOString(),channel:l.channel,provider:c.name,thread_id:i})}catch(c){console.error("Chat error:",c);const u=c.message||"";if(u.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400);if(u.includes("All LLM providers failed"))return e.json({error:u,type:"no_provider",thread_id:i},400);if(u.includes("limit reached"))return e.json({error:u,type:"cost_limit",thread_id:i},429);const h=u.includes("401")||u.includes("403")||u.includes("authentication")||u.includes("credit balance")||u.includes("invalid")&&u.includes("key");try{const{logError:y}=await Promise.resolve().then(()=>It);await y(e.env.DB,t.id,"llm","chat_error",u)}catch{}return e.json({error:h?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:u,type:h?"no_provider":void 0,thread_id:i},h?400:500)}});function Kt(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}B.post("/stream",async e=>{const t=e.get("user"),{message:a,channel:r="web",thread_id:n,files:s}=await e.req.json();if(!a||typeof a!="string"||a.trim().length===0)return e.json({error:"Message is required"},400);let o="";if(s&&Array.isArray(s)&&s.length>0){o=`

[Attached files:
`;for(const c of s)o+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(o+=`
  Preview: ${c.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=n;if(!i){const c=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();i=c==null?void 0:c.id}const l={userId:t.id,username:t.username,channel:r,text:a.trim()+o,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:c,rotation:u}=await et(e.env.DB,t.id,t.pin_hash),h=new ReadableStream({async start(y){const v=new TextEncoder;try{const f=pn(l,e.env.DB,c,t,u,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID});for await(const x of f)x.data.threadId||(x.data.threadId=i),y.enqueue(v.encode(Kt(x)));i&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),y.close()}catch(f){const x={type:"error",data:{error:f.message||"An error occurred",threadId:i}};y.enqueue(v.encode(Kt(x))),y.close()}}});return new Response(h,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(i||"")}})}catch(c){console.error("Stream setup error:",c);const u=c.message||"";return u.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400):u.includes("limit reached")?e.json({error:u,type:"cost_limit",thread_id:i},429):e.json({error:"Something went wrong setting up the stream.",details:u,thread_id:i},500)}});B.get("/threads/:id/messages",async e=>{var s;const t=e.get("user"),a=parseInt(e.req.param("id")),r=parseInt(e.req.query("limit")||"50"),n=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,a,r).all();return e.json({messages:(n.results||[]).reverse(),total:((s=n.results)==null?void 0:s.length)||0})});B.get("/history",async e=>{var l;const t=e.get("user"),a=parseInt(e.req.query("limit")||"50"),r=parseInt(e.req.query("offset")||"0"),n=e.req.query("thread_id");let s,o;n?(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[t.id,parseInt(n),a,r]):(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[t.id,a,r]);const i=await e.env.DB.prepare(s).bind(...o).all();return e.json({messages:(i.results||[]).reverse(),total:((l=i.results)==null?void 0:l.length)||0})});B.delete("/history",async e=>{const t=e.get("user"),a=e.req.query("thread_id");return a?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(a)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});B.get("/dashboard",async e=>{const t=e.get("user");new Date().toISOString().split("T")[0];const[a,r,n,s,o,i]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first(),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first()]);return e.json({threads:(a==null?void 0:a.cnt)||0,active_schedules:(r==null?void 0:r.cnt)||0,memories:(n==null?void 0:n.cnt)||0,recent_threads:s.results||[],provider_usage:[],unread_notifications:(o==null?void 0:o.cnt)||0,errors:(i==null?void 0:i.cnt)||0})});B.get("/gmail/unread",async e=>{const t=e.get("user");try{const a=e.env.GOOGLE_CLIENT_ID,r=e.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return e.json({count:null,reason:"google_not_configured"});const s=await new ne(e.env.DB,t.id,t.pin_hash,a,r).getUnreadCount();return e.json({count:s})}catch(a){return e.json({count:null,reason:a.message})}});B.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));B.get("/notifications/count",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(a==null?void 0:a.cnt)||0})});B.get("/notifications",async e=>{const t=e.get("user"),a=parseInt(e.req.query("limit")||"20"),r=await e.env.DB.prepare(`SELECT id, type, title, body, is_read, source, action_url, created_at 
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,a).all();return e.json({notifications:r.results||[]})});B.put("/notifications/:id/read",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});B.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});B.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const j=new ye;async function hn(e,t){var n;const a=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),await t()}j.use("/*",hn);j.get("/profile",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(a==null?void 0:a.name)||t.name,role:(a==null?void 0:a.role)||t.role,personality_prompt:(a==null?void 0:a.personality_prompt)||t.personality_prompt,telegram_chat_id:(a==null?void 0:a.telegram_chat_id)||t.telegram_chat_id,timezone:(a==null?void 0:a.timezone)||t.timezone,assistant_name:(a==null?void 0:a.assistant_name)||"Karna"})});j.put("/profile",async e=>{const t=e.get("user"),a=await e.req.json(),r=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],n=[],s=[];for(const o of r)a[o]!==void 0&&(n.push(`${o} = ?`),s.push(a[o]));return n.length===0?e.json({error:"No valid fields to update"},400):(n.push("updated_at = CURRENT_TIMESTAMP"),s.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${n.join(", ")} WHERE id = ?`).bind(...s).run(),e.json({success:!0}))});const Ot=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key"];j.get("/credentials",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT id, service, label, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all();return e.json({credentials:(a.results||[]).map(r=>({...r,configured:!0})),available_services:Ot,llm_providers:Ke})});j.put("/credentials",async e=>{const t=e.get("user"),{service:a,value:r,label:n}=await e.req.json();if(!a||!r)return e.json({error:"Service name and value are required"},400);if(!Ot.includes(a))return e.json({error:`Invalid service. Must be one of: ${Ot.join(", ")}`},400);const s=await Lt(r,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,a,n||a,s).run(),e.json({success:!0,service:a})});j.delete("/credentials/:service",async e=>{const t=e.get("user"),a=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,a).run(),e.json({success:!0})});j.get("/memory",async e=>{const t=e.get("user"),a=e.req.query("type"),n=await new J(e.env.DB).getAll(t.id,a||void 0,100);return e.json({memories:n})});j.post("/memory",async e=>{const t=e.get("user"),{type:a,title:r,content:n,importance:s}=await e.req.json();return!a||!r||!n?e.json({error:"Type, title, and content are required"},400):(await new J(e.env.DB).store(t.id,a,r,n,s||5),e.json({success:!0}))});j.delete("/memory/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await new J(e.env.DB).remove(a,t.id),e.json({success:!0})});j.get("/schedules",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:a.results||[]})});j.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),{enabled:r}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r?1:0,a,t.id).run(),e.json({success:!0})});j.delete("/schedules/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});j.get("/errors",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:a.results||[]})});j.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});j.post("/credentials/validate",async e=>{e.get("user");const{service:t,value:a}=await e.req.json();if(!t||!a)return e.json({error:"Service and value required"},400);switch(t){case"anthropic":try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return r.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):r.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${r.status}.`})}catch(r){return e.json({valid:!1,message:`Connection failed: ${r.message}`})}case"openai":try{const r=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${a}`}});return r.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):r.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${r.status}.`})}catch(r){return e.json({valid:!1,message:`Connection failed: ${r.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const r=JSON.parse(a);if(!r.provider||!r.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const n=Ke[r.provider];if(!n)return e.json({valid:!1,message:`Unknown provider: ${r.provider}`});if(n.apiFormat==="anthropic"){const s=await fetch(n.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:n.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return s.ok?e.json({valid:!0,message:`${n.label} API key is valid.`}):s.status===401?e.json({valid:!1,message:`Invalid ${n.label} API key.`}):e.json({valid:!1,message:`${n.label} responded with status ${s.status}.`})}else{const s=n.apiBase+(n.validatePath||"/v1/models"),o=await fetch(s,{headers:{Authorization:`Bearer ${r.apiKey}`}});if(o.ok)return e.json({valid:!0,message:`${n.label} API key is valid.`});if(o.status===401||o.status===403)return e.json({valid:!1,message:`Invalid ${n.label} API key.`});if(o.status===404)try{const i=await fetch(n.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.apiKey}`},body:JSON.stringify({model:n.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return i.ok||i.status===200?e.json({valid:!0,message:`${n.label} API key is valid.`}):i.status===401||i.status===403?e.json({valid:!1,message:`Invalid ${n.label} API key.`}):e.json({valid:!1,message:`${n.label} responded with status ${i.status}.`})}catch(i){return e.json({valid:!1,message:`${n.label} chat test failed: ${i.message}`})}return e.json({valid:!1,message:`${n.label} responded with status ${o.status}.`})}}catch(r){return r instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${r.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});j.get("/google/status",async e=>{const t=e.get("user");try{const a=await Nt(e.env.DB,t.id,t.pin_hash),r=Da(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...a,oauth_client_configured:r})}catch(a){return e.json({connected:!1,error:a.message})}});j.get("/google/auth-url",async e=>{var t;e.get("user");try{const a=e.env.GOOGLE_CLIENT_ID,r=e.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const n=new URL(e.req.url),s=`${n.protocol}//${n.host}/auth/google/callback`,o=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),i=ka(a,s,o);return e.json({auth_url:i,redirect_uri:s})}catch(a){return e.json({error:`Failed to generate auth URL: ${a.message}`},500)}});j.post("/google/disconnect",async e=>{const t=e.get("user");try{return await Oa(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(a){return e.json({error:a.message},500)}});j.post("/google/test",async e=>{const t=e.get("user");try{const{token:a,email:r}=await Ue(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),n=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${a}`}}),s=!0,o=n.ok;return e.json({success:!0,email:r,scopes:{sheets:s,calendar:o,docs:s,drive:s},message:o?`Connected as ${r} — all services working.`:`Connected as ${r} — calendar access issue (${n.status}).`})}catch(a){return e.json({success:!1,error:a.message})}});const Ge=new ye;Ge.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const a=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:a,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});Ge.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const a=Date.now()-t;return e.json({status:"ok",latency_ms:a})}catch(t){return e.json({status:"error",error:t.message},500)}});Ge.get("/status",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const r=a.user_id,[n,s,o,i]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first()]);return e.json({active_schedules:(n==null?void 0:n.cnt)||0,memory_entries:(s==null?void 0:s.cnt)||0,total_messages:(o==null?void 0:o.cnt)||0,unread_errors:(i==null?void 0:i.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});async function gn(e,t,a,r){try{const n=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t).first();if(!n)return;const s=await M(n.encrypted_value,n.pin_hash),o=4e3,i=r.length>o?r.substring(0,o-3)+"...":r;(await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:i,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:i})})}catch{}}function Jt(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}Ge.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);const r=new Date,n=r.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:n})).run()}catch{}const s=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')`).bind(n).all(),o=[];for(const i of s.results||[])try{const l=i.user_timezone||"UTC";let c,u=!1,h=i.state||"active";if(i.schedule_type==="interval"){const f=parseInt(i.schedule_value,10);c=new Date(r.getTime()+f*60*1e3)}else if(i.schedule_type==="daily"){const[f,x]=i.schedule_value.split(":").map(Number),_=Jt(l),E=new Date(_);E.setHours(f,x,0,0),E<=_&&E.setDate(E.getDate()+1);const d=new Date(E.toLocaleString("en-US",{timeZone:"UTC"})),g=new Date(E.toLocaleString("en-US",{timeZone:l})),p=d.getTime()-g.getTime();c=new Date(E.getTime()+p)}else if(i.schedule_type==="weekly"){const[f,x]=i.schedule_value.split(" "),[_,E]=(x||"00:00").split(":").map(Number),g=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(R=>R.toLowerCase()===f.toLowerCase()),p=Jt(l),m=new Date(p);m.setHours(_,E,0,0);let w=(g-m.getDay()+7)%7;w===0&&m<=p&&(w=7),m.setDate(m.getDate()+w);const T=new Date(m.toLocaleString("en-US",{timeZone:"UTC"})),S=new Date(m.toLocaleString("en-US",{timeZone:l})),I=T.getTime()-S.getTime();c=new Date(m.getTime()+I)}else i.schedule_type==="once"?(u=!0,h="completed",c=new Date(r.getTime()+365*24*60*60*1e3)):c=new Date(r.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,c.toISOString(),u?0:i.enabled,h,i.id).run();const v=(JSON.parse(i.action_config||"{}").description||i.description)&&(i.action_type==="check_mail"||i.action_type==="check_calendar"||i.action_type==="check_sheet"||i.action_type==="custom");o.push({job_id:i.id,name:i.name,status:"dispatched",needs_agent:v,next_run:c.toISOString()})}catch(l){o.push({job_id:i.id,name:i.name,status:"error",error:l.message})}return e.json({executed:o.length,results:o,timestamp:n})});Ge.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);const r=parseInt(e.req.param("jobId"),10);if(!r)return e.json({error:"Invalid job ID"},400);const n=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(r).first();if(!n)return e.json({error:"Job not found"},404);const o=JSON.parse(n.action_config||"{}").description||n.description||"",i="⏰ "+(n.name||"Scheduled Task"),l=new Date().toISOString();let c="";try{const y={id:n.user_id,username:n.username||"user",name:n.user_name||"User",pin_hash:n.pin_hash||"",role:n.user_role||"",personality_prompt:n.personality_prompt||"",telegram_chat_id:n.telegram_chat_id||"",timezone:n.user_timezone||"UTC",assistant_name:n.assistant_name||"Karna",created_at:"",updated_at:""},v={userId:n.user_id,username:y.username,channel:"web",text:fn(n.name,o,n.action_type),sessionId:"cron-"+n.id,timestamp:l},{provider:f,rotation:x}=await et(e.env.DB,n.user_id,n.pin_hash);c=n.action_type!=="reminder"&&o.length>0?await Mt(v,e.env.DB,f,y,x,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID}):await Ct(v,e.env.DB,f,y,x,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(y){const v=y.message||"unknown error",f=v.includes("rate_limit")||v.includes("429")||v.includes("quota"),x=v.includes("timeout")||v.includes("Timeout");f?c="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":x?c="Task timed out. Will retry at next scheduled time.":c="Task encountered an error. Will retry at next scheduled time.",await C(e.env.DB,n.user_id,"cron_agent","execution_error",v,{job_id:n.id})}const u=c||o||"Time for your scheduled task.",h=i+`
`+u;return await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(n.user_id,"reminder",i,u,"cron:"+n.id).run(),await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(n.user_id,"system","assistant",h,JSON.stringify({type:"cron",job_id:n.id})).run(),n.telegram_chat_id&&await gn(e.env.DB,n.user_id,n.telegram_chat_id,h),e.json({job_id:r,status:"completed",response_length:c.length})});function fn(e,t,a){return a==="reminder"?`[Scheduled Reminder] "${e}": ${t||"Time for your reminder."}. Respond with a short, clean plain-text summary.`:a==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check Gmail for new/important emails."}
You MUST call gmail_list or gmail_search immediately. Present the results as a concise summary. No markdown headers. Use simple numbered lines.`:a==="check_calendar"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check calendar for upcoming events."}
You MUST call list_calendar_events immediately. Present the results as a concise summary.`:a==="check_sheet"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
You MUST call read_sheet immediately with the relevant spreadsheet. Present the results as a concise summary.`:a==="custom"&&t?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.) and present the results as a concise plain-text summary.`:`[Scheduled task "${e}"]: ${t||"Execute this scheduled task."}. Respond with a short, clean plain-text summary.`}function yn(e,t,a,r){return{userId:e,username:t,channel:"telegram",text:a,sessionId:`telegram-${r}`,timestamp:new Date().toISOString()}}function vn(e,t){return e.replace(/\*\*(.*?)\*\*/g,"*$1*").replace(/#{1,3}\s/g,"*").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const tt=new ye,bn=4e3;async function z(e,t,a,r="Markdown"){var s,o;const n=_n(a,bn);for(const i of n)try{const l=await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:i,parse_mode:r,disable_web_page_preview:!1})});if(!l.ok){const c=await l.json().catch(()=>null);((s=c==null?void 0:c.description)!=null&&s.includes("parse")||(o=c==null?void 0:c.description)!=null&&o.includes("entities"))&&await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:i})})}}catch{}}async function wn(e,t){try{await fetch(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function _n(e,t){if(e.length<=t)return[e];const a=[];let r=e;for(;r.length>0;){if(r.length<=t){a.push(r);break}let n=r.lastIndexOf(`
`,t);n<t*.3&&(n=r.lastIndexOf(" ",t)),n<t*.3&&(n=t),a.push(r.substring(0,n)),r=r.substring(n).trimStart()}return a}async function xn(e,t,a,r,n){switch(e.split("@")[0].toLowerCase()){case"/start":{const o=(r==null?void 0:r.name)||"there",i=(r==null?void 0:r.assistant_name)||"Karna",l=`👋 *Hello, ${o}!*

I'm ${i}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/new — Start a fresh conversation

Just type normally to chat. Everything works — schedules, memory, Gmail, Google Workspace, and more.`+(r?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`);return await z(a,t,l),!0}case"/help":{const i=`🛠 *${(r==null?void 0:r.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`;return await z(a,t,i),!0}case"/status":{if(!r)return await z(a,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app."),!0;try{const[o,i,l,c]=await Promise.all([n.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r.id).first(),n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r.id).first(),n.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(r.id).first(),n.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(r.id).first()]),u=`📊 *System Status*

Active tasks: ${(o==null?void 0:o.cnt)||0}
Memories: ${(i==null?void 0:i.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(c==null?void 0:c.cnt)||0}

Status: ✅ Online`;await z(a,t,u)}catch{await z(a,t,"✅ Online — but had trouble fetching stats.")}return!0}case"/new":return r?(await n.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(r.id).run(),await z(a,t,"🆕 Starting fresh conversation. Your next message begins a new thread."),!0):(await z(a,t,"⚠️ Account not linked."),!0);default:return!1}}tt.post("/webhook",async e=>{var t,a,r,n,s;try{const o=await e.req.json();if(o.callback_query)return await En(e.env.DB,o.callback_query),e.json({ok:!0});const i=o.message;if(!i)return e.json({ok:!0});const l=!!i.text,c=!!i.voice,u=!!i.document,h=!!i.photo,y=!!i.caption;if(!l&&!c&&!u&&!h)return e.json({ok:!0});const v=String(i.chat.id);let f=i.text||"";const x=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(v).first();let _=null;if(x){const m=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(x.id,"telegram_bot_token").first();m&&(_=await M(m.encrypted_value,x.pin_hash))}if(!_){const m=await e.env.DB.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
         JOIN users u ON c.user_id = u.id 
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();m&&(_=await M(m.encrypted_value,m.pin_hash))}if(!_)return e.json({ok:!0,message:"Bot token not configured"});if(f.startsWith("/")&&await xn(f,v,_,x,e.env.DB))return e.json({ok:!0});if(!x)return await z(_,v,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${v}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`),e.json({ok:!0});if(i.voice&&_&&x)try{await z(_,v,"🎤 Processing voice note...");const w=await(await fetch(`https://api.telegram.org/bot${_}/getFile?file_id=${i.voice.file_id}`)).json();if(w.ok&&((t=w.result)!=null&&t.file_path)){const S=await(await fetch(`https://api.telegram.org/file/bot${_}/${w.result.file_path}`)).blob();let I="",R="",A="whisper-1";const N=await e.env.DB.prepare("SELECT service, encrypted_value FROM credentials WHERE user_id = ? AND (service IN ('llm_slot_1', 'llm_slot_2', 'llm_slot_3', 'openai'))").bind(x.id).all();for(const ae of N.results){const Ie=await M(ae.encrypted_value,x.pin_hash);if(ae.service==="openai"){I="https://api.openai.com/v1/audio/transcriptions",R=Ie;break}else if(ae.service.startsWith("llm_slot_"))try{const de=JSON.parse(Ie);if(de.provider==="openai"){I="https://api.openai.com/v1/audio/transcriptions",R=de.apiKey;break}else if(de.provider==="groq"){I="https://api.groq.com/openai/v1/audio/transcriptions",R=de.apiKey,A="whisper-large-v3";break}}catch{}}if(!I)return await z(_,v,"⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys)."),e.json({ok:!0});const $=new FormData;$.append("file",S,"voice.ogg"),$.append("model",A);const G=await fetch(I,{method:"POST",headers:{Authorization:`Bearer ${R}`},body:$});if(!G.ok){const ae=await G.text();return await z(_,v,`⚠️ Transcription failed: ${G.status} ${ae}`),e.json({ok:!0})}f=(await G.json()).text,await z(_,v,`🗣️ *You said:* ${f}`)}}catch(m){return await z(_,v,`⚠️ Failed to process voice note: ${m.message}`),e.json({ok:!0})}if((u||h)&&_&&x)try{let m,w="unknown",T="unknown",S=0;if(u)m=i.document.file_id,w=i.document.file_name||"document",T=i.document.mime_type||"unknown",S=i.document.file_size||0;else if(h){const I=i.photo[i.photo.length-1];m=I.file_id,w="photo.jpg",T="image/jpeg",S=I.file_size||0}if(m){const R=await(await fetch(`https://api.telegram.org/bot${_}/getFile?file_id=${m}`)).json();let A="";if(R.ok&&((a=R.result)!=null&&a.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(w)||/^text\/|application\/json|application\/xml|application\/csv/i.test(T))&&S<5e4)try{A=await(await fetch(`https://api.telegram.org/file/bot${_}/${R.result.file_path}`)).text()}catch{}const N=i.caption||"",$=`[Telegram file received: "${w}" (${T}, ${Math.round(S/1024)}KB)]`;A?f=`${N?N+`

`:""}${$}
File contents:
${A.substring(0,8e3)}${A.length>8e3?`
[...truncated]`:""}`:f=`${N?N+`

`:""}${$}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(m){if(y&&i.caption)f=i.caption;else return await z(_,v,`⚠️ Received your file but couldn't process it: ${m.message}`),e.json({ok:!0})}if(!f)return e.json({ok:!0});await wn(_,v);let E=await e.env.DB.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(x.id).first();E?await e.env.DB.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(E.id).run():E={id:(await e.env.DB.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(x.id).run()).meta.last_row_id};const d=yn(x.id,x.username,f,v);d.metadata={thread_id:E.id};let g,p;try{const m=await et(e.env.DB,x.id,x.pin_hash);g=m.provider,p=m.rotation}catch(m){console.error("Telegram provider setup error:",m);const w=(r=m.message)!=null&&r.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(n=m.message)!=null&&n.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${m.message||"Unknown error"}`;return await z(_,v,w),e.json({ok:!0})}try{const m=await Mt(d,e.env.DB,g,x,p,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID}),w=vn(m,"telegram");await z(_,v,w||"(empty response)")}catch(m){console.error("Telegram agent error:",m);const w=(s=m.message)!=null&&s.includes("API error")?`⚠️ AI provider returned an error. The provider (${g.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(m.message||"Unknown").substring(0,200)}`;await z(_,v,w);try{const{logError:T}=await Promise.resolve().then(()=>It);await T(e.env.DB,x.id,"telegram","agent_error",m.message||"Agent error",{provider:g.name})}catch{}}return e.json({ok:!0})}catch(o){console.error("Telegram webhook error:",o);try{const{logError:i}=await Promise.resolve().then(()=>It);await i(e.env.DB,null,"telegram","webhook_error",o.message||"Unknown telegram error")}catch{}return e.json({ok:!0,error:o.message})}});tt.post("/setup-webhook",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const{webhook_url:r}=await e.req.json(),n=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!n)return e.json({error:"Telegram bot token not configured in Settings"},400);const s=await M(n.encrypted_value,a.pin_hash);if(!r){const u=await(await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(u)}const i=await(await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r,allowed_updates:["message"],drop_pending_updates:!1})})).json();return e.json(i)});tt.get("/webhook-status",async e=>{var s,o,i,l,c,u;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return e.json({configured:!1,error:"Bot token not set"});const n=await M(r.encrypted_value,a.pin_hash);try{const y=await(await fetch(`https://api.telegram.org/bot${n}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((o=y.result)==null?void 0:o.url)||"",has_webhook:!!((i=y.result)!=null&&i.url),pending_updates:((l=y.result)==null?void 0:l.pending_update_count)||0,last_error:((c=y.result)==null?void 0:c.last_error_message)||"",last_error_date:((u=y.result)==null?void 0:u.last_error_date)||null})}catch(h){return e.json({configured:!0,error:h.message})}});tt.post("/detect-chat-id",async e=>{var s,o;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return e.json({error:"Bot token not configured"},400);const n=await M(r.encrypted_value,a.pin_hash);try{const c=((o=(await(await fetch(`https://api.telegram.org/bot${n}/getWebhookInfo`)).json()).result)==null?void 0:o.url)||"";await fetch(`https://api.telegram.org/bot${n}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(_=>setTimeout(_,500));const h=await(await fetch(`https://api.telegram.org/bot${n}/getUpdates?limit=10&timeout=0`)).json();c&&await fetch(`https://api.telegram.org/bot${n}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:c,allowed_updates:["message"]})});const y=h.result||[];if(y.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const v=[],f=new Set;for(let _=y.length-1;_>=0;_--){const E=y[_].message;if(E&&E.chat){const d=String(E.chat.id);f.has(d)||(f.add(d),v.push({chat_id:d,name:[E.chat.first_name,E.chat.last_name].filter(Boolean).join(" ")||E.chat.title||"Unknown",username:E.chat.username||"",date:new Date((E.date||0)*1e3).toISOString()}))}}if(v.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const x=v[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(x,a.user_id).run(),e.json({found:!0,chat_id:x,name:v[0].name,all_chats:v,message:`Chat ID ${x} detected and saved to your profile.`})}catch(i){return e.json({error:`Detection failed: ${i.message}`},500)}});async function En(e,t){var x;const{id:a,data:r,message:n,from:s}=t;if(!r||!n)return;const o=r.split(":");if(o[0]!=="briefing_toggle"||o.length<3)return;const i=o[1],l=parseInt(o[2]);if(!l||!i)return;const c=String(n.chat.id),u=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(c).first();if(!u)return;const h=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(u.id,l,i).first();if(!h)return;const y=h.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(y,y,h.id).run();const v=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(u.id).first();if(!v)return;const f=await M(v.encrypted_value,v.pin_hash);if(await fetch(`https://api.telegram.org/bot${f}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:a,text:y?"✅ Checked!":"☐ Unchecked"})}),(x=n.reply_markup)!=null&&x.inline_keyboard){const _=n.reply_markup.inline_keyboard.map(E=>E.map(d=>{var g;if((g=d.callback_data)!=null&&g.includes(i)){const p=y?"✅":"☐",m=d.text.replace(/^[☐✅]\s*/,"");return{...d,text:`${p} ${m}`}}return d}));try{await fetch(`https://api.telegram.org/bot${f}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:c,message_id:n.message_id,reply_markup:{inline_keyboard:_}})})}catch{}}}function Tn(e){const t=new Date,a=new Date(t.toLocaleString("en-US",{timeZone:e})),r=new Date(a);r.setDate(r.getDate()+1),r.setHours(0,0,0,0);const n=new Date(r);n.setHours(23,59,59,999);const s=r.toISOString().split("T")[0];return{start:r.toISOString(),end:n.toISOString(),dateStr:s}}async function kn(e,t,a,r,n,s){try{return(await new $t(e,t,a,r,n).listEvents("primary",{timeMin:s.start,timeMax:s.end,maxResults:50})).map(l=>{var c;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(c=l.attendees)==null?void 0:c.map(u=>u.displayName||u.email),source:"google"}})}catch(o){return console.error("Google Calendar fetch error:",o.message),[]}}async function Sn(e,t,a,r,n){try{const s=new ne(e,t,a,r,n),o=await s.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),i=await s.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const h of o){const y=h.from.split("<")[0].trim()||h.from;l[y]=(l[y]||0)+1}const c=Object.entries(l).sort(([,h],[,y])=>y-h).slice(0,5).map(([h])=>h),u=o.some(h=>h.subject.toLowerCase().includes("urgent")||h.subject.toLowerCase().includes("asap")||h.subject.toLowerCase().includes("immediately"));return{unreadCount:o.length,importantCount:i.length,topSenders:c,hasUrgent:u}}catch(s){return console.error("Gmail fetch error:",s.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function In(e,t){var a;try{const r=await e.prepare(`
      SELECT name, description, next_run 
      FROM cron_jobs 
      WHERE user_id = ? AND enabled = 1 AND state != 'completed'
      ORDER BY next_run ASC
      LIMIT 10
    `).bind(t).all(),n=new Date,s=new Date(n);s.setDate(s.getDate()+1);const o=(r.results||[]).map(l=>l.name),i=(r.results||[]).filter(l=>new Date(l.next_run)<=s).length;return{pending:((a=r.results)==null?void 0:a.length)||0,dueToday:i,items:o}}catch(r){return console.error("Tasks fetch error:",r.message),{pending:0,dueToday:0,items:[]}}}async function Dn(e){const t=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],a=[];for(const r of t){const n=`latest ${r} news today`;try{const s=await mt(n,{num:3});if(s.results){for(const o of s.results.slice(0,2))if(!a.some(i=>i.url===o.link)&&(a.push({title:o.title,summary:o.snippet,url:o.link,source:o.displayLink}),a.length>=5))break}}catch(s){console.error(`News search error for "${n}":`,s.message)}if(a.length>=5)break}return a.slice(0,5)}function Cn(e){const t=[];t.push(`📋 Briefing for ${e.targetDate}`),t.push("");const a=e.calendar.totalCount;if(a>0){t.push(`📅 Tomorrow: ${a} event${a===1?"":"s"}`);for(const n of e.calendar.google.slice(0,5)){const s=n.startTime?new Date(n.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${s} ${n.title}`)}}else t.push("📅 Tomorrow: No events scheduled");t.push("");const r=e.emails.gmail.unreadCount;if(r>0?(t.push(`📧 Gmail: ${r} unread`),e.emails.gmail.hasUrgent&&t.push("   ⚠️ Contains urgent messages")):t.push("📧 Gmail: Inbox clear"),t.push(""),e.tasks.pending>0?t.push(`✅ Tasks: ${e.tasks.pending} pending (${e.tasks.dueToday} due soon)`):t.push("✅ Tasks: All caught up"),t.push(""),e.news.items.length>0){t.push("🤖 AI News Today:");for(const n of e.news.items)t.push(`   • ${n.title.substring(0,80)}${n.title.length>80?"...":""}`)}return t.join(`
`)}function On(e){const t=[];let a=0;for(const r of e.calendar.google)t.push({type:"calendar",key:r.id,text:`${r.title} - ${new Date(r.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:r},sortOrder:a++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:a++});for(const r of e.tasks.items)t.push({type:"task",key:`task-${r}`,text:r,metadata:{},sortOrder:a++});for(const r of e.news.items)t.push({type:"news",key:`news-${r.url}`,text:`📰 ${r.title}`,metadata:{url:r.url,source:r.source},sortOrder:a++});return t}async function Rn(e,t){const a=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!a)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let r;try{r=JSON.parse(a.components)}catch{r={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const n=a.news_topics?a.news_topics.split(",").map(s=>s.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:r,newsTopics:n}}async function Ka(e,t,a){var E;const r=t.timezone||"Asia/Kolkata",n=Tn(r),{components:s,newsTopics:o}=await Rn(e,t.id),i=[],l=[];s.google_calendar&&(i.push(kn(e,t.id,t.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET,n)),l.push("googleEvents")),s.gmail&&(i.push(Sn(e,t.id,t.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),s.tasks&&(i.push(In(e,t.id)),l.push("tasks")),s.news&&(i.push(Dn(o)),l.push("news"));const c=await Promise.all(i),u={};l.forEach((d,g)=>{u[d]=c[g]});const h={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},y={pending:0,dueToday:0,items:[]},v={generatedAt:new Date().toISOString(),targetDate:n.dateStr,calendar:{google:u.googleEvents||[],totalCount:((E=u.googleEvents)==null?void 0:E.length)||0},emails:{gmail:u.gmailSummary||h},tasks:u.tasks||y,news:{items:u.news||[],fetchedAt:new Date().toISOString()},summary:""};v.summary=Cn(v);const f=On(v),x=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(t.id,JSON.stringify(v)).first(),_=(x==null?void 0:x.id)||0;for(const d of f)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(_,d.type,d.key,d.text,JSON.stringify(d.metadata),d.sortOrder).run();return{briefingId:_,content:v,items:f}}async function An(e,t,a){const r=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,t).first();if(!r)return null;const n=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(a).all();return{briefing:{...r,content:JSON.parse(r.content_json||"{}")},items:n.results||[]}}async function Ln(e,t,a,r){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,t).first())return null;const s=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(r,a).first();if(!s)return null;const o=s.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(o,o,r,a).run(),{checked:o===1}}async function Nn(e,t,a=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.sent_at DESC
    LIMIT ?
  `).bind(t,a).all()).results||[]).map(n=>({...n,content:JSON.parse(n.content_json||"{}")}))}function $n(e,t,a=new Date){const r=new Date(a.toLocaleString("en-US",{timeZone:t})),n=r.getHours(),s=r.getMinutes(),[o,i]=e.split(":").map(Number),l=n*60+s,c=o*60+i;return l===c}function Mn(e,t){const a=e.summary,r=[];for(const n of t.slice(0,10))r.push([{text:`☐ ${n.text.substring(0,40)}${n.text.length>40?"...":""}`,callback_data:`briefing_toggle:${n.key}`}]);return{text:a,inlineKeyboard:r}}const Y=new ye;async function Ja(e,t){var n;if(e.req.path.includes("/cron/"))return t();const a=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",a),await t()}Y.use("/*",Ja);Y.get("/briefings",async e=>{const t=e.get("user"),a=parseInt(e.req.query("limit")||"10");try{const r=await Nn(e.env.DB,t.id,a);return e.json({briefings:r})}catch(r){return e.json({error:r.message},500)}});Y.get("/briefings/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));try{const r=await An(e.env.DB,t.id,a);return r?e.json(r):e.json({error:"Briefing not found"},404)}catch(r){return e.json({error:r.message},500)}});Y.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),r=parseInt(e.req.param("itemId"));try{const n=await Ln(e.env.DB,t.id,a,r);return n?e.json(n):e.json({error:"Item not found"},404)}catch(n){return e.json({error:n.message},500)}});Y.post("/briefings/generate",async e=>{const t=e.get("user");try{const a=await Ka(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(a)}catch(a){return e.json({error:a.message},500)}});Y.get("/briefing-preferences",async e=>{const t=e.get("user");try{const a=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!a){const n={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:n})}const r={briefingTime:a.briefing_time,briefingEnabled:a.briefing_enabled!==0,components:JSON.parse(a.components),newsTopics:a.news_topics.split(",").map(n=>n.trim()).filter(Boolean),notificationChannels:JSON.parse(a.notification_channels),proactiveLevel:a.proactive_level};return e.json({preferences:r})}catch(a){return e.json({error:a.message},500)}});Y.post("/briefing-preferences",async e=>{const t=e.get("user"),a=await e.req.json(),r=[];if(a.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(a.briefingTime)||r.push("Invalid time format. Use HH:MM (e.g., 20:00)")),a.newsTopics&&(a.newsTopics.length>5&&r.push("Maximum 5 news topics allowed"),a.newsTopics.some(n=>n.length>50)&&r.push("Each news topic must be 50 characters or less")),a.proactiveLevel&&!["conservative","moderate","aggressive"].includes(a.proactiveLevel)&&r.push("Invalid proactive level. Use conservative, moderate, or aggressive"),r.length>0)return e.json({error:r.join("; ")},400);try{const n=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),s=a.components?JSON.stringify(a.components):null,o=a.notificationChannels?JSON.stringify(a.notificationChannels):null,i=a.newsTopics?a.newsTopics.join(", "):null;if(n){const l=[],c=[];a.briefingTime!==void 0&&(l.push("briefing_time = ?"),c.push(a.briefingTime)),a.briefingEnabled!==void 0&&(l.push("briefing_enabled = ?"),c.push(a.briefingEnabled?1:0)),s!==null&&(l.push("components = ?"),c.push(s)),i!==null&&(l.push("news_topics = ?"),c.push(i)),o!==null&&(l.push("notification_channels = ?"),c.push(o)),a.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),c.push(a.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),c.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...c).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,a.briefingTime||"20:00",s||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',i||"AI, LLM, Tools, Agentic Workflows, AI Features",o||'{"telegram":true,"web":true}',a.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(n){return e.json({error:n.message},500)}});Y.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(a){return e.json({error:a.message},500)}});Y.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),n=[],s=new Date;for(const o of r.results||[]){if(!o.briefing_enabled)continue;const i=o.timezone||"Asia/Kolkata",l=o.briefing_time||"20:00";if($n(l,i,s))try{const c=await Ka(e.env.DB,o,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});if(o.telegram_chat_id){const{text:u,inlineKeyboard:h}=Mn(c.content,c.items);await Bn(e.env.DB,o,u,h,c.briefingId)}n.push({user_id:o.id,status:"success",briefing_id:c.briefingId,briefing_time:l,timezone:i})}catch(c){n.push({user_id:o.id,status:"error",error:c.message})}}return e.json({executed:n.length,results:n})}catch(r){return e.json({error:r.message},500)}});Y.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id IS NOT NULL").all(),n=[],s=new Date,o=new Date(s.getTime()+600*1e3).toISOString(),i=new Date(s.getTime()+900*1e3).toISOString();for(const l of r.results||[])try{const c=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!c)continue;const u=await M(c.encrypted_value,l.pin_hash),y=JSON.parse(u).access_token;if(!y)continue;const v=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(s.toISOString())}&timeMax=${encodeURIComponent(i)}&maxResults=10`,{headers:{Authorization:`Bearer ${y}`}});if(!v.ok)continue;const x=((await v.json()).items||[]).filter(d=>{var p;const g=(p=d.start)==null?void 0:p.dateTime;return g?g>=s.toISOString()&&g<=o:!1});if(x.length===0){n.push({user_id:l.id,reminders_sent:0});continue}const _=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(l.id).first();if(!_)continue;const E=await M(_.encrypted_value,l.pin_hash);for(const d of x){const g=new Date(d.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),p=d.location?`
📍 ${d.location}`:"",m=`⏰ Meeting in 10 minutes!

*${d.summary||"Untitled Event"}*
🕐 ${g}${p}`;await fetch(`https://api.telegram.org/bot${E}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l.telegram_chat_id,text:m,parse_mode:"Markdown"})})}n.push({user_id:l.id,reminders_sent:x.length})}catch(c){n.push({user_id:l.id,status:"error",error:c.message})}return e.json({executed:n.length,results:n})}catch(r){return e.json({error:r.message},500)}});async function Bn(e,t,a,r,n){try{const s=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!s)return;const o=await M(s.encrypted_value,s.pin_hash);await fetch(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:`📋 *Briefing*

${a}`,parse_mode:"Markdown",reply_markup:{inline_keyboard:r.map(i=>i.map(l=>({...l,callback_data:`${l.callback_data}:${n}`})))}})}),await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(n).run()}catch(s){console.error("Telegram briefing error:",s.message)}}Y.delete("/briefings/:id",Ja,async e=>{const t=e.get("user").id,a=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(a,t).run(),e.json({success:!0})});const Q=new ye;Q.use("/api/*",Nr());Q.route("/api/auth",ve);Q.route("/api/chat",B);Q.route("/api/settings",j);Q.route("/api/system",Ge);Q.route("/api/telegram",tt);Q.route("/api/proactive",Y);Q.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),a=t.searchParams.get("code"),r=t.searchParams.get("state"),n=t.searchParams.get("error");if(n)return e.html(Ce(!1,`Google denied access: ${n}`));if(!a||!r)return e.html(Ce(!1,"Missing authorization code or state parameter."));try{const o=JSON.parse(atob(r)).sessionId;if(!o)return e.html(Ce(!1,"Invalid state parameter — missing session."));const i=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(o).first();if(!i)return e.html(Ce(!1,"Session expired. Please log in again and retry."));const l=i.user_id,c=i.pin_hash,u=`${t.protocol}//${t.host}/auth/google/callback`,h=await Ca(e.env.DB,l,c,a,u,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(Ce(!0,`Connected as ${h.email}`,h.email))}catch(s){return e.html(Ce(!1,`OAuth failed: ${s.message}`))}});Q.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(ya())));Q.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(ya())));function Ce(e,t,a){return`<!DOCTYPE html>
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
</body></html>`}async function jn(e,t,a){const r="https://karna-5xs.pages.dev",s={"Content-Type":"application/json","X-Cron-Secret":t.CRON_SECRET||"karna-cron-default-v1"};try{const i=await(await fetch(`${r}/api/system/cron/execute`,{method:"POST",headers:s})).json();if(i.results&&i.results.length>0){const c=i.results.filter(h=>h.needs_agent&&h.status==="dispatched");if(c.length>0){const h=c.map(y=>fetch(`${r}/api/system/cron/run-task/${y.job_id}`,{method:"POST",headers:s}).then(v=>v.json()).catch(v=>({job_id:y.job_id,error:v.message})));a.waitUntil(Promise.allSettled(h).then(y=>{console.log(`Cron: ${i.executed} dispatched, ${c.length} agent tasks`,JSON.stringify(y.map(v=>v.status==="fulfilled"?v.value:v.reason)))}))}const u=i.results.filter(h=>!h.needs_agent&&h.status==="dispatched");if(u.length>0){const h=u.map(y=>fetch(`${r}/api/system/cron/run-task/${y.job_id}`,{method:"POST",headers:s}).catch(()=>{}));a.waitUntil(Promise.allSettled(h))}}a.waitUntil(fetch(`${r}/api/proactive/cron/evening-briefing`,{method:"POST",headers:s}).then(c=>c.json()).then(c=>{c.executed>0&&console.log("Evening briefing result:",JSON.stringify(c))}).catch(c=>{console.error("Evening briefing error:",c.message)})),new Date().getMinutes()%5<2&&a.waitUntil(fetch(`${r}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:s}).then(c=>c.json()).then(c=>{var u;(u=c.results)!=null&&u.some(h=>h.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(c))}).catch(()=>{}))}catch(o){console.error("Scheduled cron error:",o.message||o)}}const Pn={fetch:Q.fetch,scheduled:jn},Yt=new ye,Un=Object.assign({"/src/index.tsx":Pn});let Ya=!1;for(const[,e]of Object.entries(Un))e&&(Yt.all("*",t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),Yt.notFound(t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),Ya=!0);if(!Ya)throw new Error("Can't import modules from ['/src/index.tsx']");export{Yt as default};
