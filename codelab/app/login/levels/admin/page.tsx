"use client";import {useState} from "react";import {doc,setDoc} from "firebase/firestore";import {db} from "@/lib/firebase";
export default function Admin(){const[ok,setOk]=useState(false);const[pin,setPin]=useState("");
const[lv,setLv]=useState({lang:"js",n:1,q:"",o1:"",o2:"",o3:"",answer:0});const[dev,setDev]=useState({name:"",whatsapp:"",youtube:"",tiktok:"",github:""});
async function login(){const r=await fetch("/api/admin",{method:"POST",body:JSON.stringify({pin})});setOk(r.ok)}
if(!ok)return<div className="max-w-xs mx-auto mt-20 glass p-6"><input className="inp mb-3" type="password" placeholder="رمز المرور" onChange={e=>setPin(e.target.value)}/><button className="btn w-full" onClick={login}>دخول</button></div>;
return(<div className="p-4 grid md:grid-cols-2 gap-4"><div className="glass p-4 space-y-2"><h2 className="font-bold">إدارة مستوى</h2>
<input className="inp" placeholder="اللغة" value={lv.lang} onChange={e=>setLv({...lv,lang:e.target.value})}/><input className="inp" type="number" min={1} max={100} value={lv.n} onChange={e=>setLv({...lv,n:+e.target.value})}/>
<input className="inp" placeholder="السؤال" onChange={e=>setLv({...lv,q:e.target.value})}/>{(["o1","o2","o3"] as const).map(k=><input key={k} className="inp" placeholder={"خيار "+k} onChange={e=>setLv({...lv,[k]:e.target.value})}/>)}
<input className="inp" type="number" min={0} max={2} placeholder="رقم الإجابة الصحيحة (0-2)" onChange={e=>setLv({...lv,answer:+e.target.value})}/>
<button className="btn" onClick={()=>setDoc(doc(db,"levels",`${lv.lang}_${lv.n}`),{q:lv.q,options:[lv.o1,lv.o2,lv.o3],answer:lv.answer})}>حفظ المستوى</button></div>
<div className="glass p-4 space-y-2"><h2 className="font-bold">بيانات المطور</h2>{Object.keys(dev).map(k=><input key={k} className="inp" placeholder={k} onChange={e=>setDev({...dev,[k]:e.target.value})}/>)}
<button className="btn" onClick={()=>setDoc(doc(db,"config","developer"),dev)}>حفظ</button></div></div>)}
