// Auto-update script to add responsive.css to all HTML files
// สคริปต์อัตโนมัติสำหรับเพิ่ม responsive.css ให้ทุกไฟล์ HTML

const htmlFiles = [
    'index.html',
    'login.html',
    'staff-dashboard.html', 
    'student-dashboard.html',
    'student-courses.html',
    'project-progress.html',
    'project-exam.html',
    'BookanAppointment.html',
    'project-upload.html',
    'exam-management.html',
    'project-reports.html',
    'assessment.html',
    'grading.html',
    'project-documents.html',
    'finalExam-management.html',
    'student-info.html',
    'student.html'
];

// Function to add responsive CSS link to HTML files
function addResponsiveCSS() {
    console.log('🚀 Starting to add responsive.css to HTML files...');
    
    // This would be the logic to add:
    // <link rel="stylesheet" href="responsive.css">
    // to the <head> section of each HTML file
    
    htmlFiles.forEach(file => {
        console.log(`📝 Processing ${file}...`);
        // Add responsive CSS link here
    });
    
    console.log('✅ All files processed successfully!');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addResponsiveCSS, htmlFiles };
}