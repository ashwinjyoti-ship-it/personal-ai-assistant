var Qn=Object.defineProperty;var ur=e=>{throw TypeError(e)};var ea=(e,t,r)=>t in e?Qn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var L=(e,t,r)=>ea(e,typeof t!="symbol"?t+"":t,r),Ft=(e,t,r)=>t.has(e)||ur("Cannot "+r);var k=(e,t,r)=>(Ft(e,t,"read from private field"),r?r.call(e):t.get(e)),z=(e,t,r)=>t.has(e)?ur("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),P=(e,t,r,n)=>(Ft(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r),V=(e,t,r)=>(Ft(e,t,"access private method"),r);var mr=(e,t,r,n)=>({set _(a){P(e,t,a,r)},get _(){return k(e,t,n)}});var pr=(e,t,r)=>(n,a)=>{let s=-1;return i(0);async function i(o){if(o<=s)throw new Error("next() called multiple times");s=o;let l,d=!1,c;if(e[o]?(c=e[o][0][0],n.req.routeIndex=o):c=o===e.length&&a||void 0,c)try{l=await c(n,()=>i(o+1))}catch(m){if(m instanceof Error&&t)n.error=m,l=await t(m,n),d=!0;else throw m}else n.finalized===!1&&r&&(l=await r(n));return l&&(n.finalized===!1||d)&&(n.res=l),n}},ta=Symbol(),ra=async(e,t=Object.create(null))=>{const{all:r=!1,dot:n=!1}=t,s=(e instanceof Fr?e.raw.headers:e.headers).get("Content-Type");return s!=null&&s.startsWith("multipart/form-data")||s!=null&&s.startsWith("application/x-www-form-urlencoded")?na(e,{all:r,dot:n}):{}};async function na(e,t){const r=await e.formData();return r?aa(r,t):{}}function aa(e,t){const r=Object.create(null);return e.forEach((n,a)=>{t.all||a.endsWith("[]")?sa(r,a,n):r[a]=n}),t.dot&&Object.entries(r).forEach(([n,a])=>{n.includes(".")&&(ia(r,n,a),delete r[n])}),r}var sa=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},ia=(e,t,r)=>{let n=e;const a=t.split(".");a.forEach((s,i)=>{i===a.length-1?n[s]=r:((!n[s]||typeof n[s]!="object"||Array.isArray(n[s])||n[s]instanceof File)&&(n[s]=Object.create(null)),n=n[s])})},Br=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},oa=e=>{const{groups:t,path:r}=la(e),n=Br(r);return da(n,t)},la=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,n)=>{const a=`@${n}`;return t.push([a,r]),a}),{groups:t,path:e}},da=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[n]=t[r];for(let a=e.length-1;a>=0;a--)if(e[a].includes(n)){e[a]=e[a].replace(n,t[r][1]);break}}return e},Ot={},ca=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const n=`${e}#${t}`;return Ot[n]||(r[2]?Ot[n]=t&&t[0]!==":"&&t[0]!=="*"?[n,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Ot[n]=[e,r[1],!0]),Ot[n]}return null},rr=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},ua=e=>rr(e,decodeURI),jr=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let n=r;for(;n<t.length;n++){const a=t.charCodeAt(n);if(a===37){const s=t.indexOf("?",n),i=t.indexOf("#",n),o=s===-1?i===-1?void 0:i:i===-1?s:Math.min(s,i),l=t.slice(r,o);return ua(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(a===63||a===35)break}return t.slice(r,n)},ma=e=>{const t=jr(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Xe=(e,t,...r)=>(r.length&&(t=Xe(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Pr=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let n="";return t.forEach(a=>{if(a!==""&&!/\:/.test(a))n+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){r.length===0&&n===""?r.push("/"):r.push(n);const s=a.replace("?","");n+="/"+s,r.push(n)}else n+="/"+a}),r.filter((a,s,i)=>i.indexOf(a)===s)},Gt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?rr(e,Hr):e):e,Ur=(e,t,r)=>{let n;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const o=e.charCodeAt(i+t.length+1);if(o===61){const l=i+t.length+2,d=e.indexOf("&",l);return Gt(e.slice(l,d===-1?void 0:d))}else if(o==38||isNaN(o))return"";i=e.indexOf(`&${t}`,i+1)}if(n=/[%+]/.test(e),!n)return}const a={};n??(n=/[%+]/.test(e));let s=e.indexOf("?",8);for(;s!==-1;){const i=e.indexOf("&",s+1);let o=e.indexOf("=",s);o>i&&i!==-1&&(o=-1);let l=e.slice(s+1,o===-1?i===-1?void 0:i:o);if(n&&(l=Gt(l)),s=i,l==="")continue;let d;o===-1?d="":(d=e.slice(o+1,i===-1?void 0:i),n&&(d=Gt(d))),r?(a[l]&&Array.isArray(a[l])||(a[l]=[]),a[l].push(d)):a[l]??(a[l]=d)}return t?a[t]:a},pa=Ur,ha=(e,t)=>Ur(e,t,!0),Hr=decodeURIComponent,hr=e=>rr(e,Hr),rt,pe,De,Gr,Wr,Vt,Ce,Cr,Fr=(Cr=class{constructor(e,t="/",r=[[]]){z(this,De);L(this,"raw");z(this,rt);z(this,pe);L(this,"routeIndex",0);L(this,"path");L(this,"bodyCache",{});z(this,Ce,e=>{const{bodyCache:t,raw:r}=this,n=t[e];if(n)return n;const a=Object.keys(t)[0];return a?t[a].then(s=>(a==="json"&&(s=JSON.stringify(s)),new Response(s)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,P(this,pe,r),P(this,rt,{})}param(e){return e?V(this,De,Gr).call(this,e):V(this,De,Wr).call(this)}query(e){return pa(this.url,e)}queries(e){return ha(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,n)=>{t[n]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await ra(this,e))}json(){return k(this,Ce).call(this,"text").then(e=>JSON.parse(e))}text(){return k(this,Ce).call(this,"text")}arrayBuffer(){return k(this,Ce).call(this,"arrayBuffer")}blob(){return k(this,Ce).call(this,"blob")}formData(){return k(this,Ce).call(this,"formData")}addValidatedData(e,t){k(this,rt)[e]=t}valid(e){return k(this,rt)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[ta](){return k(this,pe)}get matchedRoutes(){return k(this,pe)[0].map(([[,e]])=>e)}get routePath(){return k(this,pe)[0].map(([[,e]])=>e)[this.routeIndex].path}},rt=new WeakMap,pe=new WeakMap,De=new WeakSet,Gr=function(e){const t=k(this,pe)[0][this.routeIndex][1][e],r=V(this,De,Vt).call(this,t);return r&&/\%/.test(r)?hr(r):r},Wr=function(){const e={},t=Object.keys(k(this,pe)[0][this.routeIndex][1]);for(const r of t){const n=V(this,De,Vt).call(this,k(this,pe)[0][this.routeIndex][1][r]);n!==void 0&&(e[r]=/\%/.test(n)?hr(n):n)}return e},Vt=function(e){return k(this,pe)[1]?k(this,pe)[1][e]:e},Ce=new WeakMap,Cr),ga={Stringify:1},qr=async(e,t,r,n,a)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const s=e.callbacks;return s!=null&&s.length?(a?a[0]+=e:a=[e],Promise.all(s.map(o=>o({phase:t,buffer:a,context:n}))).then(o=>Promise.all(o.filter(Boolean).map(l=>qr(l,t,!1,n,a))).then(()=>a[0]))):Promise.resolve(e)},fa="text/plain; charset=UTF-8",Wt=(e,t)=>({"Content-Type":e,...t}),_t,Et,Te,nt,xe,ue,Tt,at,st,Ge,xt,St,Ne,Qe,Nr,ya=(Nr=class{constructor(e,t){z(this,Ne);z(this,_t);z(this,Et);L(this,"env",{});z(this,Te);L(this,"finalized",!1);L(this,"error");z(this,nt);z(this,xe);z(this,ue);z(this,Tt);z(this,at);z(this,st);z(this,Ge);z(this,xt);z(this,St);L(this,"render",(...e)=>(k(this,at)??P(this,at,t=>this.html(t)),k(this,at).call(this,...e)));L(this,"setLayout",e=>P(this,Tt,e));L(this,"getLayout",()=>k(this,Tt));L(this,"setRenderer",e=>{P(this,at,e)});L(this,"header",(e,t,r)=>{this.finalized&&P(this,ue,new Response(k(this,ue).body,k(this,ue)));const n=k(this,ue)?k(this,ue).headers:k(this,Ge)??P(this,Ge,new Headers);t===void 0?n.delete(e):r!=null&&r.append?n.append(e,t):n.set(e,t)});L(this,"status",e=>{P(this,nt,e)});L(this,"set",(e,t)=>{k(this,Te)??P(this,Te,new Map),k(this,Te).set(e,t)});L(this,"get",e=>k(this,Te)?k(this,Te).get(e):void 0);L(this,"newResponse",(...e)=>V(this,Ne,Qe).call(this,...e));L(this,"body",(e,t,r)=>V(this,Ne,Qe).call(this,e,t,r));L(this,"text",(e,t,r)=>!k(this,Ge)&&!k(this,nt)&&!t&&!r&&!this.finalized?new Response(e):V(this,Ne,Qe).call(this,e,t,Wt(fa,r)));L(this,"json",(e,t,r)=>V(this,Ne,Qe).call(this,JSON.stringify(e),t,Wt("application/json",r)));L(this,"html",(e,t,r)=>{const n=a=>V(this,Ne,Qe).call(this,a,t,Wt("text/html; charset=UTF-8",r));return typeof e=="object"?qr(e,ga.Stringify,!1,{}).then(n):n(e)});L(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});L(this,"notFound",()=>(k(this,st)??P(this,st,()=>new Response),k(this,st).call(this,this)));P(this,_t,e),t&&(P(this,xe,t.executionCtx),this.env=t.env,P(this,st,t.notFoundHandler),P(this,St,t.path),P(this,xt,t.matchResult))}get req(){return k(this,Et)??P(this,Et,new Fr(k(this,_t),k(this,St),k(this,xt))),k(this,Et)}get event(){if(k(this,xe)&&"respondWith"in k(this,xe))return k(this,xe);throw Error("This context has no FetchEvent")}get executionCtx(){if(k(this,xe))return k(this,xe);throw Error("This context has no ExecutionContext")}get res(){return k(this,ue)||P(this,ue,new Response(null,{headers:k(this,Ge)??P(this,Ge,new Headers)}))}set res(e){if(k(this,ue)&&e){e=new Response(e.body,e);for(const[t,r]of k(this,ue).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const n=k(this,ue).headers.getSetCookie();e.headers.delete("set-cookie");for(const a of n)e.headers.append("set-cookie",a)}else e.headers.set(t,r)}P(this,ue,e),this.finalized=!0}get var(){return k(this,Te)?Object.fromEntries(k(this,Te)):{}}},_t=new WeakMap,Et=new WeakMap,Te=new WeakMap,nt=new WeakMap,xe=new WeakMap,ue=new WeakMap,Tt=new WeakMap,at=new WeakMap,st=new WeakMap,Ge=new WeakMap,xt=new WeakMap,St=new WeakMap,Ne=new WeakSet,Qe=function(e,t,r){const n=k(this,ue)?new Headers(k(this,ue).headers):k(this,Ge)??new Headers;if(typeof t=="object"&&"headers"in t){const s=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,o]of s)i.toLowerCase()==="set-cookie"?n.append(i,o):n.set(i,o)}if(r)for(const[s,i]of Object.entries(r))if(typeof i=="string")n.set(s,i);else{n.delete(s);for(const o of i)n.append(s,o)}const a=typeof t=="number"?t:(t==null?void 0:t.status)??k(this,nt);return new Response(e,{status:a,headers:n})},Nr),ae="ALL",va="all",wa=["get","post","put","delete","options","patch"],zr="Can not add a route since the matcher is already built.",Kr=class extends Error{},ba="__COMPOSED_HANDLER",_a=e=>e.text("404 Not Found",404),gr=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},fe,se,Yr,ye,He,It,Ct,it,Ea=(it=class{constructor(t={}){z(this,se);L(this,"get");L(this,"post");L(this,"put");L(this,"delete");L(this,"options");L(this,"patch");L(this,"all");L(this,"on");L(this,"use");L(this,"router");L(this,"getPath");L(this,"_basePath","/");z(this,fe,"/");L(this,"routes",[]);z(this,ye,_a);L(this,"errorHandler",gr);L(this,"onError",t=>(this.errorHandler=t,this));L(this,"notFound",t=>(P(this,ye,t),this));L(this,"fetch",(t,...r)=>V(this,se,Ct).call(this,t,r[1],r[0],t.method));L(this,"request",(t,r,n,a)=>t instanceof Request?this.fetch(r?new Request(t,r):t,n,a):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Xe("/",t)}`,r),n,a)));L(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(V(this,se,Ct).call(this,t.request,t,void 0,t.request.method))})});[...wa,va].forEach(s=>{this[s]=(i,...o)=>(typeof i=="string"?P(this,fe,i):V(this,se,He).call(this,s,k(this,fe),i),o.forEach(l=>{V(this,se,He).call(this,s,k(this,fe),l)}),this)}),this.on=(s,i,...o)=>{for(const l of[i].flat()){P(this,fe,l);for(const d of[s].flat())o.map(c=>{V(this,se,He).call(this,d.toUpperCase(),k(this,fe),c)})}return this},this.use=(s,...i)=>(typeof s=="string"?P(this,fe,s):(P(this,fe,"*"),i.unshift(s)),i.forEach(o=>{V(this,se,He).call(this,ae,k(this,fe),o)}),this);const{strict:n,...a}=t;Object.assign(this,a),this.getPath=n??!0?t.getPath??jr:ma}route(t,r){const n=this.basePath(t);return r.routes.map(a=>{var i;let s;r.errorHandler===gr?s=a.handler:(s=async(o,l)=>(await pr([],r.errorHandler)(o,()=>a.handler(o,l))).res,s[ba]=a.handler),V(i=n,se,He).call(i,a.method,a.path,s)}),this}basePath(t){const r=V(this,se,Yr).call(this);return r._basePath=Xe(this._basePath,t),r}mount(t,r,n){let a,s;n&&(typeof n=="function"?s=n:(s=n.optionHandler,n.replaceRequest===!1?a=l=>l:a=n.replaceRequest));const i=s?l=>{const d=s(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};a||(a=(()=>{const l=Xe(this._basePath,t),d=l==="/"?0:l.length;return c=>{const m=new URL(c.url);return m.pathname=m.pathname.slice(d)||"/",new Request(m,c)}})());const o=async(l,d)=>{const c=await r(a(l.req.raw),...i(l));if(c)return c;await d()};return V(this,se,He).call(this,ae,Xe(t,"*"),o),this}},fe=new WeakMap,se=new WeakSet,Yr=function(){const t=new it({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,P(t,ye,k(this,ye)),t.routes=this.routes,t},ye=new WeakMap,He=function(t,r,n){t=t.toUpperCase(),r=Xe(this._basePath,r);const a={basePath:this._basePath,path:r,method:t,handler:n};this.router.add(t,r,[n,a]),this.routes.push(a)},It=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Ct=function(t,r,n,a){if(a==="HEAD")return(async()=>new Response(null,await V(this,se,Ct).call(this,t,r,n,"GET")))();const s=this.getPath(t,{env:n}),i=this.router.match(a,s),o=new ya(t,{path:s,matchResult:i,env:n,executionCtx:r,notFoundHandler:k(this,ye)});if(i[0].length===1){let d;try{d=i[0][0][0][0](o,async()=>{o.res=await k(this,ye).call(this,o)})}catch(c){return V(this,se,It).call(this,c,o)}return d instanceof Promise?d.then(c=>c||(o.finalized?o.res:k(this,ye).call(this,o))).catch(c=>V(this,se,It).call(this,c,o)):d??k(this,ye).call(this,o)}const l=pr(i[0],this.errorHandler,k(this,ye));return(async()=>{try{const d=await l(o);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return V(this,se,It).call(this,d,o)}})()},it),Jr=[];function Ta(e,t){const r=this.buildAllMatchers(),n=((a,s)=>{const i=r[a]||r[ae],o=i[2][s];if(o)return o;const l=s.match(i[0]);if(!l)return[[],Jr];const d=l.indexOf("",1);return[i[1][d],l]});return this.match=n,n(e,t)}var At="[^/]+",yt=".*",vt="(?:|/.*)",et=Symbol(),xa=new Set(".\\+*[^]$()");function Sa(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===yt||e===vt?1:t===yt||t===vt?-1:e===At?1:t===At?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var We,qe,ve,Ye,ka=(Ye=class{constructor(){z(this,We);z(this,qe);z(this,ve,Object.create(null))}insert(t,r,n,a,s){if(t.length===0){if(k(this,We)!==void 0)throw et;if(s)return;P(this,We,r);return}const[i,...o]=t,l=i==="*"?o.length===0?["","",yt]:["","",At]:i==="/*"?["","",vt]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const c=l[1];let m=l[2]||At;if(c&&l[2]&&(m===".*"||(m=m.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(m))))throw et;if(d=k(this,ve)[m],!d){if(Object.keys(k(this,ve)).some(h=>h!==yt&&h!==vt))throw et;if(s)return;d=k(this,ve)[m]=new Ye,c!==""&&P(d,qe,a.varIndex++)}!s&&c!==""&&n.push([c,k(d,qe)])}else if(d=k(this,ve)[i],!d){if(Object.keys(k(this,ve)).some(c=>c.length>1&&c!==yt&&c!==vt))throw et;if(s)return;d=k(this,ve)[i]=new Ye}d.insert(o,r,n,a,s)}buildRegExpStr(){const r=Object.keys(k(this,ve)).sort(Sa).map(n=>{const a=k(this,ve)[n];return(typeof k(a,qe)=="number"?`(${n})@${k(a,qe)}`:xa.has(n)?`\\${n}`:n)+a.buildRegExpStr()});return typeof k(this,We)=="number"&&r.unshift(`#${k(this,We)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},We=new WeakMap,qe=new WeakMap,ve=new WeakMap,Ye),$t,kt,Ar,Da=(Ar=class{constructor(){z(this,$t,{varIndex:0});z(this,kt,new ka)}insert(e,t,r){const n=[],a=[];for(let i=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${i}`;return a[i]=[d,l],i++,o=!0,d}),!o)break}const s=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=a.length-1;i>=0;i--){const[o]=a[i];for(let l=s.length-1;l>=0;l--)if(s[l].indexOf(o)!==-1){s[l]=s[l].replace(o,a[i][1]);break}}return k(this,kt).insert(s,t,n,k(this,$t),r),n}buildRegExp(){let e=k(this,kt).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],n=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,s,i)=>s!==void 0?(r[++t]=Number(s),"$()"):(i!==void 0&&(n[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,n]}},$t=new WeakMap,kt=new WeakMap,Ar),Ra=[/^$/,[],Object.create(null)],Nt=Object.create(null);function Vr(e){return Nt[e]??(Nt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Oa(){Nt=Object.create(null)}function Ia(e){var d;const t=new Da,r=[];if(e.length===0)return Ra;const n=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,m],[h,b])=>c?1:h?-1:m.length-b.length),a=Object.create(null);for(let c=0,m=-1,h=n.length;c<h;c++){const[b,f,_]=n[c];b?a[f]=[_.map(([x])=>[x,Object.create(null)]),Jr]:m++;let v;try{v=t.insert(f,m,b)}catch(x){throw x===et?new Kr(f):x}b||(r[m]=_.map(([x,E])=>{const O=Object.create(null);for(E-=1;E>=0;E--){const[A,B]=v[E];O[A]=B}return[x,O]}))}const[s,i,o]=t.buildRegExp();for(let c=0,m=r.length;c<m;c++)for(let h=0,b=r[c].length;h<b;h++){const f=(d=r[c][h])==null?void 0:d[1];if(!f)continue;const _=Object.keys(f);for(let v=0,x=_.length;v<x;v++)f[_[v]]=o[f[_[v]]]}const l=[];for(const c in i)l[c]=r[i[c]];return[s,l,a]}function Ve(e,t){if(e){for(const r of Object.keys(e).sort((n,a)=>a.length-n.length))if(Vr(r).test(t))return[...e[r]]}}var Ae,Le,Bt,Zr,Lr,Ca=(Lr=class{constructor(){z(this,Bt);L(this,"name","RegExpRouter");z(this,Ae);z(this,Le);L(this,"match",Ta);P(this,Ae,{[ae]:Object.create(null)}),P(this,Le,{[ae]:Object.create(null)})}add(e,t,r){var o;const n=k(this,Ae),a=k(this,Le);if(!n||!a)throw new Error(zr);n[e]||[n,a].forEach(l=>{l[e]=Object.create(null),Object.keys(l[ae]).forEach(d=>{l[e][d]=[...l[ae][d]]})}),t==="/*"&&(t="*");const s=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=Vr(t);e===ae?Object.keys(n).forEach(d=>{var c;(c=n[d])[t]||(c[t]=Ve(n[d],t)||Ve(n[ae],t)||[])}):(o=n[e])[t]||(o[t]=Ve(n[e],t)||Ve(n[ae],t)||[]),Object.keys(n).forEach(d=>{(e===ae||e===d)&&Object.keys(n[d]).forEach(c=>{l.test(c)&&n[d][c].push([r,s])})}),Object.keys(a).forEach(d=>{(e===ae||e===d)&&Object.keys(a[d]).forEach(c=>l.test(c)&&a[d][c].push([r,s]))});return}const i=Pr(t)||[t];for(let l=0,d=i.length;l<d;l++){const c=i[l];Object.keys(a).forEach(m=>{var h;(e===ae||e===m)&&((h=a[m])[c]||(h[c]=[...Ve(n[m],c)||Ve(n[ae],c)||[]]),a[m][c].push([r,s-d+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(k(this,Le)).concat(Object.keys(k(this,Ae))).forEach(t=>{e[t]||(e[t]=V(this,Bt,Zr).call(this,t))}),P(this,Ae,P(this,Le,void 0)),Oa(),e}},Ae=new WeakMap,Le=new WeakMap,Bt=new WeakSet,Zr=function(e){const t=[];let r=e===ae;return[k(this,Ae),k(this,Le)].forEach(n=>{const a=n[e]?Object.keys(n[e]).map(s=>[s,n[e][s]]):[];a.length!==0?(r||(r=!0),t.push(...a)):e!==ae&&t.push(...Object.keys(n[ae]).map(s=>[s,n[ae][s]]))}),r?Ia(t):null},Lr),Me,Se,Mr,Na=(Mr=class{constructor(e){L(this,"name","SmartRouter");z(this,Me,[]);z(this,Se,[]);P(this,Me,e.routers)}add(e,t,r){if(!k(this,Se))throw new Error(zr);k(this,Se).push([e,t,r])}match(e,t){if(!k(this,Se))throw new Error("Fatal error");const r=k(this,Me),n=k(this,Se),a=r.length;let s=0,i;for(;s<a;s++){const o=r[s];try{for(let l=0,d=n.length;l<d;l++)o.add(...n[l]);i=o.match(e,t)}catch(l){if(l instanceof Kr)continue;throw l}this.match=o.match.bind(o),P(this,Me,[o]),P(this,Se,void 0);break}if(s===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(k(this,Se)||k(this,Me).length!==1)throw new Error("No active router has been determined yet.");return k(this,Me)[0]}},Me=new WeakMap,Se=new WeakMap,Mr),ht=Object.create(null),$e,le,ze,ot,ie,ke,Fe,lt,Aa=(lt=class{constructor(t,r,n){z(this,ke);z(this,$e);z(this,le);z(this,ze);z(this,ot,0);z(this,ie,ht);if(P(this,le,n||Object.create(null)),P(this,$e,[]),t&&r){const a=Object.create(null);a[t]={handler:r,possibleKeys:[],score:0},P(this,$e,[a])}P(this,ze,[])}insert(t,r,n){P(this,ot,++mr(this,ot)._);let a=this;const s=oa(r),i=[];for(let o=0,l=s.length;o<l;o++){const d=s[o],c=s[o+1],m=ca(d,c),h=Array.isArray(m)?m[0]:d;if(h in k(a,le)){a=k(a,le)[h],m&&i.push(m[1]);continue}k(a,le)[h]=new lt,m&&(k(a,ze).push(m),i.push(m[1])),a=k(a,le)[h]}return k(a,$e).push({[t]:{handler:n,possibleKeys:i.filter((o,l,d)=>d.indexOf(o)===l),score:k(this,ot)}}),a}search(t,r){var l;const n=[];P(this,ie,ht);let s=[this];const i=Br(r),o=[];for(let d=0,c=i.length;d<c;d++){const m=i[d],h=d===c-1,b=[];for(let f=0,_=s.length;f<_;f++){const v=s[f],x=k(v,le)[m];x&&(P(x,ie,k(v,ie)),h?(k(x,le)["*"]&&n.push(...V(this,ke,Fe).call(this,k(x,le)["*"],t,k(v,ie))),n.push(...V(this,ke,Fe).call(this,x,t,k(v,ie)))):b.push(x));for(let E=0,O=k(v,ze).length;E<O;E++){const A=k(v,ze)[E],B=k(v,ie)===ht?{}:{...k(v,ie)};if(A==="*"){const R=k(v,le)["*"];R&&(n.push(...V(this,ke,Fe).call(this,R,t,k(v,ie))),P(R,ie,B),b.push(R));continue}const[G,F,j]=A;if(!m&&!(j instanceof RegExp))continue;const W=k(v,le)[G],q=i.slice(d).join("/");if(j instanceof RegExp){const R=j.exec(q);if(R){if(B[F]=R[0],n.push(...V(this,ke,Fe).call(this,W,t,k(v,ie),B)),Object.keys(k(W,le)).length){P(W,ie,B);const H=((l=R[0].match(/\//))==null?void 0:l.length)??0;(o[H]||(o[H]=[])).push(W)}continue}}(j===!0||j.test(m))&&(B[F]=m,h?(n.push(...V(this,ke,Fe).call(this,W,t,B,k(v,ie))),k(W,le)["*"]&&n.push(...V(this,ke,Fe).call(this,k(W,le)["*"],t,B,k(v,ie)))):(P(W,ie,B),b.push(W)))}}s=b.concat(o.shift()??[])}return n.length>1&&n.sort((d,c)=>d.score-c.score),[n.map(({handler:d,params:c})=>[d,c])]}},$e=new WeakMap,le=new WeakMap,ze=new WeakMap,ot=new WeakMap,ie=new WeakMap,ke=new WeakSet,Fe=function(t,r,n,a){const s=[];for(let i=0,o=k(t,$e).length;i<o;i++){const l=k(t,$e)[i],d=l[r]||l[ae],c={};if(d!==void 0&&(d.params=Object.create(null),s.push(d),n!==ht||a&&a!==ht))for(let m=0,h=d.possibleKeys.length;m<h;m++){const b=d.possibleKeys[m],f=c[d.score];d.params[b]=a!=null&&a[b]&&!f?a[b]:n[b]??(a==null?void 0:a[b]),c[d.score]=!0}}return s},lt),Ke,$r,La=($r=class{constructor(){L(this,"name","TrieRouter");z(this,Ke);P(this,Ke,new Aa)}add(e,t,r){const n=Pr(t);if(n){for(let a=0,s=n.length;a<s;a++)k(this,Ke).insert(e,n[a],r);return}k(this,Ke).insert(e,t,r)}match(e,t){return k(this,Ke).search(e,t)}},Ke=new WeakMap,$r),he=class extends Ea{constructor(e={}){super(e),this.router=e.router??new Na({routers:[new Ca,new La]})}},Ma=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},n=(s=>typeof s=="string"?s==="*"?()=>s:i=>s===i?i:null:typeof s=="function"?s:i=>s.includes(i)?i:null)(r.origin),a=(s=>typeof s=="function"?s:Array.isArray(s)?()=>s:()=>[])(r.allowMethods);return async function(i,o){var c;function l(m,h){i.res.headers.set(m,h)}const d=await n(i.req.header("origin")||"",i);if(d&&l("Access-Control-Allow-Origin",d),r.credentials&&l("Access-Control-Allow-Credentials","true"),(c=r.exposeHeaders)!=null&&c.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.origin!=="*"&&l("Vary","Origin"),r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const m=await a(i.req.header("origin")||"",i);m.length&&l("Access-Control-Allow-Methods",m.join(","));let h=r.allowHeaders;if(!(h!=null&&h.length)){const b=i.req.header("Access-Control-Request-Headers");b&&(h=b.split(/\s*,\s*/))}return h!=null&&h.length&&(l("Access-Control-Allow-Headers",h.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),r.origin!=="*"&&i.header("Vary","Origin",{append:!0})}};function Xr(){return`<!DOCTYPE html>
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
    memoryReviewFilter: 'all',
    memoryReviewSearch: '',
    memoryTypeFilter: 'all',
    documentLibrarySearch: '',
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
        '<button class="topbar-btn topbar-dash-btn" id="dashBtn" title="Dashboard"><span style="font-size:16px;">&#8962;</span><span style="font-size:10px;letter-spacing:0.04em;font-family:var(--font-ui,Inter,sans-serif);font-weight:500;">Dashboard</span></button>' +
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
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'skills\\';renderView();"><div class="dash-card-icon">&#9889;</div><div class="dash-card-value">' + (data.skills_count || 0) + '</div><div class="dash-card-label">Skills</div></div>';
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'preferences\\';renderView();"><div class="dash-card-icon">&#127775;</div><div class="dash-card-value">' + (data.preferences_count || 0) + '</div><div class="dash-card-label">Preferences</div></div>';
      html += '<div class="dash-card" id="dashGmailCard" onclick="dashGmailClick()"><div class="dash-card-icon">&#9993;</div><div class="dash-card-value" id="dashGmailCount"><span style=\\'color:var(--text-muted);font-size:13px;\\'>...</span></div><div class="dash-card-label">Unread Gmail</div></div>';
      if ((data.memory_suggestions || 0) > 0) {
        html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'memory-review\\';renderView();"><div class="dash-card-icon">&#127775;</div><div class="dash-card-value">' + data.memory_suggestions + '</div><div class="dash-card-label">Memory Suggestions</div></div>';
      }
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'document-library\\';renderView();"><div class="dash-card-icon">&#128196;</div><div class="dash-card-value">' + (data.documents_count || 0) + '</div><div class="dash-card-label">Documents</div></div>';
      if (data.errors > 0) {
        html += '<div class="dash-card dash-card-error" onclick="state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'errors\\';renderView();"><div class="dash-card-icon">&#9888;</div><div class="dash-card-value" style="color:#e05a40;">' + data.errors + '</div><div class="dash-card-label">Errors</div></div>';
      }
      html += '</div>';

      // Quick Actions
      html += '<div class="dash-quick-actions">';
      html += '<button class="dash-quick-btn" onclick="state.prevView=\\'dashboard\\';state.view=\\'memory-review\\';renderView();">Memory Review</button>';
      html += '<button class="dash-quick-btn" onclick="state.prevView=\\'dashboard\\';state.view=\\'document-library\\';renderView();">Documents</button>';
      html += '<button class="dash-quick-btn" onclick="state.prevView=\\'dashboard\\';state.view=\\'settings\\';state.settingsSection=\\'proactive\\';renderView();">Email Digest</button>';
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

      if (data.todays_reminders && data.todays_reminders.length > 0) {
        html += '<div class="dash-section-title">Today’s reminders</div>';
        html += '<div class="dash-threads">';
        for (var r = 0; r < data.todays_reminders.length; r++) {
          var rem = data.todays_reminders[r];
          var remTime = rem.next_run ? new Date(rem.next_run).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
          html += '<div class="dash-thread" style="padding:12px 16px;">';
          html += '<div class="dash-thread-title">' + escapeHtml(rem.name) + ' <span style="font-size:11px;color:var(--text-muted);">' + remTime + '</span></div>';
          if (rem.description) html += '<div class="dash-thread-preview">' + escapeHtml(rem.description) + '</div>';
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

  // === Memory Review ===
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

  // === Document Library ===
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
      html += '<div style="font-size:14px;color:var(--text-muted);">' + new Date(b.created_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + '</div>';
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
</html>`}const nr="AES-GCM",$a=256;async function Qr(e){const t=new TextEncoder,r=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},r,{name:nr,length:$a},!1,["encrypt","decrypt"])}async function dt(e,t){const r=await Qr(t),n=crypto.getRandomValues(new Uint8Array(12)),a=new TextEncoder,s=await crypto.subtle.encrypt({name:nr,iv:n},r,a.encode(e)),i=new Uint8Array(n.length+new Uint8Array(s).length);return i.set(n),i.set(new Uint8Array(s),n.length),btoa(String.fromCharCode(...i))}async function J(e,t){const r=await Qr(t),n=new Uint8Array(atob(e).split("").map(o=>o.charCodeAt(0))),a=n.slice(0,12),s=n.slice(12),i=await crypto.subtle.decrypt({name:nr,iv:a},r,s);return new TextDecoder().decode(i)}async function jt(e){const r=new TextEncoder().encode(e+"karna-pin-salt"),n=await crypto.subtle.digest("SHA-256",r);return btoa(String.fromCharCode(...new Uint8Array(n)))}async function en(e,t){return await jt(e)===t}const Pt=Object.freeze(Object.defineProperty({__proto__:null,decrypt:J,encrypt:dt,hashPin:jt,verifyPin:en},Symbol.toStringTag,{value:"Module"})),Be=new he;Be.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});Be.post("/setup",async e=>{const{username:t,name:r,pin:n,personality_prompt:a,timezone:s}=await e.req.json();if(!t||!r||!n)return e.json({error:"Username, name, and PIN are required"},400);if(n.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const o=await jt(n);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,r,o,a||"",s||"Asia/Kolkata").run();const l=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),d=crypto.randomUUID(),c=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(d,l.id,"web",c).run(),e.json({success:!0,sessionId:d,user:{id:l.id,username:l.username,name:l.name}})});Be.post("/login",async e=>{const{username:t,pin:r}=await e.req.json();if(!t||!r)return e.json({error:"Username and PIN required"},400);const n=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!n)return e.json({error:"User not found"},404);if(!await en(r,n.pin_hash))return e.json({error:"Invalid PIN"},401);const s=crypto.randomUUID(),i=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(s,n.id,"web",i).run(),e.json({success:!0,sessionId:s,user:{id:n.id,username:n.username,name:n.name}})});Be.post("/logout",async e=>{var r;const t=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});Be.get("/users/hints",async e=>{const r=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(n=>{var a;return{username:n.username,name_hint:n.name.split(" ")[0],created:((a=n.created_at)==null?void 0:a.split(" ")[0])||""}});return e.json({users:r,count:r.length})});Be.post("/reset-pin",async e=>{var o;const{username:t,name:r,new_pin:n}=await e.req.json();if(!t||!r||!n)return e.json({error:"Username, display name, and new PIN are required"},400);if(n.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const a=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!a)return e.json({error:"User not found"},404);if(a.name.toLowerCase().trim()!==r.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const s=await jt(n);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,a.id).run();const i=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(a.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(a.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((o=i.meta)==null?void 0:o.changes)||0})});Be.get("/me",async e=>{var n;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return r?e.json({user:{id:r.uid,username:r.username,name:r.name,role:r.role,timezone:r.timezone}}):e.json({error:"Invalid or expired session"},401)});const wt={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},Ba=55e3;function tn(e,t){return Promise.race([e,new Promise((r,n)=>setTimeout(()=>n(new Error(`LLM timeout: ${t} did not respond within 25 seconds. Try again or switch providers in Settings → Keys.`)),Ba))])}async function U(e,t,r,n,a,s={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,r,n,a,JSON.stringify(s)).run()}catch(i){console.error("Failed to log error:",i)}}async function qt(e,t,r,n,a,s){try{const i=`provider_alert:${n}:${r}`;if(await e.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(t,i).first())return;await U(e,t,"provider_alert",i,`${n} failed: ${s.substring(0,200)}`,{alertType:r,failedProvider:n,fallbackProvider:a});let l;r==="all_providers_down"?l=`🚨 All LLM providers failed

Last error from ${n}: ${fr(s)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:l=`⚠️ LLM Provider Issue

${n}: ${fr(s)}
Switched to: ${a}

Check your ${n} API credit balance or key.`;const{decrypt:d}=await Promise.resolve().then(()=>Pt),c=await e.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(t).first();if(!(c!=null&&c.telegram_chat_id))return;const m=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(t).first();if(!m)return;const h=await d(m.encrypted_value,c.pin_hash);await fetch(`https://api.telegram.org/bot${h}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:c.telegram_chat_id,text:l})})}catch(i){console.error("Failed to send provider alert:",i)}}function fr(e){return e.includes("credit balance")||e.includes("insufficient")||e.includes("402")?"Credits exhausted or balance too low":e.includes("429")||e.includes("rate_limit")||e.includes("quota")?"Rate limit / quota exceeded":e.includes("401")||e.includes("authentication")||e.includes("invalid")&&e.includes("key")?"API key invalid or expired":e.includes("403")?"Access denied (key may lack permissions)":e.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":e.includes("properties field not found")?"Schema compatibility issue":"API error"}class rn{constructor(t,r="claude-sonnet-4-20250514",n="https://api.anthropic.com",a="anthropic"){L(this,"name");L(this,"apiKey");L(this,"model");L(this,"apiBase");this.apiKey=t,this.model=r,this.apiBase=n,this.name=a}async chat(t,r){var c,m,h,b;const n=t.find(f=>f.role==="system"),a=t.filter(f=>f.role!=="system"),s={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,messages:a.map(f=>({role:f.role,content:f.content}))};n&&(s.system=n.content),r!=null&&r.tools&&r.tools.length>0&&(s.tools=r.tools.map(f=>({name:f.name,description:f.description,input_schema:f.parameters})),r.toolChoice==="required"&&(s.tool_choice={type:"any"}));const i=await tn(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)}),this.name);if(!i.ok){const f=await i.text();throw new Error(this.name+" API error "+i.status+": "+f)}const o=await i.json(),l=((c=o.content)==null?void 0:c.filter(f=>f.type==="text"))||[],d=((m=o.content)==null?void 0:m.filter(f=>f.type==="tool_use"))||[];return{content:l.map(f=>f.text).join(`
`),toolCalls:d.map(f=>({id:f.id,name:f.name,arguments:f.input})),usage:{promptTokens:((h=o.usage)==null?void 0:h.input_tokens)||0,completionTokens:((b=o.usage)==null?void 0:b.output_tokens)||0}}}async streamChat(t,r){const n=t.find(d=>d.role==="system"),a=t.filter(d=>d.role!=="system"),s={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,stream:!0,messages:a.map(d=>({role:d.role,content:d.content}))};n&&(s.system=n.content);const i=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)});if(!i.ok){const d=await i.text();throw new Error(this.name+" stream error "+i.status+": "+d)}const o=i.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(d){var f;const{done:c,value:m}=await o.read();if(c){d.close();return}const b=l.decode(m,{stream:!0}).split(`
`);for(const _ of b)if(_.startsWith("data: ")){const v=_.slice(6);if(v==="[DONE]")continue;try{const x=JSON.parse(v);x.type==="content_block_delta"&&((f=x.delta)!=null&&f.text)&&d.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:x.delta.text})+`

`))}catch{}}}})}}function ja(e){const t={},r=e||{};if(t.type=r.type||"object",t.type==="object"){const n=r.properties;if(n&&typeof n=="object"&&Object.keys(n).length>0){const a={};for(const[s,i]of Object.entries(n))i&&typeof i=="object"?a[s]=Zt(i):a[s]=i;t.properties=a}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(r.required)?t.required=r.required:t.required=[]}return r.description&&(t.description=r.description),t}function Zt(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const r=t.properties;if(r&&typeof r=="object"&&Object.keys(r).length>0){const n={};for(const[a,s]of Object.entries(r))s&&typeof s=="object"?n[a]=Zt(s):n[a]=s;t.properties=n}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=Zt(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class nn{constructor(t,r,n,a){L(this,"name");L(this,"apiKey");L(this,"model");L(this,"apiBase");this.apiKey=t,this.model=r,this.apiBase=n.replace(/\/+$/,""),this.name=a}async chat(t,r){var l,d,c,m,h,b;const n={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,messages:t.map(f=>({role:f.role,content:f.content}))},a=this.apiBase.includes("routellm.abacus.ai");if(r!=null&&r.tools&&r.tools.length>0&&a)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");r!=null&&r.tools&&r.tools.length>0&&(n.tools=r.tools.map(f=>({type:"function",function:{name:f.name,description:f.description,parameters:ja(f.parameters||{})}})),r.toolChoice==="required"&&(n.tool_choice="required"));const s=await tn(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(n)}),this.name);if(!s.ok){const f=await s.text();throw new Error(this.name+" API error "+s.status+": "+f)}const i=await s.json(),o=(l=i.choices)==null?void 0:l[0];return{content:((d=o==null?void 0:o.message)==null?void 0:d.content)||"",toolCalls:(m=(c=o==null?void 0:o.message)==null?void 0:c.tool_calls)==null?void 0:m.map(f=>({id:f.id,name:f.function.name,arguments:(()=>{try{return typeof f.function.arguments=="string"?JSON.parse(f.function.arguments||"{}"):f.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((h=i.usage)==null?void 0:h.prompt_tokens)||0,completionTokens:((b=i.usage)==null?void 0:b.completion_tokens)||0}}}async streamChat(t,r){const n={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,stream:!0,messages:t.map(o=>({role:o.role,content:o.content}))},a=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(n)});if(!a.ok){const o=await a.text();throw new Error(this.name+" stream error "+a.status+": "+o)}const s=a.body.getReader(),i=new TextDecoder;return new ReadableStream({async pull(o){var h,b,f;const{done:l,value:d}=await s.read();if(l){o.close();return}const m=i.decode(d,{stream:!0}).split(`
`);for(const _ of m)if(_.startsWith("data: ")){const v=_.slice(6);if(v==="[DONE]")continue;try{const E=(f=(b=(h=JSON.parse(v).choices)==null?void 0:h[0])==null?void 0:b.delta)==null?void 0:f.content;E&&o.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:E})+`

`))}catch{}}}})}}function Xt(e,t,r,n){const a=wt[e];if(!a)throw new Error(`Unknown LLM provider: ${e}`);const s=n||a.defaultModel;return a.apiFormat==="anthropic"?new rn(t,s,a.apiBase,r):new nn(t,s,a.apiBase,r)}class an{constructor(){L(this,"errorLog",new Map);L(this,"usageLog",new Map)}async pickProvider(t){const r=Date.now(),n=t.filter(a=>{const s=this.errorLog.get(a);return s?s.cooldownUntil<=r:!0});return n.length>0?n[0]:null}async recordUsage(t,r){const n=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:n.tokens+r,requests:n.requests+1})}async recordError(t,r,n=5){this.errorLog.set(t,{error:r,cooldownUntil:Date.now()+n*60*1e3})}}const Pa=["llm_slot_1","llm_slot_2","llm_slot_3"],Ua=["anthropic","openai"];async function ct(e,t,r){const{decrypt:n}=await Promise.resolve().then(()=>Pt),a=new an,s=[];for(const m of Pa){const h=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,m).first();if(h)try{const b=await n(h.encrypted_value,r),f=JSON.parse(b);if(f.provider&&f.apiKey&&wt[f.provider]){const v=f.provider,x=Xt(f.provider,f.apiKey,v,f.model);s.push({name:v,provider:x})}}catch(b){console.error(`Failed to load ${m}:`,b)}}const i=new Set(s.map(m=>m.name));for(const m of Ua){if(i.has(m))continue;const h=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,m).first();if(h)try{const b=await n(h.encrypted_value,r);if(wt[m]){const _=Xt(m,b,m);s.push({name:m,provider:_})}}catch{console.error(`Failed to decrypt legacy ${m} key`)}}if(s.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const o=s.map(m=>m.name),l=await a.pickProvider(o);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:s[0].provider,rotation:a};const d=s.find(m=>m.name===l);return{provider:Ha(d.provider,s,a,e,t),rotation:a}}function Ha(e,t,r,n,a){const s=o=>o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")||o.includes("TOOLS_UNSUPPORTED"),i=o=>o.includes("429")||o.toLowerCase().includes("rate limit")||o.toLowerCase().includes("too many requests");return t.length<=1?{name:e.name,async chat(o,l){try{return await e.chat(o,l)}catch(d){const c=d.message||"";throw s(c)&&!c.includes("TOOLS_UNSUPPORTED")&&qt(n,a,"all_providers_down",e.name,null,c),d}},async streamChat(o,l){return await e.streamChat(o,l)}}:{name:e.name,async chat(o,l){try{return await e.chat(o,l)}catch(d){const c=d.message||"",m=i(c);if(!s(c)&&!m)throw d;const h=c.includes("TOOLS_UNSUPPORTED"),b=h?1:m?10:1440;console.warn(`Provider ${e.name} ${m?"rate limited":h?"tools unsupported":"auth/billing error"}, trying fallback...`),await r.recordError(e.name,c,b);const f=t.filter(_=>_.name!==e.name);for(const _ of f)try{const v=await _.provider.chat(o,l);return this.name=_.name,!h&&!m&&qt(n,a,"provider_switched",e.name,_.name,c),v}catch(v){const x=v.message||"";if(s(x)||i(x)){await r.recordError(_.name,x,i(x)?10:1440);continue}throw v}throw qt(n,a,"all_providers_down",e.name,null,c),new Error(`All LLM providers failed. Primary (${e.name}): ${c.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(o,l){return await e.streamChat(o,l)}}}const tt=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:rn,OpenAICompatibleProvider:nn,ProviderRotation:an,createProviderFromConfig:Xt,createRotatingProvider:ct,logError:U},Symbol.toStringTag,{value:"Module"})),zt=20,Fa=2e3,Ga=2e3,sn=4;function Wa(e){return Math.ceil(e.length/sn)}function yr(e,t){const r=t*sn;return e.length<=r?e:e.slice(0,r)+`
[...truncated to fit token budget]`}class Y{constructor(t){this.db=t}async store(t,r,n,a,s=5,i="working"){const o=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,r,n).first();o?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(a,s,i,o.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,r,n,a,s,i).run(),i==="working"&&await this.enforceWorkingMemoryCap(t)}async cleanupDoneTasks(t){await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND type = 'task' AND status = 'done' AND tier = 'working'
       AND updated_at < datetime('now', '-7 days')`).bind(t).run()}async enforceWorkingMemoryCap(t){const r=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((r==null?void 0:r.cnt)||0)>zt){const n=((r==null?void 0:r.cnt)||0)-zt;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND tier = 'working' AND importance < 8 AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' AND importance < 8
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,n).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,zt).all()).results||[]}async getAll(t,r,n=50){return r?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,r,n).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,n).all()).results||[]}async search(t,r,n=10){const s=(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${r}%`,`%${r}%`,n).all()).results||[];if(s.length>0)return await this.touchMemories(t,s.map(c=>c.id)),s;const i=r.split(/\s+/).filter(c=>c.length>2);if(i.length===0)return[];const o=new Map,l=new Map;for(const c of i){const m=await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) LIMIT ?").bind(t,`%${c}%`,`%${c}%`,n*2).all();for(const h of m.results||[])o.set(h.id,(o.get(h.id)||0)+1),l.set(h.id,h)}const d=[...l.values()].sort((c,m)=>(o.get(m.id)||0)-(o.get(c.id)||0)).slice(0,n);return d.length>0&&await this.touchMemories(t,d.map(c=>c.id)),d}async searchLongTerm(t,r,n=5){const s=(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${r}%`,`%${r}%`,n).all()).results||[];if(s.length>0)return await this.touchMemories(t,s.map(c=>c.id)),s;const i=r.split(/\s+/).filter(c=>c.length>2);if(i.length===0)return[];const o=new Map,l=new Map;for(const c of i){const m=await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) LIMIT ?").bind(t,`%${c}%`,`%${c}%`,n*2).all();for(const h of m.results||[])o.set(h.id,(o.get(h.id)||0)+1),l.set(h.id,h)}const d=[...l.values()].sort((c,m)=>(o.get(m.id)||0)-(o.get(c.id)||0)).slice(0,n);return d.length>0&&await this.touchMemories(t,d.map(c=>c.id)),d}async touchMemories(t,r){for(const n of r)await this.db.prepare("UPDATE memory SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(n,t).run()}async update(t,r,n){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(n,t,r).run()}async promote(t,r){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,r).run(),await this.enforceWorkingMemoryCap(r)}async demote(t,r){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,r).run()}async remove(t,r){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,r).run()}async buildContext(t){const r=await this.getWorkingMemory(t);if(r.length===0)return"";const n={};for(const s of r)n[s.type]||(n[s.type]=[]),n[s.type].push(s);let a=`
## Working Memory (Active Context)
`;for(const[s,i]of Object.entries(n)){a+=`
### ${s.charAt(0).toUpperCase()+s.slice(1)}s
`;for(const o of i)a+=`- **${o.title}**: ${o.content}
`}return yr(a,Fa)}static truncatePersonality(t){return yr(t,Ga)}async getRecentConversations(t,r=20,n){return n?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,n,r).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,r).all()).results||[]).reverse()}async storeMessage(t,r,n,a,s="{}",i){const o=Wa(a);i?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,r,n,a,s,o,i).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,r,n,a,s,o).run()}async compactHistory(t,r=30){const n=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((n==null?void 0:n.cnt)||0)<=r*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,r).run()}}const qa=Object.freeze(Object.defineProperty({__proto__:null,MemoryService:Y},Symbol.toStringTag,{value:"Module"})),za="https://accounts.google.com/o/oauth2/v2/auth",on="https://oauth2.googleapis.com/token",Ka="https://www.googleapis.com/oauth2/v2/userinfo",Ya=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let be=null;async function Qt(e,t,r){const n=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!n)return null;try{const a=await J(n.encrypted_value,r);return JSON.parse(a)}catch{return null}}async function Ja(e,t,r,n){const a=await dt(JSON.stringify(n),r);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,a).run()}function ln(e,t,r){const n=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:Ya,access_type:"offline",prompt:"consent",state:r,include_granted_scopes:"true"});return`${za}?${n}`}async function dn(e,t,r,n){const a=await fetch(on,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:r,redirect_uri:n,grant_type:"authorization_code"})}),s=await a.text();if(!a.ok)throw new Error(`Token exchange failed (${a.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function Va(e,t,r){const n=await fetch(on,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:r,grant_type:"refresh_token"})}),a=await n.text();if(!n.ok)throw n.status===400||n.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${n.status}): ${a.substring(0,300)}`);return JSON.parse(a)}async function cn(e){const t=await fetch(Ka,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function ut(e,t,r,n,a){if(!n||!a)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(be&&be.userId===t&&be.expiresAt>Date.now()/1e3+60){const o=await Qt(e,t,r);return{token:be.token,email:(o==null?void 0:o.email)||"unknown"}}const s=await Qt(e,t,r);if(!s)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const i=await Va(s.refresh_token,n,a);return be={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{token:i.access_token,email:s.email}}async function ar(e,t,r){try{const n=await Qt(e,t,r);return n?{connected:!0,email:n.email,connectedAt:n.connected_at}:{connected:!1}}catch{return{connected:!1}}}function un(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function mn(e,t,r,n,a,s,i){const o=await dn(n,s,i,a);if(!o.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await cn(o.access_token),d={refresh_token:o.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await Ja(e,t,r,d),be={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{email:l.email,name:l.name}}async function pn(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(be==null?void 0:be.userId)===t&&(be=null)}const Pe="https://sheets.googleapis.com/v4/spreadsheets";class hn{constructor(t,r,n,a,s){this.db=t,this.userId=r,this.pinHash=n,this.clientId=a,this.clientSecret=s}async authHeaders(){const{token:t}=await ut(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,r){const n=await this.authHeaders(),a=encodeURIComponent(r),s=await fetch(`${Pe}/${t}/values/${a}`,{headers:n});if(!s.ok){const o=await s.text();throw new Error(`Sheets read failed (${s.status}): ${o}`)}return(await s.json()).values||[]}async writeRange(t,r,n){const a=await this.authHeaders(),s=encodeURIComponent(r),i=await fetch(`${Pe}/${t}/values/${s}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:a,body:JSON.stringify({range:r,majorDimension:"ROWS",values:n})});if(!i.ok){const l=await i.text();throw new Error(`Sheets write failed (${i.status}): ${l}`)}return{updatedCells:(await i.json()).updatedCells||0}}async appendRows(t,r,n){var l;const a=await this.authHeaders(),s=encodeURIComponent(r),i=await fetch(`${Pe}/${t}/values/${s}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:a,body:JSON.stringify({range:r,majorDimension:"ROWS",values:n})});if(!i.ok){const d=await i.text();throw new Error(`Sheets append failed (${i.status}): ${d}`)}return{updatedCells:((l=(await i.json()).updates)==null?void 0:l.updatedCells)||n.length}}async deleteRow(t,r,n){const a=await this.authHeaders(),s=await fetch(`${Pe}/${t}?fields=sheets.properties`,{headers:a});if(!s.ok){const m=await s.text();throw new Error(`Failed to get sheet metadata (${s.status}): ${m}`)}const i=await s.json(),o=i.sheets.find(m=>m.properties.title===r);if(!o){const m=i.sheets.map(h=>h.properties.title).join(", ");throw new Error(`Tab "${r}" not found. Available tabs: ${m}`)}const l=o.properties.sheetId,d=n-1,c=await fetch(`${Pe}/${t}:batchUpdate`,{method:"POST",headers:a,body:JSON.stringify({requests:[{deleteDimension:{range:{sheetId:l,dimension:"ROWS",startIndex:d,endIndex:d+1}}}]})});if(!c.ok){const m=await c.text();throw new Error(`Row delete failed (${c.status}): ${m}`)}}async createSpreadsheet(t,r){const n=await this.authHeaders(),a={properties:{title:t},sheets:r&&r.length>0?r.map(o=>({properties:{title:o}})):[{properties:{title:"Sheet1"}}]},s=await fetch(Pe,{method:"POST",headers:n,body:JSON.stringify(a)});if(!s.ok){const o=await s.text();throw new Error(`Sheets create failed (${s.status}): ${o}`)}const i=await s.json();return{spreadsheetId:i.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${i.spreadsheetId}/edit`}}async getMetadata(t){const r=await this.authHeaders(),n=await fetch(`${Pe}/${t}?fields=properties.title,sheets.properties.title`,{headers:r});if(!n.ok){const s=await n.text();throw new Error(`Sheets metadata failed (${n.status}): ${s}`)}const a=await n.json();return{title:a.properties.title,sheets:a.sheets.map(s=>s.properties.title)}}}const gt="https://www.googleapis.com/calendar/v3";class sr{constructor(t,r,n,a,s){this.db=t,this.userId=r,this.pinHash=n,this.clientId=a,this.clientSecret=s}async authHeaders(){const{token:t}=await ut(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",r={}){const n=await this.authHeaders(),a=new URLSearchParams;r.timeMin&&a.set("timeMin",r.timeMin),r.timeMax&&a.set("timeMax",r.timeMax),a.set("maxResults",String(r.maxResults||20)),a.set("singleEvents","true"),a.set("orderBy","startTime"),r.query&&a.set("q",r.query);const s=await fetch(`${gt}/calendars/${encodeURIComponent(t)}/events?${a}`,{headers:n});if(!s.ok){const o=await s.text();throw new Error(`Calendar list failed (${s.status}): ${o}`)}return(await s.json()).items||[]}async createEvent(t="primary",r){var o;const n=await this.authHeaders(),a=r.timeZone||"Asia/Kolkata",s={summary:r.summary,description:r.description||"",location:r.location||"",start:{dateTime:r.startDateTime,timeZone:a},end:{dateTime:r.endDateTime,timeZone:a}};(o=r.attendees)!=null&&o.length&&(s.attendees=r.attendees.map(l=>({email:l})));const i=await fetch(`${gt}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:n,body:JSON.stringify(s)});if(!i.ok){const l=await i.text();throw new Error(`Calendar create failed (${i.status}): ${l}`)}return await i.json()}async updateEvent(t="primary",r,n){const a=await this.authHeaders(),s=n.timeZone||"Asia/Kolkata",i={};n.summary&&(i.summary=n.summary),n.description&&(i.description=n.description),n.location&&(i.location=n.location),n.startDateTime&&(i.start={dateTime:n.startDateTime,timeZone:s}),n.endDateTime&&(i.end={dateTime:n.endDateTime,timeZone:s});const o=await fetch(`${gt}/calendars/${encodeURIComponent(t)}/events/${r}`,{method:"PATCH",headers:a,body:JSON.stringify(i)});if(!o.ok){const l=await o.text();throw new Error(`Calendar update failed (${o.status}): ${l}`)}return await o.json()}async deleteEvent(t="primary",r){const n=await this.authHeaders(),a=await fetch(`${gt}/calendars/${encodeURIComponent(t)}/events/${r}`,{method:"DELETE",headers:n});if(!a.ok&&a.status!==410){const s=await a.text();throw new Error(`Calendar delete failed (${a.status}): ${s}`)}}async listCalendars(){const t=await this.authHeaders(),r=await fetch(`${gt}/users/me/calendarList`,{headers:t});if(!r.ok){const a=await r.text();throw new Error(`Calendar list calendars failed (${r.status}): ${a}`)}return((await r.json()).items||[]).map(a=>({id:a.id,summary:a.summary,primary:a.primary||!1}))}}const _e="https://docs.googleapis.com/v1/documents",Za="https://www.googleapis.com/drive/v3/files";function vr(e){const t=[];for(const r of e.split(`
`)){const n=r.trim();if(n===""||/^---+$/.test(n))continue;let a="NORMAL_TEXT",s=r;const i=n.match(/^###\s+(.+)/),o=!i&&n.match(/^##\s+(.+)/),l=!i&&!o&&n.match(/^#\s+(.+)/);i?(a="HEADING_3",s=i[1]):o?(a="HEADING_2",s=o[1]):l?(a="HEADING_1",s=l[1]):/^\s*[-*]\s/.test(r)&&(s="• "+r.replace(/^\s*[-*]\s+/,""));const{text:d,spans:c}=Xa(s);t.push({text:d,namedStyle:a,spans:c})}return t}function Xa(e){const t=[];let r="",n=0;for(;n<e.length;)if(e[n]==="*"&&e[n+1]==="*"){const a=e.indexOf("**",n+2);if(a!==-1){const s=r.length;r+=e.substring(n+2,a),t.push({start:s,end:r.length,bold:!0}),n=a+2}else r+=e[n++]}else if(e[n]==="_"&&e[n+1]==="_"){const a=e.indexOf("__",n+2);if(a!==-1){const s=r.length;r+=e.substring(n+2,a),t.push({start:s,end:r.length,bold:!0}),n=a+2}else r+=e[n++]}else if(e[n]==="*"&&e[n+1]!=="*"){const a=e.indexOf("*",n+1);if(a!==-1){const s=r.length;r+=e.substring(n+1,a),t.push({start:s,end:r.length,italic:!0}),n=a+1}else r+=e[n++]}else if(e[n]==="_"){const a=e.indexOf("_",n+1);if(a!==-1){const s=r.length;r+=e.substring(n+1,a),t.push({start:s,end:r.length,italic:!0}),n=a+1}else r+=e[n++]}else r+=e[n++];return{text:r,spans:t}}class gn{constructor(t,r,n,a,s){this.db=t,this.userId=r,this.pinHash=n,this.clientId=a,this.clientSecret=s}async authHeaders(){const{token:t}=await ut(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const r=await this.authHeaders(),n=await fetch(_e,{method:"POST",headers:r,body:JSON.stringify({title:t})});if(!n.ok){const s=await n.text();throw new Error(`Docs create failed (${n.status}): ${s}`)}const a=await n.json();return{documentId:a.documentId,url:`https://docs.google.com/document/d/${a.documentId}/edit`}}async readDocument(t){var i,o;const r=await this.authHeaders(),n=await fetch(`${_e}/${t}`,{headers:r});if(!n.ok){const l=await n.text();throw new Error(`Docs read failed (${n.status}): ${l}`)}const a=await n.json();let s="";for(const l of((i=a.body)==null?void 0:i.content)||[])if(l.paragraph)for(const d of l.paragraph.elements)(o=d.textRun)!=null&&o.content&&(s+=d.textRun.content);return{title:a.title,content:s.trim()}}async rewriteDocument(t,r){var f;const n=await this.authHeaders(),a=await fetch(`${_e}/${t}`,{headers:n});if(!a.ok){const _=await a.text();throw new Error(`Docs fetch failed (${a.status}): ${_.substring(0,200)}`)}const i=((f=(await a.json()).body)==null?void 0:f.content)||[],o=i[i.length-1],l=(o==null?void 0:o.endIndex)??2,d=vr(r),c=[];if(l>2&&c.push({deleteContentRange:{range:{startIndex:1,endIndex:l-1}}}),d.length===0){c.length>0&&await fetch(`${_e}/${t}:batchUpdate`,{method:"POST",headers:n,body:JSON.stringify({requests:c})});return}let m="";const h=[];for(const _ of d){const v=m.length;m+=_.text+`
`,h.push({start:v,end:m.length,namedStyle:_.namedStyle,spans:_.spans})}c.push({insertText:{location:{index:1},text:m}});for(const _ of h){_.namedStyle!=="NORMAL_TEXT"&&c.push({updateParagraphStyle:{range:{startIndex:1+_.start,endIndex:1+_.end},paragraphStyle:{namedStyleType:_.namedStyle},fields:"namedStyleType"}});for(const v of _.spans){const x={},E=[];v.bold&&(x.bold=!0,E.push("bold")),v.italic&&(x.italic=!0,E.push("italic")),E.length>0&&c.push({updateTextStyle:{range:{startIndex:1+_.start+v.start,endIndex:1+_.start+v.end},textStyle:x,fields:E.join(",")}})}}const b=await fetch(`${_e}/${t}:batchUpdate`,{method:"POST",headers:n,body:JSON.stringify({requests:c})});if(!b.ok){const _=await b.text();throw new Error(`Docs rewrite failed (${b.status}): ${_.substring(0,200)}`)}}async appendFormattedContent(t,r){var f;const n=await this.authHeaders(),a=vr(r);if(a.length===0)return;const s=await fetch(`${_e}/${t}`,{headers:n});if(!s.ok){const _=await s.text();throw new Error(`Docs fetch failed (${s.status}): ${_.substring(0,200)}`)}const o=((f=(await s.json()).body)==null?void 0:f.content)||[],l=o[o.length-1],d=Math.max(1,((l==null?void 0:l.endIndex)??2)-1);let c="";const m=[];for(const _ of a){const v=c.length;c+=_.text+`
`,m.push({start:v,end:c.length,namedStyle:_.namedStyle,spans:_.spans})}const h=[{insertText:{location:{index:d},text:c}}];for(const _ of m){_.namedStyle!=="NORMAL_TEXT"&&h.push({updateParagraphStyle:{range:{startIndex:d+_.start,endIndex:d+_.end},paragraphStyle:{namedStyleType:_.namedStyle},fields:"namedStyleType"}});for(const v of _.spans){const x={},E=[];v.bold&&(x.bold=!0,E.push("bold")),v.italic&&(x.italic=!0,E.push("italic")),E.length>0&&h.push({updateTextStyle:{range:{startIndex:d+_.start+v.start,endIndex:d+_.start+v.end},textStyle:x,fields:E.join(",")}})}}const b=await fetch(`${_e}/${t}:batchUpdate`,{method:"POST",headers:n,body:JSON.stringify({requests:h})});if(!b.ok){const _=await b.text();throw new Error(`Docs append failed (${b.status}): ${_.substring(0,200)}`)}}async appendText(t,r){const n=await this.authHeaders(),a=await fetch(`${_e}/${t}:batchUpdate`,{method:"POST",headers:n,body:JSON.stringify({requests:[{insertText:{endOfSegmentLocation:{},text:r}}]})});if(!a.ok){const s=await a.text();throw new Error(`Docs append failed (${a.status}): ${s}`)}}async deleteContent(t,r){var i,o,l;const n=await this.authHeaders(),a=await fetch(`${_e}/${t}:batchUpdate`,{method:"POST",headers:n,body:JSON.stringify({requests:[{replaceAllText:{containsText:{text:r,matchCase:!0},replaceText:""}}]})});if(!a.ok){const d=await a.text();throw new Error(`Docs delete content failed (${a.status}): ${d.substring(0,200)}`)}return{occurrencesRemoved:((l=(o=(i=(await a.json()).replies)==null?void 0:i[0])==null?void 0:o.replaceAllText)==null?void 0:l.occurrencesChanged)??0}}async shareDocument(t,r,n="writer"){const a=await this.authHeaders(),s=await fetch(`${Za}/${t}/permissions`,{method:"POST",headers:a,body:JSON.stringify({type:"user",role:n,emailAddress:r})});if(!s.ok){const i=await s.text();throw new Error(`Share failed (${s.status}): ${i}`)}}}class ce{constructor(t,r,n,a,s){L(this,"sheets");L(this,"calendar");L(this,"docs");L(this,"db");L(this,"userId");L(this,"pinHash");this.db=t,this.userId=r,this.pinHash=n,this.sheets=new hn(t,r,n,a,s),this.calendar=new sr(t,r,n,a,s),this.docs=new gn(t,r,n,a,s)}async isConnected(){return ar(this.db,this.userId,this.pinHash)}}const Ue=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:sr,GoogleDocs:gn,GoogleServices:ce,GoogleSheets:hn,completeOAuthFlow:mn,disconnectGoogle:pn,exchangeCodeForTokens:dn,fetchUserInfo:cn,generateAuthUrl:ln,getGoogleAuth:ut,isGoogleConnected:ar,isOAuthClientConfigured:un},Symbol.toStringTag,{value:"Module"}));async function fn(e,t,r={}){const n={textQuery:t,languageCode:"en",pageSize:8};if(r.type&&(n.includedType=r.type),r.location){const l=r.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(n.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:r.radius||5e3}})}const a=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),s=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":a},body:JSON.stringify(n)});if(!s.ok){const l=await s.text();return{results:[],error:`Places API error (${s.status}): ${l.substring(0,200)}`}}const i=await s.json();return!i.places||i.places.length===0?{results:[]}:{results:i.places.map(l=>{var d,c,m;return{name:((d=l.displayName)==null?void 0:d.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(c=l.currentOpeningHours)==null?void 0:c.openNow,types:(m=l.types)==null?void 0:m.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function yn(e,t){var s,i,o;const r=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),n=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":r}});if(!n.ok){const l=await n.text();return{error:`Place Details API error (${n.status}): ${l.substring(0,200)}`}}const a=await n.json();return{details:{name:((s=a.displayName)==null?void 0:s.text)||"",address:a.formattedAddress||"",phone:a.internationalPhoneNumber,website:a.websiteUri,rating:a.rating,reviews:(i=a.reviews)==null?void 0:i.slice(0,3).map(l=>{var d,c,m;return{author:((d=l.authorAttribution)==null?void 0:d.displayName)||"Anonymous",rating:l.rating||0,text:((m=(c=l.text)==null?void 0:c.text)==null?void 0:m.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(o=a.currentOpeningHours)==null?void 0:o.weekdayDescriptions,location:a.location?{lat:a.location.latitude,lng:a.location.longitude}:void 0,googleMapsUri:a.googleMapsUri}}}async function vn(e,t,r,n={}){var d;const a=new URLSearchParams({origin:t,destination:r,key:e,mode:n.mode||"driving"});(n.mode==="driving"||!n.mode)&&a.set("departure_time","now");const s=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${a}`);if(!s.ok)return{error:`Directions API error: ${s.status}`};const i=await s.json();if(i.status!=="OK")return{error:`Directions: ${i.status} — ${i.error_message||""}`};const o=i.routes[0],l=o.legs[0];return{route:{summary:o.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(d=l.duration_in_traffic)==null?void 0:d.text,steps:l.steps.slice(0,10).map(c=>{var m,h,b;return{instruction:((m=c.html_instructions)==null?void 0:m.replace(/<[^>]*>/g,""))||"",distance:((h=c.distance)==null?void 0:h.text)||"",duration:((b=c.duration)==null?void 0:b.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function wn(e,t,r,n){var l,d;const a={q:t,target:r,key:e,format:"text"};n&&(a.source=n);const s=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!s.ok){const c=await s.text();return{translatedText:"",error:`Translate API error (${s.status}): ${c.substring(0,200)}`}}const o=(d=(l=(await s.json()).data)==null?void 0:l.translations)==null?void 0:d[0];return o?{translatedText:o.translatedText,detectedSourceLang:o.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function bn(e,t){const r=new URLSearchParams({address:t,key:e}),n=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${r}`);if(!n.ok)return{results:[],error:`Geocoding API error: ${n.status}`};const a=await n.json();return a.status!=="OK"&&a.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${a.status} — ${a.error_message||""}`}:{results:(a.results||[]).slice(0,5).map(s=>{var i;return{address:s.formatted_address,lat:s.geometry.location.lat,lng:s.geometry.location.lng,placeId:s.place_id,types:(i=s.types)==null?void 0:i.slice(0,3)}})}}async function _n(e,t,r={}){const n=new URLSearchParams({part:"snippet",q:t,key:e,type:r.type||"video",maxResults:String(r.maxResults||5),order:r.order||"relevance"}),a=await fetch(`https://www.googleapis.com/youtube/v3/search?${n}`);if(!a.ok){const i=await a.text();return{results:[],error:`YouTube API error (${a.status}): ${i.substring(0,200)}`}}return{results:((await a.json()).items||[]).map(i=>{var o,l,d,c,m,h,b,f;return{title:i.snippet.title,channelTitle:i.snippet.channelTitle,description:(o=i.snippet.description)==null?void 0:o.substring(0,200),videoId:((l=i.id)==null?void 0:l.videoId)||((d=i.id)==null?void 0:d.channelId)||((c=i.id)==null?void 0:c.playlistId)||"",publishedAt:i.snippet.publishedAt,url:(m=i.id)!=null&&m.videoId?`https://www.youtube.com/watch?v=${i.id.videoId}`:(h=i.id)!=null&&h.channelId?`https://www.youtube.com/channel/${i.id.channelId}`:"",thumbnailUrl:(f=(b=i.snippet.thumbnails)==null?void 0:b.medium)==null?void 0:f.url}})}}async function Ut(e,t={}){const r=Math.min(t.num||5,10),n=t.site?`site:${t.site} ${e}`:e;try{const a=new URLSearchParams({q:n}),s=await fetch(`https://html.duckduckgo.com/html/?${a}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!s.ok)return{results:[],error:`Search request failed (${s.status})`};const i=await s.text(),o=[],l=i.split(/class="result results_links/g).slice(1);for(const d of l){if(o.length>=r)break;const c=d.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),m=d.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(c){let h=c[1];const b=h.match(/uddg=([^&]+)/);b?h=decodeURIComponent(b[1]):h.startsWith("//")&&(h="https:"+h);const f=x=>x.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),_=f(c[2]),v=m?f(m[1]):"";if(_&&h.startsWith("http")){const x=h.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];o.push({title:_,link:h,snippet:v,displayLink:x})}}}return o.length===0?{results:[],error:void 0}:{results:o}}catch(a){return{results:[],error:`Web search error: ${a.message}`}}}async function En(e,t,r,n="driving"){var l,d,c,m;const a=new URLSearchParams({origins:t,destinations:r,key:e,mode:n,departure_time:"now"}),s=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${a}`);if(!s.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${s.status}`};const i=await s.json(),o=(c=(d=(l=i.rows)==null?void 0:l[0])==null?void 0:d.elements)==null?void 0:c[0];return!o||o.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(o==null?void 0:o.status)||i.status}`}:{distance:o.distance.text,duration:o.duration.text,durationInTraffic:(m=o.duration_in_traffic)==null?void 0:m.text}}const Qa=Object.freeze(Object.defineProperty({__proto__:null,geocode:bn,getDirections:vn,getDistanceMatrix:En,getPlaceDetails:yn,searchPlaces:fn,searchYouTube:_n,translateText:wn,webSearch:Ut},Symbol.toStringTag,{value:"Module"})),Ee="https://gmail.googleapis.com/gmail/v1/users/me";class we{constructor(t,r,n,a,s){this.db=t,this.userId=r,this.pinHash=n,this.clientId=a,this.clientSecret=s}async authHeaders(){const{token:t}=await ut(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var o;const r=await this.authHeaders(),n=new URLSearchParams;if(n.set("maxResults",String(t.maxResults||10)),t.query&&n.set("q",t.query),(o=t.labelIds)!=null&&o.length)for(const l of t.labelIds)n.append("labelIds",l);const a=await fetch(`${Ee}/messages?${n}`,{headers:r});if(!a.ok){const l=await a.text();throw new Error(`Gmail list failed (${a.status}): ${l.substring(0,200)}`)}const s=await a.json();if(!s.messages||s.messages.length===0)return[];const i=[];for(const l of s.messages.slice(0,t.maxResults||10))try{const d=await this.getMessage(l.id,r);d&&i.push(d)}catch{}return i}async getMessage(t,r){const n=r||await this.authHeaders(),a=await fetch(`${Ee}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:n});if(!a.ok)return null;const s=await a.json(),i=o=>{var l,d,c;return((c=(d=(l=s.payload)==null?void 0:l.headers)==null?void 0:d.find(m=>m.name.toLowerCase()===o.toLowerCase()))==null?void 0:c.value)||""};return{id:s.id,threadId:s.threadId,snippet:s.snippet||"",subject:i("Subject")||"(no subject)",from:i("From"),to:i("To"),date:i("Date")||new Date(parseInt(s.internalDate)).toISOString(),isUnread:(s.labelIds||[]).includes("UNREAD"),labels:s.labelIds||[]}}async getMessageBody(t){const r=await this.authHeaders(),n=await fetch(`${Ee}/messages/${t}?format=full`,{headers:r});if(!n.ok){const s=await n.text();throw new Error(`Gmail message body failed (${n.status}): ${s.substring(0,200)}`)}const a=await n.json();return Tn(a.payload)}async search(t,r=10){return this.listMessages({query:t,maxResults:r})}async send(t,r,n,a={}){const s=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${r}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];a.cc&&i.push(`Cc: ${a.cc}`),a.bcc&&i.push(`Bcc: ${a.bcc}`),a.replyToMessageId&&(i.push(`In-Reply-To: ${a.replyToMessageId}`),i.push(`References: ${a.replyToMessageId}`)),i.push("",n);const o=i.join(`\r
`),d={raw:wr(o)};a.threadId&&(d.threadId=a.threadId);const c=await fetch(`${Ee}/messages/send`,{method:"POST",headers:s,body:JSON.stringify(d)});if(!c.ok){const m=await c.text();throw new Error(`Gmail send failed (${c.status}): ${m.substring(0,200)}`)}return await c.json()}async createDraft(t,r,n,a={}){const s=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${r}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];a.cc&&i.push(`Cc: ${a.cc}`),i.push("",es(n));const o=i.join(`\r
`),l=wr(o),d=await fetch(`${Ee}/drafts`,{method:"POST",headers:s,body:JSON.stringify({message:{raw:l}})});if(!d.ok){const c=await d.text();throw new Error(`Gmail draft failed (${d.status}): ${c.substring(0,200)}`)}return await d.json()}async markAsRead(t){const r=await this.authHeaders();await fetch(`${Ee}/messages/${t}/modify`,{method:"POST",headers:r,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,r){const n=await this.authHeaders();let a={};switch(r){case"archive":a={removeLabelIds:["INBOX"]};break;case"trash":a={addLabelIds:["TRASH"]};break;case"read":a={removeLabelIds:["UNREAD"]};break;case"unread":a={addLabelIds:["UNREAD"]};break;case"star":a={addLabelIds:["STARRED"]};break;case"unstar":a={removeLabelIds:["STARRED"]};break}const s=await fetch(`${Ee}/messages/${t}/modify`,{method:"POST",headers:{...n,"Content-Type":"application/json"},body:JSON.stringify(a)});if(!s.ok){const i=await s.text();throw new Error(`Failed to modify message: ${i}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),r=await fetch(`${Ee}/labels/INBOX`,{headers:t});return r.ok&&(await r.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),r=await fetch(`${Ee}/profile`,{headers:t});if(!r.ok)throw new Error("Failed to get Gmail profile");return await r.json()}}function Tn(e){var t,r,n;if(!e)return"";if((t=e.body)!=null&&t.data)return Kt(e.body.data);if(e.parts){for(const a of e.parts)if(a.mimeType==="text/plain"&&((r=a.body)!=null&&r.data))return Kt(a.body.data);for(const a of e.parts)if(a.mimeType==="text/html"&&((n=a.body)!=null&&n.data)){const s=Kt(a.body.data);return ts(s)}for(const a of e.parts)if(a.parts){const s=Tn(a);if(s)return s}}return e.snippet||""}function es(e){let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return t=t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)","g"),"<em>$1</em>"),`<html><body style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#000000;">${t.split(/\n\n+/).map(a=>{const s=a.split(`
`);return s.every(i=>/^\s*[-*]\s/.test(i)||i.trim()==="")?`<ul>${s.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*[-*]\s+/,"")}</li>`).join("")}</ul>`:s.every(i=>/^\s*\d+\.\s/.test(i)||i.trim()==="")?`<ol>${s.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*\d+\.\s+/,"")}</li>`).join("")}</ol>`:`<p>${s.join("<br>")}</p>`}).join("")}</body></html>`}function wr(e){const t=new TextEncoder().encode(e);let r="";for(let n=0;n<t.length;n++)r+=String.fromCharCode(t[n]);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Kt(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function ts(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const rs=1e4,ns=1e4;async function xn(e,t){try{const r=new AbortController,n=setTimeout(()=>r.abort(),ns),a=await fetch(e,{signal:r.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(!a.ok)return{text:"",error:`HTTP ${a.status}`};const s=a.headers.get("content-type")||"";if(!s.includes("text/html")&&!s.includes("text/plain")&&!s.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${s.split(";")[0]}`};const i=await a.text();clearTimeout(n);const o=i.length>2e5?i.substring(0,2e5):i,l=as(o);return l.length<50?{text:"",error:"Page has too little readable content"}:{text:l.substring(0,t||rs)}}catch(r){return{text:"",error:r.name==="AbortError"?"Timeout":r.message}}}function as(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(r,n)=>String.fromCharCode(parseInt(n))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(r=>r.trim()).filter(r=>r.length>0).join(`
`),t.trim()}const ss=1e4;async function is(e,t){var a,s,i;const r=new AbortController,n=setTimeout(()=>r.abort(),ss);try{const o=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",signal:r.signal,headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar-pro",messages:[{role:"user",content:e}],max_tokens:2e3})});if(clearTimeout(n),!o.ok)return{report:"",sources:[],pagesRead:0,error:`Perplexity error ${o.status}`};const l=await o.json(),d=((i=(s=(a=l==null?void 0:l.choices)==null?void 0:a[0])==null?void 0:s.message)==null?void 0:i.content)||"",m=((l==null?void 0:l.citations)||[]).map(h=>({title:h,url:h,snippet:""}));return{report:d,sources:m,pagesRead:m.length}}catch(o){return clearTimeout(n),{report:"",sources:[],pagesRead:0,error:`Perplexity request failed: ${o.message}`}}}async function Sn(e,t,r={}){if(r.perplexityApiKey){const h=await is(e,r.perplexityApiKey);if(!h.error)return h}const n=r.maxPages||(r.depth==="thorough"?5:3),a=r.maxResults||(r.depth==="thorough"?8:5),s=await Ut(e,{num:a,site:r.site});if(s.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${s.error}`};if(s.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const o=s.results.slice(0,n).map(async h=>{const b=await xn(h.link);return{title:h.title,url:h.link,displayLink:h.displayLink,snippet:h.snippet,content:b.text,error:b.error}}),d=(await Promise.all(o)).filter(h=>h.content.length>50);if(d.length===0){const h=s.results.map((f,_)=>`[${_+1}] ${f.title}
${f.snippet}
Source: ${f.link}`).join(`

`);return{report:await br(e,h,t,"snippets"),sources:s.results.map(f=>({title:f.title,url:f.link})),pagesRead:0}}const c=d.map((h,b)=>`--- SOURCE ${b+1}: ${h.title} (${h.displayLink}) ---
${h.content}
--- END SOURCE ${b+1} ---`).join(`

`);return{report:await br(e,c,t,"full"),sources:d.map(h=>({title:h.title,url:h.url})),pagesRead:d.length}}async function br(e,t,r,n){const s=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

${n==="full"?"I have fetched and read the full content of several web pages related to the research query.":"I could only retrieve search snippets (page fetching failed). Base the analysis on available snippet information and note this limitation."}

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

Write a synthesized research report answering the query above.`;try{return(await r.chat([{role:"system",content:s},{role:"user",content:i}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(o){return`Research synthesis error: ${o.message}. Raw search results were found but could not be analyzed.`}}const os=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:Sn,fetchPageContent:xn},Symbol.toStringTag,{value:"Module"})),Lt="https://api.browser-use.com/api/v2",_r=2e4,er=6e3,ls=88e3,kn=new Set(["finished","stopped"]);async function Dn(e,t,r){const n=(r==null?void 0:r.timeoutMs)??ls;let a,s;try{const o={task:e};r!=null&&r.secrets&&Object.keys(r.secrets).length>0&&(o.secrets=r.secrets);const l=await fetch(`${Lt}/tasks`,{method:"POST",headers:{"X-Browser-Use-API-Key":t,"Content-Type":"application/json"},body:JSON.stringify(o)});if(!l.ok){const c=await l.text().catch(()=>"");return{output:null,taskId:"",status:"failed",error:`HTTP ${l.status}: ${c}`}}const d=await l.json();if(a=d.id,s=d.sessionId||void 0,!a)return{output:null,taskId:"",status:"failed",error:"No id in create response"}}catch(o){return{output:null,taskId:"",status:"failed",error:o.message}}await new Promise(o=>setTimeout(o,_r));const i=Date.now()+(n-_r);for(;Date.now()<i;){try{const o=await fetch(`${Lt}/tasks/${a}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(o.ok){const l=await o.json();if(kn.has(l.status))return l.status==="finished"?{output:l.output??null,taskId:a,sessionId:s,status:"completed"}:{output:l.output??null,taskId:a,status:"failed",error:l.output??"Task was stopped before completing"}}}catch{}await new Promise(o=>setTimeout(o,er))}return{output:null,taskId:a,sessionId:s,status:"timeout"}}async function ds(e,t,r){const a=Date.now()+3e4;for(;Date.now()<a;){try{const s=await fetch(`${Lt}/tasks/${e}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(!s.ok){await new Promise(o=>setTimeout(o,er));continue}const i=await s.json();if(kn.has(i.status)){const o=await fetch(`${Lt}/tasks/${e}`,{headers:{"X-Browser-Use-API-Key":t}}),l=o.ok?(await o.json()).output??null:i.output??null;return{status:i.status,output:l,done:!0}}}catch{}await new Promise(s=>setTimeout(s,er))}return{status:"running",output:null,done:!1}}async function Rn(e){const t=e instanceof Buffer?new Uint8Array(e):e,r=new DataView(t.buffer,t.byteOffset,t.byteLength);let n=0;for(;n<t.length-30&&r.getUint32(n,!0)===67324752;){const a=r.getUint16(n+6,!0),s=r.getUint16(n+8,!0),i=r.getUint32(n+18,!0),o=r.getUint32(n+22,!0),l=r.getUint16(n+26,!0),d=r.getUint16(n+28,!0),c=new TextDecoder().decode(t.slice(n+30,n+30+l)),m=n+30+l+d;if(c==="word/document.xml"){const h=t.slice(m,m+i);let b;if(s===0)b=h;else{const v=new DecompressionStream("deflate-raw"),x=v.writable.getWriter();x.write(h),x.close();const E=v.readable.getReader(),O=[];let A=!1;for(;!A;){const F=await E.read();F.done?A=!0:O.push(F.value)}const B=O.reduce((F,j)=>F+j.length,0);b=new Uint8Array(o||B);let G=0;for(const F of O)b.set(F,G),G+=F.length}return new TextDecoder().decode(b).replace(/<\/w:p>/g,`
`).replace(/<\/w:tr>/g,`
`).replace(/<[^>]+>/g,"").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim()}n=m+i,a&8&&(n+=16)}return""}const On=Object.freeze(Object.defineProperty({__proto__:null,extractDocxTextFromBuffer:Rn},Symbol.toStringTag,{value:"Module"})),cs=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,weight:.9},{pattern:/\bremi[a-z]{0,5}\s+(me|us)\b/i,weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,weight:.95},{pattern:/^[Tt]ask:\s*/,weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,weight:.9},{pattern:/\b(change\s+(the\s+)?time|update\s+(the\s+)?(reminder|schedule|alarm)|reschedule|move\s+it\s+to|cancel\s+(the\s+)?(reminder|schedule|alarm)|delete\s+(the\s+)?(reminder|schedule|alarm))\b/i,weight:.9},{pattern:/\b(show\s+(me\s+)?(my\s+)?(reminders?|schedules?|alarms?)|what\s+reminders?|any\s+reminders?|do\s+i\s+have.*remind|when\s+is\s+my\s+remind)\b/i,weight:.9},{pattern:/\b(stop|turn\s+off|switch\s+off|disable|deactivate)\s+(that|the|this|my)?\s*(reminder|schedule|alarm|notification)\b/i,weight:.9},{pattern:/\b(snooze|postpone|push\s+back|remind\s+me\s+later|later\s+reminder)\b/i,weight:.9},{pattern:/\b(change|update|edit|move|shift)\s+(it|this|that)\s+(to|for)\b/i,weight:.85},{pattern:/\bset\s+it\s+(for|at|to)\b/i,weight:.85},{pattern:/\b(what\s+time|when)\s+(did\s+i\s+set|is\s+(the|my)\s+remind|does\s+(it|that)\s+go\s+off)\b/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,weight:.9},{pattern:/\b(add|save|append|write|put)\s+(to|in|into)\s+(my\s+|your\s+|the\s+)?(quick\s+)?notes?\b|\bquick\s+notes\b/i,weight:.88},{pattern:/\b(update\s+cell|change\s+cell|delete\s+row|remove\s+row|delete\s+duplicate|remove\s+duplicate|create\s+(a\s+)?(new\s+)?(tab|sheet)|add\s+(a\s+)?tab|what.{0,15}(column|row\s+\d|cell\s+[A-Z])|sum\s+of|total\s+(in|of))\b/i,weight:.9},{pattern:/\b(forward\s+(that\s+)?(email|message)|reply\s+to\s+(that|the|an?\s+)?email|respond\s+to\s+(that|the)\s+email|mark\s+(it|that|this|email)\s+as|(got|received)\s+an?\s+email\s+from)\b/i,weight:.85},{pattern:/\b(cancel\s+(the\s+)?(event|meeting|appointment)|reschedule\s+(the\s+|my\s+)?(meeting|event|appointment)|delete\s+(from|the)\s+calendar|remove\s+(the\s+)?(event|meeting)\s+from\s+calendar)\b/i,weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,weight:.9},{pattern:/\b(keep\s+(that\s+)?in\s+mind|always\s+(do|use|prefer|remember)|update\s+(my\s+)?(memory|preference)|delete\s+(that\s+)?memory|forget\s+that|what\s+did\s+i\s+tell\s+you\s+about)\b/i,weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,weight:.9}];function ir(e,t){for(const r of cs)if(r.pattern.test(e))return{agent:"multi",confidence:r.weight,reasoning:"Keyword match — full agent"};return t&&e.trim().length<80&&t.split(`
`).slice(-16).some(a=>/\[TOOLS_USED:/i.test(a)||/\b(reminder|reminders|schedule|scheduled|cron|alarm|next_run|set for|going off|remind)\b/i.test(a)||/\b(i['']ll\s+(search|research|find|look\s+up|check|add|create|book)|just\s+a\s+moment|pulling\s+that\s+together|on\s+it\b|let\s+me\s+(search|research|find|look))\b/i.test(a))?{agent:"multi",confidence:.8,reasoning:"Active tool session follow-up — full agent"}:t&&/spreadsheet|sheet|google\s*sheet/i.test(t)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(e)?{agent:"multi",confidence:.85,reasoning:"Memory context — full agent"}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function In(e){const t=e.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')]+/);if(t&&/\b(delete|trash|remove)\b/i.test(e))return{tool:"drive_delete_file",args:{url_or_id:t[0].replace(/[.,;)]$/,"")}};if(/\b(list|show|display)\s+(my\s+)?(google\s+)?drive\s+(files?|docs?|documents?|folders?)\b|\bwhat\s+(files?|docs?|documents?)\s+(do\s+i\s+have|are|is)\s+(in|on)\s+(my\s+)?(google\s+)?drive\b/i.test(e))return{tool:"drive_list",args:{}};const r=e.match(/\b(?:search|find|look\s+(?:for|up))\s+(?:(?:in|on|my|the|google)\s+)*drive\s+(?:for\s+)?(.{3,60}?)(?:\s*[?.!,])?$/i);return r?{tool:"drive_search",args:{query:r[1].trim()}}:/\b(how\s+many\s+unread|unread\s+(count|emails?|messages?)|any\s+unread\s+(emails?|messages?))\b/i.test(e)?{tool:"gmail_unread_count",args:{}}:/\b(list|show|display)\s+(my\s+)?(upcoming\s+)?(calendar\s+)?(events?|meetings?|appointments?)\b/i.test(e)&&!/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+week|this\s+week|\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))\b/i.test(e)?{tool:"list_calendar_events",args:{}}:/\b(list|show|display)\s+(my\s+)?(active\s+)?(reminders?|schedules?|alarms?)\b|\bwhat\s+reminders?\s+(do\s+i\s+have|are\s+set|are\s+active)\b/i.test(e)?{tool:"list_schedules",args:{}}:null}function Cn(e,t){if(/\b(delete|trash|remove)\b.{0,50}\b(file|doc|document|sheet|spreadsheet|folder)\b|\b(file|doc|document|sheet|spreadsheet)\b.{0,50}\b(delete|trash|remove)\b/i.test(e)){const r=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(r)return{tool:"drive_delete_file",args:{url_or_id:r[0].replace(/[.,;)]$/,"")}}}if(/\b(move|rename|organise|organize)\b.{0,50}\b(file|doc|document|sheet)\b/i.test(e)){const r=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(r){const n={url_or_id:r[0].replace(/[.,;)]$/,"")},a=e.match(/\bto\s+(?:the\s+)?(?:folder\s+)?["']?([A-Za-z0-9 _-]{2,40})["']?\s*(?:folder\b|$)/i),s=e.match(/\brename\b.{0,30}\bto\s+["']?([A-Za-z0-9 _.-]{2,60})["']?/i);if(a&&(n.folder_name=a[1].trim()),s&&(n.new_name=s[1].trim()),n.folder_name||n.new_name)return{tool:"drive_organise",args:n}}}return null}function Nn(e,t,r,n,a,s){const i=t.assistant_name||"Karna",o=t.personality_prompt?`
## Personality
${t.personality_prompt.substring(0,2e3)}
`:"",l=r?`
## Active Memory (ALWAYS consult before responding)
${r}
`:"";let d="";try{const m=new Date;d=new Intl.DateTimeFormat("en-GB",{timeZone:t.timezone,day:"numeric",month:"short",year:"numeric"}).format(m)}catch{d=""}const c=`
## Current User
- **Name**: ${t.name}
- **Timezone**: ${t.timezone}
- **Time**: ${a}
- **Today's date for sheets**: ${d}
`;switch(e){case"conversation":return`You are ${i} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic.

${c}${o}${l}

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
- **HARD RULE — no false confirmations**: You have ZERO tool access. You CANNOT set reminders, create schedules, send emails, read sheets, or perform any action. NEVER output phrases like "Reminder set for...", "I've scheduled...", "Done ✅", "Task created", or any language implying an action was completed. If the user wants an action, say: "I can do that — just send your message and I'll take care of it." Do NOT simulate the outcome.`;default:return""}}const us=Object.freeze(Object.defineProperty({__proto__:null,buildSubAgentPrompt:Nn,classifyIntentFast:ir,detectDeterministicOp:In,detectTierTwoOp:Cn},Symbol.toStringTag,{value:"Module"})),ms=2e3,ps=2e3,An=4;function Yt(e){return Math.ceil(e.length/An)}function Er(e,t){const r=t*An;return e.length<=r?e:e.slice(0,r)+`
[...truncated to fit token budget]`}function Ln(e){const t=new Set(["(Previous response was not recorded.)","(Previous request did not complete. Please try again.)","(My previous response was cut off before completing. Starting fresh.)"]),r=[];for(const a of e){const s=typeof a.content=="string"?a.content:"";if(a.role==="assistant"&&t.has(s.trim())&&r.length>0&&r[r.length-1].role==="user"){r.pop();continue}r.push(a)}const n=[];for(const a of r){let s=a.content;a.role==="assistant"&&typeof s=="string"&&(s=s.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim(),s||(s="(Previous response was not recorded.)"));const i=s!==a.content?{...a,content:s}:a;n.length>0&&n[n.length-1].role===i.role&&i.role!=="system"?n[n.length-1]={...n[n.length-1],content:n[n.length-1].content+`

`+i.content}:n.push(i)}return n}const Tr=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes (recurring). daily = RECURRING every single day at HH:MM — only use if user explicitly says "every day", "daily", or "each morning" etc. weekly = recurring every week on a specific day at time. once = fires ONE TIME at a specific date+time — USE THIS as the DEFAULT for any reminder that is not explicitly recurring (e.g. "remind me at 8pm", "remind me tomorrow at 9am", "remind me Sunday at 8:45am" are all once, not daily).'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration requests: "in 5 minutes", "in 2 hours", "in half an hour". Do NOT use for any request that mentions a specific time or date ("at 13:00", "tomorrow at noon", "next Friday") — use schedule_value instead. Examples: "in 5 minutes" = 5, "in 2 hours" = 120.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"update_schedule",description:'Update an existing scheduled task — change its name, description, or reschedule it to a new time. Use this when the user wants to change the time of a reminder or rename it. You MUST call this tool — never say "updated" without calling it.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to update (get it from list_schedules first if unknown)"},name:{type:"string",description:"New name for the task (optional)"},description:{type:"string",description:"New description (optional)"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:"New schedule type (required if changing the time)"},schedule_value:{type:"string",description:"New schedule value matching the schedule_type format (required if changing the time)"},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration changes ("in 30 minutes", "in 2 hours"). Do NOT use if the user specifies a clock time or date — use schedule_value instead.'}},required:["job_id"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:`Store a PERMANENT rule, preference, or standing instruction that Karna should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts — those go to create_schedule. NEVER USE FOR: full text of essays, articles, reports, drafts, or any document body — those belong in document_library (if uploaded) or create_doc (Google Drive). A URL/title pointer is OK (type='context'), but never the body. Ask yourself: "Will this still be relevant in 6 months and is it a preference/rule, not a document?" If no, do not store it.`,parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"delete_memory",description:'Delete a stored memory entry by its ID. Use when the user says "forget that", "remove that rule", or "that preference is wrong". Always call search_memory first to confirm the correct ID. Confirm with the user if there is any ambiguity about which entry to remove.',parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to delete"}},required:["id"]}},{name:"update_memory",description:"Update the content of an existing memory entry by its ID. Use when the user wants to correct or change a stored rule or preference. Always call search_memory first to find the correct ID.",parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to update"},content:{type:"string",description:"The new content to replace the existing entry"}},required:["id","content"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"delete_sheet_row",description:"Delete a specific row from a Google Sheet tab by row number. The row number is as displayed in the sheet (1-based: row 1 = header, row 2 = first data row). Rows below shift up. ALWAYS call read_sheet first to confirm the exact row number before deleting. Cannot delete row 1 (header).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},sheet_name:{type:"string",description:'Tab name exactly as shown in the sheet (e.g. "Sheet1", "Budget", "January")'},row_number:{type:"number",description:"Row number to delete (1-based, as shown in the sheet). Minimum 2."}},required:["spreadsheet_id","sheet_name","row_number"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"rewrite_doc",description:"Replace the entire content of an existing Google Document with new formatted content. Use this to reformat or clean up a document — clears the current content and rewrites it with proper headings, bold, bullet points etc. Workflow: read_doc to get current content → rewrite_doc with reformatted version.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to rewrite (from URL: docs.google.com/document/d/{ID}/edit)"},content:{type:"string",description:"New formatted content (supports markdown: # ## ### headings, **bold**, *italic*, - bullets)"}},required:["document_id","content"]}},{name:"delete_doc_content",description:"Remove specific text from a Google Document by exact string match. Removes ALL occurrences of the text. Use this to delete a duplicate entry — call read_doc first to find the exact text. If text appears twice (duplicate), both copies are removed; use append_to_doc immediately after to add the single correct version back.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"},text_to_remove:{type:"string",description:"Exact text to remove, including any surrounding whitespace or line breaks needed to cleanly remove the entry."}},required:["document_id","text_to_remove"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. STRICT RULES — violating any of these is a critical error: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm. (2) NEVER fabricate email body content. Only use data you retrieved from tools in this same conversation. If you do not have the actual content (costs, numbers, details), do NOT call this — tell the user exactly what information is missing and ask them to provide it. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_read_file",description:"Read the content of a specific Google Drive file by URL or file ID. Supports Google Docs (exported as text), Sheets (exported as CSV), PDFs (extracted via AI), and other text files. Use this when the user shares a Google Drive or Google Docs link and wants you to read, summarize, or analyze the file contents.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive or Google Docs URL (e.g. https://drive.google.com/file/d/... or https://docs.google.com/document/d/...) or bare file ID"},extract_focus:{type:"string",description:'Optional: specific content to focus extraction on (e.g. "financial figures", "action items", "table of contents")'}},required:["url_or_id"]}},{name:"drive_delete_file",description:"Move a Google Drive file or document to trash. The file can be restored from Drive trash within 30 days. Use when the user asks to delete, remove, or trash a file.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to trash"}},required:["url_or_id"]}},{name:"drive_organise",description:"Move a Google Drive file to a folder and/or rename it. Creates the folder if it does not exist. Use when the user wants to organise, move, or rename a file in Drive.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to move/rename"},folder_name:{type:"string",description:"Name of the destination folder. Creates it if it does not exist."},new_name:{type:"string",description:"Optional: new name for the file"}},required:["url_or_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets (~1s). Use ONLY when: (1) the user wants a list of links to browse, not a synthesized answer, (2) real-time scores or breaking headlines, or (3) fallback if research tool fails. If the user wants an actual answer (not links), use research instead.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:"Deep web research — synthesizes a detailed report from multiple sources. Uses Perplexity Sonar when available (~5s), otherwise fetches and reads 3-5 pages (~15s). Default search tool — use whenever your training knowledge might be stale, uncertain, or high-stakes. Covers: weather, travel, recommendations, comparisons, product questions, reviews, current data, anything needing a verified or up-to-date answer. Only skip this in favor of web_search when user wants raw links or real-time scores.",parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"browser_task",description:'Run a complete browser automation workflow using a real cloud browser. The cloud agent handles ALL steps — navigation, clicks, form fills, extraction — in a single call. CRITICAL: Always pass the ENTIRE multi-step workflow as one task description. Never split a browser workflow across multiple browser_task calls. Wrong: call 1 "go to site", call 2 "click X", call 3 "extract Y". Correct: one call with "go to site, click X, extract Y". Use for: JS-heavy sites, form submission, clicking through pages, any site requiring a real browser.',parameters:{type:"object",properties:{task:{type:"string",description:'Full Plain-English description of the COMPLETE workflow (e.g. "Go to news.ycombinator.com and return the top 5 story titles and URLs", "Go to books.toscrape.com, click the Mystery category, list the first 5 books with their star rating and price")'},site_name:{type:"string",description:'Optional: name of a saved Secret Vault entry (e.g. "LinkedIn", "Gmail backup") to inject login credentials automatically. The credentials will be passed securely to the browser agent.'}},required:["task"]}},{name:"browser_task_status",description:"Check the status of a previously started browser task that was still running when it timed out. Use when the user asks what happened with a browser task. Get the task_id from memory.",parameters:{type:"object",properties:{task_id:{type:"string",description:"The task ID returned by the earlier browser_task call (stored in memory)"}},required:["task_id"]}},{name:"vault_lookup",description:"Check the Secret Vault for saved login credentials by site name. Returns matching entry names (not actual credentials). Use this BEFORE calling browser_task whenever the user asks to access a site that requires a password or login.",parameters:{type:"object",properties:{site_name:{type:"string",description:'Site or service name to look up (e.g. "LinkedIn", "Gmail backup", "MyBank"). Case-insensitive, partial matches included.'}},required:["site_name"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"parse_document",description:"Read and extract text content from an uploaded file (PDF, Word/DOCX, or text). Call this whenever the user uploads a document and wants you to read it, extract information, or work with its contents.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id returned when the file was uploaded"},extract_focus:{type:"string",description:'Optional: specific information to focus on extracting (e.g., "quantities and equipment names", "dates and amounts", "all text content")'}},required:["file_id"]}},{name:"search_library",description:`Search the user's Document Library (uploaded files and migrated documents) by name, summary, or extracted text. Use this when the user asks "find my essay about X", "what did I upload about Y", "do I have a document on Z", or any question that might be answered by an uploaded file. Returns a list of matching documents with previews and IDs. Follow with read_library_file to get full text.`,parameters:{type:"object",properties:{query:{type:"string",description:"Search terms to look for in document name, summary, or extracted text"},limit:{type:"number",description:"Maximum number of results to return (1-20, default: 10)"}},required:["query"]}},{name:"read_library_file",description:"Read the full extracted text of a document from the Document Library. Use after search_library to get full content. Pass either the numeric document id (from search_library results) or a partial name. Returns up to 20,000 characters of extracted text.",parameters:{type:"object",properties:{id_or_name:{type:"string",description:"Numeric document ID from search_library results, or a partial document name to search by"}},required:["id_or_name"]}},{name:"create_skill",description:"Create a new reusable skill — a named workflow that can be invoked by name in future conversations. Use this when the user asks you to create a skill, save a workflow, or build a reusable automation. IMPORTANT: Before calling this, ask the user clarifying questions to understand: what the skill should do, what inputs it needs, what tools it uses, and what the expected output is.",parameters:{type:"object",properties:{name:{type:"string",description:'Human-readable skill name (e.g., "Equipment List Parser", "Daily Expense Logger")'},description:{type:"string",description:"One-sentence description of what the skill does"},instructions:{type:"string",description:"Detailed step-by-step instructions for executing the skill. Be specific about which tools to use, in what order, and what to do with the results."},required_tools:{type:"array",items:{type:"string"},description:'List of tool names this skill needs (e.g. ["parse_document", "append_sheet", "create_sheet"])'},parameters:{type:"object",description:"JSON schema describing the inputs this skill accepts. Use standard JSON schema format."},examples:{type:"array",description:"Optional example inputs and expected outputs to guide execution",items:{type:"object",properties:{input:{type:"object"},output:{type:"string"}}}}},required:["name","description","instructions"]}},{name:"list_skills",description:"List all custom skills the user has created. Shows name, description, and usage count for each.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled skills. Default: false"}}}}];async function or(e,t){try{const n=((await e.prepare("SELECT slug, name, description, parameters FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at ASC").bind(t).all()).results||[]).map(a=>{let s={};try{s=JSON.parse(a.parameters)||{}}catch{}return s.properties||(s={type:"object",properties:{inputs:{type:"string",description:"Any additional context or specific instructions for this skill execution"}}}),{name:a.slug,description:`[Custom Skill] ${a.description}`,parameters:s}});return[...Tr,...n]}catch{return Tr}}async function lr(e,t){try{const n=(await e.prepare("SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t).all()).results||[];return n.length===0?"":n.map(a=>`- ${a.content}`).join(`
`)}catch{return""}}function Mn(e,t,r,n){const a=e.assistant_name||"Karna",s=e.personality_prompt?Er(`## Personality Instructions
${e.personality_prompt}
`,ms):"",i=n!=null&&n.trim()?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. They are fixed — do not store copies of these in your memory or contradict them.
${n}
`:"",o=Er(t,ps);return`You are ${a} — a personal AI assistant. Your name is ${a} — always refer to yourself by this name if asked.

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

${s}

${i}
## Your Active Memory (Your Own Notes — Can Be Updated via store_memory)
**ALWAYS read and apply everything in this section before responding.** This is your stored knowledge about the user — preferences you have noted, referenced documents, data sources, and context. These OVERRIDE default behaviour. Do NOT duplicate anything already covered in Standing Instructions above.
- If a memory entry says "use this Google Sheet for events queries" — then when the user asks about events, you MUST use read_sheet with that spreadsheet ID. Do NOT use calendar or ask the user for the sheet link again.
- If a memory entry references a document or spreadsheet, use the stored ID directly with the appropriate tool (read_sheet, read_doc, etc.).
- If a memory entry records a preference (e.g. "check Outlook for meetings"), follow it without asking.

${o}

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

## STORAGE ROUTING — Where Things Belong
Before storing or saving anything, pick the right destination:

| Content type | Where it goes | Tool |
|---|---|---|
| Preferences, habits, standing rules | Memory | store_memory(type=preference) |
| Permanent facts about the user | Memory | store_memory(type=fact) |
| Resource pointers (spreadsheet ID, doc title+URL) | Memory | store_memory(type=context) — pointer only, never the body |
| Time-based reminders, follow-ups | Schedules | create_schedule |
| Essays, articles, reports, briefs (long-form content) | Google Drive | create_doc |
| Uploaded files and their content | Document Library | auto-stored at upload; search via search_library, read via read_library_file |
| Decisions the user made | Memory | store_memory(type=decision) |

**NEVER** store the full body of a document, essay, or article in store_memory. A title+URL pointer is fine; the 2000-word body is not. Long-form content belongs in Google Drive (create_doc) or in the Document Library if uploaded.

**Document Library tools:**
- search_library(query) — full-text search across uploaded files and migrated documents. Use when user asks "find my essay about X", "what did I upload about Y", or any question that might be answered by an uploaded file.
- read_library_file(id_or_name) — returns up to 20k chars of extracted text for a specific document. Use after search_library or when user refers to a previously uploaded file by name.

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
- **Reminder recurrence rule — DEFAULT TO ONCE.** For action_type="reminder": use schedule_type="once" unless the user explicitly uses recurring language ("every day", "daily", "each morning", "every Monday", "every night", etc.). A reminder at a specific time without recurring language ("remind me at 8:45am", "remind me Sunday at 9pm", "remind me tomorrow at noon") is ALWAYS schedule_type="once". Using schedule_type="daily" for a one-time reminder causes it to fire every day — this is a serious bug.

**Email hallucination is strictly forbidden:**
- NEVER compose email body with data you have not retrieved from a tool in this conversation.
- If the user asks you to send content you don't have (costs, figures, documents), say: "I don't have the [X] — please share it and I'll send it, or I can search your Gmail/Drive for it first."
- NEVER guess, estimate, or fabricate numbers, names, or costs in an email body.

**Browser result hallucination is strictly forbidden:**
- NEVER report email subjects, senders, message content, counts, or any page data that was not explicitly present in the browser_task or browser_task_status tool result text.
- If the tool result contains [NO-OUTPUT]: say exactly — "The browser completed but returned no content. This usually means the site blocked automation, the session expired, or the login failed." Do NOT invent what emails or page content might have said.
- If the user asks "did you find X?" and the browser returned nothing: answer "No — the browser returned no content." Never guess or confirm based on context.

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
- If the user **asks about a previously uploaded file** ("what did I write about in that essay?", "find my report on X"): call **search_library** first to locate it by content, then **read_library_file** to get the full text. Do NOT ask the user to re-upload.
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
${$n(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${r==="telegram"?`

## TELEGRAM CONSTRAINTS — 25-second hard limit
- **Essays / documents**: Keep written content under 400 words. Write directly from your knowledge — do NOT call web_search before writing. Call create_doc in one shot immediately.
- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).
- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use \`schedule_value\` with the exact datetime in the user's local timezone — NEVER use \`minutes_from_now\` for clock-time requests (it causes wrong times). Only use \`minutes_from_now\` for pure duration requests like "in 30 minutes" or "in 2 hours".
- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I'll now..." — just call the tool.
- **Long content intent check**: When asked to write long-form content (essay, article, report — likely over 200 words) WITHOUT a save destination specified, do NOT start writing. Ask first: "Should I save this as a Google Doc and send you the link, or write it here in chat?" Wait for the response. If Drive/Doc, call \`create_doc\` with full content and return only the link. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**`:""}`}async function Jt(e,t,r){var d;const a=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${r.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let s;((d=a.files)==null?void 0:d.length)>0?s=a.files[0].id:s=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:r,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${s}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:s,folderName:r}}function Mt(e){return e.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").replace(/<function_calls>[\s\S]*?<\/function_calls>/gi,"").replace(/<function_result>[\s\S]*?<\/function_result>/gi,"").trim()}function $n(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}async function bt(e,t,r,n,a,s,i,o,l,d,c,m,h){const b=Date.now();let f=!0,_="",v="";try{return v=await gs(e,t,r,n,s,i,o,l,d,c,m,h),v}catch(x){throw f=!1,_=x.message||"Unknown error",x}finally{const x=Date.now()-b;try{await r.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(n,a.agentType||null,a.providerName||null,e,JSON.stringify(t).substring(0,2e3),(f?v:"").substring(0,500),f?1:0,_||null,x,a.isEnforcementRetry?1:0,a.channel||"web").run()}catch{}}}function Bn(e){const t=e.length;for(let r=0;r<t-1;r++){const n=e[r];if(n.role!=="user"||typeof n.content!="string")continue;const a=t-1-r,s=a<=2?12e3:a<=4?5e3:2e3;n.content.length>s&&(e[r]={...n,content:n.content.substring(0,s)+`
[...truncated in history to reduce context size]`})}}function hs(e){const t=[];let r=[],n="",a=!1,s=0;const i=e.length;for(;s<i;){const o=e[s];if(a){if(o==='"'){if(e[s+1]==='"'){n+='"',s+=2;continue}a=!1,s++;continue}n+=o,s++;continue}if(o==='"'){a=!0,s++;continue}if(o===","){r.push(n),n="",s++;continue}if(o==="\r"&&e[s+1]===`
`){r.push(n),t.push(r),r=[],n="",s+=2;continue}if(o===`
`||o==="\r"){r.push(n),t.push(r),r=[],n="",s++;continue}n+=o,s++}for((n||r.length)&&(r.push(n),t.push(r));t.length&&t[t.length-1].every(o=>o==="");)t.pop();return t}async function gs(e,t,r,n,a,s,i,o,l,d,c,m){var b,f,_,v,x,E,O,A,B,G,F,j,W,q,R,H;const h=new Y(r);switch(e){case"create_schedule":{const u=new Date;let y;const p=d||"UTC";if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){y=new Date(u.getTime()+t.minutes_from_now*60*1e3);const D=y.toLocaleString("en-US",{timeZone:p,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[C,$,I]=(D[0]||"").split("/");t.schedule_value=`${I}-${C}-${$} ${D[1]||"00:00"}`,t.schedule_type="once"}else if(t.schedule_type==="interval"){const T=parseInt(t.schedule_value,10);y=new Date(u.getTime()+T*60*1e3)}else if(t.schedule_type==="daily"&&t.action_type==="reminder"){const T=`${t.name||""} ${t.action_description||""}`.toLowerCase();if(/\bevery\b|\bdaily\b|\beach\b|\bmorning\b|\bevening\b|\bnight\b|\bweekday\b|\bweekend\b|\brecurring\b|\brepeat\b/.test(T)){const[C,$]=t.schedule_value.split(":").map(Number),I=u.toLocaleString("en-US",{timeZone:p}),N=new Date(I),M=new Date(N);M.setHours(C,$,0,0),M<=N&&M.setDate(M.getDate()+1);const K=new Date(M.toLocaleString("en-US",{timeZone:"UTC"})),Z=new Date(M.toLocaleString("en-US",{timeZone:p})),Q=K.getTime()-Z.getTime();y=new Date(M.getTime()+Q)}else{const[C,$]=t.schedule_value.split(":").map(Number),I=u.toLocaleString("en-US",{timeZone:p}),N=new Date(I),M=new Date(N);M.setHours(C,$,0,0),M<=N&&M.setDate(M.getDate()+1);const K=mt=>String(mt).padStart(2,"0"),Z=M.getFullYear(),Q=K(M.getMonth()+1),ee=K(M.getDate());t.schedule_value=`${Z}-${Q}-${ee} ${K(C)}:${K($)}`,t.schedule_type="once";const ne=new Date(M.toLocaleString("en-US",{timeZone:"UTC"})),de=new Date(M.toLocaleString("en-US",{timeZone:p})),Ie=ne.getTime()-de.getTime();y=new Date(M.getTime()+Ie)}}else if(t.schedule_type==="daily"){const[T,D]=t.schedule_value.split(":").map(Number),C=u.toLocaleString("en-US",{timeZone:p}),$=new Date(C),I=new Date($);I.setHours(T,D,0,0),I<=$&&I.setDate(I.getDate()+1);const N=new Date(I.toLocaleString("en-US",{timeZone:"UTC"})),M=new Date(I.toLocaleString("en-US",{timeZone:p})),K=N.getTime()-M.getTime();y=new Date(I.getTime()+K)}else if(t.schedule_type==="weekly"){const[T,D]=t.schedule_value.split(" "),[C,$]=(D||"00:00").split(":").map(Number),N=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Ie=>Ie.toLowerCase()===T.toLowerCase()),M=u.toLocaleString("en-US",{timeZone:p}),K=new Date(M),Z=new Date(K);Z.setHours(C,$,0,0);let Q=(N-Z.getDay()+7)%7;Q===0&&Z<=K&&(Q=7),Z.setDate(Z.getDate()+Q);const ee=new Date(Z.toLocaleString("en-US",{timeZone:"UTC"})),ne=new Date(Z.toLocaleString("en-US",{timeZone:p})),de=ee.getTime()-ne.getTime();y=new Date(Z.getTime()+de)}else if(t.schedule_type==="once"){const[T,D]=t.schedule_value.split(" "),[C,$,I]=T.split("-").map(Number),[N,M]=(D||"00:00").split(":").map(Number),K=u.toLocaleString("en-US",{timeZone:p}),Z=new Date(K),Q=new Date(Z);Q.setFullYear(C,$-1,I),Q.setHours(N,M,0,0);const ee=new Date(Q.toLocaleString("en-US",{timeZone:"UTC"})),ne=new Date(Q.toLocaleString("en-US",{timeZone:p})),de=ee.getTime()-ne.getTime();y=new Date(Q.getTime()+de);const Ie=new Date(u.getTime()+120*1e3);if(y.getTime()<u.getTime()+60*1e3){const mt=y.toISOString();y=Ie;const pt=` [Note: The requested time ${t.schedule_value} in ${p} resolved to ${mt} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${y.toISOString()}.]`;t._pastTimeWarning=pt}}else y=new Date(u.getTime()+3600*1e3);if(await r.prepare("SELECT id FROM cron_jobs WHERE user_id = ? AND name = ? AND schedule_type = ? AND schedule_value = ? AND state != 'completed' LIMIT 1").bind(n,t.name,t.schedule_type,t.schedule_value).first()){const T=y.toLocaleString("en-US",{timeZone:p,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule already exists: "${t.name}" is already set for ${T} (${p}). No duplicate created.`}await r.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(n,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),y.toISOString()).run();const w=t._pastTimeWarning||"",S=y.toLocaleString("en-US",{timeZone:p,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${t.name}" — ${t.schedule_type}. Will fire at ${S} (${p}). [UTC: ${y.toISOString()}]${w}. IMPORTANT: Use the exact time "${S}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const y=(await r.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(n).all()).results||[];return y.length===0?"No scheduled tasks found.":y.map(p=>`[ID:${p.id}] ${p.enabled?"▶":"⏸"} "${p.name}" — [${p.schedule_type}] ${p.schedule_value} — ${p.action_type} — state: ${p.state||"active"} — next: ${p.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const u=t.enabled?1:0,y=u?"active":"paused";return await r.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,y,t.job_id,n).run(),`Schedule ${t.job_id} ${u?"enabled (active)":"paused"}.`}case"update_schedule_state":{const u=["created","active","reminding","paused","completed"],y=t.state;if(!u.includes(y))return`Invalid state "${y}". Valid states: ${u.join(", ")}`;const p=y==="completed"||y==="paused"?0:1;return await r.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(y,p,t.job_id,n).run(),`Schedule ${t.job_id} state updated to "${y}".`}case"update_schedule":{const u=t.job_id,y=d||"UTC",p=new Date,g=["updated_at = CURRENT_TIMESTAMP"],w=[];t.name&&(g.push("name = ?"),w.push(t.name)),t.description&&(g.push("description = ?"),w.push(t.description));let S=null,T=t.schedule_type,D=t.schedule_value;if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){S=new Date(p.getTime()+t.minutes_from_now*60*1e3);const I=S.toLocaleString("en-US",{timeZone:y,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[N,M,K]=(I[0]||"").split("/");D=`${K}-${N}-${M} ${I[1]||"00:00"}`,T="once"}else if(T&&D){if(T==="interval")S=new Date(p.getTime()+parseInt(D,10)*60*1e3);else if(T==="daily"){const[$,I]=D.split(":").map(Number),N=new Date(p.toLocaleString("en-US",{timeZone:y})),M=new Date(N);M.setHours($,I,0,0),M<=N&&M.setDate(M.getDate()+1);const K=new Date(M.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(M.toLocaleString("en-US",{timeZone:y})).getTime();S=new Date(M.getTime()+K)}else if(T==="weekly"){const[$,I]=D.split(" "),[N,M]=(I||"00:00").split(":").map(Number),Z=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Ie=>Ie.toLowerCase()===$.toLowerCase()),Q=new Date(p.toLocaleString("en-US",{timeZone:y})),ee=new Date(Q);ee.setHours(N,M,0,0);let ne=(Z-ee.getDay()+7)%7;ne===0&&ee<=Q&&(ne=7),ee.setDate(ee.getDate()+ne);const de=new Date(ee.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(ee.toLocaleString("en-US",{timeZone:y})).getTime();S=new Date(ee.getTime()+de)}else if(T==="once"){const[$,I]=D.split(" "),[N,M,K]=$.split("-").map(Number),[Z,Q]=(I||"00:00").split(":").map(Number),ee=new Date(p.toLocaleString("en-US",{timeZone:y})),ne=new Date(ee);ne.setFullYear(N,M-1,K),ne.setHours(Z,Q,0,0);const de=new Date(ne.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(ne.toLocaleString("en-US",{timeZone:y})).getTime();S=new Date(ne.getTime()+de),S.getTime()<p.getTime()+60*1e3&&(S=new Date(p.getTime()+120*1e3))}}if(T&&(g.push("schedule_type = ?"),w.push(T)),D&&(g.push("schedule_value = ?"),w.push(D)),S&&(g.push("next_run = ?"),w.push(S.toISOString())),g.length===1)return"No changes provided. Specify name, description, or schedule fields to update.";w.push(u,n),await r.prepare(`UPDATE cron_jobs SET ${g.join(", ")} WHERE id = ? AND user_id = ?`).bind(...w).run();const C=S?S.toLocaleString("en-US",{timeZone:y,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):null;return`Schedule ${u} updated.${C?` New fire time: ${C} (${y}).`:""} IMPORTANT: Use this exact time "${C}" when confirming to the user.`}case"delete_schedule":return await r.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,n).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const u=t.importance||5,y=t.type==="task"?"preference":t.type,p=u>=7?"working":"long_term";return await h.store(n,y,t.title,t.content,u,p),`Stored in ${p==="working"?"working":"long-term"} memory: [${y}] ${t.title} (importance: ${u})`}case"search_memory":{const u=await h.search(n,t.query);return u.length===0?"No matching memories found.":u.map(y=>`[id:${y.id}] [${y.tier||"long_term"}] [${y.type}] **${y.title}**: ${y.content}`).join(`
`)}case"delete_memory":return await h.remove(t.id,n),`Memory entry ${t.id} deleted.`;case"update_memory":return await h.update(t.id,n,t.content),`Memory entry ${t.id} updated.`;case"get_system_status":{const u=await r.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(n).first(),y=await r.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(n).first(),p=await r.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(n).first(),g=await r.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(n).first(),w=await r.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(n).first();return`System Status:
- Active schedules: ${(u==null?void 0:u.cnt)||0}
- Memory: ${(p==null?void 0:p.cnt)||0} working / ${(y==null?void 0:y.cnt)||0} total
- Total messages: ${(g==null?void 0:g.cnt)||0}
- Unread errors: ${(w==null?void 0:w.cnt)||0}`}case"read_sheet":{if(!a)return"Authentication context unavailable.";try{const u=new ce(r,n,a,s||"",i||""),y=t.spreadsheet_id;let p=t.range;const g=await u.sheets.getMetadata(y),w=g.sheets;p.includes("!")||(p=`${w[0]}!${p}`);let S;try{S=await u.sheets.readRange(y,p)}catch(D){if((b=D.message)!=null&&b.includes("Unable to parse range")||(f=D.message)!=null&&f.includes("400")){const C=p.includes("!")?p.split("!")[1]:p;p=`${w[0]}!${C}`,S=await u.sheets.readRange(y,p)}else throw D}let T=`[Spreadsheet: "${g.title}" | Reading tab: "${p.split("!")[0]}" | All tabs in this spreadsheet: ${w.map(D=>`"${D}"`).join(", ")}]
`;return w.length>1&&(T+=`[To read a different tab, call read_sheet again with range like "${w[1]}!A1:Z500"]
`),S.length===0?T+"No data found in the specified range.":T+S.map(D=>D.join("	| ")).join(`
`)}catch(u){return await U(r,n,"google","read_sheet",u.message),`Failed to read sheet: ${u.message}`}}case"write_sheet":{if(!a)return"Authentication context unavailable.";try{const u=new ce(r,n,a,s||"",i||"");if(!(await u.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{const I=new Y(r),N=JSON.stringify(t.values);await I.store(n,"context",`Pending sheet write: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"write_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:N.length>15e3?"[[truncated — re-provide values on retry]]":t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The sheet write has been saved to temporary memory. After reconnecting, tell me "write the pending sheet data" to complete this.`:"")}const p=t.values;let g=t.range;const T=Math.max(...p.map(I=>I.length))+4,D=p.map(I=>{const N=[...I];for(;N.length<T;)N.push("");return N}),C=g.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(C){const I=C[1]||"",N=C[2],M=C[3],K=C[5],Q=N.toUpperCase().charCodeAt(0)-64+T-1,ee=Q<=26?String.fromCharCode(64+Q):"Z";g=`${I}${N}${M}:${ee}${K}`}const $=await u.sheets.writeRange(t.spreadsheet_id,g,D);try{const I=new Y(r),N=await I.search(n,`Pending sheet write: ${t.spreadsheet_id}`);for(const M of N)M.title.startsWith(`Pending sheet write: ${t.spreadsheet_id}`)&&await I.remove(M.id,n)}catch{}return`Written ${$.updatedCells} cells to ${g}.`}catch(u){return await U(r,n,"google","write_sheet",u.message),`Failed to write sheet: ${u.message}`}}case"append_sheet":{if(!a)return"Authentication context unavailable.";try{const u=new ce(r,n,a,s||"",i||"");if(!(await u.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{await new Y(r).store(n,"context",`Pending sheet append: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"append_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The append data has been saved to temporary memory. After reconnecting, tell me "append the pending sheet data" to complete this.`:"")}const p=await u.sheets.appendRows(t.spreadsheet_id,t.range,t.values);try{const g=new Y(r),w=await g.search(n,`Pending sheet append: ${t.spreadsheet_id}`);for(const S of w)S.title.startsWith(`Pending sheet append: ${t.spreadsheet_id}`)&&await g.remove(S.id,n)}catch{}return`Appended ${p.updatedCells} cells to ${t.range}.`}catch(u){return await U(r,n,"google","append_sheet",u.message),`Failed to append to sheet: ${u.message}`}}case"create_sheet":{if(!a)return"Authentication context unavailable.";try{const u=new ce(r,n,a,s||"",i||"");if(!(await u.isConnected()).connected){if(t.title)try{await new Y(r).store(n,"context",`Pending spreadsheet create: "${t.title}"`,JSON.stringify({tool:"create_sheet",title:t.title,sheet_names:t.sheet_names??null,folder_name:t.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title?`

The spreadsheet request has been saved to temporary memory. After reconnecting, tell me "create the pending spreadsheet" and I'll complete this automatically.`:"")}const p=await u.sheets.createSpreadsheet(t.title,t.sheet_names);let g="";if(t.folder_name)try{const{token:w}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(r,n,a,s||"",i||"");g=`
Folder: "${(await Jt(w,p.spreadsheetId,t.folder_name)).folderName}"`}catch(w){g=`
(Note: spreadsheet saved to Drive root — could not place in folder "${t.folder_name}": ${w.message})`}try{await new Y(r).store(n,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${p.spreadsheetId} | URL: ${p.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${g}
ID: ${p.spreadsheetId}
URL: ${p.url}`}catch(u){return await U(r,n,"google","create_sheet",u.message),`Failed to create spreadsheet: ${u.message}`}}case"list_calendar_events":{if(!a)return"Authentication context unavailable.";try{const u=new ce(r,n,a,s||"",i||""),y=t.calendar_id||"primary",p=t.days_ahead||7,g=new Date,w=new Date(g.getTime()+p*24*60*60*1e3),S=await u.calendar.listEvents(y,{timeMin:g.toISOString(),timeMax:w.toISOString(),query:t.query});return S.length===0?`No events found in the next ${p} days.`:S.map(T=>{var N;const D=T.start.dateTime||T.start.date||"TBD",C=T.end.dateTime||T.end.date||"",$=T.location?` 📍 ${T.location}`:"",I=((N=T.attendees)==null?void 0:N.map(M=>M.email).join(", "))||"";return`• ${T.summary} — ${D} to ${C}${$}${I?`
  Attendees: ${I}`:""}`}).join(`
`)}catch(u){return await U(r,n,"google","list_calendar",u.message),`Failed to list events: ${u.message}`}}case"create_calendar_event":{if(!a)return"Authentication context unavailable.";try{const u=new ce(r,n,a,s||"",i||"");if(!(await u.isConnected()).connected){if(t.summary&&t.start_datetime&&t.end_datetime)try{await new Y(r).store(n,"context",`Pending calendar event: "${t.summary}"`,JSON.stringify({tool:"create_calendar_event",summary:t.summary,description:t.description??null,location:t.location??null,start_datetime:t.start_datetime,end_datetime:t.end_datetime,attendees:t.attendees??null,calendar_id:t.calendar_id??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.summary&&t.start_datetime?`

The calendar event has been saved to temporary memory. After reconnecting, tell me "create the pending event" and I'll add it to your calendar.`:"")}const p=t.calendar_id||"primary",g=await u.calendar.createEvent(p,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});try{const w=new Y(r),S=await w.search(n,`Pending calendar event: "${t.summary}"`);for(const T of S)T.title.startsWith(`Pending calendar event: "${t.summary}"`)&&await w.remove(T.id,n)}catch{}return`Event created: "${g.summary}"
ID: ${g.id}
Start: ${g.start.dateTime||g.start.date}`}catch(u){return await U(r,n,"google","create_event",u.message),`Failed to create event: ${u.message}`}}case"create_doc":{if(!a)return"Authentication context unavailable.";const u=new ce(r,n,a,s||"",i||"");if(!(await u.isConnected()).connected){if(t.title&&t.content){try{await new Y(r).store(n,"context",`Pending Google Doc save: "${t.title}"`,JSON.stringify({tool:"create_doc",title:t.title,content:t.content,folder_name:t.folder_name??null}),9,"working")}catch{}try{await r.prepare(`INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
               VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`).bind(n,`Pending doc: "${t.title}"`,'Google not connected — reconnect then say "save the pending document".',`pending_doc_${t.title}`,JSON.stringify({tool:"create_doc",title:t.title,folder_name:t.folder_name??null})).run()}catch{}}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" and I'll complete this automatically.`:"")}let p;try{p=await u.docs.createDocument(t.title)}catch(w){return await U(r,n,"google","create_doc",w.message),`Failed to create document: ${w.message}`}if(t.content)try{await u.docs.appendFormattedContent(p.documentId,t.content)}catch(w){return await U(r,n,"google","create_doc_append",w.message),`Document created but content could not be written (${w.message}).
ID: ${p.documentId}
URL: ${p.url}

Use append_to_doc with the document ID above to add content.`}let g="";if(t.folder_name)try{const{token:w}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(r,n,a,s||"",i||"");g=`
Folder: "${(await Jt(w,p.documentId,t.folder_name)).folderName}"`}catch(w){g=`
(Note: document saved to Drive root — could not place in folder "${t.folder_name}": ${w.message})`}try{await new Y(r).store(n,"context",`Document: ${t.title}`,`Document ID: ${p.documentId} | URL: ${p.url}`,6,"working")}catch{}try{const w=new Y(r),S=await w.search(n,`Pending Google Doc save: "${t.title}"`);for(const T of S)T.title.startsWith(`Pending Google Doc save: "${t.title}"`)&&await w.remove(T.id,n)}catch{}return`Document created: "${t.title}"${g}
ID: ${p.documentId}
URL: ${p.url}`}case"read_doc":{if(!a)return"Authentication context unavailable.";try{const y=await new ce(r,n,a,s||"",i||"").docs.readDocument(t.document_id);return`Document: "${y.title}"

${y.content}`}catch(u){return await U(r,n,"google","read_doc",u.message),`Failed to read document: ${u.message}`}}case"append_to_doc":{if(!a)return"Authentication context unavailable.";try{const u=new ce(r,n,a,s||"",i||"");if(!(await u.isConnected()).connected){if(t.document_id&&t.content)try{await new Y(r).store(n,"context",`Pending append to doc: "${t.document_id}"`,JSON.stringify({tool:"append_to_doc",document_id:t.document_id,content:t.content}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.'+(t.document_id&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" to complete this.`:"")}await u.docs.appendFormattedContent(t.document_id,t.content);let p=t.document_id;try{p=(await u.docs.readDocument(t.document_id)).title}catch{}try{const g=new Y(r),w=await g.search(n,`Pending append to doc: "${t.document_id}"`);for(const S of w)S.title.startsWith(`Pending append to doc: "${t.document_id}"`)&&await g.remove(S.id,n)}catch{}return`Content appended to "${p}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(u){return await U(r,n,"google","append_to_doc",u.message),`Failed to append to document: ${u.message}`}}case"rewrite_doc":{if(!a)return"Authentication context unavailable.";try{const u=new ce(r,n,a,s||"",i||"");if(!(await u.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";await u.docs.rewriteDocument(t.document_id,t.content);let p=t.document_id;try{p=(await u.docs.readDocument(t.document_id)).title}catch{}return`Document "${p}" reformatted successfully.
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(u){return await U(r,n,"google","rewrite_doc",u.message),`Failed to rewrite document: ${u.message}`}}case"delete_sheet_row":{if(!a)return"Authentication context unavailable.";try{const u=new ce(r,n,a,s||"",i||"");if(!(await u.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const p=t.row_number;return p<2?"Row 1 is the header row and cannot be deleted. Specify row 2 or higher.":(await u.sheets.deleteRow(t.spreadsheet_id,t.sheet_name,p),`Row ${p} deleted from "${t.sheet_name}". All rows below have shifted up.`)}catch(u){return await U(r,n,"google","delete_sheet_row",u.message),`Failed to delete row: ${u.message}`}}case"delete_doc_content":{if(!a)return"Authentication context unavailable.";try{const u=new ce(r,n,a,s||"",i||"");if(!(await u.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const p=await u.docs.deleteContent(t.document_id,t.text_to_remove);return p.occurrencesRemoved===0?"No matching text found in the document. The text must match exactly — check spacing, punctuation, and line breaks.":`Removed ${p.occurrencesRemoved} occurrence${p.occurrencesRemoved===1?"":"s"} from the document.`}catch(u){return await U(r,n,"google","delete_doc_content",u.message),`Failed to delete document content: ${u.message}`}}case"gmail_list":{if(!a)return"Authentication context unavailable.";try{const y=await new we(r,n,a,s||"",i||"").listMessages({maxResults:t.max_results||10,query:t.query});return y.length===0?"No messages found.":y.map((p,g)=>`${p.isUnread?"● ":"  "}${g+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(u){return await U(r,n,"gmail","list",u.message),(_=u.message)!=null&&_.includes("not connected")?u.message:`Gmail list error: ${u.message}`}}case"gmail_read":{if(!a)return"Authentication context unavailable.";try{const u=new we(r,n,a,s||"",i||""),y=await u.getMessage(t.message_id);if(!y)return"Message not found.";const p=await u.getMessageBody(t.message_id);return`**${y.subject}**
From: ${y.from}
To: ${y.to}
Date: ${y.date}

${p}`}catch(u){return await U(r,n,"gmail","read",u.message),`Gmail read error: ${u.message}`}}case"gmail_search":{if(!a)return"Authentication context unavailable.";try{const y=await new we(r,n,a,s||"",i||"").search(t.query,t.max_results||10);return y.length===0?`No results for: ${t.query}`:y.map((p,g)=>`${p.isUnread?"● ":"  "}${g+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(u){return await U(r,n,"gmail","search",u.message),`Gmail search error: ${u.message}`}}case"gmail_send":{if(!a)return"Authentication context unavailable.";try{const u=new we(r,n,a,s||"",i||"");if(!(await new ce(r,n,a,s||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body){try{await new Y(r).store(n,"context",`Pending email: "${t.subject}"`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}try{await r.prepare(`INSERT OR IGNORE INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload)
                 VALUES (?, 'pending_google', ?, ?, 'high', 'agent', ?, ?)`).bind(n,`Pending email: "${t.subject}"`,`To: ${t.to} — reconnect Google then say "send the pending email".`,`pending_email_${t.subject}`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject})).run()}catch{}}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your email has been saved to temporary memory. After reconnecting, tell me "send the pending email" and I'll send it automatically.`:"")}const g=await u.send(t.to,t.subject,t.body,{cc:t.cc});try{const w=new Y(r),S=await w.search(n,`Pending email: "${t.subject}"`);for(const T of S)T.title.startsWith(`Pending email: "${t.subject}"`)&&await w.remove(T.id,n)}catch{}return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${g.id}]`}catch(u){return await U(r,n,"gmail","send",u.message),`Gmail send error: ${u.message}`}}case"gmail_draft":{if(!a)return"Authentication context unavailable.";try{const u=new we(r,n,a,s||"",i||"");if(!(await new ce(r,n,a,s||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body)try{await new Y(r).store(n,"context",`Pending draft: "${t.subject}"`,JSON.stringify({tool:"gmail_draft",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your draft has been saved to temporary memory. After reconnecting, tell me "create the pending draft" and I'll save it to Gmail.`:"")}const g=await u.createDraft(t.to,t.subject,t.body,{cc:t.cc});try{const S=new Y(r),T=await S.search(n,`Pending draft: "${t.subject}"`);for(const D of T)D.title.startsWith(`Pending draft: "${t.subject}"`)&&await S.remove(D.id,n)}catch{}const w=t.cc?`, CC: ${t.cc}`:"";return`Draft created. To: ${t.to}${w}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${g.id}]`}catch(u){return await U(r,n,"gmail","draft",u.message),`Gmail draft error: ${u.message}`}}case"gmail_modify":{if(!a)return"Authentication context unavailable.";try{return await new we(r,n,a,s||"",i||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(u){return await U(r,n,"gmail","modify",u.message),`Gmail modify error: ${u.message}`}}case"gmail_unread_count":{if(!a)return"Authentication context unavailable.";try{const y=await new we(r,n,a,s||"",i||"").getUnreadCount();return`You have ${y} unread email${y!==1?"s":""} in Gmail.`}catch(u){return(v=u.message)!=null&&v.includes("not connected")?u.message:`Gmail error: ${u.message}`}}case"drive_list":{if(!a)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(r,n,a,s||"",i||""),y=new URLSearchParams;y.set("pageSize",String(t.max_results||10)),y.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),y.set("orderBy","modifiedTime desc");let p="";t.folder_id?p=`'${t.folder_id}' in parents and trashed = false`:t.query?p=`${t.query} and trashed = false`:p="trashed = false",y.set("q",p);const g=await fetch(`https://www.googleapis.com/drive/v3/files?${y}`,{headers:{Authorization:`Bearer ${u}`}});if(!g.ok)throw new Error(`Drive API error (${g.status})`);const w=await g.json();return(x=w.files)!=null&&x.length?w.files.map((S,T)=>{var I,N;const D=((I=S.mimeType)==null?void 0:I.split(".").pop())||S.mimeType,C=S.size?`${(parseInt(S.size)/1024).toFixed(1)} KB`:"",$=((N=S.modifiedTime)==null?void 0:N.split("T")[0])||"";return`${T+1}. **${S.name}** (${D})
   ${C} · Modified: ${$}
   ${S.webViewLink||""}`}).join(`

`):"No files found."}catch(u){return await U(r,n,"google","drive_list",u.message),`Drive list error: ${u.message}`}}case"drive_search":{if(!a)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(r,n,a,s||"",i||""),y=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,p=new URLSearchParams;p.set("q",y),p.set("pageSize",String(t.max_results||10)),p.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),p.set("orderBy","modifiedTime desc");const g=await fetch(`https://www.googleapis.com/drive/v3/files?${p}`,{headers:{Authorization:`Bearer ${u}`}});if(!g.ok)throw new Error(`Drive API error (${g.status})`);const w=await g.json();return(E=w.files)!=null&&E.length?w.files.map((S,T)=>{var $,I;const D=(($=S.mimeType)==null?void 0:$.split(".").pop())||S.mimeType,C=((I=S.modifiedTime)==null?void 0:I.split("T")[0])||"";return`${T+1}. **${S.name}** (${D}) — Modified: ${C}
   ${S.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(u){return await U(r,n,"google","drive_search",u.message),`Drive search error: ${u.message}`}}case"drive_read_file":{if(!a)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(r,n,a,s||"",i||""),y=t.url_or_id.trim();let p=y;const g=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/\/presentation\/d\/([a-zA-Z0-9_-]+)/,/\/forms\/d\/([a-zA-Z0-9_-]+)/,/[?&]id=([a-zA-Z0-9_-]+)/,/\/d\/([a-zA-Z0-9_-]+)/];for(const K of g){const Z=y.match(K);if(Z){p=Z[1];break}}const w=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?fields=id,name,mimeType,size`,{headers:{Authorization:`Bearer ${u}`}});if(!w.ok)throw new Error(`Drive API error (${w.status}): could not fetch file metadata`);const S=await w.json(),{name:T,mimeType:D}=S,C=t.extract_focus,$=C?`Focus specifically on extracting: ${C}`:"Extract and return all readable text content. Preserve structure where relevant.",I={"application/vnd.google-apps.document":"text/plain","application/vnd.google-apps.spreadsheet":"text/csv","application/vnd.google-apps.presentation":"text/plain"};if(I[D]){const K=I[D],Z=await fetch(`https://www.googleapis.com/drive/v3/files/${p}/export?mimeType=${encodeURIComponent(K)}`,{headers:{Authorization:`Bearer ${u}`}});if(!Z.ok)throw new Error(`Drive export error (${Z.status})`);const Q=await Z.text();if(D==="application/vnd.google-apps.spreadsheet"){const ee=hs(Q),ne=ee.length,de=((O=ee[0])==null?void 0:O.length)??0;return`**${T}** (Google Sheet — ${ne} rows × ${de} columns)

Parsed rows (JSON, ready for write_sheet/append_sheet):
${JSON.stringify(ee)}`}return`**${T}**

${Q.substring(0,2e4)}`}if(D==="application/pdf"||T.toLowerCase().endsWith(".pdf")){const K=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?alt=media`,{headers:{Authorization:`Bearer ${u}`}});if(!K.ok)throw new Error(`Drive download error (${K.status})`);const Z=await K.arrayBuffer(),Q=Buffer.from(Z).toString("base64");let ee=null,ne="claude-haiku-4-5-20251001";for(const pt of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const cr=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,pt).first();if(cr&&a){const Xn=await J(cr.encrypted_value,a),Rt=JSON.parse(Xn);if(Rt.provider==="anthropic"){ee=Rt.apiKey,Rt.model&&(ne=Rt.model);break}}}catch{}if(!ee)return`"${T}" is a PDF. An Anthropic API key is required to extract PDF content. Please configure one in Settings → Keys.`;const de=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ee,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:ne,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:Q}},{type:"text",text:$}]}]})});if(!de.ok){const pt=await de.text();throw new Error(`Anthropic PDF extraction error: ${pt.substring(0,200)}`)}const mt=((B=(A=(await de.json()).content)==null?void 0:A[0])==null?void 0:B.text)||"";return`**${T}** (PDF from Drive)

${mt}`}const N=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?alt=media`,{headers:{Authorization:`Bearer ${u}`}});if(!N.ok)throw new Error(`Drive download error (${N.status})`);const M=await N.text();return`**${T}** (${D})

