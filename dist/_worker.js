var Gr=Object.defineProperty;var Rt=e=>{throw TypeError(e)};var Hr=(e,t,r)=>t in e?Gr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var E=(e,t,r)=>Hr(e,typeof t!="symbol"?t+"":t,r),ut=(e,t,r)=>t.has(e)||Rt("Cannot "+r);var b=(e,t,r)=>(ut(e,t,"read from private field"),r?r.call(e):t.get(e)),O=(e,t,r)=>t.has(e)?Rt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),k=(e,t,r,a)=>(ut(e,t,"write to private field"),a?a.call(e,r):t.set(e,r),r),C=(e,t,r)=>(ut(e,t,"access private method"),r);var Dt=(e,t,r,a)=>({set _(n){k(e,t,n,r)},get _(){return b(e,t,a)}});var At=(e,t,r)=>(a,n)=>{let s=-1;return o(0);async function o(i){if(i<=s)throw new Error("next() called multiple times");s=i;let l,d=!1,u;if(e[i]?(u=e[i][0][0],a.req.routeIndex=i):u=i===e.length&&n||void 0,u)try{l=await u(a,()=>o(i+1))}catch(h){if(h instanceof Error&&t)a.error=h,l=await t(h,a),d=!0;else throw h}else a.finalized===!1&&r&&(l=await r(a));return l&&(a.finalized===!1||d)&&(a.res=l),a}},Fr=Symbol(),zr=async(e,t=Object.create(null))=>{const{all:r=!1,dot:a=!1}=t,s=(e instanceof rr?e.raw.headers:e.headers).get("Content-Type");return s!=null&&s.startsWith("multipart/form-data")||s!=null&&s.startsWith("application/x-www-form-urlencoded")?qr(e,{all:r,dot:a}):{}};async function qr(e,t){const r=await e.formData();return r?Wr(r,t):{}}function Wr(e,t){const r=Object.create(null);return e.forEach((a,n)=>{t.all||n.endsWith("[]")?Kr(r,n,a):r[n]=a}),t.dot&&Object.entries(r).forEach(([a,n])=>{a.includes(".")&&(Jr(r,a,n),delete r[a])}),r}var Kr=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Jr=(e,t,r)=>{let a=e;const n=t.split(".");n.forEach((s,o)=>{o===n.length-1?a[s]=r:((!a[s]||typeof a[s]!="object"||Array.isArray(a[s])||a[s]instanceof File)&&(a[s]=Object.create(null)),a=a[s])})},Xt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Yr=e=>{const{groups:t,path:r}=Vr(e),a=Xt(r);return Xr(a,t)},Vr=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,a)=>{const n=`@${a}`;return t.push([n,r]),n}),{groups:t,path:e}},Xr=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[a]=t[r];for(let n=e.length-1;n>=0;n--)if(e[n].includes(a)){e[n]=e[n].replace(a,t[r][1]);break}}return e},tt={},Zr=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const a=`${e}#${t}`;return tt[a]||(r[2]?tt[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:tt[a]=[e,r[1],!0]),tt[a]}return null},Et=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Qr=e=>Et(e,decodeURI),Zt=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let a=r;for(;a<t.length;a++){const n=t.charCodeAt(a);if(n===37){const s=t.indexOf("?",a),o=t.indexOf("#",a),i=s===-1?o===-1?void 0:o:o===-1?s:Math.min(s,o),l=t.slice(r,i);return Qr(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(n===63||n===35)break}return t.slice(r,a)},ea=e=>{const t=Zt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Se=(e,t,...r)=>(r.length&&(t=Se(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Qt=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let a="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))a+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){r.length===0&&a===""?r.push("/"):r.push(a);const s=n.replace("?","");a+="/"+s,r.push(a)}else a+="/"+n}),r.filter((n,s,o)=>o.indexOf(n)===s)},pt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Et(e,tr):e):e,er=(e,t,r)=>{let a;if(!r&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const i=e.charCodeAt(o+t.length+1);if(i===61){const l=o+t.length+2,d=e.indexOf("&",l);return pt(e.slice(l,d===-1?void 0:d))}else if(i==38||isNaN(i))return"";o=e.indexOf(`&${t}`,o+1)}if(a=/[%+]/.test(e),!a)return}const n={};a??(a=/[%+]/.test(e));let s=e.indexOf("?",8);for(;s!==-1;){const o=e.indexOf("&",s+1);let i=e.indexOf("=",s);i>o&&o!==-1&&(i=-1);let l=e.slice(s+1,i===-1?o===-1?void 0:o:i);if(a&&(l=pt(l)),s=o,l==="")continue;let d;i===-1?d="":(d=e.slice(i+1,o===-1?void 0:o),a&&(d=pt(d))),r?(n[l]&&Array.isArray(n[l])||(n[l]=[]),n[l].push(d)):n[l]??(n[l]=d)}return t?n[t]:n},ta=er,ra=(e,t)=>er(e,t,!0),tr=decodeURIComponent,Nt=e=>Et(e,tr),Ce,F,se,ar,nr,vt,ie,qt,rr=(qt=class{constructor(e,t="/",r=[[]]){O(this,se);E(this,"raw");O(this,Ce);O(this,F);E(this,"routeIndex",0);E(this,"path");E(this,"bodyCache",{});O(this,ie,e=>{const{bodyCache:t,raw:r}=this,a=t[e];if(a)return a;const n=Object.keys(t)[0];return n?t[n].then(s=>(n==="json"&&(s=JSON.stringify(s)),new Response(s)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,k(this,F,r),k(this,Ce,{})}param(e){return e?C(this,se,ar).call(this,e):C(this,se,nr).call(this)}query(e){return ta(this.url,e)}queries(e){return ra(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,a)=>{t[a]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await zr(this,e))}json(){return b(this,ie).call(this,"text").then(e=>JSON.parse(e))}text(){return b(this,ie).call(this,"text")}arrayBuffer(){return b(this,ie).call(this,"arrayBuffer")}blob(){return b(this,ie).call(this,"blob")}formData(){return b(this,ie).call(this,"formData")}addValidatedData(e,t){b(this,Ce)[e]=t}valid(e){return b(this,Ce)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Fr](){return b(this,F)}get matchedRoutes(){return b(this,F)[0].map(([[,e]])=>e)}get routePath(){return b(this,F)[0].map(([[,e]])=>e)[this.routeIndex].path}},Ce=new WeakMap,F=new WeakMap,se=new WeakSet,ar=function(e){const t=b(this,F)[0][this.routeIndex][1][e],r=C(this,se,vt).call(this,t);return r&&/\%/.test(r)?Nt(r):r},nr=function(){const e={},t=Object.keys(b(this,F)[0][this.routeIndex][1]);for(const r of t){const a=C(this,se,vt).call(this,b(this,F)[0][this.routeIndex][1][r]);a!==void 0&&(e[r]=/\%/.test(a)?Nt(a):a)}return e},vt=function(e){return b(this,F)[1]?b(this,F)[1][e]:e},ie=new WeakMap,qt),aa={Stringify:1},sr=async(e,t,r,a,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const s=e.callbacks;return s!=null&&s.length?(n?n[0]+=e:n=[e],Promise.all(s.map(i=>i({phase:t,buffer:n,context:a}))).then(i=>Promise.all(i.filter(Boolean).map(l=>sr(l,t,!1,a,n))).then(()=>n[0]))):Promise.resolve(e)},na="text/plain; charset=UTF-8",mt=(e,t)=>({"Content-Type":e,...t}),We,Ke,te,Re,re,H,Je,De,Ae,ye,Ye,Ve,le,Ie,Wt,sa=(Wt=class{constructor(e,t){O(this,le);O(this,We);O(this,Ke);E(this,"env",{});O(this,te);E(this,"finalized",!1);E(this,"error");O(this,Re);O(this,re);O(this,H);O(this,Je);O(this,De);O(this,Ae);O(this,ye);O(this,Ye);O(this,Ve);E(this,"render",(...e)=>(b(this,De)??k(this,De,t=>this.html(t)),b(this,De).call(this,...e)));E(this,"setLayout",e=>k(this,Je,e));E(this,"getLayout",()=>b(this,Je));E(this,"setRenderer",e=>{k(this,De,e)});E(this,"header",(e,t,r)=>{this.finalized&&k(this,H,new Response(b(this,H).body,b(this,H)));const a=b(this,H)?b(this,H).headers:b(this,ye)??k(this,ye,new Headers);t===void 0?a.delete(e):r!=null&&r.append?a.append(e,t):a.set(e,t)});E(this,"status",e=>{k(this,Re,e)});E(this,"set",(e,t)=>{b(this,te)??k(this,te,new Map),b(this,te).set(e,t)});E(this,"get",e=>b(this,te)?b(this,te).get(e):void 0);E(this,"newResponse",(...e)=>C(this,le,Ie).call(this,...e));E(this,"body",(e,t,r)=>C(this,le,Ie).call(this,e,t,r));E(this,"text",(e,t,r)=>!b(this,ye)&&!b(this,Re)&&!t&&!r&&!this.finalized?new Response(e):C(this,le,Ie).call(this,e,t,mt(na,r)));E(this,"json",(e,t,r)=>C(this,le,Ie).call(this,JSON.stringify(e),t,mt("application/json",r)));E(this,"html",(e,t,r)=>{const a=n=>C(this,le,Ie).call(this,n,t,mt("text/html; charset=UTF-8",r));return typeof e=="object"?sr(e,aa.Stringify,!1,{}).then(a):a(e)});E(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});E(this,"notFound",()=>(b(this,Ae)??k(this,Ae,()=>new Response),b(this,Ae).call(this,this)));k(this,We,e),t&&(k(this,re,t.executionCtx),this.env=t.env,k(this,Ae,t.notFoundHandler),k(this,Ve,t.path),k(this,Ye,t.matchResult))}get req(){return b(this,Ke)??k(this,Ke,new rr(b(this,We),b(this,Ve),b(this,Ye))),b(this,Ke)}get event(){if(b(this,re)&&"respondWith"in b(this,re))return b(this,re);throw Error("This context has no FetchEvent")}get executionCtx(){if(b(this,re))return b(this,re);throw Error("This context has no ExecutionContext")}get res(){return b(this,H)||k(this,H,new Response(null,{headers:b(this,ye)??k(this,ye,new Headers)}))}set res(e){if(b(this,H)&&e){e=new Response(e.body,e);for(const[t,r]of b(this,H).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=b(this,H).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of a)e.headers.append("set-cookie",n)}else e.headers.set(t,r)}k(this,H,e),this.finalized=!0}get var(){return b(this,te)?Object.fromEntries(b(this,te)):{}}},We=new WeakMap,Ke=new WeakMap,te=new WeakMap,Re=new WeakMap,re=new WeakMap,H=new WeakMap,Je=new WeakMap,De=new WeakMap,Ae=new WeakMap,ye=new WeakMap,Ye=new WeakMap,Ve=new WeakMap,le=new WeakSet,Ie=function(e,t,r){const a=b(this,H)?new Headers(b(this,H).headers):b(this,ye)??new Headers;if(typeof t=="object"&&"headers"in t){const s=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,i]of s)o.toLowerCase()==="set-cookie"?a.append(o,i):a.set(o,i)}if(r)for(const[s,o]of Object.entries(r))if(typeof o=="string")a.set(s,o);else{a.delete(s);for(const i of o)a.append(s,i)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??b(this,Re);return new Response(e,{status:n,headers:a})},Wt),j="ALL",oa="all",ia=["get","post","put","delete","options","patch"],or="Can not add a route since the matcher is already built.",ir=class extends Error{},la="__COMPOSED_HANDLER",da=e=>e.text("404 Not Found",404),Lt=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},q,B,lr,W,fe,at,nt,Ne,ca=(Ne=class{constructor(t={}){O(this,B);E(this,"get");E(this,"post");E(this,"put");E(this,"delete");E(this,"options");E(this,"patch");E(this,"all");E(this,"on");E(this,"use");E(this,"router");E(this,"getPath");E(this,"_basePath","/");O(this,q,"/");E(this,"routes",[]);O(this,W,da);E(this,"errorHandler",Lt);E(this,"onError",t=>(this.errorHandler=t,this));E(this,"notFound",t=>(k(this,W,t),this));E(this,"fetch",(t,...r)=>C(this,B,nt).call(this,t,r[1],r[0],t.method));E(this,"request",(t,r,a,n)=>t instanceof Request?this.fetch(r?new Request(t,r):t,a,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Se("/",t)}`,r),a,n)));E(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(C(this,B,nt).call(this,t.request,t,void 0,t.request.method))})});[...ia,oa].forEach(s=>{this[s]=(o,...i)=>(typeof o=="string"?k(this,q,o):C(this,B,fe).call(this,s,b(this,q),o),i.forEach(l=>{C(this,B,fe).call(this,s,b(this,q),l)}),this)}),this.on=(s,o,...i)=>{for(const l of[o].flat()){k(this,q,l);for(const d of[s].flat())i.map(u=>{C(this,B,fe).call(this,d.toUpperCase(),b(this,q),u)})}return this},this.use=(s,...o)=>(typeof s=="string"?k(this,q,s):(k(this,q,"*"),o.unshift(s)),o.forEach(i=>{C(this,B,fe).call(this,j,b(this,q),i)}),this);const{strict:a,...n}=t;Object.assign(this,n),this.getPath=a??!0?t.getPath??Zt:ea}route(t,r){const a=this.basePath(t);return r.routes.map(n=>{var o;let s;r.errorHandler===Lt?s=n.handler:(s=async(i,l)=>(await At([],r.errorHandler)(i,()=>n.handler(i,l))).res,s[la]=n.handler),C(o=a,B,fe).call(o,n.method,n.path,s)}),this}basePath(t){const r=C(this,B,lr).call(this);return r._basePath=Se(this._basePath,t),r}mount(t,r,a){let n,s;a&&(typeof a=="function"?s=a:(s=a.optionHandler,a.replaceRequest===!1?n=l=>l:n=a.replaceRequest));const o=s?l=>{const d=s(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};n||(n=(()=>{const l=Se(this._basePath,t),d=l==="/"?0:l.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(d)||"/",new Request(h,u)}})());const i=async(l,d)=>{const u=await r(n(l.req.raw),...o(l));if(u)return u;await d()};return C(this,B,fe).call(this,j,Se(t,"*"),i),this}},q=new WeakMap,B=new WeakSet,lr=function(){const t=new Ne({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,k(t,W,b(this,W)),t.routes=this.routes,t},W=new WeakMap,fe=function(t,r,a){t=t.toUpperCase(),r=Se(this._basePath,r);const n={basePath:this._basePath,path:r,method:t,handler:a};this.router.add(t,r,[a,n]),this.routes.push(n)},at=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},nt=function(t,r,a,n){if(n==="HEAD")return(async()=>new Response(null,await C(this,B,nt).call(this,t,r,a,"GET")))();const s=this.getPath(t,{env:a}),o=this.router.match(n,s),i=new sa(t,{path:s,matchResult:o,env:a,executionCtx:r,notFoundHandler:b(this,W)});if(o[0].length===1){let d;try{d=o[0][0][0][0](i,async()=>{i.res=await b(this,W).call(this,i)})}catch(u){return C(this,B,at).call(this,u,i)}return d instanceof Promise?d.then(u=>u||(i.finalized?i.res:b(this,W).call(this,i))).catch(u=>C(this,B,at).call(this,u,i)):d??b(this,W).call(this,i)}const l=At(o[0],this.errorHandler,b(this,W));return(async()=>{try{const d=await l(i);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return C(this,B,at).call(this,d,i)}})()},Ne),dr=[];function ua(e,t){const r=this.buildAllMatchers(),a=((n,s)=>{const o=r[n]||r[j],i=o[2][s];if(i)return i;const l=s.match(o[0]);if(!l)return[[],dr];const d=l.indexOf("",1);return[o[1][d],l]});return this.match=a,a(e,t)}var ot="[^/]+",Fe=".*",ze="(?:|/.*)",Oe=Symbol(),pa=new Set(".\\+*[^]$()");function ma(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Fe||e===ze?1:t===Fe||t===ze?-1:e===ot?1:t===ot?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var be,we,K,Ee,ha=(Ee=class{constructor(){O(this,be);O(this,we);O(this,K,Object.create(null))}insert(t,r,a,n,s){if(t.length===0){if(b(this,be)!==void 0)throw Oe;if(s)return;k(this,be,r);return}const[o,...i]=t,l=o==="*"?i.length===0?["","",Fe]:["","",ot]:o==="/*"?["","",ze]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const u=l[1];let h=l[2]||ot;if(u&&l[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw Oe;if(d=b(this,K)[h],!d){if(Object.keys(b(this,K)).some(g=>g!==Fe&&g!==ze))throw Oe;if(s)return;d=b(this,K)[h]=new Ee,u!==""&&k(d,we,n.varIndex++)}!s&&u!==""&&a.push([u,b(d,we)])}else if(d=b(this,K)[o],!d){if(Object.keys(b(this,K)).some(u=>u.length>1&&u!==Fe&&u!==ze))throw Oe;if(s)return;d=b(this,K)[o]=new Ee}d.insert(i,r,a,n,s)}buildRegExpStr(){const r=Object.keys(b(this,K)).sort(ma).map(a=>{const n=b(this,K)[a];return(typeof b(n,we)=="number"?`(${a})@${b(n,we)}`:pa.has(a)?`\\${a}`:a)+n.buildRegExpStr()});return typeof b(this,be)=="number"&&r.unshift(`#${b(this,be)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},be=new WeakMap,we=new WeakMap,K=new WeakMap,Ee),lt,Xe,Kt,ga=(Kt=class{constructor(){O(this,lt,{varIndex:0});O(this,Xe,new ha)}insert(e,t,r){const a=[],n=[];for(let o=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${o}`;return n[o]=[d,l],o++,i=!0,d}),!i)break}const s=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=n.length-1;o>=0;o--){const[i]=n[o];for(let l=s.length-1;l>=0;l--)if(s[l].indexOf(i)!==-1){s[l]=s[l].replace(i,n[o][1]);break}}return b(this,Xe).insert(s,t,a,b(this,lt),r),a}buildRegExp(){let e=b(this,Xe).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,s,o)=>s!==void 0?(r[++t]=Number(s),"$()"):(o!==void 0&&(a[Number(o)]=++t),"")),[new RegExp(`^${e}`),r,a]}},lt=new WeakMap,Xe=new WeakMap,Kt),fa=[/^$/,[],Object.create(null)],st=Object.create(null);function cr(e){return st[e]??(st[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function va(){st=Object.create(null)}function ya(e){var d;const t=new ga,r=[];if(e.length===0)return fa;const a=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[g,f])=>u?1:g?-1:h.length-f.length),n=Object.create(null);for(let u=0,h=-1,g=a.length;u<g;u++){const[f,y,_]=a[u];f?n[y]=[_.map(([c])=>[c,Object.create(null)]),dr]:h++;let x;try{x=t.insert(y,h,f)}catch(c){throw c===Oe?new ir(y):c}f||(r[h]=_.map(([c,p])=>{const m=Object.create(null);for(p-=1;p>=0;p--){const[v,w]=x[p];m[v]=w}return[c,m]}))}const[s,o,i]=t.buildRegExp();for(let u=0,h=r.length;u<h;u++)for(let g=0,f=r[u].length;g<f;g++){const y=(d=r[u][g])==null?void 0:d[1];if(!y)continue;const _=Object.keys(y);for(let x=0,c=_.length;x<c;x++)y[_[x]]=i[y[_[x]]]}const l=[];for(const u in o)l[u]=r[o[u]];return[s,l,n]}function Te(e,t){if(e){for(const r of Object.keys(e).sort((a,n)=>n.length-a.length))if(cr(r).test(t))return[...e[r]]}}var de,ce,dt,ur,Jt,ba=(Jt=class{constructor(){O(this,dt);E(this,"name","RegExpRouter");O(this,de);O(this,ce);E(this,"match",ua);k(this,de,{[j]:Object.create(null)}),k(this,ce,{[j]:Object.create(null)})}add(e,t,r){var i;const a=b(this,de),n=b(this,ce);if(!a||!n)throw new Error(or);a[e]||[a,n].forEach(l=>{l[e]=Object.create(null),Object.keys(l[j]).forEach(d=>{l[e][d]=[...l[j][d]]})}),t==="/*"&&(t="*");const s=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=cr(t);e===j?Object.keys(a).forEach(d=>{var u;(u=a[d])[t]||(u[t]=Te(a[d],t)||Te(a[j],t)||[])}):(i=a[e])[t]||(i[t]=Te(a[e],t)||Te(a[j],t)||[]),Object.keys(a).forEach(d=>{(e===j||e===d)&&Object.keys(a[d]).forEach(u=>{l.test(u)&&a[d][u].push([r,s])})}),Object.keys(n).forEach(d=>{(e===j||e===d)&&Object.keys(n[d]).forEach(u=>l.test(u)&&n[d][u].push([r,s]))});return}const o=Qt(t)||[t];for(let l=0,d=o.length;l<d;l++){const u=o[l];Object.keys(n).forEach(h=>{var g;(e===j||e===h)&&((g=n[h])[u]||(g[u]=[...Te(a[h],u)||Te(a[j],u)||[]]),n[h][u].push([r,s-d+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(b(this,ce)).concat(Object.keys(b(this,de))).forEach(t=>{e[t]||(e[t]=C(this,dt,ur).call(this,t))}),k(this,de,k(this,ce,void 0)),va(),e}},de=new WeakMap,ce=new WeakMap,dt=new WeakSet,ur=function(e){const t=[];let r=e===j;return[b(this,de),b(this,ce)].forEach(a=>{const n=a[e]?Object.keys(a[e]).map(s=>[s,a[e][s]]):[];n.length!==0?(r||(r=!0),t.push(...n)):e!==j&&t.push(...Object.keys(a[j]).map(s=>[s,a[j][s]]))}),r?ya(t):null},Jt),ue,ae,Yt,wa=(Yt=class{constructor(e){E(this,"name","SmartRouter");O(this,ue,[]);O(this,ae,[]);k(this,ue,e.routers)}add(e,t,r){if(!b(this,ae))throw new Error(or);b(this,ae).push([e,t,r])}match(e,t){if(!b(this,ae))throw new Error("Fatal error");const r=b(this,ue),a=b(this,ae),n=r.length;let s=0,o;for(;s<n;s++){const i=r[s];try{for(let l=0,d=a.length;l<d;l++)i.add(...a[l]);o=i.match(e,t)}catch(l){if(l instanceof ir)continue;throw l}this.match=i.match.bind(i),k(this,ue,[i]),k(this,ae,void 0);break}if(s===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(b(this,ae)||b(this,ue).length!==1)throw new Error("No active router has been determined yet.");return b(this,ue)[0]}},ue=new WeakMap,ae=new WeakMap,Yt),Be=Object.create(null),pe,G,_e,Le,U,ne,ve,$e,_a=($e=class{constructor(t,r,a){O(this,ne);O(this,pe);O(this,G);O(this,_e);O(this,Le,0);O(this,U,Be);if(k(this,G,a||Object.create(null)),k(this,pe,[]),t&&r){const n=Object.create(null);n[t]={handler:r,possibleKeys:[],score:0},k(this,pe,[n])}k(this,_e,[])}insert(t,r,a){k(this,Le,++Dt(this,Le)._);let n=this;const s=Yr(r),o=[];for(let i=0,l=s.length;i<l;i++){const d=s[i],u=s[i+1],h=Zr(d,u),g=Array.isArray(h)?h[0]:d;if(g in b(n,G)){n=b(n,G)[g],h&&o.push(h[1]);continue}b(n,G)[g]=new $e,h&&(b(n,_e).push(h),o.push(h[1])),n=b(n,G)[g]}return b(n,pe).push({[t]:{handler:a,possibleKeys:o.filter((i,l,d)=>d.indexOf(i)===l),score:b(this,Le)}}),n}search(t,r){var l;const a=[];k(this,U,Be);let s=[this];const o=Xt(r),i=[];for(let d=0,u=o.length;d<u;d++){const h=o[d],g=d===u-1,f=[];for(let y=0,_=s.length;y<_;y++){const x=s[y],c=b(x,G)[h];c&&(k(c,U,b(x,U)),g?(b(c,G)["*"]&&a.push(...C(this,ne,ve).call(this,b(c,G)["*"],t,b(x,U))),a.push(...C(this,ne,ve).call(this,c,t,b(x,U)))):f.push(c));for(let p=0,m=b(x,_e).length;p<m;p++){const v=b(x,_e)[p],w=b(x,U)===Be?{}:{...b(x,U)};if(v==="*"){const A=b(x,G)["*"];A&&(a.push(...C(this,ne,ve).call(this,A,t,b(x,U))),k(A,U,w),f.push(A));continue}const[T,I,R]=v;if(!h&&!(R instanceof RegExp))continue;const D=b(x,G)[T],L=o.slice(d).join("/");if(R instanceof RegExp){const A=R.exec(L);if(A){if(w[I]=A[0],a.push(...C(this,ne,ve).call(this,D,t,b(x,U),w)),Object.keys(b(D,G)).length){k(D,U,w);const z=((l=A[0].match(/\//))==null?void 0:l.length)??0;(i[z]||(i[z]=[])).push(D)}continue}}(R===!0||R.test(h))&&(w[I]=h,g?(a.push(...C(this,ne,ve).call(this,D,t,w,b(x,U))),b(D,G)["*"]&&a.push(...C(this,ne,ve).call(this,b(D,G)["*"],t,w,b(x,U)))):(k(D,U,w),f.push(D)))}}s=f.concat(i.shift()??[])}return a.length>1&&a.sort((d,u)=>d.score-u.score),[a.map(({handler:d,params:u})=>[d,u])]}},pe=new WeakMap,G=new WeakMap,_e=new WeakMap,Le=new WeakMap,U=new WeakMap,ne=new WeakSet,ve=function(t,r,a,n){const s=[];for(let o=0,i=b(t,pe).length;o<i;o++){const l=b(t,pe)[o],d=l[r]||l[j],u={};if(d!==void 0&&(d.params=Object.create(null),s.push(d),a!==Be||n&&n!==Be))for(let h=0,g=d.possibleKeys.length;h<g;h++){const f=d.possibleKeys[h],y=u[d.score];d.params[f]=n!=null&&n[f]&&!y?n[f]:a[f]??(n==null?void 0:n[f]),u[d.score]=!0}}return s},$e),xe,Vt,xa=(Vt=class{constructor(){E(this,"name","TrieRouter");O(this,xe);k(this,xe,new _a)}add(e,t,r){const a=Qt(t);if(a){for(let n=0,s=a.length;n<s;n++)b(this,xe).insert(e,a[n],r);return}b(this,xe).insert(e,t,r)}match(e,t){return b(this,xe).search(e,t)}},xe=new WeakMap,Vt),he=class extends ca{constructor(e={}){super(e),this.router=e.router??new wa({routers:[new ba,new xa]})}},Ea=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},a=(s=>typeof s=="string"?s==="*"?()=>s:o=>s===o?o:null:typeof s=="function"?s:o=>s.includes(o)?o:null)(r.origin),n=(s=>typeof s=="function"?s:Array.isArray(s)?()=>s:()=>[])(r.allowMethods);return async function(o,i){var u;function l(h,g){o.res.headers.set(h,g)}const d=await a(o.req.header("origin")||"",o);if(d&&l("Access-Control-Allow-Origin",d),r.credentials&&l("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),o.req.method==="OPTIONS"){r.origin!=="*"&&l("Vary","Origin"),r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const h=await n(o.req.header("origin")||"",o);h.length&&l("Access-Control-Allow-Methods",h.join(","));let g=r.allowHeaders;if(!(g!=null&&g.length)){const f=o.req.header("Access-Control-Request-Headers");f&&(g=f.split(/\s*,\s*/))}return g!=null&&g.length&&(l("Access-Control-Allow-Headers",g.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await i(),r.origin!=="*"&&o.header("Vary","Origin",{append:!0})}};function pr(){return`<!DOCTYPE html>
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
              '<div class="tab" data-tab="proactive">Proactive</div>' +
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
        case 'proactive': return await renderProactiveTab(content);
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
      components: { google_calendar: true, outlook_calendar: true, gmail: true, outlook_email: true, tasks: true, news: true, weather: false },
      newsTopics: ['AI', 'LLM', 'Tools', 'Agentic Workflows', 'AI Features'],
      notificationChannels: { telegram: true, web: true },
      proactiveLevel: 'moderate'
    };
    
    var html = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;line-height:1.6;">' +
      '<strong>Proactive Intelligence</strong> keeps you ahead with configurable evening briefings, smart meeting reminders, and custom triggers.' +
      '</div>';
    
    // === Briefing Preferences Section ===
    html += '<div style="margin-bottom:20px;padding:16px;border:1px solid var(--border);border-radius:8px;background:var(--bg-elevated);">';
    html += '<div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;">🌙 Briefing Preferences</div>';
    
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
      '<input type="checkbox" id="comp_outlook_calendar" ' + (prefs.components.outlook_calendar ? 'checked' : '') + '> Outlook Calendar</label>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="comp_gmail" ' + (prefs.components.gmail ? 'checked' : '') + '> Gmail Summary</label>';
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="comp_outlook_email" ' + (prefs.components.outlook_email ? 'checked' : '') + '> Outlook Email Summary</label>';
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
        html += '<div class="item-card" style="cursor:pointer;" onclick="viewBriefing(' + b.id + ')">';
        html += '<div class="item-card-header"><span class="item-card-title">' + date + ' Evening Briefing</span>';
        html += '<span class="tag">' + checkedCount + '/' + totalCount + ' checked</span></div>';
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
      outlook_calendar: document.getElementById('comp_outlook_calendar').checked,
      gmail: document.getElementById('comp_gmail').checked,
      outlook_email: document.getElementById('comp_outlook_email').checked,
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
    
    showToast('Saving preferences...', '');
    var result = await api('/proactive/briefing-preferences', {
      method: 'POST',
      body: JSON.stringify({
        briefingTime: briefingTime,
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
      var overlay = document.getElementById('settingsOverlay');
      if (overlay) overlay.style.display = 'none';
      state.activeView = 'chat';
      
      // Build beautiful briefing view in main chat area
      var html = '<div style="max-width:720px;margin:0 auto;padding:24px;">';
      
      // Header
      html += '<div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border);">';
      html += '<h2 style="font-size:24px;font-weight:600;margin:0 0 8px 0;color:var(--text-primary);">📋 Evening Briefing</h2>';
      html += '<div style="font-size:14px;color:var(--text-muted);">' + new Date(b.sent_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + '</div>';
      html += '</div>';
      
      // Calendar Events
      if (content.calendar && content.calendar.totalCount > 0) {
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">📅 Tomorrow&apos;s Schedule</h3>';
        var googleEvents = content.calendar.google || [];
        var outlookEvents = content.calendar.outlook || [];
        var allEvents = googleEvents.concat(outlookEvents);
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
      var outlookUnread = (content.emails && content.emails.outlook) ? content.emails.outlook.unreadCount : 0;
      var totalUnread = gmailUnread + outlookUnread;
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
        
        if (content.emails && content.emails.outlook && content.emails.outlook.unreadCount > 0) {
          html += '<div style="padding:12px;background:var(--bg);border-radius:8px;">';
          html += '<div style="font-size:14px;font-weight:500;">Outlook: ' + content.emails.outlook.unreadCount + ' unread</div>';
          html += '</div>';
        }
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
      
      var chat = document.getElementById('chatMessages');
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
</html>`}const Tt="AES-GCM",Ta=256;async function mr(e){const t=new TextEncoder,r=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},r,{name:Tt,length:Ta},!1,["encrypt","decrypt"])}async function kt(e,t){const r=await mr(t),a=crypto.getRandomValues(new Uint8Array(12)),n=new TextEncoder,s=await crypto.subtle.encrypt({name:Tt,iv:a},r,n.encode(e)),o=new Uint8Array(a.length+new Uint8Array(s).length);return o.set(a),o.set(new Uint8Array(s),a.length),btoa(String.fromCharCode(...o))}async function $(e,t){const r=await mr(t),a=new Uint8Array(atob(e).split("").map(i=>i.charCodeAt(0))),n=a.slice(0,12),s=a.slice(12),o=await crypto.subtle.decrypt({name:Tt,iv:n},r,s);return new TextDecoder().decode(o)}async function ct(e){const r=new TextEncoder().encode(e+"karna-pin-salt"),a=await crypto.subtle.digest("SHA-256",r);return btoa(String.fromCharCode(...new Uint8Array(a)))}async function hr(e,t){return await ct(e)===t}const ka=Object.freeze(Object.defineProperty({__proto__:null,decrypt:$,encrypt:kt,hashPin:ct,verifyPin:hr},Symbol.toStringTag,{value:"Module"})),ge=new he;ge.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});ge.post("/setup",async e=>{const{username:t,name:r,pin:a,personality_prompt:n,timezone:s}=await e.req.json();if(!t||!r||!a)return e.json({error:"Username, name, and PIN are required"},400);if(a.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const i=await ct(a);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,r,i,n||"",s||"Asia/Kolkata").run();const l=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),d=crypto.randomUUID(),u=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(d,l.id,"web",u).run(),e.json({success:!0,sessionId:d,user:{id:l.id,username:l.username,name:l.name}})});ge.post("/login",async e=>{const{username:t,pin:r}=await e.req.json();if(!t||!r)return e.json({error:"Username and PIN required"},400);const a=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!a)return e.json({error:"User not found"},404);if(!await hr(r,a.pin_hash))return e.json({error:"Invalid PIN"},401);const s=crypto.randomUUID(),o=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(s,a.id,"web",o).run(),e.json({success:!0,sessionId:s,user:{id:a.id,username:a.username,name:a.name}})});ge.post("/logout",async e=>{var r;const t=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});ge.get("/users/hints",async e=>{const r=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(a=>{var n;return{username:a.username,name_hint:a.name.split(" ")[0],created:((n=a.created_at)==null?void 0:n.split(" ")[0])||""}});return e.json({users:r,count:r.length})});ge.post("/reset-pin",async e=>{var i;const{username:t,name:r,new_pin:a}=await e.req.json();if(!t||!r||!a)return e.json({error:"Username, display name, and new PIN are required"},400);if(a.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const n=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!n)return e.json({error:"User not found"},404);if(n.name.toLowerCase().trim()!==r.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const s=await ct(a);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,n.id).run();const o=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(n.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(n.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((i=o.meta)==null?void 0:i.changes)||0})});ge.get("/me",async e=>{var a;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return r?e.json({user:{id:r.uid,username:r.username,name:r.name,role:r.role,timezone:r.timezone}}):e.json({error:"Invalid or expired session"},401)});const qe={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},$t=100,Mt=5e5;class gr{constructor(t,r){this.db=t,this.userId=r}getToday(){return new Date().toISOString().split("T")[0]}async checkCaps(){const t=this.getToday(),r=await this.db.prepare(`SELECT COALESCE(SUM(tokens_used), 0) as total_tokens, COALESCE(SUM(request_count), 0) as total_requests 
       FROM provider_usage WHERE user_id = ? AND usage_date = ?`).bind(this.userId,t).first(),a=(r==null?void 0:r.total_tokens)||0,n=(r==null?void 0:r.total_requests)||0,s=await this.getCap("daily_tokens")||Mt,o=await this.getCap("daily_requests")||$t;return a>=s?{allowed:!1,reason:`Daily token limit reached (${a.toLocaleString()}/${s.toLocaleString()}). Resets at midnight.`}:n>=o?{allowed:!1,reason:`Daily request limit reached (${n}/${o}). Resets at midnight.`}:{allowed:!0}}async getCap(t){const r=this.getToday(),a=await this.db.prepare("SELECT daily_limit FROM usage_caps WHERE user_id = ? AND cap_type = ? AND usage_date = ?").bind(this.userId,t,r).first();return(a==null?void 0:a.daily_limit)||null}async getUsageSummary(){const t=this.getToday(),r=await this.db.prepare(`SELECT COALESCE(SUM(tokens_used), 0) as total_tokens, COALESCE(SUM(request_count), 0) as total_requests 
       FROM provider_usage WHERE user_id = ? AND usage_date = ?`).bind(this.userId,t).first(),a=await this.getCap("daily_tokens")||Mt,n=await this.getCap("daily_requests")||$t;return`Today: ${((r==null?void 0:r.total_tokens)||0).toLocaleString()}/${a.toLocaleString()} tokens, ${(r==null?void 0:r.total_requests)||0}/${n} requests`}}async function S(e,t,r,a,n,s={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,r,a,n,JSON.stringify(s)).run()}catch(o){console.error("Failed to log error:",o)}}class fr{constructor(t,r="claude-sonnet-4-20250514",a="https://api.anthropic.com",n="anthropic"){E(this,"name");E(this,"apiKey");E(this,"model");E(this,"apiBase");this.apiKey=t,this.model=r,this.apiBase=a,this.name=n}async chat(t,r){var u,h,g,f;const a=t.find(y=>y.role==="system"),n=t.filter(y=>y.role!=="system"),s={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,messages:n.map(y=>({role:y.role,content:y.content}))};a&&(s.system=a.content),r!=null&&r.tools&&r.tools.length>0&&(s.tools=r.tools.map(y=>({name:y.name,description:y.description,input_schema:y.parameters})));const o=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)});if(!o.ok){const y=await o.text();throw new Error(this.name+" API error "+o.status+": "+y)}const i=await o.json(),l=((u=i.content)==null?void 0:u.filter(y=>y.type==="text"))||[],d=((h=i.content)==null?void 0:h.filter(y=>y.type==="tool_use"))||[];return{content:l.map(y=>y.text).join(`
`),toolCalls:d.map(y=>({id:y.id,name:y.name,arguments:y.input})),usage:{promptTokens:((g=i.usage)==null?void 0:g.input_tokens)||0,completionTokens:((f=i.usage)==null?void 0:f.output_tokens)||0}}}async streamChat(t,r){const a=t.find(d=>d.role==="system"),n=t.filter(d=>d.role!=="system"),s={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,stream:!0,messages:n.map(d=>({role:d.role,content:d.content}))};a&&(s.system=a.content);const o=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)});if(!o.ok){const d=await o.text();throw new Error(this.name+" stream error "+o.status+": "+d)}const i=o.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(d){var y;const{done:u,value:h}=await i.read();if(u){d.close();return}const f=l.decode(h,{stream:!0}).split(`
`);for(const _ of f)if(_.startsWith("data: ")){const x=_.slice(6);if(x==="[DONE]")continue;try{const c=JSON.parse(x);c.type==="content_block_delta"&&((y=c.delta)!=null&&y.text)&&d.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:c.delta.text})+`

`))}catch{}}}})}}function Sa(e){const t={},r=e||{};if(t.type=r.type||"object",t.type==="object"){const a=r.properties;if(a&&typeof a=="object"&&Object.keys(a).length>0){const n={};for(const[s,o]of Object.entries(a))o&&typeof o=="object"?n[s]=yt(o):n[s]=o;t.properties=n}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(r.required)?t.required=r.required:t.required=[]}return r.description&&(t.description=r.description),t}function yt(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const r=t.properties;if(r&&typeof r=="object"&&Object.keys(r).length>0){const a={};for(const[n,s]of Object.entries(r))s&&typeof s=="object"?a[n]=yt(s):a[n]=s;t.properties=a}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=yt(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class vr{constructor(t,r,a,n){E(this,"name");E(this,"apiKey");E(this,"model");E(this,"apiBase");this.apiKey=t,this.model=r,this.apiBase=a.replace(/\/+$/,""),this.name=n}async chat(t,r){var l,d,u,h,g,f;const a={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,messages:t.map(y=>({role:y.role,content:y.content}))},n=this.apiBase.includes("routellm.abacus.ai");r!=null&&r.tools&&r.tools.length>0&&!n&&(a.tools=r.tools.map(y=>({type:"function",function:{name:y.name,description:y.description,parameters:Sa(y.parameters||{})}})));const s=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(a)});if(!s.ok){const y=await s.text();throw new Error(this.name+" API error "+s.status+": "+y)}const o=await s.json(),i=(l=o.choices)==null?void 0:l[0];return{content:((d=i==null?void 0:i.message)==null?void 0:d.content)||"",toolCalls:(h=(u=i==null?void 0:i.message)==null?void 0:u.tool_calls)==null?void 0:h.map(y=>({id:y.id,name:y.function.name,arguments:typeof y.function.arguments=="string"?JSON.parse(y.function.arguments||"{}"):y.function.arguments||{}})),usage:{promptTokens:((g=o.usage)==null?void 0:g.prompt_tokens)||0,completionTokens:((f=o.usage)==null?void 0:f.completion_tokens)||0}}}async streamChat(t,r){const a={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,stream:!0,messages:t.map(i=>({role:i.role,content:i.content}))},n=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(a)});if(!n.ok){const i=await n.text();throw new Error(this.name+" stream error "+n.status+": "+i)}const s=n.body.getReader(),o=new TextDecoder;return new ReadableStream({async pull(i){var g,f,y;const{done:l,value:d}=await s.read();if(l){i.close();return}const h=o.decode(d,{stream:!0}).split(`
`);for(const _ of h)if(_.startsWith("data: ")){const x=_.slice(6);if(x==="[DONE]")continue;try{const p=(y=(f=(g=JSON.parse(x).choices)==null?void 0:g[0])==null?void 0:f.delta)==null?void 0:y.content;p&&i.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:p})+`

`))}catch{}}}})}}function bt(e,t,r,a){const n=qe[e];if(!n)throw new Error(`Unknown LLM provider: ${e}`);const s=a||n.defaultModel;return n.apiFormat==="anthropic"?new fr(t,s,n.apiBase,r):new vr(t,s,n.apiBase,r)}class yr{constructor(t,r){this.db=t,this.userId=r}getToday(){return new Date().toISOString().split("T")[0]}async getUsageStats(){const t=this.getToday();return(await this.db.prepare("SELECT provider, tokens_used, request_count, last_error, cooldown_until FROM provider_usage WHERE user_id = ? AND usage_date = ?").bind(this.userId,t).all()).results||[]}async pickProvider(t){this.getToday();const r=new Date().toISOString(),a=await this.getUsageStats(),n=new Map;for(const o of a)n.set(o.provider,o);const s=t.filter(o=>{const i=n.get(o);return i?!(i.cooldown_until&&i.cooldown_until>r):!0});return s.length===0?null:(s.sort((o,i)=>{var u,h;const l=((u=n.get(o))==null?void 0:u.tokens_used)||0,d=((h=n.get(i))==null?void 0:h.tokens_used)||0;return l-d}),s[0])}async recordUsage(t,r){const a=this.getToday();await this.db.prepare(`INSERT INTO provider_usage (user_id, provider, tokens_used, request_count, usage_date)
       VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(user_id, provider, usage_date) DO UPDATE SET
         tokens_used = provider_usage.tokens_used + excluded.tokens_used,
         request_count = provider_usage.request_count + 1,
         updated_at = CURRENT_TIMESTAMP`).bind(this.userId,t,r,a).run()}async recordError(t,r,a=5){const n=this.getToday(),s=new Date(Date.now()+a*60*1e3).toISOString();await this.db.prepare(`INSERT INTO provider_usage (user_id, provider, tokens_used, request_count, last_error, cooldown_until, usage_date)
       VALUES (?, ?, 0, 0, ?, ?, ?)
       ON CONFLICT(user_id, provider, usage_date) DO UPDATE SET
         last_error = excluded.last_error,
         cooldown_until = excluded.cooldown_until,
         updated_at = CURRENT_TIMESTAMP`).bind(this.userId,t,r,s,n).run()}async getStatusText(){const t=await this.getUsageStats();if(t.length===0)return"No provider usage recorded today.";const r=new Date().toISOString();return t.map(a=>{const s=a.cooldown_until&&a.cooldown_until>r?"⏸ cooldown":"▶ active";return a.provider+": "+a.tokens_used.toLocaleString()+" tokens / "+a.request_count+" requests ["+s+"]"}).join(`
`)}}const Ia=["llm_slot_1","llm_slot_2","llm_slot_3"],Oa=["anthropic","openai"];async function Ze(e,t,r){const{decrypt:a}=await Promise.resolve().then(()=>ka),n=new yr(e,t),s=new gr(e,t),o=await s.checkCaps();if(!o.allowed)throw new Error(o.reason||"Daily usage limit reached.");const i=[];for(const f of Ia){const y=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,f).first();if(y)try{const _=await a(y.encrypted_value,r),x=JSON.parse(_);if(x.provider&&x.apiKey&&qe[x.provider]){const p=x.provider,m=bt(x.provider,x.apiKey,p,x.model);i.push({name:p,provider:m})}}catch(_){console.error(`Failed to load ${f}:`,_)}}const l=new Set(i.map(f=>f.name));for(const f of Oa){if(l.has(f))continue;const y=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,f).first();if(y)try{const _=await a(y.encrypted_value,r);if(qe[f]){const c=bt(f,_,f);i.push({name:f,provider:c})}}catch{console.error(`Failed to decrypt legacy ${f} key`)}}if(i.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const d=i.map(f=>f.name),u=await n.pickProvider(d);if(!u)return console.warn("All providers in cooldown, using first available"),{provider:i[0].provider,rotation:n,costGuard:s};const h=i.find(f=>f.name===u);return{provider:Ca(h.provider,i,n),rotation:n,costGuard:s}}function Ca(e,t,r){return t.length<=1?e:{name:e.name,async chat(a,n){try{return await e.chat(a,n)}catch(s){const o=s.message||"";if(!(o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")))throw s;console.warn(`Provider ${e.name} auth/billing error, trying fallback...`),await r.recordError(e.name,o,1440);const l=t.filter(d=>d.name!==e.name);for(const d of l)try{const u=await d.provider.chat(a,n);return this.name=d.name,u}catch(u){const h=u.message||"";if(h.includes("401")||h.includes("403")||h.includes("authentication")||h.includes("credit balance")||h.includes("properties field not found")){await r.recordError(d.name,h,1440);continue}throw u}throw new Error(`All LLM providers failed. Primary (${e.name}): ${o.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(a,n){return await e.streamChat(a,n)}}}const it=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:fr,CostGuard:gr,OpenAICompatibleProvider:vr,ProviderRotation:yr,createProviderFromConfig:bt,createRotatingProvider:Ze,logError:S},Symbol.toStringTag,{value:"Module"})),ht=20,Ra=2e3,Da=2e3,br=4;function Aa(e){return Math.ceil(e.length/br)}function jt(e,t){const r=t*br;return e.length<=r?e:e.slice(0,r)+`
[...truncated to fit token budget]`}class me{constructor(t){this.db=t}async store(t,r,a,n,s=5,o="working"){const i=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,r,a).first();i?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,s,o,i.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,r,a,n,s,o).run(),o==="working"&&await this.enforceWorkingMemoryCap(t)}async enforceWorkingMemoryCap(t){const r=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((r==null?void 0:r.cnt)||0)>ht){const a=((r==null?void 0:r.cnt)||0)-ht;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ? AND tier = 'working' AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' 
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,a).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,ht).all()).results||[]}async getAll(t,r,a=50){return r?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,r,a).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,a).all()).results||[]}async search(t,r,a=10){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${r}%`,`%${r}%`,a).all()).results||[]}async update(t,r,a){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a,t,r).run()}async promote(t,r){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,r).run(),await this.enforceWorkingMemoryCap(r)}async demote(t,r){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,r).run()}async remove(t,r){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,r).run()}async buildContext(t){const r=await this.getWorkingMemory(t);if(r.length===0)return"";const a={};for(const s of r)a[s.type]||(a[s.type]=[]),a[s.type].push(s);let n=`
## Working Memory (Active Context)
`;for(const[s,o]of Object.entries(a)){n+=`
### ${s.charAt(0).toUpperCase()+s.slice(1)}s
`;for(const i of o)n+=`- **${i.title}**: ${i.content}
`}return jt(n,Ra)}static truncatePersonality(t){return jt(t,Da)}async getRecentConversations(t,r=20,a){return a?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,a,r).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,r).all()).results||[]).reverse()}async storeMessage(t,r,a,n,s="{}",o){const i=Aa(n);o?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,r,a,n,s,i,o).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,r,a,n,s,i).run()}async compactHistory(t,r=30){const a=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((a==null?void 0:a.cnt)||0)<=r*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,r).run()}}const He="https://api.browser-use.com/api/v2",Na="gpt-4o",La=4e3,Bt=18e4,wr=50;class $a{constructor(t){E(this,"apiKey");this.apiKey=t}get headers(){return{"Content-Type":"application/json","X-Browser-Use-API-Key":this.apiKey}}async createSession(t={}){const r=await fetch(`${He}/sessions`,{method:"POST",headers:this.headers,body:JSON.stringify({profileId:t.profileId||void 0,keepAlive:t.keepAlive??!0,persistMemory:t.persistMemory??!0})});if(!r.ok){const n=await r.text();throw new Error(`Browser Use session creation failed (${r.status}): ${n}`)}const a=await r.json();return{sessionId:a.id,liveUrl:a.liveUrl||""}}async runTask(t,r={}){const a={task:t,llm:r.llm||Na,maxSteps:r.maxSteps||wr};r.sessionId&&(a.sessionId=r.sessionId),r.startUrl&&(a.startUrl=r.startUrl),r.structuredOutput&&(a.structuredOutput=JSON.stringify(r.structuredOutput));const n=await fetch(`${He}/tasks`,{method:"POST",headers:this.headers,body:JSON.stringify(a)});if(!n.ok){const l=await n.text();throw new Error(`Browser Use task creation failed (${n.status}): ${l}`)}const o=(await n.json()).id;if(!o)throw new Error("Browser Use task created but no task ID returned");const i=await this.pollTaskCompletion(o);return{output:i.output||"",steps:i.steps||0,taskId:o}}async pollTaskCompletion(t){var a;const r=Date.now();for(;Date.now()-r<Bt;){const n=await fetch(`${He}/tasks/${t}`,{headers:{"X-Browser-Use-API-Key":this.apiKey}});if(!n.ok)throw new Error(`Failed to check task status (${n.status})`);const s=await n.json();if(s.status==="finished"||s.status==="completed")return{output:typeof s.output=="string"?s.output:JSON.stringify(s.output||s.result||""),steps:((a=s.steps)==null?void 0:a.length)||s.stepCount||0};if(s.status==="failed"||s.status==="error"||s.status==="stopped"){const o=s.error||s.message||s.failureReason||"Unknown error";throw new Error(`Browser task ${s.status}: ${o}`)}await new Promise(o=>setTimeout(o,La))}throw new Error(`Browser task timed out after ${Bt/1e3}s`)}async stopSession(t){try{await fetch(`${He}/sessions/${t}/stop`,{method:"PUT",headers:this.headers})}catch{}}}class X{constructor(t,r){E(this,"db");E(this,"userId");this.db=t,this.userId=r}async getCredential(t,r){const a=await this.db.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(this.userId,t).first();return a?$(a.encrypted_value,r):null}async logTask(t,r,a,n="",s=""){await this.db.prepare("INSERT INTO browser_task_log (user_id, session_id, task_type, task_description, status, result, error) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(this.userId,null,t,r,a,n,s).run()}async getRunner(t){const r=await this.getCredential("browser_use_api_key",t);return r?new $a(r):null}getOutlookCredKeys(t="primary"){return t==="secondary"?{emailKey:"outlook_email_2",passKey:"outlook_password_2",label:"secondary"}:{emailKey:"outlook_email",passKey:"outlook_password",label:"primary"}}async checkOutlookMail(t,r="primary"){const a=await this.getRunner(t);if(!a)return"Browser Use API key not configured. Add it in Settings → Keys → Browser Automation.";const{emailKey:n,passKey:s,label:o}=this.getOutlookCredKeys(r),i=await this.getCredential(n,t),l=await this.getCredential(s,t);if(!i||!l)return`Outlook ${o} account credentials not configured. Add your email and password in Settings → Keys → Outlook — ${o.toUpperCase()}.`;try{const d=`Go to https://outlook.live.com. Log in with email "${i}" and password "${l}". After logging in, go to the inbox. List the latest 2 emails with: sender name, subject line, date received, and whether it's read or unread. Return as structured text.`,u=await a.runTask(d,{startUrl:"https://outlook.live.com",maxSteps:40});return await this.logTask("check_outlook_mail",`Check Outlook inbox (${o})`,"completed",u.output),u.output||"No output returned from browser agent."}catch(d){return await this.logTask("check_outlook_mail",`Check Outlook inbox (${o})`,"failed","",d.message),await S(this.db,this.userId,"browser","outlook_mail",d.message),`Failed to check Outlook (${o}): ${d.message}`}}async composeDraft(t,r,a,n,s="primary"){const o=await this.getRunner(t);if(!o)return"Browser Use API key not configured.";const{emailKey:i,passKey:l,label:d}=this.getOutlookCredKeys(s),u=await this.getCredential(i,t),h=await this.getCredential(l,t);if(!u||!h)return`Outlook ${d} account credentials not configured.`;try{const g=`Go to https://outlook.live.com. Log in with email "${u}" and password "${h}". After logging in, compose a new email. Set the recipient to "${r}", subject to "${a}", and body to: "${n}". Save it as a draft — do NOT send it. Confirm the draft was saved.`,f=await o.runTask(g,{startUrl:"https://outlook.live.com",maxSteps:40});return await this.logTask("compose_draft",`Draft to ${r}: ${a} (${d})`,"completed",f.output),f.output||"Draft operation completed."}catch(g){return await this.logTask("compose_draft",`Draft to ${r}: ${a} (${d})`,"failed","",g.message),await S(this.db,this.userId,"browser","compose_draft",g.message),`Failed to compose draft (${d}): ${g.message}`}}async checkOutlookCalendar(t,r="primary"){const a=await this.getRunner(t);if(!a)return"Browser Use API key not configured.";const{emailKey:n,passKey:s,label:o}=this.getOutlookCredKeys(r),i=await this.getCredential(n,t),l=await this.getCredential(s,t);if(!i||!l)return`Outlook ${o} account credentials not configured.`;try{const d=`Go to https://outlook.live.com. Log in with email "${i}" and password "${l}". After logging in, navigate to the Calendar view. List all events for today and tomorrow with: event title, time, location (if any), and attendees (if visible). Return as structured text.`,u=await a.runTask(d,{startUrl:"https://outlook.live.com",maxSteps:40});return await this.logTask("check_outlook_calendar",`Check Outlook calendar (${o})`,"completed",u.output),u.output||"No calendar events found."}catch(d){return await this.logTask("check_outlook_calendar",`Check Outlook calendar (${o})`,"failed","",d.message),await S(this.db,this.userId,"browser","outlook_calendar",d.message),`Failed to check calendar (${o}): ${d.message}`}}async checkGmail(t){const r=await this.getRunner(t);if(!r)return"Browser Use API key not configured. Add it in Settings → Keys → Browser Automation.";try{const n=await r.runTask("Go to https://mail.google.com. If a Google sign-in page appears, report that manual login is required. Once inside Gmail inbox, list the 10 most recent emails with: sender name, subject line, snippet/preview, date received, and whether it's read or unread. Return as structured text.",{startUrl:"https://mail.google.com",maxSteps:40});return await this.logTask("check_gmail","Check Gmail inbox","completed",n.output),n.output||"No output returned."}catch(a){return await this.logTask("check_gmail","Check Gmail inbox","failed","",a.message),await S(this.db,this.userId,"browser","gmail_inbox",a.message),`Failed to check Gmail: ${a.message}`}}async composeGmailDraft(t,r,a,n){const s=await this.getRunner(t);if(!s)return"Browser Use API key not configured.";try{const o=await s.runTask(`In Gmail, click Compose. Set the recipient to "${r}", subject to "${a}", and body to: "${n}". Do NOT click Send. Close the compose window so it saves as a draft. Confirm the draft was saved.`,{startUrl:"https://mail.google.com",maxSteps:30});return await this.logTask("compose_gmail_draft",`Gmail draft to ${r}: ${a}`,"completed",o.output),o.output||"Draft operation completed."}catch(o){return await this.logTask("compose_gmail_draft",`Gmail draft to ${r}: ${a}`,"failed","",o.message),await S(this.db,this.userId,"browser","gmail_compose",o.message),`Failed to compose Gmail draft: ${o.message}`}}async searchGmail(t,r){const a=await this.getRunner(t);if(!a)return"Browser Use API key not configured.";try{const n=await a.runTask(`In Gmail, use the search bar to search for: "${r}". List the top 10 results with: sender name, subject line, snippet, and date. Return as structured text.`,{startUrl:"https://mail.google.com",maxSteps:30});return await this.logTask("search_gmail",`Gmail search: ${r}`,"completed",n.output),n.output||"No results found."}catch(n){return await this.logTask("search_gmail",`Gmail search: ${r}`,"failed","",n.message),await S(this.db,this.userId,"browser","gmail_search",n.message),`Failed to search Gmail: ${n.message}`}}async browseWeb(t,r){const a=await this.getRunner(t);if(!a)return"Browser Use API key not configured. Add it in Settings → Keys → Browser Automation.";try{const n=await a.runTask(r,{maxSteps:wr});return await this.logTask("browse_web",r.substring(0,200),"completed",n.output),n.output||"Task completed but no output returned."}catch(n){return await this.logTask("browse_web",r.substring(0,200),"failed","",n.message),await S(this.db,this.userId,"browser","browse_web",n.message),`Browser task failed: ${n.message}`}}async validateSteelKey(t){try{const r=await fetch("https://api.steel.dev/v1/sessions",{method:"POST",headers:{"Content-Type":"application/json","steel-api-key":t},body:JSON.stringify({timeout:3e4})});if(r.ok){const a=await r.json();try{await fetch(`https://api.steel.dev/v1/sessions/${a.id}/release`,{method:"POST",headers:{"steel-api-key":t}})}catch{}return{valid:!0,message:"Steel.dev API key is valid. Session created and released."}}return r.status===401||r.status===403?{valid:!1,message:"Invalid Steel.dev API key. Check your key at app.steel.dev."}:{valid:!1,message:`Steel.dev responded with status ${r.status}.`}}catch(r){return{valid:!1,message:`Connection failed: ${r.message}`}}}async validateBrowserUseKey(t){try{const r=await fetch(`${He}/tasks?limit=1`,{headers:{"X-Browser-Use-API-Key":t}});return r.ok?{valid:!0,message:"Browser Use API key is valid."}:r.status===401||r.status===403?{valid:!1,message:"Invalid Browser Use API key. Check your key at cloud.browser-use.com."}:{valid:!1,message:`Browser Use responded with status ${r.status}.`}}catch(r){return{valid:!1,message:`Connection failed: ${r.message}`}}}}const Ma="https://accounts.google.com/o/oauth2/v2/auth",_r="https://oauth2.googleapis.com/token",ja="https://www.googleapis.com/oauth2/v2/userinfo",Ba=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let Z=null;async function wt(e,t,r){const a=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!a)return null;try{const n=await $(a.encrypted_value,r);return JSON.parse(n)}catch{return null}}async function Pa(e,t,r,a){const n=await kt(JSON.stringify(a),r);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,n).run()}function xr(e,t,r){const a=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:Ba,access_type:"offline",prompt:"consent",state:r,include_granted_scopes:"true"});return`${Ma}?${a}`}async function Er(e,t,r,a){const n=await fetch(_r,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:r,redirect_uri:a,grant_type:"authorization_code"})}),s=await n.text();if(!n.ok)throw new Error(`Token exchange failed (${n.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function Ua(e,t,r){const a=await fetch(_r,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:r,grant_type:"refresh_token"})}),n=await a.text();if(!a.ok)throw a.status===400||a.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${a.status}): ${n.substring(0,300)}`);return JSON.parse(n)}async function Tr(e){const t=await fetch(ja,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function Me(e,t,r,a,n){if(!a||!n)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(Z&&Z.userId===t&&Z.expiresAt>Date.now()/1e3+60){const i=await wt(e,t,r);return{token:Z.token,email:(i==null?void 0:i.email)||"unknown"}}const s=await wt(e,t,r);if(!s)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const o=await Ua(s.refresh_token,a,n);return Z={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{token:o.access_token,email:s.email}}async function St(e,t,r){try{const a=await wt(e,t,r);return a?{connected:!0,email:a.email,connectedAt:a.connected_at}:{connected:!1}}catch{return{connected:!1}}}function kr(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function Sr(e,t,r,a,n,s,o){const i=await Er(a,s,o,n);if(!i.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await Tr(i.access_token),d={refresh_token:i.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await Pa(e,t,r,d),Z={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{email:l.email,name:l.name}}async function Ir(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(Z==null?void 0:Z.userId)===t&&(Z=null)}const Pe="https://sheets.googleapis.com/v4/spreadsheets";class Or{constructor(t,r,a,n,s){this.db=t,this.userId=r,this.pinHash=a,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await Me(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,r){const a=await this.authHeaders(),n=encodeURIComponent(r),s=await fetch(`${Pe}/${t}/values/${n}`,{headers:a});if(!s.ok){const i=await s.text();throw new Error(`Sheets read failed (${s.status}): ${i}`)}return(await s.json()).values||[]}async writeRange(t,r,a){const n=await this.authHeaders(),s=encodeURIComponent(r),o=await fetch(`${Pe}/${t}/values/${s}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:n,body:JSON.stringify({range:r,majorDimension:"ROWS",values:a})});if(!o.ok){const l=await o.text();throw new Error(`Sheets write failed (${o.status}): ${l}`)}return{updatedCells:(await o.json()).updatedCells||0}}async appendRows(t,r,a){var l;const n=await this.authHeaders(),s=encodeURIComponent(r),o=await fetch(`${Pe}/${t}/values/${s}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:n,body:JSON.stringify({range:r,majorDimension:"ROWS",values:a})});if(!o.ok){const d=await o.text();throw new Error(`Sheets append failed (${o.status}): ${d}`)}return{updatedCells:((l=(await o.json()).updates)==null?void 0:l.updatedCells)||a.length}}async createSpreadsheet(t,r){const a=await this.authHeaders(),n={properties:{title:t},sheets:r&&r.length>0?r.map(i=>({properties:{title:i}})):[{properties:{title:"Sheet1"}}]},s=await fetch(Pe,{method:"POST",headers:a,body:JSON.stringify(n)});if(!s.ok){const i=await s.text();throw new Error(`Sheets create failed (${s.status}): ${i}`)}const o=await s.json();return{spreadsheetId:o.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${o.spreadsheetId}/edit`}}async getMetadata(t){const r=await this.authHeaders(),a=await fetch(`${Pe}/${t}?fields=properties.title,sheets.properties.title`,{headers:r});if(!a.ok){const s=await a.text();throw new Error(`Sheets metadata failed (${a.status}): ${s}`)}const n=await a.json();return{title:n.properties.title,sheets:n.sheets.map(s=>s.properties.title)}}}const Ue="https://www.googleapis.com/calendar/v3";class Qe{constructor(t,r,a,n,s){this.db=t,this.userId=r,this.pinHash=a,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await Me(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",r={}){const a=await this.authHeaders(),n=new URLSearchParams;r.timeMin&&n.set("timeMin",r.timeMin),r.timeMax&&n.set("timeMax",r.timeMax),n.set("maxResults",String(r.maxResults||20)),n.set("singleEvents","true"),n.set("orderBy","startTime"),r.query&&n.set("q",r.query);const s=await fetch(`${Ue}/calendars/${encodeURIComponent(t)}/events?${n}`,{headers:a});if(!s.ok){const i=await s.text();throw new Error(`Calendar list failed (${s.status}): ${i}`)}return(await s.json()).items||[]}async createEvent(t="primary",r){var i;const a=await this.authHeaders(),n=r.timeZone||"Asia/Kolkata",s={summary:r.summary,description:r.description||"",location:r.location||"",start:{dateTime:r.startDateTime,timeZone:n},end:{dateTime:r.endDateTime,timeZone:n}};(i=r.attendees)!=null&&i.length&&(s.attendees=r.attendees.map(l=>({email:l})));const o=await fetch(`${Ue}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:a,body:JSON.stringify(s)});if(!o.ok){const l=await o.text();throw new Error(`Calendar create failed (${o.status}): ${l}`)}return await o.json()}async updateEvent(t="primary",r,a){const n=await this.authHeaders(),s=a.timeZone||"Asia/Kolkata",o={};a.summary&&(o.summary=a.summary),a.description&&(o.description=a.description),a.location&&(o.location=a.location),a.startDateTime&&(o.start={dateTime:a.startDateTime,timeZone:s}),a.endDateTime&&(o.end={dateTime:a.endDateTime,timeZone:s});const i=await fetch(`${Ue}/calendars/${encodeURIComponent(t)}/events/${r}`,{method:"PATCH",headers:n,body:JSON.stringify(o)});if(!i.ok){const l=await i.text();throw new Error(`Calendar update failed (${i.status}): ${l}`)}return await i.json()}async deleteEvent(t="primary",r){const a=await this.authHeaders(),n=await fetch(`${Ue}/calendars/${encodeURIComponent(t)}/events/${r}`,{method:"DELETE",headers:a});if(!n.ok&&n.status!==410){const s=await n.text();throw new Error(`Calendar delete failed (${n.status}): ${s}`)}}async listCalendars(){const t=await this.authHeaders(),r=await fetch(`${Ue}/users/me/calendarList`,{headers:t});if(!r.ok){const n=await r.text();throw new Error(`Calendar list calendars failed (${r.status}): ${n}`)}return((await r.json()).items||[]).map(n=>({id:n.id,summary:n.summary,primary:n.primary||!1}))}}const rt="https://docs.googleapis.com/v1/documents",Ga="https://www.googleapis.com/drive/v3/files";class Cr{constructor(t,r,a,n,s){this.db=t,this.userId=r,this.pinHash=a,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await Me(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const r=await this.authHeaders(),a=await fetch(rt,{method:"POST",headers:r,body:JSON.stringify({title:t})});if(!a.ok){const s=await a.text();throw new Error(`Docs create failed (${a.status}): ${s}`)}const n=await a.json();return{documentId:n.documentId,url:`https://docs.google.com/document/d/${n.documentId}/edit`}}async readDocument(t){var o,i;const r=await this.authHeaders(),a=await fetch(`${rt}/${t}`,{headers:r});if(!a.ok){const l=await a.text();throw new Error(`Docs read failed (${a.status}): ${l}`)}const n=await a.json();let s="";for(const l of((o=n.body)==null?void 0:o.content)||[])if(l.paragraph)for(const d of l.paragraph.elements)(i=d.textRun)!=null&&i.content&&(s+=d.textRun.content);return{title:n.title,content:s.trim()}}async appendText(t,r){const a=await this.authHeaders(),n=await fetch(`${rt}/${t}`,{headers:a});if(!n.ok){const l=await n.text();throw new Error(`Docs read for append failed (${n.status}): ${l}`)}const s=await n.json(),o=s.body.content[s.body.content.length-1].endIndex-1,i=await fetch(`${rt}/${t}:batchUpdate`,{method:"POST",headers:a,body:JSON.stringify({requests:[{insertText:{location:{index:o},text:r}}]})});if(!i.ok){const l=await i.text();throw new Error(`Docs append failed (${i.status}): ${l}`)}}async shareDocument(t,r,a="writer"){const n=await this.authHeaders(),s=await fetch(`${Ga}/${t}/permissions`,{method:"POST",headers:n,body:JSON.stringify({type:"user",role:a,emailAddress:r})});if(!s.ok){const o=await s.text();throw new Error(`Share failed (${s.status}): ${o}`)}}}class V{constructor(t,r,a,n,s){E(this,"sheets");E(this,"calendar");E(this,"docs");E(this,"db");E(this,"userId");E(this,"pinHash");this.db=t,this.userId=r,this.pinHash=a,this.sheets=new Or(t,r,a,n,s),this.calendar=new Qe(t,r,a,n,s),this.docs=new Cr(t,r,a,n,s)}async isConnected(){return St(this.db,this.userId,this.pinHash)}}const Ge=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:Qe,GoogleDocs:Cr,GoogleServices:V,GoogleSheets:Or,completeOAuthFlow:Sr,disconnectGoogle:Ir,exchangeCodeForTokens:Er,fetchUserInfo:Tr,generateAuthUrl:xr,getGoogleAuth:Me,isGoogleConnected:St,isOAuthClientConfigured:kr},Symbol.toStringTag,{value:"Module"}));async function Ha(e,t,r={}){const a={textQuery:t,languageCode:"en",pageSize:8};if(r.type&&(a.includedType=r.type),r.location){const l=r.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(a.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:r.radius||5e3}})}const n=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),s=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":n},body:JSON.stringify(a)});if(!s.ok){const l=await s.text();return{results:[],error:`Places API error (${s.status}): ${l.substring(0,200)}`}}const o=await s.json();return!o.places||o.places.length===0?{results:[]}:{results:o.places.map(l=>{var d,u,h;return{name:((d=l.displayName)==null?void 0:d.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(u=l.currentOpeningHours)==null?void 0:u.openNow,types:(h=l.types)==null?void 0:h.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function Fa(e,t){var s,o,i;const r=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),a=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":r}});if(!a.ok){const l=await a.text();return{error:`Place Details API error (${a.status}): ${l.substring(0,200)}`}}const n=await a.json();return{details:{name:((s=n.displayName)==null?void 0:s.text)||"",address:n.formattedAddress||"",phone:n.internationalPhoneNumber,website:n.websiteUri,rating:n.rating,reviews:(o=n.reviews)==null?void 0:o.slice(0,3).map(l=>{var d,u,h;return{author:((d=l.authorAttribution)==null?void 0:d.displayName)||"Anonymous",rating:l.rating||0,text:((h=(u=l.text)==null?void 0:u.text)==null?void 0:h.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(i=n.currentOpeningHours)==null?void 0:i.weekdayDescriptions,location:n.location?{lat:n.location.latitude,lng:n.location.longitude}:void 0,googleMapsUri:n.googleMapsUri}}}async function za(e,t,r,a={}){var d;const n=new URLSearchParams({origin:t,destination:r,key:e,mode:a.mode||"driving"});(a.mode==="driving"||!a.mode)&&n.set("departure_time","now");const s=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${n}`);if(!s.ok)return{error:`Directions API error: ${s.status}`};const o=await s.json();if(o.status!=="OK")return{error:`Directions: ${o.status} — ${o.error_message||""}`};const i=o.routes[0],l=i.legs[0];return{route:{summary:i.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(d=l.duration_in_traffic)==null?void 0:d.text,steps:l.steps.slice(0,10).map(u=>{var h,g,f;return{instruction:((h=u.html_instructions)==null?void 0:h.replace(/<[^>]*>/g,""))||"",distance:((g=u.distance)==null?void 0:g.text)||"",duration:((f=u.duration)==null?void 0:f.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function qa(e,t,r,a){var l,d;const n={q:t,target:r,key:e,format:"text"};a&&(n.source=a);const s=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){const u=await s.text();return{translatedText:"",error:`Translate API error (${s.status}): ${u.substring(0,200)}`}}const i=(d=(l=(await s.json()).data)==null?void 0:l.translations)==null?void 0:d[0];return i?{translatedText:i.translatedText,detectedSourceLang:i.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function Wa(e,t){const r=new URLSearchParams({address:t,key:e}),a=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${r}`);if(!a.ok)return{results:[],error:`Geocoding API error: ${a.status}`};const n=await a.json();return n.status!=="OK"&&n.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${n.status} — ${n.error_message||""}`}:{results:(n.results||[]).slice(0,5).map(s=>{var o;return{address:s.formatted_address,lat:s.geometry.location.lat,lng:s.geometry.location.lng,placeId:s.place_id,types:(o=s.types)==null?void 0:o.slice(0,3)}})}}async function Ka(e,t,r={}){const a=new URLSearchParams({part:"snippet",q:t,key:e,type:r.type||"video",maxResults:String(r.maxResults||5),order:r.order||"relevance"}),n=await fetch(`https://www.googleapis.com/youtube/v3/search?${a}`);if(!n.ok){const o=await n.text();return{results:[],error:`YouTube API error (${n.status}): ${o.substring(0,200)}`}}return{results:((await n.json()).items||[]).map(o=>{var i,l,d,u,h,g,f,y;return{title:o.snippet.title,channelTitle:o.snippet.channelTitle,description:(i=o.snippet.description)==null?void 0:i.substring(0,200),videoId:((l=o.id)==null?void 0:l.videoId)||((d=o.id)==null?void 0:d.channelId)||((u=o.id)==null?void 0:u.playlistId)||"",publishedAt:o.snippet.publishedAt,url:(h=o.id)!=null&&h.videoId?`https://www.youtube.com/watch?v=${o.id.videoId}`:(g=o.id)!=null&&g.channelId?`https://www.youtube.com/channel/${o.id.channelId}`:"",thumbnailUrl:(y=(f=o.snippet.thumbnails)==null?void 0:f.medium)==null?void 0:y.url}})}}async function It(e,t={}){const r=Math.min(t.num||5,10),a=t.site?`site:${t.site} ${e}`:e;try{const n=new URLSearchParams({q:a}),s=await fetch(`https://html.duckduckgo.com/html/?${n}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!s.ok)return{results:[],error:`Search request failed (${s.status})`};const o=await s.text(),i=[],l=o.split(/class="result results_links/g).slice(1);for(const d of l){if(i.length>=r)break;const u=d.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),h=d.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(u){let g=u[1];const f=g.match(/uddg=([^&]+)/);f?g=decodeURIComponent(f[1]):g.startsWith("//")&&(g="https:"+g);const y=c=>c.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),_=y(u[2]),x=h?y(h[1]):"";if(_&&g.startsWith("http")){const c=g.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];i.push({title:_,link:g,snippet:x,displayLink:c})}}}return i.length===0?{results:[],error:void 0}:{results:i}}catch(n){return{results:[],error:`Web search error: ${n.message}`}}}async function Ja(e,t,r,a="driving"){var l,d,u,h;const n=new URLSearchParams({origins:t,destinations:r,key:e,mode:a,departure_time:"now"}),s=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${n}`);if(!s.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${s.status}`};const o=await s.json(),i=(u=(d=(l=o.rows)==null?void 0:l[0])==null?void 0:d.elements)==null?void 0:u[0];return!i||i.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(i==null?void 0:i.status)||o.status}`}:{distance:i.distance.text,duration:i.duration.text,durationInTraffic:(h=i.duration_in_traffic)==null?void 0:h.text}}const oe="https://gmail.googleapis.com/gmail/v1/users/me";class ee{constructor(t,r,a,n,s){this.db=t,this.userId=r,this.pinHash=a,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await Me(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var i;const r=await this.authHeaders(),a=new URLSearchParams;if(a.set("maxResults",String(t.maxResults||10)),t.query&&a.set("q",t.query),(i=t.labelIds)!=null&&i.length)for(const l of t.labelIds)a.append("labelIds",l);const n=await fetch(`${oe}/messages?${a}`,{headers:r});if(!n.ok){const l=await n.text();throw new Error(`Gmail list failed (${n.status}): ${l.substring(0,200)}`)}const s=await n.json();if(!s.messages||s.messages.length===0)return[];const o=[];for(const l of s.messages.slice(0,t.maxResults||10))try{const d=await this.getMessage(l.id,r);d&&o.push(d)}catch{}return o}async getMessage(t,r){const a=r||await this.authHeaders(),n=await fetch(`${oe}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:a});if(!n.ok)return null;const s=await n.json(),o=i=>{var l,d,u;return((u=(d=(l=s.payload)==null?void 0:l.headers)==null?void 0:d.find(h=>h.name.toLowerCase()===i.toLowerCase()))==null?void 0:u.value)||""};return{id:s.id,threadId:s.threadId,snippet:s.snippet||"",subject:o("Subject")||"(no subject)",from:o("From"),to:o("To"),date:o("Date")||new Date(parseInt(s.internalDate)).toISOString(),isUnread:(s.labelIds||[]).includes("UNREAD"),labels:s.labelIds||[]}}async getMessageBody(t){const r=await this.authHeaders(),a=await fetch(`${oe}/messages/${t}?format=full`,{headers:r});if(!a.ok){const s=await a.text();throw new Error(`Gmail message body failed (${a.status}): ${s.substring(0,200)}`)}const n=await a.json();return Rr(n.payload)}async search(t,r=10){return this.listMessages({query:t,maxResults:r})}async send(t,r,a,n={}){const s=await this.authHeaders(),o=[`To: ${t}`,`Subject: ${r}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];n.cc&&o.push(`Cc: ${n.cc}`),n.bcc&&o.push(`Bcc: ${n.bcc}`),n.replyToMessageId&&(o.push(`In-Reply-To: ${n.replyToMessageId}`),o.push(`References: ${n.replyToMessageId}`)),o.push("",a);const i=o.join(`\r
`),d={raw:btoa(unescape(encodeURIComponent(i))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};n.threadId&&(d.threadId=n.threadId);const u=await fetch(`${oe}/messages/send`,{method:"POST",headers:s,body:JSON.stringify(d)});if(!u.ok){const h=await u.text();throw new Error(`Gmail send failed (${u.status}): ${h.substring(0,200)}`)}return await u.json()}async createDraft(t,r,a){const n=await this.authHeaders(),o=[`To: ${t}`,`Subject: ${r}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8","",a].join(`\r
`),i=btoa(unescape(encodeURIComponent(o))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),l=await fetch(`${oe}/drafts`,{method:"POST",headers:n,body:JSON.stringify({message:{raw:i}})});if(!l.ok){const d=await l.text();throw new Error(`Gmail draft failed (${l.status}): ${d.substring(0,200)}`)}return await l.json()}async markAsRead(t){const r=await this.authHeaders();await fetch(`${oe}/messages/${t}/modify`,{method:"POST",headers:r,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async getUnreadCount(){const t=await this.authHeaders(),r=await fetch(`${oe}/labels/INBOX`,{headers:t});return r.ok&&(await r.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),r=await fetch(`${oe}/profile`,{headers:t});if(!r.ok)throw new Error("Failed to get Gmail profile");return await r.json()}}function Rr(e){var t,r,a;if(!e)return"";if((t=e.body)!=null&&t.data)return gt(e.body.data);if(e.parts){for(const n of e.parts)if(n.mimeType==="text/plain"&&((r=n.body)!=null&&r.data))return gt(n.body.data);for(const n of e.parts)if(n.mimeType==="text/html"&&((a=n.body)!=null&&a.data)){const s=gt(n.body.data);return Ya(s)}for(const n of e.parts)if(n.parts){const s=Rr(n);if(s)return s}}return e.snippet||""}function gt(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function Ya(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const Va=8e3,Xa=8e3;async function Dr(e,t){try{const r=new AbortController,a=setTimeout(()=>r.abort(),Xa),n=await fetch(e,{signal:r.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(clearTimeout(a),!n.ok)return{text:"",error:`HTTP ${n.status}`};const s=n.headers.get("content-type")||"";if(!s.includes("text/html")&&!s.includes("text/plain")&&!s.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${s.split(";")[0]}`};const o=await n.text(),i=Za(o);return i.length<50?{text:"",error:"Page has too little readable content"}:{text:i.substring(0,t||Va)}}catch(r){return{text:"",error:r.name==="AbortError"?"Timeout":r.message}}}function Za(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(r,a)=>String.fromCharCode(parseInt(a))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(r=>r.trim()).filter(r=>r.length>0).join(`
`),t.trim()}async function Ar(e,t,r={}){const a=r.maxPages||(r.depth==="thorough"?5:3),n=r.maxResults||(r.depth==="thorough"?8:5),s=await It(e,{num:n,site:r.site});if(s.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${s.error}`};if(s.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const i=s.results.slice(0,a).map(async g=>{const f=await Dr(g.link);return{title:g.title,url:g.link,displayLink:g.displayLink,snippet:g.snippet,content:f.text,error:f.error}}),d=(await Promise.all(i)).filter(g=>g.content.length>50);if(d.length===0){const g=s.results.map((y,_)=>`[${_+1}] ${y.title}
${y.snippet}
Source: ${y.link}`).join(`

`);return{report:await Pt(e,g,t,"snippets"),sources:s.results.map(y=>({title:y.title,url:y.link})),pagesRead:0}}const u=d.map((g,f)=>`--- SOURCE ${f+1}: ${g.title} (${g.displayLink}) ---
${g.content}
--- END SOURCE ${f+1} ---`).join(`

`);return{report:await Pt(e,u,t,"full"),sources:d.map(g=>({title:g.title,url:g.url})),pagesRead:d.length}}async function Pt(e,t,r,a){const s=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

${a==="full"?"I have fetched and read the full content of several web pages related to the research query.":"I could only retrieve search snippets (page fetching failed). Base the analysis on available snippet information and note this limitation."}

Instructions:
- Analyze ALL the source material provided below
- Write a clear, well-structured report answering the research query
- Include specific facts, numbers, and details from the sources
- Note any conflicting information between sources
- End with a brief conclusion or recommendation
- Cite sources by number [1], [2], etc.
- Keep the report concise but thorough — aim for 300-600 words
- Do NOT make up information not found in the sources
- If the sources don't adequately answer the query, say so honestly`,o=`Research query: "${e}"

Source material:
${t}

Write a synthesized research report answering the query above.`;try{return(await r.chat([{role:"system",content:s},{role:"user",content:o}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(i){return`Research synthesis error: ${i.message}. Raw search results were found but could not be analyzed.`}}const Qa=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:Ar,fetchPageContent:Dr},Symbol.toStringTag,{value:"Module"})),en=2e3,tn=2e3,Nr=4;function ft(e){return Math.ceil(e.length/Nr)}function Ut(e,t){const r=t*Nr;return e.length<=r?e:e.slice(0,r)+`
[...truncated to fit token budget]`}const Lr=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily"],description:"interval = every N minutes, daily = at a specific time"},schedule_value:{type:"string",description:'For interval: number of minutes (e.g. "30"). For daily: time in HH:MM format (e.g. "08:00")'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","schedule_value","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:"Store a piece of information the user wants you to remember. Use for facts, preferences, decisions, or important context.",parameters:{type:"object",properties:{type:{type:"string",enum:["fact","preference","decision","context"],description:"Category of memory"},title:{type:"string",description:"Short title/key for this memory"},content:{type:"string",description:"The information to remember"},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for critical info that should stay in working memory."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:"Read data from a Google Sheet. Requires Google account to be connected via OAuth. Returns cell values as rows.",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:D10", "Sheet1!A:A")'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. Use this to add new entries (expenses, logs, records) to an existing sheet.",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"check_gmail",description:"Check Gmail inbox for recent emails. Uses browser automation (Steel + Browser Use) to access Gmail and list unread/recent emails. Requires Steel and Browser Use API keys to be configured. Note: First-time use may require the user to complete Google sign-in through the Steel session viewer.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Maximum number of emails to retrieve. Default: 10"}}}},{name:"compose_gmail_draft",description:"Compose a draft email in Gmail without sending it. The draft will be saved in Drafts for the user to review.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject line"},body:{type:"string",description:"Email body text"}},required:["to","subject","body"]}},{name:"search_gmail",description:"Search Gmail for specific emails by query. Uses Gmail's search syntax (from:, to:, subject:, has:attachment, etc.).",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:john subject:meeting", "has:attachment newer_than:7d")'}},required:["query"]}},{name:"check_outlook_mail",description:"Check Outlook inbox for recent emails. Uses Browser Use Cloud to log into Outlook and list recent emails. Requires Browser Use API key in Settings. The user may have two Outlook accounts configured: primary (work) and secondary (personal). Default to primary unless the user specifies otherwise.",parameters:{type:"object",properties:{account:{type:"string",enum:["primary","secondary"],description:"Which Outlook account to check. Default: primary."}}}},{name:"compose_email_draft",description:"Compose an email draft in Outlook without sending it. The draft will be saved in the Drafts folder for the user to review and send manually. Supports primary and secondary Outlook accounts.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject line"},body:{type:"string",description:"Email body text"},account:{type:"string",enum:["primary","secondary"],description:"Which Outlook account to compose from. Default: primary."}},required:["to","subject","body"]}},{name:"check_outlook_calendar",description:"Check Outlook calendar for today and tomorrow events. Lists event title, time, location, and attendees. Supports primary and secondary Outlook accounts.",parameters:{type:"object",properties:{account:{type:"string",enum:["primary","secondary"],description:"Which Outlook account calendar to check. Default: primary."}}}},{name:"browse_web",description:"Browse the web and interact with websites using Browser Use Cloud AI agent. Use this for any web task: reading pages, filling forms, extracting data, or navigating sites. Requires Browser Use API key in Settings.",parameters:{type:"object",properties:{instruction:{type:"string",description:'Natural language instruction for what to do on the web (e.g., "Go to weather.com and get the forecast for Mumbai")'}},required:["instruction"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:"Send an email via Gmail. Uses Google OAuth directly. The email is sent immediately from the user's Gmail account. Use with care — confirm with the user before sending.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_upload",description:"Upload a file to Google Drive. The file must have been previously uploaded via the chat attachment. Specify the file_id from the attached file metadata. Optionally specify a folder name or ID.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id of the uploaded file (from attached file metadata)"},folder_name:{type:"string",description:"Optional: Name of the Drive folder to upload into. Will search for it or create if not found."},folder_id:{type:"string",description:"Optional: Specific Google Drive folder ID to upload into"}},required:["file_id"]}},{name:"parse_document",description:"Parse and extract text content from an uploaded file. Supports text files, CSV, JSON, XML, and other text-based formats. For binary formats (PDF, DOCX, images), returns the base64 data and detected type. Use this to read the full contents of an attached file.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id of the uploaded file to parse"}},required:["file_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets. Use for quick facts, links, current events, prices. Fast (~1s), no API key.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:"Deep web research — searches, reads multiple pages, and synthesizes a report with sources. Use when user needs analysis, comparisons, fact-checking, or thorough answers. Returns a compiled report, not links. (~10-15s)",parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Is Abacus AI good for agentic tool calls?", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"suggest_feature",description:"Propose a new feature or improvement for yourself. Use this when you notice something that could make you more useful — a missing tool, a better workflow, a UI improvement, or an integration opportunity. The user can approve or reject it later.",parameters:{type:"object",properties:{title:{type:"string",description:"Short, clear feature title"},description:{type:"string",description:"Detailed description of the feature — what it does, how it works"},rationale:{type:"string",description:"Why this would be valuable — what problem it solves or what it improves"},priority:{type:"string",enum:["low","medium","high","critical"],description:"Suggested priority"},category:{type:"string",enum:["general","tool","ui","integration","performance","security"],description:"Feature category"}},required:["title","description","rationale"]}},{name:"list_feature_requests",description:"List all feature requests and their statuses. Use to check what improvements have been proposed, approved, or implemented.",parameters:{type:"object",properties:{status:{type:"string",enum:["proposed","approved","rejected","in_progress","implemented","deferred","all"],description:"Filter by status. Default: all"}}}},{name:"update_feature_request",description:"Update the status or notes of a feature request. Use when the user approves, rejects, or provides feedback on a suggested feature.",parameters:{type:"object",properties:{feature_id:{type:"number",description:"ID of the feature request"},status:{type:"string",enum:["proposed","approved","rejected","in_progress","implemented","deferred"],description:"New status"},notes:{type:"string",description:"Implementation notes or feedback"}},required:["feature_id"]}}];function $r(e,t){const r=e.assistant_name||"Karna",a=e.personality_prompt?Ut(`## Personality Instructions
${e.personality_prompt}
`,en):"",n=Ut(t,tn);return`You are ${r} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic. Your name is ${r} — always refer to yourself by this name if asked.

## Your Core Identity
- You are a cloud-based personal assistant with memory, scheduling, Google Workspace integration (Sheets, Calendar, Docs), and browser-automation capabilities — you can check Gmail, Outlook, calendar, and browse the web.
- You remember past conversations and learn from every interaction.
- You can create scheduled tasks, reminders, and recurring checks through natural conversation.
- You always check your memory before responding to provide continuity.

## Current User
- **Name**: ${e.name}
- **Username**: ${e.username}
- **Role**: ${e.role}
- **Timezone**: ${e.timezone}

${a}

${n}

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
${rn(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.`}async function Gt(e,t,r){var d;const n=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${r.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let s;((d=n.files)==null?void 0:d.length)>0?s=n.files[0].id:s=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:r,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${s}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:s,folderName:r}}function rn(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}async function Mr(e,t,r,a,n,s,o,i,l,d,u){var g,f,y,_,x;const h=new me(r);switch(e){case"create_schedule":{const c=new Date;let p;const m=d||"UTC";if(t.schedule_type==="interval"){const v=parseInt(t.schedule_value,10);p=new Date(c.getTime()+v*60*1e3)}else{const[v,w]=t.schedule_value.split(":").map(Number),T=c.toLocaleString("en-US",{timeZone:m}),I=new Date(T),R=new Date(I);R.setHours(v,w,0,0),R<=I&&R.setDate(R.getDate()+1);const D=new Date(R.toLocaleString("en-US",{timeZone:"UTC"})),L=new Date(R.toLocaleString("en-US",{timeZone:m})),A=D.getTime()-L.getTime();p=new Date(R.getTime()+A)}return await r.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(a,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),p.toISOString()).run(),`Schedule created: "${t.name}" — ${t.schedule_type==="interval"?`every ${t.schedule_value} minutes`:`daily at ${t.schedule_value}`}. State: active. Next run: ${p.toISOString()}`}case"list_schedules":{const p=(await r.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(a).all()).results||[];return p.length===0?"No scheduled tasks found.":p.map(m=>`[ID:${m.id}] ${m.enabled?"▶":"⏸"} "${m.name}" — ${m.schedule_type==="interval"?`every ${m.schedule_value} min`:`daily at ${m.schedule_value}`} — ${m.action_type} — state: ${m.state||"active"} — next: ${m.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const c=t.enabled?1:0,p=c?"active":"paused";return await r.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(c,p,t.job_id,a).run(),`Schedule ${t.job_id} ${c?"enabled (active)":"paused"}.`}case"update_schedule_state":{const c=["created","active","reminding","paused","completed"],p=t.state;if(!c.includes(p))return`Invalid state "${p}". Valid states: ${c.join(", ")}`;const m=p==="completed"||p==="paused"?0:1;return await r.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(p,m,t.job_id,a).run(),`Schedule ${t.job_id} state updated to "${p}".`}case"delete_schedule":return await r.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,a).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const c=t.importance||5,p=c>=7?"working":"long_term";return await h.store(a,t.type,t.title,t.content,c,p),`Stored in ${p==="working"?"working":"long-term"} memory: [${t.type}] ${t.title} (importance: ${c})`}case"search_memory":{const c=await h.search(a,t.query);return c.length===0?"No matching memories found.":c.map(p=>`[${p.tier||"long_term"}] [${p.type}] **${p.title}**: ${p.content}`).join(`
`)}case"get_system_status":{const c=await r.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(a).first(),p=await r.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(a).first(),m=await r.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(a).first(),v=await r.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(a).first(),w=await r.prepare("SELECT * FROM heartbeat_log ORDER BY created_at DESC LIMIT 1").first(),T=new Date().toISOString().split("T")[0],R=((await r.prepare("SELECT provider, tokens_used, request_count FROM provider_usage WHERE user_id = ? AND usage_date = ?").bind(a,T).all()).results||[]).map(L=>`  ${L.provider}: ${L.tokens_used.toLocaleString()} tokens / ${L.request_count} requests`).join(`
`),D=await r.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(a).first();return`System Status:
- Active schedules: ${(c==null?void 0:c.cnt)||0}
- Memory: ${(m==null?void 0:m.cnt)||0} working / ${(p==null?void 0:p.cnt)||0} total
- Total messages: ${(v==null?void 0:v.cnt)||0}
- Unread errors: ${(D==null?void 0:D.cnt)||0}
- Last heartbeat: ${(w==null?void 0:w.status)||"N/A"} at ${(w==null?void 0:w.created_at)||"never"}
- Provider usage today:
${R||"  No usage recorded"}`}case"read_sheet":{if(!n)return"Authentication context unavailable.";try{const p=await new V(r,a,n,s||"",o||"").sheets.readRange(t.spreadsheet_id,t.range);return p.length===0?"No data found in the specified range.":p.map(m=>m.join("	| ")).join(`
`)}catch(c){return await S(r,a,"google","read_sheet",c.message),`Failed to read sheet: ${c.message}`}}case"write_sheet":{if(!n)return"Authentication context unavailable.";try{return`Written ${(await new V(r,a,n,s||"",o||"").sheets.writeRange(t.spreadsheet_id,t.range,t.values)).updatedCells} cells to ${t.range}.`}catch(c){return await S(r,a,"google","write_sheet",c.message),`Failed to write sheet: ${c.message}`}}case"append_sheet":{if(!n)return"Authentication context unavailable.";try{return`Appended ${(await new V(r,a,n,s||"",o||"").sheets.appendRows(t.spreadsheet_id,t.range,t.values)).updatedCells} cells to ${t.range}.`}catch(c){return await S(r,a,"google","append_sheet",c.message),`Failed to append to sheet: ${c.message}`}}case"create_sheet":{if(!n)return"Authentication context unavailable.";try{const c=new V(r,a,n,s||"",o||"");if(!(await c.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const m=await c.sheets.createSpreadsheet(t.title,t.sheet_names);let v="";if(t.folder_name)try{const{token:w}=await(await Promise.resolve().then(()=>Ge)).getGoogleAuth(r,a,n,s||"",o||"");v=`
Folder: "${(await Gt(w,m.spreadsheetId,t.folder_name)).folderName}"`}catch(w){v=`
(Could not move to folder "${t.folder_name}": ${w.message})`}try{await new me(r).store(a,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${m.spreadsheetId} | URL: ${m.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${v}
ID: ${m.spreadsheetId}
URL: ${m.url}`}catch(c){return await S(r,a,"google","create_sheet",c.message),`Failed to create spreadsheet: ${c.message}`}}case"list_calendar_events":{if(!n)return"Authentication context unavailable.";try{const c=new V(r,a,n,s||"",o||""),p=t.calendar_id||"primary",m=t.days_ahead||7,v=new Date,w=new Date(v.getTime()+m*24*60*60*1e3),T=await c.calendar.listEvents(p,{timeMin:v.toISOString(),timeMax:w.toISOString(),query:t.query});return T.length===0?`No events found in the next ${m} days.`:T.map(I=>{var z;const R=I.start.dateTime||I.start.date||"TBD",D=I.end.dateTime||I.end.date||"",L=I.location?` 📍 ${I.location}`:"",A=((z=I.attendees)==null?void 0:z.map(Q=>Q.email).join(", "))||"";return`• ${I.summary} — ${R} to ${D}${L}${A?`
  Attendees: ${A}`:""}`}).join(`
`)}catch(c){return await S(r,a,"google","list_calendar",c.message),`Failed to list events: ${c.message}`}}case"create_calendar_event":{if(!n)return"Authentication context unavailable.";try{const c=new V(r,a,n,s||"",o||""),p=t.calendar_id||"primary",m=await c.calendar.createEvent(p,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});return`Event created: "${m.summary}"
ID: ${m.id}
Start: ${m.start.dateTime||m.start.date}`}catch(c){return await S(r,a,"google","create_event",c.message),`Failed to create event: ${c.message}`}}case"create_doc":{if(!n)return"Authentication context unavailable.";try{const c=new V(r,a,n,s||"",o||"");if(!(await c.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const m=await c.docs.createDocument(t.title);t.content&&await c.docs.appendText(m.documentId,t.content);let v="";if(t.folder_name)try{const{token:w}=await(await Promise.resolve().then(()=>Ge)).getGoogleAuth(r,a,n,s||"",o||"");v=`
Folder: "${(await Gt(w,m.documentId,t.folder_name)).folderName}"`}catch(w){v=`
(Could not move to folder "${t.folder_name}": ${w.message})`}try{await new me(r).store(a,"context",`Document: ${t.title}`,`Document ID: ${m.documentId} | URL: ${m.url}`,6,"working")}catch{}return`Document created: "${t.title}"${v}
ID: ${m.documentId}
URL: ${m.url}`}catch(c){return await S(r,a,"google","create_doc",c.message),`Failed to create document: ${c.message}`}}case"read_doc":{if(!n)return"Authentication context unavailable.";try{const p=await new V(r,a,n,s||"",o||"").docs.readDocument(t.document_id);return`Document: "${p.title}"

${p.content}`}catch(c){return await S(r,a,"google","read_doc",c.message),`Failed to read document: ${c.message}`}}case"append_to_doc":{if(!n)return"Authentication context unavailable.";try{const c=new V(r,a,n,s||"",o||"");if(!(await c.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.';await c.docs.appendText(t.document_id,t.content);let m=t.document_id;try{m=(await c.docs.readDocument(t.document_id)).title}catch{}return`Content appended to "${m}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(c){return await S(r,a,"google","append_to_doc",c.message),`Failed to append to document: ${c.message}`}}case"gmail_list":{if(!n)return"Authentication context unavailable.";try{const p=await new ee(r,a,n,s||"",o||"").listMessages({maxResults:t.max_results||10,query:t.query});return p.length===0?"No messages found.":p.map((m,v)=>`${m.isUnread?"● ":"  "}${v+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(c){return await S(r,a,"gmail","list",c.message),(g=c.message)!=null&&g.includes("not connected")?c.message:`Gmail list error: ${c.message}`}}case"gmail_read":{if(!n)return"Authentication context unavailable.";try{const c=new ee(r,a,n,s||"",o||""),p=await c.getMessage(t.message_id);if(!p)return"Message not found.";const m=await c.getMessageBody(t.message_id);return`**${p.subject}**
From: ${p.from}
To: ${p.to}
Date: ${p.date}

${m}`}catch(c){return await S(r,a,"gmail","read",c.message),`Gmail read error: ${c.message}`}}case"gmail_search":{if(!n)return"Authentication context unavailable.";try{const p=await new ee(r,a,n,s||"",o||"").search(t.query,t.max_results||10);return p.length===0?`No results for: ${t.query}`:p.map((m,v)=>`${m.isUnread?"● ":"  "}${v+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(c){return await S(r,a,"gmail","search",c.message),`Gmail search error: ${c.message}`}}case"gmail_send":{if(!n)return"Authentication context unavailable.";try{const p=await new ee(r,a,n,s||"",o||"").send(t.to,t.subject,t.body,{cc:t.cc});return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${p.id}]`}catch(c){return await S(r,a,"gmail","send",c.message),`Gmail send error: ${c.message}`}}case"gmail_draft":{if(!n)return"Authentication context unavailable.";try{const p=await new ee(r,a,n,s||"",o||"").createDraft(t.to,t.subject,t.body);return`Draft created. To: ${t.to}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${p.id}]`}catch(c){return await S(r,a,"gmail","draft",c.message),`Gmail draft error: ${c.message}`}}case"gmail_unread_count":{if(!n)return"Authentication context unavailable.";try{const p=await new ee(r,a,n,s||"",o||"").getUnreadCount();return`You have ${p} unread email${p!==1?"s":""} in Gmail.`}catch(c){return(f=c.message)!=null&&f.includes("not connected")?c.message:`Gmail error: ${c.message}`}}case"drive_list":{if(!n)return"Authentication context unavailable.";try{const{token:c}=await(await Promise.resolve().then(()=>Ge)).getGoogleAuth(r,a,n,s||"",o||""),p=new URLSearchParams;p.set("pageSize",String(t.max_results||10)),p.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),p.set("orderBy","modifiedTime desc");let m="";t.folder_id?m=`'${t.folder_id}' in parents and trashed = false`:t.query?m=`${t.query} and trashed = false`:m="trashed = false",p.set("q",m);const v=await fetch(`https://www.googleapis.com/drive/v3/files?${p}`,{headers:{Authorization:`Bearer ${c}`}});if(!v.ok)throw new Error(`Drive API error (${v.status})`);const w=await v.json();return(y=w.files)!=null&&y.length?w.files.map((T,I)=>{var A,z;const R=((A=T.mimeType)==null?void 0:A.split(".").pop())||T.mimeType,D=T.size?`${(parseInt(T.size)/1024).toFixed(1)} KB`:"",L=((z=T.modifiedTime)==null?void 0:z.split("T")[0])||"";return`${I+1}. **${T.name}** (${R})
   ${D} · Modified: ${L}
   ${T.webViewLink||""}`}).join(`

`):"No files found."}catch(c){return await S(r,a,"google","drive_list",c.message),`Drive list error: ${c.message}`}}case"drive_search":{if(!n)return"Authentication context unavailable.";try{const{token:c}=await(await Promise.resolve().then(()=>Ge)).getGoogleAuth(r,a,n,s||"",o||""),p=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,m=new URLSearchParams;m.set("q",p),m.set("pageSize",String(t.max_results||10)),m.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),m.set("orderBy","modifiedTime desc");const v=await fetch(`https://www.googleapis.com/drive/v3/files?${m}`,{headers:{Authorization:`Bearer ${c}`}});if(!v.ok)throw new Error(`Drive API error (${v.status})`);const w=await v.json();return(_=w.files)!=null&&_.length?w.files.map((T,I)=>{var L,A;const R=((L=T.mimeType)==null?void 0:L.split(".").pop())||T.mimeType,D=((A=T.modifiedTime)==null?void 0:A.split("T")[0])||"";return`${I+1}. **${T.name}** (${R}) — Modified: ${D}
   ${T.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(c){return await S(r,a,"google","drive_search",c.message),`Drive search error: ${c.message}`}}case"drive_upload":{if(!n)return"Authentication context unavailable.";try{const c=t.file_id;if(!c)return"file_id is required.";const p=await r.prepare("SELECT * FROM uploaded_files WHERE id = ? AND user_id = ?").bind(c,a).first();if(!p)return`File not found (id: ${c}). It may have been deleted or expired.`;const{token:m}=await(await Promise.resolve().then(()=>Ge)).getGoogleAuth(r,a,n,s||"",o||"");let v=t.folder_id||void 0;if(!v&&t.folder_name){const Q=t.folder_name,Ct=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${Q}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${m}`}})).json();((x=Ct.files)==null?void 0:x.length)>0?v=Ct.files[0].id:v=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({name:Q,mimeType:"application/vnd.google-apps.folder"})})).json()).id}const w=Uint8Array.from(atob(p.data_base64),Q=>Q.charCodeAt(0)),T={name:p.name};v&&(T.parents=[v]);const I="-------karna_upload_boundary",R=JSON.stringify(T),D="--"+I+`\r
Content-Type: application/json; charset=UTF-8\r
\r
`+R+`\r
--`+I+`\r
Content-Type: `+p.mime_type+`\r
Content-Transfer-Encoding: base64\r
\r
`+p.data_base64+`\r
--`+I+"--",L=await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,size",{method:"POST",headers:{Authorization:`Bearer ${m}`,"Content-Type":`multipart/related; boundary=${I}`},body:D});if(!L.ok){const Q=await L.text();throw new Error(`Drive upload failed (${L.status}): ${Q}`)}const A=await L.json(),z=t.folder_name?` in folder "${t.folder_name}"`:"";return`✅ Uploaded **${A.name}**${z} to Google Drive.
📎 ${A.webViewLink||"https://drive.google.com/file/d/"+A.id}`}catch(c){return await S(r,a,"google","drive_upload",c.message),`Drive upload error: ${c.message}`}}case"parse_document":try{const c=t.file_id;if(!c)return"file_id is required.";const p=await r.prepare("SELECT id, name, mime_type, size, text_preview, data_base64 FROM uploaded_files WHERE id = ? AND user_id = ?").bind(c,a).first();if(!p)return`File not found (id: ${c}).`;const m=p.mime_type,v=p.name;if(m.startsWith("text/")||m==="application/json"||m==="application/xml"||m==="text/csv"||m==="application/csv"){const I=new TextDecoder,R=Uint8Array.from(atob(p.data_base64),A=>A.charCodeAt(0)),D=I.decode(R),L=D.length>8e3?D.substring(0,8e3)+`

[...truncated at 8000 chars, total: `+D.length+" chars]":D;return`📄 **${v}** (${m}, ${Math.round(p.size/1024)}KB)

\`\`\`
${L}
\`\`\``}const w=Math.round(p.size/1024);let T=`📄 **${v}** (${m}, ${w}KB)

`;return m==="application/pdf"?(T+="This is a PDF file. Text extraction from PDF requires external services. ",T+="You can upload it to Google Drive using drive_upload, then use Google Docs to open and read it."):m.includes("word")||m.includes("document")||v.endsWith(".docx")||v.endsWith(".doc")?T+="This is a Word document. Upload it to Google Drive using drive_upload to view/edit.":m.includes("spreadsheet")||m.includes("excel")||v.endsWith(".xlsx")||v.endsWith(".xls")?T+="This is a spreadsheet. Upload it to Google Drive using drive_upload to view/edit with Google Sheets.":m.startsWith("image/")?T+="This is an image file ("+m+"). Upload it to Google Drive using drive_upload for storage.":m.startsWith("audio/")||m.startsWith("video/")?T+="This is a media file ("+m+"). Upload it to Google Drive using drive_upload for storage.":T+="Binary file detected. Upload it to Google Drive using drive_upload.",p.text_preview&&(T+=`

**Partial text extracted:**
\`\`\`
`+p.text_preview.substring(0,2e3)+"\n```"),T}catch(c){return`Document parse error: ${c.message}`}case"check_gmail":return n?await new X(r,a).checkGmail(n):"Authentication context unavailable for browser actions.";case"compose_gmail_draft":return n?await new X(r,a).composeGmailDraft(n,t.to,t.subject,t.body):"Authentication context unavailable for browser actions.";case"search_gmail":return n?await new X(r,a).searchGmail(n,t.query):"Authentication context unavailable for browser actions.";case"check_outlook_mail":{if(!n)return"Authentication context unavailable for browser actions.";const c=new X(r,a),p=t.account||"primary";return await c.checkOutlookMail(n,p)}case"compose_email_draft":{if(!n)return"Authentication context unavailable for browser actions.";const c=new X(r,a),p=t.account||"primary";return await c.composeDraft(n,t.to,t.subject,t.body,p)}case"check_outlook_calendar":{if(!n)return"Authentication context unavailable for browser actions.";const c=new X(r,a),p=t.account||"primary";return await c.checkOutlookCalendar(n,p)}case"browse_web":return n?await new X(r,a).browseWeb(n,t.instruction):"Authentication context unavailable for browser actions.";case"web_search":try{const c=await It(t.query,{num:t.num_results||5,site:t.site});return c.error?`Web search failed: ${c.error}`:c.results.length===0?`No results found for "${t.query}".`:c.results.map((p,m)=>`${m+1}. **${p.title}**
   ${p.link}
   ${p.snippet}`).join(`

`)}catch(c){return await S(r,a,"search","web_search",c.message),`Web search error: ${c.message}`}case"read_url":try{const c=t.url;if(!c||!c.startsWith("http://")&&!c.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const p=Math.min(t.max_length||8e3,15e3),{fetchPageContent:m}=await Promise.resolve().then(()=>Qa),v=await m(c,p);return v.error?`Failed to read page: ${v.error}`:!v.text||v.text.length<20?`Page at ${c} returned no readable content.`:`Content from ${c} (${v.text.length} chars):

${v.text}`}catch(c){return await S(r,a,"search","read_url",c.message),`Read URL error: ${c.message}`}case"research":{if(!u)return"Research tool requires an LLM provider but none is available.";try{const c=await Ar(t.query,u,{depth:t.depth||"quick",site:t.site});if(c.error)return`Research failed: ${c.error}`;let p=c.report;return c.sources.length>0&&(p+=`

---
**Sources** (`+c.pagesRead+` pages read):
`,p+=c.sources.map((m,v)=>`[${v+1}] ${m.title}
    ${m.url}`).join(`
`)),p}catch(c){return await S(r,a,"research","research",c.message),`Research error: ${c.message}`}}case"search_places":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const p=await $(c.encrypted_value,n),m=await Ha(p,t.query,{type:t.type});return m.error?`Places search failed: ${m.error}`:m.results.length===0?`No places found for "${t.query}".`:m.results.map((v,w)=>{const T=v.rating?` ★${v.rating} (${v.userRatingsTotal||0} reviews)`:"",I=v.openNow!==void 0?v.openNow?" · Open now":" · Closed":"",R=v.googleMapsUri?`
   ${v.googleMapsUri}`:"";return`${w+1}. **${v.name}**${T}${I}
   ${v.address}${R}
   [place_id: ${v.placeId}]`}).join(`

`)}catch(c){return await S(r,a,"google_api","search_places",c.message),`Places search error: ${c.message}`}}case"get_place_details":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await $(c.encrypted_value,n),m=await Fa(p,t.place_id);if(m.error)return`Details lookup failed: ${m.error}`;if(!m.details)return"No details found.";const v=m.details;let w=`**${v.name}**
📍 ${v.address}`;if(v.phone&&(w+=`
📞 ${v.phone}`),v.website&&(w+=`
🌐 ${v.website}`),v.rating&&(w+=`
★ ${v.rating}`),v.googleMapsUri&&(w+=`
📌 ${v.googleMapsUri}`),v.openingHours&&(w+=`

Opening Hours:
${v.openingHours.join(`
`)}`),v.reviews&&v.reviews.length>0){w+=`

Recent Reviews:`;for(const T of v.reviews)w+=`
— ${T.author} (★${T.rating}, ${T.time}): "${T.text}"`}return w}catch(c){return await S(r,a,"google_api","place_details",c.message),`Place details error: ${c.message}`}}case"get_directions":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await $(c.encrypted_value,n),m=await za(p,t.origin,t.destination,{mode:t.mode||"driving"});if(m.error)return`Directions failed: ${m.error}`;if(!m.route)return"No route found.";const v=m.route;let w=`**${v.startAddress}** → **${v.endAddress}**
`;return w+=`📏 ${v.distance} · ⏱️ ${v.duration}`,v.durationInTraffic&&(w+=` (with traffic: ${v.durationInTraffic})`),w+=`
via ${v.summary}`,w+=`

Steps:`,v.steps.forEach((T,I)=>{w+=`
${I+1}. ${T.instruction} (${T.distance}, ${T.duration})`}),w}catch(c){return await S(r,a,"google_api","directions",c.message),`Directions error: ${c.message}`}}case"get_travel_time":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await $(c.encrypted_value,n),m=await Ja(p,t.origin,t.destination,t.mode||"driving");if(m.error)return`Travel time lookup failed: ${m.error}`;let v=`${t.origin} → ${t.destination}: ${m.distance}, ${m.duration}`;return m.durationInTraffic&&(v+=` (with traffic: ${m.durationInTraffic})`),v}catch(c){return await S(r,a,"google_api","travel_time",c.message),`Travel time error: ${c.message}`}}case"translate_text":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await $(c.encrypted_value,n),m=await qa(p,t.text,t.target_language,t.source_language);return m.error?`Translation failed: ${m.error}`:`[${m.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${m.translatedText}`}catch(c){return await S(r,a,"google_api","translate",c.message),`Translation error: ${c.message}`}}case"search_youtube":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await $(c.encrypted_value,n),m=await Ka(p,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return m.error?`YouTube search failed: ${m.error}`:m.results.length===0?`No YouTube results for "${t.query}".`:m.results.map((v,w)=>{var T;return`${w+1}. **${v.title}**
   ${v.channelTitle} · ${((T=v.publishedAt)==null?void 0:T.split("T")[0])||""}
   ${v.description}
   ${v.url}`}).join(`

`)}catch(c){return await S(r,a,"google_api","youtube_search",c.message),`YouTube search error: ${c.message}`}}case"geocode_address":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const p=await $(c.encrypted_value,n),m=await Wa(p,t.address);return m.error?`Geocoding failed: ${m.error}`:m.results.length===0?`Location not found: "${t.address}"`:m.results.map((v,w)=>`${w+1}. ${v.address}
   Coordinates: ${v.lat}, ${v.lng}`).join(`
`)}catch(c){return await S(r,a,"google_api","geocode",c.message),`Geocoding error: ${c.message}`}}case"suggest_feature":try{const c=t.title,p=t.description,m=t.rationale||"",v=t.priority||"medium",w=t.category||"general",T=t.proposed_by||"assistant";return await r.prepare("INSERT INTO feature_requests (user_id, title, description, rationale, priority, category, proposed_by) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(a,c,p,m,v,w,T).run(),`Feature proposed: "${c}" (${v} priority, ${w}). The user can review it in Settings → Features or ask to list feature requests.`}catch(c){return await S(r,a,"system","suggest_feature",c.message),`Error proposing feature: ${c.message}`}case"list_feature_requests":try{const c=t.status||"all";let p="SELECT * FROM feature_requests WHERE user_id = ?";const m=[a];c!=="all"&&(p+=" AND status = ?",m.push(c)),p+=" ORDER BY created_at DESC LIMIT 30";const w=(await r.prepare(p).bind(...m).all()).results||[];if(w.length===0)return c==="all"?"No feature requests yet. I'll suggest improvements as I notice opportunities.":`No feature requests with status "${c}".`;const T={proposed:"💡",approved:"✅",rejected:"❌",in_progress:"🔧",implemented:"🎉",deferred:"⏸️"};return w.map((I,R)=>`${R+1}. ${T[I.status]||"•"} **${I.title}** [${I.status}] (${I.priority})
   ${I.description}
   ${I.rationale?"Why: "+I.rationale:""}
   Category: ${I.category} · ID: ${I.id}`).join(`

`)}catch(c){return await S(r,a,"system","list_features",c.message),`Error listing features: ${c.message}`}case"update_feature_request":try{const c=t.feature_id,p=[],m=[];return t.status&&(p.push("status = ?"),m.push(t.status)),t.notes&&(p.push("implementation_notes = ?"),m.push(t.notes)),p.length===0?"No updates specified.":(p.push("updated_at = CURRENT_TIMESTAMP"),m.push(c,a),await r.prepare(`UPDATE feature_requests SET ${p.join(", ")} WHERE id = ? AND user_id = ?`).bind(...m).run(),`Feature request #${c} updated.`)}catch(c){return await S(r,a,"system","update_feature",c.message),`Error updating feature: ${c.message}`}default:return`Unknown tool: ${e}`}}async function Ot(e,t,r,a,n,s){var _;const o=new me(t),i=(_=e.metadata)==null?void 0:_.thread_id,l=await o.buildContext(a.id),d=await o.getRecentConversations(a.id,15,i),h=[{role:"system",content:$r(a,l)},...d.map(x=>({role:x.role,content:x.content})),{role:"user",content:e.text}];await o.storeMessage(a.id,e.channel,"user",e.text,"{}",i);const g=10;let f="",y=0;for(let x=0;x<g;x++)try{const c=await r.chat(h,{tools:Lr});if(c.usage&&(y+=c.usage.promptTokens+c.usage.completionTokens),c.toolCalls&&c.toolCalls.length>0){c.content&&h.push({role:"assistant",content:c.content});for(const p of c.toolCalls)try{const m=await Mr(p.name,p.arguments,t,a.id,a.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,a.timezone,r);h.push({role:"user",content:`[Tool Result for ${p.name}]: ${m}`})}catch(m){await S(t,a.id,"tool",p.name,m.message||"Tool execution failed"),h.push({role:"user",content:`[Tool Error for ${p.name}]: ${m.message||"Execution failed"}`})}continue}f=c.content;break}catch(c){if(n){const p=c.message||"",m=p.includes("401")||p.includes("403")||p.includes("authentication")||p.includes("credit balance"),v=p.includes("429"),w=m?1440:v?10:5;await n.recordError(r.name,p,w)}throw await S(t,a.id,"llm","provider_error",c.message||"Unknown LLM error",{provider:r.name,turn:x}),c}return n&&y>0&&await n.recordUsage(r.name,y),await o.storeMessage(a.id,e.channel,"assistant",f,"{}",i),await o.compactHistory(a.id,30),f}const Ht={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function an(e){for(const[t,r]of Object.entries(Ht))if(e.toLowerCase().includes(t.toLowerCase()))return r;return Ht.default}function nn(e,t,r,a){const n=an(a),s=Math.floor(n*.75),o=[];let i=0,l=!1;const d=ft(e);o.push({role:"system",content:e}),i+=d;const u=ft(r);i+=u;const h=s-i,g=[];let f=0;for(let y=t.length-1;y>=0;y--){const _=t[y],x=ft(_.content);if(f+x<=h)g.unshift({role:_.role,content:_.content}),f+=x;else{l=!0;break}}return o.push(...g),o.push({role:"user",content:r}),i+=f,{maxTokens:n,usedTokens:i,messages:o,wasTruncated:l}}async function*sn(e,t,r,a,n,s){var x;const o=new me(t),i=(x=e.metadata)==null?void 0:x.thread_id;yield{type:"thinking",data:{threadId:i,provider:r.name}};const l=await o.buildContext(a.id),d=await o.getRecentConversations(a.id,20,i),u=$r(a,l),h=nn(u,d,e.text,r.name);await o.storeMessage(a.id,e.channel,"user",e.text,"{}",i);const g=10;let f="",y=0;const _=[...h.messages];for(let c=0;c<g;c++)try{c>0&&(yield{type:"thinking",data:{threadId:i}});const p=await r.chat(_,{tools:Lr});if(p.usage&&(y+=p.usage.promptTokens+p.usage.completionTokens),p.toolCalls&&p.toolCalls.length>0){p.content&&(yield{type:"chunk",data:{text:p.content,threadId:i}},_.push({role:"assistant",content:p.content}));for(const v of p.toolCalls){yield{type:"tool_start",data:{tool:v.name,toolArgs:v.arguments,threadId:i}};try{const w=await Mr(v.name,v.arguments,t,a.id,a.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,a.timezone,r);yield{type:"tool_end",data:{tool:v.name,toolResult:w.substring(0,500)+(w.length>500?"...":""),threadId:i}},_.push({role:"user",content:`[Tool Result for ${v.name}]: ${w}`})}catch(w){await S(t,a.id,"tool",v.name,w.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:v.name,toolResult:`Error: ${w.message||"Execution failed"}`,threadId:i}},_.push({role:"user",content:`[Tool Error for ${v.name}]: ${w.message||"Execution failed"}`})}}continue}f=p.content;const m=50;for(let v=0;v<f.length;v+=m)yield{type:"chunk",data:{text:f.substring(v,v+m),threadId:i}},v+m<f.length&&await new Promise(T=>setTimeout(T,10));break}catch(p){if(n){const m=p.message||"",v=m.includes("401")||m.includes("403")||m.includes("authentication")||m.includes("credit balance"),w=m.includes("429"),T=v?1440:w?10:5;await n.recordError(r.name,m,T)}await S(t,a.id,"llm","provider_error",p.message||"Unknown LLM error",{provider:r.name,turn:c}),yield{type:"error",data:{error:p.message||"An error occurred",threadId:i}};return}n&&y>0&&await n.recordUsage(r.name,y),await o.storeMessage(a.id,e.channel,"assistant",f,"{}",i),await o.compactHistory(a.id,30),yield{type:"done",data:{threadId:i,provider:r.name,tokenCount:y}}}const M=new he;async function on(e,t){var n;const r=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",r),await t()}M.use("/*",on);M.get("/threads",async e=>{const t=e.get("user"),r=e.req.query("archived")==="1",a=parseInt(e.req.query("limit")||"30"),n=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(t.id,r?1:0,a).all();return e.json({threads:n.results||[]})});M.post("/threads",async e=>{const t=e.get("user"),{title:r}=await e.req.json(),a=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,r||"New conversation").first();return e.json({thread:a})});M.put("/threads/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),a=await e.req.json(),n=[],s=[];return a.title!==void 0&&(n.push("title = ?"),s.push(a.title)),a.is_archived!==void 0&&(n.push("is_archived = ?"),s.push(a.is_archived?1:0)),n.push("updated_at = CURRENT_TIMESTAMP"),s.push(r,t.id),n.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${n.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),e.json({success:!0}))});M.delete("/threads/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});M.post("/upload",async e=>{const t=e.get("user");try{const a=(await e.req.formData()).get("file");if(!a)return e.json({error:"No file provided"},400);if(a.size>5*1024*1024)return e.json({error:"File too large. Maximum size is 5MB."},400);const n=await a.arrayBuffer(),s=btoa(String.fromCharCode(...new Uint8Array(n))),o=crypto.randomUUID();let i="";const l=a.type||"application/octet-stream";return(l.startsWith("text/")||l==="application/json"||l==="application/xml"||l==="text/csv")&&(i=new TextDecoder().decode(n).substring(0,2e3)),await e.env.DB.prepare(`INSERT INTO uploaded_files (id, user_id, name, mime_type, size, data_base64, text_preview, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`).bind(o,t.id,a.name,l,a.size,s,i).run(),e.json({file_id:o,name:a.name,type:l,size:a.size,text_preview:i?i.substring(0,500):""})}catch(r){return e.json({error:`Upload failed: ${r.message}`},500)}});M.post("/send",async e=>{const t=e.get("user"),{message:r,channel:a="web",thread_id:n,files:s}=await e.req.json();if(!r||typeof r!="string"||r.trim().length===0)return e.json({error:"Message is required"},400);let o="";if(s&&Array.isArray(s)&&s.length>0){o=`

[Attached files:
`;for(const d of s)o+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(o+=`
  Preview: ${d.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=n;if(!i){const d=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,r.trim().substring(0,60)+(r.trim().length>60?"...":"")).first();i=d==null?void 0:d.id}const l={userId:t.id,username:t.username,channel:a,text:r.trim()+o,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:d,rotation:u,costGuard:h}=await Ze(e.env.DB,t.id,t.pin_hash),g=await Ot(l,e.env.DB,d,t,u,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID});return!n&&i?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run():i&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),e.json({response:g,timestamp:new Date().toISOString(),channel:l.channel,provider:d.name,thread_id:i})}catch(d){console.error("Chat error:",d);const u=d.message||"";if(u.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400);if(u.includes("All LLM providers failed"))return e.json({error:u,type:"no_provider",thread_id:i},400);if(u.includes("limit reached"))return e.json({error:u,type:"cost_limit",thread_id:i},429);const h=u.includes("401")||u.includes("403")||u.includes("authentication")||u.includes("credit balance")||u.includes("invalid")&&u.includes("key");try{const{logError:g}=await Promise.resolve().then(()=>it);await g(e.env.DB,t.id,"llm","chat_error",u)}catch{}return e.json({error:h?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:u,type:h?"no_provider":void 0,thread_id:i},h?400:500)}});function Ft(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}M.post("/stream",async e=>{const t=e.get("user"),{message:r,channel:a="web",thread_id:n,files:s}=await e.req.json();if(!r||typeof r!="string"||r.trim().length===0)return e.json({error:"Message is required"},400);let o="";if(s&&Array.isArray(s)&&s.length>0){o=`

[Attached files:
`;for(const d of s)o+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(o+=`
  Preview: ${d.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=n;if(!i){const d=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,r.trim().substring(0,60)+(r.trim().length>60?"...":"")).first();i=d==null?void 0:d.id}const l={userId:t.id,username:t.username,channel:a,text:r.trim()+o,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:d,rotation:u}=await Ze(e.env.DB,t.id,t.pin_hash),h=new ReadableStream({async start(g){const f=new TextEncoder;try{const y=sn(l,e.env.DB,d,t,u,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID});for await(const _ of y)_.data.threadId||(_.data.threadId=i),g.enqueue(f.encode(Ft(_)));i&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),g.close()}catch(y){const _={type:"error",data:{error:y.message||"An error occurred",threadId:i}};g.enqueue(f.encode(Ft(_))),g.close()}}});return new Response(h,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(i||"")}})}catch(d){console.error("Stream setup error:",d);const u=d.message||"";return u.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400):u.includes("limit reached")?e.json({error:u,type:"cost_limit",thread_id:i},429):e.json({error:"Something went wrong setting up the stream.",details:u,thread_id:i},500)}});M.get("/threads/:id/messages",async e=>{var s;const t=e.get("user"),r=parseInt(e.req.param("id")),a=parseInt(e.req.query("limit")||"50"),n=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,r,a).all();return e.json({messages:(n.results||[]).reverse(),total:((s=n.results)==null?void 0:s.length)||0})});M.get("/history",async e=>{var l;const t=e.get("user"),r=parseInt(e.req.query("limit")||"50"),a=parseInt(e.req.query("offset")||"0"),n=e.req.query("thread_id");let s,o;n?(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[t.id,parseInt(n),r,a]):(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[t.id,r,a]);const i=await e.env.DB.prepare(s).bind(...o).all();return e.json({messages:(i.results||[]).reverse(),total:((l=i.results)==null?void 0:l.length)||0})});M.delete("/history",async e=>{const t=e.get("user"),r=e.req.query("thread_id");return r?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(r)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});M.get("/dashboard",async e=>{const t=e.get("user"),r=new Date().toISOString().split("T")[0],[a,n,s,o,i,l,d]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first(),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all(),e.env.DB.prepare("SELECT provider, tokens_used, request_count FROM provider_usage WHERE user_id = ? AND usage_date = ?").bind(t.id,r).all(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first()]);return e.json({threads:(a==null?void 0:a.cnt)||0,active_schedules:(n==null?void 0:n.cnt)||0,memories:(s==null?void 0:s.cnt)||0,recent_threads:o.results||[],provider_usage:i.results||[],unread_notifications:(l==null?void 0:l.cnt)||0,errors:(d==null?void 0:d.cnt)||0})});M.get("/gmail/unread",async e=>{const t=e.get("user");try{const r=e.env.GOOGLE_CLIENT_ID,a=e.env.GOOGLE_CLIENT_SECRET;if(!r||!a)return e.json({count:null,reason:"google_not_configured"});const s=await new ee(e.env.DB,t.id,t.pin_hash,r,a).getUnreadCount();return e.json({count:s})}catch(r){return e.json({count:null,reason:r.message})}});M.get("/providers",async e=>{const t=e.get("user"),{ProviderRotation:r}=await Promise.resolve().then(()=>it),a=new r(e.env.DB,t.id),n=await a.getUsageStats(),s=await a.getStatusText();return e.json({stats:n,statusText:s})});M.get("/notifications/count",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(r==null?void 0:r.cnt)||0})});M.get("/notifications",async e=>{const t=e.get("user"),r=parseInt(e.req.query("limit")||"20"),a=await e.env.DB.prepare(`SELECT id, type, title, body, is_read, source, action_url, created_at 
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,r).all();return e.json({notifications:a.results||[]})});M.put("/notifications/:id/read",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});M.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});M.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const N=new he;async function ln(e,t){var n;const r=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),await t()}N.use("/*",ln);N.get("/profile",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(r==null?void 0:r.name)||t.name,role:(r==null?void 0:r.role)||t.role,personality_prompt:(r==null?void 0:r.personality_prompt)||t.personality_prompt,telegram_chat_id:(r==null?void 0:r.telegram_chat_id)||t.telegram_chat_id,timezone:(r==null?void 0:r.timezone)||t.timezone,assistant_name:(r==null?void 0:r.assistant_name)||"Karna"})});N.put("/profile",async e=>{const t=e.get("user"),r=await e.req.json(),a=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],n=[],s=[];for(const o of a)r[o]!==void 0&&(n.push(`${o} = ?`),s.push(r[o]));return n.length===0?e.json({error:"No valid fields to update"},400):(n.push("updated_at = CURRENT_TIMESTAMP"),s.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${n.join(", ")} WHERE id = ?`).bind(...s).run(),e.json({success:!0}))});const _t=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","outlook_email","outlook_password","outlook_email_2","outlook_password_2","steel_api_key","browser_use_api_key"];N.get("/credentials",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT id, service, label, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all();return e.json({credentials:(r.results||[]).map(a=>({...a,configured:!0})),available_services:_t,llm_providers:qe})});N.put("/credentials",async e=>{const t=e.get("user"),{service:r,value:a,label:n}=await e.req.json();if(!r||!a)return e.json({error:"Service name and value are required"},400);if(!_t.includes(r))return e.json({error:`Invalid service. Must be one of: ${_t.join(", ")}`},400);const s=await kt(a,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,r,n||r,s).run(),e.json({success:!0,service:r})});N.delete("/credentials/:service",async e=>{const t=e.get("user"),r=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,r).run(),e.json({success:!0})});N.get("/memory",async e=>{const t=e.get("user"),r=e.req.query("type"),n=await new me(e.env.DB).getAll(t.id,r||void 0,100);return e.json({memories:n})});N.post("/memory",async e=>{const t=e.get("user"),{type:r,title:a,content:n,importance:s}=await e.req.json();return!r||!a||!n?e.json({error:"Type, title, and content are required"},400):(await new me(e.env.DB).store(t.id,r,a,n,s||5),e.json({success:!0}))});N.delete("/memory/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await new me(e.env.DB).remove(r,t.id),e.json({success:!0})});N.get("/schedules",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:r.results||[]})});N.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),{enabled:a}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a?1:0,r,t.id).run(),e.json({success:!0})});N.delete("/schedules/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});N.get("/errors",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:r.results||[]})});N.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});N.post("/credentials/validate",async e=>{const t=e.get("user"),{service:r,value:a}=await e.req.json();if(!r||!a)return e.json({error:"Service and value required"},400);const n=new X(e.env.DB,t.id);switch(r){case"steel_api_key":{const s=await n.validateSteelKey(a);return e.json(s)}case"browser_use_api_key":{const s=await n.validateBrowserUseKey(a);return e.json(s)}case"anthropic":try{const s=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return s.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):s.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${s.status}.`})}catch(s){return e.json({valid:!1,message:`Connection failed: ${s.message}`})}case"openai":try{const s=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${a}`}});return s.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):s.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${s.status}.`})}catch(s){return e.json({valid:!1,message:`Connection failed: ${s.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const s=JSON.parse(a);if(!s.provider||!s.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const o=qe[s.provider];if(!o)return e.json({valid:!1,message:`Unknown provider: ${s.provider}`});if(o.apiFormat==="anthropic"){const i=await fetch(o.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":s.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:o.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return i.ok?e.json({valid:!0,message:`${o.label} API key is valid.`}):i.status===401?e.json({valid:!1,message:`Invalid ${o.label} API key.`}):e.json({valid:!1,message:`${o.label} responded with status ${i.status}.`})}else{const i=o.apiBase+(o.validatePath||"/v1/models"),l=await fetch(i,{headers:{Authorization:`Bearer ${s.apiKey}`}});if(l.ok)return e.json({valid:!0,message:`${o.label} API key is valid.`});if(l.status===401||l.status===403)return e.json({valid:!1,message:`Invalid ${o.label} API key.`});if(l.status===404)try{const d=await fetch(o.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.apiKey}`},body:JSON.stringify({model:o.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return d.ok||d.status===200?e.json({valid:!0,message:`${o.label} API key is valid.`}):d.status===401||d.status===403?e.json({valid:!1,message:`Invalid ${o.label} API key.`}):e.json({valid:!1,message:`${o.label} responded with status ${d.status}.`})}catch(d){return e.json({valid:!1,message:`${o.label} chat test failed: ${d.message}`})}return e.json({valid:!1,message:`${o.label} responded with status ${l.status}.`})}}catch(s){return s instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${s.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});N.get("/google/status",async e=>{const t=e.get("user");try{const r=await St(e.env.DB,t.id,t.pin_hash),a=kr(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...r,oauth_client_configured:a})}catch(r){return e.json({connected:!1,error:r.message})}});N.get("/google/auth-url",async e=>{var t;e.get("user");try{const r=e.env.GOOGLE_CLIENT_ID,a=e.env.GOOGLE_CLIENT_SECRET;if(!r||!a)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const n=new URL(e.req.url),s=`${n.protocol}//${n.host}/auth/google/callback`,o=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),i=xr(r,s,o);return e.json({auth_url:i,redirect_uri:s})}catch(r){return e.json({error:`Failed to generate auth URL: ${r.message}`},500)}});N.post("/google/disconnect",async e=>{const t=e.get("user");try{return await Ir(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(r){return e.json({error:r.message},500)}});N.post("/google/test",async e=>{const t=e.get("user");try{const{token:r,email:a}=await Me(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),n=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${r}`}}),s=!0,o=n.ok;return e.json({success:!0,email:a,scopes:{sheets:s,calendar:o,docs:s,drive:s},message:o?`Connected as ${a} — all services working.`:`Connected as ${a} — calendar access issue (${n.status}).`})}catch(r){return e.json({success:!1,error:r.message})}});N.get("/features",async e=>{const t=e.get("user"),r=e.req.query("status");let a="SELECT * FROM feature_requests WHERE user_id = ?";const n=[t.id];r&&r!=="all"&&(a+=" AND status = ?",n.push(r)),a+=" ORDER BY created_at DESC LIMIT 50";const s=await e.env.DB.prepare(a).bind(...n).all();return e.json({features:s.results||[]})});N.put("/features/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),a=await e.req.json(),n=["status","implementation_notes","priority"],s=[],o=[];for(const i of n)a[i]!==void 0&&(s.push(`${i} = ?`),o.push(a[i]));return s.length===0?e.json({error:"No valid fields to update"},400):(s.push("updated_at = CURRENT_TIMESTAMP"),o.push(r,t.id),await e.env.DB.prepare(`UPDATE feature_requests SET ${s.join(", ")} WHERE id = ? AND user_id = ?`).bind(...o).run(),e.json({success:!0}))});N.delete("/features/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM feature_requests WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});N.post("/features",async e=>{const t=e.get("user"),{title:r,description:a,priority:n,category:s}=await e.req.json();return!r||!a?e.json({error:"Title and description required"},400):(await e.env.DB.prepare("INSERT INTO feature_requests (user_id, title, description, priority, category, proposed_by) VALUES (?, ?, ?, ?, ?, 'user')").bind(t.id,r,a,n||"medium",s||"general").run(),e.json({success:!0}))});const je=new he;je.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const r=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:r,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});je.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const r=Date.now()-t;return await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",r,JSON.stringify({timestamp:new Date().toISOString()})).run(),await e.env.DB.prepare(`DELETE FROM heartbeat_log WHERE id NOT IN (
        SELECT id FROM heartbeat_log ORDER BY created_at DESC LIMIT 1000
      )`).run(),e.json({status:"ok",latency_ms:r})}catch(t){return e.json({status:"error",error:t.message},500)}});je.get("/status",async e=>{var d;const t=(d=e.req.header("Authorization"))==null?void 0:d.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const a=r.user_id,[n,s,o,i,l]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(a).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(a).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(a).first(),e.env.DB.prepare("SELECT status, latency_ms, created_at FROM heartbeat_log ORDER BY created_at DESC LIMIT 1").first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(a).first()]);return e.json({active_schedules:(n==null?void 0:n.cnt)||0,memory_entries:(s==null?void 0:s.cnt)||0,total_messages:(o==null?void 0:o.cnt)||0,unread_errors:(l==null?void 0:l.cnt)||0,heartbeat:i||{status:"unknown"},version:"3.1.0"})});async function dn(e,t,r,a){try{const n=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t).first();if(!n)return;const s=await $(n.encrypted_value,n.pin_hash),o=4e3,i=a.length>o?a.substring(0,o-3)+"...":a;(await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:r,text:i,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:r,text:i})})}catch{}}function cn(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}je.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);const a=new Date,n=a.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:n})).run()}catch{}const s=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')`).bind(n).all(),o=[];for(const i of s.results||[])try{const l=i.user_timezone||"UTC";let d;if(i.schedule_type==="interval"){const g=parseInt(i.schedule_value,10);d=new Date(a.getTime()+g*60*1e3)}else if(i.schedule_type==="daily"){const[g,f]=i.schedule_value.split(":").map(Number),y=cn(l),_=new Date(y);_.setHours(g,f,0,0),_<=y&&_.setDate(_.getDate()+1);const x=new Date(_.toLocaleString("en-US",{timeZone:"UTC"})),c=new Date(_.toLocaleString("en-US",{timeZone:l})),p=x.getTime()-c.getTime();d=new Date(_.getTime()+p)}else d=new Date(a.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,d.toISOString(),i.id).run();const h=(JSON.parse(i.action_config||"{}").description||i.description)&&(i.action_type==="check_mail"||i.action_type==="check_calendar"||i.action_type==="check_sheet"||i.action_type==="custom");o.push({job_id:i.id,name:i.name,status:"dispatched",needs_agent:h,next_run:d.toISOString()})}catch(l){o.push({job_id:i.id,name:i.name,status:"error",error:l.message})}return e.json({executed:o.length,results:o,timestamp:n})});je.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);const a=parseInt(e.req.param("jobId"),10);if(!a)return e.json({error:"Invalid job ID"},400);const n=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(a).first();if(!n)return e.json({error:"Job not found"},404);const o=JSON.parse(n.action_config||"{}").description||n.description||"",i="⏰ "+(n.name||"Scheduled Task"),l=new Date().toISOString();let d="";try{const g={id:n.user_id,username:n.username||"user",name:n.user_name||"User",pin_hash:n.pin_hash||"",role:n.user_role||"",personality_prompt:n.personality_prompt||"",telegram_chat_id:n.telegram_chat_id||"",timezone:n.user_timezone||"UTC",assistant_name:n.assistant_name||"Karna",created_at:"",updated_at:""},f={userId:n.user_id,username:g.username,channel:"web",text:`[Scheduled task "${n.name}"]: ${o}. Respond with a short, clean plain-text summary. No markdown headers, no bold markers. Use simple numbered lines.`,sessionId:"cron-"+n.id,timestamp:l},{provider:y,rotation:_}=await Ze(e.env.DB,n.user_id,n.pin_hash);d=await Ot(f,e.env.DB,y,g,_,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(g){const f=g.message||"unknown error",y=f.includes("rate_limit")||f.includes("429")||f.includes("quota"),_=f.includes("timeout")||f.includes("Timeout");y?d="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":_?d="Task timed out. Will retry at next scheduled time.":d="Task encountered an error. Will retry at next scheduled time.",await S(e.env.DB,n.user_id,"cron_agent","execution_error",f,{job_id:n.id})}const u=d||o||"Time for your scheduled task.",h=i+`
`+u;return await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(n.user_id,"reminder",i,u,"cron:"+n.id).run(),await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(n.user_id,"system","assistant",h,JSON.stringify({type:"cron",job_id:n.id})).run(),n.telegram_chat_id&&await dn(e.env.DB,n.user_id,n.telegram_chat_id,h),e.json({job_id:a,status:"completed",response_length:d.length})});function un(e,t,r,a){return{userId:e,username:t,channel:"telegram",text:r,sessionId:`telegram-${a}`,timestamp:new Date().toISOString()}}function pn(e,t){return e.replace(/\*\*(.*?)\*\*/g,"*$1*").replace(/#{1,3}\s/g,"*").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const et=new he,mn=4e3;async function J(e,t,r,a="Markdown"){var s,o;const n=gn(r,mn);for(const i of n)try{const l=await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:i,parse_mode:a,disable_web_page_preview:!1})});if(!l.ok){const d=await l.json().catch(()=>null);((s=d==null?void 0:d.description)!=null&&s.includes("parse")||(o=d==null?void 0:d.description)!=null&&o.includes("entities"))&&await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:i})})}}catch{}}async function hn(e,t){try{await fetch(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function gn(e,t){if(e.length<=t)return[e];const r=[];let a=e;for(;a.length>0;){if(a.length<=t){r.push(a);break}let n=a.lastIndexOf(`
`,t);n<t*.3&&(n=a.lastIndexOf(" ",t)),n<t*.3&&(n=t),r.push(a.substring(0,n)),a=a.substring(n).trimStart()}return r}async function fn(e,t,r,a,n){switch(e.split("@")[0].toLowerCase()){case"/start":{const o=(a==null?void 0:a.name)||"there",i=(a==null?void 0:a.assistant_name)||"Karna",l=`👋 *Hello, ${o}!*

I'm ${i}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/new — Start a fresh conversation

Just type normally to chat. Everything works — schedules, memory, Gmail, Google Workspace, and more.`+(a?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`);return await J(r,t,l),!0}case"/help":{const i=`🛠 *${(a==null?void 0:a.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`;return await J(r,t,i),!0}case"/status":{if(!a)return await J(r,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app."),!0;try{const[o,i,l,d]=await Promise.all([n.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(a.id).first(),n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(a.id).first(),n.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(a.id).first(),n.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(a.id).first()]),u=`📊 *System Status*

Active tasks: ${(o==null?void 0:o.cnt)||0}
Memories: ${(i==null?void 0:i.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(d==null?void 0:d.cnt)||0}

Status: ✅ Online`;await J(r,t,u)}catch{await J(r,t,"✅ Online — but had trouble fetching stats.")}return!0}case"/new":return a?(await J(r,t,"🆕 Starting fresh conversation. Your next message begins a new thread."),!0):(await J(r,t,"⚠️ Account not linked."),!0);default:return!1}}et.post("/webhook",async e=>{var t,r,a;try{const n=await e.req.json();if(n.callback_query)return await vn(e.env.DB,n.callback_query),e.json({ok:!0});const s=n.message;if(!(s!=null&&s.text))return e.json({ok:!0});const o=String(s.chat.id),i=s.text,l=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(o).first();let d=null;if(l){const f=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(l.id,"telegram_bot_token").first();f&&(d=await $(f.encrypted_value,l.pin_hash))}if(!d){const f=await e.env.DB.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
         JOIN users u ON c.user_id = u.id 
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();f&&(d=await $(f.encrypted_value,f.pin_hash))}if(!d)return e.json({ok:!0,message:"Bot token not configured"});if(i.startsWith("/")&&await fn(i,o,d,l,e.env.DB))return e.json({ok:!0});if(!l)return await J(d,o,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${o}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`),e.json({ok:!0});await hn(d,o);const u=un(l.id,l.username,i,o);let h,g;try{const f=await Ze(e.env.DB,l.id,l.pin_hash);h=f.provider,g=f.rotation}catch(f){console.error("Telegram provider setup error:",f);const y=(t=f.message)!=null&&t.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(r=f.message)!=null&&r.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${f.message||"Unknown error"}`;return await J(d,o,y),e.json({ok:!0})}try{const f=await Ot(u,e.env.DB,h,l,g,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID}),y=pn(f,"telegram");await J(d,o,y||"(empty response)")}catch(f){console.error("Telegram agent error:",f);const y=(a=f.message)!=null&&a.includes("API error")?`⚠️ AI provider returned an error. The provider (${h.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(f.message||"Unknown").substring(0,200)}`;await J(d,o,y);try{const{logError:_}=await Promise.resolve().then(()=>it);await _(e.env.DB,l.id,"telegram","agent_error",f.message||"Agent error",{provider:h.name})}catch{}}return e.json({ok:!0})}catch(n){console.error("Telegram webhook error:",n);try{const{logError:s}=await Promise.resolve().then(()=>it);await s(e.env.DB,null,"telegram","webhook_error",n.message||"Unknown telegram error")}catch{}return e.json({ok:!0,error:n.message})}});et.post("/setup-webhook",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const{webhook_url:a}=await e.req.json(),n=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r.user_id,"telegram_bot_token").first();if(!n)return e.json({error:"Telegram bot token not configured in Settings"},400);const s=await $(n.encrypted_value,r.pin_hash);if(!a){const u=await(await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(u)}const i=await(await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a,allowed_updates:["message"],drop_pending_updates:!1})})).json();return e.json(i)});et.get("/webhook-status",async e=>{var s,o,i,l,d,u;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r.user_id,"telegram_bot_token").first();if(!a)return e.json({configured:!1,error:"Bot token not set"});const n=await $(a.encrypted_value,r.pin_hash);try{const g=await(await fetch(`https://api.telegram.org/bot${n}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((o=g.result)==null?void 0:o.url)||"",has_webhook:!!((i=g.result)!=null&&i.url),pending_updates:((l=g.result)==null?void 0:l.pending_update_count)||0,last_error:((d=g.result)==null?void 0:d.last_error_message)||"",last_error_date:((u=g.result)==null?void 0:u.last_error_date)||null})}catch(h){return e.json({configured:!0,error:h.message})}});et.post("/detect-chat-id",async e=>{var s,o;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r.user_id,"telegram_bot_token").first();if(!a)return e.json({error:"Bot token not configured"},400);const n=await $(a.encrypted_value,r.pin_hash);try{const d=((o=(await(await fetch(`https://api.telegram.org/bot${n}/getWebhookInfo`)).json()).result)==null?void 0:o.url)||"";await fetch(`https://api.telegram.org/bot${n}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(x=>setTimeout(x,500));const h=await(await fetch(`https://api.telegram.org/bot${n}/getUpdates?limit=10&timeout=0`)).json();d&&await fetch(`https://api.telegram.org/bot${n}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:d,allowed_updates:["message"]})});const g=h.result||[];if(g.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const f=[],y=new Set;for(let x=g.length-1;x>=0;x--){const c=g[x].message;if(c&&c.chat){const p=String(c.chat.id);y.has(p)||(y.add(p),f.push({chat_id:p,name:[c.chat.first_name,c.chat.last_name].filter(Boolean).join(" ")||c.chat.title||"Unknown",username:c.chat.username||"",date:new Date((c.date||0)*1e3).toISOString()}))}}if(f.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const _=f[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(_,r.user_id).run(),e.json({found:!0,chat_id:_,name:f[0].name,all_chats:f,message:`Chat ID ${_} detected and saved to your profile.`})}catch(i){return e.json({error:`Detection failed: ${i.message}`},500)}});async function vn(e,t){var _;const{id:r,data:a,message:n,from:s}=t;if(!a||!n)return;const o=a.split(":");if(o[0]!=="briefing_toggle"||o.length<3)return;const i=o[1],l=parseInt(o[2]);if(!l||!i)return;const d=String(n.chat.id),u=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(d).first();if(!u)return;const h=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(u.id,l,i).first();if(!h)return;const g=h.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(g,g,h.id).run();const f=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(u.id).first();if(!f)return;const y=await $(f.encrypted_value,f.pin_hash);if(await fetch(`https://api.telegram.org/bot${y}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:r,text:g?"✅ Checked!":"☐ Unchecked"})}),(_=n.reply_markup)!=null&&_.inline_keyboard){const x=n.reply_markup.inline_keyboard.map(c=>c.map(p=>{var m;if((m=p.callback_data)!=null&&m.includes(i)){const v=g?"✅":"☐",w=p.text.replace(/^[☐✅]\s*/,"");return{...p,text:`${v} ${w}`}}return p}));try{await fetch(`https://api.telegram.org/bot${y}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d,message_id:n.message_id,reply_markup:{inline_keyboard:x}})})}catch{}}}function yn(e){const t=new Date,r=new Date(t.toLocaleString("en-US",{timeZone:e})),a=new Date(r);a.setDate(a.getDate()+1),a.setHours(0,0,0,0);const n=new Date(a);n.setHours(23,59,59,999);const s=a.toISOString().split("T")[0];return{start:a.toISOString(),end:n.toISOString(),dateStr:s}}async function bn(e,t,r,a,n,s){try{return(await new Qe(e,t,r,a,n).listEvents("primary",{timeMin:s.start,timeMax:s.end,maxResults:50})).map(l=>{var d;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(d=l.attendees)==null?void 0:d.map(u=>u.displayName||u.email),source:"google"}})}catch(o){return console.error("Google Calendar fetch error:",o.message),[]}}async function wn(e,t,r){try{const n=await new X(e,t).checkOutlookCalendar(r,"primary");return!n||n.includes("not configured")||n.includes("Failed")?[]:[{id:`outlook-summary-${Date.now()}`,title:"Outlook Calendar Summary",startTime:new Date().toISOString(),endTime:new Date().toISOString(),location:n.substring(0,500),source:"outlook"}]}catch(a){return console.error("Outlook Calendar fetch error:",a.message),[]}}async function _n(e,t,r,a,n){try{const s=new ee(e,t,r,a,n),o=await s.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),i=await s.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const h of o){const g=h.from.split("<")[0].trim()||h.from;l[g]=(l[g]||0)+1}const d=Object.entries(l).sort(([,h],[,g])=>g-h).slice(0,5).map(([h])=>h),u=o.some(h=>h.subject.toLowerCase().includes("urgent")||h.subject.toLowerCase().includes("asap")||h.subject.toLowerCase().includes("immediately"));return{unreadCount:o.length,importantCount:i.length,topSenders:d,hasUrgent:u}}catch(s){return console.error("Gmail fetch error:",s.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function xn(e,t,r){try{const n=await new X(e,t).checkOutlookMail(r,"primary");if(!n||n.includes("not configured")||n.includes("Failed"))return{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1};const s=n.match(/(\d+)\s*unread/i);return{unreadCount:s?parseInt(s[1]):0,importantCount:0,topSenders:[],hasUrgent:n.toLowerCase().includes("urgent")}}catch(a){return console.error("Outlook email fetch error:",a.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function En(e,t){var r;try{const a=await e.prepare(`
      SELECT name, description, next_run 
      FROM cron_jobs 
      WHERE user_id = ? AND enabled = 1 AND state != 'completed'
      ORDER BY next_run ASC
      LIMIT 10
    `).bind(t).all(),n=new Date,s=new Date(n);s.setDate(s.getDate()+1);const o=(a.results||[]).map(l=>l.name),i=(a.results||[]).filter(l=>new Date(l.next_run)<=s).length;return{pending:((r=a.results)==null?void 0:r.length)||0,dueToday:i,items:o}}catch(a){return console.error("Tasks fetch error:",a.message),{pending:0,dueToday:0,items:[]}}}async function Tn(e){const t=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],r=[];for(const a of t){const n=`latest ${a} news today`;try{const s=await It(n,{num:3});if(s.results){for(const o of s.results.slice(0,2))if(!r.some(i=>i.url===o.link)&&(r.push({title:o.title,summary:o.snippet,url:o.link,source:o.displayLink}),r.length>=5))break}}catch(s){console.error(`News search error for "${n}":`,s.message)}if(r.length>=5)break}return r.slice(0,5)}function kn(e){const t=[];t.push(`📋 Evening Briefing for ${e.targetDate}`),t.push("");const r=e.calendar.totalCount;if(r>0){t.push(`📅 Tomorrow: ${r} event${r===1?"":"s"}`);for(const n of[...e.calendar.google,...e.calendar.outlook].slice(0,5)){const s=n.startTime?new Date(n.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${s} ${n.title}`)}}else t.push("📅 Tomorrow: No events scheduled");t.push("");const a=e.emails.gmail.unreadCount+e.emails.outlook.unreadCount;if(a>0?(t.push(`📧 Emails: ${a} unread`),(e.emails.gmail.hasUrgent||e.emails.outlook.hasUrgent)&&t.push("   ⚠️ Contains urgent messages")):t.push("📧 Emails: Inbox clear"),t.push(""),e.tasks.pending>0?t.push(`✅ Tasks: ${e.tasks.pending} pending (${e.tasks.dueToday} due soon)`):t.push("✅ Tasks: All caught up"),t.push(""),e.news.items.length>0){t.push("🤖 AI News Today:");for(const n of e.news.items)t.push(`   • ${n.title.substring(0,80)}${n.title.length>80?"...":""}`)}return t.join(`
`)}function Sn(e){const t=[];let r=0;for(const a of[...e.calendar.google,...e.calendar.outlook])t.push({type:"calendar",key:a.id,text:`${a.title} - ${new Date(a.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:a},sortOrder:r++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:r++}),e.emails.outlook.unreadCount>0&&t.push({type:"email",key:"outlook-unread",text:`Review ${e.emails.outlook.unreadCount} unread Outlook messages`,metadata:{source:"outlook",count:e.emails.outlook.unreadCount},sortOrder:r++});for(const a of e.tasks.items)t.push({type:"task",key:`task-${a}`,text:a,metadata:{},sortOrder:r++});for(const a of e.news.items)t.push({type:"news",key:`news-${a.url}`,text:`📰 ${a.title}`,metadata:{url:a.url,source:a.source},sortOrder:r++});return t}async function In(e,t){const r=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!r)return{components:{google_calendar:!0,outlook_calendar:!0,gmail:!0,outlook_email:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let a;try{a=JSON.parse(r.components)}catch{a={google_calendar:!0,outlook_calendar:!0,gmail:!0,outlook_email:!0,tasks:!0,news:!0,weather:!1}}const n=r.news_topics?r.news_topics.split(",").map(s=>s.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:a,newsTopics:n}}async function jr(e,t,r){var c,p;const a=t.timezone||"Asia/Kolkata",n=yn(a),{components:s,newsTopics:o}=await In(e,t.id),i=[],l=[];s.google_calendar&&(i.push(bn(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET,n)),l.push("googleEvents")),s.outlook_calendar&&(i.push(wn(e,t.id,t.pin_hash)),l.push("outlookEvents")),s.gmail&&(i.push(_n(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),s.outlook_email&&(i.push(xn(e,t.id,t.pin_hash)),l.push("outlookSummary")),s.tasks&&(i.push(En(e,t.id)),l.push("tasks")),s.news&&(i.push(Tn(o)),l.push("news"));const d=await Promise.all(i),u={};l.forEach((m,v)=>{u[m]=d[v]});const h={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},g={pending:0,dueToday:0,items:[]},f={generatedAt:new Date().toISOString(),targetDate:n.dateStr,calendar:{google:u.googleEvents||[],outlook:u.outlookEvents||[],totalCount:(((c=u.googleEvents)==null?void 0:c.length)||0)+(((p=u.outlookEvents)==null?void 0:p.length)||0)},emails:{gmail:u.gmailSummary||h,outlook:u.outlookSummary||h},tasks:u.tasks||g,news:{items:u.news||[],fetchedAt:new Date().toISOString()},summary:""};f.summary=kn(f);const y=Sn(f),_=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(t.id,JSON.stringify(f)).first(),x=(_==null?void 0:_.id)||0;for(const m of y)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(x,m.type,m.key,m.text,JSON.stringify(m.metadata),m.sortOrder).run();return{briefingId:x,content:f,items:y}}async function On(e,t,r){const a=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(r,t).first();if(!a)return null;const n=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(r).all();return{briefing:{...a,content:JSON.parse(a.content_json||"{}")},items:n.results||[]}}async function Cn(e,t,r,a){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(r,t).first())return null;const s=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(a,r).first();if(!s)return null;const o=s.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(o,o,a,r).run(),{checked:o===1}}async function Rn(e,t,r=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.sent_at DESC
    LIMIT ?
  `).bind(t,r).all()).results||[]).map(n=>({...n,content:JSON.parse(n.content_json||"{}")}))}function Dn(e,t,r=new Date){const a=new Date(r.toLocaleString("en-US",{timeZone:t})),n=a.getHours(),s=a.getMinutes(),[o,i]=e.split(":").map(Number),l=n*60+s,d=o*60+i;return l>=d&&l<d+5}function An(e,t){const r=e.summary,a=[];for(const n of t.slice(0,10))a.push([{text:`☐ ${n.text.substring(0,40)}${n.text.length>40?"...":""}`,callback_data:`briefing_toggle:${n.key}`}]);return{text:r,inlineKeyboard:a}}async function xt(e,t,r,a,n,s){const o=await e.prepare(`
    INSERT INTO proactive_triggers (user_id, name, type, conditions, actions)
    VALUES (?, ?, ?, ?, ?)
    RETURNING id
  `).bind(t,r,a,JSON.stringify(n),JSON.stringify(s)).first();return(o==null?void 0:o.id)||0}async function Br(e,t,r){const a=await e.prepare(`
    SELECT * FROM proactive_triggers WHERE id = ? AND user_id = ?
  `).bind(r,t).first();return a?{...a,conditions:JSON.parse(a.conditions||"{}"),actions:JSON.parse(a.actions||"{}"),enabled:a.enabled===1}:null}async function Pr(e,t){return((await e.prepare(`
    SELECT * FROM proactive_triggers WHERE user_id = ? ORDER BY created_at DESC
  `).bind(t).all()).results||[]).map(a=>({...a,conditions:JSON.parse(a.conditions||"{}"),actions:JSON.parse(a.actions||"{}"),enabled:a.enabled===1}))}async function Nn(e,t,r,a){const n=[],s=[];return a.name!==void 0&&(n.push("name = ?"),s.push(a.name)),a.type!==void 0&&(n.push("type = ?"),s.push(a.type)),a.conditions!==void 0&&(n.push("conditions = ?"),s.push(JSON.stringify(a.conditions))),a.actions!==void 0&&(n.push("actions = ?"),s.push(JSON.stringify(a.actions))),a.enabled!==void 0&&(n.push("enabled = ?"),s.push(a.enabled?1:0)),n.length===0?!1:(n.push("updated_at = CURRENT_TIMESTAMP"),s.push(r,t),await e.prepare(`
    UPDATE proactive_triggers SET ${n.join(", ")} WHERE id = ? AND user_id = ?
  `).bind(...s).run(),!0)}async function Ln(e,t,r){var n;return(((n=(await e.prepare(`
    DELETE FROM proactive_triggers WHERE id = ? AND user_id = ?
  `).bind(r,t).run()).meta)==null?void 0:n.changes)||0)>0}async function $n(e,t){const r=await e.prepare(`
    SELECT COUNT(*) as cnt FROM proactive_triggers WHERE user_id = ? AND name LIKE 'Default:%'
  `).bind(t).first();r&&r.cnt>0||(await xt(e,t,"Default: Outlook Event Detection","email_content",{keywords:["event","meeting","schedule","timing","sound check","requirement"],email_from:"@"},{notify:!0,telegram:!0,log:!0}),await xt(e,t,"Default: Urgent Email Alert","email_content",{keywords:["urgent","asap","immediately","critical"]},{notify:!0,telegram:!0,log:!0}))}async function Mn(e,t){var a;const r=e.conditions;for(const n of t){const s=`${n.subject} ${n.from} ${n.snippet}`.toLowerCase();if((a=r.keywords)!=null&&a.length&&r.keywords.some(i=>s.includes(i.toLowerCase())))return{matched:!0,content:`Email: ${n.subject} from ${n.from}`};if(r.regex)try{if(new RegExp(r.regex,"i").test(s))return{matched:!0,content:`Email matched pattern: ${n.subject}`}}catch{}if(r.email_from&&n.from.toLowerCase().includes(r.email_from.toLowerCase()))return{matched:!0,content:`Email from ${n.from}: ${n.subject}`};if(r.email_subject&&n.subject.toLowerCase().includes(r.email_subject.toLowerCase()))return{matched:!0,content:`Email with subject: ${n.subject}`}}return{matched:!1}}async function jn(e,t){var a;const r=e.conditions;for(const n of t){const s=`${n.summary} ${n.description||""} ${n.location||""}`.toLowerCase();if(r.calendar_pattern&&s.includes(r.calendar_pattern.toLowerCase()))return{matched:!0,content:`Calendar event: ${n.summary}`};if((a=r.keywords)!=null&&a.length&&r.keywords.some(i=>s.includes(i.toLowerCase())))return{matched:!0,content:`Calendar event: ${n.summary}`}}return{matched:!1}}function Bn(e,t,r){const a=e.conditions;if(!a.time)return!1;const n=new Date(t.toLocaleString("en-US",{timeZone:r})),[s,o]=a.time.split(":").map(Number),i=s*60+o,l=n.getHours()*60+n.getMinutes();return Math.abs(l-i)<15}async function Pn(e,t,r){const a=[],s=(await Pr(e,t.id)).filter(l=>l.enabled);if(s.length===0)return a;let o=[],i=[];try{o=(await new ee(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET).listMessages({query:"newer_than:1h",maxResults:20})).map(u=>({subject:u.subject,from:u.from,snippet:u.snippet}))}catch{}try{const l=new Qe(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET),d=new Date,u=new Date(d.getTime()+1440*60*1e3);i=(await l.listEvents("primary",{timeMin:d.toISOString(),timeMax:u.toISOString(),maxResults:20})).map(g=>({summary:g.summary,description:g.description,location:g.location}))}catch{}for(const l of s){let d=!1,u="";switch(l.type){case"email_content":{const h=await Mn(l,o);d=h.matched,u=h.content||"";break}case"calendar_event":{const h=await jn(l,i);d=h.matched,u=h.content||"";break}case"time_based":{d=Bn(l,new Date,t.timezone||"Asia/Kolkata"),u=`Time trigger: ${l.conditions.time}`;break}}d&&(await e.prepare(`
        UPDATE proactive_triggers 
        SET last_triggered = CURRENT_TIMESTAMP, trigger_count = trigger_count + 1
        WHERE id = ?
      `).bind(l.id).run(),a.push({triggered:!0,trigger_id:l.id,trigger_name:l.name,matched_content:u,timestamp:new Date().toISOString()}))}return a}async function Un(e,t,r,a){const n=r.actions;if(n.log&&await e.prepare(`
      INSERT INTO notifications (user_id, type, title, body, source)
      VALUES (?, 'info', ?, ?, ?)
    `).bind(t.id,`Trigger: ${r.name}`,a,`trigger:${r.id}`).run(),n.telegram&&t.telegram_chat_id)try{const s=await e.prepare(`
        SELECT c.encrypted_value, u.pin_hash FROM credentials c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.user_id = ? AND c.service = 'telegram_bot_token'
      `).bind(t.id).first();if(s){const o=await $(s.encrypted_value,s.pin_hash),i=`🔔 *Trigger Alert: ${r.name}*

${a}`;await fetch(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:i,parse_mode:"Markdown"})})}}catch{}if(n.webhook_url)try{await fetch(n.webhook_url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({trigger_id:r.id,trigger_name:r.name,matched_content:a,timestamp:new Date().toISOString(),user_id:t.id})})}catch{}}async function Gn(e,t,r){var i;const a=[],n=new Date,s=new Date(n.getTime()+1800*1e3),o=new Date(n.getTime()+2100*1e3);try{const d=await new Qe(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET).listEvents("primary",{timeMin:s.toISOString(),timeMax:o.toISOString(),maxResults:10});for(const u of d){const h=u.start.dateTime||u.start.date;if(!h)continue;const g=new Date(h),f=Math.round((g.getTime()-n.getTime())/(60*1e3));await e.prepare(`
        SELECT id FROM meeting_reminders 
        WHERE user_id = ? AND event_id = ? AND event_source = 'google' AND reminder_type = '30min'
      `).bind(t.id,u.id).first()||a.push({eventId:u.id||"",title:u.summary,startTime:h,location:u.location,attendees:(i=u.attendees)==null?void 0:i.map(_=>_.displayName||_.email),source:"google",minutesUntil:f})}}catch{}return a}async function Hn(e,t,r){var n;await e.prepare(`
    INSERT OR IGNORE INTO meeting_reminders (user_id, event_id, event_source, reminder_type)
    VALUES (?, ?, ?, '30min')
  `).bind(t.id,r.eventId,r.source).run();const a=[`🗓 *${r.title}*`,`⏰ In ${r.minutesUntil} minutes`,r.location?`📍 ${r.location}`:"",(n=r.attendees)!=null&&n.length?`👥 ${r.attendees.slice(0,3).join(", ")}`:""].filter(Boolean).join(`
`);if(await e.prepare(`
    INSERT INTO notifications (user_id, type, title, body, source)
    VALUES (?, 'reminder', 'Meeting in 30 minutes', ?, ?)
  `).bind(t.id,a,`calendar:${r.eventId}`).run(),t.telegram_chat_id)try{const s=await e.prepare(`
        SELECT c.encrypted_value, u.pin_hash FROM credentials c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.user_id = ? AND c.service = 'telegram_bot_token'
      `).bind(t.id).first();if(s){const o=await $(s.encrypted_value,s.pin_hash);await fetch(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:`⏰ *Meeting Reminder*

${a}`,parse_mode:"Markdown"})})}}catch{}}async function Fn(e,t){const r=await e.prepare(`
    SELECT pattern_type, data_json, confidence FROM pattern_data WHERE user_id = ?
  `).bind(t).all(),a={};for(const n of r.results||[])a[n.pattern_type]={data:JSON.parse(n.data_json),confidence:n.confidence};return a}const P=new he;async function zn(e,t){var n;if(e.req.path.includes("/cron/"))return t();const r=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",r),await t()}P.use("/*",zn);P.get("/briefings",async e=>{const t=e.get("user"),r=parseInt(e.req.query("limit")||"10");try{const a=await Rn(e.env.DB,t.id,r);return e.json({briefings:a})}catch(a){return e.json({error:a.message},500)}});P.get("/briefings/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));try{const a=await On(e.env.DB,t.id,r);return a?e.json(a):e.json({error:"Briefing not found"},404)}catch(a){return e.json({error:a.message},500)}});P.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),a=parseInt(e.req.param("itemId"));try{const n=await Cn(e.env.DB,t.id,r,a);return n?e.json(n):e.json({error:"Item not found"},404)}catch(n){return e.json({error:n.message},500)}});P.post("/briefings/generate",async e=>{const t=e.get("user");try{const r=await jr(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(r)}catch(r){return e.json({error:r.message},500)}});P.get("/briefing-preferences",async e=>{const t=e.get("user");try{const r=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!r){const n={briefingTime:"20:00",components:{google_calendar:!0,outlook_calendar:!0,gmail:!0,outlook_email:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:n})}const a={briefingTime:r.briefing_time,components:JSON.parse(r.components),newsTopics:r.news_topics.split(",").map(n=>n.trim()).filter(Boolean),notificationChannels:JSON.parse(r.notification_channels),proactiveLevel:r.proactive_level};return e.json({preferences:a})}catch(r){return e.json({error:r.message},500)}});P.post("/briefing-preferences",async e=>{const t=e.get("user"),r=await e.req.json(),a=[];if(r.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(r.briefingTime)||a.push("Invalid time format. Use HH:MM (e.g., 20:00)")),r.newsTopics&&(r.newsTopics.length>5&&a.push("Maximum 5 news topics allowed"),r.newsTopics.some(n=>n.length>50)&&a.push("Each news topic must be 50 characters or less")),r.proactiveLevel&&!["conservative","moderate","aggressive"].includes(r.proactiveLevel)&&a.push("Invalid proactive level. Use conservative, moderate, or aggressive"),a.length>0)return e.json({error:a.join("; ")},400);try{const n=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),s=r.components?JSON.stringify(r.components):null,o=r.notificationChannels?JSON.stringify(r.notificationChannels):null,i=r.newsTopics?r.newsTopics.join(", "):null;if(n){const l=[],d=[];r.briefingTime!==void 0&&(l.push("briefing_time = ?"),d.push(r.briefingTime)),s!==null&&(l.push("components = ?"),d.push(s)),i!==null&&(l.push("news_topics = ?"),d.push(i)),o!==null&&(l.push("notification_channels = ?"),d.push(o)),r.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),d.push(r.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),d.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...d).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,r.briefingTime||"20:00",s||'{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}',i||"AI, LLM, Tools, Agentic Workflows, AI Features",o||'{"telegram":true,"web":true}',r.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(n){return e.json({error:n.message},500)}});P.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(r){return e.json({error:r.message},500)}});P.get("/triggers",async e=>{const t=e.get("user");try{const r=await Pr(e.env.DB,t.id);return e.json({triggers:r})}catch(r){return e.json({error:r.message},500)}});P.get("/triggers/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));try{const a=await Br(e.env.DB,t.id,r);return a?e.json({trigger:a}):e.json({error:"Trigger not found"},404)}catch(a){return e.json({error:a.message},500)}});P.post("/triggers",async e=>{const t=e.get("user"),r=await e.req.json();if(!r.name||!r.type)return e.json({error:"Name and type are required"},400);try{const a=await xt(e.env.DB,t.id,r.name,r.type,r.conditions||{},r.actions||{notify:!0,log:!0});return e.json({id:a,success:!0})}catch(a){return e.json({error:a.message},500)}});P.put("/triggers/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),a=await e.req.json();try{const n=await Nn(e.env.DB,t.id,r,a);return e.json({success:n})}catch(n){return e.json({error:n.message},500)}});P.delete("/triggers/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));try{const a=await Ln(e.env.DB,t.id,r);return e.json({success:a})}catch(a){return e.json({error:a.message},500)}});P.post("/triggers/init-defaults",async e=>{const t=e.get("user");try{return await $n(e.env.DB,t.id),e.json({success:!0,message:"Default triggers created"})}catch(r){return e.json({error:r.message},500)}});P.get("/patterns",async e=>{const t=e.get("user");try{const r=await Fn(e.env.DB,t.id);return e.json({patterns:r})}catch(r){return e.json({error:r.message},500)}});P.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);try{const a=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),n=[],s=new Date;for(const o of a.results||[]){const i=o.timezone||"Asia/Kolkata",l=o.briefing_time||"20:00";if(Dn(l,i,s))try{const d=await jr(e.env.DB,o,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});if(o.telegram_chat_id){const{text:u,inlineKeyboard:h}=An(d.content,d.items);await qn(e.env.DB,o,u,h,d.briefingId)}n.push({user_id:o.id,status:"success",briefing_id:d.briefingId,briefing_time:l,timezone:i})}catch(d){n.push({user_id:o.id,status:"error",error:d.message})}}return e.json({executed:n.length,results:n})}catch(a){return e.json({error:a.message},500)}});P.post("/cron/evaluate-triggers",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);try{const a=await e.env.DB.prepare("SELECT * FROM users").all(),n=[];for(const s of a.results||[])try{const o=await Pn(e.env.DB,s,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});for(const i of o){const l=await Br(e.env.DB,s.id,i.trigger_id);l&&await Un(e.env.DB,s,l,i.matched_content||"")}n.push({user_id:s.id,triggered_count:o.length})}catch(o){n.push({user_id:s.id,status:"error",error:o.message})}return e.json({executed:n.length,results:n})}catch(a){return e.json({error:a.message},500)}});P.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);try{const a=await e.env.DB.prepare("SELECT * FROM users").all(),n=[];for(const s of a.results||[])try{const o=await Gn(e.env.DB,s,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});for(const i of o)await Hn(e.env.DB,s,i);n.push({user_id:s.id,reminders_sent:o.length})}catch(o){n.push({user_id:s.id,status:"error",error:o.message})}return e.json({executed:n.length,results:n})}catch(a){return e.json({error:a.message},500)}});async function qn(e,t,r,a,n){try{const s=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!s)return;const o=await $(s.encrypted_value,s.pin_hash);await fetch(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:`🌙 *Evening Briefing*

${r}`,parse_mode:"Markdown",reply_markup:{inline_keyboard:a.map(i=>i.map(l=>({...l,callback_data:`${l.callback_data}:${n}`})))}})}),await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(n).run()}catch(s){console.error("Telegram briefing error:",s.message)}}const Y=new he;Y.use("/api/*",Ea());Y.route("/api/auth",ge);Y.route("/api/chat",M);Y.route("/api/settings",N);Y.route("/api/system",je);Y.route("/api/telegram",et);Y.route("/api/proactive",P);Y.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),r=t.searchParams.get("code"),a=t.searchParams.get("state"),n=t.searchParams.get("error");if(n)return e.html(ke(!1,`Google denied access: ${n}`));if(!r||!a)return e.html(ke(!1,"Missing authorization code or state parameter."));try{const o=JSON.parse(atob(a)).sessionId;if(!o)return e.html(ke(!1,"Invalid state parameter — missing session."));const i=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(o).first();if(!i)return e.html(ke(!1,"Session expired. Please log in again and retry."));const l=i.user_id,d=i.pin_hash,u=`${t.protocol}//${t.host}/auth/google/callback`,h=await Sr(e.env.DB,l,d,r,u,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(ke(!0,`Connected as ${h.email}`,h.email))}catch(s){return e.html(ke(!1,`OAuth failed: ${s.message}`))}});Y.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(pr())));Y.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(pr())));function ke(e,t,r){return`<!DOCTYPE html>
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
  ${r?'<p class="email">'+r+"</p>":""}
  <a href="/" class="btn">Back to Karna</a>
</div>
<script>
  // Notify the opener window if this was opened in a popup
  if (window.opener) {
    window.opener.postMessage({ type: 'google_oauth_complete', success: ${e}, email: '${r||""}' }, '*');
    setTimeout(function() { window.close(); }, 2000);
  }
<\/script>
</body></html>`}async function Wn(e,t,r){const a="https://karna-5xs.pages.dev",s={"Content-Type":"application/json","X-Cron-Secret":t.CRON_SECRET||"karna-cron-default-v1"};try{const i=await(await fetch(`${a}/api/system/cron/execute`,{method:"POST",headers:s})).json();if(i.results&&i.results.length>0){const u=i.results.filter(g=>g.needs_agent&&g.status==="dispatched");if(u.length>0){const g=u.map(f=>fetch(`${a}/api/system/cron/run-task/${f.job_id}`,{method:"POST",headers:s}).then(y=>y.json()).catch(y=>({job_id:f.job_id,error:y.message})));r.waitUntil(Promise.allSettled(g).then(f=>{console.log(`Cron: ${i.executed} dispatched, ${u.length} agent tasks`,JSON.stringify(f.map(y=>y.status==="fulfilled"?y.value:y.reason)))}))}const h=i.results.filter(g=>!g.needs_agent&&g.status==="dispatched");if(h.length>0){const g=h.map(f=>fetch(`${a}/api/system/cron/run-task/${f.job_id}`,{method:"POST",headers:s}).catch(()=>{}));r.waitUntil(Promise.allSettled(g))}}r.waitUntil(fetch(`${a}/api/proactive/cron/evening-briefing`,{method:"POST",headers:s}).then(u=>u.json()).then(u=>{u.executed>0&&console.log("Evening briefing result:",JSON.stringify(u))}).catch(u=>{console.error("Evening briefing error:",u.message)}));const d=new Date().getMinutes();d%15<2&&r.waitUntil(fetch(`${a}/api/proactive/cron/evaluate-triggers`,{method:"POST",headers:s}).then(u=>u.json()).then(u=>{var h;(h=u.results)!=null&&h.some(g=>g.triggered_count>0)&&console.log("Triggers evaluated:",JSON.stringify(u))}).catch(()=>{})),d%5<2&&r.waitUntil(fetch(`${a}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:s}).then(u=>u.json()).then(u=>{var h;(h=u.results)!=null&&h.some(g=>g.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(u))}).catch(()=>{}))}catch(o){console.error("Scheduled cron error:",o.message||o)}}const Kn={fetch:Y.fetch,scheduled:Wn},zt=new he,Jn=Object.assign({"/src/index.tsx":Kn});let Ur=!1;for(const[,e]of Object.entries(Jn))e&&(zt.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),zt.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Ur=!0);if(!Ur)throw new Error("Can't import modules from ['/src/index.tsx']");export{zt as default};
