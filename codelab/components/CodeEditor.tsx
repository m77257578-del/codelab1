"use client";import {useEffect,useMemo,useState} from "react";import CM from "@uiw/react-codemirror";
import {html} from "@codemirror/lang-html";import {css} from "@codemirror/lang-css";import {javascript} from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";import {cpp} from "@codemirror/lang-cpp";import {java} from "@codemirror/lang-java";import {oneDark} from "@codemirror/theme-one-dark";
const L:any={html:html(),css:css(),js:javascript(),python:python(),cpp:cpp(),java:java()};
const KEYS=["{","}","[","]","<",">",";","=",'"',":"];
export default function CodeEditor(){const[lang,setLang]=useState("html");const[code,setCode]=useState("<h1>مرحباً CodeLab</h1>");
const[preview,setPrev]=useState(code);const[hint,setHint]=useState("");const web=["html","css","js"].includes(lang);
useEffect(()=>{const t=setTimeout(()=>setPrev(code),400);return()=>clearTimeout(t)},[code]);
// فحص محلي بسيط للأقواس؛ عند وجود خطأ يُرسل للخادم ليشرحه Gemini بصمت
useEffect(()=>{const t=setTimeout(async()=>{const o:string[]=[];let err="";const m:any={")":"(","]":"[","}":"{"};
for(const c of code){if("([{".includes(c))o.push(c);else if(m[c]&&o.pop()!==m[c]){err="قوس إغلاق زائد أو غير مطابق";break}}
if(!err&&o.length)err="قوس مفتوح بلا إغلاق";if(!err){setHint("");return}
try{const r=await fetch("/api/explain",{method:"POST",body:JSON.stringify({code,lang,error:err})});const j=await r.json();setHint(j.text||err)}catch{setHint(err)}},1500);return()=>clearTimeout(t)},[code,lang]);
const ext=useMemo(()=>[L[lang]],[lang]);
return(<div className="p-3 grid gap-3 md:grid-cols-2" dir="ltr">
<div className="glass p-2"><select value={lang} onChange={e=>setLang(e.target.value)} className="inp mb-2">{Object.keys(L).map(k=><option key={k}>{k}</option>)}</select>
<CM value={code} height="55vh" theme={oneDark} extensions={ext} onChange={setCode} basicSetup={{closeBrackets:true,autocompletion:true}}/>
<div className="flex gap-1 mt-2 overflow-x-auto md:hidden">{KEYS.map(k=><button key={k} className="glass px-3 py-2" onClick={()=>setCode(c=>c+k)}>{k}</button>)}</div></div>
<div className="glass p-2 min-h-[40vh]">{web?<iframe className="w-full h-[60vh] bg-white rounded-xl" sandbox="allow-scripts" srcDoc={lang==="css"?`<style>${preview}</style><p>معاينة</p>`:lang==="js"?`<script>${preview}<\/script>`:preview}/>:<p className="p-4">التنفيذ المباشر متاح لـ HTML/CSS/JS فقط، ويُفحص هذا النوع محلياً.</p>}</div>
{hint&&<div dir="rtl" className="glass fixed bottom-4 right-4 left-4 md:left-auto md:w-96 p-4 border-amber-400/50 whitespace-pre-wrap">{hint}<button className="block mt-2 text-cyan-300" onClick={()=>setHint("")}>إغلاق</button></div>}</div>)}