${M.substring(0,2e4)}`}catch(u){return await U(r,n,"google","drive_read_file",u.message),`Drive read error: ${u.message}`}}case"drive_delete_file":{if(!a)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(r,n,a,s||"",i||""),y=t.url_or_id.trim();let p=y;const g=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const D of g){const C=y.match(D);if(C){p=C[1];break}}const w=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?fields=name`,{headers:{Authorization:`Bearer ${u}`}});if(!w.ok)throw new Error(`Drive API error (${w.status})`);const S=await w.json(),T=await fetch(`https://www.googleapis.com/drive/v3/files/${p}`,{method:"PATCH",headers:{Authorization:`Bearer ${u}`,"Content-Type":"application/json"},body:JSON.stringify({trashed:!0})});if(!T.ok)throw new Error(`Drive API error (${T.status})`);return`"${S.name}" moved to trash. You can restore it from Drive trash within 30 days.`}catch(u){return await U(r,n,"google","drive_delete_file",u.message),`Drive delete error: ${u.message}`}}case"drive_organise":{if(!a)return"Authentication context unavailable.";if(!t.folder_name&&!t.new_name)return"Please provide at least a folder_name to move to or a new_name to rename.";try{const{token:u}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(r,n,a,s||"",i||""),y=t.url_or_id.trim();let p=y;const g=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const S of g){const T=y.match(S);if(T){p=T[1];break}}const w=[];if(t.new_name){const S=await fetch(`https://www.googleapis.com/drive/v3/files/${p}`,{method:"PATCH",headers:{Authorization:`Bearer ${u}`,"Content-Type":"application/json"},body:JSON.stringify({name:t.new_name})});if(!S.ok)throw new Error(`Drive rename error (${S.status})`);w.push(`Renamed to "${t.new_name}"`)}if(t.folder_name){const{folderName:S}=await Jt(u,p,t.folder_name);w.push(`Moved to folder "${S}"`)}return w.join(". ")+"."}catch(u){return await U(r,n,"google","drive_organise",u.message),`Drive organise error: ${u.message}`}}case"web_search":try{const u=await Ut(t.query,{num:t.num_results||5,site:t.site});return u.error?`Web search failed: ${u.error}. Answer this question directly from your training knowledge and clearly state you are doing so.`:u.results.length===0?`Web search returned no results for "${t.query}". Answer this question directly from your training knowledge and clearly state you are doing so instead of searching.`:u.results.map((y,p)=>`${p+1}. [${y.title}](${y.link})
   ${y.snippet}`).join(`

`)}catch(u){return await U(r,n,"search","web_search",u.message),`Web search error: ${u.message}`}case"read_url":try{const u=t.url;if(!u||!u.startsWith("http://")&&!u.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const y=Math.min(t.max_length||8e3,15e3),{fetchPageContent:p}=await Promise.resolve().then(()=>os),g=await p(u,y);return g.error?`Failed to read page: ${g.error}`:!g.text||g.text.length<20?`Page at ${u} returned no readable content.`:`Content from ${u} (${g.text.length} chars):

${g.text}`}catch(u){return await U(r,n,"search","read_url",u.message),`Read URL error: ${u.message}`}case"research":{if(!c)return"Research tool requires an LLM provider but none is available.";try{let u;try{const T=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,"perplexity_api_key").first();T&&a&&(u=await J(T.encrypted_value,a))}catch{}const y=2e4,p=Sn(t.query,c,{depth:t.depth||"quick",site:t.site,perplexityApiKey:u}),g=new Promise(T=>setTimeout(()=>T(null),y)),w=await Promise.race([p,g]);if(w===null){const{webSearch:T}=await Promise.resolve().then(()=>Qa),D=await T(t.query,{num:5});if(D.error||D.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let C=`Research took too long, but here are the top search results:

`;return C+=D.results.map(($,I)=>`${I+1}. [${$.title}](${$.link})
   ${$.snippet}`).join(`

`),C}if(w.error)return`Research failed: ${w.error}`;let S=w.report;w.sources.length>0&&(S+=`

---
**Sources** (`+w.pagesRead+` pages read):
`,S+=w.sources.map((T,D)=>`[${D+1}] [${T.title}](${T.url})`).join(`
`));try{const T=new Y(r),D=w.report.substring(0,600);await T.store(n,"context",`Research: ${t.query.substring(0,80)}`,D,6,"long_term")}catch{}return S}catch(u){return await U(r,n,"research","research",u.message),`Research error: ${u.message}`}}case"browser_task":{if(!a)return"Authentication context unavailable.";try{const u=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,"browser_use_api_key").first();if(!u)return"Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key (get one at cloud.browser-use.com).";const y=(await J(u.encrypted_value,a)).trim();let p,g=t.task,w,S;if(t.site_name)try{const I=await r.prepare("SELECT id, encrypted_blob FROM site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE").bind(n,t.site_name).first();if(I){const N=JSON.parse(await J(I.encrypted_blob,a));p={username:N.username,password:N.password},S=N.sessionId,w=I.id,g=`${g}

When prompted to log in, use username {username} and password {password}.`}}catch{}const T=await Dn(g,y,{secrets:p,sessionId:S}),D=async I=>{if(w)try{const N=await r.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(w,n).first();if(!N)return;const M=JSON.parse(await J(N.encrypted_blob,a));M.sessionId=I;const K=await dt(JSON.stringify(M),a);await r.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(K,w,n).run()}catch{}},C=async()=>{if(!(!w||!S))try{const I=await r.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(w,n).first();if(!I)return;const N=JSON.parse(await J(I.encrypted_blob,a));delete N.sessionId;const M=await dt(JSON.stringify(N),a);await r.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(M,w,n).run()}catch{}};if(T.status==="completed")return T.sessionId&&await D(T.sessionId),T.output??"[NO-OUTPUT] Browser task completed but returned no content — do NOT invent or summarise what the site may have contained. Tell the user the browser returned nothing and suggest they try again.";if(T.status==="timeout"){T.sessionId&&await D(T.sessionId);try{await new Y(r).store(n,"context",`Browser task in progress: ${T.taskId}`,JSON.stringify({task_id:T.taskId,task:t.task}),9,"working")}catch{}return`[BROWSER_TIMEOUT:${T.taskId}] Browser task did not finish within the time limit. Tell the user it is still running and ask them to follow up in 2–3 minutes.`}await C();const $=[T.error,T.output].filter(Boolean).join(" — ");return`Browser task failed (ID: \`${T.taskId}\`): ${$||"No details returned. Check your Browser Use dashboard at cloud.browser-use.com."}`}catch(u){return await U(r,n,"browser","browser_task",u.message),`Browser task error: ${u.message}`}}case"browser_task_status":{if(!a)return"Authentication context unavailable.";try{const u=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,"browser_use_api_key").first();if(!u)return"Browser Use API key not configured.";const y=await J(u.encrypted_value,a),p=await ds(t.task_id,y);if(p.done){try{const g=new Y(r),w=await g.search(n,`Browser task in progress: ${t.task_id}`);for(const S of w)await g.remove(S.id,n)}catch{}return p.status==="finished"||p.status==="completed"?p.output?p.output:'[NO-OUTPUT] Browser task finished but returned no content. Do NOT invent or infer what emails or page data might have said. Tell the user: "The browser finished but returned no content — the site may have blocked automation or the login failed. Would you like to try again?"':`Browser task ended with status "${p.status}" and no output. Do NOT retry — report this to the user.`}return`[still-running] Browser task has not finished yet (status: ${p.status}). STOP — do not call browser_task_status again. Tell the user: "The browser is still working. Ask me 'what happened with the browser task?' in 2–3 minutes."`}catch(u){return await U(r,n,"browser","browser_task_status",u.message),`Browser status check error: ${u.message}`}}case"vault_lookup":try{const u=(t.site_name||"").trim();if(!u)return"No site name provided.";const p=((await r.prepare("SELECT name FROM site_credentials WHERE user_id = ? AND name LIKE ? COLLATE NOCASE").bind(n,`%${u}%`).all()).results||[]).map(g=>g.name);return p.length===0?`No vault entries found matching "${u}".`:`Vault entries matching "${u}": ${p.join(", ")}. Use site_name="${p[0]}" in browser_task to inject credentials automatically.`}catch{return"vault_lookup: could not query Secret Vault (table may not exist — run migrations)."}case"search_places":{if(!a)return"Authentication context unavailable.";try{const u=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,"google_api_key").first();if(!u)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const y=await J(u.encrypted_value,a),p=await fn(y,t.query,{type:t.type});return p.error?`Places search failed: ${p.error}`:p.results.length===0?`No places found for "${t.query}".`:p.results.map((g,w)=>{const S=g.rating?` ★${g.rating} (${g.userRatingsTotal||0} reviews)`:"",T=g.openNow!==void 0?g.openNow?" · Open now":" · Closed":"",D=g.googleMapsUri?`
   ${g.googleMapsUri}`:"";return`${w+1}. **${g.name}**${S}${T}
   ${g.address}${D}
   [place_id: ${g.placeId}]`}).join(`

`)}catch(u){return await U(r,n,"google_api","search_places",u.message),`Places search error: ${u.message}`}}case"get_place_details":{if(!a)return"Authentication context unavailable.";try{const u=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,a),p=await yn(y,t.place_id);if(p.error)return`Details lookup failed: ${p.error}`;if(!p.details)return"No details found.";const g=p.details;let w=`**${g.name}**
📍 ${g.address}`;if(g.phone&&(w+=`
📞 ${g.phone}`),g.website&&(w+=`
🌐 ${g.website}`),g.rating&&(w+=`
★ ${g.rating}`),g.googleMapsUri&&(w+=`
📌 ${g.googleMapsUri}`),g.openingHours&&(w+=`

Opening Hours:
${g.openingHours.join(`
`)}`),g.reviews&&g.reviews.length>0){w+=`

Recent Reviews:`;for(const S of g.reviews)w+=`
— ${S.author} (★${S.rating}, ${S.time}): "${S.text}"`}return w}catch(u){return await U(r,n,"google_api","place_details",u.message),`Place details error: ${u.message}`}}case"get_directions":{if(!a)return"Authentication context unavailable.";try{const u=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,a),p=await vn(y,t.origin,t.destination,{mode:t.mode||"driving"});if(p.error)return`Directions failed: ${p.error}`;if(!p.route)return"No route found.";const g=p.route;let w=`**${g.startAddress}** → **${g.endAddress}**
`;return w+=`📏 ${g.distance} · ⏱️ ${g.duration}`,g.durationInTraffic&&(w+=` (with traffic: ${g.durationInTraffic})`),w+=`
via ${g.summary}`,w+=`

Steps:`,g.steps.forEach((S,T)=>{w+=`
${T+1}. ${S.instruction} (${S.distance}, ${S.duration})`}),w}catch(u){return await U(r,n,"google_api","directions",u.message),`Directions error: ${u.message}`}}case"get_travel_time":{if(!a)return"Authentication context unavailable.";try{const u=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,a),p=await En(y,t.origin,t.destination,t.mode||"driving");if(p.error)return`Travel time lookup failed: ${p.error}`;let g=`${t.origin} → ${t.destination}: ${p.distance}, ${p.duration}`;return p.durationInTraffic&&(g+=` (with traffic: ${p.durationInTraffic})`),g}catch(u){return await U(r,n,"google_api","travel_time",u.message),`Travel time error: ${u.message}`}}case"translate_text":{if(!a)return"Authentication context unavailable.";try{const u=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,a),p=await wn(y,t.text,t.target_language,t.source_language);return p.error?`Translation failed: ${p.error}`:`[${p.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${p.translatedText}`}catch(u){return await U(r,n,"google_api","translate",u.message),`Translation error: ${u.message}`}}case"search_youtube":{if(!a)return"Authentication context unavailable.";try{const u=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,a),p=await _n(y,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return p.error?`YouTube search failed: ${p.error}`:p.results.length===0?`No YouTube results for "${t.query}".`:p.results.map((g,w)=>{var S;return`${w+1}. **${g.title}**
   ${g.channelTitle} · ${((S=g.publishedAt)==null?void 0:S.split("T")[0])||""}
   ${g.description}
   ${g.url}`}).join(`

`)}catch(u){return await U(r,n,"google_api","youtube_search",u.message),`YouTube search error: ${u.message}`}}case"geocode_address":{if(!a)return"Authentication context unavailable.";try{const u=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,"google_api_key").first();if(!u)return"Google API Key not configured.";const y=await J(u.encrypted_value,a),p=await bn(y,t.address);return p.error?`Geocoding failed: ${p.error}`:p.results.length===0?`Location not found: "${t.address}"`:p.results.map((g,w)=>`${w+1}. ${g.address}
   Coordinates: ${g.lat}, ${g.lng}`).join(`
`)}catch(u){return await U(r,n,"google_api","geocode",u.message),`Geocoding error: ${u.message}`}}case"parse_document":{const u=t.file_id,y=t.extract_focus;if(!u)return"file_id is required to parse a document.";const p=await r.prepare("SELECT file_name, file_type, file_data, file_size, extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(u,n).first();if(!p)return"File not found. The file may have expired or the file_id is incorrect.";if(p.extracted_text)return`Document: ${p.file_name}

${p.extracted_text}`;const{file_name:g,file_type:w}=p;let{file_data:S}=p;if(S==="r2"){if(!m)return`File "${g}" is stored in R2 but no storage bucket is configured.`;const T=await m.get(u);if(!T)return`File "${g}" not found in storage. It may have been deleted.`;const D=await T.arrayBuffer();S=Buffer.from(D).toString("base64")}if(w.startsWith("text/"))try{const T=Buffer.from(S,"base64").toString("utf-8");return`Document: ${g}

${T.substring(0,2e4)}`}catch{return`Could not decode text file: ${g}`}if(w==="application/pdf"||w==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||g.toLowerCase().endsWith(".pdf")||g.toLowerCase().endsWith(".docx")){if(w==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||g.toLowerCase().endsWith(".docx")){try{const C=await Rn(Buffer.from(S,"base64"));if(C.length>50)return`Document: ${g}

${C.substring(0,2e4)}`}catch{}return`Could not extract text from "${g}". Try uploading to Google Drive and sharing the link — Drive can open and export Word documents directly.`}let T=null,D="claude-haiku-4-5-20251001";for(const C of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const $=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n,C).first();if($&&a){const I=await J($.encrypted_value,a),N=JSON.parse(I);if(N.provider==="anthropic"){T=N.apiKey,N.model&&(D=N.model);break}}}catch{}if(T)try{const C=y?`Focus specifically on extracting: ${y}`:"Extract and return all readable text content from this document. Preserve structure where relevant.",$=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":T,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:D,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:S}},{type:"text",text:C}]}]})});if($.ok){const N=((F=(G=(await $.json()).content)==null?void 0:G[0])==null?void 0:F.text)||"";return`Document: ${g}

${N}`}else{const I=await $.text();return`Could not parse ${g} via Anthropic API: ${I.substring(0,200)}`}}catch(C){return`Document parsing error for ${g}: ${C.message}`}return"To parse PDF documents, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set."}try{const T=Buffer.from(S,"base64").toString("utf-8").substring(0,2e3);return`Document: ${g} (${w})

Content preview:
${T}`}catch{return`Cannot read file: ${g} (${w})`}}case"search_library":{const u=t.query,y=Math.min(typeof t.limit=="number"?t.limit:10,20);if(!u)return"query is required for search_library.";const p=await r.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, dl.extracted_text as dl_extracted
        FROM document_library dl
        WHERE dl.user_id = ?
          AND (dl.name LIKE ? OR dl.summary LIKE ? OR dl.extracted_text LIKE ?)
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(n,`%${u}%`,`%${u}%`,`%${u}%`,y).all(),g=await r.prepare(`
        SELECT dl.id, dl.name, dl.source, dl.summary, dl.status, dl.created_at, dl.file_id, uf.extracted_text as dl_extracted
        FROM document_library dl
        JOIN uploaded_files uf ON dl.file_id = uf.id
        WHERE dl.user_id = ? AND uf.user_id = ?
          AND uf.extracted_text LIKE ?
          AND dl.id NOT IN (SELECT id FROM document_library WHERE user_id = ? AND (name LIKE ? OR summary LIKE ? OR extracted_text LIKE ?))
        ORDER BY dl.created_at DESC
        LIMIT ?
      `).bind(n,n,`%${u}%`,n,`%${u}%`,`%${u}%`,`%${u}%`,y).all(),w=[...p.results||[],...g.results||[]].slice(0,y);if(w.length===0)return`No documents found matching "${u}" in your library.`;const S=w.map(T=>{const D=(T.summary||T.dl_extracted||"").substring(0,200);return`[id:${T.id}] "${T.name}" (source: ${T.source}, status: ${T.status})
  Preview: ${D||"(no preview yet — summarize or ask Karna to read it)"}`}).join(`

`);return`Found ${w.length} document(s) matching "${u}":

${S}

Use read_library_file with the id to get full text.`}case"read_library_file":{const u=String(t.id_or_name||"").trim();if(!u)return"id_or_name is required for read_library_file.";const y=parseInt(u,10);let p=null;if(isNaN(y)||(p=await r.prepare(`SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.id = ? AND dl.user_id = ?`).bind(y,n).first()),p||(p=await r.prepare(`SELECT dl.id, dl.name, dl.extracted_text, dl.summary, dl.file_id
           FROM document_library dl WHERE dl.user_id = ? AND dl.name LIKE ? LIMIT 1`).bind(n,`%${u}%`).first()),!p)return`Document "${u}" not found. Use search_library to find available documents.`;let g=p.extracted_text||null;if(!g&&p.file_id){const w=await r.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(p.file_id,n).first();g=(w==null?void 0:w.extracted_text)||null}return g||(g=p.summary||null),g?`Document: ${p.name}

${g.substring(0,2e4)}`:`Document "${p.name}" has no extracted text yet. Ask Karna to parse it with parse_document(file_id="${p.file_id}") to extract the text first.`}case"create_skill":{const u=(j=t.name)==null?void 0:j.trim(),y=(W=t.description)==null?void 0:W.trim(),p=(q=t.instructions)==null?void 0:q.trim();if(!u||!y||!p)return"create_skill requires name, description, and instructions.";let g=u.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"");g||(g=`skill_${Date.now()}`);const w=await r.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(n,`${g}%`).all();(R=w.results)!=null&&R.some(C=>C.slug===g)&&(g=`${g}_${(((H=w.results)==null?void 0:H.length)||0)+1}`);const S=JSON.stringify(t.parameters||{}),T=JSON.stringify(t.required_tools||[]),D=JSON.stringify(t.examples||[]);return await r.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(n,u,g,y,p,S,T,D).run(),`Skill created: **${u}** (invoke as: "${g}")

You can now ask me to run "${u}" at any time. The skill will appear in Settings → Skills. You can also say "run my ${u} skill" to execute it.`}case"list_skills":{const y=t.include_disabled===!0?"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? ORDER BY created_at DESC":"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC",g=(await r.prepare(y).bind(n).all()).results||[];if(g.length===0)return`You haven't created any custom skills yet. Ask me to create one: "Create a skill that..."`;const w=g.map(S=>`• **${S.name}** (${S.slug}): ${S.description} [used ${S.usage_count} times${S.enabled?"":" — disabled"}]`).join(`
`);return`Your custom skills (${g.length}):

${w}`}default:{const u=e,y=await r.prepare("SELECT id, name, description, instructions, required_tools FROM user_skills WHERE user_id = ? AND slug = ? AND enabled = 1").bind(n,u).first();if(y){await r.prepare("UPDATE user_skills SET usage_count = usage_count + 1, last_used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(y.id).run();const p=(()=>{try{return JSON.parse(y.required_tools).join(", ")}catch{return""}})(),g=Object.keys(t).length>0?`

Inputs provided: ${JSON.stringify(t)}`:"";return`[SKILL: ${y.name}] Follow these instructions exactly:

${y.instructions}${g}

${p?`Tools to use: ${p}`:""}

Execute the steps above using your available tools. When complete, provide a clear summary of what was done and any results.`}return`Unknown tool: ${e}`}}}async function jn(e,t,r,n,a){if(t.length>0&&t[t.length-1].role==="user"){const s="(Previous request did not complete. Please try again.)";await e.storeMessage(r,n,"assistant",s,"{}",a),t.push({id:-1,user_id:r,channel:n,role:"assistant",content:s,metadata:"{}",token_estimate:s.length,created_at:new Date().toISOString()})}}function Pn(e){for(let t=e.length-1;t>=0;t--)if(e[t].role==="assistant"){const r=typeof e[t].content=="string"?e[t].content:"";r.length<300&&/^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(r.trim())&&(e[t]={...e[t],content:"(My previous response was cut off before completing. Starting fresh.)"});break}}async function xr(e,t,r,n,a,s,i){var q,R,H,u,y;const o=new Y(t),l=(q=e.metadata)==null?void 0:q.thread_id,d=Date.now(),[c,m]=await Promise.all([o.buildContext(n.id),lr(t,n.id)]),h=await o.getRecentConversations(n.id,30,l);await jn(o,h,n.id,e.channel,l);const b=Mn(n,c,e.channel,m),f=Ln([{role:"system",content:b},...h.map(p=>({role:p.role,content:p.content})),{role:"user",content:e.text}]);Pn(f);const _=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],v=(c.match(/^- /gm)||[]).length;if(_.some(p=>p.test(e.text))||v<3)try{const p=await o.searchLongTerm(n.id,e.text,5);if(p.length>0){const g=p.map(w=>`- [${w.type}] ${w.title}: ${w.content}`).join(`
`);f.splice(f.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${g}]`})}}catch{}await o.storeMessage(n.id,e.channel,"user",e.text,"{}",l);const E=(i==null?void 0:i.maxTurns)??10,O=(i==null?void 0:i.tools)??await or(t,n.id);let A="",B=0;const G=[];for(let p=0;p<E;p++)try{p>0&&Bn(f);const g=await r.chat(f,{tools:O,toolChoice:p===0&&(i!=null&&i.forceToolUseOnFirstTurn)?"required":void 0});if(g.usage&&(B+=g.usage.promptTokens+g.usage.completionTokens),g.toolCalls&&g.toolCalls.length>0){const w=g.content||`[calling: ${g.toolCalls.map(T=>{const D=T.arguments||{},C=Object.entries(D).filter(([$])=>!["content","values","body"].includes($)).map(([$,I])=>`${$}="${String(I).substring(0,100)}"`).join(", ");return`${T.name}(${C})`}).join(", ")}]`;f.push({role:"assistant",content:w});for(const T of g.toolCalls)G.push(T.name);const S=await Promise.all(g.toolCalls.map(async T=>{try{const D=await bt(T.name,T.arguments,t,n.id,{agentType:"full",providerName:r.name,channel:e.channel},n.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,n.timezone,r,s==null?void 0:s.DOCUMENTS_BUCKET),C=["parse_document","drive_read_file","read_library_file"].includes(T.name)?2e4:8e3,$=D.length>C?D.substring(0,C)+`
[...result truncated to prevent token limit — full content was extracted]`:D;return`[Tool Result for ${T.name}]: ${$}`}catch(D){return await U(t,n.id,"tool",T.name,D.message||"Tool execution failed"),`[Tool Error for ${T.name}]: ${D.message||"Execution failed"}`}}));f.push({role:"user",content:S.join(`

`)});continue}A=g.content;break}catch(g){if(a){const w=g.message||"",S=w.includes("401")||w.includes("403")||w.includes("authentication")||w.includes("credit balance"),T=w.includes("429"),D=S?1440:T?10:5;await a.recordError(r.name,w,D)}throw await U(t,n.id,"llm","provider_error",g.message||"Unknown LLM error",{provider:r.name,turn:p}),g}if(A=(A==null?void 0:A.trim())??"",!A)try{((R=f[f.length-1])==null?void 0:R.role)==="user"&&f.push({role:"assistant",content:"[gathering results]"}),f.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),A=(await r.chat(f,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me directly and I will answer from my knowledge."}catch{A="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge."}if(a&&B>0)try{await a.recordUsage(r.name,B)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(n.id,r.name,"full",B,Date.now()-d,1,e.channel).run()}catch{}const F=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your|the)\s+(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc)\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a Google Document but create_doc was never called. You MUST call create_doc NOW.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const p of F){const g=p.claimPattern.test(A),w=p.requiredTools.some(S=>G.includes(S));if(g&&!w){try{await U(t,n.id,"llm",p.logType,"LLM claimed action without tool call",{response:A.substring(0,200)}),f.push({role:"assistant",content:A}),f.push({role:"user",content:p.enforcementMsg});const S=await r.chat(f,{tools:O.filter(T=>p.requiredTools.includes(T.name)),temperature:0});if((H=S.toolCalls)!=null&&H.length){for(const D of S.toolCalls){const C=await bt(D.name,D.arguments,t,n.id,{agentType:"full",providerName:r.name,channel:e.channel},n.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,n.timezone,r,s==null?void 0:s.DOCUMENTS_BUCKET);G.push(D.name),f.push({role:"assistant",content:"",toolCalls:S.toolCalls}),f.push({role:"user",content:C})}const T=await r.chat(f,{tools:[]});T.content&&(A=T.content)}else A="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}let j=A.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim();if(!j&&G.length>0){const p=[...new Set(G)].join(", ");try{((u=f[f.length-1])==null?void 0:u.role)==="user"&&f.push({role:"assistant",content:"[completed tools]"}),f.push({role:"user",content:"Please summarise what you just did and provide the result to the user."}),j=((y=(await r.chat(f,{tools:[]})).content)==null?void 0:y.trim())||`Done. I used the following tools: ${p}.`}catch{j=`Done. I used the following tools: ${p}.`}}const W=G.length>0?`[TOOLS_USED: ${[...new Set(G)].join(", ")}] `:"";await o.storeMessage(n.id,e.channel,"assistant",Mt(W+j),"{}",l);try{const p=await t.prepare("SELECT COUNT(*) as c FROM conversations WHERE user_id = ? AND role = ?").bind(n.id,"assistant").first();p&&p.c%5===0&&p.c>0&&await Promise.race([fs(t,r,n,o,f),new Promise(g=>setTimeout(g,5e3))])}catch{}return j}async function fs(e,t,r,n,a){var c;const s=a.filter(m=>m.role!=="system").slice(-10);if(s.length<4)return;const o=[{role:"system",content:`Review this conversation and extract any information worth remembering long-term.
Only extract genuinely durable information — things that will still be relevant in future conversations.
Good examples: addresses, phone numbers, account IDs, spreadsheet IDs, document links, explicit preferences, recurring needs, key decisions.
Bad examples: temporary topics, one-off requests, information already in the system prompt.

For each item, output a line: TYPE|TITLE|CONTENT|IMPORTANCE
Types: fact, preference, context, decision
Importance: 1-10 (8+ = standing rules, 5-7 = regular facts)
If nothing worth extracting, output: NONE`},...s,{role:"user",content:"Extract durable information from the above conversation."}],d=((c=(await t.chat(o,{tools:[]})).content)==null?void 0:c.trim())||"";if(!(!d||d==="NONE"))for(const m of d.split(`
`)){const h=m.trim().split("|");if(h.length<4)continue;const[b,f,_,v]=h,x=["fact","preference","context","decision","summary","task"].find(O=>O===b.trim().toLowerCase());if(!x||!(f!=null&&f.trim())||!(_!=null&&_.trim()))continue;const E=Math.min(10,Math.max(1,parseInt(v)||5));await n.store(r.id,x,f.trim(),_.trim(),E,"long_term")}}const Sr={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function ys(e){for(const[t,r]of Object.entries(Sr))if(e.toLowerCase().includes(t.toLowerCase()))return r;return Sr.default}function vs(e,t,r,n){const a=ys(n),s=Math.floor(a*.75),i=[];let o=0,l=!1;const d=Yt(e);i.push({role:"system",content:e}),o+=d;const c=Yt(r);o+=c;const m=s-o,h=[];let b=0;for(let f=t.length-1;f>=0;f--){const _=t[f],v=Yt(_.content);if(b+v<=m)h.unshift({role:_.role,content:_.content}),b+=v;else{l=!0;break}}return i.push(...h),i.push({role:"user",content:r}),o+=b,{maxTokens:a,usedTokens:o,messages:i,wasTruncated:l}}async function*ws(e,t,r,n,a,s){var B,G;const i=new Y(t),o=(B=e.metadata)==null?void 0:B.thread_id,l=Date.now();yield{type:"thinking",data:{threadId:o,provider:r.name}};const[d,c]=await Promise.all([i.buildContext(n.id),lr(t,n.id)]),m=await i.getRecentConversations(n.id,30,o);await jn(i,m,n.id,e.channel,o);const h=Mn(n,d,e.channel,c),b=vs(h,m,e.text,r.name);await i.storeMessage(n.id,e.channel,"user",e.text,"{}",o);const f=await or(t,n.id),_=10;let v="",x=0;const E=[...b.messages],O=[];Pn(E);for(let F=0;F<_;F++)try{F>0&&(yield{type:"thinking",data:{threadId:o}},Bn(E));const j=await r.chat(E,{tools:f});if(j.usage&&(x+=j.usage.promptTokens+j.usage.completionTokens),j.toolCalls&&j.toolCalls.length>0){j.content&&(yield{type:"chunk",data:{text:j.content,threadId:o}});const R=j.content||`[calling: ${j.toolCalls.map(u=>{const y=u.arguments||{},p=Object.entries(y).filter(([g])=>!["content","values","body"].includes(g)).map(([g,w])=>`${g}="${String(w).substring(0,100)}"`).join(", ");return`${u.name}(${p})`}).join(", ")}]`;E.push({role:"assistant",content:R});const H=[];for(const u of j.toolCalls){yield{type:"tool_start",data:{tool:u.name,toolArgs:u.arguments,threadId:o}},O.push(u.name);try{const y=(S,T)=>bt(S,T,t,n.id,{agentType:"full",providerName:r.name,channel:e.channel},n.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,n.timezone,r,s==null?void 0:s.DOCUMENTS_BUCKET);let p;if(u.name==="browser_task"||u.name==="browser_task_status"){const T=y(u.name,u.arguments);e:for(;;){const D=await Promise.race([T.then(C=>({done:!0,r:C})),new Promise(C=>setTimeout(()=>C({done:!1}),15e3))]);if(D.done){p=D.r;break e}yield{type:"thinking",data:{threadId:o}}}if(u.name==="browser_task"){const D=p.match(/^\[BROWSER_TIMEOUT:([^\]]+)\]/);if(D){yield{type:"thinking",data:{threadId:o}};const C=y("browser_task_status",{task_id:D[1]});e:for(;;){const $=await Promise.race([C.then(I=>({done:!0,r:I})),new Promise(I=>setTimeout(()=>I({done:!1}),15e3))]);if($.done){p=$.r;break e}yield{type:"thinking",data:{threadId:o}}}}}}else p=await y(u.name,u.arguments);yield{type:"tool_end",data:{tool:u.name,toolResult:p.substring(0,500)+(p.length>500?"...":""),threadId:o}};const g=["parse_document","drive_read_file","read_library_file"].includes(u.name)?2e4:8e3,w=p.length>g?p.substring(0,g)+`
[...result truncated to prevent token limit — full content was extracted]`:p;H.push(`[Tool Result for ${u.name}]: ${w}`)}catch(y){await U(t,n.id,"tool",u.name,y.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:u.name,toolResult:`Error: ${y.message||"Execution failed"}`,threadId:o}},H.push(`[Tool Error for ${u.name}]: ${y.message||"Execution failed"}`)}}E.push({role:"user",content:H.join(`

`)});continue}v=j.content;const W=Mt(v);await i.storeMessage(n.id,e.channel,"assistant",W,"{}",o);const q=50;for(let R=0;R<W.length;R+=q)yield{type:"chunk",data:{text:W.substring(R,R+q),threadId:o}},R+q<W.length&&await new Promise(u=>setTimeout(u,10));break}catch(j){if(a){const R=j.message||"",H=R.includes("401")||R.includes("403")||R.includes("authentication")||R.includes("credit balance"),u=R.includes("429"),y=H?1440:u?10:5;await a.recordError(r.name,R,y)}await U(t,n.id,"llm","provider_error",j.message||"Unknown LLM error",{provider:r.name,turn:F});const W=j.message||"An error occurred",q=W.includes("429")||W.toLowerCase().includes("rate limit")||W.toLowerCase().includes("too many requests")?"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.":W;try{await i.storeMessage(n.id,e.channel,"assistant",`⚠️ ${q}`,"{}",o)}catch{}yield{type:"error",data:{error:q,threadId:o}};return}if(v=(v==null?void 0:v.trim())??"",!v)try{E.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),v=(await r.chat(E,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me to answer directly from my knowledge.";const j=Mt(v);await i.storeMessage(n.id,e.channel,"assistant",j,"{}",o);const W=50;for(let q=0;q<j.length;q+=W)yield{type:"chunk",data:{text:j.substring(q,q+W),threadId:o}},q+W<j.length&&await new Promise(R=>setTimeout(R,10))}catch{v="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.",await i.storeMessage(n.id,e.channel,"assistant",v,"{}",o).catch(()=>{}),yield{type:"chunk",data:{text:v,threadId:o}}}if(a&&x>0)try{await a.recordUsage(r.name,x)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(n.id,r.name,"full",x,Date.now()-l,1,e.channel).run()}catch{}const A=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your\s+|the\s+)(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc)\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a Google Document but create_doc was never called. You MUST call create_doc NOW.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const F of A){const j=F.claimPattern.test(v),W=F.requiredTools.some(q=>O.includes(q));if(j&&!W){try{await U(t,n.id,"llm",F.logType,"LLM claimed action without tool call (streaming)",{response:v.substring(0,200)}),E.push({role:"assistant",content:v}),E.push({role:"user",content:F.enforcementMsg});const q=await r.chat(E,{tools:f.filter(R=>F.requiredTools.includes(R.name)),temperature:0});if((G=q.toolCalls)!=null&&G.length){for(const H of q.toolCalls){const u=await bt(H.name,H.arguments,t,n.id,{agentType:"full",providerName:r.name,channel:e.channel},n.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,n.timezone,r,s==null?void 0:s.DOCUMENTS_BUCKET);O.push(H.name),E.push({role:"assistant",content:"",toolCalls:q.toolCalls}),E.push({role:"user",content:u})}const R=await r.chat(E,{tools:[]});R.content&&(v=R.content)}else v="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}yield{type:"done",data:{threadId:o,provider:r.name,tokenCount:x}}}async function kr(e,t,r,n,a,s,i,o){await s.storeMessage(a.id,t.channel,"user",t.text,"{}",o);const l=await bt(e.tool,e.args,r,a.id,{agentType:"direct",channel:t.channel},a.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,a.timezone,n,i==null?void 0:i.DOCUMENTS_BUCKET),d=`[TOOLS_USED: ${e.tool}] ${l}`.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"");return await s.storeMessage(a.id,t.channel,"assistant",d,"{}",o),l}async function dr(e,t,r,n,a,s){var f;const i=new Y(t),o=(f=e.metadata)==null?void 0:f.thread_id,l=await i.buildContext(n.id),d=ir(e.text,l);if(d.agent==="conversation")return Un(e,t,r,n,l,a,o);const c=In(e.text);if(c)return kr(c,e,t,r,n,i,s,o);const m=(await i.getRecentConversations(n.id,10,o)).map(_=>_.content).join(`
`),h=Cn(e.text,m);if(h)return kr(h,e,t,r,n,i,s,o);const b=d.confidence>=.85;if(e.channel==="telegram"){const _=await or(t,n.id);return xr(e,t,r,n,a,s,{maxTurns:10,tools:_,forceToolUseOnFirstTurn:b})}return xr(e,t,r,n,a,s,{forceToolUseOnFirstTurn:b})}async function Un(e,t,r,n,a,s,i){const o=new Y(t),l=Date.now(),d=$n(n.timezone),c=await lr(t,n.id),m=c?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. Do not store copies in memory or contradict them.
${c}

${a}`:a,h=Nn("conversation",n,m,n.timezone,d,e.channel),b=(await o.getRecentConversations(n.id,30,i)).filter(E=>!E.content.startsWith("[Autonomous Scheduled Task]")&&!E.content.startsWith("[Scheduled Reminder]")),f=Ln([{role:"system",content:h},...b.map(E=>({role:E.role,content:E.content})),{role:"user",content:e.text}]);await o.storeMessage(n.id,e.channel,"user",e.text,"{}",i);let _=0,v="";try{const E=await r.chat(f,{temperature:.8});E.usage&&(_=E.usage.promptTokens+E.usage.completionTokens),v=E.content}catch(E){if(s){const O=E.message||"",A=O.includes("401")||O.includes("403")||O.includes("authentication")||O.includes("credit balance"),B=O.includes("429"),G=A?1440:B?10:5;await s.recordError(r.name,O,G)}throw await U(t,n.id,"llm","conversation_error",E.message,{provider:r.name}),E}if(s&&_>0)try{await s.recordUsage(r.name,_)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(n.id,r.name,"conversation",_,Date.now()-l,1,e.channel).run()}catch{}const x=Mt(v);return await o.storeMessage(n.id,e.channel,"assistant",x,"{}",i),x}async function*bs(e,t,r,n,a,s){var c;const i=new Y(t),o=(c=e.metadata)==null?void 0:c.thread_id,l=await i.buildContext(n.id),d=ir(e.text,l);if(yield{type:"thinking",data:{threadId:o,provider:r.name}},d.agent!=="conversation"){yield*ws(e,t,r,n,a,s);return}try{const m=await Un(e,t,r,n,l,a,o),h=50;for(let b=0;b<m.length;b+=h)yield{type:"chunk",data:{text:m.substring(b,b+h),threadId:o}},b+h<m.length&&await new Promise(f=>setTimeout(f,10))}catch(m){yield{type:"error",data:{error:m.message||"An error occurred",threadId:o}};return}yield{type:"done",data:{threadId:o,provider:r.name,tokenCount:0}}}const re=new he;async function _s(e,t){var a;const r=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!n)return e.json({error:"Invalid session"},401);e.set("user",{id:n.user_id,username:n.username,name:n.name,pin_hash:n.pin_hash,role:n.role,personality_prompt:n.personality_prompt,telegram_chat_id:n.telegram_chat_id,timezone:n.timezone,assistant_name:n.assistant_name||"Karna",created_at:n.created_at,updated_at:n.updated_at}),e.set("sessionId",r),await t()}re.use("/*",_s);re.get("/threads",async e=>{const t=e.get("user"),r=e.req.query("archived")==="1",n=parseInt(e.req.query("limit")||"30"),a=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(t.id,r?1:0,n).all();return e.json({threads:a.results||[]})});re.post("/threads",async e=>{const t=e.get("user"),{title:r}=await e.req.json(),n=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,r||"New conversation").first();return e.json({thread:n})});re.put("/threads/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),n=await e.req.json(),a=[],s=[];return n.title!==void 0&&(a.push("title = ?"),s.push(n.title)),n.is_archived!==void 0&&(a.push("is_archived = ?"),s.push(n.is_archived?1:0)),a.push("updated_at = CURRENT_TIMESTAMP"),s.push(r,t.id),a.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${a.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),e.json({success:!0}))});re.delete("/threads/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});re.post("/upload",async e=>{const t=e.get("user"),r=!!e.env.DOCUMENTS_BUCKET,n=r?100*1024*1024:700*1024;let a,s,i,o=null,l=null;try{if((e.req.header("Content-Type")||"").includes("multipart/form-data")){const v=(await e.req.formData()).get("file");if(!v)return e.json({error:"No file provided."},400);if(a=v.name,s=v.type||"application/octet-stream",i=v.size,i>n)return e.json({error:`File too large (max ${r?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);o=await v.arrayBuffer()}else{const _=await e.req.json();if(!_.file_name||!_.file_data)return e.json({error:"file_name and file_data are required."},400);if(a=_.file_name,s=_.file_type||"application/octet-stream",l=_.file_data,i=_.file_size||Math.round(l.length*.75),i>n)return e.json({error:`File too large (max ${r?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);if(r){const v=atob(l);o=new ArrayBuffer(v.length);const x=new Uint8Array(o);for(let E=0;E<v.length;E++)x[E]=v.charCodeAt(E)}}const c=crypto.randomUUID();let m;r&&o?(await e.env.DOCUMENTS_BUCKET.put(c,o,{httpMetadata:{contentType:s},customMetadata:{fileName:a,userId:String(t.id)}}),m="r2"):m=l||(o?Buffer.from(o).toString("base64"):""),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(c,t.id,a,s,m,i).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,c,"upload",a,s,i,"uploaded").run();const h=s==="application/pdf"||a.toLowerCase().endsWith(".pdf"),b=s==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||a.toLowerCase().endsWith(".docx");if(b)try{const{extractDocxTextFromBuffer:_}=await Promise.resolve().then(()=>On),v=l?Buffer.from(l,"base64"):o?Buffer.from(o):null;if(v){const x=await _(v);if(x.length>50){await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(x,c).run();const E=x.substring(0,600);await e.env.DB.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(E,x.substring(0,5e4),c,t.id).run()}}}catch{}if(h&&t.pin_hash){const _=l||(o?Buffer.from(o).toString("base64"):null),v=t.pin_hash,x=t.id,E=e.env.DB,O=e.env.DOCUMENTS_BUCKET,A=(async()=>{var B,G;try{let F=null,j="claude-haiku-4-5-20251001";const{decrypt:W}=await Promise.resolve().then(()=>Pt);for(const y of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const p=await E.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(x,y).first();if(p){const g=await W(p.encrypted_value,v),w=JSON.parse(g);if(w.provider==="anthropic"){F=w.apiKey,w.model&&(j=w.model);break}}}catch{}if(!F)return;let q;if(m==="r2"&&O){const y=await O.get(c);if(!y)return;q=Buffer.from(await y.arrayBuffer()).toString("base64")}else if(_)q=_;else return;const R=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":F,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:j,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:q}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!R.ok)return;const u=((G=(B=(await R.json()).content)==null?void 0:B[0])==null?void 0:G.text)||"";if(u){await E.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(u,c).run();const y=u.substring(0,600);await E.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(y,u.substring(0,5e4),c,x).run()}}catch{}})();try{e.executionCtx.waitUntil(A)}catch{}}let f="";if(s.startsWith("text/"))try{const _=l||(o?Buffer.from(o).toString("base64"):"");f=Buffer.from(_,"base64").toString("utf-8").substring(0,500)}catch{}return e.json({file_id:c,name:a,type:s,size:i,text_preview:f,storage:r?"r2":"d1",extracting:h&&!b})}catch(d){console.error("File upload error:",d);try{const{logError:c}=await Promise.resolve().then(()=>tt);await c(e.env.DB,t.id,"upload","upload_error",d.message||"Unknown upload error")}catch{}return e.json({error:`Upload failed: ${d.message||"Unknown error"}`},500)}});re.post("/send",async e=>{const t=e.get("user"),{message:r,channel:n="web",thread_id:a,files:s}=await e.req.json();if(!r||typeof r!="string"||r.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(s&&Array.isArray(s)&&s.length>0){i=`

[Attached files:
`;for(const d of s)i+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(i+=`
  Preview: ${d.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=a;if(!o){const d=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,r.trim().substring(0,60)+(r.trim().length>60?"...":"")).first();o=d==null?void 0:d.id}const l={userId:t.id,username:t.username,channel:n,text:r.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:d,rotation:c}=await ct(e.env.DB,t.id,t.pin_hash),m=await dr(l,e.env.DB,d,t,c,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});return!a&&o?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run():o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),e.json({response:m,timestamp:new Date().toISOString(),channel:l.channel,provider:d.name,thread_id:o})}catch(d){console.error("Chat error:",d);const c=d.message||"";if(c.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400);if(c.includes("All LLM providers failed"))return e.json({error:c,type:"no_provider",thread_id:o},400);if(c.includes("429")||c.includes("limit reached")||c.includes("rate limit")||c.includes("Too Many Requests"))return e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429);const m=c.includes("401")||c.includes("403")||c.includes("authentication")||c.includes("credit balance")||c.includes("invalid")&&c.includes("key");try{const{logError:h}=await Promise.resolve().then(()=>tt);await h(e.env.DB,t.id,"llm","chat_error",c)}catch{}return e.json({error:m?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:c,type:m?"no_provider":void 0,thread_id:o},m?400:500)}});function Dr(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}re.post("/stream",async e=>{const t=e.get("user"),{message:r,channel:n="web",thread_id:a,files:s}=await e.req.json();if(!r||typeof r!="string"||r.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(s&&Array.isArray(s)&&s.length>0){i=`

[Attached files:
`;for(const d of s)i+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(i+=`
  Preview: ${d.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=a;if(!o){const d=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,r.trim().substring(0,60)+(r.trim().length>60?"...":"")).first();o=d==null?void 0:d.id}const l={userId:t.id,username:t.username,channel:n,text:r.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:d,rotation:c}=await ct(e.env.DB,t.id,t.pin_hash),m=new ReadableStream({async start(h){const b=new TextEncoder;try{const f=bs(l,e.env.DB,d,t,c,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});for await(const _ of f)_.data.threadId||(_.data.threadId=o),h.enqueue(b.encode(Dr(_)));o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),h.close()}catch(f){const _={type:"error",data:{error:f.message||"An error occurred",threadId:o}};h.enqueue(b.encode(Dr(_))),h.close()}}});return new Response(m,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(o||"")}})}catch(d){console.error("Stream setup error:",d);const c=d.message||"";return c.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400):c.includes("429")||c.includes("limit reached")||c.includes("rate limit")||c.includes("Too Many Requests")?e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429):e.json({error:"Something went wrong setting up the stream.",details:c,thread_id:o},500)}});re.get("/threads/:id/messages",async e=>{var s;const t=e.get("user"),r=parseInt(e.req.param("id")),n=parseInt(e.req.query("limit")||"50"),a=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,r,n).all();return e.json({messages:(a.results||[]).reverse(),total:((s=a.results)==null?void 0:s.length)||0})});re.get("/history",async e=>{var l;const t=e.get("user"),r=parseInt(e.req.query("limit")||"50"),n=parseInt(e.req.query("offset")||"0"),a=e.req.query("thread_id");let s,i;a?(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,parseInt(a),r,n]):(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,r,n]);const o=await e.env.DB.prepare(s).bind(...i).all();return e.json({messages:(o.results||[]).reverse(),total:((l=o.results)==null?void 0:l.length)||0})});re.delete("/history",async e=>{const t=e.get("user"),r=e.req.query("thread_id");return r?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(r)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});re.get("/dashboard",async e=>{const t=e.get("user"),[r,n,a,s,i,o,l,d,c,m,h,b,f,_]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM user_skills WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM preferences WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval')").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND type='browser_task' AND status='running'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status='failed'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory_suggestions WHERE user_id = ? AND status='pending'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM document_library WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT id, name, description, next_run FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND next_run BETWEEN datetime('now', 'start of day') AND datetime('now', '+1 day', 'start of day') LIMIT 5").bind(t.id).all().catch(()=>({results:[]}))]);return e.json({threads:(r==null?void 0:r.cnt)||0,active_schedules:(n==null?void 0:n.cnt)||0,memories:(a==null?void 0:a.cnt)||0,recent_threads:s.results||[],provider_usage:[],unread_notifications:(i==null?void 0:i.cnt)||0,errors:(o==null?void 0:o.cnt)||0,skills_count:(l==null?void 0:l.cnt)||0,preferences_count:(d==null?void 0:d.cnt)||0,pending_actions:(c==null?void 0:c.cnt)||0,running_browser_tasks:(m==null?void 0:m.cnt)||0,failed_actions:(h==null?void 0:h.cnt)||0,memory_suggestions:(b==null?void 0:b.cnt)||0,documents_count:(f==null?void 0:f.cnt)||0,todays_reminders:_.results||[]})});re.get("/gmail/unread",async e=>{const t=e.get("user");try{const r=e.env.GOOGLE_CLIENT_ID,n=e.env.GOOGLE_CLIENT_SECRET;if(!r||!n)return e.json({count:null,reason:"google_not_configured"});const s=await new we(e.env.DB,t.id,t.pin_hash,r,n).getUnreadCount();return e.json({count:s})}catch(r){return e.json({count:null,reason:r.message})}});re.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));re.get("/notifications/count",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(r==null?void 0:r.cnt)||0})});re.get("/notifications",async e=>{const t=e.get("user"),r=parseInt(e.req.query("limit")||"20"),n=await e.env.DB.prepare(`SELECT n.id, n.type, n.title, n.body, n.is_read, n.source, n.action_url, n.created_at,
            j.schedule_type, j.schedule_value, j.enabled as cron_enabled
     FROM notifications n
     LEFT JOIN cron_jobs j
       ON n.user_id = j.user_id
       AND n.source LIKE 'cron:%'
       AND CAST(SUBSTR(n.source, 6) AS INTEGER) = j.id
     WHERE n.user_id = ? ORDER BY n.created_at DESC LIMIT ?`).bind(t.id,r).all();return e.json({notifications:n.results||[]})});re.put("/notifications/:id/read",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});re.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});re.delete("/notifications/all",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});re.delete("/notifications/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});re.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const X=new he;async function Es(e,t){var a;const r=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!n)return e.json({error:"Invalid session"},401);e.set("user",{id:n.user_id,username:n.username,name:n.name,pin_hash:n.pin_hash,role:n.role,personality_prompt:n.personality_prompt,telegram_chat_id:n.telegram_chat_id,timezone:n.timezone,assistant_name:n.assistant_name||"Karna",created_at:n.created_at,updated_at:n.updated_at}),await t()}X.use("/*",Es);X.get("/profile",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(r==null?void 0:r.name)||t.name,role:(r==null?void 0:r.role)||t.role,personality_prompt:(r==null?void 0:r.personality_prompt)||t.personality_prompt,telegram_chat_id:(r==null?void 0:r.telegram_chat_id)||t.telegram_chat_id,timezone:(r==null?void 0:r.timezone)||t.timezone,assistant_name:(r==null?void 0:r.assistant_name)||"Karna"})});X.put("/profile",async e=>{const t=e.get("user"),r=await e.req.json(),n=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],a=[],s=[];for(const i of n)r[i]!==void 0&&(a.push(`${i} = ?`),s.push(r[i]));return a.length===0?e.json({error:"No valid fields to update"},400):(a.push("updated_at = CURRENT_TIMESTAMP"),s.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${a.join(", ")} WHERE id = ?`).bind(...s).run(),e.json({success:!0}))});const tr=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","perplexity_api_key","browser_use_api_key"];X.get("/credentials",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT id, service, label, encrypted_value, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all(),n=["llm_slot_1","llm_slot_2","llm_slot_3"],a=await Promise.all((r.results||[]).map(async s=>{let i;if(n.includes(s.service))try{const o=await J(s.encrypted_value,t.pin_hash);i=JSON.parse(o).provider}catch{}return{id:s.id,service:s.service,label:s.label,created_at:s.created_at,updated_at:s.updated_at,configured:!0,...i?{provider_id:i}:{}}}));return e.json({credentials:a,available_services:tr,llm_providers:wt})});X.put("/credentials",async e=>{const t=e.get("user"),{service:r,value:n,label:a}=await e.req.json();if(!r||!n)return e.json({error:"Service name and value are required"},400);if(!tr.includes(r))return e.json({error:`Invalid service. Must be one of: ${tr.join(", ")}`},400);const s=await dt(n,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,r,a||r,s).run(),e.json({success:!0,service:r})});X.delete("/credentials/:service",async e=>{const t=e.get("user"),r=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,r).run(),e.json({success:!0})});X.get("/memory",async e=>{const t=e.get("user"),r=e.req.query("type"),a=await new Y(e.env.DB).getAll(t.id,r||void 0,100);return e.json({memories:a})});X.post("/memory",async e=>{const t=e.get("user"),{type:r,title:n,content:a,importance:s}=await e.req.json();return!r||!n||!a?e.json({error:"Type, title, and content are required"},400):(await new Y(e.env.DB).store(t.id,r,n,a,s||5),e.json({success:!0}))});X.delete("/memory/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await new Y(e.env.DB).remove(r,t.id),e.json({success:!0})});X.get("/preferences",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT id, content, created_at FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t.id).all();return e.json({preferences:r.results||[]})});X.post("/preferences",async e=>{const t=e.get("user"),{content:r}=await e.req.json();return r!=null&&r.trim()?(await e.env.DB.prepare("INSERT INTO preferences (user_id, content) VALUES (?, ?)").bind(t.id,r.trim()).run(),e.json({success:!0})):e.json({error:"Content required"},400)});X.put("/preferences/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),{content:n}=await e.req.json();return n!=null&&n.trim()?(await e.env.DB.prepare("UPDATE preferences SET content = ? WHERE id = ? AND user_id = ?").bind(n.trim(),r,t.id).run(),e.json({success:!0})):e.json({error:"Content required"},400)});X.delete("/preferences/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM preferences WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});X.get("/schedules",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:r.results||[]})});X.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),{enabled:n}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(n?1:0,r,t.id).run(),e.json({success:!0})});X.delete("/schedules/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});X.get("/errors",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:r.results||[]})});X.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});X.post("/credentials/validate",async e=>{const t=e.get("user"),{service:r,value:n}=await e.req.json();if(!r)return e.json({error:"Service required"},400);let a=n;if(!a){const s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,r).first();if(!s)return e.json({valid:!1,message:"No credential saved for this slot."});try{a=await J(s.encrypted_value,t.pin_hash)}catch{return e.json({valid:!1,message:"Failed to decrypt stored credential."})}}switch(r){case"anthropic":try{const s=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return s.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):s.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${s.status}.`})}catch(s){return e.json({valid:!1,message:`Connection failed: ${s.message}`})}case"openai":try{const s=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${a}`}});return s.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):s.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${s.status}.`})}catch(s){return e.json({valid:!1,message:`Connection failed: ${s.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const s=JSON.parse(a);if(!s.provider||!s.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const i=wt[s.provider];if(!i)return e.json({valid:!1,message:`Unknown provider: ${s.provider}`});if(i.apiFormat==="anthropic"){const o=await fetch(i.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":s.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return o.ok?e.json({valid:!0,message:`${i.label} API key is valid.`}):o.status===401?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${o.status}.`})}else{const o=i.apiBase+(i.validatePath||"/v1/models"),l=await fetch(o,{headers:{Authorization:`Bearer ${s.apiKey}`}});if(l.ok)return e.json({valid:!0,message:`${i.label} API key is valid.`});if(l.status===401||l.status===403)return e.json({valid:!1,message:`Invalid ${i.label} API key.`});if(l.status===404)try{const d=await fetch(i.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.apiKey}`},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return d.ok||d.status===200?e.json({valid:!0,message:`${i.label} API key is valid.`}):d.status===401||d.status===403?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${d.status}.`})}catch(d){return e.json({valid:!1,message:`${i.label} chat test failed: ${d.message}`})}return e.json({valid:!1,message:`${i.label} responded with status ${l.status}.`})}}catch(s){return s instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${s.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});case"perplexity_api_key":try{const s=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar",messages:[{role:"user",content:"test"}],max_tokens:1})});return s.ok||s.status===400?e.json({valid:!0,message:"Perplexity API key is valid."}):s.status===401?e.json({valid:!1,message:"Invalid Perplexity API key."}):e.json({valid:!1,message:`Perplexity responded with status ${s.status}.`})}catch(s){return e.json({valid:!1,message:`Connection failed: ${s.message}`})}default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});X.get("/google/status",async e=>{const t=e.get("user");try{const r=await ar(e.env.DB,t.id,t.pin_hash),n=un(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...r,oauth_client_configured:n})}catch(r){return e.json({connected:!1,error:r.message})}});X.get("/google/auth-url",async e=>{var t;e.get("user");try{const r=e.env.GOOGLE_CLIENT_ID,n=e.env.GOOGLE_CLIENT_SECRET;if(!r||!n)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const a=new URL(e.req.url),s=`${a.protocol}//${a.host}/auth/google/callback`,i=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),o=ln(r,s,i);return e.json({auth_url:o,redirect_uri:s})}catch(r){return e.json({error:`Failed to generate auth URL: ${r.message}`},500)}});X.post("/google/disconnect",async e=>{const t=e.get("user");try{return await pn(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(r){return e.json({error:r.message},500)}});X.post("/google/test",async e=>{const t=e.get("user");try{const{token:r,email:n}=await ut(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),a=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${r}`}}),s=!0,i=a.ok;return e.json({success:!0,email:n,scopes:{sheets:s,calendar:i,docs:s,drive:s},message:i?`Connected as ${n} — all services working.`:`Connected as ${n} — calendar access issue (${a.status}).`})}catch(r){return e.json({success:!1,error:r.message})}});X.get("/site-vault",async e=>{const t=e.get("user");try{const r=await e.env.DB.prepare("SELECT id, name, created_at, updated_at FROM site_credentials WHERE user_id = ? ORDER BY name ASC").bind(t.id).all();return e.json({entries:r.results||[]})}catch{return e.json({entries:[]})}});X.put("/site-vault",async e=>{const t=e.get("user");try{const{name:r,username:n,password:a,notes:s}=await e.req.json();if(!(r!=null&&r.trim())||!(n!=null&&n.trim())||!(a!=null&&a.trim()))return e.json({error:"name, username, and password are required"},400);const i=JSON.stringify({username:n.trim(),password:a,...s?{notes:s}:{}}),o=await dt(i,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO site_credentials (user_id, name, encrypted_blob)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, name) DO UPDATE SET
         encrypted_blob = excluded.encrypted_blob,
         updated_at = CURRENT_TIMESTAMP`).bind(t.id,r.trim(),o).run(),e.json({success:!0,name:r.trim()})}catch(r){return e.json({error:(r==null?void 0:r.message)||"Failed to save credential"},500)}});X.delete("/site-vault/:id",async e=>{const t=e.get("user");try{const r=Number(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM site_credentials WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})}catch(r){return e.json({error:(r==null?void 0:r.message)||"Failed to delete credential"},500)}});const Re=new he;Re.get("/debug/time",e=>{const t=new Date,r=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return e.json({utc_iso:t.toISOString(),utc_ms:t.getTime(),formatted_ist:r.format(t),toLocaleString_ist:t.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});Re.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const r=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:r,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});Re.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const r=Date.now()-t;return e.json({status:"ok",latency_ms:r})}catch(t){return e.json({status:"error",error:t.message},500)}});Re.get("/status",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const n=r.user_id,[a,s,i,o]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(n).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(n).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(n).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(n).first()]);return e.json({active_schedules:(a==null?void 0:a.cnt)||0,memory_entries:(s==null?void 0:s.cnt)||0,total_messages:(i==null?void 0:i.cnt)||0,unread_errors:(o==null?void 0:o.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});async function Ts(e,t,r,n){try{const a=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t).first();if(!a)return;const s=await J(a.encrypted_value,a.pin_hash),i=4e3,o=n.length>i?n.substring(0,i-3)+"...":n;(await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:r,text:o,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:r,text:o})})}catch{}}function Rr(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}Re.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);const n=new Date,a=n.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:a})).run()}catch{}const s=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(a).all(),i=[];for(const o of s.results||[])try{await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(a,o.id).run();const l=o.user_timezone||"UTC";let d,c=!1,m=o.state||"active";if(o.schedule_type==="interval"){const f=parseInt(o.schedule_value,10);d=new Date(n.getTime()+f*60*1e3)}else if(o.schedule_type==="daily"){const[f,_]=o.schedule_value.split(":").map(Number),v=Rr(l),x=new Date(v);x.setHours(f,_,0,0),x<=v&&x.setDate(x.getDate()+1);const E=new Date(x.toLocaleString("en-US",{timeZone:"UTC"})),O=new Date(x.toLocaleString("en-US",{timeZone:l})),A=E.getTime()-O.getTime();d=new Date(x.getTime()+A)}else if(o.schedule_type==="weekly"){const[f,_]=o.schedule_value.split(" "),[v,x]=(_||"00:00").split(":").map(Number),O=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(q=>q.toLowerCase()===f.toLowerCase()),A=Rr(l),B=new Date(A);B.setHours(v,x,0,0);let G=(O-B.getDay()+7)%7;G===0&&B<=A&&(G=7),B.setDate(B.getDate()+G);const F=new Date(B.toLocaleString("en-US",{timeZone:"UTC"})),j=new Date(B.toLocaleString("en-US",{timeZone:l})),W=F.getTime()-j.getTime();d=new Date(B.getTime()+W)}else o.schedule_type==="once"?(c=!0,m="completed",d=new Date(n.getTime()+365*24*60*60*1e3)):d=new Date(n.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(a,d.toISOString(),c?0:o.enabled,m,o.id).run();const b=(JSON.parse(o.action_config||"{}").description||o.description)&&(o.action_type==="check_mail"||o.action_type==="check_calendar"||o.action_type==="check_sheet"||o.action_type==="custom");i.push({job_id:o.id,name:o.name,status:"dispatched",needs_agent:b,next_run:d.toISOString()})}catch(l){i.push({job_id:o.id,name:o.name,status:"error",error:l.message})}try{const{MemoryService:o}=await Promise.resolve().then(()=>qa),l=await e.env.DB.prepare("SELECT id FROM users").all();for(const d of l.results||[])await new o(e.env.DB).cleanupDoneTasks(d.id)}catch{}return e.json({executed:i.length,results:i,timestamp:a})});Re.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);const n=parseInt(e.req.param("jobId"),10);if(!n)return e.json({error:"Invalid job ID"},400);const a=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(n).first();if(!a)return e.json({error:"Job not found"},404);const i=JSON.parse(a.action_config||"{}").description||a.description||"",o="⏰ "+(a.name||"Scheduled Task"),l=new Date().toISOString();let d="";const c=a.action_type==="reminder",m=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!c&&a.action_type==="custom"&&m.test(i),c)d=i||a.name||"Time for your scheduled task.";else try{const _={id:a.user_id,username:a.username||"user",name:a.user_name||"User",pin_hash:a.pin_hash||"",role:a.user_role||"",personality_prompt:a.personality_prompt||"",telegram_chat_id:a.telegram_chat_id||"",timezone:a.user_timezone||"UTC",assistant_name:a.assistant_name||"Karna",created_at:"",updated_at:""},v={userId:a.user_id,username:_.username,channel:"cron",text:xs(a.name,i,a.action_type),sessionId:"cron-"+a.id,timestamp:l},{provider:x,rotation:E}=await ct(e.env.DB,a.user_id,a.pin_hash);d=await dr(v,e.env.DB,x,_,E,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(_){const v=_.message||"unknown error",x=v.includes("rate_limit")||v.includes("429")||v.includes("quota"),E=v.includes("timeout")||v.includes("Timeout");x?d="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":E?d="Task timed out. Will retry at next scheduled time.":d="Task encountered an error. Will retry at next scheduled time.",await U(e.env.DB,a.user_id,"cron_agent","execution_error",v,{job_id:a.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(a.action_type))try{const _=await e.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(a.user_id).first();(!_||_.cnt===0)&&await U(e.env.DB,a.user_id,"cron_verification","no_tools_called",`Cron job "${a.name}" (${a.action_type}) completed without any tool calls`,{job_id:a.id,action_type:a.action_type,response_preview:d.substring(0,200)})}catch{}let b=d||i||"Time for your scheduled task.";b=b.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const f=o+`
