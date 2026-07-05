'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../../lib/supabase';

// ฟังก์ชันแปลงวันที่เป็นรูปแบบไทย (เช่น 5 ก.ค. 2570)
const formatDateThai = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const month = months[date.getMonth()];
    const yearBE = date.getFullYear() + 543;
    return `${day} ${month} ${yearBE}`;
  } catch (e) {
    return dateString;
  }
};

export default function NewsDetailPage({ params }) {
  const [id, setId] = useState(null);
  const [news, setNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // รองรับทั้ง Next.js รุ่นเก่า (params เป็น object) และรุ่นใหม่ (params เป็น Promise)
  useEffect(() => {
    async function resolveParams() {
      try {
        const resolved = await params;
        setId(resolved?.id);
      } catch (err) {
        console.error('Error resolving params:', err);
      }
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    async function fetchNewsDetail() {
      if (!id) return;
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        setNews(data);
      } catch (err) {
        console.error('Error fetching news detail:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNewsDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-12 w-full">
          <div className="mb-4 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
          </div>
          <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
            <div className="h-48 bg-slate-100 flex flex-col items-center justify-center">
              <div className="w-14 h-14 bg-slate-200 rounded-full"></div>
            </div>
            <div className="p-8 md:p-12 space-y-6">
              <div className="flex gap-3">
                <div className="h-5 bg-slate-200 rounded-full w-24"></div>
                <div className="h-5 bg-slate-100 rounded w-32"></div>
              </div>
              <div className="h-8 bg-slate-200 rounded w-2/3"></div>
              <div className="h-px bg-slate-100 w-20"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-4/5"></div>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  // Guard Clause: หากไม่พบข้อมูลข่าวสารใน ID นั้นๆ (ป้องกันหน้าระบบพัง)
  if (!news) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
        <Navbar />
        <main className="max-w-xl mx-auto px-6 py-20 text-center space-y-4">
          <div className="text-6xl animate-bounce">⚠️</div>
          <h1 className="text-2xl font-black text-slate-900">ไม่พบข้อมูลข่าวสารรหัสนี้</h1>
          <p className="text-sm text-gray-500">ขออภัย ระบบไม่พบข่าวสารรหัสที่คุณกำลังเรียกดูในฐานข้อมูล</p>
          <Link href="/" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-md">
            ← กลับสู่หน้าหลัก
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // แสดงผลหน้ารายละเอียดข่าวที่สมบูรณ์แบบเมื่อเจอข้อมูล ID
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
      <div>
        <Navbar />
        
        <main className="max-w-3xl mx-auto px-6 py-12">
          {/* ปุ่มย้อนกลับ */}
          <div className="mb-4">
            <Link href="/" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition flex items-center gap-1">
              ← กลับสู่หน้าหลัก
            </Link>
          </div>

          {/* การ์ดแสดงผลรายละเอียดบทความ */}
          <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {/* ส่วนหัวแบนเนอร์ข่าวสไตล์พรีเมียม */}
            <div className="relative h-64 md:h-80 bg-slate-100 border-b border-slate-100 overflow-hidden flex items-center justify-center">
              {news.image_url ? (
                <img 
                  src={news.image_url} 
                  alt={news.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-slate-100 flex flex-col items-center justify-center gap-3">
                  <img 
                    src="https://rms.panitthon.ac.th/files/96091_23060210105332.png" 
                    alt="ตราวิทยาลัยพณิชยการธนบุรี" 
                    className="w-14 h-14 object-contain opacity-85"
                  />
                  <span className="text-5xl drop-shadow-sm">{news.emoji || '📝'}</span>
                </div>
              )}
            </div>

            {/* ส่วนเนื้อหาข่าว */}
            <div className="p-8 md:p-12 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-extrabold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
                  {news.category}
                </span>
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                  🗓️ {formatDateThai(news.created_at)}
                </span>
              </div>
              
              <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                {news.title}
              </h1>
              
              {/* เส้นคั่นเนื้อหา */}
              <div className="h-px bg-slate-100 w-20"></div>
              
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light whitespace-pre-line">
                {news.content}
              </p>

              {/* ส่วนไฟล์แนบดาวน์โหลด PDF */}
              {news.file_url && (
                <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 leading-tight">เอกสารแนบประกอบประกาศ</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">ไฟล์แนบรูปแบบ PDF</p>
                    </div>
                  </div>
                  <a 
                    href={news.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] px-4 py-2 rounded-xl shadow-sm transition active:scale-95 flex items-center gap-1 w-full sm:w-auto justify-center"
                  >
                    <span>📥</span> ดาวน์โหลดเอกสาร
                  </a>
                </div>
              )}
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