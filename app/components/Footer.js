export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-20 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* คอลัมน์ที่ 1: ข้อมูลสถาบันหลัก */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            🏛️ วิทยาลัยพณิชยการธนบุรี
          </h3>
          <p className="text-xs leading-relaxed text-slate-400">
            สถาบันการศึกษาอาชีวศึกษาชั้นนำ มุ่งสร้างผู้ประกอบการดิจิทัลและนักบริหารธุรกิจที่มีคุณธรรมจริยธรรมเพื่อขับเคลื่อนเศรษฐกิจของประเทศ
          </p>
        </div>

        {/* คอลัมน์ที่ 2: ลิงก์ด่วนเข้าระบบสารสนเทศที่ระบุในบรีฟ */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">ระบบสารสนเทศภายใน</h3>
          <ul className="space-y-2 text-xs">
            <li><a href="https://rms.panitthon.ac.th/" className="hover:text-amber-400 transition">📊 ระบบบริหารจัดการสถานศึกษา (RMS)</a></li>
            <li><a href="https://std2018.vec.go.th/web/" className="hover:text-amber-400 transition">🎓 ระบบงานทะเบียนนักเรียนนักศึกษา (ศธ.02)</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">📚 ระบบห้องสมุดอิเล็กทรอนิกส์ดิจิทัล</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">📝 ระบบรับสมัครนักศึกษาออนไลน์อินทราเน็ต</a></li>
          </ul>
        </div>

        {/* คอลัมน์ที่ 3: ที่อยู่และข้อมูลการติดต่อทางการ */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">ข้อมูลการติดต่อ</h3>
          <div className="text-xs space-y-2 text-slate-400">
            <p className="leading-relaxed">📍 20 บางแวก 3 ถนนจรัญสนิทวงศ์ แขวงคูหาสวรรค์ เขตภาษีเจริญ กรุงเทพมหานคร 10160</p>
            <p>📞 โทรศัพท์: 02-467-0571</p>
            <p>✉️ อีเมลกลาง: saraban@panitthon.ac.th</p>
            <div className="pt-2 flex gap-3 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition">🔵 Facebook</a>
              <a href="#" className="text-slate-400 hover:text-white transition">🌐 ITA Web</a>
            </div>
          </div>
        </div>

      </div>

      {/* แถบลิขสิทธิ์ด้านล่างสุด */}
      <div className="border-t border-slate-900 bg-slate-950 py-4 text-center text-[11px] text-slate-500">
        &copy; {new Date().getFullYear()} Thonburi Commercial College (Project PODIUM Frontend). All rights reserved.
      </div>
    </footer>
  );
}