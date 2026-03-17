var lr=Object.defineProperty;var Ht=e=>{throw TypeError(e)};var cr=(e,t,a)=>t in e?lr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var O=(e,t,a)=>cr(e,typeof t!="symbol"?t+"":t,a),Et=(e,t,a)=>t.has(e)||Ht("Cannot "+a);var w=(e,t,a)=>(Et(e,t,"read from private field"),a?a.call(e):t.get(e)),A=(e,t,a)=>t.has(e)?Ht("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),D=(e,t,a,r)=>(Et(e,t,"write to private field"),r?r.call(e,a):t.set(e,a),a),B=(e,t,a)=>(Et(e,t,"access private method"),a);var Gt=(e,t,a,r)=>({set _(s){D(e,t,s,a)},get _(){return w(e,t,r)}});var Ft=(e,t,a)=>(r,s)=>{let n=-1;return o(0);async function o(i){if(i<=n)throw new Error("next() called multiple times");n=i;let c,l=!1,d;if(e[i]?(d=e[i][0][0],r.req.routeIndex=i):d=i===e.length&&s||void 0,d)try{c=await d(r,()=>o(i+1))}catch(p){if(p instanceof Error&&t)r.error=p,c=await t(p,r),l=!0;else throw p}else r.finalized===!1&&a&&(c=await a(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},dr=Symbol(),ur=async(e,t=Object.create(null))=>{const{all:a=!1,dot:r=!1}=t,n=(e instanceof ha?e.raw.headers:e.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?mr(e,{all:a,dot:r}):{}};async function mr(e,t){const a=await e.formData();return a?pr(a,t):{}}function pr(e,t){const a=Object.create(null);return e.forEach((r,s)=>{t.all||s.endsWith("[]")?hr(a,s,r):a[s]=r}),t.dot&&Object.entries(a).forEach(([r,s])=>{r.includes(".")&&(gr(a,r,s),delete a[r])}),a}var hr=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},gr=(e,t,a)=>{let r=e;const s=t.split(".");s.forEach((n,o)=>{o===s.length-1?r[n]=a:((!r[n]||typeof r[n]!="object"||Array.isArray(r[n])||r[n]instanceof File)&&(r[n]=Object.create(null)),r=r[n])})},ca=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},fr=e=>{const{groups:t,path:a}=yr(e),r=ca(a);return vr(r,t)},yr=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,r)=>{const s=`@${r}`;return t.push([s,a]),s}),{groups:t,path:e}},vr=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[r]=t[a];for(let s=e.length-1;s>=0;s--)if(e[s].includes(r)){e[s]=e[s].replace(r,t[a][1]);break}}return e},it={},wr=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const r=`${e}#${t}`;return it[r]||(a[2]?it[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:it[r]=[e,a[1],!0]),it[r]}return null},Mt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},br=e=>Mt(e,decodeURI),da=e=>{const t=e.url,a=t.indexOf("/",t.indexOf(":")+4);let r=a;for(;r<t.length;r++){const s=t.charCodeAt(r);if(s===37){const n=t.indexOf("?",r),o=t.indexOf("#",r),i=n===-1?o===-1?void 0:o:o===-1?n:Math.min(n,o),c=t.slice(a,i);return br(c.includes("%25")?c.replace(/%25/g,"%2525"):c)}else if(s===63||s===35)break}return t.slice(a,r)},_r=e=>{const t=da(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Le=(e,t,...a)=>(a.length&&(t=Le(t,...a)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),ua=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let r="";return t.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){a.length===0&&r===""?a.push("/"):a.push(r);const n=s.replace("?","");r+="/"+n,a.push(r)}else r+="/"+s}),a.filter((s,n,o)=>o.indexOf(s)===n)},Tt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Mt(e,pa):e):e,ma=(e,t,a)=>{let r;if(!a&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const i=e.charCodeAt(o+t.length+1);if(i===61){const c=o+t.length+2,l=e.indexOf("&",c);return Tt(e.slice(c,l===-1?void 0:l))}else if(i==38||isNaN(i))return"";o=e.indexOf(`&${t}`,o+1)}if(r=/[%+]/.test(e),!r)return}const s={};r??(r=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const o=e.indexOf("&",n+1);let i=e.indexOf("=",n);i>o&&o!==-1&&(i=-1);let c=e.slice(n+1,i===-1?o===-1?void 0:o:i);if(r&&(c=Tt(c)),n=o,c==="")continue;let l;i===-1?l="":(l=e.slice(i+1,o===-1?void 0:o),r&&(l=Tt(l))),a?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(l)):s[c]??(s[c]=l)}return t?s[t]:s},Er=ma,Tr=(e,t)=>ma(e,t,!0),pa=decodeURIComponent,Wt=e=>Mt(e,pa),je,V,me,ga,fa,Ct,he,ra,ha=(ra=class{constructor(e,t="/",a=[[]]){A(this,me);O(this,"raw");A(this,je);A(this,V);O(this,"routeIndex",0);O(this,"path");O(this,"bodyCache",{});A(this,he,e=>{const{bodyCache:t,raw:a}=this,r=t[e];if(r)return r;const s=Object.keys(t)[0];return s?t[s].then(n=>(s==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=a[e]()});this.raw=e,this.path=t,D(this,V,a),D(this,je,{})}param(e){return e?B(this,me,ga).call(this,e):B(this,me,fa).call(this)}query(e){return Er(this.url,e)}queries(e){return Tr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,r)=>{t[r]=a}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await ur(this,e))}json(){return w(this,he).call(this,"text").then(e=>JSON.parse(e))}text(){return w(this,he).call(this,"text")}arrayBuffer(){return w(this,he).call(this,"arrayBuffer")}blob(){return w(this,he).call(this,"blob")}formData(){return w(this,he).call(this,"formData")}addValidatedData(e,t){w(this,je)[e]=t}valid(e){return w(this,je)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[dr](){return w(this,V)}get matchedRoutes(){return w(this,V)[0].map(([[,e]])=>e)}get routePath(){return w(this,V)[0].map(([[,e]])=>e)[this.routeIndex].path}},je=new WeakMap,V=new WeakMap,me=new WeakSet,ga=function(e){const t=w(this,V)[0][this.routeIndex][1][e],a=B(this,me,Ct).call(this,t);return a&&/\%/.test(a)?Wt(a):a},fa=function(){const e={},t=Object.keys(w(this,V)[0][this.routeIndex][1]);for(const a of t){const r=B(this,me,Ct).call(this,w(this,V)[0][this.routeIndex][1][a]);r!==void 0&&(e[a]=/\%/.test(r)?Wt(r):r)}return e},Ct=function(e){return w(this,V)[1]?w(this,V)[1][e]:e},he=new WeakMap,ra),xr={Stringify:1},ya=async(e,t,a,r,s)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(s?s[0]+=e:s=[e],Promise.all(n.map(i=>i({phase:t,buffer:s,context:r}))).then(i=>Promise.all(i.filter(Boolean).map(c=>ya(c,t,!1,r,s))).then(()=>s[0]))):Promise.resolve(e)},kr="text/plain; charset=UTF-8",xt=(e,t)=>({"Content-Type":e,...t}),Qe,et,le,Pe,ce,Y,tt,Ue,He,xe,at,rt,ge,Me,sa,Sr=(sa=class{constructor(e,t){A(this,ge);A(this,Qe);A(this,et);O(this,"env",{});A(this,le);O(this,"finalized",!1);O(this,"error");A(this,Pe);A(this,ce);A(this,Y);A(this,tt);A(this,Ue);A(this,He);A(this,xe);A(this,at);A(this,rt);O(this,"render",(...e)=>(w(this,Ue)??D(this,Ue,t=>this.html(t)),w(this,Ue).call(this,...e)));O(this,"setLayout",e=>D(this,tt,e));O(this,"getLayout",()=>w(this,tt));O(this,"setRenderer",e=>{D(this,Ue,e)});O(this,"header",(e,t,a)=>{this.finalized&&D(this,Y,new Response(w(this,Y).body,w(this,Y)));const r=w(this,Y)?w(this,Y).headers:w(this,xe)??D(this,xe,new Headers);t===void 0?r.delete(e):a!=null&&a.append?r.append(e,t):r.set(e,t)});O(this,"status",e=>{D(this,Pe,e)});O(this,"set",(e,t)=>{w(this,le)??D(this,le,new Map),w(this,le).set(e,t)});O(this,"get",e=>w(this,le)?w(this,le).get(e):void 0);O(this,"newResponse",(...e)=>B(this,ge,Me).call(this,...e));O(this,"body",(e,t,a)=>B(this,ge,Me).call(this,e,t,a));O(this,"text",(e,t,a)=>!w(this,xe)&&!w(this,Pe)&&!t&&!a&&!this.finalized?new Response(e):B(this,ge,Me).call(this,e,t,xt(kr,a)));O(this,"json",(e,t,a)=>B(this,ge,Me).call(this,JSON.stringify(e),t,xt("application/json",a)));O(this,"html",(e,t,a)=>{const r=s=>B(this,ge,Me).call(this,s,t,xt("text/html; charset=UTF-8",a));return typeof e=="object"?ya(e,xr.Stringify,!1,{}).then(r):r(e)});O(this,"redirect",(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)});O(this,"notFound",()=>(w(this,He)??D(this,He,()=>new Response),w(this,He).call(this,this)));D(this,Qe,e),t&&(D(this,ce,t.executionCtx),this.env=t.env,D(this,He,t.notFoundHandler),D(this,rt,t.path),D(this,at,t.matchResult))}get req(){return w(this,et)??D(this,et,new ha(w(this,Qe),w(this,rt),w(this,at))),w(this,et)}get event(){if(w(this,ce)&&"respondWith"in w(this,ce))return w(this,ce);throw Error("This context has no FetchEvent")}get executionCtx(){if(w(this,ce))return w(this,ce);throw Error("This context has no ExecutionContext")}get res(){return w(this,Y)||D(this,Y,new Response(null,{headers:w(this,xe)??D(this,xe,new Headers)}))}set res(e){if(w(this,Y)&&e){e=new Response(e.body,e);for(const[t,a]of w(this,Y).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=w(this,Y).headers.getSetCookie();e.headers.delete("set-cookie");for(const s of r)e.headers.append("set-cookie",s)}else e.headers.set(t,a)}D(this,Y,e),this.finalized=!0}get var(){return w(this,le)?Object.fromEntries(w(this,le)):{}}},Qe=new WeakMap,et=new WeakMap,le=new WeakMap,Pe=new WeakMap,ce=new WeakMap,Y=new WeakMap,tt=new WeakMap,Ue=new WeakMap,He=new WeakMap,xe=new WeakMap,at=new WeakMap,rt=new WeakMap,ge=new WeakSet,Me=function(e,t,a){const r=w(this,Y)?new Headers(w(this,Y).headers):w(this,xe)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,i]of n)o.toLowerCase()==="set-cookie"?r.append(o,i):r.set(o,i)}if(a)for(const[n,o]of Object.entries(a))if(typeof o=="string")r.set(n,o);else{r.delete(n);for(const i of o)r.append(n,i)}const s=typeof t=="number"?t:(t==null?void 0:t.status)??w(this,Pe);return new Response(e,{status:s,headers:r})},sa),F="ALL",Ir="all",Or=["get","post","put","delete","options","patch"],va="Can not add a route since the matcher is already built.",wa=class extends Error{},Cr="__COMPOSED_HANDLER",Rr=e=>e.text("404 Not Found",404),zt=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},Z,W,ba,Q,Ee,dt,ut,Ge,Dr=(Ge=class{constructor(t={}){A(this,W);O(this,"get");O(this,"post");O(this,"put");O(this,"delete");O(this,"options");O(this,"patch");O(this,"all");O(this,"on");O(this,"use");O(this,"router");O(this,"getPath");O(this,"_basePath","/");A(this,Z,"/");O(this,"routes",[]);A(this,Q,Rr);O(this,"errorHandler",zt);O(this,"onError",t=>(this.errorHandler=t,this));O(this,"notFound",t=>(D(this,Q,t),this));O(this,"fetch",(t,...a)=>B(this,W,ut).call(this,t,a[1],a[0],t.method));O(this,"request",(t,a,r,s)=>t instanceof Request?this.fetch(a?new Request(t,a):t,r,s):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Le("/",t)}`,a),r,s)));O(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(B(this,W,ut).call(this,t.request,t,void 0,t.request.method))})});[...Or,Ir].forEach(n=>{this[n]=(o,...i)=>(typeof o=="string"?D(this,Z,o):B(this,W,Ee).call(this,n,w(this,Z),o),i.forEach(c=>{B(this,W,Ee).call(this,n,w(this,Z),c)}),this)}),this.on=(n,o,...i)=>{for(const c of[o].flat()){D(this,Z,c);for(const l of[n].flat())i.map(d=>{B(this,W,Ee).call(this,l.toUpperCase(),w(this,Z),d)})}return this},this.use=(n,...o)=>(typeof n=="string"?D(this,Z,n):(D(this,Z,"*"),o.unshift(n)),o.forEach(i=>{B(this,W,Ee).call(this,F,w(this,Z),i)}),this);const{strict:r,...s}=t;Object.assign(this,s),this.getPath=r??!0?t.getPath??da:_r}route(t,a){const r=this.basePath(t);return a.routes.map(s=>{var o;let n;a.errorHandler===zt?n=s.handler:(n=async(i,c)=>(await Ft([],a.errorHandler)(i,()=>s.handler(i,c))).res,n[Cr]=s.handler),B(o=r,W,Ee).call(o,s.method,s.path,n)}),this}basePath(t){const a=B(this,W,ba).call(this);return a._basePath=Le(this._basePath,t),a}mount(t,a,r){let s,n;r&&(typeof r=="function"?n=r:(n=r.optionHandler,r.replaceRequest===!1?s=c=>c:s=r.replaceRequest));const o=n?c=>{const l=n(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};s||(s=(()=>{const c=Le(this._basePath,t),l=c==="/"?0:c.length;return d=>{const p=new URL(d.url);return p.pathname=p.pathname.slice(l)||"/",new Request(p,d)}})());const i=async(c,l)=>{const d=await a(s(c.req.raw),...o(c));if(d)return d;await l()};return B(this,W,Ee).call(this,F,Le(t,"*"),i),this}},Z=new WeakMap,W=new WeakSet,ba=function(){const t=new Ge({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,D(t,Q,w(this,Q)),t.routes=this.routes,t},Q=new WeakMap,Ee=function(t,a,r){t=t.toUpperCase(),a=Le(this._basePath,a);const s={basePath:this._basePath,path:a,method:t,handler:r};this.router.add(t,a,[r,s]),this.routes.push(s)},dt=function(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t},ut=function(t,a,r,s){if(s==="HEAD")return(async()=>new Response(null,await B(this,W,ut).call(this,t,a,r,"GET")))();const n=this.getPath(t,{env:r}),o=this.router.match(s,n),i=new Sr(t,{path:n,matchResult:o,env:r,executionCtx:a,notFoundHandler:w(this,Q)});if(o[0].length===1){let l;try{l=o[0][0][0][0](i,async()=>{i.res=await w(this,Q).call(this,i)})}catch(d){return B(this,W,dt).call(this,d,i)}return l instanceof Promise?l.then(d=>d||(i.finalized?i.res:w(this,Q).call(this,i))).catch(d=>B(this,W,dt).call(this,d,i)):l??w(this,Q).call(this,i)}const c=Ft(o[0],this.errorHandler,w(this,Q));return(async()=>{try{const l=await c(i);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return B(this,W,dt).call(this,l,i)}})()},Ge),_a=[];function Nr(e,t){const a=this.buildAllMatchers(),r=((s,n)=>{const o=a[s]||a[F],i=o[2][n];if(i)return i;const c=n.match(o[0]);if(!c)return[[],_a];const l=c.indexOf("",1);return[o[1][l],c]});return this.match=r,r(e,t)}var pt="[^/]+",Ve=".*",Xe="(?:|/.*)",$e=Symbol(),Ar=new Set(".\\+*[^]$()");function Lr(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ve||e===Xe?1:t===Ve||t===Xe?-1:e===pt?1:t===pt?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var ke,Se,ee,Ce,Mr=(Ce=class{constructor(){A(this,ke);A(this,Se);A(this,ee,Object.create(null))}insert(t,a,r,s,n){if(t.length===0){if(w(this,ke)!==void 0)throw $e;if(n)return;D(this,ke,a);return}const[o,...i]=t,c=o==="*"?i.length===0?["","",Ve]:["","",pt]:o==="/*"?["","",Xe]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const d=c[1];let p=c[2]||pt;if(d&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw $e;if(l=w(this,ee)[p],!l){if(Object.keys(w(this,ee)).some(g=>g!==Ve&&g!==Xe))throw $e;if(n)return;l=w(this,ee)[p]=new Ce,d!==""&&D(l,Se,s.varIndex++)}!n&&d!==""&&r.push([d,w(l,Se)])}else if(l=w(this,ee)[o],!l){if(Object.keys(w(this,ee)).some(d=>d.length>1&&d!==Ve&&d!==Xe))throw $e;if(n)return;l=w(this,ee)[o]=new Ce}l.insert(i,a,r,s,n)}buildRegExpStr(){const a=Object.keys(w(this,ee)).sort(Lr).map(r=>{const s=w(this,ee)[r];return(typeof w(s,Se)=="number"?`(${r})@${w(s,Se)}`:Ar.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof w(this,ke)=="number"&&a.unshift(`#${w(this,ke)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},ke=new WeakMap,Se=new WeakMap,ee=new WeakMap,Ce),gt,st,na,$r=(na=class{constructor(){A(this,gt,{varIndex:0});A(this,st,new Mr)}insert(e,t,a){const r=[],s=[];for(let o=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${o}`;return s[o]=[l,c],o++,i=!0,l}),!i)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=s.length-1;o>=0;o--){const[i]=s[o];for(let c=n.length-1;c>=0;c--)if(n[c].indexOf(i)!==-1){n[c]=n[c].replace(i,s[o][1]);break}}return w(this,st).insert(n,t,r,w(this,gt),a),r}buildRegExp(){let e=w(this,st).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,n,o)=>n!==void 0?(a[++t]=Number(n),"$()"):(o!==void 0&&(r[Number(o)]=++t),"")),[new RegExp(`^${e}`),a,r]}},gt=new WeakMap,st=new WeakMap,na),Br=[/^$/,[],Object.create(null)],mt=Object.create(null);function Ea(e){return mt[e]??(mt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function jr(){mt=Object.create(null)}function Pr(e){var l;const t=new $r,a=[];if(e.length===0)return Br;const r=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,p],[g,v])=>d?1:g?-1:p.length-v.length),s=Object.create(null);for(let d=0,p=-1,g=r.length;d<g;d++){const[v,f,E]=r[d];v?s[f]=[E.map(([T])=>[T,Object.create(null)]),_a]:p++;let b;try{b=t.insert(f,p,v)}catch(T){throw T===$e?new wa(f):T}v||(a[p]=E.map(([T,u])=>{const h=Object.create(null);for(u-=1;u>=0;u--){const[m,y]=b[u];h[m]=y}return[T,h]}))}const[n,o,i]=t.buildRegExp();for(let d=0,p=a.length;d<p;d++)for(let g=0,v=a[d].length;g<v;g++){const f=(l=a[d][g])==null?void 0:l[1];if(!f)continue;const E=Object.keys(f);for(let b=0,T=E.length;b<T;b++)f[E[b]]=i[f[E[b]]]}const c=[];for(const d in o)c[d]=a[o[d]];return[n,c,s]}function Ne(e,t){if(e){for(const a of Object.keys(e).sort((r,s)=>s.length-r.length))if(Ea(a).test(t))return[...e[a]]}}var fe,ye,ft,Ta,oa,Ur=(oa=class{constructor(){A(this,ft);O(this,"name","RegExpRouter");A(this,fe);A(this,ye);O(this,"match",Nr);D(this,fe,{[F]:Object.create(null)}),D(this,ye,{[F]:Object.create(null)})}add(e,t,a){var i;const r=w(this,fe),s=w(this,ye);if(!r||!s)throw new Error(va);r[e]||[r,s].forEach(c=>{c[e]=Object.create(null),Object.keys(c[F]).forEach(l=>{c[e][l]=[...c[F][l]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=Ea(t);e===F?Object.keys(r).forEach(l=>{var d;(d=r[l])[t]||(d[t]=Ne(r[l],t)||Ne(r[F],t)||[])}):(i=r[e])[t]||(i[t]=Ne(r[e],t)||Ne(r[F],t)||[]),Object.keys(r).forEach(l=>{(e===F||e===l)&&Object.keys(r[l]).forEach(d=>{c.test(d)&&r[l][d].push([a,n])})}),Object.keys(s).forEach(l=>{(e===F||e===l)&&Object.keys(s[l]).forEach(d=>c.test(d)&&s[l][d].push([a,n]))});return}const o=ua(t)||[t];for(let c=0,l=o.length;c<l;c++){const d=o[c];Object.keys(s).forEach(p=>{var g;(e===F||e===p)&&((g=s[p])[d]||(g[d]=[...Ne(r[p],d)||Ne(r[F],d)||[]]),s[p][d].push([a,n-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(w(this,ye)).concat(Object.keys(w(this,fe))).forEach(t=>{e[t]||(e[t]=B(this,ft,Ta).call(this,t))}),D(this,fe,D(this,ye,void 0)),jr(),e}},fe=new WeakMap,ye=new WeakMap,ft=new WeakSet,Ta=function(e){const t=[];let a=e===F;return[w(this,fe),w(this,ye)].forEach(r=>{const s=r[e]?Object.keys(r[e]).map(n=>[n,r[e][n]]):[];s.length!==0?(a||(a=!0),t.push(...s)):e!==F&&t.push(...Object.keys(r[F]).map(n=>[n,r[F][n]]))}),a?Pr(t):null},oa),ve,de,ia,Hr=(ia=class{constructor(e){O(this,"name","SmartRouter");A(this,ve,[]);A(this,de,[]);D(this,ve,e.routers)}add(e,t,a){if(!w(this,de))throw new Error(va);w(this,de).push([e,t,a])}match(e,t){if(!w(this,de))throw new Error("Fatal error");const a=w(this,ve),r=w(this,de),s=a.length;let n=0,o;for(;n<s;n++){const i=a[n];try{for(let c=0,l=r.length;c<l;c++)i.add(...r[c]);o=i.match(e,t)}catch(c){if(c instanceof wa)continue;throw c}this.match=i.match.bind(i),D(this,ve,[i]),D(this,de,void 0);break}if(n===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(w(this,de)||w(this,ve).length!==1)throw new Error("No active router has been determined yet.");return w(this,ve)[0]}},ve=new WeakMap,de=new WeakMap,ia),qe=Object.create(null),we,K,Ie,Fe,q,ue,Te,We,Gr=(We=class{constructor(t,a,r){A(this,ue);A(this,we);A(this,K);A(this,Ie);A(this,Fe,0);A(this,q,qe);if(D(this,K,r||Object.create(null)),D(this,we,[]),t&&a){const s=Object.create(null);s[t]={handler:a,possibleKeys:[],score:0},D(this,we,[s])}D(this,Ie,[])}insert(t,a,r){D(this,Fe,++Gt(this,Fe)._);let s=this;const n=fr(a),o=[];for(let i=0,c=n.length;i<c;i++){const l=n[i],d=n[i+1],p=wr(l,d),g=Array.isArray(p)?p[0]:l;if(g in w(s,K)){s=w(s,K)[g],p&&o.push(p[1]);continue}w(s,K)[g]=new We,p&&(w(s,Ie).push(p),o.push(p[1])),s=w(s,K)[g]}return w(s,we).push({[t]:{handler:r,possibleKeys:o.filter((i,c,l)=>l.indexOf(i)===c),score:w(this,Fe)}}),s}search(t,a){var c;const r=[];D(this,q,qe);let n=[this];const o=ca(a),i=[];for(let l=0,d=o.length;l<d;l++){const p=o[l],g=l===d-1,v=[];for(let f=0,E=n.length;f<E;f++){const b=n[f],T=w(b,K)[p];T&&(D(T,q,w(b,q)),g?(w(T,K)["*"]&&r.push(...B(this,ue,Te).call(this,w(T,K)["*"],t,w(b,q))),r.push(...B(this,ue,Te).call(this,T,t,w(b,q)))):v.push(T));for(let u=0,h=w(b,Ie).length;u<h;u++){const m=w(b,Ie)[u],y=w(b,q)===qe?{}:{...w(b,q)};if(m==="*"){const S=w(b,K)["*"];S&&(r.push(...B(this,ue,Te).call(this,S,t,w(b,q))),D(S,q,y),v.push(S));continue}const[_,k,x]=m;if(!p&&!(x instanceof RegExp))continue;const I=w(b,K)[_],L=o.slice(l).join("/");if(x instanceof RegExp){const S=x.exec(L);if(S){if(y[k]=S[0],r.push(...B(this,ue,Te).call(this,I,t,w(b,q),y)),Object.keys(w(I,K)).length){D(I,q,y);const C=((c=S[0].match(/\//))==null?void 0:c.length)??0;(i[C]||(i[C]=[])).push(I)}continue}}(x===!0||x.test(p))&&(y[k]=p,g?(r.push(...B(this,ue,Te).call(this,I,t,y,w(b,q))),w(I,K)["*"]&&r.push(...B(this,ue,Te).call(this,w(I,K)["*"],t,y,w(b,q)))):(D(I,q,y),v.push(I)))}}n=v.concat(i.shift()??[])}return r.length>1&&r.sort((l,d)=>l.score-d.score),[r.map(({handler:l,params:d})=>[l,d])]}},we=new WeakMap,K=new WeakMap,Ie=new WeakMap,Fe=new WeakMap,q=new WeakMap,ue=new WeakSet,Te=function(t,a,r,s){const n=[];for(let o=0,i=w(t,we).length;o<i;o++){const c=w(t,we)[o],l=c[a]||c[F],d={};if(l!==void 0&&(l.params=Object.create(null),n.push(l),r!==qe||s&&s!==qe))for(let p=0,g=l.possibleKeys.length;p<g;p++){const v=l.possibleKeys[p],f=d[l.score];l.params[v]=s!=null&&s[v]&&!f?s[v]:r[v]??(s==null?void 0:s[v]),d[l.score]=!0}}return n},We),Oe,la,Fr=(la=class{constructor(){O(this,"name","TrieRouter");A(this,Oe);D(this,Oe,new Gr)}add(e,t,a){const r=ua(t);if(r){for(let s=0,n=r.length;s<n;s++)w(this,Oe).insert(e,r[s],a);return}w(this,Oe).insert(e,t,a)}match(e,t){return w(this,Oe).search(e,t)}},Oe=new WeakMap,la),be=class extends Dr{constructor(e={}){super(e),this.router=e.router??new Hr({routers:[new Ur,new Fr]})}},Wr=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},r=(n=>typeof n=="string"?n==="*"?()=>n:o=>n===o?o:null:typeof n=="function"?n:o=>n.includes(o)?o:null)(a.origin),s=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(a.allowMethods);return async function(o,i){var d;function c(p,g){o.res.headers.set(p,g)}const l=await r(o.req.header("origin")||"",o);if(l&&c("Access-Control-Allow-Origin",l),a.credentials&&c("Access-Control-Allow-Credentials","true"),(d=a.exposeHeaders)!=null&&d.length&&c("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),o.req.method==="OPTIONS"){a.origin!=="*"&&c("Vary","Origin"),a.maxAge!=null&&c("Access-Control-Max-Age",a.maxAge.toString());const p=await s(o.req.header("origin")||"",o);p.length&&c("Access-Control-Allow-Methods",p.join(","));let g=a.allowHeaders;if(!(g!=null&&g.length)){const v=o.req.header("Access-Control-Request-Headers");v&&(g=v.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await i(),a.origin!=="*"&&o.header("Vary","Origin",{append:!0})}};function xa(){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="theme-color" content="#1c2538">
  <title>Karna</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400&display=swap" rel="stylesheet">
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
            '<div class="settings-header-row">' +
              '<div class="panel-title">Settings</div>' +
              '<button class="settings-back-btn" onclick="toggleOverlay(null);state.view=\\'dashboard\\';state.activeThreadId=null;renderView();" title="Back to Dashboard">&#8592; Dashboard</button>' +
            '</div>' +
            '<div class="tabs-wrap">' +
            '<div class="tabs">' +
              '<div class="tab active" data-tab="profile">Profile</div>' +
              '<div class="tab" data-tab="credentials">Keys</div>' +
              '<div class="tab" data-tab="telegram">Telegram</div>' +
              '<div class="tab" data-tab="proactive">Proactive</div>' +
              '<div class="tab" data-tab="schedules">Tasks</div>' +
              '<div class="tab" data-tab="memory">Memory</div>' +
              '<div class="tab" data-tab="health">Health</div>' +
              '<div class="tab" data-tab="errors">Errors</div>' +
            '</div></div>' +
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

      // drops removed
      // Drop data: [widthPx, heightPx, top%, right%]
      // drops removed
      var html = '<div class="dash-greeting">' + greeting + (userName ? ', ' + escapeHtml(userName.split(' ')[0]) : '') + '</div>' +
        '<div class="dash-subtitle">Here\\u2019s what\\u2019s happening with ' + escapeHtml(state.assistantName || 'Karna') + '</div>';

      // Status cards — each card navigates to its feature
      html += '<div class="dash-cards">';
      html += '<div class="dash-card" onclick="showConversations()"><div class="dash-card-icon">&#128172;</div><div class="dash-card-value">' + (data.threads || 0) + '</div><div class="dash-card-label">Conversations</div></div>';
      html += '<div class="dash-card" onclick="viewTasksModal()"><div class="dash-card-icon">&#9200;</div><div class="dash-card-value">' + (data.active_schedules || 0) + '</div><div class="dash-card-label">Active Tasks</div></div>';
      html += '<div class="dash-card" onclick="viewMemoryModal()"><div class="dash-card-icon">&#129504;</div><div class="dash-card-value">' + (data.memories || 0) + '</div><div class="dash-card-label">Memories</div></div>';
      html += '<div class="dash-card" id="dashGmailCard" onclick="dashGmailClick()"><div class="dash-card-icon">&#9993;</div><div class="dash-card-value" id="dashGmailCount"><span style=\\'color:var(--text-muted);font-size:13px;\\'>...</span></div><div class="dash-card-label">Unread Gmail</div></div>';
      if (data.errors > 0) {
        html += '<div class="dash-card dash-card-error" onclick="toggleOverlay(\\'settingsOverlay\\');state.settingsTab=\\'errors\\';renderSettingsTab();"><div class="dash-card-icon">&#9888;</div><div class="dash-card-value" style="color:#e05a40;">' + data.errors + '</div><div class="dash-card-label">Errors</div></div>';
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
      html += '<div class="thread-item' + (isActive ? ' active' : '') + '" data-id="' + t.id + '" onclick="openThread(' + t.id + ',\\'' + escapeHtml(t.title).replace(/'/g, "\\\\'") + '\\')">';
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
      if (t.dataset.tab === state.settingsTab) {
        t.classList.add('active');
        // Scroll active tab into view so it's always visible (especially Memory, Health, Errors on mobile)
        setTimeout(function() { t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }, 50);
      } else { t.classList.remove('active'); }
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
        case 'health': return await renderHealthTab(content);
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
      renderSettingsTab();
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
      // Refresh wherever the briefing list is visible
      if (state.view === 'dashboard') {
        // Re-render the dashboard so the list removes the deleted item
        renderView();
      } else {
        // We're in settings — refresh the proactive tab
        state.settingsTab = 'proactive';
        renderSettingsTab();
      }
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
      toggleOverlay('settingsOverlay');
      state.settingsTab = 'schedules';
      renderSettingsTab();
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
      toggleOverlay('settingsOverlay');
      state.settingsTab = 'memory';
      renderSettingsTab();
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
</html>`}const $t="AES-GCM",zr=256;async function ka(e){const t=new TextEncoder,a=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},a,{name:$t,length:zr},!1,["encrypt","decrypt"])}async function Bt(e,t){const a=await ka(t),r=crypto.getRandomValues(new Uint8Array(12)),s=new TextEncoder,n=await crypto.subtle.encrypt({name:$t,iv:r},a,s.encode(e)),o=new Uint8Array(r.length+new Uint8Array(n).length);return o.set(r),o.set(new Uint8Array(n),r.length),btoa(String.fromCharCode(...o))}async function U(e,t){const a=await ka(t),r=new Uint8Array(atob(e).split("").map(i=>i.charCodeAt(0))),s=r.slice(0,12),n=r.slice(12),o=await crypto.subtle.decrypt({name:$t,iv:s},a,n);return new TextDecoder().decode(o)}async function yt(e){const a=new TextEncoder().encode(e+"karna-pin-salt"),r=await crypto.subtle.digest("SHA-256",a);return btoa(String.fromCharCode(...new Uint8Array(r)))}async function Sa(e,t){return await yt(e)===t}const Ia=Object.freeze(Object.defineProperty({__proto__:null,decrypt:U,encrypt:Bt,hashPin:yt,verifyPin:Sa},Symbol.toStringTag,{value:"Module"})),_e=new be;_e.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});_e.post("/setup",async e=>{const{username:t,name:a,pin:r,personality_prompt:s,timezone:n}=await e.req.json();if(!t||!a||!r)return e.json({error:"Username, name, and PIN are required"},400);if(r.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const i=await yt(r);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,a,i,s||"",n||"Asia/Kolkata").run();const c=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),l=crypto.randomUUID(),d=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(l,c.id,"web",d).run(),e.json({success:!0,sessionId:l,user:{id:c.id,username:c.username,name:c.name}})});_e.post("/login",async e=>{const{username:t,pin:a}=await e.req.json();if(!t||!a)return e.json({error:"Username and PIN required"},400);const r=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!r)return e.json({error:"User not found"},404);if(!await Sa(a,r.pin_hash))return e.json({error:"Invalid PIN"},401);const n=crypto.randomUUID(),o=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(n,r.id,"web",o).run(),e.json({success:!0,sessionId:n,user:{id:r.id,username:r.username,name:r.name}})});_e.post("/logout",async e=>{var a;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});_e.get("/users/hints",async e=>{const a=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(r=>{var s;return{username:r.username,name_hint:r.name.split(" ")[0],created:((s=r.created_at)==null?void 0:s.split(" ")[0])||""}});return e.json({users:a,count:a.length})});_e.post("/reset-pin",async e=>{var i;const{username:t,name:a,new_pin:r}=await e.req.json();if(!t||!a||!r)return e.json({error:"Username, display name, and new PIN are required"},400);if(r.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const s=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!s)return e.json({error:"User not found"},404);if(s.name.toLowerCase().trim()!==a.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const n=await yt(r);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,s.id).run();const o=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(s.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(s.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((i=o.meta)==null?void 0:i.changes)||0})});_e.get("/me",async e=>{var r;const t=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return a?e.json({user:{id:a.uid,username:a.username,name:a.name,role:a.role,timezone:a.timezone}}):e.json({error:"Invalid or expired session"},401)});const Ze={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},qr=25e3;function Oa(e,t){return Promise.race([e,new Promise((a,r)=>setTimeout(()=>r(new Error(`LLM timeout: ${t} did not respond within 25 seconds. Try again or switch providers in Settings → Keys.`)),qr))])}async function N(e,t,a,r,s,n={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,a,r,s,JSON.stringify(n)).run()}catch(o){console.error("Failed to log error:",o)}}async function kt(e,t,a,r,s,n){try{const o=`provider_alert:${r}:${a}`;if(await e.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(t,o).first())return;await N(e,t,"provider_alert",o,`${r} failed: ${n.substring(0,200)}`,{alertType:a,failedProvider:r,fallbackProvider:s});let c;a==="all_providers_down"?c=`🚨 All LLM providers failed

