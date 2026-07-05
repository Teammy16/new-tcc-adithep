'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../../lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ตรวจสอบว่าถ้าผู้ใช้ล็อกอินอยู่แล้ว ให้นำทางไปหน้า /admin
  useEffect(() => {
    async function checkActiveSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/admin');
        }
      } catch (err) {
        console.error('Error getting active session:', err);
      }
    }
    checkActiveSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg('');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      if (data?.session) {
        router.push('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('ข้อมูลเข้าสู่ระบบไม่ถูกต้อง: ' + (err.message === 'Invalid login credentials' ? 'อีเมลหรือรหัสผ่านผิดพลาด' : err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 font-sans">
      <div>
        <Navbar />

        <main className="max-w-md mx-auto my-16 px-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>
            
            <div className="text-center space-y-3 mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-inner shadow-blue-500/10">
                🔐
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">เข้าสู่ระบบผู้ดูแลระบบ</h1>
              <p className="text-xs text-slate-400 font-bold">เชื่อมต่อการตรวจสอบผ่านระบบ Supabase Auth</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* อีเมลผู้ใช้ */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-2">อีเมลแอดมิน (Email)</label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
                  required
                />
              </div>

              {/* รหัสผ่าน */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-2">รหัสผ่าน (Password)</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
                  required
                />
              </div>

              {errorMsg && (
                <p className="text-[11px] font-bold text-rose-600 bg-rose-50 px-3 py-2.5 rounded-lg border border-rose-100 leading-normal">
                  ⚠️ {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-extrabold text-xs py-3 rounded-xl transition duration-300 shadow-md shadow-blue-500/20 active:scale-98 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  'เข้าสู่ระบบ (Sign In)'
                )}
              </button>

            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
