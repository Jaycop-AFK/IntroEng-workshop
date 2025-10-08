# KMUTNB Student Management Prototype

This project contains static HTML prototypes for the KMUTNB student management portal, including simple role-based navigation for staff and students.

## 🔐 Demo Credentials

| Role | Username / ID | Password | Landing Page |
|------|----------------|----------|---------------|
| นักศึกษา (Student) | `6806022510602` | `1234` | Student personal information form |
| บุคลากร (Staff Admin) | `tuser123` | `1234` | รายการจัดการข้อมูลนักศึกษา |

After logging in as staff you can choose one of the available roles from the dropdown:

- **บุคลากร (Staff Admin)** – access to student management, topic submissions, exam requests, and document management.
- **ครูที่ปรึกษา (Advisor)** – access to student management, progress reports, scoring, signing, and project documents.
- **ครูประจำวิชา (Instructor)** – access to progress reports, scoring, signing, and project documents.

> ℹ️ Credentials are validated client-side and stored in `localStorage` only for the duration of the session.

## 🚀 Usage

1. Open `user-selection.html` and choose นักศึกษา or บุคลากร.
2. Enter the credentials above.
3. For staff, pick the desired role from the dropdown to load its navigation shortcuts.
4. Use the navigation bar to explore the corresponding prototype screens.

To end a session, click **ออกจากระบบ** in the navigation bar or clear the browser storage.
