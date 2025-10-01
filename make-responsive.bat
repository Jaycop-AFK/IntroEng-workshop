@echo off
echo Adding responsive.css to all HTML files...

rem Update remaining staff pages
set "staff_pages=exam-management.html project-reports.html assessment.html grading.html project-documents.html finalExam-management.html student-info.html"

for %%f in (%staff_pages%) do (
    if exist "%%f" (
        echo Adding responsive.css to %%f...
        powershell -Command "(Get-Content '%%f') -replace '<link rel=\"stylesheet\" href=\"staff-navigation.css\">', '<link rel=\"stylesheet\" href=\"staff-navigation.css\">`n    <link rel=\"stylesheet\" href=\"responsive.css\">' | Set-Content '%%f'"
    )
)

rem Update remaining student pages  
set "student_pages=student-courses.html project-progress.html project-exam.html BookanAppointment.html project-upload.html"

for %%f in (%student_pages%) do (
    if exist "%%f" (
        echo Adding responsive.css to %%f...
        powershell -Command "(Get-Content '%%f') -replace '</head>', '    <link rel=\"stylesheet\" href=\"responsive.css\">`n</head>' | Set-Content '%%f'"
    )
)

echo.
echo ✅ Responsive CSS added to all HTML files!
echo 📱 Your website is now fully responsive!
echo.
echo 🧪 Test your responsive design:
echo 1. Open any HTML file in browser
echo 2. Press F12 to open Developer Tools
echo 3. Click device toggle button (phone icon)
echo 4. Test different screen sizes
echo.
pause