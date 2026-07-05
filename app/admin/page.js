'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

const CATEGORIES = ['ประชาสัมพันธ์', 'จัดซื้อจัดจ้าง', 'ประกาศ'];

export default function AdminDashboardPage() {
  const router = useRouter();
  
  // Auth state
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // News list state
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form input states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('ประชาสัมพันธ์');
  const [formDesc, setFormDesc] = useState('');
  const [formContent, setFormContent] = useState('');
  
  // File upload states
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentFileUrl, setCurrentFileUrl] = useState('');

  // ตรวจสอบเซสชันผู้ใช้งานบน Supabase Auth
  useEffect(() => {
    async function checkAuth() {
      try {
        setAuthLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
          router.push('/admin/login');
        } else {
          setSession(session);
          fetchNews();
        }
      } catch (err) {
        console.error('Session check error:', err);
        router.push('/admin/login');
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNewsList(data || []);
    } catch (err) {
      console.error('Error fetching news:', err);
      showToast('ไม่สามารถดึงข้อมูลข่าวได้: ' + err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      showToast('ออกจากระบบสำเร็จแล้ว');
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Open modal for Create
  const openCreateModal = () => {
    setSelectedNews(null);
    setFormTitle('');
    setFormCategory('ประชาสัมพันธ์');
    setFormDesc('');
    setFormContent('');
    setImageFile(null);
    setPdfFile(null);
    setCurrentImageUrl('');
    setCurrentFileUrl('');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const openEditModal = (newsItem) => {
    setSelectedNews(newsItem);
    setFormTitle(newsItem.title);
    setFormCategory(newsItem.category || 'ประชาสัมพันธ์');
    setFormDesc(newsItem.desc || '');
    setFormContent(newsItem.content || '');
    setImageFile(null);
    setPdfFile(null);
    setCurrentImageUrl(newsItem.image_url || '');
    setCurrentFileUrl(newsItem.file_url || '');
    setIsModalOpen(true);
  };

  // Open delete confirmation modal
  const openDeleteConfirm = (newsItem) => {
    setSelectedNews(newsItem);
    setIsDeleteConfirmOpen(true);
  };

  // Helper function to upload file to Supabase Storage
  const uploadFileToStorage = async (file, folderPath) => {
    if (!file) return null;
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const path = `${folderPath}/${Date.now()}_${cleanFileName}`;
    
    // อัปโหลดไฟล์ไปยัง bucket "news-assets"
    const { data, error } = await supabase.storage
      .from('news-assets')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      throw new Error(`การอัปโหลดไฟล์ล้มเหลว: ${error.message}`);
    }

    // ดึงลิงก์ Public URL กลับมา
    const { data: { publicUrl } } = supabase.storage
      .from('news-assets')
      .getPublicUrl(data.path);

    return publicUrl;
  };

  // Handle Form Submit (Create or Update with upload support)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      showToast('กรุณากรอกหัวข้อข่าวและเนื้อหาหลักให้ครบถ้วน', 'error');
      return;
    }

    try {
      setIsSaving(true);
      
      // 1. อัปโหลดรูปภาพหลัก (ถ้ามีการเลือกภาพใหม่)
      let finalImageUrl = currentImageUrl;
      if (imageFile) {
        showToast('กำลังอัปโหลดรูปภาพประกอบ...', 'success');
        finalImageUrl = await uploadFileToStorage(imageFile, 'images');
      }

      // 2. อัปโหลดเอกสาร PDF (ถ้ามีการเลือกไฟล์ใหม่)
      let finalFileUrl = currentFileUrl;
      if (pdfFile) {
        showToast('กำลังอัปโหลดไฟล์ PDF...', 'success');
        finalFileUrl = await uploadFileToStorage(pdfFile, 'documents');
      }

      const payload = {
        title: formTitle,
        category: formCategory,
        desc: formDesc.trim() || formContent.slice(0, 100) + '...',
        content: formContent,
        image_url: finalImageUrl || null,
        file_url: finalFileUrl || null
      };

      if (selectedNews) {
        // อัปเดตข่าวสารเดิม
        const { error } = await supabase
          .from('news')
          .update(payload)
          .eq('id', selectedNews.id);

        if (error) throw error;
        showToast('แก้ไขข้อมูลข่าวเรียบร้อยแล้ว');
      } else {
        // เพิ่มข่าวสารชิ้นใหม่
        const { error } = await supabase
          .from('news')
          .insert([payload]);

        if (error) throw error;
        showToast('เพิ่มข่าวประชาสัมพันธ์สำเร็จแล้ว');
      }

      setIsModalOpen(false);
      fetchNews();
    } catch (err) {
      console.error('Error saving news:', err);
      showToast('ไม่สามารถบันทึกข้อมูลได้: ' + err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete News
  const handleDeleteNews = async () => {
    if (!selectedNews) return;
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', selectedNews.id);

      if (error) throw error;
      
      showToast('ลบข้อมูลข่าวประชาสัมพันธ์เรียบร้อยแล้ว');
      setIsDeleteConfirmOpen(false);
      setSelectedNews(null);
      fetchNews();
    } catch (err) {
      console.error('Error deleting news:', err);
      showToast('เกิดข้อผิดพลาดในการลบข่าว: ' + err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-slate-400">กำลังตรวจสอบข้อมูลสิทธิ์เจ้าหน้าที่...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 font-sans">
      <div>
        <Navbar />

        <main className="max-w-6xl mx-auto px-6 py-10">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className={`fixed top-24 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl transition-all duration-300 transform translate-y-0 text-xs font-bold flex items-center gap-2 border bg-white ${
              toastType === 'success' ? 'border-emerald-100 text-emerald-700 bg-emerald-50' : 'border-rose-100 text-rose-700 bg-rose-50'
            }`}>
              <span>{toastType === 'success' ? '✅' : '❌'}</span>
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Header Panel */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-4 w-1.5 rounded-full bg-blue-600"></span>
                <h1 className="text-lg font-black text-slate-900 tracking-tight">แผงควบคุมระบบ (Admin)</h1>
              </div>
              <p className="text-xs text-slate-400 font-bold">แอดมิน: <span className="text-slate-600">{session?.user?.email}</span></p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={openCreateModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition duration-300 shadow-md shadow-blue-500/10 flex items-center gap-1.5 active:scale-98 cursor-pointer"
              >
                <span>➕</span> เพิ่มข่าวสารใหม่
              </button>
              <button
                onClick={handleLogout}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs px-4 py-3 rounded-xl transition duration-300 flex items-center gap-1.5 active:scale-98 cursor-pointer"
              >
                <span>📴</span> ออกจากระบบ
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mt-6">
            {isLoading ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-slate-400 font-bold">กำลังโหลดข่าวสาร...</p>
              </div>
            ) : newsList.length === 0 ? (
              <div className="py-20 text-center space-y-2">
                <span className="text-5xl">📭</span>
                <p className="text-sm text-slate-400 font-bold">ไม่พบข้อมูลข่าวสารในระบบ กดปุ่ม "เพิ่มข่าวสารใหม่" เพื่อเริ่มสร้าง</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4 w-28 text-center">รูปภาพ</th>
                      <th className="px-6 py-4">หัวข้อข่าว</th>
                      <th className="px-6 py-4 w-40">หมวดหมู่</th>
                      <th className="px-6 py-4 w-44">วันที่สร้าง</th>
                      <th className="px-6 py-4 w-36 text-center">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-medium">
                    {newsList.map((news) => (
                      <tr key={news.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 text-center">
                          {news.image_url ? (
                            <img
                              src={news.image_url}
                              alt={news.title}
                              className="w-14 h-10 object-cover rounded-lg border border-slate-100 mx-auto"
                            />
                          ) : (
                            <div className="w-14 h-10 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center border border-slate-100 text-lg mx-auto">
                              🖼️
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-extrabold text-slate-800 line-clamp-1 leading-snug">{news.title}</div>
                          <div className="text-[10px] text-slate-400 font-light mt-0.5 line-clamp-1 flex gap-2">
                            {news.file_url && <span className="text-blue-600 font-bold">📎 มีไฟล์ PDF</span>}
                            <span>{news.desc || news.content}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-[10px] font-bold border border-blue-100">
                            {news.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-400">
                          🗓️ {formatDateThai(news.created_at)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEditModal(news)}
                              className="p-2 hover:bg-blue-50 text-blue-600 rounded-xl transition hover:scale-105 active:scale-95 cursor-pointer"
                              title="แก้ไขข่าว"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => openDeleteConfirm(news)}
                              className="p-2 hover:bg-rose-50 text-rose-600 rounded-xl transition hover:scale-105 active:scale-95 cursor-pointer"
                              title="ลบข่าว"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Create & Edit Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[85vh] overflow-y-auto transform scale-100 transition-all duration-300">
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-3xl">
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-1.5 rounded-full bg-blue-600"></span>
                    <h2 className="text-base font-black text-slate-900">
                      {selectedNews ? '✏️ แก้ไขข้อมูลข่าวประชาสัมพันธ์' : '➕ เพิ่มข่าวประชาสัมพันธ์ใหม่'}
                    </h2>
                  </div>
                  <button
                    onClick={() => { if (!isSaving) setIsModalOpen(false); }}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 flex items-center justify-center font-bold transition cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
                  
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-2">หมวดหมู่ข่าวสาร</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* News Title */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-2">หัวข้อข่าวประชาสัมพันธ์</label>
                    <input
                      type="text"
                      placeholder="ป้อนชื่อหัวข้อประกาศหลัก..."
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                      required
                    />
                  </div>

                  {/* Supabase Storage File uploads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                    
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold text-slate-700">รูปภาพประกอบข่าวสาร</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0] || null)}
                        className="w-full text-xs font-bold text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 file:transition file:cursor-pointer"
                      />
                      {currentImageUrl && !imageFile && (
                        <div className="flex items-center gap-2 mt-2">
                          <img src={currentImageUrl} className="w-12 h-8 object-cover rounded border border-slate-200" />
                          <span className="text-[10px] font-bold text-slate-400">รูปเดิมที่ใช้งานอยู่</span>
                        </div>
                      )}
                    </div>

                    {/* PDF Upload */}
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold text-slate-700">เอกสารแนบ PDF (ถ้ามี)</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setPdfFile(e.target.files[0] || null)}
                        className="w-full text-xs font-bold text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-amber-50 file:text-amber-600 hover:file:bg-amber-100 file:transition file:cursor-pointer"
                      />
                      {currentFileUrl && !pdfFile && (
                        <div className="mt-2 text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <span>📎</span> <a href={currentFileUrl} target="_blank" className="text-blue-600 hover:underline">มีเอกสารแนบเดิมอยู่แล้ว</a>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Summary / Description */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-2">บทสรุปย่อ (สำหรับแสดงผลที่การ์ดหน้าแรก)</label>
                    <textarea
                      placeholder="สรุปข้อความประกาศสั้นๆ กระชับเนื้อหา..."
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
                    />
                  </div>

                  {/* News Content */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-2">เนื้อหาข่าวฉบับเต็ม</label>
                    <textarea
                      placeholder="กรอกเนื้อหาข่าวสาร ข้อความ และช่องทางการติดต่ออย่างละเอียดทั้งหมดที่นี่..."
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-y min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => setIsModalOpen(false)}
                      className="bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 text-slate-700 font-extrabold text-xs px-5 py-3 rounded-xl transition cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition duration-300 shadow-md shadow-blue-500/10 active:scale-98 flex items-center gap-2 cursor-pointer"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          กำลังดำเนินการ...
                        </>
                      ) : (
                        '💾 บันทึกข่าวสาร'
                      )}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteConfirmOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md p-6 transform scale-100 transition-all duration-300 text-center space-y-4">
                <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-2xl mx-auto shadow-inner">
                  ⚠️
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-900">ยืนยันการลบข่าวสารประชาสัมพันธ์</h3>
                  <p className="text-[11px] font-bold text-slate-400 px-3 truncate">
                    หัวข้อ: "{selectedNews?.title}"
                  </p>
                  <p className="text-[10px] text-rose-500 font-extrabold">ข้อมูลและไฟล์ประกอบจะถูกถอนออกจากระบบ Supabase ทันทีโดยถาวร</p>
                </div>
                <div className="flex items-center justify-center gap-2.5 pt-2">
                  <button
                    disabled={isSaving}
                    onClick={() => {
                      setIsDeleteConfirmOpen(false);
                      setSelectedNews(null);
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs px-5 py-2.5 rounded-xl transition active:scale-98 cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    disabled={isSaving}
                    onClick={handleDeleteNews}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition active:scale-98 shadow-md shadow-rose-500/10 cursor-pointer flex items-center gap-1.5 justify-center"
                  >
                    {isSaving ? 'กำลังลบ...' : '🔥 ยืนยันลบข้อมูล'}
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
}
