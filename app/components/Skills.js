export default function Skills() {
  const links = [
    { name: "ระบบ RMS", icon: "📊", url: "https://rms.panitthon.ac.th/?p=login" }, //
    { name: "ระบบ ศธ.02", icon: "🎓", url: "https://std2018.vec.go.th/web/" }, //
    { name: "ห้องสมุดออนไลน์", icon: "📚", url: "http://www.panitthon.ac.th" }, //
    { name: "สมัครเรียนออนไลน์", icon: "📝", url: "/news/1" } //
  ];

  return (
    <div id="skills" className="my-16 scroll-mt-24">
      <div className="flex items-center gap-2 mb-6">
        <span className="h-4 w-1.5 rounded-full bg-blue-600"></span>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">ทางลัดระบบ (Quick Links)</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {links.map((item, index) => (
          <a 
            href={item.url} 
            key={index} 
            target={item.url.startsWith('http') ? "_blank" : "_self"}
            rel="noopener noreferrer" 
            className="p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 text-center transition duration-300 block group transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition duration-300 inline-block">
              {item.icon}
            </div>
            <div className="font-extrabold text-xs md:text-sm text-slate-800 group-hover:text-blue-600 transition">
              {item.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}