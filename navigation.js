// Navigation JavaScript for KMUTNB Student Management System
// ไฟล์ JavaScript สำหรับระบบจัดการนักศึกษา มจพ.

const USER_STORAGE_KEY = 'kms_user';

const STAFF_NAV_ITEMS = {
    staff: [
        {
            href: 'staff-student-management.html',
            icon: '📊',
            label: 'จัดการข้อมูลนักศึกษา',
            activeMatches: ['staff-dashboard.html', 'staff-student-details.html']
        },
        {
            href: 'staff-exam-creation.html',
            icon: '📋',
            label: 'นักศึกษายื่นหัวข้อ',
            activeMatches: ['exam-management.html']
        },
        {
            href: 'staff-exam-schedule.html',
            icon: '📄',
            label: 'คำขอยื่นสอบ',
            activeMatches: ['finalExam-management.html']
        },
        {
            href: 'staff-document-management.html',
            icon: '📁',
            label: 'เอกสารโปรเจค',
            activeMatches: ['project-documents.html', 'project-documents-backup.html']
        }
    ],
    advisor: [
        {
            href: 'staff-student-management.html',
            icon: '📊',
            label: 'จัดการข้อมูลนักศึกษา',
            activeMatches: ['staff-dashboard.html', 'staff-student-details.html']
        },
        {
            href: 'staff-progress-reports.html',
            icon: '📈',
            label: 'รายงานความก้าวหน้า',
            activeMatches: ['project-reports.html']
        },
        {
            href: 'staff-exam-scoring.html',
            icon: '📝',
            label: 'คะแนนสอบ',
            activeMatches: ['assessment.html', 'grading.html']
        },
        {
            href: 'staff-grade-approval.html',
            icon: '📝',
            label: 'ลงนาม'
        },
        {
            href: 'staff-document-management.html',
            icon: '📁',
            label: 'เอกสารโปรเจค',
            activeMatches: ['project-documents.html', 'project-documents-backup.html']
        }
    ],
    instructor: [
        {
            href: 'staff-progress-reports.html',
            icon: '📈',
            label: 'รายงานความก้าวหน้า',
            activeMatches: ['project-reports.html']
        },
        {
            href: 'staff-exam-scoring.html',
            icon: '📝',
            label: 'คะแนนสอบ',
            activeMatches: ['assessment.html', 'grading.html']
        },
        {
            href: 'staff-grade-approval.html',
            icon: '📝',
            label: 'ลงนาม'
        },
        {
            href: 'staff-document-management.html',
            icon: '📁',
            label: 'เอกสารโปรเจค',
            activeMatches: ['project-documents.html', 'project-documents-backup.html']
        }
    ]
};

const ROLE_LABELS = {
    staff: 'บุคลากร',
    advisor: 'ครูที่ปรึกษา',
    instructor: 'ครูประจำวิชา',
    student: 'นักศึกษา'
};

document.addEventListener('DOMContentLoaded', function() {
    applyUserContext();
    initializeNavigation();
    initializeSearch();
    initializePagination();
});

function getStoredUser() {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        console.warn('ไม่สามารถอ่านข้อมูลผู้ใช้จาก localStorage ได้', error);
        return null;
    }
}

function applyUserContext() {
    const navbars = document.querySelectorAll('nav.navbar[data-nav-type]');
    if (!navbars.length) {
        return;
    }

    const storedUser = getStoredUser();
    let redirectTarget = null;

    navbars.forEach(navbar => {
        if (redirectTarget) {
            return;
        }

        const navType = navbar.dataset.navType;

        if (navType === 'staff') {
            if (!storedUser || !STAFF_NAV_ITEMS[storedUser.role]) {
                redirectTarget = 'staff-login.html';
                return;
            }
            const { hasActive, firstHref } = buildStaffNavigation(navbar, storedUser);

            if (!redirectTarget && firstHref && !hasActive) {
                redirectTarget = firstHref;
            }
        } else if (navType === 'student') {
            if (!storedUser || storedUser.role !== 'student') {
                redirectTarget = 'student-login.html';
                return;
            }
            populateUserInfo(navbar, storedUser);
            attachLogoutHandler(navbar);
        }
    });

    if (redirectTarget) {
        window.location.href = redirectTarget;
    }
}

