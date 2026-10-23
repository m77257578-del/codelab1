import "./globals.css";import Link from "next/link";
export const metadata={title:"كود لاب | CodeLab"};
export default function L({children}:{children:React.ReactNode}){return(<html lang="ar" dir="rtl"><body>
<nav className="glass m-3 px-5 py-3 flex gap-5 items-center"><b className="text-cyan-300">CodeLab</b>
<Link href="/">المحرر</Link><Link href="/levels">المستويات</Link><Link href="/developer">المطور</Link>
<Link href="/login" className="btn mr-auto">تسجيل الدخول</Link></nav>{children}</body></html>)}