`+b;return await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(a.user_id,"reminder",o,b,"cron:"+a.id).run(),c&&await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(a.user_id,"system","assistant",f,JSON.stringify({type:"cron",job_id:a.id})).run(),a.telegram_chat_id&&await Ts(e.env.DB,a.user_id,a.telegram_chat_id,f),e.json({job_id:n,status:"completed",response_length:d.length})});async function Hn(e){var n;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!t)return null;const r=await e.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(t).first();return(r==null?void 0:r.user_id)||null}Re.get("/health/tools",async e=>{var r;const t=await Hn(e);if(!t)return e.json({error:"Not authenticated"},401);try{const n=await e.env.DB.prepare(`SELECT tool_name,
              COUNT(*) as total,
              SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successes,
              SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) as failures,
              ROUND(AVG(latency_ms)) as avg_latency_ms
       FROM tool_execution_log
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       AND tool_name != '__enforcement_trigger'
       GROUP BY tool_name
       ORDER BY total DESC`).bind(t).all(),a=await e.env.DB.prepare(`SELECT agent_type, provider_name, COUNT(*) as triggers,
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
       FROM llm_calls
       WHERE user_id = ? AND created_at > datetime('now', '-24 hours')
       GROUP BY provider_name, agent_type
       ORDER BY calls DESC`).bind(t).all();return e.json({period:"last_24h",tool_stats:n.results,enforcement:{triggers:a.results,retry_results:((r=s.results)==null?void 0:r[0])||{total_retries:0,successful_retries:0}},cron:{executions:i.results,warnings:o.results},providers:l.results})}catch(n){return e.json({error:n.message||"Failed to fetch metrics"},500)}});Re.get("/health/tools/recent",async e=>{const t=await Hn(e);if(!t)return e.json({error:"Not authenticated"},401);try{const r=await e.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
              success, error_message, latency_ms, was_enforcement_retry, channel, created_at
       FROM tool_execution_log
       WHERE user_id = ?
       ORDER BY id DESC LIMIT 50`).bind(t).all();return e.json({logs:r.results})}catch(r){return e.json({error:r.message},500)}});const ft=`

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
- Example: "Couldn't retrieve Amazon order status — requires login."`;function xs(e,t,r){return r==="reminder"?`[Scheduled Reminder] "${e}": ${t||"Time for your reminder."}`:r==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check Gmail for new/important emails."}
You MUST call gmail_list or gmail_search immediately.${ft}`:r==="check_calendar"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check calendar for upcoming events."}
You MUST call list_calendar_events immediately.${ft}`:r==="check_sheet"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
You MUST call read_sheet immediately with the relevant spreadsheet.${ft}`:r==="custom"&&t?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${ft}`:`[Scheduled task "${e}"]: ${t||"Execute this scheduled task."}${ft}`}function Ss(e,t,r,n){return{userId:e,username:t,channel:"telegram",text:r,sessionId:`telegram-${n}`,timestamp:new Date().toISOString()}}function ks(e,t){return e.replace(/\*\*(.*?)\*\*/gs,"*$1*").replace(/^#{1,3}\s+(.+)$/gm,"*$1*").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const Dt=new he,Ds=4e3;async function te(e,t,r,n="Markdown",a,s){var d,c;const i=Os(r,Ds),o=[];let l=!0;for(let m=0;m<i.length;m++){const h=i[m];let b=!1,f="";for(let _=0;_<3;_++)try{const v=await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:h,parse_mode:n,disable_web_page_preview:!1})});if(v.ok){b=!0;break}const x=await v.json().catch(()=>null);if(f=`HTTP ${v.status}: ${(x==null?void 0:x.description)||"Unknown error"}`,(d=x==null?void 0:x.description)!=null&&d.includes("parse")||(c=x==null?void 0:x.description)!=null&&c.includes("entities")){if((await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:h})})).ok){b=!0;break}f+=" (plain-text retry also failed)"}if(v.status===429||v.status>=500){const E=Math.pow(2,_)*1e3;await new Promise(O=>setTimeout(O,E));continue}break}catch(v){if(f=`Network error: ${v.message}`,_<2){const x=Math.pow(2,_)*1e3;await new Promise(E=>setTimeout(E,x));continue}}b||(l=!1,o.push(`Chunk ${m+1}/${i.length}: ${f}`))}if(!l&&a&&s&&o.length>0)try{const{logError:m}=await Promise.resolve().then(()=>tt);await m(a,s,"telegram","send_failed",o.join(" | "))}catch{}return{success:l,errors:o}}async function Rs(e,t){try{await fetch(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function Os(e,t){if(e.length<=t)return[e];const r=[];let n=e;for(;n.length>0;){if(n.length<=t){r.push(n);break}let a=n.lastIndexOf(`
`,t);a<t*.3&&(a=n.lastIndexOf(" ",t)),a<t*.3&&(a=t),r.push(n.substring(0,a)),n=n.substring(a).trimStart()}return r}async function Is(e,t,r,n,a){switch(e.split("@")[0].toLowerCase()){case"/start":{const i=(n==null?void 0:n.name)||"there",o=(n==null?void 0:n.assistant_name)||"Karna",l=`👋 *Hello, ${i}!*

I'm ${o}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/tasks — Show open tasks
/new — Start a fresh conversation

Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.`+(n?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`),d=await te(r,t,l,"Markdown",a,n==null?void 0:n.id);return!d.success&&d.errors.length>0&&console.warn(`[/start] Failed to send message: ${d.errors.join(" | ")}`),!0}case"/help":{const o=`🛠 *${(n==null?void 0:n.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`,l=await te(r,t,o,"Markdown",a,n==null?void 0:n.id);return!l.success&&l.errors.length>0&&console.warn(`[/help] Failed to send message: ${l.errors.join(" | ")}`),!0}case"/status":{if(!n){const i=await te(r,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app.","Markdown",a);return i.success||console.warn(`[/status] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const[i,o,l,d]=await Promise.all([a.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(n.id).first(),a.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(n.id).first(),a.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(n.id).first(),a.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(n.id).first()]),c=`📊 *System Status*

Active tasks: ${(i==null?void 0:i.cnt)||0}
Memories: ${(o==null?void 0:o.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(d==null?void 0:d.cnt)||0}

Status: ✅ Online`,m=await te(r,t,c,"Markdown",a,n.id);m.success||console.warn(`[/status] Failed to send message: ${m.errors.join(" | ")}`)}catch{const o=await te(r,t,"✅ Online — but had trouble fetching stats.","Markdown",a,n==null?void 0:n.id);o.success||console.warn(`[/status error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/new":{if(!n){const o=await te(r,t,"⚠️ Account not linked.","Markdown",a);return o.success||console.warn(`[/new] Failed to send message: ${o.errors.join(" | ")}`),!0}await a.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(n.id).run();const i=await te(r,t,"🆕 Starting fresh conversation. Your next message begins a new thread.","Markdown",a,n.id);return i.success||console.warn(`[/new] Failed to send message: ${i.errors.join(" | ")}`),!0}case"/tasks":case"/task":{if(!n){const i=await te(r,t,"⚠️ Account not linked.","Markdown",a);return i.success||console.warn(`[/tasks] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await a.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(n.id).all()).results||[];if(o.length===0){const f=await te(r,t,"✅ No open tasks. You're all clear.","Markdown",a,n.id);return f.success||console.warn(`[/tasks] Failed to send message: ${f.errors.join(" | ")}`),!0}const l=new Date,d=l.toISOString().slice(0,10),c=new Date(l);c.setDate(c.getDate()+1);const m=c.toISOString().slice(0,10),h=[`📋 *Open Tasks (${o.length})*
`];for(const f of o){let _="";if(f.due_date){const v=f.due_date.slice(0,10);v<d?_=" ⚠️ _overdue_":v===d?_=" 🔴 _due today_":v===m?_=" 🟡 _due tomorrow_":_=` _${new Date(f.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}h.push(`☐ ${f.title}${_}`)}h.push(`
_Say "mark [task] as done" to close a task._`);const b=await te(r,t,h.join(`
`),"Markdown",a,n.id);b.success||console.warn(`[/tasks] Failed to send message: ${b.errors.join(" | ")}`)}catch(i){const o=await te(r,t,"❌ Could not fetch tasks: "+i.message,"Markdown",a,n==null?void 0:n.id);o.success||console.warn(`[/tasks error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}default:return!1}}Dt.post("/webhook",async e=>{let t;try{t=await e.req.json()}catch{return e.json({ok:!0})}const r=e.env.DB,n={GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID},a=async()=>{var s,i,o,l,d;try{if(t.callback_query){await Cs(r,t.callback_query);return}const c=t.message;if(!c)return;const m=!!c.text,h=!!c.voice,b=!!c.document,f=!!c.photo,_=!!c.caption;if(!m&&!h&&!b&&!f)return;const v=String(c.chat.id);let x=c.text||"";const E=await r.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(v).first();let O=null;if(E){const R=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(E.id,"telegram_bot_token").first();R&&(O=await J(R.encrypted_value,E.pin_hash))}if(!O){const R=await r.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();R&&(O=await J(R.encrypted_value,R.pin_hash))}if(!O||x.startsWith("/")&&await Is(x,v,O,E,r))return;if(!E){const R=await te(O,v,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${v}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`,"Markdown",r);R.success||console.warn(`Failed to send unlinked account message: ${R.errors.join(" | ")}`);return}if(c.voice&&O&&E)try{const R=await te(O,v,"🎤 Processing voice note...","Markdown",r,E.id);R.success||console.warn(`[voice start] Failed to send message: ${R.errors.join(" | ")}`);const u=await(await fetch(`https://api.telegram.org/bot${O}/getFile?file_id=${c.voice.file_id}`)).json();if(u.ok&&((s=u.result)!=null&&s.file_path)){const p=await(await fetch(`https://api.telegram.org/file/bot${O}/${u.result.file_path}`)).blob();let g="",w="",S="whisper-1";const T=await e.env.DB.prepare("SELECT service, encrypted_value FROM credentials WHERE user_id = ? AND (service IN ('llm_slot_1', 'llm_slot_2', 'llm_slot_3', 'openai'))").bind(E.id).all();for(const N of T.results){const M=await J(N.encrypted_value,E.pin_hash);if(N.service==="openai"){g="https://api.openai.com/v1/audio/transcriptions",w=M;break}else if(N.service.startsWith("llm_slot_"))try{const K=JSON.parse(M);if(K.provider==="openai"){g="https://api.openai.com/v1/audio/transcriptions",w=K.apiKey;break}else if(K.provider==="groq"){g="https://api.groq.com/openai/v1/audio/transcriptions",w=K.apiKey,S="whisper-large-v3";break}}catch{}}if(!g){const N=await te(O,v,"⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys).","Markdown",r,E.id);N.success||console.warn(`[voice no stt] Failed to send message: ${N.errors.join(" | ")}`);return}const D=new FormData;D.append("file",p,"voice.ogg"),D.append("model",S),D.append("language","en");const C=await fetch(g,{method:"POST",headers:{Authorization:`Bearer ${w}`},body:D});if(!C.ok){const N=await C.text(),M=await te(O,v,`⚠️ Transcription failed: ${C.status} ${N}`,"Markdown",r,E.id);M.success||console.warn(`[voice transcription error] Failed to send message: ${M.errors.join(" | ")}`);return}x=(await C.json()).text;const I=await te(O,v,`🗣️ *You said:* ${x}`,"Markdown",r,E.id);I.success||console.warn(`[voice transcript echo] Failed to send message: ${I.errors.join(" | ")}`)}}catch(R){const H=await te(O,v,`⚠️ Failed to process voice note: ${R.message}`,"Markdown",r,E==null?void 0:E.id);H.success||console.warn(`[voice processing error] Failed to send message: ${H.errors.join(" | ")}`);return}if((b||f)&&O&&E)try{let R,H="unknown",u="unknown",y=0;if(b)R=c.document.file_id,H=c.document.file_name||"document",u=c.document.mime_type||"unknown",y=c.document.file_size||0;else if(f){const p=c.photo[c.photo.length-1];R=p.file_id,H="photo.jpg",u="image/jpeg",y=p.file_size||0}if(R){const g=await(await fetch(`https://api.telegram.org/bot${O}/getFile?file_id=${R}`)).json();let w="";if(g.ok&&((i=g.result)!=null&&i.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(H)||/^text\/|application\/json|application\/xml|application\/csv/i.test(u))&&y<5e4)try{w=await(await fetch(`https://api.telegram.org/file/bot${O}/${g.result.file_path}`)).text()}catch{}const S=c.caption||"",T=`[Telegram file received: "${H}" (${u}, ${Math.round(y/1024)}KB)]`;w?x=`${S?S+`

`:""}${T}
File contents:
${w.substring(0,8e3)}${w.length>8e3?`
[...truncated]`:""}`:x=`${S?S+`

`:""}${T}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(R){if(_&&c.caption)x=c.caption;else{const H=await te(O,v,`⚠️ Received your file but couldn't process it: ${R.message}`,"Markdown",r,E==null?void 0:E.id);H.success||console.warn(`[file processing error] Failed to send message: ${H.errors.join(" | ")}`);return}}if(!x)return;Rs(O,v).catch(()=>{});let A=await r.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(E.id).first();A?await r.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(A.id).run():A={id:(await r.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(E.id).run()).meta.last_row_id};const B=Ss(E.id,E.username,x,v);B.metadata={thread_id:A.id};let G,F;try{const R=await ct(r,E.id,E.pin_hash);G=R.provider,F=R.rotation}catch(R){console.error("Telegram provider setup error:",R);const H=(o=R.message)!=null&&o.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(l=R.message)!=null&&l.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${R.message||"Unknown error"}`,u=await te(O,v,H,"Markdown",r,E.id);u.success||console.warn(`[provider error] Failed to send message: ${u.errors.join(" | ")}`);return}const{classifyIntentFast:j}=await Promise.resolve().then(()=>us);if(j(x).agent==="multi"){const R=await te(O,v,"🔍 On it…","Markdown",r,E.id);R.success||console.warn(`[ack] Failed to send: ${R.errors.join(" | ")}`)}const W=9e4;let q=!1;try{const R=await Promise.race([dr(B,r,G,E,F,n),new Promise((y,p)=>setTimeout(()=>p(new Error("TELEGRAM_TIMEOUT")),W))]),H=ks(R,"telegram"),u=await te(O,v,H||"(empty response)","Markdown",r,E.id);if(await r.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(A.id).run().catch(()=>{}),q=u.success,!u.success){console.error(`[CRITICAL] Agent response failed to send to Telegram for user ${E.id}:`,u.errors);try{const{logError:y}=await Promise.resolve().then(()=>tt);await y(r,E.id,"telegram","response_send_failed",`Failed to deliver response: ${u.errors.join(" | ")}`)}catch{}}}catch(R){console.error("Telegram agent error:",R);const H=R.message==="TELEGRAM_TIMEOUT",u=H?`⏱️ This took longer than Telegram allows (25s limit).

For long essays, please use the web app — it handles long generation without time limits.`:(d=R.message)!=null&&d.includes("API error")?`⚠️ AI provider returned an error. The provider (${G.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(R.message||"Unknown").substring(0,200)}`,y=await te(O,v,u,"Markdown",r,E.id);q=y.success,y.success||console.error(`[CRITICAL] Error message failed to send to Telegram for user ${E.id}:`,y.errors);try{const{logError:p}=await Promise.resolve().then(()=>tt);await p(r,E.id,"telegram",H?"timeout":"agent_error",R.message||"Agent error",{provider:G.name})}catch{}}}catch(c){console.error("Telegram webhook error:",c);try{const{logError:m}=await Promise.resolve().then(()=>tt);await m(r,null,"telegram","webhook_error",c.message||"Unknown telegram error")}catch{}}};return e.executionCtx.waitUntil(a()),e.json({ok:!0})});Dt.post("/setup-webhook",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const{webhook_url:n}=await e.req.json(),a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r.user_id,"telegram_bot_token").first();if(!a)return e.json({error:"Telegram bot token not configured in Settings"},400);const s=await J(a.encrypted_value,r.pin_hash);if(!n){const c=await(await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(c)}const o=await(await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:n,allowed_updates:["message"],drop_pending_updates:!1})})).json();return e.json(o)});Dt.get("/webhook-status",async e=>{var s,i,o,l,d,c;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const n=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r.user_id,"telegram_bot_token").first();if(!n)return e.json({configured:!1,error:"Bot token not set"});const a=await J(n.encrypted_value,r.pin_hash);try{const h=await(await fetch(`https://api.telegram.org/bot${a}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((i=h.result)==null?void 0:i.url)||"",has_webhook:!!((o=h.result)!=null&&o.url),pending_updates:((l=h.result)==null?void 0:l.pending_update_count)||0,last_error:((d=h.result)==null?void 0:d.last_error_message)||"",last_error_date:((c=h.result)==null?void 0:c.last_error_date)||null})}catch(m){return e.json({configured:!0,error:m.message})}});Dt.post("/detect-chat-id",async e=>{var s,i;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const n=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r.user_id,"telegram_bot_token").first();if(!n)return e.json({error:"Bot token not configured"},400);const a=await J(n.encrypted_value,r.pin_hash);try{const d=((i=(await(await fetch(`https://api.telegram.org/bot${a}/getWebhookInfo`)).json()).result)==null?void 0:i.url)||"";await fetch(`https://api.telegram.org/bot${a}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(v=>setTimeout(v,500));const m=await(await fetch(`https://api.telegram.org/bot${a}/getUpdates?limit=10&timeout=0`)).json();d&&await fetch(`https://api.telegram.org/bot${a}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:d,allowed_updates:["message"]})});const h=m.result||[];if(h.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const b=[],f=new Set;for(let v=h.length-1;v>=0;v--){const x=h[v].message;if(x&&x.chat){const E=String(x.chat.id);f.has(E)||(f.add(E),b.push({chat_id:E,name:[x.chat.first_name,x.chat.last_name].filter(Boolean).join(" ")||x.chat.title||"Unknown",username:x.chat.username||"",date:new Date((x.date||0)*1e3).toISOString()}))}}if(b.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const _=b[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(_,r.user_id).run(),e.json({found:!0,chat_id:_,name:b[0].name,all_chats:b,message:`Chat ID ${_} detected and saved to your profile.`})}catch(o){return e.json({error:`Detection failed: ${o.message}`},500)}});async function Cs(e,t){var _;const{id:r,data:n,message:a,from:s}=t;if(!n||!a)return;const i=n.split(":");if(i[0]!=="briefing_toggle"||i.length<3)return;const o=i[1],l=parseInt(i[2]);if(!l||!o)return;const d=String(a.chat.id),c=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(d).first();if(!c)return;const m=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(c.id,l,o).first();if(!m)return;const h=m.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(h,h,m.id).run();const b=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(c.id).first();if(!b)return;const f=await J(b.encrypted_value,b.pin_hash);try{const v=await fetch(`https://api.telegram.org/bot${f}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:r,text:h?"✅ Checked!":"☐ Unchecked"})});v.ok||console.warn(`[callback answer] Failed to answer callback: HTTP ${v.status}`)}catch(v){console.warn(`[callback answer] Error answering callback: ${v.message}`)}if((_=a.reply_markup)!=null&&_.inline_keyboard){const v=a.reply_markup.inline_keyboard.map(x=>x.map(E=>{var O;if((O=E.callback_data)!=null&&O.includes(o)){const A=h?"✅":"☐",B=E.text.replace(/^[☐✅]\s*/,"");return{...E,text:`${A} ${B}`}}return E}));try{await fetch(`https://api.telegram.org/bot${f}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d,message_id:a.message_id,reply_markup:{inline_keyboard:v}})})}catch{}}}function Ns(e){const t=new Date,r=new Date(t.toLocaleString("en-US",{timeZone:e})),n=new Date(r);n.setDate(n.getDate()+1),n.setHours(0,0,0,0);const a=new Date(n);a.setHours(23,59,59,999);const s=n.toISOString().split("T")[0];return{start:n.toISOString(),end:a.toISOString(),dateStr:s}}async function As(e,t,r,n,a,s){try{return(await new sr(e,t,r,n,a).listEvents("primary",{timeMin:s.start,timeMax:s.end,maxResults:50})).map(l=>{var d;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(d=l.attendees)==null?void 0:d.map(c=>c.displayName||c.email),source:"google"}})}catch(i){return console.error("Google Calendar fetch error:",i.message),[]}}async function Ls(e,t,r,n,a){try{const s=new we(e,t,r,n,a),i=await s.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),o=await s.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const m of i){const h=m.from.split("<")[0].trim()||m.from;l[h]=(l[h]||0)+1}const d=Object.entries(l).sort(([,m],[,h])=>h-m).slice(0,5).map(([m])=>m),c=i.some(m=>m.subject.toLowerCase().includes("urgent")||m.subject.toLowerCase().includes("asap")||m.subject.toLowerCase().includes("immediately"));return{unreadCount:i.length,importantCount:o.length,topSenders:d,hasUrgent:c}}catch(s){return console.error("Gmail fetch error:",s.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function Ms(e,t){try{const r=await e.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(t).all(),n=new Date,a=new Date(n);a.setDate(a.getDate()+1),a.setHours(23,59,59,999);const s=r.results||[],i=s.map(l=>{if(l.due_date){const d=new Date(l.due_date),c=d<=n?"overdue":d<=a?"due today":d.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${l.title} [${c}]`}return l.title}),o=s.filter(l=>l.due_date?new Date(l.due_date)<=a:!1).length;return{pending:s.length,dueToday:o,items:i}}catch(r){return console.error("Tasks fetch error:",r.message),{pending:0,dueToday:0,items:[]}}}async function $s(e,t){try{const r=Math.floor((Date.now()-1728e5)/1e3),n=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${r},points>10`,a=await fetch(n,{headers:{"User-Agent":"Karna/1.0"}});return a.ok?((await a.json()).hits||[]).filter(i=>i.url&&!t.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const Or=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function Bs(e,t,r){const n=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],a=new Set;if(t&&r)try{((await t.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(r).all()).results||[]).forEach(d=>a.add(d.url))}catch{}const s=[];if(n.some(l=>Or.some(d=>l.toLowerCase().includes(d.toLowerCase())))){const l=n.find(c=>Or.some(m=>c.toLowerCase().includes(m.toLowerCase())))||"AI agents",d=await $s(l,a);for(const c of d)s.push(c),a.add(c.url)}for(const l of n){if(s.length>=8)break;const d=`latest ${l} news today`;try{const c=await Ut(d,{num:5});if(c.results)for(const m of c.results){if(s.length>=8)break;a.has(m.link)||(s.push({title:m.title,summary:m.snippet,url:m.link,source:m.displayLink}),a.add(m.link))}}catch(c){console.error(`News search error for "${d}":`,c.message)}}const o=s.slice(0,7);if(t&&r&&o.length>0)for(const l of o)try{await t.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(r,l.url,l.title).run()}catch{}return o}function js(e,t){const r=[];let n="20:00";{const[i,o]=t.split(":"),l=parseInt(i,10),d=o||"00",c=l>=12?"PM":"AM";n=`${l===0?12:l>12?l-12:l}:${d} ${c}`}r.push(`🗓 Your ${n} Brief — ${e.targetDate}`),r.push("");const a=e.calendar.totalCount;if(a>0){r.push(`📅 Tomorrow: ${a} event${a===1?"":"s"}`);for(const i of e.calendar.google.slice(0,5)){const o=i.startTime?new Date(i.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";r.push(`   • ${o} ${i.title}`)}}else r.push("📅 Tomorrow: Nothing scheduled");r.push("");const s=e.emails.gmail.unreadCount;if(s>0?(r.push(`📧 Gmail: ${s} unread`),e.emails.gmail.importantCount>0&&r.push(`   ★ ${e.emails.gmail.importantCount} marked important`),e.emails.gmail.hasUrgent&&r.push("   ⚠️ Urgent messages present"),e.emails.gmail.topSenders.length>0&&r.push(`   From: ${e.emails.gmail.topSenders.slice(0,3).join(", ")}`)):r.push("📧 Gmail: Inbox clear"),r.push(""),e.tasks.pending>0){r.push(`✅ Open Tasks (${e.tasks.pending}):`);for(const i of e.tasks.items)r.push(`   ☐ ${i}`)}else r.push("✅ Tasks: All clear");if(r.push(""),e.news.items.length>0){r.push("📡 Today's Signal:");for(const i of e.news.items){const o=i.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${i.source}`;r.push(`   • ${i.title.substring(0,90)}${i.title.length>90?"…":""}`),r.push(`     ${o} — ${i.summary.substring(0,80)}${i.summary.length>80?"…":""}`)}}return r.join(`
`)}function Ps(e){const t=[];let r=0;for(const n of e.calendar.google)t.push({type:"calendar",key:n.id,text:`${n.title} - ${new Date(n.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:n},sortOrder:r++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:r++});for(const n of e.tasks.items)t.push({type:"task",key:`task-${n}`,text:n,metadata:{},sortOrder:r++});for(const n of e.news.items)t.push({type:"news",key:`news-${n.url}`,text:`📰 ${n.title}`,metadata:{url:n.url,source:n.source},sortOrder:r++});return t}async function Us(e,t){const r=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!r)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let n;try{const s=JSON.parse(r.components);n={google_calendar:s.google_calendar!==!1,gmail:s.gmail!==!1,tasks:s.tasks!==!1,news:s.news!==!1}}catch{n={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const a=r.news_topics?r.news_topics.split(",").map(s=>s.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:n,newsTopics:a}}async function Fn(e,t,r){var E,O;const n=t.timezone||"Asia/Kolkata",a=Ns(n),{components:s,newsTopics:i}=await Us(e,t.id),o=[],l=[];s.google_calendar&&(o.push(As(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET,a)),l.push("googleEvents")),s.gmail&&(o.push(Ls(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),s.tasks&&(o.push(Ms(e,t.id)),l.push("tasks")),s.news&&(o.push(Bs(i,e,t.id)),l.push("news"));const d=await Promise.all(o),c={};l.forEach((A,B)=>{c[A]=d[B]});const m={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},h={pending:0,dueToday:0,items:[]},b={generatedAt:new Date().toISOString(),targetDate:a.dateStr,calendar:{google:c.googleEvents||[],totalCount:((E=c.googleEvents)==null?void 0:E.length)||0},emails:{gmail:c.gmailSummary||m},tasks:c.tasks||h,news:{items:c.news||[],fetchedAt:new Date().toISOString()},summary:""},f=((O=await e.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(t.id).first())==null?void 0:O.briefing_time)||"20:00";b.summary=js(b,f);const _=Ps(b),v=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(t.id,JSON.stringify(b)).first(),x=(v==null?void 0:v.id)||0;for(const A of _)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(x,A.type,A.key,A.text,JSON.stringify(A.metadata),A.sortOrder).run();return{briefingId:x,content:b,items:_}}async function Hs(e,t,r){const n=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(r,t).first();if(!n)return null;const a=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(r).all();return{briefing:{...n,content:JSON.parse(n.content_json||"{}")},items:a.results||[]}}async function Fs(e,t,r,n){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(r,t).first())return null;const s=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(n,r).first();if(!s)return null;const i=s.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(i,i,n,r).run(),{checked:i===1}}async function Gs(e,t,r=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
    LIMIT ?
  `).bind(t,r).all()).results||[]).map(a=>({...a,content:JSON.parse(a.content_json||"{}")}))}function Gn(e,t,r=new Date){const n=new Date(r.toLocaleString("en-US",{timeZone:t})),a=n.getHours(),s=n.getMinutes(),[i,o]=e.split(":").map(Number),l=a*60+s,d=i*60+o;return l===d}function Wn(e,t){const r=e.summary,n=[];for(const a of t.slice(0,10))n.push([{text:`☐ ${a.text.substring(0,40)}${a.text.length>40?"...":""}`,callback_data:`briefing_toggle:${a.key}`}]);return{text:r,inlineKeyboard:n}}const oe=new he;async function Ws(e,t){var a;if(e.req.path.includes("/cron/"))return t();const r=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!n)return e.json({error:"Invalid session"},401);e.set("user",{id:n.user_id,username:n.username,name:n.name,pin_hash:n.pin_hash,role:n.role,personality_prompt:n.personality_prompt,telegram_chat_id:n.telegram_chat_id,timezone:n.timezone,assistant_name:n.assistant_name||"Karna",created_at:n.created_at,updated_at:n.updated_at}),e.set("sessionId",r),await t()}oe.use("/*",Ws);oe.get("/briefings",async e=>{const t=e.get("user"),r=parseInt(e.req.query("limit")||"10");try{const n=await Gs(e.env.DB,t.id,r);return e.json({briefings:n})}catch(n){return e.json({error:n.message},500)}});oe.get("/briefings/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));try{const n=await Hs(e.env.DB,t.id,r);return n?e.json(n):e.json({error:"Briefing not found"},404)}catch(n){return e.json({error:n.message},500)}});oe.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),n=parseInt(e.req.param("itemId"));try{const a=await Fs(e.env.DB,t.id,r,n);return a?e.json(a):e.json({error:"Item not found"},404)}catch(a){return e.json({error:a.message},500)}});oe.post("/briefings/generate",async e=>{const t=e.get("user");try{const r=await Fn(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(r)}catch(r){return e.json({error:r.message},500)}});oe.get("/morning-briefing",async e=>{const t=e.get("user");try{const r=await Kn(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(r)}catch(r){return e.json({error:r.message},500)}});oe.get("/briefing-preferences",async e=>{const t=e.get("user");try{const r=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!r){const a={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:a})}const n={briefingTime:r.briefing_time,briefingEnabled:r.briefing_enabled!==0,components:JSON.parse(r.components),newsTopics:r.news_topics.split(",").map(a=>a.trim()).filter(Boolean),notificationChannels:JSON.parse(r.notification_channels),proactiveLevel:r.proactive_level};return e.json({preferences:n})}catch(r){return e.json({error:r.message},500)}});oe.post("/briefing-preferences",async e=>{const t=e.get("user"),r=await e.req.json(),n=[];if(r.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(r.briefingTime)||n.push("Invalid time format. Use HH:MM (e.g., 20:00)")),r.newsTopics&&(r.newsTopics.length>5&&n.push("Maximum 5 news topics allowed"),r.newsTopics.some(a=>a.length>50)&&n.push("Each news topic must be 50 characters or less")),r.proactiveLevel&&!["conservative","moderate","aggressive"].includes(r.proactiveLevel)&&n.push("Invalid proactive level. Use conservative, moderate, or aggressive"),n.length>0)return e.json({error:n.join("; ")},400);try{const a=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),s=r.components?JSON.stringify(r.components):null,i=r.notificationChannels?JSON.stringify(r.notificationChannels):null,o=r.newsTopics?r.newsTopics.join(", "):null;if(a){const l=[],d=[];r.briefingTime!==void 0&&(l.push("briefing_time = ?"),d.push(r.briefingTime)),r.briefingEnabled!==void 0&&(l.push("briefing_enabled = ?"),d.push(r.briefingEnabled?1:0)),s!==null&&(l.push("components = ?"),d.push(s)),o!==null&&(l.push("news_topics = ?"),d.push(o)),i!==null&&(l.push("notification_channels = ?"),d.push(i)),r.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),d.push(r.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),d.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...d).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,r.briefingTime||"20:00",s||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',o||"AI, LLM, Tools, Agentic Workflows, AI Features",i||'{"telegram":true,"web":true}',r.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(a){return e.json({error:a.message},500)}});oe.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(r){return e.json({error:r.message},500)}});oe.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);try{const n=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),a=[],s=new Date;for(const i of n.results||[]){if(!i.briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.briefing_time||"20:00";if(Gn(l,o,s))try{const d=await Fn(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});if(i.telegram_chat_id){const{text:c,inlineKeyboard:m}=Wn(d.content,d.items);await qn(e.env.DB,i,c,m,d.briefingId)}a.push({user_id:i.id,status:"success",briefing_id:d.briefingId,briefing_time:l,timezone:o})}catch(d){a.push({user_id:i.id,status:"error",error:d.message})}}return e.json({executed:a.length,results:a})}catch(n){return e.json({error:n.message},500)}});oe.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);try{const n=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id IS NOT NULL").all(),a=[],s=new Date,i=new Date(s.getTime()+600*1e3).toISOString(),o=new Date(s.getTime()+900*1e3).toISOString();for(const l of n.results||[])try{const d=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!d)continue;const c=await J(d.encrypted_value,l.pin_hash),h=JSON.parse(c).access_token;if(!h)continue;const b=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(s.toISOString())}&timeMax=${encodeURIComponent(o)}&maxResults=10`,{headers:{Authorization:`Bearer ${h}`}});if(!b.ok)continue;const _=((await b.json()).items||[]).filter(E=>{var A;const O=(A=E.start)==null?void 0:A.dateTime;return O?O>=s.toISOString()&&O<=i:!1});if(_.length===0){a.push({user_id:l.id,reminders_sent:0});continue}const v=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(l.id).first();if(!v)continue;const x=await J(v.encrypted_value,l.pin_hash);for(const E of _){const O=new Date(E.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),A=E.location?`
📍 ${E.location}`:"",B=`⏰ Meeting in 10 minutes!

*${E.summary||"Untitled Event"}*
🕐 ${O}${A}`;await fetch(`https://api.telegram.org/bot${x}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l.telegram_chat_id,text:B,parse_mode:"Markdown"})})}a.push({user_id:l.id,reminders_sent:_.length})}catch(d){a.push({user_id:l.id,status:"error",error:d.message})}return e.json({executed:a.length,results:a})}catch(n){return e.json({error:n.message},500)}});oe.post("/cron/morning-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);try{const n=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.morning_briefing_time, '08:00') as morning_briefing_time,
             COALESCE(bp.morning_briefing_enabled, 1) as morning_briefing_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),a=[],s=new Date;for(const i of n.results||[]){if(!i.morning_briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.morning_briefing_time||"08:00";if(Gn(l,o,s))try{const d=await Kn(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});let c={telegram:!0,web:!0};try{c=JSON.parse(i.notification_channels||"{}")}catch{}if(c.telegram!==!1&&i.telegram_chat_id&&d.briefingId){const m=Ks(d.content);await zn(e.env.DB,i,m),await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(d.briefingId).run()}a.push({user_id:i.id,status:"success",briefing_id:d.briefingId,briefing_time:l,timezone:o})}catch(d){a.push({user_id:i.id,status:"error",error:d.message})}}return e.json({executed:a.length,results:a})}catch(n){return e.json({error:n.message},500)}});oe.post("/cron/email-digest",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);try{const n=await e.env.DB.prepare(`
      SELECT u.*, bp.components
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),a=[];for(const s of n.results||[]){let i={};try{i=JSON.parse(s.components||"{}")}catch{}if(i.email_digest!==!1)try{const o=await Yn(e.env.DB,s,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),l=`Email Digest — ${new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}`,d=JSON.stringify(o,null,2),c=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'email_digest', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(s.id,l,d,`email_digest_${Date.now()}`,null,null,null).first();a.push({user_id:s.id,status:"success",action_item_id:c==null?void 0:c.id,digest:o})}catch(o){a.push({user_id:s.id,status:"error",error:o.message})}}return e.json({executed:a.length,results:a})}catch(n){return e.json({error:n.message},500)}});oe.post("/cron/weekly-review",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);try{const n=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.weekly_review_day_time, 'Sunday 20:00') as weekly_review_day_time,
             COALESCE(bp.weekly_review_enabled, 1) as weekly_review_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),a=[],s=new Date;for(const i of n.results||[]){if(!i.weekly_review_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.weekly_review_day_time||"Sunday 20:00";if(qs(l,o,s))try{const d=await zs(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),c=`Weekly Review — Week of ${new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})}`,m=JSON.stringify(d,null,2),h=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'weekly_review', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(i.id,c,m,`weekly_review_${Date.now()}`,null,null,null).first();let b={telegram:!0,web:!0};try{b=JSON.parse(i.notification_channels||"{}")}catch{}if(b.telegram!==!1&&i.telegram_chat_id){const f=Ys(d);await zn(e.env.DB,i,f)}a.push({user_id:i.id,status:"success",action_item_id:h==null?void 0:h.id})}catch(d){a.push({user_id:i.id,status:"error",error:d.message})}}return e.json({executed:a.length,results:a})}catch(n){return e.json({error:n.message},500)}});async function qn(e,t,r,n,a){try{const s=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!s)return;const i=await J(s.encrypted_value,s.pin_hash);if(!(await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:r,parse_mode:"Markdown",reply_markup:{inline_keyboard:n.map(d=>d.map(c=>({...c,callback_data:`${c.callback_data}:${a}`})))}})})).json()).ok){const c=await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:r.replace(/[_*[`\]]/g,""),reply_markup:{inline_keyboard:n.map(m=>m.map(h=>({...h,callback_data:`${h.callback_data}:${a}`})))}})})).json();if(!c.ok){console.error("Telegram briefing send failed:",c.description,"chat_id:",t.telegram_chat_id);return}}await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(a).run()}catch(s){console.error("Telegram briefing error:",s.message)}}async function zn(e,t,r){try{const n=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!n)return;const a=await J(n.encrypted_value,n.pin_hash);(await fetch(`https://api.telegram.org/bot${a}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:r.substring(0,4e3),parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${a}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:r.substring(0,4e3).replace(/[_*[`\]]/g,"")})})}catch(n){console.error("Telegram plain text error:",n.message)}}async function Kn(e,t,r){const n=new Date;n.setHours(0,0,0,0);const a=new Date;a.setHours(23,59,59,999);const s=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 
    AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,n.toISOString(),a.toISOString()).all(),i=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 10
  `).bind(t.id).all(),o=await Yn(e,t,r);let l=[];try{const h=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first();if(h){const b=await J(h.encrypted_value,t.pin_hash),_=JSON.parse(b).access_token;if(_){const v=n.toISOString(),x=a.toISOString(),E=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(v)}&timeMax=${encodeURIComponent(x)}&maxResults=20`,{headers:{Authorization:`Bearer ${_}`}});E.ok&&(l=((await E.json()).items||[]).map(A=>{var B,G,F,j;return{title:A.summary||"Untitled",startTime:((B=A.start)==null?void 0:B.dateTime)||((G=A.start)==null?void 0:G.date),endTime:((F=A.end)==null?void 0:F.dateTime)||((j=A.end)==null?void 0:j.date)}}))}}}catch{}const d={generatedAt:new Date().toISOString(),type:"morning",todayReminders:(s.results||[]).map(h=>({name:h.name,description:h.description,next_run:h.next_run})),pendingActions:(i.results||[]).map(h=>({title:h.title,priority:h.priority})),emailDigest:o,calendarEvents:l},c=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'morning', ?, 'all')
    RETURNING id
  `).bind(t.id,JSON.stringify(d)).first();return{briefingId:(c==null?void 0:c.id)||0,content:d}}async function Yn(e,t,r){const n={unreadCount:0,recent:[]},a={message:"",recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const i=new we(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET),o=await i.getUnreadCount(),l=await i.listMessages({maxResults:10,labelIds:["INBOX"]});n.unreadCount=o,n.recent=l.map(d=>({id:d.id,subject:d.subject,from:d.from,snippet:d.snippet,isUnread:d.isUnread}))}}catch(s){n.error=s.message}try{const s=await e.prepare("SELECT name, encrypted_blob FROM site_credentials WHERE user_id = ? AND (name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE) LIMIT 1").bind(t.id,"%Outlook%","%Microsoft%","%Office 365%").first();if(!s)a.message="No Outlook credentials saved in Secret Vault. Add them in Settings → Secret Vault.";else{const i=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,"browser_use_api_key").first();if(!i)a.message="Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key.";else{const o=(await J(i.encrypted_value,t.pin_hash)).trim(),l=JSON.parse(await J(s.encrypted_blob,t.pin_hash)),d=await Dn("Go to https://outlook.live.com or https://outlook.office.com. Log in with username {username} and password {password} if prompted. Navigate to the inbox and extract the 10 most recent emails with sender, subject, date, and snippet. Return the results as structured text.",o,{secrets:{username:l.username,password:l.password},timeoutMs:88e3});d.status==="completed"&&d.output?a.recent=d.output:d.status==="timeout"?a.message="Outlook browser task timed out.":a.message="Outlook returned no content."}}}catch(s){a.message=`Outlook error: ${s.message}`}return{gmail:n,outlook:a}}function qs(e,t,r=new Date){const n=new Date(r.toLocaleString("en-US",{timeZone:t})),a=n.toLocaleDateString("en-US",{weekday:"long"}),s=n.getHours(),i=n.getMinutes(),o=e.trim().split(" "),l=o[o.length-1],d=o.slice(0,o.length-1).join(" "),[c,m]=l.split(":").map(Number),h=s*60+i,b=c*60+m;return a===d&&h===b}async function zs(e,t,r){const n=new Date,a=new Date(n.getTime()-10080*60*1e3),s=new Date(n.getTime()+10080*60*1e3),i=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND state = 'completed' AND last_run >= ?
    ORDER BY last_run DESC
  `).bind(t.id,a.toISOString()).all(),o=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run < ?
    ORDER BY next_run DESC
  `).bind(t.id,n.toISOString()).all(),l=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 15
  `).bind(t.id).all(),d=await e.prepare(`
    SELECT * FROM document_library 
    WHERE user_id = ? AND created_at >= ?
    ORDER BY created_at DESC
    LIMIT 10
  `).bind(t.id,a.toISOString()).all(),c=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,n.toISOString(),s.toISOString()).all();let m={unreadCount:0,recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const b=new we(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET),f=await b.getUnreadCount(),_=await b.listMessages({maxResults:10,labelIds:["INBOX"]});m={unreadCount:f,recent:_.map(v=>({subject:v.subject,from:v.from,snippet:v.snippet}))}}}catch{}return{generatedAt:n.toISOString(),period:{start:a.toISOString(),end:n.toISOString()},completedTasks:(i.results||[]).map(h=>({name:h.name,last_run:h.last_run})),missedTasks:(o.results||[]).map(h=>({name:h.name,next_run:h.next_run})),openActions:(l.results||[]).map(h=>({title:h.title,priority:h.priority,status:h.status})),recentDocuments:(d.results||[]).map(h=>({name:h.name,status:h.status,created_at:h.created_at})),upcomingTasks:(c.results||[]).map(h=>({name:h.name,next_run:h.next_run})),gmailSummary:m}}function Ks(e){const t=[];t.push("☀️ Morning Briefing"),t.push("");const r=e.todayReminders||[];if(r.length>0){t.push(`📋 Today (${r.length}):`);for(const l of r){const d=l.next_run?new Date(l.next_run).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${d} ${l.name}`)}}else t.push("📋 Today: No scheduled reminders");t.push("");const n=e.pendingActions||[];if(n.length>0){t.push(`🔔 Pending Actions (${n.length}):`);for(const l of n.slice(0,5))t.push(`   • ${l.title} (${l.priority})`)}else t.push("🔔 Pending Actions: None");t.push("");const a=e.emailDigest||{},s=a.gmail||{};s.unreadCount>0?t.push(`📧 Gmail: ${s.unreadCount} unread`):t.push("📧 Gmail: Inbox clear");const i=a.outlook||{};typeof i.recent=="string"&&i.recent.length>0?t.push("📧 Outlook: see digest"):i.message&&t.push(`📧 Outlook: ${i.message}`),t.push("");const o=e.calendarEvents||[];if(o.length>0){t.push(`📅 Calendar (${o.length}):`);for(const l of o.slice(0,5)){const d=l.startTime?new Date(l.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${d} ${l.title}`)}}return t.join(`
`)}function Ys(e){const t=[];t.push("📊 Weekly Review"),t.push("");const r=e.completedTasks||[];t.push(`✅ Completed: ${r.length}`);const n=e.missedTasks||[];t.push(`❌ Missed/Overdue: ${n.length}`);const a=e.openActions||[];t.push(`🔔 Open Actions: ${a.length}`),t.push("");const s=e.recentDocuments||[];s.length>0&&t.push(`📄 Documents: ${s.length} this week`);const i=e.upcomingTasks||[];i.length>0&&t.push(`📅 Upcoming: ${i.length} in next 7 days`);const o=e.gmailSummary||{};return o.unreadCount>0&&t.push(`📧 Gmail Unread: ${o.unreadCount}`),t.join(`
`)}oe.post("/briefings/:id/resend",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));try{const n=await e.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(r,t.id).first();if(!n)return e.json({error:"Briefing not found"},404);const a=JSON.parse(n.content||"{}"),s=await e.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(r).all(),{text:i,inlineKeyboard:o}=Wn(a,s.results||[]);await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(r).run(),await qn(e.env.DB,t,i,o,r);const l=await e.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(r).first();return l!=null&&l.delivered_telegram?e.json({success:!0,message:"Briefing sent to Telegram"}):e.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(n){return e.json({error:n.message},500)}});oe.delete("/briefings/:id",async e=>{const t=e.get("user"),r=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});const Je=new he;async function Js(e,t){var a;const r=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!n)return e.json({error:"Invalid session"},401);e.set("user",{id:n.user_id,username:n.username,name:n.name,pin_hash:n.pin_hash,role:n.role,personality_prompt:n.personality_prompt,telegram_chat_id:n.telegram_chat_id,timezone:n.timezone,assistant_name:n.assistant_name||"Karna",created_at:n.created_at,updated_at:n.updated_at}),e.set("sessionId",r),await t()}Je.use("/*",Js);function Jn(e){return e.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"")}Je.get("/",async e=>{const t=e.get("user"),r=await e.env.DB.prepare(`SELECT id, name, slug, description, instructions, parameters, required_tools, examples, enabled, usage_count, last_used_at, created_at, updated_at
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`).bind(t.id).all();return e.json({skills:r.results||[]})});Je.post("/",async e=>{var d,c,m;const t=e.get("user"),r=await e.req.json();if(!((d=r.name)!=null&&d.trim()))return e.json({error:"name is required"},400);if(!((c=r.description)!=null&&c.trim()))return e.json({error:"description is required"},400);if(!((m=r.instructions)!=null&&m.trim()))return e.json({error:"instructions is required"},400);let n=Jn(r.name);n||(n=`skill_${Date.now()}`);const a=await e.env.DB.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(t.id,`${n}%`).all();a.results&&a.results.length>0&&a.results.map(b=>b.slug).includes(n)&&(n=`${n}_${a.results.length+1}`);const s=JSON.stringify(r.parameters||{}),i=JSON.stringify(r.required_tools||[]),o=JSON.stringify(r.examples||[]),l=await e.env.DB.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,r.name.trim(),n,r.description.trim(),r.instructions.trim(),s,i,o).first();return e.json({skill:l,created:!0})});Je.get("/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));if(isNaN(r))return e.json({error:"Invalid skill ID"},400);const n=await e.env.DB.prepare("SELECT * FROM user_skills WHERE id = ? AND user_id = ?").bind(r,t.id).first();return n?e.json({skill:n}):e.json({error:"Skill not found"},404)});Je.put("/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));if(isNaN(r))return e.json({error:"Invalid skill ID"},400);const n=await e.req.json(),a=[],s=[];return n.name!==void 0&&(a.push("name = ?","slug = ?"),s.push(n.name.trim(),Jn(n.name))),n.description!==void 0&&(a.push("description = ?"),s.push(n.description.trim())),n.instructions!==void 0&&(a.push("instructions = ?"),s.push(n.instructions.trim())),n.parameters!==void 0&&(a.push("parameters = ?"),s.push(JSON.stringify(n.parameters))),n.required_tools!==void 0&&(a.push("required_tools = ?"),s.push(JSON.stringify(n.required_tools))),n.examples!==void 0&&(a.push("examples = ?"),s.push(JSON.stringify(n.examples))),n.enabled!==void 0&&(a.push("enabled = ?"),s.push(n.enabled?1:0)),a.length===0?e.json({error:"Nothing to update"},400):(a.push("updated_at = CURRENT_TIMESTAMP"),s.push(r,t.id),await e.env.DB.prepare(`UPDATE user_skills SET ${a.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),e.json({success:!0}))});Je.delete("/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return isNaN(r)?e.json({error:"Invalid skill ID"},400):(await e.env.DB.prepare("DELETE FROM user_skills WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0}))});const je=new he;async function Vs(e,t){var a;const r=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!n)return e.json({error:"Invalid session"},401);e.set("user",{id:n.user_id,username:n.username,name:n.name,pin_hash:n.pin_hash,role:n.role,personality_prompt:n.personality_prompt,telegram_chat_id:n.telegram_chat_id,timezone:n.timezone,assistant_name:n.assistant_name||"Karna",created_at:n.created_at,updated_at:n.updated_at}),e.set("sessionId",r),await t()}je.use("/*",Vs);function Zs(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}function Vn(e){const t=Zs(e),r=new Date(t);r.setDate(r.getDate()+1),r.setHours(9,0,0,0);const n=new Date(r.toLocaleString("en-US",{timeZone:"UTC"})),a=new Date(r.toLocaleString("en-US",{timeZone:e})),s=n.getTime()-a.getTime();return new Date(r.getTime()+s)}function Ht(e){if(!e)return null;if(e.startsWith("cron:")){const t=parseInt(e.replace("cron:",""),10);return isNaN(t)?null:t}return null}je.put("/:id/done",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),n=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(r,t.id).first();if(!n)return e.json({error:"Notification not found"},404);const a=Ht(n.source);return a&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0,cron_completed:a!==null})});je.post("/:id/snooze",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),n=await e.req.json(),a=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(r,t.id).first();if(!a)return e.json({error:"Notification not found"},404);let s;if(typeof n.minutes=="number")s=new Date(Date.now()+n.minutes*60*1e3);else if(n.until==="tomorrow_morning")s=Vn(t.timezone||"UTC");else if(n.new_time)s=new Date(n.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(s.getTime()))return e.json({error:"Invalid time"},400);const i=s.toISOString(),o=Ht(a.source);o&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(o,t.id).run();const l=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,a.title,a.body,"once",i,"reminder",JSON.stringify({description:a.body||""}),i,1,"active").first();return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0,job_id:l==null?void 0:l.id})});je.post("/:id/reschedule",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),{new_time:n}=await e.req.json();if(!n)return e.json({error:"new_time is required"},400);const a=new Date(n);if(isNaN(a.getTime()))return e.json({error:"Invalid time"},400);const s=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(r,t.id).first();if(!s)return e.json({error:"Notification not found"},404);const i=a.toISOString(),o=Ht(s.source);if(o)return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,o,t.id).run(),e.json({success:!0,job_id:o});const l=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,s.title,s.body,"once",i,"reminder",JSON.stringify({description:s.body||""}),i,1,"active").first();return e.json({success:!0,job_id:l==null?void 0:l.id})});je.delete("/:id/cancel",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),n=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(r,t.id).first();if(!n)return e.json({error:"Notification not found"},404);const a=Ht(n.source);return a&&await e.env.DB.prepare("UPDATE cron_jobs SET enabled = 0, state = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});je.post("/reminders/:id/snooze",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),n=await e.req.json();if(!await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(r,t.id).first())return e.json({error:"Reminder not found"},404);let s;if(typeof n.minutes=="number")s=new Date(Date.now()+n.minutes*60*1e3);else if(n.until_tomorrow_9am)s=Vn(t.timezone||"UTC");else if(n.new_time)s=new Date(n.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(s.getTime()))return e.json({error:"Invalid time"},400);const i=s.toISOString();return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,r,t.id).run(),e.json({success:!0})});je.post("/reminders/:id/done",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(r,t.id).first()?(await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE source = ? AND user_id = ?").bind(`cron:${r}`,t.id).run(),e.json({success:!0})):e.json({error:"Reminder not found"},404)});const Oe=new he;async function Xs(e,t){var a;const r=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!n)return e.json({error:"Invalid session"},401);e.set("user",{id:n.user_id,username:n.username,name:n.name,pin_hash:n.pin_hash,role:n.role,personality_prompt:n.personality_prompt,telegram_chat_id:n.telegram_chat_id,timezone:n.timezone,assistant_name:n.assistant_name||"Karna",created_at:n.created_at,updated_at:n.updated_at}),e.set("sessionId",r),await t()}Oe.use("/*",Xs);Oe.get("/",async e=>{const t=e.get("user"),r=e.req.query("status"),n=e.req.query("search"),a=["user_id = ?"],s=[t.id];r&&(a.push("status = ?"),s.push(r)),n&&(a.push("(name LIKE ? OR summary LIKE ?)"),s.push(`%${n}%`,`%${n}%`));const i=`SELECT * FROM document_library WHERE ${a.join(" AND ")} ORDER BY created_at DESC`,o=await e.env.DB.prepare(i).bind(...s).all();return e.json({documents:o.results||[]})});Oe.get("/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),n=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(r,t.id).first();return n?e.json({document:n}):e.json({error:"Document not found"},404)});Oe.post("/upload",async e=>{const t=e.get("user"),r=!!e.env.DOCUMENTS_BUCKET,n=r?100*1024*1024:700*1024;try{const s=(await e.req.formData()).get("file");if(!s)return e.json({error:"No file provided."},400);const i=s.name,o=s.type||"application/octet-stream",l=s.size;if(l>n)return e.json({error:`File too large (max ${r?"100 MB":"700 KB"}). Try sharing a Google Drive link instead.`},400);const d=await s.arrayBuffer(),c=crypto.randomUUID();let m;r?(await e.env.DOCUMENTS_BUCKET.put(c,d,{httpMetadata:{contentType:o},customMetadata:{fileName:i,userId:String(t.id)}}),m="r2"):m=Buffer.from(d).toString("base64"),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(c,t.id,i,o,m,l).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,c,"upload",i,o,l,"uploaded").run();const h=o==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||i.toLowerCase().endsWith(".docx");if(h)try{const{extractDocxTextFromBuffer:f}=await Promise.resolve().then(()=>On),_=await f(Buffer.from(d));if(_.length>50){await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(_,c).run();const v=_.substring(0,600);await e.env.DB.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(v,_.substring(0,5e4),c,t.id).run()}}catch{}const b=o==="application/pdf"||i.toLowerCase().endsWith(".pdf");if(b&&t.pin_hash){const f=Buffer.from(d).toString("base64"),_=t.pin_hash,v=t.id,x=e.env.DB,E=e.env.DOCUMENTS_BUCKET,O=(async()=>{var A,B;try{let G=null,F="claude-haiku-4-5-20251001";const{decrypt:j}=await Promise.resolve().then(()=>Pt);for(const u of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const y=await x.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(v,u).first();if(y){const p=await j(y.encrypted_value,_),g=JSON.parse(p);if(g.provider==="anthropic"){G=g.apiKey,g.model&&(F=g.model);break}}}catch{}if(!G)return;let W=f;if(m==="r2"&&E){const u=await E.get(c);if(!u)return;W=Buffer.from(await u.arrayBuffer()).toString("base64")}const q=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":G,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:F,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:W}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!q.ok)return;const H=((B=(A=(await q.json()).content)==null?void 0:A[0])==null?void 0:B.text)||"";if(H){await x.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(H,c).run();const u=H.substring(0,600);await x.prepare("UPDATE document_library SET summary = ?, extracted_text = ?, status = 'parsed', updated_at = CURRENT_TIMESTAMP WHERE file_id = ? AND user_id = ?").bind(u,H.substring(0,5e4),c,v).run()}}catch{}})();try{e.executionCtx.waitUntil(O)}catch{}}return e.json({file_id:c,name:i,type:o,size:l,storage:r?"r2":"d1",extracting:b&&!h})}catch(a){return console.error("Document upload error:",a),e.json({error:`Upload failed: ${a.message||"Unknown error"}`},500)}});Oe.post("/",async e=>{const t=e.get("user"),r=await e.req.json();if(!r.name||typeof r.name!="string")return e.json({error:"name is required"},400);const n=r.source||"upload",a=r.mime_type||"application/octet-stream",s=typeof r.size=="number"?r.size:0,i=await e.env.DB.prepare(`INSERT INTO document_library (user_id, name, source, file_id, drive_file_id, mime_type, size, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,r.name,n,r.file_id||null,r.drive_file_id||null,a,s,"uploaded").first();return e.json({success:!0,document:i})});Oe.post("/:id/summarize",async e=>{var d;const t=e.get("user"),r=parseInt(e.req.param("id")),n=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(r,t.id).first();if(!n)return e.json({error:"Document not found"},404);let a=null;if(n.file_id){const c=await e.env.DB.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(n.file_id,t.id).first();a=(c==null?void 0:c.extracted_text)||null}let s=null;if(a)try{const{provider:c}=await ct(e.env.DB,t.id,t.pin_hash);s=((d=(await c.chat([{role:"system",content:"You are a helpful assistant that summarizes documents concisely."},{role:"user",content:`Summarize the following document in a few paragraphs:

${a.substring(0,8e3)}`}],{maxTokens:1024})).content)==null?void 0:d.trim())||null}catch{s=null}const i=s||"Summary not yet generated. Ask Karna in chat to summarize this document.";await e.env.DB.prepare("UPDATE document_library SET status = ?, summary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("summarized",i,r,t.id).run();const l=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(r,t.id).first();return e.json({success:!0,document:l})});Oe.delete("/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM document_library WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});Oe.post("/:id/parse",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));await e.env.DB.prepare("UPDATE document_library SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("parsed",r,t.id).run();const n=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(r,t.id).first();return e.json({success:!0,document:n})});const ge=new he;async function Qs(e,t){var a;const r=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!n)return e.json({error:"Invalid session"},401);e.set("user",{id:n.user_id,username:n.username,name:n.name,pin_hash:n.pin_hash,role:n.role,personality_prompt:n.personality_prompt,telegram_chat_id:n.telegram_chat_id,timezone:n.timezone,assistant_name:n.assistant_name||"Karna",created_at:n.created_at,updated_at:n.updated_at}),e.set("sessionId",r),await t()}ge.use("/*",Qs);ge.get("/review",async e=>{const t=e.get("user"),r=e.req.query("tier"),n=e.req.query("type"),a=e.req.query("search"),s=parseInt(e.req.query("limit")||"50");let i="SELECT * FROM memory WHERE user_id = ?";const o=[t.id];r&&(i+=" AND tier = ?",o.push(r)),n&&(i+=" AND type = ?",o.push(n)),a&&(i+=" AND (title LIKE ? OR content LIKE ?)",o.push(`%${a}%`,`%${a}%`)),i+=" ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?",o.push(s);const l=await e.env.DB.prepare(i).bind(...o).all(),d=await e.env.DB.prepare("SELECT tier, COUNT(*) as cnt FROM memory WHERE user_id = ? GROUP BY tier").bind(t.id).all(),c={working:0,long_term:0};for(const m of d.results||[])c[m.tier]=m.cnt;return e.json({memories:l.results||[],tier_counts:c})});ge.put("/review/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),n=await e.req.json(),a=[],s=[];return n.title!==void 0&&(a.push("title = ?"),s.push(n.title)),n.content!==void 0&&(a.push("content = ?"),s.push(n.content)),n.importance!==void 0&&(a.push("importance = ?"),s.push(n.importance)),n.tier!==void 0&&(a.push("tier = ?"),s.push(n.tier)),a.length===0?e.json({error:"Nothing to update"},400):(a.push("updated_at = CURRENT_TIMESTAMP"),s.push(r,t.id),await e.env.DB.prepare(`UPDATE memory SET ${a.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),e.json({success:!0}))});ge.post("/review/:id/promote",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await new Y(e.env.DB).promote(r,t.id),e.json({success:!0})});ge.post("/review/:id/demote",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await new Y(e.env.DB).demote(r,t.id),e.json({success:!0})});ge.delete("/review/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await new Y(e.env.DB).remove(r,t.id),e.json({success:!0})});ge.get("/suggestions",async e=>{const t=e.get("user"),r=e.req.query("status")||"pending",n=parseInt(e.req.query("limit")||"50"),a=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT ?").bind(t.id,r,n).all();return e.json({suggestions:a.results||[]})});ge.post("/suggestions/:id/accept",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),n=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(r,t.id).first();return n?(await new Y(e.env.DB).store(t.id,n.type,n.title,n.content,n.importance,"long_term"),await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'accepted', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});ge.post("/suggestions/:id/reject",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT id FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(r,t.id).first()?(await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'rejected', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});ge.post("/suggestions",async e=>{const t=e.get("user"),{type:r,title:n,content:a,importance:s,source_message_id:i}=await e.req.json();if(!r||!n||!a)return e.json({error:"type, title, and content are required"},400);const o=await e.env.DB.prepare("INSERT INTO memory_suggestions (user_id, type, title, content, importance, status, source_message_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id").bind(t.id,r,n,a,s??5,"pending",i||null).first();return e.json({success:!0,id:o==null?void 0:o.id})});ge.post("/migrate-documents-out",async e=>{const t=e.get("user"),n=(await e.env.DB.prepare(`
    SELECT id, type, title, content, importance
    FROM memory
    WHERE user_id = ?
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
  `).bind(t.id).all()).results||[];if(n.length===0)return e.json({migrated:0,skipped:0,samples:[],message:"No oversized memory entries found."});let a=0,s=0;const i=[];for(const o of n){const l=o.content.length>1500,d=/\b(essay|article|draft|report|chapter)\b/i.test(o.content)&&o.content.length>500;if(!l&&!d){s++;continue}try{const c=o.content.substring(0,500),m=o.content.substring(0,5e4);await e.env.DB.prepare(`
        INSERT INTO document_library (user_id, source, name, summary, extracted_text, status)
        VALUES (?, 'memory_migration', ?, ?, ?, 'parsed')
      `).bind(t.id,o.title,c,m).run();const h=`[Migrated to Document Library] ${o.title} — content moved to Document Library. Search for it with search_library("${o.title.substring(0,40)}").`;await e.env.DB.prepare("UPDATE memory SET content = ?, importance = 4, tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(h,o.id,t.id).run(),a++,i.length<5&&i.push({id:o.id,title:o.title,action:"migrated to document_library, memory demoted to pointer"})}catch{s++}}return e.json({migrated:a,skipped:s,samples:i,message:`Moved ${a} bulky memory entries to Document Library. ${s} entries were skipped (too short or migration error).`})});const me=new he;me.use("/api/*",Ma());me.route("/api/auth",Be);me.route("/api/chat",re);me.route("/api/settings",X);me.route("/api/system",Re);me.route("/api/telegram",Dt);me.route("/api/proactive",oe);me.route("/api/skills",Je);me.route("/api/notifications",je);me.route("/api/documents",Oe);me.route("/api/memory",ge);me.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),r=t.searchParams.get("code"),n=t.searchParams.get("state"),a=t.searchParams.get("error");if(a)return e.html(Ze(!1,`Google denied access: ${a}`));if(!r||!n)return e.html(Ze(!1,"Missing authorization code or state parameter."));try{const i=JSON.parse(atob(n)).sessionId;if(!i)return e.html(Ze(!1,"Invalid state parameter — missing session."));const o=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(i).first();if(!o)return e.html(Ze(!1,"Session expired. Please log in again and retry."));const l=o.user_id,d=o.pin_hash,c=`${t.protocol}//${t.host}/auth/google/callback`,m=await mn(e.env.DB,l,d,r,c,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(Ze(!0,`Connected as ${m.email}`,m.email))}catch(s){return e.html(Ze(!1,`OAuth failed: ${s.message}`))}});me.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(Xr())));me.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(Xr())));function Ze(e,t,r){return`<!DOCTYPE html>
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
</body></html>`}async function ei(e,t,r){const n="https://karna-5xs.pages.dev",s={"Content-Type":"application/json","X-Cron-Secret":t.CRON_SECRET||"karna-cron-default-v1"};try{const o=await(await fetch(`${n}/api/system/cron/execute`,{method:"POST",headers:s})).json();if(o.results&&o.results.length>0){const d=o.results.filter(m=>m.needs_agent&&m.status==="dispatched");if(d.length>0){const m=d.map(h=>fetch(`${n}/api/system/cron/run-task/${h.job_id}`,{method:"POST",headers:s}).then(b=>b.json()).catch(b=>({job_id:h.job_id,error:b.message})));r.waitUntil(Promise.allSettled(m).then(h=>{console.log(`Cron: ${o.executed} dispatched, ${d.length} agent tasks`,JSON.stringify(h.map(b=>b.status==="fulfilled"?b.value:b.reason)))}))}const c=o.results.filter(m=>!m.needs_agent&&m.status==="dispatched");if(c.length>0){const m=c.map(h=>fetch(`${n}/api/system/cron/run-task/${h.job_id}`,{method:"POST",headers:s}).catch(()=>{}));r.waitUntil(Promise.allSettled(m))}}r.waitUntil(fetch(`${n}/api/proactive/cron/evening-briefing`,{method:"POST",headers:s}).then(d=>d.json()).then(d=>{d.executed>0&&console.log("Evening briefing result:",JSON.stringify(d))}).catch(d=>{console.error("Evening briefing error:",d.message)})),new Date().getMinutes()%5<2&&r.waitUntil(fetch(`${n}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:s}).then(d=>d.json()).then(d=>{var c;(c=d.results)!=null&&c.some(m=>m.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(d))}).catch(()=>{}))}catch(i){console.error("Scheduled cron error:",i.message||i)}}const ti={fetch:me.fetch,scheduled:ei},Ir=new he,ri=Object.assign({"/src/index.tsx":ti});let Zn=!1;for(const[,e]of Object.entries(ri))e&&(Ir.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Ir.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Zn=!0);if(!Zn)throw new Error("Can't import modules from ['/src/index.tsx']");export{Ir as default};
