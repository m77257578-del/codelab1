"use client";import {useEffect,useState} from "react";import {doc,getDoc,setDoc} from "firebase/firestore";
import {db} from "@/lib/firebase";import {useUser} from "@/lib/useUser";import AuthGate from "@/components/AuthGate";
const tier=(n:number)=>n<=33?"مبتدئ":n<=66?"متوسط":"متقدم";
// الأسئلة تُخزَّن في Firestore: levels/{lang}_{n} = {q, options:[3], answer}
function Roadmap(){const{user}=useUser();const[lang]=useState("js");const[done,setDone]=useState(0);const[open,setOpen]=useState<number|null>(null);const[q,setQ]=useState<any>(null);
useEffect(()=>{if(user)getDoc(doc(db,"users",user.uid)).then(s=>setDone(s.data()?.progress?.[lang]??0))},[user,lang]);
async function pick(n:number){setOpen(n);const s=await getDoc(doc(db,"levels",`${lang}_${n}`));setQ(s.data()??null)}
async function answer(i:number){if(i!==q.answer)return alert("إجابة خاطئة، حاول مجدداً");const p={[lang]:open};await setDoc(doc(db,"users",user!.uid),{progress:p},{merge:true});setDone(open!);setOpen(null)}
return(<div className="p-4"><div className="grid grid-cols-5 md:grid-cols-10 gap-3">{Array.from({length:100},(_,i)=>i+1).map(n=>{const unlocked=n<=done+1;
return<button key={n} disabled={!unlocked} onClick={()=>pick(n)} title={tier(n)} className={`glass aspect-square font-bold ${n<=done?"text-emerald-300":unlocked?"text-cyan-300":"opacity-30"}`}>{n}</button>})}</div>
{open&&<div className="glass fixed inset-x-4 top-1/4 p-6 max-w-lg mx-auto"><p className="mb-3">{q?.q??"لم يضف الأدمن سؤال هذا المستوى بعد"}</p>
{q?.options?.map((o:string,i:number)=><button key={i} className="glass block w-full p-3 mb-2" onClick={()=>answer(i)}>{o}</button>)}<button onClick={()=>setOpen(null)}>إغلاق</button></div>}</div>)}
export default function P(){return<AuthGate><Roadmap/></AuthGate>}
