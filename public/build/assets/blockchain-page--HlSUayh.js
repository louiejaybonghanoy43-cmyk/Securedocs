import{s as r,h as A,f as m,e as h}from"./file-folder-v_uzNqzc.js";let b="grid",v=[],x={};function z(){const e=document.querySelector(".files-header");e&&e.remove();const t=document.getElementById("filesContainer");t&&(t.className="",t.removeAttribute("data-view"))}async function f(){const e=document.getElementById("filesContainer");if(!e){console.error("Items container not found");return}try{e.dataset.view="blockchain",A(),e.innerHTML='<div class="flex justify-center items-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>';const[t,o]=await Promise.all([fetch("/arweave/urls"),fetch("/arweave-client/stats")]);if(!t.ok)throw new Error("Failed to fetch Arweave files");if(!o.ok)throw new Error("Failed to fetch stats");const i=await t.json(),a=await o.json();if(!i.success)throw new Error(i.message||"Failed to load Arweave files");v=i.urls||[],x=a.stats||{},S(),g(v)}catch(t){console.error("Error loading Arweave files:",t),e.innerHTML=`<div class="text-center py-8 text-red-600">Failed to load Arweave files: ${t.message}</div>`}}function S(){var t,o,i,a,s,c,n,l,d,w,p,u,y,k,$,F,I,N,_,B;const e=document.querySelector(".files-header")||M();e.innerHTML=`
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <!-- Stats Section -->
            <div class="flex flex-wrap gap-4">
                <div class="bg-[#1F2235] rounded-lg px-4 py-2 border border-[#3C3F58]">
                    <div class="text-sm text-gray-400">${((o=(t=window.I18N)==null?void 0:t.blockchain)==null?void 0:o.totalFiles)||"Total Files"}</div>
                    <div class="text-lg font-semibold text-white">${x.total_files||0}</div>
                </div>
                <div class="bg-[#1F2235] rounded-lg px-4 py-2 border border-[#3C3F58]">
                    <div class="text-sm text-gray-400">${((a=(i=window.I18N)==null?void 0:i.blockchain)==null?void 0:a.totalCost)||"Total Cost"}</div>
                    <div class="text-lg font-semibold text-yellow-400">${x.total_cost_matic||0} MATIC</div>
                </div>
                <div class="bg-[#1F2235] rounded-lg px-4 py-2 border border-[#3C3F58]">
                    <div class="text-sm text-gray-400">${((c=(s=window.I18N)==null?void 0:s.blockchain)==null?void 0:c.totalSize)||"Total Size"}</div>
                    <div class="text-lg font-semibold text-blue-400">${m(x.total_size_bytes||0)}</div>
                </div>
                <div class="bg-[#1F2235] rounded-lg px-4 py-2 border border-[#3C3F58]">
                    <div class="text-sm text-gray-400">${((l=(n=window.I18N)==null?void 0:n.blockchain)==null?void 0:l.encryptedCount)||"Encrypted"}</div>
                    <div class="text-lg font-semibold text-green-400">${x.encrypted_files||0}</div>
                </div>
            </div>
            
            <!-- View Controls -->
            <div class="flex items-center gap-3">
                <div class="flex bg-[#1F2235] rounded-lg border border-[#3C3F58] overflow-hidden">
                    <button id="gridViewBtn" 
                            class="px-3 py-2 text-sm transition-colors relative group ${b==="grid"?"bg-blue-600 text-white":"text-gray-400 hover:text-white"}"
                            title="${((w=(d=window.I18N)==null?void 0:d.blockchain)==null?void 0:w.gridView)||"Grid View"}">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                        </svg>
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${((u=(p=window.I18N)==null?void 0:p.blockchain)==null?void 0:u.gridView)||"Grid View"}
                        </div>
                    </button>
                    <button id="listViewBtn" 
                            class="px-3 py-2 text-sm transition-colors relative group ${b==="list"?"bg-blue-600 text-white":"text-gray-400 hover:text-white"}"
                            title="${((k=(y=window.I18N)==null?void 0:y.blockchain)==null?void 0:k.listView)||"List View"}">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                        </svg>
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${((F=($=window.I18N)==null?void 0:$.blockchain)==null?void 0:F.listView)||"List View"}
                        </div>
                    </button>
                </div>
                
                <button id="refreshBlockchainBtn" 
                        class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors relative group"
                        title="${((N=(I=window.I18N)==null?void 0:I.blockchain)==null?void 0:N.refreshFiles)||"Refresh Files"}">
                    🔄 Refresh
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        ${((B=(_=window.I18N)==null?void 0:_.blockchain)==null?void 0:B.refreshFiles)||"Refresh Files"}
                    </div>
                </button>
                

            </div>
        </div>
    `,U()}function M(){const e=document.getElementById("filesContainer"),t=document.createElement("div");return t.className="files-header",e.parentNode.insertBefore(t,e),t}function U(){var e,t,o,i;(e=document.getElementById("gridViewBtn"))==null||e.addEventListener("click",()=>{b="grid",g(v),C()}),(t=document.getElementById("listViewBtn"))==null||t.addEventListener("click",()=>{b="list",g(v),C()}),(o=document.getElementById("refreshBlockchainBtn"))==null||o.addEventListener("click",()=>{f()}),(i=document.getElementById("openClientArweaveBtn"))==null||i.addEventListener("click",()=>{window.openClientArweaveModal&&window.openClientArweaveModal()})}function C(){const e=document.getElementById("gridViewBtn"),t=document.getElementById("listViewBtn");e&&t&&(b==="grid"?(e.className="px-3 py-2 text-sm transition-colors bg-blue-600 text-white",t.className="px-3 py-2 text-sm transition-colors text-gray-400 hover:text-white"):(e.className="px-3 py-2 text-sm transition-colors text-gray-400 hover:text-white",t.className="px-3 py-2 text-sm transition-colors bg-blue-600 text-white"))}function g(e){var o,i,a,s,c,n;const t=document.getElementById("filesContainer");if(!e||e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <div class="text-6xl mb-4">🚀</div>
                <h3 class="text-lg font-medium text-white mb-2">${((i=(o=window.I18N)==null?void 0:o.blockchain)==null?void 0:i.noFilesTitle)||"No files on Arweave yet"}</h3>
                <p class="text-gray-400 mb-4">${((s=(a=window.I18N)==null?void 0:a.blockchain)==null?void 0:s.noFilesDesc)||"Upload files to Arweave..."}</p>
                <button onclick="window.openClientArweaveModal && window.openClientArweaveModal()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                    🚀 ${((n=(c=window.I18N)==null?void 0:c.blockchain)==null?void 0:n.uploadBtn)||"Upload to Arweave"}
                </button>
            </div>
        `;return}b==="grid"?(t.className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",t.innerHTML=e.map(l=>D(l)).join("")):(t.className="space-y-2",t.innerHTML=e.map(l=>L(l)).join(""))}function D(e){var c,n;const t=E(e.mime_type),o=new Date(e.created_at).toLocaleDateString(),i=e.file_size_bytes?m(e.file_size_bytes):"Unknown",a=e.upload_cost_matic?`${parseFloat(e.upload_cost_matic).toFixed(6)} MATIC`:"Free",s=e.is_encrypted;return`
        <div class="file-card bg-[#24243B] border-2 border-[#3C3F58] rounded-lg p-4 hover:bg-[#3C3F58] hover:border-[#55597C] transition-colors cursor-pointer">
            <div class="flex flex-col h-full">
                <!-- File Icon and Name -->
                <div class="flex items-center mb-3">
                    <div class="text-3xl mr-3 relative">
                        ${t}
                        ${s?'<span class="absolute -top-1 -right-1 text-xs">🔒</span>':""}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-medium text-white truncate" title="${h(e.file_name||"Untitled")}">
                            ${h(e.file_name||"Untitled")}
                        </h3>
                        <p class="text-xs text-gray-400">${i} • ${o}</p>
                    </div>
                </div>
                
                <!-- Status and Cost -->
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                        <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        <span class="text-xs text-green-400">${((n=(c=window.I18N)==null?void 0:c.blockchain)==null?void 0:n.permanent)||"Permanent"}</span>
                    </div>
                    <div class="text-xs text-yellow-400">${a}</div>
                </div>
                
                <!-- Action Buttons -->
                <div class="mt-auto flex gap-2">
                    ${s?`<button onclick="accessEncryptedFile(${e.id})" 
                                 class="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors relative group"
                                 title="Access Encrypted File">
                            🔓 Access
                            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                Access Encrypted File
                            </div>
                         </button>`:`<button onclick="window.open('${e.url}', '_blank')" 
                                 class="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors relative group"
                                 title="${window.I18N.blockchain.viewBtn}">
                            🌐 ${window.I18N.blockchain.viewBtn}
                            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                ${window.I18N.blockchain.viewBtn}
                            </div>
                        </button>`}
                    <button onclick="showFileDetails(${e.id})" 
                            class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors relative group"
                            title="${window.I18N.blockchain.detailsBtn}">
                        ℹ️
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${window.I18N.blockchain.detailsBtn}
                        </div>
                    </button>
                    <button onclick="copyArweaveUrl('${e.url}')" 
                            class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors relative group"
                            title="${window.I18N.blockchain.copyUrlBtn}">
                        📋
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${window.I18N.blockchain.copyUrlBtn}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `}function L(e){const t=E(e.mime_type),o=new Date(e.created_at).toLocaleDateString(),i=e.file_size_bytes?m(e.file_size_bytes):"Unknown",a=e.upload_cost_matic?`${parseFloat(e.upload_cost_matic).toFixed(6)} MATIC`:"Free",s=e.is_encrypted;return`
        <div class="bg-[#24243B] border border-[#3C3F58] rounded-lg p-4 hover:bg-[#3C3F58] hover:border-[#55597C] transition-colors">
            <div class="flex items-center justify-between">
                <!-- File Info -->
                <div class="flex items-center flex-1 min-w-0">
                    <div class="text-2xl mr-4 relative">
                        ${t}
                        ${s?'<span class="absolute -top-1 -right-1 text-xs">🔒</span>':""}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-medium text-white truncate" title="${h(e.file_name||"Untitled")}">
                            ${h(e.file_name||"Untitled")}
                        </h3>
                        <div class="flex items-center gap-4 text-xs text-gray-400 mt-1">
                            <span>${i}</span>
                            <span>${o}</span>
                            <span class="flex items-center">
                                <span class="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                                Permanent
                            </span>
                            ${s?'<span class="text-purple-400">🔒 Encrypted</span>':'<span class="text-green-400">🌐 Public</span>'}
                        </div>
                    </div>
                </div>
                
                <!-- Cost -->
                <div class="text-sm text-yellow-400 mx-4">
                    ${a}
                </div>
                
                <!-- Actions -->
                <div class="flex items-center gap-2">
                    ${s?`<button onclick="accessEncryptedFile(${e.id})" 
                                 class="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors relative group"
                                 title="${window.I18N.blockchain.accessBtn}">
                            🔓 ${window.I18N.blockchain.accessBtn}
                            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                ${window.I18N.blockchain.accessBtn}
                            </div>
                         </button>`:`<button onclick="window.open('${e.url}', '_blank')" 
                                 class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors relative group"
                                 title="${window.I18N.blockchain.viewBtn}">
                            🌐 ${window.I18N.blockchain.viewBtn}
                            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                View File
                            </div>
                         </button>`}
                    <button onclick="showFileDetails(${e.id})" 
                            class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors relative group"
                            title="${window.I18N.blockchain.detailsBtn}">
                        ℹ️ Details
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${window.I18N.blockchain.detailsBtn}
                        </div>
                    </button>
                    <button onclick="copyArweaveUrl('${e.url}')" 
                            class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors relative group"
                            title="${window.I18N.blockchain.copyUrlBtn}">
                        📋 Copy
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${window.I18N.blockchain.copyUrlBtn}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `}function E(e){return e?e.startsWith("image/")?"🖼️":e.startsWith("video/")?"🎥":e.startsWith("audio/")?"🎵":e==="application/pdf"?"📕":e.includes("text/")||e.includes("document")?"📝":e.includes("zip")||e.includes("archive")?"🗜️":"📄":"📄"}function j(e){navigator.clipboard.writeText(e).then(()=>{var t,o;r(((o=(t=window.I18N)==null?void 0:t.blockchain)==null?void 0:o.urlCopied)||"URL copied!","success")}).catch(t=>{var o,i;console.error("Failed to copy URL:",t),r(((i=(o=window.I18N)==null?void 0:o.blockchain)==null?void 0:i.copyFailed)||"Failed to copy URL","error")})}async function T(e){var t,o,i,a,s,c,n;try{const d=await(await fetch(`/files/${e}/download-from-blockchain`,{method:"POST",headers:{"X-CSRF-TOKEN":(t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.getAttribute("content"),"Content-Type":"application/json"}})).json();d.success?r(((i=(o=window.I18N)==null?void 0:o.blockchain)==null?void 0:i.downloadSuccess)||"File downloaded successfully","success"):r(d.message||((s=(a=window.I18N)==null?void 0:a.blockchain)==null?void 0:s.downloadFailed)||"Failed to download file","error")}catch(l){console.error("Error downloading from blockchain:",l),r(((n=(c=window.I18N)==null?void 0:c.blockchain)==null?void 0:n.downloadFailed)||"Failed to download file","error")}}async function H(e){var t,o,i,a,s,c,n,l,d;if(confirm(((o=(t=window.I18N)==null?void 0:t.blockchain)==null?void 0:o.confirmRemove)||"Remove this file?"))try{const p=await(await fetch(`/files/${e}/remove-from-blockchain`,{method:"DELETE",headers:{"X-CSRF-TOKEN":(i=document.querySelector('meta[name="csrf-token"]'))==null?void 0:i.getAttribute("content"),"Content-Type":"application/json"}})).json();p.success?(r(((s=(a=window.I18N)==null?void 0:a.blockchain)==null?void 0:s.removeSuccess)||"File removed from blockchain storage","success"),f()):r(p.message||((n=(c=window.I18N)==null?void 0:c.blockchain)==null?void 0:n.removeFailed)||"Failed to remove file","error")}catch(w){console.error("Error removing from blockchain:",w),r(((d=(l=window.I18N)==null?void 0:l.blockchain)==null?void 0:d.removeFailed)||"Failed to remove file","error")}}async function V(e){var o,i,a,s,c;let t=((i=(o=window.I18N)==null?void 0:o.blockchain)==null?void 0:i.confirmEnablePerm)||"Enable permanent storage?";try{const l=await(await fetch("/files/processing-options")).json();l.success&&!l.user_is_premium&&(t=((s=(a=window.I18N)==null?void 0:a.blockchain)==null?void 0:s.confirmEnablePermFee)||"Enable permanent storage (fee may apply)?")}catch(n){console.warn("Could not check premium status:",n)}if(confirm(t))try{const l=await(await fetch(`/files/${e}/enable-permanent-storage`,{method:"POST",headers:{"X-CSRF-TOKEN":(c=document.querySelector('meta[name="csrf-token"]'))==null?void 0:c.getAttribute("content"),"Content-Type":"application/json"}})).json();l.success?(r("Permanent storage enabled successfully","success"),f()):r(l.message||"Failed to enable permanent storage","error")}catch(n){console.error("Error enabling permanent storage:",n),r("Failed to enable permanent storage","error")}}async function R(e){try{const o=await(await fetch(`/arweave-client/files/${e}/details`)).json();if(!o.success)throw new Error(o.message||"Failed to load file details");const i=o.file,a=P(i);document.body.appendChild(a)}catch(t){console.error("Error loading file details:",t),r("Failed to load file details: "+t.message,"error")}}function P(e){var n,l;const t=document.createElement("div");t.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";const o=new Date(e.created_at).toLocaleString(),i=e.last_accessed_at?new Date(e.last_accessed_at).toLocaleString():"Never",a=e.file_size_bytes?m(e.file_size_bytes):"Unknown",s=e.upload_cost_matic?`${parseFloat(e.upload_cost_matic).toFixed(6)} MATIC`:"Free",c=e.upload_cost_usd?`$${parseFloat(e.upload_cost_usd).toFixed(2)}`:"N/A";return t.innerHTML=`
        <div class="bg-[#0D0E2F] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-[#3C3F58]">
                <h3 class="text-xl font-semibold text-white">📄 ${((l=(n=window.I18N)==null?void 0:n.blockchain)==null?void 0:l.fileDetailsTitle)||"File Details"}</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-2xl leading-none hover:text-gray-300 text-white">&times;</button>
            </div>
            
            <!-- Content -->
            <div class="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Basic Info -->
                    <div class="space-y-4">
                        <h4 class="text-lg font-medium text-white mb-3">📋 ${window.I18N.blockchain.basicInfo}</h4>
                        
                        <div class="bg-[#1F2235] rounded-lg p-4 space-y-3">
                            <div>
                                <label class="text-sm text-gray-400">${window.I18N.blockchain.fileName}</label>
                                <p class="text-white font-medium">${h(e.file_name)}</p>
                            </div>
                            
                            <div>
                                <label class="text-sm text-gray-400">${window.I18N.blockchain.fileSize}</label>
                                <p class="text-white">${a}</p>
                            </div>
                            
                            <div>
                                <label class="text-sm text-gray-400">${window.I18N.blockchain.mimeType}</label>
                                <p class="text-white">${e.mime_type||"Unknown"}</p>
                            </div>
                            
                            <div>
                                <label class="text-sm text-gray-400">${window.I18N.blockchain.privacy}</label>
                                <p class="text-white">
                                    ${e.is_encrypted?`<span class="text-purple-400">🔒 ${window.I18N.blockchain.encrypted}</span>`:`<span class="text-green-400">🌐 ${window.I18N.blockchain.public}</span>`}
                                </p>
                            </div>
                            
                            ${e.is_encrypted?`
                                <div>
                                    <label class="text-sm text-gray-400">${window.I18N.blockchain.encryptionMethod}</label>
                                    <p class="text-white">${e.encryption_method||"AES-256-GCM"}</p>
                                </div>
                            `:""}
                        </div>
                    </div>
                    
                    <!-- Arweave Info -->
                    <div class="space-y-4">
                        <h4 class="text-lg font-medium text-white mb-3">🚀 ${window.I18N.blockchain.arweaveInfo}</h4>
                        
                        <div class="bg-[#1F2235] rounded-lg p-4 space-y-3">
                            <div>
                                <label class="text-sm text-gray-400">${window.I18N.blockchain.uploadCost}</label>
                                <p class="text-yellow-400 font-medium">${s}</p>
                                ${e.upload_cost_usd?`<p class="text-sm text-gray-400">${c} USD</p>`:""}
                            </div>
                            
                            <div>
                                <label class="text-sm text-gray-400">${window.I18N.blockchain.transactionId}</label>
                                <p class="text-white text-sm font-mono break-all">${e.transaction_id||"N/A"}</p>
                            </div>
                            
                            <div>
                                <label class="text-sm text-gray-400">${window.I18N.blockchain.uploadDate}</label>
                                <p class="text-white">${o}</p>
                            </div>
                            
                            <div>
                                <label class="text-sm text-gray-400">${window.I18N.blockchain.accessCount}</label>
                                <p class="text-white">${e.access_count||0} ${window.I18N.blockchain.times||"times"}</p>
                            </div>
                            
                            <div>
                                <label class="text-sm text-gray-400">${window.I18N.blockchain.lastAccessed}</label>
                                <p class="text-white">${i}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Arweave URL -->
                <div class="mt-6">
                    <h4 class="text-lg font-medium text-white mb-3">🔗 ${window.I18N.blockchain.arweaveUrl}</h4>
                    <div class="bg-[#1F2235] rounded-lg p-4">
                        <div class="flex items-center gap-2">
                            <input type="text" value="${e.url}" readonly 
                                   class="flex-1 bg-[#0D0E2F] border border-[#3C3F58] rounded px-3 py-2 text-white text-sm font-mono">
                            <button onclick="copyArweaveUrl('${e.url}')" 
                                    class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
                                📋 Copy
                            </button>
                            ${e.is_encrypted?"":`
                                <button onclick="window.open('${e.url}', '_blank')" 
                                        class="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors">
                                    🌐 Open
                                </button>
                            `}
                        </div>
                    </div>
                </div>
                
                ${e.gateway_urls?`
                    <!-- Alternative Gateways -->
                    <div class="mt-6">
                        <h4 class="text-lg font-medium text-white mb-3">🌐 ${window.I18N.blockchain.altGateways}</h4>
                        <div class="bg-[#1F2235] rounded-lg p-4 space-y-2">
                            ${Object.entries(e.gateway_urls).map(([d,w])=>{var p,u;return`
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-400 capitalize">${d.replace("_"," ")}</span>
                                    <button onclick="window.open('${w}', '_blank')" 
                                    class="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors">
                                        ${((u=(p=window.I18N)==null?void 0:p.blockchain)==null?void 0:u.openBtn)||"Open"}
                                    </button>
                                </div>
                            `}).join("")}
                        </div>
                    </div>
                `:""}
            </div>
            
            <!-- Footer -->
            <div class="flex justify-end gap-3 p-6 border-t border-[#3C3F58]">
                ${e.is_encrypted?`
                    <button onclick="accessEncryptedFile(${e.id}); this.closest('.fixed').remove();" 
                            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors">
                        🔓 Access File
                    </button>
                `:""}
                <button onclick="this.closest('.fixed').remove()" 
                        class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors">
                    Close
                </button>
            </div>
        </div>
    `,t}function O(e){if(window.EncryptedFileAccess){const t=new window.EncryptedFileAccess;t.init(),t.requestFileAccess(e,"Encrypted Arweave File")}else r("Encrypted file access system not available","error")}window.downloadFromBlockchain=T;window.removeFromBlockchain=H;window.enablePermanentStorage=V;window.copyArweaveUrl=j;window.showFileDetails=R;window.accessEncryptedFile=O;window.cleanupBlockchainUI=z;
