// ===========================
// NAVBAR FUNCTIONALITY
// ===========================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
    updateActiveNavLink();
});

// Update active nav link based on section in view
function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ===========================
// SMOOTH SCROLLING
// ===========================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// ===========================
// HERO IMAGE HANDLING
// ===========================

const heroImage = document.getElementById('heroImage');

// Simple image load handler
heroImage.addEventListener('load', () => {
    console.log('Foto profil berhasil dimuat!');
});

// Handle image error
heroImage.addEventListener('error', () => {
    console.log('Foto profil tidak ditemukan di assets/images/profile.jpg');
});

// ===========================
// BACK TO TOP BUTTON
// ===========================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, project cards, about content, etc.
document.querySelectorAll('.skill-card, .project-card, .about-content, .stat-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// ===========================
// PROJECT MODAL
// ===========================

const projectModal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');

const projectDetails = {
    project1: {
        title: 'Perbaikan Laptop',
        description: 'Layanan perbaikan laptop profesional dengan diagnosis menyeluruh menggunakan peralatan testing modern. Meliputi identifikasi masalah hardware dan software, penggantian komponen yang rusak (hardisk, RAM, keyboard, layar), pembersihan thermal paste, serta optimasi sistem operasi. Memberikan garansi perbaikan dan konsultasi maintenance untuk memperpanjang umur perangkat.'
    },
    project2: {
        title: 'Replacement Switch di Salah Satu Bank BUMN',
        description: 'Proyek penggantian switch 24 port di infrastruktur jaringan Bank BUMN dengan fokus pada hardware replacement dan konfigurasi optimal. Mencakup physical installation switch, cable management yang rapi dan terstruktur sesuai standar industri, serta konfigurasi VLAN, IP addressing, dan port configuration. Hasil akhir adalah sistem jaringan yang lebih stabil dengan management yang lebih mudah.'
    },
    project3: {
        title: 'Real-time pH Monitoring',
        description: 'Sistem monitoring pH real-time berbasis IoT menggunakan mikrokontroler ESP32 dan sensor pH analog. Mengintegrasikan data acquisition, wireless transmission via WiFi, cloud storage, dan dashboard web untuk visualisasi parameter. Implementasi web interface responsif untuk akses jarak jauh dengan logging data historis. Akurasi sensor ±0.2 pH unit dengan sampling rate real-time setiap menit.'
    },
    project4: {
        title: 'Instalasi dan Konfigurasi Windows',
        description: 'Layanan professional instalasi dan konfigurasi sistem operasi Windows dengan fokus pada performa dan keamanan. Meliputi clean install OS, driver installation, system optimization (startup, services, disk cleanup), Windows Defender configuration, user account setup, dan network configuration. Post-installation testing untuk memastikan stabilitas sistem serta handover dokumentasi ke pengguna.'
    },
    project5: {
        title: 'Pembuatan Website UMKM Sate Jamur',
        description: 'Platform e-commerce interaktif untuk UMKM Sate Jamur yang menampilkan daftar produk, galeri foto, dan sistem pembayaran terintegrasi. Features mencakup shopping cart yang user-friendly, berbagai metode pembayaran (transfer bank, e-wallet), order tracking, dan dashboard admin untuk manajemen produk. Responsive design untuk optimal viewing di desktop maupun mobile devices.'
    },
    project6: {
        title: 'Personal Portfolio Website',
        description: 'Website portfolio personal yang menampilkan profil profesional, skill set, project showcase, dan contact information. Dibangun dengan HTML5 semantik, CSS3 responsive design, dan vanilla JavaScript untuk interaktivitas tanpa framework eksternal. Fitur lengkap meliputi smooth scrolling, animated transitions, project modal detail, contact form, dan CV download button. Font Awesome icons dan Google Fonts typography untuk estetika modern.'
    }
};


function toggleProjectDetail(projectId) {
    const project = projectDetails[projectId];
    if (project) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        projectModal.classList.add('show');
    }
}

function closeProjectDetail() {
    projectModal.classList.remove('show');
}

closeBtn.addEventListener('click', closeProjectDetail);

window.addEventListener('click', (event) => {
    if (event.target === projectModal) {
        closeProjectDetail();
    }
});

// ===========================
// SKILL BAR ANIMATION
// ===========================

const skillBarsAnimated = new Set();

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillBarsAnimated.has(entry.target)) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const width = progressBar.style.width;

            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.transition = 'width 1.5s ease-out';
                progressBar.style.width = width;
            }, 100);

            skillBarsAnimated.add(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// ===========================
// PAGE LOAD ANIMATIONS
// ===========================

window.addEventListener('load', () => {
    // Animate hero content on page load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 0.8s ease-out';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s both';
    }
    if (heroButtons) {
        heroButtons.style.animation = 'fadeInUp 0.8s ease-out 0.4s both';
    }
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Disable submit button animation
const style = document.createElement('style');
style.textContent = `
    .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .fa-spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

// ===========================
// HEADER PADDING FIX FOR SCROLL
// ===========================

// Add padding to body to account for fixed navbar
document.addEventListener('DOMContentLoaded', () => {
    const navHeight = navbar.offsetHeight;
    // This is already handled in CSS with margin-top on hero section
});

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && projectModal.classList.contains('show')) {
        closeProjectDetail();
    }

    // Close mobile menu with Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===========================
// INITIAL SETUP
// ===========================

// Set initial active nav link
updateActiveNavLink();

console.log('Portfolio website loaded successfully! 🚀');
