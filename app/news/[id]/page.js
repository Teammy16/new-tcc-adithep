import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// 🗄️ ฐานข้อมูลข่าวสารจำลอง (Mock Database) - กำหนด Key เป็นทั้ง Number และ String ป้องกัน Type Error
const newsData = {
  1: {
    title: "ประกาศรับสมัครนักศึกษาใหม่ ประจำปีการศึกษา 2570",
    date: "5 ก.ค. 2570",
    category: "รับสมัครนักศึกษา",
    emoji: "📝",
    content: "วิทยาลัยพณิชยการธนบุรีเปิดรับสมัครนักศึกษาใหม่ในระดับ ปวช. และ ปวส. ประจำปีการศึกษา 2570 ทุกสาขาวิชา (การบัญชี, การตลาดดิจิทัล, เทคโนโลยีธุรกิจดิจิทัล, ภาษาต่างประเทศธุรกิจ) ผู้ที่สนใจสามารถสมัครผ่านระบบออนไลน์หรือเดินทางมาสมัครได้ที่ห้องแนะแนวของวิทยาลัย..."
  },
  2: {
    title: "ประกวดราคาปรับปรุงห้องปฏิบัติการคอมพิวเตอร์และเครือข่ายความเร็วสูง",
    date: "3 ก.ค. 2570",
    category: "จัดซื้อจัดจ้าง",
    emoji: "💼",
    content: "วิทยาลัยพณิชยการธนบุรีมีความประสงค์จะประกวดราคาจ้างปรับปรุงห้องปฏิบัติการคอมพิวเตอร์และเครือข่ายความเร็วสูง เพื่อรองรับการจัดการเรียนการสอนและการฝึกปฏิบัติการจริงในยุคธุรกิจดิจิทัลให้สอดคล้องกับมาตรฐานสากล..."
  },
  3: {
    title: "ภาพบรรยากาศกิจกรรมปฐมนิเทศนักศึกษาใหม่ ประจำปีการศึกษา",
    date: "1 ก.ค. 2570",
    category: "ข่าวกิจกรรม",
    emoji: "📸",
    content: "ประมวลภาพกิจกรรมปฐมนิเทศนักศึกษาใหม่ ประจำปีการศึกษา โดยมี ท่านผู้อำนวยการ นายอดิเทพ สุนทรเอกจิต เป็นประธานในพิธีเปิด พร้อมกล่าวให้โอวาทและต้อนรับนักศึกษาใหม่ทุกคนเข้าสู่รั้ววิทยาลัยพณิชยการธนบุรีอย่างอบอุ่น"
  }
};

// ⚡ Next.js Dynamic Route Component
export default function NewsDetailPage({ params }) {
  // รับค่า id จากพารามิเตอร์ URL (เช่น /news/1 -> params.id จะได้ "1")
  const { id } = params;
  
  // ค้นหาข้อมูลจากฐานข้อมูลจำลองด้วย ID
  const currentNews = newsData[id];

  // ⚠️ Guard Clause: หากไม่พบข้อมูลข่าวสารใน ID นั้นๆ (ป้องกันหน้าระบบพัง)
  if (!currentNews) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
        <Navbar />
        <main className="max-w-xl mx-auto px-6 py-20 text-center space-y-4">
          <div className="text-6xl animate-bounce">⚠️</div>
          <h1 className="text-2xl font-black text-slate-900">ไม่พบข้อมูลข่าวสารรหัสนี้</h1>
          <p className="text-sm text-gray-500">ขออภัย ระบบไม่พบข่าวสารรหัสที่คุณกำลังเรียกดูในฐานข้อมูล</p>
          <a href="/" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-md">
            ← กลับสู่หน้าหลัก
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  // ✅ แสดงผลหน้ารายละเอียดข่าวที่สมบูรณ์แบบเมื่อเจอข้อมูล ID
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
      <div>
        <Navbar />
        
        <main className="max-w-3xl mx-auto px-6 py-12">
          {/* ปุ่มย้อนกลับ */}
          <div className="mb-4">
            <a href="/" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition flex items-center gap-1">
              ← กลับสู่หน้าหลัก
            </a>
          </div>

          {/* การ์ดแสดงผลรายละเอียดบทความบทความ */}
          <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {/* ส่วนหัวแบนเนอร์ข่าวสไตล์พรีเมียม */}
            <div className="h-48 bg-gradient-to-b from-blue-50 via-slate-50/50 to-white flex flex-col items-center justify-center gap-3 border-b border-slate-100 relative">
              <img 
                src="https://rms.panitthon.ac.th/files/96091_23060210105332.png" 
                alt="ตราวิทยาลัยพณิชยการธนบุรี" 
                className="w-14 h-14 object-contain opacity-80"
              />
              <span className="text-5xl drop-shadow-sm">{currentNews.emoji}</span>
            </div>

            {/* ส่วนเนื้อหาข่าวที่ดึงข้อมูลผ่าน Props และ Map */}
            <div className="p-8 md:p-12 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-extrabold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
                  {currentNews.category}
                </span>
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                  🗓️ {currentNews.date}
                </span>
              </div>
              
              <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                {currentNews.title}
              </h1>
              
              {/* เส้นคั่นเนื้อหา */}
              <div className="h-px bg-slate-100 w-20"></div>
              
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light whitespace-pre-line">
                {currentNews.content}
              </p>
            </div>

            {/* ข้อมูลเชิงสถาบันส่วนท้ายบทความ */}
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">
                งานประชาสัมพันธ์ วิทยาลัยพณิชยการธนบุรี
              </p>
            </div>
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}