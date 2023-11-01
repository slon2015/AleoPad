"use strict";(self.webpackChunkaleopad_ui=self.webpackChunkaleopad_ui||[]).push([[281],{281:function(e,t,n){n.d(t,{Z:function(){return M}});var o=n(4942),a=n(9439),c=n(2791),l=n(1694),r=n.n(l),i=n(635),s=n(1929),d=n(4107),m=n(390),p={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1},u=c.createContext({}),b=n(5501),f=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n};function g(e,t,n){var o=c.useMemo((function(){return t||(e=n,(0,b.Z)(e).map((function(e){return Object.assign({},null===e||void 0===e?void 0:e.props)})));var e}),[t,n]);return c.useMemo((function(){return o.map((function(t){var n=t.span,o=f(t,["span"]);return Object.assign(Object.assign({},o),{span:"number"===typeof n?n:(0,i.m9)(e,n)})}))}),[o,e])}function y(e,t,n){var o=e,a=!1;return(void 0===n||n>t)&&(o=Object.assign(Object.assign({},e),{span:t}),a=void 0!==n),[o,a]}var v=function(e,t){var n=(0,c.useMemo)((function(){return function(e,t){var n=[],o=[],c=t,l=!1;return e.filter((function(e){return e})).forEach((function(r,i){var s=null===r||void 0===r?void 0:r.span,d=s||1;if(i===e.length-1){var m=y(r,c,s),p=(0,a.Z)(m,2),u=p[0],b=p[1];return l=l||b,o.push(u),void n.push(o)}if(d<c)c-=d,o.push(r);else{var f=y(r,c,d),g=(0,a.Z)(f,2),v=g[0],x=g[1];l=l||x,o.push(v),n.push(o),c=t,o=[]}})),[n,l]}(t,e)}),[t,e]),o=(0,a.Z)(n,2),l=o[0];o[1];return l},x=function(e){return e.children};function h(e){return void 0!==e&&null!==e}var O=function(e){var t,n=e.itemPrefixCls,a=e.component,l=e.span,i=e.className,s=e.style,d=e.labelStyle,m=e.contentStyle,p=e.bordered,u=e.label,b=e.content,f=e.colon,g=a;return p?c.createElement(g,{className:r()((t={},(0,o.Z)(t,"".concat(n,"-item-label"),h(u)),(0,o.Z)(t,"".concat(n,"-item-content"),h(b)),t),i),style:s,colSpan:l},h(u)&&c.createElement("span",{style:d},u),h(b)&&c.createElement("span",{style:m},b)):c.createElement(g,{className:r()("".concat(n,"-item"),i),style:s,colSpan:l},c.createElement("div",{className:"".concat(n,"-item-container")},(u||0===u)&&c.createElement("span",{className:r()("".concat(n,"-item-label"),(0,o.Z)({},"".concat(n,"-item-no-colon"),!f)),style:d},u),(b||0===b)&&c.createElement("span",{className:r()("".concat(n,"-item-content")),style:m},b)))};function S(e,t,n){var o=t.colon,a=t.prefixCls,l=t.bordered,r=n.component,i=n.type,s=n.showLabel,d=n.showContent,m=n.labelStyle,p=n.contentStyle;return e.map((function(e,t){var n=e.label,u=e.children,b=e.prefixCls,f=void 0===b?a:b,g=e.className,y=e.style,v=e.labelStyle,x=e.contentStyle,h=e.span,S=void 0===h?1:h,Z=e.key;return"string"===typeof r?c.createElement(O,{key:"".concat(i,"-").concat(Z||t),className:g,style:y,labelStyle:Object.assign(Object.assign({},m),v),contentStyle:Object.assign(Object.assign({},p),x),span:S,colon:o,component:r,itemPrefixCls:f,bordered:l,label:s?n:null,content:d?u:null}):[c.createElement(O,{key:"label-".concat(Z||t),className:g,style:Object.assign(Object.assign(Object.assign({},m),y),v),span:1,colon:o,component:r[0],itemPrefixCls:f,bordered:l,label:n}),c.createElement(O,{key:"content-".concat(Z||t),className:g,style:Object.assign(Object.assign(Object.assign({},p),y),x),span:2*S-1,component:r[1],itemPrefixCls:f,bordered:l,content:u})]}))}var Z=function(e){var t=c.useContext(u),n=e.prefixCls,o=e.vertical,a=e.row,l=e.index,r=e.bordered;return o?c.createElement(c.Fragment,null,c.createElement("tr",{key:"label-".concat(l),className:"".concat(n,"-row")},S(a,e,Object.assign({component:"th",type:"label",showLabel:!0},t))),c.createElement("tr",{key:"content-".concat(l),className:"".concat(n,"-row")},S(a,e,Object.assign({component:"td",type:"content",showContent:!0},t)))):c.createElement("tr",{key:l,className:"".concat(n,"-row")},S(a,e,Object.assign({component:r?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0},t)))},j=n(7521),w=n(5564),E=n(9922),C=function(e){var t,n,a=e.componentCls,c=e.extraColor,l=e.itemPaddingBottom,r=e.colonMarginRight,i=e.colonMarginLeft,s=e.titleMarginBottom;return(0,o.Z)({},a,Object.assign(Object.assign(Object.assign({},(0,j.Wf)(e)),function(e){var t,n,a=e.componentCls,c=e.labelBg;return(0,o.Z)({},"&".concat(a,"-bordered"),(n={},(0,o.Z)(n,"> ".concat(a,"-view"),(0,o.Z)({border:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorSplit),"> table":{tableLayout:"auto",borderCollapse:"collapse"}},"".concat(a,"-row"),(t={borderBottom:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorSplit),"&:last-child":{borderBottom:"none"}},(0,o.Z)(t,"> ".concat(a,"-item-label, > ").concat(a,"-item-content"),{padding:"".concat(e.padding,"px ").concat(e.paddingLG,"px"),borderInlineEnd:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorSplit),"&:last-child":{borderInlineEnd:"none"}}),(0,o.Z)(t,"> ".concat(a,"-item-label"),{color:e.colorTextSecondary,backgroundColor:c,"&::after":{display:"none"}}),t))),(0,o.Z)(n,"&".concat(a,"-middle"),(0,o.Z)({},"".concat(a,"-row"),(0,o.Z)({},"> ".concat(a,"-item-label, > ").concat(a,"-item-content"),{padding:"".concat(e.paddingSM,"px ").concat(e.paddingLG,"px")}))),(0,o.Z)(n,"&".concat(a,"-small"),(0,o.Z)({},"".concat(a,"-row"),(0,o.Z)({},"> ".concat(a,"-item-label, > ").concat(a,"-item-content"),{padding:"".concat(e.paddingXS,"px ").concat(e.padding,"px")}))),n))}(e)),(n={},(0,o.Z)(n,"&-rtl",{direction:"rtl"}),(0,o.Z)(n,"".concat(a,"-header"),{display:"flex",alignItems:"center",marginBottom:s}),(0,o.Z)(n,"".concat(a,"-title"),Object.assign(Object.assign({},j.vS),{flex:"auto",color:e.colorText,fontWeight:e.fontWeightStrong,fontSize:e.fontSizeLG,lineHeight:e.lineHeightLG})),(0,o.Z)(n,"".concat(a,"-extra"),{marginInlineStart:"auto",color:c,fontSize:e.fontSize}),(0,o.Z)(n,"".concat(a,"-view"),{width:"100%",borderRadius:e.borderRadiusLG,table:{width:"100%",tableLayout:"fixed"}}),(0,o.Z)(n,"".concat(a,"-row"),{"> th, > td":{paddingBottom:l},"&:last-child":{borderBottom:"none"}}),(0,o.Z)(n,"".concat(a,"-item-label"),(0,o.Z)({color:e.colorTextTertiary,fontWeight:"normal",fontSize:e.fontSize,lineHeight:e.lineHeight,textAlign:"start","&::after":{content:'":"',position:"relative",top:-.5,marginInline:"".concat(i,"px ").concat(r,"px")}},"&".concat(a,"-item-no-colon::after"),{content:'""'})),(0,o.Z)(n,"".concat(a,"-item-no-label"),{"&::after":{margin:0,content:'""'}}),(0,o.Z)(n,"".concat(a,"-item-content"),{display:"table-cell",flex:1,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight,wordBreak:"break-word",overflowWrap:"break-word"}),(0,o.Z)(n,"".concat(a,"-item"),{paddingBottom:0,verticalAlign:"top","&-container":(t={display:"flex"},(0,o.Z)(t,"".concat(a,"-item-label"),{display:"inline-flex",alignItems:"baseline"}),(0,o.Z)(t,"".concat(a,"-item-content"),{display:"inline-flex",alignItems:"baseline"}),t)}),(0,o.Z)(n,"&-middle",(0,o.Z)({},"".concat(a,"-row"),{"> th, > td":{paddingBottom:e.paddingSM}})),(0,o.Z)(n,"&-small",(0,o.Z)({},"".concat(a,"-row"),{"> th, > td":{paddingBottom:e.paddingXS}})),n)))},N=(0,w.Z)("Descriptions",(function(e){var t=(0,E.TS)(e,{});return[C(t)]}),(function(e){return{labelBg:e.colorFillAlter,titleMarginBottom:e.fontSizeSM*e.lineHeightSM,itemPaddingBottom:e.padding,colonMarginRight:e.marginXS,colonMarginLeft:e.marginXXS/2,extraColor:e.colorText}})),k=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n},B=function(e){var t,n=e.prefixCls,l=e.title,b=e.extra,f=e.column,y=e.colon,x=void 0===y||y,h=e.bordered,O=e.layout,S=e.children,j=e.className,w=e.rootClassName,E=e.style,C=e.size,B=e.labelStyle,M=e.contentStyle,P=e.items,L=k(e,["prefixCls","title","extra","column","colon","bordered","layout","children","className","rootClassName","style","size","labelStyle","contentStyle","items"]),z=c.useContext(s.E_),I=z.getPrefixCls,T=z.direction,W=z.descriptions,H=I("descriptions",n),G=(0,m.Z)(),X=c.useMemo((function(){var e;return"number"===typeof f?f:null!==(e=(0,i.m9)(G,Object.assign(Object.assign({},p),f)))&&void 0!==e?e:3}),[G,f]),R=g(G,P,S),A=(0,d.Z)(C),_=v(X,R),F=N(H),D=(0,a.Z)(F,2),q=D[0],J=D[1],K=c.useMemo((function(){return{labelStyle:B,contentStyle:M}}),[B,M]);return q(c.createElement(u.Provider,{value:K},c.createElement("div",Object.assign({className:r()(H,null===W||void 0===W?void 0:W.className,(t={},(0,o.Z)(t,"".concat(H,"-").concat(A),A&&"default"!==A),(0,o.Z)(t,"".concat(H,"-bordered"),!!h),(0,o.Z)(t,"".concat(H,"-rtl"),"rtl"===T),t),j,w,J),style:Object.assign(Object.assign({},null===W||void 0===W?void 0:W.style),E)},L),(l||b)&&c.createElement("div",{className:"".concat(H,"-header")},l&&c.createElement("div",{className:"".concat(H,"-title")},l),b&&c.createElement("div",{className:"".concat(H,"-extra")},b)),c.createElement("div",{className:"".concat(H,"-view")},c.createElement("table",null,c.createElement("tbody",null,_.map((function(e,t){return c.createElement(Z,{key:t,index:t,colon:x,prefixCls:H,vertical:"vertical"===O,bordered:h,row:e})}))))))))};B.Item=x;var M=B}}]);
//# sourceMappingURL=281.7fb86368.chunk.js.map