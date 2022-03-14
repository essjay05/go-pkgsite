var d={PLAY_HREF:".js-exampleHref",PLAY_CONTAINER:".js-exampleContainer",EXAMPLE_INPUT:".Documentation-exampleCode",EXAMPLE_OUTPUT:".Documentation-exampleOutput",EXAMPLE_ERROR:".Documentation-exampleError",PLAY_BUTTON:".Documentation-examplePlayButton",SHARE_BUTTON:".Documentation-exampleShareButton",FORMAT_BUTTON:".Documentation-exampleFormatButton",RUN_BUTTON:".Documentation-exampleRunButton"},g=class{constructor(e){this.exampleEl=e;var t,i,s,r;this.exampleEl=e,this.anchorEl=e.querySelector("a"),this.errorEl=e.querySelector(d.EXAMPLE_ERROR),this.playButtonEl=e.querySelector(d.PLAY_BUTTON),this.shareButtonEl=e.querySelector(d.SHARE_BUTTON),this.formatButtonEl=e.querySelector(d.FORMAT_BUTTON),this.runButtonEl=e.querySelector(d.RUN_BUTTON),this.inputEl=this.makeTextArea(e.querySelector(d.EXAMPLE_INPUT)),this.outputEl=e.querySelector(d.EXAMPLE_OUTPUT),(t=this.playButtonEl)==null||t.addEventListener("click",()=>this.handleShareButtonClick()),(i=this.shareButtonEl)==null||i.addEventListener("click",()=>this.handleShareButtonClick()),(s=this.formatButtonEl)==null||s.addEventListener("click",()=>this.handleFormatButtonClick()),(r=this.runButtonEl)==null||r.addEventListener("click",()=>this.handleRunButtonClick()),!!this.inputEl&&(this.resize(),this.inputEl.addEventListener("keyup",()=>this.resize()),this.inputEl.addEventListener("keydown",n=>this.onKeydown(n)))}makeTextArea(e){var i,s;let t=document.createElement("textarea");return t.classList.add("Documentation-exampleCode","code"),t.spellcheck=!1,t.value=(i=e==null?void 0:e.textContent)!=null?i:"",(s=e==null?void 0:e.parentElement)==null||s.replaceChild(t,e),t}getAnchorHash(){var e;return(e=this.anchorEl)==null?void 0:e.hash}expand(){this.exampleEl.open=!0}resize(){var e;if((e=this.inputEl)==null?void 0:e.value){let t=(this.inputEl.value.match(/\n/g)||[]).length;this.inputEl.style.height=`${(20+t*20+12+2)/16}rem`}}onKeydown(e){e.key==="Tab"&&(document.execCommand("insertText",!1,"	"),e.preventDefault())}setInputText(e){this.inputEl&&(this.inputEl.value=e)}setOutputText(e){this.outputEl&&(this.outputEl.textContent=e)}setOutputHTML(e){this.outputEl&&(this.outputEl.innerHTML=e)}setErrorText(e){this.errorEl&&(this.errorEl.textContent=e),this.setOutputText("An error has occurred\u2026")}handleShareButtonClick(){var t;let e="https://play.golang.org/p/";this.setOutputText("Waiting for remote server\u2026"),fetch("/play/share",{method:"POST",body:(t=this.inputEl)==null?void 0:t.value}).then(i=>i.text()).then(i=>{let s=e+i;this.setOutputHTML(`<a href="${s}">${s}</a>`),window.open(s)}).catch(i=>{this.setErrorText(i)})}handleFormatButtonClick(){var t,i;this.setOutputText("Waiting for remote server\u2026");let e=new FormData;e.append("body",(i=(t=this.inputEl)==null?void 0:t.value)!=null?i:""),fetch("/play/fmt",{method:"POST",body:e}).then(s=>s.json()).then(({Body:s,Error:r})=>{this.setOutputText(r||"Done."),s&&(this.setInputText(s),this.resize())}).catch(s=>{this.setErrorText(s)})}handleRunButtonClick(){var e;this.setOutputText("Waiting for remote server\u2026"),fetch("/play/compile",{method:"POST",body:JSON.stringify({body:(e=this.inputEl)==null?void 0:e.value,version:2})}).then(t=>t.json()).then(async({Events:t,Errors:i})=>{this.setOutputText(i||"");for(let s of t||[])this.setOutputText(s.Message),await new Promise(r=>setTimeout(r,s.Delay/1e6))}).catch(t=>{this.setErrorText(t)})}};function y(){let l=location.hash.match(/^#(example-.*)$/);if(l){let i=document.getElementById(l[1]);i&&(i.open=!0)}let e=[...document.querySelectorAll(d.PLAY_HREF)],t=i=>e.find(s=>s.hash===i.getAnchorHash());for(let i of document.querySelectorAll(d.PLAY_CONTAINER)){let s=new g(i),r=t(s);r?r.addEventListener("click",()=>{s.expand()}):console.warn("example href not found")}}var p=class{constructor(e){this.el=e;this.el.addEventListener("change",t=>{let i=t.target,s=i.value;i.value.startsWith("/")||(s="/"+s),window.location.href=s})}};function L(l){let e=document.createElement("label");e.classList.add("go-Label"),e.setAttribute("aria-label","Menu");let t=document.createElement("select");t.classList.add("go-Select","js-selectNav"),e.appendChild(t);let i=document.createElement("optgroup");i.label="Outline",t.appendChild(i);let s={},r;for(let n of l.treeitems){if(Number(n.depth)>4)continue;n.groupTreeitem?(r=s[n.groupTreeitem.label],r||(r=s[n.groupTreeitem.label]=document.createElement("optgroup"),r.label=n.groupTreeitem.label,t.appendChild(r))):r=i;let a=document.createElement("option");a.label=n.label,a.textContent=n.label,a.value=n.el.href.replace(window.location.origin,"").replace("/",""),r.appendChild(a)}return l.addObserver(n=>{var c;let a=n.el.hash,h=(c=t.querySelector(`[value$="${a}"]`))==null?void 0:c.value;h&&(t.value=h)},50),e}var f=class{constructor(e){this.el=e;this.handleResize=()=>{this.el.style.setProperty("--js-tree-height","100vh"),this.el.style.setProperty("--js-tree-height",this.el.clientHeight+"px")};this.treeitems=[],this.firstChars=[],this.firstTreeitem=null,this.lastTreeitem=null,this.observerCallbacks=[],this.init()}init(){this.handleResize(),window.addEventListener("resize",this.handleResize),this.findTreeItems(),this.updateVisibleTreeitems(),this.observeTargets(),this.firstTreeitem&&(this.firstTreeitem.el.tabIndex=0)}observeTargets(){this.addObserver(i=>{this.expandTreeitem(i),this.setSelected(i)});let e=new Map,t=new IntersectionObserver(i=>{for(let s of i)e.set(s.target.id,s.isIntersecting||s.intersectionRatio===1);for(let[s,r]of e)if(r){let n=this.treeitems.find(a=>{var h;return(h=a.el)==null?void 0:h.href.endsWith(`#${s}`)});if(n)for(let a of this.observerCallbacks)a(n);break}},{threshold:1,rootMargin:"-60px 0px 0px 0px"});for(let i of this.treeitems.map(s=>s.el.getAttribute("href")))if(i){let s=i.replace(window.location.origin,"").replace("/","").replace("#",""),r=document.getElementById(s);r&&t.observe(r)}}addObserver(e,t=200){this.observerCallbacks.push(M(e,t))}setFocusToNextItem(e){let t=null;for(let i=e.index+1;i<this.treeitems.length;i++){let s=this.treeitems[i];if(s.isVisible){t=s;break}}t&&this.setFocusToItem(t)}setFocusToPreviousItem(e){let t=null;for(let i=e.index-1;i>-1;i--){let s=this.treeitems[i];if(s.isVisible){t=s;break}}t&&this.setFocusToItem(t)}setFocusToParentItem(e){e.groupTreeitem&&this.setFocusToItem(e.groupTreeitem)}setFocusToFirstItem(){this.firstTreeitem&&this.setFocusToItem(this.firstTreeitem)}setFocusToLastItem(){this.lastTreeitem&&this.setFocusToItem(this.lastTreeitem)}setSelected(e){var t;for(let i of this.el.querySelectorAll('[aria-expanded="true"]'))i!==e.el&&(((t=i.nextElementSibling)==null?void 0:t.contains(e.el))||i.setAttribute("aria-expanded","false"));for(let i of this.el.querySelectorAll("[aria-selected]"))i!==e.el&&i.setAttribute("aria-selected","false");e.el.setAttribute("aria-selected","true"),this.updateVisibleTreeitems(),this.setFocusToItem(e,!1)}expandTreeitem(e){let t=e;for(;t;)t.isExpandable&&t.el.setAttribute("aria-expanded","true"),t=t.groupTreeitem;this.updateVisibleTreeitems()}expandAllSiblingItems(e){for(let t of this.treeitems)t.groupTreeitem===e.groupTreeitem&&t.isExpandable&&this.expandTreeitem(t)}collapseTreeitem(e){let t=null;e.isExpanded()?t=e:t=e.groupTreeitem,t&&(t.el.setAttribute("aria-expanded","false"),this.updateVisibleTreeitems(),this.setFocusToItem(t))}setFocusByFirstCharacter(e,t){let i,s;t=t.toLowerCase(),i=e.index+1,i===this.treeitems.length&&(i=0),s=this.getIndexFirstChars(i,t),s===-1&&(s=this.getIndexFirstChars(0,t)),s>-1&&this.setFocusToItem(this.treeitems[s])}findTreeItems(){let e=(t,i)=>{let s=i,r=t.firstElementChild;for(;r;)(r.tagName==="A"||r.tagName==="SPAN")&&(s=new A(r,this,i),this.treeitems.push(s),this.firstChars.push(s.label.substring(0,1).toLowerCase())),r.firstElementChild&&e(r,s),r=r.nextElementSibling};e(this.el,null),this.treeitems.map((t,i)=>t.index=i)}updateVisibleTreeitems(){this.firstTreeitem=this.treeitems[0];for(let e of this.treeitems){let t=e.groupTreeitem;for(e.isVisible=!0;t&&t.el!==this.el;)t.isExpanded()||(e.isVisible=!1),t=t.groupTreeitem;e.isVisible&&(this.lastTreeitem=e)}}setFocusToItem(e,t=!0){e.el.tabIndex=0,t&&e.el.focus();for(let i of this.treeitems)i!==e&&(i.el.tabIndex=-1)}getIndexFirstChars(e,t){for(let i=e;i<this.firstChars.length;i++)if(this.treeitems[i].isVisible&&t===this.firstChars[i])return i;return-1}},A=class{constructor(e,t,i){var n,a,h,c,v;e.tabIndex=-1,this.el=e,this.groupTreeitem=i,this.label=(a=(n=e.textContent)==null?void 0:n.trim())!=null?a:"",this.tree=t,this.depth=((i==null?void 0:i.depth)||0)+1,this.index=0;let s=e.parentElement;(s==null?void 0:s.tagName.toLowerCase())==="li"&&(s==null||s.setAttribute("role","none")),e.setAttribute("aria-level",this.depth+""),e.getAttribute("aria-label")&&(this.label=(c=(h=e==null?void 0:e.getAttribute("aria-label"))==null?void 0:h.trim())!=null?c:""),this.isExpandable=!1,this.isVisible=!1,this.isInGroup=!!i;let r=e.nextElementSibling;for(;r;){if(r.tagName.toLowerCase()=="ul"){let x=`${(v=i==null?void 0:i.label)!=null?v:""} nav group ${this.label}`.replace(/[\W_]+/g,"_");e.setAttribute("aria-owns",x),e.setAttribute("aria-expanded","false"),r.setAttribute("role","group"),r.setAttribute("id",x),this.isExpandable=!0;break}r=r.nextElementSibling}this.init()}init(){this.el.tabIndex=-1,this.el.getAttribute("role")||this.el.setAttribute("role","treeitem"),this.el.addEventListener("keydown",this.handleKeydown.bind(this)),this.el.addEventListener("click",this.handleClick.bind(this)),this.el.addEventListener("focus",this.handleFocus.bind(this)),this.el.addEventListener("blur",this.handleBlur.bind(this))}isExpanded(){return this.isExpandable?this.el.getAttribute("aria-expanded")==="true":!1}isSelected(){return this.el.getAttribute("aria-selected")==="true"}handleClick(e){e.target!==this.el&&e.target!==this.el.firstElementChild||(this.isExpandable&&(this.isExpanded()&&this.isSelected()?this.tree.collapseTreeitem(this):this.tree.expandTreeitem(this),e.stopPropagation()),this.tree.setSelected(this))}handleFocus(){var t;let e=this.el;this.isExpandable&&(e=(t=e.firstElementChild)!=null?t:e),e.classList.add("focus")}handleBlur(){var t;let e=this.el;this.isExpandable&&(e=(t=e.firstElementChild)!=null?t:e),e.classList.remove("focus")}handleKeydown(e){if(e.altKey||e.ctrlKey||e.metaKey)return;let t=!1;switch(e.key){case" ":case"Enter":this.isExpandable?(this.isExpanded()&&this.isSelected()?this.tree.collapseTreeitem(this):this.tree.expandTreeitem(this),t=!0):e.stopPropagation(),this.tree.setSelected(this);break;case"ArrowUp":this.tree.setFocusToPreviousItem(this),t=!0;break;case"ArrowDown":this.tree.setFocusToNextItem(this),t=!0;break;case"ArrowRight":this.isExpandable&&(this.isExpanded()?this.tree.setFocusToNextItem(this):this.tree.expandTreeitem(this)),t=!0;break;case"ArrowLeft":this.isExpandable&&this.isExpanded()?(this.tree.collapseTreeitem(this),t=!0):this.isInGroup&&(this.tree.setFocusToParentItem(this),t=!0);break;case"Home":this.tree.setFocusToFirstItem(),t=!0;break;case"End":this.tree.setFocusToLastItem(),t=!0;break;default:e.key.length===1&&e.key.match(/\S/)&&(e.key=="*"?this.tree.expandAllSiblingItems(this):this.tree.setFocusByFirstCharacter(this,e.key),t=!0);break}t&&(e.stopPropagation(),e.preventDefault())}};function M(l,e){let t;return(...i)=>{let s=()=>{t=null,l(...i)};t&&clearTimeout(t),t=setTimeout(s,e)}}var T=class{constructor(e,t){this.table=e;this.toggleAll=t;this.expandAllItems=()=>{this.toggles.map(e=>e.setAttribute("aria-expanded","true")),this.update()};this.collapseAllItems=()=>{this.toggles.map(e=>e.setAttribute("aria-expanded","false")),this.update()};this.update=()=>{this.updateVisibleItems(),setTimeout(()=>this.updateGlobalToggle())};this.rows=Array.from(e.querySelectorAll("[data-aria-controls]")),this.toggles=Array.from(this.table.querySelectorAll("[aria-expanded]")),this.setAttributes(),this.attachEventListeners(),this.update()}setAttributes(){for(let e of["data-aria-controls","data-aria-labelledby","data-id"])this.table.querySelectorAll(`[${e}]`).forEach(t=>{var i;t.setAttribute(e.replace("data-",""),(i=t.getAttribute(e))!=null?i:""),t.removeAttribute(e)})}attachEventListeners(){var e;this.rows.forEach(t=>{t.addEventListener("click",i=>{this.handleToggleClick(i)})}),(e=this.toggleAll)==null||e.addEventListener("click",()=>{this.expandAllItems()}),document.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key==="f"&&this.expandAllItems()})}handleToggleClick(e){let t=e.currentTarget;(t==null?void 0:t.hasAttribute("aria-expanded"))||(t=this.table.querySelector(`button[aria-controls="${t==null?void 0:t.getAttribute("aria-controls")}"]`));let i=(t==null?void 0:t.getAttribute("aria-expanded"))==="true";t==null||t.setAttribute("aria-expanded",i?"false":"true"),e.stopPropagation(),this.update()}updateVisibleItems(){this.rows.map(e=>{var s;let t=(e==null?void 0:e.getAttribute("aria-expanded"))==="true",i=(s=e==null?void 0:e.getAttribute("aria-controls"))==null?void 0:s.trimEnd().split(" ");i==null||i.map(r=>{let n=document.getElementById(`${r}`);t?(n==null||n.classList.add("visible"),n==null||n.classList.remove("hidden")):(n==null||n.classList.add("hidden"),n==null||n.classList.remove("visible"))})})}updateGlobalToggle(){if(!this.toggleAll)return;this.rows.some(t=>t.hasAttribute("aria-expanded"))&&(this.toggleAll.style.display="block"),this.toggles.some(t=>t.getAttribute("aria-expanded")==="false")?(this.toggleAll.innerText="Expand all",this.toggleAll.onclick=this.expandAllItems):(this.toggleAll.innerText="Collapse all",this.toggleAll.onclick=this.collapseAllItems)}};y();var I=document.querySelector(".js-expandableTable");if(I){let l=new T(I,document.querySelector(".js-expandAllDirectories"));window.location.search.includes("expand-directories")&&l.expandAllItems()}var C=document.querySelector(".js-tree");if(C){let l=new f(C),e=L(l),t=document.querySelector(".js-mainNavMobile");t&&t.firstElementChild&&(t==null||t.replaceChild(e,t.firstElementChild)),e.firstElementChild&&new p(e.firstElementChild)}var o=document.querySelector(".js-readme"),E=document.querySelector(".js-readmeContent"),S=document.querySelector(".js-readmeOutline"),m=document.querySelectorAll(".js-readmeExpand"),k=document.querySelector(".js-readmeCollapse"),b=document.querySelector(".DocNavMobile-select");o&&E&&S&&m.length&&k&&(o.clientHeight>320&&(o==null||o.classList.remove("UnitReadme--expanded"),o==null||o.classList.add("UnitReadme--toggle")),window.location.hash.includes("readme")&&u(),b==null||b.addEventListener("change",l=>{l.target.value.startsWith("readme-")&&u()}),m.forEach(l=>l.addEventListener("click",e=>{e.preventDefault(),u(),o.scrollIntoView()})),k.addEventListener("click",l=>{l.preventDefault(),o.classList.remove("UnitReadme--expanded"),m[1]&&m[1].scrollIntoView({block:"center"})}),E.addEventListener("keyup",()=>{u()}),E.addEventListener("click",()=>{u()}),S.addEventListener("click",()=>{u()}),document.addEventListener("keydown",l=>{(l.ctrlKey||l.metaKey)&&l.key==="f"&&u()}));function u(){history.replaceState(null,"",`${location.pathname}#section-readme`),o==null||o.classList.add("UnitReadme--expanded")}function w(){var t;if(!location.hash)return;let l=document.getElementById(location.hash.slice(1)),e=(t=l==null?void 0:l.parentElement)==null?void 0:t.parentElement;(e==null?void 0:e.nodeName)==="DETAILS"&&(e.open=!0)}w();window.addEventListener("hashchange",()=>w());document.querySelectorAll(".js-buildContextSelect").forEach(l=>{l.addEventListener("change",e=>{window.location.search=`?GOOS=${e.target.value}`})});
/*!
 * @license
 * Copyright 2020 The Go Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */
/*!
 * @license
 * Copyright 2021 The Go Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */
/**
 * @license
 * Copyright 2021 The Go Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */
//# sourceMappingURL=main.js.map
