var ra=Object.defineProperty;var Kn=e=>{throw TypeError(e)};var aa=(e,t,n)=>t in e?ra(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var j=(e,t,n)=>aa(e,typeof t!="symbol"?t+"":t,n),dn=(e,t,n)=>t.has(e)||Kn("Cannot "+n);var k=(e,t,n)=>(dn(e,t,"read from private field"),n?n.call(e):t.get(e)),V=(e,t,n)=>t.has(e)?Kn("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),F=(e,t,n,s)=>(dn(e,t,"write to private field"),s?s.call(e,n):t.set(e,n),n),ee=(e,t,n)=>(dn(e,t,"access private method"),n);var Yn=(e,t,n,s)=>({set _(r){F(e,t,r,n)},get _(){return k(e,t,s)}});var Jn=(e,t,n)=>(s,r)=>{let a=-1;return i(0);async function i(o){if(o<=a)throw new Error("next() called multiple times");a=o;let l,c=!1,d;if(e[o]?(d=e[o][0][0],s.req.routeIndex=o):d=o===e.length&&r||void 0,d)try{l=await d(s,()=>i(o+1))}catch(u){if(u instanceof Error&&t)s.error=u,l=await t(u,s),c=!0;else throw u}else s.finalized===!1&&n&&(l=await n(s));return l&&(s.finalized===!1||c)&&(s.res=l),s}},ia=Symbol(),oa=async(e,t=Object.create(null))=>{const{all:n=!1,dot:s=!1}=t,a=(e instanceof Cs?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?la(e,{all:n,dot:s}):{}};async function la(e,t){const n=await e.formData();return n?ca(n,t):{}}function ca(e,t){const n=Object.create(null);return e.forEach((s,r)=>{t.all||r.endsWith("[]")?da(n,r,s):n[r]=s}),t.dot&&Object.entries(n).forEach(([s,r])=>{s.includes(".")&&(ua(n,s,r),delete n[s])}),n}var da=(e,t,n)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]:t.endsWith("[]")?e[t]=[n]:e[t]=n},ua=(e,t,n)=>{let s=e;const r=t.split(".");r.forEach((a,i)=>{i===r.length-1?s[a]=n:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},Rs=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},ma=e=>{const{groups:t,path:n}=pa(e),s=Rs(n);return ha(s,t)},pa=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(n,s)=>{const r=`@${s}`;return t.push([r,n]),r}),{groups:t,path:e}},ha=(e,t)=>{for(let n=t.length-1;n>=0;n--){const[s]=t[n];for(let r=e.length-1;r>=0;r--)if(e[r].includes(s)){e[r]=e[r].replace(s,t[n][1]);break}}return e},Kt={},ga=(e,t)=>{if(e==="*")return"*";const n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const s=`${e}#${t}`;return Kt[s]||(n[2]?Kt[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,n[1],new RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],new RegExp(`^${n[2]}$`)]:Kt[s]=[e,n[1],!0]),Kt[s]}return null},Dn=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return t(n)}catch{return n}})}},fa=e=>Dn(e,decodeURI),Ds=e=>{const t=e.url,n=t.indexOf("/",t.indexOf(":")+4);let s=n;for(;s<t.length;s++){const r=t.charCodeAt(s);if(r===37){const a=t.indexOf("?",s),i=t.indexOf("#",s),o=a===-1?i===-1?void 0:i:i===-1?a:Math.min(a,i),l=t.slice(n,o);return fa(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(r===63||r===35)break}return t.slice(n,s)},ya=e=>{const t=Ds(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},gt=(e,t,...n)=>(n.length&&(t=gt(t,...n)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Ns=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),n=[];let s="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))s+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){n.length===0&&s===""?n.push("/"):n.push(s);const a=r.replace("?","");s+="/"+a,n.push(s)}else s+="/"+r}),n.filter((r,a,i)=>i.indexOf(r)===a)},un=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Dn(e,Is):e):e,Os=(e,t,n)=>{let s;if(!n&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const o=e.charCodeAt(i+t.length+1);if(o===61){const l=i+t.length+2,c=e.indexOf("&",l);return un(e.slice(l,c===-1?void 0:c))}else if(o==38||isNaN(o))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const r={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let o=e.indexOf("=",a);o>i&&i!==-1&&(o=-1);let l=e.slice(a+1,o===-1?i===-1?void 0:i:o);if(s&&(l=un(l)),a=i,l==="")continue;let c;o===-1?c="":(c=e.slice(o+1,i===-1?void 0:i),s&&(c=un(c))),n?(r[l]&&Array.isArray(r[l])||(r[l]=[]),r[l].push(c)):r[l]??(r[l]=c)}return t?r[t]:r},va=Os,wa=(e,t)=>Os(e,t,!0),Is=decodeURIComponent,Vn=e=>Dn(e,Is),wt,Ee,je,As,Ls,wn,He,_s,Cs=(_s=class{constructor(e,t="/",n=[[]]){V(this,je);j(this,"raw");V(this,wt);V(this,Ee);j(this,"routeIndex",0);j(this,"path");j(this,"bodyCache",{});V(this,He,e=>{const{bodyCache:t,raw:n}=this,s=t[e];if(s)return s;const r=Object.keys(t)[0];return r?t[r].then(a=>(r==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=n[e]()});this.raw=e,this.path=t,F(this,Ee,n),F(this,wt,{})}param(e){return e?ee(this,je,As).call(this,e):ee(this,je,Ls).call(this)}query(e){return va(this.url,e)}queries(e){return wa(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((n,s)=>{t[s]=n}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await oa(this,e))}json(){return k(this,He).call(this,"text").then(e=>JSON.parse(e))}text(){return k(this,He).call(this,"text")}arrayBuffer(){return k(this,He).call(this,"arrayBuffer")}blob(){return k(this,He).call(this,"blob")}formData(){return k(this,He).call(this,"formData")}addValidatedData(e,t){k(this,wt)[e]=t}valid(e){return k(this,wt)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[ia](){return k(this,Ee)}get matchedRoutes(){return k(this,Ee)[0].map(([[,e]])=>e)}get routePath(){return k(this,Ee)[0].map(([[,e]])=>e)[this.routeIndex].path}},wt=new WeakMap,Ee=new WeakMap,je=new WeakSet,As=function(e){const t=k(this,Ee)[0][this.routeIndex][1][e],n=ee(this,je,wn).call(this,t);return n&&/\%/.test(n)?Vn(n):n},Ls=function(){const e={},t=Object.keys(k(this,Ee)[0][this.routeIndex][1]);for(const n of t){const s=ee(this,je,wn).call(this,k(this,Ee)[0][this.routeIndex][1][n]);s!==void 0&&(e[n]=/\%/.test(s)?Vn(s):s)}return e},wn=function(e){return k(this,Ee)[1]?k(this,Ee)[1][e]:e},He=new WeakMap,_s),ba={Stringify:1},Ms=async(e,t,n,s,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(r?r[0]+=e:r=[e],Promise.all(a.map(o=>o({phase:t,buffer:r,context:s}))).then(o=>Promise.all(o.filter(Boolean).map(l=>Ms(l,t,!1,s,r))).then(()=>r[0]))):Promise.resolve(e)},_a="text/plain; charset=UTF-8",mn=(e,t)=>({"Content-Type":e,...t}),Pt,jt,Me,bt,$e,be,Ut,_t,Et,st,Ht,Ft,Fe,ft,Es,Ea=(Es=class{constructor(e,t){V(this,Fe);V(this,Pt);V(this,jt);j(this,"env",{});V(this,Me);j(this,"finalized",!1);j(this,"error");V(this,bt);V(this,$e);V(this,be);V(this,Ut);V(this,_t);V(this,Et);V(this,st);V(this,Ht);V(this,Ft);j(this,"render",(...e)=>(k(this,_t)??F(this,_t,t=>this.html(t)),k(this,_t).call(this,...e)));j(this,"setLayout",e=>F(this,Ut,e));j(this,"getLayout",()=>k(this,Ut));j(this,"setRenderer",e=>{F(this,_t,e)});j(this,"header",(e,t,n)=>{this.finalized&&F(this,be,new Response(k(this,be).body,k(this,be)));const s=k(this,be)?k(this,be).headers:k(this,st)??F(this,st,new Headers);t===void 0?s.delete(e):n!=null&&n.append?s.append(e,t):s.set(e,t)});j(this,"status",e=>{F(this,bt,e)});j(this,"set",(e,t)=>{k(this,Me)??F(this,Me,new Map),k(this,Me).set(e,t)});j(this,"get",e=>k(this,Me)?k(this,Me).get(e):void 0);j(this,"newResponse",(...e)=>ee(this,Fe,ft).call(this,...e));j(this,"body",(e,t,n)=>ee(this,Fe,ft).call(this,e,t,n));j(this,"text",(e,t,n)=>!k(this,st)&&!k(this,bt)&&!t&&!n&&!this.finalized?new Response(e):ee(this,Fe,ft).call(this,e,t,mn(_a,n)));j(this,"json",(e,t,n)=>ee(this,Fe,ft).call(this,JSON.stringify(e),t,mn("application/json",n)));j(this,"html",(e,t,n)=>{const s=r=>ee(this,Fe,ft).call(this,r,t,mn("text/html; charset=UTF-8",n));return typeof e=="object"?Ms(e,ba.Stringify,!1,{}).then(s):s(e)});j(this,"redirect",(e,t)=>{const n=String(e);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)});j(this,"notFound",()=>(k(this,Et)??F(this,Et,()=>new Response),k(this,Et).call(this,this)));F(this,Pt,e),t&&(F(this,$e,t.executionCtx),this.env=t.env,F(this,Et,t.notFoundHandler),F(this,Ft,t.path),F(this,Ht,t.matchResult))}get req(){return k(this,jt)??F(this,jt,new Cs(k(this,Pt),k(this,Ft),k(this,Ht))),k(this,jt)}get event(){if(k(this,$e)&&"respondWith"in k(this,$e))return k(this,$e);throw Error("This context has no FetchEvent")}get executionCtx(){if(k(this,$e))return k(this,$e);throw Error("This context has no ExecutionContext")}get res(){return k(this,be)||F(this,be,new Response(null,{headers:k(this,st)??F(this,st,new Headers)}))}set res(e){if(k(this,be)&&e){e=new Response(e.body,e);for(const[t,n]of k(this,be).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=k(this,be).headers.getSetCookie();e.headers.delete("set-cookie");for(const r of s)e.headers.append("set-cookie",r)}else e.headers.set(t,n)}F(this,be,e),this.finalized=!0}get var(){return k(this,Me)?Object.fromEntries(k(this,Me)):{}}},Pt=new WeakMap,jt=new WeakMap,Me=new WeakMap,bt=new WeakMap,$e=new WeakMap,be=new WeakMap,Ut=new WeakMap,_t=new WeakMap,Et=new WeakMap,st=new WeakMap,Ht=new WeakMap,Ft=new WeakMap,Fe=new WeakSet,ft=function(e,t,n){const s=k(this,be)?new Headers(k(this,be).headers):k(this,st)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,o]of a)i.toLowerCase()==="set-cookie"?s.append(i,o):s.set(i,o)}if(n)for(const[a,i]of Object.entries(n))if(typeof i=="string")s.set(a,i);else{s.delete(a);for(const o of i)s.append(a,o)}const r=typeof t=="number"?t:(t==null?void 0:t.status)??k(this,bt);return new Response(e,{status:r,headers:s})},Es),de="ALL",Ta="all",Sa=["get","post","put","delete","options","patch"],$s="Can not add a route since the matcher is already built.",Bs=class extends Error{},xa="__COMPOSED_HANDLER",ka=e=>e.text("404 Not Found",404),Zn=(e,t)=>{if("getResponse"in e){const n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text("Internal Server Error",500)},Se,ue,Ps,xe,tt,Vt,Zt,Tt,Ra=(Tt=class{constructor(t={}){V(this,ue);j(this,"get");j(this,"post");j(this,"put");j(this,"delete");j(this,"options");j(this,"patch");j(this,"all");j(this,"on");j(this,"use");j(this,"router");j(this,"getPath");j(this,"_basePath","/");V(this,Se,"/");j(this,"routes",[]);V(this,xe,ka);j(this,"errorHandler",Zn);j(this,"onError",t=>(this.errorHandler=t,this));j(this,"notFound",t=>(F(this,xe,t),this));j(this,"fetch",(t,...n)=>ee(this,ue,Zt).call(this,t,n[1],n[0],t.method));j(this,"request",(t,n,s,r)=>t instanceof Request?this.fetch(n?new Request(t,n):t,s,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${gt("/",t)}`,n),s,r)));j(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(ee(this,ue,Zt).call(this,t.request,t,void 0,t.request.method))})});[...Sa,Ta].forEach(a=>{this[a]=(i,...o)=>(typeof i=="string"?F(this,Se,i):ee(this,ue,tt).call(this,a,k(this,Se),i),o.forEach(l=>{ee(this,ue,tt).call(this,a,k(this,Se),l)}),this)}),this.on=(a,i,...o)=>{for(const l of[i].flat()){F(this,Se,l);for(const c of[a].flat())o.map(d=>{ee(this,ue,tt).call(this,c.toUpperCase(),k(this,Se),d)})}return this},this.use=(a,...i)=>(typeof a=="string"?F(this,Se,a):(F(this,Se,"*"),i.unshift(a)),i.forEach(o=>{ee(this,ue,tt).call(this,de,k(this,Se),o)}),this);const{strict:s,...r}=t;Object.assign(this,r),this.getPath=s??!0?t.getPath??Ds:ya}route(t,n){const s=this.basePath(t);return n.routes.map(r=>{var i;let a;n.errorHandler===Zn?a=r.handler:(a=async(o,l)=>(await Jn([],n.errorHandler)(o,()=>r.handler(o,l))).res,a[xa]=r.handler),ee(i=s,ue,tt).call(i,r.method,r.path,a)}),this}basePath(t){const n=ee(this,ue,Ps).call(this);return n._basePath=gt(this._basePath,t),n}mount(t,n,s){let r,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?r=l=>l:r=s.replaceRequest));const i=a?l=>{const c=a(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};r||(r=(()=>{const l=gt(this._basePath,t),c=l==="/"?0:l.length;return d=>{const u=new URL(d.url);return u.pathname=u.pathname.slice(c)||"/",new Request(u,d)}})());const o=async(l,c)=>{const d=await n(r(l.req.raw),...i(l));if(d)return d;await c()};return ee(this,ue,tt).call(this,de,gt(t,"*"),o),this}},Se=new WeakMap,ue=new WeakSet,Ps=function(){const t=new Tt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,F(t,xe,k(this,xe)),t.routes=this.routes,t},xe=new WeakMap,tt=function(t,n,s){t=t.toUpperCase(),n=gt(this._basePath,n);const r={basePath:this._basePath,path:n,method:t,handler:s};this.router.add(t,n,[s,r]),this.routes.push(r)},Vt=function(t,n){if(t instanceof Error)return this.errorHandler(t,n);throw t},Zt=function(t,n,s,r){if(r==="HEAD")return(async()=>new Response(null,await ee(this,ue,Zt).call(this,t,n,s,"GET")))();const a=this.getPath(t,{env:s}),i=this.router.match(r,a),o=new Ea(t,{path:a,matchResult:i,env:s,executionCtx:n,notFoundHandler:k(this,xe)});if(i[0].length===1){let c;try{c=i[0][0][0][0](o,async()=>{o.res=await k(this,xe).call(this,o)})}catch(d){return ee(this,ue,Vt).call(this,d,o)}return c instanceof Promise?c.then(d=>d||(o.finalized?o.res:k(this,xe).call(this,o))).catch(d=>ee(this,ue,Vt).call(this,d,o)):c??k(this,xe).call(this,o)}const l=Jn(i[0],this.errorHandler,k(this,xe));return(async()=>{try{const c=await l(o);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return ee(this,ue,Vt).call(this,c,o)}})()},Tt),js=[];function Da(e,t){const n=this.buildAllMatchers(),s=((r,a)=>{const i=n[r]||n[de],o=i[2][a];if(o)return o;const l=a.match(i[0]);if(!l)return[[],js];const c=l.indexOf("",1);return[i[1][c],l]});return this.match=s,s(e,t)}var en="[^/]+",It=".*",Ct="(?:|/.*)",yt=Symbol(),Na=new Set(".\\+*[^]$()");function Oa(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===It||e===Ct?1:t===It||t===Ct?-1:e===en?1:t===en?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var rt,at,ke,lt,Ia=(lt=class{constructor(){V(this,rt);V(this,at);V(this,ke,Object.create(null))}insert(t,n,s,r,a){if(t.length===0){if(k(this,rt)!==void 0)throw yt;if(a)return;F(this,rt,n);return}const[i,...o]=t,l=i==="*"?o.length===0?["","",It]:["","",en]:i==="/*"?["","",Ct]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const d=l[1];let u=l[2]||en;if(d&&l[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw yt;if(c=k(this,ke)[u],!c){if(Object.keys(k(this,ke)).some(h=>h!==It&&h!==Ct))throw yt;if(a)return;c=k(this,ke)[u]=new lt,d!==""&&F(c,at,r.varIndex++)}!a&&d!==""&&s.push([d,k(c,at)])}else if(c=k(this,ke)[i],!c){if(Object.keys(k(this,ke)).some(d=>d.length>1&&d!==It&&d!==Ct))throw yt;if(a)return;c=k(this,ke)[i]=new lt}c.insert(o,n,s,r,a)}buildRegExpStr(){const n=Object.keys(k(this,ke)).sort(Oa).map(s=>{const r=k(this,ke)[s];return(typeof k(r,at)=="number"?`(${s})@${k(r,at)}`:Na.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof k(this,rt)=="number"&&n.unshift(`#${k(this,rt)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},rt=new WeakMap,at=new WeakMap,ke=new WeakMap,lt),tn,qt,Ts,Ca=(Ts=class{constructor(){V(this,tn,{varIndex:0});V(this,qt,new Ia)}insert(e,t,n){const s=[],r=[];for(let i=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const c=`@\\${i}`;return r[i]=[c,l],i++,o=!0,c}),!o)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=r.length-1;i>=0;i--){const[o]=r[i];for(let l=a.length-1;l>=0;l--)if(a[l].indexOf(o)!==-1){a[l]=a[l].replace(o,r[i][1]);break}}return k(this,qt).insert(a,t,s,k(this,tn),n),s}buildRegExp(){let e=k(this,qt).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const n=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,a,i)=>a!==void 0?(n[++t]=Number(a),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),n,s]}},tn=new WeakMap,qt=new WeakMap,Ts),Aa=[/^$/,[],Object.create(null)],Xt=Object.create(null);function Us(e){return Xt[e]??(Xt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function La(){Xt=Object.create(null)}function Ma(e){var c;const t=new Ca,n=[];if(e.length===0)return Aa;const s=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,u],[h,f])=>d?1:h?-1:u.length-f.length),r=Object.create(null);for(let d=0,u=-1,h=s.length;d<h;d++){const[f,g,v]=s[d];f?r[g]=[v.map(([b])=>[b,Object.create(null)]),js]:u++;let w;try{w=t.insert(g,u,f)}catch(b){throw b===yt?new Bs(g):b}f||(n[u]=v.map(([b,S])=>{const R=Object.create(null);for(S-=1;S>=0;S--){const[B,N]=w[S];R[B]=N}return[b,R]}))}const[a,i,o]=t.buildRegExp();for(let d=0,u=n.length;d<u;d++)for(let h=0,f=n[d].length;h<f;h++){const g=(c=n[d][h])==null?void 0:c[1];if(!g)continue;const v=Object.keys(g);for(let w=0,b=v.length;w<b;w++)g[v[w]]=o[g[v[w]]]}const l=[];for(const d in i)l[d]=n[i[d]];return[a,l,r]}function ut(e,t){if(e){for(const n of Object.keys(e).sort((s,r)=>r.length-s.length))if(Us(n).test(t))return[...e[n]]}}var qe,Ge,nn,Hs,Ss,$a=(Ss=class{constructor(){V(this,nn);j(this,"name","RegExpRouter");V(this,qe);V(this,Ge);j(this,"match",Da);F(this,qe,{[de]:Object.create(null)}),F(this,Ge,{[de]:Object.create(null)})}add(e,t,n){var o;const s=k(this,qe),r=k(this,Ge);if(!s||!r)throw new Error($s);s[e]||[s,r].forEach(l=>{l[e]=Object.create(null),Object.keys(l[de]).forEach(c=>{l[e][c]=[...l[de][c]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=Us(t);e===de?Object.keys(s).forEach(c=>{var d;(d=s[c])[t]||(d[t]=ut(s[c],t)||ut(s[de],t)||[])}):(o=s[e])[t]||(o[t]=ut(s[e],t)||ut(s[de],t)||[]),Object.keys(s).forEach(c=>{(e===de||e===c)&&Object.keys(s[c]).forEach(d=>{l.test(d)&&s[c][d].push([n,a])})}),Object.keys(r).forEach(c=>{(e===de||e===c)&&Object.keys(r[c]).forEach(d=>l.test(d)&&r[c][d].push([n,a]))});return}const i=Ns(t)||[t];for(let l=0,c=i.length;l<c;l++){const d=i[l];Object.keys(r).forEach(u=>{var h;(e===de||e===u)&&((h=r[u])[d]||(h[d]=[...ut(s[u],d)||ut(s[de],d)||[]]),r[u][d].push([n,a-c+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(k(this,Ge)).concat(Object.keys(k(this,qe))).forEach(t=>{e[t]||(e[t]=ee(this,nn,Hs).call(this,t))}),F(this,qe,F(this,Ge,void 0)),La(),e}},qe=new WeakMap,Ge=new WeakMap,nn=new WeakSet,Hs=function(e){const t=[];let n=e===de;return[k(this,qe),k(this,Ge)].forEach(s=>{const r=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];r.length!==0?(n||(n=!0),t.push(...r)):e!==de&&t.push(...Object.keys(s[de]).map(a=>[a,s[de][a]]))}),n?Ma(t):null},Ss),We,Be,xs,Ba=(xs=class{constructor(e){j(this,"name","SmartRouter");V(this,We,[]);V(this,Be,[]);F(this,We,e.routers)}add(e,t,n){if(!k(this,Be))throw new Error($s);k(this,Be).push([e,t,n])}match(e,t){if(!k(this,Be))throw new Error("Fatal error");const n=k(this,We),s=k(this,Be),r=n.length;let a=0,i;for(;a<r;a++){const o=n[a];try{for(let l=0,c=s.length;l<c;l++)o.add(...s[l]);i=o.match(e,t)}catch(l){if(l instanceof Bs)continue;throw l}this.match=o.match.bind(o),F(this,We,[o]),F(this,Be,void 0);break}if(a===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(k(this,Be)||k(this,We).length!==1)throw new Error("No active router has been determined yet.");return k(this,We)[0]}},We=new WeakMap,Be=new WeakMap,xs),Dt=Object.create(null),ze,ye,it,St,ge,Pe,nt,xt,Pa=(xt=class{constructor(t,n,s){V(this,Pe);V(this,ze);V(this,ye);V(this,it);V(this,St,0);V(this,ge,Dt);if(F(this,ye,s||Object.create(null)),F(this,ze,[]),t&&n){const r=Object.create(null);r[t]={handler:n,possibleKeys:[],score:0},F(this,ze,[r])}F(this,it,[])}insert(t,n,s){F(this,St,++Yn(this,St)._);let r=this;const a=ma(n),i=[];for(let o=0,l=a.length;o<l;o++){const c=a[o],d=a[o+1],u=ga(c,d),h=Array.isArray(u)?u[0]:c;if(h in k(r,ye)){r=k(r,ye)[h],u&&i.push(u[1]);continue}k(r,ye)[h]=new xt,u&&(k(r,it).push(u),i.push(u[1])),r=k(r,ye)[h]}return k(r,ze).push({[t]:{handler:s,possibleKeys:i.filter((o,l,c)=>c.indexOf(o)===l),score:k(this,St)}}),r}search(t,n){var l;const s=[];F(this,ge,Dt);let a=[this];const i=Rs(n),o=[];for(let c=0,d=i.length;c<d;c++){const u=i[c],h=c===d-1,f=[];for(let g=0,v=a.length;g<v;g++){const w=a[g],b=k(w,ye)[u];b&&(F(b,ge,k(w,ge)),h?(k(b,ye)["*"]&&s.push(...ee(this,Pe,nt).call(this,k(b,ye)["*"],t,k(w,ge))),s.push(...ee(this,Pe,nt).call(this,b,t,k(w,ge)))):f.push(b));for(let S=0,R=k(w,it).length;S<R;S++){const B=k(w,it)[S],N=k(w,ge)===Dt?{}:{...k(w,ge)};if(B==="*"){const $=k(w,ye)["*"];$&&(s.push(...ee(this,Pe,nt).call(this,$,t,k(w,ge))),F($,ge,N),f.push($));continue}const[U,M,G]=B;if(!u&&!(G instanceof RegExp))continue;const W=k(w,ye)[U],ne=i.slice(c).join("/");if(G instanceof RegExp){const $=G.exec(ne);if($){if(N[M]=$[0],s.push(...ee(this,Pe,nt).call(this,W,t,k(w,ge),N)),Object.keys(k(W,ye)).length){F(W,ge,N);const z=((l=$[0].match(/\//))==null?void 0:l.length)??0;(o[z]||(o[z]=[])).push(W)}continue}}(G===!0||G.test(u))&&(N[M]=u,h?(s.push(...ee(this,Pe,nt).call(this,W,t,N,k(w,ge))),k(W,ye)["*"]&&s.push(...ee(this,Pe,nt).call(this,k(W,ye)["*"],t,N,k(w,ge)))):(F(W,ge,N),f.push(W)))}}a=f.concat(o.shift()??[])}return s.length>1&&s.sort((c,d)=>c.score-d.score),[s.map(({handler:c,params:d})=>[c,d])]}},ze=new WeakMap,ye=new WeakMap,it=new WeakMap,St=new WeakMap,ge=new WeakMap,Pe=new WeakSet,nt=function(t,n,s,r){const a=[];for(let i=0,o=k(t,ze).length;i<o;i++){const l=k(t,ze)[i],c=l[n]||l[de],d={};if(c!==void 0&&(c.params=Object.create(null),a.push(c),s!==Dt||r&&r!==Dt))for(let u=0,h=c.possibleKeys.length;u<h;u++){const f=c.possibleKeys[u],g=d[c.score];c.params[f]=r!=null&&r[f]&&!g?r[f]:s[f]??(r==null?void 0:r[f]),d[c.score]=!0}}return a},xt),ot,ks,ja=(ks=class{constructor(){j(this,"name","TrieRouter");V(this,ot);F(this,ot,new Pa)}add(e,t,n){const s=Ns(t);if(s){for(let r=0,a=s.length;r<a;r++)k(this,ot).insert(e,s[r],n);return}k(this,ot).insert(e,t,n)}match(e,t){return k(this,ot).search(e,t)}},ot=new WeakMap,ks),_e=class extends Ra{constructor(e={}){super(e),this.router=e.router??new Ba({routers:[new $a,new ja]})}},Ua=e=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(n.origin),r=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(n.allowMethods);return async function(i,o){var d;function l(u,h){i.res.headers.set(u,h)}const c=await s(i.req.header("origin")||"",i);if(c&&l("Access-Control-Allow-Origin",c),n.credentials&&l("Access-Control-Allow-Credentials","true"),(d=n.exposeHeaders)!=null&&d.length&&l("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),i.req.method==="OPTIONS"){n.origin!=="*"&&l("Vary","Origin"),n.maxAge!=null&&l("Access-Control-Max-Age",n.maxAge.toString());const u=await r(i.req.header("origin")||"",i);u.length&&l("Access-Control-Allow-Methods",u.join(","));let h=n.allowHeaders;if(!(h!=null&&h.length)){const f=i.req.header("Access-Control-Request-Headers");f&&(h=f.split(/\s*,\s*/))}return h!=null&&h.length&&(l("Access-Control-Allow-Headers",h.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&i.header("Vary","Origin",{append:!0})}};function Ha(){return`  // === Karna v3.1 Frontend ===
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
      return text.replace(/[#*_~\\[\\]()]/g, '').trim();
    }
  }
`}function Fa(){return`  // === Render Core ===
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
`}function qa(){return`  // ============================================================
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
`}function Ga(){return`  // ============================================================
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
`}function Wa(){return`  // ============================================================
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
`}function za(){return`  // ============================================================
  // THREAD MANAGEMENT
  // ============================================================

  async function startNewThread() {
    clearActiveThreadId();
    state.view = 'home';
    renderView();
    toggleOverlay(null);
  }

  function openThread(threadId, title) {
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
      var groups = { today: [], yesterday: [], older: [] };
      var telegramThread = null;
      for (var i = 0; i < state.threads.length; i++) {
        var t = state.threads[i];
        if (t.channel === 'telegram') {
          telegramThread = t;
        } else {
          var d = (t.updated_at || t.created_at || '').split('T')[0];
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
      var pinnedClass = pinned ? ' pinned' : '';
      var titleBadge = pinned ? '<span class="thread-pinned-badge">&#128204;</span>' : '';
      if (i > 0) { html += '<div class="row-divider"></div>'; }
      if (state.selectMode) {
        html += '<button class="row thread-item' + (isChecked ? ' active' : '') + '" data-id="' + t.id + '" onclick="toggleThreadSelect(' + t.id + ')" style="cursor:pointer;text-align:left;">';
        html += '<input type="checkbox" ' + (isChecked ? 'checked' : '') + ' onclick="event.stopPropagation();toggleThreadSelect(' + t.id + ')" style="width:18px;height:18px;flex-shrink:0;cursor:pointer;accent-color:var(--terracotta);margin-left:4px;">';
        html += '<span class="icon-well">&#128172;</span>';
        html += '<span class="row-body">';
        html += '<span class="row-top"><span class="row-title">' + escapeHtml(t.title) + titleBadge + '</span><span class="row-time">' + escapeHtml(rel) + '</span></span>';
        if (preview) { html += '<span class="row-preview">' + preview + '</span>'; }
        html += '<span class="row-badge">' + badgeText + '</span>';
        html += '</span>';
        html += '<span class="row-chevron">&#8250;</span>';
        html += '</button>';
      } else {
        html += '<button class="row thread-item' + (isActive ? ' active' : '') + pinnedClass + '" data-id="' + t.id + '" onclick="openThread(' + t.id + ',\\'' + escapeHtml(t.title).replace(/'/g, "\\\\'") + '\\')">';
        html += '<span class="icon-well">&#128172;</span>';
        html += '<span class="row-body">';
        html += '<span class="row-top"><span class="row-title">' + escapeHtml(t.title) + titleBadge + '</span><span class="row-time">' + escapeHtml(rel) + '</span></span>';
        if (preview) { html += '<span class="row-preview">' + preview + '</span>'; }
        html += '<span class="row-badge">' + badgeText + '</span>';
        html += '<span class="thread-item-actions">';
        html += '<button class="thread-action-btn" onclick="event.stopPropagation();archiveThread(' + t.id + ')" title="Archive">&#128230;</button>';
        html += '<button class="thread-action-btn danger" onclick="event.stopPropagation();deleteThread(' + t.id + ')" title="Delete">&#128465;</button>';
        html += '</span>';
        html += '</span>';
        html += '<span class="row-chevron">&#8250;</span>';
        html += '</button>';
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
      html += '<button class="row thread-item" onclick="unarchiveAndOpen(' + t.id + ',\\'' + escapeHtml(t.title).replace(/'/g, "\\\\'") + '\\')">';
      html += '<span class="icon-well">&#128172;</span>';
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
    if (state.activeThreadId === id) { clearActiveThreadId(); state.view = 'home'; renderView(); }
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
    if (id) {
      var overlay = document.getElementById(id);
      if (overlay) overlay.classList.add('active');
      if (id === 'threadsOverlay') loadThreadSidebar();
    }
  }
`}function Ka(){return`  // ============================================================
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
`}function Ya(){return`  // === Memory Review ===
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
`}function Ja(){return`  // === Document Library ===
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
`}function Va(){return`  // ============================================================
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
      removeGoogleBanner();
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
`}function Za(){return`  // ============================================================
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
`}function Xa(){return`  // ============================================================
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
`}function Qa(){return`  // === Init ===
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
    var _baseHeight = window.innerHeight;
    function _adjustAnchor() {
      var vp = window.visualViewport;
      var anchor = document.querySelector('.input-anchor');
      if (anchor) {
        var kbOpen = vp.height < _baseHeight - 100;
        if (kbOpen) {
          // Set paddingBottom first so offsetHeight is accurate
          anchor.style.paddingBottom = '8px';
          // Pin to visual viewport bottom: top = vp.offsetTop + vp.height - anchorHeight
          anchor.style.top = (vp.offsetTop + vp.height - anchor.offsetHeight) + 'px';
          anchor.style.bottom = 'auto';
        } else {
          // Keyboard closed — restore CSS defaults
          anchor.style.top = '';
          anchor.style.bottom = '';
          anchor.style.paddingBottom = '';
        }
      }
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
  // ============================================================`}function ei(){return`  async function renderDocumentsView(container) {
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
`}function ti(){return`  // ============================================================
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
`}function Fs(e=""){return`<!DOCTYPE html>
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
  <link rel="stylesheet" href="/static/karna.css">
</head>
<body>
  <div id="app"></div>
  <div class="toast-container" id="toasts"></div>

  <script>window.__KARNA_API_BASE__ = ${JSON.stringify(e||"")};<\/script>
  <script>
${Ha()}
${Fa()}
${qa()}
${Ga()}
${Wa()}
${za()}
${Ka()}
${Ya()}
${Ja()}
${Va()}
${Za()}
${Xa()}
${Qa()}
${ei()}
${ti()}
  <\/script>
</body>
</html>`}function ni(){return`<!DOCTYPE html>
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
</html>`}const Nn="AES-GCM",si=256;async function qs(e){const t=new TextEncoder,n=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},n,{name:Nn,length:si},!1,["encrypt","decrypt"])}async function kt(e,t){const n=await qs(t),s=crypto.getRandomValues(new Uint8Array(12)),r=new TextEncoder,a=await crypto.subtle.encrypt({name:Nn,iv:s},n,r.encode(e)),i=new Uint8Array(s.length+new Uint8Array(a).length);return i.set(s),i.set(new Uint8Array(a),s.length),btoa(String.fromCharCode(...i))}async function J(e,t){const n=await qs(t),s=new Uint8Array(atob(e).split("").map(o=>o.charCodeAt(0))),r=s.slice(0,12),a=s.slice(12),i=await crypto.subtle.decrypt({name:Nn,iv:r},n,a);return new TextDecoder().decode(i)}async function sn(e){const n=new TextEncoder().encode(e+"karna-pin-salt"),s=await crypto.subtle.digest("SHA-256",n);return btoa(String.fromCharCode(...new Uint8Array(s)))}async function Gs(e,t){return await sn(e)===t}const rn=Object.freeze(Object.defineProperty({__proto__:null,decrypt:J,encrypt:kt,hashPin:sn,verifyPin:Gs},Symbol.toStringTag,{value:"Module"})),Je=new _e;function Ws(e){return{id:e.id,username:e.username,name:e.name,assistant_name:e.assistant_name||"Karna"}}Je.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});Je.post("/setup",async e=>{const{username:t,name:n,pin:s,personality_prompt:r,timezone:a}=await e.req.json();if(!t||!n||!s)return e.json({error:"Username, name, and PIN are required"},400);if(s.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const o=await sn(s);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,n,o,r||"",a||"Asia/Kolkata").run();const l=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),c=crypto.randomUUID(),d=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(c,l.id,"web",d).run(),e.json({success:!0,sessionId:c,user:Ws(l)})});Je.post("/login",async e=>{const{username:t,pin:n}=await e.req.json();if(!t||!n)return e.json({error:"Username and PIN required"},400);const s=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!s)return e.json({error:"User not found"},404);if(!await Gs(n,s.pin_hash))return e.json({error:"Invalid PIN"},401);const a=crypto.randomUUID(),i=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(a,s.id,"web",i).run(),e.json({success:!0,sessionId:a,user:Ws(s)})});Je.post("/logout",async e=>{var n;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});Je.get("/users/hints",async e=>{const n=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(s=>{var r;return{username:s.username,name_hint:s.name.split(" ")[0],created:((r=s.created_at)==null?void 0:r.split(" ")[0])||""}});return e.json({users:n,count:n.length})});Je.post("/reset-pin",async e=>{var o;const{username:t,name:n,new_pin:s}=await e.req.json();if(!t||!n||!s)return e.json({error:"Username, display name, and new PIN are required"},400);if(s.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const r=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!r)return e.json({error:"User not found"},404);if(r.name.toLowerCase().trim()!==n.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const a=await sn(s);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(a,r.id).run();const i=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(r.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(r.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((o=i.meta)==null?void 0:o.changes)||0})});Je.get("/me",async e=>{var s;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.timezone, u.assistant_name
     FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return n?e.json({user:{id:n.uid,username:n.username,name:n.name,timezone:n.timezone,assistant_name:n.assistant_name||"Karna"}}):e.json({error:"Invalid or expired session"},401)});const At={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-6",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-6, claude-haiku-4-5",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4-6",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},Xn=12e4;function zs(e,t){return Promise.race([e,new Promise((n,s)=>setTimeout(()=>s(new Error(`LLM timeout: ${t} did not respond within ${Xn/1e3} seconds. Try again or switch providers in Settings → Keys.`)),Xn))])}async function H(e,t,n,s,r,a={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,n,s,r,JSON.stringify(a)).run()}catch(i){console.error("Failed to log error:",i)}}async function pn(e,t,n,s,r,a){try{const i=`provider_alert:${s}:${n}`;if(await e.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(t,i).first())return;await H(e,t,"provider_alert",i,`${s} failed: ${a.substring(0,200)}`,{alertType:n,failedProvider:s,fallbackProvider:r});let l;n==="all_providers_down"?l=`🚨 All LLM providers failed

Last error from ${s}: ${Qn(a)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:l=`⚠️ LLM Provider Issue

${s}: ${Qn(a)}
Switched to: ${r}

Check your ${s} API credit balance or key.`;const{decrypt:c}=await Promise.resolve().then(()=>rn),d=await e.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(t).first();if(!(d!=null&&d.telegram_chat_id))return;const u=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(t).first();if(!u)return;const h=await c(u.encrypted_value,d.pin_hash);await fetch(`https://api.telegram.org/bot${h}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d.telegram_chat_id,text:l})})}catch(i){console.error("Failed to send provider alert:",i)}}function Qn(e){return e.includes("credit balance")||e.includes("insufficient")||e.includes("402")?"Credits exhausted or balance too low":e.includes("429")||e.includes("rate_limit")||e.includes("quota")?"Rate limit / quota exceeded":e.includes("401")||e.includes("authentication")||e.includes("invalid")&&e.includes("key")?"API key invalid or expired":e.includes("403")?"Access denied (key may lack permissions)":e.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":e.includes("properties field not found")?"Schema compatibility issue":"API error"}class Ks{constructor(t,n="claude-sonnet-4-6",s="https://api.anthropic.com",r="anthropic"){j(this,"name");j(this,"apiKey");j(this,"model");j(this,"apiBase");this.apiKey=t,this.model=n,this.apiBase=s,this.name=r}async chat(t,n){var d,u,h,f;const s=t.find(g=>g.role==="system"),r=t.filter(g=>g.role!=="system"),a={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,messages:r.map(g=>({role:g.role,content:g.content}))};s&&(a.system=s.content),n!=null&&n.tools&&n.tools.length>0&&(a.tools=n.tools.map(g=>({name:g.name,description:g.description,input_schema:g.parameters})),n.toolChoice==="required"&&(a.tool_choice={type:"any"}));const i=await zs(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(a)}),this.name);if(!i.ok){const g=await i.text();throw new Error(this.name+" API error "+i.status+": "+g)}const o=await i.json(),l=((d=o.content)==null?void 0:d.filter(g=>g.type==="text"))||[],c=((u=o.content)==null?void 0:u.filter(g=>g.type==="tool_use"))||[];return{content:l.map(g=>g.text).join(`
`),toolCalls:c.map(g=>({id:g.id,name:g.name,arguments:g.input})),usage:{promptTokens:((h=o.usage)==null?void 0:h.input_tokens)||0,completionTokens:((f=o.usage)==null?void 0:f.output_tokens)||0}}}async streamChat(t,n){const s=t.find(c=>c.role==="system"),r=t.filter(c=>c.role!=="system"),a={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,stream:!0,messages:r.map(c=>({role:c.role,content:c.content}))};s&&(a.system=s.content);const i=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(a)});if(!i.ok){const c=await i.text();throw new Error(this.name+" stream error "+i.status+": "+c)}const o=i.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(c){var g;const{done:d,value:u}=await o.read();if(d){c.close();return}const f=l.decode(u,{stream:!0}).split(`
`);for(const v of f)if(v.startsWith("data: ")){const w=v.slice(6);if(w==="[DONE]")continue;try{const b=JSON.parse(w);b.type==="content_block_delta"&&((g=b.delta)!=null&&g.text)&&c.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:b.delta.text})+`

`))}catch{}}}})}}function ri(e){const t={},n=e||{};if(t.type=n.type||"object",t.type==="object"){const s=n.properties;if(s&&typeof s=="object"&&Object.keys(s).length>0){const r={};for(const[a,i]of Object.entries(s))i&&typeof i=="object"?r[a]=bn(i):r[a]=i;t.properties=r}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(n.required)?t.required=n.required:t.required=[]}return n.description&&(t.description=n.description),t}function bn(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const n=t.properties;if(n&&typeof n=="object"&&Object.keys(n).length>0){const s={};for(const[r,a]of Object.entries(n))a&&typeof a=="object"?s[r]=bn(a):s[r]=a;t.properties=s}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=bn(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class Ys{constructor(t,n,s,r){j(this,"name");j(this,"apiKey");j(this,"model");j(this,"apiBase");this.apiKey=t,this.model=n,this.apiBase=s.replace(/\/+$/,""),this.name=r}async chat(t,n){var l,c,d,u,h,f;const s={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,messages:t.map(g=>({role:g.role,content:g.content}))},r=this.apiBase.includes("routellm.abacus.ai");if(n!=null&&n.tools&&n.tools.length>0&&r)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");n!=null&&n.tools&&n.tools.length>0&&(s.tools=n.tools.map(g=>({type:"function",function:{name:g.name,description:g.description,parameters:ri(g.parameters||{})}})),n.toolChoice==="required"&&(s.tool_choice="required"));const a=await zs(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(s)}),this.name);if(!a.ok){const g=await a.text();throw new Error(this.name+" API error "+a.status+": "+g)}const i=await a.json(),o=(l=i.choices)==null?void 0:l[0];return{content:((c=o==null?void 0:o.message)==null?void 0:c.content)||"",toolCalls:(u=(d=o==null?void 0:o.message)==null?void 0:d.tool_calls)==null?void 0:u.map(g=>({id:g.id,name:g.function.name,arguments:(()=>{try{return typeof g.function.arguments=="string"?JSON.parse(g.function.arguments||"{}"):g.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((h=i.usage)==null?void 0:h.prompt_tokens)||0,completionTokens:((f=i.usage)==null?void 0:f.completion_tokens)||0}}}async streamChat(t,n){const s={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,stream:!0,messages:t.map(o=>({role:o.role,content:o.content}))},r=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(s)});if(!r.ok){const o=await r.text();throw new Error(this.name+" stream error "+r.status+": "+o)}const a=r.body.getReader(),i=new TextDecoder;return new ReadableStream({async pull(o){var h,f,g;const{done:l,value:c}=await a.read();if(l){o.close();return}const u=i.decode(c,{stream:!0}).split(`
`);for(const v of u)if(v.startsWith("data: ")){const w=v.slice(6);if(w==="[DONE]")continue;try{const S=(g=(f=(h=JSON.parse(w).choices)==null?void 0:h[0])==null?void 0:f.delta)==null?void 0:g.content;S&&o.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:S})+`

`))}catch{}}}})}}function _n(e,t,n,s){const r=At[e];if(!r)throw new Error(`Unknown LLM provider: ${e}`);const a=s||r.defaultModel;return r.apiFormat==="anthropic"?new Ks(t,a,r.apiBase,n):new Ys(t,a,r.apiBase,n)}class Js{constructor(){j(this,"errorLog",new Map);j(this,"usageLog",new Map)}async pickProvider(t){const n=Date.now(),s=t.filter(r=>{const a=this.errorLog.get(r);return a?a.cooldownUntil<=n:!0});return s.length>0?s[0]:null}async recordUsage(t,n){const s=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:s.tokens+n,requests:s.requests+1})}async recordError(t,n,s=5){this.errorLog.set(t,{error:n,cooldownUntil:Date.now()+s*60*1e3})}}const ai=["llm_slot_1","llm_slot_2","llm_slot_3"],ii=["anthropic","openai"];async function Ve(e,t,n){const{decrypt:s}=await Promise.resolve().then(()=>rn),r=new Js,a=[];for(const u of ai){const h=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,u).first();if(h)try{const f=await s(h.encrypted_value,n),g=JSON.parse(f);if(g.provider&&g.apiKey&&At[g.provider]){const w=g.provider,b=_n(g.provider,g.apiKey,w,g.model);a.push({name:w,provider:b})}}catch(f){console.error(`Failed to load ${u}:`,f)}}const i=new Set(a.map(u=>u.name));for(const u of ii){if(i.has(u))continue;const h=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,u).first();if(h)try{const f=await s(h.encrypted_value,n);if(At[u]){const v=_n(u,f,u);a.push({name:u,provider:v})}}catch{console.error(`Failed to decrypt legacy ${u} key`)}}if(a.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const o=a.map(u=>u.name),l=await r.pickProvider(o);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:a[0].provider,rotation:r};const c=a.find(u=>u.name===l);return{provider:oi(c.provider,a,r,e,t),rotation:r}}function oi(e,t,n,s,r){const a=o=>o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")||o.includes("TOOLS_UNSUPPORTED"),i=o=>o.includes("429")||o.toLowerCase().includes("rate limit")||o.toLowerCase().includes("too many requests");return t.length<=1?{name:e.name,async chat(o,l){try{return await e.chat(o,l)}catch(c){const d=c.message||"";throw a(d)&&!d.includes("TOOLS_UNSUPPORTED")&&pn(s,r,"all_providers_down",e.name,null,d),c}},async streamChat(o,l){return await e.streamChat(o,l)}}:{name:e.name,async chat(o,l){try{return await e.chat(o,l)}catch(c){const d=c.message||"",u=i(d);if(!a(d)&&!u)throw c;const h=d.includes("TOOLS_UNSUPPORTED"),f=h?1:u?10:1440;console.warn(`Provider ${e.name} ${u?"rate limited":h?"tools unsupported":"auth/billing error"}, trying fallback...`),await n.recordError(e.name,d,f);const g=t.filter(v=>v.name!==e.name);for(const v of g)try{const w=await v.provider.chat(o,l);return this.name=v.name,!h&&!u&&pn(s,r,"provider_switched",e.name,v.name,d),w}catch(w){const b=w.message||"";if(a(b)||i(b)){await n.recordError(v.name,b,i(b)?10:1440);continue}throw w}throw pn(s,r,"all_providers_down",e.name,null,d),new Error(`All LLM providers failed. Primary (${e.name}): ${d.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(o,l){return await e.streamChat(o,l)}}}const vt=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:Ks,OpenAICompatibleProvider:Ys,ProviderRotation:Js,createProviderFromConfig:_n,createRotatingProvider:Ve,logError:H},Symbol.toStringTag,{value:"Module"})),hn=20,li=2e3,ci=2e3,Vs=4,di=1e3;function ui(e){return Math.ceil(e.length/Vs)}function En(e,t){const n=t*Vs;return e.length<=n?e:e.slice(0,n)+`
[...truncated to fit token budget]`}async function On(e,t){try{const s=(await e.prepare(`SELECT title, content FROM notes
       WHERE user_id = ? AND is_pinned = 1
       ORDER BY updated_at DESC LIMIT 10`).bind(t).all()).results||[];if(s.length===0)return"";const r=`## Pinned Notes
`+s.map(a=>`- **${a.title||"Note"}**: ${(a.content||"").slice(0,300)}`).join(`
`);return En(r,di)}catch{return""}}class X{constructor(t){this.db=t}async store(t,n,s,r,a=5,i="working"){const o=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,n,s).first();o?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r,a,i,o.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,n,s,r,a,i).run(),i==="working"&&await this.enforceWorkingMemoryCap(t)}async cleanupDoneTasks(t){await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND type = 'task' AND status = 'done' AND tier = 'working'
       AND updated_at < datetime('now', '-7 days')`).bind(t).run()}async enforceWorkingMemoryCap(t){const n=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((n==null?void 0:n.cnt)||0)>hn){const s=((n==null?void 0:n.cnt)||0)-hn;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND tier = 'working' AND importance < 8 AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' AND importance < 8
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,s).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,hn).all()).results||[]}async getAll(t,n,s=50){return n?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,n,s).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,s).all()).results||[]}async search(t,n,s=10){return this.searchMemoryByTier(t,n,s)}async searchLongTerm(t,n,s=5){return this.searchMemoryByTier(t,n,s,"long_term")}async searchMemoryByTier(t,n,s,r){const a=r?" AND tier = ?":"",i=(f,g)=>r?[t,r,f,f,g]:[t,f,f,g],l=(await this.db.prepare(`SELECT * FROM memory WHERE user_id = ?${a} AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?`).bind(...i(`%${n}%`,s)).all()).results||[];if(l.length>0)return await this.touchMemories(t,l.map(f=>f.id)),l;const c=n.split(/\s+/).filter(f=>f.length>2);if(c.length===0)return[];const d=new Map,u=new Map;for(const f of c){const g=await this.db.prepare(`SELECT * FROM memory WHERE user_id = ?${a} AND (title LIKE ? OR content LIKE ?) LIMIT ?`).bind(...i(`%${f}%`,s*2)).all();for(const v of g.results||[])d.set(v.id,(d.get(v.id)||0)+1),u.set(v.id,v)}const h=[...u.values()].sort((f,g)=>(d.get(g.id)||0)-(d.get(f.id)||0)).slice(0,s);return h.length>0&&await this.touchMemories(t,h.map(f=>f.id)),h}async touchMemories(t,n){for(const s of n)await this.db.prepare("UPDATE memory SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t).run()}async update(t,n,s){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s,t,n).run()}async promote(t,n){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,n).run(),await this.enforceWorkingMemoryCap(n)}async demote(t,n){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,n).run()}async remove(t,n){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,n).run()}async buildContext(t){const n=await this.getWorkingMemory(t);if(n.length===0)return"";const s={};for(const a of n)s[a.type]||(s[a.type]=[]),s[a.type].push(a);let r=`
## Working Memory (Active Context)
`;for(const[a,i]of Object.entries(s)){r+=`
### ${a.charAt(0).toUpperCase()+a.slice(1)}s
`;for(const o of i)r+=`- **${o.title}**: ${o.content}
`}return En(r,li)}static truncatePersonality(t){return En(t,ci)}async getRecentConversations(t,n=20,s){return s?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,s,n).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,n).all()).results||[]).reverse()}async storeMessage(t,n,s,r,a="{}",i){const o=ui(r);i?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,n,s,r,a,o,i).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,n,s,r,a,o).run()}async compactHistory(t,n=30){const s=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((s==null?void 0:s.cnt)||0)<=n*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,n).run()}}const mi=Object.freeze(Object.defineProperty({__proto__:null,MemoryService:X,buildNotesContext:On},Symbol.toStringTag,{value:"Module"})),pi="https://accounts.google.com/o/oauth2/v2/auth",Zs="https://oauth2.googleapis.com/token",hi="https://www.googleapis.com/oauth2/v2/userinfo",gi=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let Ce=null;async function Tn(e,t,n){const s=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!s)return null;try{const r=await J(s.encrypted_value,n);return JSON.parse(r)}catch{return null}}async function fi(e,t,n,s){const r=await kt(JSON.stringify(s),n);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,r).run()}function Xs(e,t,n){const s=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:gi,access_type:"offline",prompt:"consent",state:n,include_granted_scopes:"true"});return`${pi}?${s}`}async function Qs(e,t,n,s){const r=await fetch(Zs,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:n,redirect_uri:s,grant_type:"authorization_code"})}),a=await r.text();if(!r.ok)throw new Error(`Token exchange failed (${r.status}): ${a.substring(0,300)}`);return JSON.parse(a)}async function yi(e,t,n){const s=await fetch(Zs,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:n,grant_type:"refresh_token"})}),r=await s.text();if(!s.ok)throw s.status===400||s.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${s.status}): ${r.substring(0,300)}`);return JSON.parse(r)}async function er(e){const t=await fetch(hi,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function Rt(e,t,n,s,r){if(!s||!r)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(Ce&&Ce.userId===t&&Ce.expiresAt>Date.now()/1e3+60){const o=await Tn(e,t,n);return{token:Ce.token,email:(o==null?void 0:o.email)||"unknown"}}const a=await Tn(e,t,n);if(!a)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const i=await yi(a.refresh_token,s,r);return Ce={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{token:i.access_token,email:a.email}}async function In(e,t,n){try{const s=await Tn(e,t,n);return s?{connected:!0,email:s.email,connectedAt:s.connected_at}:{connected:!1}}catch{return{connected:!1}}}function tr(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function nr(e,t,n,s,r,a,i){const o=await Qs(s,a,i,r);if(!o.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await er(o.access_token),c={refresh_token:o.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await fi(e,t,n,c),Ce={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{email:l.email,name:l.name}}async function sr(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(Ce==null?void 0:Ce.userId)===t&&(Ce=null)}const Qe="https://sheets.googleapis.com/v4/spreadsheets";class rr{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Rt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,n){const s=await this.authHeaders(),r=encodeURIComponent(n),a=await fetch(`${Qe}/${t}/values/${r}`,{headers:s});if(!a.ok){const o=await a.text();throw new Error(`Sheets read failed (${a.status}): ${o}`)}return(await a.json()).values||[]}async writeRange(t,n,s){const r=await this.authHeaders(),a=encodeURIComponent(n),i=await fetch(`${Qe}/${t}/values/${a}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:r,body:JSON.stringify({range:n,majorDimension:"ROWS",values:s})});if(!i.ok){const l=await i.text();throw new Error(`Sheets write failed (${i.status}): ${l}`)}return{updatedCells:(await i.json()).updatedCells||0}}async appendRows(t,n,s){var l;const r=await this.authHeaders(),a=encodeURIComponent(n),i=await fetch(`${Qe}/${t}/values/${a}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:r,body:JSON.stringify({range:n,majorDimension:"ROWS",values:s})});if(!i.ok){const c=await i.text();throw new Error(`Sheets append failed (${i.status}): ${c}`)}return{updatedCells:((l=(await i.json()).updates)==null?void 0:l.updatedCells)||s.length}}async deleteRow(t,n,s){const r=await this.authHeaders(),a=await fetch(`${Qe}/${t}?fields=sheets.properties`,{headers:r});if(!a.ok){const u=await a.text();throw new Error(`Failed to get sheet metadata (${a.status}): ${u}`)}const i=await a.json(),o=i.sheets.find(u=>u.properties.title===n);if(!o){const u=i.sheets.map(h=>h.properties.title).join(", ");throw new Error(`Tab "${n}" not found. Available tabs: ${u}`)}const l=o.properties.sheetId,c=s-1,d=await fetch(`${Qe}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{deleteDimension:{range:{sheetId:l,dimension:"ROWS",startIndex:c,endIndex:c+1}}}]})});if(!d.ok){const u=await d.text();throw new Error(`Row delete failed (${d.status}): ${u}`)}}async createSpreadsheet(t,n){const s=await this.authHeaders(),r={properties:{title:t},sheets:n&&n.length>0?n.map(o=>({properties:{title:o}})):[{properties:{title:"Sheet1"}}]},a=await fetch(Qe,{method:"POST",headers:s,body:JSON.stringify(r)});if(!a.ok){const o=await a.text();throw new Error(`Sheets create failed (${a.status}): ${o}`)}const i=await a.json();return{spreadsheetId:i.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${i.spreadsheetId}/edit`}}async getMetadata(t){const n=await this.authHeaders(),s=await fetch(`${Qe}/${t}?fields=properties.title,sheets.properties.title`,{headers:n});if(!s.ok){const a=await s.text();throw new Error(`Sheets metadata failed (${s.status}): ${a}`)}const r=await s.json();return{title:r.properties.title,sheets:r.sheets.map(a=>a.properties.title)}}}const Nt="https://www.googleapis.com/calendar/v3";class Cn{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Rt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",n={}){const s=await this.authHeaders(),r=new URLSearchParams;n.timeMin&&r.set("timeMin",n.timeMin),n.timeMax&&r.set("timeMax",n.timeMax),r.set("maxResults",String(n.maxResults||20)),r.set("singleEvents","true"),r.set("orderBy","startTime"),n.query&&r.set("q",n.query);const a=await fetch(`${Nt}/calendars/${encodeURIComponent(t)}/events?${r}`,{headers:s});if(!a.ok){const o=await a.text();throw new Error(`Calendar list failed (${a.status}): ${o}`)}return(await a.json()).items||[]}async createEvent(t="primary",n){var o;const s=await this.authHeaders(),r=n.timeZone||"Asia/Kolkata",a={summary:n.summary,description:n.description||"",location:n.location||"",start:{dateTime:n.startDateTime,timeZone:r},end:{dateTime:n.endDateTime,timeZone:r}};(o=n.attendees)!=null&&o.length&&(a.attendees=n.attendees.map(l=>({email:l})));const i=await fetch(`${Nt}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:s,body:JSON.stringify(a)});if(!i.ok){const l=await i.text();throw new Error(`Calendar create failed (${i.status}): ${l}`)}return await i.json()}async updateEvent(t="primary",n,s){const r=await this.authHeaders(),a=s.timeZone||"Asia/Kolkata",i={};s.summary&&(i.summary=s.summary),s.description&&(i.description=s.description),s.location&&(i.location=s.location),s.startDateTime&&(i.start={dateTime:s.startDateTime,timeZone:a}),s.endDateTime&&(i.end={dateTime:s.endDateTime,timeZone:a});const o=await fetch(`${Nt}/calendars/${encodeURIComponent(t)}/events/${n}`,{method:"PATCH",headers:r,body:JSON.stringify(i)});if(!o.ok){const l=await o.text();throw new Error(`Calendar update failed (${o.status}): ${l}`)}return await o.json()}async deleteEvent(t="primary",n){const s=await this.authHeaders(),r=await fetch(`${Nt}/calendars/${encodeURIComponent(t)}/events/${n}`,{method:"DELETE",headers:s});if(!r.ok&&r.status!==410){const a=await r.text();throw new Error(`Calendar delete failed (${r.status}): ${a}`)}}async listCalendars(){const t=await this.authHeaders(),n=await fetch(`${Nt}/users/me/calendarList`,{headers:t});if(!n.ok){const r=await n.text();throw new Error(`Calendar list calendars failed (${n.status}): ${r}`)}return((await n.json()).items||[]).map(r=>({id:r.id,summary:r.summary,primary:r.primary||!1}))}}const Ae="https://docs.googleapis.com/v1/documents",vi="https://www.googleapis.com/drive/v3/files";function es(e){const t=[];for(const n of e.split(`
`)){const s=n.trim();if(s===""||/^---+$/.test(s))continue;let r="NORMAL_TEXT",a=n;const i=s.match(/^###\s+(.+)/),o=!i&&s.match(/^##\s+(.+)/),l=!i&&!o&&s.match(/^#\s+(.+)/);i?(r="HEADING_3",a=i[1]):o?(r="HEADING_2",a=o[1]):l?(r="HEADING_1",a=l[1]):/^\s*[-*]\s/.test(n)&&(a="• "+n.replace(/^\s*[-*]\s+/,""));const{text:c,spans:d}=wi(a);t.push({text:c,namedStyle:r,spans:d})}return t}function wi(e){const t=[];let n="",s=0;for(;s<e.length;)if(e[s]==="*"&&e[s+1]==="*"){const r=e.indexOf("**",s+2);if(r!==-1){const a=n.length;n+=e.substring(s+2,r),t.push({start:a,end:n.length,bold:!0}),s=r+2}else n+=e[s++]}else if(e[s]==="_"&&e[s+1]==="_"){const r=e.indexOf("__",s+2);if(r!==-1){const a=n.length;n+=e.substring(s+2,r),t.push({start:a,end:n.length,bold:!0}),s=r+2}else n+=e[s++]}else if(e[s]==="*"&&e[s+1]!=="*"){const r=e.indexOf("*",s+1);if(r!==-1){const a=n.length;n+=e.substring(s+1,r),t.push({start:a,end:n.length,italic:!0}),s=r+1}else n+=e[s++]}else if(e[s]==="_"){const r=e.indexOf("_",s+1);if(r!==-1){const a=n.length;n+=e.substring(s+1,r),t.push({start:a,end:n.length,italic:!0}),s=r+1}else n+=e[s++]}else n+=e[s++];return{text:n,spans:t}}class ar{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Rt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const n=await this.authHeaders(),s=await fetch(Ae,{method:"POST",headers:n,body:JSON.stringify({title:t})});if(!s.ok){const a=await s.text();throw new Error(`Docs create failed (${s.status}): ${a}`)}const r=await s.json();return{documentId:r.documentId,url:`https://docs.google.com/document/d/${r.documentId}/edit`}}async readDocument(t){var i,o;const n=await this.authHeaders(),s=await fetch(`${Ae}/${t}`,{headers:n});if(!s.ok){const l=await s.text();throw new Error(`Docs read failed (${s.status}): ${l}`)}const r=await s.json();let a="";for(const l of((i=r.body)==null?void 0:i.content)||[])if(l.paragraph)for(const c of l.paragraph.elements)(o=c.textRun)!=null&&o.content&&(a+=c.textRun.content);return{title:r.title,content:a.trim()}}async rewriteDocument(t,n){var g;const s=await this.authHeaders(),r=await fetch(`${Ae}/${t}`,{headers:s});if(!r.ok){const v=await r.text();throw new Error(`Docs fetch failed (${r.status}): ${v.substring(0,200)}`)}const i=((g=(await r.json()).body)==null?void 0:g.content)||[],o=i[i.length-1],l=(o==null?void 0:o.endIndex)??2,c=es(n),d=[];if(l>2&&d.push({deleteContentRange:{range:{startIndex:1,endIndex:l-1}}}),c.length===0){d.length>0&&await fetch(`${Ae}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:d})});return}let u="";const h=[];for(const v of c){const w=u.length;u+=v.text+`
`,h.push({start:w,end:u.length,namedStyle:v.namedStyle,spans:v.spans})}d.push({insertText:{location:{index:1},text:u}});for(const v of h){v.namedStyle!=="NORMAL_TEXT"&&d.push({updateParagraphStyle:{range:{startIndex:1+v.start,endIndex:1+v.end},paragraphStyle:{namedStyleType:v.namedStyle},fields:"namedStyleType"}});for(const w of v.spans){const b={},S=[];w.bold&&(b.bold=!0,S.push("bold")),w.italic&&(b.italic=!0,S.push("italic")),S.length>0&&d.push({updateTextStyle:{range:{startIndex:1+v.start+w.start,endIndex:1+v.start+w.end},textStyle:b,fields:S.join(",")}})}}const f=await fetch(`${Ae}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:d})});if(!f.ok){const v=await f.text();throw new Error(`Docs rewrite failed (${f.status}): ${v.substring(0,200)}`)}}async appendFormattedContent(t,n){var g;const s=await this.authHeaders(),r=es(n);if(r.length===0)return;const a=await fetch(`${Ae}/${t}`,{headers:s});if(!a.ok){const v=await a.text();throw new Error(`Docs fetch failed (${a.status}): ${v.substring(0,200)}`)}const o=((g=(await a.json()).body)==null?void 0:g.content)||[],l=o[o.length-1],c=Math.max(1,((l==null?void 0:l.endIndex)??2)-1);let d="";const u=[];for(const v of r){const w=d.length;d+=v.text+`
`,u.push({start:w,end:d.length,namedStyle:v.namedStyle,spans:v.spans})}const h=[{insertText:{location:{index:c},text:d}}];for(const v of u){v.namedStyle!=="NORMAL_TEXT"&&h.push({updateParagraphStyle:{range:{startIndex:c+v.start,endIndex:c+v.end},paragraphStyle:{namedStyleType:v.namedStyle},fields:"namedStyleType"}});for(const w of v.spans){const b={},S=[];w.bold&&(b.bold=!0,S.push("bold")),w.italic&&(b.italic=!0,S.push("italic")),S.length>0&&h.push({updateTextStyle:{range:{startIndex:c+v.start+w.start,endIndex:c+v.start+w.end},textStyle:b,fields:S.join(",")}})}}const f=await fetch(`${Ae}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:h})});if(!f.ok){const v=await f.text();throw new Error(`Docs append failed (${f.status}): ${v.substring(0,200)}`)}}async appendText(t,n){const s=await this.authHeaders(),r=await fetch(`${Ae}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:[{insertText:{endOfSegmentLocation:{},text:n}}]})});if(!r.ok){const a=await r.text();throw new Error(`Docs append failed (${r.status}): ${a}`)}}async deleteContent(t,n){var i,o,l;const s=await this.authHeaders(),r=await fetch(`${Ae}/${t}:batchUpdate`,{method:"POST",headers:s,body:JSON.stringify({requests:[{replaceAllText:{containsText:{text:n,matchCase:!0},replaceText:""}}]})});if(!r.ok){const c=await r.text();throw new Error(`Docs delete content failed (${r.status}): ${c.substring(0,200)}`)}return{occurrencesRemoved:((l=(o=(i=(await r.json()).replies)==null?void 0:i[0])==null?void 0:o.replaceAllText)==null?void 0:l.occurrencesChanged)??0}}async shareDocument(t,n,s="writer"){const r=await this.authHeaders(),a=await fetch(`${vi}/${t}/permissions`,{method:"POST",headers:r,body:JSON.stringify({type:"user",role:s,emailAddress:n})});if(!a.ok){const i=await a.text();throw new Error(`Share failed (${a.status}): ${i}`)}}}class we{constructor(t,n,s,r,a){j(this,"sheets");j(this,"calendar");j(this,"docs");j(this,"db");j(this,"userId");j(this,"pinHash");this.db=t,this.userId=n,this.pinHash=s,this.sheets=new rr(t,n,s,r,a),this.calendar=new Cn(t,n,s,r,a),this.docs=new ar(t,n,s,r,a)}async isConnected(){return In(this.db,this.userId,this.pinHash)}}const et=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:Cn,GoogleDocs:ar,GoogleServices:we,GoogleSheets:rr,completeOAuthFlow:nr,disconnectGoogle:sr,exchangeCodeForTokens:Qs,fetchUserInfo:er,generateAuthUrl:Xs,getGoogleAuth:Rt,isGoogleConnected:In,isOAuthClientConfigured:tr},Symbol.toStringTag,{value:"Module"}));async function ir(e,t,n={}){const s={textQuery:t,languageCode:"en",pageSize:8};if(n.type&&(s.includedType=n.type),n.location){const l=n.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(s.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:n.radius||5e3}})}const r=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),a=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":r},body:JSON.stringify(s)});if(!a.ok){const l=await a.text();return{results:[],error:`Places API error (${a.status}): ${l.substring(0,200)}`}}const i=await a.json();return!i.places||i.places.length===0?{results:[]}:{results:i.places.map(l=>{var c,d,u;return{name:((c=l.displayName)==null?void 0:c.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(d=l.currentOpeningHours)==null?void 0:d.openNow,types:(u=l.types)==null?void 0:u.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function or(e,t){var a,i,o;const n=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),s=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":n}});if(!s.ok){const l=await s.text();return{error:`Place Details API error (${s.status}): ${l.substring(0,200)}`}}const r=await s.json();return{details:{name:((a=r.displayName)==null?void 0:a.text)||"",address:r.formattedAddress||"",phone:r.internationalPhoneNumber,website:r.websiteUri,rating:r.rating,reviews:(i=r.reviews)==null?void 0:i.slice(0,3).map(l=>{var c,d,u;return{author:((c=l.authorAttribution)==null?void 0:c.displayName)||"Anonymous",rating:l.rating||0,text:((u=(d=l.text)==null?void 0:d.text)==null?void 0:u.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(o=r.currentOpeningHours)==null?void 0:o.weekdayDescriptions,location:r.location?{lat:r.location.latitude,lng:r.location.longitude}:void 0,googleMapsUri:r.googleMapsUri}}}async function lr(e,t,n,s={}){var c;const r=new URLSearchParams({origin:t,destination:n,key:e,mode:s.mode||"driving"});(s.mode==="driving"||!s.mode)&&r.set("departure_time","now");const a=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${r}`);if(!a.ok)return{error:`Directions API error: ${a.status}`};const i=await a.json();if(i.status!=="OK")return{error:`Directions: ${i.status} — ${i.error_message||""}`};const o=i.routes[0],l=o.legs[0];return{route:{summary:o.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(c=l.duration_in_traffic)==null?void 0:c.text,steps:l.steps.slice(0,10).map(d=>{var u,h,f;return{instruction:((u=d.html_instructions)==null?void 0:u.replace(/<[^>]*>/g,""))||"",distance:((h=d.distance)==null?void 0:h.text)||"",duration:((f=d.duration)==null?void 0:f.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function cr(e,t,n,s){var l,c;const r={q:t,target:n,key:e,format:"text"};s&&(r.source=s);const a=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok){const d=await a.text();return{translatedText:"",error:`Translate API error (${a.status}): ${d.substring(0,200)}`}}const o=(c=(l=(await a.json()).data)==null?void 0:l.translations)==null?void 0:c[0];return o?{translatedText:o.translatedText,detectedSourceLang:o.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function dr(e,t){const n=new URLSearchParams({address:t,key:e}),s=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${n}`);if(!s.ok)return{results:[],error:`Geocoding API error: ${s.status}`};const r=await s.json();return r.status!=="OK"&&r.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${r.status} — ${r.error_message||""}`}:{results:(r.results||[]).slice(0,5).map(a=>{var i;return{address:a.formatted_address,lat:a.geometry.location.lat,lng:a.geometry.location.lng,placeId:a.place_id,types:(i=a.types)==null?void 0:i.slice(0,3)}})}}async function ur(e,t,n={}){const s=new URLSearchParams({part:"snippet",q:t,key:e,type:n.type||"video",maxResults:String(n.maxResults||5),order:n.order||"relevance"}),r=await fetch(`https://www.googleapis.com/youtube/v3/search?${s}`);if(!r.ok){const i=await r.text();return{results:[],error:`YouTube API error (${r.status}): ${i.substring(0,200)}`}}return{results:((await r.json()).items||[]).map(i=>{var o,l,c,d,u,h,f,g;return{title:i.snippet.title,channelTitle:i.snippet.channelTitle,description:(o=i.snippet.description)==null?void 0:o.substring(0,200),videoId:((l=i.id)==null?void 0:l.videoId)||((c=i.id)==null?void 0:c.channelId)||((d=i.id)==null?void 0:d.playlistId)||"",publishedAt:i.snippet.publishedAt,url:(u=i.id)!=null&&u.videoId?`https://www.youtube.com/watch?v=${i.id.videoId}`:(h=i.id)!=null&&h.channelId?`https://www.youtube.com/channel/${i.id.channelId}`:"",thumbnailUrl:(g=(f=i.snippet.thumbnails)==null?void 0:f.medium)==null?void 0:g.url}})}}const bi="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";function mr(e,t){if(/anomaly-modal/i.test(e))return[];const n=[],s=e.split(/class="result results_links/g).slice(1);for(const r of s){if(n.length>=t)break;const a=r.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),i=r.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(a){let o=a[1];const l=o.match(/uddg=([^&]+)/);l?o=decodeURIComponent(l[1]):o.startsWith("//")&&(o="https:"+o);const c=h=>h.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),d=c(a[2]),u=i?c(i[1]):"";if(d&&o.startsWith("http")){const h=o.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];n.push({title:d,link:o,snippet:u,displayLink:h})}}}return n}async function _i(e,t,n,s){const r=new URLSearchParams({key:t,cx:n,q:e,num:String(Math.min(s,10))}),a=await fetch(`https://www.googleapis.com/customsearch/v1?${r}`);if(!a.ok){const l=await a.text().catch(()=>"");return{results:[],error:`Google CSE failed (${a.status}): ${l.substring(0,200)}`}}return{results:((await a.json()).items||[]).map(l=>({title:l.title||"",link:l.link||"",snippet:l.snippet||"",displayLink:l.displayLink||(l.link||"").replace(/^https?:\/\/(www\.)?/,"").split("/")[0]})).filter(l=>l.title&&l.link.startsWith("http"))}}async function Lt(e,t={}){const n=Math.min(t.num||5,10),s=t.site?`site:${t.site} ${e}`:e;try{const r=new URLSearchParams({q:s}),a=await fetch("https://html.duckduckgo.com/html/",{method:"POST",headers:{"User-Agent":bi,"Content-Type":"application/x-www-form-urlencoded"},body:r.toString()});if(!a.ok)return{results:[],error:`Search request failed (${a.status})`};const i=await a.text(),o=mr(i,n);if(o.length>0)return{results:o};if(t.googleApiKey&&t.googleCseId){const l=await _i(s,t.googleApiKey,t.googleCseId,n);if(l.results.length>0)return l;if(l.error)return{results:[],error:l.error}}return/anomaly-modal/i.test(i)?{results:[],error:"Web search blocked by DuckDuckGo bot protection. Configure GOOGLE_API_KEY + GOOGLE_CSE_ID, or add a Tavily API key in Settings → Keys for faster research."}:{results:[],error:void 0}}catch(r){return{results:[],error:`Web search error: ${r.message}`}}}async function pr(e,t,n,s="driving"){var l,c,d,u;const r=new URLSearchParams({origins:t,destinations:n,key:e,mode:s,departure_time:"now"}),a=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${r}`);if(!a.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${a.status}`};const i=await a.json(),o=(d=(c=(l=i.rows)==null?void 0:l[0])==null?void 0:c.elements)==null?void 0:d[0];return!o||o.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(o==null?void 0:o.status)||i.status}`}:{distance:o.distance.text,duration:o.duration.text,durationInTraffic:(u=o.duration_in_traffic)==null?void 0:u.text}}const Ei=Object.freeze(Object.defineProperty({__proto__:null,geocode:dr,getDirections:lr,getDistanceMatrix:pr,getPlaceDetails:or,parseDuckDuckGoHtml:mr,searchPlaces:ir,searchYouTube:ur,translateText:cr,webSearch:Lt},Symbol.toStringTag,{value:"Module"})),Le="https://gmail.googleapis.com/gmail/v1/users/me";function Ti(e,t){if(e)return e;const n=t?parseInt(t,10):NaN;return!Number.isNaN(n)&&n>0?new Date(n).toISOString():""}function Si(e,t){return e===403?"Gmail access denied (403). Reconnect your Google account in Settings → Keys → Google Workspace to grant Gmail permissions.":`Gmail list failed (${e}): ${t.substring(0,200)}`}class Re{constructor(t,n,s,r,a){this.db=t,this.userId=n,this.pinHash=s,this.clientId=r,this.clientSecret=a}async authHeaders(){const{token:t}=await Rt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var l;const n=await this.authHeaders(),s=new URLSearchParams;if(s.set("maxResults",String(t.maxResults||10)),t.query&&s.set("q",t.query),(l=t.labelIds)!=null&&l.length)for(const c of t.labelIds)s.append("labelIds",c);const r=await fetch(`${Le}/messages?${s}`,{headers:n});if(!r.ok){const c=await r.text();throw new Error(Si(r.status,c))}const a=await r.json();if(!a.messages||a.messages.length===0)return[];const i=[];let o=0;for(const c of a.messages.slice(0,t.maxResults||10))try{const d=await this.getMessage(c.id,n);d?i.push(d):o++}catch{o++}if(i.length===0&&o>0)throw new Error(`Gmail found ${a.messages.length} matching message(s) but could not read message details (${o} metadata fetch failure(s)). Reconnect Google in Settings → Keys → Google Workspace to refresh Gmail permissions, then try again.`);return i}async getMessage(t,n){const s=n||await this.authHeaders(),r=await fetch(`${Le}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:s});if(!r.ok)return null;const a=await r.json(),i=o=>{var l,c,d;return((d=(c=(l=a.payload)==null?void 0:l.headers)==null?void 0:c.find(u=>u.name.toLowerCase()===o.toLowerCase()))==null?void 0:d.value)||""};return{id:a.id,threadId:a.threadId,snippet:a.snippet||"",subject:i("Subject")||"(no subject)",from:i("From"),to:i("To"),date:Ti(i("Date"),a.internalDate),isUnread:(a.labelIds||[]).includes("UNREAD"),labels:a.labelIds||[]}}async getMessageBody(t){const n=await this.authHeaders(),s=await fetch(`${Le}/messages/${t}?format=full`,{headers:n});if(!s.ok){const a=await s.text();throw new Error(`Gmail message body failed (${s.status}): ${a.substring(0,200)}`)}const r=await s.json();return ki(r.payload)}async search(t,n=10){return this.listMessages({query:t,maxResults:n})}async send(t,n,s,r={}){const a=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${n}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];r.cc&&i.push(`Cc: ${r.cc}`),r.bcc&&i.push(`Bcc: ${r.bcc}`),r.replyToMessageId&&(i.push(`In-Reply-To: ${r.replyToMessageId}`),i.push(`References: ${r.replyToMessageId}`)),i.push("",ts(s));const o=i.join(`\r
`),c={raw:ns(o)};r.threadId&&(c.threadId=r.threadId);const d=await fetch(`${Le}/messages/send`,{method:"POST",headers:a,body:JSON.stringify(c)});if(!d.ok){const u=await d.text();throw new Error(`Gmail send failed (${d.status}): ${u.substring(0,200)}`)}return await d.json()}async createDraft(t,n,s,r={}){const a=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${n}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];r.cc&&i.push(`Cc: ${r.cc}`),i.push("",ts(s));const o=i.join(`\r
`),l=ns(o),c=await fetch(`${Le}/drafts`,{method:"POST",headers:a,body:JSON.stringify({message:{raw:l}})});if(!c.ok){const d=await c.text();throw new Error(`Gmail draft failed (${c.status}): ${d.substring(0,200)}`)}return await c.json()}async markAsRead(t){const n=await this.authHeaders();await fetch(`${Le}/messages/${t}/modify`,{method:"POST",headers:n,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,n){const s=await this.authHeaders();let r={};switch(n){case"archive":r={removeLabelIds:["INBOX"]};break;case"trash":r={addLabelIds:["TRASH"]};break;case"read":r={removeLabelIds:["UNREAD"]};break;case"unread":r={addLabelIds:["UNREAD"]};break;case"star":r={addLabelIds:["STARRED"]};break;case"unstar":r={removeLabelIds:["STARRED"]};break}const a=await fetch(`${Le}/messages/${t}/modify`,{method:"POST",headers:{...s,"Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok){const i=await a.text();throw new Error(`Failed to modify message: ${i}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),n=await fetch(`${Le}/labels/INBOX`,{headers:t});return n.ok&&(await n.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),n=await fetch(`${Le}/profile`,{headers:t});if(!n.ok)throw new Error("Failed to get Gmail profile");return await n.json()}}function xi(e){let t="",n="";function s(r){var a,i,o,l;if(r){if(r.mimeType==="text/plain"&&((a=r.body)!=null&&a.data))t+=Qt(r.body.data);else if(r.mimeType==="text/html"&&((i=r.body)!=null&&i.data))n+=Qt(r.body.data);else if((o=r.parts)!=null&&o.length)for(const c of r.parts)s(c);else if((l=r.body)!=null&&l.data&&!r.parts){const c=Qt(r.body.data);r.mimeType==="text/html"?n+=c:t+=c}}}return s(e),{plain:t.trim(),html:n.trim()}}function ki(e){var r,a;if(!e)return"";if((r=e.body)!=null&&r.data&&!((a=e.parts)!=null&&a.length)){const i=Qt(e.body.data);return e.mimeType==="text/html"?ss(i):i}const{plain:t,html:n}=xi(e),s=n?ss(n):"";return t&&s?t.length<200&&s.length>t.length?s:t.length>=s.length?t:s:t||s||e.snippet||""}function ts(e){e=e.replace(/\\n/g,`
`).replace(/\\t/g,"	");let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return t=t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)","g"),"<em>$1</em>"),`<html><body style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#000000;">${t.split(/\n\n+/).map(r=>{const a=r.split(`
`);return a.every(i=>/^\s*[-*]\s/.test(i)||i.trim()==="")?`<ul>${a.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*[-*]\s+/,"")}</li>`).join("")}</ul>`:a.every(i=>/^\s*\d+\.\s/.test(i)||i.trim()==="")?`<ol>${a.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*\d+\.\s+/,"")}</li>`).join("")}</ol>`:`<p>${a.join("<br>")}</p>`}).join("")}</body></html>`}function ns(e){const t=new TextEncoder().encode(e);let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Qt(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function ss(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<img[^>]+alt=["']([^"']+)["'][^>]*>/gi,`
$1
`).replace(/<br\s*\/?>/gi,`
`).replace(/<\/t[dh]>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}function gn(e,t){const n=`${e.subject} ${e.snippet} ${e.from}`.toLowerCase(),s=t.toLowerCase();let r=0;n.includes(s)&&(r+=10);for(const a of s.split(/\s+/))a.length>2&&n.includes(a)&&(r+=3);return/\b(order|ordered|confirmation|invoice|receipt|thank you for your order)\b/i.test(`${e.subject} ${e.snippet}`)&&(r+=6),/\b(delivered|delivery|out for delivery|shipped|dispatch|dispatched|arriving)\b/i.test(e.subject)&&(r-=4),r}function rs(e){return e.map((t,n)=>`${t.isUnread?"● ":"  "}${n+1}. **${t.subject}**
   From: ${t.from}
   Date: ${t.date}
   ${t.snippet}
   [id: ${t.id}]`).join(`

`)}function Ri(e,t,n){if(e.length===0)return`No purchase-related emails found for "${t}" (query: ${n}).`;const s=[...e].sort((i,o)=>gn(o,t)-gn(i,t)),r=s[0];if(gn(r,t)>0){const i=`**Purchase email for "${t}"**

**${r.subject}**
Date received: ${r.date}
From: ${r.from}
Preview: ${r.snippet}

`,o=s.length>1?`Other related messages:

${rs(s.slice(1,6))}`:"";return i+o}return`No clear purchase confirmation for "${t}". Closest matches:

${rs(s.slice(0,8))}`}const Di=15e3,Ni=15e3,Oi=15e3,Ii=6e4;async function An(e,t){try{const n=new AbortController,s=setTimeout(()=>n.abort(),Ni),r=await fetch(e,{signal:n.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(!r.ok)return{text:"",error:`HTTP ${r.status}`};const a=r.headers.get("content-type")||"";if(!a.includes("text/html")&&!a.includes("text/plain")&&!a.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${a.split(";")[0]}`};const i=await r.text();clearTimeout(s);const o=i.length>2e5?i.substring(0,2e5):i,l=Ci(o);return l.length<50?{text:"",error:"Page has too little readable content"}:{text:l.substring(0,t||Di)}}catch(n){return{text:"",error:n.name==="AbortError"?"Timeout":n.message}}}function Ci(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(n,s)=>String.fromCharCode(parseInt(s))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(n=>n.trim()).filter(n=>n.length>0).join(`
`),t.trim()}async function hr(e,t,n){const s=new AbortController,r=setTimeout(()=>s.abort(),Oi);try{const a=await fetch("https://api.tavily.com/search",{method:"POST",signal:s.signal,headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:t,query:e,search_depth:n==="quick"?"basic":"advanced",include_raw_content:!0,max_results:n==="quick"?7:5})});return clearTimeout(r),a.ok?{results:(await a.json()).results||[]}:{results:[],error:`Tavily error ${a.status}`}}catch(a){clearTimeout(r);const i=a.name==="AbortError"?"Timeout":a.message;return console.warn("[searchViaTavily]",i),{results:[],error:i}}}async function Yt(e,t,n,s){var i,o;const r=new AbortController,a=setTimeout(()=>r.abort(),Ii);try{const l=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",signal:r.signal,headers:{"x-api-key":e,"anthropic-version":"2023-06-01","content-type":"application/json"},body:JSON.stringify({model:"claude-opus-4-8",max_tokens:s,system:t,messages:[{role:"user",content:n}]})});if(clearTimeout(a),!l.ok)throw new Error(`Opus API error ${l.status}`);return((o=(i=(await l.json()).content)==null?void 0:i[0])==null?void 0:o.text)||""}catch(l){throw clearTimeout(a),l}}function as(e,t){try{const n=e.match(/\[[\s\S]*\]/);if(!n)return t;const s=JSON.parse(n[0]);if(Array.isArray(s)&&s.every(r=>typeof r=="string"))return s.filter(Boolean)}catch{}return t}async function gr(e){return e.raw_content&&e.raw_content.length>100?e.raw_content.slice(0,15e3):(await An(e.url,15e3)).text}async function Ai(e,t,n,s,r){const a=[];async function i(w,b,S){let R=[];return n&&(R=(await hr(w,n,S)).results),R.length===0&&(R=(await r(w,b)).map(U=>({url:U.link,title:U.title,content:U.snippet,raw_content:null,score:0}))),(await Promise.all(R.map(async N=>({result:N,content:await gr(N)})))).filter(N=>N.content.length>50)}if(s==="quick"){const w=await i(e,7,"quick");let b="";for(let R=0;R<w.length;R++){const B=w[R],N=`[${R+1}] ${B.result.title}
${B.result.url}

${B.content}

`;if(b.length+N.length>8e4)break;b+=N,a.push({url:B.result.url,title:B.result.title})}return{report:await Yt(t,"You are an expert research analyst. Write a clear, accurate, well-structured report answering the query based on provided sources. Cite sources as [1], [2] etc. Be precise and factual.",`Query: ${e}

Sources:
${b}`,2048),sources:a,pagesRead:w.length}}const o=await Yt(t,"You are a research planning expert.",`I need to research: ${e}

Generate exactly 4-5 specific sub-queries that together cover all important angles (definition, current state, comparisons, recent developments, expert analysis). Return ONLY a JSON array of strings, nothing else.`,400),l=as(o,[e,`${e} overview`,`${e} examples`,`${e} latest`]).slice(0,5),c=await Promise.all(l.map(w=>i(w,5,"thorough"))),d=new Set,u=[];for(const w of c)for(const b of w)d.has(b.result.url)||u.length>=20||(d.add(b.result.url),u.push(b));let h="";for(let w=0;w<u.length;w++){const b=u[w],S=`[${w+1}] ${b.result.title}
${b.result.url}

${b.content}

`;if(h.length+S.length>18e4)break;h+=S,a.push({url:b.result.url,title:b.result.title})}const f=await Yt(t,"You are a research analyst identifying information gaps.",`I'm researching: ${e}

Here's what I've found so far:
${h.slice(0,6e4)}

Identify 2-3 specific information gaps or important angles not yet covered. Return ONLY a JSON array of follow-up search queries.`,300),g=as(f,[]).slice(0,3);if(g.length>0){let w=0;const b=await Promise.all(g.map(S=>i(S,4,"thorough")));for(const S of b)for(const R of S){if(w>=5||d.has(R.result.url))continue;d.add(R.result.url);const N=`[${a.length+1}] ${R.result.title}
${R.result.url}

${R.content}

`;if(h.length+N.length>18e4)break;h+=N,a.push({url:R.result.url,title:R.result.title}),u.push(R),w++}}return{report:await Yt(t,`You are an expert research analyst producing a comprehensive report. Use this exact structure:
**Executive Summary** (2-3 sentences)
**Key Findings** (bullet points with citations)
**Detailed Analysis** (multiple paragraphs with citations)
**Conflicting Information** (if sources disagree, note explicitly — omit this section if no conflicts)
**Sources** (numbered list of URLs)
Cite sources as [1], [2] etc. Be thorough, precise, and objective.`,`Research query: ${e}

Sources:
${h}`,4096),sources:a,pagesRead:u.length}}async function fr(e,t,n={}){const s=n.depth||"quick",r=async(g,v)=>(await Lt(g,{num:v,site:n.site,googleApiKey:n.googleApiKey,googleCseId:n.googleCseId})).results||[];if(n.anthropicKey)try{const g=await Ai(e,n.anthropicKey,n.tavilyKey||null,s,r);if(g.report.trim())return{report:g.report,sources:g.sources.map(v=>({title:v.title,url:v.url})),pagesRead:g.pagesRead}}catch(g){console.warn("[conductResearch] Opus path failed:",g.message)}if(n.tavilyKey)try{const g=await hr(e,n.tavilyKey,s);if(g.results.length>0){const v=s==="thorough"?8:5,b=(await Promise.all(g.results.slice(0,v).map(async N=>({result:N,content:await gr(N)})))).filter(N=>N.content.length>50),S=b.map(N=>({title:N.result.title,url:N.result.url}));if(b.length>0){const N=b.map((M,G)=>`--- SOURCE ${G+1}: ${M.result.title} ---
${M.content}
--- END SOURCE ${G+1} ---`).join(`

`);return{report:await Jt(e,N,t,"full"),sources:S,pagesRead:b.length}}const R=g.results.map((N,U)=>`[${U+1}] ${N.title}
${N.content}
Source: ${N.url}`).join(`

`);return{report:await Jt(e,R,t,"snippets"),sources:g.results.map(N=>({title:N.title,url:N.url})),pagesRead:0}}}catch(g){console.warn("[conductResearch] Tavily path failed:",g.message)}const a=n.maxPages||(s==="thorough"?5:3),i=n.maxResults||(s==="thorough"?8:5),o=await Lt(e,{num:i,site:n.site,googleApiKey:n.googleApiKey,googleCseId:n.googleCseId});if(o.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${o.error}`};if(o.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const c=o.results.slice(0,a).map(async g=>{const v=await An(g.link);return{title:g.title,url:g.link,displayLink:g.displayLink,snippet:g.snippet,content:v.text,error:v.error}}),u=(await Promise.all(c)).filter(g=>g.content.length>50);if(u.length===0){const g=o.results.map((w,b)=>`[${b+1}] ${w.title}
${w.snippet}
Source: ${w.link}`).join(`

`);return{report:await Jt(e,g,t,"snippets"),sources:o.results.map(w=>({title:w.title,url:w.link})),pagesRead:0}}const h=u.map((g,v)=>`--- SOURCE ${v+1}: ${g.title} (${g.displayLink}) ---
${g.content}
--- END SOURCE ${v+1} ---`).join(`

`);return{report:await Jt(e,h,t,"full"),sources:u.map(g=>({title:g.title,url:g.url})),pagesRead:u.length}}async function Jt(e,t,n,s){const a=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

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

Write a synthesized research report answering the query above.`;try{return(await n.chat([{role:"system",content:a},{role:"user",content:i}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(o){return`Research synthesis error: ${o.message}. Raw search results were found but could not be analyzed.`}}const Li=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:fr,fetchPageContent:An},Symbol.toStringTag,{value:"Module"})),Ye="https://api.browser-use.com/api/v2",is=2e4,Sn=6e3,Mi=3e5,Ln=12e3,yr=new Set(["finished","stopped"]);async function Mt(e,t,n=Ln){const s=new AbortController,r=setTimeout(()=>s.abort(),n);try{return await fetch(e,{...t,signal:s.signal})}finally{clearTimeout(r)}}async function $i(e){const t=()=>fetch(`${Ye}/sessions`,{method:"POST",headers:{"X-Browser-Use-API-Key":e,"Content-Type":"application/json"},body:JSON.stringify({})});try{let n=await t();if(!n.ok){const r=await n.text().catch(()=>"");if(wr(n.status,r)){if(console.log("[createBrowserSession] concurrency limit — reaping stale sessions and retrying"),await vr(e),n=await t(),!n.ok)return console.log(`[createBrowserSession] FAILED after reap HTTP ${n.status}`),null}else return console.log(`[createBrowserSession] FAILED HTTP ${n.status}: ${r}`),null}const s=await n.json();return console.log(`[createBrowserSession] sessionId=${s.id}`),s.id??null}catch(n){return console.log(`[createBrowserSession] ERROR ${n.message}`),null}}async function an(e,t){try{await fetch(`${Ye}/sessions/${e}`,{method:"DELETE",headers:{"X-Browser-Use-API-Key":t}}),console.log(`[closeBrowserSession] closed sessionId=${e}`)}catch{}}async function Bi(e){try{const t=await Mt(`${Ye}/sessions?filterBy=active&pageSize=100`,{headers:{"X-Browser-Use-API-Key":e}});return t.ok?(await t.json()).items??[]:[]}catch{return[]}}async function vr(e,t){const n=await Bi(e);let s=0;for(const r of n)!r.id||t&&r.id===t||(await an(r.id,e),s++);return s>0&&console.log(`[reapActiveBrowserSessions] closed ${s} stale session(s)`),s}function wr(e,t){const n=(t||"").toLowerCase();return/session/.test(n)?/concurrent|too many|maximum|limit|exceeded/.test(n):!1}async function br(e,t,n){var o;const s=(n==null?void 0:n.timeoutMs)??Mi;console.log(`[runBrowserTask] starting taskLen=${e.length} timeoutMs=${s} hasSecrets=${!!(n!=null&&n.secrets)} reuseSession=${!!(n!=null&&n.sessionId)}`);let r,a;try{const l={task:e};n!=null&&n.secrets&&Object.keys(n.secrets).length>0&&(l.secrets=n.secrets),n!=null&&n.sessionId&&(l.sessionId=n.sessionId);const c=()=>fetch(`${Ye}/tasks`,{method:"POST",headers:{"X-Browser-Use-API-Key":t,"Content-Type":"application/json"},body:JSON.stringify(l)});let d=await c();if(!d.ok){const h=await d.text().catch(()=>"");if(wr(d.status,h)&&(console.log("[runBrowserTask] concurrency limit — reaping stale sessions and retrying"),await vr(t,n==null?void 0:n.sessionId),d=await c()),!d.ok){const f=await d.text().catch(()=>h);return console.log(`[runBrowserTask] CREATE_FAILED HTTP ${d.status}: ${f}`),{output:null,taskId:"",status:"failed",error:`HTTP ${d.status}: ${f}`}}}const u=await d.json();if(r=u.id,a=u.sessionId||void 0,console.log(`[runBrowserTask] CREATED taskId=${r} sessionId=${a}`),!r)return{output:null,taskId:"",status:"failed",error:"No id in create response"}}catch(l){return{output:null,taskId:"",status:"failed",error:l.message}}await new Promise(l=>setTimeout(l,is));const i=Date.now()+(s-is);for(;Date.now()<i;){try{const l=await Mt(`${Ye}/tasks/${r}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(l.ok){const c=await l.json();if(yr.has(c.status)){if(c.status==="finished"){let d=c.output??null;if(!d)try{const u=await Mt(`${Ye}/tasks/${r}`,{headers:{"X-Browser-Use-API-Key":t}},Ln);if(u.ok){const h=await u.json();if(d=h.output??null,!d&&((o=h.steps)!=null&&o.length)){const f=h.steps[h.steps.length-1];d=f.extracted_content??f.output??f.result??null}}}catch{}return console.log(`[runBrowserTask] COMPLETED taskId=${r} outputLen=${(d??"").length}`),{output:d,taskId:r,sessionId:a,status:"completed"}}return console.log(`[runBrowserTask] FAILED taskId=${r} status=${c.status}`),{output:c.output??null,taskId:r,status:"failed",error:c.output??"Task was stopped before completing"}}}}catch{}await new Promise(l=>setTimeout(l,Sn))}return console.log(`[runBrowserTask] TIMEOUT taskId=${r} sessionId=${a}`),{output:null,taskId:r,sessionId:a,status:"timeout"}}async function _r(e,t,n){var a;const s=(n==null?void 0:n.waitMs)??3e4,r=Date.now()+s;for(;Date.now()<r;){try{const i=await Mt(`${Ye}/tasks/${e}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(!i.ok){await new Promise(l=>setTimeout(l,Sn));continue}const o=await i.json();if(yr.has(o.status)){let l=null;const c=await Mt(`${Ye}/tasks/${e}`,{headers:{"X-Browser-Use-API-Key":t}},Ln);if(c.ok){const d=await c.json();if(l=d.output??null,!l&&((a=d.steps)!=null&&a.length)){const u=d.steps[d.steps.length-1];l=u.extracted_content??u.output??u.result??null}}else l=o.output??null;return{status:o.status,output:l,done:!0}}}catch{}await new Promise(i=>setTimeout(i,Sn))}return{status:"running",output:null,done:!1}}function Pi(e){return`Navigate to https://www.bluedart.com/tracking.
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
If a captcha was encountered, set captcha_required to true and populate whatever tracking data was visible before the captcha appeared.`}async function Er(e){const t=e instanceof Buffer?new Uint8Array(e):e,n=new DataView(t.buffer,t.byteOffset,t.byteLength);let s=0;for(;s<t.length-30&&n.getUint32(s,!0)===67324752;){const r=n.getUint16(s+6,!0),a=n.getUint16(s+8,!0),i=n.getUint32(s+18,!0),o=n.getUint32(s+22,!0),l=n.getUint16(s+26,!0),c=n.getUint16(s+28,!0),d=new TextDecoder().decode(t.slice(s+30,s+30+l)),u=s+30+l+c;if(d==="word/document.xml"){const h=t.slice(u,u+i);let f;if(a===0)f=h;else{const w=new DecompressionStream("deflate-raw"),b=w.writable.getWriter();b.write(h),b.close();const S=w.readable.getReader(),R=[];let B=!1;for(;!B;){const M=await S.read();M.done?B=!0:R.push(M.value)}const N=R.reduce((M,G)=>M+G.length,0);f=new Uint8Array(o||N);let U=0;for(const M of R)f.set(M,U),U+=M.length}return new TextDecoder().decode(f).replace(/<\/w:p>/g,`
`).replace(/<\/w:tr>/g,`
`).replace(/<[^>]+>/g,"").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim()}s=u+i,r&8&&(s+=16)}return""}const Tr=Object.freeze(Object.defineProperty({__proto__:null,extractDocxTextFromBuffer:Er},Symbol.toStringTag,{value:"Module"})),ji=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,weight:.9},{pattern:/\bremi[a-z]{0,5}\s+(me|us)\b/i,weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,weight:.95},{pattern:/^[Tt]ask:\s*/,weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,weight:.9},{pattern:/\b(change\s+(the\s+)?time|update\s+(the\s+)?(reminder|schedule|alarm)|reschedule|move\s+it\s+to|cancel\s+(the\s+)?(reminder|schedule|alarm)|delete\s+(the\s+)?(reminder|schedule|alarm))\b/i,weight:.9},{pattern:/\b(show\s+(me\s+)?(my\s+)?(reminders?|schedules?|alarms?)|what\s+reminders?|any\s+reminders?|do\s+i\s+have.*remind|when\s+is\s+my\s+remind)\b/i,weight:.9},{pattern:/\b(stop|turn\s+off|switch\s+off|disable|deactivate)\s+(that|the|this|my)?\s*(reminder|schedule|alarm|notification)\b/i,weight:.9},{pattern:/\b(snooze|postpone|push\s+back|remind\s+me\s+later|later\s+reminder)\b/i,weight:.9},{pattern:/\b(change|update|edit|move|shift)\s+(it|this|that)\s+(to|for)\b/i,weight:.85},{pattern:/\bset\s+it\s+(for|at|to)\b/i,weight:.85},{pattern:/\b(what\s+time|when)\s+(did\s+i\s+set|is\s+(the|my)\s+remind|does\s+(it|that)\s+go\s+off)\b/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,weight:.9},{pattern:/\b(add|save|append|write|put)\s+(to|in|into)\s+(my\s+|your\s+|the\s+)?(quick\s+)?notes?\b|\bquick\s+notes\b/i,weight:.88},{pattern:/\b(update\s+cell|change\s+cell|delete\s+row|remove\s+row|delete\s+duplicate|remove\s+duplicate|create\s+(a\s+)?(new\s+)?(tab|sheet)|add\s+(a\s+)?tab|what.{0,15}(column|row\s+\d|cell\s+[A-Z])|sum\s+of|total\s+(in|of))\b/i,weight:.9},{pattern:/\b(forward\s+(that\s+)?(email|message)|reply\s+to\s+(that|the|an?\s+)?email|respond\s+to\s+(that|the)\s+email|mark\s+(it|that|this|email)\s+as|(got|received)\s+an?\s+email\s+from)\b/i,weight:.85},{pattern:/\b(cancel\s+(the\s+)?(event|meeting|appointment)|reschedule\s+(the\s+|my\s+)?(meeting|event|appointment)|delete\s+(from|the)\s+calendar|remove\s+(the\s+)?(event|meeting)\s+from\s+calendar)\b/i,weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,weight:.9},{pattern:/\b((save|store|put)\s+(it\s+|this\s+|that\s+|the\s+)?(to|in|on)\s+(my\s+|your\s+|google\s+)?drive|save\s+(to|as)\s+(a\s+)?(google\s+)?doc)\b/i,weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,weight:.9},{pattern:/\b(keep\s+(that\s+)?in\s+mind|always\s+(do|use|prefer|remember)|update\s+(my\s+)?(memory|preference)|delete\s+(that\s+)?memory|forget\s+that|what\s+did\s+i\s+tell\s+you\s+about)\b/i,weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,weight:.9}];function Mn(e,t,n){for(const s of ji)if(s.pattern.test(e))return{agent:"multi",confidence:s.weight,reasoning:"Keyword match — full agent"};if(e.trim().length<80){const s=[n,t].filter(Boolean);for(const r of s)if(r.split(`
`).slice(-16).some(o=>/\[TOOLS_USED:/i.test(o)||/\b(reminder|reminders|schedule|scheduled|cron|alarm|next_run|set for|going off|remind)\b/i.test(o)||/\b(i['']ll\s+(search|research|find|look\s+up|check|add|create|book)|just\s+a\s+moment|pulling\s+that\s+together|on\s+it\b|let\s+me\s+(search|research|find|look))\b/i.test(o)))return{agent:"multi",confidence:.8,reasoning:"Active tool session follow-up — full agent"}}return t&&/spreadsheet|sheet|google\s*sheet/i.test(t)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(e)?{agent:"multi",confidence:.85,reasoning:"Memory context — full agent"}:n!=null&&n.includes("[TOOLS_USED: research]")?{agent:"multi",confidence:.85,reasoning:"Research thread follow-up — full agent"}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function Sr(e){const t=[/\bpurchased\s+(?:a\s+)?pair\s+of\s+(.{2,50}?)(?:\s+recently|[.?!,]|$)/i,/\b(?:purchased|bought|ordered)\s+(?:a\s+)?(?:pair\s+of\s+)?(.{2,50}?)(?:\s+recently|[.?!,]|$)/i,/\b(?:about|for)\s+(?:my\s+)?(.{2,50}?)\s+(?:purchase|order)/i];for(const n of t){const s=e.match(n);if(!(s!=null&&s[1]))continue;const r=s[1].trim().replace(/\s+(purchase|order|confirmation|email|gmail|mail).*$/i,"").replace(/^(the|a|an)\s+/i,"").trim();if(r.length>=3&&!/^(it|this|that|one|something)$/i.test(r))return r}return null}function $n(e){const t=e.trim(),n=t.includes(" ")?`"${t}"`:t,s=t.split(/\s+/).filter(a=>a.length>2);return`${s.length>1?`(${n} OR ${s[s.length-1]})`:n} newer_than:180d`}function Ui(e){const t=/\b(gmail|email|e-?mail)\b/i.test(e),n=/\b(find|search|look\s+(?:for|up)?|locate|get)\b/i.test(e),s=/\b(purchase|purchased|bought|ordered|order|receipt|confirming|confirmation)\b/i.test(e),r=/\b(date|when|received)\b/i.test(e);return t&&(n||s||r)}function Hi(e){if(!Ui(e))return null;const t=Sr(e);return t?{tool:"gmail_search",args:{query:$n(t),max_results:15,product_hint:t}}:null}function Bn(e){const t=e.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')]+/);if(t&&/\b(delete|trash|remove)\b/i.test(e))return{tool:"drive_delete_file",args:{url_or_id:t[0].replace(/[.,;)]$/,"")}};if(/\b(list|show|display)\s+(my\s+)?(google\s+)?drive\s+(files?|docs?|documents?|folders?)\b|\bwhat\s+(files?|docs?|documents?)\s+(do\s+i\s+have|are|is)\s+(in|on)\s+(my\s+)?(google\s+)?drive\b/i.test(e))return{tool:"drive_list",args:{}};const n=e.match(/\b(?:search|find|look\s+(?:for|up))\s+(?:(?:in|on|my|the|google)\s+)*drive\s+(?:for\s+)?(.{3,60}?)(?:\s*[?.!,])?$/i);if(n)return{tool:"drive_search",args:{query:n[1].trim()}};if(/\b(how\s+many\s+unread|unread\s+(count|emails?|messages?)|any\s+unread\s+(emails?|messages?))\b/i.test(e))return{tool:"gmail_unread_count",args:{}};if(/\b(list|show|display)\s+(my\s+)?(upcoming\s+)?(calendar\s+)?(events?|meetings?|appointments?)\b/i.test(e)&&!/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+week|this\s+week|\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))\b/i.test(e))return{tool:"list_calendar_events",args:{}};if(/\b(list|show|display)\s+(my\s+)?(active\s+)?(reminders?|schedules?|alarms?)\b|\bwhat\s+reminders?\s+(do\s+i\s+have|are\s+set|are\s+active)\b/i.test(e))return{tool:"list_schedules",args:{}};const s=Hi(e);return s||null}function Pn(e,t){if(/\b(delete|trash|remove)\b.{0,50}\b(file|doc|document|sheet|spreadsheet|folder)\b|\b(file|doc|document|sheet|spreadsheet)\b.{0,50}\b(delete|trash|remove)\b/i.test(e)){const n=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(n)return{tool:"drive_delete_file",args:{url_or_id:n[0].replace(/[.,;)]$/,"")}}}if(/\b(move|rename|organise|organize)\b.{0,50}\b(file|doc|document|sheet)\b/i.test(e)){const n=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(n){const s={url_or_id:n[0].replace(/[.,;)]$/,"")},r=e.match(/\bto\s+(?:the\s+)?(?:folder\s+)?["']?([A-Za-z0-9 _-]{2,40})["']?\s*(?:folder\b|$)/i),a=e.match(/\brename\b.{0,30}\bto\s+["']?([A-Za-z0-9 _.-]{2,60})["']?/i);if(r&&(s.folder_name=r[1].trim()),a&&(s.new_name=a[1].trim()),s.folder_name||s.new_name)return{tool:"drive_organise",args:s}}}return null}function xr(e,t,n,s,r,a){const i=t.assistant_name||"Karna",o=2e3,l=4,c=t.personality_prompt?`
## Personality
`+(t.personality_prompt.length<=o*l?t.personality_prompt:t.personality_prompt.slice(0,o*l)+`
[...truncated to fit token budget]`)+`
`:"",d=n?`
## Active Memory (ALWAYS consult before responding)
${n}
`:"";let u="";try{const f=new Date;u=new Intl.DateTimeFormat("en-GB",{timeZone:t.timezone,day:"numeric",month:"short",year:"numeric"}).format(f)}catch{u=""}const h=`
## Current User
- **Name**: ${t.name}
- **Timezone**: ${t.timezone}
- **Time**: ${r}
- **Today's date for sheets**: ${u}
`;switch(e){case"conversation":return`You are ${i} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic.

${h}${c}${d}

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
- **HARD RULE — no false confirmations**: You have ZERO tool access. You CANNOT set reminders, create schedules, send emails, read sheets, or perform any action. NEVER output phrases like "Reminder set for...", "I've scheduled...", "Done ✅", "Task created", or any language implying an action was completed. If the user wants an action, say: "I can do that — just send your message and I'll take care of it." Do NOT simulate the outcome.`;default:return""}}const Fi=Object.freeze(Object.defineProperty({__proto__:null,buildPurchaseGmailQuery:$n,buildSubAgentPrompt:xr,classifyIntentFast:Mn,detectDeterministicOp:Bn,detectTierTwoOp:Pn,extractPurchaseProduct:Sr},Symbol.toStringTag,{value:"Module"})),qi=new Set(["create_skill","list_skills","store_memory","search_memory","delete_memory","update_memory","get_schedules","delete_schedule","create_schedule","toggle_schedule","gmail_unread_count"]),Gi=3,Wi=3,kr=5,Rr=.4,Dr=5;async function Nr(e,t,n,s,r,a,i=!0){try{const o=r.filter(g=>!qi.has(g));if(o.length<Gi)return;const c=[...[...new Set(o)]].sort().join(","),d=await e.prepare(`INSERT INTO skill_patterns (user_id, tool_signature, user_message_sample, tool_sequence, turn_count, succeeded)
       VALUES (?, ?, ?, ?, ?, ?)
       RETURNING id`).bind(n.id,c,s.slice(0,500),JSON.stringify(o),a,i?1:0).first(),u=await e.prepare("SELECT COUNT(*) as c FROM skill_patterns WHERE user_id = ? AND tool_signature = ?").bind(n.id,c).first(),h=(u==null?void 0:u.c)??0,f=await e.prepare(`SELECT auto_skill_id FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id IS NOT NULL LIMIT 1`).bind(n.id,c).first();if(f!=null&&f.auto_skill_id){d!=null&&d.id&&await e.prepare("UPDATE skill_patterns SET auto_skill_id = ? WHERE id = ?").bind(f.auto_skill_id,d.id).run(),await zi(e,n,f.auto_skill_id,c),i&&await Ji(e,t,n,f.auto_skill_id,o,s);return}h>=Wi&&await Yi(e,t,n,c,o)}catch{}}async function zi(e,t,n,s){const r=await e.prepare(`SELECT AVG(CAST(succeeded AS REAL)) as avg_success, COUNT(*) as total
     FROM (
       SELECT succeeded FROM skill_patterns
       WHERE user_id = ? AND tool_signature = ? AND auto_skill_id = ?
       ORDER BY created_at DESC LIMIT 20
     )`).bind(t.id,s,n).first(),a=(r==null?void 0:r.avg_success)??1,i=(r==null?void 0:r.total)??0,o=a<Rr&&i>=Dr;if(await e.prepare(`UPDATE user_skills
     SET usage_count = usage_count + 1,
         last_used_at = CURRENT_TIMESTAMP,
         confidence_score = ?,
         enabled = CASE WHEN ? THEN 0 ELSE enabled END,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`).bind(a,o?1:0,n,t.id).run(),o){const l=await e.prepare("SELECT name FROM user_skills WHERE id = ?").bind(n).first();l&&await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source, is_read)
         VALUES (?, 'warning', ?, ?, 'skills', 0)`).bind(t.id,`Auto-skill disabled: ${l.name}`,`The skill "${l.name}" was auto-disabled because its success rate dropped below 40% after ${i} uses. You can re-enable or delete it in Settings → Skills.`).run()}}async function Or(e,t){try{const s=(await e.prepare(`SELECT name, description, instructions, usage_count
       FROM user_skills
       WHERE user_id = ? AND is_auto = 1 AND enabled = 1
       ORDER BY usage_count DESC, created_at DESC
       LIMIT 5`).bind(t).all()).results??[];return s.length===0?"":`## Proven Procedures (Auto-Learned)
These workflows were automatically distilled from your past multi-step requests. When a new request closely matches one, follow its procedure without re-reasoning from scratch:

${s.map(a=>`**${a.name}** (used ${a.usage_count}×)
${a.instructions}`).join(`

---

`)}
`}catch{return""}}async function Ki(e,t,n){var i;let s=0,r=0,a=0;try{const o=await e.prepare(`SELECT us.id, us.user_id, us.name, us.instructions, us.refinement_count,
              us.confidence_score, us.usage_count
       FROM user_skills us
       WHERE us.user_id = ? AND us.is_auto = 1 AND us.enabled = 1
         AND us.confidence_score < ? AND us.usage_count >= ?`).bind(n,Rr,Dr).all();for(const l of o.results??[]){s++;const c=await e.prepare(`SELECT user_message_sample, tool_sequence
         FROM skill_patterns
         WHERE auto_skill_id = ? AND succeeded = 1
         ORDER BY created_at DESC LIMIT 3`).bind(l.id).all();if((c.results??[]).length<2||l.refinement_count>=kr){await e.prepare("UPDATE user_skills SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(l.id).run(),await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source, is_read)
           VALUES (?, 'warning', ?, ?, 'skills', 0)`).bind(l.user_id,`Auto-skill retired: ${l.name}`,`"${l.name}" had a ${Math.round(l.confidence_score*100)}% success rate and couldn't be improved — disabled. Check Settings → Skills to manage it.`).run(),a++;continue}const d=c.results.map(f=>f.user_message_sample),u=JSON.parse(c.results[0].tool_sequence),h=[{role:"system",content:"You are a workflow optimizer. Rewrite a skill procedure so it is more reliable, based on examples that previously succeeded."},{role:"user",content:`Skill "${l.name}" has a ${Math.round(l.confidence_score*100)}% success rate.

Current instructions:
${l.instructions}

Recent successful examples:
${d.map((f,g)=>`${g+1}. "${f}"`).join(`
`)}
Tools used: ${u.join(" → ")}

Rewrite the instructions to be clearer and more reliable. Keep them under 200 words.
Respond with EXACTLY:
REWRITTEN_INSTRUCTIONS: <revised instructions>`}];try{const v=(((i=(await t.chat(h,{tools:[]})).content)==null?void 0:i.trim())??"").match(/^REWRITTEN_INSTRUCTIONS:\s*([\s\S]+)$/m);v&&v[1].trim()&&(await e.prepare(`UPDATE user_skills
             SET instructions = ?, refinement_count = refinement_count + 1, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`).bind(v[1].trim(),l.id).run(),r++)}catch{await e.prepare("UPDATE user_skills SET enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(l.id).run(),a++}}}catch{}return{reviewed:s,rewritten:r,disabled:a}}async function Yi(e,t,n,s,r){var R;const i=((await e.prepare(`SELECT user_message_sample, tool_sequence
     FROM skill_patterns
     WHERE user_id = ? AND tool_signature = ?
     ORDER BY created_at DESC LIMIT 3`).bind(n.id,s).all()).results??[]).map(B=>B.user_message_sample),o=[{role:"system",content:"You are a workflow analyst. Given examples of user requests that all triggered the same multi-tool sequence, write a concise reusable skill procedure."},{role:"user",content:`These user requests all produced the same multi-tool workflow:

${i.map((B,N)=>`${N+1}. "${B}"`).join(`
`)}

Tools used (in order): ${r.join(" → ")}

Write a reusable skill. Respond with EXACTLY these three fields (no extra text):
NAME: <2-4 word skill name>
DESCRIPTION: <one sentence — what this skill does>
INSTRUCTIONS: <step-by-step instructions referencing exact tool names, under 200 words>`}],c=((R=(await t.chat(o,{tools:[]})).content)==null?void 0:R.trim())??"",d=c.match(/^NAME:\s*(.+)$/m),u=c.match(/^DESCRIPTION:\s*(.+)$/m),h=c.match(/^INSTRUCTIONS:\s*([\s\S]+)$/m);if(!d||!u||!h)return;const f=d[1].trim(),g=u[1].trim(),v=h[1].trim();if(!f||!g||!v)return;let w=`auto_${f.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").substring(0,40)}`;await e.prepare("SELECT id FROM user_skills WHERE user_id = ? AND slug = ?").bind(n.id,w).first()&&(w=`${w}_${Date.now().toString().slice(-4)}`);const S=await e.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, required_tools, is_auto, source)
     VALUES (?, ?, ?, ?, ?, ?, 1, 'auto')
     RETURNING id`).bind(n.id,f,w,g,v,JSON.stringify(r)).first();S!=null&&S.id&&await e.prepare("UPDATE skill_patterns SET auto_skill_id = ? WHERE user_id = ? AND tool_signature = ?").bind(S.id,n.id,s).run()}async function Ji(e,t,n,s,r,a){var u;const i=await e.prepare("SELECT name, instructions, refinement_count FROM user_skills WHERE id = ? AND user_id = ?").bind(s,n.id).first();if(!i||i.refinement_count>=kr)return;const o=[{role:"system",content:"You are a workflow optimizer. Given an existing skill and a new usage example, decide if the instructions should be improved."},{role:"user",content:`Existing skill "${i.name}":
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
     WHERE id = ?`).bind(d,s).run()}function Vi(e,t,n){const s={timestamp:new Date().toISOString(),level:e,message:t};n&&Object.keys(n).length>0&&Object.assign(s,n);try{return JSON.stringify(s)}catch{return JSON.stringify({timestamp:s.timestamp,level:e,message:t,context:"[unserializable context]"})}}function jn(e,t,n){const s=Vi(e,t,n);switch(e){case"error":console.error(s);break;case"warn":console.warn(s);break;case"debug":console.debug(s);break;default:console.log(s)}}function os(e,t){jn("info",e,t)}function Zi(e,t){jn("warn",e,t)}function ls(e,t){jn("error",e,t)}const Xi=2e3,Qi=2e3,Ir=4;function fn(e){return Math.ceil(e.length/Ir)}function yn(e,t){const n=t*Ir;return e.length<=n?e:e.slice(0,n)+`
[...truncated to fit token budget]`}const Cr=6e3,xn="The user is following up on prior research in this thread. Answer from the injected research context first. If the follow-up requires new or updated information, call the research tool again with a query that includes the original topic.";function Un(e){try{const t=JSON.parse(e||"{}");return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function Ar(e,t){const n=[...new Set(e)],s={};return n.length>0&&(s.tools=n),t&&(s.research_query=t.query.substring(0,200),s.research_report=t.report.substring(0,Cr)),JSON.stringify(s)}function Hn(e){const t=[];for(const n of e)if(!(n.role!=="user"&&n.role!=="assistant")){if(n.role==="assistant"){const s=Un(n.metadata);s.research_report&&t.push({role:"user",content:`[Tool Result for research]: ${s.research_report}`})}t.push({role:n.role,content:n.content})}return t}function Lr(e){return e.slice(-6).map(t=>{var n;return t.role==="assistant"&&(n=Un(t.metadata).tools)!=null&&n.includes("research")?`[TOOLS_USED: research] ${t.content}`:t.content}).join(`
`)}function Fn(e){var t;for(let n=e.length-1;n>=0;n--){const s=e[n];if(s.role==="assistant")return((t=Un(s.metadata).tools)==null?void 0:t.includes("research"))??!1}return!1}function Mr(e,t,n,s){return e!=="research"||/^(Research failed|Research error|Research timed out|\[Tool Error)/i.test(n)?s:{query:String(t.query||""),report:n.substring(0,Cr)}}function $r(e,t){if(!t)return;const n=e[e.length-1];(n==null?void 0:n.role)!=="user"||typeof n.content!="string"||n.content.startsWith(xn)||(e[e.length-1]={role:"user",content:`${xn}

${n.content}`})}function qn(e){const t=new Set(["(Previous response was not recorded.)","(Previous request did not complete. Please try again.)","(My previous response was cut off before completing. Starting fresh.)"]),n=[];for(const r of e){const a=typeof r.content=="string"?r.content:"";if(r.role==="assistant"&&t.has(a.trim())&&n.length>0&&n[n.length-1].role==="user"){n.pop();continue}n.push(r)}const s=[];for(const r of n){let a=r.content;r.role==="assistant"&&typeof a=="string"&&(a=a.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim(),a||(a="(Previous response was not recorded.)"));const i=a!==r.content?{...r,content:a}:r;s.length>0&&s[s.length-1].role===i.role&&i.role!=="system"?s[s.length-1]={...s[s.length-1],content:s[s.length-1].content+`

`+i.content}:s.push(i)}return s}const cs=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes (recurring). daily = RECURRING every single day at HH:MM — only use if user explicitly says "every day", "daily", or "each morning" etc. weekly = recurring every week on a specific day at time. once = fires ONE TIME at a specific date+time — USE THIS as the DEFAULT for any reminder that is not explicitly recurring (e.g. "remind me at 8pm", "remind me tomorrow at 9am", "remind me Sunday at 8:45am" are all once, not daily). IMPORTANT: NEVER use interval/daily/weekly for tasks that send emails to external recipients — use once instead. Recurring email-sending tasks spam the recipient on every cron tick.'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration requests: "in 5 minutes", "in 2 hours", "in half an hour". Do NOT use for any request that mentions a specific time or date ("at 13:00", "tomorrow at noon", "next Friday") — use schedule_value instead. Examples: "in 5 minutes" = 5, "in 2 hours" = 120.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"update_schedule",description:'Update an existing scheduled task — change its name, description, or reschedule it to a new time. Use this when the user wants to change the time of a reminder or rename it. You MUST call this tool — never say "updated" without calling it.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to update (get it from list_schedules first if unknown)"},name:{type:"string",description:"New name for the task (optional)"},description:{type:"string",description:"New description (optional)"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:"New schedule type (required if changing the time)"},schedule_value:{type:"string",description:"New schedule value matching the schedule_type format (required if changing the time)"},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration changes ("in 30 minutes", "in 2 hours"). Do NOT use if the user specifies a clock time or date — use schedule_value instead.'}},required:["job_id"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:`Store a PERMANENT rule, preference, or standing instruction that Karna should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts — those go to create_schedule. NEVER USE FOR: full text of essays, articles, reports, drafts, or any document body — those belong in document_library (if uploaded) or create_doc (Google Drive). A URL/title pointer is OK (type='context'), but never the body. Ask yourself: "Will this still be relevant in 6 months and is it a preference/rule, not a document?" If no, do not store it.`,parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"delete_memory",description:'Delete a stored memory entry by its ID. Use when the user says "forget that", "remove that rule", or "that preference is wrong". Always call search_memory first to confirm the correct ID. Confirm with the user if there is any ambiguity about which entry to remove.',parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to delete"}},required:["id"]}},{name:"update_memory",description:"Update the content of an existing memory entry by its ID. Use when the user wants to correct or change a stored rule or preference. Always call search_memory first to find the correct ID.",parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to update"},content:{type:"string",description:"The new content to replace the existing entry"}},required:["id","content"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"delete_sheet_row",description:"Delete a specific row from a Google Sheet tab by row number. The row number is as displayed in the sheet (1-based: row 1 = header, row 2 = first data row). Rows below shift up. ALWAYS call read_sheet first to confirm the exact row number before deleting. Cannot delete row 1 (header).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},sheet_name:{type:"string",description:'Tab name exactly as shown in the sheet (e.g. "Sheet1", "Budget", "January")'},row_number:{type:"number",description:"Row number to delete (1-based, as shown in the sheet). Minimum 2."}},required:["spreadsheet_id","sheet_name","row_number"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"rewrite_doc",description:"Replace the entire content of an existing Google Document with new formatted content. Use this to reformat or clean up a document — clears the current content and rewrites it with proper headings, bold, bullet points etc. Workflow: read_doc to get current content → rewrite_doc with reformatted version.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to rewrite (from URL: docs.google.com/document/d/{ID}/edit)"},content:{type:"string",description:"New formatted content (supports markdown: # ## ### headings, **bold**, *italic*, - bullets)"}},required:["document_id","content"]}},{name:"delete_doc_content",description:"Remove specific text from a Google Document by exact string match. Removes ALL occurrences of the text. Use this to delete a duplicate entry — call read_doc first to find the exact text. If text appears twice (duplicate), both copies are removed; use append_to_doc immediately after to add the single correct version back.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"},text_to_remove:{type:"string",description:"Exact text to remove, including any surrounding whitespace or line breaks needed to cleanly remove the entry."}},required:["document_id","text_to_remove"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_search/gmail_list. The Date line is the email received date. For purchase lookups, prefer order-confirmation emails (they list items) over delivery/shipping notices (often item-less). If gmail_search subject/snippet already answers the user, report Date from search results without reading every message.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail syntax: from:, to:, subject:, newer_than:, etc. For product/purchase lookups, include product keywords in the query and set product_hint. Results include subject, snippet, and Date — often enough without gmail_read. Prefer order confirmations over delivery emails.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"},product_hint:{type:"string",description:"Product name for purchase lookups — ranks order confirmations above delivery notices"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. Use this when the user explicitly says "send" (not just "draft" or "compose"). STRICT RULES: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm the address. (2) The body must be based on content from this conversation (research results, user-provided text, or a draft composed earlier in this turn) — do NOT invent facts. Using an email body you just composed or drafted in the same conversation is fine. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:'Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Use this when the user says "draft", "compose", or "prepare" an email, OR when no explicit recipient address has been provided. If the user explicitly says "send" and provides an email address, use gmail_send instead. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_read_file",description:"Read the content of a specific Google Drive file by URL or file ID. Supports Google Docs (exported as text), Sheets (exported as CSV), PDFs (extracted via AI), and other text files. Use this when the user shares a Google Drive or Google Docs link and wants you to read, summarize, or analyze the file contents.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive or Google Docs URL (e.g. https://drive.google.com/file/d/... or https://docs.google.com/document/d/...) or bare file ID"},extract_focus:{type:"string",description:'Optional: specific content to focus extraction on (e.g. "financial figures", "action items", "table of contents")'}},required:["url_or_id"]}},{name:"drive_delete_file",description:"Move a Google Drive file or document to trash. The file can be restored from Drive trash within 30 days. Use when the user asks to delete, remove, or trash a file.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to trash"}},required:["url_or_id"]}},{name:"drive_organise",description:"Move a Google Drive file to a folder and/or rename it. Creates the folder if it does not exist. Use when the user wants to organise, move, or rename a file in Drive.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to move/rename"},folder_name:{type:"string",description:"Name of the destination folder. Creates it if it does not exist."},new_name:{type:"string",description:"Optional: new name for the file"}},required:["url_or_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets (~1s). Use ONLY when: (1) the user wants a list of links to browse, not a synthesized answer, (2) real-time scores or breaking headlines, or (3) fallback if research tool fails. If the user wants an actual answer (not links), use research instead.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:"Deep web research using Opus 4.8 and Tavily. Produces a cited report. Use depth:'quick' for factual lookups (~45s). Use depth:'thorough' for complex, analytical, comparative, or multi-part questions (~2-4 min) — plans sub-queries, reads 15+ sources, identifies gaps, synthesizes a comprehensive structured report.",parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = Opus + Tavily (~45s). thorough = multi-phase deep research (~2-4 min). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"save_note",description:"Save a note for future reference. Use when the user asks to save, remember, or note something specific. Also use after research when user wants to keep the report.",parameters:{type:"object",properties:{title:{type:"string",description:"Short title/headline for the note"},content:{type:"string",description:"The note content"},tags:{type:"string",description:'Comma-separated tags e.g. "work,ideas"'},source:{type:"string",enum:["manual","research","chat"],description:"Source of the note. Default: manual"},source_query:{type:"string",description:"Original query if source=research"}},required:["content"]}},{name:"search_notes",description:"Search the user's saved notes by keyword, topic, or tag.",parameters:{type:"object",properties:{query:{type:"string",description:"Search term"}},required:["query"]}},{name:"list_notes",description:"List recent notes, optionally filtered by tag.",parameters:{type:"object",properties:{limit:{type:"number",description:"Max notes to return (default 10)"},tag:{type:"string",description:"Filter by tag"},pinned_only:{type:"boolean",description:"Only show pinned notes"}}}},{name:"delete_note",description:"Delete a specific note by ID.",parameters:{type:"object",properties:{id:{type:"number",description:"Note ID to delete"}},required:["id"]}},{name:"browser_task",description:'Run a complete browser automation workflow using a real cloud browser. The cloud agent handles ALL steps — navigation, clicks, form fills, extraction — in a single call. CRITICAL: Always pass the ENTIRE multi-step workflow as one task description. Never split a browser workflow across multiple browser_task calls. Wrong: call 1 "go to site", call 2 "click X", call 3 "extract Y". Correct: one call with "go to site, click X, extract Y". Use for: JS-heavy sites, form submission, clicking through pages, any site requiring a real browser.',parameters:{type:"object",properties:{task:{type:"string",description:'Full Plain-English description of the COMPLETE workflow (e.g. "Go to news.ycombinator.com and return the top 5 story titles and URLs", "Go to books.toscrape.com, click the Mystery category, list the first 5 books with their star rating and price")'},site_name:{type:"string",description:'Name of a saved Secret Vault entry (e.g. "LinkedIn", "Outlook") to inject login credentials. REQUIRED for any site that needs a login. You MUST call vault_lookup first to find the exact entry name, then pass it here. If omitted for a login-required site, no credentials will be injected and the task will fail to authenticate.'}},required:["task"]}},{name:"browser_task_status",description:"Check the status of a previously started browser task that was still running when it timed out. Use when the user asks what happened with a browser task. Get the task_id from memory.",parameters:{type:"object",properties:{task_id:{type:"string",description:"The task ID returned by the earlier browser_task call (stored in memory)"}},required:["task_id"]}},{name:"vault_lookup",description:"Check the Secret Vault for saved login credentials by site name. Returns matching entry names (not actual credentials). Use this BEFORE calling browser_task whenever the user asks to access a site that requires a password or login.",parameters:{type:"object",properties:{site_name:{type:"string",description:'Site or service name to look up (e.g. "LinkedIn", "Gmail backup", "MyBank"). Case-insensitive, partial matches included.'}},required:["site_name"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"parse_document",description:"Read and extract text content from an uploaded file (PDF, Word/DOCX, images, or text). Call this whenever the user uploads a document and wants you to read it, extract information, or work with its contents.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id returned when the file was uploaded"},extract_focus:{type:"string",description:'Optional: specific information to focus on extracting (e.g., "quantities and equipment names", "dates and amounts", "all text content")'}},required:["file_id"]}},{name:"search_library",description:`Search the user's Document Library (uploaded files and migrated documents) by name, summary, or extracted text. Use this when the user asks "find my essay about X", "what did I upload about Y", "do I have a document on Z", or any question that might be answered by an uploaded file. Returns a list of matching documents with previews and IDs. Follow with read_library_file to get full text.`,parameters:{type:"object",properties:{query:{type:"string",description:"Search terms to look for in document name, summary, or extracted text"},limit:{type:"number",description:"Maximum number of results to return (1-20, default: 10)"}},required:["query"]}},{name:"read_library_file",description:"Read the full extracted text of a document from the Document Library. Use after search_library to get full content. Pass either the numeric document id (from search_library results) or a partial name. Returns up to 20,000 characters of extracted text.",parameters:{type:"object",properties:{id_or_name:{type:"string",description:"Numeric document ID from search_library results, or a partial document name to search by"}},required:["id_or_name"]}},{name:"create_skill",description:"Create a new reusable skill — a named workflow that can be invoked by name in future conversations. Use this when the user asks you to create a skill, save a workflow, or build a reusable automation. IMPORTANT: Before calling this, ask the user clarifying questions to understand: what the skill should do, what inputs it needs, what tools it uses, and what the expected output is.",parameters:{type:"object",properties:{name:{type:"string",description:'Human-readable skill name (e.g., "Equipment List Parser", "Daily Expense Logger")'},description:{type:"string",description:"One-sentence description of what the skill does"},instructions:{type:"string",description:"Detailed step-by-step instructions for executing the skill. Be specific about which tools to use, in what order, and what to do with the results."},required_tools:{type:"array",items:{type:"string"},description:'List of tool names this skill needs (e.g. ["parse_document", "append_sheet", "create_sheet"])'},parameters:{type:"object",description:"JSON schema describing the inputs this skill accepts. Use standard JSON schema format."},examples:{type:"array",description:"Optional example inputs and expected outputs to guide execution",items:{type:"object",properties:{input:{type:"object"},output:{type:"string"}}}}},required:["name","description","instructions"]}},{name:"list_skills",description:"List all custom skills the user has created. Shows name, description, and usage count for each.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled skills. Default: false"}}}}];async function Gn(e,t){try{const s=((await e.prepare("SELECT slug, name, description, parameters FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at ASC").bind(t).all()).results||[]).map(r=>{let a={};try{a=JSON.parse(r.parameters)||{}}catch{}return a.properties||(a={type:"object",properties:{inputs:{type:"string",description:"Any additional context or specific instructions for this skill execution"}}}),{name:r.slug,description:`[Custom Skill] ${r.description}`,parameters:a}});return[...cs,...s]}catch{return cs}}async function Wn(e,t){try{const s=(await e.prepare("SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t).all()).results||[];return s.length===0?"":s.map(r=>`- ${r.content}`).join(`
`)}catch{return""}}function Br(e,t,n,s,r,a){const i=e.assistant_name||"Karna",o=e.personality_prompt?yn(`## Personality Instructions
${e.personality_prompt}
`,Xi):"",l=s!=null&&s.trim()?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. They are fixed — do not store copies of these in your memory or contradict them.
${s}
`:"",c=yn(t,Qi),d=a!=null&&a.trim()?yn(`## Pinned Notes Reference
${a}
`,1e3):"";let u="";try{const f=new Date;u=new Intl.DateTimeFormat("en-GB",{timeZone:e.timezone,day:"numeric",month:"short",year:"numeric"}).format(f)}catch{u=""}return`You are ${i}.

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
${Pr(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${n==="telegram"?'\n\n## TELEGRAM CONSTRAINTS\n- **Essays / save to Drive**: When the user wants an essay, article, or report saved to Google Drive (or says "store/save to drive"), you MUST call `create_doc` with the **full** text in the `content` parameter — never truncate for Telegram. Do NOT paste the essay body in chat (reply with title + Doc link only). Write from your knowledge unless they asked for research — do NOT call web_search before a plain essay. One `create_doc` call with title + full content (+ optional `folder_name`).\n- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).\n- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use `schedule_value` with the exact datetime in the user\'s local timezone — NEVER use `minutes_from_now` for clock-time requests (it causes wrong times). Only use `minutes_from_now` for pure duration requests like "in 30 minutes" or "in 2 hours".\n- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I\'ll now..." — just call the tool.\n- **Long content intent check**: When asked to write long-form content (essay, article, report) WITHOUT any save destination (no mention of Drive, Google Doc, or "save/store"), ask first: "Should I save the full piece as a Google Doc and send you the link, or give you a brief summary here in chat?" Default to Google Doc for anything over ~300 words. If they already said Drive/Doc/save/store, skip this question and call `create_doc` with the complete text immediately. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**':""}`}async function vn(e,t,n){var c;const r=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${n.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let a;((c=r.files)==null?void 0:c.length)>0?a=r.files[0].id:a=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:n,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${a}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:a,folderName:n}}function $t(e){return e.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").replace(/<function_calls>[\s\S]*?<\/function_calls>/gi,"").replace(/<function_result>[\s\S]*?<\/function_result>/gi,"").replace(/^\[calling:[^\]]*\]\s*/i,"").trim()}function Pr(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}const eo={read_sheet:"read",search_memory:"read",list_schedules:"read",write_sheet:"write",append_sheet:"write",update_schedule:"write",delete_schedule:"write",gmail_send:"external_effect",create_calendar_event:"external_effect"};function to(e,t){const n=eo[e]||"read";if(n==="read")return null;const s=jr(t);return n==="write"&&s!=="execute"?`POLICY BLOCKED (${n}): ${e} requires transaction_mode=execute.`:n==="external_effect"&&s!=="execute"?`POLICY BLOCKED (${n}): ${e} can cause external side effects and needs transaction_mode=execute.`:null}const no=["ETIMEDOUT","TIMEOUT","429","503","ECONNRESET","network"],so=new Set(["write_sheet","append_sheet","gmail_send","create_calendar_event","update_schedule","delete_schedule","delete_memory"]),ro={create_schedule:{required:["name","schedule_type","action_type"],enum:{schedule_type:["interval","daily","weekly","once"]}},update_schedule:{required:["job_id"]},delete_schedule:{required:["job_id"]},write_sheet:{required:["spreadsheet_id","range","values"]},append_sheet:{required:["spreadsheet_id","range","values"]},gmail_send:{required:["to","subject","body"]}};function ao(e){const t=String((e==null?void 0:e.message)||e||"Unknown tool error");return/timeout|timed out/i.test(t)?"TOOL_TIMEOUT":/unauthorized|forbidden|401|403/i.test(t)?"TOOL_AUTH":/not found|404/i.test(t)?"TOOL_NOT_FOUND":/rate limit|429/i.test(t)?"TOOL_RATE_LIMIT":/validation|invalid|required/i.test(t)?"TOOL_VALIDATION":"TOOL_EXECUTION_FAILED"}function io(e){const t=String((e==null?void 0:e.message)||e||"").toLowerCase();return no.some(n=>t.includes(n.toLowerCase()))}function oo(e){const t=e.query??e.q??e.search_query??e.search;return typeof t=="string"?t.trim():""}function lo(e,t){const n=ro[e];if(n){for(const s of n.required||[])if(t[s]===void 0||t[s]===null||t[s]==="")throw new Error(`Validation failed: ${s} is required for ${e}`);for(const[s,r]of Object.entries(n.enum||{}))if(t[s]!==void 0&&!r.includes(String(t[s])))throw new Error(`Validation failed: ${s} must be one of ${r.join(", ")}`)}}function jr(e){const t=e.transaction_mode;return t==="dry_run"||t==="confirm_required"||t==="execute"?t:"execute"}function co(e,t){if(!so.has(e))return null;const n=jr(t);return n==="dry_run"?`DRY RUN: ${e} validated. No write action was executed.`:n==="confirm_required"?`CONFIRMATION REQUIRED: ${e} is a write action. Re-run with transaction_mode=execute to proceed.`:null}const uo=new Set(["gmail_send","gmail_draft","gmail_modify","append_sheet","create_sheet","write_sheet","create_doc","append_to_doc","rewrite_doc","create_calendar_event","create_schedule","create_skill"]),mo=new Set(["list_schedules","search_memory","get_system_status","read_sheet","list_calendar_events","read_doc","gmail_list","gmail_read","gmail_search","gmail_unread_count","drive_list","drive_search","drive_read_file","web_search","read_url","research","browser_task_status","vault_lookup","search_places","get_place_details","get_directions","get_travel_time","translate_text","search_youtube","geocode_address","parse_document","search_library","read_library_file","list_skills"]),po=5;async function Bt(e,t,n,s,r,a,i,o,l,c,d,u,h,f,g){const v=Date.now();let w=!0,b="",S="";const R=r.traceId||crypto.randomUUID(),B=`${s}:${e}:${JSON.stringify(t)}`;if(uo.has(e)&&!mo.has(e))try{const U=await n.prepare(`SELECT tool_result FROM tool_execution_log
           WHERE user_id = ? AND tool_name = ? AND idempotency_key = ? AND success = 1
             AND created_at >= datetime('now', '-${po} minutes')
           ORDER BY created_at DESC
           LIMIT 1`).bind(s,e,B).first();if(U)return U.tool_result||""}catch{}try{lo(e,t);const U=to(e,t);if(U)return S=U,S;const M=co(e,t);if(M)return S=M,S;const G=2;for(let W=1;W<=G;W++)try{const ne=e==="browser_task"?31e4:e==="browser_task_status"?35e3:e==="research"?31e4:9e4;S=await Promise.race([go(e,t,n,s,a,i,o,l,c,d,u,h,f,r.channel,g),new Promise(($,z)=>setTimeout(()=>z(new Error("Tool timed out")),ne))]);break}catch(ne){if(W<G&&io(ne)){await new Promise($=>setTimeout($,250*W));continue}throw ne}return S}catch(U){throw w=!1,b=`${ao(U)}: ${U.message||"Unknown error"}`,new Error(b)}finally{const U=Date.now()-v;try{await n.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel, idempotency_key)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(s,r.agentType||null,r.providerName||null,e,JSON.stringify({...t,_idempotency_key:B,_trace_id:R}).substring(0,2e3),(w?S:"").substring(0,500),w?1:0,b||null,U,r.isEnforcementRetry?1:0,r.channel||"web",B).run()}catch{}}}function Ur(e){const t=e.length;for(let n=0;n<t-1;n++){const s=e[n];if(s.role!=="user"||typeof s.content!="string")continue;const r=t-1-n,a=r<=2?12e3:r<=4?5e3:2e3;s.content.length>a&&(e[n]={...s,content:s.content.substring(0,a)+`
[...truncated in history to reduce context size]`})}}function ho(e){const t=[];let n=[],s="",r=!1,a=0;const i=e.length;for(;a<i;){const o=e[a];if(r){if(o==='"'){if(e[a+1]==='"'){s+='"',a+=2;continue}r=!1,a++;continue}s+=o,a++;continue}if(o==='"'){r=!0,a++;continue}if(o===","){n.push(s),s="",a++;continue}if(o==="\r"&&e[a+1]===`
`){n.push(s),t.push(n),n=[],s="",a+=2;continue}if(o===`
`||o==="\r"){n.push(s),t.push(n),n=[],s="",a++;continue}s+=o,a++}for((s||n.length)&&(n.push(s),t.push(n));t.length&&t[t.length-1].every(o=>o==="");)t.pop();return t}async function go(e,t,n,s,r,a,i,o,l,c,d,u,h,f,g){var w,b,S,R,B,N,U,M,G,W,ne,$,z,q,Z,te,ie,re,me;const v=new X(n);switch(e){case"create_schedule":{const m=new Date;let E;const p=c||"UTC";if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){E=new Date(m.getTime()+t.minutes_from_now*60*1e3);const A=E.toLocaleString("en-US",{timeZone:p,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[O,C,I]=(A[0]||"").split("/");t.schedule_value=`${I}-${O}-${C} ${A[1]||"00:00"}`,t.schedule_type="once"}else if(t.schedule_type==="interval"){const D=parseInt(t.schedule_value,10);E=new Date(m.getTime()+D*60*1e3)}else if(t.schedule_type==="daily"&&t.action_type==="reminder"){const D=`${t.name||""} ${t.action_description||""}`.toLowerCase();if(/\bevery\b|\bdaily\b|\beach\b|\bmorning\b|\bevening\b|\bnight\b|\bweekday\b|\bweekend\b|\brecurring\b|\brepeat\b/.test(D)){const[O,C]=t.schedule_value.split(":").map(Number),I=m.toLocaleString("en-US",{timeZone:p}),L=new Date(I),P=new Date(L);P.setHours(O,C,0,0),P<=L&&P.setDate(P.getDate()+1);const K=new Date(P.toLocaleString("en-US",{timeZone:"UTC"})),Q=new Date(P.toLocaleString("en-US",{timeZone:p})),Y=K.getTime()-Q.getTime();E=new Date(P.getTime()+Y)}else{const[O,C]=t.schedule_value.split(":").map(Number),I=m.toLocaleString("en-US",{timeZone:p}),L=new Date(I),P=new Date(L);P.setHours(O,C,0,0),P<=L&&P.setDate(P.getDate()+1);const K=Ie=>String(Ie).padStart(2,"0"),Q=P.getFullYear(),Y=K(P.getMonth()+1),oe=K(P.getDate());t.schedule_value=`${Q}-${Y}-${oe} ${K(O)}:${K(C)}`,t.schedule_type="once";const ce=new Date(P.toLocaleString("en-US",{timeZone:"UTC"})),pe=new Date(P.toLocaleString("en-US",{timeZone:p})),ve=ce.getTime()-pe.getTime();E=new Date(P.getTime()+ve)}}else if(t.schedule_type==="daily"){const[D,A]=t.schedule_value.split(":").map(Number),O=m.toLocaleString("en-US",{timeZone:p}),C=new Date(O),I=new Date(C);I.setHours(D,A,0,0),I<=C&&I.setDate(I.getDate()+1);const L=new Date(I.toLocaleString("en-US",{timeZone:"UTC"})),P=new Date(I.toLocaleString("en-US",{timeZone:p})),K=L.getTime()-P.getTime();E=new Date(I.getTime()+K)}else if(t.schedule_type==="weekly"){const[D,A]=t.schedule_value.split(" "),[O,C]=(A||"00:00").split(":").map(Number),L=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(ve=>ve.toLowerCase()===D.toLowerCase()),P=m.toLocaleString("en-US",{timeZone:p}),K=new Date(P),Q=new Date(K);Q.setHours(O,C,0,0);let Y=(L-Q.getDay()+7)%7;Y===0&&Q<=K&&(Y=7),Q.setDate(Q.getDate()+Y);const oe=new Date(Q.toLocaleString("en-US",{timeZone:"UTC"})),ce=new Date(Q.toLocaleString("en-US",{timeZone:p})),pe=oe.getTime()-ce.getTime();E=new Date(Q.getTime()+pe)}else if(t.schedule_type==="once"){const[D,A]=t.schedule_value.split(" "),[O,C,I]=D.split("-").map(Number),[L,P]=(A||"00:00").split(":").map(Number),K=m.toLocaleString("en-US",{timeZone:p}),Q=new Date(K),Y=new Date(Q);Y.setFullYear(O,C-1,I),Y.setHours(L,P,0,0);const oe=new Date(Y.toLocaleString("en-US",{timeZone:"UTC"})),ce=new Date(Y.toLocaleString("en-US",{timeZone:p})),pe=oe.getTime()-ce.getTime();E=new Date(Y.getTime()+pe);const ve=new Date(m.getTime()+120*1e3);if(E.getTime()<m.getTime()+5*1e3){const Ie=E.toISOString();E=ve;const Ue=` [Note: The requested time ${t.schedule_value} in ${p} resolved to ${Ie} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${E.toISOString()}.]`;t._pastTimeWarning=Ue}}else E=new Date(m.getTime()+3600*1e3);if((t.schedule_type==="interval"||t.schedule_type==="daily"||t.schedule_type==="weekly")&&t.action_type==="custom"){const D=`${t.name||""} ${t.action_description||t.description||""}`.toLowerCase();/\b(send|forward)\b.{0,40}\b(email|mail)\b|\bemail.{0,20}\bto\b|\bgmail_send\b/.test(D)&&(t.schedule_type="once")}if(t.action_type==="custom"&&t.schedule_type==="once"){const D=`${t.name||""} ${t.action_description||t.description||""}`.toLowerCase();/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i.test(D)||(t.action_type="reminder")}if(await n.prepare("SELECT id FROM cron_jobs WHERE user_id = ? AND name = ? AND schedule_type = ? AND schedule_value = ? AND state != 'completed' LIMIT 1").bind(s,t.name,t.schedule_type,t.schedule_value).first()){const D=E.toLocaleString("en-US",{timeZone:p,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule already exists: "${t.name}" is already set for ${D} (${p}). No duplicate created.`}await n.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(s,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),E.toISOString()).run();const T=t._pastTimeWarning||"",x=E.toLocaleString("en-US",{timeZone:p,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${t.name}" — ${t.schedule_type}. Will fire at ${x} (${p}). [UTC: ${E.toISOString()}]${T}. IMPORTANT: Use the exact time "${x}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const E=(await n.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(s).all()).results||[];return E.length===0?"No scheduled tasks found.":E.map(p=>`[ID:${p.id}] ${p.enabled?"▶":"⏸"} "${p.name}" — [${p.schedule_type}] ${p.schedule_value} — ${p.action_type} — state: ${p.state||"active"} — next: ${p.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const m=t.enabled?1:0,E=m?"active":"paused";return await n.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(m,E,t.job_id,s).run(),`Schedule ${t.job_id} ${m?"enabled (active)":"paused"}.`}case"update_schedule_state":{const m=["created","active","reminding","paused","completed"],E=t.state;if(!m.includes(E))return`Invalid state "${E}". Valid states: ${m.join(", ")}`;const p=E==="completed"||E==="paused"?0:1;return await n.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(E,p,t.job_id,s).run(),`Schedule ${t.job_id} state updated to "${E}".`}case"update_schedule":{const m=t.job_id,E=c||"UTC",p=new Date,y=["updated_at = CURRENT_TIMESTAMP"],_=[];t.name&&(y.push("name = ?"),_.push(t.name)),t.description&&(y.push("description = ?"),_.push(t.description));let T=null,x=t.schedule_type,D=t.schedule_value;if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){T=new Date(p.getTime()+t.minutes_from_now*60*1e3);const C=T.toLocaleString("en-US",{timeZone:E,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[I,L,P]=(C[0]||"").split("/");D=`${P}-${I}-${L} ${C[1]||"00:00"}`,x="once"}else if(x&&D){if(x==="interval")T=new Date(p.getTime()+parseInt(D,10)*60*1e3);else if(x==="daily"){const[O,C]=D.split(":").map(Number),I=new Date(p.toLocaleString("en-US",{timeZone:E})),L=new Date(I);L.setHours(O,C,0,0),L<=I&&L.setDate(L.getDate()+1);const P=new Date(L.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(L.toLocaleString("en-US",{timeZone:E})).getTime();T=new Date(L.getTime()+P)}else if(x==="weekly"){const[O,C]=D.split(" "),[I,L]=(C||"00:00").split(":").map(Number),K=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(pe=>pe.toLowerCase()===O.toLowerCase()),Q=new Date(p.toLocaleString("en-US",{timeZone:E})),Y=new Date(Q);Y.setHours(I,L,0,0);let oe=(K-Y.getDay()+7)%7;oe===0&&Y<=Q&&(oe=7),Y.setDate(Y.getDate()+oe);const ce=new Date(Y.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(Y.toLocaleString("en-US",{timeZone:E})).getTime();T=new Date(Y.getTime()+ce)}else if(x==="once"){const[O,C]=D.split(" "),[I,L,P]=O.split("-").map(Number),[K,Q]=(C||"00:00").split(":").map(Number),Y=new Date(p.toLocaleString("en-US",{timeZone:E})),oe=new Date(Y);oe.setFullYear(I,L-1,P),oe.setHours(K,Q,0,0);const ce=new Date(oe.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(oe.toLocaleString("en-US",{timeZone:E})).getTime();T=new Date(oe.getTime()+ce),T.getTime()<p.getTime()+60*1e3&&(T=new Date(p.getTime()+120*1e3))}}if(x&&(y.push("schedule_type = ?"),_.push(x)),D&&(y.push("schedule_value = ?"),_.push(D)),T&&(y.push("next_run = ?"),_.push(T.toISOString())),y.length===1)return"No changes provided. Specify name, description, or schedule fields to update.";_.push(m,s),await n.prepare(`UPDATE cron_jobs SET ${y.join(", ")} WHERE id = ? AND user_id = ?`).bind(..._).run();const A=T?T.toLocaleString("en-US",{timeZone:E,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):null;return`Schedule ${m} updated.${A?` New fire time: ${A} (${E}).`:""} IMPORTANT: Use this exact time "${A}" when confirming to the user.`}case"delete_schedule":return await n.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,s).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const m=t.importance||5,E=t.type==="task"?"preference":t.type,p=m>=7?"working":"long_term";return await v.store(s,E,t.title,t.content,m,p),`Stored in ${p==="working"?"working":"long-term"} memory: [${E}] ${t.title} (importance: ${m})`}case"search_memory":{const m=await v.search(s,t.query);return m.length===0?"No matching memories found.":m.map(E=>`[id:${E.id}] [${E.tier||"long_term"}] [${E.type}] **${E.title}**: ${E.content}`).join(`
`)}case"delete_memory":return await v.remove(t.id,s),`Memory entry ${t.id} deleted.`;case"update_memory":return await v.update(t.id,s,t.content),`Memory entry ${t.id} updated.`;case"get_system_status":{const m=await n.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s).first(),E=await n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s).first(),p=await n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(s).first(),y=await n.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(s).first(),_=await n.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(s).first();return`System Status:
- Active schedules: ${(m==null?void 0:m.cnt)||0}
- Memory: ${(p==null?void 0:p.cnt)||0} working / ${(E==null?void 0:E.cnt)||0} total
- Total messages: ${(y==null?void 0:y.cnt)||0}
- Unread errors: ${(_==null?void 0:_.cnt)||0}`}case"read_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||""),E=t.spreadsheet_id;let p=t.range;const y=await m.sheets.getMetadata(E),_=y.sheets;p.includes("!")||(p=`${_[0]}!${p}`);let T;try{T=await m.sheets.readRange(E,p)}catch(D){if((w=D.message)!=null&&w.includes("Unable to parse range")||(b=D.message)!=null&&b.includes("400")){const A=p.includes("!")?p.split("!")[1]:p;p=`${_[0]}!${A}`,T=await m.sheets.readRange(E,p)}else throw D}let x=`[Spreadsheet: "${y.title}" | Reading tab: "${p.split("!")[0]}" | All tabs in this spreadsheet: ${_.map(D=>`"${D}"`).join(", ")}]
`;return _.length>1&&(x+=`[To read a different tab, call read_sheet again with range like "${_[1]}!A1:Z500"]
`),T.length===0?x+"No data found in the specified range.":x+T.map(D=>D.join("	| ")).join(`
`)}catch(m){return await H(n,s,"google","read_sheet",m.message),`Failed to read sheet: ${m.message}`}}case"write_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{const C=new X(n),I=JSON.stringify(t.values);await C.store(s,"context",`Pending sheet write: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"write_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:I.length>15e3?"[[truncated — re-provide values on retry]]":t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The sheet write has been saved to temporary memory. After reconnecting, tell me "write the pending sheet data" to complete this.`:"")}const p=t.values;let y=t.range;const x=Math.max(...p.map(C=>C.length))+4,D=p.map(C=>{const I=[...C];for(;I.length<x;)I.push("");return I}),A=y.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(A){const C=A[1]||"",I=A[2],L=A[3],P=A[5],Q=I.toUpperCase().charCodeAt(0)-64+x-1,Y=Q<=26?String.fromCharCode(64+Q):"Z";y=`${C}${I}${L}:${Y}${P}`}const O=await m.sheets.writeRange(t.spreadsheet_id,y,D);try{const C=new X(n),I=await C.search(s,`Pending sheet write: ${t.spreadsheet_id}`);for(const L of I)L.title.startsWith(`Pending sheet write: ${t.spreadsheet_id}`)&&await C.remove(L.id,s)}catch{}return`Written ${O.updatedCells} cells to ${y}.`}catch(m){return await H(n,s,"google","write_sheet",m.message),`Failed to write sheet: ${m.message}`}}case"append_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{await new X(n).store(s,"context",`Pending sheet append: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"append_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The append data has been saved to temporary memory. After reconnecting, tell me "append the pending sheet data" to complete this.`:"")}const p=await m.sheets.appendRows(t.spreadsheet_id,t.range,t.values);try{const y=new X(n),_=await y.search(s,`Pending sheet append: ${t.spreadsheet_id}`);for(const T of _)T.title.startsWith(`Pending sheet append: ${t.spreadsheet_id}`)&&await y.remove(T.id,s)}catch{}return`Appended ${p.updatedCells} cells to ${t.range}.`}catch(m){return await H(n,s,"google","append_sheet",m.message),`Failed to append to sheet: ${m.message}`}}case"create_sheet":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.title)try{await new X(n).store(s,"context",`Pending spreadsheet create: "${t.title}"`,JSON.stringify({tool:"create_sheet",title:t.title,sheet_names:t.sheet_names??null,folder_name:t.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title?`

The spreadsheet request has been saved to temporary memory. After reconnecting, tell me "create the pending spreadsheet" and I'll complete this automatically.`:"")}const p=await m.sheets.createSpreadsheet(t.title,t.sheet_names);let y="";if(t.folder_name)try{const{token:_}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(n,s,r,a||"",i||"");y=`
Folder: "${(await vn(_,p.spreadsheetId,t.folder_name)).folderName}"`}catch(_){y=`
(Note: spreadsheet saved to Drive root — could not place in folder "${t.folder_name}": ${_.message})`}try{await new X(n).store(s,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${p.spreadsheetId} | URL: ${p.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${y}
ID: ${p.spreadsheetId}
URL: ${p.url}`}catch(m){return await H(n,s,"google","create_sheet",m.message),`Failed to create spreadsheet: ${m.message}`}}case"list_calendar_events":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||""),E=t.calendar_id||"primary",p=t.days_ahead||7,y=new Date,_=new Date(y.getTime()+p*24*60*60*1e3),T=await m.calendar.listEvents(E,{timeMin:y.toISOString(),timeMax:_.toISOString(),query:t.query});return T.length===0?`No events found in the next ${p} days.`:T.map(x=>{var I;const D=x.start.dateTime||x.start.date||"TBD",A=x.end.dateTime||x.end.date||"",O=x.location?` 📍 ${x.location}`:"",C=((I=x.attendees)==null?void 0:I.map(L=>L.email).join(", "))||"";return`• ${x.summary} — ${D} to ${A}${O}${C?`
  Attendees: ${C}`:""}`}).join(`
`)}catch(m){return await H(n,s,"google","list_calendar",m.message),`Failed to list events: ${m.message}`}}case"create_calendar_event":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.summary&&t.start_datetime&&t.end_datetime)try{await new X(n).store(s,"context",`Pending calendar event: "${t.summary}"`,JSON.stringify({tool:"create_calendar_event",summary:t.summary,description:t.description??null,location:t.location??null,start_datetime:t.start_datetime,end_datetime:t.end_datetime,attendees:t.attendees??null,calendar_id:t.calendar_id??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.summary&&t.start_datetime?`

The calendar event has been saved to temporary memory. After reconnecting, tell me "create the pending event" and I'll add it to your calendar.`:"")}const p=t.calendar_id||"primary",y=await m.calendar.createEvent(p,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});try{const _=new X(n),T=await _.search(s,`Pending calendar event: "${t.summary}"`);for(const x of T)x.title.startsWith(`Pending calendar event: "${t.summary}"`)&&await _.remove(x.id,s)}catch{}return`Event created: "${y.summary}"
ID: ${y.id}
Start: ${y.start.dateTime||y.start.date}`}catch(m){return await H(n,s,"google","create_event",m.message),`Failed to create event: ${m.message}`}}case"create_doc":{if(!r)return"Authentication context unavailable.";const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.title&&t.content){try{await new X(n).store(s,"context",`Pending Google Doc save: "${t.title}"`,JSON.stringify({tool:"create_doc",title:t.title,content:t.content,folder_name:t.folder_name??null}),9,"working")}catch{}try{await n.prepare(`INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
               VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`).bind(s,`Pending doc: "${t.title}"`,'Google not connected — reconnect then say "save the pending document".',`pending_doc_${t.title}`,JSON.stringify({tool:"create_doc",title:t.title,folder_name:t.folder_name??null})).run()}catch{}}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" and I'll complete this automatically.`:"")}let p;try{p=await m.docs.createDocument(t.title)}catch(_){return await H(n,s,"google","create_doc",_.message),`Failed to create document: ${_.message}`}if(t.content){const _=t.content,T=async()=>{_.length>12e3?await m.docs.appendText(p.documentId,_):await m.docs.appendFormattedContent(p.documentId,_)};try{await T()}catch(x){try{await m.docs.appendText(p.documentId,_)}catch(D){return await H(n,s,"google","create_doc_append",D.message),`Document created but content could not be written (${D.message}).
ID: ${p.documentId}
URL: ${p.url}

Use append_to_doc with the document ID above to add content.`}await H(n,s,"google","create_doc_append_fallback",`Formatted append failed, used plain text: ${x.message}`)}}let y="";if(t.folder_name)try{const{token:_}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(n,s,r,a||"",i||"");y=`
Folder: "${(await vn(_,p.documentId,t.folder_name)).folderName}"`}catch(_){y=`
(Note: document saved to Drive root — could not place in folder "${t.folder_name}": ${_.message})`}try{await new X(n).store(s,"context",`Document: ${t.title}`,`Document ID: ${p.documentId} | URL: ${p.url}`,6,"working")}catch{}try{const _=t.content;await n.prepare(`INSERT OR IGNORE INTO document_library (user_id, source, drive_file_id, name, summary, extracted_text, status)
           VALUES (?, 'drive', ?, ?, ?, ?, 'parsed')`).bind(s,p.documentId,t.title,_?_.substring(0,500):null,_?_.substring(0,5e4):null).run()}catch{}try{const _=new X(n),T=await _.search(s,`Pending Google Doc save: "${t.title}"`);for(const x of T)x.title.startsWith(`Pending Google Doc save: "${t.title}"`)&&await _.remove(x.id,s)}catch{}return`Document created: "${t.title}"${y}
ID: ${p.documentId}
URL: ${p.url}`}case"read_doc":{if(!r)return"Authentication context unavailable.";try{const E=await new we(n,s,r,a||"",i||"").docs.readDocument(t.document_id);return`Document: "${E.title}"

${E.content}`}catch(m){return await H(n,s,"google","read_doc",m.message),`Failed to read document: ${m.message}`}}case"append_to_doc":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected){if(t.document_id&&t.content)try{await new X(n).store(s,"context",`Pending append to doc: "${t.document_id}"`,JSON.stringify({tool:"append_to_doc",document_id:t.document_id,content:t.content}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.'+(t.document_id&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" to complete this.`:"")}await m.docs.appendFormattedContent(t.document_id,t.content);let p=t.document_id;try{p=(await m.docs.readDocument(t.document_id)).title}catch{}try{const y=new X(n),_=await y.search(s,`Pending append to doc: "${t.document_id}"`);for(const T of _)T.title.startsWith(`Pending append to doc: "${t.document_id}"`)&&await y.remove(T.id,s)}catch{}try{const y=t.content;await n.prepare(`UPDATE document_library
             SET extracted_text = SUBSTR(COALESCE(extracted_text, '') || char(10) || ?, 1, 50000),
                 updated_at = CURRENT_TIMESTAMP
             WHERE user_id = ? AND drive_file_id = ?`).bind(y,s,t.document_id).run()}catch{}return`Content appended to "${p}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(m){return await H(n,s,"google","append_to_doc",m.message),`Failed to append to document: ${m.message}`}}case"rewrite_doc":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";await m.docs.rewriteDocument(t.document_id,t.content);let p=t.document_id;try{p=(await m.docs.readDocument(t.document_id)).title}catch{}return`Document "${p}" reformatted successfully.
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(m){return await H(n,s,"google","rewrite_doc",m.message),`Failed to rewrite document: ${m.message}`}}case"delete_sheet_row":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const p=t.row_number;return p<2?"Row 1 is the header row and cannot be deleted. Specify row 2 or higher.":(await m.sheets.deleteRow(t.spreadsheet_id,t.sheet_name,p),`Row ${p} deleted from "${t.sheet_name}". All rows below have shifted up.`)}catch(m){return await H(n,s,"google","delete_sheet_row",m.message),`Failed to delete row: ${m.message}`}}case"delete_doc_content":{if(!r)return"Authentication context unavailable.";try{const m=new we(n,s,r,a||"",i||"");if(!(await m.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const p=await m.docs.deleteContent(t.document_id,t.text_to_remove);return p.occurrencesRemoved===0?"No matching text found in the document. The text must match exactly — check spacing, punctuation, and line breaks.":`Removed ${p.occurrencesRemoved} occurrence${p.occurrencesRemoved===1?"":"s"} from the document.`}catch(m){return await H(n,s,"google","delete_doc_content",m.message),`Failed to delete document content: ${m.message}`}}case"gmail_list":{if(!r)return"Authentication context unavailable.";try{const E=await new Re(n,s,r,a||"",i||"").listMessages({maxResults:t.max_results||10,query:t.query});return E.length===0?"No messages found.":E.map((p,y)=>`${p.isUnread?"● ":"  "}${y+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(m){return await H(n,s,"gmail","list",m.message),(S=m.message)!=null&&S.includes("not connected")?m.message:`Gmail list error: ${m.message}`}}case"gmail_read":{if(!r)return"Authentication context unavailable.";try{const m=new Re(n,s,r,a||"",i||""),E=await m.getMessage(t.message_id);if(!E)return"Message not found.";let p=await m.getMessageBody(t.message_id);return p.trim().length<200&&E.snippet&&(p=`${p}

[Snippet]: ${E.snippet}`.trim()),`**${E.subject}**
From: ${E.from}
To: ${E.to}
Date: ${E.date}

${p}`}catch(m){return await H(n,s,"gmail","read",m.message),`Gmail read error: ${m.message}`}}case"gmail_search":{if(!r)return"Authentication context unavailable.";try{const m=oo(t);if(!m)return"Gmail search requires a non-empty query (e.g. from:sender@example.com subject:invoice). Use Gmail search syntax.";const E=typeof t.product_hint=="string"?t.product_hint.trim():"",p=Math.min(Math.max(t.max_results||10,1),20),y=new Re(n,s,r,a||"",i||"");let _=await y.search(m,p);if(_.length===0&&E){const T=$n(E).replace("180d","365d");_=await y.search(T,p)}return _.length===0?`No results for: ${m}`:E?Ri(_,E,m):_.map((T,x)=>`${T.isUnread?"● ":"  "}${x+1}. **${T.subject}**
   From: ${T.from}
   Date: ${T.date}
   ${T.snippet}
   [id: ${T.id}]`).join(`

`)}catch(m){await H(n,s,"gmail","search",m.message);const E=String((m==null?void 0:m.message)||m);return/403|access denied|insufficient|permission/i.test(E)?`${E} Go to Settings → Keys → Google Workspace and reconnect your account.`:`Gmail search error: ${E}`}}case"gmail_send":{if(!r)return"Authentication context unavailable.";try{const m=new Re(n,s,r,a||"",i||"");if(!(await new we(n,s,r,a||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body){try{await new X(n).store(s,"context",`Pending email: "${t.subject}"`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}try{await n.prepare(`INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
                 VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`).bind(s,`Pending email: "${t.subject}"`,`To: ${t.to} — reconnect Google then say "send the pending email".`,`pending_email_${t.subject}`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject})).run()}catch{}}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your email has been saved to temporary memory. After reconnecting, tell me "send the pending email" and I'll send it automatically.`:"")}const y=await m.send(t.to,t.subject,t.body,{cc:t.cc});try{const _=new X(n),T=await _.search(s,`Pending email: "${t.subject}"`);for(const x of T)x.title.startsWith(`Pending email: "${t.subject}"`)&&await _.remove(x.id,s)}catch{}return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${y.id}]`}catch(m){return await H(n,s,"gmail","send",m.message),`Gmail send error: ${m.message}`}}case"gmail_draft":{if(!r)return"Authentication context unavailable.";try{const m=new Re(n,s,r,a||"",i||"");if(!(await new we(n,s,r,a||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body)try{await new X(n).store(s,"context",`Pending draft: "${t.subject}"`,JSON.stringify({tool:"gmail_draft",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your draft has been saved to temporary memory. After reconnecting, tell me "create the pending draft" and I'll save it to Gmail.`:"")}const y=await m.createDraft(t.to,t.subject,t.body,{cc:t.cc});try{const T=new X(n),x=await T.search(s,`Pending draft: "${t.subject}"`);for(const D of x)D.title.startsWith(`Pending draft: "${t.subject}"`)&&await T.remove(D.id,s)}catch{}const _=t.cc?`, CC: ${t.cc}`:"";return`Draft created. To: ${t.to}${_}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${y.id}]`}catch(m){return await H(n,s,"gmail","draft",m.message),`Gmail draft error: ${m.message}`}}case"gmail_modify":{if(!r)return"Authentication context unavailable.";try{return await new Re(n,s,r,a||"",i||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(m){return await H(n,s,"gmail","modify",m.message),`Gmail modify error: ${m.message}`}}case"gmail_unread_count":{if(!r)return"Authentication context unavailable.";try{const E=await new Re(n,s,r,a||"",i||"").getUnreadCount();return`You have ${E} unread email${E!==1?"s":""} in Gmail.`}catch(m){return(R=m.message)!=null&&R.includes("not connected")?m.message:`Gmail error: ${m.message}`}}case"drive_list":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(n,s,r,a||"",i||""),E=new URLSearchParams;E.set("pageSize",String(t.max_results||10)),E.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),E.set("orderBy","modifiedTime desc");let p="";t.folder_id?p=`'${t.folder_id}' in parents and trashed = false`:t.query?p=`${t.query} and trashed = false`:p="trashed = false",E.set("q",p);const y=await fetch(`https://www.googleapis.com/drive/v3/files?${E}`,{headers:{Authorization:`Bearer ${m}`}});if(!y.ok)throw new Error(`Drive API error (${y.status})`);const _=await y.json();return(B=_.files)!=null&&B.length?_.files.map((T,x)=>{var C,I;const D=((C=T.mimeType)==null?void 0:C.split(".").pop())||T.mimeType,A=T.size?`${(parseInt(T.size)/1024).toFixed(1)} KB`:"",O=((I=T.modifiedTime)==null?void 0:I.split("T")[0])||"";return`${x+1}. **${T.name}** (${D})
   ${A} · Modified: ${O}
   ${T.webViewLink||""}`}).join(`

`):"No files found."}catch(m){return await H(n,s,"google","drive_list",m.message),`Drive list error: ${m.message}`}}case"drive_search":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(n,s,r,a||"",i||""),E=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,p=new URLSearchParams;p.set("q",E),p.set("pageSize",String(t.max_results||10)),p.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),p.set("orderBy","modifiedTime desc");const y=await fetch(`https://www.googleapis.com/drive/v3/files?${p}`,{headers:{Authorization:`Bearer ${m}`}});if(!y.ok)throw new Error(`Drive API error (${y.status})`);const _=await y.json();return(N=_.files)!=null&&N.length?_.files.map((T,x)=>{var O,C;const D=((O=T.mimeType)==null?void 0:O.split(".").pop())||T.mimeType,A=((C=T.modifiedTime)==null?void 0:C.split("T")[0])||"";return`${x+1}. **${T.name}** (${D}) — Modified: ${A}
   ${T.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(m){return await H(n,s,"google","drive_search",m.message),`Drive search error: ${m.message}`}}case"drive_read_file":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(n,s,r,a||"",i||""),E=t.url_or_id.trim();let p=E;const y=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/\/presentation\/d\/([a-zA-Z0-9_-]+)/,/\/forms\/d\/([a-zA-Z0-9_-]+)/,/[?&]id=([a-zA-Z0-9_-]+)/,/\/d\/([a-zA-Z0-9_-]+)/];for(const P of y){const K=E.match(P);if(K){p=K[1];break}}const _=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?fields=id,name,mimeType,size`,{headers:{Authorization:`Bearer ${m}`}});if(!_.ok)throw new Error(`Drive API error (${_.status}): could not fetch file metadata`);const T=await _.json(),{name:x,mimeType:D}=T,A=t.extract_focus,O=A?`Focus specifically on extracting: ${A}`:"Extract and return all readable text content. Preserve structure where relevant.",C={"application/vnd.google-apps.document":"text/plain","application/vnd.google-apps.spreadsheet":"text/csv","application/vnd.google-apps.presentation":"text/plain"};if(C[D]){const P=C[D],K=await fetch(`https://www.googleapis.com/drive/v3/files/${p}/export?mimeType=${encodeURIComponent(P)}`,{headers:{Authorization:`Bearer ${m}`}});if(!K.ok)throw new Error(`Drive export error (${K.status})`);const Q=await K.text();if(D==="application/vnd.google-apps.spreadsheet"){const Y=ho(Q),oe=Y.length,ce=((U=Y[0])==null?void 0:U.length)??0;return`**${x}** (Google Sheet — ${oe} rows × ${ce} columns)

Parsed rows (JSON, ready for write_sheet/append_sheet):
${JSON.stringify(Y)}`}return`**${x}**

${Q.substring(0,2e4)}`}if(D==="application/pdf"||x.toLowerCase().endsWith(".pdf")){const P=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?alt=media`,{headers:{Authorization:`Bearer ${m}`}});if(!P.ok)throw new Error(`Drive download error (${P.status})`);const K=await P.arrayBuffer(),Q=Buffer.from(K).toString("base64");let Y=null,oe="claude-sonnet-4-6";for(const Ie of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const Ue=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,Ie).first();if(Ue&&r){const sa=await J(Ue.encrypted_value,r),zt=JSON.parse(sa);if(zt.provider==="anthropic"){Y=zt.apiKey,zt.model&&(oe=zt.model);break}}}catch{}if(!Y)return`"${x}" is a PDF. An Anthropic API key is required to extract PDF content. Please configure one in Settings → Keys.`;const ce=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":Y,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:oe,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:Q}},{type:"text",text:O}]}]})});if(!ce.ok){const Ie=await ce.text();throw new Error(`Anthropic PDF extraction error: ${Ie.substring(0,200)}`)}const ve=((G=(M=(await ce.json()).content)==null?void 0:M[0])==null?void 0:G.text)||"";return`**${x}** (PDF from Drive)

${ve}`}const I=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?alt=media`,{headers:{Authorization:`Bearer ${m}`}});if(!I.ok)throw new Error(`Drive download error (${I.status})`);const L=await I.text();return`**${x}** (${D})

${L.substring(0,2e4)}`}catch(m){return await H(n,s,"google","drive_read_file",m.message),`Drive read error: ${m.message}`}}case"drive_delete_file":{if(!r)return"Authentication context unavailable.";try{const{token:m}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(n,s,r,a||"",i||""),E=t.url_or_id.trim();let p=E;const y=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const D of y){const A=E.match(D);if(A){p=A[1];break}}const _=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?fields=name`,{headers:{Authorization:`Bearer ${m}`}});if(!_.ok)throw new Error(`Drive API error (${_.status})`);const T=await _.json(),x=await fetch(`https://www.googleapis.com/drive/v3/files/${p}`,{method:"PATCH",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({trashed:!0})});if(!x.ok)throw new Error(`Drive API error (${x.status})`);return`"${T.name}" moved to trash. You can restore it from Drive trash within 30 days.`}catch(m){return await H(n,s,"google","drive_delete_file",m.message),`Drive delete error: ${m.message}`}}case"drive_organise":{if(!r)return"Authentication context unavailable.";if(!t.folder_name&&!t.new_name)return"Please provide at least a folder_name to move to or a new_name to rename.";try{const{token:m}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(n,s,r,a||"",i||""),E=t.url_or_id.trim();let p=E;const y=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const T of y){const x=E.match(T);if(x){p=x[1];break}}const _=[];if(t.new_name){const T=await fetch(`https://www.googleapis.com/drive/v3/files/${p}`,{method:"PATCH",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({name:t.new_name})});if(!T.ok)throw new Error(`Drive rename error (${T.status})`);_.push(`Renamed to "${t.new_name}"`)}if(t.folder_name){const{folderName:T}=await vn(m,p,t.folder_name);_.push(`Moved to folder "${T}"`)}return _.join(". ")+"."}catch(m){return await H(n,s,"google","drive_organise",m.message),`Drive organise error: ${m.message}`}}case"web_search":try{const m=await Lt(t.query,{num:t.num_results||5,site:t.site,googleApiKey:o||void 0,googleCseId:l||void 0});return m.error?`Web search failed: ${m.error}. Answer this question directly from your training knowledge and clearly state you are doing so.`:m.results.length===0?`Web search returned no results for "${t.query}". Answer this question directly from your training knowledge and clearly state you are doing so instead of searching.`:m.results.map((E,p)=>`${p+1}. [${E.title}](${E.link})
   ${E.snippet}`).join(`

`)}catch(m){return await H(n,s,"search","web_search",m.message),`Web search error: ${m.message}`}case"read_url":try{const m=t.url;if(!m||!m.startsWith("http://")&&!m.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const E=Math.min(t.max_length||8e3,15e3),{fetchPageContent:p}=await Promise.resolve().then(()=>Li),y=await p(m,E);return y.error?`Failed to read page: ${y.error}`:!y.text||y.text.length<20?`Page at ${m} returned no readable content.`:`Content from ${m} (${y.text.length} chars):

${y.text}`}catch(m){return await H(n,s,"search","read_url",m.message),`Read URL error: ${m.message}`}case"research":{if(!d)return"Research tool requires an LLM provider but none is available.";try{let m,E;try{for(const O of["llm_slot_1","llm_slot_2","llm_slot_3"]){const C=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,O).first();if(!C||!r)continue;const I=JSON.parse(await J(C.encrypted_value,r));if(I.provider==="anthropic"&&I.apiKey){m=I.apiKey;break}}const A=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"tavily_api_key").first();A&&r&&(E=await J(A.encrypted_value,r))}catch{}const p=t.depth||"quick",y=p==="thorough"?3e5:9e4,_=fr(t.query,d,{depth:p,site:t.site,anthropicKey:m,tavilyKey:E,googleApiKey:o||void 0,googleCseId:l||void 0}),T=new Promise(A=>setTimeout(()=>A(null),y)),x=await Promise.race([_,T]);if(x===null){const{webSearch:A}=await Promise.resolve().then(()=>Ei),O=await A(t.query,{num:5,googleApiKey:o||void 0,googleCseId:l||void 0});if(O.error||O.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let C=`Research took too long, but here are the top search results:

`;return C+=O.results.map((I,L)=>`${L+1}. [${I.title}](${I.link})
   ${I.snippet}`).join(`

`),C}if(x.error)return`Research failed: ${x.error}`;let D=x.report;x.sources.length>0&&(D+=`

---
**Sources** (`+x.pagesRead+` pages read):
`,D+=x.sources.map((A,O)=>`[${O+1}] [${A.title}](${A.url})`).join(`
`)),D+=`

---
💡 *Say "save as note" to store this report in your notes.*`;try{const A=new X(n),O=x.report.substring(0,600);await A.store(s,"context",`Research: ${t.query.substring(0,80)}`,O,6,"long_term")}catch{}return D}catch(m){return await H(n,s,"research","research",m.message),`Research error: ${m.message}`}}case"save_note":try{const m=(t.content||"").trim();if(!m)return"Note content cannot be empty.";const E=t.source||"manual",p=["manual","research","chat"].includes(E)?E:"manual",y=await n.prepare(`INSERT INTO notes (user_id, title, content, tags, source, source_query, is_pinned)
           VALUES (?, ?, ?, ?, ?, ?, 0) RETURNING id, title`).bind(s,(t.title||"").trim(),m,(t.tags||"").trim(),p,(t.source_query||"").trim()).first();return`Note saved (ID ${y==null?void 0:y.id}): "${(y==null?void 0:y.title)||"Untitled"}"`}catch(m){return`Failed to save note: ${m.message}`}case"search_notes":try{const m=(t.query||"").trim();if(!m)return"Search query is required.";const E=`%${m}%`,y=(await n.prepare(`SELECT id, title, content, tags, is_pinned, updated_at FROM notes
           WHERE user_id = ? AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
           ORDER BY updated_at DESC LIMIT 20`).bind(s,E,E,E).all()).results||[];return y.length===0?`No notes found matching "${m}".`:y.map(_=>`[#${_.id}] ${_.is_pinned?"📌 ":""}${_.title||"Untitled"} (${_.updated_at})
${_.content.slice(0,200)}${_.content.length>200?"...":""}${_.tags?`
Tags: ${_.tags}`:""}`).join(`

`)}catch(m){return`Note search failed: ${m.message}`}case"list_notes":try{const m=Math.min(t.limit||10,50),E=t.tag,p=t.pinned_only===!0,y=["user_id = ?"],_=[s];E&&(y.push("tags LIKE ?"),_.push(`%${E}%`)),p&&y.push("is_pinned = 1"),_.push(m);const x=(await n.prepare(`SELECT id, title, content, tags, is_pinned, updated_at FROM notes
           WHERE ${y.join(" AND ")} ORDER BY is_pinned DESC, updated_at DESC LIMIT ?`).bind(..._).all()).results||[];return x.length===0?"No notes found.":x.map(D=>`[#${D.id}] ${D.is_pinned?"📌 ":""}${D.title||"Untitled"} (${D.updated_at})
${D.content.slice(0,150)}${D.content.length>150?"...":""}`).join(`

`)}catch(m){return`Failed to list notes: ${m.message}`}case"delete_note":try{const m=t.id;return m?(await n.prepare("DELETE FROM notes WHERE id = ? AND user_id = ?").bind(m,s).run()).meta.changes?`Note #${m} deleted.`:`Note #${m} not found.`:"Note ID is required."}catch(m){return`Failed to delete note: ${m.message}`}case"browser_task":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"browser_use_api_key").first();if(!m)return"Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key (get one at cloud.browser-use.com).";const E=(await J(m.encrypted_value,r)).trim();let p,y=t.task,_,T;if(!t.site_name)try{const L=await n.prepare("SELECT name FROM site_credentials WHERE user_id = ?").bind(s).all(),P=y.toLowerCase(),K=(L.results||[]).find(Q=>P.includes(Q.name.toLowerCase()));K&&(t={...t,site_name:K.name},os("browser_task auto-vault: inferred site_name from task text",{siteName:K.name,userId:s}))}catch{}if(t.site_name)try{const L=await n.prepare("SELECT id, encrypted_blob FROM site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE").bind(s,t.site_name).first();if(L){const P=JSON.parse(await J(L.encrypted_blob,r));p={username:P.username,password:P.password},T=P.sessionId,_=L.id,y=`${y}

When prompted to log in, use username {username} and password {password}.`}}catch{}const x=async L=>{if(_)try{const P=await n.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(_,s).first();if(!P)return;const K=JSON.parse(await J(P.encrypted_blob,r));K.sessionId=L,await n.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(await kt(JSON.stringify(K),r),_,s).run()}catch{}},D=async()=>{if(!(!_||!T))try{const L=await n.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(_,s).first();if(!L)return;const P=JSON.parse(await J(L.encrypted_blob,r));delete P.sessionId,await n.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(await kt(JSON.stringify(P),r),_,s).run()}catch{}},A=/blue[\s-]?dart[\s\S]{0,100}?(\d{10,11})|(\d{10,11})[\s\S]{0,100}?blue[\s-]?dart/i.exec(y);if(A){const L=A[1]||A[2];y=Pi(L)}const O=void 0;g&&(g.apiKey=E,T&&!g.sessionId?(g.sessionId=T,g.persistSession=!0):!g.sessionId&&_&&(g.sessionId=await $i(E)??void 0)),os("browser_task starting",{userId:s,channel:f,timeoutMs:O??3e5,sessionId:g==null?void 0:g.sessionId,vaultSession:!!T});const C=await br(y,E,{secrets:p,sessionId:g==null?void 0:g.sessionId,timeoutMs:O});if(C.status==="completed"){const L=(g==null?void 0:g.sessionId)??void 0;return _&&L&&(g&&(g.persistSession=!0),await x(L)),(W=C.output)!=null&&W.includes('"captcha_required": true')?"Captcha detected — manual verification required. The site blocked automated access. Please try completing it manually or try again later.":C.output??"[NO-OUTPUT] Browser task completed but returned no content — do NOT invent or summarise what the site may have contained. Tell the user the browser returned nothing and suggest they try again."}if(C.status==="timeout"){g&&(g.hasActiveTask=!0);try{await new X(n).store(s,"context",`Browser task in progress: ${C.taskId}`,JSON.stringify({task_id:C.taskId,task:t.task}),9,"working")}catch{}try{const L=(t.task||"").substring(0,200);await n.prepare("INSERT INTO pending_browser_tasks (user_id, task_id, task_description, thread_id, channel) VALUES (?, ?, ?, ?, ?)").bind(s,C.taskId,L,(g==null?void 0:g.threadId)??null,f).run()}catch{}return`[BROWSER_TIMEOUT:${C.taskId}] Browser task did not finish within the time limit. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up."`}T&&E&&an(T,E).catch(()=>{}),g&&(g.persistSession=!1),await D();const I=[C.error,C.output].filter(Boolean).join(" — ");return`Browser task failed (ID: \`${C.taskId}\`): ${I||"No details returned."} | Operator hint: Check Browser Use dashboard — taskId=${C.taskId}`}catch(m){return await H(n,s,"browser","browser_task",m.message),`Browser task error: ${m.message}`}}case"browser_task_status":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"browser_use_api_key").first();if(!m)return"Browser Use API key not configured.";const E=await J(m.encrypted_value,r),p=await _r(t.task_id,E);if(p.done){try{const y=new X(n),_=await y.search(s,`Browser task in progress: ${t.task_id}`);for(const T of _)await y.remove(T.id,s)}catch{}return p.status==="finished"||p.status==="completed"?p.output?p.output:'[NO-OUTPUT] Browser task finished but returned no content. Do NOT invent or infer what emails or page data might have said. Tell the user: "The browser finished but returned no content — the site may have blocked automation or the login failed. Would you like to try again?"':`Browser task ended with status "${p.status}" and no output. Do NOT retry — report this to the user.`}return`[still-running] Browser task has not finished yet (status: ${p.status}). STOP — do not call browser_task_status again. Tell the user: "The browser is still working — I'll send you a notification as soon as it's done. No need to follow up."`}catch(m){return await H(n,s,"browser","browser_task_status",m.message),`Browser status check error: ${m.message}`}}case"vault_lookup":try{const m=(t.site_name||"").trim();if(!m)return"No site name provided.";const p=((await n.prepare("SELECT name FROM site_credentials WHERE user_id = ? AND name LIKE ? COLLATE NOCASE").bind(s,`%${m}%`).all()).results||[]).map(y=>y.name);return p.length===0?`No vault entries found matching "${m}".`:`Vault entries matching "${m}": ${p.join(", ")}. Use site_name="${p[0]}" in browser_task to inject credentials automatically.`}catch{return"vault_lookup: could not query Secret Vault (table may not exist — run migrations)."}case"search_places":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const E=await J(m.encrypted_value,r),p=await ir(E,t.query,{type:t.type});return p.error?`Places search failed: ${p.error}`:p.results.length===0?`No places found for "${t.query}".`:p.results.map((y,_)=>{const T=y.rating?` ★${y.rating} (${y.userRatingsTotal||0} reviews)`:"",x=y.openNow!==void 0?y.openNow?" · Open now":" · Closed":"",D=y.googleMapsUri?`
   ${y.googleMapsUri}`:"";return`${_+1}. **${y.name}**${T}${x}
   ${y.address}${D}
   [place_id: ${y.placeId}]`}).join(`

`)}catch(m){return await H(n,s,"google_api","search_places",m.message),`Places search error: ${m.message}`}}case"get_place_details":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await J(m.encrypted_value,r),p=await or(E,t.place_id);if(p.error)return`Details lookup failed: ${p.error}`;if(!p.details)return"No details found.";const y=p.details;let _=`**${y.name}**
📍 ${y.address}`;if(y.phone&&(_+=`
📞 ${y.phone}`),y.website&&(_+=`
🌐 ${y.website}`),y.rating&&(_+=`
★ ${y.rating}`),y.googleMapsUri&&(_+=`
📌 ${y.googleMapsUri}`),y.openingHours&&(_+=`

Opening Hours:
${y.openingHours.join(`
`)}`),y.reviews&&y.reviews.length>0){_+=`

Recent Reviews:`;for(const T of y.reviews)_+=`
— ${T.author} (★${T.rating}, ${T.time}): "${T.text}"`}return _}catch(m){return await H(n,s,"google_api","place_details",m.message),`Place details error: ${m.message}`}}case"get_directions":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await J(m.encrypted_value,r),p=await lr(E,t.origin,t.destination,{mode:t.mode||"driving"});if(p.error)return`Directions failed: ${p.error}`;if(!p.route)return"No route found.";const y=p.route;let _=`**${y.startAddress}** → **${y.endAddress}**
`;return _+=`📏 ${y.distance} · ⏱️ ${y.duration}`,y.durationInTraffic&&(_+=` (with traffic: ${y.durationInTraffic})`),_+=`
via ${y.summary}`,_+=`

Steps:`,y.steps.forEach((T,x)=>{_+=`
${x+1}. ${T.instruction} (${T.distance}, ${T.duration})`}),_}catch(m){return await H(n,s,"google_api","directions",m.message),`Directions error: ${m.message}`}}case"get_travel_time":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await J(m.encrypted_value,r),p=await pr(E,t.origin,t.destination,t.mode||"driving");if(p.error)return`Travel time lookup failed: ${p.error}`;let y=`${t.origin} → ${t.destination}: ${p.distance}, ${p.duration}`;return p.durationInTraffic&&(y+=` (with traffic: ${p.durationInTraffic})`),y}catch(m){return await H(n,s,"google_api","travel_time",m.message),`Travel time error: ${m.message}`}}case"translate_text":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await J(m.encrypted_value,r),p=await cr(E,t.text,t.target_language,t.source_language);return p.error?`Translation failed: ${p.error}`:`[${p.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${p.translatedText}`}catch(m){return await H(n,s,"google_api","translate",m.message),`Translation error: ${m.message}`}}case"search_youtube":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await J(m.encrypted_value,r),p=await ur(E,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return p.error?`YouTube search failed: ${p.error}`:p.results.length===0?`No YouTube results for "${t.query}".`:p.results.map((y,_)=>{var T;return`${_+1}. **${y.title}**
   ${y.channelTitle} · ${((T=y.publishedAt)==null?void 0:T.split("T")[0])||""}
   ${y.description}
   ${y.url}`}).join(`

`)}catch(m){return await H(n,s,"google_api","youtube_search",m.message),`YouTube search error: ${m.message}`}}case"geocode_address":{if(!r)return"Authentication context unavailable.";try{const m=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,"google_api_key").first();if(!m)return"Google API Key not configured.";const E=await J(m.encrypted_value,r),p=await dr(E,t.address);return p.error?`Geocoding failed: ${p.error}`:p.results.length===0?`Location not found: "${t.address}"`:p.results.map((y,_)=>`${_+1}. ${y.address}
   Coordinates: ${y.lat}, ${y.lng}`).join(`
`)}catch(m){return await H(n,s,"google_api","geocode",m.message),`Geocoding error: ${m.message}`}}case"parse_document":{const m=t.file_id,E=t.extract_focus;if(!m)return"file_id is required to parse a document.";const p=await n.prepare("SELECT file_name, file_type, file_data, file_size, extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(m,s).first();if(!p)return"File not found. The file may have expired or the file_id is incorrect.";if(p.extracted_text)return`Document: ${p.file_name}

${p.extracted_text}`;const{file_name:y,file_type:_}=p;let{file_data:T}=p;if(T==="r2"){if(!u)return`File "${y}" is stored in R2 but no storage bucket is configured.`;const x=await u.get(m);if(!x)return`File "${y}" not found in storage. It may have been deleted.`;const D=await x.arrayBuffer();T=Buffer.from(D).toString("base64")}if(_.startsWith("text/"))try{const x=Buffer.from(T,"base64").toString("utf-8");return`Document: ${y}

${x.substring(0,2e4)}`}catch{return`Could not decode text file: ${y}`}if(_==="application/pdf"||_==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||y.toLowerCase().endsWith(".pdf")||y.toLowerCase().endsWith(".docx")){if(_==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||y.toLowerCase().endsWith(".docx")){try{const A=await Er(Buffer.from(T,"base64"));if(A.length>50){try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(A,m,s).run();const O=A.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind(O,A.substring(0,5e4),m,s).run(),h!=null&&h.ai&&(h!=null&&h.vectorize)){const C=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,s).first();if(C){const{indexDocumentChunks:I}=await Promise.resolve().then(()=>Ke);I({DB:n,AI:h.ai,VECTORIZE:h.vectorize},s,C.id,A).catch(()=>{})}}}catch{}return`Document: ${y}

${A.substring(0,2e4)}`}}catch{}return`Could not extract text from "${y}". Try uploading to Google Drive and sharing the link — Drive can open and export Word documents directly.`}let x=null,D="claude-sonnet-4-6";for(const A of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const O=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,A).first();if(O&&r){const C=await J(O.encrypted_value,r),I=JSON.parse(C);if(I.provider==="anthropic"){x=I.apiKey,I.model&&(D=I.model);break}}}catch{}if(x)try{const A=E?`Focus specifically on extracting: ${E}`:"Extract and return all readable text content from this document. Preserve structure where relevant.",O=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":x,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:D,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:T}},{type:"text",text:A}]}]})});if(O.ok){const I=(($=(ne=(await O.json()).content)==null?void 0:ne[0])==null?void 0:$.text)||"";if(I&&I.length>50)try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(I,m,s).run();const L=I.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind(L,I.substring(0,5e4),m,s).run(),h!=null&&h.ai&&(h!=null&&h.vectorize)){const P=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,s).first();if(P){const{indexDocumentChunks:K}=await Promise.resolve().then(()=>Ke);K({DB:n,AI:h.ai,VECTORIZE:h.vectorize},s,P.id,I).catch(()=>{})}}}catch{}return`Document: ${y}

${I}`}else{const C=await O.text();return`Could not parse ${y} via Anthropic API: ${C.substring(0,200)}`}}catch(A){return`Document parsing error for ${y}: ${A.message}`}return"To parse PDF documents, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set."}if(_.startsWith("image/")){let x=null,D="claude-sonnet-4-6";for(const O of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const C=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(s,O).first();if(C&&r){const I=await J(C.encrypted_value,r),L=JSON.parse(I);if(L.provider==="anthropic"){x=L.apiKey,L.model&&(D=L.model);break}}}catch{}if(!x)return"To extract text from images, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set.";const A=E?`Focus specifically on: ${E}`:"Extract all visible text from this image. Include any text from signs, documents, screenshots, or diagrams. If the image contains charts or tables, describe their structure and data.";try{const O=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":x,"anthropic-version":"2023-06-01","content-type":"application/json"},body:JSON.stringify({model:D,max_tokens:4096,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:_,data:T}},{type:"text",text:A}]}]})});if(O.ok){const I=((q=(z=(await O.json()).content)==null?void 0:z[0])==null?void 0:q.text)||"";if(I&&I.length>50)try{await n.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ? AND user_id = ? AND extracted_text IS NULL").bind(I,m,s).run();const L=I.substring(0,600);if(await n.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ? AND extracted_text IS NULL").bind(L,I.substring(0,5e4),m,s).run(),h!=null&&h.ai&&(h!=null&&h.vectorize)){const P=await n.prepare("SELECT dl.id FROM document_library dl LEFT JOIN document_chunks dc ON dc.document_id = dl.id WHERE dl.file_id = ? AND dl.user_id = ? AND dc.id IS NULL LIMIT 1").bind(m,s).first();if(P){const{indexDocumentChunks:K}=await Promise.resolve().then(()=>Ke);K({DB:n,AI:h.ai,VECTORIZE:h.vectorize},s,P.id,I).catch(()=>{})}}}catch{}return`Document: ${y}

${I}`}else{const C=await O.text();return`Could not parse ${y} via Anthropic API: ${C.substring(0,200)}`}}catch(O){return`Image parsing error for ${y}: ${O.message}`}}try{const x=Buffer.from(T,"base64").toString("utf-8").substring(0,2e3);return`Document: ${y} (${_})

Content preview:
${x}`}catch{return`Cannot read file: ${y} (${_})`}}case"search_library":{const m=t.query,E=Math.min(typeof t.limit=="number"?t.limit:10,20);if(!m)return"query is required for search_library.";if(h!=null&&h.ai&&(h!=null&&h.vectorize))try{const{semanticDocumentSearch:x}=await Promise.resolve().then(()=>Ke),D=await x({DB:n,AI:h.ai,VECTORIZE:h.vectorize},s,m,E);if(D.length>0){const A=D.map(O=>`[id:${O.document_id}] "${O.filename}" (relevance: ${(O.relevance_score*100).toFixed(1)}%)
  Snippet: ${O.chunk.substring(0,350)}`).join(`

`);return`Found ${D.length} semantically relevant document(s) for "${m}":

${A}

Use read_library_file with the id to get the full document text.`}}catch{}const p=await n.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, dl.extracted_text as dl_extracted
        FROM document_library dl
        WHERE dl.user_id = ?
          AND (dl.name LIKE ? OR dl.summary LIKE ? OR dl.extracted_text LIKE ?)
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(s,`%${m}%`,`%${m}%`,`%${m}%`,E).all(),y=await n.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, uf.extracted_text as dl_extracted
        FROM document_library dl
        JOIN uploaded_files uf ON dl.file_id = uf.id
        WHERE dl.user_id = ? AND uf.user_id = ?
          AND uf.extracted_text LIKE ?
          AND dl.id NOT IN (SELECT id FROM document_library WHERE user_id = ? AND (name LIKE ? OR summary LIKE ? OR extracted_text LIKE ?))
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(s,s,`%${m}%`,s,`%${m}%`,`%${m}%`,`%${m}%`,E).all(),_=[...p.results||[],...y.results||[]].slice(0,E);if(_.length===0)return`No documents found matching "${m}" in your library.`;const T=_.map(x=>{const D=(x.summary||x.dl_extracted||"").substring(0,200);return`[id:${x.id}] "${x.name}" (source: ${x.source}, status: ${x.status})
  Preview: ${D||"(no preview yet — summarize or ask Karna to read it)"}`}).join(`

`);return`Found ${_.length} document(s) matching "${m}":

${T}

Use read_library_file with the id to get full text.`}case"read_library_file":{const m=String(t.id_or_name||"").trim();if(!m)return"id_or_name is required for read_library_file.";const E=parseInt(m,10);let p=null;if(isNaN(E)||(p=await n.prepare(`SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.id = ? AND dl.user_id = ?`).bind(E,s).first()),p||(p=await n.prepare(`SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.user_id = ? AND dl.name LIKE ? LIMIT 1`).bind(s,`%${m}%`).first()),!p)return`Document "${m}" not found. Use search_library to find available documents.`;let y=p.extracted_text||null;if(!y&&p.file_id){const _=await n.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(p.file_id,s).first();y=(_==null?void 0:_.extracted_text)||null}return y||(y=p.summary||null),y?`Document: ${p.name}

${y.substring(0,2e4)}`:`Document "${p.name}" has no extracted text yet. Ask Karna to parse it with parse_document(file_id="${p.file_id}") to extract the text first.`}case"create_skill":{const m=(Z=t.name)==null?void 0:Z.trim(),E=(te=t.description)==null?void 0:te.trim(),p=(ie=t.instructions)==null?void 0:ie.trim();if(!m||!E||!p)return"create_skill requires name, description, and instructions.";let y=m.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"");y||(y=`skill_${Date.now()}`);const _=await n.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(s,`${y}%`).all();(re=_.results)!=null&&re.some(A=>A.slug===y)&&(y=`${y}_${(((me=_.results)==null?void 0:me.length)||0)+1}`);const T=JSON.stringify(t.parameters||{}),x=JSON.stringify(t.required_tools||[]),D=JSON.stringify(t.examples||[]);return await n.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(s,m,y,E,p,T,x,D).run(),`Skill created: **${m}** (invoke as: "${y}")

You can now ask me to run "${m}" at any time. The skill will appear in Settings → Skills. You can also say "run my ${m} skill" to execute it.`}case"list_skills":{const E=t.include_disabled===!0?"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? ORDER BY created_at DESC":"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC",y=(await n.prepare(E).bind(s).all()).results||[];if(y.length===0)return`You haven't created any custom skills yet. Ask me to create one: "Create a skill that..."`;const _=y.map(T=>`• **${T.name}** (${T.slug}): ${T.description} [used ${T.usage_count} times${T.enabled?"":" — disabled"}]`).join(`
`);return`Your custom skills (${y.length}):

${_}`}default:{const m=e,E=await n.prepare("SELECT id, name, description, instructions, required_tools FROM user_skills WHERE user_id = ? AND slug = ? AND enabled = 1").bind(s,m).first();if(E){await n.prepare("UPDATE user_skills SET usage_count = usage_count + 1, last_used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(E.id).run();const p=(()=>{try{return JSON.parse(E.required_tools).join(", ")}catch{return""}})(),y=Object.keys(t).length>0?`

Inputs provided: ${JSON.stringify(t)}`:"";return`[SKILL: ${E.name}] Follow these instructions exactly:

${E.instructions}${y}

${p?`Tools to use: ${p}`:""}

Execute the steps above using your available tools. When complete, provide a clear summary of what was done and any results.`}return`Unknown tool: ${e}`}}}async function Hr(e,t,n,s,r){if(t.length>0&&t[t.length-1].role==="user"){const a="(Previous request did not complete. Please try again.)";await e.storeMessage(n,s,"assistant",a,"{}",r),t.push({id:-1,user_id:n,channel:s,role:"assistant",content:a,metadata:"{}",token_estimate:a.length,created_at:new Date().toISOString()})}}function Fr(e){for(let t=e.length-1;t>=0;t--)if(e[t].role==="assistant"){const n=typeof e[t].content=="string"?e[t].content:"";n.length<300&&/^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(n.trim())&&(e[t]={...e[t],content:"(My previous response was cut off before completing. Starting fresh.)"});break}}async function ds(e,t,n,s,r,a,i){var ie,re,me,m,E;const o=new X(t),l=(ie=e.metadata)==null?void 0:ie.thread_id,c=Date.now(),[d,u,h,f]=await Promise.all([o.buildContext(s.id),On(t,s.id),Wn(t,s.id),Or(t,s.id)]),g=await o.getRecentConversations(s.id,30,l);await Hr(o,g,s.id,e.channel,l);const v=Br(s,d,e.channel,h,f,u),w=Fn(g),b=qn([{role:"system",content:v},...Hn(g),{role:"user",content:e.text}]);$r(b,w),Fr(b);const S=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],R=(d.match(/^- /gm)||[]).length;if(S.some(p=>p.test(e.text))||R<3)try{const p=await o.searchLongTerm(s.id,e.text,5);if(p.length>0){const y=p.map(_=>`- [${_.type}] ${_.title}: ${_.content}`).join(`
`);b.splice(b.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${y}]`})}}catch{}await o.storeMessage(s.id,e.channel,"user",e.text,"{}",l);const N=(i==null?void 0:i.maxTurns)??10,U=(i==null?void 0:i.tools)??await Gn(t,s.id);let M="",G=0;const W=[];let ne,$=0,z=0;const q={hasActiveTask:!1,persistSession:!1,threadId:l,channel:e.channel};for(let p=0;p<N;p++){$=p+1;try{p>0&&Ur(b);const y=await n.chat(b,{tools:U,toolChoice:p===0&&(i!=null&&i.forceToolUseOnFirstTurn)?"required":void 0});if(y.usage&&(G+=y.usage.promptTokens+y.usage.completionTokens),y.toolCalls&&y.toolCalls.length>0){const _=y.content||"(tools executed)";b.push({role:"assistant",content:_});for(const x of y.toolCalls)W.push(x.name);const T=await Promise.all(y.toolCalls.map(async x=>{try{const D=await Bt(x.name,x.arguments,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE},q);ne=Mr(x.name,x.arguments,D,ne);const A=["parse_document","drive_read_file","read_library_file"].includes(x.name)?2e4:8e3,O=D.length>A?D.substring(0,A)+`
[...result truncated to prevent token limit — full content was extracted]`:D;return`[Tool Result for ${x.name}]: ${O}`}catch(D){return z++,await H(t,s.id,"tool",x.name,D.message||"Tool execution failed"),`[Tool Error for ${x.name}]: ${D.message||"Execution failed"}`}}));b.push({role:"user",content:T.join(`

`)});continue}M=y.content;break}catch(y){if(r){const _=y.message||"",T=_.includes("401")||_.includes("403")||_.includes("authentication")||_.includes("credit balance"),x=_.includes("429"),D=T?1440:x?10:5;await r.recordError(n.name,_,D)}throw await H(t,s.id,"llm","provider_error",y.message||"Unknown LLM error",{provider:n.name,turn:p}),y}}if(M=(M==null?void 0:M.trim())??"",!M)try{((re=b[b.length-1])==null?void 0:re.role)==="user"&&b.push({role:"assistant",content:"[gathering results]"}),b.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),M=(await n.chat(b,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me directly and I will answer from my knowledge."}catch{M="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge."}if(r&&G>0)try{await r.recordUsage(n.name,G)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,n.name,"full",G,Date.now()-c,1,e.channel).run()}catch{}const Z=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your|the)\s+(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc|(saved|stored)\s+(it\s+|the\s+essay\s+|the\s+article\s+)?(to|in|on)\s+(your\s+)?(google\s+)?drive|essay\s+(is\s+)?(saved|stored)\s+(in|on|to)\s+(drive|google\s+docs?))\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created or saved a Google Document but create_doc was never called. You MUST call create_doc NOW with the full content in the content parameter.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const p of Z){const y=p.claimPattern.test(M),_=p.requiredTools.some(T=>W.includes(T));if(y&&!_){try{await H(t,s.id,"llm",p.logType,"LLM claimed action without tool call",{response:M.substring(0,200)}),b.push({role:"assistant",content:M}),b.push({role:"user",content:p.enforcementMsg});const T=await n.chat(b,{tools:U.filter(x=>p.requiredTools.includes(x.name)),temperature:0});if((me=T.toolCalls)!=null&&me.length){for(const D of T.toolCalls){const A=await Bt(D.name,D.arguments,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE});W.push(D.name),b.push({role:"assistant",content:"",toolCalls:T.toolCalls}),b.push({role:"user",content:A})}const x=await n.chat(b,{tools:[]});x.content&&(M=x.content)}else M="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}let te=M.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim();if(!te&&W.length>0){const p=[...new Set(W)].join(", ");try{((m=b[b.length-1])==null?void 0:m.role)==="user"&&b.push({role:"assistant",content:"[completed tools]"}),b.push({role:"user",content:"Please summarise what you just did and provide the result to the user."}),te=((E=(await n.chat(b,{tools:[]})).content)==null?void 0:E.trim())||`Done. I used the following tools: ${p}.`}catch{te=`Done. I used the following tools: ${p}.`}}await o.storeMessage(s.id,e.channel,"assistant",$t(te),Ar(W,ne),l);try{const p=await t.prepare("SELECT COUNT(*) as c FROM conversations WHERE user_id = ? AND role = ?").bind(s.id,"assistant").first();p&&p.c%5===0&&p.c>0&&await Promise.race([fo(t,n,s,o,b),new Promise(y=>setTimeout(y,5e3))])}catch{}return W.length>=3&&Promise.race([Nr(t,n,s,e.text,W,$,z===0),new Promise(p=>setTimeout(p,6e3))]).catch(()=>{}),q.sessionId&&q.apiKey&&!q.hasActiveTask&&!q.persistSession&&an(q.sessionId,q.apiKey).catch(()=>{}),te}async function fo(e,t,n,s,r){var d;const a=r.filter(u=>u.role!=="system").slice(-10);if(a.length<4)return;const o=[{role:"system",content:`Review this conversation and extract any information worth remembering long-term.
Only extract genuinely durable information — things that will still be relevant in future conversations.
Good examples: addresses, phone numbers, account IDs, spreadsheet IDs, document links, explicit preferences, recurring needs, key decisions.
Bad examples: temporary topics, one-off requests, information already in the system prompt.

For each item, output a line: TYPE|TITLE|CONTENT|IMPORTANCE
Types: fact, preference, context, decision
Importance: 1-10 (8+ = standing rules, 5-7 = regular facts)
If nothing worth extracting, output: NONE`},...a,{role:"user",content:"Extract durable information from the above conversation."}],c=((d=(await t.chat(o,{tools:[]})).content)==null?void 0:d.trim())||"";if(!(!c||c==="NONE"))for(const u of c.split(`
`)){const h=u.trim().split("|");if(h.length<4)continue;const[f,g,v,w]=h,b=["fact","preference","context","decision","summary","task"].find(R=>R===f.trim().toLowerCase());if(!b||!(g!=null&&g.trim())||!(v!=null&&v.trim()))continue;const S=Math.min(10,Math.max(1,parseInt(w)||5));await s.store(n.id,b,g.trim(),v.trim(),S,"long_term")}}const us={"claude-opus-4-8":1e6,"claude-sonnet-4-6":1e6,"claude-haiku-4-5":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function yo(e){for(const[t,n]of Object.entries(us))if(e.toLowerCase().includes(t.toLowerCase()))return n;return us.default}function vo(e,t,n,s){const r=yo(s),a=Math.floor(r*.75),i=[];let o=0,l=!1;const c=fn(e);i.push({role:"system",content:e}),o+=c;const d=fn(n);o+=d;const u=a-o,h=[];let f=0;for(let g=t.length-1;g>=0;g--){const v=t[g],w=fn(v.content);if(f+w<=u)h.unshift({role:v.role,content:v.content}),f+=w;else{l=!0;break}}return i.push(...h),i.push({role:"user",content:n}),o+=f,{maxTokens:r,usedTokens:o,messages:i,wasTruncated:l}}async function*wo(e,t,n,s,r,a){var me,m,E;const i=new X(t),o=(me=e.metadata)==null?void 0:me.thread_id,l=Date.now();yield{type:"thinking",data:{threadId:o,provider:n.name}};const[c,d,u,h]=await Promise.all([i.buildContext(s.id),On(t,s.id),Wn(t,s.id),Or(t,s.id)]),f=await i.getRecentConversations(s.id,30,o);await Hr(i,f,s.id,e.channel,o);const g=Br(s,c,e.channel,u,h,d),v=Fn(f),w=qn([...Hn(f)]);let b=e.text;v&&(b=`${xn}

${e.text}`);const S=vo(g,w.map(p=>({role:p.role,content:p.content})),b,n.name);await i.storeMessage(s.id,e.channel,"user",e.text,"{}",o);const R=await Gn(t,s.id),B=10;let N="",U=0;const M=[...S.messages],G=[];let W,ne=0,$=0;const z={hasActiveTask:!1,persistSession:!1,threadId:o,channel:e.channel},q=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],Z=(c.match(/^- /gm)||[]).length;if(q.some(p=>p.test(e.text))||Z<3||v)try{const p=await i.searchLongTerm(s.id,e.text,5);if(p.length>0){const y=p.map(_=>`- [${_.type}] ${_.title}: ${_.content}`).join(`
`);M.splice(M.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${y}]`})}}catch{}Fr(M);const ie=()=>Ar(G,W);for(let p=0;p<B;p++){ne=p+1;try{p>0&&(yield{type:"thinking",data:{threadId:o}},Ur(M));const y=await n.chat(M,{tools:R});if(y.usage&&(U+=y.usage.promptTokens+y.usage.completionTokens),y.toolCalls&&y.toolCalls.length>0){const x=((m=y.content)==null?void 0:m.trim())??"";x&&x.length<=150&&!/^\[calling:/i.test(x)&&(yield{type:"chunk",data:{text:y.content,threadId:o}});const D=y.content||"(tools executed)";M.push({role:"assistant",content:D});const A=[];for(const O of y.toolCalls){yield{type:"tool_start",data:{tool:O.name,toolArgs:O.arguments,threadId:o}},G.push(O.name);try{const C=(Q,Y)=>Bt(Q,Y,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE},z);let I;if(O.name==="research"&&(yield{type:"research_ack",data:{message:(O.arguments.depth||"quick")==="thorough"?"Starting deep research with Opus 4.8 — planning queries, reading sources, and identifying gaps. This takes 2-4 minutes.":"Researching with Opus 4.8... (~45 seconds)",threadId:o}}),O.name==="browser_task"||O.name==="browser_task_status"){if(O.name==="browser_task"){const pe=O.arguments.site_name;yield{type:"browser_ack",data:{message:pe?`Starting now — opening ${pe} in a browser. I'll notify you when done.`:"Starting now — running browser task. I'll notify you when done.",startedAt:new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:s.timezone||"UTC"}),threadId:o}}}const Y=["Still working — browser launched, navigating to site...","Still working — page loaded, scanning for content...","Still working — reading and extracting results...","Still working — almost there, finalising output...","Taking a bit longer — site may require extra steps...","Still running — browser is working through the page...","Continuing — extracting and processing data...","Still going — complex task, nearly there...","Almost done — wrapping up the browser session...","Still running — holding on a little longer...","Browser is still active — this one is taking time...","Patience — still working through the task...","Still running — will have a result for you shortly..."],oe=C(O.name,O.arguments);let ce=0;e:for(;;){const pe=await Promise.race([oe.then(ve=>({done:!0,r:ve})),new Promise(ve=>setTimeout(()=>ve({done:!1}),15e3))]);if(pe.done){I=pe.r;break e}O.name==="browser_task"?yield{type:"browser_progress",data:{message:Y[Math.min(ce,Y.length-1)],elapsed_s:(ce+1)*15,threadId:o}}:yield{type:"thinking",data:{threadId:o}},ce++}if(O.name==="browser_task"){const pe=I.match(/^\[BROWSER_TIMEOUT:([^\]]+)\]/);if(pe){yield{type:"browser_progress",data:{message:"Task still running — checking final status...",threadId:o}};const ve=C("browser_task_status",{task_id:pe[1]});e:for(;;){const Ie=await Promise.race([ve.then(Ue=>({done:!0,r:Ue})),new Promise(Ue=>setTimeout(()=>Ue({done:!1}),15e3))]);if(Ie.done){I=Ie.r;break e}yield{type:"thinking",data:{threadId:o}}}if(!I.startsWith("[still-running]")&&!I.startsWith("[NO-OUTPUT]")&&!I.startsWith("Browser"))try{await t.prepare("DELETE FROM pending_browser_tasks WHERE user_id = ? AND task_id = ? AND notified = 0").bind(s.id,pe[1]).run()}catch{}}}}else I=await C(O.name,O.arguments);let L=I;(O.name==="browser_task"||O.name==="browser_task_status")&&(/^\[BROWSER_TIMEOUT:/.test(L)?L="Task timed out — still running in background.":/^\[NO-OUTPUT\]/.test(L)?L="Browser task finished but returned no content.":/^\[still-running\]/.test(L)?L="Still running — will notify when done.":L=L.replace(/\s*\|\s*Operator hint:.*$/s,"")),yield{type:"tool_end",data:{tool:O.name,toolResult:L.substring(0,500)+(L.length>500?"...":""),threadId:o}};const P=["parse_document","drive_read_file","read_library_file"].includes(O.name)?2e4:8e3,K=I.length>P?I.substring(0,P)+`
[...result truncated to prevent token limit — full content was extracted]`:I;W=Mr(O.name,O.arguments,I,W),A.push(`[Tool Result for ${O.name}]: ${K}`)}catch(C){$++,await H(t,s.id,"tool",O.name,C.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:O.name,toolResult:`Error: ${C.message||"Execution failed"}`,threadId:o}},A.push(`[Tool Error for ${O.name}]: ${C.message||"Execution failed"}`)}}M.push({role:"user",content:A.join(`

`)});continue}N=y.content;const _=$t(N);await i.storeMessage(s.id,e.channel,"assistant",_,ie(),o);const T=50;for(let x=0;x<_.length;x+=T)yield{type:"chunk",data:{text:_.substring(x,x+T),threadId:o}},x+T<_.length&&await new Promise(A=>setTimeout(A,10));break}catch(y){if(r){const x=y.message||"",D=x.includes("401")||x.includes("403")||x.includes("authentication")||x.includes("credit balance"),A=x.includes("429"),O=D?1440:A?10:5;await r.recordError(n.name,x,O)}await H(t,s.id,"llm","provider_error",y.message||"Unknown LLM error",{provider:n.name,turn:p});const _=y.message||"An error occurred",T=_.includes("429")||_.toLowerCase().includes("rate limit")||_.toLowerCase().includes("too many requests")?"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.":_;try{await i.storeMessage(s.id,e.channel,"assistant",`⚠️ ${T}`,"{}",o)}catch{}yield{type:"error",data:{error:T,threadId:o}};return}}if(N=(N==null?void 0:N.trim())??"",!N)try{M.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),N=(await n.chat(M,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me to answer directly from my knowledge.";const y=$t(N);await i.storeMessage(s.id,e.channel,"assistant",y,ie(),o);const _=50;for(let T=0;T<y.length;T+=_)yield{type:"chunk",data:{text:y.substring(T,T+_),threadId:o}},T+_<y.length&&await new Promise(x=>setTimeout(x,10))}catch{N="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.",await i.storeMessage(s.id,e.channel,"assistant",N,ie(),o).catch(()=>{}),yield{type:"chunk",data:{text:N,threadId:o}}}if(r&&U>0)try{await r.recordUsage(n.name,U)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,n.name,"full",U,Date.now()-l,1,e.channel).run()}catch{}const re=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your\s+|the\s+)(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc|(saved|stored)\s+(it\s+|the\s+essay\s+|the\s+article\s+)?(to|in|on)\s+(your\s+)?(google\s+)?drive|essay\s+(is\s+)?(saved|stored)\s+(in|on|to)\s+(drive|google\s+docs?))\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created or saved a Google Document but create_doc was never called. You MUST call create_doc NOW with the full content in the content parameter.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const p of re){const y=p.claimPattern.test(N),_=p.requiredTools.some(T=>G.includes(T));if(y&&!_){try{await H(t,s.id,"llm",p.logType,"LLM claimed action without tool call (streaming)",{response:N.substring(0,200)}),M.push({role:"assistant",content:N}),M.push({role:"user",content:p.enforcementMsg});const T=await n.chat(M,{tools:R.filter(x=>p.requiredTools.includes(x.name)),temperature:0});if((E=T.toolCalls)!=null&&E.length){for(const D of T.toolCalls){const A=await Bt(D.name,D.arguments,t,s.id,{agentType:"full",providerName:n.name,channel:e.channel},s.pin_hash,a==null?void 0:a.GOOGLE_CLIENT_ID,a==null?void 0:a.GOOGLE_CLIENT_SECRET,a==null?void 0:a.GOOGLE_API_KEY,a==null?void 0:a.GOOGLE_CSE_ID,s.timezone,n,a==null?void 0:a.DOCUMENTS_BUCKET,{ai:a==null?void 0:a.AI,vectorize:a==null?void 0:a.VECTORIZE});G.push(D.name),M.push({role:"assistant",content:"",toolCalls:T.toolCalls}),M.push({role:"user",content:A})}const x=await n.chat(M,{tools:[]});x.content&&(N=x.content)}else N="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}G.length>=3&&Promise.race([Nr(t,n,s,e.text,G,ne,$===0),new Promise(p=>setTimeout(p,6e3))]).catch(()=>{}),z.sessionId&&z.apiKey&&!z.hasActiveTask&&!z.persistSession&&an(z.sessionId,z.apiKey).catch(()=>{}),yield{type:"done",data:{threadId:o,provider:n.name,tokenCount:U}}}async function kn(e,t,n,s,r,a,i,o){await a.storeMessage(r.id,t.channel,"user",t.text,"{}",o);const l=await Bt(e.tool,e.args,n,r.id,{agentType:"direct",channel:t.channel},r.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,r.timezone,s,i==null?void 0:i.DOCUMENTS_BUCKET,{ai:i==null?void 0:i.AI,vectorize:i==null?void 0:i.VECTORIZE}),c=`[TOOLS_USED: ${e.tool}] ${l}`.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"");return await a.storeMessage(r.id,t.channel,"assistant",c,"{}",o),l}async function zn(e,t,n,s,r,a){var v;const i=new X(t),o=(v=e.metadata)==null?void 0:v.thread_id,l=await i.buildContext(s.id),c=await i.getRecentConversations(s.id,6,o),d=Mn(e.text,l,Lr(c));if(d.agent==="conversation")return qr(e,t,n,s,l,r,o);const u=Bn(e.text);if(u)return kn(u,e,t,n,s,i,a,o);const h=(await i.getRecentConversations(s.id,10,o)).map(w=>w.content).join(`
`),f=Pn(e.text,h);if(f)return kn(f,e,t,n,s,i,a,o);const g=d.confidence>=.85;if(e.channel==="telegram"){const w=await Gn(t,s.id);return ds(e,t,n,s,r,a,{maxTurns:10,tools:w,forceToolUseOnFirstTurn:g})}return ds(e,t,n,s,r,a,{forceToolUseOnFirstTurn:g})}async function qr(e,t,n,s,r,a,i){const o=new X(t),l=Date.now(),c=Pr(s.timezone),d=await Wn(t,s.id),u=d?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. Do not store copies in memory or contradict them.
${d}

${r}`:r,h=xr("conversation",s,u,s.timezone,c,e.channel),f=(await o.getRecentConversations(s.id,30,i)).filter(R=>!R.content.startsWith("[Autonomous Scheduled Task]")&&!R.content.startsWith("[Scheduled Reminder]")),g=Fn(f),v=qn([{role:"system",content:h},...Hn(f),{role:"user",content:e.text}]);$r(v,g),await o.storeMessage(s.id,e.channel,"user",e.text,"{}",i);let w=0,b="";try{const R=await n.chat(v,{temperature:.8});R.usage&&(w=R.usage.promptTokens+R.usage.completionTokens),b=R.content}catch(R){if(a){const B=R.message||"",N=B.includes("401")||B.includes("403")||B.includes("authentication")||B.includes("credit balance"),U=B.includes("429"),M=N?1440:U?10:5;await a.recordError(n.name,B,M)}throw await H(t,s.id,"llm","conversation_error",R.message,{provider:n.name}),R}if(a&&w>0)try{await a.recordUsage(n.name,w)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(s.id,n.name,"conversation",w,Date.now()-l,1,e.channel).run()}catch{}const S=$t(b);return await o.storeMessage(s.id,e.channel,"assistant",S,"{}",i),S}async function*ms(e,t,n,s,r,a,i,o){yield{type:"tool_start",data:{tool:e.tool,toolArgs:e.args,threadId:o}};const l=await kn(e,t,n,s,r,a,i,o);yield{type:"tool_end",data:{tool:e.tool,toolResult:l.substring(0,500)+(l.length>500?"...":""),threadId:o}};const c=$t(l),d=50;for(let u=0;u<c.length;u+=d)yield{type:"chunk",data:{text:c.substring(u,u+d),threadId:o}},u+d<c.length&&await new Promise(h=>setTimeout(h,10));yield{type:"done",data:{threadId:o,provider:s.name,tokenCount:0}}}async function*bo(e,t,n,s,r,a){var u;const i=new X(t),o=(u=e.metadata)==null?void 0:u.thread_id,l=await i.buildContext(s.id),c=await i.getRecentConversations(s.id,6,o),d=Mn(e.text,l,Lr(c));if(yield{type:"thinking",data:{threadId:o,provider:n.name}},d.agent!=="conversation"){const h=Bn(e.text);if(h){yield*ms(h,e,t,n,s,i,a,o);return}const f=(await i.getRecentConversations(s.id,10,o)).map(v=>v.content).join(`
`),g=Pn(e.text,f);if(g){yield*ms(g,e,t,n,s,i,a,o);return}yield*wo(e,t,n,s,r,a);return}try{const h=await qr(e,t,n,s,l,r,o),f=50;for(let g=0;g<h.length;g+=f)yield{type:"chunk",data:{text:h.substring(g,g+f),threadId:o}},g+f<h.length&&await new Promise(v=>setTimeout(v,10))}catch(h){yield{type:"error",data:{error:h.message||"An error occurred",threadId:o}};return}yield{type:"done",data:{threadId:o,provider:n.name,tokenCount:0}}}const le=new _e;async function _o(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}le.use("/*",_o);le.get("/threads",async e=>{const t=e.get("user"),n=e.req.query("archived")==="1",s=parseInt(e.req.query("limit")||"30"),r=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(t.id,n?1:0,s).all();return e.json({threads:r.results||[]})});le.post("/threads",async e=>{const t=e.get("user"),{title:n}=await e.req.json(),s=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n||"New conversation").first();return e.json({thread:s})});le.put("/threads/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json(),r=[],a=[];return s.title!==void 0&&(r.push("title = ?"),a.push(s.title)),s.is_archived!==void 0&&(r.push("is_archived = ?"),a.push(s.is_archived?1:0)),r.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),r.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});le.delete("/threads/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});le.post("/upload",async e=>{const t=e.get("user"),n=!!e.env.DOCUMENTS_BUCKET,s=n?100*1024*1024:700*1024;let r,a,i,o=null,l=null;try{if((e.req.header("Content-Type")||"").includes("multipart/form-data")){const w=(await e.req.formData()).get("file");if(!w)return e.json({error:"No file provided."},400);if(r=w.name,a=w.type||"application/octet-stream",i=w.size,i>s)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);o=await w.arrayBuffer()}else{const v=await e.req.json();if(!v.file_name||!v.file_data)return e.json({error:"file_name and file_data are required."},400);if(r=v.file_name,a=v.file_type||"application/octet-stream",l=v.file_data,i=v.file_size||Math.round(l.length*.75),i>s)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);if(n){const w=atob(l);o=new ArrayBuffer(w.length);const b=new Uint8Array(o);for(let S=0;S<w.length;S++)b[S]=w.charCodeAt(S)}}const d=crypto.randomUUID();let u;n&&o?(await e.env.DOCUMENTS_BUCKET.put(d,o,{httpMetadata:{contentType:a},customMetadata:{fileName:r,userId:String(t.id)}}),u="r2"):u=l||(o?Buffer.from(o).toString("base64"):""),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(d,t.id,r,a,u,i).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,d,"upload",r,a,i,"uploaded").run();const h=a==="application/pdf"||r.toLowerCase().endsWith(".pdf"),f=a==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||r.toLowerCase().endsWith(".docx");if(f)try{const{extractDocxTextFromBuffer:v}=await Promise.resolve().then(()=>Tr),w=l?Buffer.from(l,"base64"):o?Buffer.from(o):null;if(w){const b=await v(w);if(b.length>50){await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(b,d).run();const S=b.substring(0,600);await e.env.DB.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(S,b.substring(0,5e4),d,t.id).run()}}}catch{}if(h&&t.pin_hash){const v=l||(o?Buffer.from(o).toString("base64"):null),w=t.pin_hash,b=t.id,S=e.env.DB,R=e.env.DOCUMENTS_BUCKET,B=(async()=>{var N,U;try{let M=null,G="claude-sonnet-4-6";const{decrypt:W}=await Promise.resolve().then(()=>rn);for(const Z of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const te=await S.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(b,Z).first();if(te){const ie=await W(te.encrypted_value,w),re=JSON.parse(ie);if(re.provider==="anthropic"){M=re.apiKey,re.model&&(G=re.model);break}}}catch{}if(!M)return;let ne;if(u==="r2"&&R){const Z=await R.get(d);if(!Z)return;ne=Buffer.from(await Z.arrayBuffer()).toString("base64")}else if(v)ne=v;else return;const $=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":M,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:G,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:ne}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!$.ok)return;const q=((U=(N=(await $.json()).content)==null?void 0:N[0])==null?void 0:U.text)||"";if(q){await S.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(q,d).run();const Z=q.substring(0,600);await S.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(Z,q.substring(0,5e4),d,b).run()}}catch{}})();try{e.executionCtx.waitUntil(B)}catch{}}let g="";if(a.startsWith("text/"))try{const v=l||(o?Buffer.from(o).toString("base64"):"");g=Buffer.from(v,"base64").toString("utf-8").substring(0,500)}catch{}return e.json({file_id:d,name:r,type:a,size:i,text_preview:g,storage:n?"r2":"d1",extracting:h&&!f})}catch(c){console.error("File upload error:",c);try{const{logError:d}=await Promise.resolve().then(()=>vt);await d(e.env.DB,t.id,"upload","upload_error",c.message||"Unknown upload error")}catch{}return e.json({error:`Upload failed: ${c.message||"Unknown error"}`},500)}});le.post("/send",async e=>{const t=e.get("user"),{message:n,channel:s="web",thread_id:r,files:a}=await e.req.json();if(!n||typeof n!="string"||n.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(a&&Array.isArray(a)&&a.length>0){i=`

[Attached files:
`;for(const c of a)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=r;if(!o){const c=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n.trim().substring(0,60)+(n.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:t.id,username:t.username,channel:s,text:n.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await Ve(e.env.DB,t.id,t.pin_hash),u=await zn(l,e.env.DB,c,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});return!r&&o?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run():o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),e.json({response:u,timestamp:new Date().toISOString(),channel:l.channel,provider:c.name,thread_id:o})}catch(c){console.error("Chat error:",c);const d=c.message||"";if(d.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400);if(d.includes("All LLM providers failed"))return e.json({error:d,type:"no_provider",thread_id:o},400);if(d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests"))return e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429);const u=d.includes("401")||d.includes("403")||d.includes("authentication")||d.includes("credit balance")||d.includes("invalid")&&d.includes("key");try{const{logError:h}=await Promise.resolve().then(()=>vt);await h(e.env.DB,t.id,"llm","chat_error",d)}catch{}return e.json({error:u?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:d,type:u?"no_provider":void 0,thread_id:o},u?400:500)}});function ps(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}le.post("/stream",async e=>{const t=e.get("user"),{message:n,channel:s="web",thread_id:r,files:a}=await e.req.json();if(!n||typeof n!="string"||n.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(a&&Array.isArray(a)&&a.length>0){i=`

[Attached files:
`;for(const c of a)i+=`- ${c.name} (${c.type}, ${Math.round(c.size/1024)}KB, file_id: ${c.file_id})`,c.text_preview&&(i+=`
  Preview: ${c.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=r;if(!o){const c=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n.trim().substring(0,60)+(n.trim().length>60?"...":"")).first();o=c==null?void 0:c.id}const l={userId:t.id,username:t.username,channel:s,text:n.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:c,rotation:d}=await Ve(e.env.DB,t.id,t.pin_hash),u=new ReadableStream({async start(h){const f=new TextEncoder;try{const g=bo(l,e.env.DB,c,t,d,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});for await(const v of g)v.data.threadId||(v.data.threadId=o),h.enqueue(f.encode(ps(v)));o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),h.close()}catch(g){const v={type:"error",data:{error:g.message||"An error occurred",threadId:o}};h.enqueue(f.encode(ps(v))),h.close()}}});return new Response(u,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(o||"")}})}catch(c){console.error("Stream setup error:",c);const d=c.message||"";return d.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400):d.includes("429")||d.includes("limit reached")||d.includes("rate limit")||d.includes("Too Many Requests")?e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429):e.json({error:"Something went wrong setting up the stream.",details:d,thread_id:o},500)}});le.get("/threads/:id/messages",async e=>{var a;const t=e.get("user"),n=parseInt(e.req.param("id")),s=parseInt(e.req.query("limit")||"50"),r=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,n,s).all();return e.json({messages:(r.results||[]).reverse(),total:((a=r.results)==null?void 0:a.length)||0})});le.get("/history",async e=>{var l;const t=e.get("user"),n=parseInt(e.req.query("limit")||"50"),s=parseInt(e.req.query("offset")||"0"),r=e.req.query("thread_id");let a,i;r?(a=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,parseInt(r),n,s]):(a=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,n,s]);const o=await e.env.DB.prepare(a).bind(...i).all();return e.json({messages:(o.results||[]).reverse(),total:((l=o.results)==null?void 0:l.length)||0})});le.delete("/history",async e=>{const t=e.get("user"),n=e.req.query("thread_id");return n?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(n)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});le.get("/dashboard",async e=>{const t=e.get("user"),[n,s,r,a,i,o,l,c,d,u,h,f,g,v,w]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM user_skills WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM preferences WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval')").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND type='browser_task' AND status='running'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status='failed'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory_suggestions WHERE user_id = ? AND status='pending'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM document_library WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT id, name, mime_type, size, status, source, created_at FROM document_library WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT id, name, description, next_run FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND next_run BETWEEN datetime('now', 'start of day') AND datetime('now', '+1 day', 'start of day') LIMIT 5").bind(t.id).all().catch(()=>({results:[]}))]);return e.json({threads:(n==null?void 0:n.cnt)||0,active_schedules:(s==null?void 0:s.cnt)||0,memories:(r==null?void 0:r.cnt)||0,recent_threads:a.results||[],provider_usage:[],unread_notifications:(i==null?void 0:i.cnt)||0,errors:(o==null?void 0:o.cnt)||0,skills_count:(l==null?void 0:l.cnt)||0,preferences_count:(c==null?void 0:c.cnt)||0,pending_actions:(d==null?void 0:d.cnt)||0,running_browser_tasks:(u==null?void 0:u.cnt)||0,failed_actions:(h==null?void 0:h.cnt)||0,memory_suggestions:(f==null?void 0:f.cnt)||0,documents_count:(g==null?void 0:g.cnt)||0,recent_documents:v.results||[],todays_reminders:w.results||[]})});le.get("/gmail/unread",async e=>{const t=e.get("user");try{const n=e.env.GOOGLE_CLIENT_ID,s=e.env.GOOGLE_CLIENT_SECRET;if(!n||!s)return e.json({count:null,reason:"google_not_configured"});const a=await new Re(e.env.DB,t.id,t.pin_hash,n,s).getUnreadCount();return e.json({count:a})}catch(n){return e.json({count:null,reason:n.message})}});le.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));le.get("/notifications/count",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(n==null?void 0:n.cnt)||0})});le.get("/notifications",async e=>{const t=e.get("user"),n=parseInt(e.req.query("limit")||"20"),s=await e.env.DB.prepare(`SELECT n.id, n.type, n.title, n.body, n.is_read, n.source, n.action_url, n.created_at,
            j.schedule_type, j.schedule_value, j.enabled as cron_enabled
     FROM notifications n
     LEFT JOIN cron_jobs j
       ON n.user_id = j.user_id
       AND n.source LIKE 'cron:%'
       AND CAST(SUBSTR(n.source, 6) AS INTEGER) = j.id
     WHERE n.user_id = ? ORDER BY n.created_at DESC LIMIT ?`).bind(t.id,n).all();return e.json({notifications:s.results||[]})});le.put("/notifications/:id/read",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});le.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});le.delete("/notifications/all",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});le.delete("/notifications/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});le.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const se=new _e;async function Eo(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),await t()}se.use("/*",Eo);se.get("/profile",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(n==null?void 0:n.name)||t.name,personality_prompt:(n==null?void 0:n.personality_prompt)||t.personality_prompt,telegram_chat_id:(n==null?void 0:n.telegram_chat_id)||t.telegram_chat_id,timezone:(n==null?void 0:n.timezone)||t.timezone,assistant_name:(n==null?void 0:n.assistant_name)||"Karna"})});se.put("/profile",async e=>{const t=e.get("user"),n=await e.req.json(),s=["name","personality_prompt","telegram_chat_id","timezone","assistant_name"],r=[],a=[];for(const i of s)n[i]!==void 0&&(r.push(`${i} = ?`),a.push(n[i]));return r.length===0?e.json({error:"No valid fields to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),a.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${r.join(", ")} WHERE id = ?`).bind(...a).run(),e.json({success:!0}))});const Rn=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","tavily_api_key","ntfy_url","ntfy_token","browser_use_api_key"];se.get("/credentials",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT id, service, label, encrypted_value, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all(),s=["llm_slot_1","llm_slot_2","llm_slot_3"],r=await Promise.all((n.results||[]).map(async a=>{let i;if(s.includes(a.service))try{const o=await J(a.encrypted_value,t.pin_hash);i=JSON.parse(o).provider}catch{}return{id:a.id,service:a.service,label:a.label,created_at:a.created_at,updated_at:a.updated_at,configured:!0,...i?{provider_id:i}:{}}}));return e.json({credentials:r,available_services:Rn,llm_providers:At})});function Gr(e){const t=e.trim();return t&&!/^https?:\/\//i.test(t)?"https://"+t:t}se.put("/credentials",async e=>{const t=e.get("user"),n=await e.req.json(),{service:s,label:r}=n;let a=n.value;if(!s||!a)return e.json({error:"Service name and value are required"},400);if(!Rn.includes(s))return e.json({error:`Invalid service. Must be one of: ${Rn.join(", ")}`},400);s==="ntfy_url"&&(a=Gr(a));const i=await kt(a,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,s,r||s,i).run(),e.json({success:!0,service:s})});se.delete("/credentials/:service",async e=>{const t=e.get("user"),n=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,n).run(),e.json({success:!0})});se.get("/memory",async e=>{const t=e.get("user"),n=e.req.query("type"),r=await new X(e.env.DB).getAll(t.id,n||void 0,100);return e.json({memories:r})});se.post("/memory",async e=>{const t=e.get("user"),{type:n,title:s,content:r,importance:a}=await e.req.json();return!n||!s||!r?e.json({error:"Type, title, and content are required"},400):(await new X(e.env.DB).store(t.id,n,s,r,a||5),e.json({success:!0}))});se.delete("/memory/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new X(e.env.DB).remove(n,t.id),e.json({success:!0})});se.get("/preferences",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT id, content, created_at FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t.id).all();return e.json({preferences:n.results||[]})});se.post("/preferences",async e=>{const t=e.get("user"),{content:n}=await e.req.json();return n!=null&&n.trim()?(await e.env.DB.prepare("INSERT INTO preferences (user_id, content) VALUES (?, ?)").bind(t.id,n.trim()).run(),e.json({success:!0})):e.json({error:"Content required"},400)});se.put("/preferences/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{content:s}=await e.req.json();return s!=null&&s.trim()?(await e.env.DB.prepare("UPDATE preferences SET content = ? WHERE id = ? AND user_id = ?").bind(s.trim(),n,t.id).run(),e.json({success:!0})):e.json({error:"Content required"},400)});se.delete("/preferences/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM preferences WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});se.get("/schedules",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:n.results||[]})});se.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{enabled:s}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(s?1:0,n,t.id).run(),e.json({success:!0})});se.delete("/schedules/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});se.get("/errors",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:n.results||[]})});se.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});se.post("/credentials/validate",async e=>{const t=e.get("user"),{service:n,value:s}=await e.req.json();if(!n)return e.json({error:"Service required"},400);let r=s;if(!r){const a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,n).first();if(!a)return e.json({valid:!1,message:"No credential saved for this slot."});try{r=await J(a.encrypted_value,t.pin_hash)}catch{return e.json({valid:!1,message:"Failed to decrypt stored credential."})}}switch(n){case"anthropic":try{const a=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return a.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"openai":try{const a=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${r}`}});return a.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const a=JSON.parse(r);if(!a.provider||!a.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const i=At[a.provider];if(!i)return e.json({valid:!1,message:`Unknown provider: ${a.provider}`});if(i.apiFormat==="anthropic"){const o=await fetch(i.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return o.ok?e.json({valid:!0,message:`${i.label} API key is valid.`}):o.status===401?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${o.status}.`})}else{const o=i.apiBase+(i.validatePath||"/v1/models"),l=await fetch(o,{headers:{Authorization:`Bearer ${a.apiKey}`}});if(l.ok)return e.json({valid:!0,message:`${i.label} API key is valid.`});if(l.status===401||l.status===403)return e.json({valid:!1,message:`Invalid ${i.label} API key.`});if(l.status===404)try{const c=await fetch(i.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.apiKey}`},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return c.ok||c.status===200?e.json({valid:!0,message:`${i.label} API key is valid.`}):c.status===401||c.status===403?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${c.status}.`})}catch(c){return e.json({valid:!1,message:`${i.label} chat test failed: ${c.message}`})}return e.json({valid:!1,message:`${i.label} responded with status ${l.status}.`})}}catch(a){return a instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});case"tavily_api_key":try{const a=await fetch("https://api.tavily.com/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:r,query:"test",max_results:1,search_depth:"basic"})});if(a.ok){const i=await a.json();if(Array.isArray(i.results))return e.json({valid:!0,message:"Tavily API key is valid."})}return a.status===401?e.json({valid:!1,message:"Invalid Tavily API key."}):e.json({valid:!1,message:`Tavily responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"ntfy_url":try{const a=Gr(r);let i;try{const c=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,"ntfy_token").first();c&&(i=(await J(c.encrypted_value,t.pin_hash)).trim())}catch{}const o={Title:"Test",Priority:"3",Tags:"bell,karna","Content-Type":"text/plain"};i&&(o.Authorization=`Bearer ${i}`);const l=await fetch(a,{method:"POST",headers:o,body:"Karna connected ✓"});return l.ok?e.json({valid:!0,message:"Ntfy connected"}):e.json({valid:!1,message:`Ntfy responded with status ${l.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});se.post("/notify/test",async e=>{const t=e.get("user"),{sendNotification:n}=await Promise.resolve().then(()=>xo),{channel:s}=await n(e.env.DB,t.id,"🔔 Karna Test Notification","If you see this on your phone, Ntfy is working correctly.",{pinHash:t.pin_hash,priority:"default",tags:["bell","karna"]});return e.json({channel:s})});se.get("/google/status",async e=>{const t=e.get("user");try{const n=await In(e.env.DB,t.id,t.pin_hash),s=tr(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...n,oauth_client_configured:s})}catch(n){return e.json({connected:!1,error:n.message})}});se.get("/google/auth-url",async e=>{var t;e.get("user");try{const n=e.env.GOOGLE_CLIENT_ID,s=e.env.GOOGLE_CLIENT_SECRET;if(!n||!s)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const r=new URL(e.req.url);let a=`${r.protocol}//${r.host}`;const i=e.req.query("origin");if(i)try{const d=new URL(i);(d.protocol==="https:"||d.hostname==="localhost"||d.hostname==="127.0.0.1")&&(a=d.origin)}catch{}const o=`${a}/auth/google/callback`,l=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),c=Xs(n,o,l);return e.json({auth_url:c,redirect_uri:o})}catch(n){return e.json({error:`Failed to generate auth URL: ${n.message}`},500)}});se.post("/google/disconnect",async e=>{const t=e.get("user");try{return await sr(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(n){return e.json({error:n.message},500)}});se.post("/google/test",async e=>{const t=e.get("user");try{const{token:n,email:s}=await Rt(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),r=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${n}`}}),a=!0,i=r.ok,o=await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile",{headers:{Authorization:`Bearer ${n}`}}),l=o.ok;return e.json({success:!0,email:s,scopes:{sheets:a,calendar:i,docs:a,drive:a,gmail:l},message:i&&l?`Connected as ${s} — all services working.`:`Connected as ${s} — ${l?`calendar access issue (${r.status}).`:`Gmail access issue (${o.status}). Reconnect to grant Gmail permissions.`}`})}catch(n){return e.json({success:!1,error:n.message})}});se.get("/site-vault",async e=>{const t=e.get("user");try{const n=await e.env.DB.prepare("SELECT id, name, created_at, updated_at FROM site_credentials WHERE user_id = ? ORDER BY name ASC").bind(t.id).all();return e.json({entries:n.results||[]})}catch{return e.json({entries:[]})}});se.put("/site-vault",async e=>{const t=e.get("user");try{const{name:n,username:s,password:r,notes:a}=await e.req.json();if(!(n!=null&&n.trim())||!(s!=null&&s.trim())||!(r!=null&&r.trim()))return e.json({error:"name, username, and password are required"},400);const i=JSON.stringify({username:s.trim(),password:r,...a?{notes:a}:{}}),o=await kt(i,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO site_credentials (user_id, name, encrypted_blob)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, name) DO UPDATE SET
         encrypted_blob = excluded.encrypted_blob,
         updated_at = CURRENT_TIMESTAMP`).bind(t.id,n.trim(),o).run(),e.json({success:!0,name:n.trim()})}catch(n){return e.json({error:(n==null?void 0:n.message)||"Failed to save credential"},500)}});se.delete("/site-vault/:id",async e=>{const t=e.get("user");try{const n=Number(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM site_credentials WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})}catch(n){return e.json({error:(n==null?void 0:n.message)||"Failed to delete credential"},500)}});const To=15e3,So={urgent:"5",high:"4",default:"3",low:"2",min:"1"};async function Ze(e,t,n,s,r){try{await e.prepare(`INSERT INTO notifications (user_id, type, title, body, source)
       VALUES (?, 'info', ?, ?, 'ntfy')`).bind(t,n,s).run()}catch(f){console.warn("[sendNotification] in-app insert failed:",t,f==null?void 0:f.message)}let a=r==null?void 0:r.pinHash;if(!a){const f=await e.prepare("SELECT pin_hash FROM users WHERE id = ?").bind(t).first();a=f==null?void 0:f.pin_hash}if(!a)return{sent:!0,channel:"in-app"};let i,o;try{const f=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"ntfy_url").first();if(f){const v=(await J(f.encrypted_value,a)).trim();i=/^https?:\/\//i.test(v)?v:`https://${v}`}const g=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"ntfy_token").first();g&&(o=(await J(g.encrypted_value,a)).trim())}catch(f){return console.warn("[sendNotification] credential decrypt failed:",t,f==null?void 0:f.message),{sent:!0,channel:"in-app"}}if(!i)return{sent:!0,channel:"in-app"};const l=So[(r==null?void 0:r.priority)||"default"]||"3",c=((r==null?void 0:r.tags)||["bell","karna"]).join(","),d={Title:n,Priority:l,Tags:c,"Content-Type":"text/plain"};o&&(d.Authorization=`Bearer ${o}`);const u=new AbortController,h=setTimeout(()=>u.abort(),To);try{const f=await fetch(i,{method:"POST",headers:d,body:s,signal:u.signal});return clearTimeout(h),f.ok?{sent:!0,channel:"ntfy"}:(console.warn(`[sendNotification] ntfy HTTP ${f.status} for user ${t} — check ntfy_url/ntfy_token credentials`),{sent:!0,channel:"ntfy-failed"})}catch(f){return clearTimeout(h),console.warn(`[sendNotification] ntfy push failed for user ${t}: ${(f==null?void 0:f.message)||String(f)}`),{sent:!0,channel:"ntfy-failed"}}}const xo=Object.freeze(Object.defineProperty({__proto__:null,sendNotification:Ze},Symbol.toStringTag,{value:"Module"})),Ne=new _e;Ne.get("/debug/time",e=>{const t=new Date,n=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return e.json({utc_iso:t.toISOString(),utc_ms:t.getTime(),formatted_ist:n.format(t),toLocaleString_ist:t.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});Ne.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const n=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:n,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});Ne.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const n=Date.now()-t;return e.json({status:"ok",latency_ms:n})}catch(t){return e.json({status:"error",error:t.message},500)}});Ne.get("/status",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=n.user_id,[r,a,i,o]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(s).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(s).first()]);return e.json({active_schedules:(r==null?void 0:r.cnt)||0,memory_entries:(a==null?void 0:a.cnt)||0,total_messages:(i==null?void 0:i.cnt)||0,unread_errors:(o==null?void 0:o.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});function hs(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}Ne.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const s=new Date,r=s.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:r})).run()}catch{}const a=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone, u.pin_hash
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(r).all(),i=[];for(const o of a.results||[])try{await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(r,o.id).run();const l=o.user_timezone||"UTC";let c,d=!1,u=o.state||"active";if(o.schedule_type==="interval"){const g=parseInt(o.schedule_value,10);c=new Date(s.getTime()+g*60*1e3)}else if(o.schedule_type==="daily"){const[g,v]=o.schedule_value.split(":").map(Number),w=hs(l),b=new Date(w);b.setHours(g,v,0,0),b<=w&&b.setDate(b.getDate()+1);const S=new Date(b.toLocaleString("en-US",{timeZone:"UTC"})),R=new Date(b.toLocaleString("en-US",{timeZone:l})),B=S.getTime()-R.getTime();c=new Date(b.getTime()+B)}else if(o.schedule_type==="weekly"){const[g,v]=o.schedule_value.split(" "),[w,b]=(v||"00:00").split(":").map(Number),R=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(ne=>ne.toLowerCase()===g.toLowerCase()),B=hs(l),N=new Date(B);N.setHours(w,b,0,0);let U=(R-N.getDay()+7)%7;U===0&&N<=B&&(U=7),N.setDate(N.getDate()+U);const M=new Date(N.toLocaleString("en-US",{timeZone:"UTC"})),G=new Date(N.toLocaleString("en-US",{timeZone:l})),W=M.getTime()-G.getTime();c=new Date(N.getTime()+W)}else o.schedule_type==="once"?(d=!0,u="completed",c=new Date(s.getTime()+365*24*60*60*1e3)):c=new Date(s.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r,c.toISOString(),d?0:o.enabled,u,o.id).run();const f=(JSON.parse(o.action_config||"{}").description||o.description)&&(o.action_type==="check_mail"||o.action_type==="check_calendar"||o.action_type==="check_sheet"||o.action_type==="custom");if(o.action_type==="reminder")try{const v=JSON.parse(o.action_config||"{}").description||o.description||o.name||"Time for your scheduled task.",w="⏰ "+(o.name||"Scheduled Task");await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, 'system', 'assistant', ?, ?)").bind(o.user_id,w+`
`+v,JSON.stringify({type:"cron",job_id:o.id})).run();const{channel:b}=await Ze(e.env.DB,o.user_id,w,v,{pinHash:o.pin_hash||void 0,priority:"default",tags:["reminder","karna"]});b==="ntfy-failed"?console.warn(`[cron/execute] job ${o.id}: Ntfy push failed — in-app delivered. Check ntfy_url/ntfy_token in Settings.`):console.info(`[cron/execute] job ${o.id}: reminder delivered via ${b}`)}catch(g){console.warn("[cron/execute] reminder notification failed for job",o.id,":",g==null?void 0:g.message)}i.push({job_id:o.id,name:o.name,status:"dispatched",needs_agent:f,next_run:c.toISOString()})}catch(l){i.push({job_id:o.id,name:o.name,status:"error",error:l.message})}try{const{MemoryService:o}=await Promise.resolve().then(()=>mi),l=await e.env.DB.prepare("SELECT id FROM users").all();for(const c of l.results||[])await new o(e.env.DB).cleanupDoneTasks(c.id)}catch{}return e.json({executed:i.length,results:i,timestamp:r})});Ne.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const s=parseInt(e.req.param("jobId"),10);if(!s)return e.json({error:"Invalid job ID"},400);const r=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(s).first();if(!r)return e.json({error:"Job not found"},404);if(r.action_type==="reminder")return e.json({job_id:s,status:"completed",note:"reminder handled by phase1"});const i=JSON.parse(r.action_config||"{}").description||r.description||"",o="⏰ "+(r.name||"Scheduled Task"),l=new Date().toISOString();let c="";const d=r.action_type==="reminder",u=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!d&&r.action_type==="custom"&&u.test(i),d)c=i||r.name||"Time for your scheduled task.";else try{const v={id:r.user_id,username:r.username||"user",name:r.user_name||"User",pin_hash:r.pin_hash||"",personality_prompt:r.personality_prompt||"",telegram_chat_id:r.telegram_chat_id||"",timezone:r.user_timezone||"UTC",assistant_name:r.assistant_name||"Karna",created_at:"",updated_at:""},w={userId:r.user_id,username:v.username,channel:"cron",text:ko(r.name,i,r.action_type,r.schedule_type),sessionId:"cron-"+r.id,timestamp:l},{provider:b,rotation:S}=await Ve(e.env.DB,r.user_id,r.pin_hash);c=await zn(w,e.env.DB,b,v,S,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(v){const w=v.message||"unknown error",b=w.includes("rate_limit")||w.includes("429")||w.includes("quota"),S=w.includes("timeout")||w.includes("Timeout");b?c="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":S?c="Task timed out. Will retry at next scheduled time.":c="Task encountered an error. Will retry at next scheduled time.",await H(e.env.DB,r.user_id,"cron_agent","execution_error",w,{job_id:r.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(r.action_type))try{const v=await e.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(r.user_id).first();(!v||v.cnt===0)&&await H(e.env.DB,r.user_id,"cron_verification","no_tools_called",`Cron job "${r.name}" (${r.action_type}) completed without any tool calls`,{job_id:r.id,action_type:r.action_type,response_preview:c.substring(0,200)})}catch{}let f=c||i||"Time for your scheduled task.";f=f.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const g=o+`
`+f;if(d&&await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(r.user_id,"system","assistant",g,JSON.stringify({type:"cron",job_id:r.id})).run(),r.pin_hash){const{channel:v}=await Ze(e.env.DB,r.user_id,o,f,{pinHash:r.pin_hash,priority:"default",tags:["reminder","karna"]});v==="ntfy-failed"?console.warn(`[run-task] job ${r.id}: Ntfy push failed — in-app notification still delivered. Check ntfy_url/ntfy_token in Settings.`):v==="in-app"&&console.warn(`[run-task] job ${r.id}: Ntfy not configured — delivered in-app only.`)}else await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, 'reminder', ?, ?, ?, 0)").bind(r.user_id,o,f,"cron:"+r.id).run();return e.json({job_id:s,status:"completed",response_length:c.length})});async function Wr(e){var s;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return null;const n=await e.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(t).first();return(n==null?void 0:n.user_id)||null}Ne.get("/health/tools",async e=>{var n;const t=await Wr(e);if(!t)return e.json({error:"Not authenticated"},401);try{const s=await e.env.DB.prepare(`SELECT tool_name,
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
       ORDER BY calls DESC`).bind(t).all();return e.json({period:"last_24h",tool_stats:s.results,enforcement:{triggers:r.results,retry_results:((n=a.results)==null?void 0:n[0])||{total_retries:0,successful_retries:0}},cron:{executions:i.results,warnings:o.results},providers:l.results})}catch(s){return e.json({error:s.message||"Failed to fetch metrics"},500)}});Ne.get("/health/tools/recent",async e=>{const t=await Wr(e);if(!t)return e.json({error:"Not authenticated"},401);try{const n=await e.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
              success, error_message, latency_ms, was_enforcement_retry, channel, created_at
       FROM tool_execution_log
       WHERE user_id = ?
       ORDER BY id DESC LIMIT 50`).bind(t).all();return e.json({logs:n.results})}catch(n){return e.json({error:n.message},500)}});const Ot=`

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
- Example: "Couldn't retrieve Amazon order status — requires login."`;function ko(e,t,n,s){return n==="reminder"?`[Scheduled Reminder] "${e}": ${t||"Time for your reminder."}`:n==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check Gmail for new/important emails."}
You MUST call gmail_list or gmail_search immediately.${Ot}`:n==="check_calendar"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check calendar for upcoming events."}
You MUST call list_calendar_events immediately.${Ot}`:n==="check_sheet"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
You MUST call read_sheet immediately with the relevant spreadsheet.${Ot}`:n==="custom"&&t?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${s==="interval"||s==="daily"||s==="weekly"?`
CRITICAL SAFETY RULE: This is a RECURRING scheduled task. You MUST NOT call gmail_send or gmail_draft — sending emails on every cron tick spams recipients. Report findings as text only.`:""}${Ot}`:`[Scheduled task "${e}"]: ${t||"Execute this scheduled task."}${Ot}`}Ne.post("/cron/check-browser-tasks",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);let s=0,r=0;try{const a=await e.env.DB.prepare(`SELECT pbt.id, pbt.user_id, pbt.task_id, pbt.task_description,
              pbt.thread_id, pbt.channel,
              u.telegram_chat_id, u.pin_hash
       FROM pending_browser_tasks pbt
       JOIN users u ON pbt.user_id = u.id
       WHERE pbt.notified = 0
       ORDER BY pbt.created_at ASC
       LIMIT 10`).all();for(const i of a.results||[]){s++;try{const o=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'browser_use_api_key'").bind(i.user_id).first();if(!o)continue;const l=(await J(o.encrypted_value,i.pin_hash)).trim(),c=await _r(i.task_id,l,{waitMs:8e3});if(!c.done||!(await e.env.DB.prepare(`UPDATE pending_browser_tasks SET notified = 1
           WHERE user_id = ? AND task_id = ? AND notified = 0`).bind(i.user_id,i.task_id).run()).meta.changes)continue;const u=i.task_description?`"${i.task_description.substring(0,80)}${i.task_description.length>80?"...":""}"`:"Your browser task";let h,f;if(c.status==="finished"&&c.output?(h="Browser task completed",f=`${u} finished.

${c.output.substring(0,500)}${c.output.length>500?"...":""}`):c.status==="finished"?(h="Browser task completed (no output)",f=`${u} finished, but the browser returned no readable content. You may want to retry.`):(h="Browser task ended",f=`${u} ended with status "${c.status}". Check the browser dashboard for details.`),i.thread_id){const g=c.status==="finished"&&c.output?c.output.substring(0,8e3):f,v=Math.ceil(g.length/4);try{await e.env.DB.prepare(`INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id)
               VALUES (?, ?, 'assistant', ?, '{}', ?, ?)`).bind(i.user_id,i.channel||"web",g,v,i.thread_id).run()}catch{}}i.pin_hash&&await Ze(e.env.DB,i.user_id,h,f,{pinHash:i.pin_hash,tags:["browser","karna"]}),r++,await new Promise(g=>setTimeout(g,200))}catch{}}}catch{}return e.json({checked:s,notified:r})});Ne.get("/scorecard/weekly",async e=>{var u;const t=(u=e.req.header("Authorization"))==null?void 0:u.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=n.user_id,r=new Date(Date.now()-10080*60*1e3).toISOString(),[a,i,o]=await Promise.all([e.env.DB.prepare(`SELECT COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as success_count,
              AVG(latency_ms) as avg_latency,
              MAX(latency_ms) as p95_latency_hint
       FROM tool_execution_log
       WHERE user_id = ? AND created_at >= ?`).bind(s,r).first(),e.env.DB.prepare(`SELECT COUNT(*) as retry_count
       FROM tool_execution_log
       WHERE user_id = ? AND was_enforcement_retry = 1 AND created_at >= ?`).bind(s,r).first(),e.env.DB.prepare(`SELECT COUNT(*) as cited_responses
       FROM conversations
       WHERE user_id = ? AND role = 'assistant' AND created_at >= ? AND (content LIKE '%[S1]%' OR content LIKE '%source%')`).bind(s,r).first()]),l=Number((a==null?void 0:a.total)||0),c=Number((a==null?void 0:a.success_count)||0),d=l?c/l:0;return e.json({window:"7d",task_success_rate:Number(d.toFixed(3)),groundedness_rate_hint:Number((Number((o==null?void 0:o.cited_responses)||0)/Math.max(1,l)).toFixed(3)),avg_latency_ms:Math.round(Number((a==null?void 0:a.avg_latency)||0)),p95_latency_hint_ms:Math.round(Number((a==null?void 0:a.p95_latency_hint)||0)),fallback_frequency_hint:Number((Number((i==null?void 0:i.retry_count)||0)/Math.max(1,l)).toFixed(3)),totals:{total_tool_calls:l,successful_tool_calls:c}})});function Ro(e,t,n,s){return{userId:e,username:t,channel:"telegram",text:n,sessionId:`telegram-${s}`,timestamp:new Date().toISOString()}}function Do(e,t){return e.replace(/\*\*(.*?)\*\*/gs,"*$1*").replace(/^#{1,3}\s+(.+)$/gm,"*$1*").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const No=["llm_slot_1","llm_slot_2","llm_slot_3"],Oo=["openai","groq"];function gs(e,t){const n=t==null?void 0:t.trim();if(!n)return null;const s=e.trim().toLowerCase();return s==="openai"?{url:"https://api.openai.com/v1/audio/transcriptions",apiKey:n,model:"whisper-1"}:s==="groq"?{url:"https://api.groq.com/openai/v1/audio/transcriptions",apiKey:n,model:"whisper-large-v3"}:null}function Io(e){var t,n;return((t=e.apiKey)==null?void 0:t.trim())||((n=e.api_key)==null?void 0:n.trim())}async function Co(e,t,n){for(const s of No){const r=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,s).first();if(r)try{const a=await J(r.encrypted_value,n),i=JSON.parse(a),o=Io(i);if(i.provider&&o){const l=gs(i.provider,o);if(l)return l}}catch(a){console.error(`[telegram stt] Failed to load ${s}:`,a)}}for(const s of Oo){const r=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,s).first();if(r)try{const a=await J(r.encrypted_value,n),i=gs(s,a);if(i)return i}catch(a){console.error(`[telegram stt] Failed to load legacy ${s}:`,a)}}return null}const zr=["message","callback_query"],Ao=4e3,Lo=1e4,Mo=3e4;async function De(e,t={}){const n=new AbortController,s=setTimeout(()=>n.abort(),Lo);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(s)}}async function fs(e){const t=new AbortController,n=setTimeout(()=>t.abort(),Mo);try{return await fetch(e,{signal:t.signal})}finally{clearTimeout(n)}}async function ae(e,t,n,s="Markdown",r,a){var c,d;const i=Bo(n,Ao),o=[];let l=!0;for(let u=0;u<i.length;u++){const h=i[u];let f=!1,g="";for(let v=0;v<3;v++)try{const w=await De(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:h,parse_mode:s,disable_web_page_preview:!1})});if(w.ok){f=!0;break}const b=await w.json().catch(()=>null);if(g=`HTTP ${w.status}: ${(b==null?void 0:b.description)||"Unknown error"}`,(c=b==null?void 0:b.description)!=null&&c.includes("parse")||(d=b==null?void 0:b.description)!=null&&d.includes("entities")){if((await De(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:h})})).ok){f=!0;break}g+=" (plain-text retry also failed)"}if(w.status===429||w.status>=500){const S=Math.pow(2,v)*1e3;await new Promise(R=>setTimeout(R,S));continue}break}catch(w){if(g=`Network error: ${w.message}`,v<2){const b=Math.pow(2,v)*1e3;await new Promise(S=>setTimeout(S,b));continue}}f||(l=!1,o.push(`Chunk ${u+1}/${i.length}: ${g}`))}if(!l&&r&&a&&o.length>0)try{const{logError:u}=await Promise.resolve().then(()=>vt);await u(r,a,"telegram","send_failed",o.join(" | "))}catch{}return{success:l,errors:o}}async function $o(e,t){try{await De(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function Bo(e,t){if(e.length<=t)return[e];const n=[];let s=e;for(;s.length>0;){if(s.length<=t){n.push(s);break}let r=s.lastIndexOf(`
`,t);r<t*.3&&(r=s.lastIndexOf(" ",t)),r<t*.3&&(r=t),n.push(s.substring(0,r)),s=s.substring(r).trimStart()}return n}function Po(e){const t=Date.now()-new Date(e).getTime(),n=Math.floor(t/6e4);if(n<1)return"just now";if(n<60)return`${n}m ago`;const s=Math.floor(n/60);return s<24?`${s}h ago`:`${Math.floor(s/24)}d ago`}async function jo(e,t,n){const r={reminder:"⏰",mail:"✉️",calendar:"📅",error:"⚠️",system:"⚙️"}[n.type]||"🔔",a={daily:"📅 Daily",weekly:"📅 Weekly",once:"✓ Once"},i=n.schedule_type?` · _${a[n.schedule_type]||"⏱ Repeating"}_`:"",o=n.body?`
`+n.body.substring(0,150)+(n.body.length>150?"…":""):"",l=`${r} *${n.title}*${i}
_${Po(n.created_at)}_${o}`,c=Kr(n.id);if(!(await De(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:l,parse_mode:"Markdown",reply_markup:{inline_keyboard:c}})})).ok){const u=await De(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:l.replace(/[_*`[\]]/g,""),reply_markup:{inline_keyboard:c}})});u.ok||console.warn("[sendNotifMessage] plain-text fallback also failed:",t,u.status)}}async function Uo(e,t,n,s,r){switch(e.split("@")[0].toLowerCase()){case"/start":{const i=(s==null?void 0:s.name)||"there",o=(s==null?void 0:s.assistant_name)||"Karna",l=`👋 *Hello, ${i}!*

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
        `).bind(s.id).all()).results||[];if(o.length===0){const g=await ae(n,t,"✅ No open tasks. You're all clear.","Markdown",r,s.id);return g.success||console.warn(`[/tasks] Failed to send message: ${g.errors.join(" | ")}`),!0}const l=new Date,c=l.toISOString().slice(0,10),d=new Date(l);d.setDate(d.getDate()+1);const u=d.toISOString().slice(0,10),h=[`📋 *Open Tasks (${o.length})*
`];for(const g of o){let v="";if(g.due_date){const w=g.due_date.slice(0,10);w<c?v=" ⚠️ _overdue_":w===c?v=" 🔴 _due today_":w===u?v=" 🟡 _due tomorrow_":v=` _${new Date(g.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}h.push(`☐ ${g.title}${v}`)}h.push(`
_Say "mark [task] as done" to close a task._`);const f=await ae(n,t,h.join(`
`),"Markdown",r,s.id);f.success||console.warn(`[/tasks] Failed to send message: ${f.errors.join(" | ")}`)}catch(i){const o=await ae(n,t,"❌ Could not fetch tasks: "+i.message,"Markdown",r,s==null?void 0:s.id);o.success||console.warn(`[/tasks error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/notifications":case"/notif":{if(!s){const i=await ae(n,t,"⚠️ Account not linked.","Markdown",r);return i.success||console.warn(`[/notifications] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await r.prepare(`
          SELECT n.id, n.type, n.title, n.body, n.created_at, j.schedule_type
          FROM notifications n
          LEFT JOIN cron_jobs j
            ON n.user_id = j.user_id
            AND n.source LIKE 'cron:%'
            AND CAST(SUBSTR(n.source, 6) AS INTEGER) = j.id
          WHERE n.user_id = ? AND n.is_read = 0
          ORDER BY n.created_at DESC
          LIMIT 5
        `).bind(s.id).all()).results||[];if(o.length===0){const c=await ae(n,t,"🎉 No pending notifications. You're all caught up.","Markdown",r,s.id);return c.success||console.warn(`[/notifications] Failed to send message: ${c.errors.join(" | ")}`),!0}const l=await ae(n,t,`📬 *${o.length} pending notification${o.length>1?"s":""}:*`,"Markdown",r,s.id);l.success||console.warn(`[/notifications] Failed to send header: ${l.errors.join(" | ")}`);for(const c of o)await jo(n,t,c)}catch(i){const o=await ae(n,t,"❌ Could not fetch notifications: "+i.message,"Markdown",r,s==null?void 0:s.id);o.success||console.warn(`[/notifications error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}default:return!1}}async function Ho(e,t){var r,a,i,o,l,c;const n=t.db,s=t.env;console.log(`[telegram webhook] envVars keys=${Object.keys(s).join(",")}`);try{if(e.callback_query){await Wo(n,e.callback_query);return}const d=e.message;if(!d)return;const u=!!d.text,h=!!d.voice,f=!!d.document,g=!!d.photo,v=!!d.caption;if(!u&&!h&&!f&&!g)return;const w=String(d.chat.id);let b=d.text||"";const S=await n.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(w).first();let R=null;if(S){const $=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(S.id,"telegram_bot_token").first();$&&(R=await J($.encrypted_value,S.pin_hash))}if(!R){const $=await n.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();$&&(R=await J($.encrypted_value,$.pin_hash))}if(!R||b.startsWith("/")&&await Uo(b,w,R,S,n))return;if(!S){const $=await ae(R,w,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${w}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`,"Markdown",n);$.success||console.warn(`Failed to send unlinked account message: ${$.errors.join(" | ")}`);return}if(d.voice&&R&&S)try{if((d.voice.file_size??0)>20*1024*1024){const Z=await ae(R,w,"⚠️ Voice note is too large to process (max 20 MB).","Markdown",n,S.id);Z.success||console.warn(`[voice size] Failed to send message: ${Z.errors.join(" | ")}`);return}const $=await ae(R,w,"🎤 Processing voice note...","Markdown",n,S.id);$.success||console.warn(`[voice start] Failed to send message: ${$.errors.join(" | ")}`);const q=await(await De(`https://api.telegram.org/bot${R}/getFile?file_id=${d.voice.file_id}`)).json();if(q.ok&&((r=q.result)!=null&&r.file_path)){const te=await(await fs(`https://api.telegram.org/file/bot${R}/${q.result.file_path}`)).blob(),ie=await Co(n,S.id,S.pin_hash);if(!ie){const p=await ae(R,w,"⚠️ To use voice notes, add an OpenAI or Groq API key in Settings → Keys (LLM slot or legacy openai/groq).","Markdown",n,S.id);p.success||console.warn(`[voice no stt] Failed to send message: ${p.errors.join(" | ")}`);return}const re=new FormData;re.append("file",te,"voice.ogg"),re.append("model",ie.model),re.append("language","en");const me=await fetch(ie.url,{method:"POST",headers:{Authorization:`Bearer ${ie.apiKey}`},body:re});if(!me.ok){const p=await me.text(),y=await ae(R,w,`⚠️ Transcription failed: ${me.status} ${p}`,"Markdown",n,S.id);y.success||console.warn(`[voice transcription error] Failed to send message: ${y.errors.join(" | ")}`);return}b=(await me.json()).text;const E=await ae(R,w,`🗣️ *You said:* ${b}`,"Markdown",n,S.id);E.success||console.warn(`[voice transcript echo] Failed to send message: ${E.errors.join(" | ")}`)}}catch($){const z=await ae(R,w,`⚠️ Failed to process voice note: ${$.message}`,"Markdown",n,S==null?void 0:S.id);z.success||console.warn(`[voice processing error] Failed to send message: ${z.errors.join(" | ")}`);return}if((f||g)&&R&&S)try{let $,z="unknown",q="unknown",Z=0;if(f)$=d.document.file_id,z=d.document.file_name||"document",q=d.document.mime_type||"unknown",Z=d.document.file_size||0;else if(g){const te=d.photo[d.photo.length-1];$=te.file_id,z="photo.jpg",q="image/jpeg",Z=te.file_size||0}if($){const ie=await(await De(`https://api.telegram.org/bot${R}/getFile?file_id=${$}`)).json();let re="";if(ie.ok&&((a=ie.result)!=null&&a.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(z)||/^text\/|application\/json|application\/xml|application\/csv/i.test(q))&&Z<5e4)try{re=await(await fs(`https://api.telegram.org/file/bot${R}/${ie.result.file_path}`)).text()}catch{}const me=d.caption||"",m=`[Telegram file received: "${z}" (${q}, ${Math.round(Z/1024)}KB)]`;re?b=`${me?me+`

`:""}${m}
File contents:
${re.substring(0,8e3)}${re.length>8e3?`
[...truncated]`:""}`:b=`${me?me+`

`:""}${m}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch($){if(v&&d.caption)b=d.caption;else{const z=await ae(R,w,`⚠️ Received your file but couldn't process it: ${$.message}`,"Markdown",n,S==null?void 0:S.id);z.success||console.warn(`[file processing error] Failed to send message: ${z.errors.join(" | ")}`);return}}if(!b)return;$o(R,w).catch(()=>{});let B=await n.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(S.id).first();if(B)await n.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(B.id).run();else{const $=await n.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(S.id).run();if(!((i=$.meta)!=null&&i.last_row_id))throw new Error("Thread creation failed — no row ID returned");B={id:$.meta.last_row_id}}const N=Ro(S.id,S.username,b,w);N.metadata={thread_id:B.id},console.log(`[telegram webhook] user=${S.id} msgLen=${b.length} thread=${B.id}`);let U,M;try{const $=await Ve(n,S.id,S.pin_hash);U=$.provider,M=$.rotation}catch($){console.error("Telegram provider setup error:",$);const z=(o=$.message)!=null&&o.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(l=$.message)!=null&&l.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${$.message||"Unknown error"}`,q=await ae(R,w,z,"Markdown",n,S.id);q.success||console.warn(`[provider error] Failed to send message: ${q.errors.join(" | ")}`);return}const{classifyIntentFast:G}=await Promise.resolve().then(()=>Fi);if(G(b).agent==="multi"){const $=await ae(R,w,"🔍 On it…","Markdown",n,S.id);$.success||console.warn(`[ack] Failed to send: ${$.errors.join(" | ")}`)}const W=6e5;let ne=!1;try{const $=await Promise.race([zn(N,n,U,S,M,s),new Promise((Z,te)=>setTimeout(()=>te(new Error("TELEGRAM_TIMEOUT")),W))]),z=Do($,"telegram"),q=await ae(R,w,z||"(empty response)","Markdown",n,S.id);if(await n.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(B.id).run().catch(()=>{}),ne=q.success,!q.success){console.error(`[CRITICAL] Agent response failed to send to Telegram for user ${S.id}:`,q.errors);try{const{logError:Z}=await Promise.resolve().then(()=>vt);await Z(n,S.id,"telegram","response_send_failed",`Failed to deliver response: ${q.errors.join(" | ")}`)}catch{}}}catch($){console.error("Telegram agent error:",$);const z=$.message==="TELEGRAM_TIMEOUT",q=z?`⏱️ This is taking too long to complete via Telegram.

If you requested a browser task, the result will arrive as a notification when ready. For other long tasks, try the web app.`:(c=$.message)!=null&&c.includes("API error")?`⚠️ AI provider returned an error. The provider (${U.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${($.message||"Unknown").substring(0,200)}`,Z=await ae(R,w,q,"Markdown",n,S.id);ne=Z.success,Z.success||console.error(`[CRITICAL] Error message failed to send to Telegram for user ${S.id}:`,Z.errors);try{const{logError:te}=await Promise.resolve().then(()=>vt);await te(n,S.id,"telegram",z?"timeout":"agent_error",$.message||"Agent error",{provider:U.name})}catch{}}}catch(d){console.error("Telegram webhook error:",d);try{const{logError:u}=await Promise.resolve().then(()=>vt);await u(n,null,"telegram","webhook_error",d.message||"Unknown telegram error")}catch{}}}function ys(e){if(!e)return null;if(e.startsWith("cron:")){const t=parseInt(e.replace("cron:",""),10);return isNaN(t)?null:t}return null}function Fo(e){const t=new Date(new Date().toLocaleString("en-US",{timeZone:e})),n=new Date(t);n.setDate(n.getDate()+1),n.setHours(9,0,0,0);const s=new Date(n.toLocaleString("en-US",{timeZone:"UTC"})),r=new Date(n.toLocaleString("en-US",{timeZone:e}));return new Date(n.getTime()+(s.getTime()-r.getTime())).toISOString()}const Kr=e=>[[{text:"✅ Seen",callback_data:`notif_seen:${e}`},{text:"⏰ Snooze",callback_data:`notif_snooze_menu:${e}`},{text:"✓ Done",callback_data:`notif_done:${e}`}]],qo=e=>[[{text:"10 minutes",callback_data:`notif_snooze:${e}:10m`},{text:"1 hour",callback_data:`notif_snooze:${e}:1h`}],[{text:"Tomorrow 9 AM",callback_data:`notif_snooze:${e}:tomorrow`},{text:"← Back",callback_data:`notif_back:${e}`}]];async function mt(e,t,n){const s=await De(`https://api.telegram.org/bot${e}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:t,text:n})});s.ok||console.warn("[answerCallback]",t,s.status)}async function pt(e,t,n,s){const r=await De(`https://api.telegram.org/bot${e}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,message_id:n,reply_markup:s?{inline_keyboard:s}:{}})});r.ok||console.warn("[editKeyboard]",t,n,r.status)}async function Go(e,t,n,s,r,a,i,o,l,c){const d=await e.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).first();if(!d){await mt(t,n,"Notification not found — may have already been actioned."),await pt(t,s,r,null);return}if(i==="notif_seen")await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await mt(t,n,"✅ Dismissed"),await pt(t,s,r,null);else if(i==="notif_snooze_menu")await mt(t,n),await pt(t,s,r,qo(o));else if(i==="notif_back")await mt(t,n),await pt(t,s,r,Kr(o));else if(i==="notif_snooze"){const u=ys(d.source);u&&await e.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,a).run();let h,f;l==="10m"?(h=new Date(Date.now()+600*1e3).toISOString(),f="10 minutes"):l==="1h"?(h=new Date(Date.now()+3600*1e3).toISOString(),f="1 hour"):(h=Fo(c||"UTC"),f="tomorrow 9 AM"),await e.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
       VALUES (?, ?, ?, 'once', ?, 'reminder', ?, ?, 1, 'active')`).bind(a,d.title,d.body,h,JSON.stringify({description:d.body||""}),h).run(),await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await mt(t,n,`⏰ Snoozed until ${f}`),await pt(t,s,r,null)}else if(i==="notif_done"){const u=ys(d.source);u&&await e.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,a).run(),await e.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(o,a).run(),await mt(t,n,"✓ Done!"),await pt(t,s,r,null)}}async function Wo(e,t){var w;const{id:n,data:s,message:r,from:a}=t;if(!s||!r)return;const i=s.split(":"),o=i[0],l=String(r.chat.id);if(o.startsWith("notif_")){const b=parseInt(i[1]);if(!b)return;const S=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(l).first();if(!S)return;const R=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
       JOIN users u ON c.user_id = u.id
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(S.id).first();if(!R)return;const B=await J(R.encrypted_value,R.pin_hash),N=i[2];await Go(e,B,n,l,r.message_id,S.id,o,b,N,S.timezone);return}if(i[0]!=="briefing_toggle"||i.length<3)return;const c=i[1],d=parseInt(i[2]);if(!d||!c)return;const u=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(l).first();if(!u)return;const h=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(u.id,d,c).first();if(!h)return;const f=h.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(f,f,h.id).run();const g=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(u.id).first();if(!g)return;const v=await J(g.encrypted_value,g.pin_hash);try{const b=await De(`https://api.telegram.org/bot${v}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:n,text:f?"✅ Checked!":"☐ Unchecked"})});b.ok||console.warn(`[callback answer] Failed to answer callback: HTTP ${b.status}`)}catch(b){console.warn(`[callback answer] Error answering callback: ${b.message}`)}if((w=r.reply_markup)!=null&&w.inline_keyboard){const b=r.reply_markup.inline_keyboard.map(S=>S.map(R=>{var B;if((B=R.callback_data)!=null&&B.includes(c)){const N=f?"✅":"☐",U=R.text.replace(/^[☐✅]\s*/,"");return{...R,text:`${N} ${U}`}}return R}));try{await De(`https://api.telegram.org/bot${v}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l,message_id:r.message_id,reply_markup:{inline_keyboard:b}})})}catch{}}}const Gt=new _e;function zo(e){return{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE}}Gt.post("/webhook",async e=>{let t;try{t=await e.req.json()}catch{return e.json({ok:!0})}const s={db:e.env.DB,env:zo(e)};return e.executionCtx.waitUntil(Ho(t,s)),e.json({ok:!0})});Gt.post("/setup-webhook",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const{webhook_url:s}=await e.req.json(),r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!r)return e.json({error:"Telegram bot token not configured in Settings"},400);const a=await J(r.encrypted_value,n.pin_hash);if(!s){const d=await(await fetch(`https://api.telegram.org/bot${a}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(d)}const o=await(await fetch(`https://api.telegram.org/bot${a}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:s,allowed_updates:[...zr],drop_pending_updates:!1})})).json();return e.json(o)});Gt.get("/webhook-status",async e=>{var a,i,o,l,c,d;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!s)return e.json({configured:!1,error:"Bot token not set"});const r=await J(s.encrypted_value,n.pin_hash);try{const h=await(await fetch(`https://api.telegram.org/bot${r}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((i=h.result)==null?void 0:i.url)||"",has_webhook:!!((o=h.result)!=null&&o.url),pending_updates:((l=h.result)==null?void 0:l.pending_update_count)||0,last_error:((c=h.result)==null?void 0:c.last_error_message)||"",last_error_date:((d=h.result)==null?void 0:d.last_error_date)||null})}catch(u){return e.json({configured:!0,error:u.message})}});Gt.post("/detect-chat-id",async e=>{var a,i;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!s)return e.json({error:"Bot token not configured"},400);const r=await J(s.encrypted_value,n.pin_hash);try{const c=((i=(await(await fetch(`https://api.telegram.org/bot${r}/getWebhookInfo`)).json()).result)==null?void 0:i.url)||"";await fetch(`https://api.telegram.org/bot${r}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(w=>setTimeout(w,500));const u=await(await fetch(`https://api.telegram.org/bot${r}/getUpdates?limit=10&timeout=0`)).json();c&&await fetch(`https://api.telegram.org/bot${r}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:c,allowed_updates:[...zr]})});const h=u.result||[];if(h.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const f=[],g=new Set;for(let w=h.length-1;w>=0;w--){const b=h[w].message;if(b&&b.chat){const S=String(b.chat.id);g.has(S)||(g.add(S),f.push({chat_id:S,name:[b.chat.first_name,b.chat.last_name].filter(Boolean).join(" ")||b.chat.title||"Unknown",username:b.chat.username||"",date:new Date((b.date||0)*1e3).toISOString()}))}}if(f.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const v=f[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(v,n.user_id).run(),e.json({found:!0,chat_id:v,name:f[0].name,all_chats:f,message:`Chat ID ${v} detected and saved to your profile.`})}catch(o){return e.json({error:`Detection failed: ${o.message}`},500)}});function Ko(e){const t=new Date,n=new Date(t.toLocaleString("en-US",{timeZone:e})),s=new Date(n);s.setDate(s.getDate()+1),s.setHours(0,0,0,0);const r=new Date(s);r.setHours(23,59,59,999);const a=s.toISOString().split("T")[0];return{start:s.toISOString(),end:r.toISOString(),dateStr:a}}function on(e,t=new Date){return new Intl.DateTimeFormat("en-CA",{timeZone:e||"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}async function Yo(e,t,n,s,r,a){try{return(await new Cn(e,t,n,s,r).listEvents("primary",{timeMin:a.start,timeMax:a.end,maxResults:50})).map(l=>{var c;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(c=l.attendees)==null?void 0:c.map(d=>d.displayName||d.email),source:"google"}})}catch(i){return console.error("Google Calendar fetch error:",i.message),[]}}async function Jo(e,t,n,s,r){try{const a=new Re(e,t,n,s,r),i=await a.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),o=await a.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const u of i){const h=u.from.split("<")[0].trim()||u.from;l[h]=(l[h]||0)+1}const c=Object.entries(l).sort(([,u],[,h])=>h-u).slice(0,5).map(([u])=>u),d=i.some(u=>u.subject.toLowerCase().includes("urgent")||u.subject.toLowerCase().includes("asap")||u.subject.toLowerCase().includes("immediately"));return{unreadCount:i.length,importantCount:o.length,topSenders:c,hasUrgent:d}}catch(a){return console.error("Gmail fetch error:",a.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function Vo(e,t){try{const n=await e.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(t).all(),s=new Date,r=new Date(s);r.setDate(r.getDate()+1),r.setHours(23,59,59,999);const a=n.results||[],i=a.map(l=>{if(l.due_date){const c=new Date(l.due_date),d=c<=s?"overdue":c<=r?"due today":c.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${l.title} [${d}]`}return l.title}),o=a.filter(l=>l.due_date?new Date(l.due_date)<=r:!1).length;return{pending:a.length,dueToday:o,items:i}}catch(n){return console.error("Tasks fetch error:",n.message),{pending:0,dueToday:0,items:[]}}}async function Zo(e,t){try{const n=Math.floor((Date.now()-1728e5)/1e3),s=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${n},points>10`,r=await fetch(s,{headers:{"User-Agent":"Karna/1.0"}});return r.ok?((await r.json()).hits||[]).filter(i=>i.url&&!t.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const vs=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function Xo(e,t,n){const s=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],r=new Set;if(t&&n)try{((await t.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(n).all()).results||[]).forEach(c=>r.add(c.url))}catch{}const a=[];if(s.some(l=>vs.some(c=>l.toLowerCase().includes(c.toLowerCase())))){const l=s.find(d=>vs.some(u=>d.toLowerCase().includes(u.toLowerCase())))||"AI agents",c=await Zo(l,r);for(const d of c)a.push(d),r.add(d.url)}for(const l of s){if(a.length>=8)break;const c=`latest ${l} news today`;try{const d=await Lt(c,{num:5});if(d.results)for(const u of d.results){if(a.length>=8)break;r.has(u.link)||(a.push({title:u.title,summary:u.snippet,url:u.link,source:u.displayLink}),r.add(u.link))}}catch(d){console.error(`News search error for "${c}":`,d.message)}}const o=a.slice(0,7);if(t&&n&&o.length>0)for(const l of o)try{await t.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(n,l.url,l.title).run()}catch{}return o}function Qo(e,t){const n=[];let s="20:00";{const[i,o]=t.split(":"),l=parseInt(i,10),c=o||"00",d=l>=12?"PM":"AM";s=`${l===0?12:l>12?l-12:l}:${c} ${d}`}n.push(`🗓 Your ${s} Brief — ${e.targetDate}`),n.push("");const r=e.calendar.totalCount;if(r>0){n.push(`📅 Tomorrow: ${r} event${r===1?"":"s"}`);for(const i of e.calendar.google.slice(0,5)){const o=i.startTime?new Date(i.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";n.push(`   • ${o} ${i.title}`)}}else n.push("📅 Tomorrow: Nothing scheduled");n.push("");const a=e.emails.gmail.unreadCount;if(a>0?(n.push(`📧 Gmail: ${a} unread`),e.emails.gmail.importantCount>0&&n.push(`   ★ ${e.emails.gmail.importantCount} marked important`),e.emails.gmail.hasUrgent&&n.push("   ⚠️ Urgent messages present"),e.emails.gmail.topSenders.length>0&&n.push(`   From: ${e.emails.gmail.topSenders.slice(0,3).join(", ")}`)):n.push("📧 Gmail: Inbox clear"),n.push(""),e.tasks.pending>0){n.push(`✅ Open Tasks (${e.tasks.pending}):`);for(const i of e.tasks.items)n.push(`   ☐ ${i}`)}else n.push("✅ Tasks: All clear");if(n.push(""),e.news.items.length>0){n.push("📡 Today's Signal:");for(const i of e.news.items){const o=i.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${i.source}`;n.push(`   • ${i.title.substring(0,90)}${i.title.length>90?"…":""}`),n.push(`     ${o} — ${i.summary.substring(0,80)}${i.summary.length>80?"…":""}`)}}return n.join(`
`)}function el(e){const t=[];let n=0;for(const s of e.calendar.google)t.push({type:"calendar",key:s.id,text:`${s.title} - ${new Date(s.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:s},sortOrder:n++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:n++});for(const s of e.tasks.items)t.push({type:"task",key:`task-${s}`,text:s,metadata:{},sortOrder:n++});for(const s of e.news.items)t.push({type:"news",key:`news-${s.url}`,text:`📰 ${s.title}`,metadata:{url:s.url,source:s.source},sortOrder:n++});return t}async function tl(e,t){const n=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!n)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let s;try{const a=JSON.parse(n.components);s={google_calendar:a.google_calendar!==!1,gmail:a.gmail!==!1,tasks:a.tasks!==!1,news:a.news!==!1}}catch{s={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const r=n.news_topics?n.news_topics.split(",").map(a=>a.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:s,newsTopics:r}}async function Yr(e,t,n){var R,B;const s=t.timezone||"Asia/Kolkata",r=Ko(s),{components:a,newsTopics:i}=await tl(e,t.id),o=[],l=[];a.google_calendar&&(o.push(Yo(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET,r)),l.push("googleEvents")),a.gmail&&(o.push(Jo(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),a.tasks&&(o.push(Vo(e,t.id)),l.push("tasks")),a.news&&(o.push(Xo(i,e,t.id)),l.push("news"));const c=await Promise.all(o),d={};l.forEach((N,U)=>{d[N]=c[U]});const u={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},h={pending:0,dueToday:0,items:[]},f={generatedAt:new Date().toISOString(),targetDate:r.dateStr,calendar:{google:d.googleEvents||[],totalCount:((R=d.googleEvents)==null?void 0:R.length)||0},emails:{gmail:d.gmailSummary||u},tasks:d.tasks||h,news:{items:d.news||[],fetchedAt:new Date().toISOString()},summary:""},g=((B=await e.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(t.id).first())==null?void 0:B.briefing_time)||"20:00";f.summary=Qo(f,g);const v=el(f),w=on(s),b=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel, briefing_date)
    VALUES (?, 'evening', ?, 'all', ?)
    RETURNING id
  `).bind(t.id,JSON.stringify(f),w).first(),S=(b==null?void 0:b.id)||0;for(const N of v)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(S,N.type,N.key,N.text,JSON.stringify(N.metadata),N.sortOrder).run();return{briefingId:S,content:f,items:v}}async function nl(e,t,n){const s=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(n,t).first();if(!s)return null;const r=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(n).all();return{briefing:{...s,content:JSON.parse(s.content_json||"{}")},items:r.results||[]}}async function sl(e,t,n,s){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(n,t).first())return null;const a=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(s,n).first();if(!a)return null;const i=a.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(i,i,s,n).run(),{checked:i===1}}async function rl(e,t,n=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
    LIMIT ?
  `).bind(t,n).all()).results||[]).map(r=>({...r,content:JSON.parse(r.content_json||"{}")}))}function Jr(e,t,n=new Date,s=5){const r=new Date(n.toLocaleString("en-US",{timeZone:t})),a=r.getHours(),i=r.getMinutes(),[o,l]=e.split(":").map(Number),c=a*60+i,d=o*60+l,u=c-d;return u>=0&&u<s}function Vr(e,t){const n=e.summary,s=[];for(const r of t.slice(0,10))s.push([{text:`☐ ${r.text.substring(0,40)}${r.text.length>40?"...":""}`,callback_data:`briefing_toggle:${r.key}`}]);return{text:n,inlineKeyboard:s}}const fe=new _e,al=1e4;async function ws(e,t){const n=new AbortController,s=setTimeout(()=>n.abort(),al);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(s)}}async function il(e,t){var r;if(e.req.path.includes("/cron/"))return t();const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}fe.use("/*",il);fe.get("/briefings",async e=>{const t=e.get("user"),n=parseInt(e.req.query("limit")||"10");try{const s=await rl(e.env.DB,t.id,n);return e.json({briefings:s})}catch(s){return e.json({error:s.message},500)}});fe.get("/briefings/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));try{const s=await nl(e.env.DB,t.id,n);return s?e.json(s):e.json({error:"Briefing not found"},404)}catch(s){return e.json({error:s.message},500)}});fe.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=parseInt(e.req.param("itemId"));try{const r=await sl(e.env.DB,t.id,n,s);return r?e.json(r):e.json({error:"Item not found"},404)}catch(r){return e.json({error:r.message},500)}});fe.post("/briefings/generate",async e=>{const t=e.get("user");try{const n=await Yr(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(n)}catch(n){return e.json({error:n.message},500)}});fe.get("/morning-briefing",async e=>{const t=e.get("user");try{const n=await Zr(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(n)}catch(n){return e.json({error:n.message},500)}});fe.get("/briefing-preferences",async e=>{const t=e.get("user");try{const n=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!n){const r={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:r})}const s={briefingTime:n.briefing_time,briefingEnabled:n.briefing_enabled!==0,components:JSON.parse(n.components),newsTopics:n.news_topics.split(",").map(r=>r.trim()).filter(Boolean),notificationChannels:JSON.parse(n.notification_channels),proactiveLevel:n.proactive_level};return e.json({preferences:s})}catch(n){return e.json({error:n.message},500)}});fe.post("/briefing-preferences",async e=>{const t=e.get("user"),n=await e.req.json(),s=[];if(n.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(n.briefingTime)||s.push("Invalid time format. Use HH:MM (e.g., 20:00)")),n.newsTopics&&(n.newsTopics.length>5&&s.push("Maximum 5 news topics allowed"),n.newsTopics.some(r=>r.length>50)&&s.push("Each news topic must be 50 characters or less")),n.proactiveLevel&&!["conservative","moderate","aggressive"].includes(n.proactiveLevel)&&s.push("Invalid proactive level. Use conservative, moderate, or aggressive"),s.length>0)return e.json({error:s.join("; ")},400);try{const r=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),a=n.components?JSON.stringify(n.components):null,i=n.notificationChannels?JSON.stringify(n.notificationChannels):null,o=n.newsTopics?n.newsTopics.join(", "):null;if(r){const l=[],c=[];n.briefingTime!==void 0&&(l.push("briefing_time = ?"),c.push(n.briefingTime)),n.briefingEnabled!==void 0&&(l.push("briefing_enabled = ?"),c.push(n.briefingEnabled?1:0)),a!==null&&(l.push("components = ?"),c.push(a)),o!==null&&(l.push("news_topics = ?"),c.push(o)),i!==null&&(l.push("notification_channels = ?"),c.push(i)),n.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),c.push(n.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),c.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...c).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,n.briefingTime||"20:00",a||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',o||"AI, LLM, Tools, Agentic Workflows, AI Features",i||'{"telegram":true,"web":true}',n.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(r){return e.json({error:r.message},500)}});fe.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(n){return e.json({error:n.message},500)}});fe.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],a=new Date;for(const i of s.results||[]){if(!i.briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.briefing_time||"20:00";if(!Jr(l,o,a))continue;const c=on(o,a);if(!await e.env.DB.prepare("SELECT 1 FROM briefings WHERE user_id = ? AND briefing_type = 'evening' AND briefing_date = ? LIMIT 1").bind(i.id,c).first())try{const u=await Yr(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),{text:h}=Vr(u.content,u.items);await Ze(e.env.DB,i.id,"Evening Briefing",h,{pinHash:i.pin_hash,tags:["briefing","karna"]}),u.briefingId&&await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(u.briefingId).run(),r.push({user_id:i.id,status:"success",briefing_id:u.briefingId,briefing_time:l,timezone:o})}catch(u){r.push({user_id:i.id,status:"error",error:u.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});fe.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare("SELECT * FROM users").all(),r=[],a=new Date,i=new Date(a.getTime()+600*1e3).toISOString(),o=new Date(a.getTime()+900*1e3).toISOString();for(const l of s.results||[])try{const c=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!c)continue;const d=await J(c.encrypted_value,l.pin_hash),h=JSON.parse(d).access_token;if(!h)continue;const f=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(a.toISOString())}&timeMax=${encodeURIComponent(o)}&maxResults=10`,{headers:{Authorization:`Bearer ${h}`}});if(!f.ok)continue;const v=((await f.json()).items||[]).filter(w=>{var S;const b=(S=w.start)==null?void 0:S.dateTime;return b?b>=a.toISOString()&&b<=i:!1});if(v.length===0){r.push({user_id:l.id,reminders_sent:0});continue}for(const w of v){const b=new Date(w.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),S=w.location?`
📍 ${w.location}`:"",R="Meeting in 10 minutes",B=`${w.summary||"Untitled Event"}
🕐 ${b}${S}`;await Ze(e.env.DB,l.id,R,B,{pinHash:l.pin_hash,priority:"high",tags:["calendar","karna"]})}r.push({user_id:l.id,reminders_sent:v.length})}catch(c){r.push({user_id:l.id,status:"error",error:c.message})}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});fe.post("/cron/morning-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.morning_briefing_time, '08:00') as morning_briefing_time,
             COALESCE(bp.morning_briefing_enabled, 1) as morning_briefing_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],a=new Date;for(const i of s.results||[]){if(!i.morning_briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.morning_briefing_time||"08:00";if(!Jr(l,o,a))continue;const c=on(o,a);if(!await e.env.DB.prepare("SELECT 1 FROM briefings WHERE user_id = ? AND briefing_type = 'morning' AND briefing_date = ? LIMIT 1").bind(i.id,c).first())try{const u=await Zr(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});let h={telegram:!0,web:!0};try{h=JSON.parse(i.notification_channels||"{}")}catch{}if(h.web!==!1&&u.briefingId){const f=dl(u.content);await Ze(e.env.DB,i.id,"Morning Briefing",f,{pinHash:i.pin_hash,tags:["briefing","karna"]}),await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(u.briefingId).run()}r.push({user_id:i.id,status:"success",briefing_id:u.briefingId,briefing_time:l,timezone:o})}catch(u){r.push({user_id:i.id,status:"error",error:u.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});fe.post("/cron/email-digest",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, bp.components
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[];for(const a of s.results||[]){let i={};try{i=JSON.parse(a.components||"{}")}catch{}if(i.email_digest!==!1)try{const o=await Xr(e.env.DB,a,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET},{skipBrowserUse:!0}),l=`Email Digest — ${new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}`,c=JSON.stringify(o,null,2),d=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'email_digest', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(a.id,l,c,`email_digest_${Date.now()}`,null,null,null).first();r.push({user_id:a.id,status:"success",action_item_id:d==null?void 0:d.id,digest:o})}catch(o){r.push({user_id:a.id,status:"error",error:o.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});fe.post("/cron/weekly-review",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const s=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.weekly_review_day_time, 'Sunday 20:00') as weekly_review_day_time,
             COALESCE(bp.weekly_review_enabled, 1) as weekly_review_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],a=new Date;for(const i of s.results||[]){if(!i.weekly_review_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.weekly_review_day_time||"Sunday 20:00";if(ll(l,o,a))try{const c=await cl(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),d=`Weekly Review — Week of ${new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})}`,u=JSON.stringify(c,null,2),h=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'weekly_review', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(i.id,d,u,`weekly_review_${Date.now()}`,null,null,null).first();let f={telegram:!0,web:!0};try{f=JSON.parse(i.notification_channels||"{}")}catch{}if(f.web!==!1){const g=ul(c);await Ze(e.env.DB,i.id,"Weekly Review",g,{pinHash:i.pin_hash,tags:["review","karna"]})}r.push({user_id:i.id,status:"success",action_item_id:h==null?void 0:h.id})}catch(c){r.push({user_id:i.id,status:"error",error:c.message})}}return e.json({executed:r.length,results:r})}catch(s){return e.json({error:s.message},500)}});async function ol(e,t,n,s,r){try{const a=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!a)return;const i=await J(a.encrypted_value,a.pin_hash);if(!(i!=null&&i.trim())){Zi("sendTelegramWithKeyboard: empty bot token",{userId:t.id});return}if(!(await(await ws(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n,parse_mode:"Markdown",reply_markup:{inline_keyboard:s.map(c=>c.map(d=>({...d,callback_data:`${d.callback_data}:${r}`})))}})})).json()).ok){const d=await(await ws(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n.replace(/[_*[`\]]/g,""),reply_markup:{inline_keyboard:s.map(u=>u.map(h=>({...h,callback_data:`${h.callback_data}:${r}`})))}})})).json();if(!d.ok){ls("Telegram briefing send failed",{description:d.description,chatId:t.telegram_chat_id});return}}await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(r).run()}catch(a){ls("Telegram briefing error",{error:(a==null?void 0:a.message)||String(a)})}}async function Zr(e,t,n){const s=new Date;s.setHours(0,0,0,0);const r=new Date;r.setHours(23,59,59,999);const a=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 
    AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,s.toISOString(),r.toISOString()).all(),i=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 10
  `).bind(t.id).all(),o=await Xr(e,t,n,{skipBrowserUse:!0});let l=[];try{const f=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first();if(f){const g=await J(f.encrypted_value,t.pin_hash),w=JSON.parse(g).access_token;if(w){const b=s.toISOString(),S=r.toISOString(),R=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(b)}&timeMax=${encodeURIComponent(S)}&maxResults=20`,{headers:{Authorization:`Bearer ${w}`}});R.ok&&(l=((await R.json()).items||[]).map(N=>{var U,M,G,W;return{title:N.summary||"Untitled",startTime:((U=N.start)==null?void 0:U.dateTime)||((M=N.start)==null?void 0:M.date),endTime:((G=N.end)==null?void 0:G.dateTime)||((W=N.end)==null?void 0:W.date)}}))}}}catch{}const c={generatedAt:new Date().toISOString(),type:"morning",todayReminders:(a.results||[]).map(f=>({name:f.name,description:f.description,next_run:f.next_run})),pendingActions:(i.results||[]).map(f=>({title:f.title,priority:f.priority})),emailDigest:o,calendarEvents:l},d=on(t.timezone||"Asia/Kolkata"),u=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel, briefing_date)
    VALUES (?, 'morning', ?, 'all', ?)
    RETURNING id
  `).bind(t.id,JSON.stringify(c),d).first();return{briefingId:(u==null?void 0:u.id)||0,content:c}}async function Xr(e,t,n,s){const r={unreadCount:0,recent:[]},a={message:"",recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const o=new Re(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET),l=await o.getUnreadCount(),c=await o.listMessages({maxResults:10,labelIds:["INBOX"]});r.unreadCount=l,r.recent=c.map(d=>({id:d.id,subject:d.subject,from:d.from,snippet:d.snippet,isUnread:d.isUnread}))}}catch(i){r.error=i.message}if(s!=null&&s.skipBrowserUse)a.message="Outlook not fetched in automated digest (runs once daily in morning briefing).";else try{const i=await e.prepare("SELECT name, encrypted_blob FROM site_credentials WHERE user_id = ? AND (name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE) LIMIT 1").bind(t.id,"%Outlook%","%Microsoft%","%Office 365%").first();if(!i)a.message="No Outlook credentials saved in Secret Vault. Add them in Settings → Secret Vault.";else{const o=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,"browser_use_api_key").first();if(!o)a.message="Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key.";else{const l=(await J(o.encrypted_value,t.pin_hash)).trim(),c=JSON.parse(await J(i.encrypted_blob,t.pin_hash)),d=await br("Go to https://outlook.live.com or https://outlook.office.com. Log in with username {username} and password {password} if prompted. Navigate to the inbox and extract the 10 most recent emails with sender, subject, date, and snippet. Return the results as structured text.",l,{secrets:{username:c.username,password:c.password},timeoutMs:3e5});d.status==="completed"&&d.output?a.recent=d.output:d.status==="timeout"?a.message="Outlook browser task timed out.":a.message="Outlook returned no content."}}}catch(i){a.message=`Outlook error: ${i.message}`}return{gmail:r,outlook:a}}function ll(e,t,n=new Date){const s=new Date(n.toLocaleString("en-US",{timeZone:t})),r=s.toLocaleDateString("en-US",{weekday:"long"}),a=s.getHours(),i=s.getMinutes(),o=e.trim().split(" "),l=o[o.length-1],c=o.slice(0,o.length-1).join(" "),[d,u]=l.split(":").map(Number),h=a*60+i,f=d*60+u;return r===c&&h===f}async function cl(e,t,n){const s=new Date,r=new Date(s.getTime()-10080*60*1e3),a=new Date(s.getTime()+10080*60*1e3),i=await e.prepare(`
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
  `).bind(t.id,s.toISOString(),a.toISOString()).all();let u={unreadCount:0,recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const f=new Re(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET),g=await f.getUnreadCount(),v=await f.listMessages({maxResults:10,labelIds:["INBOX"]});u={unreadCount:g,recent:v.map(w=>({subject:w.subject,from:w.from,snippet:w.snippet}))}}}catch{}return{generatedAt:s.toISOString(),period:{start:r.toISOString(),end:s.toISOString()},completedTasks:(i.results||[]).map(h=>({name:h.name,last_run:h.last_run})),missedTasks:(o.results||[]).map(h=>({name:h.name,next_run:h.next_run})),openActions:(l.results||[]).map(h=>({title:h.title,priority:h.priority,status:h.status})),recentDocuments:(c.results||[]).map(h=>({name:h.name,status:h.status,created_at:h.created_at})),upcomingTasks:(d.results||[]).map(h=>({name:h.name,next_run:h.next_run})),gmailSummary:u}}function dl(e){const t=[];t.push("☀️ Morning Briefing"),t.push("");const n=e.todayReminders||[];if(n.length>0){t.push(`📋 Today (${n.length}):`);for(const l of n){const c=l.next_run?new Date(l.next_run).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${c} ${l.name}`)}}else t.push("📋 Today: No scheduled reminders");t.push("");const s=e.pendingActions||[];if(s.length>0){t.push(`🔔 Pending Actions (${s.length}):`);for(const l of s.slice(0,5))t.push(`   • ${l.title} (${l.priority})`)}else t.push("🔔 Pending Actions: None");t.push("");const r=e.emailDigest||{},a=r.gmail||{};a.unreadCount>0?t.push(`📧 Gmail: ${a.unreadCount} unread`):t.push("📧 Gmail: Inbox clear");const i=r.outlook||{};typeof i.recent=="string"&&i.recent.length>0?t.push("📧 Outlook: see digest"):i.message&&t.push(`📧 Outlook: ${i.message}`),t.push("");const o=e.calendarEvents||[];if(o.length>0){t.push(`📅 Calendar (${o.length}):`);for(const l of o.slice(0,5)){const c=l.startTime?new Date(l.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${c} ${l.title}`)}}return t.join(`
`)}function ul(e){const t=[];t.push("📊 Weekly Review"),t.push("");const n=e.completedTasks||[];t.push(`✅ Completed: ${n.length}`);const s=e.missedTasks||[];t.push(`❌ Missed/Overdue: ${s.length}`);const r=e.openActions||[];t.push(`🔔 Open Actions: ${r.length}`),t.push("");const a=e.recentDocuments||[];a.length>0&&t.push(`📄 Documents: ${a.length} this week`);const i=e.upcomingTasks||[];i.length>0&&t.push(`📅 Upcoming: ${i.length} in next 7 days`);const o=e.gmailSummary||{};return o.unreadCount>0&&t.push(`📧 Gmail Unread: ${o.unreadCount}`),t.join(`
`)}fe.post("/briefings/:id/resend",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));try{const s=await e.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Briefing not found"},404);const r=JSON.parse(s.content||"{}"),a=await e.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(n).all(),{text:i,inlineKeyboard:o}=Vr(r,a.results||[]);await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(n).run(),await ol(e.env.DB,t,i,o,n);const l=await e.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(n).first();return l!=null&&l.delivered_telegram?e.json({success:!0,message:"Briefing sent to Telegram"}):e.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(s){return e.json({error:s.message},500)}});fe.delete("/briefings/:id",async e=>{const t=e.get("user"),n=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});const ct=new _e;async function Wt(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}function Qr(e){return e.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"")}ct.post("/cron/review-low-confidence",async e=>{if((e.req.header("X-Cron-Secret")||"")!==(e.env.CRON_SECRET||"karna-cron-default-v1"))return e.json({error:"Unauthorized"},401);let n=0,s=0,r=0;try{const a=await e.env.DB.prepare(`SELECT DISTINCT u.id, u.pin_hash
       FROM users u
       JOIN user_skills us ON us.user_id = u.id
       WHERE us.is_auto = 1 AND us.enabled = 1
         AND us.confidence_score < 0.4 AND us.usage_count >= 5`).all();for(const i of a.results??[])try{const{provider:o}=await Ve(e.env.DB,i.id,i.pin_hash),l=await Ki(e.env.DB,o,i.id);n+=l.reviewed,s+=l.rewritten,r+=l.disabled}catch{}}catch(a){return e.json({error:a.message,reviewed:n,rewritten:s,disabled:r},500)}return e.json({reviewed:n,rewritten:s,disabled:r})});ct.get("/",Wt,async e=>{const t=e.get("user"),s=(await e.env.DB.prepare(`SELECT id, name, slug, description, instructions, parameters, required_tools, examples,
            enabled, usage_count, last_used_at, created_at, updated_at,
            is_auto, refinement_count, source, confidence_score
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`).bind(t.id).all()).results||[],r=s.filter(i=>!i.is_auto),a=s.filter(i=>i.is_auto);return e.json({skills:r,auto_skills:a})});ct.post("/",Wt,async e=>{var c,d,u;const t=e.get("user"),n=await e.req.json();if(!((c=n.name)!=null&&c.trim()))return e.json({error:"name is required"},400);if(!((d=n.description)!=null&&d.trim()))return e.json({error:"description is required"},400);if(!((u=n.instructions)!=null&&u.trim()))return e.json({error:"instructions is required"},400);let s=Qr(n.name);s||(s=`skill_${Date.now()}`);const r=await e.env.DB.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(t.id,`${s}%`).all();r.results&&r.results.length>0&&r.results.map(f=>f.slug).includes(s)&&(s=`${s}_${r.results.length+1}`);const a=JSON.stringify(n.parameters||{}),i=JSON.stringify(n.required_tools||[]),o=JSON.stringify(n.examples||[]),l=await e.env.DB.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,n.name.trim(),s,n.description.trim(),n.instructions.trim(),a,i,o).first();return e.json({skill:l,created:!0})});ct.get("/:id",Wt,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(isNaN(n))return e.json({error:"Invalid skill ID"},400);const s=await e.env.DB.prepare("SELECT * FROM user_skills WHERE id = ? AND user_id = ?").bind(n,t.id).first();return s?e.json({skill:s}):e.json({error:"Skill not found"},404)});ct.put("/:id",Wt,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(isNaN(n))return e.json({error:"Invalid skill ID"},400);const s=await e.req.json(),r=[],a=[];return s.name!==void 0&&(r.push("name = ?","slug = ?"),a.push(s.name.trim(),Qr(s.name))),s.description!==void 0&&(r.push("description = ?"),a.push(s.description.trim())),s.instructions!==void 0&&(r.push("instructions = ?"),a.push(s.instructions.trim())),s.parameters!==void 0&&(r.push("parameters = ?"),a.push(JSON.stringify(s.parameters))),s.required_tools!==void 0&&(r.push("required_tools = ?"),a.push(JSON.stringify(s.required_tools))),s.examples!==void 0&&(r.push("examples = ?"),a.push(JSON.stringify(s.examples))),s.enabled!==void 0&&(r.push("enabled = ?"),a.push(s.enabled?1:0)),s.promote&&r.push("is_auto = 0","source = 'user'"),r.length===0?e.json({error:"Nothing to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),await e.env.DB.prepare(`UPDATE user_skills SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});ct.delete("/:id",Wt,async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return isNaN(n)?e.json({error:"Invalid skill ID"},400):(await e.env.DB.prepare("DELETE FROM user_skills WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0}))});const Xe=new _e;async function ml(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}Xe.use("/*",ml);function pl(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}function ea(e){const t=pl(e),n=new Date(t);n.setDate(n.getDate()+1),n.setHours(9,0,0,0);const s=new Date(n.toLocaleString("en-US",{timeZone:"UTC"})),r=new Date(n.toLocaleString("en-US",{timeZone:e})),a=s.getTime()-r.getTime();return new Date(n.getTime()+a)}function ln(e){if(!e)return null;if(e.startsWith("cron:")){const t=parseInt(e.replace("cron:",""),10);return isNaN(t)?null:t}return null}Xe.put("/:id/done",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Notification not found"},404);const r=ln(s.source);return r&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0,cron_completed:r!==null})});Xe.post("/:id/snooze",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json(),r=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!r)return e.json({error:"Notification not found"},404);let a;if(typeof s.minutes=="number")a=new Date(Date.now()+s.minutes*60*1e3);else if(s.until==="tomorrow_morning")a=ea(t.timezone||"UTC");else if(s.new_time)a=new Date(s.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(a.getTime()))return e.json({error:"Invalid time"},400);const i=a.toISOString(),o=ln(r.source);o&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(o,t.id).run();const l=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,r.title,r.body,"once",i,"reminder",JSON.stringify({description:r.body||""}),i,1,"active").first();return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0,job_id:l==null?void 0:l.id})});Xe.post("/:id/reschedule",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{new_time:s}=await e.req.json();if(!s)return e.json({error:"new_time is required"},400);const r=new Date(s);if(isNaN(r.getTime()))return e.json({error:"Invalid time"},400);const a=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!a)return e.json({error:"Notification not found"},404);const i=r.toISOString(),o=ln(a.source);if(o)return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,o,t.id).run(),e.json({success:!0,job_id:o});const l=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,a.title,a.body,"once",i,"reminder",JSON.stringify({description:a.body||""}),i,1,"active").first();return e.json({success:!0,job_id:l==null?void 0:l.id})});Xe.delete("/:id/cancel",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Notification not found"},404);const r=ln(s.source);return r&&await e.env.DB.prepare("UPDATE cron_jobs SET enabled = 0, state = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});Xe.post("/reminders/:id/snooze",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json();if(!await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first())return e.json({error:"Reminder not found"},404);let a;if(typeof s.minutes=="number")a=new Date(Date.now()+s.minutes*60*1e3);else if(s.until_tomorrow_9am)a=ea(t.timezone||"UTC");else if(s.new_time)a=new Date(s.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(a.getTime()))return e.json({error:"Invalid time"},400);const i=a.toISOString();return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,n,t.id).run(),e.json({success:!0})});Xe.post("/reminders/:id/done",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first()?(await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE source = ? AND user_id = ?").bind(`cron:${n}`,t.id).run(),e.json({success:!0})):e.json({error:"Reminder not found"},404)});const Oe=new _e;function hl(e){return e.split(`
`).filter(t=>!/^(system:|assistant:|ignore previous|follow these instructions|tool:)/i.test(t.trim())).join(`
`).slice(0,4e3)}async function gl(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}Oe.use("/*",gl);Oe.get("/",async e=>{const t=e.get("user"),n=e.req.query("status"),s=e.req.query("search"),r=["user_id = ?"],a=[t.id];n&&(r.push("status = ?"),a.push(n)),s&&(r.push("(name LIKE ? OR summary LIKE ?)"),a.push(`%${s}%`,`%${s}%`));const i=`SELECT * FROM document_library WHERE ${r.join(" AND ")} ORDER BY created_at DESC`,o=await e.env.DB.prepare(i).bind(...a).all();return e.json({documents:o.results||[]})});Oe.get("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return s?e.json({document:s}):e.json({error:"Document not found"},404)});Oe.post("/upload",async e=>{const t=e.get("user"),n=!!e.env.DOCUMENTS_BUCKET,s=n?100*1024*1024:700*1024;try{const a=(await e.req.formData()).get("file");if(!a)return e.json({error:"No file provided."},400);const i=a.name,o=a.type||"application/octet-stream",l=a.size;if(l>s)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead.`},400);const c=await a.arrayBuffer(),d=crypto.randomUUID();let u;n?(await e.env.DOCUMENTS_BUCKET.put(d,c,{httpMetadata:{contentType:o},customMetadata:{fileName:i,userId:String(t.id)}}),u="r2"):u=Buffer.from(c).toString("base64"),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(d,t.id,i,o,u,l).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,d,"upload",i,o,l,"uploaded").run();const h=o==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||i.toLowerCase().endsWith(".docx");if(h)try{const{extractDocxTextFromBuffer:g}=await Promise.resolve().then(()=>Tr),v=await g(Buffer.from(c));if(v.length>50){await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(v,d).run();const w=v.substring(0,600);await e.env.DB.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(w,v.substring(0,5e4),d,t.id).run();const b=e.env,S=t.id,R=v,B=d,N=(async()=>{try{const U=await b.DB.prepare("SELECT id FROM document_library WHERE file_id = ? AND user_id = ?").bind(B,S).first();if(U){const{indexDocumentChunks:M}=await Promise.resolve().then(()=>Ke);await M({DB:b.DB,AI:b.AI,VECTORIZE:b.VECTORIZE},S,U.id,R)}}catch{}})();try{e.executionCtx.waitUntil(N)}catch{}}}catch{}const f=o==="application/pdf"||i.toLowerCase().endsWith(".pdf");if(f&&t.pin_hash){const g=Buffer.from(c).toString("base64"),v=t.pin_hash,w=t.id,b=e.env.DB,S=e.env.DOCUMENTS_BUCKET,R=e.env,B=(async()=>{var N,U;try{let M=null,G="claude-sonnet-4-6";const{decrypt:W}=await Promise.resolve().then(()=>rn);for(const Z of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const te=await b.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(w,Z).first();if(te){const ie=await W(te.encrypted_value,v),re=JSON.parse(ie);if(re.provider==="anthropic"){M=re.apiKey,re.model&&(G=re.model);break}}}catch{}if(!M)return;let ne=g;if(u==="r2"&&S){const Z=await S.get(d);if(!Z)return;ne=Buffer.from(await Z.arrayBuffer()).toString("base64")}const $=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":M,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:G,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:ne}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!$.ok)return;const q=((U=(N=(await $.json()).content)==null?void 0:N[0])==null?void 0:U.text)||"";if(q){await b.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(q,d).run();const Z=q.substring(0,600);await b.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(Z,q.substring(0,5e4),d,w).run();try{const te=await b.prepare("SELECT id FROM document_library WHERE file_id = ? AND user_id = ?").bind(d,w).first();if(te){const{indexDocumentChunks:ie}=await Promise.resolve().then(()=>Ke);await ie({DB:b,AI:R.AI,VECTORIZE:R.VECTORIZE},w,te.id,q)}}catch{}}}catch{}})();try{e.executionCtx.waitUntil(B)}catch{}}return e.json({file_id:d,name:i,type:o,size:l,storage:n?"r2":"d1",extracting:f&&!h})}catch(r){return console.error("Document upload error:",r),e.json({error:`Upload failed: ${r.message||"Unknown error"}`},500)}});Oe.post("/search",async e=>{const t=e.get("user"),n=await e.req.json();if(!n.query)return e.json({error:"query is required"},400);const{semanticDocumentSearch:s}=await Promise.resolve().then(()=>Ke),r=await s({DB:e.env.DB,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE},t.id,n.query,Math.min(n.limit||5,20));return e.json({results:r})});Oe.post("/chat",async e=>{var o;const t=e.get("user"),n=await e.req.json(),s=(n.question||n.query||"").trim();if(!s)return e.json({error:"question is required"},400);const{semanticDocumentSearch:r}=await Promise.resolve().then(()=>Ke),a=await r({DB:e.env.DB,AI:e.env.AI,VECTORIZE:e.env.VECTORIZE},t.id,s,6);let i;if(a.length===0)i="No relevant document content found for your question. Make sure your documents have been uploaded and processed first.";else{const l=a.map((c,d)=>`[Source ${d+1}: ${c.filename} | chunk ${c.chunk_index}]
${hl(c.chunk)}`).join(`

---

`);try{const{provider:c}=await Ve(e.env.DB,t.id,t.pin_hash);i=((o=(await c.chat([{role:"system",content:"Answer using only the provided excerpts. For every key statement, cite sources as [S1], [S2], etc. Do not fabricate citations."},{role:"user",content:`Document excerpts:

${l}

Question: ${s}`}],{maxTokens:1024})).content)==null?void 0:o.trim())||"Could not generate an answer."}catch{i="Unable to generate an answer at this time. Please try again."}}return e.json({answer:i,session_id:n.session_id||crypto.randomUUID(),sources:a.map((l,c)=>({source_id:`S${c+1}`,filename:l.filename,chunk_index:l.chunk_index,relevance_score:l.relevance_score,retrieval_method:l.retrieval_method}))})});Oe.post("/",async e=>{const t=e.get("user"),n=await e.req.json();if(!n.name||typeof n.name!="string")return e.json({error:"name is required"},400);const s=n.source||"upload",r=n.mime_type||"application/octet-stream",a=typeof n.size=="number"?n.size:0,i=await e.env.DB.prepare(`INSERT INTO document_library (user_id, name, source, file_id, drive_file_id, mime_type, size, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,n.name,s,n.file_id||null,n.drive_file_id||null,r,a,"uploaded").first();return e.json({success:!0,document:i})});Oe.post("/:id/summarize",async e=>{var c;const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Document not found"},404);let r=null;if(s.file_id){const d=await e.env.DB.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(s.file_id,t.id).first();r=(d==null?void 0:d.extracted_text)||null}let a=null;if(r)try{const{provider:d}=await Ve(e.env.DB,t.id,t.pin_hash);a=((c=(await d.chat([{role:"system",content:"You are a helpful assistant that summarizes documents concisely."},{role:"user",content:`Summarize the following document in a few paragraphs:

${r.substring(0,8e3)}`}],{maxTokens:1024})).content)==null?void 0:c.trim())||null}catch{a=null}const i=a||"Summary not yet generated. Ask Karna in chat to summarize this document.";await e.env.DB.prepare("UPDATE document_library SET status = ?, summary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("summarized",i,n,t.id).run();const l=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return e.json({success:!0,document:l})});Oe.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});Oe.post("/:id/parse",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));await e.env.DB.prepare("UPDATE document_library SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("parsed",n,t.id).run();const s=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return e.json({success:!0,document:s})});const Te=new _e;async function fl(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}Te.use("/*",fl);Te.get("/review",async e=>{const t=e.get("user"),n=e.req.query("tier"),s=e.req.query("type"),r=e.req.query("search"),a=parseInt(e.req.query("limit")||"50");let i="SELECT * FROM memory WHERE user_id = ?";const o=[t.id];n&&(i+=" AND tier = ?",o.push(n)),s&&(i+=" AND type = ?",o.push(s)),r&&(i+=" AND (title LIKE ? OR content LIKE ?)",o.push(`%${r}%`,`%${r}%`)),i+=" ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?",o.push(a);const l=await e.env.DB.prepare(i).bind(...o).all(),c=await e.env.DB.prepare("SELECT tier, COUNT(*) as cnt FROM memory WHERE user_id = ? GROUP BY tier").bind(t.id).all(),d={working:0,long_term:0};for(const u of c.results||[])d[u.tier]=u.cnt;return e.json({memories:l.results||[],tier_counts:d})});Te.put("/review/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.req.json(),r=[],a=[];return s.title!==void 0&&(r.push("title = ?"),a.push(s.title)),s.content!==void 0&&(r.push("content = ?"),a.push(s.content)),s.importance!==void 0&&(r.push("importance = ?"),a.push(s.importance)),s.tier!==void 0&&(r.push("tier = ?"),a.push(s.tier)),r.length===0?e.json({error:"Nothing to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),a.push(n,t.id),await e.env.DB.prepare(`UPDATE memory SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...a).run(),e.json({success:!0}))});Te.post("/review/:id/promote",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new X(e.env.DB).promote(n,t.id),e.json({success:!0})});Te.post("/review/:id/demote",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new X(e.env.DB).demote(n,t.id),e.json({success:!0})});Te.delete("/review/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new X(e.env.DB).remove(n,t.id),e.json({success:!0})});Te.get("/suggestions",async e=>{const t=e.get("user"),n=e.req.query("status")||"pending",s=parseInt(e.req.query("limit")||"50"),r=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT ?").bind(t.id,n,s).all();return e.json({suggestions:r.results||[]})});Te.post("/suggestions/:id/accept",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),s=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(n,t.id).first();return s?(await new X(e.env.DB).store(t.id,s.type,s.title,s.content,s.importance,"long_term"),await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'accepted', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});Te.post("/suggestions/:id/reject",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT id FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(n,t.id).first()?(await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'rejected', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});Te.post("/suggestions",async e=>{const t=e.get("user"),{type:n,title:s,content:r,importance:a,source_message_id:i}=await e.req.json();if(!n||!s||!r)return e.json({error:"type, title, and content are required"},400);const o=await e.env.DB.prepare("INSERT INTO memory_suggestions (user_id, type, title, content, importance, status, source_message_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id").bind(t.id,n,s,r,a??5,"pending",i||null).first();return e.json({success:!0,id:o==null?void 0:o.id})});Te.post("/migrate-documents-out",async e=>{const t=e.get("user"),s=(await e.env.DB.prepare(`
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
      `).bind(t.id,o.title,d,u).run();const h=`[Migrated to Document Library] ${o.title} — content moved to Document Library. Search for it with search_library("${o.title.substring(0,40)}").`;await e.env.DB.prepare("UPDATE memory SET content = ?, importance = 4, tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(h,o.id,t.id).run(),r++,i.length<5&&i.push({id:o.id,title:o.title,action:"migrated to document_library, memory demoted to pointer"})}catch{a++}}return e.json({migrated:r,skipped:a,samples:i,message:`Moved ${r} bulky memory entries to Document Library. ${a} entries were skipped (too short or migration error).`})});const dt=new _e;async function yl(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const s=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!s)return e.json({error:"Invalid session"},401);e.set("user",{id:s.user_id,username:s.username,name:s.name,pin_hash:s.pin_hash,personality_prompt:s.personality_prompt,telegram_chat_id:s.telegram_chat_id,timezone:s.timezone,assistant_name:s.assistant_name||"Karna",created_at:s.created_at,updated_at:s.updated_at}),e.set("sessionId",n),await t()}dt.use("/*",yl);function cn(e){return{id:e.id,title:e.title||"",content:e.content,tags:e.tags||"",source:e.source,source_query:e.source_query||"",is_pinned:e.is_pinned?1:0,created_at:e.created_at,updated_at:e.updated_at}}dt.get("/",async e=>{const t=e.get("user"),n=Math.min(parseInt(e.req.query("limit")||"50",10)||50,200),s=parseInt(e.req.query("offset")||"0",10)||0,r=e.req.query("tag"),a=e.req.query("pinned_only")==="true"||e.req.query("pinned_only")==="1",i=["user_id = ?"],o=[t.id];r&&(i.push("tags LIKE ?"),o.push(`%${r}%`)),a&&i.push("is_pinned = 1");const l=i.join(" AND "),c=await e.env.DB.prepare(`SELECT COUNT(*) as total FROM notes WHERE ${l}`).bind(...o).first();o.push(n,s);const d=await e.env.DB.prepare(`SELECT * FROM notes WHERE ${l} ORDER BY is_pinned DESC, updated_at DESC LIMIT ? OFFSET ?`).bind(...o).all();return e.json({notes:(d.results||[]).map(cn),total:(c==null?void 0:c.total)||0})});dt.get("/search",async e=>{const t=e.get("user"),n=(e.req.query("q")||"").trim();if(!n)return e.json({notes:[]});const s=`%${n}%`,r=await e.env.DB.prepare(`SELECT * FROM notes WHERE user_id = ? AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
     ORDER BY updated_at DESC LIMIT 50`).bind(t.id,s,s,s).all();return e.json({notes:(r.results||[]).map(cn)})});dt.post("/",async e=>{const t=e.get("user"),n=await e.req.json(),s=(n.content||"").trim();if(!s)return e.json({error:"content is required"},400);const r=n.source&&["manual","research","chat"].includes(n.source)?n.source:"manual",a=n.is_pinned?1:0,i=await e.env.DB.prepare(`INSERT INTO notes (user_id, title, content, tags, source, source_query, is_pinned)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     RETURNING *`).bind(t.id,(n.title||"").trim(),s,(n.tags||"").trim(),r,(n.source_query||"").trim(),a).first();return e.json({note:cn(i)})});dt.put("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"),10);if(!n)return e.json({error:"Invalid note id"},400);if(!await e.env.DB.prepare("SELECT id FROM notes WHERE id = ? AND user_id = ?").bind(n,t.id).first())return e.json({error:"Note not found"},404);const r=await e.req.json(),a=[],i=[];if(r.title!==void 0&&(a.push("title = ?"),i.push(r.title)),r.content!==void 0){const l=r.content.trim();if(!l)return e.json({error:"content cannot be empty"},400);a.push("content = ?"),i.push(l)}if(r.tags!==void 0&&(a.push("tags = ?"),i.push(r.tags)),r.is_pinned!==void 0&&(a.push("is_pinned = ?"),i.push(r.is_pinned?1:0)),a.length===0)return e.json({error:"No fields to update"},400);a.push("updated_at = CURRENT_TIMESTAMP"),i.push(n,t.id);const o=await e.env.DB.prepare(`UPDATE notes SET ${a.join(", ")} WHERE id = ? AND user_id = ? RETURNING *`).bind(...i).first();return e.json({note:cn(o)})});dt.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"),10);return n?(await e.env.DB.prepare("DELETE FROM notes WHERE id = ? AND user_id = ?").bind(n,t.id).run()).meta.changes?e.json({success:!0}):e.json({error:"Note not found"},404):e.json({error:"Invalid note id"},400)});const he=new _e,vl=["/api/auth","/api/chat","/api/settings","/api/telegram","/api/system","/api/proactive","/api/skills","/api/notifications","/api/documents","/api/memory","/api/notes"];async function wl(e){const t=e.env.RENDER_BACKEND_URL,n=e.env.RENDER_API_SECRET;if(!(e.env.ENABLE_RENDER_PROXY==="true")||!t||!n||e.req.header("x-via-render-worker")||!vl.some(g=>e.req.path.startsWith(g)))return null;const a=new URL(e.req.url);a.protocol=new URL(t).protocol,a.host=new URL(t).host;const i=new Headers(e.req.header());i.set("x-render-api-secret",n);const o=e.req.path.startsWith("/api/chat")||e.req.path.startsWith("/api/telegram"),l=Number(e.env.RENDER_PROXY_TIMEOUT_MS_LONG||"310000"),c=Number(e.env.RENDER_PROXY_TIMEOUT_MS||"8000"),d=o?l:c,u=new AbortController,h=setTimeout(()=>u.abort("render-proxy-timeout"),d);let f;try{f=await fetch(a.toString(),{method:e.req.method,headers:i,body:e.req.method==="GET"||e.req.method==="HEAD"?void 0:await e.req.arrayBuffer(),signal:u.signal})}catch(g){return e.json({error:"Render backend unavailable",detail:String(g)},503)}finally{clearTimeout(h)}return new Response(f.body,{status:f.status,headers:f.headers})}he.use("/api/*",Ua({exposeHeaders:["X-Thread-Id"]}));he.use("/api/*",async(e,t)=>{const n=await wl(e);if(n)return n;await t()});he.route("/api/auth",Je);he.route("/api/chat",le);he.route("/api/settings",se);he.route("/api/system",Ne);he.route("/api/telegram",Gt);he.route("/api/proactive",fe);he.route("/api/skills",ct);he.route("/api/notifications",Xe);he.route("/api/documents",Oe);he.route("/api/memory",Te);he.route("/api/notes",dt);he.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),n=t.searchParams.get("code"),s=t.searchParams.get("state"),r=t.searchParams.get("error");if(r)return e.html(ht(!1,`Google denied access: ${r}`));if(!n||!s)return e.html(ht(!1,"Missing authorization code or state parameter."));try{const i=JSON.parse(atob(s)).sessionId;if(!i)return e.html(ht(!1,"Invalid state parameter — missing session."));const o=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(i).first();if(!o)return e.html(ht(!1,"Session expired. Please log in again and retry."));const l=o.user_id,c=o.pin_hash,d=`${t.protocol}//${t.host}/auth/google/callback`,u=await nr(e.env.DB,l,c,n,d,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(ht(!0,`Connected as ${u.email}`,u.email))}catch(a){return e.html(ht(!1,`OAuth failed: ${a.message}`))}});he.get("/preview-dashboard",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.html(ni())));he.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(Fs(e.env.API_BASE_URL||""))));he.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(Fs(e.env.API_BASE_URL||""))));function ht(e,t,n){return`<!DOCTYPE html>
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
</body></html>`}const bl={fetch:he.fetch},bs=new _e,_l=Object.assign({"/src/index.tsx":bl});let ta=!1;for(const[,e]of Object.entries(_l))e&&(bs.all("*",t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),bs.notFound(t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),ta=!0);if(!ta)throw new Error("Can't import modules from ['/src/index.tsx']");function na(e){if(e.length<100)return e.trim()?[e.trim()]:[];const r=[];let a=0;for(;a<e.length;){let i=Math.min(a+1800,e.length);if(i<e.length){const l=e.lastIndexOf(`

`,i);if(l>a+1800/2)i=l+2;else{const c=e.lastIndexOf(". ",i);c>a+1800/2&&(i=c+2)}}const o=e.slice(a,i).trim();o.length>=100&&r.push(o),a=i-200,a<=0&&(a=i)}return r}async function El(e,t,n,s){if(!e.AI||!e.VECTORIZE)return;const r=na(s);if(r.length===0)return;const a=await e.DB.prepare("SELECT vector_id FROM document_chunks WHERE document_id = ?").bind(n).all();a.results.length>0&&(await e.VECTORIZE.deleteByIds(a.results.map(d=>d.vector_id)),await e.DB.prepare("DELETE FROM document_chunks WHERE document_id = ?").bind(n).run());const o=(await e.AI.run("@cf/baai/bge-large-en-v1.5",{text:r})).data,l=r.map((d,u)=>`doc_${n}_${u}`);await e.VECTORIZE.insert(r.map((d,u)=>({id:l[u],values:o[u],metadata:{userId:String(t),documentId:String(n)}})));const c=e.DB.prepare("INSERT INTO document_chunks (user_id, document_id, chunk_index, text, vector_id) VALUES (?, ?, ?, ?, ?)");await e.DB.batch(r.map((d,u)=>c.bind(t,n,u,d,l[u])))}async function Tl(e,t,n,s=5){if(!e.AI||!e.VECTORIZE)return[];const a=(await e.AI.run("@cf/baai/bge-large-en-v1.5",{text:[n]})).data[0],i=await e.VECTORIZE.query(a,{topK:s*3,filter:{userId:String(t)}});if(!i.matches||i.matches.length===0)return[];const o=i.matches.map(v=>v.id),l=new Map(i.matches.map(v=>[v.id,v.score])),c=o.map(()=>"?").join(","),u=((await e.DB.prepare(`SELECT dc.text, dc.vector_id, dc.document_id, dl.name, dc.chunk_index
     FROM document_chunks dc
     JOIN document_library dl ON dc.document_id = dl.id
     WHERE dc.vector_id IN (${c}) AND dc.user_id = ?`).bind(...o,t).all()).results||[]).map(v=>({filename:v.name,relevance_score:l.get(v.vector_id)??0,chunk:v.text,document_id:v.document_id,chunk_index:v.chunk_index,retrieval_method:"vector"})),f=((await e.DB.prepare(`SELECT dc.text, dc.document_id, dc.chunk_index, dl.name
     FROM document_chunks dc
     JOIN document_library dl ON dc.document_id = dl.id
     WHERE dc.user_id = ? AND dc.text LIKE ?
     ORDER BY dc.chunk_index DESC
     LIMIT ?`).bind(t,`%${n.substring(0,80)}%`,s*2).all()).results||[]).map(v=>({filename:v.name,relevance_score:.55,chunk:v.text,document_id:v.document_id,chunk_index:v.chunk_index,retrieval_method:"keyword"})),g=new Map;for(const v of[...u,...f]){const w=`${v.document_id}:${v.chunk_index}`;if(!g.has(w))g.set(w,v);else{const b=g.get(w);g.set(w,{...b,relevance_score:Math.max(b.relevance_score,v.relevance_score),retrieval_method:"hybrid"})}}return[...g.values()].sort((v,w)=>w.relevance_score-v.relevance_score).slice(0,s)}const Ke=Object.freeze(Object.defineProperty({__proto__:null,chunkText:na,indexDocumentChunks:El,semanticDocumentSearch:Tl},Symbol.toStringTag,{value:"Module"}));export{bs as default};
