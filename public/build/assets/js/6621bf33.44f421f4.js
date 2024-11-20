(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{83:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return a})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return l}));var r=n(3),s=n(7),i=(n(0),n(99)),o={id:"get-listed-items-by-username",title:"GET /api/users/:username/listed_items",sidebar_position:5},a={unversionedId:"Users/get-listed-items-by-username",id:"Users/get-listed-items-by-username",isDocsHomePage:!1,title:"GET /api/users/:username/listed_items",description:"Responds with the requested username's listed items in an array.",source:"@site/docs/Users/get-listed-items-by-username.md",sourceDirName:"Users",slug:"/Users/get-listed-items-by-username",permalink:"/docs/Users/get-listed-items-by-username",version:"current",sidebarPosition:5,frontMatter:{id:"get-listed-items-by-username",title:"GET /api/users/:username/listed_items",sidebar_position:5},sidebar:"docsSidebar",previous:{title:"PATCH /api/users/:username",permalink:"/docs/Users/patch-user-by-username"}},c=[{value:"Example Response",id:"example-response",children:[]}],u={toc:c};function l(e){var t=e.components,n=Object(s.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Responds with the requested username's listed items in an array."),Object(i.b)("h2",{id:"example-response"},"Example Response"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-json"},'{\n  "items": [\n    {\n      "item_id": 1,\n      "item_name": "The Holy Grail",\n      "description": "Defo the real deal and not a prop from Indiana Jones",\n      "img_url": "https://test.com/The Holy Grail.jpg",\n      "price": 5000,\n      "category_name": "Relics",\n      "listed_by": 1\n    },\n    {\n      "item_id": 2,\n      "item_name": "The sword of 1000 truths",\n      "description": "Not to be entrusted to a noob",\n      "img_url": "https://test.com/1000-truths.jpg",\n      "price": 2999,\n      "category_name": "Relics",\n      "listed_by": 1\n    },\n    {\n      "item_id": 6,\n      "item_name": "Antique Bookshelf",\n      "description": "Makes your apartment smell like rich mahogany",\n      "img_url": "https://test.com/Antique Bookshelf.jpg",\n      "price": 7999,\n      "category_name": "Household",\n      "listed_by": 1\n    }\n  ]\n}\n')))}l.isMDXComponent=!0},99:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return b}));var r=n(0),s=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var u=s.a.createContext({}),l=function(e){var t=s.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=l(e.components);return s.a.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return s.a.createElement(s.a.Fragment,{},t)}},d=s.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(n),d=r,b=p["".concat(o,".").concat(d)]||p[d]||m[d]||i;return n?s.a.createElement(b,a(a({ref:t},u),{},{components:n})):s.a.createElement(b,a({ref:t},u))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:r,o[1]=a;for(var u=2;u<i;u++)o[u]=n[u];return s.a.createElement.apply(null,o)}return s.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);