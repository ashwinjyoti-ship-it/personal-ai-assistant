var Qa=Object.defineProperty;var pn=e=>{throw TypeError(e)};var er=(e,t,n)=>t in e?Qa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var A=(e,t,n)=>er(e,typeof t!="symbol"?t+"":t,n),Ht=(e,t,n)=>t.has(e)||pn("Cannot "+n);var k=(e,t,n)=>(Ht(e,t,"read from private field"),n?n.call(e):t.get(e)),G=(e,t,n)=>t.has(e)?pn("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),j=(e,t,n,a)=>(Ht(e,t,"write to private field"),a?a.call(e,n):t.set(e,n),n),V=(e,t,n)=>(Ht(e,t,"access private method"),n);var hn=(e,t,n,a)=>({set _(r){j(e,t,r,n)},get _(){return k(e,t,a)}});var gn=(e,t,n)=>(a,r)=>{let s=-1;return i(0);async function i(o){if(o<=s)throw new Error("next() called multiple times");s=o;let l,d=!1,c;if(e[o]?(c=e[o][0][0],a.req.routeIndex=o):c=o===e.length&&r||void 0,c)try{l=await c(a,()=>i(o+1))}catch(m){if(m instanceof Error&&t)a.error=m,l=await t(m,a),d=!0;else throw m}else a.finalized===!1&&n&&(l=await n(a));return l&&(a.finalized===!1||d)&&(a.res=l),a}},tr=Symbol(),nr=async(e,t=Object.create(null))=>{const{all:n=!1,dot:a=!1}=t,s=(e instanceof Wn?e.raw.headers:e.headers).get("Content-Type");return s!=null&&s.startsWith("multipart/form-data")||s!=null&&s.startsWith("application/x-www-form-urlencoded")?ar(e,{all:n,dot:a}):{}};async function ar(e,t){const n=await e.formData();return n?rr(n,t):{}}function rr(e,t){const n=Object.create(null);return e.forEach((a,r)=>{t.all||r.endsWith("[]")?sr(n,r,a):n[r]=a}),t.dot&&Object.entries(n).forEach(([a,r])=>{a.includes(".")&&(ir(n,a,r),delete n[a])}),n}var sr=(e,t,n)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]:t.endsWith("[]")?e[t]=[n]:e[t]=n},ir=(e,t,n)=>{let a=e;const r=t.split(".");r.forEach((s,i)=>{i===r.length-1?a[s]=n:((!a[s]||typeof a[s]!="object"||Array.isArray(a[s])||a[s]instanceof File)&&(a[s]=Object.create(null)),a=a[s])})},Pn=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},or=e=>{const{groups:t,path:n}=lr(e),a=Pn(n);return dr(a,t)},lr=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(n,a)=>{const r=`@${a}`;return t.push([r,n]),r}),{groups:t,path:e}},dr=(e,t)=>{for(let n=t.length-1;n>=0;n--){const[a]=t[n];for(let r=e.length-1;r>=0;r--)if(e[r].includes(a)){e[r]=e[r].replace(a,t[n][1]);break}}return e},Ot={},cr=(e,t)=>{if(e==="*")return"*";const n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const a=`${e}#${t}`;return Ot[a]||(n[2]?Ot[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,n[1],new RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],new RegExp(`^${n[2]}$`)]:Ot[a]=[e,n[1],!0]),Ot[a]}return null},tn=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return t(n)}catch{return n}})}},ur=e=>tn(e,decodeURI),Un=e=>{const t=e.url,n=t.indexOf("/",t.indexOf(":")+4);let a=n;for(;a<t.length;a++){const r=t.charCodeAt(a);if(r===37){const s=t.indexOf("?",a),i=t.indexOf("#",a),o=s===-1?i===-1?void 0:i:i===-1?s:Math.min(s,i),l=t.slice(n,o);return ur(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(r===63||r===35)break}return t.slice(n,a)},mr=e=>{const t=Un(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Qe=(e,t,...n)=>(n.length&&(t=Qe(t,...n)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Hn=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),n=[];let a="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))a+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){n.length===0&&a===""?n.push("/"):n.push(a);const s=r.replace("?","");a+="/"+s,n.push(a)}else a+="/"+r}),n.filter((r,s,i)=>i.indexOf(r)===s)},Ft=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?tn(e,Gn):e):e,Fn=(e,t,n)=>{let a;if(!n&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const o=e.charCodeAt(i+t.length+1);if(o===61){const l=i+t.length+2,d=e.indexOf("&",l);return Ft(e.slice(l,d===-1?void 0:d))}else if(o==38||isNaN(o))return"";i=e.indexOf(`&${t}`,i+1)}if(a=/[%+]/.test(e),!a)return}const r={};a??(a=/[%+]/.test(e));let s=e.indexOf("?",8);for(;s!==-1;){const i=e.indexOf("&",s+1);let o=e.indexOf("=",s);o>i&&i!==-1&&(o=-1);let l=e.slice(s+1,o===-1?i===-1?void 0:i:o);if(a&&(l=Ft(l)),s=i,l==="")continue;let d;o===-1?d="":(d=e.slice(o+1,i===-1?void 0:i),a&&(d=Ft(d))),n?(r[l]&&Array.isArray(r[l])||(r[l]=[]),r[l].push(d)):r[l]??(r[l]=d)}return t?r[t]:r},pr=Fn,hr=(e,t)=>Fn(e,t,!0),Gn=decodeURIComponent,fn=e=>tn(e,Gn),at,he,Re,qn,zn,Jt,Ce,An,Wn=(An=class{constructor(e,t="/",n=[[]]){G(this,Re);A(this,"raw");G(this,at);G(this,he);A(this,"routeIndex",0);A(this,"path");A(this,"bodyCache",{});G(this,Ce,e=>{const{bodyCache:t,raw:n}=this,a=t[e];if(a)return a;const r=Object.keys(t)[0];return r?t[r].then(s=>(r==="json"&&(s=JSON.stringify(s)),new Response(s)[e]())):t[e]=n[e]()});this.raw=e,this.path=t,j(this,he,n),j(this,at,{})}param(e){return e?V(this,Re,qn).call(this,e):V(this,Re,zn).call(this)}query(e){return pr(this.url,e)}queries(e){return hr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((n,a)=>{t[a]=n}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await nr(this,e))}json(){return k(this,Ce).call(this,"text").then(e=>JSON.parse(e))}text(){return k(this,Ce).call(this,"text")}arrayBuffer(){return k(this,Ce).call(this,"arrayBuffer")}blob(){return k(this,Ce).call(this,"blob")}formData(){return k(this,Ce).call(this,"formData")}addValidatedData(e,t){k(this,at)[e]=t}valid(e){return k(this,at)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[tr](){return k(this,he)}get matchedRoutes(){return k(this,he)[0].map(([[,e]])=>e)}get routePath(){return k(this,he)[0].map(([[,e]])=>e)[this.routeIndex].path}},at=new WeakMap,he=new WeakMap,Re=new WeakSet,qn=function(e){const t=k(this,he)[0][this.routeIndex][1][e],n=V(this,Re,Jt).call(this,t);return n&&/\%/.test(n)?fn(n):n},zn=function(){const e={},t=Object.keys(k(this,he)[0][this.routeIndex][1]);for(const n of t){const a=V(this,Re,Jt).call(this,k(this,he)[0][this.routeIndex][1][n]);a!==void 0&&(e[n]=/\%/.test(a)?fn(a):a)}return e},Jt=function(e){return k(this,he)[1]?k(this,he)[1][e]:e},Ce=new WeakMap,An),gr={Stringify:1},Kn=async(e,t,n,a,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const s=e.callbacks;return s!=null&&s.length?(r?r[0]+=e:r=[e],Promise.all(s.map(o=>o({phase:t,buffer:r,context:a}))).then(o=>Promise.all(o.filter(Boolean).map(l=>Kn(l,t,!1,a,r))).then(()=>r[0]))):Promise.resolve(e)},fr="text/plain; charset=UTF-8",Gt=(e,t)=>({"Content-Type":e,...t}),_t,Et,Se,rt,xe,ue,Tt,st,it,Ge,St,xt,Ne,et,Ln,yr=(Ln=class{constructor(e,t){G(this,Ne);G(this,_t);G(this,Et);A(this,"env",{});G(this,Se);A(this,"finalized",!1);A(this,"error");G(this,rt);G(this,xe);G(this,ue);G(this,Tt);G(this,st);G(this,it);G(this,Ge);G(this,St);G(this,xt);A(this,"render",(...e)=>(k(this,st)??j(this,st,t=>this.html(t)),k(this,st).call(this,...e)));A(this,"setLayout",e=>j(this,Tt,e));A(this,"getLayout",()=>k(this,Tt));A(this,"setRenderer",e=>{j(this,st,e)});A(this,"header",(e,t,n)=>{this.finalized&&j(this,ue,new Response(k(this,ue).body,k(this,ue)));const a=k(this,ue)?k(this,ue).headers:k(this,Ge)??j(this,Ge,new Headers);t===void 0?a.delete(e):n!=null&&n.append?a.append(e,t):a.set(e,t)});A(this,"status",e=>{j(this,rt,e)});A(this,"set",(e,t)=>{k(this,Se)??j(this,Se,new Map),k(this,Se).set(e,t)});A(this,"get",e=>k(this,Se)?k(this,Se).get(e):void 0);A(this,"newResponse",(...e)=>V(this,Ne,et).call(this,...e));A(this,"body",(e,t,n)=>V(this,Ne,et).call(this,e,t,n));A(this,"text",(e,t,n)=>!k(this,Ge)&&!k(this,rt)&&!t&&!n&&!this.finalized?new Response(e):V(this,Ne,et).call(this,e,t,Gt(fr,n)));A(this,"json",(e,t,n)=>V(this,Ne,et).call(this,JSON.stringify(e),t,Gt("application/json",n)));A(this,"html",(e,t,n)=>{const a=r=>V(this,Ne,et).call(this,r,t,Gt("text/html; charset=UTF-8",n));return typeof e=="object"?Kn(e,gr.Stringify,!1,{}).then(a):a(e)});A(this,"redirect",(e,t)=>{const n=String(e);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)});A(this,"notFound",()=>(k(this,it)??j(this,it,()=>new Response),k(this,it).call(this,this)));j(this,_t,e),t&&(j(this,xe,t.executionCtx),this.env=t.env,j(this,it,t.notFoundHandler),j(this,xt,t.path),j(this,St,t.matchResult))}get req(){return k(this,Et)??j(this,Et,new Wn(k(this,_t),k(this,xt),k(this,St))),k(this,Et)}get event(){if(k(this,xe)&&"respondWith"in k(this,xe))return k(this,xe);throw Error("This context has no FetchEvent")}get executionCtx(){if(k(this,xe))return k(this,xe);throw Error("This context has no ExecutionContext")}get res(){return k(this,ue)||j(this,ue,new Response(null,{headers:k(this,Ge)??j(this,Ge,new Headers)}))}set res(e){if(k(this,ue)&&e){e=new Response(e.body,e);for(const[t,n]of k(this,ue).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=k(this,ue).headers.getSetCookie();e.headers.delete("set-cookie");for(const r of a)e.headers.append("set-cookie",r)}else e.headers.set(t,n)}j(this,ue,e),this.finalized=!0}get var(){return k(this,Se)?Object.fromEntries(k(this,Se)):{}}},_t=new WeakMap,Et=new WeakMap,Se=new WeakMap,rt=new WeakMap,xe=new WeakMap,ue=new WeakMap,Tt=new WeakMap,st=new WeakMap,it=new WeakMap,Ge=new WeakMap,St=new WeakMap,xt=new WeakMap,Ne=new WeakSet,et=function(e,t,n){const a=k(this,ue)?new Headers(k(this,ue).headers):k(this,Ge)??new Headers;if(typeof t=="object"&&"headers"in t){const s=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,o]of s)i.toLowerCase()==="set-cookie"?a.append(i,o):a.set(i,o)}if(n)for(const[s,i]of Object.entries(n))if(typeof i=="string")a.set(s,i);else{a.delete(s);for(const o of i)a.append(s,o)}const r=typeof t=="number"?t:(t==null?void 0:t.status)??k(this,rt);return new Response(e,{status:r,headers:a})},Ln),ae="ALL",vr="all",wr=["get","post","put","delete","options","patch"],Yn="Can not add a route since the matcher is already built.",Jn=class extends Error{},br="__COMPOSED_HANDLER",_r=e=>e.text("404 Not Found",404),yn=(e,t)=>{if("getResponse"in e){const n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text("Internal Server Error",500)},ge,re,Vn,fe,He,Ct,Nt,ot,Er=(ot=class{constructor(t={}){G(this,re);A(this,"get");A(this,"post");A(this,"put");A(this,"delete");A(this,"options");A(this,"patch");A(this,"all");A(this,"on");A(this,"use");A(this,"router");A(this,"getPath");A(this,"_basePath","/");G(this,ge,"/");A(this,"routes",[]);G(this,fe,_r);A(this,"errorHandler",yn);A(this,"onError",t=>(this.errorHandler=t,this));A(this,"notFound",t=>(j(this,fe,t),this));A(this,"fetch",(t,...n)=>V(this,re,Nt).call(this,t,n[1],n[0],t.method));A(this,"request",(t,n,a,r)=>t instanceof Request?this.fetch(n?new Request(t,n):t,a,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Qe("/",t)}`,n),a,r)));A(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(V(this,re,Nt).call(this,t.request,t,void 0,t.request.method))})});[...wr,vr].forEach(s=>{this[s]=(i,...o)=>(typeof i=="string"?j(this,ge,i):V(this,re,He).call(this,s,k(this,ge),i),o.forEach(l=>{V(this,re,He).call(this,s,k(this,ge),l)}),this)}),this.on=(s,i,...o)=>{for(const l of[i].flat()){j(this,ge,l);for(const d of[s].flat())o.map(c=>{V(this,re,He).call(this,d.toUpperCase(),k(this,ge),c)})}return this},this.use=(s,...i)=>(typeof s=="string"?j(this,ge,s):(j(this,ge,"*"),i.unshift(s)),i.forEach(o=>{V(this,re,He).call(this,ae,k(this,ge),o)}),this);const{strict:a,...r}=t;Object.assign(this,r),this.getPath=a??!0?t.getPath??Un:mr}route(t,n){const a=this.basePath(t);return n.routes.map(r=>{var i;let s;n.errorHandler===yn?s=r.handler:(s=async(o,l)=>(await gn([],n.errorHandler)(o,()=>r.handler(o,l))).res,s[br]=r.handler),V(i=a,re,He).call(i,r.method,r.path,s)}),this}basePath(t){const n=V(this,re,Vn).call(this);return n._basePath=Qe(this._basePath,t),n}mount(t,n,a){let r,s;a&&(typeof a=="function"?s=a:(s=a.optionHandler,a.replaceRequest===!1?r=l=>l:r=a.replaceRequest));const i=s?l=>{const d=s(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};r||(r=(()=>{const l=Qe(this._basePath,t),d=l==="/"?0:l.length;return c=>{const m=new URL(c.url);return m.pathname=m.pathname.slice(d)||"/",new Request(m,c)}})());const o=async(l,d)=>{const c=await n(r(l.req.raw),...i(l));if(c)return c;await d()};return V(this,re,He).call(this,ae,Qe(t,"*"),o),this}},ge=new WeakMap,re=new WeakSet,Vn=function(){const t=new ot({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,j(t,fe,k(this,fe)),t.routes=this.routes,t},fe=new WeakMap,He=function(t,n,a){t=t.toUpperCase(),n=Qe(this._basePath,n);const r={basePath:this._basePath,path:n,method:t,handler:a};this.router.add(t,n,[a,r]),this.routes.push(r)},Ct=function(t,n){if(t instanceof Error)return this.errorHandler(t,n);throw t},Nt=function(t,n,a,r){if(r==="HEAD")return(async()=>new Response(null,await V(this,re,Nt).call(this,t,n,a,"GET")))();const s=this.getPath(t,{env:a}),i=this.router.match(r,s),o=new yr(t,{path:s,matchResult:i,env:a,executionCtx:n,notFoundHandler:k(this,fe)});if(i[0].length===1){let d;try{d=i[0][0][0][0](o,async()=>{o.res=await k(this,fe).call(this,o)})}catch(c){return V(this,re,Ct).call(this,c,o)}return d instanceof Promise?d.then(c=>c||(o.finalized?o.res:k(this,fe).call(this,o))).catch(c=>V(this,re,Ct).call(this,c,o)):d??k(this,fe).call(this,o)}const l=gn(i[0],this.errorHandler,k(this,fe));return(async()=>{try{const d=await l(o);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return V(this,re,Ct).call(this,d,o)}})()},ot),Zn=[];function Tr(e,t){const n=this.buildAllMatchers(),a=((r,s)=>{const i=n[r]||n[ae],o=i[2][s];if(o)return o;const l=s.match(i[0]);if(!l)return[[],Zn];const d=l.indexOf("",1);return[i[1][d],l]});return this.match=a,a(e,t)}var At="[^/]+",yt=".*",vt="(?:|/.*)",tt=Symbol(),Sr=new Set(".\\+*[^]$()");function xr(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===yt||e===vt?1:t===yt||t===vt?-1:e===At?1:t===At?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var We,qe,ye,Ye,kr=(Ye=class{constructor(){G(this,We);G(this,qe);G(this,ye,Object.create(null))}insert(t,n,a,r,s){if(t.length===0){if(k(this,We)!==void 0)throw tt;if(s)return;j(this,We,n);return}const[i,...o]=t,l=i==="*"?o.length===0?["","",yt]:["","",At]:i==="/*"?["","",vt]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const c=l[1];let m=l[2]||At;if(c&&l[2]&&(m===".*"||(m=m.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(m))))throw tt;if(d=k(this,ye)[m],!d){if(Object.keys(k(this,ye)).some(h=>h!==yt&&h!==vt))throw tt;if(s)return;d=k(this,ye)[m]=new Ye,c!==""&&j(d,qe,r.varIndex++)}!s&&c!==""&&a.push([c,k(d,qe)])}else if(d=k(this,ye)[i],!d){if(Object.keys(k(this,ye)).some(c=>c.length>1&&c!==yt&&c!==vt))throw tt;if(s)return;d=k(this,ye)[i]=new Ye}d.insert(o,n,a,r,s)}buildRegExpStr(){const n=Object.keys(k(this,ye)).sort(xr).map(a=>{const r=k(this,ye)[a];return(typeof k(r,qe)=="number"?`(${a})@${k(r,qe)}`:Sr.has(a)?`\\${a}`:a)+r.buildRegExpStr()});return typeof k(this,We)=="number"&&n.unshift(`#${k(this,We)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},We=new WeakMap,qe=new WeakMap,ye=new WeakMap,Ye),$t,kt,Mn,Dr=(Mn=class{constructor(){G(this,$t,{varIndex:0});G(this,kt,new kr)}insert(e,t,n){const a=[],r=[];for(let i=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${i}`;return r[i]=[d,l],i++,o=!0,d}),!o)break}const s=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=r.length-1;i>=0;i--){const[o]=r[i];for(let l=s.length-1;l>=0;l--)if(s[l].indexOf(o)!==-1){s[l]=s[l].replace(o,r[i][1]);break}}return k(this,kt).insert(s,t,a,k(this,$t),n),a}buildRegExp(){let e=k(this,kt).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const n=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,s,i)=>s!==void 0?(n[++t]=Number(s),"$()"):(i!==void 0&&(a[Number(i)]=++t),"")),[new RegExp(`^${e}`),n,a]}},$t=new WeakMap,kt=new WeakMap,Mn),Rr=[/^$/,[],Object.create(null)],It=Object.create(null);function Xn(e){return It[e]??(It[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Or(){It=Object.create(null)}function Cr(e){var d;const t=new Dr,n=[];if(e.length===0)return Rr;const a=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,m],[h,w])=>c?1:h?-1:m.length-w.length),r=Object.create(null);for(let c=0,m=-1,h=a.length;c<h;c++){const[w,f,_]=a[c];w?r[f]=[_.map(([S])=>[S,Object.create(null)]),Zn]:m++;let y;try{y=t.insert(f,m,w)}catch(S){throw S===tt?new Jn(f):S}w||(n[m]=_.map(([S,E])=>{const R=Object.create(null);for(E-=1;E>=0;E--){const[N,M]=y[E];R[N]=M}return[S,R]}))}const[s,i,o]=t.buildRegExp();for(let c=0,m=n.length;c<m;c++)for(let h=0,w=n[c].length;h<w;h++){const f=(d=n[c][h])==null?void 0:d[1];if(!f)continue;const _=Object.keys(f);for(let y=0,S=_.length;y<S;y++)f[_[y]]=o[f[_[y]]]}const l=[];for(const c in i)l[c]=n[i[c]];return[s,l,r]}function Ze(e,t){if(e){for(const n of Object.keys(e).sort((a,r)=>r.length-a.length))if(Xn(n).test(t))return[...e[n]]}}var Ie,Ae,Bt,Qn,$n,Nr=($n=class{constructor(){G(this,Bt);A(this,"name","RegExpRouter");G(this,Ie);G(this,Ae);A(this,"match",Tr);j(this,Ie,{[ae]:Object.create(null)}),j(this,Ae,{[ae]:Object.create(null)})}add(e,t,n){var o;const a=k(this,Ie),r=k(this,Ae);if(!a||!r)throw new Error(Yn);a[e]||[a,r].forEach(l=>{l[e]=Object.create(null),Object.keys(l[ae]).forEach(d=>{l[e][d]=[...l[ae][d]]})}),t==="/*"&&(t="*");const s=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=Xn(t);e===ae?Object.keys(a).forEach(d=>{var c;(c=a[d])[t]||(c[t]=Ze(a[d],t)||Ze(a[ae],t)||[])}):(o=a[e])[t]||(o[t]=Ze(a[e],t)||Ze(a[ae],t)||[]),Object.keys(a).forEach(d=>{(e===ae||e===d)&&Object.keys(a[d]).forEach(c=>{l.test(c)&&a[d][c].push([n,s])})}),Object.keys(r).forEach(d=>{(e===ae||e===d)&&Object.keys(r[d]).forEach(c=>l.test(c)&&r[d][c].push([n,s]))});return}const i=Hn(t)||[t];for(let l=0,d=i.length;l<d;l++){const c=i[l];Object.keys(r).forEach(m=>{var h;(e===ae||e===m)&&((h=r[m])[c]||(h[c]=[...Ze(a[m],c)||Ze(a[ae],c)||[]]),r[m][c].push([n,s-d+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(k(this,Ae)).concat(Object.keys(k(this,Ie))).forEach(t=>{e[t]||(e[t]=V(this,Bt,Qn).call(this,t))}),j(this,Ie,j(this,Ae,void 0)),Or(),e}},Ie=new WeakMap,Ae=new WeakMap,Bt=new WeakSet,Qn=function(e){const t=[];let n=e===ae;return[k(this,Ie),k(this,Ae)].forEach(a=>{const r=a[e]?Object.keys(a[e]).map(s=>[s,a[e][s]]):[];r.length!==0?(n||(n=!0),t.push(...r)):e!==ae&&t.push(...Object.keys(a[ae]).map(s=>[s,a[ae][s]]))}),n?Cr(t):null},$n),Le,ke,Bn,Ir=(Bn=class{constructor(e){A(this,"name","SmartRouter");G(this,Le,[]);G(this,ke,[]);j(this,Le,e.routers)}add(e,t,n){if(!k(this,ke))throw new Error(Yn);k(this,ke).push([e,t,n])}match(e,t){if(!k(this,ke))throw new Error("Fatal error");const n=k(this,Le),a=k(this,ke),r=n.length;let s=0,i;for(;s<r;s++){const o=n[s];try{for(let l=0,d=a.length;l<d;l++)o.add(...a[l]);i=o.match(e,t)}catch(l){if(l instanceof Jn)continue;throw l}this.match=o.match.bind(o),j(this,Le,[o]),j(this,ke,void 0);break}if(s===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(k(this,ke)||k(this,Le).length!==1)throw new Error("No active router has been determined yet.");return k(this,Le)[0]}},Le=new WeakMap,ke=new WeakMap,Bn),ht=Object.create(null),Me,le,ze,lt,ie,De,Fe,dt,Ar=(dt=class{constructor(t,n,a){G(this,De);G(this,Me);G(this,le);G(this,ze);G(this,lt,0);G(this,ie,ht);if(j(this,le,a||Object.create(null)),j(this,Me,[]),t&&n){const r=Object.create(null);r[t]={handler:n,possibleKeys:[],score:0},j(this,Me,[r])}j(this,ze,[])}insert(t,n,a){j(this,lt,++hn(this,lt)._);let r=this;const s=or(n),i=[];for(let o=0,l=s.length;o<l;o++){const d=s[o],c=s[o+1],m=cr(d,c),h=Array.isArray(m)?m[0]:d;if(h in k(r,le)){r=k(r,le)[h],m&&i.push(m[1]);continue}k(r,le)[h]=new dt,m&&(k(r,ze).push(m),i.push(m[1])),r=k(r,le)[h]}return k(r,Me).push({[t]:{handler:a,possibleKeys:i.filter((o,l,d)=>d.indexOf(o)===l),score:k(this,lt)}}),r}search(t,n){var l;const a=[];j(this,ie,ht);let s=[this];const i=Pn(n),o=[];for(let d=0,c=i.length;d<c;d++){const m=i[d],h=d===c-1,w=[];for(let f=0,_=s.length;f<_;f++){const y=s[f],S=k(y,le)[m];S&&(j(S,ie,k(y,ie)),h?(k(S,le)["*"]&&a.push(...V(this,De,Fe).call(this,k(S,le)["*"],t,k(y,ie))),a.push(...V(this,De,Fe).call(this,S,t,k(y,ie)))):w.push(S));for(let E=0,R=k(y,ze).length;E<R;E++){const N=k(y,ze)[E],M=k(y,ie)===ht?{}:{...k(y,ie)};if(N==="*"){const O=k(y,le)["*"];O&&(a.push(...V(this,De,Fe).call(this,O,t,k(y,ie))),j(O,ie,M),w.push(O));continue}const[W,H,$]=N;if(!m&&!($ instanceof RegExp))continue;const q=k(y,le)[W],z=i.slice(d).join("/");if($ instanceof RegExp){const O=$.exec(z);if(O){if(M[H]=O[0],a.push(...V(this,De,Fe).call(this,q,t,k(y,ie),M)),Object.keys(k(q,le)).length){j(q,ie,M);const U=((l=O[0].match(/\//))==null?void 0:l.length)??0;(o[U]||(o[U]=[])).push(q)}continue}}($===!0||$.test(m))&&(M[H]=m,h?(a.push(...V(this,De,Fe).call(this,q,t,M,k(y,ie))),k(q,le)["*"]&&a.push(...V(this,De,Fe).call(this,k(q,le)["*"],t,M,k(y,ie)))):(j(q,ie,M),w.push(q)))}}s=w.concat(o.shift()??[])}return a.length>1&&a.sort((d,c)=>d.score-c.score),[a.map(({handler:d,params:c})=>[d,c])]}},Me=new WeakMap,le=new WeakMap,ze=new WeakMap,lt=new WeakMap,ie=new WeakMap,De=new WeakSet,Fe=function(t,n,a,r){const s=[];for(let i=0,o=k(t,Me).length;i<o;i++){const l=k(t,Me)[i],d=l[n]||l[ae],c={};if(d!==void 0&&(d.params=Object.create(null),s.push(d),a!==ht||r&&r!==ht))for(let m=0,h=d.possibleKeys.length;m<h;m++){const w=d.possibleKeys[m],f=c[d.score];d.params[w]=r!=null&&r[w]&&!f?r[w]:a[w]??(r==null?void 0:r[w]),c[d.score]=!0}}return s},dt),Ke,jn,Lr=(jn=class{constructor(){A(this,"name","TrieRouter");G(this,Ke);j(this,Ke,new Ar)}add(e,t,n){const a=Hn(t);if(a){for(let r=0,s=a.length;r<s;r++)k(this,Ke).insert(e,a[r],n);return}k(this,Ke).insert(e,t,n)}match(e,t){return k(this,Ke).search(e,t)}},Ke=new WeakMap,jn),pe=class extends Er{constructor(e={}){super(e),this.router=e.router??new Ir({routers:[new Nr,new Lr]})}},Mr=e=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},a=(s=>typeof s=="string"?s==="*"?()=>s:i=>s===i?i:null:typeof s=="function"?s:i=>s.includes(i)?i:null)(n.origin),r=(s=>typeof s=="function"?s:Array.isArray(s)?()=>s:()=>[])(n.allowMethods);return async function(i,o){var c;function l(m,h){i.res.headers.set(m,h)}const d=await a(i.req.header("origin")||"",i);if(d&&l("Access-Control-Allow-Origin",d),n.credentials&&l("Access-Control-Allow-Credentials","true"),(c=n.exposeHeaders)!=null&&c.length&&l("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),i.req.method==="OPTIONS"){n.origin!=="*"&&l("Vary","Origin"),n.maxAge!=null&&l("Access-Control-Max-Age",n.maxAge.toString());const m=await r(i.req.header("origin")||"",i);m.length&&l("Access-Control-Allow-Methods",m.join(","));let h=n.allowHeaders;if(!(h!=null&&h.length)){const w=i.req.header("Access-Control-Request-Headers");w&&(h=w.split(/\s*,\s*/))}return h!=null&&h.length&&(l("Access-Control-Allow-Headers",h.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&i.header("Vary","Origin",{append:!0})}};function ea(){return`<!DOCTYPE html>
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
    actionCenterTab: 'today',
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
        '<button class="topbar-btn" id="dashBtn" title="Dashboard">&#9632;</button>' +
        '' +
        '<span class="thread-title-display" id="threadTitleDisplay"></span>' +
      '</div>' +
      '<div class="topbar-title"><span class="status-dot"></span><span id="assistantNameDisplay">KARNA</span></div>' +
      '<div class="topbar-right">' +
        '<button class="topbar-btn notif-btn" id="notifBtn" title="Notifications">&#128276;<span class="notif-badge hidden" id="notifBadge">0</span></button>' +
        '<button class="topbar-btn" id="actionCenterBtn" title="Action Center">&#9889;</button>' +
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
    document.getElementById('actionCenterBtn').onclick = function() { closeNotifDropdown(); state.prevView = state.view; state.view = 'action-center'; renderView(); };
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
    } else if (state.view === 'action-center') {
      if (exp) exp.style.display = 'none';
      if (ttl) ttl.textContent = 'Action Center';
      renderActionCenter(mc);
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
      html += '<div class="dash-card" onclick="state.prevView=\\'dashboard\\';state.view=\\'action-center\\';renderView();"><div class="dash-card-icon">&#9889;</div><div class="dash-card-value">' + (data.pending_actions || 0) + '</div><div class="dash-card-label">Pending Actions</div></div>';
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
      html += '<button class="dash-quick-btn" onclick="state.prevView=\\'dashboard\\';state.view=\\'action-center\\';renderView();">Action Center</button>';
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
        html += '<div class="notif-item-title">' + typeIcon + ' ' + escapeHtml(n.title) + '</div>';
        if (n.body) { var plain = mdToPlain(n.body); html += '<div class="notif-item-body">' + escapeHtml(plain.length > 200 ? plain.substring(0, 200) + '…' : plain) + '</div>'; }
        html += '<div class="notif-item-time">' + formatRelativeDate(n.created_at) + '</div>';
        html += '<div class="notif-actions">';
        html += '<button class="notif-action-btn done" onclick="notifDone(' + n.id + ')">Done</button>';
        html += '<button class="notif-action-btn" onclick="notifSnooze10(' + n.id + ')">10m</button>';
        html += '<button class="notif-action-btn" onclick="notifSnooze1h(' + n.id + ')">1h</button>';
        html += '<button class="notif-action-btn" onclick="notifSnoozeTomorrow(' + n.id + ')">Tomorrow 9AM</button>';
        html += '<button class="notif-action-btn" onclick="notifDelete(' + n.id + ')">Delete</button>';
        html += '</div>';
        html += '</div>';
        html += '<button class="notif-del-btn" data-del-id="' + n.id + '" title="Dismiss" style="flex-shrink:0;background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:10px;padding:2px 6px;border-radius:4px;line-height:1;opacity:0.6;letter-spacing:0.03em;font-family:var(--font-body);font-weight:500;">ok</button>';
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
      // Dismiss (delete) individual notification
      list.querySelectorAll('.notif-del-btn[data-del-id]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          var nid = btn.getAttribute('data-del-id');
          api('/chat/notifications/' + nid, { method:'DELETE' }).then(function() {
            loadNotificationCount();
            loadNotifications();
          });
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
  async function notifDone(id) { await api('/notifications/' + id + '/done', { method: 'PUT' }); loadNotifications(); loadNotificationCount(); }
  async function notifSnooze10(id) { await api('/notifications/' + id + '/snooze', { method: 'POST', body: JSON.stringify({ minutes: 10 }) }); loadNotifications(); showToast('Snoozed 10 minutes', 'success'); }
  async function notifSnooze1h(id) { await api('/notifications/' + id + '/snooze', { method: 'POST', body: JSON.stringify({ minutes: 60 }) }); loadNotifications(); showToast('Snoozed 1 hour', 'success'); }
  async function notifSnoozeTomorrow(id) { await api('/notifications/' + id + '/snooze', { method: 'POST', body: JSON.stringify({ until: 'tomorrow_morning' }) }); loadNotifications(); showToast('Snoozed until tomorrow 9 AM', 'success'); }
  async function notifDelete(id) { await api('/notifications/' + id + '/cancel', { method: 'DELETE' }); loadNotifications(); loadNotificationCount(); }

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

  // === Action Center ===
  async function renderActionCenter(container) {
    container.innerHTML = '<div class="chat-area"><div class="action-center-page" id="acContent"><div class="ac-empty">Loading Action Center...</div></div></div>';
    try {
      var data = await api('/action-center');
      var el = document.getElementById('acContent');
      if (!el) return;
      var html = '<div class="ac-header"><div class="ac-title">Action Center</div><button class="btn btn-small" onclick="state.prevView=\\'dashboard\\';state.view=\\'dashboard\\';renderView();">Back</button></div>';
      html += '<div class="ac-section">';
      html += '<div class="ac-section-title">Today (' + (data.today ? data.today.length : 0) + ')</div>';
      if (data.today && data.today.length > 0) {
        for (var i = 0; i < data.today.length; i++) { html += renderActionItem(data.today[i]); }
      } else { html += '<div class="ac-empty">Nothing for today.</div>'; }
      html += '</div>';
      html += '<div class="ac-section">';
      html += '<div class="ac-section-title">Pending (' + (data.pending ? data.pending.length : 0) + ')</div>';
      if (data.pending && data.pending.length > 0) {
        for (var i = 0; i < data.pending.length; i++) { html += renderActionItem(data.pending[i]); }
      } else { html += '<div class="ac-empty">No pending items.</div>'; }
      html += '</div>';
      html += '<div class="ac-section">';
      html += '<div class="ac-section-title">Needs Approval (' + (data.needs_approval ? data.needs_approval.length : 0) + ')</div>';
      if (data.needs_approval && data.needs_approval.length > 0) {
        for (var i = 0; i < data.needs_approval.length; i++) { html += renderActionItem(data.needs_approval[i]); }
      } else { html += '<div class="ac-empty">Nothing needs approval.</div>'; }
      html += '</div>';
      html += '<div class="ac-section">';
      html += '<div class="ac-section-title">Recent Activity</div>';
      if (data.recent_activity && data.recent_activity.length > 0) {
        for (var i = 0; i < data.recent_activity.length; i++) { html += renderActionItem(data.recent_activity[i]); }
      } else { html += '<div class="ac-empty">No recent activity.</div>'; }
      html += '</div>';
      el.innerHTML = html;
    } catch(err) {
      var el2 = document.getElementById('acContent');
      if (el2) el2.innerHTML = '<div class="ac-empty">Could not load Action Center.</div>';
    }
  }
  function renderActionItem(item) {
    var badgeClass = 'ac-badge ' + item.status;
    var badgeText = item.status.replace('_', ' ');
    var html = '<div class="ac-item" data-id="' + item.id + '">';
    html += '<div class="ac-item-header"><div class="ac-item-title">' + escapeHtml(item.title) + '<span class="' + badgeClass + '">' + badgeText + '</span></div><div class="ac-item-meta">' + (item.type || '') + (item.due_at ? ' • ' + new Date(item.due_at).toLocaleString() : '') + '</div></div>';
    if (item.body) html += '<div class="ac-item-body">' + escapeHtml(item.body.substring(0, 200)) + (item.body.length > 200 ? '...' : '') + '</div>';
    html += '<div class="ac-item-actions">';
    if (item.status === 'pending' || item.status === 'running') {
      html += '<button class="ac-btn primary" onclick="acComplete(' + item.id + ')">Done</button>';
      html += '<button class="ac-btn" onclick="acCancel(' + item.id + ')">Cancel</button>';
    }
    if (item.status === 'failed') {
      html += '<button class="ac-btn primary" onclick="acRetry(' + item.id + ')">Retry</button>';
      html += '<button class="ac-btn danger" onclick="acCancel(' + item.id + ')">Dismiss</button>';
    }
    if (item.status === 'needs_approval') {
      html += '<button class="ac-btn primary" onclick="acApprove(' + item.id + ')">Approve</button>';
      html += '<button class="ac-btn danger" onclick="acCancel(' + item.id + ')">Reject</button>';
    }
    html += '</div></div>';
    return html;
  }
  async function acComplete(id) { await api('/action-center/' + id + '/complete', { method: 'POST' }); renderActionCenter(document.querySelector('.chat-area')); }
  async function acCancel(id) { await api('/action-center/' + id + '/cancel', { method: 'POST' }); renderActionCenter(document.querySelector('.chat-area')); }
  async function acRetry(id) { await api('/action-center/' + id + '/retry', { method: 'POST' }); renderActionCenter(document.querySelector('.chat-area')); }
  async function acApprove(id) { await api('/action-center/' + id + '/approve', { method: 'POST' }); renderActionCenter(document.querySelector('.chat-area')); }

  // === Memory Review ===
  async function renderMemoryReview(container) {
    container.innerHTML = '<div class="chat-area"><div class="memory-review-page" id="mrContent"><div class="ac-empty">Loading Memory...</div></div></div>';
    try {
      var data = await api('/memory/review?limit=100');
      var el = document.getElementById('mrContent');
      if (!el) return;
      var html = '<div class="mr-header"><div class="ac-title">Memory Review</div><button class="btn btn-small" onclick="state.prevView=\\'dashboard\\';state.view=\\'dashboard\\';renderView();">Back</button></div>';
      // Info banner explaining what Memory Review is
      html += '<div style="font-size:12px;color:var(--text-muted);padding:8px 12px;margin-bottom:12px;background:var(--bg-glass);border-radius:6px;border:1px solid var(--border-glass);">';
      html += '<strong>What is here:</strong> Facts, preferences, decisions, tasks, and context Karna remembers about you. <strong>Working</strong> = loaded every chat. <strong>Long-term</strong> = searched on demand. <strong>Documents</strong> you write are kept in the Document Library tab, not here.';
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
</html>`}const nn="AES-GCM",$r=256;async function ta(e){const t=new TextEncoder,n=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},n,{name:nn,length:$r},!1,["encrypt","decrypt"])}async function ct(e,t){const n=await ta(t),a=crypto.getRandomValues(new Uint8Array(12)),r=new TextEncoder,s=await crypto.subtle.encrypt({name:nn,iv:a},n,r.encode(e)),i=new Uint8Array(a.length+new Uint8Array(s).length);return i.set(a),i.set(new Uint8Array(s),a.length),btoa(String.fromCharCode(...i))}async function Y(e,t){const n=await ta(t),a=new Uint8Array(atob(e).split("").map(o=>o.charCodeAt(0))),r=a.slice(0,12),s=a.slice(12),i=await crypto.subtle.decrypt({name:nn,iv:r},n,s);return new TextDecoder().decode(i)}async function jt(e){const n=new TextEncoder().encode(e+"karna-pin-salt"),a=await crypto.subtle.digest("SHA-256",n);return btoa(String.fromCharCode(...new Uint8Array(a)))}async function na(e,t){return await jt(e)===t}const an=Object.freeze(Object.defineProperty({__proto__:null,decrypt:Y,encrypt:ct,hashPin:jt,verifyPin:na},Symbol.toStringTag,{value:"Module"})),$e=new pe;$e.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});$e.post("/setup",async e=>{const{username:t,name:n,pin:a,personality_prompt:r,timezone:s}=await e.req.json();if(!t||!n||!a)return e.json({error:"Username, name, and PIN are required"},400);if(a.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const o=await jt(a);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,n,o,r||"",s||"Asia/Kolkata").run();const l=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),d=crypto.randomUUID(),c=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(d,l.id,"web",c).run(),e.json({success:!0,sessionId:d,user:{id:l.id,username:l.username,name:l.name}})});$e.post("/login",async e=>{const{username:t,pin:n}=await e.req.json();if(!t||!n)return e.json({error:"Username and PIN required"},400);const a=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!a)return e.json({error:"User not found"},404);if(!await na(n,a.pin_hash))return e.json({error:"Invalid PIN"},401);const s=crypto.randomUUID(),i=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(s,a.id,"web",i).run(),e.json({success:!0,sessionId:s,user:{id:a.id,username:a.username,name:a.name}})});$e.post("/logout",async e=>{var n;const t=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});$e.get("/users/hints",async e=>{const n=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(a=>{var r;return{username:a.username,name_hint:a.name.split(" ")[0],created:((r=a.created_at)==null?void 0:r.split(" ")[0])||""}});return e.json({users:n,count:n.length})});$e.post("/reset-pin",async e=>{var o;const{username:t,name:n,new_pin:a}=await e.req.json();if(!t||!n||!a)return e.json({error:"Username, display name, and new PIN are required"},400);if(a.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const r=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!r)return e.json({error:"User not found"},404);if(r.name.toLowerCase().trim()!==n.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const s=await jt(a);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,r.id).run();const i=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(r.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(r.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((o=i.meta)==null?void 0:o.changes)||0})});$e.get("/me",async e=>{var a;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const n=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return n?e.json({user:{id:n.uid,username:n.username,name:n.name,role:n.role,timezone:n.timezone}}):e.json({error:"Invalid or expired session"},401)});const wt={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}},Br=55e3;function aa(e,t){return Promise.race([e,new Promise((n,a)=>setTimeout(()=>a(new Error(`LLM timeout: ${t} did not respond within 25 seconds. Try again or switch providers in Settings → Keys.`)),Br))])}async function P(e,t,n,a,r,s={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,n,a,r,JSON.stringify(s)).run()}catch(i){console.error("Failed to log error:",i)}}async function Wt(e,t,n,a,r,s){try{const i=`provider_alert:${a}:${n}`;if(await e.prepare(`SELECT id FROM error_log WHERE user_id = ? AND source = 'provider_alert'
       AND error_type = ? AND created_at > datetime('now', '-1 hour') LIMIT 1`).bind(t,i).first())return;await P(e,t,"provider_alert",i,`${a} failed: ${s.substring(0,200)}`,{alertType:n,failedProvider:a,fallbackProvider:r});let l;n==="all_providers_down"?l=`🚨 All LLM providers failed

Last error from ${a}: ${vn(s)}

The assistant cannot process requests until at least one provider is restored. Check your API keys or credit balance.`:l=`⚠️ LLM Provider Issue

${a}: ${vn(s)}
Switched to: ${r}

Check your ${a} API credit balance or key.`;const{decrypt:d}=await Promise.resolve().then(()=>an),c=await e.prepare("SELECT telegram_chat_id, pin_hash FROM users WHERE id = ?").bind(t).first();if(!(c!=null&&c.telegram_chat_id))return;const m=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(t).first();if(!m)return;const h=await d(m.encrypted_value,c.pin_hash);await fetch(`https://api.telegram.org/bot${h}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:c.telegram_chat_id,text:l})})}catch(i){console.error("Failed to send provider alert:",i)}}function vn(e){return e.includes("credit balance")||e.includes("insufficient")||e.includes("402")?"Credits exhausted or balance too low":e.includes("429")||e.includes("rate_limit")||e.includes("quota")?"Rate limit / quota exceeded":e.includes("401")||e.includes("authentication")||e.includes("invalid")&&e.includes("key")?"API key invalid or expired":e.includes("403")?"Access denied (key may lack permissions)":e.includes("TOOLS_UNSUPPORTED")?"Provider does not support tool calls":e.includes("properties field not found")?"Schema compatibility issue":"API error"}class ra{constructor(t,n="claude-sonnet-4-20250514",a="https://api.anthropic.com",r="anthropic"){A(this,"name");A(this,"apiKey");A(this,"model");A(this,"apiBase");this.apiKey=t,this.model=n,this.apiBase=a,this.name=r}async chat(t,n){var c,m,h,w;const a=t.find(f=>f.role==="system"),r=t.filter(f=>f.role!=="system"),s={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,messages:r.map(f=>({role:f.role,content:f.content}))};a&&(s.system=a.content),n!=null&&n.tools&&n.tools.length>0&&(s.tools=n.tools.map(f=>({name:f.name,description:f.description,input_schema:f.parameters})),n.toolChoice==="required"&&(s.tool_choice={type:"any"}));const i=await aa(fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)}),this.name);if(!i.ok){const f=await i.text();throw new Error(this.name+" API error "+i.status+": "+f)}const o=await i.json(),l=((c=o.content)==null?void 0:c.filter(f=>f.type==="text"))||[],d=((m=o.content)==null?void 0:m.filter(f=>f.type==="tool_use"))||[];return{content:l.map(f=>f.text).join(`
`),toolCalls:d.map(f=>({id:f.id,name:f.name,arguments:f.input})),usage:{promptTokens:((h=o.usage)==null?void 0:h.input_tokens)||0,completionTokens:((w=o.usage)==null?void 0:w.output_tokens)||0}}}async streamChat(t,n){const a=t.find(d=>d.role==="system"),r=t.filter(d=>d.role!=="system"),s={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,stream:!0,messages:r.map(d=>({role:d.role,content:d.content}))};a&&(s.system=a.content);const i=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)});if(!i.ok){const d=await i.text();throw new Error(this.name+" stream error "+i.status+": "+d)}const o=i.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(d){var f;const{done:c,value:m}=await o.read();if(c){d.close();return}const w=l.decode(m,{stream:!0}).split(`
`);for(const _ of w)if(_.startsWith("data: ")){const y=_.slice(6);if(y==="[DONE]")continue;try{const S=JSON.parse(y);S.type==="content_block_delta"&&((f=S.delta)!=null&&f.text)&&d.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:S.delta.text})+`

`))}catch{}}}})}}function jr(e){const t={},n=e||{};if(t.type=n.type||"object",t.type==="object"){const a=n.properties;if(a&&typeof a=="object"&&Object.keys(a).length>0){const r={};for(const[s,i]of Object.entries(a))i&&typeof i=="object"?r[s]=Vt(i):r[s]=i;t.properties=r}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(n.required)?t.required=n.required:t.required=[]}return n.description&&(t.description=n.description),t}function Vt(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const n=t.properties;if(n&&typeof n=="object"&&Object.keys(n).length>0){const a={};for(const[r,s]of Object.entries(n))s&&typeof s=="object"?a[r]=Vt(s):a[r]=s;t.properties=a}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=Vt(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class sa{constructor(t,n,a,r){A(this,"name");A(this,"apiKey");A(this,"model");A(this,"apiBase");this.apiKey=t,this.model=n,this.apiBase=a.replace(/\/+$/,""),this.name=r}async chat(t,n){var l,d,c,m,h,w;const a={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,messages:t.map(f=>({role:f.role,content:f.content}))},r=this.apiBase.includes("routellm.abacus.ai");if(n!=null&&n.tools&&n.tools.length>0&&r)throw new Error("TOOLS_UNSUPPORTED: Provider "+this.name+" does not support tool calling. Needs fallback to tool-capable provider.");n!=null&&n.tools&&n.tools.length>0&&(a.tools=n.tools.map(f=>({type:"function",function:{name:f.name,description:f.description,parameters:jr(f.parameters||{})}})),n.toolChoice==="required"&&(a.tool_choice="required"));const s=await aa(fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(a)}),this.name);if(!s.ok){const f=await s.text();throw new Error(this.name+" API error "+s.status+": "+f)}const i=await s.json(),o=(l=i.choices)==null?void 0:l[0];return{content:((d=o==null?void 0:o.message)==null?void 0:d.content)||"",toolCalls:(m=(c=o==null?void 0:o.message)==null?void 0:c.tool_calls)==null?void 0:m.map(f=>({id:f.id,name:f.function.name,arguments:(()=>{try{return typeof f.function.arguments=="string"?JSON.parse(f.function.arguments||"{}"):f.function.arguments||{}}catch{return{}}})()})),usage:{promptTokens:((h=i.usage)==null?void 0:h.prompt_tokens)||0,completionTokens:((w=i.usage)==null?void 0:w.completion_tokens)||0}}}async streamChat(t,n){const a={model:this.model,max_tokens:(n==null?void 0:n.maxTokens)||4096,temperature:(n==null?void 0:n.temperature)??.7,stream:!0,messages:t.map(o=>({role:o.role,content:o.content}))},r=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(a)});if(!r.ok){const o=await r.text();throw new Error(this.name+" stream error "+r.status+": "+o)}const s=r.body.getReader(),i=new TextDecoder;return new ReadableStream({async pull(o){var h,w,f;const{done:l,value:d}=await s.read();if(l){o.close();return}const m=i.decode(d,{stream:!0}).split(`
`);for(const _ of m)if(_.startsWith("data: ")){const y=_.slice(6);if(y==="[DONE]")continue;try{const E=(f=(w=(h=JSON.parse(y).choices)==null?void 0:h[0])==null?void 0:w.delta)==null?void 0:f.content;E&&o.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:E})+`

`))}catch{}}}})}}function Zt(e,t,n,a){const r=wt[e];if(!r)throw new Error(`Unknown LLM provider: ${e}`);const s=a||r.defaultModel;return r.apiFormat==="anthropic"?new ra(t,s,r.apiBase,n):new sa(t,s,r.apiBase,n)}class ia{constructor(){A(this,"errorLog",new Map);A(this,"usageLog",new Map)}async pickProvider(t){const n=Date.now(),a=t.filter(r=>{const s=this.errorLog.get(r);return s?s.cooldownUntil<=n:!0});return a.length>0?a[0]:null}async recordUsage(t,n){const a=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:a.tokens+n,requests:a.requests+1})}async recordError(t,n,a=5){this.errorLog.set(t,{error:n,cooldownUntil:Date.now()+a*60*1e3})}}const Pr=["llm_slot_1","llm_slot_2","llm_slot_3"],Ur=["anthropic","openai"];async function ut(e,t,n){const{decrypt:a}=await Promise.resolve().then(()=>an),r=new ia,s=[];for(const m of Pr){const h=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,m).first();if(h)try{const w=await a(h.encrypted_value,n),f=JSON.parse(w);if(f.provider&&f.apiKey&&wt[f.provider]){const y=f.provider,S=Zt(f.provider,f.apiKey,y,f.model);s.push({name:y,provider:S})}}catch(w){console.error(`Failed to load ${m}:`,w)}}const i=new Set(s.map(m=>m.name));for(const m of Ur){if(i.has(m))continue;const h=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,m).first();if(h)try{const w=await a(h.encrypted_value,n);if(wt[m]){const _=Zt(m,w,m);s.push({name:m,provider:_})}}catch{console.error(`Failed to decrypt legacy ${m} key`)}}if(s.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const o=s.map(m=>m.name),l=await r.pickProvider(o);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:s[0].provider,rotation:r};const d=s.find(m=>m.name===l);return{provider:Hr(d.provider,s,r,e,t),rotation:r}}function Hr(e,t,n,a,r){const s=o=>o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")||o.includes("TOOLS_UNSUPPORTED"),i=o=>o.includes("429")||o.toLowerCase().includes("rate limit")||o.toLowerCase().includes("too many requests");return t.length<=1?{name:e.name,async chat(o,l){try{return await e.chat(o,l)}catch(d){const c=d.message||"";throw s(c)&&!c.includes("TOOLS_UNSUPPORTED")&&Wt(a,r,"all_providers_down",e.name,null,c),d}},async streamChat(o,l){return await e.streamChat(o,l)}}:{name:e.name,async chat(o,l){try{return await e.chat(o,l)}catch(d){const c=d.message||"",m=i(c);if(!s(c)&&!m)throw d;const h=c.includes("TOOLS_UNSUPPORTED"),w=h?1:m?10:1440;console.warn(`Provider ${e.name} ${m?"rate limited":h?"tools unsupported":"auth/billing error"}, trying fallback...`),await n.recordError(e.name,c,w);const f=t.filter(_=>_.name!==e.name);for(const _ of f)try{const y=await _.provider.chat(o,l);return this.name=_.name,!h&&!m&&Wt(a,r,"provider_switched",e.name,_.name,c),y}catch(y){const S=y.message||"";if(s(S)||i(S)){await n.recordError(_.name,S,i(S)?10:1440);continue}throw y}throw Wt(a,r,"all_providers_down",e.name,null,c),new Error(`All LLM providers failed. Primary (${e.name}): ${c.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(o,l){return await e.streamChat(o,l)}}}const nt=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:ra,OpenAICompatibleProvider:sa,ProviderRotation:ia,createProviderFromConfig:Zt,createRotatingProvider:ut,logError:P},Symbol.toStringTag,{value:"Module"})),qt=20,Fr=2e3,Gr=2e3,oa=4;function Wr(e){return Math.ceil(e.length/oa)}function wn(e,t){const n=t*oa;return e.length<=n?e:e.slice(0,n)+`
[...truncated to fit token budget]`}class K{constructor(t){this.db=t}async store(t,n,a,r,s=5,i="working"){const o=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,n,a).first();o?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r,s,i,o.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,n,a,r,s,i).run(),i==="working"&&await this.enforceWorkingMemoryCap(t)}async cleanupDoneTasks(t){await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND type = 'task' AND status = 'done' AND tier = 'working'
       AND updated_at < datetime('now', '-7 days')`).bind(t).run()}async enforceWorkingMemoryCap(t){const n=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((n==null?void 0:n.cnt)||0)>qt){const a=((n==null?void 0:n.cnt)||0)-qt;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND tier = 'working' AND importance < 8 AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' AND importance < 8
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,a).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,qt).all()).results||[]}async getAll(t,n,a=50){return n?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,n,a).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,a).all()).results||[]}async search(t,n,a=10){const s=(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${n}%`,`%${n}%`,a).all()).results||[];if(s.length>0)return await this.touchMemories(t,s.map(c=>c.id)),s;const i=n.split(/\s+/).filter(c=>c.length>2);if(i.length===0)return[];const o=new Map,l=new Map;for(const c of i){const m=await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) LIMIT ?").bind(t,`%${c}%`,`%${c}%`,a*2).all();for(const h of m.results||[])o.set(h.id,(o.get(h.id)||0)+1),l.set(h.id,h)}const d=[...l.values()].sort((c,m)=>(o.get(m.id)||0)-(o.get(c.id)||0)).slice(0,a);return d.length>0&&await this.touchMemories(t,d.map(c=>c.id)),d}async searchLongTerm(t,n,a=5){const s=(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${n}%`,`%${n}%`,a).all()).results||[];if(s.length>0)return await this.touchMemories(t,s.map(c=>c.id)),s;const i=n.split(/\s+/).filter(c=>c.length>2);if(i.length===0)return[];const o=new Map,l=new Map;for(const c of i){const m=await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'long_term' AND (title LIKE ? OR content LIKE ?) LIMIT ?").bind(t,`%${c}%`,`%${c}%`,a*2).all();for(const h of m.results||[])o.set(h.id,(o.get(h.id)||0)+1),l.set(h.id,h)}const d=[...l.values()].sort((c,m)=>(o.get(m.id)||0)-(o.get(c.id)||0)).slice(0,a);return d.length>0&&await this.touchMemories(t,d.map(c=>c.id)),d}async touchMemories(t,n){for(const a of n)await this.db.prepare("UPDATE memory SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a,t).run()}async update(t,n,a){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a,t,n).run()}async promote(t,n){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,n).run(),await this.enforceWorkingMemoryCap(n)}async demote(t,n){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,n).run()}async remove(t,n){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,n).run()}async buildContext(t){const n=await this.getWorkingMemory(t);if(n.length===0)return"";const a={};for(const s of n)a[s.type]||(a[s.type]=[]),a[s.type].push(s);let r=`
## Working Memory (Active Context)
`;for(const[s,i]of Object.entries(a)){r+=`
### ${s.charAt(0).toUpperCase()+s.slice(1)}s
`;for(const o of i)r+=`- **${o.title}**: ${o.content}
`}return wn(r,Fr)}static truncatePersonality(t){return wn(t,Gr)}async getRecentConversations(t,n=20,a){return a?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,a,n).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,n).all()).results||[]).reverse()}async storeMessage(t,n,a,r,s="{}",i){const o=Wr(r);i?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,n,a,r,s,o,i).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,n,a,r,s,o).run()}async compactHistory(t,n=30){const a=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((a==null?void 0:a.cnt)||0)<=n*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,n).run()}}const qr=Object.freeze(Object.defineProperty({__proto__:null,MemoryService:K},Symbol.toStringTag,{value:"Module"})),zr="https://accounts.google.com/o/oauth2/v2/auth",la="https://oauth2.googleapis.com/token",Kr="https://www.googleapis.com/oauth2/v2/userinfo",Yr=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let be=null;async function Xt(e,t,n){const a=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!a)return null;try{const r=await Y(a.encrypted_value,n);return JSON.parse(r)}catch{return null}}async function Jr(e,t,n,a){const r=await ct(JSON.stringify(a),n);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,r).run()}function da(e,t,n){const a=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:Yr,access_type:"offline",prompt:"consent",state:n,include_granted_scopes:"true"});return`${zr}?${a}`}async function ca(e,t,n,a){const r=await fetch(la,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:n,redirect_uri:a,grant_type:"authorization_code"})}),s=await r.text();if(!r.ok)throw new Error(`Token exchange failed (${r.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function Vr(e,t,n){const a=await fetch(la,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:n,grant_type:"refresh_token"})}),r=await a.text();if(!a.ok)throw a.status===400||a.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${a.status}): ${r.substring(0,300)}`);return JSON.parse(r)}async function ua(e){const t=await fetch(Kr,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function mt(e,t,n,a,r){if(!a||!r)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(be&&be.userId===t&&be.expiresAt>Date.now()/1e3+60){const o=await Xt(e,t,n);return{token:be.token,email:(o==null?void 0:o.email)||"unknown"}}const s=await Xt(e,t,n);if(!s)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const i=await Vr(s.refresh_token,a,r);return be={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{token:i.access_token,email:s.email}}async function rn(e,t,n){try{const a=await Xt(e,t,n);return a?{connected:!0,email:a.email,connectedAt:a.connected_at}:{connected:!1}}catch{return{connected:!1}}}function ma(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function pa(e,t,n,a,r,s,i){const o=await ca(a,s,i,r);if(!o.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await ua(o.access_token),d={refresh_token:o.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await Jr(e,t,n,d),be={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{email:l.email,name:l.name}}async function ha(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(be==null?void 0:be.userId)===t&&(be=null)}const Pe="https://sheets.googleapis.com/v4/spreadsheets";class ga{constructor(t,n,a,r,s){this.db=t,this.userId=n,this.pinHash=a,this.clientId=r,this.clientSecret=s}async authHeaders(){const{token:t}=await mt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,n){const a=await this.authHeaders(),r=encodeURIComponent(n),s=await fetch(`${Pe}/${t}/values/${r}`,{headers:a});if(!s.ok){const o=await s.text();throw new Error(`Sheets read failed (${s.status}): ${o}`)}return(await s.json()).values||[]}async writeRange(t,n,a){const r=await this.authHeaders(),s=encodeURIComponent(n),i=await fetch(`${Pe}/${t}/values/${s}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:r,body:JSON.stringify({range:n,majorDimension:"ROWS",values:a})});if(!i.ok){const l=await i.text();throw new Error(`Sheets write failed (${i.status}): ${l}`)}return{updatedCells:(await i.json()).updatedCells||0}}async appendRows(t,n,a){var l;const r=await this.authHeaders(),s=encodeURIComponent(n),i=await fetch(`${Pe}/${t}/values/${s}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:r,body:JSON.stringify({range:n,majorDimension:"ROWS",values:a})});if(!i.ok){const d=await i.text();throw new Error(`Sheets append failed (${i.status}): ${d}`)}return{updatedCells:((l=(await i.json()).updates)==null?void 0:l.updatedCells)||a.length}}async deleteRow(t,n,a){const r=await this.authHeaders(),s=await fetch(`${Pe}/${t}?fields=sheets.properties`,{headers:r});if(!s.ok){const m=await s.text();throw new Error(`Failed to get sheet metadata (${s.status}): ${m}`)}const i=await s.json(),o=i.sheets.find(m=>m.properties.title===n);if(!o){const m=i.sheets.map(h=>h.properties.title).join(", ");throw new Error(`Tab "${n}" not found. Available tabs: ${m}`)}const l=o.properties.sheetId,d=a-1,c=await fetch(`${Pe}/${t}:batchUpdate`,{method:"POST",headers:r,body:JSON.stringify({requests:[{deleteDimension:{range:{sheetId:l,dimension:"ROWS",startIndex:d,endIndex:d+1}}}]})});if(!c.ok){const m=await c.text();throw new Error(`Row delete failed (${c.status}): ${m}`)}}async createSpreadsheet(t,n){const a=await this.authHeaders(),r={properties:{title:t},sheets:n&&n.length>0?n.map(o=>({properties:{title:o}})):[{properties:{title:"Sheet1"}}]},s=await fetch(Pe,{method:"POST",headers:a,body:JSON.stringify(r)});if(!s.ok){const o=await s.text();throw new Error(`Sheets create failed (${s.status}): ${o}`)}const i=await s.json();return{spreadsheetId:i.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${i.spreadsheetId}/edit`}}async getMetadata(t){const n=await this.authHeaders(),a=await fetch(`${Pe}/${t}?fields=properties.title,sheets.properties.title`,{headers:n});if(!a.ok){const s=await a.text();throw new Error(`Sheets metadata failed (${a.status}): ${s}`)}const r=await a.json();return{title:r.properties.title,sheets:r.sheets.map(s=>s.properties.title)}}}const gt="https://www.googleapis.com/calendar/v3";class sn{constructor(t,n,a,r,s){this.db=t,this.userId=n,this.pinHash=a,this.clientId=r,this.clientSecret=s}async authHeaders(){const{token:t}=await mt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",n={}){const a=await this.authHeaders(),r=new URLSearchParams;n.timeMin&&r.set("timeMin",n.timeMin),n.timeMax&&r.set("timeMax",n.timeMax),r.set("maxResults",String(n.maxResults||20)),r.set("singleEvents","true"),r.set("orderBy","startTime"),n.query&&r.set("q",n.query);const s=await fetch(`${gt}/calendars/${encodeURIComponent(t)}/events?${r}`,{headers:a});if(!s.ok){const o=await s.text();throw new Error(`Calendar list failed (${s.status}): ${o}`)}return(await s.json()).items||[]}async createEvent(t="primary",n){var o;const a=await this.authHeaders(),r=n.timeZone||"Asia/Kolkata",s={summary:n.summary,description:n.description||"",location:n.location||"",start:{dateTime:n.startDateTime,timeZone:r},end:{dateTime:n.endDateTime,timeZone:r}};(o=n.attendees)!=null&&o.length&&(s.attendees=n.attendees.map(l=>({email:l})));const i=await fetch(`${gt}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:a,body:JSON.stringify(s)});if(!i.ok){const l=await i.text();throw new Error(`Calendar create failed (${i.status}): ${l}`)}return await i.json()}async updateEvent(t="primary",n,a){const r=await this.authHeaders(),s=a.timeZone||"Asia/Kolkata",i={};a.summary&&(i.summary=a.summary),a.description&&(i.description=a.description),a.location&&(i.location=a.location),a.startDateTime&&(i.start={dateTime:a.startDateTime,timeZone:s}),a.endDateTime&&(i.end={dateTime:a.endDateTime,timeZone:s});const o=await fetch(`${gt}/calendars/${encodeURIComponent(t)}/events/${n}`,{method:"PATCH",headers:r,body:JSON.stringify(i)});if(!o.ok){const l=await o.text();throw new Error(`Calendar update failed (${o.status}): ${l}`)}return await o.json()}async deleteEvent(t="primary",n){const a=await this.authHeaders(),r=await fetch(`${gt}/calendars/${encodeURIComponent(t)}/events/${n}`,{method:"DELETE",headers:a});if(!r.ok&&r.status!==410){const s=await r.text();throw new Error(`Calendar delete failed (${r.status}): ${s}`)}}async listCalendars(){const t=await this.authHeaders(),n=await fetch(`${gt}/users/me/calendarList`,{headers:t});if(!n.ok){const r=await n.text();throw new Error(`Calendar list calendars failed (${n.status}): ${r}`)}return((await n.json()).items||[]).map(r=>({id:r.id,summary:r.summary,primary:r.primary||!1}))}}const Ee="https://docs.googleapis.com/v1/documents",Zr="https://www.googleapis.com/drive/v3/files";function bn(e){const t=[];for(const n of e.split(`
`)){const a=n.trim();if(a===""||/^---+$/.test(a))continue;let r="NORMAL_TEXT",s=n;const i=a.match(/^###\s+(.+)/),o=!i&&a.match(/^##\s+(.+)/),l=!i&&!o&&a.match(/^#\s+(.+)/);i?(r="HEADING_3",s=i[1]):o?(r="HEADING_2",s=o[1]):l?(r="HEADING_1",s=l[1]):/^\s*[-*]\s/.test(n)&&(s="• "+n.replace(/^\s*[-*]\s+/,""));const{text:d,spans:c}=Xr(s);t.push({text:d,namedStyle:r,spans:c})}return t}function Xr(e){const t=[];let n="",a=0;for(;a<e.length;)if(e[a]==="*"&&e[a+1]==="*"){const r=e.indexOf("**",a+2);if(r!==-1){const s=n.length;n+=e.substring(a+2,r),t.push({start:s,end:n.length,bold:!0}),a=r+2}else n+=e[a++]}else if(e[a]==="_"&&e[a+1]==="_"){const r=e.indexOf("__",a+2);if(r!==-1){const s=n.length;n+=e.substring(a+2,r),t.push({start:s,end:n.length,bold:!0}),a=r+2}else n+=e[a++]}else if(e[a]==="*"&&e[a+1]!=="*"){const r=e.indexOf("*",a+1);if(r!==-1){const s=n.length;n+=e.substring(a+1,r),t.push({start:s,end:n.length,italic:!0}),a=r+1}else n+=e[a++]}else if(e[a]==="_"){const r=e.indexOf("_",a+1);if(r!==-1){const s=n.length;n+=e.substring(a+1,r),t.push({start:s,end:n.length,italic:!0}),a=r+1}else n+=e[a++]}else n+=e[a++];return{text:n,spans:t}}class fa{constructor(t,n,a,r,s){this.db=t,this.userId=n,this.pinHash=a,this.clientId=r,this.clientSecret=s}async authHeaders(){const{token:t}=await mt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const n=await this.authHeaders(),a=await fetch(Ee,{method:"POST",headers:n,body:JSON.stringify({title:t})});if(!a.ok){const s=await a.text();throw new Error(`Docs create failed (${a.status}): ${s}`)}const r=await a.json();return{documentId:r.documentId,url:`https://docs.google.com/document/d/${r.documentId}/edit`}}async readDocument(t){var i,o;const n=await this.authHeaders(),a=await fetch(`${Ee}/${t}`,{headers:n});if(!a.ok){const l=await a.text();throw new Error(`Docs read failed (${a.status}): ${l}`)}const r=await a.json();let s="";for(const l of((i=r.body)==null?void 0:i.content)||[])if(l.paragraph)for(const d of l.paragraph.elements)(o=d.textRun)!=null&&o.content&&(s+=d.textRun.content);return{title:r.title,content:s.trim()}}async rewriteDocument(t,n){var f;const a=await this.authHeaders(),r=await fetch(`${Ee}/${t}`,{headers:a});if(!r.ok){const _=await r.text();throw new Error(`Docs fetch failed (${r.status}): ${_.substring(0,200)}`)}const i=((f=(await r.json()).body)==null?void 0:f.content)||[],o=i[i.length-1],l=(o==null?void 0:o.endIndex)??2,d=bn(n),c=[];if(l>2&&c.push({deleteContentRange:{range:{startIndex:1,endIndex:l-1}}}),d.length===0){c.length>0&&await fetch(`${Ee}/${t}:batchUpdate`,{method:"POST",headers:a,body:JSON.stringify({requests:c})});return}let m="";const h=[];for(const _ of d){const y=m.length;m+=_.text+`
`,h.push({start:y,end:m.length,namedStyle:_.namedStyle,spans:_.spans})}c.push({insertText:{location:{index:1},text:m}});for(const _ of h){_.namedStyle!=="NORMAL_TEXT"&&c.push({updateParagraphStyle:{range:{startIndex:1+_.start,endIndex:1+_.end},paragraphStyle:{namedStyleType:_.namedStyle},fields:"namedStyleType"}});for(const y of _.spans){const S={},E=[];y.bold&&(S.bold=!0,E.push("bold")),y.italic&&(S.italic=!0,E.push("italic")),E.length>0&&c.push({updateTextStyle:{range:{startIndex:1+_.start+y.start,endIndex:1+_.start+y.end},textStyle:S,fields:E.join(",")}})}}const w=await fetch(`${Ee}/${t}:batchUpdate`,{method:"POST",headers:a,body:JSON.stringify({requests:c})});if(!w.ok){const _=await w.text();throw new Error(`Docs rewrite failed (${w.status}): ${_.substring(0,200)}`)}}async appendFormattedContent(t,n){var f;const a=await this.authHeaders(),r=bn(n);if(r.length===0)return;const s=await fetch(`${Ee}/${t}`,{headers:a});if(!s.ok){const _=await s.text();throw new Error(`Docs fetch failed (${s.status}): ${_.substring(0,200)}`)}const o=((f=(await s.json()).body)==null?void 0:f.content)||[],l=o[o.length-1],d=Math.max(1,((l==null?void 0:l.endIndex)??2)-1);let c="";const m=[];for(const _ of r){const y=c.length;c+=_.text+`
`,m.push({start:y,end:c.length,namedStyle:_.namedStyle,spans:_.spans})}const h=[{insertText:{location:{index:d},text:c}}];for(const _ of m){_.namedStyle!=="NORMAL_TEXT"&&h.push({updateParagraphStyle:{range:{startIndex:d+_.start,endIndex:d+_.end},paragraphStyle:{namedStyleType:_.namedStyle},fields:"namedStyleType"}});for(const y of _.spans){const S={},E=[];y.bold&&(S.bold=!0,E.push("bold")),y.italic&&(S.italic=!0,E.push("italic")),E.length>0&&h.push({updateTextStyle:{range:{startIndex:d+_.start+y.start,endIndex:d+_.start+y.end},textStyle:S,fields:E.join(",")}})}}const w=await fetch(`${Ee}/${t}:batchUpdate`,{method:"POST",headers:a,body:JSON.stringify({requests:h})});if(!w.ok){const _=await w.text();throw new Error(`Docs append failed (${w.status}): ${_.substring(0,200)}`)}}async appendText(t,n){const a=await this.authHeaders(),r=await fetch(`${Ee}/${t}:batchUpdate`,{method:"POST",headers:a,body:JSON.stringify({requests:[{insertText:{endOfSegmentLocation:{},text:n}}]})});if(!r.ok){const s=await r.text();throw new Error(`Docs append failed (${r.status}): ${s}`)}}async deleteContent(t,n){var i,o,l;const a=await this.authHeaders(),r=await fetch(`${Ee}/${t}:batchUpdate`,{method:"POST",headers:a,body:JSON.stringify({requests:[{replaceAllText:{containsText:{text:n,matchCase:!0},replaceText:""}}]})});if(!r.ok){const d=await r.text();throw new Error(`Docs delete content failed (${r.status}): ${d.substring(0,200)}`)}return{occurrencesRemoved:((l=(o=(i=(await r.json()).replies)==null?void 0:i[0])==null?void 0:o.replaceAllText)==null?void 0:l.occurrencesChanged)??0}}async shareDocument(t,n,a="writer"){const r=await this.authHeaders(),s=await fetch(`${Zr}/${t}/permissions`,{method:"POST",headers:r,body:JSON.stringify({type:"user",role:a,emailAddress:n})});if(!s.ok){const i=await s.text();throw new Error(`Share failed (${s.status}): ${i}`)}}}class ce{constructor(t,n,a,r,s){A(this,"sheets");A(this,"calendar");A(this,"docs");A(this,"db");A(this,"userId");A(this,"pinHash");this.db=t,this.userId=n,this.pinHash=a,this.sheets=new ga(t,n,a,r,s),this.calendar=new sn(t,n,a,r,s),this.docs=new fa(t,n,a,r,s)}async isConnected(){return rn(this.db,this.userId,this.pinHash)}}const Ue=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:sn,GoogleDocs:fa,GoogleServices:ce,GoogleSheets:ga,completeOAuthFlow:pa,disconnectGoogle:ha,exchangeCodeForTokens:ca,fetchUserInfo:ua,generateAuthUrl:da,getGoogleAuth:mt,isGoogleConnected:rn,isOAuthClientConfigured:ma},Symbol.toStringTag,{value:"Module"}));async function ya(e,t,n={}){const a={textQuery:t,languageCode:"en",pageSize:8};if(n.type&&(a.includedType=n.type),n.location){const l=n.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(a.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:n.radius||5e3}})}const r=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),s=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":r},body:JSON.stringify(a)});if(!s.ok){const l=await s.text();return{results:[],error:`Places API error (${s.status}): ${l.substring(0,200)}`}}const i=await s.json();return!i.places||i.places.length===0?{results:[]}:{results:i.places.map(l=>{var d,c,m;return{name:((d=l.displayName)==null?void 0:d.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(c=l.currentOpeningHours)==null?void 0:c.openNow,types:(m=l.types)==null?void 0:m.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function va(e,t){var s,i,o;const n=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),a=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":n}});if(!a.ok){const l=await a.text();return{error:`Place Details API error (${a.status}): ${l.substring(0,200)}`}}const r=await a.json();return{details:{name:((s=r.displayName)==null?void 0:s.text)||"",address:r.formattedAddress||"",phone:r.internationalPhoneNumber,website:r.websiteUri,rating:r.rating,reviews:(i=r.reviews)==null?void 0:i.slice(0,3).map(l=>{var d,c,m;return{author:((d=l.authorAttribution)==null?void 0:d.displayName)||"Anonymous",rating:l.rating||0,text:((m=(c=l.text)==null?void 0:c.text)==null?void 0:m.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(o=r.currentOpeningHours)==null?void 0:o.weekdayDescriptions,location:r.location?{lat:r.location.latitude,lng:r.location.longitude}:void 0,googleMapsUri:r.googleMapsUri}}}async function wa(e,t,n,a={}){var d;const r=new URLSearchParams({origin:t,destination:n,key:e,mode:a.mode||"driving"});(a.mode==="driving"||!a.mode)&&r.set("departure_time","now");const s=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${r}`);if(!s.ok)return{error:`Directions API error: ${s.status}`};const i=await s.json();if(i.status!=="OK")return{error:`Directions: ${i.status} — ${i.error_message||""}`};const o=i.routes[0],l=o.legs[0];return{route:{summary:o.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(d=l.duration_in_traffic)==null?void 0:d.text,steps:l.steps.slice(0,10).map(c=>{var m,h,w;return{instruction:((m=c.html_instructions)==null?void 0:m.replace(/<[^>]*>/g,""))||"",distance:((h=c.distance)==null?void 0:h.text)||"",duration:((w=c.duration)==null?void 0:w.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function ba(e,t,n,a){var l,d;const r={q:t,target:n,key:e,format:"text"};a&&(r.source=a);const s=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!s.ok){const c=await s.text();return{translatedText:"",error:`Translate API error (${s.status}): ${c.substring(0,200)}`}}const o=(d=(l=(await s.json()).data)==null?void 0:l.translations)==null?void 0:d[0];return o?{translatedText:o.translatedText,detectedSourceLang:o.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function _a(e,t){const n=new URLSearchParams({address:t,key:e}),a=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${n}`);if(!a.ok)return{results:[],error:`Geocoding API error: ${a.status}`};const r=await a.json();return r.status!=="OK"&&r.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${r.status} — ${r.error_message||""}`}:{results:(r.results||[]).slice(0,5).map(s=>{var i;return{address:s.formatted_address,lat:s.geometry.location.lat,lng:s.geometry.location.lng,placeId:s.place_id,types:(i=s.types)==null?void 0:i.slice(0,3)}})}}async function Ea(e,t,n={}){const a=new URLSearchParams({part:"snippet",q:t,key:e,type:n.type||"video",maxResults:String(n.maxResults||5),order:n.order||"relevance"}),r=await fetch(`https://www.googleapis.com/youtube/v3/search?${a}`);if(!r.ok){const i=await r.text();return{results:[],error:`YouTube API error (${r.status}): ${i.substring(0,200)}`}}return{results:((await r.json()).items||[]).map(i=>{var o,l,d,c,m,h,w,f;return{title:i.snippet.title,channelTitle:i.snippet.channelTitle,description:(o=i.snippet.description)==null?void 0:o.substring(0,200),videoId:((l=i.id)==null?void 0:l.videoId)||((d=i.id)==null?void 0:d.channelId)||((c=i.id)==null?void 0:c.playlistId)||"",publishedAt:i.snippet.publishedAt,url:(m=i.id)!=null&&m.videoId?`https://www.youtube.com/watch?v=${i.id.videoId}`:(h=i.id)!=null&&h.channelId?`https://www.youtube.com/channel/${i.id.channelId}`:"",thumbnailUrl:(f=(w=i.snippet.thumbnails)==null?void 0:w.medium)==null?void 0:f.url}})}}async function Pt(e,t={}){const n=Math.min(t.num||5,10),a=t.site?`site:${t.site} ${e}`:e;try{const r=new URLSearchParams({q:a}),s=await fetch(`https://html.duckduckgo.com/html/?${r}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!s.ok)return{results:[],error:`Search request failed (${s.status})`};const i=await s.text(),o=[],l=i.split(/class="result results_links/g).slice(1);for(const d of l){if(o.length>=n)break;const c=d.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),m=d.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(c){let h=c[1];const w=h.match(/uddg=([^&]+)/);w?h=decodeURIComponent(w[1]):h.startsWith("//")&&(h="https:"+h);const f=S=>S.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),_=f(c[2]),y=m?f(m[1]):"";if(_&&h.startsWith("http")){const S=h.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];o.push({title:_,link:h,snippet:y,displayLink:S})}}}return o.length===0?{results:[],error:void 0}:{results:o}}catch(r){return{results:[],error:`Web search error: ${r.message}`}}}async function Ta(e,t,n,a="driving"){var l,d,c,m;const r=new URLSearchParams({origins:t,destinations:n,key:e,mode:a,departure_time:"now"}),s=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${r}`);if(!s.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${s.status}`};const i=await s.json(),o=(c=(d=(l=i.rows)==null?void 0:l[0])==null?void 0:d.elements)==null?void 0:c[0];return!o||o.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(o==null?void 0:o.status)||i.status}`}:{distance:o.distance.text,duration:o.duration.text,durationInTraffic:(m=o.duration_in_traffic)==null?void 0:m.text}}const Qr=Object.freeze(Object.defineProperty({__proto__:null,geocode:_a,getDirections:wa,getDistanceMatrix:Ta,getPlaceDetails:va,searchPlaces:ya,searchYouTube:Ea,translateText:ba,webSearch:Pt},Symbol.toStringTag,{value:"Module"})),Te="https://gmail.googleapis.com/gmail/v1/users/me";class ve{constructor(t,n,a,r,s){this.db=t,this.userId=n,this.pinHash=a,this.clientId=r,this.clientSecret=s}async authHeaders(){const{token:t}=await mt(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var o;const n=await this.authHeaders(),a=new URLSearchParams;if(a.set("maxResults",String(t.maxResults||10)),t.query&&a.set("q",t.query),(o=t.labelIds)!=null&&o.length)for(const l of t.labelIds)a.append("labelIds",l);const r=await fetch(`${Te}/messages?${a}`,{headers:n});if(!r.ok){const l=await r.text();throw new Error(`Gmail list failed (${r.status}): ${l.substring(0,200)}`)}const s=await r.json();if(!s.messages||s.messages.length===0)return[];const i=[];for(const l of s.messages.slice(0,t.maxResults||10))try{const d=await this.getMessage(l.id,n);d&&i.push(d)}catch{}return i}async getMessage(t,n){const a=n||await this.authHeaders(),r=await fetch(`${Te}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:a});if(!r.ok)return null;const s=await r.json(),i=o=>{var l,d,c;return((c=(d=(l=s.payload)==null?void 0:l.headers)==null?void 0:d.find(m=>m.name.toLowerCase()===o.toLowerCase()))==null?void 0:c.value)||""};return{id:s.id,threadId:s.threadId,snippet:s.snippet||"",subject:i("Subject")||"(no subject)",from:i("From"),to:i("To"),date:i("Date")||new Date(parseInt(s.internalDate)).toISOString(),isUnread:(s.labelIds||[]).includes("UNREAD"),labels:s.labelIds||[]}}async getMessageBody(t){const n=await this.authHeaders(),a=await fetch(`${Te}/messages/${t}?format=full`,{headers:n});if(!a.ok){const s=await a.text();throw new Error(`Gmail message body failed (${a.status}): ${s.substring(0,200)}`)}const r=await a.json();return Sa(r.payload)}async search(t,n=10){return this.listMessages({query:t,maxResults:n})}async send(t,n,a,r={}){const s=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${n}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];r.cc&&i.push(`Cc: ${r.cc}`),r.bcc&&i.push(`Bcc: ${r.bcc}`),r.replyToMessageId&&(i.push(`In-Reply-To: ${r.replyToMessageId}`),i.push(`References: ${r.replyToMessageId}`)),i.push("",a);const o=i.join(`\r
`),d={raw:_n(o)};r.threadId&&(d.threadId=r.threadId);const c=await fetch(`${Te}/messages/send`,{method:"POST",headers:s,body:JSON.stringify(d)});if(!c.ok){const m=await c.text();throw new Error(`Gmail send failed (${c.status}): ${m.substring(0,200)}`)}return await c.json()}async createDraft(t,n,a,r={}){const s=await this.authHeaders(),i=[`To: ${t}`,`Subject: ${n}`,"MIME-Version: 1.0","Content-Type: text/html; charset=UTF-8"];r.cc&&i.push(`Cc: ${r.cc}`),i.push("",es(a));const o=i.join(`\r
`),l=_n(o),d=await fetch(`${Te}/drafts`,{method:"POST",headers:s,body:JSON.stringify({message:{raw:l}})});if(!d.ok){const c=await d.text();throw new Error(`Gmail draft failed (${d.status}): ${c.substring(0,200)}`)}return await d.json()}async markAsRead(t){const n=await this.authHeaders();await fetch(`${Te}/messages/${t}/modify`,{method:"POST",headers:n,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,n){const a=await this.authHeaders();let r={};switch(n){case"archive":r={removeLabelIds:["INBOX"]};break;case"trash":r={addLabelIds:["TRASH"]};break;case"read":r={removeLabelIds:["UNREAD"]};break;case"unread":r={addLabelIds:["UNREAD"]};break;case"star":r={addLabelIds:["STARRED"]};break;case"unstar":r={removeLabelIds:["STARRED"]};break}const s=await fetch(`${Te}/messages/${t}/modify`,{method:"POST",headers:{...a,"Content-Type":"application/json"},body:JSON.stringify(r)});if(!s.ok){const i=await s.text();throw new Error(`Failed to modify message: ${i}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),n=await fetch(`${Te}/labels/INBOX`,{headers:t});return n.ok&&(await n.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),n=await fetch(`${Te}/profile`,{headers:t});if(!n.ok)throw new Error("Failed to get Gmail profile");return await n.json()}}function Sa(e){var t,n,a;if(!e)return"";if((t=e.body)!=null&&t.data)return zt(e.body.data);if(e.parts){for(const r of e.parts)if(r.mimeType==="text/plain"&&((n=r.body)!=null&&n.data))return zt(r.body.data);for(const r of e.parts)if(r.mimeType==="text/html"&&((a=r.body)!=null&&a.data)){const s=zt(r.body.data);return ts(s)}for(const r of e.parts)if(r.parts){const s=Sa(r);if(s)return s}}return e.snippet||""}function es(e){let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return t=t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)","g"),"<em>$1</em>"),`<html><body style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#000000;">${t.split(/\n\n+/).map(r=>{const s=r.split(`
`);return s.every(i=>/^\s*[-*]\s/.test(i)||i.trim()==="")?`<ul>${s.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*[-*]\s+/,"")}</li>`).join("")}</ul>`:s.every(i=>/^\s*\d+\.\s/.test(i)||i.trim()==="")?`<ol>${s.filter(o=>o.trim()).map(o=>`<li>${o.replace(/^\s*\d+\.\s+/,"")}</li>`).join("")}</ol>`:`<p>${s.join("<br>")}</p>`}).join("")}</body></html>`}function _n(e){const t=new TextEncoder().encode(e);let n="";for(let a=0;a<t.length;a++)n+=String.fromCharCode(t[a]);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function zt(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function ts(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const ns=1e4,as=1e4;async function xa(e,t){try{const n=new AbortController,a=setTimeout(()=>n.abort(),as),r=await fetch(e,{signal:n.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(!r.ok)return{text:"",error:`HTTP ${r.status}`};const s=r.headers.get("content-type")||"";if(!s.includes("text/html")&&!s.includes("text/plain")&&!s.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${s.split(";")[0]}`};const i=await r.text();clearTimeout(a);const o=i.length>2e5?i.substring(0,2e5):i,l=rs(o);return l.length<50?{text:"",error:"Page has too little readable content"}:{text:l.substring(0,t||ns)}}catch(n){return{text:"",error:n.name==="AbortError"?"Timeout":n.message}}}function rs(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(n,a)=>String.fromCharCode(parseInt(a))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(n=>n.trim()).filter(n=>n.length>0).join(`
`),t.trim()}const ss=1e4;async function is(e,t){var r,s,i;const n=new AbortController,a=setTimeout(()=>n.abort(),ss);try{const o=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",signal:n.signal,headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar-pro",messages:[{role:"user",content:e}],max_tokens:2e3})});if(clearTimeout(a),!o.ok)return{report:"",sources:[],pagesRead:0,error:`Perplexity error ${o.status}`};const l=await o.json(),d=((i=(s=(r=l==null?void 0:l.choices)==null?void 0:r[0])==null?void 0:s.message)==null?void 0:i.content)||"",m=((l==null?void 0:l.citations)||[]).map(h=>({title:h,url:h,snippet:""}));return{report:d,sources:m,pagesRead:m.length}}catch(o){return clearTimeout(a),{report:"",sources:[],pagesRead:0,error:`Perplexity request failed: ${o.message}`}}}async function ka(e,t,n={}){if(n.perplexityApiKey){const h=await is(e,n.perplexityApiKey);if(!h.error)return h}const a=n.maxPages||(n.depth==="thorough"?5:3),r=n.maxResults||(n.depth==="thorough"?8:5),s=await Pt(e,{num:r,site:n.site});if(s.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${s.error}`};if(s.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const o=s.results.slice(0,a).map(async h=>{const w=await xa(h.link);return{title:h.title,url:h.link,displayLink:h.displayLink,snippet:h.snippet,content:w.text,error:w.error}}),d=(await Promise.all(o)).filter(h=>h.content.length>50);if(d.length===0){const h=s.results.map((f,_)=>`[${_+1}] ${f.title}
${f.snippet}
Source: ${f.link}`).join(`

`);return{report:await En(e,h,t,"snippets"),sources:s.results.map(f=>({title:f.title,url:f.link})),pagesRead:0}}const c=d.map((h,w)=>`--- SOURCE ${w+1}: ${h.title} (${h.displayLink}) ---
${h.content}
--- END SOURCE ${w+1} ---`).join(`

`);return{report:await En(e,c,t,"full"),sources:d.map(h=>({title:h.title,url:h.url})),pagesRead:d.length}}async function En(e,t,n,a){const s=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

${a==="full"?"I have fetched and read the full content of several web pages related to the research query.":"I could only retrieve search snippets (page fetching failed). Base the analysis on available snippet information and note this limitation."}

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

Write a synthesized research report answering the query above.`;try{return(await n.chat([{role:"system",content:s},{role:"user",content:i}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(o){return`Research synthesis error: ${o.message}. Raw search results were found but could not be analyzed.`}}const os=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:ka,fetchPageContent:xa},Symbol.toStringTag,{value:"Module"})),Lt="https://api.browser-use.com/api/v2",Tn=2e4,Qt=6e3,ls=88e3,Da=new Set(["finished","stopped"]);async function Ra(e,t,n){const a=(n==null?void 0:n.timeoutMs)??ls;let r,s;try{const o={task:e};n!=null&&n.secrets&&Object.keys(n.secrets).length>0&&(o.secrets=n.secrets);const l=await fetch(`${Lt}/tasks`,{method:"POST",headers:{"X-Browser-Use-API-Key":t,"Content-Type":"application/json"},body:JSON.stringify(o)});if(!l.ok){const c=await l.text().catch(()=>"");return{output:null,taskId:"",status:"failed",error:`HTTP ${l.status}: ${c}`}}const d=await l.json();if(r=d.id,s=d.sessionId||void 0,!r)return{output:null,taskId:"",status:"failed",error:"No id in create response"}}catch(o){return{output:null,taskId:"",status:"failed",error:o.message}}await new Promise(o=>setTimeout(o,Tn));const i=Date.now()+(a-Tn);for(;Date.now()<i;){try{const o=await fetch(`${Lt}/tasks/${r}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(o.ok){const l=await o.json();if(Da.has(l.status))return l.status==="finished"?{output:l.output??null,taskId:r,sessionId:s,status:"completed"}:{output:l.output??null,taskId:r,status:"failed",error:l.output??"Task was stopped before completing"}}}catch{}await new Promise(o=>setTimeout(o,Qt))}return{output:null,taskId:r,sessionId:s,status:"timeout"}}async function ds(e,t,n){const r=Date.now()+3e4;for(;Date.now()<r;){try{const s=await fetch(`${Lt}/tasks/${e}/status`,{headers:{"X-Browser-Use-API-Key":t}});if(!s.ok){await new Promise(o=>setTimeout(o,Qt));continue}const i=await s.json();if(Da.has(i.status)){const o=await fetch(`${Lt}/tasks/${e}`,{headers:{"X-Browser-Use-API-Key":t}}),l=o.ok?(await o.json()).output??null:i.output??null;return{status:i.status,output:l,done:!0}}}catch{}await new Promise(s=>setTimeout(s,Qt))}return{status:"running",output:null,done:!1}}async function Oa(e){const t=e instanceof Buffer?new Uint8Array(e):e,n=new DataView(t.buffer,t.byteOffset,t.byteLength);let a=0;for(;a<t.length-30&&n.getUint32(a,!0)===67324752;){const r=n.getUint16(a+6,!0),s=n.getUint16(a+8,!0),i=n.getUint32(a+18,!0),o=n.getUint32(a+22,!0),l=n.getUint16(a+26,!0),d=n.getUint16(a+28,!0),c=new TextDecoder().decode(t.slice(a+30,a+30+l)),m=a+30+l+d;if(c==="word/document.xml"){const h=t.slice(m,m+i);let w;if(s===0)w=h;else{const y=new DecompressionStream("deflate-raw"),S=y.writable.getWriter();S.write(h),S.close();const E=y.readable.getReader(),R=[];let N=!1;for(;!N;){const H=await E.read();H.done?N=!0:R.push(H.value)}const M=R.reduce((H,$)=>H+$.length,0);w=new Uint8Array(o||M);let W=0;for(const H of R)w.set(H,W),W+=H.length}return new TextDecoder().decode(w).replace(/<\/w:p>/g,`
`).replace(/<\/w:tr>/g,`
`).replace(/<[^>]+>/g,"").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim()}a=m+i,r&8&&(a+=16)}return""}const cs=Object.freeze(Object.defineProperty({__proto__:null,extractDocxTextFromBuffer:Oa},Symbol.toStringTag,{value:"Module"})),us=[{pattern:/\b(remind|reminder|schedule|alarm|timer|recurring|every\s+\d|at\s+\d{1,2}:\d{2}|daily\s+at|weekly|cron|set.*alert|wake.*up)\b/i,weight:.9},{pattern:/\bremi[a-z]{0,5}\s+(me|us)\b/i,weight:.9},{pattern:/[.!]\s*[Tt]ask\s*$/,weight:.95},{pattern:/\bas\s+a\s+task\s*$/i,weight:.95},{pattern:/^[Tt]ask:\s*/,weight:.95},{pattern:/\b(list\s+schedule|my\s+schedule|active\s+schedule|pause|unpause|disable\s+schedule|enable\s+schedule)\b/i,weight:.9},{pattern:/\b(change\s+(the\s+)?time|update\s+(the\s+)?(reminder|schedule|alarm)|reschedule|move\s+it\s+to|cancel\s+(the\s+)?(reminder|schedule|alarm)|delete\s+(the\s+)?(reminder|schedule|alarm))\b/i,weight:.9},{pattern:/\b(show\s+(me\s+)?(my\s+)?(reminders?|schedules?|alarms?)|what\s+reminders?|any\s+reminders?|do\s+i\s+have.*remind|when\s+is\s+my\s+remind)\b/i,weight:.9},{pattern:/\b(stop|turn\s+off|switch\s+off|disable|deactivate)\s+(that|the|this|my)?\s*(reminder|schedule|alarm|notification)\b/i,weight:.9},{pattern:/\b(snooze|postpone|push\s+back|remind\s+me\s+later|later\s+reminder)\b/i,weight:.9},{pattern:/\b(change|update|edit|move|shift)\s+(it|this|that)\s+(to|for)\b/i,weight:.85},{pattern:/\bset\s+it\s+(for|at|to)\b/i,weight:.85},{pattern:/\b(what\s+time|when)\s+(did\s+i\s+set|is\s+(the|my)\s+remind|does\s+(it|that)\s+go\s+off)\b/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz)\s+me\s+in\s+\d+/i,weight:.9},{pattern:/\b(tell|notify|alert|ping|nudge|buzz|remind)\s+me\s+(?:at|by)\s+\d{1,2}/i,weight:.9},{pattern:/\b(in\s+\d+\.?\s*(minutes?|mins?|hours?|hrs?|h|days?))\b/i,weight:.85},{pattern:/\b(in\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|alert|notify|tell|look|search))\b/i,weight:.9},{pattern:/\b(after\s+\d+\s+(hours?|hrs?|minutes?|mins?|days?)\s+(check|remind|look|search|tell|notify))\b/i,weight:.9},{pattern:/\b(check\s+(back|again|status|on\s+(it|this|that))\s+(in|after)\s+\d)\b/i,weight:.9},{pattern:/\b(sheet|spreadsheet|google\s*doc|drive|calendar|gmail|email|inbox|unread|draft|send\s+email|compose|mail)\b/i,weight:.85},{pattern:/\b(create\s+doc|read\s+doc|append\s+to|write\s+to\s+sheet|budget|expense|add\s+event|my\s+events|tomorrow['']?s?\s+schedule)\b/i,weight:.9},{pattern:/\b(add|save|append|write|put)\s+(to|in|into)\s+(my\s+|your\s+|the\s+)?(quick\s+)?notes?\b|\bquick\s+notes\b/i,weight:.88},{pattern:/\b(update\s+cell|change\s+cell|delete\s+row|remove\s+row|delete\s+duplicate|remove\s+duplicate|create\s+(a\s+)?(new\s+)?(tab|sheet)|add\s+(a\s+)?tab|what.{0,15}(column|row\s+\d|cell\s+[A-Z])|sum\s+of|total\s+(in|of))\b/i,weight:.9},{pattern:/\b(forward\s+(that\s+)?(email|message)|reply\s+to\s+(that|the|an?\s+)?email|respond\s+to\s+(that|the)\s+email|mark\s+(it|that|this|email)\s+as|(got|received)\s+an?\s+email\s+from)\b/i,weight:.85},{pattern:/\b(cancel\s+(the\s+)?(event|meeting|appointment)|reschedule\s+(the\s+|my\s+)?(meeting|event|appointment)|delete\s+(from|the)\s+calendar|remove\s+(the\s+)?(event|meeting)\s+from\s+calendar)\b/i,weight:.9},{pattern:/\b(write\s+(an?\s+)?(essay|article|report|letter|document|doc|blog|post|summary|draft)|draft\s+(an?\s+)?(essay|article|report|letter|email|document))\b/i,weight:.9},{pattern:/\b(emails?\s+(i|we)\s+(got|received|have)|latest\s+emails?|recent\s+emails?|new\s+mail|any\s+mail|check\s+(my\s+)?mail|my\s+mail)\b/i,weight:.9},{pattern:/\b(what\s+emails?|show\s+(me\s+)?(my\s+)?emails?|(e?mails?)\s+(from|about|regarding|wrt|re |related))\b/i,weight:.9},{pattern:/\b(read_sheet|write_sheet|append_sheet|create_sheet|list_calendar|create_calendar|gmail_list|gmail_read|gmail_send|gmail_draft|drive_list|drive_search)\b/i,weight:.95},{pattern:/\b(do\s+i\s+have\s+(any(thing)?|something)\s+(tomorrow|today|this\s+week|on\s+\w+day))\b/i,weight:.9},{pattern:/\b(what['']?s\s+(my|the)\s+day\s+look\s+like|what['']?s\s+on\s+(my|the)\s+(calendar|agenda|schedule))\b/i,weight:.9},{pattern:/\b(meetings?\s+(today|tomorrow|this\s+week)|today['']?s?\s+(meetings?|events?)|any\s+(meetings?|events?)\s+(today|tomorrow))\b/i,weight:.9},{pattern:/\b(free\s+(slots?|time)|am\s+i\s+(free|busy|available)\s+(on|today|tomorrow))\b/i,weight:.85},{pattern:/^\s*\w+\s+\d{2,}\s*$/i,weight:.7},{pattern:/\b(search|research|look\s+up|investigate|find\s+out|what\s+is|who\s+is|fact\s*check|fake\s*news|is\s+this\s+true|latest\s+news|check\s+news|trending)\b/i,weight:.8},{pattern:/\b(read\s+this\s+(page|article|link|url)|https?:\/\/)\b/i,weight:.85},{pattern:/\b(compare|vs\.?|versus|pros\s+and\s+cons|review|analysis)\b/i,weight:.75},{pattern:/\b(youtube|video|tutorial|directions|navigate|how\s+to\s+get\s+to|translate|places?\s+near|restaurant|store|hotel)\b/i,weight:.8},{pattern:/\bis\s+.{2,30}\s+(dead|alive|arrested|fired|resigned|elected|assassinated|killed|shot|bombed|attacked|released|announced|cancelled|banned|married|divorced|pregnant|retired)\b/i,weight:.85},{pattern:/\b(did\s+.{2,30}\s+(die|resign|win|lose|happen|start|end|announce|launch|release|attack|invade|crash|explode))\b/i,weight:.85},{pattern:/\b(has\s+.{2,30}\s+(died|been\s+killed|been\s+arrested|been\s+fired|resigned|won|launched|started|ended|crashed))\b/i,weight:.85},{pattern:/\b(what\s+happened|breaking\s+news|current\s+event|today['']?s?\s+news|any\s+news|world\s+news)\b/i,weight:.85},{pattern:/\b(stock\s+price|exchange\s+rate|weather\s+(in|today|forecast)|score|result|election|poll)\b/i,weight:.8},{pattern:/\b(how\s+much\s+(does|is)|price\s+of|cost\s+of|where\s+(can|do|is|to)\s+(i|we)?\s*(buy|find|get))\b/i,weight:.75},{pattern:/\b(track|tracking|delivery|shipment|courier|package|order\s+status|where['']?s?\s+my\s+(order|package|delivery|shipment))\b/i,weight:.85},{pattern:/\b(has\s+(my|the)\s+(order|package|delivery)\s+(arrived|shipped|been\s+delivered)|delivery\s+status|shipping\s+status)\b/i,weight:.85},{pattern:/\b(how\s+do\s+(i|you|we)|how\s+to|can\s+you\s+explain|what\s+does\s+.{2,20}\s+mean|ELI5|explain\s+like)\b/i,weight:.7},{pattern:/\b(remember|store\s+this|save\s+this\s+to\s+memory|don['']?t\s+forget|recall|what\s+do\s+you\s+(know|remember)\s+about|my\s+memory|stored\s+memories|system\s+status)\b/i,weight:.9},{pattern:/\b(search\s+memory|check\s+memory|in\s+your\s+memory|what\s+do\s+you\s+remember|what.*stored)\b/i,weight:.9},{pattern:/\b(keep\s+(that\s+)?in\s+mind|always\s+(do|use|prefer|remember)|update\s+(my\s+)?(memory|preference)|delete\s+(that\s+)?memory|forget\s+that|what\s+did\s+i\s+tell\s+you\s+about)\b/i,weight:.9},{pattern:/\b(note\s+to\s+self|i\s+need\s+to\s+(?!schedule|remind|set|create|add\s+to)|follow\s+up\s+with|add\s+(a\s+)?task|create\s+(a\s+)?task|open\s+task|pending\s+task|to[\s-]?do|todo)\b/i,weight:.88},{pattern:/\b(mark\s+.{1,40}\s+as\s+(done|complete|finished|closed)|task\s+done|close\s+task|complete\s+task|crossed\s+off)\b/i,weight:.9}];function on(e,t){for(const n of us)if(n.pattern.test(e))return{agent:"multi",confidence:n.weight,reasoning:"Keyword match — full agent"};return t&&e.trim().length<80&&t.split(`
`).slice(-16).some(r=>/\[TOOLS_USED:/i.test(r)||/\b(reminder|reminders|schedule|scheduled|cron|alarm|next_run|set for|going off|remind)\b/i.test(r)||/\b(i['']ll\s+(search|research|find|look\s+up|check|add|create|book)|just\s+a\s+moment|pulling\s+that\s+together|on\s+it\b|let\s+me\s+(search|research|find|look))\b/i.test(r))?{agent:"multi",confidence:.8,reasoning:"Active tool session follow-up — full agent"}:t&&/spreadsheet|sheet|google\s*sheet/i.test(t)&&/\b(event|crew|venue|program|budget|expense|data|who|what|when|list|show)\b/i.test(e)?{agent:"multi",confidence:.85,reasoning:"Memory context — full agent"}:{agent:"conversation",confidence:.8,reasoning:"No tool-triggering keywords — general conversation"}}function Ca(e){const t=e.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')]+/);if(t&&/\b(delete|trash|remove)\b/i.test(e))return{tool:"drive_delete_file",args:{url_or_id:t[0].replace(/[.,;)]$/,"")}};if(/\b(list|show|display)\s+(my\s+)?(google\s+)?drive\s+(files?|docs?|documents?|folders?)\b|\bwhat\s+(files?|docs?|documents?)\s+(do\s+i\s+have|are|is)\s+(in|on)\s+(my\s+)?(google\s+)?drive\b/i.test(e))return{tool:"drive_list",args:{}};const n=e.match(/\b(?:search|find|look\s+(?:for|up))\s+(?:(?:in|on|my|the|google)\s+)*drive\s+(?:for\s+)?(.{3,60}?)(?:\s*[?.!,])?$/i);return n?{tool:"drive_search",args:{query:n[1].trim()}}:/\b(how\s+many\s+unread|unread\s+(count|emails?|messages?)|any\s+unread\s+(emails?|messages?))\b/i.test(e)?{tool:"gmail_unread_count",args:{}}:/\b(list|show|display)\s+(my\s+)?(upcoming\s+)?(calendar\s+)?(events?|meetings?|appointments?)\b/i.test(e)&&!/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next\s+week|this\s+week|\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))\b/i.test(e)?{tool:"list_calendar_events",args:{}}:/\b(list|show|display)\s+(my\s+)?(active\s+)?(reminders?|schedules?|alarms?)\b|\bwhat\s+reminders?\s+(do\s+i\s+have|are\s+set|are\s+active)\b/i.test(e)?{tool:"list_schedules",args:{}}:null}function Na(e,t){if(/\b(delete|trash|remove)\b.{0,50}\b(file|doc|document|sheet|spreadsheet|folder)\b|\b(file|doc|document|sheet|spreadsheet)\b.{0,50}\b(delete|trash|remove)\b/i.test(e)){const n=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(n)return{tool:"drive_delete_file",args:{url_or_id:n[0].replace(/[.,;)]$/,"")}}}if(/\b(move|rename|organise|organize)\b.{0,50}\b(file|doc|document|sheet)\b/i.test(e)){const n=t.match(/https:\/\/(drive|docs|sheets|slides)\.google\.com\/[^\s<>"')\]]+/);if(n){const a={url_or_id:n[0].replace(/[.,;)]$/,"")},r=e.match(/\bto\s+(?:the\s+)?(?:folder\s+)?["']?([A-Za-z0-9 _-]{2,40})["']?\s*(?:folder\b|$)/i),s=e.match(/\brename\b.{0,30}\bto\s+["']?([A-Za-z0-9 _.-]{2,60})["']?/i);if(r&&(a.folder_name=r[1].trim()),s&&(a.new_name=s[1].trim()),a.folder_name||a.new_name)return{tool:"drive_organise",args:a}}}return null}function Ia(e,t,n,a,r,s){const i=t.assistant_name||"Karna",o=t.personality_prompt?`
## Personality
${t.personality_prompt.substring(0,2e3)}
`:"",l=n?`
## Active Memory (ALWAYS consult before responding)
${n}
`:"";let d="";try{const m=new Date;d=new Intl.DateTimeFormat("en-GB",{timeZone:t.timezone,day:"numeric",month:"short",year:"numeric"}).format(m)}catch{d=""}const c=`
## Current User
- **Name**: ${t.name}
- **Timezone**: ${t.timezone}
- **Time**: ${r}
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
- **HARD RULE — no false confirmations**: You have ZERO tool access. You CANNOT set reminders, create schedules, send emails, read sheets, or perform any action. NEVER output phrases like "Reminder set for...", "I've scheduled...", "Done ✅", "Task created", or any language implying an action was completed. If the user wants an action, say: "I can do that — just send your message and I'll take care of it." Do NOT simulate the outcome.`;default:return""}}const ms=Object.freeze(Object.defineProperty({__proto__:null,buildSubAgentPrompt:Ia,classifyIntentFast:on,detectDeterministicOp:Ca,detectTierTwoOp:Na},Symbol.toStringTag,{value:"Module"})),ps=2e3,hs=2e3,Aa=4;function Kt(e){return Math.ceil(e.length/Aa)}function Sn(e,t){const n=t*Aa;return e.length<=n?e:e.slice(0,n)+`
[...truncated to fit token budget]`}function La(e){const t=new Set(["(Previous response was not recorded.)","(Previous request did not complete. Please try again.)","(My previous response was cut off before completing. Starting fresh.)"]),n=[];for(const r of e){const s=typeof r.content=="string"?r.content:"";if(r.role==="assistant"&&t.has(s.trim())&&n.length>0&&n[n.length-1].role==="user"){n.pop();continue}n.push(r)}const a=[];for(const r of n){let s=r.content;r.role==="assistant"&&typeof s=="string"&&(s=s.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim(),s||(s="(Previous response was not recorded.)"));const i=s!==r.content?{...r,content:s}:r;a.length>0&&a[a.length-1].role===i.role&&i.role!=="system"?a[a.length-1]={...a[a.length-1],content:a[a.length-1].content+`

`+i.content}:a.push(i)}return a}const xn=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes, daily = at a specific time (HH:MM), weekly = day of week at time (e.g. "Friday 17:00"), once = specific date and time (e.g. "2026-03-12 14:30")'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration requests: "in 5 minutes", "in 2 hours", "in half an hour". Do NOT use for any request that mentions a specific time or date ("at 13:00", "tomorrow at noon", "next Friday") — use schedule_value instead. Examples: "in 5 minutes" = 5, "in 2 hours" = 120.'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"update_schedule",description:'Update an existing scheduled task — change its name, description, or reschedule it to a new time. Use this when the user wants to change the time of a reminder or rename it. You MUST call this tool — never say "updated" without calling it.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to update (get it from list_schedules first if unknown)"},name:{type:"string",description:"New name for the task (optional)"},description:{type:"string",description:"New description (optional)"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:"New schedule type (required if changing the time)"},schedule_value:{type:"string",description:"New schedule value matching the schedule_type format (required if changing the time)"},minutes_from_now:{type:"number",description:'Use ONLY for pure relative-duration changes ("in 30 minutes", "in 2 hours"). Do NOT use if the user specifies a clock time or date — use schedule_value instead.'}},required:["job_id"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:'Store a PERMANENT rule, preference, or standing instruction that Ruby should always know about the user. USE FOR: writing style, persistent preferences, standing rules ("always check Outlook"), spreadsheet/doc IDs the user references often, behavioural patterns. DO NOT USE FOR: one-off tasks, reminders, follow-ups, transient facts (orders, deliveries, single events) — those go to create_schedule. Ask yourself: "Will this still be relevant in 6 months?" If no, do not store it.',parameters:{type:"object",properties:{type:{type:"string",enum:["preference","context","fact"],description:'"preference" = how the user wants things done. "context" = a resource/reference they use repeatedly (sheet ID, doc ID). "fact" = a permanent fact about the user.'},title:{type:"string",description:"Short descriptive title"},content:{type:"string",description:"The permanent rule or reference to remember."},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for standing rules that must always be followed."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"delete_memory",description:'Delete a stored memory entry by its ID. Use when the user says "forget that", "remove that rule", or "that preference is wrong". Always call search_memory first to confirm the correct ID. Confirm with the user if there is any ambiguity about which entry to remove.',parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to delete"}},required:["id"]}},{name:"update_memory",description:"Update the content of an existing memory entry by its ID. Use when the user wants to correct or change a stored rule or preference. Always call search_memory first to find the correct ID.",parameters:{type:"object",properties:{id:{type:"number",description:"The ID of the memory entry to update"},content:{type:"string",description:"The new content to replace the existing entry"}},required:["id","content"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Returns cell values as rows, PLUS a list of all tabs in the spreadsheet. Use plain range like "A1:Z500" for the first tab. To read a specific tab, use "TabName!A1:Z500". The response always shows which tab was read and what other tabs exist — use this to navigate multi-tab sheets (e.g. monthly tabs like "February", "March").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. IMPORTANT: You MUST call read_sheet first to check the column order and any formula patterns before appending. Match the exact header layout. For formula columns (Running Total, etc.), include the updated formula for the new row. Use plain numbers for amounts (not currency-formatted strings).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"delete_sheet_row",description:"Delete a specific row from a Google Sheet tab by row number. The row number is as displayed in the sheet (1-based: row 1 = header, row 2 = first data row). Rows below shift up. ALWAYS call read_sheet first to confirm the exact row number before deleting. Cannot delete row 1 (header).",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},sheet_name:{type:"string",description:'Tab name exactly as shown in the sheet (e.g. "Sheet1", "Budget", "January")'},row_number:{type:"number",description:"Row number to delete (1-based, as shown in the sheet). Minimum 2."}},required:["spreadsheet_id","sheet_name","row_number"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"rewrite_doc",description:"Replace the entire content of an existing Google Document with new formatted content. Use this to reformat or clean up a document — clears the current content and rewrites it with proper headings, bold, bullet points etc. Workflow: read_doc to get current content → rewrite_doc with reformatted version.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to rewrite (from URL: docs.google.com/document/d/{ID}/edit)"},content:{type:"string",description:"New formatted content (supports markdown: # ## ### headings, **bold**, *italic*, - bullets)"}},required:["document_id","content"]}},{name:"delete_doc_content",description:"Remove specific text from a Google Document by exact string match. Removes ALL occurrences of the text. Use this to delete a duplicate entry — call read_doc first to find the exact text. If text appears twice (duplicate), both copies are removed; use append_to_doc immediately after to add the single correct version back.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"},text_to_remove:{type:"string",description:"Exact text to remove, including any surrounding whitespace or line breaks needed to cleanly remove the entry."}},required:["document_id","text_to_remove"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:'Send an email via Gmail IMMEDIATELY and irreversibly. STRICT RULES — violating any of these is a critical error: (1) ONLY call this if the user has provided an explicit email address (e.g. john@company.com). A name alone ("marketing", "John") is NOT enough — use gmail_draft instead and tell the user to confirm. (2) NEVER fabricate email body content. Only use data you retrieved from tools in this same conversation. If you do not have the actual content (costs, numbers, details), do NOT call this — tell the user exactly what information is missing and ask them to provide it. (3) If the user message ends with "Task" or "as a task", do NOT send — store as a task via store_memory instead.',parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages. IMPORTANT: If the user specifies CC recipients, you MUST use the cc parameter — do NOT put CC info in the body text.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated email addresses)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"drive_read_file",description:"Read the content of a specific Google Drive file by URL or file ID. Supports Google Docs (exported as text), Sheets (exported as CSV), PDFs (extracted via AI), and other text files. Use this when the user shares a Google Drive or Google Docs link and wants you to read, summarize, or analyze the file contents.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive or Google Docs URL (e.g. https://drive.google.com/file/d/... or https://docs.google.com/document/d/...) or bare file ID"},extract_focus:{type:"string",description:'Optional: specific content to focus extraction on (e.g. "financial figures", "action items", "table of contents")'}},required:["url_or_id"]}},{name:"drive_delete_file",description:"Move a Google Drive file or document to trash. The file can be restored from Drive trash within 30 days. Use when the user asks to delete, remove, or trash a file.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to trash"}},required:["url_or_id"]}},{name:"drive_organise",description:"Move a Google Drive file to a folder and/or rename it. Creates the folder if it does not exist. Use when the user wants to organise, move, or rename a file in Drive.",parameters:{type:"object",properties:{url_or_id:{type:"string",description:"Google Drive URL or bare file ID of the file to move/rename"},folder_name:{type:"string",description:"Name of the destination folder. Creates it if it does not exist."},new_name:{type:"string",description:"Optional: new name for the file"}},required:["url_or_id"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets (~1s). Use ONLY when: (1) the user wants a list of links to browse, not a synthesized answer, (2) real-time scores or breaking headlines, or (3) fallback if research tool fails. If the user wants an actual answer (not links), use research instead.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:"Deep web research — synthesizes a detailed report from multiple sources. Uses Perplexity Sonar when available (~5s), otherwise fetches and reads 3-5 pages (~15s). Default search tool — use whenever your training knowledge might be stale, uncertain, or high-stakes. Covers: weather, travel, recommendations, comparisons, product questions, reviews, current data, anything needing a verified or up-to-date answer. Only skip this in favor of web_search when user wants raw links or real-time scores.",parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Weather in Bangkok May 12-19", "Best rooftop bars in Bangkok with happy hours", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"browser_task",description:'Run a complete browser automation workflow using a real cloud browser. The cloud agent handles ALL steps — navigation, clicks, form fills, extraction — in a single call. CRITICAL: Always pass the ENTIRE multi-step workflow as one task description. Never split a browser workflow across multiple browser_task calls. Wrong: call 1 "go to site", call 2 "click X", call 3 "extract Y". Correct: one call with "go to site, click X, extract Y". Use for: JS-heavy sites, form submission, clicking through pages, any site requiring a real browser.',parameters:{type:"object",properties:{task:{type:"string",description:'Full Plain-English description of the COMPLETE workflow (e.g. "Go to news.ycombinator.com and return the top 5 story titles and URLs", "Go to books.toscrape.com, click the Mystery category, list the first 5 books with their star rating and price")'},site_name:{type:"string",description:'Optional: name of a saved Secret Vault entry (e.g. "LinkedIn", "Gmail backup") to inject login credentials automatically. The credentials will be passed securely to the browser agent.'}},required:["task"]}},{name:"browser_task_status",description:"Check the status of a previously started browser task that was still running when it timed out. Use when the user asks what happened with a browser task. Get the task_id from memory.",parameters:{type:"object",properties:{task_id:{type:"string",description:"The task ID returned by the earlier browser_task call (stored in memory)"}},required:["task_id"]}},{name:"vault_lookup",description:"Check the Secret Vault for saved login credentials by site name. Returns matching entry names (not actual credentials). Use this BEFORE calling browser_task whenever the user asks to access a site that requires a password or login.",parameters:{type:"object",properties:{site_name:{type:"string",description:'Site or service name to look up (e.g. "LinkedIn", "Gmail backup", "MyBank"). Case-insensitive, partial matches included.'}},required:["site_name"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}},{name:"parse_document",description:"Read and extract text content from an uploaded file (PDF, Word/DOCX, or text). Call this whenever the user uploads a document and wants you to read it, extract information, or work with its contents.",parameters:{type:"object",properties:{file_id:{type:"string",description:"The file_id returned when the file was uploaded"},extract_focus:{type:"string",description:'Optional: specific information to focus on extracting (e.g., "quantities and equipment names", "dates and amounts", "all text content")'}},required:["file_id"]}},{name:"create_skill",description:"Create a new reusable skill — a named workflow that can be invoked by name in future conversations. Use this when the user asks you to create a skill, save a workflow, or build a reusable automation. IMPORTANT: Before calling this, ask the user clarifying questions to understand: what the skill should do, what inputs it needs, what tools it uses, and what the expected output is.",parameters:{type:"object",properties:{name:{type:"string",description:'Human-readable skill name (e.g., "Equipment List Parser", "Daily Expense Logger")'},description:{type:"string",description:"One-sentence description of what the skill does"},instructions:{type:"string",description:"Detailed step-by-step instructions for executing the skill. Be specific about which tools to use, in what order, and what to do with the results."},required_tools:{type:"array",items:{type:"string"},description:'List of tool names this skill needs (e.g. ["parse_document", "append_sheet", "create_sheet"])'},parameters:{type:"object",description:"JSON schema describing the inputs this skill accepts. Use standard JSON schema format."},examples:{type:"array",description:"Optional example inputs and expected outputs to guide execution",items:{type:"object",properties:{input:{type:"object"},output:{type:"string"}}}}},required:["name","description","instructions"]}},{name:"list_skills",description:"List all custom skills the user has created. Shows name, description, and usage count for each.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled skills. Default: false"}}}}];async function ln(e,t){try{const a=((await e.prepare("SELECT slug, name, description, parameters FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at ASC").bind(t).all()).results||[]).map(r=>{let s={};try{s=JSON.parse(r.parameters)||{}}catch{}return s.properties||(s={type:"object",properties:{inputs:{type:"string",description:"Any additional context or specific instructions for this skill execution"}}}),{name:r.slug,description:`[Custom Skill] ${r.description}`,parameters:s}});return[...xn,...a]}catch{return xn}}async function dn(e,t){try{const a=(await e.prepare("SELECT content FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t).all()).results||[];return a.length===0?"":a.map(r=>`- ${r.content}`).join(`
`)}catch{return""}}function Ma(e,t,n,a){const r=e.assistant_name||"Karna",s=e.personality_prompt?Sn(`## Personality Instructions
${e.personality_prompt}
`,ps):"",i=a!=null&&a.trim()?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. They are fixed — do not store copies of these in your memory or contradict them.
${a}
`:"",o=Sn(t,hs);return`You are ${r} — a personal AI assistant. Your name is ${r} — always refer to yourself by this name if asked.

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
${$a(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.${n==="telegram"?`

## TELEGRAM CONSTRAINTS — 25-second hard limit
- **Essays / documents**: Keep written content under 400 words. Write directly from your knowledge — do NOT call web_search before writing. Call create_doc in one shot immediately.
- **Research + save**: One web_search, then immediately create_doc or gmail_draft with the findings. Do NOT call read_url on multiple pages. Pattern: web_search → create_doc (or gmail_draft).
- **Reminders**: When the user says "remind me in X" or "set a reminder", you MUST call create_schedule. For a specific time/date ("at 13:00", "tomorrow at noon", "next Friday at 5pm"), ALWAYS use \`schedule_value\` with the exact datetime in the user's local timezone — NEVER use \`minutes_from_now\` for clock-time requests (it causes wrong times). Only use \`minutes_from_now\` for pure duration requests like "in 30 minutes" or "in 2 hours".
- **No narration**: Every action must be an actual tool call. Never say "Now let me..." or "I'll now..." — just call the tool.
- **Long content intent check**: When asked to write long-form content (essay, article, report — likely over 200 words) WITHOUT a save destination specified, do NOT start writing. Ask first: "Should I save this as a Google Doc and send you the link, or write it here in chat?" Wait for the response. If Drive/Doc, call \`create_doc\` with full content and return only the link. **Exception: if you have already executed one or more tools in this chain (e.g. research, web_search), skip this check and continue directly to the next step.**`:""}`}async function Yt(e,t,n){var d;const r=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${n.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let s;((d=r.files)==null?void 0:d.length)>0?s=r.files[0].id:s=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:n,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${s}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:s,folderName:n}}function Mt(e){return e.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").replace(/<function_calls>[\s\S]*?<\/function_calls>/gi,"").replace(/<function_result>[\s\S]*?<\/function_result>/gi,"").trim()}function $a(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}async function bt(e,t,n,a,r,s,i,o,l,d,c,m,h){const w=Date.now();let f=!0,_="",y="";try{return y=await fs(e,t,n,a,s,i,o,l,d,c,m,h),y}catch(S){throw f=!1,_=S.message||"Unknown error",S}finally{const S=Date.now()-w;try{await n.prepare(`INSERT INTO tool_execution_log (user_id, agent_type, provider_name, tool_name, tool_args, tool_result, success, error_message, latency_ms, was_enforcement_retry, channel)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(a,r.agentType||null,r.providerName||null,e,JSON.stringify(t).substring(0,2e3),(f?y:"").substring(0,500),f?1:0,_||null,S,r.isEnforcementRetry?1:0,r.channel||"web").run()}catch{}}}function Ba(e){const t=e.length;for(let n=0;n<t-1;n++){const a=e[n];if(a.role!=="user"||typeof a.content!="string")continue;const r=t-1-n,s=r<=2?12e3:r<=4?5e3:2e3;a.content.length>s&&(e[n]={...a,content:a.content.substring(0,s)+`
[...truncated in history to reduce context size]`})}}function gs(e){const t=[];let n=[],a="",r=!1,s=0;const i=e.length;for(;s<i;){const o=e[s];if(r){if(o==='"'){if(e[s+1]==='"'){a+='"',s+=2;continue}r=!1,s++;continue}a+=o,s++;continue}if(o==='"'){r=!0,s++;continue}if(o===","){n.push(a),a="",s++;continue}if(o==="\r"&&e[s+1]===`
`){n.push(a),t.push(n),n=[],a="",s+=2;continue}if(o===`
`||o==="\r"){n.push(a),t.push(n),n=[],a="",s++;continue}a+=o,s++}for((a||n.length)&&(n.push(a),t.push(n));t.length&&t[t.length-1].every(o=>o==="");)t.pop();return t}async function fs(e,t,n,a,r,s,i,o,l,d,c,m){var w,f,_,y,S,E,R,N,M,W,H,$,q,z,O,U;const h=new K(n);switch(e){case"create_schedule":{const u=new Date;let v;const p=d||"UTC";if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){v=new Date(u.getTime()+t.minutes_from_now*60*1e3);const D=v.toLocaleString("en-US",{timeZone:p,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[I,B,C]=(D[0]||"").split("/");t.schedule_value=`${C}-${I}-${B} ${D[1]||"00:00"}`,t.schedule_type="once"}else if(t.schedule_type==="interval"){const T=parseInt(t.schedule_value,10);v=new Date(u.getTime()+T*60*1e3)}else if(t.schedule_type==="daily"){const[T,D]=t.schedule_value.split(":").map(Number),I=u.toLocaleString("en-US",{timeZone:p}),B=new Date(I),C=new Date(B);C.setHours(T,D,0,0),C<=B&&C.setDate(C.getDate()+1);const L=new Date(C.toLocaleString("en-US",{timeZone:"UTC"})),F=new Date(C.toLocaleString("en-US",{timeZone:p})),J=L.getTime()-F.getTime();v=new Date(C.getTime()+J)}else if(t.schedule_type==="weekly"){const[T,D]=t.schedule_value.split(" "),[I,B]=(D||"00:00").split(":").map(Number),L=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Ve=>Ve.toLowerCase()===T.toLowerCase()),F=u.toLocaleString("en-US",{timeZone:p}),J=new Date(F),X=new Date(J);X.setHours(I,B,0,0);let ee=(L-X.getDay()+7)%7;ee===0&&X<=J&&(ee=7),X.setDate(X.getDate()+ee);const Q=new Date(X.toLocaleString("en-US",{timeZone:"UTC"})),se=new Date(X.toLocaleString("en-US",{timeZone:p})),me=Q.getTime()-se.getTime();v=new Date(X.getTime()+me)}else if(t.schedule_type==="once"){const[T,D]=t.schedule_value.split(" "),[I,B,C]=T.split("-").map(Number),[L,F]=(D||"00:00").split(":").map(Number),J=u.toLocaleString("en-US",{timeZone:p}),X=new Date(J),ee=new Date(X);ee.setFullYear(I,B-1,C),ee.setHours(L,F,0,0);const Q=new Date(ee.toLocaleString("en-US",{timeZone:"UTC"})),se=new Date(ee.toLocaleString("en-US",{timeZone:p})),me=Q.getTime()-se.getTime();v=new Date(ee.getTime()+me);const Ve=new Date(u.getTime()+120*1e3);if(v.getTime()<u.getTime()+60*1e3){const Ut=v.toISOString();v=Ve;const pt=` [Note: The requested time ${t.schedule_value} in ${p} resolved to ${Ut} UTC which is in the past. Auto-adjusted to fire in ~2 minutes at ${v.toISOString()}.]`;t._pastTimeWarning=pt}}else v=new Date(u.getTime()+3600*1e3);if(await n.prepare("SELECT id FROM cron_jobs WHERE user_id = ? AND name = ? AND schedule_type = ? AND schedule_value = ? AND state != 'completed' LIMIT 1").bind(a,t.name,t.schedule_type,t.schedule_value).first()){const T=v.toLocaleString("en-US",{timeZone:p,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule already exists: "${t.name}" is already set for ${T} (${p}). No duplicate created.`}await n.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(a,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),v.toISOString()).run();const b=t._pastTimeWarning||"",x=v.toLocaleString("en-US",{timeZone:p,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return`Schedule created: "${t.name}" — ${t.schedule_type}. Will fire at ${x} (${p}). [UTC: ${v.toISOString()}]${b}. IMPORTANT: Use the exact time "${x}" when confirming to the user — do NOT calculate or guess the time yourself.`}case"list_schedules":{const v=(await n.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(a).all()).results||[];return v.length===0?"No scheduled tasks found.":v.map(p=>`[ID:${p.id}] ${p.enabled?"▶":"⏸"} "${p.name}" — [${p.schedule_type}] ${p.schedule_value} — ${p.action_type} — state: ${p.state||"active"} — next: ${p.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const u=t.enabled?1:0,v=u?"active":"paused";return await n.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(u,v,t.job_id,a).run(),`Schedule ${t.job_id} ${u?"enabled (active)":"paused"}.`}case"update_schedule_state":{const u=["created","active","reminding","paused","completed"],v=t.state;if(!u.includes(v))return`Invalid state "${v}". Valid states: ${u.join(", ")}`;const p=v==="completed"||v==="paused"?0:1;return await n.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(v,p,t.job_id,a).run(),`Schedule ${t.job_id} state updated to "${v}".`}case"update_schedule":{const u=t.job_id,v=d||"UTC",p=new Date,g=["updated_at = CURRENT_TIMESTAMP"],b=[];t.name&&(g.push("name = ?"),b.push(t.name)),t.description&&(g.push("description = ?"),b.push(t.description));let x=null,T=t.schedule_type,D=t.schedule_value;if(t.minutes_from_now&&typeof t.minutes_from_now=="number"&&t.minutes_from_now>0){x=new Date(p.getTime()+t.minutes_from_now*60*1e3);const C=x.toLocaleString("en-US",{timeZone:v,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).split(", "),[L,F,J]=(C[0]||"").split("/");D=`${J}-${L}-${F} ${C[1]||"00:00"}`,T="once"}else if(T&&D){if(T==="interval")x=new Date(p.getTime()+parseInt(D,10)*60*1e3);else if(T==="daily"){const[B,C]=D.split(":").map(Number),L=new Date(p.toLocaleString("en-US",{timeZone:v})),F=new Date(L);F.setHours(B,C,0,0),F<=L&&F.setDate(F.getDate()+1);const J=new Date(F.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(F.toLocaleString("en-US",{timeZone:v})).getTime();x=new Date(F.getTime()+J)}else if(T==="weekly"){const[B,C]=D.split(" "),[L,F]=(C||"00:00").split(":").map(Number),X=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(Ve=>Ve.toLowerCase()===B.toLowerCase()),ee=new Date(p.toLocaleString("en-US",{timeZone:v})),Q=new Date(ee);Q.setHours(L,F,0,0);let se=(X-Q.getDay()+7)%7;se===0&&Q<=ee&&(se=7),Q.setDate(Q.getDate()+se);const me=new Date(Q.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(Q.toLocaleString("en-US",{timeZone:v})).getTime();x=new Date(Q.getTime()+me)}else if(T==="once"){const[B,C]=D.split(" "),[L,F,J]=B.split("-").map(Number),[X,ee]=(C||"00:00").split(":").map(Number),Q=new Date(p.toLocaleString("en-US",{timeZone:v})),se=new Date(Q);se.setFullYear(L,F-1,J),se.setHours(X,ee,0,0);const me=new Date(se.toLocaleString("en-US",{timeZone:"UTC"})).getTime()-new Date(se.toLocaleString("en-US",{timeZone:v})).getTime();x=new Date(se.getTime()+me),x.getTime()<p.getTime()+60*1e3&&(x=new Date(p.getTime()+120*1e3))}}if(T&&(g.push("schedule_type = ?"),b.push(T)),D&&(g.push("schedule_value = ?"),b.push(D)),x&&(g.push("next_run = ?"),b.push(x.toISOString())),g.length===1)return"No changes provided. Specify name, description, or schedule fields to update.";b.push(u,a),await n.prepare(`UPDATE cron_jobs SET ${g.join(", ")} WHERE id = ? AND user_id = ?`).bind(...b).run();const I=x?x.toLocaleString("en-US",{timeZone:v,weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):null;return`Schedule ${u} updated.${I?` New fire time: ${I} (${v}).`:""} IMPORTANT: Use this exact time "${I}" when confirming to the user.`}case"delete_schedule":return await n.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,a).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const u=t.importance||5,v=t.type==="task"?"preference":t.type,p=u>=7?"working":"long_term";return await h.store(a,v,t.title,t.content,u,p),`Stored in ${p==="working"?"working":"long-term"} memory: [${v}] ${t.title} (importance: ${u})`}case"search_memory":{const u=await h.search(a,t.query);return u.length===0?"No matching memories found.":u.map(v=>`[id:${v.id}] [${v.tier||"long_term"}] [${v.type}] **${v.title}**: ${v.content}`).join(`
`)}case"delete_memory":return await h.remove(t.id,a),`Memory entry ${t.id} deleted.`;case"update_memory":return await h.update(t.id,a,t.content),`Memory entry ${t.id} updated.`;case"get_system_status":{const u=await n.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(a).first(),v=await n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(a).first(),p=await n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(a).first(),g=await n.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(a).first(),b=await n.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(a).first();return`System Status:
- Active schedules: ${(u==null?void 0:u.cnt)||0}
- Memory: ${(p==null?void 0:p.cnt)||0} working / ${(v==null?void 0:v.cnt)||0} total
- Total messages: ${(g==null?void 0:g.cnt)||0}
- Unread errors: ${(b==null?void 0:b.cnt)||0}`}case"read_sheet":{if(!r)return"Authentication context unavailable.";try{const u=new ce(n,a,r,s||"",i||""),v=t.spreadsheet_id;let p=t.range;const g=await u.sheets.getMetadata(v),b=g.sheets;p.includes("!")||(p=`${b[0]}!${p}`);let x;try{x=await u.sheets.readRange(v,p)}catch(D){if((w=D.message)!=null&&w.includes("Unable to parse range")||(f=D.message)!=null&&f.includes("400")){const I=p.includes("!")?p.split("!")[1]:p;p=`${b[0]}!${I}`,x=await u.sheets.readRange(v,p)}else throw D}let T=`[Spreadsheet: "${g.title}" | Reading tab: "${p.split("!")[0]}" | All tabs in this spreadsheet: ${b.map(D=>`"${D}"`).join(", ")}]
`;return b.length>1&&(T+=`[To read a different tab, call read_sheet again with range like "${b[1]}!A1:Z500"]
`),x.length===0?T+"No data found in the specified range.":T+x.map(D=>D.join("	| ")).join(`
`)}catch(u){return await P(n,a,"google","read_sheet",u.message),`Failed to read sheet: ${u.message}`}}case"write_sheet":{if(!r)return"Authentication context unavailable.";try{const u=new ce(n,a,r,s||"",i||"");if(!(await u.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{const C=new K(n),L=JSON.stringify(t.values);await C.store(a,"context",`Pending sheet write: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"write_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:L.length>15e3?"[[truncated — re-provide values on retry]]":t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The sheet write has been saved to temporary memory. After reconnecting, tell me "write the pending sheet data" to complete this.`:"")}const p=t.values;let g=t.range;const T=Math.max(...p.map(C=>C.length))+4,D=p.map(C=>{const L=[...C];for(;L.length<T;)L.push("");return L}),I=g.match(/^(.+!)?([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);if(I){const C=I[1]||"",L=I[2],F=I[3],J=I[5],ee=L.toUpperCase().charCodeAt(0)-64+T-1,Q=ee<=26?String.fromCharCode(64+ee):"Z";g=`${C}${L}${F}:${Q}${J}`}const B=await u.sheets.writeRange(t.spreadsheet_id,g,D);try{const C=new K(n),L=await C.search(a,`Pending sheet write: ${t.spreadsheet_id}`);for(const F of L)F.title.startsWith(`Pending sheet write: ${t.spreadsheet_id}`)&&await C.remove(F.id,a)}catch{}return`Written ${B.updatedCells} cells to ${g}.`}catch(u){return await P(n,a,"google","write_sheet",u.message),`Failed to write sheet: ${u.message}`}}case"append_sheet":{if(!r)return"Authentication context unavailable.";try{const u=new ce(n,a,r,s||"",i||"");if(!(await u.isConnected()).connected){if(t.spreadsheet_id&&t.range&&t.values)try{await new K(n).store(a,"context",`Pending sheet append: ${t.spreadsheet_id} — ${t.range}`,JSON.stringify({tool:"append_sheet",spreadsheet_id:t.spreadsheet_id,range:t.range,values:t.values}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.spreadsheet_id&&t.range?`

The append data has been saved to temporary memory. After reconnecting, tell me "append the pending sheet data" to complete this.`:"")}const p=await u.sheets.appendRows(t.spreadsheet_id,t.range,t.values);try{const g=new K(n),b=await g.search(a,`Pending sheet append: ${t.spreadsheet_id}`);for(const x of b)x.title.startsWith(`Pending sheet append: ${t.spreadsheet_id}`)&&await g.remove(x.id,a)}catch{}return`Appended ${p.updatedCells} cells to ${t.range}.`}catch(u){return await P(n,a,"google","append_sheet",u.message),`Failed to append to sheet: ${u.message}`}}case"create_sheet":{if(!r)return"Authentication context unavailable.";try{const u=new ce(n,a,r,s||"",i||"");if(!(await u.isConnected()).connected){if(t.title)try{await new K(n).store(a,"context",`Pending spreadsheet create: "${t.title}"`,JSON.stringify({tool:"create_sheet",title:t.title,sheet_names:t.sheet_names??null,folder_name:t.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title?`

The spreadsheet request has been saved to temporary memory. After reconnecting, tell me "create the pending spreadsheet" and I'll complete this automatically.`:"")}const p=await u.sheets.createSpreadsheet(t.title,t.sheet_names);let g="";if(t.folder_name)try{const{token:b}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(n,a,r,s||"",i||"");g=`
Folder: "${(await Yt(b,p.spreadsheetId,t.folder_name)).folderName}"`}catch(b){g=`
(Note: spreadsheet saved to Drive root — could not place in folder "${t.folder_name}": ${b.message})`}try{await new K(n).store(a,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${p.spreadsheetId} | URL: ${p.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${g}
ID: ${p.spreadsheetId}
URL: ${p.url}`}catch(u){return await P(n,a,"google","create_sheet",u.message),`Failed to create spreadsheet: ${u.message}`}}case"list_calendar_events":{if(!r)return"Authentication context unavailable.";try{const u=new ce(n,a,r,s||"",i||""),v=t.calendar_id||"primary",p=t.days_ahead||7,g=new Date,b=new Date(g.getTime()+p*24*60*60*1e3),x=await u.calendar.listEvents(v,{timeMin:g.toISOString(),timeMax:b.toISOString(),query:t.query});return x.length===0?`No events found in the next ${p} days.`:x.map(T=>{var L;const D=T.start.dateTime||T.start.date||"TBD",I=T.end.dateTime||T.end.date||"",B=T.location?` 📍 ${T.location}`:"",C=((L=T.attendees)==null?void 0:L.map(F=>F.email).join(", "))||"";return`• ${T.summary} — ${D} to ${I}${B}${C?`
  Attendees: ${C}`:""}`}).join(`
`)}catch(u){return await P(n,a,"google","list_calendar",u.message),`Failed to list events: ${u.message}`}}case"create_calendar_event":{if(!r)return"Authentication context unavailable.";try{const u=new ce(n,a,r,s||"",i||"");if(!(await u.isConnected()).connected){if(t.summary&&t.start_datetime&&t.end_datetime)try{await new K(n).store(a,"context",`Pending calendar event: "${t.summary}"`,JSON.stringify({tool:"create_calendar_event",summary:t.summary,description:t.description??null,location:t.location??null,start_datetime:t.start_datetime,end_datetime:t.end_datetime,attendees:t.attendees??null,calendar_id:t.calendar_id??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.summary&&t.start_datetime?`

The calendar event has been saved to temporary memory. After reconnecting, tell me "create the pending event" and I'll add it to your calendar.`:"")}const p=t.calendar_id||"primary",g=await u.calendar.createEvent(p,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});try{const b=new K(n),x=await b.search(a,`Pending calendar event: "${t.summary}"`);for(const T of x)T.title.startsWith(`Pending calendar event: "${t.summary}"`)&&await b.remove(T.id,a)}catch{}return`Event created: "${g.summary}"
ID: ${g.id}
Start: ${g.start.dateTime||g.start.date}`}catch(u){return await P(n,a,"google","create_event",u.message),`Failed to create event: ${u.message}`}}case"create_doc":{if(!r)return"Authentication context unavailable.";const u=new ce(n,a,r,s||"",i||"");if(!(await u.isConnected()).connected){if(t.title&&t.content)try{await new K(n).store(a,"context",`Pending Google Doc save: "${t.title}"`,JSON.stringify({tool:"create_doc",title:t.title,content:t.content,folder_name:t.folder_name??null}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.'+(t.title&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" and I'll complete this automatically.`:"")}let p;try{p=await u.docs.createDocument(t.title)}catch(b){return await P(n,a,"google","create_doc",b.message),`Failed to create document: ${b.message}`}if(t.content)try{await u.docs.appendFormattedContent(p.documentId,t.content)}catch(b){return await P(n,a,"google","create_doc_append",b.message),`Document created but content could not be written (${b.message}).
ID: ${p.documentId}
URL: ${p.url}

Use append_to_doc with the document ID above to add content.`}let g="";if(t.folder_name)try{const{token:b}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(n,a,r,s||"",i||"");g=`
Folder: "${(await Yt(b,p.documentId,t.folder_name)).folderName}"`}catch(b){g=`
(Note: document saved to Drive root — could not place in folder "${t.folder_name}": ${b.message})`}try{await new K(n).store(a,"context",`Document: ${t.title}`,`Document ID: ${p.documentId} | URL: ${p.url}`,6,"working")}catch{}try{const b=new K(n),x=await b.search(a,`Pending Google Doc save: "${t.title}"`);for(const T of x)T.title.startsWith(`Pending Google Doc save: "${t.title}"`)&&await b.remove(T.id,a)}catch{}return`Document created: "${t.title}"${g}
ID: ${p.documentId}
URL: ${p.url}`}case"read_doc":{if(!r)return"Authentication context unavailable.";try{const v=await new ce(n,a,r,s||"",i||"").docs.readDocument(t.document_id);return`Document: "${v.title}"

${v.content}`}catch(u){return await P(n,a,"google","read_doc",u.message),`Failed to read document: ${u.message}`}}case"append_to_doc":{if(!r)return"Authentication context unavailable.";try{const u=new ce(n,a,r,s||"",i||"");if(!(await u.isConnected()).connected){if(t.document_id&&t.content)try{await new K(n).store(a,"context",`Pending append to doc: "${t.document_id}"`,JSON.stringify({tool:"append_to_doc",document_id:t.document_id,content:t.content}),9,"working")}catch{}return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.'+(t.document_id&&t.content?`

Your content has been saved to temporary memory. After reconnecting, tell me "save the pending document" to complete this.`:"")}await u.docs.appendFormattedContent(t.document_id,t.content);let p=t.document_id;try{p=(await u.docs.readDocument(t.document_id)).title}catch{}try{const g=new K(n),b=await g.search(a,`Pending append to doc: "${t.document_id}"`);for(const x of b)x.title.startsWith(`Pending append to doc: "${t.document_id}"`)&&await g.remove(x.id,a)}catch{}return`Content appended to "${p}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(u){return await P(n,a,"google","append_to_doc",u.message),`Failed to append to document: ${u.message}`}}case"rewrite_doc":{if(!r)return"Authentication context unavailable.";try{const u=new ce(n,a,r,s||"",i||"");if(!(await u.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";await u.docs.rewriteDocument(t.document_id,t.content);let p=t.document_id;try{p=(await u.docs.readDocument(t.document_id)).title}catch{}return`Document "${p}" reformatted successfully.
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(u){return await P(n,a,"google","rewrite_doc",u.message),`Failed to rewrite document: ${u.message}`}}case"delete_sheet_row":{if(!r)return"Authentication context unavailable.";try{const u=new ce(n,a,r,s||"",i||"");if(!(await u.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const p=t.row_number;return p<2?"Row 1 is the header row and cannot be deleted. Specify row 2 or higher.":(await u.sheets.deleteRow(t.spreadsheet_id,t.sheet_name,p),`Row ${p} deleted from "${t.sheet_name}". All rows below have shifted up.`)}catch(u){return await P(n,a,"google","delete_sheet_row",u.message),`Failed to delete row: ${u.message}`}}case"delete_doc_content":{if(!r)return"Authentication context unavailable.";try{const u=new ce(n,a,r,s||"",i||"");if(!(await u.isConnected()).connected)return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.";const p=await u.docs.deleteContent(t.document_id,t.text_to_remove);return p.occurrencesRemoved===0?"No matching text found in the document. The text must match exactly — check spacing, punctuation, and line breaks.":`Removed ${p.occurrencesRemoved} occurrence${p.occurrencesRemoved===1?"":"s"} from the document.`}catch(u){return await P(n,a,"google","delete_doc_content",u.message),`Failed to delete document content: ${u.message}`}}case"gmail_list":{if(!r)return"Authentication context unavailable.";try{const v=await new ve(n,a,r,s||"",i||"").listMessages({maxResults:t.max_results||10,query:t.query});return v.length===0?"No messages found.":v.map((p,g)=>`${p.isUnread?"● ":"  "}${g+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(u){return await P(n,a,"gmail","list",u.message),(_=u.message)!=null&&_.includes("not connected")?u.message:`Gmail list error: ${u.message}`}}case"gmail_read":{if(!r)return"Authentication context unavailable.";try{const u=new ve(n,a,r,s||"",i||""),v=await u.getMessage(t.message_id);if(!v)return"Message not found.";const p=await u.getMessageBody(t.message_id);return`**${v.subject}**
From: ${v.from}
To: ${v.to}
Date: ${v.date}

${p}`}catch(u){return await P(n,a,"gmail","read",u.message),`Gmail read error: ${u.message}`}}case"gmail_search":{if(!r)return"Authentication context unavailable.";try{const v=await new ve(n,a,r,s||"",i||"").search(t.query,t.max_results||10);return v.length===0?`No results for: ${t.query}`:v.map((p,g)=>`${p.isUnread?"● ":"  "}${g+1}. **${p.subject}**
   From: ${p.from}
   Date: ${p.date}
   ${p.snippet}
   [id: ${p.id}]`).join(`

`)}catch(u){return await P(n,a,"gmail","search",u.message),`Gmail search error: ${u.message}`}}case"gmail_send":{if(!r)return"Authentication context unavailable.";try{const u=new ve(n,a,r,s||"",i||"");if(!(await new ce(n,a,r,s||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body)try{await new K(n).store(a,"context",`Pending email: "${t.subject}"`,JSON.stringify({tool:"gmail_send",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your email has been saved to temporary memory. After reconnecting, tell me "send the pending email" and I'll send it automatically.`:"")}const g=await u.send(t.to,t.subject,t.body,{cc:t.cc});try{const b=new K(n),x=await b.search(a,`Pending email: "${t.subject}"`);for(const T of x)T.title.startsWith(`Pending email: "${t.subject}"`)&&await b.remove(T.id,a)}catch{}return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${g.id}]`}catch(u){return await P(n,a,"gmail","send",u.message),`Gmail send error: ${u.message}`}}case"gmail_draft":{if(!r)return"Authentication context unavailable.";try{const u=new ve(n,a,r,s||"",i||"");if(!(await new ce(n,a,r,s||"",i||"").isConnected()).connected){if(t.to&&t.subject&&t.body)try{await new K(n).store(a,"context",`Pending draft: "${t.subject}"`,JSON.stringify({tool:"gmail_draft",to:t.to,subject:t.subject,body:t.body,cc:t.cc??null}),9,"working")}catch{}return"Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account."+(t.to&&t.subject&&t.body?`

Your draft has been saved to temporary memory. After reconnecting, tell me "create the pending draft" and I'll save it to Gmail.`:"")}const g=await u.createDraft(t.to,t.subject,t.body,{cc:t.cc});try{const x=new K(n),T=await x.search(a,`Pending draft: "${t.subject}"`);for(const D of T)D.title.startsWith(`Pending draft: "${t.subject}"`)&&await x.remove(D.id,a)}catch{}const b=t.cc?`, CC: ${t.cc}`:"";return`Draft created. To: ${t.to}${b}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${g.id}]`}catch(u){return await P(n,a,"gmail","draft",u.message),`Gmail draft error: ${u.message}`}}case"gmail_modify":{if(!r)return"Authentication context unavailable.";try{return await new ve(n,a,r,s||"",i||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(u){return await P(n,a,"gmail","modify",u.message),`Gmail modify error: ${u.message}`}}case"gmail_unread_count":{if(!r)return"Authentication context unavailable.";try{const v=await new ve(n,a,r,s||"",i||"").getUnreadCount();return`You have ${v} unread email${v!==1?"s":""} in Gmail.`}catch(u){return(y=u.message)!=null&&y.includes("not connected")?u.message:`Gmail error: ${u.message}`}}case"drive_list":{if(!r)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(n,a,r,s||"",i||""),v=new URLSearchParams;v.set("pageSize",String(t.max_results||10)),v.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),v.set("orderBy","modifiedTime desc");let p="";t.folder_id?p=`'${t.folder_id}' in parents and trashed = false`:t.query?p=`${t.query} and trashed = false`:p="trashed = false",v.set("q",p);const g=await fetch(`https://www.googleapis.com/drive/v3/files?${v}`,{headers:{Authorization:`Bearer ${u}`}});if(!g.ok)throw new Error(`Drive API error (${g.status})`);const b=await g.json();return(S=b.files)!=null&&S.length?b.files.map((x,T)=>{var C,L;const D=((C=x.mimeType)==null?void 0:C.split(".").pop())||x.mimeType,I=x.size?`${(parseInt(x.size)/1024).toFixed(1)} KB`:"",B=((L=x.modifiedTime)==null?void 0:L.split("T")[0])||"";return`${T+1}. **${x.name}** (${D})
   ${I} · Modified: ${B}
   ${x.webViewLink||""}`}).join(`

`):"No files found."}catch(u){return await P(n,a,"google","drive_list",u.message),`Drive list error: ${u.message}`}}case"drive_search":{if(!r)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(n,a,r,s||"",i||""),v=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,p=new URLSearchParams;p.set("q",v),p.set("pageSize",String(t.max_results||10)),p.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),p.set("orderBy","modifiedTime desc");const g=await fetch(`https://www.googleapis.com/drive/v3/files?${p}`,{headers:{Authorization:`Bearer ${u}`}});if(!g.ok)throw new Error(`Drive API error (${g.status})`);const b=await g.json();return(E=b.files)!=null&&E.length?b.files.map((x,T)=>{var B,C;const D=((B=x.mimeType)==null?void 0:B.split(".").pop())||x.mimeType,I=((C=x.modifiedTime)==null?void 0:C.split("T")[0])||"";return`${T+1}. **${x.name}** (${D}) — Modified: ${I}
   ${x.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(u){return await P(n,a,"google","drive_search",u.message),`Drive search error: ${u.message}`}}case"drive_read_file":{if(!r)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(n,a,r,s||"",i||""),v=t.url_or_id.trim();let p=v;const g=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/\/presentation\/d\/([a-zA-Z0-9_-]+)/,/\/forms\/d\/([a-zA-Z0-9_-]+)/,/[?&]id=([a-zA-Z0-9_-]+)/,/\/d\/([a-zA-Z0-9_-]+)/];for(const J of g){const X=v.match(J);if(X){p=X[1];break}}const b=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?fields=id,name,mimeType,size`,{headers:{Authorization:`Bearer ${u}`}});if(!b.ok)throw new Error(`Drive API error (${b.status}): could not fetch file metadata`);const x=await b.json(),{name:T,mimeType:D}=x,I=t.extract_focus,B=I?`Focus specifically on extracting: ${I}`:"Extract and return all readable text content. Preserve structure where relevant.",C={"application/vnd.google-apps.document":"text/plain","application/vnd.google-apps.spreadsheet":"text/csv","application/vnd.google-apps.presentation":"text/plain"};if(C[D]){const J=C[D],X=await fetch(`https://www.googleapis.com/drive/v3/files/${p}/export?mimeType=${encodeURIComponent(J)}`,{headers:{Authorization:`Bearer ${u}`}});if(!X.ok)throw new Error(`Drive export error (${X.status})`);const ee=await X.text();if(D==="application/vnd.google-apps.spreadsheet"){const Q=gs(ee),se=Q.length,me=((R=Q[0])==null?void 0:R.length)??0;return`**${T}** (Google Sheet — ${se} rows × ${me} columns)

Parsed rows (JSON, ready for write_sheet/append_sheet):
${JSON.stringify(Q)}`}return`**${T}**

${ee.substring(0,2e4)}`}if(D==="application/pdf"||T.toLowerCase().endsWith(".pdf")){const J=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?alt=media`,{headers:{Authorization:`Bearer ${u}`}});if(!J.ok)throw new Error(`Drive download error (${J.status})`);const X=await J.arrayBuffer(),ee=Buffer.from(X).toString("base64");let Q=null,se="claude-haiku-4-5-20251001";for(const pt of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const mn=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,pt).first();if(mn&&r){const Xa=await Y(mn.encrypted_value,r),Rt=JSON.parse(Xa);if(Rt.provider==="anthropic"){Q=Rt.apiKey,Rt.model&&(se=Rt.model);break}}}catch{}if(!Q)return`"${T}" is a PDF. An Anthropic API key is required to extract PDF content. Please configure one in Settings → Keys.`;const me=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":Q,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:se,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:ee}},{type:"text",text:B}]}]})});if(!me.ok){const pt=await me.text();throw new Error(`Anthropic PDF extraction error: ${pt.substring(0,200)}`)}const Ut=((M=(N=(await me.json()).content)==null?void 0:N[0])==null?void 0:M.text)||"";return`**${T}** (PDF from Drive)

${Ut}`}const L=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?alt=media`,{headers:{Authorization:`Bearer ${u}`}});if(!L.ok)throw new Error(`Drive download error (${L.status})`);const F=await L.text();return`**${T}** (${D})

${F.substring(0,2e4)}`}catch(u){return await P(n,a,"google","drive_read_file",u.message),`Drive read error: ${u.message}`}}case"drive_delete_file":{if(!r)return"Authentication context unavailable.";try{const{token:u}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(n,a,r,s||"",i||""),v=t.url_or_id.trim();let p=v;const g=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const D of g){const I=v.match(D);if(I){p=I[1];break}}const b=await fetch(`https://www.googleapis.com/drive/v3/files/${p}?fields=name`,{headers:{Authorization:`Bearer ${u}`}});if(!b.ok)throw new Error(`Drive API error (${b.status})`);const x=await b.json(),T=await fetch(`https://www.googleapis.com/drive/v3/files/${p}`,{method:"PATCH",headers:{Authorization:`Bearer ${u}`,"Content-Type":"application/json"},body:JSON.stringify({trashed:!0})});if(!T.ok)throw new Error(`Drive API error (${T.status})`);return`"${x.name}" moved to trash. You can restore it from Drive trash within 30 days.`}catch(u){return await P(n,a,"google","drive_delete_file",u.message),`Drive delete error: ${u.message}`}}case"drive_organise":{if(!r)return"Authentication context unavailable.";if(!t.folder_name&&!t.new_name)return"Please provide at least a folder_name to move to or a new_name to rename.";try{const{token:u}=await(await Promise.resolve().then(()=>Ue)).getGoogleAuth(n,a,r,s||"",i||""),v=t.url_or_id.trim();let p=v;const g=[/\/file\/d\/([a-zA-Z0-9_-]+)/,/\/document\/d\/([a-zA-Z0-9_-]+)/,/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,/id=([a-zA-Z0-9_-]+)/];for(const x of g){const T=v.match(x);if(T){p=T[1];break}}const b=[];if(t.new_name){const x=await fetch(`https://www.googleapis.com/drive/v3/files/${p}`,{method:"PATCH",headers:{Authorization:`Bearer ${u}`,"Content-Type":"application/json"},body:JSON.stringify({name:t.new_name})});if(!x.ok)throw new Error(`Drive rename error (${x.status})`);b.push(`Renamed to "${t.new_name}"`)}if(t.folder_name){const{folderName:x}=await Yt(u,p,t.folder_name);b.push(`Moved to folder "${x}"`)}return b.join(". ")+"."}catch(u){return await P(n,a,"google","drive_organise",u.message),`Drive organise error: ${u.message}`}}case"web_search":try{const u=await Pt(t.query,{num:t.num_results||5,site:t.site});return u.error?`Web search failed: ${u.error}. Answer this question directly from your training knowledge and clearly state you are doing so.`:u.results.length===0?`Web search returned no results for "${t.query}". Answer this question directly from your training knowledge and clearly state you are doing so instead of searching.`:u.results.map((v,p)=>`${p+1}. [${v.title}](${v.link})
   ${v.snippet}`).join(`

`)}catch(u){return await P(n,a,"search","web_search",u.message),`Web search error: ${u.message}`}case"read_url":try{const u=t.url;if(!u||!u.startsWith("http://")&&!u.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const v=Math.min(t.max_length||8e3,15e3),{fetchPageContent:p}=await Promise.resolve().then(()=>os),g=await p(u,v);return g.error?`Failed to read page: ${g.error}`:!g.text||g.text.length<20?`Page at ${u} returned no readable content.`:`Content from ${u} (${g.text.length} chars):

${g.text}`}catch(u){return await P(n,a,"search","read_url",u.message),`Read URL error: ${u.message}`}case"research":{if(!c)return"Research tool requires an LLM provider but none is available.";try{let u;try{const T=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"perplexity_api_key").first();T&&r&&(u=await Y(T.encrypted_value,r))}catch{}const v=2e4,p=ka(t.query,c,{depth:t.depth||"quick",site:t.site,perplexityApiKey:u}),g=new Promise(T=>setTimeout(()=>T(null),v)),b=await Promise.race([p,g]);if(b===null){const{webSearch:T}=await Promise.resolve().then(()=>Qr),D=await T(t.query,{num:5});if(D.error||D.results.length===0)return"Research timed out and fallback search returned no results. Try rephrasing or asking a more specific question.";let I=`Research took too long, but here are the top search results:

`;return I+=D.results.map((B,C)=>`${C+1}. [${B.title}](${B.link})
   ${B.snippet}`).join(`

`),I}if(b.error)return`Research failed: ${b.error}`;let x=b.report;b.sources.length>0&&(x+=`

---
**Sources** (`+b.pagesRead+` pages read):
`,x+=b.sources.map((T,D)=>`[${D+1}] [${T.title}](${T.url})`).join(`
`));try{const T=new K(n),D=b.report.substring(0,600);await T.store(a,"context",`Research: ${t.query.substring(0,80)}`,D,6,"long_term")}catch{}return x}catch(u){return await P(n,a,"research","research",u.message),`Research error: ${u.message}`}}case"browser_task":{if(!r)return"Authentication context unavailable.";try{const u=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"browser_use_api_key").first();if(!u)return"Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key (get one at cloud.browser-use.com).";const v=(await Y(u.encrypted_value,r)).trim();let p,g=t.task,b,x;if(t.site_name)try{const C=await n.prepare("SELECT id, encrypted_blob FROM site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE").bind(a,t.site_name).first();if(C){const L=JSON.parse(await Y(C.encrypted_blob,r));p={username:L.username,password:L.password},x=L.sessionId,b=C.id,g=`${g}

When prompted to log in, use username {username} and password {password}.`}}catch{}const T=await Ra(g,v,{secrets:p,sessionId:x}),D=async C=>{if(b)try{const L=await n.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(b,a).first();if(!L)return;const F=JSON.parse(await Y(L.encrypted_blob,r));F.sessionId=C;const J=await ct(JSON.stringify(F),r);await n.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(J,b,a).run()}catch{}},I=async()=>{if(!(!b||!x))try{const C=await n.prepare("SELECT encrypted_blob FROM site_credentials WHERE id = ? AND user_id = ?").bind(b,a).first();if(!C)return;const L=JSON.parse(await Y(C.encrypted_blob,r));delete L.sessionId;const F=await ct(JSON.stringify(L),r);await n.prepare("UPDATE site_credentials SET encrypted_blob = ? WHERE id = ? AND user_id = ?").bind(F,b,a).run()}catch{}};if(T.status==="completed")return T.sessionId&&await D(T.sessionId),T.output??"[NO-OUTPUT] Browser task completed but returned no content — do NOT invent or summarise what the site may have contained. Tell the user the browser returned nothing and suggest they try again.";if(T.status==="timeout"){T.sessionId&&await D(T.sessionId);try{await new K(n).store(a,"context",`Browser task in progress: ${T.taskId}`,JSON.stringify({task_id:T.taskId,task:t.task}),9,"working")}catch{}return`[BROWSER_TIMEOUT:${T.taskId}] Browser task did not finish within the time limit. Tell the user it is still running and ask them to follow up in 2–3 minutes.`}await I();const B=[T.error,T.output].filter(Boolean).join(" — ");return`Browser task failed (ID: \`${T.taskId}\`): ${B||"No details returned. Check your Browser Use dashboard at cloud.browser-use.com."}`}catch(u){return await P(n,a,"browser","browser_task",u.message),`Browser task error: ${u.message}`}}case"browser_task_status":{if(!r)return"Authentication context unavailable.";try{const u=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"browser_use_api_key").first();if(!u)return"Browser Use API key not configured.";const v=await Y(u.encrypted_value,r),p=await ds(t.task_id,v);if(p.done){try{const g=new K(n),b=await g.search(a,`Browser task in progress: ${t.task_id}`);for(const x of b)await g.remove(x.id,a)}catch{}return p.status==="finished"||p.status==="completed"?p.output?p.output:'[NO-OUTPUT] Browser task finished but returned no content. Do NOT invent or infer what emails or page data might have said. Tell the user: "The browser finished but returned no content — the site may have blocked automation or the login failed. Would you like to try again?"':`Browser task ended with status "${p.status}" and no output. Do NOT retry — report this to the user.`}return`[still-running] Browser task has not finished yet (status: ${p.status}). STOP — do not call browser_task_status again. Tell the user: "The browser is still working. Ask me 'what happened with the browser task?' in 2–3 minutes."`}catch(u){return await P(n,a,"browser","browser_task_status",u.message),`Browser status check error: ${u.message}`}}case"vault_lookup":try{const u=(t.site_name||"").trim();if(!u)return"No site name provided.";const p=((await n.prepare("SELECT name FROM site_credentials WHERE user_id = ? AND name LIKE ? COLLATE NOCASE").bind(a,`%${u}%`).all()).results||[]).map(g=>g.name);return p.length===0?`No vault entries found matching "${u}".`:`Vault entries matching "${u}": ${p.join(", ")}. Use site_name="${p[0]}" in browser_task to inject credentials automatically.`}catch{return"vault_lookup: could not query Secret Vault (table may not exist — run migrations)."}case"search_places":{if(!r)return"Authentication context unavailable.";try{const u=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!u)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const v=await Y(u.encrypted_value,r),p=await ya(v,t.query,{type:t.type});return p.error?`Places search failed: ${p.error}`:p.results.length===0?`No places found for "${t.query}".`:p.results.map((g,b)=>{const x=g.rating?` ★${g.rating} (${g.userRatingsTotal||0} reviews)`:"",T=g.openNow!==void 0?g.openNow?" · Open now":" · Closed":"",D=g.googleMapsUri?`
   ${g.googleMapsUri}`:"";return`${b+1}. **${g.name}**${x}${T}
   ${g.address}${D}
   [place_id: ${g.placeId}]`}).join(`

`)}catch(u){return await P(n,a,"google_api","search_places",u.message),`Places search error: ${u.message}`}}case"get_place_details":{if(!r)return"Authentication context unavailable.";try{const u=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await Y(u.encrypted_value,r),p=await va(v,t.place_id);if(p.error)return`Details lookup failed: ${p.error}`;if(!p.details)return"No details found.";const g=p.details;let b=`**${g.name}**
📍 ${g.address}`;if(g.phone&&(b+=`
📞 ${g.phone}`),g.website&&(b+=`
🌐 ${g.website}`),g.rating&&(b+=`
★ ${g.rating}`),g.googleMapsUri&&(b+=`
📌 ${g.googleMapsUri}`),g.openingHours&&(b+=`

Opening Hours:
${g.openingHours.join(`
`)}`),g.reviews&&g.reviews.length>0){b+=`

Recent Reviews:`;for(const x of g.reviews)b+=`
— ${x.author} (★${x.rating}, ${x.time}): "${x.text}"`}return b}catch(u){return await P(n,a,"google_api","place_details",u.message),`Place details error: ${u.message}`}}case"get_directions":{if(!r)return"Authentication context unavailable.";try{const u=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await Y(u.encrypted_value,r),p=await wa(v,t.origin,t.destination,{mode:t.mode||"driving"});if(p.error)return`Directions failed: ${p.error}`;if(!p.route)return"No route found.";const g=p.route;let b=`**${g.startAddress}** → **${g.endAddress}**
`;return b+=`📏 ${g.distance} · ⏱️ ${g.duration}`,g.durationInTraffic&&(b+=` (with traffic: ${g.durationInTraffic})`),b+=`
via ${g.summary}`,b+=`

Steps:`,g.steps.forEach((x,T)=>{b+=`
${T+1}. ${x.instruction} (${x.distance}, ${x.duration})`}),b}catch(u){return await P(n,a,"google_api","directions",u.message),`Directions error: ${u.message}`}}case"get_travel_time":{if(!r)return"Authentication context unavailable.";try{const u=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await Y(u.encrypted_value,r),p=await Ta(v,t.origin,t.destination,t.mode||"driving");if(p.error)return`Travel time lookup failed: ${p.error}`;let g=`${t.origin} → ${t.destination}: ${p.distance}, ${p.duration}`;return p.durationInTraffic&&(g+=` (with traffic: ${p.durationInTraffic})`),g}catch(u){return await P(n,a,"google_api","travel_time",u.message),`Travel time error: ${u.message}`}}case"translate_text":{if(!r)return"Authentication context unavailable.";try{const u=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await Y(u.encrypted_value,r),p=await ba(v,t.text,t.target_language,t.source_language);return p.error?`Translation failed: ${p.error}`:`[${p.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${p.translatedText}`}catch(u){return await P(n,a,"google_api","translate",u.message),`Translation error: ${u.message}`}}case"search_youtube":{if(!r)return"Authentication context unavailable.";try{const u=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await Y(u.encrypted_value,r),p=await Ea(v,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return p.error?`YouTube search failed: ${p.error}`:p.results.length===0?`No YouTube results for "${t.query}".`:p.results.map((g,b)=>{var x;return`${b+1}. **${g.title}**
   ${g.channelTitle} · ${((x=g.publishedAt)==null?void 0:x.split("T")[0])||""}
   ${g.description}
   ${g.url}`}).join(`

`)}catch(u){return await P(n,a,"google_api","youtube_search",u.message),`YouTube search error: ${u.message}`}}case"geocode_address":{if(!r)return"Authentication context unavailable.";try{const u=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!u)return"Google API Key not configured.";const v=await Y(u.encrypted_value,r),p=await _a(v,t.address);return p.error?`Geocoding failed: ${p.error}`:p.results.length===0?`Location not found: "${t.address}"`:p.results.map((g,b)=>`${b+1}. ${g.address}
   Coordinates: ${g.lat}, ${g.lng}`).join(`
`)}catch(u){return await P(n,a,"google_api","geocode",u.message),`Geocoding error: ${u.message}`}}case"parse_document":{const u=t.file_id,v=t.extract_focus;if(!u)return"file_id is required to parse a document.";const p=await n.prepare("SELECT file_name, file_type, file_data, file_size, extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(u,a).first();if(!p)return"File not found. The file may have expired or the file_id is incorrect.";if(p.extracted_text)return`Document: ${p.file_name}

${p.extracted_text}`;const{file_name:g,file_type:b}=p;let{file_data:x}=p;if(x==="r2"){if(!m)return`File "${g}" is stored in R2 but no storage bucket is configured.`;const T=await m.get(u);if(!T)return`File "${g}" not found in storage. It may have been deleted.`;const D=await T.arrayBuffer();x=Buffer.from(D).toString("base64")}if(b.startsWith("text/"))try{const T=Buffer.from(x,"base64").toString("utf-8");return`Document: ${g}

${T.substring(0,2e4)}`}catch{return`Could not decode text file: ${g}`}if(b==="application/pdf"||b==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||g.toLowerCase().endsWith(".pdf")||g.toLowerCase().endsWith(".docx")){if(b==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||g.toLowerCase().endsWith(".docx")){try{const I=await Oa(Buffer.from(x,"base64"));if(I.length>50)return`Document: ${g}

${I.substring(0,2e4)}`}catch{}return`Could not extract text from "${g}". Try uploading to Google Drive and sharing the link — Drive can open and export Word documents directly.`}let T=null,D="claude-haiku-4-5-20251001";for(const I of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const B=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,I).first();if(B&&r){const C=await Y(B.encrypted_value,r),L=JSON.parse(C);if(L.provider==="anthropic"){T=L.apiKey,L.model&&(D=L.model);break}}}catch{}if(T)try{const I=v?`Focus specifically on extracting: ${v}`:"Extract and return all readable text content from this document. Preserve structure where relevant.",B=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":T,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:D,max_tokens:4096,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:x}},{type:"text",text:I}]}]})});if(B.ok){const L=((H=(W=(await B.json()).content)==null?void 0:W[0])==null?void 0:H.text)||"";return`Document: ${g}

${L}`}else{const C=await B.text();return`Could not parse ${g} via Anthropic API: ${C.substring(0,200)}`}}catch(I){return`Document parsing error for ${g}: ${I.message}`}return"To parse PDF documents, please configure an Anthropic API key in Settings → Keys. No Anthropic key is currently set."}try{const T=Buffer.from(x,"base64").toString("utf-8").substring(0,2e3);return`Document: ${g} (${b})

Content preview:
${T}`}catch{return`Cannot read file: ${g} (${b})`}}case"create_skill":{const u=($=t.name)==null?void 0:$.trim(),v=(q=t.description)==null?void 0:q.trim(),p=(z=t.instructions)==null?void 0:z.trim();if(!u||!v||!p)return"create_skill requires name, description, and instructions.";let g=u.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"");g||(g=`skill_${Date.now()}`);const b=await n.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(a,`${g}%`).all();(O=b.results)!=null&&O.some(I=>I.slug===g)&&(g=`${g}_${(((U=b.results)==null?void 0:U.length)||0)+1}`);const x=JSON.stringify(t.parameters||{}),T=JSON.stringify(t.required_tools||[]),D=JSON.stringify(t.examples||[]);return await n.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(a,u,g,v,p,x,T,D).run(),`Skill created: **${u}** (invoke as: "${g}")

You can now ask me to run "${u}" at any time. The skill will appear in Settings → Skills. You can also say "run my ${u} skill" to execute it.`}case"list_skills":{const v=t.include_disabled===!0?"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? ORDER BY created_at DESC":"SELECT id, name, slug, description, enabled, usage_count, last_used_at FROM user_skills WHERE user_id = ? AND enabled = 1 ORDER BY created_at DESC",g=(await n.prepare(v).bind(a).all()).results||[];if(g.length===0)return`You haven't created any custom skills yet. Ask me to create one: "Create a skill that..."`;const b=g.map(x=>`• **${x.name}** (${x.slug}): ${x.description} [used ${x.usage_count} times${x.enabled?"":" — disabled"}]`).join(`
`);return`Your custom skills (${g.length}):

${b}`}default:{const u=e,v=await n.prepare("SELECT id, name, description, instructions, required_tools FROM user_skills WHERE user_id = ? AND slug = ? AND enabled = 1").bind(a,u).first();if(v){await n.prepare("UPDATE user_skills SET usage_count = usage_count + 1, last_used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(v.id).run();const p=(()=>{try{return JSON.parse(v.required_tools).join(", ")}catch{return""}})(),g=Object.keys(t).length>0?`

Inputs provided: ${JSON.stringify(t)}`:"";return`[SKILL: ${v.name}] Follow these instructions exactly:

${v.instructions}${g}

${p?`Tools to use: ${p}`:""}

Execute the steps above using your available tools. When complete, provide a clear summary of what was done and any results.`}return`Unknown tool: ${e}`}}}async function ja(e,t,n,a,r){if(t.length>0&&t[t.length-1].role==="user"){const s="(Previous request did not complete. Please try again.)";await e.storeMessage(n,a,"assistant",s,"{}",r),t.push({id:-1,user_id:n,channel:a,role:"assistant",content:s,metadata:"{}",token_estimate:s.length,created_at:new Date().toISOString()})}}function Pa(e){for(let t=e.length-1;t>=0;t--)if(e[t].role==="assistant"){const n=typeof e[t].content=="string"?e[t].content:"";n.length<300&&/^(now let me|let me |i'll |i will |i'm going to|let's |to do this)/i.test(n.trim())&&(e[t]={...e[t],content:"(My previous response was cut off before completing. Starting fresh.)"});break}}async function kn(e,t,n,a,r,s,i){var z,O,U,u,v;const o=new K(t),l=(z=e.metadata)==null?void 0:z.thread_id,d=Date.now(),[c,m]=await Promise.all([o.buildContext(a.id),dn(t,a.id)]),h=await o.getRecentConversations(a.id,30,l);await ja(o,h,a.id,e.channel,l);const w=Ma(a,c,e.channel,m),f=La([{role:"system",content:w},...h.map(p=>({role:p.role,content:p.content})),{role:"user",content:e.text}]);Pa(f);const _=[/\bmy (address|phone|email|budget|preferences?|settings?|rules?|sheet|doc|folder|password|login|account)\b/i,/\b(do you remember|last time|what did i|you said|i told you|my usual|like before|same as last|remind me what|what was the|previously)\b/i],y=(c.match(/^- /gm)||[]).length;if(_.some(p=>p.test(e.text))||y<3)try{const p=await o.searchLongTerm(a.id,e.text,5);if(p.length>0){const g=p.map(b=>`- [${b.type}] ${b.title}: ${b.content}`).join(`
`);f.splice(f.length-1,0,{role:"assistant",content:"I retrieved some relevant context from your long-term memory."},{role:"user",content:`[Long-term memory retrieved for this query:
${g}]`})}}catch{}await o.storeMessage(a.id,e.channel,"user",e.text,"{}",l);const E=(i==null?void 0:i.maxTurns)??10,R=(i==null?void 0:i.tools)??await ln(t,a.id);let N="",M=0;const W=[];for(let p=0;p<E;p++)try{p>0&&Ba(f);const g=await n.chat(f,{tools:R,toolChoice:p===0&&(i!=null&&i.forceToolUseOnFirstTurn)?"required":void 0});if(g.usage&&(M+=g.usage.promptTokens+g.usage.completionTokens),g.toolCalls&&g.toolCalls.length>0){const b=g.content||`[calling: ${g.toolCalls.map(T=>{const D=T.arguments||{},I=Object.entries(D).filter(([B])=>!["content","values","body"].includes(B)).map(([B,C])=>`${B}="${String(C).substring(0,100)}"`).join(", ");return`${T.name}(${I})`}).join(", ")}]`;f.push({role:"assistant",content:b});for(const T of g.toolCalls)W.push(T.name);const x=await Promise.all(g.toolCalls.map(async T=>{try{const D=await bt(T.name,T.arguments,t,a.id,{agentType:"full",providerName:n.name,channel:e.channel},a.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,a.timezone,n,s==null?void 0:s.DOCUMENTS_BUCKET),I=["parse_document","drive_read_file"].includes(T.name)?2e4:8e3,B=D.length>I?D.substring(0,I)+`
[...result truncated to prevent token limit — full content was extracted]`:D;return`[Tool Result for ${T.name}]: ${B}`}catch(D){return await P(t,a.id,"tool",T.name,D.message||"Tool execution failed"),`[Tool Error for ${T.name}]: ${D.message||"Execution failed"}`}}));f.push({role:"user",content:x.join(`

`)});continue}N=g.content;break}catch(g){if(r){const b=g.message||"",x=b.includes("401")||b.includes("403")||b.includes("authentication")||b.includes("credit balance"),T=b.includes("429"),D=x?1440:T?10:5;await r.recordError(n.name,b,D)}throw await P(t,a.id,"llm","provider_error",g.message||"Unknown LLM error",{provider:n.name,turn:p}),g}if(N=(N==null?void 0:N.trim())??"",!N)try{((O=f[f.length-1])==null?void 0:O.role)==="user"&&f.push({role:"assistant",content:"[gathering results]"}),f.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),N=(await n.chat(f,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me directly and I will answer from my knowledge."}catch{N="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge."}if(r&&M>0)try{await r.recordUsage(n.name,M)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(a.id,n.name,"full",M,Date.now()-d,1,e.channel).run()}catch{}const H=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your|the)\s+(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc)\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a Google Document but create_doc was never called. You MUST call create_doc NOW.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const p of H){const g=p.claimPattern.test(N),b=p.requiredTools.some(x=>W.includes(x));if(g&&!b){try{await P(t,a.id,"llm",p.logType,"LLM claimed action without tool call",{response:N.substring(0,200)}),f.push({role:"assistant",content:N}),f.push({role:"user",content:p.enforcementMsg});const x=await n.chat(f,{tools:R.filter(T=>p.requiredTools.includes(T.name)),temperature:0});if((U=x.toolCalls)!=null&&U.length){for(const D of x.toolCalls){const I=await bt(D.name,D.arguments,t,a.id,{agentType:"full",providerName:n.name,channel:e.channel},a.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,a.timezone,n,s==null?void 0:s.DOCUMENTS_BUCKET);W.push(D.name),f.push({role:"assistant",content:"",toolCalls:x.toolCalls}),f.push({role:"user",content:I})}const T=await n.chat(f,{tools:[]});T.content&&(N=T.content)}else N="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}let $=N.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"").trim();if(!$&&W.length>0){const p=[...new Set(W)].join(", ");try{((u=f[f.length-1])==null?void 0:u.role)==="user"&&f.push({role:"assistant",content:"[completed tools]"}),f.push({role:"user",content:"Please summarise what you just did and provide the result to the user."}),$=((v=(await n.chat(f,{tools:[]})).content)==null?void 0:v.trim())||`Done. I used the following tools: ${p}.`}catch{$=`Done. I used the following tools: ${p}.`}}const q=W.length>0?`[TOOLS_USED: ${[...new Set(W)].join(", ")}] `:"";await o.storeMessage(a.id,e.channel,"assistant",Mt(q+$),"{}",l);try{const p=await t.prepare("SELECT COUNT(*) as c FROM conversations WHERE user_id = ? AND role = ?").bind(a.id,"assistant").first();p&&p.c%5===0&&p.c>0&&await Promise.race([ys(t,n,a,o,f),new Promise(g=>setTimeout(g,5e3))])}catch{}return $}async function ys(e,t,n,a,r){var c;const s=r.filter(m=>m.role!=="system").slice(-10);if(s.length<4)return;const o=[{role:"system",content:`Review this conversation and extract any information worth remembering long-term.
Only extract genuinely durable information — things that will still be relevant in future conversations.
Good examples: addresses, phone numbers, account IDs, spreadsheet IDs, document links, explicit preferences, recurring needs, key decisions.
Bad examples: temporary topics, one-off requests, information already in the system prompt.

For each item, output a line: TYPE|TITLE|CONTENT|IMPORTANCE
Types: fact, preference, context, decision
Importance: 1-10 (8+ = standing rules, 5-7 = regular facts)
If nothing worth extracting, output: NONE`},...s,{role:"user",content:"Extract durable information from the above conversation."}],d=((c=(await t.chat(o,{tools:[]})).content)==null?void 0:c.trim())||"";if(!(!d||d==="NONE"))for(const m of d.split(`
`)){const h=m.trim().split("|");if(h.length<4)continue;const[w,f,_,y]=h,S=["fact","preference","context","decision","summary","task"].find(R=>R===w.trim().toLowerCase());if(!S||!(f!=null&&f.trim())||!(_!=null&&_.trim()))continue;const E=Math.min(10,Math.max(1,parseInt(y)||5));await a.store(n.id,S,f.trim(),_.trim(),E,"long_term")}}const Dn={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function vs(e){for(const[t,n]of Object.entries(Dn))if(e.toLowerCase().includes(t.toLowerCase()))return n;return Dn.default}function ws(e,t,n,a){const r=vs(a),s=Math.floor(r*.75),i=[];let o=0,l=!1;const d=Kt(e);i.push({role:"system",content:e}),o+=d;const c=Kt(n);o+=c;const m=s-o,h=[];let w=0;for(let f=t.length-1;f>=0;f--){const _=t[f],y=Kt(_.content);if(w+y<=m)h.unshift({role:_.role,content:_.content}),w+=y;else{l=!0;break}}return i.push(...h),i.push({role:"user",content:n}),o+=w,{maxTokens:r,usedTokens:o,messages:i,wasTruncated:l}}async function*bs(e,t,n,a,r,s){var M,W;const i=new K(t),o=(M=e.metadata)==null?void 0:M.thread_id,l=Date.now();yield{type:"thinking",data:{threadId:o,provider:n.name}};const[d,c]=await Promise.all([i.buildContext(a.id),dn(t,a.id)]),m=await i.getRecentConversations(a.id,30,o);await ja(i,m,a.id,e.channel,o);const h=Ma(a,d,e.channel,c),w=ws(h,m,e.text,n.name);await i.storeMessage(a.id,e.channel,"user",e.text,"{}",o);const f=await ln(t,a.id),_=10;let y="",S=0;const E=[...w.messages],R=[];Pa(E);for(let H=0;H<_;H++)try{H>0&&(yield{type:"thinking",data:{threadId:o}},Ba(E));const $=await n.chat(E,{tools:f});if($.usage&&(S+=$.usage.promptTokens+$.usage.completionTokens),$.toolCalls&&$.toolCalls.length>0){$.content&&(yield{type:"chunk",data:{text:$.content,threadId:o}});const O=$.content||`[calling: ${$.toolCalls.map(u=>{const v=u.arguments||{},p=Object.entries(v).filter(([g])=>!["content","values","body"].includes(g)).map(([g,b])=>`${g}="${String(b).substring(0,100)}"`).join(", ");return`${u.name}(${p})`}).join(", ")}]`;E.push({role:"assistant",content:O});const U=[];for(const u of $.toolCalls){yield{type:"tool_start",data:{tool:u.name,toolArgs:u.arguments,threadId:o}},R.push(u.name);try{const v=(x,T)=>bt(x,T,t,a.id,{agentType:"full",providerName:n.name,channel:e.channel},a.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,a.timezone,n,s==null?void 0:s.DOCUMENTS_BUCKET);let p;if(u.name==="browser_task"||u.name==="browser_task_status"){const T=v(u.name,u.arguments);e:for(;;){const D=await Promise.race([T.then(I=>({done:!0,r:I})),new Promise(I=>setTimeout(()=>I({done:!1}),15e3))]);if(D.done){p=D.r;break e}yield{type:"thinking",data:{threadId:o}}}if(u.name==="browser_task"){const D=p.match(/^\[BROWSER_TIMEOUT:([^\]]+)\]/);if(D){yield{type:"thinking",data:{threadId:o}};const I=v("browser_task_status",{task_id:D[1]});e:for(;;){const B=await Promise.race([I.then(C=>({done:!0,r:C})),new Promise(C=>setTimeout(()=>C({done:!1}),15e3))]);if(B.done){p=B.r;break e}yield{type:"thinking",data:{threadId:o}}}}}}else p=await v(u.name,u.arguments);yield{type:"tool_end",data:{tool:u.name,toolResult:p.substring(0,500)+(p.length>500?"...":""),threadId:o}};const g=["parse_document","drive_read_file"].includes(u.name)?2e4:8e3,b=p.length>g?p.substring(0,g)+`
[...result truncated to prevent token limit — full content was extracted]`:p;U.push(`[Tool Result for ${u.name}]: ${b}`)}catch(v){await P(t,a.id,"tool",u.name,v.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:u.name,toolResult:`Error: ${v.message||"Execution failed"}`,threadId:o}},U.push(`[Tool Error for ${u.name}]: ${v.message||"Execution failed"}`)}}E.push({role:"user",content:U.join(`

`)});continue}y=$.content;const q=Mt(y);await i.storeMessage(a.id,e.channel,"assistant",q,"{}",o);const z=50;for(let O=0;O<q.length;O+=z)yield{type:"chunk",data:{text:q.substring(O,O+z),threadId:o}},O+z<q.length&&await new Promise(u=>setTimeout(u,10));break}catch($){if(r){const O=$.message||"",U=O.includes("401")||O.includes("403")||O.includes("authentication")||O.includes("credit balance"),u=O.includes("429"),v=U?1440:u?10:5;await r.recordError(n.name,O,v)}await P(t,a.id,"llm","provider_error",$.message||"Unknown LLM error",{provider:n.name,turn:H});const q=$.message||"An error occurred",z=q.includes("429")||q.toLowerCase().includes("rate limit")||q.toLowerCase().includes("too many requests")?"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.":q;try{await i.storeMessage(a.id,e.channel,"assistant",`⚠️ ${z}`,"{}",o)}catch{}yield{type:"error",data:{error:z,threadId:o}};return}if(y=(y==null?void 0:y.trim())??"",!y)try{E.push({role:"user",content:"You have used all available research steps. Please now give a final answer based on the information gathered above and your own training knowledge. Be clear about what you found vs. what comes from your general knowledge."}),y=(await n.chat(E,{tools:[]})).content||"I reached the maximum number of research steps without a conclusive result. Please try rephrasing your question or ask me to answer directly from my knowledge.";const $=Mt(y);await i.storeMessage(a.id,e.channel,"assistant",$,"{}",o);const q=50;for(let z=0;z<$.length;z+=q)yield{type:"chunk",data:{text:$.substring(z,z+q),threadId:o}},z+q<$.length&&await new Promise(O=>setTimeout(O,10))}catch{y="I reached the maximum number of research steps. Please try rephrasing your question or ask me to answer directly from my knowledge.",await i.storeMessage(a.id,e.channel,"assistant",y,"{}",o).catch(()=>{}),yield{type:"chunk",data:{text:y,threadId:o}}}if(r&&S>0)try{await r.recordUsage(n.name,S)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(a.id,n.name,"full",S,Date.now()-l,1,e.channel).run()}catch{}const N=[{claimPattern:/\b(reminder set|set a reminder|i.ve set|i've set|scheduled for|reminder.*\d{1,2}:\d{2}|reminder.*(am|pm)\b|updated.*reminder|reminder.*updated|now set for|reminder now|set for.*\d{1,2}:\d{2}|set for.*(am|pm)\b)\b/i,requiredTools:["create_schedule","update_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a reminder was created or updated but neither create_schedule nor update_schedule was called. You MUST call the appropriate tool NOW. Do not respond with text only.",logType:"schedule_hallucination"},{claimPattern:/\b(email\s+(sent|delivered)|sent\s+(the\s+)?(email|message)|i.ve\s+(sent|emailed|mailed)|message\s+sent)\b/i,requiredTools:["gmail_send"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed an email was sent but gmail_send was never called. You MUST call gmail_send NOW or clarify that only a draft was prepared.",logType:"email_hallucination"},{claimPattern:/\b(i.ve\s+(remembered|stored|saved|noted)|stored\s+(that|this|it)|saved\s+(that|this|it)\s+to\s+memory|i.ll\s+remember\s+that|noted\s+(that|this|it))\b/i,requiredTools:["store_memory"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have stored something in memory but store_memory was never called. You MUST call store_memory NOW with the relevant content.",logType:"memory_hallucination"},{claimPattern:/\b(added\s+(row|entry|item|data)|appended\s+(to|into)\s+(the\s+)?(sheet|spreadsheet)|updated\s+(the\s+)?(sheet|row|cell|entry)|added\s+(to|in)\s+(your\s+|the\s+)(sheet|spreadsheet)|saved\s+(your\s+|the\s+)?(data|entry|note|info)\s+(to|in)\s+(the\s+)?(sheet|spreadsheet)|data\s+(is\s+)?(now\s+)?(in|on)\s+(your\s+|the\s+)?(sheet|spreadsheet)|(entry|note|data|row)\s+(has\s+been\s+|is\s+)(added|saved|recorded|entered|written))\b/i,requiredTools:["append_sheet","write_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have written to a sheet but append_sheet/write_sheet was never called. You MUST call the appropriate tool NOW.",logType:"sheet_hallucination"},{claimPattern:/\b(created\s+(the\s+)?(event|meeting|appointment)|added\s+(to\s+)?(your\s+)?calendar|(calendar\s+)?event\s+(created|added|scheduled))\b/i,requiredTools:["create_calendar_event"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a calendar event but create_calendar_event was never called. You MUST call create_calendar_event NOW.",logType:"calendar_hallucination"},{claimPattern:/\b(moved?\s+to\s+trash|(file|document|doc|spreadsheet)\s+(has\s+been\s+)?(deleted|trashed|moved\s+to\s+trash)|(deleted|trashed)\s+(the|your|that)\s+(file|document|doc|spreadsheet)|i.ve\s+(deleted|trashed)\s+(the|your|that)\s+(file|document|doc))\b/i,requiredTools:["drive_delete_file"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed a Drive file was deleted or moved to trash but drive_delete_file was never called. You MUST call drive_delete_file NOW with the file URL or ID.",logType:"drive_delete_hallucination"},{claimPattern:/\b(moved?\s+(the\s+)?(file|document|doc|spreadsheet)\s+to\b|renamed\s+(the\s+)?(file|document|doc)|(file|document|doc)\s+(has\s+been\s+)?(moved|renamed)|i.ve\s+(moved|renamed)\s+(the\s+)?(file|document|doc))\b/i,requiredTools:["drive_organise"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have moved or renamed a Drive file but drive_organise was never called. You MUST call drive_organise NOW.",logType:"drive_organise_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?doc(ument)?|doc(ument)?\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?doc)\b/i,requiredTools:["create_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a Google Document but create_doc was never called. You MUST call create_doc NOW.",logType:"create_doc_hallucination"},{claimPattern:/\b(appended\s+(to|into)\s+(the\s+|your\s+)?(document|google\s+doc|doc|notes?)|(added|saved)\s+(the\s+)?(content|text|data|note|entry)\s+(to|in)\s+(the\s+|your\s+)?(document|doc|notes?)|(added|saved)\s+(to|in)\s+(your\s+|the\s+)?(quick\s+)?notes?|i.ve\s+(appended|added)\s+(to\s+)?(the\s+|your\s+)?(document|doc|notes?))\b/i,requiredTools:["append_to_doc"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have appended content to a Google Document but append_to_doc was never called. You MUST call append_to_doc NOW.",logType:"append_doc_hallucination"},{claimPattern:/\b(created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet)|spreadsheet\s+(has\s+been\s+|is\s+)(created|ready|live)|i.ve\s+created\s+(a\s+)?(new\s+)?(google\s+)?(spreadsheet|sheet))\b/i,requiredTools:["create_sheet"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have created a spreadsheet but create_sheet was never called. You MUST call create_sheet NOW.",logType:"create_sheet_hallucination"},{claimPattern:/\b(drafted\s+(an?\s+)?(email|message)|created\s+(a\s+)?draft(\s+email|\s+message)?|draft\s+(is\s+)?(ready|saved|created)|i.ve\s+drafted\s+(the\s+|an?\s+)?(email|message))\b/i,requiredTools:["gmail_draft"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have drafted an email but gmail_draft was never called. You MUST call gmail_draft NOW.",logType:"draft_hallucination"},{claimPattern:/\b(archived\s+(the\s+|that\s+)?(email|message|thread)|marked\s+(it\s*|the\s+email\s*|that\s+email\s*)?(as\s+)?(read|unread|starred|important)|i.ve\s+archived\s+(the\s+|that\s+)?(email|message))\b/i,requiredTools:["gmail_modify"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have archived or marked an email but gmail_modify was never called. You MUST call gmail_modify NOW.",logType:"gmail_modify_hallucination"},{claimPattern:/\b(deleted\s+(the\s+)?(reminder|schedule|task)|removed\s+(the\s+)?(reminder|schedule|task)|(reminder|schedule|task)\s+(has\s+been\s+)?(deleted|removed|cancelled)|i.ve\s+(deleted|removed)\s+(the\s+)?(reminder|task))\b/i,requiredTools:["delete_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a reminder or schedule but delete_schedule was never called. You MUST call delete_schedule NOW.",logType:"delete_schedule_hallucination"},{claimPattern:/\b(disabled\s+(the\s+)?(reminder|schedule|task)|paused\s+(the\s+)?(reminder|task)|turned\s+off\s+(the\s+)?(reminder|schedule|task)|re-?enabled\s+(the\s+)?(reminder|task))\b/i,requiredTools:["toggle_schedule"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have enabled or disabled a reminder but toggle_schedule was never called. You MUST call toggle_schedule NOW with the job ID and enabled state.",logType:"toggle_schedule_hallucination"},{claimPattern:/\b(deleted?\s+(row|entry|line)\s+\d+|(row|entry)\s+\d+\s+(deleted?|removed?)|(duplicate\s+)?(row|entry)\s+(deleted?|removed?)|i.ve\s+(deleted?|removed?)\s+(the\s+)?(duplicate\s+)?(row|entry))\b/i,requiredTools:["delete_sheet_row"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted a sheet row but delete_sheet_row was never called. You MUST call delete_sheet_row NOW with the correct row number.",logType:"delete_sheet_row_hallucination"},{claimPattern:/\b(removed?\s+(the\s+)?(duplicate\s+)?(text|entry|line|content)\s+from\s+(the\s+)?(document|doc)|deleted?\s+(the\s+)?(duplicate\s+)?(text|entry|line)\s+from\s+(the\s+)?(document|doc)|i.ve\s+(removed?|deleted?)\s+(the\s+)?(duplicate|text|entry)\s+from\s+(the\s+)?doc)\b/i,requiredTools:["delete_doc_content"],enforcementMsg:"[SYSTEM ENFORCEMENT] You claimed to have deleted content from a Google Document but delete_doc_content was never called. You MUST call delete_doc_content NOW.",logType:"delete_doc_content_hallucination"}];for(const H of N){const $=H.claimPattern.test(y),q=H.requiredTools.some(z=>R.includes(z));if($&&!q){try{await P(t,a.id,"llm",H.logType,"LLM claimed action without tool call (streaming)",{response:y.substring(0,200)}),E.push({role:"assistant",content:y}),E.push({role:"user",content:H.enforcementMsg});const z=await n.chat(E,{tools:f.filter(O=>H.requiredTools.includes(O.name)),temperature:0});if((W=z.toolCalls)!=null&&W.length){for(const U of z.toolCalls){const u=await bt(U.name,U.arguments,t,a.id,{agentType:"full",providerName:n.name,channel:e.channel},a.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,a.timezone,n,s==null?void 0:s.DOCUMENTS_BUCKET);R.push(U.name),E.push({role:"assistant",content:"",toolCalls:z.toolCalls}),E.push({role:"user",content:u})}const O=await n.chat(E,{tools:[]});O.content&&(y=O.content)}else y="I need to complete that action — could you confirm the details so I can actually do it?"}catch{}break}}yield{type:"done",data:{threadId:o,provider:n.name,tokenCount:S}}}async function Rn(e,t,n,a,r,s,i,o){await s.storeMessage(r.id,t.channel,"user",t.text,"{}",o);const l=await bt(e.tool,e.args,n,r.id,{agentType:"direct",channel:t.channel},r.pin_hash,i==null?void 0:i.GOOGLE_CLIENT_ID,i==null?void 0:i.GOOGLE_CLIENT_SECRET,i==null?void 0:i.GOOGLE_API_KEY,i==null?void 0:i.GOOGLE_CSE_ID,r.timezone,a,i==null?void 0:i.DOCUMENTS_BUCKET),d=`[TOOLS_USED: ${e.tool}] ${l}`.replace(/^\[TOOLS_USED: [^\]]*\]\s*/i,"");return await s.storeMessage(r.id,t.channel,"assistant",d,"{}",o),l}async function cn(e,t,n,a,r,s){var f;const i=new K(t),o=(f=e.metadata)==null?void 0:f.thread_id,l=await i.buildContext(a.id),d=on(e.text,l);if(d.agent==="conversation")return Ua(e,t,n,a,l,r,o);const c=Ca(e.text);if(c)return Rn(c,e,t,n,a,i,s,o);const m=(await i.getRecentConversations(a.id,10,o)).map(_=>_.content).join(`
`),h=Na(e.text,m);if(h)return Rn(h,e,t,n,a,i,s,o);const w=d.confidence>=.85;if(e.channel==="telegram"){const _=await ln(t,a.id);return kn(e,t,n,a,r,s,{maxTurns:10,tools:_,forceToolUseOnFirstTurn:w})}return kn(e,t,n,a,r,s,{forceToolUseOnFirstTurn:w})}async function Ua(e,t,n,a,r,s,i){const o=new K(t),l=Date.now(),d=$a(a.timezone),c=await dn(t,a.id),m=c?`## Your Standing Instructions (User-Set — Do Not Duplicate in Memory)
These rules were explicitly configured by the user in Settings. Do not store copies in memory or contradict them.
${c}

${r}`:r,h=Ia("conversation",a,m,a.timezone,d,e.channel),w=(await o.getRecentConversations(a.id,30,i)).filter(E=>!E.content.startsWith("[Autonomous Scheduled Task]")&&!E.content.startsWith("[Scheduled Reminder]")),f=La([{role:"system",content:h},...w.map(E=>({role:E.role,content:E.content})),{role:"user",content:e.text}]);await o.storeMessage(a.id,e.channel,"user",e.text,"{}",i);let _=0,y="";try{const E=await n.chat(f,{temperature:.8});E.usage&&(_=E.usage.promptTokens+E.usage.completionTokens),y=E.content}catch(E){if(s){const R=E.message||"",N=R.includes("401")||R.includes("403")||R.includes("authentication")||R.includes("credit balance"),M=R.includes("429"),W=N?1440:M?10:5;await s.recordError(n.name,R,W)}throw await P(t,a.id,"llm","conversation_error",E.message,{provider:n.name}),E}if(s&&_>0)try{await s.recordUsage(n.name,_)}catch{}try{await t.prepare("INSERT INTO llm_calls (user_id, provider_name, agent_type, tokens_used, latency_ms, success, channel) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(a.id,n.name,"conversation",_,Date.now()-l,1,e.channel).run()}catch{}const S=Mt(y);return await o.storeMessage(a.id,e.channel,"assistant",S,"{}",i),S}async function*_s(e,t,n,a,r,s){var c;const i=new K(t),o=(c=e.metadata)==null?void 0:c.thread_id,l=await i.buildContext(a.id),d=on(e.text,l);if(yield{type:"thinking",data:{threadId:o,provider:n.name}},d.agent!=="conversation"){yield*bs(e,t,n,a,r,s);return}try{const m=await Ua(e,t,n,a,l,r,o),h=50;for(let w=0;w<m.length;w+=h)yield{type:"chunk",data:{text:m.substring(w,w+h),threadId:o}},w+h<m.length&&await new Promise(f=>setTimeout(f,10))}catch(m){yield{type:"error",data:{error:m.message||"An error occurred",threadId:o}};return}yield{type:"done",data:{threadId:o,provider:n.name,tokenCount:0}}}const ne=new pe;async function Es(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",n),await t()}ne.use("/*",Es);ne.get("/threads",async e=>{const t=e.get("user"),n=e.req.query("archived")==="1",a=parseInt(e.req.query("limit")||"30"),r=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(t.id,n?1:0,a).all();return e.json({threads:r.results||[]})});ne.post("/threads",async e=>{const t=e.get("user"),{title:n}=await e.req.json(),a=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n||"New conversation").first();return e.json({thread:a})});ne.put("/threads/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),a=await e.req.json(),r=[],s=[];return a.title!==void 0&&(r.push("title = ?"),s.push(a.title)),a.is_archived!==void 0&&(r.push("is_archived = ?"),s.push(a.is_archived?1:0)),r.push("updated_at = CURRENT_TIMESTAMP"),s.push(n,t.id),r.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),e.json({success:!0}))});ne.delete("/threads/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ne.post("/upload",async e=>{const t=e.get("user"),n=!!e.env.DOCUMENTS_BUCKET,a=n?100*1024*1024:700*1024;let r,s,i,o=null,l=null;try{if((e.req.header("Content-Type")||"").includes("multipart/form-data")){const y=(await e.req.formData()).get("file");if(!y)return e.json({error:"No file provided."},400);if(r=y.name,s=y.type||"application/octet-stream",i=y.size,i>a)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);o=await y.arrayBuffer()}else{const _=await e.req.json();if(!_.file_name||!_.file_data)return e.json({error:"file_name and file_data are required."},400);if(r=_.file_name,s=_.file_type||"application/octet-stream",l=_.file_data,i=_.file_size||Math.round(l.length*.75),i>a)return e.json({error:`File too large (max ${n?"100 MB":"700 KB"}). Try sharing a Google Drive link instead — paste the link into the chat and Karna can read it directly.`},400);if(n){const y=atob(l);o=new ArrayBuffer(y.length);const S=new Uint8Array(o);for(let E=0;E<y.length;E++)S[E]=y.charCodeAt(E)}}const c=crypto.randomUUID();let m;n&&o?(await e.env.DOCUMENTS_BUCKET.put(c,o,{httpMetadata:{contentType:s},customMetadata:{fileName:r,userId:String(t.id)}}),m="r2"):m=l||(o?Buffer.from(o).toString("base64"):""),await e.env.DB.prepare("INSERT INTO uploaded_files (id, user_id, file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?, ?, ?)").bind(c,t.id,r,s,m,i).run(),await e.env.DB.prepare("INSERT INTO document_library (user_id, file_id, source, name, mime_type, size, status) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t.id,c,"upload",r,s,i,"uploaded").run();const h=s==="application/pdf"||r.toLowerCase().endsWith(".pdf"),w=s==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||r.toLowerCase().endsWith(".docx");if(w)try{const{extractDocxTextFromBuffer:_}=await Promise.resolve().then(()=>cs),y=l?Buffer.from(l,"base64"):o?Buffer.from(o):null;if(y){const S=await _(y);S.length>50&&await e.env.DB.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(S,c).run()}}catch{}if(h&&t.pin_hash){const _=l||(o?Buffer.from(o).toString("base64"):null),y=t.pin_hash,S=t.id,E=e.env.DB,R=e.env.DOCUMENTS_BUCKET,N=(async()=>{var M,W;try{let H=null,$="claude-haiku-4-5-20251001";const{decrypt:q}=await Promise.resolve().then(()=>an);for(const v of["llm_slot_1","llm_slot_2","llm_slot_3"])try{const p=await E.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(S,v).first();if(p){const g=await q(p.encrypted_value,y),b=JSON.parse(g);if(b.provider==="anthropic"){H=b.apiKey,b.model&&($=b.model);break}}}catch{}if(!H)return;let z;if(m==="r2"&&R){const v=await R.get(c);if(!v)return;z=Buffer.from(await v.arrayBuffer()).toString("base64")}else if(_)z=_;else return;const O=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":H,"anthropic-version":"2023-06-01","anthropic-beta":"pdfs-2024-09-25","content-type":"application/json"},body:JSON.stringify({model:$,max_tokens:8192,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:z}},{type:"text",text:"Extract all readable text from this document. Preserve tables, lists, and structure."}]}]})});if(!O.ok)return;const u=((W=(M=(await O.json()).content)==null?void 0:M[0])==null?void 0:W.text)||"";u&&await E.prepare("UPDATE uploaded_files SET extracted_text = ? WHERE id = ?").bind(u,c).run()}catch{}})();try{e.executionCtx.waitUntil(N)}catch{}}let f="";if(s.startsWith("text/"))try{const _=l||(o?Buffer.from(o).toString("base64"):"");f=Buffer.from(_,"base64").toString("utf-8").substring(0,500)}catch{}return e.json({file_id:c,name:r,type:s,size:i,text_preview:f,storage:n?"r2":"d1",extracting:h&&!w})}catch(d){console.error("File upload error:",d);try{const{logError:c}=await Promise.resolve().then(()=>nt);await c(e.env.DB,t.id,"upload","upload_error",d.message||"Unknown upload error")}catch{}return e.json({error:`Upload failed: ${d.message||"Unknown error"}`},500)}});ne.post("/send",async e=>{const t=e.get("user"),{message:n,channel:a="web",thread_id:r,files:s}=await e.req.json();if(!n||typeof n!="string"||n.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(s&&Array.isArray(s)&&s.length>0){i=`

[Attached files:
`;for(const d of s)i+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(i+=`
  Preview: ${d.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=r;if(!o){const d=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n.trim().substring(0,60)+(n.trim().length>60?"...":"")).first();o=d==null?void 0:d.id}const l={userId:t.id,username:t.username,channel:a,text:n.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:d,rotation:c}=await ut(e.env.DB,t.id,t.pin_hash),m=await cn(l,e.env.DB,d,t,c,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});return!r&&o?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run():o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),e.json({response:m,timestamp:new Date().toISOString(),channel:l.channel,provider:d.name,thread_id:o})}catch(d){console.error("Chat error:",d);const c=d.message||"";if(c.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400);if(c.includes("All LLM providers failed"))return e.json({error:c,type:"no_provider",thread_id:o},400);if(c.includes("429")||c.includes("limit reached")||c.includes("rate limit")||c.includes("Too Many Requests"))return e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429);const m=c.includes("401")||c.includes("403")||c.includes("authentication")||c.includes("credit balance")||c.includes("invalid")&&c.includes("key");try{const{logError:h}=await Promise.resolve().then(()=>nt);await h(e.env.DB,t.id,"llm","chat_error",c)}catch{}return e.json({error:m?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:c,type:m?"no_provider":void 0,thread_id:o},m?400:500)}});function On(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}ne.post("/stream",async e=>{const t=e.get("user"),{message:n,channel:a="web",thread_id:r,files:s}=await e.req.json();if(!n||typeof n!="string"||n.trim().length===0)return e.json({error:"Message is required"},400);let i="";if(s&&Array.isArray(s)&&s.length>0){i=`

[Attached files:
`;for(const d of s)i+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(i+=`
  Preview: ${d.text_preview.substring(0,300)}...`),i+=`
`;i+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let o=r;if(!o){const d=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,n.trim().substring(0,60)+(n.trim().length>60?"...":"")).first();o=d==null?void 0:d.id}const l={userId:t.id,username:t.username,channel:a,text:n.trim()+i,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:o}};try{const{provider:d,rotation:c}=await ut(e.env.DB,t.id,t.pin_hash),m=new ReadableStream({async start(h){const w=new TextEncoder;try{const f=_s(l,e.env.DB,d,t,c,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID,DOCUMENTS_BUCKET:e.env.DOCUMENTS_BUCKET});for await(const _ of f)_.data.threadId||(_.data.threadId=o),h.enqueue(w.encode(On(_)));o&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(o).run(),h.close()}catch(f){const _={type:"error",data:{error:f.message||"An error occurred",threadId:o}};h.enqueue(w.encode(On(_))),h.close()}}});return new Response(m,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(o||"")}})}catch(d){console.error("Stream setup error:",d);const c=d.message||"";return c.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:o},400):c.includes("429")||c.includes("limit reached")||c.includes("rate limit")||c.includes("Too Many Requests")?e.json({error:"Rate limit reached across all configured providers. Add a second AI provider in Settings → API Keys (Gemini and DeepSeek offer free tiers) to enable automatic failover and avoid this.",type:"rate_limit",thread_id:o},429):e.json({error:"Something went wrong setting up the stream.",details:c,thread_id:o},500)}});ne.get("/threads/:id/messages",async e=>{var s;const t=e.get("user"),n=parseInt(e.req.param("id")),a=parseInt(e.req.query("limit")||"50"),r=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,n,a).all();return e.json({messages:(r.results||[]).reverse(),total:((s=r.results)==null?void 0:s.length)||0})});ne.get("/history",async e=>{var l;const t=e.get("user"),n=parseInt(e.req.query("limit")||"50"),a=parseInt(e.req.query("offset")||"0"),r=e.req.query("thread_id");let s,i;r?(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,parseInt(r),n,a]):(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,i=[t.id,n,a]);const o=await e.env.DB.prepare(s).bind(...i).all();return e.json({messages:(o.results||[]).reverse(),total:((l=o.results)==null?void 0:l.length)||0})});ne.delete("/history",async e=>{const t=e.get("user"),n=e.req.query("thread_id");return n?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(n)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});ne.get("/dashboard",async e=>{const t=e.get("user"),[n,a,r,s,i,o,l,d,c,m,h,w,f,_]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all().catch(()=>({results:[]})),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM user_skills WHERE user_id = ? AND enabled = 1").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM preferences WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status IN ('pending','needs_approval')").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND type='browser_task' AND status='running'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status='failed'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory_suggestions WHERE user_id = ? AND status='pending'").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM document_library WHERE user_id = ?").bind(t.id).first().catch(()=>null),e.env.DB.prepare("SELECT id, name, description, next_run FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND next_run BETWEEN datetime('now', 'start of day') AND datetime('now', '+1 day', 'start of day') LIMIT 5").bind(t.id).all().catch(()=>({results:[]}))]);return e.json({threads:(n==null?void 0:n.cnt)||0,active_schedules:(a==null?void 0:a.cnt)||0,memories:(r==null?void 0:r.cnt)||0,recent_threads:s.results||[],provider_usage:[],unread_notifications:(i==null?void 0:i.cnt)||0,errors:(o==null?void 0:o.cnt)||0,skills_count:(l==null?void 0:l.cnt)||0,preferences_count:(d==null?void 0:d.cnt)||0,pending_actions:(c==null?void 0:c.cnt)||0,running_browser_tasks:(m==null?void 0:m.cnt)||0,failed_actions:(h==null?void 0:h.cnt)||0,memory_suggestions:(w==null?void 0:w.cnt)||0,documents_count:(f==null?void 0:f.cnt)||0,todays_reminders:_.results||[]})});ne.get("/gmail/unread",async e=>{const t=e.get("user");try{const n=e.env.GOOGLE_CLIENT_ID,a=e.env.GOOGLE_CLIENT_SECRET;if(!n||!a)return e.json({count:null,reason:"google_not_configured"});const s=await new ve(e.env.DB,t.id,t.pin_hash,n,a).getUnreadCount();return e.json({count:s})}catch(n){return e.json({count:null,reason:n.message})}});ne.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));ne.get("/notifications/count",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(n==null?void 0:n.cnt)||0})});ne.get("/notifications",async e=>{const t=e.get("user"),n=parseInt(e.req.query("limit")||"20"),a=await e.env.DB.prepare(`SELECT id, type, title, body, is_read, source, action_url, created_at 
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,n).all();return e.json({notifications:a.results||[]})});ne.put("/notifications/:id/read",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ne.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});ne.delete("/notifications/all",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});ne.delete("/notifications/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});ne.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const Z=new pe;async function Ts(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),await t()}Z.use("/*",Ts);Z.get("/profile",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(n==null?void 0:n.name)||t.name,role:(n==null?void 0:n.role)||t.role,personality_prompt:(n==null?void 0:n.personality_prompt)||t.personality_prompt,telegram_chat_id:(n==null?void 0:n.telegram_chat_id)||t.telegram_chat_id,timezone:(n==null?void 0:n.timezone)||t.timezone,assistant_name:(n==null?void 0:n.assistant_name)||"Karna"})});Z.put("/profile",async e=>{const t=e.get("user"),n=await e.req.json(),a=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],r=[],s=[];for(const i of a)n[i]!==void 0&&(r.push(`${i} = ?`),s.push(n[i]));return r.length===0?e.json({error:"No valid fields to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),s.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${r.join(", ")} WHERE id = ?`).bind(...s).run(),e.json({success:!0}))});const en=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key","perplexity_api_key","browser_use_api_key"];Z.get("/credentials",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT id, service, label, encrypted_value, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all(),a=["llm_slot_1","llm_slot_2","llm_slot_3"],r=await Promise.all((n.results||[]).map(async s=>{let i;if(a.includes(s.service))try{const o=await Y(s.encrypted_value,t.pin_hash);i=JSON.parse(o).provider}catch{}return{id:s.id,service:s.service,label:s.label,created_at:s.created_at,updated_at:s.updated_at,configured:!0,...i?{provider_id:i}:{}}}));return e.json({credentials:r,available_services:en,llm_providers:wt})});Z.put("/credentials",async e=>{const t=e.get("user"),{service:n,value:a,label:r}=await e.req.json();if(!n||!a)return e.json({error:"Service name and value are required"},400);if(!en.includes(n))return e.json({error:`Invalid service. Must be one of: ${en.join(", ")}`},400);const s=await ct(a,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,n,r||n,s).run(),e.json({success:!0,service:n})});Z.delete("/credentials/:service",async e=>{const t=e.get("user"),n=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,n).run(),e.json({success:!0})});Z.get("/memory",async e=>{const t=e.get("user"),n=e.req.query("type"),r=await new K(e.env.DB).getAll(t.id,n||void 0,100);return e.json({memories:r})});Z.post("/memory",async e=>{const t=e.get("user"),{type:n,title:a,content:r,importance:s}=await e.req.json();return!n||!a||!r?e.json({error:"Type, title, and content are required"},400):(await new K(e.env.DB).store(t.id,n,a,r,s||5),e.json({success:!0}))});Z.delete("/memory/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new K(e.env.DB).remove(n,t.id),e.json({success:!0})});Z.get("/preferences",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT id, content, created_at FROM preferences WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC").bind(t.id).all();return e.json({preferences:n.results||[]})});Z.post("/preferences",async e=>{const t=e.get("user"),{content:n}=await e.req.json();return n!=null&&n.trim()?(await e.env.DB.prepare("INSERT INTO preferences (user_id, content) VALUES (?, ?)").bind(t.id,n.trim()).run(),e.json({success:!0})):e.json({error:"Content required"},400)});Z.put("/preferences/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{content:a}=await e.req.json();return a!=null&&a.trim()?(await e.env.DB.prepare("UPDATE preferences SET content = ? WHERE id = ? AND user_id = ?").bind(a.trim(),n,t.id).run(),e.json({success:!0})):e.json({error:"Content required"},400)});Z.delete("/preferences/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM preferences WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});Z.get("/schedules",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:n.results||[]})});Z.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{enabled:a}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a?1:0,n,t.id).run(),e.json({success:!0})});Z.delete("/schedules/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});Z.get("/errors",async e=>{const t=e.get("user"),n=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:n.results||[]})});Z.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});Z.post("/credentials/validate",async e=>{const t=e.get("user"),{service:n,value:a}=await e.req.json();if(!n)return e.json({error:"Service required"},400);let r=a;if(!r){const s=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,n).first();if(!s)return e.json({valid:!1,message:"No credential saved for this slot."});try{r=await Y(s.encrypted_value,t.pin_hash)}catch{return e.json({valid:!1,message:"Failed to decrypt stored credential."})}}switch(n){case"anthropic":try{const s=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return s.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):s.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${s.status}.`})}catch(s){return e.json({valid:!1,message:`Connection failed: ${s.message}`})}case"openai":try{const s=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${r}`}});return s.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):s.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${s.status}.`})}catch(s){return e.json({valid:!1,message:`Connection failed: ${s.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const s=JSON.parse(r);if(!s.provider||!s.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const i=wt[s.provider];if(!i)return e.json({valid:!1,message:`Unknown provider: ${s.provider}`});if(i.apiFormat==="anthropic"){const o=await fetch(i.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":s.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return o.ok?e.json({valid:!0,message:`${i.label} API key is valid.`}):o.status===401?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${o.status}.`})}else{const o=i.apiBase+(i.validatePath||"/v1/models"),l=await fetch(o,{headers:{Authorization:`Bearer ${s.apiKey}`}});if(l.ok)return e.json({valid:!0,message:`${i.label} API key is valid.`});if(l.status===401||l.status===403)return e.json({valid:!1,message:`Invalid ${i.label} API key.`});if(l.status===404)try{const d=await fetch(i.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.apiKey}`},body:JSON.stringify({model:i.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return d.ok||d.status===200?e.json({valid:!0,message:`${i.label} API key is valid.`}):d.status===401||d.status===403?e.json({valid:!1,message:`Invalid ${i.label} API key.`}):e.json({valid:!1,message:`${i.label} responded with status ${d.status}.`})}catch(d){return e.json({valid:!1,message:`${i.label} chat test failed: ${d.message}`})}return e.json({valid:!1,message:`${i.label} responded with status ${l.status}.`})}}catch(s){return s instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${s.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});case"perplexity_api_key":try{const s=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar",messages:[{role:"user",content:"test"}],max_tokens:1})});return s.ok||s.status===400?e.json({valid:!0,message:"Perplexity API key is valid."}):s.status===401?e.json({valid:!1,message:"Invalid Perplexity API key."}):e.json({valid:!1,message:`Perplexity responded with status ${s.status}.`})}catch(s){return e.json({valid:!1,message:`Connection failed: ${s.message}`})}default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});Z.get("/google/status",async e=>{const t=e.get("user");try{const n=await rn(e.env.DB,t.id,t.pin_hash),a=ma(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...n,oauth_client_configured:a})}catch(n){return e.json({connected:!1,error:n.message})}});Z.get("/google/auth-url",async e=>{var t;e.get("user");try{const n=e.env.GOOGLE_CLIENT_ID,a=e.env.GOOGLE_CLIENT_SECRET;if(!n||!a)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const r=new URL(e.req.url),s=`${r.protocol}//${r.host}/auth/google/callback`,i=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),o=da(n,s,i);return e.json({auth_url:o,redirect_uri:s})}catch(n){return e.json({error:`Failed to generate auth URL: ${n.message}`},500)}});Z.post("/google/disconnect",async e=>{const t=e.get("user");try{return await ha(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(n){return e.json({error:n.message},500)}});Z.post("/google/test",async e=>{const t=e.get("user");try{const{token:n,email:a}=await mt(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),r=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${n}`}}),s=!0,i=r.ok;return e.json({success:!0,email:a,scopes:{sheets:s,calendar:i,docs:s,drive:s},message:i?`Connected as ${a} — all services working.`:`Connected as ${a} — calendar access issue (${r.status}).`})}catch(n){return e.json({success:!1,error:n.message})}});Z.get("/site-vault",async e=>{const t=e.get("user");try{const n=await e.env.DB.prepare("SELECT id, name, created_at, updated_at FROM site_credentials WHERE user_id = ? ORDER BY name ASC").bind(t.id).all();return e.json({entries:n.results||[]})}catch{return e.json({entries:[]})}});Z.put("/site-vault",async e=>{const t=e.get("user");try{const{name:n,username:a,password:r,notes:s}=await e.req.json();if(!(n!=null&&n.trim())||!(a!=null&&a.trim())||!(r!=null&&r.trim()))return e.json({error:"name, username, and password are required"},400);const i=JSON.stringify({username:a.trim(),password:r,...s?{notes:s}:{}}),o=await ct(i,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO site_credentials (user_id, name, encrypted_blob)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, name) DO UPDATE SET
         encrypted_blob = excluded.encrypted_blob,
         updated_at = CURRENT_TIMESTAMP`).bind(t.id,n.trim(),o).run(),e.json({success:!0,name:n.trim()})}catch(n){return e.json({error:(n==null?void 0:n.message)||"Failed to save credential"},500)}});Z.delete("/site-vault/:id",async e=>{const t=e.get("user");try{const n=Number(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM site_credentials WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})}catch(n){return e.json({error:(n==null?void 0:n.message)||"Failed to delete credential"},500)}});const Oe=new pe;Oe.get("/debug/time",e=>{const t=new Date,n=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return e.json({utc_iso:t.toISOString(),utc_ms:t.getTime(),formatted_ist:n.format(t),toLocaleString_ist:t.toLocaleString("en-US",{timeZone:"Asia/Kolkata"})})});Oe.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const n=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:n,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});Oe.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const n=Date.now()-t;return e.json({status:"ok",latency_ms:n})}catch(t){return e.json({status:"error",error:t.message},500)}});Oe.get("/status",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const a=n.user_id,[r,s,i,o]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(a).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(a).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(a).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(a).first()]);return e.json({active_schedules:(r==null?void 0:r.cnt)||0,memory_entries:(s==null?void 0:s.cnt)||0,total_messages:(i==null?void 0:i.cnt)||0,unread_errors:(o==null?void 0:o.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});async function Ss(e,t,n,a){try{const r=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t).first();if(!r)return;const s=await Y(r.encrypted_value,r.pin_hash),i=4e3,o=a.length>i?a.substring(0,i-3)+"...":a;(await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:n,text:o,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:n,text:o})})}catch{}}function Cn(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}Oe.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const a=new Date,r=a.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:r})).run()}catch{}const s=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')
     AND (cj.last_run IS NULL OR cj.last_run < datetime('now', '-90 seconds'))`).bind(r).all(),i=[];for(const o of s.results||[])try{await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ? WHERE id = ? AND (last_run IS NULL OR last_run < datetime('now', '-90 seconds'))").bind(r,o.id).run();const l=o.user_timezone||"UTC";let d,c=!1,m=o.state||"active";if(o.schedule_type==="interval"){const f=parseInt(o.schedule_value,10);d=new Date(a.getTime()+f*60*1e3)}else if(o.schedule_type==="daily"){const[f,_]=o.schedule_value.split(":").map(Number),y=Cn(l),S=new Date(y);S.setHours(f,_,0,0),S<=y&&S.setDate(S.getDate()+1);const E=new Date(S.toLocaleString("en-US",{timeZone:"UTC"})),R=new Date(S.toLocaleString("en-US",{timeZone:l})),N=E.getTime()-R.getTime();d=new Date(S.getTime()+N)}else if(o.schedule_type==="weekly"){const[f,_]=o.schedule_value.split(" "),[y,S]=(_||"00:00").split(":").map(Number),R=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(z=>z.toLowerCase()===f.toLowerCase()),N=Cn(l),M=new Date(N);M.setHours(y,S,0,0);let W=(R-M.getDay()+7)%7;W===0&&M<=N&&(W=7),M.setDate(M.getDate()+W);const H=new Date(M.toLocaleString("en-US",{timeZone:"UTC"})),$=new Date(M.toLocaleString("en-US",{timeZone:l})),q=H.getTime()-$.getTime();d=new Date(M.getTime()+q)}else o.schedule_type==="once"?(c=!0,m="completed",d=new Date(a.getTime()+365*24*60*60*1e3)):d=new Date(a.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(r,d.toISOString(),c?0:o.enabled,m,o.id).run();const w=(JSON.parse(o.action_config||"{}").description||o.description)&&(o.action_type==="check_mail"||o.action_type==="check_calendar"||o.action_type==="check_sheet"||o.action_type==="custom");i.push({job_id:o.id,name:o.name,status:"dispatched",needs_agent:w,next_run:d.toISOString()})}catch(l){i.push({job_id:o.id,name:o.name,status:"error",error:l.message})}try{const{MemoryService:o}=await Promise.resolve().then(()=>qr),l=await e.env.DB.prepare("SELECT id FROM users").all();for(const d of l.results||[])await new o(e.env.DB).cleanupDoneTasks(d.id)}catch{}return e.json({executed:i.length,results:i,timestamp:r})});Oe.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);const a=parseInt(e.req.param("jobId"),10);if(!a)return e.json({error:"Invalid job ID"},400);const r=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(a).first();if(!r)return e.json({error:"Job not found"},404);const i=JSON.parse(r.action_config||"{}").description||r.description||"",o="⏰ "+(r.name||"Scheduled Task"),l=new Date().toISOString();let d="";const c=r.action_type==="reminder",m=/\b(check|search|look\s*up|read|fetch|find|verify|track|scan|review|query|pull|get)\b/i;if(!c&&r.action_type==="custom"&&m.test(i),c)d=i||r.name||"Time for your scheduled task.";else try{const _={id:r.user_id,username:r.username||"user",name:r.user_name||"User",pin_hash:r.pin_hash||"",role:r.user_role||"",personality_prompt:r.personality_prompt||"",telegram_chat_id:r.telegram_chat_id||"",timezone:r.user_timezone||"UTC",assistant_name:r.assistant_name||"Karna",created_at:"",updated_at:""},y={userId:r.user_id,username:_.username,channel:"cron",text:xs(r.name,i,r.action_type),sessionId:"cron-"+r.id,timestamp:l},{provider:S,rotation:E}=await ut(e.env.DB,r.user_id,r.pin_hash);d=await cn(y,e.env.DB,S,_,E,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(_){const y=_.message||"unknown error",S=y.includes("rate_limit")||y.includes("429")||y.includes("quota"),E=y.includes("timeout")||y.includes("Timeout");S?d="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":E?d="Task timed out. Will retry at next scheduled time.":d="Task encountered an error. Will retry at next scheduled time.",await P(e.env.DB,r.user_id,"cron_agent","execution_error",y,{job_id:r.id})}if(["check_mail","check_calendar","check_sheet","custom"].includes(r.action_type))try{const _=await e.env.DB.prepare(`SELECT COUNT(*) as cnt FROM tool_execution_log 
         WHERE user_id = ? AND created_at > datetime('now', '-60 seconds')
         AND tool_name != '__enforcement_trigger'`).bind(r.user_id).first();(!_||_.cnt===0)&&await P(e.env.DB,r.user_id,"cron_verification","no_tools_called",`Cron job "${r.name}" (${r.action_type}) completed without any tool calls`,{job_id:r.id,action_type:r.action_type,response_preview:d.substring(0,200)})}catch{}let w=d||i||"Time for your scheduled task.";w=w.replace(/^\[TOOLS_USED:[^\]]*\]\s*/i,"");const f=o+`
