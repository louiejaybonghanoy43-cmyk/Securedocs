let ue="grid",Fe=[],he={};function Ie(){const e=document.querySelector(".files-header");e&&e.remove();const t=document.getElementById("filesContainer");t&&(t.className="",t.removeAttribute("data-view"))}async function Me(){const e=document.getElementById("filesContainer");if(!e){console.error("Items container not found");return}try{e.dataset.view="blockchain",$e(),e.innerHTML='<div class="flex justify-center items-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>';const[t,o]=await Promise.all([fetch("/arweave/urls"),fetch("/arweave-client/stats")]);if(!t.ok)throw new Error("Failed to fetch Arweave files");if(!o.ok)throw new Error("Failed to fetch stats");const n=await t.json(),i=await o.json();if(!n.success)throw new Error(n.message||"Failed to load Arweave files");Fe=n.urls||[],he=i.stats||{},xn(),Le(Fe)}catch(t){console.error("Error loading Arweave files:",t),e.innerHTML=`<div class="text-center py-8 text-red-600">Failed to load Arweave files: ${t.message}</div>`}}function xn(){var t,o,n,i,s,r,a,l,u,p,w,v,F,N,A,h,x,S,C,b;const e=document.querySelector(".files-header")||In();e.innerHTML=`
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <!-- Stats Section -->
            <div class="flex flex-wrap gap-4">
                <div class="bg-[#1F2235] rounded-lg px-4 py-2 border border-[#3C3F58]">
                    <div class="text-sm text-gray-400">${((o=(t=window.I18N)==null?void 0:t.blockchain)==null?void 0:o.totalFiles)||"Total Files"}</div>
                    <div class="text-lg font-semibold text-white">${he.total_files||0}</div>
                </div>
                <div class="bg-[#1F2235] rounded-lg px-4 py-2 border border-[#3C3F58]">
                    <div class="text-sm text-gray-400">${((i=(n=window.I18N)==null?void 0:n.blockchain)==null?void 0:i.totalCost)||"Total Cost"}</div>
                    <div class="text-lg font-semibold text-yellow-400">${he.total_cost_matic||0} MATIC</div>
                </div>
                <div class="bg-[#1F2235] rounded-lg px-4 py-2 border border-[#3C3F58]">
                    <div class="text-sm text-gray-400">${((r=(s=window.I18N)==null?void 0:s.blockchain)==null?void 0:r.totalSize)||"Total Size"}</div>
                    <div class="text-lg font-semibold text-blue-400">${re(he.total_size_bytes||0)}</div>
                </div>
                <div class="bg-[#1F2235] rounded-lg px-4 py-2 border border-[#3C3F58]">
                    <div class="text-sm text-gray-400">${((l=(a=window.I18N)==null?void 0:a.blockchain)==null?void 0:l.encryptedCount)||"Encrypted"}</div>
                    <div class="text-lg font-semibold text-green-400">${he.encrypted_files||0}</div>
                </div>
            </div>
            
            <!-- View Controls -->
            <div class="flex items-center gap-3">
                <div class="flex bg-[#1F2235] rounded-lg border border-[#3C3F58] overflow-hidden">
                    <button id="gridViewBtn" 
                            class="px-3 py-2 text-sm transition-colors relative group ${ue==="grid"?"bg-blue-600 text-white":"text-gray-400 hover:text-white"}"
                            title="${((p=(u=window.I18N)==null?void 0:u.blockchain)==null?void 0:p.gridView)||"Grid View"}">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                        </svg>
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${((v=(w=window.I18N)==null?void 0:w.blockchain)==null?void 0:v.gridView)||"Grid View"}
                        </div>
                    </button>
                    <button id="listViewBtn" 
                            class="px-3 py-2 text-sm transition-colors relative group ${ue==="list"?"bg-blue-600 text-white":"text-gray-400 hover:text-white"}"
                            title="${((N=(F=window.I18N)==null?void 0:F.blockchain)==null?void 0:N.listView)||"List View"}">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                        </svg>
                        <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${((h=(A=window.I18N)==null?void 0:A.blockchain)==null?void 0:h.listView)||"List View"}
                        </div>
                    </button>
                </div>
                
                <button id="refreshBlockchainBtn" 
                        class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors relative group"
                        title="${((S=(x=window.I18N)==null?void 0:x.blockchain)==null?void 0:S.refreshFiles)||"Refresh Files"}">
                    🔄 Refresh
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        ${((b=(C=window.I18N)==null?void 0:C.blockchain)==null?void 0:b.refreshFiles)||"Refresh Files"}
                    </div>
                </button>
                

            </div>
        </div>
    `,Fn()}function In(){const e=document.getElementById("filesContainer"),t=document.createElement("div");return t.className="files-header",e.parentNode.insertBefore(t,e),t}function Fn(){var e,t,o,n;(e=document.getElementById("gridViewBtn"))==null||e.addEventListener("click",()=>{ue="grid",Le(Fe),Qo()}),(t=document.getElementById("listViewBtn"))==null||t.addEventListener("click",()=>{ue="list",Le(Fe),Qo()}),(o=document.getElementById("refreshBlockchainBtn"))==null||o.addEventListener("click",()=>{Me()}),(n=document.getElementById("openClientArweaveBtn"))==null||n.addEventListener("click",()=>{window.openClientArweaveModal&&window.openClientArweaveModal()})}function Qo(){const e=document.getElementById("gridViewBtn"),t=document.getElementById("listViewBtn");e&&t&&(ue==="grid"?(e.className="px-3 py-2 text-sm transition-colors bg-blue-600 text-white",t.className="px-3 py-2 text-sm transition-colors text-gray-400 hover:text-white"):(e.className="px-3 py-2 text-sm transition-colors text-gray-400 hover:text-white",t.className="px-3 py-2 text-sm transition-colors bg-blue-600 text-white"))}function Le(e){var o,n,i,s,r,a;const t=document.getElementById("filesContainer");if(!e||e.length===0){t.innerHTML=`
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <div class="text-6xl mb-4">🚀</div>
                <h3 class="text-lg font-medium text-white mb-2">${((n=(o=window.I18N)==null?void 0:o.blockchain)==null?void 0:n.noFilesTitle)||"No files on Arweave yet"}</h3>
                <p class="text-gray-400 mb-4">${((s=(i=window.I18N)==null?void 0:i.blockchain)==null?void 0:s.noFilesDesc)||"Upload files to Arweave..."}</p>
                <button onclick="window.openClientArweaveModal && window.openClientArweaveModal()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                    🚀 ${((a=(r=window.I18N)==null?void 0:r.blockchain)==null?void 0:a.uploadBtn)||"Upload to Arweave"}
                </button>
            </div>
        `;return}ue==="grid"?(t.className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",t.innerHTML=e.map(l=>kn(l)).join("")):(t.className="space-y-2",t.innerHTML=e.map(l=>En(l)).join(""))}function kn(e){var r,a;const t=dn(e.mime_type),o=new Date(e.created_at).toLocaleDateString(),n=e.file_size_bytes?re(e.file_size_bytes):"Unknown",i=e.upload_cost_matic?`${parseFloat(e.upload_cost_matic).toFixed(6)} MATIC`:"Free",s=e.is_encrypted;return`
        <div class="file-card bg-[#24243B] border-2 border-[#3C3F58] rounded-lg p-4 hover:bg-[#3C3F58] hover:border-[#55597C] transition-colors cursor-pointer">
            <div class="flex flex-col h-full">
                <!-- File Icon and Name -->
                <div class="flex items-center mb-3">
                    <div class="text-3xl mr-3 relative">
                        ${t}
                        ${s?'<span class="absolute -top-1 -right-1 text-xs">🔒</span>':""}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-medium text-white truncate" title="${B(e.file_name||"Untitled")}">
                            ${B(e.file_name||"Untitled")}
                        </h3>
                        <p class="text-xs text-gray-400">${n} • ${o}</p>
                    </div>
                </div>
                
                <!-- Status and Cost -->
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                        <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        <span class="text-xs text-green-400">${((a=(r=window.I18N)==null?void 0:r.blockchain)==null?void 0:a.permanent)||"Permanent"}</span>
                    </div>
                    <div class="text-xs text-yellow-400">${i}</div>
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
    `}function En(e){const t=dn(e.mime_type),o=new Date(e.created_at).toLocaleDateString(),n=e.file_size_bytes?re(e.file_size_bytes):"Unknown",i=e.upload_cost_matic?`${parseFloat(e.upload_cost_matic).toFixed(6)} MATIC`:"Free",s=e.is_encrypted;return`
        <div class="bg-[#24243B] border border-[#3C3F58] rounded-lg p-4 hover:bg-[#3C3F58] hover:border-[#55597C] transition-colors">
            <div class="flex items-center justify-between">
                <!-- File Info -->
                <div class="flex items-center flex-1 min-w-0">
                    <div class="text-2xl mr-4 relative">
                        ${t}
                        ${s?'<span class="absolute -top-1 -right-1 text-xs">🔒</span>':""}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-medium text-white truncate" title="${B(e.file_name||"Untitled")}">
                            ${B(e.file_name||"Untitled")}
                        </h3>
                        <div class="flex items-center gap-4 text-xs text-gray-400 mt-1">
                            <span>${n}</span>
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
                    ${i}
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
    `}function dn(e){return e?e.startsWith("image/")?"🖼️":e.startsWith("video/")?"🎥":e.startsWith("audio/")?"🎵":e==="application/pdf"?"📕":e.includes("text/")||e.includes("document")?"📝":e.includes("zip")||e.includes("archive")?"🗜️":"📄":"📄"}function Nn(e){navigator.clipboard.writeText(e).then(()=>{var t,o;f(((o=(t=window.I18N)==null?void 0:t.blockchain)==null?void 0:o.urlCopied)||"URL copied!","success")}).catch(t=>{var o,n;console.error("Failed to copy URL:",t),f(((n=(o=window.I18N)==null?void 0:o.blockchain)==null?void 0:n.copyFailed)||"Failed to copy URL","error")})}async function $n(e){var t,o,n,i,s,r,a;try{const u=await(await fetch(`/files/${e}/download-from-blockchain`,{method:"POST",headers:{"X-CSRF-TOKEN":(t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.getAttribute("content"),"Content-Type":"application/json"}})).json();u.success?f(((n=(o=window.I18N)==null?void 0:o.blockchain)==null?void 0:n.downloadSuccess)||"File downloaded successfully","success"):f(u.message||((s=(i=window.I18N)==null?void 0:i.blockchain)==null?void 0:s.downloadFailed)||"Failed to download file","error")}catch(l){console.error("Error downloading from blockchain:",l),f(((a=(r=window.I18N)==null?void 0:r.blockchain)==null?void 0:a.downloadFailed)||"Failed to download file","error")}}async function An(e){var t,o,n,i,s,r,a,l,u;if(confirm(((o=(t=window.I18N)==null?void 0:t.blockchain)==null?void 0:o.confirmRemove)||"Remove this file?"))try{const w=await(await fetch(`/files/${e}/remove-from-blockchain`,{method:"DELETE",headers:{"X-CSRF-TOKEN":(n=document.querySelector('meta[name="csrf-token"]'))==null?void 0:n.getAttribute("content"),"Content-Type":"application/json"}})).json();w.success?(f(((s=(i=window.I18N)==null?void 0:i.blockchain)==null?void 0:s.removeSuccess)||"File removed from blockchain storage","success"),Me()):f(w.message||((a=(r=window.I18N)==null?void 0:r.blockchain)==null?void 0:a.removeFailed)||"Failed to remove file","error")}catch(p){console.error("Error removing from blockchain:",p),f(((u=(l=window.I18N)==null?void 0:l.blockchain)==null?void 0:u.removeFailed)||"Failed to remove file","error")}}async function Sn(e){var o,n,i,s,r;let t=((n=(o=window.I18N)==null?void 0:o.blockchain)==null?void 0:n.confirmEnablePerm)||"Enable permanent storage?";try{const l=await(await fetch("/files/processing-options")).json();l.success&&!l.user_is_premium&&(t=((s=(i=window.I18N)==null?void 0:i.blockchain)==null?void 0:s.confirmEnablePermFee)||"Enable permanent storage (fee may apply)?")}catch(a){console.warn("Could not check premium status:",a)}if(confirm(t))try{const l=await(await fetch(`/files/${e}/enable-permanent-storage`,{method:"POST",headers:{"X-CSRF-TOKEN":(r=document.querySelector('meta[name="csrf-token"]'))==null?void 0:r.getAttribute("content"),"Content-Type":"application/json"}})).json();l.success?(f("Permanent storage enabled successfully","success"),Me()):f(l.message||"Failed to enable permanent storage","error")}catch(a){console.error("Error enabling permanent storage:",a),f("Failed to enable permanent storage","error")}}async function Bn(e){try{const o=await(await fetch(`/arweave-client/files/${e}/details`)).json();if(!o.success)throw new Error(o.message||"Failed to load file details");const n=o.file,i=Ln(n);document.body.appendChild(i)}catch(t){console.error("Error loading file details:",t),f("Failed to load file details: "+t.message,"error")}}function Ln(e){var a,l;const t=document.createElement("div");t.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";const o=new Date(e.created_at).toLocaleString(),n=e.last_accessed_at?new Date(e.last_accessed_at).toLocaleString():"Never",i=e.file_size_bytes?re(e.file_size_bytes):"Unknown",s=e.upload_cost_matic?`${parseFloat(e.upload_cost_matic).toFixed(6)} MATIC`:"Free",r=e.upload_cost_usd?`$${parseFloat(e.upload_cost_usd).toFixed(2)}`:"N/A";return t.innerHTML=`
        <div class="bg-[#0D0E2F] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-[#3C3F58]">
                <h3 class="text-xl font-semibold text-white">📄 ${((l=(a=window.I18N)==null?void 0:a.blockchain)==null?void 0:l.fileDetailsTitle)||"File Details"}</h3>
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
                                <p class="text-white font-medium">${B(e.file_name)}</p>
                            </div>
                            
                            <div>
                                <label class="text-sm text-gray-400">${window.I18N.blockchain.fileSize}</label>
                                <p class="text-white">${i}</p>
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
                                ${e.upload_cost_usd?`<p class="text-sm text-gray-400">${r} USD</p>`:""}
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
                                <p class="text-white">${n}</p>
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
                            ${Object.entries(e.gateway_urls).map(([u,p])=>{var w,v;return`
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-400 capitalize">${u.replace("_"," ")}</span>
                                    <button onclick="window.open('${p}', '_blank')" 
                                    class="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors">
                                        ${((v=(w=window.I18N)==null?void 0:w.blockchain)==null?void 0:v.openBtn)||"Open"}
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
    `,t}function Cn(e){if(window.EncryptedFileAccess){const t=new window.EncryptedFileAccess;t.init(),t.requestFileAccess(e,"Encrypted Arweave File")}else f("Encrypted file access system not available","error")}window.downloadFromBlockchain=$n;window.removeFromBlockchain=An;window.enablePermanentStorage=Sn;window.copyArweaveUrl=Nn;window.showFileDetails=Bn;window.accessEncryptedFile=Cn;window.cleanupBlockchainUI=Ie;document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("js-localization-data");e&&!window.I18N&&(window.I18N=window.I18N||{},window.I18N.dbMyDocuments=e.getAttribute("data-my-documents"))});function f(e,t="info"){const o=document.getElementById("notification-container");if(!o){console.error("Notification container not found.");return}typeof window<"u"&&!window.showNotification&&(window.showNotification=f);const n={info:"ℹ️",success:"✅",error:"❌",warning:"⚠️"},i={info:"bg-blue-500",success:"bg-green-500",error:"bg-red-500",warning:"bg-yellow-500"},s=n[t]||n.info,r=i[t]||i.info,a=document.createElement("div");a.className=`flex items-center ${r} text-white text-sm font-bold px-4 py-3 rounded-md shadow-lg transform transition-all duration-300 translate-y-4 opacity-0`,a.innerHTML=`<span>${s}</span><p class="ml-2">${B(e)}</p>`,o.appendChild(a),setTimeout(()=>{a.classList.remove("translate-y-4","opacity-0")},100),setTimeout(()=>{a.classList.add("opacity-0"),a.addEventListener("transitionend",()=>a.remove())},5e3)}function B(e){if(e===null||typeof e>"u")return"";const t=document.createElement("p");return t.textContent=e,t.innerHTML}function re(e){if(e===0)return"0 Bytes";const t=1024,o=["Bytes","KB","MB","GB","TB"],n=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,n)).toFixed(2))+" "+o[n]}function me(e=[]){const t={new:{element:document.getElementById("newDropdown"),classes:["opacity-0","invisible","translate-y-[-10px]"],arrow:document.getElementById("uploadIcon")},profile:{element:document.getElementById("profileDropdown"),classes:["opacity-0","invisible","translate-y-[-10px]"]},language:{element:document.getElementById("headerLanguageSubmenu2"),classes:["opacity-0","invisible","translate-y-[-10px]"],arrow:document.getElementById("langCaret")},notification:{element:document.getElementById("notificationDropdown"),classes:["opacity-0","invisible","translate-y-[-10px]"]},bundlrWallet:{element:document.getElementById("bundlrWalletDropdown"),classes:["opacity-0","invisible","translate-y-[-10px]"]}};for(const[o,n]of Object.entries(t))!e.includes(o)&&n.element&&(n.classes.forEach(i=>n.element.classList.add(i)),n.arrow&&(n.arrow.style.transform="rotate(0deg)"),o==="language"&&(n.element.style.pointerEvents="none"))}window.closeAllDropdowns=me;function Mn(){const e=document.getElementById("newBtn"),t=document.getElementById("newDropdown"),o=document.getElementById("uploadIcon"),n=document.getElementById("uploadFileOption"),i=document.getElementById("openClientArweaveBtn"),s=document.getElementById("createFolderOption");if(!e||!t||!o)return;const r=()=>{t.classList.add("opacity-0","invisible","translate-y-[-10px]"),o.style.transform="rotate(0deg)"};e.addEventListener("click",a=>{a.stopPropagation(),t.classList.contains("opacity-0")?(me(["new"]),typeof oe=="function"&&oe(),t.classList.remove("opacity-0","invisible","translate-y-[-10px]"),o.style.transform="rotate(180deg)"):r()}),n==null||n.addEventListener("click",r),i==null||i.addEventListener("click",r),s==null||s.addEventListener("click",r)}function Tn(){const e=document.getElementById("userProfileBtn"),t=document.getElementById("profileDropdown");if(!e||!t){console.debug("Profile dropdown elements not found - skipping profile initialization");return}e.addEventListener("click",function(o){o.stopPropagation(),t.classList.contains("opacity-0")||t.classList.contains("invisible")?(me(["profile","language"]),typeof oe=="function"&&oe(),t.classList.remove("opacity-0","invisible","translate-y-[-10px]","overflow-hidden")):t.classList.add("opacity-0","invisible","translate-y-[-10px]","overflow-hidden")})}function se(e,t="main"){var u;const o=document.getElementById("breadcrumbsContainer"),n=document.getElementById("breadcrumbsDropdown"),i=document.getElementById("breadcrumbsDropdownMenu"),s=document.getElementById("breadcrumbsPath");if(!o||!n||!i||!s)return;i.innerHTML="",s.innerHTML="";let r=[];switch(t){case"trash":r=[{id:"trash",name:"Trash"}];break;case"blockchain":r=[{id:"blockchain",name:"Blockchain Storage"}];break;case"main":default:r=[{id:null,name:((u=window.I18N)==null?void 0:u.dbMyDocuments)||"My Documents"}];break}let a=r;if(t==="main"&&e&&e.length>0){const p=e.filter(w=>w.id!==null);a=[...r,...p]}if(a.length===0){n.classList.add("hidden");return}if(a.length>3){n.classList.remove("hidden"),a.slice(0,-2).forEach(v=>{const F=document.createElement("a");F.href="#",F.className="block px-3 py-2 text-sm text-gray-300 hover:bg-[#2A2D47] rounded",F.textContent=cn(v.name,30),F.title=v.name,F.dataset.folderId=v.id,i.appendChild(F)});const w=a.slice(-3);en(w,s,t)}else n.classList.add("hidden"),en(a,s,t)}function en(e,t,o){e.forEach((n,i)=>{if(i>0){const r=document.createElement("span");r.innerHTML=`
                <svg class="w-3 h-3 mx-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
            `,t.appendChild(r)}const s=document.createElement("a");s.href="#",s.className="px-2 py-1 rounded text-sm transition-colors max-w-[200px] truncate inline-block",s.textContent=cn(n.name,25),s.title=n.name,s.dataset.folderId=n.id,(o!=="main"||n.id==="trash"||n.id==="blockchain")&&(s.style.pointerEvents="none",s.style.cursor="default"),i===e.length-1?s.className+=" text-white font-medium bg-[#3C3F58]":s.className+=" text-gray-400 hover:bg-[#2A2D47]",t.appendChild(s)})}function cn(e,t){return e.length<=t?e:e.substring(0,t-3)+"..."}function Dn(){const e=document.getElementById("breadcrumbsMenuBtn"),t=document.getElementById("breadcrumbsDropdownMenu");!e||!t||(e.addEventListener("click",o=>{o.stopPropagation(),t.classList.toggle("hidden")}),document.addEventListener("click",o=>{!t.contains(o.target)&&!e.contains(o.target)&&t.classList.add("hidden")}),t.addEventListener("click",o=>{if(o.target.tagName==="A"&&o.target.dataset.folderId){o.preventDefault();const n=o.target.dataset.folderId==="null"?null:o.target.dataset.folderId,i=o.target.textContent;window.dispatchEvent(new CustomEvent("navigate-to-folder",{detail:{folderId:n,folderName:i}})),t.classList.add("hidden")}}))}function _n(){const e=document.getElementById("headerLanguageToggle2"),t=document.getElementById("headerLanguageSubmenu2"),o=document.getElementById("langCaret");!e||!t||(t.style.pointerEvents="none",e.addEventListener("click",function(n){n.stopPropagation(),t.classList.contains("opacity-0")||t.classList.contains("invisible")?(t.classList.remove("opacity-0","invisible","translate-y-[-10px]"),t.style.pointerEvents="auto",o&&(o.style.transform="rotate(180deg)")):(t.classList.add("opacity-0","invisible","translate-y-[-10px]"),t.style.pointerEvents="none",o&&(o.style.transform="rotate(0deg)"))}))}function Pn(){const e=document.getElementById("notificationBell"),t=document.getElementById("notificationDropdown");if(!e||!t){console.debug("Notification dropdown elements not found - skipping notification initialization");return}e.addEventListener("click",function(o){o.stopPropagation(),t.classList.contains("opacity-0")?(me(["notification"]),typeof oe=="function"&&oe(),t.classList.remove("opacity-0","invisible","translate-y-[-10px]"),window.dispatchEvent(new CustomEvent("open-notifications"))):t.classList.add("opacity-0","invisible","translate-y-[-10px]")})}function Rn(){const e=document.getElementById("bundlrWalletBtn"),t=document.getElementById("bundlrWalletDropdown");!e||!t||e.addEventListener("click",function(o){o.stopPropagation(),t.classList.contains("opacity-0")?(me(["bundlrWallet"]),typeof oe=="function"&&oe(),t.classList.remove("opacity-0","invisible","translate-y-[-10px]"),window.dispatchEvent(new CustomEvent("open-bundlr-wallet"))):t.classList.add("opacity-0","invisible","translate-y-[-10px]")})}function qi(e){const{loadUserFiles:t,loadTrashItems:o,loadSharedFiles:n,loadBlockchainItems:i,state:s}=e;Mn(),Tn(),On(),Dn(),_n(),Pn(),Rn(),jn(t,o,n,i,s),document.addEventListener("click",function(r){const a={new:[document.getElementById("newBtn"),document.getElementById("newDropdown")],profile:[document.getElementById("userProfileBtn"),document.getElementById("profileDropdown")],language:[document.getElementById("headerLanguageToggle2"),document.getElementById("headerLanguageSubmenu2")],notification:[document.getElementById("notificationBell"),document.getElementById("notificationDropdown")],bundlrWallet:[document.getElementById("bundlrWalletBtn"),document.getElementById("bundlrWalletDropdown")]};let l=!1;for(const u of Object.values(a))if(u.some(p=>p&&p.contains(r.target))){l=!0;break}l||me()})}function jn(e,t,o,n,i){const s=()=>{var h,x;return((h=window.I18N)==null?void 0:h.dbMyDocuments)||((x=document.getElementById("js-localization-data"))==null?void 0:x.getAttribute("data-my-documents"))||"My Documents"},r=document.getElementById("my-documents-link"),a=document.getElementById("shared-with-me-link"),l=document.getElementById("trash-link"),u=document.getElementById("blockchain-storage-link"),p=document.getElementById("new-button-container"),w=document.getElementById("header-title");function v(){r==null||r.classList.remove("bg-primary","text-white"),a==null||a.classList.remove("bg-primary","text-white"),l==null||l.classList.remove("bg-primary","text-white"),u==null||u.classList.remove("bg-primary","text-white")}function F(){const h=document.getElementById("breadcrumbsContainer");h&&(h.style.display="none");const x=document.getElementById("new-button"),S=document.getElementById("create-folder-btn");x&&(x.style.display="none"),S&&(S.style.display="none");const C=document.getElementById("advanced-search-button");C&&(C.style.display="none");const b=document.getElementById("viewToggleBtns");b&&(b.style.display="none")}function N(){const h=document.getElementById("breadcrumbsContainer");h&&(h.style.display="flex");const x=document.getElementById("new-button"),S=document.getElementById("create-folder-btn");x&&(x.style.display="block"),S&&(S.style.display="block");const C=document.getElementById("advanced-search-button"),b=document.getElementById("viewToggleBtns");b&&(b.style.display="flex"),C&&(C.style.display="flex")}function A(h){const x=document.getElementById("breadcrumbsContainer");x&&(x.style.display="flex");let S=[];if(h==="main")try{const y=localStorage.getItem("breadcrumbs");y&&(S=JSON.parse(y))}catch(y){console.warn("Failed to parse breadcrumbs from localStorage:",y),S=[]}se(S,h);const C=document.getElementById("new-button"),b=document.getElementById("create-folder-btn"),E=document.getElementById("advanced-search-button");h!=="main"?(C&&(C.style.display="none"),b&&(b.style.display="none"),E&&(E.style.display="none")):(C&&(C.style.display="block"),b&&(b.style.display="block"),E&&(E.style.display="flex"))}r==null||r.addEventListener("click",h=>{h.preventDefault(),Ie();const x=s();w&&(w.textContent=x),p&&(p.style.display="block"),v(),r.classList.add("bg-primary","text-white"),N(),A("main"),e(i.lastMainSearch,1,null)}),a==null||a.addEventListener("click",h=>{h.preventDefault(),Ie(),w&&(w.textContent="Shared with Me"),p&&(p.style.display="none"),v(),a.classList.add("bg-primary","text-white"),F(),A("shared"),o()}),l==null||l.addEventListener("click",h=>{h.preventDefault(),Ie(),w&&(w.textContent="Trash"),p&&(p.style.display="none"),v(),l.classList.add("bg-primary","text-white"),F(),A("trash"),t()}),u==null||u.addEventListener("click",h=>{if(window.userIsPremium){h.preventDefault(),w&&(w.textContent="Blockchain Storage"),p&&(p.style.display="block"),v(),u.classList.add("bg-primary","text-white"),F();try{typeof n=="function"&&n()}catch{}}})}function Vi(){document.querySelectorAll(".tooltip").forEach(e=>e.remove()),document.querySelectorAll("[data-tooltip]").forEach(e=>{e.addEventListener("mouseenter",tn),e.addEventListener("mouseleave",on),e.addEventListener("focus",tn),e.addEventListener("blur",on)})}function tn(e){const t=e.target,o=t.getAttribute("data-tooltip");if(!o)return;const n=document.createElement("div");n.className="tooltip absolute bg-gray-800 text-white text-xs rounded py-1 px-2 z-50 pointer-events-none",n.textContent=o,n.style.whiteSpace="nowrap",document.body.appendChild(n);const i=t.getBoundingClientRect(),s=n.getBoundingClientRect();n.style.left=`${i.left+i.width/2-s.width/2}px`,n.style.top=`${i.top-s.height-5}px`,n.offsetLeft<5&&(n.style.left="5px"),n.offsetLeft+s.width>window.innerWidth-5&&(n.style.left=`${window.innerWidth-s.width-5}px`),n.offsetTop<5&&(n.style.top=`${i.bottom+5}px`)}function on(){document.querySelectorAll(".tooltip").forEach(e=>e.remove())}function un(e){const t=document.getElementById(e);if(!t){console.warn(`Modal #${e} not found`);return}t.classList.remove("hidden"),document.documentElement.style.overflow="hidden"}function mn(e){const t=document.getElementById(e);if(!t)return;t.classList.add("hidden"),document.querySelector(".fixed.inset-0.z-50:not(.hidden)")||(document.documentElement.style.overflow="")}function On(){Hn(),window.openPermanentStorageModal=function(){const e=document.getElementById("permanentStorageModal");e&&(e.classList.remove("hidden"),e.classList.add("flex"))},window.closePermanentStorageModal=function(){const e=document.getElementById("permanentStorageModal");e&&(e.classList.add("hidden"),e.classList.remove("flex"))},document.querySelectorAll("[data-modal-open]").forEach(e=>e.addEventListener("click",t=>{t.preventDefault();const o=e.getAttribute("data-modal-open");o&&un(o)})),document.querySelectorAll("[data-modal-close]").forEach(e=>e.addEventListener("click",t=>{t.preventDefault();const o=e.getAttribute("data-modal-close");o&&mn(o)}))}function Hn(){window.showPremiumUpgradeModal=function(t){const o=document.getElementById("premiumUpgradeModal"),n=document.getElementById("premiumModalText"),i={blockchain:"Blockchain storage provides immutable, decentralized file storage using Arweave technology. Upgrade to Premium to secure your documents forever.",ai:"AI Vectorization enables advanced search capabilities and intelligent document analysis. Upgrade to Premium to unlock AI-powered features.",hybrid:"Hybrid processing combines blockchain storage with AI analysis for maximum security and functionality. Upgrade to Premium for the complete solution."};n&&(n.textContent=i[t]||i.blockchain),o&&(o.classList.remove("hidden"),o.classList.add("flex"))},window.closePremiumModal=function(){const t=document.getElementById("premiumUpgradeModal");t&&(t.classList.add("hidden"),t.classList.remove("flex"))};const e=document.getElementById("premiumUpgradeModal");e&&e.addEventListener("click",function(t){t.target===this&&window.closePremiumModal()})}document.addEventListener("keydown",e=>{e.key==="Escape"&&(document.querySelectorAll(".fixed.inset-0.z-50:not(.hidden)").forEach(t=>t.classList.add("hidden")),document.documentElement.style.overflow="")});typeof window<"u"&&(window.openModal=un,window.closeModal=mn,window.handleBlockchainClick=function(e){window.userIsPremium||(e.preventDefault(),e.stopPropagation(),showPremiumUpgradeModal("blockchain"))});let d={currentPage:1,lastMainSearch:"",currentParentId:null,breadcrumbs:[],layout:localStorage.getItem("filesLayout")||"grid",lastItems:[],delegatedListenersBound:!1,containerRef:null,processingStatusCache:{},selectedItems:new Set,lastSelectedIndex:-1};function $(){const e=document.querySelector('meta[name="csrf-token"]');if(e&&e.content)return e.content;const t=document.cookie.match(/XSRF-TOKEN=([^;]+)/);return t?decodeURIComponent(t[1]):""}async function qn(e){try{if(d.processingStatusCache&&d.processingStatusCache[e])return d.processingStatusCache[e];const t=await fetch(`/files/${e}/processing-status`,{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$(),"X-XSRF-TOKEN":$()},credentials:"same-origin"});if(!t.ok)return null;const o=await t.json().catch(()=>null);return o?(d.processingStatusCache[e]=o,o):null}catch{return null}}function U(){d.selectedItems.clear(),d.lastSelectedIndex=-1,Ee(),Ne()}function Vn(){const e=document.getElementById("filesContainer");e&&(e.querySelectorAll('[data-item-id]:not([style*="display: none"]):not([style*="display:none"])').forEach(t=>{const o=t.dataset.itemId;o&&d.selectedItems.add(o)}),Ee(),Ne(),Un())}function zn(e){const t=Array.from(document.querySelectorAll("#filesContainer [data-item-id]")),o=d.lastSelectedIndex,n=t.findIndex(r=>r.dataset.itemId===e);if(o===-1||n===-1){fn(e,!1);return}const i=Math.min(o,n),s=Math.max(o,n);d.selectedItems.clear();for(let r=i;r<=s;r++){const a=t[r];if(a){const l=a.dataset.itemId;l&&d.selectedItems.add(l)}}d.lastSelectedIndex=n,Ee(),Ne()}function fn(e,t=!1){t||d.selectedItems.clear(),d.selectedItems.has(e)?d.selectedItems.delete(e):d.selectedItems.add(e);const n=Array.from(document.querySelectorAll("#filesContainer [data-item-id]")).findIndex(i=>i.dataset.itemId===e);n!==-1&&(d.lastSelectedIndex=n),Ee(),Ne()}function Ee(){var N,A,h,x;const e=document.getElementById("selectionToolbar"),t=document.getElementById("selectionCount"),o=document.getElementById("selectionOpenBtn"),n=document.getElementById("selectionRenameBtn"),i=document.getElementById("selectionMoveBtn"),s=document.getElementById("selectionRestoreBtn"),r=document.getElementById("selectionDeleteBtn"),a=document.getElementById("selectionShareBtn"),l=document.getElementById("selectionDownloadBtn"),u=r==null?void 0:r.querySelector(".btn-label"),p=document.getElementById("filesContainer"),w=(p==null?void 0:p.dataset.view)==="trash";if(!e||!t)return;const v=d.selectedItems.size;if(v===0){e.classList.add("hidden");return}const F=window.I18N.fileFolder.lblSelectedCount.replace(":count",v);t.textContent=F,e.classList.remove("hidden"),w?(o==null||o.classList.add("hidden"),i==null||i.classList.add("hidden"),n==null||n.classList.add("hidden"),a==null||a.classList.add("hidden"),l==null||l.classList.add("hidden"),s==null||s.classList.remove("hidden"),u&&(u.textContent=((A=(N=window.I18N)==null?void 0:N.fileFolder)==null?void 0:A.deletePermanently)||"Delete permanently")):(o==null||o.classList.remove("hidden"),i==null||i.classList.remove("hidden"),n==null||n.classList.remove("hidden"),a==null||a.classList.remove("hidden"),l==null||l.classList.remove("hidden"),s==null||s.classList.add("hidden"),u&&(u.textContent=`${((x=(h=window.I18N)==null?void 0:h.fileFolder)==null?void 0:x.delete)||"Delete"}`),o&&(o.disabled=v>1),n&&(n.disabled=v>1),a&&(a.disabled=v>1))}function Ne(){const e=document.getElementById("filesContainer");e&&e.querySelectorAll("[data-item-id]").forEach(t=>{const o=t.dataset.itemId;d.selectedItems.has(o)?t.classList.add("selected"):t.classList.remove("selected")})}function Un(){const e=d.selectedItems.size;if(e>0){const t=window.I18N.fileFolder.lblSelectedCount.replace(":count",e);f(t,"info")}}function nn(e,t){if(e.target.closest(".actions-menu-btn"))return!1;e.preventDefault(),e.stopPropagation();const o=e.ctrlKey||e.metaKey;return e.shiftKey&&d.lastSelectedIndex!==-1?zn(t):fn(t,o),!0}function Xn(e){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.contentEditable==="true")return;const t=document.getElementById("filesContainer");if(t==null||t.dataset.view,e.ctrlKey||e.metaKey)switch(e.key.toLowerCase()){case"a":e.preventDefault(),Vn();break}else switch(e.key){case"Escape":e.preventDefault(),U();break;case"Delete":case"Backspace":d.selectedItems.size>0&&(e.preventDefault(),wn());break;case"Enter":d.selectedItems.size===1&&(e.preventDefault(),pn());break}}function pn(){if(d.selectedItems.size!==1)return;const e=Array.from(d.selectedItems)[0],t=te(e);t&&(t.is_folder?Q(t.id,t.file_name||t.name):ve(t.id),U())}async function wn(){var n,i,s,r,a,l,u,p,w,v,F,N;if(d.selectedItems.size===0)return;const e=document.getElementById("filesContainer"),t=(e==null?void 0:e.dataset.view)==="trash",o=t?`${((i=(n=window.I18N)==null?void 0:n.fileFolder)==null?void 0:i.deletePermanently)||"Delete permanently?"} ${d.selectedItems.size} ${d.selectedItems.size>1?((r=(s=window.I18N)==null?void 0:s.fileFolder)==null?void 0:r.items)||"items":((l=(a=window.I18N)==null?void 0:a.fileFolder)==null?void 0:l.item)||"item"}?`:`${((p=(u=window.I18N)==null?void 0:u.fileFolder)==null?void 0:p.moveToTrash)||"Move to trash?"} ${d.selectedItems.size} ${d.selectedItems.size>1?((v=(w=window.I18N)==null?void 0:w.fileFolder)==null?void 0:v.items)||"items":((N=(F=window.I18N)==null?void 0:F.fileFolder)==null?void 0:N.item)||"item"}?`;if(confirm(o))try{const A=Array.from(d.selectedItems).map(h=>t?_e(h):be(h));await Promise.all(A),f(t?window.I18N.fileFolder.msgPermDeleteSuccess:window.I18N.fileFolder.msgDeleteSuccess,"success"),U(),t?ee():O(d.lastMainSearch,d.currentPage,d.currentParentId)}catch(A){console.error("Error deleting items:",A),f("Error deleting items","error")}}function Wn(){if(d.selectedItems.size===0)return;if(d.selectedItems.size>50){f(window.I18N.fileFolder.msgMoveLimit,"error");return}const e=Array.from(d.selectedItems);pi(e)}function Gn(){if(d.selectedItems.size!==1)return;const e=Array.from(d.selectedItems)[0];Pe(e),U()}async function Kn(){var s,r,a,l,u,p,w,v;if(d.selectedItems.size===0)return;const e=document.getElementById("filesContainer"),t=(e==null?void 0:e.dataset.view)==="trash",o=t&&d.currentParentId!==null;let n=`${((r=(s=window.I18N)==null?void 0:s.fileFolder)==null?void 0:r.restore)||"Restore?"} ${d.selectedItems.size} ${d.selectedItems.size>1?((l=(a=window.I18N)==null?void 0:a.fileFolder)==null?void 0:l.items)||"items":((p=(u=window.I18N)==null?void 0:u.fileFolder)==null?void 0:p.item)||"item"}?`;if(o&&(n+=`

${((v=(w=window.I18N)==null?void 0:w.fileFolder)==null?void 0:v.restoreToRoot)||"These items will be restored to the root because their parent folder is deleted."}`),!!confirm(n))try{const F=Array.from(d.selectedItems).map(N=>De(N,!0));await Promise.all(F),f(window.I18N.fileFolder.msgRestoreSuccess,"success"),U(),t?await Te(d.currentParentId):await O(d.lastMainSearch,d.currentPage,d.currentParentId)}catch(F){console.error("Error restoring items:",F),f("Failed to restore items","error")}}function sn(){const e=document.getElementById("createFolderModal");e==null||e.classList.remove("hidden")}function Se(){const e=document.getElementById("createFolderModal");e==null||e.classList.add("hidden")}function rn(){const e=document.getElementById("newDropdown");e&&e.classList.add("opacity-0","invisible","translate-y-[-10px]")}function Jn(e){var N,A,h,x,S,C,b,E;if(d.currentParentId=e.currentParentId,d.currentParentId==="null"||d.currentParentId===""||typeof d.currentParentId>"u")d.currentParentId=null;else if(d.currentParentId!==null){const y=parseInt(d.currentParentId,10);Number.isNaN(y)||(d.currentParentId=y)}d.currentParentId===null?d.breadcrumbs=[]:d.breadcrumbs=e.breadcrumbs;const t=document.getElementById("create-folder-btn");t==null||t.addEventListener("click",()=>{sn()});const o=document.getElementById("createFolderOption");o==null||o.addEventListener("click",y=>{y.preventDefault(),rn(),sn()});const n=document.getElementById("uploadFileOption");n==null||n.addEventListener("click",y=>{y.preventDefault(),rn(),typeof window.showUploadModal=="function"?window.showUploadModal():f(window.I18N.fileFolder.msgUploadNotInit,"error")}),document.getElementById("createFolderModal");const i=document.getElementById("createFolderForm"),s=document.getElementById("newFolderNameInput"),r=document.getElementById("cancelCreateFolderBtn"),a=document.getElementById("closeCreateFolderModalBtn");i==null||i.addEventListener("submit",async y=>{y.preventDefault();const k=((s==null?void 0:s.value)||"").trim();if(!k){f(window.I18N.fileFolder.msgFolderReq,"error");return}try{await Yn(k),s.value="",Se()}catch{}}),r==null||r.addEventListener("click",y=>{y.preventDefault(),s&&(s.value=""),Se()}),a==null||a.addEventListener("click",y=>{y.preventDefault(),s&&(s.value=""),Se()});const l=document.getElementById("breadcrumbsContainer");l==null||l.addEventListener("click",y=>{if(y.target.tagName==="A"&&y.target.dataset.folderId){y.preventDefault();const k=y.target.dataset.folderId==="null"?null:y.target.dataset.folderId,T=y.target.textContent;Q(k,T)}}),window.addEventListener("navigate-to-folder",y=>{const{folderId:k,folderName:T}=y.detail;Q(k,T)}),se(d.breadcrumbs,"main");const u=document.getElementById("btnGridLayout"),p=document.getElementById("btnListLayout");function w(){if(!u||!p)return;const y=d.layout==="grid";u.classList.toggle("text-primary",y),u.classList.toggle("text-text-secondary",!y),u.setAttribute("aria-pressed",y?"true":"false"),p.classList.toggle("text-primary",!y),p.classList.toggle("text-text-secondary",y),p.setAttribute("aria-pressed",y?"false":"true")}function v(y){d.layout=y,localStorage.setItem("filesLayout",y),Ce(y);const k=document.getElementById("btnGridLayout"),T=document.getElementById("btnListLayout");k&&T&&(k.classList.remove("active"),T.classList.remove("active"),y==="grid"?k.classList.add("active"):T.classList.add("active")),Array.isArray(d.lastItems)&&ye(d.lastItems)}u==null||u.addEventListener("click",y=>{y.preventDefault(),v("grid")}),p==null||p.addEventListener("click",y=>{y.preventDefault(),v("list")}),Ce(d.layout),w(),ei(),typeof window<"u"&&(window.__files={deleteItem:be,restoreItem:De,forceDeleteItem:_e,loadUserFiles:O,navigateToFolder:Q,state:d}),setTimeout(()=>{typeof syncSidebarVisualState=="function"&&syncSidebarVisualState(),typeof syncLayoutVisualState=="function"&&syncLayoutVisualState()},100),document.addEventListener("keydown",Xn),document.addEventListener("click",y=>{const k=document.getElementById("filesContainer");k&&k.contains(y.target)&&!y.target.closest("[data-item-id]")&&U()}),document.getElementById("selectionToolbar")&&((N=document.getElementById("selectionOpenBtn"))==null||N.addEventListener("click",pn),(A=document.getElementById("selectionDeleteBtn"))==null||A.addEventListener("click",wn),(h=document.getElementById("selectionRestoreBtn"))==null||h.addEventListener("click",Kn),(x=document.getElementById("selectionMoveBtn"))==null||x.addEventListener("click",Wn),(S=document.getElementById("selectionRenameBtn"))==null||S.addEventListener("click",Gn),(C=document.getElementById("selectionShareBtn"))==null||C.addEventListener("click",ji),(b=document.getElementById("selectionDownloadBtn"))==null||b.addEventListener("click",Oi),(E=document.getElementById("selectionClearBtn"))==null||E.addEventListener("click",U))}async function Yn(e){let t=d.currentParentId;if((t==="null"||t===""||typeof t>"u")&&(t=null),t!==null){const o=parseInt(t,10);Number.isNaN(o)?t=null:t=o}if(!e){f(window.I18N.fileFolder.msgFolderReq,"error");return}try{console.debug("Creating folder",{parentId:t,stateCurrent:d.currentParentId});const o=await fetch("/folders",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').content,Accept:"application/json","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin",body:JSON.stringify({file_name:e,parent_id:t})}),n=await o.json();if(!o.ok)throw new Error(n.message||"Failed to create folder");f(window.I18N.fileFolder.msgFolderCreated,"success"),O(d.lastMainSearch,d.currentPage,d.currentParentId)}catch(o){console.error("Create folder error:",o),f(o.message,"error")}}async function gn(){try{Ri();const e=await fetch("/api/shared-with-me",{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin"});if(!e.ok)throw new Error("Failed to load shared files");const t=await e.json();if(t.success)ln(t.shared_files||[]),se([{id:null,name:"Shared with Me"}]);else throw new Error(t.message||"Failed to load shared files")}catch(e){console.error("Failed to load shared files:",e),f(window.I18N.fileFolder.msgLoadSharedFailed,"error"),ln([])}}async function ee(){const e=document.getElementById("filesContainer");if(!e){console.error("Items container not found");return}try{e.dataset.view="trash",e.innerHTML='<div class="flex justify-center items-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>';const t=await fetch("/files/trash",{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"});if(!t.ok)throw new Error("Failed to fetch trash items");const o=await t.json().catch(()=>null);console.log("loadTrashItems: API response:",o);let n=[];Array.isArray(o)?n=o:o&&Array.isArray(o.data)||o&&o.success&&Array.isArray(o.data)?n=o.data:o&&o.items&&Array.isArray(o.items)&&(n=o.items),console.log("loadTrashItems: received",n.length,"items from API");const i=n;d.breadcrumbs=[],d.currentParentId=null,Zn(i.length),se([],"trash"),ye(i)}catch(t){console.error("Error loading trash items:",t),e.innerHTML=`
            <div class="p-4 text-center text-text-secondary col-span-full">
                <p class="mb-2">${window.I18N.fileFolder.errorLoading}</p>
                <p class="text-xs text-red-500">${B(t.message||"")}</p>
            </div>
        `}}async function Te(e){const t=document.getElementById("filesContainer");if(!t){console.error("Items container not found");return}if(e==null||e==="null"){d.currentParentId=null,d.breadcrumbs=[],await ee();return}try{t.dataset.view="trash",t.innerHTML='<div class="flex justify-center items-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>';const o=await fetch("/files/trash",{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"});if(!o.ok)throw new Error("Failed to fetch trash items");const n=await o.json().catch(()=>null);let i=[];Array.isArray(n)?i=n:n&&Array.isArray(n.data)||n&&n.success&&Array.isArray(n.data)?i=n.data:n&&n.items&&Array.isArray(n.items)&&(i=n.items);const s=i.filter(r=>r.parent_id==e);ye(s),se(d.breadcrumbs,"trash")}catch(o){console.error("Error loading trash items in folder:",o),t.innerHTML=`
            <div class="p-4 text-center text-text-secondary col-span-full">
                <p class="mb-2">Error loading trash items. Please try again.</p>
                <p class="text-xs text-red-500">${B(o.message||"")}</p>
            </div>
        `}}function Zn(e){var a,l,u,p;const t=document.getElementById("trashBanner");t&&t.remove();const o=document.getElementById("filesContainer"),n=(o==null?void 0:o.dataset.view)==="trash";if(e===0||!n)return;const i=document.getElementById("filesContainer");if(!i)return;const s=document.createElement("div");s.id="trashBanner",s.className="flex items-center justify-between px-6 py-3 mb-4 bg-surface-dark border border-border-light rounded-lg",s.innerHTML=`
        <div class="flex items-center gap-2 text-text-secondary text-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>${((l=(a=window.I18N)==null?void 0:a.fileFolder)==null?void 0:l.trashWarning)||"Items in trash will be deleted forever after 30 days"}</span>
        </div>
        <button 
            id="emptyTrashBtn" 
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-surface-dark"
        >
            ${((p=(u=window.I18N)==null?void 0:u.fileFolder)==null?void 0:p.emptyTrash)||"Empty trash"}
        </button>
    `,i.parentNode.insertBefore(s,i);const r=document.getElementById("emptyTrashBtn");r&&r.addEventListener("click",Qn)}async function Qn(){var n,i;if(!window.confirm(((i=(n=window.I18N)==null?void 0:n.fileFolder)==null?void 0:i.emptyTrashConfirm)||"Are you sure you want to permanently delete all items in trash? This action cannot be undone."))return;const t=document.getElementById("emptyTrashBtn");if(!t)return;const o=t.textContent;t.disabled=!0,t.textContent=window.I18N.fileFolder.btnEmptying,t.classList.add("opacity-50","cursor-not-allowed");try{const s=await fetch("/files/trash/empty",{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json","X-CSRF-TOKEN":$(),"X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"}),r=await s.json();if(s.ok&&r.success){f(r.message||window.I18N.fileFolder.msgTrashEmptied,"success");const a=document.getElementById("trashBanner");a&&a.remove(),await ee()}else throw new Error(r.message||window.I18N.fileFolder.msgTrashEmptyFailed)}catch(s){console.error("Error emptying trash:",s),f(s.message||window.I18N.fileFolder.msgTrashEmptyFailed,"error"),t.disabled=!1,t.textContent=o,t.classList.remove("opacity-50","cursor-not-allowed")}}function Q(e,t){const o=document.getElementById("filesContainer"),n=(o==null?void 0:o.dataset.view)==="trash";if(n&&(e==="trash"||e===null||e==="null")){d.currentParentId=null,d.breadcrumbs=[],se([],"trash"),U(),ee();return}if(e===null||e==="null")d.breadcrumbs=[];else{const i=d.breadcrumbs.findIndex(s=>s.id==e);i!==-1?d.breadcrumbs=d.breadcrumbs.slice(0,i+1):d.breadcrumbs.push({id:e,name:t})}if(U(),e===null||e==="null")d.currentParentId=null;else{const i=parseInt(e,10);d.currentParentId=Number.isNaN(i)?e:i}localStorage.setItem("currentParentId",d.currentParentId),document.getElementById("currentFolderId").value=d.currentParentId,localStorage.setItem("breadcrumbs",JSON.stringify(d.breadcrumbs)),d.currentPage=1,d.lastMainSearch="",document.getElementById("mainSearchInput").value="",n?Te(d.currentParentId):O(d.lastMainSearch,d.currentPage,d.currentParentId),se(d.breadcrumbs,n?"trash":"main")}function hn(e){var n;if(!e)return"📄";const t=(n=e.split(".").pop())==null?void 0:n.toLowerCase();return{pdf:"📄",doc:"📝",docx:"📝",xls:"📊",xlsx:"📊",ppt:"📺",pptx:"📺",jpg:"🖼️",jpeg:"🖼️",png:"🖼️",gif:"🖼️",mp4:"🎥",avi:"🎥",mov:"🎥",mp3:"🎵",wav:"🎵",zip:"📦",rar:"📦",txt:"📄"}[t]||"📄"}function Ce(e){const t=document.getElementById("filesContainer");t&&(e==="list"?t.className="grid grid-cols-1 gap-2":t.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4")}function ei(){const e=document.getElementById("filesContainer");e&&(d.containerRef!==e&&(d.containerRef=e,d.delegatedListenersBound=!1),!d.delegatedListenersBound&&(d.delegatedListenersBound=!0,e.addEventListener("click",t=>{const o=t.target.closest(".actions-menu-btn");if(o){t.preventDefault(),t.stopPropagation();const n=o.dataset.itemId;console.debug("[actions-menu-btn] click",{itemId:n}),ke(o,n)}}),e.addEventListener("keydown",t=>{const o=t.target.closest(".actions-menu-btn");if(o&&(t.key==="Enter"||t.key===" ")){t.preventDefault();const n=o.dataset.itemId;console.debug("[actions-menu-btn] keydown",{itemId:n,key:t.key}),ke(o,n)}}),e.addEventListener("click",t=>{const o=(e==null?void 0:e.dataset.view)==="trash";if(t.target.closest(".actions-menu-btn"))return;const n=t.target.closest("[data-folder-nav-id]");if(n){const s=n.dataset.folderNavId,r=n.dataset.folderNavName;console.debug("[folder] navigate click",{folderId:s,folderName:r,inTrashView:o}),Q(s,r);return}const i=t.target.closest("[data-file-id]");if(i&&!o){const s=i.dataset.fileId;if(!(i.dataset.isFolder==="true")){console.debug("[file] preview click",{fileId:s}),ve(s);return}}})))}function ti(e){var a,l,u,p,w,v,F,N,A,h;const t=!!e.is_folder,o=e.file_name||e.name||"Untitled",n=t?"📁":hn(o),i=e.updated_at||e.created_at;let s="—";if(i){const x=new Date(i);isNaN(x.getTime())||(s=x.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}))}const r=document.createElement("div");return r.className="group relative rounded-lg border border-[#4A4D6A] hover:border-[#7C7F96] hover:shadow-lg transition-all duration-200 cursor-pointer file-card",r.classList.add("file-card"),t?(r.setAttribute("data-folder-nav-id",e.id),r.setAttribute("data-folder-nav-name",o)):(r.setAttribute("data-file-id",e.id),r.setAttribute("data-is-folder","false")),r.dataset.itemId=e.id,r.dataset.isFolder=t,r.dataset.itemName=o,t&&(r.dataset.folderNavId=e.id,r.dataset.folderNavName=o),r.setAttribute("tabindex","0"),r.setAttribute("role","button"),r.setAttribute("aria-label",`Open ${t?"folder":"file"} ${o}`),r.innerHTML=`
        <!-- Header with OTP indicator and three-dot menu -->
        <div class="absolute top-2 left-2 right-2 flex justify-between items-center z-9">
            <!-- OTP Security Indicator -->
                ${!t&&e.is_confidential?`
                <div class="bg-orange-500 text-white p-1 rounded-full" title="${((l=(a=window.I18N)==null?void 0:a.fileFolder)==null?void 0:l.delete)||"OTP Protected"}" data-tooltip="${((p=(u=window.I18N)==null?void 0:u.fileFolder)==null?void 0:p.delete)||"OTP Protected"}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
            `:"<div></div>"}
            
            <!-- Actions Menu Button -->
            <button class="actions-menu-btn opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-[#4A4D6A]" 
                    data-item-id="${e.id}" 
                    title="${((v=(w=window.I18N)==null?void 0:w.fileFolder)==null?void 0:v.moreActions)||"More actions"}"
                    data-tooltip="${((N=(F=window.I18N)==null?void 0:F.fileFolder)==null?void 0:N.moreActions)||"More actions"}"
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
            <div class="text-sm font-medium text-white truncate" title="${B(o)}">
                ${B(o)}
            </div>
            <div class="text-xs text-gray-400">
                ${s}
            </div>
            
            <!-- Arweave Status Badge (for files stored on Arweave) -->
            ${!t&&e.is_blockchain_stored?`
                <div class="mt-3 pt-2 border-t border-[#4A4D6A]">
                    <div class="w-full flex items-center justify-center px-3 py-2 text-xs bg-green-600 text-white rounded-md font-medium">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        ${((h=(A=window.I18N)==null?void 0:A.fileFolder)==null?void 0:h.storedOnArweave)||"Stored on Arweave"}
                    </div>
                </div>
            `:""}
        </div>
    </div>

    <!-- Hover overlay for selection -->
    <div class="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-200 pointer-events-none"></div>
`,r}function oi(e){const t=!!e.is_folder,o=e.file_name||e.name||"Untitled",n=t?"📁":hn(o),i=t?"":typeof e.file_size<"u"?re(parseInt(e.file_size||0,10)):"",s=e.updated_at||e.created_at;let r="";if(s){const l=new Date(s);isNaN(l.getTime())||(r=l.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}))}const a=document.createElement("div");return a.className="file-row bg-[#2A2D47] p-3 rounded-lg flex items-center justify-between hover:border-[#6B7280] border border-[#4A4D6A] transition-all cursor-pointer",a.dataset.itemId=e.id,a.dataset.fileId=e.id,a.dataset.isFolder=t,a.dataset.itemName=o,t&&(a.dataset.folderNavId=e.id,a.dataset.folderNavName=o),a.setAttribute("tabindex","0"),a.setAttribute("role","button"),a.setAttribute("aria-label",`Open ${t?"folder":"file"} ${o}`),a.innerHTML=`
        <div class="flex items-center min-w-0">
            <span class="text-2xl mr-3">${n}</span>
            <span class="text-sm text-white truncate" title="${B(o)}">${B(o)}</span>
        </div>
        <div class="flex items-center text-xs text-gray-300 gap-3">
            ${i?`<span class="hidden sm:inline">${i}</span>`:""}
            ${r?`<span class="hidden sm:inline">${r}</span>`:""}
            <button class="actions-menu-btn p-2 rounded hover:bg-[#4A4D6A]" data-item-id="${e.id}" data-tooltip="More actions" title="More actions" aria-label="More actions">
                <svg viewBox="0 0 20 20" class="w-5 h-5 text-gray-300 hover:text-white" fill="currentColor">
                    <path d="M10 6c.82 0 1.5-.68 1.5-1.5S10.82 3 10 3s-1.5.67-1.5 1.5S9.18 6 10 6zm0 5.5c.82 0 1.5-.68 1.5-1.5s-.68-1.5-1.5-1.5-1.5.68-1.5 1.5.68 1.5 1.5 1.5zm0 5.5c.82 0 1.5-.67 1.5-1.5 0-.82-.68-1.5-1.5-1.5s-1.5.68-1.5 1.5c0 .83.68 1.5 1.5 1.5z"></path>
                </svg>
            </button>
        </div>
    `,a}function te(e){var t;return((t=d.lastItems)==null?void 0:t.find(o=>o.id==e))||null}function ye(e){var i,s;const t=document.getElementById("filesContainer");if(!t)return;if(t.innerHTML="",e.length===0){t.innerHTML=`<p class="text-gray-400 text-center col-span-full py-10">${((s=(i=window.I18N)==null?void 0:i.fileFolder)==null?void 0:s.noFilesFound)||"No files or folders found."}</p>`;return}d.lastItems=e,Ce(d.layout);const o=d.layout!=="list",n=document.createDocumentFragment();e.forEach(r=>{const a=o?ti(r):oi(r);n.appendChild(a)}),t.appendChild(n),t.querySelectorAll(".actions-menu-btn").forEach(r=>{r.addEventListener("click",a=>{a.stopPropagation();const l=a.currentTarget.dataset.itemId;ke(a.currentTarget,l)}),r.addEventListener("keydown",a=>{if(a.key==="Enter"||a.key===" "){a.preventDefault();const l=a.currentTarget.dataset.itemId;ke(a.currentTarget,l)}})}),t==null||t.dataset.view,t.querySelectorAll("[data-folder-nav-id]").forEach(r=>{r.addEventListener("click",a=>{if(nn(a,r.dataset.itemId))return;const u=a.currentTarget.dataset.folderNavId,p=a.currentTarget.dataset.folderNavName;Q(u,p)}),r.addEventListener("keydown",a=>{if(a.key==="Enter"||a.key===" "){a.preventDefault();const l=a.currentTarget.dataset.folderNavId,u=a.currentTarget.dataset.folderNavName;Q(l,u)}})}),t.querySelectorAll("[data-file-id]").forEach(r=>{r.addEventListener("click",a=>{if(nn(a,r.dataset.fileId))return;const u=r.dataset.fileId;r.dataset.isFolder==="true"||ve(u)}),r.addEventListener("keydown",a=>{if(a.key==="Enter"||a.key===" "){a.preventDefault();const l=a.currentTarget.dataset.fileId;a.currentTarget.dataset.isFolder==="true"||ve(l)}})}),t.querySelectorAll("[data-item-id]").forEach(r=>{r.addEventListener("dblclick",a=>{a.preventDefault(),a.stopPropagation();const l=r.dataset.itemId,u=te(l);u&&(u.is_folder?Q(l,u.file_name||u.name):ve(l))})})}function oe(){document.querySelectorAll(".actions-menu").forEach(e=>e.remove()),document.querySelectorAll('.actions-menu-btn[aria-expanded="true"]').forEach(e=>e.setAttribute("aria-expanded","false"))}function $e(){const e=document.getElementById("trashBanner");e&&e.remove()}async function ke(e,t){var R,q,ae,le,_,V,z,de,Y,ce,Z,je,Oe,He,qe,Ve,ze,Ue,Xe,We,Ge,Ke,Je,Ye,Ze,Qe,et,tt,ot,nt,it,st,rt,at,lt,dt,ct,ut,mt,ft,pt,wt,gt,ht,vt,bt,yt,xt,It,Ft,kt,Et,Nt,$t,At,St,Bt,Lt,Ct,Mt,Tt,Dt,_t,Pt,Rt,jt,Ot,Ht,qt,Vt,zt,Ut,Xt,Wt,Gt,Kt,Jt,Yt,Zt,Qt,eo,to,oo,no,io,so,ro,ao,lo,co,uo,mo,fo,po,wo,go,ho,vo,bo,yo,xo,Io,Fo,ko,Eo,No,$o,Ao,So,Bo,Lo,Co,Mo,To,Do,_o,Po,Ro,jo,Oo,Ho,qo,Vo,zo,Uo,Xo,Wo,Go,Ko,Jo,Yo;oe();const o=document.getElementById("filesContainer"),n=document.createElement("div");n.className="actions-menu absolute bg-[#1F2235] text-gray-200 rounded-lg shadow-lg border border-[#4A4D6A] py-2 z-50 min-w-[160px] max-h-64 overflow-auto",n.setAttribute("role","menu"),n.style.zIndex="9999",n.style.top="100%",n.style.bottom="auto",n.style.right="0",n.style.left="auto",n.style.pointerEvents="auto";const i=((R=document.getElementById("filesContainer"))==null?void 0:R.dataset.view)==="trash",s=te(t),r=m=>m===!0||m===1||m==="1"||m==="true",a=r(s==null?void 0:s.is_folder),l=r(s==null?void 0:s.is_blockchain_stored),u=r(s==null?void 0:s.is_vectorized)&&(s==null?void 0:s.vectorized_at)!=null,p=!!(s!=null&&s.deleted_at),w=r(s==null?void 0:s.is_confidential)||r(s==null?void 0:s.has_otp_protection);if(console.debug("[actions-menu] open",{itemId:t,inTrashView:i,isVectorized:u,isBlockchainStored:l,isFolder:a,isDeleted:p,isOtpEnabled:w}),i)n.innerHTML=`
            <button type="button" class="actions-menu-item w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#2A2D47] hover:text-white flex items-center" data-action="restore" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((ae=(q=window.I18N)==null?void 0:q.fileFolder)==null?void 0:ae.restoreAction)||"Restore"}" data-tooltip="${((_=(le=window.I18N)==null?void 0:le.fileFolder)==null?void 0:_.restoreAction)||"Restore"}">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h4l3-3m0 0l3 3m-3-3v12" />
     
            </svg>
                ${((z=(V=window.I18N)==null?void 0:V.fileFolder)==null?void 0:z.restoreAction)||"Restore"}
            </button>
            <button type="button" class="actions-menu-item w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2A2D47] hover:text-red-300 flex items-center" data-action="force-delete" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Y=(de=window.I18N)==null?void 0:de.fileFolder)==null?void 0:Y.deletePermanently)||"Delete permanently"}" data-tooltip="${((Z=(ce=window.I18N)==null?void 0:ce.fileFolder)==null?void 0:Z.deletePermanently)||"Delete permanently"}">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                ${((Oe=(je=window.I18N)==null?void 0:je.fileFolder)==null?void 0:Oe.deletePermanently)||"Delete permanently"}
            </button>
        `;else{let m="";if(a?m+=`
                <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-[#2A2D47] hover:text-blue-300 flex items-center" data-action="open-folder" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((qe=(He=window.I18N)==null?void 0:He.fileFolder)==null?void 0:qe.openFolder)||"Open folder"}" data-tooltip="${((ze=(Ve=window.I18N)==null?void 0:Ve.fileFolder)==null?void 0:ze.openFolder)||"Open folder"}">
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                    </svg>
                    ${((Xe=(Ue=window.I18N)==null?void 0:Ue.fileFolder)==null?void 0:Xe.open)||"Open"}
                </button>
        
            `:m+=`
                <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-[#2A2D47] hover:text-blue-300 flex items-center" data-action="open" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Ge=(We=window.I18N)==null?void 0:We.fileFolder)==null?void 0:Ge.openFile)||"Open file"}" data-tooltip="${((Je=(Ke=window.I18N)==null?void 0:Ke.fileFolder)==null?void 0:Je.openFile)||"Open file"}">
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    ${((Ze=(Ye=window.I18N)==null?void 0:Ye.fileFolder)==null?void 0:Ze.open)||"Open"}
                </button>
            `,m+=`
            <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#2A2D47] hover:text-white flex items-center" data-action="rename" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((et=(Qe=window.I18N)==null?void 0:Qe.fileFolder)==null?void 0:et.rename)||"Rename"}" data-tooltip="${((ot=(tt=window.I18N)==null?void 0:tt.fileFolder)==null?void 0:ot.rename)||"Rename"}">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 
002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                ${((it=(nt=window.I18N)==null?void 0:nt.fileFolder)==null?void 0:it.rename)||"Rename"}
            </button>
            <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#2A2D47] hover:text-white flex items-center" data-action="delete" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((rt=(st=window.I18N)==null?void 0:st.fileFolder)==null?void 0:rt.delete)||"Delete"}" data-tooltip="${((lt=(at=window.I18N)==null?void 0:at.fileFolder)==null?void 0:lt.delete)||"OTP Protected"}">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                ${((ct=(dt=window.I18N)==null?void 0:dt.fileFolder)==null?void 0:ct.delete)||"Delete"}
            </button>
            <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#2A2D47] hover:text-white flex items-center" data-action="move" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((mt=(ut=window.I18N)==null?void 0:ut.fileFolder)==null?void 0:mt.move)||"Move"}" data-tooltip="${((pt=(ft=window.I18N)==null?void 0:ft.fileFolder)==null?void 0:pt.move)||"Move"}">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
  
                </svg>
                ${((gt=(wt=window.I18N)==null?void 0:wt.fileFolder)==null?void 0:gt.move)||"Move"}
            </button>
        `,(!w||a)&&(m+=`
                <div class="border-t border-[#4A4D6A] my-1"></div>
                <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-indigo-400 hover:bg-[#2A2D47] hover:text-indigo-300 flex items-center" data-action="share" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((vt=(ht=window.I18N)==null?void 0:ht.fileFolder)==null?void 0:vt.share)||"Share"}" data-tooltip="${((yt=(bt=window.I18N)==null?void 0:bt.fileFolder)==null?void 0:yt.share)||"Share"}">
    
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                
                </svg>
                    ${((It=(xt=window.I18N)==null?void 0:xt.fileFolder)==null?void 0:It.share)||"Share"}
                </button>
            `),a||(m+=`
                <div class="border-t border-[#4A4D6A] my-1"></div>
                <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-orange-400 hover:bg-[#2A2D47] hover:text-orange-300 flex items-center" data-action="otp-security" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((kt=(Ft=window.I18N)==null?void 0:Ft.fileFolder)==null?void 0:kt.otpSecurity)||"OTP Security"}" data-tooltip="${((Nt=(Et=window.I18N)==null?void 0:Et.fileFolder)==null?void 0:Nt.otpSecurity)||"OTP Security"}">
      
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
        
            ${((At=($t=window.I18N)==null?void 0:$t.fileFolder)==null?void 0:At.otpSecurity)||"OTP Security"}
                </button>
            `),!a){const g=(o==null?void 0:o.dataset.view)==="blockchain";g&&l?m+=`
                    <div class="border-t border-[#4A4D6A] my-1"></div>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-purple-400 hover:bg-[#2A2D47] hover:text-purple-300 flex 
items-center" data-action="download-from-blockchain" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Bt=(St=window.I18N)==null?void 0:St.fileFolder)==null?void 0:Bt.downloadFromBlockchain)||"Download to Supabase storage"}" data-tooltip="${((Ct=(Lt=window.I18N)==null?void 0:Lt.fileFolder)==null?void 0:Ct.downloadFromBlockchain)||"Download to Supabase storage"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
     
                   </svg>
                        ${((Tt=(Mt=window.I18N)==null?void 0:Mt.fileFolder)==null?void 0:Tt.downloadFromBlockchain)||"Download to Supabase"}
                    </button>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-[#2A2D47] hover:text-blue-300 flex items-center" data-action="view-on-ipfs" data-item-id="${t}" role="menuitem" 
tabindex="-1" title="${((_t=(Dt=window.I18N)==null?void 0:Dt.fileFolder)==null?void 0:_t.viewOnIPFS)||"View on IPFS Gateway"}" data-tooltip="${((Rt=(Pt=window.I18N)==null?void 0:Pt.fileFolder)==null?void 0:Rt.viewOnIPFS)||"View on IPFS Gateway"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
           
             </svg>
                        ${((Ot=(jt=window.I18N)==null?void 0:jt.fileFolder)==null?void 0:Ot.viewOnIPFS)||"View on IPFS Gateway"}
                    </button>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-[#2A2D47] hover:text-green-300 flex items-center" data-action="copy-ipfs-hash" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((qt=(Ht=window.I18N)==null?void 0:Ht.fileFolder)==null?void 0:qt.copyIPFSHash)||"Copy IPFS Hash"}" data-tooltip="${((zt=(Vt=window.I18N)==null?void 0:Vt.fileFolder)==null?void 0:zt.copyIPFSHash)||"Copy IPFS Hash"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
       
                 </svg>
                        ${((Xt=(Ut=window.I18N)==null?void 0:Ut.fileFolder)==null?void 0:Xt.copyIPFSHash)||"Copy IPFS Hash"}
                    </button>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-yellow-400 hover:bg-[#2A2D47] hover:text-yellow-300 flex items-center" data-action="blockchain-info" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Gt=(Wt=window.I18N)==null?void 0:Wt.fileFolder)==null?void 0:Gt.blockchainInfo)||"Blockchain Information"}" data-tooltip="${((Jt=(Kt=window.I18N)==null?void 0:Kt.fileFolder)==null?void 0:Jt.blockchainInfo)||"Blockchain Information"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     
   </svg>
                        ${((Zt=(Yt=window.I18N)==null?void 0:Yt.fileFolder)==null?void 0:Zt.blockchainInfo)||"Blockchain Info"}
                    </button>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-indigo-400 hover:bg-[#2A2D47] hover:text-indigo-300 flex items-center" data-action="share-ipfs-link" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((eo=(Qt=window.I18N)==null?void 0:Qt.fileFolder)==null?void 0:eo.shareIPFSLink)||"Share IPFS Link"}" data-tooltip="${((oo=(to=window.I18N)==null?void 0:to.fileFolder)==null?void 0:oo.shareIPFSLink)||"Share IPFS Link"}">
           
             <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
               
         </svg>
                        ${((io=(no=window.I18N)==null?void 0:no.fileFolder)==null?void 0:io.shareIPFSLink)||"Share IPFS Link"}
                    </button>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-cyan-400 hover:bg-[#2A2D47] hover:text-cyan-300 flex items-center" data-action="blockchain-history" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((ro=(so=window.I18N)==null?void 0:so.fileFolder)==null?void 0:ro.blockchainHistory)||"View Blockchain History"}" data-tooltip="${((lo=(ao=window.I18N)==null?void 0:ao.fileFolder)==null?void 0:lo.blockchainHistory)||"View Blockchain History"}">
    
                     <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
   
                     ${((uo=(co=window.I18N)==null?void 0:co.fileFolder)==null?void 0:uo.blockchainHistory)||"View History"}
                    </button>
                    <div class="border-t border-[#4A4D6A] my-1"></div>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2A2D47] hover:text-red-300 flex items-center" data-action="remove-from-blockchain" data-item-id="${t}" role="menuitem" 
tabindex="-1" title="${((fo=(mo=window.I18N)==null?void 0:mo.fileFolder)==null?void 0:fo.removeFromBlockchain)||"Remove from blockchain"}" data-tooltip="${((wo=(po=window.I18N)==null?void 0:po.fileFolder)==null?void 0:wo.removeFromBlockchain)||"Remove from blockchain"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
         
                </svg>
                        ${((ho=(go=window.I18N)==null?void 0:go.fileFolder)==null?void 0:ho.removeFromBlockchain)||"Remove from Blockchain"}
                    </button>
                `:!g&&!l&&!w&&(m+=`
                    <div class="border-t border-[#4A4D6A] my-1"></div>
               
     <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-purple-400 hover:bg-[#2A2D47] hover:text-purple-300 flex items-center" data-action="upload-to-arweave" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((bo=(vo=window.I18N)==null?void 0:vo.fileFolder)==null?void 0:bo.uploadToArweave)||"Upload to Arweave permanently"}" data-tooltip="${((xo=(yo=window.I18N)==null?void 0:yo.fileFolder)==null?void 0:xo.uploadToArweave)||"Upload to Arweave permanently"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 
4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        ${((Fo=(Io=window.I18N)==null?void 0:Io.fileFolder)==null?void 0:Fo.uploadToArweave)||"Upload to Arweave"}
                    </button>
                `)}!a&&window.userIsPremium?u?(console.debug("[DEBUG] Adding vector remove button for item:",t,{isVectorized:u,isFolder:a}),(!w||a)&&(m+=`
                        <div class="border-t border-[#4A4D6A] my-1"></div>
                        <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2A2D47] hover:text-red-300 flex items-center" data-action="remove-from-vector" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Eo=(ko=window.I18N)==null?void 0:ko.fileFolder)==null?void 0:Eo.removeFromVector)||"Remove from AI vector database"}" data-tooltip="${(($o=(No=window.I18N)==null?void 0:No.fileFolder)==null?void 0:$o.removeFromVector)||"Remove from AI vector database"}">
                            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        
    </svg>
                            ${((So=(Ao=window.I18N)==null?void 0:Ao.fileFolder)==null?void 0:So.removeFromVector)||"Remove from AI Vector DB"}
                        </button>
                    `)):w||(console.debug("[DEBUG] Adding vector add button for item:",t,{isVectorized:u,isFolder:a}),m+=`
                    <div class="border-t border-[#4A4D6A] my-1"></div>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-[#2A2D47] hover:text-green-300 flex items-center" data-action="add-to-vector" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Lo=(Bo=window.I18N)==null?void 0:Bo.fileFolder)==null?void 0:Lo.shareToAI)||"Share File to A.I."}" data-tooltip="${((Mo=(Co=window.I18N)==null?void 0:Co.fileFolder)==null?void 0:Mo.shareToAI)||"Share File to A.I."}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" 
                        viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        ${((Do=(To=window.I18N)==null?void 0:To.fileFolder)==null?void 0:Do.shareToAI)||"Share File to A.I."}
                    </button>
                `):!a&&!window.userIsPremium?(console.debug("[DEBUG] Adding premium upgrade prompt for AI Vector DB"),m+=`
                <div class="border-t border-[#4A4D6A] my-1"></div>
                <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-yellow-400 hover:bg-[#2A2D47] hover:text-yellow-300 flex items-center opacity-60" onclick="showPremiumUpgradeModal('ai')" role="menuitem" tabindex="-1" title="${((Po=(_o=window.I18N)==null?void 0:_o.fileFolder)==null?void 0:Po.shareToAI)||"Share File to A.I."}">
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    ${((jo=(Ro=window.I18N)==null?void 0:Ro.fileFolder)==null?void 0:jo.shareToAI)||"Share File to A.I."}
</button>
            `):console.debug("[DEBUG] NOT adding vector buttons for folder:",t,{isVectorized:u,isFolder:a});const c=(o==null?void 0:o.dataset.view)==="blockchain";if(!a&&l){const g=r(s==null?void 0:s.is_permanent_storage);c&&!g&&(m+=`
                    <div class="border-t border-[#4A4D6A] my-1"></div>
                    <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-purple-400 hover:bg-[#2A2D47] hover:text-purple-300 flex items-center" data-action="enable-permanent-storage" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Ho=(Oo=window.I18N)==null?void 0:Oo.fileFolder)==null?void 0:Ho.enablePermanentStorage)||"Enable permanent storage (undeletable)"}" data-tooltip="${((Vo=(qo=window.I18N)==null?void 0:qo.fileFolder)==null?void 0:Vo.enablePermanentStorage)||"Enable permanent storage (undeletable)"}">
            
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
  
                      ${((Uo=(zo=window.I18N)==null?void 0:zo.fileFolder)==null?void 0:Uo.enablePermanentStorage)||"Enable Permanent Storage"}
                    </button>
                `),!c&&!g&&(m+=`
                    <div class="border-t border-[#4A4D6A] my-1"></div>
                   
     <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-orange-400 hover:bg-[#2A2D47] hover:text-orange-300 flex items-center" data-action="remove-from-blockchain" data-item-id="${t}" role="menuitem" tabindex="-1" title="${((Wo=(Xo=window.I18N)==null?void 0:Xo.fileFolder)==null?void 0:Wo.removeFromBlockchain)||"Remove from blockchain storage"}" data-tooltip="${((Ko=(Go=window.I18N)==null?void 0:Go.fileFolder)==null?void 0:Ko.removeFromBlockchain)||"Remove from blockchain storage"}">
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 
15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        ${((Yo=(Jo=window.I18N)==null?void 0:Jo.fileFolder)==null?void 0:Yo.removeFromBlockchain)||"Remove from Blockchain"}
                    </button>
          
                `)}n.innerHTML=m}(async()=>{try{if(!a&&u){const m=await qn(t);if(m!=null&&m.vectors_soft_deleted){const g=`
                        ${i?'<div class="border-t border-[#4A4D6A] my-1"></div>':""}
                        <button class="actions-menu-item w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-[#2A2D47] hover:text-green-300 flex items-center" data-action="restore-vectors" data-item-id="${t}" role="menuitem" tabindex="-1" title="${window.I18N.fileFolder.restoreAction} vectors" data-tooltip="${window.I18N.fileFolder.restoreAction} vectors">
                            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v6h6M20 20v-6h-6M20 4l-6 6M4 20l6-6" />
                            </svg>
                            ${window.I18N.fileFolder.restoreAction} vectors
                        </button>
                    `;n.insertAdjacentHTML("beforeend",g)}}}catch(m){console.warn("[actions-menu] processing-status check failed",m)}})();try{document.body.appendChild(n);const m=e.getBoundingClientRect();n.style.position="fixed",n.style.right="auto",n.style.bottom="auto";const c=8,g=-4;n.style.top=`${m.bottom+c}px`,n.style.left=`${m.right+g}px`;const I=n.getBoundingClientRect(),j=window.innerWidth,Zo=window.innerHeight-m.bottom,yn=m.top;Zo<I.height+8&&yn>Zo&&(n.style.top=`${Math.max(8,m.top-I.height)}px`);let ge=m.right-I.width+g;ge<8&&(ge=8),ge+I.width>j-8&&(ge=Math.max(8,j-I.width-8)),n.style.left=`${ge}px`}catch{}e.setAttribute("aria-expanded","true");const v=e.style.pointerEvents;e.style.pointerEvents="none";const F=n.querySelector(".actions-menu-item");F&&F.focus();const N=n.querySelectorAll(".actions-menu-item");console.debug("[DIAGNOSTIC] Menu buttons comparison:"),N.forEach((m,c)=>{const g=m.getBoundingClientRect(),I=window.getComputedStyle(m);console.debug(`[DIAGNOSTIC] Button ${c}:`,{action:m.dataset.action,itemId:m.dataset.itemId,text:m.textContent.trim(),visible:g.width>0&&g.height>0,position:{x:g.x,y:g.y,w:g.width,h:g.height},pointerEvents:I.pointerEvents,zIndex:I.zIndex,display:I.display,opacity:I.opacity,transform:I.transform})});const A=m=>{var I,j;const c=m.target.getBoundingClientRect();let g="";m.target.className&&(typeof m.target.className=="string"?g=m.target.className.split(" ").join("."):m.target.className.baseVal&&(g=m.target.className.baseVal.split(" ").join("."))),console.debug("[DIAGNOSTIC] Global click received:",{target:m.target.tagName+(g?"."+g:""),action:(I=m.target.dataset)==null?void 0:I.action,position:{x:c.x,y:c.y,w:c.width,h:c.height},clickX:m.clientX,clickY:m.clientY,isInMenu:n.contains(m.target),targetText:(j=m.target.textContent)==null?void 0:j.trim().substring(0,20)})};document.addEventListener("click",A,!0),setTimeout(()=>{document.removeEventListener("click",A,!0),console.debug("[DIAGNOSTIC] Global click logger removed")},1e4);function h(){try{document.removeEventListener("click",H)}catch{}try{document.removeEventListener("keydown",J)}catch{}try{document.removeEventListener("click",A,!0)}catch{}try{n.remove()}catch{}try{e.setAttribute("aria-expanded","false")}catch{}try{e.style.pointerEvents=v||""}catch{}}const x=n.querySelector('.actions-menu-item[data-action="delete"]');if(x){const m=c=>{var I;console.debug("[actions-menu-item][direct] event",c.type,{action:"delete",itemId:x.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=x.dataset.itemId;console.debug("[diagnostic] invoking deleteItem from direct button handler",{itemId:g}),be(g),h()};x.addEventListener("click",m)}const S=n.querySelector('.actions-menu-item[data-action="move"]');if(S){const m=c=>{var I;console.debug("[actions-menu-item][direct] event",c.type,{action:"move",itemId:S.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=S.dataset.itemId;console.debug("[diagnostic] invoking showMoveModal from direct button handler",{itemId:g}),gi(g),h()};S.addEventListener("click",m)}const C=n.querySelector('.actions-menu-item[data-action="otp-security"]');if(C){const m=async c=>{var I;console.debug("[actions-menu-item][direct] event",c.type,{action:"otp-security",itemId:C.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);try{const Ae=await(await fetch("/file-otp/check-access",{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin"})).json();if(!Ae.success||!Ae.can_use_otp){f("Please verify your email address to use OTP security features","warning"),h();return}}catch(j){console.error("Failed to check OTP access:",j),f("Failed to check access permissions","error"),h();return}const g=C.dataset.itemId;console.debug("[diagnostic] invoking showOtpSecurityModal from direct button handler",{itemId:g}),vi(g),h()};C.addEventListener("click",m)}const b=n.querySelector('.actions-menu-item[data-action="share"]');if(b){const m=c=>{var I;console.debug("[actions-menu-item][direct] event",c.type,{action:"share",itemId:b.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=b.dataset.itemId;Re(g),h()};b.addEventListener("click",m)}const E=n.querySelector('.actions-menu-item[data-action="restore"]');if(E){const m=c=>{var I;console.debug("[actions-menu-item][direct] event",c.type,{action:"restore",itemId:E.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=E.dataset.itemId;window.confirm(window.I18N.fileFolder.restore+"?")&&(console.debug("[diagnostic] invoking restoreItem from direct button handler",{itemId:g}),De(g)),h()};E.addEventListener("click",m)}const y=n.querySelector('.actions-menu-item[data-action="force-delete"]');if(y){const m=c=>{var I;console.debug("[actions-menu-item][direct] event",c.type,{action:"force-delete",itemId:y.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=y.dataset.itemId;window.confirm(window.I18N.fileFolder.confirmDeletePerm)&&(console.debug("[diagnostic] invoking forceDeleteItem from direct button handler",{itemId:g}),_e(g)),h()};y.addEventListener("click",m)}const k=n.querySelector('.actions-menu-item[data-action="download-from-blockchain"]');if(k){const m=c=>{var I;console.debug("[actions-menu-item][direct] event",c.type,{action:"download-from-blockchain",itemId:k.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=k.dataset.itemId;window.confirm(window.I18N.fileFolder.confirmDownloadChain)&&(console.debug("[diagnostic] invoking downloadFromBlockchain from direct button handler",{itemId:g}),ni(g)),h()};k.addEventListener("click",m)}const T=n.querySelector('.actions-menu-item[data-action="upload-to-blockchain"]');if(T){const m=c=>{var I;c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=T.dataset.itemId;if(console.debug("[actions-menu-item][direct] Upload to blockchain clicked",{action:"upload-to-blockchain",itemId:g,itemIdType:typeof g}),!g||g==="undefined"||g==="null"){console.error("Invalid file ID:",g),alert("Unable to identify file. Please try again."),h();return}window.openPermanentStorageModal?(console.debug("[diagnostic] Opening Arweave payment modal for file:",g),window.openPermanentStorageModal(g)):(console.error("Permanent storage modal not available"),alert("Arweave storage feature is not available. Please refresh the page.")),h()};T.addEventListener("click",m)}const D=n.querySelector('.actions-menu-item[data-action="upload-to-arweave"]');if(D){const m=c=>{if(c.preventDefault(),c.stopPropagation(),D.disabled||D.classList.contains("opacity-50")){f("🔐 "+window.I18N.fileFolder.otpProtected,"error"),h();return}const g=D.dataset.itemId;console.log("Upload to Arweave clicked for file:",g),$i(g),h()};D.addEventListener("click",m)}const X=n.querySelector('.actions-menu-item[data-action="view-on-ipfs"]');X&&X.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();const c=X.dataset.itemId;ii(c),h()});const L=n.querySelector('.actions-menu-item[data-action="copy-ipfs-hash"]');L&&L.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();const c=L.dataset.itemId;si(c),h()});const fe=n.querySelector('.actions-menu-item[data-action="blockchain-info"]');fe&&fe.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();const c=fe.dataset.itemId;ri(c),h()});const P=n.querySelector('.actions-menu-item[data-action="share-ipfs-link"]');P&&P.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();const c=P.dataset.itemId;ai(c),h()});const ne=n.querySelector('.actions-menu-item[data-action="remove-from-blockchain"]');if(ne){const m=c=>{c.preventDefault(),c.stopPropagation();const g=ne.dataset.itemId;g&&typeof window.removeFromBlockchain=="function"?window.removeFromBlockchain(g):console.error("removeFromBlockchain function not available or item ID missing"),h()};ne.addEventListener("click",m)}const W=n.querySelector('.actions-menu-item[data-action="enable-permanent-storage"]');if(W){const m=c=>{c.preventDefault(),c.stopPropagation();const g=W.dataset.itemId;g&&typeof window.enablePermanentStorage=="function"?window.enablePermanentStorage(g):console.error("enablePermanentStorage function not available or item ID missing"),h()};W.addEventListener("click",m)}const M=n.querySelector('.actions-menu-item[data-action="rename"]');if(M){const m=c=>{var I;console.debug("[actions-menu-item][direct] event",c.type,{action:"rename",itemId:M.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=M.dataset.itemId;Pe(g),h()};M.addEventListener("click",m)}const pe=n.querySelector('.actions-menu-item[data-action="open-folder"]');if(pe){const m=c=>{var j;console.debug("[actions-menu-item][direct] event",c.type,{action:"open-folder",itemId:pe.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(j=c.stopImmediatePropagation)==null||j.call(c);const g=pe.dataset.itemId,I=te(g);I&&Q(I.id,I.file_name||I.name),h()};pe.addEventListener("click",m)}const we=n.querySelector('.actions-menu-item[data-action="open"]');if(we){const m=c=>{var I;console.debug("[actions-menu-item][direct] event",c.type,{action:"open",itemId:we.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=we.dataset.itemId;window.location.href=`/files/${g}/preview`,h()};we.addEventListener("click",m)}const ie=n.querySelector('.actions-menu-item[data-action="remove-from-vector"]');if(console.debug("[DEBUG] Looking for vector removal button:",!!ie),ie){console.debug("[DEBUG] Found vector removal button, attaching listener");const m=c=>{var I;console.debug("[DEBUG] Vector removal button clicked!",c.type,{action:"remove-from-vector",itemId:ie.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=ie.dataset.itemId;console.debug("[DEBUG] Directly calling removeFromVectorDatabase for itemId:",g);try{li(g),console.debug("[DEBUG] removeFromVectorDatabase called successfully")}catch(j){console.error("[DEBUG] Error calling removeFromVectorDatabase:",j)}h()};ie.addEventListener("click",m)}const G=n.querySelector('.actions-menu-item[data-action="add-to-vector"]');if(console.debug("[DEBUG] Looking for vector add button:",!!G),G){console.debug("[DEBUG] Found vector add button, attaching listener");const m=c=>{var I;if(console.debug("[DEBUG] Vector add button clicked!",c.type,{action:"add-to-vector",itemId:G.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c),G.disabled||G.classList.contains("opacity-50")){f("🔐 This file has OTP protection enabled. Cannot share OTP-protected files with AI.","error"),h();return}const g=G.dataset.itemId;console.debug("[DEBUG] Directly calling addToVectorDatabase for itemId:",g);try{di(g),console.debug("[DEBUG] addToVectorDatabase called successfully")}catch(j){console.error("[DEBUG] Error calling addToVectorDatabase:",j)}h()};G.addEventListener("click",m)}const K=n.querySelector('.actions-menu-item[data-action="restore-vectors"]');if(K){const m=c=>{var I;console.debug("[actions-menu-item][direct] event",c.type,{action:"restore-vectors",itemId:K.dataset.itemId}),c.preventDefault(),c.stopPropagation(),(I=c.stopImmediatePropagation)==null||I.call(c);const g=K.dataset.itemId;window.confirm(window.I18N.fileFolder.confirmRestoreVec)&&(console.debug("[diagnostic] invoking restoreVectors from direct button handler",{itemId:g}),ci(g)),h()};K.addEventListener("click",m)}function H(m){!n.contains(m.target)&&!e.contains(m.target)&&h()}document.addEventListener("click",H);function J(m){m.key==="Escape"&&h()}document.addEventListener("keydown",J)}async function be(e){try{console.debug("[deleteItem] Initiating delete",{itemId:e}),f(window.I18N.fileFolder.btnEmptying.replace("...","")+"...","info");const t=await fetch(`/files/${e}`,{method:"DELETE",headers:{"X-CSRF-TOKEN":$(),"X-XSRF-TOKEN":$(),Accept:"application/json","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"});console.debug("[deleteItem] Fetch completed",{status:t.status});const o=t.headers.get("Content-Type")||"";if(console.debug("[deleteItem] Response received",{status:t.status,ok:t.ok,contentType:o}),!o.includes("application/json")){const n=await t.text().catch(()=>"");throw console.error("[deleteItem] Unexpected non-JSON response body (possible redirect):",n==null?void 0:n.slice(0,200)),new Error("Move to trash failed: unexpected response (are you still logged in?)")}if(!t.ok){let n=`Failed to move item to trash (status ${t.status})`;try{if(o.includes("application/json"))n=(await t.json()).message||n;else{const i=await t.text();console.error("[deleteItem] Non-JSON error response:",i)}}catch(i){console.error("[deleteItem] Error parsing error response:",i)}throw new Error(n)}f(window.I18N.fileFolder.msgDeleteSuccess,"success"),document.dispatchEvent(new CustomEvent("fileDeleted",{detail:{itemId:e}})),O(d.lastMainSearch,d.currentPage,d.currentParentId)}catch(t){console.error("Error moving item to trash:",t),f(t.message,"error")}}async function De(e,t=!1){try{console.debug("[restoreItem] Initiating restore",{itemId:e,skipDialog:t});const o=document.getElementById("filesContainer"),n=(o==null?void 0:o.dataset.view)==="trash",i=n&&d.currentParentId!==null;let s=!1;if(i&&!t){if(!window.confirm(`This file will be restored to the root because its parent folder is deleted.

Continue?`)){console.debug("[restoreItem] Restore cancelled by user");return}s=!0}else i&&t&&(s=!0);const r=s?{restore_to_root:!0}:{},a=await fetch(`/files/${e}/restore`,{method:"PATCH",headers:{"X-CSRF-TOKEN":$(),"X-XSRF-TOKEN":$(),Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin",body:Object.keys(r).length>0?JSON.stringify(r):void 0});if(console.debug("[restoreItem] Fetch completed",{status:a.status,restoreToRoot:s}),!a.ok){const l=await a.json().catch(()=>({}));throw new Error(l.message||"Failed to restore item")}f(window.I18N.fileFolder.msgRestoreSuccess,"success"),document.dispatchEvent(new CustomEvent("fileRestored",{detail:{itemId:e}})),typeof ee=="function"&&(n?await Te(d.currentParentId):await ee())}catch(o){console.error("Error restoring item:",o),f(o.message,"error")}}async function ni(e){var t;try{f("Downloading file from blockchain...","info");const o=await fetch(`/files/${e}/download-from-blockchain`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.content)||"","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"});if(!o.ok){const i=await o.json().catch(()=>({}));throw new Error(i.message||`Failed to download from blockchain: ${o.status}`)}const n=await o.json();if(n.success){f("File downloaded to Supabase storage successfully","success");const i=document.getElementById("filesContainer");(i==null?void 0:i.dataset.view)==="blockchain"?await loadBlockchainItems():await O()}else throw new Error(n.message||"Failed to download from blockchain")}catch(o){console.error("Error downloading from blockchain:",o),f(`Failed to download from blockchain: ${o.message}`,"error")}}function ii(e){var i,s;const t=te(e);if(!t){f(window.I18N.fileFolder.msgFileNotFound,"error");return}let o=t.ipfs_hash;if(!o&&t.blockchain_url){const r=t.blockchain_url.match(/\/ipfs\/([a-zA-Z0-9]+)/);r&&(o=r[1])}if(!o&&t.file_path&&(o=t.file_path.replace("ipfs://","")),!o||o.length<10){f(window.I18N.fileFolder.msgIpfsNotFound,"error");return}const n=`https://arweave.net/${o}`;console.log("Opening IPFS gateway URL:",n),window.open(n,"_blank"),f(((s=(i=window.I18N)==null?void 0:i.fileFolder)==null?void 0:s.viewOnIPFS)+"...","success")}async function si(e){const t=te(e);if(!t){f("File not found","error");return}const o=t.ipfs_hash||(t.file_path?t.file_path.replace("ipfs://",""):null);if(!o){f(window.I18N.fileFolder.msgIpfsNotFound,"error");return}try{await navigator.clipboard.writeText(o),f(window.I18N.fileFolder.msgIpfsCopied,"success")}catch{const i=document.createElement("textarea");i.value=o,document.body.appendChild(i),i.select(),document.execCommand("copy"),document.body.removeChild(i),f(window.I18N.fileFolder.msgIpfsCopied,"success")}}function ri(e){var s,r,a,l,u,p;const t=te(e);if(!t){f("File not found","error");return}const o=t.blockchain_metadata||{},n=t.ipfs_hash||(t.file_path?t.file_path.replace("ipfs://",""):"N/A"),i=`
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="blockchainInfoModal">
            <div class="bg-[#0D0E2F] p-6 rounded-lg max-w-md w-full mx-4 border border-[#4A4D6A]">
                <h3 class="text-lg font-semibold text-white mb-4">${((r=(s=window.I18N)==null?void 0:s.blockchain)==null?void 0:r.blockchainInfo)||((l=(a=window.I18N)==null?void 0:a.fileFolder)==null?void 0:l.blockchainInfo)||"Blockchain Information"}</h3>
                <div class="space-y-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-400">${window.I18N.fileFolder.fileName}:</span>
                        <span class="text-white">${B(t.file_name)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">${window.I18N.fileFolder.provider||"Provider"}:</span>
                        <span class="text-white capitalize">${o.provider||"Arweave"}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">${window.I18N.fileFolder.status||"Status"}:</span>
                        <span class="text-green-400">${o.pin_status||"Pinned"}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">${window.I18N.fileFolder.encrypted||"Encrypted"}:</span>
                        <span class="text-white">${o.encrypted?window.I18N.fileFolder.yes||"Yes":window.I18N.fileFolder.no||"No"}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">${window.I18N.fileFolder.redundancy||"Redundancy"}:</span>
                        <span class="text-white">${o.redundancy_level||3}x</span>
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
                    <button onclick="copyIPFSHash(${e}); document.getElementById('blockchainInfoModal').remove()" 
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        ${((p=(u=window.I18N)==null?void 0:u.fileFolder)==null?void 0:p.copyHash)||"Copy Hash"}
                    </button>
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",i)}async function ai(e){const t=te(e);if(!t){f("File not found","error");return}const o=t.ipfs_hash||(t.file_path?t.file_path.replace("ipfs://",""):null);if(!o){f(window.I18N.fileFolder.msgIpfsNotFound,"error");return}const n=t.blockchain_url||`https://arweave.net/${o}`,i={title:`SecureDocs: ${t.file_name}`,text:`Check out this file on IPFS: ${t.file_name}`,url:n};try{navigator.share?(await navigator.share(i),f(window.I18N.fileFolder.msgIpfsShared,"success")):(await navigator.clipboard.writeText(n),f(window.I18N.fileFolder.msgIpfsCopied,"success"))}catch(s){console.error("Error sharing:",s),f(window.I18N.fileFolder.msgShareLinkFailed,"error")}}async function _e(e){var t;try{console.debug("Force deleting item:",e);const o=await fetch(`/files/${e}/force-delete`,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.content)||""},credentials:"same-origin"}),n=await o.json();if(!o.ok)throw new Error(n.message||window.I18N.fileFolder.msgVecRestoreFailed);f(window.I18N.fileFolder.msgVecRestoreSuccess,"success"),ee()}catch(o){console.error("Error permanently deleting item:",o),f(o.message,"error")}}async function li(e){var t;try{console.log("[VECTOR REMOVAL] Starting removal for itemId:",e);const o=$(),n=`/files/${e}/remove-from-vector`;console.log("[VECTOR REMOVAL] Making request to:",n);const i=await fetch(n,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":o},credentials:"same-origin"});console.log("[VECTOR REMOVAL] Response status:",i.status,i.statusText);let s;try{s=await i.json(),console.log("[VECTOR REMOVAL] Response data:",s)}catch(r){throw console.error("[VECTOR REMOVAL] Failed to parse response JSON:",r),new Error("Invalid response from server")}if(!i.ok)throw console.error("[VECTOR REMOVAL] Request failed with status:",i.status,s),new Error(s.message||`HTTP ${i.status}: Failed to remove file from vector database`);console.log("[VECTOR REMOVAL] Success! Showing notification..."),window.notificationManager?window.notificationManager.showSuccess(window.I18N.fileFolder.vecRemovedTitle||"Vector Removed Successfully",window.I18N.fileFolder.msgVecRemoved||"File has been removed from AI vector database"):f(window.I18N.fileFolder.msgVecRemoved||"File has been removed from AI vector database","success");try{const r=(t=d.lastItems)==null?void 0:t.find(a=>a.id==e);r&&(console.log("[VECTOR REMOVAL] Updating local state for item:",r.file_name),r.is_vectorized=!1,r.vectorized_at=null)}catch(r){console.debug("[VECTOR REMOVAL] Local state update failed (non-fatal):",r)}console.log("[VECTOR REMOVAL] Reloading file list..."),O(d.lastMainSearch,d.currentPage,d.currentParentId)}catch(o){console.error("[VECTOR REMOVAL] Error removing file from vector database:",o),window.notificationManager?window.notificationManager.showError(window.I18N.fileFolder.vecRemovalFailedTitle||"Vector Removal Failed",o.message||window.I18N.fileFolder.msgVecRemovalFailed||"Failed to remove file from vector database"):f(o.message||window.I18N.fileFolder.msgVecRemovalFailed||"Failed to remove file from vector database","error")}}async function di(e){var t;try{const o=$(),n=`/files/${e}/add-to-vector`,i=await fetch(n,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":o},credentials:"same-origin"});let s;try{s=await i.json()}catch(r){throw console.error("Failed to parse vectorization response JSON:",r),new Error("Invalid response from server")}if(!i.ok)throw console.error("Vectorization request failed with status:",i.status,s),new Error(s.message||`HTTP ${i.status}: Failed to add file to vector database`);window.notificationManager?window.notificationManager.showSuccess(window.I18N.fileFolder.vecProcessingStartedTitle||"Vector Processing Started",s.message||window.I18N.fileFolder.msgVecStarted||"File sent for vectorization processing"):f(s.message||window.I18N.fileFolder.msgVecStarted||"File sent for vectorization processing","success");try{const r=(t=d.lastItems)==null?void 0:t.find(a=>a.id==e)}catch{}O(d.lastMainSearch,d.currentPage,d.currentParentId)}catch(o){console.error("Error adding file to vector database:",o),window.notificationManager?window.notificationManager.showError(window.I18N.fileFolder.vecProcessingFailedTitle||"Vector Processing Failed",o.message||window.I18N.fileFolder.msgVecProcessingFailed||"Failed to send file for vector processing"):f(o.message||window.I18N.fileFolder.msgVecProcessingFailed||"Failed to send file for vector processing","error")}}async function ci(e){var t;try{console.debug("Restoring vectors for item:",e);const o=await fetch(`/files/${e}/restore-vectors`,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.content)||""},credentials:"same-origin"}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n.message||"Failed to restore vectors");f("Vectors restored successfully.","success");const i=document.getElementById("filesContainer");(i==null?void 0:i.dataset.view)==="trash"&&typeof ee=="function"?await ee():O(d.lastMainSearch,d.currentPage,d.currentParentId)}catch(o){console.error("Error restoring vectors:",o),f(o.message,"error")}}function ui(e){const t=!!e.is_folder,o=e.file_name||e.name||"Untitled",n=t?0:parseInt(e.file_size||0,10),i=e.updated_at?new Date(e.updated_at).toLocaleDateString():"",s=document.createElement("div");s.className="file-item bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer",s.setAttribute("data-item-id",e.id),s.setAttribute("data-item-name",o),s.setAttribute("data-is-folder",t),t&&(s.setAttribute("data-folder-nav-id",e.id),s.setAttribute("data-folder-nav-name",o));const r=t?"📁":"📄";return s.innerHTML=`
        <div class="flex items-center truncate">
            <span class="text-2xl mr-4">${r}</span>
            <span class="truncate">${B(o)}</span>
        </div>
        <div class="text-sm text-gray-400 flex items-center">
            ${t?"":`<span>${re(n)}</span><span class="mx-2">|</span>`}
            <span>${B(i)}</span>
            <button class="delete-item-btn ml-4 text-red-500 hover:text-red-400" data-item-id="${e.id}" title="Move to trash" aria-label="Move to trash">🗑️</button>
        </div>
    `,s}function mi(){const e=document.getElementById("filesContainer");e&&(e.querySelectorAll(".delete-item-btn").forEach(t=>{t.addEventListener("click",o=>{o.stopPropagation();const n=o.currentTarget.dataset.itemId;window.confirm(window.I18N.fileFolder.confirmMoveTrash)&&(typeof be=="function"?be(n):window.__files&&window.__files.deleteItem&&window.__files.deleteItem(n))})}),e.querySelectorAll("[data-folder-nav-id]").forEach(t=>{t.addEventListener("click",o=>{const n=o.currentTarget.dataset.folderNavId,i=o.currentTarget.dataset.folderNavName;Q(n,i)})}))}function fi(e,t){var i;const o=document.getElementById("filesPagination");o==null||o.remove();const n=document.createElement("div");n.id="filesPagination",n.className="col-span-full flex justify-center gap-2 mt-4",(t.links||[]).forEach(s=>{const r=document.createElement("button");r.className=`px-3 py-1 rounded ${s.active?"bg-primary text-white":"bg-gray-700 text-gray-200"} ${s.url?"hover:bg-gray-600":"opacity-50 cursor-not-allowed"}`,r.innerText=s.label.replace(/&laquo;|&raquo;/g,"").trim(),s.url||(r.disabled=!0);const a=s.url?new URL(s.url,window.location.origin).searchParams.get("page"):null;a&&r.addEventListener("click",()=>{d.currentPage=parseInt(a),O(d.lastMainSearch,d.currentPage,d.currentParentId)}),n.appendChild(r)}),(i=e.parentElement)!=null&&i.appendChild(n)||e.appendChild(n)}async function O(e="",t=1,o=null,n,i,s){var l,u,p,w,v,F,N,A,h,x,S,C,b,E,y,k,T;const r=document.getElementById("filesContainer");if(!r){console.debug("Items container not found - skipping file loading");return}r.dataset.view="main",$e();const a=Date.now()+Math.random();d.currentRequestId=a;try{r.innerHTML=`<div class="p-4 text-center text-text-secondary col-span-full">${((u=(l=window.I18N)==null?void 0:l.fileFolder)==null?void 0:u.loading)||"Loading..."}</div>`;let D=`/files?page=${t}`;e&&(D+=`&q=${encodeURIComponent(e)}`),o!==null&&o!=="null"&&(D+=`&parent_id=${o}`);const X=await fetch(D,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":((p=document.querySelector('meta[name="csrf-token"]'))==null?void 0:p.content)||""},credentials:"same-origin"});if(d.currentRequestId!==a){console.debug("Ignoring outdated request response");return}if(!X.ok){const M=await X.json().catch(()=>({}));throw new Error(M.message||`HTTP error! Status: ${X.status}`)}const L=await X.json();if(d.currentRequestId!==a){console.debug("Ignoring outdated request response at render time");return}r.innerHTML="";const fe=typeof n=="function"?n:ui,P=typeof i=="function"?i:fi,ne=typeof s=="function"?s:mi,W=Array.isArray(L==null?void 0:L.data)?L.data:Array.isArray(L)?L:[];if(console.debug("Files API result sample:",W.slice(0,5).map(M=>({id:M.id,file_name:M.file_name,name:M.name,is_folder:M.is_folder}))),W.length===0){const M=e?`<div class="p-4 text-center text-text-secondary col-span-full">${((v=(w=window.I18N)==null?void 0:w.fileFolder)==null?void 0:v.searchResults)||"Search results for:"} <strong>"${e}"</strong></div>`:`<div class="p-4 text-center text-text-secondary col-span-full">${((N=(F=window.I18N)==null?void 0:F.fileFolder)==null?void 0:N.noFilesFound)||"No files or folders found."}</div>`;r.innerHTML=M,(L==null?void 0:L.last_page)>1&&P(r,L);return}if(e&&e.trim()!==""){const M=document.createElement("div");M.className="col-span-full mb-4 p-3 bg-[#2A2D47] rounded-lg flex items-center justify-between",M.innerHTML=`
            <div class="flex items-center gap-2 text-sm text-gray-300">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>${((h=(A=window.I18N)==null?void 0:A.fileFolder)==null?void 0:h.searchResults)||"Search results for:"} <strong>"${e}"</strong> (${W.length} ${W.length===1?((S=(x=window.I18N)==null?void 0:x.fileFolder)==null?void 0:S.item)||"item":((b=(C=window.I18N)==null?void 0:C.fileFolder)==null?void 0:b.items)||"items"})</span>
            </div>
            <button onclick="document.getElementById('mainSearchInput').value = ''; window.loadUserFiles('', 1, localStorage.getItem('currentParentId'));" 
                    class="text-xs px-3 py-1 bg-[#3C3F58] hover:bg-[#55597C] rounded-lg transition-colors">
                ${((y=(E=window.I18N)==null?void 0:E.fileFolder)==null?void 0:y.clearSearch)||"Clear Search"}
            </button>
        `,r.appendChild(M)}ye(W),(L==null?void 0:L.last_page)>1&&P(r,L)}catch(D){console.error("Error loading items:",D),r&&(r.innerHTML=`
                <div class="p-4 text-center text-text-secondary col-span-full">
                    <p class="mb-2">${((T=(k=window.I18N)==null?void 0:k.fileFolder)==null?void 0:T.errorLoading)||"Error loading items. Please try again."}</p>
                    <p class="text-xs text-red-500">${B(D.message||"")}</p>
                </div>
            `)}}async function pi(e){var t,o;try{const i=(await Promise.all(e.map(p=>fetch(`/files/${p}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin"}).then(w=>w.ok?w.json():Promise.reject("Failed to fetch item")).then(w=>w.data||w).catch(()=>null)))).filter(p=>p!==null);if(i.length===0){f(window.I18N.fileFolder.msgLoadSelectedFailed,"error");return}const s=document.createElement("div");s.className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4",s.innerHTML=`
            <div class="bg-[#1F2235] border border-[#4A4D6A] rounded-xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-white">${window.I18N.fileFolder.moveItems} ${i.length} ${i.length>1?window.I18N.fileFolder.items:window.I18N.fileFolder.item}</h3>
                        <button type="button" class="text-gray-400 hover:text-white" id="close-move-modal">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Selected items list -->
                    <div class="mb-4 bg-[#2A2D47] rounded-lg border border-[#4A4D6A] p-3">
                        <p class="text-xs text-gray-400 mb-2">${window.I18N.fileFolder.lblSelectedItemsList}</p>
                        <div class="max-h-32 overflow-y-auto">
                            ${i.map((p,w)=>`
                                <div class="text-sm text-gray-300 py-1 flex items-center gap-2">
                                    <svg class="w-4 h-4 ${p.is_folder?"text-blue-400":"text-gray-400"}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${p.is_folder?"M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z":"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"}"></path>
                                    </svg>
                                    <span class="truncate">${B(p.file_name)}</span>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <!-- Destination folder selection -->
                    <div class="mb-4">
                        <p class="text-sm text-gray-300 mb-3">${(o=(t=window.I18N)==null?void 0:t.fileFolder)==null?void 0:o.selectDestination}</p>
                        <div class="bg-[#2A2D47] rounded-lg border border-[#4A4D6A] max-h-64 overflow-y-auto" id="folder-list">
                            <div class="p-3 text-center text-gray-400">${window.I18N.fileFolder.lblLoadingFolders}</div>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="flex gap-3 justify-end">
                        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-[#4A4D6A] rounded-lg hover:bg-[#2A2D47] transition-colors" id="cancel-move">
                            ${window.I18N.fileFolder.cancel}
                        </button>
                        <button type="button" class="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" id="confirm-move" disabled>
                            ${window.I18N.fileFolder.move} ${i.length} ${i.length>1?window.I18N.fileFolder.items:window.I18N.fileFolder.item}
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(s),await vn(s,e,i);const r=s.querySelector("#close-move-modal"),a=s.querySelector("#cancel-move"),l=s.querySelector("#confirm-move"),u=()=>{s.remove()};r.addEventListener("click",u),a.addEventListener("click",u),s.addEventListener("click",p=>{p.target===s&&u()}),l.addEventListener("click",async()=>{const p=s.querySelector(".folder-item.selected"),w=p?p.dataset.folderId:null;try{l.disabled=!0,l.textContent=window.I18N.fileFolder.btnMoving,await bn(e,w),u(),window.loadUserFiles&&window.loadUserFiles(d.lastMainSearch,d.currentPage,d.currentParentId),U();const v=window.I18N.fileFolder.msgMoveSuccessMulti.replace(":count",i.length);f(v,"success")}catch(v){console.error("Batch move failed:",v),v.validationErrors&&v.validationErrors.length>0?wi(v.validationErrors,e,w):(f(v.message||"Failed to move items","error"),l.disabled=!1,l.textContent=`Move ${i.length} item${i.length>1?"s":""}`)}})}catch(n){console.error("Failed to show move modal:",n),f(n.message||window.I18N.fileFolder.msgMoveModalFailed,"error")}}function wi(e,t,o){const n=document.createElement("div");n.className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10001] flex items-center justify-center p-4";const i=e.filter(l=>l.error.includes("conflict")),s=e.filter(l=>!l.error.includes("conflict"));n.innerHTML=`
        <div class="bg-[#1F2235] border border-[#4A4D6A] rounded-xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-white">${window.I18N.fileFolder.conflictTitle}</h3>
                    <button type="button" class="text-gray-400 hover:text-white" id="close-conflict-modal">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="mb-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                    <p class="text-sm text-yellow-200">
                        ${window.I18N.fileFolder.conflictDesc.replace(":count",i.length)}
                        ${s.length>0?`<br>${window.I18N.fileFolder.conflictCannotMove.replace(":count",s.length)}`:""}
                    </p>
                </div>

                <!-- Conflict items -->
                <div class="mb-4 max-h-64 overflow-y-auto">
                    ${i.map((l,u)=>{var p;return`
                        <div class="mb-3 p-3 bg-[#2A2D47] rounded-lg border border-[#4A4D6A]">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm text-gray-300"><strong>${B(l.file_name)}</strong></span>
                                <span class="text-xs text-yellow-400">Name conflict</span>
                            </div>
                            <div class="text-xs text-gray-400 mb-2">${window.I18N.fileFolder.conflictExisting} ${B(((p=l.conflict_item)==null?void 0:p.file_name)||"Unknown")}</div>
                            <div class="flex gap-2">
                                <button class="conflict-skip text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors" data-item-id="${l.item_id}">
                                    ${window.I18N.fileFolder.skip}
                                </button>
                                <button class="conflict-rename text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors" data-item-id="${l.item_id}" data-file-name="${B(l.file_name)}">
                                    ${window.I18N.fileFolder.conflictRename}
                                </button>
                                <button class="conflict-replace text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors" data-item-id="${l.item_id}">
                                    ${window.I18N.fileFolder.conflictReplace}
                                </button>
                            </div>
                        </div>
                    `}).join("")}
                </div>

                <!-- Other errors -->
                ${s.length>0?`
                    <div class="mb-4 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                        <p class="text-sm text-red-200 mb-2">Items that cannot be moved:</p>
                        <ul class="text-xs text-red-300">
                            ${s.map(l=>`<li>• ${B(l.file_name||"Unknown")}: ${l.error}</li>`).join("")}
                        </ul>
                    </div>
                `:""}

                <!-- Buttons -->
                <div class="flex gap-3 justify-end">
                    <button type="button" class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-[#4A4D6A] rounded-lg hover:bg-[#2A2D47] transition-colors" id="cancel-conflict">
                        ${window.I18N.fileFolder.cancel}
                    </button>
                    <button type="button" class="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" id="proceed-conflict">
                        ${window.I18N.fileFolder.proceed}
                    </button>
                </div>
            </div>
        </div>
    `,document.body.appendChild(n);const r={};i.forEach(l=>{r[l.item_id]="skip"}),n.querySelectorAll(".conflict-skip").forEach(l=>{l.addEventListener("click",u=>{u.preventDefault();const p=l.dataset.itemId;r[p]="skip",Be(n,r)})}),n.querySelectorAll(".conflict-rename").forEach(l=>{l.addEventListener("click",u=>{u.preventDefault();const p=l.dataset.itemId,w=l.dataset.fileName,v=window.I18N.fileFolder.promptRename.replace(":name",w),F=prompt(v,`${w} (1)`);F&&F.trim()&&(r[p]={action:"rename",newName:F.trim()},Be(n,r))})}),n.querySelectorAll(".conflict-replace").forEach(l=>{l.addEventListener("click",u=>{u.preventDefault();const p=l.dataset.itemId;confirm("This will delete the existing file. Are you sure?")&&(r[p]="replace",Be(n,r))})});const a=()=>n.remove();n.querySelector("#close-conflict-modal").addEventListener("click",a),n.querySelector("#cancel-conflict").addEventListener("click",a),n.querySelector("#proceed-conflict").addEventListener("click",async()=>{try{n.querySelector("#proceed-conflict").disabled=!0,n.querySelector("#proceed-conflict").textContent=window.I18N.fileFolder.btnProcessing;const l=t.filter(u=>!r[u]||r[u]==="skip");if(l.length===0){f(window.I18N.fileFolder.msgNoItemsMove,"info"),a();return}await bn(l,o),a(),window.loadUserFiles&&window.loadUserFiles(d.lastMainSearch,d.currentPage,d.currentParentId),U(),f(`${l.length} item${l.length>1?"s":""} moved successfully`,"success")}catch(l){console.error("Conflict resolution move failed:",l),f(l.message||"Failed to move items","error"),n.querySelector("#proceed-conflict").disabled=!1,n.querySelector("#proceed-conflict").textContent="Proceed with Selected Options"}})}function Be(e,t){Object.entries(t).forEach(([o,n])=>{const i=e.querySelector(`.conflict-skip[data-item-id="${o}"]`),s=e.querySelector(`.conflict-rename[data-item-id="${o}"]`),r=e.querySelector(`.conflict-replace[data-item-id="${o}"]`);if([i,s,r].forEach(a=>{a&&a.classList.remove("ring-2","ring-green-500")}),n==="skip"&&i)i.classList.add("ring-2","ring-green-500");else if(n==="replace"&&r)r.classList.add("ring-2","ring-green-500");else if(typeof n=="object"&&n.action==="rename"&&s){s.classList.add("ring-2","ring-green-500");const a=window.I18N.fileFolder.lblRenameTo||'Rename to ":name"';s.textContent=a.replace(":name",n.newName)}})}async function gi(e){try{const t=await fetch(`/files/${e}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin"});if(!t.ok)throw new Error("Failed to get item details");const o=await t.json(),n=o.data||o,i=document.createElement("div");i.className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4",i.innerHTML=`
            <div class="bg-[#1F2235] border border-[#4A4D6A] rounded-xl max-w-md w-full shadow-2xl">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-white">${window.I18N.fileFolder.move} "${B(n.file_name||n.name)}"</h3>
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
        `,document.body.appendChild(i),await vn(i,e,n);const s=i.querySelector("#close-move-modal"),r=i.querySelector("#cancel-move"),a=i.querySelector("#confirm-move"),l=()=>{i.remove()};s.addEventListener("click",l),r.addEventListener("click",l),i.addEventListener("click",u=>{u.target===i&&l()}),a.addEventListener("click",async()=>{const u=i.querySelector(".folder-item.selected"),p=u?u.dataset.folderId:null;try{a.disabled=!0,a.textContent=window.I18N.fileFolder.btnMoving,await hi(e,p),l(),window.loadUserFiles&&window.loadUserFiles(d.lastMainSearch,d.currentPage,d.currentParentId),f(window.I18N.fileFolder.msgMoveSuccess,"success")}catch(w){console.error("Move failed:",w),f(w.message||window.I18N.fileFolder.msgMoveFailed,"error"),a.disabled=!1,a.textContent=window.I18N.fileFolder.moveHere}})}catch(t){console.error("Failed to show move modal:",t),f(t.message||window.I18N.fileFolder.msgMoveModalFailed,"error")}}async function vn(e,t,o=null){var i,s,r,a;const n=e.querySelector("#folder-list");try{const l=await fetch("/files?type=folders",{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin"});if(!l.ok)throw new Error("Failed to load folders");const u=await l.json(),p=Array.isArray(u==null?void 0:u.data)?u.data:Array.isArray(u)?u:[],w=Array.isArray(t)?t:[t],v=new Set,F=new Set;let N=[];Array.isArray(o)?N=o:o&&o.id&&(N=[o]),N.forEach(b=>{b&&b.id&&(v.add(b.id),b.file_name&&F.add(b.file_name))}),w.forEach(b=>v.add(b));const A=b=>{p.forEach(E=>{E.parent_id===b&&!v.has(E.id)&&(v.add(E.id),A(E.id))})};v.forEach(b=>{A(b)});const h=p.filter(b=>!v.has(b.id)&&!F.has(b.file_name));n.innerHTML="";const x={};h.forEach(b=>{const E=b.parent_id===null||b.parent_id===void 0?"null":b.parent_id;b._normalizedId=b.id,x[E]||(x[E]=[]),x[E].push(b)}),console.log("🌳 [TREE] Available folders:",h.length),console.log("🌳 [TREE] Folder tree structure:",x),Object.keys(x).forEach(b=>{console.log(`🌳 [TREE] Parent ${b} has ${x[b].length} children:`,x[b].map(E=>E.file_name))}),Object.keys(x).forEach(b=>{x[b].sort((E,y)=>(E.file_name||E.name).localeCompare(y.file_name||y.name))});const S=document.createElement("div");if(S.className="folder-item flex items-center p-3 hover:bg-[#3C3F58] cursor-pointer border-b border-[#4A4D6A]",S.dataset.folderId="null",S.style.paddingLeft="0.75rem",S.innerHTML=`
            <svg class="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            <span class="text-gray-200">${((s=(i=window.I18N)==null?void 0:i.fileFolder)==null?void 0:s.rootFolder)||"Root Folder"}</span>
        `,n.appendChild(S),((b,E=0)=>{const y=x[b]||[];y.forEach((k,T)=>{let D=x[k.id]&&x[k.id].length>0;const X=T===y.length-1;if(console.log(`🌳 [TREE] Checking folder "${k.file_name}" (ID: ${k.id}), hasChildren: ${D}, folderTree[${k.id}]:`,x[k.id]),k.id&&!D&&x[k.id]===void 0){const P=String(k.id);console.log(`🌳 [TREE] Trying string ID "${P}", found:`,x[P]),x[P]&&x[P].length>0&&(console.log(`🌳 [TREE] Type mismatch! Using string ID for folder "${k.file_name}"`),x[k.id]=x[P],D=!0)}const L=document.createElement("div");L.className="folder-item flex items-center hover:bg-[#3C3F58] cursor-pointer border-b border-[#4A4D6A] group",L.dataset.folderId=k.id,L.style.paddingLeft=`${.75+E*1.5}rem`;const fe=X?"":"border-l border-[#4A4D6A]";if(L.innerHTML=`
                    <div class="flex items-center w-full py-2">
                        ${D?`
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
                        <span class="text-gray-200 truncate">${B(k.file_name||k.name)}</span>
                    </div>
                `,n.appendChild(L),D){const P=L.querySelector(".folder-toggle");P.addEventListener("click",K=>{K.stopPropagation();const H=P.dataset.expanded==="true";P.dataset.expanded=!H;const J=P.querySelector("svg");J.style.transform=H?"rotate(0deg)":"rotate(90deg)";const R=L.nextElementSibling;R&&R.classList.contains("folder-children")&&(R.style.display=H?"none":"block")});const ne=document.createElement("div");ne.className="folder-children",ne.style.display="none",n.appendChild(ne);const W=n,M=ne,pe=M.appendChild.bind(M),we=[],ie=(K,H)=>{const J=x[K]||[];J.forEach((R,q)=>{const ae=x[R.id]&&x[R.id].length>0,le=q===J.length-1,_=document.createElement("div");if(_.className="folder-item flex items-center hover:bg-[#3C3F58] cursor-pointer border-b border-[#4A4D6A]",_.dataset.folderId=R.id,_.style.paddingLeft=`${.75+H*1.5}rem`,_.innerHTML=`
                                <div class="flex items-center w-full py-2">
                                    ${ae?`
                                        <button class="folder-toggle w-5 h-5 mr-1 flex items-center justify-center hover:bg-[#2A2D47] rounded transition-colors flex-shrink-0" data-folder-id="${R.id}">
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
                                    <span class="text-gray-200 truncate">${B(R.file_name||R.name)}</span>
                                </div>
                            `,M.appendChild(_),ae){const V=_.querySelector(".folder-toggle");V.addEventListener("click",de=>{de.stopPropagation();const Y=V.dataset.expanded==="true";V.dataset.expanded=!Y;const ce=V.querySelector("svg");ce.style.transform=Y?"rotate(0deg)":"rotate(90deg)";const Z=_.nextElementSibling;Z&&Z.classList.contains("folder-children")&&(Z.style.display=Y?"none":"block")});const z=document.createElement("div");z.className="folder-children",z.style.display="none",M.appendChild(z),G(R.id,H+1,z)}})},G=(K,H,J)=>{(x[K]||[]).forEach((q,ae)=>{const le=x[q.id]&&x[q.id].length>0,_=document.createElement("div");if(_.className="folder-item flex items-center hover:bg-[#3C3F58] cursor-pointer border-b border-[#4A4D6A]",_.dataset.folderId=q.id,_.style.paddingLeft=`${.75+H*1.5}rem`,_.innerHTML=`
                                <div class="flex items-center w-full py-2">
                                    ${le?`
                                        <button class="folder-toggle w-5 h-5 mr-1 flex items-center justify-center hover:bg-[#2A2D47] rounded transition-colors flex-shrink-0" data-folder-id="${q.id}">
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
                                    <span class="text-gray-200 truncate">${B(q.file_name||q.name)}</span>
                                </div>
                            `,J.appendChild(_),le){const V=_.querySelector(".folder-toggle");V.addEventListener("click",de=>{de.stopPropagation();const Y=V.dataset.expanded==="true";V.dataset.expanded=!Y;const ce=V.querySelector("svg");ce.style.transform=Y?"rotate(0deg)":"rotate(90deg)";const Z=_.nextElementSibling;Z&&Z.classList.contains("folder-children")&&(Z.style.display=Y?"none":"block")});const z=document.createElement("div");z.className="folder-children",z.style.display="none",J.appendChild(z),G(q.id,H+1,z)}})};ie(k.id,E+1)}})})("null",0),h.length===0){const b=document.createElement("div");b.className="p-3 text-center text-gray-400",b.textContent=((a=(r=window.I18N)==null?void 0:r.fileFolder)==null?void 0:a.noFolders)||"No folders available. You can only move to root folder.",n.appendChild(b)}n.addEventListener("click",b=>{if(b.target.nodeType!==1)return;const E=b.target.closest(".folder-item"),y=b.target.closest(".folder-toggle");if(E&&!y){n.querySelectorAll(".folder-item").forEach(T=>{T.classList.remove("selected","bg-blue-600")}),E.classList.add("selected","bg-blue-600");const k=e.querySelector("#confirm-move");k.disabled=!1}})}catch(l){console.error("Failed to load folders:",l),n.innerHTML=`
            <div class="p-3 text-center text-red-400">
                ${window.I18N.fileFolder.msgLoadFoldersFailed}
            </div>
        `}}async function hi(e,t){const o=await fetch(`/files/${e}/move`,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin",body:JSON.stringify({parent_id:t==="null"?null:parseInt(t)})});if(!o.ok){const n=await o.json().catch(()=>({}));throw new Error(n.message||`Failed to move item (${o.status})`)}return o.json()}async function bn(e,t){const o=await fetch("/files/move-batch",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin",body:JSON.stringify({item_ids:e,parent_id:t==="null"?null:parseInt(t)})});if(!o.ok){const n=await o.json().catch(()=>({}));if(n.validation_errors){const i=new Error(n.message||"Validation failed for some items");throw i.validationErrors=n.validation_errors,i}throw new Error(n.message||`Failed to move items (${o.status})`)}return o.json()}function vi(e){const t=document.getElementById("otpSecurityModal");t&&t.remove();const o=document.createElement("div");o.id="otpSecurityModal",o.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",o.innerHTML=`
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
    `,document.body.appendChild(o);const n=()=>o.remove();o.querySelector("#closeOtpModal").addEventListener("click",n),o.addEventListener("click",i=>{i.target===o&&n()}),bi(e)}async function bi(e){try{const o=await(await fetch("/file-otp/check-access",{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin"})).json();if(!o.success||!o.can_use_otp){const s=document.getElementById("otpSecurityContent");s&&(s.innerHTML=`
                    <div class="text-center py-6">
                        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L3.349 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-white mb-2">${window.I18N.fileFolder.msgEmailVerifyReq}</h3>
                        <p class="text-gray-400 text-sm mb-4">${o.message}</p>
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
                `);return}const i=await(await fetch(`/file-otp/status?file_type=regular&file_id=${e}`,{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin"})).json();if(i.success)yi(e,i);else throw new Error(i.message||"Failed to load OTP status")}catch(t){console.error("Failed to load OTP status:",t);const o=document.getElementById("otpSecurityContent");o&&(o.innerHTML=`
                <div class="text-center py-4">
                    <div class="text-red-400 mb-2">Failed to load OTP settings</div>
                    <button onclick="loadOtpStatus(${e})" class="text-[#f89c00] hover:text-[#e88900] text-sm">Try Again</button>
                </div>
            `)}}function yi(e,t){const o=document.getElementById("otpSecurityContent");if(!o)return;const n=t.otp_enabled;if(o.innerHTML=`
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
    `,document.getElementById("saveOtpSettings").addEventListener("click",()=>xi(e)),document.getElementById("closeOtpModal").addEventListener("click",()=>{const i=document.getElementById("otpSecurityModal");i&&i.remove()}),document.getElementById("cancelOtpModal").addEventListener("click",()=>{const i=document.getElementById("otpSecurityModal");i&&i.remove()}),n){const i=document.getElementById("deleteSharedLink");i&&i.addEventListener("click",()=>Ii(e))}n&&(document.getElementById("sendDisableOtp").addEventListener("click",()=>Fi(e)),document.getElementById("confirmDisableOtp").addEventListener("click",()=>ki(e)),document.getElementById("disableOtpCode").addEventListener("input",i=>{const s=document.getElementById("confirmDisableOtp");s.disabled=i.target.value.length!==6}))}async function xi(e){const t=document.getElementById("otpToggle"),o=document.getElementById("requireDownload"),n=document.getElementById("requirePreview"),i=document.getElementById("otpDuration"),s=t.checked;try{const r=s?"/file-otp/enable":"/file-otp/disable",a={file_type:"regular",file_id:parseInt(e)};s&&(a.require_otp_for_download=(o==null?void 0:o.checked)??!0,a.require_otp_for_preview=(n==null?void 0:n.checked)??!1,a.otp_valid_duration_minutes=parseInt((i==null?void 0:i.value)??10));const u=await(await fetch(r,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin",body:JSON.stringify(a)})).json();if(u.success){f(s?window.I18N.fileFolder.msgOtpEnabledSuccess:window.I18N.fileFolder.msgOtpDisabledSuccess,"success");const p=document.getElementById("otpSecurityModal");p&&p.remove(),window.loadUserFiles&&window.loadUserFiles(d.lastMainSearch,d.currentPage,d.currentParentId)}else throw new Error(u.message||window.I18N.fileFolder.msgOtpUpdateFailed||"Failed to update OTP settings")}catch(r){console.error("Failed to save OTP settings:",r),f((window.I18N.fileFolder.msgOtpUpdateFailed||"Failed to update OTP settings")+": "+r.message,"error")}}async function Ii(e){try{if(!window.confirm("Are you sure you want to delete the shared link for this file? This action cannot be undone."))return;const n=await(await fetch("/file-otp/delete-shared-link",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin",body:JSON.stringify({file_type:"regular",file_id:parseInt(e)})})).json();n.success?f("Shared link deleted successfully","success"):f(n.message||window.I18N.fileFolder.msgSharedLinkDeleteFailed,"error")}catch(t){console.error("Error deleting shared link:",t),f(window.I18N.fileFolder.msgSharedLinkDeleteFailed+": "+t.message,"error")}}async function Fi(e){try{const o=await(await fetch("/file-otp/send",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin",body:JSON.stringify({file_type:"regular",file_id:parseInt(e)})})).json();if(o.success)f(window.I18N.fileFolder.msgOtpSent,"success"),document.getElementById("disableOtpCode").disabled=!1,document.getElementById("sendDisableOtp").disabled=!0,document.getElementById("sendDisableOtp").textContent=window.I18N.fileFolder.msgOtpSent;else throw new Error(o.message||"Failed to send OTP")}catch(t){console.error("Failed to send disable OTP:",t),f("Failed to send OTP: "+t.message,"error")}}async function ki(e){const t=document.getElementById("disableOtpCode").value;if(t.length!==6){f("Please enter a valid 6-digit OTP code","error");return}try{const n=await(await fetch("/file-otp/disable",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin",body:JSON.stringify({file_type:"regular",file_id:parseInt(e),otp_code:t})})).json();if(n.success){f("OTP protection disabled successfully","success");const i=document.getElementById("otpSecurityModal");i&&i.remove(),window.loadUserFiles&&window.loadUserFiles(d.lastMainSearch,d.currentPage,d.currentParentId)}else throw new Error(n.message||window.I18N.fileFolder.msgOtpDisableFailed)}catch(o){console.error("Failed to disable OTP protection:",o),f((window.I18N.fileFolder.msgOtpDisableFailed||"Failed to disable OTP protection")+": "+o.message,"error")}}async function ve(e){try{const t=await fetch(`/files/${e}`,{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin"}),o=await t.json();if(t.status===403&&o.requires_otp)Ei(e,o.file_name,"preview");else if(o.success!==!1)window.location.href=`/files/${e}/preview`;else throw new Error(o.message||window.I18N.fileFolder.msgFileAccessFailed)}catch(t){console.error("Failed to check file access:",t),f(window.I18N.fileFolder.msgFileAccessFailed+": "+t.message,"error")}}function Ei(e,t,o){const n=document.getElementById("otpVerificationModal");n&&n.remove();const i=document.createElement("div");i.id="otpVerificationModal",i.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",i.innerHTML=`
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
    `,document.body.appendChild(i);const s=document.getElementById("otpVerificationCode"),r=document.getElementById("verifyOtpAccess"),a=document.getElementById("sendOtpForAccess"),l=document.getElementById("cancelOtpVerification");s.addEventListener("input",u=>{r.disabled=u.target.value.length!==6}),a.addEventListener("click",()=>an(e,a)),r.addEventListener("click",()=>Ni(e,o,i)),l.addEventListener("click",()=>i.remove()),an(e,a)}async function an(e,t){try{t.disabled=!0,t.textContent=window.I18N.fileFolder.sending;const n=await(await fetch("/file-otp/send",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin",body:JSON.stringify({file_type:"regular",file_id:parseInt(e)})})).json();if(n.success)f(window.I18N.fileFolder.msgOtpSent,"success"),t.textContent=window.I18N.fileFolder.otpSentCheck,t.className="text-green-400 text-sm";else throw new Error(n.message||"Failed to send OTP")}catch(o){console.error("Failed to send OTP:",o),f("Failed to send OTP: "+o.message,"error"),t.disabled=!1,t.textContent="Send OTP to Email"}}async function Ni(e,t,o){const n=document.getElementById("otpVerificationCode").value;if(n.length!==6){f("Please enter a valid 6-digit OTP code","error");return}try{const s=await(await fetch("/file-otp/verify",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin",body:JSON.stringify({file_type:"regular",file_id:parseInt(e),otp_code:n})})).json();if(s.success)f("OTP verified successfully","success"),o.remove(),t==="preview"&&(window.location.href=`/files/${e}/preview`);else throw new Error(s.message||window.I18N.fileFolder.msgOtpInvalid)}catch(i){console.error("Failed to verify OTP:",i),f(window.I18N.fileFolder.msgOtpVerifyFailed+": "+i.message,"error")}}async function $i(e){var t;try{console.log("🚀 Starting Arweave upload process for file:",e),f(window.I18N.fileFolder.msgArwValidating,"info"),console.log("📋 Running preflight validation..."),console.log("📍 Request URL: /arweave-upload/preflight-validation"),console.log("📍 File ID:",e),console.log("📍 CSRF Token:",$()?"✅ Present":"❌ Missing");const o=await fetch("/arweave-upload/preflight-validation",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":$(),"X-Requested-With":"XMLHttpRequest"},credentials:"same-origin",body:JSON.stringify({file_id:e})});if(console.log("📊 Response Status:",o.status,o.statusText),console.log("📊 Response Headers:",{"content-type":o.headers.get("content-type"),"x-request-id":o.headers.get("x-request-id")}),!o.ok){let r={};try{r=await o.json()}catch(a){console.error("❌ Failed to parse error response:",a),r={message:`HTTP ${o.status}: ${o.statusText}`}}throw console.error("❌ Validation response not OK:",{status:o.status,statusText:o.statusText,errorData:r}),new Error(r.message||`Validation failed (HTTP ${o.status})`)}const n=await o.json();if(!n.success){const r=((t=n.validation)==null?void 0:t.errors)||["Validation failed"];throw console.error("❌ Validation returned success: false",r),new Error(r[0]||"File validation failed")}console.log("✅ Preflight validation passed:",n);const i=n.upload_cost;if(console.log("💰 Upload cost:",i),!window.isWalletReady||!window.isWalletReady()){f('⚠️ Please initialize Bundlr wallet first using the "B" button in navigation',"warning");return}const s=window.getCurrentBalance();if(console.log("💳 Current Bundlr balance:",s,"MATIC"),s<i.matic){const r=(i.matic-s).toFixed(6);f(`❌ Insufficient balance. Need ${i.matic.toFixed(6)} MATIC but have ${s.toFixed(6)} MATIC. Short by ${r} MATIC.`,"error");return}if(console.log("✅ Sufficient balance for upload"),console.log("🎯 Opening Arweave modal..."),typeof window.openClientArweaveModal=="function")window.arweaveUploadContext={fileId:e,fileName:n.validation.file_info.name,fileSize:n.validation.file_info.size,fileSizeHuman:n.validation.file_info.size_human,uploadCost:i,validationData:n},console.log("📦 Stored upload context:",window.arweaveUploadContext),window.openClientArweaveModal(),setTimeout(()=>{Ai(window.arweaveUploadContext)},300);else throw new Error("Arweave modal is not available");f(`✅ ${window.I18N.fileFolder.msgArwReady} (${i.formatted})`,"success")}catch(o){console.error("❌ Failed to pre-populate Arweave modal:",o),f(window.I18N.fileFolder.msgArwAutoSelectFailed,"warning")}}function Ai(e){try{console.log("🔄 Updating modal with file info:",e);const t=document.getElementById("selectedFileInfo");t&&(t.textContent=`${e.fileName} (${e.fileSizeHuman})`);const o=document.getElementById("uploadCostDisplay");o&&(o.textContent=e.uploadCost.formatted);const n=document.getElementById("uploadFileName");n&&(n.textContent=e.fileName);const i=document.getElementById("uploadCostFinal");i&&(i.textContent=e.uploadCost.formatted),console.log("✅ Modal updated with file info")}catch(t){console.error("❌ Failed to update modal:",t)}}function Pe(e){const t=document.querySelector(`[data-item-id="${e}"]`);if(!t){f("File not found","error");return}const o=t.getAttribute("data-item-name")||"Unknown",n=t.getAttribute("data-is-folder")==="true",i=document.getElementById("renameModal");i&&i.remove();const s=document.createElement("div");s.id="renameModal",s.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",s.innerHTML=`
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
                    <div class="px-3 py-2 bg-[#2A2D47] text-gray-400 rounded-lg text-sm">${o}</div>
                </div>
                
                <div>
                    <label for="newFileName" class="block text-sm text-gray-300 mb-2">${window.I18N.fileFolder.newName}</label>
                    <input 
                        type="text" 
                        id="newFileName" 
                        class="w-full px-3 py-2 bg-[#2A2D47] text-white rounded-lg border border-[#3C3F58] focus:border-[#f89c00] focus:ring-1 focus:ring-[#f89c00] focus:outline-none"
                        value="${o}"
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
    `,document.body.appendChild(s);const r=s.querySelector("#newFileName"),a=s.querySelector("#confirmRename"),l=s.querySelector("#cancelRename"),u=s.querySelector("#closeRenameModal");if(r.focus(),!n&&o.includes(".")){const w=o.lastIndexOf(".");r.setSelectionRange(0,w)}else r.select();const p=()=>{s.remove()};u.addEventListener("click",p),l.addEventListener("click",p),s.addEventListener("click",w=>{w.target===s&&p()}),r.addEventListener("keydown",w=>{w.key==="Enter"&&(w.preventDefault(),a.click()),w.key==="Escape"&&p()}),a.addEventListener("click",async()=>{console.log("[RENAME] Confirm button clicked");const w=r.value.trim();if(console.log("[RENAME] New name:",w),!w){f(window.I18N.fileFolder.msgEnterValidName||"Please enter a valid name","error");return}if(w===o){f(window.I18N.fileFolder.msgNameSame||"Name is unchanged","warning");return}a.disabled=!0,a.textContent=window.I18N.fileFolder.btnRenaming;try{await window.renameItem(e,w),p()}catch(v){f(v.message,"error")}finally{a.disabled=!1,a.textContent=window.I18N.fileFolder.rename}})}async function Si(e,t){console.log("[RENAME] renameItem called with:",{fileId:e,newName:t});try{const o=await fetch(`/files/${e}/rename`,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin",body:JSON.stringify({new_name:t})});if(!o.ok){const i=await o.json();throw new Error(i.message||window.I18N.fileFolder.renameFailed)}const n=await o.json();if(n.success)f(n.message||window.I18N.fileFolder.renameSuccess,"success"),window.loadUserFiles&&window.loadUserFiles(d.lastMainSearch,d.currentPage,d.currentParentId);else throw new Error(n.message||window.I18N.fileFolder.renameFailed)}catch(o){throw console.error("Rename failed:",o),o}}async function Re(e){const t=te(e);if(!t){f("File not found","error");return}let o=null;try{const l=await(await fetch(`/share/file/${e}`,{method:"GET",headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin"})).json();l.success&&l.has_share&&(o=l.share)}catch(a){console.error("Failed to fetch existing share:",a)}const n=document.createElement("div");n.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",n.innerHTML=`
        <div class="bg-[#1F2235] rounded-lg shadow-xl max-w-md w-full p-6 border border-[#4A4D6A]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">${o?window.I18N.fileFolder.lblEditShareLink:window.I18N.fileFolder.lblCreateShareLink}</h3>
                <button type="button" class="text-gray-400 hover:text-gray-300" onclick="this.closest('.fixed').remove()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            ${o?`
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
                        <p class="font-medium text-white truncate">${B(t.file_name)}</p>
                        <p class="text-sm text-gray-400">${t.is_folder?window.I18N.fileFolder.folder||"Folder":window.I18N.fileFolder.file||"File"}</p>
                    </div>
                </div>
            </div>

            <div id="shareOptions" class="space-y-4">
                <div>
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" id="isOneTime" class="rounded border-[#4A4D6A] text-[#f89c00] focus:ring-[#f89c00] bg-[#2A2D47]" ${o!=null&&o.is_one_time?"checked":""}>
                        <span class="text-sm text-gray-300">${window.I18N.fileFolder.oneTimeDownload}</span>
                    </label>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">${window.I18N.fileFolder.expiresInDays}</label>
                    <select id="expiresIn" class="w-full border border-[#4A4D6A] bg-[#2A2D47] text-white rounded-md px-3 py-2 text-sm focus:ring-[#f89c00] focus:border-[#f89c00]">
                        <option value="" ${o!=null&&o.expires_at?"":"selected"}>${window.I18N.fileFolder.neverExpires}</option>
                        <option value="1" ${o!=null&&o.expires_at&&xe(o.expires_at)===1?"selected":""}>${window.I18N.fileFolder.lbl1Day}</option>
                        <option value="7" ${o!=null&&o.expires_at&&xe(o.expires_at)===7?"selected":""}>${window.I18N.fileFolder.lbl1Week}</option>
                        <option value="30" ${o!=null&&o.expires_at&&xe(o.expires_at)===30?"selected":""}>${window.I18N.fileFolder.lbl1Month}</option>
                        <option value="90" ${o!=null&&o.expires_at&&xe(o.expires_at)===90?"selected":""}>${window.I18N.fileFolder.lbl3Months}</option>
                    </select>
                </div>

                <div id="passwordSection">
                    <label class="flex items-center space-x-2 mb-2">
                        <input type="checkbox" id="passwordProtected" class="rounded border-[#4A4D6A] text-[#f89c00] focus:ring-[#f89c00] bg-[#2A2D47]" ${o!=null&&o.password_protected?"checked":""}>
                        <span class="text-sm text-gray-300">${window.I18N.fileFolder.passwordProtection}</span>
                        <span class="text-xs bg-[#f89c00] text-black px-2 py-1 rounded-full font-medium">${window.I18N.fileFolder.premium}</span>
                    </label>
                    
                    <input type="password" id="sharePassword" placeholder="${o!=null&&o.password_protected?window.I18N.fileFolder.phEnterNewPass:window.I18N.fileFolder.enterPassword}" 
                    class="w-full border border-[#4A4D6A] bg-[#2A2D47] text-white rounded-md px-3 py-2 text-sm focus:ring-[#f89c00] focus:border-[#f89c00] placeholder-gray-500 ${o!=null&&o.password_protected?"":"hidden"}">
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
                    ${o?window.I18N.fileFolder.lblUpdateShareLink:window.I18N.fileFolder.lblCreateShareLink}
                </button>
            </div>
        </div>
    `,document.body.appendChild(n);const i=n.querySelector("#passwordProtected"),s=n.querySelector("#sharePassword");i.addEventListener("change",function(){if(this.checked){if(!window.userIsPremium){alert(window.I18N.fileFolder.msgPassProtPremium),this.checked=!1;return}s.classList.remove("hidden"),s.focus()}else s.classList.add("hidden"),s.value=""});const r=n.querySelector("#createShareBtn");r.addEventListener("click",async function(){const a=n.querySelector("#isOneTime").checked,l=n.querySelector("#expiresIn").value,u=n.querySelector("#passwordProtected").checked,p=n.querySelector("#sharePassword").value,w=n.querySelector("#errorMessage"),v=n.querySelector("#errorText");if(u&&!p.trim()){v.textContent=window.I18N.fileFolder.msgEnterPassword,w.classList.remove("hidden");return}w.classList.add("hidden"),r.disabled=!0,r.textContent=o?window.I18N.fileFolder.lblUpdating:window.I18N.fileFolder.lblCreating;try{const N=await(await fetch("/share/create",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin",body:JSON.stringify({file_id:e,is_one_time:a,expires_in_days:l?parseInt(l):null,...u&&p?{password:p}:{}})})).json();N.success?(Bi({...N.share,is_one_time:!!a,password_protected:!!(u&&p&&p.trim())}),n.remove()):(N.requires_otp_disable?v.textContent=window.I18N.fileFolder.msgShareOtpError:N.requires_premium?v.textContent=window.I18N.fileFolder.msgPassProtPremium:v.textContent=N.message||window.I18N.fileFolder.msgLinkGenFailed||"Failed to create share link",w.classList.remove("hidden"))}catch(F){console.error("Share creation failed:",F),v.textContent=(window.I18N.fileFolder.msgLinkGenFailed||"Failed to create share link")+". "+(window.I18N.fileFolder.errorLoading||"Please try again."),w.classList.remove("hidden")}finally{r.disabled=!1,r.textContent=o?window.I18N.fileFolder.lblUpdateShareLink:window.I18N.fileFolder.lblCreateShareLink}}),n.addEventListener("click",function(a){a.target===n&&n.remove()})}function Bi(e){const t=document.createElement("div");t.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";const o=!!(e&&(e.is_one_time===!0||e.is_one_time===1||e.is_one_time==="1"||e.is_one_time==="true")),n=!!(e&&(e.password_protected===!0||e.password_protected===1||e.password_protected==="1"||e.password_protected==="true"));t.innerHTML=`
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
                        <input type="text" id="shareUrl" value="${e.url}" readonly
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
                    <span class="font-medium text-white">${e.type==="folder"?window.I18N.fileFolder.folder:window.I18N.fileFolder.file}</span>
                </div>
                ${o?`<div class="flex justify-between"><span>${window.I18N.fileFolder.access}:</span><span class="font-medium text-[#f89c00]">${window.I18N.fileFolder.oneTimeOnly}</span></div>`:""}
                ${n?`<div class="flex justify-between"><span>${window.I18N.fileFolder.protection}:</span><span class="font-medium text-[#f89c00]">${window.I18N.fileFolder.passwordProtected}</span></div>`:""}
                ${e.expires_at?`<div class="flex justify-between"><span>${window.I18N.fileFolder.expires}:</span><span class="font-medium text-white">${new Date(e.expires_at).toLocaleDateString()}</span></div>`:""}
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
    `,document.body.appendChild(t);const i=t.querySelector("#copyUrlBtn"),s=t.querySelector("#shareUrl");i.addEventListener("click",async function(){try{await navigator.clipboard.writeText(s.value),i.textContent=window.I18N.fileFolder.copied,i.classList.remove("text-blue-600","bg-blue-50","border-blue-200","hover:bg-blue-100"),i.classList.add("text-green-600","bg-green-50","border-green-200"),setTimeout(()=>{i.textContent=window.I18N.fileFolder.copy,i.classList.remove("text-green-600","bg-green-50","border-green-200"),i.classList.add("text-blue-600","bg-blue-50","border-blue-200","hover:bg-blue-100")},2e3)}catch{s.select(),document.execCommand("copy"),i.textContent=window.I18N.fileFolder.copied}}),t.querySelector("#openLinkBtn").addEventListener("click",function(){window.open(e.url,"_blank")}),t.addEventListener("click",function(a){a.target===t&&t.remove()})}function ln(e){window.sharedFilesCurrentData=e,window.sharedFilesState||(window.sharedFilesState={selectedItems:new Set,lastSelectedIndex:-1,currentView:localStorage.getItem("sharedFilesLayout")||"list"}),Li(e,window.sharedFilesState.currentView)}function Li(e,t){const o=document.getElementById("filesContainer");if(o){if(o.dataset.view="shared",$e(),e.length===0){o.innerHTML=`
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
        `;return}Ci(e),Mi(o)}}function Ci(e){const t=document.getElementById("filesContainer");if(!t)return;const o=e.map(n=>{const i=n.copied_file,r=n.original_share.user,a=i.file_size?re(parseInt(i.file_size,10)):"",l=new Date(n.copied_at).toLocaleDateString();return`
            <tr class="file-row hover:bg-[#2A2D47] border-b border-[#4A4D6A] cursor-pointer" 
                data-item-id="${i.id}" data-file-id="${i.id}" data-is-folder="${i.is_folder}">
                <td class="px-4 py-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 flex items-center justify-center">
                            ${Pi(i.file_name,i.is_folder)}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-medium text-white truncate">${B(i.file_name)}</div>
                            <div class="text-xs text-gray-400">
                                ${window.I18N.fileFolder.sharedBy} ${B(r.name)} • ${a}
                            </div>
                        </div>
                    </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-300 text-right">
                    <div class="flex items-center justify-end space-x-2">
                        <span>${l}</span>
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
                        <p class="text-sm text-gray-400">${e.length} ${window.I18N.fileFolder.lblFiles}</p>
                    </div>
                </div>
            </div>
            
            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="w-full">
                    <tbody class="divide-y divide-[#4A4D6A]">
                        ${o}
                    </tbody>
                </table>
            </div>
        </div>
    `}function Mi(e){window.sharedFilesState||(window.sharedFilesState={selectedItems:new Set,lastSelectedIndex:-1,currentView:"list"}),e.querySelectorAll(".file-row").forEach((n,i)=>{n.addEventListener("click",function(s){s.target.closest(".actions-menu-btn")||(s.preventDefault(),s.stopPropagation())})}),e.querySelectorAll(".actions-menu-btn").forEach(n=>{n.addEventListener("click",function(i){i.stopPropagation();const s=this.dataset.itemId;Ti(i,s,e)})})}function Ti(e,t,o){var l;const n=o.querySelector(`[data-file-id="${t}"]`);(l=n==null?void 0:n.querySelector(".text-white.truncate"))!=null&&l.textContent;const i=(n==null?void 0:n.dataset.isFolder)==="true",s=document.createElement("div");s.className="fixed bg-white rounded-lg shadow-lg z-50 py-1 min-w-[200px]",s.style.top=e.clientY+5+"px",s.style.left=e.clientX-100+"px",s.innerHTML=`
        <button class="copy-btn w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-gray-800" data-file-id="${t}">
            <span>📋</span><span>${window.I18N.fileFolder.btnCopyToFiles||"Copy to My Files"}</span>
        </button>
        ${i?"":`
            <button class="download-btn w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-gray-800" data-file-id="${t}">
                <span>⬇️</span><span>${window.I18N.fileFolder.download}</span>
            </button>
        `}
    `,document.body.appendChild(s);const r=s.querySelector(".copy-btn"),a=s.querySelector(".download-btn");r&&r.addEventListener("click",async u=>{u.preventDefault(),u.stopPropagation(),s.remove(),await Di(t)}),a&&a.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),s.remove(),_i(t)}),setTimeout(()=>{document.addEventListener("click",function u(p){s.contains(p.target)||(s.remove(),document.removeEventListener("click",u))})},0)}async function Di(e){var t;try{const o="copy-loading-"+e,n=document.createElement("div");n.id=o,n.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",n.innerHTML=`
            <div class="bg-white rounded-lg p-6 flex flex-col items-center space-y-3">
                <div class="animate-spin">
                    <svg class="w-8 h-8 text-[#f89c00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                </div>
                <p class="text-gray-800 font-medium">${window.I18N.fileFolder.msgCopying||"Copying..."}</p>
            </div>
        `,document.body.appendChild(n);const i=await fetch(`/api/shared-files/${e}/copy`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":((t=document.querySelector('meta[name="csrf-token"]'))==null?void 0:t.getAttribute("content"))||"","X-Requested-With":"XMLHttpRequest"},credentials:"same-origin"}),s=document.getElementById(o);if(s&&s.remove(),!i.ok){const a=await i.json();throw new Error(a.message||"Failed to copy file")}const r=await i.json();r.success?(f("✅ "+(window.I18N.fileFolder.msgCopySuccess||"File copied!"),"success"),setTimeout(()=>{O()},1e3)):f("❌ "+(r.message||"Failed to copy file"),"error")}catch(o){console.error("Error copying file:",o),f("❌ Error: "+o.message,"error");const n=document.getElementById("copy-loading-"+e);n&&n.remove()}}function _i(e){window.location.href=`/api/shared-files/${e}/download`}function Pi(e,t){var n;if(t)return`
            <svg class="w-6 h-6 text-[#f89c00]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
            </svg>
        `;const o=((n=e.split(".").pop())==null?void 0:n.toLowerCase())||"";return["doc","docx","txt","rtf"].includes(o)?`
            <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
        `:["xls","xlsx","csv"].includes(o)?`
            <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
        `:o==="pdf"?`
            <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
        `:["jpg","jpeg","png","gif","bmp","svg","webp"].includes(o)?`
            <svg class="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
            </svg>
        `:`
        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
    `}function Ri(){const e=document.getElementById("filesContainer");e&&(e.innerHTML=`
        <div class="bg-[#1F2235] rounded-lg border border-[#4A4D6A] overflow-hidden">
            <div class="flex items-center justify-center py-16">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f89c00]"></div>
                <span class="ml-3 text-gray-300">Loading shared files...</span>
            </div>
        </div>
    `)}function ji(){var o,n;const e=Array.from(d.selectedItems);if(e.length===0){f("No items selected","error");return}if(e.length>1){f(((n=(o=window.I18N)==null?void 0:o.fileFolder)==null?void 0:n.msgMoveLimit)||"Please select only one item","error");return}const t=e[0];Re(t)}function Oi(){var t,o,n,i;const e=Array.from(d.selectedItems);if(e.length===0){f("No items selected","error");return}e.forEach(s=>{const r=te(s);r&&Hi(s,r.file_name)}),e.length>1&&f(`${((o=(t=window.I18N)==null?void 0:t.fileFolder)==null?void 0:o.download)||"Downloading"} ${e.length} ${((i=(n=window.I18N)==null?void 0:n.fileFolder)==null?void 0:i.items)||"files"}...`,"success")}async function Hi(e,t){var o,n;try{const i=await fetch(`/files/${e}/download`,{method:"GET",headers:{Accept:"application/octet-stream","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":$()},credentials:"same-origin"});if(!i.ok)throw new Error("Download failed");const s=await i.blob(),r=window.URL.createObjectURL(s),a=document.createElement("a");a.style.display="none",a.href=r,a.download=t||"download",document.body.appendChild(a),a.click(),window.URL.revokeObjectURL(r),document.body.removeChild(a)}catch(i){console.error("Download failed:",i),f(`${((n=(o=window.I18N)==null?void 0:o.fileFolder)==null?void 0:n.errorLoading)||"Failed"} ${t}`,"error")}}function xe(e){if(!e)return null;const n=new Date(e)-new Date;return Math.ceil(n/(1e3*60*60*24))}window.showRenameModal=Pe;window.showShareModal=Re;window.renameItem=Si;window.loadSharedFiles=gn;const zi=Object.freeze(Object.defineProperty({__proto__:null,closeAllActionsMenus:oe,hideTrashBanner:$e,initializeFileFolderManagement:Jn,loadSharedFiles:gn,loadTrashItems:ee,loadUserFiles:O,renderFiles:ye},Symbol.toStringTag,{value:"Module"}));export{ee as a,gn as b,Jn as c,Vi as d,B as e,re as f,Me as g,$e as h,qi as i,zi as j,O as l,f as s,se as u};
