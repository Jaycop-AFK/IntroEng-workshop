# Navigation System - ระบบจัดการการนำทาง

## ไฟล์ที่สำคัญ

### `navigation.js`
ไฟล์ JavaScript หลักที่ใช้กับทุกหน้าในระบบ มีฟังก์ชันการทำงานดังนี้:

#### ฟีเจอร์หลัก:
- **Mobile Menu (Burger Menu)** - เมนูแบบ responsive สำหรับมือถือ
- **Search Functionality** - ระบบค้นหาข้อมูลนักศึกษา
- **Form Validation** - ตรวจสอบความถูกต้องของฟอร์ม
- **Notification System** - แสดงข้อความแจ้งเตือน
- **Pagination** - ระบบแบ่งหน้า

#### ฟังก์ชันที่สามารถเรียกใช้:
```javascript
// ค้นหานักศึกษา
searchStudents()

// ตรวจสอบฟอร์ม
validateForm('formId')

// แสดงข้อความแจ้งเตือน
showNotification('ข้อความ', 'success') // success, error, info

// จัดรูปแบบวันที่
formatDate('2023-10-01')

// จัดรูปแบบเวลา
formatTime('14:30')
```

### `navigation.css` (สำหรับ Student Pages)
CSS สำหรับหน้า student ที่ใช้ gradient สีม่วง:
- Mobile menu animations
- Responsive design
- Student portal styling

### `staff-navigation.css` (สำหรับ Staff Pages)
CSS สำหรับหน้า staff ที่ใช้สีส้ม KMUTNB:
- Staff portal styling
- Mobile menu สำหรับ staff

### `navigation-enhancements.css`
CSS เสริมสำหรับปรับปรุงการแสดงผล:
- Animation สำหรับ notification
- สไตล์สำหรับ form validation
- ปรับปรุง mobile menu

## การใช้งาน

### ในไฟล์ HTML ใหม่
เพิ่มบรรทัดนี้ก่อน `</body>`:
```html
<!-- JavaScript Files -->
<script src="navigation.js"></script>
```

### สำหรับหน้า Student
เพิ่มใน `<head>`:
```html
<link rel="stylesheet" href="navigation.css">
```

### สำหรับหน้า Staff
เพิ่มใน `<head>`:
```html
<link rel="stylesheet" href="staff-navigation.css">
```

### สำหรับไฟล์ที่มี CSS เสริม
เพิ่มใน `<head>`:
```html
<link rel="stylesheet" href="navigation-enhancements.css">
```

## การทดสอบ

### 🧪 ไฟล์ทดสอบ
เปิดไฟล์ `test-navigation.html` เพื่อทดสอบระบบ navigation:
1. **Mobile Menu**: ลดขนาดหน้าจอหรือเปิดด้วยมือถือ
2. **Search**: ทดสอบการค้นหาในหน้า staff-dashboard
3. **Notifications**: คลิกปุ่มทดสอบใน test page
4. **Form Validation**: ส่งฟอร์มที่มีช่องว่าง

### 🔧 การแก้ไขปัญหา Navigation

#### ปัญหาที่พบบ่อย:
1. **Burger menu ไม่ทำงาน**
   - ✅ ตรวจสอบว่ามี `navigation.js` ใน HTML
   - ✅ ตรวจสอบ CSS สำหรับ `.mobile-menu-toggle`
   - ✅ เปิด Developer Tools ดู Console errors

2. **เมนูไม่แสดงบนมือถือ**
   - ✅ ตรวจสอบ CSS media queries
   - ✅ ตรวจสอบ `.nav-menu.active` styles
   - ✅ ใช้ `test-navigation.html` สำหรับ debug

3. **JavaScript ไม่ทำงาน**
   - ✅ ตรวจสอบ path ของ `navigation.js`
   - ✅ ดู Browser Console สำหรับ errors
   - ✅ ตรวจสอบว่า DOM โหลดเสร็จแล้ว

## ไฟล์ที่อัปเดตแล้ว

### ✅ ไฟล์ Staff Portal:
- `staff-dashboard.html` - ✅ ใช้ navigation.js
- `exam-management.html` - ✅ ใช้ navigation.js  
- `project-reports.html` - ✅ ใช้ navigation.js
- `assessment.html` - ✅ ใช้ navigation.js
- `grading.html` - ✅ ใช้ navigation.js
- `project-documents.html` - ✅ ใช้ navigation.js
- `finalExam-management.html` - ✅ ใช้ navigation.js
- `student-info.html` - ✅ ใช้ navigation.js

### ✅ ไฟล์ Student Portal:
- `student-dashboard.html` - ✅ ใช้ navigation.js
- `student-courses.html` - ✅ ใช้ navigation.js (ลบ JS เก่าแล้ว)
- `project-progress.html` - ✅ ใช้ navigation.js + file upload script
- `project-exam.html` - ✅ ใช้ navigation.js + sorting script
- `BookanAppointment.html` - ✅ ใช้ navigation.js
- `project-upload.html` - ✅ ใช้ navigation.js + search script

### 🧪 ไฟล์ทดสอบ:
- `test-navigation.html` - หน้าทดสอบ navigation system

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## หมายเหตุสำคัญ

### ⚠️ การแก้ไขล่าสุด:
1. **แก้ไข `navigation.css`** - เพิ่ม mobile menu styles ที่สมบูรณ์
2. **อัปเดต student pages** - ใช้ `navigation.js` แทน inline scripts
3. **สร้าง test page** - `test-navigation.html` สำหรับ debugging
4. **รวม JavaScript เดิม** - เก็บ scripts สำหรับ file upload, search etc.

### 💡 Tips สำหรับการใช้งาน:
- ไฟล์ `navigation.js` จะโหลดเมื่อ DOM พร้อม
- Mobile menu จะปิดอัตโนมัติเมื่อคลิกลิงก์
- Notification จะหายอัตโนมัติใน 5 วินาที
- ใช้ `test-navigation.html` เพื่อ debug ปัญหา