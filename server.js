!function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="./",r(r.s=4)}([function(e,t){e.exports=require("express")},function(e,t,r){"use strict";var s=this&&this.__awaiter||function(e,t,r,s){return new(r||(r=Promise))((function(n,o){function u(e){try{a(s.next(e))}catch(e){o(e)}}function i(e){try{a(s.throw(e))}catch(e){o(e)}}function a(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,i)}a((s=s.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.logout=t.login=void 0;const o=n(r(3));t.logout=(e,t)=>{e.session.currentUser=void 0,t.sendStatus(200)};t.login=(e,t)=>s(void 0,void 0,void 0,(function*(){const r=e.body.code,s=e.session.currentUser;if(s)try{const{userID:e,authToken:r}=s,n={method:"GET",params:{method:"users.get",query:{user_ids:e,fields:"bdate",access_token:r}}};yield o.default.getMethodRequest(n).then(e=>{t.status(200).send(e.data.response[0])})}catch(e){t.sendStatus(403)}else{const s={method:"GET",params:{method:"",query:{client_id:process.env.VK_OAUTH_ID,client_secret:process.env.VK_OAUTH_SECRET,redirect_uri:process.env.REDIRECT_URL,code:r}}};try{const r=yield o.default.getAccessRequest(s).then(e=>e),{access_token:n,user_id:u}=r.data;e.session.currentUser={authToken:n,userID:u};const i={method:"GET",params:{method:"users.get",query:{user_ids:u,fields:"bdate",access_token:n}}};yield o.default.getMethodRequest(i).then(e=>{t.status(200).send(e.data.response[0])})}catch(e){t.sendStatus(403)}}}))},function(e,t,r){"use strict";var s=this&&this.__awaiter||function(e,t,r,s){return new(r||(r=Promise))((function(n,o){function u(e){try{a(s.next(e))}catch(e){o(e)}}function i(e){try{a(s.throw(e))}catch(e){o(e)}}function a(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,i)}a((s=s.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getGroupPosts=t.getCurrentUserData=void 0;const o=n(r(3));t.getCurrentUserData=(e,t)=>s(void 0,void 0,void 0,(function*(){const{userID:r,authToken:s}=e.session.currentUser,n={method:"GET",params:{method:"users.get",query:{user_ids:r,fields:"bdate",access_token:s}}};try{yield o.default.getMethodRequest(n).then(e=>{t.status(200).send(e.data.response[0])})}catch(e){t.status(403).send({error:"You are not authorized"})}}));t.getGroupPosts=(e,t)=>s(void 0,void 0,void 0,(function*(){const{userID:r,authToken:s}=e.session.currentUser,n={method:"GET",params:{method:"groups.get",query:{user_ids:r,access_token:s,count:"5"}}};try{const e=yield o.default.getMethodRequest(n).then(e=>e),u={method:"GET",params:{method:"wall.get",query:{owner_id:"-"+e.data.response.items[0],user_ids:r,access_token:s,count:"10"}}};yield o.default.getMethodRequest(u).then(e=>{t.status(200).send(e.data.response.items)})}catch(e){t.status(403).send({error:"You are not authorized"})}}))},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(12),o=s(r(13));t.default=new class{constructor(){this.methodUrl="https://api.vk.com/method",this.accessUrl="http://oauth.vk.com/access_token",this.getUrlWithQuery=({method:e,query:t,isAccess:r})=>{if(r){const e=new n.URL(""+this.accessUrl);for(let r in t)"code"!==r&&e.searchParams.append(r,t[r]);return`${e.href}/callback&code=${t.code}`}{const r=new n.URL(`${this.methodUrl}/${e}`);for(let e in t)r.searchParams.append(e,t[e]);return r.searchParams.append("v",process.env.API_VERSION),r.href}},this.getAccessRequest=({method:e,params:t,data:r})=>r?o.default({method:e,url:this.getUrlWithQuery(Object.assign(Object.assign({},t),{isAccess:!0})),data:r}):o.default({method:e,url:this.getUrlWithQuery(Object.assign(Object.assign({},t),{isAccess:!0}))}),this.getMethodRequest=({method:e,params:t,data:r})=>r?o.default({method:e,url:this.getUrlWithQuery(t),data:r}):o.default({method:e,url:this.getUrlWithQuery(t)})}}},function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(r(0)),o=r(5),u=s(r(6)),i=s(r(7)),a=s(r(8)),c=s(r(9)),d=s(r(10)),l=s(r(11)),f=s(r(14)),h=r(15);i.default.config();const p=n.default(),{PORT:_=5e3,SESSION_TIME:m,SESSION_NAME:g,SESSION_SECRET:v}=process.env,y=d.default.createServer(p);p.use(u.default.urlencoded({extended:!0})),p.use(a.default({name:g,resave:!1,saveUninitialized:!1,secret:v,cookie:{maxAge:Number(m),sameSite:!0,secure:!1}})),p.use(n.default.json()),p.use(c.default()),p.use("/api/auth",l.default),p.use("/api/user",f.default),p.use("/static",n.default.static(o.resolve(__dirname,"client/build/static"))),p.get("/callback",(e,t)=>{e.query&&e.query.code?t.sendFile(o.join(__dirname+"/client/build/index.html")):t.redirect("/login")}),p.get("/",h.redirectLogin,(e,t)=>{t.sendFile(o.join(__dirname+"/client/build/index.html"))}),p.get("/login",h.redirectHome,(e,t)=>{t.sendFile(o.join(__dirname+"/client/build/index.html"))}),y.listen(_,()=>{console.log("Server up and running")})},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("express-session")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("http")},function(e,t,r){"use strict";r.r(t);var s=r(1),n=r(0);const o=r.n(n).a.Router();o.post("/login",(e,t)=>Object(s.login)(e,t)),o.post("/logout",(e,t)=>Object(s.logout)(e,t)),t.default=o},function(e,t){e.exports=require("url")},function(e,t){e.exports=require("axios")},function(e,t,r){"use strict";r.r(t);var s=r(2),n=r(0);const o=r.n(n).a.Router();o.get("/",(e,t)=>Object(s.getCurrentUserData)(e,t)),o.get("/groups",(e,t)=>Object(s.getGroupPosts)(e,t)),t.default=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.redirectHome=t.redirectLogin=void 0;t.redirectLogin=(e,t,r)=>{const{currentUser:s}=e.session;s?r():t.redirect("/login")};t.redirectHome=(e,t,r)=>{const{currentUser:s}=e.session;s?t.redirect("/"):r()}}]);