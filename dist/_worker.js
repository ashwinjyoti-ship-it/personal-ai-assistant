var Br=Object.defineProperty;var Ot=e=>{throw TypeError(e)};var jr=(e,t,r)=>t in e?Br(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var T=(e,t,r)=>jr(e,typeof t!="symbol"?t+"":t,r),ut=(e,t,r)=>t.has(e)||Ot("Cannot "+r);var v=(e,t,r)=>(ut(e,t,"read from private field"),r?r.call(e):t.get(e)),D=(e,t,r)=>t.has(e)?Ot("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),S=(e,t,r,a)=>(ut(e,t,"write to private field"),a?a.call(e,r):t.set(e,r),r),R=(e,t,r)=>(ut(e,t,"access private method"),r);var Rt=(e,t,r,a)=>({set _(n){S(e,t,n,r)},get _(){return v(e,t,a)}});var At=(e,t,r)=>(a,n)=>{let s=-1;return o(0);async function o(i){if(i<=s)throw new Error("next() called multiple times");s=i;let l,d=!1,u;if(e[i]?(u=e[i][0][0],a.req.routeIndex=i):u=i===e.length&&n||void 0,u)try{l=await u(a,()=>o(i+1))}catch(p){if(p instanceof Error&&t)a.error=p,l=await t(p,a),d=!0;else throw p}else a.finalized===!1&&r&&(l=await r(a));return l&&(a.finalized===!1||d)&&(a.res=l),a}},Pr=Symbol(),Hr=async(e,t=Object.create(null))=>{const{all:r=!1,dot:a=!1}=t,s=(e instanceof er?e.raw.headers:e.headers).get("Content-Type");return s!=null&&s.startsWith("multipart/form-data")||s!=null&&s.startsWith("application/x-www-form-urlencoded")?Ur(e,{all:r,dot:a}):{}};async function Ur(e,t){const r=await e.formData();return r?Gr(r,t):{}}function Gr(e,t){const r=Object.create(null);return e.forEach((a,n)=>{t.all||n.endsWith("[]")?zr(r,n,a):r[n]=a}),t.dot&&Object.entries(r).forEach(([a,n])=>{a.includes(".")&&(Fr(r,a,n),delete r[a])}),r}var zr=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Fr=(e,t,r)=>{let a=e;const n=t.split(".");n.forEach((s,o)=>{o===n.length-1?a[s]=r:((!a[s]||typeof a[s]!="object"||Array.isArray(a[s])||a[s]instanceof File)&&(a[s]=Object.create(null)),a=a[s])})},Yt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Wr=e=>{const{groups:t,path:r}=qr(e),a=Yt(r);return Kr(a,t)},qr=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,a)=>{const n=`@${a}`;return t.push([n,r]),n}),{groups:t,path:e}},Kr=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[a]=t[r];for(let n=e.length-1;n>=0;n--)if(e[n].includes(a)){e[n]=e[n].replace(a,t[r][1]);break}}return e},Ze={},Jr=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const a=`${e}#${t}`;return Ze[a]||(r[2]?Ze[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Ze[a]=[e,r[1],!0]),Ze[a]}return null},Et=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Yr=e=>Et(e,decodeURI),Vt=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let a=r;for(;a<t.length;a++){const n=t.charCodeAt(a);if(n===37){const s=t.indexOf("?",a),o=t.indexOf("#",a),i=s===-1?o===-1?void 0:o:o===-1?s:Math.min(s,o),l=t.slice(r,i);return Yr(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(n===63||n===35)break}return t.slice(r,a)},Vr=e=>{const t=Vt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Se=(e,t,...r)=>(r.length&&(t=Se(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Xt=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let a="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))a+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){r.length===0&&a===""?r.push("/"):r.push(a);const s=n.replace("?","");a+="/"+s,r.push(a)}else a+="/"+n}),r.filter((n,s,o)=>o.indexOf(n)===s)},pt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Et(e,Qt):e):e,Zt=(e,t,r)=>{let a;if(!r&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const i=e.charCodeAt(o+t.length+1);if(i===61){const l=o+t.length+2,d=e.indexOf("&",l);return pt(e.slice(l,d===-1?void 0:d))}else if(i==38||isNaN(i))return"";o=e.indexOf(`&${t}`,o+1)}if(a=/[%+]/.test(e),!a)return}const n={};a??(a=/[%+]/.test(e));let s=e.indexOf("?",8);for(;s!==-1;){const o=e.indexOf("&",s+1);let i=e.indexOf("=",s);i>o&&o!==-1&&(i=-1);let l=e.slice(s+1,i===-1?o===-1?void 0:o:i);if(a&&(l=pt(l)),s=o,l==="")continue;let d;i===-1?d="":(d=e.slice(i+1,o===-1?void 0:o),a&&(d=pt(d))),r?(n[l]&&Array.isArray(n[l])||(n[l]=[]),n[l].push(d)):n[l]??(n[l]=d)}return t?n[t]:n},Xr=Zt,Zr=(e,t)=>Zt(e,t,!0),Qt=decodeURIComponent,Lt=e=>Et(e,Qt),Ce,W,oe,tr,rr,vt,ie,zt,er=(zt=class{constructor(e,t="/",r=[[]]){D(this,oe);T(this,"raw");D(this,Ce);D(this,W);T(this,"routeIndex",0);T(this,"path");T(this,"bodyCache",{});D(this,ie,e=>{const{bodyCache:t,raw:r}=this,a=t[e];if(a)return a;const n=Object.keys(t)[0];return n?t[n].then(s=>(n==="json"&&(s=JSON.stringify(s)),new Response(s)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,S(this,W,r),S(this,Ce,{})}param(e){return e?R(this,oe,tr).call(this,e):R(this,oe,rr).call(this)}query(e){return Xr(this.url,e)}queries(e){return Zr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,a)=>{t[a]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Hr(this,e))}json(){return v(this,ie).call(this,"text").then(e=>JSON.parse(e))}text(){return v(this,ie).call(this,"text")}arrayBuffer(){return v(this,ie).call(this,"arrayBuffer")}blob(){return v(this,ie).call(this,"blob")}formData(){return v(this,ie).call(this,"formData")}addValidatedData(e,t){v(this,Ce)[e]=t}valid(e){return v(this,Ce)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Pr](){return v(this,W)}get matchedRoutes(){return v(this,W)[0].map(([[,e]])=>e)}get routePath(){return v(this,W)[0].map(([[,e]])=>e)[this.routeIndex].path}},Ce=new WeakMap,W=new WeakMap,oe=new WeakSet,tr=function(e){const t=v(this,W)[0][this.routeIndex][1][e],r=R(this,oe,vt).call(this,t);return r&&/\%/.test(r)?Lt(r):r},rr=function(){const e={},t=Object.keys(v(this,W)[0][this.routeIndex][1]);for(const r of t){const a=R(this,oe,vt).call(this,v(this,W)[0][this.routeIndex][1][r]);a!==void 0&&(e[r]=/\%/.test(a)?Lt(a):a)}return e},vt=function(e){return v(this,W)[1]?v(this,W)[1][e]:e},ie=new WeakMap,zt),Qr={Stringify:1},ar=async(e,t,r,a,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const s=e.callbacks;return s!=null&&s.length?(n?n[0]+=e:n=[e],Promise.all(s.map(i=>i({phase:t,buffer:n,context:a}))).then(i=>Promise.all(i.filter(Boolean).map(l=>ar(l,t,!1,a,n))).then(()=>n[0]))):Promise.resolve(e)},ea="text/plain; charset=UTF-8",mt=(e,t)=>({"Content-Type":e,...t}),Fe,We,re,Oe,ae,F,qe,Re,Ae,ye,Ke,Je,le,Ie,Ft,ta=(Ft=class{constructor(e,t){D(this,le);D(this,Fe);D(this,We);T(this,"env",{});D(this,re);T(this,"finalized",!1);T(this,"error");D(this,Oe);D(this,ae);D(this,F);D(this,qe);D(this,Re);D(this,Ae);D(this,ye);D(this,Ke);D(this,Je);T(this,"render",(...e)=>(v(this,Re)??S(this,Re,t=>this.html(t)),v(this,Re).call(this,...e)));T(this,"setLayout",e=>S(this,qe,e));T(this,"getLayout",()=>v(this,qe));T(this,"setRenderer",e=>{S(this,Re,e)});T(this,"header",(e,t,r)=>{this.finalized&&S(this,F,new Response(v(this,F).body,v(this,F)));const a=v(this,F)?v(this,F).headers:v(this,ye)??S(this,ye,new Headers);t===void 0?a.delete(e):r!=null&&r.append?a.append(e,t):a.set(e,t)});T(this,"status",e=>{S(this,Oe,e)});T(this,"set",(e,t)=>{v(this,re)??S(this,re,new Map),v(this,re).set(e,t)});T(this,"get",e=>v(this,re)?v(this,re).get(e):void 0);T(this,"newResponse",(...e)=>R(this,le,Ie).call(this,...e));T(this,"body",(e,t,r)=>R(this,le,Ie).call(this,e,t,r));T(this,"text",(e,t,r)=>!v(this,ye)&&!v(this,Oe)&&!t&&!r&&!this.finalized?new Response(e):R(this,le,Ie).call(this,e,t,mt(ea,r)));T(this,"json",(e,t,r)=>R(this,le,Ie).call(this,JSON.stringify(e),t,mt("application/json",r)));T(this,"html",(e,t,r)=>{const a=n=>R(this,le,Ie).call(this,n,t,mt("text/html; charset=UTF-8",r));return typeof e=="object"?ar(e,Qr.Stringify,!1,{}).then(a):a(e)});T(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});T(this,"notFound",()=>(v(this,Ae)??S(this,Ae,()=>new Response),v(this,Ae).call(this,this)));S(this,Fe,e),t&&(S(this,ae,t.executionCtx),this.env=t.env,S(this,Ae,t.notFoundHandler),S(this,Je,t.path),S(this,Ke,t.matchResult))}get req(){return v(this,We)??S(this,We,new er(v(this,Fe),v(this,Je),v(this,Ke))),v(this,We)}get event(){if(v(this,ae)&&"respondWith"in v(this,ae))return v(this,ae);throw Error("This context has no FetchEvent")}get executionCtx(){if(v(this,ae))return v(this,ae);throw Error("This context has no ExecutionContext")}get res(){return v(this,F)||S(this,F,new Response(null,{headers:v(this,ye)??S(this,ye,new Headers)}))}set res(e){if(v(this,F)&&e){e=new Response(e.body,e);for(const[t,r]of v(this,F).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=v(this,F).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of a)e.headers.append("set-cookie",n)}else e.headers.set(t,r)}S(this,F,e),this.finalized=!0}get var(){return v(this,re)?Object.fromEntries(v(this,re)):{}}},Fe=new WeakMap,We=new WeakMap,re=new WeakMap,Oe=new WeakMap,ae=new WeakMap,F=new WeakMap,qe=new WeakMap,Re=new WeakMap,Ae=new WeakMap,ye=new WeakMap,Ke=new WeakMap,Je=new WeakMap,le=new WeakSet,Ie=function(e,t,r){const a=v(this,F)?new Headers(v(this,F).headers):v(this,ye)??new Headers;if(typeof t=="object"&&"headers"in t){const s=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,i]of s)o.toLowerCase()==="set-cookie"?a.append(o,i):a.set(o,i)}if(r)for(const[s,o]of Object.entries(r))if(typeof o=="string")a.set(s,o);else{a.delete(s);for(const i of o)a.append(s,i)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??v(this,Oe);return new Response(e,{status:n,headers:a})},Ft),j="ALL",ra="all",aa=["get","post","put","delete","options","patch"],nr="Can not add a route since the matcher is already built.",sr=class extends Error{},na="__COMPOSED_HANDLER",sa=e=>e.text("404 Not Found",404),Nt=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},J,P,or,Y,fe,tt,rt,Le,oa=(Le=class{constructor(t={}){D(this,P);T(this,"get");T(this,"post");T(this,"put");T(this,"delete");T(this,"options");T(this,"patch");T(this,"all");T(this,"on");T(this,"use");T(this,"router");T(this,"getPath");T(this,"_basePath","/");D(this,J,"/");T(this,"routes",[]);D(this,Y,sa);T(this,"errorHandler",Nt);T(this,"onError",t=>(this.errorHandler=t,this));T(this,"notFound",t=>(S(this,Y,t),this));T(this,"fetch",(t,...r)=>R(this,P,rt).call(this,t,r[1],r[0],t.method));T(this,"request",(t,r,a,n)=>t instanceof Request?this.fetch(r?new Request(t,r):t,a,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Se("/",t)}`,r),a,n)));T(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(R(this,P,rt).call(this,t.request,t,void 0,t.request.method))})});[...aa,ra].forEach(s=>{this[s]=(o,...i)=>(typeof o=="string"?S(this,J,o):R(this,P,fe).call(this,s,v(this,J),o),i.forEach(l=>{R(this,P,fe).call(this,s,v(this,J),l)}),this)}),this.on=(s,o,...i)=>{for(const l of[o].flat()){S(this,J,l);for(const d of[s].flat())i.map(u=>{R(this,P,fe).call(this,d.toUpperCase(),v(this,J),u)})}return this},this.use=(s,...o)=>(typeof s=="string"?S(this,J,s):(S(this,J,"*"),o.unshift(s)),o.forEach(i=>{R(this,P,fe).call(this,j,v(this,J),i)}),this);const{strict:a,...n}=t;Object.assign(this,n),this.getPath=a??!0?t.getPath??Vt:Vr}route(t,r){const a=this.basePath(t);return r.routes.map(n=>{var o;let s;r.errorHandler===Nt?s=n.handler:(s=async(i,l)=>(await At([],r.errorHandler)(i,()=>n.handler(i,l))).res,s[na]=n.handler),R(o=a,P,fe).call(o,n.method,n.path,s)}),this}basePath(t){const r=R(this,P,or).call(this);return r._basePath=Se(this._basePath,t),r}mount(t,r,a){let n,s;a&&(typeof a=="function"?s=a:(s=a.optionHandler,a.replaceRequest===!1?n=l=>l:n=a.replaceRequest));const o=s?l=>{const d=s(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};n||(n=(()=>{const l=Se(this._basePath,t),d=l==="/"?0:l.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(d)||"/",new Request(p,u)}})());const i=async(l,d)=>{const u=await r(n(l.req.raw),...o(l));if(u)return u;await d()};return R(this,P,fe).call(this,j,Se(t,"*"),i),this}},J=new WeakMap,P=new WeakSet,or=function(){const t=new Le({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,S(t,Y,v(this,Y)),t.routes=this.routes,t},Y=new WeakMap,fe=function(t,r,a){t=t.toUpperCase(),r=Se(this._basePath,r);const n={basePath:this._basePath,path:r,method:t,handler:a};this.router.add(t,r,[a,n]),this.routes.push(n)},tt=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},rt=function(t,r,a,n){if(n==="HEAD")return(async()=>new Response(null,await R(this,P,rt).call(this,t,r,a,"GET")))();const s=this.getPath(t,{env:a}),o=this.router.match(n,s),i=new ta(t,{path:s,matchResult:o,env:a,executionCtx:r,notFoundHandler:v(this,Y)});if(o[0].length===1){let d;try{d=o[0][0][0][0](i,async()=>{i.res=await v(this,Y).call(this,i)})}catch(u){return R(this,P,tt).call(this,u,i)}return d instanceof Promise?d.then(u=>u||(i.finalized?i.res:v(this,Y).call(this,i))).catch(u=>R(this,P,tt).call(this,u,i)):d??v(this,Y).call(this,i)}const l=At(o[0],this.errorHandler,v(this,Y));return(async()=>{try{const d=await l(i);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return R(this,P,tt).call(this,d,i)}})()},Le),ir=[];function ia(e,t){const r=this.buildAllMatchers(),a=((n,s)=>{const o=r[n]||r[j],i=o[2][s];if(i)return i;const l=s.match(o[0]);if(!l)return[[],ir];const d=l.indexOf("",1);return[o[1][d],l]});return this.match=a,a(e,t)}var nt="[^/]+",Ue=".*",Ge="(?:|/.*)",De=Symbol(),la=new Set(".\\+*[^]$()");function da(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ue||e===Ge?1:t===Ue||t===Ge?-1:e===nt?1:t===nt?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var be,we,V,Ee,ca=(Ee=class{constructor(){D(this,be);D(this,we);D(this,V,Object.create(null))}insert(t,r,a,n,s){if(t.length===0){if(v(this,be)!==void 0)throw De;if(s)return;S(this,be,r);return}const[o,...i]=t,l=o==="*"?i.length===0?["","",Ue]:["","",nt]:o==="/*"?["","",Ge]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const u=l[1];let p=l[2]||nt;if(u&&l[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw De;if(d=v(this,V)[p],!d){if(Object.keys(v(this,V)).some(g=>g!==Ue&&g!==Ge))throw De;if(s)return;d=v(this,V)[p]=new Ee,u!==""&&S(d,we,n.varIndex++)}!s&&u!==""&&a.push([u,v(d,we)])}else if(d=v(this,V)[o],!d){if(Object.keys(v(this,V)).some(u=>u.length>1&&u!==Ue&&u!==Ge))throw De;if(s)return;d=v(this,V)[o]=new Ee}d.insert(i,r,a,n,s)}buildRegExpStr(){const r=Object.keys(v(this,V)).sort(da).map(a=>{const n=v(this,V)[a];return(typeof v(n,we)=="number"?`(${a})@${v(n,we)}`:la.has(a)?`\\${a}`:a)+n.buildRegExpStr()});return typeof v(this,be)=="number"&&r.unshift(`#${v(this,be)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},be=new WeakMap,we=new WeakMap,V=new WeakMap,Ee),st,Ye,Wt,ua=(Wt=class{constructor(){D(this,st,{varIndex:0});D(this,Ye,new ca)}insert(e,t,r){const a=[],n=[];for(let o=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${o}`;return n[o]=[d,l],o++,i=!0,d}),!i)break}const s=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=n.length-1;o>=0;o--){const[i]=n[o];for(let l=s.length-1;l>=0;l--)if(s[l].indexOf(i)!==-1){s[l]=s[l].replace(i,n[o][1]);break}}return v(this,Ye).insert(s,t,a,v(this,st),r),a}buildRegExp(){let e=v(this,Ye).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,s,o)=>s!==void 0?(r[++t]=Number(s),"$()"):(o!==void 0&&(a[Number(o)]=++t),"")),[new RegExp(`^${e}`),r,a]}},st=new WeakMap,Ye=new WeakMap,Wt),pa=[/^$/,[],Object.create(null)],at=Object.create(null);function lr(e){return at[e]??(at[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function ma(){at=Object.create(null)}function ha(e){var d;const t=new ua,r=[];if(e.length===0)return pa;const a=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[g,b])=>u?1:g?-1:p.length-b.length),n=Object.create(null);for(let u=0,p=-1,g=a.length;u<g;u++){const[b,y,w]=a[u];b?n[y]=[w.map(([x])=>[x,Object.create(null)]),ir]:p++;let _;try{_=t.insert(y,p,b)}catch(x){throw x===De?new sr(y):x}b||(r[p]=w.map(([x,c])=>{const h=Object.create(null);for(c-=1;c>=0;c--){const[m,f]=_[c];h[m]=f}return[x,h]}))}const[s,o,i]=t.buildRegExp();for(let u=0,p=r.length;u<p;u++)for(let g=0,b=r[u].length;g<b;g++){const y=(d=r[u][g])==null?void 0:d[1];if(!y)continue;const w=Object.keys(y);for(let _=0,x=w.length;_<x;_++)y[w[_]]=i[y[w[_]]]}const l=[];for(const u in o)l[u]=r[o[u]];return[s,l,n]}function Te(e,t){if(e){for(const r of Object.keys(e).sort((a,n)=>n.length-a.length))if(lr(r).test(t))return[...e[r]]}}var de,ce,ot,dr,qt,ga=(qt=class{constructor(){D(this,ot);T(this,"name","RegExpRouter");D(this,de);D(this,ce);T(this,"match",ia);S(this,de,{[j]:Object.create(null)}),S(this,ce,{[j]:Object.create(null)})}add(e,t,r){var i;const a=v(this,de),n=v(this,ce);if(!a||!n)throw new Error(nr);a[e]||[a,n].forEach(l=>{l[e]=Object.create(null),Object.keys(l[j]).forEach(d=>{l[e][d]=[...l[j][d]]})}),t==="/*"&&(t="*");const s=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=lr(t);e===j?Object.keys(a).forEach(d=>{var u;(u=a[d])[t]||(u[t]=Te(a[d],t)||Te(a[j],t)||[])}):(i=a[e])[t]||(i[t]=Te(a[e],t)||Te(a[j],t)||[]),Object.keys(a).forEach(d=>{(e===j||e===d)&&Object.keys(a[d]).forEach(u=>{l.test(u)&&a[d][u].push([r,s])})}),Object.keys(n).forEach(d=>{(e===j||e===d)&&Object.keys(n[d]).forEach(u=>l.test(u)&&n[d][u].push([r,s]))});return}const o=Xt(t)||[t];for(let l=0,d=o.length;l<d;l++){const u=o[l];Object.keys(n).forEach(p=>{var g;(e===j||e===p)&&((g=n[p])[u]||(g[u]=[...Te(a[p],u)||Te(a[j],u)||[]]),n[p][u].push([r,s-d+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(v(this,ce)).concat(Object.keys(v(this,de))).forEach(t=>{e[t]||(e[t]=R(this,ot,dr).call(this,t))}),S(this,de,S(this,ce,void 0)),ma(),e}},de=new WeakMap,ce=new WeakMap,ot=new WeakSet,dr=function(e){const t=[];let r=e===j;return[v(this,de),v(this,ce)].forEach(a=>{const n=a[e]?Object.keys(a[e]).map(s=>[s,a[e][s]]):[];n.length!==0?(r||(r=!0),t.push(...n)):e!==j&&t.push(...Object.keys(a[j]).map(s=>[s,a[j][s]]))}),r?ha(t):null},qt),ue,ne,Kt,fa=(Kt=class{constructor(e){T(this,"name","SmartRouter");D(this,ue,[]);D(this,ne,[]);S(this,ue,e.routers)}add(e,t,r){if(!v(this,ne))throw new Error(nr);v(this,ne).push([e,t,r])}match(e,t){if(!v(this,ne))throw new Error("Fatal error");const r=v(this,ue),a=v(this,ne),n=r.length;let s=0,o;for(;s<n;s++){const i=r[s];try{for(let l=0,d=a.length;l<d;l++)i.add(...a[l]);o=i.match(e,t)}catch(l){if(l instanceof sr)continue;throw l}this.match=i.match.bind(i),S(this,ue,[i]),S(this,ne,void 0);break}if(s===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(v(this,ne)||v(this,ue).length!==1)throw new Error("No active router has been determined yet.");return v(this,ue)[0]}},ue=new WeakMap,ne=new WeakMap,Kt),je=Object.create(null),pe,G,xe,Ne,U,se,ve,Me,va=(Me=class{constructor(t,r,a){D(this,se);D(this,pe);D(this,G);D(this,xe);D(this,Ne,0);D(this,U,je);if(S(this,G,a||Object.create(null)),S(this,pe,[]),t&&r){const n=Object.create(null);n[t]={handler:r,possibleKeys:[],score:0},S(this,pe,[n])}S(this,xe,[])}insert(t,r,a){S(this,Ne,++Rt(this,Ne)._);let n=this;const s=Wr(r),o=[];for(let i=0,l=s.length;i<l;i++){const d=s[i],u=s[i+1],p=Jr(d,u),g=Array.isArray(p)?p[0]:d;if(g in v(n,G)){n=v(n,G)[g],p&&o.push(p[1]);continue}v(n,G)[g]=new Me,p&&(v(n,xe).push(p),o.push(p[1])),n=v(n,G)[g]}return v(n,pe).push({[t]:{handler:a,possibleKeys:o.filter((i,l,d)=>d.indexOf(i)===l),score:v(this,Ne)}}),n}search(t,r){var l;const a=[];S(this,U,je);let s=[this];const o=Yt(r),i=[];for(let d=0,u=o.length;d<u;d++){const p=o[d],g=d===u-1,b=[];for(let y=0,w=s.length;y<w;y++){const _=s[y],x=v(_,G)[p];x&&(S(x,U,v(_,U)),g?(v(x,G)["*"]&&a.push(...R(this,se,ve).call(this,v(x,G)["*"],t,v(_,U))),a.push(...R(this,se,ve).call(this,x,t,v(_,U)))):b.push(x));for(let c=0,h=v(_,xe).length;c<h;c++){const m=v(_,xe)[c],f=v(_,U)===je?{}:{...v(_,U)};if(m==="*"){const A=v(_,G)["*"];A&&(a.push(...R(this,se,ve).call(this,A,t,v(_,U))),S(A,U,f),b.push(A));continue}const[E,k,I]=m;if(!p&&!(I instanceof RegExp))continue;const O=v(_,G)[E],N=o.slice(d).join("/");if(I instanceof RegExp){const A=I.exec(N);if(A){if(f[k]=A[0],a.push(...R(this,se,ve).call(this,O,t,v(_,U),f)),Object.keys(v(O,G)).length){S(O,U,f);const L=((l=A[0].match(/\//))==null?void 0:l.length)??0;(i[L]||(i[L]=[])).push(O)}continue}}(I===!0||I.test(p))&&(f[k]=p,g?(a.push(...R(this,se,ve).call(this,O,t,f,v(_,U))),v(O,G)["*"]&&a.push(...R(this,se,ve).call(this,v(O,G)["*"],t,f,v(_,U)))):(S(O,U,f),b.push(O)))}}s=b.concat(i.shift()??[])}return a.length>1&&a.sort((d,u)=>d.score-u.score),[a.map(({handler:d,params:u})=>[d,u])]}},pe=new WeakMap,G=new WeakMap,xe=new WeakMap,Ne=new WeakMap,U=new WeakMap,se=new WeakSet,ve=function(t,r,a,n){const s=[];for(let o=0,i=v(t,pe).length;o<i;o++){const l=v(t,pe)[o],d=l[r]||l[j],u={};if(d!==void 0&&(d.params=Object.create(null),s.push(d),a!==je||n&&n!==je))for(let p=0,g=d.possibleKeys.length;p<g;p++){const b=d.possibleKeys[p],y=u[d.score];d.params[b]=n!=null&&n[b]&&!y?n[b]:a[b]??(n==null?void 0:n[b]),u[d.score]=!0}}return s},Me),_e,Jt,ya=(Jt=class{constructor(){T(this,"name","TrieRouter");D(this,_e);S(this,_e,new va)}add(e,t,r){const a=Xt(t);if(a){for(let n=0,s=a.length;n<s;n++)v(this,_e).insert(e,a[n],r);return}v(this,_e).insert(e,t,r)}match(e,t){return v(this,_e).search(e,t)}},_e=new WeakMap,Jt),he=class extends oa{constructor(e={}){super(e),this.router=e.router??new fa({routers:[new ga,new ya]})}},ba=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},a=(s=>typeof s=="string"?s==="*"?()=>s:o=>s===o?o:null:typeof s=="function"?s:o=>s.includes(o)?o:null)(r.origin),n=(s=>typeof s=="function"?s:Array.isArray(s)?()=>s:()=>[])(r.allowMethods);return async function(o,i){var u;function l(p,g){o.res.headers.set(p,g)}const d=await a(o.req.header("origin")||"",o);if(d&&l("Access-Control-Allow-Origin",d),r.credentials&&l("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),o.req.method==="OPTIONS"){r.origin!=="*"&&l("Vary","Origin"),r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const p=await n(o.req.header("origin")||"",o);p.length&&l("Access-Control-Allow-Methods",p.join(","));let g=r.allowHeaders;if(!(g!=null&&g.length)){const b=o.req.header("Access-Control-Request-Headers");b&&(g=b.split(/\s*,\s*/))}return g!=null&&g.length&&(l("Access-Control-Allow-Headers",g.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await i(),r.origin!=="*"&&o.header("Vary","Origin",{append:!0})}};function cr(){return`<!DOCTYPE html>
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
      components: { google_calendar: true, gmail: true, tasks: true, news: true },
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
        html += '<div class="item-card-header" style="border:none;padding-bottom:0;"><span class="item-card-title">' + date + ' Evening Briefing</span>';
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
  
  window.deleteBriefing = async function(id) {
    if (!confirm('Are you sure you want to delete this briefing?')) return;
    try {
      await api('/proactive/briefings/' + id, { method: 'DELETE' });
      renderSettingsTab(); // refresh proactive tab
    } catch (e) {
      showToast('Failed to delete briefing', 'error');
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
      html += '<h2 style="font-size:24px;font-weight:600;margin:0 0 8px 0;color:var(--text-primary);">📋 Evening Briefing</h2>';
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
</html>`}const Tt="AES-GCM",wa=256;async function ur(e){const t=new TextEncoder,r=await crypto.subtle.importKey("raw",t.encode(e.padEnd(32,"0").slice(0,32)),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("karna-salt-v1"),iterations:1e5,hash:"SHA-256"},r,{name:Tt,length:wa},!1,["encrypt","decrypt"])}async function kt(e,t){const r=await ur(t),a=crypto.getRandomValues(new Uint8Array(12)),n=new TextEncoder,s=await crypto.subtle.encrypt({name:Tt,iv:a},r,n.encode(e)),o=new Uint8Array(a.length+new Uint8Array(s).length);return o.set(a),o.set(new Uint8Array(s),a.length),btoa(String.fromCharCode(...o))}async function M(e,t){const r=await ur(t),a=new Uint8Array(atob(e).split("").map(i=>i.charCodeAt(0))),n=a.slice(0,12),s=a.slice(12),o=await crypto.subtle.decrypt({name:Tt,iv:n},r,s);return new TextDecoder().decode(o)}async function it(e){const r=new TextEncoder().encode(e+"karna-pin-salt"),a=await crypto.subtle.digest("SHA-256",r);return btoa(String.fromCharCode(...new Uint8Array(a)))}async function pr(e,t){return await it(e)===t}const xa=Object.freeze(Object.defineProperty({__proto__:null,decrypt:M,encrypt:kt,hashPin:it,verifyPin:pr},Symbol.toStringTag,{value:"Module"})),ge=new he;ge.get("/check",async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM users").first();return e.json({hasUsers:((t==null?void 0:t.cnt)||0)>0})});ge.post("/setup",async e=>{const{username:t,name:r,pin:a,personality_prompt:n,timezone:s}=await e.req.json();if(!t||!r||!a)return e.json({error:"Username, name, and PIN are required"},400);if(a.length<4)return e.json({error:"PIN must be at least 4 characters"},400);if(await e.env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(t).first())return e.json({error:"Username already taken"},409);const i=await it(a);await e.env.DB.prepare("INSERT INTO users (username, name, pin_hash, personality_prompt, timezone) VALUES (?, ?, ?, ?, ?)").bind(t,r,i,n||"",s||"Asia/Kolkata").run();const l=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first(),d=crypto.randomUUID(),u=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(d,l.id,"web",u).run(),e.json({success:!0,sessionId:d,user:{id:l.id,username:l.username,name:l.name}})});ge.post("/login",async e=>{const{username:t,pin:r}=await e.req.json();if(!t||!r)return e.json({error:"Username and PIN required"},400);const a=await e.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(t).first();if(!a)return e.json({error:"User not found"},404);if(!await pr(r,a.pin_hash))return e.json({error:"Invalid PIN"},401);const s=crypto.randomUUID(),o=new Date(Date.now()+10080*60*1e3).toISOString();return await e.env.DB.prepare("INSERT INTO sessions (id, user_id, channel, expires_at) VALUES (?, ?, ?, ?)").bind(s,a.id,"web",o).run(),e.json({success:!0,sessionId:s,user:{id:a.id,username:a.username,name:a.name}})});ge.post("/logout",async e=>{var r;const t=(r=e.req.header("Authorization"))==null?void 0:r.replace("Bearer ","");return t&&await e.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(t).run(),e.json({success:!0})});ge.get("/users/hints",async e=>{const r=((await e.env.DB.prepare("SELECT username, name, created_at FROM users ORDER BY created_at ASC").all()).results||[]).map(a=>{var n;return{username:a.username,name_hint:a.name.split(" ")[0],created:((n=a.created_at)==null?void 0:n.split(" ")[0])||""}});return e.json({users:r,count:r.length})});ge.post("/reset-pin",async e=>{var i;const{username:t,name:r,new_pin:a}=await e.req.json();if(!t||!r||!a)return e.json({error:"Username, display name, and new PIN are required"},400);if(a.length<4)return e.json({error:"PIN must be at least 4 characters"},400);const n=await e.env.DB.prepare("SELECT id, username, name FROM users WHERE username = ?").bind(t).first();if(!n)return e.json({error:"User not found"},404);if(n.name.toLowerCase().trim()!==r.toLowerCase().trim())return e.json({error:"Display name does not match. This is required for identity verification."},403);const s=await it(a);await e.env.DB.prepare("UPDATE users SET pin_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(s,n.id).run();const o=await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ?").bind(n.id).run();return await e.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(n.id).run(),e.json({success:!0,message:"PIN reset successfully. All API keys and credentials have been cleared (they were encrypted with your old PIN). Please log in with your new PIN and re-enter your API keys in Settings.",credentials_cleared:((i=o.meta)==null?void 0:i.changes)||0})});ge.get("/me",async e=>{var a;const t=(a=e.req.header("Authorization"))==null?void 0:a.replace("Bearer ","");if(!t)return e.json({error:"No session"},401);const r=await e.env.DB.prepare(`SELECT s.*, u.id as uid, u.username, u.name, u.role, u.timezone 
     FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();return r?e.json({user:{id:r.uid,username:r.username,name:r.name,role:r.role,timezone:r.timezone}}):e.json({error:"Invalid or expired session"},401)});const ze={anthropic:{id:"anthropic",label:"Anthropic Claude",apiBase:"https://api.anthropic.com",apiFormat:"anthropic",defaultModel:"claude-sonnet-4-20250514",keyPlaceholder:"sk-ant-api03-...",modelHint:"claude-sonnet-4-20250514, claude-haiku-4-20250514",validatePath:"/v1/messages"},openai:{id:"openai",label:"OpenAI GPT",apiBase:"https://api.openai.com",apiFormat:"openai-compatible",defaultModel:"gpt-4o",keyPlaceholder:"sk-...",modelHint:"gpt-4o, gpt-4o-mini, o3-mini",validatePath:"/v1/models"},grok:{id:"grok",label:"xAI Grok",apiBase:"https://api.x.ai",apiFormat:"openai-compatible",defaultModel:"grok-3-mini",keyPlaceholder:"xai-...",modelHint:"grok-3-mini, grok-3",validatePath:"/v1/models"},deepseek:{id:"deepseek",label:"DeepSeek",apiBase:"https://api.deepseek.com",apiFormat:"openai-compatible",defaultModel:"deepseek-chat",keyPlaceholder:"sk-...",modelHint:"deepseek-chat, deepseek-reasoner",validatePath:"/v1/models"},gemini:{id:"gemini",label:"Google Gemini",apiBase:"https://generativelanguage.googleapis.com/v1beta/openai",apiFormat:"openai-compatible",defaultModel:"gemini-2.0-flash",keyPlaceholder:"AIzaSy...",modelHint:"gemini-2.0-flash, gemini-2.5-pro-preview",validatePath:"/models"},openrouter:{id:"openrouter",label:"OpenRouter",apiBase:"https://openrouter.ai/api",apiFormat:"openai-compatible",defaultModel:"anthropic/claude-sonnet-4",keyPlaceholder:"sk-or-...",modelHint:"e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b",validatePath:"/v1/models"},abacus:{id:"abacus",label:"Abacus AI (RouteLLM)",apiBase:"https://routellm.abacus.ai",apiFormat:"openai-compatible",defaultModel:"route-llm",keyPlaceholder:"Your Abacus API key",modelHint:"route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash",validatePath:"/v1/models"}};async function C(e,t,r,a,n,s={}){try{await e.prepare("INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)").bind(t,r,a,n,JSON.stringify(s)).run()}catch(o){console.error("Failed to log error:",o)}}class mr{constructor(t,r="claude-sonnet-4-20250514",a="https://api.anthropic.com",n="anthropic"){T(this,"name");T(this,"apiKey");T(this,"model");T(this,"apiBase");this.apiKey=t,this.model=r,this.apiBase=a,this.name=n}async chat(t,r){var u,p,g,b;const a=t.find(y=>y.role==="system"),n=t.filter(y=>y.role!=="system"),s={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,messages:n.map(y=>({role:y.role,content:y.content}))};a&&(s.system=a.content),r!=null&&r.tools&&r.tools.length>0&&(s.tools=r.tools.map(y=>({name:y.name,description:y.description,input_schema:y.parameters})));const o=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)});if(!o.ok){const y=await o.text();throw new Error(this.name+" API error "+o.status+": "+y)}const i=await o.json(),l=((u=i.content)==null?void 0:u.filter(y=>y.type==="text"))||[],d=((p=i.content)==null?void 0:p.filter(y=>y.type==="tool_use"))||[];return{content:l.map(y=>y.text).join(`
`),toolCalls:d.map(y=>({id:y.id,name:y.name,arguments:y.input})),usage:{promptTokens:((g=i.usage)==null?void 0:g.input_tokens)||0,completionTokens:((b=i.usage)==null?void 0:b.output_tokens)||0}}}async streamChat(t,r){const a=t.find(d=>d.role==="system"),n=t.filter(d=>d.role!=="system"),s={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,stream:!0,messages:n.map(d=>({role:d.role,content:d.content}))};a&&(s.system=a.content);const o=await fetch(this.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify(s)});if(!o.ok){const d=await o.text();throw new Error(this.name+" stream error "+o.status+": "+d)}const i=o.body.getReader(),l=new TextDecoder;return new ReadableStream({async pull(d){var y;const{done:u,value:p}=await i.read();if(u){d.close();return}const b=l.decode(p,{stream:!0}).split(`
`);for(const w of b)if(w.startsWith("data: ")){const _=w.slice(6);if(_==="[DONE]")continue;try{const x=JSON.parse(_);x.type==="content_block_delta"&&((y=x.delta)!=null&&y.text)&&d.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:x.delta.text})+`

`))}catch{}}}})}}function _a(e){const t={},r=e||{};if(t.type=r.type||"object",t.type==="object"){const a=r.properties;if(a&&typeof a=="object"&&Object.keys(a).length>0){const n={};for(const[s,o]of Object.entries(a))o&&typeof o=="object"?n[s]=yt(o):n[s]=o;t.properties=n}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(r.required)?t.required=r.required:t.required=[]}return r.description&&(t.description=r.description),t}function yt(e){const t={...e};if(t.type||(t.type="string"),t.type==="object"){const r=t.properties;if(r&&typeof r=="object"&&Object.keys(r).length>0){const a={};for(const[n,s]of Object.entries(r))s&&typeof s=="object"?a[n]=yt(s):a[n]=s;t.properties=a}else t.properties={_unused:{type:"string",description:"No parameters needed"}};Array.isArray(t.required)||(t.required=[])}return t.type==="array"&&t.items?typeof t.items=="object"&&(t.items=yt(t.items)):t.type==="array"&&!t.items&&(t.items={type:"string"}),t}class hr{constructor(t,r,a,n){T(this,"name");T(this,"apiKey");T(this,"model");T(this,"apiBase");this.apiKey=t,this.model=r,this.apiBase=a.replace(/\/+$/,""),this.name=n}async chat(t,r){var l,d,u,p,g,b;const a={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,messages:t.map(y=>({role:y.role,content:y.content}))},n=this.apiBase.includes("routellm.abacus.ai");r!=null&&r.tools&&r.tools.length>0&&!n&&(a.tools=r.tools.map(y=>({type:"function",function:{name:y.name,description:y.description,parameters:_a(y.parameters||{})}})));const s=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(a)});if(!s.ok){const y=await s.text();throw new Error(this.name+" API error "+s.status+": "+y)}const o=await s.json(),i=(l=o.choices)==null?void 0:l[0];return{content:((d=i==null?void 0:i.message)==null?void 0:d.content)||"",toolCalls:(p=(u=i==null?void 0:i.message)==null?void 0:u.tool_calls)==null?void 0:p.map(y=>({id:y.id,name:y.function.name,arguments:typeof y.function.arguments=="string"?JSON.parse(y.function.arguments||"{}"):y.function.arguments||{}})),usage:{promptTokens:((g=o.usage)==null?void 0:g.prompt_tokens)||0,completionTokens:((b=o.usage)==null?void 0:b.completion_tokens)||0}}}async streamChat(t,r){const a={model:this.model,max_tokens:(r==null?void 0:r.maxTokens)||4096,temperature:(r==null?void 0:r.temperature)??.7,stream:!0,messages:t.map(i=>({role:i.role,content:i.content}))},n=await fetch(this.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.apiKey},body:JSON.stringify(a)});if(!n.ok){const i=await n.text();throw new Error(this.name+" stream error "+n.status+": "+i)}const s=n.body.getReader(),o=new TextDecoder;return new ReadableStream({async pull(i){var g,b,y;const{done:l,value:d}=await s.read();if(l){i.close();return}const p=o.decode(d,{stream:!0}).split(`
`);for(const w of p)if(w.startsWith("data: ")){const _=w.slice(6);if(_==="[DONE]")continue;try{const c=(y=(b=(g=JSON.parse(_).choices)==null?void 0:g[0])==null?void 0:b.delta)==null?void 0:y.content;c&&i.enqueue(new TextEncoder().encode("data: "+JSON.stringify({text:c})+`

`))}catch{}}}})}}function bt(e,t,r,a){const n=ze[e];if(!n)throw new Error(`Unknown LLM provider: ${e}`);const s=a||n.defaultModel;return n.apiFormat==="anthropic"?new mr(t,s,n.apiBase,r):new hr(t,s,n.apiBase,r)}class gr{constructor(){T(this,"errorLog",new Map);T(this,"usageLog",new Map)}async pickProvider(t){const r=Date.now(),a=t.filter(n=>{const s=this.errorLog.get(n);return s?s.cooldownUntil<=r:!0});return a.length>0?a[0]:null}async recordUsage(t,r){const a=this.usageLog.get(t)||{tokens:0,requests:0};this.usageLog.set(t,{tokens:a.tokens+r,requests:a.requests+1})}async recordError(t,r,a=5){this.errorLog.set(t,{error:r,cooldownUntil:Date.now()+a*60*1e3})}}const Ea=["llm_slot_1","llm_slot_2","llm_slot_3"],Ta=["anthropic","openai"];async function Ve(e,t,r){const{decrypt:a}=await Promise.resolve().then(()=>xa),n=new gr,s=[];for(const p of Ea){const g=await e.prepare("SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?").bind(t,p).first();if(g)try{const b=await a(g.encrypted_value,r),y=JSON.parse(b);if(y.provider&&y.apiKey&&ze[y.provider]){const _=y.provider,x=bt(y.provider,y.apiKey,_,y.model);s.push({name:_,provider:x})}}catch(b){console.error(`Failed to load ${p}:`,b)}}const o=new Set(s.map(p=>p.name));for(const p of Ta){if(o.has(p))continue;const g=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,p).first();if(g)try{const b=await a(g.encrypted_value,r);if(ze[p]){const w=bt(p,b,p);s.push({name:p,provider:w})}}catch{console.error(`Failed to decrypt legacy ${p} key`)}}if(s.length===0)throw new Error("No LLM provider configured. Please add at least one API key in Settings → Keys.");const i=s.map(p=>p.name),l=await n.pickProvider(i);if(!l)return console.warn("All providers in cooldown, using first available"),{provider:s[0].provider,rotation:n};const d=s.find(p=>p.name===l);return{provider:ka(d.provider,s,n),rotation:n}}function ka(e,t,r){return t.length<=1?e:{name:e.name,async chat(a,n){try{return await e.chat(a,n)}catch(s){const o=s.message||"";if(!(o.includes("401")||o.includes("403")||o.includes("authentication")||o.includes("credit balance")||o.includes("invalid")&&o.includes("key")||o.includes("properties field not found")))throw s;console.warn(`Provider ${e.name} auth/billing error, trying fallback...`),await r.recordError(e.name,o,1440);const l=t.filter(d=>d.name!==e.name);for(const d of l)try{const u=await d.provider.chat(a,n);return this.name=d.name,u}catch(u){const p=u.message||"";if(p.includes("401")||p.includes("403")||p.includes("authentication")||p.includes("credit balance")||p.includes("properties field not found")){await r.recordError(d.name,p,1440);continue}throw u}throw new Error(`All LLM providers failed. Primary (${e.name}): ${o.substring(0,150)}. Check your API keys in Settings → Keys.`)}},async streamChat(a,n){return await e.streamChat(a,n)}}}const wt=Object.freeze(Object.defineProperty({__proto__:null,ClaudeProvider:mr,OpenAICompatibleProvider:hr,ProviderRotation:gr,createProviderFromConfig:bt,createRotatingProvider:Ve,logError:C},Symbol.toStringTag,{value:"Module"})),ht=20,Sa=2e3,Ia=2e3,fr=4;function Da(e){return Math.ceil(e.length/fr)}function Mt(e,t){const r=t*fr;return e.length<=r?e:e.slice(0,r)+`
[...truncated to fit token budget]`}class me{constructor(t){this.db=t}async store(t,r,a,n,s=5,o="working"){const i=await this.db.prepare("SELECT id FROM memory WHERE user_id = ? AND type = ? AND title = ?").bind(t,r,a).first();i?await this.db.prepare("UPDATE memory SET content = ?, importance = ?, tier = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,s,o,i.id).run():await this.db.prepare("INSERT INTO memory (user_id, type, title, content, importance, tier) VALUES (?, ?, ?, ?, ?, ?)").bind(t,r,a,n,s,o).run(),o==="working"&&await this.enforceWorkingMemoryCap(t)}async enforceWorkingMemoryCap(t){const r=await this.db.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(t).first();if(((r==null?void 0:r.cnt)||0)>ht){const a=((r==null?void 0:r.cnt)||0)-ht;await this.db.prepare(`UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ? AND tier = 'working' AND id IN (
           SELECT id FROM memory WHERE user_id = ? AND tier = 'working' 
           ORDER BY importance ASC, updated_at ASC LIMIT ?
         )`).bind(t,t,a).run()}}async getWorkingMemory(t){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND tier = 'working' ORDER BY importance DESC, updated_at DESC LIMIT ?").bind(t,ht).all()).results||[]}async getAll(t,r,a=50){return r?(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND type = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,r,a).all()).results||[]:(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? ORDER BY tier ASC, importance DESC, updated_at DESC LIMIT ?").bind(t,a).all()).results||[]}async search(t,r,a=10){return(await this.db.prepare("SELECT * FROM memory WHERE user_id = ? AND (title LIKE ? OR content LIKE ?) ORDER BY importance DESC LIMIT ?").bind(t,`%${r}%`,`%${r}%`,a).all()).results||[]}async update(t,r,a){await this.db.prepare("UPDATE memory SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a,t,r).run()}async promote(t,r){await this.db.prepare("UPDATE memory SET tier = 'working', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,r).run(),await this.enforceWorkingMemoryCap(r)}async demote(t,r){await this.db.prepare("UPDATE memory SET tier = 'long_term', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(t,r).run()}async remove(t,r){await this.db.prepare("DELETE FROM memory WHERE id = ? AND user_id = ?").bind(t,r).run()}async buildContext(t){const r=await this.getWorkingMemory(t);if(r.length===0)return"";const a={};for(const s of r)a[s.type]||(a[s.type]=[]),a[s.type].push(s);let n=`
## Working Memory (Active Context)
`;for(const[s,o]of Object.entries(a)){n+=`
### ${s.charAt(0).toUpperCase()+s.slice(1)}s
`;for(const i of o)n+=`- **${i.title}**: ${i.content}
`}return Mt(n,Sa)}static truncatePersonality(t){return Mt(t,Ia)}async getRecentConversations(t,r=20,a){return a?((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,a,r).all()).results||[]).reverse():((await this.db.prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(t,r).all()).results||[]).reverse()}async storeMessage(t,r,a,n,s="{}",o){const i=Da(n);o?await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate, thread_id) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(t,r,a,n,s,i,o).run():await this.db.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata, token_estimate) VALUES (?, ?, ?, ?, ?, ?)").bind(t,r,a,n,s,i).run()}async compactHistory(t,r=30){const a=await this.db.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(t).first();((a==null?void 0:a.cnt)||0)<=r*2||await this.db.prepare(`DELETE FROM conversations WHERE user_id = ? AND id NOT IN (
        SELECT id FROM conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
      )`).bind(t,t,r).run()}}const Ca="https://accounts.google.com/o/oauth2/v2/auth",vr="https://oauth2.googleapis.com/token",Oa="https://www.googleapis.com/oauth2/v2/userinfo",Ra=["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/documents","https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/gmail.readonly","https://www.googleapis.com/auth/gmail.send","https://www.googleapis.com/auth/gmail.compose","https://www.googleapis.com/auth/gmail.modify","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" ");let Q=null;async function xt(e,t,r){const a=await e.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(t,"google_oauth_tokens").first();if(!a)return null;try{const n=await M(a.encrypted_value,r);return JSON.parse(n)}catch{return null}}async function Aa(e,t,r,a){const n=await kt(JSON.stringify(a),r);await e.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, 'google_oauth_tokens', 'Google Account', ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = 'Google Account',
       updated_at = CURRENT_TIMESTAMP`).bind(t,n).run()}function yr(e,t,r){const a=new URLSearchParams({client_id:e,redirect_uri:t,response_type:"code",scope:Ra,access_type:"offline",prompt:"consent",state:r,include_granted_scopes:"true"});return`${Ca}?${a}`}async function br(e,t,r,a){const n=await fetch(vr,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({code:e,client_id:t,client_secret:r,redirect_uri:a,grant_type:"authorization_code"})}),s=await n.text();if(!n.ok)throw new Error(`Token exchange failed (${n.status}): ${s.substring(0,300)}`);return JSON.parse(s)}async function La(e,t,r){const a=await fetch(vr,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({refresh_token:e,client_id:t,client_secret:r,grant_type:"refresh_token"})}),n=await a.text();if(!a.ok)throw a.status===400||a.status===401?new Error("Google connection expired. Please reconnect your Google account in Settings → Keys."):new Error(`Token refresh failed (${a.status}): ${n.substring(0,300)}`);return JSON.parse(n)}async function wr(e){const t=await fetch(Oa,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error(`Failed to fetch user info: ${t.status}`);return await t.json()}async function $e(e,t,r,a,n){if(!a||!n)throw new Error("Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET as environment secrets.");if(Q&&Q.userId===t&&Q.expiresAt>Date.now()/1e3+60){const i=await xt(e,t,r);return{token:Q.token,email:(i==null?void 0:i.email)||"unknown"}}const s=await xt(e,t,r);if(!s)throw new Error('Google account not connected. Go to Settings → Keys → Google Workspace and click "Connect Google Account".');const o=await La(s.refresh_token,a,n);return Q={userId:t,token:o.access_token,expiresAt:Math.floor(Date.now()/1e3)+o.expires_in},{token:o.access_token,email:s.email}}async function St(e,t,r){try{const a=await xt(e,t,r);return a?{connected:!0,email:a.email,connectedAt:a.connected_at}:{connected:!1}}catch{return{connected:!1}}}function xr(e,t){return!!(e&&t&&e.includes(".apps.googleusercontent.com"))}async function _r(e,t,r,a,n,s,o){const i=await br(a,s,o,n);if(!i.refresh_token)throw new Error("No refresh token received. Try disconnecting and reconnecting.");const l=await wr(i.access_token),d={refresh_token:i.refresh_token,email:l.email,name:l.name,connected_at:new Date().toISOString()};return await Aa(e,t,r,d),Q={userId:t,token:i.access_token,expiresAt:Math.floor(Date.now()/1e3)+i.expires_in},{email:l.email,name:l.name}}async function Er(e,t){await e.prepare("DELETE FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(t).run(),(Q==null?void 0:Q.userId)===t&&(Q=null)}const Pe="https://sheets.googleapis.com/v4/spreadsheets";class Tr{constructor(t,r,a,n,s){this.db=t,this.userId=r,this.pinHash=a,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await $e(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async readRange(t,r){const a=await this.authHeaders(),n=encodeURIComponent(r),s=await fetch(`${Pe}/${t}/values/${n}`,{headers:a});if(!s.ok){const i=await s.text();throw new Error(`Sheets read failed (${s.status}): ${i}`)}return(await s.json()).values||[]}async writeRange(t,r,a){const n=await this.authHeaders(),s=encodeURIComponent(r),o=await fetch(`${Pe}/${t}/values/${s}?valueInputOption=USER_ENTERED`,{method:"PUT",headers:n,body:JSON.stringify({range:r,majorDimension:"ROWS",values:a})});if(!o.ok){const l=await o.text();throw new Error(`Sheets write failed (${o.status}): ${l}`)}return{updatedCells:(await o.json()).updatedCells||0}}async appendRows(t,r,a){var l;const n=await this.authHeaders(),s=encodeURIComponent(r),o=await fetch(`${Pe}/${t}/values/${s}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{method:"POST",headers:n,body:JSON.stringify({range:r,majorDimension:"ROWS",values:a})});if(!o.ok){const d=await o.text();throw new Error(`Sheets append failed (${o.status}): ${d}`)}return{updatedCells:((l=(await o.json()).updates)==null?void 0:l.updatedCells)||a.length}}async createSpreadsheet(t,r){const a=await this.authHeaders(),n={properties:{title:t},sheets:r&&r.length>0?r.map(i=>({properties:{title:i}})):[{properties:{title:"Sheet1"}}]},s=await fetch(Pe,{method:"POST",headers:a,body:JSON.stringify(n)});if(!s.ok){const i=await s.text();throw new Error(`Sheets create failed (${s.status}): ${i}`)}const o=await s.json();return{spreadsheetId:o.spreadsheetId,url:`https://docs.google.com/spreadsheets/d/${o.spreadsheetId}/edit`}}async getMetadata(t){const r=await this.authHeaders(),a=await fetch(`${Pe}/${t}?fields=properties.title,sheets.properties.title`,{headers:r});if(!a.ok){const s=await a.text();throw new Error(`Sheets metadata failed (${a.status}): ${s}`)}const n=await a.json();return{title:n.properties.title,sheets:n.sheets.map(s=>s.properties.title)}}}const He="https://www.googleapis.com/calendar/v3";class It{constructor(t,r,a,n,s){this.db=t,this.userId=r,this.pinHash=a,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await $e(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listEvents(t="primary",r={}){const a=await this.authHeaders(),n=new URLSearchParams;r.timeMin&&n.set("timeMin",r.timeMin),r.timeMax&&n.set("timeMax",r.timeMax),n.set("maxResults",String(r.maxResults||20)),n.set("singleEvents","true"),n.set("orderBy","startTime"),r.query&&n.set("q",r.query);const s=await fetch(`${He}/calendars/${encodeURIComponent(t)}/events?${n}`,{headers:a});if(!s.ok){const i=await s.text();throw new Error(`Calendar list failed (${s.status}): ${i}`)}return(await s.json()).items||[]}async createEvent(t="primary",r){var i;const a=await this.authHeaders(),n=r.timeZone||"Asia/Kolkata",s={summary:r.summary,description:r.description||"",location:r.location||"",start:{dateTime:r.startDateTime,timeZone:n},end:{dateTime:r.endDateTime,timeZone:n}};(i=r.attendees)!=null&&i.length&&(s.attendees=r.attendees.map(l=>({email:l})));const o=await fetch(`${He}/calendars/${encodeURIComponent(t)}/events`,{method:"POST",headers:a,body:JSON.stringify(s)});if(!o.ok){const l=await o.text();throw new Error(`Calendar create failed (${o.status}): ${l}`)}return await o.json()}async updateEvent(t="primary",r,a){const n=await this.authHeaders(),s=a.timeZone||"Asia/Kolkata",o={};a.summary&&(o.summary=a.summary),a.description&&(o.description=a.description),a.location&&(o.location=a.location),a.startDateTime&&(o.start={dateTime:a.startDateTime,timeZone:s}),a.endDateTime&&(o.end={dateTime:a.endDateTime,timeZone:s});const i=await fetch(`${He}/calendars/${encodeURIComponent(t)}/events/${r}`,{method:"PATCH",headers:n,body:JSON.stringify(o)});if(!i.ok){const l=await i.text();throw new Error(`Calendar update failed (${i.status}): ${l}`)}return await i.json()}async deleteEvent(t="primary",r){const a=await this.authHeaders(),n=await fetch(`${He}/calendars/${encodeURIComponent(t)}/events/${r}`,{method:"DELETE",headers:a});if(!n.ok&&n.status!==410){const s=await n.text();throw new Error(`Calendar delete failed (${n.status}): ${s}`)}}async listCalendars(){const t=await this.authHeaders(),r=await fetch(`${He}/users/me/calendarList`,{headers:t});if(!r.ok){const n=await r.text();throw new Error(`Calendar list calendars failed (${r.status}): ${n}`)}return((await r.json()).items||[]).map(n=>({id:n.id,summary:n.summary,primary:n.primary||!1}))}}const Qe="https://docs.googleapis.com/v1/documents",Na="https://www.googleapis.com/drive/v3/files";class kr{constructor(t,r,a,n,s){this.db=t,this.userId=r,this.pinHash=a,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await $e(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async createDocument(t){const r=await this.authHeaders(),a=await fetch(Qe,{method:"POST",headers:r,body:JSON.stringify({title:t})});if(!a.ok){const s=await a.text();throw new Error(`Docs create failed (${a.status}): ${s}`)}const n=await a.json();return{documentId:n.documentId,url:`https://docs.google.com/document/d/${n.documentId}/edit`}}async readDocument(t){var o,i;const r=await this.authHeaders(),a=await fetch(`${Qe}/${t}`,{headers:r});if(!a.ok){const l=await a.text();throw new Error(`Docs read failed (${a.status}): ${l}`)}const n=await a.json();let s="";for(const l of((o=n.body)==null?void 0:o.content)||[])if(l.paragraph)for(const d of l.paragraph.elements)(i=d.textRun)!=null&&i.content&&(s+=d.textRun.content);return{title:n.title,content:s.trim()}}async appendText(t,r){const a=await this.authHeaders(),n=await fetch(`${Qe}/${t}`,{headers:a});if(!n.ok){const l=await n.text();throw new Error(`Docs read for append failed (${n.status}): ${l}`)}const s=await n.json(),o=s.body.content[s.body.content.length-1].endIndex-1,i=await fetch(`${Qe}/${t}:batchUpdate`,{method:"POST",headers:a,body:JSON.stringify({requests:[{insertText:{location:{index:o},text:r}}]})});if(!i.ok){const l=await i.text();throw new Error(`Docs append failed (${i.status}): ${l}`)}}async shareDocument(t,r,a="writer"){const n=await this.authHeaders(),s=await fetch(`${Na}/${t}/permissions`,{method:"POST",headers:n,body:JSON.stringify({type:"user",role:a,emailAddress:r})});if(!s.ok){const o=await s.text();throw new Error(`Share failed (${s.status}): ${o}`)}}}class Z{constructor(t,r,a,n,s){T(this,"sheets");T(this,"calendar");T(this,"docs");T(this,"db");T(this,"userId");T(this,"pinHash");this.db=t,this.userId=r,this.pinHash=a,this.sheets=new Tr(t,r,a,n,s),this.calendar=new It(t,r,a,n,s),this.docs=new kr(t,r,a,n,s)}async isConnected(){return St(this.db,this.userId,this.pinHash)}}const et=Object.freeze(Object.defineProperty({__proto__:null,GoogleCalendar:It,GoogleDocs:kr,GoogleServices:Z,GoogleSheets:Tr,completeOAuthFlow:_r,disconnectGoogle:Er,exchangeCodeForTokens:br,fetchUserInfo:wr,generateAuthUrl:yr,getGoogleAuth:$e,isGoogleConnected:St,isOAuthClientConfigured:xr},Symbol.toStringTag,{value:"Module"}));async function Ma(e,t,r={}){const a={textQuery:t,languageCode:"en",pageSize:8};if(r.type&&(a.includedType=r.type),r.location){const l=r.location.split(",").map(Number);l.length===2&&!isNaN(l[0])&&!isNaN(l[1])&&(a.locationBias={circle:{center:{latitude:l[0],longitude:l[1]},radius:r.radius||5e3}})}const n=["places.displayName","places.formattedAddress","places.rating","places.userRatingCount","places.priceLevel","places.currentOpeningHours","places.types","places.id","places.location","places.googleMapsUri"].join(","),s=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":e,"X-Goog-FieldMask":n},body:JSON.stringify(a)});if(!s.ok){const l=await s.text();return{results:[],error:`Places API error (${s.status}): ${l.substring(0,200)}`}}const o=await s.json();return!o.places||o.places.length===0?{results:[]}:{results:o.places.map(l=>{var d,u,p;return{name:((d=l.displayName)==null?void 0:d.text)||"",address:l.formattedAddress||"",rating:l.rating,userRatingsTotal:l.userRatingCount,priceLevel:l.priceLevel,openNow:(u=l.currentOpeningHours)==null?void 0:u.openNow,types:(p=l.types)==null?void 0:p.slice(0,5),placeId:l.id||"",location:l.location?{lat:l.location.latitude,lng:l.location.longitude}:void 0,googleMapsUri:l.googleMapsUri}})}}async function $a(e,t){var s,o,i;const r=["displayName","formattedAddress","internationalPhoneNumber","websiteUri","rating","reviews","currentOpeningHours","location","googleMapsUri"].join(","),a=await fetch(`https://places.googleapis.com/v1/places/${t}`,{method:"GET",headers:{"X-Goog-Api-Key":e,"X-Goog-FieldMask":r}});if(!a.ok){const l=await a.text();return{error:`Place Details API error (${a.status}): ${l.substring(0,200)}`}}const n=await a.json();return{details:{name:((s=n.displayName)==null?void 0:s.text)||"",address:n.formattedAddress||"",phone:n.internationalPhoneNumber,website:n.websiteUri,rating:n.rating,reviews:(o=n.reviews)==null?void 0:o.slice(0,3).map(l=>{var d,u,p;return{author:((d=l.authorAttribution)==null?void 0:d.displayName)||"Anonymous",rating:l.rating||0,text:((p=(u=l.text)==null?void 0:u.text)==null?void 0:p.substring(0,200))||"",time:l.relativePublishTimeDescription||""}}),openingHours:(i=n.currentOpeningHours)==null?void 0:i.weekdayDescriptions,location:n.location?{lat:n.location.latitude,lng:n.location.longitude}:void 0,googleMapsUri:n.googleMapsUri}}}async function Ba(e,t,r,a={}){var d;const n=new URLSearchParams({origin:t,destination:r,key:e,mode:a.mode||"driving"});(a.mode==="driving"||!a.mode)&&n.set("departure_time","now");const s=await fetch(`https://maps.googleapis.com/maps/api/directions/json?${n}`);if(!s.ok)return{error:`Directions API error: ${s.status}`};const o=await s.json();if(o.status!=="OK")return{error:`Directions: ${o.status} — ${o.error_message||""}`};const i=o.routes[0],l=i.legs[0];return{route:{summary:i.summary,distance:l.distance.text,duration:l.duration.text,durationInTraffic:(d=l.duration_in_traffic)==null?void 0:d.text,steps:l.steps.slice(0,10).map(u=>{var p,g,b;return{instruction:((p=u.html_instructions)==null?void 0:p.replace(/<[^>]*>/g,""))||"",distance:((g=u.distance)==null?void 0:g.text)||"",duration:((b=u.duration)==null?void 0:b.text)||""}}),startAddress:l.start_address,endAddress:l.end_address}}}async function ja(e,t,r,a){var l,d;const n={q:t,target:r,key:e,format:"text"};a&&(n.source=a);const s=await fetch("https://translation.googleapis.com/language/translate/v2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){const u=await s.text();return{translatedText:"",error:`Translate API error (${s.status}): ${u.substring(0,200)}`}}const i=(d=(l=(await s.json()).data)==null?void 0:l.translations)==null?void 0:d[0];return i?{translatedText:i.translatedText,detectedSourceLang:i.detectedSourceLanguage}:{translatedText:"",error:"No translation returned."}}async function Pa(e,t){const r=new URLSearchParams({address:t,key:e}),a=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${r}`);if(!a.ok)return{results:[],error:`Geocoding API error: ${a.status}`};const n=await a.json();return n.status!=="OK"&&n.status!=="ZERO_RESULTS"?{results:[],error:`Geocoding: ${n.status} — ${n.error_message||""}`}:{results:(n.results||[]).slice(0,5).map(s=>{var o;return{address:s.formatted_address,lat:s.geometry.location.lat,lng:s.geometry.location.lng,placeId:s.place_id,types:(o=s.types)==null?void 0:o.slice(0,3)}})}}async function Ha(e,t,r={}){const a=new URLSearchParams({part:"snippet",q:t,key:e,type:r.type||"video",maxResults:String(r.maxResults||5),order:r.order||"relevance"}),n=await fetch(`https://www.googleapis.com/youtube/v3/search?${a}`);if(!n.ok){const o=await n.text();return{results:[],error:`YouTube API error (${n.status}): ${o.substring(0,200)}`}}return{results:((await n.json()).items||[]).map(o=>{var i,l,d,u,p,g,b,y;return{title:o.snippet.title,channelTitle:o.snippet.channelTitle,description:(i=o.snippet.description)==null?void 0:i.substring(0,200),videoId:((l=o.id)==null?void 0:l.videoId)||((d=o.id)==null?void 0:d.channelId)||((u=o.id)==null?void 0:u.playlistId)||"",publishedAt:o.snippet.publishedAt,url:(p=o.id)!=null&&p.videoId?`https://www.youtube.com/watch?v=${o.id.videoId}`:(g=o.id)!=null&&g.channelId?`https://www.youtube.com/channel/${o.id.channelId}`:"",thumbnailUrl:(y=(b=o.snippet.thumbnails)==null?void 0:b.medium)==null?void 0:y.url}})}}async function Dt(e,t={}){const r=Math.min(t.num||5,10),a=t.site?`site:${t.site} ${e}`:e;try{const n=new URLSearchParams({q:a}),s=await fetch(`https://html.duckduckgo.com/html/?${n}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(!s.ok)return{results:[],error:`Search request failed (${s.status})`};const o=await s.text(),i=[],l=o.split(/class="result results_links/g).slice(1);for(const d of l){if(i.length>=r)break;const u=d.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/),p=d.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);if(u){let g=u[1];const b=g.match(/uddg=([^&]+)/);b?g=decodeURIComponent(b[1]):g.startsWith("//")&&(g="https:"+g);const y=x=>x.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim(),w=y(u[2]),_=p?y(p[1]):"";if(w&&g.startsWith("http")){const x=g.replace(/^https?:\/\/(www\.)?/,"").split("/")[0];i.push({title:w,link:g,snippet:_,displayLink:x})}}}return i.length===0?{results:[],error:void 0}:{results:i}}catch(n){return{results:[],error:`Web search error: ${n.message}`}}}async function Ua(e,t,r,a="driving"){var l,d,u,p;const n=new URLSearchParams({origins:t,destinations:r,key:e,mode:a,departure_time:"now"}),s=await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${n}`);if(!s.ok)return{distance:"",duration:"",error:`Distance Matrix error: ${s.status}`};const o=await s.json(),i=(u=(d=(l=o.rows)==null?void 0:l[0])==null?void 0:d.elements)==null?void 0:u[0];return!i||i.status!=="OK"?{distance:"",duration:"",error:`No route found: ${(i==null?void 0:i.status)||o.status}`}:{distance:i.distance.text,duration:i.duration.text,durationInTraffic:(p=i.duration_in_traffic)==null?void 0:p.text}}const ee="https://gmail.googleapis.com/gmail/v1/users/me";class te{constructor(t,r,a,n,s){this.db=t,this.userId=r,this.pinHash=a,this.clientId=n,this.clientSecret=s}async authHeaders(){const{token:t}=await $e(this.db,this.userId,this.pinHash,this.clientId,this.clientSecret);return{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}async listMessages(t={}){var i;const r=await this.authHeaders(),a=new URLSearchParams;if(a.set("maxResults",String(t.maxResults||10)),t.query&&a.set("q",t.query),(i=t.labelIds)!=null&&i.length)for(const l of t.labelIds)a.append("labelIds",l);const n=await fetch(`${ee}/messages?${a}`,{headers:r});if(!n.ok){const l=await n.text();throw new Error(`Gmail list failed (${n.status}): ${l.substring(0,200)}`)}const s=await n.json();if(!s.messages||s.messages.length===0)return[];const o=[];for(const l of s.messages.slice(0,t.maxResults||10))try{const d=await this.getMessage(l.id,r);d&&o.push(d)}catch{}return o}async getMessage(t,r){const a=r||await this.authHeaders(),n=await fetch(`${ee}/messages/${t}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,{headers:a});if(!n.ok)return null;const s=await n.json(),o=i=>{var l,d,u;return((u=(d=(l=s.payload)==null?void 0:l.headers)==null?void 0:d.find(p=>p.name.toLowerCase()===i.toLowerCase()))==null?void 0:u.value)||""};return{id:s.id,threadId:s.threadId,snippet:s.snippet||"",subject:o("Subject")||"(no subject)",from:o("From"),to:o("To"),date:o("Date")||new Date(parseInt(s.internalDate)).toISOString(),isUnread:(s.labelIds||[]).includes("UNREAD"),labels:s.labelIds||[]}}async getMessageBody(t){const r=await this.authHeaders(),a=await fetch(`${ee}/messages/${t}?format=full`,{headers:r});if(!a.ok){const s=await a.text();throw new Error(`Gmail message body failed (${a.status}): ${s.substring(0,200)}`)}const n=await a.json();return Sr(n.payload)}async search(t,r=10){return this.listMessages({query:t,maxResults:r})}async send(t,r,a,n={}){const s=await this.authHeaders(),o=[`To: ${t}`,`Subject: ${r}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8"];n.cc&&o.push(`Cc: ${n.cc}`),n.bcc&&o.push(`Bcc: ${n.bcc}`),n.replyToMessageId&&(o.push(`In-Reply-To: ${n.replyToMessageId}`),o.push(`References: ${n.replyToMessageId}`)),o.push("",a);const i=o.join(`\r
`),d={raw:btoa(unescape(encodeURIComponent(i))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};n.threadId&&(d.threadId=n.threadId);const u=await fetch(`${ee}/messages/send`,{method:"POST",headers:s,body:JSON.stringify(d)});if(!u.ok){const p=await u.text();throw new Error(`Gmail send failed (${u.status}): ${p.substring(0,200)}`)}return await u.json()}async createDraft(t,r,a){const n=await this.authHeaders(),o=[`To: ${t}`,`Subject: ${r}`,"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8","",a].join(`\r
`),i=btoa(unescape(encodeURIComponent(o))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),l=await fetch(`${ee}/drafts`,{method:"POST",headers:n,body:JSON.stringify({message:{raw:i}})});if(!l.ok){const d=await l.text();throw new Error(`Gmail draft failed (${l.status}): ${d.substring(0,200)}`)}return await l.json()}async markAsRead(t){const r=await this.authHeaders();await fetch(`${ee}/messages/${t}/modify`,{method:"POST",headers:r,body:JSON.stringify({removeLabelIds:["UNREAD"]})})}async modifyMessage(t,r){const a=await this.authHeaders();let n={};switch(r){case"archive":n={removeLabelIds:["INBOX"]};break;case"trash":n={addLabelIds:["TRASH"]};break;case"read":n={removeLabelIds:["UNREAD"]};break;case"unread":n={addLabelIds:["UNREAD"]};break;case"star":n={addLabelIds:["STARRED"]};break;case"unstar":n={removeLabelIds:["STARRED"]};break}const s=await fetch(`${ee}/messages/${t}/modify`,{method:"POST",headers:{...a,"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){const o=await s.text();throw new Error(`Failed to modify message: ${o}`)}return!0}async getUnreadCount(){const t=await this.authHeaders(),r=await fetch(`${ee}/labels/INBOX`,{headers:t});return r.ok&&(await r.json()).messagesUnread||0}async getProfile(){const t=await this.authHeaders(),r=await fetch(`${ee}/profile`,{headers:t});if(!r.ok)throw new Error("Failed to get Gmail profile");return await r.json()}}function Sr(e){var t,r,a;if(!e)return"";if((t=e.body)!=null&&t.data)return gt(e.body.data);if(e.parts){for(const n of e.parts)if(n.mimeType==="text/plain"&&((r=n.body)!=null&&r.data))return gt(n.body.data);for(const n of e.parts)if(n.mimeType==="text/html"&&((a=n.body)!=null&&a.data)){const s=gt(n.body.data);return Ga(s)}for(const n of e.parts)if(n.parts){const s=Sr(n);if(s)return s}}return e.snippet||""}function gt(e){const t=e.replace(/-/g,"+").replace(/_/g,"/");try{return decodeURIComponent(escape(atob(t)))}catch{return atob(t)}}function Ga(e){return e.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>/gi,`
`).replace(/<\/div>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\n{3,}/g,`

`).trim()}const za=8e3,Fa=8e3;async function Ir(e,t){try{const r=new AbortController,a=setTimeout(()=>r.abort(),Fa),n=await fetch(e,{signal:r.signal,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},redirect:"follow"});if(clearTimeout(a),!n.ok)return{text:"",error:`HTTP ${n.status}`};const s=n.headers.get("content-type")||"";if(!s.includes("text/html")&&!s.includes("text/plain")&&!s.includes("application/xhtml"))return{text:"",error:`Non-HTML content: ${s.split(";")[0]}`};const o=await n.text(),i=Wa(o);return i.length<50?{text:"",error:"Page has too little readable content"}:{text:i.substring(0,t||za)}}catch(r){return{text:"",error:r.name==="AbortError"?"Timeout":r.message}}}function Wa(e){let t=e;return t=t.replace(/<script[\s\S]*?<\/script>/gi,""),t=t.replace(/<style[\s\S]*?<\/style>/gi,""),t=t.replace(/<nav[\s\S]*?<\/nav>/gi,""),t=t.replace(/<footer[\s\S]*?<\/footer>/gi,""),t=t.replace(/<header[\s\S]*?<\/header>/gi,""),t=t.replace(/<aside[\s\S]*?<\/aside>/gi,""),t=t.replace(/<noscript[\s\S]*?<\/noscript>/gi,""),t=t.replace(/<!--[\s\S]*?-->/g,""),t=t.replace(/<\/?(p|div|br|h[1-6]|li|tr|blockquote|section|article)[^>]*>/gi,`
`),t=t.replace(/<li[^>]*>/gi,`
• `),t=t.replace(/<[^>]+>/g,""),t=t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(r,a)=>String.fromCharCode(parseInt(a))),t=t.replace(/[ \t]+/g," "),t=t.replace(/\n\s*\n/g,`

`),t=t.split(`
`).map(r=>r.trim()).filter(r=>r.length>0).join(`
`),t.trim()}async function Dr(e,t,r={}){const a=r.maxPages||(r.depth==="thorough"?5:3),n=r.maxResults||(r.depth==="thorough"?8:5),s=await Dt(e,{num:n,site:r.site});if(s.error)return{report:"",sources:[],pagesRead:0,error:`Search failed: ${s.error}`};if(s.results.length===0)return{report:`No web results found for "${e}".`,sources:[],pagesRead:0};const i=s.results.slice(0,a).map(async g=>{const b=await Ir(g.link);return{title:g.title,url:g.link,displayLink:g.displayLink,snippet:g.snippet,content:b.text,error:b.error}}),d=(await Promise.all(i)).filter(g=>g.content.length>50);if(d.length===0){const g=s.results.map((y,w)=>`[${w+1}] ${y.title}
${y.snippet}
Source: ${y.link}`).join(`

`);return{report:await $t(e,g,t,"snippets"),sources:s.results.map(y=>({title:y.title,url:y.link})),pagesRead:0}}const u=d.map((g,b)=>`--- SOURCE ${b+1}: ${g.title} (${g.displayLink}) ---
${g.content}
--- END SOURCE ${b+1} ---`).join(`

`);return{report:await $t(e,u,t,"full"),sources:d.map(g=>({title:g.title,url:g.url})),pagesRead:d.length}}async function $t(e,t,r,a){const s=`You are a research analyst. Your job is to synthesize web research into clear, actionable reports.

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

Write a synthesized research report answering the query above.`;try{return(await r.chat([{role:"system",content:s},{role:"user",content:o}],{temperature:.3,maxTokens:2048})).content||"Research synthesis failed — no response from LLM."}catch(i){return`Research synthesis error: ${i.message}. Raw search results were found but could not be analyzed.`}}const qa=Object.freeze(Object.defineProperty({__proto__:null,conductResearch:Dr,fetchPageContent:Ir},Symbol.toStringTag,{value:"Module"})),Ka=2e3,Ja=2e3,Cr=4;function ft(e){return Math.ceil(e.length/Cr)}function Bt(e,t){const r=t*Cr;return e.length<=r?e:e.slice(0,r)+`
[...truncated to fit token budget]`}const Or=[{name:"create_schedule",description:"Create a new scheduled/recurring task. Use this when the user wants reminders, periodic checks, or timed actions.",parameters:{type:"object",properties:{name:{type:"string",description:"Short name for the scheduled task"},description:{type:"string",description:"What this task does"},schedule_type:{type:"string",enum:["interval","daily","weekly","once"],description:'interval = every N minutes, daily = at a specific time (HH:MM), weekly = day of week at time (e.g. "Friday 17:00"), once = specific date and time (e.g. "2026-03-12 14:30")'},schedule_value:{type:"string",description:'interval: mins (e.g. "30"). daily: HH:MM. weekly: Day HH:MM (e.g. "Friday 17:00"). once: YYYY-MM-DD HH:MM'},action_type:{type:"string",enum:["reminder","check_mail","check_calendar","check_sheet","custom"],description:"What action to perform"},action_description:{type:"string",description:"Detailed description of what the action should do"}},required:["name","schedule_type","schedule_value","action_type"]}},{name:"list_schedules",description:"List all scheduled tasks for the current user. Shows active and paused tasks with their state.",parameters:{type:"object",properties:{include_disabled:{type:"boolean",description:"Whether to include disabled schedules. Default: true"}}}},{name:"toggle_schedule",description:"Enable or disable a scheduled task by its ID or name.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to toggle"},enabled:{type:"boolean",description:"true to enable, false to disable"}},required:["job_id","enabled"]}},{name:"update_schedule_state",description:'Update the state of a scheduled task. States: created, active, reminding, paused, completed. Use "completed" when the user confirms a reminder task is done.',parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job"},state:{type:"string",enum:["created","active","reminding","paused","completed"],description:"New state for the job"}},required:["job_id","state"]}},{name:"delete_schedule",description:"Permanently delete a scheduled task.",parameters:{type:"object",properties:{job_id:{type:"number",description:"The ID of the job to delete"}},required:["job_id"]}},{name:"store_memory",description:"Store a piece of information the user wants you to remember. Use for facts, preferences, decisions, or important context.",parameters:{type:"object",properties:{type:{type:"string",enum:["fact","preference","decision","context"],description:"Category of memory"},title:{type:"string",description:"Short title/key for this memory"},content:{type:"string",description:"The information to remember"},importance:{type:"number",description:"Importance 1-10, default 5. Use 8+ for critical info that should stay in working memory."}},required:["type","title","content"]}},{name:"search_memory",description:"Search your long-term memory for previously stored information about the user.",parameters:{type:"object",properties:{query:{type:"string",description:"Search query to find relevant memories"}},required:["query"]}},{name:"get_system_status",description:"Get current system status including active schedules, memory stats, provider usage, and health.",parameters:{type:"object",properties:{verbose:{type:"boolean",description:"Whether to include detailed provider stats. Default: false"}}}},{name:"read_sheet",description:'Read data from a Google Sheet. Requires Google account to be connected via OAuth. Returns cell values as rows. IMPORTANT: Do NOT guess the sheet tab name — just use a plain range like "A1:Z500" (no sheet name prefix). The API defaults to the first sheet. Only include a sheet name like "SheetName!A1:Z500" if you already know it from a previous call.',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)"},range:{type:"string",description:'Cell range — use plain range like "A1:Z500" to read all data. Do NOT prefix with "Sheet1!" unless you know the actual tab name.'}},required:["spreadsheet_id","range"]}},{name:"write_sheet",description:'Write or update data in a Google Sheet. Overwrites the specified range. Supports formulas (e.g., "=SUM(C2:C100)", "=SUMIF(B:B,"Groceries",C:C)").',parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Cell range in A1 notation (e.g., "Sheet1!A1:C3")'},values:{type:"array",description:'Array of row arrays, e.g. [["Name","Age"],["Ash","30"]]',items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"append_sheet",description:"Append new rows to the end of a Google Sheet. Data is added after the last row with content. Supports formulas. Use this to add new entries (expenses, logs, records) to an existing sheet.",parameters:{type:"object",properties:{spreadsheet_id:{type:"string",description:"The spreadsheet ID"},range:{type:"string",description:'Target sheet/range (e.g., "Sheet1!A:E", "errors!A:F")'},values:{type:"array",description:"Array of row arrays to append",items:{type:"array",items:{type:"string"}}}},required:["spreadsheet_id","range","values"]}},{name:"create_sheet",description:"Create a new Google Spreadsheet in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Name of the new spreadsheet"},sheet_names:{type:"array",description:'Tab names (e.g., ["Data", "Summary", "Errors"])',items:{type:"string"}},folder_name:{type:"string",description:"Optional: Drive folder name to place the spreadsheet in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"list_calendar_events",description:"List upcoming events from Google Calendar. Shows event title, time, location, and attendees.",parameters:{type:"object",properties:{calendar_id:{type:"string",description:`Calendar ID (default: "primary" for user's main calendar). Use an email address for other calendars.`},days_ahead:{type:"number",description:"Number of days to look ahead (default: 7)"},query:{type:"string",description:"Optional search query to filter events"}}}},{name:"create_calendar_event",description:"Create a new event on Google Calendar.",parameters:{type:"object",properties:{summary:{type:"string",description:"Event title"},description:{type:"string",description:"Event description"},location:{type:"string",description:"Event location"},start_datetime:{type:"string",description:'Start date/time in ISO format (e.g., "2026-02-16T14:00:00+05:30")'},end_datetime:{type:"string",description:"End date/time in ISO format"},calendar_id:{type:"string",description:'Calendar ID (default: "primary")'},attendees:{type:"array",description:"Email addresses of attendees",items:{type:"string"}}},required:["summary","start_datetime","end_datetime"]}},{name:"create_doc",description:"Create a new Google Document in the user's Google Drive. Can optionally place it in a specific folder. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{title:{type:"string",description:"Document title"},content:{type:"string",description:"Initial text content to write into the document"},folder_name:{type:"string",description:"Optional: Drive folder name to place the doc in. Creates the folder if it doesn't exist."}},required:["title"]}},{name:"read_doc",description:"Read the text content of a Google Document.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID (from URL: docs.google.com/document/d/{ID}/edit)"}},required:["document_id"]}},{name:"append_to_doc",description:"Append text content to an existing Google Document. Use this to add research results, notes, or any content to an existing doc without overwriting it.",parameters:{type:"object",properties:{document_id:{type:"string",description:"The document ID to append to"},content:{type:"string",description:"Text content to append to the document"}},required:["document_id","content"]}},{name:"gmail_list",description:"List recent Gmail messages from the inbox. Uses Google OAuth directly — fast and reliable, no browser needed. Returns sender, subject, snippet, and date. Requires Google account connected via OAuth.",parameters:{type:"object",properties:{max_results:{type:"number",description:"Number of messages to return (1-20). Default: 10"},query:{type:"string",description:'Optional Gmail search query to filter results (e.g., "is:unread", "from:john", "newer_than:1d")'}}}},{name:"gmail_read",description:"Read the full body of a specific Gmail message by its ID. Use after gmail_list to read a particular email.",parameters:{type:"object",properties:{message_id:{type:"string",description:"The Gmail message ID (from gmail_list results)"}},required:["message_id"]}},{name:"gmail_search",description:"Search Gmail with a query. Supports Gmail search syntax: from:, to:, subject:, has:attachment, is:unread, newer_than:, older_than:, label:, etc. Uses Google OAuth directly.",parameters:{type:"object",properties:{query:{type:"string",description:'Gmail search query (e.g., "from:boss subject:meeting newer_than:7d", "has:attachment is:unread")'},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"gmail_send",description:"Send an email via Gmail. Uses Google OAuth directly. The email is sent immediately from the user's Gmail account. Use with care — confirm with the user before sending.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"},cc:{type:"string",description:"CC recipients (comma-separated)"}},required:["to","subject","body"]}},{name:"gmail_draft",description:"Create a draft email in Gmail. The draft is saved but NOT sent — user can review and send from Gmail. Preferred over gmail_send for composing messages.",parameters:{type:"object",properties:{to:{type:"string",description:"Recipient email address"},subject:{type:"string",description:"Email subject"},body:{type:"string",description:"Email body (plain text)"}},required:["to","subject","body"]}},{name:"gmail_unread_count",description:"Get the number of unread emails in Gmail inbox. Quick check — no message details.",parameters:{type:"object",properties:{label:{type:"string",description:"Gmail label to check. Default: INBOX"}}}},{name:"gmail_modify",description:"Modify an email in Gmail (archive, trash, mark as read, etc).",parameters:{type:"object",properties:{message_id:{type:"string",description:"The exact ID of the message to modify"},action:{type:"string",enum:["archive","trash","read","unread","star","unstar"],description:"The action to perform"}},required:["message_id","action"]}},{name:"drive_list",description:"List files in the user's Google Drive. Supports search queries. Returns file name, type, size, and last modified date.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "type:spreadsheet", "name contains report", "modifiedTime > 2026-01-01")'},max_results:{type:"number",description:"Number of files to return (1-30). Default: 10"},folder_id:{type:"string",description:"Optional folder ID to list contents of a specific folder"}}}},{name:"drive_search",description:"Search Google Drive for files by name or content. Returns file name, type, URL, and modification date.",parameters:{type:"object",properties:{query:{type:"string",description:"Search text to find in file names or contents"},max_results:{type:"number",description:"Number of results (1-20). Default: 10"}},required:["query"]}},{name:"web_search",description:"Search the web using DuckDuckGo. Returns titles, URLs, and snippets. Use for quick facts, links, current events, prices. Fast (~1s), no API key.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "latest iPhone release date", "best restaurants in Mumbai")'},num_results:{type:"number",description:"Number of results to return (1-10). Default: 5"},site:{type:"string",description:'Optional: restrict search to a specific site (e.g., "reddit.com", "stackoverflow.com")'}},required:["query"]}},{name:"read_url",description:"Fetch and read the text content of a single web page. Returns extracted readable text (no HTML). Use this when you need to read an article, documentation page, blog post, or any specific URL. Lighter than research — reads one page instead of many.",parameters:{type:"object",properties:{url:{type:"string",description:'The full URL to fetch and read (e.g., "https://docs.example.com/api-reference")'},max_length:{type:"number",description:"Maximum characters to return (default: 8000, max: 15000)"}},required:["url"]}},{name:"research",description:"Deep web research — searches, reads multiple pages, and synthesizes a report with sources. Use when user needs analysis, comparisons, fact-checking, or thorough answers. Returns a compiled report, not links. (~10-15s)",parameters:{type:"object",properties:{query:{type:"string",description:'Research question or topic (e.g., "Is Abacus AI good for agentic tool calls?", "Compare DeepSeek vs GPT-4o for coding")'},depth:{type:"string",enum:["quick","thorough"],description:"quick = 3 pages (~10s). thorough = 5 pages (~15s). Default: quick"},site:{type:"string",description:'Optional: restrict to a specific site (e.g., "github.com", "reddit.com")'}},required:["query"]}},{name:"search_places",description:"Search for places, businesses, restaurants, venues, stores, etc. using Google Places. Returns name, address, rating, and open/closed status. Great for finding nearby services, venues, or any real-world location.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "audio equipment stores near Nariman Point Mumbai", "Italian restaurants in Bandra")'},type:{type:"string",description:'Optional place type filter (e.g., "restaurant", "store", "hospital", "hotel", "gym")'}},required:["query"]}},{name:"get_place_details",description:"Get detailed information about a specific place — phone number, website, opening hours, reviews. Use after search_places to drill into a specific result.",parameters:{type:"object",properties:{place_id:{type:"string",description:"The place_id from a search_places result"}},required:["place_id"]}},{name:"get_directions",description:"Get driving/walking/transit directions between two locations. Returns distance, estimated time (with traffic), and step-by-step navigation.",parameters:{type:"object",properties:{origin:{type:"string",description:'Starting location (address, place name, or "lat,lng")'},destination:{type:"string",description:'Destination (address, place name, or "lat,lng")'},mode:{type:"string",enum:["driving","walking","transit","bicycling"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"get_travel_time",description:'Quick check for travel time and distance between two places. Faster than get_directions — use when the user just wants to know "how long" or "how far".',parameters:{type:"object",properties:{origin:{type:"string",description:"Starting location"},destination:{type:"string",description:"Destination"},mode:{type:"string",enum:["driving","walking","transit"],description:"Travel mode. Default: driving"}},required:["origin","destination"]}},{name:"translate_text",description:"Translate text between languages using Google Translate. Auto-detects source language if not specified. Supports 100+ languages.",parameters:{type:"object",properties:{text:{type:"string",description:"Text to translate"},target_language:{type:"string",description:'Target language code (e.g., "hi" for Hindi, "mr" for Marathi, "en" for English, "fr" for French, "ja" for Japanese, "de" for German, "es" for Spanish, "zh" for Chinese)'},source_language:{type:"string",description:"Optional source language code. If omitted, auto-detected."}},required:["text","target_language"]}},{name:"search_youtube",description:"Search YouTube for videos, channels, or playlists. Returns titles, channel names, descriptions, and links. Great for finding tutorials, music, gear reviews, or reference material.",parameters:{type:"object",properties:{query:{type:"string",description:'Search query (e.g., "Dante audio networking tutorial", "Sennheiser MD 421 review")'},max_results:{type:"number",description:"Number of results (1-10). Default: 5"},order:{type:"string",enum:["relevance","date","viewCount"],description:"Sort order. Default: relevance"}},required:["query"]}},{name:"geocode_address",description:"Convert an address to coordinates (lat/lng) or find the formatted address for a location. Useful for mapping and location context.",parameters:{type:"object",properties:{address:{type:"string",description:'Address or location to geocode (e.g., "NCPA Mumbai", "Juhu Beach")'}},required:["address"]}}];function Rr(e,t){const r=e.assistant_name||"Karna",a=e.personality_prompt?Bt(`## Personality Instructions
${e.personality_prompt}
`,Ka):"",n=Bt(t,Ja);return`You are ${r} — a personal AI assistant. You are intelligent, direct, and genuinely helpful. You speak with clarity and warmth, never robotic. Your name is ${r} — always refer to yourself by this name if asked.

## Your Core Identity
- You are a cloud-based personal assistant with memory, scheduling, and full Google Workspace integration (Sheets, Calendar, Docs, Drive, Gmail).
- You remember past conversations and learn from every interaction.
- You can create scheduled tasks, reminders, and recurring checks through natural conversation.

## Current User
- **Name**: ${e.name}
- **Username**: ${e.username}
- **Role**: ${e.role}
- **Timezone**: ${e.timezone}

${a}

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
1. **web_search** — Quick lookup (~1s). Returns titles, URLs, snippets. Use for: facts, links, news, prices, quick answers.
2. **read_url** — Read one page (~3-5s). Fetches and extracts text from a URL. Use for: reading articles, docs, blog posts, specific pages from search results.
3. **research** — Deep analysis (~10-15s). Searches, reads 3-5 pages, synthesizes a report with citations. Use for: "research X", "is X good for Y?", "compare A vs B", complex questions.

**Trigger words**: "research", "look into", "investigate", "analyze", "compare" → use **research**. "Search for", "find", "what is" → use **web_search**. "Read this page/article/link" → use **read_url**.

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
- To query data: use read_sheet to get all rows, then analyze/summarize the data yourself

### Location, Translation, YouTube
- search_places, get_place_details, get_directions, get_travel_time — places and navigation
- translate_text — 100+ languages
- search_youtube — videos, tutorials, reviews
- geocode_address — addresses to coordinates

### Response Style
- Be concise but human. Never robotic.
- Don't announce tool usage — just do it and present results naturally.
- If a tool fails, explain simply and suggest alternatives.
- When the user's request involves multiple steps, execute them all and present the combined result.
- When confirming ambiguity, be brief and offer the most likely option first: "Add Uber ₹700 to your Monthly Budget?" not a long explanation.
- After the user confirms a pattern, store it and never ask about that pattern again.

## Current Date & Time
${Ya(e.timezone)} (${e.timezone})
Note: Always use this date/time as the current time. Do NOT guess or use UTC.`}async function jt(e,t,r){var d;const n=await(await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(`name='${r.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`)}&fields=files(id,name)`,{headers:{Authorization:`Bearer ${e}`}})).json();let s;((d=n.files)==null?void 0:d.length)>0?s=n.files[0].id:s=(await(await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:r,mimeType:"application/vnd.google-apps.folder"})})).json()).id;const l=((await(await fetch(`https://www.googleapis.com/drive/v3/files/${t}?fields=parents`,{headers:{Authorization:`Bearer ${e}`}})).json()).parents||[]).join(",");return await fetch(`https://www.googleapis.com/drive/v3/files/${t}?addParents=${s}&removeParents=${l}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({})}),{folderId:s,folderName:r}}function Ya(e){try{const t=new Date;return new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(t)}catch{return new Date().toISOString()}}async function Ar(e,t,r,a,n,s,o,i,l,d,u){var g,b,y,w,_,x;const p=new me(r);switch(e){case"create_schedule":{const c=new Date;let h;const m=d||"UTC";if(t.schedule_type==="interval"){const f=parseInt(t.schedule_value,10);h=new Date(c.getTime()+f*60*1e3)}else if(t.schedule_type==="daily"){const[f,E]=t.schedule_value.split(":").map(Number),k=c.toLocaleString("en-US",{timeZone:m}),I=new Date(k),O=new Date(I);O.setHours(f,E,0,0),O<=I&&O.setDate(O.getDate()+1);const N=new Date(O.toLocaleString("en-US",{timeZone:"UTC"})),A=new Date(O.toLocaleString("en-US",{timeZone:m})),L=N.getTime()-A.getTime();h=new Date(O.getTime()+L)}else if(t.schedule_type==="weekly"){const[f,E]=t.schedule_value.split(" "),[k,I]=(E||"00:00").split(":").map(Number),N=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex($r=>$r.toLowerCase()===f.toLowerCase()),A=c.toLocaleString("en-US",{timeZone:m}),L=new Date(A),H=new Date(L);H.setHours(k,I,0,0);let K=(N-H.getDay()+7)%7;K===0&&H<=L&&(K=7),H.setDate(H.getDate()+K);const lt=new Date(H.toLocaleString("en-US",{timeZone:"UTC"})),dt=new Date(H.toLocaleString("en-US",{timeZone:m})),ct=lt.getTime()-dt.getTime();h=new Date(H.getTime()+ct)}else if(t.schedule_type==="once"){const[f,E]=t.schedule_value.split(" "),[k,I,O]=f.split("-").map(Number),[N,A]=(E||"00:00").split(":").map(Number),L=c.toLocaleString("en-US",{timeZone:m}),H=new Date(L),K=new Date(H);K.setFullYear(k,I-1,O),K.setHours(N,A,0,0);const lt=new Date(K.toLocaleString("en-US",{timeZone:"UTC"})),dt=new Date(K.toLocaleString("en-US",{timeZone:m})),ct=lt.getTime()-dt.getTime();h=new Date(K.getTime()+ct)}else h=new Date(c.getTime()+3600*1e3);return await r.prepare(`INSERT INTO cron_jobs (user_id, name, description, schedule_type, schedule_value, action_type, action_config, next_run, state)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`).bind(a,t.name,t.description||t.action_description||"",t.schedule_type,t.schedule_value,t.action_type,JSON.stringify({description:t.action_description||t.description||""}),h.toISOString()).run(),`Schedule created: "${t.name}" — ${t.schedule_type} at ${t.schedule_value}. State: active. Next run: ${h.toISOString()}`}case"list_schedules":{const h=(await r.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, next_run ASC").bind(a).all()).results||[];return h.length===0?"No scheduled tasks found.":h.map(m=>`[ID:${m.id}] ${m.enabled?"▶":"⏸"} "${m.name}" — [${m.schedule_type}] ${m.schedule_value} — ${m.action_type} — state: ${m.state||"active"} — next: ${m.next_run||"N/A"}`).join(`
`)}case"toggle_schedule":{const c=t.enabled?1:0,h=c?"active":"paused";return await r.prepare("UPDATE cron_jobs SET enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(c,h,t.job_id,a).run(),`Schedule ${t.job_id} ${c?"enabled (active)":"paused"}.`}case"update_schedule_state":{const c=["created","active","reminding","paused","completed"],h=t.state;if(!c.includes(h))return`Invalid state "${h}". Valid states: ${c.join(", ")}`;const m=h==="completed"||h==="paused"?0:1;return await r.prepare("UPDATE cron_jobs SET state = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(h,m,t.job_id,a).run(),`Schedule ${t.job_id} state updated to "${h}".`}case"delete_schedule":return await r.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(t.job_id,a).run(),`Schedule ${t.job_id} deleted.`;case"store_memory":{const c=t.importance||5,h=c>=7?"working":"long_term";return await p.store(a,t.type,t.title,t.content,c,h),`Stored in ${h==="working"?"working":"long-term"} memory: [${t.type}] ${t.title} (importance: ${c})`}case"search_memory":{const c=await p.search(a,t.query);return c.length===0?"No matching memories found.":c.map(h=>`[${h.tier||"long_term"}] [${h.type}] **${h.title}**: ${h.content}`).join(`
`)}case"get_system_status":{const c=await r.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(a).first(),h=await r.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(a).first(),m=await r.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND tier = 'working'").bind(a).first(),f=await r.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(a).first(),E=await r.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(a).first();return`System Status:
- Active schedules: ${(c==null?void 0:c.cnt)||0}
- Memory: ${(m==null?void 0:m.cnt)||0} working / ${(h==null?void 0:h.cnt)||0} total
- Total messages: ${(f==null?void 0:f.cnt)||0}
- Unread errors: ${(E==null?void 0:E.cnt)||0}`}case"read_sheet":{if(!n)return"Authentication context unavailable.";try{const c=new Z(r,a,n,s||"",o||"");let h=t.range,m;try{m=await c.sheets.readRange(t.spreadsheet_id,h)}catch(f){if((g=f.message)!=null&&g.includes("Unable to parse range")||(b=f.message)!=null&&b.includes("400")){const k=(await c.sheets.getMetadata(t.spreadsheet_id)).sheets[0],I=h.includes("!")?h.split("!")[1]:h;h=`${k}!${I}`,m=await c.sheets.readRange(t.spreadsheet_id,h)}else throw f}return m.length===0?"No data found in the specified range.":m.map(f=>f.join("	| ")).join(`
`)}catch(c){return await C(r,a,"google","read_sheet",c.message),`Failed to read sheet: ${c.message}`}}case"write_sheet":{if(!n)return"Authentication context unavailable.";try{return`Written ${(await new Z(r,a,n,s||"",o||"").sheets.writeRange(t.spreadsheet_id,t.range,t.values)).updatedCells} cells to ${t.range}.`}catch(c){return await C(r,a,"google","write_sheet",c.message),`Failed to write sheet: ${c.message}`}}case"append_sheet":{if(!n)return"Authentication context unavailable.";try{return`Appended ${(await new Z(r,a,n,s||"",o||"").sheets.appendRows(t.spreadsheet_id,t.range,t.values)).updatedCells} cells to ${t.range}.`}catch(c){return await C(r,a,"google","append_sheet",c.message),`Failed to append to sheet: ${c.message}`}}case"create_sheet":{if(!n)return"Authentication context unavailable.";try{const c=new Z(r,a,n,s||"",o||"");if(!(await c.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const m=await c.sheets.createSpreadsheet(t.title,t.sheet_names);let f="";if(t.folder_name)try{const{token:E}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(r,a,n,s||"",o||"");f=`
Folder: "${(await jt(E,m.spreadsheetId,t.folder_name)).folderName}"`}catch(E){f=`
(Could not move to folder "${t.folder_name}": ${E.message})`}try{await new me(r).store(a,"context",`Spreadsheet: ${t.title}`,`Spreadsheet ID: ${m.spreadsheetId} | URL: ${m.url} | Sheets: ${(t.sheet_names||["Sheet1"]).join(", ")}`,7,"working")}catch{}return`Spreadsheet created: "${t.title}"${f}
ID: ${m.spreadsheetId}
URL: ${m.url}`}catch(c){return await C(r,a,"google","create_sheet",c.message),`Failed to create spreadsheet: ${c.message}`}}case"list_calendar_events":{if(!n)return"Authentication context unavailable.";try{const c=new Z(r,a,n,s||"",o||""),h=t.calendar_id||"primary",m=t.days_ahead||7,f=new Date,E=new Date(f.getTime()+m*24*60*60*1e3),k=await c.calendar.listEvents(h,{timeMin:f.toISOString(),timeMax:E.toISOString(),query:t.query});return k.length===0?`No events found in the next ${m} days.`:k.map(I=>{var H;const O=I.start.dateTime||I.start.date||"TBD",N=I.end.dateTime||I.end.date||"",A=I.location?` 📍 ${I.location}`:"",L=((H=I.attendees)==null?void 0:H.map(K=>K.email).join(", "))||"";return`• ${I.summary} — ${O} to ${N}${A}${L?`
  Attendees: ${L}`:""}`}).join(`
`)}catch(c){return await C(r,a,"google","list_calendar",c.message),`Failed to list events: ${c.message}`}}case"create_calendar_event":{if(!n)return"Authentication context unavailable.";try{const c=new Z(r,a,n,s||"",o||""),h=t.calendar_id||"primary",m=await c.calendar.createEvent(h,{summary:t.summary,description:t.description,location:t.location,startDateTime:t.start_datetime,endDateTime:t.end_datetime,attendees:t.attendees});return`Event created: "${m.summary}"
ID: ${m.id}
Start: ${m.start.dateTime||m.start.date}`}catch(c){return await C(r,a,"google","create_event",c.message),`Failed to create event: ${c.message}`}}case"create_doc":{if(!n)return"Authentication context unavailable.";try{const c=new Z(r,a,n,s||"",o||"");if(!(await c.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" to sign in with your Google account first.';const m=await c.docs.createDocument(t.title);t.content&&await c.docs.appendText(m.documentId,t.content);let f="";if(t.folder_name)try{const{token:E}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(r,a,n,s||"",o||"");f=`
Folder: "${(await jt(E,m.documentId,t.folder_name)).folderName}"`}catch(E){f=`
(Could not move to folder "${t.folder_name}": ${E.message})`}try{await new me(r).store(a,"context",`Document: ${t.title}`,`Document ID: ${m.documentId} | URL: ${m.url}`,6,"working")}catch{}return`Document created: "${t.title}"${f}
ID: ${m.documentId}
URL: ${m.url}`}catch(c){return await C(r,a,"google","create_doc",c.message),`Failed to create document: ${c.message}`}}case"read_doc":{if(!n)return"Authentication context unavailable.";try{const h=await new Z(r,a,n,s||"",o||"").docs.readDocument(t.document_id);return`Document: "${h.title}"

${h.content}`}catch(c){return await C(r,a,"google","read_doc",c.message),`Failed to read document: ${c.message}`}}case"append_to_doc":{if(!n)return"Authentication context unavailable.";try{const c=new Z(r,a,n,s||"",o||"");if(!(await c.isConnected()).connected)return'Google account not connected. Please go to Settings → Keys → Google Workspace and click "Connect Google Account" first.';await c.docs.appendText(t.document_id,t.content);let m=t.document_id;try{m=(await c.docs.readDocument(t.document_id)).title}catch{}return`Content appended to "${m}".
URL: https://docs.google.com/document/d/${t.document_id}/edit`}catch(c){return await C(r,a,"google","append_to_doc",c.message),`Failed to append to document: ${c.message}`}}case"gmail_list":{if(!n)return"Authentication context unavailable.";try{const h=await new te(r,a,n,s||"",o||"").listMessages({maxResults:t.max_results||10,query:t.query});return h.length===0?"No messages found.":h.map((m,f)=>`${m.isUnread?"● ":"  "}${f+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(c){return await C(r,a,"gmail","list",c.message),(y=c.message)!=null&&y.includes("not connected")?c.message:`Gmail list error: ${c.message}`}}case"gmail_read":{if(!n)return"Authentication context unavailable.";try{const c=new te(r,a,n,s||"",o||""),h=await c.getMessage(t.message_id);if(!h)return"Message not found.";const m=await c.getMessageBody(t.message_id);return`**${h.subject}**
From: ${h.from}
To: ${h.to}
Date: ${h.date}

${m}`}catch(c){return await C(r,a,"gmail","read",c.message),`Gmail read error: ${c.message}`}}case"gmail_search":{if(!n)return"Authentication context unavailable.";try{const h=await new te(r,a,n,s||"",o||"").search(t.query,t.max_results||10);return h.length===0?`No results for: ${t.query}`:h.map((m,f)=>`${m.isUnread?"● ":"  "}${f+1}. **${m.subject}**
   From: ${m.from}
   Date: ${m.date}
   ${m.snippet}
   [id: ${m.id}]`).join(`

`)}catch(c){return await C(r,a,"gmail","search",c.message),`Gmail search error: ${c.message}`}}case"gmail_send":{if(!n)return"Authentication context unavailable.";try{const h=await new te(r,a,n,s||"",o||"").send(t.to,t.subject,t.body,{cc:t.cc});return`Email sent successfully to ${t.to}. Subject: "${t.subject}" [Message ID: ${h.id}]`}catch(c){return await C(r,a,"gmail","send",c.message),`Gmail send error: ${c.message}`}}case"gmail_draft":{if(!n)return"Authentication context unavailable.";try{const h=await new te(r,a,n,s||"",o||"").createDraft(t.to,t.subject,t.body);return`Draft created. To: ${t.to}, Subject: "${t.subject}" — Review and send from Gmail. [Draft ID: ${h.id}]`}catch(c){return await C(r,a,"gmail","draft",c.message),`Gmail draft error: ${c.message}`}}case"gmail_modify":{if(!n)return"Authentication context unavailable.";try{return await new te(r,a,n,s||"",o||"").modifyMessage(t.message_id,t.action),`Message ${t.message_id} successfully ${t.action}ed.`}catch(c){return await C(r,a,"gmail","modify",c.message),`Gmail modify error: ${c.message}`}}case"gmail_unread_count":{if(!n)return"Authentication context unavailable.";try{const h=await new te(r,a,n,s||"",o||"").getUnreadCount();return`You have ${h} unread email${h!==1?"s":""} in Gmail.`}catch(c){return(w=c.message)!=null&&w.includes("not connected")?c.message:`Gmail error: ${c.message}`}}case"drive_list":{if(!n)return"Authentication context unavailable.";try{const{token:c}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(r,a,n,s||"",o||""),h=new URLSearchParams;h.set("pageSize",String(t.max_results||10)),h.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),h.set("orderBy","modifiedTime desc");let m="";t.folder_id?m=`'${t.folder_id}' in parents and trashed = false`:t.query?m=`${t.query} and trashed = false`:m="trashed = false",h.set("q",m);const f=await fetch(`https://www.googleapis.com/drive/v3/files?${h}`,{headers:{Authorization:`Bearer ${c}`}});if(!f.ok)throw new Error(`Drive API error (${f.status})`);const E=await f.json();return(_=E.files)!=null&&_.length?E.files.map((k,I)=>{var L,H;const O=((L=k.mimeType)==null?void 0:L.split(".").pop())||k.mimeType,N=k.size?`${(parseInt(k.size)/1024).toFixed(1)} KB`:"",A=((H=k.modifiedTime)==null?void 0:H.split("T")[0])||"";return`${I+1}. **${k.name}** (${O})
   ${N} · Modified: ${A}
   ${k.webViewLink||""}`}).join(`

`):"No files found."}catch(c){return await C(r,a,"google","drive_list",c.message),`Drive list error: ${c.message}`}}case"drive_search":{if(!n)return"Authentication context unavailable.";try{const{token:c}=await(await Promise.resolve().then(()=>et)).getGoogleAuth(r,a,n,s||"",o||""),h=`fullText contains '${t.query.replace(/'/g,"\\'")}' and trashed = false`,m=new URLSearchParams;m.set("q",h),m.set("pageSize",String(t.max_results||10)),m.set("fields","files(id,name,mimeType,modifiedTime,size,webViewLink)"),m.set("orderBy","modifiedTime desc");const f=await fetch(`https://www.googleapis.com/drive/v3/files?${m}`,{headers:{Authorization:`Bearer ${c}`}});if(!f.ok)throw new Error(`Drive API error (${f.status})`);const E=await f.json();return(x=E.files)!=null&&x.length?E.files.map((k,I)=>{var A,L;const O=((A=k.mimeType)==null?void 0:A.split(".").pop())||k.mimeType,N=((L=k.modifiedTime)==null?void 0:L.split("T")[0])||"";return`${I+1}. **${k.name}** (${O}) — Modified: ${N}
   ${k.webViewLink||""}`}).join(`

`):`No files found for: "${t.query}"`}catch(c){return await C(r,a,"google","drive_search",c.message),`Drive search error: ${c.message}`}}case"web_search":try{const c=await Dt(t.query,{num:t.num_results||5,site:t.site});return c.error?`Web search failed: ${c.error}`:c.results.length===0?`No results found for "${t.query}".`:c.results.map((h,m)=>`${m+1}. **${h.title}**
   ${h.link}
   ${h.snippet}`).join(`

`)}catch(c){return await C(r,a,"search","web_search",c.message),`Web search error: ${c.message}`}case"read_url":try{const c=t.url;if(!c||!c.startsWith("http://")&&!c.startsWith("https://"))return"Invalid URL. Please provide a full URL starting with http:// or https://";const h=Math.min(t.max_length||8e3,15e3),{fetchPageContent:m}=await Promise.resolve().then(()=>qa),f=await m(c,h);return f.error?`Failed to read page: ${f.error}`:!f.text||f.text.length<20?`Page at ${c} returned no readable content.`:`Content from ${c} (${f.text.length} chars):

${f.text}`}catch(c){return await C(r,a,"search","read_url",c.message),`Read URL error: ${c.message}`}case"research":{if(!u)return"Research tool requires an LLM provider but none is available.";try{const c=await Dr(t.query,u,{depth:t.depth||"quick",site:t.site});if(c.error)return`Research failed: ${c.error}`;let h=c.report;return c.sources.length>0&&(h+=`

---
**Sources** (`+c.pagesRead+` pages read):
`,h+=c.sources.map((m,f)=>`[${f+1}] ${m.title}
    ${m.url}`).join(`
`)),h}catch(c){return await C(r,a,"research","research",c.message),`Research error: ${c.message}`}}case"search_places":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured. Add it in Settings → Keys → Google API Key.";const h=await M(c.encrypted_value,n),m=await Ma(h,t.query,{type:t.type});return m.error?`Places search failed: ${m.error}`:m.results.length===0?`No places found for "${t.query}".`:m.results.map((f,E)=>{const k=f.rating?` ★${f.rating} (${f.userRatingsTotal||0} reviews)`:"",I=f.openNow!==void 0?f.openNow?" · Open now":" · Closed":"",O=f.googleMapsUri?`
   ${f.googleMapsUri}`:"";return`${E+1}. **${f.name}**${k}${I}
   ${f.address}${O}
   [place_id: ${f.placeId}]`}).join(`

`)}catch(c){return await C(r,a,"google_api","search_places",c.message),`Places search error: ${c.message}`}}case"get_place_details":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const h=await M(c.encrypted_value,n),m=await $a(h,t.place_id);if(m.error)return`Details lookup failed: ${m.error}`;if(!m.details)return"No details found.";const f=m.details;let E=`**${f.name}**
📍 ${f.address}`;if(f.phone&&(E+=`
📞 ${f.phone}`),f.website&&(E+=`
🌐 ${f.website}`),f.rating&&(E+=`
★ ${f.rating}`),f.googleMapsUri&&(E+=`
📌 ${f.googleMapsUri}`),f.openingHours&&(E+=`

Opening Hours:
${f.openingHours.join(`
`)}`),f.reviews&&f.reviews.length>0){E+=`

Recent Reviews:`;for(const k of f.reviews)E+=`
— ${k.author} (★${k.rating}, ${k.time}): "${k.text}"`}return E}catch(c){return await C(r,a,"google_api","place_details",c.message),`Place details error: ${c.message}`}}case"get_directions":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const h=await M(c.encrypted_value,n),m=await Ba(h,t.origin,t.destination,{mode:t.mode||"driving"});if(m.error)return`Directions failed: ${m.error}`;if(!m.route)return"No route found.";const f=m.route;let E=`**${f.startAddress}** → **${f.endAddress}**
`;return E+=`📏 ${f.distance} · ⏱️ ${f.duration}`,f.durationInTraffic&&(E+=` (with traffic: ${f.durationInTraffic})`),E+=`
via ${f.summary}`,E+=`

Steps:`,f.steps.forEach((k,I)=>{E+=`
${I+1}. ${k.instruction} (${k.distance}, ${k.duration})`}),E}catch(c){return await C(r,a,"google_api","directions",c.message),`Directions error: ${c.message}`}}case"get_travel_time":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const h=await M(c.encrypted_value,n),m=await Ua(h,t.origin,t.destination,t.mode||"driving");if(m.error)return`Travel time lookup failed: ${m.error}`;let f=`${t.origin} → ${t.destination}: ${m.distance}, ${m.duration}`;return m.durationInTraffic&&(f+=` (with traffic: ${m.durationInTraffic})`),f}catch(c){return await C(r,a,"google_api","travel_time",c.message),`Travel time error: ${c.message}`}}case"translate_text":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const h=await M(c.encrypted_value,n),m=await ja(h,t.text,t.target_language,t.source_language);return m.error?`Translation failed: ${m.error}`:`[${m.detectedSourceLang||t.source_language||"auto"} → ${t.target_language}]

${m.translatedText}`}catch(c){return await C(r,a,"google_api","translate",c.message),`Translation error: ${c.message}`}}case"search_youtube":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const h=await M(c.encrypted_value,n),m=await Ha(h,t.query,{maxResults:t.max_results||5,order:t.order||"relevance"});return m.error?`YouTube search failed: ${m.error}`:m.results.length===0?`No YouTube results for "${t.query}".`:m.results.map((f,E)=>{var k;return`${E+1}. **${f.title}**
   ${f.channelTitle} · ${((k=f.publishedAt)==null?void 0:k.split("T")[0])||""}
   ${f.description}
   ${f.url}`}).join(`

`)}catch(c){return await C(r,a,"google_api","youtube_search",c.message),`YouTube search error: ${c.message}`}}case"geocode_address":{if(!n)return"Authentication context unavailable.";try{const c=await r.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(a,"google_api_key").first();if(!c)return"Google API Key not configured.";const h=await M(c.encrypted_value,n),m=await Pa(h,t.address);return m.error?`Geocoding failed: ${m.error}`:m.results.length===0?`Location not found: "${t.address}"`:m.results.map((f,E)=>`${E+1}. ${f.address}
   Coordinates: ${f.lat}, ${f.lng}`).join(`
`)}catch(c){return await C(r,a,"google_api","geocode",c.message),`Geocoding error: ${c.message}`}}default:return`Unknown tool: ${e}`}}async function Ct(e,t,r,a,n,s){var w;const o=new me(t),i=(w=e.metadata)==null?void 0:w.thread_id,l=await o.buildContext(a.id),d=await o.getRecentConversations(a.id,25,i),p=[{role:"system",content:Rr(a,l)},...d.map(_=>({role:_.role,content:_.content})),{role:"user",content:e.text}];await o.storeMessage(a.id,e.channel,"user",e.text,"{}",i);const g=10;let b="",y=0;for(let _=0;_<g;_++)try{const x=await r.chat(p,{tools:Or});if(x.usage&&(y+=x.usage.promptTokens+x.usage.completionTokens),x.toolCalls&&x.toolCalls.length>0){x.content&&p.push({role:"assistant",content:x.content});for(const c of x.toolCalls)try{const h=await Ar(c.name,c.arguments,t,a.id,a.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,a.timezone,r);p.push({role:"user",content:`[Tool Result for ${c.name}]: ${h}`})}catch(h){await C(t,a.id,"tool",c.name,h.message||"Tool execution failed"),p.push({role:"user",content:`[Tool Error for ${c.name}]: ${h.message||"Execution failed"}`})}continue}b=x.content;break}catch(x){if(n){const c=x.message||"",h=c.includes("401")||c.includes("403")||c.includes("authentication")||c.includes("credit balance"),m=c.includes("429"),f=h?1440:m?10:5;await n.recordError(r.name,c,f)}throw await C(t,a.id,"llm","provider_error",x.message||"Unknown LLM error",{provider:r.name,turn:_}),x}if(n&&y>0)try{await n.recordUsage(r.name,y)}catch{}return await o.storeMessage(a.id,e.channel,"assistant",b,"{}",i),await o.compactHistory(a.id,30),b}const Pt={"claude-sonnet-4-20250514":2e5,"claude-haiku-4-20250514":2e5,"gpt-4o":128e3,"gpt-4o-mini":128e3,"grok-3-mini":131072,"grok-3":131072,"deepseek-chat":64e3,"gemini-2.0-flash":1e6,default:32e3};function Va(e){for(const[t,r]of Object.entries(Pt))if(e.toLowerCase().includes(t.toLowerCase()))return r;return Pt.default}function Xa(e,t,r,a){const n=Va(a),s=Math.floor(n*.75),o=[];let i=0,l=!1;const d=ft(e);o.push({role:"system",content:e}),i+=d;const u=ft(r);i+=u;const p=s-i,g=[];let b=0;for(let y=t.length-1;y>=0;y--){const w=t[y],_=ft(w.content);if(b+_<=p)g.unshift({role:w.role,content:w.content}),b+=_;else{l=!0;break}}return o.push(...g),o.push({role:"user",content:r}),i+=b,{maxTokens:n,usedTokens:i,messages:o,wasTruncated:l}}async function*Za(e,t,r,a,n,s){var _;const o=new me(t),i=(_=e.metadata)==null?void 0:_.thread_id;yield{type:"thinking",data:{threadId:i,provider:r.name}};const l=await o.buildContext(a.id),d=await o.getRecentConversations(a.id,20,i),u=Rr(a,l),p=Xa(u,d,e.text,r.name);await o.storeMessage(a.id,e.channel,"user",e.text,"{}",i);const g=10;let b="",y=0;const w=[...p.messages];for(let x=0;x<g;x++)try{x>0&&(yield{type:"thinking",data:{threadId:i}});const c=await r.chat(w,{tools:Or});if(c.usage&&(y+=c.usage.promptTokens+c.usage.completionTokens),c.toolCalls&&c.toolCalls.length>0){c.content&&(yield{type:"chunk",data:{text:c.content,threadId:i}},w.push({role:"assistant",content:c.content}));for(const m of c.toolCalls){yield{type:"tool_start",data:{tool:m.name,toolArgs:m.arguments,threadId:i}};try{const f=await Ar(m.name,m.arguments,t,a.id,a.pin_hash,s==null?void 0:s.GOOGLE_CLIENT_ID,s==null?void 0:s.GOOGLE_CLIENT_SECRET,s==null?void 0:s.GOOGLE_API_KEY,s==null?void 0:s.GOOGLE_CSE_ID,a.timezone,r);yield{type:"tool_end",data:{tool:m.name,toolResult:f.substring(0,500)+(f.length>500?"...":""),threadId:i}},w.push({role:"user",content:`[Tool Result for ${m.name}]: ${f}`})}catch(f){await C(t,a.id,"tool",m.name,f.message||"Tool execution failed"),yield{type:"tool_end",data:{tool:m.name,toolResult:`Error: ${f.message||"Execution failed"}`,threadId:i}},w.push({role:"user",content:`[Tool Error for ${m.name}]: ${f.message||"Execution failed"}`})}}continue}b=c.content;const h=50;for(let m=0;m<b.length;m+=h)yield{type:"chunk",data:{text:b.substring(m,m+h),threadId:i}},m+h<b.length&&await new Promise(E=>setTimeout(E,10));break}catch(c){if(n){const h=c.message||"",m=h.includes("401")||h.includes("403")||h.includes("authentication")||h.includes("credit balance"),f=h.includes("429"),E=m?1440:f?10:5;await n.recordError(r.name,h,E)}await C(t,a.id,"llm","provider_error",c.message||"Unknown LLM error",{provider:r.name,turn:x}),yield{type:"error",data:{error:c.message||"An error occurred",threadId:i}};return}if(n&&y>0)try{await n.recordUsage(r.name,y)}catch{}await o.storeMessage(a.id,e.channel,"assistant",b,"{}",i),await o.compactHistory(a.id,30),yield{type:"done",data:{threadId:i,provider:r.name,tokenCount:y}}}const $=new he;async function Qa(e,t){var n;const r=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",r),await t()}$.use("/*",Qa);$.get("/threads",async e=>{const t=e.get("user"),r=e.req.query("archived")==="1",a=parseInt(e.req.query("limit")||"30"),n=await e.env.DB.prepare(`SELECT t.*, 
      (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
     FROM threads t
     WHERE t.user_id = ? AND t.is_archived = ?
     ORDER BY t.updated_at DESC
     LIMIT ?`).bind(t.id,r?1:0,a).all();return e.json({threads:n.results||[]})});$.post("/threads",async e=>{const t=e.get("user"),{title:r}=await e.req.json(),a=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,r||"New conversation").first();return e.json({thread:a})});$.put("/threads/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),a=await e.req.json(),n=[],s=[];return a.title!==void 0&&(n.push("title = ?"),s.push(a.title)),a.is_archived!==void 0&&(n.push("is_archived = ?"),s.push(a.is_archived?1:0)),n.push("updated_at = CURRENT_TIMESTAMP"),s.push(r,t.id),n.length<=1?e.json({error:"Nothing to update"},400):(await e.env.DB.prepare(`UPDATE threads SET ${n.join(", ")} WHERE id = ? AND user_id = ?`).bind(...s).run(),e.json({success:!0}))});$.delete("/threads/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM conversations WHERE thread_id = ? AND user_id = ?").bind(r,t.id).run(),await e.env.DB.prepare("DELETE FROM threads WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});$.post("/upload",async e=>e.json({error:"File upload is not available in this version."},404));$.post("/send",async e=>{const t=e.get("user"),{message:r,channel:a="web",thread_id:n,files:s}=await e.req.json();if(!r||typeof r!="string"||r.trim().length===0)return e.json({error:"Message is required"},400);let o="";if(s&&Array.isArray(s)&&s.length>0){o=`

[Attached files:
`;for(const d of s)o+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(o+=`
  Preview: ${d.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=n;if(!i){const d=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,r.trim().substring(0,60)+(r.trim().length>60?"...":"")).first();i=d==null?void 0:d.id}const l={userId:t.id,username:t.username,channel:a,text:r.trim()+o,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:d,rotation:u}=await Ve(e.env.DB,t.id,t.pin_hash),p=await Ct(l,e.env.DB,d,t,u,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID});return!n&&i?await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run():i&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),e.json({response:p,timestamp:new Date().toISOString(),channel:l.channel,provider:d.name,thread_id:i})}catch(d){console.error("Chat error:",d);const u=d.message||"";if(u.includes("No LLM provider configured"))return e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400);if(u.includes("All LLM providers failed"))return e.json({error:u,type:"no_provider",thread_id:i},400);if(u.includes("limit reached"))return e.json({error:u,type:"cost_limit",thread_id:i},429);const p=u.includes("401")||u.includes("403")||u.includes("authentication")||u.includes("credit balance")||u.includes("invalid")&&u.includes("key");try{const{logError:g}=await Promise.resolve().then(()=>wt);await g(e.env.DB,t.id,"llm","chat_error",u)}catch{}return e.json({error:p?"API key error — your provider returned an authentication or billing error. Check Settings → Keys to verify your API keys are valid.":"Something went wrong. I'll be back in a moment.",details:u,type:p?"no_provider":void 0,thread_id:i},p?400:500)}});function Ht(e){return`event: ${e.type}
data: ${JSON.stringify(e.data)}

`}$.post("/stream",async e=>{const t=e.get("user"),{message:r,channel:a="web",thread_id:n,files:s}=await e.req.json();if(!r||typeof r!="string"||r.trim().length===0)return e.json({error:"Message is required"},400);let o="";if(s&&Array.isArray(s)&&s.length>0){o=`

[Attached files:
`;for(const d of s)o+=`- ${d.name} (${d.type}, ${Math.round(d.size/1024)}KB, file_id: ${d.file_id})`,d.text_preview&&(o+=`
  Preview: ${d.text_preview.substring(0,300)}...`),o+=`
`;o+="Use parse_document tool to read full file contents. Use drive_upload to upload to Google Drive.]"}let i=n;if(!i){const d=await e.env.DB.prepare("INSERT INTO threads (user_id, title) VALUES (?, ?) RETURNING *").bind(t.id,r.trim().substring(0,60)+(r.trim().length>60?"...":"")).first();i=d==null?void 0:d.id}const l={userId:t.id,username:t.username,channel:a,text:r.trim()+o,sessionId:e.get("sessionId"),timestamp:new Date().toISOString(),metadata:{thread_id:i}};try{const{provider:d,rotation:u}=await Ve(e.env.DB,t.id,t.pin_hash),p=new ReadableStream({async start(g){const b=new TextEncoder;try{const y=Za(l,e.env.DB,d,t,u,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID});for await(const w of y)w.data.threadId||(w.data.threadId=i),g.enqueue(b.encode(Ht(w)));i&&await e.env.DB.prepare("UPDATE threads SET message_count = message_count + 2, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(i).run(),g.close()}catch(y){const w={type:"error",data:{error:y.message||"An error occurred",threadId:i}};g.enqueue(b.encode(Ht(w))),g.close()}}});return new Response(p,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Thread-Id":String(i||"")}})}catch(d){console.error("Stream setup error:",d);const u=d.message||"";return u.includes("No LLM provider configured")?e.json({error:"No AI provider configured. Please add at least one API key in Settings → Keys.",type:"no_provider",thread_id:i},400):u.includes("limit reached")?e.json({error:u,type:"cost_limit",thread_id:i},429):e.json({error:"Something went wrong setting up the stream.",details:u,thread_id:i},500)}});$.get("/threads/:id/messages",async e=>{var s;const t=e.get("user"),r=parseInt(e.req.param("id")),a=parseInt(e.req.query("limit")||"50"),n=await e.env.DB.prepare(`SELECT id, role, content, channel, created_at FROM conversations 
     WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,r,a).all();return e.json({messages:(n.results||[]).reverse(),total:((s=n.results)==null?void 0:s.length)||0})});$.get("/history",async e=>{var l;const t=e.get("user"),r=parseInt(e.req.query("limit")||"50"),a=parseInt(e.req.query("offset")||"0"),n=e.req.query("thread_id");let s,o;n?(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? AND thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[t.id,parseInt(n),r,a]):(s=`SELECT id, role, content, channel, thread_id, created_at FROM conversations 
             WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,o=[t.id,r,a]);const i=await e.env.DB.prepare(s).bind(...o).all();return e.json({messages:(i.results||[]).reverse(),total:((l=i.results)==null?void 0:l.length)||0})});$.delete("/history",async e=>{const t=e.get("user"),r=e.req.query("thread_id");return r?await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ? AND thread_id = ?").bind(t.id,parseInt(r)).run():await e.env.DB.prepare("DELETE FROM conversations WHERE user_id = ?").bind(t.id).run(),e.json({success:!0})});$.get("/dashboard",async e=>{const t=e.get("user");new Date().toISOString().split("T")[0];const[r,a,n,s,o,i]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM threads WHERE user_id = ? AND is_archived = 0").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(t.id).first(),e.env.DB.prepare(`SELECT t.*, (SELECT content FROM conversations WHERE thread_id = t.id AND role = 'user' ORDER BY created_at DESC LIMIT 1) as last_message
       FROM threads t WHERE t.user_id = ? AND t.is_archived = 0 ORDER BY t.updated_at DESC LIMIT 5`).bind(t.id).all(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(t.id).first()]);return e.json({threads:(r==null?void 0:r.cnt)||0,active_schedules:(a==null?void 0:a.cnt)||0,memories:(n==null?void 0:n.cnt)||0,recent_threads:s.results||[],provider_usage:[],unread_notifications:(o==null?void 0:o.cnt)||0,errors:(i==null?void 0:i.cnt)||0})});$.get("/gmail/unread",async e=>{const t=e.get("user");try{const r=e.env.GOOGLE_CLIENT_ID,a=e.env.GOOGLE_CLIENT_SECRET;if(!r||!a)return e.json({count:null,reason:"google_not_configured"});const s=await new te(e.env.DB,t.id,t.pin_hash,r,a).getUnreadCount();return e.json({count:s})}catch(r){return e.json({count:null,reason:r.message})}});$.get("/providers",async e=>e.json({stats:[],statusText:"Provider rotation active (in-memory)."}));$.get("/notifications/count",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0").bind(t.id).first();return e.json({count:(r==null?void 0:r.cnt)||0})});$.get("/notifications",async e=>{const t=e.get("user"),r=parseInt(e.req.query("limit")||"20"),a=await e.env.DB.prepare(`SELECT id, type, title, body, is_read, source, action_url, created_at 
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(t.id,r).all();return e.json({notifications:a.results||[]})});$.put("/notifications/:id/read",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});$.put("/notifications/read-all",async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0").bind(t.id).run(),e.json({success:!0})});$.delete("/notifications",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM notifications WHERE user_id = ? AND is_read = 1").bind(t.id).run(),e.json({success:!0})});const B=new he;async function en(e,t){var n;const r=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),await t()}B.use("/*",en);B.get("/profile",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t.id).first();return e.json({id:t.id,username:t.username,name:(r==null?void 0:r.name)||t.name,role:(r==null?void 0:r.role)||t.role,personality_prompt:(r==null?void 0:r.personality_prompt)||t.personality_prompt,telegram_chat_id:(r==null?void 0:r.telegram_chat_id)||t.telegram_chat_id,timezone:(r==null?void 0:r.timezone)||t.timezone,assistant_name:(r==null?void 0:r.assistant_name)||"Karna"})});B.put("/profile",async e=>{const t=e.get("user"),r=await e.req.json(),a=["name","personality_prompt","telegram_chat_id","timezone","role","assistant_name"],n=[],s=[];for(const o of a)r[o]!==void 0&&(n.push(`${o} = ?`),s.push(r[o]));return n.length===0?e.json({error:"No valid fields to update"},400):(n.push("updated_at = CURRENT_TIMESTAMP"),s.push(t.id),await e.env.DB.prepare(`UPDATE users SET ${n.join(", ")} WHERE id = ?`).bind(...s).run(),e.json({success:!0}))});const _t=["anthropic","openai","llm_slot_1","llm_slot_2","llm_slot_3","telegram_bot_token","google_oauth_tokens","google_api_key"];B.get("/credentials",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT id, service, label, created_at, updated_at FROM credentials WHERE user_id = ?").bind(t.id).all();return e.json({credentials:(r.results||[]).map(a=>({...a,configured:!0})),available_services:_t,llm_providers:ze})});B.put("/credentials",async e=>{const t=e.get("user"),{service:r,value:a,label:n}=await e.req.json();if(!r||!a)return e.json({error:"Service name and value are required"},400);if(!_t.includes(r))return e.json({error:`Invalid service. Must be one of: ${_t.join(", ")}`},400);const s=await kt(a,t.pin_hash);return await e.env.DB.prepare(`INSERT INTO credentials (user_id, service, label, encrypted_value) 
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, service) DO UPDATE SET 
       encrypted_value = excluded.encrypted_value,
       label = excluded.label,
       updated_at = CURRENT_TIMESTAMP`).bind(t.id,r,n||r,s).run(),e.json({success:!0,service:r})});B.delete("/credentials/:service",async e=>{const t=e.get("user"),r=e.req.param("service");return await e.env.DB.prepare("DELETE FROM credentials WHERE user_id = ? AND service = ?").bind(t.id,r).run(),e.json({success:!0})});B.get("/memory",async e=>{const t=e.get("user"),r=e.req.query("type"),n=await new me(e.env.DB).getAll(t.id,r||void 0,100);return e.json({memories:n})});B.post("/memory",async e=>{const t=e.get("user"),{type:r,title:a,content:n,importance:s}=await e.req.json();return!r||!a||!n?e.json({error:"Type, title, and content are required"},400):(await new me(e.env.DB).store(t.id,r,a,n,s||5),e.json({success:!0}))});B.delete("/memory/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await new me(e.env.DB).remove(r,t.id),e.json({success:!0})});B.get("/schedules",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT * FROM cron_jobs WHERE user_id = ? ORDER BY enabled DESC, created_at DESC").bind(t.id).all();return e.json({schedules:r.results||[]})});B.put("/schedules/:id/toggle",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),{enabled:a}=await e.req.json();return await e.env.DB.prepare("UPDATE cron_jobs SET enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?").bind(a?1:0,r,t.id).run(),e.json({success:!0})});B.delete("/schedules/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));return await e.env.DB.prepare("DELETE FROM cron_jobs WHERE id = ? AND user_id = ?").bind(r,t.id).run(),e.json({success:!0})});B.get("/errors",async e=>{const t=e.get("user"),r=await e.env.DB.prepare("SELECT * FROM error_log WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50").bind(t.id).all();return e.json({errors:r.results||[]})});B.delete("/errors",async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM error_log WHERE user_id = ? OR user_id IS NULL").bind(t.id).run(),e.json({success:!0})});B.post("/credentials/validate",async e=>{e.get("user");const{service:t,value:r}=await e.req.json();if(!t||!r)return e.json({error:"Service and value required"},400);switch(t){case"anthropic":try{const a=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":r,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1,messages:[{role:"user",content:"hi"}]})});return a.ok?e.json({valid:!0,message:"Anthropic API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid Anthropic API key."}):e.json({valid:!1,message:`Anthropic responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"openai":try{const a=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${r}`}});return a.ok?e.json({valid:!0,message:"OpenAI API key is valid."}):a.status===401?e.json({valid:!1,message:"Invalid OpenAI API key."}):e.json({valid:!1,message:`OpenAI responded with status ${a.status}.`})}catch(a){return e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"llm_slot_1":case"llm_slot_2":case"llm_slot_3":try{const a=JSON.parse(r);if(!a.provider||!a.apiKey)return e.json({valid:!1,message:"Missing provider or API key."});const n=ze[a.provider];if(!n)return e.json({valid:!1,message:`Unknown provider: ${a.provider}`});if(n.apiFormat==="anthropic"){const s=await fetch(n.apiBase+"/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:n.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return s.ok?e.json({valid:!0,message:`${n.label} API key is valid.`}):s.status===401?e.json({valid:!1,message:`Invalid ${n.label} API key.`}):e.json({valid:!1,message:`${n.label} responded with status ${s.status}.`})}else{const s=n.apiBase+(n.validatePath||"/v1/models"),o=await fetch(s,{headers:{Authorization:`Bearer ${a.apiKey}`}});if(o.ok)return e.json({valid:!0,message:`${n.label} API key is valid.`});if(o.status===401||o.status===403)return e.json({valid:!1,message:`Invalid ${n.label} API key.`});if(o.status===404)try{const i=await fetch(n.apiBase+"/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.apiKey}`},body:JSON.stringify({model:n.defaultModel,max_tokens:1,messages:[{role:"user",content:"hi"}]})});return i.ok||i.status===200?e.json({valid:!0,message:`${n.label} API key is valid.`}):i.status===401||i.status===403?e.json({valid:!1,message:`Invalid ${n.label} API key.`}):e.json({valid:!1,message:`${n.label} responded with status ${i.status}.`})}catch(i){return e.json({valid:!1,message:`${n.label} chat test failed: ${i.message}`})}return e.json({valid:!1,message:`${n.label} responded with status ${o.status}.`})}}catch(a){return a instanceof SyntaxError?e.json({valid:!1,message:"Invalid slot data format."}):e.json({valid:!1,message:`Connection failed: ${a.message}`})}case"google_oauth_client":return e.json({valid:!1,message:"Google OAuth client is now configured via environment variables, not Settings."});default:return e.json({valid:!0,message:"Saved (validation not available for this service)."})}});B.get("/google/status",async e=>{const t=e.get("user");try{const r=await St(e.env.DB,t.id,t.pin_hash),a=xr(e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.json({...r,oauth_client_configured:a})}catch(r){return e.json({connected:!1,error:r.message})}});B.get("/google/auth-url",async e=>{var t;e.get("user");try{const r=e.env.GOOGLE_CLIENT_ID,a=e.env.GOOGLE_CLIENT_SECRET;if(!r||!a)return e.json({error:"Google OAuth not configured. The deployer needs to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment secrets."},400);const n=new URL(e.req.url),s=`${n.protocol}//${n.host}/auth/google/callback`,o=btoa(JSON.stringify({sessionId:(t=e.req.header("Authorization"))==null?void 0:t.replace("Bearer ",""),ts:Date.now()})),i=yr(r,s,o);return e.json({auth_url:i,redirect_uri:s})}catch(r){return e.json({error:`Failed to generate auth URL: ${r.message}`},500)}});B.post("/google/disconnect",async e=>{const t=e.get("user");try{return await Er(e.env.DB,t.id),e.json({success:!0,message:"Google account disconnected."})}catch(r){return e.json({error:r.message},500)}});B.post("/google/test",async e=>{const t=e.get("user");try{const{token:r,email:a}=await $e(e.env.DB,t.id,t.pin_hash,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET),n=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&singleEvents=true&orderBy=startTime&timeMin="+new Date().toISOString(),{headers:{Authorization:`Bearer ${r}`}}),s=!0,o=n.ok;return e.json({success:!0,email:a,scopes:{sheets:s,calendar:o,docs:s,drive:s},message:o?`Connected as ${a} — all services working.`:`Connected as ${a} — calendar access issue (${n.status}).`})}catch(r){return e.json({success:!1,error:r.message})}});const Be=new he;Be.get("/health",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const r=Date.now()-t;return e.json({status:"ok",timestamp:new Date().toISOString(),db_latency_ms:r,version:"3.1.0"})}catch{return e.json({status:"error",error:"Database unreachable"},500)}});Be.post("/heartbeat",async e=>{try{const t=Date.now();await e.env.DB.prepare("SELECT 1").first();const r=Date.now()-t;return e.json({status:"ok",latency_ms:r})}catch(t){return e.json({status:"error",error:t.message},500)}});Be.get("/status",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare("SELECT s.user_id FROM sessions s WHERE s.id = ? AND s.expires_at > datetime('now')").bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const a=r.user_id,[n,s,o,i]=await Promise.all([e.env.DB.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(a).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(a).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM conversations WHERE user_id = ?").bind(a).first(),e.env.DB.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE (user_id = ? OR user_id IS NULL) AND acknowledged = 0").bind(a).first()]);return e.json({active_schedules:(n==null?void 0:n.cnt)||0,memory_entries:(s==null?void 0:s.cnt)||0,total_messages:(o==null?void 0:o.cnt)||0,unread_errors:(i==null?void 0:i.cnt)||0,heartbeat:{status:"ok"},version:"4.0.0"})});async function tn(e,t,r,a){try{const n=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t).first();if(!n)return;const s=await M(n.encrypted_value,n.pin_hash),o=4e3,i=a.length>o?a.substring(0,o-3)+"...":a;(await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:r,text:i,parse_mode:"Markdown"})})).ok||await fetch(`https://api.telegram.org/bot${s}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:r,text:i})})}catch{}}function Ut(e){const t=new Date().toLocaleString("en-US",{timeZone:e});return new Date(t)}Be.post("/cron/execute",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);const a=new Date,n=a.toISOString();try{await e.env.DB.prepare("INSERT INTO heartbeat_log (status, latency_ms, details) VALUES (?, ?, ?)").bind("ok",0,JSON.stringify({event:"cron_tick",ts:n})).run()}catch{}const s=await e.env.DB.prepare(`SELECT cj.*, u.telegram_chat_id, u.timezone as user_timezone
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.enabled = 1 AND cj.next_run <= ? AND (cj.state IS NULL OR cj.state != 'completed')`).bind(n).all(),o=[];for(const i of s.results||[])try{const l=i.user_timezone||"UTC";let d,u=!1,p=i.state||"active";if(i.schedule_type==="interval"){const y=parseInt(i.schedule_value,10);d=new Date(a.getTime()+y*60*1e3)}else if(i.schedule_type==="daily"){const[y,w]=i.schedule_value.split(":").map(Number),_=Ut(l),x=new Date(_);x.setHours(y,w,0,0),x<=_&&x.setDate(x.getDate()+1);const c=new Date(x.toLocaleString("en-US",{timeZone:"UTC"})),h=new Date(x.toLocaleString("en-US",{timeZone:l})),m=c.getTime()-h.getTime();d=new Date(x.getTime()+m)}else if(i.schedule_type==="weekly"){const[y,w]=i.schedule_value.split(" "),[_,x]=(w||"00:00").split(":").map(Number),h=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].findIndex(N=>N.toLowerCase()===y.toLowerCase()),m=Ut(l),f=new Date(m);f.setHours(_,x,0,0);let E=(h-f.getDay()+7)%7;E===0&&f<=m&&(E=7),f.setDate(f.getDate()+E);const k=new Date(f.toLocaleString("en-US",{timeZone:"UTC"})),I=new Date(f.toLocaleString("en-US",{timeZone:l})),O=k.getTime()-I.getTime();d=new Date(f.getTime()+O)}else i.schedule_type==="once"?(u=!0,p="completed",d=new Date(a.getTime()+365*24*60*60*1e3)):d=new Date(a.getTime()+3600*1e3);await e.env.DB.prepare("UPDATE cron_jobs SET last_run = ?, next_run = ?, enabled = ?, state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(n,d.toISOString(),u?0:i.enabled,p,i.id).run();const b=(JSON.parse(i.action_config||"{}").description||i.description)&&(i.action_type==="check_mail"||i.action_type==="check_calendar"||i.action_type==="check_sheet"||i.action_type==="custom");o.push({job_id:i.id,name:i.name,status:"dispatched",needs_agent:b,next_run:d.toISOString()})}catch(l){o.push({job_id:i.id,name:i.name,status:"error",error:l.message})}return e.json({executed:o.length,results:o,timestamp:n})});Be.post("/cron/run-task/:jobId",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);const a=parseInt(e.req.param("jobId"),10);if(!a)return e.json({error:"Invalid job ID"},400);const n=await e.env.DB.prepare(`SELECT cj.*, u.id as uid, u.name as user_name, u.username, u.pin_hash,
            u.role as user_role, u.personality_prompt, u.telegram_chat_id,
            u.timezone as user_timezone, u.assistant_name
     FROM cron_jobs cj JOIN users u ON cj.user_id = u.id
     WHERE cj.id = ?`).bind(a).first();if(!n)return e.json({error:"Job not found"},404);const o=JSON.parse(n.action_config||"{}").description||n.description||"",i="⏰ "+(n.name||"Scheduled Task"),l=new Date().toISOString();let d="";try{const g={id:n.user_id,username:n.username||"user",name:n.user_name||"User",pin_hash:n.pin_hash||"",role:n.user_role||"",personality_prompt:n.personality_prompt||"",telegram_chat_id:n.telegram_chat_id||"",timezone:n.user_timezone||"UTC",assistant_name:n.assistant_name||"Karna",created_at:"",updated_at:""},b={userId:n.user_id,username:g.username,channel:"web",text:`[Scheduled task "${n.name}"]: ${o}. Respond with a short, clean plain-text summary. No markdown headers, no bold markers. Use simple numbered lines.`,sessionId:"cron-"+n.id,timestamp:l},{provider:y,rotation:w}=await Ve(e.env.DB,n.user_id,n.pin_hash);d=await Ct(b,e.env.DB,y,g,w,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID})}catch(g){const b=g.message||"unknown error",y=b.includes("rate_limit")||b.includes("429")||b.includes("quota"),w=b.includes("timeout")||b.includes("Timeout");y?d="Couldn’t complete this task right now — API rate limit reached. Will run at next scheduled time.":w?d="Task timed out. Will retry at next scheduled time.":d="Task encountered an error. Will retry at next scheduled time.",await C(e.env.DB,n.user_id,"cron_agent","execution_error",b,{job_id:n.id})}const u=d||o||"Time for your scheduled task.",p=i+`
`+u;return await e.env.DB.prepare("INSERT INTO notifications (user_id, type, title, body, source, is_read) VALUES (?, ?, ?, ?, ?, 0)").bind(n.user_id,"reminder",i,u,"cron:"+n.id).run(),await e.env.DB.prepare("INSERT INTO conversations (user_id, channel, role, content, metadata) VALUES (?, ?, ?, ?, ?)").bind(n.user_id,"system","assistant",p,JSON.stringify({type:"cron",job_id:n.id})).run(),n.telegram_chat_id&&await tn(e.env.DB,n.user_id,n.telegram_chat_id,p),e.json({job_id:a,status:"completed",response_length:d.length})});function rn(e,t,r,a){return{userId:e,username:t,channel:"telegram",text:r,sessionId:`telegram-${a}`,timestamp:new Date().toISOString()}}function an(e,t){return e.replace(/\*\*(.*?)\*\*/g,"*$1*").replace(/#{1,3}\s/g,"*").replace(/```(\w*)\n([\s\S]*?)```/g,"```$2```")}const Xe=new he,nn=4e3;async function z(e,t,r,a="Markdown"){var s,o;const n=on(r,nn);for(const i of n)try{const l=await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:i,parse_mode:a,disable_web_page_preview:!1})});if(!l.ok){const d=await l.json().catch(()=>null);((s=d==null?void 0:d.description)!=null&&s.includes("parse")||(o=d==null?void 0:d.description)!=null&&o.includes("entities"))&&await fetch(`https://api.telegram.org/bot${e}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,text:i})})}}catch{}}async function sn(e,t){try{await fetch(`https://api.telegram.org/bot${e}/sendChatAction`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t,action:"typing"})})}catch{}}function on(e,t){if(e.length<=t)return[e];const r=[];let a=e;for(;a.length>0;){if(a.length<=t){r.push(a);break}let n=a.lastIndexOf(`
`,t);n<t*.3&&(n=a.lastIndexOf(" ",t)),n<t*.3&&(n=t),r.push(a.substring(0,n)),a=a.substring(n).trimStart()}return r}async function ln(e,t,r,a,n){switch(e.split("@")[0].toLowerCase()){case"/start":{const o=(a==null?void 0:a.name)||"there",i=(a==null?void 0:a.assistant_name)||"Karna",l=`👋 *Hello, ${o}!*

I'm ${i}, your personal AI assistant. You can talk to me just like you would on the web interface.

*Available commands:*
/help — Show available commands
/status — Check system status
/new — Start a fresh conversation

Just type normally to chat. Everything works — schedules, memory, Gmail, Google Workspace, and more.`+(a?"":`

⚠️ Your Telegram chat ID is *${t}*. Set this in Settings → Profile → Telegram Chat ID to link your account.`);return await z(r,t,l),!0}case"/help":{const i=`🛠 *${(a==null?void 0:a.assistant_name)||"Karna"} — Commands*

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

Just type naturally — I'll figure out the rest.`;return await z(r,t,i),!0}case"/status":{if(!a)return await z(r,t,"⚠️ Account not linked. Set your Telegram Chat ID in Settings on the web app."),!0;try{const[o,i,l,d]=await Promise.all([n.prepare("SELECT COUNT(*) as cnt FROM cron_jobs WHERE user_id = ? AND enabled = 1").bind(a.id).first(),n.prepare("SELECT COUNT(*) as cnt FROM memory WHERE user_id = ?").bind(a.id).first(),n.prepare("SELECT COUNT(DISTINCT date(created_at)) as cnt FROM conversations WHERE user_id = ?").bind(a.id).first(),n.prepare("SELECT COUNT(*) as cnt FROM error_log WHERE user_id = ? AND acknowledged = 0").bind(a.id).first()]),u=`📊 *System Status*

Active tasks: ${(o==null?void 0:o.cnt)||0}
Memories: ${(i==null?void 0:i.cnt)||0}
Conversation days: ${(l==null?void 0:l.cnt)||0}
Unresolved errors: ${(d==null?void 0:d.cnt)||0}

Status: ✅ Online`;await z(r,t,u)}catch{await z(r,t,"✅ Online — but had trouble fetching stats.")}return!0}case"/new":return a?(await n.prepare("UPDATE threads SET is_archived = 1 WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0").bind(a.id).run(),await z(r,t,"🆕 Starting fresh conversation. Your next message begins a new thread."),!0):(await z(r,t,"⚠️ Account not linked."),!0);default:return!1}}Xe.post("/webhook",async e=>{var t,r,a,n;try{const s=await e.req.json();if(s.callback_query)return await dn(e.env.DB,s.callback_query),e.json({ok:!0});const o=s.message;if(!(o!=null&&o.text)&&!(o!=null&&o.voice))return e.json({ok:!0});const i=String(o.chat.id);let l=o.text||"";const d=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(i).first();let u=null;if(d){const w=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(d.id,"telegram_bot_token").first();w&&(u=await M(w.encrypted_value,d.pin_hash))}if(!u){const w=await e.env.DB.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
         JOIN users u ON c.user_id = u.id 
         WHERE c.service = 'telegram_bot_token' LIMIT 1`).first();w&&(u=await M(w.encrypted_value,w.pin_hash))}if(!u)return e.json({ok:!0,message:"Bot token not configured"});if(l.startsWith("/")&&await ln(l,i,u,d,e.env.DB))return e.json({ok:!0});if(!d)return await z(u,i,`⚠️ Your account isn't linked yet.

Your Telegram Chat ID is: \`${i}\`

Go to the web app → Settings → Profile → set your Telegram Chat ID to this value.`),e.json({ok:!0});if(o.voice&&u&&d)try{await z(u,i,"🎤 Processing voice note...");const _=await(await fetch(`https://api.telegram.org/bot${u}/getFile?file_id=${o.voice.file_id}`)).json();if(_.ok&&((t=_.result)!=null&&t.file_path)){const c=await(await fetch(`https://api.telegram.org/file/bot${u}/${_.result.file_path}`)).blob();let h="",m="",f="whisper-1";const E=await e.env.DB.prepare("SELECT service, encrypted_value FROM credentials WHERE user_id = ? AND (service IN ('llm_slot_1', 'llm_slot_2', 'llm_slot_3', 'openai'))").bind(d.id).all();for(const N of E.results){const A=await M(N.encrypted_value,d.pin_hash);if(N.service==="openai"){h="https://api.openai.com/v1/audio/transcriptions",m=A;break}else if(N.service.startsWith("llm_slot_"))try{const L=JSON.parse(A);if(L.provider==="openai"){h="https://api.openai.com/v1/audio/transcriptions",m=L.apiKey;break}else if(L.provider==="groq"){h="https://api.groq.com/openai/v1/audio/transcriptions",m=L.apiKey,f="whisper-large-v3";break}}catch{}}if(!h)return await z(u,i,"⚠️ To use voice notes, configure an OpenAI API key in your LLM slots (Settings → Keys)."),e.json({ok:!0});const k=new FormData;k.append("file",c,"voice.ogg"),k.append("model",f);const I=await fetch(h,{method:"POST",headers:{Authorization:`Bearer ${m}`},body:k});if(!I.ok){const N=await I.text();return await z(u,i,`⚠️ Transcription failed: ${I.status} ${N}`),e.json({ok:!0})}l=(await I.json()).text,await z(u,i,`🗣️ *You said:* ${l}`)}}catch(w){return await z(u,i,`⚠️ Failed to process voice note: ${w.message}`),e.json({ok:!0})}if(!l)return e.json({ok:!0});await sn(u,i);let p=await e.env.DB.prepare("SELECT id FROM threads WHERE user_id = ? AND channel = 'telegram' AND is_archived = 0 ORDER BY updated_at DESC LIMIT 1").bind(d.id).first();p?await e.env.DB.prepare("UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(p.id).run():p={id:(await e.env.DB.prepare("INSERT INTO threads (user_id, title, channel) VALUES (?, 'Telegram', 'telegram')").bind(d.id).run()).meta.last_row_id};const g=rn(d.id,d.username,l,i);g.metadata={thread_id:p.id};let b,y;try{const w=await Ve(e.env.DB,d.id,d.pin_hash);b=w.provider,y=w.rotation}catch(w){console.error("Telegram provider setup error:",w);const _=(r=w.message)!=null&&r.includes("No LLM provider")?`⚠️ No AI provider configured yet.

Go to the web app → Settings → Keys → add at least one API key (DeepSeek, Grok, Abacus AI, etc.).`:(a=w.message)!=null&&a.includes("Daily usage limit")?"⚠️ Daily usage limit reached. Your limit resets at midnight.":`⚠️ AI provider error: ${w.message||"Unknown error"}`;return await z(u,i,_),e.json({ok:!0})}try{const w=await Ct(g,e.env.DB,b,d,y,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET,GOOGLE_API_KEY:e.env.GOOGLE_API_KEY,GOOGLE_CSE_ID:e.env.GOOGLE_CSE_ID}),_=an(w,"telegram");await z(u,i,_||"(empty response)")}catch(w){console.error("Telegram agent error:",w);const _=(n=w.message)!=null&&n.includes("API error")?`⚠️ AI provider returned an error. The provider (${b.name}) may be temporarily unavailable. Your message was saved — try again shortly.`:`⚠️ Something went wrong processing your message. Error: ${(w.message||"Unknown").substring(0,200)}`;await z(u,i,_);try{const{logError:x}=await Promise.resolve().then(()=>wt);await x(e.env.DB,d.id,"telegram","agent_error",w.message||"Agent error",{provider:b.name})}catch{}}return e.json({ok:!0})}catch(s){console.error("Telegram webhook error:",s);try{const{logError:o}=await Promise.resolve().then(()=>wt);await o(e.env.DB,null,"telegram","webhook_error",s.message||"Unknown telegram error")}catch{}return e.json({ok:!0,error:s.message})}});Xe.post("/setup-webhook",async e=>{var l;const t=(l=e.req.header("Authorization"))==null?void 0:l.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const{webhook_url:a}=await e.req.json(),n=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r.user_id,"telegram_bot_token").first();if(!n)return e.json({error:"Telegram bot token not configured in Settings"},400);const s=await M(n.encrypted_value,r.pin_hash);if(!a){const u=await(await fetch(`https://api.telegram.org/bot${s}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})})).json();return e.json(u)}const i=await(await fetch(`https://api.telegram.org/bot${s}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:a,allowed_updates:["message"],drop_pending_updates:!1})})).json();return e.json(i)});Xe.get("/webhook-status",async e=>{var s,o,i,l,d,u;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r.user_id,"telegram_bot_token").first();if(!a)return e.json({configured:!1,error:"Bot token not set"});const n=await M(a.encrypted_value,r.pin_hash);try{const g=await(await fetch(`https://api.telegram.org/bot${n}/getWebhookInfo`)).json();return e.json({configured:!0,webhook_url:((o=g.result)==null?void 0:o.url)||"",has_webhook:!!((i=g.result)!=null&&i.url),pending_updates:((l=g.result)==null?void 0:l.pending_update_count)||0,last_error:((d=g.result)==null?void 0:d.last_error_message)||"",last_error_date:((u=g.result)==null?void 0:u.last_error_date)||null})}catch(p){return e.json({configured:!0,error:p.message})}});Xe.post("/detect-chat-id",async e=>{var s,o;const t=(s=e.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!t)return e.json({error:"Auth required"},401);const r=await e.env.DB.prepare(`SELECT s.user_id, u.pin_hash FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(t).first();if(!r)return e.json({error:"Invalid session"},401);const a=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?").bind(r.user_id,"telegram_bot_token").first();if(!a)return e.json({error:"Bot token not configured"},400);const n=await M(a.encrypted_value,r.pin_hash);try{const d=((o=(await(await fetch(`https://api.telegram.org/bot${n}/getWebhookInfo`)).json()).result)==null?void 0:o.url)||"";await fetch(`https://api.telegram.org/bot${n}/deleteWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({drop_pending_updates:!1})}),await new Promise(_=>setTimeout(_,500));const p=await(await fetch(`https://api.telegram.org/bot${n}/getUpdates?limit=10&timeout=0`)).json();d&&await fetch(`https://api.telegram.org/bot${n}/setWebhook`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:d,allowed_updates:["message"]})});const g=p.result||[];if(g.length===0)return e.json({found:!1,message:"No messages found. Send any message to your bot on Telegram first, then try again within 30 seconds."});const b=[],y=new Set;for(let _=g.length-1;_>=0;_--){const x=g[_].message;if(x&&x.chat){const c=String(x.chat.id);y.has(c)||(y.add(c),b.push({chat_id:c,name:[x.chat.first_name,x.chat.last_name].filter(Boolean).join(" ")||x.chat.title||"Unknown",username:x.chat.username||"",date:new Date((x.date||0)*1e3).toISOString()}))}}if(b.length===0)return e.json({found:!1,message:"No chat messages found in updates. Try sending a message to the bot and click detect again."});const w=b[0].chat_id;return await e.env.DB.prepare("UPDATE users SET telegram_chat_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(w,r.user_id).run(),e.json({found:!0,chat_id:w,name:b[0].name,all_chats:b,message:`Chat ID ${w} detected and saved to your profile.`})}catch(i){return e.json({error:`Detection failed: ${i.message}`},500)}});async function dn(e,t){var w;const{id:r,data:a,message:n,from:s}=t;if(!a||!n)return;const o=a.split(":");if(o[0]!=="briefing_toggle"||o.length<3)return;const i=o[1],l=parseInt(o[2]);if(!l||!i)return;const d=String(n.chat.id),u=await e.prepare("SELECT * FROM users WHERE telegram_chat_id = ?").bind(d).first();if(!u)return;const p=await e.prepare(`
    SELECT bi.* FROM briefing_items bi 
    JOIN briefings b ON bi.briefing_id = b.id 
    WHERE b.user_id = ? AND b.id = ? AND bi.item_key = ?
  `).bind(u.id,l,i).first();if(!p)return;const g=p.checked?0:1;await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ?
  `).bind(g,g,p.id).run();const b=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(u.id).first();if(!b)return;const y=await M(b.encrypted_value,b.pin_hash);if(await fetch(`https://api.telegram.org/bot${y}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:r,text:g?"✅ Checked!":"☐ Unchecked"})}),(w=n.reply_markup)!=null&&w.inline_keyboard){const _=n.reply_markup.inline_keyboard.map(x=>x.map(c=>{var h;if((h=c.callback_data)!=null&&h.includes(i)){const m=g?"✅":"☐",f=c.text.replace(/^[☐✅]\s*/,"");return{...c,text:`${m} ${f}`}}return c}));try{await fetch(`https://api.telegram.org/bot${y}/editMessageReplyMarkup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:d,message_id:n.message_id,reply_markup:{inline_keyboard:_}})})}catch{}}}function cn(e){const t=new Date,r=new Date(t.toLocaleString("en-US",{timeZone:e})),a=new Date(r);a.setDate(a.getDate()+1),a.setHours(0,0,0,0);const n=new Date(a);n.setHours(23,59,59,999);const s=a.toISOString().split("T")[0];return{start:a.toISOString(),end:n.toISOString(),dateStr:s}}async function un(e,t,r,a,n,s){try{return(await new It(e,t,r,a,n).listEvents("primary",{timeMin:s.start,timeMax:s.end,maxResults:50})).map(l=>{var d;return{id:l.id||`google-${Date.now()}`,title:l.summary||"Untitled Event",startTime:l.start.dateTime||l.start.date||"",endTime:l.end.dateTime||l.end.date||"",location:l.location,attendees:(d=l.attendees)==null?void 0:d.map(u=>u.displayName||u.email),source:"google"}})}catch(o){return console.error("Google Calendar fetch error:",o.message),[]}}async function pn(e,t,r,a,n){try{const s=new te(e,t,r,a,n),o=await s.listMessages({query:"is:unread",maxResults:50,labelIds:["INBOX"]}),i=await s.listMessages({query:"is:important is:unread",maxResults:10}),l={};for(const p of o){const g=p.from.split("<")[0].trim()||p.from;l[g]=(l[g]||0)+1}const d=Object.entries(l).sort(([,p],[,g])=>g-p).slice(0,5).map(([p])=>p),u=o.some(p=>p.subject.toLowerCase().includes("urgent")||p.subject.toLowerCase().includes("asap")||p.subject.toLowerCase().includes("immediately"));return{unreadCount:o.length,importantCount:i.length,topSenders:d,hasUrgent:u}}catch(s){return console.error("Gmail fetch error:",s.message),{unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1}}}async function mn(e,t){var r;try{const a=await e.prepare(`
      SELECT name, description, next_run 
      FROM cron_jobs 
      WHERE user_id = ? AND enabled = 1 AND state != 'completed'
      ORDER BY next_run ASC
      LIMIT 10
    `).bind(t).all(),n=new Date,s=new Date(n);s.setDate(s.getDate()+1);const o=(a.results||[]).map(l=>l.name),i=(a.results||[]).filter(l=>new Date(l.next_run)<=s).length;return{pending:((r=a.results)==null?void 0:r.length)||0,dueToday:i,items:o}}catch(a){return console.error("Tasks fetch error:",a.message),{pending:0,dueToday:0,items:[]}}}async function hn(e){const t=e.length>0?e.slice(0,5):["AI","LLM","Tools","Agentic Workflows","AI Features"],r=[];for(const a of t){const n=`latest ${a} news today`;try{const s=await Dt(n,{num:3});if(s.results){for(const o of s.results.slice(0,2))if(!r.some(i=>i.url===o.link)&&(r.push({title:o.title,summary:o.snippet,url:o.link,source:o.displayLink}),r.length>=5))break}}catch(s){console.error(`News search error for "${n}":`,s.message)}if(r.length>=5)break}return r.slice(0,5)}function gn(e){const t=[];t.push(`📋 Evening Briefing for ${e.targetDate}`),t.push("");const r=e.calendar.totalCount;if(r>0){t.push(`📅 Tomorrow: ${r} event${r===1?"":"s"}`);for(const n of e.calendar.google.slice(0,5)){const s=n.startTime?new Date(n.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";t.push(`   • ${s} ${n.title}`)}}else t.push("📅 Tomorrow: No events scheduled");t.push("");const a=e.emails.gmail.unreadCount;if(a>0?(t.push(`📧 Gmail: ${a} unread`),e.emails.gmail.hasUrgent&&t.push("   ⚠️ Contains urgent messages")):t.push("📧 Gmail: Inbox clear"),t.push(""),e.tasks.pending>0?t.push(`✅ Tasks: ${e.tasks.pending} pending (${e.tasks.dueToday} due soon)`):t.push("✅ Tasks: All caught up"),t.push(""),e.news.items.length>0){t.push("🤖 AI News Today:");for(const n of e.news.items)t.push(`   • ${n.title.substring(0,80)}${n.title.length>80?"...":""}`)}return t.join(`
`)}function fn(e){const t=[];let r=0;for(const a of e.calendar.google)t.push({type:"calendar",key:a.id,text:`${a.title} - ${new Date(a.startTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,metadata:{event:a},sortOrder:r++});e.emails.gmail.unreadCount>0&&t.push({type:"email",key:"gmail-unread",text:`Review ${e.emails.gmail.unreadCount} unread Gmail messages`,metadata:{source:"gmail",count:e.emails.gmail.unreadCount},sortOrder:r++});for(const a of e.tasks.items)t.push({type:"task",key:`task-${a}`,text:a,metadata:{},sortOrder:r++});for(const a of e.news.items)t.push({type:"news",key:`news-${a.url}`,text:`📰 ${a.title}`,metadata:{url:a.url,source:a.source},sortOrder:r++});return t}async function vn(e,t){const r=await e.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t).first();if(!r)return{components:{google_calendar:!0,gmail:!0,tasks:!0,news:!0},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"]};let a;try{a=JSON.parse(r.components)}catch{a={google_calendar:!0,gmail:!0,tasks:!0,news:!0}}const n=r.news_topics?r.news_topics.split(",").map(s=>s.trim()).filter(Boolean):["AI","LLM","Tools","Agentic Workflows","AI Features"];return{components:a,newsTopics:n}}async function Lr(e,t,r){var x;const a=t.timezone||"Asia/Kolkata",n=cn(a),{components:s,newsTopics:o}=await vn(e,t.id),i=[],l=[];s.google_calendar&&(i.push(un(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET,n)),l.push("googleEvents")),s.gmail&&(i.push(pn(e,t.id,t.pin_hash,r.GOOGLE_CLIENT_ID,r.GOOGLE_CLIENT_SECRET)),l.push("gmailSummary")),s.tasks&&(i.push(mn(e,t.id)),l.push("tasks")),s.news&&(i.push(hn(o)),l.push("news"));const d=await Promise.all(i),u={};l.forEach((c,h)=>{u[c]=d[h]});const p={unreadCount:0,importantCount:0,topSenders:[],hasUrgent:!1},g={pending:0,dueToday:0,items:[]},b={generatedAt:new Date().toISOString(),targetDate:n.dateStr,calendar:{google:u.googleEvents||[],totalCount:((x=u.googleEvents)==null?void 0:x.length)||0},emails:{gmail:u.gmailSummary||p},tasks:u.tasks||g,news:{items:u.news||[],fetchedAt:new Date().toISOString()},summary:""};b.summary=gn(b);const y=fn(b),w=await e.prepare(`
    INSERT INTO briefings (user_id, briefing_type, content_json, channel)
    VALUES (?, 'evening', ?, 'all')
    RETURNING id
  `).bind(t.id,JSON.stringify(b)).first(),_=(w==null?void 0:w.id)||0;for(const c of y)await e.prepare(`
      INSERT INTO briefing_items (briefing_id, item_type, item_key, item_text, item_metadata, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(_,c.type,c.key,c.text,JSON.stringify(c.metadata),c.sortOrder).run();return{briefingId:_,content:b,items:y}}async function yn(e,t,r){const a=await e.prepare(`
    SELECT * FROM briefings WHERE id = ? AND user_id = ?
  `).bind(r,t).first();if(!a)return null;const n=await e.prepare(`
    SELECT * FROM briefing_items WHERE briefing_id = ? ORDER BY sort_order ASC
  `).bind(r).all();return{briefing:{...a,content:JSON.parse(a.content_json||"{}")},items:n.results||[]}}async function bn(e,t,r,a){if(!await e.prepare(`
    SELECT id FROM briefings WHERE id = ? AND user_id = ?
  `).bind(r,t).first())return null;const s=await e.prepare(`
    SELECT checked FROM briefing_items WHERE id = ? AND briefing_id = ?
  `).bind(a,r).first();if(!s)return null;const o=s.checked?0:1;return await e.prepare(`
    UPDATE briefing_items 
    SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
    WHERE id = ? AND briefing_id = ?
  `).bind(o,o,a,r).run(),{checked:o===1}}async function wn(e,t,r=10){return((await e.prepare(`
    SELECT b.*, 
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id) as item_count,
      (SELECT COUNT(*) FROM briefing_items WHERE briefing_id = b.id AND checked = 1) as checked_count
    FROM briefings b
    WHERE b.user_id = ?
    ORDER BY b.sent_at DESC
    LIMIT ?
  `).bind(t,r).all()).results||[]).map(n=>({...n,content:JSON.parse(n.content_json||"{}")}))}function xn(e,t,r=new Date){const a=new Date(r.toLocaleString("en-US",{timeZone:t})),n=a.getHours(),s=a.getMinutes(),[o,i]=e.split(":").map(Number),l=n*60+s,d=o*60+i;return l>=d&&l<d+5}function _n(e,t){const r=e.summary,a=[];for(const n of t.slice(0,10))a.push([{text:`☐ ${n.text.substring(0,40)}${n.text.length>40?"...":""}`,callback_data:`briefing_toggle:${n.key}`}]);return{text:r,inlineKeyboard:a}}const q=new he;async function Nr(e,t){var n;if(e.req.path.includes("/cron/"))return t();const r=(n=e.req.header("Authorization"))==null?void 0:n.replace("Bearer ","");if(!r)return e.json({error:"Authentication required"},401);const a=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(r).first();if(!a)return e.json({error:"Invalid session"},401);e.set("user",{id:a.user_id,username:a.username,name:a.name,pin_hash:a.pin_hash,role:a.role,personality_prompt:a.personality_prompt,telegram_chat_id:a.telegram_chat_id,timezone:a.timezone,assistant_name:a.assistant_name||"Karna",created_at:a.created_at,updated_at:a.updated_at}),e.set("sessionId",r),await t()}q.use("/*",Nr);q.get("/briefings",async e=>{const t=e.get("user"),r=parseInt(e.req.query("limit")||"10");try{const a=await wn(e.env.DB,t.id,r);return e.json({briefings:a})}catch(a){return e.json({error:a.message},500)}});q.get("/briefings/:id",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id"));try{const a=await yn(e.env.DB,t.id,r);return a?e.json(a):e.json({error:"Briefing not found"},404)}catch(a){return e.json({error:a.message},500)}});q.post("/briefings/:id/items/:itemId/toggle",async e=>{const t=e.get("user"),r=parseInt(e.req.param("id")),a=parseInt(e.req.param("itemId"));try{const n=await bn(e.env.DB,t.id,r,a);return n?e.json(n):e.json({error:"Item not found"},404)}catch(n){return e.json({error:n.message},500)}});q.post("/briefings/generate",async e=>{const t=e.get("user");try{const r=await Lr(e.env.DB,t,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});return e.json(r)}catch(r){return e.json({error:r.message},500)}});q.get("/briefing-preferences",async e=>{const t=e.get("user");try{const r=await e.env.DB.prepare("SELECT * FROM briefing_preferences WHERE user_id = ?").bind(t.id).first();if(!r){const n={briefingTime:"20:00",components:{google_calendar:!0,outlook_calendar:!0,gmail:!0,outlook_email:!0,tasks:!0,news:!0,weather:!1},newsTopics:["AI","LLM","Tools","Agentic Workflows","AI Features"],notificationChannels:{telegram:!0,web:!0},proactiveLevel:"moderate"};return e.json({preferences:n})}const a={briefingTime:r.briefing_time,components:JSON.parse(r.components),newsTopics:r.news_topics.split(",").map(n=>n.trim()).filter(Boolean),notificationChannels:JSON.parse(r.notification_channels),proactiveLevel:r.proactive_level};return e.json({preferences:a})}catch(r){return e.json({error:r.message},500)}});q.post("/briefing-preferences",async e=>{const t=e.get("user"),r=await e.req.json(),a=[];if(r.briefingTime&&(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(r.briefingTime)||a.push("Invalid time format. Use HH:MM (e.g., 20:00)")),r.newsTopics&&(r.newsTopics.length>5&&a.push("Maximum 5 news topics allowed"),r.newsTopics.some(n=>n.length>50)&&a.push("Each news topic must be 50 characters or less")),r.proactiveLevel&&!["conservative","moderate","aggressive"].includes(r.proactiveLevel)&&a.push("Invalid proactive level. Use conservative, moderate, or aggressive"),a.length>0)return e.json({error:a.join("; ")},400);try{const n=await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first(),s=r.components?JSON.stringify(r.components):null,o=r.notificationChannels?JSON.stringify(r.notificationChannels):null,i=r.newsTopics?r.newsTopics.join(", "):null;if(n){const l=[],d=[];r.briefingTime!==void 0&&(l.push("briefing_time = ?"),d.push(r.briefingTime)),s!==null&&(l.push("components = ?"),d.push(s)),i!==null&&(l.push("news_topics = ?"),d.push(i)),o!==null&&(l.push("notification_channels = ?"),d.push(o)),r.proactiveLevel!==void 0&&(l.push("proactive_level = ?"),d.push(r.proactiveLevel)),l.length>0&&(l.push("updated_at = CURRENT_TIMESTAMP"),d.push(t.id),await e.env.DB.prepare(`UPDATE briefing_preferences SET ${l.join(", ")} WHERE user_id = ?`).bind(...d).run())}else await e.env.DB.prepare(`
        INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(t.id,r.briefingTime||"20:00",s||'{"google_calendar":true,"gmail":true,"tasks":true,"news":true}',i||"AI, LLM, Tools, Agentic Workflows, AI Features",o||'{"telegram":true,"web":true}',r.proactiveLevel||"moderate").run();return e.json({success:!0})}catch(n){return e.json({error:n.message},500)}});q.post("/briefing-preferences/init-defaults",async e=>{const t=e.get("user");try{return await e.env.DB.prepare("SELECT id FROM briefing_preferences WHERE user_id = ?").bind(t.id).first()?e.json({success:!0,message:"Preferences already exist"}):(await e.env.DB.prepare(`
      INSERT INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
      VALUES (?, '20:00', '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}', 'AI, LLM, Tools, Agentic Workflows, AI Features', '{"telegram":true,"web":true}', 'moderate')
    `).bind(t.id).run(),e.json({success:!0,message:"Default preferences created"}))}catch(r){return e.json({error:r.message},500)}});q.post("/cron/evening-briefing",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);try{const a=await e.env.DB.prepare(`
      SELECT u.*, COALESCE(bp.briefing_time, '20:00') as briefing_time
      FROM users u
      LEFT JOIN briefing_preferences bp ON u.id = bp.user_id
    `).all(),n=[],s=new Date;for(const o of a.results||[]){const i=o.timezone||"Asia/Kolkata",l=o.briefing_time||"20:00";if(xn(l,i,s))try{const d=await Lr(e.env.DB,o,{GOOGLE_CLIENT_ID:e.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:e.env.GOOGLE_CLIENT_SECRET});if(o.telegram_chat_id){const{text:u,inlineKeyboard:p}=_n(d.content,d.items);await En(e.env.DB,o,u,p,d.briefingId)}n.push({user_id:o.id,status:"success",briefing_id:d.briefingId,briefing_time:l,timezone:i})}catch(d){n.push({user_id:o.id,status:"error",error:d.message})}}return e.json({executed:n.length,results:n})}catch(a){return e.json({error:a.message},500)}});q.post("/cron/meeting-reminders",async e=>{const t=e.req.header("X-Cron-Secret")||"",r=e.env.CRON_SECRET||"karna-cron-default-v1";if(t!==r)return e.json({error:"Unauthorized"},401);try{const a=await e.env.DB.prepare("SELECT * FROM users WHERE telegram_chat_id IS NOT NULL").all(),n=[],s=new Date,o=new Date(s.getTime()+600*1e3).toISOString(),i=new Date(s.getTime()+900*1e3).toISOString();for(const l of a.results||[])try{const d=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'google_oauth_tokens'").bind(l.id).first();if(!d)continue;const u=await M(d.encrypted_value,l.pin_hash),g=JSON.parse(u).access_token;if(!g)continue;const b=await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(s.toISOString())}&timeMax=${encodeURIComponent(i)}&maxResults=10`,{headers:{Authorization:`Bearer ${g}`}});if(!b.ok)continue;const w=((await b.json()).items||[]).filter(c=>{var m;const h=(m=c.start)==null?void 0:m.dateTime;return h?h>=s.toISOString()&&h<=o:!1});if(w.length===0){n.push({user_id:l.id,reminders_sent:0});continue}const _=await e.env.DB.prepare("SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = 'telegram_bot_token'").bind(l.id).first();if(!_)continue;const x=await M(_.encrypted_value,l.pin_hash);for(const c of w){const h=new Date(c.start.dateTime).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),m=c.location?`
📍 ${c.location}`:"",f=`⏰ Meeting in 10 minutes!

*${c.summary||"Untitled Event"}*
🕐 ${h}${m}`;await fetch(`https://api.telegram.org/bot${x}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:l.telegram_chat_id,text:f,parse_mode:"Markdown"})})}n.push({user_id:l.id,reminders_sent:w.length})}catch(d){n.push({user_id:l.id,status:"error",error:d.message})}return e.json({executed:n.length,results:n})}catch(a){return e.json({error:a.message},500)}});async function En(e,t,r,a,n){try{const s=await e.prepare(`SELECT c.encrypted_value, u.pin_hash FROM credentials c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.user_id = ? AND c.service = 'telegram_bot_token'`).bind(t.id).first();if(!s)return;const o=await M(s.encrypted_value,s.pin_hash);await fetch(`https://api.telegram.org/bot${o}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:t.telegram_chat_id,text:`🌙 *Evening Briefing*

${r}`,parse_mode:"Markdown",reply_markup:{inline_keyboard:a.map(i=>i.map(l=>({...l,callback_data:`${l.callback_data}:${n}`})))}})}),await e.prepare("UPDATE briefings SET delivered_telegram = 1 WHERE id = ?").bind(n).run()}catch(s){console.error("Telegram briefing error:",s.message)}}q.delete("/briefings/:id",Nr,async e=>{const t=e.get("user").id,r=e.req.param("id");return await e.env.DB.prepare("DELETE FROM briefings WHERE id = ? AND user_id = ?").bind(r,t).run(),e.json({success:!0})});const X=new he;X.use("/api/*",ba());X.route("/api/auth",ge);X.route("/api/chat",$);X.route("/api/settings",B);X.route("/api/system",Be);X.route("/api/telegram",Xe);X.route("/api/proactive",q);X.get("/auth/google/callback",async e=>{const t=new URL(e.req.url),r=t.searchParams.get("code"),a=t.searchParams.get("state"),n=t.searchParams.get("error");if(n)return e.html(ke(!1,`Google denied access: ${n}`));if(!r||!a)return e.html(ke(!1,"Missing authorization code or state parameter."));try{const o=JSON.parse(atob(a)).sessionId;if(!o)return e.html(ke(!1,"Invalid state parameter — missing session."));const i=await e.env.DB.prepare(`SELECT s.*, u.* FROM sessions s JOIN users u ON s.user_id = u.id 
       WHERE s.id = ? AND s.expires_at > datetime('now')`).bind(o).first();if(!i)return e.html(ke(!1,"Session expired. Please log in again and retry."));const l=i.user_id,d=i.pin_hash,u=`${t.protocol}//${t.host}/auth/google/callback`,p=await _r(e.env.DB,l,d,r,u,e.env.GOOGLE_CLIENT_ID,e.env.GOOGLE_CLIENT_SECRET);return e.html(ke(!0,`Connected as ${p.email}`,p.email))}catch(s){return e.html(ke(!1,`OAuth failed: ${s.message}`))}});X.get("/",e=>(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(cr())));X.get("*",e=>e.req.path.startsWith("/api/")?e.json({error:"Not found"},404):(e.header("Cache-Control","no-cache, no-store, must-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(cr())));function ke(e,t,r){return`<!DOCTYPE html>
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
</body></html>`}async function Tn(e,t,r){const a="https://karna-5xs.pages.dev",s={"Content-Type":"application/json","X-Cron-Secret":t.CRON_SECRET||"karna-cron-default-v1"};try{const i=await(await fetch(`${a}/api/system/cron/execute`,{method:"POST",headers:s})).json();if(i.results&&i.results.length>0){const d=i.results.filter(p=>p.needs_agent&&p.status==="dispatched");if(d.length>0){const p=d.map(g=>fetch(`${a}/api/system/cron/run-task/${g.job_id}`,{method:"POST",headers:s}).then(b=>b.json()).catch(b=>({job_id:g.job_id,error:b.message})));r.waitUntil(Promise.allSettled(p).then(g=>{console.log(`Cron: ${i.executed} dispatched, ${d.length} agent tasks`,JSON.stringify(g.map(b=>b.status==="fulfilled"?b.value:b.reason)))}))}const u=i.results.filter(p=>!p.needs_agent&&p.status==="dispatched");if(u.length>0){const p=u.map(g=>fetch(`${a}/api/system/cron/run-task/${g.job_id}`,{method:"POST",headers:s}).catch(()=>{}));r.waitUntil(Promise.allSettled(p))}}r.waitUntil(fetch(`${a}/api/proactive/cron/evening-briefing`,{method:"POST",headers:s}).then(d=>d.json()).then(d=>{d.executed>0&&console.log("Evening briefing result:",JSON.stringify(d))}).catch(d=>{console.error("Evening briefing error:",d.message)})),new Date().getMinutes()%5<2&&r.waitUntil(fetch(`${a}/api/proactive/cron/meeting-reminders`,{method:"POST",headers:s}).then(d=>d.json()).then(d=>{var u;(u=d.results)!=null&&u.some(p=>p.reminders_sent>0)&&console.log("Meeting reminders:",JSON.stringify(d))}).catch(()=>{}))}catch(o){console.error("Scheduled cron error:",o.message||o)}}const kn={fetch:X.fetch,scheduled:Tn},Gt=new he,Sn=Object.assign({"/src/index.tsx":kn});let Mr=!1;for(const[,e]of Object.entries(Sn))e&&(Gt.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Gt.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Mr=!0);if(!Mr)throw new Error("Can't import modules from ['/src/index.tsx']");export{Gt as default};
