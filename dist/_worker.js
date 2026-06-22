var La=Object.defineProperty;var rs=e=>{throw TypeError(e)};var Ma=(e,t,n)=>t in e?La(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var U=(e,t,n)=>Ma(e,typeof t!="symbol"?t+"":t,n),yn=(e,t,n)=>t.has(e)||rs("Cannot "+n);var D=(e,t,n)=>(yn(e,t,"read from private field"),n?n.call(e):t.get(e)),V=(e,t,n)=>t.has(e)?rs("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),F=(e,t,n,s)=>(yn(e,t,"write to private field"),s?s.call(e,n):t.set(e,n),n),ee=(e,t,n)=>(yn(e,t,"access private method"),n);var as=(e,t,n,s)=>({set _(r){F(e,t,r,n)},get _(){return D(e,t,s)}});var is=(e,t,n)=>(s,r)=>{let a=-1;return i(0);async function i(o){if(o<=a)throw new Error("next() called multiple times");a=o;let l,c=!1,d;if(e[o]?(d=e[o][0][0],s.req.routeIndex=o):d=o===e.length&&r||void 0,d)try{l=await d(s,()=>i(o+1))}catch(u){if(u instanceof Error&&t)s.error=u,l=await t(u,s),c=!0;else throw u}else s.finalized===!1&&n&&(l=await n(s));return l&&(s.finalized===!1||c)&&(s.res=l),s}},$a=Symbol(),ja=async(e,t=Object.create(null))=>{const{all:n=!1,dot:s=!1}=t,a=(e instanceof zs?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?Pa(e,{all:n,dot:s}):{}};async function Pa(e,t){const n=await e.formData();return n?Ba(n,t):{}}function Ba(e,t){const n=Object.create(null);return e.forEach((s,r)=>{t.all||r.endsWith("[]")?Ua(n,r,s):n[r]=s}),t.dot&&Object.entries(n).forEach(([s,r])=>{s.includes(".")&&(Ha(n,s,r),delete n[s])}),n}var Ua=(e,t,n)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]:t.endsWith("[]")?e[t]=[n]:e[t]=n},Ha=(e,t,n)=>{let s=e;const r=t.split(".");r.forEach((a,i)=>{i===r.length-1?s[a]=n:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},Hs=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Fa=e=>{const{groups:t,path:n}=Wa(e),s=Hs(n);return qa(s,t)},Wa=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(n,s)=>{const r=`@${s}`;return t.push([r,n]),r}),{groups:t,path:e}},qa=(e,t)=>{for(let n=t.length-1;n>=0;n--){const[s]=t[n];for(let r=e.length-1;r>=0;r--)if(e[r].includes(s)){e[r]=e[r].replace(s,t[n][1]);break}}return e},Xt={},Ga=(e,t)=>{if(e==="*")return"*";const n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const s=`${e}#${t}`;return Xt[s]||(n[2]?Xt[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,n[1],new RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],new RegExp(`^${n[2]}$`)]:Xt[s]=[e,n[1],!0]),Xt[s]}return null},$n=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return t(n)}catch{return n}})}},za=e=>$n(e,decodeURI),Fs=e=>{const t=e.url,n=t.indexOf("/",t.indexOf(":")+4);let s=n;for(;s<t.length;s++){const r=t.charCodeAt(s);if(r===37){const a=t.indexOf("?",s),i=t.indexOf("#",s),o=a===-1?i===-1?void 0:i:i===-1?a:Math.min(a,i),l=t.slice(n,o);return za(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(r===63||r===35)break}return t.slice(n,s)},Ka=e=>{const t=Fs(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},yt=(e,t,...n)=>(n.length&&(t=yt(t,...n)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Ws=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),n=[];let s="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))s+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){n.length===0&&s===""?n.push("/"):n.push(s);const a=r.replace("?","");s+="/"+a,n.push(s)}else s+="/"+r}),n.filter((r,a,i)=>i.indexOf(r)===a)},vn=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?$n(e,Gs):e):e,qs=(e,t,n)=>{let s;if(!n&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const o=e.charCodeAt(i+t.length+1);if(o===61){const l=i+t.length+2,c=e.indexOf("&",l);return vn(e.slice(l,c===-1?void 0:c))}else if(o==38||isNaN(o))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const r={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let o=e.indexOf("=",a);o>i&&i!==-1&&(o=-1);let l=e.slice(a+1,o===-1?i===-1?void 0:i:o);if(s&&(l=vn(l)),a=i,l==="")continue;let c;o===-1?c="":(c=e.slice(o+1,i===-1?void 0:i),s&&(c=vn(c))),n?(r[l]&&Array.isArray(r[l])||(r[l]=[]),r[l].push(c)):r[l]??(r[l]=c)}return t?r[t]:r},Ya=qs,Ja=(e,t)=>qs(e,t,!0),Gs=decodeURIComponent,os=e=>$n(e,Gs),Et,Se,Fe,Ks,Ys,xn,qe,Ms,zs=(Ms=class{constructor(e,t="/",n=[[]]){V(this,Fe);U(this,"raw");V(this,Et);V(this,Se);U(this,"routeIndex",0);U(this,"path");U(this,"bodyCache",{});V(this,qe,e=>{const{bodyCache:t,raw:n}=this,s=t[e];if(s)return s;const r=Object.keys(t)[0];return r?t[r].then(a=>(r==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=n[e]()});this.raw=e,this.path=t,F(this,Se,n),F(this,Et,{})}param(e){return e?ee(this,Fe,Ks).call(this,e):ee(this,Fe,Ys).call(this)}query(e){return Ya(this.url,e)}queries(e){return Ja(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((n,s)=>{t[s]=n}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await ja(this,e))}json(){return D(this,qe).call(this,"text").then(e=>JSON.parse(e))}text(){return D(this,qe).call(this,"text")}arrayBuffer(){return D(this,qe).call(this,"arrayBuffer")}blob(){return D(this,qe).call(this,"blob")}formData(){return D(this,qe).call(this,"formData")}addValidatedData(e,t){D(this,Et)[e]=t}valid(e){return D(this,Et)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[$a](){return D(this,Se)}get matchedRoutes(){return D(this,Se)[0].map(([[,e]])=>e)}get routePath(){return D(this,Se)[0].map(([[,e]])=>e)[this.routeIndex].path}},Et=new WeakMap,Se=new WeakMap,Fe=new WeakSet,Ks=function(e){const t=D(this,Se)[0][this.routeIndex][1][e],n=ee(this,Fe,xn).call(this,t);return n&&/\%/.test(n)?os(n):n},Ys=function(){const e={},t=Object.keys(D(this,Se)[0][this.routeIndex][1]);for(const n of t){const s=ee(this,Fe,xn).call(this,D(this,Se)[0][this.routeIndex][1][n]);s!==void 0&&(e[n]=/\%/.test(s)?os(s):s)}return e},xn=function(e){return D(this,Se)[1]?D(this,Se)[1][e]:e},qe=new WeakMap,Ms),Va={Stringify:1},Js=async(e,t,n,s,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(r?r[0]+=e:r=[e],Promise.all(a.map(o=>o({phase:t,buffer:r,context:s}))).then(o=>Promise.all(o.filter(Boolean).map(l=>Js(l,t,!1,s,r))).then(()=>r[0]))):Promise.resolve(e)},Za="text/plain; charset=UTF-8",wn=(e,t)=>({"Content-Type":e,...t}),Ft,Wt,Pe,Tt,Be,_e,qt,St,kt,at,Gt,zt,Ge,vt,$s,Xa=($s=class{constructor(e,t){V(this,Ge);V(this,Ft);V(this,Wt);U(this,"env",{});V(this,Pe);U(this,"finalized",!1);U(this,"error");V(this,Tt);V(this,Be);V(this,_e);V(this,qt);V(this,St);V(this,kt);V(this,at);V(this,Gt);V(this,zt);U(this,"render",(...e)=>(D(this,St)??F(this,St,t=>this.html(t)),D(this,St).call(this,...e)));U(this,"setLayout",e=>F(this,qt,e));U(this,"getLayout",()=>D(this,qt));U(this,"setRenderer",e=>{F(this,St,e)});U(this,"header",(e,t,n)=>{this.finalized&&F(this,_e,new Response(D(this,_e).body,D(this,_e)));const s=D(this,_e)?D(this,_e).headers:D(this,at)??F(this,at,new Headers);t===void 0?s.delete(e):n!=null&&n.append?s.append(e,t):s.set(e,t)});U(this,"status",e=>{F(this,Tt,e)});U(this,"set",(e,t)=>{D(this,Pe)??F(this,Pe,new Map),D(this,Pe).set(e,t)});U(this,"get",e=>D(this,Pe)?D(this,Pe).get(e):void 0);U(this,"newResponse",(...e)=>ee(this,Ge,vt).call(this,...e));U(this,"body",(e,t,n)=>ee(this,Ge,vt).call(this,e,t,n));U(this,"text",(e,t,n)=>!D(this,at)&&!D(this,Tt)&&!t&&!n&&!this.finalized?new Response(e):ee(this,Ge,vt).call(this,e,t,wn(Za,n)));U(this,"json",(e,t,n)=>ee(this,Ge,vt).call(this,JSON.stringify(e),t,wn("application/json",n)));U(this,"html",(e,t,n)=>{const s=r=>ee(this,Ge,vt).call(this,r,t,wn("text/html; charset=UTF-8",n));return typeof e=="object"?Js(e,Va.Stringify,!1,{}).then(s):s(e)});U(this,"redirect",(e,t)=>{const n=String(e);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)});U(this,"notFound",()=>(D(this,kt)??F(this,kt,()=>new Response),D(this,kt).call(this,this)));F(this,Ft,e),t&&(F(this,Be,t.executionCtx),this.env=t.env,F(this,kt,t.notFoundHandler),F(this,zt,t.path),F(this,Gt,t.matchResult))}get req(){return D(this,Wt)??F(this,Wt,new zs(D(this,Ft),D(this,zt),D(this,Gt))),D(this,Wt)}get event(){if(D(this,Be)&&"respondWith"in D(this,Be))return D(this,Be);throw Error("This context has no FetchEvent")}get executionCtx(){if(D(this,Be))return D(this,Be);throw Error("This context has no ExecutionContext")}get res(){return D(this,_e)||F(this,_e,new Response(null,{headers:D(this,at)??F(this,at,new Headers)}))}set res(e){if(D(this,_e)&&e){e=new Response(e.body,e);for(const[t,n]of D(this,_e).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=D(this,_e).headers.getSetCookie();e.headers.delete("set-cookie");for(const r of s)e.headers.append("set-cookie",r)}else e.headers.set(t,n)}F(this,_e,e),this.finalized=!0}get var(){return D(this,Pe)?Object.fromEntries(D(this,Pe)):{}}},Ft=new WeakMap,Wt=new WeakMap,Pe=new WeakMap,Tt=new WeakMap,Be=new WeakMap,_e=new WeakMap,qt=new WeakMap,St=new WeakMap,kt=new WeakMap,at=new WeakMap,Gt=new WeakMap,zt=new WeakMap,Ge=new WeakSet,vt=function(e,t,n){const s=D(this,_e)?new Headers(D(this,_e).headers):D(this,at)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,o]of a)i.toLowerCase()==="set-cookie"?s.append(i,o):s.set(i,o)}if(n)for(const[a,i]of Object.entries(n))if(typeof i=="string")s.set(a,i);else{s.delete(a);for(const o of i)s.append(a,o)}const r=typeof t=="number"?t:(t==null?void 0:t.status)??D(this,Tt);return new Response(e,{status:r,headers:s})},$s),ue="ALL",Qa="all",ei=["get","post","put","delete","options","patch"],Vs="Can not add a route since the matcher is already built.",Zs=class extends Error{},ti="__COMPOSED_HANDLER",ni=e=>e.text("404 Not Found",404),ls=(e,t)=>{if("getResponse"in e){const n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text("Internal Server Error",500)},Re,me,Xs,Ne,st,nn,sn,xt,si=(xt=class{constructor(t={}){V(this,me);U(this,"get");U(this,"post");U(this,"put");U(this,"delete");U(this,"options");U(this,"patch");U(this,"all");U(this,"on");U(this,"use");U(this,"router");U(this,"getPath");U(this,"_basePath","/");V(this,Re,"/");U(this,"routes",[]);V(this,Ne,ni);U(this,"errorHandler",ls);U(this,"onError",t=>(this.errorHandler=t,this));U(this,"notFound",t=>(F(this,Ne,t),this));U(this,"fetch",(t,...n)=>ee(this,me,sn).call(this,t,n[1],n[0],t.method));U(this,"request",(t,n,s,r)=>t instanceof Request?this.fetch(n?new Request(t,n):t,s,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${yt("/",t)}`,n),s,r)));U(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(ee(this,me,sn).call(this,t.request,t,void 0,t.request.method))})});[...ei,Qa].forEach(a=>{this[a]=(i,...o)=>(typeof i=="string"?F(this,Re,i):ee(this,me,st).call(this,a,D(this,Re),i),o.forEach(l=>{ee(this,me,st).call(this,a,D(this,Re),l)}),this)}),this.on=(a,i,...o)=>{for(const l of[i].flat()){F(this,Re,l);for(const c of[a].flat())o.map(d=>{ee(this,me,st).call(this,c.toUpperCase(),D(this,Re),d)})}return this},this.use=(a,...i)=>(typeof a=="string"?F(this,Re,a):(F(this,Re,"*"),i.unshift(a)),i.forEach(o=>{ee(this,me,st).call(this,ue,D(this,Re),o)}),this);const{strict:s,...r}=t;Object.assign(this,r),this.getPath=s??!0?t.getPath??Fs:Ka}route(t,n){const s=this.basePath(t);return n.routes.map(r=>{var i;let a;n.errorHandler===ls?a=r.handler:(a=async(o,l)=>(await is([],n.errorHandler)(o,()=>r.handler(o,l))).res,a[ti]=r.handler),ee(i=s,me,st).call(i,r.method,r.path,a)}),this}basePath(t){const n=ee(this,me,Xs).call(this);return n._basePath=yt(this._basePath,t),n}mount(t,n,s){let r,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?r=l=>l:r=s.replaceRequest));const i=a?l=>{const c=a(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};r||(r=(()=>{const l=yt(this._basePath,t),c=l==="/"?0:l.length;return d=>{const u=new URL(d.url);return u.pathname=u.pathname.slice(c)||"/",new Request(u,d)}})());const o=async(l,c)=>{const d=await n(r(l.req.raw),...i(l));if(d)return d;await c()};return ee(this,me,st).call(this,ue,yt(t,"*"),o),this}},Re=new WeakMap,me=new WeakSet,Xs=function(){const t=new xt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,F(t,Ne,D(this,Ne)),t.routes=this.routes,t},Ne=new WeakMap,st=function(t,n,s){t=t.toUpperCase(),n=yt(this._basePath,n);const r={basePath:this._basePath,path:n,method:t,handler:s};this.router.add(t,n,[s,r]),this.routes.push(r)},nn=function(t,n){if(t instanceof Error)return this.errorHandler(t,n);throw t},sn=function(t,n,s,r){if(r==="HEAD")return(async()=>new Response(null,await ee(this,me,sn).call(this,t,n,s,"GET")))();const a=this.getPath(t,{env:s}),i=this.router.match(r,a),o=new Xa(t,{path:a,matchResult:i,env:s,executionCtx:n,notFoundHandler:D(this,Ne)});if(i[0].length===1){let c;try{c=i[0][0][0][0](o,async()=>{o.res=await D(this,Ne).call(this,o)})}catch(d){return ee(this,me,nn).call(this,d,o)}return c instanceof Promise?c.then(d=>d||(o.finalized?o.res:D(this,Ne).call(this,o))).catch(d=>ee(this,me,nn).call(this,d,o)):c??D(this,Ne).call(this,o)}const l=is(i[0],this.errorHandler,D(this,Ne));return(async()=>{try{const c=await l(o);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return ee(this,me,nn).call(this,c,o)}})()},xt),Qs=[];function ri(e,t){const n=this.buildAllMatchers(),s=((r,a)=>{const i=n[r]||n[ue],o=i[2][a];if(o)return o;const l=a.match(i[0]);if(!l)return[[],Qs];const c=l.indexOf("",1);return[i[1][c],l]});return this.match=s,s(e,t)}var on="[^/]+",Mt=".*",$t="(?:|/.*)",wt=Symbol(),ai=new Set(".\\+*[^]$()");function ii(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Mt||e===$t?1:t===Mt||t===$t?-1:e===on?1:t===on?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var it,ot,Ie,dt,oi=(dt=class{constructor(){V(this,it);V(this,ot);V(this,Ie,Object.create(null))}insert(t,n,s,r,a){if(t.length===0){if(D(this,it)!==void 0)throw wt;if(a)return;F(this,it,n);return}const[i,...o]=t,l=i==="*"?o.length===0?["","",Mt]:["","",on]:i==="/*"?["","",$t]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const d=l[1];let u=l[2]||on;if(d&&l[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw wt;if(c=D(this,Ie)[u],!c){if(Object.keys(D(this,Ie)).some(p=>p!==Mt&&p!==$t))throw wt;if(a)return;c=D(this,Ie)[u]=new dt,d!==""&&F(c,ot,r.varIndex++)}!a&&d!==""&&s.push([d,D(c,ot)])}else if(c=D(this,Ie)[i],!c){if(Object.keys(D(this,Ie)).some(d=>d.length>1&&d!==Mt&&d!==$t))throw wt;if(a)return;c=D(this,Ie)[i]=new dt}c.insert(o,n,s,r,a)}buildRegExpStr(){const n=Object.keys(D(this,Ie)).sort(ii).map(s=>{const r=D(this,Ie)[s];return(typeof D(r,ot)=="number"?`(${s})@${D(r,ot)}`:ai.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof D(this,it)=="number"&&n.unshift(`#${D(this,it)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},it=new WeakMap,ot=new WeakMap,Ie=new WeakMap,dt),ln,Kt,js,li=(js=class{constructor(){V(this,ln,{varIndex:0});V(this,Kt,new oi)}insert(e,t,n){const s=[],r=[];for(let i=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const c=`@\\${i}`;return r[i]=[c,l],i++,o=!0,c}),!o)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=r.length-1;i>=0;i--){const[o]=r[i];for(let l=a.length-1;l>=0;l--)if(a[l].indexOf(o)!==-1){a[l]=a[l].replace(o,r[i][1]);break}}return D(this,Kt).insert(a,t,s,D(this,ln),n),s}buildRegExp(){let e=D(this,Kt).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const n=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,a,i)=>a!==void 0?(n[++t]=Number(a),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),n,s]}},ln=new WeakMap,Kt=new WeakMap,js),ci=[/^$/,[],Object.create(null)],rn=Object.create(null);function er(e){return rn[e]??(rn[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function di(){rn=Object.create(null)}function ui(e){var c;const t=new li,n=[];if(e.length===0)return ci;const s=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,u],[p,y])=>d?1:p?-1:u.length-y.length),r=Object.create(null);for(let d=0,u=-1,p=s.length;d<p;d++){const[y,g,f]=s[d];y?r[g]=[f.map(([_])=>[_,Object.create(null)]),Qs]:u++;let w;try{w=t.insert(g,u,y)}catch(_){throw _===wt?new Zs(g):_}y||(n[u]=f.map(([_,T])=>{const x=Object.create(null);for(T-=1;T>=0;T--){const[L,I]=w[T];x[L]=I}return[_,x]}))}const[a,i,o]=t.buildRegExp();for(let d=0,u=n.length;d<u;d++)for(let p=0,y=n[d].length;p<y;p++){const g=(c=n[d][p])==null?void 0:c[1];if(!g)continue;const f=Object.keys(g);for(let w=0,_=f.length;w<_;w++)g[f[w]]=o[g[f[w]]]}const l=[];for(const d in i)l[d]=n[i[d]];return[a,l,r]}function pt(e,t){if(e){for(const n of Object.keys(e).sort((s,r)=>r.length-s.length))if(er(n).test(t))return[...e[n]]}}var ze,Ke,cn,tr,Ps,mi=(Ps=class{constructor(){V(this,cn);U(this,"name","RegExpRouter");V(this,ze);V(this,Ke);U(this,"match",ri);F(this,ze,{[ue]:Object.create(null)}),F(this,Ke,{[ue]:Object.create(null)})}add(e,t,n){var o;const s=D(this,ze),r=D(this,Ke);if(!s||!r)throw new Error(Vs);s[e]||[s,r].forEach(l=>{l[e]=Object.create(null),Object.keys(l[ue]).forEach(c=>{l[e][c]=[...l[ue][c]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=er(t);e===ue?Object.keys(s).forEach(c=>{var d;(d=s[c])[t]||(d[t]=pt(s[c],t)||pt(s[ue],t)||[])}):(o=s[e])[t]||(o[t]=pt(s[e],t)||pt(s[ue],t)||[]),Object.keys(s).forEach(c=>{(e===ue||e===c)&&Object.keys(s[c]).forEach(d=>{l.test(d)&&s[c][d].push([n,a])})}),Object.keys(r).forEach(c=>{(e===ue||e===c)&&Object.keys(r[c]).forEach(d=>l.test(d)&&r[c][d].push([n,a]))});return}const i=Ws(t)||[t];for(let l=0,c=i.length;l<c;l++){const d=i[l];Object.keys(r).forEach(u=>{var p;(e===ue||e===u)&&((p=r[u])[d]||(p[d]=[...pt(s[u],d)||pt(s[ue],d)||[]]),r[u][d].push([n,a-c+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(D(this,Ke)).concat(Object.keys(D(this,ze))).forEach(t=>{e[t]||(e[t]=ee(this,cn,tr).call(this,t))}),F(this,ze,F(this,Ke,void 0)),di(),e}},ze=new WeakMap,Ke=new WeakMap,cn=new WeakSet,tr=function(e){const t=[];let n=e===ue;return[D(this,ze),D(this,Ke)].forEach(s=>{const r=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];r.length!==0?(n||(n=!0),t.push(...r)):e!==ue&&t.push(...Object.keys(s[ue]).map(a=>[a,s[ue][a]]))}),n?ui(t):null},Ps),Ye,Ue,Bs,pi=(Bs=class{constructor(e){U(this,"name","SmartRouter");V(this,Ye,[]);V(this,Ue,[]);F(this,Ye,e.routers)}add(e,t,n){if(!D(this,Ue))throw new Error(Vs);D(this,Ue).push([e,t,n])}match(e,t){if(!D(this,Ue))throw new Error("Fatal error");const n=D(this,Ye),s=D(this,Ue),r=n.length;let a=0,i;for(;a<r;a++){const o=n[a];try{for(let l=0,c=s.length;l<c;l++)o.add(...s[l]);i=o.match(e,t)}catch(l){if(l instanceof Zs)continue;throw l}this.match=o.match.bind(o),F(this,Ye,[o]),F(this,Ue,void 0);break}if(a===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(D(this,Ue)||D(this,Ye).length!==1)throw new Error("No active router has been determined yet.");return D(this,Ye)[0]}},Ye=new WeakMap,Ue=new WeakMap,Bs),Ct=Object.create(null),Je,ve,lt,Dt,fe,He,rt,Rt,hi=(Rt=class{constructor(t,n,s){V(this,He);V(this,Je);V(this,ve);V(this,lt);V(this,Dt,0);V(this,fe,Ct);if(F(this,ve,s||Object.create(null)),F(this,Je,[]),t&&n){const r=Object.create(null);r[t]={handler:n,possibleKeys:[],score:0},F(this,Je,[r])}F(this,lt,[])}insert(t,n,s){F(this,Dt,++as(this,Dt)._);let r=this;const a=Fa(n),i=[];for(let o=0,l=a.length;o<l;o++){const c=a[o],d=a[o+1],u=Ga(c,d),p=Array.isArray(u)?u[0]:c;if(p in D(r,ve)){r=D(r,ve)[p],u&&i.push(u[1]);continue}D(r,ve)[p]=new Rt,u&&(D(r,lt).push(u),i.push(u[1])),r=D(r,ve)[p]}return D(r,Je).push({[t]:{handler:s,possibleKeys:i.filter((o,l,c)=>c.indexOf(o)===l),score:D(this,Dt)}}),r}search(t,n){var l;const s=[];F(this,fe,Ct);let a=[this];const i=Hs(n),o=[];for(let c=0,d=i.length;c<d;c++){const u=i[c],p=c===d-1,y=[];for(let g=0,f=a.length;g<f;g++){const w=a[g],_=D(w,ve)[u];_&&(F(_,fe,D(w,fe)),p?(D(_,ve)["*"]&&s.push(...ee(this,He,rt).call(this,D(_,ve)["*"],t,D(w,fe))),s.push(...ee(this,He,rt).call(this,_,t,D(w,fe)))):y.push(_));for(let T=0,x=D(w,lt).length;T<x;T++){const L=D(w,lt)[T],I=D(w,fe)===Ct?{}:{...D(w,fe)};if(L==="*"){const P=D(w,ve)["*"];P&&(s.push(...ee(this,He,rt).call(this,P,t,D(w,fe))),F(P,fe,I),y.push(P));continue}const[M,j,z]=L;if(!u&&!(z instanceof RegExp))continue;const W=D(w,ve)[M],ne=i.slice(c).join("/");if(z instanceof RegExp){const P=z.exec(ne);if(P){if(I[j]=P[0],s.push(...ee(this,He,rt).call(this,W,t,D(w,fe),I)),Object.keys(D(W,ve)).length){F(W,fe,I);const Y=((l=P[0].match(/\//))==null?void 0:l.length)??0;(o[Y]||(o[Y]=[])).push(W)}continue}}(z===!0||z.test(u))&&(I[j]=u,p?(s.push(...ee(this,He,rt).call(this,W,t,I,D(w,fe))),D(W,ve)["*"]&&s.push(...ee(this,He,rt).call(this,D(W,ve)["*"],t,I,D(w,fe)))):(F(W,fe,I),y.push(W)))}}a=y.concat(o.shift()??[])}return s.length>1&&s.sort((c,d)=>c.score-d.score),[s.map(({handler:c,params:d})=>[c,d])]}},Je=new WeakMap,ve=new WeakMap,lt=new WeakMap,Dt=new WeakMap,fe=new WeakMap,He=new WeakSet,rt=function(t,n,s,r){const a=[];for(let i=0,o=D(t,Je).length;i<o;i++){const l=D(t,Je)[i],c=l[n]||l[ue],d={};if(c!==void 0&&(c.params=Object.create(null),a.push(c),s!==Ct||r&&r!==Ct))for(let u=0,p=c.possibleKeys.length;u<p;u++){const y=c.possibleKeys[u],g=d[c.score];c.params[y]=r!=null&&r[y]&&!g?r[y]:s[y]??(r==null?void 0:r[y]),d[c.score]=!0}}return a},Rt),ct,Us,gi=(Us=class{constructor(){U(this,"name","TrieRouter");V(this,ct);F(this,ct,new hi)}add(e,t,n){const s=Ws(t);if(s){for(let r=0,a=s.length;r<a;r++)D(this,ct).insert(e,s[r],n);return}D(this,ct).insert(e,t,n)}match(e,t){return D(this,ct).search(e,t)}},ct=new WeakMap,Us),be=class extends si{constructor(e={}){super(e),this.router=e.router??new pi({routers:[new mi,new gi]})}},fi=e=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(n.origin),r=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(n.allowMethods);return async function(i,o){var d;function l(u,p){i.res.headers.set(u,p)}const c=await s(i.req.header("origin")||"",i);if(c&&l("Access-Control-Allow-Origin",c),n.credentials&&l("Access-Control-Allow-Credentials","true"),(d=n.exposeHeaders)!=null&&d.length&&l("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),i.req.method==="OPTIONS"){n.origin!=="*"&&l("Vary","Origin"),n.maxAge!=null&&l("Access-Control-Max-Age",n.maxAge.toString());const u=await r(i.req.header("origin")||"",i);u.length&&l("Access-Control-Allow-Methods",u.join(","));let p=n.allowHeaders;if(!(p!=null&&p.length)){const y=i.req.header("Access-Control-Request-Headers");y&&(p=y.split(/\s*,\s*/))}return p!=null&&p.length&&(l("Access-Control-Allow-Headers",p.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&i.header("Vary","Origin",{append:!0})}};function yi(){return`  // === Karna v3.1 Frontend ===
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
    if (dash) dash.placeholder = ph;
    if (chat) chat.placeholder = ph;
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
    state.session = null;
    clearActiveThreadId();
    try { localStorage.removeItem('karna_session'); } catch(e) {}
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
`}function vi(){return`  // === Render Core ===
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
`}function wi(){return`  // ============================================================
  // MAIN APP — Dashboard + Chat + Threads
  // ============================================================

  async function renderMain(container) {
    state.view = 'home';
    restoreActiveThreadId();
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
      '</div>' +
      '<div class="main-content" id="mainContent"></div>' +
      '<!-- Thread Sidebar -->' +
      '<div class="overlay" id="threadsOverlay">' +
        '<div class="overlay-panel">' +
          '<div class="thread-sidebar-header"><span class="panel-title" style="margin:0;">CHAT LOG</span><div style="display:flex;gap:8px;align-items:center;"><button class="icon-btn" id="sidebarSelectBtn" title="Select to delete" style="width:36px;height:36px;font-size:14px;">&#9745;</button><button class="btn-new" id="sidebarNewBtn"><span class="plus">+</span><span>NEW</span></button></div></div>' +
          '<div class="thread-list" id="threadList"></div>' +
          '<div class="thread-sidebar-footer">' +
            '<div class="nav-pill">' +
              '<button class="nav-item nav-item--home" id="sidebarDashBtn"><i class="fa-solid fa-house"></i><span>Home</span></button>' +
              '<button class="clay-notes-btn clay-notes-btn--sidebar" id="sidebarNotesBtn"><span class="clay-notes-btn__icon"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 3.5h7.5L18.5 7.5V19a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" stroke="white" stroke-width="1.7" stroke-linejoin="round" fill="rgba(255,255,255,0.08)"/><path d="M14.5 3.5V7.5H18.5" stroke="white" stroke-width="1.7" stroke-linejoin="round" fill="rgba(255,255,255,0.04)"/><path d="M8.5 11h7M8.5 14h7M8.5 17h4.5" stroke="white" stroke-width="1.7" stroke-linecap="round" fill="none"/></svg></span><span>Notes</span></button>' +
              '<button class="nav-item nav-item--skills" id="sidebarSkillsBtn"><i class="fa-solid fa-bolt"></i><span>Skills</span></button>' +
              '<button class="nav-item nav-item--digests" id="sidebarDigestsBtn"><i class="fa-solid fa-rectangle-list"></i><span>Digests</span></button>' +
              '<button class="nav-item nav-item--settings" id="sidebarSettingsBtn"><i class="fa-solid fa-gear"></i><span>Settings</span></button>' +
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
    document.getElementById('sidebarDashBtn').onclick = function() { toggleOverlay(null); state.view = 'home'; renderView(); };
    document.getElementById('sidebarNotesBtn').onclick = function() { toggleOverlay(null); navigateToNotes(); };
    document.getElementById('sidebarSkillsBtn').onclick = function() { toggleOverlay(null); state.view = 'skills'; renderView(); };
    if (document.getElementById('sidebarDigestsBtn')) document.getElementById('sidebarDigestsBtn').onclick = function() { toggleOverlay(null); state.view = 'digests'; renderView(); };
    document.getElementById('sidebarSettingsBtn').onclick = function() { toggleOverlay(null); state.view = 'settings'; state.settingsSection = null; renderView(); };

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
`}function _i(){return`  // ============================================================
  // DASHBOARD
  // ============================================================

  function renderDashInputArea() {
    return '<div class="input-anchor">' +
      '<input type="file" id="dashFileInput" style="display:none" multiple>' +
      '<div id="dashFileChips" class="file-chips" style="display:none"></div>' +
      '<div class="input-pill">' +
        '<button type="button" class="attach-btn" id="dashAttachBtn" title="Attach file" aria-label="Attach file">' +
          '<svg class="attach-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<path d="M16.5 6.5 8.2 14.8a3 3 0 1 0 4.2 4.2l8.3-8.3a5 5 0 0 0-7.1-7.1L5.3 11.9a7 7 0 1 0 9.9 9.9l7.1-7.1" />' +
          '</svg>' +
        '</button>' +
        '<textarea class="text-input" id="dashInputField" placeholder="' + escapeHtml(messagePlaceholder()) + '" rows="1"></textarea>' +
        '<button type="button" class="send-btn" id="dashSendBtn" title="Send" aria-label="Send">&#10148;</button>' +
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
    dashInput.oninput = function() {
      dashInput.style.height = 'auto';
      dashInput.style.height = Math.max(36, Math.min(dashInput.scrollHeight, window.innerHeight * 0.25)) + 'px';
    };
    dashInput.style.height = '36px';
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
    var text = dashInput.value.trim();
    if (!text) {
      dashInput.focus();
      return;
    }
    state.pendingDashMessage = text;
    dashInput.value = '';
    dashInput.style.height = '36px';
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
`}function bi(){return`  // ============================================================
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
        '<button type="button" class="attach-btn" id="attachBtn" title="Attach file" aria-label="Attach file">' +
          '<svg class="attach-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<path d="M16.5 6.5 8.2 14.8a3 3 0 1 0 4.2 4.2l8.3-8.3a5 5 0 0 0-7.1-7.1L5.3 11.9a7 7 0 1 0 9.9 9.9l7.1-7.1" />' +
          '</svg>' +
        '</button>' +
        '<textarea class="text-input" id="inputField" placeholder="' + escapeHtml(messagePlaceholder()) + '" rows="1"></textarea>' +
        '<button type="button" class="send-btn" id="sendBtn" title="Send (Ctrl+Enter)">&#10148;</button>' +
      '</div>' +
    '</div></div>';

    var input = document.getElementById('inputField');
    input.onkeydown = function(e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleSend(); } };
    input.oninput = function() { input.style.height = 'auto'; input.style.height = Math.max(40, Math.min(input.scrollHeight, window.innerHeight * 0.35)) + 'px'; };
    input.style.height = '40px';
    updateMessagePlaceholders();
    document.getElementById('sendBtn').onclick = handleSend;
    document.getElementById('attachBtn').onclick = function() { document.getElementById('fileInput').click(); };
    document.getElementById('fileInput').onchange = handleFileSelect;
    if (state.pendingDashMessage) {
      var pendingText = state.pendingDashMessage;
      state.pendingDashMessage = null;
      input.value = pendingText;
      input.style.height = 'auto';
      input.style.height = Math.max(40, Math.min(input.scrollHeight, window.innerHeight * 0.35)) + 'px';
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
    for (var i = 0; i < data.messages.length; i++) {
      var msg = data.messages[i];
      var group = document.createElement('div');
      group.className = 'message-group';
      if (msg.role === 'user') { group.innerHTML = '<div class="msg-user">' + escapeHtml(msg.content) + '</div>'; }
      else {
        var safeContent = escapeHtml(msg.content).replace(/"/g, '&quot;');
        group.innerHTML = '<div class="msg-assistant" id="msg-' + msg.id + '">' + md(msg.content) + '</div>' +
          '<div class="msg-actions">' +
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

      // Get thread ID from header (may be blocked cross-origin without CORS exposeHeaders)
      var threadIdHeader = response.headers.get('X-Thread-Id');
      if (threadIdHeader) setActiveThreadId(threadIdHeader);
      if (state.activeThreadId && state.view !== 'chat') state.view = 'chat';
      var ttlHeader = document.getElementById('threadTitleDisplay');
      if (state.activeThreadId && ttlHeader && !ttlHeader.textContent) {
        ttlHeader.textContent = text.substring(0, 60);
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
                  get browserAckEl() { return browserAckEl; },
                  set browserAckEl(v) { browserAckEl = v; },
                  get browserProgressEl() { return browserProgressEl; },
                  set browserProgressEl(v) { browserProgressEl = v; },
                  get researchProgressEl() { return researchProgressEl; },
                  set researchProgressEl(v) { researchProgressEl = v; },
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
  function scrollToBottom() { var area = document.getElementById('chatArea'); if (area) requestAnimationFrame(function() { area.scrollTop = area.scrollHeight; }); }
`}function Ei(){return`  // ============================================================
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
        html += '<span class="icon-well agent-icon-well"><img src="/static/bot-mark.png" class="thread-agent-icon" alt=""></span>';
        html += '<span class="row-body">';
        html += '<span class="row-top"><span class="row-title">' + escapeHtml(t.title) + titleBadge + '</span><span class="row-time">' + escapeHtml(rel) + '</span></span>';
        if (preview) { html += '<span class="row-preview">' + preview + '</span>'; }
        html += '<span class="row-badge">' + badgeText + '</span>';
        html += '</span>';
        html += '<span class="row-chevron">&#8250;</span>';
        html += '</div>';
      } else {
        html += '<div class="row thread-item' + (isActive ? ' active' : '') + pinnedClass + '" role="button" tabindex="0" data-id="' + t.id + '" onclick="openThread(' + t.id + ')" oncontextmenu="event.preventDefault();showThreadContextMenu(' + t.id + ',null,event.clientX,event.clientY)">';
        html += '<span class="icon-well agent-icon-well"><img src="/static/bot-mark.png" class="thread-agent-icon" alt=""></span>';
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
      html += '<span class="icon-well agent-icon-well"><img src="/static/bot-mark.png" class="thread-agent-icon" alt=""></span>';
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
`}function Ti(){return`  // ============================================================
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
`}function Si(){return`  // === Memory Review ===
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
`}function ki(){return`  // === Document Library ===
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
`}function xi(){return`  // ============================================================
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
`}function Di(){return`  // ============================================================
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
`}function Ri(){return`  // ============================================================
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
`}function Ni(){return`  // === Init ===
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
          anchor.style.paddingBottom = '8px';
          anchor.style.top = (vp.offsetTop + vp.height - anchor.offsetHeight) + 'px';
          anchor.style.bottom = 'auto';
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
  // ============================================================`}function Ii(){return`  async function renderDocumentsView(container) {
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
`}function Oi(){return`  // ============================================================
  // NOTES
  // ============================================================

  var notesState = {
    notes: [],
    activeFilter: 'all',
    searchQuery: '',
    composeOpen: false,
    editingNote: null,
    deleteConfirmId: null,
    searchTimer: null,
    allTags: []
  };

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
          '<div class="note-card-preview">' + escapeHtml(note.content) + '</div>' +
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
    container.innerHTML =
      '<style>' +
      '.notes-page{padding:0;max-width:100%;}' +
      '.notes-toolbar{position:sticky;top:0;z-index:10;background:var(--bg);padding:12px 16px;display:flex;gap:8px;align-items:center;border-bottom:1px solid var(--border);}' +
      '.notes-search{flex:1;height:44px;padding:0 14px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);font-size:15px;}' +
      '.notes-fab{height:44px;min-width:44px;padding:0 16px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:22px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;}' +
      '.notes-filters{display:flex;gap:8px;padding:10px 16px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;}' +
      '.notes-filters::-webkit-scrollbar{display:none;}' +
      '.filter-chip{flex-shrink:0;height:34px;padding:0 14px;border:1px solid var(--border);border-radius:20px;background:var(--surface);color:var(--text-muted);font-size:13px;cursor:pointer;white-space:nowrap;}' +
      '.filter-chip.active{background:var(--accent);color:#fff;border-color:var(--accent);}' +
      '.notes-grid{display:grid;grid-template-columns:1fr;gap:12px;padding:12px 16px;}' +
      '@media(min-width:768px){.notes-grid{grid-template-columns:repeat(2,1fr);padding:16px 24px;}}' +
      '@media(min-width:1200px){.notes-grid{grid-template-columns:repeat(3,1fr);}}' +
      '.note-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:8px;cursor:pointer;transition:border-color 0.15s;}' +
      '.note-card:active{border-color:var(--accent);}' +
      '.note-card-title{font-size:15px;font-weight:600;color:var(--text);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}' +
      '.note-card-preview{font-size:13px;color:var(--text-muted);line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}' +
      '.note-card-meta{display:flex;align-items:center;gap:8px;margin-top:4px;flex-wrap:wrap;}' +
      '.note-tag{font-size:11px;padding:2px 8px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text-muted);}' +
      '.note-date{font-size:11px;color:var(--text-muted);margin-left:auto;}' +
      '.note-pin{font-size:16px;cursor:pointer;padding:4px;min-width:28px;min-height:28px;display:flex;align-items:center;justify-content:center;}' +
      '.note-actions{display:flex;gap:8px;margin-top:8px;border-top:1px solid var(--border);padding-top:10px;}' +
      '.note-action-btn{flex:1;height:40px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text-muted);font-size:13px;cursor:pointer;}' +
      '.note-action-btn.danger{color:var(--danger);border-color:var(--danger);}' +
      '.note-compose{background:var(--surface);border:1px solid var(--accent);border-radius:12px;padding:16px;margin:0 16px 12px;display:none;flex-direction:column;gap:10px;}' +
      '.note-compose.open{display:flex;}' +
      '.note-compose input,.note-compose textarea{width:100%;padding:12px 14px;box-sizing:border-box;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text);font-size:15px;}' +
      '.note-compose textarea{min-height:120px;resize:vertical;line-height:1.6;}' +
      '.compose-actions{display:flex;gap:8px;}' +
      '.compose-actions button{flex:1;height:48px;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;border:none;}' +
      '.btn-save-note{background:var(--accent);color:#fff;}' +
      '.btn-cancel-note{background:var(--surface);color:var(--text-muted);border:1px solid var(--border)!important;}' +
      '.note-detail{padding:16px;max-width:720px;margin:0 auto;}' +
      '.note-detail-content{font-size:15px;line-height:1.7;white-space:pre-wrap;word-break:break-word;}' +
      '.research-ack{font-size:13px;color:var(--text-muted);padding:8px 12px;margin:8px 0;background:var(--surface);border-radius:8px;border:1px solid var(--border);}' +
      '</style>' +
      '<div class="notes-page">' +
        '<div class="notes-toolbar">' +
          '<button class="page-back-btn" onclick="goBackFromNotes()" style="width:44px;height:44px;flex-shrink:0;">&#8592;</button>' +
          '<input type="search" class="notes-search" id="notesSearchInput" placeholder="Search notes..." autocomplete="off">' +
          '<button class="notes-fab" id="notesFabBtn" title="New note">+</button>' +
        '</div>' +
        '<div class="notes-filters" id="notesFilters"></div>' +
        '<div class="note-compose" id="noteCompose">' +
          '<input type="text" id="noteTitleInput" placeholder="Title (optional)">' +
          '<textarea id="noteContentInput" placeholder="Write your note..."></textarea>' +
          '<input type="text" id="noteTagsInput" placeholder="Tags (comma-separated)">' +
          '<div class="compose-actions">' +
            '<button class="btn-cancel-note" id="noteCancelBtn">Cancel</button>' +
            '<button class="btn-save-note" id="noteSaveBtn">Save</button>' +
          '</div>' +
        '</div>' +
        '<div class="notes-grid" id="notesGrid"><div style="color:var(--text-muted);padding:24px;text-align:center;">Loading notes...</div></div>' +
      '</div>';

    document.getElementById('notesFabBtn').onclick = function() { showComposePanel(null); };
    document.getElementById('noteCancelBtn').onclick = hideComposePanel;
    document.getElementById('noteSaveBtn').onclick = saveNote;
    document.getElementById('notesSearchInput').oninput = function(e) { searchNotes(e.target.value); };

    notesState.activeFilter = 'all';
    notesState.composeOpen = false;
    notesState.editingNote = null;
    notesState.deleteConfirmId = null;
    await loadNotesList();
  }

  function showComposePanel(existingNote) {
    var panel = document.getElementById('noteCompose');
    if (!panel) return;
    notesState.editingNote = existingNote;
    notesState.composeOpen = true;
    panel.classList.add('open');
    document.getElementById('noteTitleInput').value = existingNote ? (existingNote.title || '') : '';
    document.getElementById('noteContentInput').value = existingNote ? (existingNote.content || '') : '';
    document.getElementById('noteTagsInput').value = existingNote ? (existingNote.tags || '') : '';
    document.getElementById('noteTitleInput').focus();
  }

  function hideComposePanel() {
    var panel = document.getElementById('noteCompose');
    if (panel) panel.classList.remove('open');
    notesState.composeOpen = false;
    notesState.editingNote = null;
  }

  async function saveNote() {
    var title = document.getElementById('noteTitleInput').value.trim();
    var content = document.getElementById('noteContentInput').value.trim();
    var tags = document.getElementById('noteTagsInput').value.trim();
    if (!content) {
      showToast('Note content is required', 'warning');
      return;
    }
    try {
      if (notesState.editingNote && notesState.editingNote.id) {
        await api('/notes/' + notesState.editingNote.id, {
          method: 'PUT',
          body: JSON.stringify({ title: title, content: content, tags: tags })
        });
        showToast('Note updated', 'success');
      } else {
        await api('/notes', {
          method: 'POST',
          body: JSON.stringify({ title: title, content: content, tags: tags, source: 'manual' })
        });
        showToast('Note saved', 'success');
      }
      hideComposePanel();
      await loadNotesList();
    } catch (err) {
      showToast('Failed to save note', 'error');
    }
  }

  window.editNote = function(id) {
    var note = null;
    for (var i = 0; i < notesState.notes.length; i++) {
      if (notesState.notes[i].id === id) { note = notesState.notes[i]; break; }
    }
    if (note) showComposePanel(note);
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
    var note = null;
    for (var i = 0; i < notesState.notes.length; i++) {
      if (notesState.notes[i].id === id) { note = notesState.notes[i]; break; }
    }
    if (!note) return;
    var mc = document.getElementById('mainContent');
    if (!mc) return;
    var tagsHtml = '';
    if (note.tags) {
      var tags = note.tags.split(',');
      for (var j = 0; j < tags.length; j++) {
        var t = tags[j].trim();
        if (t) tagsHtml += '<span class="note-tag">' + escapeHtml(t) + '</span> ';
      }
    }
    mc.innerHTML =
      '<div class="note-detail">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">' +
          '<button class="page-back-btn" onclick="renderNotesView(document.getElementById(\\'mainContent\\'))" style="width:44px;height:44px;">&#8592;</button>' +
          '<h1 style="margin:0;font-size:18px;flex:1;">' + escapeHtml(note.title || 'Untitled') + '</h1>' +
          '<button class="note-action-btn" style="flex:0 0 auto;width:auto;padding:0 16px;" onclick="editNote(' + note.id + ');renderNotesView(document.getElementById(\\'mainContent\\'));">Edit</button>' +
        '</div>' +
        '<div style="margin-bottom:12px;">' + tagsHtml +
          '<span class="note-date">' + notesRelativeDate(note.updated_at || note.created_at) + '</span>' +
        '</div>' +
        '<div class="note-detail-content">' + escapeHtml(note.content) + '</div>' +
      '</div>';
  };
`}function Ci(){return`  // ============================================================
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
`}function nr(e=""){return`<!DOCTYPE html>
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
  <link rel="stylesheet" href="/static/karna.css?v=3">
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
${yi()}
${vi()}
${wi()}
${_i()}
${bi()}
${Ei()}
${Ti()}
${Si()}
${ki()}
${xi()}
${Di()}
${Ri()}
${Ni()}
${Ii()}
${Oi()}
${Ci()}
  <\/script>
</body>
</html>`}function Ai(){return`<!DOCTYPE html>
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
</html>`}const jn="AES-GCM",Li=256;async function sr(e){const t=new TextEncoder,n=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},n,{name:jn,length:Li},!1,["encrypt","decrypt"])}async function Nt(e,t){const n=await sr(t),s=crypto.getRandomValues(new Uint8Array(12)),r=new TextEncoder,a=await crypto.subtle.encrypt({name:jn,iv:s},n,r.encode(e)),i=new Uint8Array(s.length+new Uint8Array(a).length);return i.set(s),i.set(new Uint8Array(a),s.length),btoa(String.fromCharCode(...i))}async function G(e,t){const n=await sr(t),s=new Uint8Array(atob(e).split("").map(o=>o.charCodeAt(0))),r=s.slice(0,12),a=s.slice(12),i=await crypto.subtle.decrypt({name:jn,iv:r},n,a);return new TextDecoder().decode(i)}async function dn(e){const n=new TextEncoder().encode(e+"karna-pin-salt"),s=await crypto.subtle.digest("SHA-256",n);return btoa(String.fromCharCode(...new Uint8Array(s)))}async function rr(e,t){return await dn(e)===t}const Yt=Object.freeze(Object.defineProperty({__proto__:null,decrypt:G,encrypt:Nt,hashPin:dn,verifyPin:rr},Symbol.toStringTag,{value:"Module"})),Xe=new be;function ar(e){return{id:e.id,username:e.username,name:e.name,assistant_name:e.assistant_name||"Karna"}}Xe.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});Xe.post("/setup",async e=>{const{username:t,name:n,pin:s,personality_prompt:r,timezone:a}=await e.req.json();if(!t||!n||!s)return e.json({error:"Username, name, and PIN are required"},400);if(s.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const o=await dn(s);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,n,o,r||"",a||"Asia/Kolkata").run();const l=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),c=crypto.randomUUID(),d=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(c,l.id,"web",d).run(),e.json({success:!0,sessionId:c,user:ar(l)})});Xe.post("/login",async e=>{const{username:t,pin:n}=await e.req.json();if(!t||!n)return e.json({error:"Username and PIN required"},400);const s=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!s)return e.json({error:"User not found"},404);if(!await rr(n,s.pin_hash))return e.json({error:"Invalid PIN"},401);const a=crypto.randomUUID(),i=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(a,s.id,"web",i).run(),e.json({success:!0,sessionId:a,user:ar(s)})});Xe.post("/logout",async e=>{var n;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});Xe.get("/users/hints",async e=>{const n=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(s=>{var r;return{username:s.username,name_hint:s.name.split(" ")[0],created:((r=s.created_at)==null?void 0:r.split(" ")[0])||""}});return e.json({users:n,count:n.length})});Xe.post("/reset-pin",async e=>{var o;const{username:t,name:n,new_pin:s}=await e.req.json();if(!t||!n||!s)return e.json({error:"Username, display name, and new PIN are required"},400);if(s.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const r=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!r)return e.json({error:"User not found"},404);if(r.name.toLowerCase().trim()!==n.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const a=await dn(s);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(a,r.id).run();const i=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(r.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(r.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((o=i.meta)==null?void 0:o.changes)||0})});Xe.get("/me",async e=>{var s;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.timezone, u.assistant_name
     FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return n?e.json({user:{id:n.uid,username:n.username,name:n.name,timezone:n.timezone,assistant_name:n.assistant_name||"Karna"}}):e.json({error:"Invalid or expired session"},401)});const jt={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-6",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-6, claude-haiku-4-5",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4-6",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},cs=12e4;function ir(e,t){return Promise.race([e,new Promise((n,s)=>setTimeout(()=>s(new Error(`LLM timeout: ${t} did not respond within ${cs/1e3} seconds. Try again or switch providers in Settings → Keys.`)),cs))])}async function H(e,t,n,s,r,a={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,n,s,r,JSON.stringify(a)).run()}catch(i){console.error("Failed to log error:",i)}}async function _n(e,t,n,s,r,a){try{const i=`provider_alert:${s}:${n}`;if(await e.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(t,i).first())return;await H(e,t,"provider_alert",i,`${s} failed: ${a.substring(0,200)}`,{alertType:n,failedProvider:s,fallbackProvider:r});let l;n==="all_providers_down"?l=`🚨 All LLM providers failed

Last error from ${s}: ${ds(a)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:l=`⚠️ LLM Provider Issue

${s}: ${ds(a)}
Switched to: ${r}

Check your ${s} API credit balance or key.`;const{decrypt:c}=await Promise.resolve().then(()=>Yt),d=await e.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(t).first();if(!(d!=null&&d.telegram_chat_id))return;const u=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(t).first();if(!u)return;const p=await c(u.encrypted_value,d.pin_hash);await fetch(`https://api.telegram.org/bot${p}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d.telegram_chat_id,text:l})})}catch(i){console.error("Failed to send provider alert:",i)}}function ds(e){return e.includes("credit balance")||e.includes("insufficient")||e.includes("402")?"Credits exhausted or balance too low":e.includes("429")||e.includes("rate_limit")||e.includes("quota")?"Rate limit / quota exceeded":e.includes("401")||e.includes("authentication")||e.includes("invalid")&&e.includes("key")?"API key invalid or expired":e.includes("403")?"Access denied (key may lack permissions)":e.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":e.includes("properties field not found")?"Schema compatibility issue":"API error"}class or{constructor(t,n="claude-sonnet-4-6",s="https://api.anthropic.com",r="anthropic"){U(this,"name");U(this,"apiKey");U(this,"model");U(this,"apiBase");this.apiKey=t,this.model=n,this.apiBase=s,this.name=r}async chat(t,n){var d,u,p,y;const s=t.find(g=>g.role==="system"),r=t.filter(g=>g.role!=="system"),a={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,messages:r.map(g=>({role:g.role,content:g.content}))};s&&(a.system=s.content),n!=null&&n.tools&&n.tools.length>0&&(a.tools=n.tools.map(g=>({name:g.name,description:g.description,input_schema:g.parameters})),n.toolChoice==="required"&&(a.tool_choice={type:"any"}));const i=await ir(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(a)}),this.name);if(!i.ok){const g=await i.text();throw new Error(this.name+" API error "+i.status+": "+g)}const o=await i.json(),l=((d=o.content)==null?void 0:d.filter(g=>g.type==="text"))||[],c=((u=o.content)==null?void 0:u.filter(g=>g.type==="tool_use"))||[];return{content:l.map(g=>g.text).join(`
`),toolCalls:c.map(g=>({id:g.id,name:g.name,arguments:g.input})),usage:{promptTokens:((p=o.usage)==null?void 0:p.input_tokens)||0,completionTokens:((y=o.usage)==null?void 0:y.output_tokens)||0}}}async streamChat(t,n){const s=t.find(c=>c.role==="system"),r=t.filter(c=>c.role!=="system"),a={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,stream:!0,messages:r.map(c=>({role:c.role,content:c.content}))};s&&(a.system=s.content);const i=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(a)});if(!i.ok){const c=await i.text();throw new Error(this.name+" stream error "+i.status+": "+c)}const o=i.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(c){var g;const{done:d,value:u}=await o.read();if(d){c.close();return}const y=l.decode(u,{stream:!0}).split(`
`);for(const f of y)if(f.startsWith("data: ")){const w=f.slice(6);if(w==="[DONE]")continue;try{const _=JSON.parse(w);_.type==="content_block_delta"&&((g=_.delta)!=null&&g.text)&&c.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:_.delta.text})+`

`))}catch{}}}})}}function Mi(e){const t={},n=e||{};if(t.type=n.type||"object",t.type==="object"){const s=n.properties;if(s&&typeof s=="object"&&Object.keys(s).length>0){const r={};for(const[a,i]of Object.entries(s))i&&typeof i=="object"?r[a]=Dn(i):r[a]=i;t.properties=r}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(n.required)?t.required=n.required:t.required=[]}return n.description&&(t.description=n.description),t}function Dn(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const n=t.properties;if(n&&typeof n=="object"&&Object.keys(n).length>0){const s={};for(const[r,a]of Object.entries(n))a&&typeof a=="object"?s[r]=Dn(a):s[r]=a;t.properties=s}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=Dn(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class lr{constructor(t,n,s,r){U(this,"name");U(this,"apiKey");U(this,"model");U(this,"apiBase");this.apiKey=t,this.model=n,this.apiBase=s.replace(/\/+$/,""),this.name=r}async chat(t,n){var l,c,d,u,p,y;const s={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,messages:t.map(g=>({role:g.role,content:g.content}))},r=this.apiBase.includes("routellm.abacus.ai");if(n!=null&&n.tools&&n.tools.length>0&&r)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");n!=null&&n.tools&&n.tools.length>0&&(s.tools=n.tools.map(g=>({type:"function",function:{name:g.name,description:g.description,parameters:Mi(g.parameters||{})}})),n.toolChoice==="required"&&(s.tool_choice="required"));const a=await ir(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(s)}),this.name);if(!a.ok){const g=await a.text();throw new Error(this.name+" API error "+a.status+": "+g)}const i=await a.json(),o=(l=i.choices)==null?void 0:l[0];return{content:((c=o==null?void 0:o.message)==null?void 0:c.content)||"",toolCalls:(u=(d=o==null?void 0:o.message)==null?void 0:d.tool_calls)==null?void 0:u.map(g=>({id:g.id,name:g.function.name,arguments:(()=>{try{return typeof g.function.arguments=="string"?JSON.parse(g.function.arguments||"{}"):g.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((p=i.usage)==null?void 0:p.prompt_tokens)||0,completionTokens:((y=i.usage)==null?void 0:y.completion_tokens)||0}}}async streamChat(t,n){const s={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,stream:!0,messages:t.map(o=>({role:o.role,content:o.content}))},r=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(s)});if(!r.ok){const o=await r.text();throw new Error(this.name+" stream error "+r.status+": "+o)}const a=r.body.getReader(),i=new TextDecoder;return new ReadableStream({async pull(o){var p,y,g;const{done:l,value:c}=await a.read();if(l){o.close();return}const u=i.decode(c,{stream:!0}).split(`
`);for(const f of u)if(f.startsWith("data: ")){const w=f.slice(6);if(w==="[DONE]")continue;try{const T=(g=(y=(p=JSON.parse(w).choices)==null?void 0:p[0])==null?void 0:y.delta)==null?void 0:g.content;T&&o.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:T})+`

`))}catch{}}}})}}function Rn(e,t,n,s){const r=jt[e];if(!r)throw new Error(`Unknown LLM provider: ${e}`);const a=s||r.defaultModel;return r.apiFormat==="anthropic"?new or(t,a,r.apiBase,n):new lr(t,a,r.apiBase,n)}class cr{constructor(){U(this,"errorLog",new Map);U(this,"usageLog",new Map)}async pickProvider(t){const n=Date.now(),s=t.filter(r=>{const a=this.errorLog.get(r);return a?a.cooldownUntil<=n:!0});return s.length>0?s[0]:null}async recordUsage(t,n){const s=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:s.tokens+n,requests:s.requests+1})}async recordError(t,n,s=5){this.errorLog.set(t,{error:n,cooldownUntil:Date.now()+s*60*1e3})}}const $i=["llm_slot_1","llm_slot_2","llm_slot_3"],ji=["anthropic","openai"];async function Qe(e,t,n){const{decrypt:s}=await Promise.resolve().then(()=>Yt),r=new cr,a=[];for(const u of $i){const p=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,u).first();if(p)try{const y=await s(p.encrypted_value,n),g=JSON.parse(y);if(g.provider&&g.apiKey&&jt[g.provider]){const w=g.provider,_=Rn(g.provider,g.apiKey,w,g.model);a.push({name:w,provider:_})}}catch(y){console.error(`Failed to load ${u}:`,y)}}const i=new Set(a.map(u=>u.name));for(const u of ji){if(i.has(u))continue;const p=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,u).first();if(p)try{const y=await s(p.encrypted_value,n);if(jt[u]){const f=Rn(u,y,u);a.push({name:u,provider:f})}}catch{console.error(`Failed to decrypt legacy ${u} key`)}}if(a.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const o=a.map(u=>u.name),l=await r.pickProvider(o);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:a[0].provider,rotation:r};const c=a.find(u=>u.name===l);return{provider:Pi(c.provider,a,r,e,t),rotation:r}}function Pi(e,t,n,s,r){const a=o=>o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")||o.includes("TOOLS_UNSUPPORTED"),i=o=>o.includes("429")||o.toLowerCase().includes("rate limit")||o.toLowerCase().includes("too many requests");return t.length<=1?{name:e.name,async chat(o,l){try{return await e.chat(o,l)}catch(c){const d=c.message||"";throw a(d)&&!d.includes("TOOLS_UNSUPPORTED")&&_n(s,r,"all_providers_down",e.name,null,d),c}},async streamChat(o,l){return await e.streamChat(o,l)}}:{name:e.name,async chat(o,l){try{return await e.chat(o,l)}catch(c){const d=c.message||"",u=i(d);if(!a(d)&&!u)throw c;const p=d.includes("TOOLS_UNSUPPORTED"),y=p?1:u?10:1440;console.warn(`Provider ${e.name} ${u?"rate limited":p?"tools unsupported":"auth/billing error"}, trying fallback...`),await n.recordError(e.name,d,y);const g=t.filter(f=>f.name!==e.name);for(const f of g)try{const w=await f.provider.chat(o,l);return this.name=f.name,!p&&!u&&_n(s,r,"provider_switched",e.name,f.name,d),w}catch(w){const _=w.message||"";if(a(_)||i(_)){await n.recordError(f.name,_,i(_)?10:1440);continue}throw w}throw _n(s,r,"all_providers_down",e.name,null,d),new Error(`All LLM providers failed. Primary (${e.name}): ${d.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(o,l){return await e.streamChat(o,l)}}}const bt=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:or,OpenAICompatibleProvider:lr,ProviderRotation:cr,createProviderFromConfig:Rn,createRotatingProvider:Qe,logError:H},Symbol.toStringTag,{value:"Module"})),bn=20,Bi=2e3,Ui=2e3,dr=4,Hi=1e3;function Fi(e){return Math.ceil(e.length/dr)}function Nn(e,t){const n=t*dr;return e.length<=n?e:e.slice(0,n)+`
[...truncated to fit token budget]`}async function Pn(e,t){try{const s=(await e.prepare(`SELECT title, content FROM notes
       WHERE user_id = ? AND is_pinned = 1
       ORDER BY updated_at DESC LIMIT 10`).bind(t).all()).results||[];if(s.length===0)return"";const r=`## Pinned Notes
`+s.map(a=>`- **${a.title||"Note"}**: ${(a.content||"").slice(0,300)}`).join(`
`);return Nn(r,Hi)}catch{return""}}class Q{constructor(t){this.db=t}async store(t,n,s,r,a=5,i="working"){const o=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,n,s).first();o?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r,a,i,o.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,n,s,r,a,i).run(),i==="working"&&await this.enforceWorkingMemoryCap(t)}async cleanupDoneTasks(t){await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND type = 'task' AND status = 'done' AND tier = 'working'
       AND updated_at < datetime('now', '-7 days')`).bind(t).run()}async enforceWorkingMemoryCap(t){const n=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((n==null?void 0:n.cnt)||0)>bn){const s=((n==null?void 0:n.cnt)||0)-bn;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND tier = 'working' AND importance < 8 AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' AND importance < 8
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,s).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,bn).all()).results||[]}async getAll(t,n,s=50){return n?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,n,s).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,s).all()).results||[]}async search(t,n,s=10){return this.searchMemoryByTier(t,n,s)}async searchLongTerm(t,n,s=5){return this.searchMemoryByTier(t,n,s,"long_term")}async searchMemoryByTier(t,n,s,r){const a=r?" AND tier = ?":"",i=(y,g)=>r?[t,r,y,y,g]:[t,y,y,g],l=(await this.db.prepare(`SELECT * FROM memory WHERE user_id = ?${a} AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?`).bind(...i(`%${n}%`,s)).all()).results||[];if(l.length>0)return await this.touchMemories(t,l.map(y=>y.id)),l;const c=n.split(/\s+/).filter(y=>y.length>2);if(c.length===0)return[];const d=new Map,u=new Map;for(const y of c){const g=await this.db.prepare(`SELECT * FROM memory WHERE user_id = ?${a} AND (title LIKE ? OR content LIKE ?) LIMIT ?`).bind(...i(`%${y}%`,s*2)).all();for(const f of g.results||[])d.set(f.id,(d.get(f.id)||0)+1),u.set(f.id,f)}const p=[...u.values()].sort((y,g)=>(d.get(g.id)||0)-(d.get(y.id)||0)).slice(0,s);return p.length>0&&await this.touchMemories(t,p.map(y=>y.id)),p}async touchMemories(t,n){for(const s of n)await this.db.prepare("UPDATE memory SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t).run()}async update(t,n,s){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t,n).run()}async promote(t,n){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,n).run(),await this.enforceWorkingMemoryCap(n)}async demote(t,n){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,n).run()}async remove(t,n){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,n).run()}async buildContext(t){const n=await this.getWorkingMemory(t);if(n.length===0)return"";const s={};for(const a of n)s[a.type]||(s[a.type]=[]),s[a.type].push(a);let r=`
## Working Memory (Active Context)
`;for(const[a,i]of Object.entries(s)){r+=`
### ${a.charAt(0).toUpperCase()+a.slice(1)}s
`;for(const o of i)r+=`- **${o.title}**: ${o.content}
`}return Nn(r,Bi)}static truncatePersonality(t){return Nn(t,Ui)}async getRecentConversations(t,n=20,s){return s?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,s,n).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,n).all()).results||[]).reverse()}async storeMessage(t,n,s,r,a="{}",i){const o=Fi(r);i?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,n,s,r,a,o,i).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,n,s,r,a,o).run()}async compactHistory(t,n=30){const s=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((s==null?void 0:s.cnt)||0)<=n*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,n).run()}}const Wi=Object.freeze(Object.defineProperty({__proto__:null,MemoryService:Q,buildNotesContext:Pn},Symbol.toStringTag,{value:"Module"})),qi="https://accounts.google.com/o/oauth2/v2/auth",ur="https://oauth2.googleapis.com/token",Gi="https://www.googleapis.com/oauth2/v2/userinfo",zi=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let Me=null;async function In(e,t,n){const s=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!s)return null;try{const r=await G(s.encrypted_value,n);return JSON.parse(r)}catch{return null}}async function Ki(e,t,n,s){const r=await Nt(JSON.stringify(s),n);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,r).run()}function mr(e,t,n){const s=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:zi,access_type:"offline",prompt:"consent",state:n,include_granted_scopes:"true"});return`${qi}?${s}`}async function pr(e,t,n,s){const r=await fetch(ur,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:n,redirect_uri:s,grant_type:"authorization_code"})}),a=await r.text();if(!r.ok)throw new Error(`Token exchange failed (${r.status}): ${a.substring(0,300)}`);return JSON.parse(a)}async function Yi(e,t,n){const s=await fetch(ur,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:n,grant_type:"refresh_token"})}),r=await s.text();if(!s.ok)throw s.status===400||s.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${s.status}): ${r.substring(0,300)}`);return JSON.parse(r)}async function hr(e){const t=await fetch(Gi,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function Ot(e,t,n,s,r){if(!s||!r)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(Me&&Me.userId===t&&Me.expiresAt>Date.now()/1e3+60){const o=await In(e,t,n);return{token:Me.token,email:(o==null?void 0:o.email)||"unknown"}}const a=await In(e,t,n);if(!a)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const i=await Yi(a.refresh_token,s,r);return Me={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{token:i.access_token,email:a.email}}async function Bn(e,t,n){try{const s=await In(e,t,n);return s?{connected:!0,email:s.email,connectedAt:s.connected_at}:{connected:!1}}catch{return{connected:!1}}}function gr(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function fr(e,t,n,s,r,a,i){const o=await pr(s,a,i,r);if(!o.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await hr(o.access_token),c={refresh_token:o.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await Ki(e,t,n,c),Me={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{email:l.email,name:l.name}}async function yr(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(Me==null?void 0:Me.userId)===t&&(Me=null)}const tt="https://sheets.googleapis.com/v4/spreadsheets";class vr{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Ot(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,n){const s=await this.authHeaders(),r=encodeURIComponent(n),a=await fetch(`${tt}/${t}/values/${r}`,{headers:s});if(!a.ok){const o=await a.text();throw new Error(`Sheets read failed (${a.status}): ${o}`)}return(await a.json()).values||[]}async writeRange(t,n,s){const r=await this.authHeaders(),a=encodeURIComponent(n),i=await fetch(`${tt}/${t}/values/${a}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:r,body:JSON.stringify({range:n,majorDimension:"ROWS",values:s})});if(!i.ok){const l=await i.text();throw new Error(`Sheets write failed (${i.status}): ${l}`)}return{updatedCells:(await i.json()).updatedCells||0}}async appendRows(t,n,s){var l;const r=await this.authHeaders(),a=encodeURIComponent(n),i=await fetch(`${tt}/${t}/values/${a}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:r,body:JSON.stringify({range:n,majorDimension:"ROWS",values:s})});if(!i.ok){const c=await i.text();throw new Error(`Sheets append failed (${i.status}): ${c}`)}return{updatedCells:((l=(await i.json()).updates)==null?void 0:l.updatedCells)||s.length}}async deleteRow(t,n,s){const r=await this.authHeaders(),a=await fetch(`${tt}/${t}?fields=sheets.properties`,{headers:r});if(!a.ok){const u=await a.text();throw new Error(`Failed to get sheet metadata (${a.status}): ${u}`)}const i=await a.json(),o=i.sheets.find(u=>u.properties.title===n);if(!o){const u=i.sheets.map(p=>p.properties.title).join(", ");throw new Error(`Tab "${n}" not found. Available tabs: ${u}`)}const l=o.properties.sheetId,c=s-1,d=await fetch(`${tt}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{deleteDimension:{range:{sheetId:l,dimension:"ROWS",startIndex:c,endIndex:c+1}}}]})});if(!d.ok){const u=await d.text();throw new Error(`Row delete failed (${d.status}): ${u}`)}}async createSpreadsheet(t,n){const s=await this.authHeaders(),r={properties:{title:t},sheets:n&&n.length>0?n.map(o=>({properties:{title:o}})):[{properties:{title:"Sheet1"}}]},a=await fetch(tt,{method:"POST",headers:s,body:JSON.stringify(r)});if(!a.ok){const o=await a.text();throw new Error(`Sheets create failed (${a.status}): ${o}`)}const i=await a.json();return{spreadsheetId:i.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${i.spreadsheetId}/edit`}}async getMetadata(t){const n=await this.authHeaders(),s=await fetch(`${tt}/${t}?fields=properties.title,sheets.properties.title`,{headers:n});if(!s.ok){const a=await s.text();throw new Error(`Sheets metadata failed (${s.status}): ${a}`)}const r=await s.json();return{title:r.properties.title,sheets:r.sheets.map(a=>a.properties.title)}}}const At="https://www.googleapis.com/calendar/v3";class un{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Ot(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",n={}){const s=await this.authHeaders(),r=new URLSearchParams;n.timeMin&&r.set("timeMin",n.timeMin),n.timeMax&&r.set("timeMax",n.timeMax),r.set("maxResults",String(n.maxResults||20)),r.set("singleEvents","true"),r.set("orderBy","startTime"),n.query&&r.set("q",n.query);const a=await fetch(`${At}/calendars/${encodeURIComponent(t)}/events?${r}`,{headers:s});if(!a.ok){const o=await a.text();throw new Error(`Calendar list failed (${a.status}): ${o}`)}return(await a.json()).items||[]}async createEvent(t="primary",n){var o;const s=await this.authHeaders(),r=n.timeZone||"Asia/Kolkata",a={summary:n.summary,description:n.description||"",location:n.location||"",start:{dateTime:n.startDateTime,timeZone:r},end:{dateTime:n.endDateTime,timeZone:r}};(o=n.attendees)!=null&&o.length&&(a.attendees=n.attendees.map(l=>({email:l})));const i=await fetch(`${At}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:s,body:JSON.stringify(a)});if(!i.ok){const l=await i.text();throw new Error(`Calendar create failed (${i.status}): ${l}`)}return await i.json()}async updateEvent(t="primary",n,s){const r=await this.authHeaders(),a=s.timeZone||"Asia/Kolkata",i={};s.summary&&(i.summary=s.summary),s.description&&(i.description=s.description),s.location&&(i.location=s.location),s.startDateTime&&(i.start={dateTime:s.startDateTime,timeZone:a}),s.endDateTime&&(i.end={dateTime:s.endDateTime,timeZone:a});const o=await fetch(`${At}/calendars/${encodeURIComponent(t)}/events/${n}`,{method:"PATCH",headers:r,body:JSON.stringify(i)});if(!o.ok){const l=await o.text();throw new Error(`Calendar update failed (${o.status}): ${l}`)}return await o.json()}async deleteEvent(t="primary",n){const s=await this.authHeaders(),r=await fetch(`${At}/calendars/${encodeURIComponent(t)}/events/${n}`,{method:"DELETE",headers:s});if(!r.ok&&r.status!==410){const a=await r.text();throw new Error(`Calendar delete failed (${r.status}): ${a}`)}}async listCalendars(){const t=await this.authHeaders(),n=await fetch(`${At}/users/me/calendarList`,{headers:t});if(!n.ok){const r=await n.text();throw new Error(`Calendar list calendars failed (${n.status}): ${r}`)}return((await n.json()).items||[]).map(r=>({id:r.id,summary:r.summary,primary:r.primary||!1}))}}const $e="https://docs.googleapis.com/v1/documents",Ji="https://www.googleapis.com/drive/v3/files";function us(e){const t=[];for(const n of e.split(`
`)){const s=n.trim();if(s===""||/^---+$/.test(s))continue;let r="NORMAL_TEXT",a=n;const i=s.match(/^###\s+(.+)/),o=!i&&s.match(/^##\s+(.+)/),l=!i&&!o&&s.match(/^#\s+(.+)/);i?(r="HEADING_3",a=i[1]):o?(r="HEADING_2",a=o[1]):l?(r="HEADING_1",a=l[1]):/^\s*[-*]\s/.test(n)&&(a="• "+n.replace(/^\s*[-*]\s+/,""));const{text:c,spans:d}=Vi(a);t.push({text:c,namedStyle:r,spans:d})}return t}function Vi(e){const t=[];let n="",s=0;for(;s<e.length;)if(e[s]==="*"&&e[s+1]==="*"){const r=e.indexOf("**",s+2);if(r!==-1){const a=n.length;n+=e.substring(s+2,r),t.push({start:a,end:n.length,bold:!0}),s=r+2}else n+=e[s++]}else if(e[s]==="_"&&e[s+1]==="_"){const r=e.indexOf("__",s+2);if(r!==-1){const a=n.length;n+=e.substring(s+2,r),t.push({start:a,end:n.length,bold:!0}),s=r+2}else n+=e[s++]}else if(e[s]==="*"&&e[s+1]!=="*"){const r=e.indexOf("*",s+1);if(r!==-1){const a=n.length;n+=e.substring(s+1,r),t.push({start:a,end:n.length,italic:!0}),s=r+1}else n+=e[s++]}else if(e[s]==="_"){const r=e.indexOf("_",s+1);if(r!==-1){const a=n.length;n+=e.substring(s+1,r),t.push({start:a,end:n.length,italic:!0}),s=r+1}else n+=e[s++]}else n+=e[s++];return{text:n,spans:t}}class wr{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Ot(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const n=await this.authHeaders(),s=await fetch($e,{method:"POST",headers:n,body:JSON.stringify({title:t})});if(!s.ok){const a=await s.text();throw new Error(`Docs create failed (${s.status}): ${a}`)}const r=await s.json();return{documentId:r.documentId,url:`https://docs.google.com/document/d/${r.documentId}/edit`}}async readDocument(t){var i,o;const n=await this.authHeaders(),s=await fetch(`${$e}/${t}`,{headers:n});if(!s.ok){const l=await s.text();throw new Error(`Docs read failed (${s.status}): ${l}`)}const r=await s.json();let a="";for(const l of((i=r.body)==null?void 0:i.content)||[])if(l.paragraph)for(const c of l.paragraph.elements)(o=c.textRun)!=null&&o.content&&(a+=c.textRun.content);return{title:r.title,content:a.trim()}}async rewriteDocument(t,n){var g;const s=await this.authHeaders(),r=await fetch(`${$e}/${t}`,{headers:s});if(!r.ok){const f=await r.text();throw new Error(`Docs fetch failed (${r.status}): ${f.substring(0,200)}`)}const i=((g=(await r.json()).body)==null?void 0:g.content)||[],o=i[i.length-1],l=(o==null?void 0:o.endIndex)??2,c=us(n),d=[];if(l>2&&d.push({deleteContentRange:{range:{startIndex:1,endIndex:l-1}}}),c.length===0){d.length>0&&await fetch(`${$e}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:d})});return}let u="";const p=[];for(const f of c){const w=u.length;u+=f.text+`
`,p.push({start:w,end:u.length,namedStyle:f.namedStyle,spans:f.spans})}d.push({insertText:{location:{index:1},text:u}});for(const f of p){f.namedStyle!=="NORMAL_TEXT"&&d.push({updateParagraphStyle:{range:{startIndex:1+f.start,endIndex:1+f.end},paragraphStyle:{namedStyleType:f.namedStyle},fields:"namedStyleType"}});for(const w of f.spans){const _={},T=[];w.bold&&(_.bold=!0,T.push("bold")),w.italic&&(_.italic=!0,T.push("italic")),T.length>0&&d.push({updateTextStyle:{range:{startIndex:1+f.start+w.start,endIndex:1+f.start+w.end},textStyle:_,fields:T.join(",")}})}}const y=await fetch(`${$e}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:d})});if(!y.ok){const f=await y.text();throw new Error(`Docs rewrite failed (${y.status}): ${f.substring(0,200)}`)}}async appendFormattedContent(t,n){var g;const s=await this.authHeaders(),r=us(n);if(r.length===0)return;const a=await fetch(`${$e}/${t}`,{headers:s});if(!a.ok){const f=await a.text();throw new Error(`Docs fetch failed (${a.status}): ${f.substring(0,200)}`)}const o=((g=(await a.json()).body)==null?void 0:g.content)||[],l=o[o.length-1],c=Math.max(1,((l==null?void 0:l.endIndex)??2)-1);let d="";const u=[];for(const f of r){const w=d.length;d+=f.text+`
`,u.push({start:w,end:d.length,namedStyle:f.namedStyle,spans:f.spans})}const p=[{insertText:{location:{index:c},text:d}}];for(const f of u){f.namedStyle!=="NORMAL_TEXT"&&p.push({updateParagraphStyle:{range:{startIndex:c+f.start,endIndex:c+f.end},paragraphStyle:{namedStyleType:f.namedStyle},fields:"namedStyleType"}});for(const w of f.spans){const _={},T=[];w.bold&&(_.bold=!0,T.push("bold")),w.italic&&(_.italic=!0,T.push("italic")),T.length>0&&p.push({updateTextStyle:{range:{startIndex:c+f.start+w.start,endIndex:c+f.start+w.end},textStyle:_,fields:T.join(",")}})}}const y=await fetch(`${$e}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:p})});if(!y.ok){const f=await y.text();throw new Error(`Docs append failed (${y.status}): ${f.substring(0,200)}`)}}async appendText(t,n){const s=await this.authHeaders(),r=await fetch(`${$e}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:[{insertText:{endOfSegmentLocation:{},text:n}}]})});if(!r.ok){const a=await r.text();throw new Error(`Docs append failed (${r.status}): ${a}`)}}async deleteContent(t,n){var i,o,l;const s=await this.authHeaders(),r=await fetch(`${$e}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:[{replaceAllText:{containsText:{text:n,matchCase:!0},replaceText:""}}]})});if(!r.ok){const c=await r.text();throw new Error(`Docs delete content failed (${r.status}): ${c.substring(0,200)}`)}return{occurrencesRemoved:((l=(o=(i=(await r.json()).replies)==null?void 0:i[0])==null?void 0:o.replaceAllText)==null?void 0:l.occurrencesChanged)??0}}async shareDocument(t,n,s="writer"){const r=await this.authHeaders(),a=await fetch(`${Ji}/${t}/permissions`,{method:"POST",headers:r,body:JSON.stringify({type:"user",role:s,emailAddress:n})});if(!a.ok){const i=await a.text();throw new Error(`Share failed (${a.status}): ${i}`)}}}class we{constructor(t,n,s,r,a){U(this,"sheets");U(this,"calendar");U(this,"docs");U(this,"db");U(this,"userId");U(this,"pinHash");this.db=t,this.userId=n,this.pinHash=s,this.sheets=new vr(t,n,s,r,a),this.calendar=new un(t,n,s,r,a),this.docs=new wr(t,n,s,r,a)}async isConnected(){return Bn(this.db,this.userId,this.pinHash)}}const nt=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:un,GoogleDocs:wr,GoogleServices:we,GoogleSheets:vr,completeOAuthFlow:fr,disconnectGoogle:yr,exchangeCodeForTokens:pr,fetchUserInfo:hr,generateAuthUrl:mr,getGoogleAuth:Ot,isGoogleConnected:Bn,isOAuthClientConfigured:gr},Symbol.toStringTag,{value:"Module"}));async function _r(e,t,n={}){const s={textQuery:t,languageCode:"en",pageSize:8};if(n.type&&(s.includedType=n.type),n.location){const l=n.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(s.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:n.radius||5e3}})}const r=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),a=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":r},body:JSON.stringify(s)});if(!a.ok){const l=await a.text();return{results:[],error:`Places API error (${a.status}): ${l.substring(0,200)}`}}const i=await a.json();return!i.places||i.places.length===0?{results:[]}:{results:i.places.map(l=>{var c,d,u;return{name:((c=l.displayName)==null?void 0:c.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(d=l.currentOpeningHours)==null?void 0:d.openNow,types:(u=l.types)==null?void 0:u.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function br(e,t){var a,i,o;const n=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),s=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":n}});if(!s.ok){const l=await s.text();return{error:`Place Details API error (${s.status}): ${l.substring(0,200)}`}}const r=await s.json();return{details:{name:((a=r.displayName)==null?void 0:a.text)||"",address:r.formattedAddress||"",phone:r.internationalPhoneNumber,website:r.websiteUri,rating:r.rating,reviews:(i=r.reviews)==null?void 0:i.slice(0,3).map(l=>{var c,d,u;return{author:((c=l.authorAttribution)==null?void 0:c.displayName)||"Anonymous",rating:l.rating||0,text:((u=(d=l.text)==null?void 0:d.text)==null?void 0:u.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(o=r.currentOpeningHours)==null?void 0:o.weekdayDescriptions,location:r.location?{lat:r.location.latitude,lng:r.location.longitude}:void 0,googleMapsUri:r.googleMapsUri}}}async function Er(e,t,n,s={}){var c;const r=new URLSearchParams({origin:t,destination:n,key:e,mode:s.mode||"driving"});(s.mode==="driving"||!s.mode)&&r.set("departure_time","now");const a=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${r}`);if(!a.ok)return{error:`Directions API error: ${a.status}`};const i=await a.json();if(i.status!=="OK")return{error:`Directions: ${i.status} — ${i.error_message||""}`};const o=i.routes[0],l=o.legs[0];return{route:{summary:o.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(c=l.duration_in_traffic)==null?void 0:c.text,steps:l.steps.slice(0,10).map(d=>{var u,p,y;return{instruction:((u=d.html_instructions)==null?void 0:u.replace(/<[^>]*>/g,""))||"",distance:((p=d.distance)==null?void 0:p.text)||"",duration:((y=d.duration)==null?void 0:y.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function Tr(e,t,n,s){var l,c;const r={q:t,target:n,key:e,format:"text"};s&&(r.source=s);const a=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok){const d=await a.text();return{translatedText:"",error:`Translate API error (${a.status}): ${d.substring(0,200)}`}}const o=(c=(l=(await a.json()).data)==null?void 0:l.translations)==null?void 0:c[0];return o?{translatedText:o.translatedText,detectedSourceLang:o.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function Sr(e,t){const n=new URLSearchParams({address:t,key:e}),s=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${n}`);if(!s.ok)return{results:[],error:`Geocoding API error: ${s.status}`};const r=await s.json();return r.status!=="OK"&&r.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${r.status} — ${r.error_message||""}`}:{results:(r.results||[]).slice(0,5).map(a=>{var i;return{address:a.formatted_address,lat:a.geometry.location.lat,lng:a.geometry.location.lng,placeId:a.place_id,types:(i=a.types)==null?void 0:i.slice(0,3)}})}}async function kr(e,t,n={}){const s=new URLSearchParams({part:"snippet",q:t,key:e,type:n.type||"video",maxResults:String(n.maxResults||5),order:n.order||"relevance"}),r=await fetch(`https://www.googleapis.com/youtube/v3/search?${s}`);if(!r.ok){const i=await r.text();return{results:[],error:`YouTube API error (${r.status}): ${i.substring(0,200)}`}}return{results:((await r.json()).items||[]).map(i=>{var o,l,c,d,u,p,y,g;return{title:i.snippet.title,channelTitle:i.snippet.channelTitle,description:(o=i.snippet.description)==null?void 0:o.substring(0,200),videoId:((l=i.id)==null?void 0:l.videoId)||((c=i.id)==null?void 0:c.channelId)||((d=i.id)==null?void 0:d.playlistId)||"",publishedAt:i.snippet.publishedAt,url:(u=i.id)!=null&&u.videoId?`https://www.youtube.com/watch?v=${i.id.videoId}`:(p=i.id)!=null&&p.channelId?`https://www.youtube.com/channel/${i.id.channelId}`:"",thumbnailUrl:(g=(y=i.snippet.thumbnails)==null?void 0:y.medium)==null?void 0:g.url}})}}const Zi="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";function xr(e,t){if(/anomaly-modal/i.test(e))return[];const n=[],s=e.split(/class="result results_links/g).slice(1);for(const r of s){if(n.length>=t)break;const a=r.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),i=r.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(a){let o=a[1];const l=o.match(/uddg=([^&]+)/);l?o=decodeURIComponent(l[1]):o.startsWith("//")&&(o="https:"+o);const c=p=>p.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),d=c(a[2]),u=i?c(i[1]):"";if(d&&o.startsWith("http")){const p=o.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];n.push({title:d,link:o,snippet:u,displayLink:p})}}}return n}async function Xi(e,t,n,s){const r=new URLSearchParams({key:t,cx:n,q:e,num:String(Math.min(s,10))}),a=await fetch(`https://www.googleapis.com/customsearch/v1?${r}`);if(!a.ok){const l=await a.text().catch(()=>"");return{results:[],error:`Google CSE failed (${a.status}): ${l.substring(0,200)}`}}return{results:((await a.json()).items||[]).map(l=>({title:l.title||"",link:l.link||"",snippet:l.snippet||"",displayLink:l.displayLink||(l.link||"").replace(/^https?:\/\/(www\.)?/,"").split("/")[0]})).filter(l=>l.title&&l.link.startsWith("http"))}}async function It(e,t={}){const n=Math.min(t.num||5,10),s=t.site?`site:${t.site} ${e}`:e;try{const r=new URLSearchParams({q:s}),a=await fetch("https://html.duckduckgo.com/html/",{method:"POST",headers:{"User-Agent":Zi,"Content-Type":"application/x-www-form-urlencoded"},body:r.toString()});if(!a.ok)return{results:[],error:`Search request failed (${a.status})`};const i=await a.text(),o=xr(i,n);if(o.length>0)return{results:o};if(t.googleApiKey&&t.googleCseId){const l=await Xi(s,t.googleApiKey,t.googleCseId,n);if(l.results.length>0)return l;if(l.error)return{results:[],error:l.error}}return/anomaly-modal/i.test(i)?{results:[],error:"Web search blocked by DuckDuckGo bot protection. Configure GOOGLE_API_KEY + GOOGLE_CSE_ID, or add a Tavily API key in Settings → Keys for faster research."}:{results:[],error:void 0}}catch(r){return{results:[],error:`Web search error: ${r.message}`}}}async function Dr(e,t,n,s="driving"){var l,c,d,u;const r=new URLSearchParams({origins:t,destinations:n,key:e,mode:s,departure_time:"now"}),a=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${r}`);if(!a.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${a.status}`};const i=await a.json(),o=(d=(c=(l=i.rows)==null?void 0:l[0])==null?void 0:c.elements)==null?void 0:d[0];return!o||o.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(o==null?void 0:o.status)||i.status}`}:{distance:o.distance.text,duration:o.duration.text,durationInTraffic:(u=o.duration_in_traffic)==null?void 0:u.text}}const Qi=Object.freeze(Object.defineProperty({__proto__:null,geocode:Sr,getDirections:Er,getDistanceMatrix:Dr,getPlaceDetails:br,parseDuckDuckGoHtml:xr,searchPlaces:_r,searchYouTube:kr,translateText:Tr,webSearch:It},Symbol.toStringTag,{value:"Module"})),je="https://gmail.googleapis.com/gmail/v1/users/me";function eo(e,t){if(e)return e;const n=t?parseInt(t,10):NaN;return!Number.isNaN(n)&&n>0?new Date(n).toISOString():""}function to(e,t){return e===403?"Gmail access denied (403). Reconnect your Google account in Settings → Keys → Google Workspace to grant Gmail permissions.":`Gmail list failed (${e}): ${t.substring(0,200)}`}class ke{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Ot(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var l;const n=await this.authHeaders(),s=new URLSearchParams;if(s.set("maxResults",String(t.maxResults||10)),t.query&&s.set("q",t.query),(l=t.labelIds)!=null&&l.length)for(const c of t.labelIds)s.append("labelIds",c);const r=await fetch(`${je}/messages?${s}`,{headers:n});if(!r.ok){const c=await r.text();throw new Error(to(r.status,c))}const a=await r.json();if(!a.messages||a.messages.length===0)return[];const i=[];let o=0;for(const c of a.messages.slice(0,t.maxResults||10))try{const d=await this.getMessage(c.id,n);d?i.push(d):o++}catch{o++}if(i.length===0&&o>0)throw new Error(`Gmail found ${a.messages.length} matching message(s) but could not read message details (${o} metadata fetch failure(s)). Reconnect Google in Settings → Keys → Google Workspace to refresh Gmail permissions, then try again.`);return i}async getMessage(t,n){const s=n||await this.authHeaders(),r=await fetch(`${je}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:s});if(!r.ok)return null;const a=await r.json(),i=o=>{var l,c,d;return((d=(c=(l=a.payload)==null?void 0:l.headers)==null?void 0:c.find(u=>u.name.toLowerCase()===o.toLowerCase()))==null?void 0:d.value)||""};return{id:a.id,threadId:a.threadId,snippet:a.snippet||"",subject:i("Subject")||"(no subject)",from:i("From"),to:i("To"),date:eo(i("Date"),a.internalDate),isUnread:(a.labelIds||[]).includes("UNREAD"),labels:a.labelIds||[]}}async getMessageBody(t){const n=await this.authHeaders(),s=await fetch(`${je}/messages/${t}?format=full`,{headers:n});if(!s.ok){const a=await s.text();throw new Error(`Gmail message body failed (${s.status}): ${a.substring(0,200)}`)}const r=await s.json();return so(r.payload)}async search(t,n=10){return this.listMessages({query:t,maxResults:n})}async send(t,n,s,r={}){const a=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${n}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];r.cc&&i.push(`Cc: ${r.cc}`),r.bcc&&i.push(`Bcc: ${r.bcc}`),r.replyToMessageId&&(i.push(`In-Reply-To: ${r.replyToMessageId}`),i.push(`References: ${r.replyToMessageId}`)),i.push("",ms(s));const o=i.join(`\r
`),c={raw:ps(o)};r.threadId&&(c.threadId=r.threadId);const d=await fetch(`${je}/messages/send`,{method:"POST",headers:a,body:JSON.stringify(c)});if(!d.ok){const u=await d.text();throw new Error(`Gmail send failed (${d.status}): ${u.substring(0,200)}`)}return await d.json()}async createDraft(t,n,s,r={}){const a=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${n}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];r.cc&&i.push(`Cc: ${r.cc}`),i.push("",ms(s));const o=i.join(`\r
`),l=ps(o),c=await fetch(`${je}/drafts`,{method:"POST",headers:a,body:JSON.stringify({message:{raw:l}})});if(!c.ok){const d=await c.text();throw new Error(`Gmail draft failed (${c.status}): ${d.substring(0,200)}`)}return await c.json()}async markAsRead(t){const n=await this.authHeaders();await fetch(`${je}/messages/${t}/modify`,{method:"POST",headers:n,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,n){const s=await this.authHeaders();let r={};switch(n){case"archive":r={removeLabelIds:["INBOX"]};break;case"trash":r={addLabelIds:["TRASH"]};break;case"read":r={removeLabelIds:["UNREAD"]};break;case"unread":r={addLabelIds:["UNREAD"]};break;case"star":r={addLabelIds:["STARRED"]};break;case"unstar":r={removeLabelIds:["STARRED"]};break}const a=await fetch(`${je}/messages/${t}/modify`,{method:"POST",headers:{...s,"Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok){const i=await a.text();throw new Error(`Failed to modify message: ${i}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),n=await fetch(`${je}/labels/INBOX`,{headers:t});return n.ok&&(await n.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),n=await fetch(`${je}/profile`,{headers:t});if(!n.ok)throw new Error("Failed to get Gmail profile");return await n.json()}}function no(e){let t="",n="";function s(r){var a,i,o,l;if(r){if(r.mimeType==="text/plain"&&((a=r.body)!=null&&a.data))t+=an(r.body.data);else if(r.mimeType==="text/html"&&((i=r.body)!=null&&i.data))n+=an(r.body.data);else if((o=r.parts)!=null&&o.length)for(const c of r.parts)s(c);else if((l=r.body)!=null&&l.data&&!r.parts){const c=an(r.body.data);r.mimeType==="text/html"?n+=c:t+=c}}}return s(e),{plain:t.trim(),html:n.trim()}}function so(e){var r,a;if(!e)return"";if((r=e.body)!=null&&r.data&&!((a=e.parts)!=null&&a.length)){const i=an(e.body.data);return e.mimeType==="text/html"?hs(i):i}const{plain:t,html:n}=no(e),s=n?hs(n):"";return t&&s?t.length<200&&s.length>t.length?s:t.length>=s.length?t:s:t||s||e.snippet||""}function ms(e){e=e.replace(/\\n/g,`
`).replace(/\\t/g,"	");let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return t=t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)","g"),"<em>$1</em>"),`<html><body style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#000000;">${t.split(/\n\n+/).map(r=>{const a=r.split(`
`);return a.every(i=>/^\s*[-*]\s/.test(i)||i.trim()==="")?`<ul>${a.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*[-*]\s+/,"")}</li>`).join("")}</ul>`:a.every(i=>/^\s*\d+\.\s/.test(i)||i.trim()==="")?`<ol>${a.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*\d+\.\s+/,"")}</li>`).join("")}</ol>`:`<p>${a.join("<br>")}</p>`}).join("")}</body></html>`}function ps(e){const t=new TextEncoder().encode(e);let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function an(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function hs(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<img[^>]+alt=["']([^"']+)["'][^>]*>/gi,`
$1
`).replace(/<br\s*\/?>/gi,`
`).replace(/<\/t[dh]>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}function En(e,t){const n=`${e.subject} ${e.snippet} ${e.from}`.toLowerCase(),s=t.toLowerCase();let r=0;n.includes(s)&&(r+=10);for(const a of s.split(/\s+/))a.length>2&&n.includes(a)&&(r+=3);return/\b(order|ordered|confirmation|invoice|receipt|thank you for your order)\b/i.test(`${e.subject} ${e.snippet}`)&&(r+=6),/\b(delivered|delivery|out for delivery|shipped|dispatch|dispatched|arriving)\b/i.test(e.subject)&&(r-=4),r}function gs(e){return e.map((t,n)=>`${t.isUnread?"● ":"  "}${n+1}. **${t.subject}**
   From: ${t.from}
   Date: ${t.date}
   ${t.snippet}
   [id: ${t.id}]`).join(`

`)}function ro(e,t,n){if(e.length===0)return`No purchase-related emails found for "${t}" (query: ${n}).`;const s=[...e].sort((i,o)=>En(o,t)-En(i,t)),r=s[0];if(En(r,t)>0){const i=`**Purchase email for "${t}"**

**${r.subject}**
Date received: ${r.date}
From: ${r.from}
Preview: ${r.snippet}

`,o=s.length>1?`Other related messages:

${gs(s.slice(1,6))}`:"";return i+o}return`No clear purchase confirmation for "${t}". Closest matches:

${gs(s.slice(0,8))}`}const ao=15e3,io=15e3,oo=15e3,lo=6e4;async function Un(e,t){try{const n=new AbortController,s=setTimeout(()=>n.abort(),io),r=await fetch(e,{signal:n.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(!r.ok)return{text:"",error:`HTTP ${r.status}`};const a=r.headers.get("content-type")||"";if(!a.includes("text/html")&&!a.includes("text/plain")&&!a.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${a.split(";")[0]}`};const i=await r.text();clearTimeout(s);const o=i.length>2e5?i.substring(0,2e5):i,l=co(o);return l.length<50?{text:"",error:"Page has too little readable content"}:{text:l.substring(0,t||ao)}}catch(n){return{text:"",error:n.name==="AbortError"?"Timeout":n.message}}}function co(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(n,s)=>String.fromCharCode(parseInt(s))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(n=>n.trim()).filter(n=>n.length>0).join(`
`),t.trim()}async function Rr(e,t,n){const s=new AbortController,r=setTimeout(()=>s.abort(),oo);try{const a=await fetch("https://api.tavily.com/search",{method:"POST",signal:s.signal,headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:t,query:e,search_depth:n==="quick"?"basic":"advanced",include_raw_content:!0,max_results:n==="quick"?7:5})});return clearTimeout(r),a.ok?{results:(await a.json()).results||[]}:{results:[],error:`Tavily error ${a.status}`}}catch(a){clearTimeout(r);const i=a.name==="AbortError"?"Timeout":a.message;return console.warn("[searchViaTavily]",i),{results:[],error:i}}}async function Qt(e,t,n,s){var i,o;const r=new AbortController,a=setTimeout(()=>r.abort(),lo);try{const l=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",signal:r.signal,headers:{"x-api-key":e,"anthropic-version":"2023-06-01","content-type":"application/json"},body:JSON.stringify({model:"claude-opus-4-8",max_tokens:s,system:t,messages:[{role:"user",content:n}]})});if(clearTimeout(a),!l.ok){let d=`Opus API error ${l.status}`;throw l.status===401?d="Opus API error 401: invalid or expired Anthropic API key":l.status===404?d="Opus API error 404: model not found — check the model ID":l.status===529&&(d="Opus API error 529: Anthropic API overloaded"),new Error(d)}return((o=(i=(await l.json()).content)==null?void 0:i[0])==null?void 0:o.text)||""}catch(l){throw clearTimeout(a),l}}function fs(e,t){try{const n=e.match(/\[[\s\S]*\]/);if(!n)return t;const s=JSON.parse(n[0]);if(Array.isArray(s)&&s.every(r=>typeof r=="string"))return s.filter(Boolean)}catch{}return t}async function Nr(e){return e.raw_content&&e.raw_content.length>100?e.raw_content.slice(0,15e3):(await Un(e.url,15e3)).text}async function uo(e,t,n,s,r){const a=[];async function i(w,_,T){let x=[];return n&&(x=(await Rr(w,n,T)).results),x.length===0&&(x=(await r(w,_)).map(M=>({url:M.link,title:M.title,content:M.snippet,raw_content:null,score:0}))),(await Promise.all(x.map(async I=>({result:I,content:await Nr(I)})))).filter(I=>I.content.length>50)}if(s==="quick"){const w=await i(e,7,"quick");let _="";for(let x=0;x<w.length;x++){const L=w[x],I=`[${x+1}] ${L.result.title}
${L.result.url}

${L.content}

`;if(_.length+I.length>8e4)break;_+=I,a.push({url:L.result.url,title:L.result.title})}return{report:await Qt(t,"You are an expert research analyst. Write a clear, accurate, well-structured report answering the query based on provided sources. Cite sources as [1], [2] etc. Be precise and factual.",`Query: ${e}

Sources:
${_}`,2048),sources:a,pagesRead:w.length}}const o=await Qt(t,"You are a research planning expert.",`I need to research: ${e}

Generate exactly 4-5 specific sub-queries that together cover all important angles (definition, current state, comparisons, recent developments, expert analysis). Return ONLY a JSON array of strings, nothing else.`,400),l=fs(o,[e,`${e} overview`,`${e} examples`,`${e} latest`]).slice(0,5),c=await Promise.all(l.map(w=>i(w,5,"thorough"))),d=new Set,u=[];for(const w of c)for(const _ of w)d.has(_.result.url)||u.length>=20||(d.add(_.result.url),u.push(_));let p="";for(let w=0;w<u.length;w++){const _=u[w],T=`[${w+1}] ${_.result.title}
${_.result.url}

${_.content}

`;if(p.length+T.length>18e4)break;p+=T,a.push({url:_.result.url,title:_.result.title})}const y=await Qt(t,"You are a research analyst identifying information gaps.",`I'm researching: ${e}

Here's what I've found so far:
${p.slice(0,6e4)}

Identify 2-3 specific information gaps or important angles not yet covered. Return ONLY a JSON array of follow-up search queries.`,300),g=fs(y,[]).slice(0,3);if(g.length>0){let w=0;const _=await Promise.all(g.map(T=>i(T,4,"thorough")));for(const T of _)for(const x of T){if(w>=5||d.has(x.result.url))continue;d.add(x.result.url);const I=`[${a.length+1}] ${x.result.title}
${x.result.url}

${x.content}

`;if(p.length+I.length>18e4)break;p+=I,a.push({url:x.result.url,title:x.result.title}),u.push(x),w++}}return{report:await Qt(t,`You are an expert research analyst producing a comprehensive report. Use this exact structure:
**Executive Summary** (2-3 sentences)
**Key Findings** (bullet points with citations)
**Detailed Analysis** (multiple paragraphs with citations)
**Conflicting Information** (if sources disagree, note explicitly — omit this section if no conflicts)
**Sources** (numbered list of URLs)
Cite sources as [1], [2] etc. Be thorough, precise, and objective.`,`Research query: ${e}

Sources:
${p}`,4096),sources:a,pagesRead:u.length}}async function Ir(e,t,n={}){const s=n.depth||"quick",r=async(f,w)=>(await It(f,{num:w,site:n.site,googleApiKey:n.googleApiKey,googleCseId:n.googleCseId})).results||[];let a;if(n.anthropicKey)try{const f=await uo(e,n.anthropicKey,n.tavilyKey||null,s,r);if(f.report.trim())return{report:f.report,sources:f.sources.map(w=>({title:w.title,url:w.url})),pagesRead:f.pagesRead}}catch(f){a=f.message,console.warn("[conductResearch] Opus path failed:",f.message)}if(n.tavilyKey)try{const f=await Rr(e,n.tavilyKey,s);if(f.results.length>0){const w=s==="thorough"?8:5,T=(await Promise.all(f.results.slice(0,w).map(async M=>({result:M,content:await Nr(M)})))).filter(M=>M.content.length>50),x=T.map(M=>({title:M.result.title,url:M.result.url}));if(T.length>0){const M=T.map((z,W)=>`--- SOURCE ${W+1}: ${z.result.title} ---
${z.content}
--- END SOURCE ${W+1} ---`).join(`

`);return{report:await en(e,M,t,"full"),sources:x,pagesRead:T.length}}const L=f.results.map((M,j)=>`[${j+1}] ${M.title}
${M.content}
Source: ${M.url}`).join(`

`);return{report:await en(e,L,t,"snippets"),sources:f.results.map(M=>({title:M.title,url:M.url})),pagesRead:0}}}catch(f){console.warn("[conductResearch] Tavily path failed:",f.message)}const i=n.maxPages||(s==="thorough"?5:3),o=n.maxResults||(s==="thorough"?8:5),l=await It(e,{num:o,site:n.site,googleApiKey:n.googleApiKey,googleCseId:n.googleCseId});if(l.error){const f=a?` (Opus: ${a})`:"";return{report:"",sources:[],pagesRead:0,error:`Search failed: ${l.error}${f}`}}if(l.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const d=l.results.slice(0,i).map(async f=>{const w=await Un(f.link);return{title:f.title,url:f.link,displayLink:f.displayLink,snippet:f.snippet,content:w.text,error:w.error}}),p=(await Promise.all(d)).filter(f=>f.content.length>50);if(p.length===0){const f=l.results.map((_,T)=>`[${T+1}] ${_.title}
${_.snippet}
Source: ${_.link}`).join(`

`);return{report:await en(e,f,t,"snippets"),sources:l.results.map(_=>({title:_.title,url:_.link})),pagesRead:0}}const y=p.map((f,w)=>`--- SOURCE ${w+1}: ${f.title} (${f.displayLink}) ---
${f.content}
--- END SOURCE ${w+1} ---`).join(`

`);return{report:await en(e,y,t,"full"),sources:p.map(f=>({title:f.title,url:f.url})),pagesRead:p.length}}async function en(e,t,n,s){const a=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

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

Write a synthesized research report answering the query above.`;try{return(await n.chat([{role:"system",content:a},{role:"user",content:i}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(o){return`Research synthesis error: ${o.message}. Raw search results were found but could not be analyzed.`}}const mo=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:Ir,fetchPageContent:Un},Symbol.toStringTag,{value:"Module"})),Ze="https://api.browser-use.com/api/v2",ys=2e4,On=6e3,po=3e5,Hn=12e3,Or=new Set(["finished","stopped"]);async function Pt(e,t,n=Hn){const s=new AbortController,r=setTimeout(()=>s.abort(),n);try{return await fetch(e,{...t,signal:s.signal})}finally{clearTimeout(r)}}async function ho(e){const t=()=>fetch(`${Ze}/sessions`,{method:"POST",headers:{"X-Browser-Use-API-Key":e,"Content-Type":"application/json"},body:JSON.stringify({})});try{let n=await t();if(!n.ok){const r=await n.text().catch(()=>"");if(Ar(n.status,r)){if(console.log("[createBrowserSession] concurrency limit — reaping stale sessions and retrying"),await Cr(e),n=await t(),!n.ok)return console.log(`[createBrowserSession] FAILED after reap HTTP ${n.status}`),null}else return console.log(`[createBrowserSession] FAILED HTTP ${n.status}: ${r}`),null}const s=await n.json();return console.log(`[createBrowserSession] sessionId=${s.id}`),s.id??null}catch(n){return console.log(`[createBrowserSession] ERROR ${n.message}`),null}}async function mn(e,t){try{await fetch(`${Ze}/sessions/${e}`,{method:"DELETE",headers:{"X-Browser-Use-API-Key":t}}),console.log(`[closeBrowserSession] closed sessionId=${e}`)}catch{}}async function go(e){try{const t=await Pt(`${Ze}/sessions?filterBy=active&pageSize=100`,{headers:{"X-Browser-Use-API-Key":e}});return t.ok?(await t.json()).items??[]:[]}catch{return[]}}async function Cr(e,t){const n=await go(e);let s=0;for(const r of n)!r.id||t&&r.id===t||(await mn(r.id,e),s++);return s>0&&console.log(`[reapActiveBrowserSessions] closed ${s} stale session(s)`),s}function Ar(e,t){const n=(t||"").toLowerCase();return/session/.test(n)?/concurrent|too many|maximum|limit|exceeded/.test(n):!1}async function Fn(e,t,n){var o;const s=(n==null?void 0:n.timeoutMs)??po;console.log(`[runBrowserTask] starting taskLen=${e.length} timeoutMs=${s} hasSecrets=${!!(n!=null&&n.secrets)} reuseSession=${!!(n!=null&&n.sessionId)}`);let r,a;try{const l={task:e};n!=null&&n.secrets&&Object.keys(n.secrets).length>0&&(l.secrets=n.secrets),n!=null&&n.sessionId&&(l.sessionId=n.sessionId);const c=()=>fetch(`${Ze}/tasks`,{method:"POST",headers:{"X-Browser-Use-API-Key":t,"Content-Type":"application/json"},body:JSON.stringify(l)});let d=await c();if(!d.ok){const p=await d.text().catch(()=>"");if(Ar(d.status,p)&&(console.log("[runBrowserTask] concurrency limit — reaping stale sessions and retrying"),await Cr(t,n==null?void 0:n.sessionId),d=await c()),!d.ok){const y=await d.text().catch(()=>p);return console.log(`[runBrowserTask] CREATE_FAILED HTTP ${d.status}: ${y}`),{output:null,taskId:"",status:"failed",error:`HTTP ${d.status}: ${y}`}}}const u=await d.json();if(r=u.id,a=u.sessionId||void 0,console.log(`[runBrowserTask] CREATED taskId=${r} sessionId=${a}`),!r)return{output:null,taskId:"",status:"failed",error:"No id in create response"}}catch(l){return{output:null,taskId:"",status:"failed",error:l.message}}await new Promise(l=>setTimeout(l,ys));const i=Date.now()+(s-ys);for(;Date.now()<i;){try{const l=await Pt(`${Ze}/tasks/${r}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(l.ok){const c=await l.json();if(Or.has(c.status)){if(c.status==="finished"){let d=c.output??null;if(!d)try{const u=await Pt(`${Ze}/tasks/${r}`,{headers:{"X-Browser-Use-API-Key":t}},Hn);if(u.ok){const p=await u.json();if(d=p.output??null,!d&&((o=p.steps)!=null&&o.length)){const y=p.steps[p.steps.length-1];d=y.extracted_content??y.output??y.result??null}}}catch{}return console.log(`[runBrowserTask] COMPLETED taskId=${r} outputLen=${(d??"").length}`),{output:d,taskId:r,sessionId:a,status:"completed"}}return console.log(`[runBrowserTask] FAILED taskId=${r} status=${c.status}`),{output:c.output??null,taskId:r,status:"failed",error:c.output??"Task was stopped before completing"}}}}catch{}await new Promise(l=>setTimeout(l,On))}return console.log(`[runBrowserTask] TIMEOUT taskId=${r} sessionId=${a}`),{output:null,taskId:r,sessionId:a,status:"timeout"}}async function Lr(e,t,n){var a;const s=(n==null?void 0:n.waitMs)??3e4,r=Date.now()+s;for(;Date.now()<r;){try{const i=await Pt(`${Ze}/tasks/${e}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(!i.ok){await new Promise(l=>setTimeout(l,On));continue}const o=await i.json();if(Or.has(o.status)){let l=null;const c=await Pt(`${Ze}/tasks/${e}`,{headers:{"X-Browser-Use-API-Key":t}},Hn);if(c.ok){const d=await c.json();if(l=d.output??null,!l&&((a=d.steps)!=null&&a.length)){const u=d.steps[d.steps.length-1];l=u.extracted_content??u.output??u.result??null}}else l=o.output??null;return{status:o.status,output:l,done:!0}}}catch{}await new Promise(i=>setTimeout(i,On))}return{status:"running",output:null,done:!1}}function fo(e){return`Navigate to https://www.bluedart.com/tracking.
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
If a captcha was encountered, set captcha_required to true and populate whatever tracking data was visible before the captcha appeared.`}async function Mr(e){const t=e instanceof Buffer?new Uint8Array(e):e,n=new DataView(t.buffer,t.byteOffset,t.byteLength);let s=0;for(;s<t.length-30&&n.getUint32(s,!0)===67324752;){const r=n.getUint16(s+6,!0),a=n.getUint16(s+8,!0),i=n.getUint32(s+18,!0),o=n.getUint32(s+22,!0),l=n.getUint16(s+26,!0),c=n.getUint16(s+28,!0),d=new TextDecoder().decode(t.slice(s+30,s+30+l)),u=s+30+l+c;if(d==="word/document.xml"){const p=t.slice(u,u+i);let y;if(a===0)y=p;else{const w=new DecompressionStream("deflate-raw"),_=w.writable.getWriter();_.write(p),_.close();const T=w.readable.getReader(),x=[];let L=!1;for(;!L;){const j=await T.read();j.done?L=!0:x.push(j.value)}const I=x.reduce((j,z)=>j+z.length,0);y=new Uint8Array(o||I);let M=0;for(const j of x)y.set(j,M),M+=j.length}return new TextDecoder().decode(y).replace(/<\/w:p>/g,`
`).replace(/<\/w:tr>/g,`
`).replace(/<[^>]+>/g,"").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim()}s=u+i,r&8&&(s+=16)}return""}const $r=Object.freeze(Object.defineProperty({__proto__:null,extractDocxTextFromBuffer:Mr},Symbol.toStringTag,{value:"Module"})),yo=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,weight:.9},{pattern:/\bremi[a-z]{0,5}\s+(me|us)\b/i,weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,weight:.95},{pattern:/^[Tt]ask:\s*/,weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,weight:.9},{pattern:/\b(change\s+(the\s+)?time|update\s+(the\s+)?(reminder|schedule|alarm)|reschedule|move\s+it\s+to|cancel\s+(the\s+)?(reminder|schedule|alarm)|delete\s+(the\s+)?(reminder|schedule|alarm))\b/i,weight:.9},{pattern:/\b(show\s+(me\s+)?(my\s+)?(reminders?|schedules?|alarms?)|what\s+reminders?|any\s+reminders?|do\s+i\s+have.*remind|when\s+is\s+my\s+remind)\b/i,weight:.9},{pattern:/\b(stop|turn\s+off|switch\s+off|disable|deactivate)\s+(that|the|this|my)?\s*(reminder|schedule|alarm|notification)\b/i,weight:.9},{pattern:/\b(snooze|postpone|push\s+back|remind\s+me\s+later|later\s+reminder)\b/i,weight:.9},{pattern:/\b(change|update|edit|move|shift)\s+(it|this|that)\s+(to|for)\b/i,weight:.85},{pattern:/\bset\s+it\s+(for|at|to)\b/i,weight:.85},{pattern:/\b(what\s+time|when)\s+(did\s+i\s+set|is\s+(the|my)\s+remind|does\s+(it|that)\s+go\s+off)\b/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,weight:.9},{pattern:/\b(add|save|append|write|put)\s+(to|in|into)\s+(my\s+|your\s+|the\s+)?(quick\s+)?notes?\b|\bquick\s+notes\b/i,weight:.88},{pattern:/\b(update\s+cell|change\s+cell|delete\s+row|remove\s+row|delete\s+duplicate|remove\s+duplicate|create\s+(a\s+)?(new\s+)?(tab|sheet)|add\s+(a\s+)?tab|what.{0,15}(column|row\s+\d|cell\s+[A-Z])|sum\s+of|total\s+(in|of))\b/i,weight:.9},{pattern:/\b(forward\s+(that\s+)?(email|message)|reply\s+to\s+(that|the|an?\s+)?email|respond\s+to\s+(that|the)\s+email|mark\s+(it|that|this|email)\s+as|(got|received)\s+an?\s+email\s+from)\b/i,weight:.85},{pattern:/\b(cancel\s+(the\s+)?(event|meeting|appointment)|reschedule\s+(the\s+|my\s+)?(meeting|event|appointment)|delete\s+(from|the)\s+calendar|remove\s+(the\s+)?(event|meeting)\s+from\s+calendar)\b/i,weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,weight:.9},{pattern:/\b((save|store|put)\s+(it\s+|this\s+|that\s+|the\s+)?(to|in|on)\s+(my\s+|your\s+|google\s+)?drive|save\s+(to|as)\s+(a\s+)?(google\s+)?doc)\b/i,weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,weight:.9},{pattern:/\b(keep\s+(that\s+)?in\s+mind|always\s+(do|use|prefer|remember)|update\s+(my\s+)?(memory|preference)|delete\s+(that\s+)?memory|forget\s+that|what\s+did\s+i\s+tell\s+you\s+about)\b/i,weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,weight:.9}];function Wn(e,t,n){for(const s of yo)if(s.pattern.test(e))return{agent:"multi",confidence:s.weight,reasoning:"Keyword match — full agent"};if(e.trim().length<80){const s=[n,t].filter(Boolean);for(const r of s)if(r.split(`
`).slice(-16).some(o=>/\[TOOLS_USED:/i.test(o)||/\b(reminder|reminders|schedule|scheduled|cron|alarm|next_run|set for|going off|remind)\b/i.test(o)||/\b(i['']ll\s+(search|research|find|look\s+up|check|add|create|book)|just\s+a\s+moment|pulling\s+that\s+together|on\s+it\b|let\s+me\s+(search|research|find|look))\b/i.test(o)))return{agent:"multi",confidence:.8,reasoning:"Active tool session follow-up — full agent"}}return t&&/spreadsheet|sheet|google\s*sheet/i.test(t)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(e)?{agent:"multi",confidence:.85,reasoning:"Memory context — full agent"}:n!=null&&n.includes("[TOOLS_USED: research]")?{agent:"multi",confidence:.85,reasoning:"Research thread follow-up — full agent"}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function jr(e){const t=[/\bpurchased\s+(?:a\s+)?pair\s+of\s+(.{2,50}?)(?:\s+recently|[.?!,]|$)/i,/\b(?:purchased|bought|ordered)\s+(?:a\s+)?(?:pair\s+of\s+)?(.{2,50}?)(?:\s+recently|[.?!,]|$)/i,/\b(?:about|for)\s+(?:my\s+)?(.{2,50}?)\s+(?:purchase|order)/i];for(const n of t){const s=e.match(n);if(!(s!=null&&s[1]))continue;const r=s[1].trim().replace(/\s+(purchase|order|confirmation|email|gmail|mail).*$/i,"").replace(/^(the|a|an)\s+/i,"").trim();if(r.length>=3&&!/^(it|this|that|one|something)$/i.test(r))return r}return null}function qn(e){const t=e.trim(),n=t.includes(" ")?`"${t}"`:t,s=t.split(/\s+/).filter(a=>a.length>2);return`${s.length>1?`(${n} OR ${s[s.length-1]})`:n} newer_than:180d`}function vo(e){const t=/\b(gmail|email|e-?mail)\b/i.test(e),n=/\b(find|search|look\s+(?:for|up)?|locate|get)\b/i.test(e),s=/\b(purchase|purchased|bought|ordered|order|receipt|confirming|confirmation)\b/i.test(e),r=/\b(date|when|received)\b/i.test(e);return t&&(n||s||r)}function wo(e){if(!vo(e))return null;const t=jr(e);return t?{tool:"gmail_search",args:{query:qn(t),max_results:15,product_hint:t}}:null}function Gn(e){const t=e.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')]+/);if(t&&/\b(delete|trash|remove)\b/i.test(e))return{tool:"drive_delete_file",args:{url_or_id:t[0].replace(/[.,;)]$/,"")}};if(/\b(list|show|display)\s+(my\s+)?(google\s+)?drive\s+(files?|docs?|documents?|folders?)\b|\bwhat\s+(files?|docs?|documents?)\s+(do\s+i\s+have|are|is)\s+(in|on)\s+(my\s+)?(google\s+)?drive\b/i.test(e))return{tool:"drive_list",args:{}};const n=e.match(/\b(?:search|find|look\s+(?:for|up))\s+(?:(?:in|on|my|the|google)\s+)*drive\s+(?:for\s+)?(.{3,60}?)(?:\s*[?.!,])?$/i);if(n)return{tool:"drive_search",args:{query:n[1].trim()}};if(/\b(how\s+many\s+unread|unread\s+(count|emails?|messages?)|any\s+unread\s+(emails?|messages?))\b/i.test(e))return{tool:"gmail_unread_count",args:{}};if(/\b(list|show|display)\s+(my\s+)?(upcoming\s+)?(calendar\s+)?(events?|meetings?|appointments?)\b/i.test(e)&&!/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+week|this\s+week|\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))\b/i.test(e))return{tool:"list_calendar_events",args:{}};if(/\b(list|show|display)\s+(my\s+)?(active\s+)?(reminders?|schedules?|alarms?)\b|\bwhat\s+reminders?\s+(do\s+i\s+have|are\s+set|are\s+active)\b/i.test(e))return{tool:"list_schedules",args:{}};const s=wo(e);return s||null}function zn(e,t){if(/\b(delete|trash|remove)\b.{0,50}\b(file|doc|document|sheet|spreadsheet|folder)\b|\b(file|doc|document|sheet|spreadsheet)\b.{0,50}\b(delete|trash|remove)\b/i.test(e)){const n=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(n)return{tool:"drive_delete_file",args:{url_or_id:n[0].replace(/[.,;)]$/,"")}}}if(/\b(move|rename|organise|organize)\b.{0,50}\b(file|doc|document|sheet)\b/i.test(e)){const n=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(n){const s={url_or_id:n[0].replace(/[.,;)]$/,"")},r=e.match(/\bto\s+(?:the\s+)?(?:folder\s+)?["']?([A-Za-z0-9 _-]{2,40})["']?\s*(?:folder\b|$)/i),a=e.match(/\brename\b.{0,30}\bto\s+["']?([A-Za-z0-9 _.-]{2,60})["']?/i);if(r&&(s.folder_name=r[1].trim()),a&&(s.new_name=a[1].trim()),s.folder_name||s.new_name)return{tool:"drive_organise",args:s}}}return null}function Pr(e,t,n,s,r,a){const i=t.assistant_name||"Karna",o=2e3,l=4,c=t.personality_prompt?`
## Personality
`+(t.personality_prompt.length<=o*l?t.personality_prompt:t.personality_prompt.slice(0,o*l)+`
[...truncated to fit token budget]`)+`
`:"",d=n?`
## Active Memory (ALWAYS consult before responding)
${n}
`:"";let u="";try{const y=new Date;u=new Intl.DateTimeFormat("en-GB",{timeZone:t.timezone,day:"numeric",month:"short",year:"numeric"}).format(y)}catch{u=""}const p=`
## Current User
- **Name**: ${t.name}
- **Timezone**: ${t.timezone}
- **Time**: ${r}
- **Today's date for sheets**: ${u}
`;switch(e){case"conversation":return`You are ${i} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic.

${p}${c}${d}

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
- **HARD RULE — no false confirmations**: You have ZERO tool access. You CANNOT set reminders, create schedules, send emails, read sheets, or perform any action. NEVER output phrases like "Reminder set for...", "I've scheduled...", "Done ✅", "Task created", or any language implying an action was completed. If the user wants an action, say: "I can do that — just send your message and I'll take care of it." Do NOT simulate the outcome.`;default:return""}}const _o=Object.freeze(Object.defineProperty({__proto__:null,buildPurchaseGmailQuery:qn,buildSubAgentPrompt:Pr,classifyIntentFast:Wn,detectDeterministicOp:Gn,detectTierTwoOp:zn,extractPurchaseProduct:jr},Symbol.toStringTag,{value:"Module"})),bo=new Set(["create_skill","list_skills","store_memory","search_memory","delete_memory","update_memory","get_schedules","delete_schedule","create_schedule","toggle_schedule","gmail_unread_count"]),Eo=3,To=3,Br=5,Ur=.4,Hr=5;async function Fr(e,t,n,s,r,a,i=!0){try{const o=r.filter(g=>!bo.has(g));if(o.length<Eo)return;const c=[...[...new Set(o)]].sort().join(","),d=await e.prepare(`INSERT INTO skill_patterns (user_id, tool_signature, user_message_sample, tool_sequence, turn_count, succeeded)
       VALUES (?, ?, ?, ?, ?, ?)
       RETURNING id`).bind(n.id,c,s.slice(0,500),JSON.stringify(o),a,i?1:0).first(),u=await e.prepare("SELECT COUNT(*) as c FROM skill_patterns WHERE user_id = ? AND tool_signature = ?").bind(n.id,c).first(),p=(u==null?void 0:u.c)??0,y=await e.prepare(`SELECT auto_skill_id FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id IS NOT NULL LIMIT 1`).bind(n.id,c).first();if(y!=null&&y.auto_skill_id){d!=null&&d.id&&await e.prepare("UPDATE skill_patterns SET auto_skill_id = ? WHERE id = ?").bind(y.auto_skill_id,d.id).run(),await So(e,n,y.auto_skill_id,c),i&&await Do(e,t,n,y.auto_skill_id,o,s);return}p>=To&&await xo(e,t,n,c,o)}catch{}}async function So(e,t,n,s){const r=await e.prepare(`SELECT AVG(CAST(succeeded AS REAL)) as avg_success, COUNT(*) as total
     FROM (
       SELECT succeeded FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id = ?
       ORDER BY created_at DESC LIMIT 20
     )`).bind(t.id,s,n).first(),a=(r==null?void 0:r.avg_success)??1,i=(r==null?void 0:r.total)??0,o=a<Ur&&i>=Hr;if(await e.prepare(`UPDATE user_skills
     SET usage_count = usage_count + 1,
         last_used_at = CURRENT_TIMESTAMP,
         confidence_score = ?,
         enabled = CASE WHEN ? THEN 0 ELSE enabled END,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`).bind(a,o?1:0,n,t.id).run(),o){const l=await e.prepare("SELECT name FROM user_skills WHERE id = ?").bind(n).first();l&&await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source, is_read)
         VALUES (?, 'warning', ?, ?, 'skills', 0)`).bind(t.id,`Auto-skill disabled: ${l.name}`,`The skill "${l.name}" was auto-disabled because its success rate dropped below 40% after ${i} uses. You can re-enable or delete it in Settings → Skills.`).run()}}async function Wr(e,t){try{const s=(await e.prepare(`SELECT name, description, instructions, usage_count
       FROM user_skills
       WHERE user_id = ? AND is_auto = 1 AND enabled = 1
       ORDER BY usage_count DESC, created_at DESC
       LIMIT 5`).bind(t).all()).results??[];return s.length===0?"":`## Proven Procedures (Auto-Learned)
These workflows were automatically distilled from your past multi-step requests. When a new request closely matches one, follow its procedure without re-reasoning from scratch:

${s.map(a=>`**${a.name}** (used ${a.usage_count}×)
${a.instructions}`).join(`

---

`)}
`}catch{return""}}async function ko(e,t,n){var i;let s=0,r=0,a=0;try{const o=await e.prepare(`SELECT us.id, us.user_id, us.name, us.instructions, us.refinement_count,
              us.confidence_score, us.usage_count
       FROM user_skills us
       WHERE us.user_id = ? AND us.is_auto = 1 AND us.enabled = 1
         AND us.confidence_score < ? AND us.usage_count >= ?`).bind(n,Ur,Hr).all();for(const l of o.results??[]){s++;const c=await e.prepare(`SELECT user_message_sample, tool_sequence
         FROM skill_patterns
         WHERE auto_skill_id = ? AND succeeded = 1
         ORDER BY created_at DESC LIMIT 3`).bind(l.id).all();if((c.results??[]).length<2||l.refinement_count>=Br){await e.prepare("UPDATE user_skills SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(l.id).run(),await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source, is_read)
           VALUES (?, 'warning', ?, ?, 'skills', 0)`).bind(l.user_id,`Auto-skill retired: ${l.name}`,`"${l.name}" had a ${Math.round(l.confidence_score*100)}% success rate and couldn't be improved — disabled. Check Settings → Skills to manage it.`).run(),a++;continue}const d=c.results.map(y=>y.user_message_sample),u=JSON.parse(c.results[0].tool_sequence),p=[{role:"system",content:"You are a workflow optimizer. Rewrite a skill procedure so it is more reliable, based on examples that previously succeeded."},{role:"user",content:`Skill "${l.name}" has a ${Math.round(l.confidence_score*100)}% success rate.

Current instructions:
${l.instructions}

Recent successful examples:
${d.map((y,g)=>`${g+1}. "${y}"`).join(`
`)}
Tools used: ${u.join(" → ")}

Rewrite the instructions to be clearer and more reliable. Keep them under 200 words.
Respond with EXACTLY:
REWRITTEN_INSTRUCTIONS: <revised instructions>`}];try{const f=(((i=(await t.chat(p,{tools:[]})).content)==null?void 0:i.trim())??"").match(/^REWRITTEN_INSTRUCTIONS:\s*([\s\S]+)$/m);f&&f[1].trim()&&(await e.prepare(`UPDATE user_skills
             SET instructions = ?, refinement_count = refinement_count + 1, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`).bind(f[1].trim(),l.id).run(),r++)}catch{await e.prepare("UPDATE user_skills SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(l.id).run(),a++}}}catch{}return{reviewed:s,rewritten:r,disabled:a}}async function xo(e,t,n,s,r){var x;const i=((await e.prepare(`SELECT user_message_sample, tool_sequence
     FROM skill_patterns
     WHERE user_id = ? AND tool_signature = ?
     ORDER BY created_at DESC LIMIT 3`).bind(n.id,s).all()).results??[]).map(L=>L.user_message_sample),o=[{role:"system",content:"You are a workflow analyst. Given examples of user requests that all triggered the same multi-tool sequence, write a concise reusable skill procedure."},{role:"user",content:`These user requests all produced the same multi-tool workflow:

${i.map((L,I)=>`${I+1}. "${L}"`).join(`
`)}

Tools used (in order): ${r.join(" → ")}

Write a reusable skill. Respond with EXACTLY these three fields (no extra text):
NAME: <2-4 word skill name>
DESCRIPTION: <one sentence — what this skill does>
INSTRUCTIONS: <step-by-step instructions referencing exact tool names, under 200 words>`}],c=((x=(await t.chat(o,{tools:[]})).content)==null?void 0:x.trim())??"",d=c.match(/^NAME:\s*(.+)$/m),u=c.match(/^DESCRIPTION:\s*(.+)$/m),p=c.match(/^INSTRUCTIONS:\s*([\s\S]+)$/m);if(!d||!u||!p)return;const y=d[1].trim(),g=u[1].trim(),f=p[1].trim();if(!y||!g||!f)return;let w=`auto_${y.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").substring(0,40)}`;await e.prepare("SELECT id FROM user_skills WHERE user_id = ? AND slug = ?").bind(n.id,w).first()&&(w=`${w}_${Date.now().toString().slice(-4)}`);const T=await e.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, required_tools, is_auto, source)
     VALUES (?, ?, ?, ?, ?, ?, 1, 'auto')
     RETURNING id`).bind(n.id,y,w,g,f,JSON.stringify(r)).first();T!=null&&T.id&&await e.prepare("UPDATE skill_patterns SET auto_skill_id = ? WHERE user_id = ? AND tool_signature = ?").bind(T.id,n.id,s).run()}async function Do(e,t,n,s,r,a){var u;const i=await e.prepare("SELECT name, instructions, refinement_count FROM user_skills WHERE id = ? AND user_id = ?").bind(s,n.id).first();if(!i||i.refinement_count>=Br)return;const o=[{role:"system",content:"You are a workflow optimizer. Given an existing skill and a new usage example, decide if the instructions should be improved."},{role:"user",content:`Existing skill "${i.name}":
${i.instructions}

New example that used this same workflow:
User asked: "${a}"
Tools used: ${r.join(" → ")}

If the existing instructions are accurate and complete for this new example, respond with exactly:
NO_CHANGE

If you can improve clarity or add a genuinely useful detail, respond with:
UPDATED_INSTRUCTIONS: <revised instructions, under 200 words>

Keep changes minimal. Only update if the new example reveals a real gap.`}],c=((u=(await t.chat(o,{tools:[]})).content)==null?void 0:u.trim())??"";if(!c||c.startsWith("NO_CHANGE")||!c.includes("UPDATED_INSTRUCTIONS:"))return;const d=c.replace(/^UPDATED_INSTRUCTIONS:\s*/m,"").trim();!d||d===i.instructions||await e.prepare(`UPDATE user_skills
     SET instructions = ?, refinement_count = refinement_count + 1, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`).bind(d,s).run()}function Ro(e,t,n){const s={timestamp:new Date().toISOString(),level:e,message:t};n&&Object.keys(n).length>0&&Object.assign(s,n);try{return JSON.stringify(s)}catch{return JSON.stringify({timestamp:s.timestamp,level:e,message:t,context:"[unserializable context]"})}}function Kn(e,t,n){const s=Ro(e,t,n);switch(e){case"error":console.error(s);break;case"warn":console.warn(s);break;case"debug":console.debug(s);break;default:console.log(s)}}function vs(e,t){Kn("info",e,t)}function Yn(e,t){Kn("warn",e,t)}function Bt(e,t){Kn("error",e,t)}const No=2e3,Io=2e3,qr=4;function Tn(e){return Math.ceil(e.length/qr)}function Sn(e,t){const n=t*qr;return e.length<=n?e:e.slice(0,n)+`
[...truncated to fit token budget]`}const Gr=6e3,Cn="The user is following up on prior research in this thread. Answer from the injected research context first. If the follow-up requires new or updated information, call the research tool again with a query that includes the original topic.";function Jn(e){try{const t=JSON.parse(e||"{}");return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function zr(e,t){const n=[...new Set(e)],s={};return n.length>0&&(s.tools=n),t&&(s.research_query=t.query.substring(0,200),s.research_report=t.report.substring(0,Gr)),JSON.stringify(s)}function Vn(e){const t=[];for(const n of e)if(!(n.role!=="user"&&n.role!=="assistant")){if(n.role==="assistant"){const s=Jn(n.metadata);s.research_report&&t.push({role:"user",content:`[Tool Result for research]: ${s.research_report}`})}t.push({role:n.role,content:n.content})}return t}function Kr(e){return e.slice(-6).map(t=>{var n;return t.role==="assistant"&&(n=Jn(t.metadata).tools)!=null&&n.includes("research")?`[TOOLS_USED: research] ${t.content}`:t.content}).join(`
`)}function Zn(e){var t;for(let n=e.length-1;n>=0;n--){const s=e[n];if(s.role==="assistant")return((t=Jn(s.metadata).tools)==null?void 0:t.includes("research"))??!1}return!1}function Yr(e,t,n,s){return e!=="research"||/^(Research failed|Research error|Research timed out|\[Tool Error)/i.test(n)?s:{query:String(t.query||""),report:n.substring(0,Gr)}}function Jr(e,t){if(!t)return;const n=e[e.length-1];(n==null?void 0:n.role)!=="user"||typeof n.content!="string"||n.content.startsWith(Cn)||(e[e.length-1]={role:"user",content:`${Cn}

${n.content}`})}function Xn(e){const t=new Set(["(Previous response was not recorded.)","(Previous request did not complete. Please try again.)","(My previous response was cut off before completing. Starting fresh.)"]),n=[];for(const r of e){const a=typeof r.content=="string"?r.content:"";if(r.role==="assistant"&&t.has(a.trim())&&n.length>0&&n[n.length-1].role==="user"){n.pop();continue}n.push(r)}const s=[];for(const r of n){let a=r.content;r.role==="assistant"&&typeof a=="string"&&(a=a.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim(),a||(a="(Previous response was not recorded.)"));const i=a!==r.content?{...r,content:a}:r;s.length>0&&s[s.length-1].role===i.role&&i.role!=="system"?s[s.length-1]={...s[s.length-1],content:s[s.length-1].content+`

`+i.content}:s.push(i)}return s}const ws=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes (recurring). daily = RECURRING every single day at HH:MM — only use if user explicitly says "every day", "daily", or "each morning" etc. weekly = recurring every week on a specific day at time. once = fires ONE TIME at a specific date+time — USE THIS as the DEFAULT for any reminder that is not explicitly recurring (e.g. "remind me at 8pm", "remind me tomorrow at 9am", "remind me Sunday at 8:45am" are all once, not daily). IMPORTANT: NEVER use interval/daily/weekly for tasks that send emails to external recipients — use once instead. Recurring email-sending tasks spam the recipient on every cron tick.'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration requests: "in 5 minutes", "in 2 hours", "in half an hour". Do NOT use for any request that mentions a specific time or date ("at 13:00", "tomorrow at noon", "next Friday") — use schedule_value instead. Examples: "in 5 minutes" = 5, "in 2 hours" = 120.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"update_schedule",description:'Update an existing scheduled task — change its name, description, or reschedule it to a new time. Use this when the user wants to change the time of a reminder or rename it. You MUST call this tool — never say "updated" without calling it.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to update (get it from list_schedules first if unknown)"},name:{type:"string",description:"New name for the task (optional)"},description:{type:"string",description:"New description (optional)"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:"New schedule type (required if changing the time)"},schedule_value:{type:"string",description:"New schedule value matching the schedule_type format (required if changing the time)"},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration changes ("in 30 minutes", "in 2 hours"). Do NOT use if the user specifies a clock time or date — use schedule_value instead.'}},required:["job_id"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:`Store a PERMANENT rule, preference, or standing instruction that Karna should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts — those go to create_schedule. NEVER USE FOR: full text of essays, articles, reports, drafts, or any document body — those belong in document_library (if uploaded) or create_doc (Google Drive). A URL/title pointer is OK (type='context'), but never the body. Ask yourself: "Will this still be relevant in 6 months and is it a preference/rule, not a document?" If no, do not store it.`,parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"delete_memory",description:'Delete a stored memory entry by its ID. Use when the user says "forget that", "remove that rule", or "that preference is wrong". Always call search_memory first to confirm the correct ID. Confirm with the user if there is any ambiguity about which entry to remove.',parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to delete"}},required:["id"]}},{name:"update_memory",description:"Update the content of an existing memory entry by its ID. Use when the user wants to correct or change a stored rule or preference. Always call search_memory first to find the correct ID.",parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to update"},content:{type:"string",description:"The new content to replace the existing entry"}},required:["id","content"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"delete_sheet_row",description:"Delete a specific row from a Google Sheet tab by row number. The row number is as displayed in the sheet (1-based: row 1 = header, row 2 = first data row). Rows below shift up. ALWAYS call read_sheet first to confirm the exact row number before deleting. Cannot delete row 1 (header).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},sheet_name:{type:"string",description:'Tab name exactly as shown in the sheet (e.g. "Sheet1", "Budget", "January")'},row_number:{type:"number",description:"Row number to delete (1-based, as shown in the sheet). Minimum 2."}},required:["spreadsheet_id","sheet_name","row_number"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"rewrite_doc",description:"Replace the entire content of an existing Google Document with new formatted content. Use this to reformat or clean up a document — clears the current content and rewrites it with proper headings, bold, bullet points etc. Workflow: read_doc to get current content → rewrite_doc with reformatted version.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to rewrite (from URL: docs.google.com/document/d/{ID}/edit)"},content:{type:"string",description:"New formatted content (supports markdown: # ## ### headings, **bold**, *italic*, - bullets)"}},required:["document_id","content"]}},{name:"delete_doc_content",description:"Remove specific text from a Google Document by exact string match. Removes ALL occurrences of the text. Use this to delete a duplicate entry — call read_doc first to find the exact text. If text appears twice (duplicate), both copies are removed; use append_to_doc immediately after to add the single correct version back.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"},text_to_remove:{type:"string",description:"Exact text to remove, including any surrounding whitespace or line breaks needed to cleanly remove the entry."}},required:["document_id","text_to_remove"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_search/gmail_list. The Date line is the email received date. For purchase lookups, prefer order-confirmation emails (they list items) over delivery/shipping notices (often item-less). If gmail_search subject/snippet already answers the user, report Date from search results without reading every message.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail syntax: from:, to:, subject:, newer_than:, etc. For product/purchase lookups, include product keywords in the query and set product_hint. Results include subject, snippet, and Date — often enough without gmail_read. Prefer order confirmations over delivery emails.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"},product_hint:{type:"string",description:"Product name for purchase lookups — ranks order confirmations above delivery notices"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. Use this when the user explicitly says "send" (not just "draft" or "compose"). STRICT RULES: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm the address. (2) The body must be based on content from this conversation (research results, user-provided text, or a draft composed earlier in this turn) — do NOT invent facts. Using an email body you just composed or drafted in the same conversation is fine. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:'Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Use this when the user says "draft", "compose", or "prepare" an email, OR when no explicit recipient address has been provided. If the user explicitly says "send" and provides an email address, use gmail_send instead. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_read_file",description:"Read the content of a specific Google Drive file by URL or file ID. Supports Google Docs (exported as text), Sheets (exported as CSV), PDFs (extracted via AI), and other text files. Use this when the user shares a Google Drive or Google Docs link and wants you to read, summarize, or analyze the file contents.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive or Google Docs URL (e.g. https://drive.google.com/file/d/... or https://docs.google.com/document/d/...) or bare file ID"},extract_focus:{type:"string",description:'Optional: specific content to focus extraction on (e.g. "financial figures", "action items", "table of contents")'}},required:["url_or_id"]}},{name:"drive_delete_file",description:"Move a Google Drive file or document to trash. The file can be restored from Drive trash within 30 days. Use when the user asks to delete, remove, or trash a file.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to trash"}},required:["url_or_id"]}},{name:"drive_organise",description:"Move a Google Drive file to a folder and/or rename it. Creates the folder if it does not exist. Use when the user wants to organise, move, or rename a file in Drive.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to move/rename"},folder_name:{type:"string",description:"Name of the destination folder. Creates it if it does not exist."},new_name:{type:"string",description:"Optional: new name for the file"}},required:["url_or_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets (~1s). Use ONLY when: (1) the user wants a list of links to browse, not a synthesized answer, (2) real-time scores or breaking headlines, or (3) fallback if research tool fails. If the user wants an actual answer (not links), use research instead.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:"Deep web research using Opus 4.8 and Tavily. Produces a cited report. Use depth:'quick' for factual lookups (~45-90s). Use depth:'thorough' for complex, analytical, comparative, or multi-part questions (~2-5 min, ~3 Opus API calls) — plans sub-queries, reads 15+ sources, identifies gaps, synthesizes a comprehensive structured report.",parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = Opus + Tavily (~45-90s). thorough = multi-phase deep research (~2-5 min, ~3 Opus API calls). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"save_note",description:"Save a note for future reference. Use when the user asks to save, remember, or note something specific. Also use after research when user wants to keep the report.",parameters:{type:"object",properties:{title:{type:"string",description:"Short title/headline for the note"},content:{type:"string",description:"The note content"},tags:{type:"string",description:'Comma-separated tags e.g. "work,ideas"'},source:{type:"string",enum:["manual","research","chat"],description:"Source of the note. Default: manual"},source_query:{type:"string",description:"Original query if source=research"}},required:["content"]}},{name:"search_notes",description:"Search the user's saved notes by keyword, topic, or tag.",parameters:{type:"object",properties:{query:{type:"string",description:"Search term"}},required:["query"]}},{name:"list_notes",description:"List recent notes, optionally filtered by tag.",parameters:{type:"object",properties:{limit:{type:"number",description:"Max notes to return (default 10)"},tag:{type:"string",description:"Filter by tag"},pinned_only:{type:"boolean",description:"Only show pinned notes"}}}},{name:"delete_note",description:"Delete a specific note by ID.",parameters:{type:"object",properties:{id:{type:"number",description:"Note ID to delete"}},required:["id"]}},{name:"browser_task",description:'Run a complete browser automation workflow using a real cloud browser. The cloud agent handles ALL steps — navigation, clicks, form fills, extraction — in a single call. CRITICAL: Always pass the ENTIRE multi-step workflow as one task description. Never split a browser workflow across multiple browser_task calls. Wrong: call 1 "go to site", call 2 "click X", call 3 "extract Y". Correct: one call with "go to site, click X, extract Y". Use for: JS-heavy sites, form submission, clicking through pages, any site requiring a real browser.',parameters:{type:"object",properties:{task:{type:"string",description:'Full Plain-English description of the COMPLETE workflow (e.g. "Go to news.ycombinator.com and return the top 5 story titles and URLs", "Go to books.toscrape.com, click the Mystery category, list the first 5 books with their star rating and price")'},site_name:{type:"string",description:'Name of a saved Secret Vault entry (e.g. "LinkedIn", "Outlook") to inject login credentials. REQUIRED for any site that needs a login. You MUST call vault_lookup first to find the exact entry name, then pass it here. If omitted for a login-required site, no credentials will be injected and the task will fail to authenticate.'}},required:["task"]}},{name:"browser_task_status",description:"Check the status of a previously started browser task that was still running when it timed out. Use when the user asks what happened with a browser task. Get the task_id from memory.",parameters:{type:"object",properties:{task_id:{type:"string",description:"The task ID returned by the earlier browser_task call (stored in memory)"}},required:["task_id"]}},{name:"vault_lookup",description:"Check the Secret Vault for saved login credentials by site name. Returns matching entry names (not actual credentials). Use this BEFORE calling browser_task whenever the user asks to access a site that requires a password or login.",parameters:{type:"object",properties:{site_name:{type:"string",description:'Site or service name to look up (e.g. "LinkedIn", "Gmail backup", "MyBank"). Case-insensitive, partial matches included.'}},required:["site_name"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"parse_document",description:"Read and extract text content from an uploaded file (PDF, Word/DOCX, images, or text). Call this whenever the user uploads a document and wants you to read it, extract information, or work with its contents.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id returned when the file was uploaded"},extract_focus:{type:"string",description:'Optional: specific information to focus on extracting (e.g., "quantities and equipment names", "dates and amounts", "all text content")'}},required:["file_id"]}},{name:"search_library",description:`Search the user's Document Library (uploaded files and migrated documents) by name, summary, or extracted text. Use this when the user asks "find my essay about X", "what did I upload about Y", "do I have a document on Z", or any question that might be answered by an uploaded file. Returns a list of matching documents with previews and IDs. Follow with read_library_file to get full text.`,parameters:{type:"object",properties:{query:{type:"string",description:"Search terms to look for in document name, summary, or extracted text"},limit:{type:"number",description:"Maximum number of results to return (1-20, default: 10)"}},required:["query"]}},{name:"read_library_file",description:"Read the full extracted text of a document from the Document Library. Use after search_library to get full content. Pass either the numeric document id (from search_library results) or a partial name. Returns up to 20,000 characters of extracted text.",parameters:{type:"object",properties:{id_or_name:{type:"string",description:"Numeric document ID from search_library results, or a partial document name to search by"}},required:["id_or_name"]}},{name:"create_skill",description:"Create a new reusable skill — a named workflow that can be invoked by name in future conversations. Use this when the user asks you to create a skill, save a workflow, or build a reusable automation. IMPORTANT: Before calling this, ask the user clarifying questions to understand: what the skill should do, what inputs it needs, what tools it uses, and what the expected output is.",parameters:{type:"object",properties:{name:{type:"string",description:'Human-readable skill name (e.g., "Equipment List Parser", "Daily Expense Logger")'},description:{type:"string",description:"One-sentence description of what the skill does"},instructions:{type:"string",description:"Detailed step-by-step instructions for executing the skill. Be specific about which tools to use, in what order, and what to do with the results."},required_tools:{type:"array",items:{type:"string"},description:'List of tool names this skill needs (e.g. ["parse_document", "append_sheet", "create_sheet"])'},parameters:{type:"object",description:"JSON schema describing the inputs this skill accepts. Use standard JSON schema format."},examples:{type:"array",description:"Optional example inputs and expected outputs to guide execution",items:{type:"object",properties:{input:{type:"object"},output:{type:"string"}}}}},required:["name","description","instructions"]}},{name:"list_skills",description:"List all custom skills the user has created. Shows name, description, and usage count for each.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled skills. Default: false"}}}}];async function Qn(e,t){try{const s=((await e.prepare("SELECT slug, name, description, parameters FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at ASC").bind(t).all()).results||[]).map(r=>{let a={};try{a=JSON.parse(r.parameters)||{}}catch{}return a.properties||(a={type:"object",properties:{inputs:{type:"string",description:"Any additional context or specific instructions for this skill execution"}}}),{name:r.slug,description:`[Custom Skill] ${r.description}`,parameters:a}});return[...ws,...s]}catch{return ws}}async function es(e,t){try{const s=(await e.prepare("SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t).all()).results||[];return s.length===0?"":s.map(r=>`- ${r.content}`).join(`
`)}catch{return""}}function Vr(e,t,n,s,r,a){const i=e.assistant_name||"Karna",o=e.personality_prompt?Sn(`## Personality Instructions
${e.personality_prompt}
`,No):"",l=s!=null&&s.trim()?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. They are fixed — do not store copies of these in your memory or contradict them.
${s}
`:"",c=Sn(t,Io),d=a!=null&&a.trim()?Sn(`## Pinned Notes Reference
${a}
`,1e3):"";let u="";try{const y=new Date;u=new Intl.DateTimeFormat("en-GB",{timeZone:e.timezone,day:"numeric",month:"short",year:"numeric"}).format(y)}catch{u=""}return`You are ${i}.

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
Fragments are fine. No preamble. No hollow affirmations to open. "Done. [link]" beats a paragraph confirming you understood the task. When something is genuinely complex, you earn the length — but default to the shortest thing that's actually complete. Call tools silently: no "Let me check..." or "I'll search for that now" before invoking. Results come after the work, not before.

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

${l}

---

## Your Memory

Read everything here before responding. This is your stored knowledge of this person — preferences, standing rules, data sources, patterns, systems. These override defaults without re-confirmation.

- Memory references a spreadsheet ID → use it directly with read_sheet/write_sheet. Don't ask for it again.
- Memory records a preference → follow it.
- Memory records a resolved pattern (e.g. "item + amount = expense to Monthly Budget sheet") → act on it directly, no question.

${c}

${d}

${r?r+`
`:""}

---

## Tools Are Building Blocks

Every tool is composable with every other. When a request has multiple steps, chain them — don't stop mid-chain to check in. Execute completely, then present the result.

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
${Zr(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${n==="telegram"?'\n\n## TELEGRAM CONSTRAINTS\n- **Essays / save to Drive**: When the user wants an essay, article, or report saved to Google Drive (or says "store/save to drive"), you MUST call `create_doc` with the **full** text in the `content` parameter — never truncate for Telegram. Do NOT paste the essay body in chat (reply with title + Doc link only). Write from your knowledge unless they asked for research — do NOT call web_search before a plain essay. One `create_doc` call with title + full content (+ optional `folder_name`).\n- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).\n- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use `schedule_value` with the exact datetime in the user\'s local timezone — NEVER use `minutes_from_now` for clock-time requests (it causes wrong times). Only use `minutes_from_now` for pure duration requests like "in 30 minutes" or "in 2 hours".\n- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I\'ll now..." — just call the tool.\n- **Long content intent check**: When asked to write long-form content (essay, article, report) WITHOUT any save destination (no mention of Drive, Google Doc, or "save/store"), ask first: "Should I save the full piece as a Google Doc and send you the link, or give you a brief summary here in chat?" Default to Google Doc for anything over ~300 words. If they already said Drive/Doc/save/store, skip this question and call `create_doc` with the complete text immediately. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**':""}`}async function kn(e,t,n){var c;const r=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${n.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let a;((c=r.files)==null?void 0:c.length)>0?a=r.files[0].id:a=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:n,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${a}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:a,folderName:n}}function Ut(e){return e.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").replace(/<function_calls>[\s\S]*?<\/function_calls>/gi,"").replace(/<function_result>[\s\S]*?<\/function_result>/gi,"").replace(/^\[calling:[^\]]*\]\s*/i,"").trim()}function Zr(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}const Oo={read_sheet:"read",search_memory:"read",list_schedules:"read",write_sheet:"write",append_sheet:"write",update_schedule:"write",delete_schedule:"write",gmail_send:"external_effect",create_calendar_event:"external_effect"};function Co(e,t){const n=Oo[e]||"read";if(n==="read")return null;const s=Xr(t);return n==="write"&&s!=="execute"?`POLICY BLOCKED (${n}): ${e} requires transaction_mode=execute.`:n==="external_effect"&&s!=="execute"?`POLICY BLOCKED (${n}): ${e} can cause external side effects and needs transaction_mode=execute.`:null}const Ao=["ETIMEDOUT","TIMEOUT","429","503","ECONNRESET","network"],Lo=new Set(["write_sheet","append_sheet","gmail_send","create_calendar_event","update_schedule","delete_schedule","delete_memory"]),Mo={create_schedule:{required:["name","schedule_type","action_type"],enum:{schedule_type:["interval","daily","weekly","once"]}},update_schedule:{required:["job_id"]},delete_schedule:{required:["job_id"]},write_sheet:{required:["spreadsheet_id","range","values"]},append_sheet:{required:["spreadsheet_id","range","values"]},gmail_send:{required:["to","subject","body"]}};function $o(e){const t=String((e==null?void 0:e.message)||e||"Unknown tool error");return/timeout|timed out/i.test(t)?"TOOL_TIMEOUT":/unauthorized|forbidden|401|403/i.test(t)?"TOOL_AUTH":/not found|404/i.test(t)?"TOOL_NOT_FOUND":/rate limit|429/i.test(t)?"TOOL_RATE_LIMIT":/validation|invalid|required/i.test(t)?"TOOL_VALIDATION":"TOOL_EXECUTION_FAILED"}function jo(e){const t=String((e==null?void 0:e.message)||e||"").toLowerCase();return Ao.some(n=>t.includes(n.toLowerCase()))}function Po(e){const t=e.query??e.q??e.search_query??e.search;return typeof t=="string"?t.trim():""}function Bo(e,t){const n=Mo[e];if(n){for(const s of n.required||[])if(t[s]===void 0||t[s]===null||t[s]==="")throw new Error(`Validation failed: ${s} is required for ${e}`);for(const[s,r]of Object.entries(n.enum||{}))if(t[s]!==void 0&&!r.includes(String(t[s])))throw new Error(`Validation failed: ${s} must be one of ${r.join(", ")}`)}}function Xr(e){const t=e.transaction_mode;return t==="dry_run"||t==="confirm_required"||t==="execute"?t:"execute"}function Uo(e,t){if(!Lo.has(e))return null;const n=Xr(t);return n==="dry_run"?`DRY RUN: ${e} validated. No write action was executed.`:n==="confirm_required"?`CONFIRMATION REQUIRED: ${e} is a write action. Re-run with transaction_mode=execute to proceed.`:null}const Ho=new Set(["gmail_send","gmail_draft","gmail_modify","append_sheet","create_sheet","write_sheet","create_doc","append_to_doc","rewrite_doc","create_calendar_event","create_schedule","create_skill"]),Fo=new Set(["list_schedules","search_memory","get_system_status","read_sheet","list_calendar_events","read_doc","gmail_list","gmail_read","gmail_search","gmail_unread_count","drive_list","drive_search","drive_read_file","web_search","read_url","research","browser_task_status","vault_lookup","search_places","get_place_details","get_directions","get_travel_time","translate_text","search_youtube","geocode_address","parse_document","search_library","read_library_file","list_skills"]),Wo=5;async function Ht(e,t,n,s,r,a,i,o,l,c,d,u,p,y,g){const f=Date.now();let w=!0,_="",T="";const x=r.traceId||crypto.randomUUID(),L=`${s}:${e}:${JSON.stringify(t)}`;if(Ho.has(e)&&!Fo.has(e))try{const M=await n.prepare(`SELECT tool_result FROM tool_execution_log
           WHERE user_id = ? AND tool_name = ? AND idempotency_key = ? AND success = 1
             AND created_at >= datetime('now', '-${Wo} minutes')
           ORDER BY created_at DESC
           LIMIT 1`).bind(s,e,L).first();if(M)return M.tool_result||""}catch{}try{Bo(e,t);const M=Co(e,t);if(M)return T=M,T;const j=Uo(e,t);if(j)return T=j,T;const z=2;for(let W=1;W<=z;W++)try{const ne=e==="browser_task"?31e4:e==="browser_task_status"?35e3:e==="research"?31e4:9e4;T=await Promise.race([Go(e,t,n,s,a,i,o,l,c,d,u,p,y,r.channel,g),new Promise((P,Y)=>setTimeout(()=>Y(new Error("Tool timed out")),ne))]);break}catch(ne){if(W<z&&jo(ne)){await new Promise(P=>setTimeout(P,250*W));continue}throw ne}return T}catch(M){throw w=!1,_=`${$o(M)}: ${M.message||"Unknown error"}`,new Error(_)}finally{const M=Date.now()-f;try{await n.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel, idempotency_key)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(s,r.agentType||null,r.providerName||null,e,JSON.stringify({...t,_idempotency_key:L,_trace_id:x}).substring(0,2e3),(w?T:"").substring(0,500),w?1:0,_||null,M,r.isEnforcementRetry?1:0,r.channel||"web",L).run()}catch{}}}function Qr(e){const t=e.length;for(let n=0;n<t-1;n++){const s=e[n];if(s.role!=="user"||typeof s.content!="string")continue;const r=t-1-n,a=r<=2?12e3:r<=4?5e3:2e3;s.content.length>a&&(e[n]={...s,content:s.content.substring(0,a)+`
[...truncated in history to reduce context size]`})}}function qo(e){const t=[];let n=[],s="",r=!1,a=0;const i=e.length;for(;a<i;){const o=e[a];if(r){if(o==='"'){if(e[a+1]==='"'){s+='"',a+=2;continue}r=!1,a++;continue}s+=o,a++;continue}if(o==='"'){r=!0,a++;continue}if(o===","){n.push(s),s="",a++;continue}if(o==="\r"&&e[a+1]===`
`){n.push(s),t.push(n),n=[],s="",a+=2;continue}if(o===`
`||o==="\r"){n.push(s),t.push(n),n=[],s="",a++;continue}s+=o,a++}for((s||n.length)&&(n.push(s),t.push(n));t.length&&t[t.length-1].every(o=>o==="");)t.pop();return t}async function Go(e,t,n,s,r,a,i,o,l,c,d,u,p,y,g){var w,_,T,x,L,I,M,j,z,W,ne,P,Y,q,Z,te,oe,re,he;const f=new Q(n);switch(e){case"create_schedule":{const m=new Date;let E;const h=c||"UTC";if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){E=new Date(m.getTime()+t.minutes_from_now*60*1e3);const A=E.toLocaleString("en-US",{timeZone:h,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[N,C,O]=(A[0]||"").split("/");t.schedule_value=`${O}-${N}-${C} ${A[1]||"00:00"}`,t.schedule_type="once"}else if(t.schedule_type==="interval"){const R=parseInt(t.schedule_value,10);E=new Date(m.getTime()+R*60*1e3)}else if(t.schedule_type==="daily"&&t.action_type==="reminder"){const R=`${t.name||""} ${t.action_description||""}`.toLowerCase();if(/\bevery\b|\bdaily\b|\beach\b|\bmorning\b|\bevening\b|\bnight\b|\bweekday\b|\bweekend\b|\brecurring\b|\brepeat\b/.test(R)){const[N,C]=t.schedule_value.split(":").map(Number),O=m.toLocaleString("en-US",{timeZone:h}),$=new Date(O),B=new Date($);B.setHours(N,C,0,0),B<=$&&B.setDate(B.getDate()+1);const J=new Date(B.toLocaleString("en-US",{timeZone:"UTC"})),X=new Date(B.toLocaleString("en-US",{timeZone:h})),K=J.getTime()-X.getTime();E=new Date(B.getTime()+K)}else{const[N,C]=t.schedule_value.split(":").map(Number),O=m.toLocaleString("en-US",{timeZone:h}),$=new Date(O),B=new Date($);B.setHours(N,C,0,0),B<=$&&B.setDate(B.getDate()+1);const J=De=>String(De).padStart(2,"0"),X=B.getFullYear(),K=J(B.getMonth()+1),ie=J(B.getDate());t.schedule_value=`${X}-${K}-${ie} ${J(N)}:${J(C)}`,t.schedule_type="once";const de=new Date(B.toLocaleString("en-US",{timeZone:"UTC"})),le=new Date(B.toLocaleString("en-US",{timeZone:h})),ge=de.getTime()-le.getTime();E=new Date(B.getTime()+ge)}}else if(t.schedule_type==="daily"){const[R,A]=t.schedule_value.split(":").map(Number),N=m.toLocaleString("en-US",{timeZone:h}),C=new Date(N),O=new Date(C);O.setHours(R,A,0,0),O<=C&&O.setDate(O.getDate()+1);const $=new Date(O.toLocaleString("en-US",{timeZone:"UTC"})),B=new Date(O.toLocaleString("en-US",{timeZone:h})),J=$.getTime()-B.getTime();E=new Date(O.getTime()+J)}else if(t.schedule_type==="weekly"){const[R,A]=t.schedule_value.split(" "),[N,C]=(A||"00:00").split(":").map(Number),$=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(ge=>ge.toLowerCase()===R.toLowerCase()),B=m.toLocaleString("en-US",{timeZone:h}),J=new Date(B),X=new Date(J);X.setHours(N,C,0,0);let K=($-X.getDay()+7)%7;K===0&&X<=J&&(K=7),X.setDate(X.getDate()+K);const ie=new Date(X.toLocaleString("en-US",{timeZone:"UTC"})),de=new Date(X.toLocaleString("en-US",{timeZone:h})),le=ie.getTime()-de.getTime();E=new Date(X.getTime()+le)}else if(t.schedule_type==="once"){const[R,A]=t.schedule_value.split(" "),[N,C,O]=R.split("-").map(Number),[$,B]=(A||"00:00").split(":").map(Number),J=m.toLocaleString("en-US",{timeZone:h}),X=new Date(J),K=new Date(X);K.setFullYear(N,C-1,O),K.setHours($,B,0,0);const ie=new Date(K.toLocaleString("en-US",{timeZone:"UTC"})),de=new Date(K.toLocaleString("en-US",{timeZone:h})),le=ie.getTime()-de.getTime();E=new Date(K.getTime()+le);const ge=new Date(m.getTime()+120*1e3);if(E.getTime()<m.getTime()+5*1e3){const De=E.toISOString();E=ge;const Te=` [Note: The requested time ${t.schedule_value} in ${h} resolved to ${De} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${E.toISOString()}.]`;t._pastTimeWarning=Te}}else E=new Date(m.getTime()+3600*1e3);if((t.schedule_type==="interval"||t.schedule_type==="daily"||t.schedule_type==="weekly")&&t.action_type==="custom"){const R=`${t.name||""} ${t.action_description||t.description||""}`.toLowerCase();/\b(send|forward)\b.{0,40}\b(email|mail)\b|\bemail.{0,20}\bto\b|\bgmail_send\b/.test(R)&&(t.schedule_type="once")}if(t.action_type==="custom"&&t.schedule_type==="once"){const R=`${t.name||""} ${t.action_description||t.description||""}`.toLowerCase();/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i.test(R)||(t.action_type="reminder")}if(await n.prepare("SELECT id FROM cron_jobs WHERE user_id = ? AND name = ? AND schedule_type = ? AND schedule_value = ? AND state != 'completed' LIMIT 1").bind(s,t.name,t.schedule_type,t.schedule_value).first()){const R=E.toLocaleString("en-US",{timeZone:h,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule already exists: "${t.name}" is already set for ${R} (${h}). No duplicate created.`}await n.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(s,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),E.toISOString()).run();const S=t._pastTimeWarning||"",k=E.toLocaleString("en-US",{timeZone:h,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${t.name}" — ${t.schedule_type}. Will fire at ${k} (${h}). [UTC: ${E.toISOString()}]${S}. IMPORTANT: Use the exact time "${k}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const E=(await n.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(s).all()).results||[];return E.length===0?"No scheduled tasks found.":E.map(h=>`[ID:${h.id}] ${h.enabled?"▶":"⏸"} "${h.name}" — [${h.schedule_type}] ${h.schedule_value} — ${h.action_type} — state: ${h.state||"active"} — next: ${h.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const m=t.enabled?1:0,E=m?"active":"paused";return await n.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(m,E,t.job_id,s).run(),`Schedule ${t.job_id} ${m?"enabled (active)":"paused"}.`}case"update_schedule_state":{const m=["created","active","reminding","paused","completed"],E=t.state;if(!m.includes(E))return`Invalid state "${E}". Valid states: ${m.join(", ")}`;const h=E==="completed"||E==="paused"?0:1;return await n.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(E,h,t.job_id,s).run(),`Schedule ${t.job_id} state updated to "${E}".`}case"update_schedule":{const m=t.job_id,E=c||"UTC",h=new Date,v=["updated_at = CURRENT_TIMESTAMP"],b=[];t.name&&(v.push("name = ?"),b.push(t.name)),t.description&&(v.push("description = ?"),b.push(t.description));let S=null,k=t.schedule_type,R=t.schedule_value;if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){S=new Date(h.getTime()+t.minutes_from_now*60*1e3);const C=S.toLocaleString("en-US",{timeZone:E,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[O,$,B]=(C[0]||"").split("/");R=`${B}-${O}-${$} ${C[1]||"00:00"}`,k="once"}else if(k&&R){if(k==="interval")S=new Date(h.getTime()+parseInt(R,10)*60*1e3);else if(k==="daily"){const[N,C]=R.split(":").map(Number),O=new Date(h.toLocaleString("en-US",{timeZone:E})),$=new Date(O);$.setHours(N,C,0,0),$<=O&&$.setDate($.getDate()+1);const B=new Date($.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date($.toLocaleString("en-US",{timeZone:E})).getTime();S=new Date($.getTime()+B)}else if(k==="weekly"){const[N,C]=R.split(" "),[O,$]=(C||"00:00").split(":").map(Number),J=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(le=>le.toLowerCase()===N.toLowerCase()),X=new Date(h.toLocaleString("en-US",{timeZone:E})),K=new Date(X);K.setHours(O,$,0,0);let ie=(J-K.getDay()+7)%7;ie===0&&K<=X&&(ie=7),K.setDate(K.getDate()+ie);const de=new Date(K.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(K.toLocaleString("en-US",{timeZone:E})).getTime();S=new Date(K.getTime()+de)}else if(k==="once"){const[N,C]=R.split(" "),[O,$,B]=N.split("-").map(Number),[J,X]=(C||"00:00").split(":").map(Number),K=new Date(h.toLocaleString("en-US",{timeZone:E})),ie=new Date(K);ie.setFullYear(O,$-1,B),ie.setHours(J,X,0,0);const de=new Date(ie.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(ie.toLocaleString("en-US",{timeZone:E})).getTime();S=new Date(ie.getTime()+de),S.getTime()<h.getTime()+60*1e3&&(S=new Date(h.getTime()+120*1e3))}}if(k&&(v.push("schedule_type = ?"),b.push(k)),R&&(v.push("schedule_value = ?"),b.push(R)),S&&(v.push("next_run = ?"),b.push(S.toISOString())),v.length===1)return"No changes provided. Specify name, description, or schedule fields to update.";b.push(m,s),await n.prepare(`UPDATE cron_jobs SET ${v.join(", ")} WHERE id = ? AND user_id = ?`).bind(...b).run();const A=S?S.toLocaleString("en-US",{timeZone:E,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):null;return`Schedule ${m} updated.${A?` New fire time: ${A} (${E}).`:""} IMPORTANT: Use this exact time "${A}" when confirming to the user.`}case"delete_schedule":return await n.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,s).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const m=t.importance||5,E=t.type==="task"?"preference":t.type,h=m>=7?"working":"long_term";return await f.store(s,E,t.title,t.content,m,h),`Stored in ${h==="working"?"working":"long-term"} memory: [${E}] ${t.title} (importance: ${m})`}case"search_memory":{const m=await f.search(s,t.query);return m.length===0?"No matching memories found.":m.map(E=>`[id:${E.id}] [${E.tier||"long_term"}] [${E.type}] **${E.title}**: ${E.content}`).join(`
`)}case"delete_memory":return await f.remove(t.id,s),`Memory entry ${t.id} deleted.`;case"update_memory":return await f.update(t.id,s,t.content),`Memory entry ${t.id} updated.`;case"get_system_status":{const m=await n.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s).first(),E=await n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s).first(),h=await n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(s).first(),v=await n.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(s).first(),b=await n.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(s).first();return`System Status:
- Active schedules: ${(m==null?void 0:m.cnt)||0}
- Memory: ${(h==null?void 0:h.cnt)||0} working / ${(E==null?void 0:E.cnt)||0} total
- Total messages: ${(v==null?void 0:v.cnt)||0}
- Unread errors: ${(b==null?void 0:b.cnt)||0}`}case"read_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||""),E=t.spreadsheet_id;let h=t.range;const v=await m.sheets.getMetadata(E),b=v.sheets;h.includes("!")||(h=`${b[0]}!${h}`);let S;try{S=await m.sheets.readRange(E,h)}catch(R){if((w=R.message)!=null&&w.includes("Unable to parse range")||(_=R.message)!=null&&_.includes("400")){const A=h.includes("!")?h.split("!")[1]:h;h=`${b[0]}!${A}`,S=await m.sheets.readRange(E,h)}else throw R}let k=`[Spreadsheet: "${v.title}" | Reading tab: "${h.split("!")[0]}" | All tabs in this spreadsheet: ${b.map(R=>`"${R}"`).join(", ")}]
`;return b.length>1&&(k+=`[To read a different tab, call read_sheet again with range like "${b[1]}!A1:Z500"]
`),S.length===0?k+"No data found in the specified range.":k+S.map(R=>R.join("	| ")).join(`
`)}catch(m){return await H(n,s,"google","read_sheet",m.message),`Failed to read sheet: ${m.message}`}}case"write_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{const C=new Q(n),O=JSON.stringify(t.values);await C.store(s,"context",`Pending sheet write: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"write_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:O.length>15e3?"[[truncated — re-provide values on retry]]":t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The sheet write has been saved to temporary memory. After reconnecting, tell me "write the pending sheet data" to complete this.`:"")}const h=t.values;let v=t.range;const k=Math.max(...h.map(C=>C.length))+4,R=h.map(C=>{const O=[...C];for(;O.length<k;)O.push("");return O}),A=v.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(A){const C=A[1]||"",O=A[2],$=A[3],B=A[5],X=O.toUpperCase().charCodeAt(0)-64+k-1,K=X<=26?String.fromCharCode(64+X):"Z";v=`${C}${O}${$}:${K}${B}`}const N=await m.sheets.writeRange(t.spreadsheet_id,v,R);try{const C=new Q(n),O=await C.search(s,`Pending sheet write: ${t.spreadsheet_id}`);for(const $ of O)$.title.startsWith(`Pending sheet write: ${t.spreadsheet_id}`)&&await C.remove($.id,s)}catch{}return`Written ${N.updatedCells} cells to ${v}.`}catch(m){return await H(n,s,"google","write_sheet",m.message),`Failed to write sheet: ${m.message}`}}case"append_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{await new Q(n).store(s,"context",`Pending sheet append: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"append_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The append data has been saved to temporary memory. After reconnecting, tell me "append the pending sheet data" to complete this.`:"")}const h=await m.sheets.appendRows(t.spreadsheet_id,t.range,t.values);try{const v=new Q(n),b=await v.search(s,`Pending sheet append: ${t.spreadsheet_id}`);for(const S of b)S.title.startsWith(`Pending sheet append: ${t.spreadsheet_id}`)&&await v.remove(S.id,s)}catch{}return`Appended ${h.updatedCells} cells to ${t.range}.`}catch(m){return await H(n,s,"google","append_sheet",m.message),`Failed to append to sheet: ${m.message}`}}case"create_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.title)try{await new Q(n).store(s,"context",`Pending spreadsheet create: "${t.title}"`,JSON.stringify({tool:"create_sheet",title:t.title,sheet_names:t.sheet_names??null,folder_name:t.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title?`

The spreadsheet request has been saved to temporary memory. After reconnecting, tell me "create the pending spreadsheet" and I'll complete this automatically.`:"")}const h=await m.sheets.createSpreadsheet(t.title,t.sheet_names);let v="";if(t.folder_name)try{const{token:b}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(n,s,r,a||"",i||"");v=`
Folder: "${(await kn(b,h.spreadsheetId,t.folder_name)).folderName}"`}catch(b){v=`
(Note: spreadsheet saved to Drive root — could not place in folder "${t.folder_name}": ${b.message})`}try{await new Q(n).store(s,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${h.spreadsheetId} | URL: ${h.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${v}
ID: ${h.spreadsheetId}
URL: ${h.url}`}catch(m){return await H(n,s,"google","create_sheet",m.message),`Failed to create spreadsheet: ${m.message}`}}case"list_calendar_events":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||""),E=t.calendar_id||"primary",h=t.days_ahead||7,v=new Date,b=new Date(v.getTime()+h*24*60*60*1e3),S=await m.calendar.listEvents(E,{timeMin:v.toISOString(),timeMax:b.toISOString(),query:t.query});return S.length===0?`No events found in the next ${h} days.`:S.map(k=>{var O;const R=k.start.dateTime||k.start.date||"TBD",A=k.end.dateTime||k.end.date||"",N=k.location?` 📍 ${k.location}`:"",C=((O=k.attendees)==null?void 0:O.map($=>$.email).join(", "))||"";return`• ${k.summary} — ${R} to ${A}${N}${C?`
  Attendees: ${C}`:""}`}).join(`
`)}catch(m){return await H(n,s,"google","list_calendar",m.message),`Failed to list events: ${m.message}`}}case"create_calendar_event":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.summary&&t.start_datetime&&t.end_datetime)try{await new Q(n).store(s,"context",`Pending calendar event: "${t.summary}"`,JSON.stringify({tool:"create_calendar_event",summary:t.summary,description:t.description??null,location:t.location??null,start_datetime:t.start_datetime,end_datetime:t.end_datetime,attendees:t.attendees??null,calendar_id:t.calendar_id??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.summary&&t.start_datetime?`

The calendar event has been saved to temporary memory. After reconnecting, tell me "create the pending event" and I'll add it to your calendar.`:"")}const h=t.calendar_id||"primary",v=await m.calendar.createEvent(h,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});try{const b=new Q(n),S=await b.search(s,`Pending calendar event: "${t.summary}"`);for(const k of S)k.title.startsWith(`Pending calendar event: "${t.summary}"`)&&await b.remove(k.id,s)}catch{}return`Event created: "${v.summary}"
ID: ${v.id}
Start: ${v.start.dateTime||v.start.date}`}catch(m){return await H(n,s,"google","create_event",m.message),`Failed to create event: ${m.message}`}}case"create_doc":{if(!r)return"Authentication context unavailable.";const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.title&&t.content){try{await new Q(n).store(s,"context",`Pending Google Doc save: "${t.title}"`,JSON.stringify({tool:"create_doc",title:t.title,content:t.content,folder_name:t.folder_name??null}),9,"working")}catch{}try{await n.prepare(`INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
               VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`).bind(s,`Pending doc: "${t.title}"`,'Google not connected — reconnect then say "save the pending document".',`pending_doc_${t.title}`,JSON.stringify({tool:"create_doc",title:t.title,folder_name:t.folder_name??null})).run()}catch{}}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" and I'll complete this automatically.`:"")}let h;try{h=await m.docs.createDocument(t.title)}catch(b){return await H(n,s,"google","create_doc",b.message),`Failed to create document: ${b.message}`}if(t.content){const b=t.content,S=async()=>{b.length>12e3?await m.docs.appendText(h.documentId,b):await m.docs.appendFormattedContent(h.documentId,b)};try{await S()}catch(k){try{await m.docs.appendText(h.documentId,b)}catch(R){return await H(n,s,"google","create_doc_append",R.message),`Document created but content could not be written (${R.message}).
ID: ${h.documentId}
URL: ${h.url}

Use append_to_doc with the document ID above to add content.`}await H(n,s,"google","create_doc_append_fallback",`Formatted append failed, used plain text: ${k.message}`)}}let v="";if(t.folder_name)try{const{token:b}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(n,s,r,a||"",i||"");v=`
Folder: "${(await kn(b,h.documentId,t.folder_name)).folderName}"`}catch(b){v=`
(Note: document saved to Drive root — could not place in folder "${t.folder_name}": ${b.message})`}try{await new Q(n).store(s,"context",`Document: ${t.title}`,`Document ID: ${h.documentId} | URL: ${h.url}`,6,"working")}catch{}try{const b=t.content;await n.prepare(`INSERT OR IGNORE INTO document_library (user_id, source, drive_file_id, name, summary, extracted_text, status)
           VALUES (?, 'drive', ?, ?, ?, ?, 'parsed')`).bind(s,h.documentId,t.title,b?b.substring(0,500):null,b?b.substring(0,5e4):null).run()}catch{}try{const b=new Q(n),S=await b.search(s,`Pending Google Doc save: "${t.title}"`);for(const k of S)k.title.startsWith(`Pending Google Doc save: "${t.title}"`)&&await b.remove(k.id,s)}catch{}return`Document created: "${t.title}"${v}
ID: ${h.documentId}
URL: ${h.url}`}case"read_doc":{if(!r)return"Authentication context unavailable.";try{const E=await new we(n,s,r,a||"",i||"").docs.readDocument(t.document_id);return`Document: "${E.title}"

${E.content}`}catch(m){return await H(n,s,"google","read_doc",m.message),`Failed to read document: ${m.message}`}}case"append_to_doc":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.document_id&&t.content)try{await new Q(n).store(s,"context",`Pending append to doc: "${t.document_id}"`,JSON.stringify({tool:"append_to_doc",document_id:t.document_id,content:t.content}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.'+(t.document_id&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" to complete this.`:"")}await m.docs.appendFormattedContent(t.document_id,t.content);let h=t.document_id;try{h=(await m.docs.readDocument(t.document_id)).title}catch{}try{const v=new Q(n),b=await v.search(s,`Pending append to doc: "${t.document_id}"`);for(const S of b)S.title.startsWith(`Pending append to doc: "${t.document_id}"`)&&await v.remove(S.id,s)}catch{}try{const v=t.content;await n.prepare(`UPDATE document_library
             SET extracted_text = SUBSTR(COALESCE(extracted_text, '') || char(10) || ?, 1, 50000),
                 updated_at = CURRENT_TIMESTAMP
             WHERE user_id = ? AND drive_file_id = ?`).bind(v,s,t.document_id).run()}catch{}return`Content appended to "${h}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(m){return await H(n,s,"google","append_to_doc",m.message),`Failed to append to document: ${m.message}`}}case"rewrite_doc":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";await m.docs.rewriteDocument(t.document_id,t.content);let h=t.document_id;try{h=(await m.docs.readDocument(t.document_id)).title}catch{}return`Document "${h}" reformatted successfully.
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(m){return await H(n,s,"google","rewrite_doc",m.message),`Failed to rewrite document: ${m.message}`}}case"delete_sheet_row":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const h=t.row_number;return h<2?"Row 1 is the header row and cannot be deleted. Specify row 2 or higher.":(await m.sheets.deleteRow(t.spreadsheet_id,t.sheet_name,h),`Row ${h} deleted from "${t.sheet_name}". All rows below have shifted up.`)}catch(m){return await H(n,s,"google","delete_sheet_row",m.message),`Failed to delete row: ${m.message}`}}case"delete_doc_content":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const h=await m.docs.deleteContent(t.document_id,t.text_to_remove);return h.occurrencesRemoved===0?"No matching text found in the document. The text must match exactly — check spacing, punctuation, and line breaks.":`Removed ${h.occurrencesRemoved} occurrence${h.occurrencesRemoved===1?"":"s"} from the document.`}catch(m){return await H(n,s,"google","delete_doc_content",m.message),`Failed to delete document content: ${m.message}`}}case"gmail_list":{if(!r)return"Authentication context unavailable.";try{const E=await new ke(n,s,r,a||"",i||"").listMessages({maxResults:t.max_results||10,query:t.query});return E.length===0?"No messages found.":E.map((h,v)=>`${h.isUnread?"● ":"  "}${v+1}. **${h.subject}**
   From: ${h.from}
   Date: ${h.date}
   ${h.snippet}
   [id: ${h.id}]`).join(`

`)}catch(m){return await H(n,s,"gmail","list",m.message),(T=m.message)!=null&&T.includes("not connected")?m.message:`Gmail list error: ${m.message}`}}case"gmail_read":{if(!r)return"Authentication context unavailable.";try{const m=new ke(n,s,r,a||"",i||""),E=await m.getMessage(t.message_id);if(!E)return"Message not found.";let h=await m.getMessageBody(t.message_id);return h.trim().length<200&&E.snippet&&(h=`${h}

[Snippet]: ${E.snippet}`.trim()),`**${E.subject}**
From: ${E.from}
To: ${E.to}
Date: ${E.date}

${h}`}catch(m){return await H(n,s,"gmail","read",m.message),`Gmail read error: ${m.message}`}}case"gmail_search":{if(!r)return"Authentication context unavailable.";try{const m=Po(t);if(!m)return"Gmail search requires a non-empty query (e.g. from:sender@example.com subject:invoice). Use Gmail search syntax.";const E=typeof t.product_hint=="string"?t.product_hint.trim():"",h=Math.min(Math.max(t.max_results||10,1),20),v=new ke(n,s,r,a||"",i||"");let b=await v.search(m,h);if(b.length===0&&E){const S=qn(E).replace("180d","365d");b=await v.search(S,h)}return b.length===0?`No results for: ${m}`:E?ro(b,E,m):b.map((S,k)=>`${S.isUnread?"● ":"  "}${k+1}. **${S.subject}**
   From: ${S.from}
   Date: ${S.date}
   ${S.snippet}
   [id: ${S.id}]`).join(`

`)}catch(m){await H(n,s,"gmail","search",m.message);const E=String((m==null?void 0:m.message)||m);return/403|access denied|insufficient|permission/i.test(E)?`${E} Go to Settings → Keys → Google Workspace and reconnect your account.`:`Gmail search error: ${E}`}}case"gmail_send":{if(!r)return"Authentication context unavailable.";try{const m=new ke(n,s,r,a||"",i||"");if(!(await new we(n,s,r,a||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body){try{await new Q(n).store(s,"context",`Pending email: "${t.subject}"`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}try{await n.prepare(`INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
                 VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`).bind(s,`Pending email: "${t.subject}"`,`To: ${t.to} — reconnect Google then say "send the pending email".`,`pending_email_${t.subject}`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject})).run()}catch{}}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your email has been saved to temporary memory. After reconnecting, tell me "send the pending email" and I'll send it automatically.`:"")}const v=await m.send(t.to,t.subject,t.body,{cc:t.cc});try{const b=new Q(n),S=await b.search(s,`Pending email: "${t.subject}"`);for(const k of S)k.title.startsWith(`Pending email: "${t.subject}"`)&&await b.remove(k.id,s)}catch{}return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${v.id}]`}catch(m){return await H(n,s,"gmail","send",m.message),`Gmail send error: ${m.message}`}}case"gmail_draft":{if(!r)return"Authentication context unavailable.";try{const m=new ke(n,s,r,a||"",i||"");if(!(await new we(n,s,r,a||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body)try{await new Q(n).store(s,"context",`Pending draft: "${t.subject}"`,JSON.stringify({tool:"gmail_draft",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your draft has been saved to temporary memory. After reconnecting, tell me "create the pending draft" and I'll save it to Gmail.`:"")}const v=await m.createDraft(t.to,t.subject,t.body,{cc:t.cc});try{const S=new Q(n),k=await S.search(s,`Pending draft: "${t.subject}"`);for(const R of k)R.title.startsWith(`Pending draft: "${t.subject}"`)&&await S.remove(R.id,s)}catch{}const b=t.cc?`, CC: ${t.cc}`:"";return`Draft created. To: ${t.to}${b}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${v.id}]`}catch(m){return await H(n,s,"gmail","draft",m.message),`Gmail draft error: ${m.message}`}}case"gmail_modify":{if(!r)return"Authentication context unavailable.";try{return await new ke(n,s,r,a||"",i||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(m){return await H(n,s,"gmail","modify",m.message),`Gmail modify error: ${m.message}`}}case"gmail_unread_count":{if(!r)return"Authentication context unavailable.";try{const E=await new ke(n,s,r,a||"",i||"").getUnreadCount();return`You have ${E} unread email${E!==1?"s":""} in Gmail.`}catch(m){return(x=m.message)!=null&&x.includes("not connected")?m.message:`Gmail error: ${m.message}`}}case"drive_list":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(n,s,r,a||"",i||""),E=new URLSearchParams;E.set("pageSize",String(t.max_results||10)),E.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),E.set("orderBy","modifiedTime desc");let h="";t.folder_id?h=`'${t.folder_id}' in parents and trashed = false`:t.query?h=`${t.query} and trashed = false`:h="trashed = false",E.set("q",h);const v=await fetch(`https://www.googleapis.com/drive/v3/files?${E}`,{headers:{Authorization:`Bearer ${m}`}});if(!v.ok)throw new Error(`Drive API error (${v.status})`);const b=await v.json();return(L=b.files)!=null&&L.length?b.files.map((S,k)=>{var C,O;const R=((C=S.mimeType)==null?void 0:C.split(".").pop())||S.mimeType,A=S.size?`${(parseInt(S.size)/1024).toFixed(1)} KB`:"",N=((O=S.modifiedTime)==null?void 0:O.split("T")[0])||"";return`${k+1}. **${S.name}** (${R})
   ${A} · Modified: ${N}
   ${S.webViewLink||""}`}).join(`

`):"No files found."}catch(m){return await H(n,s,"google","drive_list",m.message),`Drive list error: ${m.message}`}}case"drive_search":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(n,s,r,a||"",i||""),E=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,h=new URLSearchParams;h.set("q",E),h.set("pageSize",String(t.max_results||10)),h.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),h.set("orderBy","modifiedTime desc");const v=await fetch(`https://www.googleapis.com/drive/v3/files?${h}`,{headers:{Authorization:`Bearer ${m}`}});if(!v.ok)throw new Error(`Drive API error (${v.status})`);const b=await v.json();return(I=b.files)!=null&&I.length?b.files.map((S,k)=>{var N,C;const R=((N=S.mimeType)==null?void 0:N.split(".").pop())||S.mimeType,A=((C=S.modifiedTime)==null?void 0:C.split("T")[0])||"";return`${k+1}. **${S.name}** (${R}) — Modified: ${A}
   ${S.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(m){return await H(n,s,"google","drive_search",m.message),`Drive search error: ${m.message}`}}case"drive_read_file":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(n,s,r,a||"",i||""),E=t.url_or_id.trim();let h=E;const v=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/\/presentation\/d\/([a-zA-Z0-9_-]+)/,/\/forms\/d\/([a-zA-Z0-9_-]+)/,/[?&]id=([a-zA-Z0-9_-]+)/,/\/d\/([a-zA-Z0-9_-]+)/];for(const B of v){const J=E.match(B);if(J){h=J[1];break}}const b=await fetch(`https://www.googleapis.com/drive/v3/files/${h}?fields=id,name,mimeType,size`,{headers:{Authorization:`Bearer ${m}`}});if(!b.ok)throw new Error(`Drive API error (${b.status}): could not fetch file metadata`);const S=await b.json(),{name:k,mimeType:R}=S,A=t.extract_focus,N=A?`Focus specifically on extracting: ${A}`:"Extract and return all readable text content. Preserve structure where relevant.",C={"application/vnd.google-apps.document":"text/plain","application/vnd.google-apps.spreadsheet":"text/csv","application/vnd.google-apps.presentation":"text/plain"};if(C[R]){const B=C[R],J=await fetch(`https://www.googleapis.com/drive/v3/files/${h}/export?mimeType=${encodeURIComponent(B)}`,{headers:{Authorization:`Bearer ${m}`}});if(!J.ok)throw new Error(`Drive export error (${J.status})`);const X=await J.text();if(R==="application/vnd.google-apps.spreadsheet"){const K=qo(X),ie=K.length,de=((M=K[0])==null?void 0:M.length)??0;return`**${k}** (Google Sheet — ${ie} rows × ${de} columns)

Parsed rows (JSON, ready for write_sheet/append_sheet):
${JSON.stringify(K)}`}return`**${k}**

${X.substring(0,2e4)}`}if(R==="application/pdf"||k.toLowerCase().endsWith(".pdf")){const B=await fetch(`https://www.googleapis.com/drive/v3/files/${h}?alt=media`,{headers:{Authorization:`Bearer ${m}`}});if(!B.ok)throw new Error(`Drive download error (${B.status})`);const J=await B.arrayBuffer(),X=Buffer.from(J).toString("base64");let K=null,ie="claude-sonnet-4-6";for(const De of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const Te=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,De).first();if(Te&&r){const Aa=await G(Te.encrypted_value,r),Zt=JSON.parse(Aa);if(Zt.provider==="anthropic"){K=Zt.apiKey,Zt.model&&(ie=Zt.model);break}}}catch{}if(!K)return`"${k}" is a PDF. An Anthropic API key is required to extract PDF content. Please configure one in Settings → Keys.`;const de=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":K,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:ie,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:X}},{type:"text",text:N}]}]})});if(!de.ok){const De=await de.text();throw new Error(`Anthropic PDF extraction error: ${De.substring(0,200)}`)}const ge=((z=(j=(await de.json()).content)==null?void 0:j[0])==null?void 0:z.text)||"";return`**${k}** (PDF from Drive)

${ge}`}const O=await fetch(`https://www.googleapis.com/drive/v3/files/${h}?alt=media`,{headers:{Authorization:`Bearer ${m}`}});if(!O.ok)throw new Error(`Drive download error (${O.status})`);const $=await O.text();return`**${k}** (${R})

${$.substring(0,2e4)}`}catch(m){return await H(n,s,"google","drive_read_file",m.message),`Drive read error: ${m.message}`}}case"drive_delete_file":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(n,s,r,a||"",i||""),E=t.url_or_id.trim();let h=E;const v=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const R of v){const A=E.match(R);if(A){h=A[1];break}}const b=await fetch(`https://www.googleapis.com/drive/v3/files/${h}?fields=name`,{headers:{Authorization:`Bearer ${m}`}});if(!b.ok)throw new Error(`Drive API error (${b.status})`);const S=await b.json(),k=await fetch(`https://www.googleapis.com/drive/v3/files/${h}`,{method:"PATCH",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({trashed:!0})});if(!k.ok)throw new Error(`Drive API error (${k.status})`);return`"${S.name}" moved to trash. You can restore it from Drive trash within 30 days.`}catch(m){return await H(n,s,"google","drive_delete_file",m.message),`Drive delete error: ${m.message}`}}case"drive_organise":{if(!r)return"Authentication context unavailable.";if(!t.folder_name&&!t.new_name)return"Please provide at least a folder_name to move to or a new_name to rename.";try{const{token:m}=await(await Promise.resolve().then(()=>nt)).getGoogleAuth(n,s,r,a||"",i||""),E=t.url_or_id.trim();let h=E;const v=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const S of v){const k=E.match(S);if(k){h=k[1];break}}const b=[];if(t.new_name){const S=await fetch(`https://www.googleapis.com/drive/v3/files/${h}`,{method:"PATCH",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({name:t.new_name})});if(!S.ok)throw new Error(`Drive rename error (${S.status})`);b.push(`Renamed to "${t.new_name}"`)}if(t.folder_name){const{folderName:S}=await kn(m,h,t.folder_name);b.push(`Moved to folder "${S}"`)}return b.join(". ")+"."}catch(m){return await H(n,s,"google","drive_organise",m.message),`Drive organise error: ${m.message}`}}case"web_search":try{const m=await It(t.query,{num:t.num_results||5,site:t.site,googleApiKey:o||void 0,googleCseId:l||void 0});return m.error?`Web search failed: ${m.error}. Answer this question directly from your training knowledge and clearly state you are doing so.`:m.results.length===0?`Web search returned no results for "${t.query}". Answer this question directly from your training knowledge and clearly state you are doing so instead of searching.`:m.results.map((E,h)=>`${h+1}. [${E.title}](${E.link})
   ${E.snippet}`).join(`

`)}catch(m){return await H(n,s,"search","web_search",m.message),`Web search error: ${m.message}`}case"read_url":try{const m=t.url;if(!m||!m.startsWith("http://")&&!m.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const E=Math.min(t.max_length||8e3,15e3),{fetchPageContent:h}=await Promise.resolve().then(()=>mo),v=await h(m,E);return v.error?`Failed to read page: ${v.error}`:!v.text||v.text.length<20?`Page at ${m} returned no readable content.`:`Content from ${m} (${v.text.length} chars):

${v.text}`}catch(m){return await H(n,s,"search","read_url",m.message),`Read URL error: ${m.message}`}case"research":{if(!d)return"Research tool requires an LLM provider but none is available.";try{let m,E;try{for(const N of["llm_slot_1","llm_slot_2","llm_slot_3"]){const C=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,N).first();if(!C||!r)continue;const O=JSON.parse(await G(C.encrypted_value,r));if(O.provider==="anthropic"&&O.apiKey){m=O.apiKey;break}}const A=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"tavily_api_key").first();A&&r&&(E=await G(A.encrypted_value,r))}catch{}const h=t.depth||"quick",v=h==="thorough"?3e5:9e4,b=Ir(t.query,d,{depth:h,site:t.site,anthropicKey:m,tavilyKey:E,googleApiKey:o||void 0,googleCseId:l||void 0}),S=new Promise(A=>setTimeout(()=>A(null),v)),k=await Promise.race([b,S]);if(k===null){const{webSearch:A}=await Promise.resolve().then(()=>Qi),N=await A(t.query,{num:5,googleApiKey:o||void 0,googleCseId:l||void 0});if(N.error||N.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let C=`Research took too long, but here are the top search results:

`;return C+=N.results.map((O,$)=>`${$+1}. [${O.title}](${O.link})
   ${O.snippet}`).join(`

`),C}if(k.error)return`Research failed: ${k.error}`;let R=k.report;k.sources.length>0&&(R+=`

---
**Sources** (`+k.pagesRead+` pages read):
`,R+=k.sources.map((A,N)=>`[${N+1}] [${A.title}](${A.url})`).join(`
`)),R+=`

---
💡 *Say "save as note" to store this report in your notes.*`,h==="thorough"&&m&&(R+=`
⚠️ *Thorough research used ~3 Opus 4.8 API calls (~$0.10–$0.30 at standard rates).*`);try{const A=new Q(n),N=k.report.substring(0,600);await A.store(s,"context",`Research: ${t.query.substring(0,80)}`,N,6,"long_term")}catch{}return R}catch(m){return await H(n,s,"research","research",m.message),`Research error: ${m.message}`}}case"save_note":try{const m=(t.content||"").trim();if(!m)return"Note content cannot be empty.";const E=t.source||"manual",h=["manual","research","chat"].includes(E)?E:"manual",v=await n.prepare(`INSERT INTO notes (user_id, title, content, tags, source, source_query, is_pinned)
           VALUES (?, ?, ?, ?, ?, ?, 0) RETURNING id, title`).bind(s,(t.title||"").trim(),m,(t.tags||"").trim(),h,(t.source_query||"").trim()).first();return`Note added — ${v!=null&&v.title&&v.title!=="Untitled"?v.title:m.substring(0,60)+(m.length>60?"…":"")}`}catch(m){return`Failed to save note: ${m.message}`}case"search_notes":try{const m=(t.query||"").trim();if(!m)return"Search query is required.";const E=`%${m}%`,v=(await n.prepare(`SELECT id, title, content, tags, is_pinned, updated_at FROM notes
           WHERE user_id = ? AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
           ORDER BY updated_at DESC LIMIT 20`).bind(s,E,E,E).all()).results||[];return v.length===0?`No notes found matching "${m}".`:v.map(b=>`[#${b.id}] ${b.is_pinned?"📌 ":""}${b.title||"Untitled"} (${b.updated_at})
${b.content.slice(0,200)}${b.content.length>200?"...":""}${b.tags?`
Tags: ${b.tags}`:""}`).join(`

`)}catch(m){return`Note search failed: ${m.message}`}case"list_notes":try{const m=Math.min(t.limit||10,50),E=t.tag,h=t.pinned_only===!0,v=["user_id = ?"],b=[s];E&&(v.push("tags LIKE ?"),b.push(`%${E}%`)),h&&v.push("is_pinned = 1"),b.push(m);const k=(await n.prepare(`SELECT id, title, content, tags, is_pinned, updated_at FROM notes
           WHERE ${v.join(" AND ")} ORDER BY is_pinned DESC, updated_at DESC LIMIT ?`).bind(...b).all()).results||[];return k.length===0?"No notes found.":k.map(R=>`[#${R.id}] ${R.is_pinned?"📌 ":""}${R.title||"Untitled"} (${R.updated_at})
${R.content.slice(0,150)}${R.content.length>150?"...":""}`).join(`

`)}catch(m){return`Failed to list notes: ${m.message}`}case"delete_note":try{const m=t.id;return m?(await n.prepare("DELETE FROM notes WHERE id = ? AND user_id = ?").bind(m,s).run()).meta.changes?`Note #${m} deleted.`:`Note #${m} not found.`:"Note ID is required."}catch(m){return`Failed to delete note: ${m.message}`}case"browser_task":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"browser_use_api_key").first();if(!m)return"Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key (get one at cloud.browser-use.com).";const E=(await G(m.encrypted_value,r)).trim();let h,v=t.task,b,S;if(!t.site_name)try{const $=await n.prepare("SELECT name FROM site_credentials WHERE user_id = ?").bind(s).all(),B=v.toLowerCase(),J=($.results||[]).find(X=>B.includes(X.name.toLowerCase()));J&&(t={...t,site_name:J.name},vs("browser_task auto-vault: inferred site_name from task text",{siteName:J.name,userId:s}))}catch{}if(t.site_name)try{const $=await n.prepare("SELECT id, encrypted_blob FROM site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE").bind(s,t.site_name).first();if($){const B=JSON.parse(await G($.encrypted_blob,r));h={username:B.username,password:B.password},S=B.sessionId,b=$.id,v=`${v}

When prompted to log in, use username {username} and password {password}.`}}catch{}const k=async $=>{if(b)try{const B=await n.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(b,s).first();if(!B)return;const J=JSON.parse(await G(B.encrypted_blob,r));J.sessionId=$,await n.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(await Nt(JSON.stringify(J),r),b,s).run()}catch{}},R=async()=>{if(!(!b||!S))try{const $=await n.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(b,s).first();if(!$)return;const B=JSON.parse(await G($.encrypted_blob,r));delete B.sessionId,await n.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(await Nt(JSON.stringify(B),r),b,s).run()}catch{}},A=/blue[\s-]?dart[\s\S]{0,100}?(\d{10,11})|(\d{10,11})[\s\S]{0,100}?blue[\s-]?dart/i.exec(v);if(A){const $=A[1]||A[2];v=fo($)}const N=void 0;g&&(g.apiKey=E,S&&!g.sessionId?(g.sessionId=S,g.persistSession=!0):!g.sessionId&&b&&(g.sessionId=await ho(E)??void 0)),vs("browser_task starting",{userId:s,channel:y,timeoutMs:N??3e5,sessionId:g==null?void 0:g.sessionId,vaultSession:!!S});const C=await Fn(v,E,{secrets:h,sessionId:g==null?void 0:g.sessionId,timeoutMs:N});if(C.status==="completed"){const $=(g==null?void 0:g.sessionId)??void 0;return b&&$&&(g&&(g.persistSession=!0),await k($)),(W=C.output)!=null&&W.includes('"captcha_required": true')?"Captcha detected — manual verification required. The site blocked automated access. Please try completing it manually or try again later.":C.output??"[NO-OUTPUT] Browser task completed but returned no content — do NOT invent or summarise what the site may have contained. Tell the user the browser returned nothing and suggest they try again."}if(C.status==="timeout"){g&&(g.hasActiveTask=!0);try{await new Q(n).store(s,"context",`Browser task in progress: ${C.taskId}`,JSON.stringify({task_id:C.taskId,task:t.task}),9,"working")}catch{}try{const $=(t.task||"").substring(0,200);await n.prepare("INSERT INTO pending_browser_tasks (user_id, task_id, task_description, thread_id, channel) VALUES (?, ?, ?, ?, ?)").bind(s,C.taskId,$,(g==null?void 0:g.threadId)??null,y).run()}catch{}return`[BROWSER_TIMEOUT:${C.taskId}] Browser task did not finish within the time limit. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up."`}S&&E&&mn(S,E).catch(()=>{}),g&&(g.persistSession=!1),await R();const O=[C.error,C.output].filter(Boolean).join(" — ");return`Browser task failed (ID: \`${C.taskId}\`): ${O||"No details returned."} | Operator hint: Check Browser Use dashboard — taskId=${C.taskId}`}catch(m){return await H(n,s,"browser","browser_task",m.message),`Browser task error: ${m.message}`}}case"browser_task_status":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"browser_use_api_key").first();if(!m)return"Browser Use API key not configured.";const E=await G(m.encrypted_value,r),h=await Lr(t.task_id,E);if(h.done){try{const v=new Q(n),b=await v.search(s,`Browser task in progress: ${t.task_id}`);for(const S of b)await v.remove(S.id,s)}catch{}return h.status==="finished"||h.status==="completed"?h.output?h.output:'[NO-OUTPUT] Browser task finished but returned no content. Do NOT invent or infer what emails or page data might have said. Tell the user: "The browser finished but returned no content — the site may have blocked automation or the login failed. Would you like to try again?"':`Browser task ended with status "${h.status}" and no output. Do NOT retry — report this to the user.`}return`[still-running] Browser task has not finished yet (status: ${h.status}). STOP — do not call browser_task_status again. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up."`}catch(m){return await H(n,s,"browser","browser_task_status",m.message),`Browser status check error: ${m.message}`}}case"vault_lookup":try{const m=(t.site_name||"").trim();if(!m)return"No site name provided.";const h=((await n.prepare("SELECT name FROM site_credentials WHERE user_id = ? AND name LIKE ? COLLATE NOCASE").bind(s,`%${m}%`).all()).results||[]).map(v=>v.name);return h.length===0?`No vault entries found matching "${m}".`:`Vault entries matching "${m}": ${h.join(", ")}. Use site_name="${h[0]}" in browser_task to inject credentials automatically.`}catch{return"vault_lookup: could not query Secret Vault (table may not exist — run migrations)."}case"search_places":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const E=await G(m.encrypted_value,r),h=await _r(E,t.query,{type:t.type});return h.error?`Places search failed: ${h.error}`:h.results.length===0?`No places found for "${t.query}".`:h.results.map((v,b)=>{const S=v.rating?` ★${v.rating} (${v.userRatingsTotal||0} reviews)`:"",k=v.openNow!==void 0?v.openNow?" · Open now":" · Closed":"",R=v.googleMapsUri?`
   ${v.googleMapsUri}`:"";return`${b+1}. **${v.name}**${S}${k}
   ${v.address}${R}
   [place_id: ${v.placeId}]`}).join(`

`)}catch(m){return await H(n,s,"google_api","search_places",m.message),`Places search error: ${m.message}`}}case"get_place_details":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),h=await br(E,t.place_id);if(h.error)return`Details lookup failed: ${h.error}`;if(!h.details)return"No details found.";const v=h.details;let b=`**${v.name}**
📍 ${v.address}`;if(v.phone&&(b+=`
📞 ${v.phone}`),v.website&&(b+=`
🌐 ${v.website}`),v.rating&&(b+=`
★ ${v.rating}`),v.googleMapsUri&&(b+=`
📌 ${v.googleMapsUri}`),v.openingHours&&(b+=`

Opening Hours:
${v.openingHours.join(`
`)}`),v.reviews&&v.reviews.length>0){b+=`

Recent Reviews:`;for(const S of v.reviews)b+=`
— ${S.author} (★${S.rating}, ${S.time}): "${S.text}"`}return b}catch(m){return await H(n,s,"google_api","place_details",m.message),`Place details error: ${m.message}`}}case"get_directions":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),h=await Er(E,t.origin,t.destination,{mode:t.mode||"driving"});if(h.error)return`Directions failed: ${h.error}`;if(!h.route)return"No route found.";const v=h.route;let b=`**${v.startAddress}** → **${v.endAddress}**
`;return b+=`📏 ${v.distance} · ⏱️ ${v.duration}`,v.durationInTraffic&&(b+=` (with traffic: ${v.durationInTraffic})`),b+=`
via ${v.summary}`,b+=`

Steps:`,v.steps.forEach((S,k)=>{b+=`
${k+1}. ${S.instruction} (${S.distance}, ${S.duration})`}),b}catch(m){return await H(n,s,"google_api","directions",m.message),`Directions error: ${m.message}`}}case"get_travel_time":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),h=await Dr(E,t.origin,t.destination,t.mode||"driving");if(h.error)return`Travel time lookup failed: ${h.error}`;let v=`${t.origin} → ${t.destination}: ${h.distance}, ${h.duration}`;return h.durationInTraffic&&(v+=` (with traffic: ${h.durationInTraffic})`),v}catch(m){return await H(n,s,"google_api","travel_time",m.message),`Travel time error: ${m.message}`}}case"translate_text":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),h=await Tr(E,t.text,t.target_language,t.source_language);return h.error?`Translation failed: ${h.error}`:`[${h.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${h.translatedText}`}catch(m){return await H(n,s,"google_api","translate",m.message),`Translation error: ${m.message}`}}case"search_youtube":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),h=await kr(E,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return h.error?`YouTube search failed: ${h.error}`:h.results.length===0?`No YouTube results for "${t.query}".`:h.results.map((v,b)=>{var S;return`${b+1}. **${v.title}**
   ${v.channelTitle} · ${((S=v.publishedAt)==null?void 0:S.split("T")[0])||""}
   ${v.description}
   ${v.url}`}).join(`

`)}catch(m){return await H(n,s,"google_api","youtube_search",m.message),`YouTube search error: ${m.message}`}}case"geocode_address":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await G(m.encrypted_value,r),h=await Sr(E,t.address);return h.error?`Geocoding failed: ${h.error}`:h.results.length===0?`Location not found: "${t.address}"`:h.results.map((v,b)=>`${b+1}. ${v.address}
   Coordinates: ${v.lat}, ${v.lng}`).join(`
`)}catch(m){return await H(n,s,"google_api","geocode",m.message),`Geocoding error: ${m.message}`}}case"parse_document":{const m=t.file_id,E=t.extract_focus;if(!m)return"file_id is required to parse a document.";const h=await n.prepare("SELECT file_name, file_type, file_data, file_size, extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(m,s).first();if(!h)return"File not found. The file may have expired or the file_id is incorrect.";if(h.extracted_text)return`Document: ${h.file_name}

${h.extracted_text}`;const{file_name:v,file_type:b}=h;let{file_data:S}=h;if(S==="r2"){if(!u)return`File "${v}" is stored in R2 but no storage bucket is configured.`;const k=await u.get(m);if(!k)return`File "${v}" not found in storage. It may have been deleted.`;const R=await k.arrayBuffer();S=Buffer.from(R).toString("base64")}if(b.startsWith("text/"))try{const k=Buffer.from(S,"base64").toString("utf-8");return`Document: ${v}

${k.substring(0,2e4)}`}catch{return`Could not decode text file: ${v}`}if(b==="application/pdf"||b==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||v.toLowerCase().endsWith(".pdf")||v.toLowerCase().endsWith(".docx")){if(b==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||v.toLowerCase().endsWith(".docx")){try{const A=await Mr(Buffer.from(S,"base64"));if(A.length>50){try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(A,m,s).run();const N=A.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind(N,A.substring(0,5e4),m,s).run(),p!=null&&p.ai&&(p!=null&&p.vectorize)){const C=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,s).first();if(C){const{indexDocumentChunks:O}=await Promise.resolve().then(()=>Ve);O({DB:n,AI:p.ai,VECTORIZE:p.vectorize},s,C.id,A).catch(()=>{})}}}catch{}return`Document: ${v}

${A.substring(0,2e4)}`}}catch{}return`Could not extract text from "${v}". Try uploading to Google Drive and sharing the link — Drive can open and export Word documents directly.`}let k=null,R="claude-sonnet-4-6";for(const A of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const N=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,A).first();if(N&&r){const C=await G(N.encrypted_value,r),O=JSON.parse(C);if(O.provider==="anthropic"){k=O.apiKey,O.model&&(R=O.model);break}}}catch{}if(k)try{const A=E?`Focus specifically on extracting: ${E}`:"Extract and return all readable text content from this document. Preserve structure where relevant.",N=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":k,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:R,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:S}},{type:"text",text:A}]}]})});if(N.ok){const O=((P=(ne=(await N.json()).content)==null?void 0:ne[0])==null?void 0:P.text)||"";if(O&&O.length>50)try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(O,m,s).run();const $=O.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind($,O.substring(0,5e4),m,s).run(),p!=null&&p.ai&&(p!=null&&p.vectorize)){const B=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,s).first();if(B){const{indexDocumentChunks:J}=await Promise.resolve().then(()=>Ve);J({DB:n,AI:p.ai,VECTORIZE:p.vectorize},s,B.id,O).catch(()=>{})}}}catch{}return`Document: ${v}

${O}`}else{const C=await N.text();return`Could not parse ${v} via Anthropic API: ${C.substring(0,200)}`}}catch(A){return`Document parsing error for ${v}: ${A.message}`}return"To parse PDF documents, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set."}if(b.startsWith("image/")){let k=null,R="claude-sonnet-4-6";for(const N of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const C=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,N).first();if(C&&r){const O=await G(C.encrypted_value,r),$=JSON.parse(O);if($.provider==="anthropic"){k=$.apiKey,$.model&&(R=$.model);break}}}catch{}if(!k)return"To extract text from images, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set.";const A=E?`Focus specifically on: ${E}`:"Extract all visible text from this image. Include any text from signs, documents, screenshots, or diagrams. If the image contains charts or tables, describe their structure and data.";try{const N=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":k,"anthropic-version":"2023-06-01","content-type":"application/json"},body:JSON.stringify({model:R,max_tokens:4096,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:b,data:S}},{type:"text",text:A}]}]})});if(N.ok){const O=((q=(Y=(await N.json()).content)==null?void 0:Y[0])==null?void 0:q.text)||"";if(O&&O.length>50)try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(O,m,s).run();const $=O.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind($,O.substring(0,5e4),m,s).run(),p!=null&&p.ai&&(p!=null&&p.vectorize)){const B=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,s).first();if(B){const{indexDocumentChunks:J}=await Promise.resolve().then(()=>Ve);J({DB:n,AI:p.ai,VECTORIZE:p.vectorize},s,B.id,O).catch(()=>{})}}}catch{}return`Document: ${v}

${O}`}else{const C=await N.text();return`Could not parse ${v} via Anthropic API: ${C.substring(0,200)}`}}catch(N){return`Image parsing error for ${v}: ${N.message}`}}try{const k=Buffer.from(S,"base64").toString("utf-8").substring(0,2e3);return`Document: ${v} (${b})

Content preview:
${k}`}catch{return`Cannot read file: ${v} (${b})`}}case"search_library":{const m=t.query,E=Math.min(typeof t.limit=="number"?t.limit:10,20);if(!m)return"query is required for search_library.";if(p!=null&&p.ai&&(p!=null&&p.vectorize))try{const{semanticDocumentSearch:k}=await Promise.resolve().then(()=>Ve),R=await k({DB:n,AI:p.ai,VECTORIZE:p.vectorize},s,m,E);if(R.length>0){const A=R.map(N=>`[id:${N.document_id}] "${N.filename}" (relevance: ${(N.relevance_score*100).toFixed(1)}%)
  Snippet: ${N.chunk.substring(0,350)}`).join(`

`);return`Found ${R.length} semantically relevant document(s) for "${m}":

${A}

Use read_library_file with the id to get the full document text.`}}catch{}const h=await n.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, dl.extracted_text as dl_extracted
        FROM document_library dl
        WHERE dl.user_id = ?
          AND (dl.name LIKE ? OR dl.summary LIKE ? OR dl.extracted_text LIKE ?)
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(s,`%${m}%`,`%${m}%`,`%${m}%`,E).all(),v=await n.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, uf.extracted_text as dl_extracted
        FROM document_library dl
        JOIN uploaded_files uf ON dl.file_id = uf.id
        WHERE dl.user_id = ? AND uf.user_id = ?
          AND uf.extracted_text LIKE ?
          AND dl.id NOT IN (SELECT id FROM document_library WHERE user_id = ? AND (name LIKE ? OR summary LIKE ? OR extracted_text LIKE ?))
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(s,s,`%${m}%`,s,`%${m}%`,`%${m}%`,`%${m}%`,E).all(),b=[...h.results||[],...v.results||[]].slice(0,E);if(b.length===0)return`No documents found matching "${m}" in your library.`;const S=b.map(k=>{const R=(k.summary||k.dl_extracted||"").substring(0,200);return`[id:${k.id}] "${k.name}" (source: ${k.source}, status: ${k.status})
  Preview: ${R||"(no preview yet — summarize or ask Karna to read it)"}`}).join(`

`);return`Found ${b.length} document(s) matching "${m}":

${S}

Use read_library_file with the id to get full text.`}case"read_library_file":{const m=String(t.id_or_name||"").trim();if(!m)return"id_or_name is required for read_library_file.";const E=parseInt(m,10);let h=null;if(isNaN(E)||(h=await n.prepare(`SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.id = ? AND dl.user_id = ?`).bind(E,s).first()),h||(h=await n.prepare(`SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.user_id = ? AND dl.name LIKE ? LIMIT 1`).bind(s,`%${m}%`).first()),!h)return`Document "${m}" not found. Use search_library to find available documents.`;let v=h.extracted_text||null;if(!v&&h.file_id){const b=await n.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(h.file_id,s).first();v=(b==null?void 0:b.extracted_text)||null}return v||(v=h.summary||null),v?`Document: ${h.name}

${v.substring(0,2e4)}`:`Document "${h.name}" has no extracted text yet. Ask Karna to parse it with parse_document(file_id="${h.file_id}") to extract the text first.`}case"create_skill":{const m=(Z=t.name)==null?void 0:Z.trim(),E=(te=t.description)==null?void 0:te.trim(),h=(oe=t.instructions)==null?void 0:oe.trim();if(!m||!E||!h)return"create_skill requires name, description, and instructions.";let v=m.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"");v||(v=`skill_${Date.now()}`);const b=await n.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(s,`${v}%`).all();(re=b.results)!=null&&re.some(A=>A.slug===v)&&(v=`${v}_${(((he=b.results)==null?void 0:he.length)||0)+1}`);const S=JSON.stringify(t.parameters||{}),k=JSON.stringify(t.required_tools||[]),R=JSON.stringify(t.examples||[]);return await n.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(s,m,v,E,h,S,k,R).run(),`Skill created: **${m}** (invoke as: "${v}")

You can now ask me to run "${m}" at any time. The skill will appear in Settings → Skills. You can also say "run my ${m} skill" to execute it.`}case"list_skills":{const E=t.include_disabled===!0?"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? ORDER BY created_at DESC":"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC",v=(await n.prepare(E).bind(s).all()).results||[];if(v.length===0)return`You haven't created any custom skills yet. Ask me to create one: "Create a skill that..."`;const b=v.map(S=>`• **${S.name}** (${S.slug}): ${S.description} [used ${S.usage_count} times${S.enabled?"":" — disabled"}]`).join(`
`);return`Your custom skills (${v.length}):

${b}`}default:{const m=e,E=await n.prepare("SELECT id, name, description, instructions, required_tools FROM user_skills WHERE user_id = ? AND slug = ? AND enabled = 1").bind(s,m).first();if(E){await n.prepare("UPDATE user_skills SET usage_count = usage_count + 1, last_used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(E.id).run();const h=(()=>{try{return JSON.parse(E.required_tools).join(", ")}catch{return""}})(),v=Object.keys(t).length>0?`

Inputs provided: ${JSON.stringify(t)}`:"";return`[SKILL: ${E.name}] Follow these instructions exactly:

${E.instructions}${v}

${h?`Tools to use: ${h}`:""}

Execute the steps above using your available tools. When complete, provide a clear summary of what was done and any results.`}return`Unknown tool: ${e}`}}}async function ea(e,t,n,s,r){if(t.length>0&&t[t.length-1].role==="user"){const a="(Previous request did not complete. Please try again.)";await e.storeMessage(n,s,"assistant",a,"{}",r),t.push({id:-1,user_id:n,channel:s,role:"assistant",content:a,metadata:"{}",token_estimate:a.length,created_at:new Date().toISOString()})}}function ta(e){for(let t=e.length-1;t>=0;t--)if(e[t].role==="assistant"){const n=typeof e[t].content=="string"?e[t].content:"";n.length<300&&/^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(n.trim())&&(e[t]={...e[t],content:"(My previous response was cut off before completing. Starting fresh.)"});break}}async function _s(e,t,n,s,r,a,i){var oe,re,he,m,E;const o=new Q(t),l=(oe=e.metadata)==null?void 0:oe.thread_id,c=Date.now(),[d,u,p,y]=await Promise.all([o.buildContext(s.id),Pn(t,s.id),es(t,s.id),Wr(t,s.id)]),g=await o.getRecentConversations(s.id,30,l);await ea(o,g,s.id,e.channel,l);const f=Vr(s,d,e.channel,p,y,u),w=Zn(g),_=Xn([{role:"system",content:f},...Vn(g),{role:"user",content:e.text}]);Jr(_,w),ta(_);const T=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],x=(d.match(/^- /gm)||[]).length;if(T.some(h=>h.test(e.text))||x<3)try{const h=await o.searchLongTerm(s.id,e.text,5);if(h.length>0){const v=h.map(b=>`- [${b.type}] ${b.title}: ${b.content}`).join(`
`);_.splice(_.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${v}]`})}}catch{}await o.storeMessage(s.id,e.channel,"user",e.text,"{}",l);const I=(i==null?void 0:i.maxTurns)??10,M=(i==null?void 0:i.tools)??await Qn(t,s.id);let j="",z=0;const W=[];let ne,P=0,Y=0;const q={hasActiveTask:!1,persistSession:!1,threadId:l,channel:e.channel};for(let h=0;h<I;h++){P=h+1;try{h>0&&Qr(_);const v=await n.chat(_,{tools:M,toolChoice:h===0&&(i!=null&&i.forceToolUseOnFirstTurn)?"required":void 0});if(v.usage&&(z+=v.usage.promptTokens+v.usage.completionTokens),v.toolCalls&&v.toolCalls.length>0){const b=v.content||"(tools executed)";_.push({role:"assistant",content:b});for(const k of v.toolCalls)W.push(k.name);const S=await Promise.all(v.toolCalls.map(async k=>{try{const R=await Ht(k.name,k.arguments,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE},q);ne=Yr(k.name,k.arguments,R,ne);const A=["parse_document","drive_read_file","read_library_file"].includes(k.name)?2e4:k.name==="research"?16e3:8e3,N=R.length>A?R.substring(0,A)+`
[...result truncated to prevent token limit — full content was extracted]`:R;return`[Tool Result for ${k.name}]: ${N}`}catch(R){return Y++,await H(t,s.id,"tool",k.name,R.message||"Tool execution failed"),`[Tool Error for ${k.name}]: ${R.message||"Execution failed"}`}}));_.push({role:"user",content:S.join(`

`)});continue}j=v.content;break}catch(v){if(r){const b=v.message||"",S=b.includes("401")||b.includes("403")||b.includes("authentication")||b.includes("credit balance"),k=b.includes("429"),R=S?1440:k?10:5;await r.recordError(n.name,b,R)}throw await H(t,s.id,"llm","provider_error",v.message||"Unknown LLM error",{provider:n.name,turn:h}),v}}if(j=(j==null?void 0:j.trim())??"",!j)try{((re=_[_.length-1])==null?void 0:re.role)==="user"&&_.push({role:"assistant",content:"[gathering results]"}),_.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),j=(await n.chat(_,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me directly and I will answer from my knowledge."}catch{j="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge."}if(r&&z>0)try{await r.recordUsage(n.name,z)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,n.name,"full",z,Date.now()-c,1,e.channel).run()}catch{}const Z=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your|the)\s+(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc|(saved|stored)\s+(it\s+|the\s+essay\s+|the\s+article\s+)?(to|in|on)\s+(your\s+)?(google\s+)?drive|essay\s+(is\s+)?(saved|stored)\s+(in|on|to)\s+(drive|google\s+docs?))\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created or saved a Google Document but create_doc was never called. You MUST call create_doc NOW with the full content in the content parameter.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const h of Z){const v=h.claimPattern.test(j),b=h.requiredTools.some(S=>W.includes(S));if(v&&!b){try{await H(t,s.id,"llm",h.logType,"LLM claimed action without tool call",{response:j.substring(0,200)}),_.push({role:"assistant",content:j}),_.push({role:"user",content:h.enforcementMsg});const S=await n.chat(_,{tools:M.filter(k=>h.requiredTools.includes(k.name)),temperature:0});if((he=S.toolCalls)!=null&&he.length){for(const R of S.toolCalls){const A=await Ht(R.name,R.arguments,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE});W.push(R.name),_.push({role:"assistant",content:"",toolCalls:S.toolCalls}),_.push({role:"user",content:A})}const k=await n.chat(_,{tools:[]});k.content&&(j=k.content)}else j="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}let te=j.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim();if(!te&&W.length>0){const h=[...new Set(W)].join(", ");try{((m=_[_.length-1])==null?void 0:m.role)==="user"&&_.push({role:"assistant",content:"[completed tools]"}),_.push({role:"user",content:"Please summarise what you just did and provide the result to the user."}),te=((E=(await n.chat(_,{tools:[]})).content)==null?void 0:E.trim())||`Done. I used the following tools: ${h}.`}catch{te=`Done. I used the following tools: ${h}.`}}await o.storeMessage(s.id,e.channel,"assistant",Ut(te),zr(W,ne),l);try{const h=await t.prepare("SELECT COUNT(*) as c FROM conversations WHERE user_id = ? AND role = ?").bind(s.id,"assistant").first();h&&h.c%5===0&&h.c>0&&await Promise.race([zo(t,n,s,o,_),new Promise(v=>setTimeout(v,5e3))])}catch{}return W.length>=3&&Promise.race([Fr(t,n,s,e.text,W,P,Y===0),new Promise(h=>setTimeout(h,6e3))]).catch(()=>{}),q.sessionId&&q.apiKey&&!q.hasActiveTask&&!q.persistSession&&mn(q.sessionId,q.apiKey).catch(()=>{}),te}async function zo(e,t,n,s,r){var d;const a=r.filter(u=>u.role!=="system").slice(-10);if(a.length<4)return;const o=[{role:"system",content:`Review this conversation and extract any information worth remembering long-term.
Only extract genuinely durable information — things that will still be relevant in future conversations.
Good examples: addresses, phone numbers, account IDs, spreadsheet IDs, document links, explicit preferences, recurring needs, key decisions.
Bad examples: temporary topics, one-off requests, information already in the system prompt.

For each item, output a line: TYPE|TITLE|CONTENT|IMPORTANCE
Types: fact, preference, context, decision
Importance: 1-10 (8+ = standing rules, 5-7 = regular facts)
If nothing worth extracting, output: NONE`},...a,{role:"user",content:"Extract durable information from the above conversation."}],c=((d=(await t.chat(o,{tools:[]})).content)==null?void 0:d.trim())||"";if(!(!c||c==="NONE"))for(const u of c.split(`
`)){const p=u.trim().split("|");if(p.length<4)continue;const[y,g,f,w]=p,_=["fact","preference","context","decision","summary","task"].find(x=>x===y.trim().toLowerCase());if(!_||!(g!=null&&g.trim())||!(f!=null&&f.trim()))continue;const T=Math.min(10,Math.max(1,parseInt(w)||5));await s.store(n.id,_,g.trim(),f.trim(),T,"long_term")}}const bs={"claude-opus-4-8":1e6,"claude-sonnet-4-6":1e6,"claude-haiku-4-5":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function Ko(e){for(const[t,n]of Object.entries(bs))if(e.toLowerCase().includes(t.toLowerCase()))return n;return bs.default}function Yo(e,t,n,s){const r=Ko(s),a=Math.floor(r*.75),i=[];let o=0,l=!1;const c=Tn(e);i.push({role:"system",content:e}),o+=c;const d=Tn(n);o+=d;const u=a-o,p=[];let y=0;for(let g=t.length-1;g>=0;g--){const f=t[g],w=Tn(f.content);if(y+w<=u)p.unshift({role:f.role,content:f.content}),y+=w;else{l=!0;break}}return i.push(...p),i.push({role:"user",content:n}),o+=y,{maxTokens:r,usedTokens:o,messages:i,wasTruncated:l}}async function*Jo(e,t,n,s,r,a){var he,m,E;const i=new Q(t),o=(he=e.metadata)==null?void 0:he.thread_id,l=Date.now();yield{type:"thinking",data:{threadId:o,provider:n.name}};const[c,d,u,p]=await Promise.all([i.buildContext(s.id),Pn(t,s.id),es(t,s.id),Wr(t,s.id)]),y=await i.getRecentConversations(s.id,30,o);await ea(i,y,s.id,e.channel,o);const g=Vr(s,c,e.channel,u,p,d),f=Zn(y),w=Xn([...Vn(y)]);let _=e.text;f&&(_=`${Cn}

${e.text}`);const T=Yo(g,w.map(h=>({role:h.role,content:h.content})),_,n.name);await i.storeMessage(s.id,e.channel,"user",e.text,"{}",o);const x=await Qn(t,s.id),L=10;let I="",M=0;const j=[...T.messages],z=[];let W,ne=0,P=0;const Y={hasActiveTask:!1,persistSession:!1,threadId:o,channel:e.channel},q=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],Z=(c.match(/^- /gm)||[]).length;if(q.some(h=>h.test(e.text))||Z<3||f)try{const h=await i.searchLongTerm(s.id,e.text,5);if(h.length>0){const v=h.map(b=>`- [${b.type}] ${b.title}: ${b.content}`).join(`
`);j.splice(j.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${v}]`})}}catch{}ta(j);const oe=()=>zr(z,W);for(let h=0;h<L;h++){ne=h+1;try{h>0&&(yield{type:"thinking",data:{threadId:o}},Qr(j));const v=await n.chat(j,{tools:x});if(v.usage&&(M+=v.usage.promptTokens+v.usage.completionTokens),v.toolCalls&&v.toolCalls.length>0){const k=((m=v.content)==null?void 0:m.trim())??"";k&&k.length<=150&&!/^\[calling:/i.test(k)&&(yield{type:"chunk",data:{text:v.content,threadId:o}});const R=v.content||"(tools executed)";j.push({role:"assistant",content:R});const A=[];for(const N of v.toolCalls){yield{type:"tool_start",data:{tool:N.name,toolArgs:N.arguments,threadId:o}},z.push(N.name);try{const C=(X,K)=>Ht(X,K,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE},Y);let O;if(N.name==="research"&&(yield{type:"research_ack",data:{message:(N.arguments.depth||"quick")==="thorough"?"Starting deep research with Opus 4.8 — planning queries, reading sources, and identifying gaps. This takes 2-4 minutes and uses ~3 Opus API calls.":"Researching with Opus 4.8... (45–90 seconds)",threadId:o}}),N.name==="browser_task"||N.name==="browser_task_status"){if(N.name==="browser_task"){const le=N.arguments.site_name;yield{type:"browser_ack",data:{message:le?`Starting now — opening ${le} in a browser. I'll notify you when done.`:"Starting now — running browser task. I'll notify you when done.",startedAt:new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:s.timezone||"UTC"}),threadId:o}}}const K=["Still working — browser launched, navigating to site...","Still working — page loaded, scanning for content...","Still working — reading and extracting results...","Still working — almost there, finalising output...","Taking a bit longer — site may require extra steps...","Still running — browser is working through the page...","Continuing — extracting and processing data...","Still going — complex task, nearly there...","Almost done — wrapping up the browser session...","Still running — holding on a little longer...","Browser is still active — this one is taking time...","Patience — still working through the task...","Still running — will have a result for you shortly..."],ie=C(N.name,N.arguments);let de=0;e:for(;;){const le=await Promise.race([ie.then(ge=>({done:!0,r:ge})),new Promise(ge=>setTimeout(()=>ge({done:!1}),15e3))]);if(le.done){O=le.r;break e}N.name==="browser_task"?yield{type:"browser_progress",data:{message:K[Math.min(de,K.length-1)],elapsed_s:(de+1)*15,threadId:o}}:yield{type:"thinking",data:{threadId:o}},de++}if(N.name==="browser_task"){const le=O.match(/^\[BROWSER_TIMEOUT:([^\]]+)\]/);if(le){yield{type:"browser_progress",data:{message:"Task still running — checking final status...",threadId:o}};const ge=C("browser_task_status",{task_id:le[1]});e:for(;;){const De=await Promise.race([ge.then(Te=>({done:!0,r:Te})),new Promise(Te=>setTimeout(()=>Te({done:!1}),15e3))]);if(De.done){O=De.r;break e}yield{type:"thinking",data:{threadId:o}}}if(!O.startsWith("[still-running]")&&!O.startsWith("[NO-OUTPUT]")&&!O.startsWith("Browser"))try{await t.prepare("DELETE FROM pending_browser_tasks WHERE user_id = ? AND task_id = ? AND notified = 0").bind(s.id,le[1]).run()}catch{}}}}else if(N.name==="research"){const ie=(N.arguments.depth||"quick")==="thorough"?["Still researching — planning sub-queries...","Still researching — fetching sources...","Still researching — reading pages...","Still researching — identifying gaps...","Still researching — running gap searches...","Still researching — synthesising findings...","Almost done — writing final report...","Wrapping up — almost there..."]:["Still researching — fetching sources...","Still researching — reading pages...","Almost done — synthesising findings..."],de=C(N.name,N.arguments);let le=0;e:for(;;){const ge=await Promise.race([de.then(Te=>({done:!0,r:Te})),new Promise(Te=>setTimeout(()=>Te({done:!1}),2e4))]);if(ge.done){O=ge.r;break e}yield{type:"research_progress",data:{message:ie[Math.min(le,ie.length-1)],elapsed_s:(le+1)*20,threadId:o}},le++}}else O=await C(N.name,N.arguments);let $=O;(N.name==="browser_task"||N.name==="browser_task_status")&&(/^\[BROWSER_TIMEOUT:/.test($)?$="Task timed out — still running in background.":/^\[NO-OUTPUT\]/.test($)?$="Browser task finished but returned no content.":/^\[still-running\]/.test($)?$="Still running — will notify when done.":$=$.replace(/\s*\|\s*Operator hint:.*$/s,"")),yield{type:"tool_end",data:{tool:N.name,toolResult:$.substring(0,500)+($.length>500?"...":""),threadId:o}};const B=["parse_document","drive_read_file","read_library_file"].includes(N.name)?2e4:N.name==="research"?16e3:8e3,J=O.length>B?O.substring(0,B)+`
[...result truncated to prevent token limit — full content was extracted]`:O;W=Yr(N.name,N.arguments,O,W),A.push(`[Tool Result for ${N.name}]: ${J}`)}catch(C){P++,await H(t,s.id,"tool",N.name,C.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:N.name,toolResult:`Error: ${C.message||"Execution failed"}`,threadId:o}},A.push(`[Tool Error for ${N.name}]: ${C.message||"Execution failed"}`)}}j.push({role:"user",content:A.join(`

`)});continue}I=v.content;const b=Ut(I);await i.storeMessage(s.id,e.channel,"assistant",b,oe(),o);const S=50;for(let k=0;k<b.length;k+=S)yield{type:"chunk",data:{text:b.substring(k,k+S),threadId:o}},k+S<b.length&&await new Promise(A=>setTimeout(A,10));break}catch(v){if(r){const k=v.message||"",R=k.includes("401")||k.includes("403")||k.includes("authentication")||k.includes("credit balance"),A=k.includes("429"),N=R?1440:A?10:5;await r.recordError(n.name,k,N)}await H(t,s.id,"llm","provider_error",v.message||"Unknown LLM error",{provider:n.name,turn:h});const b=v.message||"An error occurred",S=b.includes("429")||b.toLowerCase().includes("rate limit")||b.toLowerCase().includes("too many requests")?"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.":b;try{await i.storeMessage(s.id,e.channel,"assistant",`⚠️ ${S}`,"{}",o)}catch{}yield{type:"error",data:{error:S,threadId:o}};return}}if(I=(I==null?void 0:I.trim())??"",!I)try{j.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),I=(await n.chat(j,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me to answer directly from my knowledge.";const v=Ut(I);await i.storeMessage(s.id,e.channel,"assistant",v,oe(),o);const b=50;for(let S=0;S<v.length;S+=b)yield{type:"chunk",data:{text:v.substring(S,S+b),threadId:o}},S+b<v.length&&await new Promise(k=>setTimeout(k,10))}catch{I="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.",await i.storeMessage(s.id,e.channel,"assistant",I,oe(),o).catch(()=>{}),yield{type:"chunk",data:{text:I,threadId:o}}}if(r&&M>0)try{await r.recordUsage(n.name,M)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,n.name,"full",M,Date.now()-l,1,e.channel).run()}catch{}const re=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your\s+|the\s+)(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc|(saved|stored)\s+(it\s+|the\s+essay\s+|the\s+article\s+)?(to|in|on)\s+(your\s+)?(google\s+)?drive|essay\s+(is\s+)?(saved|stored)\s+(in|on|to)\s+(drive|google\s+docs?))\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created or saved a Google Document but create_doc was never called. You MUST call create_doc NOW with the full content in the content parameter.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const h of re){const v=h.claimPattern.test(I),b=h.requiredTools.some(S=>z.includes(S));if(v&&!b){try{await H(t,s.id,"llm",h.logType,"LLM claimed action without tool call (streaming)",{response:I.substring(0,200)}),j.push({role:"assistant",content:I}),j.push({role:"user",content:h.enforcementMsg});const S=await n.chat(j,{tools:x.filter(k=>h.requiredTools.includes(k.name)),temperature:0});if((E=S.toolCalls)!=null&&E.length){for(const R of S.toolCalls){const A=await Ht(R.name,R.arguments,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE});z.push(R.name),j.push({role:"assistant",content:"",toolCalls:S.toolCalls}),j.push({role:"user",content:A})}const k=await n.chat(j,{tools:[]});k.content&&(I=k.content)}else I="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}z.length>=3&&Promise.race([Fr(t,n,s,e.text,z,ne,P===0),new Promise(h=>setTimeout(h,6e3))]).catch(()=>{}),Y.sessionId&&Y.apiKey&&!Y.hasActiveTask&&!Y.persistSession&&mn(Y.sessionId,Y.apiKey).catch(()=>{}),yield{type:"done",data:{threadId:o,provider:n.name,tokenCount:M}}}async function An(e,t,n,s,r,a,i,o){await a.storeMessage(r.id,t.channel,"user",t.text,"{}",o);const l=await Ht(e.tool,e.args,n,r.id,{agentType:"direct",channel:t.channel},r.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,r.timezone,s,i==null?void 0:i.DOCUMENTS_BUCKET,{ai:i==null?void 0:i.AI,vectorize:i==null?void 0:i.VECTORIZE}),c=`[TOOLS_USED: ${e.tool}] ${l}`.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"");return await a.storeMessage(r.id,t.channel,"assistant",c,"{}",o),l}async function ts(e,t,n,s,r,a){var f;const i=new Q(t),o=(f=e.metadata)==null?void 0:f.thread_id,l=await i.buildContext(s.id),c=await i.getRecentConversations(s.id,6,o),d=Wn(e.text,l,Kr(c));if(d.agent==="conversation")return na(e,t,n,s,l,r,o);const u=Gn(e.text);if(u)return An(u,e,t,n,s,i,a,o);const p=(await i.getRecentConversations(s.id,10,o)).map(w=>w.content).join(`
`),y=zn(e.text,p);if(y)return An(y,e,t,n,s,i,a,o);const g=d.confidence>=.85;if(e.channel==="telegram"){const w=await Qn(t,s.id);return _s(e,t,n,s,r,a,{maxTurns:10,tools:w,forceToolUseOnFirstTurn:g})}return _s(e,t,n,s,r,a,{forceToolUseOnFirstTurn:g})}async function na(e,t,n,s,r,a,i){const o=new Q(t),l=Date.now(),c=Zr(s.timezone),d=await es(t,s.id),u=d?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. Do not store copies in memory or contradict them.
${d}

${r}`:r,p=Pr("conversation",s,u,s.timezone,c,e.channel),y=(await o.getRecentConversations(s.id,30,i)).filter(x=>!x.content.startsWith("[Autonomous Scheduled Task]")&&!x.content.startsWith("[Scheduled Reminder]")),g=Zn(y),f=Xn([{role:"system",content:p},...Vn(y),{role:"user",content:e.text}]);Jr(f,g),await o.storeMessage(s.id,e.channel,"user",e.text,"{}",i);let w=0,_="";try{const x=await n.chat(f,{temperature:.8});x.usage&&(w=x.usage.promptTokens+x.usage.completionTokens),_=x.content}catch(x){if(a){const L=x.message||"",I=L.includes("401")||L.includes("403")||L.includes("authentication")||L.includes("credit balance"),M=L.includes("429"),j=I?1440:M?10:5;await a.recordError(n.name,L,j)}throw await H(t,s.id,"llm","conversation_error",x.message,{provider:n.name}),x}if(a&&w>0)try{await a.recordUsage(n.name,w)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,n.name,"conversation",w,Date.now()-l,1,e.channel).run()}catch{}const T=Ut(_);return await o.storeMessage(s.id,e.channel,"assistant",T,"{}",i),T}async function*Es(e,t,n,s,r,a,i,o){yield{type:"tool_start",data:{tool:e.tool,toolArgs:e.args,threadId:o}};const l=await An(e,t,n,s,r,a,i,o);yield{type:"tool_end",data:{tool:e.tool,toolResult:l.substring(0,500)+(l.length>500?"...":""),threadId:o}};const c=Ut(l),d=50;for(let u=0;u<c.length;u+=d)yield{type:"chunk",data:{text:c.substring(u,u+d),threadId:o}},u+d<c.length&&await new Promise(p=>setTimeout(p,10));yield{type:"done",data:{threadId:o,provider:s.name,tokenCount:0}}}async function*Vo(e,t,n,s,r,a){var u;const i=new Q(t),o=(u=e.metadata)==null?void 0:u.thread_id,l=await i.buildContext(s.id),c=await i.getRecentConversations(s.id,6,o),d=Wn(e.text,l,Kr(c));if(yield{type:"thinking",data:{threadId:o,provider:n.name}},d.agent!=="conversation"){const p=Gn(e.text);if(p){yield*Es(p,e,t,n,s,i,a,o);return}const y=(await i.getRecentConversations(s.id,10,o)).map(f=>f.content).join(`
`),g=zn(e.text,y);if(g){yield*Es(g,e,t,n,s,i,a,o);return}yield*Jo(e,t,n,s,r,a);return}try{const p=await na(e,t,n,s,l,r,o),y=50;for(let g=0;g<p.length;g+=y)yield{type:"chunk",data:{text:p.substring(g,g+y),threadId:o}},g+y<p.length&&await new Promise(f=>setTimeout(f,10))}catch(p){yield{type:"error",data:{error:p.message||"An error occurred",threadId:o}};return}yield{type:"done",data:{threadId:o,provider:n.name,tokenCount:0}}}const ce=new be;async function Zo(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}ce.use("/*",Zo);ce.get("/threads",async e=>{const t=e.get("user"),n=e.req.query("archived")==="1",s=parseInt(e.req.query("limit")||"30"),r=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
      ORDER BY t.is_pinned DESC, t.updated_at DESC
      LIMIT ?`).bind(t.id,n?1:0,s).all();return e.json({threads:r.results||[]})});ce.post("/threads",async e=>{const t=e.get("user"),{title:n}=await e.req.json(),s=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n||"New conversation").first();return e.json({thread:s})});ce.put("/threads/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json(),r=[],a=[];return s.title!==void 0&&(r.push("title = ?"),a.push(s.title)),s.is_archived!==void 0&&(r.push("is_archived = ?"),a.push(s.is_archived?1:0)),s.is_pinned!==void 0&&(r.push("is_pinned = ?"),a.push(s.is_pinned?1:0)),r.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),r.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});ce.delete("/threads/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ce.post("/upload",async e=>{const t=e.get("user"),n=!!e.env.DOCUMENTS_BUCKET,s=n?100*1024*1024:700*1024;let r,a,i,o=null,l=null;try{if((e.req.header("Content-Type")||"").includes("multipart/form-data")){const w=(await e.req.formData()).get("file");if(!w)return e.json({error:"No file provided."},400);if(r=w.name,a=w.type||"application/octet-stream",i=w.size,i>s)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);o=await w.arrayBuffer()}else{const f=await e.req.json();if(!f.file_name||!f.file_data)return e.json({error:"file_name and file_data are required."},400);if(r=f.file_name,a=f.file_type||"application/octet-stream",l=f.file_data,i=f.file_size||Math.round(l.length*.75),i>s)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);if(n){const w=atob(l);o=new ArrayBuffer(w.length);const _=new Uint8Array(o);for(let T=0;T<w.length;T++)_[T]=w.charCodeAt(T)}}const d=crypto.randomUUID();let u;n&&o?(await e.env.DOCUMENTS_BUCKET.put(d,o,{httpMetadata:{contentType:a},customMetadata:{fileName:r,userId:String(t.id)}}),u="r2"):u=l||(o?Buffer.from(o).toString("base64"):""),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(d,t.id,r,a,u,i).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,d,"upload",r,a,i,"uploaded").run();const p=a==="application/pdf"||r.toLowerCase().endsWith(".pdf"),y=a==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||r.toLowerCase().endsWith(".docx");if(y)try{const{extractDocxTextFromBuffer:f}=await Promise.resolve().then(()=>$r),w=l?Buffer.from(l,"base64"):o?Buffer.from(o):null;if(w){const _=await f(w);if(_.length>50){await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(_,d).run();const T=_.substring(0,600);await e.env.DB.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(T,_.substring(0,5e4),d,t.id).run()}}}catch{}if(p&&t.pin_hash){const f=l||(o?Buffer.from(o).toString("base64"):null),w=t.pin_hash,_=t.id,T=e.env.DB,x=e.env.DOCUMENTS_BUCKET,L=(async()=>{var I,M;try{let j=null,z="claude-sonnet-4-6";const{decrypt:W}=await Promise.resolve().then(()=>Yt);for(const Z of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const te=await T.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(_,Z).first();if(te){const oe=await W(te.encrypted_value,w),re=JSON.parse(oe);if(re.provider==="anthropic"){j=re.apiKey,re.model&&(z=re.model);break}}}catch{}if(!j)return;let ne;if(u==="r2"&&x){const Z=await x.get(d);if(!Z)return;ne=Buffer.from(await Z.arrayBuffer()).toString("base64")}else if(f)ne=f;else return;const P=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":j,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:z,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:ne}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!P.ok)return;const q=((M=(I=(await P.json()).content)==null?void 0:I[0])==null?void 0:M.text)||"";if(q){await T.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(q,d).run();const Z=q.substring(0,600);await T.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(Z,q.substring(0,5e4),d,_).run()}}catch{}})();try{e.executionCtx.waitUntil(L)}catch{}}let g="";if(a.startsWith("text/"))try{const f=l||(o?Buffer.from(o).toString("base64"):"");g=Buffer.from(f,"base64").toString("utf-8").substring(0,500)}catch{}return e.json({file_id:d,name:r,type:a,size:i,text_preview:g,storage:n?"r2":"d1",extracting:p&&!y})}catch(c){console.error("File upload error:",c);try{const{logError:d}=await Promise.resolve().then(()=>bt);await d(e.env.DB,t.id,"upload","upload_error",c.message||"Unknown upload error")}catch{}return e.json({error:`Upload failed: ${c.message||"Unknown error"}`},500)}});ce.post("/send",async e=>{const t=e.get("user"),{message:n,channel:s="web",thread_id:r,files:a}=await e.req.json();if(!n||typeof n!="string"||n.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(a&&Array.isArray(a)&&a.length>0){i=`

[Attached files:
`;for(const c of a)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=r;if(!o){const c=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n.trim().substring(0,60)+(n.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:t.id,username:t.username,channel:s,text:n.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await Qe(e.env.DB,t.id,t.pin_hash),u=await ts(l,e.env.DB,c,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});return!r&&o?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run():o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),e.json({response:u,timestamp:new Date().toISOString(),channel:l.channel,provider:c.name,thread_id:o})}catch(c){console.error("Chat error:",c);const d=c.message||"";if(d.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400);if(d.includes("All LLM providers failed"))return e.json({error:d,type:"no_provider",thread_id:o},400);if(d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests"))return e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429);const u=d.includes("401")||d.includes("403")||d.includes("authentication")||d.includes("credit balance")||d.includes("invalid")&&d.includes("key");try{const{logError:p}=await Promise.resolve().then(()=>bt);await p(e.env.DB,t.id,"llm","chat_error",d)}catch{}return e.json({error:u?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:d,type:u?"no_provider":void 0,thread_id:o},u?400:500)}});function Ts(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}ce.post("/stream",async e=>{const t=e.get("user"),{message:n,channel:s="web",thread_id:r,files:a}=await e.req.json();if(!n||typeof n!="string"||n.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(a&&Array.isArray(a)&&a.length>0){i=`

[Attached files:
`;for(const c of a)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=r;if(!o){const c=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n.trim().substring(0,60)+(n.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:t.id,username:t.username,channel:s,text:n.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await Qe(e.env.DB,t.id,t.pin_hash),u=new ReadableStream({async start(p){const y=new TextEncoder;try{const g=Vo(l,e.env.DB,c,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});for await(const f of g)f.data.threadId||(f.data.threadId=o),p.enqueue(y.encode(Ts(f)));o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),p.close()}catch(g){const f={type:"error",data:{error:g.message||"An error occurred",threadId:o}};p.enqueue(y.encode(Ts(f))),p.close()}}});return new Response(u,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(o||"")}})}catch(c){console.error("Stream setup error:",c);const d=c.message||"";return d.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400):d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests")?e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429):e.json({error:"Something went wrong setting up the stream.",details:d,thread_id:o},500)}});ce.get("/threads/:id/messages",async e=>{var a;const t=e.get("user"),n=parseInt(e.req.param("id")),s=parseInt(e.req.query("limit")||"50"),r=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,n,s).all();return e.json({messages:(r.results||[]).reverse(),total:((a=r.results)==null?void 0:a.length)||0})});ce.get("/history",async e=>{var l;const t=e.get("user"),n=parseInt(e.req.query("limit")||"50"),s=parseInt(e.req.query("offset")||"0"),r=e.req.query("thread_id");let a,i;r?(a=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,parseInt(r),n,s]):(a=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,n,s]);const o=await e.env.DB.prepare(a).bind(...i).all();return e.json({messages:(o.results||[]).reverse(),total:((l=o.results)==null?void 0:l.length)||0})});ce.delete("/history",async e=>{const t=e.get("user"),n=e.req.query("thread_id");return n?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(n)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});ce.get("/dashboard",async e=>{const t=e.get("user"),[n,s,r,a,i,o,l,c,d,u,p,y,g,f,w]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM user_skills WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM preferences WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval')").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND type='browser_task' AND status='running'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status='failed'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory_suggestions WHERE user_id = ? AND status='pending'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM document_library WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT id, name, mime_type, size, status, source, created_at FROM document_library WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT id, name, description, next_run FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND next_run BETWEEN datetime('now', 'start of day') AND datetime('now', '+1 day', 'start of day') LIMIT 5").bind(t.id).all().catch(()=>({results:[]}))]);return e.json({threads:(n==null?void 0:n.cnt)||0,active_schedules:(s==null?void 0:s.cnt)||0,memories:(r==null?void 0:r.cnt)||0,recent_threads:a.results||[],provider_usage:[],unread_notifications:(i==null?void 0:i.cnt)||0,errors:(o==null?void 0:o.cnt)||0,skills_count:(l==null?void 0:l.cnt)||0,preferences_count:(c==null?void 0:c.cnt)||0,pending_actions:(d==null?void 0:d.cnt)||0,running_browser_tasks:(u==null?void 0:u.cnt)||0,failed_actions:(p==null?void 0:p.cnt)||0,memory_suggestions:(y==null?void 0:y.cnt)||0,documents_count:(g==null?void 0:g.cnt)||0,recent_documents:f.results||[],todays_reminders:w.results||[]})});ce.get("/gmail/unread",async e=>{const t=e.get("user");try{const n=e.env.GOOGLE_CLIENT_ID,s=e.env.GOOGLE_CLIENT_SECRET;if(!n||!s)return e.json({count:null,reason:"google_not_configured"});const a=await new ke(e.env.DB,t.id,t.pin_hash,n,s).getUnreadCount();return e.json({count:a})}catch(n){return e.json({count:null,reason:n.message})}});ce.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));ce.get("/notifications/count",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(n==null?void 0:n.cnt)||0})});ce.get("/notifications",async e=>{const t=e.get("user"),n=parseInt(e.req.query("limit")||"20"),s=await e.env.DB.prepare(`SELECT n.id, n.type, n.title, n.body, n.is_read, n.source, n.action_url, n.created_at,
            j.schedule_type, j.schedule_value, j.enabled as cron_enabled
     FROM notifications n
     LEFT JOIN cron_jobs j
       ON n.user_id = j.user_id
       AND n.source LIKE 'cron:%'
       AND CAST(SUBSTR(n.source, 6) AS INTEGER) = j.id
     WHERE n.user_id = ? ORDER BY n.created_at DESC LIMIT ?`).bind(t.id,n).all();return e.json({notifications:s.results||[]})});ce.put("/notifications/:id/read",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ce.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});ce.delete("/notifications/all",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});ce.delete("/notifications/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ce.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const se=new be;async function Xo(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),await t()}se.use("/*",Xo);se.get("/profile",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(n==null?void 0:n.name)||t.name,personality_prompt:(n==null?void 0:n.personality_prompt)||t.personality_prompt,telegram_chat_id:(n==null?void 0:n.telegram_chat_id)||t.telegram_chat_id,timezone:(n==null?void 0:n.timezone)||t.timezone,assistant_name:(n==null?void 0:n.assistant_name)||"Karna"})});se.put("/profile",async e=>{const t=e.get("user"),n=await e.req.json(),s=["name","personality_prompt","telegram_chat_id","timezone","assistant_name"],r=[],a=[];for(const i of s)n[i]!==void 0&&(r.push(`${i} = ?`),a.push(n[i]));return r.length===0?e.json({error:"No valid fields to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),a.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${r.join(", ")} WHERE id = ?`).bind(...a).run(),e.json({success:!0}))});const Ln=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","tavily_api_key","ntfy_url","ntfy_token","browser_use_api_key"];se.get("/credentials",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT id, service, label, encrypted_value, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all(),s=["llm_slot_1","llm_slot_2","llm_slot_3"],r=await Promise.all((n.results||[]).map(async a=>{let i;if(s.includes(a.service))try{const o=await G(a.encrypted_value,t.pin_hash);i=JSON.parse(o).provider}catch{}return{id:a.id,service:a.service,label:a.label,created_at:a.created_at,updated_at:a.updated_at,configured:!0,...i?{provider_id:i}:{}}}));return e.json({credentials:r,available_services:Ln,llm_providers:jt})});function sa(e){const t=e.trim();return t&&!/^https?:\/\//i.test(t)?"https://"+t:t}se.put("/credentials",async e=>{const t=e.get("user"),n=await e.req.json(),{service:s,label:r}=n;let a=n.value;if(!s||!a)return e.json({error:"Service name and value are required"},400);if(!Ln.includes(s))return e.json({error:`Invalid service. Must be one of: ${Ln.join(", ")}`},400);s==="ntfy_url"&&(a=sa(a));const i=await Nt(a,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,s,r||s,i).run(),e.json({success:!0,service:s})});se.delete("/credentials/:service",async e=>{const t=e.get("user"),n=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,n).run(),e.json({success:!0})});se.get("/memory",async e=>{const t=e.get("user"),n=e.req.query("type"),r=await new Q(e.env.DB).getAll(t.id,n||void 0,100);return e.json({memories:r})});se.post("/memory",async e=>{const t=e.get("user"),{type:n,title:s,content:r,importance:a}=await e.req.json();return!n||!s||!r?e.json({error:"Type, title, and content are required"},400):(await new Q(e.env.DB).store(t.id,n,s,r,a||5),e.json({success:!0}))});se.delete("/memory/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new Q(e.env.DB).remove(n,t.id),e.json({success:!0})});se.get("/preferences",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT id, content, created_at FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t.id).all();return e.json({preferences:n.results||[]})});se.post("/preferences",async e=>{const t=e.get("user"),{content:n}=await e.req.json();return n!=null&&n.trim()?(await e.env.DB.prepare("INSERT INTO preferences (user_id, content) VALUES (?, ?)").bind(t.id,n.trim()).run(),e.json({success:!0})):e.json({error:"Content required"},400)});se.put("/preferences/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{content:s}=await e.req.json();return s!=null&&s.trim()?(await e.env.DB.prepare("UPDATE preferences SET content = ? WHERE id = ? AND user_id = ?").bind(s.trim(),n,t.id).run(),e.json({success:!0})):e.json({error:"Content required"},400)});se.delete("/preferences/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM preferences WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});se.get("/schedules",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:n.results||[]})});se.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{enabled:s}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s?1:0,n,t.id).run(),e.json({success:!0})});se.delete("/schedules/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});se.get("/errors",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:n.results||[]})});se.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});se.post("/credentials/validate",async e=>{const t=e.get("user"),{service:n,value:s}=await e.req.json();if(!n)return e.json({error:"Service required"},400);let r=s;if(!r){const a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,n).first();if(!a)return e.json({valid:!1,message:"No credential saved for this slot."});try{r=await G(a.encrypted_value,t.pin_hash)}catch{return e.json({valid:!1,message:"Failed to decrypt stored credential."})}}switch(n){case"anthropic":try{const a=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return a.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"openai":try{const a=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${r}`}});return a.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const a=JSON.parse(r);if(!a.provider||!a.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const i=jt[a.provider];if(!i)return e.json({valid:!1,message:`Unknown provider: ${a.provider}`});if(i.apiFormat==="anthropic"){const o=await fetch(i.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return o.ok?e.json({valid:!0,message:`${i.label} API key is valid.`}):o.status===401?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${o.status}.`})}else{const o=i.apiBase+(i.validatePath||"/v1/models"),l=await fetch(o,{headers:{Authorization:`Bearer ${a.apiKey}`}});if(l.ok)return e.json({valid:!0,message:`${i.label} API key is valid.`});if(l.status===401||l.status===403)return e.json({valid:!1,message:`Invalid ${i.label} API key.`});if(l.status===404)try{const c=await fetch(i.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.apiKey}`},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return c.ok||c.status===200?e.json({valid:!0,message:`${i.label} API key is valid.`}):c.status===401||c.status===403?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${c.status}.`})}catch(c){return e.json({valid:!1,message:`${i.label} chat test failed: ${c.message}`})}return e.json({valid:!1,message:`${i.label} responded with status ${l.status}.`})}}catch(a){return a instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});case"tavily_api_key":try{const a=await fetch("https://api.tavily.com/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:r,query:"test",max_results:1,search_depth:"basic"})});if(a.ok){const i=await a.json();if(Array.isArray(i.results))return e.json({valid:!0,message:"Tavily API key is valid."})}return a.status===401?e.json({valid:!1,message:"Invalid Tavily API key."}):e.json({valid:!1,message:`Tavily responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"ntfy_url":try{const a=sa(r);let i;try{const c=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,"ntfy_token").first();c&&(i=(await G(c.encrypted_value,t.pin_hash)).trim())}catch{}const o={Title:"Test",Priority:"3",Tags:"bell,karna","Content-Type":"text/plain"};i&&(o.Authorization=`Bearer ${i}`);const l=await fetch(a,{method:"POST",headers:o,body:"Karna connected ✓"});return l.ok?e.json({valid:!0,message:"Ntfy connected"}):e.json({valid:!1,message:`Ntfy responded with status ${l.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});se.post("/notify/test",async e=>{const t=e.get("user"),{sendNotification:n}=await Promise.resolve().then(()=>ra),s=await n(e.env.DB,t.id,"🔔 Karna Test Notification","If you see this on your phone, Ntfy is working correctly.",{pinHash:t.pin_hash,priority:"default",tags:["bell","karna"]});return e.json({channel:s.channel,error:s.error})});se.get("/google/status",async e=>{const t=e.get("user");try{const n=await Bn(e.env.DB,t.id,t.pin_hash),s=gr(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...n,oauth_client_configured:s})}catch(n){return e.json({connected:!1,error:n.message})}});se.get("/google/auth-url",async e=>{var t;e.get("user");try{const n=e.env.GOOGLE_CLIENT_ID,s=e.env.GOOGLE_CLIENT_SECRET;if(!n||!s)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const r=new URL(e.req.url);let a=`${r.protocol}//${r.host}`;const i=e.req.query("origin");if(i)try{const d=new URL(i);(d.protocol==="https:"||d.hostname==="localhost"||d.hostname==="127.0.0.1")&&(a=d.origin)}catch{}const o=`${a}/auth/google/callback`,l=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),c=mr(n,o,l);return e.json({auth_url:c,redirect_uri:o})}catch(n){return e.json({error:`Failed to generate auth URL: ${n.message}`},500)}});se.post("/google/disconnect",async e=>{const t=e.get("user");try{return await yr(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(n){return e.json({error:n.message},500)}});se.post("/google/test",async e=>{const t=e.get("user");try{const{token:n,email:s}=await Ot(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),r=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${n}`}}),a=!0,i=r.ok,o=await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile",{headers:{Authorization:`Bearer ${n}`}}),l=o.ok;return e.json({success:!0,email:s,scopes:{sheets:a,calendar:i,docs:a,drive:a,gmail:l},message:i&&l?`Connected as ${s} — all services working.`:`Connected as ${s} — ${l?`calendar access issue (${r.status}).`:`Gmail access issue (${o.status}). Reconnect to grant Gmail permissions.`}`})}catch(n){return e.json({success:!1,error:n.message})}});se.get("/site-vault",async e=>{const t=e.get("user");try{const n=await e.env.DB.prepare("SELECT id, name, created_at, updated_at FROM site_credentials WHERE user_id = ? ORDER BY name ASC").bind(t.id).all();return e.json({entries:n.results||[]})}catch{return e.json({entries:[]})}});se.put("/site-vault",async e=>{const t=e.get("user");try{const{name:n,username:s,password:r,notes:a}=await e.req.json();if(!(n!=null&&n.trim())||!(s!=null&&s.trim())||!(r!=null&&r.trim()))return e.json({error:"name, username, and password are required"},400);const i=JSON.stringify({username:s.trim(),password:r,...a?{notes:a}:{}}),o=await Nt(i,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO site_credentials (user_id, name, encrypted_blob)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, name) DO UPDATE SET
         encrypted_blob = excluded.encrypted_blob,
         updated_at = CURRENT_TIMESTAMP`).bind(t.id,n.trim(),o).run(),e.json({success:!0,name:n.trim()})}catch(n){return e.json({error:(n==null?void 0:n.message)||"Failed to save credential"},500)}});se.delete("/site-vault/:id",async e=>{const t=e.get("user");try{const n=Number(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM site_credentials WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})}catch(n){return e.json({error:(n==null?void 0:n.message)||"Failed to delete credential"},500)}});const Qo=15e3,el={urgent:"5",high:"4",default:"3",low:"2",min:"1"};async function We(e,t,n,s,r){try{await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source)
       VALUES (?, 'info', ?, ?, 'ntfy')`).bind(t,n,s).run()}catch(g){console.warn("[sendNotification] in-app insert failed:",t,g==null?void 0:g.message)}let a=r==null?void 0:r.pinHash;if(!a){const g=await e.prepare("SELECT pin_hash FROM users WHERE id = ?").bind(t).first();a=g==null?void 0:g.pin_hash}if(!a)return{sent:!0,channel:"in-app"};let i,o;try{const g=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"ntfy_url").first();if(g){const w=(await G(g.encrypted_value,a)).trim();i=/^https?:\/\//i.test(w)?w:`https://${w}`}const f=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"ntfy_token").first();f&&(o=(await G(f.encrypted_value,a)).trim())}catch(g){return console.warn("[sendNotification] credential decrypt failed:",t,g==null?void 0:g.message),{sent:!0,channel:"in-app"}}if(!i)return{sent:!0,channel:"in-app"};const l=el[(r==null?void 0:r.priority)||"default"]||"3",c=((r==null?void 0:r.tags)||["bell","karna"]).join(","),u={Title:n.replace(/[^\x00-\xff]/g,"").trim()||"Karna Notification",Priority:l,Tags:c,"Content-Type":"text/plain"};o&&(u.Authorization=`Bearer ${o}`);const p=new AbortController,y=setTimeout(()=>p.abort(),Qo);try{const g=await fetch(i,{method:"POST",headers:u,body:s,signal:p.signal});if(clearTimeout(y),!g.ok){const f=`HTTP ${g.status} from ${i}`;return console.warn(`[sendNotification] ntfy ${f} for user ${t} — check ntfy_url/ntfy_token credentials`),{sent:!0,channel:"ntfy-failed",error:f}}return{sent:!0,channel:"ntfy"}}catch(g){clearTimeout(y);const f=(g==null?void 0:g.message)||String(g);return console.warn(`[sendNotification] ntfy push failed for user ${t}: ${f}`),{sent:!0,channel:"ntfy-failed",error:f}}}const ra=Object.freeze(Object.defineProperty({__proto__:null,sendNotification:We},Symbol.toStringTag,{value:"Module"})),Ae=new be;Ae.get("/debug/time",e=>{const t=new Date,n=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return e.json({utc_iso:t.toISOString(),utc_ms:t.getTime(),formatted_ist:n.format(t),toLocaleString_ist:t.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});Ae.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const n=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:n,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});Ae.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const n=Date.now()-t;return e.json({status:"ok",latency_ms:n})}catch(t){return e.json({status:"error",error:t.message},500)}});Ae.get("/status",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=n.user_id,[r,a,i,o]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(s).first()]);return e.json({active_schedules:(r==null?void 0:r.cnt)||0,memory_entries:(a==null?void 0:a.cnt)||0,total_messages:(i==null?void 0:i.cnt)||0,unread_errors:(o==null?void 0:o.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});function Ss(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}Ae.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const s=new Date,r=s.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:r})).run()}catch{}const a=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone, u.pin_hash
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(r).all(),i=[];for(const o of a.results||[])try{await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(r,o.id).run();const l=o.user_timezone||"UTC";let c,d=!1,u=o.state||"active";if(o.schedule_type==="interval"){const g=parseInt(o.schedule_value,10);c=new Date(s.getTime()+g*60*1e3)}else if(o.schedule_type==="daily"){const[g,f]=o.schedule_value.split(":").map(Number),w=Ss(l),_=new Date(w);_.setHours(g,f,0,0),_<=w&&_.setDate(_.getDate()+1);const T=new Date(_.toLocaleString("en-US",{timeZone:"UTC"})),x=new Date(_.toLocaleString("en-US",{timeZone:l})),L=T.getTime()-x.getTime();c=new Date(_.getTime()+L)}else if(o.schedule_type==="weekly"){const[g,f]=o.schedule_value.split(" "),[w,_]=(f||"00:00").split(":").map(Number),x=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(ne=>ne.toLowerCase()===g.toLowerCase()),L=Ss(l),I=new Date(L);I.setHours(w,_,0,0);let M=(x-I.getDay()+7)%7;M===0&&I<=L&&(M=7),I.setDate(I.getDate()+M);const j=new Date(I.toLocaleString("en-US",{timeZone:"UTC"})),z=new Date(I.toLocaleString("en-US",{timeZone:l})),W=j.getTime()-z.getTime();c=new Date(I.getTime()+W)}else o.schedule_type==="once"?(d=!0,u="completed",c=new Date(s.getTime()+365*24*60*60*1e3)):c=new Date(s.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r,c.toISOString(),d?0:o.enabled,u,o.id).run();const y=(JSON.parse(o.action_config||"{}").description||o.description)&&(o.action_type==="check_mail"||o.action_type==="check_calendar"||o.action_type==="check_sheet"||o.action_type==="custom");if(o.action_type==="reminder")try{const f=JSON.parse(o.action_config||"{}").description||o.description||o.name||"Time for your scheduled task.",w="⏰ "+(o.name||"Scheduled Task");await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, 'system', 'assistant', ?, ?)").bind(o.user_id,w+`
`+f,JSON.stringify({type:"cron",job_id:o.id})).run();const{channel:_}=await We(e.env.DB,o.user_id,w,f,{pinHash:o.pin_hash||void 0,priority:"default",tags:["reminder","karna"]});_==="ntfy-failed"?console.warn(`[cron/execute] job ${o.id}: Ntfy push failed — in-app delivered. Check ntfy_url/ntfy_token in Settings.`):console.info(`[cron/execute] job ${o.id}: reminder delivered via ${_}`)}catch(g){console.warn("[cron/execute] reminder notification failed for job",o.id,":",g==null?void 0:g.message)}i.push({job_id:o.id,name:o.name,status:"dispatched",needs_agent:y,next_run:c.toISOString()})}catch(l){i.push({job_id:o.id,name:o.name,status:"error",error:l.message})}try{const{MemoryService:o}=await Promise.resolve().then(()=>Wi),l=await e.env.DB.prepare("SELECT id FROM users").all();for(const c of l.results||[])await new o(e.env.DB).cleanupDoneTasks(c.id)}catch{}return e.json({executed:i.length,results:i,timestamp:r})});Ae.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const s=parseInt(e.req.param("jobId"),10);if(!s)return e.json({error:"Invalid job ID"},400);const r=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(s).first();if(!r)return e.json({error:"Job not found"},404);if(r.action_type==="reminder")return e.json({job_id:s,status:"completed",note:"reminder handled by phase1"});const i=JSON.parse(r.action_config||"{}").description||r.description||"",o="⏰ "+(r.name||"Scheduled Task"),l=new Date().toISOString();let c="";const d=r.action_type==="reminder",u=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!d&&r.action_type==="custom"&&u.test(i),d)c=i||r.name||"Time for your scheduled task.";else try{const f={id:r.user_id,username:r.username||"user",name:r.user_name||"User",pin_hash:r.pin_hash||"",personality_prompt:r.personality_prompt||"",telegram_chat_id:r.telegram_chat_id||"",timezone:r.user_timezone||"UTC",assistant_name:r.assistant_name||"Karna",created_at:"",updated_at:""},w={userId:r.user_id,username:f.username,channel:"cron",text:tl(r.name,i,r.action_type,r.schedule_type),sessionId:"cron-"+r.id,timestamp:l},{provider:_,rotation:T}=await Qe(e.env.DB,r.user_id,r.pin_hash);c=await ts(w,e.env.DB,_,f,T,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(f){const w=f.message||"unknown error",_=w.includes("rate_limit")||w.includes("429")||w.includes("quota"),T=w.includes("timeout")||w.includes("Timeout");_?c="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":T?c="Task timed out. Will retry at next scheduled time.":c="Task encountered an error. Will retry at next scheduled time.",await H(e.env.DB,r.user_id,"cron_agent","execution_error",w,{job_id:r.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(r.action_type))try{const f=await e.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(r.user_id).first();(!f||f.cnt===0)&&await H(e.env.DB,r.user_id,"cron_verification","no_tools_called",`Cron job "${r.name}" (${r.action_type}) completed without any tool calls`,{job_id:r.id,action_type:r.action_type,response_preview:c.substring(0,200)})}catch{}let y=c||i||"Time for your scheduled task.";y=y.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const g=o+`
`+y;if(d&&await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(r.user_id,"system","assistant",g,JSON.stringify({type:"cron",job_id:r.id})).run(),r.pin_hash){const{channel:f}=await We(e.env.DB,r.user_id,o,y,{pinHash:r.pin_hash,priority:"default",tags:["reminder","karna"]});f==="ntfy-failed"?console.warn(`[run-task] job ${r.id}: Ntfy push failed — in-app notification still delivered. Check ntfy_url/ntfy_token in Settings.`):f==="in-app"&&console.warn(`[run-task] job ${r.id}: Ntfy not configured — delivered in-app only.`)}else await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, 'reminder', ?, ?, ?, 0)").bind(r.user_id,o,y,"cron:"+r.id).run();return e.json({job_id:s,status:"completed",response_length:c.length})});async function aa(e){var s;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return null;const n=await e.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(t).first();return(n==null?void 0:n.user_id)||null}Ae.get("/health/tools",async e=>{var n;const t=await aa(e);if(!t)return e.json({error:"Not authenticated"},401);try{const s=await e.env.DB.prepare(`SELECT tool_name,
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
       ORDER BY created_at DESC LIMIT 10`).bind(t).all(),l=await e.env.DB.prepare(`SELECT provider_name, agent_type,
              COUNT(*) as calls,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM llm_calls
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       GROUP BY provider_name, agent_type
       ORDER BY calls DESC`).bind(t).all();return e.json({period:"last_24h",tool_stats:s.results,enforcement:{triggers:r.results,retry_results:((n=a.results)==null?void 0:n[0])||{total_retries:0,successful_retries:0}},cron:{executions:i.results,warnings:o.results},providers:l.results})}catch(s){return e.json({error:s.message||"Failed to fetch metrics"},500)}});Ae.get("/health/tools/recent",async e=>{const t=await aa(e);if(!t)return e.json({error:"Not authenticated"},401);try{const n=await e.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
              success, error_message, latency_ms, was_enforcement_retry, channel, created_at
       FROM tool_execution_log
       WHERE user_id = ?
       ORDER BY id DESC LIMIT 50`).bind(t).all();return e.json({logs:n.results})}catch(n){return e.json({error:n.message},500)}});const Lt=`

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
- Example: "Couldn't retrieve Amazon order status — requires login."`;function tl(e,t,n,s){return n==="reminder"?`[Scheduled Reminder] "${e}": ${t||"Time for your reminder."}`:n==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check Gmail for new/important emails."}
You MUST call gmail_list or gmail_search immediately.${Lt}`:n==="check_calendar"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check calendar for upcoming events."}
You MUST call list_calendar_events immediately.${Lt}`:n==="check_sheet"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
You MUST call read_sheet immediately with the relevant spreadsheet.${Lt}`:n==="custom"&&t?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${s==="interval"||s==="daily"||s==="weekly"?`
CRITICAL SAFETY RULE: This is a RECURRING scheduled task. You MUST NOT call gmail_send or gmail_draft — sending emails on every cron tick spams recipients. Report findings as text only.`:""}${Lt}`:`[Scheduled task "${e}"]: ${t||"Execute this scheduled task."}${Lt}`}Ae.post("/cron/check-browser-tasks",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);let s=0,r=0;try{const a=await e.env.DB.prepare(`SELECT pbt.id, pbt.user_id, pbt.task_id, pbt.task_description,
              pbt.thread_id, pbt.channel,
              u.telegram_chat_id, u.pin_hash
       FROM pending_browser_tasks pbt
       JOIN users u ON pbt.user_id = u.id
       WHERE pbt.notified = 0
       ORDER BY pbt.created_at ASC
       LIMIT 10`).all();for(const i of a.results||[]){s++;try{const o=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'browser_use_api_key'").bind(i.user_id).first();if(!o)continue;const l=(await G(o.encrypted_value,i.pin_hash)).trim(),c=await Lr(i.task_id,l,{waitMs:8e3});if(!c.done||!(await e.env.DB.prepare(`UPDATE pending_browser_tasks SET notified = 1
           WHERE user_id = ? AND task_id = ? AND notified = 0`).bind(i.user_id,i.task_id).run()).meta.changes)continue;const u=i.task_description?`"${i.task_description.substring(0,80)}${i.task_description.length>80?"...":""}"`:"Your browser task";let p,y;if(c.status==="finished"&&c.output?(p="Browser task completed",y=`${u} finished.

${c.output.substring(0,500)}${c.output.length>500?"...":""}`):c.status==="finished"?(p="Browser task completed (no output)",y=`${u} finished, but the browser returned no readable content. You may want to retry.`):(p="Browser task ended",y=`${u} ended with status "${c.status}". Check the browser dashboard for details.`),i.thread_id){const g=c.status==="finished"&&c.output?c.output.substring(0,8e3):y,f=Math.ceil(g.length/4);try{await e.env.DB.prepare(`INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id)
               VALUES (?, ?, 'assistant', ?, '{}', ?, ?)`).bind(i.user_id,i.channel||"web",g,f,i.thread_id).run()}catch{}}i.pin_hash&&await We(e.env.DB,i.user_id,p,y,{pinHash:i.pin_hash,tags:["browser","karna"]}),r++,await new Promise(g=>setTimeout(g,200))}catch{}}}catch{}return e.json({checked:s,notified:r})});Ae.get("/scorecard/weekly",async e=>{var u;const t=(u=e.req.header("Authorization"))==null?void 0:u.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=n.user_id,r=new Date(Date.now()-10080*60*1e3).toISOString(),[a,i,o]=await Promise.all([e.env.DB.prepare(`SELECT COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as success_count,
              AVG(latency_ms) as avg_latency,
              MAX(latency_ms) as p95_latency_hint
       FROM tool_execution_log
       WHERE user_id = ? AND created_at >= ?`).bind(s,r).first(),e.env.DB.prepare(`SELECT COUNT(*) as retry_count
       FROM tool_execution_log
       WHERE user_id = ? AND was_enforcement_retry = 1 AND created_at >= ?`).bind(s,r).first(),e.env.DB.prepare(`SELECT COUNT(*) as cited_responses
       FROM conversations
       WHERE user_id = ? AND role = 'assistant' AND created_at >= ? AND (content LIKE '%[S1]%' OR content LIKE '%source%')`).bind(s,r).first()]),l=Number((a==null?void 0:a.total)||0),c=Number((a==null?void 0:a.success_count)||0),d=l?c/l:0;return e.json({window:"7d",task_success_rate:Number(d.toFixed(3)),groundedness_rate_hint:Number((Number((o==null?void 0:o.cited_responses)||0)/Math.max(1,l)).toFixed(3)),avg_latency_ms:Math.round(Number((a==null?void 0:a.avg_latency)||0)),p95_latency_hint_ms:Math.round(Number((a==null?void 0:a.p95_latency_hint)||0)),fallback_frequency_hint:Number((Number((i==null?void 0:i.retry_count)||0)/Math.max(1,l)).toFixed(3)),totals:{total_tool_calls:l,successful_tool_calls:c}})});function nl(e,t,n,s){return{userId:e,username:t,channel:"telegram",text:n,sessionId:`telegram-${s}`,timestamp:new Date().toISOString()}}function sl(e,t){return e.replace(/\*\*(.*?)\*\*/gs,"*$1*").replace(/^#{1,3}\s+(.+)$/gm,"*$1*").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const rl=["llm_slot_1","llm_slot_2","llm_slot_3"],al=["openai","groq"];function ks(e,t){const n=t==null?void 0:t.trim();if(!n)return null;const s=e.trim().toLowerCase();return s==="openai"?{url:"https://api.openai.com/v1/audio/transcriptions",apiKey:n,model:"whisper-1"}:s==="groq"?{url:"https://api.groq.com/openai/v1/audio/transcriptions",apiKey:n,model:"whisper-large-v3"}:null}function il(e){var t,n;return((t=e.apiKey)==null?void 0:t.trim())||((n=e.api_key)==null?void 0:n.trim())}async function ol(e,t,n){for(const s of rl){const r=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,s).first();if(r)try{const a=await G(r.encrypted_value,n),i=JSON.parse(a),o=il(i);if(i.provider&&o){const l=ks(i.provider,o);if(l)return l}}catch(a){console.error(`[telegram stt] Failed to load ${s}:`,a)}}for(const s of al){const r=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,s).first();if(r)try{const a=await G(r.encrypted_value,n),i=ks(s,a);if(i)return i}catch(a){console.error(`[telegram stt] Failed to load legacy ${s}:`,a)}}return null}const ia=["message","callback_query"],ll=4e3,cl=1e4,dl=3e4;async function Oe(e,t={}){const n=new AbortController,s=setTimeout(()=>n.abort(),cl);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(s)}}async function xs(e){const t=new AbortController,n=setTimeout(()=>t.abort(),dl);try{return await fetch(e,{signal:t.signal})}finally{clearTimeout(n)}}async function ae(e,t,n,s="Markdown",r,a){var c,d;const i=ml(n,ll),o=[];let l=!0;for(let u=0;u<i.length;u++){const p=i[u];let y=!1,g="";for(let f=0;f<3;f++)try{const w=await Oe(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:p,parse_mode:s,disable_web_page_preview:!1})});if(w.ok){y=!0;break}const _=await w.json().catch(()=>null);if(g=`HTTP ${w.status}: ${(_==null?void 0:_.description)||"Unknown error"}`,(c=_==null?void 0:_.description)!=null&&c.includes("parse")||(d=_==null?void 0:_.description)!=null&&d.includes("entities")){if((await Oe(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:p})})).ok){y=!0;break}g+=" (plain-text retry also failed)"}if(w.status===429||w.status>=500){const T=Math.pow(2,f)*1e3;await new Promise(x=>setTimeout(x,T));continue}break}catch(w){if(g=`Network error: ${w.message}`,f<2){const _=Math.pow(2,f)*1e3;await new Promise(T=>setTimeout(T,_));continue}}y||(l=!1,o.push(`Chunk ${u+1}/${i.length}: ${g}`))}if(!l&&r&&a&&o.length>0)try{const{logError:u}=await Promise.resolve().then(()=>bt);await u(r,a,"telegram","send_failed",o.join(" | "))}catch{}return{success:l,errors:o}}async function ul(e,t){try{await Oe(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function ml(e,t){if(e.length<=t)return[e];const n=[];let s=e;for(;s.length>0;){if(s.length<=t){n.push(s);break}let r=s.lastIndexOf(`
`,t);r<t*.3&&(r=s.lastIndexOf(" ",t)),r<t*.3&&(r=t),n.push(s.substring(0,r)),s=s.substring(r).trimStart()}return n}function pl(e){const t=Date.now()-new Date(e).getTime(),n=Math.floor(t/6e4);if(n<1)return"just now";if(n<60)return`${n}m ago`;const s=Math.floor(n/60);return s<24?`${s}h ago`:`${Math.floor(s/24)}d ago`}async function hl(e,t,n){const r={reminder:"⏰",mail:"✉️",calendar:"📅",error:"⚠️",system:"⚙️"}[n.type]||"🔔",a={daily:"📅 Daily",weekly:"📅 Weekly",once:"✓ Once"},i=n.schedule_type?` · _${a[n.schedule_type]||"⏱ Repeating"}_`:"",o=n.body?`
`+n.body.substring(0,150)+(n.body.length>150?"…":""):"",l=`${r} *${n.title}*${i}
_${pl(n.created_at)}_${o}`,c=oa(n.id);if(!(await Oe(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:l,parse_mode:"Markdown",reply_markup:{inline_keyboard:c}})})).ok){const u=await Oe(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:l.replace(/[_*`[\]]/g,""),reply_markup:{inline_keyboard:c}})});u.ok||console.warn("[sendNotifMessage] plain-text fallback also failed:",t,u.status)}}async function gl(e,t,n,s,r){switch(e.split("@")[0].toLowerCase()){case"/start":{const i=(s==null?void 0:s.name)||"there",o=(s==null?void 0:s.assistant_name)||"Karna",l=`👋 *Hello, ${i}!*

I'm ${o}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/tasks — Show open tasks
/notifications — Show pending notifications
/new — Start a fresh conversation

Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.`+(s?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`),c=await ae(n,t,l,"Markdown",r,s==null?void 0:s.id);return!c.success&&c.errors.length>0&&console.warn(`[/start] Failed to send message: ${c.errors.join(" | ")}`),!0}case"/help":{const o=`🛠 *${(s==null?void 0:s.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`,l=await ae(n,t,o,"Markdown",r,s==null?void 0:s.id);return!l.success&&l.errors.length>0&&console.warn(`[/help] Failed to send message: ${l.errors.join(" | ")}`),!0}case"/status":{if(!s){const i=await ae(n,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app.","Markdown",r);return i.success||console.warn(`[/status] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const[i,o,l,c]=await Promise.all([r.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s.id).first(),r.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s.id).first(),r.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(s.id).first(),r.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(s.id).first()]),d=`📊 *System Status*

Active tasks: ${(i==null?void 0:i.cnt)||0}
Memories: ${(o==null?void 0:o.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(c==null?void 0:c.cnt)||0}

Status: ✅ Online`,u=await ae(n,t,d,"Markdown",r,s.id);u.success||console.warn(`[/status] Failed to send message: ${u.errors.join(" | ")}`)}catch{const o=await ae(n,t,"✅ Online — but had trouble fetching stats.","Markdown",r,s==null?void 0:s.id);o.success||console.warn(`[/status error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/new":{if(!s){const o=await ae(n,t,"⚠️ Account not linked.","Markdown",r);return o.success||console.warn(`[/new] Failed to send message: ${o.errors.join(" | ")}`),!0}await r.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(s.id).run();const i=await ae(n,t,"🆕 Starting fresh conversation. Your next message begins a new thread.","Markdown",r,s.id);return i.success||console.warn(`[/new] Failed to send message: ${i.errors.join(" | ")}`),!0}case"/tasks":case"/task":{if(!s){const i=await ae(n,t,"⚠️ Account not linked.","Markdown",r);return i.success||console.warn(`[/tasks] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await r.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(s.id).all()).results||[];if(o.length===0){const g=await ae(n,t,"✅ No open tasks. You're all clear.","Markdown",r,s.id);return g.success||console.warn(`[/tasks] Failed to send message: ${g.errors.join(" | ")}`),!0}const l=new Date,c=l.toISOString().slice(0,10),d=new Date(l);d.setDate(d.getDate()+1);const u=d.toISOString().slice(0,10),p=[`📋 *Open Tasks (${o.length})*
`];for(const g of o){let f="";if(g.due_date){const w=g.due_date.slice(0,10);w<c?f=" ⚠️ _overdue_":w===c?f=" 🔴 _due today_":w===u?f=" 🟡 _due tomorrow_":f=` _${new Date(g.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}p.push(`☐ ${g.title}${f}`)}p.push(`
_Say "mark [task] as done" to close a task._`);const y=await ae(n,t,p.join(`
`),"Markdown",r,s.id);y.success||console.warn(`[/tasks] Failed to send message: ${y.errors.join(" | ")}`)}catch(i){const o=await ae(n,t,"❌ Could not fetch tasks: "+i.message,"Markdown",r,s==null?void 0:s.id);o.success||console.warn(`[/tasks error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/notifications":case"/notif":{if(!s){const i=await ae(n,t,"⚠️ Account not linked.","Markdown",r);return i.success||console.warn(`[/notifications] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await r.prepare(`
          SELECT n.id, n.type, n.title, n.body, n.created_at, j.schedule_type
          FROM notifications n
          LEFT JOIN cron_jobs j
            ON n.user_id = j.user_id
            AND n.source LIKE 'cron:%'
            AND CAST(SUBSTR(n.source, 6) AS INTEGER) = j.id
          WHERE n.user_id = ? AND n.is_read = 0
          ORDER BY n.created_at DESC
          LIMIT 5
        `).bind(s.id).all()).results||[];if(o.length===0){const c=await ae(n,t,"🎉 No pending notifications. You're all caught up.","Markdown",r,s.id);return c.success||console.warn(`[/notifications] Failed to send message: ${c.errors.join(" | ")}`),!0}const l=await ae(n,t,`📬 *${o.length} pending notification${o.length>1?"s":""}:*`,"Markdown",r,s.id);l.success||console.warn(`[/notifications] Failed to send header: ${l.errors.join(" | ")}`);for(const c of o)await hl(n,t,c)}catch(i){const o=await ae(n,t,"❌ Could not fetch notifications: "+i.message,"Markdown",r,s==null?void 0:s.id);o.success||console.warn(`[/notifications error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}default:return!1}}async function fl(e,t){var r,a,i,o,l,c;const n=t.db,s=t.env;console.log(`[telegram webhook] envVars keys=${Object.keys(s).join(",")}`);try{if(e.callback_query){await _l(n,e.callback_query);return}const d=e.message;if(!d)return;const u=!!d.text,p=!!d.voice,y=!!d.document,g=!!d.photo,f=!!d.caption;if(!u&&!p&&!y&&!g)return;const w=String(d.chat.id);let _=d.text||"";const T=await n.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(w).first();let x=null;if(T){const P=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(T.id,"telegram_bot_token").first();P&&(x=await G(P.encrypted_value,T.pin_hash))}if(!x){const P=await n.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();P&&(x=await G(P.encrypted_value,P.pin_hash))}if(!x||_.startsWith("/")&&await gl(_,w,x,T,n))return;if(!T){const P=await ae(x,w,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${w}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`,"Markdown",n);P.success||console.warn(`Failed to send unlinked account message: ${P.errors.join(" | ")}`);return}if(d.voice&&x&&T)try{if((d.voice.file_size??0)>20*1024*1024){const Z=await ae(x,w,"⚠️ Voice note is too large to process (max 20 MB).","Markdown",n,T.id);Z.success||console.warn(`[voice size] Failed to send message: ${Z.errors.join(" | ")}`);return}const P=await ae(x,w,"🎤 Processing voice note...","Markdown",n,T.id);P.success||console.warn(`[voice start] Failed to send message: ${P.errors.join(" | ")}`);const q=await(await Oe(`https://api.telegram.org/bot${x}/getFile?file_id=${d.voice.file_id}`)).json();if(q.ok&&((r=q.result)!=null&&r.file_path)){const te=await(await xs(`https://api.telegram.org/file/bot${x}/${q.result.file_path}`)).blob(),oe=await ol(n,T.id,T.pin_hash);if(!oe){const h=await ae(x,w,"⚠️ To use voice notes, add an OpenAI or Groq API key in Settings → Keys (LLM slot or legacy openai/groq).","Markdown",n,T.id);h.success||console.warn(`[voice no stt] Failed to send message: ${h.errors.join(" | ")}`);return}const re=new FormData;re.append("file",te,"voice.ogg"),re.append("model",oe.model),re.append("language","en");const he=await fetch(oe.url,{method:"POST",headers:{Authorization:`Bearer ${oe.apiKey}`},body:re});if(!he.ok){const h=await he.text(),v=await ae(x,w,`⚠️ Transcription failed: ${he.status} ${h}`,"Markdown",n,T.id);v.success||console.warn(`[voice transcription error] Failed to send message: ${v.errors.join(" | ")}`);return}_=(await he.json()).text;const E=await ae(x,w,`🗣️ *You said:* ${_}`,"Markdown",n,T.id);E.success||console.warn(`[voice transcript echo] Failed to send message: ${E.errors.join(" | ")}`)}}catch(P){const Y=await ae(x,w,`⚠️ Failed to process voice note: ${P.message}`,"Markdown",n,T==null?void 0:T.id);Y.success||console.warn(`[voice processing error] Failed to send message: ${Y.errors.join(" | ")}`);return}if((y||g)&&x&&T)try{let P,Y="unknown",q="unknown",Z=0;if(y)P=d.document.file_id,Y=d.document.file_name||"document",q=d.document.mime_type||"unknown",Z=d.document.file_size||0;else if(g){const te=d.photo[d.photo.length-1];P=te.file_id,Y="photo.jpg",q="image/jpeg",Z=te.file_size||0}if(P){const oe=await(await Oe(`https://api.telegram.org/bot${x}/getFile?file_id=${P}`)).json();let re="";if(oe.ok&&((a=oe.result)!=null&&a.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(Y)||/^text\/|application\/json|application\/xml|application\/csv/i.test(q))&&Z<5e4)try{re=await(await xs(`https://api.telegram.org/file/bot${x}/${oe.result.file_path}`)).text()}catch{}const he=d.caption||"",m=`[Telegram file received: "${Y}" (${q}, ${Math.round(Z/1024)}KB)]`;re?_=`${he?he+`

`:""}${m}
File contents:
${re.substring(0,8e3)}${re.length>8e3?`
[...truncated]`:""}`:_=`${he?he+`

`:""}${m}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(P){if(f&&d.caption)_=d.caption;else{const Y=await ae(x,w,`⚠️ Received your file but couldn't process it: ${P.message}`,"Markdown",n,T==null?void 0:T.id);Y.success||console.warn(`[file processing error] Failed to send message: ${Y.errors.join(" | ")}`);return}}if(!_)return;ul(x,w).catch(()=>{});let L=await n.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(T.id).first();if(L)await n.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(L.id).run();else{const P=await n.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(T.id).run();if(!((i=P.meta)!=null&&i.last_row_id))throw new Error("Thread creation failed — no row ID returned");L={id:P.meta.last_row_id}}const I=nl(T.id,T.username,_,w);I.metadata={thread_id:L.id},console.log(`[telegram webhook] user=${T.id} msgLen=${_.length} thread=${L.id}`);let M,j;try{const P=await Qe(n,T.id,T.pin_hash);M=P.provider,j=P.rotation}catch(P){console.error("Telegram provider setup error:",P);const Y=(o=P.message)!=null&&o.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(l=P.message)!=null&&l.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${P.message||"Unknown error"}`,q=await ae(x,w,Y,"Markdown",n,T.id);q.success||console.warn(`[provider error] Failed to send message: ${q.errors.join(" | ")}`);return}const{classifyIntentFast:z}=await Promise.resolve().then(()=>_o);if(z(_).agent==="multi"){const P=await ae(x,w,"🔍 On it…","Markdown",n,T.id);P.success||console.warn(`[ack] Failed to send: ${P.errors.join(" | ")}`)}const W=6e5;let ne=!1;try{const P=await Promise.race([ts(I,n,M,T,j,s),new Promise((Z,te)=>setTimeout(()=>te(new Error("TELEGRAM_TIMEOUT")),W))]),Y=sl(P,"telegram"),q=await ae(x,w,Y||"(empty response)","Markdown",n,T.id);if(await n.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(L.id).run().catch(()=>{}),ne=q.success,!q.success){console.error(`[CRITICAL] Agent response failed to send to Telegram for user ${T.id}:`,q.errors);try{const{logError:Z}=await Promise.resolve().then(()=>bt);await Z(n,T.id,"telegram","response_send_failed",`Failed to deliver response: ${q.errors.join(" | ")}`)}catch{}}}catch(P){console.error("Telegram agent error:",P);const Y=P.message==="TELEGRAM_TIMEOUT",q=Y?`⏱️ This is taking too long to complete via Telegram.

If you requested a browser task, the result will arrive as a notification when ready. For other long tasks, try the web app.`:(c=P.message)!=null&&c.includes("API error")?`⚠️ AI provider returned an error. The provider (${M.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(P.message||"Unknown").substring(0,200)}`,Z=await ae(x,w,q,"Markdown",n,T.id);ne=Z.success,Z.success||console.error(`[CRITICAL] Error message failed to send to Telegram for user ${T.id}:`,Z.errors);try{const{logError:te}=await Promise.resolve().then(()=>bt);await te(n,T.id,"telegram",Y?"timeout":"agent_error",P.message||"Agent error",{provider:M.name})}catch{}}}catch(d){console.error("Telegram webhook error:",d);try{const{logError:u}=await Promise.resolve().then(()=>bt);await u(n,null,"telegram","webhook_error",d.message||"Unknown telegram error")}catch{}}}function Ds(e){if(!e)return null;if(e.startsWith("cron:")){const t=parseInt(e.replace("cron:",""),10);return isNaN(t)?null:t}return null}function yl(e){const t=new Date(new Date().toLocaleString("en-US",{timeZone:e})),n=new Date(t);n.setDate(n.getDate()+1),n.setHours(9,0,0,0);const s=new Date(n.toLocaleString("en-US",{timeZone:"UTC"})),r=new Date(n.toLocaleString("en-US",{timeZone:e}));return new Date(n.getTime()+(s.getTime()-r.getTime())).toISOString()}const oa=e=>[[{text:"✅ Seen",callback_data:`notif_seen:${e}`},{text:"⏰ Snooze",callback_data:`notif_snooze_menu:${e}`},{text:"✓ Done",callback_data:`notif_done:${e}`}]],vl=e=>[[{text:"10 minutes",callback_data:`notif_snooze:${e}:10m`},{text:"1 hour",callback_data:`notif_snooze:${e}:1h`}],[{text:"Tomorrow 9 AM",callback_data:`notif_snooze:${e}:tomorrow`},{text:"← Back",callback_data:`notif_back:${e}`}]];async function ht(e,t,n){const s=await Oe(`https://api.telegram.org/bot${e}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:t,text:n})});s.ok||console.warn("[answerCallback]",t,s.status)}async function gt(e,t,n,s){const r=await Oe(`https://api.telegram.org/bot${e}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,message_id:n,reply_markup:s?{inline_keyboard:s}:{}})});r.ok||console.warn("[editKeyboard]",t,n,r.status)}async function wl(e,t,n,s,r,a,i,o,l,c){const d=await e.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).first();if(!d){await ht(t,n,"Notification not found — may have already been actioned."),await gt(t,s,r,null);return}if(i==="notif_seen")await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await ht(t,n,"✅ Dismissed"),await gt(t,s,r,null);else if(i==="notif_snooze_menu")await ht(t,n),await gt(t,s,r,vl(o));else if(i==="notif_back")await ht(t,n),await gt(t,s,r,oa(o));else if(i==="notif_snooze"){const u=Ds(d.source);u&&await e.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,a).run();let p,y;l==="10m"?(p=new Date(Date.now()+600*1e3).toISOString(),y="10 minutes"):l==="1h"?(p=new Date(Date.now()+3600*1e3).toISOString(),y="1 hour"):(p=yl(c||"UTC"),y="tomorrow 9 AM"),await e.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
       VALUES (?, ?, ?, 'once', ?, 'reminder', ?, ?, 1, 'active')`).bind(a,d.title,d.body,p,JSON.stringify({description:d.body||""}),p).run(),await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await ht(t,n,`⏰ Snoozed until ${y}`),await gt(t,s,r,null)}else if(i==="notif_done"){const u=Ds(d.source);u&&await e.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,a).run(),await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await ht(t,n,"✓ Done!"),await gt(t,s,r,null)}}async function _l(e,t){var w;const{id:n,data:s,message:r,from:a}=t;if(!s||!r)return;const i=s.split(":"),o=i[0],l=String(r.chat.id);if(o.startsWith("notif_")){const _=parseInt(i[1]);if(!_)return;const T=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(l).first();if(!T)return;const x=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
       JOIN users u ON c.user_id = u.id
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(T.id).first();if(!x)return;const L=await G(x.encrypted_value,x.pin_hash),I=i[2];await wl(e,L,n,l,r.message_id,T.id,o,_,I,T.timezone);return}if(i[0]!=="briefing_toggle"||i.length<3)return;const c=i[1],d=parseInt(i[2]);if(!d||!c)return;const u=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(l).first();if(!u)return;const p=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(u.id,d,c).first();if(!p)return;const y=p.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(y,y,p.id).run();const g=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(u.id).first();if(!g)return;const f=await G(g.encrypted_value,g.pin_hash);try{const _=await Oe(`https://api.telegram.org/bot${f}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:n,text:y?"✅ Checked!":"☐ Unchecked"})});_.ok||console.warn(`[callback answer] Failed to answer callback: HTTP ${_.status}`)}catch(_){console.warn(`[callback answer] Error answering callback: ${_.message}`)}if((w=r.reply_markup)!=null&&w.inline_keyboard){const _=r.reply_markup.inline_keyboard.map(T=>T.map(x=>{var L;if((L=x.callback_data)!=null&&L.includes(c)){const I=y?"✅":"☐",M=x.text.replace(/^[☐✅]\s*/,"");return{...x,text:`${I} ${M}`}}return x}));try{await Oe(`https://api.telegram.org/bot${f}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l,message_id:r.message_id,reply_markup:{inline_keyboard:_}})})}catch{}}}const Jt=new be;function bl(e){return{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE}}Jt.post("/webhook",async e=>{let t;try{t=await e.req.json()}catch{return e.json({ok:!0})}const s={db:e.env.DB,env:bl(e)};return e.executionCtx.waitUntil(fl(t,s)),e.json({ok:!0})});Jt.post("/setup-webhook",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const{webhook_url:s}=await e.req.json(),r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!r)return e.json({error:"Telegram bot token not configured in Settings"},400);const a=await G(r.encrypted_value,n.pin_hash);if(!s){const d=await(await fetch(`https://api.telegram.org/bot${a}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(d)}const o=await(await fetch(`https://api.telegram.org/bot${a}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:s,allowed_updates:[...ia],drop_pending_updates:!1})})).json();return e.json(o)});Jt.get("/webhook-status",async e=>{var a,i,o,l,c,d;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!s)return e.json({configured:!1,error:"Bot token not set"});const r=await G(s.encrypted_value,n.pin_hash);try{const p=await(await fetch(`https://api.telegram.org/bot${r}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((i=p.result)==null?void 0:i.url)||"",has_webhook:!!((o=p.result)!=null&&o.url),pending_updates:((l=p.result)==null?void 0:l.pending_update_count)||0,last_error:((c=p.result)==null?void 0:c.last_error_message)||"",last_error_date:((d=p.result)==null?void 0:d.last_error_date)||null})}catch(u){return e.json({configured:!0,error:u.message})}});Jt.post("/detect-chat-id",async e=>{var a,i;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!s)return e.json({error:"Bot token not configured"},400);const r=await G(s.encrypted_value,n.pin_hash);try{const c=((i=(await(await fetch(`https://api.telegram.org/bot${r}/getWebhookInfo`)).json()).result)==null?void 0:i.url)||"";await fetch(`https://api.telegram.org/bot${r}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(w=>setTimeout(w,500));const u=await(await fetch(`https://api.telegram.org/bot${r}/getUpdates?limit=10&timeout=0`)).json();c&&await fetch(`https://api.telegram.org/bot${r}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:c,allowed_updates:[...ia]})});const p=u.result||[];if(p.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const y=[],g=new Set;for(let w=p.length-1;w>=0;w--){const _=p[w].message;if(_&&_.chat){const T=String(_.chat.id);g.has(T)||(g.add(T),y.push({chat_id:T,name:[_.chat.first_name,_.chat.last_name].filter(Boolean).join(" ")||_.chat.title||"Unknown",username:_.chat.username||"",date:new Date((_.date||0)*1e3).toISOString()}))}}if(y.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const f=y[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(f,n.user_id).run(),e.json({found:!0,chat_id:f,name:y[0].name,all_chats:y,message:`Chat ID ${f} detected and saved to your profile.`})}catch(o){return e.json({error:`Detection failed: ${o.message}`},500)}});function El(e){const t=new Date,n=new Date(t.toLocaleString("en-US",{timeZone:e})),s=new Date(n);s.setDate(s.getDate()+1),s.setHours(0,0,0,0);const r=new Date(s);r.setHours(23,59,59,999);const a=s.toISOString().split("T")[0];return{start:s.toISOString(),end:r.toISOString(),dateStr:a}}function pn(e,t=new Date){return new Intl.DateTimeFormat("en-CA",{timeZone:e||"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}async function Tl(e,t,n,s,r,a){try{return(await new un(e,t,n,s,r).listEvents("primary",{timeMin:a.start,timeMax:a.end,maxResults:50})).map(l=>{var c;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(c=l.attendees)==null?void 0:c.map(d=>d.displayName||d.email),source:"google"}})}catch(i){return console.error("Google Calendar fetch error:",i.message),[]}}async function Sl(e,t,n,s,r){try{const a=new ke(e,t,n,s,r),i=await a.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),o=await a.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const u of i){const p=u.from.split("<")[0].trim()||u.from;l[p]=(l[p]||0)+1}const c=Object.entries(l).sort(([,u],[,p])=>p-u).slice(0,5).map(([u])=>u),d=i.some(u=>u.subject.toLowerCase().includes("urgent")||u.subject.toLowerCase().includes("asap")||u.subject.toLowerCase().includes("immediately"));return{unreadCount:i.length,importantCount:o.length,topSenders:c,hasUrgent:d}}catch(a){return console.error("Gmail fetch error:",a.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function kl(e,t){try{const n=await e.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(t).all(),s=new Date,r=new Date(s);r.setDate(r.getDate()+1),r.setHours(23,59,59,999);const a=n.results||[],i=a.map(l=>{if(l.due_date){const c=new Date(l.due_date),d=c<=s?"overdue":c<=r?"due today":c.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${l.title} [${d}]`}return l.title}),o=a.filter(l=>l.due_date?new Date(l.due_date)<=r:!1).length;return{pending:a.length,dueToday:o,items:i}}catch(n){return console.error("Tasks fetch error:",n.message),{pending:0,dueToday:0,items:[]}}}async function xl(e,t){try{const n=Math.floor((Date.now()-1728e5)/1e3),s=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${n},points>10`,r=await fetch(s,{headers:{"User-Agent":"Karna/1.0"}});return r.ok?((await r.json()).hits||[]).filter(i=>i.url&&!t.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const Rs=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function Dl(e,t,n){const s=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],r=new Set;if(t&&n)try{((await t.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(n).all()).results||[]).forEach(c=>r.add(c.url))}catch{}const a=[];if(s.some(l=>Rs.some(c=>l.toLowerCase().includes(c.toLowerCase())))){const l=s.find(d=>Rs.some(u=>d.toLowerCase().includes(u.toLowerCase())))||"AI agents",c=await xl(l,r);for(const d of c)a.push(d),r.add(d.url)}for(const l of s){if(a.length>=8)break;const c=`latest ${l} news today`;try{const d=await It(c,{num:5});if(d.results)for(const u of d.results){if(a.length>=8)break;r.has(u.link)||(a.push({title:u.title,summary:u.snippet,url:u.link,source:u.displayLink}),r.add(u.link))}}catch(d){console.error(`News search error for "${c}":`,d.message)}}const o=a.slice(0,7);if(t&&n&&o.length>0)for(const l of o)try{await t.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(n,l.url,l.title).run()}catch{}return o}function Rl(e,t){const n=[];let s="20:00";{const[i,o]=t.split(":"),l=parseInt(i,10),c=o||"00",d=l>=12?"PM":"AM";s=`${l===0?12:l>12?l-12:l}:${c} ${d}`}n.push(`🗓 Your ${s} Brief — ${e.targetDate}`),n.push("");const r=e.calendar.totalCount;if(r>0){n.push(`📅 Tomorrow: ${r} event${r===1?"":"s"}`);for(const i of e.calendar.google.slice(0,5)){const o=i.startTime?new Date(i.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";n.push(`   • ${o} ${i.title}`)}}else n.push("📅 Tomorrow: Nothing scheduled");n.push("");const a=e.emails.gmail.unreadCount;if(a>0?(n.push(`📧 Gmail: ${a} unread`),e.emails.gmail.importantCount>0&&n.push(`   ★ ${e.emails.gmail.importantCount} marked important`),e.emails.gmail.hasUrgent&&n.push("   ⚠️ Urgent messages present"),e.emails.gmail.topSenders.length>0&&n.push(`   From: ${e.emails.gmail.topSenders.slice(0,3).join(", ")}`)):n.push("📧 Gmail: Inbox clear"),n.push(""),e.tasks.pending>0){n.push(`✅ Open Tasks (${e.tasks.pending}):`);for(const i of e.tasks.items)n.push(`   ☐ ${i}`)}else n.push("✅ Tasks: All clear");if(n.push(""),e.news.items.length>0){n.push("📡 Today's Signal:");for(const i of e.news.items){const o=i.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${i.source}`;n.push(`   • ${i.title.substring(0,90)}${i.title.length>90?"…":""}`),n.push(`     ${o} — ${i.summary.substring(0,80)}${i.summary.length>80?"…":""}`)}}return n.join(`
`)}function Nl(e){const t=[];let n=0;for(const s of e.calendar.google)t.push({type:"calendar",key:s.id,text:`${s.title} - ${new Date(s.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:s},sortOrder:n++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:n++});for(const s of e.tasks.items)t.push({type:"task",key:`task-${s}`,text:s,metadata:{},sortOrder:n++});for(const s of e.news.items)t.push({type:"news",key:`news-${s.url}`,text:`📰 ${s.title}`,metadata:{url:s.url,source:s.source},sortOrder:n++});return t}async function Il(e,t){const n=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!n)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let s;try{const a=JSON.parse(n.components);s={google_calendar:a.google_calendar!==!1,gmail:a.gmail!==!1,tasks:a.tasks!==!1,news:a.news!==!1}}catch{s={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const r=n.news_topics?n.news_topics.split(",").map(a=>a.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:s,newsTopics:r}}async function la(e,t,n){var x,L;const s=t.timezone||"Asia/Kolkata",r=El(s),{components:a,newsTopics:i}=await Il(e,t.id),o=[],l=[];a.google_calendar&&(o.push(Tl(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET,r)),l.push("googleEvents")),a.gmail&&(o.push(Sl(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),a.tasks&&(o.push(kl(e,t.id)),l.push("tasks")),a.news&&(o.push(Dl(i,e,t.id)),l.push("news"));const c=await Promise.all(o),d={};l.forEach((I,M)=>{d[I]=c[M]});const u={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},p={pending:0,dueToday:0,items:[]},y={generatedAt:new Date().toISOString(),targetDate:r.dateStr,calendar:{google:d.googleEvents||[],totalCount:((x=d.googleEvents)==null?void 0:x.length)||0},emails:{gmail:d.gmailSummary||u},tasks:d.tasks||p,news:{items:d.news||[],fetchedAt:new Date().toISOString()},summary:""},g=((L=await e.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(t.id).first())==null?void 0:L.briefing_time)||"20:00";y.summary=Rl(y,g);const f=Nl(y),w=pn(s),_=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel, briefing_date)
    VALUES (?, 'evening', ?, 'all', ?)
    RETURNING id
  `).bind(t.id,JSON.stringify(y),w).first(),T=(_==null?void 0:_.id)||0;for(const I of f)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(T,I.type,I.key,I.text,JSON.stringify(I.metadata),I.sortOrder).run();return{briefingId:T,content:y,items:f}}async function Ol(e,t,n){const s=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(n,t).first();if(!s)return null;const r=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(n).all();return{briefing:{...s,content:JSON.parse(s.content_json||"{}")},items:r.results||[]}}async function Cl(e,t,n,s){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(n,t).first())return null;const a=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(s,n).first();if(!a)return null;const i=a.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(i,i,s,n).run(),{checked:i===1}}async function Al(e,t,n=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
    LIMIT ?
  `).bind(t,n).all()).results||[]).map(r=>({...r,content:JSON.parse(r.content_json||"{}")}))}function ca(e,t,n=new Date,s=5){const r=new Date(n.toLocaleString("en-US",{timeZone:t})),a=r.getHours(),i=r.getMinutes(),[o,l]=e.split(":").map(Number),c=a*60+i,d=o*60+l,u=c-d;return u>=0&&u<s}function da(e,t){const n=e.summary,s=[];for(const r of t.slice(0,10))s.push([{text:`☐ ${r.text.substring(0,40)}${r.text.length>40?"...":""}`,callback_data:`briefing_toggle:${r.key}`}]);return{text:n,inlineKeyboard:s}}const ye=new be,Ll=1e4;async function Ns(e,t){const n=new AbortController,s=setTimeout(()=>n.abort(),Ll);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(s)}}async function Ml(e,t){var r;if(e.req.path.includes("/cron/"))return t();const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}ye.use("/*",Ml);ye.get("/briefings",async e=>{const t=e.get("user"),n=parseInt(e.req.query("limit")||"10");try{const s=await Al(e.env.DB,t.id,n);return e.json({briefings:s})}catch(s){return e.json({error:s.message},500)}});ye.get("/briefings/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));try{const s=await Ol(e.env.DB,t.id,n);return s?e.json(s):e.json({error:"Briefing not found"},404)}catch(s){return e.json({error:s.message},500)}});ye.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=parseInt(e.req.param("itemId"));try{const r=await Cl(e.env.DB,t.id,n,s);return r?e.json(r):e.json({error:"Item not found"},404)}catch(r){return e.json({error:r.message},500)}});ye.post("/briefings/generate",async e=>{const t=e.get("user");try{const n=await la(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(n)}catch(n){return e.json({error:n.message},500)}});ye.get("/morning-briefing",async e=>{const t=e.get("user");try{const n=await ua(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(n)}catch(n){return e.json({error:n.message},500)}});ye.get("/briefing-preferences",async e=>{const t=e.get("user");try{const n=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!n){const r={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:r})}const s={briefingTime:n.briefing_time,briefingEnabled:n.briefing_enabled!==0,components:JSON.parse(n.components),newsTopics:n.news_topics.split(",").map(r=>r.trim()).filter(Boolean),notificationChannels:JSON.parse(n.notification_channels),proactiveLevel:n.proactive_level};return e.json({preferences:s})}catch(n){return e.json({error:n.message},500)}});ye.post("/briefing-preferences",async e=>{const t=e.get("user"),n=await e.req.json(),s=[];if(n.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(n.briefingTime)||s.push("Invalid time format. Use HH:MM (e.g., 20:00)")),n.newsTopics&&(n.newsTopics.length>5&&s.push("Maximum 5 news topics allowed"),n.newsTopics.some(r=>r.length>50)&&s.push("Each news topic must be 50 characters or less")),n.proactiveLevel&&!["conservative","moderate","aggressive"].includes(n.proactiveLevel)&&s.push("Invalid proactive level. Use conservative, moderate, or aggressive"),s.length>0)return e.json({error:s.join("; ")},400);try{const r=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),a=n.components?JSON.stringify(n.components):null,i=n.notificationChannels?JSON.stringify(n.notificationChannels):null,o=n.newsTopics?n.newsTopics.join(", "):null;if(r){const l=[],c=[];n.briefingTime!==void 0&&(l.push("briefing_time = ?"),c.push(n.briefingTime)),n.briefingEnabled!==void 0&&(l.push("briefing_enabled = ?"),c.push(n.briefingEnabled?1:0)),a!==null&&(l.push("components = ?"),c.push(a)),o!==null&&(l.push("news_topics = ?"),c.push(o)),i!==null&&(l.push("notification_channels = ?"),c.push(i)),n.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),c.push(n.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),c.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...c).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,n.briefingTime||"20:00",a||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',o||"AI, LLM, Tools, Agentic Workflows, AI Features",i||'{"telegram":true,"web":true}',n.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(r){return e.json({error:r.message},500)}});ye.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(n){return e.json({error:n.message},500)}});ye.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],a=new Date;for(const i of s.results||[]){if(!i.briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.briefing_time||"20:00";if(!ca(l,o,a))continue;const c=pn(o,a);if(!await e.env.DB.prepare("SELECT 1 FROM briefings WHERE user_id = ? AND briefing_type = 'evening' AND briefing_date = ? LIMIT 1").bind(i.id,c).first())try{const u=await la(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),{text:p}=da(u.content,u.items);await We(e.env.DB,i.id,"Evening Briefing",p,{pinHash:i.pin_hash,tags:["briefing","karna"]}),u.briefingId&&await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(u.briefingId).run(),r.push({user_id:i.id,status:"success",briefing_id:u.briefingId,briefing_time:l,timezone:o})}catch(u){r.push({user_id:i.id,status:"error",error:u.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});ye.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare("SELECT * FROM users").all(),r=[],a=new Date,i=new Date(a.getTime()+600*1e3).toISOString(),o=new Date(a.getTime()+900*1e3).toISOString();for(const l of s.results||[])try{const c=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!c)continue;const d=await G(c.encrypted_value,l.pin_hash),p=JSON.parse(d).access_token;if(!p)continue;const y=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(a.toISOString())}&timeMax=${encodeURIComponent(o)}&maxResults=10`,{headers:{Authorization:`Bearer ${p}`}});if(!y.ok)continue;const f=((await y.json()).items||[]).filter(w=>{var T;const _=(T=w.start)==null?void 0:T.dateTime;return _?_>=a.toISOString()&&_<=i:!1});if(f.length===0){r.push({user_id:l.id,reminders_sent:0});continue}for(const w of f){const _=new Date(w.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),T=w.location?`
📍 ${w.location}`:"",x="Meeting in 10 minutes",L=`${w.summary||"Untitled Event"}
🕐 ${_}${T}`;await We(e.env.DB,l.id,x,L,{pinHash:l.pin_hash,priority:"high",tags:["calendar","karna"]})}r.push({user_id:l.id,reminders_sent:f.length})}catch(c){r.push({user_id:l.id,status:"error",error:c.message})}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});ye.post("/cron/morning-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.morning_briefing_time, '08:00') as morning_briefing_time,
             COALESCE(bp.morning_briefing_enabled, 1) as morning_briefing_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],a=new Date;for(const i of s.results||[]){if(!i.morning_briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.morning_briefing_time||"08:00";if(!ca(l,o,a))continue;const c=pn(o,a);if(!await e.env.DB.prepare("SELECT 1 FROM briefings WHERE user_id = ? AND briefing_type = 'morning' AND briefing_date = ? LIMIT 1").bind(i.id,c).first())try{const u=await ua(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});let p={telegram:!0,web:!0};try{p=JSON.parse(i.notification_channels||"{}")}catch{}if(p.web!==!1&&u.briefingId){const y=Bl(u.content);await We(e.env.DB,i.id,"Morning Briefing",y,{pinHash:i.pin_hash,tags:["briefing","karna"]}),await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(u.briefingId).run()}r.push({user_id:i.id,status:"success",briefing_id:u.briefingId,briefing_time:l,timezone:o})}catch(u){r.push({user_id:i.id,status:"error",error:u.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});ye.post("/cron/email-digest",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, bp.components
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[];for(const a of s.results||[]){let i={};try{i=JSON.parse(a.components||"{}")}catch{}if(i.email_digest!==!1)try{const o=await ma(e.env.DB,a,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET},{skipBrowserUse:!0}),l=`Email Digest — ${new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}`,c=JSON.stringify(o,null,2),d=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'email_digest', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(a.id,l,c,`email_digest_${Date.now()}`,null,null,null).first();r.push({user_id:a.id,status:"success",action_item_id:d==null?void 0:d.id,digest:o})}catch(o){r.push({user_id:a.id,status:"error",error:o.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});ye.post("/cron/weekly-review",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.weekly_review_day_time, 'Sunday 20:00') as weekly_review_day_time,
             COALESCE(bp.weekly_review_enabled, 1) as weekly_review_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],a=new Date;for(const i of s.results||[]){if(!i.weekly_review_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.weekly_review_day_time||"Sunday 20:00";if(jl(l,o,a))try{const c=await Pl(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),d=`Weekly Review — Week of ${new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})}`,u=JSON.stringify(c,null,2),p=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'weekly_review', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(i.id,d,u,`weekly_review_${Date.now()}`,null,null,null).first();let y={telegram:!0,web:!0};try{y=JSON.parse(i.notification_channels||"{}")}catch{}if(y.web!==!1){const g=Ul(c);await We(e.env.DB,i.id,"Weekly Review",g,{pinHash:i.pin_hash,tags:["review","karna"]})}r.push({user_id:i.id,status:"success",action_item_id:p==null?void 0:p.id})}catch(c){r.push({user_id:i.id,status:"error",error:c.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});async function $l(e,t,n,s,r){try{const a=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!a)return;const i=await G(a.encrypted_value,a.pin_hash);if(!(i!=null&&i.trim())){Yn("sendTelegramWithKeyboard: empty bot token",{userId:t.id});return}if(!(await(await Ns(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n,parse_mode:"Markdown",reply_markup:{inline_keyboard:s.map(c=>c.map(d=>({...d,callback_data:`${d.callback_data}:${r}`})))}})})).json()).ok){const d=await(await Ns(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n.replace(/[_*[`\]]/g,""),reply_markup:{inline_keyboard:s.map(u=>u.map(p=>({...p,callback_data:`${p.callback_data}:${r}`})))}})})).json();if(!d.ok){Bt("Telegram briefing send failed",{description:d.description,chatId:t.telegram_chat_id});return}}await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(r).run()}catch(a){Bt("Telegram briefing error",{error:(a==null?void 0:a.message)||String(a)})}}async function ua(e,t,n){const s=new Date;s.setHours(0,0,0,0);const r=new Date;r.setHours(23,59,59,999);const a=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 
    AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,s.toISOString(),r.toISOString()).all(),i=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 10
  `).bind(t.id).all(),o=await ma(e,t,n,{skipBrowserUse:!0});let l=[];try{const y=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first();if(y){const g=await G(y.encrypted_value,t.pin_hash),w=JSON.parse(g).access_token;if(w){const _=s.toISOString(),T=r.toISOString(),x=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(_)}&timeMax=${encodeURIComponent(T)}&maxResults=20`,{headers:{Authorization:`Bearer ${w}`}});x.ok&&(l=((await x.json()).items||[]).map(I=>{var M,j,z,W;return{title:I.summary||"Untitled",startTime:((M=I.start)==null?void 0:M.dateTime)||((j=I.start)==null?void 0:j.date),endTime:((z=I.end)==null?void 0:z.dateTime)||((W=I.end)==null?void 0:W.date)}}))}}}catch{}const c={generatedAt:new Date().toISOString(),type:"morning",todayReminders:(a.results||[]).map(y=>({name:y.name,description:y.description,next_run:y.next_run})),pendingActions:(i.results||[]).map(y=>({title:y.title,priority:y.priority})),emailDigest:o,calendarEvents:l},d=pn(t.timezone||"Asia/Kolkata"),u=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel, briefing_date)
    VALUES (?, 'morning', ?, 'all', ?)
    RETURNING id
  `).bind(t.id,JSON.stringify(c),d).first();return{briefingId:(u==null?void 0:u.id)||0,content:c}}async function ma(e,t,n,s){const r={unreadCount:0,recent:[]},a={message:"",recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const o=new ke(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET),l=await o.getUnreadCount(),c=await o.listMessages({maxResults:10,labelIds:["INBOX"]});r.unreadCount=l,r.recent=c.map(d=>({id:d.id,subject:d.subject,from:d.from,snippet:d.snippet,isUnread:d.isUnread}))}}catch(i){r.error=i.message}if(s!=null&&s.skipBrowserUse)a.message="Outlook not fetched in automated digest (runs once daily in morning briefing).";else try{const i=await e.prepare("SELECT name, encrypted_blob FROM site_credentials WHERE user_id = ? AND (name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE) LIMIT 1").bind(t.id,"%Outlook%","%Microsoft%","%Office 365%").first();if(!i)a.message="No Outlook credentials saved in Secret Vault. Add them in Settings → Secret Vault.";else{const o=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,"browser_use_api_key").first();if(!o)a.message="Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key.";else{const l=(await G(o.encrypted_value,t.pin_hash)).trim(),c=JSON.parse(await G(i.encrypted_blob,t.pin_hash)),d=await Fn("Go to https://outlook.live.com or https://outlook.office.com. Log in with username {username} and password {password} if prompted. Navigate to the inbox and extract the 10 most recent emails with sender, subject, date, and snippet. Return the results as structured text.",l,{secrets:{username:c.username,password:c.password},timeoutMs:3e5});d.status==="completed"&&d.output?a.recent=d.output:d.status==="timeout"?a.message="Outlook browser task timed out.":a.message="Outlook returned no content."}}}catch(i){a.message=`Outlook error: ${i.message}`}return{gmail:r,outlook:a}}function jl(e,t,n=new Date){const s=new Date(n.toLocaleString("en-US",{timeZone:t})),r=s.toLocaleDateString("en-US",{weekday:"long"}),a=s.getHours(),i=s.getMinutes(),o=e.trim().split(" "),l=o[o.length-1],c=o.slice(0,o.length-1).join(" "),[d,u]=l.split(":").map(Number),p=a*60+i,y=d*60+u;return r===c&&p===y}async function Pl(e,t,n){const s=new Date,r=new Date(s.getTime()-10080*60*1e3),a=new Date(s.getTime()+10080*60*1e3),i=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND state = 'completed' AND last_run >= ?
    ORDER BY last_run DESC
  `).bind(t.id,r.toISOString()).all(),o=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run < ?
    ORDER BY next_run DESC
  `).bind(t.id,s.toISOString()).all(),l=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 15
  `).bind(t.id).all(),c=await e.prepare(`
    SELECT * FROM document_library 
    WHERE user_id = ? AND created_at >= ?
    ORDER BY created_at DESC
    LIMIT 10
  `).bind(t.id,r.toISOString()).all(),d=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,s.toISOString(),a.toISOString()).all();let u={unreadCount:0,recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const y=new ke(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET),g=await y.getUnreadCount(),f=await y.listMessages({maxResults:10,labelIds:["INBOX"]});u={unreadCount:g,recent:f.map(w=>({subject:w.subject,from:w.from,snippet:w.snippet}))}}}catch{}return{generatedAt:s.toISOString(),period:{start:r.toISOString(),end:s.toISOString()},completedTasks:(i.results||[]).map(p=>({name:p.name,last_run:p.last_run})),missedTasks:(o.results||[]).map(p=>({name:p.name,next_run:p.next_run})),openActions:(l.results||[]).map(p=>({title:p.title,priority:p.priority,status:p.status})),recentDocuments:(c.results||[]).map(p=>({name:p.name,status:p.status,created_at:p.created_at})),upcomingTasks:(d.results||[]).map(p=>({name:p.name,next_run:p.next_run})),gmailSummary:u}}function Bl(e){const t=[];t.push("☀️ Morning Briefing"),t.push("");const n=e.todayReminders||[];if(n.length>0){t.push(`📋 Today (${n.length}):`);for(const l of n){const c=l.next_run?new Date(l.next_run).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${c} ${l.name}`)}}else t.push("📋 Today: No scheduled reminders");t.push("");const s=e.pendingActions||[];if(s.length>0){t.push(`🔔 Pending Actions (${s.length}):`);for(const l of s.slice(0,5))t.push(`   • ${l.title} (${l.priority})`)}else t.push("🔔 Pending Actions: None");t.push("");const r=e.emailDigest||{},a=r.gmail||{};a.unreadCount>0?t.push(`📧 Gmail: ${a.unreadCount} unread`):t.push("📧 Gmail: Inbox clear");const i=r.outlook||{};typeof i.recent=="string"&&i.recent.length>0?t.push("📧 Outlook: see digest"):i.message&&t.push(`📧 Outlook: ${i.message}`),t.push("");const o=e.calendarEvents||[];if(o.length>0){t.push(`📅 Calendar (${o.length}):`);for(const l of o.slice(0,5)){const c=l.startTime?new Date(l.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${c} ${l.title}`)}}return t.join(`
`)}function Ul(e){const t=[];t.push("📊 Weekly Review"),t.push("");const n=e.completedTasks||[];t.push(`✅ Completed: ${n.length}`);const s=e.missedTasks||[];t.push(`❌ Missed/Overdue: ${s.length}`);const r=e.openActions||[];t.push(`🔔 Open Actions: ${r.length}`),t.push("");const a=e.recentDocuments||[];a.length>0&&t.push(`📄 Documents: ${a.length} this week`);const i=e.upcomingTasks||[];i.length>0&&t.push(`📅 Upcoming: ${i.length} in next 7 days`);const o=e.gmailSummary||{};return o.unreadCount>0&&t.push(`📧 Gmail Unread: ${o.unreadCount}`),t.join(`
`)}ye.post("/briefings/:id/resend",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));try{const s=await e.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Briefing not found"},404);const r=JSON.parse(s.content||"{}"),a=await e.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(n).all(),{text:i,inlineKeyboard:o}=da(r,a.results||[]);await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(n).run(),await $l(e.env.DB,t,i,o,n);const l=await e.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(n).first();return l!=null&&l.delivered_telegram?e.json({success:!0,message:"Briefing sent to Telegram"}):e.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(s){return e.json({error:s.message},500)}});ye.delete("/briefings/:id",async e=>{const t=e.get("user"),n=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});const pa=["morning","evening","weekly","email"],ha=["calendar_today","calendar_tomorrow","gmail_summary","outlook_summary","tasks_due","news_ai","cron_jobs_today","cron_completed","cron_missed","action_items_open","documents_recent"],ga=["ntfy","web","telegram"],Mn=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],_t=["AI","LLM","Tools","Agentic Workflows","AI Features"];function tn(e){switch(e){case"morning":return["calendar_today","gmail_summary","cron_jobs_today","action_items_open"];case"evening":return["calendar_tomorrow","gmail_summary","tasks_due","news_ai"];case"weekly":return["cron_completed","cron_missed","action_items_open","documents_recent","gmail_summary"];case"email":return["gmail_summary","outlook_summary"]}}function hn(e){switch(e){case"morning":return{kind:e,enabled:!0,scheduleTime:"08:00",scheduleWeekday:null,sections:tn("morning"),notifyChannels:["ntfy","web"],newsTopics:_t};case"evening":return{kind:e,enabled:!0,scheduleTime:"20:00",scheduleWeekday:null,sections:tn("evening"),notifyChannels:["ntfy","web"],newsTopics:_t};case"weekly":return{kind:e,enabled:!0,scheduleTime:"20:00",scheduleWeekday:"Sunday",sections:tn("weekly"),notifyChannels:["ntfy","web"],newsTopics:_t};case"email":return{kind:e,enabled:!1,scheduleTime:"12:00",scheduleWeekday:null,sections:tn("email"),notifyChannels:["ntfy","web"],newsTopics:_t}}}function Hl(){return pa.map(hn)}function Is(e,t){try{const n=JSON.parse(e);return Array.isArray(n)?n.filter(s=>typeof s=="string"&&t.includes(s)):[]}catch{return[]}}function ns(e){const t=hn(e.kind),n=Is(e.sections_json,ha),s=Is(e.notify_channels_json,ga);let r=_t;return e.news_topics!=null&&(r=e.news_topics.split(",").map(a=>a.trim()).filter(Boolean),r.length===0&&(r=_t)),{kind:e.kind,enabled:e.enabled!==0,scheduleTime:/^\d{2}:\d{2}$/.test(e.schedule_time)?e.schedule_time:t.scheduleTime,scheduleWeekday:e.schedule_weekday&&Mn.includes(e.schedule_weekday)?e.schedule_weekday:t.scheduleWeekday,sections:n.length>0?n:t.sections,notifyChannels:s.length>0?s:t.notifyChannels,newsTopics:r}}function Fl(e){const t=[];if(e.scheduleTime!==void 0&&(/^([01]\d|2[0-3]):[0-5]\d$/.test(e.scheduleTime)||t.push("scheduleTime must be HH:MM (e.g. 20:00)")),e.scheduleWeekday!==void 0&&e.scheduleWeekday!==null&&(Mn.includes(e.scheduleWeekday)||t.push(`scheduleWeekday must be one of: ${Mn.join(", ")}`)),e.sections!==void 0){const n=e.sections.filter(s=>!ha.includes(s));n.length>0&&t.push(`unknown section(s): ${n.join(", ")}`)}if(e.notifyChannels!==void 0){const n=e.notifyChannels.filter(s=>!ga.includes(s));n.length>0&&t.push(`unknown channel(s): ${n.join(", ")}`),e.notifyChannels.length===0&&t.push("at least one delivery channel is required")}return e.newsTopics!==void 0&&(e.newsTopics.length>5&&t.push("maximum 5 news topics allowed"),e.newsTopics.some(n=>n.length>50)&&t.push("each news topic must be 50 chars or less")),t}async function Wl(e,t){const n=await e.prepare("SELECT * FROM digest_configs WHERE user_id = ? ORDER BY kind ASC").bind(t).all(),s=new Map;for(const a of n.results||[])s.set(a.kind,ns(a));const r=[];for(const a of pa){const i=s.get(a);if(i)r.push(i);else{const o=hn(a);await fa(e,t,o),r.push(o)}}return r}async function ss(e,t,n){const s=await e.prepare("SELECT * FROM digest_configs WHERE user_id = ? AND kind = ?").bind(t,n).first();if(s)return ns(s);const r=hn(n);return await fa(e,t,r),r}async function fa(e,t,n){await e.prepare(`INSERT OR IGNORE INTO digest_configs
        (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(t,n.kind,n.enabled?1:0,n.scheduleTime,n.scheduleWeekday,JSON.stringify(n.sections),JSON.stringify(n.notifyChannels),n.newsTopics.join(", ")).run()}async function ya(e,t,n,s){await e.prepare(`INSERT INTO digest_configs
        (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, kind) DO UPDATE SET
         enabled = excluded.enabled,
         schedule_time = excluded.schedule_time,
         schedule_weekday = excluded.schedule_weekday,
         sections_json = excluded.sections_json,
         notify_channels_json = excluded.notify_channels_json,
         news_topics = excluded.news_topics,
         updated_at = CURRENT_TIMESTAMP`).bind(t,n,s.enabled?1:0,s.scheduleTime,s.scheduleWeekday,JSON.stringify(s.sections),JSON.stringify(s.notifyChannels),s.newsTopics.join(", ")).run()}function ql(e){return new un(e.db,e.userId,e.pinHash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET)}function Gl(e){return new ke(e.db,e.userId,e.pinHash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET)}function Ce(e,t,n=""){return{key:e,title:t,summary:n,items:[]}}function zl(e){return e?new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):""}async function va(e,t,n,s,r){try{const o=(await ql(e).listEvents("primary",{timeMin:s,timeMax:r,maxResults:50})).map(c=>{var u,p,y,g,f;const d=((u=c.start)==null?void 0:u.dateTime)||((p=c.start)==null?void 0:p.date)||"";return{key:c.id||`cal-${d}-${c.summary}`,text:`${zl(d)} ${c.summary||"Untitled Event"}${c.location?` @ ${c.location}`:""}`,metadata:{title:c.summary,startTime:d,endTime:((y=c.end)==null?void 0:y.dateTime)||((g=c.end)==null?void 0:g.date)||"",location:c.location,attendees:(f=c.attendees)==null?void 0:f.map(w=>w.displayName||w.email)}}}),l=o.length===0?"Nothing scheduled":`${o.length} event${o.length===1?"":"s"}`;return{key:t,title:n,summary:l,items:o}}catch(a){return console.error(`[digest:calendar:${t}] fetch error:`,a==null?void 0:a.message),Ce(t,n)}}const Kl={key:"calendar_today",title:"Today",appliesTo:e=>e==="morning"||e==="email",fetch:e=>va(e,"calendar_today","Today",e.periodStart,e.periodEnd)},Yl={key:"calendar_tomorrow",title:"Tomorrow",appliesTo:e=>e==="evening",fetch:e=>{const t=new Date(e.periodEnd);t.setSeconds(t.getSeconds()+1);const n=new Date(t);return n.setHours(23,59,59,999),va(e,"calendar_tomorrow","Tomorrow",t.toISOString(),n.toISOString())}},Jl={key:"gmail_summary",title:"Gmail",appliesTo:()=>!0,fetch:async e=>{try{const t=Gl(e),n=await t.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),s=await t.listMessages({query:"is:important is:unread",maxResults:10}),r={};for(const l of n){const c=l.from.split("<")[0].trim()||l.from;r[c]=(r[c]||0)+1}const a=Object.entries(r).sort(([,l],[,c])=>c-l).slice(0,5).map(([l])=>l),i=n.some(l=>l.subject.toLowerCase().includes("urgent")||l.subject.toLowerCase().includes("asap")||l.subject.toLowerCase().includes("immediately"));if(n.length===0)return{key:"gmail_summary",title:"Gmail",summary:"Inbox clear",items:[]};const o=[`📬 ${n.length} unread`];return s.length>0&&o.push(`★ ${s.length} important`),i&&o.push("⚠️ Urgent messages present"),a.length>0&&o.push(`From: ${a.slice(0,3).join(", ")}`),{key:"gmail_summary",title:"Gmail",summary:o.join(" · "),items:[{key:"gmail-unread",text:`Review ${n.length} unread Gmail messages`,metadata:{source:"gmail",count:n.length,importantCount:s.length,hasUrgent:i,topSenders:a}}]}}catch(t){return console.error("[digest:gmail_summary] fetch error:",t==null?void 0:t.message),Ce("gmail_summary","Gmail")}}},Vl={key:"tasks_due",title:"Tasks",appliesTo:()=>!0,fetch:async e=>{try{const t=await e.db.prepare(`SELECT title, content, due_date
           FROM memory
           WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
           ORDER BY
             CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
             due_date ASC,
             importance DESC
           LIMIT 10`).bind(e.userId).all(),n=new Date,s=new Date(n);s.setDate(s.getDate()+1),s.setHours(23,59,59,999);const r=t.results||[],a=r.map(l=>{let c="";if(l.due_date){const d=new Date(l.due_date);c=d<=n?"overdue":d<=s?"due today":d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})}return{key:`task-${l.title}`,text:c?`${l.title} [${c}]`:l.title,metadata:{title:l.title,dueDate:l.due_date}}}),i=r.filter(l=>l.due_date?new Date(l.due_date)<=s:!1).length;return{key:"tasks_due",title:"Tasks",summary:a.length===0?"All clear":`${a.length} open${i>0?`, ${i} due today`:""}`,items:a}}catch(t){return console.error("[digest:tasks_due] fetch error:",t==null?void 0:t.message),Ce("tasks_due","Tasks")}}},Os=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function Zl(e,t){try{const n=Math.floor((Date.now()-1728e5)/1e3),s=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${n},points>10`,r=await fetch(s,{headers:{"User-Agent":"Karna/1.0"}});return r.ok?((await r.json()).hits||[]).filter(i=>i.url&&!t.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}async function Xl(e,t){const n=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],s=new Set;try{((await t.db.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(t.userId).all()).results||[]).forEach(l=>s.add(l.url))}catch{}const r=[];if(n.some(o=>Os.some(l=>o.toLowerCase().includes(l.toLowerCase())))){const o=n.find(c=>Os.some(d=>c.toLowerCase().includes(d.toLowerCase())))||"AI agents",l=await Zl(o,s);for(const c of l)r.push(c),s.add(c.url)}for(const o of n){if(r.length>=8)break;const l=`latest ${o} news today`;try{const c=await It(l,{num:5});if(c.results)for(const d of c.results){if(r.length>=8)break;s.has(d.link)||(r.push({title:d.title,summary:d.snippet,url:d.link,source:d.displayLink}),s.add(d.link))}}catch(c){console.error(`[digest:news] search error for "${l}":`,c==null?void 0:c.message)}}const i=r.slice(0,7);if(i.length>0)for(const o of i)try{await t.db.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(t.userId,o.url,o.title).run()}catch{}return i}const Ql={key:"news_ai",title:"Today's Signal",appliesTo:()=>!0,fetch:async e=>{try{const t=await Xl(e.newsTopics,e);if(t.length===0)return Ce("news_ai","Today's Signal","No new items");const n=t.map(s=>({key:`news-${s.url}`,text:`📰 ${s.title}`,metadata:{url:s.url,source:s.source,summary:s.summary}}));return{key:"news_ai",title:"Today's Signal",summary:`${t.length} items`,items:n}}catch(t){return console.error("[digest:news_ai] fetch error:",t==null?void 0:t.message),Ce("news_ai","Today's Signal")}}};function wa(e){return e?new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):""}const ec={key:"cron_jobs_today",title:"Today's Reminders",appliesTo:e=>e==="morning",fetch:async e=>{try{const s=((await e.db.prepare(`SELECT * FROM cron_jobs
           WHERE user_id = ? AND enabled = 1
           AND next_run IS NOT NULL AND next_run >= ? AND next_run <= ?
           ORDER BY next_run ASC`).bind(e.userId,e.periodStart,e.periodEnd).all()).results||[]).map(a=>({key:`cron-${a.id}`,text:`${wa(a.next_run)} ${a.name}`,metadata:{id:a.id,name:a.name,next_run:a.next_run,description:a.description}}));return{key:"cron_jobs_today",title:"Today's Reminders",summary:s.length===0?"No scheduled reminders":`${s.length} scheduled`,items:s}}catch(t){return console.error("[digest:cron_jobs_today] fetch error:",t==null?void 0:t.message),Ce("cron_jobs_today","Today's Reminders")}}},tc={key:"cron_completed",title:"Completed",appliesTo:e=>e==="weekly",fetch:async e=>{try{const n=(await e.db.prepare(`SELECT id, name, last_run FROM cron_jobs
           WHERE user_id = ? AND state = 'completed' AND last_run IS NOT NULL AND last_run >= ?
           ORDER BY last_run DESC LIMIT 20`).bind(e.userId,e.periodStart).all()).results||[],s=n.map(a=>({key:`cron-done-${a.id}`,text:a.name,metadata:{id:a.id,name:a.name,last_run:a.last_run}}));return{key:"cron_completed",title:"Completed",summary:`${n.length} completed`,items:s}}catch(t){return console.error("[digest:cron_completed] fetch error:",t==null?void 0:t.message),Ce("cron_completed","Completed")}}},nc={key:"cron_missed",title:"Missed / Overdue",appliesTo:e=>e==="weekly",fetch:async e=>{try{const s=((await e.db.prepare(`SELECT id, name, next_run FROM cron_jobs
           WHERE user_id = ? AND enabled = 1 AND next_run IS NOT NULL AND next_run < ?
           ORDER BY next_run DESC LIMIT 20`).bind(e.userId,e.periodEnd).all()).results||[]).map(a=>({key:`cron-missed-${a.id}`,text:`${a.name} (was due ${wa(a.next_run)})`,metadata:{id:a.id,name:a.name,next_run:a.next_run}}));return{key:"cron_missed",title:"Missed / Overdue",summary:s.length===0?"None missed":`${s.length} missed`,items:s}}catch(t){return console.error("[digest:cron_missed] fetch error:",t==null?void 0:t.message),Ce("cron_missed","Missed / Overdue")}}},sc={key:"action_items_open",title:"Pending Actions",appliesTo:()=>!0,fetch:async e=>{try{const s=((await e.db.prepare(`SELECT id, title, priority, type, due_at FROM action_items
           WHERE user_id = ? AND status = 'pending'
             AND type NOT IN ('email_digest', 'weekly_review')
           ORDER BY
             CASE priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'normal' THEN 2 ELSE 3 END,
             created_at DESC
           LIMIT 15`).bind(e.userId).all()).results||[]).map(a=>({key:`action-${a.id}`,text:`${a.title} (${a.priority})`,metadata:{id:a.id,title:a.title,priority:a.priority,type:a.type,due_at:a.due_at}}));return{key:"action_items_open",title:"Pending Actions",summary:s.length===0?"None":`${s.length} pending`,items:s}}catch(t){return console.error("[digest:action_items_open] fetch error:",t==null?void 0:t.message),Ce("action_items_open","Pending Actions")}}},rc={key:"documents_recent",title:"Recent Documents",appliesTo:e=>e==="weekly",fetch:async e=>{try{const s=((await e.db.prepare(`SELECT id, name, status, created_at FROM document_library
           WHERE user_id = ? AND created_at >= ?
           ORDER BY created_at DESC LIMIT 10`).bind(e.userId,e.periodStart).all()).results||[]).map(a=>({key:`doc-${a.id}`,text:`${a.name} (${a.status})`,metadata:{id:a.id,name:a.name,status:a.status,created_at:a.created_at}}));return{key:"documents_recent",title:"Recent Documents",summary:s.length===0?"None this week":`${s.length} this week`,items:s}}catch(t){return console.error("[digest:documents_recent] fetch error:",t==null?void 0:t.message),Ce("documents_recent","Recent Documents")}}},ac={key:"outlook_summary",title:"Outlook",appliesTo:e=>e==="email",fetch:async e=>{try{const t=await e.db.prepare(`SELECT name, encrypted_blob FROM site_credentials
           WHERE user_id = ?
             AND (name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE)
           LIMIT 1`).bind(e.userId,"%Outlook%","%Microsoft%","%Office 365%").first();if(!t)return{key:"outlook_summary",title:"Outlook",summary:"No Outlook credentials saved. Add them in Settings → Secret Vault.",items:[]};const n=await e.db.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(e.userId,"browser_use_api_key").first();if(!n)return{key:"outlook_summary",title:"Outlook",summary:"Browser Use API key not configured. Add it in Settings → API Keys.",items:[]};const s=(await G(n.encrypted_value,e.pinHash)).trim(),r=JSON.parse(await G(t.encrypted_blob,e.pinHash)),a=await Fn("Go to https://outlook.live.com or https://outlook.office.com. Log in with username {username} and password {password} if prompted. Navigate to the inbox and extract the 10 most recent emails with sender, subject, date, and snippet. Return the results as structured text.",s,{secrets:{username:r.username,password:r.password},timeoutMs:3e5});return a.status==="completed"&&a.output?{key:"outlook_summary",title:"Outlook",summary:"Inbox fetched",items:[{key:"outlook-inbox",text:"See digest for recent Outlook messages",metadata:{source:"outlook",output:a.output}}]}:a.status==="timeout"?{key:"outlook_summary",title:"Outlook",summary:"Browser task timed out.",items:[]}:{key:"outlook_summary",title:"Outlook",summary:"Outlook returned no content.",items:[]}}catch(t){return console.error("[digest:outlook_summary] fetch error:",t==null?void 0:t.message),Ce("outlook_summary","Outlook")}}},_a={calendar_today:Kl,calendar_tomorrow:Yl,gmail_summary:Jl,outlook_summary:ac,tasks_due:Vl,news_ai:Ql,cron_jobs_today:ec,cron_completed:tc,cron_missed:nc,action_items_open:sc,documents_recent:rc};function ic(e){return _a[e]}function oc(){return Object.values(_a)}function lc(e,t=new Date){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function cc(e,t,n=new Date,s=5){const r=new Date(n.toLocaleString("en-US",{timeZone:t||"Asia/Kolkata"})),a=r.getHours(),i=r.getMinutes(),[o,l]=e.scheduleTime.split(":").map(Number);if(!Number.isFinite(o)||!Number.isFinite(l)||e.scheduleWeekday&&r.toLocaleDateString("en-US",{weekday:"long"})!==e.scheduleWeekday)return!1;const c=a*60+i,d=o*60+l,u=c-d;return u>=0&&u<s}async function dc(e){const t=await e.prepare(`SELECT c.id, c.user_id, c.kind, c.enabled, c.schedule_time, c.schedule_weekday,
              c.sections_json, c.notify_channels_json, c.news_topics,
              c.created_at, c.updated_at,
              COALESCE(u.timezone, 'Asia/Kolkata') as timezone
       FROM digest_configs c
       JOIN users u ON u.id = c.user_id
       WHERE c.enabled = 1`).all(),n=[];for(const s of t.results||[]){const r=ns(s);n.push({userId:s.user_id,timezone:s.timezone||"Asia/Kolkata",config:r})}return n}async function uc(e,t,n,s){return!!await e.prepare("SELECT 1 FROM digests WHERE user_id = ? AND kind = ? AND local_date = ? LIMIT 1").bind(t,n,s).first()}const ba={morning:"☀️",evening:"🗓",weekly:"📊",email:"📧"},Ea={morning:"Morning Briefing",evening:"Evening Brief",weekly:"Weekly Review",email:"Email Digest"};function Ta(e){const t=new Date(e.period.start),n=new Date(e.period.end),s=t.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),r=n.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});return s===r?s:`${s} – ${r}`}function mc(e){const[t,n]=e.split(":"),s=parseInt(t,10),r=n||"00",a=s>=12?"PM":"AM";return`${s===0?12:s>12?s-12:s}:${r} ${a}`}function pc(e,t){const n=[];if(n.push(`${ba[t.kind]} ${Ea[t.kind]} — ${mc(t.scheduleTime)} · ${Ta(e)}`),n.push(""),e.highlights.length>0){for(const s of e.highlights)n.push(`▸ ${s}`);n.push("")}for(const s of e.sections){n.push(`${s.title}: ${s.summary}`);for(const r of s.items.slice(0,5))n.push(`   • ${r.text.substring(0,90)}${r.text.length>90?"…":""}`);n.push("")}return n.join(`
`).trimEnd()}function hc(e,t){const n=`${ba[t.kind]} ${Ea[t.kind]} · ${Ta(e)}`;return e.highlights.length>0?`${n} — ${e.highlights[0]}`:n}function gc(e,t){const n=[];for(const s of e.slice(0,10))n.push([{text:`☐ ${s.text.substring(0,40)}${s.text.length>40?"...":""}`,callback_data:`digest_toggle:${s.key}:${t}`}]);return n}const fc=1e4;async function Cs(e,t){const n=new AbortController,s=setTimeout(()=>n.abort(),fc);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(s)}}async function Sa(e,t,n,s,r){const a=[],i=pc(t,{kind:r.kind,scheduleTime:r.scheduleTime}),o=hc(t,{kind:r.kind,scheduleTime:r.scheduleTime}),l=r.channels.includes("web"),c=r.channels.includes("ntfy"),d=r.channels.includes("telegram");if(l||c)try{await We(e,r.userId,o,i,{pinHash:r.pinHash,tags:["digest","karna"]}),l&&a.push("web"),c&&a.push("ntfy")}catch(u){Yn("deliverDigest: notify failed",{userId:r.userId,error:u==null?void 0:u.message}),l&&a.push("web")}return d&&r.telegramChatId&&await yc(e,r,i,n,s)&&a.push("telegram"),{deliveredChannels:a,digestId:s}}async function yc(e,t,n,s,r){try{const a=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.userId).first();if(!a)return!1;const i=await G(a.encrypted_value,a.pin_hash);if(!(i!=null&&i.trim()))return Yn("sendTelegramDigest: empty bot token",{userId:t.userId}),!1;const o=gc(s,r),l={chat_id:t.telegramChatId,text:n.substring(0,4e3),parse_mode:"Markdown"};if(o.length>0&&(l.reply_markup={inline_keyboard:o}),(await(await Cs(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})).json()).ok)return!0;const u={chat_id:t.telegramChatId,text:String(l.text).replace(/[_*[`\]]/g,"")};o.length>0&&(u.reply_markup={inline_keyboard:o});const y=await(await Cs(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)})).json();return y.ok?!0:(Bt("Telegram digest send failed",{description:y.description,chatId:t.telegramChatId}),!1)}catch(a){return Bt("Telegram digest error",{error:(a==null?void 0:a.message)||String(a)}),!1}}const vc=Object.freeze(Object.defineProperty({__proto__:null,deliverDigest:Sa},Symbol.toStringTag,{value:"Module"}));function wc(e,t,n=new Date){const s=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(n),r=p=>{var y;return((y=s.find(g=>g.type===p))==null?void 0:y.value)||"0"},a=Number(r("year")),i=Number(r("month")),o=Number(r("day")),c=Date.UTC(a,i-1,o,Number(r("hour")),Number(r("minute")),Number(r("second")))-n.getTime(),d=Date.UTC(a,i-1,o,0,0,0,0),u=Date.UTC(a,i-1,o,23,59,59,999);if(e==="weekly"){const p=d-5184e5;return{start:new Date(p-c).toISOString(),end:new Date(u-c).toISOString()}}return{start:new Date(d-c).toISOString(),end:new Date(u-c).toISOString()}}function _c(e){const t=[];for(const n of e){if(t.length>=3)break;!n.summary||n.summary==="Nothing scheduled"||n.summary==="All clear"||n.summary==="None"||n.summary==="Inbox clear"||t.push(`${n.title}: ${n.summary}`)}return t}async function ka(e,t,n,s,r){const a=t.timezone||"Asia/Kolkata",i=await ss(e,t.id,n),o=new Date,l=lc(a,o);if(!(r!=null&&r.force)&&await uc(e,t.id,n,l)){const L=await As(e,t.id,n,l);if(L)return{digestId:L.digest.id,content:L.digest.content,items:[],deliveredChannels:L.digest.delivered_channels||"",skipped:!0}}const{start:c,end:d}=wc(n,a,o),u={db:e,userId:t.id,pinHash:t.pin_hash,timezone:a,kind:n,periodStart:c,periodEnd:d,newsTopics:i.newsTopics,env:s},p=await Promise.all(i.sections.map(async x=>{const L=ic(x);if(!L)return null;try{return await L.fetch(u)}catch(I){return console.error(`[digest:${n}] section ${x} failed:`,I==null?void 0:I.message),null}})),y={generatedAt:o.toISOString(),period:{start:c,end:d},sections:p.filter(x=>x!==null),highlights:[]};y.highlights=_c(y.sections);const g=[];let f=0;for(const x of y.sections)for(const L of x.items)g.push({section:x.key,key:L.key,text:L.text,metadata:L.metadata,sortOrder:f++});const w=await e.prepare(`INSERT OR IGNORE INTO digests (user_id, kind, content_json, period_start, period_end, local_date)
       VALUES (?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,n,JSON.stringify(y),c,d,l).first();let _=(w==null?void 0:w.id)||0,T="";if(_===0){const x=await As(e,t.id,n,l);x&&(_=x.digest.id,T=x.digest.delivered_channels||"")}else{for(const x of g)await e.prepare(`INSERT INTO digest_items (digest_id, section, item_key, text, metadata, sort_order)
           VALUES (?, ?, ?, ?, ?, ?)`).bind(_,x.section,x.key,x.text,JSON.stringify(x.metadata),x.sortOrder).run();(r==null?void 0:r.deliver)!==!1&&(T=(await Sa(e,y,g,_,{userId:t.id,pinHash:t.pin_hash,telegramChatId:t.telegram_chat_id,kind:n,scheduleTime:i.scheduleTime,channels:i.notifyChannels})).deliveredChannels.join(","),await e.prepare("UPDATE digests SET delivered_channels = ? WHERE id = ?").bind(T,_).run())}return{digestId:_,content:y,items:g,deliveredChannels:T,skipped:_!==0&&g.length===0&&!(r!=null&&r.force)}}async function xa(e,t){const n=await t.prepare("SELECT * FROM digest_items WHERE digest_id = ? ORDER BY sort_order ASC").bind(e.id).all();return{digest:{id:e.id,user_id:e.user_id,kind:e.kind,content:JSON.parse(e.content_json||"{}"),period_start:e.period_start,period_end:e.period_end,local_date:e.local_date,delivered_channels:e.delivered_channels||"",created_at:e.created_at},items:(n.results||[]).map(s=>({id:s.id,section:s.section,item_key:s.item_key,text:s.text,metadata:JSON.parse(s.metadata||"{}"),checked:s.checked,checked_at:s.checked_at,sort_order:s.sort_order}))}}async function Da(e,t,n){const s=await e.prepare("SELECT * FROM digests WHERE id = ? AND user_id = ?").bind(n,t).first();return s?xa(s,e):null}async function As(e,t,n,s){const r=await e.prepare("SELECT * FROM digests WHERE user_id = ? AND kind = ? AND local_date = ? LIMIT 1").bind(t,n,s).first();return r?xa(r,e):null}async function bc(e,t,n,s){if(!await e.prepare("SELECT id FROM digests WHERE id = ? AND user_id = ?").bind(n,t).first())return null;const a=await e.prepare("SELECT checked FROM digest_items WHERE id = ? AND digest_id = ?").bind(s,n).first();if(!a)return null;const i=a.checked?0:1;return await e.prepare(`UPDATE digest_items
       SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
       WHERE id = ? AND digest_id = ?`).bind(i,i,s,n).run(),{checked:i===1}}async function Ec(e,t,n=20,s){let r="SELECT * FROM digests WHERE user_id = ?";const a=[t];return s&&(r+=" AND kind = ?",a.push(s)),r+=" ORDER BY created_at DESC LIMIT ?",a.push(n),((await e.prepare(r).bind(...a).all()).results||[]).map(o=>({id:o.id,user_id:o.user_id,kind:o.kind,content:JSON.parse(o.content_json||"{}"),period_start:o.period_start,period_end:o.period_end,local_date:o.local_date,delivered_channels:o.delivered_channels||"",created_at:o.created_at}))}async function Tc(e,t,n){await e.prepare("DELETE FROM digests WHERE id = ? AND user_id = ?").bind(n,t).run()}const Ee=new be;async function Sc(e,t){var r;if(e.req.path.includes("/cron/"))return t();const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}Ee.use("/*",Sc);function Ra(e){const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";return t===n}Ee.get("/",async e=>{const t=e.get("user"),n=Math.min(parseInt(e.req.query("limit")||"20"),100),s=e.req.query("kind"),a=s&&["morning","evening","weekly","email"].includes(s)?s:void 0;try{const i=await Ec(e.env.DB,t.id,n,a);return e.json({digests:i})}catch(i){return e.json({error:i.message},500)}});Ee.get("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(!Number.isFinite(n))return e.json({error:"Invalid id"},400);try{const s=await Da(e.env.DB,t.id,n);return s?e.json(s):e.json({error:"Digest not found"},404)}catch(s){return e.json({error:s.message},500)}});Ee.post("/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=parseInt(e.req.param("itemId"));if(!Number.isFinite(n)||!Number.isFinite(s))return e.json({error:"Invalid id"},400);try{const r=await bc(e.env.DB,t.id,n,s);return r?e.json(r):e.json({error:"Item not found"},404)}catch(r){return e.json({error:r.message},500)}});Ee.post("/generate",async e=>{const t=e.get("user"),n=await e.req.json().catch(()=>({})),s=["morning","evening","weekly","email"],r=n.kind&&s.includes(n.kind)?n.kind:"evening";try{const a=await ka(e.env.DB,t,r,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET},{force:n.force===!0,deliver:!1});return e.json(a)}catch(a){return e.json({error:a.message},500)}});Ee.post("/:id/resend",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(!Number.isFinite(n))return e.json({error:"Invalid id"},400);try{const s=await Da(e.env.DB,t.id,n);if(!s)return e.json({error:"Digest not found"},404);const r=await ss(e.env.DB,t.id,s.digest.kind),a=s.items.map((c,d)=>({section:c.section,key:c.item_key,text:c.text,metadata:c.metadata,sortOrder:c.sort_order??d})),{deliverDigest:i}=await Promise.resolve().then(()=>vc),o=await i(e.env.DB,s.digest.content,a,n,{userId:t.id,pinHash:t.pin_hash,telegramChatId:t.telegram_chat_id,kind:s.digest.kind,scheduleTime:r.scheduleTime,channels:r.notifyChannels}),l=o.deliveredChannels.join(",");return await e.env.DB.prepare("UPDATE digests SET delivered_channels = ? WHERE id = ?").bind(l,n).run(),o.deliveredChannels.length===0?e.json({error:"No channels delivered — check Settings for ntfy/Telegram config"},500):e.json({success:!0,deliveredChannels:o.deliveredChannels})}catch(s){return e.json({error:s.message},500)}});Ee.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(!Number.isFinite(n))return e.json({error:"Invalid id"},400);try{return await Tc(e.env.DB,t.id,n),e.json({success:!0})}catch(s){return e.json({error:s.message},500)}});Ee.get("/configs",async e=>{const t=e.get("user");try{const n=await Wl(e.env.DB,t.id),s=oc().map(r=>({key:r.key,title:r.title,appliesTo:{morning:r.appliesTo("morning"),evening:r.appliesTo("evening"),weekly:r.appliesTo("weekly"),email:r.appliesTo("email")}}));return e.json({configs:n,sections:s})}catch(n){return e.json({error:n.message},500)}});Ee.put("/configs",async e=>{const t=e.get("user"),n=e.req.query("kind");if(!n||!["morning","evening","weekly","email"].includes(n))return e.json({error:"Invalid or missing ?kind= parameter"},400);const r=await e.req.json().catch(()=>({})),a=Fl({enabled:r.enabled,scheduleTime:r.scheduleTime,scheduleWeekday:r.scheduleWeekday,sections:r.sections,notifyChannels:r.notifyChannels,newsTopics:r.newsTopics});if(a.length>0)return e.json({error:a.join("; ")},400);try{const i=await ss(e.env.DB,t.id,n),o={kind:n,enabled:r.enabled??i.enabled,scheduleTime:r.scheduleTime??i.scheduleTime,scheduleWeekday:r.scheduleWeekday===void 0?i.scheduleWeekday:r.scheduleWeekday,sections:r.sections??i.sections,notifyChannels:r.notifyChannels??i.notifyChannels,newsTopics:r.newsTopics??i.newsTopics};return await ya(e.env.DB,t.id,n,o),e.json({success:!0,config:o})}catch(i){return e.json({error:i.message},500)}});Ee.post("/configs/reset",async e=>{const t=e.get("user"),n=e.req.query("kind");if(!n||!["morning","evening","weekly","email"].includes(n))return e.json({error:"Invalid or missing ?kind= parameter"},400);try{const r=Hl().find(a=>a.kind===n);return await ya(e.env.DB,t.id,n,r),e.json({success:!0,config:r})}catch(r){return e.json({error:r.message},500)}});Ee.post("/cron/tick",async e=>{if(!Ra(e))return e.json({error:"Unauthorized"},401);try{const t=await dc(e.env.DB),n=new Date,s=[],r=[...new Set(t.map(o=>o.userId))];if(r.length===0)return e.json({executed:0,results:[]});const a=await e.env.DB.prepare(`SELECT * FROM users WHERE id IN (${r.map(()=>"?").join(",")})`).bind(...r).all(),i=new Map;for(const o of a.results||[])i.set(o.id,o);for(const{userId:o,timezone:l,config:c}of t){if(!cc(c,l,n))continue;const d=i.get(o);if(d)try{const u=await ka(e.env.DB,d,c.kind,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET},{deliver:!0});s.push({user_id:o,kind:c.kind,status:u.skipped?"skipped":"success",digest_id:u.digestId,delivered_channels:u.deliveredChannels,schedule_time:c.scheduleTime,timezone:l})}catch(u){Bt("digest cron tick user error",{userId:o,kind:c.kind,error:u==null?void 0:u.message}),s.push({user_id:o,kind:c.kind,status:"error",error:u.message})}}return e.json({executed:s.length,results:s})}catch(t){return e.json({error:t.message},500)}});Ee.post("/cron/meeting-reminders",async e=>{if(!Ra(e))return e.json({error:"Unauthorized"},401);try{const t=await e.env.DB.prepare("SELECT * FROM users").all(),n=[],s=new Date,r=new Date(s.getTime()+600*1e3).toISOString(),a=new Date(s.getTime()+900*1e3).toISOString(),{decrypt:i}=await Promise.resolve().then(()=>Yt),{sendNotification:o}=await Promise.resolve().then(()=>ra);for(const l of t.results||[])try{const c=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!c)continue;const d=await i(c.encrypted_value,l.pin_hash),p=JSON.parse(d).access_token;if(!p)continue;const y=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(s.toISOString())}&timeMax=${encodeURIComponent(a)}&maxResults=10`,{headers:{Authorization:`Bearer ${p}`}});if(!y.ok)continue;const f=((await y.json()).items||[]).filter(w=>{var T;const _=(T=w.start)==null?void 0:T.dateTime;return _?_>=s.toISOString()&&_<=r:!1});if(f.length===0){n.push({user_id:l.id,reminders_sent:0});continue}for(const w of f){const _=new Date(w.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),T=w.location?`
📍 ${w.location}`:"",x="Meeting in 10 minutes",L=`${w.summary||"Untitled Event"}
🕐 ${_}${T}`;await o(e.env.DB,l.id,x,L,{pinHash:l.pin_hash,priority:"high",tags:["calendar","karna"]})}n.push({user_id:l.id,reminders_sent:f.length})}catch(c){n.push({user_id:l.id,status:"error",error:c.message})}return e.json({executed:n.length,results:n})}catch(t){return e.json({error:t.message},500)}});const ut=new be;async function Vt(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}function Na(e){return e.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"")}ut.post("/cron/review-low-confidence",async e=>{if((e.req.header("X-Cron-Secret")||"")!==(e.env.CRON_SECRET||"karna-cron-default-v1"))return e.json({error:"Unauthorized"},401);let n=0,s=0,r=0;try{const a=await e.env.DB.prepare(`SELECT DISTINCT u.id, u.pin_hash
       FROM users u
       JOIN user_skills us ON us.user_id = u.id
       WHERE us.is_auto = 1 AND us.enabled = 1
         AND us.confidence_score < 0.4 AND us.usage_count >= 5`).all();for(const i of a.results??[])try{const{provider:o}=await Qe(e.env.DB,i.id,i.pin_hash),l=await ko(e.env.DB,o,i.id);n+=l.reviewed,s+=l.rewritten,r+=l.disabled}catch{}}catch(a){return e.json({error:a.message,reviewed:n,rewritten:s,disabled:r},500)}return e.json({reviewed:n,rewritten:s,disabled:r})});ut.get("/",Vt,async e=>{const t=e.get("user"),s=(await e.env.DB.prepare(`SELECT id, name, slug, description, instructions, parameters, required_tools, examples,
            enabled, usage_count, last_used_at, created_at, updated_at,
            is_auto, refinement_count, source, confidence_score
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`).bind(t.id).all()).results||[],r=s.filter(i=>!i.is_auto),a=s.filter(i=>i.is_auto);return e.json({skills:r,auto_skills:a})});ut.post("/",Vt,async e=>{var c,d,u;const t=e.get("user"),n=await e.req.json();if(!((c=n.name)!=null&&c.trim()))return e.json({error:"name is required"},400);if(!((d=n.description)!=null&&d.trim()))return e.json({error:"description is required"},400);if(!((u=n.instructions)!=null&&u.trim()))return e.json({error:"instructions is required"},400);let s=Na(n.name);s||(s=`skill_${Date.now()}`);const r=await e.env.DB.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(t.id,`${s}%`).all();r.results&&r.results.length>0&&r.results.map(y=>y.slug).includes(s)&&(s=`${s}_${r.results.length+1}`);const a=JSON.stringify(n.parameters||{}),i=JSON.stringify(n.required_tools||[]),o=JSON.stringify(n.examples||[]),l=await e.env.DB.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,n.name.trim(),s,n.description.trim(),n.instructions.trim(),a,i,o).first();return e.json({skill:l,created:!0})});ut.get("/:id",Vt,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(isNaN(n))return e.json({error:"Invalid skill ID"},400);const s=await e.env.DB.prepare("SELECT * FROM user_skills WHERE id = ? AND user_id = ?").bind(n,t.id).first();return s?e.json({skill:s}):e.json({error:"Skill not found"},404)});ut.put("/:id",Vt,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(isNaN(n))return e.json({error:"Invalid skill ID"},400);const s=await e.req.json(),r=[],a=[];return s.name!==void 0&&(r.push("name = ?","slug = ?"),a.push(s.name.trim(),Na(s.name))),s.description!==void 0&&(r.push("description = ?"),a.push(s.description.trim())),s.instructions!==void 0&&(r.push("instructions = ?"),a.push(s.instructions.trim())),s.parameters!==void 0&&(r.push("parameters = ?"),a.push(JSON.stringify(s.parameters))),s.required_tools!==void 0&&(r.push("required_tools = ?"),a.push(JSON.stringify(s.required_tools))),s.examples!==void 0&&(r.push("examples = ?"),a.push(JSON.stringify(s.examples))),s.enabled!==void 0&&(r.push("enabled = ?"),a.push(s.enabled?1:0)),s.promote&&r.push("is_auto = 0","source = 'user'"),r.length===0?e.json({error:"Nothing to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),await e.env.DB.prepare(`UPDATE user_skills SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});ut.delete("/:id",Vt,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return isNaN(n)?e.json({error:"Invalid skill ID"},400):(await e.env.DB.prepare("DELETE FROM user_skills WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0}))});const et=new be;async function kc(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}et.use("/*",kc);function xc(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}function Ia(e){const t=xc(e),n=new Date(t);n.setDate(n.getDate()+1),n.setHours(9,0,0,0);const s=new Date(n.toLocaleString("en-US",{timeZone:"UTC"})),r=new Date(n.toLocaleString("en-US",{timeZone:e})),a=s.getTime()-r.getTime();return new Date(n.getTime()+a)}function gn(e){if(!e)return null;if(e.startsWith("cron:")){const t=parseInt(e.replace("cron:",""),10);return isNaN(t)?null:t}return null}et.put("/:id/done",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Notification not found"},404);const r=gn(s.source);return r&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0,cron_completed:r!==null})});et.post("/:id/snooze",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json(),r=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!r)return e.json({error:"Notification not found"},404);let a;if(typeof s.minutes=="number")a=new Date(Date.now()+s.minutes*60*1e3);else if(s.until==="tomorrow_morning")a=Ia(t.timezone||"UTC");else if(s.new_time)a=new Date(s.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(a.getTime()))return e.json({error:"Invalid time"},400);const i=a.toISOString(),o=gn(r.source);o&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(o,t.id).run();const l=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,r.title,r.body,"once",i,"reminder",JSON.stringify({description:r.body||""}),i,1,"active").first();return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0,job_id:l==null?void 0:l.id})});et.post("/:id/reschedule",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{new_time:s}=await e.req.json();if(!s)return e.json({error:"new_time is required"},400);const r=new Date(s);if(isNaN(r.getTime()))return e.json({error:"Invalid time"},400);const a=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!a)return e.json({error:"Notification not found"},404);const i=r.toISOString(),o=gn(a.source);if(o)return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,o,t.id).run(),e.json({success:!0,job_id:o});const l=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,a.title,a.body,"once",i,"reminder",JSON.stringify({description:a.body||""}),i,1,"active").first();return e.json({success:!0,job_id:l==null?void 0:l.id})});et.delete("/:id/cancel",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Notification not found"},404);const r=gn(s.source);return r&&await e.env.DB.prepare("UPDATE cron_jobs SET enabled = 0, state = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});et.post("/reminders/:id/snooze",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json();if(!await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first())return e.json({error:"Reminder not found"},404);let a;if(typeof s.minutes=="number")a=new Date(Date.now()+s.minutes*60*1e3);else if(s.until_tomorrow_9am)a=Ia(t.timezone||"UTC");else if(s.new_time)a=new Date(s.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(a.getTime()))return e.json({error:"Invalid time"},400);const i=a.toISOString();return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,n,t.id).run(),e.json({success:!0})});et.post("/reminders/:id/done",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first()?(await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE source = ? AND user_id = ?").bind(`cron:${n}`,t.id).run(),e.json({success:!0})):e.json({error:"Reminder not found"},404)});const Le=new be;function Dc(e){return e.split(`
`).filter(t=>!/^(system:|assistant:|ignore previous|follow these instructions|tool:)/i.test(t.trim())).join(`
`).slice(0,4e3)}async function Rc(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}Le.use("/*",Rc);Le.get("/",async e=>{const t=e.get("user"),n=e.req.query("status"),s=e.req.query("search"),r=["user_id = ?"],a=[t.id];n&&(r.push("status = ?"),a.push(n)),s&&(r.push("(name LIKE ? OR summary LIKE ?)"),a.push(`%${s}%`,`%${s}%`));const i=`SELECT * FROM document_library WHERE ${r.join(" AND ")} ORDER BY created_at DESC`,o=await e.env.DB.prepare(i).bind(...a).all();return e.json({documents:o.results||[]})});Le.get("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return s?e.json({document:s}):e.json({error:"Document not found"},404)});Le.post("/upload",async e=>{const t=e.get("user"),n=!!e.env.DOCUMENTS_BUCKET,s=n?100*1024*1024:700*1024;try{const a=(await e.req.formData()).get("file");if(!a)return e.json({error:"No file provided."},400);const i=a.name,o=a.type||"application/octet-stream",l=a.size;if(l>s)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead.`},400);const c=await a.arrayBuffer(),d=crypto.randomUUID();let u;n?(await e.env.DOCUMENTS_BUCKET.put(d,c,{httpMetadata:{contentType:o},customMetadata:{fileName:i,userId:String(t.id)}}),u="r2"):u=Buffer.from(c).toString("base64"),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(d,t.id,i,o,u,l).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,d,"upload",i,o,l,"uploaded").run();const p=o==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||i.toLowerCase().endsWith(".docx");if(p)try{const{extractDocxTextFromBuffer:g}=await Promise.resolve().then(()=>$r),f=await g(Buffer.from(c));if(f.length>50){await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(f,d).run();const w=f.substring(0,600);await e.env.DB.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(w,f.substring(0,5e4),d,t.id).run();const _=e.env,T=t.id,x=f,L=d,I=(async()=>{try{const M=await _.DB.prepare("SELECT id FROM document_library WHERE file_id = ? AND user_id = ?").bind(L,T).first();if(M){const{indexDocumentChunks:j}=await Promise.resolve().then(()=>Ve);await j({DB:_.DB,AI:_.AI,VECTORIZE:_.VECTORIZE},T,M.id,x)}}catch{}})();try{e.executionCtx.waitUntil(I)}catch{}}}catch{}const y=o==="application/pdf"||i.toLowerCase().endsWith(".pdf");if(y&&t.pin_hash){const g=Buffer.from(c).toString("base64"),f=t.pin_hash,w=t.id,_=e.env.DB,T=e.env.DOCUMENTS_BUCKET,x=e.env,L=(async()=>{var I,M;try{let j=null,z="claude-sonnet-4-6";const{decrypt:W}=await Promise.resolve().then(()=>Yt);for(const Z of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const te=await _.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(w,Z).first();if(te){const oe=await W(te.encrypted_value,f),re=JSON.parse(oe);if(re.provider==="anthropic"){j=re.apiKey,re.model&&(z=re.model);break}}}catch{}if(!j)return;let ne=g;if(u==="r2"&&T){const Z=await T.get(d);if(!Z)return;ne=Buffer.from(await Z.arrayBuffer()).toString("base64")}const P=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":j,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:z,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:ne}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!P.ok)return;const q=((M=(I=(await P.json()).content)==null?void 0:I[0])==null?void 0:M.text)||"";if(q){await _.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(q,d).run();const Z=q.substring(0,600);await _.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(Z,q.substring(0,5e4),d,w).run();try{const te=await _.prepare("SELECT id FROM document_library WHERE file_id = ? AND user_id = ?").bind(d,w).first();if(te){const{indexDocumentChunks:oe}=await Promise.resolve().then(()=>Ve);await oe({DB:_,AI:x.AI,VECTORIZE:x.VECTORIZE},w,te.id,q)}}catch{}}}catch{}})();try{e.executionCtx.waitUntil(L)}catch{}}return e.json({file_id:d,name:i,type:o,size:l,storage:n?"r2":"d1",extracting:y&&!p})}catch(r){return console.error("Document upload error:",r),e.json({error:`Upload failed: ${r.message||"Unknown error"}`},500)}});Le.post("/search",async e=>{const t=e.get("user"),n=await e.req.json();if(!n.query)return e.json({error:"query is required"},400);const{semanticDocumentSearch:s}=await Promise.resolve().then(()=>Ve),r=await s({DB:e.env.DB,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE},t.id,n.query,Math.min(n.limit||5,20));return e.json({results:r})});Le.post("/chat",async e=>{var o;const t=e.get("user"),n=await e.req.json(),s=(n.question||n.query||"").trim();if(!s)return e.json({error:"question is required"},400);const{semanticDocumentSearch:r}=await Promise.resolve().then(()=>Ve),a=await r({DB:e.env.DB,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE},t.id,s,6);let i;if(a.length===0)i="No relevant document content found for your question. Make sure your documents have been uploaded and processed first.";else{const l=a.map((c,d)=>`[Source ${d+1}: ${c.filename} | chunk ${c.chunk_index}]
${Dc(c.chunk)}`).join(`

---

`);try{const{provider:c}=await Qe(e.env.DB,t.id,t.pin_hash);i=((o=(await c.chat([{role:"system",content:"Answer using only the provided excerpts. For every key statement, cite sources as [S1], [S2], etc. Do not fabricate citations."},{role:"user",content:`Document excerpts:

${l}

Question: ${s}`}],{maxTokens:1024})).content)==null?void 0:o.trim())||"Could not generate an answer."}catch{i="Unable to generate an answer at this time. Please try again."}}return e.json({answer:i,session_id:n.session_id||crypto.randomUUID(),sources:a.map((l,c)=>({source_id:`S${c+1}`,filename:l.filename,chunk_index:l.chunk_index,relevance_score:l.relevance_score,retrieval_method:l.retrieval_method}))})});Le.post("/",async e=>{const t=e.get("user"),n=await e.req.json();if(!n.name||typeof n.name!="string")return e.json({error:"name is required"},400);const s=n.source||"upload",r=n.mime_type||"application/octet-stream",a=typeof n.size=="number"?n.size:0,i=await e.env.DB.prepare(`INSERT INTO document_library (user_id, name, source, file_id, drive_file_id, mime_type, size, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,n.name,s,n.file_id||null,n.drive_file_id||null,r,a,"uploaded").first();return e.json({success:!0,document:i})});Le.post("/:id/summarize",async e=>{var c;const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Document not found"},404);let r=null;if(s.file_id){const d=await e.env.DB.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(s.file_id,t.id).first();r=(d==null?void 0:d.extracted_text)||null}let a=null;if(r)try{const{provider:d}=await Qe(e.env.DB,t.id,t.pin_hash);a=((c=(await d.chat([{role:"system",content:"You are a helpful assistant that summarizes documents concisely."},{role:"user",content:`Summarize the following document in a few paragraphs:

${r.substring(0,8e3)}`}],{maxTokens:1024})).content)==null?void 0:c.trim())||null}catch{a=null}const i=a||"Summary not yet generated. Ask Karna in chat to summarize this document.";await e.env.DB.prepare("UPDATE document_library SET status = ?, summary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("summarized",i,n,t.id).run();const l=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return e.json({success:!0,document:l})});Le.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});Le.post("/:id/parse",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));await e.env.DB.prepare("UPDATE document_library SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("parsed",n,t.id).run();const s=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return e.json({success:!0,document:s})});const xe=new be;async function Nc(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}xe.use("/*",Nc);xe.get("/review",async e=>{const t=e.get("user"),n=e.req.query("tier"),s=e.req.query("type"),r=e.req.query("search"),a=parseInt(e.req.query("limit")||"50");let i="SELECT * FROM memory WHERE user_id = ?";const o=[t.id];n&&(i+=" AND tier = ?",o.push(n)),s&&(i+=" AND type = ?",o.push(s)),r&&(i+=" AND (title LIKE ? OR content LIKE ?)",o.push(`%${r}%`,`%${r}%`)),i+=" ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?",o.push(a);const l=await e.env.DB.prepare(i).bind(...o).all(),c=await e.env.DB.prepare("SELECT tier, COUNT(*) as cnt FROM memory WHERE user_id = ? GROUP BY tier").bind(t.id).all(),d={working:0,long_term:0};for(const u of c.results||[])d[u.tier]=u.cnt;return e.json({memories:l.results||[],tier_counts:d})});xe.put("/review/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json(),r=[],a=[];return s.title!==void 0&&(r.push("title = ?"),a.push(s.title)),s.content!==void 0&&(r.push("content = ?"),a.push(s.content)),s.importance!==void 0&&(r.push("importance = ?"),a.push(s.importance)),s.tier!==void 0&&(r.push("tier = ?"),a.push(s.tier)),r.length===0?e.json({error:"Nothing to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),await e.env.DB.prepare(`UPDATE memory SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});xe.post("/review/:id/promote",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new Q(e.env.DB).promote(n,t.id),e.json({success:!0})});xe.post("/review/:id/demote",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new Q(e.env.DB).demote(n,t.id),e.json({success:!0})});xe.delete("/review/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new Q(e.env.DB).remove(n,t.id),e.json({success:!0})});xe.get("/suggestions",async e=>{const t=e.get("user"),n=e.req.query("status")||"pending",s=parseInt(e.req.query("limit")||"50"),r=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT ?").bind(t.id,n,s).all();return e.json({suggestions:r.results||[]})});xe.post("/suggestions/:id/accept",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(n,t.id).first();return s?(await new Q(e.env.DB).store(t.id,s.type,s.title,s.content,s.importance,"long_term"),await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'accepted', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});xe.post("/suggestions/:id/reject",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT id FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(n,t.id).first()?(await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'rejected', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});xe.post("/suggestions",async e=>{const t=e.get("user"),{type:n,title:s,content:r,importance:a,source_message_id:i}=await e.req.json();if(!n||!s||!r)return e.json({error:"type, title, and content are required"},400);const o=await e.env.DB.prepare("INSERT INTO memory_suggestions (user_id, type, title, content, importance, status, source_message_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id").bind(t.id,n,s,r,a??5,"pending",i||null).first();return e.json({success:!0,id:o==null?void 0:o.id})});xe.post("/migrate-documents-out",async e=>{const t=e.get("user"),s=(await e.env.DB.prepare(`
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
  `).bind(t.id).all()).results||[];if(s.length===0)return e.json({migrated:0,skipped:0,samples:[],message:"No oversized memory entries found."});let r=0,a=0;const i=[];for(const o of s){if(["preference","fact","context","decision"].includes(o.type)){a++;continue}const l=o.content.length>1500,c=/\b(essay|article|draft|report|chapter)\b/i.test(o.content)&&o.content.length>500;if(!l&&!c){a++;continue}try{const d=o.content.substring(0,500),u=o.content.substring(0,5e4);await e.env.DB.prepare(`
        INSERT INTO document_library (user_id, source, name, summary, extracted_text, status)
        VALUES (?, 'memory_migration', ?, ?, ?, 'parsed')
      `).bind(t.id,o.title,d,u).run();const p=`[Migrated to Document Library] ${o.title} — content moved to Document Library. Search for it with search_library("${o.title.substring(0,40)}").`;await e.env.DB.prepare("UPDATE memory SET content = ?, importance = 4, tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(p,o.id,t.id).run(),r++,i.length<5&&i.push({id:o.id,title:o.title,action:"migrated to document_library, memory demoted to pointer"})}catch{a++}}return e.json({migrated:r,skipped:a,samples:i,message:`Moved ${r} bulky memory entries to Document Library. ${a} entries were skipped (too short or migration error).`})});const mt=new be;async function Ic(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}mt.use("/*",Ic);function fn(e){return{id:e.id,title:e.title||"",content:e.content,tags:e.tags||"",source:e.source,source_query:e.source_query||"",is_pinned:e.is_pinned?1:0,created_at:e.created_at,updated_at:e.updated_at}}mt.get("/",async e=>{const t=e.get("user"),n=Math.min(parseInt(e.req.query("limit")||"50",10)||50,200),s=parseInt(e.req.query("offset")||"0",10)||0,r=e.req.query("tag"),a=e.req.query("pinned_only")==="true"||e.req.query("pinned_only")==="1",i=["user_id = ?"],o=[t.id];r&&(i.push("tags LIKE ?"),o.push(`%${r}%`)),a&&i.push("is_pinned = 1");const l=i.join(" AND "),c=await e.env.DB.prepare(`SELECT COUNT(*) as total FROM notes WHERE ${l}`).bind(...o).first();o.push(n,s);const d=await e.env.DB.prepare(`SELECT * FROM notes WHERE ${l} ORDER BY is_pinned DESC, updated_at DESC LIMIT ? OFFSET ?`).bind(...o).all();return e.json({notes:(d.results||[]).map(fn),total:(c==null?void 0:c.total)||0})});mt.get("/search",async e=>{const t=e.get("user"),n=(e.req.query("q")||"").trim();if(!n)return e.json({notes:[]});const s=`%${n}%`,r=await e.env.DB.prepare(`SELECT * FROM notes WHERE user_id = ? AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
     ORDER BY updated_at DESC LIMIT 50`).bind(t.id,s,s,s).all();return e.json({notes:(r.results||[]).map(fn)})});mt.post("/",async e=>{const t=e.get("user"),n=await e.req.json(),s=(n.content||"").trim();if(!s)return e.json({error:"content is required"},400);const r=n.source&&["manual","research","chat"].includes(n.source)?n.source:"manual",a=n.is_pinned?1:0,i=await e.env.DB.prepare(`INSERT INTO notes (user_id, title, content, tags, source, source_query, is_pinned)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     RETURNING *`).bind(t.id,(n.title||"").trim(),s,(n.tags||"").trim(),r,(n.source_query||"").trim(),a).first();return e.json({note:fn(i)})});mt.put("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"),10);if(!n)return e.json({error:"Invalid note id"},400);if(!await e.env.DB.prepare("SELECT id FROM notes WHERE id = ? AND user_id = ?").bind(n,t.id).first())return e.json({error:"Note not found"},404);const r=await e.req.json(),a=[],i=[];if(r.title!==void 0&&(a.push("title = ?"),i.push(r.title)),r.content!==void 0){const l=r.content.trim();if(!l)return e.json({error:"content cannot be empty"},400);a.push("content = ?"),i.push(l)}if(r.tags!==void 0&&(a.push("tags = ?"),i.push(r.tags)),r.is_pinned!==void 0&&(a.push("is_pinned = ?"),i.push(r.is_pinned?1:0)),a.length===0)return e.json({error:"No fields to update"},400);a.push("updated_at = CURRENT_TIMESTAMP"),i.push(n,t.id);const o=await e.env.DB.prepare(`UPDATE notes SET ${a.join(", ")} WHERE id = ? AND user_id = ? RETURNING *`).bind(...i).first();return e.json({note:fn(o)})});mt.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"),10);return n?(await e.env.DB.prepare("DELETE FROM notes WHERE id = ? AND user_id = ?").bind(n,t.id).run()).meta.changes?e.json({success:!0}):e.json({error:"Note not found"},404):e.json({error:"Invalid note id"},400)});const pe=new be,Oc=["/api/auth","/api/chat","/api/settings","/api/telegram","/api/system","/api/proactive","/api/digests","/api/skills","/api/notifications","/api/documents","/api/memory","/api/notes"];async function Cc(e){const t=e.env.RENDER_BACKEND_URL,n=e.env.RENDER_API_SECRET;if(!(e.env.ENABLE_RENDER_PROXY==="true")||!t||!n||e.req.header("x-via-render-worker")||!Oc.some(g=>e.req.path.startsWith(g)))return null;const a=new URL(e.req.url);a.protocol=new URL(t).protocol,a.host=new URL(t).host;const i=new Headers(e.req.header());i.set("x-render-api-secret",n);const o=e.req.path.startsWith("/api/chat")||e.req.path.startsWith("/api/telegram"),l=Number(e.env.RENDER_PROXY_TIMEOUT_MS_LONG||"310000"),c=Number(e.env.RENDER_PROXY_TIMEOUT_MS||"8000"),d=o?l:c,u=new AbortController,p=setTimeout(()=>u.abort("render-proxy-timeout"),d);let y;try{y=await fetch(a.toString(),{method:e.req.method,headers:i,body:e.req.method==="GET"||e.req.method==="HEAD"?void 0:await e.req.arrayBuffer(),signal:u.signal})}catch(g){return e.json({error:"Render backend unavailable",detail:String(g)},503)}finally{clearTimeout(p)}return new Response(y.body,{status:y.status,headers:y.headers})}pe.use("/api/*",fi({exposeHeaders:["X-Thread-Id"]}));pe.use("/api/*",async(e,t)=>{const n=await Cc(e);if(n)return n;await t()});pe.route("/api/auth",Xe);pe.route("/api/chat",ce);pe.route("/api/settings",se);pe.route("/api/system",Ae);pe.route("/api/telegram",Jt);pe.route("/api/proactive",ye);pe.route("/api/digests",Ee);pe.route("/api/skills",ut);pe.route("/api/notifications",et);pe.route("/api/documents",Le);pe.route("/api/memory",xe);pe.route("/api/notes",mt);pe.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),n=t.searchParams.get("code"),s=t.searchParams.get("state"),r=t.searchParams.get("error");if(r)return e.html(ft(!1,`Google denied access: ${r}`));if(!n||!s)return e.html(ft(!1,"Missing authorization code or state parameter."));try{const i=JSON.parse(atob(s)).sessionId;if(!i)return e.html(ft(!1,"Invalid state parameter — missing session."));const o=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(i).first();if(!o)return e.html(ft(!1,"Session expired. Please log in again and retry."));const l=o.user_id,c=o.pin_hash,d=`${t.protocol}//${t.host}/auth/google/callback`,u=await fr(e.env.DB,l,c,n,d,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(ft(!0,`Connected as ${u.email}`,u.email))}catch(a){return e.html(ft(!1,`OAuth failed: ${a.message}`))}});pe.get("/preview-dashboard",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.html(Ai())));pe.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(nr(e.env.API_BASE_URL||""))));pe.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(nr(e.env.API_BASE_URL||""))));function ft(e,t,n){return`<!DOCTYPE html>
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
</body></html>`}const Ac={fetch:pe.fetch},Ls=new be,Lc=Object.assign({"/src/index.tsx":Ac});let Oa=!1;for(const[,e]of Object.entries(Lc))e&&(Ls.all("*",t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),Ls.notFound(t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),Oa=!0);if(!Oa)throw new Error("Can't import modules from ['/src/index.tsx']");function Ca(e){if(e.length<100)return e.trim()?[e.trim()]:[];const r=[];let a=0;for(;a<e.length;){let i=Math.min(a+1800,e.length);if(i<e.length){const l=e.lastIndexOf(`

`,i);if(l>a+1800/2)i=l+2;else{const c=e.lastIndexOf(". ",i);c>a+1800/2&&(i=c+2)}}const o=e.slice(a,i).trim();o.length>=100&&r.push(o),a=i-200,a<=0&&(a=i)}return r}async function Mc(e,t,n,s){if(!e.AI||!e.VECTORIZE)return;const r=Ca(s);if(r.length===0)return;const a=await e.DB.prepare("SELECT vector_id FROM document_chunks WHERE document_id = ?").bind(n).all();a.results.length>0&&(await e.VECTORIZE.deleteByIds(a.results.map(d=>d.vector_id)),await e.DB.prepare("DELETE FROM document_chunks WHERE document_id = ?").bind(n).run());const o=(await e.AI.run("@cf/baai/bge-large-en-v1.5",{text:r})).data,l=r.map((d,u)=>`doc_${n}_${u}`);await e.VECTORIZE.insert(r.map((d,u)=>({id:l[u],values:o[u],metadata:{userId:String(t),documentId:String(n)}})));const c=e.DB.prepare("INSERT INTO document_chunks (user_id, document_id, chunk_index, text, vector_id) VALUES (?, ?, ?, ?, ?)");await e.DB.batch(r.map((d,u)=>c.bind(t,n,u,d,l[u])))}async function $c(e,t,n,s=5){if(!e.AI||!e.VECTORIZE)return[];const a=(await e.AI.run("@cf/baai/bge-large-en-v1.5",{text:[n]})).data[0],i=await e.VECTORIZE.query(a,{topK:s*3,filter:{userId:String(t)}});if(!i.matches||i.matches.length===0)return[];const o=i.matches.map(f=>f.id),l=new Map(i.matches.map(f=>[f.id,f.score])),c=o.map(()=>"?").join(","),u=((await e.DB.prepare(`SELECT dc.text, dc.vector_id, dc.document_id, dl.name, dc.chunk_index
     FROM document_chunks dc
     JOIN document_library dl ON dc.document_id = dl.id
     WHERE dc.vector_id IN (${c}) AND dc.user_id = ?`).bind(...o,t).all()).results||[]).map(f=>({filename:f.name,relevance_score:l.get(f.vector_id)??0,chunk:f.text,document_id:f.document_id,chunk_index:f.chunk_index,retrieval_method:"vector"})),y=((await e.DB.prepare(`SELECT dc.text, dc.document_id, dc.chunk_index, dl.name
     FROM document_chunks dc
     JOIN document_library dl ON dc.document_id = dl.id
     WHERE dc.user_id = ? AND dc.text LIKE ?
     ORDER BY dc.chunk_index DESC
     LIMIT ?`).bind(t,`%${n.substring(0,80)}%`,s*2).all()).results||[]).map(f=>({filename:f.name,relevance_score:.55,chunk:f.text,document_id:f.document_id,chunk_index:f.chunk_index,retrieval_method:"keyword"})),g=new Map;for(const f of[...u,...y]){const w=`${f.document_id}:${f.chunk_index}`;if(!g.has(w))g.set(w,f);else{const _=g.get(w);g.set(w,{..._,relevance_score:Math.max(_.relevance_score,f.relevance_score),retrieval_method:"hybrid"})}}return[...g.values()].sort((f,w)=>w.relevance_score-f.relevance_score).slice(0,s)}const Ve=Object.freeze(Object.defineProperty({__proto__:null,chunkText:Ca,indexDocumentChunks:Mc,semanticDocumentSearch:$c},Symbol.toStringTag,{value:"Module"}));export{Ls as default};
