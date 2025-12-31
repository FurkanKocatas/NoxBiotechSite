// Smooth scroll and navbar effects
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    
    // Add smooth scroll - no offset needed since navbar is absolute
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Logo visibility for light backgrounds
    const sections = [
        { element: document.querySelector('.hero'), isLight: false },
        { element: document.querySelector('.platform-section'), isLight: true },
        { element: document.querySelector('.purpose-section'), isLight: true },
        { element: document.querySelector('.our-purpose-section'), isLight: true },
        { element: document.querySelector('.contact-section'), isLight: false }
    ];
    
    const logoImg = document.querySelector('.logo img');
    
    window.addEventListener('scroll', () => {
        const navbarHeight = navbar.offsetHeight;
        
        // Find which section the navbar is over
        let currentSection = sections[0];
        for (const section of sections) {
            if (section.element) {
                const rect = section.element.getBoundingClientRect();
                // Check if navbar is within this section
                if (rect.top <= navbarHeight && rect.bottom >= 0) {
                    currentSection = section;
                    break;
                }
            }
        }
        
        // Adjust logo visibility for light backgrounds
        if (logoImg) {
            if (currentSection.isLight) {
                logoImg.style.filter = 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 6px rgba(0, 0, 0, 0.5))';
            } else {
                logoImg.style.filter = 'none';
            }
        }
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            // Removed opacity fade to prevent blur effect when scrolling
        }
    });

    // Mouse move parallax effect
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.shape');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Smooth scroll for anchor links (handled above with navbar offset)

    // Button click animations
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.hero-title, .hero-description, .hero-buttons').forEach(el => {
        observer.observe(el);
    });

    // Add dynamic particle effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        document.querySelector('.hero-background').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    // Create particles periodically
    setInterval(createParticle, 300);

    // Platform Section - Video/GIF support (canvas removed)
    initPlatformSection();

    // Contact form behavior
    initContactForm();
});

// Platform Section - Video/GIF support
function initPlatformSection() {
    // Intersection Observer for platform section visibility
    const platformObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = document.querySelector('.platform-content');
                const visual = document.querySelector('.platform-visual');
                if (content) content.classList.add('visible');
                if (visual) visual.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    const platformSection = document.querySelector('.platform-section');
    if (platformSection) {
        platformObserver.observe(platformSection);
    }
}

// Contact form: opens user's email client with pre-filled message
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contact-name')?.value.trim() || '';
        const email = document.getElementById('contact-email')?.value.trim() || '';
        const subject = document.getElementById('contact-subject')?.value.trim() || 'NOX Biotech Contact';
        const message = document.getElementById('contact-message')?.value.trim() || '';

        // TODO: replace this with your real contact email
        const to = 'info@noxbiotech.com';

        const bodyLines = [
            `Name: ${name}`,
            `Email: ${email}`,
            '',
            'Message:',
            message
        ];

        const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

        window.location.href = mailto;
    });
}

