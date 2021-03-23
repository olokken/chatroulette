(this.webpackJsonpklient=this.webpackJsonpklient||[]).push([[0],{131:function(e,n,t){"use strict";t.r(n);var r,c,o,i,a,s,u,d,l,h,b,j,f,g,x,p,m=t(0),O=t.n(m),w=t(9),v=t.n(w),k=(t(95),t(23)),y=t(44),C=(t(96),t(8)),D=t(13),S=t(14),E=t(164),I=t(165),R=t(4),T=S.a.div(r||(r=Object(D.a)(["\n  width: 30rem;\n  height: 28rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: #fff;\n  padding: 3rem;\n  border-radius: 8px;\n"]))),L=function(e){return Object(R.jsxs)(T,{children:[Object(R.jsx)("h1",{children:"Login"}),Object(R.jsx)("hr",{}),Object(R.jsx)(E.a,{style:{width:"100%",marginBottom:24},label:"Username",onChange:e.onChange,onKeyDown:e.onKeyDown,variant:"outlined"}),Object(R.jsx)(I.a,{style:{width:"100%"},variant:"contained",color:"secondary",onClick:e.onLogin,children:"Enter chat room"})]})},K=S.a.div(c||(c=Object(D.a)(["\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]))),B=function(){var e=Object(m.useState)(""),n=Object(k.a)(e,2),t=n[0],r=n[1],c=Object(m.useContext)(te).setAuthState,o=Object(C.f)(),i=function(){c({username:t}),o.push("/chat")};return Object(R.jsx)(K,{children:Object(R.jsx)(L,{onKeyDown:function(e){13===e.keyCode&&i()},onLogin:i,onChange:function(e){r(e.target.value)}})})},U=t(57),A=t(85),M=t.n(A),N=S.a.div(o||(o=Object(D.a)(["\n  //border-right: ridge grey 1px;\n  max-width: 60%;\n  min-height: 100%;\n  border-radius: 0px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n\n"]))),H=(S.a.input(i||(i=Object(D.a)(["\n  min-height: 25px;\n  min-width: 250px;\n  display: block;\n  margin: auto;\n  margin-top: 15px;\n  border-radius: 50px;\n"]))),S.a.div(a||(a=Object(D.a)(["\n  margin-top: 20px;\n  padding:5px;\n  margin:10px;\n  font-size:25px;\n  \n"])))),z=(S.a.div(s||(s=Object(D.a)(["\n  background-color: black;\n  width: 100px;\n"]))),S.a.div(u||(u=Object(D.a)(["\n  width: wrap;\n  margin: 4px;\n  padding-left: 5px;\n  user-select: none;\n  &:hover{\n    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n    border-radius:10px;\n  } ;\n  &:active{\n    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.6);\n    box-shadow: inset 0 0 6px rgba(0,0,0,0.6);\n  }\n"])))),J=function(e){var n=e.users,t=e.onUserClick,r=Object(m.useState)(""),c=Object(k.a)(r,2),o=c[0],i=c[1];return Object(R.jsxs)(N,{children:[Object(R.jsx)(E.a,{onChange:function(e){return i(e.target.value)},placeholder:"Search",style:{width:"80%",marginTop:"5px",marginLeft:"3px",minHeight:"20px",color:"white"}}),Object(R.jsxs)(H,{children:[Object(R.jsx)("b",{children:"Brukerne:"})," ",Object(R.jsx)("br",{}),n.filter((function(e){return""==o||null!=e.name&&e.name.toLowerCase().includes(o.toLocaleLowerCase())?e:void 0})).map((function(e){return Object(R.jsx)(z,{onClick:function(){return t(e)},children:e.name},e.id)}))]})]})},P=t(163),G=S.a.div(d||(d=Object(D.a)(["\n  height: 100vh;\n  width: 100%;\n"]))),q=(S.a.div(l||(l=Object(D.a)(["\n  position: right;\n  width: 70%;\n  height: relative;\n  background-color: white;\n  margin: 3px;\n"]))),S.a.fieldset(h||(h=Object(D.a)(["\n  position: left;\n  float:right;\n  width: 50%;\n  height: relative;\n  padding: 5px;\n  background-color: none;\n  margin: 3px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  border-radius: 10px;\n"])))),F=S.a.fieldset(b||(b=Object(D.a)(["\n  position: left;\n  float:left;\n  width: 50%;\n  height: relative;\n  padding: 5px;\n  background-color: blue;\n  margin: 3px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  border-radius: 10px;\n"]))),Q=S.a.div(j||(j=Object(D.a)([""]))),V=(S.a.div(f||(f=Object(D.a)(["\n  font-size: small;\n  \n"]))),S.a.div(g||(g=Object(D.a)(["\n  color: white;\n  width: 100%;\n  \n  height: 40vh;\n  overflow: hidden;\n  overflow-y: scroll;\n  ::-webkit-scrollbar {\n    width: 20px;\n  }\n  ::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    border-radius: 10px;\n  }\n  ::-webkit-scrollbar-thumb {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    border-radius: 10px;\n  }\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  border-radius: 10px;\n"])))),W=S.a.div(x||(x=Object(D.a)(["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 80%;\n  padding: 3rem;\n\n\n"]))),X=S.a.h2(p||(p=Object(D.a)(["\n  text-align: left;\n  margin: 0px;\n  color: white;\n"])));function Y(e,n,t,r,c){var o=Z(t,r),i=Z(t,c);return setTimeout((function(){document.getElementById("hei").scrollTop=document.getElementById("hei").scrollHeight}),1),e.yours?(console.log("min melding"),Object(R.jsxs)(q,{children:[Object(R.jsx)("legend",{children:i}),e.value]},n)):Object(R.jsxs)(F,{children:[Object(R.jsx)("legend",{children:o}),e.value]},n)}function Z(e,n){var t="";return e.forEach((function(e){e.id==n&&(t=e.name)})),t}var $=function(e){var n=e.users,t=e.messages,r=e.text,c=e.onUserClick,o=e.handleChange,i=e.sendMessage,a=e.onKeyDown,s=e.otherUser,u=e.myID;return Object(R.jsx)(G,{children:Object(R.jsxs)(P.a,{className:"h100",container:!0,children:[Object(R.jsx)(P.a,{item:!0,md:4,children:Object(R.jsx)(J,{users:n,onUserClick:function(e){return c(e)}})}),Object(R.jsx)(P.a,{item:!0,md:8,children:Object(R.jsxs)(W,{children:[Object(R.jsx)(X,{children:Object(R.jsxs)("p",{children:["Du snakker med ",Z(n,s)]})}),Object(R.jsx)(V,{id:"hei",children:t.map((function(e,t){return Y(e,t,n,s,u)}))}),Object(R.jsxs)(Q,{children:[Object(R.jsx)(E.a,{style:{width:"100%",marginBottom:24,background:"#fff"},label:"ENTER MESSAGE",variant:"outlined",value:r,onChange:o,onKeyDown:a}),Object(R.jsx)(I.a,{style:{width:"100%"},variant:"contained",color:"secondary",onClick:i,children:"Send Message"})]})]})})]})})},_=t(166),ee=function(){var e=Object(C.f)(),n=Object(m.useState)([]),t=Object(k.a)(n,2),r=t[0],c=t[1],o=Object(m.useContext)(te).authState,i=Object(m.useRef)(),a=Object(m.useRef)(),s=Object(m.useRef)(),u=Object(m.useRef)(),d=Object(m.useRef)(),l=Object(m.useState)(""),h=Object(k.a)(l,2),b=h[0],j=h[1],f=Object(m.useState)([]),g=Object(k.a)(f,2),x=g[0],p=g[1],O=Object(m.useRef)();Object(m.useEffect)((function(){a.current=M()("/",{transports:["websocket","polling"]}),a.current.on("connect",(function(){O.current=a.current.id,a.current.emit("username",o.username)})),a.current.on("users",(function(e){c(e),console.log(e)})),a.current.on("connected",(function(e){console.log(e.name+" conneceted")})),a.current.on("disconnected",(function(e){console.log("disconnected:"+e),u.current==e&&a.current.emit("forlat",a.current.id),c((function(n){return n.filter((function(n){return n.id!==e}))}))})),a.current.on("romInvitasjon",(function(n){!function(n,t,r){try{d.current=r;var c=window.confirm(d.current+" vil snakke med deg!\nTrykk OK for \xe5 godta, og Avbryt for \xe5 avsl\xe5");if(c){null!=u.current&&a.current.emit("forlat",u.current),u.current=t,e.push("/chat/".concat(n)),l=t,p([]),s.current=S(l),i.current=s.current.createDataChannel("sendChannel"),i.current.onopen=D,i.current.onmessage=E;var o={id:n,from:t};a.current.emit("akseptert",o)}else c?console.log("Noe gikk galt"):a.current.emit("avslaa",t)}catch(h){console.log(h.message)}var l}(n.romID,n.from,n.name)})),a.current.on("akseptert",(function(n){!function(n){e.push("/chat/".concat(n))}(n)})),a.current.on("forlot",v),a.current.on("avslaatt",y),a.current.on("offer",T),a.current.on("answer",L),a.current.on("ice-candidate",B)}),[]);var w=function(e){if(e.id!==a.current.id){u.current=e.id,console.log("USER CLCKED",e);var n=Object(_.a)(),t={target:e.id,from:a.current.id,romID:n,name:o.username};a.current.emit("roomID",t)}else console.log("Du kan ikke snakke med deg selv")};function v(){p([]),e.push("/chat"),u.current=null,alert(d.current+" forlot samtalen"),d.current=null}function y(){alert("Kunne ikke akseptere")}function D(){console.log("onopen")}function S(e){var n=new RTCPeerConnection({iceServers:[{urls:"stun:chatroulette123-stun.herokuapp"}]});return n.onicecandidate=K,n.onnegotiationneeded=function(){return function(e){s.current.createOffer().then((function(e){return s.current.setLocalDescription(e)})).then((function(){var n={target:e,caller:a.current.id,sdp:s.current.localDescription};a.current.emit("offer",n)})).catch((function(e){return console.log(e)}))}(e)},n}function E(e){p((function(n){return[].concat(Object(U.a)(n),[{yours:!1,value:e.data}])}))}function I(){b.length&&(i.current.send(b),p((function(e){return[].concat(Object(U.a)(e),[{yours:!0,value:b}])})),j("")),setTimeout((function(){document.getElementById("hei").scrollTop=document.getElementById("hei").scrollHeight}),1)}function T(e){s.current=S(),s.current.ondatachannel=function(e){i.current=e.channel,i.current.onopen=D,i.current.onmessage=E};var n=new RTCSessionDescription(e.sdp);s.current.setRemoteDescription(n).then((function(){})).then((function(){return s.current.createAnswer()})).then((function(e){return s.current.setLocalDescription(e)})).then((function(){var n={target:e.caller,caller:a.current.id,sdp:s.current.localDescription};a.current.emit("answer",n)}))}function L(e){var n=new RTCSessionDescription(e.sdp);s.current.setRemoteDescription(n).catch((function(e){return console.log(e)}))}function K(e){if(e.candidate){var n={target:u.current,candidate:e.candidate};a.current.emit("ice-candidate",n)}}function B(e){var n=new RTCIceCandidate(e);s.current.addIceCandidate(n).catch((function(e){return console.log(e)}))}return Object(R.jsx)($,{users:r,messages:x,text:b,onUserClick:function(e){return w(e)},handleChange:function(e){return function(e){j(e.target.value)}(e)},sendMessage:I,onKeyDown:function(e){13===e.keyCode&&I()},otherUser:u.current,myID:O.current})},ne=Object(R.jsxs)(C.c,{children:[Object(R.jsx)(C.a,{exact:!0,path:"/",component:B}),Object(R.jsx)(C.a,{exact:!0,path:"/chat",component:ee}),Object(R.jsx)(C.a,{exact:!0,path:"/chat/:roomID",component:ee})]}),te=Object(m.createContext)({authState:null,setAuthState:function(){}});var re=function(){var e=Object(m.useState)({username:null}),n=Object(k.a)(e,2),t=n[0],r=n[1];return Object(R.jsx)(y.a,{children:Object(R.jsx)("div",{className:"App",children:Object(R.jsx)(te.Provider,{value:{authState:t,setAuthState:r},children:ne})})})};v.a.render(Object(R.jsx)(O.a.StrictMode,{children:Object(R.jsx)(re,{})}),document.getElementById("root"))},95:function(e,n,t){},96:function(e,n,t){}},[[131,1,2]]]);
//# sourceMappingURL=main.1e15d678.chunk.js.map