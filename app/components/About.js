export default function About() {
  return (
    <div id="about" className="my-12 space-y-12 scroll-mt-20">
      {/* ... โครงสร้างวิสัยทัศน์ ปรัชญา อัตลักษณ์ เดิม ... */}

      {/* บล็อกผู้บริหาร (แก้ไขรูปภาพตรงนี้) */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-inner shrink-0 border-2 border-slate-200">
          <img 
            src="https://hilight.kapook.com/img_cms2/user/fontip/Men/430213_591441454199552_1354228907_n.jpg" 
            alt="ผู้อำนวยการวิทยาลัยพณิชยการธนบุรี" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center md:text-left space-y-2">
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">ผู้บริหารวิทยาลัย</span>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">นายอดิเทพ สุนทรเอกจิต</h3>
          <p className="text-blue-700 font-medium text-sm">ผู้อำนวยการวิทยาลัยพณิชยการธนบุรี</p>
        </div>
      </div>
    </div>
  );
}