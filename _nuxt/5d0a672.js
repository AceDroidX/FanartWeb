(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{477:function(t,n,e){"use strict";e(9),e(12),e(14),e(15);var r=e(2),o=(e(3),e(39),e(63),e(27),e(11),e(25),e(68),e(226),e(38),e(227),e(228),e(229),e(230),e(231),e(232),e(233),e(234),e(235),e(236),e(237),e(238),e(239),e(42),e(10),e(240),e(1)),c=e(44),l=e(0);function f(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}var v=["sm","md","lg","xl"],j=["start","end","center"];function y(t,n){return v.reduce((function(e,r){return e[t+Object(l.x)(r)]=n(),e}),{})}var O=function(t){return[].concat(j,["baseline","stretch"]).includes(t)},w=y("align",(function(){return{type:String,default:null,validator:O}})),h=function(t){return[].concat(j,["space-between","space-around"]).includes(t)},m=y("justify",(function(){return{type:String,default:null,validator:h}})),C=function(t){return[].concat(j,["space-between","space-around","stretch"]).includes(t)},S=y("alignContent",(function(){return{type:String,default:null,validator:C}})),P={align:Object.keys(w),justify:Object.keys(m),alignContent:Object.keys(S)},k={align:"align",justify:"justify",alignContent:"align-content"};function x(t,n,e){var r=k[t];if(null!=e){if(n){var o=n.replace(t,"");r+="-".concat(o)}return(r+="-".concat(e)).toLowerCase()}}var _=new Map;n.a=o.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:O}},w),{},{justify:{type:String,default:null,validator:h}},m),{},{alignContent:{type:String,default:null,validator:C}},S),render:function(t,n){var e=n.props,data=n.data,o=n.children,l="";for(var f in e)l+=String(e[f]);var d=_.get(l);return d||function(){var t,n;for(n in d=[],P)P[n].forEach((function(t){var r=e[t],o=x(n,t,r);o&&d.push(o)}));d.push((t={"no-gutters":e.noGutters,"row--dense":e.dense},Object(r.a)(t,"align-".concat(e.align),e.align),Object(r.a)(t,"justify-".concat(e.justify),e.justify),Object(r.a)(t,"align-content-".concat(e.alignContent),e.alignContent),t)),_.set(l,d)}(),t(e.tag,Object(c.a)(data,{staticClass:"row",class:d}),o)}})},496:function(t,n,e){"use strict";e.r(n);var r={name:"InspirePage"},o=e(87),c=e(126),l=e.n(c),f=e(466),d=e(477),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-row",[e("v-col",{staticClass:"text-center"},[e("img",{staticClass:"mb-5",attrs:{src:"/v.png",alt:"Vuetify.js"}}),t._v(" "),e("blockquote",{staticClass:"blockquote"},[t._v("\n      “First, solve the problem. Then, write the code.”\n      "),e("footer",[e("small",[e("em",[t._v("—John Johnson")])])])])])],1)}),[],!1,null,null,null);n.default=component.exports;l()(component,{VCol:f.a,VRow:d.a})}}]);