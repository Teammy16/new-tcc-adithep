import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
      <div>
        <Navbar />

        <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
          
          {/* ส่วนหัวหน้าเกี่ยวกับวิทยาลัย */}
          <div className="text-center space-y-4">
            <div className="inline-block bg-blue-50 text-blue-600 text-xs font-extrabold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-widest">
              ข้อมูลสถาบัน
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              เกี่ยวกับวิทยาลัย
            </h1>
            <p className="text-sm md:text-base text-slate-500 font-light max-w-xl mx-auto">
              วิทยาลัยพณิชยการธนบุรี มุ่งมั่นพัฒนาการศึกษาสู่มาตรฐานสากล ผลิตผู้สำเร็จการศึกษาที่มีคุณภาพและมีคุณธรรม
            </p>
            <div className="h-1 w-20 bg-blue-600 rounded-full mx-auto mt-4"></div>
          </div>

          {/* สัญลักษณ์วิทยาลัย */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 shrink-0 bg-white p-3 rounded-2xl shadow-inner border border-slate-50 flex items-center justify-center">
              <img 
                src="https://rms.panitthon.ac.th/files/96091_23060210105332.png" 
                alt="โลโก้วิทยาลัยพณิชยการธนบุรี" 
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-950">วิทยาลัยพณิชยการธนบุรี (Thonburi Commercial College)</h2>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                เป็นสถาบันการศึกษาสังกัดสำนักงานคณะกรรมการการอาชีวศึกษา กระทรวงศึกษาธิการ ตั้งอยู่เลขที่ 352 ซอยจรัญสนิทวงศ์ 13 แขวงวัดท่าพระ เขตบางกอกใหญ่ กรุงเทพมหานคร มุ่งสร้างสรรค์กำลังคนสายวิชาชีพที่มีความเป็นเลิศทางด้านบริหารธุรกิจและเทคโนโลยีดิจิทัล
              </p>
            </div>
          </div>

          {/* ปรัชญา วิสัยทัศน์ อัตลักษณ์ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* ปรัชญา */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 text-2xl rounded-2xl flex items-center justify-center shadow-inner">
                💡
              </div>
              <h3 className="text-lg font-black text-slate-950">ปรัชญา</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                "ปญฺญา โลกสฺมิ ปชฺโชโต"<br />
                ปัญญาเป็นแสงสว่างในโลก มุ่งพัฒนาผู้เรียนให้มีความรอบรู้คู่คุณธรรม นำพาสังคมสู่ความเจริญ
              </p>
            </div>

            {/* วิสัยทัศน์ */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 text-2xl rounded-2xl flex items-center justify-center shadow-inner">
                🎯
              </div>
              <h3 className="text-lg font-black text-slate-950">วิสัยทัศน์</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                มุ่งเป็นผู้นำในการพัฒนาผู้เรียนสายอาชีพ ด้านการค้า การจัดการธุรกิจ และระบบเทคโนโลยี ให้พร้อมตอบสนองภาคอุตสาหกรรมในยุคดิจิทัล
              </p>
            </div>

            {/* อัตลักษณ์ */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 text-2xl rounded-2xl flex items-center justify-center shadow-inner">
                🌟
              </div>
              <h3 className="text-lg font-black text-slate-950">อัตลักษณ์</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                "บริการประทับใจ มีวินัย ใส่ใจเทคโนโลยี มีทักษะทางวิชาชีพที่เป็นเลิศ" บุคลากรและนักเรียนนักศึกษามุ่งเน้นคุณธรรมนำความรู้อย่างมีวินัย
              </p>
            </div>

          </div>

          {/* ประวัติย่อเพิ่มเติม */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-950">สีประจำวิทยาลัย</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 border border-slate-200"></span>
                <span className="text-xs font-bold text-slate-700">สีน้ำเงิน (แสดงถึง ความมั่นคง มีระเบียบวินัย และความหนักแน่น)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white border border-slate-300"></span>
                <span className="text-xs font-bold text-slate-700">สีขาว (แสดงถึง ความบริสุทธิ์ มีคุณธรรม และความโปร่งใส)</span>
              </div>
            </div>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
