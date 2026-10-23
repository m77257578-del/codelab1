import {initializeApp,getApps,cert} from "firebase-admin/app";import {getFirestore} from "firebase-admin/firestore";
import {createHmac,createHash} from "crypto";import {cookies} from "next/headers";
export const adb=()=>{const a=getApps()[0]??initializeApp({credential:cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT||"{}"))});return getFirestore(a)};
const sec=()=>process.env.ADMIN_SESSION_SECRET||"dev-secret";
export const hash=(p:string)=>createHash("sha256").update(p+sec()).digest("hex");
export const token=()=>createHmac("sha256",sec()).update("admin").digest("hex");
export const isAdmin=()=>cookies().get("admin")?.value===token();
export async function pinOk(p:string){const s=await adb().doc("config/admin").get();return s.exists?s.data()!.hash===hash(p):p==="100100"}