// Platform Section Canvas Animation - DISABLED (using video/gif/animated image instead)
/*
function initPlatformAnimation_OLD() {
    const canvas = document.getElementById('biologyCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cell class for stem cells
    class Cell {
        constructor(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.02 + Math.random() * 0.02;
            this.color = {
                r: 99 + Math.random() * 50,
                g: 102 + Math.random() * 50,
                b: 241 + Math.random() * 50
            };
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.angle += this.rotationSpeed;
            this.pulsePhase += this.pulseSpeed;

            // Boundary collision
            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                this.vx *= -1;
            }
            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                this.vy *= -1;
            }

            // Keep within bounds
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
            this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }

        draw() {
            const pulse = Math.sin(this.pulsePhase) * 0.1 + 1;
            const currentRadius = this.radius * pulse;

            // Outer glow
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, currentRadius * 2
            );
            gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`);
            gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.1)`);
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentRadius * 2, 0, Math.PI * 2);
            ctx.fill();

            // Cell body
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.6)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
            ctx.fill();

            // Cell membrane
            ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Inner structure
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.4)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, currentRadius * 0.6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-currentRadius * 0.6, 0);
            ctx.lineTo(currentRadius * 0.6, 0);
            ctx.moveTo(0, -currentRadius * 0.6);
            ctx.lineTo(0, currentRadius * 0.6);
            ctx.stroke();
            ctx.restore();
        }
    }

    // Exosome class
    class Exosome {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 3 + Math.random() * 4;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.life = 1;
            this.decay = 0.002 + Math.random() * 0.003;
            this.color = {
                r: 236 + Math.random() * 20,
                g: 72 + Math.random() * 20,
                b: 153 + Math.random() * 20
            };
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;

            // Boundary wrap
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();

            // Glow
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius * 3
            );
            gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.4)`);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        isDead() {
            return this.life <= 0;
        }
    }

    // Connection line between cells
    class Connection {
        constructor(cell1, cell2) {
            this.cell1 = cell1;
            this.cell2 = cell2;
            this.opacity = 0;
        }

        update() {
            const dx = this.cell2.x - this.cell1.x;
            const dy = this.cell2.y - this.cell1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                this.opacity = Math.min(1, (150 - distance) / 150 * 0.3);
            } else {
                this.opacity = 0;
            }
        }

        draw() {
            if (this.opacity > 0) {
                ctx.strokeStyle = `rgba(99, 102, 241, ${this.opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(this.cell1.x, this.cell1.y);
                ctx.lineTo(this.cell2.x, this.cell2.y);
                ctx.stroke();
            }
        }
    }

    // Initialize cells
    const cells = [];
    const cellCount = 8;
    for (let i = 0; i < cellCount; i++) {
        cells.push(new Cell(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            20 + Math.random() * 15
        ));
    }

    // Initialize exosomes
    const exosomes = [];
    const exosomeCount = 30;
    for (let i = 0; i < exosomeCount; i++) {
        exosomes.push(new Exosome(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }

    // Create connections
    const connections = [];
    for (let i = 0; i < cells.length; i++) {
        for (let j = i + 1; j < cells.length; j++) {
            connections.push(new Connection(cells[i], cells[j]));
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw connections
        connections.forEach(conn => {
            conn.update();
            conn.draw();
        });

        // Update and draw cells
        cells.forEach(cell => {
            cell.update();
            cell.draw();
        });

        // Update and draw exosomes
        exosomes.forEach((exosome, index) => {
            exosome.update();
            exosome.draw();
            
            if (exosome.isDead()) {
                exosomes[index] = new Exosome(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                );
            }
        });

        // Add new exosomes occasionally
        if (Math.random() < 0.05 && exosomes.length < 40) {
            exosomes.push(new Exosome(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }

        animationId = requestAnimationFrame(animate);
    }

    // Intersection Observer for platform section
    const platformObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = document.querySelector('.platform-content');
                const visual = document.querySelector('.platform-visual');
                if (content) content.classList.add('visible');
                if (visual) visual.classList.add('visible');
                animate();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
            }
        });
    }, { threshold: 0.2 });

    const platformSection = document.querySelector('.platform-section');
    if (platformSection) {
        platformObserver.observe(platformSection);
    }
}
*/

// Purpose Section - Scroll-based Color Change (Black to Orange) - Letter by Letter
function initPurposeSection() {
    const purposeSection = document.querySelector('.purpose-section');
    const purposeWrapper = document.querySelector('.purpose-text-wrapper');
    const purposeTitle = document.querySelector('.purpose-title');
    
    if (!purposeSection || !purposeWrapper || !purposeTitle) return;

    // Make wrapper visible immediately
    purposeWrapper.classList.add('visible');

    // Scroll-based color change effect - precise letter-by-letter
    function updateTextColor() {
        const chars = purposeTitle.querySelectorAll('.char');
        const titleRect = purposeTitle.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const titleTop = titleRect.top;
        
        // Very large scroll range for precise letter-by-letter effect
        // Start when title is 90% down the viewport
        // Finish when title is 0% down (at top)
        const startPoint = viewportHeight * 0.9;
        const endPoint = 0;
        const scrollRange = startPoint - endPoint;
        
        // Calculate progress: 0 when title top is at startPoint, 1 when at endPoint
        let scrollProgress = 0;
        
        if (titleTop <= startPoint && titleTop >= endPoint) {
            scrollProgress = (startPoint - titleTop) / scrollRange;
        } else if (titleTop < endPoint) {
            scrollProgress = 1;
        }
        
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Change characters from black to orange letter by letter with precise control
        chars.forEach((char, index) => {
            // Calculate the exact progress point for this character
            const charProgress = index / (chars.length - 1);
            
            // Add a very small transition window for each letter (0.5% of total range)
            const transitionWidth = 0.005;
            const charStart = Math.max(0, charProgress - transitionWidth);
            const charEnd = Math.min(1, charProgress + transitionWidth);
            
            if (scrollProgress < charStart) {
                // Haven't reached this letter yet - black
                char.style.color = '#000';
            } else if (scrollProgress > charEnd) {
                // Passed this letter - orange
                char.style.color = '#ef4344';
            } else {
                // Currently transitioning this letter - interpolate color
                const localProgress = (scrollProgress - charStart) / (charEnd - charStart);
                // Interpolate between black (0,0,0) and orange (239,67,68)
                const r = Math.round(0 + (239 * localProgress));
                const g = Math.round(0 + (67 * localProgress));
                const b = Math.round(0 + (68 * localProgress));
                char.style.color = `rgb(${r}, ${g}, ${b})`;
            }
        });
    }
    
    // Update on scroll with throttling
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateTextColor();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial update
    updateTextColor();
}

