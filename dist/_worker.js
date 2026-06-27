var bi=Object.defineProperty;var Ts=e=>{throw TypeError(e)};var Ei=(e,t,n)=>t in e?bi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var H=(e,t,n)=>Ei(e,typeof t!="symbol"?t+"":t,n),Rn=(e,t,n)=>t.has(e)||Ts("Cannot "+n);var D=(e,t,n)=>(Rn(e,t,"read from private field"),n?n.call(e):t.get(e)),V=(e,t,n)=>t.has(e)?Ts("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),F=(e,t,n,s)=>(Rn(e,t,"write to private field"),s?s.call(e,n):t.set(e,n),n),ee=(e,t,n)=>(Rn(e,t,"access private method"),n);var Ss=(e,t,n,s)=>({set _(r){F(e,t,r,n)},get _(){return D(e,t,s)}});var ks=(e,t,n)=>(s,r)=>{let a=-1;return i(0);async function i(o){if(o<=a)throw new Error("next() called multiple times");a=o;let c,l=!1,d;if(e[o]?(d=e[o][0][0],s.req.routeIndex=o):d=o===e.length&&r||void 0,d)try{c=await d(s,()=>i(o+1))}catch(u){if(u instanceof Error&&t)s.error=u,c=await t(u,s),l=!0;else throw u}else s.finalized===!1&&n&&(c=await n(s));return c&&(s.finalized===!1||l)&&(s.res=c),s}},Ti=Symbol(),Si=async(e,t=Object.create(null))=>{const{all:n=!1,dot:s=!1}=t,a=(e instanceof hr?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?ki(e,{all:n,dot:s}):{}};async function ki(e,t){const n=await e.formData();return n?xi(n,t):{}}function xi(e,t){const n=Object.create(null);return e.forEach((s,r)=>{t.all||r.endsWith("[]")?Di(n,r,s):n[r]=s}),t.dot&&Object.entries(n).forEach(([s,r])=>{s.includes(".")&&(Ri(n,s,r),delete n[s])}),n}var Di=(e,t,n)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]:t.endsWith("[]")?e[t]=[n]:e[t]=n},Ri=(e,t,n)=>{let s=e;const r=t.split(".");r.forEach((a,i)=>{i===r.length-1?s[a]=n:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},lr=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Ni=e=>{const{groups:t,path:n}=Ii(e),s=lr(n);return Ci(s,t)},Ii=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(n,s)=>{const r=`@${s}`;return t.push([r,n]),r}),{groups:t,path:e}},Ci=(e,t)=>{for(let n=t.length-1;n>=0;n--){const[s]=t[n];for(let r=e.length-1;r>=0;r--)if(e[r].includes(s)){e[r]=e[r].replace(s,t[n][1]);break}}return e},cn={},Oi=(e,t)=>{if(e==="*")return"*";const n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const s=`${e}#${t}`;return cn[s]||(n[2]?cn[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,n[1],new RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],new RegExp(`^${n[2]}$`)]:cn[s]=[e,n[1],!0]),cn[s]}return null},Xn=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return t(n)}catch{return n}})}},Ai=e=>Xn(e,decodeURI),dr=e=>{const t=e.url,n=t.indexOf("/",t.indexOf(":")+4);let s=n;for(;s<t.length;s++){const r=t.charCodeAt(s);if(r===37){const a=t.indexOf("?",s),i=t.indexOf("#",s),o=a===-1?i===-1?void 0:i:i===-1?a:Math.min(a,i),c=t.slice(n,o);return Ai(c.includes("%25")?c.replace(/%25/g,"%2525"):c)}else if(r===63||r===35)break}return t.slice(n,s)},Li=e=>{const t=dr(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},kt=(e,t,...n)=>(n.length&&(t=kt(t,...n)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),ur=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),n=[];let s="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))s+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){n.length===0&&s===""?n.push("/"):n.push(s);const a=r.replace("?","");s+="/"+a,n.push(s)}else s+="/"+r}),n.filter((r,a,i)=>i.indexOf(r)===a)},Nn=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Xn(e,pr):e):e,mr=(e,t,n)=>{let s;if(!n&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const o=e.charCodeAt(i+t.length+1);if(o===61){const c=i+t.length+2,l=e.indexOf("&",c);return Nn(e.slice(c,l===-1?void 0:l))}else if(o==38||isNaN(o))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const r={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let o=e.indexOf("=",a);o>i&&i!==-1&&(o=-1);let c=e.slice(a+1,o===-1?i===-1?void 0:i:o);if(s&&(c=Nn(c)),a=i,c==="")continue;let l;o===-1?l="":(l=e.slice(o+1,i===-1?void 0:i),s&&(l=Nn(l))),n?(r[c]&&Array.isArray(r[c])||(r[c]=[]),r[c].push(l)):r[c]??(r[c]=l)}return t?r[t]:r},Mi=mr,$i=(e,t)=>mr(e,t,!0),pr=decodeURIComponent,xs=e=>Xn(e,pr),Ct,Ne,Je,fr,gr,Hn,Ze,sr,hr=(sr=class{constructor(e,t="/",n=[[]]){V(this,Je);H(this,"raw");V(this,Ct);V(this,Ne);H(this,"routeIndex",0);H(this,"path");H(this,"bodyCache",{});V(this,Ze,e=>{const{bodyCache:t,raw:n}=this,s=t[e];if(s)return s;const r=Object.keys(t)[0];return r?t[r].then(a=>(r==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=n[e]()});this.raw=e,this.path=t,F(this,Ne,n),F(this,Ct,{})}param(e){return e?ee(this,Je,fr).call(this,e):ee(this,Je,gr).call(this)}query(e){return Mi(this.url,e)}queries(e){return $i(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((n,s)=>{t[s]=n}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Si(this,e))}json(){return D(this,Ze).call(this,"text").then(e=>JSON.parse(e))}text(){return D(this,Ze).call(this,"text")}arrayBuffer(){return D(this,Ze).call(this,"arrayBuffer")}blob(){return D(this,Ze).call(this,"blob")}formData(){return D(this,Ze).call(this,"formData")}addValidatedData(e,t){D(this,Ct)[e]=t}valid(e){return D(this,Ct)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Ti](){return D(this,Ne)}get matchedRoutes(){return D(this,Ne)[0].map(([[,e]])=>e)}get routePath(){return D(this,Ne)[0].map(([[,e]])=>e)[this.routeIndex].path}},Ct=new WeakMap,Ne=new WeakMap,Je=new WeakSet,fr=function(e){const t=D(this,Ne)[0][this.routeIndex][1][e],n=ee(this,Je,Hn).call(this,t);return n&&/\%/.test(n)?xs(n):n},gr=function(){const e={},t=Object.keys(D(this,Ne)[0][this.routeIndex][1]);for(const n of t){const s=ee(this,Je,Hn).call(this,D(this,Ne)[0][this.routeIndex][1][n]);s!==void 0&&(e[n]=/\%/.test(s)?xs(s):s)}return e},Hn=function(e){return D(this,Ne)[1]?D(this,Ne)[1][e]:e},Ze=new WeakMap,sr),Pi={Stringify:1},yr=async(e,t,n,s,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(r?r[0]+=e:r=[e],Promise.all(a.map(o=>o({phase:t,buffer:r,context:s}))).then(o=>Promise.all(o.filter(Boolean).map(c=>yr(c,t,!1,s,r))).then(()=>r[0]))):Promise.resolve(e)},ji="text/plain; charset=UTF-8",In=(e,t)=>({"Content-Type":e,...t}),Zt,Xt,qe,Ot,Ge,ke,Qt,At,Lt,mt,en,tn,Xe,xt,rr,Ui=(rr=class{constructor(e,t){V(this,Xe);V(this,Zt);V(this,Xt);H(this,"env",{});V(this,qe);H(this,"finalized",!1);H(this,"error");V(this,Ot);V(this,Ge);V(this,ke);V(this,Qt);V(this,At);V(this,Lt);V(this,mt);V(this,en);V(this,tn);H(this,"render",(...e)=>(D(this,At)??F(this,At,t=>this.html(t)),D(this,At).call(this,...e)));H(this,"setLayout",e=>F(this,Qt,e));H(this,"getLayout",()=>D(this,Qt));H(this,"setRenderer",e=>{F(this,At,e)});H(this,"header",(e,t,n)=>{this.finalized&&F(this,ke,new Response(D(this,ke).body,D(this,ke)));const s=D(this,ke)?D(this,ke).headers:D(this,mt)??F(this,mt,new Headers);t===void 0?s.delete(e):n!=null&&n.append?s.append(e,t):s.set(e,t)});H(this,"status",e=>{F(this,Ot,e)});H(this,"set",(e,t)=>{D(this,qe)??F(this,qe,new Map),D(this,qe).set(e,t)});H(this,"get",e=>D(this,qe)?D(this,qe).get(e):void 0);H(this,"newResponse",(...e)=>ee(this,Xe,xt).call(this,...e));H(this,"body",(e,t,n)=>ee(this,Xe,xt).call(this,e,t,n));H(this,"text",(e,t,n)=>!D(this,mt)&&!D(this,Ot)&&!t&&!n&&!this.finalized?new Response(e):ee(this,Xe,xt).call(this,e,t,In(ji,n)));H(this,"json",(e,t,n)=>ee(this,Xe,xt).call(this,JSON.stringify(e),t,In("application/json",n)));H(this,"html",(e,t,n)=>{const s=r=>ee(this,Xe,xt).call(this,r,t,In("text/html; charset=UTF-8",n));return typeof e=="object"?yr(e,Pi.Stringify,!1,{}).then(s):s(e)});H(this,"redirect",(e,t)=>{const n=String(e);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)});H(this,"notFound",()=>(D(this,Lt)??F(this,Lt,()=>new Response),D(this,Lt).call(this,this)));F(this,Zt,e),t&&(F(this,Ge,t.executionCtx),this.env=t.env,F(this,Lt,t.notFoundHandler),F(this,tn,t.path),F(this,en,t.matchResult))}get req(){return D(this,Xt)??F(this,Xt,new hr(D(this,Zt),D(this,tn),D(this,en))),D(this,Xt)}get event(){if(D(this,Ge)&&"respondWith"in D(this,Ge))return D(this,Ge);throw Error("This context has no FetchEvent")}get executionCtx(){if(D(this,Ge))return D(this,Ge);throw Error("This context has no ExecutionContext")}get res(){return D(this,ke)||F(this,ke,new Response(null,{headers:D(this,mt)??F(this,mt,new Headers)}))}set res(e){if(D(this,ke)&&e){e=new Response(e.body,e);for(const[t,n]of D(this,ke).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=D(this,ke).headers.getSetCookie();e.headers.delete("set-cookie");for(const r of s)e.headers.append("set-cookie",r)}else e.headers.set(t,n)}F(this,ke,e),this.finalized=!0}get var(){return D(this,qe)?Object.fromEntries(D(this,qe)):{}}},Zt=new WeakMap,Xt=new WeakMap,qe=new WeakMap,Ot=new WeakMap,Ge=new WeakMap,ke=new WeakMap,Qt=new WeakMap,At=new WeakMap,Lt=new WeakMap,mt=new WeakMap,en=new WeakMap,tn=new WeakMap,Xe=new WeakSet,xt=function(e,t,n){const s=D(this,ke)?new Headers(D(this,ke).headers):D(this,mt)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,o]of a)i.toLowerCase()==="set-cookie"?s.append(i,o):s.set(i,o)}if(n)for(const[a,i]of Object.entries(n))if(typeof i=="string")s.set(a,i);else{s.delete(a);for(const o of i)s.append(a,o)}const r=typeof t=="number"?t:(t==null?void 0:t.status)??D(this,Ot);return new Response(e,{status:r,headers:s})},rr),pe="ALL",Bi="all",Hi=["get","post","put","delete","options","patch"],vr="Can not add a route since the matcher is already built.",wr=class extends Error{},Fi="__COMPOSED_HANDLER",Wi=e=>e.text("404 Not Found",404),Ds=(e,t)=>{if("getResponse"in e){const n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text("Internal Server Error",500)},Me,he,_r,$e,lt,mn,pn,Mt,qi=(Mt=class{constructor(t={}){V(this,he);H(this,"get");H(this,"post");H(this,"put");H(this,"delete");H(this,"options");H(this,"patch");H(this,"all");H(this,"on");H(this,"use");H(this,"router");H(this,"getPath");H(this,"_basePath","/");V(this,Me,"/");H(this,"routes",[]);V(this,$e,Wi);H(this,"errorHandler",Ds);H(this,"onError",t=>(this.errorHandler=t,this));H(this,"notFound",t=>(F(this,$e,t),this));H(this,"fetch",(t,...n)=>ee(this,he,pn).call(this,t,n[1],n[0],t.method));H(this,"request",(t,n,s,r)=>t instanceof Request?this.fetch(n?new Request(t,n):t,s,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${kt("/",t)}`,n),s,r)));H(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(ee(this,he,pn).call(this,t.request,t,void 0,t.request.method))})});[...Hi,Bi].forEach(a=>{this[a]=(i,...o)=>(typeof i=="string"?F(this,Me,i):ee(this,he,lt).call(this,a,D(this,Me),i),o.forEach(c=>{ee(this,he,lt).call(this,a,D(this,Me),c)}),this)}),this.on=(a,i,...o)=>{for(const c of[i].flat()){F(this,Me,c);for(const l of[a].flat())o.map(d=>{ee(this,he,lt).call(this,l.toUpperCase(),D(this,Me),d)})}return this},this.use=(a,...i)=>(typeof a=="string"?F(this,Me,a):(F(this,Me,"*"),i.unshift(a)),i.forEach(o=>{ee(this,he,lt).call(this,pe,D(this,Me),o)}),this);const{strict:s,...r}=t;Object.assign(this,r),this.getPath=s??!0?t.getPath??dr:Li}route(t,n){const s=this.basePath(t);return n.routes.map(r=>{var i;let a;n.errorHandler===Ds?a=r.handler:(a=async(o,c)=>(await ks([],n.errorHandler)(o,()=>r.handler(o,c))).res,a[Fi]=r.handler),ee(i=s,he,lt).call(i,r.method,r.path,a)}),this}basePath(t){const n=ee(this,he,_r).call(this);return n._basePath=kt(this._basePath,t),n}mount(t,n,s){let r,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?r=c=>c:r=s.replaceRequest));const i=a?c=>{const l=a(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};r||(r=(()=>{const c=kt(this._basePath,t),l=c==="/"?0:c.length;return d=>{const u=new URL(d.url);return u.pathname=u.pathname.slice(l)||"/",new Request(u,d)}})());const o=async(c,l)=>{const d=await n(r(c.req.raw),...i(c));if(d)return d;await l()};return ee(this,he,lt).call(this,pe,kt(t,"*"),o),this}},Me=new WeakMap,he=new WeakSet,_r=function(){const t=new Mt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,F(t,$e,D(this,$e)),t.routes=this.routes,t},$e=new WeakMap,lt=function(t,n,s){t=t.toUpperCase(),n=kt(this._basePath,n);const r={basePath:this._basePath,path:n,method:t,handler:s};this.router.add(t,n,[s,r]),this.routes.push(r)},mn=function(t,n){if(t instanceof Error)return this.errorHandler(t,n);throw t},pn=function(t,n,s,r){if(r==="HEAD")return(async()=>new Response(null,await ee(this,he,pn).call(this,t,n,s,"GET")))();const a=this.getPath(t,{env:s}),i=this.router.match(r,a),o=new Ui(t,{path:a,matchResult:i,env:s,executionCtx:n,notFoundHandler:D(this,$e)});if(i[0].length===1){let l;try{l=i[0][0][0][0](o,async()=>{o.res=await D(this,$e).call(this,o)})}catch(d){return ee(this,he,mn).call(this,d,o)}return l instanceof Promise?l.then(d=>d||(o.finalized?o.res:D(this,$e).call(this,o))).catch(d=>ee(this,he,mn).call(this,d,o)):l??D(this,$e).call(this,o)}const c=ks(i[0],this.errorHandler,D(this,$e));return(async()=>{try{const l=await c(o);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return ee(this,he,mn).call(this,l,o)}})()},Mt),br=[];function Gi(e,t){const n=this.buildAllMatchers(),s=((r,a)=>{const i=n[r]||n[pe],o=i[2][a];if(o)return o;const c=a.match(i[0]);if(!c)return[[],br];const l=c.indexOf("",1);return[i[1][l],c]});return this.match=s,s(e,t)}var gn="[^/]+",qt=".*",Gt="(?:|/.*)",Dt=Symbol(),zi=new Set(".\\+*[^]$()");function Ki(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===qt||e===Gt?1:t===qt||t===Gt?-1:e===gn?1:t===gn?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var pt,ht,Pe,yt,Yi=(yt=class{constructor(){V(this,pt);V(this,ht);V(this,Pe,Object.create(null))}insert(t,n,s,r,a){if(t.length===0){if(D(this,pt)!==void 0)throw Dt;if(a)return;F(this,pt,n);return}const[i,...o]=t,c=i==="*"?o.length===0?["","",qt]:["","",gn]:i==="/*"?["","",Gt]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const d=c[1];let u=c[2]||gn;if(d&&c[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw Dt;if(l=D(this,Pe)[u],!l){if(Object.keys(D(this,Pe)).some(p=>p!==qt&&p!==Gt))throw Dt;if(a)return;l=D(this,Pe)[u]=new yt,d!==""&&F(l,ht,r.varIndex++)}!a&&d!==""&&s.push([d,D(l,ht)])}else if(l=D(this,Pe)[i],!l){if(Object.keys(D(this,Pe)).some(d=>d.length>1&&d!==qt&&d!==Gt))throw Dt;if(a)return;l=D(this,Pe)[i]=new yt}l.insert(o,n,s,r,a)}buildRegExpStr(){const n=Object.keys(D(this,Pe)).sort(Ki).map(s=>{const r=D(this,Pe)[s];return(typeof D(r,ht)=="number"?`(${s})@${D(r,ht)}`:zi.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof D(this,pt)=="number"&&n.unshift(`#${D(this,pt)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},pt=new WeakMap,ht=new WeakMap,Pe=new WeakMap,yt),vn,nn,ar,Ji=(ar=class{constructor(){V(this,vn,{varIndex:0});V(this,nn,new Yi)}insert(e,t,n){const s=[],r=[];for(let i=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${i}`;return r[i]=[l,c],i++,o=!0,l}),!o)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=r.length-1;i>=0;i--){const[o]=r[i];for(let c=a.length-1;c>=0;c--)if(a[c].indexOf(o)!==-1){a[c]=a[c].replace(o,r[i][1]);break}}return D(this,nn).insert(a,t,s,D(this,vn),n),s}buildRegExp(){let e=D(this,nn).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const n=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,a,i)=>a!==void 0?(n[++t]=Number(a),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),n,s]}},vn=new WeakMap,nn=new WeakMap,ar),Vi=[/^$/,[],Object.create(null)],hn=Object.create(null);function Er(e){return hn[e]??(hn[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Zi(){hn=Object.create(null)}function Xi(e){var l;const t=new Ji,n=[];if(e.length===0)return Vi;const s=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,u],[p,h])=>d?1:p?-1:u.length-h.length),r=Object.create(null);for(let d=0,u=-1,p=s.length;d<p;d++){const[h,v,f]=s[d];h?r[v]=[f.map(([w])=>[w,Object.create(null)]),br]:u++;let g;try{g=t.insert(v,u,h)}catch(w){throw w===Dt?new wr(v):w}h||(n[u]=f.map(([w,T])=>{const x=Object.create(null);for(T-=1;T>=0;T--){const[A,N]=g[T];x[A]=N}return[w,x]}))}const[a,i,o]=t.buildRegExp();for(let d=0,u=n.length;d<u;d++)for(let p=0,h=n[d].length;p<h;p++){const v=(l=n[d][p])==null?void 0:l[1];if(!v)continue;const f=Object.keys(v);for(let g=0,w=f.length;g<w;g++)v[f[g]]=o[v[f[g]]]}const c=[];for(const d in i)c[d]=n[i[d]];return[a,c,r]}function bt(e,t){if(e){for(const n of Object.keys(e).sort((s,r)=>r.length-s.length))if(Er(n).test(t))return[...e[n]]}}var Qe,et,wn,Tr,ir,Qi=(ir=class{constructor(){V(this,wn);H(this,"name","RegExpRouter");V(this,Qe);V(this,et);H(this,"match",Gi);F(this,Qe,{[pe]:Object.create(null)}),F(this,et,{[pe]:Object.create(null)})}add(e,t,n){var o;const s=D(this,Qe),r=D(this,et);if(!s||!r)throw new Error(vr);s[e]||[s,r].forEach(c=>{c[e]=Object.create(null),Object.keys(c[pe]).forEach(l=>{c[e][l]=[...c[pe][l]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=Er(t);e===pe?Object.keys(s).forEach(l=>{var d;(d=s[l])[t]||(d[t]=bt(s[l],t)||bt(s[pe],t)||[])}):(o=s[e])[t]||(o[t]=bt(s[e],t)||bt(s[pe],t)||[]),Object.keys(s).forEach(l=>{(e===pe||e===l)&&Object.keys(s[l]).forEach(d=>{c.test(d)&&s[l][d].push([n,a])})}),Object.keys(r).forEach(l=>{(e===pe||e===l)&&Object.keys(r[l]).forEach(d=>c.test(d)&&r[l][d].push([n,a]))});return}const i=ur(t)||[t];for(let c=0,l=i.length;c<l;c++){const d=i[c];Object.keys(r).forEach(u=>{var p;(e===pe||e===u)&&((p=r[u])[d]||(p[d]=[...bt(s[u],d)||bt(s[pe],d)||[]]),r[u][d].push([n,a-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(D(this,et)).concat(Object.keys(D(this,Qe))).forEach(t=>{e[t]||(e[t]=ee(this,wn,Tr).call(this,t))}),F(this,Qe,F(this,et,void 0)),Zi(),e}},Qe=new WeakMap,et=new WeakMap,wn=new WeakSet,Tr=function(e){const t=[];let n=e===pe;return[D(this,Qe),D(this,et)].forEach(s=>{const r=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];r.length!==0?(n||(n=!0),t.push(...r)):e!==pe&&t.push(...Object.keys(s[pe]).map(a=>[a,s[pe][a]]))}),n?Xi(t):null},ir),tt,ze,or,eo=(or=class{constructor(e){H(this,"name","SmartRouter");V(this,tt,[]);V(this,ze,[]);F(this,tt,e.routers)}add(e,t,n){if(!D(this,ze))throw new Error(vr);D(this,ze).push([e,t,n])}match(e,t){if(!D(this,ze))throw new Error("Fatal error");const n=D(this,tt),s=D(this,ze),r=n.length;let a=0,i;for(;a<r;a++){const o=n[a];try{for(let c=0,l=s.length;c<l;c++)o.add(...s[c]);i=o.match(e,t)}catch(c){if(c instanceof wr)continue;throw c}this.match=o.match.bind(o),F(this,tt,[o]),F(this,ze,void 0);break}if(a===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(D(this,ze)||D(this,tt).length!==1)throw new Error("No active router has been determined yet.");return D(this,tt)[0]}},tt=new WeakMap,ze=new WeakMap,or),Ht=Object.create(null),nt,Ee,ft,$t,we,Ke,dt,Pt,to=(Pt=class{constructor(t,n,s){V(this,Ke);V(this,nt);V(this,Ee);V(this,ft);V(this,$t,0);V(this,we,Ht);if(F(this,Ee,s||Object.create(null)),F(this,nt,[]),t&&n){const r=Object.create(null);r[t]={handler:n,possibleKeys:[],score:0},F(this,nt,[r])}F(this,ft,[])}insert(t,n,s){F(this,$t,++Ss(this,$t)._);let r=this;const a=Ni(n),i=[];for(let o=0,c=a.length;o<c;o++){const l=a[o],d=a[o+1],u=Oi(l,d),p=Array.isArray(u)?u[0]:l;if(p in D(r,Ee)){r=D(r,Ee)[p],u&&i.push(u[1]);continue}D(r,Ee)[p]=new Pt,u&&(D(r,ft).push(u),i.push(u[1])),r=D(r,Ee)[p]}return D(r,nt).push({[t]:{handler:s,possibleKeys:i.filter((o,c,l)=>l.indexOf(o)===c),score:D(this,$t)}}),r}search(t,n){var c;const s=[];F(this,we,Ht);let a=[this];const i=lr(n),o=[];for(let l=0,d=i.length;l<d;l++){const u=i[l],p=l===d-1,h=[];for(let v=0,f=a.length;v<f;v++){const g=a[v],w=D(g,Ee)[u];w&&(F(w,we,D(g,we)),p?(D(w,Ee)["*"]&&s.push(...ee(this,Ke,dt).call(this,D(w,Ee)["*"],t,D(g,we))),s.push(...ee(this,Ke,dt).call(this,w,t,D(g,we)))):h.push(w));for(let T=0,x=D(g,ft).length;T<x;T++){const A=D(g,ft)[T],N=D(g,we)===Ht?{}:{...D(g,we)};if(A==="*"){const j=D(g,Ee)["*"];j&&(s.push(...ee(this,Ke,dt).call(this,j,t,D(g,we))),F(j,we,N),h.push(j));continue}const[$,M,z]=A;if(!u&&!(z instanceof RegExp))continue;const W=D(g,Ee)[$],ne=i.slice(l).join("/");if(z instanceof RegExp){const j=z.exec(ne);if(j){if(N[M]=j[0],s.push(...ee(this,Ke,dt).call(this,W,t,D(g,we),N)),Object.keys(D(W,Ee)).length){F(W,we,N);const Y=((c=j[0].match(/\//))==null?void 0:c.length)??0;(o[Y]||(o[Y]=[])).push(W)}continue}}(z===!0||z.test(u))&&(N[M]=u,p?(s.push(...ee(this,Ke,dt).call(this,W,t,N,D(g,we))),D(W,Ee)["*"]&&s.push(...ee(this,Ke,dt).call(this,D(W,Ee)["*"],t,N,D(g,we)))):(F(W,we,N),h.push(W)))}}a=h.concat(o.shift()??[])}return s.length>1&&s.sort((l,d)=>l.score-d.score),[s.map(({handler:l,params:d})=>[l,d])]}},nt=new WeakMap,Ee=new WeakMap,ft=new WeakMap,$t=new WeakMap,we=new WeakMap,Ke=new WeakSet,dt=function(t,n,s,r){const a=[];for(let i=0,o=D(t,nt).length;i<o;i++){const c=D(t,nt)[i],l=c[n]||c[pe],d={};if(l!==void 0&&(l.params=Object.create(null),a.push(l),s!==Ht||r&&r!==Ht))for(let u=0,p=l.possibleKeys.length;u<p;u++){const h=l.possibleKeys[u],v=d[l.score];l.params[h]=r!=null&&r[h]&&!v?r[h]:s[h]??(r==null?void 0:r[h]),d[l.score]=!0}}return a},Pt),gt,cr,no=(cr=class{constructor(){H(this,"name","TrieRouter");V(this,gt);F(this,gt,new to)}add(e,t,n){const s=ur(t);if(s){for(let r=0,a=s.length;r<a;r++)D(this,gt).insert(e,s[r],n);return}D(this,gt).insert(e,t,n)}match(e,t){return D(this,gt).search(e,t)}},gt=new WeakMap,cr),xe=class extends qi{constructor(e={}){super(e),this.router=e.router??new eo({routers:[new Qi,new no]})}},so=e=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(n.origin),r=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(n.allowMethods);return async function(i,o){var d;function c(u,p){i.res.headers.set(u,p)}const l=await s(i.req.header("origin")||"",i);if(l&&c("Access-Control-Allow-Origin",l),n.credentials&&c("Access-Control-Allow-Credentials","true"),(d=n.exposeHeaders)!=null&&d.length&&c("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),i.req.method==="OPTIONS"){n.origin!=="*"&&c("Vary","Origin"),n.maxAge!=null&&c("Access-Control-Max-Age",n.maxAge.toString());const u=await r(i.req.header("origin")||"",i);u.length&&c("Access-Control-Allow-Methods",u.join(","));let p=n.allowHeaders;if(!(p!=null&&p.length)){const h=i.req.header("Access-Control-Request-Headers");h&&(p=h.split(/\s*,\s*/))}return p!=null&&p.length&&(c("Access-Control-Allow-Headers",p.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&i.header("Vary","Origin",{append:!0})}};function ro(){return`  // === Karna v3.1 Frontend ===
  // API base: same-origin by default; set window.__KARNA_API_BASE__ (injected by
  // the server from API_BASE_URL) to call the backend on another origin (Render).
  var API_ORIGIN = (typeof window !== 'undefined' && window.__KARNA_API_BASE__) ? String(window.__KARNA_API_BASE__).replace(/\\/$/, '') : '';
  var API = API_ORIGIN + '/api';
  var state = {
    session: null,
    messages: [],
    loading: false,
    activeOverlay: null,
    settingsTab: 'profile',
    settingsSection: null,
    prevView: 'home',
    threads: [],
    activeThreadId: null,
    view: 'home',
    assistantName: 'Karna',
    gmailUnread: 0,
    pendingFiles: [],
    selectMode: false,
    selectedThreadIds: {},
    abortController: null,
    activeRunId: null,
    resumeInProgress: false,
    streamSession: 0,
    memoryReviewFilter: 'all',
    memoryReviewSearch: '',
    memoryTypeFilter: 'all',
    documentLibrarySearch: '',
    pendingDashMessage: null,
  };

  function messagePlaceholder() {
    return 'Message ' + (state.assistantName || 'Karna') + '…';
  }

  function updateMessagePlaceholders() {
    var ph = messagePlaceholder();
    var dash = document.getElementById('dashInputField');
    var chat = document.getElementById('inputField');
    if (dash) dash.setAttribute('data-placeholder', ph);
    if (chat) chat.setAttribute('data-placeholder', ph);
  }

  function applyAssistantName(name) {
    if (name) state.assistantName = name;
    updateMessagePlaceholders();
    var sub = document.querySelector('.dash-subtitle');
    if (sub) sub.textContent = 'Here’s what’s happening with ' + (state.assistantName || 'Karna');
  }

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

  function saveSession(d) {
    state.session = d;
    if (d && d.user && d.user.assistant_name) applyAssistantName(d.user.assistant_name);
    try {
      localStorage.setItem('karna_session', JSON.stringify(d));
      if (d && d.user && d.user.username) localStorage.setItem('karna_last_username', d.user.username);
    } catch(e) {}
  }
  function loadSession() {
    try {
      var s = localStorage.getItem('karna_session');
      if (s) {
        var parsed = JSON.parse(s);
        if (parsed && typeof parsed === 'object') {
          state.session = parsed;
          if (parsed.user && parsed.user.assistant_name) state.assistantName = parsed.user.assistant_name;
        }
      }
    } catch(e) { try { localStorage.removeItem('karna_session'); } catch(e2) {} }
  }
  function clearSession() {
    var key = viewStateKey();
    state.session = null;
    clearActiveThreadId();
    try { localStorage.removeItem('karna_session'); } catch(e) {}
    try { if (key) sessionStorage.removeItem(key); } catch(e) {}
  }

  function activeThreadStorageKey() {
    var u = state.session && state.session.user && state.session.user.username;
    return u ? 'karna_active_thread_' + u : null;
  }
  function setActiveThreadId(id) {
    var n = typeof id === 'number' ? id : parseInt(id, 10);
    if (!n || isNaN(n)) return;
    state.activeThreadId = n;
    try {
      var key = activeThreadStorageKey();
      if (key) sessionStorage.setItem(key, String(n));
    } catch(e) {}
  }
  function restoreActiveThreadId() {
    try {
      var key = activeThreadStorageKey();
      if (!key) return;
      var stored = sessionStorage.getItem(key);
      if (stored) {
        var n = parseInt(stored, 10);
        if (n && !isNaN(n)) state.activeThreadId = n;
      }
    } catch(e) {}
  }
  function clearActiveThreadId() {
    state.activeThreadId = null;
    try {
      var key = activeThreadStorageKey();
      if (key) sessionStorage.removeItem(key);
    } catch(e) {}
  }

  function viewStateKey() {
    var u = state.session && state.session.user && state.session.user.username;
    return u ? 'karna_view_' + u : null;
  }
  function saveViewState() {
    try {
      var key = viewStateKey();
      if (!key) return;
      sessionStorage.setItem(key, JSON.stringify({ view: state.view, settingsSection: state.settingsSection || null }));
    } catch(e) {}
  }
  function restoreViewState() {
    try {
      var key = viewStateKey();
      if (!key) return;
      var raw = sessionStorage.getItem(key);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (saved && saved.view) {
        state.view = saved.view;
        if (saved.settingsSection) state.settingsSection = saved.settingsSection;
      }
    } catch(e) {}
  }

  function showToast(msg, type) {
    var c = document.getElementById('toasts');
    if (!c) return;
    var t = document.createElement('div');
    t.className = 'toast ' + (type || '');
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function() { t.style.opacity = '0'; setTimeout(function() { t.remove(); }, 300); }, 3000);
  }

  function parseMdTableCells(line) {
    return line.trim().replace(/^\\|/, '').replace(/\\|$/, '').split('|').map(function(c) { return c.trim(); });
  }

  function isMdTableSeparator(line) {
    return /^\\|[\\s\\-:|]+\\|$/.test((line || '').trim());
  }

  function parseMdTables(s) {
    var lines = s.split('\\n');
    var out = [];
    var i = 0;
    while (i < lines.length) {
      var line = lines[i];
      if (line.trim().charAt(0) === '|' && i + 1 < lines.length && isMdTableSeparator(lines[i + 1])) {
        var headers = parseMdTableCells(line);
        i += 2;
        var html = '<table><thead><tr>';
        for (var h = 0; h < headers.length; h++) html += '<th>' + headers[h] + '</th>';
        html += '</tr></thead><tbody>';
        while (i < lines.length && lines[i].trim().charAt(0) === '|' && !isMdTableSeparator(lines[i])) {
          var cells = parseMdTableCells(lines[i]);
          html += '<tr>';
          for (var c = 0; c < cells.length; c++) html += '<td>' + cells[c] + '</td>';
          html += '</tr>';
          i++;
        }
        html += '</tbody></table>';
        out.push(html);
      } else {
        out.push(line);
        i++;
      }
    }
    return out.join('\\n');
  }

  function isMdBlockLine(line) {
    return /^<[/]?(?:h[1-6]|ul|ol|li|pre|hr|table|thead|tbody|tr|p)\\b/.test(line || '');
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
    s = parseMdTables(s);
    // Headings — must run before list processing so #-prefixed lines aren't misread
    s = s.replace(/^#{4} (.+)$/gm, '<h4>$1</h4>');
    s = s.replace(/^#{3} (.+)$/gm, '<h3>$1</h3>');
    s = s.replace(/^#{2} (.+)$/gm, '<h2>$1</h2>');
    s = s.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    s = s.replace(/^---+$/gm, '<hr>');
    s = s.replace(/^\\d+\\. (.+)$/gm, '<li data-ol="1">$1</li>');
    s = s.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
    var lines = s.split('\\n');
    var result = [];
    var inList = false;
    var inOrderedList = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.indexOf('<li data-ol="1">') === 0) {
        if (inList) { result.push('</ul>'); inList = false; }
        if (!inOrderedList) { result.push('<ol>'); inOrderedList = true; }
        result.push(line.replace(' data-ol="1"', ''));
      } else if (line.indexOf('<li>') === 0) {
        if (inOrderedList) { result.push('</ol>'); inOrderedList = false; }
        if (!inList) { result.push('<ul>'); inList = true; }
        result.push(line);
      } else {
        if (inList) { result.push('</ul>'); inList = false; }
        if (inOrderedList) { result.push('</ol>'); inOrderedList = false; }
        if (!line.trim()) continue;
        result.push(line);
      }
    }
    if (inList) result.push('</ul>');
    if (inOrderedList) result.push('</ol>');

    var blocks = [];
    var paraBuf = [];
    for (var k = 0; k < result.length; k++) {
      var ln = result[k];
      if (isMdBlockLine(ln)) {
        if (paraBuf.length) {
          blocks.push('<p>' + paraBuf.join('<br>') + '</p>');
          paraBuf = [];
        }
        blocks.push(ln);
      } else {
        paraBuf.push(ln);
      }
    }
    if (paraBuf.length) blocks.push('<p>' + paraBuf.join('<br>') + '</p>');
    return blocks.join('');
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
      return text.replace(/[#*_~[]()]/g, '').trim();
    }
  }

  window.addEventListener('error', function(e) {
    console.error('Karna runtime error:', e.error || e.message);
    var app = document.getElementById('app');
    if (app && app.children.length === 0) {
      app.innerHTML = '<div style="height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;background:#F3EBE2;color:#8C8175;font-family:Inter,system-ui,sans-serif;text-align:center;padding:24px;">' +
        '<div style="font-size:18px;color:#2A2521;font-weight:600;">Something went wrong</div>' +
        '<div style="font-size:13px;">Please refresh the page. If this persists, clear your browser cache.</div>' +
        '<button onclick="location.reload()" style="margin-top:8px;padding:10px 20px;background:#C97A52;color:#fff;border:none;border-radius:9999px;cursor:pointer;font-size:13px;font-weight:600;">Refresh</button>' +
        '</div>';
    }
  });
`}function ao(){return`  // === Render Core ===
  function render() {
    var app = document.getElementById('app');
    if (!state.session) { renderAuth(app); } else { renderMain(app); }
  }

  var authHasUsers = false;

  function renderAuth(container) {
    container.innerHTML = '<div class="auth-screen"><div class="auth-form" style="text-align:center;">' +
      '<div class="auth-hero"><span class="auth-bot-mark"><img src="/static/bot-mark.png" alt="Assistant"></span></div>' +
      '<h1 class="auth-title">Karna</h1>' +
      '<p class="auth-tagline">Your personal AI assistant</p>' +
      '<div style="color:var(--text-muted);font-size:13px;margin-top:24px;">Loading…</div>' +
    '</div></div>';
    api('/auth/check').then(function(data) {
      authHasUsers = !!(data && data.hasUsers);
      var returningUser = !!localStorage.getItem('karna_last_username');
      if (!data || data.error) { renderLogin(container); }
      else if (!authHasUsers && !returningUser) { renderSetup(container); }
      else { renderLogin(container); }
    }).catch(function(err) {
      console.error('Auth check error:', err);
      renderLogin(container);
    });
  }

  function renderSetup(container) {
    var signInLink = (authHasUsers || localStorage.getItem('karna_last_username'))
      ? '<div style="text-align:center;margin-top:16px;"><a href="#" id="showLogin" style="color:var(--text-muted);font-size:12px;">Already have an account? Sign in</a></div>'
      : '';
    container.innerHTML = '<div class="auth-screen"><div class="auth-form">' +
      '<div class="auth-hero"><span class="auth-bot-mark"><img src="/static/bot-mark.png" alt="Assistant"></span></div>' +
      '<h1 class="auth-title">Welcome to Karna</h1>' +
      '<p class="auth-tagline">Your personal AI assistant</p>' +
      '<p class="auth-subtitle">First time setup \\u2014 create your profile</p>' +
      '<div class="field"><label>Username</label><input type="text" id="setupUsername" placeholder="ashwin" autocomplete="off"></div>' +
      '<div class="field"><label>Display Name</label><input type="text" id="setupName" placeholder="Ashwin Jyoti"></div>' +
      '<div class="field"><label>PIN (4+ characters)</label><div style="display:flex;gap:8px;align-items:center;"><input type="password" id="setupPin" placeholder="Your secret PIN" style="flex:1;"></div></div>' +
      '<div class="field"><label>Timezone</label><select id="setupTimezone"><option value="Asia/Kolkata" selected>Asia/Kolkata (IST)</option><option value="America/New_York">America/New_York (EST)</option><option value="Europe/London">Europe/London (GMT)</option><option value="Asia/Tokyo">Asia/Tokyo (JST)</option><option value="UTC">UTC</option></select></div>' +
      '<button class="btn" id="setupBtn">Create Profile</button>' +
      '<div id="setupError" class="error-text"></div>' +
      signInLink + '</div></div>';
    document.getElementById('setupBtn').onclick = handleSetup;
    var loginLink = document.getElementById('showLogin');
    if (loginLink) {
      loginLink.onclick = function(e) { e.preventDefault(); renderLogin(container); };
    }
  }

  function renderLogin(container) {
    var lastUser = localStorage.getItem('karna_last_username') || '';
    var createLink = authHasUsers
      ? '<a href="#" id="showSetup" style="color:var(--text-muted);font-size:12px;">Create new account</a>'
      : '';
    container.innerHTML = '<div class="auth-screen"><div class="auth-form">' +
      '<div class="auth-hero"><span class="auth-bot-mark"><img src="/static/bot-mark.png" alt="Assistant"></span></div>' +
      '<h1 class="auth-title">Welcome to Karna</h1>' +
      '<p class="auth-tagline">Your personal AI assistant</p>' +
      '<p class="auth-subtitle">Enter your PIN to continue</p>' +
      '<div class="field"><label>Username</label><input type="text" id="loginUsername" placeholder="username" autocomplete="off" value="' + escapeHtml(lastUser) + '"></div>' +
      '<div class="field"><label>PIN</label><div style="display:flex;gap:8px;align-items:center;"><input type="password" id="loginPin" placeholder="Your PIN" style="flex:1;"><button class="btn btn-small" id="loginBtn" style="width:auto;min-width:60px;flex-shrink:0;">➜</button></div></div>' +
      '<div id="loginError" class="error-text"></div>' +
      '<div style="display:flex;justify-content:space-between;margin-top:16px;">' +
      '<a href="#" id="showForgot" style="color:var(--text-muted);font-size:12px;">Forgot credentials?</a>' +
      createLink + '</div></div></div>';
    document.getElementById('loginBtn').onclick = handleLogin;
    document.getElementById('loginPin').onkeydown = function(e) { if (e.key === 'Enter') handleLogin(); };
    var setupLink = document.getElementById('showSetup');
    if (setupLink) {
      setupLink.onclick = function(e) { e.preventDefault(); renderSetup(container); };
    }
    document.getElementById('showForgot').onclick = function(e) { e.preventDefault(); renderForgotScreen(container); };
    if (lastUser) { document.getElementById('loginPin').focus(); } else { document.getElementById('loginUsername').focus(); }
  }

  // === Forgot Screen ===
  function renderForgotScreen(container) {
    container.innerHTML = '<div class="auth-screen"><div class="auth-form">' +
      '<div class="auth-hero"><span class="auth-bot-mark"><img src="/static/bot-mark.png" alt="Assistant"></span></div>' +
      '<h1 class="auth-title" style="font-size:18px;">Recovery</h1>' +
      '<p class="auth-subtitle">Forgot your username or need to reset your PIN?</p>' +
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
`}function io(){return`  // ============================================================
  // MAIN APP — Dashboard + Chat + Threads
  // ============================================================

  async function renderMain(container) {
    restoreActiveThreadId();
    restoreViewState();
    container.innerHTML = '<div class="topbar">' +
      '<div class="topbar-left">' +
        '<button class="icon-btn" id="threadsBtn" title="Chat history" style="margin-right:8px;">&#9776;</button>' +
      '</div>' +
      '<div class="topbar-right">' +
        '<button class="clay-notes-btn clay-notes-btn--top" id="notesBtn" type="button" title="Notes" aria-label="Notes">' +
          '<span class="clay-notes-btn__icon" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M7 3.5h7.5L18.5 7.5V19a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" stroke="white" stroke-width="1.7" stroke-linejoin="round" fill="rgba(255,255,255,0.08)"/>' +
              '<path d="M14.5 3.5V7.5H18.5" stroke="white" stroke-width="1.7" stroke-linejoin="round" fill="rgba(255,255,255,0.04)"/>' +
              '<path d="M8.5 11h7M8.5 14h7M8.5 17h4.5" stroke="white" stroke-width="1.7" stroke-linecap="round" fill="none"/>' +
            '</svg>' +
          '</span>' +
        '</button>' +
        '<button class="icon-btn notif-btn" id="notifBtn" title="Schedule">&#128276;<span class="notif-badge hidden" id="notifBadge">0</span></button>' +
        '<button class="icon-btn" id="newChatBtn" title="New chat"><i class="fa-solid fa-pen-to-square"></i></button>' +
        '<button class="icon-btn" id="settingsBtn" title="Settings"><i class="fa-solid fa-gear"></i></button>' +
      '</div></div>' +
      '<!-- Notification Dropdown -->' +
      '<div class="notif-dropdown" id="notifDropdown">' +
        '<div class="notif-header"><span class="notif-header-title">Notifications</span><button class="btn btn-small" id="notifReadAll" style="width:auto;padding:4px 10px;font-size:10px;">Mark all done</button></div>' +
        '<div class="notif-list" id="notifList"><div class="notif-empty">No notifications</div></div>' +
        '<div class="notif-footer"><button class="notif-footer-btn" onclick="closeNotifDropdown();state.view=\\'reminders\\';renderView();">&#9201; Manage reminders</button></div>' +
      '</div>' +
      '<div class="main-content" id="mainContent"></div>' +
      '<!-- Thread Sidebar -->' +
      '<div class="overlay" id="threadsOverlay">' +
        '<div class="overlay-panel">' +
          '<div class="thread-sidebar-header"><span class="panel-title" style="margin:0;">CHAT LOG</span><div style="display:flex;gap:8px;align-items:center;"><button class="icon-btn" id="sidebarSelectBtn" title="Select to delete" style="width:36px;height:36px;font-size:14px;">&#9745;</button><button class="btn-new" id="sidebarNewBtn"><span class="plus">+</span><span>NEW</span></button></div></div>' +
          '<div class="thread-list" id="threadList"></div>' +
          '<div class="thread-sidebar-footer">' +
            '<div class="nav-pill">' +
              '<button class="nav-item nav-item--skills" id="sidebarSkillsBtn"><i class="fa-solid fa-bolt"></i><span>Skills</span></button>' +
              '<button class="nav-item nav-item--digests" id="sidebarDigestsBtn"><i class="fa-solid fa-rectangle-list"></i><span>Digests</span></button>' +
            '</div>' +
          '</div>' +
        '</div><div class="overlay-close" id="threadsClose"></div></div>';

    // Event listeners
    document.getElementById('threadsBtn').onclick = function() { toggleOverlay('threadsOverlay'); };
    document.getElementById('threadsClose').onclick = function() { toggleOverlay(null); };
    document.getElementById('newChatBtn').onclick = function() { closeNotifDropdown(); startNewThread(); };
    document.getElementById('notesBtn').onclick = function() { navigateToNotes(); };
    document.getElementById('settingsBtn').onclick = function() { closeNotifDropdown(); state.view = 'settings'; state.settingsSection = null; renderView(); };
    
    // documentsBtn removed in v4
    document.getElementById('sidebarNewBtn').onclick = function() { toggleOverlay(null); startNewThread(); };
    document.getElementById('sidebarSelectBtn').onclick = function() { state.selectMode = !state.selectMode; state.selectedThreadIds = {}; loadThreadSidebar(); };
    document.getElementById('sidebarSkillsBtn').onclick = function() { toggleOverlay(null); state.view = 'skills'; renderView(); };
    if (document.getElementById('sidebarDigestsBtn')) document.getElementById('sidebarDigestsBtn').onclick = function() { toggleOverlay(null); state.view = 'digests'; renderView(); };

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

    // Keyboard activation for thread cards (now rendered as <div> buttons)
    document.getElementById('threadList').addEventListener('keydown', function(e) {
      var item = e.target.closest('.thread-item');
      if (!item) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var id = parseInt(item.getAttribute('data-id'), 10);
        if (state.selectMode) {
          toggleThreadSelect(id);
        } else {
          openThread(id);
        }
      }
    });

    // Long-press (mobile) and right-click (desktop) context menu for thread items
    var threadListEl = document.getElementById('threadList');
    var _lpStartX = 0, _lpStartY = 0;
    if (threadListEl) {
      threadListEl.addEventListener('touchstart', function(e) {
        var item = e.target.closest('.thread-item');
        if (!item) return;
        _lpStartX = e.touches[0].clientX;
        _lpStartY = e.touches[0].clientY;
        startThreadLongPress(item);
      }, { passive: true });
      threadListEl.addEventListener('touchend', function(e) {
        cancelThreadLongPress();
        // If context menu is open, prevent the tap from opening the thread
        if (threadContextMenuOpen) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
      threadListEl.addEventListener('touchmove', function(e) {
        // Only cancel long-press if finger moved more than 10px (ignore minor tremor)
        var dx = e.touches[0].clientX - _lpStartX;
        var dy = e.touches[0].clientY - _lpStartY;
        if (Math.sqrt(dx * dx + dy * dy) > 10) {
          cancelThreadLongPress();
        }
      }, { passive: true });
    }

    await loadAssistantName();
    loadNotificationCount();
    // Poll notification count every 60s
    setInterval(loadNotificationCount, 60000);
    // Check Google connection status on load and every 5 minutes
    checkGoogleConnectionBanner();
    if (googleStatusInterval) clearInterval(googleStatusInterval);
    googleStatusInterval = setInterval(checkGoogleConnectionBanner, 5 * 60 * 1000);
    try {
      renderView();
    } catch(e) {
      var mc2 = document.getElementById('mainContent');
      if (mc2) mc2.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:12px;color:var(--text-muted);font-size:14px;text-align:center;">' +
        '<div>Something went wrong loading this view.</div>' +
        '<button onclick="location.reload()" style="padding:8px 20px;background:var(--accent);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;">Reload</button>' +
        '</div>';
      console.error(e);
    }
  }

  function navigateToNotes() {
    if (state.view !== 'notes') {
      state.prevView = state.view;
    }
    closeNotifDropdown();
    if (typeof toggleOverlay === 'function') toggleOverlay(null);
    state.view = 'notes';
    renderView();
  }

  window.navigateToNotes = navigateToNotes;

  function goBackFromNotes() {
    state.view = state.prevView || 'home';
    renderView();
  }

  window.goBackFromNotes = goBackFromNotes;

  function renderView() {
    saveViewState();
    var mc = document.getElementById('mainContent');
    if (!mc) return;

    if (state.view === 'home') {
      renderDashboard(mc);
    } else if (state.view === 'documents') {
      renderDocumentsView(mc);
    } else if (state.view === 'notes') {
      renderNotesView(mc);
    } else if (state.view === 'settings') {
      renderSettingsView(mc);
    } else if (state.view === 'memory-review') {
      renderMemoryReview(mc);
    } else if (state.view === 'document-library') {
      renderDocumentLibrary(mc);
    } else if (state.view === 'skills') {
      renderSkillsView(mc);
    } else if (state.view === 'digests') {
      renderDigestsView(mc);
    } else if (state.view === 'reminders') {
      renderRemindersView(mc);
    } else {
      renderChatView(mc);
    }
    updateNotesNavActive();
  }

  function updateNotesNavActive() {
    var btn = document.getElementById('notesBtn');
    if (btn) btn.classList.toggle('clay-notes-btn--active', state.view === 'notes');
  }

  // Helper: open a settings sub-section (global — called from rendered HTML)
  window.openSection = function(section) {
    state.settingsSection = section;
    renderView();
  };

  // Helper: go back from settings/skills to home (global — called from rendered HTML)
  window.goBack = function() {
    state.view = 'home';
    state.settingsSection = null;
    renderView();
  };
`}function oo(){return`  // ============================================================
  // DASHBOARD
  // ============================================================

  function renderDashInputArea() {
    return '<div class="input-anchor">' +
      '<input type="file" id="dashFileInput" style="display:none" multiple>' +
      '<div id="dashFileChips" class="file-chips" style="display:none"></div>' +
      '<div class="input-pill">' +
        '<button type="button" class="attach-btn" id="dashAttachBtn" title="Attach file" aria-label="Attach file" tabindex="-1">' +
          '<svg class="attach-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<path d="M16.5 6.5 8.2 14.8a3 3 0 1 0 4.2 4.2l8.3-8.3a5 5 0 0 0-7.1-7.1L5.3 11.9a7 7 0 1 0 9.9 9.9l7.1-7.1" />' +
          '</svg>' +
        '</button>' +
        '<div contenteditable="true" class="text-input" id="dashInputField" role="textbox" data-placeholder="' + escapeHtml(messagePlaceholder()) + '" enterkeyhint="send" autocorrect="off"></div>' +
        '<button type="button" class="send-btn" id="dashSendBtn" title="Send" aria-label="Send" tabindex="-1">&#10148;</button>' +
      '</div>' +
    '</div>';
  }

  function renderDashFileChips() {
    var container = document.getElementById('dashFileChips');
    if (!container) return;
    if (state.pendingFiles.length === 0) { container.style.display = 'none'; container.innerHTML = ''; return; }
    container.style.display = 'flex';
    var html = '';
    for (var i = 0; i < state.pendingFiles.length; i++) {
      var f = state.pendingFiles[i];
      var sizeKb = Math.round(f.size / 1024);
      var sizeStr = sizeKb > 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : sizeKb + ' KB';
      html += '<div class="file-chip"><span>&#128196;</span> ' + escapeHtml(f.name) + ' (' + sizeStr + ')<button onclick="dashRemoveFile(' + i + ')">\\u00d7</button></div>';
    }
    container.innerHTML = html;
  }

  window.dashRemoveFile = function(index) {
    state.pendingFiles.splice(index, 1);
    renderDashFileChips();
  };

  function bindDashInput() {
    var dashInput = document.getElementById('dashInputField');
    var dashSend = document.getElementById('dashSendBtn');
    var dashAttach = document.getElementById('dashAttachBtn');
    var dashFileInput = document.getElementById('dashFileInput');
    if (!dashInput || !dashSend) return;
    dashInput.onkeydown = function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        dashChatSend();
      }
    };
    dashSend.onclick = dashChatSend;
    if (dashAttach && dashFileInput) {
      dashAttach.onclick = function() { dashFileInput.click(); };
      dashFileInput.onchange = function(e) {
        var files = e.target.files;
        if (!files || files.length === 0) return;
        for (var i = 0; i < files.length; i++) { state.pendingFiles.push(files[i]); }
        renderDashFileChips();
        e.target.value = '';
      };
    }
  }

  function dashChatSend() {
    var dashInput = document.getElementById('dashInputField');
    if (!dashInput) return;
    var text = (dashInput.innerText || '').trim();
    if (!text) {
      dashInput.focus();
      return;
    }
    state.pendingDashMessage = text;
    dashInput.textContent = '';
    state.view = 'chat';
    renderView();
  }

  async function renderDashboard(container) {
    container.innerHTML = '<div class="dash-page">' +
      '<div class="chat-area"><div class="dashboard dashboard--minimal" id="dashContent"><div style="color:var(--text-muted);font-size:13px;">Loading home...</div></div></div>' +
      renderDashInputArea() +
    '</div>';
    bindDashInput();
    updateMessagePlaceholders();

    var MORNING_GREETINGS = [
      'Good morning, Ashwin.',
      'Morning, Ashwin.',
      'Good morning. You\\'re up early.',
      'Morning. The day\\'s already moving.',
      'Good morning. Let\\'s make it count.',
      'Morning, Ashwin. Something\\'s already brewing.',
      'Good morning. The world didn\\'t wait \\u2014 neither did I.'
    ];
    var STATUS_LINES = [
      'Ruby is caffeinated.',
      'Ruby is in a good mood. Use it.',
      'Ruby has opinions today.',
      'Ruby slept well. Let\\'s go.',
      'Ruby is sharp and slightly impatient.',
      'Ruby is warmed up.',
      'Ruby is feeling dangerous.',
      'Ruby is dialed in.',
      'Ruby woke up before you.',
      'Ruby is running hot.',
      'Ruby is ready to move.',
      'Ruby is on the clock.',
      'Ruby is here. What needs doing?',
      'Ruby is locked in.'
    ];
    function pickRandom(arr, storageKey) {
      var last = parseInt(localStorage.getItem(storageKey) || '-1', 10);
      var idx = Math.floor(Math.random() * arr.length);
      if (arr.length > 1 && idx === last) { idx = (idx + 1) % arr.length; }
      localStorage.setItem(storageKey, String(idx));
      return arr[idx];
    }
    function buildHome(firstName, assistant) {
      var hour = new Date().getHours();
      var dateLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      var greeting = hour < 12
        ? pickRandom(MORNING_GREETINGS, 'karna_last_greeting')
        : (hour < 17 ? 'Good afternoon' + (firstName ? ', ' + firstName + '.' : '.') : 'Good evening' + (firstName ? ', ' + firstName + '.' : '.'));
      var status = pickRandom(STATUS_LINES, 'karna_last_status');
      return '<div class="home">' +
        '<div class="home-date">' + escapeHtml(dateLabel) + '</div>' +
        '<h1 class="home-greeting">' + escapeHtml(greeting) + '</h1>' +
        '<div class="home-bot">' +
          '<span class="pulse-ring"></span>' +
          '<span class="pulse-ring d2"></span>' +
          '<span class="bot-mark"><img src="/static/bot-mark.png" alt="' + escapeHtml(assistant) + '"></span>' +
        '</div>' +
        '<div class="home-listening">' +
          '<span class="dot"></span>' +
          '<span>' + escapeHtml(status) + '</span>' +
        '</div>' +
      '</div>';
    }

    try {
      await api('/chat/dashboard');
      var dc = document.getElementById('dashContent');
      if (!dc) return;
      var userName = state.session && state.session.user ? state.session.user.name : '';
      var firstName = userName ? userName.split(' ')[0] : '';
      var assistant = state.assistantName || 'Karna';
      dc.innerHTML = buildHome(firstName, assistant);
    } catch(err) {
      var dc2 = document.getElementById('dashContent');
      if (dc2) {
        var name2 = state.session && state.session.user ? state.session.user.name.split(' ')[0] : '';
        var assistant2 = state.assistantName || 'Karna';
        dc2.innerHTML = buildHome(name2, assistant2);
      }
    }
  }
`}function co(){return`  // ============================================================
  // CHAT VIEW
  // ============================================================

  function renderChatView(container) {
    container.innerHTML = '<div class="conv-page"><div class="chat-area" id="chatArea">' +
      '<div id="messages"></div>' +
      '<div id="thinking" class="thinking" style="display:none">Thinking&hellip;<span class="thinking-cursor"></span></div>' +
    '</div>' +
    '<div class="input-anchor input-anchor--conv">' +
      '<input type="file" id="fileInput" style="display:none" multiple>' +
      '<div id="fileChips" class="file-chips"></div>' +
      '<div class="input-pill input-pill--conv">' +
        '<button type="button" class="attach-btn" id="attachBtn" title="Attach file" aria-label="Attach file" tabindex="-1">' +
          '<svg class="attach-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<path d="M16.5 6.5 8.2 14.8a3 3 0 1 0 4.2 4.2l8.3-8.3a5 5 0 0 0-7.1-7.1L5.3 11.9a7 7 0 1 0 9.9 9.9l7.1-7.1" />' +
          '</svg>' +
        '</button>' +
        '<div contenteditable="true" class="text-input" id="inputField" role="textbox" data-placeholder="' + escapeHtml(messagePlaceholder()) + '" enterkeyhint="send" autocorrect="off"></div>' +
        '<button type="button" class="send-btn" id="sendBtn" title="Send (Ctrl+Enter)" tabindex="-1">&#10148;</button>' +
      '</div>' +
    '</div></div>';

    var input = document.getElementById('inputField');
    input.onkeydown = function(e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleSend(); } };
    updateMessagePlaceholders();
    document.getElementById('sendBtn').onclick = handleSend;
    document.getElementById('attachBtn').onclick = function() { document.getElementById('fileInput').click(); };
    document.getElementById('fileInput').onchange = handleFileSelect;
    if (state.pendingDashMessage) {
      var pendingText = state.pendingDashMessage;
      state.pendingDashMessage = null;
      input.textContent = pendingText;
      setTimeout(function() { handleSend(); }, 50);
    } else {
      input.focus();
    }

    // Update thread title display
    var ttl = document.getElementById('threadTitleDisplay');
    if (ttl && state.activeThreadId) {
      var found = state.threads.find(function(t) { return t.id === state.activeThreadId; });
      if (found) ttl.textContent = found.title;
    }

    if (state.activeThreadId) { loadThreadMessages(state.activeThreadId); }

    // Track user scroll so auto-scroll is suppressed when user scrolls up
    var chatArea = document.getElementById('chatArea');
    if (chatArea) {
      chatArea.addEventListener('scroll', onChatScroll, { passive: true });
    }
  }

  function createChatTurn(userContent) {
    var turn = document.createElement('div');
    turn.className = 'chat-turn';
    turn.innerHTML = '<div class="msg-user">' + escapeHtml(userContent) + '</div><div class="chat-turn-reply"></div>';
    return turn;
  }

  function getLastChatTurn(messagesEl) {
    var turns = messagesEl.querySelectorAll('.chat-turn');
    return turns.length ? turns[turns.length - 1] : null;
  }

  function appendChatTurn(messagesEl, userContent) {
    var welcome = messagesEl.querySelector('.welcome');
    if (welcome) welcome.remove();
    var turn = createChatTurn(userContent);
    messagesEl.appendChild(turn);
    return turn;
  }

  function buildAssistantBlockHtml(content, msgId, type) {
    if (type === 'error-provider') {
      return '<div class="msg-assistant">' + md(content) + '<br><br><button class="btn btn-small" onclick="state.prevView=state.view;state.view=\\'settings\\';state.settingsSection=\\'credentials\\';renderView();">Open Settings</button></div>';
    }
    if (type === 'error') {
      return '<div class="msg-assistant" style="color:var(--danger)">' + md(content) + '</div>';
    }
    var safeContent = escapeHtml(content).replace(/"/g, '&quot;');
    var idAttr = msgId ? ' id="msg-' + msgId + '"' : '';
    var html = '<div class="msg-assistant"' + idAttr + '>' + md(content) + '</div>';
    if (msgId) {
      html += '<div class="msg-actions">' +
        '<button class="msg-action-btn" onclick="maCopy(this)" data-content="' + safeContent + '">Copy</button>' +
        '<button class="msg-action-btn" onclick="maSaveDoc(this)" data-content="' + safeContent + '">Save to Doc</button>' +
        '<button class="msg-action-btn" onclick="maEmail(this)" data-content="' + safeContent + '">Email</button>' +
        '<button class="msg-action-btn" onclick="maTask(this)" data-content="' + safeContent + '">Task</button>' +
        '<button class="msg-action-btn" onclick="maRemember(this)" data-content="' + safeContent + '">Remember</button>' +
        '<button class="msg-action-btn" onclick="maReminder(this)" data-content="' + safeContent + '">Reminder</button>' +
        '<button class="msg-action-btn" onclick="maShorter(this)">Shorter</button>' +
        '<button class="msg-action-btn" onclick="maDetailed(this)">More detail</button>' +
        '</div>';
    }
    return html;
  }

  function appendAssistantBlock(messagesEl, content, type, msgId) {
    var html = buildAssistantBlockHtml(content, msgId, type);
    var turn = getLastChatTurn(messagesEl);
    if (turn) {
      var reply = turn.querySelector('.chat-turn-reply');
      var block = document.createElement('div');
      block.className = 'assistant-block';
      block.innerHTML = html;
      reply.appendChild(block);
      return block;
    }
    var group = document.createElement('div');
    group.className = 'message-group';
    group.innerHTML = html;
    messagesEl.appendChild(group);
    return group;
  }

  function appendStreamingContainer(messagesEl) {
    var welcome = messagesEl.querySelector('.welcome');
    if (welcome) welcome.remove();

    var streamingContainer = document.createElement('div');
    streamingContainer.className = 'streaming-response';
    streamingContainer.innerHTML = '<div class="tools-container"></div><div class="streaming-text msg-assistant"></div>';
    var turn = getLastChatTurn(messagesEl);
    if (turn) {
      turn.querySelector('.chat-turn-reply').appendChild(streamingContainer);
    } else {
      var group = document.createElement('div');
      group.className = 'message-group';
      group.appendChild(streamingContainer);
      messagesEl.appendChild(group);
    }
    return streamingContainer;
  }

  var streamingMdTimer = null;

  function finalizeStreamingMarkdown(ctx, immediate) {
    if (!ctx || !ctx.streamingText) return;
    if (streamingMdTimer) {
      clearTimeout(streamingMdTimer);
      streamingMdTimer = null;
    }
    function render() {
      var latest = ctx.accumulatedText || '';
      if (!latest || !ctx.streamingText) return;
      ctx.streamingText.innerHTML = md(latest);
    }
    if (immediate) render();
    else streamingMdTimer = setTimeout(function() { streamingMdTimer = null; render(); }, 100);
  }

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
    var currentTurn = null;
    for (var i = 0; i < data.messages.length; i++) {
      var msg = data.messages[i];
      if (msg.role === 'user') {
        currentTurn = createChatTurn(msg.content);
        messagesEl.appendChild(currentTurn);
      } else if (currentTurn) {
        var reply = currentTurn.querySelector('.chat-turn-reply');
        var block = document.createElement('div');
        block.className = 'assistant-block';
        block.innerHTML = buildAssistantBlockHtml(msg.content, msg.id, null);
        reply.appendChild(block);
      } else {
        var group = document.createElement('div');
        group.className = 'message-group';
        group.innerHTML = buildAssistantBlockHtml(msg.content, msg.id, null);
        messagesEl.appendChild(group);
      }
    }
    scrollToBottomForce();

    // After rendering persisted history, check for an in-flight run on this
    // thread (e.g. the user reloaded the page mid-generation). If one is still
    // running, resume it so the streaming answer continues live.
    maybeResumeActiveRun(threadId);
  }

  // On thread open, look up the latest run. If it's still running, attach a
  // streaming container and resume so the user sees the answer stream back in.
  async function maybeResumeActiveRun(threadId) {
    try {
      // Never resume while a live send is already consuming this run's stream.
      if (state.loading || state.resumeInProgress) return;
      var data = await api('/chat/threads/' + threadId + '/active-run');
      if (!data || !data.run || data.run.status !== 'running') return;
      state.activeRunId = data.run.runId;
      var messagesEl = document.getElementById('messages');
      if (!messagesEl) return;

      // Build the streaming container the resume will populate, mirroring the
      // one used during a live send.
      var streamingContainer = appendStreamingContainer(messagesEl);
      var ctx = {
        streamSession: beginStreamSession(),
        eventsReceived: 0,
        streamingText: streamingContainer.querySelector('.streaming-text'),
        toolsContainer: streamingContainer.querySelector('.tools-container'),
        accumulatedText: '',
        activeTools: {},
        browserAckEl: null,
        browserProgressEl: null,
        researchProgressEl: null,
      };
      state.loading = true;
      updateSendBtn();
      showThinking(true);
      await resumeStream(streamingContainer, ctx, 0);
      showThinking(false);
      if (ctx.streamingText && ctx.accumulatedText) {
        finalizeStreamingMarkdown(ctx, true);
      }
    } catch (err) {
      console.warn('resume-on-open failed:', err && err.message);
    } finally {
      state.loading = false;
      state.activeRunId = null;
      updateSendBtn();
    }
  }
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
    var text = (input.innerText || '').trim();
    var hasFiles = state.pendingFiles.length > 0;
    if ((!text && !hasFiles) || state.loading) return;
    input.textContent = '';
    _userScrolled = false;
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
          var uploadRes = await fetch(API + '/chat/upload', {
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
              addMessage('assistant', '⏳ Extracting text from “' + escapeHtml(uploadData.name) + '” in the background. For best results, wait about 30 seconds before asking ' + escapeHtml(state.assistantName || 'Karna') + ' to parse it.', 'info');
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
    var browserAckEl = null;
    var browserProgressEl = null;
    var researchProgressEl = null;
    var eventsReceived = 0;
    var streamReader = null;
    var streamSession = beginStreamSession();

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

      // Get thread ID + run ID from headers.
      var threadIdHeader = response.headers.get('X-Thread-Id');
      if (threadIdHeader) setActiveThreadId(threadIdHeader);
      var runIdHeader = response.headers.get('X-Run-Id');
      state.activeRunId = runIdHeader || null;
      if (state.activeThreadId && state.view !== 'chat') state.view = 'chat';
      var ttlHeader = document.getElementById('threadTitleDisplay');
      if (state.activeThreadId && ttlHeader && !ttlHeader.textContent) {
        ttlHeader.textContent = text.substring(0, 60);
      }

      // Create streaming response container
      streamingContainer = appendStreamingContainer(messagesEl);
      toolsContainer = streamingContainer.querySelector('.tools-container');
      streamingText = streamingContainer.querySelector('.streaming-text');

      // Read the SSE stream
      streamReader = response.body.getReader();
      var streamCtx = {
        streamSession: streamSession,
        get eventsReceived() { return eventsReceived; },
        set eventsReceived(v) { eventsReceived = v; },
        streamingText: streamingText,
        toolsContainer: toolsContainer,
        get accumulatedText() { return accumulatedText; },
        set accumulatedText(v) { accumulatedText = v; },
        activeTools: activeTools,
        get browserAckEl() { return browserAckEl; },
        set browserAckEl(v) { browserAckEl = v; },
        get browserProgressEl() { return browserProgressEl; },
        set browserProgressEl(v) { browserProgressEl = v; },
        get researchProgressEl() { return researchProgressEl; },
        set researchProgressEl(v) { researchProgressEl = v; },
      };
      await consumeSSEStream(streamReader, streamCtx);

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
        finalizeStreamingMarkdown({ streamingText: streamingText, accumulatedText: accumulatedText }, true);
      }

    } catch(err) {
      showThinking(false);
      // On a network drop (app backgrounded, phone sleep, flaky connection) the
      // run keeps going on the backend. Auto-resume from the buffered events
      // instead of showing a misleading "Connection lost" error.
      var isAbort = err && err.name === 'AbortError';
      var canResume = !isAbort && state.activeRunId && state.loading;
      if (canResume && streamingContainer) {
        // Kill the dropped connection's reader and start a fresh session so two
        // SSE loops never append into the same buffer concurrently.
        invalidateStreamSession(streamSession);
        await cancelStreamReader(streamReader);
        streamSession = beginStreamSession();

        // Show reconnecting status so user knows something is happening
        var reconnecting = document.createElement('div');
        reconnecting.className = 'reconnecting-status';
        reconnecting.textContent = 'Reconnecting…';
        messagesEl.appendChild(reconnecting);

        var resumeCtx = {
          streamSession: streamSession,
          get eventsReceived() { return eventsReceived; },
          set eventsReceived(v) { eventsReceived = v; },
          streamingText: streamingText,
          toolsContainer: toolsContainer,
          get accumulatedText() { return accumulatedText; },
          set accumulatedText(v) { accumulatedText = v; },
          activeTools: activeTools,
          get browserAckEl() { return browserAckEl; },
          set browserAckEl(v) { browserAckEl = v; },
          get browserProgressEl() { return browserProgressEl; },
          set browserProgressEl(v) { browserProgressEl = v; },
          get researchProgressEl() { return researchProgressEl; },
          set researchProgressEl(v) { researchProgressEl = v; },
        };

        // Wait for the PWA/tab to be visible before retrying — mobile browsers
        // suspend SSE connections when backgrounded, so retrying while hidden
        // always fails. We wait up to 30s for visibility, then retry.
        var visWait = new Promise(function(resolve) {
          if (document.visibilityState !== 'hidden') { resolve(); return; }
          function onVisible() {
            if (document.visibilityState !== 'hidden') {
              document.removeEventListener('visibilitychange', onVisible);
              resolve();
            }
          }
          document.addEventListener('visibilitychange', onVisible);
          setTimeout(resolve, 30000); // fallback — don't wait forever
        });
        await visWait;

        // Retry resume up to 4 times with exponential backoff (1s, 2s, 4s, 8s)
        var resumeOk = false;
        for (var retry = 0; retry < 4; retry++) {
          if (retry > 0) await new Promise(function(r) { setTimeout(r, 1000 * Math.pow(2, retry - 1)); });
          var ok = await attemptResume(streamingContainer, resumeCtx, eventsReceived);
          if (ok) { resumeOk = true; break; }
        }

        reconnecting.remove();
        if (!resumeOk) {
          if (streamingContainer) streamingContainer.remove();
          addMessage('assistant', 'Connection lost. Check your network and try again.', 'error');
        }
      } else {
        if (streamingContainer) streamingContainer.remove();
        if (!isAbort) {
          addMessage('assistant', 'Connection lost. Check your network and try again.', 'error');
        }
      }
    }
    state.loading = false;
    state.activeRunId = null;
    state.abortController = null;
    updateSendBtn();
    if (input) input.focus();
  }

  function beginStreamSession() {
    state.streamSession = (state.streamSession || 0) + 1;
    return state.streamSession;
  }

  function invalidateStreamSession(sessionId) {
    if (state.streamSession === sessionId) {
      state.streamSession = (state.streamSession || 0) + 1;
    }
  }

  function isActiveStreamSession(sessionId) {
    return sessionId == null || sessionId === state.streamSession;
  }

  async function cancelStreamReader(reader) {
    if (!reader) return;
    try { await reader.cancel(); } catch (e) { /* already closed */ }
  }

  // Single resume attempt — returns true if it succeeded, false if not.
  // Uses the event cursor (?from=) so it only gets unseen events.
  async function attemptResume(streamingContainer, ctx, fromEvent) {
    try {
      var from = (typeof fromEvent === 'number' && fromEvent >= 0) ? fromEvent : (ctx.eventsReceived || 0);
      var resumeUrl = API + '/chat/runs/' + encodeURIComponent(state.activeRunId) + '/resume?from=' + from;
      var res = await fetch(resumeUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (state.session.sessionId || state.session.token)
        }
      });
      if (!res.ok || !res.headers.get('content-type') || res.headers.get('content-type').indexOf('text/event-stream') === -1) {
        return false;
      }
      var reader = res.body.getReader();
      await consumeSSEStream(reader, ctx);
      showThinking(false);
      if (ctx.streamingText && ctx.accumulatedText) {
        finalizeStreamingMarkdown(ctx, true);
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  // Consume an SSE reader and dispatch events into the given context. Shared by
  // the original /chat/stream response and the /resume response.
  async function consumeSSEStream(reader, ctx) {
    var decoder = new TextDecoder();
    var buffer = '';
    var sessionId = ctx.streamSession;
    try {
      while (true) {
        if (!isActiveStreamSession(sessionId)) break;
        var result = await reader.read();
        if (result.done) break;
        buffer += decoder.decode(result.value, { stream: true });
        var lines = buffer.split('\\n');
        buffer = lines.pop() || '';
        for (var i = 0; i < lines.length; i++) {
          if (!isActiveStreamSession(sessionId)) break;
          var line = lines[i].trim();
          if (line.startsWith('event: ')) {
            var eventType = line.substring(7);
            var dataLine = lines[++i] || '';
            if (dataLine.startsWith('data: ')) {
              try {
                var eventData = JSON.parse(dataLine.substring(6));
                ctx.eventsReceived = (ctx.eventsReceived || 0) + 1;
                handleSSEEvent(eventType, eventData, {
                  streamSession: sessionId,
                  streamingText: ctx.streamingText,
                  toolsContainer: ctx.toolsContainer,
                  get accumulatedText() { return ctx.accumulatedText; },
                  set accumulatedText(v) { ctx.accumulatedText = v; },
                  activeTools: ctx.activeTools,
                  get browserAckEl() { return ctx.browserAckEl; },
                  set browserAckEl(v) { ctx.browserAckEl = v; },
                  get browserProgressEl() { return ctx.browserProgressEl; },
                  set browserProgressEl(v) { ctx.browserProgressEl = v; },
                  get researchProgressEl() { return ctx.researchProgressEl; },
                  set researchProgressEl(v) { ctx.researchProgressEl = v; },
                });
              } catch (parseErr) {
                console.error('SSE parse error:', parseErr);
              }
            }
          }
        }
        scrollToBottom();
      }
    } finally {
      await cancelStreamReader(reader);
    }
  }

  // Resume an in-flight (or just-completed) run after the connection dropped.
  // Uses an event cursor so only unseen events are delivered — never replays
  // chunks the client already rendered (which caused doubled/garbled text).
  async function resumeStream(streamingContainer, ctx, fromEvent) {
    if (!state.activeRunId || state.resumeInProgress) return;
    state.resumeInProgress = true;
    try {
      var from = (typeof fromEvent === 'number' && fromEvent >= 0) ? fromEvent : (ctx.eventsReceived || 0);
      var resumeUrl = API + '/chat/runs/' + encodeURIComponent(state.activeRunId) + '/resume?from=' + from;
      var res = await fetch(resumeUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (state.session.sessionId || state.session.token)
        }
      });
      if (!res.ok || !res.headers.get('content-type') || res.headers.get('content-type').indexOf('text/event-stream') === -1) {
        // Resume endpoint returned an error (run gone / not owned). Fall back to
        // the friendly message so the user knows to retry.
        if (streamingContainer) streamingContainer.remove();
        addMessage('assistant', 'Connection lost. Your request may still be processing — refresh the thread in a moment.', 'error');
        return;
      }
      var reader = res.body.getReader();
      await consumeSSEStream(reader, ctx);
      showThinking(false);
      // Finalize the rendered text once the resumed stream ends.
      if (ctx.streamingText && ctx.accumulatedText) {
        finalizeStreamingMarkdown(ctx, true);
      }
      // Clean up reconnecting status on successful resume
      var messagesEl = document.getElementById('messages');
      if (messagesEl) {
        var rc = messagesEl.querySelector('.reconnecting-status');
        if (rc) rc.remove();
      }
    } catch (resumeErr) {
      // Resume itself dropped (e.g. slept again). Leave the partial text in
      // place; the run is still going on the backend and the user can reopen
      // the thread to resume once more.
      console.warn('resume failed:', resumeErr && resumeErr.message);
    } finally {
      state.resumeInProgress = false;
    }
  }

  // Handle individual SSE events
  function handleSSEEvent(eventType, data, ctx) {
    if (!isActiveStreamSession(ctx.streamSession)) return;
    if (data && data.threadId) setActiveThreadId(data.threadId);
    switch (eventType) {
      case 'thinking':
        showThinking(true);
        break;

      case 'browser_ack':
        showThinking(false);
        if (ctx.toolsContainer && data.message) {
          // Remove any stale progress indicator from a prior ack in the same turn
          var oldAck = ctx.toolsContainer.querySelector('.browser-ack');
          if (oldAck) oldAck.remove();
          ctx.browserAckEl = document.createElement('div');
          ctx.browserAckEl.className = 'browser-ack';
          ctx.browserAckEl.innerHTML =
            '<span class="browser-ack-icon">🌐</span>' +
            '<div class="browser-ack-body">' +
              '<span class="browser-ack-msg">' + escapeHtml(data.message) + '</span>' +
              (data.startedAt ? '<span class="browser-ack-time">Started at ' + escapeHtml(data.startedAt) + '</span>' : '') +
            '</div>';
          ctx.toolsContainer.appendChild(ctx.browserAckEl);
          // Reuse ctx.browserProgressEl slot for live updates
          ctx.browserProgressEl = null;
          scrollToBottom();
        }
        break;

      case 'browser_progress':
        showThinking(false);
        if (ctx.toolsContainer && data.message) {
          if (ctx.browserProgressEl) {
            // Update existing progress element in-place (avoids DOM churn)
            var msgSpan = ctx.browserProgressEl.querySelector('.browser-progress-msg');
            if (msgSpan) msgSpan.textContent = data.message;
          } else {
            ctx.browserProgressEl = document.createElement('div');
            ctx.browserProgressEl.className = 'browser-progress';
            ctx.browserProgressEl.innerHTML =
              '<div class="browser-progress-dots"><span></span><span></span><span></span></div>' +
              '<span class="browser-progress-msg">' + escapeHtml(data.message) + '</span>';
            ctx.toolsContainer.appendChild(ctx.browserProgressEl);
          }
          scrollToBottom();
        }
        break;

      case 'research_ack':
        showThinking(false);
        if (ctx.toolsContainer && data.message) {
          var researchEl = document.createElement('div');
          researchEl.className = 'research-ack';
          researchEl.textContent = data.message;
          ctx.toolsContainer.appendChild(researchEl);
          scrollToBottom();
        }
        break;

      case 'research_progress':
        showThinking(false);
        if (ctx.toolsContainer && data.message) {
          if (ctx.researchProgressEl) {
            // Update existing progress element in-place (avoids DOM churn)
            var rMsgSpan = ctx.researchProgressEl.querySelector('.research-progress-msg');
            if (rMsgSpan) rMsgSpan.textContent = data.message;
          } else {
            ctx.researchProgressEl = document.createElement('div');
            ctx.researchProgressEl.className = 'browser-progress research-progress';
            ctx.researchProgressEl.innerHTML =
              '<div class="browser-progress-dots"><span></span><span></span><span></span></div>' +
              '<span class="research-progress-msg">' + escapeHtml(data.message) + '</span>';
            ctx.toolsContainer.appendChild(ctx.researchProgressEl);
          }
          scrollToBottom();
        }
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
            var isError = isToolResultError(data.toolResult);
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
        // Clear browser and research progress indicators when the tool finishes
        if (ctx.browserProgressEl) { ctx.browserProgressEl.remove(); ctx.browserProgressEl = null; }
        if (ctx.browserAckEl) { ctx.browserAckEl.remove(); ctx.browserAckEl = null; }
        if (ctx.researchProgressEl) { ctx.researchProgressEl.remove(); ctx.researchProgressEl = null; }
        showThinking(false);
        break;

      case 'chunk':
        showThinking(false);
        if (data.text && ctx.streamingText) {
          var nextText = (ctx.accumulatedText || '') + data.text;
          ctx.accumulatedText = nextText;
          finalizeStreamingMarkdown(ctx, false);
          // No auto-scroll here — user controls scroll; streaming response grows in place
        }
        break;

      case 'done':
        showThinking(false);
        finalizeStreamingMarkdown(ctx, true);
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

  function isToolResultError(toolResult) {
    if (!toolResult) return false;
    return toolResult.startsWith('Error:') ||
      toolResult.startsWith('Gmail search error:') ||
      toolResult.startsWith('Gmail list error:') ||
      toolResult.startsWith('Gmail read error:') ||
      toolResult.startsWith('Gmail access denied') ||
      toolResult.indexOf('could not read message details') !== -1 ||
      toolResult.startsWith('Browser task failed') ||
      toolResult.startsWith('Browser task error') ||
      toolResult.startsWith('Browser status check error');
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
      'browser_task': 'Running Browser',
      'browser_task_status': 'Checking Browser Task',
      'vault_lookup': 'Checking Vault',
    };
    return nameMap[toolName] || toolName.replace(/_/g, ' ').replace(/\\b\\w/g, function(l) { return l.toUpperCase(); });
  }

  function addMessage(role, content, type) {
    var messagesEl = document.getElementById('messages');
    if (!messagesEl) return;
    if (role === 'user') {
      appendChatTurn(messagesEl, content);
      scrollToBottomForce();
    } else {
      appendAssistantBlock(messagesEl, content, type);
      scrollToBottom();
    }
  }

  var _userScrolled = false;

  function onChatScroll() {
    var area = document.getElementById('chatArea');
    if (!area) return;
    // If user scrolled up more than 60px from bottom, suppress auto-scroll
    _userScrolled = (area.scrollHeight - area.scrollTop - area.clientHeight) > 60;
  }

  function scrollToBottom() {
    if (_userScrolled) return;
    var area = document.getElementById('chatArea');
    if (area) requestAnimationFrame(function() { area.scrollTop = area.scrollHeight; });
  }

  function scrollToBottomForce() {
    var area = document.getElementById('chatArea');
    if (area) requestAnimationFrame(function() { area.scrollTop = area.scrollHeight; });
  }

  function showThinking(show) { var el = document.getElementById('thinking'); if (el) el.style.display = show ? 'block' : 'none'; if (show) scrollToBottom(); }
`}function lo(){return`  // ============================================================
  // THREAD MANAGEMENT
  // ============================================================

  async function startNewThread() {
    clearActiveThreadId();
    state.view = 'home';
    renderView();
    toggleOverlay(null);
  }

  function openThread(threadId) {
    if (threadContextMenuOpen) { hideThreadContextMenu(); return; }
    setActiveThreadId(threadId);
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
      var groups = { pinned: [], today: [], yesterday: [], older: [] };
      var telegramThread = null;
      for (var i = 0; i < state.threads.length; i++) {
        var t = state.threads[i];
        if (t.channel === 'telegram') {
          telegramThread = t;
        } else if (t.is_pinned) {
          groups.pinned.push(t);
        } else {
          var d = (t.updated_at || t.created_at || '').substring(0, 10);
          if (d === today) groups.today.push(t);
          else if (d === yesterday) groups.yesterday.push(t);
          else groups.older.push(t);
        }
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
      // Telegram thread — always pinned at top
      if (telegramThread && !state.selectMode) {
        html += '<div class="card-group"><div class="section-header section-header--accent">&#128204; Telegram</div>' + renderThreadGroup([telegramThread], true) + '</div>';
      }
      if (groups.pinned.length > 0 && !state.selectMode) { html += '<div class="card-group"><div class="section-header">&#128204; Pinned</div>' + renderThreadGroup(groups.pinned) + '</div>'; }
      if (groups.today.length > 0) { html += '<div class="card-group"><div class="section-header">Today</div>' + renderThreadGroup(groups.today) + '</div>'; }
      if (groups.yesterday.length > 0) { html += '<div class="card-group"><div class="section-header">Yesterday</div>' + renderThreadGroup(groups.yesterday) + '</div>'; }
      if (groups.older.length > 0) { html += '<div class="card-group"><div class="section-header">Older</div>' + renderThreadGroup(groups.older) + '</div>'; }
      if (!state.selectMode) {
        html += '<div style="padding:16px 14px;"><a href="#" onclick="loadArchivedThreads();return false;" style="color:var(--text-muted);font-size:12px;">View archived conversations</a></div>';
      }
      list.innerHTML = html;
    } catch(e) {
      list.innerHTML = '<div style="padding:16px;color:var(--danger);font-size:13px;">Error loading threads.</div>';
    }
  }

  function renderThreadGroup(threads, pinned) {
    var html = '';
    for (var i = 0; i < threads.length; i++) {
      var t = threads[i];
      var isActive = t.id === state.activeThreadId;
      var isChecked = !!state.selectedThreadIds[t.id];
      var rel = formatRelativeDate(t.updated_at);
      var msgCount = t.message_count || 0;
      var preview = t.last_message ? escapeHtml(t.last_message.substring(0, 60)) : '';
      var badgeText = msgCount + ' message' + (msgCount === 1 ? '' : 's');
      var isPinned = pinned || t.is_pinned;
      var pinnedClass = isPinned ? ' pinned' : '';
      var titleBadge = isPinned ? '<span class="thread-pinned-badge">&#128204;</span>' : '';
      if (state.selectMode) {
        html += '<div class="row thread-item' + (isChecked ? ' active' : '') + '" role="button" tabindex="0" data-id="' + t.id + '" onclick="toggleThreadSelect(' + t.id + ')" style="cursor:pointer;text-align:left;">';
        html += '<input type="checkbox" ' + (isChecked ? 'checked' : '') + ' onclick="event.stopPropagation();toggleThreadSelect(' + t.id + ')" style="width:18px;height:18px;flex-shrink:0;cursor:pointer;accent-color:var(--terracotta);margin-left:4px;">';
        html += '<span class="row-body">';
        html += '<span class="row-top"><span class="row-title">' + escapeHtml(t.title) + titleBadge + '</span><span class="row-time">' + escapeHtml(rel) + '</span></span>';
        if (preview) { html += '<span class="row-preview">' + preview + '</span>'; }
        html += '<span class="row-badge">' + badgeText + '</span>';
        html += '</span>';
        html += '<span class="row-chevron">&#8250;</span>';
        html += '</div>';
      } else {
        html += '<div class="row thread-item' + (isActive ? ' active' : '') + pinnedClass + '" role="button" tabindex="0" data-id="' + t.id + '" onclick="openThread(' + t.id + ')" oncontextmenu="event.preventDefault();showThreadContextMenu(' + t.id + ',null,event.clientX,event.clientY)">';
        html += '<span class="row-body">';
        html += '<span class="row-top"><span class="row-title">' + escapeHtml(t.title) + titleBadge + '</span><span class="row-time">' + escapeHtml(rel) + '</span></span>';
        if (preview) { html += '<span class="row-preview">' + preview + '</span>'; }
        html += '<span class="row-badge">' + badgeText + '</span>';
        html += '</span>';
        html += '<button class="thread-more-btn" onclick="event.stopPropagation();showThreadContextMenu(' + t.id + ',null,event.clientX,event.clientY)" title="More options">&#8942;</button>';
        html += '</div>';
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
    var html = '<div class="section-header">Archived</div><div class="card-group">';
    for (var i = 0; i < threads.length; i++) {
      var t = threads[i];
      var msgCount = t.message_count || 0;
      if (i > 0) { html += '<div class="row-divider"></div>'; }
      html += '<button class="row thread-item" onclick="unarchiveAndOpen(' + t.id + ')">';
      html += '<span class="row-body">';
      html += '<span class="row-top"><span class="row-title" style="color:var(--text-muted);">' + escapeHtml(t.title) + '</span></span>';
      html += '<span class="row-badge">' + msgCount + ' message' + (msgCount === 1 ? '' : 's') + '</span>';
      html += '</span>';
      html += '<span class="row-chevron">&#8250;</span>';
      html += '</button>';
    }
    html += '</div>';
    html += '<div style="padding:16px 14px;"><a href="#" onclick="loadThreadSidebar();return false;" style="color:var(--text-muted);font-size:12px;">\\u2190 Back to active</a></div>';
    list.innerHTML = html;
  }

  async function archiveThread(id) {
    await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_archived:true}) });
    if (state.activeThreadId === id) { clearActiveThreadId(); state.view = 'home'; renderView(); }
    loadThreadSidebar();
    showToast('Conversation archived', 'success');
  }

  async function unarchiveAndOpen(id) {
    await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_archived:false}) });
    openThread(id);
  }

  async function pinThread(id) {
    try {
      await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_pinned:true}) });
      loadThreadSidebar();
      showToast('Conversation pinned', 'success');
    } catch(e) {
      showToast('Failed to pin conversation', 'error');
    }
  }

  async function unpinThread(id) {
    try {
      await api('/chat/threads/' + id, { method:'PUT', body:JSON.stringify({is_pinned:false}) });
      loadThreadSidebar();
      showToast('Conversation unpinned', '');
    } catch(e) {
      showToast('Failed to unpin conversation', 'error');
    }
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
    if (state.activeThreadId === id) { clearActiveThreadId(); state.view = 'home'; renderView(); }
    loadThreadSidebar();
    showToast('Conversation deleted', '');
  }

  // ============================================================
  // THREAD CONTEXT MENU (long-press mobile / right-click desktop)
  // ============================================================
  var threadLongPressTimer = null;
  var threadLongPressItem = null;
  var threadContextMenuOpen = false;
  var threadContextMenuOpenTime = 0;

  function startThreadLongPress(item) {
    if (state.selectMode) return;
    threadLongPressItem = item;
    threadLongPressTimer = setTimeout(function() {
      threadLongPressTimer = null;
      threadLongPressItem = null;
      var id = parseInt(item.getAttribute('data-id'), 10);
      var title = item.querySelector('.row-title') ? item.querySelector('.row-title').textContent : '';
      showThreadContextMenu(id, title, null, null);
    }, 500);
  }

  function cancelThreadLongPress() {
    if (threadLongPressTimer) {
      clearTimeout(threadLongPressTimer);
      threadLongPressTimer = null;
    }
    threadLongPressItem = null;
  }

  window.showThreadContextMenu = function(threadId, title, clientX, clientY) {
    hideThreadContextMenu();
    var thread = state.threads.find(function(t) { return t.id === threadId; });
    var isPinned = thread && thread.is_pinned;
    var isTouch = clientX === null || clientY === null;

    var backdrop = document.createElement('div');
    backdrop.className = 'thread-context-menu-backdrop';
    backdrop.id = 'threadContextMenuBackdrop';
    backdrop.onclick = function() {
      if (Date.now() - threadContextMenuOpenTime < 350) return;
      hideThreadContextMenu();
    };

    var menu = document.createElement('div');
    menu.className = 'thread-context-menu';
    menu.id = 'threadContextMenu';

    if (isTouch) {
      menu.style.left = '50%';
      menu.style.top = '40%';
      menu.style.transform = 'translate(-50%, -50%)';
    } else {
      var x = clientX;
      var y = clientY;
      var w = window.innerWidth;
      var h = window.innerHeight;
      var menuW = 200;
      var menuH = 180;
      if (x + menuW > w - 8) x = w - menuW - 8;
      if (y + menuH > h - 8) y = h - menuH - 8;
      menu.style.left = x + 'px';
      menu.style.top = y + 'px';
      menu.style.transform = 'none';
    }

    var titleEl = document.createElement('div');
    titleEl.className = 'thread-context-menu-title';
    titleEl.textContent = title || (thread && thread.title) || 'Conversation';
    menu.appendChild(titleEl);

    function makeItem(label, action, danger) {
      var btn = document.createElement('button');
      btn.className = 'thread-context-menu-item' + (danger ? ' danger' : '');
      btn.textContent = label;
      btn.onclick = function() {
        // Ignore clicks that arrive immediately after the menu opens (finger-lift
        // from the long-press fires a synthetic click at the same touch position)
        if (Date.now() - threadContextMenuOpenTime < 350) return;
        hideThreadContextMenu();
        action();
      };
      return btn;
    }

    menu.appendChild(makeItem(isPinned ? 'Unpin' : 'Pin', function() {
      if (isPinned) unpinThread(threadId); else pinThread(threadId);
    }));
    menu.appendChild(makeItem('Archive', function() {
      archiveThread(threadId);
    }));
    menu.appendChild(makeItem('Delete', function() {
      deleteThread(threadId);
    }, true));

    document.body.appendChild(backdrop);
    document.body.appendChild(menu);
    threadContextMenuOpen = true;
    threadContextMenuOpenTime = Date.now();
  };

  window.hideThreadContextMenu = function() {
    var backdrop = document.getElementById('threadContextMenuBackdrop');
    var menu = document.getElementById('threadContextMenu');
    if (backdrop) backdrop.remove();
    if (menu) menu.remove();
    threadContextMenuOpen = false;
  };

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
        if (state.activeThreadId === id) { clearActiveThreadId(); state.view = 'home'; renderView(); }
      } catch (e) { failed++; }
    }
    state.selectedThreadIds = {};
    state.selectMode = false;
    loadThreadSidebar();
    showToast(failed === 0 ? (ids.length + ' conversations deleted') : (ids.length - failed + ' deleted, ' + failed + ' failed'), failed === 0 ? '' : 'error');
  };

  function formatRelativeDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr.replace(' ', 'T') + 'Z');
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
    hideThreadContextMenu();
    if (id) {
      var overlay = document.getElementById(id);
      if (overlay) overlay.classList.add('active');
      if (id === 'threadsOverlay') loadThreadSidebar();
    }
  }
`}function uo(){return`  // ============================================================
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

  function renderScheduleBadge(scheduleType) {
    if (!scheduleType) return '';
    var text, cls;
    if (scheduleType === 'once') { text = '✓ Once'; cls = 'once'; }
    else if (scheduleType === 'daily') { text = '📅 Daily'; cls = 'recurring'; }
    else if (scheduleType === 'weekly') { text = '📅 Weekly'; cls = 'recurring'; }
    else { text = '⏱ Repeating'; cls = 'recurring'; }
    return '<span class="notif-schedule-badge ' + cls + '">' + text + '</span>';
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
        html += '<div class="notif-item-title">' + typeIcon + ' ' + escapeHtml(n.title) + renderScheduleBadge(n.schedule_type) + '</div>';
        if (n.body) { var plain = mdToPlain(n.body); html += '<div class="notif-item-body">' + escapeHtml(plain.length > 200 ? plain.substring(0, 200) + '…' : plain) + '</div>'; }
        html += '<div class="notif-item-time">' + formatRelativeDate(n.created_at) + '</div>';
        html += '<div class="notif-actions">';
        html += '<button class="notif-action-btn seen" onclick="notifSeen(' + n.id + ')">Seen</button>';
        html += '<button class="notif-action-btn" onclick="notifSnoozeMenu(' + n.id + ',event)">Snooze ▾</button>';
        var st = n.schedule_type ? n.schedule_type : '';
        html += '<button class="notif-action-btn done" onclick="notifDone(' + n.id + ',\\'' + st + '\\')">Done</button>';
        html += '</div>';
        html += '</div>';
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
      state.view = 'chat';
      renderView();
    }
    toggleOverlay('threadsOverlay');
  }

  // === Notification Action Handlers ===
  async function notifSeen(id) { await api('/chat/notifications/' + id, { method: 'DELETE' }); loadNotifications(); loadNotificationCount(); }
  function notifSnoozeMenu(id, event) {
    event.stopPropagation();
    document.querySelectorAll('.notif-snooze-menu').forEach(function(m) { m.remove(); });
    var menu = document.createElement('div');
    menu.className = 'notif-snooze-menu';
    menu.innerHTML =
      '<button onclick="notifSnooze(' + id + ',\\'10m\\')">10 minutes</button>' +
      '<button onclick="notifSnooze(' + id + ',\\'1h\\')">1 hour</button>' +
      '<button onclick="notifSnooze(' + id + ',\\'tomorrow\\')">Tomorrow 9 AM</button>';
    var btn = event.currentTarget;
    var rect = btn.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.top = (rect.bottom + 4) + 'px';
    menu.style.left = rect.left + 'px';
    document.body.appendChild(menu);
    setTimeout(function() {
      var close = function(e) { if (!menu.contains(e.target)) { menu.remove(); document.removeEventListener('click', close); } };
      document.addEventListener('click', close);
    }, 0);
  }
  async function notifSnooze(id, when) {
    document.querySelectorAll('.notif-snooze-menu').forEach(function(m) { m.remove(); });
    var body = when === '10m' ? JSON.stringify({ minutes: 10 }) : when === '1h' ? JSON.stringify({ minutes: 60 }) : JSON.stringify({ until: 'tomorrow_morning' });
    var label = when === '10m' ? '10 minutes' : when === '1h' ? '1 hour' : 'tomorrow 9 AM';
    await api('/notifications/' + id + '/snooze', { method: 'POST', body: body });
    loadNotifications(); loadNotificationCount();
    showToast('Snoozed until ' + label, 'success');
  }
  async function notifDone(id, scheduleType) {
    if (scheduleType && scheduleType !== 'once') {
      var label = scheduleType === 'daily' ? 'daily' : scheduleType === 'weekly' ? 'weekly' : 'recurring';
      if (!window.confirm('This will stop the ' + label + ' reminder. Continue?')) return;
    }
    await api('/notifications/' + id + '/done', { method: 'PUT' });
    loadNotifications(); loadNotificationCount();
  }

  // === Message Action Handlers ===
  function maCopy(btn) { var text = btn.getAttribute('data-content'); navigator.clipboard.writeText(text).then(function() { showToast('Copied', 'success'); }); }
  function maSaveDoc(btn) { var text = btn.getAttribute('data-content'); handleSendFromAction('Save your previous answer to a Google Doc: ' + text.substring(0, 500)); }
  function maEmail(btn) { var text = btn.getAttribute('data-content'); handleSendFromAction('Email this: ' + text.substring(0, 500)); }
  function maTask(btn) { var text = btn.getAttribute('data-content'); handleSendFromAction('Turn this into a task: ' + text.substring(0, 500)); }
  function maRemember(btn) { var text = btn.getAttribute('data-content'); handleSendFromAction('Remember this: ' + text.substring(0, 500)); }
  function maReminder(btn) { var text = btn.getAttribute('data-content'); handleSendFromAction('Create a reminder from this: ' + text.substring(0, 500)); }
  function maShorter(btn) { handleSendFromAction('Make your previous answer shorter.'); }
  function maDetailed(btn) { handleSendFromAction('Make your previous answer more detailed.'); }
  function handleSendFromAction(text) {
    if (state.view !== 'chat') { startNewThread(); }
    setTimeout(function() {
      var input = document.getElementById('inputField');
      if (input) { input.value = text; handleSend(); }
    }, 300);
  }
`}function mo(){return`  // === Memory Review ===
  async function renderMemoryReview(container) {
    container.innerHTML = '<div class="chat-area"><div class="memory-review-page" id="mrContent"><div class="ac-empty">Loading Memory...</div></div></div>';
    try {
      var data = await api('/memory/review?limit=100');
      var el = document.getElementById('mrContent');
      if (!el) return;
      var html = '<div class="page-header">' +
        '<button class="page-back-btn" onclick="state.view=\\'home\\';renderView();">&#8592;</button>' +
        '<h1 class="page-title">Memory Review</h1>' +
        '<button class="btn-small" id="mrMigrateBtn" onclick="mrMigrateDocuments()" title="Find memory entries that are too large or contain document bodies, and move them to Document Library" style="background:var(--terracotta);color:var(--text-on-accent);border:none;padding:8px 16px;font-size:11px;border-radius:var(--r-pill);min-height:36px;cursor:pointer;font-weight:600;width:auto;display:inline-flex;align-items:center;justify-content:center;gap:4px;">Sort &amp; Migrate</button>' +
      '</div>';
      // Info banner explaining what Memory Review is
      html += '<div style="font-size:12px;color:var(--text-muted);padding:10px 14px;margin-bottom:12px;background:var(--bg-glass);border-radius:6px;border:1px solid var(--border-glass);line-height:1.7;">';
      html += '<strong>What belongs here:</strong> Your preferences, habits, facts, standing instructions, and decisions Karna learned about you.<br>';
      html += '&bull; <strong>Working tier</strong> (importance ≥7) — loaded automatically into <em>every</em> chat. Put your most important preferences here.<br>';
      html += '&bull; <strong>Long-term tier</strong> — stored permanently, searched when relevant.<br>';
      html += '<strong>What does NOT belong here:</strong> Timed reminders (those are scheduled crons). Full documents or essays (those go in Document Library). ' +
        'Entries of type <em>task</em> are standing follow-up notes stored by Karna, not the same as calendar reminders.<br>';
      html += '<span style="color:var(--accent-gold);">&#128196;</span> Use <strong>Sort &amp; Migrate</strong> to move any bulky document bodies from Memory into Document Library automatically.';
      html += '</div>';
      html += '<input type="text" class="mr-search" id="mrSearch" placeholder="Search memory..." oninput="mrDoSearch()">';
      html += '<div class="mr-filters">';
      html += '<button class="mr-filter-btn ' + (state.memoryReviewFilter === 'all' ? 'active' : '') + '" onclick="mrSetFilter(\\'all\\')">All</button>';
      html += '<button class="mr-filter-btn ' + (state.memoryReviewFilter === 'working' ? 'active' : '') + '" onclick="mrSetFilter(\\'working\\')">Working</button>';
      html += '<button class="mr-filter-btn ' + (state.memoryReviewFilter === 'long_term' ? 'active' : '') + '" onclick="mrSetFilter(\\'long_term\\')">Long-term</button>';
      html += '</div>';
      // Type filter buttons
      html += '<div class="mr-filters" style="margin-top:4px;">';
      html += '<button class="mr-filter-btn ' + (state.memoryTypeFilter === 'all' || !state.memoryTypeFilter ? 'active' : '') + '" onclick="mrSetTypeFilter(\\'all\\')">All Types</button>';
      html += '<button class="mr-filter-btn ' + (state.memoryTypeFilter === 'preference' ? 'active' : '') + '" onclick="mrSetTypeFilter(\\'preference\\')">Preferences</button>';
      html += '<button class="mr-filter-btn ' + (state.memoryTypeFilter === 'task' ? 'active' : '') + '" onclick="mrSetTypeFilter(\\'task\\')">Tasks</button>';
      html += '<button class="mr-filter-btn ' + (state.memoryTypeFilter === 'fact' ? 'active' : '') + '" onclick="mrSetTypeFilter(\\'fact\\')">Facts</button>';
      html += '<button class="mr-filter-btn ' + (state.memoryTypeFilter === 'decision' ? 'active' : '') + '" onclick="mrSetTypeFilter(\\'decision\\')">Decisions</button>';
      html += '</div>';
      var memories = data.memories || [];
      var filteredCount = 0;
      for (var i = 0; i < memories.length; i++) {
        var m = memories[i];
        if (state.memoryReviewFilter !== 'all' && m.tier !== state.memoryReviewFilter) continue;
        if (state.memoryTypeFilter && state.memoryTypeFilter !== 'all' && m.type !== state.memoryTypeFilter) continue;
        if (state.memoryReviewSearch && !((m.title + ' ' + m.content).toLowerCase().includes(state.memoryReviewSearch.toLowerCase()))) continue;
        filteredCount++;
        html += '<div class="memory-card">';
        html += '<div class="memory-card-header"><div class="memory-card-title">' + escapeHtml(m.title) + '</div><div style="display:flex;gap:6px;align-items:center;"><span style="font-size:11px;color:var(--text-muted);">' + (m.type || '') + '</span><div class="memory-card-tier">' + m.tier + '</div></div></div>';
        html += '<div class="memory-card-body">' + escapeHtml(m.content.substring(0, 300)) + (m.content.length > 300 ? '...' : '') + '</div>';
        html += '<div class="memory-card-actions">';
        if (m.tier === 'long_term') html += '<button class="ac-btn" onclick="mrPromote(' + m.id + ')">Promote</button>';
        if (m.tier === 'working') html += '<button class="ac-btn" onclick="mrDemote(' + m.id + ')">Archive</button>';
        html += '<button class="ac-btn danger" onclick="mrDelete(' + m.id + ')">Forget</button>';
        html += '</div></div>';
      }
      if (filteredCount === 0) {
        html += '<div class="ac-empty">No memories match your filter.</div>';
      }
      var sugData = await api('/memory/suggestions?limit=20');
      if (sugData.suggestions && sugData.suggestions.length > 0) {
        html += '<div class="ac-section-title">Suggestions (' + sugData.suggestions.length + ')</div>';
        html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">New memories from recent conversations awaiting your approval.</div>';
        for (var j = 0; j < sugData.suggestions.length; j++) {
          var s = sugData.suggestions[j];
          html += '<div class="suggestion-card pending">';
          html += '<div class="memory-card-header"><div class="memory-card-title">' + escapeHtml(s.title) + '</div><span style="font-size:11px;color:var(--text-muted);">' + (s.type || '') + '</span></div>';
          html += '<div class="memory-card-body">' + escapeHtml(s.content.substring(0, 300)) + '</div>';
          html += '<div class="memory-card-actions">';
          html += '<button class="ac-btn primary" onclick="mrAcceptSuggestion(' + s.id + ')">Accept</button>';
          html += '<button class="ac-btn danger" onclick="mrRejectSuggestion(' + s.id + ')">Reject</button>';
          html += '</div></div>';
        }
      }
      el.innerHTML = html;
    } catch(err) {
      var el2 = document.getElementById('mrContent');
      if (el2) el2.innerHTML = '<div class="ac-empty">Could not load memory.</div>';
    }
  }
  function mrSetTypeFilter(f) { state.memoryTypeFilter = f; renderMemoryReview(document.querySelector('.chat-area')); }
  function mrSetFilter(f) { state.memoryReviewFilter = f; renderMemoryReview(document.querySelector('.chat-area')); }
  function mrDoSearch() { state.memoryReviewSearch = document.getElementById('mrSearch').value; renderMemoryReview(document.querySelector('.chat-area')); }
  async function mrPromote(id) { await api('/memory/review/' + id + '/promote', { method: 'POST' }); renderMemoryReview(document.querySelector('.chat-area')); }
  async function mrDemote(id) { await api('/memory/review/' + id + '/demote', { method: 'POST' }); renderMemoryReview(document.querySelector('.chat-area')); }
  async function mrDelete(id) { if (confirm('Forget this memory?')) { await api('/memory/review/' + id, { method: 'DELETE' }); renderMemoryReview(document.querySelector('.chat-area')); } }
  async function mrAcceptSuggestion(id) { await api('/memory/suggestions/' + id + '/accept', { method: 'POST' }); renderMemoryReview(document.querySelector('.chat-area')); }
  async function mrRejectSuggestion(id) { await api('/memory/suggestions/' + id + '/reject', { method: 'POST' }); renderMemoryReview(document.querySelector('.chat-area')); }
  async function mrMigrateDocuments() {
    var btn = document.getElementById('mrMigrateBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Migrating...'; }
    try {
      var result = await api('/memory/migrate-documents-out', { method: 'POST' });
      var msg = result.message || ('Migrated: ' + result.migrated + ', Skipped: ' + result.skipped);
      if (result.samples && result.samples.length > 0) {
        msg += '\\n\\nMoved entries:\\n' + result.samples.map(function(s) { return '• ' + s.title; }).join('\\n');
      }
      showToast(msg, result.migrated > 0 ? 'success' : 'info');
      renderMemoryReview(document.querySelector('.chat-area'));
    } catch(e) {
      showToast('Migration failed. Try again.', 'error');
      if (btn) { btn.disabled = false; btn.textContent = 'Sort & Migrate'; }
    }
  }
`}function po(){return`  // === Document Library ===
  async function renderDocumentLibrary(container) {
    container.innerHTML = '<div class="chat-area"><div class="doclib-page" id="dlContent"><div class="ac-empty">Loading Documents...</div></div></div>';
    try {
      var data = await api('/documents');
      var el = document.getElementById('dlContent');
      if (!el) return;
      var html = '<div class="page-header">' +
        '<button class="page-back-btn" onclick="state.view=\\'home\\';renderView();">&#8592;</button>' +
        '<h1 class="page-title">Document Library</h1>' +
      '</div>';
      html += '<div class="doclib-list">';
      if (data.documents && data.documents.length > 0) {
        for (var i = 0; i < data.documents.length; i++) {
          var d = data.documents[i];
          html += '<div class="doclib-card">';
          html += '<div class="doclib-icon">&#128196;</div>';
          html += '<div class="doclib-info">';
          html += '<div class="doclib-name">' + escapeHtml(d.name) + ' <span class="status-badge ' + d.status + '">' + d.status + '</span></div>';
          html += '<div class="doclib-meta">' + (d.source || 'upload') + (d.size ? ' • ' + Math.round(d.size/1024) + ' KB' : '') + '</div>';
          if (d.summary) html += '<div class="doclib-summary">' + escapeHtml(d.summary) + '</div>';
          html += '<div class="doclib-actions">';
          html += '<button class="ac-btn" onclick="dlAskChat(' + d.id + ')">Ask in chat</button>';
          if (d.status !== 'summarized') html += '<button class="ac-btn primary" onclick="dlSummarize(' + d.id + ')">Summarize</button>';
          html += '<button class="ac-btn danger" onclick="dlDelete(' + d.id + ')">Delete</button>';
          html += '</div></div></div>';
        }
      } else {
        html += '<div class="ac-empty">No documents yet. Upload files in chat to see them here.</div>';
      }
      html += '</div>';
      el.innerHTML = html;
    } catch(err) {
      var el2 = document.getElementById('dlContent');
      if (el2) el2.innerHTML = '<div class="ac-empty">Could not load documents.</div>';
    }
  }
  async function dlSummarize(id) { await api('/documents/' + id + '/summarize', { method: 'POST' }); renderDocumentLibrary(document.querySelector('.chat-area')); showToast('Summarizing...', 'success'); }
  async function dlDelete(id) { if (confirm('Delete this document?')) { await api('/documents/' + id, { method: 'DELETE' }); renderDocumentLibrary(document.querySelector('.chat-area')); } }
  function dlAskChat(id) { startNewThread(); setTimeout(function() { var input = document.getElementById('inputField'); if (input) { input.value = 'Tell me about document ' + id; input.focus(); } }, 300); }

  async function loadAssistantName() {
    try {
      var data = await api('/settings/profile');
      if (!data || data.error) return;
      applyAssistantName(data.assistant_name || 'Karna');
      var el = document.getElementById('assistantNameDisplay');
      if (el) el.textContent = state.assistantName.toUpperCase();
    } catch (e) {
      console.error('loadAssistantName:', e);
    }
  }
`}function ho(){return`  // ============================================================
  // SETTINGS PANEL
  // ============================================================

  // ============================================================
  // SETTINGS VIEW — Full-page, replaces overlay
  // ============================================================

  function settingsRow(icon, label, section) {
    return '<button class="settings-row" onclick="openSection(' + "'" + section + "'" + ')">' +
      '<span class="settings-row-icon-well">' + icon + '</span>' +
      '<span class="settings-row-label">' + label + '</span>' +
      '<span class="settings-row-chevron">&#8250;</span>' +
    '</button>';
  }

  function settingsRowLink(icon, label, action) {
    return '<button class="settings-row" onclick="' + action + '">' +
      '<span class="settings-row-icon-well">' + icon + '</span>' +
      '<span class="settings-row-label">' + label + ' <span class="ext">&#8599;</span></span>' +
      '<span class="settings-row-chevron">&#8250;</span>' +
    '</button>';
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
      { icon: '📄', label: 'Digests', section: 'digests' },
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
    telegram: 'Telegram', digests: 'Digests',
    schedules: 'Scheduled Tasks', health: 'Health', errors: 'Errors',
  };

  async function renderSettingsView(container) {
    var isDesktop = window.innerWidth >= 900;
    var section = state.settingsSection;

    // Helper: render section content into a target element
    async function renderSectionContent(target, sec) {
      removeGoogleBanner();
      try {
        switch (sec) {
          case 'profile': return await renderProfileTab(target);
          case 'credentials': return await renderCredentialsTab(target);
          case 'telegram': return await renderTelegramTab(target);
          case 'digests': await renderDigestConfigTab(target); return bindDigestConfigToggles();
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
            navHtml += '<div class="settings-nav-item" onclick="state.view=\\'skills\\';renderView();">' +
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
          '<h1 class="page-title">Settings</h1>' +
        '</div>' +
        '<p class="page-header-subtitle">Manage your account &amp; workspace</p>' +
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
            '<h1 class="page-title">Settings</h1>' +
          '</div>' +
          '<p class="page-header-subtitle">Manage your account &amp; workspace</p>' +
          '<div class="settings-list">';
        for (var g = 0; g < settingsSections.length; g++) {
          var grp2 = settingsSections[g];
          listHtml += '<div class="settings-section">' +
            '<div class="settings-section-header">' + grp2.group + '</div>' +
            '<div class="settings-card">';
          for (var i = 0; i < grp2.items.length; i++) {
            if (i > 0) listHtml += '<div class="settings-divider"></div>';
            var item2 = grp2.items[i];
            if (item2.section === '_skills_link') {
              listHtml += settingsRowLink(item2.icon, item2.label, 'state.view=\\'skills\\';renderView()');
            } else {
              listHtml += settingsRow(item2.icon, item2.label, item2.section);
            }
          }
          listHtml += '</div></div>';
        }
        listHtml += '</div></div>';
        container.innerHTML = listHtml;
      } else {
        // Sub-page
        var label = sectionLabels[section] || section;
        container.innerHTML = '<div class="page-view">' +
          '<div class="page-header">' +
            '<button class="page-back-btn page-back-btn--wide" onclick="openSection(null)">&#8592; Settings</button>' +
            '<h1 class="page-title">' + label + '</h1>' +
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
      '<div class="field"><label>Assistant Name</label><input type="text" id="profAssistantName" value="' + escapeHtml(data.assistant_name || 'Karna') + '" placeholder="What should your assistant be called?"><div style="font-size:11px;color:var(--text-muted);margin-top:4px;">The name your assistant uses.</div></div>' +
      '<div class="field"><label>Telegram Chat ID</label><input type="text" id="profTelegram" value="' + escapeHtml(data.telegram_chat_id || '') + '" placeholder="Your Telegram chat ID"><div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Get this by messaging @userinfobot on Telegram, or use /start with your bot.</div></div>' +
      '<div class="field"><label>Timezone</label><select id="profTimezone"><option value="Asia/Kolkata"' + (data.timezone==='Asia/Kolkata'?' selected':'') + '>Asia/Kolkata (IST)</option><option value="America/New_York"' + (data.timezone==='America/New_York'?' selected':'') + '>America/New_York (EST)</option><option value="Europe/London"' + (data.timezone==='Europe/London'?' selected':'') + '>Europe/London (GMT)</option><option value="UTC"' + (data.timezone==='UTC'?' selected':'') + '>UTC</option></select></div>' +
      '<div class="field">' +
        '<label>User Personality DNA</label>' +
        '<textarea id="profPersonality" rows="14" placeholder="How do you think, decide, create, resist, learn? What should your assistant push back on? What kind of being do you want this system to become?">' + escapeHtml(data.personality_prompt || '') + '</textarea>' +
        '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">' +
          'Your operating manual. Injected into every system prompt as <code>## Personality Instructions</code> ' +
          '(up to ~2000 tokens / ~8000 chars). Use it for tone, decision rules, blindspots, ' +
          'how you want to be challenged. Leave it short and lived-in rather than aspirational.' +
        '</div>' +
        '<div id="profPersonalityCount" style="font-size:11px;color:var(--text-muted);margin-top:2px;"></div>' +
      '</div>' +
      '<button class="btn" id="profSave">Save Profile</button><div id="profMsg" class="success-text"></div>' +
      '<div style="margin-top:24px;border-top:1px solid var(--border);padding-top:16px;"><button class="btn btn-danger btn-small" id="logoutBtn">Logout</button></div>';
    // Live char/token counter — warns before the truncation kicks in
    (function() {
      var ta = document.getElementById('profPersonality');
      var counter = document.getElementById('profPersonalityCount');
      if (!ta || !counter) return;
      var maxChars = 8000; // mirrors PERSONALITY_TOKEN_BUDGET (2000) * 4 chars/token
      function update() {
        var len = ta.value.length;
        var tokens = Math.ceil(len / 4);
        var overLimit = len > maxChars;
        counter.style.color = overLimit ? 'var(--danger)' : 'var(--text-muted)';
        counter.textContent = len + ' chars · ~' + tokens + ' tokens' + (overLimit ? ' · will be truncated on save' : '');
      }
      ta.addEventListener('input', update);
      update();
    })();
    document.getElementById('profSave').onclick = async function() {
      await api('/settings/profile', { method:'PUT', body:JSON.stringify({
        name: document.getElementById('profName').value.trim(),
        personality_prompt: document.getElementById('profPersonality').value,
        assistant_name: document.getElementById('profAssistantName').value.trim() || 'Karna',
        telegram_chat_id: document.getElementById('profTelegram').value.trim(),
        timezone: document.getElementById('profTimezone').value,
      })});
      document.getElementById('profMsg').textContent = 'Saved';
      var savedName = document.getElementById('profAssistantName').value.trim() || 'Karna';
      if (state.session && state.session.user) {
        state.session.user.assistant_name = savedName;
        try { localStorage.setItem('karna_session', JSON.stringify(state.session)); } catch(e) {}
      }
      applyAssistantName(savedName);
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
      { title:'NOTIFICATIONS', desc:'Push notifications via Ntfy. Create a topic at ntfy.sh or self-host.', items:[
        {key:'ntfy_url',label:'Ntfy Endpoint URL',placeholder:'https://ntfy.sh/your-topic-name'},
        {key:'ntfy_token',label:'Ntfy Token (optional)',placeholder:'tk_... (only for private topics)'}
      ]},
      { title:'RESEARCH', desc:'Tavily provides high-quality AI-optimized web search for Opus 4.8.', items:[
        {key:'tavily_api_key',label:'Tavily API Key',placeholder:'tvly-...'}
      ]},
      { title:'BROWSER AUTOMATION', desc:'Browser Use Cloud runs a real browser agent — fills forms, clicks, navigates any site. Get your API key at cloud.browser-use.com.', items:[
        {key:'browser_use_api_key',label:'Browser Use API Key',placeholder:'bu_...'}
      ]},
      { title:'UNIFIED DOCS', desc:'Connect Karna to your Unified Docs workspace (ash-doc.pages.dev). Get your API key from ash-doc.pages.dev/settings.', items:[
        {key:'unified-doc-management',label:'Unified Docs API Key',placeholder:'Paste your API key from ash-doc.pages.dev/settings'}
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
          html += '<input type="text" id="slotKey_' + slotKey + '" placeholder="' + (isSlotSet ? '\\u2022\\u2022\\u2022 (enter new to update)' : 'Paste API key...') + '" class="' + (isSlotSet ? 'cred-configured' : '') + '" style="flex:1;min-width:150px;background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:10px;border-radius:6px;font-size:14px;font-family:var(--font-mono);outline:none;">';
          html += '</div>';
          // Row 2: Model override (optional)
          html += '<div style="margin-top:6px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">';
          html += '<input type="text" id="slotModel_' + slotKey + '" placeholder="Model (optional — uses default if blank)" style="flex:1;background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:8px 10px;border-radius:6px;font-size:12px;font-family:var(--font-mono);outline:none;">';
          html += '<button class="btn btn-small" onclick="saveLLMSlot(\\'' + slotKey + '\\')">\\u2713 Save</button>';
          if (isSlotSet) {
            html += '<button class="btn btn-small btn-secondary" onclick="validateLLMSlot(\\'' + slotKey + '\\')">Test</button>';
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
        var badge = isSet
          ? '<span class="tag" style="background:rgba(79,209,197,0.15);color:var(--accent);border-color:rgba(79,209,197,0.3);">configured</span>'
          : '<span class="tag">not set</span>';
        html += '<div class="item-card" style="margin-bottom:10px"><div class="item-card-header"><span class="item-card-title">' + svc.label + '</span>' + badge + '</div>';
        html += '<div style="margin-top:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">';
        html += '<input type="' + (svc.isPassword?'password':'text') + '" id="cred_' + svc.key + '" placeholder="' + (isSet?'\\u2022\\u2022\\u2022 (enter new to update)':svc.placeholder) + '" class="' + (isSet ? 'cred-configured' : '') + '" style="flex:1;min-width:150px;background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:10px;border-radius:6px;font-size:14px;font-family:var(--font-mono);outline:none;">';
        html += '<button class="btn btn-small" onclick="saveCred(\\'' + svc.key + '\\')">✓ Save</button>';
        if (isSet) {
          html += '<button class="btn btn-small btn-secondary" onclick="validateCred(\\'' + svc.key + '\\')">Test</button>';
          if (svc.key === 'ntfy_url') {
            html += '<button class="btn btn-small btn-secondary" onclick="sendTestNotification()" style="background:rgba(79,209,197,0.1);color:var(--accent);border-color:rgba(79,209,197,0.3);">&#128276; Send Test</button>';
          }
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
        html += '<button class="btn btn-small btn-secondary" id="googleTestBtn" onclick="testGoogleConnection()" style="display:none;">Test</button>';
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
          banner.style.cssText = 'position:fixed;left:0;right:0;z-index:6;' +
            'background:var(--terracotta);color:var(--text-on-accent);font-size:13px;font-family:var(--font);' +
            'padding:' + (isMobile ? '9px 14px' : '7px 16px') + ';' +
            'display:flex;align-items:center;justify-content:space-between;gap:12px;';
          banner.innerHTML =
            '<span style="font-weight:500;">Google not connected.</span>' +
            '<span style="display:flex;gap:12px;align-items:center;">' +
              '<a href="#" style="color:var(--text-on-accent);font-weight:600;text-decoration:underline;font-size:13px;" ' +
                'onclick="event.preventDefault();removeGoogleBanner();state.view=\\'settings\\';state.settingsSection=\\'credentials\\';renderView();">' +
                'Connect →</a>' +
              '<button onclick="removeGoogleBanner();" ' +
                'style="background:none;border:none;color:var(--text-on-accent);cursor:pointer;font-size:18px;line-height:1;padding:0;opacity:0.8;">' +
                '×</button>' +
            '</span>';
          // Position just above the fixed input anchor
          document.body.appendChild(banner);
          var anchor = document.querySelector('.input-anchor');
          banner.style.bottom = (anchor ? anchor.offsetHeight : 70) + 'px';
        }
      } else {
        removeGoogleBanner();
      }
    } catch(e) { /* ignore */ }
  }

  async function connectGoogleAccount() {
    try {
      // Pass the frontend origin so the OAuth callback returns here (Cloudflare),
      // keeping the redirect URI stable even when the API runs on Render.
      var data = await api('/settings/google/auth-url?origin=' + encodeURIComponent(window.location.origin));
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
  async function sendTestNotification() {
    var el = document.getElementById('credValidation_ntfy_url');
    if (el) el.innerHTML = '<span style="color:var(--text-muted);">Sending test notification...</span>';
    try {
      var r = await api('/settings/notify/test', {method:'POST', body: JSON.stringify({})});
      if (el) {
        if (r.channel === 'ntfy') {
          el.innerHTML = '<span style="color:var(--accent);">\\u2713 Ntfy push delivered successfully</span>';
        } else if (r.channel === 'ntfy-failed') {
          el.innerHTML = '<span style="color:var(--danger);">\\u2717 Ntfy push failed: ' + escapeHtml(r.error || 'check URL/token and server logs') + '</span>';
        } else if (r.channel === 'in-app') {
          el.innerHTML = '<span style="color:var(--warning, #f59e0b);">\\u26a0 Delivered in-app only (Ntfy not configured or no PIN set)</span>';
        } else {
          el.innerHTML = '<span style="color:var(--danger);">\\u2717 ' + escapeHtml(r.error || 'Unknown result') + '</span>';
        }
        setTimeout(function(){if(el)el.innerHTML='';},8000);
      }
    } catch(e) { if (el) { el.innerHTML = '<span style="color:var(--danger);">\\u2717 Test failed</span>'; setTimeout(function(){if(el)el.innerHTML='';},5000); } }
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
`}function fo(){return`  // ============================================================
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
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(74,58,44,0.45);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

    var panel = document.createElement('div');
    panel.style.cssText = 'width:100%;max-width:680px;max-height:80vh;overflow-y:auto;background:var(--clay);border:1px solid var(--hairline);border-radius:26px;padding:24px;box-shadow:0 18px 36px -14px rgba(74,58,44,0.40),inset 0 2px 3px rgba(255,255,255,0.65),inset 0 -6px 12px rgba(120,98,74,0.18);';

    var stateColors = {created:'#888',active:'var(--terracotta)',reminding:'#f6ad55',paused:'#a0aec0',completed:'var(--success)'};
    var inner = '<div style="margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--hairline);display:flex;align-items:center;justify-content:space-between;">';
    inner += '<h2 class="ac-title" style="margin:0;">⏰ Scheduled Tasks</h2>';
    inner += '<button id="tasksFloatClose" class="btn btn-small btn-secondary">✕ Close</button>';
    inner += '</div>';
    if (schedules.length === 0) {
      inner += '<div class="ac-empty">No scheduled tasks. Ask in chat to set reminders or recurring tasks.</div>';
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
        inner += '<div class="item-card">';
        inner += '<div class="item-card-header">';
        inner += '<span class="item-card-title">' + escapeHtml(job.name) + '</span>';
        inner += '<span class="tag" style="color:' + sc + ';border-color:' + sc + '44;">' + (job.state||'active') + '</span>';
        inner += '</div>';
        inner += '<div class="item-card-body">&#128257; ' + escapeHtml(freq) + ' &nbsp;&middot;&nbsp; ' + escapeHtml(job.action_type) + '</div>';
        if (config.description) inner += '<div class="item-card-meta" style="margin-top:4px">' + escapeHtml(config.description) + '</div>';
        if (job.next_run && job.state !== 'completed') inner += '<div class="item-card-meta">Next: ' + new Date(job.next_run).toLocaleString() + '</div>';
        if (job.last_run) inner += '<div class="item-card-meta">Last: ' + new Date(job.last_run).toLocaleString() + '</div>';
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
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(74,58,44,0.45);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    var panel = document.createElement('div');
    panel.style.cssText = 'width:100%;max-width:680px;max-height:80vh;overflow-y:auto;background:var(--clay);border:1px solid var(--hairline);border-radius:26px;padding:24px;box-shadow:0 18px 36px -14px rgba(74,58,44,0.40),inset 0 2px 3px rgba(255,255,255,0.65),inset 0 -6px 12px rgba(120,98,74,0.18);';
    var html = '<div style="margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--hairline);display:flex;align-items:center;justify-content:space-between;">';
    html += '<h2 class="ac-title" style="margin:0;">U0001f9e0 Memories</h2>';
    html += '<button id="memFloatClose" class="btn btn-small btn-secondary">✕ Close</button>';
    html += '</div>';
    if (memories.length === 0) {
      html += '<div class="ac-empty">No memories yet. Important info will be remembered as you chat.</div>';
    } else {
      html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:14px;">Working memory is always in context. Long-term is searched on demand.</div>';
      for (var i = 0; i < memories.length; i++) {
        var m = memories[i];
        var ttc = m.tier === 'working' ? 'var(--terracotta)' : 'var(--text-muted)';
        html += '<div class="item-card">';
        html += '<div class="item-card-header">';
        html += '<span class="item-card-title">' + escapeHtml(m.title) + '</span>';
        html += '<span class="tag" style="color:' + ttc + ';border-color:' + ttc + '44;">' + (m.tier==='working'?'active':'archive') + '</span>';
        html += '<span class="tag">' + escapeHtml(m.type) + '</span>';
        html += '<span class="tag" style="color:var(--terracotta);">&#9733;' + m.importance + '</span>';
        html += '</div>';
        html += '<div class="item-card-body">' + escapeHtml(m.content) + '</div>';
        html += '<div style="display:flex;justify-content:flex-end;margin-top:6px;"><button data-memid="' + m.id + '" class="mem-del-btn ac-btn danger" title="Delete">&#215; Forget</button></div>';
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
`}function go(){return`  // ============================================================
  // SKILLS VIEW — Full-page primary section
  // ============================================================

  function confidenceBar(score) {
    var pct = Math.round((score == null ? 1 : score) * 100);
    var color = pct >= 70 ? 'var(--success)' : pct >= 40 ? 'var(--warning)' : 'var(--danger)';
    return '<div style="display:flex;align-items:center;gap:6px;margin-top:3px;">' +
      '<div style="flex:1;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;">' +
        '<div style="width:' + pct + '%;height:100%;background:' + color + ';border-radius:2px;"></div>' +
      '</div>' +
      '<span style="font-size:10px;color:' + color + ';min-width:28px;">' + pct + '%</span>' +
    '</div>';
  }

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

  function renderAutoSkillCard(s) {
    var enabledBadge = s.enabled ? '' : '<span style="font-size:10px;color:var(--danger);background:rgba(220,53,69,0.15);padding:1px 6px;border-radius:4px;margin-left:6px;">disabled</span>';
    var autoBadge = '<span style="font-size:10px;color:var(--accent);background:rgba(79,209,197,0.12);padding:1px 6px;border-radius:4px;margin-left:6px;">auto</span>';
    var refinedBadge = s.refinement_count > 0
      ? '<span style="font-size:10px;color:var(--text-muted);padding:1px 6px;">refined ' + s.refinement_count + 'x</span>'
      : '';
    var cardId = 'auto-skill-card-' + s.id;

    return '<div class="skill-card' + (s.enabled ? '' : ' skill-disabled') + '" id="' + cardId + '">' +
      '<div class="skill-card-name">' + escapeHtml(s.name) + autoBadge + enabledBadge + '</div>' +
      '<div class="skill-card-slug">' + escapeHtml(s.slug) + '</div>' +
      '<div class="skill-card-desc">' + escapeHtml(s.description) + '</div>' +
      '<div class="skill-card-meta" style="margin-bottom:4px;">Used ' + (s.usage_count || 0) + ' times' + (s.last_used_at ? ' &middot; Last: ' + formatRelativeDate(s.last_used_at) : '') + refinedBadge + '</div>' +
      '<div style="margin-bottom:8px;">' +
        '<div style="font-size:10px;color:var(--text-muted);margin-bottom:2px;">Confidence</div>' +
        confidenceBar(s.confidence_score) +
      '</div>' +
      '<div class="skill-card-actions" style="flex-wrap:wrap;gap:6px;">' +
        '<button class="btn btn-small" onclick="toggleSkill(' + s.id + ',' + (s.enabled ? 'false' : 'true') + ')">' + (s.enabled ? 'Disable' : 'Enable') + '</button>' +
        '<button class="btn btn-small" onclick="expandAutoSkillInstructions(' + s.id + ')">Instructions</button>' +
        '<button class="btn btn-small" style="color:var(--accent);border-color:var(--accent);" onclick="promoteSkill(' + s.id + ')">Promote</button>' +
        '<button class="btn btn-small btn-danger" onclick="deleteSkill(' + s.id + ')">Delete</button>' +
      '</div>' +
      '<div id="auto-skill-instr-' + s.id + '" style="display:none;margin-top:10px;">' +
        '<textarea id="auto-skill-ta-' + s.id + '" rows="6" style="width:100%;background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px;font-size:12px;font-family:var(--font-mono);resize:vertical;box-sizing:border-box;">' + escapeHtml(s.instructions || '') + '</textarea>' +
        '<div style="display:flex;gap:6px;margin-top:6px;">' +
          '<button class="btn btn-small btn-primary" onclick="saveAutoSkillInstructions(' + s.id + ')">Save</button>' +
          '<button class="btn btn-small" onclick="expandAutoSkillInstructions(' + s.id + ')">Close</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  window.expandAutoSkillInstructions = function(id) {
    var div = document.getElementById('auto-skill-instr-' + id);
    if (!div) return;
    div.style.display = div.style.display === 'none' ? 'block' : 'none';
  };

  window.saveAutoSkillInstructions = async function(id) {
    var ta = document.getElementById('auto-skill-ta-' + id);
    if (!ta) return;
    var instructions = ta.value.trim();
    if (!instructions) return;
    await api('/skills/' + id, { method: 'PUT', body: JSON.stringify({ instructions }) });
    showToast('Instructions saved', 'success');
  };

  window.promoteSkill = async function(id) {
    if (!confirm('Promote this auto-skill to manual? You will be able to edit it freely, and ' + (state.assistantName || 'Karna') + ' will stop auto-refining it.')) return;
    await api('/skills/' + id, { method: 'PUT', body: JSON.stringify({ promote: true }) });
    showToast('Skill promoted to manual', 'success');
    renderView();
  };

  async function renderSkillsView(container) {
    var data = await api('/skills');
    var skills = data.skills || [];
    var autoSkills = data.auto_skills || [];

    var html = '<div class="page-view">' +
      '<div class="page-header">' +
        '<button class="page-back-btn" onclick="goBack()">&#8592;</button>' +
        '<h1 class="page-title">Skills</h1>' +
        '<button class="btn-new" onclick="showCreateSkillModal()"><span class="plus">&#43;</span> New</button>' +
      '</div>' +
      '<div class="skills-page">';

    // ── Manual skills ──
    html += '<div class="ac-section-title">Your Skills</div>';
    if (skills.length === 0) {
      html += '<div class="skills-empty">' +
        '<div class="skills-empty-icon">&#9889;</div>' +
        '<div class="skills-empty-title">No skills yet</div>' +
        '<div class="skills-empty-hint">Ask ' + escapeHtml(state.assistantName || 'Karna') + ' in chat:<br><code>"Create a skill that..."</code><br><br>Or tap <strong>+ New</strong> above to create one manually.</div>' +
      '</div>';
    } else {
      for (var i = 0; i < skills.length; i++) {
        html += renderSkillCard(skills[i]);
      }
    }

    // ── Auto-learned skills ──
    if (autoSkills.length > 0) {
      html += '<div class="ac-section-title" style="margin-top:24px;">Auto-Learned Skills</div>';
      html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">' + escapeHtml(state.assistantName || 'Karna') + ' detected repeated workflows and distilled them into procedures. Promote any to make it editable as a manual skill.</div>';
      for (var j = 0; j < autoSkills.length; j++) {
        html += renderAutoSkillCard(autoSkills[j]);
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
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(74,58,44,0.45);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    var panel = document.createElement('div');
    panel.style.cssText = 'background:var(--clay);border:1px solid var(--hairline);border-radius:26px;padding:24px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 18px 36px -14px rgba(74,58,44,0.40),inset 0 2px 3px rgba(255,255,255,0.65),inset 0 -6px 12px rgba(120,98,74,0.18);';
    panel.innerHTML =
      '<div class="ac-title" style="margin-bottom:16px;">Create New Skill</div>' +
      '<div class="field"><label>Name</label><input type="text" id="newSkillName" placeholder="e.g. Equipment List Parser" style="font-size:16px;"></div>' +
      '<div class="field"><label>Description</label><input type="text" id="newSkillDesc" placeholder="What this skill does in one sentence" style="font-size:16px;"></div>' +
      '<div class="field"><label>Instructions</label><textarea id="newSkillInstructions" rows="6" placeholder="Step-by-step instructions for ' + escapeHtml(state.assistantName || 'Karna') + ' to follow when this skill is invoked..." style="font-size:16px;"></textarea></div>' +
      '<div class="field"><label>Required Tools <span style="font-size:11px;color:var(--text-muted)">(comma-separated)</span></label><input type="text" id="newSkillTools" placeholder="e.g. parse_document, append_sheet" style="font-size:16px;"></div>' +
      '<div style="display:flex;gap:8px;margin-top:4px;">' +
        '<button class="btn" id="newSkillSave">Create Skill</button>' +
        '<button class="btn btn-secondary" id="newSkillCancel">Cancel</button>' +
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
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(74,58,44,0.45);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    var panel = document.createElement('div');
    panel.style.cssText = 'background:var(--clay);border:1px solid var(--hairline);border-radius:26px;padding:24px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 18px 36px -14px rgba(74,58,44,0.40),inset 0 2px 3px rgba(255,255,255,0.65),inset 0 -6px 12px rgba(120,98,74,0.18);';
    panel.innerHTML =
      '<div class="ac-title" style="margin-bottom:16px;">Edit Skill: ' + escapeHtml(s.name) + '</div>' +
      '<div class="field"><label>Name</label><input type="text" id="editSkillName" value="' + escapeHtml(s.name) + '"></div>' +
      '<div class="field"><label>Description</label><input type="text" id="editSkillDesc" value="' + escapeHtml(s.description) + '"></div>' +
      '<div class="field"><label>Instructions</label><textarea id="editSkillInstructions" rows="8">' + escapeHtml(s.instructions) + '</textarea></div>' +
      '<div class="field"><label>Required Tools</label><input type="text" id="editSkillTools" value="' + escapeHtml((JSON.parse(s.required_tools || '[]')).join(', ')) + '"></div>' +
      '<div style="display:flex;gap:8px;margin-top:16px;">' +
        '<button class="btn" id="editSkillSave">Save</button>' +
        '<button class="btn btn-secondary" id="editSkillCancel">Cancel</button>' +
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
    var html = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;">Standing instructions ' + escapeHtml(state.assistantName || 'Karna') + ' follows in every conversation. Add anything you want remembered permanently.</div>';
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
      html += '<div class="ac-section-title">Tool Execution (24h)</div>';

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
      html += '<div class="ac-section-title">Enforcement Triggers</div>';
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
      html += '<div class="ac-section-title" style="margin-top:8px;">Provider Performance</div>';
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
      html += '<div class="ac-section-title" style="margin-top:16px;">Cron Executions</div>';
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
        html += '<div class="ac-section-title" style="margin-top:12px;color:var(--text-warning);">Cron Warnings</div>';
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
`}function yo(){return`  // === Init ===
  // Global error boundary — prevents silent blank white page on unhandled JS errors
  window.onerror = function(msg, src, line, col, err) {
    var app = document.getElementById('app');
    if (app && app.innerHTML.trim() === '') {
      app.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Georgia,serif;color:var(--text-primary);flex-direction:column;gap:12px;background:var(--linen);">' +
        '<div style="font-size:18px;color:var(--text-primary);">Something went wrong</div>' +
        '<div style="font-size:13px;color:var(--text-secondary);">Try refreshing the page</div>' +
        '<button onclick="location.reload()" style="margin-top:8px;padding:10px 20px;background:var(--terracotta);color:#fff;border:none;border-radius:9999px;cursor:pointer;font-size:13px;font-weight:600;">Refresh</button>' +
        '</div>';
    }
    return false;
  };
  loadSession();
  render(); // render immediately — avoids blank white page
  if (state.session) {
    api('/auth/me').then(function(data) {
      if (data.error) { clearSession(); render(); }
      else if (data.user && data.user.assistant_name) applyAssistantName(data.user.assistant_name);
    }).catch(function(err) {
      console.error('Auth error:', err);
      clearSession();
      render();
    });
  }
  document.onkeydown = function(e) { if (e.key === 'Escape') toggleOverlay(null); };

  // Handle iOS keyboard — pin fixed input-anchor to visual viewport bottom
  if ('visualViewport' in window) {
    var _kbWasOpen = false;
    function _adjustAnchor() {
      var vp = window.visualViewport;
      var anchor = document.querySelector('.input-anchor');
      var kbHeight = Math.max(0, window.innerHeight - vp.offsetTop - vp.height);
      var kbOpen = kbHeight > 100;

      if (anchor) {
        if (kbOpen) {
          // iOS 15+ moves position:fixed;bottom:0 above the keyboard natively.
          // Don't override top/bottom — just strip the safe-area padding so the
          // input pill sits flush above the keyboard instead of floating too high.
          anchor.style.paddingBottom = '8px';
          anchor.style.top = '';
          anchor.style.bottom = '0';
        } else {
          anchor.style.top = '';
          anchor.style.bottom = '';
          anchor.style.paddingBottom = '';
        }
      }

      // Push chat content above keyboard so scrollToBottom keeps last message visible
      var chatArea = document.getElementById('chatArea');
      if (chatArea) {
        if (kbOpen && anchor) {
          // Extra padding = keyboard height + anchor height so the bottom of scrollable
          // content clears both the keyboard and the repositioned input bar
          chatArea.style.paddingBottom = (kbHeight + anchor.offsetHeight + 8) + 'px';
          if (!_kbWasOpen) {
            // Keyboard just opened — scroll so the latest message is visible above it
            requestAnimationFrame(function() { chatArea.scrollTop = chatArea.scrollHeight; });
          }
        } else {
          chatArea.style.paddingBottom = '';
        }
      }
      _kbWasOpen = kbOpen;

      // non-fixed .input-area (documents view): pad by keyboard height
      var inputArea = document.querySelector('.input-area');
      if (inputArea) {
        var offset = window.innerHeight - vp.height;
        inputArea.style.paddingBottom = (offset > 0 ? offset + 8 : 16) + 'px';
      }
    }
    window.visualViewport.addEventListener('resize', _adjustAnchor);
    window.visualViewport.addEventListener('scroll', _adjustAnchor);
  }

  // ============================================================
  // DOCUMENTS VIEW FUNCTIONS
  // ============================================================`}function vo(){return`  async function renderDocumentsView(container) {
    container.innerHTML = '<div class="page-view">' +
      '<div class="page-header">' +
        '<button class="page-back-btn" onclick="goBack()">&#8592;</button>' +
        '<h1 class="page-title">&#128196; Documents</h1>' +
        '<button class="btn-new" onclick="showDocumentUpload()"><span class="plus">&#43;</span> Upload</button>' +
      '</div>' +
      '<div class="documents-container">' +
      '<div class="documents-search">' +
        '<input type="text" id="docSearchInput" placeholder="Search across all documents..." onkeypress="if(event.key===\\'Enter\\')searchDocuments()">' +
        '<button class="btn" onclick="searchDocuments()">Search</button>' +
      '</div>' +
      '<div class="documents-upload-area" id="uploadArea" style="display:none;">' +
        '<div class="document-icon">&#128229;</div>' +
        '<p style="color:var(--text-muted);margin:8px 0;">Drop files here or click to browse</p>' +
        '<p style="color:var(--text-muted);font-size:12px;">PDF, Excel, Word (Max 50MB)</p>' +
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
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
          '<div style="font-size:13px;font-weight:500;color:var(--text-secondary);">Ask AI</div>' +
          '<button class="btn btn-small btn-secondary" onclick="clearAskAiResults()">Clear Results</button>' +
        '</div>' +
        '<div id="chatMessages" class="documents-chat-messages"></div>' +
        '<div class="documents-chat-input">' +
          '<input type="text" id="docChatInput" placeholder="Ask about your documents..." onkeypress="if(event.key===\\'Enter\\')sendDocChat()">' +
          '<button class="btn" onclick="sendDocChat()">Send</button>' +
        '</div>' +
      '</div>' +
      '</div>' +
    '</div>';

    await loadDocumentsList();
  }

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
      
      var response = await fetch(API + '/documents/upload', {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': 'Bearer ' + (state.session ? state.session.sessionId : '') }
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
          'No documents yet. Upload files here or attach them in chat — they\\'ll appear here automatically.</p>';
        return;
      }
      
      var html = '';
      response.documents.forEach(function(doc) {
        var mimeType = doc.mime_type || '';
        var icon = mimeType.includes('pdf') ? '&#128196;' :
                   mimeType.includes('excel') || mimeType.includes('sheet') ? '&#128197;' :
                   mimeType.includes('word') ? '&#128221;' : '&#128196;';
        var isReady = ['parsed', 'summarized'].includes(doc.status);
        var statusClass = doc.status;
        var statusText = doc.status === 'uploaded' ? 'Processing...' :
                        isReady ? 'Ready' : 'Failed';

        html += '<div class="document-card">' +
          '<div class="document-icon">' + icon + '</div>' +
          '<div class="document-info">' +
            '<div class="document-name">' + escapeHtml(doc.name) +
              '<span class="status-badge ' + statusClass + '">' + statusText + '</span></div>' +
            '<div class="document-meta">' + formatFileSize(doc.size) + ' • ' +
              new Date(doc.created_at).toLocaleString() +
              (doc.source === 'drive' ? ' • <span style="color:var(--accent);">Google Drive</span>' : '') + '</div>';

        if (doc.summary && isReady) {
          html += '<div class="document-summary">' + escapeHtml(doc.summary.substring(0, 200)) + '...</div>';
        }

        html += '<div class="document-actions">';
        if (isReady) {
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
          '<button class="page-back-btn" onclick="state.view=\\'documents\\';renderView();" style="width:36px;height:36px;font-size:14px;">&#8592;</button>' +
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

  window.clearAskAiResults = function() {
    var chatMessages = document.getElementById('chatMessages');
    var chatArea = document.getElementById('documentChatArea');
    if (chatMessages) chatMessages.innerHTML = '';
    if (chatArea) chatArea.style.display = 'none';
    state.activeDocId = null;
    state.docSessionId = null;
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
            '<button class="page-back-btn" onclick="state.view=\\'documents\\';renderView();" style="width:36px;height:36px;font-size:14px;">&#8592;</button>' +
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
          '<button class="page-back-btn" onclick="state.view=\\'documents\\';renderView();" style="width:36px;height:36px;font-size:14px;">&#8592;</button>' +
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
          '<button class="page-back-btn" onclick="state.view=\\'documents\\';renderView();" style="width:36px;height:36px;font-size:14px;">&#8592;</button>' +
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
`}function wo(){return`  // ============================================================
  // NOTES
  // ============================================================

  var notesState = {
    notes: [],
    activeFilter: 'all',
    searchQuery: '',
    screen: 'list',
    activeNoteId: null,
    composeCancelTo: 'list',
    composeMode: 'read',
    composePreviewTimer: null,
    editingNote: null,
    deleteConfirmId: null,
    searchTimer: null,
    allTags: []
  };

  function notesFindById(id) {
    for (var i = 0; i < notesState.notes.length; i++) {
      if (notesState.notes[i].id === id) return notesState.notes[i];
    }
    return null;
  }

  function notesUpsert(note) {
    var found = false;
    for (var i = 0; i < notesState.notes.length; i++) {
      if (notesState.notes[i].id === note.id) {
        notesState.notes[i] = note;
        found = true;
        break;
      }
    }
    if (!found) notesState.notes.unshift(note);
    notesState.allTags = notesExtractTags(notesState.notes);
  }

  function notesRelativeDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var startOfDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var diffDays = Math.round((startOfToday - startOfDate) / 86400000);
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays > 1 && diffDays < 7) return diffDays + ' days ago';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  }

  function notesExtractTags(notes) {
    var tagSet = {};
    for (var i = 0; i < notes.length; i++) {
      var tags = (notes[i].tags || '').split(',');
      for (var j = 0; j < tags.length; j++) {
        var t = tags[j].trim();
        if (t) tagSet[t] = true;
      }
    }
    return Object.keys(tagSet).sort();
  }

  function renderNoteCard(note) {
    var pinned = note.is_pinned ? 1 : 0;
    var tagsHtml = '';
    if (note.tags) {
      var tags = note.tags.split(',');
      for (var i = 0; i < tags.length; i++) {
        var t = tags[i].trim();
        if (t) tagsHtml += '<span class="note-tag">' + escapeHtml(t) + '</span>';
      }
    }
    var confirmHtml = notesState.deleteConfirmId === note.id
      ? '<button class="note-action-btn danger" onclick="deleteNote(' + note.id + ', true)">Sure? Tap again</button>'
      : '<button class="note-action-btn danger" onclick="deleteNote(' + note.id + ', false)">Delete</button>';

    return '<div class="note-card" data-note-id="' + note.id + '">' +
      '<div style="display:flex;align-items:flex-start;gap:8px;">' +
        '<span class="note-pin" onclick="event.stopPropagation();togglePin(' + note.id + ',' + pinned + ')" title="Pin note">' + (pinned ? '⭐' : '☆') + '</span>' +
        '<div style="flex:1;min-width:0;" onclick="showNoteDetail(' + note.id + ')">' +
          '<div class="note-card-title">' + escapeHtml(note.title || 'Untitled') + '</div>' +
          '<div class="note-card-preview">' + escapeHtml(mdToPlain(note.content || '').substring(0, 160)) + '</div>' +
          '<div class="note-card-meta">' + tagsHtml +
            '<span class="note-date">' + notesRelativeDate(note.updated_at || note.created_at) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="note-actions">' +
        '<button class="note-action-btn" onclick="event.stopPropagation();editNote(' + note.id + ')">Edit</button>' +
        confirmHtml +
      '</div>' +
    '</div>';
  }

  function renderNotesGrid() {
    var grid = document.getElementById('notesGrid');
    if (!grid) return;
    if (notesState.notes.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px 16px;font-size:14px;">No notes yet. Tap + to create one.</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < notesState.notes.length; i++) {
      html += renderNoteCard(notesState.notes[i]);
    }
    grid.innerHTML = html;
  }

  function renderNotesFilters() {
    var el = document.getElementById('notesFilters');
    if (!el) return;
    var html = '<button class="filter-chip' + (notesState.activeFilter === 'all' ? ' active' : '') + '" onclick="filterByTag(\\'all\\')">All</button>';
    html += '<button class="filter-chip' + (notesState.activeFilter === 'pinned' ? ' active' : '') + '" onclick="filterByTag(\\'pinned\\')">Pinned</button>';
    for (var i = 0; i < notesState.allTags.length; i++) {
      var tag = notesState.allTags[i];
      html += '<button class="filter-chip' + (notesState.activeFilter === tag ? ' active' : '') + '" onclick="filterByTag(\\'' + escapeHtml(tag).replace(/'/g, "\\\\'") + '\\')">' + escapeHtml(tag) + '</button>';
    }
    el.innerHTML = html;
  }

  async function loadNotesList() {
    var params = '?limit=50';
    if (notesState.activeFilter === 'pinned') {
      params += '&pinned_only=1';
    } else if (notesState.activeFilter !== 'all') {
      params += '&tag=' + encodeURIComponent(notesState.activeFilter);
    }
    var data = await api('/notes' + params);
    notesState.notes = data.notes || [];
    notesState.allTags = notesExtractTags(notesState.notes);
    renderNotesFilters();
    renderNotesGrid();
  }

  async function renderNotesView(container) {
    notesState.screen = 'list';
    notesState.activeNoteId = null;
    notesState.editingNote = null;
    container.innerHTML =
      '<div class="notes-page">' +
        '<div class="notes-toolbar">' +
          '<button class="page-back-btn" onclick="goBackFromNotes()" style="width:44px;height:44px;flex-shrink:0;" aria-label="Back">&#8592;</button>' +
          '<input type="search" class="notes-search" id="notesSearchInput" placeholder="Search notes..." autocomplete="off">' +
          '<button class="notes-fab" id="notesFabBtn" title="New note" aria-label="New note">+</button>' +
        '</div>' +
        '<div class="notes-filters" id="notesFilters"></div>' +
        '<div class="notes-list-scroll">' +
          '<div class="notes-grid" id="notesGrid"><div style="color:var(--text-muted);padding:24px;text-align:center;">Loading notes...</div></div>' +
        '</div>' +
      '</div>';

    document.getElementById('notesFabBtn').onclick = function() { openNoteCompose(null, 'list'); };
    document.getElementById('notesSearchInput').oninput = function(e) { searchNotes(e.target.value); };

    notesState.deleteConfirmId = null;
    await loadNotesList();
  }

  window.showNotesList = function() {
    var mc = document.getElementById('mainContent');
    if (mc) renderNotesView(mc);
  };

  function renderNoteDetailPage(note) {
    var mc = document.getElementById('mainContent');
    if (!mc || !note) return;
    notesState.screen = 'detail';
    notesState.activeNoteId = note.id;
    var tagsHtml = '';
    if (note.tags) {
      var tags = note.tags.split(',');
      for (var j = 0; j < tags.length; j++) {
        var t = tags[j].trim();
        if (t) tagsHtml += '<span class="note-tag">' + escapeHtml(t) + '</span>';
      }
    }
    mc.innerHTML =
      '<div class="note-screen note-detail-page">' +
        '<div class="note-detail-header">' +
          '<button class="page-back-btn" onclick="showNotesList()" style="width:44px;height:44px;flex-shrink:0;" aria-label="All notes">&#8592;</button>' +
          '<h1>' + escapeHtml(note.title || 'Untitled') + '</h1>' +
          '<button class="note-action-btn" style="flex:0 0 auto;width:auto;padding:0 16px;height:40px;" onclick="openNoteEditor(' + note.id + ')">Edit</button>' +
        '</div>' +
        '<div class="note-detail-meta">' + tagsHtml +
          '<span class="note-date">' + notesRelativeDate(note.updated_at || note.created_at) + '</span>' +
        '</div>' +
        '<div class="note-detail-body">' +
          '<div class="note-detail-content msg-assistant note-doc">' + md(note.content || '') + '</div>' +
        '</div>' +
      '</div>';
  }

  function refreshComposePreview() {
    var preview = document.getElementById('noteComposePreview');
    var contentEl = document.getElementById('noteContentInput');
    if (!preview || !contentEl) return;
    var content = contentEl.value.trim();
    preview.innerHTML = content
      ? md(content)
      : '<p style="color:var(--text-muted);margin:0;">No content yet. Tap “Edit text” to write.</p>';
  }

  function setComposeMode(mode) {
    notesState.composeMode = mode;
    var readPanel = document.getElementById('noteComposeRead');
    var writePanel = document.getElementById('noteComposeWrite');
    var modeBtn = document.getElementById('noteComposeModeBtn');
    if (!readPanel || !writePanel || !modeBtn) return;
    if (mode === 'read') {
      refreshComposePreview();
      readPanel.style.display = 'block';
      writePanel.style.display = 'none';
      modeBtn.textContent = 'Edit text';
    } else {
      readPanel.style.display = 'none';
      writePanel.style.display = 'flex';
      modeBtn.textContent = 'Preview';
      refreshComposePreview();
      var contentEl = document.getElementById('noteContentInput');
      if (contentEl) contentEl.focus();
    }
  }

  window.toggleComposeMode = function() {
    setComposeMode(notesState.composeMode === 'read' ? 'write' : 'read');
  };

  function scheduleComposePreview() {
    if (notesState.composePreviewTimer) clearTimeout(notesState.composePreviewTimer);
    notesState.composePreviewTimer = setTimeout(function() {
      notesState.composePreviewTimer = null;
      if (notesState.composeMode === 'write') refreshComposePreview();
    }, 150);
  }

  function renderNoteComposePage(note, cancelTo) {
    var mc = document.getElementById('mainContent');
    if (!mc) return;
    notesState.screen = 'compose';
    notesState.editingNote = note;
    notesState.composeCancelTo = cancelTo || 'list';
    var isNew = !note || !note.id;
    var hasContent = !!(note && note.content && note.content.trim());
    notesState.composeMode = isNew || !hasContent ? 'write' : 'read';
    var heading = isNew ? 'New note' : 'Edit note';
    mc.innerHTML =
      '<div class="note-screen note-compose-page">' +
        '<div class="note-detail-header">' +
          '<button class="page-back-btn" onclick="cancelNoteCompose()" style="width:44px;height:44px;flex-shrink:0;" aria-label="Cancel">&#8592;</button>' +
          '<h1>' + heading + '</h1>' +
          '<button type="button" class="note-action-btn" id="noteComposeModeBtn" style="flex:0 0 auto;width:auto;padding:0 14px;height:40px;" onclick="toggleComposeMode()">Edit text</button>' +
        '</div>' +
        '<div class="note-compose-form">' +
          '<input type="text" id="noteTitleInput" placeholder="Title (optional)">' +
          '<div id="noteComposeRead" class="note-compose-read">' +
            '<div class="note-detail-body">' +
              '<div id="noteComposePreview" class="note-detail-content msg-assistant note-doc"></div>' +
            '</div>' +
          '</div>' +
          '<div id="noteComposeWrite" class="note-compose-write">' +
            '<textarea id="noteContentInput" placeholder="Write your note..."></textarea>' +
            '<div class="note-compose-live-preview">' +
              '<div class="note-compose-live-label">Preview</div>' +
              '<div class="note-detail-body note-compose-live-body">' +
                '<div id="noteComposeWritePreview" class="note-detail-content msg-assistant note-doc"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<input type="text" id="noteTagsInput" placeholder="Tags (comma-separated)">' +
          '<div class="note-compose-actions">' +
            '<button type="button" class="btn-cancel-note" id="noteCancelBtn">Cancel</button>' +
            '<button type="button" class="btn-save-note" id="noteSaveBtn">Save</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.getElementById('noteTitleInput').value = note ? (note.title || '') : '';
    document.getElementById('noteContentInput').value = note ? (note.content || '') : '';
    document.getElementById('noteTagsInput').value = note ? (note.tags || '') : '';
    document.getElementById('noteCancelBtn').onclick = cancelNoteCompose;
    document.getElementById('noteSaveBtn').onclick = saveNote;
    document.getElementById('noteContentInput').oninput = function() {
      var writePreview = document.getElementById('noteComposeWritePreview');
      if (writePreview && notesState.composeMode === 'write') {
        var c = document.getElementById('noteContentInput').value.trim();
        writePreview.innerHTML = c ? md(c) : '<p style="color:var(--text-muted);margin:0;">Start typing to see a preview.</p>';
      }
      scheduleComposePreview();
    };
    setComposeMode(notesState.composeMode);
    if (notesState.composeMode === 'write') {
      var writePreview = document.getElementById('noteComposeWritePreview');
      if (writePreview) {
        var initial = document.getElementById('noteContentInput').value.trim();
        writePreview.innerHTML = initial ? md(initial) : '<p style="color:var(--text-muted);margin:0;">Start typing to see a preview.</p>';
      }
      document.getElementById('noteTitleInput').focus();
    } else {
      document.getElementById('noteTitleInput').focus();
    }
  }

  window.openNoteCompose = function(note, cancelTo) {
    renderNoteComposePage(note, cancelTo || 'list');
  };

  window.cancelNoteCompose = function() {
    if (notesState.composeCancelTo === 'detail' && notesState.editingNote && notesState.editingNote.id) {
      renderNoteDetailPage(notesFindById(notesState.editingNote.id) || notesState.editingNote);
    } else {
      showNotesList();
    }
  };

  async function saveNote() {
    var titleEl = document.getElementById('noteTitleInput');
    var contentEl = document.getElementById('noteContentInput');
    var tagsEl = document.getElementById('noteTagsInput');
    if (!titleEl || !contentEl || !tagsEl) return;
    var title = titleEl.value.trim();
    var content = contentEl.value.trim();
    var tags = tagsEl.value.trim();
    if (!content) {
      showToast('Note content is required', 'warning');
      return;
    }
    try {
      var saved = null;
      if (notesState.editingNote && notesState.editingNote.id) {
        var updated = await api('/notes/' + notesState.editingNote.id, {
          method: 'PUT',
          body: JSON.stringify({ title: title, content: content, tags: tags })
        });
        saved = updated.note;
        showToast('Note updated', 'success');
      } else {
        var created = await api('/notes', {
          method: 'POST',
          body: JSON.stringify({ title: title, content: content, tags: tags, source: 'manual' })
        });
        saved = created.note;
        showToast('Note saved', 'success');
      }
      if (saved) {
        notesUpsert(saved);
        renderNoteDetailPage(saved);
      }
    } catch (err) {
      showToast('Failed to save note', 'error');
    }
  }

  window.editNote = function(id) {
    var note = notesFindById(id);
    if (note) openNoteCompose(note, 'list');
  };

  window.openNoteEditor = function(id) {
    var note = notesFindById(id);
    if (note) openNoteCompose(note, 'detail');
  };

  window.togglePin = async function(id, current) {
    try {
      await api('/notes/' + id, {
        method: 'PUT',
        body: JSON.stringify({ is_pinned: current ? 0 : 1 })
      });
      await loadNotesList();
    } catch (err) {
      showToast('Failed to update pin', 'error');
    }
  };

  window.deleteNote = async function(id, confirmed) {
    if (!confirmed) {
      notesState.deleteConfirmId = id;
      renderNotesGrid();
      return;
    }
    notesState.deleteConfirmId = null;
    try {
      await api('/notes/' + id, { method: 'DELETE' });
      showToast('Note deleted', 'success');
      await loadNotesList();
    } catch (err) {
      showToast('Failed to delete note', 'error');
    }
  };

  window.searchNotes = function(query) {
    notesState.searchQuery = query;
    if (notesState.searchTimer) clearTimeout(notesState.searchTimer);
    notesState.searchTimer = setTimeout(async function() {
      if (!query.trim()) {
        await loadNotesList();
        return;
      }
      try {
        var data = await api('/notes/search?q=' + encodeURIComponent(query.trim()));
        notesState.notes = data.notes || [];
        renderNotesGrid();
      } catch (err) {
        showToast('Search failed', 'error');
      }
    }, 300);
  };

  window.filterByTag = async function(tag) {
    notesState.activeFilter = tag;
    notesState.searchQuery = '';
    var searchEl = document.getElementById('notesSearchInput');
    if (searchEl) searchEl.value = '';
    await loadNotesList();
  };

  window.showNoteDetail = function(id) {
    var note = notesFindById(id);
    if (!note) return;
    renderNoteDetailPage(note);
  };
`}function _o(){return`  // ============================================================
  // DIGESTS
  // ============================================================

  var digestsState = {
    list: [],
    sections: [],
    configs: [],
    activeDigest: null,
    activeFilter: 'all',
    savingKind: null,
  };

  var DIGEST_KIND_META = {
    morning: { icon: '\\u2600\\uFE0F', title: 'Morning',  blurb: 'Start your day: today\\u2019s calendar, due reminders, open actions.' },
    evening: { icon: '\\uD83D\\uDD67', title: 'Evening',  blurb: 'Wind down: tomorrow\\u2019s calendar, tasks, the day\\u2019s news signal.' },
    weekly:  { icon: '\\uD83D\\uDCCA', title: 'Weekly',   blurb: 'Review the week: completed vs missed, documents, open actions.' },
    email:   { icon: '\\uD83D\\uDCE7', title: 'Email',     blurb: 'Inbox digest: Gmail summary + Outlook (via Browser Use).' },
  };
  var DIGEST_KINDS = ['morning', 'evening', 'weekly', 'email'];
  var WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var CHANNEL_LABELS = { ntfy: 'Ntfy push', web: 'Web bell', telegram: 'Telegram' };

  function digestKindMeta(kind) { return DIGEST_KIND_META[kind] || { icon: '\\uD83D\\uDCC4', title: kind, blurb: '' }; }

  function digestRelativeDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var startOfDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var diffDays = Math.round((startOfToday - startOfDate) / 86400000);
    if (diffDays === 0) return 'Today ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 1) return 'Yesterday ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (diffDays > 1 && diffDays < 7) return diffDays + ' days ago';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  }

  function deliveredChannelsBadges(channels) {
    if (!channels) return '<span class="tag" style="color:var(--text-muted);">not sent</span>';
    var list = channels.split(',').filter(Boolean);
    if (list.length === 0) return '<span class="tag" style="color:var(--danger);">\\u2717 not sent</span>';
    var parts = [];
    for (var i = 0; i < list.length; i++) {
      var label = list[i] === 'telegram' ? 'TG' : list[i] === 'ntfy' ? 'push' : list[i];
      parts.push('<span class="tag" style="color:var(--success);">\\u2713 ' + escapeHtml(label) + '</span>');
    }
    return parts.join('');
  }

  // === History list view ===
  async function renderDigestsView(container) {
    container.innerHTML = '<div class="page-view">' +
      '<div class="page-header">' +
        '<button class="page-back-btn" onclick="goBack()">&#8592;</button>' +
        '<h1 class="page-title">Digests</h1>' +
      '</div>' +
      '<p class="page-header-subtitle">Your proactive briefings, reviews &amp; digests</p>' +
      '<div class="digests-toolbar">' +
        '<div class="digests-filter-pills" id="digestsFilterPills"></div>' +
        '<button class="btn btn-small" onclick="state.view=\\'settings\\';state.settingsSection=\\'digests\\';renderView();" title="Configure digests"><i class="fa-solid fa-sliders"></i> Settings</button>' +
      '</div>' +
      '<div id="digestsListWrap" style="padding:0 16px 32px;"><div style="color:var(--text-muted);font-size:13px;padding:16px;">Loading...</div></div>' +
    '</div>';

    // Filter pills (All + per kind)
    var pillsHtml = '<button class="digests-pill' + (digestsState.activeFilter === 'all' ? ' active' : '') + '" onclick="setDigestsFilter(\\'all\\')">All</button>';
    for (var k = 0; k < DIGEST_KINDS.length; k++) {
      var meta = digestKindMeta(DIGEST_KINDS[k]);
      var active = digestsState.activeFilter === DIGEST_KINDS[k];
      pillsHtml += '<button class="digests-pill' + (active ? ' active' : '') + '" onclick="setDigestsFilter(\\'' + DIGEST_KINDS[k] + '\\')">' + meta.icon + ' ' + meta.title + '</button>';
    }
    var fp = document.getElementById('digestsFilterPills');
    if (fp) fp.innerHTML = pillsHtml;

    var query = digestsState.activeFilter !== 'all' ? '?kind=' + digestsState.activeFilter + '&limit=40' : '?limit=40';
    var data = await api('/digests' + query);
    digestsState.list = (data && data.digests) || [];
    renderDigestsList();
  }

  function renderDigestsList() {
    var wrap = document.getElementById('digestsListWrap');
    if (!wrap) return;
    var list = digestsState.list;
    if (!list || list.length === 0) {
      wrap.innerHTML = '<div class="empty-state">' +
        '<div style="font-size:32px;margin-bottom:8px;">\\uD83D\\uDCC4</div>' +
        '<div style="font-size:14px;color:var(--text-secondary);margin-bottom:12px;">No digests yet.</div>' +
        '<button class="btn btn-small" style="background:var(--accent);color:#080b11;font-weight:600;" onclick="generateDigestNow(\\'evening\\')">Generate an evening digest</button>' +
        '<div style="font-size:11px;color:var(--text-muted);margin-top:8px;">Scheduled digests appear here automatically once they fire.</div>' +
      '</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < list.length; i++) {
      var d = list[i];
      var meta = digestKindMeta(d.kind);
      var highlights = (d.content && d.content.highlights) || [];
      var preview = highlights.length > 0 ? highlights[0] : (d.content && d.content.sections && d.content.sections.length > 0 ? d.content.sections[0].title + ': ' + (d.content.sections[0].summary || '') : '');
      var itemCount = (d.content && d.content.sections) ? d.content.sections.reduce(function (n, s) { return n + (s.items ? s.items.length : 0); }, 0) : 0;
      html += '<div class="item-card digests-card" onclick="openDigest(' + d.id + ')">' +
        '<div class="item-card-header">' +
          '<span class="item-card-icon">' + meta.icon + '</span>' +
          '<span class="item-card-title">' + escapeHtml(meta.title) + ' \\u00B7 ' + digestRelativeDate(d.created_at) + '</span>' +
          '<span class="tag">' + (itemCount > 0 ? itemCount + ' items' : 'no items') + '</span>' +
        '</div>' +
        (preview ? '<div class="item-card-sub">' + escapeHtml(preview) + '</div>' : '') +
        '<div class="item-card-footer">' + deliveredChannelsBadges(d.delivered_channels) +
          '<span class="tag" style="margin-left:auto;color:var(--text-muted);">' + (d.content && d.content.period && d.content.period.start ? new Date(d.content.period.start).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '') + '</span>' +
        '</div>' +
      '</div>';
    }
    wrap.innerHTML = html;
  }

  window.setDigestsFilter = function (f) { digestsState.activeFilter = f; renderDigestsView(document.querySelector('.chat-area') || document.getElementById('mainContent')); };

  // === Digest detail view (with checklist) ===
  async function openDigest(id) {
    var container = document.querySelector('.chat-area') || document.getElementById('mainContent');
    if (!container) return;
    container.innerHTML = '<div class="page-view"><div class="page-header"><button class="page-back-btn" onclick="state.view=\\'digests\\';renderView();">&#8592;</button><h1 class="page-title">Digest</h1></div><div id="digestDetailWrap" style="padding:0 16px 32px;"><div style="color:var(--text-muted);font-size:13px;padding:16px;">Loading...</div></div></div>';
    var data = await api('/digests/' + id);
    if (!data || data.error) {
      var w = document.getElementById('digestDetailWrap');
      if (w) w.innerHTML = '<div style="color:var(--danger);padding:16px;">' + escapeHtml((data && data.error) || 'Not found') + '</div>';
      return;
    }
    digestsState.activeDigest = data;
    renderDigestDetail();
  }
  window.openDigest = openDigest;

  function renderDigestDetail() {
    var wrap = document.getElementById('digestDetailWrap');
    if (!wrap || !digestsState.activeDigest) return;
    var d = digestsState.activeDigest;
    var digest = d.digest;
    var items = d.items || [];
    var content = digest.content || { sections: [], highlights: [] };
    var meta = digestKindMeta(digest.kind);

    var checkedCount = 0;
    for (var ci = 0; ci < items.length; ci++) { if (items[ci].checked) checkedCount++; }

    var html = '<div class="digest-detail">' +
      '<div class="digest-detail-head">' +
        '<div class="digest-detail-icon">' + meta.icon + '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div class="digest-detail-title">' + escapeHtml(meta.title) + '</div>' +
          '<div class="digest-detail-meta">' + escapeHtml(new Date(digest.created_at).toLocaleString()) + ' \\u00B7 ' + deliveredChannelsBadges(digest.delivered_channels) + '</div>' +
        '</div>' +
        '<div class="digest-detail-actions">' +
          '<button class="btn btn-small" onclick="resendDigest(' + digest.id + ')"><i class="fa-solid fa-paper-plane"></i> Resend</button>' +
          '<button class="btn btn-small btn-danger" onclick="deleteDigest(' + digest.id + ')"><i class="fa-solid fa-trash"></i></button>' +
        '</div>' +
      '</div>';

    if (content.highlights && content.highlights.length > 0) {
      html += '<div class="digest-highlights">';
      for (var h = 0; h < content.highlights.length; h++) {
        html += '<div class="digest-highlight-line">\\u25B8 ' + escapeHtml(content.highlights[h]) + '</div>';
      }
      html += '</div>';
    }

    if (items.length > 0) {
      html += '<div class="digest-checklist-head">Checklist \\u2014 ' + checkedCount + '/' + items.length + ' done</div>';
    }

    for (var s = 0; s < (content.sections || []).length; s++) {
      var section = content.sections[s];
      var sectionItems = items.filter(function (it) { return it.section === section.key; });
      html += '<div class="digest-section">' +
        '<div class="digest-section-title">' + escapeHtml(section.title) + '</div>' +
        '<div class="digest-section-summary">' + escapeHtml(section.summary || '') + '</div>';
      for (var si = 0; si < section.items.length; si++) {
        var item = section.items[si];
        var matchRow = sectionItems.filter(function (it) { return it.item_key === item.key; })[0];
        var rowId = matchRow ? matchRow.id : null;
        var checked = matchRow ? !!matchRow.checked : false;
        if (rowId) {
          html += '<label class="digest-checklist-row' + (checked ? ' checked' : '') + '">' +
            '<input type="checkbox"' + (checked ? ' checked' : '') + ' onchange="toggleDigestItem(' + digest.id + ',' + rowId + ',this.checked)">' +
            '<span class="digest-checklist-text">' + escapeHtml(item.text) + '</span>' +
          '</label>';
        } else {
          html += '<div class="digest-section-item"><span class="digest-bullet">\\u2022</span><span>' + escapeHtml(item.text) + '</span></div>';
        }
      }
      html += '</div>';
    }

    html += '</div>';
    wrap.innerHTML = html;
  }

  window.toggleDigestItem = async function (digestId, itemId, checked) {
    var row = event && event.target ? event.target.closest('.digest-checklist-row') : null;
    if (row) { row.classList.toggle('checked', checked); }
    var res = await api('/digests/' + digestId + '/items/' + itemId + '/toggle', { method: 'POST' });
    if (res && res.error) showToast(res.error, 'error');
  };

  window.resendDigest = async function (id) {
    showToast('Resending...', '');
    var res = await api('/digests/' + id + '/resend', { method: 'POST' });
    if (res && res.error) { showToast(res.error, 'error'); return; }
    showToast('Sent to ' + ((res && res.deliveredChannels) || []).join(', '), 'success');
    if (digestsState.activeDigest && digestsState.activeDigest.digest.id === id) {
      digestsState.activeDigest.digest.delivered_channels = (res && res.deliveredChannels) ? res.deliveredChannels.join(',') : '';
      renderDigestDetail();
    }
  };

  window.deleteDigest = async function (id) {
    if (!confirm('Delete this digest?')) return;
    var res = await api('/digests/' + id, { method: 'DELETE' });
    if (res && res.error) { showToast(res.error, 'error'); return; }
    showToast('Deleted', 'success');
    state.view = 'digests';
    renderView();
  };

  window.generateDigestNow = async function (kind) {
    showToast('Generating ' + (digestKindMeta(kind).title) + ' digest...', '');
    var res = await api('/digests/generate', { method: 'POST', body: JSON.stringify({ kind: kind, force: true }) });
    if (res && res.error) { showToast(res.error, 'error'); return; }
    showToast((digestKindMeta(kind).title) + ' digest generated', 'success');
    if (res && res.digestId) { window.openDigest(res.digestId); }
  };

  // === Digest config (rendered inside the Settings panel) ===
  async function renderDigestConfigTab(container) {
    container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">Loading digest settings...</div>';
    var data = await api('/digests/configs');
    digestsState.configs = (data && data.configs) || [];
    digestsState.sections = (data && data.sections) || [];

    var html = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;line-height:1.6;">' +
      '<strong>Digests</strong> are proactive summaries Karna generates on a schedule. Each kind is independent \\u2014 pick what sections you want, when it runs, and where it\\u2019s delivered.' +
    '</div>';

    for (var i = 0; i < digestsState.configs.length; i++) {
      html += renderDigestConfigCard(digestsState.configs[i]);
    }

    html += '<div style="margin-top:20px;padding:12px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);">' +
      '<div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">\\u23F0 Meeting Reminders</div>' +
      '<div style="font-size:13px;color:var(--text-secondary);">Automatic reminders <strong>10 minutes before</strong> Google Calendar events. Delivered to your configured push channels \\u2014 no per-digest settings.</div>' +
    '</div>';

    container.innerHTML = html;
  }

  function renderDigestConfigCard(cfg) {
    var meta = digestKindMeta(cfg.kind);
    var id = 'cfg_' + cfg.kind;

    var html = '<div class="digest-config-card" data-kind="' + cfg.kind + '" style="margin-bottom:20px;padding:16px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
        '<div style="display:flex;align-items:center;gap:8px;">' +
          '<span style="font-size:18px;">' + meta.icon + '</span>' +
          '<div>' +
            '<div style="font-size:13px;font-weight:600;">' + escapeHtml(meta.title) + ' Digest</div>' +
            '<div style="font-size:11px;color:var(--text-muted);">' + escapeHtml(meta.blurb) + '</div>' +
          '</div>' +
        '</div>' +
        renderToggle(id + '_enabled', cfg.enabled, 'toggleDigestEnabled(\\'' + cfg.kind + '\\', this.checked)') +
      '</div>';

    // Schedule
    html += '<div style="margin-bottom:12px;">' +
      '<label style="display:block;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;">Schedule</label>' +
      '<div style="display:flex;gap:8px;align-items:center;">' +
        '<input type="time" id="' + id + '_time" value="' + escapeHtml(cfg.scheduleTime) + '" style="background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:14px;width:120px;">';
    if (cfg.kind === 'weekly') {
      html += '<select id="' + id + '_weekday" style="background:var(--bg);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:14px;">';
      for (var w = 0; w < WEEKDAYS.length; w++) {
        html += '<option value="' + WEEKDAYS[w] + '"' + (cfg.scheduleWeekday === WEEKDAYS[w] ? ' selected' : '') + '>' + WEEKDAYS[w] + '</option>';
      }
      html += '</select>';
    }
    html += '<span style="font-size:11px;color:var(--text-muted);">in your timezone</span>' +
      '</div></div>';

    // Sections checklist
    html += '<div style="margin-bottom:12px;">' +
      '<label style="display:block;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;">Sections</label>' +
      '<div class="digest-sections-grid">';
    for (var s = 0; s < digestsState.sections.length; s++) {
      var sec = digestsState.sections[s];
      var applies = sec.appliesTo[cfg.kind];
      if (!applies) continue;
      var on = cfg.sections.indexOf(sec.key) >= 0;
      html += '<label class="digest-section-chip' + (on ? ' on' : '') + '">' +
        '<input type="checkbox" data-kind="' + cfg.kind + '" data-section="' + sec.key + '"' + (on ? ' checked' : '') + ' onchange="onDigestSectionChange(this)">' +
        escapeHtml(sec.title) + '</label>';
    }
    html += '</div></div>';

    // Delivery channels
    html += '<div style="margin-bottom:12px;">' +
      '<label style="display:block;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;">Deliver to</label>' +
      '<div style="display:flex;gap:16px;">';
    var channelKeys = ['ntfy', 'web', 'telegram'];
    for (var c = 0; c < channelKeys.length; c++) {
      var ck = channelKeys[c];
      var on = cfg.notifyChannels.indexOf(ck) >= 0;
      html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
        '<input type="checkbox" data-kind="' + cfg.kind + '" data-channel="' + ck + '"' + (on ? ' checked' : '') + ' onchange="onDigestChannelChange(this)">' +
        escapeHtml(CHANNEL_LABELS[ck] || ck) + '</label>';
    }
    html += '</div></div>';

    // News topics (only if news section is available for this kind)
    var hasNews = false;
    for (var sn = 0; sn < digestsState.sections.length; sn++) {
      if (digestsState.sections[sn].key === 'news_ai' && digestsState.sections[sn].appliesTo[cfg.kind]) { hasNews = true; break; }
    }
    if (hasNews) {
      html += '<div style="margin-bottom:12px;">' +
        '<label style="display:block;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;">News Topics (max 5)</label>' +
        '<input type="text" id="' + id + '_topics" value="' + escapeHtml(cfg.newsTopics.join(', ')) + '" placeholder="AI, LLM, Tools" style="width:100%;background:var(--bg-elevated);border:1px solid var(--border);color:var(--text-primary);padding:8px;border-radius:6px;font-size:13px;">' +
        '<div style="font-size:10px;color:var(--text-muted);margin-top:4px;">Used by the Today\\u2019s Signal section.</div>' +
      '</div>';
    }

    // Actions
    html += '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:4px;">' +
      '<button class="btn btn-small" style="background:var(--accent);color:#080b11;font-weight:600;" onclick="saveDigestConfig(\\'' + cfg.kind + '\\')">Save</button>' +
      '<button class="btn btn-small" onclick="resetDigestConfig(\\'' + cfg.kind + '\\')">Reset to defaults</button>' +
      '<button class="btn btn-small" onclick="generateDigestNow(\\'' + cfg.kind + '\\')">Generate now</button>' +
      '<span id="cfg_status_' + cfg.kind + '" style="font-size:11px;color:var(--text-muted);margin-left:auto;"></span>' +
    '</div>';

    html += '</div>';
    return html;
  }

  function renderToggle(id, on, onchangeExpr) {
    return '<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;">' +
      '<span style="color:var(--text-muted);" id="' + id + '_label">' + (on ? 'Enabled' : 'Disabled') + '</span>' +
      '<div style="position:relative;width:36px;height:20px;">' +
        '<input type="checkbox" id="' + id + '"' + (on ? ' checked' : '') + ' style="opacity:0;width:0;height:0;position:absolute;" onchange="' + onchangeExpr + '">' +
        '<div id="' + id + '_track" style="cursor:pointer;width:36px;height:20px;background:' + (on ? 'var(--accent)' : 'var(--border)') + ';border-radius:10px;transition:background 0.2s;"></div>' +
        '<div id="' + id + '_thumb" style="cursor:pointer;position:absolute;top:2px;' + (on ? 'left:18px' : 'left:2px') + ';width:16px;height:16px;background:#fff;border-radius:50%;transition:left 0.2s;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>' +
      '</div></label>';
  }

  function bindToggleClick(id, kind) {
    var track = document.getElementById(id + '_track');
    var thumb = document.getElementById(id + '_thumb');
    function click() { var cb = document.getElementById(id); if (cb) { cb.checked = !cb.checked; cb.dispatchEvent(new Event('change')); } }
    if (track) track.onclick = click;
    if (thumb) thumb.onclick = click;
  }

  function collectConfigFromForm(kind) {
    var cfg = { kind: kind };
    var id = 'cfg_' + kind;
    var enabledEl = document.getElementById(id + '_enabled');
    cfg.enabled = enabledEl ? enabledEl.checked : true;
    var timeEl = document.getElementById(id + '_time');
    cfg.scheduleTime = timeEl ? timeEl.value : '20:00';
    var weekdayEl = document.getElementById(id + '_weekday');
    cfg.scheduleWeekday = weekdayEl ? weekdayEl.value : null;

    var sections = [];
    var secBoxes = document.querySelectorAll('input[data-kind="' + kind + '"][data-section]');
    for (var i = 0; i < secBoxes.length; i++) { if (secBoxes[i].checked) sections.push(secBoxes[i].getAttribute('data-section')); }
    cfg.sections = sections;

    var channels = [];
    var chBoxes = document.querySelectorAll('input[data-kind="' + kind + '"][data-channel]');
    for (var j = 0; j < chBoxes.length; j++) { if (chBoxes[j].checked) channels.push(chBoxes[j].getAttribute('data-channel')); }
    cfg.notifyChannels = channels;

    var topicsEl = document.getElementById(id + '_topics');
    if (topicsEl) {
      cfg.newsTopics = topicsEl.value.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
    }
    return cfg;
  }

  window.onDigestSectionChange = function (el) { el.closest('.digest-section-chip').classList.toggle('on', el.checked); };
  window.onDigestChannelChange = function () { /* state read on save */ };

  window.toggleDigestEnabled = function (kind, on) {
    var id = 'cfg_' + kind;
    var track = document.getElementById(id + '_track');
    var thumb = document.getElementById(id + '_thumb');
    var label = document.getElementById(id + '_label');
    if (track) track.style.background = on ? 'var(--accent)' : 'var(--border)';
    if (thumb) thumb.style.left = on ? '18px' : '2px';
    if (label) label.textContent = on ? 'Enabled' : 'Disabled';
    // Persist immediately so toggling on/off is reflected even without Save.
    var cfg = collectConfigFromForm(kind);
    cfg.enabled = on;
    saveDigestConfig(kind, true);
  };

  window.saveDigestConfig = async function (kind, silent) {
    var statusEl = document.getElementById('cfg_status_' + kind);
    if (statusEl && !silent) statusEl.textContent = 'Saving...';
    var cfg = collectConfigFromForm(kind);
    if (cfg.newsTopics && cfg.newsTopics.length > 5) {
      showToast('Maximum 5 news topics allowed', 'error');
      if (statusEl) statusEl.textContent = '';
      return;
    }
    if (cfg.notifyChannels.length === 0) {
      showToast('Select at least one delivery channel', 'error');
      if (statusEl) statusEl.textContent = '';
      return;
    }
    var body = {
      enabled: cfg.enabled,
      scheduleTime: cfg.scheduleTime,
      scheduleWeekday: cfg.scheduleWeekday,
      sections: cfg.sections,
      notifyChannels: cfg.notifyChannels,
    };
    if (cfg.newsTopics) body.newsTopics = cfg.newsTopics;
    var res = await api('/digests/configs?kind=' + kind, { method: 'PUT', body: JSON.stringify(body) });
    if (res && res.error) {
      showToast(res.error, 'error');
      if (statusEl) statusEl.textContent = 'Error';
      return;
    }
    if (statusEl && !silent) statusEl.textContent = 'Saved \\u2713';
    if (!silent) showToast((digestKindMeta(kind).title) + ' digest saved', 'success');
    // Keep local config in sync.
    for (var i = 0; i < digestsState.configs.length; i++) {
      if (digestsState.configs[i].kind === kind && res && res.config) digestsState.configs[i] = res.config;
    }
  };

  window.resetDigestConfig = async function (kind) {
    if (!confirm('Reset ' + (digestKindMeta(kind).title) + ' digest to defaults?')) return;
    var res = await api('/digests/configs/reset?kind=' + kind, { method: 'POST' });
    if (res && res.error) { showToast(res.error, 'error'); return; }
    showToast('Reset to defaults', 'success');
    renderDigestConfigTab(document.getElementById('settingsContentCol') || document.querySelector('.chat-area'));
  };

  // Bind toggle clicks after the config card renders (called from renderDigestConfigTab wrapper).
  function bindDigestConfigToggles() {
    for (var i = 0; i < digestsState.configs.length; i++) {
      bindToggleClick('cfg_' + digestsState.configs[i].kind + '_enabled', digestsState.configs[i].kind);
    }
  }
`}function bo(){return`  // ============================================================
  // REMINDERS VIEW
  // ============================================================

  var remindersState = {
    list: [],
    showForm: false,
    editId: null,
    saving: false,
    form: { name: '', description: '', schedule_type: 'once', date: '', time: '09:00', day: 'Monday', interval: '60' },
  };

  var REMINDER_DAYS_LIST = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function remTodayDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function remScheduleLabel(r) {
    switch (r.schedule_type) {
      case 'once': {
        var d = r.next_run ? new Date(r.next_run) : null;
        return d ? 'Once — ' + d.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Once (time unknown)';
      }
      case 'daily':    return 'Every day at ' + r.schedule_value;
      case 'weekly':   return 'Every ' + r.schedule_value;
      case 'interval': return 'Every ' + r.schedule_value + ' min';
      default:         return r.schedule_type + ': ' + (r.schedule_value || '');
    }
  }

  function remNextLabel(r) {
    if (!r.enabled || r.state === 'completed' || !r.next_run) return '';
    var d = new Date(r.next_run);
    var diff = d - new Date();
    if (diff < 0)          return 'Overdue';
    if (diff < 60000)      return 'Now';
    if (diff < 3600000)    return 'In ' + Math.round(diff / 60000) + 'm';
    if (diff < 86400000)   return 'In ' + Math.round(diff / 3600000) + 'h';
    if (diff < 172800000)  return 'Tomorrow ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  async function loadReminders() {
    var data = await api('/notifications/reminders');
    remindersState.list = data.reminders || [];
  }

  async function renderRemindersView(container) {
    container.innerHTML =
      '<div class="page-view">' +
        '<div class="page-header">' +
          '<button class="page-back-btn" onclick="goBack()">&#8592;</button>' +
          '<h1 class="page-title">Reminders</h1>' +
          '<button class="btn btn-small" onclick="remToggleForm(true)" style="margin-left:auto;width:auto;padding:6px 16px;">+ New</button>' +
        '</div>' +
        '<p class="page-header-subtitle">Manage your scheduled reminders</p>' +
        '<div id="remBody" style="padding:0 16px 40px;"></div>' +
      '</div>';
    await loadReminders();
    remRender();
  }

  function remRender() {
    var body = document.getElementById('remBody');
    if (!body) return;
    var html = '';

    if (remindersState.showForm) html += remFormHtml();

    var active   = remindersState.list.filter(function(r) { return r.enabled && r.state !== 'completed'; });
    var inactive = remindersState.list.filter(function(r) { return !r.enabled || r.state === 'completed'; });

    if (!remindersState.list.length && !remindersState.showForm) {
      html +=
        '<div style="text-align:center;padding:48px 0;color:var(--text-muted);">' +
          '<div style="font-size:36px;margin-bottom:12px;">&#9201;</div>' +
          '<div style="font-size:14px;font-weight:500;">No reminders yet</div>' +
          '<div style="font-size:12px;margin-top:6px;">Tap <strong>+ New</strong> to create one, or ask Karna in chat.</div>' +
        '</div>';
    } else {
      if (active.length) {
        html += '<div class="section-label" style="margin:16px 0 8px;">UPCOMING</div>';
        for (var i = 0; i < active.length; i++) html += remCardHtml(active[i]);
      }
      if (inactive.length) {
        html += '<div class="section-label" style="margin:20px 0 8px;color:var(--text-muted);">PAUSED / DONE</div>';
        for (var j = 0; j < inactive.length; j++) html += remCardHtml(inactive[j]);
      }
    }

    body.innerHTML = html;
  }

  function remCardHtml(r) {
    var active = r.enabled && r.state !== 'completed';
    var nextLabel = remNextLabel(r);
    var schedLabel = remScheduleLabel(r);
    return (
      '<div class="item-card" style="margin-bottom:10px;' + (active ? '' : 'opacity:0.55;') + '">' +
        '<div class="item-card-header">' +
          '<span class="item-card-title" style="flex:1;">' + escapeHtml(r.name) + '</span>' +
          (nextLabel ? '<span class="tag" style="font-size:11px;color:var(--accent);white-space:nowrap;">' + escapeHtml(nextLabel) + '</span>' : '') +
        '</div>' +
        '<div style="font-size:12px;color:var(--text-muted);margin-top:3px;">' + escapeHtml(schedLabel) + '</div>' +
        (r.description ? '<div style="font-size:12px;margin-top:4px;color:var(--text-secondary);">' + escapeHtml(r.description) + '</div>' : '') +
        '<div style="display:flex;align-items:center;gap:8px;margin-top:10px;">' +
          '<label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer;color:var(--text-muted);">' +
            '<input type="checkbox" ' + (active ? 'checked' : '') + ' onchange="remToggleEnabled(' + r.id + ',this.checked)" style="accent-color:var(--accent);width:14px;height:14px;cursor:pointer;">' +
            '<span>' + (active ? 'Active' : 'Paused') + '</span>' +
          '</label>' +
          '<div style="margin-left:auto;display:flex;gap:6px;">' +
            '<button class="btn btn-small" onclick="remStartEdit(' + r.id + ')" style="width:auto;padding:4px 12px;font-size:11px;">Edit</button>' +
            '<button class="btn btn-small" onclick="remDelete(' + r.id + ')" style="width:auto;padding:4px 12px;font-size:11px;background:transparent;color:var(--danger);border:1px solid var(--danger);">Delete</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function remFormHtml() {
    var f = remindersState.form;
    var isEdit = remindersState.editId !== null;
    var schedFields = '';

    if (f.schedule_type === 'once') {
      schedFields =
        '<div class="field"><label>Date</label>' +
          '<input type="date" id="rfDate" value="' + escapeHtml(f.date || remTodayDate()) + '" min="' + remTodayDate() + '">' +
        '</div>' +
        '<div class="field"><label>Time</label>' +
          '<input type="time" id="rfTime" value="' + escapeHtml(f.time) + '">' +
        '</div>';
    } else if (f.schedule_type === 'daily') {
      schedFields =
        '<div class="field"><label>Time</label>' +
          '<input type="time" id="rfTime" value="' + escapeHtml(f.time) + '">' +
        '</div>';
    } else if (f.schedule_type === 'weekly') {
      var dayOpts = REMINDER_DAYS_LIST.map(function(d) {
        return '<option value="' + d + '"' + (f.day === d ? ' selected' : '') + '>' + d + '</option>';
      }).join('');
      schedFields =
        '<div class="field"><label>Day</label><select id="rfDay">' + dayOpts + '</select></div>' +
        '<div class="field"><label>Time</label><input type="time" id="rfTime" value="' + escapeHtml(f.time) + '"></div>';
    } else if (f.schedule_type === 'interval') {
      schedFields =
        '<div class="field"><label>Every (minutes)</label>' +
          '<input type="number" id="rfInterval" min="1" value="' + escapeHtml(f.interval) + '" placeholder="60">' +
        '</div>';
    }

    return (
      '<div class="item-card" style="margin-bottom:16px;border:2px solid var(--accent);">' +
        '<div style="font-size:13px;font-weight:600;margin-bottom:12px;color:var(--text-primary);">' + (isEdit ? 'Edit Reminder' : 'New Reminder') + '</div>' +
        '<div class="field"><label>Name *</label>' +
          '<input type="text" id="rfName" placeholder="e.g. Update AI Subscriptions DB" value="' + escapeHtml(f.name) + '">' +
        '</div>' +
        '<div class="field"><label>Notes</label>' +
          '<input type="text" id="rfDesc" placeholder="Optional details..." value="' + escapeHtml(f.description) + '">' +
        '</div>' +
        '<div class="field"><label>Repeat</label>' +
          '<select id="rfType" onchange="remOnTypeChange(this.value)">' +
            '<option value="once"' + (f.schedule_type === 'once' ? ' selected' : '') + '>Once</option>' +
            '<option value="daily"' + (f.schedule_type === 'daily' ? ' selected' : '') + '>Every day</option>' +
            '<option value="weekly"' + (f.schedule_type === 'weekly' ? ' selected' : '') + '>Every week</option>' +
            '<option value="interval"' + (f.schedule_type === 'interval' ? ' selected' : '') + '>Every N minutes</option>' +
          '</select>' +
        '</div>' +
        schedFields +
        '<div style="display:flex;gap:8px;margin-top:14px;">' +
          '<button class="btn" onclick="remSave()" style="width:auto;padding:8px 24px;"' + (remindersState.saving ? ' disabled' : '') + '>' +
            (remindersState.saving ? 'Saving...' : 'Save') +
          '</button>' +
          '<button class="btn btn-small" onclick="remToggleForm(false)" style="width:auto;padding:8px 16px;background:transparent;color:var(--text-muted);">Cancel</button>' +
        '</div>' +
      '</div>'
    );
  }

  function remFormCurrentValues() {
    var f = remindersState.form;
    var name  = (document.getElementById('rfName')  || {}).value || f.name;
    var desc  = (document.getElementById('rfDesc')  || {}).value || '';
    var stype = (document.getElementById('rfType')  || {}).value || f.schedule_type;
    var sval  = '';
    if (stype === 'once') {
      var date = (document.getElementById('rfDate') || {}).value || f.date || remTodayDate();
      var time = (document.getElementById('rfTime') || {}).value || f.time;
      sval = date + ' ' + time;
    } else if (stype === 'daily') {
      sval = (document.getElementById('rfTime') || {}).value || f.time;
    } else if (stype === 'weekly') {
      var day  = (document.getElementById('rfDay')  || {}).value || f.day;
      var time2 = (document.getElementById('rfTime') || {}).value || f.time;
      sval = day + ' ' + time2;
    } else if (stype === 'interval') {
      sval = (document.getElementById('rfInterval') || {}).value || f.interval;
    }
    return { name: name.trim(), description: desc.trim(), schedule_type: stype, schedule_value: sval };
  }

  function remToggleForm(show) {
    if (show) {
      remindersState.editId = null;
      remindersState.form = { name: '', description: '', schedule_type: 'once', date: remTodayDate(), time: '09:00', day: 'Monday', interval: '60' };
    }
    remindersState.showForm = show;
    remRender();
    if (show) {
      var pv = document.querySelector('.page-view');
      if (pv) pv.scrollTop = 0;
    }
  }

  function remOnTypeChange(val) {
    var nameEl = document.getElementById('rfName');
    var descEl = document.getElementById('rfDesc');
    if (nameEl) remindersState.form.name = nameEl.value;
    if (descEl) remindersState.form.description = descEl.value;
    remindersState.form.schedule_type = val;
    remRender();
  }

  async function remSave() {
    var vals = remFormCurrentValues();
    if (!vals.name) { showToast('Name is required', 'error'); return; }
    remindersState.saving = true;
    remRender();
    var isEdit = remindersState.editId !== null;
    var path   = isEdit ? '/notifications/reminders/' + remindersState.editId : '/notifications/reminders';
    var method = isEdit ? 'PATCH' : 'POST';
    var result = await api(path, { method: method, body: JSON.stringify(vals) });
    remindersState.saving = false;
    if (result.error) { showToast(result.error, 'error'); remRender(); return; }
    remindersState.showForm = false;
    remindersState.editId   = null;
    await loadReminders();
    remRender();
    showToast(isEdit ? 'Reminder updated' : 'Reminder created');
  }

  async function remToggleEnabled(id, enabled) {
    var result = await api('/notifications/reminders/' + id, { method: 'PATCH', body: JSON.stringify({ enabled: enabled }) });
    if (result.error) { showToast(result.error, 'error'); return; }
    await loadReminders();
    remRender();
  }

  function remStartEdit(id) {
    var r = remindersState.list.find(function(x) { return x.id === id; });
    if (!r) return;
    var form = { name: r.name || '', description: r.description || '', schedule_type: r.schedule_type || 'once', date: remTodayDate(), time: '09:00', day: 'Monday', interval: '60' };
    if (r.schedule_type === 'daily' && r.schedule_value) {
      form.time = r.schedule_value;
    } else if (r.schedule_type === 'weekly' && r.schedule_value) {
      var parts = r.schedule_value.split(' ');
      if (parts.length >= 2) { form.day = parts[0]; form.time = parts[1]; }
    } else if (r.schedule_type === 'interval' && r.schedule_value) {
      form.interval = r.schedule_value;
    } else if (r.schedule_type === 'once' && r.next_run) {
      var d = new Date(r.next_run);
      form.date = d.toISOString().slice(0, 10);
      form.time = d.toTimeString().slice(0, 5);
    }
    remindersState.editId   = id;
    remindersState.form     = form;
    remindersState.showForm = true;
    remRender();
    var pv = document.querySelector('.page-view');
    if (pv) pv.scrollTop = 0;
  }

  async function remDelete(id) {
    var r = remindersState.list.find(function(x) { return x.id === id; });
    if (!r) return;
    if (!confirm('Delete reminder "' + r.name + '"?')) return;
    var result = await api('/notifications/reminders/' + id, { method: 'DELETE' });
    if (result.error) { showToast(result.error, 'error'); return; }
    await loadReminders();
    remRender();
    showToast('Reminder deleted');
  }

  window.remToggleForm    = remToggleForm;
  window.remOnTypeChange  = remOnTypeChange;
  window.remSave          = remSave;
  window.remToggleEnabled = remToggleEnabled;
  window.remStartEdit     = remStartEdit;
  window.remDelete        = remDelete;
`}function Sr(e=""){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#F3EBE2">
  <link rel="manifest" href="/manifest.json">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Karna">
  <title>Karna</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="/static/karna.css?v=7">
</head>
<body>
  <div id="app">
    <div style="height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;background:#F3EBE2;color:#8C8175;font-family:Inter,system-ui,sans-serif;text-align:center;padding:24px;">
      <div style="font-size:28px;font-weight:600;color:#2A2521;">Karna</div>
      <div style="font-size:14px;">Loading…</div>
      <noscript>
        <div style="color:#C0392B;font-size:14px;">JavaScript is required to use Karna.</div>
      </noscript>
    </div>
  </div>
  <div class="toast-container" id="toasts"></div>

  <script>window.__KARNA_API_BASE__ = ${JSON.stringify(e||"")};<\/script>
  <script>
${ro()}
${ao()}
${io()}
${oo()}
${co()}
${lo()}
${uo()}
${mo()}
${po()}
${ho()}
${fo()}
${go()}
${yo()}
${vo()}
${wo()}
${_o()}
${bo()}
  <\/script>
</body>
</html>`}function Eo(){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#F3EBE2">
  <title>Karna — Dashboard Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="/static/karna.css">
</head>
<body>
  <div id="app">
    <div class="topbar">
      <div class="topbar-left">
        <button class="topbar-btn" type="button" title="Chat history">&#9776;</button>
      </div>
      <div class="topbar-right">
        <button class="topbar-btn notif-btn" type="button" title="Schedule">&#128276;</button>
        <button class="topbar-btn topbar-icon-btn" type="button" title="Settings">
          <img class="nav-icon" src="/static/ui/nav-settings.png" alt="Settings">
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="dash-page">
        <div class="chat-area">
          <div class="dashboard dashboard--minimal">
            <div class="dash-greeting" id="dashGreeting">Good afternoon, Ashwin</div>
          </div>
        </div>

        <div class="dash-input-area">
          <div class="dash-input-wrap">
            <div class="dash-input-row">
              <textarea class="dash-input-field" placeholder="Message Karna&#8230;" rows="1"></textarea>
              <button type="button" class="dash-send-btn" title="Send" aria-label="Send">&#10148;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    (function () {
      var hour = new Date().getHours();
      var greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      var el = document.getElementById('dashGreeting');
      if (el) el.textContent = greeting + ', Ashwin';
    })();
  <\/script>
</body>
</html>`}const Qn="AES-GCM",To=256;async function kr(e){const t=new TextEncoder,n=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},n,{name:Qn,length:To},!1,["encrypt","decrypt"])}async function jt(e,t){const n=await kr(t),s=crypto.getRandomValues(new Uint8Array(12)),r=new TextEncoder,a=await crypto.subtle.encrypt({name:Qn,iv:s},n,r.encode(e)),i=new Uint8Array(s.length+new Uint8Array(a).length);return i.set(s),i.set(new Uint8Array(a),s.length),btoa(String.fromCharCode(...i))}async function G(e,t){const n=await kr(t),s=new Uint8Array(atob(e).split("").map(o=>o.charCodeAt(0))),r=s.slice(0,12),a=s.slice(12),i=await crypto.subtle.decrypt({name:Qn,iv:r},n,a);return new TextDecoder().decode(i)}async function _n(e){const n=new TextEncoder().encode(e+"karna-pin-salt"),s=await crypto.subtle.digest("SHA-256",n);return btoa(String.fromCharCode(...new Uint8Array(s)))}async function xr(e,t){return await _n(e)===t}const sn=Object.freeze(Object.defineProperty({__proto__:null,decrypt:G,encrypt:jt,hashPin:_n,verifyPin:xr},Symbol.toStringTag,{value:"Module"})),at=new xe;function Dr(e){return{id:e.id,username:e.username,name:e.name,assistant_name:e.assistant_name||"Karna"}}at.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});at.post("/setup",async e=>{const{username:t,name:n,pin:s,personality_prompt:r,timezone:a}=await e.req.json();if(!t||!n||!s)return e.json({error:"Username, name, and PIN are required"},400);if(s.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const o=await _n(s);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,n,o,r||"",a||"Asia/Kolkata").run();const c=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),l=crypto.randomUUID(),d=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(l,c.id,"web",d).run(),e.json({success:!0,sessionId:l,user:Dr(c)})});at.post("/login",async e=>{const{username:t,pin:n}=await e.req.json();if(!t||!n)return e.json({error:"Username and PIN required"},400);const s=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!s)return e.json({error:"User not found"},404);if(!await xr(n,s.pin_hash))return e.json({error:"Invalid PIN"},401);const a=crypto.randomUUID(),i=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(a,s.id,"web",i).run(),e.json({success:!0,sessionId:a,user:Dr(s)})});at.post("/logout",async e=>{var n;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});at.get("/users/hints",async e=>{const n=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(s=>{var r;return{username:s.username,name_hint:s.name.split(" ")[0],created:((r=s.created_at)==null?void 0:r.split(" ")[0])||""}});return e.json({users:n,count:n.length})});at.post("/reset-pin",async e=>{var o;const{username:t,name:n,new_pin:s}=await e.req.json();if(!t||!n||!s)return e.json({error:"Username, display name, and new PIN are required"},400);if(s.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const r=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!r)return e.json({error:"User not found"},404);if(r.name.toLowerCase().trim()!==n.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const a=await _n(s);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(a,r.id).run();const i=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(r.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(r.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((o=i.meta)==null?void 0:o.changes)||0})});at.get("/me",async e=>{var s;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.timezone, u.assistant_name
     FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return n?e.json({user:{id:n.uid,username:n.username,name:n.name,timezone:n.timezone,assistant_name:n.assistant_name||"Karna"}}):e.json({error:"Invalid or expired session"},401)});const Kt={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-6",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-6, claude-haiku-4-5",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4-6",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},Rs=12e4;function Rr(e,t){return Promise.race([e,new Promise((n,s)=>setTimeout(()=>s(new Error(`LLM timeout: ${t} did not respond within ${Rs/1e3} seconds. Try again or switch providers in Settings → Keys.`)),Rs))])}async function U(e,t,n,s,r,a={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,n,s,r,JSON.stringify(a)).run()}catch(i){console.error("Failed to log error:",i)}}async function Cn(e,t,n,s,r,a){try{const i=`provider_alert:${s}:${n}`;if(await e.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(t,i).first())return;await U(e,t,"provider_alert",i,`${s} failed: ${a.substring(0,200)}`,{alertType:n,failedProvider:s,fallbackProvider:r});let c;n==="all_providers_down"?c=`🚨 All LLM providers failed

Last error from ${s}: ${Ns(a)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:c=`⚠️ LLM Provider Issue

${s}: ${Ns(a)}
Switched to: ${r}

Check your ${s} API credit balance or key.`;const{decrypt:l}=await Promise.resolve().then(()=>sn),d=await e.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(t).first();if(!(d!=null&&d.telegram_chat_id))return;const u=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(t).first();if(!u)return;const p=await l(u.encrypted_value,d.pin_hash);await fetch(`https://api.telegram.org/bot${p}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d.telegram_chat_id,text:c})})}catch(i){console.error("Failed to send provider alert:",i)}}function Ns(e){return e.includes("credit balance")||e.includes("insufficient")||e.includes("402")?"Credits exhausted or balance too low":e.includes("429")||e.includes("rate_limit")||e.includes("quota")?"Rate limit / quota exceeded":e.includes("401")||e.includes("authentication")||e.includes("invalid")&&e.includes("key")?"API key invalid or expired":e.includes("403")?"Access denied (key may lack permissions)":e.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":e.includes("properties field not found")?"Schema compatibility issue":"API error"}class Nr{constructor(t,n="claude-sonnet-4-6",s="https://api.anthropic.com",r="anthropic"){H(this,"name");H(this,"apiKey");H(this,"model");H(this,"apiBase");this.apiKey=t,this.model=n,this.apiBase=s,this.name=r}async chat(t,n){var d,u,p,h,v,f;const s=t.find(g=>g.role==="system"),r=t.filter(g=>g.role!=="system"),a={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,messages:r.map(g=>({role:g.role,content:g.content})),cache_control:{type:"ephemeral"}};s&&(a.system=s.content),n!=null&&n.tools&&n.tools.length>0&&(a.tools=n.tools.map(g=>({name:g.name,description:g.description,input_schema:g.parameters})),n.toolChoice==="required"&&(a.tool_choice={type:"any"}));const i=await Rr(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(a)}),this.name);if(!i.ok){const g=await i.text();throw new Error(this.name+" API error "+i.status+": "+g)}const o=await i.json(),c=((d=o.content)==null?void 0:d.filter(g=>g.type==="text"))||[],l=((u=o.content)==null?void 0:u.filter(g=>g.type==="tool_use"))||[];return{content:c.map(g=>g.text).join(`
`),toolCalls:l.map(g=>({id:g.id,name:g.name,arguments:g.input})),usage:{promptTokens:((p=o.usage)==null?void 0:p.input_tokens)||0,completionTokens:((h=o.usage)==null?void 0:h.output_tokens)||0,cacheReadTokens:((v=o.usage)==null?void 0:v.cache_read_input_tokens)||0,cacheCreationTokens:((f=o.usage)==null?void 0:f.cache_creation_input_tokens)||0}}}async streamChat(t,n){const s=t.find(l=>l.role==="system"),r=t.filter(l=>l.role!=="system"),a={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,stream:!0,messages:r.map(l=>({role:l.role,content:l.content}))};s&&(a.system=s.content);const i=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(a)});if(!i.ok){const l=await i.text();throw new Error(this.name+" stream error "+i.status+": "+l)}const o=i.body.getReader(),c=new TextDecoder;return new ReadableStream({async pull(l){var v;const{done:d,value:u}=await o.read();if(d){l.close();return}const h=c.decode(u,{stream:!0}).split(`
`);for(const f of h)if(f.startsWith("data: ")){const g=f.slice(6);if(g==="[DONE]")continue;try{const w=JSON.parse(g);w.type==="content_block_delta"&&((v=w.delta)!=null&&v.text)&&l.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:w.delta.text})+`

`))}catch{}}}})}}function So(e){const t={},n=e||{};if(t.type=n.type||"object",t.type==="object"){const s=n.properties;if(s&&typeof s=="object"&&Object.keys(s).length>0){const r={};for(const[a,i]of Object.entries(s))i&&typeof i=="object"?r[a]=Fn(i):r[a]=i;t.properties=r}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(n.required)?t.required=n.required:t.required=[]}return n.description&&(t.description=n.description),t}function Fn(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const n=t.properties;if(n&&typeof n=="object"&&Object.keys(n).length>0){const s={};for(const[r,a]of Object.entries(n))a&&typeof a=="object"?s[r]=Fn(a):s[r]=a;t.properties=s}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=Fn(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class Ir{constructor(t,n,s,r){H(this,"name");H(this,"apiKey");H(this,"model");H(this,"apiBase");this.apiKey=t,this.model=n,this.apiBase=s.replace(/\/+$/,""),this.name=r}async chat(t,n){var c,l,d,u,p,h;const s={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,messages:t.map(v=>({role:v.role,content:v.content}))},r=this.apiBase.includes("routellm.abacus.ai");if(n!=null&&n.tools&&n.tools.length>0&&r)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");n!=null&&n.tools&&n.tools.length>0&&(s.tools=n.tools.map(v=>({type:"function",function:{name:v.name,description:v.description,parameters:So(v.parameters||{})}})),n.toolChoice==="required"&&(s.tool_choice="required"));const a=await Rr(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(s)}),this.name);if(!a.ok){const v=await a.text();throw new Error(this.name+" API error "+a.status+": "+v)}const i=await a.json(),o=(c=i.choices)==null?void 0:c[0];return{content:((l=o==null?void 0:o.message)==null?void 0:l.content)||"",toolCalls:(u=(d=o==null?void 0:o.message)==null?void 0:d.tool_calls)==null?void 0:u.map(v=>({id:v.id,name:v.function.name,arguments:(()=>{try{return typeof v.function.arguments=="string"?JSON.parse(v.function.arguments||"{}"):v.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((p=i.usage)==null?void 0:p.prompt_tokens)||0,completionTokens:((h=i.usage)==null?void 0:h.completion_tokens)||0}}}async streamChat(t,n){const s={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,stream:!0,messages:t.map(o=>({role:o.role,content:o.content}))},r=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(s)});if(!r.ok){const o=await r.text();throw new Error(this.name+" stream error "+r.status+": "+o)}const a=r.body.getReader(),i=new TextDecoder;return new ReadableStream({async pull(o){var p,h,v;const{done:c,value:l}=await a.read();if(c){o.close();return}const u=i.decode(l,{stream:!0}).split(`
`);for(const f of u)if(f.startsWith("data: ")){const g=f.slice(6);if(g==="[DONE]")continue;try{const T=(v=(h=(p=JSON.parse(g).choices)==null?void 0:p[0])==null?void 0:h.delta)==null?void 0:v.content;T&&o.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:T})+`

`))}catch{}}}})}}function Wn(e,t,n,s){const r=Kt[e];if(!r)throw new Error(`Unknown LLM provider: ${e}`);const a=s||r.defaultModel;return r.apiFormat==="anthropic"?new Nr(t,a,r.apiBase,n):new Ir(t,a,r.apiBase,n)}class Cr{constructor(){H(this,"errorLog",new Map);H(this,"usageLog",new Map)}async pickProvider(t){const n=Date.now(),s=t.filter(r=>{const a=this.errorLog.get(r);return a?a.cooldownUntil<=n:!0});return s.length>0?s[0]:null}async recordUsage(t,n){const s=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:s.tokens+n,requests:s.requests+1})}async recordError(t,n,s=5){this.errorLog.set(t,{error:n,cooldownUntil:Date.now()+s*60*1e3})}}const ko=["llm_slot_1","llm_slot_2","llm_slot_3"],xo=["anthropic","openai"];async function it(e,t,n){const{decrypt:s}=await Promise.resolve().then(()=>sn),r=new Cr,a=[];for(const u of ko){const p=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,u).first();if(p)try{const h=await s(p.encrypted_value,n),v=JSON.parse(h);if(v.provider&&v.apiKey&&Kt[v.provider]){const g=v.provider,w=Wn(v.provider,v.apiKey,g,v.model);a.push({name:g,provider:w})}}catch(h){console.error(`Failed to load ${u}:`,h)}}const i=new Set(a.map(u=>u.name));for(const u of xo){if(i.has(u))continue;const p=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,u).first();if(p)try{const h=await s(p.encrypted_value,n);if(Kt[u]){const f=Wn(u,h,u);a.push({name:u,provider:f})}}catch{console.error(`Failed to decrypt legacy ${u} key`)}}if(a.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const o=a.map(u=>u.name),c=await r.pickProvider(o);if(!c)return console.warn("All providers in cooldown, using first available"),{provider:a[0].provider,rotation:r};const l=a.find(u=>u.name===c);return{provider:Do(l.provider,a,r,e,t),rotation:r}}function Do(e,t,n,s,r){const a=o=>o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")||o.includes("TOOLS_UNSUPPORTED"),i=o=>o.includes("429")||o.toLowerCase().includes("rate limit")||o.toLowerCase().includes("too many requests");return t.length<=1?{name:e.name,async chat(o,c){try{return await e.chat(o,c)}catch(l){const d=l.message||"";throw a(d)&&!d.includes("TOOLS_UNSUPPORTED")&&Cn(s,r,"all_providers_down",e.name,null,d),l}},async streamChat(o,c){return await e.streamChat(o,c)}}:{name:e.name,async chat(o,c){try{return await e.chat(o,c)}catch(l){const d=l.message||"",u=i(d);if(!a(d)&&!u)throw l;const p=d.includes("TOOLS_UNSUPPORTED"),h=p?1:u?10:1440;console.warn(`Provider ${e.name} ${u?"rate limited":p?"tools unsupported":"auth/billing error"}, trying fallback...`),await n.recordError(e.name,d,h);const v=t.filter(f=>f.name!==e.name);for(const f of v)try{const g=await f.provider.chat(o,c);return this.name=f.name,!p&&!u&&Cn(s,r,"provider_switched",e.name,f.name,d),g}catch(g){const w=g.message||"";if(a(w)||i(w)){await n.recordError(f.name,w,i(w)?10:1440);continue}throw g}throw Cn(s,r,"all_providers_down",e.name,null,d),new Error(`All LLM providers failed. Primary (${e.name}): ${d.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(o,c){return await e.streamChat(o,c)}}}const Nt=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:Nr,OpenAICompatibleProvider:Ir,ProviderRotation:Cr,createProviderFromConfig:Wn,createRotatingProvider:it,logError:U},Symbol.toStringTag,{value:"Module"})),Ro={episodic:30,semantic:365,procedural:180,summary:90,fact:365,preference:180,decision:365,context:30,task:60},No=90,Io=1e3*60*60*24;function Co(e,t){const n=typeof e=="string"?new Date(e).getTime():e.getTime(),s=new Date().getTime();return Math.max(0,(s-n)/Io)}function Oo(e,t,n,s){const r=Ro[e]??No,a=Co(n),i=Math.exp(-a/r)*(t/10);return Math.min(1,Math.max(0,i))}async function Ao(e,t,n=.1){var d;const s=new Date().toISOString(),a=(await e.prepare(`SELECT * FROM memory
     WHERE user_id = ? AND decay_score < ? AND valid_until IS NULL
     ORDER BY type, last_accessed_at ASC`).bind(t,n).all()).results||[];if(a.length===0)return{compactedCount:0,summaryIds:[],freedImportance:0};const i=new Map;for(const u of a){const p=i.get(u.type)??[];p.push(u),i.set(u.type,p)}let o=0,c=0;const l=[];for(const[u,p]of i){const h=`Compacted ${u} memories (${p.length} entries)`,v=p.map(T=>`• ${T.title}: ${T.content.slice(0,200)}`).join(`
`),f=Math.max(...p.map(T=>T.importance)),w=(d=(await e.prepare(`INSERT INTO memory (user_id, type, title, content, importance, tier, source, decay_score, last_accessed_at)
       VALUES (?, 'summary', ?, ?, ?, 'long_term', 'compaction', 1.0, CURRENT_TIMESTAMP)`).bind(t,h,v,f).run()).meta)==null?void 0:d.last_row_id;l.push(w);for(const T of p)await e.prepare("UPDATE memory SET valid_until = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,T.id,t).run(),c+=T.importance;o+=p.length}return{compactedCount:o,summaryIds:l,freedImportance:c}}var Is={};const Lo="@cf/baai/bge-small-en-v1.5";function es(){const e=(Is.CLOUDFLARE_ACCOUNT_ID??"").trim(),t=(Is.CLOUDFLARE_D1_API_TOKEN??"").trim();return!e||!t?null:{accountId:e,apiToken:t}}async function Or(e){var a;const t=es();if(!t)throw new Error("CF credentials not configured (CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_D1_API_TOKEN)");const n=`https://api.cloudflare.com/client/v4/accounts/${t.accountId}/ai/run/${Lo}`,s=await fetch(n,{method:"POST",headers:{Authorization:`Bearer ${t.apiToken}`,"Content-Type":"application/json"},body:JSON.stringify({text:e})});if(!s.ok){const i=await s.text().catch(()=>"");throw new Error(`CF Workers AI error ${s.status}: ${i}`)}const r=await s.json();if(!r.success||!((a=r.result)!=null&&a.data))throw new Error("CF Workers AI returned unexpected response shape");return r.result.data}async function yn(e){if(!es())return null;const[t]=await Or([e]);return t}async function Mo(e){return e.length===0?[]:es()?Or(e):e.map(()=>null)}function Ar(e,t){if(e.length!==t.length||e.length===0)return 0;let n=0,s=0,r=0;for(let a=0;a<e.length;a++)n+=e[a]*t[a],s+=e[a]*e[a],r+=t[a]*t[a];return s===0||r===0?0:n/(Math.sqrt(s)*Math.sqrt(r))}function On(e){return JSON.stringify(e)}function Lr(e){if(!e)return null;try{return JSON.parse(e)}catch{return null}}const $o=.55,Po=.25,jo=.2;function Uo(e,t){const n=new Set(e.toLowerCase().split(/\W+/).filter(a=>a.length>2)),s=t.toLowerCase();if(n.size===0)return 0;let r=0;for(const a of n)s.includes(a)&&r++;return r/n.size}async function Bo(e,t,n,s={}){const{limit:r=10,type:a,minFinalScore:i=0,candidateMultiplier:o=5}=s,c=Math.max(r*o,50),l=a?" AND type = ?":"",d=[t,`%${n}%`,`%${n}%`];a&&d.push(a),d.push(c);let p=(await e.prepare(`SELECT * FROM memory
     WHERE user_id = ? AND valid_until IS NULL
       AND (title LIKE ? OR content LIKE ?)${l}
     ORDER BY decay_score DESC LIMIT ?`).bind(...d).all()).results??[];if(p.length<Math.ceil(c/2)){const f=[t];a&&f.push(a),f.push(c);const g=await e.prepare(`SELECT * FROM memory
       WHERE user_id = ? AND valid_until IS NULL${l}
       ORDER BY decay_score DESC LIMIT ?`).bind(...f).all(),w=new Set(p.map(T=>T.id));for(const T of g.results??[])w.has(T.id)||(p.push(T),w.add(T.id))}if(p.length===0)return[];const h=await yn(n),v=[];for(const f of p){const g=Lr(f.embedding),w=h&&g?Ar(h,g):0,T=Uo(n,`${f.title} ${f.content}`),x=Math.max(T,f.title.toLowerCase().includes(n.toLowerCase())?1:0),A=f.decay_score??1,N=(f.importance??5)/10,$=($o*w+Po*x+jo*A)*N;$>=i&&v.push({memory:f,vectorScore:w,keywordScore:x,decayScore:A,finalScore:$})}return v.sort((f,g)=>g.finalScore-f.finalScore),v.slice(0,r)}async function Ho(e,t,n,s={}){const{limit:r=10,type:a}=s,i=a?" AND type = ?":"",o=[t];a&&o.push(a),o.push(r*5);const c=await e.prepare(`SELECT * FROM memory
     WHERE user_id = ? AND valid_until IS NULL AND embedding IS NOT NULL${i}
     ORDER BY decay_score DESC LIMIT ?`).bind(...o).all(),l=await yn(n);if(!l)return[];const d=[];for(const u of c.results??[]){const p=Lr(u.embedding);if(!p)continue;const h=Ar(l,p),v=u.decay_score??1;d.push({memory:u,vectorScore:h,keywordScore:0,decayScore:v,finalScore:h*((u.importance??5)/10)})}return d.sort((u,p)=>p.finalScore-u.finalScore),d.slice(0,r)}const An=20,Fo=2e3,Wo=2e3,Mr=4,qo=1e3;function Go(e){return Math.ceil(e.length/Mr)}function qn(e,t){const n=t*Mr;return e.length<=n?e:e.slice(0,n)+`
[...truncated to fit token budget]`}async function ts(e,t){try{const s=(await e.prepare(`SELECT title, content FROM notes
       WHERE user_id = ? AND is_pinned = 1
       ORDER BY updated_at DESC LIMIT 10`).bind(t).all()).results||[];if(s.length===0)return"";const r=`## Pinned Notes
`+s.map(a=>`- **${a.title||"Note"}**: ${(a.content||"").slice(0,300)}`).join(`
`);return qn(r,qo)}catch{return""}}class Q{constructor(t){this.db=t}async store(t,n,s,r,a=5,i="working"){var l;const o=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,n,s).first();let c=null;if(o?(await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r,a,i,o.id).run(),c=o.id):c=((l=(await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,n,s,r,a,i).run()).meta)==null?void 0:l.last_row_id)??null,c!==null)try{const d=await yn(`${s} ${r}`);d&&await this.db.prepare("UPDATE memory SET embedding = ? WHERE id = ?").bind(On(d),c).run()}catch{}i==="working"&&await this.enforceWorkingMemoryCap(t)}async cleanupDoneTasks(t){await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND type = 'task' AND status = 'done' AND tier = 'working'
       AND updated_at < datetime('now', '-7 days')`).bind(t).run()}async enforceWorkingMemoryCap(t){const n=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((n==null?void 0:n.cnt)||0)>An){const s=((n==null?void 0:n.cnt)||0)-An;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND tier = 'working' AND importance < 8 AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' AND importance < 8
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,s).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,An).all()).results||[]}async getAll(t,n,s=50){return n?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,n,s).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,s).all()).results||[]}async search(t,n,s=10){return this.searchMemoryByTier(t,n,s)}async searchLongTerm(t,n,s=5){return this.searchMemoryByTier(t,n,s,"long_term")}async searchMemoryByTier(t,n,s,r){const a=r?" AND tier = ?":"",i=(h,v)=>r?[t,r,h,h,v]:[t,h,h,v],c=(await this.db.prepare(`SELECT * FROM memory WHERE user_id = ?${a} AND (title LIKE ? OR content LIKE ?)
       ORDER BY COALESCE(decay_score, 1.0) * (importance / 10.0) DESC LIMIT ?`).bind(...i(`%${n}%`,s)).all()).results||[];if(c.length>0)return await this.touchMemories(t,c.map(h=>h.id)),c;const l=n.split(/\s+/).filter(h=>h.length>2);if(l.length===0)return[];const d=new Map,u=new Map;for(const h of l){const v=await this.db.prepare(`SELECT * FROM memory WHERE user_id = ?${a} AND (title LIKE ? OR content LIKE ?) LIMIT ?`).bind(...i(`%${h}%`,s*2)).all();for(const f of v.results||[])d.set(f.id,(d.get(f.id)||0)+1),u.set(f.id,f)}const p=[...u.values()].sort((h,v)=>{const f=(d.get(h.id)||0)*(h.decay_score??1);return(d.get(v.id)||0)*(v.decay_score??1)-f}).slice(0,s);return p.length>0&&await this.touchMemories(t,p.map(h=>h.id)),p}async touchMemories(t,n){for(const s of n)await this.db.prepare("UPDATE memory SET updated_at = CURRENT_TIMESTAMP, last_accessed_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t).run()}async update(t,n,s){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t,n).run()}async promote(t,n){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,n).run(),await this.enforceWorkingMemoryCap(n)}async demote(t,n){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,n).run()}async remove(t,n){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,n).run()}async buildContext(t){const n=await this.getWorkingMemory(t);if(n.length===0)return"";const s={};for(const a of n)s[a.type]||(s[a.type]=[]),s[a.type].push(a);let r=`
## Working Memory (Active Context)
`;for(const[a,i]of Object.entries(s)){r+=`
### ${a.charAt(0).toUpperCase()+a.slice(1)}s
`;for(const o of i)r+=`- **${o.title}**: ${o.content}
`}return qn(r,Fo)}static truncatePersonality(t){return qn(t,Wo)}async getRecentConversations(t,n=20,s){return s?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,s,n).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,n).all()).results||[]).reverse()}async storeMessage(t,n,s,r,a="{}",i){var l;const o=Go(r);let c;i?c=await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,n,s,r,a,o,i).run():c=await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,n,s,r,a,o).run();try{const d=Number(((l=c.meta)==null?void 0:l.last_row_id)??0),u=i??d,{extractSignal:p}=await Promise.resolve().then(()=>gu),h=p(t,u,s,r,d,new Date().toISOString());await this.db.prepare(`INSERT INTO signals (user_id, conversation_id, role, intent, entities, topic, importance, emotional_tone, raw_ref, occurred_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(h.user_id,h.conversation_id,h.role,h.intent,JSON.stringify(h.entities),h.topic,h.importance,h.emotional_tone??null,h.raw_ref,h.occurred_at).run();const v=await this.db.prepare("SELECT COUNT(*) as cnt FROM signals WHERE user_id = ?").bind(t).first();((v==null?void 0:v.cnt)??0)%10===0&&Promise.resolve().then(()=>jn).then(({compressShortTermMemory:f})=>{f(this,this.db,t).catch(()=>{})}).catch(()=>{})}catch{}}async recomputeDecayScores(t){const s=(await this.db.prepare("SELECT id, type, importance, last_accessed_at FROM memory WHERE user_id = ?").bind(t).all()).results||[];if(s.length===0)return 0;for(const r of s){const a=Oo(r.type,r.importance,r.last_accessed_at??new Date().toISOString());await this.db.prepare("UPDATE memory SET decay_score = ? WHERE id = ? AND user_id = ?").bind(a,r.id,t).run()}return s.length}async compactLowScoreMemories(t,n=.1){return Ao(this.db,t,n)}async getByDecayScore(t,n,s){const r=(s==null?void 0:s.limit)??20,a=[t,n];let i="";return s!=null&&s.type&&(i=" AND type = ?",a.push(s.type)),a.push(r),(await this.db.prepare(`SELECT * FROM memory
       WHERE user_id = ? AND decay_score >= ? AND valid_until IS NULL${i}
       ORDER BY decay_score DESC LIMIT ?`).bind(...a).all()).results||[]}async storeTyped(t){var g;const{userId:n,type:s,title:r,content:a,importance:i=5,occurredAt:o=new Date().toISOString(),validUntil:c=null,source:l="user",entities:d=[],tier:u="long_term"}=t,p=JSON.stringify(d),h=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ? AND valid_until IS NULL").bind(n,s,r).first();h&&await this.supersede(h.id,n,new Date().toISOString());const f=(g=(await this.db.prepare(`INSERT INTO memory (user_id, type, title, content, importance, tier, occurred_at, valid_until, source, entities)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(n,s,r,a,i,u,o,c,l,p).run()).meta)==null?void 0:g.last_row_id;try{const w=await yn(`${r} ${a}`);w&&await this.db.prepare("UPDATE memory SET embedding = ? WHERE id = ?").bind(On(w),f).run()}catch{}return f}async findByType(t,n,s){const r=(s==null?void 0:s.limit)??20,a=[t,n];let i="";return s!=null&&s.from&&(i+=" AND occurred_at >= ?",a.push(s.from)),s!=null&&s.to&&(i+=" AND occurred_at <= ?",a.push(s.to)),a.push(r),(await this.db.prepare(`SELECT * FROM memory
       WHERE user_id = ? AND type = ? AND valid_until IS NULL${i}
       ORDER BY occurred_at DESC LIMIT ?`).bind(...a).all()).results||[]}async recallAt(t,n,s,r=10){return(await this.db.prepare(`SELECT * FROM memory
       WHERE user_id = ?
         AND occurred_at <= ?
         AND (title LIKE ? OR content LIKE ?)
       ORDER BY occurred_at DESC, importance DESC
       LIMIT ?`).bind(t,n,`%${s}%`,`%${s}%`,r).all()).results||[]}async supersede(t,n,s){await this.db.prepare("UPDATE memory SET valid_until = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t,n).run()}async searchHybrid(t,n,s){return Bo(this.db,t,n,s)}async searchSemantic(t,n,s){return Ho(this.db,t,n,s)}async backfillEmbeddings(t,n=20){const r=(await this.db.prepare("SELECT id, title, content FROM memory WHERE user_id = ? AND embedding IS NULL LIMIT ?").bind(t,n).all()).results??[];if(r.length===0)return 0;const a=r.map(o=>`${o.title} ${o.content}`);let i;try{i=await Mo(a)}catch{return 0}for(let o=0;o<r.length;o++){const c=i[o];c&&await this.db.prepare("UPDATE memory SET embedding = ? WHERE id = ? AND user_id = ?").bind(On(c),r[o].id,t).run()}return r.length}async getRecentSignals(t,n=20){const{getRecentSignals:s}=await Promise.resolve().then(()=>jn);return s(this.db,t,n)}async triggerCompression(t){const{compressShortTermMemory:n}=await Promise.resolve().then(()=>jn);return n(this,this.db,t)}async searchWithConfidence(t,n,s){const{searchWithConfidence:r}=await Promise.resolve().then(()=>Ye);return r(this,t,n,s)}async compactHistory(t,n=30){const s=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((s==null?void 0:s.cnt)||0)<=n*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,n).run()}}const $r=Object.freeze(Object.defineProperty({__proto__:null,MemoryService:Q,buildNotesContext:ts},Symbol.toStringTag,{value:"Module"})),zo="https://accounts.google.com/o/oauth2/v2/auth",Pr="https://oauth2.googleapis.com/token",Ko="https://www.googleapis.com/oauth2/v2/userinfo",Yo=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let He=null;async function Gn(e,t,n){const s=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!s)return null;try{const r=await G(s.encrypted_value,n);return JSON.parse(r)}catch{return null}}async function Jo(e,t,n,s){const r=await jt(JSON.stringify(s),n);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,r).run()}function jr(e,t,n){const s=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:Yo,access_type:"offline",prompt:"consent",state:n,include_granted_scopes:"true"});return`${zo}?${s}`}async function Ur(e,t,n,s){const r=await fetch(Pr,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:n,redirect_uri:s,grant_type:"authorization_code"})}),a=await r.text();if(!r.ok)throw new Error(`Token exchange failed (${r.status}): ${a.substring(0,300)}`);return JSON.parse(a)}async function Vo(e,t,n){const s=await fetch(Pr,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:n,grant_type:"refresh_token"})}),r=await s.text();if(!s.ok)throw s.status===400||s.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${s.status}): ${r.substring(0,300)}`);return JSON.parse(r)}async function Br(e){const t=await fetch(Ko,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function Bt(e,t,n,s,r){if(!s||!r)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(He&&He.userId===t&&He.expiresAt>Date.now()/1e3+60){const o=await Gn(e,t,n);return{token:He.token,email:(o==null?void 0:o.email)||"unknown"}}const a=await Gn(e,t,n);if(!a)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const i=await Vo(a.refresh_token,s,r);return He={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{token:i.access_token,email:a.email}}async function ns(e,t,n){try{const s=await Gn(e,t,n);return s?{connected:!0,email:s.email,connectedAt:s.connected_at}:{connected:!1}}catch{return{connected:!1}}}function Hr(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function Fr(e,t,n,s,r,a,i){const o=await Ur(s,a,i,r);if(!o.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const c=await Br(o.access_token),l={refresh_token:o.refresh_token,email:c.email,name:c.name,connected_at:new Date().toISOString()};return await Jo(e,t,n,l),He={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{email:c.email,name:c.name}}async function Wr(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(He==null?void 0:He.userId)===t&&(He=null)}const ot="https://sheets.googleapis.com/v4/spreadsheets";class qr{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Bt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,n){const s=await this.authHeaders(),r=encodeURIComponent(n),a=await fetch(`${ot}/${t}/values/${r}`,{headers:s});if(!a.ok){const o=await a.text();throw new Error(`Sheets read failed (${a.status}): ${o}`)}return(await a.json()).values||[]}async writeRange(t,n,s){const r=await this.authHeaders(),a=encodeURIComponent(n),i=await fetch(`${ot}/${t}/values/${a}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:r,body:JSON.stringify({range:n,majorDimension:"ROWS",values:s})});if(!i.ok){const c=await i.text();throw new Error(`Sheets write failed (${i.status}): ${c}`)}return{updatedCells:(await i.json()).updatedCells||0}}async appendRows(t,n,s){var c;const r=await this.authHeaders(),a=encodeURIComponent(n),i=await fetch(`${ot}/${t}/values/${a}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:r,body:JSON.stringify({range:n,majorDimension:"ROWS",values:s})});if(!i.ok){const l=await i.text();throw new Error(`Sheets append failed (${i.status}): ${l}`)}return{updatedCells:((c=(await i.json()).updates)==null?void 0:c.updatedCells)||s.length}}async deleteRow(t,n,s){const r=await this.authHeaders(),a=await fetch(`${ot}/${t}?fields=sheets.properties`,{headers:r});if(!a.ok){const u=await a.text();throw new Error(`Failed to get sheet metadata (${a.status}): ${u}`)}const i=await a.json(),o=i.sheets.find(u=>u.properties.title===n);if(!o){const u=i.sheets.map(p=>p.properties.title).join(", ");throw new Error(`Tab "${n}" not found. Available tabs: ${u}`)}const c=o.properties.sheetId,l=s-1,d=await fetch(`${ot}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{deleteDimension:{range:{sheetId:c,dimension:"ROWS",startIndex:l,endIndex:l+1}}}]})});if(!d.ok){const u=await d.text();throw new Error(`Row delete failed (${d.status}): ${u}`)}}async createSpreadsheet(t,n){const s=await this.authHeaders(),r={properties:{title:t},sheets:n&&n.length>0?n.map(o=>({properties:{title:o}})):[{properties:{title:"Sheet1"}}]},a=await fetch(ot,{method:"POST",headers:s,body:JSON.stringify(r)});if(!a.ok){const o=await a.text();throw new Error(`Sheets create failed (${a.status}): ${o}`)}const i=await a.json();return{spreadsheetId:i.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${i.spreadsheetId}/edit`}}async getMetadata(t){const n=await this.authHeaders(),s=await fetch(`${ot}/${t}?fields=properties.title,sheets.properties.title`,{headers:n});if(!s.ok){const a=await s.text();throw new Error(`Sheets metadata failed (${s.status}): ${a}`)}const r=await s.json();return{title:r.properties.title,sheets:r.sheets.map(a=>a.properties.title)}}}const Ft="https://www.googleapis.com/calendar/v3";class bn{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Bt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",n={}){const s=await this.authHeaders(),r=new URLSearchParams;n.timeMin&&r.set("timeMin",n.timeMin),n.timeMax&&r.set("timeMax",n.timeMax),r.set("maxResults",String(n.maxResults||20)),r.set("singleEvents","true"),r.set("orderBy","startTime"),n.query&&r.set("q",n.query);const a=await fetch(`${Ft}/calendars/${encodeURIComponent(t)}/events?${r}`,{headers:s});if(!a.ok){const o=await a.text();throw new Error(`Calendar list failed (${a.status}): ${o}`)}return(await a.json()).items||[]}async createEvent(t="primary",n){var o;const s=await this.authHeaders(),r=n.timeZone||"Asia/Kolkata",a={summary:n.summary,description:n.description||"",location:n.location||"",start:{dateTime:n.startDateTime,timeZone:r},end:{dateTime:n.endDateTime,timeZone:r}};(o=n.attendees)!=null&&o.length&&(a.attendees=n.attendees.map(c=>({email:c})));const i=await fetch(`${Ft}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:s,body:JSON.stringify(a)});if(!i.ok){const c=await i.text();throw new Error(`Calendar create failed (${i.status}): ${c}`)}return await i.json()}async updateEvent(t="primary",n,s){const r=await this.authHeaders(),a=s.timeZone||"Asia/Kolkata",i={};s.summary&&(i.summary=s.summary),s.description&&(i.description=s.description),s.location&&(i.location=s.location),s.startDateTime&&(i.start={dateTime:s.startDateTime,timeZone:a}),s.endDateTime&&(i.end={dateTime:s.endDateTime,timeZone:a});const o=await fetch(`${Ft}/calendars/${encodeURIComponent(t)}/events/${n}`,{method:"PATCH",headers:r,body:JSON.stringify(i)});if(!o.ok){const c=await o.text();throw new Error(`Calendar update failed (${o.status}): ${c}`)}return await o.json()}async deleteEvent(t="primary",n){const s=await this.authHeaders(),r=await fetch(`${Ft}/calendars/${encodeURIComponent(t)}/events/${n}`,{method:"DELETE",headers:s});if(!r.ok&&r.status!==410){const a=await r.text();throw new Error(`Calendar delete failed (${r.status}): ${a}`)}}async listCalendars(){const t=await this.authHeaders(),n=await fetch(`${Ft}/users/me/calendarList`,{headers:t});if(!n.ok){const r=await n.text();throw new Error(`Calendar list calendars failed (${n.status}): ${r}`)}return((await n.json()).items||[]).map(r=>({id:r.id,summary:r.summary,primary:r.primary||!1}))}}const Fe="https://docs.googleapis.com/v1/documents",Zo="https://www.googleapis.com/drive/v3/files";function Cs(e){const t=[];for(const n of e.split(`
`)){const s=n.trim();if(s===""||/^---+$/.test(s))continue;let r="NORMAL_TEXT",a=n;const i=s.match(/^###\s+(.+)/),o=!i&&s.match(/^##\s+(.+)/),c=!i&&!o&&s.match(/^#\s+(.+)/);i?(r="HEADING_3",a=i[1]):o?(r="HEADING_2",a=o[1]):c?(r="HEADING_1",a=c[1]):/^\s*[-*]\s/.test(n)&&(a="• "+n.replace(/^\s*[-*]\s+/,""));const{text:l,spans:d}=Xo(a);t.push({text:l,namedStyle:r,spans:d})}return t}function Xo(e){const t=[];let n="",s=0;for(;s<e.length;)if(e[s]==="*"&&e[s+1]==="*"){const r=e.indexOf("**",s+2);if(r!==-1){const a=n.length;n+=e.substring(s+2,r),t.push({start:a,end:n.length,bold:!0}),s=r+2}else n+=e[s++]}else if(e[s]==="_"&&e[s+1]==="_"){const r=e.indexOf("__",s+2);if(r!==-1){const a=n.length;n+=e.substring(s+2,r),t.push({start:a,end:n.length,bold:!0}),s=r+2}else n+=e[s++]}else if(e[s]==="*"&&e[s+1]!=="*"){const r=e.indexOf("*",s+1);if(r!==-1){const a=n.length;n+=e.substring(s+1,r),t.push({start:a,end:n.length,italic:!0}),s=r+1}else n+=e[s++]}else if(e[s]==="_"){const r=e.indexOf("_",s+1);if(r!==-1){const a=n.length;n+=e.substring(s+1,r),t.push({start:a,end:n.length,italic:!0}),s=r+1}else n+=e[s++]}else n+=e[s++];return{text:n,spans:t}}class Gr{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Bt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const n=await this.authHeaders(),s=await fetch(Fe,{method:"POST",headers:n,body:JSON.stringify({title:t})});if(!s.ok){const a=await s.text();throw new Error(`Docs create failed (${s.status}): ${a}`)}const r=await s.json();return{documentId:r.documentId,url:`https://docs.google.com/document/d/${r.documentId}/edit`}}async readDocument(t){var i,o;const n=await this.authHeaders(),s=await fetch(`${Fe}/${t}`,{headers:n});if(!s.ok){const c=await s.text();throw new Error(`Docs read failed (${s.status}): ${c}`)}const r=await s.json();let a="";for(const c of((i=r.body)==null?void 0:i.content)||[])if(c.paragraph)for(const l of c.paragraph.elements)(o=l.textRun)!=null&&o.content&&(a+=l.textRun.content);return{title:r.title,content:a.trim()}}async rewriteDocument(t,n){var v;const s=await this.authHeaders(),r=await fetch(`${Fe}/${t}`,{headers:s});if(!r.ok){const f=await r.text();throw new Error(`Docs fetch failed (${r.status}): ${f.substring(0,200)}`)}const i=((v=(await r.json()).body)==null?void 0:v.content)||[],o=i[i.length-1],c=(o==null?void 0:o.endIndex)??2,l=Cs(n),d=[];if(c>2&&d.push({deleteContentRange:{range:{startIndex:1,endIndex:c-1}}}),l.length===0){d.length>0&&await fetch(`${Fe}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:d})});return}let u="";const p=[];for(const f of l){const g=u.length;u+=f.text+`
`,p.push({start:g,end:u.length,namedStyle:f.namedStyle,spans:f.spans})}d.push({insertText:{location:{index:1},text:u}});for(const f of p){f.namedStyle!=="NORMAL_TEXT"&&d.push({updateParagraphStyle:{range:{startIndex:1+f.start,endIndex:1+f.end},paragraphStyle:{namedStyleType:f.namedStyle},fields:"namedStyleType"}});for(const g of f.spans){const w={},T=[];g.bold&&(w.bold=!0,T.push("bold")),g.italic&&(w.italic=!0,T.push("italic")),T.length>0&&d.push({updateTextStyle:{range:{startIndex:1+f.start+g.start,endIndex:1+f.start+g.end},textStyle:w,fields:T.join(",")}})}}const h=await fetch(`${Fe}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:d})});if(!h.ok){const f=await h.text();throw new Error(`Docs rewrite failed (${h.status}): ${f.substring(0,200)}`)}}async appendFormattedContent(t,n){var v;const s=await this.authHeaders(),r=Cs(n);if(r.length===0)return;const a=await fetch(`${Fe}/${t}`,{headers:s});if(!a.ok){const f=await a.text();throw new Error(`Docs fetch failed (${a.status}): ${f.substring(0,200)}`)}const o=((v=(await a.json()).body)==null?void 0:v.content)||[],c=o[o.length-1],l=Math.max(1,((c==null?void 0:c.endIndex)??2)-1);let d="";const u=[];for(const f of r){const g=d.length;d+=f.text+`
`,u.push({start:g,end:d.length,namedStyle:f.namedStyle,spans:f.spans})}const p=[{insertText:{location:{index:l},text:d}}];for(const f of u){f.namedStyle!=="NORMAL_TEXT"&&p.push({updateParagraphStyle:{range:{startIndex:l+f.start,endIndex:l+f.end},paragraphStyle:{namedStyleType:f.namedStyle},fields:"namedStyleType"}});for(const g of f.spans){const w={},T=[];g.bold&&(w.bold=!0,T.push("bold")),g.italic&&(w.italic=!0,T.push("italic")),T.length>0&&p.push({updateTextStyle:{range:{startIndex:l+f.start+g.start,endIndex:l+f.start+g.end},textStyle:w,fields:T.join(",")}})}}const h=await fetch(`${Fe}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:p})});if(!h.ok){const f=await h.text();throw new Error(`Docs append failed (${h.status}): ${f.substring(0,200)}`)}}async appendText(t,n){const s=await this.authHeaders(),r=await fetch(`${Fe}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:[{insertText:{endOfSegmentLocation:{},text:n}}]})});if(!r.ok){const a=await r.text();throw new Error(`Docs append failed (${r.status}): ${a}`)}}async deleteContent(t,n){var i,o,c;const s=await this.authHeaders(),r=await fetch(`${Fe}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:[{replaceAllText:{containsText:{text:n,matchCase:!0},replaceText:""}}]})});if(!r.ok){const l=await r.text();throw new Error(`Docs delete content failed (${r.status}): ${l.substring(0,200)}`)}return{occurrencesRemoved:((c=(o=(i=(await r.json()).replies)==null?void 0:i[0])==null?void 0:o.replaceAllText)==null?void 0:c.occurrencesChanged)??0}}async shareDocument(t,n,s="writer"){const r=await this.authHeaders(),a=await fetch(`${Zo}/${t}/permissions`,{method:"POST",headers:r,body:JSON.stringify({type:"user",role:s,emailAddress:n})});if(!a.ok){const i=await a.text();throw new Error(`Share failed (${a.status}): ${i}`)}}}class Se{constructor(t,n,s,r,a){H(this,"sheets");H(this,"calendar");H(this,"docs");H(this,"db");H(this,"userId");H(this,"pinHash");this.db=t,this.userId=n,this.pinHash=s,this.sheets=new qr(t,n,s,r,a),this.calendar=new bn(t,n,s,r,a),this.docs=new Gr(t,n,s,r,a)}async isConnected(){return ns(this.db,this.userId,this.pinHash)}}const ct=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:bn,GoogleDocs:Gr,GoogleServices:Se,GoogleSheets:qr,completeOAuthFlow:Fr,disconnectGoogle:Wr,exchangeCodeForTokens:Ur,fetchUserInfo:Br,generateAuthUrl:jr,getGoogleAuth:Bt,isGoogleConnected:ns,isOAuthClientConfigured:Hr},Symbol.toStringTag,{value:"Module"}));async function zr(e,t,n={}){const s={textQuery:t,languageCode:"en",pageSize:8};if(n.type&&(s.includedType=n.type),n.location){const c=n.location.split(",").map(Number);c.length===2&&!isNaN(c[0])&&!isNaN(c[1])&&(s.locationBias={circle:{center:{latitude:c[0],longitude:c[1]},radius:n.radius||5e3}})}const r=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),a=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":r},body:JSON.stringify(s)});if(!a.ok){const c=await a.text();return{results:[],error:`Places API error (${a.status}): ${c.substring(0,200)}`}}const i=await a.json();return!i.places||i.places.length===0?{results:[]}:{results:i.places.map(c=>{var l,d,u;return{name:((l=c.displayName)==null?void 0:l.text)||"",address:c.formattedAddress||"",rating:c.rating,userRatingsTotal:c.userRatingCount,priceLevel:c.priceLevel,openNow:(d=c.currentOpeningHours)==null?void 0:d.openNow,types:(u=c.types)==null?void 0:u.slice(0,5),placeId:c.id||"",location:c.location?{lat:c.location.latitude,lng:c.location.longitude}:void 0,googleMapsUri:c.googleMapsUri}})}}async function Kr(e,t){var a,i,o;const n=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),s=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":n}});if(!s.ok){const c=await s.text();return{error:`Place Details API error (${s.status}): ${c.substring(0,200)}`}}const r=await s.json();return{details:{name:((a=r.displayName)==null?void 0:a.text)||"",address:r.formattedAddress||"",phone:r.internationalPhoneNumber,website:r.websiteUri,rating:r.rating,reviews:(i=r.reviews)==null?void 0:i.slice(0,3).map(c=>{var l,d,u;return{author:((l=c.authorAttribution)==null?void 0:l.displayName)||"Anonymous",rating:c.rating||0,text:((u=(d=c.text)==null?void 0:d.text)==null?void 0:u.substring(0,200))||"",time:c.relativePublishTimeDescription||""}}),openingHours:(o=r.currentOpeningHours)==null?void 0:o.weekdayDescriptions,location:r.location?{lat:r.location.latitude,lng:r.location.longitude}:void 0,googleMapsUri:r.googleMapsUri}}}async function Yr(e,t,n,s={}){var l;const r=new URLSearchParams({origin:t,destination:n,key:e,mode:s.mode||"driving"});(s.mode==="driving"||!s.mode)&&r.set("departure_time","now");const a=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${r}`);if(!a.ok)return{error:`Directions API error: ${a.status}`};const i=await a.json();if(i.status!=="OK")return{error:`Directions: ${i.status} — ${i.error_message||""}`};const o=i.routes[0],c=o.legs[0];return{route:{summary:o.summary,distance:c.distance.text,duration:c.duration.text,durationInTraffic:(l=c.duration_in_traffic)==null?void 0:l.text,steps:c.steps.slice(0,10).map(d=>{var u,p,h;return{instruction:((u=d.html_instructions)==null?void 0:u.replace(/<[^>]*>/g,""))||"",distance:((p=d.distance)==null?void 0:p.text)||"",duration:((h=d.duration)==null?void 0:h.text)||""}}),startAddress:c.start_address,endAddress:c.end_address}}}async function Jr(e,t,n,s){var c,l;const r={q:t,target:n,key:e,format:"text"};s&&(r.source=s);const a=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok){const d=await a.text();return{translatedText:"",error:`Translate API error (${a.status}): ${d.substring(0,200)}`}}const o=(l=(c=(await a.json()).data)==null?void 0:c.translations)==null?void 0:l[0];return o?{translatedText:o.translatedText,detectedSourceLang:o.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function Vr(e,t){const n=new URLSearchParams({address:t,key:e}),s=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${n}`);if(!s.ok)return{results:[],error:`Geocoding API error: ${s.status}`};const r=await s.json();return r.status!=="OK"&&r.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${r.status} — ${r.error_message||""}`}:{results:(r.results||[]).slice(0,5).map(a=>{var i;return{address:a.formatted_address,lat:a.geometry.location.lat,lng:a.geometry.location.lng,placeId:a.place_id,types:(i=a.types)==null?void 0:i.slice(0,3)}})}}async function Zr(e,t,n={}){const s=new URLSearchParams({part:"snippet",q:t,key:e,type:n.type||"video",maxResults:String(n.maxResults||5),order:n.order||"relevance"}),r=await fetch(`https://www.googleapis.com/youtube/v3/search?${s}`);if(!r.ok){const i=await r.text();return{results:[],error:`YouTube API error (${r.status}): ${i.substring(0,200)}`}}return{results:((await r.json()).items||[]).map(i=>{var o,c,l,d,u,p,h,v;return{title:i.snippet.title,channelTitle:i.snippet.channelTitle,description:(o=i.snippet.description)==null?void 0:o.substring(0,200),videoId:((c=i.id)==null?void 0:c.videoId)||((l=i.id)==null?void 0:l.channelId)||((d=i.id)==null?void 0:d.playlistId)||"",publishedAt:i.snippet.publishedAt,url:(u=i.id)!=null&&u.videoId?`https://www.youtube.com/watch?v=${i.id.videoId}`:(p=i.id)!=null&&p.channelId?`https://www.youtube.com/channel/${i.id.channelId}`:"",thumbnailUrl:(v=(h=i.snippet.thumbnails)==null?void 0:h.medium)==null?void 0:v.url}})}}const Qo="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";function Xr(e,t){if(/anomaly-modal/i.test(e))return[];const n=[],s=e.split(/class="result results_links/g).slice(1);for(const r of s){if(n.length>=t)break;const a=r.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),i=r.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(a){let o=a[1];const c=o.match(/uddg=([^&]+)/);c?o=decodeURIComponent(c[1]):o.startsWith("//")&&(o="https:"+o);const l=p=>p.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),d=l(a[2]),u=i?l(i[1]):"";if(d&&o.startsWith("http")){const p=o.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];n.push({title:d,link:o,snippet:u,displayLink:p})}}}return n}async function ec(e,t,n,s){const r=new URLSearchParams({key:t,cx:n,q:e,num:String(Math.min(s,10))}),a=await fetch(`https://www.googleapis.com/customsearch/v1?${r}`);if(!a.ok){const c=await a.text().catch(()=>"");return{results:[],error:`Google CSE failed (${a.status}): ${c.substring(0,200)}`}}return{results:((await a.json()).items||[]).map(c=>({title:c.title||"",link:c.link||"",snippet:c.snippet||"",displayLink:c.displayLink||(c.link||"").replace(/^https?:\/\/(www\.)?/,"").split("/")[0]})).filter(c=>c.title&&c.link.startsWith("http"))}}async function Ut(e,t={}){const n=Math.min(t.num||5,10),s=t.site?`site:${t.site} ${e}`:e;try{const r=new URLSearchParams({q:s}),a=await fetch("https://html.duckduckgo.com/html/",{method:"POST",headers:{"User-Agent":Qo,"Content-Type":"application/x-www-form-urlencoded"},body:r.toString()});if(!a.ok)return{results:[],error:`Search request failed (${a.status})`};const i=await a.text(),o=Xr(i,n);if(o.length>0)return{results:o};if(t.googleApiKey&&t.googleCseId){const c=await ec(s,t.googleApiKey,t.googleCseId,n);if(c.results.length>0)return c;if(c.error)return{results:[],error:c.error}}return/anomaly-modal/i.test(i)?{results:[],error:"Web search blocked by DuckDuckGo bot protection. Configure GOOGLE_API_KEY + GOOGLE_CSE_ID, or add a Tavily API key in Settings → Keys for faster research."}:{results:[],error:void 0}}catch(r){return{results:[],error:`Web search error: ${r.message}`}}}async function Qr(e,t,n,s="driving"){var c,l,d,u;const r=new URLSearchParams({origins:t,destinations:n,key:e,mode:s,departure_time:"now"}),a=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${r}`);if(!a.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${a.status}`};const i=await a.json(),o=(d=(l=(c=i.rows)==null?void 0:c[0])==null?void 0:l.elements)==null?void 0:d[0];return!o||o.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(o==null?void 0:o.status)||i.status}`}:{distance:o.distance.text,duration:o.duration.text,durationInTraffic:(u=o.duration_in_traffic)==null?void 0:u.text}}const tc=Object.freeze(Object.defineProperty({__proto__:null,geocode:Vr,getDirections:Yr,getDistanceMatrix:Qr,getPlaceDetails:Kr,parseDuckDuckGoHtml:Xr,searchPlaces:zr,searchYouTube:Zr,translateText:Jr,webSearch:Ut},Symbol.toStringTag,{value:"Module"})),We="https://gmail.googleapis.com/gmail/v1/users/me";function nc(e,t){if(e)return e;const n=t?parseInt(t,10):NaN;return!Number.isNaN(n)&&n>0?new Date(n).toISOString():""}function sc(e,t){return e===403?"Gmail access denied (403). Reconnect your Google account in Settings → Keys → Google Workspace to grant Gmail permissions.":`Gmail list failed (${e}): ${t.substring(0,200)}`}class Ie{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Bt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var c;const n=await this.authHeaders(),s=new URLSearchParams;if(s.set("maxResults",String(t.maxResults||10)),t.query&&s.set("q",t.query),(c=t.labelIds)!=null&&c.length)for(const l of t.labelIds)s.append("labelIds",l);const r=await fetch(`${We}/messages?${s}`,{headers:n});if(!r.ok){const l=await r.text();throw new Error(sc(r.status,l))}const a=await r.json();if(!a.messages||a.messages.length===0)return[];const i=[];let o=0;for(const l of a.messages.slice(0,t.maxResults||10))try{const d=await this.getMessage(l.id,n);d?i.push(d):o++}catch{o++}if(i.length===0&&o>0)throw new Error(`Gmail found ${a.messages.length} matching message(s) but could not read message details (${o} metadata fetch failure(s)). Reconnect Google in Settings → Keys → Google Workspace to refresh Gmail permissions, then try again.`);return i}async getMessage(t,n){const s=n||await this.authHeaders(),r=await fetch(`${We}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:s});if(!r.ok)return null;const a=await r.json(),i=o=>{var c,l,d;return((d=(l=(c=a.payload)==null?void 0:c.headers)==null?void 0:l.find(u=>u.name.toLowerCase()===o.toLowerCase()))==null?void 0:d.value)||""};return{id:a.id,threadId:a.threadId,snippet:a.snippet||"",subject:i("Subject")||"(no subject)",from:i("From"),to:i("To"),date:nc(i("Date"),a.internalDate),isUnread:(a.labelIds||[]).includes("UNREAD"),labels:a.labelIds||[]}}async getMessageBody(t){const n=await this.authHeaders(),s=await fetch(`${We}/messages/${t}?format=full`,{headers:n});if(!s.ok){const a=await s.text();throw new Error(`Gmail message body failed (${s.status}): ${a.substring(0,200)}`)}const r=await s.json();return ac(r.payload)}async search(t,n=10){return this.listMessages({query:t,maxResults:n})}async send(t,n,s,r={}){const a=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${n}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];r.cc&&i.push(`Cc: ${r.cc}`),r.bcc&&i.push(`Bcc: ${r.bcc}`),r.replyToMessageId&&(i.push(`In-Reply-To: ${r.replyToMessageId}`),i.push(`References: ${r.replyToMessageId}`)),i.push("",Os(s));const o=i.join(`\r
`),l={raw:As(o)};r.threadId&&(l.threadId=r.threadId);const d=await fetch(`${We}/messages/send`,{method:"POST",headers:a,body:JSON.stringify(l)});if(!d.ok){const u=await d.text();throw new Error(`Gmail send failed (${d.status}): ${u.substring(0,200)}`)}return await d.json()}async createDraft(t,n,s,r={}){const a=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${n}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];r.cc&&i.push(`Cc: ${r.cc}`),i.push("",Os(s));const o=i.join(`\r
`),c=As(o),l=await fetch(`${We}/drafts`,{method:"POST",headers:a,body:JSON.stringify({message:{raw:c}})});if(!l.ok){const d=await l.text();throw new Error(`Gmail draft failed (${l.status}): ${d.substring(0,200)}`)}return await l.json()}async markAsRead(t){const n=await this.authHeaders();await fetch(`${We}/messages/${t}/modify`,{method:"POST",headers:n,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,n){const s=await this.authHeaders();let r={};switch(n){case"archive":r={removeLabelIds:["INBOX"]};break;case"trash":r={addLabelIds:["TRASH"]};break;case"read":r={removeLabelIds:["UNREAD"]};break;case"unread":r={addLabelIds:["UNREAD"]};break;case"star":r={addLabelIds:["STARRED"]};break;case"unstar":r={removeLabelIds:["STARRED"]};break}const a=await fetch(`${We}/messages/${t}/modify`,{method:"POST",headers:{...s,"Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok){const i=await a.text();throw new Error(`Failed to modify message: ${i}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),n=await fetch(`${We}/labels/INBOX`,{headers:t});return n.ok&&(await n.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),n=await fetch(`${We}/profile`,{headers:t});if(!n.ok)throw new Error("Failed to get Gmail profile");return await n.json()}}function rc(e){let t="",n="";function s(r){var a,i,o,c;if(r){if(r.mimeType==="text/plain"&&((a=r.body)!=null&&a.data))t+=fn(r.body.data);else if(r.mimeType==="text/html"&&((i=r.body)!=null&&i.data))n+=fn(r.body.data);else if((o=r.parts)!=null&&o.length)for(const l of r.parts)s(l);else if((c=r.body)!=null&&c.data&&!r.parts){const l=fn(r.body.data);r.mimeType==="text/html"?n+=l:t+=l}}}return s(e),{plain:t.trim(),html:n.trim()}}function ac(e){var r,a;if(!e)return"";if((r=e.body)!=null&&r.data&&!((a=e.parts)!=null&&a.length)){const i=fn(e.body.data);return e.mimeType==="text/html"?Ls(i):i}const{plain:t,html:n}=rc(e),s=n?Ls(n):"";return t&&s?t.length<200&&s.length>t.length?s:t.length>=s.length?t:s:t||s||e.snippet||""}function Os(e){e=e.replace(/\\n/g,`
`).replace(/\\t/g,"	");let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return t=t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)","g"),"<em>$1</em>"),`<html><body style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#000000;">${t.split(/\n\n+/).map(r=>{const a=r.split(`
`);return a.every(i=>/^\s*[-*]\s/.test(i)||i.trim()==="")?`<ul>${a.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*[-*]\s+/,"")}</li>`).join("")}</ul>`:a.every(i=>/^\s*\d+\.\s/.test(i)||i.trim()==="")?`<ol>${a.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*\d+\.\s+/,"")}</li>`).join("")}</ol>`:`<p>${a.join("<br>")}</p>`}).join("")}</body></html>`}function As(e){const t=new TextEncoder().encode(e);let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function fn(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function Ls(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<img[^>]+alt=["']([^"']+)["'][^>]*>/gi,`
$1
`).replace(/<br\s*\/?>/gi,`
`).replace(/<\/t[dh]>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}function Ln(e,t){const n=`${e.subject} ${e.snippet} ${e.from}`.toLowerCase(),s=t.toLowerCase();let r=0;n.includes(s)&&(r+=10);for(const a of s.split(/\s+/))a.length>2&&n.includes(a)&&(r+=3);return/\b(order|ordered|confirmation|invoice|receipt|thank you for your order)\b/i.test(`${e.subject} ${e.snippet}`)&&(r+=6),/\b(delivered|delivery|out for delivery|shipped|dispatch|dispatched|arriving)\b/i.test(e.subject)&&(r-=4),r}function Ms(e){return e.map((t,n)=>`${t.isUnread?"● ":"  "}${n+1}. **${t.subject}**
   From: ${t.from}
   Date: ${t.date}
   ${t.snippet}
   [id: ${t.id}]`).join(`

`)}function ic(e,t,n){if(e.length===0)return`No purchase-related emails found for "${t}" (query: ${n}).`;const s=[...e].sort((i,o)=>Ln(o,t)-Ln(i,t)),r=s[0];if(Ln(r,t)>0){const i=`**Purchase email for "${t}"**

**${r.subject}**
Date received: ${r.date}
From: ${r.from}
Preview: ${r.snippet}

`,o=s.length>1?`Other related messages:

${Ms(s.slice(1,6))}`:"";return i+o}return`No clear purchase confirmation for "${t}". Closest matches:

${Ms(s.slice(0,8))}`}const oc=15e3,cc=15e3,lc=15e3,dc=6e4;async function ss(e,t){try{const n=new AbortController,s=setTimeout(()=>n.abort(),cc),r=await fetch(e,{signal:n.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(!r.ok)return{text:"",error:`HTTP ${r.status}`};const a=r.headers.get("content-type")||"";if(!a.includes("text/html")&&!a.includes("text/plain")&&!a.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${a.split(";")[0]}`};const i=await r.text();clearTimeout(s);const o=i.length>2e5?i.substring(0,2e5):i,c=uc(o);return c.length<50?{text:"",error:"Page has too little readable content"}:{text:c.substring(0,t||oc)}}catch(n){return{text:"",error:n.name==="AbortError"?"Timeout":n.message}}}function uc(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(n,s)=>String.fromCharCode(parseInt(s))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(n=>n.trim()).filter(n=>n.length>0).join(`
`),t.trim()}async function ea(e,t,n){const s=new AbortController,r=setTimeout(()=>s.abort(),lc);try{const a=await fetch("https://api.tavily.com/search",{method:"POST",signal:s.signal,headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:t,query:e,search_depth:n==="quick"?"basic":"advanced",include_raw_content:!0,max_results:n==="quick"?7:5})});return clearTimeout(r),a.ok?{results:(await a.json()).results||[]}:{results:[],error:`Tavily error ${a.status}`}}catch(a){clearTimeout(r);const i=a.name==="AbortError"?"Timeout":a.message;return console.warn("[searchViaTavily]",i),{results:[],error:i}}}async function ln(e,t,n,s){var i,o;const r=new AbortController,a=setTimeout(()=>r.abort(),dc);try{const c=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",signal:r.signal,headers:{"x-api-key":e,"anthropic-version":"2023-06-01","content-type":"application/json"},body:JSON.stringify({model:"claude-opus-4-8",max_tokens:s,system:t,messages:[{role:"user",content:n}]})});if(clearTimeout(a),!c.ok){let d=`Opus API error ${c.status}`;throw c.status===401?d="Opus API error 401: invalid or expired Anthropic API key":c.status===404?d="Opus API error 404: model not found — check the model ID":c.status===529&&(d="Opus API error 529: Anthropic API overloaded"),new Error(d)}return((o=(i=(await c.json()).content)==null?void 0:i[0])==null?void 0:o.text)||""}catch(c){throw clearTimeout(a),c}}function $s(e,t){try{const n=e.match(/\[[\s\S]*\]/);if(!n)return t;const s=JSON.parse(n[0]);if(Array.isArray(s)&&s.every(r=>typeof r=="string"))return s.filter(Boolean)}catch{}return t}async function ta(e){return e.raw_content&&e.raw_content.length>100?e.raw_content.slice(0,15e3):(await ss(e.url,15e3)).text}async function mc(e,t,n,s,r){const a=[];async function i(g,w,T){let x=[];return n&&(x=(await ea(g,n,T)).results),x.length===0&&(x=(await r(g,w)).map($=>({url:$.link,title:$.title,content:$.snippet,raw_content:null,score:0}))),(await Promise.all(x.map(async N=>({result:N,content:await ta(N)})))).filter(N=>N.content.length>50)}if(s==="quick"){const g=await i(e,7,"quick");let w="";for(let x=0;x<g.length;x++){const A=g[x],N=`[${x+1}] ${A.result.title}
${A.result.url}

${A.content}

`;if(w.length+N.length>8e4)break;w+=N,a.push({url:A.result.url,title:A.result.title})}return{report:await ln(t,"You are an expert research analyst. Write a clear, accurate, well-structured report answering the query based on provided sources. Cite sources as [1], [2] etc. Be precise and factual.",`Query: ${e}

Sources:
${w}`,2048),sources:a,pagesRead:g.length}}const o=await ln(t,"You are a research planning expert.",`I need to research: ${e}

Generate exactly 4-5 specific sub-queries that together cover all important angles (definition, current state, comparisons, recent developments, expert analysis). Return ONLY a JSON array of strings, nothing else.`,400),c=$s(o,[e,`${e} overview`,`${e} examples`,`${e} latest`]).slice(0,5),l=await Promise.all(c.map(g=>i(g,5,"thorough"))),d=new Set,u=[];for(const g of l)for(const w of g)d.has(w.result.url)||u.length>=20||(d.add(w.result.url),u.push(w));let p="";for(let g=0;g<u.length;g++){const w=u[g],T=`[${g+1}] ${w.result.title}
${w.result.url}

${w.content}

`;if(p.length+T.length>18e4)break;p+=T,a.push({url:w.result.url,title:w.result.title})}const h=await ln(t,"You are a research analyst identifying information gaps.",`I'm researching: ${e}

Here's what I've found so far:
${p.slice(0,6e4)}

Identify 2-3 specific information gaps or important angles not yet covered. Return ONLY a JSON array of follow-up search queries.`,300),v=$s(h,[]).slice(0,3);if(v.length>0){let g=0;const w=await Promise.all(v.map(T=>i(T,4,"thorough")));for(const T of w)for(const x of T){if(g>=5||d.has(x.result.url))continue;d.add(x.result.url);const N=`[${a.length+1}] ${x.result.title}
${x.result.url}

${x.content}

`;if(p.length+N.length>18e4)break;p+=N,a.push({url:x.result.url,title:x.result.title}),u.push(x),g++}}return{report:await ln(t,`You are an expert research analyst producing a comprehensive report. Use this exact structure:
**Executive Summary** (2-3 sentences)
**Key Findings** (bullet points with citations)
**Detailed Analysis** (multiple paragraphs with citations)
**Conflicting Information** (if sources disagree, note explicitly — omit this section if no conflicts)
**Sources** (numbered list of URLs)
Cite sources as [1], [2] etc. Be thorough, precise, and objective.`,`Research query: ${e}

Sources:
${p}`,4096),sources:a,pagesRead:u.length}}async function na(e,t,n={}){const s=n.depth||"quick",r=async(f,g)=>(await Ut(f,{num:g,site:n.site,googleApiKey:n.googleApiKey,googleCseId:n.googleCseId})).results||[];let a;if(n.anthropicKey)try{const f=await mc(e,n.anthropicKey,n.tavilyKey||null,s,r);if(f.report.trim())return{report:f.report,sources:f.sources.map(g=>({title:g.title,url:g.url})),pagesRead:f.pagesRead}}catch(f){a=f.message,console.warn("[conductResearch] Opus path failed:",f.message)}if(n.tavilyKey)try{const f=await ea(e,n.tavilyKey,s);if(f.results.length>0){const g=s==="thorough"?8:5,T=(await Promise.all(f.results.slice(0,g).map(async $=>({result:$,content:await ta($)})))).filter($=>$.content.length>50),x=T.map($=>({title:$.result.title,url:$.result.url}));if(T.length>0){const $=T.map((z,W)=>`--- SOURCE ${W+1}: ${z.result.title} ---
${z.content}
--- END SOURCE ${W+1} ---`).join(`

`);return{report:await dn(e,$,t,"full"),sources:x,pagesRead:T.length}}const A=f.results.map(($,M)=>`[${M+1}] ${$.title}
${$.content}
Source: ${$.url}`).join(`

`);return{report:await dn(e,A,t,"snippets"),sources:f.results.map($=>({title:$.title,url:$.url})),pagesRead:0}}}catch(f){console.warn("[conductResearch] Tavily path failed:",f.message)}const i=n.maxPages||(s==="thorough"?5:3),o=n.maxResults||(s==="thorough"?8:5),c=await Ut(e,{num:o,site:n.site,googleApiKey:n.googleApiKey,googleCseId:n.googleCseId});if(c.error){const f=a?` (Opus: ${a})`:"";return{report:"",sources:[],pagesRead:0,error:`Search failed: ${c.error}${f}`}}if(c.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const d=c.results.slice(0,i).map(async f=>{const g=await ss(f.link);return{title:f.title,url:f.link,displayLink:f.displayLink,snippet:f.snippet,content:g.text,error:g.error}}),p=(await Promise.all(d)).filter(f=>f.content.length>50);if(p.length===0){const f=c.results.map((w,T)=>`[${T+1}] ${w.title}
${w.snippet}
Source: ${w.link}`).join(`

`);return{report:await dn(e,f,t,"snippets"),sources:c.results.map(w=>({title:w.title,url:w.link})),pagesRead:0}}const h=p.map((f,g)=>`--- SOURCE ${g+1}: ${f.title} (${f.displayLink}) ---
${f.content}
--- END SOURCE ${g+1} ---`).join(`

`);return{report:await dn(e,h,t,"full"),sources:p.map(f=>({title:f.title,url:f.url})),pagesRead:p.length}}async function dn(e,t,n,s){const a=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

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
- If the sources don't adequately answer the query, say so honestly`,i=`Research query: "${e}"

Source material:
${t}

Write a synthesized research report answering the query above.`;try{return(await n.chat([{role:"system",content:a},{role:"user",content:i}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(o){return`Research synthesis error: ${o.message}. Raw search results were found but could not be analyzed.`}}const pc=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:na,fetchPageContent:ss},Symbol.toStringTag,{value:"Module"})),rt="https://api.browser-use.com/api/v2",Ps=2e4,zn=6e3,hc=3e5,rs=12e3,sa=new Set(["finished","stopped"]);async function Yt(e,t,n=rs){const s=new AbortController,r=setTimeout(()=>s.abort(),n);try{return await fetch(e,{...t,signal:s.signal})}finally{clearTimeout(r)}}async function fc(e){const t=()=>fetch(`${rt}/sessions`,{method:"POST",headers:{"X-Browser-Use-API-Key":e,"Content-Type":"application/json"},body:JSON.stringify({})});try{let n=await t();if(!n.ok){const r=await n.text().catch(()=>"");if(aa(n.status,r)){if(console.log("[createBrowserSession] concurrency limit — reaping stale sessions and retrying"),await ra(e),n=await t(),!n.ok)return console.log(`[createBrowserSession] FAILED after reap HTTP ${n.status}`),null}else return console.log(`[createBrowserSession] FAILED HTTP ${n.status}: ${r}`),null}const s=await n.json();return console.log(`[createBrowserSession] sessionId=${s.id}`),s.id??null}catch(n){return console.log(`[createBrowserSession] ERROR ${n.message}`),null}}async function En(e,t){try{await fetch(`${rt}/sessions/${e}`,{method:"DELETE",headers:{"X-Browser-Use-API-Key":t}}),console.log(`[closeBrowserSession] closed sessionId=${e}`)}catch{}}async function gc(e){try{const t=await Yt(`${rt}/sessions?filterBy=active&pageSize=100`,{headers:{"X-Browser-Use-API-Key":e}});return t.ok?(await t.json()).items??[]:[]}catch{return[]}}async function ra(e,t){const n=await gc(e);let s=0;for(const r of n)!r.id||t&&r.id===t||(await En(r.id,e),s++);return s>0&&console.log(`[reapActiveBrowserSessions] closed ${s} stale session(s)`),s}function aa(e,t){const n=(t||"").toLowerCase();return/session/.test(n)?/concurrent|too many|maximum|limit|exceeded/.test(n):!1}async function as(e,t,n){var o;const s=(n==null?void 0:n.timeoutMs)??hc;console.log(`[runBrowserTask] starting taskLen=${e.length} timeoutMs=${s} hasSecrets=${!!(n!=null&&n.secrets)} reuseSession=${!!(n!=null&&n.sessionId)}`);let r,a;try{const c={task:e};n!=null&&n.secrets&&Object.keys(n.secrets).length>0&&(c.secrets=n.secrets),n!=null&&n.sessionId&&(c.sessionId=n.sessionId);const l=()=>fetch(`${rt}/tasks`,{method:"POST",headers:{"X-Browser-Use-API-Key":t,"Content-Type":"application/json"},body:JSON.stringify(c)});let d=await l();if(!d.ok){const p=await d.text().catch(()=>"");if(aa(d.status,p)&&(console.log("[runBrowserTask] concurrency limit — reaping stale sessions and retrying"),await ra(t,n==null?void 0:n.sessionId),d=await l()),!d.ok){const h=await d.text().catch(()=>p);return console.log(`[runBrowserTask] CREATE_FAILED HTTP ${d.status}: ${h}`),{output:null,taskId:"",status:"failed",error:`HTTP ${d.status}: ${h}`}}}const u=await d.json();if(r=u.id,a=u.sessionId||void 0,console.log(`[runBrowserTask] CREATED taskId=${r} sessionId=${a}`),!r)return{output:null,taskId:"",status:"failed",error:"No id in create response"}}catch(c){return{output:null,taskId:"",status:"failed",error:c.message}}await new Promise(c=>setTimeout(c,Ps));const i=Date.now()+(s-Ps);for(;Date.now()<i;){try{const c=await Yt(`${rt}/tasks/${r}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(c.ok){const l=await c.json();if(sa.has(l.status)){if(l.status==="finished"){let d=l.output??null;if(!d)try{const u=await Yt(`${rt}/tasks/${r}`,{headers:{"X-Browser-Use-API-Key":t}},rs);if(u.ok){const p=await u.json();if(d=p.output??null,!d&&((o=p.steps)!=null&&o.length)){const h=p.steps[p.steps.length-1];d=h.extracted_content??h.output??h.result??null}}}catch{}return console.log(`[runBrowserTask] COMPLETED taskId=${r} outputLen=${(d??"").length}`),{output:d,taskId:r,sessionId:a,status:"completed"}}return console.log(`[runBrowserTask] FAILED taskId=${r} status=${l.status}`),{output:l.output??null,taskId:r,status:"failed",error:l.output??"Task was stopped before completing"}}}}catch{}await new Promise(c=>setTimeout(c,zn))}return console.log(`[runBrowserTask] TIMEOUT taskId=${r} sessionId=${a}`),{output:null,taskId:r,sessionId:a,status:"timeout"}}async function ia(e,t,n){var a;const s=(n==null?void 0:n.waitMs)??3e4,r=Date.now()+s;for(;Date.now()<r;){try{const i=await Yt(`${rt}/tasks/${e}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(!i.ok){await new Promise(c=>setTimeout(c,zn));continue}const o=await i.json();if(sa.has(o.status)){let c=null;const l=await Yt(`${rt}/tasks/${e}`,{headers:{"X-Browser-Use-API-Key":t}},rs);if(l.ok){const d=await l.json();if(c=d.output??null,!c&&((a=d.steps)!=null&&a.length)){const u=d.steps[d.steps.length-1];c=u.extracted_content??u.output??u.result??null}}else c=o.output??null;return{status:o.status,output:c,done:!0}}}catch{}await new Promise(i=>setTimeout(i,zn))}return{status:"running",output:null,done:!1}}function yc(e){return`Navigate to https://www.bluedart.com/tracking.
Find the AWB/tracking number input field, enter the number ${e}, and submit the form.
Wait for the tracking results to fully load (up to 15 seconds).
If a captcha appears at any point, do not attempt to solve it.

Extract the following fields and return them as a strict JSON block with no prose before or after:
{
  "awb": "${e}",
  "status": "<current shipment status, or 'not_found' if AWB is unknown>",
  "location": "<last known location, or null>",
  "last_event_time": "<timestamp of most recent event, or null>",
  "expected_delivery": "<expected delivery date/time, or null>",
  "captcha_required": <true if a captcha was encountered, false otherwise>
}

After the JSON block, on a new line, write a single human-readable summary sentence (e.g. "Shipment ${e} is in transit at Delhi Hub, expected delivery 5 May 2026.").
If the AWB is not found, set status to "not_found" and all other fields to null.
If a captcha was encountered, set captcha_required to true and populate whatever tracking data was visible before the captcha appeared.`}async function oa(e){const t=e instanceof Buffer?new Uint8Array(e):e,n=new DataView(t.buffer,t.byteOffset,t.byteLength);let s=0;for(;s<t.length-30&&n.getUint32(s,!0)===67324752;){const r=n.getUint16(s+6,!0),a=n.getUint16(s+8,!0),i=n.getUint32(s+18,!0),o=n.getUint32(s+22,!0),c=n.getUint16(s+26,!0),l=n.getUint16(s+28,!0),d=new TextDecoder().decode(t.slice(s+30,s+30+c)),u=s+30+c+l;if(d==="word/document.xml"){const p=t.slice(u,u+i);let h;if(a===0)h=p;else{const g=new DecompressionStream("deflate-raw"),w=g.writable.getWriter();w.write(p),w.close();const T=g.readable.getReader(),x=[];let A=!1;for(;!A;){const M=await T.read();M.done?A=!0:x.push(M.value)}const N=x.reduce((M,z)=>M+z.length,0);h=new Uint8Array(o||N);let $=0;for(const M of x)h.set(M,$),$+=M.length}return new TextDecoder().decode(h).replace(/<\/w:p>/g,`
`).replace(/<\/w:tr>/g,`
`).replace(/<[^>]+>/g,"").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim()}s=u+i,r&8&&(s+=16)}return""}const ca=Object.freeze(Object.defineProperty({__proto__:null,extractDocxTextFromBuffer:oa},Symbol.toStringTag,{value:"Module"})),vc=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,weight:.9},{pattern:/\bremi[a-z]{0,5}\s+(me|us)\b/i,weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,weight:.95},{pattern:/^[Tt]ask:\s*/,weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,weight:.9},{pattern:/\b(change\s+(the\s+)?time|update\s+(the\s+)?(reminder|schedule|alarm)|reschedule|move\s+it\s+to|cancel\s+(the\s+)?(reminder|schedule|alarm)|delete\s+(the\s+)?(reminder|schedule|alarm))\b/i,weight:.9},{pattern:/\b(show\s+(me\s+)?(my\s+)?(reminders?|schedules?|alarms?)|what\s+reminders?|any\s+reminders?|do\s+i\s+have.*remind|when\s+is\s+my\s+remind)\b/i,weight:.9},{pattern:/\b(stop|turn\s+off|switch\s+off|disable|deactivate)\s+(that|the|this|my)?\s*(reminder|schedule|alarm|notification)\b/i,weight:.9},{pattern:/\b(snooze|postpone|push\s+back|remind\s+me\s+later|later\s+reminder)\b/i,weight:.9},{pattern:/\b(change|update|edit|move|shift)\s+(it|this|that)\s+(to|for)\b/i,weight:.85},{pattern:/\bset\s+it\s+(for|at|to)\b/i,weight:.85},{pattern:/\b(what\s+time|when)\s+(did\s+i\s+set|is\s+(the|my)\s+remind|does\s+(it|that)\s+go\s+off)\b/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,weight:.9},{pattern:/\b(add|save|append|write|put)\s+(to|in|into)\s+(my\s+|your\s+|the\s+)?(quick\s+)?notes?\b|\bquick\s+notes\b/i,weight:.88},{pattern:/\b(update\s+cell|change\s+cell|delete\s+row|remove\s+row|delete\s+duplicate|remove\s+duplicate|create\s+(a\s+)?(new\s+)?(tab|sheet)|add\s+(a\s+)?tab|what.{0,15}(column|row\s+\d|cell\s+[A-Z])|sum\s+of|total\s+(in|of))\b/i,weight:.9},{pattern:/\b(forward\s+(that\s+)?(email|message)|reply\s+to\s+(that|the|an?\s+)?email|respond\s+to\s+(that|the)\s+email|mark\s+(it|that|this|email)\s+as|(got|received)\s+an?\s+email\s+from)\b/i,weight:.85},{pattern:/\b(cancel\s+(the\s+)?(event|meeting|appointment)|reschedule\s+(the\s+|my\s+)?(meeting|event|appointment)|delete\s+(from|the)\s+calendar|remove\s+(the\s+)?(event|meeting)\s+from\s+calendar)\b/i,weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,weight:.9},{pattern:/\b((save|store|put)\s+(it\s+|this\s+|that\s+|the\s+)?(to|in|on)\s+(my\s+|your\s+|google\s+)?drive|save\s+(to|as)\s+(a\s+)?(google\s+)?doc)\b/i,weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,weight:.9},{pattern:/\b(keep\s+(that\s+)?in\s+mind|always\s+(do|use|prefer|remember)|update\s+(my\s+)?(memory|preference)|delete\s+(that\s+)?memory|forget\s+that|what\s+did\s+i\s+tell\s+you\s+about)\b/i,weight:.9},{pattern:/\b(unified\s*doc|unified\s*docs|ash.?doc|udm|save\s+to\s+unified|write\s+to\s+unified|create\s+a\s+page\s+on|page\s+on\s+unified|open\s+(a\s+)?page\s+on\s+unified|comments?\s+on\s+(the\s+)?(page|doc)\s+on|apply\s+(the\s+)?comments?|add\s+(a\s+)?row\s+(to|in)\s+(the\s+)?(unified|udm)|update\s+(a\s+)?row\s+(in|on)\s+(the\s+)?(unified|udm)|delete\s+(a\s+)?row\s+(from|in)\s+(the\s+)?(unified|udm)|create\s+(a\s+)?(unified|udm)\s*(doc)?\s*database|add\s+(a\s+)?column\s+(to|in)\s+(the\s+)?(unified|udm))\b/i,weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,weight:.9}];function is(e,t,n){for(const s of vc)if(s.pattern.test(e))return{agent:"multi",confidence:s.weight,reasoning:"Keyword match — full agent"};if(e.trim().length<80){const s=[n,t].filter(Boolean);for(const r of s)if(r.split(`
`).slice(-16).some(o=>/\[TOOLS_USED:/i.test(o)||/\b(reminder|reminders|schedule|scheduled|cron|alarm|next_run|set for|going off|remind)\b/i.test(o)||/\b(i['']ll\s+(search|research|find|look\s+up|check|add|create|book)|just\s+a\s+moment|pulling\s+that\s+together|on\s+it\b|let\s+me\s+(search|research|find|look))\b/i.test(o)))return{agent:"multi",confidence:.8,reasoning:"Active tool session follow-up — full agent"}}return t&&/spreadsheet|sheet|google\s*sheet/i.test(t)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(e)?{agent:"multi",confidence:.85,reasoning:"Memory context — full agent"}:n!=null&&n.includes("[TOOLS_USED: research]")?{agent:"multi",confidence:.85,reasoning:"Research thread follow-up — full agent"}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}const wc=["show","gig","job","venue","theatre","theater","mic","wireless","microphone","speaker","amp","amplifier","mixer","console","channel","patch","cable","crew","rider","load-in","loadout","strike","broadway","pantages","dolby","ncpa","shure","sennheiser","audio technica","aked","qlxd","urx"];function _c(e){const t=e.toLowerCase();return wc.some(n=>t.includes(n))}function la(e){const t=[/\bpurchased\s+(?:a\s+)?pair\s+of\s+(.{2,50}?)(?:\s+recently|[.?!,]|$)/i,/\b(?:purchased|bought|ordered)\s+(?:a\s+)?(?:pair\s+of\s+)?(.{2,50}?)(?:\s+recently|[.?!,]|$)/i,/\b(?:about|for)\s+(?:my\s+)?(.{2,50}?)\s+(?:purchase|order)/i];for(const n of t){const s=e.match(n);if(!(s!=null&&s[1]))continue;const r=s[1].trim().replace(/\s+(purchase|order|confirmation|email|gmail|mail).*$/i,"").replace(/^(the|a|an)\s+/i,"").trim();if(r.length>=3&&!/^(it|this|that|one|something)$/i.test(r))return r}return null}function os(e){const t=e.trim(),n=t.includes(" ")?`"${t}"`:t,s=t.split(/\s+/).filter(a=>a.length>2);return`${s.length>1?`(${n} OR ${s[s.length-1]})`:n} newer_than:180d`}function bc(e){const t=/\b(gmail|email|e-?mail)\b/i.test(e),n=/\b(find|search|look\s+(?:for|up)?|locate|get)\b/i.test(e),s=/\b(purchase|purchased|bought|ordered|order|receipt|confirming|confirmation)\b/i.test(e),r=/\b(date|when|received)\b/i.test(e);return t&&(n||s||r)}function Ec(e){if(!bc(e))return null;const t=la(e);return t?{tool:"gmail_search",args:{query:os(t),max_results:15,product_hint:t}}:null}function cs(e){const t=e.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')]+/);if(t&&/\b(delete|trash|remove)\b/i.test(e))return{tool:"drive_delete_file",args:{url_or_id:t[0].replace(/[.,;)]$/,"")}};if(/\b(list|show|display)\s+(my\s+)?(google\s+)?drive\s+(files?|docs?|documents?|folders?)\b|\bwhat\s+(files?|docs?|documents?)\s+(do\s+i\s+have|are|is)\s+(in|on)\s+(my\s+)?(google\s+)?drive\b/i.test(e))return{tool:"drive_list",args:{}};const n=e.match(/\b(?:search|find|look\s+(?:for|up))\s+(?:(?:in|on|my|the|google)\s+)*drive\s+(?:for\s+)?(.{3,60}?)(?:\s*[?.!,])?$/i);if(n)return{tool:"drive_search",args:{query:n[1].trim()}};if(/\b(how\s+many\s+unread|unread\s+(count|emails?|messages?)|any\s+unread\s+(emails?|messages?))\b/i.test(e))return{tool:"gmail_unread_count",args:{}};if(/\b(list|show|display)\s+(my\s+)?(upcoming\s+)?(calendar\s+)?(events?|meetings?|appointments?)\b/i.test(e)&&!/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+week|this\s+week|\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))\b/i.test(e))return{tool:"list_calendar_events",args:{}};if(/\b(list|show|display)\s+(my\s+)?(active\s+)?(reminders?|schedules?|alarms?)\b|\bwhat\s+reminders?\s+(do\s+i\s+have|are\s+set|are\s+active)\b/i.test(e))return{tool:"list_schedules",args:{}};const s=Ec(e);return s||null}function ls(e,t){if(/\b(delete|trash|remove)\b.{0,50}\b(file|doc|document|sheet|spreadsheet|folder)\b|\b(file|doc|document|sheet|spreadsheet)\b.{0,50}\b(delete|trash|remove)\b/i.test(e)){const n=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(n)return{tool:"drive_delete_file",args:{url_or_id:n[0].replace(/[.,;)]$/,"")}}}if(/\b(move|rename|organise|organize)\b.{0,50}\b(file|doc|document|sheet)\b/i.test(e)){const n=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(n){const s={url_or_id:n[0].replace(/[.,;)]$/,"")},r=e.match(/\bto\s+(?:the\s+)?(?:folder\s+)?["']?([A-Za-z0-9 _-]{2,40})["']?\s*(?:folder\b|$)/i),a=e.match(/\brename\b.{0,30}\bto\s+["']?([A-Za-z0-9 _.-]{2,60})["']?/i);if(r&&(s.folder_name=r[1].trim()),a&&(s.new_name=a[1].trim()),s.folder_name||s.new_name)return{tool:"drive_organise",args:s}}}return null}function da(e,t,n,s,r,a){const i=t.assistant_name||"Karna",o=2e3,c=4,l=t.personality_prompt?`
## Personality
`+(t.personality_prompt.length<=o*c?t.personality_prompt:t.personality_prompt.slice(0,o*c)+`
[...truncated to fit token budget]`)+`
`:"",d=n?`
## Active Memory (ALWAYS consult before responding)
${n}
`:"";let u="";try{const h=new Date;u=new Intl.DateTimeFormat("en-GB",{timeZone:t.timezone,day:"numeric",month:"short",year:"numeric"}).format(h)}catch{u=""}const p=`
## Current User
- **Name**: ${t.name}
- **Timezone**: ${t.timezone}
- **Time**: ${r}
- **Today's date for sheets**: ${u}
`;switch(e){case"conversation":return`You are ${i} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic.

${p}${l}${d}

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
- **HARD RULE — no false confirmations**: You have ZERO tool access. You CANNOT set reminders, create schedules, send emails, read sheets, or perform any action. NEVER output phrases like "Reminder set for...", "I've scheduled...", "Done ✅", "Task created", or any language implying an action was completed. If the user wants an action, say: "I can do that — just send your message and I'll take care of it." Do NOT simulate the outcome.`;default:return""}}const ds=Object.freeze(Object.defineProperty({__proto__:null,buildPurchaseGmailQuery:os,buildSubAgentPrompt:da,classifyIntentFast:is,detectDeterministicOp:cs,detectSoundDomain:_c,detectTierTwoOp:ls,extractPurchaseProduct:la},Symbol.toStringTag,{value:"Module"})),Tc=new Set(["create_skill","list_skills","store_memory","search_memory","delete_memory","update_memory","get_schedules","delete_schedule","create_schedule","toggle_schedule","gmail_unread_count"]),Sc=3,kc=3,ua=5,ma=.4,pa=5;async function ha(e,t,n,s,r,a,i=!0){try{const o=r.filter(v=>!Tc.has(v));if(o.length<Sc)return;const l=[...[...new Set(o)]].sort().join(","),d=await e.prepare(`INSERT INTO skill_patterns (user_id, tool_signature, user_message_sample, tool_sequence, turn_count, succeeded)
       VALUES (?, ?, ?, ?, ?, ?)
       RETURNING id`).bind(n.id,l,s.slice(0,500),JSON.stringify(o),a,i?1:0).first(),u=await e.prepare("SELECT COUNT(*) as c FROM skill_patterns WHERE user_id = ? AND tool_signature = ?").bind(n.id,l).first(),p=(u==null?void 0:u.c)??0,h=await e.prepare(`SELECT auto_skill_id FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id IS NOT NULL LIMIT 1`).bind(n.id,l).first();if(h!=null&&h.auto_skill_id){d!=null&&d.id&&await e.prepare("UPDATE skill_patterns SET auto_skill_id = ? WHERE id = ?").bind(h.auto_skill_id,d.id).run(),await xc(e,n,h.auto_skill_id,l),i&&await Nc(e,t,n,h.auto_skill_id,o,s);return}p>=kc&&await Rc(e,t,n,l,o)}catch{}}async function xc(e,t,n,s){const r=await e.prepare(`SELECT AVG(CAST(succeeded AS REAL)) as avg_success, COUNT(*) as total
     FROM (
       SELECT succeeded FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id = ?
       ORDER BY created_at DESC LIMIT 20
     )`).bind(t.id,s,n).first(),a=(r==null?void 0:r.avg_success)??1,i=(r==null?void 0:r.total)??0,o=a<ma&&i>=pa;if(await e.prepare(`UPDATE user_skills
     SET usage_count = usage_count + 1,
         last_used_at = CURRENT_TIMESTAMP,
         confidence_score = ?,
         enabled = CASE WHEN ? THEN 0 ELSE enabled END,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`).bind(a,o?1:0,n,t.id).run(),o){const c=await e.prepare("SELECT name FROM user_skills WHERE id = ?").bind(n).first();c&&await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source, is_read)
         VALUES (?, 'warning', ?, ?, 'skills', 0)`).bind(t.id,`Auto-skill disabled: ${c.name}`,`The skill "${c.name}" was auto-disabled because its success rate dropped below 40% after ${i} uses. You can re-enable or delete it in Settings → Skills.`).run()}}async function fa(e,t){try{const s=(await e.prepare(`SELECT name, description, instructions, usage_count
       FROM user_skills
       WHERE user_id = ? AND is_auto = 1 AND enabled = 1
       ORDER BY usage_count DESC, created_at DESC
       LIMIT 5`).bind(t).all()).results??[];return s.length===0?"":`## Proven Procedures (Auto-Learned)
These workflows were automatically distilled from your past multi-step requests. When a new request closely matches one, follow its procedure without re-reasoning from scratch:

${s.map(a=>`**${a.name}** (used ${a.usage_count}×)
${a.instructions}`).join(`

---

`)}
`}catch{return""}}async function Dc(e,t,n){var i;let s=0,r=0,a=0;try{const o=await e.prepare(`SELECT us.id, us.user_id, us.name, us.instructions, us.refinement_count,
              us.confidence_score, us.usage_count
       FROM user_skills us
       WHERE us.user_id = ? AND us.is_auto = 1 AND us.enabled = 1
         AND us.confidence_score < ? AND us.usage_count >= ?`).bind(n,ma,pa).all();for(const c of o.results??[]){s++;const l=await e.prepare(`SELECT user_message_sample, tool_sequence
         FROM skill_patterns
         WHERE auto_skill_id = ? AND succeeded = 1
         ORDER BY created_at DESC LIMIT 3`).bind(c.id).all();if((l.results??[]).length<2||c.refinement_count>=ua){await e.prepare("UPDATE user_skills SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(c.id).run(),await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source, is_read)
           VALUES (?, 'warning', ?, ?, 'skills', 0)`).bind(c.user_id,`Auto-skill retired: ${c.name}`,`"${c.name}" had a ${Math.round(c.confidence_score*100)}% success rate and couldn't be improved — disabled. Check Settings → Skills to manage it.`).run(),a++;continue}const d=l.results.map(h=>h.user_message_sample),u=JSON.parse(l.results[0].tool_sequence),p=[{role:"system",content:"You are a workflow optimizer. Rewrite a skill procedure so it is more reliable, based on examples that previously succeeded."},{role:"user",content:`Skill "${c.name}" has a ${Math.round(c.confidence_score*100)}% success rate.

Current instructions:
${c.instructions}

Recent successful examples:
${d.map((h,v)=>`${v+1}. "${h}"`).join(`
`)}
Tools used: ${u.join(" → ")}

Rewrite the instructions to be clearer and more reliable. Keep them under 200 words.
Respond with EXACTLY:
REWRITTEN_INSTRUCTIONS: <revised instructions>`}];try{const f=(((i=(await t.chat(p,{tools:[]})).content)==null?void 0:i.trim())??"").match(/^REWRITTEN_INSTRUCTIONS:\s*([\s\S]+)$/m);f&&f[1].trim()&&(await e.prepare(`UPDATE user_skills
             SET instructions = ?, refinement_count = refinement_count + 1, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`).bind(f[1].trim(),c.id).run(),r++)}catch{await e.prepare("UPDATE user_skills SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(c.id).run(),a++}}}catch{}return{reviewed:s,rewritten:r,disabled:a}}async function Rc(e,t,n,s,r){var x;const i=((await e.prepare(`SELECT user_message_sample, tool_sequence
     FROM skill_patterns
     WHERE user_id = ? AND tool_signature = ?
     ORDER BY created_at DESC LIMIT 3`).bind(n.id,s).all()).results??[]).map(A=>A.user_message_sample),o=[{role:"system",content:"You are a workflow analyst. Given examples of user requests that all triggered the same multi-tool sequence, write a concise reusable skill procedure."},{role:"user",content:`These user requests all produced the same multi-tool workflow:

${i.map((A,N)=>`${N+1}. "${A}"`).join(`
`)}

Tools used (in order): ${r.join(" → ")}

Write a reusable skill. Respond with EXACTLY these three fields (no extra text):
NAME: <2-4 word skill name>
DESCRIPTION: <one sentence — what this skill does>
INSTRUCTIONS: <step-by-step instructions referencing exact tool names, under 200 words>`}],l=((x=(await t.chat(o,{tools:[]})).content)==null?void 0:x.trim())??"",d=l.match(/^NAME:\s*(.+)$/m),u=l.match(/^DESCRIPTION:\s*(.+)$/m),p=l.match(/^INSTRUCTIONS:\s*([\s\S]+)$/m);if(!d||!u||!p)return;const h=d[1].trim(),v=u[1].trim(),f=p[1].trim();if(!h||!v||!f)return;let g=`auto_${h.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").substring(0,40)}`;await e.prepare("SELECT id FROM user_skills WHERE user_id = ? AND slug = ?").bind(n.id,g).first()&&(g=`${g}_${Date.now().toString().slice(-4)}`);const T=await e.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, required_tools, is_auto, source)
     VALUES (?, ?, ?, ?, ?, ?, 1, 'auto')
     RETURNING id`).bind(n.id,h,g,v,f,JSON.stringify(r)).first();T!=null&&T.id&&await e.prepare("UPDATE skill_patterns SET auto_skill_id = ? WHERE user_id = ? AND tool_signature = ?").bind(T.id,n.id,s).run()}async function Nc(e,t,n,s,r,a){var u;const i=await e.prepare("SELECT name, instructions, refinement_count FROM user_skills WHERE id = ? AND user_id = ?").bind(s,n.id).first();if(!i||i.refinement_count>=ua)return;const o=[{role:"system",content:"You are a workflow optimizer. Given an existing skill and a new usage example, decide if the instructions should be improved."},{role:"user",content:`Existing skill "${i.name}":
${i.instructions}

New example that used this same workflow:
User asked: "${a}"
Tools used: ${r.join(" → ")}

If the existing instructions are accurate and complete for this new example, respond with exactly:
NO_CHANGE

If you can improve clarity or add a genuinely useful detail, respond with:
UPDATED_INSTRUCTIONS: <revised instructions, under 200 words>

Keep changes minimal. Only update if the new example reveals a real gap.`}],l=((u=(await t.chat(o,{tools:[]})).content)==null?void 0:u.trim())??"";if(!l||l.startsWith("NO_CHANGE")||!l.includes("UPDATED_INSTRUCTIONS:"))return;const d=l.replace(/^UPDATED_INSTRUCTIONS:\s*/m,"").trim();!d||d===i.instructions||await e.prepare(`UPDATE user_skills
     SET instructions = ?, refinement_count = refinement_count + 1, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`).bind(d,s).run()}function Ic(e,t,n){const s={timestamp:new Date().toISOString(),level:e,message:t};n&&Object.keys(n).length>0&&Object.assign(s,n);try{return JSON.stringify(s)}catch{return JSON.stringify({timestamp:s.timestamp,level:e,message:t,context:"[unserializable context]"})}}function us(e,t,n){const s=Ic(e,t,n);switch(e){case"error":console.error(s);break;case"warn":console.warn(s);break;case"debug":console.debug(s);break;default:console.log(s)}}function js(e,t){us("info",e,t)}function ms(e,t){us("warn",e,t)}function vt(e,t){us("error",e,t)}const Cc="https://ash-doc.pages.dev";class me extends Error{constructor(){super('Unified Docs API key not configured. Go to Settings → API, add a credential with service name "unified-doc-management" and paste your API key from ash-doc.pages.dev/settings.'),this.name="UDMNotConfiguredError"}}async function fe(e,t,n){const s=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"unified-doc-management").first();if(!s)throw new me;return G(s.encrypted_value,n)}async function ie(e,t,n={}){const s=`${Cc}/api${t}`,r={"X-API-Key":e,...n.headers};return n.body&&(r["Content-Type"]="application/json"),fetch(s,{...n,headers:r})}async function Te(e){var r;const t=await ie(e,"/workspaces");if(!t.ok)throw new Error(`UDM workspace lookup failed (${t.status})`);const s=(r=(await t.json()).workspaces)==null?void 0:r[0];if(!s)throw new Error("No workspaces found for this API key.");return s.id}async function _e(e,t,n){const s=await ie(e,`/search?q=${encodeURIComponent(n)}`);if(s.ok){const i=await s.json(),o=(i.results||[]).find(l=>l.title.toLowerCase()===n.toLowerCase());if(o)return o;const c=(i.results||[]).find(l=>l.title.toLowerCase().includes(n.toLowerCase())||n.toLowerCase().includes(l.title.toLowerCase()));if(c)return c}const r=await ie(e,`/workspaces/${t}/pages`);return r.ok?((await r.json()).pages||[]).find(i=>i.title.toLowerCase()===n.toLowerCase()||i.title.toLowerCase().includes(n.toLowerCase()))??null:null}const Oc=/^(#{1,6}\s|[-*+]\s|>\s|```|\{\{database:)/;function Ac(e){return Oc.test(e)}function Lc(e,t){const n=e.trim(),s=t.trim();return/[.!?:"']$/.test(n)&&/^[A-Z0-9"'(]/.test(s)}function zt(e){return e.trim().replace(/^#+\s*/,"").toLowerCase()}function Mc(e,t){var a;const n=e.trim();if(!n)return(t==null?void 0:t.trim())||null;const s=n.match(/^#{1,6}\s+(.+?)(?:\n|$)/);if(s)return s[1].trim();const r=(a=n.split(`
`)[0])==null?void 0:a.trim();return r&&t&&zt(r)===zt(t)?r.replace(/^#+\s*/,"").trim():(t==null?void 0:t.trim())||null}function $c(e,t){var i;const n=zt(t);if(!n)return!0;const s=e.trim(),r=s.match(/^#{1,6}\s+(.+?)(?:\n|$)/);if(r&&zt(r[1])===n)return!0;const a=(i=s.split(`
`)[0])==null?void 0:i.trim();return!!(a&&zt(a)===n)}function ga(e,t,n){const s=Tn(t),r=Mc(e,n);return!r||$c(s,r)?s:`# ${r}

${s}`}function Tn(e){let t=e.trim();if(!t)return t;if(t=t.replace(/\n\s*---+\s*\n/g,`

`),t=t.replace(/^\s*---+\s*\n/,""),t=t.replace(/\n\s*---+\s*$/,""),t=t.replace(/\n{3,}/g,`

`),!/\n\n/.test(t)&&/\n/.test(t)){const n=t.split(`
`),s=[];let r=[];const a=()=>{r.length&&(s.push(r.join(" ")),r=[])};for(const i of n){const o=i.trim();o===""?a():Ac(o)?(a(),s.push(o)):(r.length&&Lc(r[r.length-1],o)&&a(),r.push(o))}a(),t=s.join(`

`)}return t}async function Pc(e,t,n){var l;const s=await fe(e,t,n),r=await Te(s),a=await ie(s,`/workspaces/${r}/pages`);if(!a.ok)throw new Error(`Failed to list pages (${a.status})`);const i=await a.json();if(!((l=i.pages)!=null&&l.length))return"No pages found in your Unified Docs workspace.";const o={page:[],folder:[],database:[]};for(const d of i.pages){const u=d.type;o[u]?o[u].push(d.title):o.page.push(d.title)}const c=[];return o.folder.length&&c.push(`**Folders:** ${o.folder.join(", ")}`),o.database.length&&c.push(`**Databases:** ${o.database.join(", ")}`),o.page.length&&c.push(`**Pages:** ${o.page.join(", ")}`),c.join(`
`)}async function jc(e,t,n,s,r,a){const i=await fe(e,t,n),o=await Te(i),c=await _e(i,o,s);if(c&&c.title.toLowerCase()===s.toLowerCase()){if(r){const h=await ie(i,`/pages/${c.id}/markdown`),v=h.ok&&(await h.json()).markdown||"",f=ga(v,r,c.title),g=await ie(i,`/pages/${c.id}/markdown`,{method:"PUT",body:JSON.stringify({markdown:f})});return g.ok?`Page "${c.title}" already existed — content updated in Unified Docs (use udm_write_page for future rewrites).`:`Page "${c.title}" already exists but content could not be updated (${g.status}). Use udm_write_page to update it.`}return`Page "${c.title}" already exists in Unified Docs. Use udm_write_page to update its content.`}let l;if(a){const h=await _e(i,o,a);if(!h)return`Could not find parent page "${a}" in your workspace.`;l=h.id}const d=await ie(i,`/workspaces/${o}/pages`,{method:"POST",body:JSON.stringify({title:s,type:"page",...l?{parentId:l}:{}})});if(!d.ok){const h=await d.text().catch(()=>String(d.status));throw new Error(`Failed to create page: ${h}`)}const p=(await d.json()).page.id;if(r){const h=Tn(r),v=await ie(i,`/pages/${p}/markdown`,{method:"PUT",body:JSON.stringify({markdown:h})});if(!v.ok)return`Page "${s}" was created but content could not be saved (${v.status}). Open it on ash-doc.pages.dev to add content manually.`}return`Page "${s}" created successfully in Unified Docs.`}async function Uc(e,t,n,s){const r=await fe(e,t,n),a=await Te(r),i=await _e(r,a,s);if(!i)return`Could not find a page titled "${s}" in your Unified Docs workspace.`;const o=await ie(r,`/pages/${i.id}/markdown`);if(!o.ok)throw new Error(`Failed to read page (${o.status})`);return(await o.json()).markdown||"(Page is empty)"}async function Bc(e,t,n,s,r){const a=await fe(e,t,n),i=await Te(a),o=await _e(a,i,s);if(!o)return`Could not find a page titled "${s}" in your Unified Docs workspace.`;const c=await ie(a,`/pages/${o.id}/markdown`),l=c.ok&&(await c.json()).markdown||"",d=ga(l,r,o.title),u=await ie(a,`/pages/${o.id}/markdown`,{method:"PUT",body:JSON.stringify({markdown:d})});if(!u.ok)throw new Error(`Failed to update page (${u.status})`);return`Page "${o.title}" updated in Unified Docs.`}async function Hc(e,t,n,s){var o;const r=await fe(e,t,n),a=await ie(r,`/search?q=${encodeURIComponent(s)}`);if(!a.ok)throw new Error(`Search failed (${a.status})`);const i=await a.json();return(o=i.results)!=null&&o.length?i.results.map(c=>{var d;const l=(d=c.snippet)==null?void 0:d.replace(/<\/?mark>/g,"").replace(/\s+/g," ").trim();return`- **${c.title}** (${c.type})${l?`: ${l}`:""}`}).join(`
`):`No results found for "${s}" in Unified Docs.`}async function Fc(e,t,n,s){const r=await fe(e,t,n),a=await Te(r),i=await _e(r,a,s);if(!i)return`Could not find a page titled "${s}" in your Unified Docs workspace.`;const o=await ie(r,`/pages/${i.id}`,{method:"DELETE"});if(!o.ok)throw new Error(`Failed to delete page (${o.status})`);return`Page "${i.title}" deleted from Unified Docs.`}async function Wc(e,t,n,s){var l;const r=await fe(e,t,n),a=await Te(r),i=await _e(r,a,s);if(!i)return`Could not find a page titled "${s}" in your Unified Docs workspace.`;const o=await ie(r,`/pages/${i.id}/comments`);if(!o.ok)throw new Error(`Failed to fetch comments (${o.status})`);const c=await o.json();return(l=c.comments)!=null&&l.length?c.comments.map(d=>{const u=new Date(d.created_at*1e3).toISOString().slice(0,10),p=d.author_name?` — ${d.author_name}`:"";return`[id: ${d.id}, ${u}${p}]: ${d.content}`}).join(`
`):`No comments on "${i.title}".`}async function qc(e,t,n,s,r){const a=await fe(e,t,n),i=await Te(a),o=await _e(a,i,s);if(!o)return`Could not find a page titled "${s}" in your Unified Docs workspace.`;const c=await ie(a,`/pages/${o.id}/comments`,{method:"POST",body:JSON.stringify({content:r})});if(!c.ok)throw new Error(`Failed to add comment (${c.status})`);return`Comment added to "${o.title}" in Unified Docs.`}async function ps(e,t){const n=await ie(e,`/pages/${t}/database`);if(!n.ok)throw new Error(`Failed to fetch database (${n.status})`);return await n.json()}function ya(e){const t=new Map;for(const n of e)t.set(n.name.toLowerCase(),n);return t}function va(e,t){const n={},s=[];for(const[r,a]of Object.entries(e)){const i=t.get(r.toLowerCase());if(!i){s.push(`Unknown column "${r}"`);continue}if(i.type==="rollup"||i.type==="relation"){s.push(`Column "${r}" (${i.type}) cannot be set directly`);continue}if(i.type==="select"&&typeof a=="string")try{const o=JSON.parse(i.options);if(o.length&&!o.some(c=>c.toLowerCase()===a.toLowerCase())){s.push(`"${a}" is not a valid option for "${r}". Valid: ${o.join(", ")}`);continue}}catch{}if(i.type==="multi_select"&&Array.isArray(a))try{const o=JSON.parse(i.options),c=a.filter(l=>o.length&&!o.some(d=>d.toLowerCase()===l.toLowerCase()));if(c.length){s.push(`Invalid option(s) "${c.join(", ")}" for "${r}". Valid: ${o.join(", ")}`);continue}}catch{}n[i.id]=a}return{resolved:n,errors:s}}async function Gc(e,t,n,s,r,a){const i=await fe(e,t,n),o=await Te(i);let c,l;if(a){const p=await _e(i,o,a);if(!p)return`Could not find page "${a}" to embed the database into.`;if(p.type!=="page")return`"${p.title}" is a ${p.type} — inline databases can only be embedded in pages, not folders or databases.`;l=p.id}else if(r){const p=await _e(i,o,r);if(!p)return`Could not find parent "${r}" in your workspace.`;c=p.id}const d={title:s,type:"database"};l?d.embedInPageId=l:c&&(d.parentId=c);const u=await ie(i,`/workspaces/${o}/pages`,{method:"POST",body:JSON.stringify(d)});if(!u.ok){const p=await u.text().catch(()=>String(u.status));throw new Error(`Failed to create database: ${p}`)}return l?`Database "${s}" created and embedded inline on page "${a}" in Unified Docs.`:`Database "${s}" created in Unified Docs.`}async function zc(e,t,n,s){const r=await fe(e,t,n),a=await Te(r),i=await _e(r,a,s);if(!i)return`Could not find a database titled "${s}" in your Unified Docs workspace.`;if(i.type!=="database")return`"${i.title}" is a ${i.type}, not a database.`;const{properties:o,rows:c}=await ps(r,i.id);if(!(o!=null&&o.length))return`Database "${i.title}" has no columns defined yet.`;const l=o.filter(u=>u.type!=="rollup").map(u=>{let p="";try{const h=JSON.parse(u.options);Array.isArray(h)&&h.length&&(p=`: ${h.join(", ")}`)}catch{}return`- ${u.name} (${u.type})${p}`}),d=(c||[]).map((u,p)=>{let h={};try{h=JSON.parse(u.properties)}catch{}const v=[];u.page_title&&v.push(`Name: ${u.page_title}`);for(const f of o){if(f.type==="rollup")continue;const g=h[f.id];if(g==null||g==="")continue;const w=Array.isArray(g)?g.join(", "):String(g);v.push(`${f.name}: ${w}`)}return`${p+1}. [id: ${u.id}] ${v.join(" | ")}`});return[`## Database: ${i.title} (${(c==null?void 0:c.length)??0} rows)`,"","Columns:",...l,"",...c!=null&&c.length?["Rows:",...d]:["(No rows yet)"]].join(`
`)}async function Kc(e,t,n,s,r,a){const i=await fe(e,t,n),o=await Te(i),c=await _e(i,o,s);if(!c)return`Could not find a database titled "${s}" in your Unified Docs workspace.`;const l=await ps(i,c.id),d=ya(l.properties),{resolved:u,errors:p}=va(r,d);if(p.length)return`Cannot add row: ${p.join("; ")}`;const h={properties:u};a&&(h.title=a);const v=await ie(i,`/pages/${c.id}/database/rows`,{method:"POST",body:JSON.stringify(h)});if(!v.ok){const f=await v.text().catch(()=>String(v.status));throw new Error(`Failed to add row: ${f}`)}return`Row added to database "${c.title}".`}async function Yc(e,t,n,s,r,a){const i=await fe(e,t,n),o=await Te(i),c=await _e(i,o,s);if(!c)return`Could not find a database titled "${s}" in your Unified Docs workspace.`;const l=await ps(i,c.id),d=ya(l.properties),{resolved:u,errors:p}=va(a,d);if(p.length)return`Cannot update row: ${p.join("; ")}`;const h=await ie(i,`/pages/${c.id}/database/rows/${r}`,{method:"PATCH",body:JSON.stringify({properties:u})});if(!h.ok)throw new Error(`Failed to update row (${h.status})`);return`Row updated in database "${c.title}".`}async function Jc(e,t,n,s,r){const a=await fe(e,t,n),i=await Te(a),o=await _e(a,i,s);if(!o)return`Could not find a database titled "${s}" in your Unified Docs workspace.`;const c=await ie(a,`/pages/${o.id}/database/rows/${r}`,{method:"DELETE"});if(!c.ok)throw new Error(`Failed to delete row (${c.status})`);return`Row deleted from database "${o.title}".`}async function Vc(e,t,n,s,r,a,i){const o=await fe(e,t,n),c=await Te(o),l=await _e(o,c,s);if(!l)return`Could not find a database titled "${s}" in your Unified Docs workspace.`;const d=["text","number","date","select","multi_select","checkbox"];if(!d.includes(a))return`Invalid column type "${a}". Valid types: ${d.join(", ")}.`;let u=i;typeof i=="string"&&(a==="select"||a==="multi_select")&&(u=i.split(",").map(v=>v.trim()).filter(Boolean));const p={name:r,type:a};u!==void 0&&(p.options=u);const h=await ie(o,`/pages/${l.id}/database/properties`,{method:"POST",body:JSON.stringify(p)});if(!h.ok){const v=await h.text().catch(()=>String(h.status));throw new Error(`Failed to add column: ${v}`)}return`Column "${r}" (${a}) added to database "${l.title}".`}async function Zc(e,t,n,s){const r=await fe(e,t,n),a=await Te(r),i=await _e(r,a,s);if(!i)return`Could not find a page titled "${s}" in your Unified Docs workspace.`;const[o,c]=await Promise.all([ie(r,`/pages/${i.id}/markdown`),ie(r,`/pages/${i.id}/comments`)]),l=o.ok?await o.json():{markdown:"(could not read page content)"},d=c.ok?await c.json():{comments:[]},u=l.markdown||"(empty)",p=(d.comments||[]).map(h=>{const v=new Date(h.created_at*1e3).toISOString().slice(0,10),f=h.author_name?` — ${h.author_name}`:"";return`[id: ${h.id}, ${v}${f}]: ${h.content}`});return p.length?`## Page: ${i.title}

${u}

---
## Comments (${p.length})

${p.join(`
`)}`:`## Page: ${i.title}

${u}

---
(No comments on this page)`}async function Xc(e,t,n,s){const r=await fe(e,t,n),a=await ie(r,`/comments/${s}`,{method:"PATCH",body:JSON.stringify({status:"resolved"})});if(!a.ok)throw new Error(`Failed to resolve comment (${a.status})`);return`Comment ${s} marked as resolved.`}async function Qc(e,t,n,s,r,a,i,o){const c=await fe(e,t,n),l=await Te(c),d=await _e(c,l,s);if(!d)return`Could not find a page titled "${s}" in your Unified Docs workspace.`;const u={old_text:r,new_text:Tn(a)};i&&(u.comment_id=i),o!==void 0&&(u.occurrence=o);const p=await ie(c,`/pages/${d.id}/edit-section`,{method:"POST",body:JSON.stringify(u)});if(!p.ok){if(p.status===404)return`Could not find the specified text in "${d.title}". Make sure old_text matches exactly (including whitespace). Use udm_read_page to inspect the current content.`;if(p.status===409)return`Found ${(await p.json().catch(()=>({error:"ambiguous match"}))).match_count??"multiple"} matches for the specified text in "${d.title}" — ambiguous. Retry with occurrence: "first" to replace the first match, "all" to replace all, or a number (1, 2, …) to target a specific one.`;const f=await p.text().catch(()=>String(p.status));throw new Error(`Failed to edit section: ${f}`)}const h=await p.json(),v=[`Section updated in "${d.title}" (${h.replaced??1} replacement).`];return i&&h.comment_resolved&&v.push("Comment resolved."),h.open_count!==void 0&&v.push(`${h.open_count} agent instruction(s) still open on this page.`),v.join(" ")}async function el(e,t,n,s){var l;const r=await fe(e,t,n),a=await Te(r),i=await _e(r,a,s);if(!i)return`Could not find a page titled "${s}" in your Unified Docs workspace.`;const o=await ie(r,`/pages/${i.id}/agent-comments?status=open`);if(!o.ok)throw new Error(`Failed to fetch agent comments (${o.status})`);const c=await o.json();return(l=c.comments)!=null&&l.length?c.comments.map((d,u)=>{const p=d.selection_quote?`
Selected text: "${d.selection_quote}"`:"";return`${u+1}. [id: ${d.id}]${p}
Instruction: ${d.agent_prompt}`}).join(`

`):`No open agent instructions on "${i.title}".`}async function tl(e,t,n,s,r,a,i){const o=await fe(e,t,n),c={new_text:Tn(r)};a!==void 0&&(c.old_text=a),i!==void 0&&(c.occurrence=i);const l=await ie(o,`/comments/${s}/apply`,{method:"POST",body:JSON.stringify(c)});if(!l.ok){if(l.status===404)return"Could not find the highlighted text in the page — it may have changed since the comment was made. Use udm_edit_section with explicit old_text/new_text instead.";if(l.status===409)return`Found ${(await l.json().catch(()=>({match_count:"multiple"}))).match_count??"multiple"} matches for the highlighted text — ambiguous. Retry with occurrence: "first" or a number.`;const p=await l.text().catch(()=>String(l.status));throw new Error(`Failed to apply comment edit: ${p}`)}const d=await l.json(),u=[`Comment ${s} applied and resolved.`];return d.open_count!==void 0&&d.open_count>0?u.push(`${d.open_count} agent instruction(s) still open on this page.`):d.open_count===0&&u.push("All agent instructions resolved."),u.join(" ")}const nl=2e3,sl=2e3,wa=4;function Mn(e){return Math.ceil(e.length/wa)}function $n(e,t){const n=t*wa;return e.length<=n?e:e.slice(0,n)+`
[...truncated to fit token budget]`}const _a=6e3,Kn="The user is following up on prior research in this thread. Answer from the injected research context first. If the follow-up requires new or updated information, call the research tool again with a query that includes the original topic.";function hs(e){try{const t=JSON.parse(e||"{}");return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function ba(e,t){const n=[...new Set(e)],s={};return n.length>0&&(s.tools=n),t&&(s.research_query=t.query.substring(0,200),s.research_report=t.report.substring(0,_a)),JSON.stringify(s)}function fs(e){const t=[];for(const n of e)if(!(n.role!=="user"&&n.role!=="assistant")){if(n.role==="assistant"){const s=hs(n.metadata);s.research_report&&t.push({role:"user",content:`[Tool Result for research]: ${s.research_report}`})}t.push({role:n.role,content:n.content})}return t}function Ea(e){return e.slice(-6).map(t=>{var n;return t.role==="assistant"&&(n=hs(t.metadata).tools)!=null&&n.includes("research")?`[TOOLS_USED: research] ${t.content}`:t.content}).join(`
`)}function gs(e){var t;for(let n=e.length-1;n>=0;n--){const s=e[n];if(s.role==="assistant")return((t=hs(s.metadata).tools)==null?void 0:t.includes("research"))??!1}return!1}function Ta(e,t,n,s){return e!=="research"||/^(Research failed|Research error|Research timed out|\[Tool Error)/i.test(n)?s:{query:String(t.query||""),report:n.substring(0,_a)}}function Sa(e,t){if(!t)return;const n=e[e.length-1];(n==null?void 0:n.role)!=="user"||typeof n.content!="string"||n.content.startsWith(Kn)||(e[e.length-1]={role:"user",content:`${Kn}

${n.content}`})}function ys(e){const t=new Set(["(Previous response was not recorded.)","(Previous request did not complete. Please try again.)","(My previous response was cut off before completing. Starting fresh.)"]),n=[];for(const r of e){const a=typeof r.content=="string"?r.content:"";if(r.role==="assistant"&&t.has(a.trim())&&n.length>0&&n[n.length-1].role==="user"){n.pop();continue}n.push(r)}const s=[];for(const r of n){let a=r.content;r.role==="assistant"&&typeof a=="string"&&(a=a.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim(),a||(a="(Previous response was not recorded.)"));const i=a!==r.content?{...r,content:a}:r;s.length>0&&s[s.length-1].role===i.role&&i.role!=="system"?s[s.length-1]={...s[s.length-1],content:s[s.length-1].content+`

`+i.content}:s.push(i)}return s}const Us=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes (recurring). daily = RECURRING every single day at HH:MM — only use if user explicitly says "every day", "daily", or "each morning" etc. weekly = recurring every week on a specific day at time. once = fires ONE TIME at a specific date+time — USE THIS as the DEFAULT for any reminder that is not explicitly recurring (e.g. "remind me at 8pm", "remind me tomorrow at 9am", "remind me Sunday at 8:45am" are all once, not daily). IMPORTANT: NEVER use interval/daily/weekly for tasks that send emails to external recipients — use once instead. Recurring email-sending tasks spam the recipient on every cron tick.'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration requests: "in 5 minutes", "in 2 hours", "in half an hour". Do NOT use for any request that mentions a specific time or date ("at 13:00", "tomorrow at noon", "next Friday") — use schedule_value instead. Examples: "in 5 minutes" = 5, "in 2 hours" = 120.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"update_schedule",description:'Update an existing scheduled task — change its name, description, or reschedule it to a new time. Use this when the user wants to change the time of a reminder or rename it. You MUST call this tool — never say "updated" without calling it.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to update (get it from list_schedules first if unknown)"},name:{type:"string",description:"New name for the task (optional)"},description:{type:"string",description:"New description (optional)"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:"New schedule type (required if changing the time)"},schedule_value:{type:"string",description:"New schedule value matching the schedule_type format (required if changing the time)"},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration changes ("in 30 minutes", "in 2 hours"). Do NOT use if the user specifies a clock time or date — use schedule_value instead.'}},required:["job_id"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:`Store a PERMANENT rule, preference, or standing instruction that Karna should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts — those go to create_schedule. NEVER USE FOR: full text of essays, articles, reports, drafts, or any document body — those belong in document_library (if uploaded) or create_doc (Google Drive). A URL/title pointer is OK (type='context'), but never the body. Ask yourself: "Will this still be relevant in 6 months and is it a preference/rule, not a document?" If no, do not store it.`,parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"delete_memory",description:'Delete a stored memory entry by its ID. Use when the user says "forget that", "remove that rule", or "that preference is wrong". Always call search_memory first to confirm the correct ID. Confirm with the user if there is any ambiguity about which entry to remove.',parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to delete"}},required:["id"]}},{name:"update_memory",description:"Update the content of an existing memory entry by its ID. Use when the user wants to correct or change a stored rule or preference. Always call search_memory first to find the correct ID.",parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to update"},content:{type:"string",description:"The new content to replace the existing entry"}},required:["id","content"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"delete_sheet_row",description:"Delete a specific row from a Google Sheet tab by row number. The row number is as displayed in the sheet (1-based: row 1 = header, row 2 = first data row). Rows below shift up. ALWAYS call read_sheet first to confirm the exact row number before deleting. Cannot delete row 1 (header).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},sheet_name:{type:"string",description:'Tab name exactly as shown in the sheet (e.g. "Sheet1", "Budget", "January")'},row_number:{type:"number",description:"Row number to delete (1-based, as shown in the sheet). Minimum 2."}},required:["spreadsheet_id","sheet_name","row_number"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"rewrite_doc",description:"Replace the entire content of an existing Google Document with new formatted content. Use this to reformat or clean up a document — clears the current content and rewrites it with proper headings, bold, bullet points etc. Workflow: read_doc to get current content → rewrite_doc with reformatted version.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to rewrite (from URL: docs.google.com/document/d/{ID}/edit)"},content:{type:"string",description:"New formatted content (supports markdown: # ## ### headings, **bold**, *italic*, - bullets)"}},required:["document_id","content"]}},{name:"delete_doc_content",description:"Remove specific text from a Google Document by exact string match. Removes ALL occurrences of the text. Use this to delete a duplicate entry — call read_doc first to find the exact text. If text appears twice (duplicate), both copies are removed; use append_to_doc immediately after to add the single correct version back.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"},text_to_remove:{type:"string",description:"Exact text to remove, including any surrounding whitespace or line breaks needed to cleanly remove the entry."}},required:["document_id","text_to_remove"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_search/gmail_list. The Date line is the email received date. For purchase lookups, prefer order-confirmation emails (they list items) over delivery/shipping notices (often item-less). If gmail_search subject/snippet already answers the user, report Date from search results without reading every message.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail syntax: from:, to:, subject:, newer_than:, etc. For product/purchase lookups, include product keywords in the query and set product_hint. Results include subject, snippet, and Date — often enough without gmail_read. Prefer order confirmations over delivery emails.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"},product_hint:{type:"string",description:"Product name for purchase lookups — ranks order confirmations above delivery notices"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. Use this when the user explicitly says "send" (not just "draft" or "compose"). STRICT RULES: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm the address. (2) The body must be based on content from this conversation (research results, user-provided text, or a draft composed earlier in this turn) — do NOT invent facts. Using an email body you just composed or drafted in the same conversation is fine. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:'Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Use this when the user says "draft", "compose", or "prepare" an email, OR when no explicit recipient address has been provided. If the user explicitly says "send" and provides an email address, use gmail_send instead. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_read_file",description:"Read the content of a specific Google Drive file by URL or file ID. Supports Google Docs (exported as text), Sheets (exported as CSV), PDFs (extracted via AI), and other text files. Use this when the user shares a Google Drive or Google Docs link and wants you to read, summarize, or analyze the file contents.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive or Google Docs URL (e.g. https://drive.google.com/file/d/... or https://docs.google.com/document/d/...) or bare file ID"},extract_focus:{type:"string",description:'Optional: specific content to focus extraction on (e.g. "financial figures", "action items", "table of contents")'}},required:["url_or_id"]}},{name:"drive_delete_file",description:"Move a Google Drive file or document to trash. The file can be restored from Drive trash within 30 days. Use when the user asks to delete, remove, or trash a file.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to trash"}},required:["url_or_id"]}},{name:"drive_organise",description:"Move a Google Drive file to a folder and/or rename it. Creates the folder if it does not exist. Use when the user wants to organise, move, or rename a file in Drive.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to move/rename"},folder_name:{type:"string",description:"Name of the destination folder. Creates it if it does not exist."},new_name:{type:"string",description:"Optional: new name for the file"}},required:["url_or_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets (~1s). Use ONLY when: (1) the user wants a list of links to browse, not a synthesized answer, (2) real-time scores or breaking headlines, or (3) fallback if research tool fails. If the user wants an actual answer (not links), use research instead.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:"Deep web research using Opus 4.8 and Tavily. Produces a cited report. Use depth:'quick' for factual lookups (~45-90s). Use depth:'thorough' for complex, analytical, comparative, or multi-part questions (~2-5 min, ~3 Opus API calls) — plans sub-queries, reads 15+ sources, identifies gaps, synthesizes a comprehensive structured report.",parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = Opus + Tavily (~45-90s). thorough = multi-phase deep research (~2-5 min, ~3 Opus API calls). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"save_note",description:"Save a note for future reference. Use when the user asks to save, remember, or note something specific. Also use after research when user wants to keep the report.",parameters:{type:"object",properties:{title:{type:"string",description:"Short title/headline for the note"},content:{type:"string",description:"The note content"},tags:{type:"string",description:'Comma-separated tags e.g. "work,ideas"'},source:{type:"string",enum:["manual","research","chat"],description:"Source of the note. Default: manual"},source_query:{type:"string",description:"Original query if source=research"}},required:["content"]}},{name:"search_notes",description:"Search the user's saved notes by keyword, topic, or tag.",parameters:{type:"object",properties:{query:{type:"string",description:"Search term"}},required:["query"]}},{name:"list_notes",description:"List recent notes, optionally filtered by tag.",parameters:{type:"object",properties:{limit:{type:"number",description:"Max notes to return (default 10)"},tag:{type:"string",description:"Filter by tag"},pinned_only:{type:"boolean",description:"Only show pinned notes"}}}},{name:"delete_note",description:"Delete a specific note by ID.",parameters:{type:"object",properties:{id:{type:"number",description:"Note ID to delete"}},required:["id"]}},{name:"browser_task",description:'Run a complete browser automation workflow using a real cloud browser. The cloud agent handles ALL steps — navigation, clicks, form fills, extraction — in a single call. CRITICAL: Always pass the ENTIRE multi-step workflow as one task description. Never split a browser workflow across multiple browser_task calls. Wrong: call 1 "go to site", call 2 "click X", call 3 "extract Y". Correct: one call with "go to site, click X, extract Y". Use for: JS-heavy sites, form submission, clicking through pages, any site requiring a real browser.',parameters:{type:"object",properties:{task:{type:"string",description:'Full Plain-English description of the COMPLETE workflow (e.g. "Go to news.ycombinator.com and return the top 5 story titles and URLs", "Go to books.toscrape.com, click the Mystery category, list the first 5 books with their star rating and price")'},site_name:{type:"string",description:'Name of a saved Secret Vault entry (e.g. "LinkedIn", "Outlook") to inject login credentials. REQUIRED for any site that needs a login. You MUST call vault_lookup first to find the exact entry name, then pass it here. If omitted for a login-required site, no credentials will be injected and the task will fail to authenticate.'}},required:["task"]}},{name:"browser_task_status",description:"Check the status of a previously started browser task that was still running when it timed out. Use when the user asks what happened with a browser task. Get the task_id from memory.",parameters:{type:"object",properties:{task_id:{type:"string",description:"The task ID returned by the earlier browser_task call (stored in memory)"}},required:["task_id"]}},{name:"vault_lookup",description:"Check the Secret Vault for saved login credentials by site name. Returns matching entry names (not actual credentials). Use this BEFORE calling browser_task whenever the user asks to access a site that requires a password or login.",parameters:{type:"object",properties:{site_name:{type:"string",description:'Site or service name to look up (e.g. "LinkedIn", "Gmail backup", "MyBank"). Case-insensitive, partial matches included.'}},required:["site_name"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"parse_document",description:"Read and extract text content from an uploaded file (PDF, Word/DOCX, images, or text). Call this whenever the user uploads a document and wants you to read it, extract information, or work with its contents.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id returned when the file was uploaded"},extract_focus:{type:"string",description:'Optional: specific information to focus on extracting (e.g., "quantities and equipment names", "dates and amounts", "all text content")'}},required:["file_id"]}},{name:"search_library",description:`Search the user's Document Library (uploaded files and migrated documents) by name, summary, or extracted text. Use this when the user asks "find my essay about X", "what did I upload about Y", "do I have a document on Z", or any question that might be answered by an uploaded file. Returns a list of matching documents with previews and IDs. Follow with read_library_file to get full text.`,parameters:{type:"object",properties:{query:{type:"string",description:"Search terms to look for in document name, summary, or extracted text"},limit:{type:"number",description:"Maximum number of results to return (1-20, default: 10)"}},required:["query"]}},{name:"read_library_file",description:"Read the full extracted text of a document from the Document Library. Use after search_library to get full content. Pass either the numeric document id (from search_library results) or a partial name. Returns up to 20,000 characters of extracted text.",parameters:{type:"object",properties:{id_or_name:{type:"string",description:"Numeric document ID from search_library results, or a partial document name to search by"}},required:["id_or_name"]}},{name:"create_skill",description:"Create a new reusable skill — a named workflow that can be invoked by name in future conversations. Use this when the user asks you to create a skill, save a workflow, or build a reusable automation. IMPORTANT: Before calling this, ask the user clarifying questions to understand: what the skill should do, what inputs it needs, what tools it uses, and what the expected output is.",parameters:{type:"object",properties:{name:{type:"string",description:'Human-readable skill name (e.g., "Equipment List Parser", "Daily Expense Logger")'},description:{type:"string",description:"One-sentence description of what the skill does"},instructions:{type:"string",description:"Detailed step-by-step instructions for executing the skill. Be specific about which tools to use, in what order, and what to do with the results."},required_tools:{type:"array",items:{type:"string"},description:'List of tool names this skill needs (e.g. ["parse_document", "append_sheet", "create_sheet"])'},parameters:{type:"object",description:"JSON schema describing the inputs this skill accepts. Use standard JSON schema format."},examples:{type:"array",description:"Optional example inputs and expected outputs to guide execution",items:{type:"object",properties:{input:{type:"object"},output:{type:"string"}}}}},required:["name","description","instructions"]}},{name:"list_skills",description:"List all custom skills the user has created. Shows name, description, and usage count for each.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled skills. Default: false"}}}},{name:"udm_list_pages",description:"List all pages, folders, and databases in the user's Unified Docs workspace. Use to browse what exists before reading or editing.",parameters:{type:"object",properties:{}}},{name:"udm_create_page",description:"Create a brand-new page in Unified Docs. Use ONLY when the page does not already exist. To rewrite or update an existing page use udm_write_page — never call this on a page that already exists, it will create a duplicate.",parameters:{type:"object",properties:{title:{type:"string",description:"Page title"},markdown:{type:"string",description:"Initial page content in markdown. Use blank lines between paragraphs. Never use --- for spacing. Supports # ## headings, **bold**, *italic*, - bullets."},parent_page_title:{type:"string",description:"Optional: title of an existing folder/page to nest this page under"}},required:["title"]}},{name:"udm_read_page",description:"Read the full markdown content of a Unified Docs page by its title. Use before editing to get the current content. Pages with embedded databases show {{database:ID|Title}} markers in the markdown.",parameters:{type:"object",properties:{page_title:{type:"string",description:"The title (or partial title) of the page to read"}},required:["page_title"]}},{name:"udm_write_page",description:"Rewrite or update the full content of an existing Unified Docs page. Use this when the user asks to rewrite, update, revise, or change a page — NOT udm_create_page. For a complete rewrite you may skip udm_read_page; call it first only when you need the current content to make partial changes.",parameters:{type:"object",properties:{page_title:{type:"string",description:"The title (or partial title) of the page to update"},markdown:{type:"string",description:"The new full content to write to the page (replaces existing content). Use blank lines between paragraphs. Never use --- for spacing. For reformatting, read page first, preserve wording AND the existing title/heading at the top. Supports # ## headings, **bold**, *italic*, - bullets."}},required:["page_title","markdown"]}},{name:"udm_search",description:"Full-text search across all pages and content in Unified Docs. Returns matching page titles and excerpts.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query"}},required:["query"]}},{name:"udm_delete_page",description:"Permanently delete a page from Unified Docs. Confirm with the user before calling this.",parameters:{type:"object",properties:{page_title:{type:"string",description:"The title of the page to delete"}},required:["page_title"]}},{name:"udm_list_comments",description:"List all comments on a specific Unified Docs page.",parameters:{type:"object",properties:{page_title:{type:"string",description:"The title (or partial title) of the page"}},required:["page_title"]}},{name:"udm_add_comment",description:"Post a new comment on a Unified Docs page.",parameters:{type:"object",properties:{page_title:{type:"string",description:"The title (or partial title) of the page to comment on"},content:{type:"string",description:"The comment text to post"}},required:["page_title","content"]}},{name:"udm_read_page_with_comments",description:`Fetch a Unified Docs page's full content AND all its comments in one call. Use this as the first step when the user asks you to "read the comments and apply edits" — it gives you both the current text and the edit instructions together.`,parameters:{type:"object",properties:{page_title:{type:"string",description:"The title (or partial title) of the page"}},required:["page_title"]}},{name:"udm_create_database",description:"Create a new database (spreadsheet-like table) in Unified Docs. Use embed_in_page_title to embed it inline on an existing page (appears inside the page content). Use parent_title to place it as a standalone child page under a folder. These are mutually exclusive — pick one. After creating, use udm_add_property to define columns.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new database"},parent_title:{type:"string",description:"Optional: title of a folder to place the database under as a standalone page. Mutually exclusive with embed_in_page_title."},embed_in_page_title:{type:"string",description:"Optional: title of an existing page to embed the database inline within (appears in the page's content). Mutually exclusive with parent_title."}},required:["title"]}},{name:"udm_read_database",description:"Read a Unified Docs database — returns all columns (with types and select options) and all rows with their values and row IDs. Call this before adding/updating/deleting rows so you can see existing data and valid option values.",parameters:{type:"object",properties:{page_title:{type:"string",description:"The title (or partial title) of the database"}},required:["page_title"]}},{name:"udm_add_row",description:"Add a new row to a Unified Docs database. Specify property values by column name. For select/multi_select columns use values from the allowed options (visible in udm_read_database output).",parameters:{type:"object",properties:{page_title:{type:"string",description:"The title (or partial title) of the database"},properties:{type:"object",description:'Column values keyed by column name. E.g. {"Status": "Done", "Priority": "High"}',additionalProperties:!0},title:{type:"string",description:"Optional: the row's display name / title"}},required:["page_title","properties"]}},{name:"udm_update_row",description:"Update an existing row in a Unified Docs database. Use udm_read_database first to get the row ID and see valid option values. Only the specified properties are changed; others remain untouched.",parameters:{type:"object",properties:{page_title:{type:"string",description:"The title (or partial title) of the database"},row_id:{type:"string",description:"The row ID from udm_read_database output (shown as [id: ...])"},properties:{type:"object",description:'Column values to update keyed by column name. E.g. {"Status": "Done"}',additionalProperties:!0}},required:["page_title","row_id","properties"]}},{name:"udm_delete_row",description:"Delete a row from a Unified Docs database. Use udm_read_database first to get the row ID.",parameters:{type:"object",properties:{page_title:{type:"string",description:"The title (or partial title) of the database"},row_id:{type:"string",description:"The row ID to delete (from udm_read_database output)"}},required:["page_title","row_id"]}},{name:"udm_add_property",description:"Add a new column to a Unified Docs database. Valid types: text, number, date, select, multi_select, checkbox. For select/multi_select, provide the allowed options.",parameters:{type:"object",properties:{page_title:{type:"string",description:"The title (or partial title) of the database"},name:{type:"string",description:"Column name"},type:{type:"string",description:"Column type: text, number, date, select, multi_select, or checkbox"},options:{description:'For select/multi_select: comma-separated string or array of option labels. E.g. "To Do, In Progress, Done"'}},required:["page_title","name","type"]}},{name:"udm_edit_section",description:'Surgically replace a specific portion of a Unified Docs page. Finds old_text exactly and replaces it with new_text — leaving the rest of the page untouched. Use udm_read_page first to get exact text. Optionally resolves a comment by ID after the edit. Returns 409 if old_text is ambiguous (multiple matches) — retry with occurrence: "first", "all", or a number.',parameters:{type:"object",properties:{page_title:{type:"string",description:"Title (or partial title) of the page to edit"},old_text:{type:"string",description:"Exact text to find in the page content (must match verbatim including whitespace)"},new_text:{type:"string",description:"Replacement text. Use blank lines between paragraphs. Never use --- for spacing."},comment_id:{type:"string",description:"Optional comment ID to mark as resolved after the edit"},occurrence:{type:"string",description:'Which match to replace if old_text appears multiple times: "first", "all", or a number (1, 2, …). Omit to require a unique match.'}},required:["page_title","old_text","new_text"]}},{name:"udm_resolve_comment",description:"Mark a comment on a Unified Docs page as resolved. Get the comment ID from udm_list_comments or udm_read_page_with_comments output.",parameters:{type:"object",properties:{comment_id:{type:"string",description:"The comment ID to resolve (shown as [id: ...] in comment listings)"}},required:["comment_id"]}},{name:"udm_list_agent_comments",description:'Fetch open agent instructions on a Unified Docs page. Unlike udm_list_comments (which returns discussion threads), this returns only agent_instruction comments — each with the highlighted text (selection_quote) and a pre-formatted agent_prompt combining the quote and the instruction. Use this as the first step when asked to "apply comments" or "action the instructions" on a page.',parameters:{type:"object",properties:{page_title:{type:"string",description:"Title (or partial title) of the page"}},required:["page_title"]}},{name:"udm_apply_comment",description:`Apply the edit for an agent instruction comment and resolve it in one call. The API automatically uses the comment's highlighted text (selection_quote) as old_text — you only provide new_text (the replacement). Returns open_count so you know how many instructions remain. Use after udm_list_agent_comments. If the highlighted text appears multiple times (409), retry with occurrence: "first" or a number.`,parameters:{type:"object",properties:{comment_id:{type:"string",description:"The agent comment ID to apply (from udm_list_agent_comments output)"},new_text:{type:"string",description:"The replacement text for the highlighted selection. Use blank lines between paragraphs. Never use --- for spacing."},old_text:{type:"string",description:"Optional: override the selection_quote for what to find. Only needed if the original highlight is no longer in the page."},occurrence:{type:"string",description:'Optional: "first", "all", or a number — which match to replace if selection_quote appears multiple times.'}},required:["comment_id","new_text"]}}];async function vs(e,t){try{const s=((await e.prepare("SELECT slug, name, description, parameters FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at ASC").bind(t).all()).results||[]).map(r=>{let a={};try{a=JSON.parse(r.parameters)||{}}catch{}return a.properties||(a={type:"object",properties:{inputs:{type:"string",description:"Any additional context or specific instructions for this skill execution"}}}),{name:r.slug,description:`[Custom Skill] ${r.description}`,parameters:a}});return[...Us,...s]}catch{return Us}}async function ws(e,t){try{const s=(await e.prepare("SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t).all()).results||[];return s.length===0?"":s.map(r=>`- ${r.content}`).join(`
`)}catch{return""}}function ka(e,t,n,s,r,a){const i=e.assistant_name||"Karna",o=e.personality_prompt?$n(`## Personality Instructions
${e.personality_prompt}
`,nl):"",c=s!=null&&s.trim()?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. They are fixed — do not store copies of these in your memory or contradict them.
${s}
`:"",l=$n(t,sl),d=a!=null&&a.trim()?$n(`## Pinned Notes Reference
${a}
`,1e3):"";let u="";try{const h=new Date;u=new Intl.DateTimeFormat("en-GB",{timeZone:e.timezone,day:"numeric",month:"short",year:"numeric"}).format(h)}catch{u=""}return`You are ${i}.

## Who You Are

Operational executor, not a chatbot. The person on the other end of an earpiece who has already thought three moves ahead and doesn't need to narrate the process.

Reference points for your character:
- **JARVIS** — tool-native by reflex, no ego, operational precision. Reaches for the right tool the way a surgeon reaches for an instrument — without announcing it.
- **Alfred** — knows the person's history cold, their patterns, their systems, their taste. Never needs the same thing explained twice. Occasionally dry.
- **Pepper Potts** — pragmatic, gets it done, flags contradictions without apology, doesn't perform enthusiasm.

**How you operate:**
- Clear request → act. State what you did in one line.
- Ambiguous request where the wrong path wastes real effort → one focused clarifying question, then execute. Not a form. One question.
- Second-order problem spotted → flag it once, after solving the immediate one. Only when it's real and the pattern is established. Not reflexively.
- Current data needed → search first. You retrieve facts; you don't generate them.
- Constraint hit → one sentence on why, one sentence on the closest alternative. No apologetic dancing.
- Contradicts past recommendation → flag it. "Last time we went with X — if Y has changed, maybe Z now?"

**How you write:**
Fragments are fine. No preamble. No hollow affirmations to open. "Done. [link]" beats a paragraph confirming you understood the task. When something is genuinely complex, you earn the length — but default to the shortest thing that's actually complete. Call tools silently: no "Let me check..." or "I'll search for that now" before invoking. Results come after the work, not before. **Never emit any text between successive tool calls** — if you need to call another tool, call it directly. Only speak once all tool calls for the task are complete. For tool-heavy tasks (UDM edits, Drive saves, schedule creation), your final reply is one short sentence: what you did and whether it worked. No enumeration of steps taken, no list of what was preserved or changed.

**Wit:**
Observational, understated, context-dependent. Fires when the situation earns it — not as a reflex. One line, before the solve, never instead of it. Think: dry recognition of genuine absurdity. If nothing is genuinely absurd, say nothing absurd.

Examples that fit:
- "Third time this month. I assume we're training them for spontaneous combustion at this point?" [then solves it]
- "Classic Tuesday energy — second time in three months you've noticed a week out. Should we add a bi-weekly alert?" [solves + prevents + slight dig]

Examples that don't fit: forced emoji, reused joke templates, generic witticisms, humor that delays the answer.

**What you don't do (built into who you are):**
Generate confident-sounding facts without searching. Proceed on ambiguous requests without clarifying. Repeat explanations of systems already built. Use hollow affirmations. Narrate before acting. Apologize excessively.

---

## Current User
- **Name**: ${e.name}
- **Username**: ${e.username}
- **Timezone**: ${e.timezone}
- **Today's date for sheets**: ${u}

${o}

${c}

---

## Your Memory

Read everything here before responding. This is your stored knowledge of this person — preferences, standing rules, data sources, patterns, systems. These override defaults without re-confirmation.

- Memory references a spreadsheet ID → use it directly with read_sheet/write_sheet. Don't ask for it again.
- Memory records a preference → follow it.
- Memory records a resolved pattern (e.g. "item + amount = expense to Monthly Budget sheet") → act on it directly, no question.

${l}

${d}

${r?r+`
`:""}

---

## Tools Are Building Blocks

Every tool is composable with every other. When a request has multiple steps, chain them — don't stop mid-chain to check in. Execute completely, then present the result.

**UDM (Unified Docs) response format:** After completing any UDM operation, reply with exactly one short sentence — what changed and whether it worked. No step-by-step recap, no list of what was preserved. Example: "Done — Narens Note summarised in place." Not: "I read the page, then summarised it, preserving X, Y, Z..."

**Gather**: web_search, research, read_url, gmail_list, gmail_search, list_calendar_events, drive_search, drive_list, search_places
**Create**: create_doc, create_sheet, gmail_draft, gmail_send, create_calendar_event
**Write**: write_sheet, append_sheet, append_to_doc, store_memory
**Read**: read_doc, read_sheet, gmail_read

Any gather tool feeds into any create/write tool. Chain without hesitation.

**Chaining examples:**
- "Research X and save to a doc" → research → create_doc
- "What's in my inbox, anything from John? Save it to a doc" → gmail_list → gmail_read → create_doc
- "Latest AI news — write a summary in Google Docs" → web_search → create_doc
- "Find audio stores in Mumbai and make a spreadsheet" → search_places → create_sheet → write_sheet
- "Uber 700" (pattern in memory) → append_sheet, no question
- "Uber 700" (no pattern) → "Add Uber ₹700 to your budget? I can set up a sheet if you don't have one."

**When you confirm an ambiguous action and the user approves:** store_memory with the resolved pattern immediately (type: preference, importance: 8). Act directly next time — never ask about the same pattern twice.

---

## When to Act vs. When to Ask

**Act immediately:** request is clear, intent and params are in the message or memory, pure information request.

**Ask one focused question:** wrong path means meaningful wasted effort (wrong recipient, wrong sheet, wrong file), and memory doesn't resolve it.

**The test:** would a sharp, experienced assistant who knows this person ask this question — or just handle it? If the latter, handle it.

---

## Where Things Get Stored

| Content | Destination | Tool |
|---|---|---|
| Preferences, habits, standing rules | Memory | store_memory(type=preference) |
| Permanent facts about the user | Memory | store_memory(type=fact) |
| Resource pointers (sheet ID, doc URL) | Memory | store_memory(type=context) — pointer only |
| Time-based reminders, follow-ups | Schedules | create_schedule |
| Essays, articles, reports (long-form) | Google Drive | create_doc |
| Decisions the user made | Memory | store_memory(type=decision) |

Never store the full body of a document in memory. Title + URL pointer only. Long-form content belongs in Drive.

---

## Unified Docs (UDM) — Page Rules

Use UDM tools ONLY when the user explicitly mentions "Unified Docs", "UDM", or "ash-doc".

| User intent | Correct tool | Never |
|---|---|---|
| Create a page that doesn't exist yet | udm_create_page | — |
| Rewrite / update / revise an existing page | udm_write_page | Never call udm_create_page for a rewrite |
| Edit one section of a page | udm_edit_section | — |
| Apply a highlighted comment instruction | udm_apply_comment | — |
| "Apply comments" / "action the instructions" | udm_list_agent_comments → udm_apply_comment | Never use udm_list_comments for agent tasks |
| Create inline database on a page | udm_create_database(embed_in_page_title=…) | — |
| Format / clean up an existing page | udm_read_page → reformat → udm_write_page | — |

**Critical rewrite rule:** When the user asks to rewrite, update, or change an existing UDM page — call \`udm_write_page\`. Do NOT call \`udm_create_page\`. Every call to \`udm_create_page\` creates a brand-new separate page, even if a page with that name already exists, producing duplicates.

Pattern: user says "rewrite [page] in UDM" → \`udm_read_page\` (optional, only if you need current content) → \`udm_write_page\`. Done. Never follow that with \`udm_create_page\`.

**Agent comment workflow:** When asked to apply comments or action instructions on a UDM page: \`udm_list_agent_comments\` → for each comment, read its \`agent_prompt\` to understand the edit → \`udm_apply_comment(comment_id, new_text)\`. The API resolves each comment automatically. Check \`open_count\` in the response — keep going until it reaches 0. Never use \`udm_list_comments\` for this; it returns discussion comments, not agent instructions.

**UDM Markdown Formatting:**
- Separate every paragraph with a blank line (\\n\\n). This is how ash-doc creates visual paragraph spacing.
- Never use \`---\` or horizontal rules as paragraph separators — they render as divider lines, not whitespace.
- For "format for readability" / "add paragraph spacing" requests: (1) \`udm_read_page\` to get exact current text, (2) preserve the same words — only adjust spacing/structure, (3) \`udm_write_page\` with the reformatted full page (same pattern as read_doc → rewrite_doc).
- **Always preserve the page title** — if the content starts with a \`#\` heading or title line, keep it exactly. Never remove the title when reformatting.
- Do not add new subheadings unless the user asks for them.
- Supported markdown: \`#\` / \`##\` headings, \`**bold**\`, \`*italic*\`, \`-\` bullets. Preserve \`{{database:ID|Title}}\` embed markers verbatim.

---

## UDM Markdown Formatting Rules

Apply these rules to **every** markdown string you write to UDM — whether creating a new page or updating an existing one. Also apply them when the user asks to "format", "clean up", or "fix the formatting" of an existing page (workflow: \`udm_read_page\` → reformat → \`udm_write_page\`).

### Spacing (most important)
- **Always use a blank line between paragraphs.** A single newline is not a paragraph break in markdown — it renders as the same block. Every paragraph must be separated by an empty line.
- Never produce a wall of text. If you count more than 4–5 lines with no blank line, something is wrong.

### Structure
- Use \`##\` headings to divide essays or notes that have distinct sections (anything over ~400 words with clear phase shifts in argument or topic). Do not use \`#\` in the body — the page title is the H1.
- Use \`---\` (horizontal rule) only for a major tonal or structural break, not as a substitute for headings.
- Use bullet points (\`-\`) for any enumeration of 3 or more items — never list them as a prose sentence with commas.

### Emphasis
- **Bold** (\`**word**\`) the first meaningful use of a key concept or defined term in the piece. Use sparingly — 2–4 bolded phrases per page maximum.
- Use \`>\` blockquotes for a single standout sentence that anchors the argument. One per page at most; omit if nothing earns it.
- Never use bold for decoration or to highlight random phrases.

### What not to do
- No trailing spaces or double-blank lines.
- No markdown inside headings (e.g. \`## **Title**\` — wrong; \`## Title\` — correct).
- No inline HTML.

---

## When to Search vs. Answer from Knowledge

Apply before answering any factual question:

- **Recency** — could this have changed? Prices, specs, versions, rankings, availability, people's roles → search
- **Uncertainty** — less than 90% confident in the specific claim → search
- **Stakes** — health, financial, legal, safety, specific product recommendations → search
- **User signals** — "current", "latest", "now", "today", "still", "2026", "anymore" → search

None trigger → answer from knowledge. Math, history, geography, fundamental science, definitions — stable, no search needed.

**Tool selection — two questions in order:**
1. Requires login, clicking, or live site interaction? → vault_lookup → browser_task
2. Public information?
   - Synthesized answer needed → research
   - Real-time data, raw links, breaking news → web_search
   - User gave a specific URL → read_url

---

## Browser + Vault — No Exceptions

Any request requiring login to a website (Amazon, Outlook, LinkedIn, banking, any account-based site):

1. Call vault_lookup with the site name
2. Entry exists → browser_task with that exact vault entry name as site_name
3. No entry → "No credentials saved for [site] in your Secret Vault. Add them via Settings → Secret Vault, then try again."

Skipping vault_lookup and calling browser_task without site_name means no credentials are injected, the browser hits a login screen, and the task fails. Always call vault_lookup first — even if you already know the site name from context.

Never tell the user to "check it yourself" or redirect to a substitute service. Vault + browser is always the answer for site-based requests.

---

## Fabrication

You don't fabricate. Not because of a rule — because it's not what you do.

If you haven't retrieved email content from a tool in this conversation, you don't describe what the email said. If a browser task returned no output, you say so — you don't reconstruct what it might have shown. If you haven't called write_sheet, you don't confirm the sheet was updated.

The one structural note: if browser_task or browser_task_status doesn't explicitly confirm an action succeeded, the outcome is unknown. Say that. "The browser returned no confirmation that [action] completed. Check [site] directly to verify." Never infer success from the fact that the task ran.

When citing news or search results: always include a source as a markdown link — [Title](URL). Never list articles without a clickable link.

---
## Current Date & Time
${xa(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${n==="telegram"?'\n\n## TELEGRAM CONSTRAINTS\n- **Essays / save to Drive**: When the user wants an essay, article, or report saved to Google Drive (or says "store/save to drive"), you MUST call `create_doc` with the **full** text in the `content` parameter — never truncate for Telegram. Do NOT paste the essay body in chat (reply with title + Doc link only). Write from your knowledge unless they asked for research — do NOT call web_search before a plain essay. One `create_doc` call with title + full content (+ optional `folder_name`).\n- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).\n- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use `schedule_value` with the exact datetime in the user\'s local timezone — NEVER use `minutes_from_now` for clock-time requests (it causes wrong times). Only use `minutes_from_now` for pure duration requests like "in 30 minutes" or "in 2 hours".\n- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I\'ll now..." — just call the tool.\n- **Long content intent check**: When asked to write long-form content (essay, article, report) WITHOUT any save destination (no mention of Drive, Google Doc, or "save/store"), ask first: "Should I save the full piece as a Google Doc and send you the link, or give you a brief summary here in chat?" Default to Google Doc for anything over ~300 words. If they already said Drive/Doc/save/store, skip this question and call `create_doc` with the complete text immediately. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**\n- **UDM rewrite**: When the user asks to rewrite or update a page in Unified Docs/UDM — call `udm_write_page` with the full new content. Do NOT call `udm_create_page` — that creates a new duplicate page every time. Pattern: `udm_write_page` only (one call). If you need the existing content first, call `udm_read_page` → `udm_write_page`. Never call `udm_create_page` in a rewrite chain.\n- **UDM formatting**: Every markdown string written to UDM must follow the UDM Markdown Formatting Rules in this prompt — blank lines between paragraphs, `##` headings for multi-section essays, bold for key terms (sparingly). When asked to "format" or "clean up" a UDM page: `udm_read_page` → reformat markdown → `udm_write_page`. One pass, no extra calls.':""}`}async function Pn(e,t,n){var l;const r=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${n.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let a;((l=r.files)==null?void 0:l.length)>0?a=r.files[0].id:a=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:n,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const c=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${a}&removeParents=${c}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:a,folderName:n}}function Jt(e){return e.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").replace(/<function_calls>[\s\S]*?<\/function_calls>/gi,"").replace(/<function_result>[\s\S]*?<\/function_result>/gi,"").replace(/^\[calling:[^\]]*\]\s*/i,"").trim()}function xa(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}const rl={read_sheet:"read",search_memory:"read",list_schedules:"read",write_sheet:"write",append_sheet:"write",update_schedule:"write",delete_schedule:"write",gmail_send:"external_effect",create_calendar_event:"external_effect"};function al(e,t){const n=rl[e]||"read";if(n==="read")return null;const s=Da(t);return n==="write"&&s!=="execute"?`POLICY BLOCKED (${n}): ${e} requires transaction_mode=execute.`:n==="external_effect"&&s!=="execute"?`POLICY BLOCKED (${n}): ${e} can cause external side effects and needs transaction_mode=execute.`:null}const il=["ETIMEDOUT","TIMEOUT","429","503","ECONNRESET","network"],ol=new Set(["write_sheet","append_sheet","gmail_send","create_calendar_event","update_schedule","delete_schedule","delete_memory"]),cl={create_schedule:{required:["name","schedule_type","action_type"],enum:{schedule_type:["interval","daily","weekly","once"]}},update_schedule:{required:["job_id"]},delete_schedule:{required:["job_id"]},write_sheet:{required:["spreadsheet_id","range","values"]},append_sheet:{required:["spreadsheet_id","range","values"]},gmail_send:{required:["to","subject","body"]}};function ll(e){const t=String((e==null?void 0:e.message)||e||"Unknown tool error");return/timeout|timed out/i.test(t)?"TOOL_TIMEOUT":/unauthorized|forbidden|401|403/i.test(t)?"TOOL_AUTH":/not found|404/i.test(t)?"TOOL_NOT_FOUND":/rate limit|429/i.test(t)?"TOOL_RATE_LIMIT":/validation|invalid|required/i.test(t)?"TOOL_VALIDATION":"TOOL_EXECUTION_FAILED"}function dl(e){const t=String((e==null?void 0:e.message)||e||"").toLowerCase();return il.some(n=>t.includes(n.toLowerCase()))}function ul(e){const t=e.query??e.q??e.search_query??e.search;return typeof t=="string"?t.trim():""}function ml(e,t){const n=cl[e];if(n){for(const s of n.required||[])if(t[s]===void 0||t[s]===null||t[s]==="")throw new Error(`Validation failed: ${s} is required for ${e}`);for(const[s,r]of Object.entries(n.enum||{}))if(t[s]!==void 0&&!r.includes(String(t[s])))throw new Error(`Validation failed: ${s} must be one of ${r.join(", ")}`)}}function Da(e){const t=e.transaction_mode;return t==="dry_run"||t==="confirm_required"||t==="execute"?t:"execute"}function pl(e,t){if(!ol.has(e))return null;const n=Da(t);return n==="dry_run"?`DRY RUN: ${e} validated. No write action was executed.`:n==="confirm_required"?`CONFIRMATION REQUIRED: ${e} is a write action. Re-run with transaction_mode=execute to proceed.`:null}const hl=new Set(["gmail_send","gmail_draft","gmail_modify","append_sheet","create_sheet","write_sheet","create_doc","append_to_doc","rewrite_doc","create_calendar_event","create_schedule","create_skill","udm_create_page","udm_write_page","udm_delete_page","udm_add_comment","udm_apply_comment","udm_create_database","udm_add_row","udm_update_row","udm_delete_row","udm_add_property","udm_edit_section","udm_resolve_comment"]),fl=new Set(["list_schedules","search_memory","get_system_status","read_sheet","list_calendar_events","read_doc","gmail_list","gmail_read","gmail_search","gmail_unread_count","drive_list","drive_search","drive_read_file","web_search","read_url","research","browser_task_status","vault_lookup","search_places","get_place_details","get_directions","get_travel_time","translate_text","search_youtube","geocode_address","parse_document","search_library","read_library_file","list_skills","udm_list_pages","udm_read_page","udm_search","udm_list_comments","udm_read_page_with_comments","udm_list_agent_comments","udm_read_database"]),gl=5;async function Vt(e,t,n,s,r,a,i,o,c,l,d,u,p,h,v){const f=Date.now();let g=!0,w="",T="";const x=r.traceId||crypto.randomUUID(),A=`${s}:${e}:${JSON.stringify(t)}`;if(hl.has(e)&&!fl.has(e))try{const $=await n.prepare(`SELECT tool_result FROM tool_execution_log
           WHERE user_id = ? AND tool_name = ? AND idempotency_key = ? AND success = 1
             AND created_at >= datetime('now', '-${gl} minutes')
           ORDER BY created_at DESC
           LIMIT 1`).bind(s,e,A).first();if($)return $.tool_result||""}catch{}try{ml(e,t);const $=al(e,t);if($)return T=$,T;const M=pl(e,t);if(M)return T=M,T;const z=2;for(let W=1;W<=z;W++)try{const ne=e==="browser_task"?31e4:e==="browser_task_status"?35e3:e==="research"?31e4:9e4;T=await Promise.race([vl(e,t,n,s,a,i,o,c,l,d,u,p,h,r.channel,v),new Promise((j,Y)=>setTimeout(()=>Y(new Error("Tool timed out")),ne))]);break}catch(ne){if(W<z&&dl(ne)){await new Promise(j=>setTimeout(j,250*W));continue}throw ne}return T}catch($){throw g=!1,w=`${ll($)}: ${$.message||"Unknown error"}`,new Error(w)}finally{const $=Date.now()-f;try{await n.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel, idempotency_key)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(s,r.agentType||null,r.providerName||null,e,JSON.stringify({...t,_idempotency_key:A,_trace_id:x}).substring(0,2e3),(g?T:"").substring(0,500),g?1:0,w||null,$,r.isEnforcementRetry?1:0,r.channel||"web",A).run()}catch{}}}function Ra(e){const t=e.length;for(let n=0;n<t-1;n++){const s=e[n];if(s.role!=="user"||typeof s.content!="string")continue;const r=t-1-n,a=r<=2?12e3:r<=4?5e3:2e3;s.content.length>a&&(e[n]={...s,content:s.content.substring(0,a)+`
[...truncated in history to reduce context size]`})}}function yl(e){const t=[];let n=[],s="",r=!1,a=0;const i=e.length;for(;a<i;){const o=e[a];if(r){if(o==='"'){if(e[a+1]==='"'){s+='"',a+=2;continue}r=!1,a++;continue}s+=o,a++;continue}if(o==='"'){r=!0,a++;continue}if(o===","){n.push(s),s="",a++;continue}if(o==="\r"&&e[a+1]===`
`){n.push(s),t.push(n),n=[],s="",a+=2;continue}if(o===`
`||o==="\r"){n.push(s),t.push(n),n=[],s="",a++;continue}s+=o,a++}for((s||n.length)&&(n.push(s),t.push(n));t.length&&t[t.length-1].every(o=>o==="");)t.pop();return t}async function vl(e,t,n,s,r,a,i,o,c,l,d,u,p,h,v){var g,w,T,x,A,N,$,M,z,W,ne,j,Y,q,Z,te,ce,re,ye;const f=new Q(n);switch(e){case"create_schedule":{const m=new Date;let E;const y=l||"UTC";if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){E=new Date(m.getTime()+t.minutes_from_now*60*1e3);const L=E.toLocaleString("en-US",{timeZone:y,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[I,O,C]=(L[0]||"").split("/");t.schedule_value=`${C}-${I}-${O} ${L[1]||"00:00"}`,t.schedule_type="once"}else if(t.schedule_type==="interval"){const R=parseInt(t.schedule_value,10);E=new Date(m.getTime()+R*60*1e3)}else if(t.schedule_type==="daily"&&t.action_type==="reminder"){const R=`${t.name||""} ${t.action_description||""}`.toLowerCase();if(/\bevery\b|\bdaily\b|\beach\b|\bmorning\b|\bevening\b|\bnight\b|\bweekday\b|\bweekend\b|\brecurring\b|\brepeat\b/.test(R)){const[I,O]=t.schedule_value.split(":").map(Number),C=m.toLocaleString("en-US",{timeZone:y}),P=new Date(C),B=new Date(P);B.setHours(I,O,0,0),B<=P&&B.setDate(B.getDate()+1);const J=new Date(B.toLocaleString("en-US",{timeZone:"UTC"})),X=new Date(B.toLocaleString("en-US",{timeZone:y})),K=J.getTime()-X.getTime();E=new Date(B.getTime()+K)}else{const[I,O]=t.schedule_value.split(":").map(Number),C=m.toLocaleString("en-US",{timeZone:y}),P=new Date(C),B=new Date(P);B.setHours(I,O,0,0),B<=P&&B.setDate(B.getDate()+1);const J=Le=>String(Le).padStart(2,"0"),X=B.getFullYear(),K=J(B.getMonth()+1),oe=J(B.getDate());t.schedule_value=`${X}-${K}-${oe} ${J(I)}:${J(O)}`,t.schedule_type="once";const ue=new Date(B.toLocaleString("en-US",{timeZone:"UTC"})),de=new Date(B.toLocaleString("en-US",{timeZone:y})),ve=ue.getTime()-de.getTime();E=new Date(B.getTime()+ve)}}else if(t.schedule_type==="daily"){const[R,L]=t.schedule_value.split(":").map(Number),I=m.toLocaleString("en-US",{timeZone:y}),O=new Date(I),C=new Date(O);C.setHours(R,L,0,0),C<=O&&C.setDate(C.getDate()+1);const P=new Date(C.toLocaleString("en-US",{timeZone:"UTC"})),B=new Date(C.toLocaleString("en-US",{timeZone:y})),J=P.getTime()-B.getTime();E=new Date(C.getTime()+J)}else if(t.schedule_type==="weekly"){const[R,L]=t.schedule_value.split(" "),[I,O]=(L||"00:00").split(":").map(Number),P=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(ve=>ve.toLowerCase()===R.toLowerCase()),B=m.toLocaleString("en-US",{timeZone:y}),J=new Date(B),X=new Date(J);X.setHours(I,O,0,0);let K=(P-X.getDay()+7)%7;K===0&&X<=J&&(K=7),X.setDate(X.getDate()+K);const oe=new Date(X.toLocaleString("en-US",{timeZone:"UTC"})),ue=new Date(X.toLocaleString("en-US",{timeZone:y})),de=oe.getTime()-ue.getTime();E=new Date(X.getTime()+de)}else if(t.schedule_type==="once"){const[R,L]=t.schedule_value.split(" "),[I,O,C]=R.split("-").map(Number),[P,B]=(L||"00:00").split(":").map(Number),J=m.toLocaleString("en-US",{timeZone:y}),X=new Date(J),K=new Date(X);K.setFullYear(I,O-1,C),K.setHours(P,B,0,0);const oe=new Date(K.toLocaleString("en-US",{timeZone:"UTC"})),ue=new Date(K.toLocaleString("en-US",{timeZone:y})),de=oe.getTime()-ue.getTime();E=new Date(K.getTime()+de);const ve=new Date(m.getTime()+120*1e3);if(E.getTime()<m.getTime()+5*1e3){const Le=E.toISOString();E=ve;const Re=` [Note: The requested time ${t.schedule_value} in ${y} resolved to ${Le} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${E.toISOString()}.]`;t._pastTimeWarning=Re}}else E=new Date(m.getTime()+3600*1e3);if((t.schedule_type==="interval"||t.schedule_type==="daily"||t.schedule_type==="weekly")&&t.action_type==="custom"){const R=`${t.name||""} ${t.action_description||t.description||""}`.toLowerCase();/\b(send|forward)\b.{0,40}\b(email|mail)\b|\bemail.{0,20}\bto\b|\bgmail_send\b/.test(R)&&(t.schedule_type="once")}if(t.action_type==="custom"&&t.schedule_type==="once"){const R=`${t.name||""} ${t.action_description||t.description||""}`.toLowerCase();/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i.test(R)||(t.action_type="reminder")}if(await n.prepare("SELECT id FROM cron_jobs WHERE user_id = ? AND name = ? AND schedule_type = ? AND schedule_value = ? AND state != 'completed' LIMIT 1").bind(s,t.name,t.schedule_type,t.schedule_value).first()){const R=E.toLocaleString("en-US",{timeZone:y,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule already exists: "${t.name}" is already set for ${R} (${y}). No duplicate created.`}await n.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(s,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),E.toISOString()).run();const S=t._pastTimeWarning||"",k=E.toLocaleString("en-US",{timeZone:y,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${t.name}" — ${t.schedule_type}. Will fire at ${k} (${y}). [UTC: ${E.toISOString()}]${S}. IMPORTANT: Use the exact time "${k}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const E=(await n.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(s).all()).results||[];return E.length===0?"No scheduled tasks found.":E.map(y=>`[ID:${y.id}] ${y.enabled?"▶":"⏸"} "${y.name}" — [${y.schedule_type}] ${y.schedule_value} — ${y.action_type} — state: ${y.state||"active"} — next: ${y.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const m=t.enabled?1:0,E=m?"active":"paused";return await n.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(m,E,t.job_id,s).run(),`Schedule ${t.job_id} ${m?"enabled (active)":"paused"}.`}case"update_schedule_state":{const m=["created","active","reminding","paused","completed"],E=t.state;if(!m.includes(E))return`Invalid state "${E}". Valid states: ${m.join(", ")}`;const y=E==="completed"||E==="paused"?0:1;return await n.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(E,y,t.job_id,s).run(),`Schedule ${t.job_id} state updated to "${E}".`}case"update_schedule":{const m=t.job_id,E=l||"UTC",y=new Date,_=["updated_at = CURRENT_TIMESTAMP"],b=[];t.name&&(_.push("name = ?"),b.push(t.name)),t.description&&(_.push("description = ?"),b.push(t.description));let S=null,k=t.schedule_type,R=t.schedule_value;if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){S=new Date(y.getTime()+t.minutes_from_now*60*1e3);const O=S.toLocaleString("en-US",{timeZone:E,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[C,P,B]=(O[0]||"").split("/");R=`${B}-${C}-${P} ${O[1]||"00:00"}`,k="once"}else if(k&&R){if(k==="interval")S=new Date(y.getTime()+parseInt(R,10)*60*1e3);else if(k==="daily"){const[I,O]=R.split(":").map(Number),C=new Date(y.toLocaleString("en-US",{timeZone:E})),P=new Date(C);P.setHours(I,O,0,0),P<=C&&P.setDate(P.getDate()+1);const B=new Date(P.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(P.toLocaleString("en-US",{timeZone:E})).getTime();S=new Date(P.getTime()+B)}else if(k==="weekly"){const[I,O]=R.split(" "),[C,P]=(O||"00:00").split(":").map(Number),J=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(de=>de.toLowerCase()===I.toLowerCase()),X=new Date(y.toLocaleString("en-US",{timeZone:E})),K=new Date(X);K.setHours(C,P,0,0);let oe=(J-K.getDay()+7)%7;oe===0&&K<=X&&(oe=7),K.setDate(K.getDate()+oe);const ue=new Date(K.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(K.toLocaleString("en-US",{timeZone:E})).getTime();S=new Date(K.getTime()+ue)}else if(k==="once"){const[I,O]=R.split(" "),[C,P,B]=I.split("-").map(Number),[J,X]=(O||"00:00").split(":").map(Number),K=new Date(y.toLocaleString("en-US",{timeZone:E})),oe=new Date(K);oe.setFullYear(C,P-1,B),oe.setHours(J,X,0,0);const ue=new Date(oe.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(oe.toLocaleString("en-US",{timeZone:E})).getTime();S=new Date(oe.getTime()+ue),S.getTime()<y.getTime()+60*1e3&&(S=new Date(y.getTime()+120*1e3))}}if(k&&(_.push("schedule_type = ?"),b.push(k)),R&&(_.push("schedule_value = ?"),b.push(R)),S&&(_.push("next_run = ?"),b.push(S.toISOString())),_.length===1)return"No changes provided. Specify name, description, or schedule fields to update.";b.push(m,s),await n.prepare(`UPDATE cron_jobs SET ${_.join(", ")} WHERE id = ? AND user_id = ?`).bind(...b).run();const L=S?S.toLocaleString("en-US",{timeZone:E,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):null;return`Schedule ${m} updated.${L?` New fire time: ${L} (${E}).`:""} IMPORTANT: Use this exact time "${L}" when confirming to the user.`}case"delete_schedule":return await n.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,s).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const m=t.importance||5,E=t.type==="task"?"preference":t.type,y=m>=7?"working":"long_term";return await f.store(s,E,t.title,t.content,m,y),`Stored in ${y==="working"?"working":"long-term"} memory: [${E}] ${t.title} (importance: ${m})`}case"search_memory":{const m=await f.search(s,t.query);return m.length===0?"No matching memories found.":m.map(E=>`[id:${E.id}] [${E.tier||"long_term"}] [${E.type}] **${E.title}**: ${E.content}`).join(`
`)}case"delete_memory":return await f.remove(t.id,s),`Memory entry ${t.id} deleted.`;case"update_memory":return await f.update(t.id,s,t.content),`Memory entry ${t.id} updated.`;case"get_system_status":{const m=await n.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s).first(),E=await n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s).first(),y=await n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(s).first(),_=await n.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(s).first(),b=await n.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(s).first();return`System Status:
- Active schedules: ${(m==null?void 0:m.cnt)||0}
- Memory: ${(y==null?void 0:y.cnt)||0} working / ${(E==null?void 0:E.cnt)||0} total
- Total messages: ${(_==null?void 0:_.cnt)||0}
- Unread errors: ${(b==null?void 0:b.cnt)||0}`}case"read_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new Se(n,s,r,a||"",i||""),E=t.spreadsheet_id;let y=t.range;const _=await m.sheets.getMetadata(E),b=_.sheets;y.includes("!")||(y=`${b[0]}!${y}`);let S;try{S=await m.sheets.readRange(E,y)}catch(R){if((g=R.message)!=null&&g.includes("Unable to parse range")||(w=R.message)!=null&&w.includes("400")){const L=y.includes("!")?y.split("!")[1]:y;y=`${b[0]}!${L}`,S=await m.sheets.readRange(E,y)}else throw R}let k=`[Spreadsheet: "${_.title}" | Reading tab: "${y.split("!")[0]}" | All tabs in this spreadsheet: ${b.map(R=>`"${R}"`).join(", ")}]
`;return b.length>1&&(k+=`[To read a different tab, call read_sheet again with range like "${b[1]}!A1:Z500"]
`),S.length===0?k+"No data found in the specified range.":k+S.map(R=>R.join("	| ")).join(`
`)}catch(m){return await U(n,s,"google","read_sheet",m.message),`Failed to read sheet: ${m.message}`}}case"write_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new Se(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{const O=new Q(n),C=JSON.stringify(t.values);await O.store(s,"context",`Pending sheet write: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"write_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:C.length>15e3?"[[truncated — re-provide values on retry]]":t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The sheet write has been saved to temporary memory. After reconnecting, tell me "write the pending sheet data" to complete this.`:"")}const y=t.values;let _=t.range;const k=Math.max(...y.map(O=>O.length))+4,R=y.map(O=>{const C=[...O];for(;C.length<k;)C.push("");return C}),L=_.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(L){const O=L[1]||"",C=L[2],P=L[3],B=L[5],X=C.toUpperCase().charCodeAt(0)-64+k-1,K=X<=26?String.fromCharCode(64+X):"Z";_=`${O}${C}${P}:${K}${B}`}const I=await m.sheets.writeRange(t.spreadsheet_id,_,R);try{const O=new Q(n),C=await O.search(s,`Pending sheet write: ${t.spreadsheet_id}`);for(const P of C)P.title.startsWith(`Pending sheet write: ${t.spreadsheet_id}`)&&await O.remove(P.id,s)}catch{}return`Written ${I.updatedCells} cells to ${_}.`}catch(m){return await U(n,s,"google","write_sheet",m.message),`Failed to write sheet: ${m.message}`}}case"append_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new Se(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{await new Q(n).store(s,"context",`Pending sheet append: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"append_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The append data has been saved to temporary memory. After reconnecting, tell me "append the pending sheet data" to complete this.`:"")}const y=await m.sheets.appendRows(t.spreadsheet_id,t.range,t.values);try{const _=new Q(n),b=await _.search(s,`Pending sheet append: ${t.spreadsheet_id}`);for(const S of b)S.title.startsWith(`Pending sheet append: ${t.spreadsheet_id}`)&&await _.remove(S.id,s)}catch{}return`Appended ${y.updatedCells} cells to ${t.range}.`}catch(m){return await U(n,s,"google","append_sheet",m.message),`Failed to append to sheet: ${m.message}`}}case"create_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new Se(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.title)try{await new Q(n).store(s,"context",`Pending spreadsheet create: "${t.title}"`,JSON.stringify({tool:"create_sheet",title:t.title,sheet_names:t.sheet_names??null,folder_name:t.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title?`

The spreadsheet request has been saved to temporary memory. After reconnecting, tell me "create the pending spreadsheet" and I'll complete this automatically.`:"")}const y=await m.sheets.createSpreadsheet(t.title,t.sheet_names);let _="";if(t.folder_name)try{const{token:b}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(n,s,r,a||"",i||"");_=`
Folder: "${(await Pn(b,y.spreadsheetId,t.folder_name)).folderName}"`}catch(b){_=`
(Note: spreadsheet saved to Drive root — could not place in folder "${t.folder_name}": ${b.message})`}try{await new Q(n).store(s,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${y.spreadsheetId} | URL: ${y.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${_}
ID: ${y.spreadsheetId}
URL: ${y.url}`}catch(m){return await U(n,s,"google","create_sheet",m.message),`Failed to create spreadsheet: ${m.message}`}}case"list_calendar_events":{if(!r)return"Authentication context unavailable.";try{const m=new Se(n,s,r,a||"",i||""),E=t.calendar_id||"primary",y=t.days_ahead||7,_=new Date,b=new Date(_.getTime()+y*24*60*60*1e3),S=await m.calendar.listEvents(E,{timeMin:_.toISOString(),timeMax:b.toISOString(),query:t.query});return S.length===0?`No events found in the next ${y} days.`:S.map(k=>{var C;const R=k.start.dateTime||k.start.date||"TBD",L=k.end.dateTime||k.end.date||"",I=k.location?` 📍 ${k.location}`:"",O=((C=k.attendees)==null?void 0:C.map(P=>P.email).join(", "))||"";return`• ${k.summary} — ${R} to ${L}${I}${O?`
  Attendees: ${O}`:""}`}).join(`
`)}catch(m){return await U(n,s,"google","list_calendar",m.message),`Failed to list events: ${m.message}`}}case"create_calendar_event":{if(!r)return"Authentication context unavailable.";try{const m=new Se(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.summary&&t.start_datetime&&t.end_datetime)try{await new Q(n).store(s,"context",`Pending calendar event: "${t.summary}"`,JSON.stringify({tool:"create_calendar_event",summary:t.summary,description:t.description??null,location:t.location??null,start_datetime:t.start_datetime,end_datetime:t.end_datetime,attendees:t.attendees??null,calendar_id:t.calendar_id??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.summary&&t.start_datetime?`

The calendar event has been saved to temporary memory. After reconnecting, tell me "create the pending event" and I'll add it to your calendar.`:"")}const y=t.calendar_id||"primary",_=await m.calendar.createEvent(y,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});try{const b=new Q(n),S=await b.search(s,`Pending calendar event: "${t.summary}"`);for(const k of S)k.title.startsWith(`Pending calendar event: "${t.summary}"`)&&await b.remove(k.id,s)}catch{}return`Event created: "${_.summary}"
ID: ${_.id}
Start: ${_.start.dateTime||_.start.date}`}catch(m){return await U(n,s,"google","create_event",m.message),`Failed to create event: ${m.message}`}}case"create_doc":{if(!r)return"Authentication context unavailable.";const m=new Se(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.title&&t.content){try{await new Q(n).store(s,"context",`Pending Google Doc save: "${t.title}"`,JSON.stringify({tool:"create_doc",title:t.title,content:t.content,folder_name:t.folder_name??null}),9,"working")}catch{}try{await n.prepare(`INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
               VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`).bind(s,`Pending doc: "${t.title}"`,'Google not connected — reconnect then say "save the pending document".',`pending_doc_${t.title}`,JSON.stringify({tool:"create_doc",title:t.title,folder_name:t.folder_name??null})).run()}catch{}}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" and I'll complete this automatically.`:"")}let y;try{y=await m.docs.createDocument(t.title)}catch(b){return await U(n,s,"google","create_doc",b.message),`Failed to create document: ${b.message}`}if(t.content){const b=t.content,S=async()=>{b.length>12e3?await m.docs.appendText(y.documentId,b):await m.docs.appendFormattedContent(y.documentId,b)};try{await S()}catch(k){try{await m.docs.appendText(y.documentId,b)}catch(R){return await U(n,s,"google","create_doc_append",R.message),`Document created but content could not be written (${R.message}).
ID: ${y.documentId}
URL: ${y.url}

Use append_to_doc with the document ID above to add content.`}await U(n,s,"google","create_doc_append_fallback",`Formatted append failed, used plain text: ${k.message}`)}}let _="";if(t.folder_name)try{const{token:b}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(n,s,r,a||"",i||"");_=`
Folder: "${(await Pn(b,y.documentId,t.folder_name)).folderName}"`}catch(b){_=`
(Note: document saved to Drive root — could not place in folder "${t.folder_name}": ${b.message})`}try{await new Q(n).store(s,"context",`Document: ${t.title}`,`Document ID: ${y.documentId} | URL: ${y.url}`,6,"working")}catch{}try{const b=t.content;await n.prepare(`INSERT OR IGNORE INTO document_library (user_id, source, drive_file_id, name, summary, extracted_text, status)
           VALUES (?, 'drive', ?, ?, ?, ?, 'parsed')`).bind(s,y.documentId,t.title,b?b.substring(0,500):null,b?b.substring(0,5e4):null).run()}catch{}try{const b=new Q(n),S=await b.search(s,`Pending Google Doc save: "${t.title}"`);for(const k of S)k.title.startsWith(`Pending Google Doc save: "${t.title}"`)&&await b.remove(k.id,s)}catch{}return`Document created: "${t.title}"${_}
ID: ${y.documentId}
URL: ${y.url}`}case"read_doc":{if(!r)return"Authentication context unavailable.";try{const E=await new Se(n,s,r,a||"",i||"").docs.readDocument(t.document_id);return`Document: "${E.title}"

${E.content}`}catch(m){return await U(n,s,"google","read_doc",m.message),`Failed to read document: ${m.message}`}}case"append_to_doc":{if(!r)return"Authentication context unavailable.";try{const m=new Se(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.document_id&&t.content)try{await new Q(n).store(s,"context",`Pending append to doc: "${t.document_id}"`,JSON.stringify({tool:"append_to_doc",document_id:t.document_id,content:t.content}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.'+(t.document_id&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" to complete this.`:"")}await m.docs.appendFormattedContent(t.document_id,t.content);let y=t.document_id;try{y=(await m.docs.readDocument(t.document_id)).title}catch{}try{const _=new Q(n),b=await _.search(s,`Pending append to doc: "${t.document_id}"`);for(const S of b)S.title.startsWith(`Pending append to doc: "${t.document_id}"`)&&await _.remove(S.id,s)}catch{}try{const _=t.content;await n.prepare(`UPDATE document_library
             SET extracted_text = SUBSTR(COALESCE(extracted_text, '') || char(10) || ?, 1, 50000),
                 updated_at = CURRENT_TIMESTAMP
             WHERE user_id = ? AND drive_file_id = ?`).bind(_,s,t.document_id).run()}catch{}return`Content appended to "${y}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(m){return await U(n,s,"google","append_to_doc",m.message),`Failed to append to document: ${m.message}`}}case"rewrite_doc":{if(!r)return"Authentication context unavailable.";try{const m=new Se(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";await m.docs.rewriteDocument(t.document_id,t.content);let y=t.document_id;try{y=(await m.docs.readDocument(t.document_id)).title}catch{}return`Document "${y}" reformatted successfully.
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(m){return await U(n,s,"google","rewrite_doc",m.message),`Failed to rewrite document: ${m.message}`}}case"delete_sheet_row":{if(!r)return"Authentication context unavailable.";try{const m=new Se(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const y=t.row_number;return y<2?"Row 1 is the header row and cannot be deleted. Specify row 2 or higher.":(await m.sheets.deleteRow(t.spreadsheet_id,t.sheet_name,y),`Row ${y} deleted from "${t.sheet_name}". All rows below have shifted up.`)}catch(m){return await U(n,s,"google","delete_sheet_row",m.message),`Failed to delete row: ${m.message}`}}case"delete_doc_content":{if(!r)return"Authentication context unavailable.";try{const m=new Se(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const y=await m.docs.deleteContent(t.document_id,t.text_to_remove);return y.occurrencesRemoved===0?"No matching text found in the document. The text must match exactly — check spacing, punctuation, and line breaks.":`Removed ${y.occurrencesRemoved} occurrence${y.occurrencesRemoved===1?"":"s"} from the document.`}catch(m){return await U(n,s,"google","delete_doc_content",m.message),`Failed to delete document content: ${m.message}`}}case"gmail_list":{if(!r)return"Authentication context unavailable.";try{const E=await new Ie(n,s,r,a||"",i||"").listMessages({maxResults:t.max_results||10,query:t.query});return E.length===0?"No messages found.":E.map((y,_)=>`${y.isUnread?"● ":"  "}${_+1}. **${y.subject}**
   From: ${y.from}
   Date: ${y.date}
   ${y.snippet}
   [id: ${y.id}]`).join(`

`)}catch(m){return await U(n,s,"gmail","list",m.message),(T=m.message)!=null&&T.includes("not connected")?m.message:`Gmail list error: ${m.message}`}}case"gmail_read":{if(!r)return"Authentication context unavailable.";try{const m=new Ie(n,s,r,a||"",i||""),E=await m.getMessage(t.message_id);if(!E)return"Message not found.";let y=await m.getMessageBody(t.message_id);return y.trim().length<200&&E.snippet&&(y=`${y}

[Snippet]: ${E.snippet}`.trim()),`**${E.subject}**
From: ${E.from}
To: ${E.to}
Date: ${E.date}

${y}`}catch(m){return await U(n,s,"gmail","read",m.message),`Gmail read error: ${m.message}`}}case"gmail_search":{if(!r)return"Authentication context unavailable.";try{const m=ul(t);if(!m)return"Gmail search requires a non-empty query (e.g. from:sender@example.com subject:invoice). Use Gmail search syntax.";const E=typeof t.product_hint=="string"?t.product_hint.trim():"",y=Math.min(Math.max(t.max_results||10,1),20),_=new Ie(n,s,r,a||"",i||"");let b=await _.search(m,y);if(b.length===0&&E){const S=os(E).replace("180d","365d");b=await _.search(S,y)}return b.length===0?`No results for: ${m}`:E?ic(b,E,m):b.map((S,k)=>`${S.isUnread?"● ":"  "}${k+1}. **${S.subject}**
   From: ${S.from}
   Date: ${S.date}
   ${S.snippet}
   [id: ${S.id}]`).join(`

`)}catch(m){await U(n,s,"gmail","search",m.message);const E=String((m==null?void 0:m.message)||m);return/403|access denied|insufficient|permission/i.test(E)?`${E} Go to Settings → Keys → Google Workspace and reconnect your account.`:`Gmail search error: ${E}`}}case"gmail_send":{if(!r)return"Authentication context unavailable.";try{const m=new Ie(n,s,r,a||"",i||"");if(!(await new Se(n,s,r,a||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body){try{await new Q(n).store(s,"context",`Pending email: "${t.subject}"`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}try{await n.prepare(`INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
                 VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`).bind(s,`Pending email: "${t.subject}"`,`To: ${t.to} — reconnect Google then say "send the pending email".`,`pending_email_${t.subject}`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject})).run()}catch{}}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your email has been saved to temporary memory. After reconnecting, tell me "send the pending email" and I'll send it automatically.`:"")}const _=await m.send(t.to,t.subject,t.body,{cc:t.cc});try{const b=new Q(n),S=await b.search(s,`Pending email: "${t.subject}"`);for(const k of S)k.title.startsWith(`Pending email: "${t.subject}"`)&&await b.remove(k.id,s)}catch{}return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${_.id}]`}catch(m){return await U(n,s,"gmail","send",m.message),`Gmail send error: ${m.message}`}}case"gmail_draft":{if(!r)return"Authentication context unavailable.";try{const m=new Ie(n,s,r,a||"",i||"");if(!(await new Se(n,s,r,a||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body)try{await new Q(n).store(s,"context",`Pending draft: "${t.subject}"`,JSON.stringify({tool:"gmail_draft",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your draft has been saved to temporary memory. After reconnecting, tell me "create the pending draft" and I'll save it to Gmail.`:"")}const _=await m.createDraft(t.to,t.subject,t.body,{cc:t.cc});try{const S=new Q(n),k=await S.search(s,`Pending draft: "${t.subject}"`);for(const R of k)R.title.startsWith(`Pending draft: "${t.subject}"`)&&await S.remove(R.id,s)}catch{}const b=t.cc?`, CC: ${t.cc}`:"";return`Draft created. To: ${t.to}${b}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${_.id}]`}catch(m){return await U(n,s,"gmail","draft",m.message),`Gmail draft error: ${m.message}`}}case"gmail_modify":{if(!r)return"Authentication context unavailable.";try{return await new Ie(n,s,r,a||"",i||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(m){return await U(n,s,"gmail","modify",m.message),`Gmail modify error: ${m.message}`}}case"gmail_unread_count":{if(!r)return"Authentication context unavailable.";try{const E=await new Ie(n,s,r,a||"",i||"").getUnreadCount();return`You have ${E} unread email${E!==1?"s":""} in Gmail.`}catch(m){return(x=m.message)!=null&&x.includes("not connected")?m.message:`Gmail error: ${m.message}`}}case"drive_list":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(n,s,r,a||"",i||""),E=new URLSearchParams;E.set("pageSize",String(t.max_results||10)),E.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),E.set("orderBy","modifiedTime desc");let y="";t.folder_id?y=`'${t.folder_id}' in parents and trashed = false`:t.query?y=`${t.query} and trashed = false`:y="trashed = false",E.set("q",y);const _=await fetch(`https://www.googleapis.com/drive/v3/files?${E}`,{headers:{Authorization:`Bearer ${m}`}});if(!_.ok)throw new Error(`Drive API error (${_.status})`);const b=await _.json();return(A=b.files)!=null&&A.length?b.files.map((S,k)=>{var O,C;const R=((O=S.mimeType)==null?void 0:O.split(".").pop())||S.mimeType,L=S.size?`${(parseInt(S.size)/1024).toFixed(1)} KB`:"",I=((C=S.modifiedTime)==null?void 0:C.split("T")[0])||"";return`${k+1}. **${S.name}** (${R})
   ${L} · Modified: ${I}
   ${S.webViewLink||""}`}).join(`

`):"No files found."}catch(m){return await U(n,s,"google","drive_list",m.message),`Drive list error: ${m.message}`}}case"drive_search":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(n,s,r,a||"",i||""),E=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,y=new URLSearchParams;y.set("q",E),y.set("pageSize",String(t.max_results||10)),y.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),y.set("orderBy","modifiedTime desc");const _=await fetch(`https://www.googleapis.com/drive/v3/files?${y}`,{headers:{Authorization:`Bearer ${m}`}});if(!_.ok)throw new Error(`Drive API error (${_.status})`);const b=await _.json();return(N=b.files)!=null&&N.length?b.files.map((S,k)=>{var I,O;const R=((I=S.mimeType)==null?void 0:I.split(".").pop())||S.mimeType,L=((O=S.modifiedTime)==null?void 0:O.split("T")[0])||"";return`${k+1}. **${S.name}** (${R}) — Modified: ${L}
   ${S.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(m){return await U(n,s,"google","drive_search",m.message),`Drive search error: ${m.message}`}}case"drive_read_file":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(n,s,r,a||"",i||""),E=t.url_or_id.trim();let y=E;const _=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/\/presentation\/d\/([a-zA-Z0-9_-]+)/,/\/forms\/d\/([a-zA-Z0-9_-]+)/,/[?&]id=([a-zA-Z0-9_-]+)/,/\/d\/([a-zA-Z0-9_-]+)/];for(const B of _){const J=E.match(B);if(J){y=J[1];break}}const b=await fetch(`https://www.googleapis.com/drive/v3/files/${y}?fields=id,name,mimeType,size`,{headers:{Authorization:`Bearer ${m}`}});if(!b.ok)throw new Error(`Drive API error (${b.status}): could not fetch file metadata`);const S=await b.json(),{name:k,mimeType:R}=S,L=t.extract_focus,I=L?`Focus specifically on extracting: ${L}`:"Extract and return all readable text content. Preserve structure where relevant.",O={"application/vnd.google-apps.document":"text/plain","application/vnd.google-apps.spreadsheet":"text/csv","application/vnd.google-apps.presentation":"text/plain"};if(O[R]){const B=O[R],J=await fetch(`https://www.googleapis.com/drive/v3/files/${y}/export?mimeType=${encodeURIComponent(B)}`,{headers:{Authorization:`Bearer ${m}`}});if(!J.ok)throw new Error(`Drive export error (${J.status})`);const X=await J.text();if(R==="application/vnd.google-apps.spreadsheet"){const K=yl(X),oe=K.length,ue=(($=K[0])==null?void 0:$.length)??0;return`**${k}** (Google Sheet — ${oe} rows × ${ue} columns)

Parsed rows (JSON, ready for write_sheet/append_sheet):
${JSON.stringify(K)}`}return`**${k}**

${X.substring(0,2e4)}`}if(R==="application/pdf"||k.toLowerCase().endsWith(".pdf")){const B=await fetch(`https://www.googleapis.com/drive/v3/files/${y}?alt=media`,{headers:{Authorization:`Bearer ${m}`}});if(!B.ok)throw new Error(`Drive download error (${B.status})`);const J=await B.arrayBuffer(),X=Buffer.from(J).toString("base64");let K=null,oe="claude-sonnet-4-6";for(const Le of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const Re=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,Le).first();if(Re&&r){const _i=await G(Re.encrypted_value,r),on=JSON.parse(_i);if(on.provider==="anthropic"){K=on.apiKey,on.model&&(oe=on.model);break}}}catch{}if(!K)return`"${k}" is a PDF. An Anthropic API key is required to extract PDF content. Please configure one in Settings → Keys.`;const ue=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":K,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:oe,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:X}},{type:"text",text:I}]}]})});if(!ue.ok){const Le=await ue.text();throw new Error(`Anthropic PDF extraction error: ${Le.substring(0,200)}`)}const ve=((z=(M=(await ue.json()).content)==null?void 0:M[0])==null?void 0:z.text)||"";return`**${k}** (PDF from Drive)

${ve}`}const C=await fetch(`https://www.googleapis.com/drive/v3/files/${y}?alt=media`,{headers:{Authorization:`Bearer ${m}`}});if(!C.ok)throw new Error(`Drive download error (${C.status})`);const P=await C.text();return`**${k}** (${R})

${P.substring(0,2e4)}`}catch(m){return await U(n,s,"google","drive_read_file",m.message),`Drive read error: ${m.message}`}}case"drive_delete_file":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(n,s,r,a||"",i||""),E=t.url_or_id.trim();let y=E;const _=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const R of _){const L=E.match(R);if(L){y=L[1];break}}const b=await fetch(`https://www.googleapis.com/drive/v3/files/${y}?fields=name`,{headers:{Authorization:`Bearer ${m}`}});if(!b.ok)throw new Error(`Drive API error (${b.status})`);const S=await b.json(),k=await fetch(`https://www.googleapis.com/drive/v3/files/${y}`,{method:"PATCH",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({trashed:!0})});if(!k.ok)throw new Error(`Drive API error (${k.status})`);return`"${S.name}" moved to trash. You can restore it from Drive trash within 30 days.`}catch(m){return await U(n,s,"google","drive_delete_file",m.message),`Drive delete error: ${m.message}`}}case"drive_organise":{if(!r)return"Authentication context unavailable.";if(!t.folder_name&&!t.new_name)return"Please provide at least a folder_name to move to or a new_name to rename.";try{const{token:m}=await(await Promise.resolve().then(()=>ct)).getGoogleAuth(n,s,r,a||"",i||""),E=t.url_or_id.trim();let y=E;const _=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const S of _){const k=E.match(S);if(k){y=k[1];break}}const b=[];if(t.new_name){const S=await fetch(`https://www.googleapis.com/drive/v3/files/${y}`,{method:"PATCH",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({name:t.new_name})});if(!S.ok)throw new Error(`Drive rename error (${S.status})`);b.push(`Renamed to "${t.new_name}"`)}if(t.folder_name){const{folderName:S}=await Pn(m,y,t.folder_name);b.push(`Moved to folder "${S}"`)}return b.join(". ")+"."}catch(m){return await U(n,s,"google","drive_organise",m.message),`Drive organise error: ${m.message}`}}case"web_search":try{const m=await Ut(t.query,{num:t.num_results||5,site:t.site,googleApiKey:o||void 0,googleCseId:c||void 0});return m.error?`Web search failed: ${m.error}. Answer this question directly from your training knowledge and clearly state you are doing so.`:m.results.length===0?`Web search returned no results for "${t.query}". Answer this question directly from your training knowledge and clearly state you are doing so instead of searching.`:m.results.map((E,y)=>`${y+1}. [${E.title}](${E.link})
   ${E.snippet}`).join(`

`)}catch(m){return await U(n,s,"search","web_search",m.message),`Web search error: ${m.message}`}case"read_url":try{const m=t.url;if(!m||!m.startsWith("http://")&&!m.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const E=Math.min(t.max_length||8e3,15e3),{fetchPageContent:y}=await Promise.resolve().then(()=>pc),_=await y(m,E);return _.error?`Failed to read page: ${_.error}`:!_.text||_.text.length<20?`Page at ${m} returned no readable content.`:`Content from ${m} (${_.text.length} chars):

${_.text}`}catch(m){return await U(n,s,"search","read_url",m.message),`Read URL error: ${m.message}`}case"research":{if(!d)return"Research tool requires an LLM provider but none is available.";try{let m,E;try{for(const I of["llm_slot_1","llm_slot_2","llm_slot_3"]){const O=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,I).first();if(!O||!r)continue;const C=JSON.parse(await G(O.encrypted_value,r));if(C.provider==="anthropic"&&C.apiKey){m=C.apiKey;break}}const L=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"tavily_api_key").first();L&&r&&(E=await G(L.encrypted_value,r))}catch{}const y=t.depth||"quick",_=y==="thorough"?3e5:9e4,b=na(t.query,d,{depth:y,site:t.site,anthropicKey:m,tavilyKey:E,googleApiKey:o||void 0,googleCseId:c||void 0}),S=new Promise(L=>setTimeout(()=>L(null),_)),k=await Promise.race([b,S]);if(k===null){const{webSearch:L}=await Promise.resolve().then(()=>tc),I=await L(t.query,{num:5,googleApiKey:o||void 0,googleCseId:c||void 0});if(I.error||I.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let O=`Research took too long, but here are the top search results:

`;return O+=I.results.map((C,P)=>`${P+1}. [${C.title}](${C.link})
   ${C.snippet}`).join(`

`),O}if(k.error)return`Research failed: ${k.error}`;let R=k.report;k.sources.length>0&&(R+=`

---
**Sources** (`+k.pagesRead+` pages read):
`,R+=k.sources.map((L,I)=>`[${I+1}] [${L.title}](${L.url})`).join(`
`)),R+=`

---
💡 *Say "save as note" to store this report in your notes.*`,y==="thorough"&&m&&(R+=`
⚠️ *Thorough research used ~3 Opus 4.8 API calls (~$0.10–$0.30 at standard rates).*`);try{const L=new Q(n),I=k.report.substring(0,600);await L.store(s,"context",`Research: ${t.query.substring(0,80)}`,I,6,"long_term")}catch{}return R}catch(m){return await U(n,s,"research","research",m.message),`Research error: ${m.message}`}}case"save_note":try{const m=(t.content||"").trim();if(!m)return"Note content cannot be empty.";const E=t.source||"manual",y=["manual","research","chat"].includes(E)?E:"manual",_=await n.prepare(`INSERT INTO notes (user_id, title, content, tags, source, source_query, is_pinned)
           VALUES (?, ?, ?, ?, ?, ?, 0) RETURNING id, title`).bind(s,(t.title||"").trim(),m,(t.tags||"").trim(),y,(t.source_query||"").trim()).first();return`Note added — ${_!=null&&_.title&&_.title!=="Untitled"?_.title:m.substring(0,60)+(m.length>60?"…":"")}`}catch(m){return`Failed to save note: ${m.message}`}case"search_notes":try{const m=(t.query||"").trim();if(!m)return"Search query is required.";const E=`%${m}%`,_=(await n.prepare(`SELECT id, title, content, tags, is_pinned, updated_at FROM notes
           WHERE user_id = ? AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
           ORDER BY updated_at DESC LIMIT 20`).bind(s,E,E,E).all()).results||[];return _.length===0?`No notes found matching "${m}".`:_.map(b=>`[#${b.id}] ${b.is_pinned?"📌 ":""}${b.title||"Untitled"} (${b.updated_at})
${b.content.slice(0,200)}${b.content.length>200?"...":""}${b.tags?`
Tags: ${b.tags}`:""}`).join(`

`)}catch(m){return`Note search failed: ${m.message}`}case"list_notes":try{const m=Math.min(t.limit||10,50),E=t.tag,y=t.pinned_only===!0,_=["user_id = ?"],b=[s];E&&(_.push("tags LIKE ?"),b.push(`%${E}%`)),y&&_.push("is_pinned = 1"),b.push(m);const k=(await n.prepare(`SELECT id, title, content, tags, is_pinned, updated_at FROM notes
           WHERE ${_.join(" AND ")} ORDER BY is_pinned DESC, updated_at DESC LIMIT ?`).bind(...b).all()).results||[];return k.length===0?"No notes found.":k.map(R=>`[#${R.id}] ${R.is_pinned?"📌 ":""}${R.title||"Untitled"} (${R.updated_at})
${R.content.slice(0,150)}${R.content.length>150?"...":""}`).join(`

`)}catch(m){return`Failed to list notes: ${m.message}`}case"delete_note":try{const m=t.id;return m?(await n.prepare("DELETE FROM notes WHERE id = ? AND user_id = ?").bind(m,s).run()).meta.changes?`Note #${m} deleted.`:`Note #${m} not found.`:"Note ID is required."}catch(m){return`Failed to delete note: ${m.message}`}case"browser_task":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"browser_use_api_key").first();if(!m)return"Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key (get one at cloud.browser-use.com).";const E=(await G(m.encrypted_value,r)).trim();let y,_=t.task,b,S;if(!t.site_name)try{const P=await n.prepare("SELECT name FROM site_credentials WHERE user_id = ?").bind(s).all(),B=_.toLowerCase(),J=(P.results||[]).find(X=>B.includes(X.name.toLowerCase()));J&&(t={...t,site_name:J.name},js("browser_task auto-vault: inferred site_name from task text",{siteName:J.name,userId:s}))}catch{}if(t.site_name)try{const P=await n.prepare("SELECT id, encrypted_blob FROM site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE").bind(s,t.site_name).first();if(P){const B=JSON.parse(await G(P.encrypted_blob,r));y={username:B.username,password:B.password},S=B.sessionId,b=P.id,_=`${_}

When prompted to log in, use username {username} and password {password}.`}}catch{}const k=async P=>{if(b)try{const B=await n.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(b,s).first();if(!B)return;const J=JSON.parse(await G(B.encrypted_blob,r));J.sessionId=P,await n.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(await jt(JSON.stringify(J),r),b,s).run()}catch{}},R=async()=>{if(!(!b||!S))try{const P=await n.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(b,s).first();if(!P)return;const B=JSON.parse(await G(P.encrypted_blob,r));delete B.sessionId,await n.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(await jt(JSON.stringify(B),r),b,s).run()}catch{}},L=/blue[\s-]?dart[\s\S]{0,100}?(\d{10,11})|(\d{10,11})[\s\S]{0,100}?blue[\s-]?dart/i.exec(_);if(L){const P=L[1]||L[2];_=yc(P)}const I=void 0;v&&(v.apiKey=E,S&&!v.sessionId?(v.sessionId=S,v.persistSession=!0):!v.sessionId&&b&&(v.sessionId=await fc(E)??void 0)),js("browser_task starting",{userId:s,channel:h,timeoutMs:I??3e5,sessionId:v==null?void 0:v.sessionId,vaultSession:!!S});const O=await as(_,E,{secrets:y,sessionId:v==null?void 0:v.sessionId,timeoutMs:I});if(O.status==="completed"){const P=(v==null?void 0:v.sessionId)??void 0;return b&&P&&(v&&(v.persistSession=!0),await k(P)),(W=O.output)!=null&&W.includes('"captcha_required": true')?"Captcha detected — manual verification required. The site blocked automated access. Please try completing it manually or try again later.":O.output??"[NO-OUTPUT] Browser task completed but returned no content — do NOT invent or summarise what the site may have contained. Tell the user the browser returned nothing and suggest they try again."}if(O.status==="timeout"){v&&(v.hasActiveTask=!0);try{await new Q(n).store(s,"context",`Browser task in progress: ${O.taskId}`,JSON.stringify({task_id:O.taskId,task:t.task}),9,"working")}catch{}try{const P=(t.task||"").substring(0,200);await n.prepare("INSERT INTO pending_browser_tasks (user_id, task_id, task_description, thread_id, channel) VALUES (?, ?, ?, ?, ?)").bind(s,O.taskId,P,(v==null?void 0:v.threadId)??null,h).run()}catch{}return`[BROWSER_TIMEOUT:${O.taskId}] Browser task did not finish within the time limit. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up."`}S&&E&&En(S,E).catch(()=>{}),v&&(v.persistSession=!1),await R();const C=[O.error,O.output].filter(Boolean).join(" — ");return`Browser task failed (ID: \`${O.taskId}\`): ${C||"No details returned."} | Operator hint: Check Browser Use dashboard — taskId=${O.taskId}`}catch(m){return await U(n,s,"browser","browser_task",m.message),`Browser task error: ${m.message}`}}case"browser_task_status":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"browser_use_api_key").first();if(!m)return"Browser Use API key not configured.";const E=await G(m.encrypted_value,r),y=await ia(t.task_id,E);if(y.done){try{const _=new Q(n),b=await _.search(s,`Browser task in progress: ${t.task_id}`);for(const S of b)await _.remove(S.id,s)}catch{}return y.status==="finished"||y.status==="completed"?y.output?y.output:'[NO-OUTPUT] Browser task finished but returned no content. Do NOT invent or infer what emails or page data might have said. Tell the user: "The browser finished but returned no content — the site may have blocked automation or the login failed. Would you like to try again?"':`Browser task ended with status "${y.status}" and no output. Do NOT retry — report this to the user.`}return`[still-running] Browser task has not finished yet (status: ${y.status}). STOP — do not call browser_task_status again. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up."`}catch(m){return await U(n,s,"browser","browser_task_status",m.message),`Browser status check error: ${m.message}`}}case"vault_lookup":try{const m=(t.site_name||"").trim();if(!m)return"No site name provided.";const y=((await n.prepare("SELECT name FROM site_credentials WHERE user_id = ? AND name LIKE ? COLLATE NOCASE").bind(s,`%${m}%`).all()).results||[]).map(_=>_.name);return y.length===0?`No vault entries found matching "${m}".`:`Vault entries matching "${m}": ${y.join(", ")}. Use site_name="${y[0]}" in browser_task to inject credentials automatically.`}catch{return"vault_lookup: could not query Secret Vault (table may not exist — run migrations)."}case"search_places":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const E=await G(m.encrypted_value,r),y=await zr(E,t.query,{type:t.type});return y.error?`Places search failed: ${y.error}`:y.results.length===0?`No places found for "${t.query}".`:y.results.map((_,b)=>{const S=_.rating?` ★${_.rating} (${_.userRatingsTotal||0} reviews)`:"",k=_.openNow!==void 0?_.openNow?" · Open now":" · Closed":"",R=_.googleMapsUri?`
   ${_.googleMapsUri}`:"";return`${b+1}. **${_.name}**${S}${k}
   ${_.address}${R}
   [place_id: ${_.placeId}]`}).join(`

`)}catch(m){return await U(n,s,"google_api","search_places",m.message),`Places search error: ${m.message}`}}case"get_place_details":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),y=await Kr(E,t.place_id);if(y.error)return`Details lookup failed: ${y.error}`;if(!y.details)return"No details found.";const _=y.details;let b=`**${_.name}**
📍 ${_.address}`;if(_.phone&&(b+=`
📞 ${_.phone}`),_.website&&(b+=`
🌐 ${_.website}`),_.rating&&(b+=`
★ ${_.rating}`),_.googleMapsUri&&(b+=`
📌 ${_.googleMapsUri}`),_.openingHours&&(b+=`

Opening Hours:
${_.openingHours.join(`
`)}`),_.reviews&&_.reviews.length>0){b+=`

Recent Reviews:`;for(const S of _.reviews)b+=`
— ${S.author} (★${S.rating}, ${S.time}): "${S.text}"`}return b}catch(m){return await U(n,s,"google_api","place_details",m.message),`Place details error: ${m.message}`}}case"get_directions":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),y=await Yr(E,t.origin,t.destination,{mode:t.mode||"driving"});if(y.error)return`Directions failed: ${y.error}`;if(!y.route)return"No route found.";const _=y.route;let b=`**${_.startAddress}** → **${_.endAddress}**
`;return b+=`📏 ${_.distance} · ⏱️ ${_.duration}`,_.durationInTraffic&&(b+=` (with traffic: ${_.durationInTraffic})`),b+=`
via ${_.summary}`,b+=`

Steps:`,_.steps.forEach((S,k)=>{b+=`
${k+1}. ${S.instruction} (${S.distance}, ${S.duration})`}),b}catch(m){return await U(n,s,"google_api","directions",m.message),`Directions error: ${m.message}`}}case"get_travel_time":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),y=await Qr(E,t.origin,t.destination,t.mode||"driving");if(y.error)return`Travel time lookup failed: ${y.error}`;let _=`${t.origin} → ${t.destination}: ${y.distance}, ${y.duration}`;return y.durationInTraffic&&(_+=` (with traffic: ${y.durationInTraffic})`),_}catch(m){return await U(n,s,"google_api","travel_time",m.message),`Travel time error: ${m.message}`}}case"translate_text":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),y=await Jr(E,t.text,t.target_language,t.source_language);return y.error?`Translation failed: ${y.error}`:`[${y.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${y.translatedText}`}catch(m){return await U(n,s,"google_api","translate",m.message),`Translation error: ${m.message}`}}case"search_youtube":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),y=await Zr(E,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return y.error?`YouTube search failed: ${y.error}`:y.results.length===0?`No YouTube results for "${t.query}".`:y.results.map((_,b)=>{var S;return`${b+1}. **${_.title}**
   ${_.channelTitle} · ${((S=_.publishedAt)==null?void 0:S.split("T")[0])||""}
   ${_.description}
   ${_.url}`}).join(`

`)}catch(m){return await U(n,s,"google_api","youtube_search",m.message),`YouTube search error: ${m.message}`}}case"geocode_address":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),y=await Vr(E,t.address);return y.error?`Geocoding failed: ${y.error}`:y.results.length===0?`Location not found: "${t.address}"`:y.results.map((_,b)=>`${b+1}. ${_.address}
   Coordinates: ${_.lat}, ${_.lng}`).join(`
`)}catch(m){return await U(n,s,"google_api","geocode",m.message),`Geocoding error: ${m.message}`}}case"parse_document":{const m=t.file_id,E=t.extract_focus;if(!m)return"file_id is required to parse a document.";const y=await n.prepare("SELECT file_name, file_type, file_data, file_size, extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(m,s).first();if(!y)return"File not found. The file may have expired or the file_id is incorrect.";if(y.extracted_text)return`Document: ${y.file_name}

${y.extracted_text}`;const{file_name:_,file_type:b}=y;let{file_data:S}=y;if(S==="r2"){if(!u)return`File "${_}" is stored in R2 but no storage bucket is configured.`;const k=await u.get(m);if(!k)return`File "${_}" not found in storage. It may have been deleted.`;const R=await k.arrayBuffer();S=Buffer.from(R).toString("base64")}if(b.startsWith("text/"))try{const k=Buffer.from(S,"base64").toString("utf-8");return`Document: ${_}

${k.substring(0,2e4)}`}catch{return`Could not decode text file: ${_}`}if(b==="application/pdf"||b==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||_.toLowerCase().endsWith(".pdf")||_.toLowerCase().endsWith(".docx")){if(b==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||_.toLowerCase().endsWith(".docx")){try{const L=await oa(Buffer.from(S,"base64"));if(L.length>50){try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(L,m,s).run();const I=L.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind(I,L.substring(0,5e4),m,s).run(),p!=null&&p.ai&&(p!=null&&p.vectorize)){const O=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,s).first();if(O){const{indexDocumentChunks:C}=await Promise.resolve().then(()=>st);C({DB:n,AI:p.ai,VECTORIZE:p.vectorize},s,O.id,L).catch(()=>{})}}}catch{}return`Document: ${_}

${L.substring(0,2e4)}`}}catch{}return`Could not extract text from "${_}". Try uploading to Google Drive and sharing the link — Drive can open and export Word documents directly.`}let k=null,R="claude-sonnet-4-6";for(const L of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const I=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,L).first();if(I&&r){const O=await G(I.encrypted_value,r),C=JSON.parse(O);if(C.provider==="anthropic"){k=C.apiKey,C.model&&(R=C.model);break}}}catch{}if(k)try{const L=E?`Focus specifically on extracting: ${E}`:"Extract and return all readable text content from this document. Preserve structure where relevant.",I=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":k,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:R,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:S}},{type:"text",text:L}]}]})});if(I.ok){const C=((j=(ne=(await I.json()).content)==null?void 0:ne[0])==null?void 0:j.text)||"";if(C&&C.length>50)try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(C,m,s).run();const P=C.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind(P,C.substring(0,5e4),m,s).run(),p!=null&&p.ai&&(p!=null&&p.vectorize)){const B=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,s).first();if(B){const{indexDocumentChunks:J}=await Promise.resolve().then(()=>st);J({DB:n,AI:p.ai,VECTORIZE:p.vectorize},s,B.id,C).catch(()=>{})}}}catch{}return`Document: ${_}

${C}`}else{const O=await I.text();return`Could not parse ${_} via Anthropic API: ${O.substring(0,200)}`}}catch(L){return`Document parsing error for ${_}: ${L.message}`}return"To parse PDF documents, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set."}if(b.startsWith("image/")){let k=null,R="claude-sonnet-4-6";for(const I of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const O=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,I).first();if(O&&r){const C=await G(O.encrypted_value,r),P=JSON.parse(C);if(P.provider==="anthropic"){k=P.apiKey,P.model&&(R=P.model);break}}}catch{}if(!k)return"To extract text from images, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set.";const L=E?`Focus specifically on: ${E}`:"Extract all visible text from this image. Include any text from signs, documents, screenshots, or diagrams. If the image contains charts or tables, describe their structure and data.";try{const I=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":k,"anthropic-version":"2023-06-01","content-type":"application/json"},body:JSON.stringify({model:R,max_tokens:4096,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:b,data:S}},{type:"text",text:L}]}]})});if(I.ok){const C=((q=(Y=(await I.json()).content)==null?void 0:Y[0])==null?void 0:q.text)||"";if(C&&C.length>50)try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(C,m,s).run();const P=C.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind(P,C.substring(0,5e4),m,s).run(),p!=null&&p.ai&&(p!=null&&p.vectorize)){const B=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,s).first();if(B){const{indexDocumentChunks:J}=await Promise.resolve().then(()=>st);J({DB:n,AI:p.ai,VECTORIZE:p.vectorize},s,B.id,C).catch(()=>{})}}}catch{}return`Document: ${_}

${C}`}else{const O=await I.text();return`Could not parse ${_} via Anthropic API: ${O.substring(0,200)}`}}catch(I){return`Image parsing error for ${_}: ${I.message}`}}try{const k=Buffer.from(S,"base64").toString("utf-8").substring(0,2e3);return`Document: ${_} (${b})

Content preview:
${k}`}catch{return`Cannot read file: ${_} (${b})`}}case"search_library":{const m=t.query,E=Math.min(typeof t.limit=="number"?t.limit:10,20);if(!m)return"query is required for search_library.";if(p!=null&&p.ai&&(p!=null&&p.vectorize))try{const{semanticDocumentSearch:k}=await Promise.resolve().then(()=>st),R=await k({DB:n,AI:p.ai,VECTORIZE:p.vectorize},s,m,E);if(R.length>0){const L=R.map(I=>`[id:${I.document_id}] "${I.filename}" (relevance: ${(I.relevance_score*100).toFixed(1)}%)
  Snippet: ${I.chunk.substring(0,350)}`).join(`

`);return`Found ${R.length} semantically relevant document(s) for "${m}":

${L}

Use read_library_file with the id to get the full document text.`}}catch{}const y=await n.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, dl.extracted_text as dl_extracted
        FROM document_library dl
        WHERE dl.user_id = ?
          AND (dl.name LIKE ? OR dl.summary LIKE ? OR dl.extracted_text LIKE ?)
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(s,`%${m}%`,`%${m}%`,`%${m}%`,E).all(),_=await n.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, uf.extracted_text as dl_extracted
        FROM document_library dl
        JOIN uploaded_files uf ON dl.file_id = uf.id
        WHERE dl.user_id = ? AND uf.user_id = ?
          AND uf.extracted_text LIKE ?
          AND dl.id NOT IN (SELECT id FROM document_library WHERE user_id = ? AND (name LIKE ? OR summary LIKE ? OR extracted_text LIKE ?))
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(s,s,`%${m}%`,s,`%${m}%`,`%${m}%`,`%${m}%`,E).all(),b=[...y.results||[],..._.results||[]].slice(0,E);if(b.length===0)return`No documents found matching "${m}" in your library.`;const S=b.map(k=>{const R=(k.summary||k.dl_extracted||"").substring(0,200);return`[id:${k.id}] "${k.name}" (source: ${k.source}, status: ${k.status})
  Preview: ${R||"(no preview yet — summarize or ask Karna to read it)"}`}).join(`

`);return`Found ${b.length} document(s) matching "${m}":

${S}

Use read_library_file with the id to get full text.`}case"read_library_file":{const m=String(t.id_or_name||"").trim();if(!m)return"id_or_name is required for read_library_file.";const E=parseInt(m,10);let y=null;if(isNaN(E)||(y=await n.prepare(`SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.id = ? AND dl.user_id = ?`).bind(E,s).first()),y||(y=await n.prepare(`SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.user_id = ? AND dl.name LIKE ? LIMIT 1`).bind(s,`%${m}%`).first()),!y)return`Document "${m}" not found. Use search_library to find available documents.`;let _=y.extracted_text||null;if(!_&&y.file_id){const b=await n.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(y.file_id,s).first();_=(b==null?void 0:b.extracted_text)||null}return _||(_=y.summary||null),_?`Document: ${y.name}

${_.substring(0,2e4)}`:`Document "${y.name}" has no extracted text yet. Ask Karna to parse it with parse_document(file_id="${y.file_id}") to extract the text first.`}case"create_skill":{const m=(Z=t.name)==null?void 0:Z.trim(),E=(te=t.description)==null?void 0:te.trim(),y=(ce=t.instructions)==null?void 0:ce.trim();if(!m||!E||!y)return"create_skill requires name, description, and instructions.";let _=m.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"");_||(_=`skill_${Date.now()}`);const b=await n.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(s,`${_}%`).all();(re=b.results)!=null&&re.some(L=>L.slug===_)&&(_=`${_}_${(((ye=b.results)==null?void 0:ye.length)||0)+1}`);const S=JSON.stringify(t.parameters||{}),k=JSON.stringify(t.required_tools||[]),R=JSON.stringify(t.examples||[]);return await n.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(s,m,_,E,y,S,k,R).run(),`Skill created: **${m}** (invoke as: "${_}")

You can now ask me to run "${m}" at any time. The skill will appear in Settings → Skills. You can also say "run my ${m} skill" to execute it.`}case"list_skills":{const E=t.include_disabled===!0?"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? ORDER BY created_at DESC":"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC",_=(await n.prepare(E).bind(s).all()).results||[];if(_.length===0)return`You haven't created any custom skills yet. Ask me to create one: "Create a skill that..."`;const b=_.map(S=>`• **${S.name}** (${S.slug}): ${S.description} [used ${S.usage_count} times${S.enabled?"":" — disabled"}]`).join(`
`);return`Your custom skills (${_.length}):

${b}`}case"udm_list_pages":{if(!r)return"Authentication context unavailable.";try{return await Pc(n,s,r)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_list_pages",m.message),`Failed to list Unified Docs pages: ${m.message}`)}}case"udm_create_page":{if(!r)return"Authentication context unavailable.";try{return await jc(n,s,r,t.title,t.markdown,t.parent_page_title)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_create_page",m.message),`Failed to create Unified Docs page: ${m.message}`)}}case"udm_read_page":{if(!r)return"Authentication context unavailable.";try{return await Uc(n,s,r,t.page_title)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_read_page",m.message),`Failed to read Unified Docs page: ${m.message}`)}}case"udm_write_page":{if(!r)return"Authentication context unavailable.";try{return await Bc(n,s,r,t.page_title,t.markdown)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_write_page",m.message),`Failed to update Unified Docs page: ${m.message}`)}}case"udm_search":{if(!r)return"Authentication context unavailable.";try{return await Hc(n,s,r,t.query)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_search",m.message),`Failed to search Unified Docs: ${m.message}`)}}case"udm_delete_page":{if(!r)return"Authentication context unavailable.";try{return await Fc(n,s,r,t.page_title)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_delete_page",m.message),`Failed to delete Unified Docs page: ${m.message}`)}}case"udm_list_comments":{if(!r)return"Authentication context unavailable.";try{return await Wc(n,s,r,t.page_title)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_list_comments",m.message),`Failed to fetch comments: ${m.message}`)}}case"udm_add_comment":{if(!r)return"Authentication context unavailable.";try{return await qc(n,s,r,t.page_title,t.content)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_add_comment",m.message),`Failed to add comment: ${m.message}`)}}case"udm_read_page_with_comments":{if(!r)return"Authentication context unavailable.";try{return await Zc(n,s,r,t.page_title)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_read_page_with_comments",m.message),`Failed to read page with comments: ${m.message}`)}}case"udm_create_database":{if(!r)return"Authentication context unavailable.";try{return await Gc(n,s,r,t.title,t.parent_title,t.embed_in_page_title)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_create_database",m.message),`Failed to create database: ${m.message}`)}}case"udm_read_database":{if(!r)return"Authentication context unavailable.";try{return await zc(n,s,r,t.page_title)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_read_database",m.message),`Failed to read database: ${m.message}`)}}case"udm_add_row":{if(!r)return"Authentication context unavailable.";try{return await Kc(n,s,r,t.page_title,t.properties??{},t.title)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_add_row",m.message),`Failed to add row: ${m.message}`)}}case"udm_update_row":{if(!r)return"Authentication context unavailable.";try{return await Yc(n,s,r,t.page_title,t.row_id,t.properties??{})}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_update_row",m.message),`Failed to update row: ${m.message}`)}}case"udm_delete_row":{if(!r)return"Authentication context unavailable.";try{return await Jc(n,s,r,t.page_title,t.row_id)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_delete_row",m.message),`Failed to delete row: ${m.message}`)}}case"udm_add_property":{if(!r)return"Authentication context unavailable.";try{return await Vc(n,s,r,t.page_title,t.name,t.type,t.options)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_add_property",m.message),`Failed to add column: ${m.message}`)}}case"udm_edit_section":{if(!r)return"Authentication context unavailable.";try{return await Qc(n,s,r,t.page_title,t.old_text,t.new_text,t.comment_id,t.occurrence)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_edit_section",m.message),`Failed to edit section: ${m.message}`)}}case"udm_list_agent_comments":{if(!r)return"Authentication context unavailable.";try{return await el(n,s,r,t.page_title)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_list_agent_comments",m.message),`Failed to fetch agent comments: ${m.message}`)}}case"udm_apply_comment":{if(!r)return"Authentication context unavailable.";try{return await tl(n,s,r,t.comment_id,t.new_text,t.old_text,t.occurrence)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_apply_comment",m.message),`Failed to apply comment: ${m.message}`)}}case"udm_resolve_comment":{if(!r)return"Authentication context unavailable.";try{return await Xc(n,s,r,t.comment_id)}catch(m){return m instanceof me?m.message:(await U(n,s,"udm","udm_resolve_comment",m.message),`Failed to resolve comment: ${m.message}`)}}default:{const m=e,E=await n.prepare("SELECT id, name, description, instructions, required_tools FROM user_skills WHERE user_id = ? AND slug = ? AND enabled = 1").bind(s,m).first();if(E){await n.prepare("UPDATE user_skills SET usage_count = usage_count + 1, last_used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(E.id).run();const y=(()=>{try{return JSON.parse(E.required_tools).join(", ")}catch{return""}})(),_=Object.keys(t).length>0?`

Inputs provided: ${JSON.stringify(t)}`:"";return`[SKILL: ${E.name}] Follow these instructions exactly:

${E.instructions}${_}

${y?`Tools to use: ${y}`:""}

Execute the steps above using your available tools. When complete, provide a clear summary of what was done and any results.`}return`Unknown tool: ${e}`}}}async function Na(e,t,n,s,r){if(t.length>0&&t[t.length-1].role==="user"){const a="(Previous request did not complete. Please try again.)";await e.storeMessage(n,s,"assistant",a,"{}",r),t.push({id:-1,user_id:n,channel:s,role:"assistant",content:a,metadata:"{}",token_estimate:a.length,created_at:new Date().toISOString()})}}function Ia(e){for(let t=e.length-1;t>=0;t--)if(e[t].role==="assistant"){const n=typeof e[t].content=="string"?e[t].content:"";n.length<300&&/^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(n.trim())&&(e[t]={...e[t],content:"(My previous response was cut off before completing. Starting fresh.)"});break}}async function Bs(e,t,n,s,r,a,i){var ce,re,ye,m,E;const o=new Q(t),c=(ce=e.metadata)==null?void 0:ce.thread_id,l=Date.now(),[d,u,p,h]=await Promise.all([o.buildContext(s.id),ts(t,s.id),ws(t,s.id),fa(t,s.id)]),v=await o.getRecentConversations(s.id,30,c);await Na(o,v,s.id,e.channel,c);const f=ka(s,d,e.channel,p,h,u),g=gs(v),w=ys([{role:"system",content:f},...fs(v),{role:"user",content:e.text}]);Sa(w,g),Ia(w);const T=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],x=(d.match(/^- /gm)||[]).length;if(T.some(y=>y.test(e.text))||x<3)try{const y=await o.searchWithConfidence(s.id,e.text,{limit:5});if(y.results.length>0){const{buildConfidenceContext:_}=await Promise.resolve().then(()=>Ye),b=_(y.results);w[0]={...w[0],content:w[0].content+y.systemPromptSuffix},w.splice(w.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${b}]`})}else if(y.unmetQuery){const{detectSoundDomain:_}=await Promise.resolve().then(()=>ds);if(_(e.text)){const{answerWithFederation:b}=await Promise.resolve().then(()=>wi),S=await b(o,s.id,e.text).catch(()=>null);if(S&&(S.source==="eddy"||S.source==="memory"))w.splice(w.length-1,0,{role:"assistant",content:"I checked Eddy's sound department records."},{role:"user",content:`[Eddy data retrieved:
${S.answer}]`});else{const{generateUncertaintyResponse:k}=await Promise.resolve().then(()=>Ye);w.splice(w.length-1,0,{role:"assistant",content:"I checked my long-term memory and Eddy's records."},{role:"user",content:k(y.unmetQuery)})}}else{const{generateUncertaintyResponse:b}=await Promise.resolve().then(()=>Ye);w.splice(w.length-1,0,{role:"assistant",content:"I checked my long-term memory."},{role:"user",content:b(y.unmetQuery)})}}}catch{}await o.storeMessage(s.id,e.channel,"user",e.text,"{}",c);const N=(i==null?void 0:i.maxTurns)??10,$=(i==null?void 0:i.tools)??await vs(t,s.id);let M="",z=0;const W=[];let ne,j=0,Y=0;const q={hasActiveTask:!1,persistSession:!1,threadId:c,channel:e.channel};for(let y=0;y<N;y++){j=y+1;try{y>0&&Ra(w);const _=await n.chat(w,{tools:$,toolChoice:y===0&&(i!=null&&i.forceToolUseOnFirstTurn)?"required":void 0});if(_.usage&&(z+=_.usage.promptTokens+_.usage.completionTokens),_.toolCalls&&_.toolCalls.length>0){const b=_.content||"(tools executed)";w.push({role:"assistant",content:b});for(const k of _.toolCalls)W.push(k.name);const S=await Promise.all(_.toolCalls.map(async k=>{try{const R=await Vt(k.name,k.arguments,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE},q);ne=Ta(k.name,k.arguments,R,ne);const L=["parse_document","drive_read_file","read_library_file"].includes(k.name)?2e4:k.name==="research"?16e3:8e3,I=R.length>L?R.substring(0,L)+`
[...result truncated to prevent token limit — full content was extracted]`:R;return`[Tool Result for ${k.name}]: ${I}`}catch(R){return Y++,await U(t,s.id,"tool",k.name,R.message||"Tool execution failed"),`[Tool Error for ${k.name}]: ${R.message||"Execution failed"}`}}));w.push({role:"user",content:S.join(`

`)});continue}M=_.content;break}catch(_){if(r){const b=_.message||"",S=b.includes("401")||b.includes("403")||b.includes("authentication")||b.includes("credit balance"),k=b.includes("429"),R=S?1440:k?10:5;await r.recordError(n.name,b,R)}throw await U(t,s.id,"llm","provider_error",_.message||"Unknown LLM error",{provider:n.name,turn:y}),_}}if(M=(M==null?void 0:M.trim())??"",!M)try{((re=w[w.length-1])==null?void 0:re.role)==="user"&&w.push({role:"assistant",content:"[gathering results]"}),w.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),M=(await n.chat(w,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me directly and I will answer from my knowledge."}catch{M="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge."}if(r&&z>0)try{await r.recordUsage(n.name,z)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,n.name,"full",z,Date.now()-l,1,e.channel).run()}catch{}const Z=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your|the)\s+(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc|(saved|stored)\s+(it\s+|the\s+essay\s+|the\s+article\s+)?(to|in|on)\s+(your\s+)?(google\s+)?drive|essay\s+(is\s+)?(saved|stored)\s+(in|on|to)\s+(drive|google\s+docs?))\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created or saved a Google Document but create_doc was never called. You MUST call create_doc NOW with the full content in the content parameter.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const y of Z){const _=y.claimPattern.test(M),b=y.requiredTools.some(S=>W.includes(S));if(_&&!b){try{await U(t,s.id,"llm",y.logType,"LLM claimed action without tool call",{response:M.substring(0,200)}),w.push({role:"assistant",content:M}),w.push({role:"user",content:y.enforcementMsg});const S=await n.chat(w,{tools:$.filter(k=>y.requiredTools.includes(k.name)),temperature:0});if((ye=S.toolCalls)!=null&&ye.length){for(const R of S.toolCalls){const L=await Vt(R.name,R.arguments,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE});W.push(R.name),w.push({role:"assistant",content:"",toolCalls:S.toolCalls}),w.push({role:"user",content:L})}const k=await n.chat(w,{tools:[]});k.content&&(M=k.content)}else M="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}let te=M.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim();if(!te&&W.length>0){const y=[...new Set(W)].join(", ");try{((m=w[w.length-1])==null?void 0:m.role)==="user"&&w.push({role:"assistant",content:"[completed tools]"}),w.push({role:"user",content:"Please summarise what you just did and provide the result to the user."}),te=((E=(await n.chat(w,{tools:[]})).content)==null?void 0:E.trim())||`Done. I used the following tools: ${y}.`}catch{te=`Done. I used the following tools: ${y}.`}}await o.storeMessage(s.id,e.channel,"assistant",Jt(te),ba(W,ne),c);try{const y=await t.prepare("SELECT COUNT(*) as c FROM conversations WHERE user_id = ? AND role = ?").bind(s.id,"assistant").first();y&&y.c%5===0&&y.c>0&&await Promise.race([wl(t,n,s,o,w),new Promise(_=>setTimeout(_,5e3))])}catch{}return W.length>=3&&Promise.race([ha(t,n,s,e.text,W,j,Y===0),new Promise(y=>setTimeout(y,6e3))]).catch(()=>{}),q.sessionId&&q.apiKey&&!q.hasActiveTask&&!q.persistSession&&En(q.sessionId,q.apiKey).catch(()=>{}),te}async function wl(e,t,n,s,r){var d;const a=r.filter(u=>u.role!=="system").slice(-10);if(a.length<4)return;const o=[{role:"system",content:`Review this conversation and extract any information worth remembering long-term.
Only extract genuinely durable information — things that will still be relevant in future conversations.
Good examples: addresses, phone numbers, account IDs, spreadsheet IDs, document links, explicit preferences, recurring needs, key decisions.
Bad examples: temporary topics, one-off requests, information already in the system prompt.

For each item, output a line: TYPE|TITLE|CONTENT|IMPORTANCE
Types: fact, preference, context, decision
Importance: 1-10 (8+ = standing rules, 5-7 = regular facts)
If nothing worth extracting, output: NONE`},...a,{role:"user",content:"Extract durable information from the above conversation."}],l=((d=(await t.chat(o,{tools:[]})).content)==null?void 0:d.trim())||"";if(!(!l||l==="NONE"))for(const u of l.split(`
`)){const p=u.trim().split("|");if(p.length<4)continue;const[h,v,f,g]=p,w=["fact","preference","context","decision","summary","task"].find(x=>x===h.trim().toLowerCase());if(!w||!(v!=null&&v.trim())||!(f!=null&&f.trim()))continue;const T=Math.min(10,Math.max(1,parseInt(g)||5));await s.store(n.id,w,v.trim(),f.trim(),T,"long_term")}}const Hs={"claude-opus-4-8":1e6,"claude-sonnet-4-6":1e6,"claude-haiku-4-5":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function _l(e){for(const[t,n]of Object.entries(Hs))if(e.toLowerCase().includes(t.toLowerCase()))return n;return Hs.default}function bl(e,t,n,s){const r=_l(s),a=Math.floor(r*.75),i=[];let o=0,c=!1;const l=Mn(e);i.push({role:"system",content:e}),o+=l;const d=Mn(n);o+=d;const u=a-o,p=[];let h=0;for(let v=t.length-1;v>=0;v--){const f=t[v],g=Mn(f.content);if(h+g<=u)p.unshift({role:f.role,content:f.content}),h+=g;else{c=!0;break}}return i.push(...p),i.push({role:"user",content:n}),o+=h,{maxTokens:r,usedTokens:o,messages:i,wasTruncated:c}}async function*El(e,t,n,s,r,a){var ye,m,E;const i=new Q(t),o=(ye=e.metadata)==null?void 0:ye.thread_id,c=Date.now();yield{type:"thinking",data:{threadId:o,provider:n.name}};const[l,d,u,p]=await Promise.all([i.buildContext(s.id),ts(t,s.id),ws(t,s.id),fa(t,s.id)]),h=await i.getRecentConversations(s.id,30,o);await Na(i,h,s.id,e.channel,o);const v=ka(s,l,e.channel,u,p,d),f=gs(h),g=ys([...fs(h)]);let w=e.text;f&&(w=`${Kn}

${e.text}`);const T=bl(v,g.map(y=>({role:y.role,content:y.content})),w,n.name);await i.storeMessage(s.id,e.channel,"user",e.text,"{}",o);const x=await vs(t,s.id),A=10;let N="",$=0;const M=[...T.messages],z=[];let W,ne=0,j=0;const Y={hasActiveTask:!1,persistSession:!1,threadId:o,channel:e.channel},q=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],Z=(l.match(/^- /gm)||[]).length;if(q.some(y=>y.test(e.text))||Z<3||f)try{const y=await i.searchWithConfidence(s.id,e.text,{limit:5});if(y.results.length>0){const{buildConfidenceContext:_}=await Promise.resolve().then(()=>Ye),b=_(y.results);M[0]={...M[0],content:M[0].content+y.systemPromptSuffix},M.splice(M.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${b}]`})}else if(y.unmetQuery){const{detectSoundDomain:_}=await Promise.resolve().then(()=>ds);if(_(e.text)){const{answerWithFederation:b}=await Promise.resolve().then(()=>wi),S=await b(i,s.id,e.text).catch(()=>null);if(S&&(S.source==="eddy"||S.source==="memory"))M.splice(M.length-1,0,{role:"assistant",content:"I checked Eddy's sound department records."},{role:"user",content:`[Eddy data retrieved:
${S.answer}]`});else{const{generateUncertaintyResponse:k}=await Promise.resolve().then(()=>Ye);M.splice(M.length-1,0,{role:"assistant",content:"I checked my long-term memory and Eddy's records."},{role:"user",content:k(y.unmetQuery)})}}else{const{generateUncertaintyResponse:b}=await Promise.resolve().then(()=>Ye);M.splice(M.length-1,0,{role:"assistant",content:"I checked my long-term memory."},{role:"user",content:b(y.unmetQuery)})}}}catch{}Ia(M);const ce=()=>ba(z,W);for(let y=0;y<A;y++){ne=y+1;try{y>0&&(yield{type:"thinking",data:{threadId:o}},Ra(M));const _=await n.chat(M,{tools:x});if(_.usage&&($+=_.usage.promptTokens+_.usage.completionTokens),_.toolCalls&&_.toolCalls.length>0){const k=((m=_.content)==null?void 0:m.trim())??"";k&&k.length<=150&&!/^\[calling:/i.test(k)&&(yield{type:"chunk",data:{text:_.content,threadId:o}});const R=_.content||"(tools executed)";M.push({role:"assistant",content:R});const L=[];for(const I of _.toolCalls){yield{type:"tool_start",data:{tool:I.name,toolArgs:I.arguments,threadId:o}},z.push(I.name);try{const O=(X,K)=>Vt(X,K,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE},Y);let C;if(I.name==="research"&&(yield{type:"research_ack",data:{message:(I.arguments.depth||"quick")==="thorough"?"Starting deep research with Opus 4.8 — planning queries, reading sources, and identifying gaps. This takes 2-4 minutes and uses ~3 Opus API calls.":"Researching with Opus 4.8... (45–90 seconds)",threadId:o}}),I.name==="browser_task"||I.name==="browser_task_status"){if(I.name==="browser_task"){const de=I.arguments.site_name;yield{type:"browser_ack",data:{message:de?`Starting now — opening ${de} in a browser. I'll notify you when done.`:"Starting now — running browser task. I'll notify you when done.",startedAt:new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:s.timezone||"UTC"}),threadId:o}}}const K=["Still working — browser launched, navigating to site...","Still working — page loaded, scanning for content...","Still working — reading and extracting results...","Still working — almost there, finalising output...","Taking a bit longer — site may require extra steps...","Still running — browser is working through the page...","Continuing — extracting and processing data...","Still going — complex task, nearly there...","Almost done — wrapping up the browser session...","Still running — holding on a little longer...","Browser is still active — this one is taking time...","Patience — still working through the task...","Still running — will have a result for you shortly..."],oe=O(I.name,I.arguments);let ue=0;e:for(;;){const de=await Promise.race([oe.then(ve=>({done:!0,r:ve})),new Promise(ve=>setTimeout(()=>ve({done:!1}),15e3))]);if(de.done){C=de.r;break e}I.name==="browser_task"?yield{type:"browser_progress",data:{message:K[Math.min(ue,K.length-1)],elapsed_s:(ue+1)*15,threadId:o}}:yield{type:"thinking",data:{threadId:o}},ue++}if(I.name==="browser_task"){const de=C.match(/^\[BROWSER_TIMEOUT:([^\]]+)\]/);if(de){yield{type:"browser_progress",data:{message:"Task still running — checking final status...",threadId:o}};const ve=O("browser_task_status",{task_id:de[1]});e:for(;;){const Le=await Promise.race([ve.then(Re=>({done:!0,r:Re})),new Promise(Re=>setTimeout(()=>Re({done:!1}),15e3))]);if(Le.done){C=Le.r;break e}yield{type:"thinking",data:{threadId:o}}}if(!C.startsWith("[still-running]")&&!C.startsWith("[NO-OUTPUT]")&&!C.startsWith("Browser"))try{await t.prepare("DELETE FROM pending_browser_tasks WHERE user_id = ? AND task_id = ? AND notified = 0").bind(s.id,de[1]).run()}catch{}}}}else if(I.name==="research"){const oe=(I.arguments.depth||"quick")==="thorough"?["Still researching — planning sub-queries...","Still researching — fetching sources...","Still researching — reading pages...","Still researching — identifying gaps...","Still researching — running gap searches...","Still researching — synthesising findings...","Almost done — writing final report...","Wrapping up — almost there..."]:["Still researching — fetching sources...","Still researching — reading pages...","Almost done — synthesising findings..."],ue=O(I.name,I.arguments);let de=0;e:for(;;){const ve=await Promise.race([ue.then(Re=>({done:!0,r:Re})),new Promise(Re=>setTimeout(()=>Re({done:!1}),2e4))]);if(ve.done){C=ve.r;break e}yield{type:"research_progress",data:{message:oe[Math.min(de,oe.length-1)],elapsed_s:(de+1)*20,threadId:o}},de++}}else C=await O(I.name,I.arguments);let P=C;(I.name==="browser_task"||I.name==="browser_task_status")&&(/^\[BROWSER_TIMEOUT:/.test(P)?P="Task timed out — still running in background.":/^\[NO-OUTPUT\]/.test(P)?P="Browser task finished but returned no content.":/^\[still-running\]/.test(P)?P="Still running — will notify when done.":P=P.replace(/\s*\|\s*Operator hint:.*$/s,"")),yield{type:"tool_end",data:{tool:I.name,toolResult:P.substring(0,500)+(P.length>500?"...":""),threadId:o}};const B=["parse_document","drive_read_file","read_library_file"].includes(I.name)?2e4:I.name==="research"?16e3:8e3,J=C.length>B?C.substring(0,B)+`
[...result truncated to prevent token limit — full content was extracted]`:C;W=Ta(I.name,I.arguments,C,W),L.push(`[Tool Result for ${I.name}]: ${J}`)}catch(O){j++,await U(t,s.id,"tool",I.name,O.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:I.name,toolResult:`Error: ${O.message||"Execution failed"}`,threadId:o}},L.push(`[Tool Error for ${I.name}]: ${O.message||"Execution failed"}`)}}M.push({role:"user",content:L.join(`

`)});continue}N=_.content;const b=Jt(N);await i.storeMessage(s.id,e.channel,"assistant",b,ce(),o);const S=50;for(let k=0;k<b.length;k+=S)yield{type:"chunk",data:{text:b.substring(k,k+S),threadId:o}},k+S<b.length&&await new Promise(L=>setTimeout(L,10));break}catch(_){if(r){const k=_.message||"",R=k.includes("401")||k.includes("403")||k.includes("authentication")||k.includes("credit balance"),L=k.includes("429"),I=R?1440:L?10:5;await r.recordError(n.name,k,I)}await U(t,s.id,"llm","provider_error",_.message||"Unknown LLM error",{provider:n.name,turn:y});const b=_.message||"An error occurred",S=b.includes("429")||b.toLowerCase().includes("rate limit")||b.toLowerCase().includes("too many requests")?"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.":b;try{await i.storeMessage(s.id,e.channel,"assistant",`⚠️ ${S}`,"{}",o)}catch{}yield{type:"error",data:{error:S,threadId:o}};return}}if(N=(N==null?void 0:N.trim())??"",!N)try{M.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),N=(await n.chat(M,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me to answer directly from my knowledge.";const _=Jt(N);await i.storeMessage(s.id,e.channel,"assistant",_,ce(),o);const b=50;for(let S=0;S<_.length;S+=b)yield{type:"chunk",data:{text:_.substring(S,S+b),threadId:o}},S+b<_.length&&await new Promise(k=>setTimeout(k,10))}catch{N="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.",await i.storeMessage(s.id,e.channel,"assistant",N,ce(),o).catch(()=>{}),yield{type:"chunk",data:{text:N,threadId:o}}}if(r&&$>0)try{await r.recordUsage(n.name,$)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,n.name,"full",$,Date.now()-c,1,e.channel).run()}catch{}const re=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your\s+|the\s+)(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc|(saved|stored)\s+(it\s+|the\s+essay\s+|the\s+article\s+)?(to|in|on)\s+(your\s+)?(google\s+)?drive|essay\s+(is\s+)?(saved|stored)\s+(in|on|to)\s+(drive|google\s+docs?))\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created or saved a Google Document but create_doc was never called. You MUST call create_doc NOW with the full content in the content parameter.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const y of re){const _=y.claimPattern.test(N),b=y.requiredTools.some(S=>z.includes(S));if(_&&!b){try{await U(t,s.id,"llm",y.logType,"LLM claimed action without tool call (streaming)",{response:N.substring(0,200)}),M.push({role:"assistant",content:N}),M.push({role:"user",content:y.enforcementMsg});const S=await n.chat(M,{tools:x.filter(k=>y.requiredTools.includes(k.name)),temperature:0});if((E=S.toolCalls)!=null&&E.length){for(const R of S.toolCalls){const L=await Vt(R.name,R.arguments,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE});z.push(R.name),M.push({role:"assistant",content:"",toolCalls:S.toolCalls}),M.push({role:"user",content:L})}const k=await n.chat(M,{tools:[]});k.content&&(N=k.content)}else N="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}z.length>=3&&Promise.race([ha(t,n,s,e.text,z,ne,j===0),new Promise(y=>setTimeout(y,6e3))]).catch(()=>{}),Y.sessionId&&Y.apiKey&&!Y.hasActiveTask&&!Y.persistSession&&En(Y.sessionId,Y.apiKey).catch(()=>{}),yield{type:"done",data:{threadId:o,provider:n.name,tokenCount:$}}}async function Yn(e,t,n,s,r,a,i,o){await a.storeMessage(r.id,t.channel,"user",t.text,"{}",o);const c=await Vt(e.tool,e.args,n,r.id,{agentType:"direct",channel:t.channel},r.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,r.timezone,s,i==null?void 0:i.DOCUMENTS_BUCKET,{ai:i==null?void 0:i.AI,vectorize:i==null?void 0:i.VECTORIZE}),l=`[TOOLS_USED: ${e.tool}] ${c}`.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"");return await a.storeMessage(r.id,t.channel,"assistant",l,"{}",o),c}async function _s(e,t,n,s,r,a){var f;const i=new Q(t),o=(f=e.metadata)==null?void 0:f.thread_id,c=await i.buildContext(s.id),l=await i.getRecentConversations(s.id,6,o),d=is(e.text,c,Ea(l));if(d.agent==="conversation")return Ca(e,t,n,s,c,r,o);const u=cs(e.text);if(u)return Yn(u,e,t,n,s,i,a,o);const p=(await i.getRecentConversations(s.id,10,o)).map(g=>g.content).join(`
`),h=ls(e.text,p);if(h)return Yn(h,e,t,n,s,i,a,o);const v=d.confidence>=.85;if(e.channel==="telegram"){const g=await vs(t,s.id);return Bs(e,t,n,s,r,a,{maxTurns:10,tools:g,forceToolUseOnFirstTurn:v})}return Bs(e,t,n,s,r,a,{forceToolUseOnFirstTurn:v})}async function Ca(e,t,n,s,r,a,i){const o=new Q(t),c=Date.now(),l=xa(s.timezone),d=await ws(t,s.id),u=d?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. Do not store copies in memory or contradict them.
${d}

${r}`:r,p=da("conversation",s,u,s.timezone,l,e.channel),h=(await o.getRecentConversations(s.id,30,i)).filter(x=>!x.content.startsWith("[Autonomous Scheduled Task]")&&!x.content.startsWith("[Scheduled Reminder]")),v=gs(h),f=ys([{role:"system",content:p},...fs(h),{role:"user",content:e.text}]);Sa(f,v),await o.storeMessage(s.id,e.channel,"user",e.text,"{}",i);let g=0,w="";try{const x=await n.chat(f,{temperature:.8});x.usage&&(g=x.usage.promptTokens+x.usage.completionTokens),w=x.content}catch(x){if(a){const A=x.message||"",N=A.includes("401")||A.includes("403")||A.includes("authentication")||A.includes("credit balance"),$=A.includes("429"),M=N?1440:$?10:5;await a.recordError(n.name,A,M)}throw await U(t,s.id,"llm","conversation_error",x.message,{provider:n.name}),x}if(a&&g>0)try{await a.recordUsage(n.name,g)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,n.name,"conversation",g,Date.now()-c,1,e.channel).run()}catch{}const T=Jt(w);return await o.storeMessage(s.id,e.channel,"assistant",T,"{}",i),T}async function*Fs(e,t,n,s,r,a,i,o){yield{type:"tool_start",data:{tool:e.tool,toolArgs:e.args,threadId:o}};const c=await Yn(e,t,n,s,r,a,i,o);yield{type:"tool_end",data:{tool:e.tool,toolResult:c.substring(0,500)+(c.length>500?"...":""),threadId:o}};const l=Jt(c),d=50;for(let u=0;u<l.length;u+=d)yield{type:"chunk",data:{text:l.substring(u,u+d),threadId:o}},u+d<l.length&&await new Promise(p=>setTimeout(p,10));yield{type:"done",data:{threadId:o,provider:s.name,tokenCount:0}}}async function*Tl(e,t,n,s,r,a){var u;const i=new Q(t),o=(u=e.metadata)==null?void 0:u.thread_id,c=await i.buildContext(s.id),l=await i.getRecentConversations(s.id,6,o),d=is(e.text,c,Ea(l));if(yield{type:"thinking",data:{threadId:o,provider:n.name}},d.agent!=="conversation"){const p=cs(e.text);if(p){yield*Fs(p,e,t,n,s,i,a,o);return}const h=(await i.getRecentConversations(s.id,10,o)).map(f=>f.content).join(`
`),v=ls(e.text,h);if(v){yield*Fs(v,e,t,n,s,i,a,o);return}yield*El(e,t,n,s,r,a);return}try{const p=await Ca(e,t,n,s,c,r,o),h=50;for(let v=0;v<p.length;v+=h)yield{type:"chunk",data:{text:p.substring(v,v+h),threadId:o}},v+h<p.length&&await new Promise(f=>setTimeout(f,10))}catch(p){yield{type:"error",data:{error:p.message||"An error occurred",threadId:o}};return}yield{type:"done",data:{threadId:o,provider:n.name,tokenCount:0}}}const It=new Map;function Sl(){try{if(typeof crypto<"u"&&crypto.randomUUID)return crypto.randomUUID()}catch{}return"run_"+Date.now().toString(36)+Math.random().toString(36).slice(2,10)}async function kl(e,t,n){const s=Sl();try{return await e.prepare(`INSERT INTO chat_runs (run_id, user_id, thread_id, status, events_json)
         VALUES (?, ?, ?, 'running', '[]')`).bind(s,t,n).run(),s}catch(r){return vt("run-store: createRun failed, falling back to direct stream",{error:(r==null?void 0:r.message)||String(r)}),null}}async function Oa(e,t){let n=null;try{n=await e.prepare("SELECT * FROM chat_runs WHERE run_id = ?").bind(t).first()}catch{return null}if(!n)return null;let s=[];try{s=JSON.parse(n.events_json||"[]")}catch{s=[]}return{runId:n.run_id,userId:n.user_id,threadId:n.thread_id,status:n.status,events:s,error:n.error}}async function xl(e,t,n){let s=null;try{s=await e.prepare("SELECT * FROM chat_runs WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT 1").bind(t,n).first()}catch{return null}if(!s)return null;let r=[];try{r=JSON.parse(s.events_json||"[]")}catch{r=[]}return{runId:s.run_id,userId:s.user_id,threadId:s.thread_id,status:s.status,events:r,error:s.error}}async function Ws(e,t,n){try{const r=await e.prepare("SELECT events_json FROM chat_runs WHERE run_id = ?").bind(t).first();let a=[];try{a=JSON.parse((r==null?void 0:r.events_json)||"[]")}catch{a=[]}a.push(n),await e.prepare("UPDATE chat_runs SET events_json = ?, updated_at = CURRENT_TIMESTAMP WHERE run_id = ?").bind(JSON.stringify(a),t).run()}catch{}const s=It.get(t);if(s){s.events.push(n);for(const r of s.subscribers)try{r.push(n)}catch{}}}async function qs(e,t,n,s=null){try{await e.prepare("UPDATE chat_runs SET status = ?, error = ?, updated_at = CURRENT_TIMESTAMP WHERE run_id = ?").bind(n,s,t).run()}catch{}const r=It.get(t);if(r){r.status=n,r.error=s;for(const a of r.subscribers)try{a.close()}catch{}setTimeout(()=>{It.get(t)===r&&It.delete(t)},6e4)}}async function Dl(e,t,n){try{const s=await e.prepare("SELECT user_id FROM chat_runs WHERE run_id = ?").bind(t).first();return!!s&&s.user_id===n}catch{return!1}}function Rl(e,t,n,s={}){It.set(t,{events:[],subscribers:[],status:null,error:null});const r=(async()=>{try{for await(const a of n)await Ws(e,t,a);await qs(e,t,"completed"),s.threadId&&await e.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s.threadId).run()}catch(a){const i=(a==null?void 0:a.message)||String(a);try{await Ws(e,t,{type:"error",data:{error:i}})}catch{}await qs(e,t,"failed",i),vt("chat run failed",{runId:t,error:i})}})();s.waitUntil&&s.waitUntil(r.catch(()=>{}))}function Aa(e,t=0){const n=Math.max(0,Math.min(t,e.events.length)),s=e.events.slice(n),r=It.get(e.runId);if(!r||r.status!==null)return{replay:s,tail:Nl(),status:e.status};const a=Il(r,e.events.length);return{replay:s,tail:a,status:"running"}}function Nl(){return{[Symbol.asyncIterator](){return{next:async()=>({done:!0,value:void 0})}}}}function Il(e,t){return{[Symbol.asyncIterator](){let n=t,s=0,r=null;const a=()=>n<e.events.length?e.events[n++]:null,i={push(o){if(s++,r){const c=r;r=null;const l=a();l?(s=Math.max(0,s-1),c({done:!1,value:l})):r=c}},close(){if(r){const o=r;r=null,o({done:!0,value:void 0})}}};return e.subscribers.push(i),{next(){const o=a();if(o)return s=Math.max(0,s-1),Promise.resolve({done:!1,value:o});if(s>0){s--;const c=a();if(c)return Promise.resolve({done:!1,value:c})}return e.status!==null?Promise.resolve({done:!0,value:void 0}):new Promise(c=>{r=c})},return(){const o=e.subscribers.indexOf(i);return o>=0&&e.subscribers.splice(o,1),Promise.resolve({done:!0,value:void 0})}}}}}const le=new xe;async function Cl(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}le.use("/*",Cl);le.get("/threads",async e=>{const t=e.get("user"),n=e.req.query("archived")==="1",s=parseInt(e.req.query("limit")||"30"),r=await e.env.DB.prepare(`SELECT
      t.id, t.user_id, t.title, t.summary, t.is_archived, t.is_pinned, t.channel,
      t.created_at, t.updated_at,
      (SELECT COUNT(*) FROM conversations WHERE thread_id = t.id) as message_count,
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
      ORDER BY t.is_pinned DESC, t.updated_at DESC
      LIMIT ?`).bind(t.id,n?1:0,s).all();return e.json({threads:r.results||[]})});le.post("/threads",async e=>{const t=e.get("user"),{title:n}=await e.req.json(),s=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n||"New conversation").first();return e.json({thread:s})});le.put("/threads/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json(),r=[],a=[];return s.title!==void 0&&(r.push("title = ?"),a.push(s.title)),s.is_archived!==void 0&&(r.push("is_archived = ?"),a.push(s.is_archived?1:0)),s.is_pinned!==void 0&&(r.push("is_pinned = ?"),a.push(s.is_pinned?1:0)),r.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),r.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});le.delete("/threads/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});le.post("/upload",async e=>{const t=e.get("user"),n=!!e.env.DOCUMENTS_BUCKET,s=n?100*1024*1024:700*1024;let r,a,i,o=null,c=null;try{if((e.req.header("Content-Type")||"").includes("multipart/form-data")){const g=(await e.req.formData()).get("file");if(!g)return e.json({error:"No file provided."},400);if(r=g.name,a=g.type||"application/octet-stream",i=g.size,i>s)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);o=await g.arrayBuffer()}else{const f=await e.req.json();if(!f.file_name||!f.file_data)return e.json({error:"file_name and file_data are required."},400);if(r=f.file_name,a=f.file_type||"application/octet-stream",c=f.file_data,i=f.file_size||Math.round(c.length*.75),i>s)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);if(n){const g=atob(c);o=new ArrayBuffer(g.length);const w=new Uint8Array(o);for(let T=0;T<g.length;T++)w[T]=g.charCodeAt(T)}}const d=crypto.randomUUID();let u;n&&o?(await e.env.DOCUMENTS_BUCKET.put(d,o,{httpMetadata:{contentType:a},customMetadata:{fileName:r,userId:String(t.id)}}),u="r2"):u=c||(o?Buffer.from(o).toString("base64"):""),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(d,t.id,r,a,u,i).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,d,"upload",r,a,i,"uploaded").run();const p=a==="application/pdf"||r.toLowerCase().endsWith(".pdf"),h=a==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||r.toLowerCase().endsWith(".docx");if(h)try{const{extractDocxTextFromBuffer:f}=await Promise.resolve().then(()=>ca),g=c?Buffer.from(c,"base64"):o?Buffer.from(o):null;if(g){const w=await f(g);if(w.length>50){await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(w,d).run();const T=w.substring(0,600);await e.env.DB.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(T,w.substring(0,5e4),d,t.id).run()}}}catch{}if(p&&t.pin_hash){const f=c||(o?Buffer.from(o).toString("base64"):null),g=t.pin_hash,w=t.id,T=e.env.DB,x=e.env.DOCUMENTS_BUCKET,A=(async()=>{var N,$;try{let M=null,z="claude-sonnet-4-6";const{decrypt:W}=await Promise.resolve().then(()=>sn);for(const Z of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const te=await T.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(w,Z).first();if(te){const ce=await W(te.encrypted_value,g),re=JSON.parse(ce);if(re.provider==="anthropic"){M=re.apiKey,re.model&&(z=re.model);break}}}catch{}if(!M)return;let ne;if(u==="r2"&&x){const Z=await x.get(d);if(!Z)return;ne=Buffer.from(await Z.arrayBuffer()).toString("base64")}else if(f)ne=f;else return;const j=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":M,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:z,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:ne}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!j.ok)return;const q=(($=(N=(await j.json()).content)==null?void 0:N[0])==null?void 0:$.text)||"";if(q){await T.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(q,d).run();const Z=q.substring(0,600);await T.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(Z,q.substring(0,5e4),d,w).run()}}catch{}})();try{e.executionCtx.waitUntil(A)}catch{}}let v="";if(a.startsWith("text/"))try{const f=c||(o?Buffer.from(o).toString("base64"):"");v=Buffer.from(f,"base64").toString("utf-8").substring(0,500)}catch{}return e.json({file_id:d,name:r,type:a,size:i,text_preview:v,storage:n?"r2":"d1",extracting:p&&!h})}catch(l){console.error("File upload error:",l);try{const{logError:d}=await Promise.resolve().then(()=>Nt);await d(e.env.DB,t.id,"upload","upload_error",l.message||"Unknown upload error")}catch{}return e.json({error:`Upload failed: ${l.message||"Unknown error"}`},500)}});le.post("/send",async e=>{const t=e.get("user"),{message:n,channel:s="web",thread_id:r,files:a}=await e.req.json();if(!n||typeof n!="string"||n.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(a&&Array.isArray(a)&&a.length>0){i=`

[Attached files:
`;for(const l of a)i+=`- ${l.name} (${l.type}, ${Math.round(l.size/1024)}KB, file_id: ${l.file_id})`,l.text_preview&&(i+=`
  Preview: ${l.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=r;if(!o){const l=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n.trim().substring(0,60)+(n.trim().length>60?"...":"")).first();o=l==null?void 0:l.id}const c={userId:t.id,username:t.username,channel:s,text:n.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:l,rotation:d}=await it(e.env.DB,t.id,t.pin_hash),u=await _s(c,e.env.DB,l,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});return!r&&o?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run():o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),e.json({response:u,timestamp:new Date().toISOString(),channel:c.channel,provider:l.name,thread_id:o})}catch(l){console.error("Chat error:",l);const d=l.message||"";if(d.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400);if(d.includes("All LLM providers failed"))return e.json({error:d,type:"no_provider",thread_id:o},400);if(d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests"))return e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429);const u=d.includes("401")||d.includes("403")||d.includes("authentication")||d.includes("credit balance")||d.includes("invalid")&&d.includes("key");try{const{logError:p}=await Promise.resolve().then(()=>Nt);await p(e.env.DB,t.id,"llm","chat_error",d)}catch{}return e.json({error:u?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:d,type:u?"no_provider":void 0,thread_id:o},u?400:500)}});function ut(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}le.post("/stream",async e=>{const t=e.get("user"),{message:n,channel:s="web",thread_id:r,files:a}=await e.req.json();if(!n||typeof n!="string"||n.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(a&&Array.isArray(a)&&a.length>0){i=`

[Attached files:
`;for(const l of a)i+=`- ${l.name} (${l.type}, ${Math.round(l.size/1024)}KB, file_id: ${l.file_id})`,l.text_preview&&(i+=`
  Preview: ${l.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=r;if(!o){const l=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n.trim().substring(0,60)+(n.trim().length>60?"...":"")).first();o=l==null?void 0:l.id}const c={userId:t.id,username:t.username,channel:s,text:n.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:l,rotation:d}=await it(e.env.DB,t.id,t.pin_hash),u=Tl(c,e.env.DB,l,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET}),p=(async function*(){for await(const g of u)g.data.threadId||(g.data.threadId=o),yield g})(),h=await kl(e.env.DB,t.id,o),v=g=>{try{e.executionCtx.waitUntil(g)}catch{}};if(h){Rl(e.env.DB,h,p,{waitUntil:v,threadId:o});const g=new ReadableStream({async start(w){const T=new TextEncoder,x=await Oa(e.env.DB,h);if(!x){w.enqueue(T.encode(ut({type:"error",data:{error:"Run not found"}}))),w.close();return}const{replay:A,tail:N,status:$}=Aa(x);for(const M of A)w.enqueue(T.encode(ut(M)));if($!=="running"){w.close();return}try{for await(const M of N)w.enqueue(T.encode(ut(M)))}catch{}w.close()}});return new Response(g,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(o||""),"X-Run-Id":String(h)}})}const f=new ReadableStream({async start(g){const w=new TextEncoder;try{for await(const T of p)g.enqueue(w.encode(ut(T)));o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),g.close()}catch(T){g.enqueue(w.encode(ut({type:"error",data:{error:T.message||"An error occurred",threadId:o}}))),g.close()}}});return new Response(f,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(o||"")}})}catch(l){console.error("Stream setup error:",l);const d=l.message||"";return d.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400):d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests")?e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429):e.json({error:"Something went wrong setting up the stream.",details:d,thread_id:o},500)}});le.get("/runs/:id/resume",async e=>{const t=e.get("user"),n=e.req.param("id");if(!n)return e.json({error:"Run id required"},400);if(!await Dl(e.env.DB,n,t.id))return e.json({error:"Run not found"},404);const r=await Oa(e.env.DB,n);if(!r)return e.json({error:"Run not found"},404);const a=parseInt(e.req.query("from")||"0",10),i=Number.isFinite(a)&&a>=0?a:0,{replay:o,tail:c,status:l}=Aa(r,i),d=new ReadableStream({async start(u){const p=new TextEncoder;for(const h of o)u.enqueue(p.encode(ut(h)));if(l!=="running"){u.close();return}try{for await(const h of c)u.enqueue(p.encode(ut(h)))}catch{}u.close()}});return new Response(d,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(r.threadId||""),"X-Run-Id":String(n)}})});le.get("/threads/:id/active-run",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(!Number.isFinite(n))return e.json({error:"Invalid thread id"},400);const s=await xl(e.env.DB,t.id,n);return s?e.json({run:{runId:s.runId,status:s.status,threadId:s.threadId}}):e.json({run:null})});le.get("/threads/:id/messages",async e=>{var a;const t=e.get("user"),n=parseInt(e.req.param("id")),s=parseInt(e.req.query("limit")||"50"),r=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,n,s).all();return e.json({messages:(r.results||[]).reverse(),total:((a=r.results)==null?void 0:a.length)||0})});le.get("/history",async e=>{var c;const t=e.get("user"),n=parseInt(e.req.query("limit")||"50"),s=parseInt(e.req.query("offset")||"0"),r=e.req.query("thread_id");let a,i;r?(a=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,parseInt(r),n,s]):(a=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,n,s]);const o=await e.env.DB.prepare(a).bind(...i).all();return e.json({messages:(o.results||[]).reverse(),total:((c=o.results)==null?void 0:c.length)||0})});le.delete("/history",async e=>{const t=e.get("user"),n=e.req.query("thread_id");return n?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(n)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});le.get("/dashboard",async e=>{const t=e.get("user"),[n,s,r,a,i,o,c,l,d,u,p,h,v,f,g]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM user_skills WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM preferences WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval')").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND type='browser_task' AND status='running'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status='failed'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory_suggestions WHERE user_id = ? AND status='pending'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM document_library WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT id, name, mime_type, size, status, source, created_at FROM document_library WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT id, name, description, next_run FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND next_run BETWEEN datetime('now', 'start of day') AND datetime('now', '+1 day', 'start of day') LIMIT 5").bind(t.id).all().catch(()=>({results:[]}))]);return e.json({threads:(n==null?void 0:n.cnt)||0,active_schedules:(s==null?void 0:s.cnt)||0,memories:(r==null?void 0:r.cnt)||0,recent_threads:a.results||[],provider_usage:[],unread_notifications:(i==null?void 0:i.cnt)||0,errors:(o==null?void 0:o.cnt)||0,skills_count:(c==null?void 0:c.cnt)||0,preferences_count:(l==null?void 0:l.cnt)||0,pending_actions:(d==null?void 0:d.cnt)||0,running_browser_tasks:(u==null?void 0:u.cnt)||0,failed_actions:(p==null?void 0:p.cnt)||0,memory_suggestions:(h==null?void 0:h.cnt)||0,documents_count:(v==null?void 0:v.cnt)||0,recent_documents:f.results||[],todays_reminders:g.results||[]})});le.get("/gmail/unread",async e=>{const t=e.get("user");try{const n=e.env.GOOGLE_CLIENT_ID,s=e.env.GOOGLE_CLIENT_SECRET;if(!n||!s)return e.json({count:null,reason:"google_not_configured"});const a=await new Ie(e.env.DB,t.id,t.pin_hash,n,s).getUnreadCount();return e.json({count:a})}catch(n){return e.json({count:null,reason:n.message})}});le.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));le.get("/notifications/count",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(n==null?void 0:n.cnt)||0})});le.get("/notifications",async e=>{const t=e.get("user"),n=parseInt(e.req.query("limit")||"20"),s=await e.env.DB.prepare(`SELECT n.id, n.type, n.title, n.body, n.is_read, n.source, n.action_url, n.created_at,
            j.schedule_type, j.schedule_value, j.enabled as cron_enabled
     FROM notifications n
     LEFT JOIN cron_jobs j
       ON n.user_id = j.user_id
       AND n.source LIKE 'cron:%'
       AND CAST(SUBSTR(n.source, 6) AS INTEGER) = j.id
     WHERE n.user_id = ? ORDER BY n.created_at DESC LIMIT ?`).bind(t.id,n).all();return e.json({notifications:s.results||[]})});le.put("/notifications/:id/read",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});le.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});le.delete("/notifications/all",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});le.delete("/notifications/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});le.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const se=new xe;async function Ol(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),await t()}se.use("/*",Ol);se.get("/profile",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(n==null?void 0:n.name)||t.name,personality_prompt:(n==null?void 0:n.personality_prompt)||t.personality_prompt,telegram_chat_id:(n==null?void 0:n.telegram_chat_id)||t.telegram_chat_id,timezone:(n==null?void 0:n.timezone)||t.timezone,assistant_name:(n==null?void 0:n.assistant_name)||"Karna"})});se.put("/profile",async e=>{const t=e.get("user"),n=await e.req.json(),s=["name","personality_prompt","telegram_chat_id","timezone","assistant_name"],r=[],a=[];for(const i of s)n[i]!==void 0&&(r.push(`${i} = ?`),a.push(n[i]));return r.length===0?e.json({error:"No valid fields to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),a.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${r.join(", ")} WHERE id = ?`).bind(...a).run(),e.json({success:!0}))});const Jn=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","tavily_api_key","ntfy_url","ntfy_token","browser_use_api_key","unified-doc-management"];se.get("/credentials",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT id, service, label, encrypted_value, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all(),s=["llm_slot_1","llm_slot_2","llm_slot_3"],r=await Promise.all((n.results||[]).map(async a=>{let i;if(s.includes(a.service))try{const o=await G(a.encrypted_value,t.pin_hash);i=JSON.parse(o).provider}catch{}return{id:a.id,service:a.service,label:a.label,created_at:a.created_at,updated_at:a.updated_at,configured:!0,...i?{provider_id:i}:{}}}));return e.json({credentials:r,available_services:Jn,llm_providers:Kt})});function La(e){const t=e.trim();return t&&!/^https?:\/\//i.test(t)?"https://"+t:t}se.put("/credentials",async e=>{const t=e.get("user"),n=await e.req.json(),{service:s,label:r}=n;let a=n.value;if(!s||!a)return e.json({error:"Service name and value are required"},400);if(!Jn.includes(s))return e.json({error:`Invalid service. Must be one of: ${Jn.join(", ")}`},400);s==="ntfy_url"&&(a=La(a));const i=await jt(a,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,s,r||s,i).run(),e.json({success:!0,service:s})});se.delete("/credentials/:service",async e=>{const t=e.get("user"),n=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,n).run(),e.json({success:!0})});se.get("/memory",async e=>{const t=e.get("user"),n=e.req.query("type"),r=await new Q(e.env.DB).getAll(t.id,n||void 0,100);return e.json({memories:r})});se.post("/memory",async e=>{const t=e.get("user"),{type:n,title:s,content:r,importance:a}=await e.req.json();return!n||!s||!r?e.json({error:"Type, title, and content are required"},400):(await new Q(e.env.DB).store(t.id,n,s,r,a||5),e.json({success:!0}))});se.delete("/memory/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new Q(e.env.DB).remove(n,t.id),e.json({success:!0})});se.get("/preferences",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT id, content, created_at FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t.id).all();return e.json({preferences:n.results||[]})});se.post("/preferences",async e=>{const t=e.get("user"),{content:n}=await e.req.json();return n!=null&&n.trim()?(await e.env.DB.prepare("INSERT INTO preferences (user_id, content) VALUES (?, ?)").bind(t.id,n.trim()).run(),e.json({success:!0})):e.json({error:"Content required"},400)});se.put("/preferences/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{content:s}=await e.req.json();return s!=null&&s.trim()?(await e.env.DB.prepare("UPDATE preferences SET content = ? WHERE id = ? AND user_id = ?").bind(s.trim(),n,t.id).run(),e.json({success:!0})):e.json({error:"Content required"},400)});se.delete("/preferences/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM preferences WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});se.get("/schedules",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:n.results||[]})});se.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{enabled:s}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s?1:0,n,t.id).run(),e.json({success:!0})});se.delete("/schedules/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});se.get("/errors",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:n.results||[]})});se.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});se.post("/credentials/validate",async e=>{const t=e.get("user"),{service:n,value:s}=await e.req.json();if(!n)return e.json({error:"Service required"},400);let r=s;if(!r){const a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,n).first();if(!a)return e.json({valid:!1,message:"No credential saved for this slot."});try{r=await G(a.encrypted_value,t.pin_hash)}catch{return e.json({valid:!1,message:"Failed to decrypt stored credential."})}}switch(n){case"anthropic":try{const a=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return a.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"openai":try{const a=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${r}`}});return a.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const a=JSON.parse(r);if(!a.provider||!a.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const i=Kt[a.provider];if(!i)return e.json({valid:!1,message:`Unknown provider: ${a.provider}`});if(i.apiFormat==="anthropic"){const o=await fetch(i.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return o.ok?e.json({valid:!0,message:`${i.label} API key is valid.`}):o.status===401?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${o.status}.`})}else{const o=i.apiBase+(i.validatePath||"/v1/models"),c=await fetch(o,{headers:{Authorization:`Bearer ${a.apiKey}`}});if(c.ok)return e.json({valid:!0,message:`${i.label} API key is valid.`});if(c.status===401||c.status===403)return e.json({valid:!1,message:`Invalid ${i.label} API key.`});if(c.status===404)try{const l=await fetch(i.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.apiKey}`},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return l.ok||l.status===200?e.json({valid:!0,message:`${i.label} API key is valid.`}):l.status===401||l.status===403?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${l.status}.`})}catch(l){return e.json({valid:!1,message:`${i.label} chat test failed: ${l.message}`})}return e.json({valid:!1,message:`${i.label} responded with status ${c.status}.`})}}catch(a){return a instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});case"tavily_api_key":try{const a=await fetch("https://api.tavily.com/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:r,query:"test",max_results:1,search_depth:"basic"})});if(a.ok){const i=await a.json();if(Array.isArray(i.results))return e.json({valid:!0,message:"Tavily API key is valid."})}return a.status===401?e.json({valid:!1,message:"Invalid Tavily API key."}):e.json({valid:!1,message:`Tavily responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"ntfy_url":try{const a=La(r);let i;try{const l=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,"ntfy_token").first();l&&(i=(await G(l.encrypted_value,t.pin_hash)).trim())}catch{}const o={Title:"Test",Priority:"3",Tags:"bell,karna","Content-Type":"text/plain"};i&&(o.Authorization=`Bearer ${i}`);const c=await fetch(a,{method:"POST",headers:o,body:"Karna connected ✓"});return c.ok?e.json({valid:!0,message:"Ntfy connected"}):e.json({valid:!1,message:`Ntfy responded with status ${c.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});se.post("/notify/test",async e=>{const t=e.get("user"),{sendNotification:n}=await Promise.resolve().then(()=>Ma),s=await n(e.env.DB,t.id,"🔔 Karna Test Notification","If you see this on your phone, Ntfy is working correctly.",{pinHash:t.pin_hash,priority:"default",tags:["bell","karna"]});return e.json({channel:s.channel,error:s.error})});se.get("/google/status",async e=>{const t=e.get("user");try{const n=await ns(e.env.DB,t.id,t.pin_hash),s=Hr(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...n,oauth_client_configured:s})}catch(n){return e.json({connected:!1,error:n.message})}});se.get("/google/auth-url",async e=>{var t;e.get("user");try{const n=e.env.GOOGLE_CLIENT_ID,s=e.env.GOOGLE_CLIENT_SECRET;if(!n||!s)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const r=new URL(e.req.url);let a=`${r.protocol}//${r.host}`;const i=e.req.query("origin");if(i)try{const d=new URL(i);(d.protocol==="https:"||d.hostname==="localhost"||d.hostname==="127.0.0.1")&&(a=d.origin)}catch{}const o=`${a}/auth/google/callback`,c=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),l=jr(n,o,c);return e.json({auth_url:l,redirect_uri:o})}catch(n){return e.json({error:`Failed to generate auth URL: ${n.message}`},500)}});se.post("/google/disconnect",async e=>{const t=e.get("user");try{return await Wr(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(n){return e.json({error:n.message},500)}});se.post("/google/test",async e=>{const t=e.get("user");try{const{token:n,email:s}=await Bt(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),r=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${n}`}}),a=!0,i=r.ok,o=await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile",{headers:{Authorization:`Bearer ${n}`}}),c=o.ok;return e.json({success:!0,email:s,scopes:{sheets:a,calendar:i,docs:a,drive:a,gmail:c},message:i&&c?`Connected as ${s} — all services working.`:`Connected as ${s} — ${c?`calendar access issue (${r.status}).`:`Gmail access issue (${o.status}). Reconnect to grant Gmail permissions.`}`})}catch(n){return e.json({success:!1,error:n.message})}});se.get("/site-vault",async e=>{const t=e.get("user");try{const n=await e.env.DB.prepare("SELECT id, name, created_at, updated_at FROM site_credentials WHERE user_id = ? ORDER BY name ASC").bind(t.id).all();return e.json({entries:n.results||[]})}catch{return e.json({entries:[]})}});se.put("/site-vault",async e=>{const t=e.get("user");try{const{name:n,username:s,password:r,notes:a}=await e.req.json();if(!(n!=null&&n.trim())||!(s!=null&&s.trim())||!(r!=null&&r.trim()))return e.json({error:"name, username, and password are required"},400);const i=JSON.stringify({username:s.trim(),password:r,...a?{notes:a}:{}}),o=await jt(i,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO site_credentials (user_id, name, encrypted_blob)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, name) DO UPDATE SET
         encrypted_blob = excluded.encrypted_blob,
         updated_at = CURRENT_TIMESTAMP`).bind(t.id,n.trim(),o).run(),e.json({success:!0,name:n.trim()})}catch(n){return e.json({error:(n==null?void 0:n.message)||"Failed to save credential"},500)}});se.delete("/site-vault/:id",async e=>{const t=e.get("user");try{const n=Number(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM site_credentials WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})}catch(n){return e.json({error:(n==null?void 0:n.message)||"Failed to delete credential"},500)}});const Al=15e3,Ll={urgent:"5",high:"4",default:"3",low:"2",min:"1"};async function Ve(e,t,n,s,r){try{await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source)
       VALUES (?, 'info', ?, ?, 'ntfy')`).bind(t,n,s).run()}catch(v){console.warn("[sendNotification] in-app insert failed:",t,v==null?void 0:v.message)}let a=r==null?void 0:r.pinHash;if(!a){const v=await e.prepare("SELECT pin_hash FROM users WHERE id = ?").bind(t).first();a=v==null?void 0:v.pin_hash}if(!a)return{sent:!0,channel:"in-app"};let i,o;try{const v=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"ntfy_url").first();if(v){const g=(await G(v.encrypted_value,a)).trim();i=/^https?:\/\//i.test(g)?g:`https://${g}`}const f=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"ntfy_token").first();f&&(o=(await G(f.encrypted_value,a)).trim())}catch(v){return console.warn("[sendNotification] credential decrypt failed:",t,v==null?void 0:v.message),{sent:!0,channel:"in-app"}}if(!i)return{sent:!0,channel:"in-app"};const c=Ll[(r==null?void 0:r.priority)||"default"]||"3",l=((r==null?void 0:r.tags)||["bell","karna"]).join(","),u={Title:n.replace(/[^\x00-\xff]/g,"").trim()||"Karna Notification",Priority:c,Tags:l,"Content-Type":"text/plain"};o&&(u.Authorization=`Bearer ${o}`);const p=new AbortController,h=setTimeout(()=>p.abort(),Al);try{const v=await fetch(i,{method:"POST",headers:u,body:s,signal:p.signal});if(clearTimeout(h),!v.ok){const f=`HTTP ${v.status} from ${i}`;return console.warn(`[sendNotification] ntfy ${f} for user ${t} — check ntfy_url/ntfy_token credentials`),{sent:!0,channel:"ntfy-failed",error:f}}return{sent:!0,channel:"ntfy"}}catch(v){clearTimeout(h);const f=(v==null?void 0:v.message)||String(v);return console.warn(`[sendNotification] ntfy push failed for user ${t}: ${f}`),{sent:!0,channel:"ntfy-failed",error:f}}}const Ma=Object.freeze(Object.defineProperty({__proto__:null,sendNotification:Ve},Symbol.toStringTag,{value:"Module"})),Ce=new xe;Ce.get("/debug/time",e=>{const t=new Date,n=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return e.json({utc_iso:t.toISOString(),utc_ms:t.getTime(),formatted_ist:n.format(t),toLocaleString_ist:t.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});Ce.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const n=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:n,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});Ce.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const n=Date.now()-t;return e.json({status:"ok",latency_ms:n})}catch(t){return e.json({status:"error",error:t.message},500)}});Ce.get("/status",async e=>{var c;const t=(c=e.req.header("Authorization"))==null?void 0:c.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=n.user_id,[r,a,i,o]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(s).first()]);return e.json({active_schedules:(r==null?void 0:r.cnt)||0,memory_entries:(a==null?void 0:a.cnt)||0,total_messages:(i==null?void 0:i.cnt)||0,unread_errors:(o==null?void 0:o.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});function Gs(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}Ce.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const s=new Date,r=s.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:r})).run()}catch{}const a=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone, u.pin_hash
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(r).all(),i=[];for(const o of a.results||[])try{await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(r,o.id).run();const c=o.user_timezone||"UTC";let l,d=!1,u=o.state||"active";if(o.schedule_type==="interval"){const v=parseInt(o.schedule_value,10);l=new Date(s.getTime()+v*60*1e3)}else if(o.schedule_type==="daily"){const[v,f]=o.schedule_value.split(":").map(Number),g=Gs(c),w=new Date(g);w.setHours(v,f,0,0),w<=g&&w.setDate(w.getDate()+1);const T=new Date(w.toLocaleString("en-US",{timeZone:"UTC"})),x=new Date(w.toLocaleString("en-US",{timeZone:c})),A=T.getTime()-x.getTime();l=new Date(w.getTime()+A)}else if(o.schedule_type==="weekly"){const[v,f]=o.schedule_value.split(" "),[g,w]=(f||"00:00").split(":").map(Number),x=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(ne=>ne.toLowerCase()===v.toLowerCase()),A=Gs(c),N=new Date(A);N.setHours(g,w,0,0);let $=(x-N.getDay()+7)%7;$===0&&N<=A&&($=7),N.setDate(N.getDate()+$);const M=new Date(N.toLocaleString("en-US",{timeZone:"UTC"})),z=new Date(N.toLocaleString("en-US",{timeZone:c})),W=M.getTime()-z.getTime();l=new Date(N.getTime()+W)}else o.schedule_type==="once"?(d=!0,u="completed",l=new Date(s.getTime()+365*24*60*60*1e3)):l=new Date(s.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r,l.toISOString(),d?0:o.enabled,u,o.id).run();const h=(JSON.parse(o.action_config||"{}").description||o.description)&&(o.action_type==="check_mail"||o.action_type==="check_calendar"||o.action_type==="check_sheet"||o.action_type==="custom");if(o.action_type==="reminder")try{const f=JSON.parse(o.action_config||"{}").description||o.description||o.name||"Time for your scheduled task.",g="⏰ "+(o.name||"Scheduled Task");await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, 'system', 'assistant', ?, ?)").bind(o.user_id,g+`
`+f,JSON.stringify({type:"cron",job_id:o.id})).run();const{channel:w}=await Ve(e.env.DB,o.user_id,g,f,{pinHash:o.pin_hash||void 0,priority:"default",tags:["reminder","karna"]});w==="ntfy-failed"?console.warn(`[cron/execute] job ${o.id}: Ntfy push failed — in-app delivered. Check ntfy_url/ntfy_token in Settings.`):console.info(`[cron/execute] job ${o.id}: reminder delivered via ${w}`)}catch(v){console.warn("[cron/execute] reminder notification failed for job",o.id,":",v==null?void 0:v.message)}i.push({job_id:o.id,name:o.name,status:"dispatched",needs_agent:h,next_run:l.toISOString()})}catch(c){i.push({job_id:o.id,name:o.name,status:"error",error:c.message})}try{const{MemoryService:o}=await Promise.resolve().then(()=>$r),c=await e.env.DB.prepare("SELECT id FROM users").all();for(const l of c.results||[])await new o(e.env.DB).cleanupDoneTasks(l.id)}catch{}return e.json({executed:i.length,results:i,timestamp:r})});Ce.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const s=parseInt(e.req.param("jobId"),10);if(!s)return e.json({error:"Invalid job ID"},400);const r=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(s).first();if(!r)return e.json({error:"Job not found"},404);if(r.action_type==="reminder")return e.json({job_id:s,status:"completed",note:"reminder handled by phase1"});const i=JSON.parse(r.action_config||"{}").description||r.description||"",o="⏰ "+(r.name||"Scheduled Task"),c=new Date().toISOString();let l="";const d=r.action_type==="reminder",u=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!d&&r.action_type==="custom"&&u.test(i),d)l=i||r.name||"Time for your scheduled task.";else try{const f={id:r.user_id,username:r.username||"user",name:r.user_name||"User",pin_hash:r.pin_hash||"",personality_prompt:r.personality_prompt||"",telegram_chat_id:r.telegram_chat_id||"",timezone:r.user_timezone||"UTC",assistant_name:r.assistant_name||"Karna",created_at:"",updated_at:""},g={userId:r.user_id,username:f.username,channel:"cron",text:Ml(r.name,i,r.action_type,r.schedule_type),sessionId:"cron-"+r.id,timestamp:c},{provider:w,rotation:T}=await it(e.env.DB,r.user_id,r.pin_hash);l=await _s(g,e.env.DB,w,f,T,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(f){const g=f.message||"unknown error",w=g.includes("rate_limit")||g.includes("429")||g.includes("quota"),T=g.includes("timeout")||g.includes("Timeout");w?l="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":T?l="Task timed out. Will retry at next scheduled time.":l="Task encountered an error. Will retry at next scheduled time.",await U(e.env.DB,r.user_id,"cron_agent","execution_error",g,{job_id:r.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(r.action_type))try{const f=await e.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(r.user_id).first();(!f||f.cnt===0)&&await U(e.env.DB,r.user_id,"cron_verification","no_tools_called",`Cron job "${r.name}" (${r.action_type}) completed without any tool calls`,{job_id:r.id,action_type:r.action_type,response_preview:l.substring(0,200)})}catch{}let h=l||i||"Time for your scheduled task.";h=h.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const v=o+`
`+h;if(d&&await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(r.user_id,"system","assistant",v,JSON.stringify({type:"cron",job_id:r.id})).run(),r.pin_hash){const{channel:f}=await Ve(e.env.DB,r.user_id,o,h,{pinHash:r.pin_hash,priority:"default",tags:["reminder","karna"]});f==="ntfy-failed"?console.warn(`[run-task] job ${r.id}: Ntfy push failed — in-app notification still delivered. Check ntfy_url/ntfy_token in Settings.`):f==="in-app"&&console.warn(`[run-task] job ${r.id}: Ntfy not configured — delivered in-app only.`)}else await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, 'reminder', ?, ?, ?, 0)").bind(r.user_id,o,h,"cron:"+r.id).run();return e.json({job_id:s,status:"completed",response_length:l.length})});async function $a(e){var s;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return null;const n=await e.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(t).first();return(n==null?void 0:n.user_id)||null}Ce.get("/health/tools",async e=>{var n;const t=await $a(e);if(!t)return e.json({error:"Not authenticated"},401);try{const s=await e.env.DB.prepare(`SELECT tool_name,
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
       GROUP BY agent_type, provider_name`).bind(t).all(),a=await e.env.DB.prepare(`SELECT COUNT(*) as total_retries,
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
       ORDER BY created_at DESC LIMIT 10`).bind(t).all(),c=await e.env.DB.prepare(`SELECT provider_name, agent_type,
              COUNT(*) as calls,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM llm_calls
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       GROUP BY provider_name, agent_type
       ORDER BY calls DESC`).bind(t).all();return e.json({period:"last_24h",tool_stats:s.results,enforcement:{triggers:r.results,retry_results:((n=a.results)==null?void 0:n[0])||{total_retries:0,successful_retries:0}},cron:{executions:i.results,warnings:o.results},providers:c.results})}catch(s){return e.json({error:s.message||"Failed to fetch metrics"},500)}});Ce.get("/health/tools/recent",async e=>{const t=await $a(e);if(!t)return e.json({error:"Not authenticated"},401);try{const n=await e.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
              success, error_message, latency_ms, was_enforcement_retry, channel, created_at
       FROM tool_execution_log
       WHERE user_id = ?
       ORDER BY id DESC LIMIT 50`).bind(t).all();return e.json({logs:n.results})}catch(n){return e.json({error:n.message},500)}});const Wt=`

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
- Example: "Couldn't retrieve Amazon order status — requires login."`;function Ml(e,t,n,s){return n==="reminder"?`[Scheduled Reminder] "${e}": ${t||"Time for your reminder."}`:n==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check Gmail for new/important emails."}
You MUST call gmail_list or gmail_search immediately.${Wt}`:n==="check_calendar"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check calendar for upcoming events."}
You MUST call list_calendar_events immediately.${Wt}`:n==="check_sheet"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
You MUST call read_sheet immediately with the relevant spreadsheet.${Wt}`:n==="custom"&&t?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${s==="interval"||s==="daily"||s==="weekly"?`
CRITICAL SAFETY RULE: This is a RECURRING scheduled task. You MUST NOT call gmail_send or gmail_draft — sending emails on every cron tick spams recipients. Report findings as text only.`:""}${Wt}`:`[Scheduled task "${e}"]: ${t||"Execute this scheduled task."}${Wt}`}Ce.post("/cron/check-browser-tasks",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);let s=0,r=0;try{const a=await e.env.DB.prepare(`SELECT pbt.id, pbt.user_id, pbt.task_id, pbt.task_description,
              pbt.thread_id, pbt.channel,
              u.telegram_chat_id, u.pin_hash
       FROM pending_browser_tasks pbt
       JOIN users u ON pbt.user_id = u.id
       WHERE pbt.notified = 0
       ORDER BY pbt.created_at ASC
       LIMIT 10`).all();for(const i of a.results||[]){s++;try{const o=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'browser_use_api_key'").bind(i.user_id).first();if(!o)continue;const c=(await G(o.encrypted_value,i.pin_hash)).trim(),l=await ia(i.task_id,c,{waitMs:8e3});if(!l.done||!(await e.env.DB.prepare(`UPDATE pending_browser_tasks SET notified = 1
           WHERE user_id = ? AND task_id = ? AND notified = 0`).bind(i.user_id,i.task_id).run()).meta.changes)continue;const u=i.task_description?`"${i.task_description.substring(0,80)}${i.task_description.length>80?"...":""}"`:"Your browser task";let p,h;if(l.status==="finished"&&l.output?(p="Browser task completed",h=`${u} finished.

${l.output.substring(0,500)}${l.output.length>500?"...":""}`):l.status==="finished"?(p="Browser task completed (no output)",h=`${u} finished, but the browser returned no readable content. You may want to retry.`):(p="Browser task ended",h=`${u} ended with status "${l.status}". Check the browser dashboard for details.`),i.thread_id){const v=l.status==="finished"&&l.output?l.output.substring(0,8e3):h,f=Math.ceil(v.length/4);try{await e.env.DB.prepare(`INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id)
               VALUES (?, ?, 'assistant', ?, '{}', ?, ?)`).bind(i.user_id,i.channel||"web",v,f,i.thread_id).run()}catch{}}i.pin_hash&&await Ve(e.env.DB,i.user_id,p,h,{pinHash:i.pin_hash,tags:["browser","karna"]}),r++,await new Promise(v=>setTimeout(v,200))}catch{}}}catch{}return e.json({checked:s,notified:r})});Ce.post("/cron/recompute-decay-scores",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const{MemoryService:s}=await Promise.resolve().then(()=>$r),r=new s(e.env.DB),a=await e.env.DB.prepare("SELECT id FROM users ORDER BY id ASC").all();let i=0,o=0;const c=[];for(const l of a.results||[])try{const d=await r.recomputeDecayScores(l.id);i+=d;const u=await e.env.DB.prepare(`SELECT COUNT(*) as cnt FROM memory
         WHERE user_id = ? AND decay_score < 0.1
           AND valid_until IS NULL
           AND last_accessed_at < datetime('now', '-30 days')`).bind(l.id).first();if(((u==null?void 0:u.cnt)||0)>0){const p=await r.compactLowScoreMemories(l.id,.1);o+=p.compactedCount}}catch(d){c.push(`user ${l.id}: ${(d==null?void 0:d.message)||String(d)}`)}return e.json({updated:i,compacted:o,errors:c})});Ce.get("/scorecard/weekly",async e=>{var u;const t=(u=e.req.header("Authorization"))==null?void 0:u.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=n.user_id,r=new Date(Date.now()-10080*60*1e3).toISOString(),[a,i,o]=await Promise.all([e.env.DB.prepare(`SELECT COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as success_count,
              AVG(latency_ms) as avg_latency,
              MAX(latency_ms) as p95_latency_hint
       FROM tool_execution_log
       WHERE user_id = ? AND created_at >= ?`).bind(s,r).first(),e.env.DB.prepare(`SELECT COUNT(*) as retry_count
       FROM tool_execution_log
       WHERE user_id = ? AND was_enforcement_retry = 1 AND created_at >= ?`).bind(s,r).first(),e.env.DB.prepare(`SELECT COUNT(*) as cited_responses
       FROM conversations
       WHERE user_id = ? AND role = 'assistant' AND created_at >= ? AND (content LIKE '%[S1]%' OR content LIKE '%source%')`).bind(s,r).first()]),c=Number((a==null?void 0:a.total)||0),l=Number((a==null?void 0:a.success_count)||0),d=c?l/c:0;return e.json({window:"7d",task_success_rate:Number(d.toFixed(3)),groundedness_rate_hint:Number((Number((o==null?void 0:o.cited_responses)||0)/Math.max(1,c)).toFixed(3)),avg_latency_ms:Math.round(Number((a==null?void 0:a.avg_latency)||0)),p95_latency_hint_ms:Math.round(Number((a==null?void 0:a.p95_latency_hint)||0)),fallback_frequency_hint:Number((Number((i==null?void 0:i.retry_count)||0)/Math.max(1,c)).toFixed(3)),totals:{total_tool_calls:c,successful_tool_calls:l}})});function $l(e,t,n,s){return{userId:e,username:t,channel:"telegram",text:n,sessionId:`telegram-${s}`,timestamp:new Date().toISOString()}}function Pl(e,t){return e.replace(/\*\*(.*?)\*\*/gs,"*$1*").replace(/^#{1,3}\s+(.+)$/gm,"*$1*").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const jl=["llm_slot_1","llm_slot_2","llm_slot_3"],Ul=["openai","groq"];function zs(e,t){const n=t==null?void 0:t.trim();if(!n)return null;const s=e.trim().toLowerCase();return s==="openai"?{url:"https://api.openai.com/v1/audio/transcriptions",apiKey:n,model:"whisper-1"}:s==="groq"?{url:"https://api.groq.com/openai/v1/audio/transcriptions",apiKey:n,model:"whisper-large-v3"}:null}function Bl(e){var t,n;return((t=e.apiKey)==null?void 0:t.trim())||((n=e.api_key)==null?void 0:n.trim())}async function Hl(e,t,n){for(const s of jl){const r=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,s).first();if(r)try{const a=await G(r.encrypted_value,n),i=JSON.parse(a),o=Bl(i);if(i.provider&&o){const c=zs(i.provider,o);if(c)return c}}catch(a){console.error(`[telegram stt] Failed to load ${s}:`,a)}}for(const s of Ul){const r=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,s).first();if(r)try{const a=await G(r.encrypted_value,n),i=zs(s,a);if(i)return i}catch(a){console.error(`[telegram stt] Failed to load legacy ${s}:`,a)}}return null}const Pa=["message","callback_query"],Fl=4e3,Wl=1e4,ql=3e4;async function je(e,t={}){const n=new AbortController,s=setTimeout(()=>n.abort(),Wl);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(s)}}async function Ks(e){const t=new AbortController,n=setTimeout(()=>t.abort(),ql);try{return await fetch(e,{signal:t.signal})}finally{clearTimeout(n)}}async function ae(e,t,n,s="Markdown",r,a){var l,d;const i=zl(n,Fl),o=[];let c=!0;for(let u=0;u<i.length;u++){const p=i[u];let h=!1,v="";for(let f=0;f<3;f++)try{const g=await je(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:p,parse_mode:s,disable_web_page_preview:!1})});if(g.ok){h=!0;break}const w=await g.json().catch(()=>null);if(v=`HTTP ${g.status}: ${(w==null?void 0:w.description)||"Unknown error"}`,(l=w==null?void 0:w.description)!=null&&l.includes("parse")||(d=w==null?void 0:w.description)!=null&&d.includes("entities")){if((await je(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:p})})).ok){h=!0;break}v+=" (plain-text retry also failed)"}if(g.status===429||g.status>=500){const T=Math.pow(2,f)*1e3;await new Promise(x=>setTimeout(x,T));continue}break}catch(g){if(v=`Network error: ${g.message}`,f<2){const w=Math.pow(2,f)*1e3;await new Promise(T=>setTimeout(T,w));continue}}h||(c=!1,o.push(`Chunk ${u+1}/${i.length}: ${v}`))}if(!c&&r&&a&&o.length>0)try{const{logError:u}=await Promise.resolve().then(()=>Nt);await u(r,a,"telegram","send_failed",o.join(" | "))}catch{}return{success:c,errors:o}}async function Gl(e,t){try{await je(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function zl(e,t){if(e.length<=t)return[e];const n=[];let s=e;for(;s.length>0;){if(s.length<=t){n.push(s);break}let r=s.lastIndexOf(`
`,t);r<t*.3&&(r=s.lastIndexOf(" ",t)),r<t*.3&&(r=t),n.push(s.substring(0,r)),s=s.substring(r).trimStart()}return n}function Kl(e){const t=Date.now()-new Date(e).getTime(),n=Math.floor(t/6e4);if(n<1)return"just now";if(n<60)return`${n}m ago`;const s=Math.floor(n/60);return s<24?`${s}h ago`:`${Math.floor(s/24)}d ago`}async function Yl(e,t,n){const r={reminder:"⏰",mail:"✉️",calendar:"📅",error:"⚠️",system:"⚙️"}[n.type]||"🔔",a={daily:"📅 Daily",weekly:"📅 Weekly",once:"✓ Once"},i=n.schedule_type?` · _${a[n.schedule_type]||"⏱ Repeating"}_`:"",o=n.body?`
`+n.body.substring(0,150)+(n.body.length>150?"…":""):"",c=`${r} *${n.title}*${i}
_${Kl(n.created_at)}_${o}`,l=ja(n.id);if(!(await je(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:c,parse_mode:"Markdown",reply_markup:{inline_keyboard:l}})})).ok){const u=await je(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:c.replace(/[_*`[\]]/g,""),reply_markup:{inline_keyboard:l}})});u.ok||console.warn("[sendNotifMessage] plain-text fallback also failed:",t,u.status)}}async function Jl(e,t,n,s,r){switch(e.split("@")[0].toLowerCase()){case"/start":{const i=(s==null?void 0:s.name)||"there",o=(s==null?void 0:s.assistant_name)||"Karna",c=`👋 *Hello, ${i}!*

I'm ${o}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/tasks — Show open tasks
/notifications — Show pending notifications
/new — Start a fresh conversation

Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.`+(s?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`),l=await ae(n,t,c,"Markdown",r,s==null?void 0:s.id);return!l.success&&l.errors.length>0&&console.warn(`[/start] Failed to send message: ${l.errors.join(" | ")}`),!0}case"/help":{const o=`🛠 *${(s==null?void 0:s.assistant_name)||"Karna"} — Commands*

/start — Welcome message
/help — This help text
/status — System status & stats
/tasks — Show open tasks as checklist
/notifications — Pending notifications with action buttons
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

Just type naturally — I'll figure out the rest.`,c=await ae(n,t,o,"Markdown",r,s==null?void 0:s.id);return!c.success&&c.errors.length>0&&console.warn(`[/help] Failed to send message: ${c.errors.join(" | ")}`),!0}case"/status":{if(!s){const i=await ae(n,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app.","Markdown",r);return i.success||console.warn(`[/status] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const[i,o,c,l]=await Promise.all([r.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s.id).first(),r.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s.id).first(),r.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(s.id).first(),r.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(s.id).first()]),d=`📊 *System Status*

Active tasks: ${(i==null?void 0:i.cnt)||0}
Memories: ${(o==null?void 0:o.cnt)||0}
Conversation days: ${(c==null?void 0:c.cnt)||0}
Unresolved errors: ${(l==null?void 0:l.cnt)||0}

Status: ✅ Online`,u=await ae(n,t,d,"Markdown",r,s.id);u.success||console.warn(`[/status] Failed to send message: ${u.errors.join(" | ")}`)}catch{const o=await ae(n,t,"✅ Online — but had trouble fetching stats.","Markdown",r,s==null?void 0:s.id);o.success||console.warn(`[/status error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/new":{if(!s){const o=await ae(n,t,"⚠️ Account not linked.","Markdown",r);return o.success||console.warn(`[/new] Failed to send message: ${o.errors.join(" | ")}`),!0}await r.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(s.id).run();const i=await ae(n,t,"🆕 Starting fresh conversation. Your next message begins a new thread.","Markdown",r,s.id);return i.success||console.warn(`[/new] Failed to send message: ${i.errors.join(" | ")}`),!0}case"/tasks":case"/task":{if(!s){const i=await ae(n,t,"⚠️ Account not linked.","Markdown",r);return i.success||console.warn(`[/tasks] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await r.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(s.id).all()).results||[];if(o.length===0){const v=await ae(n,t,"✅ No open tasks. You're all clear.","Markdown",r,s.id);return v.success||console.warn(`[/tasks] Failed to send message: ${v.errors.join(" | ")}`),!0}const c=new Date,l=c.toISOString().slice(0,10),d=new Date(c);d.setDate(d.getDate()+1);const u=d.toISOString().slice(0,10),p=[`📋 *Open Tasks (${o.length})*
`];for(const v of o){let f="";if(v.due_date){const g=v.due_date.slice(0,10);g<l?f=" ⚠️ _overdue_":g===l?f=" 🔴 _due today_":g===u?f=" 🟡 _due tomorrow_":f=` _${new Date(v.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}p.push(`☐ ${v.title}${f}`)}p.push(`
_Say "mark [task] as done" to close a task._`);const h=await ae(n,t,p.join(`
`),"Markdown",r,s.id);h.success||console.warn(`[/tasks] Failed to send message: ${h.errors.join(" | ")}`)}catch(i){const o=await ae(n,t,"❌ Could not fetch tasks: "+i.message,"Markdown",r,s==null?void 0:s.id);o.success||console.warn(`[/tasks error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/notifications":case"/notif":{if(!s){const i=await ae(n,t,"⚠️ Account not linked.","Markdown",r);return i.success||console.warn(`[/notifications] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await r.prepare(`
          SELECT n.id, n.type, n.title, n.body, n.created_at, j.schedule_type
          FROM notifications n
          LEFT JOIN cron_jobs j
            ON n.user_id = j.user_id
            AND n.source LIKE 'cron:%'
            AND CAST(SUBSTR(n.source, 6) AS INTEGER) = j.id
          WHERE n.user_id = ? AND n.is_read = 0
          ORDER BY n.created_at DESC
          LIMIT 5
        `).bind(s.id).all()).results||[];if(o.length===0){const l=await ae(n,t,"🎉 No pending notifications. You're all caught up.","Markdown",r,s.id);return l.success||console.warn(`[/notifications] Failed to send message: ${l.errors.join(" | ")}`),!0}const c=await ae(n,t,`📬 *${o.length} pending notification${o.length>1?"s":""}:*`,"Markdown",r,s.id);c.success||console.warn(`[/notifications] Failed to send header: ${c.errors.join(" | ")}`);for(const l of o)await Yl(n,t,l)}catch(i){const o=await ae(n,t,"❌ Could not fetch notifications: "+i.message,"Markdown",r,s==null?void 0:s.id);o.success||console.warn(`[/notifications error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}default:return!1}}async function Vl(e,t){var r,a,i,o,c,l;const n=t.db,s=t.env;console.log(`[telegram webhook] envVars keys=${Object.keys(s).join(",")}`);try{if(e.callback_query){await ed(n,e.callback_query);return}const d=e.message;if(!d)return;const u=!!d.text,p=!!d.voice,h=!!d.document,v=!!d.photo,f=!!d.caption;if(!u&&!p&&!h&&!v)return;const g=String(d.chat.id);let w=d.text||"";const T=await n.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(g).first();let x=null;if(T){const j=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(T.id,"telegram_bot_token").first();j&&(x=await G(j.encrypted_value,T.pin_hash))}if(!x){const j=await n.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();j&&(x=await G(j.encrypted_value,j.pin_hash))}if(!x||w.startsWith("/")&&await Jl(w,g,x,T,n))return;if(!T){const j=await ae(x,g,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${g}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`,"Markdown",n);j.success||console.warn(`Failed to send unlinked account message: ${j.errors.join(" | ")}`);return}if(d.voice&&x&&T)try{if((d.voice.file_size??0)>20*1024*1024){const Z=await ae(x,g,"⚠️ Voice note is too large to process (max 20 MB).","Markdown",n,T.id);Z.success||console.warn(`[voice size] Failed to send message: ${Z.errors.join(" | ")}`);return}const j=await ae(x,g,"🎤 Processing voice note...","Markdown",n,T.id);j.success||console.warn(`[voice start] Failed to send message: ${j.errors.join(" | ")}`);const q=await(await je(`https://api.telegram.org/bot${x}/getFile?file_id=${d.voice.file_id}`)).json();if(q.ok&&((r=q.result)!=null&&r.file_path)){const te=await(await Ks(`https://api.telegram.org/file/bot${x}/${q.result.file_path}`)).blob(),ce=await Hl(n,T.id,T.pin_hash);if(!ce){const y=await ae(x,g,"⚠️ To use voice notes, add an OpenAI or Groq API key in Settings → Keys (LLM slot or legacy openai/groq).","Markdown",n,T.id);y.success||console.warn(`[voice no stt] Failed to send message: ${y.errors.join(" | ")}`);return}const re=new FormData;re.append("file",te,"voice.ogg"),re.append("model",ce.model),re.append("language","en");const ye=await fetch(ce.url,{method:"POST",headers:{Authorization:`Bearer ${ce.apiKey}`},body:re});if(!ye.ok){const y=await ye.text(),_=await ae(x,g,`⚠️ Transcription failed: ${ye.status} ${y}`,"Markdown",n,T.id);_.success||console.warn(`[voice transcription error] Failed to send message: ${_.errors.join(" | ")}`);return}w=(await ye.json()).text;const E=await ae(x,g,`🗣️ *You said:* ${w}`,"Markdown",n,T.id);E.success||console.warn(`[voice transcript echo] Failed to send message: ${E.errors.join(" | ")}`)}}catch(j){const Y=await ae(x,g,`⚠️ Failed to process voice note: ${j.message}`,"Markdown",n,T==null?void 0:T.id);Y.success||console.warn(`[voice processing error] Failed to send message: ${Y.errors.join(" | ")}`);return}if((h||v)&&x&&T)try{let j,Y="unknown",q="unknown",Z=0;if(h)j=d.document.file_id,Y=d.document.file_name||"document",q=d.document.mime_type||"unknown",Z=d.document.file_size||0;else if(v){const te=d.photo[d.photo.length-1];j=te.file_id,Y="photo.jpg",q="image/jpeg",Z=te.file_size||0}if(j){const ce=await(await je(`https://api.telegram.org/bot${x}/getFile?file_id=${j}`)).json();let re="";if(ce.ok&&((a=ce.result)!=null&&a.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(Y)||/^text\/|application\/json|application\/xml|application\/csv/i.test(q))&&Z<5e4)try{re=await(await Ks(`https://api.telegram.org/file/bot${x}/${ce.result.file_path}`)).text()}catch{}const ye=d.caption||"",m=`[Telegram file received: "${Y}" (${q}, ${Math.round(Z/1024)}KB)]`;re?w=`${ye?ye+`

`:""}${m}
File contents:
${re.substring(0,8e3)}${re.length>8e3?`
[...truncated]`:""}`:w=`${ye?ye+`

`:""}${m}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(j){if(f&&d.caption)w=d.caption;else{const Y=await ae(x,g,`⚠️ Received your file but couldn't process it: ${j.message}`,"Markdown",n,T==null?void 0:T.id);Y.success||console.warn(`[file processing error] Failed to send message: ${Y.errors.join(" | ")}`);return}}if(!w)return;Gl(x,g).catch(()=>{});let A=await n.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(T.id).first();if(A)await n.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(A.id).run();else{const j=await n.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(T.id).run();if(!((i=j.meta)!=null&&i.last_row_id))throw new Error("Thread creation failed — no row ID returned");A={id:j.meta.last_row_id}}const N=$l(T.id,T.username,w,g);N.metadata={thread_id:A.id},console.log(`[telegram webhook] user=${T.id} msgLen=${w.length} thread=${A.id}`);let $,M;try{const j=await it(n,T.id,T.pin_hash);$=j.provider,M=j.rotation}catch(j){console.error("Telegram provider setup error:",j);const Y=(o=j.message)!=null&&o.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(c=j.message)!=null&&c.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${j.message||"Unknown error"}`,q=await ae(x,g,Y,"Markdown",n,T.id);q.success||console.warn(`[provider error] Failed to send message: ${q.errors.join(" | ")}`);return}const{classifyIntentFast:z}=await Promise.resolve().then(()=>ds);if(z(w).agent==="multi"){const j=await ae(x,g,"🔍 On it…","Markdown",n,T.id);j.success||console.warn(`[ack] Failed to send: ${j.errors.join(" | ")}`)}const W=6e5;let ne=!1;try{const j=await Promise.race([_s(N,n,$,T,M,s),new Promise((Z,te)=>setTimeout(()=>te(new Error("TELEGRAM_TIMEOUT")),W))]),Y=Pl(j,"telegram"),q=await ae(x,g,Y||"(empty response)","Markdown",n,T.id);if(await n.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(A.id).run().catch(()=>{}),ne=q.success,!q.success){console.error(`[CRITICAL] Agent response failed to send to Telegram for user ${T.id}:`,q.errors);try{const{logError:Z}=await Promise.resolve().then(()=>Nt);await Z(n,T.id,"telegram","response_send_failed",`Failed to deliver response: ${q.errors.join(" | ")}`)}catch{}}}catch(j){console.error("Telegram agent error:",j);const Y=j.message==="TELEGRAM_TIMEOUT",q=Y?`⏱️ This is taking too long to complete via Telegram.

If you requested a browser task, the result will arrive as a notification when ready. For other long tasks, try the web app.`:(l=j.message)!=null&&l.includes("API error")?`⚠️ AI provider returned an error. The provider (${$.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(j.message||"Unknown").substring(0,200)}`,Z=await ae(x,g,q,"Markdown",n,T.id);ne=Z.success,Z.success||console.error(`[CRITICAL] Error message failed to send to Telegram for user ${T.id}:`,Z.errors);try{const{logError:te}=await Promise.resolve().then(()=>Nt);await te(n,T.id,"telegram",Y?"timeout":"agent_error",j.message||"Agent error",{provider:$.name})}catch{}}}catch(d){console.error("Telegram webhook error:",d);try{const{logError:u}=await Promise.resolve().then(()=>Nt);await u(n,null,"telegram","webhook_error",d.message||"Unknown telegram error")}catch{}}}function Ys(e){if(!e)return null;if(e.startsWith("cron:")){const t=parseInt(e.replace("cron:",""),10);return isNaN(t)?null:t}return null}function Zl(e){const t=new Date(new Date().toLocaleString("en-US",{timeZone:e})),n=new Date(t);n.setDate(n.getDate()+1),n.setHours(9,0,0,0);const s=new Date(n.toLocaleString("en-US",{timeZone:"UTC"})),r=new Date(n.toLocaleString("en-US",{timeZone:e}));return new Date(n.getTime()+(s.getTime()-r.getTime())).toISOString()}const ja=e=>[[{text:"✅ Seen",callback_data:`notif_seen:${e}`},{text:"⏰ Snooze",callback_data:`notif_snooze_menu:${e}`},{text:"✓ Done",callback_data:`notif_done:${e}`}]],Xl=e=>[[{text:"10 minutes",callback_data:`notif_snooze:${e}:10m`},{text:"1 hour",callback_data:`notif_snooze:${e}:1h`}],[{text:"Tomorrow 9 AM",callback_data:`notif_snooze:${e}:tomorrow`},{text:"← Back",callback_data:`notif_back:${e}`}]];async function Et(e,t,n){const s=await je(`https://api.telegram.org/bot${e}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:t,text:n})});s.ok||console.warn("[answerCallback]",t,s.status)}async function Tt(e,t,n,s){const r=await je(`https://api.telegram.org/bot${e}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,message_id:n,reply_markup:s?{inline_keyboard:s}:{}})});r.ok||console.warn("[editKeyboard]",t,n,r.status)}async function Ql(e,t,n,s,r,a,i,o,c,l){const d=await e.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).first();if(!d){await Et(t,n,"Notification not found — may have already been actioned."),await Tt(t,s,r,null);return}if(i==="notif_seen")await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await Et(t,n,"✅ Dismissed"),await Tt(t,s,r,null);else if(i==="notif_snooze_menu")await Et(t,n),await Tt(t,s,r,Xl(o));else if(i==="notif_back")await Et(t,n),await Tt(t,s,r,ja(o));else if(i==="notif_snooze"){const u=Ys(d.source);u&&await e.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,a).run();let p,h;c==="10m"?(p=new Date(Date.now()+600*1e3).toISOString(),h="10 minutes"):c==="1h"?(p=new Date(Date.now()+3600*1e3).toISOString(),h="1 hour"):(p=Zl(l||"UTC"),h="tomorrow 9 AM"),await e.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
       VALUES (?, ?, ?, 'once', ?, 'reminder', ?, ?, 1, 'active')`).bind(a,d.title,d.body,p,JSON.stringify({description:d.body||""}),p).run(),await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await Et(t,n,`⏰ Snoozed until ${h}`),await Tt(t,s,r,null)}else if(i==="notif_done"){const u=Ys(d.source);u&&await e.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,a).run(),await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await Et(t,n,"✓ Done!"),await Tt(t,s,r,null)}}async function ed(e,t){var g;const{id:n,data:s,message:r,from:a}=t;if(!s||!r)return;const i=s.split(":"),o=i[0],c=String(r.chat.id);if(o.startsWith("notif_")){const w=parseInt(i[1]);if(!w)return;const T=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(c).first();if(!T)return;const x=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
       JOIN users u ON c.user_id = u.id
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(T.id).first();if(!x)return;const A=await G(x.encrypted_value,x.pin_hash),N=i[2];await Ql(e,A,n,c,r.message_id,T.id,o,w,N,T.timezone);return}if(i[0]!=="briefing_toggle"||i.length<3)return;const l=i[1],d=parseInt(i[2]);if(!d||!l)return;const u=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(c).first();if(!u)return;const p=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(u.id,d,l).first();if(!p)return;const h=p.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(h,h,p.id).run();const v=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(u.id).first();if(!v)return;const f=await G(v.encrypted_value,v.pin_hash);try{const w=await je(`https://api.telegram.org/bot${f}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:n,text:h?"✅ Checked!":"☐ Unchecked"})});w.ok||console.warn(`[callback answer] Failed to answer callback: HTTP ${w.status}`)}catch(w){console.warn(`[callback answer] Error answering callback: ${w.message}`)}if((g=r.reply_markup)!=null&&g.inline_keyboard){const w=r.reply_markup.inline_keyboard.map(T=>T.map(x=>{var A;if((A=x.callback_data)!=null&&A.includes(l)){const N=h?"✅":"☐",$=x.text.replace(/^[☐✅]\s*/,"");return{...x,text:`${N} ${$}`}}return x}));try{await je(`https://api.telegram.org/bot${f}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:c,message_id:r.message_id,reply_markup:{inline_keyboard:w}})})}catch{}}}const rn=new xe;function td(e){return{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE}}rn.post("/webhook",async e=>{let t;try{t=await e.req.json()}catch{return e.json({ok:!0})}const s={db:e.env.DB,env:td(e)};return e.executionCtx.waitUntil(Vl(t,s)),e.json({ok:!0})});rn.post("/setup-webhook",async e=>{var c;const t=(c=e.req.header("Authorization"))==null?void 0:c.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const{webhook_url:s}=await e.req.json(),r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!r)return e.json({error:"Telegram bot token not configured in Settings"},400);const a=await G(r.encrypted_value,n.pin_hash);if(!s){const d=await(await fetch(`https://api.telegram.org/bot${a}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(d)}const o=await(await fetch(`https://api.telegram.org/bot${a}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:s,allowed_updates:[...Pa],drop_pending_updates:!1})})).json();return e.json(o)});rn.get("/webhook-status",async e=>{var a,i,o,c,l,d;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!s)return e.json({configured:!1,error:"Bot token not set"});const r=await G(s.encrypted_value,n.pin_hash);try{const p=await(await fetch(`https://api.telegram.org/bot${r}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((i=p.result)==null?void 0:i.url)||"",has_webhook:!!((o=p.result)!=null&&o.url),pending_updates:((c=p.result)==null?void 0:c.pending_update_count)||0,last_error:((l=p.result)==null?void 0:l.last_error_message)||"",last_error_date:((d=p.result)==null?void 0:d.last_error_date)||null})}catch(u){return e.json({configured:!0,error:u.message})}});rn.post("/detect-chat-id",async e=>{var a,i;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!s)return e.json({error:"Bot token not configured"},400);const r=await G(s.encrypted_value,n.pin_hash);try{const l=((i=(await(await fetch(`https://api.telegram.org/bot${r}/getWebhookInfo`)).json()).result)==null?void 0:i.url)||"";await fetch(`https://api.telegram.org/bot${r}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(g=>setTimeout(g,500));const u=await(await fetch(`https://api.telegram.org/bot${r}/getUpdates?limit=10&timeout=0`)).json();l&&await fetch(`https://api.telegram.org/bot${r}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:l,allowed_updates:[...Pa]})});const p=u.result||[];if(p.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const h=[],v=new Set;for(let g=p.length-1;g>=0;g--){const w=p[g].message;if(w&&w.chat){const T=String(w.chat.id);v.has(T)||(v.add(T),h.push({chat_id:T,name:[w.chat.first_name,w.chat.last_name].filter(Boolean).join(" ")||w.chat.title||"Unknown",username:w.chat.username||"",date:new Date((w.date||0)*1e3).toISOString()}))}}if(h.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const f=h[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(f,n.user_id).run(),e.json({found:!0,chat_id:f,name:h[0].name,all_chats:h,message:`Chat ID ${f} detected and saved to your profile.`})}catch(o){return e.json({error:`Detection failed: ${o.message}`},500)}});function nd(e){const t=new Date,n=new Date(t.toLocaleString("en-US",{timeZone:e})),s=new Date(n);s.setDate(s.getDate()+1),s.setHours(0,0,0,0);const r=new Date(s);r.setHours(23,59,59,999);const a=s.toISOString().split("T")[0];return{start:s.toISOString(),end:r.toISOString(),dateStr:a}}function Sn(e,t=new Date){return new Intl.DateTimeFormat("en-CA",{timeZone:e||"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}async function sd(e,t,n,s,r,a){try{return(await new bn(e,t,n,s,r).listEvents("primary",{timeMin:a.start,timeMax:a.end,maxResults:50})).map(c=>{var l;return{id:c.id||`google-${Date.now()}`,title:c.summary||"Untitled Event",startTime:c.start.dateTime||c.start.date||"",endTime:c.end.dateTime||c.end.date||"",location:c.location,attendees:(l=c.attendees)==null?void 0:l.map(d=>d.displayName||d.email),source:"google"}})}catch(i){return console.error("Google Calendar fetch error:",i.message),[]}}async function rd(e,t,n,s,r){try{const a=new Ie(e,t,n,s,r),i=await a.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),o=await a.listMessages({query:"is:important is:unread",maxResults:10}),c={};for(const u of i){const p=u.from.split("<")[0].trim()||u.from;c[p]=(c[p]||0)+1}const l=Object.entries(c).sort(([,u],[,p])=>p-u).slice(0,5).map(([u])=>u),d=i.some(u=>u.subject.toLowerCase().includes("urgent")||u.subject.toLowerCase().includes("asap")||u.subject.toLowerCase().includes("immediately"));return{unreadCount:i.length,importantCount:o.length,topSenders:l,hasUrgent:d}}catch(a){return console.error("Gmail fetch error:",a.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function ad(e,t){try{const n=await e.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(t).all(),s=new Date,r=new Date(s);r.setDate(r.getDate()+1),r.setHours(23,59,59,999);const a=n.results||[],i=a.map(c=>{if(c.due_date){const l=new Date(c.due_date),d=l<=s?"overdue":l<=r?"due today":l.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${c.title} [${d}]`}return c.title}),o=a.filter(c=>c.due_date?new Date(c.due_date)<=r:!1).length;return{pending:a.length,dueToday:o,items:i}}catch(n){return console.error("Tasks fetch error:",n.message),{pending:0,dueToday:0,items:[]}}}async function id(e,t){try{const n=Math.floor((Date.now()-1728e5)/1e3),s=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${n},points>10`,r=await fetch(s,{headers:{"User-Agent":"Karna/1.0"}});return r.ok?((await r.json()).hits||[]).filter(i=>i.url&&!t.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const Js=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function od(e,t,n){const s=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],r=new Set;if(t&&n)try{((await t.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(n).all()).results||[]).forEach(l=>r.add(l.url))}catch{}const a=[];if(s.some(c=>Js.some(l=>c.toLowerCase().includes(l.toLowerCase())))){const c=s.find(d=>Js.some(u=>d.toLowerCase().includes(u.toLowerCase())))||"AI agents",l=await id(c,r);for(const d of l)a.push(d),r.add(d.url)}for(const c of s){if(a.length>=8)break;const l=`latest ${c} news today`;try{const d=await Ut(l,{num:5});if(d.results)for(const u of d.results){if(a.length>=8)break;r.has(u.link)||(a.push({title:u.title,summary:u.snippet,url:u.link,source:u.displayLink}),r.add(u.link))}}catch(d){console.error(`News search error for "${l}":`,d.message)}}const o=a.slice(0,7);if(t&&n&&o.length>0)for(const c of o)try{await t.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(n,c.url,c.title).run()}catch{}return o}function cd(e,t){const n=[];let s="20:00";{const[i,o]=t.split(":"),c=parseInt(i,10),l=o||"00",d=c>=12?"PM":"AM";s=`${c===0?12:c>12?c-12:c}:${l} ${d}`}n.push(`🗓 Your ${s} Brief — ${e.targetDate}`),n.push("");const r=e.calendar.totalCount;if(r>0){n.push(`📅 Tomorrow: ${r} event${r===1?"":"s"}`);for(const i of e.calendar.google.slice(0,5)){const o=i.startTime?new Date(i.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";n.push(`   • ${o} ${i.title}`)}}else n.push("📅 Tomorrow: Nothing scheduled");n.push("");const a=e.emails.gmail.unreadCount;if(a>0?(n.push(`📧 Gmail: ${a} unread`),e.emails.gmail.importantCount>0&&n.push(`   ★ ${e.emails.gmail.importantCount} marked important`),e.emails.gmail.hasUrgent&&n.push("   ⚠️ Urgent messages present"),e.emails.gmail.topSenders.length>0&&n.push(`   From: ${e.emails.gmail.topSenders.slice(0,3).join(", ")}`)):n.push("📧 Gmail: Inbox clear"),n.push(""),e.tasks.pending>0){n.push(`✅ Open Tasks (${e.tasks.pending}):`);for(const i of e.tasks.items)n.push(`   ☐ ${i}`)}else n.push("✅ Tasks: All clear");if(n.push(""),e.news.items.length>0){n.push("📡 Today's Signal:");for(const i of e.news.items){const o=i.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${i.source}`;n.push(`   • ${i.title.substring(0,90)}${i.title.length>90?"…":""}`),n.push(`     ${o} — ${i.summary.substring(0,80)}${i.summary.length>80?"…":""}`)}}return n.join(`
`)}function ld(e){const t=[];let n=0;for(const s of e.calendar.google)t.push({type:"calendar",key:s.id,text:`${s.title} - ${new Date(s.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:s},sortOrder:n++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:n++});for(const s of e.tasks.items)t.push({type:"task",key:`task-${s}`,text:s,metadata:{},sortOrder:n++});for(const s of e.news.items)t.push({type:"news",key:`news-${s.url}`,text:`📰 ${s.title}`,metadata:{url:s.url,source:s.source},sortOrder:n++});return t}async function dd(e,t){const n=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!n)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let s;try{const a=JSON.parse(n.components);s={google_calendar:a.google_calendar!==!1,gmail:a.gmail!==!1,tasks:a.tasks!==!1,news:a.news!==!1}}catch{s={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const r=n.news_topics?n.news_topics.split(",").map(a=>a.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:s,newsTopics:r}}async function Ua(e,t,n){var x,A;const s=t.timezone||"Asia/Kolkata",r=nd(s),{components:a,newsTopics:i}=await dd(e,t.id),o=[],c=[];a.google_calendar&&(o.push(sd(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET,r)),c.push("googleEvents")),a.gmail&&(o.push(rd(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET)),c.push("gmailSummary")),a.tasks&&(o.push(ad(e,t.id)),c.push("tasks")),a.news&&(o.push(od(i,e,t.id)),c.push("news"));const l=await Promise.all(o),d={};c.forEach((N,$)=>{d[N]=l[$]});const u={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},p={pending:0,dueToday:0,items:[]},h={generatedAt:new Date().toISOString(),targetDate:r.dateStr,calendar:{google:d.googleEvents||[],totalCount:((x=d.googleEvents)==null?void 0:x.length)||0},emails:{gmail:d.gmailSummary||u},tasks:d.tasks||p,news:{items:d.news||[],fetchedAt:new Date().toISOString()},summary:""},v=((A=await e.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(t.id).first())==null?void 0:A.briefing_time)||"20:00";h.summary=cd(h,v);const f=ld(h),g=Sn(s),w=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel, briefing_date)
    VALUES (?, 'evening', ?, 'all', ?)
    RETURNING id
  `).bind(t.id,JSON.stringify(h),g).first(),T=(w==null?void 0:w.id)||0;for(const N of f)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(T,N.type,N.key,N.text,JSON.stringify(N.metadata),N.sortOrder).run();return{briefingId:T,content:h,items:f}}async function ud(e,t,n){const s=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(n,t).first();if(!s)return null;const r=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(n).all();return{briefing:{...s,content:JSON.parse(s.content_json||"{}")},items:r.results||[]}}async function md(e,t,n,s){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(n,t).first())return null;const a=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(s,n).first();if(!a)return null;const i=a.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(i,i,s,n).run(),{checked:i===1}}async function pd(e,t,n=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
    LIMIT ?
  `).bind(t,n).all()).results||[]).map(r=>({...r,content:JSON.parse(r.content_json||"{}")}))}function Ba(e,t,n=new Date,s=5){const r=new Date(n.toLocaleString("en-US",{timeZone:t})),a=r.getHours(),i=r.getMinutes(),[o,c]=e.split(":").map(Number),l=a*60+i,d=o*60+c,u=l-d;return u>=0&&u<s}function Ha(e,t){const n=e.summary,s=[];for(const r of t.slice(0,10))s.push([{text:`☐ ${r.text.substring(0,40)}${r.text.length>40?"...":""}`,callback_data:`briefing_toggle:${r.key}`}]);return{text:n,inlineKeyboard:s}}const be=new xe,hd=1e4;async function Vs(e,t){const n=new AbortController,s=setTimeout(()=>n.abort(),hd);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(s)}}async function fd(e,t){var r;if(e.req.path.includes("/cron/"))return t();const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}be.use("/*",fd);be.get("/briefings",async e=>{const t=e.get("user"),n=parseInt(e.req.query("limit")||"10");try{const s=await pd(e.env.DB,t.id,n);return e.json({briefings:s})}catch(s){return e.json({error:s.message},500)}});be.get("/briefings/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));try{const s=await ud(e.env.DB,t.id,n);return s?e.json(s):e.json({error:"Briefing not found"},404)}catch(s){return e.json({error:s.message},500)}});be.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=parseInt(e.req.param("itemId"));try{const r=await md(e.env.DB,t.id,n,s);return r?e.json(r):e.json({error:"Item not found"},404)}catch(r){return e.json({error:r.message},500)}});be.post("/briefings/generate",async e=>{const t=e.get("user");try{const n=await Ua(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(n)}catch(n){return e.json({error:n.message},500)}});be.get("/morning-briefing",async e=>{const t=e.get("user");try{const n=await Fa(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(n)}catch(n){return e.json({error:n.message},500)}});be.get("/briefing-preferences",async e=>{const t=e.get("user");try{const n=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!n){const r={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:r})}const s={briefingTime:n.briefing_time,briefingEnabled:n.briefing_enabled!==0,components:JSON.parse(n.components),newsTopics:n.news_topics.split(",").map(r=>r.trim()).filter(Boolean),notificationChannels:JSON.parse(n.notification_channels),proactiveLevel:n.proactive_level};return e.json({preferences:s})}catch(n){return e.json({error:n.message},500)}});be.post("/briefing-preferences",async e=>{const t=e.get("user"),n=await e.req.json(),s=[];if(n.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(n.briefingTime)||s.push("Invalid time format. Use HH:MM (e.g., 20:00)")),n.newsTopics&&(n.newsTopics.length>5&&s.push("Maximum 5 news topics allowed"),n.newsTopics.some(r=>r.length>50)&&s.push("Each news topic must be 50 characters or less")),n.proactiveLevel&&!["conservative","moderate","aggressive"].includes(n.proactiveLevel)&&s.push("Invalid proactive level. Use conservative, moderate, or aggressive"),s.length>0)return e.json({error:s.join("; ")},400);try{const r=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),a=n.components?JSON.stringify(n.components):null,i=n.notificationChannels?JSON.stringify(n.notificationChannels):null,o=n.newsTopics?n.newsTopics.join(", "):null;if(r){const c=[],l=[];n.briefingTime!==void 0&&(c.push("briefing_time = ?"),l.push(n.briefingTime)),n.briefingEnabled!==void 0&&(c.push("briefing_enabled = ?"),l.push(n.briefingEnabled?1:0)),a!==null&&(c.push("components = ?"),l.push(a)),o!==null&&(c.push("news_topics = ?"),l.push(o)),i!==null&&(c.push("notification_channels = ?"),l.push(i)),n.proactiveLevel!==void 0&&(c.push("proactive_level = ?"),l.push(n.proactiveLevel)),c.length>0&&(c.push("updated_at = CURRENT_TIMESTAMP"),l.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${c.join(", ")} WHERE user_id = ?`).bind(...l).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,n.briefingTime||"20:00",a||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',o||"AI, LLM, Tools, Agentic Workflows, AI Features",i||'{"telegram":true,"web":true}',n.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(r){return e.json({error:r.message},500)}});be.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(n){return e.json({error:n.message},500)}});be.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],a=new Date;for(const i of s.results||[]){if(!i.briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",c=i.briefing_time||"20:00";if(!Ba(c,o,a))continue;const l=Sn(o,a);if(!await e.env.DB.prepare("SELECT 1 FROM briefings WHERE user_id = ? AND briefing_type = 'evening' AND briefing_date = ? LIMIT 1").bind(i.id,l).first())try{const u=await Ua(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),{text:p}=Ha(u.content,u.items);await Ve(e.env.DB,i.id,"Evening Briefing",p,{pinHash:i.pin_hash,tags:["briefing","karna"]}),u.briefingId&&await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(u.briefingId).run(),r.push({user_id:i.id,status:"success",briefing_id:u.briefingId,briefing_time:c,timezone:o})}catch(u){r.push({user_id:i.id,status:"error",error:u.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});be.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare("SELECT * FROM users").all(),r=[],a=new Date,i=new Date(a.getTime()+600*1e3).toISOString(),o=new Date(a.getTime()+900*1e3).toISOString();for(const c of s.results||[])try{const l=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(c.id).first();if(!l)continue;const d=await G(l.encrypted_value,c.pin_hash),p=JSON.parse(d).access_token;if(!p)continue;const h=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(a.toISOString())}&timeMax=${encodeURIComponent(o)}&maxResults=10`,{headers:{Authorization:`Bearer ${p}`}});if(!h.ok)continue;const f=((await h.json()).items||[]).filter(g=>{var T;const w=(T=g.start)==null?void 0:T.dateTime;return w?w>=a.toISOString()&&w<=i:!1});if(f.length===0){r.push({user_id:c.id,reminders_sent:0});continue}for(const g of f){const w=new Date(g.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),T=g.location?`
📍 ${g.location}`:"",x="Meeting in 10 minutes",A=`${g.summary||"Untitled Event"}
🕐 ${w}${T}`;await Ve(e.env.DB,c.id,x,A,{pinHash:c.pin_hash,priority:"high",tags:["calendar","karna"]})}r.push({user_id:c.id,reminders_sent:f.length})}catch(l){r.push({user_id:c.id,status:"error",error:l.message})}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});be.post("/cron/morning-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.morning_briefing_time, '08:00') as morning_briefing_time,
             COALESCE(bp.morning_briefing_enabled, 1) as morning_briefing_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],a=new Date;for(const i of s.results||[]){if(!i.morning_briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",c=i.morning_briefing_time||"08:00";if(!Ba(c,o,a))continue;const l=Sn(o,a);if(!await e.env.DB.prepare("SELECT 1 FROM briefings WHERE user_id = ? AND briefing_type = 'morning' AND briefing_date = ? LIMIT 1").bind(i.id,l).first())try{const u=await Fa(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});let p={telegram:!0,web:!0};try{p=JSON.parse(i.notification_channels||"{}")}catch{}if(p.web!==!1&&u.briefingId){const h=wd(u.content);await Ve(e.env.DB,i.id,"Morning Briefing",h,{pinHash:i.pin_hash,tags:["briefing","karna"]}),await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(u.briefingId).run()}r.push({user_id:i.id,status:"success",briefing_id:u.briefingId,briefing_time:c,timezone:o})}catch(u){r.push({user_id:i.id,status:"error",error:u.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});be.post("/cron/email-digest",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, bp.components
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[];for(const a of s.results||[]){let i={};try{i=JSON.parse(a.components||"{}")}catch{}if(i.email_digest!==!1)try{const o=await Wa(e.env.DB,a,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET},{skipBrowserUse:!0}),c=`Email Digest — ${new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}`,l=JSON.stringify(o,null,2),d=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'email_digest', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(a.id,c,l,`email_digest_${Date.now()}`,null,null,null).first();r.push({user_id:a.id,status:"success",action_item_id:d==null?void 0:d.id,digest:o})}catch(o){r.push({user_id:a.id,status:"error",error:o.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});be.post("/cron/weekly-review",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.weekly_review_day_time, 'Sunday 20:00') as weekly_review_day_time,
             COALESCE(bp.weekly_review_enabled, 1) as weekly_review_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],a=new Date;for(const i of s.results||[]){if(!i.weekly_review_enabled)continue;const o=i.timezone||"Asia/Kolkata",c=i.weekly_review_day_time||"Sunday 20:00";if(yd(c,o,a))try{const l=await vd(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),d=`Weekly Review — Week of ${new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})}`,u=JSON.stringify(l,null,2),p=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'weekly_review', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(i.id,d,u,`weekly_review_${Date.now()}`,null,null,null).first();let h={telegram:!0,web:!0};try{h=JSON.parse(i.notification_channels||"{}")}catch{}if(h.web!==!1){const v=_d(l);await Ve(e.env.DB,i.id,"Weekly Review",v,{pinHash:i.pin_hash,tags:["review","karna"]})}r.push({user_id:i.id,status:"success",action_item_id:p==null?void 0:p.id})}catch(l){r.push({user_id:i.id,status:"error",error:l.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});async function gd(e,t,n,s,r){try{const a=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!a)return;const i=await G(a.encrypted_value,a.pin_hash);if(!(i!=null&&i.trim())){ms("sendTelegramWithKeyboard: empty bot token",{userId:t.id});return}if(!(await(await Vs(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n,parse_mode:"Markdown",reply_markup:{inline_keyboard:s.map(l=>l.map(d=>({...d,callback_data:`${d.callback_data}:${r}`})))}})})).json()).ok){const d=await(await Vs(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n.replace(/[_*[`\]]/g,""),reply_markup:{inline_keyboard:s.map(u=>u.map(p=>({...p,callback_data:`${p.callback_data}:${r}`})))}})})).json();if(!d.ok){vt("Telegram briefing send failed",{description:d.description,chatId:t.telegram_chat_id});return}}await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(r).run()}catch(a){vt("Telegram briefing error",{error:(a==null?void 0:a.message)||String(a)})}}async function Fa(e,t,n){const s=new Date;s.setHours(0,0,0,0);const r=new Date;r.setHours(23,59,59,999);const a=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 
    AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,s.toISOString(),r.toISOString()).all(),i=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 10
  `).bind(t.id).all(),o=await Wa(e,t,n,{skipBrowserUse:!0});let c=[];try{const h=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first();if(h){const v=await G(h.encrypted_value,t.pin_hash),g=JSON.parse(v).access_token;if(g){const w=s.toISOString(),T=r.toISOString(),x=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(w)}&timeMax=${encodeURIComponent(T)}&maxResults=20`,{headers:{Authorization:`Bearer ${g}`}});x.ok&&(c=((await x.json()).items||[]).map(N=>{var $,M,z,W;return{title:N.summary||"Untitled",startTime:(($=N.start)==null?void 0:$.dateTime)||((M=N.start)==null?void 0:M.date),endTime:((z=N.end)==null?void 0:z.dateTime)||((W=N.end)==null?void 0:W.date)}}))}}}catch{}const l={generatedAt:new Date().toISOString(),type:"morning",todayReminders:(a.results||[]).map(h=>({name:h.name,description:h.description,next_run:h.next_run})),pendingActions:(i.results||[]).map(h=>({title:h.title,priority:h.priority})),emailDigest:o,calendarEvents:c},d=Sn(t.timezone||"Asia/Kolkata"),u=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel, briefing_date)
    VALUES (?, 'morning', ?, 'all', ?)
    RETURNING id
  `).bind(t.id,JSON.stringify(l),d).first();return{briefingId:(u==null?void 0:u.id)||0,content:l}}async function Wa(e,t,n,s){const r={unreadCount:0,recent:[]},a={message:"",recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const o=new Ie(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET),c=await o.getUnreadCount(),l=await o.listMessages({maxResults:10,labelIds:["INBOX"]});r.unreadCount=c,r.recent=l.map(d=>({id:d.id,subject:d.subject,from:d.from,snippet:d.snippet,isUnread:d.isUnread}))}}catch(i){r.error=i.message}if(s!=null&&s.skipBrowserUse)a.message="Outlook not fetched in automated digest (runs once daily in morning briefing).";else try{const i=await e.prepare("SELECT name, encrypted_blob FROM site_credentials WHERE user_id = ? AND (name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE) LIMIT 1").bind(t.id,"%Outlook%","%Microsoft%","%Office 365%").first();if(!i)a.message="No Outlook credentials saved in Secret Vault. Add them in Settings → Secret Vault.";else{const o=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,"browser_use_api_key").first();if(!o)a.message="Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key.";else{const c=(await G(o.encrypted_value,t.pin_hash)).trim(),l=JSON.parse(await G(i.encrypted_blob,t.pin_hash)),d=await as("Go to https://outlook.live.com or https://outlook.office.com. Log in with username {username} and password {password} if prompted. Navigate to the inbox and extract the 10 most recent emails with sender, subject, date, and snippet. Return the results as structured text.",c,{secrets:{username:l.username,password:l.password},timeoutMs:3e5});d.status==="completed"&&d.output?a.recent=d.output:d.status==="timeout"?a.message="Outlook browser task timed out.":a.message="Outlook returned no content."}}}catch(i){a.message=`Outlook error: ${i.message}`}return{gmail:r,outlook:a}}function yd(e,t,n=new Date){const s=new Date(n.toLocaleString("en-US",{timeZone:t})),r=s.toLocaleDateString("en-US",{weekday:"long"}),a=s.getHours(),i=s.getMinutes(),o=e.trim().split(" "),c=o[o.length-1],l=o.slice(0,o.length-1).join(" "),[d,u]=c.split(":").map(Number),p=a*60+i,h=d*60+u;return r===l&&p===h}async function vd(e,t,n){const s=new Date,r=new Date(s.getTime()-10080*60*1e3),a=new Date(s.getTime()+10080*60*1e3),i=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND state = 'completed' AND last_run >= ?
    ORDER BY last_run DESC
  `).bind(t.id,r.toISOString()).all(),o=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run < ?
    ORDER BY next_run DESC
  `).bind(t.id,s.toISOString()).all(),c=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 15
  `).bind(t.id).all(),l=await e.prepare(`
    SELECT * FROM document_library 
    WHERE user_id = ? AND created_at >= ?
    ORDER BY created_at DESC
    LIMIT 10
  `).bind(t.id,r.toISOString()).all(),d=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,s.toISOString(),a.toISOString()).all();let u={unreadCount:0,recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const h=new Ie(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET),v=await h.getUnreadCount(),f=await h.listMessages({maxResults:10,labelIds:["INBOX"]});u={unreadCount:v,recent:f.map(g=>({subject:g.subject,from:g.from,snippet:g.snippet}))}}}catch{}return{generatedAt:s.toISOString(),period:{start:r.toISOString(),end:s.toISOString()},completedTasks:(i.results||[]).map(p=>({name:p.name,last_run:p.last_run})),missedTasks:(o.results||[]).map(p=>({name:p.name,next_run:p.next_run})),openActions:(c.results||[]).map(p=>({title:p.title,priority:p.priority,status:p.status})),recentDocuments:(l.results||[]).map(p=>({name:p.name,status:p.status,created_at:p.created_at})),upcomingTasks:(d.results||[]).map(p=>({name:p.name,next_run:p.next_run})),gmailSummary:u}}function wd(e){const t=[];t.push("☀️ Morning Briefing"),t.push("");const n=e.todayReminders||[];if(n.length>0){t.push(`📋 Today (${n.length}):`);for(const c of n){const l=c.next_run?new Date(c.next_run).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${l} ${c.name}`)}}else t.push("📋 Today: No scheduled reminders");t.push("");const s=e.pendingActions||[];if(s.length>0){t.push(`🔔 Pending Actions (${s.length}):`);for(const c of s.slice(0,5))t.push(`   • ${c.title} (${c.priority})`)}else t.push("🔔 Pending Actions: None");t.push("");const r=e.emailDigest||{},a=r.gmail||{};a.unreadCount>0?t.push(`📧 Gmail: ${a.unreadCount} unread`):t.push("📧 Gmail: Inbox clear");const i=r.outlook||{};typeof i.recent=="string"&&i.recent.length>0?t.push("📧 Outlook: see digest"):i.message&&t.push(`📧 Outlook: ${i.message}`),t.push("");const o=e.calendarEvents||[];if(o.length>0){t.push(`📅 Calendar (${o.length}):`);for(const c of o.slice(0,5)){const l=c.startTime?new Date(c.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${l} ${c.title}`)}}return t.join(`
`)}function _d(e){const t=[];t.push("📊 Weekly Review"),t.push("");const n=e.completedTasks||[];t.push(`✅ Completed: ${n.length}`);const s=e.missedTasks||[];t.push(`❌ Missed/Overdue: ${s.length}`);const r=e.openActions||[];t.push(`🔔 Open Actions: ${r.length}`),t.push("");const a=e.recentDocuments||[];a.length>0&&t.push(`📄 Documents: ${a.length} this week`);const i=e.upcomingTasks||[];i.length>0&&t.push(`📅 Upcoming: ${i.length} in next 7 days`);const o=e.gmailSummary||{};return o.unreadCount>0&&t.push(`📧 Gmail Unread: ${o.unreadCount}`),t.join(`
`)}be.post("/briefings/:id/resend",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));try{const s=await e.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Briefing not found"},404);const r=JSON.parse(s.content||"{}"),a=await e.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(n).all(),{text:i,inlineKeyboard:o}=Ha(r,a.results||[]);await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(n).run(),await gd(e.env.DB,t,i,o,n);const c=await e.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(n).first();return c!=null&&c.delivered_telegram?e.json({success:!0,message:"Briefing sent to Telegram"}):e.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(s){return e.json({error:s.message},500)}});be.delete("/briefings/:id",async e=>{const t=e.get("user"),n=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});const qa=["morning","evening","weekly","email"],Ga=["calendar_today","calendar_tomorrow","gmail_summary","outlook_summary","tasks_due","news_ai","cron_jobs_today","cron_completed","cron_missed","action_items_open","documents_recent"],za=["ntfy","web","telegram"],Vn=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Rt=["AI","LLM","Tools","Agentic Workflows","AI Features"];function un(e){switch(e){case"morning":return["calendar_today","gmail_summary","cron_jobs_today","action_items_open"];case"evening":return["calendar_tomorrow","gmail_summary","tasks_due","news_ai"];case"weekly":return["cron_completed","cron_missed","action_items_open","documents_recent","gmail_summary"];case"email":return["gmail_summary","outlook_summary"]}}function kn(e){switch(e){case"morning":return{kind:e,enabled:!0,scheduleTime:"08:00",scheduleWeekday:null,sections:un("morning"),notifyChannels:["ntfy","web"],newsTopics:Rt};case"evening":return{kind:e,enabled:!0,scheduleTime:"20:00",scheduleWeekday:null,sections:un("evening"),notifyChannels:["ntfy","web"],newsTopics:Rt};case"weekly":return{kind:e,enabled:!0,scheduleTime:"20:00",scheduleWeekday:"Sunday",sections:un("weekly"),notifyChannels:["ntfy","web"],newsTopics:Rt};case"email":return{kind:e,enabled:!1,scheduleTime:"12:00",scheduleWeekday:null,sections:un("email"),notifyChannels:["ntfy","web"],newsTopics:Rt}}}function bd(){return qa.map(kn)}function Zs(e,t){try{const n=JSON.parse(e);return Array.isArray(n)?n.filter(s=>typeof s=="string"&&t.includes(s)):[]}catch{return[]}}function bs(e){const t=kn(e.kind),n=Zs(e.sections_json,Ga),s=Zs(e.notify_channels_json,za);let r=Rt;return e.news_topics!=null&&(r=e.news_topics.split(",").map(a=>a.trim()).filter(Boolean),r.length===0&&(r=Rt)),{kind:e.kind,enabled:e.enabled!==0,scheduleTime:/^\d{2}:\d{2}$/.test(e.schedule_time)?e.schedule_time:t.scheduleTime,scheduleWeekday:e.schedule_weekday&&Vn.includes(e.schedule_weekday)?e.schedule_weekday:t.scheduleWeekday,sections:n.length>0?n:t.sections,notifyChannels:s.length>0?s:t.notifyChannels,newsTopics:r}}function Ed(e){const t=[];if(e.scheduleTime!==void 0&&(/^([01]\d|2[0-3]):[0-5]\d$/.test(e.scheduleTime)||t.push("scheduleTime must be HH:MM (e.g. 20:00)")),e.scheduleWeekday!==void 0&&e.scheduleWeekday!==null&&(Vn.includes(e.scheduleWeekday)||t.push(`scheduleWeekday must be one of: ${Vn.join(", ")}`)),e.sections!==void 0){const n=e.sections.filter(s=>!Ga.includes(s));n.length>0&&t.push(`unknown section(s): ${n.join(", ")}`)}if(e.notifyChannels!==void 0){const n=e.notifyChannels.filter(s=>!za.includes(s));n.length>0&&t.push(`unknown channel(s): ${n.join(", ")}`),e.notifyChannels.length===0&&t.push("at least one delivery channel is required")}return e.newsTopics!==void 0&&(e.newsTopics.length>5&&t.push("maximum 5 news topics allowed"),e.newsTopics.some(n=>n.length>50)&&t.push("each news topic must be 50 chars or less")),t}async function Td(e,t){const n=await e.prepare("SELECT * FROM digest_configs WHERE user_id = ? ORDER BY kind ASC").bind(t).all(),s=new Map;for(const a of n.results||[])s.set(a.kind,bs(a));const r=[];for(const a of qa){const i=s.get(a);if(i)r.push(i);else{const o=kn(a);await Ka(e,t,o),r.push(o)}}return r}async function Es(e,t,n){const s=await e.prepare("SELECT * FROM digest_configs WHERE user_id = ? AND kind = ?").bind(t,n).first();if(s)return bs(s);const r=kn(n);return await Ka(e,t,r),r}async function Ka(e,t,n){await e.prepare(`INSERT OR IGNORE INTO digest_configs
        (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(t,n.kind,n.enabled?1:0,n.scheduleTime,n.scheduleWeekday,JSON.stringify(n.sections),JSON.stringify(n.notifyChannels),n.newsTopics.join(", ")).run()}async function Ya(e,t,n,s){await e.prepare(`INSERT INTO digest_configs
        (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, kind) DO UPDATE SET
         enabled = excluded.enabled,
         schedule_time = excluded.schedule_time,
         schedule_weekday = excluded.schedule_weekday,
         sections_json = excluded.sections_json,
         notify_channels_json = excluded.notify_channels_json,
         news_topics = excluded.news_topics,
         updated_at = CURRENT_TIMESTAMP`).bind(t,n,s.enabled?1:0,s.scheduleTime,s.scheduleWeekday,JSON.stringify(s.sections),JSON.stringify(s.notifyChannels),s.newsTopics.join(", ")).run()}function Sd(e){return new bn(e.db,e.userId,e.pinHash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET)}function kd(e){return new Ie(e.db,e.userId,e.pinHash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET)}function Ue(e,t,n=""){return{key:e,title:t,summary:n,items:[]}}function xd(e){return e?new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):""}async function Ja(e,t,n,s,r){try{const o=(await Sd(e).listEvents("primary",{timeMin:s,timeMax:r,maxResults:50})).map(l=>{var u,p,h,v,f;const d=((u=l.start)==null?void 0:u.dateTime)||((p=l.start)==null?void 0:p.date)||"";return{key:l.id||`cal-${d}-${l.summary}`,text:`${xd(d)} ${l.summary||"Untitled Event"}${l.location?` @ ${l.location}`:""}`,metadata:{title:l.summary,startTime:d,endTime:((h=l.end)==null?void 0:h.dateTime)||((v=l.end)==null?void 0:v.date)||"",location:l.location,attendees:(f=l.attendees)==null?void 0:f.map(g=>g.displayName||g.email)}}}),c=o.length===0?"Nothing scheduled":`${o.length} event${o.length===1?"":"s"}`;return{key:t,title:n,summary:c,items:o}}catch(a){return console.error(`[digest:calendar:${t}] fetch error:`,a==null?void 0:a.message),Ue(t,n)}}const Dd={key:"calendar_today",title:"Today",appliesTo:e=>e==="morning"||e==="email",fetch:e=>Ja(e,"calendar_today","Today",e.periodStart,e.periodEnd)},Rd={key:"calendar_tomorrow",title:"Tomorrow",appliesTo:e=>e==="evening",fetch:e=>{const t=new Date(e.periodEnd);t.setSeconds(t.getSeconds()+1);const n=new Date(t);return n.setHours(23,59,59,999),Ja(e,"calendar_tomorrow","Tomorrow",t.toISOString(),n.toISOString())}},Nd={key:"gmail_summary",title:"Gmail",appliesTo:()=>!0,fetch:async e=>{try{const t=kd(e),n=await t.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),s=await t.listMessages({query:"is:important is:unread",maxResults:10}),r={};for(const c of n){const l=c.from.split("<")[0].trim()||c.from;r[l]=(r[l]||0)+1}const a=Object.entries(r).sort(([,c],[,l])=>l-c).slice(0,5).map(([c])=>c),i=n.some(c=>c.subject.toLowerCase().includes("urgent")||c.subject.toLowerCase().includes("asap")||c.subject.toLowerCase().includes("immediately"));if(n.length===0)return{key:"gmail_summary",title:"Gmail",summary:"Inbox clear",items:[]};const o=[`📬 ${n.length} unread`];return s.length>0&&o.push(`★ ${s.length} important`),i&&o.push("⚠️ Urgent messages present"),a.length>0&&o.push(`From: ${a.slice(0,3).join(", ")}`),{key:"gmail_summary",title:"Gmail",summary:o.join(" · "),items:[{key:"gmail-unread",text:`Review ${n.length} unread Gmail messages`,metadata:{source:"gmail",count:n.length,importantCount:s.length,hasUrgent:i,topSenders:a}}]}}catch(t){return console.error("[digest:gmail_summary] fetch error:",t==null?void 0:t.message),Ue("gmail_summary","Gmail")}}},Id={key:"tasks_due",title:"Tasks",appliesTo:()=>!0,fetch:async e=>{try{const t=await e.db.prepare(`SELECT title, content, due_date
           FROM memory
           WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
           ORDER BY
             CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
             due_date ASC,
             importance DESC
           LIMIT 10`).bind(e.userId).all(),n=new Date,s=new Date(n);s.setDate(s.getDate()+1),s.setHours(23,59,59,999);const r=t.results||[],a=r.map(c=>{let l="";if(c.due_date){const d=new Date(c.due_date);l=d<=n?"overdue":d<=s?"due today":d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})}return{key:`task-${c.title}`,text:l?`${c.title} [${l}]`:c.title,metadata:{title:c.title,dueDate:c.due_date}}}),i=r.filter(c=>c.due_date?new Date(c.due_date)<=s:!1).length;return{key:"tasks_due",title:"Tasks",summary:a.length===0?"All clear":`${a.length} open${i>0?`, ${i} due today`:""}`,items:a}}catch(t){return console.error("[digest:tasks_due] fetch error:",t==null?void 0:t.message),Ue("tasks_due","Tasks")}}},Xs=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function Cd(e,t){try{const n=Math.floor((Date.now()-1728e5)/1e3),s=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${n},points>10`,r=await fetch(s,{headers:{"User-Agent":"Karna/1.0"}});return r.ok?((await r.json()).hits||[]).filter(i=>i.url&&!t.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}async function Od(e,t){const n=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],s=new Set;try{((await t.db.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(t.userId).all()).results||[]).forEach(c=>s.add(c.url))}catch{}const r=[];if(n.some(o=>Xs.some(c=>o.toLowerCase().includes(c.toLowerCase())))){const o=n.find(l=>Xs.some(d=>l.toLowerCase().includes(d.toLowerCase())))||"AI agents",c=await Cd(o,s);for(const l of c)r.push(l),s.add(l.url)}for(const o of n){if(r.length>=8)break;const c=`latest ${o} news today`;try{const l=await Ut(c,{num:5});if(l.results)for(const d of l.results){if(r.length>=8)break;s.has(d.link)||(r.push({title:d.title,summary:d.snippet,url:d.link,source:d.displayLink}),s.add(d.link))}}catch(l){console.error(`[digest:news] search error for "${c}":`,l==null?void 0:l.message)}}const i=r.slice(0,7);if(i.length>0)for(const o of i)try{await t.db.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(t.userId,o.url,o.title).run()}catch{}return i}const Ad={key:"news_ai",title:"Today's Signal",appliesTo:()=>!0,fetch:async e=>{try{const t=await Od(e.newsTopics,e);if(t.length===0)return Ue("news_ai","Today's Signal","No new items");const n=t.map(s=>({key:`news-${s.url}`,text:`📰 ${s.title}`,metadata:{url:s.url,source:s.source,summary:s.summary}}));return{key:"news_ai",title:"Today's Signal",summary:`${t.length} items`,items:n}}catch(t){return console.error("[digest:news_ai] fetch error:",t==null?void 0:t.message),Ue("news_ai","Today's Signal")}}};function Va(e){return e?new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):""}const Ld={key:"cron_jobs_today",title:"Today's Reminders",appliesTo:e=>e==="morning",fetch:async e=>{try{const s=((await e.db.prepare(`SELECT * FROM cron_jobs
           WHERE user_id = ? AND enabled = 1
           AND next_run IS NOT NULL AND next_run >= ? AND next_run <= ?
           ORDER BY next_run ASC`).bind(e.userId,e.periodStart,e.periodEnd).all()).results||[]).map(a=>({key:`cron-${a.id}`,text:`${Va(a.next_run)} ${a.name}`,metadata:{id:a.id,name:a.name,next_run:a.next_run,description:a.description}}));return{key:"cron_jobs_today",title:"Today's Reminders",summary:s.length===0?"No scheduled reminders":`${s.length} scheduled`,items:s}}catch(t){return console.error("[digest:cron_jobs_today] fetch error:",t==null?void 0:t.message),Ue("cron_jobs_today","Today's Reminders")}}},Md={key:"cron_completed",title:"Completed",appliesTo:e=>e==="weekly",fetch:async e=>{try{const n=(await e.db.prepare(`SELECT id, name, last_run FROM cron_jobs
           WHERE user_id = ? AND state = 'completed' AND last_run IS NOT NULL AND last_run >= ?
           ORDER BY last_run DESC LIMIT 20`).bind(e.userId,e.periodStart).all()).results||[],s=n.map(a=>({key:`cron-done-${a.id}`,text:a.name,metadata:{id:a.id,name:a.name,last_run:a.last_run}}));return{key:"cron_completed",title:"Completed",summary:`${n.length} completed`,items:s}}catch(t){return console.error("[digest:cron_completed] fetch error:",t==null?void 0:t.message),Ue("cron_completed","Completed")}}},$d={key:"cron_missed",title:"Missed / Overdue",appliesTo:e=>e==="weekly",fetch:async e=>{try{const s=((await e.db.prepare(`SELECT id, name, next_run FROM cron_jobs
           WHERE user_id = ? AND enabled = 1 AND next_run IS NOT NULL AND next_run < ?
           ORDER BY next_run DESC LIMIT 20`).bind(e.userId,e.periodEnd).all()).results||[]).map(a=>({key:`cron-missed-${a.id}`,text:`${a.name} (was due ${Va(a.next_run)})`,metadata:{id:a.id,name:a.name,next_run:a.next_run}}));return{key:"cron_missed",title:"Missed / Overdue",summary:s.length===0?"None missed":`${s.length} missed`,items:s}}catch(t){return console.error("[digest:cron_missed] fetch error:",t==null?void 0:t.message),Ue("cron_missed","Missed / Overdue")}}},Pd={key:"action_items_open",title:"Pending Actions",appliesTo:()=>!0,fetch:async e=>{try{const s=((await e.db.prepare(`SELECT id, title, priority, type, due_at FROM action_items
           WHERE user_id = ? AND status = 'pending'
             AND type NOT IN ('email_digest', 'weekly_review')
           ORDER BY
             CASE priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'normal' THEN 2 ELSE 3 END,
             created_at DESC
           LIMIT 15`).bind(e.userId).all()).results||[]).map(a=>({key:`action-${a.id}`,text:`${a.title} (${a.priority})`,metadata:{id:a.id,title:a.title,priority:a.priority,type:a.type,due_at:a.due_at}}));return{key:"action_items_open",title:"Pending Actions",summary:s.length===0?"None":`${s.length} pending`,items:s}}catch(t){return console.error("[digest:action_items_open] fetch error:",t==null?void 0:t.message),Ue("action_items_open","Pending Actions")}}},jd={key:"documents_recent",title:"Recent Documents",appliesTo:e=>e==="weekly",fetch:async e=>{try{const s=((await e.db.prepare(`SELECT id, name, status, created_at FROM document_library
           WHERE user_id = ? AND created_at >= ?
           ORDER BY created_at DESC LIMIT 10`).bind(e.userId,e.periodStart).all()).results||[]).map(a=>({key:`doc-${a.id}`,text:`${a.name} (${a.status})`,metadata:{id:a.id,name:a.name,status:a.status,created_at:a.created_at}}));return{key:"documents_recent",title:"Recent Documents",summary:s.length===0?"None this week":`${s.length} this week`,items:s}}catch(t){return console.error("[digest:documents_recent] fetch error:",t==null?void 0:t.message),Ue("documents_recent","Recent Documents")}}},Ud={key:"outlook_summary",title:"Outlook",appliesTo:e=>e==="email",fetch:async e=>{try{const t=await e.db.prepare(`SELECT name, encrypted_blob FROM site_credentials
           WHERE user_id = ?
             AND (name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE)
           LIMIT 1`).bind(e.userId,"%Outlook%","%Microsoft%","%Office 365%").first();if(!t)return{key:"outlook_summary",title:"Outlook",summary:"No Outlook credentials saved. Add them in Settings → Secret Vault.",items:[]};const n=await e.db.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(e.userId,"browser_use_api_key").first();if(!n)return{key:"outlook_summary",title:"Outlook",summary:"Browser Use API key not configured. Add it in Settings → API Keys.",items:[]};const s=(await G(n.encrypted_value,e.pinHash)).trim(),r=JSON.parse(await G(t.encrypted_blob,e.pinHash)),a=await as("Go to https://outlook.live.com or https://outlook.office.com. Log in with username {username} and password {password} if prompted. Navigate to the inbox and extract the 10 most recent emails with sender, subject, date, and snippet. Return the results as structured text.",s,{secrets:{username:r.username,password:r.password},timeoutMs:3e5});return a.status==="completed"&&a.output?{key:"outlook_summary",title:"Outlook",summary:"Inbox fetched",items:[{key:"outlook-inbox",text:"See digest for recent Outlook messages",metadata:{source:"outlook",output:a.output}}]}:a.status==="timeout"?{key:"outlook_summary",title:"Outlook",summary:"Browser task timed out.",items:[]}:{key:"outlook_summary",title:"Outlook",summary:"Outlook returned no content.",items:[]}}catch(t){return console.error("[digest:outlook_summary] fetch error:",t==null?void 0:t.message),Ue("outlook_summary","Outlook")}}},Za={calendar_today:Dd,calendar_tomorrow:Rd,gmail_summary:Nd,outlook_summary:Ud,tasks_due:Id,news_ai:Ad,cron_jobs_today:Ld,cron_completed:Md,cron_missed:$d,action_items_open:Pd,documents_recent:jd};function Bd(e){return Za[e]}function Hd(){return Object.values(Za)}function Fd(e,t=new Date){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function Wd(e,t,n=new Date,s=5){const r=new Date(n.toLocaleString("en-US",{timeZone:t||"Asia/Kolkata"})),a=r.getHours(),i=r.getMinutes(),[o,c]=e.scheduleTime.split(":").map(Number);if(!Number.isFinite(o)||!Number.isFinite(c)||e.scheduleWeekday&&r.toLocaleDateString("en-US",{weekday:"long"})!==e.scheduleWeekday)return!1;const l=a*60+i,d=o*60+c,u=l-d;return u>=0&&u<s}async function qd(e){const t=await e.prepare(`SELECT c.id, c.user_id, c.kind, c.enabled, c.schedule_time, c.schedule_weekday,
              c.sections_json, c.notify_channels_json, c.news_topics,
              c.created_at, c.updated_at,
              COALESCE(u.timezone, 'Asia/Kolkata') as timezone
       FROM digest_configs c
       JOIN users u ON u.id = c.user_id
       WHERE c.enabled = 1`).all(),n=[];for(const s of t.results||[]){const r=bs(s);n.push({userId:s.user_id,timezone:s.timezone||"Asia/Kolkata",config:r})}return n}async function Gd(e,t,n,s){return!!await e.prepare("SELECT 1 FROM digests WHERE user_id = ? AND kind = ? AND local_date = ? LIMIT 1").bind(t,n,s).first()}const Xa={morning:"☀️",evening:"🗓",weekly:"📊",email:"📧"},Qa={morning:"Morning Briefing",evening:"Evening Brief",weekly:"Weekly Review",email:"Email Digest"};function ei(e){const t=new Date(e.period.start),n=new Date(e.period.end),s=t.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),r=n.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});return s===r?s:`${s} – ${r}`}function zd(e){const[t,n]=e.split(":"),s=parseInt(t,10),r=n||"00",a=s>=12?"PM":"AM";return`${s===0?12:s>12?s-12:s}:${r} ${a}`}function Kd(e,t){const n=[];if(n.push(`${Xa[t.kind]} ${Qa[t.kind]} — ${zd(t.scheduleTime)} · ${ei(e)}`),n.push(""),e.highlights.length>0){for(const s of e.highlights)n.push(`▸ ${s}`);n.push("")}for(const s of e.sections){n.push(`${s.title}: ${s.summary}`);for(const r of s.items.slice(0,5))n.push(`   • ${r.text.substring(0,90)}${r.text.length>90?"…":""}`);n.push("")}return n.join(`
`).trimEnd()}function Yd(e,t){const n=`${Xa[t.kind]} ${Qa[t.kind]} · ${ei(e)}`;return e.highlights.length>0?`${n} — ${e.highlights[0]}`:n}function Jd(e,t){const n=[];for(const s of e.slice(0,10))n.push([{text:`☐ ${s.text.substring(0,40)}${s.text.length>40?"...":""}`,callback_data:`digest_toggle:${s.key}:${t}`}]);return n}const Vd=1e4;async function Qs(e,t){const n=new AbortController,s=setTimeout(()=>n.abort(),Vd);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(s)}}async function ti(e,t,n,s,r){const a=[],i=Kd(t,{kind:r.kind,scheduleTime:r.scheduleTime}),o=Yd(t,{kind:r.kind,scheduleTime:r.scheduleTime}),c=r.channels.includes("web"),l=r.channels.includes("ntfy"),d=r.channels.includes("telegram");if(c||l)try{await Ve(e,r.userId,o,i,{pinHash:r.pinHash,tags:["digest","karna"]}),c&&a.push("web"),l&&a.push("ntfy")}catch(u){ms("deliverDigest: notify failed",{userId:r.userId,error:u==null?void 0:u.message}),c&&a.push("web")}return d&&r.telegramChatId&&await Zd(e,r,i,n,s)&&a.push("telegram"),{deliveredChannels:a,digestId:s}}async function Zd(e,t,n,s,r){try{const a=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.userId).first();if(!a)return!1;const i=await G(a.encrypted_value,a.pin_hash);if(!(i!=null&&i.trim()))return ms("sendTelegramDigest: empty bot token",{userId:t.userId}),!1;const o=Jd(s,r),c={chat_id:t.telegramChatId,text:n.substring(0,4e3),parse_mode:"Markdown"};if(o.length>0&&(c.reply_markup={inline_keyboard:o}),(await(await Qs(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)})).json()).ok)return!0;const u={chat_id:t.telegramChatId,text:String(c.text).replace(/[_*[`\]]/g,"")};o.length>0&&(u.reply_markup={inline_keyboard:o});const h=await(await Qs(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)})).json();return h.ok?!0:(vt("Telegram digest send failed",{description:h.description,chatId:t.telegramChatId}),!1)}catch(a){return vt("Telegram digest error",{error:(a==null?void 0:a.message)||String(a)}),!1}}const Xd=Object.freeze(Object.defineProperty({__proto__:null,deliverDigest:ti},Symbol.toStringTag,{value:"Module"}));function Qd(e,t,n=new Date){const s=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(n),r=p=>{var h;return((h=s.find(v=>v.type===p))==null?void 0:h.value)||"0"},a=Number(r("year")),i=Number(r("month")),o=Number(r("day")),l=Date.UTC(a,i-1,o,Number(r("hour")),Number(r("minute")),Number(r("second")))-n.getTime(),d=Date.UTC(a,i-1,o,0,0,0,0),u=Date.UTC(a,i-1,o,23,59,59,999);if(e==="weekly"){const p=d-5184e5;return{start:new Date(p-l).toISOString(),end:new Date(u-l).toISOString()}}return{start:new Date(d-l).toISOString(),end:new Date(u-l).toISOString()}}function eu(e){const t=[];for(const n of e){if(t.length>=3)break;!n.summary||n.summary==="Nothing scheduled"||n.summary==="All clear"||n.summary==="None"||n.summary==="Inbox clear"||t.push(`${n.title}: ${n.summary}`)}return t}async function ni(e,t,n,s,r){const a=t.timezone||"Asia/Kolkata",i=await Es(e,t.id,n),o=new Date,c=Fd(a,o);if(!(r!=null&&r.force)&&await Gd(e,t.id,n,c)){const A=await er(e,t.id,n,c);if(A)return{digestId:A.digest.id,content:A.digest.content,items:[],deliveredChannels:A.digest.delivered_channels||"",skipped:!0}}const{start:l,end:d}=Qd(n,a,o),u={db:e,userId:t.id,pinHash:t.pin_hash,timezone:a,kind:n,periodStart:l,periodEnd:d,newsTopics:i.newsTopics,env:s},p=await Promise.all(i.sections.map(async x=>{const A=Bd(x);if(!A)return null;try{return await A.fetch(u)}catch(N){return console.error(`[digest:${n}] section ${x} failed:`,N==null?void 0:N.message),null}})),h={generatedAt:o.toISOString(),period:{start:l,end:d},sections:p.filter(x=>x!==null),highlights:[]};h.highlights=eu(h.sections);const v=[];let f=0;for(const x of h.sections)for(const A of x.items)v.push({section:x.key,key:A.key,text:A.text,metadata:A.metadata,sortOrder:f++});const g=await e.prepare(`INSERT OR IGNORE INTO digests (user_id, kind, content_json, period_start, period_end, local_date)
       VALUES (?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,n,JSON.stringify(h),l,d,c).first();let w=(g==null?void 0:g.id)||0,T="";if(w===0){const x=await er(e,t.id,n,c);x&&(w=x.digest.id,T=x.digest.delivered_channels||"")}else{for(const x of v)await e.prepare(`INSERT INTO digest_items (digest_id, section, item_key, text, metadata, sort_order)
           VALUES (?, ?, ?, ?, ?, ?)`).bind(w,x.section,x.key,x.text,JSON.stringify(x.metadata),x.sortOrder).run();(r==null?void 0:r.deliver)!==!1&&(T=(await ti(e,h,v,w,{userId:t.id,pinHash:t.pin_hash,telegramChatId:t.telegram_chat_id,kind:n,scheduleTime:i.scheduleTime,channels:i.notifyChannels})).deliveredChannels.join(","),await e.prepare("UPDATE digests SET delivered_channels = ? WHERE id = ?").bind(T,w).run())}return{digestId:w,content:h,items:v,deliveredChannels:T,skipped:w!==0&&v.length===0&&!(r!=null&&r.force)}}async function si(e,t){const n=await t.prepare("SELECT * FROM digest_items WHERE digest_id = ? ORDER BY sort_order ASC").bind(e.id).all();return{digest:{id:e.id,user_id:e.user_id,kind:e.kind,content:JSON.parse(e.content_json||"{}"),period_start:e.period_start,period_end:e.period_end,local_date:e.local_date,delivered_channels:e.delivered_channels||"",created_at:e.created_at},items:(n.results||[]).map(s=>({id:s.id,section:s.section,item_key:s.item_key,text:s.text,metadata:JSON.parse(s.metadata||"{}"),checked:s.checked,checked_at:s.checked_at,sort_order:s.sort_order}))}}async function ri(e,t,n){const s=await e.prepare("SELECT * FROM digests WHERE id = ? AND user_id = ?").bind(n,t).first();return s?si(s,e):null}async function er(e,t,n,s){const r=await e.prepare("SELECT * FROM digests WHERE user_id = ? AND kind = ? AND local_date = ? LIMIT 1").bind(t,n,s).first();return r?si(r,e):null}async function tu(e,t,n,s){if(!await e.prepare("SELECT id FROM digests WHERE id = ? AND user_id = ?").bind(n,t).first())return null;const a=await e.prepare("SELECT checked FROM digest_items WHERE id = ? AND digest_id = ?").bind(s,n).first();if(!a)return null;const i=a.checked?0:1;return await e.prepare(`UPDATE digest_items
       SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
       WHERE id = ? AND digest_id = ?`).bind(i,i,s,n).run(),{checked:i===1}}async function nu(e,t,n=20,s){let r="SELECT * FROM digests WHERE user_id = ?";const a=[t];return s&&(r+=" AND kind = ?",a.push(s)),r+=" ORDER BY created_at DESC LIMIT ?",a.push(n),((await e.prepare(r).bind(...a).all()).results||[]).map(o=>({id:o.id,user_id:o.user_id,kind:o.kind,content:JSON.parse(o.content_json||"{}"),period_start:o.period_start,period_end:o.period_end,local_date:o.local_date,delivered_channels:o.delivered_channels||"",created_at:o.created_at}))}async function su(e,t,n){await e.prepare("DELETE FROM digests WHERE id = ? AND user_id = ?").bind(n,t).run()}const De=new xe;async function ru(e,t){var r;if(e.req.path.includes("/cron/"))return t();const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}De.use("/*",ru);function ai(e){const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";return t===n}De.get("/",async e=>{const t=e.get("user"),n=Math.min(parseInt(e.req.query("limit")||"20"),100),s=e.req.query("kind"),a=s&&["morning","evening","weekly","email"].includes(s)?s:void 0;try{const i=await nu(e.env.DB,t.id,n,a);return e.json({digests:i})}catch(i){return e.json({error:i.message},500)}});De.get("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(!Number.isFinite(n))return e.json({error:"Invalid id"},400);try{const s=await ri(e.env.DB,t.id,n);return s?e.json(s):e.json({error:"Digest not found"},404)}catch(s){return e.json({error:s.message},500)}});De.post("/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=parseInt(e.req.param("itemId"));if(!Number.isFinite(n)||!Number.isFinite(s))return e.json({error:"Invalid id"},400);try{const r=await tu(e.env.DB,t.id,n,s);return r?e.json(r):e.json({error:"Item not found"},404)}catch(r){return e.json({error:r.message},500)}});De.post("/generate",async e=>{const t=e.get("user"),n=await e.req.json().catch(()=>({})),s=["morning","evening","weekly","email"],r=n.kind&&s.includes(n.kind)?n.kind:"evening";try{const a=await ni(e.env.DB,t,r,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET},{force:n.force===!0,deliver:!1});return e.json(a)}catch(a){return e.json({error:a.message},500)}});De.post("/:id/resend",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(!Number.isFinite(n))return e.json({error:"Invalid id"},400);try{const s=await ri(e.env.DB,t.id,n);if(!s)return e.json({error:"Digest not found"},404);const r=await Es(e.env.DB,t.id,s.digest.kind),a=s.items.map((l,d)=>({section:l.section,key:l.item_key,text:l.text,metadata:l.metadata,sortOrder:l.sort_order??d})),{deliverDigest:i}=await Promise.resolve().then(()=>Xd),o=await i(e.env.DB,s.digest.content,a,n,{userId:t.id,pinHash:t.pin_hash,telegramChatId:t.telegram_chat_id,kind:s.digest.kind,scheduleTime:r.scheduleTime,channels:r.notifyChannels}),c=o.deliveredChannels.join(",");return await e.env.DB.prepare("UPDATE digests SET delivered_channels = ? WHERE id = ?").bind(c,n).run(),o.deliveredChannels.length===0?e.json({error:"No channels delivered — check Settings for ntfy/Telegram config"},500):e.json({success:!0,deliveredChannels:o.deliveredChannels})}catch(s){return e.json({error:s.message},500)}});De.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(!Number.isFinite(n))return e.json({error:"Invalid id"},400);try{return await su(e.env.DB,t.id,n),e.json({success:!0})}catch(s){return e.json({error:s.message},500)}});De.get("/configs",async e=>{const t=e.get("user");try{const n=await Td(e.env.DB,t.id),s=Hd().map(r=>({key:r.key,title:r.title,appliesTo:{morning:r.appliesTo("morning"),evening:r.appliesTo("evening"),weekly:r.appliesTo("weekly"),email:r.appliesTo("email")}}));return e.json({configs:n,sections:s})}catch(n){return e.json({error:n.message},500)}});De.put("/configs",async e=>{const t=e.get("user"),n=e.req.query("kind");if(!n||!["morning","evening","weekly","email"].includes(n))return e.json({error:"Invalid or missing ?kind= parameter"},400);const r=await e.req.json().catch(()=>({})),a=Ed({enabled:r.enabled,scheduleTime:r.scheduleTime,scheduleWeekday:r.scheduleWeekday,sections:r.sections,notifyChannels:r.notifyChannels,newsTopics:r.newsTopics});if(a.length>0)return e.json({error:a.join("; ")},400);try{const i=await Es(e.env.DB,t.id,n),o={kind:n,enabled:r.enabled??i.enabled,scheduleTime:r.scheduleTime??i.scheduleTime,scheduleWeekday:r.scheduleWeekday===void 0?i.scheduleWeekday:r.scheduleWeekday,sections:r.sections??i.sections,notifyChannels:r.notifyChannels??i.notifyChannels,newsTopics:r.newsTopics??i.newsTopics};return await Ya(e.env.DB,t.id,n,o),e.json({success:!0,config:o})}catch(i){return e.json({error:i.message},500)}});De.post("/configs/reset",async e=>{const t=e.get("user"),n=e.req.query("kind");if(!n||!["morning","evening","weekly","email"].includes(n))return e.json({error:"Invalid or missing ?kind= parameter"},400);try{const r=bd().find(a=>a.kind===n);return await Ya(e.env.DB,t.id,n,r),e.json({success:!0,config:r})}catch(r){return e.json({error:r.message},500)}});De.post("/cron/tick",async e=>{if(!ai(e))return e.json({error:"Unauthorized"},401);try{const t=await qd(e.env.DB),n=new Date,s=[],r=[...new Set(t.map(o=>o.userId))];if(r.length===0)return e.json({executed:0,results:[]});const a=await e.env.DB.prepare(`SELECT * FROM users WHERE id IN (${r.map(()=>"?").join(",")})`).bind(...r).all(),i=new Map;for(const o of a.results||[])i.set(o.id,o);for(const{userId:o,timezone:c,config:l}of t){if(!Wd(l,c,n))continue;const d=i.get(o);if(d)try{const u=await ni(e.env.DB,d,l.kind,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET},{deliver:!0});s.push({user_id:o,kind:l.kind,status:u.skipped?"skipped":"success",digest_id:u.digestId,delivered_channels:u.deliveredChannels,schedule_time:l.scheduleTime,timezone:c})}catch(u){vt("digest cron tick user error",{userId:o,kind:l.kind,error:u==null?void 0:u.message}),s.push({user_id:o,kind:l.kind,status:"error",error:u.message})}}return e.json({executed:s.length,results:s})}catch(t){return e.json({error:t.message},500)}});De.post("/cron/meeting-reminders",async e=>{if(!ai(e))return e.json({error:"Unauthorized"},401);try{const t=await e.env.DB.prepare("SELECT * FROM users").all(),n=[],s=new Date,r=new Date(s.getTime()+600*1e3).toISOString(),a=new Date(s.getTime()+900*1e3).toISOString(),{decrypt:i}=await Promise.resolve().then(()=>sn),{sendNotification:o}=await Promise.resolve().then(()=>Ma);for(const c of t.results||[])try{const l=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(c.id).first();if(!l)continue;const d=await i(l.encrypted_value,c.pin_hash),p=JSON.parse(d).access_token;if(!p)continue;const h=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(s.toISOString())}&timeMax=${encodeURIComponent(a)}&maxResults=10`,{headers:{Authorization:`Bearer ${p}`}});if(!h.ok)continue;const f=((await h.json()).items||[]).filter(g=>{var T;const w=(T=g.start)==null?void 0:T.dateTime;return w?w>=s.toISOString()&&w<=r:!1});if(f.length===0){n.push({user_id:c.id,reminders_sent:0});continue}for(const g of f){const w=new Date(g.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),T=g.location?`
📍 ${g.location}`:"",x="Meeting in 10 minutes",A=`${g.summary||"Untitled Event"}
🕐 ${w}${T}`;await o(e.env.DB,c.id,x,A,{pinHash:c.pin_hash,priority:"high",tags:["calendar","karna"]})}n.push({user_id:c.id,reminders_sent:f.length})}catch(l){n.push({user_id:c.id,status:"error",error:l.message})}return e.json({executed:n.length,results:n})}catch(t){return e.json({error:t.message},500)}});const wt=new xe;async function an(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}function ii(e){return e.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"")}wt.post("/cron/review-low-confidence",async e=>{if((e.req.header("X-Cron-Secret")||"")!==(e.env.CRON_SECRET||"karna-cron-default-v1"))return e.json({error:"Unauthorized"},401);let n=0,s=0,r=0;try{const a=await e.env.DB.prepare(`SELECT DISTINCT u.id, u.pin_hash
       FROM users u
       JOIN user_skills us ON us.user_id = u.id
       WHERE us.is_auto = 1 AND us.enabled = 1
         AND us.confidence_score < 0.4 AND us.usage_count >= 5`).all();for(const i of a.results??[])try{const{provider:o}=await it(e.env.DB,i.id,i.pin_hash),c=await Dc(e.env.DB,o,i.id);n+=c.reviewed,s+=c.rewritten,r+=c.disabled}catch{}}catch(a){return e.json({error:a.message,reviewed:n,rewritten:s,disabled:r},500)}return e.json({reviewed:n,rewritten:s,disabled:r})});wt.get("/",an,async e=>{const t=e.get("user"),s=(await e.env.DB.prepare(`SELECT id, name, slug, description, instructions, parameters, required_tools, examples,
            enabled, usage_count, last_used_at, created_at, updated_at,
            is_auto, refinement_count, source, confidence_score
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`).bind(t.id).all()).results||[],r=s.filter(i=>!i.is_auto),a=s.filter(i=>i.is_auto);return e.json({skills:r,auto_skills:a})});wt.post("/",an,async e=>{var l,d,u;const t=e.get("user"),n=await e.req.json();if(!((l=n.name)!=null&&l.trim()))return e.json({error:"name is required"},400);if(!((d=n.description)!=null&&d.trim()))return e.json({error:"description is required"},400);if(!((u=n.instructions)!=null&&u.trim()))return e.json({error:"instructions is required"},400);let s=ii(n.name);s||(s=`skill_${Date.now()}`);const r=await e.env.DB.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(t.id,`${s}%`).all();r.results&&r.results.length>0&&r.results.map(h=>h.slug).includes(s)&&(s=`${s}_${r.results.length+1}`);const a=JSON.stringify(n.parameters||{}),i=JSON.stringify(n.required_tools||[]),o=JSON.stringify(n.examples||[]),c=await e.env.DB.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,n.name.trim(),s,n.description.trim(),n.instructions.trim(),a,i,o).first();return e.json({skill:c,created:!0})});wt.get("/:id",an,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(isNaN(n))return e.json({error:"Invalid skill ID"},400);const s=await e.env.DB.prepare("SELECT * FROM user_skills WHERE id = ? AND user_id = ?").bind(n,t.id).first();return s?e.json({skill:s}):e.json({error:"Skill not found"},404)});wt.put("/:id",an,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(isNaN(n))return e.json({error:"Invalid skill ID"},400);const s=await e.req.json(),r=[],a=[];return s.name!==void 0&&(r.push("name = ?","slug = ?"),a.push(s.name.trim(),ii(s.name))),s.description!==void 0&&(r.push("description = ?"),a.push(s.description.trim())),s.instructions!==void 0&&(r.push("instructions = ?"),a.push(s.instructions.trim())),s.parameters!==void 0&&(r.push("parameters = ?"),a.push(JSON.stringify(s.parameters))),s.required_tools!==void 0&&(r.push("required_tools = ?"),a.push(JSON.stringify(s.required_tools))),s.examples!==void 0&&(r.push("examples = ?"),a.push(JSON.stringify(s.examples))),s.enabled!==void 0&&(r.push("enabled = ?"),a.push(s.enabled?1:0)),s.promote&&r.push("is_auto = 0","source = 'user'"),r.length===0?e.json({error:"Nothing to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),await e.env.DB.prepare(`UPDATE user_skills SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});wt.delete("/:id",an,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return isNaN(n)?e.json({error:"Invalid skill ID"},400):(await e.env.DB.prepare("DELETE FROM user_skills WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0}))});const Oe=new xe;async function au(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}Oe.use("/*",au);function Zn(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}function oi(e){const t=Zn(e),n=new Date(t);n.setDate(n.getDate()+1),n.setHours(9,0,0,0);const s=new Date(n.toLocaleString("en-US",{timeZone:"UTC"})),r=new Date(n.toLocaleString("en-US",{timeZone:e})),a=s.getTime()-r.getTime();return new Date(n.getTime()+a)}function xn(e){if(!e)return null;if(e.startsWith("cron:")){const t=parseInt(e.replace("cron:",""),10);return isNaN(t)?null:t}return null}Oe.put("/:id/done",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Notification not found"},404);const r=xn(s.source);return r&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0,cron_completed:r!==null})});Oe.post("/:id/snooze",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json(),r=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!r)return e.json({error:"Notification not found"},404);let a;if(typeof s.minutes=="number")a=new Date(Date.now()+s.minutes*60*1e3);else if(s.until==="tomorrow_morning")a=oi(t.timezone||"UTC");else if(s.new_time)a=new Date(s.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(a.getTime()))return e.json({error:"Invalid time"},400);const i=a.toISOString(),o=xn(r.source);o&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(o,t.id).run();const c=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,r.title,r.body,"once",i,"reminder",JSON.stringify({description:r.body||""}),i,1,"active").first();return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0,job_id:c==null?void 0:c.id})});Oe.post("/:id/reschedule",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{new_time:s}=await e.req.json();if(!s)return e.json({error:"new_time is required"},400);const r=new Date(s);if(isNaN(r.getTime()))return e.json({error:"Invalid time"},400);const a=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!a)return e.json({error:"Notification not found"},404);const i=r.toISOString(),o=xn(a.source);if(o)return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,o,t.id).run(),e.json({success:!0,job_id:o});const c=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,a.title,a.body,"once",i,"reminder",JSON.stringify({description:a.body||""}),i,1,"active").first();return e.json({success:!0,job_id:c==null?void 0:c.id})});Oe.delete("/:id/cancel",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Notification not found"},404);const r=xn(s.source);return r&&await e.env.DB.prepare("UPDATE cron_jobs SET enabled = 0, state = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});Oe.post("/reminders/:id/snooze",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json();if(!await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first())return e.json({error:"Reminder not found"},404);let a;if(typeof s.minutes=="number")a=new Date(Date.now()+s.minutes*60*1e3);else if(s.until_tomorrow_9am)a=oi(t.timezone||"UTC");else if(s.new_time)a=new Date(s.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(a.getTime()))return e.json({error:"Invalid time"},400);const i=a.toISOString();return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,n,t.id).run(),e.json({success:!0})});Oe.post("/reminders/:id/done",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first()?(await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE source = ? AND user_id = ?").bind(`cron:${n}`,t.id).run(),e.json({success:!0})):e.json({error:"Reminder not found"},404)});const iu=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function ci(e,t,n){try{if(e==="once"){const s=new Date(t.replace(" ","T"));if(isNaN(s.getTime()))return null;const r=new Date(s.toLocaleString("en-US",{timeZone:"UTC"})),a=new Date(s.toLocaleString("en-US",{timeZone:n}));return new Date(s.getTime()+(r.getTime()-a.getTime()))}if(e==="daily"){const[s,r]=t.split(":").map(Number);if(isNaN(s)||isNaN(r))return null;const a=Zn(n),i=new Date(a);i.setHours(s,r,0,0),i<=a&&i.setDate(i.getDate()+1);const o=new Date(i.toLocaleString("en-US",{timeZone:"UTC"})),c=new Date(i.toLocaleString("en-US",{timeZone:n}));return new Date(i.getTime()+(o.getTime()-c.getTime()))}if(e==="weekly"){const s=t.split(" ");if(s.length<2)return null;const r=iu.indexOf(s[0]),[a,i]=s[1].split(":").map(Number);if(r===-1||isNaN(a)||isNaN(i))return null;const o=Zn(n),c=new Date(o);c.setHours(a,i,0,0);let l=(r-o.getDay()+7)%7;l===0&&c<=o&&(l=7),c.setDate(c.getDate()+l);const d=new Date(c.toLocaleString("en-US",{timeZone:"UTC"})),u=new Date(c.toLocaleString("en-US",{timeZone:n}));return new Date(c.getTime()+(d.getTime()-u.getTime()))}if(e==="interval"){const s=parseInt(t,10);return isNaN(s)||s<1?null:new Date(Date.now()+s*60*1e3)}}catch{}return null}Oe.get("/reminders",async e=>{const t=e.get("user"),{results:n}=await e.env.DB.prepare(`SELECT * FROM cron_jobs WHERE user_id = ? AND action_type = 'reminder'
     ORDER BY CASE WHEN enabled = 1 AND state NOT IN ('completed','paused') THEN 0 ELSE 1 END,
              next_run ASC NULLS LAST`).bind(t.id).all();return e.json({reminders:n||[]})});Oe.post("/reminders",async e=>{var o,c;const t=e.get("user"),n=await e.req.json();if(!((o=n.name)!=null&&o.trim()))return e.json({error:"Name is required"},400);if(!["once","daily","weekly","interval"].includes(n.schedule_type))return e.json({error:"Invalid schedule_type"},400);const r=t.timezone||"UTC",a=ci(n.schedule_type,n.schedule_value,r);if(!a)return e.json({error:"Invalid schedule_value for this schedule_type"},400);const i=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type,
       action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, 'reminder', ?, ?, 1, 'active') RETURNING id`).bind(t.id,n.name.trim(),((c=n.description)==null?void 0:c.trim())||"",n.schedule_type,n.schedule_value,JSON.stringify({description:n.description||""}),a.toISOString()).first();return e.json({success:!0,id:i==null?void 0:i.id})});Oe.patch("/reminders/:id",async e=>{var u,p;const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json(),r=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!r)return e.json({error:"Reminder not found"},404);const a=t.timezone||"UTC",i=s.schedule_type??r.schedule_type,o=s.schedule_value??r.schedule_value;let c=r.next_run;if(s.schedule_type!==void 0||s.schedule_value!==void 0){const h=ci(i,o,a);if(!h)return e.json({error:"Invalid schedule"},400);c=h.toISOString()}const l=s.enabled!==void 0?s.enabled?1:0:r.enabled,d=l?r.state==="completed"?"active":r.state:"paused";return await e.env.DB.prepare(`UPDATE cron_jobs SET name = ?, description = ?, schedule_type = ?, schedule_value = ?,
     next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`).bind(((u=s.name)==null?void 0:u.trim())??r.name,((p=s.description)==null?void 0:p.trim())??r.description,i,o,c,l,d,n,t.id).run(),e.json({success:!0})});Oe.delete("/reminders/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT id FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first()?(await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE source = ? AND user_id = ?").bind(`cron:${n}`,t.id).run(),e.json({success:!0})):e.json({error:"Reminder not found"},404)});const Be=new xe;function ou(e){return e.split(`
`).filter(t=>!/^(system:|assistant:|ignore previous|follow these instructions|tool:)/i.test(t.trim())).join(`
`).slice(0,4e3)}async function cu(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}Be.use("/*",cu);Be.get("/",async e=>{const t=e.get("user"),n=e.req.query("status"),s=e.req.query("search"),r=["user_id = ?"],a=[t.id];n&&(r.push("status = ?"),a.push(n)),s&&(r.push("(name LIKE ? OR summary LIKE ?)"),a.push(`%${s}%`,`%${s}%`));const i=`SELECT * FROM document_library WHERE ${r.join(" AND ")} ORDER BY created_at DESC`,o=await e.env.DB.prepare(i).bind(...a).all();return e.json({documents:o.results||[]})});Be.get("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return s?e.json({document:s}):e.json({error:"Document not found"},404)});Be.post("/upload",async e=>{const t=e.get("user"),n=!!e.env.DOCUMENTS_BUCKET,s=n?100*1024*1024:700*1024;try{const a=(await e.req.formData()).get("file");if(!a)return e.json({error:"No file provided."},400);const i=a.name,o=a.type||"application/octet-stream",c=a.size;if(c>s)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead.`},400);const l=await a.arrayBuffer(),d=crypto.randomUUID();let u;n?(await e.env.DOCUMENTS_BUCKET.put(d,l,{httpMetadata:{contentType:o},customMetadata:{fileName:i,userId:String(t.id)}}),u="r2"):u=Buffer.from(l).toString("base64"),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(d,t.id,i,o,u,c).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,d,"upload",i,o,c,"uploaded").run();const p=o==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||i.toLowerCase().endsWith(".docx");if(p)try{const{extractDocxTextFromBuffer:v}=await Promise.resolve().then(()=>ca),f=await v(Buffer.from(l));if(f.length>50){await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(f,d).run();const g=f.substring(0,600);await e.env.DB.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(g,f.substring(0,5e4),d,t.id).run();const w=e.env,T=t.id,x=f,A=d,N=(async()=>{try{const $=await w.DB.prepare("SELECT id FROM document_library WHERE file_id = ? AND user_id = ?").bind(A,T).first();if($){const{indexDocumentChunks:M}=await Promise.resolve().then(()=>st);await M({DB:w.DB,AI:w.AI,VECTORIZE:w.VECTORIZE},T,$.id,x)}}catch{}})();try{e.executionCtx.waitUntil(N)}catch{}}}catch{}const h=o==="application/pdf"||i.toLowerCase().endsWith(".pdf");if(h&&t.pin_hash){const v=Buffer.from(l).toString("base64"),f=t.pin_hash,g=t.id,w=e.env.DB,T=e.env.DOCUMENTS_BUCKET,x=e.env,A=(async()=>{var N,$;try{let M=null,z="claude-sonnet-4-6";const{decrypt:W}=await Promise.resolve().then(()=>sn);for(const Z of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const te=await w.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(g,Z).first();if(te){const ce=await W(te.encrypted_value,f),re=JSON.parse(ce);if(re.provider==="anthropic"){M=re.apiKey,re.model&&(z=re.model);break}}}catch{}if(!M)return;let ne=v;if(u==="r2"&&T){const Z=await T.get(d);if(!Z)return;ne=Buffer.from(await Z.arrayBuffer()).toString("base64")}const j=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":M,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:z,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:ne}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!j.ok)return;const q=(($=(N=(await j.json()).content)==null?void 0:N[0])==null?void 0:$.text)||"";if(q){await w.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(q,d).run();const Z=q.substring(0,600);await w.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(Z,q.substring(0,5e4),d,g).run();try{const te=await w.prepare("SELECT id FROM document_library WHERE file_id = ? AND user_id = ?").bind(d,g).first();if(te){const{indexDocumentChunks:ce}=await Promise.resolve().then(()=>st);await ce({DB:w,AI:x.AI,VECTORIZE:x.VECTORIZE},g,te.id,q)}}catch{}}}catch{}})();try{e.executionCtx.waitUntil(A)}catch{}}return e.json({file_id:d,name:i,type:o,size:c,storage:n?"r2":"d1",extracting:h&&!p})}catch(r){return console.error("Document upload error:",r),e.json({error:`Upload failed: ${r.message||"Unknown error"}`},500)}});Be.post("/search",async e=>{const t=e.get("user"),n=await e.req.json();if(!n.query)return e.json({error:"query is required"},400);const{semanticDocumentSearch:s}=await Promise.resolve().then(()=>st),r=await s({DB:e.env.DB,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE},t.id,n.query,Math.min(n.limit||5,20));return e.json({results:r})});Be.post("/chat",async e=>{var o;const t=e.get("user"),n=await e.req.json(),s=(n.question||n.query||"").trim();if(!s)return e.json({error:"question is required"},400);const{semanticDocumentSearch:r}=await Promise.resolve().then(()=>st),a=await r({DB:e.env.DB,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE},t.id,s,6);let i;if(a.length===0)i="No relevant document content found for your question. Make sure your documents have been uploaded and processed first.";else{const c=a.map((l,d)=>`[Source ${d+1}: ${l.filename} | chunk ${l.chunk_index}]
${ou(l.chunk)}`).join(`

---

`);try{const{provider:l}=await it(e.env.DB,t.id,t.pin_hash);i=((o=(await l.chat([{role:"system",content:"Answer using only the provided excerpts. For every key statement, cite sources as [S1], [S2], etc. Do not fabricate citations."},{role:"user",content:`Document excerpts:

${c}

Question: ${s}`}],{maxTokens:1024})).content)==null?void 0:o.trim())||"Could not generate an answer."}catch{i="Unable to generate an answer at this time. Please try again."}}return e.json({answer:i,session_id:n.session_id||crypto.randomUUID(),sources:a.map((c,l)=>({source_id:`S${l+1}`,filename:c.filename,chunk_index:c.chunk_index,relevance_score:c.relevance_score,retrieval_method:c.retrieval_method}))})});Be.post("/",async e=>{const t=e.get("user"),n=await e.req.json();if(!n.name||typeof n.name!="string")return e.json({error:"name is required"},400);const s=n.source||"upload",r=n.mime_type||"application/octet-stream",a=typeof n.size=="number"?n.size:0,i=await e.env.DB.prepare(`INSERT INTO document_library (user_id, name, source, file_id, drive_file_id, mime_type, size, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,n.name,s,n.file_id||null,n.drive_file_id||null,r,a,"uploaded").first();return e.json({success:!0,document:i})});Be.post("/:id/summarize",async e=>{var l;const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Document not found"},404);let r=null;if(s.file_id){const d=await e.env.DB.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(s.file_id,t.id).first();r=(d==null?void 0:d.extracted_text)||null}let a=null;if(r)try{const{provider:d}=await it(e.env.DB,t.id,t.pin_hash);a=((l=(await d.chat([{role:"system",content:"You are a helpful assistant that summarizes documents concisely."},{role:"user",content:`Summarize the following document in a few paragraphs:

${r.substring(0,8e3)}`}],{maxTokens:1024})).content)==null?void 0:l.trim())||null}catch{a=null}const i=a||"Summary not yet generated. Ask Karna in chat to summarize this document.";await e.env.DB.prepare("UPDATE document_library SET status = ?, summary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("summarized",i,n,t.id).run();const c=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return e.json({success:!0,document:c})});Be.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});Be.post("/:id/parse",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));await e.env.DB.prepare("UPDATE document_library SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("parsed",n,t.id).run();const s=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return e.json({success:!0,document:s})});const Ae=new xe;async function lu(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}Ae.use("/*",lu);Ae.get("/review",async e=>{const t=e.get("user"),n=e.req.query("tier"),s=e.req.query("type"),r=e.req.query("search"),a=parseInt(e.req.query("limit")||"50");let i="SELECT * FROM memory WHERE user_id = ?";const o=[t.id];n&&(i+=" AND tier = ?",o.push(n)),s&&(i+=" AND type = ?",o.push(s)),r&&(i+=" AND (title LIKE ? OR content LIKE ?)",o.push(`%${r}%`,`%${r}%`)),i+=" ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?",o.push(a);const c=await e.env.DB.prepare(i).bind(...o).all(),l=await e.env.DB.prepare("SELECT tier, COUNT(*) as cnt FROM memory WHERE user_id = ? GROUP BY tier").bind(t.id).all(),d={working:0,long_term:0};for(const u of l.results||[])d[u.tier]=u.cnt;return e.json({memories:c.results||[],tier_counts:d})});Ae.put("/review/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json(),r=[],a=[];return s.title!==void 0&&(r.push("title = ?"),a.push(s.title)),s.content!==void 0&&(r.push("content = ?"),a.push(s.content)),s.importance!==void 0&&(r.push("importance = ?"),a.push(s.importance)),s.tier!==void 0&&(r.push("tier = ?"),a.push(s.tier)),r.length===0?e.json({error:"Nothing to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),await e.env.DB.prepare(`UPDATE memory SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});Ae.post("/review/:id/promote",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new Q(e.env.DB).promote(n,t.id),e.json({success:!0})});Ae.post("/review/:id/demote",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new Q(e.env.DB).demote(n,t.id),e.json({success:!0})});Ae.delete("/review/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new Q(e.env.DB).remove(n,t.id),e.json({success:!0})});Ae.get("/suggestions",async e=>{const t=e.get("user"),n=e.req.query("status")||"pending",s=parseInt(e.req.query("limit")||"50"),r=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT ?").bind(t.id,n,s).all();return e.json({suggestions:r.results||[]})});Ae.post("/suggestions/:id/accept",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(n,t.id).first();return s?(await new Q(e.env.DB).store(t.id,s.type,s.title,s.content,s.importance,"long_term"),await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'accepted', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});Ae.post("/suggestions/:id/reject",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT id FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(n,t.id).first()?(await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'rejected', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});Ae.post("/suggestions",async e=>{const t=e.get("user"),{type:n,title:s,content:r,importance:a,source_message_id:i}=await e.req.json();if(!n||!s||!r)return e.json({error:"type, title, and content are required"},400);const o=await e.env.DB.prepare("INSERT INTO memory_suggestions (user_id, type, title, content, importance, status, source_message_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id").bind(t.id,n,s,r,a??5,"pending",i||null).first();return e.json({success:!0,id:o==null?void 0:o.id})});Ae.post("/migrate-documents-out",async e=>{const t=e.get("user"),s=(await e.env.DB.prepare(`
    SELECT id, type, title, content, importance
    FROM memory
    WHERE user_id = ?
      AND type NOT IN ('preference', 'fact', 'context', 'decision')
      AND (
        length(content) > 1500
        OR (
          lower(content) LIKE '%essay%'
          OR lower(content) LIKE '%article%'
          OR lower(content) LIKE '%draft%'
          OR lower(content) LIKE '%report%'
          OR lower(content) LIKE '%chapter%'
        )
      )
    ORDER BY length(content) DESC
    LIMIT 50
  `).bind(t.id).all()).results||[];if(s.length===0)return e.json({migrated:0,skipped:0,samples:[],message:"No oversized memory entries found."});let r=0,a=0;const i=[];for(const o of s){if(["preference","fact","context","decision"].includes(o.type)){a++;continue}const c=o.content.length>1500,l=/\b(essay|article|draft|report|chapter)\b/i.test(o.content)&&o.content.length>500;if(!c&&!l){a++;continue}try{const d=o.content.substring(0,500),u=o.content.substring(0,5e4);await e.env.DB.prepare(`
        INSERT INTO document_library (user_id, source, name, summary, extracted_text, status)
        VALUES (?, 'memory_migration', ?, ?, ?, 'parsed')
      `).bind(t.id,o.title,d,u).run();const p=`[Migrated to Document Library] ${o.title} — content moved to Document Library. Search for it with search_library("${o.title.substring(0,40)}").`;await e.env.DB.prepare("UPDATE memory SET content = ?, importance = 4, tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(p,o.id,t.id).run(),r++,i.length<5&&i.push({id:o.id,title:o.title,action:"migrated to document_library, memory demoted to pointer"})}catch{a++}}return e.json({migrated:r,skipped:a,samples:i,message:`Moved ${r} bulky memory entries to Document Library. ${a} entries were skipped (too short or migration error).`})});const _t=new xe;async function du(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}_t.use("/*",du);function Dn(e){return{id:e.id,title:e.title||"",content:e.content,tags:e.tags||"",source:e.source,source_query:e.source_query||"",is_pinned:e.is_pinned?1:0,created_at:e.created_at,updated_at:e.updated_at}}_t.get("/",async e=>{const t=e.get("user"),n=Math.min(parseInt(e.req.query("limit")||"50",10)||50,200),s=parseInt(e.req.query("offset")||"0",10)||0,r=e.req.query("tag"),a=e.req.query("pinned_only")==="true"||e.req.query("pinned_only")==="1",i=["user_id = ?"],o=[t.id];r&&(i.push("tags LIKE ?"),o.push(`%${r}%`)),a&&i.push("is_pinned = 1");const c=i.join(" AND "),l=await e.env.DB.prepare(`SELECT COUNT(*) as total FROM notes WHERE ${c}`).bind(...o).first();o.push(n,s);const d=await e.env.DB.prepare(`SELECT * FROM notes WHERE ${c} ORDER BY is_pinned DESC, updated_at DESC LIMIT ? OFFSET ?`).bind(...o).all();return e.json({notes:(d.results||[]).map(Dn),total:(l==null?void 0:l.total)||0})});_t.get("/search",async e=>{const t=e.get("user"),n=(e.req.query("q")||"").trim();if(!n)return e.json({notes:[]});const s=`%${n}%`,r=await e.env.DB.prepare(`SELECT * FROM notes WHERE user_id = ? AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
     ORDER BY updated_at DESC LIMIT 50`).bind(t.id,s,s,s).all();return e.json({notes:(r.results||[]).map(Dn)})});_t.post("/",async e=>{const t=e.get("user"),n=await e.req.json(),s=(n.content||"").trim();if(!s)return e.json({error:"content is required"},400);const r=n.source&&["manual","research","chat"].includes(n.source)?n.source:"manual",a=n.is_pinned?1:0,i=await e.env.DB.prepare(`INSERT INTO notes (user_id, title, content, tags, source, source_query, is_pinned)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     RETURNING *`).bind(t.id,(n.title||"").trim(),s,(n.tags||"").trim(),r,(n.source_query||"").trim(),a).first();return e.json({note:Dn(i)})});_t.put("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"),10);if(!n)return e.json({error:"Invalid note id"},400);if(!await e.env.DB.prepare("SELECT id FROM notes WHERE id = ? AND user_id = ?").bind(n,t.id).first())return e.json({error:"Note not found"},404);const r=await e.req.json(),a=[],i=[];if(r.title!==void 0&&(a.push("title = ?"),i.push(r.title)),r.content!==void 0){const c=r.content.trim();if(!c)return e.json({error:"content cannot be empty"},400);a.push("content = ?"),i.push(c)}if(r.tags!==void 0&&(a.push("tags = ?"),i.push(r.tags)),r.is_pinned!==void 0&&(a.push("is_pinned = ?"),i.push(r.is_pinned?1:0)),a.length===0)return e.json({error:"No fields to update"},400);a.push("updated_at = CURRENT_TIMESTAMP"),i.push(n,t.id);const o=await e.env.DB.prepare(`UPDATE notes SET ${a.join(", ")} WHERE id = ? AND user_id = ? RETURNING *`).bind(...i).first();return e.json({note:Dn(o)})});_t.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"),10);return n?(await e.env.DB.prepare("DELETE FROM notes WHERE id = ? AND user_id = ?").bind(n,t.id).run()).meta.changes?e.json({success:!0}):e.json({error:"Note not found"},404):e.json({error:"Invalid note id"},400)});const ge=new xe,uu=["/api/auth","/api/chat","/api/settings","/api/telegram","/api/system","/api/proactive","/api/digests","/api/skills","/api/notifications","/api/documents","/api/memory","/api/notes"];async function mu(e){const t=e.env.RENDER_BACKEND_URL,n=e.env.RENDER_API_SECRET;if(!(e.env.ENABLE_RENDER_PROXY==="true")||!t||!n||e.req.header("x-via-render-worker")||!uu.some(v=>e.req.path.startsWith(v)))return null;const a=new URL(e.req.url);a.protocol=new URL(t).protocol,a.host=new URL(t).host;const i=new Headers(e.req.header());i.set("x-render-api-secret",n);const o=e.req.path.startsWith("/api/chat")||e.req.path.startsWith("/api/telegram"),c=Number(e.env.RENDER_PROXY_TIMEOUT_MS_LONG||"310000"),l=Number(e.env.RENDER_PROXY_TIMEOUT_MS||"8000"),d=o?c:l,u=new AbortController,p=setTimeout(()=>u.abort("render-proxy-timeout"),d);let h;try{h=await fetch(a.toString(),{method:e.req.method,headers:i,body:e.req.method==="GET"||e.req.method==="HEAD"?void 0:await e.req.arrayBuffer(),signal:u.signal})}catch(v){return e.json({error:"Render backend unavailable",detail:String(v)},503)}finally{clearTimeout(p)}return new Response(h.body,{status:h.status,headers:h.headers})}ge.use("/api/*",so({exposeHeaders:["X-Thread-Id"]}));ge.use("/api/*",async(e,t)=>{const n=await mu(e);if(n)return n;await t()});ge.route("/api/auth",at);ge.route("/api/chat",le);ge.route("/api/settings",se);ge.route("/api/system",Ce);ge.route("/api/telegram",rn);ge.route("/api/proactive",be);ge.route("/api/digests",De);ge.route("/api/skills",wt);ge.route("/api/notifications",Oe);ge.route("/api/documents",Be);ge.route("/api/memory",Ae);ge.route("/api/notes",_t);ge.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),n=t.searchParams.get("code"),s=t.searchParams.get("state"),r=t.searchParams.get("error");if(r)return e.html(St(!1,`Google denied access: ${r}`));if(!n||!s)return e.html(St(!1,"Missing authorization code or state parameter."));try{const i=JSON.parse(atob(s)).sessionId;if(!i)return e.html(St(!1,"Invalid state parameter — missing session."));const o=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(i).first();if(!o)return e.html(St(!1,"Session expired. Please log in again and retry."));const c=o.user_id,l=o.pin_hash,d=`${t.protocol}//${t.host}/auth/google/callback`,u=await Fr(e.env.DB,c,l,n,d,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(St(!0,`Connected as ${u.email}`,u.email))}catch(a){return e.html(St(!1,`OAuth failed: ${a.message}`))}});ge.get("/preview-dashboard",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.html(Eo())));ge.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(Sr(e.env.API_BASE_URL||""))));ge.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(Sr(e.env.API_BASE_URL||""))));function St(e,t,n){return`<!DOCTYPE html>
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
  ${n?'<p class="email">'+n+"</p>":""}
  <a href="/" class="btn">Back to Karna</a>
</div>
<script>
  // Notify the opener window if this was opened in a popup
  if (window.opener) {
    window.opener.postMessage({ type: 'google_oauth_complete', success: ${e}, email: '${n||""}' }, '*');
    setTimeout(function() { window.close(); }, 2000);
  }
<\/script>
</body></html>`}const pu={fetch:ge.fetch},tr=new xe,hu=Object.assign({"/src/index.tsx":pu});let li=!1;for(const[,e]of Object.entries(hu))e&&(tr.all("*",t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),tr.notFound(t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),li=!0);if(!li)throw new Error("Can't import modules from ['/src/index.tsx']");function di(e){const t=e.trim();return/\b(call|invoke|execute|run)\s+\w+[\s(]/.test(t)||t.startsWith("> ")||/\$\w+/.test(t)?"tool_call":/^(hi|hello|hey|greetings|good (morning|afternoon|evening))\b/i.test(t)?"greeting":t.endsWith("?")?"question":/^(do|make|run|build|create|delete|update|fix|check|show|list|get|find|search|tell|explain|write|call|send)\s/i.test(t)?"command":/^(wait|actually|oh|i mean|sorry|nevermind|ignore|forget|let me|i'll|i am|i'm)[,\s]/i.test(t)?"meta":/\b(I think|I believe|it seems|maybe|perhaps|I wonder)/i.test(t)?"reflection":"statement"}function ui(e){const t=new Set;for(const s of e.match(/[a-z]+[A-Z][a-zA-Z]*/g)??[])t.add(s);for(const s of e.match(/[A-Z][a-z0-9_]+[A-Z]|[A-Z_]{2,}/g)??[])t.add(s);for(const s of e.match(/\b[\w.]+::\w+|\b\w+\.\w+\b/g)??[])t.add(s);const n=new Set(["The","This","That","These","Those","When","Then","Also","Some","More"]);for(const s of e.match(/\b[A-Z][a-z]{2,}(?:\s+[A-Z][a-z]{2,})*\b/g)??[])n.has(s)||t.add(s);for(const s of e.match(/"([^"]{2,50})"|'([^']{2,50})'/g)??[])t.add(s.slice(1,-1));for(const s of e.match(/#[a-zA-Z]\w*|@[a-zA-Z]\w*/g)??[])t.add(s);for(const s of e.match(/\bv?\d+\.\d+(?:\.\d+)?|\b\d+\.\d+\.\d+\.\d+\b/g)??[])t.add(s);for(const s of e.match(/\/\w+(?:\/\w+)+(?:\.\w+)?|\w+\/\w+\.\w+/g)??[])t.add(s);return Array.from(t).slice(0,20)}function mi(e){const t=e.trim().replace(/^(hi|hello|hey|so |okay |ok |um |uh |well )+/i,"").replace(/[?!.]$/,""),n=t.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/);if(n)return n[1].toLowerCase();const s=/^(the|a|an|to|for|with|of|in|on|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|should|could|can|may|might|must)$/i;return t.split(/\s+/).filter(a=>a.length>2&&!s.test(a)).slice(0,3).join(" ").toLowerCase()||"unknown"}function pi(e,t=0){let n=.5;const s=e.split(/\s+/).length;return s>=10&&s<=50?n+=.2:s>50?n+=.1:s<5&&(n-=.15),e.includes("?")&&(n+=.1),e.includes("!")&&(n+=.1),/```|`/.test(e)&&(n+=.1),/https?:\/\/|www\./.test(e)&&(n+=.05),/\/\w+(\/\w+)*\.\w+/.test(e)&&(n+=.05),Math.min(1,Math.max(0,n))}function hi(e){if(/\b(hate|stuck|broken|terrible|awful|annoying|frustrated|can't|cannot|impossible|wrong|bug|issue|problem)\b/i.test(e))return"frustrated";if(/\b(love|amazing|awesome|perfect|great|excellent|fantastic|excited|yay|wow|incredible)\b/i.test(e))return"excited";if(/\b(maybe|perhaps|I think|I believe|I guess|not sure|not certain|might|could be|possibly)\b/i.test(e))return"uncertain"}function fu(e,t,n,s,r,a){return{user_id:e,conversation_id:t,role:n,intent:di(s),entities:ui(s),topic:mi(s),importance:pi(s,0),emotional_tone:hi(s),raw_ref:`conv:${t}:msg:${r}`,occurred_at:a,created_at:new Date().toISOString()}}const gu=Object.freeze(Object.defineProperty({__proto__:null,classifyIntent:di,computeImportance:pi,detectEmotionalTone:hi,extractEntities:ui,extractSignal:fu,extractTopic:mi},Symbol.toStringTag,{value:"Module"})),yu=4e3,vu=4,wu=5;function _u(e){return Math.ceil(e.length/vu)}function bu(e,t){const n=new Set([...e.topic.split(/\s+/),...e.entities??[]]),s=new Set([...t.topic.split(/\s+/),...t.entities??[]]);if(n.size===0&&s.size===0)return 0;let r=0;for(const a of n)s.has(a)&&r++;return r/Math.max(n.size,s.size)}function fi(e,t=.3){const n=[],s=new Set;for(let r=0;r<e.length;r++){if(s.has(r))continue;const a=[e[r]];s.add(r);for(let i=r+1;i<e.length;i++)s.has(i)||bu(e[r],e[i])>=t&&(a.push(e[i]),s.add(i));n.push(a)}return n}function Eu(e){var c;const t=e.flatMap(l=>l.entities??[]),n=new Map;for(const l of t)n.set(l,(n.get(l)??0)+1);const r=((c=Array.from(n.entries()).sort((l,d)=>d[1]-l[1])[0])==null?void 0:c[0])??e[0].topic,i=e.map(l=>{const d=l.raw_ref.split(":");return`[${d[1]??"?"}/${d[3]??"?"}]: ${l.topic}`}).join(`
`)+`

[${e.length} similar messages compressed into this summary]`,o=[...new Set(t)].slice(0,10);return{title:r,content:i,entities:o}}async function Tu(e,t,n){const s=await t.prepare("SELECT id FROM signals WHERE user_id = ? ORDER BY occurred_at DESC LIMIT ?").bind(n,wu).all(),r=new Set((s.results??[]).map(u=>u.id));let a;if(r.size===0)a=(await t.prepare("SELECT * FROM signals WHERE user_id = ? ORDER BY occurred_at ASC").bind(n).all()).results??[];else{const u=[...r].map(()=>"?").join(",");a=(await t.prepare(`SELECT * FROM signals WHERE user_id = ? AND id NOT IN (${u}) ORDER BY occurred_at ASC`).bind(n,...r).all()).results??[]}if(a.length===0)return{compressedCount:0,summaryId:0,clusterCount:0};const i=a.map(u=>({...u,entities:typeof u.entities=="string"?JSON.parse(u.entities):u.entities??[]}));if(i.reduce((u,p)=>u+_u(`${p.topic} ${(p.entities??[]).join(" ")}`),0)<yu)return{compressedCount:0,summaryId:0,clusterCount:0};const c=fi(i);let l=0,d=0;for(const u of c){if(u.length<2)continue;const{title:p,content:h,entities:v}=Eu(u),f=u[0].occurred_at,g=await e.storeTyped({userId:n,type:"episodic",title:`compressed: ${p}`,content:h,occurredAt:f,source:"inferred:compression",entities:v,tier:"long_term"});for(const w of u)await t.prepare(`UPDATE conversations SET metadata = json_set(COALESCE(metadata, '{}'), '$.superseded', datetime('now'))
         WHERE id = ? AND user_id = ?`).bind(w.conversation_id,n).run();l+=u.length,d=g}return{compressedCount:l,summaryId:d,clusterCount:c.length}}async function Su(e,t,n=20){return((await e.prepare("SELECT * FROM signals WHERE user_id = ? ORDER BY occurred_at DESC LIMIT ?").bind(t,n).all()).results??[]).reverse().map(a=>({...a,entities:typeof a.entities=="string"?JSON.parse(a.entities):a.entities??[]}))}const jn=Object.freeze(Object.defineProperty({__proto__:null,clusterSignals:fi,compressShortTermMemory:Tu,getRecentSignals:Su},Symbol.toStringTag,{value:"Module"})),Un={user:1,"tool:eddy":.85,"inferred:compression":.7,inferred:.5,default:.7},ku=.4,xu=.25,Du=.2,Ru=.15,gi=5;function Nu(e){return e?Un[e]??Un.default:Un.default}function Iu(e){return e.vectorScore*.55+e.keywordScore*.25}function Cu(e,t){const n=JSON.parse(e.entities||"[]");if(n.length===0)return 0;let s=0;for(const r of t){if(r.id===e.id)continue;const a=JSON.parse(r.entities||"[]");for(const i of n)if(a.includes(i)){s++;break}if(s>=gi)break}return s}function Ou(e,t){const{memory:n}=e,s=Iu(e),r=e.decayScore,a=Nu(n.source),i=Cu(n,t),o=Math.min(i/gi,1),c=ku*s+xu*r+Du*a+Ru*o,l=c>=.8?"high":c>=.4?"medium":"low",d=Au({confidence:c,retrieval_similarity:s,decay_score:r,source_trust:a,corroboration_count:i,source:n.source,title:n.title});return{memory:n,confidence:c,breakdown:{retrieval_similarity:s,decay_score:r,source_trust:a,corroboration_count:i,corroboration_normalized:o},reasoning:d,tier:l}}function Au(e){const{confidence:t,retrieval_similarity:n,decay_score:s,source_trust:r,corroboration_count:a}=e,i=[];return n>.7?i.push("strong semantic match"):n>.4?i.push("moderate semantic match"):i.push("weak semantic match"),s>.8?i.push("recently accessed"):s>.5?i.push("moderately recent"):s<.2&&i.push("not accessed recently"),r>=1?i.push("from user direct input"):r>=.8?i.push("from trusted tool"):r<.6&&i.push("inferred by Karna"),a>=3?i.push(`${a} corroborating memories`):a===1?i.push("1 corroborating memory"):i.push("no corroborating memories"),`${Math.round(t*100)}% confidence: ${i.join("; ")}.`}function Lu(e){switch(e){case"high":return"I'm confident that";case"medium":return"Based on what I recall";case"low":return"I'm not sure about this, but"}}function nr(e){switch(e){case"high":return`

[Memory confidence: high — answer directly]`;case"medium":return`

[Memory confidence: medium — acknowledge uncertainty in your response]`;case"low":return`

[Memory confidence: low — indicate you don't have reliable information. Suggest how to find out.]`}}async function Mu(e,t,n,s={}){const{limit:r=5,type:a,minConfidence:i=0,returnAllAboveMin:o=!1}=s,c=await e.searchHybrid(t,n,{limit:r*3,type:a});if(c.length===0)return{results:[],overallConfidence:"low",systemPromptSuffix:nr("low"),unmetQuery:n};const l=await e.getByDecayScore(t,.3,{limit:200}),d=c.map(f=>Ou(f,l));d.sort((f,g)=>g.confidence-f.confidence);const u=d.filter(f=>f.confidence>=i),p=o?u:u.slice(0,r),h=p.length>0?p.slice(0,3).reduce((f,g)=>f+g.confidence,0)/Math.min(p.length,3):0,v=h>=.8?"high":h>=.4?"medium":"low";return{results:p,overallConfidence:v,systemPromptSuffix:nr(v),unmetQuery:p.length===0?n:void 0}}function yi(e){const t=Lu(e.tier),n=e.memory;return`[${e.tier.toUpperCase()} ${Math.round(e.confidence*100)}%] ${t} ${n.content}`}function $u(e){return e.length===0?"":e.map(t=>yi(t)).join(`
`)}function Pu(e){return`I don't have reliable information about "${e}" in my memory. Here's how I can help find out:

1. **Search the web** — I can look this up for you
2. **Ask me more specifically** — narrowing the topic helps
3. **Check my tools** — I can query other systems you've connected

What would you like me to do?`}const Ye=Object.freeze(Object.defineProperty({__proto__:null,buildConfidenceContext:$u,formatConfidenceContext:yi,generateUncertaintyResponse:Pu,searchWithConfidence:Mu},Symbol.toStringTag,{value:"Module"}));function vi(e){if(e.length<100)return e.trim()?[e.trim()]:[];const r=[];let a=0;for(;a<e.length;){let i=Math.min(a+1800,e.length);if(i<e.length){const c=e.lastIndexOf(`

`,i);if(c>a+1800/2)i=c+2;else{const l=e.lastIndexOf(". ",i);l>a+1800/2&&(i=l+2)}}const o=e.slice(a,i).trim();o.length>=100&&r.push(o),a=i-200,a<=0&&(a=i)}return r}async function ju(e,t,n,s){if(!e.AI||!e.VECTORIZE)return;const r=vi(s);if(r.length===0)return;const a=await e.DB.prepare("SELECT vector_id FROM document_chunks WHERE document_id = ?").bind(n).all();a.results.length>0&&(await e.VECTORIZE.deleteByIds(a.results.map(d=>d.vector_id)),await e.DB.prepare("DELETE FROM document_chunks WHERE document_id = ?").bind(n).run());const o=(await e.AI.run("@cf/baai/bge-large-en-v1.5",{text:r})).data,c=r.map((d,u)=>`doc_${n}_${u}`);await e.VECTORIZE.insert(r.map((d,u)=>({id:c[u],values:o[u],metadata:{userId:String(t),documentId:String(n)}})));const l=e.DB.prepare("INSERT INTO document_chunks (user_id, document_id, chunk_index, text, vector_id) VALUES (?, ?, ?, ?, ?)");await e.DB.batch(r.map((d,u)=>l.bind(t,n,u,d,c[u])))}async function Uu(e,t,n,s=5){if(!e.AI||!e.VECTORIZE)return[];const a=(await e.AI.run("@cf/baai/bge-large-en-v1.5",{text:[n]})).data[0],i=await e.VECTORIZE.query(a,{topK:s*3,filter:{userId:String(t)}});if(!i.matches||i.matches.length===0)return[];const o=i.matches.map(f=>f.id),c=new Map(i.matches.map(f=>[f.id,f.score])),l=o.map(()=>"?").join(","),u=((await e.DB.prepare(`SELECT dc.text, dc.vector_id, dc.document_id, dl.name, dc.chunk_index
     FROM document_chunks dc
     JOIN document_library dl ON dc.document_id = dl.id
     WHERE dc.vector_id IN (${l}) AND dc.user_id = ?`).bind(...o,t).all()).results||[]).map(f=>({filename:f.name,relevance_score:c.get(f.vector_id)??0,chunk:f.text,document_id:f.document_id,chunk_index:f.chunk_index,retrieval_method:"vector"})),h=((await e.DB.prepare(`SELECT dc.text, dc.document_id, dc.chunk_index, dl.name
     FROM document_chunks dc
     JOIN document_library dl ON dc.document_id = dl.id
     WHERE dc.user_id = ? AND dc.text LIKE ?
     ORDER BY dc.chunk_index DESC
     LIMIT ?`).bind(t,`%${n.substring(0,80)}%`,s*2).all()).results||[]).map(f=>({filename:f.name,relevance_score:.55,chunk:f.text,document_id:f.document_id,chunk_index:f.chunk_index,retrieval_method:"keyword"})),v=new Map;for(const f of[...u,...h]){const g=`${f.document_id}:${f.chunk_index}`;if(!v.has(g))v.set(g,f);else{const w=v.get(g);v.set(g,{...w,relevance_score:Math.max(w.relevance_score,f.relevance_score),retrieval_method:"hybrid"})}}return[...v.values()].sort((f,g)=>g.relevance_score-f.relevance_score).slice(0,s)}const st=Object.freeze(Object.defineProperty({__proto__:null,chunkText:vi,indexDocumentChunks:ju,semanticDocumentSearch:Uu},Symbol.toStringTag,{value:"Module"}));var Bn={};function Bu(){return typeof process<"u"&&(Bn==null?void 0:Bn.EDDY_BASE_URL)||typeof globalThis<"u"&&globalThis.EDDY_BASE_URL||""}async function Hu(e){const t=Bu();if(!t)return{success:!1,error:"EDDY_BASE_URL not configured",source:"eddy:config"};try{const n=new AbortController,s=setTimeout(()=>n.abort(),1e4),r=await fetch(`${t}/api/recall`,{method:"POST",headers:{"Content-Type":"application/json","X-Karna-Integration":"true"},body:JSON.stringify({...e,limit:e.limit??5}),signal:n.signal});return clearTimeout(s),r.ok?{...await r.json(),success:!0}:{success:!1,error:`Eddy returned ${r.status}: ${r.statusText}`,source:"eddy:error"}}catch(n){return n instanceof Error&&n.name==="AbortError"?{success:!1,error:"Eddy request timed out after 10s",source:"eddy:timeout"}:{success:!1,error:n instanceof Error?n.message:"Unknown error calling Eddy",source:"eddy:error"}}}async function Fu(e,t,n,s){var d,u;const{forceToolCall:r=!1}=s??{},a=await e.searchWithConfidence(t,n,{limit:5}),i=a.overallConfidence==="high"||a.overallConfidence==="medium",o=a.results.length>0;if(i&&o&&!r){const{buildConfidenceContext:p}=await Promise.resolve().then(()=>Ye);return{answer:p(a.results),source:"memory",confidence:((d=a.results[0])==null?void 0:d.confidence)??.5,memorySaved:!1}}const c=await Hu({query:n});if(!c.success){if(o){const{buildConfidenceContext:p}=await Promise.resolve().then(()=>Ye);return{answer:p(a.results)+`

*[Note: I tried Eddy's records for more detail but couldn't reach it.]*`,source:"memory",confidence:((u=a.results[0])==null?void 0:u.confidence)??.3,memorySaved:!1,error:c.error}}return{answer:`I don't have this in memory, and couldn't reach Eddy's records (${c.error}). Try checking Eddy directly.`,source:"uncertain",confidence:0,memorySaved:!1,error:c.error}}let l=!1;try{c.showName&&(await e.storeTyped({userId:t,type:"episodic",title:`${c.showName} — gear used`,content:Wu(c),occurredAt:c.date??new Date().toISOString(),source:"tool:eddy",entities:[c.showName,...(c.gear??[]).map(p=>p.model),...(c.crew??[]).map(p=>p.name)].filter(Boolean),tier:"long_term"}),l=!0)}catch(p){console.warn("[federation] Failed to save Eddy response to memory:",p)}return{answer:qu(c),source:"eddy",confidence:1,eddyResponse:c,memorySaved:l}}function Wu(e){var n,s;const t=[];return e.showName&&t.push(`Show: ${e.showName}`),e.date&&t.push(`Date: ${e.date}`),e.venue&&t.push(`Venue: ${e.venue}`),(n=e.gear)!=null&&n.length&&t.push(`Gear: ${e.gear.map(r=>`${r.qty}x ${r.model} (${r.type})`).join(", ")}`),(s=e.crew)!=null&&s.length&&t.push(`Crew: ${e.crew.map(r=>`${r.name} (${r.role})`).join(", ")}`),e.notes&&t.push(`Notes: ${e.notes}`),t.join(`
`)}function qu(e){var n,s;if(!e.success||!e.showName)return"I checked Eddy's records but couldn't find anything matching that query.";const t=[];if(t.push(`**${e.showName}** (${e.date??"date unknown"})`),e.venue&&t.push(`at ${e.venue}`),t.push(""),(n=e.gear)!=null&&n.length){t.push("**Gear used:**");for(const r of e.gear)t.push(`- ${r.qty}× ${r.model} (${r.type})${r.notes?` — ${r.notes}`:""}`)}return(s=e.crew)!=null&&s.length&&t.push(`**Crew:** ${e.crew.map(r=>`${r.name} (${r.role})`).join(", ")}`),e.notes&&t.push(`_Notes: ${e.notes}_`),t.push(`
_[Source: Eddy — ${e.source}]_`),t.join(`
`)}const wi=Object.freeze(Object.defineProperty({__proto__:null,answerWithFederation:Fu},Symbol.toStringTag,{value:"Module"}));export{tr as default};
