// ในไฟล์ app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="th" className="scroll-smooth">
      {/* เติมคลาสต่อต้านความหยักของฟอนต์ (antialiased) เพื่อความคมสวยของดีไซน์ */}
      <body className="antialiased bg-slate-50/50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}