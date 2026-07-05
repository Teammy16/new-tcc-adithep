# BRIEF: ออกแบบเว็บวิทยาลัยพณิชยการธนบุรีใหม่ + Backend

> ไฟล์นี้สำหรับวางให้ AI (v0 / Lovable / Claude / Stitch) อ่านเป็น context ของงาน
> เว็บเดิม: https://www.panitthon.ac.th (WordPress — ข้อมูลเยอะแต่ดูรก)

---

## GOAL

ออกแบบและพัฒนาเว็บไซต์วิทยาลัยขึ้นใหม่ให้:
1. **ทันสมัย** — ใช้หลักการออกแบบที่ดี (hierarchy, spacing, typography, color, consistency)
2. **ใช้งานง่าย** — responsive ทุกอุปกรณ์ หาข้อมูลเจอเร็ว
3. **จัดการได้** — เจ้าหน้าที่เพิ่ม/แก้/ลบ ข่าว-เอกสารได้เองผ่านระบบหลังบ้าน (ไม่ต้องแก้โค้ด)

---

## TECH STACK

- **Frontend:** Next.js (App Router, JavaScript ไม่ใช้ TypeScript) + Tailwind CSS + Lucide icons
- **Backend:** Supabase (Database + Auth + Storage)
- **Deploy:** Vercel + GitHub

---

## PAGES (หน้าเว็บ)

### หน้าหลัก (ต้องมี)
| หน้า | เนื้อหา |
|------|---------|
| หน้าแรก (`/`) | Hero + ข่าวเด่น + ทางลัดระบบสารสนเทศ |
| เกี่ยวกับวิทยาลัย (`/about`) | ปรัชญา วิสัยทัศน์ อัตลักษณ์ |
| ข่าวประชาสัมพันธ์ (`/news`) | list ข่าวทั้งหมด |
| รายละเอียดข่าว (`/news/[id]`) | หน้าข่าวเดี่ยว (dynamic route) |
| บุคลากร (`/staff`) | ผู้บริหาร ครู แยกตามฝ่าย |
| แผนกวิชา (`/departments`) | สาขาที่เปิดสอน |
| ติดต่อเรา (`/contact`) | ที่อยู่ แผนที่ เบอร์โทร |

### หน้าเสริม (ถ้ามีเวลา)
ประกาศ/จัดซื้อจัดจ้าง, คลังภาพกิจกรรม, ดาวน์โหลดเอกสาร, รับสมัครนักศึกษา, ปฏิทินการศึกษา, หน้ารวมลิงก์ระบบสารสนเทศ (RMS, ศธ.02, ห้องสมุด ฯลฯ)

### หน้า Admin (backend)
| หน้า | ทำอะไร |
|------|---------|
| Login (`/admin/login`) | เจ้าหน้าที่ login |
| Dashboard (`/admin`) | จัดการข่าว/เอกสาร |
| เพิ่ม/แก้ข่าว (`/admin/news/...`) | CRUD ข่าว |

> **เริ่มจาก 3 หน้าก่อน:** หน้าแรก + ข่าว (list/detail) + เกี่ยวกับ — พอสำหรับโชว์ทั้ง frontend + backend

---

## FRONTEND REQUIREMENTS

- **Navbar** — โลโก้ + เมนูหลัก + responsive (hamburger บนมือถือ)
- **Hero Section** — ภาพ/ชื่อวิทยาลัย + ปุ่มทางลัดสำคัญ
- **ข่าวเด่น** — card ดึงจาก Supabase มาแสดง (ใช้ `.map()`)
- **ทางลัดระบบ** — grid ไอคอนลิงก์ไประบบต่างๆ
- **Footer** — ที่อยู่ ติดต่อ social ลิงก์สำคัญ
- **หน้ารายละเอียดข่าว** — dynamic route ตาม id
- ทุกหน้า **responsive** + ใช้หลักออกแบบ 5 ข้อ

---

## BACKEND REQUIREMENTS (Supabase)

ความสามารถหลัก: **CRUD** (Create / Read / Update / Delete)
- เพิ่มข่าว/เอกสารใหม่
- ดึงข้อมูลมาแสดงบนเว็บ
- แก้ไขข่าวที่มีอยู่
- ลบข่าวเก่า

ระบบที่ควรมี:
- **หน้า Admin** สำหรับจัดการข้อมูล
- **Login** (Supabase Auth) — เฉพาะเจ้าหน้าที่แก้ได้
- **Upload** (Supabase Storage) — แนบรูป/ไฟล์ PDF
- **จัดหมวดหมู่** — ข่าว/ประกาศ/จัดซื้อ

---

## DATABASE SCHEMA

### ตาราง `news`
```sql
id          bigint        primary key (auto)
title       text          -- หัวข้อข่าว
content     text          -- เนื้อหา
category    text          -- ประชาสัมพันธ์ / จัดซื้อ / ประกาศ
image_url   text          -- ลิงก์รูปภาพ
file_url    text          -- ลิงก์ไฟล์แนบ PDF (nullable)
created_at  timestamptz   default now()
```

