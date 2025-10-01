# PowerShell script to update all file links
$files = @(
    "exam-management.html",
    "project-reports.html", 
    "finalExam-management.html",
    "assessment.html",
    "grading.html",
    "project-documents.html",
    "student-info.html",
    "student-dashboard.html",
    "student-courses.html",
    "BookanAppointment.html",
    "project-exam.html",
    "project-progress.html",
    "project-upload.html",
    "student.html",
    "login.html"
)

# Define mappings
$mappings = @{
    'staff-dashboard\.html' = 'staff-student-management.html'
    'exam-management\.html' = 'staff-exam-creation.html'
    'project-reports\.html' = 'staff-progress-reports.html'
    'finalExam-management\.html' = 'staff-exam-schedule.html'
    'assessment\.html' = 'staff-exam-scoring.html'
    'grading\.html' = 'staff-grade-approval.html'
    'project-documents\.html' = 'staff-document-management.html'
    'student-info\.html' = 'staff-student-details.html'
    'student-dashboard\.html' = 'student-personal-info.html'
    'student-courses\.html' = 'student-course-info.html'
    'BookanAppointment\.html' = 'student-exam-booking.html'
    'project-exam\.html' = 'student-exam-status.html'
    'project-progress\.html' = 'student-progress-report.html'
    'project-upload\.html' = 'student-document-upload.html'
    'student\.html' = 'student-login.html'
    'login\.html' = 'staff-login.html'
    'index\.html' = 'user-selection.html'
}

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Updating $file..."
        $content = Get-Content $file -Raw
        foreach ($old in $mappings.Keys) {
            $new = $mappings[$old]
            $content = $content -replace $old, $new
        }
        Set-Content $file $content -NoNewline
    }
}

Write-Host "All links updated successfully!"