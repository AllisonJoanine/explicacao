// AOS (Animate On Scroll) Initialization and Custom Animations
class AnimationController {
    constructor() {
        this.init();
        this.initCustomAnimations();
        this.bindEvents();
    }
    
    init() {
        // Initialize AOS library
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 0,
                anchorPlacement: 'top-bottom'
            });
        } else {
            // Fallback to custom intersection observer
            this.initCustomScrollAnimations();
        }
        
        // Initialize skill bar animations
        this.initSkillBars();
        
        // Initialize counter animations
        this.initCounters();
        
        // Initialize typing animation
        this.initTypingAnimation();
    }
    
    initCustomScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-aos');
                    const delay = element.getAttribute('data-aos-delay') || 0;
                    
                    setTimeout(() => {
                        this.applyAnimation(element, animationType);
                    }, parseInt(delay));
                    
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    applyAnimation(element, animationType) {
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        switch (animationType) {
            case 'fade-up':
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                break;
            case 'fade-down':
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                break;
            case 'fade-left':
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
                break;
            case 'fade-right':
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
                break;
            case 'zoom-in':
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
                break;
            default:
                element.style.opacity = '1';
        }
        
        element.classList.add('aos-animate');
    }
    
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    
                    // Reset width and animate
                    progressBar.style.width = '0%';
                    progressBar.style.transition = 'width 1.5s ease-in-out';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    const suffix = counter.textContent.replace(/\d/g, '');
                    
                    this.animateCounter(counter, 0, target, suffix, 2000);
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounter(element, start, end, suffix, duration) {
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end + suffix;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    initTypingAnimation() {
        const typingElements = document.querySelectorAll('.typing-animation');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-color)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.typeText(element, text, 50);
                        observer.unobserve(element);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            observer.observe(element);
        });
    }
    
    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }
    
    initCustomAnimations() {
        // Parallax effect for hero section
        this.initParallax();
        
        // Stagger animations for project cards
        this.initStaggerAnimations();
        
        // Floating animations for icons
        this.initFloatingAnimations();
    }
    
    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;
        
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        };
        
        window.addEventListener('scroll', this.throttle(handleScroll, 16));
    }
    
    initStaggerAnimations() {
        const staggerGroups = document.querySelectorAll('.stagger-animation');
        
        staggerGroups.forEach(group => {
            const children = group.children;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                        
                        observer.unobserve(group);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            // Set initial state
            Array.from(children).forEach(child => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
                child.style.transition = 'all 0.6s ease';
            });
            
            observer.observe(group);
        });
    }
    
    initFloatingAnimations() {
        const floatingElements = document.querySelectorAll('.floating-icon');
        
        floatingElements.forEach((element, index) => {
            // Add random delay and duration for more natural movement
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 2;
            
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
        });
    }
    
    bindEvents() {
        // Refresh animations on theme change
        window.addEventListener('themeChanged', () => {
            this.refreshAnimations();
        });
        
        // Refresh animations on resize
        window.addEventListener('resize', this.debounce(() => {
            this.refreshAnimations();
        }, 250));
    }
    
    refreshAnimations() {
        // Refresh AOS if available
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Refresh custom animations if needed
        this.refreshCustomAnimations();
    }
    
    refreshCustomAnimations() {
        // Re-calculate positions for parallax elements
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            element.style.transform = 'translateY(0)';
        });
    }
    
    // Utility functions
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
    }
    
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
    }
}

// Page loading animation
class PageLoader {
    constructor() {
        this.init();
    }
    
    init() {
        // Create loading overlay
        this.createLoader();
        
        // Hide loader when page is fully loaded
        window.addEventListener('load', () => {
            this.hideLoader();
        });
        
        // Fallback: hide loader after 3 seconds
        setTimeout(() => {
            this.hideLoader();
        }, 3000);
    }
    
    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Carregando...</div>
            </div>
        `;
        
        // Add styles
        const styles = `
            #page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            
            .loader-content {
                text-align: center;
            }
            
            .loader-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid var(--border-color);
                border-top: 3px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 16px;
            }
            
            .loader-text {
                color: var(--text-secondary);
                font-size: 14px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loader-hidden {
                opacity: 0;
                visibility: hidden;
            }
        `;
        
        // Add styles to head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        // Add loader to body
        document.body.appendChild(loader);
    }
    
    hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page loader
    new PageLoader();
    
    // Initialize animations after a short delay to ensure DOM is ready
    setTimeout(() => {
        window.animationController = new AnimationController();
    }, 100);
});