`+w;return await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(r.user_id,"reminder",o,w,"cron:"+r.id).run(),c&&await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(r.user_id,"system","assistant",f,JSON.stringify({type:"cron",job_id:r.id})).run(),r.telegram_chat_id&&await Ss(e.env.DB,r.user_id,r.telegram_chat_id,f),e.json({job_id:a,status:"completed",response_length:d.length})});async function Ha(e){var a;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return null;const n=await e.env.DB.prepare("SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime('now')").bind(t).first();return(n==null?void 0:n.user_id)||null}Oe.get("/health/tools",async e=>{var n;const t=await Ha(e);if(!t)return e.json({error:"Not authenticated"},401);try{const a=await e.env.DB.prepare(`SELECT tool_name,
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
       ORDER BY calls DESC`).bind(t).all();return e.json({period:"last_24h",tool_stats:a.results,enforcement:{triggers:r.results,retry_results:((n=s.results)==null?void 0:n[0])||{total_retries:0,successful_retries:0}},cron:{executions:i.results,warnings:o.results},providers:l.results})}catch(a){return e.json({error:a.message||"Failed to fetch metrics"},500)}});Oe.get("/health/tools/recent",async e=>{const t=await Ha(e);if(!t)return e.json({error:"Not authenticated"},401);try{const n=await e.env.DB.prepare(`SELECT id, agent_type, provider_name, tool_name, tool_args, tool_result,
              success, error_message, latency_ms, was_enforcement_retry, channel, created_at
       FROM tool_execution_log
       WHERE user_id = ?
       ORDER BY id DESC LIMIT 50`).bind(t).all();return e.json({logs:n.results})}catch(n){return e.json({error:n.message},500)}});const ft=`

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
- Example: "Couldn't retrieve Amazon order status — requires login."`;function xs(e,t,n){return n==="reminder"?`[Scheduled Reminder] "${e}": ${t||"Time for your reminder."}`:n==="check_mail"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check Gmail for new/important emails."}
You MUST call gmail_list or gmail_search immediately.${ft}`:n==="check_calendar"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t||"Check calendar for upcoming events."}
You MUST call list_calendar_events immediately.${ft}`:n==="check_sheet"?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
You MUST call read_sheet immediately with the relevant spreadsheet.${ft}`:n==="custom"&&t?`[Autonomous Scheduled Task] Execute this task NOW using tools — do NOT just describe what you'd do.
Task: "${e}"
Instructions: ${t}
Execute the instructions above by calling the appropriate tools (web_search, gmail_search, read_sheet, etc.).${ft}`:`[Scheduled task "${e}"]: ${t||"Execute this scheduled task."}${ft}`}function ks(e,t,n,a){return{userId:e,username:t,channel:"telegram",text:n,sessionId:`telegram-${a}`,timestamp:new Date().toISOString()}}function Ds(e,t){return e.replace(/\*\*(.*?)\*\*/gs,"*$1*").replace(/^#{1,3}\s+(.+)$/gm,"*$1*").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const Dt=new pe,Rs=4e3;async function te(e,t,n,a="Markdown",r,s){var d,c;const i=Cs(n,Rs),o=[];let l=!0;for(let m=0;m<i.length;m++){const h=i[m];let w=!1,f="";for(let _=0;_<3;_++)try{const y=await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:h,parse_mode:a,disable_web_page_preview:!1})});if(y.ok){w=!0;break}const S=await y.json().catch(()=>null);if(f=`HTTP ${y.status}: ${(S==null?void 0:S.description)||"Unknown error"}`,(d=S==null?void 0:S.description)!=null&&d.includes("parse")||(c=S==null?void 0:S.description)!=null&&c.includes("entities")){if((await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:h})})).ok){w=!0;break}f+=" (plain-text retry also failed)"}if(y.status===429||y.status>=500){const E=Math.pow(2,_)*1e3;await new Promise(R=>setTimeout(R,E));continue}break}catch(y){if(f=`Network error: ${y.message}`,_<2){const S=Math.pow(2,_)*1e3;await new Promise(E=>setTimeout(E,S));continue}}w||(l=!1,o.push(`Chunk ${m+1}/${i.length}: ${f}`))}if(!l&&r&&s&&o.length>0)try{const{logError:m}=await Promise.resolve().then(()=>nt);await m(r,s,"telegram","send_failed",o.join(" | "))}catch{}return{success:l,errors:o}}async function Os(e,t){try{await fetch(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function Cs(e,t){if(e.length<=t)return[e];const n=[];let a=e;for(;a.length>0;){if(a.length<=t){n.push(a);break}let r=a.lastIndexOf(`
`,t);r<t*.3&&(r=a.lastIndexOf(" ",t)),r<t*.3&&(r=t),n.push(a.substring(0,r)),a=a.substring(r).trimStart()}return n}async function Ns(e,t,n,a,r){switch(e.split("@")[0].toLowerCase()){case"/start":{const i=(a==null?void 0:a.name)||"there",o=(a==null?void 0:a.assistant_name)||"Karna",l=`👋 *Hello, ${i}!*

I'm ${o}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/tasks — Show open tasks
/new — Start a fresh conversation

Just type naturally to chat. Everything works — schedules, tasks, memory, Gmail, Google Workspace, and more.`+(a?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`),d=await te(n,t,l,"Markdown",r,a==null?void 0:a.id);return!d.success&&d.errors.length>0&&console.warn(`[/start] Failed to send message: ${d.errors.join(" | ")}`),!0}case"/help":{const o=`🛠 *${(a==null?void 0:a.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`,l=await te(n,t,o,"Markdown",r,a==null?void 0:a.id);return!l.success&&l.errors.length>0&&console.warn(`[/help] Failed to send message: ${l.errors.join(" | ")}`),!0}case"/status":{if(!a){const i=await te(n,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app.","Markdown",r);return i.success||console.warn(`[/status] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const[i,o,l,d]=await Promise.all([r.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(a.id).first(),r.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(a.id).first(),r.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(a.id).first(),r.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(a.id).first()]),c=`📊 *System Status*

Active tasks: ${(i==null?void 0:i.cnt)||0}
Memories: ${(o==null?void 0:o.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(d==null?void 0:d.cnt)||0}

Status: ✅ Online`,m=await te(n,t,c,"Markdown",r,a.id);m.success||console.warn(`[/status] Failed to send message: ${m.errors.join(" | ")}`)}catch{const o=await te(n,t,"✅ Online — but had trouble fetching stats.","Markdown",r,a==null?void 0:a.id);o.success||console.warn(`[/status error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}case"/new":{if(!a){const o=await te(n,t,"⚠️ Account not linked.","Markdown",r);return o.success||console.warn(`[/new] Failed to send message: ${o.errors.join(" | ")}`),!0}await r.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(a.id).run();const i=await te(n,t,"🆕 Starting fresh conversation. Your next message begins a new thread.","Markdown",r,a.id);return i.success||console.warn(`[/new] Failed to send message: ${i.errors.join(" | ")}`),!0}case"/tasks":case"/task":{if(!a){const i=await te(n,t,"⚠️ Account not linked.","Markdown",r);return i.success||console.warn(`[/tasks] Failed to send message: ${i.errors.join(" | ")}`),!0}try{const o=(await r.prepare(`
          SELECT title, content, due_date, status
          FROM memory
          WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
          ORDER BY
            CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
            due_date ASC,
            importance DESC
          LIMIT 20
        `).bind(a.id).all()).results||[];if(o.length===0){const f=await te(n,t,"✅ No open tasks. You're all clear.","Markdown",r,a.id);return f.success||console.warn(`[/tasks] Failed to send message: ${f.errors.join(" | ")}`),!0}const l=new Date,d=l.toISOString().slice(0,10),c=new Date(l);c.setDate(c.getDate()+1);const m=c.toISOString().slice(0,10),h=[`📋 *Open Tasks (${o.length})*
`];for(const f of o){let _="";if(f.due_date){const y=f.due_date.slice(0,10);y<d?_=" ⚠️ _overdue_":y===d?_=" 🔴 _due today_":y===m?_=" 🟡 _due tomorrow_":_=` _${new Date(f.due_date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}_`}h.push(`☐ ${f.title}${_}`)}h.push(`
_Say "mark [task] as done" to close a task._`);const w=await te(n,t,h.join(`
`),"Markdown",r,a.id);w.success||console.warn(`[/tasks] Failed to send message: ${w.errors.join(" | ")}`)}catch(i){const o=await te(n,t,"❌ Could not fetch tasks: "+i.message,"Markdown",r,a==null?void 0:a.id);o.success||console.warn(`[/tasks error] Failed to send message: ${o.errors.join(" | ")}`)}return!0}default:return!1}}Dt.post("/webhook",async e=>{let t;try{t=await e.req.json()}catch{return e.json({ok:!0})}const n=e.env.DB,a={GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID},r=async()=>{var s,i,o,l,d;try{if(t.callback_query){await Is(n,t.callback_query);return}const c=t.message;if(!c)return;const m=!!c.text,h=!!c.voice,w=!!c.document,f=!!c.photo,_=!!c.caption;if(!m&&!h&&!w&&!f)return;const y=String(c.chat.id);let S=c.text||"";const E=await n.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(y).first();let R=null;if(E){const O=await n.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(E.id,"telegram_bot_token").first();O&&(R=await Y(O.encrypted_value,E.pin_hash))}if(!R){const O=await n.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c
         JOIN users u ON c.user_id = u.id
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();O&&(R=await Y(O.encrypted_value,O.pin_hash))}if(!R||S.startsWith("/")&&await Ns(S,y,R,E,n))return;if(!E){const O=await te(R,y,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${y}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`,"Markdown",n);O.success||console.warn(`Failed to send unlinked account message: ${O.errors.join(" | ")}`);return}if(c.voice&&R&&E)try{const O=await te(R,y,"🎤 Processing voice note...","Markdown",n,E.id);O.success||console.warn(`[voice start] Failed to send message: ${O.errors.join(" | ")}`);const u=await(await fetch(`https://api.telegram.org/bot${R}/getFile?file_id=${c.voice.file_id}`)).json();if(u.ok&&((s=u.result)!=null&&s.file_path)){const p=await(await fetch(`https://api.telegram.org/file/bot${R}/${u.result.file_path}`)).blob();let g="",b="",x="whisper-1";const T=await e.env.DB.prepare("SELECT service, encrypted_value FROM credentials WHERE user_id = ? AND (service IN ('llm_slot_1', 'llm_slot_2', 'llm_slot_3', 'openai'))").bind(E.id).all();for(const L of T.results){const F=await Y(L.encrypted_value,E.pin_hash);if(L.service==="openai"){g="https://api.openai.com/v1/audio/transcriptions",b=F;break}else if(L.service.startsWith("llm_slot_"))try{const J=JSON.parse(F);if(J.provider==="openai"){g="https://api.openai.com/v1/audio/transcriptions",b=J.apiKey;break}else if(J.provider==="groq"){g="https://api.groq.com/openai/v1/audio/transcriptions",b=J.apiKey,x="whisper-large-v3";break}}catch{}}if(!g){const L=await te(R,y,"⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys).","Markdown",n,E.id);L.success||console.warn(`[voice no stt] Failed to send message: ${L.errors.join(" | ")}`);return}const D=new FormData;D.append("file",p,"voice.ogg"),D.append("model",x),D.append("language","en");const I=await fetch(g,{method:"POST",headers:{Authorization:`Bearer ${b}`},body:D});if(!I.ok){const L=await I.text(),F=await te(R,y,`⚠️ Transcription failed: ${I.status} ${L}`,"Markdown",n,E.id);F.success||console.warn(`[voice transcription error] Failed to send message: ${F.errors.join(" | ")}`);return}S=(await I.json()).text;const C=await te(R,y,`🗣️ *You said:* ${S}`,"Markdown",n,E.id);C.success||console.warn(`[voice transcript echo] Failed to send message: ${C.errors.join(" | ")}`)}}catch(O){const U=await te(R,y,`⚠️ Failed to process voice note: ${O.message}`,"Markdown",n,E==null?void 0:E.id);U.success||console.warn(`[voice processing error] Failed to send message: ${U.errors.join(" | ")}`);return}if((w||f)&&R&&E)try{let O,U="unknown",u="unknown",v=0;if(w)O=c.document.file_id,U=c.document.file_name||"document",u=c.document.mime_type||"unknown",v=c.document.file_size||0;else if(f){const p=c.photo[c.photo.length-1];O=p.file_id,U="photo.jpg",u="image/jpeg",v=p.file_size||0}if(O){const g=await(await fetch(`https://api.telegram.org/bot${R}/getFile?file_id=${O}`)).json();let b="";if(g.ok&&((i=g.result)!=null&&i.file_path)&&(/\.(txt|csv|json|md|xml|html|log|yaml|yml|tsv|ini|cfg|conf|py|js|ts|sh|sql)$/i.test(U)||/^text\/|application\/json|application\/xml|application\/csv/i.test(u))&&v<5e4)try{b=await(await fetch(`https://api.telegram.org/file/bot${R}/${g.result.file_path}`)).text()}catch{}const x=c.caption||"",T=`[Telegram file received: "${U}" (${u}, ${Math.round(v/1024)}KB)]`;b?S=`${x?x+`

`:""}${T}
File contents:
${b.substring(0,8e3)}${b.length>8e3?`
[...truncated]`:""}`:S=`${x?x+`

`:""}${T}
Note: This file type cannot be read directly. I can see it was sent but cannot extract the content. For PDFs, images, or Office docs — suggest uploading to Google Drive via the web app where I can process them.`}}catch(O){if(_&&c.caption)S=c.caption;else{const U=await te(R,y,`⚠️ Received your file but couldn't process it: ${O.message}`,"Markdown",n,E==null?void 0:E.id);U.success||console.warn(`[file processing error] Failed to send message: ${U.errors.join(" | ")}`);return}}if(!S)return;Os(R,y).catch(()=>{});let N=await n.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(E.id).first();N?await n.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(N.id).run():N={id:(await n.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(E.id).run()).meta.last_row_id};const M=ks(E.id,E.username,S,y);M.metadata={thread_id:N.id};let W,H;try{const O=await ut(n,E.id,E.pin_hash);W=O.provider,H=O.rotation}catch(O){console.error("Telegram provider setup error:",O);const U=(o=O.message)!=null&&o.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(l=O.message)!=null&&l.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${O.message||"Unknown error"}`,u=await te(R,y,U,"Markdown",n,E.id);u.success||console.warn(`[provider error] Failed to send message: ${u.errors.join(" | ")}`);return}const{classifyIntentFast:$}=await Promise.resolve().then(()=>ms);if($(S).agent==="multi"){const O=await te(R,y,"🔍 On it…","Markdown",n,E.id);O.success||console.warn(`[ack] Failed to send: ${O.errors.join(" | ")}`)}const q=9e4;let z=!1;try{const O=await Promise.race([cn(M,n,W,E,H,a),new Promise((v,p)=>setTimeout(()=>p(new Error("TELEGRAM_TIMEOUT")),q))]),U=Ds(O,"telegram"),u=await te(R,y,U||"(empty response)","Markdown",n,E.id);if(await n.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(N.id).run().catch(()=>{}),z=u.success,!u.success){console.error(`[CRITICAL] Agent response failed to send to Telegram for user ${E.id}:`,u.errors);try{const{logError:v}=await Promise.resolve().then(()=>nt);await v(n,E.id,"telegram","response_send_failed",`Failed to deliver response: ${u.errors.join(" | ")}`)}catch{}}}catch(O){console.error("Telegram agent error:",O);const U=O.message==="TELEGRAM_TIMEOUT",u=U?`⏱️ This took longer than Telegram allows (25s limit).

For long essays, please use the web app — it handles long generation without time limits.`:(d=O.message)!=null&&d.includes("API error")?`⚠️ AI provider returned an error. The provider (${W.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(O.message||"Unknown").substring(0,200)}`,v=await te(R,y,u,"Markdown",n,E.id);z=v.success,v.success||console.error(`[CRITICAL] Error message failed to send to Telegram for user ${E.id}:`,v.errors);try{const{logError:p}=await Promise.resolve().then(()=>nt);await p(n,E.id,"telegram",U?"timeout":"agent_error",O.message||"Agent error",{provider:W.name})}catch{}}}catch(c){console.error("Telegram webhook error:",c);try{const{logError:m}=await Promise.resolve().then(()=>nt);await m(n,null,"telegram","webhook_error",c.message||"Unknown telegram error")}catch{}}};return e.executionCtx.waitUntil(r()),e.json({ok:!0})});Dt.post("/setup-webhook",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const{webhook_url:a}=await e.req.json(),r=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!r)return e.json({error:"Telegram bot token not configured in Settings"},400);const s=await Y(r.encrypted_value,n.pin_hash);if(!a){const c=await(await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(c)}const o=await(await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a,allowed_updates:["message"],drop_pending_updates:!1})})).json();return e.json(o)});Dt.get("/webhook-status",async e=>{var s,i,o,l,d,c;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!a)return e.json({configured:!1,error:"Bot token not set"});const r=await Y(a.encrypted_value,n.pin_hash);try{const h=await(await fetch(`https://api.telegram.org/bot${r}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((i=h.result)==null?void 0:i.url)||"",has_webhook:!!((o=h.result)!=null&&o.url),pending_updates:((l=h.result)==null?void 0:l.pending_update_count)||0,last_error:((d=h.result)==null?void 0:d.last_error_message)||"",last_error_date:((c=h.result)==null?void 0:c.last_error_date)||null})}catch(m){return e.json({configured:!0,error:m.message})}});Dt.post("/detect-chat-id",async e=>{var s,i;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const n=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!n)return e.json({error:"Invalid session"},401);const a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(n.user_id,"telegram_bot_token").first();if(!a)return e.json({error:"Bot token not configured"},400);const r=await Y(a.encrypted_value,n.pin_hash);try{const d=((i=(await(await fetch(`https://api.telegram.org/bot${r}/getWebhookInfo`)).json()).result)==null?void 0:i.url)||"";await fetch(`https://api.telegram.org/bot${r}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(y=>setTimeout(y,500));const m=await(await fetch(`https://api.telegram.org/bot${r}/getUpdates?limit=10&timeout=0`)).json();d&&await fetch(`https://api.telegram.org/bot${r}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:d,allowed_updates:["message"]})});const h=m.result||[];if(h.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const w=[],f=new Set;for(let y=h.length-1;y>=0;y--){const S=h[y].message;if(S&&S.chat){const E=String(S.chat.id);f.has(E)||(f.add(E),w.push({chat_id:E,name:[S.chat.first_name,S.chat.last_name].filter(Boolean).join(" ")||S.chat.title||"Unknown",username:S.chat.username||"",date:new Date((S.date||0)*1e3).toISOString()}))}}if(w.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const _=w[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(_,n.user_id).run(),e.json({found:!0,chat_id:_,name:w[0].name,all_chats:w,message:`Chat ID ${_} detected and saved to your profile.`})}catch(o){return e.json({error:`Detection failed: ${o.message}`},500)}});async function Is(e,t){var _;const{id:n,data:a,message:r,from:s}=t;if(!a||!r)return;const i=a.split(":");if(i[0]!=="briefing_toggle"||i.length<3)return;const o=i[1],l=parseInt(i[2]);if(!l||!o)return;const d=String(r.chat.id),c=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(d).first();if(!c)return;const m=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(c.id,l,o).first();if(!m)return;const h=m.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(h,h,m.id).run();const w=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(c.id).first();if(!w)return;const f=await Y(w.encrypted_value,w.pin_hash);try{const y=await fetch(`https://api.telegram.org/bot${f}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:n,text:h?"✅ Checked!":"☐ Unchecked"})});y.ok||console.warn(`[callback answer] Failed to answer callback: HTTP ${y.status}`)}catch(y){console.warn(`[callback answer] Error answering callback: ${y.message}`)}if((_=r.reply_markup)!=null&&_.inline_keyboard){const y=r.reply_markup.inline_keyboard.map(S=>S.map(E=>{var R;if((R=E.callback_data)!=null&&R.includes(o)){const N=h?"✅":"☐",M=E.text.replace(/^[☐✅]\s*/,"");return{...E,text:`${N} ${M}`}}return E}));try{await fetch(`https://api.telegram.org/bot${f}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d,message_id:r.message_id,reply_markup:{inline_keyboard:y}})})}catch{}}}function As(e){const t=new Date,n=new Date(t.toLocaleString("en-US",{timeZone:e})),a=new Date(n);a.setDate(a.getDate()+1),a.setHours(0,0,0,0);const r=new Date(a);r.setHours(23,59,59,999);const s=a.toISOString().split("T")[0];return{start:a.toISOString(),end:r.toISOString(),dateStr:s}}async function Ls(e,t,n,a,r,s){try{return(await new sn(e,t,n,a,r).listEvents("primary",{timeMin:s.start,timeMax:s.end,maxResults:50})).map(l=>{var d;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(d=l.attendees)==null?void 0:d.map(c=>c.displayName||c.email),source:"google"}})}catch(i){return console.error("Google Calendar fetch error:",i.message),[]}}async function Ms(e,t,n,a,r){try{const s=new ve(e,t,n,a,r),i=await s.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),o=await s.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const m of i){const h=m.from.split("<")[0].trim()||m.from;l[h]=(l[h]||0)+1}const d=Object.entries(l).sort(([,m],[,h])=>h-m).slice(0,5).map(([m])=>m),c=i.some(m=>m.subject.toLowerCase().includes("urgent")||m.subject.toLowerCase().includes("asap")||m.subject.toLowerCase().includes("immediately"));return{unreadCount:i.length,importantCount:o.length,topSenders:d,hasUrgent:c}}catch(s){return console.error("Gmail fetch error:",s.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function $s(e,t){try{const n=await e.prepare(`
      SELECT title, content, due_date
      FROM memory
      WHERE user_id = ? AND type = 'task' AND (status = 'open' OR status IS NULL)
      ORDER BY
        CASE WHEN due_date IS NOT NULL THEN 0 ELSE 1 END,
        due_date ASC,
        importance DESC
      LIMIT 10
    `).bind(t).all(),a=new Date,r=new Date(a);r.setDate(r.getDate()+1),r.setHours(23,59,59,999);const s=n.results||[],i=s.map(l=>{if(l.due_date){const d=new Date(l.due_date),c=d<=a?"overdue":d<=r?"due today":d.toLocaleDateString("en-GB",{day:"numeric",month:"short"});return`${l.title} [${c}]`}return l.title}),o=s.filter(l=>l.due_date?new Date(l.due_date)<=r:!1).length;return{pending:s.length,dueToday:o,items:i}}catch(n){return console.error("Tasks fetch error:",n.message),{pending:0,dueToday:0,items:[]}}}async function Bs(e,t){try{const n=Math.floor((Date.now()-1728e5)/1e3),a=`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(e)}&tags=story&hitsPerPage=5&numericFilters=created_at_i>${n},points>10`,r=await fetch(a,{headers:{"User-Agent":"Karna/1.0"}});return r.ok?((await r.json()).hits||[]).filter(i=>i.url&&!t.has(i.url)).slice(0,2).map(i=>({title:i.title,summary:`${i.points} pts · ${i.num_comments} comments on HN`,url:i.url,source:"news.ycombinator.com"})):[]}catch{return[]}}const Nn=["AI","LLM","Agentic","artificial intelligence","machine learning","Claude","GPT","Gemini"];async function js(e,t,n){const a=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],r=new Set;if(t&&n)try{((await t.prepare("SELECT url FROM briefing_seen_news WHERE user_id = ? AND seen_at > datetime('now', '-7 days')").bind(n).all()).results||[]).forEach(d=>r.add(d.url))}catch{}const s=[];if(a.some(l=>Nn.some(d=>l.toLowerCase().includes(d.toLowerCase())))){const l=a.find(c=>Nn.some(m=>c.toLowerCase().includes(m.toLowerCase())))||"AI agents",d=await Bs(l,r);for(const c of d)s.push(c),r.add(c.url)}for(const l of a){if(s.length>=8)break;const d=`latest ${l} news today`;try{const c=await Pt(d,{num:5});if(c.results)for(const m of c.results){if(s.length>=8)break;r.has(m.link)||(s.push({title:m.title,summary:m.snippet,url:m.link,source:m.displayLink}),r.add(m.link))}}catch(c){console.error(`News search error for "${d}":`,c.message)}}const o=s.slice(0,7);if(t&&n&&o.length>0)for(const l of o)try{await t.prepare("INSERT OR IGNORE INTO briefing_seen_news (user_id, url, title) VALUES (?, ?, ?)").bind(n,l.url,l.title).run()}catch{}return o}function Ps(e,t){const n=[];let a="20:00";{const[i,o]=t.split(":"),l=parseInt(i,10),d=o||"00",c=l>=12?"PM":"AM";a=`${l===0?12:l>12?l-12:l}:${d} ${c}`}n.push(`🗓 Your ${a} Brief — ${e.targetDate}`),n.push("");const r=e.calendar.totalCount;if(r>0){n.push(`📅 Tomorrow: ${r} event${r===1?"":"s"}`);for(const i of e.calendar.google.slice(0,5)){const o=i.startTime?new Date(i.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";n.push(`   • ${o} ${i.title}`)}}else n.push("📅 Tomorrow: Nothing scheduled");n.push("");const s=e.emails.gmail.unreadCount;if(s>0?(n.push(`📧 Gmail: ${s} unread`),e.emails.gmail.importantCount>0&&n.push(`   ★ ${e.emails.gmail.importantCount} marked important`),e.emails.gmail.hasUrgent&&n.push("   ⚠️ Urgent messages present"),e.emails.gmail.topSenders.length>0&&n.push(`   From: ${e.emails.gmail.topSenders.slice(0,3).join(", ")}`)):n.push("📧 Gmail: Inbox clear"),n.push(""),e.tasks.pending>0){n.push(`✅ Open Tasks (${e.tasks.pending}):`);for(const i of e.tasks.items)n.push(`   ☐ ${i}`)}else n.push("✅ Tasks: All clear");if(n.push(""),e.news.items.length>0){n.push("📡 Today's Signal:");for(const i of e.news.items){const o=i.source==="news.ycombinator.com"?"🟠 HN":`🔗 ${i.source}`;n.push(`   • ${i.title.substring(0,90)}${i.title.length>90?"…":""}`),n.push(`     ${o} — ${i.summary.substring(0,80)}${i.summary.length>80?"…":""}`)}}return n.join(`
`)}function Us(e){const t=[];let n=0;for(const a of e.calendar.google)t.push({type:"calendar",key:a.id,text:`${a.title} - ${new Date(a.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:a},sortOrder:n++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:n++});for(const a of e.tasks.items)t.push({type:"task",key:`task-${a}`,text:a,metadata:{},sortOrder:n++});for(const a of e.news.items)t.push({type:"news",key:`news-${a.url}`,text:`📰 ${a.title}`,metadata:{url:a.url,source:a.source},sortOrder:n++});return t}async function Hs(e,t){const n=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!n)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let a;try{const s=JSON.parse(n.components);a={google_calendar:s.google_calendar!==!1,gmail:s.gmail!==!1,tasks:s.tasks!==!1,news:s.news!==!1}}catch{a={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const r=n.news_topics?n.news_topics.split(",").map(s=>s.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:a,newsTopics:r}}async function Fa(e,t,n){var E,R;const a=t.timezone||"Asia/Kolkata",r=As(a),{components:s,newsTopics:i}=await Hs(e,t.id),o=[],l=[];s.google_calendar&&(o.push(Ls(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET,r)),l.push("googleEvents")),s.gmail&&(o.push(Ms(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),s.tasks&&(o.push($s(e,t.id)),l.push("tasks")),s.news&&(o.push(js(i,e,t.id)),l.push("news"));const d=await Promise.all(o),c={};l.forEach((N,M)=>{c[N]=d[M]});const m={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},h={pending:0,dueToday:0,items:[]},w={generatedAt:new Date().toISOString(),targetDate:r.dateStr,calendar:{google:c.googleEvents||[],totalCount:((E=c.googleEvents)==null?void 0:E.length)||0},emails:{gmail:c.gmailSummary||m},tasks:c.tasks||h,news:{items:c.news||[],fetchedAt:new Date().toISOString()},summary:""},f=((R=await e.prepare("SELECT briefing_time FROM briefing_preferences WHERE user_id = ?").bind(t.id).first())==null?void 0:R.briefing_time)||"20:00";w.summary=Ps(w,f);const _=Us(w),y=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(t.id,JSON.stringify(w)).first(),S=(y==null?void 0:y.id)||0;for(const N of _)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(S,N.type,N.key,N.text,JSON.stringify(N.metadata),N.sortOrder).run();return{briefingId:S,content:w,items:_}}async function Fs(e,t,n){const a=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(n,t).first();if(!a)return null;const r=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(n).all();return{briefing:{...a,content:JSON.parse(a.content_json||"{}")},items:r.results||[]}}async function Gs(e,t,n,a){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(n,t).first())return null;const s=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(a,n).first();if(!s)return null;const i=s.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(i,i,a,n).run(),{checked:i===1}}async function Ws(e,t,n=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.sent_at DESC
    LIMIT ?
  `).bind(t,n).all()).results||[]).map(r=>({...r,content:JSON.parse(r.content_json||"{}")}))}function Ga(e,t,n=new Date){const a=new Date(n.toLocaleString("en-US",{timeZone:t})),r=a.getHours(),s=a.getMinutes(),[i,o]=e.split(":").map(Number),l=r*60+s,d=i*60+o;return l===d}function Wa(e,t){const n=e.summary,a=[];for(const r of t.slice(0,10))a.push([{text:`☐ ${r.text.substring(0,40)}${r.text.length>40?"...":""}`,callback_data:`briefing_toggle:${r.key}`}]);return{text:n,inlineKeyboard:a}}const oe=new pe;async function qs(e,t){var r;if(e.req.path.includes("/cron/"))return t();const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",n),await t()}oe.use("/*",qs);oe.get("/briefings",async e=>{const t=e.get("user"),n=parseInt(e.req.query("limit")||"10");try{const a=await Ws(e.env.DB,t.id,n);return e.json({briefings:a})}catch(a){return e.json({error:a.message},500)}});oe.get("/briefings/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));try{const a=await Fs(e.env.DB,t.id,n);return a?e.json(a):e.json({error:"Briefing not found"},404)}catch(a){return e.json({error:a.message},500)}});oe.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),a=parseInt(e.req.param("itemId"));try{const r=await Gs(e.env.DB,t.id,n,a);return r?e.json(r):e.json({error:"Item not found"},404)}catch(r){return e.json({error:r.message},500)}});oe.post("/briefings/generate",async e=>{const t=e.get("user");try{const n=await Fa(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(n)}catch(n){return e.json({error:n.message},500)}});oe.get("/morning-briefing",async e=>{const t=e.get("user");try{const n=await Ka(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(n)}catch(n){return e.json({error:n.message},500)}});oe.get("/briefing-preferences",async e=>{const t=e.get("user");try{const n=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!n){const r={briefingTime:"20:00",briefingEnabled:!0,components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:r})}const a={briefingTime:n.briefing_time,briefingEnabled:n.briefing_enabled!==0,components:JSON.parse(n.components),newsTopics:n.news_topics.split(",").map(r=>r.trim()).filter(Boolean),notificationChannels:JSON.parse(n.notification_channels),proactiveLevel:n.proactive_level};return e.json({preferences:a})}catch(n){return e.json({error:n.message},500)}});oe.post("/briefing-preferences",async e=>{const t=e.get("user"),n=await e.req.json(),a=[];if(n.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(n.briefingTime)||a.push("Invalid time format. Use HH:MM (e.g., 20:00)")),n.newsTopics&&(n.newsTopics.length>5&&a.push("Maximum 5 news topics allowed"),n.newsTopics.some(r=>r.length>50)&&a.push("Each news topic must be 50 characters or less")),n.proactiveLevel&&!["conservative","moderate","aggressive"].includes(n.proactiveLevel)&&a.push("Invalid proactive level. Use conservative, moderate, or aggressive"),a.length>0)return e.json({error:a.join("; ")},400);try{const r=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),s=n.components?JSON.stringify(n.components):null,i=n.notificationChannels?JSON.stringify(n.notificationChannels):null,o=n.newsTopics?n.newsTopics.join(", "):null;if(r){const l=[],d=[];n.briefingTime!==void 0&&(l.push("briefing_time = ?"),d.push(n.briefingTime)),n.briefingEnabled!==void 0&&(l.push("briefing_enabled = ?"),d.push(n.briefingEnabled?1:0)),s!==null&&(l.push("components = ?"),d.push(s)),o!==null&&(l.push("news_topics = ?"),d.push(o)),i!==null&&(l.push("notification_channels = ?"),d.push(i)),n.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),d.push(n.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),d.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...d).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,n.briefingTime||"20:00",s||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',o||"AI, LLM, Tools, Agentic Workflows, AI Features",i||'{"telegram":true,"web":true}',n.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(r){return e.json({error:r.message},500)}});oe.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(n){return e.json({error:n.message},500)}});oe.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const a=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time,
             COALESCE(bp.briefing_enabled, 1) as briefing_enabled
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],s=new Date;for(const i of a.results||[]){if(!i.briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.briefing_time||"20:00";if(Ga(l,o,s))try{const d=await Fa(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});if(i.telegram_chat_id){const{text:c,inlineKeyboard:m}=Wa(d.content,d.items);await qa(e.env.DB,i,c,m,d.briefingId)}r.push({user_id:i.id,status:"success",briefing_id:d.briefingId,briefing_time:l,timezone:o})}catch(d){r.push({user_id:i.id,status:"error",error:d.message})}}return e.json({executed:r.length,results:r})}catch(a){return e.json({error:a.message},500)}});oe.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const a=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id IS NOT NULL").all(),r=[],s=new Date,i=new Date(s.getTime()+600*1e3).toISOString(),o=new Date(s.getTime()+900*1e3).toISOString();for(const l of a.results||[])try{const d=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!d)continue;const c=await Y(d.encrypted_value,l.pin_hash),h=JSON.parse(c).access_token;if(!h)continue;const w=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(s.toISOString())}&timeMax=${encodeURIComponent(o)}&maxResults=10`,{headers:{Authorization:`Bearer ${h}`}});if(!w.ok)continue;const _=((await w.json()).items||[]).filter(E=>{var N;const R=(N=E.start)==null?void 0:N.dateTime;return R?R>=s.toISOString()&&R<=i:!1});if(_.length===0){r.push({user_id:l.id,reminders_sent:0});continue}const y=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(l.id).first();if(!y)continue;const S=await Y(y.encrypted_value,l.pin_hash);for(const E of _){const R=new Date(E.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),N=E.location?`
📍 ${E.location}`:"",M=`⏰ Meeting in 10 minutes!

*${E.summary||"Untitled Event"}*
🕐 ${R}${N}`;await fetch(`https://api.telegram.org/bot${S}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l.telegram_chat_id,text:M,parse_mode:"Markdown"})})}r.push({user_id:l.id,reminders_sent:_.length})}catch(d){r.push({user_id:l.id,status:"error",error:d.message})}return e.json({executed:r.length,results:r})}catch(a){return e.json({error:a.message},500)}});oe.post("/cron/morning-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const a=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.morning_briefing_time, '08:00') as morning_briefing_time,
             COALESCE(bp.morning_briefing_enabled, 1) as morning_briefing_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],s=new Date;for(const i of a.results||[]){if(!i.morning_briefing_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.morning_briefing_time||"08:00";if(Ga(l,o,s))try{const d=await Ka(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});let c={telegram:!0,web:!0};try{c=JSON.parse(i.notification_channels||"{}")}catch{}if(c.telegram!==!1&&i.telegram_chat_id&&d.briefingId){const m=Ys(d.content);await za(e.env.DB,i,m),await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(d.briefingId).run()}r.push({user_id:i.id,status:"success",briefing_id:d.briefingId,briefing_time:l,timezone:o})}catch(d){r.push({user_id:i.id,status:"error",error:d.message})}}return e.json({executed:r.length,results:r})}catch(a){return e.json({error:a.message},500)}});oe.post("/cron/email-digest",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const a=await e.env.DB.prepare(`
      SELECT u.*, bp.components
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[];for(const s of a.results||[]){let i={};try{i=JSON.parse(s.components||"{}")}catch{}if(i.email_digest!==!1)try{const o=await Ya(e.env.DB,s,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),l=`Email Digest — ${new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}`,d=JSON.stringify(o,null,2),c=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'email_digest', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(s.id,l,d,`email_digest_${Date.now()}`,null,null,null).first();r.push({user_id:s.id,status:"success",action_item_id:c==null?void 0:c.id,digest:o})}catch(o){r.push({user_id:s.id,status:"error",error:o.message})}}return e.json({executed:r.length,results:r})}catch(a){return e.json({error:a.message},500)}});oe.post("/cron/weekly-review",async e=>{const t=e.req.header("X-Cron-Secret")||"",n=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==n)return e.json({error:"Unauthorized"},401);try{const a=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.weekly_review_day_time, 'Sunday 20:00') as weekly_review_day_time,
             COALESCE(bp.weekly_review_enabled, 1) as weekly_review_enabled,
             bp.notification_channels
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),r=[],s=new Date;for(const i of a.results||[]){if(!i.weekly_review_enabled)continue;const o=i.timezone||"Asia/Kolkata",l=i.weekly_review_day_time||"Sunday 20:00";if(zs(l,o,s))try{const d=await Ks(e.env.DB,i,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET}),c=`Weekly Review — Week of ${new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})}`,m=JSON.stringify(d,null,2),h=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
           VALUES (?, 'weekly_review', ?, ?, 'normal', 'proactive', ?, ?, ?) RETURNING id`).bind(i.id,c,m,`weekly_review_${Date.now()}`,null,null,null).first();let w={telegram:!0,web:!0};try{w=JSON.parse(i.notification_channels||"{}")}catch{}if(w.telegram!==!1&&i.telegram_chat_id){const f=Js(d);await za(e.env.DB,i,f)}r.push({user_id:i.id,status:"success",action_item_id:h==null?void 0:h.id})}catch(d){r.push({user_id:i.id,status:"error",error:d.message})}}return e.json({executed:r.length,results:r})}catch(a){return e.json({error:a.message},500)}});async function qa(e,t,n,a,r){try{const s=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!s)return;const i=await Y(s.encrypted_value,s.pin_hash);if(!(await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n,parse_mode:"Markdown",reply_markup:{inline_keyboard:a.map(d=>d.map(c=>({...c,callback_data:`${c.callback_data}:${r}`})))}})})).json()).ok){const c=await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n.replace(/[_*[`\]]/g,""),reply_markup:{inline_keyboard:a.map(m=>m.map(h=>({...h,callback_data:`${h.callback_data}:${r}`})))}})})).json();if(!c.ok){console.error("Telegram briefing send failed:",c.description,"chat_id:",t.telegram_chat_id);return}}await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(r).run()}catch(s){console.error("Telegram briefing error:",s.message)}}async function za(e,t,n){try{const a=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!a)return;const r=await Y(a.encrypted_value,a.pin_hash);(await fetch(`https://api.telegram.org/bot${r}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n.substring(0,4e3),parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${r}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:n.substring(0,4e3).replace(/[_*[`\]]/g,"")})})}catch(a){console.error("Telegram plain text error:",a.message)}}async function Ka(e,t,n){const a=new Date;a.setHours(0,0,0,0);const r=new Date;r.setHours(23,59,59,999);const s=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 
    AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,a.toISOString(),r.toISOString()).all(),i=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 10
  `).bind(t.id).all(),o=await Ya(e,t,n);let l=[];try{const h=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first();if(h){const w=await Y(h.encrypted_value,t.pin_hash),_=JSON.parse(w).access_token;if(_){const y=a.toISOString(),S=r.toISOString(),E=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(y)}&timeMax=${encodeURIComponent(S)}&maxResults=20`,{headers:{Authorization:`Bearer ${_}`}});E.ok&&(l=((await E.json()).items||[]).map(N=>{var M,W,H,$;return{title:N.summary||"Untitled",startTime:((M=N.start)==null?void 0:M.dateTime)||((W=N.start)==null?void 0:W.date),endTime:((H=N.end)==null?void 0:H.dateTime)||(($=N.end)==null?void 0:$.date)}}))}}}catch{}const d={generatedAt:new Date().toISOString(),type:"morning",todayReminders:(s.results||[]).map(h=>({name:h.name,description:h.description,next_run:h.next_run})),pendingActions:(i.results||[]).map(h=>({title:h.title,priority:h.priority})),emailDigest:o,calendarEvents:l},c=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'morning', ?, 'all')
    RETURNING id
  `).bind(t.id,JSON.stringify(d)).first();return{briefingId:(c==null?void 0:c.id)||0,content:d}}async function Ya(e,t,n){const a={unreadCount:0,recent:[]},r={message:"",recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const i=new ve(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET),o=await i.getUnreadCount(),l=await i.listMessages({maxResults:10,labelIds:["INBOX"]});a.unreadCount=o,a.recent=l.map(d=>({id:d.id,subject:d.subject,from:d.from,snippet:d.snippet,isUnread:d.isUnread}))}}catch(s){a.error=s.message}try{const s=await e.prepare("SELECT name, encrypted_blob FROM site_credentials WHERE user_id = ? AND (name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE OR name LIKE ? COLLATE NOCASE) LIMIT 1").bind(t.id,"%Outlook%","%Microsoft%","%Office 365%").first();if(!s)r.message="No Outlook credentials saved in Secret Vault. Add them in Settings → Secret Vault.";else{const i=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,"browser_use_api_key").first();if(!i)r.message="Browser Use API key not configured. Add it in Settings → API Keys → Browser Use API Key.";else{const o=(await Y(i.encrypted_value,t.pin_hash)).trim(),l=JSON.parse(await Y(s.encrypted_blob,t.pin_hash)),d=await Ra("Go to https://outlook.live.com or https://outlook.office.com. Log in with username {username} and password {password} if prompted. Navigate to the inbox and extract the 10 most recent emails with sender, subject, date, and snippet. Return the results as structured text.",o,{secrets:{username:l.username,password:l.password},timeoutMs:88e3});d.status==="completed"&&d.output?r.recent=d.output:d.status==="timeout"?r.message="Outlook browser task timed out.":r.message="Outlook returned no content."}}}catch(s){r.message=`Outlook error: ${s.message}`}return{gmail:a,outlook:r}}function zs(e,t,n=new Date){const a=new Date(n.toLocaleString("en-US",{timeZone:t})),r=a.toLocaleDateString("en-US",{weekday:"long"}),s=a.getHours(),i=a.getMinutes(),o=e.trim().split(" "),l=o[o.length-1],d=o.slice(0,o.length-1).join(" "),[c,m]=l.split(":").map(Number),h=s*60+i,w=c*60+m;return r===d&&h===w}async function Ks(e,t,n){const a=new Date,r=new Date(a.getTime()-10080*60*1e3),s=new Date(a.getTime()+10080*60*1e3),i=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND state = 'completed' AND last_run >= ?
    ORDER BY last_run DESC
  `).bind(t.id,r.toISOString()).all(),o=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run < ?
    ORDER BY next_run DESC
  `).bind(t.id,a.toISOString()).all(),l=await e.prepare(`
    SELECT * FROM action_items 
    WHERE user_id = ? AND status = 'pending'
    ORDER BY priority DESC, created_at DESC
    LIMIT 15
  `).bind(t.id).all(),d=await e.prepare(`
    SELECT * FROM document_library 
    WHERE user_id = ? AND created_at >= ?
    ORDER BY created_at DESC
    LIMIT 10
  `).bind(t.id,r.toISOString()).all(),c=await e.prepare(`
    SELECT * FROM cron_jobs 
    WHERE user_id = ? AND enabled = 1 AND next_run >= ? AND next_run <= ?
    ORDER BY next_run ASC
  `).bind(t.id,a.toISOString(),s.toISOString()).all();let m={unreadCount:0,recent:[]};try{if(await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t.id).first()){const w=new ve(e,t.id,t.pin_hash,n.GOOGLE_CLIENT_ID,n.GOOGLE_CLIENT_SECRET),f=await w.getUnreadCount(),_=await w.listMessages({maxResults:10,labelIds:["INBOX"]});m={unreadCount:f,recent:_.map(y=>({subject:y.subject,from:y.from,snippet:y.snippet}))}}}catch{}return{generatedAt:a.toISOString(),period:{start:r.toISOString(),end:a.toISOString()},completedTasks:(i.results||[]).map(h=>({name:h.name,last_run:h.last_run})),missedTasks:(o.results||[]).map(h=>({name:h.name,next_run:h.next_run})),openActions:(l.results||[]).map(h=>({title:h.title,priority:h.priority,status:h.status})),recentDocuments:(d.results||[]).map(h=>({name:h.name,status:h.status,created_at:h.created_at})),upcomingTasks:(c.results||[]).map(h=>({name:h.name,next_run:h.next_run})),gmailSummary:m}}function Ys(e){const t=[];t.push("☀️ Morning Briefing"),t.push("");const n=e.todayReminders||[];if(n.length>0){t.push(`📋 Today (${n.length}):`);for(const l of n){const d=l.next_run?new Date(l.next_run).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${d} ${l.name}`)}}else t.push("📋 Today: No scheduled reminders");t.push("");const a=e.pendingActions||[];if(a.length>0){t.push(`🔔 Pending Actions (${a.length}):`);for(const l of a.slice(0,5))t.push(`   • ${l.title} (${l.priority})`)}else t.push("🔔 Pending Actions: None");t.push("");const r=e.emailDigest||{},s=r.gmail||{};s.unreadCount>0?t.push(`📧 Gmail: ${s.unreadCount} unread`):t.push("📧 Gmail: Inbox clear");const i=r.outlook||{};typeof i.recent=="string"&&i.recent.length>0?t.push("📧 Outlook: see digest"):i.message&&t.push(`📧 Outlook: ${i.message}`),t.push("");const o=e.calendarEvents||[];if(o.length>0){t.push(`📅 Calendar (${o.length}):`);for(const l of o.slice(0,5)){const d=l.startTime?new Date(l.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${d} ${l.title}`)}}return t.join(`
`)}function Js(e){const t=[];t.push("📊 Weekly Review"),t.push("");const n=e.completedTasks||[];t.push(`✅ Completed: ${n.length}`);const a=e.missedTasks||[];t.push(`❌ Missed/Overdue: ${a.length}`);const r=e.openActions||[];t.push(`🔔 Open Actions: ${r.length}`),t.push("");const s=e.recentDocuments||[];s.length>0&&t.push(`📄 Documents: ${s.length} this week`);const i=e.upcomingTasks||[];i.length>0&&t.push(`📅 Upcoming: ${i.length} in next 7 days`);const o=e.gmailSummary||{};return o.unreadCount>0&&t.push(`📧 Gmail Unread: ${o.unreadCount}`),t.join(`
`)}oe.post("/briefings/:id/resend",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));try{const a=await e.env.DB.prepare("SELECT * FROM briefings WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!a)return e.json({error:"Briefing not found"},404);const r=JSON.parse(a.content||"{}"),s=await e.env.DB.prepare("SELECT * FROM briefing_items WHERE briefing_id = ?").bind(n).all(),{text:i,inlineKeyboard:o}=Wa(r,s.results||[]);await e.env.DB.prepare("UPDATE briefings SET delivered_telegram = 0 WHERE id = ?").bind(n).run(),await qa(e.env.DB,t,i,o,n);const l=await e.env.DB.prepare("SELECT delivered_telegram FROM briefings WHERE id = ?").bind(n).first();return l!=null&&l.delivered_telegram?e.json({success:!0,message:"Briefing sent to Telegram"}):e.json({error:"Telegram send failed — check bot token and chat ID in Settings"},500)}catch(a){return e.json({error:a.message},500)}});oe.delete("/briefings/:id",async e=>{const t=e.get("user"),n=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});const Je=new pe;async function Vs(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",n),await t()}Je.use("/*",Vs);function Ja(e){return e.toLowerCase().replace(/[^a-z0-9\s_-]/g,"").replace(/\s+/g,"_").replace(/_+/g,"_").substring(0,50).replace(/^_|_$/g,"")}Je.get("/",async e=>{const t=e.get("user"),n=await e.env.DB.prepare(`SELECT id, name, slug, description, instructions, parameters, required_tools, examples, enabled, usage_count, last_used_at, created_at, updated_at
     FROM user_skills WHERE user_id = ? ORDER BY created_at DESC`).bind(t.id).all();return e.json({skills:n.results||[]})});Je.post("/",async e=>{var d,c,m;const t=e.get("user"),n=await e.req.json();if(!((d=n.name)!=null&&d.trim()))return e.json({error:"name is required"},400);if(!((c=n.description)!=null&&c.trim()))return e.json({error:"description is required"},400);if(!((m=n.instructions)!=null&&m.trim()))return e.json({error:"instructions is required"},400);let a=Ja(n.name);a||(a=`skill_${Date.now()}`);const r=await e.env.DB.prepare("SELECT slug FROM user_skills WHERE user_id = ? AND slug LIKE ?").bind(t.id,`${a}%`).all();r.results&&r.results.length>0&&r.results.map(w=>w.slug).includes(a)&&(a=`${a}_${r.results.length+1}`);const s=JSON.stringify(n.parameters||{}),i=JSON.stringify(n.required_tools||[]),o=JSON.stringify(n.examples||[]),l=await e.env.DB.prepare(`INSERT INTO user_skills (user_id, name, slug, description, instructions, parameters, required_tools, examples)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,n.name.trim(),a,n.description.trim(),n.instructions.trim(),s,i,o).first();return e.json({skill:l,created:!0})});Je.get("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(isNaN(n))return e.json({error:"Invalid skill ID"},400);const a=await e.env.DB.prepare("SELECT * FROM user_skills WHERE id = ? AND user_id = ?").bind(n,t.id).first();return a?e.json({skill:a}):e.json({error:"Skill not found"},404)});Je.put("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));if(isNaN(n))return e.json({error:"Invalid skill ID"},400);const a=await e.req.json(),r=[],s=[];return a.name!==void 0&&(r.push("name = ?","slug = ?"),s.push(a.name.trim(),Ja(a.name))),a.description!==void 0&&(r.push("description = ?"),s.push(a.description.trim())),a.instructions!==void 0&&(r.push("instructions = ?"),s.push(a.instructions.trim())),a.parameters!==void 0&&(r.push("parameters = ?"),s.push(JSON.stringify(a.parameters))),a.required_tools!==void 0&&(r.push("required_tools = ?"),s.push(JSON.stringify(a.required_tools))),a.examples!==void 0&&(r.push("examples = ?"),s.push(JSON.stringify(a.examples))),a.enabled!==void 0&&(r.push("enabled = ?"),s.push(a.enabled?1:0)),r.length===0?e.json({error:"Nothing to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),s.push(n,t.id),await e.env.DB.prepare(`UPDATE user_skills SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),e.json({success:!0}))});Je.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return isNaN(n)?e.json({error:"Invalid skill ID"},400):(await e.env.DB.prepare("DELETE FROM user_skills WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0}))});const Be=new pe;async function Zs(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",n),await t()}Be.use("/*",Zs);function Xs(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}function Va(e){const t=Xs(e),n=new Date(t);n.setDate(n.getDate()+1),n.setHours(9,0,0,0);const a=new Date(n.toLocaleString("en-US",{timeZone:"UTC"})),r=new Date(n.toLocaleString("en-US",{timeZone:e})),s=a.getTime()-r.getTime();return new Date(n.getTime()+s)}function un(e){if(!e)return null;if(e.startsWith("cron:")){const t=parseInt(e.replace("cron:",""),10);return isNaN(t)?null:t}return null}Be.put("/notifications/:id/done",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),a=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!a)return e.json({error:"Notification not found"},404);await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(n,t.id).run();const r=un(a.source);return r&&await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});Be.post("/notifications/:id/snooze",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),a=await e.req.json(),r=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!r)return e.json({error:"Notification not found"},404);let s;if(typeof a.minutes=="number")s=new Date(Date.now()+a.minutes*60*1e3);else if(a.until==="tomorrow_morning")s=Va(t.timezone||"UTC");else if(a.new_time)s=new Date(a.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(s.getTime()))return e.json({error:"Invalid time"},400);const i=s.toISOString(),o=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,r.title,r.body,"once",i,"reminder",JSON.stringify({description:r.body||""}),i,1,"active").first();return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0,job_id:o==null?void 0:o.id})});Be.post("/notifications/:id/reschedule",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),{new_time:a}=await e.req.json();if(!a)return e.json({error:"new_time is required"},400);const r=new Date(a);if(isNaN(r.getTime()))return e.json({error:"Invalid time"},400);const s=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!s)return e.json({error:"Notification not found"},404);const i=r.toISOString(),o=un(s.source);if(o)return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,o,t.id).run(),e.json({success:!0,job_id:o});const l=await e.env.DB.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, enabled, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,s.title,s.body,"once",i,"reminder",JSON.stringify({description:s.body||""}),i,1,"active").first();return e.json({success:!0,job_id:l==null?void 0:l.id})});Be.delete("/notifications/:id/cancel",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),a=await e.env.DB.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!a)return e.json({error:"Notification not found"},404);const r=un(a.source);return r&&await e.env.DB.prepare("UPDATE cron_jobs SET enabled = 0, state = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});Be.post("/reminders/:id/snooze",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),a=await e.req.json();if(!await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first())return e.json({error:"Reminder not found"},404);let s;if(typeof a.minutes=="number")s=new Date(Date.now()+a.minutes*60*1e3);else if(a.until_tomorrow_9am)s=Va(t.timezone||"UTC");else if(a.new_time)s=new Date(a.new_time);else return e.json({error:"Invalid snooze parameters"},400);if(isNaN(s.getTime()))return e.json({error:"Invalid time"},400);const i=s.toISOString();return await e.env.DB.prepare("UPDATE cron_jobs SET next_run = ?, schedule_value = ?, state = 'active', enabled = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(i,i,n,t.id).run(),e.json({success:!0})});Be.post("/reminders/:id/done",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE id = ? AND user_id = ?").bind(n,t.id).first()?(await e.env.DB.prepare("UPDATE cron_jobs SET state = 'completed', enabled = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(n,t.id).run(),await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE source = ? AND user_id = ?").bind(`cron:${n}`,t.id).run(),e.json({success:!0})):e.json({error:"Reminder not found"},404)});const _e=new pe;async function Qs(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",n),await t()}_e.use("/*",Qs);_e.get("/",async e=>{const t=e.get("user"),[n,a,r,s,i,o,l,d,c,m,h,w,f]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status = 'pending'").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status = 'running'").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status = 'failed'").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status = 'completed'").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ? AND status = 'needs_approval'").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM action_items WHERE user_id = ?").bind(t.id).first(),e.env.DB.prepare("SELECT type, COUNT(*) as cnt FROM action_items WHERE user_id = ? GROUP BY type").bind(t.id).all(),e.env.DB.prepare(`SELECT * FROM action_items WHERE user_id = ? AND (status IN ('pending', 'running', 'needs_approval') OR date(due_at) = date('now'))
       ORDER BY CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END, due_at ASC LIMIT 50`).bind(t.id).all(),e.env.DB.prepare(`SELECT * FROM action_items WHERE user_id = ? AND status = 'pending'
       ORDER BY CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END, due_at ASC LIMIT 50`).bind(t.id).all(),e.env.DB.prepare(`SELECT * FROM action_items WHERE user_id = ? AND status = 'needs_approval'
       ORDER BY CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END, due_at ASC LIMIT 50`).bind(t.id).all(),e.env.DB.prepare(`SELECT * FROM action_items WHERE user_id = ? AND status IN ('completed', 'cancelled', 'failed')
       ORDER BY updated_at DESC LIMIT 20`).bind(t.id).all(),e.env.DB.prepare(`SELECT id, name as title, description as body, 'reminder' as type, 'pending' as status, 'normal' as priority, next_run as due_at,
              'cron' as source, CAST(id as TEXT) as source_id, schedule_type, schedule_value
       FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND state IN ('active', 'reminding') AND next_run >= datetime('now')
       ORDER BY next_run ASC LIMIT 50`).bind(t.id).all(),e.env.DB.prepare(`SELECT id, name as title, description as body, 'reminder' as type, 'pending' as status, 'high' as priority, next_run as due_at,
              'cron' as source, CAST(id as TEXT) as source_id, schedule_type, schedule_value
       FROM cron_jobs WHERE user_id = ? AND enabled = 1 AND state IN ('active', 'reminding') AND next_run < datetime('now')
       ORDER BY next_run ASC LIMIT 50`).bind(t.id).all()]),_={};for(const R of l.results||[])_[R.type]=R.cnt;const y=[...w.results||[],...f.results||[]],E=[...d.results||[]];for(const R of y)E.some(M=>M.source==="cron"&&M.source_id===String(R.id))||E.push(R);return E.sort((R,N)=>{const M=R.due_at?new Date(R.due_at).getTime():1/0,W=N.due_at?new Date(N.due_at).getTime():1/0;return M-W}),e.json({counts:{pending:((n==null?void 0:n.cnt)||0)+y.length,running:(a==null?void 0:a.cnt)||0,failed:(r==null?void 0:r.cnt)||0,completed:(s==null?void 0:s.cnt)||0,needs_approval:(i==null?void 0:i.cnt)||0,total:((o==null?void 0:o.cnt)||0)+y.length},by_type:_,today:E.slice(0,50),pending:[...c.results||[],...y.filter(R=>R.next_run&&new Date(R.next_run)>=new Date)].slice(0,50),needs_approval:m.results||[],recent_activity:h.results||[],cron_jobs_count:y.length})});_e.get("/pending",async e=>{const t=e.get("user"),n=e.req.query("type"),a=parseInt(e.req.query("limit")||"50");let r="SELECT * FROM action_items WHERE user_id = ? AND status IN ('pending', 'needs_approval')";const s=[t.id];n&&(r+=" AND type = ?",s.push(n)),r+=" ORDER BY CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END, due_at ASC LIMIT ?",s.push(a);const i=await e.env.DB.prepare(r).bind(...s).all();return e.json({items:i.results||[]})});_e.post("/:id/complete",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare(`UPDATE action_items SET status = 'completed', completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`).bind(n,t.id).run(),e.json({success:!0})});_e.post("/:id/cancel",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare(`UPDATE action_items SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`).bind(n,t.id).run(),e.json({success:!0})});_e.post("/:id/retry",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare(`UPDATE action_items SET status = 'pending', updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ? AND status = 'failed'`).bind(n,t.id).run(),e.json({success:!0})});_e.post("/:id/approve",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare(`UPDATE action_items SET status = 'pending', updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ? AND status = 'needs_approval'`).bind(n,t.id).run(),e.json({success:!0})});_e.post("/",async e=>{const t=e.get("user"),n=await e.req.json();if(!n.title||typeof n.title!="string")return e.json({error:"Title is required"},400);const a=await e.env.DB.prepare(`INSERT INTO action_items (user_id, type, title, body, priority, source, source_id, action_payload, due_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`).bind(t.id,n.type||"manual",n.title,n.body||null,n.priority||"normal",n.source||null,n.source_id||null,n.action_payload||null,n.due_at||null).first();return e.json({success:!0,id:a==null?void 0:a.id})});_e.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM action_items WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});const je=new pe;async function ei(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",n),await t()}je.use("/*",ei);je.get("/",async e=>{const t=e.get("user"),n=e.req.query("status"),a=e.req.query("search"),r=["user_id = ?"],s=[t.id];n&&(r.push("status = ?"),s.push(n)),a&&(r.push("(name LIKE ? OR summary LIKE ?)"),s.push(`%${a}%`,`%${a}%`));const i=`SELECT * FROM document_library WHERE ${r.join(" AND ")} ORDER BY created_at DESC`,o=await e.env.DB.prepare(i).bind(...s).all();return e.json({documents:o.results||[]})});je.get("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),a=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return a?e.json({document:a}):e.json({error:"Document not found"},404)});je.post("/",async e=>{const t=e.get("user"),n=await e.req.json();if(!n.name||typeof n.name!="string")return e.json({error:"name is required"},400);const a=n.source||"upload",r=n.mime_type||"application/octet-stream",s=typeof n.size=="number"?n.size:0,i=await e.env.DB.prepare(`INSERT INTO document_library (user_id, name, source, file_id, drive_file_id, mime_type, size, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`).bind(t.id,n.name,a,n.file_id||null,n.drive_file_id||null,r,s,"uploaded").first();return e.json({success:!0,document:i})});je.post("/:id/summarize",async e=>{var d;const t=e.get("user"),n=parseInt(e.req.param("id")),a=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();if(!a)return e.json({error:"Document not found"},404);let r=null;if(a.file_id){const c=await e.env.DB.prepare("SELECT extracted_text FROM uploaded_files WHERE id = ? AND user_id = ?").bind(a.file_id,t.id).first();r=(c==null?void 0:c.extracted_text)||null}let s=null;if(r)try{const{provider:c}=await ut(e.env.DB,t.id,t.pin_hash);s=((d=(await c.chat([{role:"system",content:"You are a helpful assistant that summarizes documents concisely."},{role:"user",content:`Summarize the following document in a few paragraphs:

${r.substring(0,8e3)}`}],{maxTokens:1024})).content)==null?void 0:d.trim())||null}catch{s=null}const i=s||"Summary not yet generated. Ask Karna in chat to summarize this document.";await e.env.DB.prepare("UPDATE document_library SET status = ?, summary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("summarized",i,n,t.id).run();const l=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return e.json({success:!0,document:l})});je.delete("/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).run(),e.json({success:!0})});je.post("/:id/parse",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));await e.env.DB.prepare("UPDATE document_library SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind("parsed",n,t.id).run();const a=await e.env.DB.prepare("SELECT * FROM document_library WHERE id = ? AND user_id = ?").bind(n,t.id).first();return e.json({success:!0,document:a})});const we=new pe;async function ti(e,t){var r;const n=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");if(!n)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(n).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",n),await t()}we.use("/*",ti);we.get("/review",async e=>{const t=e.get("user"),n=e.req.query("tier"),a=e.req.query("type"),r=e.req.query("search"),s=parseInt(e.req.query("limit")||"50");let i="SELECT * FROM memory WHERE user_id = ?";const o=[t.id];n&&(i+=" AND tier = ?",o.push(n)),a&&(i+=" AND type = ?",o.push(a)),r&&(i+=" AND (title LIKE ? OR content LIKE ?)",o.push(`%${r}%`,`%${r}%`)),i+=" ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?",o.push(s);const l=await e.env.DB.prepare(i).bind(...o).all(),d=await e.env.DB.prepare("SELECT tier, COUNT(*) as cnt FROM memory WHERE user_id = ? GROUP BY tier").bind(t.id).all(),c={working:0,long_term:0};for(const m of d.results||[])c[m.tier]=m.cnt;return e.json({memories:l.results||[],tier_counts:c})});we.put("/review/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),a=await e.req.json(),r=[],s=[];return a.title!==void 0&&(r.push("title = ?"),s.push(a.title)),a.content!==void 0&&(r.push("content = ?"),s.push(a.content)),a.importance!==void 0&&(r.push("importance = ?"),s.push(a.importance)),a.tier!==void 0&&(r.push("tier = ?"),s.push(a.tier)),r.length===0?e.json({error:"Nothing to update"},400):(r.push("updated_at = CURRENT_TIMESTAMP"),s.push(n,t.id),await e.env.DB.prepare(`UPDATE memory SET ${r.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),e.json({success:!0}))});we.post("/review/:id/promote",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new K(e.env.DB).promote(n,t.id),e.json({success:!0})});we.post("/review/:id/demote",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new K(e.env.DB).demote(n,t.id),e.json({success:!0})});we.delete("/review/:id",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await new K(e.env.DB).remove(n,t.id),e.json({success:!0})});we.get("/suggestions",async e=>{const t=e.get("user"),n=e.req.query("status")||"pending",a=parseInt(e.req.query("limit")||"50"),r=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT ?").bind(t.id,n,a).all();return e.json({suggestions:r.results||[]})});we.post("/suggestions/:id/accept",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id")),a=await e.env.DB.prepare("SELECT * FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(n,t.id).first();return a?(await new K(e.env.DB).store(t.id,a.type,a.title,a.content,a.importance,"long_term"),await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'accepted', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});we.post("/suggestions/:id/reject",async e=>{const t=e.get("user"),n=parseInt(e.req.param("id"));return await e.env.DB.prepare("SELECT id FROM memory_suggestions WHERE id = ? AND user_id = ? AND status = 'pending'").bind(n,t.id).first()?(await e.env.DB.prepare("UPDATE memory_suggestions SET status = 'rejected', decided_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n).run(),e.json({success:!0})):e.json({error:"Suggestion not found or already decided"},404)});we.post("/suggestions",async e=>{const t=e.get("user"),{type:n,title:a,content:r,importance:s,source_message_id:i}=await e.req.json();if(!n||!a||!r)return e.json({error:"type, title, and content are required"},400);const o=await e.env.DB.prepare("INSERT INTO memory_suggestions (user_id, type, title, content, importance, status, source_message_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id").bind(t.id,n,a,r,s??5,"pending",i||null).first();return e.json({success:!0,id:o==null?void 0:o.id})});const de=new pe;de.use("/api/*",Mr());de.route("/api/auth",$e);de.route("/api/chat",ne);de.route("/api/settings",Z);de.route("/api/system",Oe);de.route("/api/telegram",Dt);de.route("/api/proactive",oe);de.route("/api/skills",Je);de.route("/api/notifications",Be);de.route("/api/action-center",_e);de.route("/api/documents",je);de.route("/api/memory",we);de.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),n=t.searchParams.get("code"),a=t.searchParams.get("state"),r=t.searchParams.get("error");if(r)return e.html(Xe(!1,`Google denied access: ${r}`));if(!n||!a)return e.html(Xe(!1,"Missing authorization code or state parameter."));try{const i=JSON.parse(atob(a)).sessionId;if(!i)return e.html(Xe(!1,"Invalid state parameter — missing session."));const o=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(i).first();if(!o)return e.html(Xe(!1,"Session expired. Please log in again and retry."));const l=o.user_id,d=o.pin_hash,c=`${t.protocol}//${t.host}/auth/google/callback`,m=await pa(e.env.DB,l,d,n,c,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(Xe(!0,`Connected as ${m.email}`,m.email))}catch(s){return e.html(Xe(!1,`OAuth failed: ${s.message}`))}});de.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(ea())));de.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(ea())));function Xe(e,t,n){return`<!DOCTYPE html>
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
</body></html>`}async function ni(e,t,n){const a="https://karna-5xs.pages.dev",s={"Content-Type":"application/json","X-Cron-Secret":t.CRON_SECRET||"karna-cron-default-v1"};try{const o=await(await fetch(`${a}/api/system/cron/execute`,{method:"POST",headers:s})).json();if(o.results&&o.results.length>0){const d=o.results.filter(m=>m.needs_agent&&m.status==="dispatched");if(d.length>0){const m=d.map(h=>fetch(`${a}/api/system/cron/run-task/${h.job_id}`,{method:"POST",headers:s}).then(w=>w.json()).catch(w=>({job_id:h.job_id,error:w.message})));n.waitUntil(Promise.allSettled(m).then(h=>{console.log(`Cron: ${o.executed} dispatched, ${d.length} agent tasks`,JSON.stringify(h.map(w=>w.status==="fulfilled"?w.value:w.reason)))}))}const c=o.results.filter(m=>!m.needs_agent&&m.status==="dispatched");if(c.length>0){const m=c.map(h=>fetch(`${a}/api/system/cron/run-task/${h.job_id}`,{method:"POST",headers:s}).catch(()=>{}));n.waitUntil(Promise.allSettled(m))}}n.waitUntil(fetch(`${a}/api/proactive/cron/evening-briefing`,{method:"POST",headers:s}).then(d=>d.json()).then(d=>{d.executed>0&&console.log("Evening briefing result:",JSON.stringify(d))}).catch(d=>{console.error("Evening briefing error:",d.message)})),new Date().getMinutes()%5<2&&n.waitUntil(fetch(`${a}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:s}).then(d=>d.json()).then(d=>{var c;(c=d.results)!=null&&c.some(m=>m.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(d))}).catch(()=>{}))}catch(i){console.error("Scheduled cron error:",i.message||i)}}const ai={fetch:de.fetch,scheduled:ni},In=new pe,ri=Object.assign({"/src/index.tsx":ai});let Za=!1;for(const[,e]of Object.entries(ri))e&&(In.all("*",t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),In.notFound(t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),Za=!0);if(!Za)throw new Error("Can't import modules from ['/src/index.tsx']");export{In as default};
