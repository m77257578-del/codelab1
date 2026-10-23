"use client";import {useEffect,useState} from "react";import {doc,getDoc} from "firebase/firestore";import {db} from "@/lib/firebase";
export default function Dev(){const[d,setD]=useState<any>({});useEffect(()=>{getDoc(doc(db,"config","developer")).then(s=>setD(s.data()??{}))},[]);
const links:[string,string][]=[["واتساب",d.whatsapp],["يوتيوب",d.youtube],["تيك توك",d.tiktok],["جيت هاب",d.github]];
return(<div className="p-6 text-center"><h1 className="text-3xl font-bold mb-6">{d.name||"المطور"}</h1><div className="flex flex-wrap gap-4 justify-center">
{links.filter(l=>l[1]).map(([n,u])=><a key={n} href={u} target="_blank" className="glass px-8 py-6 transition hover:[transform:perspective(600px)_rotateY(12deg)_translateZ(20px)]">{n}</a>)}</div></div>)}
