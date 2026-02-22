import{s as f,e as T,u as ue,f as ge}from"./file-folder-v_uzNqzc.js";let c={currentPage:1,lastMainSearch:"",currentParentId:null,breadcrumbs:[],layout:localStorage.getItem("filesLayout")||"grid",lastItems:[],delegatedListenersBound:!1,containerRef:null,processingStatusCache:{},selectedItems:new Set,lastSelectedIndex:-1};function I(){const o=document.querySelector('meta[name="csrf-token"]');if(o&&o.content)return o.content;const t=document.cookie.match(/XSRF-TOKEN=([^;]+)/);return t?decodeURIComponent(t[1]):""}async function Uo(o){try{if(c.processingStatusCache&&c.processingStatusCache[o])return c.processingStatusCache[o];const t=await fetch(`/files/${o}/processing-status`,{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I(),"X-XSRF-TOKEN":I()},credentials:"same-origin"});if(!t.ok)return null;const e=await t.json().catch(()=>null);return e?(c.processingStatusCache[o]=e,e):null}catch{return null}}function Bo(){c.selectedItems.clear(),c.lastSelectedIndex=-1,he(),ve()}function Wo(o){const t=Array.from(document.querySelectorAll("#filesContainer [data-item-id]")),e=c.lastSelectedIndex,n=t.findIndex(s=>s.dataset.itemId===o);if(e===-1||n===-1){Oo(o,!1);return}const i=Math.min(e,n),r=Math.max(e,n);c.selectedItems.clear();for(let s=i;s<=r;s++){const a=t[s];if(a){const m=a.dataset.itemId;m&&c.selectedItems.add(m)}}c.lastSelectedIndex=n,he(),ve()}function Oo(o,t=!1){t||c.selectedItems.clear(),c.selectedItems.has(o)?c.selectedItems.delete(o):c.selectedItems.add(o);const n=Array.from(document.querySelectorAll("#filesContainer [data-item-id]")).findIndex(i=>i.dataset.itemId===o);n!==-1&&(c.lastSelectedIndex=n),he(),ve()}function he(){var A,M,v,b;const o=document.getElementById("selectionToolbar"),t=document.getElementById("selectionCount"),e=document.getElementById("selectionOpenBtn"),n=document.getElementById("selectionRenameBtn"),i=document.getElementById("selectionMoveBtn"),r=document.getElementById("selectionRestoreBtn"),s=document.getElementById("selectionDeleteBtn"),a=document.getElementById("selectionShareBtn"),m=document.getElementById("selectionDownloadBtn"),p=s==null?void 0:s.querySelector(".btn-label"),h=document.getElementById("filesContainer"),y=(h==null?void 0:h.dataset.view)==="trash";if(!o||!t)return;const x=c.selectedItems.size;if(x===0){o.classList.add("hidden");return}const L=window.I18N.fileFolder.lblSelectedCount.replace(":count",x);t.textContent=L,o.classList.remove("hidden"),y?(e==null||e.classList.add("hidden"),i==null||i.classList.add("hidden"),n==null||n.classList.add("hidden"),a==null||a.classList.add("hidden"),m==null||m.classList.add("hidden"),r==null||r.classList.remove("hidden"),p&&(p.textContent=((M=(A=window.I18N)==null?void 0:A.fileFolder)==null?void 0:M.deletePermanently)||"Delete permanently")):(e==null||e.classList.remove("hidden"),i==null||i.classList.remove("hidden"),n==null||n.classList.remove("hidden"),a==null||a.classList.remove("hidden"),m==null||m.classList.remove("hidden"),r==null||r.classList.add("hidden"),p&&(p.textContent=`${((b=(v=window.I18N)==null?void 0:v.fileFolder)==null?void 0:b.delete)||"Delete"}`),e&&(e.disabled=x>1),n&&(n.disabled=x>1),a&&(a.disabled=x>1))}function ve(){const o=document.getElementById("filesContainer");o&&o.querySelectorAll("[data-item-id]").forEach(t=>{const e=t.dataset.itemId;c.selectedItems.has(e)?t.classList.add("selected"):t.classList.remove("selected")})}function Po(o,t){if(o.target.closest(".actions-menu-btn"))return!1;o.preventDefault(),o.stopPropagation();const e=o.ctrlKey||o.metaKey;return o.shiftKey&&c.lastSelectedIndex!==-1?Wo(t):Oo(t,e),!0}async function Go(){try{Rn();const o=await fetch("/api/shared-with-me",{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin"});if(!o.ok)throw new Error("Failed to load shared files");const t=await o.json();if(t.success)Ro(t.shared_files||[]),ue([{id:null,name:"Shared with Me"}]);else throw new Error(t.message||"Failed to load shared files")}catch(o){console.error("Failed to load shared files:",o),f(window.I18N.fileFolder.msgLoadSharedFailed,"error"),Ro([])}}async function Z(){const o=document.getElementById("filesContainer");if(!o){console.error("Items container not found");return}try{o.dataset.view="trash",o.innerHTML='<div class="flex justify-center items-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>';const t=await fetch("/files/trash",{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"});if(!t.ok)throw new Error("Failed to fetch trash items");const e=await t.json().catch(()=>null);console.log("loadTrashItems: API response:",e);let n=[];Array.isArray(e)?n=e:e&&Array.isArray(e.data)||e&&e.success&&Array.isArray(e.data)?n=e.data:e&&e.items&&Array.isArray(e.items)&&(n=e.items),console.log("loadTrashItems: received",n.length,"items from API");const i=n;c.breadcrumbs=[],c.currentParentId=null,Ko(i.length),ue([],"trash"),be(i)}catch(t){console.error("Error loading trash items:",t),o.innerHTML=`
            <div class="p-4 text-center text-text-secondary col-span-full">
                <p class="mb-2">${window.I18N.fileFolder.errorLoading}</p>
                <p class="text-xs text-red-500">${T(t.message||"")}</p>
            </div>
        `}}async function jo(o){const t=document.getElementById("filesContainer");if(!t){console.error("Items container not found");return}if(o==null||o==="null"){c.currentParentId=null,c.breadcrumbs=[],await Z();return}try{t.dataset.view="trash",t.innerHTML='<div class="flex justify-center items-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>';const e=await fetch("/files/trash",{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"});if(!e.ok)throw new Error("Failed to fetch trash items");const n=await e.json().catch(()=>null);let i=[];Array.isArray(n)?i=n:n&&Array.isArray(n.data)||n&&n.success&&Array.isArray(n.data)?i=n.data:n&&n.items&&Array.isArray(n.items)&&(i=n.items);const r=i.filter(s=>s.parent_id==o);be(r),ue(c.breadcrumbs,"trash")}catch(e){console.error("Error loading trash items in folder:",e),t.innerHTML=`
            <div class="p-4 text-center text-text-secondary col-span-full">
                <p class="mb-2">Error loading trash items. Please try again.</p>
                <p class="text-xs text-red-500">${T(e.message||"")}</p>
            </div>
        `}}function Ko(o){var a,m,p,h;const t=document.getElementById("trashBanner");t&&t.remove();const e=document.getElementById("filesContainer"),n=(e==null?void 0:e.dataset.view)==="trash";if(o===0||!n)return;const i=document.getElementById("filesContainer");if(!i)return;const r=document.createElement("div");r.id="trashBanner",r.className="flex items-center justify-between px-6 py-3 mb-4 bg-surface-dark border border-border-light rounded-lg",r.innerHTML=`
        <div class="flex items-center gap-2 text-text-secondary text-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>${((m=(a=window.I18N)==null?void 0:a.fileFolder)==null?void 0:m.trashWarning)||"Items in trash will be deleted forever after 30 days"}</span>
        </div>
        <button 
            id="emptyTrashBtn" 
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-surface-dark"
        >
            ${((h=(p=window.I18N)==null?void 0:p.fileFolder)==null?void 0:h.emptyTrash)||"Empty trash"}
        </button>
    `,i.parentNode.insertBefore(r,i);const s=document.getElementById("emptyTrashBtn");s&&s.addEventListener("click",Jo)}async function Jo(){var n,i;if(!window.confirm(((i=(n=window.I18N)==null?void 0:n.fileFolder)==null?void 0:i.emptyTrashConfirm)||"Are you sure you want to permanently delete all items in trash? This action cannot be undone."))return;const t=document.getElementById("emptyTrashBtn");if(!t)return;const e=t.textContent;t.disabled=!0,t.textContent=window.I18N.fileFolder.btnEmptying,t.classList.add("opacity-50","cursor-not-allowed");try{const r=await fetch("/files/trash/empty",{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json","X-CSRF-TOKEN":I(),"X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"}),s=await r.json();if(r.ok&&s.success){f(s.message||window.I18N.fileFolder.msgTrashEmptied,"success");const a=document.getElementById("trashBanner");a&&a.remove(),await Z()}else throw new Error(s.message||window.I18N.fileFolder.msgTrashEmptyFailed)}catch(r){console.error("Error emptying trash:",r),f(r.message||window.I18N.fileFolder.msgTrashEmptyFailed,"error"),t.disabled=!1,t.textContent=e,t.classList.remove("opacity-50","cursor-not-allowed")}}function ce(o,t){const e=document.getElementById("filesContainer"),n=(e==null?void 0:e.dataset.view)==="trash";if(n&&(o==="trash"||o===null||o==="null")){c.currentParentId=null,c.breadcrumbs=[],ue([],"trash"),Bo(),Z();return}if(o===null||o==="null")c.breadcrumbs=[];else{const i=c.breadcrumbs.findIndex(r=>r.id==o);i!==-1?c.breadcrumbs=c.breadcrumbs.slice(0,i+1):c.breadcrumbs.push({id:o,name:t})}if(Bo(),o===null||o==="null")c.currentParentId=null;else{const i=parseInt(o,10);c.currentParentId=Number.isNaN(i)?o:i}localStorage.setItem("currentParentId",c.currentParentId),document.getElementById("currentFolderId").value=c.currentParentId,localStorage.setItem("breadcrumbs",JSON.stringify(c.breadcrumbs)),c.currentPage=1,c.lastMainSearch="",document.getElementById("mainSearchInput").value="",n?jo(c.currentParentId):ee(c.lastMainSearch,c.currentPage,c.currentParentId),ue(c.breadcrumbs,n?"trash":"main")}function Ho(o){var n;if(!o)return"📄";const t=(n=o.split(".").pop())==null?void 0:n.toLowerCase();return{pdf:"📄",doc:"📝",docx:"📝",xls:"📊",xlsx:"📊",ppt:"📺",pptx:"📺",jpg:"🖼️",jpeg:"🖼️",png:"🖼️",gif:"🖼️",mp4:"🎥",avi:"🎥",mov:"🎥",mp3:"🎵",wav:"🎵",zip:"📦",rar:"📦",txt:"📄"}[t]||"📄"}function Yo(o){const t=document.getElementById("filesContainer");t&&(o==="list"?t.className="grid grid-cols-1 gap-2":t.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4")}function Zo(o){var a,m,p,h,y,x,L,A,M,v;const t=!!o.is_folder,e=o.file_name||o.name||"Untitled",n=t?"📁":Ho(e),i=o.updated_at||o.created_at;let r="—";if(i){const b=new Date(i);isNaN(b.getTime())||(r=b.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}))}const s=document.createElement("div");return s.className="group relative rounded-lg border border-[#4A4D6A] hover:border-[#7C7F96] hover:shadow-lg transition-all duration-200 cursor-pointer file-card",s.classList.add("file-card"),t?(s.setAttribute("data-folder-nav-id",o.id),s.setAttribute("data-folder-nav-name",e)):(s.setAttribute("data-file-id",o.id),s.setAttribute("data-is-folder","false")),s.dataset.itemId=o.id,s.dataset.isFolder=t,s.dataset.itemName=e,t&&(s.dataset.folderNavId=o.id,s.dataset.folderNavName=e),s.setAttribute("tabindex","0"),s.setAttribute("role","button"),s.setAttribute("aria-label",`Open ${t?"folder":"file"} ${e}`),s.innerHTML=`
        <!-- Header with OTP indicator and three-dot menu -->
        <div class="absolute top-2 left-2 right-2 flex justify-between items-center z-9">
            <!-- OTP Security Indicator -->
                ${!t&&o.is_confidential?`
                <div class="bg-orange-500 text-white p-1 rounded-full" title="${((m=(a=window.I18N)==null?void 0:a.fileFolder)==null?void 0:m.delete)||"OTP Protected"}" data-tooltip="${((h=(p=window.I18N)==null?void 0:p.fileFolder)==null?void 0:h.delete)||"OTP Protected"}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
            `:"<div></div>"}
            
            <!-- Actions Menu Button -->
            <button class="actions-menu-btn opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-[#4A4D6A]" 
                    data-item-id="${o.id}" 
                    title="${((x=(y=window.I18N)==null?void 0:y.fileFolder)==null?void 0:x.moreActions)||"More actions"}"
                    data-tooltip="${((A=(L=window.I18N)==null?void 0:L.fileFolder)==null?void 0:A.moreActions)||"More actions"}"
                    aria-label="More actions"
                    aria-haspopup="menu"
                    aria-expanded="false">
                <svg viewBox="0 0 20 20" class="w-5 h-5 text-gray-300 hover:text-white" fill="currentColor">
                    <path d="M10 6c.82 0 1.5-.68 1.5-1.5S10.82 3 10 3s-1.5.67-1.5 1.5S9.18 6 10 6zm0 5.5c.82 0 1.5-.68 1.5-1.5s-.68-1.5-1.5-1.5-1.5.68-1.5 1.5.68 1.5 1.5 1.5zm0 5.5c.82 0 1.5-.67 1.5-1.5 0-.82-.68-1.5-1.5-1.5s-1.5.68-1.5 1.5c0 .83.68 1.5 1.5 1.5z"></path>
                </svg>
            </button>
        </div>

    <!-- Main content area -->
    <div class="p-4">
        <!-- Single icon here -->
        <div class="flex items-center justify-center h-16 mb-3">
            <span class="text-5xl">${n}</span>
        </div>
        
        <!-- File info -->
        <div class="space-y-1">
            <div class="text-sm font-medium text-white truncate" title="${T(e)}">
                ${T(e)}
            </div>
            <div class="text-xs text-gray-400">
                ${r}
            </div>
            
            <!-- Arweave Status Badge (for files stored on Arweave) -->
            ${!t&&o.is_blockchain_stored?`
                <div class="mt-3 pt-2 border-t border-[#4A4D6A]">
                    <div class="w-full flex items-center justify-center px-3 py-2 text-xs bg-green-600 text-white rounded-md font-medium">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        ${((v=(M=window.I18N)==null?void 0:M.fileFolder)==null?void 0:v.storedOnArweave)||"Stored on Arweave"}
                    </div>
                </div>
            `:""}
        </div>
    </div>

    <!-- Hover overlay for selection -->
    <div class="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-200 pointer-events-none"></div>
`,s}function Qo(o){const t=!!o.is_folder,e=o.file_name||o.name||"Untitled",n=t?"📁":Ho(e),i=t?"":typeof o.file_size<"u"?ge(parseInt(o.file_size||0,10)):"",r=o.updated_at||o.created_at;let s="";if(r){const m=new Date(r);isNaN(m.getTime())||(s=m.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}))}const a=document.createElement("div");return a.className="file-row bg-[#2A2D47] p-3 rounded-lg flex items-center justify-between hover:border-[#6B7280] border border-[#4A4D6A] transition-all cursor-pointer",a.dataset.itemId=o.id,a.dataset.fileId=o.id,a.dataset.isFolder=t,a.dataset.itemName=e,t&&(a.dataset.folderNavId=o.id,a.dataset.folderNavName=e),a.setAttribute("tabindex","0"),a.setAttribute("role","button"),a.setAttribute("aria-label",`Open ${t?"folder":"file"} ${e}`),a.innerHTML=`
        <div class="flex items-center min-w-0">
            <span class="text-2xl mr-3">${n}</span>
            <span class="text-sm text-white truncate" title="${T(e)}">${T(e)}</span>
        </div>
        <div class="flex items-center text-xs text-gray-300 gap-3">
            ${i?`<span class="hidden sm:inline">${i}</span>`:""}
            ${s?`<span class="hidden sm:inline">${s}</span>`:""}
            <button class="actions-menu-btn p-2 rounded hover:bg-[#4A4D6A]" data-item-id="${o.id}" data-tooltip="More actions" title="More actions" aria-label="More actions">
                <svg viewBox="0 0 20 20" class="w-5 h-5 text-gray-300 hover:text-white" fill="currentColor">
                    <path d="M10 6c.82 0 1.5-.68 1.5-1.5S10.82 3 10 3s-1.5.67-1.5 1.5S9.18 6 10 6zm0 5.5c.82 0 1.5-.68 1.5-1.5s-.68-1.5-1.5-1.5-1.5.68-1.5 1.5.68 1.5 1.5 1.5zm0 5.5c.82 0 1.5-.67 1.5-1.5 0-.82-.68-1.5-1.5-1.5s-1.5.68-1.5 1.5c0 .83.68 1.5 1.5 1.5z"></path>
                </svg>
            </button>
        </div>
    `,a}function Q(o){var t;return((t=c.lastItems)==null?void 0:t.find(e=>e.id==o))||null}function be(o){var i,r;const t=document.getElementById("filesContainer");if(!t)return;if(t.innerHTML="",o.length===0){t.innerHTML=`<p class="text-gray-400 text-center col-span-full py-10">${((r=(i=window.I18N)==null?void 0:i.fileFolder)==null?void 0:r.noFilesFound)||"No files or folders found."}</p>`;return}c.lastItems=o,Yo(c.layout);const e=c.layout!=="list",n=document.createDocumentFragment();o.forEach(s=>{const a=e?Zo(s):Qo(s);n.appendChild(a)}),t.appendChild(n),t.querySelectorAll(".actions-menu-btn").forEach(s=>{s.addEventListener("click",a=>{a.stopPropagation();const m=a.currentTarget.dataset.itemId;_o(a.currentTarget,m)}),s.addEventListener("keydown",a=>{if(a.key==="Enter"||a.key===" "){a.preventDefault();const m=a.currentTarget.dataset.itemId;_o(a.currentTarget,m)}})}),t==null||t.dataset.view,t.querySelectorAll("[data-folder-nav-id]").forEach(s=>{s.addEventListener("click",a=>{if(Po(a,s.dataset.itemId))return;const p=a.currentTarget.dataset.folderNavId,h=a.currentTarget.dataset.folderNavName;ce(p,h)}),s.addEventListener("keydown",a=>{if(a.key==="Enter"||a.key===" "){a.preventDefault();const m=a.currentTarget.dataset.folderNavId,p=a.currentTarget.dataset.folderNavName;ce(m,p)}})}),t.querySelectorAll("[data-file-id]").forEach(s=>{s.addEventListener("click",a=>{if(Po(a,s.dataset.fileId))return;const p=s.dataset.fileId;s.dataset.isFolder==="true"||pe(p)}),s.addEventListener("keydown",a=>{if(a.key==="Enter"||a.key===" "){a.preventDefault();const m=a.currentTarget.dataset.fileId;a.currentTarget.dataset.isFolder==="true"||pe(m)}})}),t.querySelectorAll("[data-item-id]").forEach(s=>{s.addEventListener("dblclick",a=>{a.preventDefault(),a.stopPropagation();const m=s.dataset.itemId,p=Q(m);p&&(p.is_folder?ce(m,p.file_name||p.name):pe(m))})})}function en(){document.querySelectorAll(".actions-menu").forEach(o=>o.remove()),document.querySelectorAll('.actions-menu-btn[aria-expanded="true"]').forEach(o=>o.setAttribute("aria-expanded","false"))}function qo(){const o=document.getElementById("trashBanner");o&&o.remove()}async function _o(o,t){var P,O,oe,ne,S,j,H,ie,G,re,K,ye,xe,Ie,Fe,ke,Ne,Ee,Ae,$e,Se,Ce,Te,Le,Me,Be,Pe,_e,De,Re,Oe,je,He,qe,Ve,Xe,ze,Ue,We,Ge,Ke,Je,Ye,Ze,Qe,et,tt,ot,nt,it,rt,st,at,lt,dt,ct,ut,mt,ft,pt,wt,gt,ht,vt,bt,yt,xt,It,Ft,kt,Nt,Et,At,$t,St,Ct,Tt,Lt,Mt,Bt,Pt,_t,Dt,Rt,Ot,jt,Ht,qt,Vt,Xt,zt,Ut,Wt,Gt,Kt,Jt,Yt,Zt,Qt,eo,to,oo,no,io,ro,so,ao,lo,co,uo,mo,fo,po,wo,go,ho,vo,bo,yo,xo,Io,Fo,ko,No,Eo,Ao,$o,So,Co,To,Lo;en();const e=document.getElementById("filesContainer"),n=document.createElement("div");n.className="actions-menu absolute bg-[#1F2235] text-gray-200 rounded-lg shadow-lg border border-[#4A4D6A] py-2 z-50 min-w-[160px] max-h-64 overflow-auto",n.setAttribute("role","menu"),n.style.zIndex="9999",n.style.top="100%",n.style.bottom="auto",n.style.right="0",n.style.left="auto",n.style.pointerEvents="auto";const i=((P=document.getElementById("filesContainer"))==null?void 0:P.dataset.view)==="trash",r=Q(t),s=d=>d===!0||d===1||d==="1"||d==="true",a=s(r==null?void 0:r.is_folder),m=s(r==null?void 0:r.is_blockchain_stored),p=s(r==null?void 0:r.is_vectorized)&&(r==null?void 0:r.vectorized_at)!=null,h=!!(r!=null&&r.deleted_at),y=s(r==null?void 0:r.is_confidential)||s(r==null?void 0:r.has_otp_protection);if(console.debug("[actions-menu] open",{itemId:t,inTrashView:i,isVectorized:p,isBlockchainStored:m,isFolder:a,isDeleted:h,isOtpEnabled:y}),i)n.innerHTML=`
            <button type="button" class="actions-menu-item w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#2A2D47] hover:text-white flex items-center" data-action="restore" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((oe=(O=window.I18N)==null?void 0:O.fileFolder)==null?void 0:oe.restoreAction)||"Restore"}" data-tooltip="${((S=(ne=window.I18N)==null?void 0:ne.fileFolder)==null?void 0:S.restoreAction)||"Restore"}">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h4l3-3m0 0l3 3m-3-3v12" />
     
            </svg>
                ${((H=(j=window.I18N)==null?void 0:j.fileFolder)==null?void 0:H.restoreAction)||"Restore"}
            </button>
            <button type="button" class="actions-menu-item w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2A2D47] hover:text-red-300 flex items-center" data-action="force-delete" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((G=(ie=window.I18N)==null?void 0:ie.fileFolder)==null?void 0:G.deletePermanently)||"Delete permanently"}" data-tooltip="${((K=(re=window.I18N)==null?void 0:re.fileFolder)==null?void 0:K.deletePermanently)||"Delete permanently"}">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                ${((xe=(ye=window.I18N)==null?void 0:ye.fileFolder)==null?void 0:xe.deletePermanently)||"Delete permanently"}
            </button>
        `;else{let d="";if(a?d+=`
                <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-[#2A2D47] hover:text-blue-300 flex items-center" data-action="open-folder" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Fe=(Ie=window.I18N)==null?void 0:Ie.fileFolder)==null?void 0:Fe.openFolder)||"Open folder"}" data-tooltip="${((Ne=(ke=window.I18N)==null?void 0:ke.fileFolder)==null?void 0:Ne.openFolder)||"Open folder"}">
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                    </svg>
                    ${((Ae=(Ee=window.I18N)==null?void 0:Ee.fileFolder)==null?void 0:Ae.open)||"Open"}
                </button>
        
            `:d+=`
                <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-[#2A2D47] hover:text-blue-300 flex items-center" data-action="open" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Se=($e=window.I18N)==null?void 0:$e.fileFolder)==null?void 0:Se.openFile)||"Open file"}" data-tooltip="${((Te=(Ce=window.I18N)==null?void 0:Ce.fileFolder)==null?void 0:Te.openFile)||"Open file"}">
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    ${((Me=(Le=window.I18N)==null?void 0:Le.fileFolder)==null?void 0:Me.open)||"Open"}
                </button>
            `,d+=`
            <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#2A2D47] hover:text-white flex items-center" data-action="rename" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Pe=(Be=window.I18N)==null?void 0:Be.fileFolder)==null?void 0:Pe.rename)||"Rename"}" data-tooltip="${((De=(_e=window.I18N)==null?void 0:_e.fileFolder)==null?void 0:De.rename)||"Rename"}">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 
002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                ${((Oe=(Re=window.I18N)==null?void 0:Re.fileFolder)==null?void 0:Oe.rename)||"Rename"}
            </button>
            <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#2A2D47] hover:text-white flex items-center" data-action="delete" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((He=(je=window.I18N)==null?void 0:je.fileFolder)==null?void 0:He.delete)||"Delete"}" data-tooltip="${((Ve=(qe=window.I18N)==null?void 0:qe.fileFolder)==null?void 0:Ve.delete)||"OTP Protected"}">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                ${((ze=(Xe=window.I18N)==null?void 0:Xe.fileFolder)==null?void 0:ze.delete)||"Delete"}
            </button>
            <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#2A2D47] hover:text-white flex items-center" data-action="move" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((We=(Ue=window.I18N)==null?void 0:Ue.fileFolder)==null?void 0:We.move)||"Move"}" data-tooltip="${((Ke=(Ge=window.I18N)==null?void 0:Ge.fileFolder)==null?void 0:Ke.move)||"Move"}">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
  
                </svg>
                ${((Ye=(Je=window.I18N)==null?void 0:Je.fileFolder)==null?void 0:Ye.move)||"Move"}
            </button>
        `,(!y||a)&&(d+=`
                <div class="border-t border-[#4A4D6A] my-1"></div>
                <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-indigo-400 hover:bg-[#2A2D47] hover:text-indigo-300 flex items-center" data-action="share" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Qe=(Ze=window.I18N)==null?void 0:Ze.fileFolder)==null?void 0:Qe.share)||"Share"}" data-tooltip="${((tt=(et=window.I18N)==null?void 0:et.fileFolder)==null?void 0:tt.share)||"Share"}">
    
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                
                </svg>
                    ${((nt=(ot=window.I18N)==null?void 0:ot.fileFolder)==null?void 0:nt.share)||"Share"}
                </button>
            `),a||(d+=`
                <div class="border-t border-[#4A4D6A] my-1"></div>
                <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-orange-400 hover:bg-[#2A2D47] hover:text-orange-300 flex items-center" data-action="otp-security" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((rt=(it=window.I18N)==null?void 0:it.fileFolder)==null?void 0:rt.otpSecurity)||"OTP Security"}" data-tooltip="${((at=(st=window.I18N)==null?void 0:st.fileFolder)==null?void 0:at.otpSecurity)||"OTP Security"}">
      
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
        
            ${((dt=(lt=window.I18N)==null?void 0:lt.fileFolder)==null?void 0:dt.otpSecurity)||"OTP Security"}
                </button>
            `),!a){const u=(e==null?void 0:e.dataset.view)==="blockchain";u&&m?d+=`
                    <div class="border-t border-[#4A4D6A] my-1"></div>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-purple-400 hover:bg-[#2A2D47] hover:text-purple-300 flex 
items-center" data-action="download-from-blockchain" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((ut=(ct=window.I18N)==null?void 0:ct.fileFolder)==null?void 0:ut.downloadFromBlockchain)||"Download to Supabase storage"}" data-tooltip="${((ft=(mt=window.I18N)==null?void 0:mt.fileFolder)==null?void 0:ft.downloadFromBlockchain)||"Download to Supabase storage"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
     
                   </svg>
                        ${((wt=(pt=window.I18N)==null?void 0:pt.fileFolder)==null?void 0:wt.downloadFromBlockchain)||"Download to Supabase"}
                    </button>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-[#2A2D47] hover:text-blue-300 flex items-center" data-action="view-on-ipfs" data-item-id="${t}" role="menuitem" 
tabindex="-1" title="${((ht=(gt=window.I18N)==null?void 0:gt.fileFolder)==null?void 0:ht.viewOnIPFS)||"View on IPFS Gateway"}" data-tooltip="${((bt=(vt=window.I18N)==null?void 0:vt.fileFolder)==null?void 0:bt.viewOnIPFS)||"View on IPFS Gateway"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
           
             </svg>
                        ${((xt=(yt=window.I18N)==null?void 0:yt.fileFolder)==null?void 0:xt.viewOnIPFS)||"View on IPFS Gateway"}
                    </button>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-[#2A2D47] hover:text-green-300 flex items-center" data-action="copy-ipfs-hash" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Ft=(It=window.I18N)==null?void 0:It.fileFolder)==null?void 0:Ft.copyIPFSHash)||"Copy IPFS Hash"}" data-tooltip="${((Nt=(kt=window.I18N)==null?void 0:kt.fileFolder)==null?void 0:Nt.copyIPFSHash)||"Copy IPFS Hash"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
       
                 </svg>
                        ${((At=(Et=window.I18N)==null?void 0:Et.fileFolder)==null?void 0:At.copyIPFSHash)||"Copy IPFS Hash"}
                    </button>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-yellow-400 hover:bg-[#2A2D47] hover:text-yellow-300 flex items-center" data-action="blockchain-info" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((St=($t=window.I18N)==null?void 0:$t.fileFolder)==null?void 0:St.blockchainInfo)||"Blockchain Information"}" data-tooltip="${((Tt=(Ct=window.I18N)==null?void 0:Ct.fileFolder)==null?void 0:Tt.blockchainInfo)||"Blockchain Information"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     
   </svg>
                        ${((Mt=(Lt=window.I18N)==null?void 0:Lt.fileFolder)==null?void 0:Mt.blockchainInfo)||"Blockchain Info"}
                    </button>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-indigo-400 hover:bg-[#2A2D47] hover:text-indigo-300 flex items-center" data-action="share-ipfs-link" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Pt=(Bt=window.I18N)==null?void 0:Bt.fileFolder)==null?void 0:Pt.shareIPFSLink)||"Share IPFS Link"}" data-tooltip="${((Dt=(_t=window.I18N)==null?void 0:_t.fileFolder)==null?void 0:Dt.shareIPFSLink)||"Share IPFS Link"}">
           
             <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
               
         </svg>
                        ${((Ot=(Rt=window.I18N)==null?void 0:Rt.fileFolder)==null?void 0:Ot.shareIPFSLink)||"Share IPFS Link"}
                    </button>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-cyan-400 hover:bg-[#2A2D47] hover:text-cyan-300 flex items-center" data-action="blockchain-history" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Ht=(jt=window.I18N)==null?void 0:jt.fileFolder)==null?void 0:Ht.blockchainHistory)||"View Blockchain History"}" data-tooltip="${((Vt=(qt=window.I18N)==null?void 0:qt.fileFolder)==null?void 0:Vt.blockchainHistory)||"View Blockchain History"}">
    
                     <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
   
                     ${((zt=(Xt=window.I18N)==null?void 0:Xt.fileFolder)==null?void 0:zt.blockchainHistory)||"View History"}
                    </button>
                    <div class="border-t border-[#4A4D6A] my-1"></div>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2A2D47] hover:text-red-300 flex items-center" data-action="remove-from-blockchain" data-item-id="${t}" role="menuitem" 
tabindex="-1" title="${((Wt=(Ut=window.I18N)==null?void 0:Ut.fileFolder)==null?void 0:Wt.removeFromBlockchain)||"Remove from blockchain"}" data-tooltip="${((Kt=(Gt=window.I18N)==null?void 0:Gt.fileFolder)==null?void 0:Kt.removeFromBlockchain)||"Remove from blockchain"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
         
                </svg>
                        ${((Yt=(Jt=window.I18N)==null?void 0:Jt.fileFolder)==null?void 0:Yt.removeFromBlockchain)||"Remove from Blockchain"}
                    </button>
                `:!u&&!m&&!y&&(d+=`
                    <div class="border-t border-[#4A4D6A] my-1"></div>
               
     <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-purple-400 hover:bg-[#2A2D47] hover:text-purple-300 flex items-center" data-action="upload-to-arweave" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Qt=(Zt=window.I18N)==null?void 0:Zt.fileFolder)==null?void 0:Qt.uploadToArweave)||"Upload to Arweave permanently"}" data-tooltip="${((to=(eo=window.I18N)==null?void 0:eo.fileFolder)==null?void 0:to.uploadToArweave)||"Upload to Arweave permanently"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 
4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        ${((no=(oo=window.I18N)==null?void 0:oo.fileFolder)==null?void 0:no.uploadToArweave)||"Upload to Arweave"}
                    </button>
                `)}!a&&window.userIsPremium?p?(console.debug("[DEBUG] Adding vector remove button for item:",t,{isVectorized:p,isFolder:a}),(!y||a)&&(d+=`
                        <div class="border-t border-[#4A4D6A] my-1"></div>
                        <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2A2D47] hover:text-red-300 flex items-center" data-action="remove-from-vector" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((ro=(io=window.I18N)==null?void 0:io.fileFolder)==null?void 0:ro.removeFromVector)||"Remove from AI vector database"}" data-tooltip="${((ao=(so=window.I18N)==null?void 0:so.fileFolder)==null?void 0:ao.removeFromVector)||"Remove from AI vector database"}">
                            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        
    </svg>
                            ${((co=(lo=window.I18N)==null?void 0:lo.fileFolder)==null?void 0:co.removeFromVector)||"Remove from AI Vector DB"}
                        </button>
                    `)):y||(console.debug("[DEBUG] Adding vector add button for item:",t,{isVectorized:p,isFolder:a}),d+=`
                    <div class="border-t border-[#4A4D6A] my-1"></div>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-[#2A2D47] hover:text-green-300 flex items-center" data-action="add-to-vector" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((mo=(uo=window.I18N)==null?void 0:uo.fileFolder)==null?void 0:mo.shareToAI)||"Share File to A.I."}" data-tooltip="${((po=(fo=window.I18N)==null?void 0:fo.fileFolder)==null?void 0:po.shareToAI)||"Share File to A.I."}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" 
                        viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        ${((go=(wo=window.I18N)==null?void 0:wo.fileFolder)==null?void 0:go.shareToAI)||"Share File to A.I."}
                    </button>
                `):!a&&!window.userIsPremium?(console.debug("[DEBUG] Adding premium upgrade prompt for AI Vector DB"),d+=`
                <div class="border-t border-[#4A4D6A] my-1"></div>
                <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-yellow-400 hover:bg-[#2A2D47] hover:text-yellow-300 flex items-center opacity-60" onclick="showPremiumUpgradeModal('ai')" role="menuitem" tabindex="-1" title="${((vo=(ho=window.I18N)==null?void 0:ho.fileFolder)==null?void 0:vo.shareToAI)||"Share File to A.I."}">
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    ${((yo=(bo=window.I18N)==null?void 0:bo.fileFolder)==null?void 0:yo.shareToAI)||"Share File to A.I."}
</button>
            `):console.debug("[DEBUG] NOT adding vector buttons for folder:",t,{isVectorized:p,isFolder:a});const l=(e==null?void 0:e.dataset.view)==="blockchain";if(!a&&m){const u=s(r==null?void 0:r.is_permanent_storage);l&&!u&&(d+=`
                    <div class="border-t border-[#4A4D6A] my-1"></div>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-purple-400 hover:bg-[#2A2D47] hover:text-purple-300 flex items-center" data-action="enable-permanent-storage" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Io=(xo=window.I18N)==null?void 0:xo.fileFolder)==null?void 0:Io.enablePermanentStorage)||"Enable permanent storage (undeletable)"}" data-tooltip="${((ko=(Fo=window.I18N)==null?void 0:Fo.fileFolder)==null?void 0:ko.enablePermanentStorage)||"Enable permanent storage (undeletable)"}">
            
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
  
                      ${((Eo=(No=window.I18N)==null?void 0:No.fileFolder)==null?void 0:Eo.enablePermanentStorage)||"Enable Permanent Storage"}
                    </button>
                `),!l&&!u&&(d+=`
                    <div class="border-t border-[#4A4D6A] my-1"></div>
                   
     <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-orange-400 hover:bg-[#2A2D47] hover:text-orange-300 flex items-center" data-action="remove-from-blockchain" data-item-id="${t}" role="menuitem" tabindex="-1" title="${(($o=(Ao=window.I18N)==null?void 0:Ao.fileFolder)==null?void 0:$o.removeFromBlockchain)||"Remove from blockchain storage"}" data-tooltip="${((Co=(So=window.I18N)==null?void 0:So.fileFolder)==null?void 0:Co.removeFromBlockchain)||"Remove from blockchain storage"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 
15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        ${((Lo=(To=window.I18N)==null?void 0:To.fileFolder)==null?void 0:Lo.removeFromBlockchain)||"Remove from Blockchain"}
                    </button>
          
                `)}n.innerHTML=d}(async()=>{try{if(!a&&p){const d=await Uo(t);if(d!=null&&d.vectors_soft_deleted){const u=`
                        ${i?'<div class="border-t border-[#4A4D6A] my-1"></div>':""}
                        <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-[#2A2D47] hover:text-green-300 flex items-center" data-action="restore-vectors" data-item-id="${t}" role="menuitem" tabindex="-1" title="${window.I18N.fileFolder.restoreAction} vectors" data-tooltip="${window.I18N.fileFolder.restoreAction} vectors">
                            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v6h6M20 20v-6h-6M20 4l-6 6M4 20l6-6" />
                            </svg>
                            ${window.I18N.fileFolder.restoreAction} vectors
                        </button>
                    `;n.insertAdjacentHTML("beforeend",u)}}}catch(d){console.warn("[actions-menu] processing-status check failed",d)}})();try{document.body.appendChild(n);const d=o.getBoundingClientRect();n.style.position="fixed",n.style.right="auto",n.style.bottom="auto";const l=8,u=-4;n.style.top=`${d.bottom+l}px`,n.style.left=`${d.right+u}px`;const w=n.getBoundingClientRect(),_=window.innerWidth,Mo=window.innerHeight-d.bottom,zo=d.top;Mo<w.height+8&&zo>Mo&&(n.style.top=`${Math.max(8,d.top-w.height)}px`);let de=d.right-w.width+u;de<8&&(de=8),de+w.width>_-8&&(de=Math.max(8,_-w.width-8)),n.style.left=`${de}px`}catch{}o.setAttribute("aria-expanded","true");const x=o.style.pointerEvents;o.style.pointerEvents="none";const L=n.querySelector(".actions-menu-item");L&&L.focus();const A=n.querySelectorAll(".actions-menu-item");console.debug("[DIAGNOSTIC] Menu buttons comparison:"),A.forEach((d,l)=>{const u=d.getBoundingClientRect(),w=window.getComputedStyle(d);console.debug(`[DIAGNOSTIC] Button ${l}:`,{action:d.dataset.action,itemId:d.dataset.itemId,text:d.textContent.trim(),visible:u.width>0&&u.height>0,position:{x:u.x,y:u.y,w:u.width,h:u.height},pointerEvents:w.pointerEvents,zIndex:w.zIndex,display:w.display,opacity:w.opacity,transform:w.transform})});const M=d=>{var w,_;const l=d.target.getBoundingClientRect();let u="";d.target.className&&(typeof d.target.className=="string"?u=d.target.className.split(" ").join("."):d.target.className.baseVal&&(u=d.target.className.baseVal.split(" ").join("."))),console.debug("[DIAGNOSTIC] Global click received:",{target:d.target.tagName+(u?"."+u:""),action:(w=d.target.dataset)==null?void 0:w.action,position:{x:l.x,y:l.y,w:l.width,h:l.height},clickX:d.clientX,clickY:d.clientY,isInMenu:n.contains(d.target),targetText:(_=d.target.textContent)==null?void 0:_.trim().substring(0,20)})};document.addEventListener("click",M,!0),setTimeout(()=>{document.removeEventListener("click",M,!0),console.debug("[DIAGNOSTIC] Global click logger removed")},1e4);function v(){try{document.removeEventListener("click",R)}catch{}try{document.removeEventListener("keydown",W)}catch{}try{document.removeEventListener("click",M,!0)}catch{}try{n.remove()}catch{}try{o.setAttribute("aria-expanded","false")}catch{}try{o.style.pointerEvents=x||""}catch{}}const b=n.querySelector('.actions-menu-item[data-action="delete"]');if(b){const d=l=>{var w;console.debug("[actions-menu-item][direct] event",l.type,{action:"delete",itemId:b.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=b.dataset.itemId;console.debug("[diagnostic] invoking deleteItem from direct button handler",{itemId:u}),we(u),v()};b.addEventListener("click",d)}const D=n.querySelector('.actions-menu-item[data-action="move"]');if(D){const d=l=>{var w;console.debug("[actions-menu-item][direct] event",l.type,{action:"move",itemId:D.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=D.dataset.itemId;console.debug("[diagnostic] invoking showMoveModal from direct button handler",{itemId:u}),wn(u),v()};D.addEventListener("click",d)}const Y=n.querySelector('.actions-menu-item[data-action="otp-security"]');if(Y){const d=async l=>{var w;console.debug("[actions-menu-item][direct] event",l.type,{action:"otp-security",itemId:Y.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);try{const fe=await(await fetch("/file-otp/check-access",{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin"})).json();if(!fe.success||!fe.can_use_otp){f("Please verify your email address to use OTP security features","warning"),v();return}}catch(_){console.error("Failed to check OTP access:",_),f("Failed to check access permissions","error"),v();return}const u=Y.dataset.itemId;console.debug("[diagnostic] invoking showOtpSecurityModal from direct button handler",{itemId:u}),vn(u),v()};Y.addEventListener("click",d)}const g=n.querySelector('.actions-menu-item[data-action="share"]');if(g){const d=l=>{var w;console.debug("[actions-menu-item][direct] event",l.type,{action:"share",itemId:g.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=g.dataset.itemId;Xo(u),v()};g.addEventListener("click",d)}const F=n.querySelector('.actions-menu-item[data-action="restore"]');if(F){const d=l=>{var w;console.debug("[actions-menu-item][direct] event",l.type,{action:"restore",itemId:F.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=F.dataset.itemId;window.confirm(window.I18N.fileFolder.restore+"?")&&(console.debug("[diagnostic] invoking restoreItem from direct button handler",{itemId:u}),tn(u)),v()};F.addEventListener("click",d)}const B=n.querySelector('.actions-menu-item[data-action="force-delete"]');if(B){const d=l=>{var w;console.debug("[actions-menu-item][direct] event",l.type,{action:"force-delete",itemId:B.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=B.dataset.itemId;window.confirm(window.I18N.fileFolder.confirmDeletePerm)&&(console.debug("[diagnostic] invoking forceDeleteItem from direct button handler",{itemId:u}),ln(u)),v()};B.addEventListener("click",d)}const k=n.querySelector('.actions-menu-item[data-action="download-from-blockchain"]');if(k){const d=l=>{var w;console.debug("[actions-menu-item][direct] event",l.type,{action:"download-from-blockchain",itemId:k.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=k.dataset.itemId;window.confirm(window.I18N.fileFolder.confirmDownloadChain)&&(console.debug("[diagnostic] invoking downloadFromBlockchain from direct button handler",{itemId:u}),on(u)),v()};k.addEventListener("click",d)}const q=n.querySelector('.actions-menu-item[data-action="upload-to-blockchain"]');if(q){const d=l=>{var w;l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=q.dataset.itemId;if(console.debug("[actions-menu-item][direct] Upload to blockchain clicked",{action:"upload-to-blockchain",itemId:u,itemIdType:typeof u}),!u||u==="undefined"||u==="null"){console.error("Invalid file ID:",u),alert("Unable to identify file. Please try again."),v();return}window.openPermanentStorageModal?(console.debug("[diagnostic] Opening Arweave payment modal for file:",u),window.openPermanentStorageModal(u)):(console.error("Permanent storage modal not available"),alert("Arweave storage feature is not available. Please refresh the page.")),v()};q.addEventListener("click",d)}const $=n.querySelector('.actions-menu-item[data-action="upload-to-arweave"]');if($){const d=l=>{if(l.preventDefault(),l.stopPropagation(),$.disabled||$.classList.contains("opacity-50")){f("🔐 "+window.I18N.fileFolder.otpProtected,"error"),v();return}const u=$.dataset.itemId;console.log("Upload to Arweave clicked for file:",u),An(u),v()};$.addEventListener("click",d)}const V=n.querySelector('.actions-menu-item[data-action="view-on-ipfs"]');V&&V.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation();const l=V.dataset.itemId;nn(l),v()});const N=n.querySelector('.actions-menu-item[data-action="copy-ipfs-hash"]');N&&N.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation();const l=N.dataset.itemId;rn(l),v()});const se=n.querySelector('.actions-menu-item[data-action="blockchain-info"]');se&&se.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation();const l=se.dataset.itemId;sn(l),v()});const C=n.querySelector('.actions-menu-item[data-action="share-ipfs-link"]');C&&C.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation();const l=C.dataset.itemId;an(l),v()});const J=n.querySelector('.actions-menu-item[data-action="remove-from-blockchain"]');if(J){const d=l=>{l.preventDefault(),l.stopPropagation();const u=J.dataset.itemId;u&&typeof window.removeFromBlockchain=="function"?window.removeFromBlockchain(u):console.error("removeFromBlockchain function not available or item ID missing"),v()};J.addEventListener("click",d)}const X=n.querySelector('.actions-menu-item[data-action="enable-permanent-storage"]');if(X){const d=l=>{l.preventDefault(),l.stopPropagation();const u=X.dataset.itemId;u&&typeof window.enablePermanentStorage=="function"?window.enablePermanentStorage(u):console.error("enablePermanentStorage function not available or item ID missing"),v()};X.addEventListener("click",d)}const E=n.querySelector('.actions-menu-item[data-action="rename"]');if(E){const d=l=>{var w;console.debug("[actions-menu-item][direct] event",l.type,{action:"rename",itemId:E.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=E.dataset.itemId;Vo(u),v()};E.addEventListener("click",d)}const ae=n.querySelector('.actions-menu-item[data-action="open-folder"]');if(ae){const d=l=>{var _;console.debug("[actions-menu-item][direct] event",l.type,{action:"open-folder",itemId:ae.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(_=l.stopImmediatePropagation)==null||_.call(l);const u=ae.dataset.itemId,w=Q(u);w&&ce(w.id,w.file_name||w.name),v()};ae.addEventListener("click",d)}const le=n.querySelector('.actions-menu-item[data-action="open"]');if(le){const d=l=>{var w;console.debug("[actions-menu-item][direct] event",l.type,{action:"open",itemId:le.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=le.dataset.itemId;window.location.href=`/files/${u}/preview`,v()};le.addEventListener("click",d)}const te=n.querySelector('.actions-menu-item[data-action="remove-from-vector"]');if(console.debug("[DEBUG] Looking for vector removal button:",!!te),te){console.debug("[DEBUG] Found vector removal button, attaching listener");const d=l=>{var w;console.debug("[DEBUG] Vector removal button clicked!",l.type,{action:"remove-from-vector",itemId:te.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=te.dataset.itemId;console.debug("[DEBUG] Directly calling removeFromVectorDatabase for itemId:",u);try{dn(u),console.debug("[DEBUG] removeFromVectorDatabase called successfully")}catch(_){console.error("[DEBUG] Error calling removeFromVectorDatabase:",_)}v()};te.addEventListener("click",d)}const z=n.querySelector('.actions-menu-item[data-action="add-to-vector"]');if(console.debug("[DEBUG] Looking for vector add button:",!!z),z){console.debug("[DEBUG] Found vector add button, attaching listener");const d=l=>{var w;if(console.debug("[DEBUG] Vector add button clicked!",l.type,{action:"add-to-vector",itemId:z.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l),z.disabled||z.classList.contains("opacity-50")){f("🔐 This file has OTP protection enabled. Cannot share OTP-protected files with AI.","error"),v();return}const u=z.dataset.itemId;console.debug("[DEBUG] Directly calling addToVectorDatabase for itemId:",u);try{cn(u),console.debug("[DEBUG] addToVectorDatabase called successfully")}catch(_){console.error("[DEBUG] Error calling addToVectorDatabase:",_)}v()};z.addEventListener("click",d)}const U=n.querySelector('.actions-menu-item[data-action="restore-vectors"]');if(U){const d=l=>{var w;console.debug("[actions-menu-item][direct] event",l.type,{action:"restore-vectors",itemId:U.dataset.itemId}),l.preventDefault(),l.stopPropagation(),(w=l.stopImmediatePropagation)==null||w.call(l);const u=U.dataset.itemId;window.confirm(window.I18N.fileFolder.confirmRestoreVec)&&(console.debug("[diagnostic] invoking restoreVectors from direct button handler",{itemId:u}),un(u)),v()};U.addEventListener("click",d)}function R(d){!n.contains(d.target)&&!o.contains(d.target)&&v()}document.addEventListener("click",R);function W(d){d.key==="Escape"&&v()}document.addEventListener("keydown",W)}async function we(o){try{console.debug("[deleteItem] Initiating delete",{itemId:o}),f(window.I18N.fileFolder.btnEmptying.replace("...","")+"...","info");const t=await fetch(`/files/${o}`,{method:"DELETE",headers:{"X-CSRF-TOKEN":I(),"X-XSRF-TOKEN":I(),Accept:"application/json","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"});console.debug("[deleteItem] Fetch completed",{status:t.status});const e=t.headers.get("Content-Type")||"";if(console.debug("[deleteItem] Response received",{status:t.status,ok:t.ok,contentType:e}),!e.includes("application/json")){const n=await t.text().catch(()=>"");throw console.error("[deleteItem] Unexpected non-JSON response body (possible redirect):",n==null?void 0:n.slice(0,200)),new Error("Move to trash failed: unexpected response (are you still logged in?)")}if(!t.ok){let n=`Failed to move item to trash (status ${t.status})`;try{if(e.includes("application/json"))n=(await t.json()).message||n;else{const i=await t.text();console.error("[deleteItem] Non-JSON error response:",i)}}catch(i){console.error("[deleteItem] Error parsing error response:",i)}throw new Error(n)}f(window.I18N.fileFolder.msgDeleteSuccess,"success"),document.dispatchEvent(new CustomEvent("fileDeleted",{detail:{itemId:o}})),ee(c.lastMainSearch,c.currentPage,c.currentParentId)}catch(t){console.error("Error moving item to trash:",t),f(t.message,"error")}}async function tn(o,t=!1){try{console.debug("[restoreItem] Initiating restore",{itemId:o,skipDialog:t});const e=document.getElementById("filesContainer"),n=(e==null?void 0:e.dataset.view)==="trash",i=n&&c.currentParentId!==null;let r=!1;if(i&&!t){if(!window.confirm(`This file will be restored to the root because its parent folder is deleted.

Continue?`)){console.debug("[restoreItem] Restore cancelled by user");return}r=!0}else i&&t&&(r=!0);const s=r?{restore_to_root:!0}:{},a=await fetch(`/files/${o}/restore`,{method:"PATCH",headers:{"X-CSRF-TOKEN":I(),"X-XSRF-TOKEN":I(),Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin",body:Object.keys(s).length>0?JSON.stringify(s):void 0});if(console.debug("[restoreItem] Fetch completed",{status:a.status,restoreToRoot:r}),!a.ok){const m=await a.json().catch(()=>({}));throw new Error(m.message||"Failed to restore item")}f(window.I18N.fileFolder.msgRestoreSuccess,"success"),document.dispatchEvent(new CustomEvent("fileRestored",{detail:{itemId:o}})),typeof Z=="function"&&(n?await jo(c.currentParentId):await Z())}catch(e){console.error("Error restoring item:",e),f(e.message,"error")}}async function on(o){var t;try{f("Downloading file from blockchain...","info");const e=await fetch(`/files/${o}/download-from-blockchain`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.content)||"","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"});if(!e.ok){const i=await e.json().catch(()=>({}));throw new Error(i.message||`Failed to download from blockchain: ${e.status}`)}const n=await e.json();if(n.success){f("File downloaded to Supabase storage successfully","success");const i=document.getElementById("filesContainer");(i==null?void 0:i.dataset.view)==="blockchain"?await loadBlockchainItems():await ee()}else throw new Error(n.message||"Failed to download from blockchain")}catch(e){console.error("Error downloading from blockchain:",e),f(`Failed to download from blockchain: ${e.message}`,"error")}}function nn(o){var i,r;const t=Q(o);if(!t){f(window.I18N.fileFolder.msgFileNotFound,"error");return}let e=t.ipfs_hash;if(!e&&t.blockchain_url){const s=t.blockchain_url.match(/\/ipfs\/([a-zA-Z0-9]+)/);s&&(e=s[1])}if(!e&&t.file_path&&(e=t.file_path.replace("ipfs://","")),!e||e.length<10){f(window.I18N.fileFolder.msgIpfsNotFound,"error");return}const n=`https://arweave.net/${e}`;console.log("Opening IPFS gateway URL:",n),window.open(n,"_blank"),f(((r=(i=window.I18N)==null?void 0:i.fileFolder)==null?void 0:r.viewOnIPFS)+"...","success")}async function rn(o){const t=Q(o);if(!t){f("File not found","error");return}const e=t.ipfs_hash||(t.file_path?t.file_path.replace("ipfs://",""):null);if(!e){f(window.I18N.fileFolder.msgIpfsNotFound,"error");return}try{await navigator.clipboard.writeText(e),f(window.I18N.fileFolder.msgIpfsCopied,"success")}catch{const i=document.createElement("textarea");i.value=e,document.body.appendChild(i),i.select(),document.execCommand("copy"),document.body.removeChild(i),f(window.I18N.fileFolder.msgIpfsCopied,"success")}}function sn(o){var r,s,a,m,p,h;const t=Q(o);if(!t){f("File not found","error");return}const e=t.blockchain_metadata||{},n=t.ipfs_hash||(t.file_path?t.file_path.replace("ipfs://",""):"N/A"),i=`
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="blockchainInfoModal">
            <div class="bg-[#0D0E2F] p-6 rounded-lg max-w-md w-full mx-4 border border-[#4A4D6A]">
                <h3 class="text-lg font-semibold text-white mb-4">${((s=(r=window.I18N)==null?void 0:r.blockchain)==null?void 0:s.blockchainInfo)||((m=(a=window.I18N)==null?void 0:a.fileFolder)==null?void 0:m.blockchainInfo)||"Blockchain Information"}</h3>
                <div class="space-y-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-400">${window.I18N.fileFolder.fileName}:</span>
                        <span class="text-white">${T(t.file_name)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">${window.I18N.fileFolder.provider||"Provider"}:</span>
                        <span class="text-white capitalize">${e.provider||"Arweave"}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">${window.I18N.fileFolder.status||"Status"}:</span>
                        <span class="text-green-400">${e.pin_status||"Pinned"}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">${window.I18N.fileFolder.encrypted||"Encrypted"}:</span>
                        <span class="text-white">${e.encrypted?window.I18N.fileFolder.yes||"Yes":window.I18N.fileFolder.no||"No"}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">${window.I18N.fileFolder.redundancy||"Redundancy"}:</span>
                        <span class="text-white">${e.redundancy_level||3}x</span>
                    </div>
                    <div class="mt-4">
                        <span class="text-gray-400">IPFS Hash:</span>
                        <div class="mt-1 p-2 bg-[#1A1D3A] rounded border font-mono text-xs text-gray-300 break-all">
                            ${n}
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-2 mt-6">
                    <button onclick="document.getElementById('blockchainInfoModal').remove()" 
                        class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                        ${window.I18N.fileFolder.close}
                    </button>
                    <button onclick="copyIPFSHash(${o}); document.getElementById('blockchainInfoModal').remove()" 
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        ${((h=(p=window.I18N)==null?void 0:p.fileFolder)==null?void 0:h.copyHash)||"Copy Hash"}
                    </button>
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",i)}async function an(o){const t=Q(o);if(!t){f("File not found","error");return}const e=t.ipfs_hash||(t.file_path?t.file_path.replace("ipfs://",""):null);if(!e){f(window.I18N.fileFolder.msgIpfsNotFound,"error");return}const n=t.blockchain_url||`https://arweave.net/${e}`,i={title:`SecureDocs: ${t.file_name}`,text:`Check out this file on IPFS: ${t.file_name}`,url:n};try{navigator.share?(await navigator.share(i),f(window.I18N.fileFolder.msgIpfsShared,"success")):(await navigator.clipboard.writeText(n),f(window.I18N.fileFolder.msgIpfsCopied,"success"))}catch(r){console.error("Error sharing:",r),f(window.I18N.fileFolder.msgShareLinkFailed,"error")}}async function ln(o){var t;try{console.debug("Force deleting item:",o);const e=await fetch(`/files/${o}/force-delete`,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.content)||""},credentials:"same-origin"}),n=await e.json();if(!e.ok)throw new Error(n.message||window.I18N.fileFolder.msgVecRestoreFailed);f(window.I18N.fileFolder.msgVecRestoreSuccess,"success"),Z()}catch(e){console.error("Error permanently deleting item:",e),f(e.message,"error")}}async function dn(o){var t;try{console.log("[VECTOR REMOVAL] Starting removal for itemId:",o);const e=I(),n=`/files/${o}/remove-from-vector`;console.log("[VECTOR REMOVAL] Making request to:",n);const i=await fetch(n,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":e},credentials:"same-origin"});console.log("[VECTOR REMOVAL] Response status:",i.status,i.statusText);let r;try{r=await i.json(),console.log("[VECTOR REMOVAL] Response data:",r)}catch(s){throw console.error("[VECTOR REMOVAL] Failed to parse response JSON:",s),new Error("Invalid response from server")}if(!i.ok)throw console.error("[VECTOR REMOVAL] Request failed with status:",i.status,r),new Error(r.message||`HTTP ${i.status}: Failed to remove file from vector database`);console.log("[VECTOR REMOVAL] Success! Showing notification..."),window.notificationManager?window.notificationManager.showSuccess(window.I18N.fileFolder.vecRemovedTitle||"Vector Removed Successfully",window.I18N.fileFolder.msgVecRemoved||"File has been removed from AI vector database"):f(window.I18N.fileFolder.msgVecRemoved||"File has been removed from AI vector database","success");try{const s=(t=c.lastItems)==null?void 0:t.find(a=>a.id==o);s&&(console.log("[VECTOR REMOVAL] Updating local state for item:",s.file_name),s.is_vectorized=!1,s.vectorized_at=null)}catch(s){console.debug("[VECTOR REMOVAL] Local state update failed (non-fatal):",s)}console.log("[VECTOR REMOVAL] Reloading file list..."),ee(c.lastMainSearch,c.currentPage,c.currentParentId)}catch(e){console.error("[VECTOR REMOVAL] Error removing file from vector database:",e),window.notificationManager?window.notificationManager.showError(window.I18N.fileFolder.vecRemovalFailedTitle||"Vector Removal Failed",e.message||window.I18N.fileFolder.msgVecRemovalFailed||"Failed to remove file from vector database"):f(e.message||window.I18N.fileFolder.msgVecRemovalFailed||"Failed to remove file from vector database","error")}}async function cn(o){var t;try{const e=I(),n=`/files/${o}/add-to-vector`,i=await fetch(n,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":e},credentials:"same-origin"});let r;try{r=await i.json()}catch(s){throw console.error("Failed to parse vectorization response JSON:",s),new Error("Invalid response from server")}if(!i.ok)throw console.error("Vectorization request failed with status:",i.status,r),new Error(r.message||`HTTP ${i.status}: Failed to add file to vector database`);window.notificationManager?window.notificationManager.showSuccess(window.I18N.fileFolder.vecProcessingStartedTitle||"Vector Processing Started",r.message||window.I18N.fileFolder.msgVecStarted||"File sent for vectorization processing"):f(r.message||window.I18N.fileFolder.msgVecStarted||"File sent for vectorization processing","success");try{const s=(t=c.lastItems)==null?void 0:t.find(a=>a.id==o)}catch{}ee(c.lastMainSearch,c.currentPage,c.currentParentId)}catch(e){console.error("Error adding file to vector database:",e),window.notificationManager?window.notificationManager.showError(window.I18N.fileFolder.vecProcessingFailedTitle||"Vector Processing Failed",e.message||window.I18N.fileFolder.msgVecProcessingFailed||"Failed to send file for vector processing"):f(e.message||window.I18N.fileFolder.msgVecProcessingFailed||"Failed to send file for vector processing","error")}}async function un(o){var t;try{console.debug("Restoring vectors for item:",o);const e=await fetch(`/files/${o}/restore-vectors`,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.content)||""},credentials:"same-origin"}),n=await e.json().catch(()=>({}));if(!e.ok)throw new Error(n.message||"Failed to restore vectors");f("Vectors restored successfully.","success");const i=document.getElementById("filesContainer");(i==null?void 0:i.dataset.view)==="trash"&&typeof Z=="function"?await Z():ee(c.lastMainSearch,c.currentPage,c.currentParentId)}catch(e){console.error("Error restoring vectors:",e),f(e.message,"error")}}function mn(o){const t=!!o.is_folder,e=o.file_name||o.name||"Untitled",n=t?0:parseInt(o.file_size||0,10),i=o.updated_at?new Date(o.updated_at).toLocaleDateString():"",r=document.createElement("div");r.className="file-item bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer",r.setAttribute("data-item-id",o.id),r.setAttribute("data-item-name",e),r.setAttribute("data-is-folder",t),t&&(r.setAttribute("data-folder-nav-id",o.id),r.setAttribute("data-folder-nav-name",e));const s=t?"📁":"📄";return r.innerHTML=`
        <div class="flex items-center truncate">
            <span class="text-2xl mr-4">${s}</span>
            <span class="truncate">${T(e)}</span>
        </div>
        <div class="text-sm text-gray-400 flex items-center">
            ${t?"":`<span>${ge(n)}</span><span class="mx-2">|</span>`}
            <span>${T(i)}</span>
            <button class="delete-item-btn ml-4 text-red-500 hover:text-red-400" data-item-id="${o.id}" title="Move to trash" aria-label="Move to trash">🗑️</button>
        </div>
    `,r}function fn(){const o=document.getElementById("filesContainer");o&&(o.querySelectorAll(".delete-item-btn").forEach(t=>{t.addEventListener("click",e=>{e.stopPropagation();const n=e.currentTarget.dataset.itemId;window.confirm(window.I18N.fileFolder.confirmMoveTrash)&&(typeof we=="function"?we(n):window.__files&&window.__files.deleteItem&&window.__files.deleteItem(n))})}),o.querySelectorAll("[data-folder-nav-id]").forEach(t=>{t.addEventListener("click",e=>{const n=e.currentTarget.dataset.folderNavId,i=e.currentTarget.dataset.folderNavName;ce(n,i)})}))}function pn(o,t){var i;const e=document.getElementById("filesPagination");e==null||e.remove();const n=document.createElement("div");n.id="filesPagination",n.className="col-span-full flex justify-center gap-2 mt-4",(t.links||[]).forEach(r=>{const s=document.createElement("button");s.className=`px-3 py-1 rounded ${r.active?"bg-primary text-white":"bg-gray-700 text-gray-200"} ${r.url?"hover:bg-gray-600":"opacity-50 cursor-not-allowed"}`,s.innerText=r.label.replace(/&laquo;|&raquo;/g,"").trim(),r.url||(s.disabled=!0);const a=r.url?new URL(r.url,window.location.origin).searchParams.get("page"):null;a&&s.addEventListener("click",()=>{c.currentPage=parseInt(a),ee(c.lastMainSearch,c.currentPage,c.currentParentId)}),n.appendChild(s)}),(i=o.parentElement)!=null&&i.appendChild(n)||o.appendChild(n)}async function ee(o="",t=1,e=null,n,i,r){var m,p,h,y,x,L,A,M,v,b,D,Y,g,F,B,k,q;const s=document.getElementById("filesContainer");if(!s){console.debug("Items container not found - skipping file loading");return}s.dataset.view="main",qo();const a=Date.now()+Math.random();c.currentRequestId=a;try{s.innerHTML=`<div class="p-4 text-center text-text-secondary col-span-full">${((p=(m=window.I18N)==null?void 0:m.fileFolder)==null?void 0:p.loading)||"Loading..."}</div>`;let $=`/files?page=${t}`;o&&($+=`&q=${encodeURIComponent(o)}`),e!==null&&e!=="null"&&($+=`&parent_id=${e}`);const V=await fetch($,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":((h=document.querySelector('meta[name="csrf-token"]'))==null?void 0:h.content)||""},credentials:"same-origin"});if(c.currentRequestId!==a){console.debug("Ignoring outdated request response");return}if(!V.ok){const E=await V.json().catch(()=>({}));throw new Error(E.message||`HTTP error! Status: ${V.status}`)}const N=await V.json();if(c.currentRequestId!==a){console.debug("Ignoring outdated request response at render time");return}s.innerHTML="";const se=typeof n=="function"?n:mn,C=typeof i=="function"?i:pn,J=typeof r=="function"?r:fn,X=Array.isArray(N==null?void 0:N.data)?N.data:Array.isArray(N)?N:[];if(console.debug("Files API result sample:",X.slice(0,5).map(E=>({id:E.id,file_name:E.file_name,name:E.name,is_folder:E.is_folder}))),X.length===0){const E=o?`<div class="p-4 text-center text-text-secondary col-span-full">${((x=(y=window.I18N)==null?void 0:y.fileFolder)==null?void 0:x.searchResults)||"Search results for:"} <strong>"${o}"</strong></div>`:`<div class="p-4 text-center text-text-secondary col-span-full">${((A=(L=window.I18N)==null?void 0:L.fileFolder)==null?void 0:A.noFilesFound)||"No files or folders found."}</div>`;s.innerHTML=E,(N==null?void 0:N.last_page)>1&&C(s,N);return}if(o&&o.trim()!==""){const E=document.createElement("div");E.className="col-span-full mb-4 p-3 bg-[#2A2D47] rounded-lg flex items-center justify-between",E.innerHTML=`
            <div class="flex items-center gap-2 text-sm text-gray-300">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>${((v=(M=window.I18N)==null?void 0:M.fileFolder)==null?void 0:v.searchResults)||"Search results for:"} <strong>"${o}"</strong> (${X.length} ${X.length===1?((D=(b=window.I18N)==null?void 0:b.fileFolder)==null?void 0:D.item)||"item":((g=(Y=window.I18N)==null?void 0:Y.fileFolder)==null?void 0:g.items)||"items"})</span>
            </div>
            <button onclick="document.getElementById('mainSearchInput').value = ''; window.loadUserFiles('', 1, localStorage.getItem('currentParentId'));" 
                    class="text-xs px-3 py-1 bg-[#3C3F58] hover:bg-[#55597C] rounded-lg transition-colors">
                ${((B=(F=window.I18N)==null?void 0:F.fileFolder)==null?void 0:B.clearSearch)||"Clear Search"}
            </button>
        `,s.appendChild(E)}be(X),(N==null?void 0:N.last_page)>1&&C(s,N)}catch($){console.error("Error loading items:",$),s&&(s.innerHTML=`
                <div class="p-4 text-center text-text-secondary col-span-full">
                    <p class="mb-2">${((q=(k=window.I18N)==null?void 0:k.fileFolder)==null?void 0:q.errorLoading)||"Error loading items. Please try again."}</p>
                    <p class="text-xs text-red-500">${T($.message||"")}</p>
                </div>
            `)}}async function wn(o){try{const t=await fetch(`/files/${o}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin"});if(!t.ok)throw new Error("Failed to get item details");const e=await t.json(),n=e.data||e,i=document.createElement("div");i.className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4",i.innerHTML=`
            <div class="bg-[#1F2235] border border-[#4A4D6A] rounded-xl max-w-md w-full shadow-2xl">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-white">${window.I18N.fileFolder.move} "${T(n.file_name||n.name)}"</h3>
                        <button type="button" class="text-gray-400 hover:text-white" id="close-move-modal">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="mb-4">
                        <p class="text-sm text-gray-300 mb-3">${window.I18N.fileFolder.selectDestination}</p>
                        <div class="bg-[#2A2D47] rounded-lg border border-[#4A4D6A] max-h-64 overflow-y-auto" id="folder-list">
                            <div class="p-3 text-center text-gray-400">${window.I18N.fileFolder.lblLoadingFolders}</div>
                        </div>
                    </div>
                    
                    <div class="flex gap-3 justify-end">
                        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-[#4A4D6A] rounded-lg hover:bg-[#2A2D47] transition-colors" id="cancel-move">
                            ${window.I18N.fileFolder.cancel}
                        </button>
                        <button type="button" class="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" id="confirm-move" disabled>
                            ${window.I18N.fileFolder.moveHere}
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(i),await gn(i,o,n);const r=i.querySelector("#close-move-modal"),s=i.querySelector("#cancel-move"),a=i.querySelector("#confirm-move"),m=()=>{i.remove()};r.addEventListener("click",m),s.addEventListener("click",m),i.addEventListener("click",p=>{p.target===i&&m()}),a.addEventListener("click",async()=>{const p=i.querySelector(".folder-item.selected"),h=p?p.dataset.folderId:null;try{a.disabled=!0,a.textContent=window.I18N.fileFolder.btnMoving,await hn(o,h),m(),window.loadUserFiles&&window.loadUserFiles(c.lastMainSearch,c.currentPage,c.currentParentId),f(window.I18N.fileFolder.msgMoveSuccess,"success")}catch(y){console.error("Move failed:",y),f(y.message||window.I18N.fileFolder.msgMoveFailed,"error"),a.disabled=!1,a.textContent=window.I18N.fileFolder.moveHere}})}catch(t){console.error("Failed to show move modal:",t),f(t.message||window.I18N.fileFolder.msgMoveModalFailed,"error")}}async function gn(o,t,e=null){var i,r,s,a;const n=o.querySelector("#folder-list");try{const m=await fetch("/files?type=folders",{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin"});if(!m.ok)throw new Error("Failed to load folders");const p=await m.json(),h=Array.isArray(p==null?void 0:p.data)?p.data:Array.isArray(p)?p:[],y=Array.isArray(t)?t:[t],x=new Set,L=new Set;let A=[];Array.isArray(e)?A=e:e&&e.id&&(A=[e]),A.forEach(g=>{g&&g.id&&(x.add(g.id),g.file_name&&L.add(g.file_name))}),y.forEach(g=>x.add(g));const M=g=>{h.forEach(F=>{F.parent_id===g&&!x.has(F.id)&&(x.add(F.id),M(F.id))})};x.forEach(g=>{M(g)});const v=h.filter(g=>!x.has(g.id)&&!L.has(g.file_name));n.innerHTML="";const b={};v.forEach(g=>{const F=g.parent_id===null||g.parent_id===void 0?"null":g.parent_id;g._normalizedId=g.id,b[F]||(b[F]=[]),b[F].push(g)}),console.log("🌳 [TREE] Available folders:",v.length),console.log("🌳 [TREE] Folder tree structure:",b),Object.keys(b).forEach(g=>{console.log(`🌳 [TREE] Parent ${g} has ${b[g].length} children:`,b[g].map(F=>F.file_name))}),Object.keys(b).forEach(g=>{b[g].sort((F,B)=>(F.file_name||F.name).localeCompare(B.file_name||B.name))});const D=document.createElement("div");if(D.className="folder-item flex items-center p-3 hover:bg-[#3C3F58] cursor-pointer border-b border-[#4A4D6A]",D.dataset.folderId="null",D.style.paddingLeft="0.75rem",D.innerHTML=`
            <svg class="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            <span class="text-gray-200">${((r=(i=window.I18N)==null?void 0:i.fileFolder)==null?void 0:r.rootFolder)||"Root Folder"}</span>
        `,n.appendChild(D),((g,F=0)=>{const B=b[g]||[];B.forEach((k,q)=>{let $=b[k.id]&&b[k.id].length>0;const V=q===B.length-1;if(console.log(`🌳 [TREE] Checking folder "${k.file_name}" (ID: ${k.id}), hasChildren: ${$}, folderTree[${k.id}]:`,b[k.id]),k.id&&!$&&b[k.id]===void 0){const C=String(k.id);console.log(`🌳 [TREE] Trying string ID "${C}", found:`,b[C]),b[C]&&b[C].length>0&&(console.log(`🌳 [TREE] Type mismatch! Using string ID for folder "${k.file_name}"`),b[k.id]=b[C],$=!0)}const N=document.createElement("div");N.className="folder-item flex items-center hover:bg-[#3C3F58] cursor-pointer border-b border-[#4A4D6A] group",N.dataset.folderId=k.id,N.style.paddingLeft=`${.75+F*1.5}rem`;const se=V?"":"border-l border-[#4A4D6A]";if(N.innerHTML=`
                    <div class="flex items-center w-full py-2">
                        ${$?`
                            <button class="folder-toggle w-5 h-5 mr-1 flex items-center justify-center hover:bg-[#2A2D47] rounded transition-colors flex-shrink-0" data-folder-id="${k.id}">
                                <svg class="w-4 h-4 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        `:`
                            <div class="w-5 mr-1 flex-shrink-0"></div>
                        `}
                        <svg class="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        <span class="text-gray-200 truncate">${T(k.file_name||k.name)}</span>
                    </div>
                `,n.appendChild(N),$){const C=N.querySelector(".folder-toggle");C.addEventListener("click",U=>{U.stopPropagation();const R=C.dataset.expanded==="true";C.dataset.expanded=!R;const W=C.querySelector("svg");W.style.transform=R?"rotate(0deg)":"rotate(90deg)";const P=N.nextElementSibling;P&&P.classList.contains("folder-children")&&(P.style.display=R?"none":"block")});const J=document.createElement("div");J.className="folder-children",J.style.display="none",n.appendChild(J);const X=n,E=J,ae=E.appendChild.bind(E),le=[],te=(U,R)=>{const W=b[U]||[];W.forEach((P,O)=>{const oe=b[P.id]&&b[P.id].length>0,ne=O===W.length-1,S=document.createElement("div");if(S.className="folder-item flex items-center hover:bg-[#3C3F58] cursor-pointer border-b border-[#4A4D6A]",S.dataset.folderId=P.id,S.style.paddingLeft=`${.75+R*1.5}rem`,S.innerHTML=`
                                <div class="flex items-center w-full py-2">
                                    ${oe?`
                                        <button class="folder-toggle w-5 h-5 mr-1 flex items-center justify-center hover:bg-[#2A2D47] rounded transition-colors flex-shrink-0" data-folder-id="${P.id}">
                                            <svg class="w-4 h-4 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    `:`
                                        <div class="w-5 mr-1 flex-shrink-0"></div>
                                    `}
                                    <svg class="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
                                    </svg>
                                    <span class="text-gray-200 truncate">${T(P.file_name||P.name)}</span>
                                </div>
                            `,E.appendChild(S),oe){const j=S.querySelector(".folder-toggle");j.addEventListener("click",ie=>{ie.stopPropagation();const G=j.dataset.expanded==="true";j.dataset.expanded=!G;const re=j.querySelector("svg");re.style.transform=G?"rotate(0deg)":"rotate(90deg)";const K=S.nextElementSibling;K&&K.classList.contains("folder-children")&&(K.style.display=G?"none":"block")});const H=document.createElement("div");H.className="folder-children",H.style.display="none",E.appendChild(H),z(P.id,R+1,H)}})},z=(U,R,W)=>{(b[U]||[]).forEach((O,oe)=>{const ne=b[O.id]&&b[O.id].length>0,S=document.createElement("div");if(S.className="folder-item flex items-center hover:bg-[#3C3F58] cursor-pointer border-b border-[#4A4D6A]",S.dataset.folderId=O.id,S.style.paddingLeft=`${.75+R*1.5}rem`,S.innerHTML=`
                                <div class="flex items-center w-full py-2">
                                    ${ne?`
                                        <button class="folder-toggle w-5 h-5 mr-1 flex items-center justify-center hover:bg-[#2A2D47] rounded transition-colors flex-shrink-0" data-folder-id="${O.id}">
                                            <svg class="w-4 h-4 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    `:`
                                        <div class="w-5 mr-1 flex-shrink-0"></div>
                                    `}
                                    <svg class="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
                                    </svg>
                                    <span class="text-gray-200 truncate">${T(O.file_name||O.name)}</span>
                                </div>
                            `,W.appendChild(S),ne){const j=S.querySelector(".folder-toggle");j.addEventListener("click",ie=>{ie.stopPropagation();const G=j.dataset.expanded==="true";j.dataset.expanded=!G;const re=j.querySelector("svg");re.style.transform=G?"rotate(0deg)":"rotate(90deg)";const K=S.nextElementSibling;K&&K.classList.contains("folder-children")&&(K.style.display=G?"none":"block")});const H=document.createElement("div");H.className="folder-children",H.style.display="none",W.appendChild(H),z(O.id,R+1,H)}})};te(k.id,F+1)}})})("null",0),v.length===0){const g=document.createElement("div");g.className="p-3 text-center text-gray-400",g.textContent=((a=(s=window.I18N)==null?void 0:s.fileFolder)==null?void 0:a.noFolders)||"No folders available. You can only move to root folder.",n.appendChild(g)}n.addEventListener("click",g=>{if(g.target.nodeType!==1)return;const F=g.target.closest(".folder-item"),B=g.target.closest(".folder-toggle");if(F&&!B){n.querySelectorAll(".folder-item").forEach(q=>{q.classList.remove("selected","bg-blue-600")}),F.classList.add("selected","bg-blue-600");const k=o.querySelector("#confirm-move");k.disabled=!1}})}catch(m){console.error("Failed to load folders:",m),n.innerHTML=`
            <div class="p-3 text-center text-red-400">
                ${window.I18N.fileFolder.msgLoadFoldersFailed}
            </div>
        `}}async function hn(o,t){const e=await fetch(`/files/${o}/move`,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin",body:JSON.stringify({parent_id:t==="null"?null:parseInt(t)})});if(!e.ok){const n=await e.json().catch(()=>({}));throw new Error(n.message||`Failed to move item (${e.status})`)}return e.json()}function vn(o){const t=document.getElementById("otpSecurityModal");t&&t.remove();const e=document.createElement("div");e.id="otpSecurityModal",e.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",e.innerHTML=`
        <div class="bg-[#1F2235] rounded-lg p-6 w-full max-w-md mx-4 border border-[#3C3F58]">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-white">${window.I18N.fileFolder.otpSettingsTitle}</h3>
                <button id="closeOtpModal" class="text-gray-400 hover:text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div id="otpSecurityContent">
                <div class="flex items-center justify-center py-8">
                    <div class="animate-spin w-6 h-6 border-2 border-[#f89c00] border-t-transparent rounded-full"></div>
                    <span class="ml-2 text-gray-400">${window.I18N.fileFolder.loading}</span>
                </div>
            </div>
        </div>
    `,document.body.appendChild(e);const n=()=>e.remove();e.querySelector("#closeOtpModal").addEventListener("click",n),e.addEventListener("click",i=>{i.target===e&&n()}),bn(o)}async function bn(o){try{const e=await(await fetch("/file-otp/check-access",{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin"})).json();if(!e.success||!e.can_use_otp){const r=document.getElementById("otpSecurityContent");r&&(r.innerHTML=`
                    <div class="text-center py-6">
                        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L3.349 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-white mb-2">${window.I18N.fileFolder.msgEmailVerifyReq}</h3>
                        <p class="text-gray-400 text-sm mb-4">${e.message}</p>
                        <div class="space-y-3">
                             <a href="/profile" 
                               class="inline-block px-4 py-2 bg-[#f89c00] text-white rounded-lg hover:bg-[#e6890d] transition-colors">
                                ${window.I18N.fileFolder.btnVerifyEmail}
                             </a>
                            <div class="text-xs text-gray-500">
                                ${window.I18N.fileFolder.msgEmailVerifyDesc}
                            </div>
                        </div>
                    </div>
                `);return}const i=await(await fetch(`/file-otp/status?file_type=regular&file_id=${o}`,{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin"})).json();if(i.success)yn(o,i);else throw new Error(i.message||"Failed to load OTP status")}catch(t){console.error("Failed to load OTP status:",t);const e=document.getElementById("otpSecurityContent");e&&(e.innerHTML=`
                <div class="text-center py-4">
                    <div class="text-red-400 mb-2">Failed to load OTP settings</div>
                    <button onclick="loadOtpStatus(${o})" class="text-[#f89c00] hover:text-[#e88900] text-sm">Try Again</button>
                </div>
            `)}}function yn(o,t){const e=document.getElementById("otpSecurityContent");if(!e)return;const n=t.otp_enabled;if(e.innerHTML=`
        <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-[#2A2A3E] rounded-lg">
                <div>
                    <div class="text-white font-medium">${window.I18N.fileFolder.emailOtpProtection}</div>
                    <div class="text-sm text-gray-400">${window.I18N.fileFolder.otpRequireDesc}</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="otpToggle" class="sr-only peer" ${n?"checked":""}>
                    <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f89c00]"></div>
                </label>
            </div>

            ${n?"":`
                <div class="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <div class="text-yellow-400 text-sm font-medium mb-2">⚠️ ${window.I18N.fileFolder.importantNotice}</div>
                        <div class="text-yellow-300 text-xs space-y-2">
                            <p>${window.I18N.fileFolder.otpWarningDesc}</p>
    
                            <ul class="list-disc list-inside ml-1 space-y-1">
                                <li>${window.I18N.fileFolder.otpWarningList1}</li>
                                <li>${window.I18N.fileFolder.otpWarningList2}</li>
                                <li>${window.I18N.fileFolder.otpWarningList3}</li>
                                <li>${window.I18N.fileFolder.otpWarningList4}</li>
                            </ul>
            
                            <p class="mt-2">${window.I18N.fileFolder.otpWarningFooter}</p>
                        </div>
                    </div>
            `}

            ${n?`
                <div class="space-y-3">
                    <div class="grid grid-cols-2 gap-3">
                        <label class="flex items-center">
                            <input type="checkbox" id="requireDownload" class="mr-2 text-[#f89c00] bg-[#2A2A3E] 
                            border-[#3C3F58] rounded focus:ring-[#f89c00]" ${t.require_otp_for_download?"checked":""}>
                            <span class="text-sm text-gray-300">${window.I18N.fileFolder.requireDownload}</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" id="requirePreview" class="mr-2 text-[#f89c00] bg-[#2A2A3E] border-[#3C3F58] rounded focus:ring-[#f89c00]" ${t.require_otp_for_preview?"checked":""}>
                            <span class="text-sm text-gray-300">${window.I18N.fileFolder.requirePreview}</span>
                        </label>
                    </div>

                    <div class="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                        <div class="text-blue-400 text-sm font-medium mb-2">🔒 ${window.I18N.fileFolder.sharedLinkManagement}</div>
                        <div class="text-blue-300 text-xs mb-3">${window.I18N.fileFolder.deleteSharedLinkDesc}</div>
                        <button id="deleteSharedLink" class="w-full px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                            ${window.I18N.fileFolder.deleteSharedLinkBtn}
                        </button>
                    </div>

                    <div class="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                        <div class="text-red-400 text-sm font-medium mb-2">⚠️ ${window.I18N.fileFolder.disableOtpHeader}</div>
                        <div class="text-red-300 text-xs mb-3">${window.I18N.fileFolder.disableOtpDesc}</div>
                        <div class="flex gap-2">
                            <button id="sendDisableOtp" class="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors">
                                ${window.I18N.fileFolder.sendOtp}
                            </button>
                            <input type="text" id="disableOtpCode" placeholder="${window.I18N.fileFolder.phEnterOtp}" maxlength="6" class="px-2 py-1 bg-[#2A2A3E] border border-[#3C3F58] rounded text-white text-xs flex-1" disabled>
                   
                            <button id="confirmDisableOtp" class="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors" disabled>
                                ${window.I18N.fileFolder.disable}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm text-gray-300 mb-1">${window.I18N.fileFolder.otpDuration}</label>
                        <select id="otpDuration" class="w-full px-3 py-2 bg-[#2A2A3E] border border-[#3C3F58] rounded-md text-white focus:border-[#f89c00] focus:ring-1 focus:ring-[#f89c00]">
                            <option value="5" ${t.otp_valid_duration_minutes===5?"selected":""}>5 ${window.I18N.fileFolder.lblMinutes}</option>
                            <option value="10" ${t.otp_valid_duration_minutes===10?"selected":""}>10 ${window.I18N.fileFolder.lblMinutes}</option>
                            <option value="15" ${t.otp_valid_duration_minutes===15?"selected":""}>15 ${window.I18N.fileFolder.lblMinutes}</option>
                            <option value="30" ${t.otp_valid_duration_minutes===30?"selected":""}>30 ${window.I18N.fileFolder.lblMinutes}</option>
                            <option value="60" ${t.otp_valid_duration_minutes===60?"selected":""}>60 ${window.I18N.fileFolder.lblMinutes}</option>
                        </select>
                    </div>

                    ${t.total_access_count>0?`
                        <div class="p-3 bg-[#2A2A3E] rounded-lg">
                            <div class="text-sm text-gray-400">${window.I18N.fileFolder.securityStats}</div>
                            <div class="text-white">${window.I18N.fileFolder.totalAccesses}: ${t.total_access_count}</div>
           
                    ${t.last_successful_access_at?`<div class="text-gray-400 text-xs">${window.I18N.fileFolder.lastAccess}: ${new Date(t.last_successful_access_at).toLocaleString()}</div>`:""}
                        </div>
                    `:""}
                </div>
            `:`
                <div class="text-center py-4 text-gray-400">
                    <div class="text-4xl mb-2">🔓</div>
                    <div>${window.I18N.fileFolder.otpDisabledTitle}</div>
                    <div class="text-sm">${window.I18N.fileFolder.otpDisabledDesc}</div>
                </div>
            `}

            <div class="flex gap-3 pt-4">
                <button id="saveOtpSettings" class="flex-1 bg-[#f89c00] text-white px-4 py-2 rounded-lg hover:bg-[#e88900] transition-colors">
                    ${n?window.I18N.fileFolder.updateSettings:window.I18N.fileFolder.enableOtp}
                </button>
                <button id="cancelOtpModal" class="px-4 py-2 bg-[#3C3F58] text-white rounded-lg hover:bg-[#4A4D6A] transition-colors">
                    ${window.I18N.fileFolder.cancel}
                </button>
            </div>
        </div>
    `,document.getElementById("saveOtpSettings").addEventListener("click",()=>xn(o)),document.getElementById("closeOtpModal").addEventListener("click",()=>{const i=document.getElementById("otpSecurityModal");i&&i.remove()}),document.getElementById("cancelOtpModal").addEventListener("click",()=>{const i=document.getElementById("otpSecurityModal");i&&i.remove()}),n){const i=document.getElementById("deleteSharedLink");i&&i.addEventListener("click",()=>In(o))}n&&(document.getElementById("sendDisableOtp").addEventListener("click",()=>Fn(o)),document.getElementById("confirmDisableOtp").addEventListener("click",()=>kn(o)),document.getElementById("disableOtpCode").addEventListener("input",i=>{const r=document.getElementById("confirmDisableOtp");r.disabled=i.target.value.length!==6}))}async function xn(o){const t=document.getElementById("otpToggle"),e=document.getElementById("requireDownload"),n=document.getElementById("requirePreview"),i=document.getElementById("otpDuration"),r=t.checked;try{const s=r?"/file-otp/enable":"/file-otp/disable",a={file_type:"regular",file_id:parseInt(o)};r&&(a.require_otp_for_download=(e==null?void 0:e.checked)??!0,a.require_otp_for_preview=(n==null?void 0:n.checked)??!1,a.otp_valid_duration_minutes=parseInt((i==null?void 0:i.value)??10));const p=await(await fetch(s,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin",body:JSON.stringify(a)})).json();if(p.success){f(r?window.I18N.fileFolder.msgOtpEnabledSuccess:window.I18N.fileFolder.msgOtpDisabledSuccess,"success");const h=document.getElementById("otpSecurityModal");h&&h.remove(),window.loadUserFiles&&window.loadUserFiles(c.lastMainSearch,c.currentPage,c.currentParentId)}else throw new Error(p.message||window.I18N.fileFolder.msgOtpUpdateFailed||"Failed to update OTP settings")}catch(s){console.error("Failed to save OTP settings:",s),f((window.I18N.fileFolder.msgOtpUpdateFailed||"Failed to update OTP settings")+": "+s.message,"error")}}async function In(o){try{if(!window.confirm("Are you sure you want to delete the shared link for this file? This action cannot be undone."))return;const n=await(await fetch("/file-otp/delete-shared-link",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin",body:JSON.stringify({file_type:"regular",file_id:parseInt(o)})})).json();n.success?f("Shared link deleted successfully","success"):f(n.message||window.I18N.fileFolder.msgSharedLinkDeleteFailed,"error")}catch(t){console.error("Error deleting shared link:",t),f(window.I18N.fileFolder.msgSharedLinkDeleteFailed+": "+t.message,"error")}}async function Fn(o){try{const e=await(await fetch("/file-otp/send",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin",body:JSON.stringify({file_type:"regular",file_id:parseInt(o)})})).json();if(e.success)f(window.I18N.fileFolder.msgOtpSent,"success"),document.getElementById("disableOtpCode").disabled=!1,document.getElementById("sendDisableOtp").disabled=!0,document.getElementById("sendDisableOtp").textContent=window.I18N.fileFolder.msgOtpSent;else throw new Error(e.message||"Failed to send OTP")}catch(t){console.error("Failed to send disable OTP:",t),f("Failed to send OTP: "+t.message,"error")}}async function kn(o){const t=document.getElementById("disableOtpCode").value;if(t.length!==6){f("Please enter a valid 6-digit OTP code","error");return}try{const n=await(await fetch("/file-otp/disable",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin",body:JSON.stringify({file_type:"regular",file_id:parseInt(o),otp_code:t})})).json();if(n.success){f("OTP protection disabled successfully","success");const i=document.getElementById("otpSecurityModal");i&&i.remove(),window.loadUserFiles&&window.loadUserFiles(c.lastMainSearch,c.currentPage,c.currentParentId)}else throw new Error(n.message||window.I18N.fileFolder.msgOtpDisableFailed)}catch(e){console.error("Failed to disable OTP protection:",e),f((window.I18N.fileFolder.msgOtpDisableFailed||"Failed to disable OTP protection")+": "+e.message,"error")}}async function pe(o){try{const t=await fetch(`/files/${o}`,{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin"}),e=await t.json();if(t.status===403&&e.requires_otp)Nn(o,e.file_name,"preview");else if(e.success!==!1)window.location.href=`/files/${o}/preview`;else throw new Error(e.message||window.I18N.fileFolder.msgFileAccessFailed)}catch(t){console.error("Failed to check file access:",t),f(window.I18N.fileFolder.msgFileAccessFailed+": "+t.message,"error")}}function Nn(o,t,e){const n=document.getElementById("otpVerificationModal");n&&n.remove();const i=document.createElement("div");i.id="otpVerificationModal",i.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",i.innerHTML=`
        <div class="bg-[#2A2A3E] rounded-lg p-6 w-full max-w-md mx-4 border border-[#3C3F58]">
            <div class="text-center mb-6">
                <div class="text-4xl mb-4">🔐</div>
                <h3 class="text-xl font-semibold text-white mb-2">${window.I18N.fileFolder.otpVerifyTitle}</h3>
                <p class="text-gray-300 text-sm">${window.I18N.fileFolder.otpVerifyDesc.replace(":access",window.I18N.fileFolder.preview||"preview").replace(":name",t)}</p>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm text-gray-300 mb-2">${window.I18N.fileFolder.otpCode}</label>
                    <input type="text" id="otpVerificationCode" placeholder="${window.I18N.fileFolder.phEnterOtp}" maxlength="6" 
                    class="w-full px-3 py-2 bg-[#1A1A2E] border border-[#3C3F58] rounded-md text-white text-center text-lg tracking-widest focus:border-[#f89c00] focus:ring-1 focus:ring-[#f89c00]">
                </div>
                
                <div class="text-center">   
                    <button id="sendOtpForAccess" class="text-[#f89c00] hover:text-[#e88900] text-sm underline">
                        ${window.I18N.fileFolder.sendOtp}
                    </button>
                </div>
            </div>

            <div class="flex gap-3 mt-6">
                <button id="verifyOtpAccess" class="flex-1 bg-[#f89c00] text-white px-4 py-2 rounded-lg hover:bg-[#e88900] transition-colors" disabled>
                    ${window.I18N.fileFolder.verifyAnd} ${window.I18N.fileFolder.preview||"Preview"}
                </button>
                <button id="cancelOtpVerification" class="px-4 py-2 bg-[#3C3F58] text-white rounded-lg hover:bg-[#4A4D6A] transition-colors">
                    ${window.I18N.fileFolder.cancel}
                </button>
            </div>
        </div>
    `,document.body.appendChild(i);const r=document.getElementById("otpVerificationCode"),s=document.getElementById("verifyOtpAccess"),a=document.getElementById("sendOtpForAccess"),m=document.getElementById("cancelOtpVerification");r.addEventListener("input",p=>{s.disabled=p.target.value.length!==6}),a.addEventListener("click",()=>Do(o,a)),s.addEventListener("click",()=>En(o,e,i)),m.addEventListener("click",()=>i.remove()),Do(o,a)}async function Do(o,t){try{t.disabled=!0,t.textContent=window.I18N.fileFolder.sending;const n=await(await fetch("/file-otp/send",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin",body:JSON.stringify({file_type:"regular",file_id:parseInt(o)})})).json();if(n.success)f(window.I18N.fileFolder.msgOtpSent,"success"),t.textContent=window.I18N.fileFolder.otpSentCheck,t.className="text-green-400 text-sm";else throw new Error(n.message||"Failed to send OTP")}catch(e){console.error("Failed to send OTP:",e),f("Failed to send OTP: "+e.message,"error"),t.disabled=!1,t.textContent="Send OTP to Email"}}async function En(o,t,e){const n=document.getElementById("otpVerificationCode").value;if(n.length!==6){f("Please enter a valid 6-digit OTP code","error");return}try{const r=await(await fetch("/file-otp/verify",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin",body:JSON.stringify({file_type:"regular",file_id:parseInt(o),otp_code:n})})).json();if(r.success)f("OTP verified successfully","success"),e.remove(),t==="preview"&&(window.location.href=`/files/${o}/preview`);else throw new Error(r.message||window.I18N.fileFolder.msgOtpInvalid)}catch(i){console.error("Failed to verify OTP:",i),f(window.I18N.fileFolder.msgOtpVerifyFailed+": "+i.message,"error")}}async function An(o){var t;try{console.log("🚀 Starting Arweave upload process for file:",o),f(window.I18N.fileFolder.msgArwValidating,"info"),console.log("📋 Running preflight validation..."),console.log("📍 Request URL: /arweave-upload/preflight-validation"),console.log("📍 File ID:",o),console.log("📍 CSRF Token:",I()?"✅ Present":"❌ Missing");const e=await fetch("/arweave-upload/preflight-validation",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":I(),"X-Requested-With":"XMLHttpRequest"},credentials:"same-origin",body:JSON.stringify({file_id:o})});if(console.log("📊 Response Status:",e.status,e.statusText),console.log("📊 Response Headers:",{"content-type":e.headers.get("content-type"),"x-request-id":e.headers.get("x-request-id")}),!e.ok){let s={};try{s=await e.json()}catch(a){console.error("❌ Failed to parse error response:",a),s={message:`HTTP ${e.status}: ${e.statusText}`}}throw console.error("❌ Validation response not OK:",{status:e.status,statusText:e.statusText,errorData:s}),new Error(s.message||`Validation failed (HTTP ${e.status})`)}const n=await e.json();if(!n.success){const s=((t=n.validation)==null?void 0:t.errors)||["Validation failed"];throw console.error("❌ Validation returned success: false",s),new Error(s[0]||"File validation failed")}console.log("✅ Preflight validation passed:",n);const i=n.upload_cost;if(console.log("💰 Upload cost:",i),!window.isWalletReady||!window.isWalletReady()){f('⚠️ Please initialize Bundlr wallet first using the "B" button in navigation',"warning");return}const r=window.getCurrentBalance();if(console.log("💳 Current Bundlr balance:",r,"MATIC"),r<i.matic){const s=(i.matic-r).toFixed(6);f(`❌ Insufficient balance. Need ${i.matic.toFixed(6)} MATIC but have ${r.toFixed(6)} MATIC. Short by ${s} MATIC.`,"error");return}if(console.log("✅ Sufficient balance for upload"),console.log("🎯 Opening Arweave modal..."),typeof window.openClientArweaveModal=="function")window.arweaveUploadContext={fileId:o,fileName:n.validation.file_info.name,fileSize:n.validation.file_info.size,fileSizeHuman:n.validation.file_info.size_human,uploadCost:i,validationData:n},console.log("📦 Stored upload context:",window.arweaveUploadContext),window.openClientArweaveModal(),setTimeout(()=>{$n(window.arweaveUploadContext)},300);else throw new Error("Arweave modal is not available");f(`✅ ${window.I18N.fileFolder.msgArwReady} (${i.formatted})`,"success")}catch(e){console.error("❌ Failed to pre-populate Arweave modal:",e),f(window.I18N.fileFolder.msgArwAutoSelectFailed,"warning")}}function $n(o){try{console.log("🔄 Updating modal with file info:",o);const t=document.getElementById("selectedFileInfo");t&&(t.textContent=`${o.fileName} (${o.fileSizeHuman})`);const e=document.getElementById("uploadCostDisplay");e&&(e.textContent=o.uploadCost.formatted);const n=document.getElementById("uploadFileName");n&&(n.textContent=o.fileName);const i=document.getElementById("uploadCostFinal");i&&(i.textContent=o.uploadCost.formatted),console.log("✅ Modal updated with file info")}catch(t){console.error("❌ Failed to update modal:",t)}}function Vo(o){const t=document.querySelector(`[data-item-id="${o}"]`);if(!t){f("File not found","error");return}const e=t.getAttribute("data-item-name")||"Unknown",n=t.getAttribute("data-is-folder")==="true",i=document.getElementById("renameModal");i&&i.remove();const r=document.createElement("div");r.id="renameModal",r.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",r.innerHTML=`
        <div class="bg-[#1F2235] rounded-lg p-6 w-full max-w-md mx-4 border border-[#3C3F58]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">${window.I18N.fileFolder.rename} ${n?window.I18N.fileFolder.folder||"Folder":window.I18N.fileFolder.file||"File"}</h3>
                <button id="closeRenameModal" class="text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm text-gray-300 mb-2">${window.I18N.fileFolder.currentName}</label>
                    <div class="px-3 py-2 bg-[#2A2D47] text-gray-400 rounded-lg text-sm">${e}</div>
                </div>
                
                <div>
                    <label for="newFileName" class="block text-sm text-gray-300 mb-2">${window.I18N.fileFolder.newName}</label>
                    <input 
                        type="text" 
                        id="newFileName" 
                        class="w-full px-3 py-2 bg-[#2A2D47] text-white rounded-lg border border-[#3C3F58] focus:border-[#f89c00] focus:ring-1 focus:ring-[#f89c00] focus:outline-none"
                        value="${e}"
                        placeholder="${window.I18N.fileFolder.enterNewName}"
                        maxlength="255"
                    />
                    <div class="text-xs text-gray-500 mt-1">
                        ${window.I18N.fileFolder.nameValidation}
                    </div>
                </div>
            </div>
            
            <div class="flex justify-end gap-3 mt-6">
                <button id="cancelRename" class="px-4 py-2 bg-[#3C3F58] text-white rounded-lg hover:bg-[#4A4D6A] transition-colors">
                    ${window.I18N.fileFolder.cancel}
                </button>
                <button id="confirmRename" class="px-4 py-2 bg-[#f89c00] text-white rounded-lg hover:bg-[#e6890d] transition-colors">
                    ${window.I18N.fileFolder.rename}
                </button>
            </div>
        </div>
    `,document.body.appendChild(r);const s=r.querySelector("#newFileName"),a=r.querySelector("#confirmRename"),m=r.querySelector("#cancelRename"),p=r.querySelector("#closeRenameModal");if(s.focus(),!n&&e.includes(".")){const y=e.lastIndexOf(".");s.setSelectionRange(0,y)}else s.select();const h=()=>{r.remove()};p.addEventListener("click",h),m.addEventListener("click",h),r.addEventListener("click",y=>{y.target===r&&h()}),s.addEventListener("keydown",y=>{y.key==="Enter"&&(y.preventDefault(),a.click()),y.key==="Escape"&&h()}),a.addEventListener("click",async()=>{console.log("[RENAME] Confirm button clicked");const y=s.value.trim();if(console.log("[RENAME] New name:",y),!y){f(window.I18N.fileFolder.msgEnterValidName||"Please enter a valid name","error");return}if(y===e){f(window.I18N.fileFolder.msgNameSame||"Name is unchanged","warning");return}a.disabled=!0,a.textContent=window.I18N.fileFolder.btnRenaming;try{await window.renameItem(o,y),h()}catch(x){f(x.message,"error")}finally{a.disabled=!1,a.textContent=window.I18N.fileFolder.rename}})}async function Sn(o,t){console.log("[RENAME] renameItem called with:",{fileId:o,newName:t});try{const e=await fetch(`/files/${o}/rename`,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin",body:JSON.stringify({new_name:t})});if(!e.ok){const i=await e.json();throw new Error(i.message||window.I18N.fileFolder.renameFailed)}const n=await e.json();if(n.success)f(n.message||window.I18N.fileFolder.renameSuccess,"success"),window.loadUserFiles&&window.loadUserFiles(c.lastMainSearch,c.currentPage,c.currentParentId);else throw new Error(n.message||window.I18N.fileFolder.renameFailed)}catch(e){throw console.error("Rename failed:",e),e}}async function Xo(o){const t=Q(o);if(!t){f("File not found","error");return}let e=null;try{const m=await(await fetch(`/share/file/${o}`,{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin"})).json();m.success&&m.has_share&&(e=m.share)}catch(a){console.error("Failed to fetch existing share:",a)}const n=document.createElement("div");n.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",n.innerHTML=`
        <div class="bg-[#1F2235] rounded-lg shadow-xl max-w-md w-full p-6 border border-[#4A4D6A]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">${e?window.I18N.fileFolder.lblEditShareLink:window.I18N.fileFolder.lblCreateShareLink}</h3>
                <button type="button" class="text-gray-400 hover:text-gray-300" onclick="this.closest('.fixed').remove()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            ${e?`
            <div class="mb-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg text-sm text-yellow-300">
                <div class="flex items-start">
                    <svg class="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>${(window.I18N.fileFolder.shareWarning||"You already have an active share link for this :type. Updating will modify the existing link.").replace(":type",t.is_folder?window.I18N.fileFolder.folder||"folder":window.I18N.fileFolder.file||"file")}</span>
                </div>
            </div>`:""}

            <div class="mb-4">
                <div class="flex items-center space-x-3 p-3 bg-[#2A2D47] rounded-lg border border-[#4A4D6A]">
                    <div class="w-10 h-10 bg-[#f89c00] rounded-lg flex items-center justify-center">
                        ${t.is_folder?"📁":"📄"}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-white truncate">${T(t.file_name)}</p>
                        <p class="text-sm text-gray-400">${t.is_folder?window.I18N.fileFolder.folder||"Folder":window.I18N.fileFolder.file||"File"}</p>
                    </div>
                </div>
            </div>

            <div id="shareOptions" class="space-y-4">
                <div>
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" id="isOneTime" class="rounded border-[#4A4D6A] text-[#f89c00] focus:ring-[#f89c00] bg-[#2A2D47]" ${e!=null&&e.is_one_time?"checked":""}>
                        <span class="text-sm text-gray-300">${window.I18N.fileFolder.oneTimeDownload}</span>
                    </label>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">${window.I18N.fileFolder.expiresInDays}</label>
                    <select id="expiresIn" class="w-full border border-[#4A4D6A] bg-[#2A2D47] text-white rounded-md px-3 py-2 text-sm focus:ring-[#f89c00] focus:border-[#f89c00]">
                        <option value="" ${e!=null&&e.expires_at?"":"selected"}>${window.I18N.fileFolder.neverExpires}</option>
                        <option value="1" ${e!=null&&e.expires_at&&me(e.expires_at)===1?"selected":""}>${window.I18N.fileFolder.lbl1Day}</option>
                        <option value="7" ${e!=null&&e.expires_at&&me(e.expires_at)===7?"selected":""}>${window.I18N.fileFolder.lbl1Week}</option>
                        <option value="30" ${e!=null&&e.expires_at&&me(e.expires_at)===30?"selected":""}>${window.I18N.fileFolder.lbl1Month}</option>
                        <option value="90" ${e!=null&&e.expires_at&&me(e.expires_at)===90?"selected":""}>${window.I18N.fileFolder.lbl3Months}</option>
                    </select>
                </div>

                <div id="passwordSection">
                    <label class="flex items-center space-x-2 mb-2">
                        <input type="checkbox" id="passwordProtected" class="rounded border-[#4A4D6A] text-[#f89c00] focus:ring-[#f89c00] bg-[#2A2D47]" ${e!=null&&e.password_protected?"checked":""}>
                        <span class="text-sm text-gray-300">${window.I18N.fileFolder.passwordProtection}</span>
                        <span class="text-xs bg-[#f89c00] text-black px-2 py-1 rounded-full font-medium">${window.I18N.fileFolder.premium}</span>
                    </label>
                    
                    <input type="password" id="sharePassword" placeholder="${e!=null&&e.password_protected?window.I18N.fileFolder.phEnterNewPass:window.I18N.fileFolder.enterPassword}" 
                    class="w-full border border-[#4A4D6A] bg-[#2A2D47] text-white rounded-md px-3 py-2 text-sm focus:ring-[#f89c00] focus:border-[#f89c00] placeholder-gray-500 ${e!=null&&e.password_protected?"":"hidden"}">
                </div>

                <div id="errorMessage" class="hidden p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-sm text-red-300" id="errorText"></span>
                    </div>
                </div>
            </div>

            <div class="flex space-x-3 mt-6">
                <button type="button" onclick="this.closest('.fixed').remove()" 
                        class="flex-1 px-4 py-2 text-sm font-medium text-gray-300 bg-[#3C3F58] border border-[#4A4D6A] rounded-md hover:bg-[#55597C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f89c00]">
                    ${window.I18N.fileFolder.cancel}
                </button>
                <button type="button" id="createShareBtn"
                        class="flex-1 px-4 py-2 text-sm font-medium text-black bg-[#f89c00] border border-transparent rounded-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f89c00] font-semibold">
                    ${e?window.I18N.fileFolder.lblUpdateShareLink:window.I18N.fileFolder.lblCreateShareLink}
                </button>
            </div>
        </div>
    `,document.body.appendChild(n);const i=n.querySelector("#passwordProtected"),r=n.querySelector("#sharePassword");i.addEventListener("change",function(){if(this.checked){if(!window.userIsPremium){alert(window.I18N.fileFolder.msgPassProtPremium),this.checked=!1;return}r.classList.remove("hidden"),r.focus()}else r.classList.add("hidden"),r.value=""});const s=n.querySelector("#createShareBtn");s.addEventListener("click",async function(){const a=n.querySelector("#isOneTime").checked,m=n.querySelector("#expiresIn").value,p=n.querySelector("#passwordProtected").checked,h=n.querySelector("#sharePassword").value,y=n.querySelector("#errorMessage"),x=n.querySelector("#errorText");if(p&&!h.trim()){x.textContent=window.I18N.fileFolder.msgEnterPassword,y.classList.remove("hidden");return}y.classList.add("hidden"),s.disabled=!0,s.textContent=e?window.I18N.fileFolder.lblUpdating:window.I18N.fileFolder.lblCreating;try{const A=await(await fetch("/share/create",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":I()},credentials:"same-origin",body:JSON.stringify({file_id:o,is_one_time:a,expires_in_days:m?parseInt(m):null,...p&&h?{password:h}:{}})})).json();A.success?(Cn({...A.share,is_one_time:!!a,password_protected:!!(p&&h&&h.trim())}),n.remove()):(A.requires_otp_disable?x.textContent=window.I18N.fileFolder.msgShareOtpError:A.requires_premium?x.textContent=window.I18N.fileFolder.msgPassProtPremium:x.textContent=A.message||window.I18N.fileFolder.msgLinkGenFailed||"Failed to create share link",y.classList.remove("hidden"))}catch(L){console.error("Share creation failed:",L),x.textContent=(window.I18N.fileFolder.msgLinkGenFailed||"Failed to create share link")+". "+(window.I18N.fileFolder.errorLoading||"Please try again."),y.classList.remove("hidden")}finally{s.disabled=!1,s.textContent=e?window.I18N.fileFolder.lblUpdateShareLink:window.I18N.fileFolder.lblCreateShareLink}}),n.addEventListener("click",function(a){a.target===n&&n.remove()})}function Cn(o){const t=document.createElement("div");t.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";const e=!!(o&&(o.is_one_time===!0||o.is_one_time===1||o.is_one_time==="1"||o.is_one_time==="true")),n=!!(o&&(o.password_protected===!0||o.password_protected===1||o.password_protected==="1"||o.password_protected==="true"));t.innerHTML=`
        <div class="bg-[#1F2235] rounded-lg shadow-xl max-w-md w-full p-6 border border-[#4A4D6A]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">${window.I18N.fileFolder.shareLinkCreated}</h3>
                <button type="button" class="text-gray-400 hover:text-gray-300" onclick="this.closest('.fixed').remove()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <div class="mb-4">
                <div class="flex items-center space-x-2 mb-2">
                    <svg class="w-5 h-5 text-[#f89c00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm font-medium text-[#f89c00]">${window.I18N.fileFolder.shareCreatedSuccess}</span>
                </div>
                
                <div class="bg-[#2A2D47] rounded-lg p-3 border border-[#4A4D6A]">
                    <label class="block text-xs font-medium text-gray-300 mb-1">${window.I18N.fileFolder.shareUrl}</label>
                    <div class="flex items-center space-x-2">
                        <input type="text" id="shareUrl" value="${o.url}" readonly
                               class="flex-1 text-sm bg-[#3C3F58] border border-[#4A4D6A] text-white rounded px-2 py-1 font-mono">
        
                        <button type="button" id="copyUrlBtn"
                                class="px-3 py-1 text-xs font-medium text-black bg-[#f89c00] border border-transparent rounded hover:brightness-110 font-semibold">
                            ${window.I18N.fileFolder.copy}
                        </button>
                    </div>
                </div>
            </div>

            <div class="space-y-2 text-sm text-gray-300 mb-4">
                <div class="flex justify-between">
                    <span>${window.I18N.fileFolder.type}:</span>
                    <span class="font-medium text-white">${o.type==="folder"?window.I18N.fileFolder.folder:window.I18N.fileFolder.file}</span>
                </div>
                ${e?`<div class="flex justify-between"><span>${window.I18N.fileFolder.access}:</span><span class="font-medium text-[#f89c00]">${window.I18N.fileFolder.oneTimeOnly}</span></div>`:""}
                ${n?`<div class="flex justify-between"><span>${window.I18N.fileFolder.protection}:</span><span class="font-medium text-[#f89c00]">${window.I18N.fileFolder.passwordProtected}</span></div>`:""}
                ${o.expires_at?`<div class="flex justify-between"><span>${window.I18N.fileFolder.expires}:</span><span class="font-medium text-white">${new Date(o.expires_at).toLocaleDateString()}</span></div>`:""}
            </div>

            <div class="flex space-x-3">
                <button type="button" onclick="this.closest('.fixed').remove()" 
                        class="flex-1 px-4 py-2 text-sm font-medium text-gray-300 bg-[#3C3F58] border border-[#4A4D6A] rounded-md hover:bg-[#55597C]">
                    ${window.I18N.fileFolder.close}
                </button>
                <button type="button" id="openLinkBtn"
                        class="flex-1 px-4 py-2 text-sm font-medium text-black bg-[#f89c00] border border-transparent rounded-md hover:brightness-110 font-semibold">
                    ${window.I18N.fileFolder.openLink}
                </button>
            </div>
        </div>
    `,document.body.appendChild(t);const i=t.querySelector("#copyUrlBtn"),r=t.querySelector("#shareUrl");i.addEventListener("click",async function(){try{await navigator.clipboard.writeText(r.value),i.textContent=window.I18N.fileFolder.copied,i.classList.remove("text-blue-600","bg-blue-50","border-blue-200","hover:bg-blue-100"),i.classList.add("text-green-600","bg-green-50","border-green-200"),setTimeout(()=>{i.textContent=window.I18N.fileFolder.copy,i.classList.remove("text-green-600","bg-green-50","border-green-200"),i.classList.add("text-blue-600","bg-blue-50","border-blue-200","hover:bg-blue-100")},2e3)}catch{r.select(),document.execCommand("copy"),i.textContent=window.I18N.fileFolder.copied}}),t.querySelector("#openLinkBtn").addEventListener("click",function(){window.open(o.url,"_blank")}),t.addEventListener("click",function(a){a.target===t&&t.remove()})}function Ro(o){window.sharedFilesCurrentData=o,window.sharedFilesState||(window.sharedFilesState={selectedItems:new Set,lastSelectedIndex:-1,currentView:localStorage.getItem("sharedFilesLayout")||"list"}),Tn(o,window.sharedFilesState.currentView)}function Tn(o,t){const e=document.getElementById("filesContainer");if(e){if(e.dataset.view="shared",qo(),o.length===0){e.innerHTML=`
            <div class="bg-[#1F2235] rounded-lg border border-[#4A4D6A] overflow-hidden">
                <div class="flex flex-col items-center justify-center py-16 text-center">
                    <div class="w-24 h-24 bg-[#2A2D47] rounded-full flex items-center justify-center mb-4">
                        <svg class="w-12 h-12 text-[#f89c00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-white mb-2">${window.I18N.fileFolder.noSharedFiles}</h3>
                    <p class="text-gray-400 max-w-sm">${window.I18N.fileFolder.msgSharedFilesDesc}</p>
                </div>
            </div>
        `;return}Ln(o),Mn(e)}}function Ln(o){const t=document.getElementById("filesContainer");if(!t)return;const e=o.map(n=>{const i=n.copied_file,s=n.original_share.user,a=i.file_size?ge(parseInt(i.file_size,10)):"",m=new Date(n.copied_at).toLocaleDateString();return`
            <tr class="file-row hover:bg-[#2A2D47] border-b border-[#4A4D6A] cursor-pointer" 
                data-item-id="${i.id}" data-file-id="${i.id}" data-is-folder="${i.is_folder}">
                <td class="px-4 py-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 flex items-center justify-center">
                            ${Dn(i.file_name,i.is_folder)}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-medium text-white truncate">${T(i.file_name)}</div>
                            <div class="text-xs text-gray-400">
                                ${window.I18N.fileFolder.sharedBy} ${T(s.name)} • ${a}
                            </div>
                        </div>
                    </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-300 text-right">
                    <div class="flex items-center justify-end space-x-2">
                        <span>${m}</span>
                        <button class="actions-menu-btn p-1 hover:bg-[#3C3F58] rounded" 
                            data-item-id="${i.id}" aria-expanded="false" title="${window.I18N.fileFolder.moreActions}">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `}).join("");t.innerHTML=`
        <div class="bg-[#1F2235] rounded-lg border border-[#4A4D6A] overflow-hidden">
            <!-- Header -->
            <div class="bg-[#2A2D47] border-b border-[#4A4D6A] px-4 py-3">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-[#f89c00] rounded flex items-center justify-center">
                        <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold text-white">${window.I18N.fileFolder.sharedWithMe}</h2>
                        <p class="text-sm text-gray-400">${o.length} ${window.I18N.fileFolder.lblFiles}</p>
                    </div>
                </div>
            </div>
            
            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="w-full">
                    <tbody class="divide-y divide-[#4A4D6A]">
                        ${e}
                    </tbody>
                </table>
            </div>
        </div>
    `}function Mn(o){window.sharedFilesState||(window.sharedFilesState={selectedItems:new Set,lastSelectedIndex:-1,currentView:"list"}),o.querySelectorAll(".file-row").forEach((n,i)=>{n.addEventListener("click",function(r){r.target.closest(".actions-menu-btn")||(r.preventDefault(),r.stopPropagation())})}),o.querySelectorAll(".actions-menu-btn").forEach(n=>{n.addEventListener("click",function(i){i.stopPropagation();const r=this.dataset.itemId;Bn(i,r,o)})})}function Bn(o,t,e){var m;const n=e.querySelector(`[data-file-id="${t}"]`);(m=n==null?void 0:n.querySelector(".text-white.truncate"))!=null&&m.textContent;const i=(n==null?void 0:n.dataset.isFolder)==="true",r=document.createElement("div");r.className="fixed bg-white rounded-lg shadow-lg z-50 py-1 min-w-[200px]",r.style.top=o.clientY+5+"px",r.style.left=o.clientX-100+"px",r.innerHTML=`
        <button class="copy-btn w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-gray-800" data-file-id="${t}">
            <span>📋</span><span>${window.I18N.fileFolder.btnCopyToFiles||"Copy to My Files"}</span>
        </button>
        ${i?"":`
            <button class="download-btn w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-gray-800" data-file-id="${t}">
                <span>⬇️</span><span>${window.I18N.fileFolder.download}</span>
            </button>
        `}
    `,document.body.appendChild(r);const s=r.querySelector(".copy-btn"),a=r.querySelector(".download-btn");s&&s.addEventListener("click",async p=>{p.preventDefault(),p.stopPropagation(),r.remove(),await Pn(t)}),a&&a.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),r.remove(),_n(t)}),setTimeout(()=>{document.addEventListener("click",function p(h){r.contains(h.target)||(r.remove(),document.removeEventListener("click",p))})},0)}async function Pn(o){var t;try{const e="copy-loading-"+o,n=document.createElement("div");n.id=e,n.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",n.innerHTML=`
            <div class="bg-white rounded-lg p-6 flex flex-col items-center space-y-3">
                <div class="animate-spin">
                    <svg class="w-8 h-8 text-[#f89c00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                </div>
                <p class="text-gray-800 font-medium">${window.I18N.fileFolder.msgCopying||"Copying..."}</p>
            </div>
        `,document.body.appendChild(n);const i=await fetch(`/api/shared-files/${o}/copy`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.getAttribute("content"))||"","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"}),r=document.getElementById(e);if(r&&r.remove(),!i.ok){const a=await i.json();throw new Error(a.message||"Failed to copy file")}const s=await i.json();s.success?(f("✅ "+(window.I18N.fileFolder.msgCopySuccess||"File copied!"),"success"),setTimeout(()=>{ee()},1e3)):f("❌ "+(s.message||"Failed to copy file"),"error")}catch(e){console.error("Error copying file:",e),f("❌ Error: "+e.message,"error");const n=document.getElementById("copy-loading-"+o);n&&n.remove()}}function _n(o){window.location.href=`/api/shared-files/${o}/download`}function Dn(o,t){var n;if(t)return`
            <svg class="w-6 h-6 text-[#f89c00]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
            </svg>
        `;const e=((n=o.split(".").pop())==null?void 0:n.toLowerCase())||"";return["doc","docx","txt","rtf"].includes(e)?`
            <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
        `:["xls","xlsx","csv"].includes(e)?`
            <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
        `:e==="pdf"?`
            <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
        `:["jpg","jpeg","png","gif","bmp","svg","webp"].includes(e)?`
            <svg class="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
            </svg>
        `:`
        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
    `}function Rn(){const o=document.getElementById("filesContainer");o&&(o.innerHTML=`
        <div class="bg-[#1F2235] rounded-lg border border-[#4A4D6A] overflow-hidden">
            <div class="flex items-center justify-center py-16">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f89c00]"></div>
                <span class="ml-3 text-gray-300">Loading shared files...</span>
            </div>
        </div>
    `)}function me(o){if(!o)return null;const n=new Date(o)-new Date;return Math.ceil(n/(1e3*60*60*24))}window.showRenameModal=Vo;window.showShareModal=Xo;window.renameItem=Sn;window.loadSharedFiles=Go;
