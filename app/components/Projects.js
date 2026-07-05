import Link from 'next/link';

export default function Projects() {
  // 1. สร้าง Array ของข้อมูลข่าวสาร (สมมติว่าเป็นข้อมูลที่ดึงมาจาก Backend)
  const newsList = [
    {
      id: "1",
      title: "ประกาศรับสมัครนักศึกษาใหม่ ประจำปีการศึกษา 2570",
      date: "5 ก.ค. 2570",
      category: "รับสมัครนักศึกษา",
      emoji: "📝",
      desc: "วิทยาลัยพณิชยการธนบุรีเปิดรับสมัครนักศึกษาใหม่ในระดับ ปวช. และ ปวส..."
    },
    {
      id: "2",
      title: "ประกวดราคาปรับปรุงห้องปฏิบัติการคอมพิวเตอร์",
      date: "3 ก.ค. 2570",
      category: "จัดซื้อจัดจ้าง",
      emoji: "💼",
      desc: "วิทยาลัยมีความประสงค์จะประกวดราคาจ้างปรับปรุงห้องปฏิบัติการคอมพิวเตอร์..."
    },
    {
      id: "3",
      title: "ภาพบรรยากาศกิจกรรมปฐมนิเทศนักศึกษาใหม่",
      date: "1 ก.ค. 2570",
      category: "ข่าวกิจกรรม",
      emoji: "📸",
      desc: "ประมวลภาพกิจกรรมปฐมนิเทศนักศึกษาใหม่ ประจำปีการศึกษา โดยมีท่าน ผอ. เป็นประธาน..."
    }
  ];

  return (
    <div id="projects" className="my-16 scroll-mt-24">
      {/* หัวข้อส่วนข่าวประชาสัมพันธ์ */}
      <div className="flex items-center gap-2 mb-6">
        <span className="h-4 w-1.5 rounded-full bg-blue-600"></span>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">ข่าวประชาสัมพันธ์เด่น</h2>
      </div>

      {/* 2. การใช้ .map() เพื่อแปลง Array ข้อมูลให้ออกมาเป็น HTML/Component */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsList.map((news) => (
          // ⚠️ สำคัญมาก: ทุกครั้งที่ใช้ .map() ตัวนอกสุดของ Loop ต้องใส่ key={บ็อกซ์ไอดี} เสมอ เพื่อให้ React จำสถานะได้
          <div key={news.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
            
            {/* ส่วนหัวของการ์ดข่าว */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">{news.category}</span>
                <span className="text-gray-400">🗓️ {news.date}</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 line-clamp-2 leading-snug">
                {news.emoji} {news.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 font-light">
                {news.desc}
              </p>
            </div>

            {/* ส่วนปุ่มกดลิงก์ (Dynamic Route ลิงก์ไปยัง id ของข่าวนั้นๆ) */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
              <Link 
                href={`/news/${news.id}`} 
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
              >
                อ่านรายละเอียดเพิ่มเติม →
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}