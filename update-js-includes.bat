@echo off
echo Updating HTML files to use navigation.js...

rem List of HTML files to update
set "files=project-reports.html finalExam-management.html assessment.html project-documents.html student-info.html BookanAppointment.html project-exam.html grading.html student-dashboard.html student-courses.html project-progress.html project-upload.html"

for %%f in (%files%) do (
    if exist "%%f" (
        echo Updating %%f...
        
        rem Check if navigation.js is already included
        findstr /c:"navigation.js" "%%f" >nul
        if errorlevel 1 (
            rem Add navigation.js before closing body tag
            powershell -Command "(Get-Content '%%f') -replace '</body>', '    <!-- JavaScript Files -->`n    <script src=\"navigation.js\"></script>`n</body>' | Set-Content '%%f'"
            echo   - Added navigation.js to %%f
        ) else (
            echo   - %%f already includes navigation.js
        )
    ) else (
        echo   - %%f not found, skipping
    )
)

echo.
echo Update completed!
echo All HTML files now include navigation.js for mobile menu functionality.
pause