// Initialize purpose section
document.addEventListener('DOMContentLoaded', function() {
    initPurposeSection();
    // Canvas animation removed - using video/gif/animated image instead
    // initAnimalCanvas();
});

// Animal Canvas Animation - DISABLED (using video/gif/animated image instead)
/*
function initAnimalCanvas() {
    const canvas = document.getElementById('animalCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simple, flat animal silhouette
    function drawAnimalProfile() {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width * 0.4;
        const centerY = height * 0.5;
        
        // Beautiful gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#ef4344');
        gradient.addColorStop(0.2, '#e05f6d');
        gradient.addColorStop(0.4, '#c97791');
        gradient.addColorStop(0.6, '#401e4e');
        gradient.addColorStop(0.8, '#32165f');
        gradient.addColorStop(1, '#9c1f2d');
        
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        
        // Simple, flat animal silhouette (horse/cow profile facing right)
        ctx.beginPath();
        
        // Head - simple shape
        ctx.moveTo(centerX - width * 0.18, centerY - height * 0.18);
        // Top of head
        ctx.lineTo(centerX + width * 0.12, centerY - height * 0.25);
        // Muzzle
        ctx.lineTo(centerX + width * 0.2, centerY - height * 0.08);
        // Under jaw
        ctx.lineTo(centerX + width * 0.18, centerY + height * 0.05);
        ctx.lineTo(centerX, centerY + height * 0.08);
        // Neck
        ctx.lineTo(centerX - width * 0.15, centerY + height * 0.12);
        // Shoulder
        ctx.lineTo(centerX - width * 0.22, centerY + height * 0.2);
        // Back
        ctx.lineTo(centerX - width * 0.18, centerY + height * 0.25);
        // Body
        ctx.lineTo(centerX + width * 0.08, centerY + height * 0.22);
        // Chest
        ctx.lineTo(centerX + width * 0.15, centerY + height * 0.12);
        // Back to start
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    // Minimal, elegant branch overlay
    function drawBranches() {
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 1.5;
        
        // Simple, elegant branch structure
        function drawBranch(x, y, angle, length, depth) {
            if (depth === 0) return;
            
            const endX = x + Math.cos(angle) * length;
            const endY = y + Math.sin(angle) * length;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Subtle recursive branches
            if (depth > 1) {
                const newLength = length * 0.65;
                drawBranch(endX, endY, angle - 0.4, newLength, depth - 1);
                drawBranch(endX, endY, angle + 0.4, newLength, depth - 1);
            }
        }
        
        // Clean, minimal branch placement
        drawBranch(width * 0.2, height * 0.3, 0.5, width * 0.15, 3);
        drawBranch(width * 0.3, height * 0.7, -0.3, width * 0.18, 3);
        drawBranch(width * 0.55, height * 0.25, 1.0, width * 0.16, 3);
        drawBranch(width * 0.6, height * 0.75, -0.9, width * 0.15, 3);
        
        // Simple roots at bottom
        drawBranch(width * 0.25, height * 0.9, -1.5, width * 0.12, 2);
        drawBranch(width * 0.5, height * 0.93, -1.7, width * 0.13, 2);
        drawBranch(width * 0.7, height * 0.91, -2.0, width * 0.11, 2);
    }

    // Subtle, elegant particles
    function drawParticles() {
        const time = Date.now() * 0.0008;
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width * 0.4;
        const centerY = height * 0.5;
        const particleCount = 20; // Reduced for cleaner look
        
        for (let i = 0; i < particleCount; i++) {
            // Gentle floating particles
            const angle = (i / particleCount) * Math.PI * 2 + time * 0.3;
            const radius = (width * 0.12) + Math.sin(time * 1.5 + i) * width * 0.08;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            const size = 2 + Math.sin(time * 1.5 + i) * 1;
            
            // Subtle color variation
            const colorIndex = Math.floor((i + time * 5) % 4);
            const colors = [
                'rgba(99, 102, 241, 0.25)',
                'rgba(139, 92, 246, 0.25)',
                'rgba(236, 72, 153, 0.25)',
                'rgba(20, 184, 166, 0.25)'
            ];
            
            ctx.fillStyle = colors[colorIndex];
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw only the flat animal profile
        drawAnimalProfile();
        
        animationId = requestAnimationFrame(animate);
    }

    // Start animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
            }
        });
    }, { threshold: 0.1 });

    const section = document.querySelector('.our-purpose-section');
    if (section) {
        observer.observe(section);
    }
}
*/

// Add particle styles dynamically
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        animation: particleFloat 5s ease-in-out infinite;
        pointer-events: none;
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
