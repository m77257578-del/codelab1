// تخزين مشفّر AES-GCM داخل IndexedDB (حدود المتصفح: لا يوجد Sandbox حقيقي للملفات)
const DB="codelab-vault";
const open=()=>new Promise<IDBDatabase>((res,rej)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore("v");r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const put=async(k:string,v:any)=>{const d=await open();return new Promise<void>(r=>{const t=d.transaction("v","readwrite");t.objectStore("v").put(v,k);t.oncomplete=()=>r()})};
const get=async(k:string)=>{const d=await open();return new Promise<any>(r=>{const q=d.transaction("v").objectStore("v").get(k);q.onsuccess=()=>r(q.result)})};
async function key(){let k=await get("k");if(!k){k=await crypto.subtle.generateKey({name:"AES-GCM",length:256},false,["encrypt","decrypt"]);await put("k",k)}return k as CryptoKey}
export async function saveEncrypted(id:string,url:string){const buf=await (await fetch(url)).arrayBuffer();const iv=crypto.getRandomValues(new Uint8Array(12));
const enc=await crypto.subtle.encrypt({name:"AES-GCM",iv},await key(),buf);await put("f:"+id,{iv,enc})}
export async function playUrl(id:string){const r=await get("f:"+id);if(!r)return null;
const dec=await crypto.subtle.decrypt({name:"AES-GCM",iv:r.iv},await key(),r.enc);return URL.createObjectURL(new Blob([dec],{type:"video/mp4"}))}
