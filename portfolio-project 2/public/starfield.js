// Starfield Background Animation
class Starfield {
    constructor() {
        this.canvas = document.getElementById('starfield-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = this.getStarCount();
        this.speed = 0.5;
        
        this.init();
        this.createStars();
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Handle theme changes
        this.observeThemeChanges();
    }
    
    getStarCount() {
        // Reduce star count on mobile devices to save battery/CPU
        if (window.innerWidth <= 480) {
            return 75; // Half the stars on small mobile devices
        } else if (window.innerWidth <= 768) {
            return 100; // Reduced stars on tablets
        }
        return 150; // Full stars on desktop
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createStars() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * this.speed + 0.1,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinklePhase: Math.random() * Math.PI * 2
            });
        }
    }
    
    updateStars() {
        this.stars.forEach(star => {
            // Move stars slowly
            star.y += star.speed;
            
            // Reset star position when it goes off screen
            if (star.y > this.canvas.height) {
                star.y = -5;
                star.x = Math.random() * this.canvas.width;
            }
            
            // Twinkling effect
            star.twinklePhase += star.twinkleSpeed;
            star.currentOpacity = star.opacity * (0.5 + 0.5 * Math.sin(star.twinklePhase));
        });
    }
    
    drawStars() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get current theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        // Draw stars
        this.stars.forEach(star => {
            this.ctx.save();
            this.ctx.globalAlpha = star.currentOpacity;
            
            // Star color based on theme
            if (isDark) {
                this.ctx.fillStyle = '#ffffff';
            } else {
                this.ctx.fillStyle = '#64748b';
            }
            
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow effect for larger stars
            if (star.size > 1.5) {
                this.ctx.globalAlpha = star.currentOpacity * 0.3;
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            this.ctx.restore();
        });
        
        // Add subtle gradient overlay
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        if (isDark) {
            gradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)');
            gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.05)');
            gradient.addColorStop(1, 'rgba(51, 65, 85, 0.1)');
        } else {
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(0.5, 'rgba(248, 250, 252, 0.05)');
            gradient.addColorStop(1, 'rgba(241, 245, 249, 0.1)');
        }
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    animate() {
        this.updateStars();
        this.drawStars();
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Update star count based on new screen size
        this.numStars = this.getStarCount();
        this.createStars();
    }
    
    observeThemeChanges() {
        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    // Theme changed, no need to recreate stars, just redraw
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
}

// Initialize starfield when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Starfield();
});

