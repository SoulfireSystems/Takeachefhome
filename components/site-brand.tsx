export default function SiteBrand({talent=false}:{talent?:boolean}){
 return <a href="/" className="inline-flex min-w-0 shrink-0 flex-col items-start gap-1" aria-label="TakeaChefHome.com — home"><img src="/brand/takeachefhome-logo.png" alt="TakeaChefHome.com — The Culinary Exchange" width="1200" height="466" className="h-auto w-[180px] max-w-full sm:w-[230px]"/>{talent&&<span className="text-xs font-black tracking-[.16em] text-[#135DFF]">TALENT</span>}</a>;
}
