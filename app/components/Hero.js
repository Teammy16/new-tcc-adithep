export default function Hero() {
  return (
    <div id="home" className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 md:p-14 my-8 shadow-xl shadow-blue-950/20 relative overflow-hidden border border-slate-800">
      {/* วงแหวนแสงเรืองรองนุ่มนวลบริเวณพื้นหลัง */}
      <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-1.5 bg-amber-400/10 text-amber-400 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-amber-400/20">
          ✨ THE NEW DIGITAL CAMPUS
        </span>
        <h1 className="text-3xl md:text-5xl font-black mt-2 leading-[1.15] tracking-tight text-white drop-shadow-sm">
          วิทยาลัยพณิชยการธนบุรี <br />
          <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-white bg-clip-text text-transparent font-medium text-lg md:text-2xl tracking-normal block mt-1">
            Thonburi Commercial College
          </span>
        </h1>
        <p className="text-slate-300 max-w-xl text-xs md:text-sm leading-relaxed font-light">
          มุ่งเน้นการจัดการศึกษาด้านพาณิชยกรรมและบริหารธุรกิจ ขับเคลื่อนด้วยเทคโนโลยีดิจิทัล พัฒนาผู้เรียนสู่อนาคตตามมาตรฐานสากล
        </p>
        <div className="pt-4 flex flex-wrap gap-4">
          <a href="#projects" className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl transition duration-300 shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5">
            📰 อ่านข่าวประชาสัมพันธ์
          </a>
          <a href="#skills" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs px-6 py-3.5 rounded-xl transition duration-300 backdrop-blur-sm">
            ⚡ เข้าใช้ระบบสารสนเทศ
          </a>
        </div>
      </div>
    </div>
  );
}