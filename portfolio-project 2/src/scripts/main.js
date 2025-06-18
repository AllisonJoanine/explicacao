// Main JavaScript functionality
class PortfolioApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.initTheme();
        this.initNavigation();
        this.initContactForm();
    }
    
    init() {
        // Cache DOM elements
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('nav-menu');
        this.hamburger = document.getElementById('hamburger');
        this.themeToggle = document.getElementById('theme-toggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.contactForm = document.getElementById('contact-form');
        
        // State
        this.currentSection = 'home';
        this.isMenuOpen = false;
    }
    
    bindEvents() {
        // Theme toggle
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Mobile menu toggle
        this.hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Resize events
        window.addEventListener('resize', () => this.handleResize());
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    initTheme() {
        // Get saved theme or default to light
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.setTheme(savedTheme);
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        // Update theme toggle icon
        const icon = this.themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    initNavigation() {
        // Set initial active link
        this.updateActiveNavLink();
        
        // Add scroll spy
        this.initScrollSpy();
    }
    
    initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const options = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.currentSection = entry.target.id;
                    this.updateActiveNavLink();
                }
            });
        }, options);
        
        sections.forEach(section => observer.observe(section));
    }
    
    updateActiveNavLink() {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const sectionId = href?.substring(1);
            
            if (sectionId === this.currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        if (href?.startsWith('#')) {
            const targetId = href.substring(1);
            this.scrollToSection(targetId);
            
            // Close mobile menu if open
            if (this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        }
    }
    
    scrollToSection(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            const navbarHeight = this.navbar?.offsetHeight || 80;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navMenu?.classList.toggle('active', this.isMenuOpen);
        this.hamburger?.classList.toggle('active', this.isMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }
    
    handleScroll() {
        // Add/remove navbar background on scroll
        if (window.scrollY > 50) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
        
        // Update scroll progress (optional)
        this.updateScrollProgress();
    }
    
    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Dispatch scroll progress event for other components
        window.dispatchEvent(new CustomEvent('scrollProgress', { 
            detail: { percent: scrollPercent } 
        }));
    }
    
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.toggleMobileMenu();
        }
    }
    
    handleOutsideClick(e) {
        // Close mobile menu when clicking outside
        if (this.isMenuOpen && 
            !this.navMenu?.contains(e.target) && 
            !this.hamburger?.contains(e.target)) {
            this.toggleMobileMenu();
        }
    }
    
    handleKeydown(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && this.isMenuOpen) {
            this.toggleMobileMenu();
        }
        
        // Arrow keys for navigation (optional)
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateWithKeys(e.key === 'ArrowDown' ? 1 : -1);
        }
    }
    
    navigateWithKeys(direction) {
        const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
        const currentIndex = sections.indexOf(this.currentSection);
        const newIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
        
        if (newIndex !== currentIndex) {
            this.scrollToSection(sections[newIndex]);
        }
    }
    
    initContactForm() {
        if (!this.contactForm) return;
        
        this.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }
    
    async handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Initialize EmailJS if not already done
            if (typeof emailjs !== 'undefined') {
                await this.sendEmailJS(data);
                this.showNotification('Mensagem enviada com sucesso!', 'success');
                this.contactForm.reset();
            } else {
                // Fallback: open email client
                this.openEmailClient(data);
                this.showNotification('Cliente de email aberto. Complete o envio manualmente.', 'info');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async sendEmailJS(data) {
        // EmailJS configuration (you'll need to set this up)
        const serviceID = 'your_service_id';
        const templateID = 'your_template_id';
        const userID = 'your_user_id';
        
        return emailjs.send(serviceID, templateID, {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_email: 'allisonjoanine@gmail.com'
        }, userID);
    }
    
    openEmailClient(data) {
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
            `Nome: ${data.name}\nEmail: ${data.email}\n\nMensagem:\n${data.message}`
        );
        const mailtoLink = `mailto:allisonjoanine@gmail.com?subject=${subject}&body=${body}`;
        window.open(mailtoLink);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '10000',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            minWidth: '300px',
            maxWidth: '500px',
            backgroundColor: this.getNotificationColor(type),
            color: 'white',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.closeNotification(notification));
        
        // Auto close after 5 seconds
        setTimeout(() => this.closeNotification(notification), 5000);
    }
    
    closeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || '#3b82f6';
    }
}

// Utility functions
const utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
    
    // Add some global utilities
    window.utils = utils;
    
    // Performance optimization: lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

