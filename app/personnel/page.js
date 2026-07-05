import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PersonnelPage() {
  // 👥 เปลี่ยนคณะผู้บริหารทุกคนให้เป็นอดิเทพ โดยคงรูป ผอ. สุดหล่อไว้ที่ท่านแรก
  const administration = [
    { 
      name: "นายอดิเทพ สุนทรเอกจิต", 
      role: "ผู้อำนวยการวิทยาลัยพณิชยการธนบุรี", 
      imgUrl: "https://hilight.kapook.com/img_cms2/user/fontip/Men/430213_591441454199552_1354228907_n.jpg" 
    },
    { name: "นายอดิเทพ ใจดี", role: "รองผู้อำนวยการฝ่ายวิชาการ", emoji: "👨‍💼" },
    { name: "นายอดิเทพ ทรงสวย", role: "รองผู้อำนวยการฝ่ายแผนงานและความร่วมมือ", emoji: "👩‍💼" }
  ];

  // 📝 เปลี่ยนคณาจารย์ทุกแผนกวิชาและทุกฝ่ายให้เป็นอาจารย์อดิเทพทั้งหมด
  const departments = [
    {
      title: "ฝ่ายวิชาการ (คณาจารย์ประจำแผนกวิชา)",
      teachers: [
        { name: "อาจารย์อดิเทพ แก้วมณี", role: "หัวหน้าแผนกวิชาเทคโนโลยีธุรกิจดิจิทัล" },
        { name: "อาจารย์อดิเทพ ณ บางช้าง", role: "หัวหน้าแผนกวิชาการบัญชี" },
        { name: "อาจารย์อดิเทพ สุดประเสริฐ", role: "หัวหน้าแผนกวิชาการตลาดดิจิทัล" }
      ]
    },
    {
      title: "ฝ่ายพัฒนากิจการนักเรียน นักศึกษา",
      teachers: [
        { name: "อาจารย์อดิเทพ มีสุข", role: "หัวหน้างานกิจกรรมนักเรียนนักศึกษา" },
        { name: "อาจารย์อดิเทพ ปิยะนันท์", role: "หัวหน้างานแนะแนวอาชีพและจัดหางาน" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
      <div>
        <Navbar />
        <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
          
          {/* หัวข้อหน้า */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-slate-900 flex items-center justify-center gap-2">
              <span>👥</span> ข้อมูลบุคลากรวิทยาลัย
            </h1>
            <p className="text-sm text-gray-500">คณะผู้บริหาร ครู และบุคลากรทางการศึกษา วิทยาลัยพณิชยการธนบุรี</p>
          </div>

          {/* 🏛️ ส่วนคณะผู้บริหารวิทยาลัย (เวอร์ชันอดิเทพทั้งหมด) */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-blue-900 border-b pb-2 flex items-center gap-2">
              <span>📋</span> คณะผู้บริหารวิทยาลัย
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {administration.map((person, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
                  {/* กรอบรูปภาพทรงกลม */}
                  <div className="w-24 h-24 bg-slate-100 flex items-center justify-center rounded-full mx-auto overflow-hidden border-2 border-slate-200 shadow-inner">
                    {person.imgUrl ? (
                      <img 
                        src={person.imgUrl} 
                        alt={person.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="text-4xl">👨‍💼</div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-950 text-base">{person.name}</h3>
                    <p className="text-xs font-semibold text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full inline-block">
                      {person.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 👩‍🏫 ส่วนคณาจารย์แยกตามฝ่ายงาน (เวอร์ชันอาจารย์อดิเทพทั้งหมด) */}
          <section className="space-y-8">
            <h2 className="text-lg font-bold text-blue-900 border-b pb-2 flex items-center gap-2">
              <span>👩‍🏫</span> คณาจารย์แยกตามฝ่ายงาน
            </h2>
            {departments.map((dept, i) => (
              <div key={i} className="space-y-4">
                <h3 className="font-bold text-xs text-slate-700 bg-slate-200/60 px-4 py-2 rounded-lg inline-block">
                  📌 {dept.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {dept.teachers.map((teacher, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-xl text-xl border border-slate-100 shrink-0">
                        📝
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{teacher.name}</h4>
                        <p className="text-xs text-gray-500">{teacher.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

        </main>
      </div>
      <Footer />
    </div>
  );
}