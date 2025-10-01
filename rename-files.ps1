# PowerShell script to rename all files
$renameMappings = @{
    'index.html' = 'user-selection.html'
    'login.html' = 'staff-login.html'
    'student.html' = 'student-login.html'
    'staff-dashboard.html' = 'staff-student-management.html'
    'exam-management.html' = 'staff-exam-creation.html'
    'finalExam-management.html' = 'staff-exam-schedule.html'
    'assessment.html' = 'staff-exam-scoring.html'
    'grading.html' = 'staff-grade-approval.html'
    'project-reports.html' = 'staff-progress-reports.html'
    'project-documents.html' = 'staff-document-management.html'
    'student-info.html' = 'staff-student-details.html'
    'student-dashboard.html' = 'student-personal-info.html'
    'student-courses.html' = 'student-course-info.html'
    'BookanAppointment.html' = 'student-exam-booking.html'
    'project-exam.html' = 'student-exam-status.html'
    'project-progress.html' = 'student-progress-report.html'
    'project-upload.html' = 'student-document-upload.html'
}

Write-Host "Starting file renaming process..."

foreach ($oldName in $renameMappings.Keys) {
    $newName = $renameMappings[$oldName]
    if (Test-Path $oldName) {
        Write-Host "Renaming: $oldName -> $newName"
        Rename-Item $oldName $newName
    } else {
        Write-Host "File not found: $oldName"
    }
}

Write-Host "All files renamed successfully!"
Write-Host ""
Write-Host "NEW FILE STRUCTURE:"
Write-Host "==================="
Write-Host "🏠 Main & Auth:"
Write-Host "  - user-selection.html (หน้าเลือกประเภทผู้ใช้)"
Write-Host "  - staff-login.html (ล็อกอิน บุคลากร)"
Write-Host "  - student-login.html (ล็อกอิน นักศึกษา)"
Write-Host ""
Write-Host "👨‍🏫 Staff Portal:"
Write-Host "  - staff-student-management.html (จัดการข้อมูลนักศึกษา)"
Write-Host "  - staff-exam-creation.html (สร้างการสอบออนไลน์)"
Write-Host "  - staff-exam-schedule.html (ระบุวันพร้อมสอบ)"
Write-Host "  - staff-exam-scoring.html (ให้คะแนนสอบ)"
Write-Host "  - staff-grade-approval.html (การให้คะแนนและลงนาม)"
Write-Host "  - staff-progress-reports.html (รายงานความก้าวหน้า)"
Write-Host "  - staff-document-management.html (จัดการเอกสารโปรเจค)"
Write-Host "  - staff-student-details.html (ข้อมูลนักศึกษาเฉพาะคน)"
Write-Host ""
Write-Host "🎓 Student Portal:"
Write-Host "  - student-personal-info.html (ข้อมูลส่วนตัว)"
Write-Host "  - student-course-info.html (ข้อมูลรายวิชา)"
Write-Host "  - student-exam-booking.html (จองวันสอบ)"
Write-Host "  - student-exam-status.html (สถานะการสอบ)"
Write-Host "  - student-progress-report.html (รายงานความก้าวหน้า)"
Write-Host "  - student-document-upload.html (อัพโหลดเอกสาร)"