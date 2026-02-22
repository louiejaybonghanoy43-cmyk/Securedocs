import{F as c}from"./file-encryption-BFlBmmO2.js";class a{constructor(){this.encryptionService=new c,this.currentFile=null,this.decryptionData=null}init(){return this.encryptionService.isSupported()?(this.setupEventListeners(),console.log("✅ Encrypted file access system initialized"),!0):(console.error("❌ Web Crypto API not supported"),!1)}setupEventListeners(){document.addEventListener("click",s=>{if(s.target.matches("[data-encrypted-file]")){s.preventDefault();const t=s.target.dataset.encryptedFile,e=s.target.dataset.fileName||"Unknown File";this.requestFileAccess(t,e)}})}async requestFileAccess(s,t){try{console.log("🔐 Requesting access to encrypted file:",t);const e=await this.showPasswordModal(t);if(!e){console.log("❌ Access cancelled by user");return}const o=await this.verifyPassword(s,e);if(!o.success)throw new Error("Invalid password");await this.downloadAndDecryptFile(o.decryption_data,e)}catch(e){console.error("❌ File access failed:",e),this.showError(e.message)}}showPasswordModal(s){return new Promise(t=>{const e=document.createElement("div");e.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",e.innerHTML=`
                <div class="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
                    <div class="flex items-center mb-4">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            🔐
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold">Protected File</h3>
                            <p class="text-sm text-gray-600">${s}</p>
                        </div>
                    </div>
                    
                    <p class="text-sm text-gray-700 mb-4">
                        This file is encrypted. Please enter the password to access it.
                    </p>
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="fileAccessPassword" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter file password"
                            autocomplete="off"
                        >
                        <div id="passwordError" class="text-red-500 text-sm mt-1 hidden"></div>
                    </div>
                    
                    <div class="flex space-x-3">
                        <button id="accessFileBtn" class="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
                            🔓 Access File
                        </button>
                        <button id="cancelAccessBtn" class="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Cancel
                        </button>
                    </div>
                </div>
            `,document.body.appendChild(e);const o=e.querySelector("#fileAccessPassword"),i=e.querySelector("#accessFileBtn"),r=e.querySelector("#cancelAccessBtn"),d=e.querySelector("#passwordError");o.focus(),o.addEventListener("keypress",n=>{n.key==="Enter"&&i.click()}),i.addEventListener("click",()=>{const n=o.value.trim();if(!n){this.showPasswordError(d,"Please enter a password");return}document.body.removeChild(e),t(n)}),r.addEventListener("click",()=>{document.body.removeChild(e),t(null)}),e.addEventListener("click",n=>{n.target===e&&(document.body.removeChild(e),t(null))})})}showPasswordError(s,t){s.textContent=t,s.classList.remove("hidden"),setTimeout(()=>{s.classList.add("hidden")},3e3)}async verifyPassword(s,t){try{const e=await fetch(`/arweave-client/files/${s}/verify-access`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').content},body:JSON.stringify({password:t})}),o=await e.json();if(!e.ok)throw new Error(o.message||"Password verification failed");return o}catch(e){throw console.error("❌ Password verification failed:",e),e}}async downloadAndDecryptFile(s,t){try{console.log("📥 Downloading encrypted file from Arweave..."),this.showLoadingModal("Downloading and decrypting file...");const e=await fetch(s.url);if(!e.ok)throw new Error("Failed to download file from Arweave");const o=new Uint8Array(await e.arrayBuffer());console.log("🔓 Decrypting file...");const i=await this.encryptionService.decryptFile(o,t,s.salt,s.iv),r=this.encryptionService.createDownloadBlob(i);this.triggerDownload(r,s.file_name),console.log("✅ File decrypted and downloaded successfully"),this.hideLoadingModal(),this.showSuccess("File decrypted and downloaded successfully!")}catch(e){throw console.error("❌ Download/decryption failed:",e),this.hideLoadingModal(),e}}showLoadingModal(s){const t=document.createElement("div");t.id="decryptionLoadingModal",t.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",t.innerHTML=`
            <div class="bg-white rounded-lg p-6 max-w-sm mx-4">
                <div class="text-center">
                    <div class="animate-spin text-4xl mb-4">⏳</div>
                    <p class="text-gray-700">${s}</p>
                </div>
            </div>
        `,document.body.appendChild(t)}hideLoadingModal(){const s=document.getElementById("decryptionLoadingModal");s&&document.body.removeChild(s)}triggerDownload(s,t){const e=URL.createObjectURL(s),o=document.createElement("a");o.href=e,o.download=t,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(e)}showSuccess(s){const t=document.createElement("div");t.className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50",t.innerHTML=`
            <div class="flex items-center">
                <span class="mr-2">✅</span>
                <span>${s}</span>
            </div>
        `,document.body.appendChild(t),setTimeout(()=>{document.body.removeChild(t)},3e3)}showError(s){const t=document.createElement("div");t.className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50",t.innerHTML=`
            <div class="flex items-center">
                <span class="mr-2">❌</span>
                <span>${s}</span>
            </div>
        `,document.body.appendChild(t),setTimeout(()=>{document.body.removeChild(t)},5e3)}}window.EncryptedFileAccess=a;
