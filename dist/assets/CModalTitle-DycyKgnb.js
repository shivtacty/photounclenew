import{r as o,_ as f,R as r,b as m,c as p,P as n}from"./index-Db9z8UT4.js";import{u as re,T as te,s as I,t as ae,r as se}from"./DefaultLayout-CNucmguA.js";var k=o.forwardRef(function(e,d){var l=e.children,a=e.className,t=f(e,["children","className"]);return r.createElement("div",m({className:p("modal-content",a)},t,{ref:d}),l)});k.propTypes={children:n.node,className:n.string};k.displayName="CModalContent";var w=o.forwardRef(function(e,d){var l,a=e.children,t=e.alignment,i=e.className,c=e.fullscreen,v=e.scrollable,b=e.size,y=f(e,["children","alignment","className","fullscreen","scrollable","size"]);return r.createElement("div",m({className:p("modal-dialog",(l={"modal-dialog-centered":t==="center"},l[typeof c=="boolean"?"modal-fullscreen":"modal-fullscreen-".concat(c,"-down")]=c,l["modal-dialog-scrollable"]=v,l["modal-".concat(b)]=b,l),i)},y,{ref:d}),a)});w.propTypes={alignment:n.oneOf(["top","center"]),children:n.node,className:n.string,fullscreen:n.oneOfType([n.bool,n.oneOf(["sm","md","lg","xl","xxl"])]),scrollable:n.bool,size:n.oneOf(["sm","lg","xl"])};w.displayName="CModalDialog";var K=o.createContext({}),q=o.forwardRef(function(e,d){var l=e.children,a=e.alignment,t=e.backdrop,i=t===void 0?!0:t,c=e.className,v=e.container,b=e.duration,y=b===void 0?150:b,x=e.focus,U=x===void 0?!0:x,W=e.fullscreen,R=e.keyboard,X=R===void 0?!0:R,N=e.onClose,T=e.onClosePrevented,Y=e.onShow,O=e.portal,M=O===void 0?!0:O,Z=e.scrollable,$=e.size,P=e.transition,C=P===void 0?!0:P,B=e.unmountOnClose,_=B===void 0?!0:B,g=e.visible,ee=f(e,["children","alignment","backdrop","className","container","duration","focus","fullscreen","keyboard","onClose","onClosePrevented","onShow","portal","scrollable","size","transition","unmountOnClose","visible"]),z=o.useRef(null),h=o.useRef(null),ne=o.useRef(null),oe=re(d,h),L=o.useState(g),u=L[0],E=L[1],S=o.useState(!1),V=S[0],D=S[1],le={visible:u,setVisible:E};o.useEffect(function(){E(g)},[g]),o.useEffect(function(){var s;return u?(z.current=document.activeElement,document.addEventListener("mouseup",H),document.addEventListener("keydown",j)):(s=z.current)===null||s===void 0||s.focus(),function(){document.removeEventListener("mouseup",H),document.removeEventListener("keydown",j)}},[u]);var F=function(){return i==="static"?D(!0):(E(!1),N&&N())};o.useLayoutEffect(function(){T&&T(),setTimeout(function(){return D(!1)},y)},[V]),o.useLayoutEffect(function(){return u?(document.body.classList.add("modal-open"),i&&(document.body.style.overflow="hidden",document.body.style.paddingRight="0px"),setTimeout(function(){var s;U&&((s=h.current)===null||s===void 0||s.focus())},C?y:0)):(document.body.classList.remove("modal-open"),i&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))),function(){document.body.classList.remove("modal-open"),i&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))}},[u]);var H=function(s){h.current&&h.current==s.target&&F()},j=function(s){s.key==="Escape"&&X&&F()};return r.createElement(r.Fragment,null,r.createElement(te,{in:u,mountOnEnter:!0,nodeRef:h,onEnter:Y,onExit:N,unmountOnExit:_,timeout:C?y:0},function(s){return r.createElement(I,{container:v,portal:M},r.createElement(K.Provider,{value:le},r.createElement("div",m({className:p("modal",{"modal-static":V,fade:C,show:s==="entered"},c),tabIndex:-1},u?{"aria-modal":!0,role:"dialog"}:{"aria-hidden":"true"},{style:m({},s!=="exited"&&{display:"block"})},ee,{ref:oe}),r.createElement(w,{alignment:a,fullscreen:W,scrollable:Z,size:$},r.createElement(k,{ref:ne},l)))))}),i&&r.createElement(I,{container:v,portal:M},r.createElement(ae,{visible:u})))});q.propTypes={alignment:n.oneOf(["top","center"]),backdrop:n.oneOfType([n.bool,n.oneOf(["static"])]),children:n.node,className:n.string,container:n.any,duration:n.number,focus:n.bool,fullscreen:n.oneOfType([n.bool,n.oneOf(["sm","md","lg","xl","xxl"])]),keyboard:n.bool,onClose:n.func,onClosePrevented:n.func,onShow:n.func,portal:n.bool,scrollable:n.bool,size:n.oneOf(["sm","lg","xl"]),transition:n.bool,unmountOnClose:n.bool,visible:n.bool};q.displayName="CModal";var A=o.forwardRef(function(e,d){var l=e.children,a=e.className,t=f(e,["children","className"]);return r.createElement("div",m({className:p("modal-body",a)},t,{ref:d}),l)});A.propTypes={children:n.node,className:n.string};A.displayName="CModalBody";var G=o.forwardRef(function(e,d){var l=e.children,a=e.className,t=f(e,["children","className"]);return r.createElement("div",m({className:p("modal-footer",a)},t,{ref:d}),l)});G.propTypes={children:n.node,className:n.string};G.displayName="CModalFooter";var J=o.forwardRef(function(e,d){var l=e.children,a=e.className,t=e.closeButton,i=t===void 0?!0:t,c=f(e,["children","className","closeButton"]),v=o.useContext(K).setVisible;return r.createElement("div",m({className:p("modal-header",a)},c,{ref:d}),l,i&&r.createElement(se,{onClick:function(){return v(!1)}}))});J.propTypes={children:n.node,className:n.string,closeButton:n.bool};J.displayName="CModalHeader";var Q=o.forwardRef(function(e,d){var l=e.children,a=e.as,t=a===void 0?"h5":a,i=e.className,c=f(e,["children","as","className"]);return r.createElement(t,m({className:p("modal-title",i)},c,{ref:d}),l)});Q.propTypes={as:n.elementType,children:n.node,className:n.string};Q.displayName="CModalTitle";export{q as C,J as a,Q as b,A as c,G as d};
