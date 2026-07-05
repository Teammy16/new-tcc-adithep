import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DepartmentsPage() {
  const courses = [
    { name: "สาขาวิชาการบัญชี (Accounting)", icon: "💰", desc: "มุ่งเน้นความเชี่ยวชาญการจัดทำบัญชี ตรวจสอบบัญชี และการใช้ซอฟต์แวร์บัญชีสำเร็จรูปในยุคดิจิทัล" },
    { name: "สาขาวิชาการตลาดดิจิทัล (Digital Marketing)", icon: "📈", desc: "เรียนรู้กลยุทธ์การตลาดออนไลน์ การยิงโฆษณา เทคนิคการขาย และการวิเคราะห์พฤติกรรมผู้บริโภคบนโซเชียลมีเดีย" },
    { name: "สาขาวิชาเทคโนโลยีธุรกิจดิจิทัล (Digital Business)", icon: "💻", desc: "เน้นทักษะการพัฒนาเว็บไซต์ โมบายแอปพลิเคชัน งานกราฟิกดีไซน์ และนวัตกรรมเทคโนโลยีเพื่อการจัดการธุรกิจ" },
    { name: "สาขาวิชาภาษาต่างประเทศธุรกิจ (Business Language)", icon: "🗣️", desc: "เสริมทักษะการสื่อสารภาษาอังกฤษและภาษาจีนเพื่อการทำงานในองค์กรธุรกิจระดับสากลและงานบริการ" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
      <div>
        <Navbar />
        <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-slate-900">🎓 สาขาวิชาที่เปิดสอน</h1>
            <p className="text-sm text-gray-500">หลักสูตรประกาศนียบัตรวิชาชีพ (ปวช.) และประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start hover:border-blue-400 hover:shadow-md transition duration-200">
                <div className="text-4xl bg-blue-50 p-3 rounded-xl shrink-0">{course.icon}</div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-base text-gray-900">{course.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{course.desc}</p>
                  <div className="flex gap-2 pt-1">
                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-gray-600">ระดับ ปวช.</span>
                    <span className="text-[10px] font-bold bg-blue-50 px-2 py-0.5 rounded text-blue-600">ระดับ ปวส.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}