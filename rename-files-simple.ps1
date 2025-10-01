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