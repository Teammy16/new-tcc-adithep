'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

const CATEGORIES = ['ทั้งหมด', 'ประชาสัมพันธ์', 'จัดซื้อจัดจ้าง', 'ประกาศ'];

export default function NewsListPage() {
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setNewsList(data || []);
        setFilteredNews(data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message || 'Failed to fetch news');
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  // Filter and search handling
  useEffect(() => {
    let result = newsList;

    // Filter by Category
    if (selectedCategory !== 'ทั้งหมด') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) || 
        (item.content && item.content.toLowerCase().includes(q)) ||
        (item.desc && item.desc.toLowerCase().includes(q))
      );
    }

    setFilteredNews(result);
  }, [selectedCategory, searchQuery, newsList]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 font-sans">
      <div>
        <Navbar />

        <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
          
          {/* Header Section */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">ข่าวประชาสัมพันธ์ทั้งหมด</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">ติดตามข่าวสาร กิจกรรม และประกาศประกวดราคาจ้างของวิทยาลัย</p>
            <div className="h-1 w-16 bg-blue-600 rounded-full mx-auto mt-2"></div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-300 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="ค้นหาหัวข้อข่าว..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            </div>

          </div>

          {/* News Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between h-[360px] animate-pulse">
                  <div className="h-44 bg-slate-200 w-full"></div>
                  <div className="p-6 space-y-4 flex-grow">
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-slate-200 rounded-full w-24"></div>
                      <div className="h-4 bg-slate-100 rounded w-16"></div>
                    </div>
                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                  </div>
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                    <div className="h-4 bg-slate-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* กรณีมีข้อผิดพลาด */
            <div className="text-center py-20 bg-rose-50 rounded-3xl border border-rose-100 shadow-sm space-y-3">
              <span className="text-5xl text-rose-500">⚠️</span>
              <p className="text-base text-rose-700 font-extrabold">ไม่สามารถดึงข้อมูลข่าวสารได้</p>
              <p className="text-xs text-rose-500 font-medium max-w-md mx-auto px-4 leading-relaxed">
                {error.includes('Failed to fetch') 
                  ? 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ Supabase ได้ กรุณาตรวจสอบการตั้งค่าคีย์เชื่อมต่อในไฟล์ .env และ .env.local หรือการเชื่อมต่อเครือข่าย'
                  : error}
              </p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <span className="text-5xl">📭</span>
              <p className="mt-4 text-sm text-slate-400 font-bold">ไม่พบข่าวสารในหมวดหมู่หรือคำค้นหาที่คุณเลือก</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredNews.map((news) => (
                <div key={news.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-300">
                  
                  {/* News Image / Banner */}
                  <div className="h-44 bg-slate-100 relative overflow-hidden group">
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

                  {/* News Card Header */}
                  <div className="p-6 space-y-3 flex-grow flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400">🗓️ {formatDateThai(news.created_at)}</span>
                    <h3 className="font-extrabold text-sm text-slate-900 line-clamp-2 leading-snug hover:text-blue-600 transition">
                      <Link href={`/news/${news.id}`}>{news.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 font-light mt-1 flex-grow">
                      {news.desc || news.content}
                    </p>
                  </div>

                  {/* Link Button */}
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

        </main>
      </div>

      <Footer />
    </div>
  );
}
