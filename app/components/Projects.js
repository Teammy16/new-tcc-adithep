'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

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

export default function Projects() {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        setNewsList(data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message || 'Failed to fetch news');
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div id="projects" className="my-16 scroll-mt-24">
      {/* หัวข้อส่วนข่าวประชาสัมพันธ์ */}
      <div className="flex items-center gap-2 mb-6">
        <span className="h-4 w-1.5 rounded-full bg-blue-600"></span>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">ข่าวประชาสัมพันธ์เด่น</h2>
      </div>

      {/* กรณีที่กำลังโหลดข้อมูล (Skeleton Loading) */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between h-[220px] animate-pulse">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-slate-200 rounded-full w-24"></div>
                  <div className="h-4 bg-slate-100 rounded w-16"></div>
                </div>
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-full"></div>
                  <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <div className="h-4 bg-slate-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        /* กรณีมีข้อผิดพลาด */
        <div className="text-center py-12 bg-rose-50 rounded-2xl border border-rose-100 shadow-sm space-y-3">
          <span className="text-4xl text-rose-500">⚠️</span>
          <p className="text-sm text-rose-700 font-extrabold">ไม่สามารถดึงข้อมูลข่าวสารได้</p>
          <p className="text-xs text-rose-500 font-medium max-w-md mx-auto px-4 leading-relaxed">
            {error.includes('Failed to fetch') 
              ? 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ Supabase ได้ กรุณาตรวจสอบการตั้งค่าคีย์เชื่อมต่อในไฟล์ .env และ .env.local หรือการเชื่อมต่อเครือข่าย'
              : error}
          </p>
        </div>
      ) : newsList.length === 0 ? (
        /* กรณีไม่มีข่าวสารในระบบ */
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-4xl">📭</span>
          <p className="mt-2 text-sm text-slate-400 font-bold">ยังไม่มีข่าวประชาสัมพันธ์ในขณะนี้</p>
        </div>
      ) : (
        /* แสดงรายการข่าวสาร */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsList.slice(0, 3).map((news) => (
            <div key={news.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-300">
              
              {/* รูปประกอบหัวการ์ด */}
              <div className="h-40 bg-slate-100 relative overflow-hidden group">
                {news.image_url ? (
                  <img
                    src={news.image_url}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-blue-50/50 to-slate-100 flex items-center justify-center text-4xl">
                    {news.emoji || '📝'}
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 px-2.5 py-1 rounded-lg text-[10px] font-black shadow-sm">
                  {news.category}
                </span>
              </div>

              {/* ส่วนเนื้อหาข่าวสาร */}
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                    <span>🗓️ {formatDateThai(news.created_at)}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 line-clamp-2 leading-snug hover:text-blue-600 transition">
                    <Link href={`/news/${news.id}`}>{news.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 font-light">
                    {news.desc || news.content}
                  </p>
                </div>
              </div>

              {/* ปุ่มกดอ่านข่าว */}
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
      )}
    </div>
  );
}