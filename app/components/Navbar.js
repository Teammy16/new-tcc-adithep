'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* โลโก้วิทยาลัยและชื่อ */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-11 h-11 bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-105 transition duration-300">
            <img 
              src="https://rms.panitthon.ac.th/files/96091_23060210105332.png" 
              alt="โลโก้วิทยาลัยพณิชยการธนบุรี" 
              className="w-9 h-9 object-contain"
            />
          </div>
          <div>
            <div className="font-black text-sm text-blue-950 tracking-tight leading-none mb-1">
              วิทยาลัยพณิชยการธนบุรี
            </div>
            <div className="text-[9px] font-bold text-amber-600 tracking-widest uppercase leading-none">
              Thonburi Commercial College
            </div>
          </div>
        </Link>
        
        {/* Desktop Menu - ครบถ้วนทุกหน้าตามบรีฟ */}
        <div className="hidden lg:flex items-center space-x-6 text-xs font-extrabold text-slate-700">
          <Link href="/" className="hover:text-blue-600 transition">หน้าแรก</Link>
          <Link href="/about" className="hover:text-blue-600 transition">เกี่ยวกับวิทยาลัย</Link>
          <Link href="/news" className="hover:text-blue-600 transition">ข่าวประชาสัมพันธ์</Link>
          <Link href="/personnel" className="hover:text-blue-600 transition">บุคลากร</Link>
          <Link href="/departments" className="hover:text-blue-600 transition">แผนกวิชา</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">ติดต่อเรา</Link>
          <Link href="/admin" className="text-blue-600 hover:text-blue-700 transition flex items-center gap-1">แผงควบคุม 🔐</Link>
        </div>

        {/* ปุ่มเด่นบนขวา */}
        <div className="hidden lg:block">
          <a href="/#skills" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md shadow-blue-500/10">
            ระบบสารสนเทศ ⚡
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 p-2 hover:bg-slate-50 rounded-lg transition">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t px-6 py-4 space-y-3 shadow-lg font-bold text-sm text-slate-750">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-blue-600">หน้าแรก</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block text-slate-700">เกี่ยวกับวิทยาลัย</Link>
          <Link href="/news" onClick={() => setIsOpen(false)} className="block text-slate-700">ข่าวประชาสัมพันธ์</Link>
          <Link href="/personnel" onClick={() => setIsOpen(false)} className="block text-slate-700">บุคลากร</Link>
          <Link href="/departments" onClick={() => setIsOpen(false)} className="block text-slate-700">แผนกวิชา</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-slate-700">ติดต่อเรา</Link>
          <Link href="/admin" onClick={() => setIsOpen(false)} className="block text-blue-600">แผงควบคุม 🔐</Link>
        </div>
      )}
    </nav>
  );
}