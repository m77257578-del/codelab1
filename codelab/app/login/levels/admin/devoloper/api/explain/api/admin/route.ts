import {NextResponse} from "next/server";import {cookies} from "next/headers";
// رمز المرور الافتراضي 100100؛ للتغيير: خزّن النسخة المجزأة في Firestore عبر Admin SDK ثم قارنها هنا
export async function POST(req:Request){const{pin}=await req.json();
if(pin!==(process.env.ADMIN_PIN??"100100"))return NextResponse.json({ok:false},{status:401});
cookies().set("admin",process.env.ADMIN_SESSION_SECRET??"x",{httpOnly:true,secure:true,sameSite:"strict",maxAge:3600});return NextResponse.json({ok:true})}
