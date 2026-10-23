"use client";import {useState} from "react";import Link from "next/link";import {useUser} from "@/lib/useUser";
export default function AuthGate({children}:{children:React.ReactNode}){const{user,ready}=useUser();const[x,setX]=useState(false);
if(!ready)return null;if(user)return<>{children}</>;
return(<div className="p-10 text-center"><div className="glass inline-block p-8"><p className="mb-4">سجّل الدخول أولاً للوصول إلى هذا القسم.</p>
<Link href="/login" className="btn">تسجيل الدخول</Link></div></div>)}
