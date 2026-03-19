var cr=Object.defineProperty;var Pt=e=>{throw TypeError(e)};var dr=(e,t,a)=>t in e?cr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var S=(e,t,a)=>dr(e,typeof t!="symbol"?t+"":t,a),bt=(e,t,a)=>t.has(e)||Pt("Cannot "+a);var b=(e,t,a)=>(bt(e,t,"read from private field"),a?a.call(e):t.get(e)),R=(e,t,a)=>t.has(e)?Pt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),D=(e,t,a,r)=>(bt(e,t,"write to private field"),r?r.call(e,a):t.set(e,a),a),N=(e,t,a)=>(bt(e,t,"access private method"),a);var Ut=(e,t,a,r)=>({set _(n){D(e,t,n,a)},get _(){return b(e,t,r)}});var Ht=(e,t,a)=>(r,n)=>{let s=-1;return i(0);async function i(o){if(o<=s)throw new Error("next() called multiple times");s=o;let l,c=!1,d;if(e[o]?(d=e[o][0][0],r.req.routeIndex=o):d=o===e.length&&n||void 0,d)try{l=await d(r,()=>i(o+1))}catch(m){if(m instanceof Error&&t)r.error=m,l=await t(m,r),c=!0;else throw m}else r.finalized===!1&&a&&(l=await a(r));return l&&(r.finalized===!1||c)&&(r.res=l),r}},ur=Symbol(),mr=async(e,t=Object.create(null))=>{const{all:a=!1,dot:r=!1}=t,s=(e instanceof ua?e.raw.headers:e.headers).get("Content-Type");return s!=null&&s.startsWith("multipart/form-data")||s!=null&&s.startsWith("application/x-www-form-urlencoded")?pr(e,{all:a,dot:r}):{}};async function pr(e,t){const a=await e.formData();return a?hr(a,t):{}}function hr(e,t){const a=Object.create(null);return e.forEach((r,n)=>{t.all||n.endsWith("[]")?gr(a,n,r):a[n]=r}),t.dot&&Object.entries(a).forEach(([r,n])=>{r.includes(".")&&(fr(a,r,n),delete a[r])}),a}var gr=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},fr=(e,t,a)=>{let r=e;const n=t.split(".");n.forEach((s,i)=>{i===n.length-1?r[s]=a:((!r[s]||typeof r[s]!="object"||Array.isArray(r[s])||r[s]instanceof File)&&(r[s]=Object.create(null)),r=r[s])})},ia=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},yr=e=>{const{groups:t,path:a}=vr(e),r=ia(a);return br(r,t)},vr=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,r)=>{const n=`@${r}`;return t.push([n,a]),n}),{groups:t,path:e}},br=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[r]=t[a];for(let n=e.length-1;n>=0;n--)if(e[n].includes(r)){e[n]=e[n].replace(r,t[a][1]);break}}return e},lt={},wr=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const r=`${e}#${t}`;return lt[r]||(a[2]?lt[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:lt[r]=[e,a[1],!0]),lt[r]}return null},At=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},_r=e=>At(e,decodeURI),oa=e=>{const t=e.url,a=t.indexOf("/",t.indexOf(":")+4);let r=a;for(;r<t.length;r++){const n=t.charCodeAt(r);if(n===37){const s=t.indexOf("?",r),i=t.indexOf("#",r),o=s===-1?i===-1?void 0:i:i===-1?s:Math.min(s,i),l=t.slice(a,o);return _r(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(n===63||n===35)break}return t.slice(a,r)},Er=e=>{const t=oa(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Ne=(e,t,...a)=>(a.length&&(t=Ne(t,...a)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),la=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let r="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){a.length===0&&r===""?a.push("/"):a.push(r);const s=n.replace("?","");r+="/"+s,a.push(r)}else r+="/"+n}),a.filter((n,s,i)=>i.indexOf(n)===s)},wt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?At(e,da):e):e,ca=(e,t,a)=>{let r;if(!a&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const o=e.charCodeAt(i+t.length+1);if(o===61){const l=i+t.length+2,c=e.indexOf("&",l);return wt(e.slice(l,c===-1?void 0:c))}else if(o==38||isNaN(o))return"";i=e.indexOf(`&${t}`,i+1)}if(r=/[%+]/.test(e),!r)return}const n={};r??(r=/[%+]/.test(e));let s=e.indexOf("?",8);for(;s!==-1;){const i=e.indexOf("&",s+1);let o=e.indexOf("=",s);o>i&&i!==-1&&(o=-1);let l=e.slice(s+1,o===-1?i===-1?void 0:i:o);if(r&&(l=wt(l)),s=i,l==="")continue;let c;o===-1?c="":(c=e.slice(o+1,i===-1?void 0:i),r&&(c=wt(c))),a?(n[l]&&Array.isArray(n[l])||(n[l]=[]),n[l].push(c)):n[l]??(n[l]=c)}return t?n[t]:n},Tr=ca,xr=(e,t)=>ca(e,t,!0),da=decodeURIComponent,Gt=e=>At(e,da),Be,V,me,ma,pa,St,he,ea,ua=(ea=class{constructor(e,t="/",a=[[]]){R(this,me);S(this,"raw");R(this,Be);R(this,V);S(this,"routeIndex",0);S(this,"path");S(this,"bodyCache",{});R(this,he,e=>{const{bodyCache:t,raw:a}=this,r=t[e];if(r)return r;const n=Object.keys(t)[0];return n?t[n].then(s=>(n==="json"&&(s=JSON.stringify(s)),new Response(s)[e]())):t[e]=a[e]()});this.raw=e,this.path=t,D(this,V,a),D(this,Be,{})}param(e){return e?N(this,me,ma).call(this,e):N(this,me,pa).call(this)}query(e){return Tr(this.url,e)}queries(e){return xr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,r)=>{t[r]=a}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await mr(this,e))}json(){return b(this,he).call(this,"text").then(e=>JSON.parse(e))}text(){return b(this,he).call(this,"text")}arrayBuffer(){return b(this,he).call(this,"arrayBuffer")}blob(){return b(this,he).call(this,"blob")}formData(){return b(this,he).call(this,"formData")}addValidatedData(e,t){b(this,Be)[e]=t}valid(e){return b(this,Be)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[ur](){return b(this,V)}get matchedRoutes(){return b(this,V)[0].map(([[,e]])=>e)}get routePath(){return b(this,V)[0].map(([[,e]])=>e)[this.routeIndex].path}},Be=new WeakMap,V=new WeakMap,me=new WeakSet,ma=function(e){const t=b(this,V)[0][this.routeIndex][1][e],a=N(this,me,St).call(this,t);return a&&/\%/.test(a)?Gt(a):a},pa=function(){const e={},t=Object.keys(b(this,V)[0][this.routeIndex][1]);for(const a of t){const r=N(this,me,St).call(this,b(this,V)[0][this.routeIndex][1][a]);r!==void 0&&(e[a]=/\%/.test(r)?Gt(r):r)}return e},St=function(e){return b(this,V)[1]?b(this,V)[1][e]:e},he=new WeakMap,ea),kr={Stringify:1},ha=async(e,t,a,r,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const s=e.callbacks;return s!=null&&s.length?(n?n[0]+=e:n=[e],Promise.all(s.map(o=>o({phase:t,buffer:n,context:r}))).then(o=>Promise.all(o.filter(Boolean).map(l=>ha(l,t,!1,r,n))).then(()=>n[0]))):Promise.resolve(e)},Sr="text/plain; charset=UTF-8",_t=(e,t)=>({"Content-Type":e,...t}),Ze,Qe,le,je,ce,K,et,Pe,Ue,ke,tt,at,ge,Me,ta,Ir=(ta=class{constructor(e,t){R(this,ge);R(this,Ze);R(this,Qe);S(this,"env",{});R(this,le);S(this,"finalized",!1);S(this,"error");R(this,je);R(this,ce);R(this,K);R(this,et);R(this,Pe);R(this,Ue);R(this,ke);R(this,tt);R(this,at);S(this,"render",(...e)=>(b(this,Pe)??D(this,Pe,t=>this.html(t)),b(this,Pe).call(this,...e)));S(this,"setLayout",e=>D(this,et,e));S(this,"getLayout",()=>b(this,et));S(this,"setRenderer",e=>{D(this,Pe,e)});S(this,"header",(e,t,a)=>{this.finalized&&D(this,K,new Response(b(this,K).body,b(this,K)));const r=b(this,K)?b(this,K).headers:b(this,ke)??D(this,ke,new Headers);t===void 0?r.delete(e):a!=null&&a.append?r.append(e,t):r.set(e,t)});S(this,"status",e=>{D(this,je,e)});S(this,"set",(e,t)=>{b(this,le)??D(this,le,new Map),b(this,le).set(e,t)});S(this,"get",e=>b(this,le)?b(this,le).get(e):void 0);S(this,"newResponse",(...e)=>N(this,ge,Me).call(this,...e));S(this,"body",(e,t,a)=>N(this,ge,Me).call(this,e,t,a));S(this,"text",(e,t,a)=>!b(this,ke)&&!b(this,je)&&!t&&!a&&!this.finalized?new Response(e):N(this,ge,Me).call(this,e,t,_t(Sr,a)));S(this,"json",(e,t,a)=>N(this,ge,Me).call(this,JSON.stringify(e),t,_t("application/json",a)));S(this,"html",(e,t,a)=>{const r=n=>N(this,ge,Me).call(this,n,t,_t("text/html; charset=UTF-8",a));return typeof e=="object"?ha(e,kr.Stringify,!1,{}).then(r):r(e)});S(this,"redirect",(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)});S(this,"notFound",()=>(b(this,Ue)??D(this,Ue,()=>new Response),b(this,Ue).call(this,this)));D(this,Ze,e),t&&(D(this,ce,t.executionCtx),this.env=t.env,D(this,Ue,t.notFoundHandler),D(this,at,t.path),D(this,tt,t.matchResult))}get req(){return b(this,Qe)??D(this,Qe,new ua(b(this,Ze),b(this,at),b(this,tt))),b(this,Qe)}get event(){if(b(this,ce)&&"respondWith"in b(this,ce))return b(this,ce);throw Error("This context has no FetchEvent")}get executionCtx(){if(b(this,ce))return b(this,ce);throw Error("This context has no ExecutionContext")}get res(){return b(this,K)||D(this,K,new Response(null,{headers:b(this,ke)??D(this,ke,new Headers)}))}set res(e){if(b(this,K)&&e){e=new Response(e.body,e);for(const[t,a]of b(this,K).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=b(this,K).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of r)e.headers.append("set-cookie",n)}else e.headers.set(t,a)}D(this,K,e),this.finalized=!0}get var(){return b(this,le)?Object.fromEntries(b(this,le)):{}}},Ze=new WeakMap,Qe=new WeakMap,le=new WeakMap,je=new WeakMap,ce=new WeakMap,K=new WeakMap,et=new WeakMap,Pe=new WeakMap,Ue=new WeakMap,ke=new WeakMap,tt=new WeakMap,at=new WeakMap,ge=new WeakSet,Me=function(e,t,a){const r=b(this,K)?new Headers(b(this,K).headers):b(this,ke)??new Headers;if(typeof t=="object"&&"headers"in t){const s=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,o]of s)i.toLowerCase()==="set-cookie"?r.append(i,o):r.set(i,o)}if(a)for(const[s,i]of Object.entries(a))if(typeof i=="string")r.set(s,i);else{r.delete(s);for(const o of i)r.append(s,o)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??b(this,je);return new Response(e,{status:n,headers:r})},ta),F="ALL",Cr="all",Or=["get","post","put","delete","options","patch"],ga="Can not add a route since the matcher is already built.",fa=class extends Error{},Dr="__COMPOSED_HANDLER",Rr=e=>e.text("404 Not Found",404),Ft=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},Z,W,ya,Q,Te,ut,mt,He,Ar=(He=class{constructor(t={}){R(this,W);S(this,"get");S(this,"post");S(this,"put");S(this,"delete");S(this,"options");S(this,"patch");S(this,"all");S(this,"on");S(this,"use");S(this,"router");S(this,"getPath");S(this,"_basePath","/");R(this,Z,"/");S(this,"routes",[]);R(this,Q,Rr);S(this,"errorHandler",Ft);S(this,"onError",t=>(this.errorHandler=t,this));S(this,"notFound",t=>(D(this,Q,t),this));S(this,"fetch",(t,...a)=>N(this,W,mt).call(this,t,a[1],a[0],t.method));S(this,"request",(t,a,r,n)=>t instanceof Request?this.fetch(a?new Request(t,a):t,r,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Ne("/",t)}`,a),r,n)));S(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(N(this,W,mt).call(this,t.request,t,void 0,t.request.method))})});[...Or,Cr].forEach(s=>{this[s]=(i,...o)=>(typeof i=="string"?D(this,Z,i):N(this,W,Te).call(this,s,b(this,Z),i),o.forEach(l=>{N(this,W,Te).call(this,s,b(this,Z),l)}),this)}),this.on=(s,i,...o)=>{for(const l of[i].flat()){D(this,Z,l);for(const c of[s].flat())o.map(d=>{N(this,W,Te).call(this,c.toUpperCase(),b(this,Z),d)})}return this},this.use=(s,...i)=>(typeof s=="string"?D(this,Z,s):(D(this,Z,"*"),i.unshift(s)),i.forEach(o=>{N(this,W,Te).call(this,F,b(this,Z),o)}),this);const{strict:r,...n}=t;Object.assign(this,n),this.getPath=r??!0?t.getPath??oa:Er}route(t,a){const r=this.basePath(t);return a.routes.map(n=>{var i;let s;a.errorHandler===Ft?s=n.handler:(s=async(o,l)=>(await Ht([],a.errorHandler)(o,()=>n.handler(o,l))).res,s[Dr]=n.handler),N(i=r,W,Te).call(i,n.method,n.path,s)}),this}basePath(t){const a=N(this,W,ya).call(this);return a._basePath=Ne(this._basePath,t),a}mount(t,a,r){let n,s;r&&(typeof r=="function"?s=r:(s=r.optionHandler,r.replaceRequest===!1?n=l=>l:n=r.replaceRequest));const i=s?l=>{const c=s(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};n||(n=(()=>{const l=Ne(this._basePath,t),c=l==="/"?0:l.length;return d=>{const m=new URL(d.url);return m.pathname=m.pathname.slice(c)||"/",new Request(m,d)}})());const o=async(l,c)=>{const d=await a(n(l.req.raw),...i(l));if(d)return d;await c()};return N(this,W,Te).call(this,F,Ne(t,"*"),o),this}},Z=new WeakMap,W=new WeakSet,ya=function(){const t=new He({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,D(t,Q,b(this,Q)),t.routes=this.routes,t},Q=new WeakMap,Te=function(t,a,r){t=t.toUpperCase(),a=Ne(this._basePath,a);const n={basePath:this._basePath,path:a,method:t,handler:r};this.router.add(t,a,[r,n]),this.routes.push(n)},ut=function(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t},mt=function(t,a,r,n){if(n==="HEAD")return(async()=>new Response(null,await N(this,W,mt).call(this,t,a,r,"GET")))();const s=this.getPath(t,{env:r}),i=this.router.match(n,s),o=new Ir(t,{path:s,matchResult:i,env:r,executionCtx:a,notFoundHandler:b(this,Q)});if(i[0].length===1){let c;try{c=i[0][0][0][0](o,async()=>{o.res=await b(this,Q).call(this,o)})}catch(d){return N(this,W,ut).call(this,d,o)}return c instanceof Promise?c.then(d=>d||(o.finalized?o.res:b(this,Q).call(this,o))).catch(d=>N(this,W,ut).call(this,d,o)):c??b(this,Q).call(this,o)}const l=Ht(i[0],this.errorHandler,b(this,Q));return(async()=>{try{const c=await l(o);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return N(this,W,ut).call(this,c,o)}})()},He),va=[];function Lr(e,t){const a=this.buildAllMatchers(),r=((n,s)=>{const i=a[n]||a[F],o=i[2][s];if(o)return o;const l=s.match(i[0]);if(!l)return[[],va];const c=l.indexOf("",1);return[i[1][c],l]});return this.match=r,r(e,t)}var ht="[^/]+",Ye=".*",Ve="(?:|/.*)",$e=Symbol(),Nr=new Set(".\\+*[^]$()");function Mr(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ye||e===Ve?1:t===Ye||t===Ve?-1:e===ht?1:t===ht?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Se,Ie,ee,De,$r=(De=class{constructor(){R(this,Se);R(this,Ie);R(this,ee,Object.create(null))}insert(t,a,r,n,s){if(t.length===0){if(b(this,Se)!==void 0)throw $e;if(s)return;D(this,Se,a);return}const[i,...o]=t,l=i==="*"?o.length===0?["","",Ye]:["","",ht]:i==="/*"?["","",Ve]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const d=l[1];let m=l[2]||ht;if(d&&l[2]&&(m===".*"||(m=m.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(m))))throw $e;if(c=b(this,ee)[m],!c){if(Object.keys(b(this,ee)).some(h=>h!==Ye&&h!==Ve))throw $e;if(s)return;c=b(this,ee)[m]=new De,d!==""&&D(c,Ie,n.varIndex++)}!s&&d!==""&&r.push([d,b(c,Ie)])}else if(c=b(this,ee)[i],!c){if(Object.keys(b(this,ee)).some(d=>d.length>1&&d!==Ye&&d!==Ve))throw $e;if(s)return;c=b(this,ee)[i]=new De}c.insert(o,a,r,n,s)}buildRegExpStr(){const a=Object.keys(b(this,ee)).sort(Mr).map(r=>{const n=b(this,ee)[r];return(typeof b(n,Ie)=="number"?`(${r})@${b(n,Ie)}`:Nr.has(r)?`\\${r}`:r)+n.buildRegExpStr()});return typeof b(this,Se)=="number"&&a.unshift(`#${b(this,Se)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},Se=new WeakMap,Ie=new WeakMap,ee=new WeakMap,De),gt,rt,aa,Br=(aa=class{constructor(){R(this,gt,{varIndex:0});R(this,rt,new $r)}insert(e,t,a){const r=[],n=[];for(let i=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const c=`@\\${i}`;return n[i]=[c,l],i++,o=!0,c}),!o)break}const s=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=n.length-1;i>=0;i--){const[o]=n[i];for(let l=s.length-1;l>=0;l--)if(s[l].indexOf(o)!==-1){s[l]=s[l].replace(o,n[i][1]);break}}return b(this,rt).insert(s,t,r,b(this,gt),a),r}buildRegExp(){let e=b(this,rt).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,s,i)=>s!==void 0?(a[++t]=Number(s),"$()"):(i!==void 0&&(r[Number(i)]=++t),"")),[new RegExp(`^${e}`),a,r]}},gt=new WeakMap,rt=new WeakMap,aa),jr=[/^$/,[],Object.create(null)],pt=Object.create(null);function ba(e){return pt[e]??(pt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function Pr(){pt=Object.create(null)}function Ur(e){var c;const t=new Br,a=[];if(e.length===0)return jr;const r=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,m],[h,v])=>d?1:h?-1:m.length-v.length),n=Object.create(null);for(let d=0,m=-1,h=r.length;d<h;d++){const[v,f,_]=r[d];v?n[f]=[_.map(([T])=>[T,Object.create(null)]),va]:m++;let w;try{w=t.insert(f,m,v)}catch(T){throw T===$e?new fa(f):T}v||(a[m]=_.map(([T,u])=>{const g=Object.create(null);for(u-=1;u>=0;u--){const[p,y]=w[u];g[p]=y}return[T,g]}))}const[s,i,o]=t.buildRegExp();for(let d=0,m=a.length;d<m;d++)for(let h=0,v=a[d].length;h<v;h++){const f=(c=a[d][h])==null?void 0:c[1];if(!f)continue;const _=Object.keys(f);for(let w=0,T=_.length;w<T;w++)f[_[w]]=o[f[_[w]]]}const l=[];for(const d in i)l[d]=a[i[d]];return[s,l,n]}function Ae(e,t){if(e){for(const a of Object.keys(e).sort((r,n)=>n.length-r.length))if(ba(a).test(t))return[...e[a]]}}var fe,ye,ft,wa,ra,Hr=(ra=class{constructor(){R(this,ft);S(this,"name","RegExpRouter");R(this,fe);R(this,ye);S(this,"match",Lr);D(this,fe,{[F]:Object.create(null)}),D(this,ye,{[F]:Object.create(null)})}add(e,t,a){var o;const r=b(this,fe),n=b(this,ye);if(!r||!n)throw new Error(ga);r[e]||[r,n].forEach(l=>{l[e]=Object.create(null),Object.keys(l[F]).forEach(c=>{l[e][c]=[...l[F][c]]})}),t==="/*"&&(t="*");const s=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=ba(t);e===F?Object.keys(r).forEach(c=>{var d;(d=r[c])[t]||(d[t]=Ae(r[c],t)||Ae(r[F],t)||[])}):(o=r[e])[t]||(o[t]=Ae(r[e],t)||Ae(r[F],t)||[]),Object.keys(r).forEach(c=>{(e===F||e===c)&&Object.keys(r[c]).forEach(d=>{l.test(d)&&r[c][d].push([a,s])})}),Object.keys(n).forEach(c=>{(e===F||e===c)&&Object.keys(n[c]).forEach(d=>l.test(d)&&n[c][d].push([a,s]))});return}const i=la(t)||[t];for(let l=0,c=i.length;l<c;l++){const d=i[l];Object.keys(n).forEach(m=>{var h;(e===F||e===m)&&((h=n[m])[d]||(h[d]=[...Ae(r[m],d)||Ae(r[F],d)||[]]),n[m][d].push([a,s-c+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(b(this,ye)).concat(Object.keys(b(this,fe))).forEach(t=>{e[t]||(e[t]=N(this,ft,wa).call(this,t))}),D(this,fe,D(this,ye,void 0)),Pr(),e}},fe=new WeakMap,ye=new WeakMap,ft=new WeakSet,wa=function(e){const t=[];let a=e===F;return[b(this,fe),b(this,ye)].forEach(r=>{const n=r[e]?Object.keys(r[e]).map(s=>[s,r[e][s]]):[];n.length!==0?(a||(a=!0),t.push(...n)):e!==F&&t.push(...Object.keys(r[F]).map(s=>[s,r[F][s]]))}),a?Ur(t):null},ra),ve,de,na,Gr=(na=class{constructor(e){S(this,"name","SmartRouter");R(this,ve,[]);R(this,de,[]);D(this,ve,e.routers)}add(e,t,a){if(!b(this,de))throw new Error(ga);b(this,de).push([e,t,a])}match(e,t){if(!b(this,de))throw new Error("Fatal error");const a=b(this,ve),r=b(this,de),n=a.length;let s=0,i;for(;s<n;s++){const o=a[s];try{for(let l=0,c=r.length;l<c;l++)o.add(...r[l]);i=o.match(e,t)}catch(l){if(l instanceof fa)continue;throw l}this.match=o.match.bind(o),D(this,ve,[o]),D(this,de,void 0);break}if(s===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(b(this,de)||b(this,ve).length!==1)throw new Error("No active router has been determined yet.");return b(this,ve)[0]}},ve=new WeakMap,de=new WeakMap,na),ze=Object.create(null),be,q,Ce,Ge,z,ue,xe,Fe,Fr=(Fe=class{constructor(t,a,r){R(this,ue);R(this,be);R(this,q);R(this,Ce);R(this,Ge,0);R(this,z,ze);if(D(this,q,r||Object.create(null)),D(this,be,[]),t&&a){const n=Object.create(null);n[t]={handler:a,possibleKeys:[],score:0},D(this,be,[n])}D(this,Ce,[])}insert(t,a,r){D(this,Ge,++Ut(this,Ge)._);let n=this;const s=yr(a),i=[];for(let o=0,l=s.length;o<l;o++){const c=s[o],d=s[o+1],m=wr(c,d),h=Array.isArray(m)?m[0]:c;if(h in b(n,q)){n=b(n,q)[h],m&&i.push(m[1]);continue}b(n,q)[h]=new Fe,m&&(b(n,Ce).push(m),i.push(m[1])),n=b(n,q)[h]}return b(n,be).push({[t]:{handler:r,possibleKeys:i.filter((o,l,c)=>c.indexOf(o)===l),score:b(this,Ge)}}),n}search(t,a){var l;const r=[];D(this,z,ze);let s=[this];const i=ia(a),o=[];for(let c=0,d=i.length;c<d;c++){const m=i[c],h=c===d-1,v=[];for(let f=0,_=s.length;f<_;f++){const w=s[f],T=b(w,q)[m];T&&(D(T,z,b(w,z)),h?(b(T,q)["*"]&&r.push(...N(this,ue,xe).call(this,b(T,q)["*"],t,b(w,z))),r.push(...N(this,ue,xe).call(this,T,t,b(w,z)))):v.push(T));for(let u=0,g=b(w,Ce).length;u<g;u++){const p=b(w,Ce)[u],y=b(w,z)===ze?{}:{...b(w,z)};if(p==="*"){const C=b(w,q)["*"];C&&(r.push(...N(this,ue,xe).call(this,C,t,b(w,z))),D(C,z,y),v.push(C));continue}const[E,x,I]=p;if(!m&&!(I instanceof RegExp))continue;const O=b(w,q)[E],k=i.slice(c).join("/");if(I instanceof RegExp){const C=I.exec(k);if(C){if(y[x]=C[0],r.push(...N(this,ue,xe).call(this,O,t,b(w,z),y)),Object.keys(b(O,q)).length){D(O,z,y);const L=((l=C[0].match(/\//))==null?void 0:l.length)??0;(o[L]||(o[L]=[])).push(O)}continue}}(I===!0||I.test(m))&&(y[x]=m,h?(r.push(...N(this,ue,xe).call(this,O,t,y,b(w,z))),b(O,q)["*"]&&r.push(...N(this,ue,xe).call(this,b(O,q)["*"],t,y,b(w,z)))):(D(O,z,y),v.push(O)))}}s=v.concat(o.shift()??[])}return r.length>1&&r.sort((c,d)=>c.score-d.score),[r.map(({handler:c,params:d})=>[c,d])]}},be=new WeakMap,q=new WeakMap,Ce=new WeakMap,Ge=new WeakMap,z=new WeakMap,ue=new WeakSet,xe=function(t,a,r,n){const s=[];for(let i=0,o=b(t,be).length;i<o;i++){const l=b(t,be)[i],c=l[a]||l[F],d={};if(c!==void 0&&(c.params=Object.create(null),s.push(c),r!==ze||n&&n!==ze))for(let m=0,h=c.possibleKeys.length;m<h;m++){const v=c.possibleKeys[m],f=d[c.score];c.params[v]=n!=null&&n[v]&&!f?n[v]:r[v]??(n==null?void 0:n[v]),d[c.score]=!0}}return s},Fe),Oe,sa,Wr=(sa=class{constructor(){S(this,"name","TrieRouter");R(this,Oe);D(this,Oe,new Fr)}add(e,t,a){const r=la(t);if(r){for(let n=0,s=r.length;n<s;n++)b(this,Oe).insert(e,r[n],a);return}b(this,Oe).insert(e,t,a)}match(e,t){return b(this,Oe).search(e,t)}},Oe=new WeakMap,sa),we=class extends Ar{constructor(e={}){super(e),this.router=e.router??new Gr({routers:[new Hr,new Wr]})}},zr=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},r=(s=>typeof s=="string"?s==="*"?()=>s:i=>s===i?i:null:typeof s=="function"?s:i=>s.includes(i)?i:null)(a.origin),n=(s=>typeof s=="function"?s:Array.isArray(s)?()=>s:()=>[])(a.allowMethods);return async function(i,o){var d;function l(m,h){i.res.headers.set(m,h)}const c=await r(i.req.header("origin")||"",i);if(c&&l("Access-Control-Allow-Origin",c),a.credentials&&l("Access-Control-Allow-Credentials","true"),(d=a.exposeHeaders)!=null&&d.length&&l("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),i.req.method==="OPTIONS"){a.origin!=="*"&&l("Vary","Origin"),a.maxAge!=null&&l("Access-Control-Max-Age",a.maxAge.toString());const m=await n(i.req.header("origin")||"",i);m.length&&l("Access-Control-Allow-Methods",m.join(","));let h=a.allowHeaders;if(!(h!=null&&h.length)){const v=i.req.header("Access-Control-Request-Headers");v&&(h=v.split(/\s*,\s*/))}return h!=null&&h.length&&(l("Access-Control-Allow-Headers",h.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),a.origin!=="*"&&i.header("Vary","Origin",{append:!0})}};function _a(){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="theme-color" content="#f5f0e8">
  <title>Karna</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400&display=swap" rel="stylesheet">
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
      '<div class="auth-tagline">AI Personal Assistant</div>' +
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
      html += '<div class="dash-card" onclick="viewMemoryModal()"><div class="dash-card-icon">&#128452;</div><div class="dash-card-value">' + (data.memories || 0) + '</div><div class="dash-card-label">Memories</div></div>';
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
</html>`}const Lt="AES-GCM",qr=256;async function Ea(e){const t=new TextEncoder,a=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},a,{name:Lt,length:qr},!1,["encrypt","decrypt"])}async function Nt(e,t){const a=await Ea(t),r=crypto.getRandomValues(new Uint8Array(12)),n=new TextEncoder,s=await crypto.subtle.encrypt({name:Lt,iv:r},a,n.encode(e)),i=new Uint8Array(r.length+new Uint8Array(s).length);return i.set(r),i.set(new Uint8Array(s),r.length),btoa(String.fromCharCode(...i))}async function U(e,t){const a=await Ea(t),r=new Uint8Array(atob(e).split("").map(o=>o.charCodeAt(0))),n=r.slice(0,12),s=r.slice(12),i=await crypto.subtle.decrypt({name:Lt,iv:n},a,s);return new TextDecoder().decode(i)}async function yt(e){const a=new TextEncoder().encode(e+"karna-pin-salt"),r=await crypto.subtle.digest("SHA-256",a);return btoa(String.fromCharCode(...new Uint8Array(r)))}async function Ta(e,t){return await yt(e)===t}const xa=Object.freeze(Object.defineProperty({__proto__:null,decrypt:U,encrypt:Nt,hashPin:yt,verifyPin:Ta},Symbol.toStringTag,{value:"Module"})),_e=new we;_e.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});_e.post("/setup",async e=>{const{username:t,name:a,pin:r,personality_prompt:n,timezone:s}=await e.req.json();if(!t||!a||!r)return e.json({error:"Username, name, and PIN are required"},400);if(r.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const o=await yt(r);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,a,o,n||"",s||"Asia/Kolkata").run();const l=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),c=crypto.randomUUID(),d=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(c,l.id,"web",d).run(),e.json({success:!0,sessionId:c,user:{id:l.id,username:l.username,name:l.name}})});_e.post("/login",async e=>{const{username:t,pin:a}=await e.req.json();if(!t||!a)return e.json({error:"Username and PIN required"},400);const r=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!r)return e.json({error:"User not found"},404);if(!await Ta(a,r.pin_hash))return e.json({error:"Invalid PIN"},401);const s=crypto.randomUUID(),i=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(s,r.id,"web",i).run(),e.json({success:!0,sessionId:s,user:{id:r.id,username:r.username,name:r.name}})});_e.post("/logout",async e=>{var a;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});_e.get("/users/hints",async e=>{const a=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(r=>{var n;return{username:r.username,name_hint:r.name.split(" ")[0],created:((n=r.created_at)==null?void 0:n.split(" ")[0])||""}});return e.json({users:a,count:a.length})});_e.post("/reset-pin",async e=>{var o;const{username:t,name:a,new_pin:r}=await e.req.json();if(!t||!a||!r)return e.json({error:"Username, display name, and new PIN are required"},400);if(r.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const n=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!n)return e.json({error:"User not found"},404);if(n.name.toLowerCase().trim()!==a.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const s=await yt(r);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,n.id).run();const i=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(n.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(n.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((o=i.meta)==null?void 0:o.changes)||0})});_e.get("/me",async e=>{var r;const t=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return a?e.json({user:{id:a.uid,username:a.username,name:a.name,role:a.role,timezone:a.timezone}}):e.json({error:"Invalid or expired session"},401)});const Xe={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},Kr=25e3;function ka(e,t){return Promise.race([e,new Promise((a,r)=>setTimeout(()=>r(new Error(`LLM timeout: ${t} did not respond within 25 seconds. Try again or switch providers in Settings → Keys.`)),Kr))])}async function A(e,t,a,r,n,s={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,a,r,n,JSON.stringify(s)).run()}catch(i){console.error("Failed to log error:",i)}}async function Et(e,t,a,r,n,s){try{const i=`provider_alert:${r}:${a}`;if(await e.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(t,i).first())return;await A(e,t,"provider_alert",i,`${r} failed: ${s.substring(0,200)}`,{alertType:a,failedProvider:r,fallbackProvider:n});let l;a==="all_providers_down"?l=`🚨 All LLM providers failed

Last error from ${r}: ${Wt(s)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:l=`⚠️ LLM Provider Issue

${r}: ${Wt(s)}
Switched to: ${n}

Check your ${r} API credit balance or key.`;const{decrypt:c}=await Promise.resolve().then(()=>xa),d=await e.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(t).first();if(!(d!=null&&d.telegram_chat_id))return;const m=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(t).first();if(!m)return;const h=await c(m.encrypted_value,d.pin_hash);await fetch(`https://api.telegram.org/bot${h}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d.telegram_chat_id,text:l})})}catch(i){console.error("Failed to send provider alert:",i)}}function Wt(e){return e.includes("credit balance")||e.includes("insufficient")||e.includes("402")?"Credits exhausted or balance too low":e.includes("429")||e.includes("rate_limit")||e.includes("quota")?"Rate limit / quota exceeded":e.includes("401")||e.includes("authentication")||e.includes("invalid")&&e.includes("key")?"API key invalid or expired":e.includes("403")?"Access denied (key may lack permissions)":e.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":e.includes("properties field not found")?"Schema compatibility issue":"API error"}class Sa{constructor(t,a="claude-sonnet-4-20250514",r="https://api.anthropic.com",n="anthropic"){S(this,"name");S(this,"apiKey");S(this,"model");S(this,"apiBase");this.apiKey=t,this.model=a,this.apiBase=r,this.name=n}async chat(t,a){var d,m,h,v;const r=t.find(f=>f.role==="system"),n=t.filter(f=>f.role!=="system"),s={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:n.map(f=>({role:f.role,content:f.content}))};r&&(s.system=r.content),a!=null&&a.tools&&a.tools.length>0&&(s.tools=a.tools.map(f=>({name:f.name,description:f.description,input_schema:f.parameters})));const i=await ka(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)}),this.name);if(!i.ok){const f=await i.text();throw new Error(this.name+" API error "+i.status+": "+f)}const o=await i.json(),l=((d=o.content)==null?void 0:d.filter(f=>f.type==="text"))||[],c=((m=o.content)==null?void 0:m.filter(f=>f.type==="tool_use"))||[];return{content:l.map(f=>f.text).join(`
`),toolCalls:c.map(f=>({id:f.id,name:f.name,arguments:f.input})),usage:{promptTokens:((h=o.usage)==null?void 0:h.input_tokens)||0,completionTokens:((v=o.usage)==null?void 0:v.output_tokens)||0}}}async streamChat(t,a){const r=t.find(c=>c.role==="system"),n=t.filter(c=>c.role!=="system"),s={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:n.map(c=>({role:c.role,content:c.content}))};r&&(s.system=r.content);const i=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)});if(!i.ok){const c=await i.text();throw new Error(this.name+" stream error "+i.status+": "+c)}const o=i.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(c){var f;const{done:d,value:m}=await o.read();if(d){c.close();return}const v=l.decode(m,{stream:!0}).split(`
`);for(const _ of v)if(_.startsWith("data: ")){const w=_.slice(6);if(w==="[DONE]")continue;try{const T=JSON.parse(w);T.type==="content_block_delta"&&((f=T.delta)!=null&&f.text)&&c.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:T.delta.text})+`

`))}catch{}}}})}}function Jr(e){const t={},a=e||{};if(t.type=a.type||"object",t.type==="object"){const r=a.properties;if(r&&typeof r=="object"&&Object.keys(r).length>0){const n={};for(const[s,i]of Object.entries(r))i&&typeof i=="object"?n[s]=It(i):n[s]=i;t.properties=n}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(a.required)?t.required=a.required:t.required=[]}return a.description&&(t.description=a.description),t}function It(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const a=t.properties;if(a&&typeof a=="object"&&Object.keys(a).length>0){const r={};for(const[n,s]of Object.entries(a))s&&typeof s=="object"?r[n]=It(s):r[n]=s;t.properties=r}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=It(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class Ia{constructor(t,a,r,n){S(this,"name");S(this,"apiKey");S(this,"model");S(this,"apiBase");this.apiKey=t,this.model=a,this.apiBase=r.replace(/\/+$/,""),this.name=n}async chat(t,a){var l,c,d,m,h,v;const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,messages:t.map(f=>({role:f.role,content:f.content}))},n=this.apiBase.includes("routellm.abacus.ai");if(a!=null&&a.tools&&a.tools.length>0&&n)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");a!=null&&a.tools&&a.tools.length>0&&(r.tools=a.tools.map(f=>({type:"function",function:{name:f.name,description:f.description,parameters:Jr(f.parameters||{})}})));const s=await ka(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)}),this.name);if(!s.ok){const f=await s.text();throw new Error(this.name+" API error "+s.status+": "+f)}const i=await s.json(),o=(l=i.choices)==null?void 0:l[0];return{content:((c=o==null?void 0:o.message)==null?void 0:c.content)||"",toolCalls:(m=(d=o==null?void 0:o.message)==null?void 0:d.tool_calls)==null?void 0:m.map(f=>({id:f.id,name:f.function.name,arguments:(()=>{try{return typeof f.function.arguments=="string"?JSON.parse(f.function.arguments||"{}"):f.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((h=i.usage)==null?void 0:h.prompt_tokens)||0,completionTokens:((v=i.usage)==null?void 0:v.completion_tokens)||0}}}async streamChat(t,a){const r={model:this.model,max_tokens:(a==null?void 0:a.maxTokens)||4096,temperature:(a==null?void 0:a.temperature)??.7,stream:!0,messages:t.map(o=>({role:o.role,content:o.content}))},n=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)});if(!n.ok){const o=await n.text();throw new Error(this.name+" stream error "+n.status+": "+o)}const s=n.body.getReader(),i=new TextDecoder;return new ReadableStream({async pull(o){var h,v,f;const{done:l,value:c}=await s.read();if(l){o.close();return}const m=i.decode(c,{stream:!0}).split(`
`);for(const _ of m)if(_.startsWith("data: ")){const w=_.slice(6);if(w==="[DONE]")continue;try{const u=(f=(v=(h=JSON.parse(w).choices)==null?void 0:h[0])==null?void 0:v.delta)==null?void 0:f.content;u&&o.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:u})+`

`))}catch{}}}})}}function Ct(e,t,a,r){const n=Xe[e];if(!n)throw new Error(`Unknown LLM provider: ${e}`);const s=r||n.defaultModel;return n.apiFormat==="anthropic"?new Sa(t,s,n.apiBase,a):new Ia(t,s,n.apiBase,a)}class Ca{constructor(){S(this,"errorLog",new Map);S(this,"usageLog",new Map)}async pickProvider(t){const a=Date.now(),r=t.filter(n=>{const s=this.errorLog.get(n);return s?s.cooldownUntil<=a:!0});return r.length>0?r[0]:null}async recordUsage(t,a){const r=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:r.tokens+a,requests:r.requests+1})}async recordError(t,a,r=5){this.errorLog.set(t,{error:a,cooldownUntil:Date.now()+r*60*1e3})}}const Yr=["llm_slot_1","llm_slot_2","llm_slot_3"],Vr=["anthropic","openai"];async function nt(e,t,a){const{decrypt:r}=await Promise.resolve().then(()=>xa),n=new Ca,s=[];for(const m of Yr){const h=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,m).first();if(h)try{const v=await r(h.encrypted_value,a),f=JSON.parse(v);if(f.provider&&f.apiKey&&Xe[f.provider]){const w=f.provider,T=Ct(f.provider,f.apiKey,w,f.model);s.push({name:w,provider:T})}}catch(v){console.error(`Failed to load ${m}:`,v)}}const i=new Set(s.map(m=>m.name));for(const m of Vr){if(i.has(m))continue;const h=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,m).first();if(h)try{const v=await r(h.encrypted_value,a);if(Xe[m]){const _=Ct(m,v,m);s.push({name:m,provider:_})}}catch{console.error(`Failed to decrypt legacy ${m} key`)}}if(s.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const o=s.map(m=>m.name),l=await n.pickProvider(o);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:s[0].provider,rotation:n};const c=s.find(m=>m.name===l);return{provider:Xr(c.provider,s,n,e,t),rotation:n}}function Xr(e,t,a,r,n){const s=i=>i.includes("401")||i.includes("403")||i.includes("authentication")||i.includes("credit balance")||i.includes("invalid")&&i.includes("key")||i.includes("properties field not found")||i.includes("TOOLS_UNSUPPORTED");return t.length<=1?{name:e.name,async chat(i,o){try{return await e.chat(i,o)}catch(l){const c=l.message||"";throw s(c)&&!c.includes("TOOLS_UNSUPPORTED")&&Et(r,n,"all_providers_down",e.name,null,c),l}},async streamChat(i,o){return await e.streamChat(i,o)}}:{name:e.name,async chat(i,o){try{return await e.chat(i,o)}catch(l){const c=l.message||"";if(!s(c))throw l;const d=c.includes("TOOLS_UNSUPPORTED");console.warn(`Provider ${e.name} ${d?"tools unsupported":"auth/billing error"}, trying fallback...`),await a.recordError(e.name,c,d?1:1440);const m=t.filter(h=>h.name!==e.name);for(const h of m)try{const v=await h.provider.chat(i,o);return this.name=h.name,d||Et(r,n,"provider_switched",e.name,h.name,c),v}catch(v){const f=v.message||"";if(s(f)){await a.recordError(h.name,f,1440);continue}throw v}throw Et(r,n,"all_providers_down",e.name,null,c),new Error(`All LLM providers failed. Primary (${e.name}): ${c.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(i,o){return await e.streamChat(i,o)}}}const Ot=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:Sa,OpenAICompatibleProvider:Ia,ProviderRotation:Ca,createProviderFromConfig:Ct,createRotatingProvider:nt,logError:A},Symbol.toStringTag,{value:"Module"})),Tt=20,Zr=2e3,Qr=2e3,Oa=4;function en(e){return Math.ceil(e.length/Oa)}function zt(e,t){const a=t*Oa;return e.length<=a?e:e.slice(0,a)+`
[...truncated to fit token budget]`}class te{constructor(t){this.db=t}async store(t,a,r,n,s=5,i="working"){const o=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,a,r).first();o?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,s,i,o.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,a,r,n,s,i).run(),i==="working"&&await this.enforceWorkingMemoryCap(t)}async enforceWorkingMemoryCap(t){const a=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((a==null?void 0:a.cnt)||0)>Tt){const r=((a==null?void 0:a.cnt)||0)-Tt;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ? AND tier = 'working' AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' 
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,r).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,Tt).all()).results||[]}async getAll(t,a,r=50){return a?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,a,r).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,r).all()).results||[]}async search(t,a,r=10){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${a}%`,`%${a}%`,r).all()).results||[]}async update(t,a,r){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t,a).run()}async promote(t,a){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,a).run(),await this.enforceWorkingMemoryCap(a)}async demote(t,a){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,a).run()}async remove(t,a){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,a).run()}async buildContext(t){const a=await this.getWorkingMemory(t);if(a.length===0)return"";const r={};for(const s of a)r[s.type]||(r[s.type]=[]),r[s.type].push(s);let n=`
## Working Memory (Active Context)
`;for(const[s,i]of Object.entries(r)){n+=`
### ${s.charAt(0).toUpperCase()+s.slice(1)}s
`;for(const o of i)n+=`- **${o.title}**: ${o.content}
`}return zt(n,Zr)}static truncatePersonality(t){return zt(t,Qr)}async getRecentConversations(t,a=20,r){return r?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,r,a).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,a).all()).results||[]).reverse()}async storeMessage(t,a,r,n,s="{}",i){const o=en(n);i?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,a,r,n,s,o,i).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,a,r,n,s,o).run()}async compactHistory(t,a=30){const r=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((r==null?void 0:r.cnt)||0)<=a*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,a).run()}}const tn="https://accounts.google.com/o/oauth2/v2/auth",Da="https://oauth2.googleapis.com/token",an="https://www.googleapis.com/oauth2/v2/userinfo",rn=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let ne=null;async function Dt(e,t,a){const r=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!r)return null;try{const n=await U(r.encrypted_value,a);return JSON.parse(n)}catch{return null}}async function nn(e,t,a,r){const n=await Nt(JSON.stringify(r),a);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,n).run()}function Ra(e,t,a){const r=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:rn,access_type:"offline",prompt:"consent",state:a,include_granted_scopes:"true"});return`${tn}?${r}`}async function Aa(e,t,a,r){const n=await fetch(Da,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:a,redirect_uri:r,grant_type:"authorization_code"})}),s=await n.text();if(!n.ok)throw new Error(`Token exchange failed (${n.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function sn(e,t,a){const r=await fetch(Da,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:a,grant_type:"refresh_token"})}),n=await r.text();if(!r.ok)throw r.status===400||r.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${r.status}): ${n.substring(0,300)}`);return JSON.parse(n)}async function La(e){const t=await fetch(an,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function We(e,t,a,r,n){if(!r||!n)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(ne&&ne.userId===t&&ne.expiresAt>Date.now()/1e3+60){const o=await Dt(e,t,a);return{token:ne.token,email:(o==null?void 0:o.email)||"unknown"}}const s=await Dt(e,t,a);if(!s)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const i=await sn(s.refresh_token,r,n);return ne={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{token:i.access_token,email:s.email}}async function Mt(e,t,a){try{const r=await Dt(e,t,a);return r?{connected:!0,email:r.email,connectedAt:r.connected_at}:{connected:!1}}catch{return{connected:!1}}}function Na(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function Ma(e,t,a,r,n,s,i){const o=await Aa(r,s,i,n);if(!o.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await La(o.access_token),c={refresh_token:o.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await nn(e,t,a,c),ne={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{email:l.email,name:l.name}}async function $a(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(ne==null?void 0:ne.userId)===t&&(ne=null)}const qe="https://sheets.googleapis.com/v4/spreadsheets";class Ba{constructor(t,a,r,n,s){this.db=t,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await We(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,a){const r=await this.authHeaders(),n=encodeURIComponent(a),s=await fetch(`${qe}/${t}/values/${n}`,{headers:r});if(!s.ok){const o=await s.text();throw new Error(`Sheets read failed (${s.status}): ${o}`)}return(await s.json()).values||[]}async writeRange(t,a,r){const n=await this.authHeaders(),s=encodeURIComponent(a),i=await fetch(`${qe}/${t}/values/${s}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:n,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!i.ok){const l=await i.text();throw new Error(`Sheets write failed (${i.status}): ${l}`)}return{updatedCells:(await i.json()).updatedCells||0}}async appendRows(t,a,r){var l;const n=await this.authHeaders(),s=encodeURIComponent(a),i=await fetch(`${qe}/${t}/values/${s}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:n,body:JSON.stringify({range:a,majorDimension:"ROWS",values:r})});if(!i.ok){const c=await i.text();throw new Error(`Sheets append failed (${i.status}): ${c}`)}return{updatedCells:((l=(await i.json()).updates)==null?void 0:l.updatedCells)||r.length}}async createSpreadsheet(t,a){const r=await this.authHeaders(),n={properties:{title:t},sheets:a&&a.length>0?a.map(o=>({properties:{title:o}})):[{properties:{title:"Sheet1"}}]},s=await fetch(qe,{method:"POST",headers:r,body:JSON.stringify(n)});if(!s.ok){const o=await s.text();throw new Error(`Sheets create failed (${s.status}): ${o}`)}const i=await s.json();return{spreadsheetId:i.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${i.spreadsheetId}/edit`}}async getMetadata(t){const a=await this.authHeaders(),r=await fetch(`${qe}/${t}?fields=properties.title,sheets.properties.title`,{headers:a});if(!r.ok){const s=await r.text();throw new Error(`Sheets metadata failed (${r.status}): ${s}`)}const n=await r.json();return{title:n.properties.title,sheets:n.sheets.map(s=>s.properties.title)}}}const Ke="https://www.googleapis.com/calendar/v3";class $t{constructor(t,a,r,n,s){this.db=t,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await We(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",a={}){const r=await this.authHeaders(),n=new URLSearchParams;a.timeMin&&n.set("timeMin",a.timeMin),a.timeMax&&n.set("timeMax",a.timeMax),n.set("maxResults",String(a.maxResults||20)),n.set("singleEvents","true"),n.set("orderBy","startTime"),a.query&&n.set("q",a.query);const s=await fetch(`${Ke}/calendars/${encodeURIComponent(t)}/events?${n}`,{headers:r});if(!s.ok){const o=await s.text();throw new Error(`Calendar list failed (${s.status}): ${o}`)}return(await s.json()).items||[]}async createEvent(t="primary",a){var o;const r=await this.authHeaders(),n=a.timeZone||"Asia/Kolkata",s={summary:a.summary,description:a.description||"",location:a.location||"",start:{dateTime:a.startDateTime,timeZone:n},end:{dateTime:a.endDateTime,timeZone:n}};(o=a.attendees)!=null&&o.length&&(s.attendees=a.attendees.map(l=>({email:l})));const i=await fetch(`${Ke}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:r,body:JSON.stringify(s)});if(!i.ok){const l=await i.text();throw new Error(`Calendar create failed (${i.status}): ${l}`)}return await i.json()}async updateEvent(t="primary",a,r){const n=await this.authHeaders(),s=r.timeZone||"Asia/Kolkata",i={};r.summary&&(i.summary=r.summary),r.description&&(i.description=r.description),r.location&&(i.location=r.location),r.startDateTime&&(i.start={dateTime:r.startDateTime,timeZone:s}),r.endDateTime&&(i.end={dateTime:r.endDateTime,timeZone:s});const o=await fetch(`${Ke}/calendars/${encodeURIComponent(t)}/events/${a}`,{method:"PATCH",headers:n,body:JSON.stringify(i)});if(!o.ok){const l=await o.text();throw new Error(`Calendar update failed (${o.status}): ${l}`)}return await o.json()}async deleteEvent(t="primary",a){const r=await this.authHeaders(),n=await fetch(`${Ke}/calendars/${encodeURIComponent(t)}/events/${a}`,{method:"DELETE",headers:r});if(!n.ok&&n.status!==410){const s=await n.text();throw new Error(`Calendar delete failed (${n.status}): ${s}`)}}async listCalendars(){const t=await this.authHeaders(),a=await fetch(`${Ke}/users/me/calendarList`,{headers:t});if(!a.ok){const n=await a.text();throw new Error(`Calendar list calendars failed (${a.status}): ${n}`)}return((await a.json()).items||[]).map(n=>({id:n.id,summary:n.summary,primary:n.primary||!1}))}}const ct="https://docs.googleapis.com/v1/documents",on="https://www.googleapis.com/drive/v3/files";class ja{constructor(t,a,r,n,s){this.db=t,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await We(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const a=await this.authHeaders(),r=await fetch(ct,{method:"POST",headers:a,body:JSON.stringify({title:t})});if(!r.ok){const s=await r.text();throw new Error(`Docs create failed (${r.status}): ${s}`)}const n=await r.json();return{documentId:n.documentId,url:`https://docs.google.com/document/d/${n.documentId}/edit`}}async readDocument(t){var i,o;const a=await this.authHeaders(),r=await fetch(`${ct}/${t}`,{headers:a});if(!r.ok){const l=await r.text();throw new Error(`Docs read failed (${r.status}): ${l}`)}const n=await r.json();let s="";for(const l of((i=n.body)==null?void 0:i.content)||[])if(l.paragraph)for(const c of l.paragraph.elements)(o=c.textRun)!=null&&o.content&&(s+=c.textRun.content);return{title:n.title,content:s.trim()}}async appendText(t,a){const r=await this.authHeaders(),n=await fetch(`${ct}/${t}`,{headers:r});if(!n.ok){const l=await n.text();throw new Error(`Docs read for append failed (${n.status}): ${l}`)}const s=await n.json(),i=s.body.content[s.body.content.length-1].endIndex-1,o=await fetch(`${ct}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{insertText:{location:{index:i},text:a}}]})});if(!o.ok){const l=await o.text();throw new Error(`Docs append failed (${o.status}): ${l}`)}}async shareDocument(t,a,r="writer"){const n=await this.authHeaders(),s=await fetch(`${on}/${t}/permissions`,{method:"POST",headers:n,body:JSON.stringify({type:"user",role:r,emailAddress:a})});if(!s.ok){const i=await s.text();throw new Error(`Share failed (${s.status}): ${i}`)}}}class re{constructor(t,a,r,n,s){S(this,"sheets");S(this,"calendar");S(this,"docs");S(this,"db");S(this,"userId");S(this,"pinHash");this.db=t,this.userId=a,this.pinHash=r,this.sheets=new Ba(t,a,r,n,s),this.calendar=new $t(t,a,r,n,s),this.docs=new ja(t,a,r,n,s)}async isConnected(){return Mt(this.db,this.userId,this.pinHash)}}const dt=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:$t,GoogleDocs:ja,GoogleServices:re,GoogleSheets:Ba,completeOAuthFlow:Ma,disconnectGoogle:$a,exchangeCodeForTokens:Aa,fetchUserInfo:La,generateAuthUrl:Ra,getGoogleAuth:We,isGoogleConnected:Mt,isOAuthClientConfigured:Na},Symbol.toStringTag,{value:"Module"}));async function Pa(e,t,a={}){const r={textQuery:t,languageCode:"en",pageSize:8};if(a.type&&(r.includedType=a.type),a.location){const l=a.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(r.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:a.radius||5e3}})}const n=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),s=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":n},body:JSON.stringify(r)});if(!s.ok){const l=await s.text();return{results:[],error:`Places API error (${s.status}): ${l.substring(0,200)}`}}const i=await s.json();return!i.places||i.places.length===0?{results:[]}:{results:i.places.map(l=>{var c,d,m;return{name:((c=l.displayName)==null?void 0:c.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(d=l.currentOpeningHours)==null?void 0:d.openNow,types:(m=l.types)==null?void 0:m.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function Ua(e,t){var s,i,o;const a=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),r=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":a}});if(!r.ok){const l=await r.text();return{error:`Place Details API error (${r.status}): ${l.substring(0,200)}`}}const n=await r.json();return{details:{name:((s=n.displayName)==null?void 0:s.text)||"",address:n.formattedAddress||"",phone:n.internationalPhoneNumber,website:n.websiteUri,rating:n.rating,reviews:(i=n.reviews)==null?void 0:i.slice(0,3).map(l=>{var c,d,m;return{author:((c=l.authorAttribution)==null?void 0:c.displayName)||"Anonymous",rating:l.rating||0,text:((m=(d=l.text)==null?void 0:d.text)==null?void 0:m.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(o=n.currentOpeningHours)==null?void 0:o.weekdayDescriptions,location:n.location?{lat:n.location.latitude,lng:n.location.longitude}:void 0,googleMapsUri:n.googleMapsUri}}}async function Ha(e,t,a,r={}){var c;const n=new URLSearchParams({origin:t,destination:a,key:e,mode:r.mode||"driving"});(r.mode==="driving"||!r.mode)&&n.set("departure_time","now");const s=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${n}`);if(!s.ok)return{error:`Directions API error: ${s.status}`};const i=await s.json();if(i.status!=="OK")return{error:`Directions: ${i.status} — ${i.error_message||""}`};const o=i.routes[0],l=o.legs[0];return{route:{summary:o.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(c=l.duration_in_traffic)==null?void 0:c.text,steps:l.steps.slice(0,10).map(d=>{var m,h,v;return{instruction:((m=d.html_instructions)==null?void 0:m.replace(/<[^>]*>/g,""))||"",distance:((h=d.distance)==null?void 0:h.text)||"",duration:((v=d.duration)==null?void 0:v.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function Ga(e,t,a,r){var l,c;const n={q:t,target:a,key:e,format:"text"};r&&(n.source=r);const s=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){const d=await s.text();return{translatedText:"",error:`Translate API error (${s.status}): ${d.substring(0,200)}`}}const o=(c=(l=(await s.json()).data)==null?void 0:l.translations)==null?void 0:c[0];return o?{translatedText:o.translatedText,detectedSourceLang:o.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function Fa(e,t){const a=new URLSearchParams({address:t,key:e}),r=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${a}`);if(!r.ok)return{results:[],error:`Geocoding API error: ${r.status}`};const n=await r.json();return n.status!=="OK"&&n.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${n.status} — ${n.error_message||""}`}:{results:(n.results||[]).slice(0,5).map(s=>{var i;return{address:s.formatted_address,lat:s.geometry.location.lat,lng:s.geometry.location.lng,placeId:s.place_id,types:(i=s.types)==null?void 0:i.slice(0,3)}})}}async function Wa(e,t,a={}){const r=new URLSearchParams({part:"snippet",q:t,key:e,type:a.type||"video",maxResults:String(a.maxResults||5),order:a.order||"relevance"}),n=await fetch(`https://www.googleapis.com/youtube/v3/search?${r}`);if(!n.ok){const i=await n.text();return{results:[],error:`YouTube API error (${n.status}): ${i.substring(0,200)}`}}return{results:((await n.json()).items||[]).map(i=>{var o,l,c,d,m,h,v,f;return{title:i.snippet.title,channelTitle:i.snippet.channelTitle,description:(o=i.snippet.description)==null?void 0:o.substring(0,200),videoId:((l=i.id)==null?void 0:l.videoId)||((c=i.id)==null?void 0:c.channelId)||((d=i.id)==null?void 0:d.playlistId)||"",publishedAt:i.snippet.publishedAt,url:(m=i.id)!=null&&m.videoId?`https://www.youtube.com/watch?v=${i.id.videoId}`:(h=i.id)!=null&&h.channelId?`https://www.youtube.com/channel/${i.id.channelId}`:"",thumbnailUrl:(f=(v=i.snippet.thumbnails)==null?void 0:v.medium)==null?void 0:f.url}})}}async function vt(e,t={}){const a=Math.min(t.num||5,10),r=t.site?`site:${t.site} ${e}`:e;try{const n=new URLSearchParams({q:r}),s=await fetch(`https://html.duckduckgo.com/html/?${n}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!s.ok)return{results:[],error:`Search request failed (${s.status})`};const i=await s.text(),o=[],l=i.split(/class="result results_links/g).slice(1);for(const c of l){if(o.length>=a)break;const d=c.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),m=c.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(d){let h=d[1];const v=h.match(/uddg=([^&]+)/);v?h=decodeURIComponent(v[1]):h.startsWith("//")&&(h="https:"+h);const f=T=>T.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),_=f(d[2]),w=m?f(m[1]):"";if(_&&h.startsWith("http")){const T=h.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];o.push({title:_,link:h,snippet:w,displayLink:T})}}}return o.length===0?{results:[],error:void 0}:{results:o}}catch(n){return{results:[],error:`Web search error: ${n.message}`}}}async function za(e,t,a,r="driving"){var l,c,d,m;const n=new URLSearchParams({origins:t,destinations:a,key:e,mode:r,departure_time:"now"}),s=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${n}`);if(!s.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${s.status}`};const i=await s.json(),o=(d=(c=(l=i.rows)==null?void 0:l[0])==null?void 0:c.elements)==null?void 0:d[0];return!o||o.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(o==null?void 0:o.status)||i.status}`}:{distance:o.distance.text,duration:o.duration.text,durationInTraffic:(m=o.duration_in_traffic)==null?void 0:m.text}}const ln=Object.freeze(Object.defineProperty({__proto__:null,geocode:Fa,getDirections:Ha,getDistanceMatrix:za,getPlaceDetails:Ua,searchPlaces:Pa,searchYouTube:Wa,translateText:Ga,webSearch:vt},Symbol.toStringTag,{value:"Module"})),ie="https://gmail.googleapis.com/gmail/v1/users/me";class oe{constructor(t,a,r,n,s){this.db=t,this.userId=a,this.pinHash=r,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await We(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var o;const a=await this.authHeaders(),r=new URLSearchParams;if(r.set("maxResults",String(t.maxResults||10)),t.query&&r.set("q",t.query),(o=t.labelIds)!=null&&o.length)for(const l of t.labelIds)r.append("labelIds",l);const n=await fetch(`${ie}/messages?${r}`,{headers:a});if(!n.ok){const l=await n.text();throw new Error(`Gmail list failed (${n.status}): ${l.substring(0,200)}`)}const s=await n.json();if(!s.messages||s.messages.length===0)return[];const i=[];for(const l of s.messages.slice(0,t.maxResults||10))try{const c=await this.getMessage(l.id,a);c&&i.push(c)}catch{}return i}async getMessage(t,a){const r=a||await this.authHeaders(),n=await fetch(`${ie}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:r});if(!n.ok)return null;const s=await n.json(),i=o=>{var l,c,d;return((d=(c=(l=s.payload)==null?void 0:l.headers)==null?void 0:c.find(m=>m.name.toLowerCase()===o.toLowerCase()))==null?void 0:d.value)||""};return{id:s.id,threadId:s.threadId,snippet:s.snippet||"",subject:i("Subject")||"(no subject)",from:i("From"),to:i("To"),date:i("Date")||new Date(parseInt(s.internalDate)).toISOString(),isUnread:(s.labelIds||[]).includes("UNREAD"),labels:s.labelIds||[]}}async getMessageBody(t){const a=await this.authHeaders(),r=await fetch(`${ie}/messages/${t}?format=full`,{headers:a});if(!r.ok){const s=await r.text();throw new Error(`Gmail message body failed (${r.status}): ${s.substring(0,200)}`)}const n=await r.json();return qa(n.payload)}async search(t,a=10){return this.listMessages({query:t,maxResults:a})}async send(t,a,r,n={}){const s=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];n.cc&&i.push(`Cc: ${n.cc}`),n.bcc&&i.push(`Bcc: ${n.bcc}`),n.replyToMessageId&&(i.push(`In-Reply-To: ${n.replyToMessageId}`),i.push(`References: ${n.replyToMessageId}`)),i.push("",r);const o=i.join(`\r
`),c={raw:btoa(unescape(encodeURIComponent(o))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};n.threadId&&(c.threadId=n.threadId);const d=await fetch(`${ie}/messages/send`,{method:"POST",headers:s,body:JSON.stringify(c)});if(!d.ok){const m=await d.text();throw new Error(`Gmail send failed (${d.status}): ${m.substring(0,200)}`)}return await d.json()}async createDraft(t,a,r,n={}){const s=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${a}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];n.cc&&i.push(`Cc: ${n.cc}`),i.push("",r);const o=i.join(`\r
`),l=btoa(unescape(encodeURIComponent(o))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),c=await fetch(`${ie}/drafts`,{method:"POST",headers:s,body:JSON.stringify({message:{raw:l}})});if(!c.ok){const d=await c.text();throw new Error(`Gmail draft failed (${c.status}): ${d.substring(0,200)}`)}return await c.json()}async markAsRead(t){const a=await this.authHeaders();await fetch(`${ie}/messages/${t}/modify`,{method:"POST",headers:a,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,a){const r=await this.authHeaders();let n={};switch(a){case"archive":n={removeLabelIds:["INBOX"]};break;case"trash":n={addLabelIds:["TRASH"]};break;case"read":n={removeLabelIds:["UNREAD"]};break;case"unread":n={addLabelIds:["UNREAD"]};break;case"star":n={addLabelIds:["STARRED"]};break;case"unstar":n={removeLabelIds:["STARRED"]};break}const s=await fetch(`${ie}/messages/${t}/modify`,{method:"POST",headers:{...r,"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){const i=await s.text();throw new Error(`Failed to modify message: ${i}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),a=await fetch(`${ie}/labels/INBOX`,{headers:t});return a.ok&&(await a.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),a=await fetch(`${ie}/profile`,{headers:t});if(!a.ok)throw new Error("Failed to get Gmail profile");return await a.json()}}function qa(e){var t,a,r;if(!e)return"";if((t=e.body)!=null&&t.data)return xt(e.body.data);if(e.parts){for(const n of e.parts)if(n.mimeType==="text/plain"&&((a=n.body)!=null&&a.data))return xt(n.body.data);for(const n of e.parts)if(n.mimeType==="text/html"&&((r=n.body)!=null&&r.data)){const s=xt(n.body.data);return cn(s)}for(const n of e.parts)if(n.parts){const s=qa(n);if(s)return s}}return e.snippet||""}function xt(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function cn(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const dn=1e4,un=1e4;async function Ka(e,t){try{const a=new AbortController,r=setTimeout(()=>a.abort(),un),n=await fetch(e,{signal:a.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(clearTimeout(r),!n.ok)return{text:"",error:`HTTP ${n.status}`};const s=n.headers.get("content-type")||"";if(!s.includes("text/html")&&!s.includes("text/plain")&&!s.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${s.split(";")[0]}`};const i=await n.text(),o=i.length>2e5?i.substring(0,2e5):i,l=mn(o);return l.length<50?{text:"",error:"Page has too little readable content"}:{text:l.substring(0,t||dn)}}catch(a){return{text:"",error:a.name==="AbortError"?"Timeout":a.message}}}function mn(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(a,r)=>String.fromCharCode(parseInt(r))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(a=>a.trim()).filter(a=>a.length>0).join(`
`),t.trim()}async function Ja(e,t,a={}){const r=a.maxPages||(a.depth==="thorough"?5:3),n=a.maxResults||(a.depth==="thorough"?8:5),s=await vt(e,{num:n,site:a.site});if(s.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${s.error}`};if(s.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const o=s.results.slice(0,r).map(async h=>{const v=await Ka(h.link);return{title:h.title,url:h.link,displayLink:h.displayLink,snippet:h.snippet,content:v.text,error:v.error}}),c=(await Promise.all(o)).filter(h=>h.content.length>50);if(c.length===0){const h=s.results.map((f,_)=>`[${_+1}] ${f.title}
${f.snippet}
Source: ${f.link}`).join(`

`);return{report:await qt(e,h,t,"snippets"),sources:s.results.map(f=>({title:f.title,url:f.link})),pagesRead:0}}const d=c.map((h,v)=>`--- SOURCE ${v+1}: ${h.title} (${h.displayLink}) ---
${h.content}
--- END SOURCE ${v+1} ---`).join(`

`);return{report:await qt(e,d,t,"full"),sources:c.map(h=>({title:h.title,url:h.url})),pagesRead:c.length}}async function qt(e,t,a,r){const s=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

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
- If the sources don't adequately answer the query, say so honestly`,i=`Research query: "${e}"

Source material:
${t}

Write a synthesized research report answering the query above.`;try{return(await a.chat([{role:"system",content:s},{role:"user",content:i}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(o){return`Research synthesis error: ${o.message}. Raw search results were found but could not be analyzed.`}}const pn=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:Ja,fetchPageContent:Ka},Symbol.toStringTag,{value:"Module"})),hn=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,weight:.95},{pattern:/^[Tt]ask:\s*/,weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,weight:.9}];function Ya(e,t){for(const a of hn)if(a.pattern.test(e))return{agent:"multi",confidence:a.weight,reasoning:"Keyword match — full agent"};return t&&/spreadsheet|sheet|google\s*sheet/i.test(t)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(e)?{agent:"multi",confidence:.85,reasoning:"Memory context — full agent"}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function gn(e,t,a,r,n,s){const i=t.assistant_name||"Karna",o=t.personality_prompt?`
## Personality
${t.personality_prompt.substring(0,2e3)}
`:"",l=a?`
## Active Memory (ALWAYS consult before responding)
${a}
`:"";let c="";try{const m=new Date;c=new Intl.DateTimeFormat("en-GB",{timeZone:t.timezone,day:"numeric",month:"short",year:"numeric"}).format(m)}catch{c=""}const d=`
## Current User
- **Name**: ${t.name}
- **Timezone**: ${t.timezone}
- **Time**: ${n}
- **Today's date for sheets**: ${c}
`;switch(e){case"conversation":return`You are ${i} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic.

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
- Time-aware: reference current date/time when relevant`;default:return""}}const fn=2e3,yn=2e3,Va=4;function kt(e){return Math.ceil(e.length/Va)}function Kt(e,t){const a=t*Va;return e.length<=a?e:e.slice(0,a)+`
[...truncated to fit token budget]`}function Xa(e){const t=[];for(const a of e)t.length>0&&t[t.length-1].role===a.role&&a.role!=="system"?t[t.length-1]={...t[t.length-1],content:t[t.length-1].content+`

`+a.content}:t.push(a);return t}const Bt=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes, daily = at a specific time (HH:MM), weekly = day of week at time (e.g. "Friday 17:00"), once = specific date and time (e.g. "2026-03-12 14:30")'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'PREFERRED for relative-time requests like "in 5 minutes", "in 2 hours". Set schedule_type to "once" and provide this instead of schedule_value. The server will compute the exact time. Examples: "in 5 minutes" = 5, "in 2 hours" = 120, "in half an hour" = 30.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:'Store a PERMANENT rule, preference, or standing instruction that Ruby should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts (orders, deliveries, single events) — those go to create_schedule. Ask yourself: "Will this still be relevant in 6 months?" If no, do not store it.',parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. STRICT RULES — violating any of these is a critical error: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm. (2) NEVER fabricate email body content. Only use data you retrieved from tools in this same conversation. If you do not have the actual content (costs, numbers, details), do NOT call this — tell the user exactly what information is missing and ask them to provide it. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets. Use for quick facts, links, current events, prices. Fast (~1s), no API key.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:'Deep web research — searches, reads up to 5 pages, and synthesizes a detailed report with sources. Use when user needs analysis, comparisons, fact-checking, thorough answers, or asks you to "research" something. Returns a compiled report with citations (~10-20s).',parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Is Abacus AI good for agentic tool calls?", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}}];function Za(e,t,a){const r=e.assistant_name||"Karna",n=e.personality_prompt?Kt(`## Personality Instructions
${e.personality_prompt}
`,fn):"",s=Kt(t,yn);return`You are ${r} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic. Your name is ${r} — always refer to yourself by this name if asked.

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
- **NEVER say "I've set a reminder" or "I've scheduled that" unless you have actually called create_schedule in this turn.** If you state that a reminder was created, the tool call must have happened — fabricating it is strictly forbidden.

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
- **ALWAYS include the URL in your reply when a document or spreadsheet is created.** Format: \`Doc ready: [Title](URL)\` or \`Sheet ready: [Title](URL)\`. Never confirm creation without providing the link.

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
${Qa(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${a==="telegram"?`

## TELEGRAM CONSTRAINTS — 25-second hard limit
- **Essays / documents**: Keep written content under 400 words. Write directly from your knowledge — do NOT call web_search before writing. Call create_doc in one shot immediately.
- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).
- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule — even if prior tool calls found nothing relevant. Never skip this step.
- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I'll now..." — just call the tool.`:""}`}async function Jt(e,t,a){var c;const n=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${a.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let s;((c=n.files)==null?void 0:c.length)>0?s=n.files[0].id:s=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:a,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${s}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:s,folderName:a}}function Qa(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}async function er(e,t,a,r,n,s,i,o,l,c,d,m){const h=Date.now();let v=!0,f="",_="";try{return _=await vn(e,t,a,r,s,i,o,l,c,d,m),_}catch(w){throw v=!1,f=w.message||"Unknown error",w}finally{const w=Date.now()-h;try{await a.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(r,n.agentType||null,n.providerName||null,e,JSON.stringify(t).substring(0,2e3),(v?_:"").substring(0,500),v?1:0,f||null,w,n.isEnforcementRetry?1:0,n.channel||"web").run()}catch{}}}async function vn(e,t,a,r,n,s,i,o,l,c,d){var h,v,f,_,w,T;const m=new te(a);switch(e){case"create_schedule":{const u=new Date;let g;const p=c||"UTC";if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){g=new Date(u.getTime()+t.minutes_from_now*60*1e3);const I=g.toLocaleString("en-US",{timeZone:p,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[O,k,C]=(I[0]||"").split("/");t.schedule_value=`${C}-${O}-${k} ${I[1]||"00:00"}`,t.schedule_type="once"}else if(t.schedule_type==="interval"){const x=parseInt(t.schedule_value,10);g=new Date(u.getTime()+x*60*1e3)}else if(t.schedule_type==="daily"){const[x,I]=t.schedule_value.split(":").map(Number),O=u.toLocaleString("en-US",{timeZone:p}),k=new Date(O),C=new Date(k);C.setHours(x,I,0,0),C<=k&&C.setDate(C.getDate()+1);const L=new Date(C.toLocaleString("en-US",{timeZone:"UTC"})),M=new Date(C.toLocaleString("en-US",{timeZone:p})),B=L.getTime()-M.getTime();g=new Date(C.getTime()+B)}else if(t.schedule_type==="weekly"){const[x,I]=t.schedule_value.split(" "),[O,k]=(I||"00:00").split(":").map(Number),L=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Re=>Re.toLowerCase()===x.toLowerCase()),M=u.toLocaleString("en-US",{timeZone:p}),B=new Date(M),j=new Date(B);j.setHours(O,k,0,0);let P=(L-j.getDay()+7)%7;P===0&&j<=B&&(P=7),j.setDate(j.getDate()+P);const Y=new Date(j.toLocaleString("en-US",{timeZone:"UTC"})),X=new Date(j.toLocaleString("en-US",{timeZone:p})),se=Y.getTime()-X.getTime();g=new Date(j.getTime()+se)}else if(t.schedule_type==="once"){const[x,I]=t.schedule_value.split(" "),[O,k,C]=x.split("-").map(Number),[L,M]=(I||"00:00").split(":").map(Number),B=u.toLocaleString("en-US",{timeZone:p}),j=new Date(B),P=new Date(j);P.setFullYear(O,k-1,C),P.setHours(L,M,0,0);const Y=new Date(P.toLocaleString("en-US",{timeZone:"UTC"})),X=new Date(P.toLocaleString("en-US",{timeZone:p})),se=Y.getTime()-X.getTime();g=new Date(P.getTime()+se);const Re=new Date(u.getTime()+120*1e3);if(g.getTime()<u.getTime()+60*1e3){const Ee=g.toISOString();g=Re;const it=` [Note: The requested time ${t.schedule_value} in ${p} resolved to ${Ee} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${g.toISOString()}.]`;t._pastTimeWarning=it}}else g=new Date(u.getTime()+3600*1e3);await a.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(r,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),g.toISOString()).run();const y=t._pastTimeWarning||"",E=g.toLocaleString("en-US",{timeZone:p,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${t.name}" — ${t.schedule_type}. Will fire at ${E} (${p}). [UTC: ${g.toISOString()}]${y}. IMPORTANT: Use the exact time "${E}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const g=(await a.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(r).all()).results||[];return g.length===0?"No scheduled tasks found.":g.map(p=>`[ID:${p.id}] ${p.enabled?"▶":"⏸"} "${p.name}" — [${p.schedule_type}] ${p.schedule_value} — ${p.action_type} — state: ${p.state||"active"} — next: ${p.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const u=t.enabled?1:0,g=u?"active":"paused";return await a.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,g,t.job_id,r).run(),`Schedule ${t.job_id} ${u?"enabled (active)":"paused"}.`}case"update_schedule_state":{const u=["created","active","reminding","paused","completed"],g=t.state;if(!u.includes(g))return`Invalid state "${g}". Valid states: ${u.join(", ")}`;const p=g==="completed"||g==="paused"?0:1;return await a.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(g,p,t.job_id,r).run(),`Schedule ${t.job_id} state updated to "${g}".`}case"delete_schedule":return await a.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,r).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const u=t.importance||5,g=t.type==="task"?"preference":t.type,p=u>=7?"working":"long_term";return await m.store(r,g,t.title,t.content,u,p),`Stored in ${p==="working"?"working":"long-term"} memory: [${g}] ${t.title} (importance: ${u})`}case"search_memory":{const u=await m.search(r,t.query);return u.length===0?"No matching memories found.":u.map(g=>`[${g.tier||"long_term"}] [${g.type}] **${g.title}**: ${g.content}`).join(`
`)}case"get_system_status":{const u=await a.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),g=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),p=await a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(r).first(),y=await a.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),E=await a.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first();return`System Status:
- Active schedules: ${(u==null?void 0:u.cnt)||0}
- Memory: ${(p==null?void 0:p.cnt)||0} working / ${(g==null?void 0:g.cnt)||0} total
- Total messages: ${(y==null?void 0:y.cnt)||0}
- Unread errors: ${(E==null?void 0:E.cnt)||0}`}case"read_sheet":{if(!n)return"Authentication context unavailable.";try{const u=new re(a,r,n,s||"",i||""),g=t.spreadsheet_id;let p=t.range;const y=await u.sheets.getMetadata(g),E=y.sheets;p.includes("!")||(p=`${E[0]}!${p}`);let x;try{x=await u.sheets.readRange(g,p)}catch(O){if((h=O.message)!=null&&h.includes("Unable to parse range")||(v=O.message)!=null&&v.includes("400")){const k=p.includes("!")?p.split("!")[1]:p;p=`${E[0]}!${k}`,x=await u.sheets.readRange(g,p)}else throw O}let I=`[Spreadsheet: "${y.title}" | Reading tab: "${p.split("!")[0]}" | All tabs in this spreadsheet: ${E.map(O=>`"${O}"`).join(", ")}]
`;return E.length>1&&(I+=`[To read a different tab, call read_sheet again with range like "${E[1]}!A1:Z500"]
`),x.length===0?I+"No data found in the specified range.":I+x.map(O=>O.join("	| ")).join(`
`)}catch(u){return await A(a,r,"google","read_sheet",u.message),`Failed to read sheet: ${u.message}`}}case"write_sheet":{if(!n)return"Authentication context unavailable.";try{const u=new re(a,r,n,s||"",i||""),g=t.values;let p=t.range;const x=Math.max(...g.map(C=>C.length))+4,I=g.map(C=>{const L=[...C];for(;L.length<x;)L.push("");return L}),O=p.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(O){const C=O[1]||"",L=O[2],M=O[3],B=O[5],P=L.toUpperCase().charCodeAt(0)-64+x-1,Y=P<=26?String.fromCharCode(64+P):"Z";p=`${C}${L}${M}:${Y}${B}`}return`Written ${(await u.sheets.writeRange(t.spreadsheet_id,p,I)).updatedCells} cells to ${p}.`}catch(u){return await A(a,r,"google","write_sheet",u.message),`Failed to write sheet: ${u.message}`}}case"append_sheet":{if(!n)return"Authentication context unavailable.";try{return`Appended ${(await new re(a,r,n,s||"",i||"").sheets.appendRows(t.spreadsheet_id,t.range,t.values)).updatedCells} cells to ${t.range}.`}catch(u){return await A(a,r,"google","append_sheet",u.message),`Failed to append to sheet: ${u.message}`}}case"create_sheet":{if(!n)return"Authentication context unavailable.";try{const u=new re(a,r,n,s||"",i||"");if(!(await u.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const p=await u.sheets.createSpreadsheet(t.title,t.sheet_names);let y="";if(t.folder_name)try{const{token:E}=await(await Promise.resolve().then(()=>dt)).getGoogleAuth(a,r,n,s||"",i||"");y=`
Folder: "${(await Jt(E,p.spreadsheetId,t.folder_name)).folderName}"`}catch(E){y=`
(Could not move to folder "${t.folder_name}": ${E.message})`}try{await new te(a).store(r,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${p.spreadsheetId} | URL: ${p.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${y}
ID: ${p.spreadsheetId}
URL: ${p.url}`}catch(u){return await A(a,r,"google","create_sheet",u.message),`Failed to create spreadsheet: ${u.message}`}}case"list_calendar_events":{if(!n)return"Authentication context unavailable.";try{const u=new re(a,r,n,s||"",i||""),g=t.calendar_id||"primary",p=t.days_ahead||7,y=new Date,E=new Date(y.getTime()+p*24*60*60*1e3),x=await u.calendar.listEvents(g,{timeMin:y.toISOString(),timeMax:E.toISOString(),query:t.query});return x.length===0?`No events found in the next ${p} days.`:x.map(I=>{var M;const O=I.start.dateTime||I.start.date||"TBD",k=I.end.dateTime||I.end.date||"",C=I.location?` 📍 ${I.location}`:"",L=((M=I.attendees)==null?void 0:M.map(B=>B.email).join(", "))||"";return`• ${I.summary} — ${O} to ${k}${C}${L?`
  Attendees: ${L}`:""}`}).join(`
`)}catch(u){return await A(a,r,"google","list_calendar",u.message),`Failed to list events: ${u.message}`}}case"create_calendar_event":{if(!n)return"Authentication context unavailable.";try{const u=new re(a,r,n,s||"",i||""),g=t.calendar_id||"primary",p=await u.calendar.createEvent(g,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});return`Event created: "${p.summary}"
ID: ${p.id}
Start: ${p.start.dateTime||p.start.date}`}catch(u){return await A(a,r,"google","create_event",u.message),`Failed to create event: ${u.message}`}}case"create_doc":{if(!n)return"Authentication context unavailable.";try{const u=new re(a,r,n,s||"",i||"");if(!(await u.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const p=await u.docs.createDocument(t.title);t.content&&await u.docs.appendText(p.documentId,t.content);let y="";if(t.folder_name)try{const{token:E}=await(await Promise.resolve().then(()=>dt)).getGoogleAuth(a,r,n,s||"",i||"");y=`
Folder: "${(await Jt(E,p.documentId,t.folder_name)).folderName}"`}catch(E){y=`
(Could not move to folder "${t.folder_name}": ${E.message})`}try{await new te(a).store(r,"context",`Document: ${t.title}`,`Document ID: ${p.documentId} | URL: ${p.url}`,6,"working")}catch{}return`Document created: "${t.title}"${y}
ID: ${p.documentId}
URL: ${p.url}`}catch(u){return await A(a,r,"google","create_doc",u.message),`Failed to create document: ${u.message}`}}case"read_doc":{if(!n)return"Authentication context unavailable.";try{const g=await new re(a,r,n,s||"",i||"").docs.readDocument(t.document_id);return`Document: "${g.title}"

${g.content}`}catch(u){return await A(a,r,"google","read_doc",u.message),`Failed to read document: ${u.message}`}}case"append_to_doc":{if(!n)return"Authentication context unavailable.";try{const u=new re(a,r,n,s||"",i||"");if(!(await u.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.';await u.docs.appendText(t.document_id,t.content);let p=t.document_id;try{p=(await u.docs.readDocument(t.document_id)).title}catch{}return`Content appended to "${p}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(u){return await A(a,r,"google","append_to_doc",u.message),`Failed to append to document: ${u.message}`}}case"gmail_list":{if(!n)return"Authentication context unavailable.";try{const g=await new oe(a,r,n,s||"",i||"").listMessages({maxResults:t.max_results||10,query:t.query});return g.length===0?"No messages found.":g.map((p,y)=>`${p.isUnread?"● ":"  "}${y+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(u){return await A(a,r,"gmail","list",u.message),(f=u.message)!=null&&f.includes("not connected")?u.message:`Gmail list error: ${u.message}`}}case"gmail_read":{if(!n)return"Authentication context unavailable.";try{const u=new oe(a,r,n,s||"",i||""),g=await u.getMessage(t.message_id);if(!g)return"Message not found.";const p=await u.getMessageBody(t.message_id);return`**${g.subject}**
From: ${g.from}
To: ${g.to}
Date: ${g.date}

${p}`}catch(u){return await A(a,r,"gmail","read",u.message),`Gmail read error: ${u.message}`}}case"gmail_search":{if(!n)return"Authentication context unavailable.";try{const g=await new oe(a,r,n,s||"",i||"").search(t.query,t.max_results||10);return g.length===0?`No results for: ${t.query}`:g.map((p,y)=>`${p.isUnread?"● ":"  "}${y+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(u){return await A(a,r,"gmail","search",u.message),`Gmail search error: ${u.message}`}}case"gmail_send":{if(!n)return"Authentication context unavailable.";try{const g=await new oe(a,r,n,s||"",i||"").send(t.to,t.subject,t.body,{cc:t.cc});return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${g.id}]`}catch(u){return await A(a,r,"gmail","send",u.message),`Gmail send error: ${u.message}`}}case"gmail_draft":{if(!n)return"Authentication context unavailable.";try{const g=await new oe(a,r,n,s||"",i||"").createDraft(t.to,t.subject,t.body,{cc:t.cc}),p=t.cc?`, CC: ${t.cc}`:"";return`Draft created. To: ${t.to}${p}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${g.id}]`}catch(u){return await A(a,r,"gmail","draft",u.message),`Gmail draft error: ${u.message}`}}case"gmail_modify":{if(!n)return"Authentication context unavailable.";try{return await new oe(a,r,n,s||"",i||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(u){return await A(a,r,"gmail","modify",u.message),`Gmail modify error: ${u.message}`}}case"gmail_unread_count":{if(!n)return"Authentication context unavailable.";try{const g=await new oe(a,r,n,s||"",i||"").getUnreadCount();return`You have ${g} unread email${g!==1?"s":""} in Gmail.`}catch(u){return(_=u.message)!=null&&_.includes("not connected")?u.message:`Gmail error: ${u.message}`}}case"drive_list":{if(!n)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>dt)).getGoogleAuth(a,r,n,s||"",i||""),g=new URLSearchParams;g.set("pageSize",String(t.max_results||10)),g.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),g.set("orderBy","modifiedTime desc");let p="";t.folder_id?p=`'${t.folder_id}' in parents and trashed = false`:t.query?p=`${t.query} and trashed = false`:p="trashed = false",g.set("q",p);const y=await fetch(`https://www.googleapis.com/drive/v3/files?${g}`,{headers:{Authorization:`Bearer ${u}`}});if(!y.ok)throw new Error(`Drive API error (${y.status})`);const E=await y.json();return(w=E.files)!=null&&w.length?E.files.map((x,I)=>{var L,M;const O=((L=x.mimeType)==null?void 0:L.split(".").pop())||x.mimeType,k=x.size?`${(parseInt(x.size)/1024).toFixed(1)} KB`:"",C=((M=x.modifiedTime)==null?void 0:M.split("T")[0])||"";return`${I+1}. **${x.name}** (${O})
   ${k} · Modified: ${C}
   ${x.webViewLink||""}`}).join(`

`):"No files found."}catch(u){return await A(a,r,"google","drive_list",u.message),`Drive list error: ${u.message}`}}case"drive_search":{if(!n)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>dt)).getGoogleAuth(a,r,n,s||"",i||""),g=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,p=new URLSearchParams;p.set("q",g),p.set("pageSize",String(t.max_results||10)),p.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),p.set("orderBy","modifiedTime desc");const y=await fetch(`https://www.googleapis.com/drive/v3/files?${p}`,{headers:{Authorization:`Bearer ${u}`}});if(!y.ok)throw new Error(`Drive API error (${y.status})`);const E=await y.json();return(T=E.files)!=null&&T.length?E.files.map((x,I)=>{var C,L;const O=((C=x.mimeType)==null?void 0:C.split(".").pop())||x.mimeType,k=((L=x.modifiedTime)==null?void 0:L.split("T")[0])||"";return`${I+1}. **${x.name}** (${O}) — Modified: ${k}
   ${x.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(u){return await A(a,r,"google","drive_search",u.message),`Drive search error: ${u.message}`}}case"web_search":try{const u=await vt(t.query,{num:t.num_results||5,site:t.site});return u.error?`Web search failed: ${u.error}`:u.results.length===0?`No results found for "${t.query}".`:u.results.map((g,p)=>`${p+1}. **${g.title}**
   ${g.link}
   ${g.snippet}`).join(`

`)}catch(u){return await A(a,r,"search","web_search",u.message),`Web search error: ${u.message}`}case"read_url":try{const u=t.url;if(!u||!u.startsWith("http://")&&!u.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const g=Math.min(t.max_length||8e3,15e3),{fetchPageContent:p}=await Promise.resolve().then(()=>pn),y=await p(u,g);return y.error?`Failed to read page: ${y.error}`:!y.text||y.text.length<20?`Page at ${u} returned no readable content.`:`Content from ${u} (${y.text.length} chars):

${y.text}`}catch(u){return await A(a,r,"search","read_url",u.message),`Read URL error: ${u.message}`}case"research":{if(!d)return"Research tool requires an LLM provider but none is available.";try{const g=Ja(t.query,d,{depth:t.depth||"quick",site:t.site}),p=new Promise(x=>setTimeout(()=>x(null),45e3)),y=await Promise.race([g,p]);if(y===null){const{webSearch:x}=await Promise.resolve().then(()=>ln),I=await x(t.query,{num:5});if(I.error||I.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let O=`Research took too long, but here are the top search results:

`;return O+=I.results.map((k,C)=>`${C+1}. **${k.title}**
   ${k.snippet}
   ${k.link}`).join(`

`),O}if(y.error)return`Research failed: ${y.error}`;let E=y.report;return y.sources.length>0&&(E+=`

---
**Sources** (`+y.pagesRead+` pages read):
`,E+=y.sources.map((x,I)=>`[${I+1}] ${x.title}
    ${x.url}`).join(`
`)),E}catch(u){return await A(a,r,"research","research",u.message),`Research error: ${u.message}`}}case"search_places":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const g=await U(u.encrypted_value,n),p=await Pa(g,t.query,{type:t.type});return p.error?`Places search failed: ${p.error}`:p.results.length===0?`No places found for "${t.query}".`:p.results.map((y,E)=>{const x=y.rating?` ★${y.rating} (${y.userRatingsTotal||0} reviews)`:"",I=y.openNow!==void 0?y.openNow?" · Open now":" · Closed":"",O=y.googleMapsUri?`
   ${y.googleMapsUri}`:"";return`${E+1}. **${y.name}**${x}${I}
   ${y.address}${O}
   [place_id: ${y.placeId}]`}).join(`

`)}catch(u){return await A(a,r,"google_api","search_places",u.message),`Places search error: ${u.message}`}}case"get_place_details":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const g=await U(u.encrypted_value,n),p=await Ua(g,t.place_id);if(p.error)return`Details lookup failed: ${p.error}`;if(!p.details)return"No details found.";const y=p.details;let E=`**${y.name}**
📍 ${y.address}`;if(y.phone&&(E+=`
📞 ${y.phone}`),y.website&&(E+=`
🌐 ${y.website}`),y.rating&&(E+=`
★ ${y.rating}`),y.googleMapsUri&&(E+=`
📌 ${y.googleMapsUri}`),y.openingHours&&(E+=`

Opening Hours:
${y.openingHours.join(`
`)}`),y.reviews&&y.reviews.length>0){E+=`

Recent Reviews:`;for(const x of y.reviews)E+=`
— ${x.author} (★${x.rating}, ${x.time}): "${x.text}"`}return E}catch(u){return await A(a,r,"google_api","place_details",u.message),`Place details error: ${u.message}`}}case"get_directions":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const g=await U(u.encrypted_value,n),p=await Ha(g,t.origin,t.destination,{mode:t.mode||"driving"});if(p.error)return`Directions failed: ${p.error}`;if(!p.route)return"No route found.";const y=p.route;let E=`**${y.startAddress}** → **${y.endAddress}**
`;return E+=`📏 ${y.distance} · ⏱️ ${y.duration}`,y.durationInTraffic&&(E+=` (with traffic: ${y.durationInTraffic})`),E+=`
via ${y.summary}`,E+=`

Steps:`,y.steps.forEach((x,I)=>{E+=`
${I+1}. ${x.instruction} (${x.distance}, ${x.duration})`}),E}catch(u){return await A(a,r,"google_api","directions",u.message),`Directions error: ${u.message}`}}case"get_travel_time":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const g=await U(u.encrypted_value,n),p=await za(g,t.origin,t.destination,t.mode||"driving");if(p.error)return`Travel time lookup failed: ${p.error}`;let y=`${t.origin} → ${t.destination}: ${p.distance}, ${p.duration}`;return p.durationInTraffic&&(y+=` (with traffic: ${p.durationInTraffic})`),y}catch(u){return await A(a,r,"google_api","travel_time",u.message),`Travel time error: ${u.message}`}}case"translate_text":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const g=await U(u.encrypted_value,n),p=await Ga(g,t.text,t.target_language,t.source_language);return p.error?`Translation failed: ${p.error}`:`[${p.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${p.translatedText}`}catch(u){return await A(a,r,"google_api","translate",u.message),`Translation error: ${u.message}`}}case"search_youtube":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const g=await U(u.encrypted_value,n),p=await Wa(g,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return p.error?`YouTube search failed: ${p.error}`:p.results.length===0?`No YouTube results for "${t.query}".`:p.results.map((y,E)=>{var x;return`${E+1}. **${y.title}**
   ${y.channelTitle} · ${((x=y.publishedAt)==null?void 0:x.split("T")[0])||""}
   ${y.description}
   ${y.url}`}).join(`

`)}catch(u){return await A(a,r,"google_api","youtube_search",u.message),`YouTube search error: ${u.message}`}}case"geocode_address":{if(!n)return"Authentication context unavailable.";try{const u=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!u)return"Google API Key not configured.";const g=await U(u.encrypted_value,n),p=await Fa(g,t.address);return p.error?`Geocoding failed: ${p.error}`:p.results.length===0?`Location not found: "${t.address}"`:p.results.map((y,E)=>`${E+1}. ${y.address}
   Coordinates: ${y.lat}, ${y.lng}`).join(`
`)}catch(u){return await A(a,r,"google_api","geocode",u.message),`Geocoding error: ${u.message}`}}default:return`Unknown tool: ${e}`}}async function tr(e,t,a,r,n){if(t.length>0&&t[t.length-1].role==="user"){const s="(Previous request did not complete. Please try again.)";await e.storeMessage(a,r,"assistant",s,"{}",n),t.push({id:-1,user_id:a,channel:r,role:"assistant",content:s,metadata:"{}",token_estimate:s.length,created_at:new Date().toISOString()})}}function ar(e){for(let t=e.length-1;t>=0;t--)if(e[t].role==="assistant"){const a=typeof e[t].content=="string"?e[t].content:"";a.length<300&&/^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(a.trim())&&(e[t]={...e[t],content:"(My previous response was cut off before completing. Starting fresh.)"});break}}async function bn(e,t,a,r,n,s,i){var p;const o=new te(t),l=(p=e.metadata)==null?void 0:p.thread_id,c=await o.buildContext(r.id),d=await o.getRecentConversations(r.id,25,l);await tr(o,d,r.id,e.channel,l);const m=Za(r,c,e.channel),h=Xa([{role:"system",content:m},...d.map(y=>({role:y.role,content:y.content})),{role:"user",content:e.text}]);ar(h),await o.storeMessage(r.id,e.channel,"user",e.text,"{}",l);const v=(i==null?void 0:i.maxTurns)??10,f=(i==null?void 0:i.tools)??Bt;let _="",w=0;const T=[];for(let y=0;y<v;y++)try{const E=await a.chat(h,{tools:f});if(E.usage&&(w+=E.usage.promptTokens+E.usage.completionTokens),E.toolCalls&&E.toolCalls.length>0){E.content&&h.push({role:"assistant",content:E.content});for(const x of E.toolCalls){T.push(x.name);try{const I=await er(x.name,x.arguments,t,r.id,{agentType:"full",providerName:a.name,channel:e.channel},r.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,r.timezone,a);h.push({role:"user",content:`[Tool Result for ${x.name}]: ${I}`})}catch(I){await A(t,r.id,"tool",x.name,I.message||"Tool execution failed"),h.push({role:"user",content:`[Tool Error for ${x.name}]: ${I.message||"Execution failed"}`})}}continue}_=E.content;break}catch(E){if(n){const x=E.message||"",I=x.includes("401")||x.includes("403")||x.includes("authentication")||x.includes("credit balance"),O=x.includes("429"),k=I?1440:O?10:5;await n.recordError(a.name,x,k)}throw await A(t,r.id,"llm","provider_error",E.message||"Unknown LLM error",{provider:a.name,turn:y}),E}if(n&&w>0)try{await n.recordUsage(a.name,w)}catch{}const u=_.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,""),g=T.length>0?`[TOOLS_USED: ${[...new Set(T)].join(", ")}] `:"";return await o.storeMessage(r.id,e.channel,"assistant",g+u,"{}",l),await o.compactHistory(r.id,30),_}const Yt={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function wn(e){for(const[t,a]of Object.entries(Yt))if(e.toLowerCase().includes(t.toLowerCase()))return a;return Yt.default}function _n(e,t,a,r){const n=wn(r),s=Math.floor(n*.75),i=[];let o=0,l=!1;const c=kt(e);i.push({role:"system",content:e}),o+=c;const d=kt(a);o+=d;const m=s-o,h=[];let v=0;for(let f=t.length-1;f>=0;f--){const _=t[f],w=kt(_.content);if(v+w<=m)h.unshift({role:_.role,content:_.content}),v+=w;else{l=!0;break}}return i.push(...h),i.push({role:"user",content:a}),o+=v,{maxTokens:n,usedTokens:o,messages:i,wasTruncated:l}}async function*En(e,t,a,r,n,s){var w;const i=new te(t),o=(w=e.metadata)==null?void 0:w.thread_id;yield{type:"thinking",data:{threadId:o,provider:a.name}};const l=await i.buildContext(r.id),c=await i.getRecentConversations(r.id,20,o);await tr(i,c,r.id,e.channel,o);const d=Za(r,l,e.channel),m=_n(d,c,e.text,a.name);await i.storeMessage(r.id,e.channel,"user",e.text,"{}",o);const h=10;let v="",f=0;const _=[...m.messages];ar(_);for(let T=0;T<h;T++)try{T>0&&(yield{type:"thinking",data:{threadId:o}});const u=await a.chat(_,{tools:Bt});if(u.usage&&(f+=u.usage.promptTokens+u.usage.completionTokens),u.toolCalls&&u.toolCalls.length>0){u.content&&(yield{type:"chunk",data:{text:u.content,threadId:o}},_.push({role:"assistant",content:u.content}));for(const p of u.toolCalls){yield{type:"tool_start",data:{tool:p.name,toolArgs:p.arguments,threadId:o}};try{const y=await er(p.name,p.arguments,t,r.id,{agentType:"full",providerName:a.name,channel:e.channel},r.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,r.timezone,a);yield{type:"tool_end",data:{tool:p.name,toolResult:y.substring(0,500)+(y.length>500?"...":""),threadId:o}},_.push({role:"user",content:`[Tool Result for ${p.name}]: ${y}`})}catch(y){await A(t,r.id,"tool",p.name,y.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:p.name,toolResult:`Error: ${y.message||"Execution failed"}`,threadId:o}},_.push({role:"user",content:`[Tool Error for ${p.name}]: ${y.message||"Execution failed"}`})}}continue}v=u.content;const g=50;for(let p=0;p<v.length;p+=g)yield{type:"chunk",data:{text:v.substring(p,p+g),threadId:o}},p+g<v.length&&await new Promise(E=>setTimeout(E,10));break}catch(u){if(n){const p=u.message||"",y=p.includes("401")||p.includes("403")||p.includes("authentication")||p.includes("credit balance"),E=p.includes("429"),x=y?1440:E?10:5;await n.recordError(a.name,p,x)}await A(t,r.id,"llm","provider_error",u.message||"Unknown LLM error",{provider:a.name,turn:T});const g=u.message||"An error occurred";try{await i.storeMessage(r.id,e.channel,"assistant",`⚠️ ${g}`,"{}",o)}catch{}yield{type:"error",data:{error:g,threadId:o}};return}if(n&&f>0)try{await n.recordUsage(a.name,f)}catch{}await i.storeMessage(r.id,e.channel,"assistant",v,"{}",o),await i.compactHistory(r.id,30),yield{type:"done",data:{threadId:o,provider:a.name,tokenCount:f}}}async function jt(e,t,a,r,n,s){var m;const i=new te(t),o=(m=e.metadata)==null?void 0:m.thread_id,l=await i.buildContext(r.id);if(Ya(e.text,l).agent==="conversation")return rr(e,t,a,r,l,n,o);const d=e.channel==="telegram"?{maxTurns:4,tools:Bt.filter(h=>h.name!=="research")}:void 0;return bn(e,t,a,r,n,s,d)}async function rr(e,t,a,r,n,s,i){const o=new te(t),l=Qa(r.timezone),c=gn("conversation",r,n,r.timezone,l,e.channel),d=(await o.getRecentConversations(r.id,25,i)).filter(f=>!f.content.startsWith("[Autonomous Scheduled Task]")&&!f.content.startsWith("[Scheduled Reminder]")),m=Xa([{role:"system",content:c},...d.map(f=>({role:f.role,content:f.content})),{role:"user",content:e.text}]);await o.storeMessage(r.id,e.channel,"user",e.text,"{}",i);let h=0,v="";try{const f=await a.chat(m,{temperature:.8});f.usage&&(h=f.usage.promptTokens+f.usage.completionTokens),v=f.content}catch(f){if(s){const _=f.message||"",w=_.includes("401")||_.includes("403")||_.includes("authentication")||_.includes("credit balance"),T=_.includes("429"),u=w?1440:T?10:5;await s.recordError(a.name,_,u)}throw await A(t,r.id,"llm","conversation_error",f.message,{provider:a.name}),f}if(s&&h>0)try{await s.recordUsage(a.name,h)}catch{}return await o.storeMessage(r.id,e.channel,"assistant",v,"{}",i),await o.compactHistory(r.id,30),v}async function*Tn(e,t,a,r,n,s){var d;const i=new te(t),o=(d=e.metadata)==null?void 0:d.thread_id,l=await i.buildContext(r.id),c=Ya(e.text,l);if(yield{type:"thinking",data:{threadId:o,provider:a.name}},c.agent!=="conversation"){yield*En(e,t,a,r,n,s);return}try{const m=await rr(e,t,a,r,l,n,o),h=50;for(let v=0;v<m.length;v+=h)yield{type:"chunk",data:{text:m.substring(v,v+h),threadId:o}},v+h<m.length&&await new Promise(f=>setTimeout(f,10))}catch(m){yield{type:"error",data:{error:m.message||"An error occurred",threadId:o}};return}yield{type:"done",data:{threadId:o,provider:a.name,tokenCount:0}}}const H=new we;async function xn(e,t){var n;const a=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",a),await t()}H.use("/*",xn);H.get("/threads",async e=>{const t=e.get("user"),a=e.req.query("archived")==="1",r=parseInt(e.req.query("limit")||"30"),n=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(t.id,a?1:0,r).all();return e.json({threads:n.results||[]})});H.post("/threads",async e=>{const t=e.get("user"),{title:a}=await e.req.json(),r=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a||"New conversation").first();return e.json({thread:r})});H.put("/threads/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),r=await e.req.json(),n=[],s=[];return r.title!==void 0&&(n.push("title = ?"),s.push(r.title)),r.is_archived!==void 0&&(n.push("is_archived = ?"),s.push(r.is_archived?1:0)),n.push("updated_at = CURRENT_TIMESTAMP"),s.push(a,t.id),n.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${n.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),e.json({success:!0}))});H.delete("/threads/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(a,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});H.post("/upload",async e=>e.json({error:"File upload is not available in this version."},404));H.post("/send",async e=>{const t=e.get("user"),{message:a,channel:r="web",thread_id:n,files:s}=await e.req.json();if(!a||typeof a!="string"||a.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(s&&Array.isArray(s)&&s.length>0){i=`

[Attached files:
`;for(const c of s)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=n;if(!o){const c=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:t.id,username:t.username,channel:r,text:a.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await nt(e.env.DB,t.id,t.pin_hash),m=await jt(l,e.env.DB,c,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID});return!n&&o?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run():o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),e.json({response:m,timestamp:new Date().toISOString(),channel:l.channel,provider:c.name,thread_id:o})}catch(c){console.error("Chat error:",c);const d=c.message||"";if(d.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400);if(d.includes("All LLM providers failed"))return e.json({error:d,type:"no_provider",thread_id:o},400);if(d.includes("limit reached"))return e.json({error:d,type:"cost_limit",thread_id:o},429);const m=d.includes("401")||d.includes("403")||d.includes("authentication")||d.includes("credit balance")||d.includes("invalid")&&d.includes("key");try{const{logError:h}=await Promise.resolve().then(()=>Ot);await h(e.env.DB,t.id,"llm","chat_error",d)}catch{}return e.json({error:m?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:d,type:m?"no_provider":void 0,thread_id:o},m?400:500)}});function Vt(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}H.post("/stream",async e=>{const t=e.get("user"),{message:a,channel:r="web",thread_id:n,files:s}=await e.req.json();if(!a||typeof a!="string"||a.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(s&&Array.isArray(s)&&s.length>0){i=`

[Attached files:
`;for(const c of s)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=n;if(!o){const c=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,a.trim().substring(0,60)+(a.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:t.id,username:t.username,channel:r,text:a.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await nt(e.env.DB,t.id,t.pin_hash),m=new ReadableStream({async start(h){const v=new TextEncoder;try{const f=Tn(l,e.env.DB,c,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID});for await(const _ of f)_.data.threadId||(_.data.threadId=o),h.enqueue(v.encode(Vt(_)));o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),h.close()}catch(f){const _={type:"error",data:{error:f.message||"An error occurred",threadId:o}};h.enqueue(v.encode(Vt(_))),h.close()}}});return new Response(m,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(o||"")}})}catch(c){console.error("Stream setup error:",c);const d=c.message||"";return d.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400):d.includes("limit reached")?e.json({error:d,type:"cost_limit",thread_id:o},429):e.json({error:"Something went wrong setting up the stream.",details:d,thread_id:o},500)}});H.get("/threads/:id/messages",async e=>{var s;const t=e.get("user"),a=parseInt(e.req.param("id")),r=parseInt(e.req.query("limit")||"50"),n=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,a,r).all();return e.json({messages:(n.results||[]).reverse(),total:((s=n.results)==null?void 0:s.length)||0})});H.get("/history",async e=>{var l;const t=e.get("user"),a=parseInt(e.req.query("limit")||"50"),r=parseInt(e.req.query("offset")||"0"),n=e.req.query("thread_id");let s,i;n?(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,parseInt(n),a,r]):(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,a,r]);const o=await e.env.DB.prepare(s).bind(...i).all();return e.json({messages:(o.results||[]).reverse(),total:((l=o.results)==null?void 0:l.length)||0})});H.delete("/history",async e=>{const t=e.get("user"),a=e.req.query("thread_id");return a?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(a)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});H.get("/dashboard",async e=>{const t=e.get("user");new Date().toISOString().split("T")[0];const[a,r,n,s,i,o]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first(),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first()]);return e.json({threads:(a==null?void 0:a.cnt)||0,active_schedules:(r==null?void 0:r.cnt)||0,memories:(n==null?void 0:n.cnt)||0,recent_threads:s.results||[],provider_usage:[],unread_notifications:(i==null?void 0:i.cnt)||0,errors:(o==null?void 0:o.cnt)||0})});H.get("/gmail/unread",async e=>{const t=e.get("user");try{const a=e.env.GOOGLE_CLIENT_ID,r=e.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return e.json({count:null,reason:"google_not_configured"});const s=await new oe(e.env.DB,t.id,t.pin_hash,a,r).getUnreadCount();return e.json({count:s})}catch(a){return e.json({count:null,reason:a.message})}});H.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));H.get("/notifications/count",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(a==null?void 0:a.cnt)||0})});H.get("/notifications",async e=>{const t=e.get("user"),a=parseInt(e.req.query("limit")||"20"),r=await e.env.DB.prepare(`SELECT id, type, title, body, is_read, source, action_url, created_at 
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,a).all();return e.json({notifications:r.results||[]})});H.put("/notifications/:id/read",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});H.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});H.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const G=new we;async function kn(e,t){var n;const a=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),await t()}G.use("/*",kn);G.get("/profile",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(a==null?void 0:a.name)||t.name,role:(a==null?void 0:a.role)||t.role,personality_prompt:(a==null?void 0:a.personality_prompt)||t.personality_prompt,telegram_chat_id:(a==null?void 0:a.telegram_chat_id)||t.telegram_chat_id,timezone:(a==null?void 0:a.timezone)||t.timezone,assistant_name:(a==null?void 0:a.assistant_name)||"Karna"})});G.put("/profile",async e=>{const t=e.get("user"),a=await e.req.json(),r=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],n=[],s=[];for(const i of r)a[i]!==void 0&&(n.push(`${i} = ?`),s.push(a[i]));return n.length===0?e.json({error:"No valid fields to update"},400):(n.push("updated_at = CURRENT_TIMESTAMP"),s.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${n.join(", ")} WHERE id = ?`).bind(...s).run(),e.json({success:!0}))});const Rt=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key"];G.get("/credentials",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT id, service, label, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all();return e.json({credentials:(a.results||[]).map(r=>({...r,configured:!0})),available_services:Rt,llm_providers:Xe})});G.put("/credentials",async e=>{const t=e.get("user"),{service:a,value:r,label:n}=await e.req.json();if(!a||!r)return e.json({error:"Service name and value are required"},400);if(!Rt.includes(a))return e.json({error:`Invalid service. Must be one of: ${Rt.join(", ")}`},400);const s=await Nt(r,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,a,n||a,s).run(),e.json({success:!0,service:a})});G.delete("/credentials/:service",async e=>{const t=e.get("user"),a=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,a).run(),e.json({success:!0})});G.get("/memory",async e=>{const t=e.get("user"),a=e.req.query("type"),n=await new te(e.env.DB).getAll(t.id,a||void 0,100);return e.json({memories:n})});G.post("/memory",async e=>{const t=e.get("user"),{type:a,title:r,content:n,importance:s}=await e.req.json();return!a||!r||!n?e.json({error:"Type, title, and content are required"},400):(await new te(e.env.DB).store(t.id,a,r,n,s||5),e.json({success:!0}))});G.delete("/memory/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await new te(e.env.DB).remove(a,t.id),e.json({success:!0})});G.get("/schedules",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:a.results||[]})});G.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),{enabled:r}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r?1:0,a,t.id).run(),e.json({success:!0})});G.delete("/schedules/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});G.get("/errors",async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:a.results||[]})});G.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});G.post("/credentials/validate",async e=>{e.get("user");const{service:t,value:a}=await e.req.json();if(!t||!a)return e.json({error:"Service and value required"},400);switch(t){case"anthropic":try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return r.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):r.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${r.status}.`})}catch(r){return e.json({valid:!1,message:`Connection failed: ${r.message}`})}case"openai":try{const r=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${a}`}});return r.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):r.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${r.status}.`})}catch(r){return e.json({valid:!1,message:`Connection failed: ${r.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const r=JSON.parse(a);if(!r.provider||!r.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const n=Xe[r.provider];if(!n)return e.json({valid:!1,message:`Unknown provider: ${r.provider}`});if(n.apiFormat==="anthropic"){const s=await fetch(n.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:n.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return s.ok?e.json({valid:!0,message:`${n.label} API key is valid.`}):s.status===401?e.json({valid:!1,message:`Invalid ${n.label} API key.`}):e.json({valid:!1,message:`${n.label} responded with status ${s.status}.`})}else{const s=n.apiBase+(n.validatePath||"/v1/models"),i=await fetch(s,{headers:{Authorization:`Bearer ${r.apiKey}`}});if(i.ok)return e.json({valid:!0,message:`${n.label} API key is valid.`});if(i.status===401||i.status===403)return e.json({valid:!1,message:`Invalid ${n.label} API key.`});if(i.status===404)try{const o=await fetch(n.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.apiKey}`},body:JSON.stringify({model:n.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return o.ok||o.status===200?e.json({valid:!0,message:`${n.label} API key is valid.`}):o.status===401||o.status===403?e.json({valid:!1,message:`Invalid ${n.label} API key.`}):e.json({valid:!1,message:`${n.label} responded with status ${o.status}.`})}catch(o){return e.json({valid:!1,message:`${n.label} chat test failed: ${o.message}`})}return e.json({valid:!1,message:`${n.label} responded with status ${i.status}.`})}}catch(r){return r instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${r.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});G.get("/google/status",async e=>{const t=e.get("user");try{const a=await Mt(e.env.DB,t.id,t.pin_hash),r=Na(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...a,oauth_client_configured:r})}catch(a){return e.json({connected:!1,error:a.message})}});G.get("/google/auth-url",async e=>{var t;e.get("user");try{const a=e.env.GOOGLE_CLIENT_ID,r=e.env.GOOGLE_CLIENT_SECRET;if(!a||!r)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const n=new URL(e.req.url),s=`${n.protocol}//${n.host}/auth/google/callback`,i=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),o=Ra(a,s,i);return e.json({auth_url:o,redirect_uri:s})}catch(a){return e.json({error:`Failed to generate auth URL: ${a.message}`},500)}});G.post("/google/disconnect",async e=>{const t=e.get("user");try{return await $a(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(a){return e.json({error:a.message},500)}});G.post("/google/test",async e=>{const t=e.get("user");try{const{token:a,email:r}=await We(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),n=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${a}`}}),s=!0,i=n.ok;return e.json({success:!0,email:r,scopes:{sheets:s,calendar:i,docs:s,drive:s},message:i?`Connected as ${r} — all services working.`:`Connected as ${r} — calendar access issue (${n.status}).`})}catch(a){return e.json({success:!1,error:a.message})}});const pe=new we;pe.get("/debug/time",e=>{const t=new Date,a=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return e.json({utc_iso:t.toISOString(),utc_ms:t.getTime(),formatted_ist:a.format(t),toLocaleString_ist:t.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});pe.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const a=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:a,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});pe.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const a=Date.now()-t;return e.json({status:"ok",latency_ms:a})}catch(t){return e.json({status:"error",error:t.message},500)}});pe.get("/status",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const r=a.user_id,[n,s,i,o]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first()]);return e.json({active_schedules:(n==null?void 0:n.cnt)||0,memory_entries:(s==null?void 0:s.cnt)||0,total_messages:(i==null?void 0:i.cnt)||0,unread_errors:(o==null?void 0:o.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});async function Sn(e,t,a,r){try{const n=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t).first();if(!n)return;const s=await U(n.encrypted_value,n.pin_hash),i=4e3,o=r.length>i?r.substring(0,i-3)+"...":r;(await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:o,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a,text:o})})}catch{}}function Xt(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}pe.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);const r=new Date,n=r.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:n})).run()}catch{}const s=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(n).all(),i=[];for(const o of s.results||[])try{await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(n,o.id).run();const l=o.user_timezone||"UTC";let c,d=!1,m=o.state||"active";if(o.schedule_type==="interval"){const f=parseInt(o.schedule_value,10);c=new Date(r.getTime()+f*60*1e3)}else if(o.schedule_type==="daily"){const[f,_]=o.schedule_value.split(":").map(Number),w=Xt(l),T=new Date(w);T.setHours(f,_,0,0),T<=w&&T.setDate(T.getDate()+1);const u=new Date(T.toLocaleString("en-US",{timeZone:"UTC"})),g=new Date(T.toLocaleString("en-US",{timeZone:l})),p=u.getTime()-g.getTime();c=new Date(T.getTime()+p)}else if(o.schedule_type==="weekly"){const[f,_]=o.schedule_value.split(" "),[w,T]=(_||"00:00").split(":").map(Number),g=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(k=>k.toLowerCase()===f.toLowerCase()),p=Xt(l),y=new Date(p);y.setHours(w,T,0,0);let E=(g-y.getDay()+7)%7;E===0&&y<=p&&(E=7),y.setDate(y.getDate()+E);const x=new Date(y.toLocaleString("en-US",{timeZone:"UTC"})),I=new Date(y.toLocaleString("en-US",{timeZone:l})),O=x.getTime()-I.getTime();c=new Date(y.getTime()+O)}else o.schedule_type==="once"?(d=!0,m="completed",c=new Date(r.getTime()+365*24*60*60*1e3)):c=new Date(r.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,c.toISOString(),d?0:o.enabled,m,o.id).run();const v=(JSON.parse(o.action_config||"{}").description||o.description)&&(o.action_type==="check_mail"||o.action_type==="check_calendar"||o.action_type==="check_sheet"||o.action_type==="custom");i.push({job_id:o.id,name:o.name,status:"dispatched",needs_agent:v,next_run:c.toISOString()})}catch(l){i.push({job_id:o.id,name:o.name,status:"error",error:l.message})}return e.json({executed:i.length,results:i,timestamp:n})});pe.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);const r=parseInt(e.req.param("jobId"),10);if(!r)return e.json({error:"Invalid job ID"},400);const n=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(r).first();if(!n)return e.json({error:"Job not found"},404);const i=JSON.parse(n.action_config||"{}").description||n.description||"",o="⏰ "+(n.name||"Scheduled Task"),l=new Date().toISOString();let c="";const d=n.action_type==="reminder",m=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!d&&n.action_type==="custom"&&m.test(i),d)c=i||n.name||"Time for your scheduled task.";else try{const _={id:n.user_id,username:n.username||"user",name:n.user_name||"User",pin_hash:n.pin_hash||"",role:n.user_role||"",personality_prompt:n.personality_prompt||"",telegram_chat_id:n.telegram_chat_id||"",timezone:n.user_timezone||"UTC",assistant_name:n.assistant_name||"Karna",created_at:"",updated_at:""},w={userId:n.user_id,username:_.username,channel:"cron",text:In(n.name,i,n.action_type),sessionId:"cron-"+n.id,timestamp:l},{provider:T,rotation:u}=await nt(e.env.DB,n.user_id,n.pin_hash);c=await jt(w,e.env.DB,T,_,u,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(_){const w=_.message||"unknown error",T=w.includes("rate_limit")||w.includes("429")||w.includes("quota"),u=w.includes("timeout")||w.includes("Timeout");T?c="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":u?c="Task timed out. Will retry at next scheduled time.":c="Task encountered an error. Will retry at next scheduled time.",await A(e.env.DB,n.user_id,"cron_agent","execution_error",w,{job_id:n.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(n.action_type))try{const _=await e.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(n.user_id).first();(!_||_.cnt===0)&&await A(e.env.DB,n.user_id,"cron_verification","no_tools_called",`Cron job "${n.name}" (${n.action_type}) completed without any tool calls`,{job_id:n.id,action_type:n.action_type,response_preview:c.substring(0,200)})}catch{}let v=c||i||"Time for your scheduled task.";v=v.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const f=o+`
`+v;return await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(n.user_id,"reminder",o,v,"cron:"+n.id).run(),d&&await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(n.user_id,"system","assistant",f,JSON.stringify({type:"cron",job_id:n.id})).run(),n.telegram_chat_id&&await Sn(e.env.DB,n.user_id,n.telegram_chat_id,f),e.json({job_id:r,status:"completed",response_length:c.length})});async function nr(e){var r;const t=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!t)return null;const a=await e.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(t).first();return(a==null?void 0:a.user_id)||null}pe.get("/health/tools",async e=>{var a;const t=await nr(e);if(!t)return e.json({error:"Not authenticated"},401);try{const r=await e.env.DB.prepare(`SELECT tool_name,
              COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) as failures,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name != '__enforcement_trigger'
       GROUP BY tool_name
       ORDER BY total DESC`).bind(t).all(),n=await e.env.DB.prepare(`SELECT agent_type, provider_name, COUNT(*) as triggers,
              SUM(CASE WHEN was_enforcement_retry = 1 THEN 1 ELSE 0 END) as retries_that_worked
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name = '__enforcement_trigger'
       GROUP BY agent_type, provider_name`).bind(t).all(),s=await e.env.DB.prepare(`SELECT COUNT(*) as total_retries,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successful_retries
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND was_enforcement_retry = 1
       AND tool_name != '__enforcement_trigger'`).bind(t).all(),i=await e.env.DB.prepare(`SELECT status, COUNT(*) as count
       FROM cron_execution_log
       WHERE user_id = ? AND started_at > datetime('now', '-24 hours')
       GROUP BY status`).bind(t).all(),o=await e.env.DB.prepare(`SELECT message, details, created_at
       FROM error_log
       WHERE user_id = ? AND source = 'cron_verification'
       AND created_at > datetime('now', '-24 hours')
       ORDER BY created_at DESC LIMIT 10`).bind(t).all(),l=await e.env.DB.prepare(`SELECT provider_name, agent_type,
              COUNT(*) as calls,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name != '__enforcement_trigger'
       GROUP BY provider_name, agent_type
       ORDER BY calls DESC`).bind(t).all();return e.json({period:"last_24h",tool_stats:r.results,enforcement:{triggers:n.results,retry_results:((a=s.results)==null?void 0:a[0])||{total_retries:0,successful_retries:0}},cron:{executions:i.results,warnings:o.results},providers:l.results})}catch(r){return e.json({error:r.message||"Failed to fetch metrics"},500)}});pe.get("/health/tools/recent",async e=>{const t=await nr(e);if(!t)return e.json({error:"Not authenticated"},401);try{const a=await e.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
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
- Example: "Couldn't retrieve Amazon order status — requires login."`;function In(e,t,a){return a==="reminder"?`[Scheduled Reminder] "${e}": ${t||"Time for your reminder."}`:a==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
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
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${Je}`:`[Scheduled task "${e}"]: ${t||"Execute this scheduled task."}${Je}`}function Cn(e,t,a,r){return{userId:e,username:t,channel:"telegram",text:a,sessionId:`telegram-${r}`,timestamp:new Date().toISOString()}}function On(e,t){return e.replace(/\*\*(.*?)\*\*/g,"*$1*").replace(/#{1,3}\s/g,"*").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const st=new we,Dn=4e3;async function $(e,t,a,r="Markdown"){var s,i;const n=An(a,Dn);for(const o of n)try{const l=await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:o,parse_mode:r,disable_web_page_preview:!1})});if(!l.ok){const c=await l.json().catch(()=>null);((s=c==null?void 0:c.description)!=null&&s.includes("parse")||(i=c==null?void 0:c.description)!=null&&i.includes("entities"))&&await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:o})})}}catch{}}async function Rn(e,t){try{await fetch(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function An(e,t){if(e.length<=t)return[e];const a=[];let r=e;for(;r.length>0;){if(r.length<=t){a.push(r);break}let n=r.lastIndexOf(`
`,t);n<t*.3&&(n=r.lastIndexOf(" ",t)),n<t*.3&&(n=t),a.push(r.substring(0,n)),r=r.substring(n).trimStart()}return a}async function Ln(e,t,a,r,n){switch(e.split("@")[0].toLowerCase()){case"/start":{const i=(r==null?void 0:r.name)||"there",o=(r==null?void 0:r.assistant_name)||"Karna",l=`👋 *Hello, ${i}!*

I'm ${o}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/tasks — Show open tasks
/new — Start a fresh conversation

Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.`+(r?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`);return await $(a,t,l),!0}case"/help":{const o=`🛠 *${(r==null?void 0:r.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`;return await $(a,t,o),!0}case"/status":{if(!r)return await $(a,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app."),!0;try{const[i,o,l,c]=await Promise.all([n.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r.id).first(),n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r.id).first(),n.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(r.id).first(),n.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(r.id).first()]),d=`📊 *System Status*

Active tasks: ${(i==null?void 0:i.cnt)||0}
Memories: ${(o==null?void 0:o.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(c==null?void 0:c.cnt)||0}

Status: ✅ Online`;await $(a,t,d)}catch{await $(a,t,"✅ Online — but had trouble fetching stats.")}return!0}case"/new":return r?(await n.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(r.id).run(),await $(a,t,"🆕 Starting fresh conversation. Your next message begins a new thread."),!0):(await $(a,t,"⚠️ Account not linked."),!0);case"/tasks":case"/task":{if(!r)return await $(a,t,"⚠️ Account not linked."),!0;try{const o=(await n.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(r.id).all()).results||[];if(o.length===0)return await $(a,t,"✅ No open tasks. You're all clear."),!0;const l=new Date,c=l.toISOString().slice(0,10),d=new Date(l);d.setDate(d.getDate()+1);const m=d.toISOString().slice(0,10),h=[`📋 *Open Tasks (${o.length})*
`];for(const v of o){let f="";if(v.due_date){const _=v.due_date.slice(0,10);_<c?f=" ⚠️ _overdue_":_===c?f=" 🔴 _due today_":_===m?f=" 🟡 _due tomorrow_":f=` _${new Date(v.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}h.push(`☐ ${v.title}${f}`)}h.push(`
_Say "mark [task] as done" to close a task._`),await $(a,t,h.join(`
`))}catch(i){await $(a,t,"❌ Could not fetch tasks: "+i.message)}return!0}default:return!1}}st.post("/webhook",async e=>{let t;try{t=await e.req.json()}catch{return e.json({ok:!0})}const a=e.env.DB,r={GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID},n=async()=>{var s,i,o,l,c;try{if(t.callback_query){await Nn(a,t.callback_query);return}const d=t.message;if(!d)return;const m=!!d.text,h=!!d.voice,v=!!d.document,f=!!d.photo,_=!!d.caption;if(!m&&!h&&!v&&!f)return;const w=String(d.chat.id);let T=d.text||"";const u=await a.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(w).first();let g=null;if(u){const k=await a.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(u.id,"telegram_bot_token").first();k&&(g=await U(k.encrypted_value,u.pin_hash))}if(!g){const k=await a.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();k&&(g=await U(k.encrypted_value,k.pin_hash))}if(!g||T.startsWith("/")&&await Ln(T,w,g,u,a))return;if(!u){await $(g,w,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${w}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`);return}if(d.voice&&g&&u)try{await $(g,w,"🎤 Processing voice note...");const C=await(await fetch(`https://api.telegram.org/bot${g}/getFile?file_id=${d.voice.file_id}`)).json();if(C.ok&&((s=C.result)!=null&&s.file_path)){const M=await(await fetch(`https://api.telegram.org/file/bot${g}/${C.result.file_path}`)).blob();let B="",j="",P="whisper-1";const Y=await e.env.DB.prepare("SELECT service, encrypted_value FROM credentials WHERE user_id = ? AND (service IN ('llm_slot_1', 'llm_slot_2', 'llm_slot_3', 'openai'))").bind(u.id).all();for(const Ee of Y.results){const it=await U(Ee.encrypted_value,u.pin_hash);if(Ee.service==="openai"){B="https://api.openai.com/v1/audio/transcriptions",j=it;break}else if(Ee.service.startsWith("llm_slot_"))try{const ot=JSON.parse(it);if(ot.provider==="openai"){B="https://api.openai.com/v1/audio/transcriptions",j=ot.apiKey;break}else if(ot.provider==="groq"){B="https://api.groq.com/openai/v1/audio/transcriptions",j=ot.apiKey,P="whisper-large-v3";break}}catch{}}if(!B){await $(g,w,"⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys).");return}const X=new FormData;X.append("file",M,"voice.ogg"),X.append("model",P),X.append("language","en");const se=await fetch(B,{method:"POST",headers:{Authorization:`Bearer ${j}`},body:X});if(!se.ok){const Ee=await se.text();await $(g,w,`⚠️ Transcription failed: ${se.status} ${Ee}`);return}T=(await se.json()).text,await $(g,w,`🗣️ *You said:* ${T}`)}}catch(k){await $(g,w,`⚠️ Failed to process voice note: ${k.message}`);return}if((v||f)&&g&&u)try{let k,C="unknown",L="unknown",M=0;if(v)k=d.document.file_id,C=d.document.file_name||"document",L=d.document.mime_type||"unknown",M=d.document.file_size||0;else if(f){const B=d.photo[d.photo.length-1];k=B.file_id,C="photo.jpg",L="image/jpeg",M=B.file_size||0}if(k){const j=await(await fetch(`https://api.telegram.org/bot${g}/getFile?file_id=${k}`)).json();let P="";if(j.ok&&((i=j.result)!=null&&i.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(C)||/^text\/|application\/json|application\/xml|application\/csv/i.test(L))&&M<5e4)try{P=await(await fetch(`https://api.telegram.org/file/bot${g}/${j.result.file_path}`)).text()}catch{}const Y=d.caption||"",X=`[Telegram file received: "${C}" (${L}, ${Math.round(M/1024)}KB)]`;P?T=`${Y?Y+`

`:""}${X}
File contents:
${P.substring(0,8e3)}${P.length>8e3?`
[...truncated]`:""}`:T=`${Y?Y+`

`:""}${X}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(k){if(_&&d.caption)T=d.caption;else{await $(g,w,`⚠️ Received your file but couldn't process it: ${k.message}`);return}}if(!T)return;Rn(g,w).catch(()=>{});let p=await a.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(u.id).first();p?await a.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(p.id).run():p={id:(await a.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(u.id).run()).meta.last_row_id};const y=Cn(u.id,u.username,T,w);y.metadata={thread_id:p.id};let E,x;try{const k=await nt(a,u.id,u.pin_hash);E=k.provider,x=k.rotation}catch(k){console.error("Telegram provider setup error:",k);const C=(o=k.message)!=null&&o.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(l=k.message)!=null&&l.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${k.message||"Unknown error"}`;await $(g,w,C);return}/\b(write\s+(an?\s+)?(essay|article|report|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|document)|research\s+.{0,60}(save|store|drive|doc))\b/i.test(T)&&await $(g,w,"📝 Working on it— searching and saving to Drive takes about 20 seconds...");const O=25e3;try{const k=await Promise.race([jt(y,a,E,u,x,r),new Promise((L,M)=>setTimeout(()=>M(new Error("TELEGRAM_TIMEOUT")),O))]),C=On(k,"telegram");await $(g,w,C||"(empty response)")}catch(k){console.error("Telegram agent error:",k);const C=k.message==="TELEGRAM_TIMEOUT",L=C?`⏱️ This took longer than Telegram allows (25s limit).

For long essays, please use the web app — it handles long generation without time limits.`:(c=k.message)!=null&&c.includes("API error")?`⚠️ AI provider returned an error. The provider (${E.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(k.message||"Unknown").substring(0,200)}`;await $(g,w,L);try{const{logError:M}=await Promise.resolve().then(()=>Ot);await M(a,u.id,"telegram",C?"timeout":"agent_error",k.message||"Agent error",{provider:E.name})}catch{}}}catch(d){console.error("Telegram webhook error:",d);try{const{logError:m}=await Promise.resolve().then(()=>Ot);await m(a,null,"telegram","webhook_error",d.message||"Unknown telegram error")}catch{}}};return e.executionCtx.waitUntil(n()),e.json({ok:!0})});st.post("/setup-webhook",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const{webhook_url:r}=await e.req.json(),n=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!n)return e.json({error:"Telegram bot token not configured in Settings"},400);const s=await U(n.encrypted_value,a.pin_hash);if(!r){const d=await(await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(d)}const o=await(await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r,allowed_updates:["message"],drop_pending_updates:!1})})).json();return e.json(o)});st.get("/webhook-status",async e=>{var s,i,o,l,c,d;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return e.json({configured:!1,error:"Bot token not set"});const n=await U(r.encrypted_value,a.pin_hash);try{const h=await(await fetch(`https://api.telegram.org/bot${n}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((i=h.result)==null?void 0:i.url)||"",has_webhook:!!((o=h.result)!=null&&o.url),pending_updates:((l=h.result)==null?void 0:l.pending_update_count)||0,last_error:((c=h.result)==null?void 0:c.last_error_message)||"",last_error_date:((d=h.result)==null?void 0:d.last_error_date)||null})}catch(m){return e.json({configured:!0,error:m.message})}});st.post("/detect-chat-id",async e=>{var s,i;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const a=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!a)return e.json({error:"Invalid session"},401);const r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a.user_id,"telegram_bot_token").first();if(!r)return e.json({error:"Bot token not configured"},400);const n=await U(r.encrypted_value,a.pin_hash);try{const c=((i=(await(await fetch(`https://api.telegram.org/bot${n}/getWebhookInfo`)).json()).result)==null?void 0:i.url)||"";await fetch(`https://api.telegram.org/bot${n}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(w=>setTimeout(w,500));const m=await(await fetch(`https://api.telegram.org/bot${n}/getUpdates?limit=10&timeout=0`)).json();c&&await fetch(`https://api.telegram.org/bot${n}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:c,allowed_updates:["message"]})});const h=m.result||[];if(h.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const v=[],f=new Set;for(let w=h.length-1;w>=0;w--){const T=h[w].message;if(T&&T.chat){const u=String(T.chat.id);f.has(u)||(f.add(u),v.push({chat_id:u,name:[T.chat.first_name,T.chat.last_name].filter(Boolean).join(" ")||T.chat.title||"Unknown",username:T.chat.username||"",date:new Date((T.date||0)*1e3).toISOString()}))}}if(v.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const _=v[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(_,a.user_id).run(),e.json({found:!0,chat_id:_,name:v[0].name,all_chats:v,message:`Chat ID ${_} detected and saved to your profile.`})}catch(o){return e.json({error:`Detection failed: ${o.message}`},500)}});async function Nn(e,t){var _;const{id:a,data:r,message:n,from:s}=t;if(!r||!n)return;const i=r.split(":");if(i[0]!=="briefing_toggle"||i.length<3)return;const o=i[1],l=parseInt(i[2]);if(!l||!o)return;const c=String(n.chat.id),d=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(c).first();if(!d)return;const m=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(d.id,l,o).first();if(!m)return;const h=m.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(h,h,m.id).run();const v=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(d.id).first();if(!v)return;const f=await U(v.encrypted_value,v.pin_hash);if(await fetch(`https://api.telegram.org/bot${f}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:a,text:h?"✅ Checked!":"☐ Unchecked"})}),(_=n.reply_markup)!=null&&_.inline_keyboard){const w=n.reply_markup.inline_keyboard.map(T=>T.map(u=>{var g;if((g=u.callback_data)!=null&&g.includes(o)){const p=h?"✅":"☐",y=u.text.replace(/^[☐✅]\s*/,"");return{...u,text:`${p} ${y}`}}return u}));try{await fetch(`https://api.telegram.org/bot${f}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:c,message_id:n.message_id,reply_markup:{inline_keyboard:w}})})}catch{}}}function Mn(e){const t=new Date,a=new Date(t.toLocaleString("en-US",{timeZone:e})),r=new Date(a);r.setDate(r.getDate()+1),r.setHours(0,0,0,0);const n=new Date(r);n.setHours(23,59,59,999);const s=r.toISOString().split("T")[0];return{start:r.toISOString(),end:n.toISOString(),dateStr:s}}async function $n(e,t,a,r,n,s){try{return(await new $t(e,t,a,r,n).listEvents("primary",{timeMin:s.start,timeMax:s.end,maxResults:50})).map(l=>{var c;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(c=l.attendees)==null?void 0:c.map(d=>d.displayName||d.email),source:"google"}})}catch(i){return console.error("Google Calendar fetch error:",i.message),[]}}async function Bn(e,t,a,r,n){try{const s=new oe(e,t,a,r,n),i=await s.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),o=await s.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const m of i){const h=m.from.split("<")[0].trim()||m.from;l[h]=(l[h]||0)+1}const c=Object.entries(l).sort(([,m],[,h])=>h-m).slice(0,5).map(([m])=>m),d=i.some(m=>m.subject.toLowerCase().includes("urgent")||m.subject.toLowerCase().includes("asap")||m.subject.toLowerCase().includes("immediately"));return{unreadCount:i.length,importantCount:o.length,topSenders:c,hasUrgent:d}}catch(s){return console.error("Gmail fetch error:",s.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function jn(e,t){try{const a=await e.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(t).all(),r=new Date,n=new Date(r);n.setDate(n.getDate()+1),n.setHours(23,59,59,999);const s=a.results||[],i=s.map(l=>{if(l.due_date){const c=new Date(l.due_date),d=c<=r?"overdue":c<=n?"due today":c.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${l.title} [${d}]`}return l.title}),o=s.filter(l=>l.due_date?new Date(l.due_date)<=n:!1).length;return{pending:s.length,dueToday:o,items:i}}catch(a){return console.error("Tasks fetch error:",a.message),{pending:0,dueToday:0,items:[]}}}async function Pn(e,t){try{const a=Math.floor((Date.now()-1728e5)/1e3),r=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${a},points>10`,n=await fetch(r,{headers:{"User-Agent":"Karna/1.0"}});return n.ok?((await n.json()).hits||[]).filter(i=>i.url&&!t.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const Zt=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function Un(e,t,a){const r=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],n=new Set;if(t&&a)try{((await t.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(a).all()).results||[]).forEach(c=>n.add(c.url))}catch{}const s=[];if(r.some(l=>Zt.some(c=>l.toLowerCase().includes(c.toLowerCase())))){const l=r.find(d=>Zt.some(m=>d.toLowerCase().includes(m.toLowerCase())))||"AI agents",c=await Pn(l,n);for(const d of c)s.push(d),n.add(d.url)}for(const l of r){if(s.length>=8)break;const c=`latest ${l} news today`;try{const d=await vt(c,{num:5});if(d.results)for(const m of d.results){if(s.length>=8)break;n.has(m.link)||(s.push({title:m.title,summary:m.snippet,url:m.link,source:m.displayLink}),n.add(m.link))}}catch(d){console.error(`News search error for "${c}":`,d.message)}}const o=s.slice(0,7);if(t&&a&&o.length>0)for(const l of o)try{await t.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(a,l.url,l.title).run()}catch{}return o}function Hn(e,t){const a=[];let r="20:00";{const[i,o]=t.split(":"),l=parseInt(i,10),c=o||"00",d=l>=12?"PM":"AM";r=`${l===0?12:l>12?l-12:l}:${c} ${d}`}a.push(`🗓 Your ${r} Brief — ${e.targetDate}`),a.push("");const n=e.calendar.totalCount;if(n>0){a.push(`📅 Tomorrow: ${n} event${n===1?"":"s"}`);for(const i of e.calendar.google.slice(0,5)){const o=i.startTime?new Date(i.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";a.push(`   • ${o} ${i.title}`)}}else a.push("📅 Tomorrow: Nothing scheduled");a.push("");const s=e.emails.gmail.unreadCount;if(s>0?(a.push(`📧 Gmail: ${s} unread`),e.emails.gmail.importantCount>0&&a.push(`   ★ ${e.emails.gmail.importantCount} marked important`),e.emails.gmail.hasUrgent&&a.push("   ⚠️ Urgent messages present"),e.emails.gmail.topSenders.length>0&&a.push(`   From: ${e.emails.gmail.topSenders.slice(0,3).join(", ")}`)):a.push("📧 Gmail: Inbox clear"),a.push(""),e.tasks.pending>0){a.push(`✅ Open Tasks (${e.tasks.pending}):`);for(const i of e.tasks.items)a.push(`   ☐ ${i}`)}else a.push("✅ Tasks: All clear");if(a.push(""),e.news.items.length>0){a.push("📡 Today's Signal:");for(const i of e.news.items){const o=i.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${i.source}`;a.push(`   • ${i.title.substring(0,90)}${i.title.length>90?"…":""}`),a.push(`     ${o} — ${i.summary.substring(0,80)}${i.summary.length>80?"…":""}`)}}return a.join(`
`)}function Gn(e){const t=[];let a=0;for(const r of e.calendar.google)t.push({type:"calendar",key:r.id,text:`${r.title} - ${new Date(r.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:r},sortOrder:a++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:a++});for(const r of e.tasks.items)t.push({type:"task",key:`task-${r}`,text:r,metadata:{},sortOrder:a++});for(const r of e.news.items)t.push({type:"news",key:`news-${r.url}`,text:`📰 ${r.title}`,metadata:{url:r.url,source:r.source},sortOrder:a++});return t}async function Fn(e,t){const a=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!a)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let r;try{const s=JSON.parse(a.components);r={google_calendar:s.google_calendar!==!1,gmail:s.gmail!==!1,tasks:s.tasks!==!1,news:s.news!==!1}}catch{r={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const n=a.news_topics?a.news_topics.split(",").map(s=>s.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:r,newsTopics:n}}async function sr(e,t,a){var u,g;const r=t.timezone||"Asia/Kolkata",n=Mn(r),{components:s,newsTopics:i}=await Fn(e,t.id),o=[],l=[];s.google_calendar&&(o.push($n(e,t.id,t.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET,n)),l.push("googleEvents")),s.gmail&&(o.push(Bn(e,t.id,t.pin_hash,a.GOOGLE_CLIENT_ID,a.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),s.tasks&&(o.push(jn(e,t.id)),l.push("tasks")),s.news&&(o.push(Un(i,e,t.id)),l.push("news"));const c=await Promise.all(o),d={};l.forEach((p,y)=>{d[p]=c[y]});const m={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},h={pending:0,dueToday:0,items:[]},v={generatedAt:new Date().toISOString(),targetDate:n.dateStr,calendar:{google:d.googleEvents||[],totalCount:((u=d.googleEvents)==null?void 0:u.length)||0},emails:{gmail:d.gmailSummary||m},tasks:d.tasks||h,news:{items:d.news||[],fetchedAt:new Date().toISOString()},summary:""},f=((g=await e.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(t.id).first())==null?void 0:g.briefing_time)||"20:00";v.summary=Hn(v,f);const _=Gn(v),w=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(t.id,JSON.stringify(v)).first(),T=(w==null?void 0:w.id)||0;for(const p of _)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(T,p.type,p.key,p.text,JSON.stringify(p.metadata),p.sortOrder).run();return{briefingId:T,content:v,items:_}}async function Wn(e,t,a){const r=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,t).first();if(!r)return null;const n=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(a).all();return{briefing:{...r,content:JSON.parse(r.content_json||"{}")},items:n.results||[]}}async function zn(e,t,a,r){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(a,t).first())return null;const s=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(r,a).first();if(!s)return null;const i=s.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(i,i,r,a).run(),{checked:i===1}}async function qn(e,t,a=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.sent_at DESC
    LIMIT ?
  `).bind(t,a).all()).results||[]).map(n=>({...n,content:JSON.parse(n.content_json||"{}")}))}function Kn(e,t,a=new Date){const r=new Date(a.toLocaleString("en-US",{timeZone:t})),n=r.getHours(),s=r.getMinutes(),[i,o]=e.split(":").map(Number),l=n*60+s,c=i*60+o;return l===c}function ir(e,t){const a=e.summary,r=[];for(const n of t.slice(0,10))r.push([{text:`☐ ${n.text.substring(0,40)}${n.text.length>40?"...":""}`,callback_data:`briefing_toggle:${n.key}`}]);return{text:a,inlineKeyboard:r}}const J=new we;async function Jn(e,t){var n;if(e.req.path.includes("/cron/"))return t();const a=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!a)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(a).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",a),await t()}J.use("/*",Jn);J.get("/briefings",async e=>{const t=e.get("user"),a=parseInt(e.req.query("limit")||"10");try{const r=await qn(e.env.DB,t.id,a);return e.json({briefings:r})}catch(r){return e.json({error:r.message},500)}});J.get("/briefings/:id",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));try{const r=await Wn(e.env.DB,t.id,a);return r?e.json(r):e.json({error:"Briefing not found"},404)}catch(r){return e.json({error:r.message},500)}});J.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id")),r=parseInt(e.req.param("itemId"));try{const n=await zn(e.env.DB,t.id,a,r);return n?e.json(n):e.json({error:"Item not found"},404)}catch(n){return e.json({error:n.message},500)}});J.post("/briefings/generate",async e=>{const t=e.get("user");try{const a=await sr(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(a)}catch(a){return e.json({error:a.message},500)}});J.get("/briefing-preferences",async e=>{const t=e.get("user");try{const a=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!a){const n={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:n})}const r={briefingTime:a.briefing_time,briefingEnabled:a.briefing_enabled!==0,components:JSON.parse(a.components),newsTopics:a.news_topics.split(",").map(n=>n.trim()).filter(Boolean),notificationChannels:JSON.parse(a.notification_channels),proactiveLevel:a.proactive_level};return e.json({preferences:r})}catch(a){return e.json({error:a.message},500)}});J.post("/briefing-preferences",async e=>{const t=e.get("user"),a=await e.req.json(),r=[];if(a.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(a.briefingTime)||r.push("Invalid time format. Use HH:MM (e.g., 20:00)")),a.newsTopics&&(a.newsTopics.length>5&&r.push("Maximum 5 news topics allowed"),a.newsTopics.some(n=>n.length>50)&&r.push("Each news topic must be 50 characters or less")),a.proactiveLevel&&!["conservative","moderate","aggressive"].includes(a.proactiveLevel)&&r.push("Invalid proactive level. Use conservative, moderate, or aggressive"),r.length>0)return e.json({error:r.join("; ")},400);try{const n=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),s=a.components?JSON.stringify(a.components):null,i=a.notificationChannels?JSON.stringify(a.notificationChannels):null,o=a.newsTopics?a.newsTopics.join(", "):null;if(n){const l=[],c=[];a.briefingTime!==void 0&&(l.push("briefing_time = ?"),c.push(a.briefingTime)),a.briefingEnabled!==void 0&&(l.push("briefing_enabled = ?"),c.push(a.briefingEnabled?1:0)),s!==null&&(l.push("components = ?"),c.push(s)),o!==null&&(l.push("news_topics = ?"),c.push(o)),i!==null&&(l.push("notification_channels = ?"),c.push(i)),a.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),c.push(a.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),c.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...c).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,a.briefingTime||"20:00",s||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',o||"AI, LLM, Tools, Agentic Workflows, AI Features",i||'{"telegram":true,"web":true}',a.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(n){return e.json({error:n.message},500)}});J.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(a){return e.json({error:a.message},500)}});J.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),n=[],s=new Date;for(const i of r.results||[]){if(!i.briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.briefing_time||"20:00";if(Kn(l,o,s))try{const c=await sr(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});if(i.telegram_chat_id){const{text:d,inlineKeyboard:m}=ir(c.content,c.items);await or(e.env.DB,i,d,m,c.briefingId)}n.push({user_id:i.id,status:"success",briefing_id:c.briefingId,briefing_time:l,timezone:o})}catch(c){n.push({user_id:i.id,status:"error",error:c.message})}}return e.json({executed:n.length,results:n})}catch(r){return e.json({error:r.message},500)}});J.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",a=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==a)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id IS NOT NULL").all(),n=[],s=new Date,i=new Date(s.getTime()+600*1e3).toISOString(),o=new Date(s.getTime()+900*1e3).toISOString();for(const l of r.results||[])try{const c=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!c)continue;const d=await U(c.encrypted_value,l.pin_hash),h=JSON.parse(d).access_token;if(!h)continue;const v=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(s.toISOString())}&timeMax=${encodeURIComponent(o)}&maxResults=10`,{headers:{Authorization:`Bearer ${h}`}});if(!v.ok)continue;const _=((await v.json()).items||[]).filter(u=>{var p;const g=(p=u.start)==null?void 0:p.dateTime;return g?g>=s.toISOString()&&g<=i:!1});if(_.length===0){n.push({user_id:l.id,reminders_sent:0});continue}const w=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(l.id).first();if(!w)continue;const T=await U(w.encrypted_value,l.pin_hash);for(const u of _){const g=new Date(u.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),p=u.location?`
📍 ${u.location}`:"",y=`⏰ Meeting in 10 minutes!

*${u.summary||"Untitled Event"}*
🕐 ${g}${p}`;await fetch(`https://api.telegram.org/bot${T}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l.telegram_chat_id,text:y,parse_mode:"Markdown"})})}n.push({user_id:l.id,reminders_sent:_.length})}catch(c){n.push({user_id:l.id,status:"error",error:c.message})}return e.json({executed:n.length,results:n})}catch(r){return e.json({error:r.message},500)}});async function or(e,t,a,r,n){try{const s=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!s)return;const i=await U(s.encrypted_value,s.pin_hash);if(!(await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:a,parse_mode:"Markdown",reply_markup:{inline_keyboard:r.map(c=>c.map(d=>({...d,callback_data:`${d.callback_data}:${n}`})))}})})).json()).ok){const d=await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:a.replace(/[_*[\]`]/g,""),reply_markup:{inline_keyboard:r.map(m=>m.map(h=>({...h,callback_data:`${h.callback_data}:${n}`})))}})})).json();if(!d.ok){console.error("Telegram briefing send failed:",d.description,"chat_id:",t.telegram_chat_id);return}}await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(n).run()}catch(s){console.error("Telegram briefing error:",s.message)}}J.post("/briefings/:id/resend",async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"));try{const r=await e.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(a,t.id).first();if(!r)return e.json({error:"Briefing not found"},404);const n=JSON.parse(r.content||"{}"),s=await e.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(a).all(),{text:i,inlineKeyboard:o}=ir(n,s.results||[]);await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(a).run(),await or(e.env.DB,t,i,o,a);const l=await e.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(a).first();return l!=null&&l.delivered_telegram?e.json({success:!0,message:"Briefing sent to Telegram"}):e.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(r){return e.json({error:r.message},500)}});J.delete("/briefings/:id",async e=>{const t=e.get("user"),a=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(a,t.id).run(),e.json({success:!0})});const ae=new we;ae.use("/api/*",zr());ae.route("/api/auth",_e);ae.route("/api/chat",H);ae.route("/api/settings",G);ae.route("/api/system",pe);ae.route("/api/telegram",st);ae.route("/api/proactive",J);ae.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),a=t.searchParams.get("code"),r=t.searchParams.get("state"),n=t.searchParams.get("error");if(n)return e.html(Le(!1,`Google denied access: ${n}`));if(!a||!r)return e.html(Le(!1,"Missing authorization code or state parameter."));try{const i=JSON.parse(atob(r)).sessionId;if(!i)return e.html(Le(!1,"Invalid state parameter — missing session."));const o=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(i).first();if(!o)return e.html(Le(!1,"Session expired. Please log in again and retry."));const l=o.user_id,c=o.pin_hash,d=`${t.protocol}//${t.host}/auth/google/callback`,m=await Ma(e.env.DB,l,c,a,d,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(Le(!0,`Connected as ${m.email}`,m.email))}catch(s){return e.html(Le(!1,`OAuth failed: ${s.message}`))}});ae.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(_a())));ae.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(_a())));function Le(e,t,a){return`<!DOCTYPE html>
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
</body></html>`}async function Yn(e,t,a){const r="https://karna-5xs.pages.dev",s={"Content-Type":"application/json","X-Cron-Secret":t.CRON_SECRET||"karna-cron-default-v1"};try{const o=await(await fetch(`${r}/api/system/cron/execute`,{method:"POST",headers:s})).json();if(o.results&&o.results.length>0){const c=o.results.filter(m=>m.needs_agent&&m.status==="dispatched");if(c.length>0){const m=c.map(h=>fetch(`${r}/api/system/cron/run-task/${h.job_id}`,{method:"POST",headers:s}).then(v=>v.json()).catch(v=>({job_id:h.job_id,error:v.message})));a.waitUntil(Promise.allSettled(m).then(h=>{console.log(`Cron: ${o.executed} dispatched, ${c.length} agent tasks`,JSON.stringify(h.map(v=>v.status==="fulfilled"?v.value:v.reason)))}))}const d=o.results.filter(m=>!m.needs_agent&&m.status==="dispatched");if(d.length>0){const m=d.map(h=>fetch(`${r}/api/system/cron/run-task/${h.job_id}`,{method:"POST",headers:s}).catch(()=>{}));a.waitUntil(Promise.allSettled(m))}}a.waitUntil(fetch(`${r}/api/proactive/cron/evening-briefing`,{method:"POST",headers:s}).then(c=>c.json()).then(c=>{c.executed>0&&console.log("Evening briefing result:",JSON.stringify(c))}).catch(c=>{console.error("Evening briefing error:",c.message)})),new Date().getMinutes()%5<2&&a.waitUntil(fetch(`${r}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:s}).then(c=>c.json()).then(c=>{var d;(d=c.results)!=null&&d.some(m=>m.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(c))}).catch(()=>{}))}catch(i){console.error("Scheduled cron error:",i.message||i)}}const Vn={fetch:ae.fetch,scheduled:Yn},Qt=new we,Xn=Object.assign({"/src/index.tsx":Vn});let lr=!1;for(const[,e]of Object.entries(Xn))e&&(Qt.all("*",t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),Qt.notFound(t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),lr=!0);if(!lr)throw new Error("Can't import modules from ['/src/index.tsx']");export{Qt as default};