### ตารางอื่นที่อาจมี
- `staff` — บุคลากร (name, position, department, photo_url)
- `departments` — แผนกวิชา (name, description, icon)
- `documents` — เอกสารดาวน์โหลด (title, category, file_url)
- `links` — ลิงก์ระบบสารสนเทศ (title, url, icon)

---

## DESIGN PRINCIPLES (ใช้ทุกหน้า)

1. **Visual Hierarchy** — สิ่งสำคัญเด่น (ขนาด สี น้ำหนัก)
2. **Spacing** — เว้นช่องให้หายใจ (`py-20`, `gap-6`)
3. **Typography** — ฟอนต์ 1-2 แบบ ลำดับขนาดชัด (ฟอนต์ไทย: Sarabun/Prompt/Kanit)
4. **Color** — 60-30-10, สีหลัก 1 + neutral + สีเน้น 1 (ใช้สีประจำโรงเรียนได้)
5. **Consistency** — ปุ่ม/การ์ด/มุมโค้ง ใช้ค่าเดียวกันทั้งเว็บ

---

## ⚠️ กฎการใช้ AI (ประหยัด Token)

> Free tier มี credit จำกัด + การ debug กิน credit เท่าการสร้างใหม่ ต้องแบ่งงานให้ดี

### ทำเอง (ไม่ใช้ AI) — ประหยัด credit
Navbar, Hero, Footer, About, Card ข่าว (`.map`), แก้สี/spacing/ฟอนต์
→ สิ่งเหล่านี้เขียนเองได้ (เรียนมาแล้ว)

### ใช้ AI — เฉพาะส่วนยาก
Layout ซับซ้อน, Animation, เชื่อม Supabase ครั้งแรก, หน้า Admin/CRUD, Auth, บั๊กที่หาไม่เจอ

### กฎ 5 ข้อ
1. ลองเขียนเองก่อน 10 นาที ค่อยถาม AI
2. 1 คำสั่ง = 1 เรื่อง (อย่าสั่ง "ทำทั้งหน้า")
3. เขียน prompt ชัดครั้งเดียว (ลดการ iterate)
4. copy error เต็มๆ ตอน debug
5. **เก็บ credit ครึ่งหนึ่งไว้ debug**

---

## PHASES

1. **ออกแบบ** — ศึกษาเว็บเดิม, หา reference, ร่าง layout, เลือกสี/ฟอนต์
2. **Frontend** — สร้างหน้าด้วย Next.js + Tailwind (ข้อมูลปลอมก่อน), แยก components, responsive
3. **Backend** — สร้าง Supabase DB, เชื่อมดึงข้อมูลจริง, ทำ admin + login + CRUD
4. **Deploy** — push GitHub → Vercel, ทดสอบ CRUD, นำเสนอ

---

## DELIVERABLES

- [ ] GitHub repo (public)
- [ ] Vercel URL ใช้งานได้จริง
- [ ] Screenshot ก่อน-หลัง (เทียบเว็บเดิม)
- [ ] อธิบายสั้นๆ: ใช้หลักออกแบบไหน + backend ทำอะไรได้

## GRADING
| เกณฑ์ | คะแนน |
|------|-------|
| ออกแบบสวย ใช้หลัก 5 ข้อ | 25% |
| Frontend ครบ + responsive | 25% |
| Backend ทำงานได้ (CRUD) | 25% |
| **อธิบายโค้ดตัวเองได้** | 25% |

> กติกา: ใช้ AI ช่วยได้ แต่ต้องเข้าใจและอธิบายได้ทุกส่วน — อธิบายไม่ได้ = ยังไม่ผ่าน

---

## ตัวอย่าง Prompt สำหรับ AI (แบบประหยัด token)

**❌ กว้างไป (เปลือง):** "ทำเว็บโรงเรียนให้หน่อย"

**✅ ชัด (ประหยัด):**
```
สร้าง Hero section สำหรับเว็บวิทยาลัย:
- ชื่อวิทยาลัย (h1 ใหญ่) + คำโปรยใต้ชื่อ
- ปุ่ม 2 อัน: "ข่าวประชาสัมพันธ์" และ "ติดต่อเรา"
- background gradient สี indigo→purple
- min-h-screen จัดกลาง
- responsive
ใช้ Next.js + Tailwind CSS
```

```
สร้าง component NewsCard รับ props: title, date, image_url, category
- รูปด้านบน, category เป็น badge, title, date
- rounded-xl, shadow, hover:scale-105
ใช้ Tailwind
```

```
เชื่อม Supabase ดึงข้อมูลตาราง news มาแสดงในหน้า /news
- เรียงตาม created_at ล่าสุดก่อน
- map เป็น NewsCard
ใช้ Supabase client ใน Next.js App Router
```
