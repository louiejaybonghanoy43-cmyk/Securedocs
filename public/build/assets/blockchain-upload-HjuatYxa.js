class r{constructor(){this.init()}init(){this.bindEvents(),this.loadStorageInfo()}bindEvents(){document.addEventListener("click",t=>{if(t.target.matches("[data-blockchain-upload]")){const e=parseInt(t.target.dataset.blockchainUpload);this.showUploadModal(e)}}),document.getElementById("bulkBlockchainUpload")}async loadStorageInfo(){try{this.storageInfo={success:!0,requirements:{max_file_size:100*1024*1024,supported_types:["pdf","doc","docx","txt","jpg","png"],max_files_per_user:1e3},current_stats:{total_files:0,total_size:0},eligible_files_count:0,user_premium:!0},this.renderStorageInfo()}catch{}}updateStorageDisplay(t){const e=document.getElementById("blockchainStorageInfo");if(!e)return;const i=t.requirements,s=t.current_stats;e.innerHTML=`
            <div class="bg-[#1a1a2e] rounded-lg p-4 border border-[#333]">
                <h3 class="text-white font-medium mb-3 flex items-center">
                    <span class="mr-2">🔗</span>
                    Blockchain Storage
                </h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div class="text-gray-400">Provider</div>
                        <div class="text-white">${i.provider||"Not configured"}</div>
                    </div>
                    <div>
                        <div class="text-gray-400">Max File Size</div>
                        <div class="text-white">${i.max_file_size_human||"N/A"}</div>
                    </div>
                    <div>
                        <div class="text-gray-400">Files Stored</div>
                        <div class="text-white">${s.total_blockchain_files||0}</div>
                    </div>
                    <div>
                        <div class="text-gray-400">Eligible Files</div>
                        <div class="text-white">${t.eligible_files_count||0}</div>
                    </div>
                </div>
                ${t.user_premium?"":`
                    <div class="mt-3 p-3 bg-yellow-900/30 border border-yellow-600 rounded text-yellow-300 text-xs">
                        Premium subscription required for blockchain storage
                    </div>
                `}
            </div>
        `}async showUploadModal(t){const e=await this.runPreflightValidation(t),i=this.createUploadModal(t,e);document.body.appendChild(i),setTimeout(()=>{i.classList.remove("opacity-0","scale-95"),i.classList.add("opacity-100","scale-100")},10)}async runPreflightValidation(t,e=null){try{const i=new FormData;return i.append("file_id",t),e&&i.append("provider",e),await(await fetch("/blockchain/preflight-validation",{method:"POST",body:i,headers:{"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content"),"X-Requested-With":"XMLHttpRequest",Accept:"application/json"},credentials:"include"})).json()}catch(i){return console.error("Preflight validation failed:",i),{success:!1,validation:{errors:["Network error during validation"]}}}}createUploadModal(t,e){const i=document.createElement("div");return i.className="fixed inset-0 z-50 flex items-center justify-center opacity-0 scale-95 transition-all duration-200",i.innerHTML=`
            <div class="fixed inset-0 bg-black bg-opacity-50" onclick="this.parentElement.remove()"></div>
            <div class="bg-[#0D0E2F] rounded-lg shadow-xl w-full max-w-lg p-6 relative z-10 text-white border border-[#333]">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-medium flex items-center">
                        <span class="mr-2">🔗</span>
                        Upload to Blockchain
                    </h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white text-2xl">
                        &times;
                    </button>
                </div>

                <div class="space-y-4">
                    ${this.renderValidationResults(e)}
                    ${this.renderFileInfo(e)}
                    ${this.renderProviderInfo(e)}
                    ${this.renderUploadActions(t,e)}
                </div>
            </div>
        `,i}renderValidationResults(t){if(!t.validation)return"";const{errors:e,warnings:i}=t.validation;let s="";return e&&e.length>0&&(s+=`
                <div class="p-3 bg-red-900/30 border border-red-600 rounded">
                    <div class="font-medium text-red-300 mb-2">❌ Upload Blocked</div>
                    <ul class="text-sm text-red-200 space-y-1">
                        ${e.map(o=>`<li>• ${o}</li>`).join("")}
                    </ul>
                </div>
            `),i&&i.length>0&&(s+=`
                <div class="p-3 bg-yellow-900/30 border border-yellow-600 rounded">
                    <div class="font-medium text-yellow-300 mb-2">⚠️ Warnings</div>
                    <ul class="text-sm text-yellow-200 space-y-1">
                        ${i.map(o=>`<li>• ${o}</li>`).join("")}
                    </ul>
                </div>
            `),t.success&&(s+=`
                <div class="p-3 bg-green-900/30 border border-green-600 rounded">
                    <div class="font-medium text-green-300">✅ Ready for Upload</div>
                    <div class="text-sm text-green-200 mt-1">All validation checks passed</div>
                </div>
            `),s}renderFileInfo(t){var i;const e=(i=t.validation)==null?void 0:i.file_info;return e?`
            <div class="bg-[#1a1a2e] rounded-lg p-4 border border-[#333]">
                <div class="font-medium mb-2">File Information</div>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div class="text-gray-400">Size:</div>
                    <div>${e.size_human}</div>
                    <div class="text-gray-400">Type:</div>
                    <div>${e.type||"Unknown"}</div>
                    <div class="text-gray-400">Extension:</div>
                    <div>.${e.extension||"unknown"}</div>
                </div>
            </div>
        `:""}renderProviderInfo(t){const e=t.provider_info;return e?`
            <div class="bg-[#1a1a2e] rounded-lg p-4 border border-[#333]">
                <div class="font-medium mb-2">Provider Information</div>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div class="text-gray-400">Provider:</div>
                    <div>${e.name}</div>
                    <div class="text-gray-400">Max Size:</div>
                    <div>${e.max_file_size_human}</div>
                </div>
            </div>
        `:""}renderUploadActions(t,e){var o,a;const i=e.success,s=((a=(o=e.validation)==null?void 0:o.warnings)==null?void 0:a.length)>0;return`
            <div class="flex justify-end space-x-3 pt-4 border-t border-[#333]">
                <button onclick="this.closest('.fixed').remove()" 
                        class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                    Cancel
                </button>
                <button onclick="blockchainUpload.uploadFile(${t}, ${s})" 
                        class="px-4 py-2 ${i?"bg-blue-600 hover:bg-blue-700":"bg-gray-500 cursor-not-allowed"} text-white rounded transition-colors"
                        ${i?"":"disabled"}>
                    ${s?"Upload Anyway":"Upload to Blockchain"}
                </button>
            </div>
        `}async uploadFile(t,e=!1){const i=document.querySelector(".fixed.inset-0.z-50"),s=i.querySelector('button[onclick*="uploadFile"]');s.disabled=!0,s.textContent="Uploading...",s.className=s.className.replace("bg-blue-600","bg-gray-500");try{const o=new FormData;o.append("file_id",t),e&&o.append("force","1");const d=await(await fetch("/blockchain/upload-existing",{method:"POST",body:o,headers:{"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content"),"X-Requested-With":"XMLHttpRequest",Accept:"application/json"},credentials:"include"})).json();d.success?(this.showSuccessMessage(d),i.remove(),this.refreshFileList(),this.loadStorageInfo()):(this.showErrorMessage(d.message||"Upload failed"),s.disabled=!1,s.textContent="Upload to Blockchain",s.className=s.className.replace("bg-gray-500","bg-blue-600"))}catch(o){console.error("Upload failed:",o),this.showErrorMessage("Network error during upload"),s.disabled=!1,s.textContent="Upload to Blockchain",s.className=s.className.replace("bg-gray-500","bg-blue-600")}}showSuccessMessage(t){const e=document.createElement("div");e.className="fixed top-4 right-4 z-50 bg-green-600 text-white p-4 rounded-lg shadow-lg",e.innerHTML=`
            <div class="flex items-center">
                <span class="mr-2">✅</span>
                <div>
                    <div class="font-medium">Upload Successful!</div>
                    <div class="text-sm opacity-90">IPFS Hash: ${t.ipfs_hash}</div>
                </div>
            </div>
        `,document.body.appendChild(e),setTimeout(()=>e.remove(),5e3)}showErrorMessage(t){const e=document.createElement("div");e.className="fixed top-4 right-4 z-50 bg-red-600 text-white p-4 rounded-lg shadow-lg",e.innerHTML=`
            <div class="flex items-center">
                <span class="mr-2">❌</span>
                <div>
                    <div class="font-medium">Upload Failed</div>
                    <div class="text-sm opacity-90">${t}</div>
                </div>
            </div>
        `,document.body.appendChild(e),setTimeout(()=>e.remove(),5e3)}refreshFileList(){window.fileManager&&window.fileManager.loadFiles&&window.fileManager.loadFiles()}showBulkUploadModal(){alert("Bulk upload feature coming soon!")}}document.addEventListener("DOMContentLoaded",()=>{window.blockchainUpload=new r});
