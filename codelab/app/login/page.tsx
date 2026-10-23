"use client";import {useState} from "react";import {useRouter} from "next/navigation";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,updateProfile} from "firebase/auth";
import {doc,setDoc} from "firebase/firestore";import {auth,db} from "@/lib/firebase";
export default function Login(){const r=useRouter();const[mode,setM]=useState("in");const[f,setF]=useState({name:"",email:"",phone:"",pass:""});const[err,setE]=useState("");
const s=(k:string)=>(e:any)=>setF({...f,[k]:e.target.value});
async function go(){try{if(mode==="in")await signInWithEmailAndPassword(auth,f.email,f.pass);else{const c=await createUserWithEmailAndPassword(auth,f.email,f.pass);
await updateProfile(c.user,{displayName:f.name});await setDoc(doc(db,"users",c.user.uid),{name:f.name,phone:f.phone,email:f.email,progress:{}})}r.push("/levels")}catch(e:any){setE(e.message)}}
return(<div className="max-w-md mx-auto mt-10 glass p-6 space-y-3"><h1 className="text-2xl font-bold">{mode==="in"?"تسجيل الدخول":"إنشاء حساب"}</h1>
{mode==="up"&&<><input className="inp" placeholder="الاسم الكامل" onChange={s("name")}/><input className="inp" placeholder="رقم الهاتف" onChange={s("phone")}/></>}
<input className="inp" placeholder="البريد الإلكتروني" onChange={s("email")}/><input className="inp" type="password" placeholder="كلمة السر" onChange={s("pass")}/>
{err&&<p className="text-red-400 text-sm">{err}</p>}<button className="btn w-full" onClick={go}>متابعة</button>
<button className="glass w-full p-2" onClick={async()=>{await signInWithPopup(auth,new GoogleAuthProvider());r.push("/levels")}}>المتابعة عبر Google</button>
<button className="text-cyan-300" onClick={()=>setM(mode==="in"?"up":"in")}>{mode==="in"?"ليس لديك حساب؟ أنشئ حساباً":"لديك حساب؟ سجّل الدخول"}</button></div>)}
