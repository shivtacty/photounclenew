import{r as t,_ as J,R as o,b as s,c as K,P as e,x as Q,f as U}from"./index-Db9z8UT4.js";import{u as W,v as X,s as Y}from"./DefaultLayout-CNucmguA.js";import{g as Z,e as $}from"./getRTLPlacement-BMTF6YiB.js";var H=t.forwardRef(function(n,x){var O=n.children,m=n.animation,F=m===void 0?!0:m,M=n.className,q=n.container,L=n.content,v=n.delay,l=v===void 0?0:v,b=n.fallbackPlacements,_=b===void 0?["top","right","bottom","left"]:b,h=n.offset,j=h===void 0?[0,8]:h,g=n.onHide,y=n.onShow,P=n.placement,A=P===void 0?"top":P,B=n.title,k=n.trigger,r=k===void 0?"click":k,d=n.visible,I=J(n,["children","animation","className","container","content","delay","fallbackPlacements","offset","onHide","onShow","placement","title","trigger","visible"]),i=t.useRef(null),a=t.useRef(null),V=W(x,i),w="popover".concat(t.useId()),E=t.useState(!1),f=E[0],R=E[1],T=t.useState(d),c=T[0],N=T[1],C=X(),z=C.initPopper,D=C.destroyPopper,S=typeof l=="number"?{show:l,hide:l}:l,G={modifiers:[{name:"arrow",options:{element:".popover-arrow"}},{name:"flip",options:{fallbackPlacements:_}},{name:"offset",options:{offset:j}}],placement:Z(A,a.current)};t.useEffect(function(){if(d){u();return}p()},[d]),t.useEffect(function(){if(f&&a.current&&i.current){z(a.current,i.current,G),setTimeout(function(){N(!0)},S.show);return}!f&&a.current&&i.current&&D()},[f]),t.useEffect(function(){!c&&a.current&&i.current&&$(function(){R(!1)},i.current)},[c]);var u=function(){R(!0),y&&y()},p=function(){setTimeout(function(){N(!1),g&&g()},S.hide)};return o.createElement(o.Fragment,null,o.cloneElement(O,s(s(s(s(s({},c&&{"aria-describedby":w}),{ref:a}),(r==="click"||r.includes("click"))&&{onClick:function(){return c?p():u()}}),(r==="focus"||r.includes("focus"))&&{onFocus:function(){return u()},onBlur:function(){return p()}}),(r==="hover"||r.includes("hover"))&&{onMouseEnter:function(){return u()},onMouseLeave:function(){return p()}})),o.createElement(Y,{container:q,portal:!0},f&&o.createElement("div",s({className:K("popover","bs-popover-auto",{fade:F,show:c},M),id:w,ref:V,role:"tooltip"},I),o.createElement("div",{className:"popover-arrow"}),o.createElement("div",{className:"popover-header"},B),o.createElement("div",{className:"popover-body"},L))))});H.propTypes={animation:e.bool,children:e.node,className:e.string,container:e.any,content:e.oneOfType([e.string,e.node]),delay:e.oneOfType([e.number,e.shape({show:e.number.isRequired,hide:e.number.isRequired})]),fallbackPlacements:Q,offset:e.any,onHide:e.func,onShow:e.func,placement:e.oneOf(["auto","top","right","bottom","left"]),title:e.oneOfType([e.string,e.node]),trigger:U,visible:e.bool};H.displayName="CPopover";export{H as C};