function buildStaffNavigation(navbar, user) {
    const navMenu = navbar.querySelector('.nav-menu');
    if (!navMenu) {
        return { hasActive: false, firstHref: null };
    }

    const navItems = STAFF_NAV_ITEMS[user?.role] || [];
    const currentPage = getCurrentPage();

    navMenu.innerHTML = '';

    let hasActive = false;
    let firstHref = null;

    navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.className = 'nav-link';
        link.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.label}`;

        if (!firstHref && item.href) {
            firstHref = item.href;
        }

        if (isActiveNavLink(item, currentPage)) {
            link.classList.add('active');
            hasActive = true;
        }

        navMenu.appendChild(link);
    });

    populateUserInfo(navbar, user);
    attachLogoutHandler(navbar);

    return { hasActive, firstHref };
}

function populateUserInfo(navbar, user) {
    const userNameEl = navbar.querySelector('[data-user-name]');
    const userRoleEl = navbar.querySelector('[data-user-role]');

    if (userNameEl) {
        userNameEl.textContent = user?.displayName || user?.username || 'ผู้ใช้งาน';
    }

    if (userRoleEl) {
        const roleKey = user?.role;
        userRoleEl.textContent = user?.roleLabel || ROLE_LABELS[roleKey] || '';
    }
}

function attachLogoutHandler(navbar) {
    const logoutLink = navbar.querySelector('[data-logout]');
    if (!logoutLink) {
        return;
    }

    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem(USER_STORAGE_KEY);
        window.location.href = 'user-selection.html';
    });
}

function getCurrentPage() {
    const path = window.location.pathname;
    const segments = path.split('/');
    return segments[segments.length - 1] || 'index.html';
}

function isActiveNavLink(item, currentPage) {
    if (!item) {
        return false;
    }

    if (matchesPath(item.href, currentPage)) {
        return true;
    }

    if (Array.isArray(item.activeMatches)) {
        return item.activeMatches.some(match => matchesPath(match, currentPage));
    }

    return false;
}

function matchesPath(targetHref, currentPage) {
    if (!targetHref) {
        return false;
    }

    if (targetHref === currentPage) {
        return true;
    }

    return window.location.pathname.endsWith(`/${targetHref}`);

    return window.location.pathname.endsWith(`/${targetHref}`);
}

// Mobile menu toggle functionality
function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (mobileToggle && navMenu) {
        // Toggle menu on burger click
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class on both elements
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link (for better UX)
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    }
}

// Search functionality (for pages with search)
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const yearFilter = document.getElementById('yearFilter');
    
    if (searchInput || statusFilter || yearFilter) {
        // Real-time search
        if (searchInput) {
            searchInput.addEventListener('input', searchStudents);
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', searchStudents);
        }
        if (yearFilter) {
            yearFilter.addEventListener('change', searchStudents);
        }
    }
}

// Search students function
function searchStudents() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    const yearFilter = document.getElementById('yearFilter')?.value || '';
    
    const studentsTable = document.getElementById('studentsTable');
    if (!studentsTable) return;
    
    const rows = studentsTable.querySelectorAll('tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const studentName = row.querySelector('.student-details h4')?.textContent.toLowerCase() || '';
        const studentCode = row.querySelector('.student-details p')?.textContent.toLowerCase() || '';
        const statusBadge = row.querySelector('.status-badge');
        const year = row.cells[2]?.textContent || '';
        
        let showRow = true;
        
        // Search term filter
        if (searchTerm && !studentName.includes(searchTerm) && !studentCode.includes(searchTerm)) {
            showRow = false;
        }
        
        // Status filter
        if (statusFilter && statusBadge) {
            const statusClass = statusBadge.className;
            if (!statusClass.includes(`status-${statusFilter}`)) {
                showRow = false;
            }
        }
        
        // Year filter
        if (yearFilter && year !== yearFilter) {
            showRow = false;
        }
        
        if (showRow) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update count if element exists
    const studentCount = document.getElementById('studentCount');
    if (studentCount) {
        studentCount.textContent = visibleCount;
    }
}

// Pagination functionality
function initializePagination() {
    const paginationButtons = document.querySelectorAll('.pagination button');
    
    paginationButtons.forEach(button => {
        if (!button.disabled && !button.classList.contains('active')) {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                if (!this.textContent.includes('Previous') && !this.textContent.includes('Next')) {
                    this.classList.add('active');
                }
                
                // Here you can add logic to load different pages
                console.log('Page changed to:', this.textContent);
            });
        }
    });
}

// Form validation functions
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Show notification messages
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 9999;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export functions for global use
window.searchStudents = searchStudents;
window.validateForm = validateForm;
window.showNotification = showNotification;
window.formatDate = formatDate;
window.formatTime = formatTime;