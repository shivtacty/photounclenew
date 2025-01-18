import{r,_ as m,R as a,b as c,c as C,P as n,d as z}from"./index-DKnGlJMs.js";import{u as A,T as D,r as k}from"./DefaultLayout-eQYCIxMz.js";var S=r.createContext({}),V=r.forwardRef(function(e,t){var i=e.children,o=e.animation,s=o===void 0?!0:o,l=e.autohide,H=l===void 0?!0:l,M=e.className,v=e.color,b=e.delay,O=b===void 0?5e3:b,u=e.index,F=e.innerKey,N=e.visible,E=N===void 0?!1:N,w=e.onClose,x=e.onShow,L=m(e,["children","animation","autohide","className","color","delay","index","innerKey","visible","onClose","onShow"]),R=r.useRef(),j=A(t,R),g=r.useState(!1),p=g[0],h=g[1],f=r.useRef();r.useEffect(function(){h(E)},[E]);var q={visible:p,setVisible:h};r.useEffect(function(){return function(){return clearTimeout(f.current)}},[]),r.useEffect(function(){B()},[p]);var B=function(){H&&(clearTimeout(f.current),f.current=window.setTimeout(function(){h(!1)},O))};return a.createElement(D,{in:p,nodeRef:R,onEnter:function(){return x&&x(u??null)},onExited:function(){return w&&w(u??null)},timeout:250,unmountOnExit:!0},function(y){var d;return a.createElement(S.Provider,{value:q},a.createElement("div",c({className:C("toast",(d={fade:s},d["bg-".concat(v)]=v,d["border-0"]=v,d["show showing"]=y==="entering"||y==="exiting",d.show=y==="entered",d),M),"aria-live":"assertive","aria-atomic":"true",role:"alert",onMouseEnter:function(){return clearTimeout(f.current)},onMouseLeave:function(){return B()}},L,{key:F,ref:j}),i))})});V.propTypes={animation:n.bool,autohide:n.bool,children:n.node,className:n.string,color:z,delay:n.number,index:n.number,innerKey:n.oneOfType([n.number,n.string]),onClose:n.func,onShow:n.func,visible:n.bool};V.displayName="CToast";var K=r.forwardRef(function(e,t){var i=e.children,o=e.className,s=m(e,["children","className"]);return a.createElement("div",c({className:C("toast-body",o)},s,{ref:t}),i)});K.propTypes={children:n.node,className:n.string};K.displayName="CToastBody";var T=r.forwardRef(function(e,t){var i=e.children,o=e.as,s=m(e,["children","as"]),l=r.useContext(S).setVisible;return o?a.createElement(o,c({onClick:function(){return l(!1)}},s,{ref:t}),i):a.createElement(k,c({onClick:function(){return l(!1)}},s,{ref:t}))});T.propTypes=c(c({},k.propTypes),{as:n.elementType});T.displayName="CToastClose";var P=r.forwardRef(function(e,t){var i=e.children,o=e.className,s=e.closeButton,l=m(e,["children","className","closeButton"]);return a.createElement("div",c({className:C("toast-header",o)},l,{ref:t}),i,s&&a.createElement(T,null))});P.propTypes={children:n.node,className:n.string,closeButton:n.bool};P.displayName="CToastHeader";export{V as C,P as a,K as b,T as c};
