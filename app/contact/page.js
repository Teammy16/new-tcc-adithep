import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-slate-900">📞 ติดต่อเรา</h1>
            <p className="text-sm text-gray-500">ช่องทางการติดต่อและแผนที่การเดินทางมายังวิทยาลัย</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* กล่องข้อมูลติดต่อ */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-blue-900 border-b pb-2">📍 ข้อมูลวิทยาลัย</h2>
                <p className="text-xs text-gray-700 leading-relaxed">
                  <strong>วิทยาลัยพณิชยการธนบุรี</strong><br />
                  20 บางแวกแยก 3 ถนนจรัญสนิทวงศ์ แขวงบางแวก เขตภาษีเจริญ กรุงเทพมหานคร 10160
                </p>
              </div>

              <div className="space-y-2 text-xs text-gray-700">
                <p>📞 <strong>โทรศัพท์:</strong> 02-467-0571</p>
                <p>✉️ <strong>อีเมลกลาง:</strong> saraban@panitthon.ac.th</p>
                <p>⏰ <strong>เวลาทำการ:</strong> วันจันทร์ - วันศุกร์ เวลา 08:00 - 16:00 น.</p>
              </div>

              <div className="pt-4 border-t flex gap-3">
                <a href="#" className="text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Facebook ของเรา</a>
              </div>
            </div>

            {/* กล่องแผนที่จำลอง (Mockup Map Element) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="bg-slate-200 h-64 flex flex-col items-center justify-center text-slate-500 gap-2 p-4 text-center grow">
                <span className="text-4xl">🗺️</span>
                <p className="font-bold text-sm text-gray-800">แผนที่วิทยาลัยพณิชยการธนบุรี</p>
                <p className="text-[10px] text-gray-500">คลิกขยายเพื่อดูพิกัดบน Google Maps ของจริงได้ในอนาคต</p>
              </div>
              <div className="p-4 bg-slate-50 text-center border-t">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  🌐 เปิดใน Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}