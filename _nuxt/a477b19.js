(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{476:function(t,e,r){"use strict";r.d(e,"a",(function(){return o})),r.d(e,"b",(function(){return d})),r.d(e,"c",(function(){return v}));var n=r(477),c=r(0),o=Object(c.h)("v-card__actions"),l=Object(c.h)("v-card__subtitle"),d=Object(c.h)("v-card__text"),v=Object(c.h)("v-card__title");n.a},477:function(t,e,r){"use strict";r(11),r(9),r(12),r(3),r(14),r(10),r(15);var n=r(2),c=(r(23),r(182),r(183),r(478),r(243)),o=r(244),l=r(73),d=r(5);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(d.a)(o.a,l.a,c.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return f(f({"v-card":!0},l.a.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},c.a.options.computed.classes.call(this))},styles:function(){var style=f({},c.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=o.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),r=e.tag,data=e.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(r,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},478:function(t,e,r){var content=r(479);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(19).default)("bb69a202",content,!0,{sourceMap:!1})},479:function(t,e,r){var n=r(18)(!1);n.push([t.i,'.theme--light.v-card{background-color:#fff;color:rgba(0,0,0,.87)}.theme--light.v-card>.v-card__subtitle,.theme--light.v-card>.v-card__text{color:rgba(0,0,0,.6)}.theme--dark.v-card{background-color:#1e1e1e;color:#fff}.theme--dark.v-card>.v-card__subtitle,.theme--dark.v-card>.v-card__text{color:hsla(0,0%,100%,.7)}.v-sheet.v-card{border-radius:4px}.v-sheet.v-card:not(.v-sheet--outlined){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-sheet.v-card.v-sheet--shaped{border-radius:24px 4px}.v-card{border-width:thin;display:block;max-width:100%;outline:none;text-decoration:none;transition-property:box-shadow,opacity;word-wrap:break-word;position:relative;white-space:normal}.v-card>.v-card__progress+:not(.v-btn):not(.v-chip):not(.v-avatar),.v-card>:first-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card__progress{top:0;left:0;right:0;overflow:hidden}.v-card__subtitle+.v-card__text{padding-top:0}.v-card__subtitle,.v-card__text{font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em}.v-card__subtitle,.v-card__text,.v-card__title{padding:16px}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;font-size:1.25rem;font-weight:500;letter-spacing:.0125em;line-height:2rem;word-break:break-all}.v-card__title+.v-card__subtitle,.v-card__title+.v-card__text{padding-top:0}.v-card__title+.v-card__subtitle{margin-top:-16px}.v-card__text{width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions>.v-btn.v-btn{padding:0 8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn{margin-left:8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--left{margin-left:4px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--right{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn+.v-btn{margin-right:8px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--left{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--right{margin-left:4px}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)!important}.v-sheet.v-card--hover{cursor:pointer;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1)}.v-sheet.v-card--hover:focus,.v-sheet.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--link,.v-card--link .v-chip{cursor:pointer}.v-card--link:focus:before{opacity:.08}.v-card--link:before{background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s}.v-card--disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-card--disabled>:not(.v-card__progress){opacity:.6;transition:inherit}.v-card--loading{overflow:hidden}.v-card--raised{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}',""]),t.exports=n},480:function(t,e,r){"use strict";r(9),r(12),r(14),r(15);var n=r(2),c=(r(3),r(39),r(63),r(27),r(11),r(25),r(68),r(228),r(38),r(229),r(230),r(231),r(232),r(233),r(234),r(235),r(236),r(237),r(238),r(239),r(240),r(241),r(42),r(10),r(242),r(1)),o=r(44),l=r(0);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f=["sm","md","lg","xl"],h=["start","end","center"];function m(t,e){return f.reduce((function(r,n){return r[t+Object(l.x)(n)]=e(),r}),{})}var x=function(t){return[].concat(h,["baseline","stretch"]).includes(t)},y=m("align",(function(){return{type:String,default:null,validator:x}})),_=function(t){return[].concat(h,["space-between","space-around"]).includes(t)},w=m("justify",(function(){return{type:String,default:null,validator:_}})),O=function(t){return[].concat(h,["space-between","space-around","stretch"]).includes(t)},k=m("alignContent",(function(){return{type:String,default:null,validator:O}})),j={align:Object.keys(y),justify:Object.keys(w),alignContent:Object.keys(k)},C={align:"align",justify:"justify",alignContent:"align-content"};function T(t,e,r){var n=C[t];if(null!=r){if(e){var c=e.replace(t,"");n+="-".concat(c)}return(n+="-".concat(r)).toLowerCase()}}var S=new Map;e.a=c.a.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:x}},y),{},{justify:{type:String,default:null,validator:_}},w),{},{alignContent:{type:String,default:null,validator:O}},k),render:function(t,e){var r=e.props,data=e.data,c=e.children,l="";for(var d in r)l+=String(r[d]);var v=S.get(l);return v||function(){var t,e;for(e in v=[],j)j[e].forEach((function(t){var n=r[t],c=T(e,t,n);c&&v.push(c)}));v.push((t={"no-gutters":r.noGutters,"row--dense":r.dense},Object(n.a)(t,"align-".concat(r.align),r.align),Object(n.a)(t,"justify-".concat(r.justify),r.justify),Object(n.a)(t,"align-content-".concat(r.alignContent),r.alignContent),t)),S.set(l,v)}(),t(r.tag,Object(o.a)(data,{staticClass:"row",class:v}),c)}})},498:function(t,e,r){"use strict";r.r(e);r(11),r(9),r(12),r(3),r(14),r(10),r(15);var n=r(37),c=r(2),o=(r(39),r(63),r(27),r(30),r(144),r(98),r(168)),l=r(140);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var v={name:"IndexPage",data:function(){return{cardlist:[],page:0,isScrollDown:!1,loadingCardText:["加载中...","加载中..."],userlist:{blacklist:[],whitelist:[]},CardsViewTypes:o.CardsViewTypes,CheckedTypes:o.CheckedTypes,UserTypes:o.UserTypes}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({isAdmin:function(){return"token"in localStorage}},Object(l.b)({cardsViewType:function(t){return t.config.cardsViewType}})),watch:{isScrollDown:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!t){r.next=3;break}return r.next=3,e.getThisPage();case 3:case"end":return r.stop()}}),r)})))()},cardsViewType:function(t,e){var r=this;return Object(n.a)(regeneratorRuntime.mark((function n(){var c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if((c=[o.CardsViewTypes.NORMAL.value,o.CardsViewTypes.DETAIL.value]).includes(e.value)&&c.includes(t.value)){n.next=4;break}return n.next=4,r.getPagesTo(r.page);case 4:if(t.value===o.CardsViewTypes.NORMAL.value){n.next=7;break}return n.next=7,r.getUserList();case 7:case"end":return n.stop()}}),n)})))()}},mounted:function(){return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},methods:{fetchData:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.$axios.get(e.$config.BASE_API_URL+"/fanartList?page=".concat(t,"&type=").concat(e.cardsViewType.value),{headers:"token"in localStorage?{Authorization:"Bearer ".concat(localStorage.token)}:{}});case 3:return data=r.sent,r.abrupt("return",data.data);case 7:return r.prev=7,r.t0=r.catch(0),console.error(r.t0),r.abrupt("return",r.t0);case 11:case"end":return r.stop()}}),r,null,[[0,7]])})))()},getThisPage:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var i,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.page+1,t.loadingCardText=["加载中...","加载中..."],e.next=4,t.fetchData(i);case 4:if(!(data=e.sent).message){e.next=8;break}return t.loadingCardText=["加载失败",data.message],e.abrupt("return");case 8:if(data!==[]){e.next=11;break}return t.loadingCardText=["加载完毕","没有更多了"],e.abrupt("return");case 11:t.cardlist=t.cardlist.concat(data),t.page=i,t.isScrollDown=!1;case 14:case"end":return e.stop()}}),e)})))()},getPagesTo:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var datalist,i,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:e.loadingCardText=["加载中...","加载中..."],datalist=[],i=0;case 3:if(!(i<t)){r.next=17;break}return i++,r.next=7,e.fetchData(i);case 7:if(!(data=r.sent).message){r.next=11;break}return e.loadingCardText=["加载失败",data.message],r.abrupt("break",17);case 11:if(data!==[]){r.next=14;break}return e.loadingCardText=["加载完毕","没有更多了"],r.abrupt("break",17);case 14:datalist=datalist.concat(data),r.next=3;break;case 17:e.page=i,e.isScrollDown=!1,e.cardlist=datalist;case 20:case"end":return r.stop()}}),r)})))()},getUserList:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get(t.$config.BASE_API_URL+"/userlist",{headers:"token"in localStorage?{Authorization:"Bearer ".concat(localStorage.token)}:{}});case 3:return data=e.sent,t.userlist=data.data.data,e.abrupt("return",data.data.data);case 8:return e.prev=8,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()},checkedStatus:function(t){return void 0===t||t===o.CheckedTypes.UNDF.value?o.CheckedTypes.UNDF.name:t?o.CheckedTypes.TRUE.name:o.CheckedTypes.FALSE.name},userInfo:function(t){var e,r;return null!==(e=this.userlist.blacklist)&&void 0!==e&&e.includes(t)?o.UserTypes.BLACKLIST.name:null!==(r=this.userlist.whitelist)&&void 0!==r&&r.includes(t)?o.UserTypes.WHITELIST.name:o.UserTypes.UNDF.name},updateChecked:function(t,e,r){var c=this;return Object(n.a)(regeneratorRuntime.mark((function n(){var data;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log(t,e,r),n.prev=1,n.next=4,c.$axios.put(c.$config.BASE_API_URL+"/fanart/checked",{id:t,checked:e},{headers:"token"in localStorage?{Authorization:"Bearer ".concat(localStorage.token)}:{}});case 4:return data=n.sent,console.log(data.data.data),n.abrupt("return",data.data);case 9:return n.prev=9,n.t0=n.catch(1),console.error(n.t0),n.abrupt("return",n.t0);case 13:case"end":return n.stop()}}),n,null,[[1,9]])})))()},updateUserInfo:function(t,e,r){console.log(t,e,r),e===o.UserTypes.BLACKLIST.value?(this.userlist.whitelist.splice(this.userlist.whitelist.indexOf(t),1),this.userlist.blacklist.push(t)):e===o.UserTypes.WHITELIST.value?(this.userlist.blacklist.splice(this.userlist.blacklist.indexOf(t),1),this.userlist.whitelist.push(t)):(this.userlist.blacklist.splice(this.userlist.blacklist.indexOf(t),1),this.userlist.whitelist.splice(this.userlist.whitelist.indexOf(t),1))}}},f=v,h=r(87),m=r(126),x=r.n(m),y=r(218),_=r(245),w=r(477),O=r(476),k=r(469),j=r(475),C=r(215),T=r(214),S=r(179),P=r(114),V=r(56),D=r(84),L=r(5),R=r(0);function A(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var I=Object(L.a)(P.a,V.a).extend({name:"VLazy",directives:{intersect:D.a},props:{options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},tag:{type:String,default:"div"},transition:{type:String,default:"fade-transition"}},computed:{styles:function(){return function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?A(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):A(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},this.measurableStyles)}},methods:{genContent:function(){var t=this.isActive&&Object(R.o)(this);return this.transition?this.$createElement("transition",{props:{name:this.transition}},t):t},onObserve:function(t,e,r){this.isActive||(this.isActive=r)}},render:function(t){return t(this.tag,{staticClass:"v-lazy",attrs:this.$attrs,directives:[{name:"intersect",value:{handler:this.onObserve,options:this.options}}],on:this.$listeners,style:this.styles},[this.genContent()])}}),E=r(216),U=r(139),B=r(221),$=r(77),z=r(220),M=r(480),N=r(471),component=Object(h.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[t._l(t.cardlist,(function(e){return r("v-row",{key:e.id,attrs:{justify:"center",align:"center"}},[r("v-col",{attrs:{cols:"12",sm:"8",md:"6"}},[r("v-card",[r("v-container",[r("v-row",{staticClass:"spacer",attrs:{align:"center","no-gutters":""}},[r("v-col",{attrs:{cols:"auto"}},[r("a",{attrs:{target:"_blank",href:"https://space.bilibili.com/"+e.user.id}},[r("v-avatar",{attrs:{size:"42px"}},[r("v-img",{attrs:{alt:"Avatar",src:e.user.avatar}})],1)],1)]),t._v(" "),r("v-col",{staticClass:"pa-2"},[r("a",{staticClass:"text-decoration-none white--text",attrs:{target:"_blank",href:"https://space.bilibili.com/"+e.user.id}},[r("strong",[t._v(t._s(e.user.name))])]),t._v(" "),r("br"),t._v(" "),r("span",{staticClass:"grey--text text-no-wrap"},[t._v(t._s(t.$getTime(e.timestamp)))])]),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn",{staticClass:"grey--text",attrs:{text:"",target:"_blank",href:"https://t.bilibili.com/"+e.id}},[t._v("原动态>")])],1),t._v(" "),r("v-row",{staticClass:"spacer",attrs:{align:"center","no-gutters":""}},[r("v-col",{staticClass:"pa-2 text-pre-wrap"},[t._v(t._s(e.text)+" ")])],1),t._v(" "),r("v-row",{staticClass:"spacer",attrs:{align:"center","no-gutters":""}},t._l(e.pictures,(function(t){return r("v-col",{key:t.img_src,staticClass:"pa-1",attrs:{cols:"6"}},[r("v-img",{attrs:{src:t.img_src,"aspect-ratio":"1"}})],1)})),1),t._v(" "),e.isliked?r("v-row",{staticClass:"mt-1 ml-2",attrs:{align:"center","no-gutters":""}},[r("v-col",[r("v-icon",{attrs:{color:"grey darken-1",small:""}},[t._v("mdi-thumb-up")]),t._v(" "),r("span",{staticClass:"text-caption grey--text"},[t._v("七海Nana7mi赞了\n              ")])],1)],1):t._e(),t._v(" "),t.cardsViewType.value!==t.CardsViewTypes.NORMAL.value?r("v-row",[r("v-divider")],1):t._e(),t._v(" "),t.cardsViewType.value!==t.CardsViewTypes.NORMAL.value?r("v-row",{staticClass:"spacer",attrs:{align:"center"}},[r("v-col",{attrs:{cols:"auto"}},[r("span",{staticClass:"text-caption grey--text"},[t._v(" 审核状态：")])]),t._v(" "),r("v-col",{attrs:{cols:"auto"}},[r("v-menu",{attrs:{"offset-x":""},scopedSlots:t._u([{key:"activator",fn:function(n){var c=n.on,o=n.attrs;return[r("v-btn",t._g(t._b({staticClass:"text-caption grey--text",attrs:{outlined:"",text:""}},"v-btn",o,!1),c),[t._v("\n                    "+t._s(t.checkedStatus(e.checked))+"\n                  ")])]}}],null,!0)},[t._v(" "),r("v-list",{attrs:{dense:""}},[r("v-list-item-group",{attrs:{value:Object.values(t.CheckedTypes).map((function(t){return t.name})).indexOf(t.checkedStatus(e.checked)),color:"primary"}},t._l(Object.values(t.CheckedTypes),(function(n,c){return r("v-list-item",{key:c,staticClass:"text-caption grey--text",on:{click:function(r){t.updateChecked(e.id,n.value,e.checked),e.checked=n.value}}},[r("v-list-item-title",{staticClass:"text-caption grey--text"},[t._v(t._s(n.name))])],1)})),1)],1)],1)],1),t._v(" "),r("v-spacer"),t._v(" "),r("v-col",{attrs:{cols:"auto"}},[r("span",{staticClass:"text-caption grey--text"},[t._v(" 黑/白名单：")])]),t._v(" "),r("v-col",{attrs:{cols:"auto"}},[r("v-menu",{attrs:{"offset-x":""},scopedSlots:t._u([{key:"activator",fn:function(n){var c=n.on,o=n.attrs;return[r("v-btn",t._g(t._b({staticClass:"text-caption grey--text",attrs:{outlined:"",text:""}},"v-btn",o,!1),c),[t._v("\n                    "+t._s(t.userInfo(e.user.id))+"\n                  ")])]}}],null,!0)},[t._v(" "),r("v-list",{attrs:{dense:""}},[r("v-list-item-group",{attrs:{value:Object.values(t.UserTypes).map((function(t){return t.name})).indexOf(t.userInfo(e.user.id)),color:"primary"}},t._l(Object.values(t.UserTypes),(function(n,c){return r("v-list-item",{key:c,staticClass:"text-caption grey--text",on:{click:function(r){t.updateUserInfo(e.user.id,n.value,t.userInfo(e.user.id))}}},[r("v-list-item-title",{staticClass:"text-caption grey--text"},[t._v(t._s(n.name))])],1)})),1)],1)],1)],1)],1):t._e()],1)],1)],1)],1)})),t._v(" "),r("v-row",{attrs:{justify:"center",align:"center"}},[r("v-col",{attrs:{cols:"12",sm:"8",md:"6"}},[r("v-lazy",{attrs:{options:{threshold:.5},"min-height":"200",transition:"fade-transition"},model:{value:t.isScrollDown,callback:function(e){t.isScrollDown=e},expression:"isScrollDown"}},[r("v-card",{staticClass:"mx-auto",attrs:{"max-width":"336"}},[r("v-card-title",[t._v(t._s(t.loadingCardText[0]))]),t._v(" "),r("v-card-text",[t._v(" "+t._s(t.loadingCardText[1])+" ")]),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"primary",dark:"",disabled:"加载失败"!=t.loadingCardText[0]},on:{click:t.getThisPage}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-refresh")])],1)],1)],1)],1)],1)],1)],2)}),[],!1,null,null,null);e.default=component.exports;x()(component,{VAvatar:y.a,VBtn:_.a,VCard:w.a,VCardActions:O.a,VCardText:O.b,VCardTitle:O.c,VCol:k.a,VContainer:j.a,VDivider:C.a,VIcon:T.a,VImg:S.a,VLazy:I,VList:E.a,VListItem:U.a,VListItemGroup:B.a,VListItemTitle:$.b,VMenu:z.a,VRow:M.a,VSpacer:N.a})}}]);