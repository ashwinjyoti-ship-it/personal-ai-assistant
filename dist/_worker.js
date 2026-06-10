var Ks=Object.defineProperty;var Ln=e=>{throw TypeError(e)};var Ys=(e,t,n)=>t in e?Ks(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var P=(e,t,n)=>Ys(e,typeof t!="symbol"?t+"":t,n),sn=(e,t,n)=>t.has(e)||Ln("Cannot "+n);var x=(e,t,n)=>(sn(e,t,"read from private field"),n?n.call(e):t.get(e)),V=(e,t,n)=>t.has(e)?Ln("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),F=(e,t,n,r)=>(sn(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),ne=(e,t,n)=>(sn(e,t,"access private method"),n);var Mn=(e,t,n,r)=>({set _(s){F(e,t,s,n)},get _(){return x(e,t,r)}});var $n=(e,t,n)=>(r,s)=>{let a=-1;return i(0);async function i(o){if(o<=a)throw new Error("next() called multiple times");a=o;let l,c=!1,d;if(e[o]?(d=e[o][0][0],r.req.routeIndex=o):d=o===e.length&&s||void 0,d)try{l=await d(r,()=>i(o+1))}catch(u){if(u instanceof Error&&t)r.error=u,l=await t(u,r),c=!0;else throw u}else r.finalized===!1&&n&&(l=await n(r));return l&&(r.finalized===!1||c)&&(r.res=l),r}},Js=Symbol(),Vs=async(e,t=Object.create(null))=>{const{all:n=!1,dot:r=!1}=t,a=(e instanceof yr?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?Zs(e,{all:n,dot:r}):{}};async function Zs(e,t){const n=await e.formData();return n?Xs(n,t):{}}function Xs(e,t){const n=Object.create(null);return e.forEach((r,s)=>{t.all||s.endsWith("[]")?Qs(n,s,r):n[s]=r}),t.dot&&Object.entries(n).forEach(([r,s])=>{r.includes(".")&&(ea(n,r,s),delete n[r])}),n}var Qs=(e,t,n)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]:t.endsWith("[]")?e[t]=[n]:e[t]=n},ea=(e,t,n)=>{let r=e;const s=t.split(".");s.forEach((a,i)=>{i===s.length-1?r[a]=n:((!r[a]||typeof r[a]!="object"||Array.isArray(r[a])||r[a]instanceof File)&&(r[a]=Object.create(null)),r=r[a])})},mr=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},ta=e=>{const{groups:t,path:n}=na(e),r=mr(n);return ra(r,t)},na=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(n,r)=>{const s=`@${r}`;return t.push([s,n]),s}),{groups:t,path:e}},ra=(e,t)=>{for(let n=t.length-1;n>=0;n--){const[r]=t[n];for(let s=e.length-1;s>=0;s--)if(e[s].includes(r)){e[s]=e[s].replace(r,t[n][1]);break}}return e},qt={},sa=(e,t)=>{if(e==="*")return"*";const n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const r=`${e}#${t}`;return qt[r]||(n[2]?qt[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,n[1],new RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],new RegExp(`^${n[2]}$`)]:qt[r]=[e,n[1],!0]),qt[r]}return null},_n=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return t(n)}catch{return n}})}},aa=e=>_n(e,decodeURI),pr=e=>{const t=e.url,n=t.indexOf("/",t.indexOf(":")+4);let r=n;for(;r<t.length;r++){const s=t.charCodeAt(r);if(s===37){const a=t.indexOf("?",r),i=t.indexOf("#",r),o=a===-1?i===-1?void 0:i:i===-1?a:Math.min(a,i),l=t.slice(n,o);return aa(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(s===63||s===35)break}return t.slice(n,r)},ia=e=>{const t=pr(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},mt=(e,t,...n)=>(n.length&&(t=mt(t,...n)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),hr=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),n=[];let r="";return t.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){n.length===0&&r===""?n.push("/"):n.push(r);const a=s.replace("?","");r+="/"+a,n.push(r)}else r+="/"+s}),n.filter((s,a,i)=>i.indexOf(s)===a)},an=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?_n(e,fr):e):e,gr=(e,t,n)=>{let r;if(!n&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const o=e.charCodeAt(i+t.length+1);if(o===61){const l=i+t.length+2,c=e.indexOf("&",l);return an(e.slice(l,c===-1?void 0:c))}else if(o==38||isNaN(o))return"";i=e.indexOf(`&${t}`,i+1)}if(r=/[%+]/.test(e),!r)return}const s={};r??(r=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let o=e.indexOf("=",a);o>i&&i!==-1&&(o=-1);let l=e.slice(a+1,o===-1?i===-1?void 0:i:o);if(r&&(l=an(l)),a=i,l==="")continue;let c;o===-1?c="":(c=e.slice(o+1,i===-1?void 0:i),r&&(c=an(c))),n?(s[l]&&Array.isArray(s[l])||(s[l]=[]),s[l].push(c)):s[l]??(s[l]=c)}return t?s[t]:s},oa=gr,la=(e,t)=>gr(e,t,!0),fr=decodeURIComponent,Pn=e=>_n(e,fr),ft,we,$e,vr,wr,pn,Be,ir,yr=(ir=class{constructor(e,t="/",n=[[]]){V(this,$e);P(this,"raw");V(this,ft);V(this,we);P(this,"routeIndex",0);P(this,"path");P(this,"bodyCache",{});V(this,Be,e=>{const{bodyCache:t,raw:n}=this,r=t[e];if(r)return r;const s=Object.keys(t)[0];return s?t[s].then(a=>(s==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=n[e]()});this.raw=e,this.path=t,F(this,we,n),F(this,ft,{})}param(e){return e?ne(this,$e,vr).call(this,e):ne(this,$e,wr).call(this)}query(e){return oa(this.url,e)}queries(e){return la(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((n,r)=>{t[r]=n}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Vs(this,e))}json(){return x(this,Be).call(this,"text").then(e=>JSON.parse(e))}text(){return x(this,Be).call(this,"text")}arrayBuffer(){return x(this,Be).call(this,"arrayBuffer")}blob(){return x(this,Be).call(this,"blob")}formData(){return x(this,Be).call(this,"formData")}addValidatedData(e,t){x(this,ft)[e]=t}valid(e){return x(this,ft)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Js](){return x(this,we)}get matchedRoutes(){return x(this,we)[0].map(([[,e]])=>e)}get routePath(){return x(this,we)[0].map(([[,e]])=>e)[this.routeIndex].path}},ft=new WeakMap,we=new WeakMap,$e=new WeakSet,vr=function(e){const t=x(this,we)[0][this.routeIndex][1][e],n=ne(this,$e,pn).call(this,t);return n&&/\%/.test(n)?Pn(n):n},wr=function(){const e={},t=Object.keys(x(this,we)[0][this.routeIndex][1]);for(const n of t){const r=ne(this,$e,pn).call(this,x(this,we)[0][this.routeIndex][1][n]);r!==void 0&&(e[n]=/\%/.test(r)?Pn(r):r)}return e},pn=function(e){return x(this,we)[1]?x(this,we)[1][e]:e},Be=new WeakMap,ir),ca={Stringify:1},br=async(e,t,n,r,s)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(s?s[0]+=e:s=[e],Promise.all(a.map(o=>o({phase:t,buffer:s,context:r}))).then(o=>Promise.all(o.filter(Boolean).map(l=>br(l,t,!1,r,s))).then(()=>s[0]))):Promise.resolve(e)},da="text/plain; charset=UTF-8",on=(e,t)=>({"Content-Type":e,...t}),Lt,Mt,Ce,yt,Ae,ve,$t,vt,wt,tt,Pt,Bt,je,pt,or,ua=(or=class{constructor(e,t){V(this,je);V(this,Lt);V(this,Mt);P(this,"env",{});V(this,Ce);P(this,"finalized",!1);P(this,"error");V(this,yt);V(this,Ae);V(this,ve);V(this,$t);V(this,vt);V(this,wt);V(this,tt);V(this,Pt);V(this,Bt);P(this,"render",(...e)=>(x(this,vt)??F(this,vt,t=>this.html(t)),x(this,vt).call(this,...e)));P(this,"setLayout",e=>F(this,$t,e));P(this,"getLayout",()=>x(this,$t));P(this,"setRenderer",e=>{F(this,vt,e)});P(this,"header",(e,t,n)=>{this.finalized&&F(this,ve,new Response(x(this,ve).body,x(this,ve)));const r=x(this,ve)?x(this,ve).headers:x(this,tt)??F(this,tt,new Headers);t===void 0?r.delete(e):n!=null&&n.append?r.append(e,t):r.set(e,t)});P(this,"status",e=>{F(this,yt,e)});P(this,"set",(e,t)=>{x(this,Ce)??F(this,Ce,new Map),x(this,Ce).set(e,t)});P(this,"get",e=>x(this,Ce)?x(this,Ce).get(e):void 0);P(this,"newResponse",(...e)=>ne(this,je,pt).call(this,...e));P(this,"body",(e,t,n)=>ne(this,je,pt).call(this,e,t,n));P(this,"text",(e,t,n)=>!x(this,tt)&&!x(this,yt)&&!t&&!n&&!this.finalized?new Response(e):ne(this,je,pt).call(this,e,t,on(da,n)));P(this,"json",(e,t,n)=>ne(this,je,pt).call(this,JSON.stringify(e),t,on("application/json",n)));P(this,"html",(e,t,n)=>{const r=s=>ne(this,je,pt).call(this,s,t,on("text/html; charset=UTF-8",n));return typeof e=="object"?br(e,ca.Stringify,!1,{}).then(r):r(e)});P(this,"redirect",(e,t)=>{const n=String(e);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)});P(this,"notFound",()=>(x(this,wt)??F(this,wt,()=>new Response),x(this,wt).call(this,this)));F(this,Lt,e),t&&(F(this,Ae,t.executionCtx),this.env=t.env,F(this,wt,t.notFoundHandler),F(this,Bt,t.path),F(this,Pt,t.matchResult))}get req(){return x(this,Mt)??F(this,Mt,new yr(x(this,Lt),x(this,Bt),x(this,Pt))),x(this,Mt)}get event(){if(x(this,Ae)&&"respondWith"in x(this,Ae))return x(this,Ae);throw Error("This context has no FetchEvent")}get executionCtx(){if(x(this,Ae))return x(this,Ae);throw Error("This context has no ExecutionContext")}get res(){return x(this,ve)||F(this,ve,new Response(null,{headers:x(this,tt)??F(this,tt,new Headers)}))}set res(e){if(x(this,ve)&&e){e=new Response(e.body,e);for(const[t,n]of x(this,ve).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=x(this,ve).headers.getSetCookie();e.headers.delete("set-cookie");for(const s of r)e.headers.append("set-cookie",s)}else e.headers.set(t,n)}F(this,ve,e),this.finalized=!0}get var(){return x(this,Ce)?Object.fromEntries(x(this,Ce)):{}}},Lt=new WeakMap,Mt=new WeakMap,Ce=new WeakMap,yt=new WeakMap,Ae=new WeakMap,ve=new WeakMap,$t=new WeakMap,vt=new WeakMap,wt=new WeakMap,tt=new WeakMap,Pt=new WeakMap,Bt=new WeakMap,je=new WeakSet,pt=function(e,t,n){const r=x(this,ve)?new Headers(x(this,ve).headers):x(this,tt)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,o]of a)i.toLowerCase()==="set-cookie"?r.append(i,o):r.set(i,o)}if(n)for(const[a,i]of Object.entries(n))if(typeof i=="string")r.set(a,i);else{r.delete(a);for(const o of i)r.append(a,o)}const s=typeof t=="number"?t:(t==null?void 0:t.status)??x(this,yt);return new Response(e,{status:s,headers:r})},or),ue="ALL",ma="all",pa=["get","post","put","delete","options","patch"],_r="Can not add a route since the matcher is already built.",Er=class extends Error{},ha="__COMPOSED_HANDLER",ga=e=>e.text("404 Not Found",404),Bn=(e,t)=>{if("getResponse"in e){const n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text("Internal Server Error",500)},Ee,me,Tr,Te,Qe,Gt,zt,bt,fa=(bt=class{constructor(t={}){V(this,me);P(this,"get");P(this,"post");P(this,"put");P(this,"delete");P(this,"options");P(this,"patch");P(this,"all");P(this,"on");P(this,"use");P(this,"router");P(this,"getPath");P(this,"_basePath","/");V(this,Ee,"/");P(this,"routes",[]);V(this,Te,ga);P(this,"errorHandler",Bn);P(this,"onError",t=>(this.errorHandler=t,this));P(this,"notFound",t=>(F(this,Te,t),this));P(this,"fetch",(t,...n)=>ne(this,me,zt).call(this,t,n[1],n[0],t.method));P(this,"request",(t,n,r,s)=>t instanceof Request?this.fetch(n?new Request(t,n):t,r,s):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${mt("/",t)}`,n),r,s)));P(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(ne(this,me,zt).call(this,t.request,t,void 0,t.request.method))})});[...pa,ma].forEach(a=>{this[a]=(i,...o)=>(typeof i=="string"?F(this,Ee,i):ne(this,me,Qe).call(this,a,x(this,Ee),i),o.forEach(l=>{ne(this,me,Qe).call(this,a,x(this,Ee),l)}),this)}),this.on=(a,i,...o)=>{for(const l of[i].flat()){F(this,Ee,l);for(const c of[a].flat())o.map(d=>{ne(this,me,Qe).call(this,c.toUpperCase(),x(this,Ee),d)})}return this},this.use=(a,...i)=>(typeof a=="string"?F(this,Ee,a):(F(this,Ee,"*"),i.unshift(a)),i.forEach(o=>{ne(this,me,Qe).call(this,ue,x(this,Ee),o)}),this);const{strict:r,...s}=t;Object.assign(this,s),this.getPath=r??!0?t.getPath??pr:ia}route(t,n){const r=this.basePath(t);return n.routes.map(s=>{var i;let a;n.errorHandler===Bn?a=s.handler:(a=async(o,l)=>(await $n([],n.errorHandler)(o,()=>s.handler(o,l))).res,a[ha]=s.handler),ne(i=r,me,Qe).call(i,s.method,s.path,a)}),this}basePath(t){const n=ne(this,me,Tr).call(this);return n._basePath=mt(this._basePath,t),n}mount(t,n,r){let s,a;r&&(typeof r=="function"?a=r:(a=r.optionHandler,r.replaceRequest===!1?s=l=>l:s=r.replaceRequest));const i=a?l=>{const c=a(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};s||(s=(()=>{const l=mt(this._basePath,t),c=l==="/"?0:l.length;return d=>{const u=new URL(d.url);return u.pathname=u.pathname.slice(c)||"/",new Request(u,d)}})());const o=async(l,c)=>{const d=await n(s(l.req.raw),...i(l));if(d)return d;await c()};return ne(this,me,Qe).call(this,ue,mt(t,"*"),o),this}},Ee=new WeakMap,me=new WeakSet,Tr=function(){const t=new bt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,F(t,Te,x(this,Te)),t.routes=this.routes,t},Te=new WeakMap,Qe=function(t,n,r){t=t.toUpperCase(),n=mt(this._basePath,n);const s={basePath:this._basePath,path:n,method:t,handler:r};this.router.add(t,n,[r,s]),this.routes.push(s)},Gt=function(t,n){if(t instanceof Error)return this.errorHandler(t,n);throw t},zt=function(t,n,r,s){if(s==="HEAD")return(async()=>new Response(null,await ne(this,me,zt).call(this,t,n,r,"GET")))();const a=this.getPath(t,{env:r}),i=this.router.match(s,a),o=new ua(t,{path:a,matchResult:i,env:r,executionCtx:n,notFoundHandler:x(this,Te)});if(i[0].length===1){let c;try{c=i[0][0][0][0](o,async()=>{o.res=await x(this,Te).call(this,o)})}catch(d){return ne(this,me,Gt).call(this,d,o)}return c instanceof Promise?c.then(d=>d||(o.finalized?o.res:x(this,Te).call(this,o))).catch(d=>ne(this,me,Gt).call(this,d,o)):c??x(this,Te).call(this,o)}const l=$n(i[0],this.errorHandler,x(this,Te));return(async()=>{try{const c=await l(o);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return ne(this,me,Gt).call(this,c,o)}})()},bt),Sr=[];function ya(e,t){const n=this.buildAllMatchers(),r=((s,a)=>{const i=n[s]||n[ue],o=i[2][a];if(o)return o;const l=a.match(i[0]);if(!l)return[[],Sr];const c=l.indexOf("",1);return[i[1][c],l]});return this.match=r,r(e,t)}var Yt="[^/]+",Rt=".*",Ot="(?:|/.*)",ht=Symbol(),va=new Set(".\\+*[^]$()");function wa(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Rt||e===Ot?1:t===Rt||t===Ot?-1:e===Yt?1:t===Yt?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var nt,rt,Se,it,ba=(it=class{constructor(){V(this,nt);V(this,rt);V(this,Se,Object.create(null))}insert(t,n,r,s,a){if(t.length===0){if(x(this,nt)!==void 0)throw ht;if(a)return;F(this,nt,n);return}const[i,...o]=t,l=i==="*"?o.length===0?["","",Rt]:["","",Yt]:i==="/*"?["","",Ot]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const d=l[1];let u=l[2]||Yt;if(d&&l[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw ht;if(c=x(this,Se)[u],!c){if(Object.keys(x(this,Se)).some(p=>p!==Rt&&p!==Ot))throw ht;if(a)return;c=x(this,Se)[u]=new it,d!==""&&F(c,rt,s.varIndex++)}!a&&d!==""&&r.push([d,x(c,rt)])}else if(c=x(this,Se)[i],!c){if(Object.keys(x(this,Se)).some(d=>d.length>1&&d!==Rt&&d!==Ot))throw ht;if(a)return;c=x(this,Se)[i]=new it}c.insert(o,n,r,s,a)}buildRegExpStr(){const n=Object.keys(x(this,Se)).sort(wa).map(r=>{const s=x(this,Se)[r];return(typeof x(s,rt)=="number"?`(${r})@${x(s,rt)}`:va.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof x(this,nt)=="number"&&n.unshift(`#${x(this,nt)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},nt=new WeakMap,rt=new WeakMap,Se=new WeakMap,it),Vt,jt,lr,_a=(lr=class{constructor(){V(this,Vt,{varIndex:0});V(this,jt,new ba)}insert(e,t,n){const r=[],s=[];for(let i=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const c=`@\\${i}`;return s[i]=[c,l],i++,o=!0,c}),!o)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=s.length-1;i>=0;i--){const[o]=s[i];for(let l=a.length-1;l>=0;l--)if(a[l].indexOf(o)!==-1){a[l]=a[l].replace(o,s[i][1]);break}}return x(this,jt).insert(a,t,r,x(this,Vt),n),r}buildRegExp(){let e=x(this,jt).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const n=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,a,i)=>a!==void 0?(n[++t]=Number(a),"$()"):(i!==void 0&&(r[Number(i)]=++t),"")),[new RegExp(`^${e}`),n,r]}},Vt=new WeakMap,jt=new WeakMap,lr),Ea=[/^$/,[],Object.create(null)],Kt=Object.create(null);function xr(e){return Kt[e]??(Kt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Ta(){Kt=Object.create(null)}function Sa(e){var c;const t=new _a,n=[];if(e.length===0)return Ea;const r=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,u],[p,g])=>d?1:p?-1:u.length-g.length),s=Object.create(null);for(let d=0,u=-1,p=r.length;d<p;d++){const[g,f,b]=r[d];g?s[f]=[b.map(([T])=>[T,Object.create(null)]),Sr]:u++;let w;try{w=t.insert(f,u,g)}catch(T){throw T===ht?new Er(f):T}g||(n[u]=b.map(([T,S])=>{const R=Object.create(null);for(S-=1;S>=0;S--){const[O,M]=w[S];R[O]=M}return[T,R]}))}const[a,i,o]=t.buildRegExp();for(let d=0,u=n.length;d<u;d++)for(let p=0,g=n[d].length;p<g;p++){const f=(c=n[d][p])==null?void 0:c[1];if(!f)continue;const b=Object.keys(f);for(let w=0,T=b.length;w<T;w++)f[b[w]]=o[f[b[w]]]}const l=[];for(const d in i)l[d]=n[i[d]];return[a,l,s]}function lt(e,t){if(e){for(const n of Object.keys(e).sort((r,s)=>s.length-r.length))if(xr(n).test(t))return[...e[n]]}}var Ue,He,Zt,kr,cr,xa=(cr=class{constructor(){V(this,Zt);P(this,"name","RegExpRouter");V(this,Ue);V(this,He);P(this,"match",ya);F(this,Ue,{[ue]:Object.create(null)}),F(this,He,{[ue]:Object.create(null)})}add(e,t,n){var o;const r=x(this,Ue),s=x(this,He);if(!r||!s)throw new Error(_r);r[e]||[r,s].forEach(l=>{l[e]=Object.create(null),Object.keys(l[ue]).forEach(c=>{l[e][c]=[...l[ue][c]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=xr(t);e===ue?Object.keys(r).forEach(c=>{var d;(d=r[c])[t]||(d[t]=lt(r[c],t)||lt(r[ue],t)||[])}):(o=r[e])[t]||(o[t]=lt(r[e],t)||lt(r[ue],t)||[]),Object.keys(r).forEach(c=>{(e===ue||e===c)&&Object.keys(r[c]).forEach(d=>{l.test(d)&&r[c][d].push([n,a])})}),Object.keys(s).forEach(c=>{(e===ue||e===c)&&Object.keys(s[c]).forEach(d=>l.test(d)&&s[c][d].push([n,a]))});return}const i=hr(t)||[t];for(let l=0,c=i.length;l<c;l++){const d=i[l];Object.keys(s).forEach(u=>{var p;(e===ue||e===u)&&((p=s[u])[d]||(p[d]=[...lt(r[u],d)||lt(r[ue],d)||[]]),s[u][d].push([n,a-c+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(x(this,He)).concat(Object.keys(x(this,Ue))).forEach(t=>{e[t]||(e[t]=ne(this,Zt,kr).call(this,t))}),F(this,Ue,F(this,He,void 0)),Ta(),e}},Ue=new WeakMap,He=new WeakMap,Zt=new WeakSet,kr=function(e){const t=[];let n=e===ue;return[x(this,Ue),x(this,He)].forEach(r=>{const s=r[e]?Object.keys(r[e]).map(a=>[a,r[e][a]]):[];s.length!==0?(n||(n=!0),t.push(...s)):e!==ue&&t.push(...Object.keys(r[ue]).map(a=>[a,r[ue][a]]))}),n?Sa(t):null},cr),Fe,Le,dr,ka=(dr=class{constructor(e){P(this,"name","SmartRouter");V(this,Fe,[]);V(this,Le,[]);F(this,Fe,e.routers)}add(e,t,n){if(!x(this,Le))throw new Error(_r);x(this,Le).push([e,t,n])}match(e,t){if(!x(this,Le))throw new Error("Fatal error");const n=x(this,Fe),r=x(this,Le),s=n.length;let a=0,i;for(;a<s;a++){const o=n[a];try{for(let l=0,c=r.length;l<c;l++)o.add(...r[l]);i=o.match(e,t)}catch(l){if(l instanceof Er)continue;throw l}this.match=o.match.bind(o),F(this,Fe,[o]),F(this,Le,void 0);break}if(a===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(x(this,Le)||x(this,Fe).length!==1)throw new Error("No active router has been determined yet.");return x(this,Fe)[0]}},Fe=new WeakMap,Le=new WeakMap,dr),xt=Object.create(null),We,ge,st,_t,pe,Me,et,Et,Da=(Et=class{constructor(t,n,r){V(this,Me);V(this,We);V(this,ge);V(this,st);V(this,_t,0);V(this,pe,xt);if(F(this,ge,r||Object.create(null)),F(this,We,[]),t&&n){const s=Object.create(null);s[t]={handler:n,possibleKeys:[],score:0},F(this,We,[s])}F(this,st,[])}insert(t,n,r){F(this,_t,++Mn(this,_t)._);let s=this;const a=ta(n),i=[];for(let o=0,l=a.length;o<l;o++){const c=a[o],d=a[o+1],u=sa(c,d),p=Array.isArray(u)?u[0]:c;if(p in x(s,ge)){s=x(s,ge)[p],u&&i.push(u[1]);continue}x(s,ge)[p]=new Et,u&&(x(s,st).push(u),i.push(u[1])),s=x(s,ge)[p]}return x(s,We).push({[t]:{handler:r,possibleKeys:i.filter((o,l,c)=>c.indexOf(o)===l),score:x(this,_t)}}),s}search(t,n){var l;const r=[];F(this,pe,xt);let a=[this];const i=mr(n),o=[];for(let c=0,d=i.length;c<d;c++){const u=i[c],p=c===d-1,g=[];for(let f=0,b=a.length;f<b;f++){const w=a[f],T=x(w,ge)[u];T&&(F(T,pe,x(w,pe)),p?(x(T,ge)["*"]&&r.push(...ne(this,Me,et).call(this,x(T,ge)["*"],t,x(w,pe))),r.push(...ne(this,Me,et).call(this,T,t,x(w,pe)))):g.push(T));for(let S=0,R=x(w,st).length;S<R;S++){const O=x(w,st)[S],M=x(w,pe)===xt?{}:{...x(w,pe)};if(O==="*"){const A=x(w,ge)["*"];A&&(r.push(...ne(this,Me,et).call(this,A,t,x(w,pe))),F(A,pe,M),g.push(A));continue}const[L,U,Y]=O;if(!u&&!(Y instanceof RegExp))continue;const ee=x(w,ge)[L],se=i.slice(c).join("/");if(Y instanceof RegExp){const A=Y.exec(se);if(A){if(M[U]=A[0],r.push(...ne(this,Me,et).call(this,ee,t,x(w,pe),M)),Object.keys(x(ee,ge)).length){F(ee,pe,M);const K=((l=A[0].match(/\//))==null?void 0:l.length)??0;(o[K]||(o[K]=[])).push(ee)}continue}}(Y===!0||Y.test(u))&&(M[U]=u,p?(r.push(...ne(this,Me,et).call(this,ee,t,M,x(w,pe))),x(ee,ge)["*"]&&r.push(...ne(this,Me,et).call(this,x(ee,ge)["*"],t,M,x(w,pe)))):(F(ee,pe,M),g.push(ee)))}}a=g.concat(o.shift()??[])}return r.length>1&&r.sort((c,d)=>c.score-d.score),[r.map(({handler:c,params:d})=>[c,d])]}},We=new WeakMap,ge=new WeakMap,st=new WeakMap,_t=new WeakMap,pe=new WeakMap,Me=new WeakSet,et=function(t,n,r,s){const a=[];for(let i=0,o=x(t,We).length;i<o;i++){const l=x(t,We)[i],c=l[n]||l[ue],d={};if(c!==void 0&&(c.params=Object.create(null),a.push(c),r!==xt||s&&s!==xt))for(let u=0,p=c.possibleKeys.length;u<p;u++){const g=c.possibleKeys[u],f=d[c.score];c.params[g]=s!=null&&s[g]&&!f?s[g]:r[g]??(s==null?void 0:s[g]),d[c.score]=!0}}return a},Et),at,ur,Ra=(ur=class{constructor(){P(this,"name","TrieRouter");V(this,at);F(this,at,new Da)}add(e,t,n){const r=hr(t);if(r){for(let s=0,a=r.length;s<a;s++)x(this,at).insert(e,r[s],n);return}x(this,at).insert(e,t,n)}match(e,t){return x(this,at).search(e,t)}},at=new WeakMap,ur),be=class extends fa{constructor(e={}){super(e),this.router=e.router??new ka({routers:[new xa,new Ra]})}},Oa=e=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},r=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(n.origin),s=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(n.allowMethods);return async function(i,o){var d;function l(u,p){i.res.headers.set(u,p)}const c=await r(i.req.header("origin")||"",i);if(c&&l("Access-Control-Allow-Origin",c),n.credentials&&l("Access-Control-Allow-Credentials","true"),(d=n.exposeHeaders)!=null&&d.length&&l("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),i.req.method==="OPTIONS"){n.origin!=="*"&&l("Vary","Origin"),n.maxAge!=null&&l("Access-Control-Max-Age",n.maxAge.toString());const u=await s(i.req.header("origin")||"",i);u.length&&l("Access-Control-Allow-Methods",u.join(","));let p=n.allowHeaders;if(!(p!=null&&p.length)){const g=i.req.header("Access-Control-Request-Headers");g&&(p=g.split(/\s*,\s*/))}return p!=null&&p.length&&(l("Access-Control-Allow-Headers",p.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&i.header("Vary","Origin",{append:!0})}};function Ia(){return`  // === Karna v3.1 Frontend ===
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
    memoryReviewFilter: 'all',
    memoryReviewSearch: '',
    memoryTypeFilter: 'all',
    documentLibrarySearch: '',
    pendingDashMessage: null,
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
`}function Na(){return`  // === Render Core ===
  function render() {
    var app = document.getElementById('app');
    if (!state.session) { renderAuth(app); } else { renderMain(app); }
  }

  function renderAuth(container) {
    container.innerHTML = '<div class="auth-screen"><div class="auth-form" style="text-align:center;"><div class="auth-title">Karna</div><div style="color:var(--text-muted);font-size:13px;margin-top:24px;">Loading…</div></div></div>';
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
`}function Ca(){return`  // ============================================================
  // MAIN APP — Dashboard + Chat + Threads
  // ============================================================

  function renderMain(container) {
    state.view = 'dashboard';
    state.activeThreadId = null;
    container.innerHTML = '<div class="topbar">' +
      '<div class="topbar-left">' +
        '<button class="topbar-btn" id="threadsBtn" title="Conversations" style="margin-right:8px;">&#9776;</button>' +
        '<div class="chunky-tabs">' +
          '<button class="chunky-tab active" id="tabDash" title="Dashboard"><img class="nav-icon" src="/static/ui/nav-dashboard.png" alt="Dashboard"></button>' +
          '<button class="chunky-tab" id="tabSkills" title="Skills"><img class="nav-icon" src="/static/ui/nav-skills.png" alt="Skills"></button>' +
        '</div>' +
        '<span class="thread-title-display" id="threadTitleDisplay" style="margin-left:12px;"></span>' +
      '</div>' +
      '<div class="topbar-right">' +
        '<button class="topbar-btn notif-btn" id="notifBtn" title="Notifications">&#128276;<span class="notif-badge hidden" id="notifBadge">0</span></button>' +
        '<button class="topbar-btn topbar-icon-btn" id="settingsBtn" title="Settings"><img class="nav-icon" src="/static/ui/nav-settings.png" alt="Settings"></button>' +
        '<button class="topbar-btn topbar-icon-btn" id="newThreadBtn" title="New conversation"><img class="nav-icon" src="/static/ui/nav-new-chat.png" alt="New chat"></button>' +
        '<button class="topbar-btn" id="exportBtn" title="Export chat" style="display:none;">&#x21e9;</button>' +
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
          '<div class="thread-sidebar-header"><span class="panel-title" style="margin:0;">CHAT LOG</span><div style="display:flex;gap:6px;"><button class="thread-new-btn" id="sidebarSelectBtn" title="Select to delete">&#9745;</button><button class="thread-new-btn btn-clay sidebar-new-chat-btn" id="sidebarNewBtn"><img class="nav-icon-sm" src="/static/ui/nav-new-chat.png" alt="" aria-hidden="true"><span>+ NEW</span></button></div></div>' +
          '<div class="thread-list" id="threadList"></div>' +
          '<div class="thread-sidebar-footer">' +
            '<button class="thread-footer-btn" id="sidebarDashBtn"><img class="nav-icon-sm" src="/static/ui/nav-dashboard.png" alt="" aria-hidden="true"><span>Dashboard</span></button>' +
            '<button class="thread-footer-btn" id="sidebarSkillsBtn"><img class="nav-icon-sm" src="/static/ui/nav-skills.png" alt="" aria-hidden="true"><span>Skills</span></button>' +
            '<button class="thread-footer-btn" id="sidebarSettingsBtn"><img class="nav-icon-sm" src="/static/ui/nav-settings.png" alt="" aria-hidden="true"><span>Settings</span></button>' +
          '</div>' +
        '</div><div class="overlay-close" id="threadsClose"></div></div>';

    // Event listeners
    document.getElementById('threadsBtn').onclick = function() { toggleOverlay('threadsOverlay'); };
    document.getElementById('threadsClose').onclick = function() { toggleOverlay(null); };
    document.getElementById('tabDash').onclick = function() { state.view = 'dashboard'; state.activeThreadId = null; renderView(); };
    document.getElementById('tabSkills').onclick = function() { closeNotifDropdown(); state.prevView = state.view; state.view = 'skills'; renderView(); };
    document.getElementById('settingsBtn').onclick = function() { closeNotifDropdown(); state.prevView = state.view; state.view = 'settings'; state.settingsSection = null; renderView(); };
    
    // documentsBtn removed in v4
    document.getElementById('newThreadBtn').onclick = startNewThread;
    document.getElementById('exportBtn').onclick = exportChat;
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

  function renderView() {
    var mc = document.getElementById('mainContent');
    if (!mc) return;
    
    // Update active tab state
    document.querySelectorAll('.chunky-tab').forEach(function(t) { t.classList.remove('active'); });
    if (state.view === 'dashboard' && document.getElementById('tabDash')) document.getElementById('tabDash').classList.add('active');
    if (state.view === 'skills' && document.getElementById('tabSkills')) document.getElementById('tabSkills').classList.add('active');

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
    } else if (state.view === 'memory-review') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = 'Memory Review';
      renderMemoryReview(mc);
    } else if (state.view === 'document-library') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = 'Documents';
      renderDocumentLibrary(mc);
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
`}function Aa(){return`  // ============================================================
  // DASHBOARD
  // ============================================================

  var UI_IMG = '/static/ui/';

  function dashTile(img, alt, onclick, badgeId, badgeVal) {
    var badge = badgeId ? '<span class="dash-tile-badge" id="' + badgeId + '">' + (badgeVal || '') + '</span>' : '';
    return '<button type="button" class="dash-tile" onclick="' + onclick + '">' +
      '<img src="' + UI_IMG + img + '" alt="' + alt + '" loading="lazy" decoding="async" />' +
      badge + '</button>';
  }

  function renderDashInputArea() {
    var name = escapeHtml(state.assistantName || 'Karna');
    return '<div class="dash-input-area">' +
      '<div class="dash-input-wrap">' +
        '<div class="dash-input-row">' +
          '<textarea class="dash-input-field" id="dashInputField" placeholder="Message ' + name + '\\u2026" rows="1"></textarea>' +
          '<button type="button" class="dash-send-btn" id="dashSendBtn" title="Send" aria-label="Send">&#10148;</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function bindDashInput() {
    var dashInput = document.getElementById('dashInputField');
    var dashSend = document.getElementById('dashSendBtn');
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
    startNewThread();
  }

  async function renderDashboard(container) {
    container.innerHTML = '<div class="dash-page">' +
      '<div class="chat-area has-dash-bg"><div class="dashboard" id="dashContent"><div style="color:var(--text-muted);font-size:13px;">Loading dashboard...</div></div></div>' +
      renderDashInputArea() +
    '</div>';
    bindDashInput();

    try {
      var data = await api('/chat/dashboard');
      var dc = document.getElementById('dashContent');
      if (!dc) return;
      var userName = state.session && state.session.user ? state.session.user.name : '';
      var hour = new Date().getHours();
      var greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

      var html = '<div class="dash-greeting">' + greeting + (userName ? ', ' + escapeHtml(userName.split(' ')[0]) : '') + '</div>' +
        '<div class="dash-subtitle">Here\\u2019s what\\u2019s happening with ' + escapeHtml(state.assistantName || 'Karna') + '</div>';

      html += '<div class="dash-tiles">';
      html += dashTile('tile-active-tasks.png', 'Active Tasks', 'viewTasksModal()', 'dashTasksBadge', data.active_schedules || 0);
      html += dashTile('tile-skills.png', 'Skills', 'state.prevView=\\'dashboard\\';state.view=\\'skills\\';renderView();', 'dashSkillsBadge', data.skills_count || 0);
      html += dashTile('tile-preferences.png', 'Preferences', 'state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'preferences\\';renderView();', 'dashPrefsBadge', data.preferences_count || 0);
      html += dashTile('tile-gmail.png', 'Unread Gmail', 'dashGmailClick()', 'dashGmailBadge', '\\u2026');
      html += dashTile('tile-documents.png', 'Documents', 'state.prevView=\\'dashboard\\';state.view=\\'documents\\';renderView();', 'dashDocsBadge', data.documents_count || 0);
      html += '</div>';

      dc.innerHTML = html;
      loadDashGmailCount();
    } catch(err) {
      var dc2 = document.getElementById('dashContent');
      if (dc2) dc2.innerHTML = '<div class="welcome"><h2>Hello' + (state.session && state.session.user ? ', ' + state.session.user.name : '') + '</h2><p>' + escapeHtml(state.assistantName || 'Karna') + ' is ready. Start a new conversation below.</p></div>';
    }
  }

  async function loadDashGmailCount() {
    var el = document.getElementById('dashGmailBadge');
    try {
      var data = await api('/chat/gmail/unread');
      if (!el) return;
      if (data.count !== null && data.count !== undefined) {
        el.textContent = data.count;
        el.classList.toggle('dash-tile-badge-hidden', data.count === 0);
        state.gmailUnread = data.count;
      } else {
        el.textContent = '\\u2014';
        el.classList.add('dash-tile-badge-muted');
        state.gmailUnread = 0;
      }
    } catch(e) {
      if (el) {
        el.textContent = '\\u2014';
        el.classList.add('dash-tile-badge-muted');
      }
    }
  }

  function dashGmailClick() {
    if (state.gmailUnread > 0) {
      state.pendingDashMessage = 'Check my Gmail inbox — list the latest unread messages';
    } else {
      state.pendingDashMessage = 'Check my Gmail inbox';
    }
    startNewThread();
  }
`}function La(){return`  // ============================================================
  // CHAT VIEW
  // ============================================================

  function renderChatView(container) {
    container.innerHTML = '<div class="chat-area" id="chatArea"><div id="messages"></div><div id="thinking" class="thinking" style="display:none">Thinking…<span class="thinking-cursor"></span></div></div>' +
      '<div class="input-area"><div class="input-wrap">' +
        '<input type="file" id="fileInput" style="display:none" multiple>' +
        '<div id="fileChips" class="file-chips"></div>' +
        '<div class="input-row">' +
          '<button class="input-btn attach-btn" id="attachBtn" title="Attach file">&#128206;</button>' +
          '<textarea class="input-field" id="inputField" placeholder="Message Karna…" rows="1"></textarea>' +
          '<button class="input-btn send-btn" id="sendBtn" title="Send (Ctrl+Enter)">&#10148;</button>' +
        '</div>' +
      '</div></div>';

    var input = document.getElementById('inputField');
    input.onkeydown = function(e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleSend(); } };
    input.oninput = function() { input.style.height = 'auto'; input.style.height = Math.max(40, Math.min(input.scrollHeight, window.innerHeight * 0.35)) + 'px'; };
    input.style.height = '40px';
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
    var browserAckEl = null;
    var browserProgressEl = null;

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
                  get browserAckEl() { return browserAckEl; },
                  set browserAckEl(v) { browserAckEl = v; },
                  get browserProgressEl() { return browserProgressEl; },
                  set browserProgressEl(v) { browserProgressEl = v; },
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
            var isError = data.toolResult && (
              data.toolResult.startsWith('Error:') ||
              data.toolResult.startsWith('Browser task failed') ||
              data.toolResult.startsWith('Browser task error') ||
              data.toolResult.startsWith('Browser status check error')
            );
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
        // Clear browser progress indicators when the tool finishes
        if (ctx.browserProgressEl) { ctx.browserProgressEl.remove(); ctx.browserProgressEl = null; }
        if (ctx.browserAckEl) { ctx.browserAckEl.remove(); ctx.browserAckEl = null; }
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
  function scrollToBottom() { var area = document.getElementById('chatArea'); if (area) setTimeout(function() { area.scrollTop = area.scrollHeight; }, 50); }
`}function Ma(){return`  // ============================================================
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
`}function $a(){return`  // ============================================================
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
      state.activeThreadId = null;
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
`}function Pa(){return`  // === Memory Review ===
  async function renderMemoryReview(container) {
    container.innerHTML = '<div class="chat-area"><div class="memory-review-page" id="mrContent"><div class="ac-empty">Loading Memory...</div></div></div>';
    try {
      var data = await api('/memory/review?limit=100');
      var el = document.getElementById('mrContent');
      if (!el) return;
      var html = '<div class="mr-header"><div class="ac-title">Memory Review</div><div style="display:flex;gap:8px;align-items:center;"><button class="btn btn-small btn-warning" id="mrMigrateBtn" onclick="mrMigrateDocuments()" title="Find memory entries that are too large or contain document bodies, and move them to Document Library" style="border-color:#d4a017;color:#d4a017;">Sort &amp; Migrate</button><button class="btn btn-small" onclick="state.prevView=\\'dashboard\\';state.view=\\'dashboard\\';renderView();">Back</button></div></div>';
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
`}function Ba(){return`  // === Document Library ===
  async function renderDocumentLibrary(container) {
    container.innerHTML = '<div class="chat-area"><div class="doclib-page" id="dlContent"><div class="ac-empty">Loading Documents...</div></div></div>';
    try {
      var data = await api('/documents');
      var el = document.getElementById('dlContent');
      if (!el) return;
      var html = '<div class="doclib-header"><div class="ac-title">Document Library</div><button class="btn btn-small" onclick="state.prevView=\\'dashboard\\';state.view=\\'dashboard\\';renderView();">Back</button></div>';
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
    var data = await api('/settings/profile');
    state.assistantName = data.assistant_name || 'Karna';
    var el = document.getElementById('assistantNameDisplay');
    if (el) el.textContent = state.assistantName.toUpperCase();
  }
`}function ja(){return`  // ============================================================
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
    html += '<div style="margin-bottom:20px;padding:16px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);">';
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
    html += '<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
      '<input type="checkbox" id="comp_email_digest" ' + (prefs.components.email_digest !== false ? 'checked' : '') + '> Email Digest</label>';

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
        var date = new Date(b.created_at).toLocaleDateString();
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
    html += '<div style="padding:12px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);">';
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
      weather: document.getElementById('comp_weather').checked,
      email_digest: document.getElementById('comp_email_digest').checked
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
      overlay.innerHTML = '<div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);padding:24px;max-width:320px;width:90%;text-align:center;">' +
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
      html += '<div style="font-size:14px;color:var(--text-muted);">' + new Date(b.created_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + '</div>';
      html += '</div>';
      
      // Calendar Events
      if (content.calendar && content.calendar.totalCount > 0) {
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--surface);border-radius:var(--radius-sm);border:1px solid var(--border);">';
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
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--surface);border-radius:var(--radius-sm);border:1px solid var(--border);">';
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
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--surface);border-radius:var(--radius-sm);border:1px solid var(--border);">';
        html += '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:var(--accent);">✅ Open Tasks (' + content.tasks.pending + ')</h3>';
        if (content.tasks.items && content.tasks.items.length > 0) {
          for (var t = 0; t < content.tasks.items.length; t++) {
            html += '<div style="padding:8px 12px;background:rgba(255,255,255,0.04);border-radius:6px;margin-bottom:6px;font-size:13px;display:flex;align-items:center;gap:8px;"><span style="color:var(--text-muted);">☐</span>' + escapeHtml(content.tasks.items[t]) + '</div>';
          }
        }
        html += '</div>';
      } else if (content.tasks) {
        html += '<div style="margin-bottom:24px;padding:12px 16px;background:var(--surface);border-radius:var(--radius-sm);border:1px solid var(--border);font-size:13px;color:var(--text-muted);">✅ Tasks: All clear</div>';
      }
      
      // News
      if (content.news && content.news.items && content.news.items.length > 0) {
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--surface);border-radius:var(--radius-sm);border:1px solid var(--border);">';
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
        html += '<div style="margin-bottom:24px;padding:16px;background:var(--surface);border-radius:var(--radius-sm);border:1px solid var(--border);">';
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
`}function Ua(){return`  // ============================================================
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
`}function Ha(){return`  // ============================================================
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
    if (!confirm('Promote this auto-skill to manual? You will be able to edit it freely, and Karna will stop auto-refining it.')) return;
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
        '<h2 class="page-title">Skills</h2>' +
        '<button class="btn btn-small" onclick="showCreateSkillModal()" style="width:auto;padding:7px 14px;">+ New</button>' +
      '</div>' +
      '<div class="skills-page">';

    // ── Manual skills ──
    html += '<div style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:10px;">Your Skills</div>';
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

    // ── Auto-learned skills ──
    if (autoSkills.length > 0) {
      html += '<div style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-top:24px;margin-bottom:10px;">Auto-Learned Skills</div>';
      html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">Karna detected repeated workflows and distilled them into procedures. Promote any to make it editable as a manual skill.</div>';
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
`}function Fa(){return`  // === Init ===
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
  render(); // render immediately — avoids blank white page
  if (state.session) {
    api('/auth/me').then(function(data) {
      if (data.error) { clearSession(); render(); }
    }).catch(function(err) {
      console.error('Auth error:', err);
      clearSession();
      render();
    });
  }
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
  // ============================================================`}function Wa(){return`  async function renderDocumentsView(container) {
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
          '<button class="btn btn-small" onclick="clearAskAiResults()">Clear Results</button>' +
        '</div>' +
        '<div id="chatMessages" class="documents-chat-messages"></div>' +
        '<div class="documents-chat-input">' +
          '<input type="text" id="docChatInput" placeholder="Ask about your documents..." onkeypress="if(event.key===\\'Enter\\')sendDocChat()">' +
          '<button class="btn" onclick="sendDocChat()">Send</button>' +
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
`}function Dr(e=""){return`<!DOCTYPE html>
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
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/karna.css">
</head>
<body>
  <div id="app"></div>
  <div class="toast-container" id="toasts"></div>

  <script>window.__KARNA_API_BASE__ = ${JSON.stringify(e||"")};<\/script>
  <script>
${Ia()}
${Na()}
${Ca()}
${Aa()}
${La()}
${Ma()}
${$a()}
${Pa()}
${Ba()}
${ja()}
${Ua()}
${Ha()}
${Fa()}
${Wa()}
  <\/script>
</body>
</html>`}const En="AES-GCM",qa=256;async function Rr(e){const t=new TextEncoder,n=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},n,{name:En,length:qa},!1,["encrypt","decrypt"])}async function Tt(e,t){const n=await Rr(t),r=crypto.getRandomValues(new Uint8Array(12)),s=new TextEncoder,a=await crypto.subtle.encrypt({name:En,iv:r},n,s.encode(e)),i=new Uint8Array(r.length+new Uint8Array(a).length);return i.set(r),i.set(new Uint8Array(a),r.length),btoa(String.fromCharCode(...i))}async function Z(e,t){const n=await Rr(t),r=new Uint8Array(atob(e).split("").map(o=>o.charCodeAt(0))),s=r.slice(0,12),a=r.slice(12),i=await crypto.subtle.decrypt({name:En,iv:s},n,a);return new TextDecoder().decode(i)}async function Xt(e){const n=new TextEncoder().encode(e+"karna-pin-salt"),r=await crypto.subtle.digest("SHA-256",n);return btoa(String.fromCharCode(...new Uint8Array(r)))}async function Or(e,t){return await Xt(e)===t}const Qt=Object.freeze(Object.defineProperty({__proto__:null,decrypt:Z,encrypt:Tt,hashPin:Xt,verifyPin:Or},Symbol.toStringTag,{value:"Module"})),ze=new be;ze.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});ze.post("/setup",async e=>{const{username:t,name:n,pin:r,personality_prompt:s,timezone:a}=await e.req.json();if(!t||!n||!r)return e.json({error:"Username, name, and PIN are required"},400);if(r.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const o=await Xt(r);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,n,o,s||"",a||"Asia/Kolkata").run();const l=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),c=crypto.randomUUID(),d=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(c,l.id,"web",d).run(),e.json({success:!0,sessionId:c,user:{id:l.id,username:l.username,name:l.name}})});ze.post("/login",async e=>{const{username:t,pin:n}=await e.req.json();if(!t||!n)return e.json({error:"Username and PIN required"},400);const r=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!r)return e.json({error:"User not found"},404);if(!await Or(n,r.pin_hash))return e.json({error:"Invalid PIN"},401);const a=crypto.randomUUID(),i=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(a,r.id,"web",i).run(),e.json({success:!0,sessionId:a,user:{id:r.id,username:r.username,name:r.name}})});ze.post("/logout",async e=>{var n;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});ze.get("/users/hints",async e=>{const n=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(r=>{var s;return{username:r.username,name_hint:r.name.split(" ")[0],created:((s=r.created_at)==null?void 0:s.split(" ")[0])||""}});return e.json({users:n,count:n.length})});ze.post("/reset-pin",async e=>{var o;const{username:t,name:n,new_pin:r}=await e.req.json();if(!t||!n||!r)return e.json({error:"Username, display name, and new PIN are required"},400);if(r.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const s=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!s)return e.json({error:"User not found"},404);if(s.name.toLowerCase().trim()!==n.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const a=await Xt(r);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(a,s.id).run();const i=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(s.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(s.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((o=i.meta)==null?void 0:o.changes)||0})});ze.get("/me",async e=>{var r;const t=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return n?e.json({user:{id:n.uid,username:n.username,name:n.name,role:n.role,timezone:n.timezone}}):e.json({error:"Invalid or expired session"},401)});const It={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},jn=12e4;function Ir(e,t){return Promise.race([e,new Promise((n,r)=>setTimeout(()=>r(new Error(`LLM timeout: ${t} did not respond within ${jn/1e3} seconds. Try again or switch providers in Settings → Keys.`)),jn))])}async function H(e,t,n,r,s,a={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,n,r,s,JSON.stringify(a)).run()}catch(i){console.error("Failed to log error:",i)}}async function ln(e,t,n,r,s,a){try{const i=`provider_alert:${r}:${n}`;if(await e.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(t,i).first())return;await H(e,t,"provider_alert",i,`${r} failed: ${a.substring(0,200)}`,{alertType:n,failedProvider:r,fallbackProvider:s});let l;n==="all_providers_down"?l=`🚨 All LLM providers failed

Last error from ${r}: ${Un(a)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:l=`⚠️ LLM Provider Issue

${r}: ${Un(a)}
Switched to: ${s}

Check your ${r} API credit balance or key.`;const{decrypt:c}=await Promise.resolve().then(()=>Qt),d=await e.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(t).first();if(!(d!=null&&d.telegram_chat_id))return;const u=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(t).first();if(!u)return;const p=await c(u.encrypted_value,d.pin_hash);await fetch(`https://api.telegram.org/bot${p}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d.telegram_chat_id,text:l})})}catch(i){console.error("Failed to send provider alert:",i)}}function Un(e){return e.includes("credit balance")||e.includes("insufficient")||e.includes("402")?"Credits exhausted or balance too low":e.includes("429")||e.includes("rate_limit")||e.includes("quota")?"Rate limit / quota exceeded":e.includes("401")||e.includes("authentication")||e.includes("invalid")&&e.includes("key")?"API key invalid or expired":e.includes("403")?"Access denied (key may lack permissions)":e.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":e.includes("properties field not found")?"Schema compatibility issue":"API error"}class Nr{constructor(t,n="claude-sonnet-4-20250514",r="https://api.anthropic.com",s="anthropic"){P(this,"name");P(this,"apiKey");P(this,"model");P(this,"apiBase");this.apiKey=t,this.model=n,this.apiBase=r,this.name=s}async chat(t,n){var d,u,p,g;const r=t.find(f=>f.role==="system"),s=t.filter(f=>f.role!=="system"),a={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,messages:s.map(f=>({role:f.role,content:f.content}))};r&&(a.system=r.content),n!=null&&n.tools&&n.tools.length>0&&(a.tools=n.tools.map(f=>({name:f.name,description:f.description,input_schema:f.parameters})),n.toolChoice==="required"&&(a.tool_choice={type:"any"}));const i=await Ir(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(a)}),this.name);if(!i.ok){const f=await i.text();throw new Error(this.name+" API error "+i.status+": "+f)}const o=await i.json(),l=((d=o.content)==null?void 0:d.filter(f=>f.type==="text"))||[],c=((u=o.content)==null?void 0:u.filter(f=>f.type==="tool_use"))||[];return{content:l.map(f=>f.text).join(`
`),toolCalls:c.map(f=>({id:f.id,name:f.name,arguments:f.input})),usage:{promptTokens:((p=o.usage)==null?void 0:p.input_tokens)||0,completionTokens:((g=o.usage)==null?void 0:g.output_tokens)||0}}}async streamChat(t,n){const r=t.find(c=>c.role==="system"),s=t.filter(c=>c.role!=="system"),a={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,stream:!0,messages:s.map(c=>({role:c.role,content:c.content}))};r&&(a.system=r.content);const i=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(a)});if(!i.ok){const c=await i.text();throw new Error(this.name+" stream error "+i.status+": "+c)}const o=i.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(c){var f;const{done:d,value:u}=await o.read();if(d){c.close();return}const g=l.decode(u,{stream:!0}).split(`
`);for(const b of g)if(b.startsWith("data: ")){const w=b.slice(6);if(w==="[DONE]")continue;try{const T=JSON.parse(w);T.type==="content_block_delta"&&((f=T.delta)!=null&&f.text)&&c.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:T.delta.text})+`

`))}catch{}}}})}}function Ga(e){const t={},n=e||{};if(t.type=n.type||"object",t.type==="object"){const r=n.properties;if(r&&typeof r=="object"&&Object.keys(r).length>0){const s={};for(const[a,i]of Object.entries(r))i&&typeof i=="object"?s[a]=hn(i):s[a]=i;t.properties=s}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(n.required)?t.required=n.required:t.required=[]}return n.description&&(t.description=n.description),t}function hn(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const n=t.properties;if(n&&typeof n=="object"&&Object.keys(n).length>0){const r={};for(const[s,a]of Object.entries(n))a&&typeof a=="object"?r[s]=hn(a):r[s]=a;t.properties=r}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=hn(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class Cr{constructor(t,n,r,s){P(this,"name");P(this,"apiKey");P(this,"model");P(this,"apiBase");this.apiKey=t,this.model=n,this.apiBase=r.replace(/\/+$/,""),this.name=s}async chat(t,n){var l,c,d,u,p,g;const r={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,messages:t.map(f=>({role:f.role,content:f.content}))},s=this.apiBase.includes("routellm.abacus.ai");if(n!=null&&n.tools&&n.tools.length>0&&s)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");n!=null&&n.tools&&n.tools.length>0&&(r.tools=n.tools.map(f=>({type:"function",function:{name:f.name,description:f.description,parameters:Ga(f.parameters||{})}})),n.toolChoice==="required"&&(r.tool_choice="required"));const a=await Ir(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)}),this.name);if(!a.ok){const f=await a.text();throw new Error(this.name+" API error "+a.status+": "+f)}const i=await a.json(),o=(l=i.choices)==null?void 0:l[0];return{content:((c=o==null?void 0:o.message)==null?void 0:c.content)||"",toolCalls:(u=(d=o==null?void 0:o.message)==null?void 0:d.tool_calls)==null?void 0:u.map(f=>({id:f.id,name:f.function.name,arguments:(()=>{try{return typeof f.function.arguments=="string"?JSON.parse(f.function.arguments||"{}"):f.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((p=i.usage)==null?void 0:p.prompt_tokens)||0,completionTokens:((g=i.usage)==null?void 0:g.completion_tokens)||0}}}async streamChat(t,n){const r={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,stream:!0,messages:t.map(o=>({role:o.role,content:o.content}))},s=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(r)});if(!s.ok){const o=await s.text();throw new Error(this.name+" stream error "+s.status+": "+o)}const a=s.body.getReader(),i=new TextDecoder;return new ReadableStream({async pull(o){var p,g,f;const{done:l,value:c}=await a.read();if(l){o.close();return}const u=i.decode(c,{stream:!0}).split(`
`);for(const b of u)if(b.startsWith("data: ")){const w=b.slice(6);if(w==="[DONE]")continue;try{const S=(f=(g=(p=JSON.parse(w).choices)==null?void 0:p[0])==null?void 0:g.delta)==null?void 0:f.content;S&&o.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:S})+`

`))}catch{}}}})}}function gn(e,t,n,r){const s=It[e];if(!s)throw new Error(`Unknown LLM provider: ${e}`);const a=r||s.defaultModel;return s.apiFormat==="anthropic"?new Nr(t,a,s.apiBase,n):new Cr(t,a,s.apiBase,n)}class Ar{constructor(){P(this,"errorLog",new Map);P(this,"usageLog",new Map)}async pickProvider(t){const n=Date.now(),r=t.filter(s=>{const a=this.errorLog.get(s);return a?a.cooldownUntil<=n:!0});return r.length>0?r[0]:null}async recordUsage(t,n){const r=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:r.tokens+n,requests:r.requests+1})}async recordError(t,n,r=5){this.errorLog.set(t,{error:n,cooldownUntil:Date.now()+r*60*1e3})}}const za=["llm_slot_1","llm_slot_2","llm_slot_3"],Ka=["anthropic","openai"];async function Ke(e,t,n){const{decrypt:r}=await Promise.resolve().then(()=>Qt),s=new Ar,a=[];for(const u of za){const p=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,u).first();if(p)try{const g=await r(p.encrypted_value,n),f=JSON.parse(g);if(f.provider&&f.apiKey&&It[f.provider]){const w=f.provider,T=gn(f.provider,f.apiKey,w,f.model);a.push({name:w,provider:T})}}catch(g){console.error(`Failed to load ${u}:`,g)}}const i=new Set(a.map(u=>u.name));for(const u of Ka){if(i.has(u))continue;const p=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,u).first();if(p)try{const g=await r(p.encrypted_value,n);if(It[u]){const b=gn(u,g,u);a.push({name:u,provider:b})}}catch{console.error(`Failed to decrypt legacy ${u} key`)}}if(a.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const o=a.map(u=>u.name),l=await s.pickProvider(o);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:a[0].provider,rotation:s};const c=a.find(u=>u.name===l);return{provider:Ya(c.provider,a,s,e,t),rotation:s}}function Ya(e,t,n,r,s){const a=o=>o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")||o.includes("TOOLS_UNSUPPORTED"),i=o=>o.includes("429")||o.toLowerCase().includes("rate limit")||o.toLowerCase().includes("too many requests");return t.length<=1?{name:e.name,async chat(o,l){try{return await e.chat(o,l)}catch(c){const d=c.message||"";throw a(d)&&!d.includes("TOOLS_UNSUPPORTED")&&ln(r,s,"all_providers_down",e.name,null,d),c}},async streamChat(o,l){return await e.streamChat(o,l)}}:{name:e.name,async chat(o,l){try{return await e.chat(o,l)}catch(c){const d=c.message||"",u=i(d);if(!a(d)&&!u)throw c;const p=d.includes("TOOLS_UNSUPPORTED"),g=p?1:u?10:1440;console.warn(`Provider ${e.name} ${u?"rate limited":p?"tools unsupported":"auth/billing error"}, trying fallback...`),await n.recordError(e.name,d,g);const f=t.filter(b=>b.name!==e.name);for(const b of f)try{const w=await b.provider.chat(o,l);return this.name=b.name,!p&&!u&&ln(r,s,"provider_switched",e.name,b.name,d),w}catch(w){const T=w.message||"";if(a(T)||i(T)){await n.recordError(b.name,T,i(T)?10:1440);continue}throw w}throw ln(r,s,"all_providers_down",e.name,null,d),new Error(`All LLM providers failed. Primary (${e.name}): ${d.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(o,l){return await e.streamChat(o,l)}}}const gt=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:Nr,OpenAICompatibleProvider:Cr,ProviderRotation:Ar,createProviderFromConfig:gn,createRotatingProvider:Ke,logError:H},Symbol.toStringTag,{value:"Module"})),cn=20,Ja=2e3,Va=2e3,Lr=4;function Za(e){return Math.ceil(e.length/Lr)}function Hn(e,t){const n=t*Lr;return e.length<=n?e:e.slice(0,n)+`
[...truncated to fit token budget]`}class te{constructor(t){this.db=t}async store(t,n,r,s,a=5,i="working"){const o=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,n,r).first();o?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,a,i,o.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,n,r,s,a,i).run(),i==="working"&&await this.enforceWorkingMemoryCap(t)}async cleanupDoneTasks(t){await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND type = 'task' AND status = 'done' AND tier = 'working'
       AND updated_at < datetime('now', '-7 days')`).bind(t).run()}async enforceWorkingMemoryCap(t){const n=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((n==null?void 0:n.cnt)||0)>cn){const r=((n==null?void 0:n.cnt)||0)-cn;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND tier = 'working' AND importance < 8 AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' AND importance < 8
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,r).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,cn).all()).results||[]}async getAll(t,n,r=50){return n?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,n,r).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,r).all()).results||[]}async search(t,n,r=10){return this.searchMemoryByTier(t,n,r)}async searchLongTerm(t,n,r=5){return this.searchMemoryByTier(t,n,r,"long_term")}async searchMemoryByTier(t,n,r,s){const a=s?" AND tier = ?":"",i=(g,f)=>s?[t,s,g,g,f]:[t,g,g,f],l=(await this.db.prepare(`SELECT * FROM memory WHERE user_id = ?${a} AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?`).bind(...i(`%${n}%`,r)).all()).results||[];if(l.length>0)return await this.touchMemories(t,l.map(g=>g.id)),l;const c=n.split(/\s+/).filter(g=>g.length>2);if(c.length===0)return[];const d=new Map,u=new Map;for(const g of c){const f=await this.db.prepare(`SELECT * FROM memory WHERE user_id = ?${a} AND (title LIKE ? OR content LIKE ?) LIMIT ?`).bind(...i(`%${g}%`,r*2)).all();for(const b of f.results||[])d.set(b.id,(d.get(b.id)||0)+1),u.set(b.id,b)}const p=[...u.values()].sort((g,f)=>(d.get(f.id)||0)-(d.get(g.id)||0)).slice(0,r);return p.length>0&&await this.touchMemories(t,p.map(g=>g.id)),p}async touchMemories(t,n){for(const r of n)await this.db.prepare("UPDATE memory SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t).run()}async update(t,n,r){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t,n).run()}async promote(t,n){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,n).run(),await this.enforceWorkingMemoryCap(n)}async demote(t,n){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,n).run()}async remove(t,n){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,n).run()}async buildContext(t){const n=await this.getWorkingMemory(t);if(n.length===0)return"";const r={};for(const a of n)r[a.type]||(r[a.type]=[]),r[a.type].push(a);let s=`
## Working Memory (Active Context)
`;for(const[a,i]of Object.entries(r)){s+=`
### ${a.charAt(0).toUpperCase()+a.slice(1)}s
`;for(const o of i)s+=`- **${o.title}**: ${o.content}
`}return Hn(s,Ja)}static truncatePersonality(t){return Hn(t,Va)}async getRecentConversations(t,n=20,r){return r?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,r,n).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,n).all()).results||[]).reverse()}async storeMessage(t,n,r,s,a="{}",i){const o=Za(s);i?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,n,r,s,a,o,i).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,n,r,s,a,o).run()}async compactHistory(t,n=30){const r=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((r==null?void 0:r.cnt)||0)<=n*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,n).run()}}const Xa=Object.freeze(Object.defineProperty({__proto__:null,MemoryService:te},Symbol.toStringTag,{value:"Module"})),Qa="https://accounts.google.com/o/oauth2/v2/auth",Mr="https://oauth2.googleapis.com/token",ei="https://www.googleapis.com/oauth2/v2/userinfo",ti=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let Oe=null;async function fn(e,t,n){const r=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!r)return null;try{const s=await Z(r.encrypted_value,n);return JSON.parse(s)}catch{return null}}async function ni(e,t,n,r){const s=await Tt(JSON.stringify(r),n);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,s).run()}function $r(e,t,n){const r=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:ti,access_type:"offline",prompt:"consent",state:n,include_granted_scopes:"true"});return`${Qa}?${r}`}async function Pr(e,t,n,r){const s=await fetch(Mr,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:n,redirect_uri:r,grant_type:"authorization_code"})}),a=await s.text();if(!s.ok)throw new Error(`Token exchange failed (${s.status}): ${a.substring(0,300)}`);return JSON.parse(a)}async function ri(e,t,n){const r=await fetch(Mr,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:n,grant_type:"refresh_token"})}),s=await r.text();if(!r.ok)throw r.status===400||r.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${r.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function Br(e){const t=await fetch(ei,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function St(e,t,n,r,s){if(!r||!s)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(Oe&&Oe.userId===t&&Oe.expiresAt>Date.now()/1e3+60){const o=await fn(e,t,n);return{token:Oe.token,email:(o==null?void 0:o.email)||"unknown"}}const a=await fn(e,t,n);if(!a)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const i=await ri(a.refresh_token,r,s);return Oe={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{token:i.access_token,email:a.email}}async function Tn(e,t,n){try{const r=await fn(e,t,n);return r?{connected:!0,email:r.email,connectedAt:r.connected_at}:{connected:!1}}catch{return{connected:!1}}}function jr(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function Ur(e,t,n,r,s,a,i){const o=await Pr(r,a,i,s);if(!o.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await Br(o.access_token),c={refresh_token:o.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await ni(e,t,n,c),Oe={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{email:l.email,name:l.name}}async function Hr(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(Oe==null?void 0:Oe.userId)===t&&(Oe=null)}const Ze="https://sheets.googleapis.com/v4/spreadsheets";class Fr{constructor(t,n,r,s,a){this.db=t,this.userId=n,this.pinHash=r,this.clientId=s,this.clientSecret=a}async authHeaders(){const{token:t}=await St(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,n){const r=await this.authHeaders(),s=encodeURIComponent(n),a=await fetch(`${Ze}/${t}/values/${s}`,{headers:r});if(!a.ok){const o=await a.text();throw new Error(`Sheets read failed (${a.status}): ${o}`)}return(await a.json()).values||[]}async writeRange(t,n,r){const s=await this.authHeaders(),a=encodeURIComponent(n),i=await fetch(`${Ze}/${t}/values/${a}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:s,body:JSON.stringify({range:n,majorDimension:"ROWS",values:r})});if(!i.ok){const l=await i.text();throw new Error(`Sheets write failed (${i.status}): ${l}`)}return{updatedCells:(await i.json()).updatedCells||0}}async appendRows(t,n,r){var l;const s=await this.authHeaders(),a=encodeURIComponent(n),i=await fetch(`${Ze}/${t}/values/${a}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:s,body:JSON.stringify({range:n,majorDimension:"ROWS",values:r})});if(!i.ok){const c=await i.text();throw new Error(`Sheets append failed (${i.status}): ${c}`)}return{updatedCells:((l=(await i.json()).updates)==null?void 0:l.updatedCells)||r.length}}async deleteRow(t,n,r){const s=await this.authHeaders(),a=await fetch(`${Ze}/${t}?fields=sheets.properties`,{headers:s});if(!a.ok){const u=await a.text();throw new Error(`Failed to get sheet metadata (${a.status}): ${u}`)}const i=await a.json(),o=i.sheets.find(u=>u.properties.title===n);if(!o){const u=i.sheets.map(p=>p.properties.title).join(", ");throw new Error(`Tab "${n}" not found. Available tabs: ${u}`)}const l=o.properties.sheetId,c=r-1,d=await fetch(`${Ze}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:[{deleteDimension:{range:{sheetId:l,dimension:"ROWS",startIndex:c,endIndex:c+1}}}]})});if(!d.ok){const u=await d.text();throw new Error(`Row delete failed (${d.status}): ${u}`)}}async createSpreadsheet(t,n){const r=await this.authHeaders(),s={properties:{title:t},sheets:n&&n.length>0?n.map(o=>({properties:{title:o}})):[{properties:{title:"Sheet1"}}]},a=await fetch(Ze,{method:"POST",headers:r,body:JSON.stringify(s)});if(!a.ok){const o=await a.text();throw new Error(`Sheets create failed (${a.status}): ${o}`)}const i=await a.json();return{spreadsheetId:i.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${i.spreadsheetId}/edit`}}async getMetadata(t){const n=await this.authHeaders(),r=await fetch(`${Ze}/${t}?fields=properties.title,sheets.properties.title`,{headers:n});if(!r.ok){const a=await r.text();throw new Error(`Sheets metadata failed (${r.status}): ${a}`)}const s=await r.json();return{title:s.properties.title,sheets:s.sheets.map(a=>a.properties.title)}}}const kt="https://www.googleapis.com/calendar/v3";class Sn{constructor(t,n,r,s,a){this.db=t,this.userId=n,this.pinHash=r,this.clientId=s,this.clientSecret=a}async authHeaders(){const{token:t}=await St(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",n={}){const r=await this.authHeaders(),s=new URLSearchParams;n.timeMin&&s.set("timeMin",n.timeMin),n.timeMax&&s.set("timeMax",n.timeMax),s.set("maxResults",String(n.maxResults||20)),s.set("singleEvents","true"),s.set("orderBy","startTime"),n.query&&s.set("q",n.query);const a=await fetch(`${kt}/calendars/${encodeURIComponent(t)}/events?${s}`,{headers:r});if(!a.ok){const o=await a.text();throw new Error(`Calendar list failed (${a.status}): ${o}`)}return(await a.json()).items||[]}async createEvent(t="primary",n){var o;const r=await this.authHeaders(),s=n.timeZone||"Asia/Kolkata",a={summary:n.summary,description:n.description||"",location:n.location||"",start:{dateTime:n.startDateTime,timeZone:s},end:{dateTime:n.endDateTime,timeZone:s}};(o=n.attendees)!=null&&o.length&&(a.attendees=n.attendees.map(l=>({email:l})));const i=await fetch(`${kt}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:r,body:JSON.stringify(a)});if(!i.ok){const l=await i.text();throw new Error(`Calendar create failed (${i.status}): ${l}`)}return await i.json()}async updateEvent(t="primary",n,r){const s=await this.authHeaders(),a=r.timeZone||"Asia/Kolkata",i={};r.summary&&(i.summary=r.summary),r.description&&(i.description=r.description),r.location&&(i.location=r.location),r.startDateTime&&(i.start={dateTime:r.startDateTime,timeZone:a}),r.endDateTime&&(i.end={dateTime:r.endDateTime,timeZone:a});const o=await fetch(`${kt}/calendars/${encodeURIComponent(t)}/events/${n}`,{method:"PATCH",headers:s,body:JSON.stringify(i)});if(!o.ok){const l=await o.text();throw new Error(`Calendar update failed (${o.status}): ${l}`)}return await o.json()}async deleteEvent(t="primary",n){const r=await this.authHeaders(),s=await fetch(`${kt}/calendars/${encodeURIComponent(t)}/events/${n}`,{method:"DELETE",headers:r});if(!s.ok&&s.status!==410){const a=await s.text();throw new Error(`Calendar delete failed (${s.status}): ${a}`)}}async listCalendars(){const t=await this.authHeaders(),n=await fetch(`${kt}/users/me/calendarList`,{headers:t});if(!n.ok){const s=await n.text();throw new Error(`Calendar list calendars failed (${n.status}): ${s}`)}return((await n.json()).items||[]).map(s=>({id:s.id,summary:s.summary,primary:s.primary||!1}))}}const Ie="https://docs.googleapis.com/v1/documents",si="https://www.googleapis.com/drive/v3/files";function Fn(e){const t=[];for(const n of e.split(`
`)){const r=n.trim();if(r===""||/^---+$/.test(r))continue;let s="NORMAL_TEXT",a=n;const i=r.match(/^###\s+(.+)/),o=!i&&r.match(/^##\s+(.+)/),l=!i&&!o&&r.match(/^#\s+(.+)/);i?(s="HEADING_3",a=i[1]):o?(s="HEADING_2",a=o[1]):l?(s="HEADING_1",a=l[1]):/^\s*[-*]\s/.test(n)&&(a="• "+n.replace(/^\s*[-*]\s+/,""));const{text:c,spans:d}=ai(a);t.push({text:c,namedStyle:s,spans:d})}return t}function ai(e){const t=[];let n="",r=0;for(;r<e.length;)if(e[r]==="*"&&e[r+1]==="*"){const s=e.indexOf("**",r+2);if(s!==-1){const a=n.length;n+=e.substring(r+2,s),t.push({start:a,end:n.length,bold:!0}),r=s+2}else n+=e[r++]}else if(e[r]==="_"&&e[r+1]==="_"){const s=e.indexOf("__",r+2);if(s!==-1){const a=n.length;n+=e.substring(r+2,s),t.push({start:a,end:n.length,bold:!0}),r=s+2}else n+=e[r++]}else if(e[r]==="*"&&e[r+1]!=="*"){const s=e.indexOf("*",r+1);if(s!==-1){const a=n.length;n+=e.substring(r+1,s),t.push({start:a,end:n.length,italic:!0}),r=s+1}else n+=e[r++]}else if(e[r]==="_"){const s=e.indexOf("_",r+1);if(s!==-1){const a=n.length;n+=e.substring(r+1,s),t.push({start:a,end:n.length,italic:!0}),r=s+1}else n+=e[r++]}else n+=e[r++];return{text:n,spans:t}}class Wr{constructor(t,n,r,s,a){this.db=t,this.userId=n,this.pinHash=r,this.clientId=s,this.clientSecret=a}async authHeaders(){const{token:t}=await St(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const n=await this.authHeaders(),r=await fetch(Ie,{method:"POST",headers:n,body:JSON.stringify({title:t})});if(!r.ok){const a=await r.text();throw new Error(`Docs create failed (${r.status}): ${a}`)}const s=await r.json();return{documentId:s.documentId,url:`https://docs.google.com/document/d/${s.documentId}/edit`}}async readDocument(t){var i,o;const n=await this.authHeaders(),r=await fetch(`${Ie}/${t}`,{headers:n});if(!r.ok){const l=await r.text();throw new Error(`Docs read failed (${r.status}): ${l}`)}const s=await r.json();let a="";for(const l of((i=s.body)==null?void 0:i.content)||[])if(l.paragraph)for(const c of l.paragraph.elements)(o=c.textRun)!=null&&o.content&&(a+=c.textRun.content);return{title:s.title,content:a.trim()}}async rewriteDocument(t,n){var f;const r=await this.authHeaders(),s=await fetch(`${Ie}/${t}`,{headers:r});if(!s.ok){const b=await s.text();throw new Error(`Docs fetch failed (${s.status}): ${b.substring(0,200)}`)}const i=((f=(await s.json()).body)==null?void 0:f.content)||[],o=i[i.length-1],l=(o==null?void 0:o.endIndex)??2,c=Fn(n),d=[];if(l>2&&d.push({deleteContentRange:{range:{startIndex:1,endIndex:l-1}}}),c.length===0){d.length>0&&await fetch(`${Ie}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:d})});return}let u="";const p=[];for(const b of c){const w=u.length;u+=b.text+`
`,p.push({start:w,end:u.length,namedStyle:b.namedStyle,spans:b.spans})}d.push({insertText:{location:{index:1},text:u}});for(const b of p){b.namedStyle!=="NORMAL_TEXT"&&d.push({updateParagraphStyle:{range:{startIndex:1+b.start,endIndex:1+b.end},paragraphStyle:{namedStyleType:b.namedStyle},fields:"namedStyleType"}});for(const w of b.spans){const T={},S=[];w.bold&&(T.bold=!0,S.push("bold")),w.italic&&(T.italic=!0,S.push("italic")),S.length>0&&d.push({updateTextStyle:{range:{startIndex:1+b.start+w.start,endIndex:1+b.start+w.end},textStyle:T,fields:S.join(",")}})}}const g=await fetch(`${Ie}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:d})});if(!g.ok){const b=await g.text();throw new Error(`Docs rewrite failed (${g.status}): ${b.substring(0,200)}`)}}async appendFormattedContent(t,n){var f;const r=await this.authHeaders(),s=Fn(n);if(s.length===0)return;const a=await fetch(`${Ie}/${t}`,{headers:r});if(!a.ok){const b=await a.text();throw new Error(`Docs fetch failed (${a.status}): ${b.substring(0,200)}`)}const o=((f=(await a.json()).body)==null?void 0:f.content)||[],l=o[o.length-1],c=Math.max(1,((l==null?void 0:l.endIndex)??2)-1);let d="";const u=[];for(const b of s){const w=d.length;d+=b.text+`
`,u.push({start:w,end:d.length,namedStyle:b.namedStyle,spans:b.spans})}const p=[{insertText:{location:{index:c},text:d}}];for(const b of u){b.namedStyle!=="NORMAL_TEXT"&&p.push({updateParagraphStyle:{range:{startIndex:c+b.start,endIndex:c+b.end},paragraphStyle:{namedStyleType:b.namedStyle},fields:"namedStyleType"}});for(const w of b.spans){const T={},S=[];w.bold&&(T.bold=!0,S.push("bold")),w.italic&&(T.italic=!0,S.push("italic")),S.length>0&&p.push({updateTextStyle:{range:{startIndex:c+b.start+w.start,endIndex:c+b.start+w.end},textStyle:T,fields:S.join(",")}})}}const g=await fetch(`${Ie}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:p})});if(!g.ok){const b=await g.text();throw new Error(`Docs append failed (${g.status}): ${b.substring(0,200)}`)}}async appendText(t,n){const r=await this.authHeaders(),s=await fetch(`${Ie}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{insertText:{endOfSegmentLocation:{},text:n}}]})});if(!s.ok){const a=await s.text();throw new Error(`Docs append failed (${s.status}): ${a}`)}}async deleteContent(t,n){var i,o,l;const r=await this.authHeaders(),s=await fetch(`${Ie}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{replaceAllText:{containsText:{text:n,matchCase:!0},replaceText:""}}]})});if(!s.ok){const c=await s.text();throw new Error(`Docs delete content failed (${s.status}): ${c.substring(0,200)}`)}return{occurrencesRemoved:((l=(o=(i=(await s.json()).replies)==null?void 0:i[0])==null?void 0:o.replaceAllText)==null?void 0:l.occurrencesChanged)??0}}async shareDocument(t,n,r="writer"){const s=await this.authHeaders(),a=await fetch(`${si}/${t}/permissions`,{method:"POST",headers:s,body:JSON.stringify({type:"user",role:r,emailAddress:n})});if(!a.ok){const i=await a.text();throw new Error(`Share failed (${a.status}): ${i}`)}}}class ye{constructor(t,n,r,s,a){P(this,"sheets");P(this,"calendar");P(this,"docs");P(this,"db");P(this,"userId");P(this,"pinHash");this.db=t,this.userId=n,this.pinHash=r,this.sheets=new Fr(t,n,r,s,a),this.calendar=new Sn(t,n,r,s,a),this.docs=new Wr(t,n,r,s,a)}async isConnected(){return Tn(this.db,this.userId,this.pinHash)}}const Xe=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:Sn,GoogleDocs:Wr,GoogleServices:ye,GoogleSheets:Fr,completeOAuthFlow:Ur,disconnectGoogle:Hr,exchangeCodeForTokens:Pr,fetchUserInfo:Br,generateAuthUrl:$r,getGoogleAuth:St,isGoogleConnected:Tn,isOAuthClientConfigured:jr},Symbol.toStringTag,{value:"Module"}));async function qr(e,t,n={}){const r={textQuery:t,languageCode:"en",pageSize:8};if(n.type&&(r.includedType=n.type),n.location){const l=n.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(r.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:n.radius||5e3}})}const s=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),a=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":s},body:JSON.stringify(r)});if(!a.ok){const l=await a.text();return{results:[],error:`Places API error (${a.status}): ${l.substring(0,200)}`}}const i=await a.json();return!i.places||i.places.length===0?{results:[]}:{results:i.places.map(l=>{var c,d,u;return{name:((c=l.displayName)==null?void 0:c.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(d=l.currentOpeningHours)==null?void 0:d.openNow,types:(u=l.types)==null?void 0:u.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function Gr(e,t){var a,i,o;const n=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),r=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":n}});if(!r.ok){const l=await r.text();return{error:`Place Details API error (${r.status}): ${l.substring(0,200)}`}}const s=await r.json();return{details:{name:((a=s.displayName)==null?void 0:a.text)||"",address:s.formattedAddress||"",phone:s.internationalPhoneNumber,website:s.websiteUri,rating:s.rating,reviews:(i=s.reviews)==null?void 0:i.slice(0,3).map(l=>{var c,d,u;return{author:((c=l.authorAttribution)==null?void 0:c.displayName)||"Anonymous",rating:l.rating||0,text:((u=(d=l.text)==null?void 0:d.text)==null?void 0:u.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(o=s.currentOpeningHours)==null?void 0:o.weekdayDescriptions,location:s.location?{lat:s.location.latitude,lng:s.location.longitude}:void 0,googleMapsUri:s.googleMapsUri}}}async function zr(e,t,n,r={}){var c;const s=new URLSearchParams({origin:t,destination:n,key:e,mode:r.mode||"driving"});(r.mode==="driving"||!r.mode)&&s.set("departure_time","now");const a=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${s}`);if(!a.ok)return{error:`Directions API error: ${a.status}`};const i=await a.json();if(i.status!=="OK")return{error:`Directions: ${i.status} — ${i.error_message||""}`};const o=i.routes[0],l=o.legs[0];return{route:{summary:o.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(c=l.duration_in_traffic)==null?void 0:c.text,steps:l.steps.slice(0,10).map(d=>{var u,p,g;return{instruction:((u=d.html_instructions)==null?void 0:u.replace(/<[^>]*>/g,""))||"",distance:((p=d.distance)==null?void 0:p.text)||"",duration:((g=d.duration)==null?void 0:g.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function Kr(e,t,n,r){var l,c;const s={q:t,target:n,key:e,format:"text"};r&&(s.source=r);const a=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!a.ok){const d=await a.text();return{translatedText:"",error:`Translate API error (${a.status}): ${d.substring(0,200)}`}}const o=(c=(l=(await a.json()).data)==null?void 0:l.translations)==null?void 0:c[0];return o?{translatedText:o.translatedText,detectedSourceLang:o.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function Yr(e,t){const n=new URLSearchParams({address:t,key:e}),r=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${n}`);if(!r.ok)return{results:[],error:`Geocoding API error: ${r.status}`};const s=await r.json();return s.status!=="OK"&&s.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${s.status} — ${s.error_message||""}`}:{results:(s.results||[]).slice(0,5).map(a=>{var i;return{address:a.formatted_address,lat:a.geometry.location.lat,lng:a.geometry.location.lng,placeId:a.place_id,types:(i=a.types)==null?void 0:i.slice(0,3)}})}}async function Jr(e,t,n={}){const r=new URLSearchParams({part:"snippet",q:t,key:e,type:n.type||"video",maxResults:String(n.maxResults||5),order:n.order||"relevance"}),s=await fetch(`https://www.googleapis.com/youtube/v3/search?${r}`);if(!s.ok){const i=await s.text();return{results:[],error:`YouTube API error (${s.status}): ${i.substring(0,200)}`}}return{results:((await s.json()).items||[]).map(i=>{var o,l,c,d,u,p,g,f;return{title:i.snippet.title,channelTitle:i.snippet.channelTitle,description:(o=i.snippet.description)==null?void 0:o.substring(0,200),videoId:((l=i.id)==null?void 0:l.videoId)||((c=i.id)==null?void 0:c.channelId)||((d=i.id)==null?void 0:d.playlistId)||"",publishedAt:i.snippet.publishedAt,url:(u=i.id)!=null&&u.videoId?`https://www.youtube.com/watch?v=${i.id.videoId}`:(p=i.id)!=null&&p.channelId?`https://www.youtube.com/channel/${i.id.channelId}`:"",thumbnailUrl:(f=(g=i.snippet.thumbnails)==null?void 0:g.medium)==null?void 0:f.url}})}}const ii="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";function Vr(e,t){if(/anomaly-modal/i.test(e))return[];const n=[],r=e.split(/class="result results_links/g).slice(1);for(const s of r){if(n.length>=t)break;const a=s.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),i=s.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(a){let o=a[1];const l=o.match(/uddg=([^&]+)/);l?o=decodeURIComponent(l[1]):o.startsWith("//")&&(o="https:"+o);const c=p=>p.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),d=c(a[2]),u=i?c(i[1]):"";if(d&&o.startsWith("http")){const p=o.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];n.push({title:d,link:o,snippet:u,displayLink:p})}}}return n}async function oi(e,t,n,r){const s=new URLSearchParams({key:t,cx:n,q:e,num:String(Math.min(r,10))}),a=await fetch(`https://www.googleapis.com/customsearch/v1?${s}`);if(!a.ok){const l=await a.text().catch(()=>"");return{results:[],error:`Google CSE failed (${a.status}): ${l.substring(0,200)}`}}return{results:((await a.json()).items||[]).map(l=>({title:l.title||"",link:l.link||"",snippet:l.snippet||"",displayLink:l.displayLink||(l.link||"").replace(/^https?:\/\/(www\.)?/,"").split("/")[0]})).filter(l=>l.title&&l.link.startsWith("http"))}}async function en(e,t={}){const n=Math.min(t.num||5,10),r=t.site?`site:${t.site} ${e}`:e;try{const s=new URLSearchParams({q:r}),a=await fetch("https://html.duckduckgo.com/html/",{method:"POST",headers:{"User-Agent":ii,"Content-Type":"application/x-www-form-urlencoded"},body:s.toString()});if(!a.ok)return{results:[],error:`Search request failed (${a.status})`};const i=await a.text(),o=Vr(i,n);if(o.length>0)return{results:o};if(t.googleApiKey&&t.googleCseId){const l=await oi(r,t.googleApiKey,t.googleCseId,n);if(l.results.length>0)return l;if(l.error)return{results:[],error:l.error}}return/anomaly-modal/i.test(i)?{results:[],error:"Web search blocked by DuckDuckGo bot protection. Configure GOOGLE_API_KEY + GOOGLE_CSE_ID, or add a Perplexity API key in Settings → Keys for faster research."}:{results:[],error:void 0}}catch(s){return{results:[],error:`Web search error: ${s.message}`}}}async function Zr(e,t,n,r="driving"){var l,c,d,u;const s=new URLSearchParams({origins:t,destinations:n,key:e,mode:r,departure_time:"now"}),a=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${s}`);if(!a.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${a.status}`};const i=await a.json(),o=(d=(c=(l=i.rows)==null?void 0:l[0])==null?void 0:c.elements)==null?void 0:d[0];return!o||o.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(o==null?void 0:o.status)||i.status}`}:{distance:o.distance.text,duration:o.duration.text,durationInTraffic:(u=o.duration_in_traffic)==null?void 0:u.text}}const li=Object.freeze(Object.defineProperty({__proto__:null,geocode:Yr,getDirections:zr,getDistanceMatrix:Zr,getPlaceDetails:Gr,parseDuckDuckGoHtml:Vr,searchPlaces:qr,searchYouTube:Jr,translateText:Kr,webSearch:en},Symbol.toStringTag,{value:"Module"})),Ne="https://gmail.googleapis.com/gmail/v1/users/me";class xe{constructor(t,n,r,s,a){this.db=t,this.userId=n,this.pinHash=r,this.clientId=s,this.clientSecret=a}async authHeaders(){const{token:t}=await St(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var o;const n=await this.authHeaders(),r=new URLSearchParams;if(r.set("maxResults",String(t.maxResults||10)),t.query&&r.set("q",t.query),(o=t.labelIds)!=null&&o.length)for(const l of t.labelIds)r.append("labelIds",l);const s=await fetch(`${Ne}/messages?${r}`,{headers:n});if(!s.ok){const l=await s.text();throw new Error(`Gmail list failed (${s.status}): ${l.substring(0,200)}`)}const a=await s.json();if(!a.messages||a.messages.length===0)return[];const i=[];for(const l of a.messages.slice(0,t.maxResults||10))try{const c=await this.getMessage(l.id,n);c&&i.push(c)}catch{}return i}async getMessage(t,n){const r=n||await this.authHeaders(),s=await fetch(`${Ne}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:r});if(!s.ok)return null;const a=await s.json(),i=o=>{var l,c,d;return((d=(c=(l=a.payload)==null?void 0:l.headers)==null?void 0:c.find(u=>u.name.toLowerCase()===o.toLowerCase()))==null?void 0:d.value)||""};return{id:a.id,threadId:a.threadId,snippet:a.snippet||"",subject:i("Subject")||"(no subject)",from:i("From"),to:i("To"),date:i("Date")||new Date(parseInt(a.internalDate)).toISOString(),isUnread:(a.labelIds||[]).includes("UNREAD"),labels:a.labelIds||[]}}async getMessageBody(t){const n=await this.authHeaders(),r=await fetch(`${Ne}/messages/${t}?format=full`,{headers:n});if(!r.ok){const a=await r.text();throw new Error(`Gmail message body failed (${r.status}): ${a.substring(0,200)}`)}const s=await r.json();return Xr(s.payload)}async search(t,n=10){return this.listMessages({query:t,maxResults:n})}async send(t,n,r,s={}){const a=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${n}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];s.cc&&i.push(`Cc: ${s.cc}`),s.bcc&&i.push(`Bcc: ${s.bcc}`),s.replyToMessageId&&(i.push(`In-Reply-To: ${s.replyToMessageId}`),i.push(`References: ${s.replyToMessageId}`)),i.push("",Wn(r));const o=i.join(`\r
`),c={raw:qn(o)};s.threadId&&(c.threadId=s.threadId);const d=await fetch(`${Ne}/messages/send`,{method:"POST",headers:a,body:JSON.stringify(c)});if(!d.ok){const u=await d.text();throw new Error(`Gmail send failed (${d.status}): ${u.substring(0,200)}`)}return await d.json()}async createDraft(t,n,r,s={}){const a=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${n}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];s.cc&&i.push(`Cc: ${s.cc}`),i.push("",Wn(r));const o=i.join(`\r
`),l=qn(o),c=await fetch(`${Ne}/drafts`,{method:"POST",headers:a,body:JSON.stringify({message:{raw:l}})});if(!c.ok){const d=await c.text();throw new Error(`Gmail draft failed (${c.status}): ${d.substring(0,200)}`)}return await c.json()}async markAsRead(t){const n=await this.authHeaders();await fetch(`${Ne}/messages/${t}/modify`,{method:"POST",headers:n,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,n){const r=await this.authHeaders();let s={};switch(n){case"archive":s={removeLabelIds:["INBOX"]};break;case"trash":s={addLabelIds:["TRASH"]};break;case"read":s={removeLabelIds:["UNREAD"]};break;case"unread":s={addLabelIds:["UNREAD"]};break;case"star":s={addLabelIds:["STARRED"]};break;case"unstar":s={removeLabelIds:["STARRED"]};break}const a=await fetch(`${Ne}/messages/${t}/modify`,{method:"POST",headers:{...r,"Content-Type":"application/json"},body:JSON.stringify(s)});if(!a.ok){const i=await a.text();throw new Error(`Failed to modify message: ${i}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),n=await fetch(`${Ne}/labels/INBOX`,{headers:t});return n.ok&&(await n.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),n=await fetch(`${Ne}/profile`,{headers:t});if(!n.ok)throw new Error("Failed to get Gmail profile");return await n.json()}}function Xr(e){var t,n,r;if(!e)return"";if((t=e.body)!=null&&t.data)return dn(e.body.data);if(e.parts){for(const s of e.parts)if(s.mimeType==="text/plain"&&((n=s.body)!=null&&n.data))return dn(s.body.data);for(const s of e.parts)if(s.mimeType==="text/html"&&((r=s.body)!=null&&r.data)){const a=dn(s.body.data);return ci(a)}for(const s of e.parts)if(s.parts){const a=Xr(s);if(a)return a}}return e.snippet||""}function Wn(e){e=e.replace(/\\n/g,`
`).replace(/\\t/g,"	");let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return t=t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)","g"),"<em>$1</em>"),`<html><body style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#000000;">${t.split(/\n\n+/).map(s=>{const a=s.split(`
`);return a.every(i=>/^\s*[-*]\s/.test(i)||i.trim()==="")?`<ul>${a.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*[-*]\s+/,"")}</li>`).join("")}</ul>`:a.every(i=>/^\s*\d+\.\s/.test(i)||i.trim()==="")?`<ol>${a.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*\d+\.\s+/,"")}</li>`).join("")}</ol>`:`<p>${a.join("<br>")}</p>`}).join("")}</body></html>`}function qn(e){const t=new TextEncoder().encode(e);let n="";for(let r=0;r<t.length;r++)n+=String.fromCharCode(t[r]);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function dn(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function ci(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const di=1e4,ui=15e3;async function Qr(e,t){try{const n=new AbortController,r=setTimeout(()=>n.abort(),ui),s=await fetch(e,{signal:n.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(!s.ok)return{text:"",error:`HTTP ${s.status}`};const a=s.headers.get("content-type")||"";if(!a.includes("text/html")&&!a.includes("text/plain")&&!a.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${a.split(";")[0]}`};const i=await s.text();clearTimeout(r);const o=i.length>2e5?i.substring(0,2e5):i,l=mi(o);return l.length<50?{text:"",error:"Page has too little readable content"}:{text:l.substring(0,t||di)}}catch(n){return{text:"",error:n.name==="AbortError"?"Timeout":n.message}}}function mi(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(n,r)=>String.fromCharCode(parseInt(r))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(n=>n.trim()).filter(n=>n.length>0).join(`
`),t.trim()}const pi=45e3;async function hi(e,t){var s,a,i;const n=new AbortController,r=setTimeout(()=>n.abort(),pi);try{const o=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",signal:n.signal,headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar-pro",messages:[{role:"user",content:e}],max_tokens:2e3})});if(clearTimeout(r),!o.ok)return{report:"",sources:[],pagesRead:0,error:`Perplexity error ${o.status}`};const l=await o.json(),c=((i=(a=(s=l==null?void 0:l.choices)==null?void 0:s[0])==null?void 0:a.message)==null?void 0:i.content)||"";if(!c.trim())return{report:"",sources:[],pagesRead:0,error:"Perplexity returned an empty response"};const u=(Array.isArray(l==null?void 0:l.citations)?l.citations:[]).filter(p=>typeof p=="string"&&p.startsWith("http")).map(p=>({title:p.replace(/^https?:\/\/(www\.)?/,"").split("/")[0],url:p}));return{report:c,sources:u,pagesRead:u.length}}catch(o){return clearTimeout(r),{report:"",sources:[],pagesRead:0,error:`Perplexity request failed: ${o.message}`}}}async function es(e,t,n={}){if(n.perplexityApiKey){const p=await hi(e,n.perplexityApiKey);if(!p.error)return p}const r=n.maxPages||(n.depth==="thorough"?5:3),s=n.maxResults||(n.depth==="thorough"?8:5),a=await en(e,{num:s,site:n.site,googleApiKey:n.googleApiKey,googleCseId:n.googleCseId});if(a.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${a.error}`};if(a.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const o=a.results.slice(0,r).map(async p=>{const g=await Qr(p.link);return{title:p.title,url:p.link,displayLink:p.displayLink,snippet:p.snippet,content:g.text,error:g.error}}),c=(await Promise.all(o)).filter(p=>p.content.length>50);if(c.length===0){const p=a.results.map((f,b)=>`[${b+1}] ${f.title}
${f.snippet}
Source: ${f.link}`).join(`

`);return{report:await Gn(e,p,t,"snippets"),sources:a.results.map(f=>({title:f.title,url:f.link})),pagesRead:0}}const d=c.map((p,g)=>`--- SOURCE ${g+1}: ${p.title} (${p.displayLink}) ---
${p.content}
--- END SOURCE ${g+1} ---`).join(`

`);return{report:await Gn(e,d,t,"full"),sources:c.map(p=>({title:p.title,url:p.url})),pagesRead:c.length}}async function Gn(e,t,n,r){const a=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

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

Write a synthesized research report answering the query above.`;try{return(await n.chat([{role:"system",content:a},{role:"user",content:i}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(o){return`Research synthesis error: ${o.message}. Raw search results were found but could not be analyzed.`}}const gi=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:es,fetchPageContent:Qr},Symbol.toStringTag,{value:"Module"})),Ge="https://api.browser-use.com/api/v2",zn=2e4,yn=6e3,fi=3e5,xn=12e3,ts=new Set(["finished","stopped"]);async function Nt(e,t,n=xn){const r=new AbortController,s=setTimeout(()=>r.abort(),n);try{return await fetch(e,{...t,signal:r.signal})}finally{clearTimeout(s)}}async function yi(e){const t=()=>fetch(`${Ge}/sessions`,{method:"POST",headers:{"X-Browser-Use-API-Key":e,"Content-Type":"application/json"},body:JSON.stringify({})});try{let n=await t();if(!n.ok){const s=await n.text().catch(()=>"");if(rs(n.status,s)){if(console.log("[createBrowserSession] concurrency limit — reaping stale sessions and retrying"),await ns(e),n=await t(),!n.ok)return console.log(`[createBrowserSession] FAILED after reap HTTP ${n.status}`),null}else return console.log(`[createBrowserSession] FAILED HTTP ${n.status}: ${s}`),null}const r=await n.json();return console.log(`[createBrowserSession] sessionId=${r.id}`),r.id??null}catch(n){return console.log(`[createBrowserSession] ERROR ${n.message}`),null}}async function tn(e,t){try{await fetch(`${Ge}/sessions/${e}`,{method:"DELETE",headers:{"X-Browser-Use-API-Key":t}}),console.log(`[closeBrowserSession] closed sessionId=${e}`)}catch{}}async function vi(e){try{const t=await Nt(`${Ge}/sessions?filterBy=active&pageSize=100`,{headers:{"X-Browser-Use-API-Key":e}});return t.ok?(await t.json()).items??[]:[]}catch{return[]}}async function ns(e,t){const n=await vi(e);let r=0;for(const s of n)!s.id||t&&s.id===t||(await tn(s.id,e),r++);return r>0&&console.log(`[reapActiveBrowserSessions] closed ${r} stale session(s)`),r}function rs(e,t){const n=(t||"").toLowerCase();return/session/.test(n)?/concurrent|too many|maximum|limit|exceeded/.test(n):!1}async function ss(e,t,n){var o;const r=(n==null?void 0:n.timeoutMs)??fi;console.log(`[runBrowserTask] starting taskLen=${e.length} timeoutMs=${r} hasSecrets=${!!(n!=null&&n.secrets)} reuseSession=${!!(n!=null&&n.sessionId)}`);let s,a;try{const l={task:e};n!=null&&n.secrets&&Object.keys(n.secrets).length>0&&(l.secrets=n.secrets),n!=null&&n.sessionId&&(l.sessionId=n.sessionId);const c=()=>fetch(`${Ge}/tasks`,{method:"POST",headers:{"X-Browser-Use-API-Key":t,"Content-Type":"application/json"},body:JSON.stringify(l)});let d=await c();if(!d.ok){const p=await d.text().catch(()=>"");if(rs(d.status,p)&&(console.log("[runBrowserTask] concurrency limit — reaping stale sessions and retrying"),await ns(t,n==null?void 0:n.sessionId),d=await c()),!d.ok){const g=await d.text().catch(()=>p);return console.log(`[runBrowserTask] CREATE_FAILED HTTP ${d.status}: ${g}`),{output:null,taskId:"",status:"failed",error:`HTTP ${d.status}: ${g}`}}}const u=await d.json();if(s=u.id,a=u.sessionId||void 0,console.log(`[runBrowserTask] CREATED taskId=${s} sessionId=${a}`),!s)return{output:null,taskId:"",status:"failed",error:"No id in create response"}}catch(l){return{output:null,taskId:"",status:"failed",error:l.message}}await new Promise(l=>setTimeout(l,zn));const i=Date.now()+(r-zn);for(;Date.now()<i;){try{const l=await Nt(`${Ge}/tasks/${s}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(l.ok){const c=await l.json();if(ts.has(c.status)){if(c.status==="finished"){let d=c.output??null;if(!d)try{const u=await Nt(`${Ge}/tasks/${s}`,{headers:{"X-Browser-Use-API-Key":t}},xn);if(u.ok){const p=await u.json();if(d=p.output??null,!d&&((o=p.steps)!=null&&o.length)){const g=p.steps[p.steps.length-1];d=g.extracted_content??g.output??g.result??null}}}catch{}return console.log(`[runBrowserTask] COMPLETED taskId=${s} outputLen=${(d??"").length}`),{output:d,taskId:s,sessionId:a,status:"completed"}}return console.log(`[runBrowserTask] FAILED taskId=${s} status=${c.status}`),{output:c.output??null,taskId:s,status:"failed",error:c.output??"Task was stopped before completing"}}}}catch{}await new Promise(l=>setTimeout(l,yn))}return console.log(`[runBrowserTask] TIMEOUT taskId=${s} sessionId=${a}`),{output:null,taskId:s,sessionId:a,status:"timeout"}}async function as(e,t,n){var a;const r=(n==null?void 0:n.waitMs)??3e4,s=Date.now()+r;for(;Date.now()<s;){try{const i=await Nt(`${Ge}/tasks/${e}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(!i.ok){await new Promise(l=>setTimeout(l,yn));continue}const o=await i.json();if(ts.has(o.status)){let l=null;const c=await Nt(`${Ge}/tasks/${e}`,{headers:{"X-Browser-Use-API-Key":t}},xn);if(c.ok){const d=await c.json();if(l=d.output??null,!l&&((a=d.steps)!=null&&a.length)){const u=d.steps[d.steps.length-1];l=u.extracted_content??u.output??u.result??null}}else l=o.output??null;return{status:o.status,output:l,done:!0}}}catch{}await new Promise(i=>setTimeout(i,yn))}return{status:"running",output:null,done:!1}}function wi(e){return`Navigate to https://www.bluedart.com/tracking.
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
If a captcha was encountered, set captcha_required to true and populate whatever tracking data was visible before the captcha appeared.`}async function is(e){const t=e instanceof Buffer?new Uint8Array(e):e,n=new DataView(t.buffer,t.byteOffset,t.byteLength);let r=0;for(;r<t.length-30&&n.getUint32(r,!0)===67324752;){const s=n.getUint16(r+6,!0),a=n.getUint16(r+8,!0),i=n.getUint32(r+18,!0),o=n.getUint32(r+22,!0),l=n.getUint16(r+26,!0),c=n.getUint16(r+28,!0),d=new TextDecoder().decode(t.slice(r+30,r+30+l)),u=r+30+l+c;if(d==="word/document.xml"){const p=t.slice(u,u+i);let g;if(a===0)g=p;else{const w=new DecompressionStream("deflate-raw"),T=w.writable.getWriter();T.write(p),T.close();const S=w.readable.getReader(),R=[];let O=!1;for(;!O;){const U=await S.read();U.done?O=!0:R.push(U.value)}const M=R.reduce((U,Y)=>U+Y.length,0);g=new Uint8Array(o||M);let L=0;for(const U of R)g.set(U,L),L+=U.length}return new TextDecoder().decode(g).replace(/<\/w:p>/g,`
`).replace(/<\/w:tr>/g,`
`).replace(/<[^>]+>/g,"").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim()}r=u+i,s&8&&(r+=16)}return""}const os=Object.freeze(Object.defineProperty({__proto__:null,extractDocxTextFromBuffer:is},Symbol.toStringTag,{value:"Module"})),bi=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,weight:.9},{pattern:/\bremi[a-z]{0,5}\s+(me|us)\b/i,weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,weight:.95},{pattern:/^[Tt]ask:\s*/,weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,weight:.9},{pattern:/\b(change\s+(the\s+)?time|update\s+(the\s+)?(reminder|schedule|alarm)|reschedule|move\s+it\s+to|cancel\s+(the\s+)?(reminder|schedule|alarm)|delete\s+(the\s+)?(reminder|schedule|alarm))\b/i,weight:.9},{pattern:/\b(show\s+(me\s+)?(my\s+)?(reminders?|schedules?|alarms?)|what\s+reminders?|any\s+reminders?|do\s+i\s+have.*remind|when\s+is\s+my\s+remind)\b/i,weight:.9},{pattern:/\b(stop|turn\s+off|switch\s+off|disable|deactivate)\s+(that|the|this|my)?\s*(reminder|schedule|alarm|notification)\b/i,weight:.9},{pattern:/\b(snooze|postpone|push\s+back|remind\s+me\s+later|later\s+reminder)\b/i,weight:.9},{pattern:/\b(change|update|edit|move|shift)\s+(it|this|that)\s+(to|for)\b/i,weight:.85},{pattern:/\bset\s+it\s+(for|at|to)\b/i,weight:.85},{pattern:/\b(what\s+time|when)\s+(did\s+i\s+set|is\s+(the|my)\s+remind|does\s+(it|that)\s+go\s+off)\b/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,weight:.9},{pattern:/\b(add|save|append|write|put)\s+(to|in|into)\s+(my\s+|your\s+|the\s+)?(quick\s+)?notes?\b|\bquick\s+notes\b/i,weight:.88},{pattern:/\b(update\s+cell|change\s+cell|delete\s+row|remove\s+row|delete\s+duplicate|remove\s+duplicate|create\s+(a\s+)?(new\s+)?(tab|sheet)|add\s+(a\s+)?tab|what.{0,15}(column|row\s+\d|cell\s+[A-Z])|sum\s+of|total\s+(in|of))\b/i,weight:.9},{pattern:/\b(forward\s+(that\s+)?(email|message)|reply\s+to\s+(that|the|an?\s+)?email|respond\s+to\s+(that|the)\s+email|mark\s+(it|that|this|email)\s+as|(got|received)\s+an?\s+email\s+from)\b/i,weight:.85},{pattern:/\b(cancel\s+(the\s+)?(event|meeting|appointment)|reschedule\s+(the\s+|my\s+)?(meeting|event|appointment)|delete\s+(from|the)\s+calendar|remove\s+(the\s+)?(event|meeting)\s+from\s+calendar)\b/i,weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,weight:.9},{pattern:/\b((save|store|put)\s+(it\s+|this\s+|that\s+|the\s+)?(to|in|on)\s+(my\s+|your\s+|google\s+)?drive|save\s+(to|as)\s+(a\s+)?(google\s+)?doc)\b/i,weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,weight:.9},{pattern:/\b(keep\s+(that\s+)?in\s+mind|always\s+(do|use|prefer|remember)|update\s+(my\s+)?(memory|preference)|delete\s+(that\s+)?memory|forget\s+that|what\s+did\s+i\s+tell\s+you\s+about)\b/i,weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,weight:.9}];function kn(e,t,n){for(const r of bi)if(r.pattern.test(e))return{agent:"multi",confidence:r.weight,reasoning:"Keyword match — full agent"};if(e.trim().length<80){const r=[n,t].filter(Boolean);for(const s of r)if(s.split(`
`).slice(-16).some(o=>/\[TOOLS_USED:/i.test(o)||/\b(reminder|reminders|schedule|scheduled|cron|alarm|next_run|set for|going off|remind)\b/i.test(o)||/\b(i['']ll\s+(search|research|find|look\s+up|check|add|create|book)|just\s+a\s+moment|pulling\s+that\s+together|on\s+it\b|let\s+me\s+(search|research|find|look))\b/i.test(o)))return{agent:"multi",confidence:.8,reasoning:"Active tool session follow-up — full agent"}}return t&&/spreadsheet|sheet|google\s*sheet/i.test(t)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(e)?{agent:"multi",confidence:.85,reasoning:"Memory context — full agent"}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function ls(e){const t=e.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')]+/);if(t&&/\b(delete|trash|remove)\b/i.test(e))return{tool:"drive_delete_file",args:{url_or_id:t[0].replace(/[.,;)]$/,"")}};if(/\b(list|show|display)\s+(my\s+)?(google\s+)?drive\s+(files?|docs?|documents?|folders?)\b|\bwhat\s+(files?|docs?|documents?)\s+(do\s+i\s+have|are|is)\s+(in|on)\s+(my\s+)?(google\s+)?drive\b/i.test(e))return{tool:"drive_list",args:{}};const n=e.match(/\b(?:search|find|look\s+(?:for|up))\s+(?:(?:in|on|my|the|google)\s+)*drive\s+(?:for\s+)?(.{3,60}?)(?:\s*[?.!,])?$/i);return n?{tool:"drive_search",args:{query:n[1].trim()}}:/\b(how\s+many\s+unread|unread\s+(count|emails?|messages?)|any\s+unread\s+(emails?|messages?))\b/i.test(e)?{tool:"gmail_unread_count",args:{}}:/\b(list|show|display)\s+(my\s+)?(upcoming\s+)?(calendar\s+)?(events?|meetings?|appointments?)\b/i.test(e)&&!/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+week|this\s+week|\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))\b/i.test(e)?{tool:"list_calendar_events",args:{}}:/\b(list|show|display)\s+(my\s+)?(active\s+)?(reminders?|schedules?|alarms?)\b|\bwhat\s+reminders?\s+(do\s+i\s+have|are\s+set|are\s+active)\b/i.test(e)?{tool:"list_schedules",args:{}}:null}function cs(e,t){if(/\b(delete|trash|remove)\b.{0,50}\b(file|doc|document|sheet|spreadsheet|folder)\b|\b(file|doc|document|sheet|spreadsheet)\b.{0,50}\b(delete|trash|remove)\b/i.test(e)){const n=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(n)return{tool:"drive_delete_file",args:{url_or_id:n[0].replace(/[.,;)]$/,"")}}}if(/\b(move|rename|organise|organize)\b.{0,50}\b(file|doc|document|sheet)\b/i.test(e)){const n=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(n){const r={url_or_id:n[0].replace(/[.,;)]$/,"")},s=e.match(/\bto\s+(?:the\s+)?(?:folder\s+)?["']?([A-Za-z0-9 _-]{2,40})["']?\s*(?:folder\b|$)/i),a=e.match(/\brename\b.{0,30}\bto\s+["']?([A-Za-z0-9 _.-]{2,60})["']?/i);if(s&&(r.folder_name=s[1].trim()),a&&(r.new_name=a[1].trim()),r.folder_name||r.new_name)return{tool:"drive_organise",args:r}}}return null}function ds(e,t,n,r,s,a){const i=t.assistant_name||"Karna",o=t.personality_prompt?`
## Personality
${t.personality_prompt.substring(0,2e3)}
`:"",l=n?`
## Active Memory (ALWAYS consult before responding)
${n}
`:"";let c="";try{const u=new Date;c=new Intl.DateTimeFormat("en-GB",{timeZone:t.timezone,day:"numeric",month:"short",year:"numeric"}).format(u)}catch{c=""}const d=`
## Current User
- **Name**: ${t.name}
- **Timezone**: ${t.timezone}
- **Time**: ${s}
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
- Time-aware: reference current date/time when relevant
- **HARD RULE — no false confirmations**: You have ZERO tool access. You CANNOT set reminders, create schedules, send emails, read sheets, or perform any action. NEVER output phrases like "Reminder set for...", "I've scheduled...", "Done ✅", "Task created", or any language implying an action was completed. If the user wants an action, say: "I can do that — just send your message and I'll take care of it." Do NOT simulate the outcome.`;default:return""}}const _i=Object.freeze(Object.defineProperty({__proto__:null,buildSubAgentPrompt:ds,classifyIntentFast:kn,detectDeterministicOp:ls,detectTierTwoOp:cs},Symbol.toStringTag,{value:"Module"})),Ei=new Set(["create_skill","list_skills","store_memory","search_memory","delete_memory","update_memory","get_schedules","delete_schedule","create_schedule","toggle_schedule","gmail_unread_count"]),Ti=3,Si=3,us=5,ms=.4,ps=5;async function hs(e,t,n,r,s,a,i=!0){try{const o=s.filter(f=>!Ei.has(f));if(o.length<Ti)return;const c=[...[...new Set(o)]].sort().join(","),d=await e.prepare(`INSERT INTO skill_patterns (user_id, tool_signature, user_message_sample, tool_sequence, turn_count, succeeded)
       VALUES (?, ?, ?, ?, ?, ?)
       RETURNING id`).bind(n.id,c,r.slice(0,500),JSON.stringify(o),a,i?1:0).first(),u=await e.prepare("SELECT COUNT(*) as c FROM skill_patterns WHERE user_id = ? AND tool_signature = ?").bind(n.id,c).first(),p=(u==null?void 0:u.c)??0,g=await e.prepare(`SELECT auto_skill_id FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id IS NOT NULL LIMIT 1`).bind(n.id,c).first();if(g!=null&&g.auto_skill_id){d!=null&&d.id&&await e.prepare("UPDATE skill_patterns SET auto_skill_id = ? WHERE id = ?").bind(g.auto_skill_id,d.id).run(),await xi(e,n,g.auto_skill_id,c),i&&await Ri(e,t,n,g.auto_skill_id,o,r);return}p>=Si&&await Di(e,t,n,c,o)}catch{}}async function xi(e,t,n,r){const s=await e.prepare(`SELECT AVG(CAST(succeeded AS REAL)) as avg_success, COUNT(*) as total
     FROM (
       SELECT succeeded FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id = ?
       ORDER BY created_at DESC LIMIT 20
     )`).bind(t.id,r,n).first(),a=(s==null?void 0:s.avg_success)??1,i=(s==null?void 0:s.total)??0,o=a<ms&&i>=ps;if(await e.prepare(`UPDATE user_skills
     SET usage_count = usage_count + 1,
         last_used_at = CURRENT_TIMESTAMP,
         confidence_score = ?,
         enabled = CASE WHEN ? THEN 0 ELSE enabled END,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`).bind(a,o?1:0,n,t.id).run(),o){const l=await e.prepare("SELECT name FROM user_skills WHERE id = ?").bind(n).first();l&&await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source, is_read)
         VALUES (?, 'warning', ?, ?, 'skills', 0)`).bind(t.id,`Auto-skill disabled: ${l.name}`,`The skill "${l.name}" was auto-disabled because its success rate dropped below 40% after ${i} uses. You can re-enable or delete it in Settings → Skills.`).run()}}async function gs(e,t){try{const r=(await e.prepare(`SELECT name, description, instructions, usage_count
       FROM user_skills
       WHERE user_id = ? AND is_auto = 1 AND enabled = 1
       ORDER BY usage_count DESC, created_at DESC
       LIMIT 5`).bind(t).all()).results??[];return r.length===0?"":`## Proven Procedures (Auto-Learned)
These workflows were automatically distilled from your past multi-step requests. When a new request closely matches one, follow its procedure without re-reasoning from scratch:

${r.map(a=>`**${a.name}** (used ${a.usage_count}×)
${a.instructions}`).join(`

---

`)}
`}catch{return""}}async function ki(e,t,n){var i;let r=0,s=0,a=0;try{const o=await e.prepare(`SELECT us.id, us.user_id, us.name, us.instructions, us.refinement_count,
              us.confidence_score, us.usage_count
       FROM user_skills us
       WHERE us.user_id = ? AND us.is_auto = 1 AND us.enabled = 1
         AND us.confidence_score < ? AND us.usage_count >= ?`).bind(n,ms,ps).all();for(const l of o.results??[]){r++;const c=await e.prepare(`SELECT user_message_sample, tool_sequence
         FROM skill_patterns
         WHERE auto_skill_id = ? AND succeeded = 1
         ORDER BY created_at DESC LIMIT 3`).bind(l.id).all();if((c.results??[]).length<2||l.refinement_count>=us){await e.prepare("UPDATE user_skills SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(l.id).run(),await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source, is_read)
           VALUES (?, 'warning', ?, ?, 'skills', 0)`).bind(l.user_id,`Auto-skill retired: ${l.name}`,`"${l.name}" had a ${Math.round(l.confidence_score*100)}% success rate and couldn't be improved — disabled. Check Settings → Skills to manage it.`).run(),a++;continue}const d=c.results.map(g=>g.user_message_sample),u=JSON.parse(c.results[0].tool_sequence),p=[{role:"system",content:"You are a workflow optimizer. Rewrite a skill procedure so it is more reliable, based on examples that previously succeeded."},{role:"user",content:`Skill "${l.name}" has a ${Math.round(l.confidence_score*100)}% success rate.

Current instructions:
${l.instructions}

Recent successful examples:
${d.map((g,f)=>`${f+1}. "${g}"`).join(`
`)}
Tools used: ${u.join(" → ")}

Rewrite the instructions to be clearer and more reliable. Keep them under 200 words.
Respond with EXACTLY:
REWRITTEN_INSTRUCTIONS: <revised instructions>`}];try{const b=(((i=(await t.chat(p,{tools:[]})).content)==null?void 0:i.trim())??"").match(/^REWRITTEN_INSTRUCTIONS:\s*([\s\S]+)$/m);b&&b[1].trim()&&(await e.prepare(`UPDATE user_skills
             SET instructions = ?, refinement_count = refinement_count + 1, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`).bind(b[1].trim(),l.id).run(),s++)}catch{await e.prepare("UPDATE user_skills SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(l.id).run(),a++}}}catch{}return{reviewed:r,rewritten:s,disabled:a}}async function Di(e,t,n,r,s){var R;const i=((await e.prepare(`SELECT user_message_sample, tool_sequence
     FROM skill_patterns
     WHERE user_id = ? AND tool_signature = ?
     ORDER BY created_at DESC LIMIT 3`).bind(n.id,r).all()).results??[]).map(O=>O.user_message_sample),o=[{role:"system",content:"You are a workflow analyst. Given examples of user requests that all triggered the same multi-tool sequence, write a concise reusable skill procedure."},{role:"user",content:`These user requests all produced the same multi-tool workflow:

${i.map((O,M)=>`${M+1}. "${O}"`).join(`
`)}

Tools used (in order): ${s.join(" → ")}

Write a reusable skill. Respond with EXACTLY these three fields (no extra text):
NAME: <2-4 word skill name>
DESCRIPTION: <one sentence — what this skill does>
INSTRUCTIONS: <step-by-step instructions referencing exact tool names, under 200 words>`}],c=((R=(await t.chat(o,{tools:[]})).content)==null?void 0:R.trim())??"",d=c.match(/^NAME:\s*(.+)$/m),u=c.match(/^DESCRIPTION:\s*(.+)$/m),p=c.match(/^INSTRUCTIONS:\s*([\s\S]+)$/m);if(!d||!u||!p)return;const g=d[1].trim(),f=u[1].trim(),b=p[1].trim();if(!g||!f||!b)return;let w=`auto_${g.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").substring(0,40)}`;await e.prepare("SELECT id FROM user_skills WHERE user_id = ? AND slug = ?").bind(n.id,w).first()&&(w=`${w}_${Date.now().toString().slice(-4)}`);const S=await e.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, required_tools, is_auto, source)
     VALUES (?, ?, ?, ?, ?, ?, 1, 'auto')
     RETURNING id`).bind(n.id,g,w,f,b,JSON.stringify(s)).first();S!=null&&S.id&&await e.prepare("UPDATE skill_patterns SET auto_skill_id = ? WHERE user_id = ? AND tool_signature = ?").bind(S.id,n.id,r).run()}async function Ri(e,t,n,r,s,a){var u;const i=await e.prepare("SELECT name, instructions, refinement_count FROM user_skills WHERE id = ? AND user_id = ?").bind(r,n.id).first();if(!i||i.refinement_count>=us)return;const o=[{role:"system",content:"You are a workflow optimizer. Given an existing skill and a new usage example, decide if the instructions should be improved."},{role:"user",content:`Existing skill "${i.name}":
${i.instructions}

New example that used this same workflow:
User asked: "${a}"
Tools used: ${s.join(" → ")}

If the existing instructions are accurate and complete for this new example, respond with exactly:
NO_CHANGE

If you can improve clarity or add a genuinely useful detail, respond with:
UPDATED_INSTRUCTIONS: <revised instructions, under 200 words>

Keep changes minimal. Only update if the new example reveals a real gap.`}],c=((u=(await t.chat(o,{tools:[]})).content)==null?void 0:u.trim())??"";if(!c||c.startsWith("NO_CHANGE")||!c.includes("UPDATED_INSTRUCTIONS:"))return;const d=c.replace(/^UPDATED_INSTRUCTIONS:\s*/m,"").trim();!d||d===i.instructions||await e.prepare(`UPDATE user_skills
     SET instructions = ?, refinement_count = refinement_count + 1, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`).bind(d,r).run()}function Oi(e,t,n){const r={timestamp:new Date().toISOString(),level:e,message:t};n&&Object.keys(n).length>0&&Object.assign(r,n);try{return JSON.stringify(r)}catch{return JSON.stringify({timestamp:r.timestamp,level:e,message:t,context:"[unserializable context]"})}}function Dn(e,t,n){const r=Oi(e,t,n);switch(e){case"error":console.error(r);break;case"warn":console.warn(r);break;case"debug":console.debug(r);break;default:console.log(r)}}function Kn(e,t){Dn("info",e,t)}function fs(e,t){Dn("warn",e,t)}function vn(e,t){Dn("error",e,t)}const Ii=2e3,Ni=2e3,ys=4;function un(e){return Math.ceil(e.length/ys)}function Yn(e,t){const n=t*ys;return e.length<=n?e:e.slice(0,n)+`
[...truncated to fit token budget]`}const vs=6e3,wn="The user is following up on prior research in this thread. Answer from the injected research context first. If the follow-up requires new or updated information, call the research tool again with a query that includes the original topic.";function Rn(e){try{const t=JSON.parse(e||"{}");return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function ws(e,t){const n=[...new Set(e)],r={};return n.length>0&&(r.tools=n),t&&(r.research_query=t.query.substring(0,200),r.research_report=t.report.substring(0,vs)),JSON.stringify(r)}function On(e){const t=[];for(const n of e)if(!(n.role!=="user"&&n.role!=="assistant")){if(n.role==="assistant"){const r=Rn(n.metadata);r.research_report&&t.push({role:"user",content:`[Tool Result for research]: ${r.research_report}`})}t.push({role:n.role,content:n.content})}return t}function bs(e){return e.slice(-6).map(t=>{var n;return t.role==="assistant"&&(n=Rn(t.metadata).tools)!=null&&n.includes("research")?`[TOOLS_USED: research] ${t.content}`:t.content}).join(`
`)}function In(e){var t;for(let n=e.length-1;n>=0;n--){const r=e[n];if(r.role==="assistant")return((t=Rn(r.metadata).tools)==null?void 0:t.includes("research"))??!1}return!1}function _s(e,t,n,r){return e!=="research"||/^(Research failed|Research error|Research timed out|\[Tool Error)/i.test(n)?r:{query:String(t.query||""),report:n.substring(0,vs)}}function Es(e,t){if(!t)return;const n=e[e.length-1];(n==null?void 0:n.role)!=="user"||typeof n.content!="string"||n.content.startsWith(wn)||(e[e.length-1]={role:"user",content:`${wn}

${n.content}`})}function Ts(e){const t=new Set(["(Previous response was not recorded.)","(Previous request did not complete. Please try again.)","(My previous response was cut off before completing. Starting fresh.)"]),n=[];for(const s of e){const a=typeof s.content=="string"?s.content:"";if(s.role==="assistant"&&t.has(a.trim())&&n.length>0&&n[n.length-1].role==="user"){n.pop();continue}n.push(s)}const r=[];for(const s of n){let a=s.content;s.role==="assistant"&&typeof a=="string"&&(a=a.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim(),a||(a="(Previous response was not recorded.)"));const i=a!==s.content?{...s,content:a}:s;r.length>0&&r[r.length-1].role===i.role&&i.role!=="system"?r[r.length-1]={...r[r.length-1],content:r[r.length-1].content+`

`+i.content}:r.push(i)}return r}const Jn=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes (recurring). daily = RECURRING every single day at HH:MM — only use if user explicitly says "every day", "daily", or "each morning" etc. weekly = recurring every week on a specific day at time. once = fires ONE TIME at a specific date+time — USE THIS as the DEFAULT for any reminder that is not explicitly recurring (e.g. "remind me at 8pm", "remind me tomorrow at 9am", "remind me Sunday at 8:45am" are all once, not daily). IMPORTANT: NEVER use interval/daily/weekly for tasks that send emails to external recipients — use once instead. Recurring email-sending tasks spam the recipient on every cron tick.'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration requests: "in 5 minutes", "in 2 hours", "in half an hour". Do NOT use for any request that mentions a specific time or date ("at 13:00", "tomorrow at noon", "next Friday") — use schedule_value instead. Examples: "in 5 minutes" = 5, "in 2 hours" = 120.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"update_schedule",description:'Update an existing scheduled task — change its name, description, or reschedule it to a new time. Use this when the user wants to change the time of a reminder or rename it. You MUST call this tool — never say "updated" without calling it.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to update (get it from list_schedules first if unknown)"},name:{type:"string",description:"New name for the task (optional)"},description:{type:"string",description:"New description (optional)"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:"New schedule type (required if changing the time)"},schedule_value:{type:"string",description:"New schedule value matching the schedule_type format (required if changing the time)"},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration changes ("in 30 minutes", "in 2 hours"). Do NOT use if the user specifies a clock time or date — use schedule_value instead.'}},required:["job_id"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:`Store a PERMANENT rule, preference, or standing instruction that Karna should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts — those go to create_schedule. NEVER USE FOR: full text of essays, articles, reports, drafts, or any document body — those belong in document_library (if uploaded) or create_doc (Google Drive). A URL/title pointer is OK (type='context'), but never the body. Ask yourself: "Will this still be relevant in 6 months and is it a preference/rule, not a document?" If no, do not store it.`,parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"delete_memory",description:'Delete a stored memory entry by its ID. Use when the user says "forget that", "remove that rule", or "that preference is wrong". Always call search_memory first to confirm the correct ID. Confirm with the user if there is any ambiguity about which entry to remove.',parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to delete"}},required:["id"]}},{name:"update_memory",description:"Update the content of an existing memory entry by its ID. Use when the user wants to correct or change a stored rule or preference. Always call search_memory first to find the correct ID.",parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to update"},content:{type:"string",description:"The new content to replace the existing entry"}},required:["id","content"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"delete_sheet_row",description:"Delete a specific row from a Google Sheet tab by row number. The row number is as displayed in the sheet (1-based: row 1 = header, row 2 = first data row). Rows below shift up. ALWAYS call read_sheet first to confirm the exact row number before deleting. Cannot delete row 1 (header).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},sheet_name:{type:"string",description:'Tab name exactly as shown in the sheet (e.g. "Sheet1", "Budget", "January")'},row_number:{type:"number",description:"Row number to delete (1-based, as shown in the sheet). Minimum 2."}},required:["spreadsheet_id","sheet_name","row_number"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"rewrite_doc",description:"Replace the entire content of an existing Google Document with new formatted content. Use this to reformat or clean up a document — clears the current content and rewrites it with proper headings, bold, bullet points etc. Workflow: read_doc to get current content → rewrite_doc with reformatted version.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to rewrite (from URL: docs.google.com/document/d/{ID}/edit)"},content:{type:"string",description:"New formatted content (supports markdown: # ## ### headings, **bold**, *italic*, - bullets)"}},required:["document_id","content"]}},{name:"delete_doc_content",description:"Remove specific text from a Google Document by exact string match. Removes ALL occurrences of the text. Use this to delete a duplicate entry — call read_doc first to find the exact text. If text appears twice (duplicate), both copies are removed; use append_to_doc immediately after to add the single correct version back.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"},text_to_remove:{type:"string",description:"Exact text to remove, including any surrounding whitespace or line breaks needed to cleanly remove the entry."}},required:["document_id","text_to_remove"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. Use this when the user explicitly says "send" (not just "draft" or "compose"). STRICT RULES: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm the address. (2) The body must be based on content from this conversation (research results, user-provided text, or a draft composed earlier in this turn) — do NOT invent facts. Using an email body you just composed or drafted in the same conversation is fine. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:'Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Use this when the user says "draft", "compose", or "prepare" an email, OR when no explicit recipient address has been provided. If the user explicitly says "send" and provides an email address, use gmail_send instead. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_read_file",description:"Read the content of a specific Google Drive file by URL or file ID. Supports Google Docs (exported as text), Sheets (exported as CSV), PDFs (extracted via AI), and other text files. Use this when the user shares a Google Drive or Google Docs link and wants you to read, summarize, or analyze the file contents.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive or Google Docs URL (e.g. https://drive.google.com/file/d/... or https://docs.google.com/document/d/...) or bare file ID"},extract_focus:{type:"string",description:'Optional: specific content to focus extraction on (e.g. "financial figures", "action items", "table of contents")'}},required:["url_or_id"]}},{name:"drive_delete_file",description:"Move a Google Drive file or document to trash. The file can be restored from Drive trash within 30 days. Use when the user asks to delete, remove, or trash a file.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to trash"}},required:["url_or_id"]}},{name:"drive_organise",description:"Move a Google Drive file to a folder and/or rename it. Creates the folder if it does not exist. Use when the user wants to organise, move, or rename a file in Drive.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to move/rename"},folder_name:{type:"string",description:"Name of the destination folder. Creates it if it does not exist."},new_name:{type:"string",description:"Optional: new name for the file"}},required:["url_or_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets (~1s). Use ONLY when: (1) the user wants a list of links to browse, not a synthesized answer, (2) real-time scores or breaking headlines, or (3) fallback if research tool fails. If the user wants an actual answer (not links), use research instead.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:"Deep web research — synthesizes a detailed report from multiple sources. Uses Perplexity Sonar when available (~5s), otherwise fetches and reads 3-5 pages (~15s). Default search tool — use whenever your training knowledge might be stale, uncertain, or high-stakes. Covers: weather, travel, recommendations, comparisons, product questions, reviews, current data, anything needing a verified or up-to-date answer. Only skip this in favor of web_search when user wants raw links or real-time scores.",parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~30-60s). thorough = 5 pages (~60-120s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"browser_task",description:'Run a complete browser automation workflow using a real cloud browser. The cloud agent handles ALL steps — navigation, clicks, form fills, extraction — in a single call. CRITICAL: Always pass the ENTIRE multi-step workflow as one task description. Never split a browser workflow across multiple browser_task calls. Wrong: call 1 "go to site", call 2 "click X", call 3 "extract Y". Correct: one call with "go to site, click X, extract Y". Use for: JS-heavy sites, form submission, clicking through pages, any site requiring a real browser.',parameters:{type:"object",properties:{task:{type:"string",description:'Full Plain-English description of the COMPLETE workflow (e.g. "Go to news.ycombinator.com and return the top 5 story titles and URLs", "Go to books.toscrape.com, click the Mystery category, list the first 5 books with their star rating and price")'},site_name:{type:"string",description:'Name of a saved Secret Vault entry (e.g. "LinkedIn", "Outlook") to inject login credentials. REQUIRED for any site that needs a login. You MUST call vault_lookup first to find the exact entry name, then pass it here. If omitted for a login-required site, no credentials will be injected and the task will fail to authenticate.'}},required:["task"]}},{name:"browser_task_status",description:"Check the status of a previously started browser task that was still running when it timed out. Use when the user asks what happened with a browser task. Get the task_id from memory.",parameters:{type:"object",properties:{task_id:{type:"string",description:"The task ID returned by the earlier browser_task call (stored in memory)"}},required:["task_id"]}},{name:"vault_lookup",description:"Check the Secret Vault for saved login credentials by site name. Returns matching entry names (not actual credentials). Use this BEFORE calling browser_task whenever the user asks to access a site that requires a password or login.",parameters:{type:"object",properties:{site_name:{type:"string",description:'Site or service name to look up (e.g. "LinkedIn", "Gmail backup", "MyBank"). Case-insensitive, partial matches included.'}},required:["site_name"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"parse_document",description:"Read and extract text content from an uploaded file (PDF, Word/DOCX, images, or text). Call this whenever the user uploads a document and wants you to read it, extract information, or work with its contents.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id returned when the file was uploaded"},extract_focus:{type:"string",description:'Optional: specific information to focus on extracting (e.g., "quantities and equipment names", "dates and amounts", "all text content")'}},required:["file_id"]}},{name:"search_library",description:`Search the user's Document Library (uploaded files and migrated documents) by name, summary, or extracted text. Use this when the user asks "find my essay about X", "what did I upload about Y", "do I have a document on Z", or any question that might be answered by an uploaded file. Returns a list of matching documents with previews and IDs. Follow with read_library_file to get full text.`,parameters:{type:"object",properties:{query:{type:"string",description:"Search terms to look for in document name, summary, or extracted text"},limit:{type:"number",description:"Maximum number of results to return (1-20, default: 10)"}},required:["query"]}},{name:"read_library_file",description:"Read the full extracted text of a document from the Document Library. Use after search_library to get full content. Pass either the numeric document id (from search_library results) or a partial name. Returns up to 20,000 characters of extracted text.",parameters:{type:"object",properties:{id_or_name:{type:"string",description:"Numeric document ID from search_library results, or a partial document name to search by"}},required:["id_or_name"]}},{name:"create_skill",description:"Create a new reusable skill — a named workflow that can be invoked by name in future conversations. Use this when the user asks you to create a skill, save a workflow, or build a reusable automation. IMPORTANT: Before calling this, ask the user clarifying questions to understand: what the skill should do, what inputs it needs, what tools it uses, and what the expected output is.",parameters:{type:"object",properties:{name:{type:"string",description:'Human-readable skill name (e.g., "Equipment List Parser", "Daily Expense Logger")'},description:{type:"string",description:"One-sentence description of what the skill does"},instructions:{type:"string",description:"Detailed step-by-step instructions for executing the skill. Be specific about which tools to use, in what order, and what to do with the results."},required_tools:{type:"array",items:{type:"string"},description:'List of tool names this skill needs (e.g. ["parse_document", "append_sheet", "create_sheet"])'},parameters:{type:"object",description:"JSON schema describing the inputs this skill accepts. Use standard JSON schema format."},examples:{type:"array",description:"Optional example inputs and expected outputs to guide execution",items:{type:"object",properties:{input:{type:"object"},output:{type:"string"}}}}},required:["name","description","instructions"]}},{name:"list_skills",description:"List all custom skills the user has created. Shows name, description, and usage count for each.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled skills. Default: false"}}}}];async function Nn(e,t){try{const r=((await e.prepare("SELECT slug, name, description, parameters FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at ASC").bind(t).all()).results||[]).map(s=>{let a={};try{a=JSON.parse(s.parameters)||{}}catch{}return a.properties||(a={type:"object",properties:{inputs:{type:"string",description:"Any additional context or specific instructions for this skill execution"}}}),{name:s.slug,description:`[Custom Skill] ${s.description}`,parameters:a}});return[...Jn,...r]}catch{return Jn}}async function Cn(e,t){try{const r=(await e.prepare("SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t).all()).results||[];return r.length===0?"":r.map(s=>`- ${s.content}`).join(`
`)}catch{return""}}function Ss(e,t,n,r,s){const a=e.assistant_name||"Karna",i=e.personality_prompt?Yn(`## Personality Instructions
${e.personality_prompt}
`,Ii):"",o=r!=null&&r.trim()?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. They are fixed — do not store copies of these in your memory or contradict them.
${r}
`:"",l=Yn(t,Ni);let c="";try{const u=new Date;c=new Intl.DateTimeFormat("en-GB",{timeZone:e.timezone,day:"numeric",month:"short",year:"numeric"}).format(u)}catch{c=""}return`You are ${a}.

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
- **Today's date for sheets**: ${c}

${i}

${o}

---

## Your Memory

Read everything here before responding. This is your stored knowledge of this person — preferences, standing rules, data sources, patterns, systems. These override defaults without re-confirmation.

- Memory references a spreadsheet ID → use it directly with read_sheet/write_sheet. Don't ask for it again.
- Memory records a preference → follow it.
- Memory records a resolved pattern (e.g. "item + amount = expense to Monthly Budget sheet") → act on it directly, no question.

${l}

${s?s+`
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
${xs(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${n==="telegram"?'\n\n## TELEGRAM CONSTRAINTS\n- **Essays / save to Drive**: When the user wants an essay, article, or report saved to Google Drive (or says "store/save to drive"), you MUST call `create_doc` with the **full** text in the `content` parameter — never truncate for Telegram. Do NOT paste the essay body in chat (reply with title + Doc link only). Write from your knowledge unless they asked for research — do NOT call web_search before a plain essay. One `create_doc` call with title + full content (+ optional `folder_name`).\n- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).\n- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use `schedule_value` with the exact datetime in the user\'s local timezone — NEVER use `minutes_from_now` for clock-time requests (it causes wrong times). Only use `minutes_from_now` for pure duration requests like "in 30 minutes" or "in 2 hours".\n- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I\'ll now..." — just call the tool.\n- **Long content intent check**: When asked to write long-form content (essay, article, report) WITHOUT any save destination (no mention of Drive, Google Doc, or "save/store"), ask first: "Should I save the full piece as a Google Doc and send you the link, or give you a brief summary here in chat?" Default to Google Doc for anything over ~300 words. If they already said Drive/Doc/save/store, skip this question and call `create_doc` with the complete text immediately. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**':""}`}async function mn(e,t,n){var c;const s=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${n.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let a;((c=s.files)==null?void 0:c.length)>0?a=s.files[0].id:a=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:n,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${a}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:a,folderName:n}}function Jt(e){return e.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").replace(/<function_calls>[\s\S]*?<\/function_calls>/gi,"").replace(/<function_result>[\s\S]*?<\/function_result>/gi,"").replace(/^\[calling:[^\]]*\]\s*/i,"").trim()}function xs(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}const Ci={read_sheet:"read",search_memory:"read",list_schedules:"read",write_sheet:"write",append_sheet:"write",update_schedule:"write",delete_schedule:"write",gmail_send:"external_effect",create_calendar_event:"external_effect"};function Ai(e,t){const n=Ci[e]||"read";if(n==="read")return null;const r=ks(t);return n==="write"&&r!=="execute"?`POLICY BLOCKED (${n}): ${e} requires transaction_mode=execute.`:n==="external_effect"&&r!=="execute"?`POLICY BLOCKED (${n}): ${e} can cause external side effects and needs transaction_mode=execute.`:null}const Li=["ETIMEDOUT","TIMEOUT","429","503","ECONNRESET","network"],Mi=new Set(["write_sheet","append_sheet","gmail_send","create_calendar_event","update_schedule","delete_schedule","delete_memory"]),$i={create_schedule:{required:["name","schedule_type","action_type"],enum:{schedule_type:["interval","daily","weekly","once"]}},update_schedule:{required:["job_id"]},delete_schedule:{required:["job_id"]},write_sheet:{required:["spreadsheet_id","range","values"]},append_sheet:{required:["spreadsheet_id","range","values"]},gmail_send:{required:["to","subject","body"]}};function Pi(e){const t=String((e==null?void 0:e.message)||e||"Unknown tool error");return/timeout|timed out/i.test(t)?"TOOL_TIMEOUT":/unauthorized|forbidden|401|403/i.test(t)?"TOOL_AUTH":/not found|404/i.test(t)?"TOOL_NOT_FOUND":/rate limit|429/i.test(t)?"TOOL_RATE_LIMIT":/validation|invalid|required/i.test(t)?"TOOL_VALIDATION":"TOOL_EXECUTION_FAILED"}function Bi(e){const t=String((e==null?void 0:e.message)||e||"").toLowerCase();return Li.some(n=>t.includes(n.toLowerCase()))}function ji(e,t){const n=$i[e];if(n){for(const r of n.required||[])if(t[r]===void 0||t[r]===null||t[r]==="")throw new Error(`Validation failed: ${r} is required for ${e}`);for(const[r,s]of Object.entries(n.enum||{}))if(t[r]!==void 0&&!s.includes(String(t[r])))throw new Error(`Validation failed: ${r} must be one of ${s.join(", ")}`)}}function ks(e){const t=e.transaction_mode;return t==="dry_run"||t==="confirm_required"||t==="execute"?t:"execute"}function Ui(e,t){if(!Mi.has(e))return null;const n=ks(t);return n==="dry_run"?`DRY RUN: ${e} validated. No write action was executed.`:n==="confirm_required"?`CONFIRMATION REQUIRED: ${e} is a write action. Re-run with transaction_mode=execute to proceed.`:null}const Hi=new Set(["gmail_send","gmail_draft","gmail_modify","append_sheet","create_sheet","write_sheet","create_doc","append_to_doc","rewrite_doc","create_calendar_event","create_schedule","create_skill"]),Fi=new Set(["list_schedules","search_memory","get_system_status","read_sheet","list_calendar_events","read_doc","gmail_list","gmail_read","gmail_search","gmail_unread_count","drive_list","drive_search","drive_read_file","web_search","read_url","research","browser_task_status","vault_lookup","search_places","get_place_details","get_directions","get_travel_time","translate_text","search_youtube","geocode_address","parse_document","search_library","read_library_file","list_skills"]),Wi=5;async function Ct(e,t,n,r,s,a,i,o,l,c,d,u,p,g,f){const b=Date.now();let w=!0,T="",S="";const R=s.traceId||crypto.randomUUID(),O=`${r}:${e}:${JSON.stringify(t)}`;if(Hi.has(e)&&!Fi.has(e))try{const L=await n.prepare(`SELECT tool_result FROM tool_execution_log
           WHERE user_id = ? AND tool_name = ? AND idempotency_key = ? AND success = 1
             AND created_at >= datetime('now', '-${Wi} minutes')
           ORDER BY created_at DESC
           LIMIT 1`).bind(r,e,O).first();if(L)return L.tool_result||""}catch{}try{ji(e,t);const L=Ai(e,t);if(L)return S=L,S;const U=Ui(e,t);if(U)return S=U,S;const Y=2;for(let ee=1;ee<=Y;ee++)try{const se=e==="browser_task"?31e4:e==="browser_task_status"?35e3:e==="research"?18e4:9e4;S=await Promise.race([Gi(e,t,n,r,a,i,o,l,c,d,u,p,g,s.channel,f),new Promise((A,K)=>setTimeout(()=>K(new Error("Tool timed out")),se))]);break}catch(se){if(ee<Y&&Bi(se)){await new Promise(A=>setTimeout(A,250*ee));continue}throw se}return S}catch(L){throw w=!1,T=`${Pi(L)}: ${L.message||"Unknown error"}`,new Error(T)}finally{const L=Date.now()-b;try{await n.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel, idempotency_key)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(r,s.agentType||null,s.providerName||null,e,JSON.stringify({...t,_idempotency_key:O,_trace_id:R}).substring(0,2e3),(w?S:"").substring(0,500),w?1:0,T||null,L,s.isEnforcementRetry?1:0,s.channel||"web",O).run()}catch{}}}function Ds(e){const t=e.length;for(let n=0;n<t-1;n++){const r=e[n];if(r.role!=="user"||typeof r.content!="string")continue;const s=t-1-n,a=s<=2?12e3:s<=4?5e3:2e3;r.content.length>a&&(e[n]={...r,content:r.content.substring(0,a)+`
[...truncated in history to reduce context size]`})}}function qi(e){const t=[];let n=[],r="",s=!1,a=0;const i=e.length;for(;a<i;){const o=e[a];if(s){if(o==='"'){if(e[a+1]==='"'){r+='"',a+=2;continue}s=!1,a++;continue}r+=o,a++;continue}if(o==='"'){s=!0,a++;continue}if(o===","){n.push(r),r="",a++;continue}if(o==="\r"&&e[a+1]===`
`){n.push(r),t.push(n),n=[],r="",a+=2;continue}if(o===`
`||o==="\r"){n.push(r),t.push(n),n=[],r="",a++;continue}r+=o,a++}for((r||n.length)&&(n.push(r),t.push(n));t.length&&t[t.length-1].every(o=>o==="");)t.pop();return t}async function Gi(e,t,n,r,s,a,i,o,l,c,d,u,p,g,f){var w,T,S,R,O,M,L,U,Y,ee,se,A,K,X,q,re,oe,W,Q;const b=new te(n);switch(e){case"create_schedule":{const m=new Date;let y;const h=c||"UTC";if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){y=new Date(m.getTime()+t.minutes_from_now*60*1e3);const I=y.toLocaleString("en-US",{timeZone:h,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[B,N,C]=(I[0]||"").split("/");t.schedule_value=`${C}-${B}-${N} ${I[1]||"00:00"}`,t.schedule_type="once"}else if(t.schedule_type==="interval"){const D=parseInt(t.schedule_value,10);y=new Date(m.getTime()+D*60*1e3)}else if(t.schedule_type==="daily"&&t.action_type==="reminder"){const D=`${t.name||""} ${t.action_description||""}`.toLowerCase();if(/\bevery\b|\bdaily\b|\beach\b|\bmorning\b|\bevening\b|\bnight\b|\bweekday\b|\bweekend\b|\brecurring\b|\brepeat\b/.test(D)){const[B,N]=t.schedule_value.split(":").map(Number),C=m.toLocaleString("en-US",{timeZone:h}),$=new Date(C),j=new Date($);j.setHours(B,N,0,0),j<=$&&j.setDate(j.getDate()+1);const G=new Date(j.toLocaleString("en-US",{timeZone:"UTC"})),J=new Date(j.toLocaleString("en-US",{timeZone:h})),z=G.getTime()-J.getTime();y=new Date(j.getTime()+z)}else{const[B,N]=t.schedule_value.split(":").map(Number),C=m.toLocaleString("en-US",{timeZone:h}),$=new Date(C),j=new Date($);j.setHours(B,N,0,0),j<=$&&j.setDate(j.getDate()+1);const G=Ve=>String(Ve).padStart(2,"0"),J=j.getFullYear(),z=G(j.getMonth()+1),le=G(j.getDate());t.schedule_value=`${J}-${z}-${le} ${G(B)}:${G(N)}`,t.schedule_type="once";const de=new Date(j.toLocaleString("en-US",{timeZone:"UTC"})),Pe=new Date(j.toLocaleString("en-US",{timeZone:h})),Je=de.getTime()-Pe.getTime();y=new Date(j.getTime()+Je)}}else if(t.schedule_type==="daily"){const[D,I]=t.schedule_value.split(":").map(Number),B=m.toLocaleString("en-US",{timeZone:h}),N=new Date(B),C=new Date(N);C.setHours(D,I,0,0),C<=N&&C.setDate(C.getDate()+1);const $=new Date(C.toLocaleString("en-US",{timeZone:"UTC"})),j=new Date(C.toLocaleString("en-US",{timeZone:h})),G=$.getTime()-j.getTime();y=new Date(C.getTime()+G)}else if(t.schedule_type==="weekly"){const[D,I]=t.schedule_value.split(" "),[B,N]=(I||"00:00").split(":").map(Number),$=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Je=>Je.toLowerCase()===D.toLowerCase()),j=m.toLocaleString("en-US",{timeZone:h}),G=new Date(j),J=new Date(G);J.setHours(B,N,0,0);let z=($-J.getDay()+7)%7;z===0&&J<=G&&(z=7),J.setDate(J.getDate()+z);const le=new Date(J.toLocaleString("en-US",{timeZone:"UTC"})),de=new Date(J.toLocaleString("en-US",{timeZone:h})),Pe=le.getTime()-de.getTime();y=new Date(J.getTime()+Pe)}else if(t.schedule_type==="once"){const[D,I]=t.schedule_value.split(" "),[B,N,C]=D.split("-").map(Number),[$,j]=(I||"00:00").split(":").map(Number),G=m.toLocaleString("en-US",{timeZone:h}),J=new Date(G),z=new Date(J);z.setFullYear(B,N-1,C),z.setHours($,j,0,0);const le=new Date(z.toLocaleString("en-US",{timeZone:"UTC"})),de=new Date(z.toLocaleString("en-US",{timeZone:h})),Pe=le.getTime()-de.getTime();y=new Date(z.getTime()+Pe);const Je=new Date(m.getTime()+120*1e3);if(y.getTime()<m.getTime()+60*1e3){const Ve=y.toISOString();y=Je;const Ft=` [Note: The requested time ${t.schedule_value} in ${h} resolved to ${Ve} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${y.toISOString()}.]`;t._pastTimeWarning=Ft}}else y=new Date(m.getTime()+3600*1e3);if((t.schedule_type==="interval"||t.schedule_type==="daily"||t.schedule_type==="weekly")&&t.action_type==="custom"){const D=`${t.name||""} ${t.action_description||t.description||""}`.toLowerCase();/\b(send|forward)\b.{0,40}\b(email|mail)\b|\bemail.{0,20}\bto\b|\bgmail_send\b/.test(D)&&(t.schedule_type="once")}if(t.action_type==="custom"&&t.schedule_type==="once"){const D=`${t.name||""} ${t.action_description||t.description||""}`.toLowerCase();/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i.test(D)||(t.action_type="reminder")}if(await n.prepare("SELECT id FROM cron_jobs WHERE user_id = ? AND name = ? AND schedule_type = ? AND schedule_value = ? AND state != 'completed' LIMIT 1").bind(r,t.name,t.schedule_type,t.schedule_value).first()){const D=y.toLocaleString("en-US",{timeZone:h,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule already exists: "${t.name}" is already set for ${D} (${h}). No duplicate created.`}await n.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(r,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),y.toISOString()).run();const _=t._pastTimeWarning||"",k=y.toLocaleString("en-US",{timeZone:h,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${t.name}" — ${t.schedule_type}. Will fire at ${k} (${h}). [UTC: ${y.toISOString()}]${_}. IMPORTANT: Use the exact time "${k}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const y=(await n.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(r).all()).results||[];return y.length===0?"No scheduled tasks found.":y.map(h=>`[ID:${h.id}] ${h.enabled?"▶":"⏸"} "${h.name}" — [${h.schedule_type}] ${h.schedule_value} — ${h.action_type} — state: ${h.state||"active"} — next: ${h.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const m=t.enabled?1:0,y=m?"active":"paused";return await n.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(m,y,t.job_id,r).run(),`Schedule ${t.job_id} ${m?"enabled (active)":"paused"}.`}case"update_schedule_state":{const m=["created","active","reminding","paused","completed"],y=t.state;if(!m.includes(y))return`Invalid state "${y}". Valid states: ${m.join(", ")}`;const h=y==="completed"||y==="paused"?0:1;return await n.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(y,h,t.job_id,r).run(),`Schedule ${t.job_id} state updated to "${y}".`}case"update_schedule":{const m=t.job_id,y=c||"UTC",h=new Date,v=["updated_at = CURRENT_TIMESTAMP"],E=[];t.name&&(v.push("name = ?"),E.push(t.name)),t.description&&(v.push("description = ?"),E.push(t.description));let _=null,k=t.schedule_type,D=t.schedule_value;if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){_=new Date(h.getTime()+t.minutes_from_now*60*1e3);const N=_.toLocaleString("en-US",{timeZone:y,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[C,$,j]=(N[0]||"").split("/");D=`${j}-${C}-${$} ${N[1]||"00:00"}`,k="once"}else if(k&&D){if(k==="interval")_=new Date(h.getTime()+parseInt(D,10)*60*1e3);else if(k==="daily"){const[B,N]=D.split(":").map(Number),C=new Date(h.toLocaleString("en-US",{timeZone:y})),$=new Date(C);$.setHours(B,N,0,0),$<=C&&$.setDate($.getDate()+1);const j=new Date($.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date($.toLocaleString("en-US",{timeZone:y})).getTime();_=new Date($.getTime()+j)}else if(k==="weekly"){const[B,N]=D.split(" "),[C,$]=(N||"00:00").split(":").map(Number),G=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Pe=>Pe.toLowerCase()===B.toLowerCase()),J=new Date(h.toLocaleString("en-US",{timeZone:y})),z=new Date(J);z.setHours(C,$,0,0);let le=(G-z.getDay()+7)%7;le===0&&z<=J&&(le=7),z.setDate(z.getDate()+le);const de=new Date(z.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(z.toLocaleString("en-US",{timeZone:y})).getTime();_=new Date(z.getTime()+de)}else if(k==="once"){const[B,N]=D.split(" "),[C,$,j]=B.split("-").map(Number),[G,J]=(N||"00:00").split(":").map(Number),z=new Date(h.toLocaleString("en-US",{timeZone:y})),le=new Date(z);le.setFullYear(C,$-1,j),le.setHours(G,J,0,0);const de=new Date(le.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(le.toLocaleString("en-US",{timeZone:y})).getTime();_=new Date(le.getTime()+de),_.getTime()<h.getTime()+60*1e3&&(_=new Date(h.getTime()+120*1e3))}}if(k&&(v.push("schedule_type = ?"),E.push(k)),D&&(v.push("schedule_value = ?"),E.push(D)),_&&(v.push("next_run = ?"),E.push(_.toISOString())),v.length===1)return"No changes provided. Specify name, description, or schedule fields to update.";E.push(m,r),await n.prepare(`UPDATE cron_jobs SET ${v.join(", ")} WHERE id = ? AND user_id = ?`).bind(...E).run();const I=_?_.toLocaleString("en-US",{timeZone:y,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):null;return`Schedule ${m} updated.${I?` New fire time: ${I} (${y}).`:""} IMPORTANT: Use this exact time "${I}" when confirming to the user.`}case"delete_schedule":return await n.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,r).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const m=t.importance||5,y=t.type==="task"?"preference":t.type,h=m>=7?"working":"long_term";return await b.store(r,y,t.title,t.content,m,h),`Stored in ${h==="working"?"working":"long-term"} memory: [${y}] ${t.title} (importance: ${m})`}case"search_memory":{const m=await b.search(r,t.query);return m.length===0?"No matching memories found.":m.map(y=>`[id:${y.id}] [${y.tier||"long_term"}] [${y.type}] **${y.title}**: ${y.content}`).join(`
`)}case"delete_memory":return await b.remove(t.id,r),`Memory entry ${t.id} deleted.`;case"update_memory":return await b.update(t.id,r,t.content),`Memory entry ${t.id} updated.`;case"get_system_status":{const m=await n.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),y=await n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),h=await n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(r).first(),v=await n.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),E=await n.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first();return`System Status:
- Active schedules: ${(m==null?void 0:m.cnt)||0}
- Memory: ${(h==null?void 0:h.cnt)||0} working / ${(y==null?void 0:y.cnt)||0} total
- Total messages: ${(v==null?void 0:v.cnt)||0}
- Unread errors: ${(E==null?void 0:E.cnt)||0}`}case"read_sheet":{if(!s)return"Authentication context unavailable.";try{const m=new ye(n,r,s,a||"",i||""),y=t.spreadsheet_id;let h=t.range;const v=await m.sheets.getMetadata(y),E=v.sheets;h.includes("!")||(h=`${E[0]}!${h}`);let _;try{_=await m.sheets.readRange(y,h)}catch(D){if((w=D.message)!=null&&w.includes("Unable to parse range")||(T=D.message)!=null&&T.includes("400")){const I=h.includes("!")?h.split("!")[1]:h;h=`${E[0]}!${I}`,_=await m.sheets.readRange(y,h)}else throw D}let k=`[Spreadsheet: "${v.title}" | Reading tab: "${h.split("!")[0]}" | All tabs in this spreadsheet: ${E.map(D=>`"${D}"`).join(", ")}]
`;return E.length>1&&(k+=`[To read a different tab, call read_sheet again with range like "${E[1]}!A1:Z500"]
`),_.length===0?k+"No data found in the specified range.":k+_.map(D=>D.join("	| ")).join(`
`)}catch(m){return await H(n,r,"google","read_sheet",m.message),`Failed to read sheet: ${m.message}`}}case"write_sheet":{if(!s)return"Authentication context unavailable.";try{const m=new ye(n,r,s,a||"",i||"");if(!(await m.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{const N=new te(n),C=JSON.stringify(t.values);await N.store(r,"context",`Pending sheet write: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"write_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:C.length>15e3?"[[truncated — re-provide values on retry]]":t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The sheet write has been saved to temporary memory. After reconnecting, tell me "write the pending sheet data" to complete this.`:"")}const h=t.values;let v=t.range;const k=Math.max(...h.map(N=>N.length))+4,D=h.map(N=>{const C=[...N];for(;C.length<k;)C.push("");return C}),I=v.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(I){const N=I[1]||"",C=I[2],$=I[3],j=I[5],J=C.toUpperCase().charCodeAt(0)-64+k-1,z=J<=26?String.fromCharCode(64+J):"Z";v=`${N}${C}${$}:${z}${j}`}const B=await m.sheets.writeRange(t.spreadsheet_id,v,D);try{const N=new te(n),C=await N.search(r,`Pending sheet write: ${t.spreadsheet_id}`);for(const $ of C)$.title.startsWith(`Pending sheet write: ${t.spreadsheet_id}`)&&await N.remove($.id,r)}catch{}return`Written ${B.updatedCells} cells to ${v}.`}catch(m){return await H(n,r,"google","write_sheet",m.message),`Failed to write sheet: ${m.message}`}}case"append_sheet":{if(!s)return"Authentication context unavailable.";try{const m=new ye(n,r,s,a||"",i||"");if(!(await m.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{await new te(n).store(r,"context",`Pending sheet append: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"append_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The append data has been saved to temporary memory. After reconnecting, tell me "append the pending sheet data" to complete this.`:"")}const h=await m.sheets.appendRows(t.spreadsheet_id,t.range,t.values);try{const v=new te(n),E=await v.search(r,`Pending sheet append: ${t.spreadsheet_id}`);for(const _ of E)_.title.startsWith(`Pending sheet append: ${t.spreadsheet_id}`)&&await v.remove(_.id,r)}catch{}return`Appended ${h.updatedCells} cells to ${t.range}.`}catch(m){return await H(n,r,"google","append_sheet",m.message),`Failed to append to sheet: ${m.message}`}}case"create_sheet":{if(!s)return"Authentication context unavailable.";try{const m=new ye(n,r,s,a||"",i||"");if(!(await m.isConnected()).connected){if(t.title)try{await new te(n).store(r,"context",`Pending spreadsheet create: "${t.title}"`,JSON.stringify({tool:"create_sheet",title:t.title,sheet_names:t.sheet_names??null,folder_name:t.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title?`

The spreadsheet request has been saved to temporary memory. After reconnecting, tell me "create the pending spreadsheet" and I'll complete this automatically.`:"")}const h=await m.sheets.createSpreadsheet(t.title,t.sheet_names);let v="";if(t.folder_name)try{const{token:E}=await(await Promise.resolve().then(()=>Xe)).getGoogleAuth(n,r,s,a||"",i||"");v=`
Folder: "${(await mn(E,h.spreadsheetId,t.folder_name)).folderName}"`}catch(E){v=`
(Note: spreadsheet saved to Drive root — could not place in folder "${t.folder_name}": ${E.message})`}try{await new te(n).store(r,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${h.spreadsheetId} | URL: ${h.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${v}
ID: ${h.spreadsheetId}
URL: ${h.url}`}catch(m){return await H(n,r,"google","create_sheet",m.message),`Failed to create spreadsheet: ${m.message}`}}case"list_calendar_events":{if(!s)return"Authentication context unavailable.";try{const m=new ye(n,r,s,a||"",i||""),y=t.calendar_id||"primary",h=t.days_ahead||7,v=new Date,E=new Date(v.getTime()+h*24*60*60*1e3),_=await m.calendar.listEvents(y,{timeMin:v.toISOString(),timeMax:E.toISOString(),query:t.query});return _.length===0?`No events found in the next ${h} days.`:_.map(k=>{var C;const D=k.start.dateTime||k.start.date||"TBD",I=k.end.dateTime||k.end.date||"",B=k.location?` 📍 ${k.location}`:"",N=((C=k.attendees)==null?void 0:C.map($=>$.email).join(", "))||"";return`• ${k.summary} — ${D} to ${I}${B}${N?`
  Attendees: ${N}`:""}`}).join(`
`)}catch(m){return await H(n,r,"google","list_calendar",m.message),`Failed to list events: ${m.message}`}}case"create_calendar_event":{if(!s)return"Authentication context unavailable.";try{const m=new ye(n,r,s,a||"",i||"");if(!(await m.isConnected()).connected){if(t.summary&&t.start_datetime&&t.end_datetime)try{await new te(n).store(r,"context",`Pending calendar event: "${t.summary}"`,JSON.stringify({tool:"create_calendar_event",summary:t.summary,description:t.description??null,location:t.location??null,start_datetime:t.start_datetime,end_datetime:t.end_datetime,attendees:t.attendees??null,calendar_id:t.calendar_id??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.summary&&t.start_datetime?`

The calendar event has been saved to temporary memory. After reconnecting, tell me "create the pending event" and I'll add it to your calendar.`:"")}const h=t.calendar_id||"primary",v=await m.calendar.createEvent(h,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});try{const E=new te(n),_=await E.search(r,`Pending calendar event: "${t.summary}"`);for(const k of _)k.title.startsWith(`Pending calendar event: "${t.summary}"`)&&await E.remove(k.id,r)}catch{}return`Event created: "${v.summary}"
ID: ${v.id}
Start: ${v.start.dateTime||v.start.date}`}catch(m){return await H(n,r,"google","create_event",m.message),`Failed to create event: ${m.message}`}}case"create_doc":{if(!s)return"Authentication context unavailable.";const m=new ye(n,r,s,a||"",i||"");if(!(await m.isConnected()).connected){if(t.title&&t.content){try{await new te(n).store(r,"context",`Pending Google Doc save: "${t.title}"`,JSON.stringify({tool:"create_doc",title:t.title,content:t.content,folder_name:t.folder_name??null}),9,"working")}catch{}try{await n.prepare(`INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
               VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`).bind(r,`Pending doc: "${t.title}"`,'Google not connected — reconnect then say "save the pending document".',`pending_doc_${t.title}`,JSON.stringify({tool:"create_doc",title:t.title,folder_name:t.folder_name??null})).run()}catch{}}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" and I'll complete this automatically.`:"")}let h;try{h=await m.docs.createDocument(t.title)}catch(E){return await H(n,r,"google","create_doc",E.message),`Failed to create document: ${E.message}`}if(t.content){const E=t.content,_=async()=>{E.length>12e3?await m.docs.appendText(h.documentId,E):await m.docs.appendFormattedContent(h.documentId,E)};try{await _()}catch(k){try{await m.docs.appendText(h.documentId,E)}catch(D){return await H(n,r,"google","create_doc_append",D.message),`Document created but content could not be written (${D.message}).
ID: ${h.documentId}
URL: ${h.url}

Use append_to_doc with the document ID above to add content.`}await H(n,r,"google","create_doc_append_fallback",`Formatted append failed, used plain text: ${k.message}`)}}let v="";if(t.folder_name)try{const{token:E}=await(await Promise.resolve().then(()=>Xe)).getGoogleAuth(n,r,s,a||"",i||"");v=`
Folder: "${(await mn(E,h.documentId,t.folder_name)).folderName}"`}catch(E){v=`
(Note: document saved to Drive root — could not place in folder "${t.folder_name}": ${E.message})`}try{await new te(n).store(r,"context",`Document: ${t.title}`,`Document ID: ${h.documentId} | URL: ${h.url}`,6,"working")}catch{}try{const E=t.content;await n.prepare(`INSERT OR IGNORE INTO document_library (user_id, source, drive_file_id, name, summary, extracted_text, status)
           VALUES (?, 'drive', ?, ?, ?, ?, 'parsed')`).bind(r,h.documentId,t.title,E?E.substring(0,500):null,E?E.substring(0,5e4):null).run()}catch{}try{const E=new te(n),_=await E.search(r,`Pending Google Doc save: "${t.title}"`);for(const k of _)k.title.startsWith(`Pending Google Doc save: "${t.title}"`)&&await E.remove(k.id,r)}catch{}return`Document created: "${t.title}"${v}
ID: ${h.documentId}
URL: ${h.url}`}case"read_doc":{if(!s)return"Authentication context unavailable.";try{const y=await new ye(n,r,s,a||"",i||"").docs.readDocument(t.document_id);return`Document: "${y.title}"

${y.content}`}catch(m){return await H(n,r,"google","read_doc",m.message),`Failed to read document: ${m.message}`}}case"append_to_doc":{if(!s)return"Authentication context unavailable.";try{const m=new ye(n,r,s,a||"",i||"");if(!(await m.isConnected()).connected){if(t.document_id&&t.content)try{await new te(n).store(r,"context",`Pending append to doc: "${t.document_id}"`,JSON.stringify({tool:"append_to_doc",document_id:t.document_id,content:t.content}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.'+(t.document_id&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" to complete this.`:"")}await m.docs.appendFormattedContent(t.document_id,t.content);let h=t.document_id;try{h=(await m.docs.readDocument(t.document_id)).title}catch{}try{const v=new te(n),E=await v.search(r,`Pending append to doc: "${t.document_id}"`);for(const _ of E)_.title.startsWith(`Pending append to doc: "${t.document_id}"`)&&await v.remove(_.id,r)}catch{}try{const v=t.content;await n.prepare(`UPDATE document_library
             SET extracted_text = SUBSTR(COALESCE(extracted_text, '') || char(10) || ?, 1, 50000),
                 updated_at = CURRENT_TIMESTAMP
             WHERE user_id = ? AND drive_file_id = ?`).bind(v,r,t.document_id).run()}catch{}return`Content appended to "${h}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(m){return await H(n,r,"google","append_to_doc",m.message),`Failed to append to document: ${m.message}`}}case"rewrite_doc":{if(!s)return"Authentication context unavailable.";try{const m=new ye(n,r,s,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";await m.docs.rewriteDocument(t.document_id,t.content);let h=t.document_id;try{h=(await m.docs.readDocument(t.document_id)).title}catch{}return`Document "${h}" reformatted successfully.
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(m){return await H(n,r,"google","rewrite_doc",m.message),`Failed to rewrite document: ${m.message}`}}case"delete_sheet_row":{if(!s)return"Authentication context unavailable.";try{const m=new ye(n,r,s,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const h=t.row_number;return h<2?"Row 1 is the header row and cannot be deleted. Specify row 2 or higher.":(await m.sheets.deleteRow(t.spreadsheet_id,t.sheet_name,h),`Row ${h} deleted from "${t.sheet_name}". All rows below have shifted up.`)}catch(m){return await H(n,r,"google","delete_sheet_row",m.message),`Failed to delete row: ${m.message}`}}case"delete_doc_content":{if(!s)return"Authentication context unavailable.";try{const m=new ye(n,r,s,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const h=await m.docs.deleteContent(t.document_id,t.text_to_remove);return h.occurrencesRemoved===0?"No matching text found in the document. The text must match exactly — check spacing, punctuation, and line breaks.":`Removed ${h.occurrencesRemoved} occurrence${h.occurrencesRemoved===1?"":"s"} from the document.`}catch(m){return await H(n,r,"google","delete_doc_content",m.message),`Failed to delete document content: ${m.message}`}}case"gmail_list":{if(!s)return"Authentication context unavailable.";try{const y=await new xe(n,r,s,a||"",i||"").listMessages({maxResults:t.max_results||10,query:t.query});return y.length===0?"No messages found.":y.map((h,v)=>`${h.isUnread?"● ":"  "}${v+1}. **${h.subject}**
   From: ${h.from}
   Date: ${h.date}
   ${h.snippet}
   [id: ${h.id}]`).join(`

`)}catch(m){return await H(n,r,"gmail","list",m.message),(S=m.message)!=null&&S.includes("not connected")?m.message:`Gmail list error: ${m.message}`}}case"gmail_read":{if(!s)return"Authentication context unavailable.";try{const m=new xe(n,r,s,a||"",i||""),y=await m.getMessage(t.message_id);if(!y)return"Message not found.";const h=await m.getMessageBody(t.message_id);return`**${y.subject}**
From: ${y.from}
To: ${y.to}
Date: ${y.date}

${h}`}catch(m){return await H(n,r,"gmail","read",m.message),`Gmail read error: ${m.message}`}}case"gmail_search":{if(!s)return"Authentication context unavailable.";try{const y=await new xe(n,r,s,a||"",i||"").search(t.query,t.max_results||10);return y.length===0?`No results for: ${t.query}`:y.map((h,v)=>`${h.isUnread?"● ":"  "}${v+1}. **${h.subject}**
   From: ${h.from}
   Date: ${h.date}
   ${h.snippet}
   [id: ${h.id}]`).join(`

`)}catch(m){return await H(n,r,"gmail","search",m.message),`Gmail search error: ${m.message}`}}case"gmail_send":{if(!s)return"Authentication context unavailable.";try{const m=new xe(n,r,s,a||"",i||"");if(!(await new ye(n,r,s,a||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body){try{await new te(n).store(r,"context",`Pending email: "${t.subject}"`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}try{await n.prepare(`INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
                 VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`).bind(r,`Pending email: "${t.subject}"`,`To: ${t.to} — reconnect Google then say "send the pending email".`,`pending_email_${t.subject}`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject})).run()}catch{}}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your email has been saved to temporary memory. After reconnecting, tell me "send the pending email" and I'll send it automatically.`:"")}const v=await m.send(t.to,t.subject,t.body,{cc:t.cc});try{const E=new te(n),_=await E.search(r,`Pending email: "${t.subject}"`);for(const k of _)k.title.startsWith(`Pending email: "${t.subject}"`)&&await E.remove(k.id,r)}catch{}return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${v.id}]`}catch(m){return await H(n,r,"gmail","send",m.message),`Gmail send error: ${m.message}`}}case"gmail_draft":{if(!s)return"Authentication context unavailable.";try{const m=new xe(n,r,s,a||"",i||"");if(!(await new ye(n,r,s,a||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body)try{await new te(n).store(r,"context",`Pending draft: "${t.subject}"`,JSON.stringify({tool:"gmail_draft",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your draft has been saved to temporary memory. After reconnecting, tell me "create the pending draft" and I'll save it to Gmail.`:"")}const v=await m.createDraft(t.to,t.subject,t.body,{cc:t.cc});try{const _=new te(n),k=await _.search(r,`Pending draft: "${t.subject}"`);for(const D of k)D.title.startsWith(`Pending draft: "${t.subject}"`)&&await _.remove(D.id,r)}catch{}const E=t.cc?`, CC: ${t.cc}`:"";return`Draft created. To: ${t.to}${E}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${v.id}]`}catch(m){return await H(n,r,"gmail","draft",m.message),`Gmail draft error: ${m.message}`}}case"gmail_modify":{if(!s)return"Authentication context unavailable.";try{return await new xe(n,r,s,a||"",i||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(m){return await H(n,r,"gmail","modify",m.message),`Gmail modify error: ${m.message}`}}case"gmail_unread_count":{if(!s)return"Authentication context unavailable.";try{const y=await new xe(n,r,s,a||"",i||"").getUnreadCount();return`You have ${y} unread email${y!==1?"s":""} in Gmail.`}catch(m){return(R=m.message)!=null&&R.includes("not connected")?m.message:`Gmail error: ${m.message}`}}case"drive_list":{if(!s)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>Xe)).getGoogleAuth(n,r,s,a||"",i||""),y=new URLSearchParams;y.set("pageSize",String(t.max_results||10)),y.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),y.set("orderBy","modifiedTime desc");let h="";t.folder_id?h=`'${t.folder_id}' in parents and trashed = false`:t.query?h=`${t.query} and trashed = false`:h="trashed = false",y.set("q",h);const v=await fetch(`https://www.googleapis.com/drive/v3/files?${y}`,{headers:{Authorization:`Bearer ${m}`}});if(!v.ok)throw new Error(`Drive API error (${v.status})`);const E=await v.json();return(O=E.files)!=null&&O.length?E.files.map((_,k)=>{var N,C;const D=((N=_.mimeType)==null?void 0:N.split(".").pop())||_.mimeType,I=_.size?`${(parseInt(_.size)/1024).toFixed(1)} KB`:"",B=((C=_.modifiedTime)==null?void 0:C.split("T")[0])||"";return`${k+1}. **${_.name}** (${D})
   ${I} · Modified: ${B}
   ${_.webViewLink||""}`}).join(`

`):"No files found."}catch(m){return await H(n,r,"google","drive_list",m.message),`Drive list error: ${m.message}`}}case"drive_search":{if(!s)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>Xe)).getGoogleAuth(n,r,s,a||"",i||""),y=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,h=new URLSearchParams;h.set("q",y),h.set("pageSize",String(t.max_results||10)),h.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),h.set("orderBy","modifiedTime desc");const v=await fetch(`https://www.googleapis.com/drive/v3/files?${h}`,{headers:{Authorization:`Bearer ${m}`}});if(!v.ok)throw new Error(`Drive API error (${v.status})`);const E=await v.json();return(M=E.files)!=null&&M.length?E.files.map((_,k)=>{var B,N;const D=((B=_.mimeType)==null?void 0:B.split(".").pop())||_.mimeType,I=((N=_.modifiedTime)==null?void 0:N.split("T")[0])||"";return`${k+1}. **${_.name}** (${D}) — Modified: ${I}
   ${_.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(m){return await H(n,r,"google","drive_search",m.message),`Drive search error: ${m.message}`}}case"drive_read_file":{if(!s)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>Xe)).getGoogleAuth(n,r,s,a||"",i||""),y=t.url_or_id.trim();let h=y;const v=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/\/presentation\/d\/([a-zA-Z0-9_-]+)/,/\/forms\/d\/([a-zA-Z0-9_-]+)/,/[?&]id=([a-zA-Z0-9_-]+)/,/\/d\/([a-zA-Z0-9_-]+)/];for(const j of v){const G=y.match(j);if(G){h=G[1];break}}const E=await fetch(`https://www.googleapis.com/drive/v3/files/${h}?fields=id,name,mimeType,size`,{headers:{Authorization:`Bearer ${m}`}});if(!E.ok)throw new Error(`Drive API error (${E.status}): could not fetch file metadata`);const _=await E.json(),{name:k,mimeType:D}=_,I=t.extract_focus,B=I?`Focus specifically on extracting: ${I}`:"Extract and return all readable text content. Preserve structure where relevant.",N={"application/vnd.google-apps.document":"text/plain","application/vnd.google-apps.spreadsheet":"text/csv","application/vnd.google-apps.presentation":"text/plain"};if(N[D]){const j=N[D],G=await fetch(`https://www.googleapis.com/drive/v3/files/${h}/export?mimeType=${encodeURIComponent(j)}`,{headers:{Authorization:`Bearer ${m}`}});if(!G.ok)throw new Error(`Drive export error (${G.status})`);const J=await G.text();if(D==="application/vnd.google-apps.spreadsheet"){const z=qi(J),le=z.length,de=((L=z[0])==null?void 0:L.length)??0;return`**${k}** (Google Sheet — ${le} rows × ${de} columns)

Parsed rows (JSON, ready for write_sheet/append_sheet):
${JSON.stringify(z)}`}return`**${k}**

${J.substring(0,2e4)}`}if(D==="application/pdf"||k.toLowerCase().endsWith(".pdf")){const j=await fetch(`https://www.googleapis.com/drive/v3/files/${h}?alt=media`,{headers:{Authorization:`Bearer ${m}`}});if(!j.ok)throw new Error(`Drive download error (${j.status})`);const G=await j.arrayBuffer(),J=Buffer.from(G).toString("base64");let z=null,le="claude-haiku-4-5-20251001";for(const Ve of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const Ft=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,Ve).first();if(Ft&&s){const zs=await Z(Ft.encrypted_value,s),Wt=JSON.parse(zs);if(Wt.provider==="anthropic"){z=Wt.apiKey,Wt.model&&(le=Wt.model);break}}}catch{}if(!z)return`"${k}" is a PDF. An Anthropic API key is required to extract PDF content. Please configure one in Settings → Keys.`;const de=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":z,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:le,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:J}},{type:"text",text:B}]}]})});if(!de.ok){const Ve=await de.text();throw new Error(`Anthropic PDF extraction error: ${Ve.substring(0,200)}`)}const Je=((Y=(U=(await de.json()).content)==null?void 0:U[0])==null?void 0:Y.text)||"";return`**${k}** (PDF from Drive)

${Je}`}const C=await fetch(`https://www.googleapis.com/drive/v3/files/${h}?alt=media`,{headers:{Authorization:`Bearer ${m}`}});if(!C.ok)throw new Error(`Drive download error (${C.status})`);const $=await C.text();return`**${k}** (${D})

${$.substring(0,2e4)}`}catch(m){return await H(n,r,"google","drive_read_file",m.message),`Drive read error: ${m.message}`}}case"drive_delete_file":{if(!s)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>Xe)).getGoogleAuth(n,r,s,a||"",i||""),y=t.url_or_id.trim();let h=y;const v=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const D of v){const I=y.match(D);if(I){h=I[1];break}}const E=await fetch(`https://www.googleapis.com/drive/v3/files/${h}?fields=name`,{headers:{Authorization:`Bearer ${m}`}});if(!E.ok)throw new Error(`Drive API error (${E.status})`);const _=await E.json(),k=await fetch(`https://www.googleapis.com/drive/v3/files/${h}`,{method:"PATCH",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({trashed:!0})});if(!k.ok)throw new Error(`Drive API error (${k.status})`);return`"${_.name}" moved to trash. You can restore it from Drive trash within 30 days.`}catch(m){return await H(n,r,"google","drive_delete_file",m.message),`Drive delete error: ${m.message}`}}case"drive_organise":{if(!s)return"Authentication context unavailable.";if(!t.folder_name&&!t.new_name)return"Please provide at least a folder_name to move to or a new_name to rename.";try{const{token:m}=await(await Promise.resolve().then(()=>Xe)).getGoogleAuth(n,r,s,a||"",i||""),y=t.url_or_id.trim();let h=y;const v=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const _ of v){const k=y.match(_);if(k){h=k[1];break}}const E=[];if(t.new_name){const _=await fetch(`https://www.googleapis.com/drive/v3/files/${h}`,{method:"PATCH",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({name:t.new_name})});if(!_.ok)throw new Error(`Drive rename error (${_.status})`);E.push(`Renamed to "${t.new_name}"`)}if(t.folder_name){const{folderName:_}=await mn(m,h,t.folder_name);E.push(`Moved to folder "${_}"`)}return E.join(". ")+"."}catch(m){return await H(n,r,"google","drive_organise",m.message),`Drive organise error: ${m.message}`}}case"web_search":try{const m=await en(t.query,{num:t.num_results||5,site:t.site,googleApiKey:o||void 0,googleCseId:l||void 0});return m.error?`Web search failed: ${m.error}. Answer this question directly from your training knowledge and clearly state you are doing so.`:m.results.length===0?`Web search returned no results for "${t.query}". Answer this question directly from your training knowledge and clearly state you are doing so instead of searching.`:m.results.map((y,h)=>`${h+1}. [${y.title}](${y.link})
   ${y.snippet}`).join(`

`)}catch(m){return await H(n,r,"search","web_search",m.message),`Web search error: ${m.message}`}case"read_url":try{const m=t.url;if(!m||!m.startsWith("http://")&&!m.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const y=Math.min(t.max_length||8e3,15e3),{fetchPageContent:h}=await Promise.resolve().then(()=>gi),v=await h(m,y);return v.error?`Failed to read page: ${v.error}`:!v.text||v.text.length<20?`Page at ${m} returned no readable content.`:`Content from ${m} (${v.text.length} chars):

${v.text}`}catch(m){return await H(n,r,"search","read_url",m.message),`Read URL error: ${m.message}`}case"research":{if(!d)return"Research tool requires an LLM provider but none is available.";try{let m;try{const D=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"perplexity_api_key").first();D&&s&&(m=await Z(D.encrypted_value,s))}catch{}const y=t.depth||"quick",h=y==="thorough"?15e4:9e4,v=es(t.query,d,{depth:y,site:t.site,perplexityApiKey:m,googleApiKey:o||void 0,googleCseId:l||void 0}),E=new Promise(D=>setTimeout(()=>D(null),h)),_=await Promise.race([v,E]);if(_===null){const{webSearch:D}=await Promise.resolve().then(()=>li),I=await D(t.query,{num:5,googleApiKey:o||void 0,googleCseId:l||void 0});if(I.error||I.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let B=`Research took too long, but here are the top search results:

`;return B+=I.results.map((N,C)=>`${C+1}. [${N.title}](${N.link})
   ${N.snippet}`).join(`

`),B}if(_.error)return`Research failed: ${_.error}`;let k=_.report;_.sources.length>0&&(k+=`

---
**Sources** (`+_.pagesRead+` pages read):
`,k+=_.sources.map((D,I)=>`[${I+1}] [${D.title}](${D.url})`).join(`
`));try{const D=new te(n),I=_.report.substring(0,600);await D.store(r,"context",`Research: ${t.query.substring(0,80)}`,I,6,"long_term")}catch{}return k}catch(m){return await H(n,r,"research","research",m.message),`Research error: ${m.message}`}}case"browser_task":{if(!s)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"browser_use_api_key").first();if(!m)return"Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key (get one at cloud.browser-use.com).";const y=(await Z(m.encrypted_value,s)).trim();let h,v=t.task,E,_;if(!t.site_name)try{const $=await n.prepare("SELECT name FROM site_credentials WHERE user_id = ?").bind(r).all(),j=v.toLowerCase(),G=($.results||[]).find(J=>j.includes(J.name.toLowerCase()));G&&(t={...t,site_name:G.name},Kn("browser_task auto-vault: inferred site_name from task text",{siteName:G.name,userId:r}))}catch{}if(t.site_name)try{const $=await n.prepare("SELECT id, encrypted_blob FROM site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE").bind(r,t.site_name).first();if($){const j=JSON.parse(await Z($.encrypted_blob,s));h={username:j.username,password:j.password},_=j.sessionId,E=$.id,v=`${v}

When prompted to log in, use username {username} and password {password}.`}}catch{}const k=async $=>{if(E)try{const j=await n.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(E,r).first();if(!j)return;const G=JSON.parse(await Z(j.encrypted_blob,s));G.sessionId=$,await n.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(await Tt(JSON.stringify(G),s),E,r).run()}catch{}},D=async()=>{if(!(!E||!_))try{const $=await n.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(E,r).first();if(!$)return;const j=JSON.parse(await Z($.encrypted_blob,s));delete j.sessionId,await n.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(await Tt(JSON.stringify(j),s),E,r).run()}catch{}},I=/blue[\s-]?dart[\s\S]{0,100}?(\d{10,11})|(\d{10,11})[\s\S]{0,100}?blue[\s-]?dart/i.exec(v);if(I){const $=I[1]||I[2];v=wi($)}const B=void 0;f&&(f.apiKey=y,_&&!f.sessionId?(f.sessionId=_,f.persistSession=!0):!f.sessionId&&E&&(f.sessionId=await yi(y)??void 0)),Kn("browser_task starting",{userId:r,channel:g,timeoutMs:B??3e5,sessionId:f==null?void 0:f.sessionId,vaultSession:!!_});const N=await ss(v,y,{secrets:h,sessionId:f==null?void 0:f.sessionId,timeoutMs:B});if(N.status==="completed"){const $=(f==null?void 0:f.sessionId)??void 0;return E&&$&&(f&&(f.persistSession=!0),await k($)),(ee=N.output)!=null&&ee.includes('"captcha_required": true')?"Captcha detected — manual verification required. The site blocked automated access. Please try completing it manually or try again later.":N.output??"[NO-OUTPUT] Browser task completed but returned no content — do NOT invent or summarise what the site may have contained. Tell the user the browser returned nothing and suggest they try again."}if(N.status==="timeout"){f&&(f.hasActiveTask=!0);try{await new te(n).store(r,"context",`Browser task in progress: ${N.taskId}`,JSON.stringify({task_id:N.taskId,task:t.task}),9,"working")}catch{}try{const $=(t.task||"").substring(0,200);await n.prepare("INSERT INTO pending_browser_tasks (user_id, task_id, task_description, thread_id, channel) VALUES (?, ?, ?, ?, ?)").bind(r,N.taskId,$,(f==null?void 0:f.threadId)??null,g).run()}catch{}return`[BROWSER_TIMEOUT:${N.taskId}] Browser task did not finish within the time limit. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up."`}_&&y&&tn(_,y).catch(()=>{}),f&&(f.persistSession=!1),await D();const C=[N.error,N.output].filter(Boolean).join(" — ");return`Browser task failed (ID: \`${N.taskId}\`): ${C||"No details returned."} | Operator hint: Check Browser Use dashboard — taskId=${N.taskId}`}catch(m){return await H(n,r,"browser","browser_task",m.message),`Browser task error: ${m.message}`}}case"browser_task_status":{if(!s)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"browser_use_api_key").first();if(!m)return"Browser Use API key not configured.";const y=await Z(m.encrypted_value,s),h=await as(t.task_id,y);if(h.done){try{const v=new te(n),E=await v.search(r,`Browser task in progress: ${t.task_id}`);for(const _ of E)await v.remove(_.id,r)}catch{}return h.status==="finished"||h.status==="completed"?h.output?h.output:'[NO-OUTPUT] Browser task finished but returned no content. Do NOT invent or infer what emails or page data might have said. Tell the user: "The browser finished but returned no content — the site may have blocked automation or the login failed. Would you like to try again?"':`Browser task ended with status "${h.status}" and no output. Do NOT retry — report this to the user.`}return`[still-running] Browser task has not finished yet (status: ${h.status}). STOP — do not call browser_task_status again. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up."`}catch(m){return await H(n,r,"browser","browser_task_status",m.message),`Browser status check error: ${m.message}`}}case"vault_lookup":try{const m=(t.site_name||"").trim();if(!m)return"No site name provided.";const h=((await n.prepare("SELECT name FROM site_credentials WHERE user_id = ? AND name LIKE ? COLLATE NOCASE").bind(r,`%${m}%`).all()).results||[]).map(v=>v.name);return h.length===0?`No vault entries found matching "${m}".`:`Vault entries matching "${m}": ${h.join(", ")}. Use site_name="${h[0]}" in browser_task to inject credentials automatically.`}catch{return"vault_lookup: could not query Secret Vault (table may not exist — run migrations)."}case"search_places":{if(!s)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!m)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const y=await Z(m.encrypted_value,s),h=await qr(y,t.query,{type:t.type});return h.error?`Places search failed: ${h.error}`:h.results.length===0?`No places found for "${t.query}".`:h.results.map((v,E)=>{const _=v.rating?` ★${v.rating} (${v.userRatingsTotal||0} reviews)`:"",k=v.openNow!==void 0?v.openNow?" · Open now":" · Closed":"",D=v.googleMapsUri?`
   ${v.googleMapsUri}`:"";return`${E+1}. **${v.name}**${_}${k}
   ${v.address}${D}
   [place_id: ${v.placeId}]`}).join(`

`)}catch(m){return await H(n,r,"google_api","search_places",m.message),`Places search error: ${m.message}`}}case"get_place_details":{if(!s)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!m)return"Google API Key not configured.";const y=await Z(m.encrypted_value,s),h=await Gr(y,t.place_id);if(h.error)return`Details lookup failed: ${h.error}`;if(!h.details)return"No details found.";const v=h.details;let E=`**${v.name}**
📍 ${v.address}`;if(v.phone&&(E+=`
📞 ${v.phone}`),v.website&&(E+=`
🌐 ${v.website}`),v.rating&&(E+=`
★ ${v.rating}`),v.googleMapsUri&&(E+=`
📌 ${v.googleMapsUri}`),v.openingHours&&(E+=`

Opening Hours:
${v.openingHours.join(`
`)}`),v.reviews&&v.reviews.length>0){E+=`

Recent Reviews:`;for(const _ of v.reviews)E+=`
— ${_.author} (★${_.rating}, ${_.time}): "${_.text}"`}return E}catch(m){return await H(n,r,"google_api","place_details",m.message),`Place details error: ${m.message}`}}case"get_directions":{if(!s)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!m)return"Google API Key not configured.";const y=await Z(m.encrypted_value,s),h=await zr(y,t.origin,t.destination,{mode:t.mode||"driving"});if(h.error)return`Directions failed: ${h.error}`;if(!h.route)return"No route found.";const v=h.route;let E=`**${v.startAddress}** → **${v.endAddress}**
`;return E+=`📏 ${v.distance} · ⏱️ ${v.duration}`,v.durationInTraffic&&(E+=` (with traffic: ${v.durationInTraffic})`),E+=`
via ${v.summary}`,E+=`

Steps:`,v.steps.forEach((_,k)=>{E+=`
${k+1}. ${_.instruction} (${_.distance}, ${_.duration})`}),E}catch(m){return await H(n,r,"google_api","directions",m.message),`Directions error: ${m.message}`}}case"get_travel_time":{if(!s)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!m)return"Google API Key not configured.";const y=await Z(m.encrypted_value,s),h=await Zr(y,t.origin,t.destination,t.mode||"driving");if(h.error)return`Travel time lookup failed: ${h.error}`;let v=`${t.origin} → ${t.destination}: ${h.distance}, ${h.duration}`;return h.durationInTraffic&&(v+=` (with traffic: ${h.durationInTraffic})`),v}catch(m){return await H(n,r,"google_api","travel_time",m.message),`Travel time error: ${m.message}`}}case"translate_text":{if(!s)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!m)return"Google API Key not configured.";const y=await Z(m.encrypted_value,s),h=await Kr(y,t.text,t.target_language,t.source_language);return h.error?`Translation failed: ${h.error}`:`[${h.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${h.translatedText}`}catch(m){return await H(n,r,"google_api","translate",m.message),`Translation error: ${m.message}`}}case"search_youtube":{if(!s)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!m)return"Google API Key not configured.";const y=await Z(m.encrypted_value,s),h=await Jr(y,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return h.error?`YouTube search failed: ${h.error}`:h.results.length===0?`No YouTube results for "${t.query}".`:h.results.map((v,E)=>{var _;return`${E+1}. **${v.title}**
   ${v.channelTitle} · ${((_=v.publishedAt)==null?void 0:_.split("T")[0])||""}
   ${v.description}
   ${v.url}`}).join(`

`)}catch(m){return await H(n,r,"google_api","youtube_search",m.message),`YouTube search error: ${m.message}`}}case"geocode_address":{if(!s)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,"google_api_key").first();if(!m)return"Google API Key not configured.";const y=await Z(m.encrypted_value,s),h=await Yr(y,t.address);return h.error?`Geocoding failed: ${h.error}`:h.results.length===0?`Location not found: "${t.address}"`:h.results.map((v,E)=>`${E+1}. ${v.address}
   Coordinates: ${v.lat}, ${v.lng}`).join(`
`)}catch(m){return await H(n,r,"google_api","geocode",m.message),`Geocoding error: ${m.message}`}}case"parse_document":{const m=t.file_id,y=t.extract_focus;if(!m)return"file_id is required to parse a document.";const h=await n.prepare("SELECT file_name, file_type, file_data, file_size, extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(m,r).first();if(!h)return"File not found. The file may have expired or the file_id is incorrect.";if(h.extracted_text)return`Document: ${h.file_name}

${h.extracted_text}`;const{file_name:v,file_type:E}=h;let{file_data:_}=h;if(_==="r2"){if(!u)return`File "${v}" is stored in R2 but no storage bucket is configured.`;const k=await u.get(m);if(!k)return`File "${v}" not found in storage. It may have been deleted.`;const D=await k.arrayBuffer();_=Buffer.from(D).toString("base64")}if(E.startsWith("text/"))try{const k=Buffer.from(_,"base64").toString("utf-8");return`Document: ${v}

${k.substring(0,2e4)}`}catch{return`Could not decode text file: ${v}`}if(E==="application/pdf"||E==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||v.toLowerCase().endsWith(".pdf")||v.toLowerCase().endsWith(".docx")){if(E==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||v.toLowerCase().endsWith(".docx")){try{const I=await is(Buffer.from(_,"base64"));if(I.length>50){try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(I,m,r).run();const B=I.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind(B,I.substring(0,5e4),m,r).run(),p!=null&&p.ai&&(p!=null&&p.vectorize)){const N=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,r).first();if(N){const{indexDocumentChunks:C}=await Promise.resolve().then(()=>qe);C({DB:n,AI:p.ai,VECTORIZE:p.vectorize},r,N.id,I).catch(()=>{})}}}catch{}return`Document: ${v}

${I.substring(0,2e4)}`}}catch{}return`Could not extract text from "${v}". Try uploading to Google Drive and sharing the link — Drive can open and export Word documents directly.`}let k=null,D="claude-haiku-4-5-20251001";for(const I of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const B=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,I).first();if(B&&s){const N=await Z(B.encrypted_value,s),C=JSON.parse(N);if(C.provider==="anthropic"){k=C.apiKey,C.model&&(D=C.model);break}}}catch{}if(k)try{const I=y?`Focus specifically on extracting: ${y}`:"Extract and return all readable text content from this document. Preserve structure where relevant.",B=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":k,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:D,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:_}},{type:"text",text:I}]}]})});if(B.ok){const C=((A=(se=(await B.json()).content)==null?void 0:se[0])==null?void 0:A.text)||"";if(C&&C.length>50)try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(C,m,r).run();const $=C.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind($,C.substring(0,5e4),m,r).run(),p!=null&&p.ai&&(p!=null&&p.vectorize)){const j=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,r).first();if(j){const{indexDocumentChunks:G}=await Promise.resolve().then(()=>qe);G({DB:n,AI:p.ai,VECTORIZE:p.vectorize},r,j.id,C).catch(()=>{})}}}catch{}return`Document: ${v}

${C}`}else{const N=await B.text();return`Could not parse ${v} via Anthropic API: ${N.substring(0,200)}`}}catch(I){return`Document parsing error for ${v}: ${I.message}`}return"To parse PDF documents, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set."}if(E.startsWith("image/")){let k=null,D="claude-haiku-4-5-20251001";for(const B of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const N=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r,B).first();if(N&&s){const C=await Z(N.encrypted_value,s),$=JSON.parse(C);if($.provider==="anthropic"){k=$.apiKey,$.model&&(D=$.model);break}}}catch{}if(!k)return"To extract text from images, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set.";const I=y?`Focus specifically on: ${y}`:"Extract all visible text from this image. Include any text from signs, documents, screenshots, or diagrams. If the image contains charts or tables, describe their structure and data.";try{const B=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":k,"anthropic-version":"2023-06-01","content-type":"application/json"},body:JSON.stringify({model:D,max_tokens:4096,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:E,data:_}},{type:"text",text:I}]}]})});if(B.ok){const C=((X=(K=(await B.json()).content)==null?void 0:K[0])==null?void 0:X.text)||"";if(C&&C.length>50)try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(C,m,r).run();const $=C.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind($,C.substring(0,5e4),m,r).run(),p!=null&&p.ai&&(p!=null&&p.vectorize)){const j=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,r).first();if(j){const{indexDocumentChunks:G}=await Promise.resolve().then(()=>qe);G({DB:n,AI:p.ai,VECTORIZE:p.vectorize},r,j.id,C).catch(()=>{})}}}catch{}return`Document: ${v}

${C}`}else{const N=await B.text();return`Could not parse ${v} via Anthropic API: ${N.substring(0,200)}`}}catch(B){return`Image parsing error for ${v}: ${B.message}`}}try{const k=Buffer.from(_,"base64").toString("utf-8").substring(0,2e3);return`Document: ${v} (${E})

Content preview:
${k}`}catch{return`Cannot read file: ${v} (${E})`}}case"search_library":{const m=t.query,y=Math.min(typeof t.limit=="number"?t.limit:10,20);if(!m)return"query is required for search_library.";if(p!=null&&p.ai&&(p!=null&&p.vectorize))try{const{semanticDocumentSearch:k}=await Promise.resolve().then(()=>qe),D=await k({DB:n,AI:p.ai,VECTORIZE:p.vectorize},r,m,y);if(D.length>0){const I=D.map(B=>`[id:${B.document_id}] "${B.filename}" (relevance: ${(B.relevance_score*100).toFixed(1)}%)
  Snippet: ${B.chunk.substring(0,350)}`).join(`

`);return`Found ${D.length} semantically relevant document(s) for "${m}":

${I}

Use read_library_file with the id to get the full document text.`}}catch{}const h=await n.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, dl.extracted_text as dl_extracted
        FROM document_library dl
        WHERE dl.user_id = ?
          AND (dl.name LIKE ? OR dl.summary LIKE ? OR dl.extracted_text LIKE ?)
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(r,`%${m}%`,`%${m}%`,`%${m}%`,y).all(),v=await n.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, uf.extracted_text as dl_extracted
        FROM document_library dl
        JOIN uploaded_files uf ON dl.file_id = uf.id
        WHERE dl.user_id = ? AND uf.user_id = ?
          AND uf.extracted_text LIKE ?
          AND dl.id NOT IN (SELECT id FROM document_library WHERE user_id = ? AND (name LIKE ? OR summary LIKE ? OR extracted_text LIKE ?))
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(r,r,`%${m}%`,r,`%${m}%`,`%${m}%`,`%${m}%`,y).all(),E=[...h.results||[],...v.results||[]].slice(0,y);if(E.length===0)return`No documents found matching "${m}" in your library.`;const _=E.map(k=>{const D=(k.summary||k.dl_extracted||"").substring(0,200);return`[id:${k.id}] "${k.name}" (source: ${k.source}, status: ${k.status})
  Preview: ${D||"(no preview yet — summarize or ask Karna to read it)"}`}).join(`

`);return`Found ${E.length} document(s) matching "${m}":

${_}

Use read_library_file with the id to get full text.`}case"read_library_file":{const m=String(t.id_or_name||"").trim();if(!m)return"id_or_name is required for read_library_file.";const y=parseInt(m,10);let h=null;if(isNaN(y)||(h=await n.prepare(`SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.id = ? AND dl.user_id = ?`).bind(y,r).first()),h||(h=await n.prepare(`SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.user_id = ? AND dl.name LIKE ? LIMIT 1`).bind(r,`%${m}%`).first()),!h)return`Document "${m}" not found. Use search_library to find available documents.`;let v=h.extracted_text||null;if(!v&&h.file_id){const E=await n.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(h.file_id,r).first();v=(E==null?void 0:E.extracted_text)||null}return v||(v=h.summary||null),v?`Document: ${h.name}

${v.substring(0,2e4)}`:`Document "${h.name}" has no extracted text yet. Ask Karna to parse it with parse_document(file_id="${h.file_id}") to extract the text first.`}case"create_skill":{const m=(q=t.name)==null?void 0:q.trim(),y=(re=t.description)==null?void 0:re.trim(),h=(oe=t.instructions)==null?void 0:oe.trim();if(!m||!y||!h)return"create_skill requires name, description, and instructions.";let v=m.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"");v||(v=`skill_${Date.now()}`);const E=await n.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(r,`${v}%`).all();(W=E.results)!=null&&W.some(I=>I.slug===v)&&(v=`${v}_${(((Q=E.results)==null?void 0:Q.length)||0)+1}`);const _=JSON.stringify(t.parameters||{}),k=JSON.stringify(t.required_tools||[]),D=JSON.stringify(t.examples||[]);return await n.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(r,m,v,y,h,_,k,D).run(),`Skill created: **${m}** (invoke as: "${v}")

You can now ask me to run "${m}" at any time. The skill will appear in Settings → Skills. You can also say "run my ${m} skill" to execute it.`}case"list_skills":{const y=t.include_disabled===!0?"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? ORDER BY created_at DESC":"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC",v=(await n.prepare(y).bind(r).all()).results||[];if(v.length===0)return`You haven't created any custom skills yet. Ask me to create one: "Create a skill that..."`;const E=v.map(_=>`• **${_.name}** (${_.slug}): ${_.description} [used ${_.usage_count} times${_.enabled?"":" — disabled"}]`).join(`
`);return`Your custom skills (${v.length}):

${E}`}default:{const m=e,y=await n.prepare("SELECT id, name, description, instructions, required_tools FROM user_skills WHERE user_id = ? AND slug = ? AND enabled = 1").bind(r,m).first();if(y){await n.prepare("UPDATE user_skills SET usage_count = usage_count + 1, last_used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(y.id).run();const h=(()=>{try{return JSON.parse(y.required_tools).join(", ")}catch{return""}})(),v=Object.keys(t).length>0?`

Inputs provided: ${JSON.stringify(t)}`:"";return`[SKILL: ${y.name}] Follow these instructions exactly:

${y.instructions}${v}

${h?`Tools to use: ${h}`:""}

Execute the steps above using your available tools. When complete, provide a clear summary of what was done and any results.`}return`Unknown tool: ${e}`}}}async function Rs(e,t,n,r,s){if(t.length>0&&t[t.length-1].role==="user"){const a="(Previous request did not complete. Please try again.)";await e.storeMessage(n,r,"assistant",a,"{}",s),t.push({id:-1,user_id:n,channel:r,role:"assistant",content:a,metadata:"{}",token_estimate:a.length,created_at:new Date().toISOString()})}}function Os(e){for(let t=e.length-1;t>=0;t--)if(e[t].role==="assistant"){const n=typeof e[t].content=="string"?e[t].content:"";n.length<300&&/^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(n.trim())&&(e[t]={...e[t],content:"(My previous response was cut off before completing. Starting fresh.)"});break}}async function Vn(e,t,n,r,s,a,i){var re,oe,W,Q,m;const o=new te(t),l=(re=e.metadata)==null?void 0:re.thread_id,c=Date.now(),[d,u,p]=await Promise.all([o.buildContext(r.id),Cn(t,r.id),gs(t,r.id)]),g=await o.getRecentConversations(r.id,30,l);await Rs(o,g,r.id,e.channel,l);const f=Ss(r,d,e.channel,u,p),b=In(g),w=Ts([{role:"system",content:f},...On(g),{role:"user",content:e.text}]);Es(w,b),Os(w);const T=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],S=(d.match(/^- /gm)||[]).length;if(T.some(y=>y.test(e.text))||S<3)try{const y=await o.searchLongTerm(r.id,e.text,5);if(y.length>0){const h=y.map(v=>`- [${v.type}] ${v.title}: ${v.content}`).join(`
`);w.splice(w.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${h}]`})}}catch{}await o.storeMessage(r.id,e.channel,"user",e.text,"{}",l);const O=(i==null?void 0:i.maxTurns)??10,M=(i==null?void 0:i.tools)??await Nn(t,r.id);let L="",U=0;const Y=[];let ee,se=0,A=0;const K={hasActiveTask:!1,persistSession:!1,threadId:l,channel:e.channel};for(let y=0;y<O;y++){se=y+1;try{y>0&&Ds(w);const h=await n.chat(w,{tools:M,toolChoice:y===0&&(i!=null&&i.forceToolUseOnFirstTurn)?"required":void 0});if(h.usage&&(U+=h.usage.promptTokens+h.usage.completionTokens),h.toolCalls&&h.toolCalls.length>0){const v=h.content||"(tools executed)";w.push({role:"assistant",content:v});for(const _ of h.toolCalls)Y.push(_.name);const E=await Promise.all(h.toolCalls.map(async _=>{try{const k=await Ct(_.name,_.arguments,t,r.id,{agentType:"full",providerName:n.name,channel:e.channel},r.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,r.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE},K);ee=_s(_.name,_.arguments,k,ee);const D=["parse_document","drive_read_file","read_library_file"].includes(_.name)?2e4:8e3,I=k.length>D?k.substring(0,D)+`
[...result truncated to prevent token limit — full content was extracted]`:k;return`[Tool Result for ${_.name}]: ${I}`}catch(k){return A++,await H(t,r.id,"tool",_.name,k.message||"Tool execution failed"),`[Tool Error for ${_.name}]: ${k.message||"Execution failed"}`}}));w.push({role:"user",content:E.join(`

`)});continue}L=h.content;break}catch(h){if(s){const v=h.message||"",E=v.includes("401")||v.includes("403")||v.includes("authentication")||v.includes("credit balance"),_=v.includes("429"),k=E?1440:_?10:5;await s.recordError(n.name,v,k)}throw await H(t,r.id,"llm","provider_error",h.message||"Unknown LLM error",{provider:n.name,turn:y}),h}}if(L=(L==null?void 0:L.trim())??"",!L)try{((oe=w[w.length-1])==null?void 0:oe.role)==="user"&&w.push({role:"assistant",content:"[gathering results]"}),w.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),L=(await n.chat(w,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me directly and I will answer from my knowledge."}catch{L="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge."}if(s&&U>0)try{await s.recordUsage(n.name,U)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(r.id,n.name,"full",U,Date.now()-c,1,e.channel).run()}catch{}const X=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your|the)\s+(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc|(saved|stored)\s+(it\s+|the\s+essay\s+|the\s+article\s+)?(to|in|on)\s+(your\s+)?(google\s+)?drive|essay\s+(is\s+)?(saved|stored)\s+(in|on|to)\s+(drive|google\s+docs?))\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created or saved a Google Document but create_doc was never called. You MUST call create_doc NOW with the full content in the content parameter.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const y of X){const h=y.claimPattern.test(L),v=y.requiredTools.some(E=>Y.includes(E));if(h&&!v){try{await H(t,r.id,"llm",y.logType,"LLM claimed action without tool call",{response:L.substring(0,200)}),w.push({role:"assistant",content:L}),w.push({role:"user",content:y.enforcementMsg});const E=await n.chat(w,{tools:M.filter(_=>y.requiredTools.includes(_.name)),temperature:0});if((W=E.toolCalls)!=null&&W.length){for(const k of E.toolCalls){const D=await Ct(k.name,k.arguments,t,r.id,{agentType:"full",providerName:n.name,channel:e.channel},r.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,r.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE});Y.push(k.name),w.push({role:"assistant",content:"",toolCalls:E.toolCalls}),w.push({role:"user",content:D})}const _=await n.chat(w,{tools:[]});_.content&&(L=_.content)}else L="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}let q=L.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim();if(!q&&Y.length>0){const y=[...new Set(Y)].join(", ");try{((Q=w[w.length-1])==null?void 0:Q.role)==="user"&&w.push({role:"assistant",content:"[completed tools]"}),w.push({role:"user",content:"Please summarise what you just did and provide the result to the user."}),q=((m=(await n.chat(w,{tools:[]})).content)==null?void 0:m.trim())||`Done. I used the following tools: ${y}.`}catch{q=`Done. I used the following tools: ${y}.`}}await o.storeMessage(r.id,e.channel,"assistant",Jt(q),ws(Y,ee),l);try{const y=await t.prepare("SELECT COUNT(*) as c FROM conversations WHERE user_id = ? AND role = ?").bind(r.id,"assistant").first();y&&y.c%5===0&&y.c>0&&await Promise.race([zi(t,n,r,o,w),new Promise(h=>setTimeout(h,5e3))])}catch{}return Y.length>=3&&Promise.race([hs(t,n,r,e.text,Y,se,A===0),new Promise(y=>setTimeout(y,6e3))]).catch(()=>{}),K.sessionId&&K.apiKey&&!K.hasActiveTask&&!K.persistSession&&tn(K.sessionId,K.apiKey).catch(()=>{}),q}async function zi(e,t,n,r,s){var d;const a=s.filter(u=>u.role!=="system").slice(-10);if(a.length<4)return;const o=[{role:"system",content:`Review this conversation and extract any information worth remembering long-term.
Only extract genuinely durable information — things that will still be relevant in future conversations.
Good examples: addresses, phone numbers, account IDs, spreadsheet IDs, document links, explicit preferences, recurring needs, key decisions.
Bad examples: temporary topics, one-off requests, information already in the system prompt.

For each item, output a line: TYPE|TITLE|CONTENT|IMPORTANCE
Types: fact, preference, context, decision
Importance: 1-10 (8+ = standing rules, 5-7 = regular facts)
If nothing worth extracting, output: NONE`},...a,{role:"user",content:"Extract durable information from the above conversation."}],c=((d=(await t.chat(o,{tools:[]})).content)==null?void 0:d.trim())||"";if(!(!c||c==="NONE"))for(const u of c.split(`
`)){const p=u.trim().split("|");if(p.length<4)continue;const[g,f,b,w]=p,T=["fact","preference","context","decision","summary","task"].find(R=>R===g.trim().toLowerCase());if(!T||!(f!=null&&f.trim())||!(b!=null&&b.trim()))continue;const S=Math.min(10,Math.max(1,parseInt(w)||5));await r.store(n.id,T,f.trim(),b.trim(),S,"long_term")}}const Zn={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function Ki(e){for(const[t,n]of Object.entries(Zn))if(e.toLowerCase().includes(t.toLowerCase()))return n;return Zn.default}function Yi(e,t,n,r){const s=Ki(r),a=Math.floor(s*.75),i=[];let o=0,l=!1;const c=un(e);i.push({role:"system",content:e}),o+=c;const d=un(n);o+=d;const u=a-o,p=[];let g=0;for(let f=t.length-1;f>=0;f--){const b=t[f],w=un(b.content);if(g+w<=u)p.unshift({role:b.role,content:b.content}),g+=w;else{l=!0;break}}return i.push(...p),i.push({role:"user",content:n}),o+=g,{maxTokens:s,usedTokens:o,messages:i,wasTruncated:l}}async function*Ji(e,t,n,r,s,a){var q,re,oe;const i=new te(t),o=(q=e.metadata)==null?void 0:q.thread_id,l=Date.now();yield{type:"thinking",data:{threadId:o,provider:n.name}};const[c,d,u]=await Promise.all([i.buildContext(r.id),Cn(t,r.id),gs(t,r.id)]),p=await i.getRecentConversations(r.id,30,o);await Rs(i,p,r.id,e.channel,o);const g=Ss(r,c,e.channel,d,u),f=In(p),b=On(p);let w=e.text;f&&(w=`${wn}

${e.text}`);const T=Yi(g,b.map(W=>({role:W.role,content:W.content})),w,n.name);await i.storeMessage(r.id,e.channel,"user",e.text,"{}",o);const S=await Nn(t,r.id),R=10;let O="",M=0;const L=[...T.messages],U=[];let Y,ee=0,se=0;const A={hasActiveTask:!1,persistSession:!1,threadId:o,channel:e.channel};Os(L);const K=()=>ws(U,Y);for(let W=0;W<R;W++){ee=W+1;try{W>0&&(yield{type:"thinking",data:{threadId:o}},Ds(L));const Q=await n.chat(L,{tools:S});if(Q.usage&&(M+=Q.usage.promptTokens+Q.usage.completionTokens),Q.toolCalls&&Q.toolCalls.length>0){const h=((re=Q.content)==null?void 0:re.trim())??"";h&&h.length<=150&&!/^\[calling:/i.test(h)&&(yield{type:"chunk",data:{text:Q.content,threadId:o}});const v=Q.content||"(tools executed)";L.push({role:"assistant",content:v});const E=[];for(const _ of Q.toolCalls){yield{type:"tool_start",data:{tool:_.name,toolArgs:_.arguments,threadId:o}},U.push(_.name);try{const k=(C,$)=>Ct(C,$,t,r.id,{agentType:"full",providerName:n.name,channel:e.channel},r.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,r.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE},A);let D;if(_.name==="browser_task"||_.name==="browser_task_status"){if(_.name==="browser_task"){const J=_.arguments.site_name;yield{type:"browser_ack",data:{message:J?`Starting now — opening ${J} in a browser. I'll notify you when done.`:"Starting now — running browser task. I'll notify you when done.",startedAt:new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:r.timezone||"UTC"}),threadId:o}}}const $=["Still working — browser launched, navigating to site...","Still working — page loaded, scanning for content...","Still working — reading and extracting results...","Still working — almost there, finalising output...","Taking a bit longer — site may require extra steps...","Still running — browser is working through the page...","Continuing — extracting and processing data...","Still going — complex task, nearly there...","Almost done — wrapping up the browser session...","Still running — holding on a little longer...","Browser is still active — this one is taking time...","Patience — still working through the task...","Still running — will have a result for you shortly..."],j=k(_.name,_.arguments);let G=0;e:for(;;){const J=await Promise.race([j.then(z=>({done:!0,r:z})),new Promise(z=>setTimeout(()=>z({done:!1}),15e3))]);if(J.done){D=J.r;break e}_.name==="browser_task"?yield{type:"browser_progress",data:{message:$[Math.min(G,$.length-1)],elapsed_s:(G+1)*15,threadId:o}}:yield{type:"thinking",data:{threadId:o}},G++}if(_.name==="browser_task"){const J=D.match(/^\[BROWSER_TIMEOUT:([^\]]+)\]/);if(J){yield{type:"browser_progress",data:{message:"Task still running — checking final status...",threadId:o}};const z=k("browser_task_status",{task_id:J[1]});e:for(;;){const le=await Promise.race([z.then(de=>({done:!0,r:de})),new Promise(de=>setTimeout(()=>de({done:!1}),15e3))]);if(le.done){D=le.r;break e}yield{type:"thinking",data:{threadId:o}}}if(!D.startsWith("[still-running]")&&!D.startsWith("[NO-OUTPUT]")&&!D.startsWith("Browser"))try{await t.prepare("DELETE FROM pending_browser_tasks WHERE user_id = ? AND task_id = ? AND notified = 0").bind(r.id,J[1]).run()}catch{}}}}else D=await k(_.name,_.arguments);let I=D;(_.name==="browser_task"||_.name==="browser_task_status")&&(/^\[BROWSER_TIMEOUT:/.test(I)?I="Task timed out — still running in background.":/^\[NO-OUTPUT\]/.test(I)?I="Browser task finished but returned no content.":/^\[still-running\]/.test(I)?I="Still running — will notify when done.":I=I.replace(/\s*\|\s*Operator hint:.*$/s,"")),yield{type:"tool_end",data:{tool:_.name,toolResult:I.substring(0,500)+(I.length>500?"...":""),threadId:o}};const B=["parse_document","drive_read_file","read_library_file"].includes(_.name)?2e4:8e3,N=D.length>B?D.substring(0,B)+`
[...result truncated to prevent token limit — full content was extracted]`:D;Y=_s(_.name,_.arguments,D,Y),E.push(`[Tool Result for ${_.name}]: ${N}`)}catch(k){se++,await H(t,r.id,"tool",_.name,k.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:_.name,toolResult:`Error: ${k.message||"Execution failed"}`,threadId:o}},E.push(`[Tool Error for ${_.name}]: ${k.message||"Execution failed"}`)}}L.push({role:"user",content:E.join(`

`)});continue}O=Q.content;const m=Jt(O);await i.storeMessage(r.id,e.channel,"assistant",m,K(),o);const y=50;for(let h=0;h<m.length;h+=y)yield{type:"chunk",data:{text:m.substring(h,h+y),threadId:o}},h+y<m.length&&await new Promise(E=>setTimeout(E,10));break}catch(Q){if(s){const h=Q.message||"",v=h.includes("401")||h.includes("403")||h.includes("authentication")||h.includes("credit balance"),E=h.includes("429"),_=v?1440:E?10:5;await s.recordError(n.name,h,_)}await H(t,r.id,"llm","provider_error",Q.message||"Unknown LLM error",{provider:n.name,turn:W});const m=Q.message||"An error occurred",y=m.includes("429")||m.toLowerCase().includes("rate limit")||m.toLowerCase().includes("too many requests")?"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.":m;try{await i.storeMessage(r.id,e.channel,"assistant",`⚠️ ${y}`,"{}",o)}catch{}yield{type:"error",data:{error:y,threadId:o}};return}}if(O=(O==null?void 0:O.trim())??"",!O)try{L.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),O=(await n.chat(L,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me to answer directly from my knowledge.";const Q=Jt(O);await i.storeMessage(r.id,e.channel,"assistant",Q,K(),o);const m=50;for(let y=0;y<Q.length;y+=m)yield{type:"chunk",data:{text:Q.substring(y,y+m),threadId:o}},y+m<Q.length&&await new Promise(h=>setTimeout(h,10))}catch{O="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.",await i.storeMessage(r.id,e.channel,"assistant",O,K(),o).catch(()=>{}),yield{type:"chunk",data:{text:O,threadId:o}}}if(s&&M>0)try{await s.recordUsage(n.name,M)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(r.id,n.name,"full",M,Date.now()-l,1,e.channel).run()}catch{}const X=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your\s+|the\s+)(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc|(saved|stored)\s+(it\s+|the\s+essay\s+|the\s+article\s+)?(to|in|on)\s+(your\s+)?(google\s+)?drive|essay\s+(is\s+)?(saved|stored)\s+(in|on|to)\s+(drive|google\s+docs?))\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created or saved a Google Document but create_doc was never called. You MUST call create_doc NOW with the full content in the content parameter.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const W of X){const Q=W.claimPattern.test(O),m=W.requiredTools.some(y=>U.includes(y));if(Q&&!m){try{await H(t,r.id,"llm",W.logType,"LLM claimed action without tool call (streaming)",{response:O.substring(0,200)}),L.push({role:"assistant",content:O}),L.push({role:"user",content:W.enforcementMsg});const y=await n.chat(L,{tools:S.filter(h=>W.requiredTools.includes(h.name)),temperature:0});if((oe=y.toolCalls)!=null&&oe.length){for(const v of y.toolCalls){const E=await Ct(v.name,v.arguments,t,r.id,{agentType:"full",providerName:n.name,channel:e.channel},r.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,r.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE});U.push(v.name),L.push({role:"assistant",content:"",toolCalls:y.toolCalls}),L.push({role:"user",content:E})}const h=await n.chat(L,{tools:[]});h.content&&(O=h.content)}else O="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}U.length>=3&&Promise.race([hs(t,n,r,e.text,U,ee,se===0),new Promise(W=>setTimeout(W,6e3))]).catch(()=>{}),A.sessionId&&A.apiKey&&!A.hasActiveTask&&!A.persistSession&&tn(A.sessionId,A.apiKey).catch(()=>{}),yield{type:"done",data:{threadId:o,provider:n.name,tokenCount:M}}}async function Xn(e,t,n,r,s,a,i,o){await a.storeMessage(s.id,t.channel,"user",t.text,"{}",o);const l=await Ct(e.tool,e.args,n,s.id,{agentType:"direct",channel:t.channel},s.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,s.timezone,r,i==null?void 0:i.DOCUMENTS_BUCKET,{ai:i==null?void 0:i.AI,vectorize:i==null?void 0:i.VECTORIZE}),c=`[TOOLS_USED: ${e.tool}] ${l}`.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"");return await a.storeMessage(s.id,t.channel,"assistant",c,"{}",o),l}async function An(e,t,n,r,s,a){var b;const i=new te(t),o=(b=e.metadata)==null?void 0:b.thread_id,l=await i.buildContext(r.id),c=await i.getRecentConversations(r.id,6,o),d=kn(e.text,l,bs(c));if(d.agent==="conversation")return Is(e,t,n,r,l,s,o);const u=ls(e.text);if(u)return Xn(u,e,t,n,r,i,a,o);const p=(await i.getRecentConversations(r.id,10,o)).map(w=>w.content).join(`
`),g=cs(e.text,p);if(g)return Xn(g,e,t,n,r,i,a,o);const f=d.confidence>=.85;if(e.channel==="telegram"){const w=await Nn(t,r.id);return Vn(e,t,n,r,s,a,{maxTurns:10,tools:w,forceToolUseOnFirstTurn:f})}return Vn(e,t,n,r,s,a,{forceToolUseOnFirstTurn:f})}async function Is(e,t,n,r,s,a,i){const o=new te(t),l=Date.now(),c=xs(r.timezone),d=await Cn(t,r.id),u=d?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. Do not store copies in memory or contradict them.
${d}

${s}`:s,p=ds("conversation",r,u,r.timezone,c,e.channel),g=(await o.getRecentConversations(r.id,30,i)).filter(R=>!R.content.startsWith("[Autonomous Scheduled Task]")&&!R.content.startsWith("[Scheduled Reminder]")),f=In(g),b=Ts([{role:"system",content:p},...On(g),{role:"user",content:e.text}]);Es(b,f),await o.storeMessage(r.id,e.channel,"user",e.text,"{}",i);let w=0,T="";try{const R=await n.chat(b,{temperature:.8});R.usage&&(w=R.usage.promptTokens+R.usage.completionTokens),T=R.content}catch(R){if(a){const O=R.message||"",M=O.includes("401")||O.includes("403")||O.includes("authentication")||O.includes("credit balance"),L=O.includes("429"),U=M?1440:L?10:5;await a.recordError(n.name,O,U)}throw await H(t,r.id,"llm","conversation_error",R.message,{provider:n.name}),R}if(a&&w>0)try{await a.recordUsage(n.name,w)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(r.id,n.name,"conversation",w,Date.now()-l,1,e.channel).run()}catch{}const S=Jt(T);return await o.storeMessage(r.id,e.channel,"assistant",S,"{}",i),S}async function*Vi(e,t,n,r,s,a){var u;const i=new te(t),o=(u=e.metadata)==null?void 0:u.thread_id,l=await i.buildContext(r.id),c=await i.getRecentConversations(r.id,6,o),d=kn(e.text,l,bs(c));if(yield{type:"thinking",data:{threadId:o,provider:n.name}},d.agent!=="conversation"){yield*Ji(e,t,n,r,s,a);return}try{const p=await Is(e,t,n,r,l,s,o),g=50;for(let f=0;f<p.length;f+=g)yield{type:"chunk",data:{text:p.substring(f,f+g),threadId:o}},f+g<p.length&&await new Promise(b=>setTimeout(b,10))}catch(p){yield{type:"error",data:{error:p.message||"An error occurred",threadId:o}};return}yield{type:"done",data:{threadId:o,provider:n.name,tokenCount:0}}}const ce=new be;async function Zi(e,t){var s;const n=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",n),await t()}ce.use("/*",Zi);ce.get("/threads",async e=>{const t=e.get("user"),n=e.req.query("archived")==="1",r=parseInt(e.req.query("limit")||"30"),s=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(t.id,n?1:0,r).all();return e.json({threads:s.results||[]})});ce.post("/threads",async e=>{const t=e.get("user"),{title:n}=await e.req.json(),r=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n||"New conversation").first();return e.json({thread:r})});ce.put("/threads/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),r=await e.req.json(),s=[],a=[];return r.title!==void 0&&(s.push("title = ?"),a.push(r.title)),r.is_archived!==void 0&&(s.push("is_archived = ?"),a.push(r.is_archived?1:0)),s.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),s.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${s.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});ce.delete("/threads/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ce.post("/upload",async e=>{const t=e.get("user"),n=!!e.env.DOCUMENTS_BUCKET,r=n?100*1024*1024:700*1024;let s,a,i,o=null,l=null;try{if((e.req.header("Content-Type")||"").includes("multipart/form-data")){const w=(await e.req.formData()).get("file");if(!w)return e.json({error:"No file provided."},400);if(s=w.name,a=w.type||"application/octet-stream",i=w.size,i>r)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);o=await w.arrayBuffer()}else{const b=await e.req.json();if(!b.file_name||!b.file_data)return e.json({error:"file_name and file_data are required."},400);if(s=b.file_name,a=b.file_type||"application/octet-stream",l=b.file_data,i=b.file_size||Math.round(l.length*.75),i>r)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);if(n){const w=atob(l);o=new ArrayBuffer(w.length);const T=new Uint8Array(o);for(let S=0;S<w.length;S++)T[S]=w.charCodeAt(S)}}const d=crypto.randomUUID();let u;n&&o?(await e.env.DOCUMENTS_BUCKET.put(d,o,{httpMetadata:{contentType:a},customMetadata:{fileName:s,userId:String(t.id)}}),u="r2"):u=l||(o?Buffer.from(o).toString("base64"):""),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(d,t.id,s,a,u,i).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,d,"upload",s,a,i,"uploaded").run();const p=a==="application/pdf"||s.toLowerCase().endsWith(".pdf"),g=a==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||s.toLowerCase().endsWith(".docx");if(g)try{const{extractDocxTextFromBuffer:b}=await Promise.resolve().then(()=>os),w=l?Buffer.from(l,"base64"):o?Buffer.from(o):null;if(w){const T=await b(w);if(T.length>50){await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(T,d).run();const S=T.substring(0,600);await e.env.DB.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(S,T.substring(0,5e4),d,t.id).run()}}}catch{}if(p&&t.pin_hash){const b=l||(o?Buffer.from(o).toString("base64"):null),w=t.pin_hash,T=t.id,S=e.env.DB,R=e.env.DOCUMENTS_BUCKET,O=(async()=>{var M,L;try{let U=null,Y="claude-haiku-4-5-20251001";const{decrypt:ee}=await Promise.resolve().then(()=>Qt);for(const q of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const re=await S.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(T,q).first();if(re){const oe=await ee(re.encrypted_value,w),W=JSON.parse(oe);if(W.provider==="anthropic"){U=W.apiKey,W.model&&(Y=W.model);break}}}catch{}if(!U)return;let se;if(u==="r2"&&R){const q=await R.get(d);if(!q)return;se=Buffer.from(await q.arrayBuffer()).toString("base64")}else if(b)se=b;else return;const A=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":U,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:Y,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:se}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!A.ok)return;const X=((L=(M=(await A.json()).content)==null?void 0:M[0])==null?void 0:L.text)||"";if(X){await S.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(X,d).run();const q=X.substring(0,600);await S.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(q,X.substring(0,5e4),d,T).run()}}catch{}})();try{e.executionCtx.waitUntil(O)}catch{}}let f="";if(a.startsWith("text/"))try{const b=l||(o?Buffer.from(o).toString("base64"):"");f=Buffer.from(b,"base64").toString("utf-8").substring(0,500)}catch{}return e.json({file_id:d,name:s,type:a,size:i,text_preview:f,storage:n?"r2":"d1",extracting:p&&!g})}catch(c){console.error("File upload error:",c);try{const{logError:d}=await Promise.resolve().then(()=>gt);await d(e.env.DB,t.id,"upload","upload_error",c.message||"Unknown upload error")}catch{}return e.json({error:`Upload failed: ${c.message||"Unknown error"}`},500)}});ce.post("/send",async e=>{const t=e.get("user"),{message:n,channel:r="web",thread_id:s,files:a}=await e.req.json();if(!n||typeof n!="string"||n.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(a&&Array.isArray(a)&&a.length>0){i=`

[Attached files:
`;for(const c of a)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=s;if(!o){const c=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n.trim().substring(0,60)+(n.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:t.id,username:t.username,channel:r,text:n.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await Ke(e.env.DB,t.id,t.pin_hash),u=await An(l,e.env.DB,c,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});return!s&&o?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run():o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),e.json({response:u,timestamp:new Date().toISOString(),channel:l.channel,provider:c.name,thread_id:o})}catch(c){console.error("Chat error:",c);const d=c.message||"";if(d.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400);if(d.includes("All LLM providers failed"))return e.json({error:d,type:"no_provider",thread_id:o},400);if(d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests"))return e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429);const u=d.includes("401")||d.includes("403")||d.includes("authentication")||d.includes("credit balance")||d.includes("invalid")&&d.includes("key");try{const{logError:p}=await Promise.resolve().then(()=>gt);await p(e.env.DB,t.id,"llm","chat_error",d)}catch{}return e.json({error:u?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:d,type:u?"no_provider":void 0,thread_id:o},u?400:500)}});function Qn(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}ce.post("/stream",async e=>{const t=e.get("user"),{message:n,channel:r="web",thread_id:s,files:a}=await e.req.json();if(!n||typeof n!="string"||n.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(a&&Array.isArray(a)&&a.length>0){i=`

[Attached files:
`;for(const c of a)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=s;if(!o){const c=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n.trim().substring(0,60)+(n.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:t.id,username:t.username,channel:r,text:n.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await Ke(e.env.DB,t.id,t.pin_hash),u=new ReadableStream({async start(p){const g=new TextEncoder;try{const f=Vi(l,e.env.DB,c,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});for await(const b of f)b.data.threadId||(b.data.threadId=o),p.enqueue(g.encode(Qn(b)));o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),p.close()}catch(f){const b={type:"error",data:{error:f.message||"An error occurred",threadId:o}};p.enqueue(g.encode(Qn(b))),p.close()}}});return new Response(u,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(o||"")}})}catch(c){console.error("Stream setup error:",c);const d=c.message||"";return d.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400):d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests")?e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429):e.json({error:"Something went wrong setting up the stream.",details:d,thread_id:o},500)}});ce.get("/threads/:id/messages",async e=>{var a;const t=e.get("user"),n=parseInt(e.req.param("id")),r=parseInt(e.req.query("limit")||"50"),s=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,n,r).all();return e.json({messages:(s.results||[]).reverse(),total:((a=s.results)==null?void 0:a.length)||0})});ce.get("/history",async e=>{var l;const t=e.get("user"),n=parseInt(e.req.query("limit")||"50"),r=parseInt(e.req.query("offset")||"0"),s=e.req.query("thread_id");let a,i;s?(a=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,parseInt(s),n,r]):(a=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,n,r]);const o=await e.env.DB.prepare(a).bind(...i).all();return e.json({messages:(o.results||[]).reverse(),total:((l=o.results)==null?void 0:l.length)||0})});ce.delete("/history",async e=>{const t=e.get("user"),n=e.req.query("thread_id");return n?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(n)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});ce.get("/dashboard",async e=>{const t=e.get("user"),[n,r,s,a,i,o,l,c,d,u,p,g,f,b,w]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM user_skills WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM preferences WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval')").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND type='browser_task' AND status='running'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status='failed'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory_suggestions WHERE user_id = ? AND status='pending'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM document_library WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT id, name, mime_type, size, status, source, created_at FROM document_library WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT id, name, description, next_run FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND next_run BETWEEN datetime('now', 'start of day') AND datetime('now', '+1 day', 'start of day') LIMIT 5").bind(t.id).all().catch(()=>({results:[]}))]);return e.json({threads:(n==null?void 0:n.cnt)||0,active_schedules:(r==null?void 0:r.cnt)||0,memories:(s==null?void 0:s.cnt)||0,recent_threads:a.results||[],provider_usage:[],unread_notifications:(i==null?void 0:i.cnt)||0,errors:(o==null?void 0:o.cnt)||0,skills_count:(l==null?void 0:l.cnt)||0,preferences_count:(c==null?void 0:c.cnt)||0,pending_actions:(d==null?void 0:d.cnt)||0,running_browser_tasks:(u==null?void 0:u.cnt)||0,failed_actions:(p==null?void 0:p.cnt)||0,memory_suggestions:(g==null?void 0:g.cnt)||0,documents_count:(f==null?void 0:f.cnt)||0,recent_documents:b.results||[],todays_reminders:w.results||[]})});ce.get("/gmail/unread",async e=>{const t=e.get("user");try{const n=e.env.GOOGLE_CLIENT_ID,r=e.env.GOOGLE_CLIENT_SECRET;if(!n||!r)return e.json({count:null,reason:"google_not_configured"});const a=await new xe(e.env.DB,t.id,t.pin_hash,n,r).getUnreadCount();return e.json({count:a})}catch(n){return e.json({count:null,reason:n.message})}});ce.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));ce.get("/notifications/count",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(n==null?void 0:n.cnt)||0})});ce.get("/notifications",async e=>{const t=e.get("user"),n=parseInt(e.req.query("limit")||"20"),r=await e.env.DB.prepare(`SELECT n.id, n.type, n.title, n.body, n.is_read, n.source, n.action_url, n.created_at,
            j.schedule_type, j.schedule_value, j.enabled as cron_enabled
     FROM notifications n
     LEFT JOIN cron_jobs j
       ON n.user_id = j.user_id
       AND n.source LIKE 'cron:%'
       AND CAST(SUBSTR(n.source, 6) AS INTEGER) = j.id
     WHERE n.user_id = ? ORDER BY n.created_at DESC LIMIT ?`).bind(t.id,n).all();return e.json({notifications:r.results||[]})});ce.put("/notifications/:id/read",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ce.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});ce.delete("/notifications/all",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});ce.delete("/notifications/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ce.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const ie=new be;async function Xi(e,t){var s;const n=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),await t()}ie.use("/*",Xi);ie.get("/profile",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(n==null?void 0:n.name)||t.name,role:(n==null?void 0:n.role)||t.role,personality_prompt:(n==null?void 0:n.personality_prompt)||t.personality_prompt,telegram_chat_id:(n==null?void 0:n.telegram_chat_id)||t.telegram_chat_id,timezone:(n==null?void 0:n.timezone)||t.timezone,assistant_name:(n==null?void 0:n.assistant_name)||"Karna"})});ie.put("/profile",async e=>{const t=e.get("user"),n=await e.req.json(),r=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],s=[],a=[];for(const i of r)n[i]!==void 0&&(s.push(`${i} = ?`),a.push(n[i]));return s.length===0?e.json({error:"No valid fields to update"},400):(s.push("updated_at = CURRENT_TIMESTAMP"),a.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${s.join(", ")} WHERE id = ?`).bind(...a).run(),e.json({success:!0}))});const bn=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","perplexity_api_key","browser_use_api_key"];ie.get("/credentials",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT id, service, label, encrypted_value, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all(),r=["llm_slot_1","llm_slot_2","llm_slot_3"],s=await Promise.all((n.results||[]).map(async a=>{let i;if(r.includes(a.service))try{const o=await Z(a.encrypted_value,t.pin_hash);i=JSON.parse(o).provider}catch{}return{id:a.id,service:a.service,label:a.label,created_at:a.created_at,updated_at:a.updated_at,configured:!0,...i?{provider_id:i}:{}}}));return e.json({credentials:s,available_services:bn,llm_providers:It})});ie.put("/credentials",async e=>{const t=e.get("user"),{service:n,value:r,label:s}=await e.req.json();if(!n||!r)return e.json({error:"Service name and value are required"},400);if(!bn.includes(n))return e.json({error:`Invalid service. Must be one of: ${bn.join(", ")}`},400);const a=await Tt(r,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,n,s||n,a).run(),e.json({success:!0,service:n})});ie.delete("/credentials/:service",async e=>{const t=e.get("user"),n=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,n).run(),e.json({success:!0})});ie.get("/memory",async e=>{const t=e.get("user"),n=e.req.query("type"),s=await new te(e.env.DB).getAll(t.id,n||void 0,100);return e.json({memories:s})});ie.post("/memory",async e=>{const t=e.get("user"),{type:n,title:r,content:s,importance:a}=await e.req.json();return!n||!r||!s?e.json({error:"Type, title, and content are required"},400):(await new te(e.env.DB).store(t.id,n,r,s,a||5),e.json({success:!0}))});ie.delete("/memory/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new te(e.env.DB).remove(n,t.id),e.json({success:!0})});ie.get("/preferences",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT id, content, created_at FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t.id).all();return e.json({preferences:n.results||[]})});ie.post("/preferences",async e=>{const t=e.get("user"),{content:n}=await e.req.json();return n!=null&&n.trim()?(await e.env.DB.prepare("INSERT INTO preferences (user_id, content) VALUES (?, ?)").bind(t.id,n.trim()).run(),e.json({success:!0})):e.json({error:"Content required"},400)});ie.put("/preferences/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{content:r}=await e.req.json();return r!=null&&r.trim()?(await e.env.DB.prepare("UPDATE preferences SET content = ? WHERE id = ? AND user_id = ?").bind(r.trim(),n,t.id).run(),e.json({success:!0})):e.json({error:"Content required"},400)});ie.delete("/preferences/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM preferences WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ie.get("/schedules",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:n.results||[]})});ie.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{enabled:r}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r?1:0,n,t.id).run(),e.json({success:!0})});ie.delete("/schedules/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ie.get("/errors",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:n.results||[]})});ie.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});ie.post("/credentials/validate",async e=>{const t=e.get("user"),{service:n,value:r}=await e.req.json();if(!n)return e.json({error:"Service required"},400);let s=r;if(!s){const a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,n).first();if(!a)return e.json({valid:!1,message:"No credential saved for this slot."});try{s=await Z(a.encrypted_value,t.pin_hash)}catch{return e.json({valid:!1,message:"Failed to decrypt stored credential."})}}switch(n){case"anthropic":try{const a=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":s,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return a.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"openai":try{const a=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${s}`}});return a.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const a=JSON.parse(s);if(!a.provider||!a.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const i=It[a.provider];if(!i)return e.json({valid:!1,message:`Unknown provider: ${a.provider}`});if(i.apiFormat==="anthropic"){const o=await fetch(i.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return o.ok?e.json({valid:!0,message:`${i.label} API key is valid.`}):o.status===401?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${o.status}.`})}else{const o=i.apiBase+(i.validatePath||"/v1/models"),l=await fetch(o,{headers:{Authorization:`Bearer ${a.apiKey}`}});if(l.ok)return e.json({valid:!0,message:`${i.label} API key is valid.`});if(l.status===401||l.status===403)return e.json({valid:!1,message:`Invalid ${i.label} API key.`});if(l.status===404)try{const c=await fetch(i.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.apiKey}`},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return c.ok||c.status===200?e.json({valid:!0,message:`${i.label} API key is valid.`}):c.status===401||c.status===403?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${c.status}.`})}catch(c){return e.json({valid:!1,message:`${i.label} chat test failed: ${c.message}`})}return e.json({valid:!1,message:`${i.label} responded with status ${l.status}.`})}}catch(a){return a instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});case"perplexity_api_key":try{const a=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar",messages:[{role:"user",content:"test"}],max_tokens:1})});return a.ok||a.status===400?e.json({valid:!0,message:"Perplexity API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid Perplexity API key."}):e.json({valid:!1,message:`Perplexity responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});ie.get("/google/status",async e=>{const t=e.get("user");try{const n=await Tn(e.env.DB,t.id,t.pin_hash),r=jr(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...n,oauth_client_configured:r})}catch(n){return e.json({connected:!1,error:n.message})}});ie.get("/google/auth-url",async e=>{var t;e.get("user");try{const n=e.env.GOOGLE_CLIENT_ID,r=e.env.GOOGLE_CLIENT_SECRET;if(!n||!r)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const s=new URL(e.req.url);let a=`${s.protocol}//${s.host}`;const i=e.req.query("origin");if(i)try{const d=new URL(i);(d.protocol==="https:"||d.hostname==="localhost"||d.hostname==="127.0.0.1")&&(a=d.origin)}catch{}const o=`${a}/auth/google/callback`,l=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),c=$r(n,o,l);return e.json({auth_url:c,redirect_uri:o})}catch(n){return e.json({error:`Failed to generate auth URL: ${n.message}`},500)}});ie.post("/google/disconnect",async e=>{const t=e.get("user");try{return await Hr(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(n){return e.json({error:n.message},500)}});ie.post("/google/test",async e=>{const t=e.get("user");try{const{token:n,email:r}=await St(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),s=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${n}`}}),a=!0,i=s.ok;return e.json({success:!0,email:r,scopes:{sheets:a,calendar:i,docs:a,drive:a},message:i?`Connected as ${r} — all services working.`:`Connected as ${r} — calendar access issue (${s.status}).`})}catch(n){return e.json({success:!1,error:n.message})}});ie.get("/site-vault",async e=>{const t=e.get("user");try{const n=await e.env.DB.prepare("SELECT id, name, created_at, updated_at FROM site_credentials WHERE user_id = ? ORDER BY name ASC").bind(t.id).all();return e.json({entries:n.results||[]})}catch{return e.json({entries:[]})}});ie.put("/site-vault",async e=>{const t=e.get("user");try{const{name:n,username:r,password:s,notes:a}=await e.req.json();if(!(n!=null&&n.trim())||!(r!=null&&r.trim())||!(s!=null&&s.trim()))return e.json({error:"name, username, and password are required"},400);const i=JSON.stringify({username:r.trim(),password:s,...a?{notes:a}:{}}),o=await Tt(i,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO site_credentials (user_id, name, encrypted_blob)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, name) DO UPDATE SET
         encrypted_blob = excluded.encrypted_blob,
         updated_at = CURRENT_TIMESTAMP`).bind(t.id,n.trim(),o).run(),e.json({success:!0,name:n.trim()})}catch(n){return e.json({error:(n==null?void 0:n.message)||"Failed to save credential"},500)}});ie.delete("/site-vault/:id",async e=>{const t=e.get("user");try{const n=Number(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM site_credentials WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})}catch(n){return e.json({error:(n==null?void 0:n.message)||"Failed to delete credential"},500)}});const De=new be;De.get("/debug/time",e=>{const t=new Date,n=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return e.json({utc_iso:t.toISOString(),utc_ms:t.getTime(),formatted_ist:n.format(t),toLocaleString_ist:t.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});De.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const n=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:n,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});De.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const n=Date.now()-t;return e.json({status:"ok",latency_ms:n})}catch(t){return e.json({status:"error",error:t.message},500)}});De.get("/status",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const r=n.user_id,[s,a,i,o]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(r).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(r).first()]);return e.json({active_schedules:(s==null?void 0:s.cnt)||0,memory_entries:(a==null?void 0:a.cnt)||0,total_messages:(i==null?void 0:i.cnt)||0,unread_errors:(o==null?void 0:o.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});async function Ns(e,t,n,r,s){const a=(i,o,l=1e4)=>{const c=new AbortController,d=setTimeout(()=>c.abort(),l);return fetch(i,{...o,signal:c.signal}).finally(()=>clearTimeout(d))};try{const i=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
       JOIN users u ON c.user_id = u.id
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t).first();if(!i)return;const o=await Z(i.encrypted_value,i.pin_hash);if(!(o!=null&&o.trim())){console.warn("[sendCronTelegram] empty token for user",t);return}const l=4e3,c=r.length>l?r.substring(0,l-3)+"...":r,d=s?{inline_keyboard:[[{text:"✅ Seen",callback_data:`notif_seen:${s}`},{text:"⏰ Snooze",callback_data:`notif_snooze_menu:${s}`},{text:"✓ Done",callback_data:`notif_done:${s}`}]]}:void 0,u={chat_id:n,text:c,parse_mode:"Markdown"};if(d&&(u.reply_markup=d),!(await a(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)})).ok){const g={chat_id:n,text:c};d&&(g.reply_markup=d);const f=await a(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(g)});f.ok||console.error("[sendCronTelegram] failed for user",t,"status:",f.status)}}catch(i){console.error("[sendCronTelegram] error for user",t,":",i.message)}}function er(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}De.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const r=new Date,s=r.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:s})).run()}catch{}const a=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(s).all(),i=[];for(const o of a.results||[])try{await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(s,o.id).run();const l=o.user_timezone||"UTC";let c,d=!1,u=o.state||"active";if(o.schedule_type==="interval"){const f=parseInt(o.schedule_value,10);c=new Date(r.getTime()+f*60*1e3)}else if(o.schedule_type==="daily"){const[f,b]=o.schedule_value.split(":").map(Number),w=er(l),T=new Date(w);T.setHours(f,b,0,0),T<=w&&T.setDate(T.getDate()+1);const S=new Date(T.toLocaleString("en-US",{timeZone:"UTC"})),R=new Date(T.toLocaleString("en-US",{timeZone:l})),O=S.getTime()-R.getTime();c=new Date(T.getTime()+O)}else if(o.schedule_type==="weekly"){const[f,b]=o.schedule_value.split(" "),[w,T]=(b||"00:00").split(":").map(Number),R=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(se=>se.toLowerCase()===f.toLowerCase()),O=er(l),M=new Date(O);M.setHours(w,T,0,0);let L=(R-M.getDay()+7)%7;L===0&&M<=O&&(L=7),M.setDate(M.getDate()+L);const U=new Date(M.toLocaleString("en-US",{timeZone:"UTC"})),Y=new Date(M.toLocaleString("en-US",{timeZone:l})),ee=U.getTime()-Y.getTime();c=new Date(M.getTime()+ee)}else o.schedule_type==="once"?(d=!0,u="completed",c=new Date(r.getTime()+365*24*60*60*1e3)):c=new Date(r.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,c.toISOString(),d?0:o.enabled,u,o.id).run();const g=(JSON.parse(o.action_config||"{}").description||o.description)&&(o.action_type==="check_mail"||o.action_type==="check_calendar"||o.action_type==="check_sheet"||o.action_type==="custom");i.push({job_id:o.id,name:o.name,status:"dispatched",needs_agent:g,next_run:c.toISOString()})}catch(l){i.push({job_id:o.id,name:o.name,status:"error",error:l.message})}try{const{MemoryService:o}=await Promise.resolve().then(()=>Xa),l=await e.env.DB.prepare("SELECT id FROM users").all();for(const c of l.results||[])await new o(e.env.DB).cleanupDoneTasks(c.id)}catch{}return e.json({executed:i.length,results:i,timestamp:s})});De.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const r=parseInt(e.req.param("jobId"),10);if(!r)return e.json({error:"Invalid job ID"},400);const s=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(r).first();if(!s)return e.json({error:"Job not found"},404);const i=JSON.parse(s.action_config||"{}").description||s.description||"",o="⏰ "+(s.name||"Scheduled Task"),l=new Date().toISOString();let c="";const d=s.action_type==="reminder",u=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!d&&s.action_type==="custom"&&u.test(i),d)c=i||s.name||"Time for your scheduled task.";else try{const T={id:s.user_id,username:s.username||"user",name:s.user_name||"User",pin_hash:s.pin_hash||"",role:s.user_role||"",personality_prompt:s.personality_prompt||"",telegram_chat_id:s.telegram_chat_id||"",timezone:s.user_timezone||"UTC",assistant_name:s.assistant_name||"Karna",created_at:"",updated_at:""},S={userId:s.user_id,username:T.username,channel:"cron",text:Qi(s.name,i,s.action_type,s.schedule_type),sessionId:"cron-"+s.id,timestamp:l},{provider:R,rotation:O}=await Ke(e.env.DB,s.user_id,s.pin_hash);c=await An(S,e.env.DB,R,T,O,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(T){const S=T.message||"unknown error",R=S.includes("rate_limit")||S.includes("429")||S.includes("quota"),O=S.includes("timeout")||S.includes("Timeout");R?c="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":O?c="Task timed out. Will retry at next scheduled time.":c="Task encountered an error. Will retry at next scheduled time.",await H(e.env.DB,s.user_id,"cron_agent","execution_error",S,{job_id:s.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(s.action_type))try{const T=await e.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(s.user_id).first();(!T||T.cnt===0)&&await H(e.env.DB,s.user_id,"cron_verification","no_tools_called",`Cron job "${s.name}" (${s.action_type}) completed without any tool calls`,{job_id:s.id,action_type:s.action_type,response_preview:c.substring(0,200)})}catch{}let g=c||i||"Time for your scheduled task.";g=g.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const f=o+`
`+g,b=await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0) RETURNING id").bind(s.user_id,"reminder",o,g,"cron:"+s.id).first(),w=b==null?void 0:b.id;return d&&await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(s.user_id,"system","assistant",f,JSON.stringify({type:"cron",job_id:s.id})).run(),s.telegram_chat_id&&await Ns(e.env.DB,s.user_id,s.telegram_chat_id,f,w),e.json({job_id:r,status:"completed",response_length:c.length})});async function Cs(e){var r;const t=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!t)return null;const n=await e.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(t).first();return(n==null?void 0:n.user_id)||null}De.get("/health/tools",async e=>{var n;const t=await Cs(e);if(!t)return e.json({error:"Not authenticated"},401);try{const r=await e.env.DB.prepare(`SELECT tool_name,
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
       ORDER BY calls DESC`).bind(t).all();return e.json({period:"last_24h",tool_stats:r.results,enforcement:{triggers:s.results,retry_results:((n=a.results)==null?void 0:n[0])||{total_retries:0,successful_retries:0}},cron:{executions:i.results,warnings:o.results},providers:l.results})}catch(r){return e.json({error:r.message||"Failed to fetch metrics"},500)}});De.get("/health/tools/recent",async e=>{const t=await Cs(e);if(!t)return e.json({error:"Not authenticated"},401);try{const n=await e.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
              success, error_message, latency_ms, was_enforcement_retry, channel, created_at
       FROM tool_execution_log
       WHERE user_id = ?
       ORDER BY id DESC LIMIT 50`).bind(t).all();return e.json({logs:n.results})}catch(n){return e.json({error:n.message},500)}});const Dt=`

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
- Example: "Couldn't retrieve Amazon order status — requires login."`;function Qi(e,t,n,r){return n==="reminder"?`[Scheduled Reminder] "${e}": ${t||"Time for your reminder."}`:n==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check Gmail for new/important emails."}
You MUST call gmail_list or gmail_search immediately.${Dt}`:n==="check_calendar"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check calendar for upcoming events."}
You MUST call list_calendar_events immediately.${Dt}`:n==="check_sheet"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
You MUST call read_sheet immediately with the relevant spreadsheet.${Dt}`:n==="custom"&&t?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${r==="interval"||r==="daily"||r==="weekly"?`
CRITICAL SAFETY RULE: This is a RECURRING scheduled task. You MUST NOT call gmail_send or gmail_draft — sending emails on every cron tick spams recipients. Report findings as text only.`:""}${Dt}`:`[Scheduled task "${e}"]: ${t||"Execute this scheduled task."}${Dt}`}De.post("/cron/check-browser-tasks",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);let r=0,s=0;try{const a=await e.env.DB.prepare(`SELECT pbt.id, pbt.user_id, pbt.task_id, pbt.task_description,
              pbt.thread_id, pbt.channel,
              u.telegram_chat_id, u.pin_hash
       FROM pending_browser_tasks pbt
       JOIN users u ON pbt.user_id = u.id
       WHERE pbt.notified = 0
       ORDER BY pbt.created_at ASC
       LIMIT 10`).all();for(const i of a.results||[]){r++;try{const o=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'browser_use_api_key'").bind(i.user_id).first();if(!o)continue;const l=(await Z(o.encrypted_value,i.pin_hash)).trim(),c=await as(i.task_id,l,{waitMs:8e3});if(!c.done)continue;const d=i.task_description?`"${i.task_description.substring(0,80)}${i.task_description.length>80?"...":""}"`:"Your browser task";let u,p;if(c.status==="finished"&&c.output?(u="Browser task completed",p=`${d} finished.

${c.output.substring(0,500)}${c.output.length>500?"...":""}`):c.status==="finished"?(u="Browser task completed (no output)",p=`${d} finished, but the browser returned no readable content. You may want to retry.`):(u="Browser task ended",p=`${d} ended with status "${c.status}". Check the browser dashboard for details.`),i.thread_id){const g=c.status==="finished"&&c.output?c.output.substring(0,8e3):p,f=Math.ceil(g.length/4);try{await e.env.DB.prepare(`INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id)
               VALUES (?, ?, 'assistant', ?, '{}', ?, ?)`).bind(i.user_id,i.channel||"web",g,f,i.thread_id).run()}catch{}}try{await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, 'info', ?, ?, ?, 0)").bind(i.user_id,u,p,`browser_task:${i.task_id}`).run()}catch{}i.telegram_chat_id&&await Ns(e.env.DB,i.user_id,i.telegram_chat_id,`*${u}*

${p}`),await e.env.DB.prepare("UPDATE pending_browser_tasks SET notified = 1 WHERE id = ?").bind(i.id).run(),s++,await new Promise(g=>setTimeout(g,200))}catch{}}}catch{}return e.json({checked:r,notified:s})});De.get("/scorecard/weekly",async e=>{var u;const t=(u=e.req.header("Authorization"))==null?void 0:u.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const r=n.user_id,s=new Date(Date.now()-10080*60*1e3).toISOString(),[a,i,o]=await Promise.all([e.env.DB.prepare(`SELECT COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as success_count,
              AVG(latency_ms) as avg_latency,
              MAX(latency_ms) as p95_latency_hint
       FROM tool_execution_log
       WHERE user_id = ? AND created_at >= ?`).bind(r,s).first(),e.env.DB.prepare(`SELECT COUNT(*) as retry_count
       FROM tool_execution_log
       WHERE user_id = ? AND was_enforcement_retry = 1 AND created_at >= ?`).bind(r,s).first(),e.env.DB.prepare(`SELECT COUNT(*) as cited_responses
       FROM conversations
       WHERE user_id = ? AND role = 'assistant' AND created_at >= ? AND (content LIKE '%[S1]%' OR content LIKE '%source%')`).bind(r,s).first()]),l=Number((a==null?void 0:a.total)||0),c=Number((a==null?void 0:a.success_count)||0),d=l?c/l:0;return e.json({window:"7d",task_success_rate:Number(d.toFixed(3)),groundedness_rate_hint:Number((Number((o==null?void 0:o.cited_responses)||0)/Math.max(1,l)).toFixed(3)),avg_latency_ms:Math.round(Number((a==null?void 0:a.avg_latency)||0)),p95_latency_hint_ms:Math.round(Number((a==null?void 0:a.p95_latency_hint)||0)),fallback_frequency_hint:Number((Number((i==null?void 0:i.retry_count)||0)/Math.max(1,l)).toFixed(3)),totals:{total_tool_calls:l,successful_tool_calls:c}})});function eo(e,t,n,r){return{userId:e,username:t,channel:"telegram",text:n,sessionId:`telegram-${r}`,timestamp:new Date().toISOString()}}function to(e,t){return e.replace(/\*\*(.*?)\*\*/gs,"*$1*").replace(/^#{1,3}\s+(.+)$/gm,"*$1*").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const no=["llm_slot_1","llm_slot_2","llm_slot_3"],ro=["openai","groq"];function tr(e,t){const n=t==null?void 0:t.trim();if(!n)return null;const r=e.trim().toLowerCase();return r==="openai"?{url:"https://api.openai.com/v1/audio/transcriptions",apiKey:n,model:"whisper-1"}:r==="groq"?{url:"https://api.groq.com/openai/v1/audio/transcriptions",apiKey:n,model:"whisper-large-v3"}:null}function so(e){var t,n;return((t=e.apiKey)==null?void 0:t.trim())||((n=e.api_key)==null?void 0:n.trim())}async function ao(e,t,n){for(const r of no){const s=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,r).first();if(s)try{const a=await Z(s.encrypted_value,n),i=JSON.parse(a),o=so(i);if(i.provider&&o){const l=tr(i.provider,o);if(l)return l}}catch(a){console.error(`[telegram stt] Failed to load ${r}:`,a)}}for(const r of ro){const s=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,r).first();if(s)try{const a=await Z(s.encrypted_value,n),i=tr(r,a);if(i)return i}catch(a){console.error(`[telegram stt] Failed to load legacy ${r}:`,a)}}return null}const As=["message","callback_query"],io=4e3,oo=1e4,lo=3e4;async function ke(e,t={}){const n=new AbortController,r=setTimeout(()=>n.abort(),oo);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(r)}}async function nr(e){const t=new AbortController,n=setTimeout(()=>t.abort(),lo);try{return await fetch(e,{signal:t.signal})}finally{clearTimeout(n)}}async function ae(e,t,n,r="Markdown",s,a){var c,d;const i=uo(n,io),o=[];let l=!0;for(let u=0;u<i.length;u++){const p=i[u];let g=!1,f="";for(let b=0;b<3;b++)try{const w=await ke(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:p,parse_mode:r,disable_web_page_preview:!1})});if(w.ok){g=!0;break}const T=await w.json().catch(()=>null);if(f=`HTTP ${w.status}: ${(T==null?void 0:T.description)||"Unknown error"}`,(c=T==null?void 0:T.description)!=null&&c.includes("parse")||(d=T==null?void 0:T.description)!=null&&d.includes("entities")){if((await ke(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:p})})).ok){g=!0;break}f+=" (plain-text retry also failed)"}if(w.status===429||w.status>=500){const S=Math.pow(2,b)*1e3;await new Promise(R=>setTimeout(R,S));continue}break}catch(w){if(f=`Network error: ${w.message}`,b<2){const T=Math.pow(2,b)*1e3;await new Promise(S=>setTimeout(S,T));continue}}g||(l=!1,o.push(`Chunk ${u+1}/${i.length}: ${f}`))}if(!l&&s&&a&&o.length>0)try{const{logError:u}=await Promise.resolve().then(()=>gt);await u(s,a,"telegram","send_failed",o.join(" | "))}catch{}return{success:l,errors:o}}async function co(e,t){try{await ke(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function uo(e,t){if(e.length<=t)return[e];const n=[];let r=e;for(;r.length>0;){if(r.length<=t){n.push(r);break}let s=r.lastIndexOf(`
`,t);s<t*.3&&(s=r.lastIndexOf(" ",t)),s<t*.3&&(s=t),n.push(r.substring(0,s)),r=r.substring(s).trimStart()}return n}function mo(e){const t=Date.now()-new Date(e).getTime(),n=Math.floor(t/6e4);if(n<1)return"just now";if(n<60)return`${n}m ago`;const r=Math.floor(n/60);return r<24?`${r}h ago`:`${Math.floor(r/24)}d ago`}async function po(e,t,n){const s={reminder:"⏰",mail:"✉️",calendar:"📅",error:"⚠️",system:"⚙️"}[n.type]||"🔔",a={daily:"📅 Daily",weekly:"📅 Weekly",once:"✓ Once"},i=n.schedule_type?` · _${a[n.schedule_type]||"⏱ Repeating"}_`:"",o=n.body?`
`+n.body.substring(0,150)+(n.body.length>150?"…":""):"",l=`${s} *${n.title}*${i}
_${mo(n.created_at)}_${o}`,c=Ls(n.id);if(!(await ke(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:l,parse_mode:"Markdown",reply_markup:{inline_keyboard:c}})})).ok){const u=await ke(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:l.replace(/[_*`[\]]/g,""),reply_markup:{inline_keyboard:c}})});u.ok||console.warn("[sendNotifMessage] plain-text fallback also failed:",t,u.status)}}async function ho(e,t,n,r,s){switch(e.split("@")[0].toLowerCase()){case"/start":{const i=(r==null?void 0:r.name)||"there",o=(r==null?void 0:r.assistant_name)||"Karna",l=`👋 *Hello, ${i}!*

I'm ${o}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/tasks — Show open tasks
/notifications — Show pending notifications
/new — Start a fresh conversation

Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.`+(r?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`),c=await ae(n,t,l,"Markdown",s,r==null?void 0:r.id);return!c.success&&c.errors.length>0&&console.warn(`[/start] Failed to send message: ${c.errors.join(" | ")}`),!0}case"/help":{const o=`🛠 *${(r==null?void 0:r.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`,l=await ae(n,t,o,"Markdown",s,r==null?void 0:r.id);return!l.success&&l.errors.length>0&&console.warn(`[/help] Failed to send message: ${l.errors.join(" | ")}`),!0}case"/status":{if(!r){const i=await ae(n,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app.","Markdown",s);return i.success||console.warn(`[/status] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const[i,o,l,c]=await Promise.all([s.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(r.id).first(),s.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(r.id).first(),s.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(r.id).first(),s.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(r.id).first()]),d=`📊 *System Status*

Active tasks: ${(i==null?void 0:i.cnt)||0}
Memories: ${(o==null?void 0:o.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(c==null?void 0:c.cnt)||0}

Status: ✅ Online`,u=await ae(n,t,d,"Markdown",s,r.id);u.success||console.warn(`[/status] Failed to send message: ${u.errors.join(" | ")}`)}catch{const o=await ae(n,t,"✅ Online — but had trouble fetching stats.","Markdown",s,r==null?void 0:r.id);o.success||console.warn(`[/status error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/new":{if(!r){const o=await ae(n,t,"⚠️ Account not linked.","Markdown",s);return o.success||console.warn(`[/new] Failed to send message: ${o.errors.join(" | ")}`),!0}await s.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(r.id).run();const i=await ae(n,t,"🆕 Starting fresh conversation. Your next message begins a new thread.","Markdown",s,r.id);return i.success||console.warn(`[/new] Failed to send message: ${i.errors.join(" | ")}`),!0}case"/tasks":case"/task":{if(!r){const i=await ae(n,t,"⚠️ Account not linked.","Markdown",s);return i.success||console.warn(`[/tasks] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await s.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(r.id).all()).results||[];if(o.length===0){const f=await ae(n,t,"✅ No open tasks. You're all clear.","Markdown",s,r.id);return f.success||console.warn(`[/tasks] Failed to send message: ${f.errors.join(" | ")}`),!0}const l=new Date,c=l.toISOString().slice(0,10),d=new Date(l);d.setDate(d.getDate()+1);const u=d.toISOString().slice(0,10),p=[`📋 *Open Tasks (${o.length})*
`];for(const f of o){let b="";if(f.due_date){const w=f.due_date.slice(0,10);w<c?b=" ⚠️ _overdue_":w===c?b=" 🔴 _due today_":w===u?b=" 🟡 _due tomorrow_":b=` _${new Date(f.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}p.push(`☐ ${f.title}${b}`)}p.push(`
_Say "mark [task] as done" to close a task._`);const g=await ae(n,t,p.join(`
`),"Markdown",s,r.id);g.success||console.warn(`[/tasks] Failed to send message: ${g.errors.join(" | ")}`)}catch(i){const o=await ae(n,t,"❌ Could not fetch tasks: "+i.message,"Markdown",s,r==null?void 0:r.id);o.success||console.warn(`[/tasks error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/notifications":case"/notif":{if(!r){const i=await ae(n,t,"⚠️ Account not linked.","Markdown",s);return i.success||console.warn(`[/notifications] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await s.prepare(`
          SELECT n.id, n.type, n.title, n.body, n.created_at, j.schedule_type
          FROM notifications n
          LEFT JOIN cron_jobs j
            ON n.user_id = j.user_id
            AND n.source LIKE 'cron:%'
            AND CAST(SUBSTR(n.source, 6) AS INTEGER) = j.id
          WHERE n.user_id = ? AND n.is_read = 0
          ORDER BY n.created_at DESC
          LIMIT 5
        `).bind(r.id).all()).results||[];if(o.length===0){const c=await ae(n,t,"🎉 No pending notifications. You're all caught up.","Markdown",s,r.id);return c.success||console.warn(`[/notifications] Failed to send message: ${c.errors.join(" | ")}`),!0}const l=await ae(n,t,`📬 *${o.length} pending notification${o.length>1?"s":""}:*`,"Markdown",s,r.id);l.success||console.warn(`[/notifications] Failed to send header: ${l.errors.join(" | ")}`);for(const c of o)await po(n,t,c)}catch(i){const o=await ae(n,t,"❌ Could not fetch notifications: "+i.message,"Markdown",s,r==null?void 0:r.id);o.success||console.warn(`[/notifications error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}default:return!1}}async function go(e,t){var s,a,i,o,l,c;const n=t.db,r=t.env;console.log(`[telegram webhook] envVars keys=${Object.keys(r).join(",")}`);try{if(e.callback_query){await wo(n,e.callback_query);return}const d=e.message;if(!d)return;const u=!!d.text,p=!!d.voice,g=!!d.document,f=!!d.photo,b=!!d.caption;if(!u&&!p&&!g&&!f)return;const w=String(d.chat.id);let T=d.text||"";const S=await n.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(w).first();let R=null;if(S){const A=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(S.id,"telegram_bot_token").first();A&&(R=await Z(A.encrypted_value,S.pin_hash))}if(!R){const A=await n.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();A&&(R=await Z(A.encrypted_value,A.pin_hash))}if(!R||T.startsWith("/")&&await ho(T,w,R,S,n))return;if(!S){const A=await ae(R,w,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${w}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`,"Markdown",n);A.success||console.warn(`Failed to send unlinked account message: ${A.errors.join(" | ")}`);return}if(d.voice&&R&&S)try{if((d.voice.file_size??0)>20*1024*1024){const q=await ae(R,w,"⚠️ Voice note is too large to process (max 20 MB).","Markdown",n,S.id);q.success||console.warn(`[voice size] Failed to send message: ${q.errors.join(" | ")}`);return}const A=await ae(R,w,"🎤 Processing voice note...","Markdown",n,S.id);A.success||console.warn(`[voice start] Failed to send message: ${A.errors.join(" | ")}`);const X=await(await ke(`https://api.telegram.org/bot${R}/getFile?file_id=${d.voice.file_id}`)).json();if(X.ok&&((s=X.result)!=null&&s.file_path)){const re=await(await nr(`https://api.telegram.org/file/bot${R}/${X.result.file_path}`)).blob(),oe=await ao(n,S.id,S.pin_hash);if(!oe){const h=await ae(R,w,"⚠️ To use voice notes, add an OpenAI or Groq API key in Settings → Keys (LLM slot or legacy openai/groq).","Markdown",n,S.id);h.success||console.warn(`[voice no stt] Failed to send message: ${h.errors.join(" | ")}`);return}const W=new FormData;W.append("file",re,"voice.ogg"),W.append("model",oe.model),W.append("language","en");const Q=await fetch(oe.url,{method:"POST",headers:{Authorization:`Bearer ${oe.apiKey}`},body:W});if(!Q.ok){const h=await Q.text(),v=await ae(R,w,`⚠️ Transcription failed: ${Q.status} ${h}`,"Markdown",n,S.id);v.success||console.warn(`[voice transcription error] Failed to send message: ${v.errors.join(" | ")}`);return}T=(await Q.json()).text;const y=await ae(R,w,`🗣️ *You said:* ${T}`,"Markdown",n,S.id);y.success||console.warn(`[voice transcript echo] Failed to send message: ${y.errors.join(" | ")}`)}}catch(A){const K=await ae(R,w,`⚠️ Failed to process voice note: ${A.message}`,"Markdown",n,S==null?void 0:S.id);K.success||console.warn(`[voice processing error] Failed to send message: ${K.errors.join(" | ")}`);return}if((g||f)&&R&&S)try{let A,K="unknown",X="unknown",q=0;if(g)A=d.document.file_id,K=d.document.file_name||"document",X=d.document.mime_type||"unknown",q=d.document.file_size||0;else if(f){const re=d.photo[d.photo.length-1];A=re.file_id,K="photo.jpg",X="image/jpeg",q=re.file_size||0}if(A){const oe=await(await ke(`https://api.telegram.org/bot${R}/getFile?file_id=${A}`)).json();let W="";if(oe.ok&&((a=oe.result)!=null&&a.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(K)||/^text\/|application\/json|application\/xml|application\/csv/i.test(X))&&q<5e4)try{W=await(await nr(`https://api.telegram.org/file/bot${R}/${oe.result.file_path}`)).text()}catch{}const Q=d.caption||"",m=`[Telegram file received: "${K}" (${X}, ${Math.round(q/1024)}KB)]`;W?T=`${Q?Q+`

`:""}${m}
File contents:
${W.substring(0,8e3)}${W.length>8e3?`
[...truncated]`:""}`:T=`${Q?Q+`

`:""}${m}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(A){if(b&&d.caption)T=d.caption;else{const K=await ae(R,w,`⚠️ Received your file but couldn't process it: ${A.message}`,"Markdown",n,S==null?void 0:S.id);K.success||console.warn(`[file processing error] Failed to send message: ${K.errors.join(" | ")}`);return}}if(!T)return;co(R,w).catch(()=>{});let O=await n.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(S.id).first();if(O)await n.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(O.id).run();else{const A=await n.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(S.id).run();if(!((i=A.meta)!=null&&i.last_row_id))throw new Error("Thread creation failed — no row ID returned");O={id:A.meta.last_row_id}}const M=eo(S.id,S.username,T,w);M.metadata={thread_id:O.id},console.log(`[telegram webhook] user=${S.id} msgLen=${T.length} thread=${O.id}`);let L,U;try{const A=await Ke(n,S.id,S.pin_hash);L=A.provider,U=A.rotation}catch(A){console.error("Telegram provider setup error:",A);const K=(o=A.message)!=null&&o.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(l=A.message)!=null&&l.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${A.message||"Unknown error"}`,X=await ae(R,w,K,"Markdown",n,S.id);X.success||console.warn(`[provider error] Failed to send message: ${X.errors.join(" | ")}`);return}const{classifyIntentFast:Y}=await Promise.resolve().then(()=>_i);if(Y(T).agent==="multi"){const A=await ae(R,w,"🔍 On it…","Markdown",n,S.id);A.success||console.warn(`[ack] Failed to send: ${A.errors.join(" | ")}`)}const ee=6e5;let se=!1;try{const A=await Promise.race([An(M,n,L,S,U,r),new Promise((q,re)=>setTimeout(()=>re(new Error("TELEGRAM_TIMEOUT")),ee))]),K=to(A,"telegram"),X=await ae(R,w,K||"(empty response)","Markdown",n,S.id);if(await n.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(O.id).run().catch(()=>{}),se=X.success,!X.success){console.error(`[CRITICAL] Agent response failed to send to Telegram for user ${S.id}:`,X.errors);try{const{logError:q}=await Promise.resolve().then(()=>gt);await q(n,S.id,"telegram","response_send_failed",`Failed to deliver response: ${X.errors.join(" | ")}`)}catch{}}}catch(A){console.error("Telegram agent error:",A);const K=A.message==="TELEGRAM_TIMEOUT",X=K?`⏱️ This is taking too long to complete via Telegram.

If you requested a browser task, the result will arrive as a notification when ready. For other long tasks, try the web app.`:(c=A.message)!=null&&c.includes("API error")?`⚠️ AI provider returned an error. The provider (${L.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(A.message||"Unknown").substring(0,200)}`,q=await ae(R,w,X,"Markdown",n,S.id);se=q.success,q.success||console.error(`[CRITICAL] Error message failed to send to Telegram for user ${S.id}:`,q.errors);try{const{logError:re}=await Promise.resolve().then(()=>gt);await re(n,S.id,"telegram",K?"timeout":"agent_error",A.message||"Agent error",{provider:L.name})}catch{}}}catch(d){console.error("Telegram webhook error:",d);try{const{logError:u}=await Promise.resolve().then(()=>gt);await u(n,null,"telegram","webhook_error",d.message||"Unknown telegram error")}catch{}}}function rr(e){if(!e)return null;if(e.startsWith("cron:")){const t=parseInt(e.replace("cron:",""),10);return isNaN(t)?null:t}return null}function fo(e){const t=new Date(new Date().toLocaleString("en-US",{timeZone:e})),n=new Date(t);n.setDate(n.getDate()+1),n.setHours(9,0,0,0);const r=new Date(n.toLocaleString("en-US",{timeZone:"UTC"})),s=new Date(n.toLocaleString("en-US",{timeZone:e}));return new Date(n.getTime()+(r.getTime()-s.getTime())).toISOString()}const Ls=e=>[[{text:"✅ Seen",callback_data:`notif_seen:${e}`},{text:"⏰ Snooze",callback_data:`notif_snooze_menu:${e}`},{text:"✓ Done",callback_data:`notif_done:${e}`}]],yo=e=>[[{text:"10 minutes",callback_data:`notif_snooze:${e}:10m`},{text:"1 hour",callback_data:`notif_snooze:${e}:1h`}],[{text:"Tomorrow 9 AM",callback_data:`notif_snooze:${e}:tomorrow`},{text:"← Back",callback_data:`notif_back:${e}`}]];async function ct(e,t,n){const r=await ke(`https://api.telegram.org/bot${e}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:t,text:n})});r.ok||console.warn("[answerCallback]",t,r.status)}async function dt(e,t,n,r){const s=await ke(`https://api.telegram.org/bot${e}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,message_id:n,reply_markup:r?{inline_keyboard:r}:{}})});s.ok||console.warn("[editKeyboard]",t,n,s.status)}async function vo(e,t,n,r,s,a,i,o,l,c){const d=await e.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).first();if(!d){await ct(t,n,"Notification not found — may have already been actioned."),await dt(t,r,s,null);return}if(i==="notif_seen")await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await ct(t,n,"✅ Dismissed"),await dt(t,r,s,null);else if(i==="notif_snooze_menu")await ct(t,n),await dt(t,r,s,yo(o));else if(i==="notif_back")await ct(t,n),await dt(t,r,s,Ls(o));else if(i==="notif_snooze"){const u=rr(d.source);u&&await e.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,a).run();let p,g;l==="10m"?(p=new Date(Date.now()+600*1e3).toISOString(),g="10 minutes"):l==="1h"?(p=new Date(Date.now()+3600*1e3).toISOString(),g="1 hour"):(p=fo(c||"UTC"),g="tomorrow 9 AM"),await e.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
       VALUES (?, ?, ?, 'once', ?, 'reminder', ?, ?, 1, 'active')`).bind(a,d.title,d.body,p,JSON.stringify({description:d.body||""}),p).run(),await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await ct(t,n,`⏰ Snoozed until ${g}`),await dt(t,r,s,null)}else if(i==="notif_done"){const u=rr(d.source);u&&await e.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,a).run(),await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await ct(t,n,"✓ Done!"),await dt(t,r,s,null)}}async function wo(e,t){var w;const{id:n,data:r,message:s,from:a}=t;if(!r||!s)return;const i=r.split(":"),o=i[0],l=String(s.chat.id);if(o.startsWith("notif_")){const T=parseInt(i[1]);if(!T)return;const S=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(l).first();if(!S)return;const R=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
       JOIN users u ON c.user_id = u.id
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(S.id).first();if(!R)return;const O=await Z(R.encrypted_value,R.pin_hash),M=i[2];await vo(e,O,n,l,s.message_id,S.id,o,T,M,S.timezone);return}if(i[0]!=="briefing_toggle"||i.length<3)return;const c=i[1],d=parseInt(i[2]);if(!d||!c)return;const u=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(l).first();if(!u)return;const p=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(u.id,d,c).first();if(!p)return;const g=p.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(g,g,p.id).run();const f=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(u.id).first();if(!f)return;const b=await Z(f.encrypted_value,f.pin_hash);try{const T=await ke(`https://api.telegram.org/bot${b}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:n,text:g?"✅ Checked!":"☐ Unchecked"})});T.ok||console.warn(`[callback answer] Failed to answer callback: HTTP ${T.status}`)}catch(T){console.warn(`[callback answer] Error answering callback: ${T.message}`)}if((w=s.reply_markup)!=null&&w.inline_keyboard){const T=s.reply_markup.inline_keyboard.map(S=>S.map(R=>{var O;if((O=R.callback_data)!=null&&O.includes(c)){const M=g?"✅":"☐",L=R.text.replace(/^[☐✅]\s*/,"");return{...R,text:`${M} ${L}`}}return R}));try{await ke(`https://api.telegram.org/bot${b}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l,message_id:s.message_id,reply_markup:{inline_keyboard:T}})})}catch{}}}const Ut=new be;function bo(e){return{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE}}Ut.post("/webhook",async e=>{let t;try{t=await e.req.json()}catch{return e.json({ok:!0})}const r={db:e.env.DB,env:bo(e)};return e.executionCtx.waitUntil(go(t,r)),e.json({ok:!0})});Ut.post("/setup-webhook",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const{webhook_url:r}=await e.req.json(),s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!s)return e.json({error:"Telegram bot token not configured in Settings"},400);const a=await Z(s.encrypted_value,n.pin_hash);if(!r){const d=await(await fetch(`https://api.telegram.org/bot${a}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(d)}const o=await(await fetch(`https://api.telegram.org/bot${a}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r,allowed_updates:[...As],drop_pending_updates:!1})})).json();return e.json(o)});Ut.get("/webhook-status",async e=>{var a,i,o,l,c,d;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!r)return e.json({configured:!1,error:"Bot token not set"});const s=await Z(r.encrypted_value,n.pin_hash);try{const p=await(await fetch(`https://api.telegram.org/bot${s}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((i=p.result)==null?void 0:i.url)||"",has_webhook:!!((o=p.result)!=null&&o.url),pending_updates:((l=p.result)==null?void 0:l.pending_update_count)||0,last_error:((c=p.result)==null?void 0:c.last_error_message)||"",last_error_date:((d=p.result)==null?void 0:d.last_error_date)||null})}catch(u){return e.json({configured:!0,error:u.message})}});Ut.post("/detect-chat-id",async e=>{var a,i;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!r)return e.json({error:"Bot token not configured"},400);const s=await Z(r.encrypted_value,n.pin_hash);try{const c=((i=(await(await fetch(`https://api.telegram.org/bot${s}/getWebhookInfo`)).json()).result)==null?void 0:i.url)||"";await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(w=>setTimeout(w,500));const u=await(await fetch(`https://api.telegram.org/bot${s}/getUpdates?limit=10&timeout=0`)).json();c&&await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:c,allowed_updates:[...As]})});const p=u.result||[];if(p.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const g=[],f=new Set;for(let w=p.length-1;w>=0;w--){const T=p[w].message;if(T&&T.chat){const S=String(T.chat.id);f.has(S)||(f.add(S),g.push({chat_id:S,name:[T.chat.first_name,T.chat.last_name].filter(Boolean).join(" ")||T.chat.title||"Unknown",username:T.chat.username||"",date:new Date((T.date||0)*1e3).toISOString()}))}}if(g.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const b=g[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(b,n.user_id).run(),e.json({found:!0,chat_id:b,name:g[0].name,all_chats:g,message:`Chat ID ${b} detected and saved to your profile.`})}catch(o){return e.json({error:`Detection failed: ${o.message}`},500)}});function _o(e){const t=new Date,n=new Date(t.toLocaleString("en-US",{timeZone:e})),r=new Date(n);r.setDate(r.getDate()+1),r.setHours(0,0,0,0);const s=new Date(r);s.setHours(23,59,59,999);const a=r.toISOString().split("T")[0];return{start:r.toISOString(),end:s.toISOString(),dateStr:a}}function nn(e,t=new Date){return new Intl.DateTimeFormat("en-CA",{timeZone:e||"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}async function Eo(e,t,n,r,s,a){try{return(await new Sn(e,t,n,r,s).listEvents("primary",{timeMin:a.start,timeMax:a.end,maxResults:50})).map(l=>{var c;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(c=l.attendees)==null?void 0:c.map(d=>d.displayName||d.email),source:"google"}})}catch(i){return console.error("Google Calendar fetch error:",i.message),[]}}async function To(e,t,n,r,s){try{const a=new xe(e,t,n,r,s),i=await a.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),o=await a.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const u of i){const p=u.from.split("<")[0].trim()||u.from;l[p]=(l[p]||0)+1}const c=Object.entries(l).sort(([,u],[,p])=>p-u).slice(0,5).map(([u])=>u),d=i.some(u=>u.subject.toLowerCase().includes("urgent")||u.subject.toLowerCase().includes("asap")||u.subject.toLowerCase().includes("immediately"));return{unreadCount:i.length,importantCount:o.length,topSenders:c,hasUrgent:d}}catch(a){return console.error("Gmail fetch error:",a.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function So(e,t){try{const n=await e.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(t).all(),r=new Date,s=new Date(r);s.setDate(s.getDate()+1),s.setHours(23,59,59,999);const a=n.results||[],i=a.map(l=>{if(l.due_date){const c=new Date(l.due_date),d=c<=r?"overdue":c<=s?"due today":c.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${l.title} [${d}]`}return l.title}),o=a.filter(l=>l.due_date?new Date(l.due_date)<=s:!1).length;return{pending:a.length,dueToday:o,items:i}}catch(n){return console.error("Tasks fetch error:",n.message),{pending:0,dueToday:0,items:[]}}}async function xo(e,t){try{const n=Math.floor((Date.now()-1728e5)/1e3),r=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${n},points>10`,s=await fetch(r,{headers:{"User-Agent":"Karna/1.0"}});return s.ok?((await s.json()).hits||[]).filter(i=>i.url&&!t.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const sr=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function ko(e,t,n){const r=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],s=new Set;if(t&&n)try{((await t.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(n).all()).results||[]).forEach(c=>s.add(c.url))}catch{}const a=[];if(r.some(l=>sr.some(c=>l.toLowerCase().includes(c.toLowerCase())))){const l=r.find(d=>sr.some(u=>d.toLowerCase().includes(u.toLowerCase())))||"AI agents",c=await xo(l,s);for(const d of c)a.push(d),s.add(d.url)}for(const l of r){if(a.length>=8)break;const c=`latest ${l} news today`;try{const d=await en(c,{num:5});if(d.results)for(const u of d.results){if(a.length>=8)break;s.has(u.link)||(a.push({title:u.title,summary:u.snippet,url:u.link,source:u.displayLink}),s.add(u.link))}}catch(d){console.error(`News search error for "${c}":`,d.message)}}const o=a.slice(0,7);if(t&&n&&o.length>0)for(const l of o)try{await t.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(n,l.url,l.title).run()}catch{}return o}function Do(e,t){const n=[];let r="20:00";{const[i,o]=t.split(":"),l=parseInt(i,10),c=o||"00",d=l>=12?"PM":"AM";r=`${l===0?12:l>12?l-12:l}:${c} ${d}`}n.push(`🗓 Your ${r} Brief — ${e.targetDate}`),n.push("");const s=e.calendar.totalCount;if(s>0){n.push(`📅 Tomorrow: ${s} event${s===1?"":"s"}`);for(const i of e.calendar.google.slice(0,5)){const o=i.startTime?new Date(i.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";n.push(`   • ${o} ${i.title}`)}}else n.push("📅 Tomorrow: Nothing scheduled");n.push("");const a=e.emails.gmail.unreadCount;if(a>0?(n.push(`📧 Gmail: ${a} unread`),e.emails.gmail.importantCount>0&&n.push(`   ★ ${e.emails.gmail.importantCount} marked important`),e.emails.gmail.hasUrgent&&n.push("   ⚠️ Urgent messages present"),e.emails.gmail.topSenders.length>0&&n.push(`   From: ${e.emails.gmail.topSenders.slice(0,3).join(", ")}`)):n.push("📧 Gmail: Inbox clear"),n.push(""),e.tasks.pending>0){n.push(`✅ Open Tasks (${e.tasks.pending}):`);for(const i of e.tasks.items)n.push(`   ☐ ${i}`)}else n.push("✅ Tasks: All clear");if(n.push(""),e.news.items.length>0){n.push("📡 Today's Signal:");for(const i of e.news.items){const o=i.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${i.source}`;n.push(`   • ${i.title.substring(0,90)}${i.title.length>90?"…":""}`),n.push(`     ${o} — ${i.summary.substring(0,80)}${i.summary.length>80?"…":""}`)}}return n.join(`
`)}function Ro(e){const t=[];let n=0;for(const r of e.calendar.google)t.push({type:"calendar",key:r.id,text:`${r.title} - ${new Date(r.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:r},sortOrder:n++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:n++});for(const r of e.tasks.items)t.push({type:"task",key:`task-${r}`,text:r,metadata:{},sortOrder:n++});for(const r of e.news.items)t.push({type:"news",key:`news-${r.url}`,text:`📰 ${r.title}`,metadata:{url:r.url,source:r.source},sortOrder:n++});return t}async function Oo(e,t){const n=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!n)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let r;try{const a=JSON.parse(n.components);r={google_calendar:a.google_calendar!==!1,gmail:a.gmail!==!1,tasks:a.tasks!==!1,news:a.news!==!1}}catch{r={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const s=n.news_topics?n.news_topics.split(",").map(a=>a.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:r,newsTopics:s}}async function Ms(e,t,n){var R,O;const r=t.timezone||"Asia/Kolkata",s=_o(r),{components:a,newsTopics:i}=await Oo(e,t.id),o=[],l=[];a.google_calendar&&(o.push(Eo(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET,s)),l.push("googleEvents")),a.gmail&&(o.push(To(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),a.tasks&&(o.push(So(e,t.id)),l.push("tasks")),a.news&&(o.push(ko(i,e,t.id)),l.push("news"));const c=await Promise.all(o),d={};l.forEach((M,L)=>{d[M]=c[L]});const u={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},p={pending:0,dueToday:0,items:[]},g={generatedAt:new Date().toISOString(),targetDate:s.dateStr,calendar:{google:d.googleEvents||[],totalCount:((R=d.googleEvents)==null?void 0:R.length)||0},emails:{gmail:d.gmailSummary||u},tasks:d.tasks||p,news:{items:d.news||[],fetchedAt:new Date().toISOString()},summary:""},f=((O=await e.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(t.id).first())==null?void 0:O.briefing_time)||"20:00";g.summary=Do(g,f);const b=Ro(g),w=nn(r),T=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel, briefing_date)
    VALUES (?, 'evening', ?, 'all', ?)
    RETURNING id
  `).bind(t.id,JSON.stringify(g),w).first(),S=(T==null?void 0:T.id)||0;for(const M of b)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(S,M.type,M.key,M.text,JSON.stringify(M.metadata),M.sortOrder).run();return{briefingId:S,content:g,items:b}}async function Io(e,t,n){const r=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(n,t).first();if(!r)return null;const s=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(n).all();return{briefing:{...r,content:JSON.parse(r.content_json||"{}")},items:s.results||[]}}async function No(e,t,n,r){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(n,t).first())return null;const a=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(r,n).first();if(!a)return null;const i=a.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(i,i,r,n).run(),{checked:i===1}}async function Co(e,t,n=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
    LIMIT ?
  `).bind(t,n).all()).results||[]).map(s=>({...s,content:JSON.parse(s.content_json||"{}")}))}function $s(e,t,n=new Date,r=5){const s=new Date(n.toLocaleString("en-US",{timeZone:t})),a=s.getHours(),i=s.getMinutes(),[o,l]=e.split(":").map(Number),c=a*60+i,d=o*60+l,u=c-d;return u>=0&&u<r}function Ps(e,t){const n=e.summary,r=[];for(const s of t.slice(0,10))r.push([{text:`☐ ${s.text.substring(0,40)}${s.text.length>40?"...":""}`,callback_data:`briefing_toggle:${s.key}`}]);return{text:n,inlineKeyboard:r}}const he=new be,Ao=1e4;async function At(e,t){const n=new AbortController,r=setTimeout(()=>n.abort(),Ao);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(r)}}async function Lo(e,t){var s;if(e.req.path.includes("/cron/"))return t();const n=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",n),await t()}he.use("/*",Lo);he.get("/briefings",async e=>{const t=e.get("user"),n=parseInt(e.req.query("limit")||"10");try{const r=await Co(e.env.DB,t.id,n);return e.json({briefings:r})}catch(r){return e.json({error:r.message},500)}});he.get("/briefings/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));try{const r=await Io(e.env.DB,t.id,n);return r?e.json(r):e.json({error:"Briefing not found"},404)}catch(r){return e.json({error:r.message},500)}});he.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),r=parseInt(e.req.param("itemId"));try{const s=await No(e.env.DB,t.id,n,r);return s?e.json(s):e.json({error:"Item not found"},404)}catch(s){return e.json({error:s.message},500)}});he.post("/briefings/generate",async e=>{const t=e.get("user");try{const n=await Ms(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(n)}catch(n){return e.json({error:n.message},500)}});he.get("/morning-briefing",async e=>{const t=e.get("user");try{const n=await Us(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(n)}catch(n){return e.json({error:n.message},500)}});he.get("/briefing-preferences",async e=>{const t=e.get("user");try{const n=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!n){const s={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:s})}const r={briefingTime:n.briefing_time,briefingEnabled:n.briefing_enabled!==0,components:JSON.parse(n.components),newsTopics:n.news_topics.split(",").map(s=>s.trim()).filter(Boolean),notificationChannels:JSON.parse(n.notification_channels),proactiveLevel:n.proactive_level};return e.json({preferences:r})}catch(n){return e.json({error:n.message},500)}});he.post("/briefing-preferences",async e=>{const t=e.get("user"),n=await e.req.json(),r=[];if(n.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(n.briefingTime)||r.push("Invalid time format. Use HH:MM (e.g., 20:00)")),n.newsTopics&&(n.newsTopics.length>5&&r.push("Maximum 5 news topics allowed"),n.newsTopics.some(s=>s.length>50)&&r.push("Each news topic must be 50 characters or less")),n.proactiveLevel&&!["conservative","moderate","aggressive"].includes(n.proactiveLevel)&&r.push("Invalid proactive level. Use conservative, moderate, or aggressive"),r.length>0)return e.json({error:r.join("; ")},400);try{const s=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),a=n.components?JSON.stringify(n.components):null,i=n.notificationChannels?JSON.stringify(n.notificationChannels):null,o=n.newsTopics?n.newsTopics.join(", "):null;if(s){const l=[],c=[];n.briefingTime!==void 0&&(l.push("briefing_time = ?"),c.push(n.briefingTime)),n.briefingEnabled!==void 0&&(l.push("briefing_enabled = ?"),c.push(n.briefingEnabled?1:0)),a!==null&&(l.push("components = ?"),c.push(a)),o!==null&&(l.push("news_topics = ?"),c.push(o)),i!==null&&(l.push("notification_channels = ?"),c.push(i)),n.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),c.push(n.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),c.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...c).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,n.briefingTime||"20:00",a||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',o||"AI, LLM, Tools, Agentic Workflows, AI Features",i||'{"telegram":true,"web":true}',n.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(s){return e.json({error:s.message},500)}});he.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(n){return e.json({error:n.message},500)}});he.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),s=[],a=new Date;for(const i of r.results||[]){if(!i.briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.briefing_time||"20:00";if(!$s(l,o,a))continue;const c=nn(o,a);if(!await e.env.DB.prepare("SELECT 1 FROM briefings WHERE user_id = ? AND briefing_type = 'evening' AND briefing_date = ? LIMIT 1").bind(i.id,c).first())try{const u=await Ms(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});if(i.telegram_chat_id){const{text:p,inlineKeyboard:g}=Ps(u.content,u.items);await Bs(e.env.DB,i,p,g,u.briefingId)}s.push({user_id:i.id,status:"success",briefing_id:u.briefingId,briefing_time:l,timezone:o})}catch(u){s.push({user_id:i.id,status:"error",error:u.message})}}return e.json({executed:s.length,results:s})}catch(r){return e.json({error:r.message},500)}});he.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id IS NOT NULL").all(),s=[],a=new Date,i=new Date(a.getTime()+600*1e3).toISOString(),o=new Date(a.getTime()+900*1e3).toISOString();for(const l of r.results||[])try{const c=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!c)continue;const d=await Z(c.encrypted_value,l.pin_hash),p=JSON.parse(d).access_token;if(!p)continue;const g=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(a.toISOString())}&timeMax=${encodeURIComponent(o)}&maxResults=10`,{headers:{Authorization:`Bearer ${p}`}});if(!g.ok)continue;const b=((await g.json()).items||[]).filter(S=>{var O;const R=(O=S.start)==null?void 0:O.dateTime;return R?R>=a.toISOString()&&R<=i:!1});if(b.length===0){s.push({user_id:l.id,reminders_sent:0});continue}const w=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(l.id).first();if(!w)continue;const T=await Z(w.encrypted_value,l.pin_hash);if(!(T!=null&&T.trim()))continue;for(const S of b){const R=new Date(S.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),O=S.location?`
📍 ${S.location}`:"",M=`⏰ Meeting in 10 minutes!

*${S.summary||"Untitled Event"}*
🕐 ${R}${O}`;await At(`https://api.telegram.org/bot${T}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l.telegram_chat_id,text:M,parse_mode:"Markdown"})})}s.push({user_id:l.id,reminders_sent:b.length})}catch(c){s.push({user_id:l.id,status:"error",error:c.message})}return e.json({executed:s.length,results:s})}catch(r){return e.json({error:r.message},500)}});he.post("/cron/morning-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.morning_briefing_time, '08:00') as morning_briefing_time,
             COALESCE(bp.morning_briefing_enabled, 1) as morning_briefing_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),s=[],a=new Date;for(const i of r.results||[]){if(!i.morning_briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.morning_briefing_time||"08:00";if(!$s(l,o,a))continue;const c=nn(o,a);if(!await e.env.DB.prepare("SELECT 1 FROM briefings WHERE user_id = ? AND briefing_type = 'morning' AND briefing_date = ? LIMIT 1").bind(i.id,c).first())try{const u=await Us(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});let p={telegram:!0,web:!0};try{p=JSON.parse(i.notification_channels||"{}")}catch{}if(p.telegram!==!1&&i.telegram_chat_id&&u.briefingId){const g=Po(u.content);await js(e.env.DB,i,g),await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(u.briefingId).run()}s.push({user_id:i.id,status:"success",briefing_id:u.briefingId,briefing_time:l,timezone:o})}catch(u){s.push({user_id:i.id,status:"error",error:u.message})}}return e.json({executed:s.length,results:s})}catch(r){return e.json({error:r.message},500)}});he.post("/cron/email-digest",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare(`
      SELECT u.*, bp.components
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),s=[];for(const a of r.results||[]){let i={};try{i=JSON.parse(a.components||"{}")}catch{}if(i.email_digest!==!1)try{const o=await Hs(e.env.DB,a,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET},{skipBrowserUse:!0}),l=`Email Digest — ${new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}`,c=JSON.stringify(o,null,2),d=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'email_digest', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(a.id,l,c,`email_digest_${Date.now()}`,null,null,null).first();s.push({user_id:a.id,status:"success",action_item_id:d==null?void 0:d.id,digest:o})}catch(o){s.push({user_id:a.id,status:"error",error:o.message})}}return e.json({executed:s.length,results:s})}catch(r){return e.json({error:r.message},500)}});he.post("/cron/weekly-review",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const r=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.weekly_review_day_time, 'Sunday 20:00') as weekly_review_day_time,
             COALESCE(bp.weekly_review_enabled, 1) as weekly_review_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),s=[],a=new Date;for(const i of r.results||[]){if(!i.weekly_review_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.weekly_review_day_time||"Sunday 20:00";if(Mo(l,o,a))try{const c=await $o(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),d=`Weekly Review — Week of ${new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})}`,u=JSON.stringify(c,null,2),p=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'weekly_review', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(i.id,d,u,`weekly_review_${Date.now()}`,null,null,null).first();let g={telegram:!0,web:!0};try{g=JSON.parse(i.notification_channels||"{}")}catch{}if(g.telegram!==!1&&i.telegram_chat_id){const f=Bo(c);await js(e.env.DB,i,f)}s.push({user_id:i.id,status:"success",action_item_id:p==null?void 0:p.id})}catch(c){s.push({user_id:i.id,status:"error",error:c.message})}}return e.json({executed:s.length,results:s})}catch(r){return e.json({error:r.message},500)}});async function Bs(e,t,n,r,s){try{const a=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!a)return;const i=await Z(a.encrypted_value,a.pin_hash);if(!(i!=null&&i.trim())){fs("sendTelegramWithKeyboard: empty bot token",{userId:t.id});return}if(!(await(await At(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n,parse_mode:"Markdown",reply_markup:{inline_keyboard:r.map(c=>c.map(d=>({...d,callback_data:`${d.callback_data}:${s}`})))}})})).json()).ok){const d=await(await At(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n.replace(/[_*[`\]]/g,""),reply_markup:{inline_keyboard:r.map(u=>u.map(p=>({...p,callback_data:`${p.callback_data}:${s}`})))}})})).json();if(!d.ok){vn("Telegram briefing send failed",{description:d.description,chatId:t.telegram_chat_id});return}}await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(s).run()}catch(a){vn("Telegram briefing error",{error:(a==null?void 0:a.message)||String(a)})}}async function js(e,t,n){try{const r=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!r)return;const s=await Z(r.encrypted_value,r.pin_hash);if(!(s!=null&&s.trim())){fs("sendTelegramPlainText: empty bot token",{userId:t.id});return}(await At(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n.substring(0,4e3),parse_mode:"Markdown"})})).ok||await At(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n.substring(0,4e3).replace(/[_*[`\]]/g,"")})})}catch(r){vn("Telegram plain text error",{error:(r==null?void 0:r.message)||String(r)})}}async function Us(e,t,n){const r=new Date;r.setHours(0,0,0,0);const s=new Date;s.setHours(23,59,59,999);const a=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 
    AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,r.toISOString(),s.toISOString()).all(),i=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 10
  `).bind(t.id).all(),o=await Hs(e,t,n,{skipBrowserUse:!0});let l=[];try{const g=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first();if(g){const f=await Z(g.encrypted_value,t.pin_hash),w=JSON.parse(f).access_token;if(w){const T=r.toISOString(),S=s.toISOString(),R=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(T)}&timeMax=${encodeURIComponent(S)}&maxResults=20`,{headers:{Authorization:`Bearer ${w}`}});R.ok&&(l=((await R.json()).items||[]).map(M=>{var L,U,Y,ee;return{title:M.summary||"Untitled",startTime:((L=M.start)==null?void 0:L.dateTime)||((U=M.start)==null?void 0:U.date),endTime:((Y=M.end)==null?void 0:Y.dateTime)||((ee=M.end)==null?void 0:ee.date)}}))}}}catch{}const c={generatedAt:new Date().toISOString(),type:"morning",todayReminders:(a.results||[]).map(g=>({name:g.name,description:g.description,next_run:g.next_run})),pendingActions:(i.results||[]).map(g=>({title:g.title,priority:g.priority})),emailDigest:o,calendarEvents:l},d=nn(t.timezone||"Asia/Kolkata"),u=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel, briefing_date)
    VALUES (?, 'morning', ?, 'all', ?)
    RETURNING id
  `).bind(t.id,JSON.stringify(c),d).first();return{briefingId:(u==null?void 0:u.id)||0,content:c}}async function Hs(e,t,n,r){const s={unreadCount:0,recent:[]},a={message:"",recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const o=new xe(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET),l=await o.getUnreadCount(),c=await o.listMessages({maxResults:10,labelIds:["INBOX"]});s.unreadCount=l,s.recent=c.map(d=>({id:d.id,subject:d.subject,from:d.from,snippet:d.snippet,isUnread:d.isUnread}))}}catch(i){s.error=i.message}if(r!=null&&r.skipBrowserUse)a.message="Outlook not fetched in automated digest (runs once daily in morning briefing).";else try{const i=await e.prepare("SELECT name, encrypted_blob FROM site_credentials WHERE user_id = ? AND (name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE) LIMIT 1").bind(t.id,"%Outlook%","%Microsoft%","%Office 365%").first();if(!i)a.message="No Outlook credentials saved in Secret Vault. Add them in Settings → Secret Vault.";else{const o=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,"browser_use_api_key").first();if(!o)a.message="Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key.";else{const l=(await Z(o.encrypted_value,t.pin_hash)).trim(),c=JSON.parse(await Z(i.encrypted_blob,t.pin_hash)),d=await ss("Go to https://outlook.live.com or https://outlook.office.com. Log in with username {username} and password {password} if prompted. Navigate to the inbox and extract the 10 most recent emails with sender, subject, date, and snippet. Return the results as structured text.",l,{secrets:{username:c.username,password:c.password},timeoutMs:3e5});d.status==="completed"&&d.output?a.recent=d.output:d.status==="timeout"?a.message="Outlook browser task timed out.":a.message="Outlook returned no content."}}}catch(i){a.message=`Outlook error: ${i.message}`}return{gmail:s,outlook:a}}function Mo(e,t,n=new Date){const r=new Date(n.toLocaleString("en-US",{timeZone:t})),s=r.toLocaleDateString("en-US",{weekday:"long"}),a=r.getHours(),i=r.getMinutes(),o=e.trim().split(" "),l=o[o.length-1],c=o.slice(0,o.length-1).join(" "),[d,u]=l.split(":").map(Number),p=a*60+i,g=d*60+u;return s===c&&p===g}async function $o(e,t,n){const r=new Date,s=new Date(r.getTime()-10080*60*1e3),a=new Date(r.getTime()+10080*60*1e3),i=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND state = 'completed' AND last_run >= ?
    ORDER BY last_run DESC
  `).bind(t.id,s.toISOString()).all(),o=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run < ?
    ORDER BY next_run DESC
  `).bind(t.id,r.toISOString()).all(),l=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 15
  `).bind(t.id).all(),c=await e.prepare(`
    SELECT * FROM document_library 
    WHERE user_id = ? AND created_at >= ?
    ORDER BY created_at DESC
    LIMIT 10
  `).bind(t.id,s.toISOString()).all(),d=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,r.toISOString(),a.toISOString()).all();let u={unreadCount:0,recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const g=new xe(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET),f=await g.getUnreadCount(),b=await g.listMessages({maxResults:10,labelIds:["INBOX"]});u={unreadCount:f,recent:b.map(w=>({subject:w.subject,from:w.from,snippet:w.snippet}))}}}catch{}return{generatedAt:r.toISOString(),period:{start:s.toISOString(),end:r.toISOString()},completedTasks:(i.results||[]).map(p=>({name:p.name,last_run:p.last_run})),missedTasks:(o.results||[]).map(p=>({name:p.name,next_run:p.next_run})),openActions:(l.results||[]).map(p=>({title:p.title,priority:p.priority,status:p.status})),recentDocuments:(c.results||[]).map(p=>({name:p.name,status:p.status,created_at:p.created_at})),upcomingTasks:(d.results||[]).map(p=>({name:p.name,next_run:p.next_run})),gmailSummary:u}}function Po(e){const t=[];t.push("☀️ Morning Briefing"),t.push("");const n=e.todayReminders||[];if(n.length>0){t.push(`📋 Today (${n.length}):`);for(const l of n){const c=l.next_run?new Date(l.next_run).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${c} ${l.name}`)}}else t.push("📋 Today: No scheduled reminders");t.push("");const r=e.pendingActions||[];if(r.length>0){t.push(`🔔 Pending Actions (${r.length}):`);for(const l of r.slice(0,5))t.push(`   • ${l.title} (${l.priority})`)}else t.push("🔔 Pending Actions: None");t.push("");const s=e.emailDigest||{},a=s.gmail||{};a.unreadCount>0?t.push(`📧 Gmail: ${a.unreadCount} unread`):t.push("📧 Gmail: Inbox clear");const i=s.outlook||{};typeof i.recent=="string"&&i.recent.length>0?t.push("📧 Outlook: see digest"):i.message&&t.push(`📧 Outlook: ${i.message}`),t.push("");const o=e.calendarEvents||[];if(o.length>0){t.push(`📅 Calendar (${o.length}):`);for(const l of o.slice(0,5)){const c=l.startTime?new Date(l.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${c} ${l.title}`)}}return t.join(`
`)}function Bo(e){const t=[];t.push("📊 Weekly Review"),t.push("");const n=e.completedTasks||[];t.push(`✅ Completed: ${n.length}`);const r=e.missedTasks||[];t.push(`❌ Missed/Overdue: ${r.length}`);const s=e.openActions||[];t.push(`🔔 Open Actions: ${s.length}`),t.push("");const a=e.recentDocuments||[];a.length>0&&t.push(`📄 Documents: ${a.length} this week`);const i=e.upcomingTasks||[];i.length>0&&t.push(`📅 Upcoming: ${i.length} in next 7 days`);const o=e.gmailSummary||{};return o.unreadCount>0&&t.push(`📧 Gmail Unread: ${o.unreadCount}`),t.join(`
`)}he.post("/briefings/:id/resend",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));try{const r=await e.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!r)return e.json({error:"Briefing not found"},404);const s=JSON.parse(r.content||"{}"),a=await e.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(n).all(),{text:i,inlineKeyboard:o}=Ps(s,a.results||[]);await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(n).run(),await Bs(e.env.DB,t,i,o,n);const l=await e.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(n).first();return l!=null&&l.delivered_telegram?e.json({success:!0,message:"Briefing sent to Telegram"}):e.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(r){return e.json({error:r.message},500)}});he.delete("/briefings/:id",async e=>{const t=e.get("user"),n=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});const ot=new be;async function Ht(e,t){var s;const n=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",n),await t()}function Fs(e){return e.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"")}ot.post("/cron/review-low-confidence",async e=>{if((e.req.header("X-Cron-Secret")||"")!==(e.env.CRON_SECRET||"karna-cron-default-v1"))return e.json({error:"Unauthorized"},401);let n=0,r=0,s=0;try{const a=await e.env.DB.prepare(`SELECT DISTINCT u.id, u.pin_hash
       FROM users u
       JOIN user_skills us ON us.user_id = u.id
       WHERE us.is_auto = 1 AND us.enabled = 1
         AND us.confidence_score < 0.4 AND us.usage_count >= 5`).all();for(const i of a.results??[])try{const{provider:o}=await Ke(e.env.DB,i.id,i.pin_hash),l=await ki(e.env.DB,o,i.id);n+=l.reviewed,r+=l.rewritten,s+=l.disabled}catch{}}catch(a){return e.json({error:a.message,reviewed:n,rewritten:r,disabled:s},500)}return e.json({reviewed:n,rewritten:r,disabled:s})});ot.get("/",Ht,async e=>{const t=e.get("user"),r=(await e.env.DB.prepare(`SELECT id, name, slug, description, instructions, parameters, required_tools, examples,
            enabled, usage_count, last_used_at, created_at, updated_at,
            is_auto, refinement_count, source, confidence_score
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`).bind(t.id).all()).results||[],s=r.filter(i=>!i.is_auto),a=r.filter(i=>i.is_auto);return e.json({skills:s,auto_skills:a})});ot.post("/",Ht,async e=>{var c,d,u;const t=e.get("user"),n=await e.req.json();if(!((c=n.name)!=null&&c.trim()))return e.json({error:"name is required"},400);if(!((d=n.description)!=null&&d.trim()))return e.json({error:"description is required"},400);if(!((u=n.instructions)!=null&&u.trim()))return e.json({error:"instructions is required"},400);let r=Fs(n.name);r||(r=`skill_${Date.now()}`);const s=await e.env.DB.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(t.id,`${r}%`).all();s.results&&s.results.length>0&&s.results.map(g=>g.slug).includes(r)&&(r=`${r}_${s.results.length+1}`);const a=JSON.stringify(n.parameters||{}),i=JSON.stringify(n.required_tools||[]),o=JSON.stringify(n.examples||[]),l=await e.env.DB.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,n.name.trim(),r,n.description.trim(),n.instructions.trim(),a,i,o).first();return e.json({skill:l,created:!0})});ot.get("/:id",Ht,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(isNaN(n))return e.json({error:"Invalid skill ID"},400);const r=await e.env.DB.prepare("SELECT * FROM user_skills WHERE id = ? AND user_id = ?").bind(n,t.id).first();return r?e.json({skill:r}):e.json({error:"Skill not found"},404)});ot.put("/:id",Ht,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(isNaN(n))return e.json({error:"Invalid skill ID"},400);const r=await e.req.json(),s=[],a=[];return r.name!==void 0&&(s.push("name = ?","slug = ?"),a.push(r.name.trim(),Fs(r.name))),r.description!==void 0&&(s.push("description = ?"),a.push(r.description.trim())),r.instructions!==void 0&&(s.push("instructions = ?"),a.push(r.instructions.trim())),r.parameters!==void 0&&(s.push("parameters = ?"),a.push(JSON.stringify(r.parameters))),r.required_tools!==void 0&&(s.push("required_tools = ?"),a.push(JSON.stringify(r.required_tools))),r.examples!==void 0&&(s.push("examples = ?"),a.push(JSON.stringify(r.examples))),r.enabled!==void 0&&(s.push("enabled = ?"),a.push(r.enabled?1:0)),r.promote&&s.push("is_auto = 0","source = 'user'"),s.length===0?e.json({error:"Nothing to update"},400):(s.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),await e.env.DB.prepare(`UPDATE user_skills SET ${s.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});ot.delete("/:id",Ht,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return isNaN(n)?e.json({error:"Invalid skill ID"},400):(await e.env.DB.prepare("DELETE FROM user_skills WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0}))});const Ye=new be;async function jo(e,t){var s;const n=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",n),await t()}Ye.use("/*",jo);function Uo(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}function Ws(e){const t=Uo(e),n=new Date(t);n.setDate(n.getDate()+1),n.setHours(9,0,0,0);const r=new Date(n.toLocaleString("en-US",{timeZone:"UTC"})),s=new Date(n.toLocaleString("en-US",{timeZone:e})),a=r.getTime()-s.getTime();return new Date(n.getTime()+a)}function rn(e){if(!e)return null;if(e.startsWith("cron:")){const t=parseInt(e.replace("cron:",""),10);return isNaN(t)?null:t}return null}Ye.put("/:id/done",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),r=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!r)return e.json({error:"Notification not found"},404);const s=rn(r.source);return s&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0,cron_completed:s!==null})});Ye.post("/:id/snooze",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),r=await e.req.json(),s=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Notification not found"},404);let a;if(typeof r.minutes=="number")a=new Date(Date.now()+r.minutes*60*1e3);else if(r.until==="tomorrow_morning")a=Ws(t.timezone||"UTC");else if(r.new_time)a=new Date(r.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(a.getTime()))return e.json({error:"Invalid time"},400);const i=a.toISOString(),o=rn(s.source);o&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(o,t.id).run();const l=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,s.title,s.body,"once",i,"reminder",JSON.stringify({description:s.body||""}),i,1,"active").first();return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0,job_id:l==null?void 0:l.id})});Ye.post("/:id/reschedule",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{new_time:r}=await e.req.json();if(!r)return e.json({error:"new_time is required"},400);const s=new Date(r);if(isNaN(s.getTime()))return e.json({error:"Invalid time"},400);const a=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!a)return e.json({error:"Notification not found"},404);const i=s.toISOString(),o=rn(a.source);if(o)return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,o,t.id).run(),e.json({success:!0,job_id:o});const l=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,a.title,a.body,"once",i,"reminder",JSON.stringify({description:a.body||""}),i,1,"active").first();return e.json({success:!0,job_id:l==null?void 0:l.id})});Ye.delete("/:id/cancel",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),r=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!r)return e.json({error:"Notification not found"},404);const s=rn(r.source);return s&&await e.env.DB.prepare("UPDATE cron_jobs SET enabled = 0, state = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});Ye.post("/reminders/:id/snooze",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),r=await e.req.json();if(!await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first())return e.json({error:"Reminder not found"},404);let a;if(typeof r.minutes=="number")a=new Date(Date.now()+r.minutes*60*1e3);else if(r.until_tomorrow_9am)a=Ws(t.timezone||"UTC");else if(r.new_time)a=new Date(r.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(a.getTime()))return e.json({error:"Invalid time"},400);const i=a.toISOString();return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,n,t.id).run(),e.json({success:!0})});Ye.post("/reminders/:id/done",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first()?(await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE source = ? AND user_id = ?").bind(`cron:${n}`,t.id).run(),e.json({success:!0})):e.json({error:"Reminder not found"},404)});const Re=new be;function Ho(e){return e.split(`
`).filter(t=>!/^(system:|assistant:|ignore previous|follow these instructions|tool:)/i.test(t.trim())).join(`
`).slice(0,4e3)}async function Fo(e,t){var s;const n=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",n),await t()}Re.use("/*",Fo);Re.get("/",async e=>{const t=e.get("user"),n=e.req.query("status"),r=e.req.query("search"),s=["user_id = ?"],a=[t.id];n&&(s.push("status = ?"),a.push(n)),r&&(s.push("(name LIKE ? OR summary LIKE ?)"),a.push(`%${r}%`,`%${r}%`));const i=`SELECT * FROM document_library WHERE ${s.join(" AND ")} ORDER BY created_at DESC`,o=await e.env.DB.prepare(i).bind(...a).all();return e.json({documents:o.results||[]})});Re.get("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),r=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return r?e.json({document:r}):e.json({error:"Document not found"},404)});Re.post("/upload",async e=>{const t=e.get("user"),n=!!e.env.DOCUMENTS_BUCKET,r=n?100*1024*1024:700*1024;try{const a=(await e.req.formData()).get("file");if(!a)return e.json({error:"No file provided."},400);const i=a.name,o=a.type||"application/octet-stream",l=a.size;if(l>r)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead.`},400);const c=await a.arrayBuffer(),d=crypto.randomUUID();let u;n?(await e.env.DOCUMENTS_BUCKET.put(d,c,{httpMetadata:{contentType:o},customMetadata:{fileName:i,userId:String(t.id)}}),u="r2"):u=Buffer.from(c).toString("base64"),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(d,t.id,i,o,u,l).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,d,"upload",i,o,l,"uploaded").run();const p=o==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||i.toLowerCase().endsWith(".docx");if(p)try{const{extractDocxTextFromBuffer:f}=await Promise.resolve().then(()=>os),b=await f(Buffer.from(c));if(b.length>50){await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(b,d).run();const w=b.substring(0,600);await e.env.DB.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(w,b.substring(0,5e4),d,t.id).run();const T=e.env,S=t.id,R=b,O=d,M=(async()=>{try{const L=await T.DB.prepare("SELECT id FROM document_library WHERE file_id = ? AND user_id = ?").bind(O,S).first();if(L){const{indexDocumentChunks:U}=await Promise.resolve().then(()=>qe);await U({DB:T.DB,AI:T.AI,VECTORIZE:T.VECTORIZE},S,L.id,R)}}catch{}})();try{e.executionCtx.waitUntil(M)}catch{}}}catch{}const g=o==="application/pdf"||i.toLowerCase().endsWith(".pdf");if(g&&t.pin_hash){const f=Buffer.from(c).toString("base64"),b=t.pin_hash,w=t.id,T=e.env.DB,S=e.env.DOCUMENTS_BUCKET,R=e.env,O=(async()=>{var M,L;try{let U=null,Y="claude-haiku-4-5-20251001";const{decrypt:ee}=await Promise.resolve().then(()=>Qt);for(const q of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const re=await T.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(w,q).first();if(re){const oe=await ee(re.encrypted_value,b),W=JSON.parse(oe);if(W.provider==="anthropic"){U=W.apiKey,W.model&&(Y=W.model);break}}}catch{}if(!U)return;let se=f;if(u==="r2"&&S){const q=await S.get(d);if(!q)return;se=Buffer.from(await q.arrayBuffer()).toString("base64")}const A=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":U,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:Y,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:se}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!A.ok)return;const X=((L=(M=(await A.json()).content)==null?void 0:M[0])==null?void 0:L.text)||"";if(X){await T.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(X,d).run();const q=X.substring(0,600);await T.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(q,X.substring(0,5e4),d,w).run();try{const re=await T.prepare("SELECT id FROM document_library WHERE file_id = ? AND user_id = ?").bind(d,w).first();if(re){const{indexDocumentChunks:oe}=await Promise.resolve().then(()=>qe);await oe({DB:T,AI:R.AI,VECTORIZE:R.VECTORIZE},w,re.id,X)}}catch{}}}catch{}})();try{e.executionCtx.waitUntil(O)}catch{}}return e.json({file_id:d,name:i,type:o,size:l,storage:n?"r2":"d1",extracting:g&&!p})}catch(s){return console.error("Document upload error:",s),e.json({error:`Upload failed: ${s.message||"Unknown error"}`},500)}});Re.post("/search",async e=>{const t=e.get("user"),n=await e.req.json();if(!n.query)return e.json({error:"query is required"},400);const{semanticDocumentSearch:r}=await Promise.resolve().then(()=>qe),s=await r({DB:e.env.DB,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE},t.id,n.query,Math.min(n.limit||5,20));return e.json({results:s})});Re.post("/chat",async e=>{var o;const t=e.get("user"),n=await e.req.json(),r=(n.question||n.query||"").trim();if(!r)return e.json({error:"question is required"},400);const{semanticDocumentSearch:s}=await Promise.resolve().then(()=>qe),a=await s({DB:e.env.DB,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE},t.id,r,6);let i;if(a.length===0)i="No relevant document content found for your question. Make sure your documents have been uploaded and processed first.";else{const l=a.map((c,d)=>`[Source ${d+1}: ${c.filename} | chunk ${c.chunk_index}]
${Ho(c.chunk)}`).join(`

---

`);try{const{provider:c}=await Ke(e.env.DB,t.id,t.pin_hash);i=((o=(await c.chat([{role:"system",content:"Answer using only the provided excerpts. For every key statement, cite sources as [S1], [S2], etc. Do not fabricate citations."},{role:"user",content:`Document excerpts:

${l}

Question: ${r}`}],{maxTokens:1024})).content)==null?void 0:o.trim())||"Could not generate an answer."}catch{i="Unable to generate an answer at this time. Please try again."}}return e.json({answer:i,session_id:n.session_id||crypto.randomUUID(),sources:a.map((l,c)=>({source_id:`S${c+1}`,filename:l.filename,chunk_index:l.chunk_index,relevance_score:l.relevance_score,retrieval_method:l.retrieval_method}))})});Re.post("/",async e=>{const t=e.get("user"),n=await e.req.json();if(!n.name||typeof n.name!="string")return e.json({error:"name is required"},400);const r=n.source||"upload",s=n.mime_type||"application/octet-stream",a=typeof n.size=="number"?n.size:0,i=await e.env.DB.prepare(`INSERT INTO document_library (user_id, name, source, file_id, drive_file_id, mime_type, size, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,n.name,r,n.file_id||null,n.drive_file_id||null,s,a,"uploaded").first();return e.json({success:!0,document:i})});Re.post("/:id/summarize",async e=>{var c;const t=e.get("user"),n=parseInt(e.req.param("id")),r=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!r)return e.json({error:"Document not found"},404);let s=null;if(r.file_id){const d=await e.env.DB.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(r.file_id,t.id).first();s=(d==null?void 0:d.extracted_text)||null}let a=null;if(s)try{const{provider:d}=await Ke(e.env.DB,t.id,t.pin_hash);a=((c=(await d.chat([{role:"system",content:"You are a helpful assistant that summarizes documents concisely."},{role:"user",content:`Summarize the following document in a few paragraphs:

${s.substring(0,8e3)}`}],{maxTokens:1024})).content)==null?void 0:c.trim())||null}catch{a=null}const i=a||"Summary not yet generated. Ask Karna in chat to summarize this document.";await e.env.DB.prepare("UPDATE document_library SET status = ?, summary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("summarized",i,n,t.id).run();const l=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return e.json({success:!0,document:l})});Re.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});Re.post("/:id/parse",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));await e.env.DB.prepare("UPDATE document_library SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("parsed",n,t.id).run();const r=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return e.json({success:!0,document:r})});const _e=new be;async function Wo(e,t){var s;const n=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!r)return e.json({error:"Invalid session"},401);e.set("user",{id:r.user_id,username:r.username,name:r.name,pin_hash:r.pin_hash,role:r.role,personality_prompt:r.personality_prompt,telegram_chat_id:r.telegram_chat_id,timezone:r.timezone,assistant_name:r.assistant_name||"Karna",created_at:r.created_at,updated_at:r.updated_at}),e.set("sessionId",n),await t()}_e.use("/*",Wo);_e.get("/review",async e=>{const t=e.get("user"),n=e.req.query("tier"),r=e.req.query("type"),s=e.req.query("search"),a=parseInt(e.req.query("limit")||"50");let i="SELECT * FROM memory WHERE user_id = ?";const o=[t.id];n&&(i+=" AND tier = ?",o.push(n)),r&&(i+=" AND type = ?",o.push(r)),s&&(i+=" AND (title LIKE ? OR content LIKE ?)",o.push(`%${s}%`,`%${s}%`)),i+=" ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?",o.push(a);const l=await e.env.DB.prepare(i).bind(...o).all(),c=await e.env.DB.prepare("SELECT tier, COUNT(*) as cnt FROM memory WHERE user_id = ? GROUP BY tier").bind(t.id).all(),d={working:0,long_term:0};for(const u of c.results||[])d[u.tier]=u.cnt;return e.json({memories:l.results||[],tier_counts:d})});_e.put("/review/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),r=await e.req.json(),s=[],a=[];return r.title!==void 0&&(s.push("title = ?"),a.push(r.title)),r.content!==void 0&&(s.push("content = ?"),a.push(r.content)),r.importance!==void 0&&(s.push("importance = ?"),a.push(r.importance)),r.tier!==void 0&&(s.push("tier = ?"),a.push(r.tier)),s.length===0?e.json({error:"Nothing to update"},400):(s.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),await e.env.DB.prepare(`UPDATE memory SET ${s.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});_e.post("/review/:id/promote",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new te(e.env.DB).promote(n,t.id),e.json({success:!0})});_e.post("/review/:id/demote",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new te(e.env.DB).demote(n,t.id),e.json({success:!0})});_e.delete("/review/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new te(e.env.DB).remove(n,t.id),e.json({success:!0})});_e.get("/suggestions",async e=>{const t=e.get("user"),n=e.req.query("status")||"pending",r=parseInt(e.req.query("limit")||"50"),s=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT ?").bind(t.id,n,r).all();return e.json({suggestions:s.results||[]})});_e.post("/suggestions/:id/accept",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),r=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(n,t.id).first();return r?(await new te(e.env.DB).store(t.id,r.type,r.title,r.content,r.importance,"long_term"),await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'accepted', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});_e.post("/suggestions/:id/reject",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT id FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(n,t.id).first()?(await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'rejected', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});_e.post("/suggestions",async e=>{const t=e.get("user"),{type:n,title:r,content:s,importance:a,source_message_id:i}=await e.req.json();if(!n||!r||!s)return e.json({error:"type, title, and content are required"},400);const o=await e.env.DB.prepare("INSERT INTO memory_suggestions (user_id, type, title, content, importance, status, source_message_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id").bind(t.id,n,r,s,a??5,"pending",i||null).first();return e.json({success:!0,id:o==null?void 0:o.id})});_e.post("/migrate-documents-out",async e=>{const t=e.get("user"),r=(await e.env.DB.prepare(`
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
  `).bind(t.id).all()).results||[];if(r.length===0)return e.json({migrated:0,skipped:0,samples:[],message:"No oversized memory entries found."});let s=0,a=0;const i=[];for(const o of r){if(["preference","fact","context","decision"].includes(o.type)){a++;continue}const l=o.content.length>1500,c=/\b(essay|article|draft|report|chapter)\b/i.test(o.content)&&o.content.length>500;if(!l&&!c){a++;continue}try{const d=o.content.substring(0,500),u=o.content.substring(0,5e4);await e.env.DB.prepare(`
        INSERT INTO document_library (user_id, source, name, summary, extracted_text, status)
        VALUES (?, 'memory_migration', ?, ?, ?, 'parsed')
      `).bind(t.id,o.title,d,u).run();const p=`[Migrated to Document Library] ${o.title} — content moved to Document Library. Search for it with search_library("${o.title.substring(0,40)}").`;await e.env.DB.prepare("UPDATE memory SET content = ?, importance = 4, tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(p,o.id,t.id).run(),s++,i.length<5&&i.push({id:o.id,title:o.title,action:"migrated to document_library, memory demoted to pointer"})}catch{a++}}return e.json({migrated:s,skipped:a,samples:i,message:`Moved ${s} bulky memory entries to Document Library. ${a} entries were skipped (too short or migration error).`})});const fe=new be,qo=["/api/auth","/api/chat","/api/settings","/api/telegram","/api/system","/api/proactive","/api/skills","/api/notifications","/api/documents","/api/memory"];async function Go(e){const t=e.env.RENDER_BACKEND_URL,n=e.env.RENDER_API_SECRET;if(!(e.env.ENABLE_RENDER_PROXY==="true")||!t||!n||e.req.header("x-via-render-worker")||!qo.some(f=>e.req.path.startsWith(f)))return null;const a=new URL(e.req.url);a.protocol=new URL(t).protocol,a.host=new URL(t).host;const i=new Headers(e.req.header());i.set("x-render-api-secret",n);const o=e.req.path.startsWith("/api/chat")||e.req.path.startsWith("/api/telegram"),l=Number(e.env.RENDER_PROXY_TIMEOUT_MS_LONG||"310000"),c=Number(e.env.RENDER_PROXY_TIMEOUT_MS||"8000"),d=o?l:c,u=new AbortController,p=setTimeout(()=>u.abort("render-proxy-timeout"),d);let g;try{g=await fetch(a.toString(),{method:e.req.method,headers:i,body:e.req.method==="GET"||e.req.method==="HEAD"?void 0:await e.req.arrayBuffer(),signal:u.signal})}catch(f){return e.json({error:"Render backend unavailable",detail:String(f)},503)}finally{clearTimeout(p)}return new Response(g.body,{status:g.status,headers:g.headers})}fe.use("/api/*",Oa());fe.use("/api/*",async(e,t)=>{const n=await Go(e);if(n)return n;await t()});fe.route("/api/auth",ze);fe.route("/api/chat",ce);fe.route("/api/settings",ie);fe.route("/api/system",De);fe.route("/api/telegram",Ut);fe.route("/api/proactive",he);fe.route("/api/skills",ot);fe.route("/api/notifications",Ye);fe.route("/api/documents",Re);fe.route("/api/memory",_e);fe.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),n=t.searchParams.get("code"),r=t.searchParams.get("state"),s=t.searchParams.get("error");if(s)return e.html(ut(!1,`Google denied access: ${s}`));if(!n||!r)return e.html(ut(!1,"Missing authorization code or state parameter."));try{const i=JSON.parse(atob(r)).sessionId;if(!i)return e.html(ut(!1,"Invalid state parameter — missing session."));const o=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(i).first();if(!o)return e.html(ut(!1,"Session expired. Please log in again and retry."));const l=o.user_id,c=o.pin_hash,d=`${t.protocol}//${t.host}/auth/google/callback`,u=await Ur(e.env.DB,l,c,n,d,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(ut(!0,`Connected as ${u.email}`,u.email))}catch(a){return e.html(ut(!1,`OAuth failed: ${a.message}`))}});fe.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(Dr(e.env.API_BASE_URL||""))));fe.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(Dr(e.env.API_BASE_URL||""))));function ut(e,t,n){return`<!DOCTYPE html>
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
</body></html>`}async function zo(e,t,n){const r="https://karna-5xs.pages.dev",a={"Content-Type":"application/json","X-Cron-Secret":t.CRON_SECRET||"karna-cron-default-v1"};try{const o=await(await fetch(`${r}/api/system/cron/execute`,{method:"POST",headers:a})).json();if(o.results&&o.results.length>0){const c=o.results.filter(u=>u.needs_agent&&u.status==="dispatched");if(c.length>0){const u=c.map(p=>fetch(`${r}/api/system/cron/run-task/${p.job_id}`,{method:"POST",headers:a}).then(g=>g.json()).catch(g=>({job_id:p.job_id,error:g.message})));n.waitUntil(Promise.allSettled(u).then(p=>{console.log(`Cron: ${o.executed} dispatched, ${c.length} agent tasks`,JSON.stringify(p.map(g=>g.status==="fulfilled"?g.value:g.reason)))}))}const d=o.results.filter(u=>!u.needs_agent&&u.status==="dispatched");if(d.length>0){const u=d.map(p=>fetch(`${r}/api/system/cron/run-task/${p.job_id}`,{method:"POST",headers:a}).catch(()=>{}));n.waitUntil(Promise.allSettled(u))}}n.waitUntil(fetch(`${r}/api/proactive/cron/evening-briefing`,{method:"POST",headers:a}).then(c=>c.json()).then(c=>{c.executed>0&&console.log("Evening briefing result:",JSON.stringify(c))}).catch(c=>{console.error("Evening briefing error:",c.message)})),new Date().getMinutes()%5<2&&n.waitUntil(fetch(`${r}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:a}).then(c=>c.json()).then(c=>{var d;(d=c.results)!=null&&d.some(u=>u.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(c))}).catch(()=>{})),n.waitUntil(fetch(`${r}/api/system/cron/check-browser-tasks`,{method:"POST",headers:a}).catch(()=>{}))}catch(i){console.error("Scheduled cron error:",i.message||i)}}const Ko={fetch:fe.fetch,scheduled:zo},ar=new be,Yo=Object.assign({"/src/index.tsx":Ko});let qs=!1;for(const[,e]of Object.entries(Yo))e&&(ar.all("*",t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),ar.notFound(t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),qs=!0);if(!qs)throw new Error("Can't import modules from ['/src/index.tsx']");function Gs(e){if(e.length<100)return e.trim()?[e.trim()]:[];const s=[];let a=0;for(;a<e.length;){let i=Math.min(a+1800,e.length);if(i<e.length){const l=e.lastIndexOf(`

`,i);if(l>a+1800/2)i=l+2;else{const c=e.lastIndexOf(". ",i);c>a+1800/2&&(i=c+2)}}const o=e.slice(a,i).trim();o.length>=100&&s.push(o),a=i-200,a<=0&&(a=i)}return s}async function Jo(e,t,n,r){if(!e.AI||!e.VECTORIZE)return;const s=Gs(r);if(s.length===0)return;const a=await e.DB.prepare("SELECT vector_id FROM document_chunks WHERE document_id = ?").bind(n).all();a.results.length>0&&(await e.VECTORIZE.deleteByIds(a.results.map(d=>d.vector_id)),await e.DB.prepare("DELETE FROM document_chunks WHERE document_id = ?").bind(n).run());const o=(await e.AI.run("@cf/baai/bge-large-en-v1.5",{text:s})).data,l=s.map((d,u)=>`doc_${n}_${u}`);await e.VECTORIZE.insert(s.map((d,u)=>({id:l[u],values:o[u],metadata:{userId:String(t),documentId:String(n)}})));const c=e.DB.prepare("INSERT INTO document_chunks (user_id, document_id, chunk_index, text, vector_id) VALUES (?, ?, ?, ?, ?)");await e.DB.batch(s.map((d,u)=>c.bind(t,n,u,d,l[u])))}async function Vo(e,t,n,r=5){if(!e.AI||!e.VECTORIZE)return[];const a=(await e.AI.run("@cf/baai/bge-large-en-v1.5",{text:[n]})).data[0],i=await e.VECTORIZE.query(a,{topK:r*3,filter:{userId:String(t)}});if(!i.matches||i.matches.length===0)return[];const o=i.matches.map(b=>b.id),l=new Map(i.matches.map(b=>[b.id,b.score])),c=o.map(()=>"?").join(","),u=((await e.DB.prepare(`SELECT dc.text, dc.vector_id, dc.document_id, dl.name, dc.chunk_index
     FROM document_chunks dc
     JOIN document_library dl ON dc.document_id = dl.id
     WHERE dc.vector_id IN (${c}) AND dc.user_id = ?`).bind(...o,t).all()).results||[]).map(b=>({filename:b.name,relevance_score:l.get(b.vector_id)??0,chunk:b.text,document_id:b.document_id,chunk_index:b.chunk_index,retrieval_method:"vector"})),g=((await e.DB.prepare(`SELECT dc.text, dc.document_id, dc.chunk_index, dl.name
     FROM document_chunks dc
     JOIN document_library dl ON dc.document_id = dl.id
     WHERE dc.user_id = ? AND dc.text LIKE ?
     ORDER BY dc.chunk_index DESC
     LIMIT ?`).bind(t,`%${n.substring(0,80)}%`,r*2).all()).results||[]).map(b=>({filename:b.name,relevance_score:.55,chunk:b.text,document_id:b.document_id,chunk_index:b.chunk_index,retrieval_method:"keyword"})),f=new Map;for(const b of[...u,...g]){const w=`${b.document_id}:${b.chunk_index}`;if(!f.has(w))f.set(w,b);else{const T=f.get(w);f.set(w,{...T,relevance_score:Math.max(T.relevance_score,b.relevance_score),retrieval_method:"hybrid"})}}return[...f.values()].sort((b,w)=>w.relevance_score-b.relevance_score).slice(0,r)}const qe=Object.freeze(Object.defineProperty({__proto__:null,chunkText:Gs,indexDocumentChunks:Jo,semanticDocumentSearch:Vo},Symbol.toStringTag,{value:"Module"}));export{ar as default};