Last error from ${r}: ${qt(n)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:c=`⚠️ LLM Provider Issue

${r}: ${qt(n)}
Switched to: ${s}

Check your ${r} API credit balance or key.`;const{decrypt:l}=await Promise.resolve().then(()=>Ia),d=await e.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(t).first();if(!(d!=null&&d.telegram_chat_id))return;const p=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(t).first();if(!p)return;const g=await l(p.encrypted_value,d.pin_hash);await fetch(`https://api.telegram.org/bot${g}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d.telegram_chat_id,text:c})})}catch(o){console.error("Failed to send provider alert:",o)}}function qt(e){return e.includes("credit balance")||e.includes("insufficient")||e.includes("402")?"Credits exhausted or balance too low":e.includes("429")||e.includes("rate_limit")||e.includes("quota")?"Rate limit / quota exceeded":e.includes("401")||e.includes("authentication")||e.includes("invalid")&&e.includes("key")?"API key invalid or expired":e.includes("403")?"Access denied (key may lack permissions)":e.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":e.includes("properties field not found")?"Schema compatibility issue":"API error"}class Ca{constructor(t,a="claude-sonnet-4-20250514",r="https://api.anthropic.com",s="anthropic"){O(this,"name");O(this,"apiKey");O(this,"model");O(this,"apiBase");this.apiKey=t,this.model=a,this.apiBase=r,this.name=s}async chat(t,a){var d,p,g,v;const r=t.find(f=>f.role==="system"),s=t.filter(f=>f.role!=="system"),n={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:s.map(f=>({role:f.role,content:f.content}))};r&&(n.system=r.content),a!=null&&a.tools&&a.tools.length>0&&(n.tools=a.tools.map(f=>({name:f.name,description:f.description,input_schema:f.parameters})));const o=await Oa(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(n)}),this.name);if(!o.ok){const f=await o.text();throw new Error(this.name+" API error "+o.status+": "+f)}const i=await o.json(),c=((d=i.content)==null?void 0:d.filter(f=>f.type==="text"))||[],l=((p=i.content)==null?void 0:p.filter(f=>f.type==="tool_use"))||[];return{content:c.map(f=>f.text).join(`
`),toolCalls:l.map(f=>({id:f.id,name:f.name,arguments:f.input})),usage:{promptTokens:((g=i.usage)==null?void 0:g.input_tokens)||0,completionTokens:((v=i.usage)==null?void 0:v.output_tokens)||0}}}async streamChat(t,a){const r=t.find(l=>l.role==="system"),s=t.filter(l=>l.role!=="system"),n={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:s.map(l=>({role:l.role,content:l.content}))};r&&(n.system=r.content);const o=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(n)});if(!o.ok){const l=await o.text();throw new Error(this.name+" stream error "+o.status+": "+l)}const i=o.body.getReader(),c=new TextDecoder;return new ReadableStream({async pull(l){var f;const{done:d,value:p}=await i.read();if(d){l.close();return}const v=c.decode(p,{stream:!0}).split(`
`);for(const E of v)if(E.startsWith("data: ")){const b=E.slice(6);if(b==="[DONE]")continue;try{const T=JSON.parse(b);T.type==="content_block_delta"&&((f=T.delta)!=null&&f.text)&&l.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:T.delta.text})+`

`))}catch{}}}})}}function Kr(e){const t={},a=e||{};if(t.type=a.type||"object",t.type==="object"){const r=a.properties;if(r&&typeof r=="object"&&Object.keys(r).length>0){const s={};for(const[n,o]of Object.entries(r))o&&typeof o=="object"?s[n]=Rt(o):s[n]=o;t.properties=s}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(a.required)?t.required=a.required:t.required=[]}return a.description&&(t.description=a.description),t}function Rt(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const a=t.properties;if(a&&typeof a=="object"&&Object.keys(a).length>0){const r={};for(const[s,n]of Object.entries(a))n&&typeof n=="object"?r[s]=Rt(n):r[s]=n;t.properties=r}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=Rt(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class Ra{constructor(t,a,r,s){O(this,"name");O(this,"apiKey");O(this,"model");O(this,"apiBase");this.apiKey=t,this.model=a,this.apiBase=r.replace(/\/+$/,""),this.name=s}async chat(t,a){var c,l,d,p,g,v;const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:t.map(f=>({role:f.role,content:f.content}))},s=this.apiBase.includes("routellm.abacus.ai");if(a!=null&&a.tools&&a.tools.length>0&&s)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");a!=null&&a.tools&&a.tools.length>0&&(r.tools=a.tools.map(f=>({type:"function",function:{name:f.name,description:f.description,parameters:Kr(f.parameters||{})}})));const n=await Oa(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)}),this.name);if(!n.ok){const f=await n.text();throw new Error(this.name+" API error "+n.status+": "+f)}const o=await n.json(),i=(c=o.choices)==null?void 0:c[0];return{content:((l=i==null?void 0:i.message)==null?void 0:l.content)||"",toolCalls:(p=(d=i==null?void 0:i.message)==null?void 0:d.tool_calls)==null?void 0:p.map(f=>({id:f.id,name:f.function.name,arguments:(()=>{try{return typeof f.function.arguments=="string"?JSON.parse(f.function.arguments||"{}"):f.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((g=o.usage)==null?void 0:g.prompt_tokens)||0,completionTokens:((v=o.usage)==null?void 0:v.completion_tokens)||0}}}async streamChat(t,a){const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:t.map(i=>({role:i.role,content:i.content}))},s=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)});if(!s.ok){const i=await s.text();throw new Error(this.name+" stream error "+s.status+": "+i)}const n=s.body.getReader(),o=new TextDecoder;return new ReadableStream({async pull(i){var g,v,f;const{done:c,value:l}=await n.read();if(c){i.close();return}const p=o.decode(l,{stream:!0}).split(`
`);for(const E of p)if(E.startsWith("data: ")){const b=E.slice(6);if(b==="[DONE]")continue;try{const u=(f=(v=(g=JSON.parse(b).choices)==null?void 0:g[0])==null?void 0:v.delta)==null?void 0:f.content;u&&i.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:u})+`

`))}catch{}}}})}}function Dt(e,t,a,r){const s=Ze[e];if(!s)throw new Error(`Unknown LLM provider: ${e}`);const n=r||s.defaultModel;return s.apiFormat==="anthropic"?new Ca(t,n,s.apiBase,a):new Ra(t,n,s.apiBase,a)}class Da{constructor(){O(this,"errorLog",new Map);O(this,"usageLog",new Map)}async pickProvider(t){const a=Date.now(),r=t.filter(s=>{const n=this.errorLog.get(s);return n?n.cooldownUntil<=a:!0});return r.length>0?r[0]:null}async recordUsage(t,a){const r=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:r.tokens+a,requests:r.requests+1})}async recordError(t,a,r=5){this.errorLog.set(t,{error:a,cooldownUntil:Date.now()+r*60*1e3})}}const Yr=["llm_slot_1","llm_slot_2","llm_slot_3"],Jr=["anthropic","openai"];async function nt(e,t,a){const{decrypt:r}=await Promise.resolve().then(()=>Ia),s=new Da,n=[];for(const p of Yr){const g=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,p).first();if(g)try{const v=await r(g.encrypted_value,a),f=JSON.parse(v);if(f.provider&&f.apiKey&&Ze[f.provider]){const b=f.provider,T=Dt(f.provider,f.apiKey,b,f.model);n.push({name:b,provider:T})}}catch(v){console.error(`Failed to load ${p}:`,v)}}const o=new Set(n.map(p=>p.name));for(const p of Jr){if(o.has(p))continue;const g=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,p).first();if(g)try{const v=await r(g.encrypted_value,a);if(Ze[p]){const E=Dt(p,v,p);n.push({name:p,provider:E})}}catch{console.error(`Failed to decrypt legacy ${p} key`)}}if(n.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const i=n.map(p=>p.name),c=await s.pickProvider(i);if(!c)return console.warn("All providers in cooldown, using first available"),{provider:n[0].provider,rotation:s};const l=n.find(p=>p.name===c);return{provider:Vr(l.provider,n,s,e,t),rotation:s}}function Vr(e,t,a,r,s){const n=o=>o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")||o.includes("TOOLS_UNSUPPORTED");return t.length<=1?{name:e.name,async chat(o,i){try{return await e.chat(o,i)}catch(c){const l=c.message||"";throw n(l)&&!l.includes("TOOLS_UNSUPPORTED")&&kt(r,s,"all_providers_down",e.name,null,l),c}},async streamChat(o,i){return await e.streamChat(o,i)}}:{name:e.name,async chat(o,i){try{return await e.chat(o,i)}catch(c){const l=c.message||"";if(!n(l))throw c;const d=l.includes("TOOLS_UNSUPPORTED");console.warn(`Provider ${e.name} ${d?"tools unsupported":"auth/billing error"}, trying fallback...`),await a.recordError(e.name,l,d?1:1440);const p=t.filter(g=>g.name!==e.name);for(const g of p)try{const v=await g.provider.chat(o,i);return this.name=g.name,d||kt(r,s,"provider_switched",e.name,g.name,l),v}catch(v){const f=v.message||"";if(n(f)){await a.recordError(g.name,f,1440);continue}throw v}throw kt(r,s,"all_providers_down",e.name,null,l),new Error(`All LLM providers failed. Primary (${e.name}): ${l.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(o,i){return await e.streamChat(o,i)}}}const Nt=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:Ca,OpenAICompatibleProvider:Ra,ProviderRotation:Da,createProviderFromConfig:Dt,createRotatingProvider:nt,logError:N},Symbol.toStringTag,{value:"Module"})),St=20,Xr=2e3,Zr=2e3,Na=4;function Qr(e){return Math.ceil(e.length/Na)}function Kt(e,t){const a=t*Na;return e.length<=a?e:e.slice(0,a)+`
[...truncated to fit token budget]`}class X{constructor(t){this.db=t}async store(t,a,r,s,n=5,o="working"){const i=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,a,r).first();i?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,n,o,i.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,a,r,s,n,o).run(),o==="working"&&await this.enforceWorkingMemoryCap(t)}async enforceWorkingMemoryCap(t){const a=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((a==null?void 0:a.cnt)||0)>St){const r=((a==null?void 0:a.cnt)||0)-St;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ? AND tier = 'working' AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' 
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,r).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,St).all()).results||[]}async getAll(t,a,r=50){return a?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,a,r).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,r).all()).results||[]}async search(t,a,r=10){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${a}%`,`%${a}%`,r).all()).results||[]}async update(t,a,r){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t,a).run()}async promote(t,a){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,a).run(),await this.enforceWorkingMemoryCap(a)}async demote(t,a){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,a).run()}async remove(t,a){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,a).run()}async buildContext(t){const a=await this.getWorkingMemory(t);if(a.length===0)return"";const r={};for(const n of a)r[n.type]||(r[n.type]=[]),r[n.type].push(n);let s=`
## Working Memory (Active Context)
`;for(const[n,o]of Object.entries(r)){s+=`
### ${n.charAt(0).toUpperCase()+n.slice(1)}s
`;for(const i of o)s+=`- **${i.title}**: ${i.content}
`}return Kt(s,Xr)}static truncatePersonality(t){return Kt(t,Zr)}async getRecentConversations(t,a=20,r){return r?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,r,a).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,a).all()).results||[]).reverse()}async storeMessage(t,a,r,s,n="{}",o){const i=Qr(s);o?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,a,r,s,n,i,o).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,a,r,s,n,i).run()}async compactHistory(t,a=30){const r=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((r==null?void 0:r.cnt)||0)<=a*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,a).run()}}const es="https://accounts.google.com/o/oauth2/v2/auth",Aa="https://oauth2.googleapis.com/token",ts="https://www.googleapis.com/oauth2/v2/userinfo",as=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let se=null;async function At(e,t,a){const r=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!r)return null;try{const s=await U(r.encrypted_value,a);return JSON.parse(s)}catch{return null}}async function rs(e,t,a,r){const s=await Bt(JSON.stringify(r),a);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,s).run()}function La(e,t,a){const r=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:as,access_type:"offline",prompt:"consent",state:a,include_granted_scopes:"true"});return`${es}?${r}`}async function Ma(e,t,a,r){const s=await fetch(Aa,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:a,redirect_uri:r,grant_type:"authorization_code"})}),n=await s.text();if(!s.ok)throw new Error(`Token exchange failed (${s.status}): ${n.substring(0,300)}`);return JSON.parse(n)}async function ss(e,t,a){const r=await fetch(Aa,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:a,grant_type:"refresh_token"})}),s=await r.text();if(!r.ok)throw r.status===400||r.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${r.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function $a(e){const t=await fetch(ts,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function ze(e,t,a,r,s){if(!r||!s)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(se&&se.userId===t&&se.expiresAt>Date.now()/1e3+60){const i=await At(e,t,a);return{token:se.token,email:(i==null?void 0:i.email)||"unknown"}}const n=await At(e,t,a);if(!n)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const o=await ss(n.refresh_token,r,s);return se={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{token:o.access_token,email:n.email}}async function jt(e,t,a){try{const r=await At(e,t,a);return r?{connected:!0,email:r.email,connectedAt:r.connected_at}:{connected:!1}}catch{return{connected:!1}}}function Ba(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function ja(e,t,a,r,s,n,o){const i=await Ma(r,n,o,s);if(!i.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const c=await $a(i.access_token),l={refresh_token:i.refresh_token,email:c.email,name:c.name,connected_at:new Date().toISOString()};return await rs(e,t,a,l),se={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{email:c.email,name:c.name}}async function Pa(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(se==null?void 0:se.userId)===t&&(se=null)}const Ke="https://sheets.googleapis.com/v4/spreadsheets";class Ua{constructor(t,a,r,s,n){this.db=t,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:t}=await ze(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,a){const r=await this.authHeaders(),s=encodeURIComponent(a),n=await fetch(`${Ke}/${t}/values/${s}`,{headers:r});if(!n.ok){const i=await n.text();throw new Error(`Sheets read failed (${n.status}): ${i}`)}return(await n.json()).values||[]}async writeRange(t,a,r){const s=await this.authHeaders(),n=encodeURIComponent(a),o=await fetch(`${Ke}/${t}/values/${n}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:s,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!o.ok){const c=await o.text();throw new Error(`Sheets write failed (${o.status}): ${c}`)}return{updatedCells:(await o.json()).updatedCells||0}}async appendRows(t,a,r){var c;const s=await this.authHeaders(),n=encodeURIComponent(a),o=await fetch(`${Ke}/${t}/values/${n}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:s,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!o.ok){const l=await o.text();throw new Error(`Sheets append failed (${o.status}): ${l}`)}return{updatedCells:((c=(await o.json()).updates)==null?void 0:c.updatedCells)||r.length}}async createSpreadsheet(t,a){const r=await this.authHeaders(),s={properties:{title:t},sheets:a&&a.length>0?a.map(i=>({properties:{title:i}})):[{properties:{title:"Sheet1"}}]},n=await fetch(Ke,{method:"POST",headers:r,body:JSON.stringify(s)});if(!n.ok){const i=await n.text();throw new Error(`Sheets create failed (${n.status}): ${i}`)}const o=await n.json();return{spreadsheetId:o.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${o.spreadsheetId}/edit`}}async getMetadata(t){const a=await this.authHeaders(),r=await fetch(`${Ke}/${t}?fields=properties.title,sheets.properties.title`,{headers:a});if(!r.ok){const n=await r.text();throw new Error(`Sheets metadata failed (${r.status}): ${n}`)}const s=await r.json();return{title:s.properties.title,sheets:s.sheets.map(n=>n.properties.title)}}}const Ye="https://www.googleapis.com/calendar/v3";class Pt{constructor(t,a,r,s,n){this.db=t,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:t}=await ze(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",a={}){const r=await this.authHeaders(),s=new URLSearchParams;a.timeMin&&s.set("timeMin",a.timeMin),a.timeMax&&s.set("timeMax",a.timeMax),s.set("maxResults",String(a.maxResults||20)),s.set("singleEvents","true"),s.set("orderBy","startTime"),a.query&&s.set("q",a.query);const n=await fetch(`${Ye}/calendars/${encodeURIComponent(t)}/events?${s}`,{headers:r});if(!n.ok){const i=await n.text();throw new Error(`Calendar list failed (${n.status}): ${i}`)}return(await n.json()).items||[]}async createEvent(t="primary",a){var i;const r=await this.authHeaders(),s=a.timeZone||"Asia/Kolkata",n={summary:a.summary,description:a.description||"",location:a.location||"",start:{dateTime:a.startDateTime,timeZone:s},end:{dateTime:a.endDateTime,timeZone:s}};(i=a.attendees)!=null&&i.length&&(n.attendees=a.attendees.map(c=>({email:c})));const o=await fetch(`${Ye}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:r,body:JSON.stringify(n)});if(!o.ok){const c=await o.text();throw new Error(`Calendar create failed (${o.status}): ${c}`)}return await o.json()}async updateEvent(t="primary",a,r){const s=await this.authHeaders(),n=r.timeZone||"Asia/Kolkata",o={};r.summary&&(o.summary=r.summary),r.description&&(o.description=r.description),r.location&&(o.location=r.location),r.startDateTime&&(o.start={dateTime:r.startDateTime,timeZone:n}),r.endDateTime&&(o.end={dateTime:r.endDateTime,timeZone:n});const i=await fetch(`${Ye}/calendars/${encodeURIComponent(t)}/events/${a}`,{method:"PATCH",headers:s,body:JSON.stringify(o)});if(!i.ok){const c=await i.text();throw new Error(`Calendar update failed (${i.status}): ${c}`)}return await i.json()}async deleteEvent(t="primary",a){const r=await this.authHeaders(),s=await fetch(`${Ye}/calendars/${encodeURIComponent(t)}/events/${a}`,{method:"DELETE",headers:r});if(!s.ok&&s.status!==410){const n=await s.text();throw new Error(`Calendar delete failed (${s.status}): ${n}`)}}async listCalendars(){const t=await this.authHeaders(),a=await fetch(`${Ye}/users/me/calendarList`,{headers:t});if(!a.ok){const s=await a.text();throw new Error(`Calendar list calendars failed (${a.status}): ${s}`)}return((await a.json()).items||[]).map(s=>({id:s.id,summary:s.summary,primary:s.primary||!1}))}}const lt="https://docs.googleapis.com/v1/documents",ns="https://www.googleapis.com/drive/v3/files";class Ha{constructor(t,a,r,s,n){this.db=t,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:t}=await ze(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const a=await this.authHeaders(),r=await fetch(lt,{method:"POST",headers:a,body:JSON.stringify({title:t})});if(!r.ok){const n=await r.text();throw new Error(`Docs create failed (${r.status}): ${n}`)}const s=await r.json();return{documentId:s.documentId,url:`https://docs.google.com/document/d/${s.documentId}/edit`}}async readDocument(t){var o,i;const a=await this.authHeaders(),r=await fetch(`${lt}/${t}`,{headers:a});if(!r.ok){const c=await r.text();throw new Error(`Docs read failed (${r.status}): ${c}`)}const s=await r.json();let n="";for(const c of((o=s.body)==null?void 0:o.content)||[])if(c.paragraph)for(const l of c.paragraph.elements)(i=l.textRun)!=null&&i.content&&(n+=l.textRun.content);return{title:s.title,content:n.trim()}}async appendText(t,a){const r=await this.authHeaders(),s=await fetch(`${lt}/${t}`,{headers:r});if(!s.ok){const c=await s.text();throw new Error(`Docs read for append failed (${s.status}): ${c}`)}const n=await s.json(),o=n.body.content[n.body.content.length-1].endIndex-1,i=await fetch(`${lt}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{insertText:{location:{index:o},text:a}}]})});if(!i.ok){const c=await i.text();throw new Error(`Docs append failed (${i.status}): ${c}`)}}async shareDocument(t,a,r="writer"){const s=await this.authHeaders(),n=await fetch(`${ns}/${t}/permissions`,{method:"POST",headers:s,body:JSON.stringify({type:"user",role:r,emailAddress:a})});if(!n.ok){const o=await n.text();throw new Error(`Share failed (${n.status}): ${o}`)}}}class re{constructor(t,a,r,s,n){O(this,"sheets");O(this,"calendar");O(this,"docs");O(this,"db");O(this,"userId");O(this,"pinHash");this.db=t,this.userId=a,this.pinHash=r,this.sheets=new Ua(t,a,r,s,n),this.calendar=new Pt(t,a,r,s,n),this.docs=new Ha(t,a,r,s,n)}async isConnected(){return jt(this.db,this.userId,this.pinHash)}}const ct=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:Pt,GoogleDocs:Ha,GoogleServices:re,GoogleSheets:Ua,completeOAuthFlow:ja,disconnectGoogle:Pa,exchangeCodeForTokens:Ma,fetchUserInfo:$a,generateAuthUrl:La,getGoogleAuth:ze,isGoogleConnected:jt,isOAuthClientConfigured:Ba},Symbol.toStringTag,{value:"Module"}));async function Ga(e,t,a={}){const r={textQuery:t,languageCode:"en",pageSize:8};if(a.type&&(r.includedType=a.type),a.location){const c=a.location.split(",").map(Number);c.length===2&&!isNaN(c[0])&&!isNaN(c[1])&&(r.locationBias={circle:{center:{latitude:c[0],longitude:c[1]},radius:a.radius||5e3}})}const s=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),n=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":s},body:JSON.stringify(r)});if(!n.ok){const c=await n.text();return{results:[],error:`Places API error (${n.status}): ${c.substring(0,200)}`}}const o=await n.json();return!o.places||o.places.length===0?{results:[]}:{results:o.places.map(c=>{var l,d,p;return{name:((l=c.displayName)==null?void 0:l.text)||"",address:c.formattedAddress||"",rating:c.rating,userRatingsTotal:c.userRatingCount,priceLevel:c.priceLevel,openNow:(d=c.currentOpeningHours)==null?void 0:d.openNow,types:(p=c.types)==null?void 0:p.slice(0,5),placeId:c.id||"",location:c.location?{lat:c.location.latitude,lng:c.location.longitude}:void 0,googleMapsUri:c.googleMapsUri}})}}async function Fa(e,t){var n,o,i;const a=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),r=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":a}});if(!r.ok){const c=await r.text();return{error:`Place Details API error (${r.status}): ${c.substring(0,200)}`}}const s=await r.json();return{details:{name:((n=s.displayName)==null?void 0:n.text)||"",address:s.formattedAddress||"",phone:s.internationalPhoneNumber,website:s.websiteUri,rating:s.rating,reviews:(o=s.reviews)==null?void 0:o.slice(0,3).map(c=>{var l,d,p;return{author:((l=c.authorAttribution)==null?void 0:l.displayName)||"Anonymous",rating:c.rating||0,text:((p=(d=c.text)==null?void 0:d.text)==null?void 0:p.substring(0,200))||"",time:c.relativePublishTimeDescription||""}}),openingHours:(i=s.currentOpeningHours)==null?void 0:i.weekdayDescriptions,location:s.location?{lat:s.location.latitude,lng:s.location.longitude}:void 0,googleMapsUri:s.googleMapsUri}}}async function Wa(e,t,a,r={}){var l;const s=new URLSearchParams({origin:t,destination:a,key:e,mode:r.mode||"driving"});(r.mode==="driving"||!r.mode)&&s.set("departure_time","now");const n=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${s}`);if(!n.ok)return{error:`Directions API error: ${n.status}`};const o=await n.json();if(o.status!=="OK")return{error:`Directions: ${o.status} — ${o.error_message||""}`};const i=o.routes[0],c=i.legs[0];return{route:{summary:i.summary,distance:c.distance.text,duration:c.duration.text,durationInTraffic:(l=c.duration_in_traffic)==null?void 0:l.text,steps:c.steps.slice(0,10).map(d=>{var p,g,v;return{instruction:((p=d.html_instructions)==null?void 0:p.replace(/<[^>]*>/g,""))||"",distance:((g=d.distance)==null?void 0:g.text)||"",duration:((v=d.duration)==null?void 0:v.text)||""}}),startAddress:c.start_address,endAddress:c.end_address}}}async function za(e,t,a,r){var c,l;const s={q:t,target:a,key:e,format:"text"};r&&(s.source=r);const n=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok){const d=await n.text();return{translatedText:"",error:`Translate API error (${n.status}): ${d.substring(0,200)}`}}const i=(l=(c=(await n.json()).data)==null?void 0:c.translations)==null?void 0:l[0];return i?{translatedText:i.translatedText,detectedSourceLang:i.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function qa(e,t){const a=new URLSearchParams({address:t,key:e}),r=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${a}`);if(!r.ok)return{results:[],error:`Geocoding API error: ${r.status}`};const s=await r.json();return s.status!=="OK"&&s.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${s.status} — ${s.error_message||""}`}:{results:(s.results||[]).slice(0,5).map(n=>{var o;return{address:n.formatted_address,lat:n.geometry.location.lat,lng:n.geometry.location.lng,placeId:n.place_id,types:(o=n.types)==null?void 0:o.slice(0,3)}})}}async function Ka(e,t,a={}){const r=new URLSearchParams({part:"snippet",q:t,key:e,type:a.type||"video",maxResults:String(a.maxResults||5),order:a.order||"relevance"}),s=await fetch(`https://www.googleapis.com/youtube/v3/search?${r}`);if(!s.ok){const o=await s.text();return{results:[],error:`YouTube API error (${s.status}): ${o.substring(0,200)}`}}return{results:((await s.json()).items||[]).map(o=>{var i,c,l,d,p,g,v,f;return{title:o.snippet.title,channelTitle:o.snippet.channelTitle,description:(i=o.snippet.description)==null?void 0:i.substring(0,200),videoId:((c=o.id)==null?void 0:c.videoId)||((l=o.id)==null?void 0:l.channelId)||((d=o.id)==null?void 0:d.playlistId)||"",publishedAt:o.snippet.publishedAt,url:(p=o.id)!=null&&p.videoId?`https://www.youtube.com/watch?v=${o.id.videoId}`:(g=o.id)!=null&&g.channelId?`https://www.youtube.com/channel/${o.id.channelId}`:"",thumbnailUrl:(f=(v=o.snippet.thumbnails)==null?void 0:v.medium)==null?void 0:f.url}})}}async function vt(e,t={}){const a=Math.min(t.num||5,10),r=t.site?`site:${t.site} ${e}`:e;try{const s=new URLSearchParams({q:r}),n=await fetch(`https://html.duckduckgo.com/html/?${s}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!n.ok)return{results:[],error:`Search request failed (${n.status})`};const o=await n.text(),i=[],c=o.split(/class="result results_links/g).slice(1);for(const l of c){if(i.length>=a)break;const d=l.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),p=l.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(d){let g=d[1];const v=g.match(/uddg=([^&]+)/);v?g=decodeURIComponent(v[1]):g.startsWith("//")&&(g="https:"+g);const f=T=>T.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),E=f(d[2]),b=p?f(p[1]):"";if(E&&g.startsWith("http")){const T=g.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];i.push({title:E,link:g,snippet:b,displayLink:T})}}}return i.length===0?{results:[],error:void 0}:{results:i}}catch(s){return{results:[],error:`Web search error: ${s.message}`}}}async function Ya(e,t,a,r="driving"){var c,l,d,p;const s=new URLSearchParams({origins:t,destinations:a,key:e,mode:r,departure_time:"now"}),n=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${s}`);if(!n.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${n.status}`};const o=await n.json(),i=(d=(l=(c=o.rows)==null?void 0:c[0])==null?void 0:l.elements)==null?void 0:d[0];return!i||i.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(i==null?void 0:i.status)||o.status}`}:{distance:i.distance.text,duration:i.duration.text,durationInTraffic:(p=i.duration_in_traffic)==null?void 0:p.text}}const os=Object.freeze(Object.defineProperty({__proto__:null,geocode:qa,getDirections:Wa,getDistanceMatrix:Ya,getPlaceDetails:Fa,searchPlaces:Ga,searchYouTube:Ka,translateText:za,webSearch:vt},Symbol.toStringTag,{value:"Module"})),oe="https://gmail.googleapis.com/gmail/v1/users/me";class ie{constructor(t,a,r,s,n){this.db=t,this.userId=a,this.pinHash=r,this.clientId=s,this.clientSecret=n}async authHeaders(){const{token:t}=await ze(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var i;const a=await this.authHeaders(),r=new URLSearchParams;if(r.set("maxResults",String(t.maxResults||10)),t.query&&r.set("q",t.query),(i=t.labelIds)!=null&&i.length)for(const c of t.labelIds)r.append("labelIds",c);const s=await fetch(`${oe}/messages?${r}`,{headers:a});if(!s.ok){const c=await s.text();throw new Error(`Gmail list failed (${s.status}): ${c.substring(0,200)}`)}const n=await s.json();if(!n.messages||n.messages.length===0)return[];const o=[];for(const c of n.messages.slice(0,t.maxResults||10))try{const l=await this.getMessage(c.id,a);l&&o.push(l)}catch{}return o}async getMessage(t,a){const r=a||await this.authHeaders(),s=await fetch(`${oe}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:r});if(!s.ok)return null;const n=await s.json(),o=i=>{var c,l,d;return((d=(l=(c=n.payload)==null?void 0:c.headers)==null?void 0:l.find(p=>p.name.toLowerCase()===i.toLowerCase()))==null?void 0:d.value)||""};return{id:n.id,threadId:n.threadId,snippet:n.snippet||"",subject:o("Subject")||"(no subject)",from:o("From"),to:o("To"),date:o("Date")||new Date(parseInt(n.internalDate)).toISOString(),isUnread:(n.labelIds||[]).includes("UNREAD"),labels:n.labelIds||[]}}async getMessageBody(t){const a=await this.authHeaders(),r=await fetch(`${oe}/messages/${t}?format=full`,{headers:a});if(!r.ok){const n=await r.text();throw new Error(`Gmail message body failed (${r.status}): ${n.substring(0,200)}`)}const s=await r.json();return Ja(s.payload)}async search(t,a=10){return this.listMessages({query:t,maxResults:a})}async send(t,a,r,s={}){const n=await this.authHeaders(),o=[`To: ${t}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];s.cc&&o.push(`Cc: ${s.cc}`),s.bcc&&o.push(`Bcc: ${s.bcc}`),s.replyToMessageId&&(o.push(`In-Reply-To: ${s.replyToMessageId}`),o.push(`References: ${s.replyToMessageId}`)),o.push("",r);const i=o.join(`\r
`),l={raw:btoa(unescape(encodeURIComponent(i))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};s.threadId&&(l.threadId=s.threadId);const d=await fetch(`${oe}/messages/send`,{method:"POST",headers:n,body:JSON.stringify(l)});if(!d.ok){const p=await d.text();throw new Error(`Gmail send failed (${d.status}): ${p.substring(0,200)}`)}return await d.json()}async createDraft(t,a,r,s={}){const n=await this.authHeaders(),o=[`To: ${t}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];s.cc&&o.push(`Cc: ${s.cc}`),o.push("",r);const i=o.join(`\r
`),c=btoa(unescape(encodeURIComponent(i))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),l=await fetch(`${oe}/drafts`,{method:"POST",headers:n,body:JSON.stringify({message:{raw:c}})});if(!l.ok){const d=await l.text();throw new Error(`Gmail draft failed (${l.status}): ${d.substring(0,200)}`)}return await l.json()}async markAsRead(t){const a=await this.authHeaders();await fetch(`${oe}/messages/${t}/modify`,{method:"POST",headers:a,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,a){const r=await this.authHeaders();let s={};switch(a){case"archive":s={removeLabelIds:["INBOX"]};break;case"trash":s={addLabelIds:["TRASH"]};break;case"read":s={removeLabelIds:["UNREAD"]};break;case"unread":s={addLabelIds:["UNREAD"]};break;case"star":s={addLabelIds:["STARRED"]};break;case"unstar":s={removeLabelIds:["STARRED"]};break}const n=await fetch(`${oe}/messages/${t}/modify`,{method:"POST",headers:{...r,"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok){const o=await n.text();throw new Error(`Failed to modify message: ${o}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),a=await fetch(`${oe}/labels/INBOX`,{headers:t});return a.ok&&(await a.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),a=await fetch(`${oe}/profile`,{headers:t});if(!a.ok)throw new Error("Failed to get Gmail profile");return await a.json()}}function Ja(e){var t,a,r;if(!e)return"";if((t=e.body)!=null&&t.data)return It(e.body.data);if(e.parts){for(const s of e.parts)if(s.mimeType==="text/plain"&&((a=s.body)!=null&&a.data))return It(s.body.data);for(const s of e.parts)if(s.mimeType==="text/html"&&((r=s.body)!=null&&r.data)){const n=It(s.body.data);return is(n)}for(const s of e.parts)if(s.parts){const n=Ja(s);if(n)return n}}return e.snippet||""}function It(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function is(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const ls=1e4,cs=1e4;async function Va(e,t){try{const a=new AbortController,r=setTimeout(()=>a.abort(),cs),s=await fetch(e,{signal:a.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(clearTimeout(r),!s.ok)return{text:"",error:`HTTP ${s.status}`};const n=s.headers.get("content-type")||"";if(!n.includes("text/html")&&!n.includes("text/plain")&&!n.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${n.split(";")[0]}`};const o=await s.text(),i=ds(o);return i.length<50?{text:"",error:"Page has too little readable content"}:{text:i.substring(0,t||ls)}}catch(a){return{text:"",error:a.name==="AbortError"?"Timeout":a.message}}}function ds(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(a,r)=>String.fromCharCode(parseInt(r))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(a=>a.trim()).filter(a=>a.length>0).join(`
`),t.trim()}async function Xa(e,t,a={}){const r=a.maxPages||(a.depth==="thorough"?5:3),s=a.maxResults||(a.depth==="thorough"?8:5),n=await vt(e,{num:s,site:a.site});if(n.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${n.error}`};if(n.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const i=n.results.slice(0,r).map(async g=>{const v=await Va(g.link);return{title:g.title,url:g.link,displayLink:g.displayLink,snippet:g.snippet,content:v.text,error:v.error}}),l=(await Promise.all(i)).filter(g=>g.content.length>50);if(l.length===0){const g=n.results.map((f,E)=>`[${E+1}] ${f.title}
${f.snippet}
Source: ${f.link}`).join(`

`);return{report:await Yt(e,g,t,"snippets"),sources:n.results.map(f=>({title:f.title,url:f.link})),pagesRead:0}}const d=l.map((g,v)=>`--- SOURCE ${v+1}: ${g.title} (${g.displayLink}) ---
${g.content}
--- END SOURCE ${v+1} ---`).join(`

`);return{report:await Yt(e,d,t,"full"),sources:l.map(g=>({title:g.title,url:g.url})),pagesRead:l.length}}async function Yt(e,t,a,r){const n=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

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

Write a synthesized research report answering the query above.`;try{return(await a.chat([{role:"system",content:n},{role:"user",content:o}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(i){return`Research synthesis error: ${i.message}. Raw search results were found but could not be analyzed.`}}const us=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:Xa,fetchPageContent:Va},Symbol.toStringTag,{value:"Module"})),ms=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,agent:"scheduler",weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,agent:"scheduler",weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,agent:"scheduler",weight:.95},{pattern:/^[Tt]ask:\s*/,agent:"scheduler",weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,agent:"scheduler",weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,agent:"scheduler",weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,agent:"scheduler",weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,agent:"scheduler",weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,agent:"scheduler",weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,agent:"scheduler",weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,agent:"scheduler",weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,agent:"workspace",weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,agent:"workspace",weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,agent:"workspace",weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,agent:"workspace",weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,agent:"workspace",weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,agent:"workspace",weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,agent:"workspace",weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,agent:"workspace",weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,agent:"workspace",weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,agent:"workspace",weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,agent:"workspace",weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,agent:"research",weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,agent:"research",weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,agent:"research",weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,agent:"research",weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,agent:"research",weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,agent:"research",weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,agent:"research",weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,agent:"research",weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,agent:"research",weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,agent:"research",weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,agent:"research",weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,agent:"research",weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,agent:"research",weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,agent:"memory",weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,agent:"memory",weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,agent:"scheduler",weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,agent:"scheduler",weight:.9}];function Za(e,t){let a=null;const r=new Set;for(const s of ms)s.pattern.test(e)&&(r.add(s.agent),(!a||s.weight>a.weight)&&(a={agent:s.agent,weight:s.weight}));return t&&/spreadsheet|sheet|google\s*sheet/i.test(t)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(e)&&(r.add("workspace"),(!a||a.agent!=="workspace")&&(a={agent:"workspace",weight:.85})),r.size>=2?r.has("workspace")&&r.has("research")?{agent:"workspace",confidence:.7,reasoning:"Multi-intent: workspace+research merged"}:r.has("scheduler")&&r.has("research")?/\b(track\s+it|check\s+it|search\s+for|find\s+(out|it)|look\s+(it\s+)?up|track\s+(?:the|my|this))\b/i.test(e)||/\b(track|check|search|find)\b.*\b(and|also|\+)\b.*\b(remind|schedule|alert|notify|in\s+\d)\b/i.test(e)?{agent:"multi",confidence:.7,reasoning:"Multi-intent: immediate research + deferred schedule — needs full agent"}:{agent:"scheduler",confidence:.85,reasoning:"Multi-intent: scheduler+research — schedule a research task"}:r.has("scheduler")&&r.has("workspace")?{agent:"multi",confidence:.8,reasoning:"Multi-intent: scheduler+workspace — full agent handles both"}:r.has("memory")&&r.size===2?{agent:[...r].find(n=>n!=="memory")||"conversation",confidence:.7,reasoning:"Multi-intent: memory is context for other agent"}:{agent:"multi",confidence:.5,reasoning:`Multiple intents detected: ${[...r].join(", ")}`}:a?{agent:a.agent,confidence:a.weight,reasoning:`Keyword match: ${a.agent}`}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function Qa(e,t){const a=ps[e];return a?t.filter(r=>a.includes(r.name)):t}const ps={scheduler:["create_schedule","list_schedules","toggle_schedule","update_schedule_state","delete_schedule","store_memory","search_memory"],workspace:["read_sheet","write_sheet","append_sheet","create_sheet","list_calendar_events","create_calendar_event","create_doc","read_doc","append_to_doc","gmail_list","gmail_read","gmail_search","gmail_send","gmail_draft","gmail_unread_count","gmail_modify","drive_list","drive_search","store_memory","search_memory","web_search","read_url","research"],research:["web_search","read_url","research","search_places","get_place_details","get_directions","get_travel_time","translate_text","search_youtube","geocode_address","store_memory","search_memory","create_doc","append_to_doc"],memory:["store_memory","search_memory","get_system_status"],conversation:[]};function ht(e,t,a,r,s){const n=t.assistant_name||"Karna",o=t.personality_prompt?`
## Personality
${t.personality_prompt.substring(0,2e3)}
`:"",i=a?`
## Active Memory (ALWAYS consult before responding)
${a}
`:"";let c="";try{const d=new Date;c=new Intl.DateTimeFormat("en-GB",{timeZone:t.timezone,day:"numeric",month:"short",year:"numeric"}).format(d)}catch{c=""}const l=`
## Current User
- **Name**: ${t.name}
- **Timezone**: ${t.timezone}
- **Time**: ${s}
- **Today's date for sheets**: ${c}
`;switch(e){case"scheduler":return`You are ${n}, managing schedules and reminders for the user.

${l}${o}${i}

## NON-NEGOTIABLE RULES
1. **ALWAYS call the appropriate tool immediately.** Never say "I'll set that up" without calling create_schedule in the same turn.
2. **Check memory first** using search_memory if the user references something stored (tracking numbers, recurring patterns, document IDs).
5. **YOU ARE THE SCHEDULER ONLY. You have NO access to Google Docs, Sheets, Drive, Gmail, or any workspace tools.** Never mention creating documents, writing to sheets, sending emails, or any Google Workspace action. If the user's message implies a workspace action ("write a doc", "create an essay", "send an email"), ONLY handle the scheduling part and explicitly tell the user: "I've set up your reminder. For creating/sending, please send that as a separate request." Never say "I'll create the doc now" or "Now creating your document" — you cannot do that.
3. **Write machine-executable action_descriptions.** When creating schedules for tasks that need tool execution (delivery tracking, email checks, sheet checks), the action_description MUST be a complete instruction that another agent can execute autonomously. Examples:
   - BAD: "Check delivery status" (too vague for autonomous execution)
   - GOOD: "Use web_search to check delivery status for DTDC tracking number N12345678. Search 'DTDC tracking N12345678 delivery status'. Report current status and expected delivery date."
   - BAD: "Check mail" (no context)
   - GOOD: "Use gmail_search to find recent emails from 'kava@vendor.com' or containing 'KAVA order'. Report sender, subject, and any shipping/delivery updates."
4. **Match the user's scope — don't over-expand.** The action_description must answer EXACTLY what the user asked, nothing more.
   - User says "crew for TET tomorrow" → report ONLY crew names. NOT call time, NOT program, NOT sound requirements.
   - User says "schedule for TET tomorrow" → report crew names + call time. NOT program details, NOT sound requirements.
   - User says "details of show at TET" → report everything: crew, program, sound, call time, team.
   - User says "check delivery status" → report status and ETA. NOT order history, NOT payment details.
   - The action_description should end with: "Answer ONLY: [what user asked for]"
   - Example: "...Look for TET entries for March 8. Answer ONLY: crew names."
   - Example: "...Look for TET entries for March 8. Answer ONLY: crew names and call time."

## Your Job
Create, list, modify, and delete scheduled tasks. You handle:
- **Simple reminders**: "Remind me to drink water" → action_type 'reminder' (just sends a text notification — NO tools are run when it fires)
- **Smart reminders**: "Remind me about NCPA crew schedule" or "Remind me to check delivery" → action_type 'custom' (runs an agent with tools when it fires). Use this when the reminder implies the system should DO something (check, search, read, look up, verify, fetch, find).
- **Deferred checks**: "Check delivery in 48 hrs" → action_type 'custom', schedule_type 'once', and a DETAILED action_description
- **Recurring checks**: "Check my email every 2 hours" → action_type 'check_mail', interval
- **One-time alerts**: "Alert me on March 15 at 3pm" → action_type depends on whether it's a passive nudge or an active task
- **Management**: List, enable/disable, pause, complete, or delete schedules

### CRITICAL: action_type determines what happens when the schedule fires
- **'reminder'**: System sends the description text as a notification. NO agent runs. NO tools are called. Use ONLY for passive nudges ("drink water", "take a break", "call mom").
- **'custom'**: System runs a full agent with tools. Use when the task requires checking, searching, reading, or any action. The action_description MUST contain complete instructions for autonomous execution.
- **'check_mail'**: System runs an agent that checks Gmail.
- **'check_calendar'**: System runs an agent that checks Calendar.
- **'check_sheet'**: System runs an agent that reads a spreadsheet.

**NEVER promise to "check" or "look up" something in a reminder.** If the user wants something checked, use action_type 'custom' with a detailed action_description.
**Do NOT say "I'll check your spreadsheet when the reminder fires" if action_type is 'reminder' — that's a lie.**

### Schedule Types
- **interval**: Repeats every N minutes. schedule_value = "30" (minutes). Use for RECURRING tasks: "check mail every 2 hours" → interval 120.
- **daily**: At a specific time every day. schedule_value = "09:00" (24h format, user's timezone)
- **weekly**: Day + time every week. schedule_value = "Friday 17:00"
- **once**: Fire once at a specific date/time. schedule_value = "2026-03-15 14:30" (user's timezone).

### CRITICAL: Use minutes_from_now for relative-time requests
When the user says "in 5 minutes", "in 2 hours", "after 30 min", "in half an hour":
- Set schedule_type: "once"
- Set minutes_from_now: (number of minutes) — the SERVER computes the exact time
- Do NOT calculate or guess the target time yourself
- Examples: "in 5 minutes" → minutes_from_now: 5, "in 2 hours" → minutes_from_now: 120, "in 45 min" → minutes_from_now: 45
- You do NOT need to provide schedule_value when using minutes_from_now

When the user says "at 3pm", "tomorrow at 9am", "on March 15 at 2:30pm":
→ Use schedule_type "once" or "daily" with schedule_value (absolute time).

### Deferred Research Pattern
When the user asks to check something later (delivery status, news, price, etc.):
1. First: search_memory for relevant context (tracking number, order details, etc.)
2. Then: create_schedule with action_type 'custom' and a DETAILED action_description
3. The description must contain: which tool to use, exact search query, what to look for, what to report

### Rules
### REMINDER = create_schedule only
All tasks and reminders go to create_schedule. Do NOT use store_memory for tasks.
- "Remind me at 6pm to call Rahul" → create_schedule only
- "Follow up with vendor about Tata show" → create_schedule only
- "Remind me Friday to send the crew list to PM" → create_schedule only

store_memory is for PERMANENT rules and preferences only (writing style, standing instructions, resource IDs). Never call it for tasks.

### NEVER create new schedules when a reminder fires
If the message starts with "[Scheduled Reminder]" or "[Autonomous Scheduled Task]", you are handling a FIRED reminder — NOT a new user request.
- Do NOT call create_schedule
- Do NOT set new reminders
- For 'reminder' type jobs: just acknowledge the reminder text and stop. Do not add commentary.
- For 'custom' type jobs: execute the task using the appropriate tools, then stop.
- Just execute the task or deliver the notification and stop

### CRITICAL: You CANNOT create documents, write essays, send emails, or perform workspace actions
You are a SCHEDULER ONLY. You have NO access to create_doc, write_sheet, send_email, or any workspace tools.
If you see earlier messages in the conversation about writing an essay, creating a document, or any task you cannot complete:
- DO NOT acknowledge or promise those actions
- DO NOT say "Now creating your document…" or "I'll write that essay…"  
- DO NOT pretend to complete tasks from earlier in the thread that are not in the current user message
- ONLY respond to the CURRENT user message — ignore unfinished workspace requests in thread history
- If you see an unfinished workspace task, say: "I've set up your reminder. To write the document, please ask me again and I'll make sure it gets done."

- Always confirm what you created: name, type, time, action
- If user says "stop" or "done" for a reminder, use update_schedule_state → completed
- Convert user's timezone to schedule correctly
- Be concise — confirm the schedule and move on`;case"workspace":return`You are ${n}, handling Google Workspace operations for the user.

${l}${o}${i}

## NON-NEGOTIABLE RULES
1. **ALWAYS call the appropriate tool immediately.** Never say "Let me check" or "I'll look into that" as a standalone response. Call the tool FIRST, then respond with results.
2. **If the user asks to check Gmail, call gmail_list or gmail_search RIGHT NOW.** Do NOT respond with text saying you will check — just do it.
3. **Check memory FIRST** for sheet/doc IDs — never ask user for IDs you already know.
4. **If Google not connected or token expired**: tell user "Your Google connection has expired. Please reconnect in Settings → Keys → Google Workspace."
5. **NEVER claim you fixed, wrote, or changed data based on a previous conversation's tool results.** Every new user message is a new turn. If the user asks you to fix something, YOU must call the tools yourself in THIS turn — reading the current data, writing the fix, and verifying the result. Referencing what a previous turn's tools returned is NOT the same as calling them now.
6. **VERIFY after writes.** When you use write_sheet to fix or update multiple cells, call read_sheet afterward to confirm the data landed correctly. Report what you actually see, not what you intended to write.
7. **NEVER promise a follow-up action you are not executing in this turn.** If the user asks you to do two things, do BOTH in this turn using multiple tool calls. Do NOT say "I'll create the doc now" at the end of a response — that means you didn't create it. If you said you would create it, you must have already called create_doc in this turn.

## Your Job
Manage Google Sheets, Docs, Drive, Calendar, and Gmail.

### Sheets
- **read_sheet**: Read data. Use plain range "A1:Z500". Response includes ALL tab names.
- **write_sheet / append_sheet**: Write data. Supports formulas (=SUM, =SUMIF, etc.)
- **create_sheet**: Create new spreadsheet with optional tabs and folder placement.
- Multi-tab: Read first tab to discover all tabs, then read the correct one.

### CRITICAL: Read Before Append Rule
**Before calling append_sheet on any existing sheet, you MUST call read_sheet first.** This is mandatory because:
1. **Column order**: You must match the exact column layout. If headers are [Date, Category, Description, Amount, Running Total], your values must follow that order — not your assumption.
2. **Formula continuity**: If the sheet has formula columns (like Running Total with =SUM), you must:
   - Check the last row's formulas by looking at the pattern (e.g., row 5 has "=SUM($D$2:D5)")
   - Include the updated formula for the new row (e.g., "=SUM($D$2:D6)" for row 6)
   - NEVER leave formula columns blank — this breaks running totals.
3. **Numeric values**: Amounts must be plain numbers (e.g., "9443.95"), NEVER with currency symbols or commas ("₹9,443.95" will be stored as text and break SUM formulas).
4. **Row position awareness**: After read_sheet, count the existing data rows to know which row number you're appending to. This matters for formulas that reference row numbers.

**Example workflow for adding an expense:**
1. read_sheet(spreadsheet_id, "Expenses!A1:Z500") → see headers and last row
2. Headers: [Date | Category | Description | Amount | Running Total]
3. Last data row is row 5, Running Total formula: =SUM($D$2:D5)
4. append_sheet with values: [["2026-03-08", "Kava", "Kavafied KAVA Supreme", "9443.95", "=SUM($D$2:D6)"]]

**Date handling**: When adding entries to sheets, use the date from "Today's date for sheets" in the Current User block above — NEVER copy dates from conversation history. Match the format already used in the sheet (e.g., if existing rows use "21 Feb 2026", use that same format).

**Skip read_sheet ONLY when creating a brand-new sheet you just wrote headers to.**

### Fixing Misaligned Sheet Data
When data was written to wrong columns (e.g., 5 values in a 4-column sheet), the extra data spills into columns beyond the headers. When fixing:
1. **Write the correct data** to the proper columns (A through D for a 4-column sheet)
2. **Clear the stale spillover columns** — write empty strings "" to any columns beyond the header range that have leftover data (e.g., write "" to column E if it has old data)
3. **Do both in one write_sheet call** — include the cleanup columns in the range. Example: if headers are A-D but column E has stale data, write to A8:E8 with values ["date", "item", "9443.95", "=SUM($C$2:C8)", ""]

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
- **gmail_send / gmail_draft**: Compose. Prefer drafts for safety. **gmail_draft now supports CC** — use the cc parameter, NEVER put "Cc:" in the body text.
- **gmail_modify**: Archive, trash, star, mark read/unread.
- **Recipient lookup — MANDATORY**: When drafting/sending and you don't have the exact email address, you MUST call gmail_search FIRST (e.g., gmail_search "from:name" or "to:name") to find previous correspondence. Use the real address from results. If CC recipients are mentioned by name, search for their email too. NEVER use placeholder addresses like name@example.com or name@domain.com. If search finds nothing, tell the user you couldn't find the address.

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

### Response Style — CRITICAL
- **Answer the question asked, not everything you found.** "Who is on sound at JBT Museum?" → "Sandeep." NOT a list of all venues and all crews.
- **No narration.** Never say "Looking at the data...", "I found that...", "Let me check...". Just give the answer.
- **No unrequested context.** If user asks about JBT Museum, don't volunteer JBT and TET info.
- **Scope vocabulary:** "crew" = names only. "schedule" = names + call time. "details" = everything.
- **No bold, no headers, no emojis** unless the user's personality prompt requests them.
- **1-3 sentences for factual answers.** Longer only if the user asks for analysis or explanation.
- **Email confirmations must be SHORT.** When you draft or send an email, confirm with ONLY: "Draft saved. Subject: [subject]. To: [recipient]." Do NOT repeat the email body back. The user already knows what they wrote — they just need confirmation it's done.
  - Example: "Draft saved. Subject: Electrical System Failure at Tata Theatre. To: kale@ncpa.org."
  - NOT: "Here's what I wrote: Dear Mr. Kale, We experienced a significant... [full body]"`;case"research":return`You are ${n}, handling information retrieval for the user.

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

### HONESTY RULE — NEVER FABRICATE
If search results do NOT contain the specific information requested (e.g., order status, delivery date, tracking details), say so plainly. NEVER infer, guess, or fabricate a status.
- If web_search returns generic help pages instead of actual tracking data → "Couldn't retrieve order-specific status. Amazon/[site] requires login to track orders."
- If results mention the product but not the specific order → report what you found, flag what's missing.
- NEVER say "package is processing" or "delivery expected on [date]" unless that exact information appears in the search results.

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

### Response Style
- **Answer first, then source.** "KAVA shipped via DTDC, expected March 10. (Source: dtdc.in)"
- **No narration.** Never say "I searched for...", "Let me look up...". Just the answer.
- **Match the question's scope.** "delivery status" = status + ETA. "full tracking history" = everything.
- **1-3 sentences for factual answers.** Longer only for deep research requests.`;case"memory":return`You are ${n}, managing the user's memory and system status.

${l}${o}${i}

## NON-NEGOTIABLE RULES
1. **ALWAYS call the appropriate tool immediately.** When user says "remember X", call store_memory RIGHT NOW.
2. **Deduplicate**: If updating existing info, use the same title — it updates in place.
3. **Memory is for PERMANENT rules and preferences ONLY.** Writing style, standing instructions, frequently-used resource IDs, behavioural rules. NOT for tasks, reminders, or one-off facts.

## Your Job
Store and recall PERMANENT information the user wants Ruby to always know.

### Tools
- **store_memory**: Save permanent preferences, rules, or standing references. Parameters:
  - type: preference | context | fact
  - title: Short key (e.g., "Budget Sheet ID", "Default Email Format", "Writing Style")
  - content: The permanent rule or reference
  - importance: 1-10. Use 7+ for working memory (always in prompt). Use 5- for long-term archive.
- **search_memory**: Find previously stored info by keyword.
- **get_system_status**: Active schedules, memory count, messages, errors.

### What NOT to store in memory
- Tasks or follow-ups → tell user to use the scheduler (create_schedule)
- One-off facts (order numbers, delivery status, single dates) → do not store
- Anything that won't be relevant in 6 months → do not store

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
- Be concise — confirm what was stored/found`;case"conversation":return`You are ${n} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic.

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
- Time-aware: reference current date/time when relevant`;default:return""}}const hs=2e3,gs=2e3,er=4;function Ot(e){return Math.ceil(e.length/er)}function Jt(e,t){const a=t*er;return e.length<=a?e:e.slice(0,a)+`
[...truncated to fit token budget]`}function wt(e){const t=[];for(const a of e)t.length>0&&t[t.length-1].role===a.role&&a.role!=="system"?t[t.length-1]={...t[t.length-1],content:t[t.length-1].content+`

`+a.content}:t.push(a);return t}const bt=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes, daily = at a specific time (HH:MM), weekly = day of week at time (e.g. "Friday 17:00"), once = specific date and time (e.g. "2026-03-12 14:30")'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'PREFERRED for relative-time requests like "in 5 minutes", "in 2 hours". Set schedule_type to "once" and provide this instead of schedule_value. The server will compute the exact time. Examples: "in 5 minutes" = 5, "in 2 hours" = 120, "in half an hour" = 30.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:'Store a PERMANENT rule, preference, or standing instruction that Ruby should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts (orders, deliveries, single events) — those go to create_schedule. Ask yourself: "Will this still be relevant in 6 months?" If no, do not store it.',parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. STRICT RULES — violating any of these is a critical error: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm. (2) NEVER fabricate email body content. Only use data you retrieved from tools in this same conversation. If you do not have the actual content (costs, numbers, details), do NOT call this — tell the user exactly what information is missing and ask them to provide it. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets. Use for quick facts, links, current events, prices. Fast (~1s), no API key.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:'Deep web research — searches, reads up to 5 pages, and synthesizes a detailed report with sources. Use when user needs analysis, comparisons, fact-checking, thorough answers, or asks you to "research" something. Returns a compiled report with citations (~10-20s).',parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Is Abacus AI good for agentic tool calls?", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}}];function tr(e,t){const a=e.assistant_name||"Karna",r=e.personality_prompt?Jt(`## Personality Instructions
${e.personality_prompt}
`,hs):"",s=Jt(t,gs);return`You are ${a} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic. Your name is ${a} — always refer to yourself by this name if asked.

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

${s}

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
- store_memory — Store PERMANENT rules and preferences only. Things that shape every conversation: writing style, standing instructions, frequently-used resource IDs. NOT for tasks, reminders, or one-off facts.
- search_memory — Recall previously stored permanent info.
- create_schedule / list_schedules / toggle_schedule — ALL tasks, reminders, follow-ups, and one-off or recurring actions go here — not into memory.

**Memory vs Schedule — the hard rule:**
- "Always check Outlook for meetings" → store_memory (permanent rule)
- "Use this spreadsheet ID for events" → store_memory (standing reference)
- "Remind me at 6pm to call Rahul" → create_schedule only
- "Follow up with vendor about Tata show" → create_schedule only
- "Note: Kava order placed" → do NOT store anywhere — transient fact, no lasting value
- **"[action]. Task" pattern** — when the user appends "Task" or "as a task", create a schedule with schedule_type="once" at a reasonable near-future time with action_type="reminder". Do NOT store in memory.

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
- **Important**: When you create a doc or sheet, you automatically remember its ID. So when the user later says "add to my budget sheet", check memory for the spreadsheet ID — don't ask them for it.

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

### Response Style
- Be concise but human. Never robotic.
- **CRITICAL: Never respond with just "Let me check" or "I'll look into that" without calling a tool.** If the user asks you to check something, call the tool IMMEDIATELY in the same turn. Your response should contain the actual results, not a promise to look.
- Don't announce tool usage — just do it and present results naturally.
- If a tool fails, explain simply and suggest alternatives.
- When the user's request involves multiple steps, execute them all and present the combined result.
- When confirming ambiguity, be brief and offer the most likely option first: "Add Uber ₹700 to your Monthly Budget?" not a long explanation.
- After the user confirms a pattern, store it and never ask about that pattern again.

## Current Date & Time
${_t(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.`}async function Vt(e,t,a){var l;const s=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${a.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let n;((l=s.files)==null?void 0:l.length)>0?n=s.files[0].id:n=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:a,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const c=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${n}&removeParents=${c}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:n,folderName:a}}function _t(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}function fs(e){const t=e.replace(/(\d+)\s*[.,;!]+\s*(minutes?|mins?|hours?|hrs?|h|days?|seconds?|secs?)/gi,"$1 $2"),a=t.toLowerCase().trim(),r=a.match(/\bin\s+(\d+)\s*(minutes?|mins?|hours?|hrs?|h|days?)\b/i);if(r){let o=parseInt(r[1],10);const i=r[2].toLowerCase();i.startsWith("h")&&(o*=60),i.startsWith("d")&&(o*=1440);const c=t.match(/(?:to|about|that)\s+(.+?)\.?$/i);let l;c?l=c[1].trim():l=t.replace(/^(remind|alert|notify|tell|ping|nudge|buzz)\s*(me)?\s*/i,"").replace(/in\s+\d+\s*\.?\s*(minutes?|mins?|hours?|hrs?|h|days?)\s*/i,"").replace(/^[,.\s]+|[,.\s]+$/g,"").trim()||"Reminder";const d=l.length>50?l.substring(0,47)+"...":l;return{args:{name:d.charAt(0).toUpperCase()+d.slice(1),description:l,schedule_type:"once",minutes_from_now:o,action_type:"reminder",action_description:l,schedule_value:""}}}const s=a.match(/(?:at|by)\s+(\d{1,2})[:.]?(\d{2})?\s*(am|pm|a\.m\.|p\.m\.)?/i);if(s){let o=parseInt(s[1],10);const i=s[2]?parseInt(s[2],10):0,c=(s[3]||"").replace(/\./g,"").toLowerCase();c==="pm"&&o<12&&(o+=12),c==="am"&&o===12&&(o=0);const l=t.match(/(?:to|about|that)\s+(.+?)\.?$/i);let d;l?d=l[1].trim():d=t.replace(/^(remind|alert|notify|tell|ping|nudge|buzz)\s*(me)?\s*/i,"").replace(/(?:at|by)\s+\d{1,2}[:.]?\d{0,2}\s*(am|pm|a\.m\.|p\.m\.)?\s*/i,"").replace(/^[,.\s]+|[,.\s]+$/g,"").trim()||"Reminder";const p=d.length>50?d.substring(0,47)+"...":d,g=new Date,v=g.getFullYear(),f=String(g.getMonth()+1).padStart(2,"0"),E=String(g.getDate()).padStart(2,"0"),b=`${v}-${f}-${E} ${String(o).padStart(2,"0")}:${String(i).padStart(2,"0")}`;return{args:{name:p.charAt(0).toUpperCase()+p.slice(1),description:d,schedule_type:"once",schedule_value:b,action_type:"reminder",action_description:d}}}const n=a.match(/^(remind|alert|notify)\s+me\s+(?:to|about|that)\s+(.+?)\.?$/i);if(n){const o=n[2].trim(),i=o.length>50?o.substring(0,47)+"...":o;return{args:{name:i.charAt(0).toUpperCase()+i.slice(1),description:o,schedule_type:"once",minutes_from_now:5,action_type:"reminder",action_description:o,schedule_value:""}}}return null}async function Be(e,t,a,r,s,n,o,i,c,l,d,p){const g=Date.now();let v=!0,f="",E="";try{return E=await ys(e,t,a,r,n,o,i,c,l,d,p),E}catch(b){throw v=!1,f=b.message||"Unknown error",b}finally{const b=Date.now()-g;try{await a.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(r,s.agentType||null,s.providerName||null,e,JSON.stringify(t).substring(0,2e3),(v?E:"").substring(0,500),v?1:0,f||null,b,s.isEnforcementRetry?1:0,s.channel||"web").run()}catch{}}}async function ys(e,t,a,r,s,n,o,i,c,l,d){var g,v,f,E,b,T;const p=new X(a);switch(e){case"create_schedule":{const u=new Date;let h;const m=l||"UTC";if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){h=new Date(u.getTime()+t.minutes_from_now*60*1e3);const x=h.toLocaleString("en-US",{timeZone:m,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[I,L,S]=(x[0]||"").split("/");t.schedule_value=`${S}-${I}-${L} ${x[1]||"00:00"}`,t.schedule_type="once"}else if(t.schedule_type==="interval"){const k=parseInt(t.schedule_value,10);h=new Date(u.getTime()+k*60*1e3)}else if(t.schedule_type==="daily"){const[k,x]=t.schedule_value.split(":").map(Number),I=u.toLocaleString("en-US",{timeZone:m}),L=new Date(I),S=new Date(L);S.setHours(k,x,0,0),S<=L&&S.setDate(S.getDate()+1);const C=new Date(S.toLocaleString("en-US",{timeZone:"UTC"})),R=new Date(S.toLocaleString("en-US",{timeZone:m})),$=C.getTime()-R.getTime();h=new Date(S.getTime()+$)}else if(t.schedule_type==="weekly"){const[k,x]=t.schedule_value.split(" "),[I,L]=(x||"00:00").split(":").map(Number),C=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Re=>Re.toLowerCase()===k.toLowerCase()),R=u.toLocaleString("en-US",{timeZone:m}),$=new Date(R),j=new Date($);j.setHours(I,L,0,0);let M=(C-j.getDay()+7)%7;M===0&&j<=$&&(M=7),j.setDate(j.getDate()+M);const z=new Date(j.toLocaleString("en-US",{timeZone:"UTC"})),ae=new Date(j.toLocaleString("en-US",{timeZone:m})),ne=z.getTime()-ae.getTime();h=new Date(j.getTime()+ne)}else if(t.schedule_type==="once"){const[k,x]=t.schedule_value.split(" "),[I,L,S]=k.split("-").map(Number),[C,R]=(x||"00:00").split(":").map(Number),$=u.toLocaleString("en-US",{timeZone:m}),j=new Date($),M=new Date(j);M.setFullYear(I,L-1,S),M.setHours(C,R,0,0);const z=new Date(M.toLocaleString("en-US",{timeZone:"UTC"})),ae=new Date(M.toLocaleString("en-US",{timeZone:m})),ne=z.getTime()-ae.getTime();h=new Date(M.getTime()+ne);const Re=new Date(u.getTime()+120*1e3);if(h.getTime()<u.getTime()+60*1e3){const De=h.toISOString();h=Re;const ir=` [Note: The requested time ${t.schedule_value} in ${m} resolved to ${De} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${h.toISOString()}.]`;t._pastTimeWarning=ir}}else h=new Date(u.getTime()+3600*1e3);await a.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(r,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),h.toISOString()).run();const y=t._pastTimeWarning||"",_=h.toLocaleString("en-US",{timeZone:m,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${t.name}" — ${t.schedule_type}. Will fire at ${_} (${m}). [UTC: ${h.toISOString()}]${y}. IMPORTANT: Use the exact time "${_}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const h=(await a.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(r).all()).results||[];return h.length===0?"No scheduled tasks found.":h.map(m=>`[ID:${m.id}] ${m.enabled?"▶":"⏸"} "${m.name}" — [${m.schedule_type}] ${m.schedule_value} — ${m.action_type} — state: ${m.state||"active"} — next: ${m.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const u=t.enabled?1:0,h=u?"active":"paused";return await a.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,h,t.job_id,r).run(),`Schedule ${t.job_id} ${u?"enabled (active)":"paused"}.`}case"update_schedule_state":{const u=["created","active","reminding","paused","completed"],h=t.state;if(!u.includes(h))return`Invalid state "${h}". Valid states: ${u.join(", ")}`;const m=h==="completed"||h==="paused"?0:1;return await a.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(h,m,t.job_id,r).run(),`Schedule ${t.job_id} state updated to "${h}".`}case"delete_schedule":return await a.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,r).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const u=t.importance||5,h=t.type==="task"?"preference":t.type,m=u>=7?"working":"long_term";return await p.store(r,h,t.title,t.content,u,m),`Stored in ${m==="working"?"working":"long-term"} memory: [${h}] ${t.title} (importance: ${u})`}case"search_memory":{const u=await p.search(r,t.query);return u.length===0?"No matching memories found.":u.map(h=>`[${h.tier||"long_term"}] [${h.type}] **${h.title}**: ${h.content}`).join(`
`)}case"get_system_status":{const u=await a.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),h=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),m=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(r).first(),y=await a.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),_=await a.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first();return`System Status:
- Active schedules: ${(u==null?void 0:u.cnt)||0}
- Memory: ${(m==null?void 0:m.cnt)||0} working / ${(h==null?void 0:h.cnt)||0} total
- Total messages: ${(y==null?void 0:y.cnt)||0}
- Unread errors: ${(_==null?void 0:_.cnt)||0}`}case"read_sheet":{if(!s)return"Authentication context unavailable.";try{const u=new re(a,r,s,n||"",o||""),h=t.spreadsheet_id;let m=t.range;const y=await u.sheets.getMetadata(h),_=y.sheets;m.includes("!")||(m=`${_[0]}!${m}`);let k;try{k=await u.sheets.readRange(h,m)}catch(I){if((g=I.message)!=null&&g.includes("Unable to parse range")||(v=I.message)!=null&&v.includes("400")){const L=m.includes("!")?m.split("!")[1]:m;m=`${_[0]}!${L}`,k=await u.sheets.readRange(h,m)}else throw I}let x=`[Spreadsheet: "${y.title}" | Reading tab: "${m.split("!")[0]}" | All tabs in this spreadsheet: ${_.map(I=>`"${I}"`).join(", ")}]
`;return _.length>1&&(x+=`[To read a different tab, call read_sheet again with range like "${_[1]}!A1:Z500"]
`),k.length===0?x+"No data found in the specified range.":x+k.map(I=>I.join("	| ")).join(`
`)}catch(u){return await N(a,r,"google","read_sheet",u.message),`Failed to read sheet: ${u.message}`}}case"write_sheet":{if(!s)return"Authentication context unavailable.";try{const u=new re(a,r,s,n||"",o||""),h=t.values;let m=t.range;const k=Math.max(...h.map(S=>S.length))+4,x=h.map(S=>{const C=[...S];for(;C.length<k;)C.push("");return C}),I=m.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(I){const S=I[1]||"",C=I[2],R=I[3],$=I[5],M=C.toUpperCase().charCodeAt(0)-64+k-1,z=M<=26?String.fromCharCode(64+M):"Z";m=`${S}${C}${R}:${z}${$}`}return`Written ${(await u.sheets.writeRange(t.spreadsheet_id,m,x)).updatedCells} cells to ${m}.`}catch(u){return await N(a,r,"google","write_sheet",u.message),`Failed to write sheet: ${u.message}`}}case"append_sheet":{if(!s)return"Authentication context unavailable.";try{return`Appended ${(await new re(a,r,s,n||"",o||"").sheets.appendRows(t.spreadsheet_id,t.range,t.values)).updatedCells} cells to ${t.range}.`}catch(u){return await N(a,r,"google","append_sheet",u.message),`Failed to append to sheet: ${u.message}`}}case"create_sheet":{if(!s)return"Authentication context unavailable.";try{const u=new re(a,r,s,n||"",o||"");if(!(await u.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const m=await u.sheets.createSpreadsheet(t.title,t.sheet_names);let y="";if(t.folder_name)try{const{token:_}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(a,r,s,n||"",o||"");y=`
Folder: "${(await Vt(_,m.spreadsheetId,t.folder_name)).folderName}"`}catch(_){y=`
(Could not move to folder "${t.folder_name}": ${_.message})`}try{await new X(a).store(r,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${m.spreadsheetId} | URL: ${m.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${y}
ID: ${m.spreadsheetId}
URL: ${m.url}`}catch(u){return await N(a,r,"google","create_sheet",u.message),`Failed to create spreadsheet: ${u.message}`}}case"list_calendar_events":{if(!s)return"Authentication context unavailable.";try{const u=new re(a,r,s,n||"",o||""),h=t.calendar_id||"primary",m=t.days_ahead||7,y=new Date,_=new Date(y.getTime()+m*24*60*60*1e3),k=await u.calendar.listEvents(h,{timeMin:y.toISOString(),timeMax:_.toISOString(),query:t.query});return k.length===0?`No events found in the next ${m} days.`:k.map(x=>{var R;const I=x.start.dateTime||x.start.date||"TBD",L=x.end.dateTime||x.end.date||"",S=x.location?` 📍 ${x.location}`:"",C=((R=x.attendees)==null?void 0:R.map($=>$.email).join(", "))||"";return`• ${x.summary} — ${I} to ${L}${S}${C?`
  Attendees: ${C}`:""}`}).join(`
`)}catch(u){return await N(a,r,"google","list_calendar",u.message),`Failed to list events: ${u.message}`}}case"create_calendar_event":{if(!s)return"Authentication context unavailable.";try{const u=new re(a,r,s,n||"",o||""),h=t.calendar_id||"primary",m=await u.calendar.createEvent(h,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});return`Event created: "${m.summary}"
ID: ${m.id}
Start: ${m.start.dateTime||m.start.date}`}catch(u){return await N(a,r,"google","create_event",u.message),`Failed to create event: ${u.message}`}}case"create_doc":{if(!s)return"Authentication context unavailable.";try{const u=new re(a,r,s,n||"",o||"");if(!(await u.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const m=await u.docs.createDocument(t.title);t.content&&await u.docs.appendText(m.documentId,t.content);let y="";if(t.folder_name)try{const{token:_}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(a,r,s,n||"",o||"");y=`
Folder: "${(await Vt(_,m.documentId,t.folder_name)).folderName}"`}catch(_){y=`
(Could not move to folder "${t.folder_name}": ${_.message})`}try{await new X(a).store(r,"context",`Document: ${t.title}`,`Document ID: ${m.documentId} | URL: ${m.url}`,6,"working")}catch{}return`Document created: "${t.title}"${y}
ID: ${m.documentId}
URL: ${m.url}`}catch(u){return await N(a,r,"google","create_doc",u.message),`Failed to create document: ${u.message}`}}case"read_doc":{if(!s)return"Authentication context unavailable.";try{const h=await new re(a,r,s,n||"",o||"").docs.readDocument(t.document_id);return`Document: "${h.title}"

${h.content}`}catch(u){return await N(a,r,"google","read_doc",u.message),`Failed to read document: ${u.message}`}}case"append_to_doc":{if(!s)return"Authentication context unavailable.";try{const u=new re(a,r,s,n||"",o||"");if(!(await u.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.';await u.docs.appendText(t.document_id,t.content);let m=t.document_id;try{m=(await u.docs.readDocument(t.document_id)).title}catch{}return`Content appended to "${m}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(u){return await N(a,r,"google","append_to_doc",u.message),`Failed to append to document: ${u.message}`}}case"gmail_list":{if(!s)return"Authentication context unavailable.";try{const h=await new ie(a,r,s,n||"",o||"").listMessages({maxResults:t.max_results||10,query:t.query});return h.length===0?"No messages found.":h.map((m,y)=>`${m.isUnread?"● ":"  "}${y+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(u){return await N(a,r,"gmail","list",u.message),(f=u.message)!=null&&f.includes("not connected")?u.message:`Gmail list error: ${u.message}`}}case"gmail_read":{if(!s)return"Authentication context unavailable.";try{const u=new ie(a,r,s,n||"",o||""),h=await u.getMessage(t.message_id);if(!h)return"Message not found.";const m=await u.getMessageBody(t.message_id);return`**${h.subject}**
From: ${h.from}
To: ${h.to}
Date: ${h.date}

${m}`}catch(u){return await N(a,r,"gmail","read",u.message),`Gmail read error: ${u.message}`}}case"gmail_search":{if(!s)return"Authentication context unavailable.";try{const h=await new ie(a,r,s,n||"",o||"").search(t.query,t.max_results||10);return h.length===0?`No results for: ${t.query}`:h.map((m,y)=>`${m.isUnread?"● ":"  "}${y+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(u){return await N(a,r,"gmail","search",u.message),`Gmail search error: ${u.message}`}}case"gmail_send":{if(!s)return"Authentication context unavailable.";try{const h=await new ie(a,r,s,n||"",o||"").send(t.to,t.subject,t.body,{cc:t.cc});return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${h.id}]`}catch(u){return await N(a,r,"gmail","send",u.message),`Gmail send error: ${u.message}`}}case"gmail_draft":{if(!s)return"Authentication context unavailable.";try{const h=await new ie(a,r,s,n||"",o||"").createDraft(t.to,t.subject,t.body,{cc:t.cc}),m=t.cc?`, CC: ${t.cc}`:"";return`Draft created. To: ${t.to}${m}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${h.id}]`}catch(u){return await N(a,r,"gmail","draft",u.message),`Gmail draft error: ${u.message}`}}case"gmail_modify":{if(!s)return"Authentication context unavailable.";try{return await new ie(a,r,s,n||"",o||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(u){return await N(a,r,"gmail","modify",u.message),`Gmail modify error: ${u.message}`}}case"gmail_unread_count":{if(!s)return"Authentication context unavailable.";try{const h=await new ie(a,r,s,n||"",o||"").getUnreadCount();return`You have ${h} unread email${h!==1?"s":""} in Gmail.`}catch(u){return(E=u.message)!=null&&E.includes("not connected")?u.message:`Gmail error: ${u.message}`}}case"drive_list":{if(!s)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(a,r,s,n||"",o||""),h=new URLSearchParams;h.set("pageSize",String(t.max_results||10)),h.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),h.set("orderBy","modifiedTime desc");let m="";t.folder_id?m=`'${t.folder_id}' in parents and trashed = false`:t.query?m=`${t.query} and trashed = false`:m="trashed = false",h.set("q",m);const y=await fetch(`https://www.googleapis.com/drive/v3/files?${h}`,{headers:{Authorization:`Bearer ${u}`}});if(!y.ok)throw new Error(`Drive API error (${y.status})`);const _=await y.json();return(b=_.files)!=null&&b.length?_.files.map((k,x)=>{var C,R;const I=((C=k.mimeType)==null?void 0:C.split(".").pop())||k.mimeType,L=k.size?`${(parseInt(k.size)/1024).toFixed(1)} KB`:"",S=((R=k.modifiedTime)==null?void 0:R.split("T")[0])||"";return`${x+1}. **${k.name}** (${I})
   ${L} · Modified: ${S}
   ${k.webViewLink||""}`}).join(`

`):"No files found."}catch(u){return await N(a,r,"google","drive_list",u.message),`Drive list error: ${u.message}`}}case"drive_search":{if(!s)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(a,r,s,n||"",o||""),h=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,m=new URLSearchParams;m.set("q",h),m.set("pageSize",String(t.max_results||10)),m.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),m.set("orderBy","modifiedTime desc");const y=await fetch(`https://www.googleapis.com/drive/v3/files?${m}`,{headers:{Authorization:`Bearer ${u}`}});if(!y.ok)throw new Error(`Drive API error (${y.status})`);const _=await y.json();return(T=_.files)!=null&&T.length?_.files.map((k,x)=>{var S,C;const I=((S=k.mimeType)==null?void 0:S.split(".").pop())||k.mimeType,L=((C=k.modifiedTime)==null?void 0:C.split("T")[0])||"";return`${x+1}. **${k.name}** (${I}) — Modified: ${L}
   ${k.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(u){return await N(a,r,"google","drive_search",u.message),`Drive search error: ${u.message}`}}case"web_search":try{const u=await vt(t.query,{num:t.num_results||5,site:t.site});return u.error?`Web search failed: ${u.error}`:u.results.length===0?`No results found for "${t.query}".`:u.results.map((h,m)=>`${m+1}. **${h.title}**
   ${h.link}
   ${h.snippet}`).join(`

`)}catch(u){return await N(a,r,"search","web_search",u.message),`Web search error: ${u.message}`}case"read_url":try{const u=t.url;if(!u||!u.startsWith("http://")&&!u.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const h=Math.min(t.max_length||8e3,15e3),{fetchPageContent:m}=await Promise.resolve().then(()=>us),y=await m(u,h);return y.error?`Failed to read page: ${y.error}`:!y.text||y.text.length<20?`Page at ${u} returned no readable content.`:`Content from ${u} (${y.text.length} chars):

${y.text}`}catch(u){return await N(a,r,"search","read_url",u.message),`Read URL error: ${u.message}`}case"research":{if(!d)return"Research tool requires an LLM provider but none is available.";try{const h=Xa(t.query,d,{depth:t.depth||"quick",site:t.site}),m=new Promise(k=>setTimeout(()=>k(null),45e3)),y=await Promise.race([h,m]);if(y===null){const{webSearch:k}=await Promise.resolve().then(()=>os),x=await k(t.query,{num:5});if(x.error||x.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let I=`Research took too long, but here are the top search results:

`;return I+=x.results.map((L,S)=>`${S+1}. **${L.title}**
   ${L.snippet}
   ${L.link}`).join(`

`),I}if(y.error)return`Research failed: ${y.error}`;let _=y.report;return y.sources.length>0&&(_+=`

---
**Sources** (`+y.pagesRead+` pages read):
`,_+=y.sources.map((k,x)=>`[${x+1}] ${k.title}
    ${k.url}`).join(`
`)),_}catch(u){return await N(a,r,"research","research",u.message),`Research error: ${u.message}`}}case"search_places":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const h=await U(u.encrypted_value,s),m=await Ga(h,t.query,{type:t.type});return m.error?`Places search failed: ${m.error}`:m.results.length===0?`No places found for "${t.query}".`:m.results.map((y,_)=>{const k=y.rating?` ★${y.rating} (${y.userRatingsTotal||0} reviews)`:"",x=y.openNow!==void 0?y.openNow?" · Open now":" · Closed":"",I=y.googleMapsUri?`
   ${y.googleMapsUri}`:"";return`${_+1}. **${y.name}**${k}${x}
   ${y.address}${I}
   [place_id: ${y.placeId}]`}).join(`

`)}catch(u){return await N(a,r,"google_api","search_places",u.message),`Places search error: ${u.message}`}}case"get_place_details":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const h=await U(u.encrypted_value,s),m=await Fa(h,t.place_id);if(m.error)return`Details lookup failed: ${m.error}`;if(!m.details)return"No details found.";const y=m.details;let _=`**${y.name}**
📍 ${y.address}`;if(y.phone&&(_+=`
📞 ${y.phone}`),y.website&&(_+=`
🌐 ${y.website}`),y.rating&&(_+=`
★ ${y.rating}`),y.googleMapsUri&&(_+=`
📌 ${y.googleMapsUri}`),y.openingHours&&(_+=`

Opening Hours:
${y.openingHours.join(`
`)}`),y.reviews&&y.reviews.length>0){_+=`

Recent Reviews:`;for(const k of y.reviews)_+=`
— ${k.author} (★${k.rating}, ${k.time}): "${k.text}"`}return _}catch(u){return await N(a,r,"google_api","place_details",u.message),`Place details error: ${u.message}`}}case"get_directions":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const h=await U(u.encrypted_value,s),m=await Wa(h,t.origin,t.destination,{mode:t.mode||"driving"});if(m.error)return`Directions failed: ${m.error}`;if(!m.route)return"No route found.";const y=m.route;let _=`**${y.startAddress}** → **${y.endAddress}**
`;return _+=`📏 ${y.distance} · ⏱️ ${y.duration}`,y.durationInTraffic&&(_+=` (with traffic: ${y.durationInTraffic})`),_+=`
via ${y.summary}`,_+=`

Steps:`,y.steps.forEach((k,x)=>{_+=`
${x+1}. ${k.instruction} (${k.distance}, ${k.duration})`}),_}catch(u){return await N(a,r,"google_api","directions",u.message),`Directions error: ${u.message}`}}case"get_travel_time":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const h=await U(u.encrypted_value,s),m=await Ya(h,t.origin,t.destination,t.mode||"driving");if(m.error)return`Travel time lookup failed: ${m.error}`;let y=`${t.origin} → ${t.destination}: ${m.distance}, ${m.duration}`;return m.durationInTraffic&&(y+=` (with traffic: ${m.durationInTraffic})`),y}catch(u){return await N(a,r,"google_api","travel_time",u.message),`Travel time error: ${u.message}`}}case"translate_text":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const h=await U(u.encrypted_value,s),m=await za(h,t.text,t.target_language,t.source_language);return m.error?`Translation failed: ${m.error}`:`[${m.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${m.translatedText}`}catch(u){return await N(a,r,"google_api","translate",u.message),`Translation error: ${u.message}`}}case"search_youtube":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const h=await U(u.encrypted_value,s),m=await Ka(h,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return m.error?`YouTube search failed: ${m.error}`:m.results.length===0?`No YouTube results for "${t.query}".`:m.results.map((y,_)=>{var k;return`${_+1}. **${y.title}**
   ${y.channelTitle} · ${((k=y.publishedAt)==null?void 0:k.split("T")[0])||""}
   ${y.description}
   ${y.url}`}).join(`

`)}catch(u){return await N(a,r,"google_api","youtube_search",u.message),`YouTube search error: ${u.message}`}}case"geocode_address":{if(!s)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const h=await U(u.encrypted_value,s),m=await qa(h,t.address);return m.error?`Geocoding failed: ${m.error}`:m.results.length===0?`Location not found: "${t.address}"`:m.results.map((y,_)=>`${_+1}. ${y.address}
   Coordinates: ${y.lat}, ${y.lng}`).join(`
`)}catch(u){return await N(a,r,"google_api","geocode",u.message),`Geocoding error: ${u.message}`}}default:return`Unknown tool: ${e}`}}async function Xt(e,t,a,r,s,n){var u;const o=new X(t),i=(u=e.metadata)==null?void 0:u.thread_id,c=await o.buildContext(r.id),l=await o.getRecentConversations(r.id,25,i),d=tr(r,c),p=wt([{role:"system",content:d},...l.map(h=>({role:h.role,content:h.content})),{role:"user",content:e.text}]);await o.storeMessage(r.id,e.channel,"user",e.text,"{}",i);const g=10;let v="",f=0;const E=[];for(let h=0;h<g;h++)try{const m=await a.chat(p,{tools:bt});if(m.usage&&(f+=m.usage.promptTokens+m.usage.completionTokens),m.toolCalls&&m.toolCalls.length>0){m.content&&p.push({role:"assistant",content:m.content});for(const y of m.toolCalls){E.push(y.name);try{const _=await Be(y.name,y.arguments,t,r.id,{agentType:"full",providerName:a.name,channel:e.channel},r.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,r.timezone,a);p.push({role:"user",content:`[Tool Result for ${y.name}]: ${_}`})}catch(_){await N(t,r.id,"tool",y.name,_.message||"Tool execution failed"),p.push({role:"user",content:`[Tool Error for ${y.name}]: ${_.message||"Execution failed"}`})}}continue}v=m.content;break}catch(m){if(s){const y=m.message||"",_=y.includes("401")||y.includes("403")||y.includes("authentication")||y.includes("credit balance"),k=y.includes("429"),x=_?1440:k?10:5;await s.recordError(a.name,y,x)}throw await N(t,r.id,"llm","provider_error",m.message||"Unknown LLM error",{provider:a.name,turn:h}),m}if(s&&f>0)try{await s.recordUsage(a.name,f)}catch{}const b=v.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,""),T=E.length>0?`[TOOLS_USED: ${[...new Set(E)].join(", ")}] `:"";return await o.storeMessage(r.id,e.channel,"assistant",T+b,"{}",i),await o.compactHistory(r.id,30),v}const Zt={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function vs(e){for(const[t,a]of Object.entries(Zt))if(e.toLowerCase().includes(t.toLowerCase()))return a;return Zt.default}function ws(e,t,a,r){const s=vs(r),n=Math.floor(s*.75),o=[];let i=0,c=!1;const l=Ot(e);o.push({role:"system",content:e}),i+=l;const d=Ot(a);i+=d;const p=n-i,g=[];let v=0;for(let f=t.length-1;f>=0;f--){const E=t[f],b=Ot(E.content);if(v+b<=p)g.unshift({role:E.role,content:E.content}),v+=b;else{c=!0;break}}return o.push(...g),o.push({role:"user",content:a}),i+=v,{maxTokens:s,usedTokens:i,messages:o,wasTruncated:c}}async function*bs(e,t,a,r,s,n){var b;const o=new X(t),i=(b=e.metadata)==null?void 0:b.thread_id;yield{type:"thinking",data:{threadId:i,provider:a.name}};const c=await o.buildContext(r.id),l=await o.getRecentConversations(r.id,20,i),d=tr(r,c),p=ws(d,l,e.text,a.name);await o.storeMessage(r.id,e.channel,"user",e.text,"{}",i);const g=10;let v="",f=0;const E=[...p.messages];for(let T=0;T<g;T++)try{T>0&&(yield{type:"thinking",data:{threadId:i}});const u=await a.chat(E,{tools:bt});if(u.usage&&(f+=u.usage.promptTokens+u.usage.completionTokens),u.toolCalls&&u.toolCalls.length>0){u.content&&(yield{type:"chunk",data:{text:u.content,threadId:i}},E.push({role:"assistant",content:u.content}));for(const m of u.toolCalls){yield{type:"tool_start",data:{tool:m.name,toolArgs:m.arguments,threadId:i}};try{const y=await Be(m.name,m.arguments,t,r.id,{agentType:"full",providerName:a.name,channel:e.channel},r.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,r.timezone,a);yield{type:"tool_end",data:{tool:m.name,toolResult:y.substring(0,500)+(y.length>500?"...":""),threadId:i}},E.push({role:"user",content:`[Tool Result for ${m.name}]: ${y}`})}catch(y){await N(t,r.id,"tool",m.name,y.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:m.name,toolResult:`Error: ${y.message||"Execution failed"}`,threadId:i}},E.push({role:"user",content:`[Tool Error for ${m.name}]: ${y.message||"Execution failed"}`})}}continue}v=u.content;const h=50;for(let m=0;m<v.length;m+=h)yield{type:"chunk",data:{text:v.substring(m,m+h),threadId:i}},m+h<v.length&&await new Promise(_=>setTimeout(_,10));break}catch(u){if(s){const m=u.message||"",y=m.includes("401")||m.includes("403")||m.includes("authentication")||m.includes("credit balance"),_=m.includes("429"),k=y?1440:_?10:5;await s.recordError(a.name,m,k)}await N(t,r.id,"llm","provider_error",u.message||"Unknown LLM error",{provider:a.name,turn:T});const h=u.message||"An error occurred";try{await o.storeMessage(r.id,e.channel,"assistant",`⚠️ ${h}`,"{}",i)}catch{}yield{type:"error",data:{error:h,threadId:i}};return}if(s&&f>0)try{await s.recordUsage(a.name,f)}catch{}await o.storeMessage(r.id,e.channel,"assistant",v,"{}",i),await o.compactHistory(r.id,30),yield{type:"done",data:{threadId:i,provider:a.name,tokenCount:f}}}async function Ut(e,t,a,r,s,n){var d;const o=new X(t),i=(d=e.metadata)==null?void 0:d.thread_id,c=await o.buildContext(r.id),l=Za(e.text,c);if(l.agent==="conversation")return Es(e,t,a,r,c,s,i);if(l.agent==="multi"||l.confidence<.5)return Xt(e,t,a,r,s,n);try{return await _s(l.agent,e,t,a,r,c,s,n,i)}catch(p){return await N(t,r.id,"router","subagent_fallback",`${l.agent} failed: ${p.message}`,{route:l}),Xt(e,t,a,r,s,n)}}async function _s(e,t,a,r,s,n,o,i,c){const l=new X(a),d=_t(s.timezone),p=ht(e,s,n,s.timezone,d),g=Qa(e,bt),v=(await l.getRecentConversations(s.id,25,c)).filter(S=>!S.content.startsWith("[Autonomous Scheduled Task]")&&!S.content.startsWith("[Scheduled Reminder]")).map(S=>({...S,content:S.content.replace(/^\[TOOLS_USED: [^\]]+\]\s*/i,"")})),f=wt([{role:"system",content:p},...v.map(S=>({role:S.role,content:S.content})),{role:"user",content:t.text}]);await l.storeMessage(s.id,t.channel,"user",t.text,"{}",c);const E=10;let b="",T=0,u="",h=!1;const m=[];for(let S=0;S<E;S++)try{const C=await r.chat(f,{tools:g.length>0?g:void 0});if(C.usage&&(T+=C.usage.promptTokens+C.usage.completionTokens),C.toolCalls&&C.toolCalls.length>0){h=!0,C.content&&(u=C.content,f.push({role:"assistant",content:C.content}));for(const R of C.toolCalls){m.push(R.name);try{const $=await Be(R.name,R.arguments,a,s.id,{agentType:e,providerName:r.name,channel:t.channel},s.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,s.timezone,r);f.push({role:"user",content:`[Tool Result for ${R.name}]: ${$}`})}catch($){await N(a,s.id,"tool",R.name,$.message||"Tool execution failed"),f.push({role:"user",content:`[Tool Error for ${R.name}]: ${$.message||"Execution failed"}`})}}continue}b=C.content,!b&&u&&(b=u);break}catch(C){if(o){const R=C.message||"",$=R.includes("401")||R.includes("403")||R.includes("authentication")||R.includes("credit balance"),j=R.includes("429"),M=$?1440:j?10:5;await o.recordError(r.name,R,M)}throw await N(a,s.id,"llm","subagent_error",C.message||"Unknown error",{agent:e,provider:r.name,turn:S}),C}const y=["scheduler","workspace","research"],_=e==="scheduler"&&!m.includes("create_schedule")&&!m.includes("list_schedules")&&!m.includes("toggle_schedule")&&!m.includes("update_schedule_state")&&!m.includes("delete_schedule")&&/\b(remind|in\s+\d+|at\s+\d{1,2}[:.]\d{0,2}|timer|alarm|schedule|tell\s+me\s+in|notify|alert|ping)\b/i.test(t.text),k=e==="workspace"&&m.includes("read_sheet")&&!m.includes("write_sheet")&&!m.includes("append_sheet")&&/\b(fix|correct|update|change|delete|remove|clean|clear|repair|replace|overwrite|set\s+to|should\s+be|wrong|broken|gap|missing)\b/i.test(t.text);if(!h&&y.includes(e)&&g.length>0||_||k){try{await a.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(s.id,e,r.name,"__enforcement_trigger",JSON.stringify({userMessage:t.text.substring(0,200)}),b.substring(0,200),0,"LLM narrated without calling tools",0,0,t.channel||"web").run()}catch{}try{f.push({role:"assistant",content:b});let S;e==="scheduler"&&_?S=`[SYSTEM OVERRIDE] You called ${m.join(", ")||"no tools"} but did NOT call create_schedule. The user wants a reminder or schedule created. Call create_schedule NOW with the correct parameters. Do NOT respond with text saying a reminder is set — actually create it.`:e==="workspace"&&k?S="[SYSTEM OVERRIDE] You called read_sheet but did NOT call write_sheet. The user asked you to FIX or UPDATE the sheet data. You MUST call write_sheet NOW to make the actual changes. Reading data and then describing what you would fix is NOT the same as fixing it. Call write_sheet with the corrected values, then call read_sheet again to verify the fix landed correctly. Do NOT claim data is fixed without actually writing to the sheet.":S=`[SYSTEM OVERRIDE] You responded with text but did NOT call any tool. This is a ${e} request — you MUST use your tools. Do NOT repeat your text response. Call the appropriate tool NOW (e.g., ${g.slice(0,3).map(R=>R.name).join(", ")}). The user is waiting for an actual action, not a description of what you would do.`,f.push({role:"user",content:S});const C=await r.chat(f,{tools:g});if(C.usage&&(T+=C.usage.promptTokens+C.usage.completionTokens),C.toolCalls&&C.toolCalls.length>0){h=!0;let R=C.toolCalls,$=C.content;for(let j=0;j<5;j++){$&&f.push({role:"assistant",content:$});for(const z of R){m.push(z.name);try{const ae=await Be(z.name,z.arguments,a,s.id,{agentType:e,providerName:r.name,channel:t.channel,isEnforcementRetry:!0},s.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,s.timezone,r);f.push({role:"user",content:`[Tool Result for ${z.name}]: ${ae}`})}catch(ae){f.push({role:"user",content:`[Tool Error for ${z.name}]: ${ae.message||"Execution failed"}`})}}const M=await r.chat(f,{tools:g});if(M.usage&&(T+=M.usage.promptTokens+M.usage.completionTokens),M.toolCalls&&M.toolCalls.length>0){R=M.toolCalls,$=M.content;continue}M.content&&(b=M.content);break}}if(!m.includes("create_schedule")&&e==="scheduler")try{const R=fs(t.text);if(R){const $=await Be("create_schedule",R.args,a,s.id,{agentType:"scheduler",providerName:"programmatic_fallback",channel:t.channel,isEnforcementRetry:!0},s.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,s.timezone,r);h=!0,m.push("create_schedule"),b=$}}catch(R){await N(a,s.id,"tool_enforcement","scheduler_fallback",`Programmatic scheduler fallback failed: ${R.message||"Unknown"}`)}}catch(S){await N(a,s.id,"tool_enforcement",e,`Tool enforcement retry failed: ${S.message||"Unknown"}`,{originalResponse:b.substring(0,200)})}}if(o&&T>0)try{await o.recordUsage(r.name,T)}catch{}const I=b.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,""),L=m.length>0?`[TOOLS_USED: ${[...new Set(m)].join(", ")}] `:"";return await l.storeMessage(s.id,t.channel,"assistant",L+I,"{}",c),await l.compactHistory(s.id,30),b}async function Es(e,t,a,r,s,n,o){const i=new X(t),c=_t(r.timezone),l=ht("conversation",r,s,r.timezone,c),d=(await i.getRecentConversations(r.id,25,o)).filter(f=>!f.content.startsWith("[Autonomous Scheduled Task]")&&!f.content.startsWith("[Scheduled Reminder]")),p=wt([{role:"system",content:l},...d.map(f=>({role:f.role,content:f.content})),{role:"user",content:e.text}]);await i.storeMessage(r.id,e.channel,"user",e.text,"{}",o);let g=0,v="";try{const f=await a.chat(p,{temperature:.8});f.usage&&(g=f.usage.promptTokens+f.usage.completionTokens),v=f.content}catch(f){if(n){const E=f.message||"",b=E.includes("401")||E.includes("403")||E.includes("authentication")||E.includes("credit balance"),T=E.includes("429"),u=b?1440:T?10:5;await n.recordError(a.name,E,u)}throw await N(t,r.id,"llm","conversation_error",f.message,{provider:a.name}),f}if(n&&g>0)try{await n.recordUsage(a.name,g)}catch{}return await i.storeMessage(r.id,e.channel,"assistant",v,"{}",o),await i.compactHistory(r.id,30),v}async function*Ts(e,t,a,r,s,n){var u;const o=new X(t),i=(u=e.metadata)==null?void 0:u.thread_id,c=await o.buildContext(r.id),l=Za(e.text,c);if(yield{type:"thinking",data:{threadId:i,provider:a.name}},l.agent==="multi"||l.confidence<.5){yield*bs(e,t,a,r,s,n);return}const d=_t(r.timezone),p=l.agent==="conversation"?ht("conversation",r,c,r.timezone,d):ht(l.agent,r,c,r.timezone,d),g=Qa(l.agent,bt),v=(await o.getRecentConversations(r.id,25,i)).filter(h=>!h.content.startsWith("[Autonomous Scheduled Task]")&&!h.content.startsWith("[Scheduled Reminder]")),f=wt([{role:"system",content:p},...v.map(h=>({role:h.role,content:h.content})),{role:"user",content:e.text}]);await o.storeMessage(r.id,e.channel,"user",e.text,"{}",i);const E=10;let b="",T=0;for(let h=0;h<E;h++)try{h>0&&(yield{type:"thinking",data:{threadId:i}});const m=await a.chat(f,{tools:g.length>0?g:void 0});if(m.usage&&(T+=m.usage.promptTokens+m.usage.completionTokens),m.toolCalls&&m.toolCalls.length>0){m.content&&(yield{type:"chunk",data:{text:m.content,threadId:i}},f.push({role:"assistant",content:m.content}));for(const _ of m.toolCalls){yield{type:"tool_start",data:{tool:_.name,toolArgs:_.arguments,threadId:i}};try{const k=await Be(_.name,_.arguments,t,r.id,{agentType:l.agent,providerName:a.name,channel:e.channel},r.pin_hash,n==null?void 0:n.GOOGLE_CLIENT_ID,n==null?void 0:n.GOOGLE_CLIENT_SECRET,n==null?void 0:n.GOOGLE_API_KEY,n==null?void 0:n.GOOGLE_CSE_ID,r.timezone,a);yield{type:"tool_end",data:{tool:_.name,toolResult:k.substring(0,500)+(k.length>500?"...":""),threadId:i}},f.push({role:"user",content:`[Tool Result for ${_.name}]: ${k}`})}catch(k){await N(t,r.id,"tool",_.name,k.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:_.name,toolResult:`Error: ${k.message||"Execution failed"}`,threadId:i}},f.push({role:"user",content:`[Tool Error for ${_.name}]: ${k.message||"Execution failed"}`})}}continue}b=m.content;const y=50;for(let _=0;_<b.length;_+=y)yield{type:"chunk",data:{text:b.substring(_,_+y),threadId:i}},_+y<b.length&&await new Promise(x=>setTimeout(x,10));break}catch(m){if(s){const _=m.message||"",k=_.includes("401")||_.includes("403")||_.includes("authentication")||_.includes("credit balance"),x=_.includes("429"),I=k?1440:x?10:5;await s.recordError(a.name,_,I)}await N(t,r.id,"llm","subagent_stream_error",m.message||"Unknown error",{agent:l.agent,provider:a.name,turn:h});const y=m.message||"An error occurred";try{await o.storeMessage(r.id,e.channel,"assistant",`⚠️ ${y}`,"{}",i)}catch{}yield{type:"error",data:{error:y,threadId:i}};return}if(s&&T>0)try{await s.recordUsage(a.name,T)}catch{}await o.storeMessage(r.id,e.channel,"assistant",b,"{}",i),await o.compactHistory(r.id,30),yield{type:"done",data:{threadId:i,provider:a.name,tokenCount:T}}}const H=new be;async function xs(e,t){var s;const a=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",a),await t()}H.use("/*",xs);H.get("/threads",async e=>{const t=e.get("user"),a=e.req.query("archived")==="1",r=parseInt(e.req.query("limit")||"30"),s=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(t.id,a?1:0,r).all();return e.json({threads:s.results||[]})});H.post("/threads",async e=>{const t=e.get("user"),{title:a}=await e.req.json(),r=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a||"New conversation").first();return e.json({thread:r})});H.put("/threads/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),r=await e.req.json(),s=[],n=[];return r.title!==void 0&&(s.push("title = ?"),n.push(r.title)),r.is_archived!==void 0&&(s.push("is_archived = ?"),n.push(r.is_archived?1:0)),s.push("updated_at = CURRENT_TIMESTAMP"),n.push(a,t.id),s.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${s.join(", ")} WHERE id = ? AND user_id = ?`).bind(...n).run(),e.json({success:!0}))});H.delete("/threads/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(a,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});H.post("/upload",async e=>e.json({error:"File upload is not available in this version."},404));H.post("/send",async e=>{const t=e.get("user"),{message:a,channel:r="web",thread_id:s,files:n}=await e.req.json();if(!a||typeof a!="string"||a.trim().length===0)return e.json({error:"Message is required"},400);let o="";if(n&&Array.isArray(n)&&n.length>0){o=`

[Attached files:
`;for(const l of n)o+=`- ${l.name} (${l.type}, ${Math.round(l.size/1024)}KB, file_id: ${l.file_id})`,l.text_preview&&(o+=`
  Preview: ${l.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=s;if(!i){const l=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();i=l==null?void 0:l.id}const c={userId:t.id,username:t.username,channel:r,text:a.trim()+o,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:l,rotation:d}=await nt(e.env.DB,t.id,t.pin_hash),p=await Ut(c,e.env.DB,l,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID});return!s&&i?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run():i&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),e.json({response:p,timestamp:new Date().toISOString(),channel:c.channel,provider:l.name,thread_id:i})}catch(l){console.error("Chat error:",l);const d=l.message||"";if(d.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400);if(d.includes("All LLM providers failed"))return e.json({error:d,type:"no_provider",thread_id:i},400);if(d.includes("limit reached"))return e.json({error:d,type:"cost_limit",thread_id:i},429);const p=d.includes("401")||d.includes("403")||d.includes("authentication")||d.includes("credit balance")||d.includes("invalid")&&d.includes("key");try{const{logError:g}=await Promise.resolve().then(()=>Nt);await g(e.env.DB,t.id,"llm","chat_error",d)}catch{}return e.json({error:p?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:d,type:p?"no_provider":void 0,thread_id:i},p?400:500)}});function Qt(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}H.post("/stream",async e=>{const t=e.get("user"),{message:a,channel:r="web",thread_id:s,files:n}=await e.req.json();if(!a||typeof a!="string"||a.trim().length===0)return e.json({error:"Message is required"},400);let o="";if(n&&Array.isArray(n)&&n.length>0){o=`

[Attached files:
`;for(const l of n)o+=`- ${l.name} (${l.type}, ${Math.round(l.size/1024)}KB, file_id: ${l.file_id})`,l.text_preview&&(o+=`
  Preview: ${l.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=s;if(!i){const l=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();i=l==null?void 0:l.id}const c={userId:t.id,username:t.username,channel:r,text:a.trim()+o,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:l,rotation:d}=await nt(e.env.DB,t.id,t.pin_hash),p=new ReadableStream({async start(g){const v=new TextEncoder;try{const f=Ts(c,e.env.DB,l,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID});for await(const E of f)E.data.threadId||(E.data.threadId=i),g.enqueue(v.encode(Qt(E)));i&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),g.close()}catch(f){const E={type:"error",data:{error:f.message||"An error occurred",threadId:i}};g.enqueue(v.encode(Qt(E))),g.close()}}});return new Response(p,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(i||"")}})}catch(l){console.error("Stream setup error:",l);const d=l.message||"";return d.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400):d.includes("limit reached")?e.json({error:d,type:"cost_limit",thread_id:i},429):e.json({error:"Something went wrong setting up the stream.",details:d,thread_id:i},500)}});H.get("/threads/:id/messages",async e=>{var n;const t=e.get("user"),a=parseInt(e.req.param("id")),r=parseInt(e.req.query("limit")||"50"),s=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,a,r).all();return e.json({messages:(s.results||[]).reverse(),total:((n=s.results)==null?void 0:n.length)||0})});H.get("/history",async e=>{var c;const t=e.get("user"),a=parseInt(e.req.query("limit")||"50"),r=parseInt(e.req.query("offset")||"0"),s=e.req.query("thread_id");let n,o;s?(n=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[t.id,parseInt(s),a,r]):(n=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[t.id,a,r]);const i=await e.env.DB.prepare(n).bind(...o).all();return e.json({messages:(i.results||[]).reverse(),total:((c=i.results)==null?void 0:c.length)||0})});H.delete("/history",async e=>{const t=e.get("user"),a=e.req.query("thread_id");return a?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(a)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});H.get("/dashboard",async e=>{const t=e.get("user");new Date().toISOString().split("T")[0];const[a,r,s,n,o,i]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first(),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first()]);return e.json({threads:(a==null?void 0:a.cnt)||0,active_schedules:(r==null?void 0:r.cnt)||0,memories:(s==null?void 0:s.cnt)||0,recent_threads:n.results||[],provider_usage:[],unread_notifications:(o==null?void 0:o.cnt)||0,errors:(i==null?void 0:i.cnt)||0})});H.get("/gmail/unread",async e=>{const t=e.get("user");try{const a=e.env.GOOGLE_CLIENT_ID,r=e.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return e.json({count:null,reason:"google_not_configured"});const n=await new ie(e.env.DB,t.id,t.pin_hash,a,r).getUnreadCount();return e.json({count:n})}catch(a){return e.json({count:null,reason:a.message})}});H.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));H.get("/notifications/count",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(a==null?void 0:a.cnt)||0})});H.get("/notifications",async e=>{const t=e.get("user"),a=parseInt(e.req.query("limit")||"20"),r=await e.env.DB.prepare(`SELECT id, type, title, body, is_read, source, action_url, created_at 
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,a).all();return e.json({notifications:r.results||[]})});H.put("/notifications/:id/read",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});H.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});H.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const G=new be;async function ks(e,t){var s;const a=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),await t()}G.use("/*",ks);G.get("/profile",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(a==null?void 0:a.name)||t.name,role:(a==null?void 0:a.role)||t.role,personality_prompt:(a==null?void 0:a.personality_prompt)||t.personality_prompt,telegram_chat_id:(a==null?void 0:a.telegram_chat_id)||t.telegram_chat_id,timezone:(a==null?void 0:a.timezone)||t.timezone,assistant_name:(a==null?void 0:a.assistant_name)||"Karna"})});G.put("/profile",async e=>{const t=e.get("user"),a=await e.req.json(),r=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],s=[],n=[];for(const o of r)a[o]!==void 0&&(s.push(`${o} = ?`),n.push(a[o]));return s.length===0?e.json({error:"No valid fields to update"},400):(s.push("updated_at = CURRENT_TIMESTAMP"),n.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${s.join(", ")} WHERE id = ?`).bind(...n).run(),e.json({success:!0}))});const Lt=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key"];G.get("/credentials",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT id, service, label, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all();return e.json({credentials:(a.results||[]).map(r=>({...r,configured:!0})),available_services:Lt,llm_providers:Ze})});G.put("/credentials",async e=>{const t=e.get("user"),{service:a,value:r,label:s}=await e.req.json();if(!a||!r)return e.json({error:"Service name and value are required"},400);if(!Lt.includes(a))return e.json({error:`Invalid service. Must be one of: ${Lt.join(", ")}`},400);const n=await Bt(r,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,a,s||a,n).run(),e.json({success:!0,service:a})});G.delete("/credentials/:service",async e=>{const t=e.get("user"),a=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,a).run(),e.json({success:!0})});G.get("/memory",async e=>{const t=e.get("user"),a=e.req.query("type"),s=await new X(e.env.DB).getAll(t.id,a||void 0,100);return e.json({memories:s})});G.post("/memory",async e=>{const t=e.get("user"),{type:a,title:r,content:s,importance:n}=await e.req.json();return!a||!r||!s?e.json({error:"Type, title, and content are required"},400):(await new X(e.env.DB).store(t.id,a,r,s,n||5),e.json({success:!0}))});G.delete("/memory/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await new X(e.env.DB).remove(a,t.id),e.json({success:!0})});G.get("/schedules",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:a.results||[]})});G.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),{enabled:r}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r?1:0,a,t.id).run(),e.json({success:!0})});G.delete("/schedules/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});G.get("/errors",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:a.results||[]})});G.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});G.post("/credentials/validate",async e=>{e.get("user");const{service:t,value:a}=await e.req.json();if(!t||!a)return e.json({error:"Service and value required"},400);switch(t){case"anthropic":try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return r.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):r.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${r.status}.`})}catch(r){return e.json({valid:!1,message:`Connection failed: ${r.message}`})}case"openai":try{const r=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${a}`}});return r.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):r.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${r.status}.`})}catch(r){return e.json({valid:!1,message:`Connection failed: ${r.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const r=JSON.parse(a);if(!r.provider||!r.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const s=Ze[r.provider];if(!s)return e.json({valid:!1,message:`Unknown provider: ${r.provider}`});if(s.apiFormat==="anthropic"){const n=await fetch(s.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:s.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return n.ok?e.json({valid:!0,message:`${s.label} API key is valid.`}):n.status===401?e.json({valid:!1,message:`Invalid ${s.label} API key.`}):e.json({valid:!1,message:`${s.label} responded with status ${n.status}.`})}else{const n=s.apiBase+(s.validatePath||"/v1/models"),o=await fetch(n,{headers:{Authorization:`Bearer ${r.apiKey}`}});if(o.ok)return e.json({valid:!0,message:`${s.label} API key is valid.`});if(o.status===401||o.status===403)return e.json({valid:!1,message:`Invalid ${s.label} API key.`});if(o.status===404)try{const i=await fetch(s.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.apiKey}`},body:JSON.stringify({model:s.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return i.ok||i.status===200?e.json({valid:!0,message:`${s.label} API key is valid.`}):i.status===401||i.status===403?e.json({valid:!1,message:`Invalid ${s.label} API key.`}):e.json({valid:!1,message:`${s.label} responded with status ${i.status}.`})}catch(i){return e.json({valid:!1,message:`${s.label} chat test failed: ${i.message}`})}return e.json({valid:!1,message:`${s.label} responded with status ${o.status}.`})}}catch(r){return r instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${r.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});G.get("/google/status",async e=>{const t=e.get("user");try{const a=await jt(e.env.DB,t.id,t.pin_hash),r=Ba(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...a,oauth_client_configured:r})}catch(a){return e.json({connected:!1,error:a.message})}});G.get("/google/auth-url",async e=>{var t;e.get("user");try{const a=e.env.GOOGLE_CLIENT_ID,r=e.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const s=new URL(e.req.url),n=`${s.protocol}//${s.host}/auth/google/callback`,o=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),i=La(a,n,o);return e.json({auth_url:i,redirect_uri:n})}catch(a){return e.json({error:`Failed to generate auth URL: ${a.message}`},500)}});G.post("/google/disconnect",async e=>{const t=e.get("user");try{return await Pa(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(a){return e.json({error:a.message},500)}});G.post("/google/test",async e=>{const t=e.get("user");try{const{token:a,email:r}=await ze(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),s=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${a}`}}),n=!0,o=s.ok;return e.json({success:!0,email:r,scopes:{sheets:n,calendar:o,docs:n,drive:n},message:o?`Connected as ${r} — all services working.`:`Connected as ${r} — calendar access issue (${s.status}).`})}catch(a){return e.json({success:!1,error:a.message})}});const pe=new be;pe.get("/debug/time",e=>{const t=new Date,a=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return e.json({utc_iso:t.toISOString(),utc_ms:t.getTime(),formatted_ist:a.format(t),toLocaleString_ist:t.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});pe.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const a=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:a,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});pe.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const a=Date.now()-t;return e.json({status:"ok",latency_ms:a})}catch(t){return e.json({status:"error",error:t.message},500)}});pe.get("/status",async e=>{var c;const t=(c=e.req.header("Authorization"))==null?void 0:c.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const r=a.user_id,[s,n,o,i]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first()]);return e.json({active_schedules:(s==null?void 0:s.cnt)||0,memory_entries:(n==null?void 0:n.cnt)||0,total_messages:(o==null?void 0:o.cnt)||0,unread_errors:(i==null?void 0:i.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});async function Ss(e,t,a,r){try{const s=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t).first();if(!s)return;const n=await U(s.encrypted_value,s.pin_hash),o=4e3,i=r.length>o?r.substring(0,o-3)+"...":r;(await fetch(`https://api.telegram.org/bot${n}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:i,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${n}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:i})})}catch{}}function ea(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}pe.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);const r=new Date,s=r.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:s})).run()}catch{}const n=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(s).all(),o=[];for(const i of n.results||[])try{await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(s,i.id).run();const c=i.user_timezone||"UTC";let l,d=!1,p=i.state||"active";if(i.schedule_type==="interval"){const f=parseInt(i.schedule_value,10);l=new Date(r.getTime()+f*60*1e3)}else if(i.schedule_type==="daily"){const[f,E]=i.schedule_value.split(":").map(Number),b=ea(c),T=new Date(b);T.setHours(f,E,0,0),T<=b&&T.setDate(T.getDate()+1);const u=new Date(T.toLocaleString("en-US",{timeZone:"UTC"})),h=new Date(T.toLocaleString("en-US",{timeZone:c})),m=u.getTime()-h.getTime();l=new Date(T.getTime()+m)}else if(i.schedule_type==="weekly"){const[f,E]=i.schedule_value.split(" "),[b,T]=(E||"00:00").split(":").map(Number),h=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(L=>L.toLowerCase()===f.toLowerCase()),m=ea(c),y=new Date(m);y.setHours(b,T,0,0);let _=(h-y.getDay()+7)%7;_===0&&y<=m&&(_=7),y.setDate(y.getDate()+_);const k=new Date(y.toLocaleString("en-US",{timeZone:"UTC"})),x=new Date(y.toLocaleString("en-US",{timeZone:c})),I=k.getTime()-x.getTime();l=new Date(y.getTime()+I)}else i.schedule_type==="once"?(d=!0,p="completed",l=new Date(r.getTime()+365*24*60*60*1e3)):l=new Date(r.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,l.toISOString(),d?0:i.enabled,p,i.id).run();const v=(JSON.parse(i.action_config||"{}").description||i.description)&&(i.action_type==="check_mail"||i.action_type==="check_calendar"||i.action_type==="check_sheet"||i.action_type==="custom");o.push({job_id:i.id,name:i.name,status:"dispatched",needs_agent:v,next_run:l.toISOString()})}catch(c){o.push({job_id:i.id,name:i.name,status:"error",error:c.message})}return e.json({executed:o.length,results:o,timestamp:s})});pe.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);const r=parseInt(e.req.param("jobId"),10);if(!r)return e.json({error:"Invalid job ID"},400);const s=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(r).first();if(!s)return e.json({error:"Job not found"},404);const o=JSON.parse(s.action_config||"{}").description||s.description||"",i="⏰ "+(s.name||"Scheduled Task"),c=new Date().toISOString();let l="";const d=s.action_type==="reminder",p=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!d&&s.action_type==="custom"&&p.test(o),d)l=o||s.name||"Time for your scheduled task.";else try{const E={id:s.user_id,username:s.username||"user",name:s.user_name||"User",pin_hash:s.pin_hash||"",role:s.user_role||"",personality_prompt:s.personality_prompt||"",telegram_chat_id:s.telegram_chat_id||"",timezone:s.user_timezone||"UTC",assistant_name:s.assistant_name||"Karna",created_at:"",updated_at:""},b={userId:s.user_id,username:E.username,channel:"cron",text:Is(s.name,o,s.action_type),sessionId:"cron-"+s.id,timestamp:c},{provider:T,rotation:u}=await nt(e.env.DB,s.user_id,s.pin_hash);l=await Ut(b,e.env.DB,T,E,u,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(E){const b=E.message||"unknown error",T=b.includes("rate_limit")||b.includes("429")||b.includes("quota"),u=b.includes("timeout")||b.includes("Timeout");T?l="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":u?l="Task timed out. Will retry at next scheduled time.":l="Task encountered an error. Will retry at next scheduled time.",await N(e.env.DB,s.user_id,"cron_agent","execution_error",b,{job_id:s.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(s.action_type))try{const E=await e.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(s.user_id).first();(!E||E.cnt===0)&&await N(e.env.DB,s.user_id,"cron_verification","no_tools_called",`Cron job "${s.name}" (${s.action_type}) completed without any tool calls`,{job_id:s.id,action_type:s.action_type,response_preview:l.substring(0,200)})}catch{}let v=l||o||"Time for your scheduled task.";v=v.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const f=i+`
`+v;return await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(s.user_id,"reminder",i,v,"cron:"+s.id).run(),d&&await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(s.user_id,"system","assistant",f,JSON.stringify({type:"cron",job_id:s.id})).run(),s.telegram_chat_id&&await Ss(e.env.DB,s.user_id,s.telegram_chat_id,f),e.json({job_id:r,status:"completed",response_length:l.length})});async function ar(e){var r;const t=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!t)return null;const a=await e.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(t).first();return(a==null?void 0:a.user_id)||null}pe.get("/health/tools",async e=>{var a;const t=await ar(e);if(!t)return e.json({error:"Not authenticated"},401);try{const r=await e.env.DB.prepare(`SELECT tool_name,
              COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) as failures,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name != '__enforcement_trigger'
       GROUP BY tool_name
       ORDER BY total DESC`).bind(t).all(),s=await e.env.DB.prepare(`SELECT agent_type, provider_name, COUNT(*) as triggers,
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
       ORDER BY created_at DESC LIMIT 10`).bind(t).all(),c=await e.env.DB.prepare(`SELECT provider_name, agent_type,
              COUNT(*) as calls,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name != '__enforcement_trigger'
       GROUP BY provider_name, agent_type
       ORDER BY calls DESC`).bind(t).all();return e.json({period:"last_24h",tool_stats:r.results,enforcement:{triggers:s.results,retry_results:((a=n.results)==null?void 0:a[0])||{total_retries:0,successful_retries:0}},cron:{executions:o.results,warnings:i.results},providers:c.results})}catch(r){return e.json({error:r.message||"Failed to fetch metrics"},500)}});pe.get("/health/tools/recent",async e=>{const t=await ar(e);if(!t)return e.json({error:"Not authenticated"},401);try{const a=await e.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
              success, error_message, latency_ms, was_enforcement_retry, channel, created_at
       FROM tool_execution_log
       WHERE user_id = ?
       ORDER BY id DESC LIMIT 50`).bind(t).all();return e.json({logs:a.results})}catch(a){return e.json({error:a.message},500)}});const Je=`

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
- Example: "Couldn't retrieve Amazon order status — requires login."`;function Is(e,t,a){return a==="reminder"?`[Scheduled Reminder] "${e}": ${t||"Time for your reminder."}`:a==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check Gmail for new/important emails."}
You MUST call gmail_list or gmail_search immediately.${Je}`:a==="check_calendar"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check calendar for upcoming events."}
You MUST call list_calendar_events immediately.${Je}`:a==="check_sheet"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
You MUST call read_sheet immediately with the relevant spreadsheet.${Je}`:a==="custom"&&t?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${Je}`:`[Scheduled task "${e}"]: ${t||"Execute this scheduled task."}${Je}`}function Os(e,t,a,r){return{userId:e,username:t,channel:"telegram",text:a,sessionId:`telegram-${r}`,timestamp:new Date().toISOString()}}function Cs(e,t){return e.replace(/\*\*(.*?)\*\*/g,"*$1*").replace(/#{1,3}\s/g,"*").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const ot=new be,Rs=4e3;async function P(e,t,a,r="Markdown"){var n,o;const s=Ns(a,Rs);for(const i of s)try{const c=await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:i,parse_mode:r,disable_web_page_preview:!1})});if(!c.ok){const l=await c.json().catch(()=>null);((n=l==null?void 0:l.description)!=null&&n.includes("parse")||(o=l==null?void 0:l.description)!=null&&o.includes("entities"))&&await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:i})})}}catch{}}async function Ds(e,t){try{await fetch(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function Ns(e,t){if(e.length<=t)return[e];const a=[];let r=e;for(;r.length>0;){if(r.length<=t){a.push(r);break}let s=r.lastIndexOf(`
`,t);s<t*.3&&(s=r.lastIndexOf(" ",t)),s<t*.3&&(s=t),a.push(r.substring(0,s)),r=r.substring(s).trimStart()}return a}async function As(e,t,a,r,s){switch(e.split("@")[0].toLowerCase()){case"/start":{const o=(r==null?void 0:r.name)||"there",i=(r==null?void 0:r.assistant_name)||"Karna",c=`👋 *Hello, ${o}!*

I'm ${i}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/tasks — Show open tasks
/new — Start a fresh conversation

Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.`+(r?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`);return await P(a,t,c),!0}case"/help":{const i=`🛠 *${(r==null?void 0:r.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`;return await P(a,t,i),!0}case"/status":{if(!r)return await P(a,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app."),!0;try{const[o,i,c,l]=await Promise.all([s.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r.id).first(),s.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r.id).first(),s.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(r.id).first(),s.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(r.id).first()]),d=`📊 *System Status*

Active tasks: ${(o==null?void 0:o.cnt)||0}
Memories: ${(i==null?void 0:i.cnt)||0}
Conversation days: ${(c==null?void 0:c.cnt)||0}
Unresolved errors: ${(l==null?void 0:l.cnt)||0}

Status: ✅ Online`;await P(a,t,d)}catch{await P(a,t,"✅ Online — but had trouble fetching stats.")}return!0}case"/new":return r?(await s.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(r.id).run(),await P(a,t,"🆕 Starting fresh conversation. Your next message begins a new thread."),!0):(await P(a,t,"⚠️ Account not linked."),!0);case"/tasks":case"/task":{if(!r)return await P(a,t,"⚠️ Account not linked."),!0;try{const i=(await s.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(r.id).all()).results||[];if(i.length===0)return await P(a,t,"✅ No open tasks. You're all clear."),!0;const c=new Date,l=c.toISOString().slice(0,10),d=new Date(c);d.setDate(d.getDate()+1);const p=d.toISOString().slice(0,10),g=[`📋 *Open Tasks (${i.length})*
`];for(const v of i){let f="";if(v.due_date){const E=v.due_date.slice(0,10);E<l?f=" ⚠️ _overdue_":E===l?f=" 🔴 _due today_":E===p?f=" 🟡 _due tomorrow_":f=` _${new Date(v.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}g.push(`☐ ${v.title}${f}`)}g.push(`
_Say "mark [task] as done" to close a task._`),await P(a,t,g.join(`
`))}catch(o){await P(a,t,"❌ Could not fetch tasks: "+o.message)}return!0}default:return!1}}ot.post("/webhook",async e=>{let t;try{t=await e.req.json()}catch{return e.json({ok:!0})}const a=e.env.DB,r={GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID},s=async()=>{var n,o,i,c,l;try{if(t.callback_query){await Ls(a,t.callback_query);return}const d=t.message;if(!d)return;const p=!!d.text,g=!!d.voice,v=!!d.document,f=!!d.photo,E=!!d.caption;if(!p&&!g&&!v&&!f)return;const b=String(d.chat.id);let T=d.text||"";const u=await a.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(b).first();let h=null;if(u){const x=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(u.id,"telegram_bot_token").first();x&&(h=await U(x.encrypted_value,u.pin_hash))}if(!h){const x=await a.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();x&&(h=await U(x.encrypted_value,x.pin_hash))}if(!h||T.startsWith("/")&&await As(T,b,h,u,a))return;if(!u){await P(h,b,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${b}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`);return}if(d.voice&&h&&u)try{await P(h,b,"🎤 Processing voice note...");const I=await(await fetch(`https://api.telegram.org/bot${h}/getFile?file_id=${d.voice.file_id}`)).json();if(I.ok&&((n=I.result)!=null&&n.file_path)){const S=await(await fetch(`https://api.telegram.org/file/bot${h}/${I.result.file_path}`)).blob();let C="",R="",$="whisper-1";const j=await e.env.DB.prepare("SELECT service, encrypted_value FROM credentials WHERE user_id = ? AND (service IN ('llm_slot_1', 'llm_slot_2', 'llm_slot_3', 'openai'))").bind(u.id).all();for(const ne of j.results){const Re=await U(ne.encrypted_value,u.pin_hash);if(ne.service==="openai"){C="https://api.openai.com/v1/audio/transcriptions",R=Re;break}else if(ne.service.startsWith("llm_slot_"))try{const De=JSON.parse(Re);if(De.provider==="openai"){C="https://api.openai.com/v1/audio/transcriptions",R=De.apiKey;break}else if(De.provider==="groq"){C="https://api.groq.com/openai/v1/audio/transcriptions",R=De.apiKey,$="whisper-large-v3";break}}catch{}}if(!C){await P(h,b,"⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys).");return}const M=new FormData;M.append("file",S,"voice.ogg"),M.append("model",$),M.append("language","en");const z=await fetch(C,{method:"POST",headers:{Authorization:`Bearer ${R}`},body:M});if(!z.ok){const ne=await z.text();await P(h,b,`⚠️ Transcription failed: ${z.status} ${ne}`);return}T=(await z.json()).text,await P(h,b,`🗣️ *You said:* ${T}`)}}catch(x){await P(h,b,`⚠️ Failed to process voice note: ${x.message}`);return}if((v||f)&&h&&u)try{let x,I="unknown",L="unknown",S=0;if(v)x=d.document.file_id,I=d.document.file_name||"document",L=d.document.mime_type||"unknown",S=d.document.file_size||0;else if(f){const C=d.photo[d.photo.length-1];x=C.file_id,I="photo.jpg",L="image/jpeg",S=C.file_size||0}if(x){const R=await(await fetch(`https://api.telegram.org/bot${h}/getFile?file_id=${x}`)).json();let $="";if(R.ok&&((o=R.result)!=null&&o.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(I)||/^text\/|application\/json|application\/xml|application\/csv/i.test(L))&&S<5e4)try{$=await(await fetch(`https://api.telegram.org/file/bot${h}/${R.result.file_path}`)).text()}catch{}const j=d.caption||"",M=`[Telegram file received: "${I}" (${L}, ${Math.round(S/1024)}KB)]`;$?T=`${j?j+`

`:""}${M}
File contents:
${$.substring(0,8e3)}${$.length>8e3?`
[...truncated]`:""}`:T=`${j?j+`

`:""}${M}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(x){if(E&&d.caption)T=d.caption;else{await P(h,b,`⚠️ Received your file but couldn't process it: ${x.message}`);return}}if(!T)return;Ds(h,b).catch(()=>{});let m=await a.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(u.id).first();m?await a.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(m.id).run():m={id:(await a.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(u.id).run()).meta.last_row_id};const y=Os(u.id,u.username,T,b);y.metadata={thread_id:m.id};let _,k;try{const x=await nt(a,u.id,u.pin_hash);_=x.provider,k=x.rotation}catch(x){console.error("Telegram provider setup error:",x);const I=(i=x.message)!=null&&i.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(c=x.message)!=null&&c.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${x.message||"Unknown error"}`;await P(h,b,I);return}try{const x=await Ut(y,a,_,u,k,r),I=Cs(x,"telegram");await P(h,b,I||"(empty response)")}catch(x){console.error("Telegram agent error:",x);const I=(l=x.message)!=null&&l.includes("API error")?`⚠️ AI provider returned an error. The provider (${_.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(x.message||"Unknown").substring(0,200)}`;await P(h,b,I);try{const{logError:L}=await Promise.resolve().then(()=>Nt);await L(a,u.id,"telegram","agent_error",x.message||"Agent error",{provider:_.name})}catch{}}}catch(d){console.error("Telegram webhook error:",d);try{const{logError:p}=await Promise.resolve().then(()=>Nt);await p(a,null,"telegram","webhook_error",d.message||"Unknown telegram error")}catch{}}};return e.executionCtx.waitUntil(s()),e.json({ok:!0})});ot.post("/setup-webhook",async e=>{var c;const t=(c=e.req.header("Authorization"))==null?void 0:c.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const{webhook_url:r}=await e.req.json(),s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!s)return e.json({error:"Telegram bot token not configured in Settings"},400);const n=await U(s.encrypted_value,a.pin_hash);if(!r){const d=await(await fetch(`https://api.telegram.org/bot${n}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(d)}const i=await(await fetch(`https://api.telegram.org/bot${n}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r,allowed_updates:["message"],drop_pending_updates:!1})})).json();return e.json(i)});ot.get("/webhook-status",async e=>{var n,o,i,c,l,d;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return e.json({configured:!1,error:"Bot token not set"});const s=await U(r.encrypted_value,a.pin_hash);try{const g=await(await fetch(`https://api.telegram.org/bot${s}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((o=g.result)==null?void 0:o.url)||"",has_webhook:!!((i=g.result)!=null&&i.url),pending_updates:((c=g.result)==null?void 0:c.pending_update_count)||0,last_error:((l=g.result)==null?void 0:l.last_error_message)||"",last_error_date:((d=g.result)==null?void 0:d.last_error_date)||null})}catch(p){return e.json({configured:!0,error:p.message})}});ot.post("/detect-chat-id",async e=>{var n,o;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return e.json({error:"Bot token not configured"},400);const s=await U(r.encrypted_value,a.pin_hash);try{const l=((o=(await(await fetch(`https://api.telegram.org/bot${s}/getWebhookInfo`)).json()).result)==null?void 0:o.url)||"";await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(b=>setTimeout(b,500));const p=await(await fetch(`https://api.telegram.org/bot${s}/getUpdates?limit=10&timeout=0`)).json();l&&await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:l,allowed_updates:["message"]})});const g=p.result||[];if(g.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const v=[],f=new Set;for(let b=g.length-1;b>=0;b--){const T=g[b].message;if(T&&T.chat){const u=String(T.chat.id);f.has(u)||(f.add(u),v.push({chat_id:u,name:[T.chat.first_name,T.chat.last_name].filter(Boolean).join(" ")||T.chat.title||"Unknown",username:T.chat.username||"",date:new Date((T.date||0)*1e3).toISOString()}))}}if(v.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const E=v[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(E,a.user_id).run(),e.json({found:!0,chat_id:E,name:v[0].name,all_chats:v,message:`Chat ID ${E} detected and saved to your profile.`})}catch(i){return e.json({error:`Detection failed: ${i.message}`},500)}});async function Ls(e,t){var E;const{id:a,data:r,message:s,from:n}=t;if(!r||!s)return;const o=r.split(":");if(o[0]!=="briefing_toggle"||o.length<3)return;const i=o[1],c=parseInt(o[2]);if(!c||!i)return;const l=String(s.chat.id),d=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(l).first();if(!d)return;const p=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(d.id,c,i).first();if(!p)return;const g=p.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(g,g,p.id).run();const v=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(d.id).first();if(!v)return;const f=await U(v.encrypted_value,v.pin_hash);if(await fetch(`https://api.telegram.org/bot${f}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:a,text:g?"✅ Checked!":"☐ Unchecked"})}),(E=s.reply_markup)!=null&&E.inline_keyboard){const b=s.reply_markup.inline_keyboard.map(T=>T.map(u=>{var h;if((h=u.callback_data)!=null&&h.includes(i)){const m=g?"✅":"☐",y=u.text.replace(/^[☐✅]\s*/,"");return{...u,text:`${m} ${y}`}}return u}));try{await fetch(`https://api.telegram.org/bot${f}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l,message_id:s.message_id,reply_markup:{inline_keyboard:b}})})}catch{}}}function Ms(e){const t=new Date,a=new Date(t.toLocaleString("en-US",{timeZone:e})),r=new Date(a);r.setDate(r.getDate()+1),r.setHours(0,0,0,0);const s=new Date(r);s.setHours(23,59,59,999);const n=r.toISOString().split("T")[0];return{start:r.toISOString(),end:s.toISOString(),dateStr:n}}async function $s(e,t,a,r,s,n){try{return(await new Pt(e,t,a,r,s).listEvents("primary",{timeMin:n.start,timeMax:n.end,maxResults:50})).map(c=>{var l;return{id:c.id||`google-${Date.now()}`,title:c.summary||"Untitled Event",startTime:c.start.dateTime||c.start.date||"",endTime:c.end.dateTime||c.end.date||"",location:c.location,attendees:(l=c.attendees)==null?void 0:l.map(d=>d.displayName||d.email),source:"google"}})}catch(o){return console.error("Google Calendar fetch error:",o.message),[]}}async function Bs(e,t,a,r,s){try{const n=new ie(e,t,a,r,s),o=await n.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),i=await n.listMessages({query:"is:important is:unread",maxResults:10}),c={};for(const p of o){const g=p.from.split("<")[0].trim()||p.from;c[g]=(c[g]||0)+1}const l=Object.entries(c).sort(([,p],[,g])=>g-p).slice(0,5).map(([p])=>p),d=o.some(p=>p.subject.toLowerCase().includes("urgent")||p.subject.toLowerCase().includes("asap")||p.subject.toLowerCase().includes("immediately"));return{unreadCount:o.length,importantCount:i.length,topSenders:l,hasUrgent:d}}catch(n){return console.error("Gmail fetch error:",n.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function js(e,t){try{const a=await e.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(t).all(),r=new Date,s=new Date(r);s.setDate(s.getDate()+1),s.setHours(23,59,59,999);const n=a.results||[],o=n.map(c=>{if(c.due_date){const l=new Date(c.due_date),d=l<=r?"overdue":l<=s?"due today":l.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${c.title} [${d}]`}return c.title}),i=n.filter(c=>c.due_date?new Date(c.due_date)<=s:!1).length;return{pending:n.length,dueToday:i,items:o}}catch(a){return console.error("Tasks fetch error:",a.message),{pending:0,dueToday:0,items:[]}}}async function Ps(e,t){try{const a=Math.floor((Date.now()-1728e5)/1e3),r=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${a},points>10`,s=await fetch(r,{headers:{"User-Agent":"Karna/1.0"}});return s.ok?((await s.json()).hits||[]).filter(o=>o.url&&!t.has(o.url)).slice(0,2).map(o=>({title:o.title,summary:`${o.points} pts · ${o.num_comments} comments on HN`,url:o.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const ta=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function Us(e,t,a){const r=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],s=new Set;if(t&&a)try{((await t.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(a).all()).results||[]).forEach(l=>s.add(l.url))}catch{}const n=[];if(r.some(c=>ta.some(l=>c.toLowerCase().includes(l.toLowerCase())))){const c=r.find(d=>ta.some(p=>d.toLowerCase().includes(p.toLowerCase())))||"AI agents",l=await Ps(c,s);for(const d of l)n.push(d),s.add(d.url)}for(const c of r){if(n.length>=8)break;const l=`latest ${c} news today`;try{const d=await vt(l,{num:5});if(d.results)for(const p of d.results){if(n.length>=8)break;s.has(p.link)||(n.push({title:p.title,summary:p.snippet,url:p.link,source:p.displayLink}),s.add(p.link))}}catch(d){console.error(`News search error for "${l}":`,d.message)}}const i=n.slice(0,7);if(t&&a&&i.length>0)for(const c of i)try{await t.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(a,c.url,c.title).run()}catch{}return i}function Hs(e,t){const a=[];let r="20:00";{const[o,i]=t.split(":"),c=parseInt(o,10),l=i||"00",d=c>=12?"PM":"AM";r=`${c===0?12:c>12?c-12:c}:${l} ${d}`}a.push(`🗓 Your ${r} Brief — ${e.targetDate}`),a.push("");const s=e.calendar.totalCount;if(s>0){a.push(`📅 Tomorrow: ${s} event${s===1?"":"s"}`);for(const o of e.calendar.google.slice(0,5)){const i=o.startTime?new Date(o.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";a.push(`   • ${i} ${o.title}`)}}else a.push("📅 Tomorrow: Nothing scheduled");a.push("");const n=e.emails.gmail.unreadCount;if(n>0?(a.push(`📧 Gmail: ${n} unread`),e.emails.gmail.importantCount>0&&a.push(`   ★ ${e.emails.gmail.importantCount} marked important`),e.emails.gmail.hasUrgent&&a.push("   ⚠️ Urgent messages present"),e.emails.gmail.topSenders.length>0&&a.push(`   From: ${e.emails.gmail.topSenders.slice(0,3).join(", ")}`)):a.push("📧 Gmail: Inbox clear"),a.push(""),e.tasks.pending>0){a.push(`✅ Open Tasks (${e.tasks.pending}):`);for(const o of e.tasks.items)a.push(`   ☐ ${o}`)}else a.push("✅ Tasks: All clear");if(a.push(""),e.news.items.length>0){a.push("📡 Today's Signal:");for(const o of e.news.items){const i=o.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${o.source}`;a.push(`   • ${o.title.substring(0,90)}${o.title.length>90?"…":""}`),a.push(`     ${i} — ${o.summary.substring(0,80)}${o.summary.length>80?"…":""}`)}}return a.join(`
`)}function Gs(e){const t=[];let a=0;for(const r of e.calendar.google)t.push({type:"calendar",key:r.id,text:`${r.title} - ${new Date(r.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:r},sortOrder:a++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:a++});for(const r of e.tasks.items)t.push({type:"task",key:`task-${r}`,text:r,metadata:{},sortOrder:a++});for(const r of e.news.items)t.push({type:"news",key:`news-${r.url}`,text:`📰 ${r.title}`,metadata:{url:r.url,source:r.source},sortOrder:a++});return t}async function Fs(e,t){const a=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!a)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let r;try{const n=JSON.parse(a.components);r={google_calendar:n.google_calendar!==!1,gmail:n.gmail!==!1,tasks:n.tasks!==!1,news:n.news!==!1}}catch{r={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const s=a.news_topics?a.news_topics.split(",").map(n=>n.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:r,newsTopics:s}}async function rr(e,t,a){var u,h;const r=t.timezone||"Asia/Kolkata",s=Ms(r),{components:n,newsTopics:o}=await Fs(e,t.id),i=[],c=[];n.google_calendar&&(i.push($s(e,t.id,t.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET,s)),c.push("googleEvents")),n.gmail&&(i.push(Bs(e,t.id,t.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET)),c.push("gmailSummary")),n.tasks&&(i.push(js(e,t.id)),c.push("tasks")),n.news&&(i.push(Us(o,e,t.id)),c.push("news"));const l=await Promise.all(i),d={};c.forEach((m,y)=>{d[m]=l[y]});const p={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},g={pending:0,dueToday:0,items:[]},v={generatedAt:new Date().toISOString(),targetDate:s.dateStr,calendar:{google:d.googleEvents||[],totalCount:((u=d.googleEvents)==null?void 0:u.length)||0},emails:{gmail:d.gmailSummary||p},tasks:d.tasks||g,news:{items:d.news||[],fetchedAt:new Date().toISOString()},summary:""},f=((h=await e.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(t.id).first())==null?void 0:h.briefing_time)||"20:00";v.summary=Hs(v,f);const E=Gs(v),b=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(t.id,JSON.stringify(v)).first(),T=(b==null?void 0:b.id)||0;for(const m of E)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(T,m.type,m.key,m.text,JSON.stringify(m.metadata),m.sortOrder).run();return{briefingId:T,content:v,items:E}}async function Ws(e,t,a){const r=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,t).first();if(!r)return null;const s=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(a).all();return{briefing:{...r,content:JSON.parse(r.content_json||"{}")},items:s.results||[]}}async function zs(e,t,a,r){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,t).first())return null;const n=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(r,a).first();if(!n)return null;const o=n.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(o,o,r,a).run(),{checked:o===1}}async function qs(e,t,a=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.sent_at DESC
    LIMIT ?
  `).bind(t,a).all()).results||[]).map(s=>({...s,content:JSON.parse(s.content_json||"{}")}))}function Ks(e,t,a=new Date){const r=new Date(a.toLocaleString("en-US",{timeZone:t})),s=r.getHours(),n=r.getMinutes(),[o,i]=e.split(":").map(Number),c=s*60+n,l=o*60+i;return c===l}function sr(e,t){const a=e.summary,r=[];for(const s of t.slice(0,10))r.push([{text:`☐ ${s.text.substring(0,40)}${s.text.length>40?"...":""}`,callback_data:`briefing_toggle:${s.key}`}]);return{text:a,inlineKeyboard:r}}const J=new be;async function Ys(e,t){var s;if(e.req.path.includes("/cron/"))return t();const a=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",a),await t()}J.use("/*",Ys);J.get("/briefings",async e=>{const t=e.get("user"),a=parseInt(e.req.query("limit")||"10");try{const r=await qs(e.env.DB,t.id,a);return e.json({briefings:r})}catch(r){return e.json({error:r.message},500)}});J.get("/briefings/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));try{const r=await Ws(e.env.DB,t.id,a);return r?e.json(r):e.json({error:"Briefing not found"},404)}catch(r){return e.json({error:r.message},500)}});J.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),r=parseInt(e.req.param("itemId"));try{const s=await zs(e.env.DB,t.id,a,r);return s?e.json(s):e.json({error:"Item not found"},404)}catch(s){return e.json({error:s.message},500)}});J.post("/briefings/generate",async e=>{const t=e.get("user");try{const a=await rr(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(a)}catch(a){return e.json({error:a.message},500)}});J.get("/briefing-preferences",async e=>{const t=e.get("user");try{const a=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!a){const s={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:s})}const r={briefingTime:a.briefing_time,briefingEnabled:a.briefing_enabled!==0,components:JSON.parse(a.components),newsTopics:a.news_topics.split(",").map(s=>s.trim()).filter(Boolean),notificationChannels:JSON.parse(a.notification_channels),proactiveLevel:a.proactive_level};return e.json({preferences:r})}catch(a){return e.json({error:a.message},500)}});J.post("/briefing-preferences",async e=>{const t=e.get("user"),a=await e.req.json(),r=[];if(a.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(a.briefingTime)||r.push("Invalid time format. Use HH:MM (e.g., 20:00)")),a.newsTopics&&(a.newsTopics.length>5&&r.push("Maximum 5 news topics allowed"),a.newsTopics.some(s=>s.length>50)&&r.push("Each news topic must be 50 characters or less")),a.proactiveLevel&&!["conservative","moderate","aggressive"].includes(a.proactiveLevel)&&r.push("Invalid proactive level. Use conservative, moderate, or aggressive"),r.length>0)return e.json({error:r.join("; ")},400);try{const s=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),n=a.components?JSON.stringify(a.components):null,o=a.notificationChannels?JSON.stringify(a.notificationChannels):null,i=a.newsTopics?a.newsTopics.join(", "):null;if(s){const c=[],l=[];a.briefingTime!==void 0&&(c.push("briefing_time = ?"),l.push(a.briefingTime)),a.briefingEnabled!==void 0&&(c.push("briefing_enabled = ?"),l.push(a.briefingEnabled?1:0)),n!==null&&(c.push("components = ?"),l.push(n)),i!==null&&(c.push("news_topics = ?"),l.push(i)),o!==null&&(c.push("notification_channels = ?"),l.push(o)),a.proactiveLevel!==void 0&&(c.push("proactive_level = ?"),l.push(a.proactiveLevel)),c.length>0&&(c.push("updated_at = CURRENT_TIMESTAMP"),l.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${c.join(", ")} WHERE user_id = ?`).bind(...l).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,a.briefingTime||"20:00",n||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',i||"AI, LLM, Tools, Agentic Workflows, AI Features",o||'{"telegram":true,"web":true}',a.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(s){return e.json({error:s.message},500)}});J.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(a){return e.json({error:a.message},500)}});J.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),s=[],n=new Date;for(const o of r.results||[]){if(!o.briefing_enabled)continue;const i=o.timezone||"Asia/Kolkata",c=o.briefing_time||"20:00";if(Ks(c,i,n))try{const l=await rr(e.env.DB,o,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});if(o.telegram_chat_id){const{text:d,inlineKeyboard:p}=sr(l.content,l.items);await nr(e.env.DB,o,d,p,l.briefingId)}s.push({user_id:o.id,status:"success",briefing_id:l.briefingId,briefing_time:c,timezone:i})}catch(l){s.push({user_id:o.id,status:"error",error:l.message})}}return e.json({executed:s.length,results:s})}catch(r){return e.json({error:r.message},500)}});J.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id IS NOT NULL").all(),s=[],n=new Date,o=new Date(n.getTime()+600*1e3).toISOString(),i=new Date(n.getTime()+900*1e3).toISOString();for(const c of r.results||[])try{const l=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(c.id).first();if(!l)continue;const d=await U(l.encrypted_value,c.pin_hash),g=JSON.parse(d).access_token;if(!g)continue;const v=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(n.toISOString())}&timeMax=${encodeURIComponent(i)}&maxResults=10`,{headers:{Authorization:`Bearer ${g}`}});if(!v.ok)continue;const E=((await v.json()).items||[]).filter(u=>{var m;const h=(m=u.start)==null?void 0:m.dateTime;return h?h>=n.toISOString()&&h<=o:!1});if(E.length===0){s.push({user_id:c.id,reminders_sent:0});continue}const b=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(c.id).first();if(!b)continue;const T=await U(b.encrypted_value,c.pin_hash);for(const u of E){const h=new Date(u.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),m=u.location?`
📍 ${u.location}`:"",y=`⏰ Meeting in 10 minutes!

*${u.summary||"Untitled Event"}*
🕐 ${h}${m}`;await fetch(`https://api.telegram.org/bot${T}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:c.telegram_chat_id,text:y,parse_mode:"Markdown"})})}s.push({user_id:c.id,reminders_sent:E.length})}catch(l){s.push({user_id:c.id,status:"error",error:l.message})}return e.json({executed:s.length,results:s})}catch(r){return e.json({error:r.message},500)}});async function nr(e,t,a,r,s){try{const n=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!n)return;const o=await U(n.encrypted_value,n.pin_hash);if(!(await(await fetch(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:a,parse_mode:"Markdown",reply_markup:{inline_keyboard:r.map(l=>l.map(d=>({...d,callback_data:`${d.callback_data}:${s}`})))}})})).json()).ok){const d=await(await fetch(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:a.replace(/[_*[\]`]/g,""),reply_markup:{inline_keyboard:r.map(p=>p.map(g=>({...g,callback_data:`${g.callback_data}:${s}`})))}})})).json();if(!d.ok){console.error("Telegram briefing send failed:",d.description,"chat_id:",t.telegram_chat_id);return}}await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(s).run()}catch(n){console.error("Telegram briefing error:",n.message)}}J.post("/briefings/:id/resend",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));try{const r=await e.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(a,t.id).first();if(!r)return e.json({error:"Briefing not found"},404);const s=JSON.parse(r.content||"{}"),n=await e.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(a).all(),{text:o,inlineKeyboard:i}=sr(s,n.results||[]);await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(a).run(),await nr(e.env.DB,t,o,i,a);const c=await e.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(a).first();return c!=null&&c.delivered_telegram?e.json({success:!0,message:"Briefing sent to Telegram"}):e.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(r){return e.json({error:r.message},500)}});J.delete("/briefings/:id",async e=>{const t=e.get("user"),a=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});const te=new be;te.use("/api/*",Wr());te.route("/api/auth",_e);te.route("/api/chat",H);te.route("/api/settings",G);te.route("/api/system",pe);te.route("/api/telegram",ot);te.route("/api/proactive",J);te.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),a=t.searchParams.get("code"),r=t.searchParams.get("state"),s=t.searchParams.get("error");if(s)return e.html(Ae(!1,`Google denied access: ${s}`));if(!a||!r)return e.html(Ae(!1,"Missing authorization code or state parameter."));try{const o=JSON.parse(atob(r)).sessionId;if(!o)return e.html(Ae(!1,"Invalid state parameter — missing session."));const i=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(o).first();if(!i)return e.html(Ae(!1,"Session expired. Please log in again and retry."));const c=i.user_id,l=i.pin_hash,d=`${t.protocol}//${t.host}/auth/google/callback`,p=await ja(e.env.DB,c,l,a,d,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(Ae(!0,`Connected as ${p.email}`,p.email))}catch(n){return e.html(Ae(!1,`OAuth failed: ${n.message}`))}});te.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(xa())));te.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(xa())));function Ae(e,t,a){return`<!DOCTYPE html>
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
</body></html>`}async function Js(e,t,a){const r="https://karna-5xs.pages.dev",n={"Content-Type":"application/json","X-Cron-Secret":t.CRON_SECRET||"karna-cron-default-v1"};try{const i=await(await fetch(`${r}/api/system/cron/execute`,{method:"POST",headers:n})).json();if(i.results&&i.results.length>0){const l=i.results.filter(p=>p.needs_agent&&p.status==="dispatched");if(l.length>0){const p=l.map(g=>fetch(`${r}/api/system/cron/run-task/${g.job_id}`,{method:"POST",headers:n}).then(v=>v.json()).catch(v=>({job_id:g.job_id,error:v.message})));a.waitUntil(Promise.allSettled(p).then(g=>{console.log(`Cron: ${i.executed} dispatched, ${l.length} agent tasks`,JSON.stringify(g.map(v=>v.status==="fulfilled"?v.value:v.reason)))}))}const d=i.results.filter(p=>!p.needs_agent&&p.status==="dispatched");if(d.length>0){const p=d.map(g=>fetch(`${r}/api/system/cron/run-task/${g.job_id}`,{method:"POST",headers:n}).catch(()=>{}));a.waitUntil(Promise.allSettled(p))}}a.waitUntil(fetch(`${r}/api/proactive/cron/evening-briefing`,{method:"POST",headers:n}).then(l=>l.json()).then(l=>{l.executed>0&&console.log("Evening briefing result:",JSON.stringify(l))}).catch(l=>{console.error("Evening briefing error:",l.message)})),new Date().getMinutes()%5<2&&a.waitUntil(fetch(`${r}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:n}).then(l=>l.json()).then(l=>{var d;(d=l.results)!=null&&d.some(p=>p.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(l))}).catch(()=>{}))}catch(o){console.error("Scheduled cron error:",o.message||o)}}const Vs={fetch:te.fetch,scheduled:Js},aa=new be,Xs=Object.assign({"/src/index.tsx":Vs});let or=!1;for(const[,e]of Object.entries(Xs))e&&(aa.all("*",t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),aa.notFound(t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),or=!0);if(!or)throw new Error("Can't import modules from ['/src/index.tsx']");export{aa as default};
