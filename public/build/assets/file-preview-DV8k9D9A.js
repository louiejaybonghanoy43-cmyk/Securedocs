document.addEventListener("DOMContentLoaded",()=>{k()});let n=null,d=null;async function k(){const e=window.location.pathname.split("/")[2];if(!e||isNaN(e)){w("No file ID provided");return}try{await C(e),O()}catch(o){console.error("Error initializing preview:",o),w("Failed to load file preview")}}async function C(t){try{const e=await fetch(`/files/${t}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}});if(!e.ok)throw new Error("Failed to fetch file data");n=await e.json(),T(),await F()}catch(e){console.error("Error loading file data:",e),w("Failed to load file information")}}function T(){var l,a,u,v;if(!n)return;const t=((l=window.I18N)==null?void 0:l.fpUnknown)||"Unknown...",e=((a=window.I18N)==null?void 0:a.fpUnknownFile)||"Unknown File",o=((u=window.I18N)==null?void 0:u.fpUnknownType)||"Unknown Type";document.getElementById("fileName").textContent=n.file_name||e,document.getElementById("fileSize").textContent=I(n.file_size||0),document.getElementById("fileType").textContent=n.file_type||o,document.getElementById("fileModified").textContent=R(n.updated_at),document.getElementById("fileOwner").textContent=((v=n.user)==null?void 0:v.name)||t;const i=document.getElementById("fileInfo"),s=I(n.file_size||0),r=n.file_type||o;i.textContent=`${s} • ${r}`}async function F(){var s;if(!n||!n.file_path){p();return}B();const t=(n.file_type||"").toLowerCase(),e=n.mime_type||"",o=n.file_name||"",i=((s=o.split(".").pop())==null?void 0:s.toLowerCase())||"";try{d=await U(n.file_path),console.log("Generated file URL:",d)}catch(r){console.error("Error getting file URL:",r),p();return}if(console.log("File type detection:",{fileName:o,fileType:t,mimeType:e,fileExtension:i,currentFileData:n}),i==="docx"&&(t==="unknown"||t===""||!t)){console.log("Forcing document preview for .docx file"),E();return}g(i,e)||g(t,e)?(console.log("Showing image preview"),S()):f(i,e)||f(t,e)?(console.log("Showing PDF preview"),D()):y(i,e)||y(t,e)?(console.log("Showing video preview"),M()):h(i,e)||h(t,e)?(console.log("Showing audio preview"),_()):x(i,e)||x(t,e)?(console.log("Showing text preview"),z()):b(o,i)||b(o,t)?(console.log("Showing code preview"),N()):m(i,e,o)||m(t,e,o)?(console.log("Showing document preview for:",{fileExtension:i,fileType:t,mimeType:e}),E()):(console.log("Showing unsupported preview for:",{fileExtension:i,fileType:t,mimeType:e}),p())}async function U(t){const e=n==null?void 0:n.id;if(e){const o=`/file-proxy/${e}`;return console.log("Generated proxy URL:",o),o}throw new Error("Could not generate file URL - file ID not available")}function g(t,e){return["jpg","jpeg","png","gif","bmp","webp","svg"].includes(t)||e.startsWith("image/")}function f(t,e){return t==="pdf"||e==="application/pdf"||typeof t=="string"&&t.toLowerCase().includes("pdf")}function y(t,e){return["mp4","webm","ogg","avi","mov","wmv"].includes(t)||e.startsWith("video/")}function h(t,e){return["mp3","wav","ogg","aac","flac"].includes(t)||e.startsWith("audio/")}function x(t,e){return["txt","md","csv","log","xml","json"].includes(t)||e.startsWith("text/")}function b(t,e){var s;const o=["js","ts","php","py","java","cpp","c","h","css","html","sql","sh","bat"],i=(s=t.split(".").pop())==null?void 0:s.toLowerCase();return o.includes(i)||o.includes(e)}function m(t,e,o){var l;const i=["docx","doc","xlsx","xls","pptx","ppt"],s=o?(l=o.split(".").pop())==null?void 0:l.toLowerCase():"";if(i.includes(s))return console.log("Document detected by extension:",s),!0;if(i.includes(t))return console.log("Document detected by type:",t),!0;const r=["officedocument","msword","excel","powerpoint","application/vnd.openxmlformats","application/vnd.ms-"];for(const a of r)if(e.includes(a))return console.log("Document detected by MIME type:",e,"matched:",a),!0;return!1}function S(){c();const t=document.getElementById("imagePreview"),e=document.getElementById("previewImage");e.src=d,e.alt=n.file_name,t.classList.remove("hidden")}function D(){c();const t=document.getElementById("pdfPreview"),e=document.getElementById("pdfViewer");e.src=d,t.classList.remove("hidden")}function M(){c();const t=document.getElementById("videoPreview"),e=document.getElementById("videoPlayer");e.src=d,t.classList.remove("hidden")}function _(){c();const t=document.getElementById("audioPreview"),e=document.getElementById("audioPlayer");e.src=d,t.classList.remove("hidden")}async function z(){c();const t=document.getElementById("textPreview"),e=document.getElementById("textContent");try{const i=await(await fetch(d)).text();e.textContent=i,t.classList.remove("hidden")}catch(o){console.error("Error loading text content:",o),p()}}async function N(){c();const t=document.getElementById("codePreview"),e=document.getElementById("codeContent");try{const i=await(await fetch(d)).text();e.textContent=i,t.classList.remove("hidden")}catch(o){console.error("Error loading code content:",o),p()}}function E(){c();const t=document.getElementById("documentPreview"),e=document.getElementById("documentViewer");try{const o=`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(d)}`;console.log("Loading document with Office viewer via proxy:",o),e.src=o,t.classList.remove("hidden"),e.onerror=function(){console.log("Office viewer failed even with proxy, showing download option"),P()},setTimeout(()=>{try{e.contentDocument===null&&console.log("Document viewer may have failed with proxy, keeping current attempt")}catch{console.log("Document viewer iframe is loading (cross-origin access blocked as expected)")}},3e3)}catch(o){console.error("Error setting up document preview with proxy:",o),P()}}function P(){var s;c();const e=(s=((n==null?void 0:n.file_name)||"").split(".").pop())==null?void 0:s.toLowerCase(),o=document.getElementById("unsupportedPreview");let i="";e==="docx"||e==="doc"?i=`
            <div class="mt-4 p-4 bg-gray-800 rounded-lg">
                <h4 class="text-sm font-semibold mb-2">📱 Recommended Apps:</h4>
                <div class="text-xs text-gray-300 space-y-1">
                    <div>• <strong>Microsoft Word</strong> - Best compatibility</div>
                    <div>• <strong>LibreOffice Writer</strong> - Free alternative</div>
                    <div>• <strong>Google Docs</strong> - Upload to view online</div>
                </div>
            </div>
        `:e==="xlsx"||e==="xls"?i=`
            <div class="mt-4 p-4 bg-gray-800 rounded-lg">
                <h4 class="text-sm font-semibold mb-2">📊 Recommended Apps:</h4>
                <div class="text-xs text-gray-300 space-y-1">
                    <div>• <strong>Microsoft Excel</strong> - Best compatibility</div>
                    <div>• <strong>LibreOffice Calc</strong> - Free alternative</div>
                    <div>• <strong>Google Sheets</strong> - Upload to view online</div>
                </div>
            </div>
        `:(e==="pptx"||e==="ppt")&&(i=`
            <div class="mt-4 p-4 bg-gray-800 rounded-lg">
                <h4 class="text-sm font-semibold mb-2">🎯 Recommended Apps:</h4>
                <div class="text-xs text-gray-300 space-y-1">
                    <div>• <strong>Microsoft PowerPoint</strong> - Best compatibility</div>
                    <div>• <strong>LibreOffice Impress</strong> - Free alternative</div>
                    <div>• <strong>Google Slides</strong> - Upload to view online</div>
                </div>
            </div>
        `),o.innerHTML=`
        <div class="p-6 text-center">
            <div class="text-6xl mb-4 text-gray-400">📊</div>
            <h3 class="text-xl mb-2 text-gray-600">Office Document Preview</h3>
            <p class="text-gray-500 mb-4">Online preview for Office documents is temporarily unavailable.</p>
            
            <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4" onclick="downloadFile()">
                📥 Download to View
            </button>
            
            ${i}
            
            <div class="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
                <p class="text-xs text-yellow-300">
                    💡 <strong>Tip:</strong> After downloading, double-click the file to open it with your preferred app.
                </p>
            </div>
        </div>
    `,o.classList.remove("hidden")}function p(){var a;c();const t=document.getElementById("unsupportedPreview"),e=(n==null?void 0:n.file_name)||"",o=(a=e.split(".").pop())==null?void 0:a.toLowerCase(),i=(n==null?void 0:n.file_type)||"",s=(n==null?void 0:n.mime_type)||"";let r="This file type cannot be previewed in the browser.",l="📄";f(i,s)||o==="pdf"?(r="PDF preview is temporarily unavailable. Download to view the document.",l="📋"):m(i,s,e)?(r='Office document preview requires download. Click "Download to view" below.',l="📊"):["zip","rar","7z","tar","gz"].includes(o)?(r="Archive files need to be extracted. Download to access contents.",l="🗜️"):["exe","msi","dmg","deb","rpm"].includes(o)&&(r="Executable files cannot be previewed for security reasons.",l="⚠️"),t.innerHTML=`
        <div class="p-6 text-center">
            <div class="text-6xl mb-4 text-gray-400">${l}</div>
            <h3 class="text-xl mb-2 text-gray-600">Preview not available</h3>
            <p class="text-gray-500 mb-4">${r}</p>
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" onclick="downloadFile()">
                Download to view
            </button>
        </div>
    `,t.classList.remove("hidden")}function c(){["imagePreview","pdfPreview","documentPreview","videoPreview","audioPreview","textPreview","codePreview","unsupportedPreview"].forEach(e=>{var o;(o=document.getElementById(e))==null||o.classList.add("hidden")})}function B(){var t;(t=document.getElementById("loadingSpinner"))==null||t.classList.add("hidden")}function w(t){B(),c();const e=document.getElementById("previewContainer");e.innerHTML=`
        <div class="flex items-center justify-center h-96 text-center">
            <div>
                <div class="text-6xl mb-4 text-red-400">⚠️</div>
                <h3 class="text-xl mb-2 text-gray-600">Error</h3>
                <p class="text-gray-500">${t}</p>
            </div>
        </div>
    `}function O(){var t,e,o;(t=document.getElementById("backBtn"))==null||t.addEventListener("click",()=>{window.history.back()}),(e=document.getElementById("shareBtn"))==null||e.addEventListener("click",()=>{n&&(typeof openShareModal=="function"?openShareModal(n.id,n.file_name):alert("Share functionality not available"))}),(o=document.getElementById("downloadBtn"))==null||o.addEventListener("click",L)}async function L(){if(!d||!n){alert("File not available for download");return}try{const t=document.createElement("a");t.href=d,t.download=n.file_name||"download",t.target="_blank",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch(t){console.error("Error downloading file:",t),alert("Error downloading file. Please try again.")}}function I(t){if(t===0)return"0 Bytes";const e=1024,o=["Bytes","KB","MB","GB","TB"],i=Math.floor(Math.log(t)/Math.log(e));return parseFloat((t/Math.pow(e,i)).toFixed(2))+" "+o[i]}function R(t){const e=window.I18N.fpUnknown;return t?new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):e}window.previewFile=t=>{window.location.href=`/files/${t}/preview`};window.downloadFile=L;
