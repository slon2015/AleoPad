"use strict";(self.webpackChunkaleopad_ui=self.webpackChunkaleopad_ui||[]).push([[362],{8139:function(e,n,t){t.d(n,{E5:function(){return s},U1:function(){return v},GF:function(){return k},Zw:function(){return y}});var i=t(2791),r=t(650),l=t(183),a=t(281),o=t(9522),c=t(184);function s(e){var n=e.cap,t=e.privacy,i=e.ratio,s=e.stage,u=e.token,d=u?u.symbol:"COIN",h=u?u.decimals:6,f=[{key:"1",label:"Privacy",children:t?(0,c.jsx)(r.Z.Text,{children:t}):(0,c.jsx)(l.Z.Input,{})},{key:"2",label:"Cap",children:n?(0,c.jsx)(r.Z.Text,{children:n?"enabled":"disabled"}):(0,c.jsx)(l.Z.Input,{})},{key:"3",label:"Ratio",children:i?(0,c.jsx)(r.Z.Text,{children:(0,c.jsx)(o.T,{rightSymbol:"ALEO",rightDecimals:6,leftSymbol:d,leftDecimals:h,ratioData:{value:i}})}):(0,c.jsx)(l.Z.Input,{})},{key:"4",label:"Stage",children:s?(0,c.jsx)(r.Z.Text,{children:s}):(0,c.jsx)(l.Z.Input,{})}];return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(a.Z,{title:"Launch summary",items:f,layout:"vertical"})})}var u=t(6106),d=t(914),h=t(7689),f={row:"style_row__CXFdW"};function v(e){var n,t,l,a,s=e.launch,v=(null===s||void 0===s||null===(n=s.token)||void 0===n?void 0:n.name)||"Token",Z=(null===s||void 0===s||null===(t=s.token)||void 0===t||null===(l=t.symbol)||void 0===l?void 0:l.toUpperCase())||"TKN",k=(null===s||void 0===s||null===(a=s.token)||void 0===a?void 0:a.decimals)||6,x=(0,h.s0)(),m=(0,i.useCallback)((function(){x("/launches/".concat(s.id))}),[s.id,x]);return(0,c.jsxs)(u.Z,{className:f.row,children:[(0,c.jsx)(d.Z,{span:8,children:(0,c.jsx)(r.Z.Link,{onClick:m,children:v})}),(0,c.jsx)(d.Z,{span:4,children:(0,c.jsx)(r.Z.Text,{children:s.stage.toUpperCase()})}),(0,c.jsx)(d.Z,{span:4,children:(0,c.jsx)(r.Z.Text,{children:s.privacy})}),(0,c.jsx)(d.Z,{span:8,children:(0,c.jsx)(o.T,{rightSymbol:"ALEO",rightDecimals:6,leftSymbol:Z,leftDecimals:k,ratioData:{value:s.ratio}})})]})}var Z=t(1773);function k(e){var n=e.blockHeight,t=e.sellStartBlock,i=e.sellBlockDuration,a=e.claimStartBlock,s=e.claimBlockDuration;return(0,c.jsxs)(Z.Z,{direction:"vertical",children:[(0,c.jsx)(u.Z,{children:(0,c.jsxs)(Z.Z,{children:[(0,c.jsx)(r.Z.Text,{children:"Sales start"}),null!=n&&null!=t?(0,c.jsx)(o.D,{currentBlockHeight:n,targetBlockHeight:t}):(0,c.jsx)(l.Z.Input,{})]})}),(0,c.jsx)(u.Z,{children:(0,c.jsxs)(Z.Z,{children:[(0,c.jsx)(r.Z.Text,{children:"Sales end"}),null!=n&&null!=t&&null!=i?(0,c.jsx)(o.D,{currentBlockHeight:n,targetBlockHeight:t+i}):(0,c.jsx)(l.Z.Input,{})]})}),(0,c.jsx)(u.Z,{children:(0,c.jsxs)(Z.Z,{children:[(0,c.jsx)(r.Z.Text,{children:"Claim start"}),null!=n&&null!=a?(0,c.jsx)(o.D,{currentBlockHeight:n,targetBlockHeight:a}):(0,c.jsx)(l.Z.Input,{})]})}),null!=s&&s>0&&(0,c.jsx)(u.Z,{children:(0,c.jsxs)(Z.Z,{children:[(0,c.jsx)(r.Z.Text,{children:"Claim end"}),null!=n&&null!=a?(0,c.jsx)(o.D,{currentBlockHeight:n,targetBlockHeight:a+s}):(0,c.jsx)(l.Z.Input,{})]})})]})}var x=t(71),m=t(4471),g=t(9102);function j(e,n){var t=e.sellBlockDuration,i=e.sellStartBlock,r=e.claimStartBlock,l=e.claimBlockDuration;return n<i?"pending":n>=i&&n<i+t?"sales":n>=i+t&&n<r?"await TGE":n>=r&&(0===l||n<r+l)?"claims":"finished"}function p(e,n,t){var i;if(e&&n)return{id:e.id,adminAddress:e.adminAddress,sellStartBlock:e.sellStartBlock,sellBlockDuration:e.sellBlockDuration,claimStartBlock:e.claimStartBlock,claimBlockDuration:e.claimBlockDuration,ratio:(0,m.Z)(e.numerator).div(e.denominator).toFixed(),privacy:(i=e.flags,i.isPrivateSellsEnabled&&i.isPublicSellsEnabled?"mixed":i.isPrivateSellsEnabled?"private":"public"),cap:e.flags.isCapEnabled,token:t,stage:j(e,n)}}function y(e){var n=(0,g.Z)(e),t=n.launch,i=n.loading,r=n.error,l=(0,g.d)(null===t||void 0===t?void 0:t.tokenId),a=l.token,o=l.loading,c=l.error,s=(0,x.hi)(),u=s.blockHeight,d=s.loading,h=s.error;return{launch:p(t,u,a),blockHeight:u,loading:i||o||d,error:r||c||h||void 0}}},9362:function(e,n,t){t.r(n),t.d(n,{default:function(){return v}});var i=t(7689),r=t(1413),l=t(9439),a=t(5476),o=t(321),c=t(6106),s=t(650),u=t(8139),d=t(2791),h=t(184);function f(e){var n=e.launchId,t=(0,u.Zw)(n),i=t.launch,f=t.blockHeight,v=t.error,Z=a.Z.useNotification(),k=(0,l.Z)(Z,2),x=k[0],m=k[1];return(0,d.useEffect)((function(){v&&x.error({message:"Launch loading error",description:v})}),[v]),(0,h.jsxs)(o.Z,{title:"Launch",children:[m,(0,h.jsx)(c.Z,{children:(0,h.jsx)(u.E5,(0,r.Z)({},i))}),(0,h.jsx)(c.Z,{justify:"center",children:(0,h.jsx)(s.Z.Title,{children:"Schedule"})}),(0,h.jsx)(u.GF,(0,r.Z)({blockHeight:f},i))]})}var v=function(){var e=(0,i.UO)().id;return(0,h.jsx)(f,{launchId:e})}},9102:function(e,n,t){t.d(n,{Z:function(){return d},d:function(){return h}});var i=t(9439),r=t(5671),l=t(3144),a=function(){function e(n){(0,r.Z)(this,e),this.key=n}return(0,l.Z)(e,[{key:"getStorageKey",value:function(){return"aleopad_".concat(this.key)}},{key:"load",value:function(){var e=localStorage.getItem(this.getStorageKey());return e?JSON.parse(e):[]}},{key:"save",value:function(e){localStorage.setItem(this.getStorageKey(),JSON.stringify(e))}},{key:"append",value:function(){for(var e=this.load(),n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];this.save(e.concat(t))}}]),e}(),o=new a("launches"),c=new a("tokens"),s=t(71),u=t(2791);function d(e){var n=(0,s.TY)(e),t=(0,u.useState)((function(){return o.load().find((function(e){return e.id===n}))})),r=(0,i.Z)(t,2),l=r[0],a=r[1],c=(0,u.useState)(!1),d=(0,i.Z)(c,2),h=d[0],f=d[1],v=(0,u.useState)(void 0),Z=(0,i.Z)(v,2),k=Z[0],x=Z[1];return(0,u.useEffect)((function(){l||(f(!0),x(void 0),(0,s._h)(n).then((function(e){var t={id:n,adminAddress:e.adminAddress,sellStartBlock:e.sellStartBlock,sellBlockDuration:e.sellBlockDuration,claimStartBlock:e.claimStartBlock,claimBlockDuration:e.claimBlockDuration,numerator:e.numerator.toFixed(),denominator:e.denominator.toFixed(),flags:e.flags,tokenId:e.tokenId?(0,s.TY)(e.tokenId):void 0};o.append(t),a(t),f(!1)})).catch((function(e){f(!1),x(String(e))})))}),[l,n]),{launch:l,loading:h,error:k}}function h(e){var n=e?(0,s.TY)(e):void 0,t=(0,u.useState)((function(){return n?c.load().find((function(e){return e.id===n})):void 0})),r=(0,i.Z)(t,2),l=r[0],a=r[1],o=(0,u.useState)(!1),d=(0,i.Z)(o,2),h=d[0],f=d[1],v=(0,u.useState)(void 0),Z=(0,i.Z)(v,2),k=Z[0],x=Z[1];return(0,u.useEffect)((function(){n&&a(c.load().find((function(e){return e.id===n})))}),[n]),(0,u.useEffect)((function(){!l&&n&&(f(!0),x(void 0),(0,s.yy)(n).then((function(e){var n={id:(0,s.TY)(e.id),decimals:e.decimals,name:(0,s.f8)(e.name),symbol:(0,s.f8)(e.symbol)};c.append(n),a(n),f(!1)})).catch((function(e){f(!1),x(String(e))})))}),[l,n]),{token:l,loading:h,error:k}}},9522:function(e,n,t){t.d(n,{D:function(){return h},T:function(){return j}});var i=t(4942),r=t(1773),l=t(650),a=t(1694),o=t.n(a),c=t(2426),s=t.n(c),u={passed:"styles_passed__pVj6j"},d=t(184);function h(e){var n=e.currentBlockHeight,t=e.targetBlockHeight,a=e.meanBlockTimeInSeconds,c=e.dontShowBlocksCount,h=t-n,f=h<=0,v=Boolean(a)&&a&&0!==h?"~ "+function(e,n,t){var i=t?" ago":"";return s().duration(Math.abs(e)*n,"seconds").humanize()+i}(h,a,f):"",Z=c?"":"".concat(Math.abs(h)," Blocks ");return(0,d.jsx)(r.Z,{children:(0,d.jsxs)(l.Z.Text,{className:o()((0,i.Z)({},u.passed,f)),children:[Z,v]})})}var f=t(9439),v=t(4471),Z=t(2791);function k(e,n,t){return n!=t?(0,v.Z)(e).dividedBy((0,v.Z)(10).pow(Math.abs(n-t))):(0,v.Z)(e)}var x=[{value:1e6,symbol:"M"},{value:1e3,symbol:"K"}];function m(e,n){for(var t=0;t<x.length;t++){var i=x[t];if((0,v.Z)(e).isGreaterThanOrEqualTo(i.value))return void 0==n?(0,v.Z)(e).div(i.value).toFixed()+i.symbol:(0,v.Z)(e).div(i.value).toFixed(n)+i.symbol}return void 0==n?(0,v.Z)(e).toFixed():(0,v.Z)(e).toFixed(n)}var g=1e-4;function j(e){var n=e.ratioData,t=e.leftSymbol,i=e.leftDecimals,r=e.rightSymbol,a=e.rightDecimals,o=(0,Z.useMemo)((function(){return k("value"in n?n.value:(e=n.numerator,t=n.denominator,(0,v.Z)(e).div(t)),a,i);var e,t}),[n,a,i]),c=(0,Z.useMemo)((function(){return o.isLessThanOrEqualTo(g)?function(e){return[(0,v.Z)(1).dividedBy(e),(0,v.Z)(1)]}(o):[(0,v.Z)(1),(0,v.Z)(o)]}),[o]),s=(0,f.Z)(c,2),u=s[0],h=s[1];return(0,d.jsxs)(l.Z.Text,{children:[m(u,0)," ",r.toUpperCase()," ="," ",m(h)," ",t.toUpperCase()]})}}}]);
//# sourceMappingURL=362.3eb317d8.chunk.js.map