// Enhanced navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('.modern-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(15, 23, 42, 0.98)';
                header.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            }
        });
    }
    
    // Enhanced scroll animations with performance optimization
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add stagger effect for multiple elements
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = delay + 'ms';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Enhanced smooth scrolling for anchor links
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
    
    // Hash text loading effect with persistent cursor for hero title
    const hashText = document.querySelector('.hash-text');
    if (hashText) {
        const originalText = hashText.textContent.trim();
        
        if (originalText) {
            let progress = 0;
            const hashChars = '█▓▒░#*+=_~^?';
            const speed = 40;
            const maxProgress = originalText.length;
            
            // Store original styles
            const originalColor = hashText.style.color;
            const originalBackground = hashText.style.background;
            
            // Start animation after delay
            setTimeout(() => {
                // Hide original text
                hashText.style.color = 'transparent';
                hashText.style.background = 'transparent';
                hashText.style.webkitBackgroundClip = 'unset';
                hashText.style.webkitTextFillColor = 'transparent';
                
                // Create overlay
                const overlay = document.createElement('span');
                overlay.className = 'hash-overlay';
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.color = '#3b82f6';
                overlay.style.fontFamily = "'JetBrains Mono', monospace";
                overlay.style.fontWeight = 'bold';
                hashText.style.position = 'relative';
                hashText.appendChild(overlay);
                
                const interval = setInterval(() => {
                    const scrambled = originalText
                        .split('')
                        .map((letter, index) => {
                            if (index < progress) {
                                return originalText[index];
                            }
                            if (letter === ' ') return ' ';
                            return hashChars[Math.floor(Math.random() * hashChars.length)];
                        })
                        .join('');
                    
                    overlay.textContent = scrambled;
                    progress += 1;
                    
                    if (progress >= maxProgress + 3) {
                        clearInterval(interval);
                        
                        // Restore original appearance
                        hashText.style.color = '';
                        hashText.style.background = '';
                        hashText.style.webkitBackgroundClip = '';
                        hashText.style.webkitTextFillColor = '';
                        overlay.remove();
                        
                        // Add persistent cursor
                        setTimeout(() => {
                            const cursor = document.createElement('span');
                            cursor.className = 'hero-cursor';
                            cursor.textContent = '█';
                            cursor.style.marginLeft = '8px';
                            hashText.appendChild(cursor);
                        }, 100);
                    }
                }, speed);
            }, 600);
        }
    }
    
    // Enhanced scroll behavior for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            scrollIndicator.style.transform = 'translateX(-50%) scale(0.9)';
            scrollIndicator.style.opacity = '0.7';
            
            // Reset animation
            setTimeout(() => {
                scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
                scrollIndicator.style.opacity = '1';
            }, 150);
            
            // Smooth scroll to next section
            const targetSection = document.querySelector('.py-24');
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - 80; // Account for any fixed header
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator when user scrolls past hero section
        function hideScrollIndicator() {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                const scrolled = window.pageYOffset;
                
                if (scrolled > heroBottom - 100) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.pointerEvents = 'auto';
                }
            }
        }
        
        // Throttled scroll listener for better performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(hideScrollIndicator, 10);
        });
    }
    
    // Enhanced scroll performance with throttling
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (hero) {
            // Parallax effect with GPU acceleration
            const speed = 0.3;
            hero.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
        }
        
        // Hide scroll indicator when scrolled
        if (scrollIndicator) {
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'all';
            }
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    // Optimized scroll listener
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // Matrix rain effect for hero section (optional)
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const hero = document.querySelector('.hero-section');
        
        if (!hero) return;
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        canvas.style.zIndex = '2';
        
        hero.appendChild(canvas);
        
        function resizeCanvas() {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#3b82f6';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 100);
    }
    
    // Uncomment to enable matrix rain effect
    // createMatrixRain();
    
    // Dynamic typing effect for hero title (if enabled)
    const heroTitle = document.querySelector('.hero-title-dynamic');
    if (heroTitle) {
        const texts = ['Developer', 'Creator', 'Problem Solver', 'Tech Enthusiast'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();
    }
    
    // Copy code functionality
    document.querySelectorAll('pre code').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.setAttribute('title', 'Copy code');
        
        const container = block.parentElement;
        container.style.position = 'relative';
        container.appendChild(button);
        
        button.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent).then(function() {
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.color = '#10b981';
                setTimeout(function() {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.style.color = '';
                }, 2000);
            });
        });
    });
    
    // Reading progress bar
    function updateReadingProgress() {
        const article = document.querySelector('article.post-content');
        if (!article) return;
        
        const progressBar = document.querySelector('.reading-progress');
        if (!progressBar) {
            const bar = document.createElement('div');
            bar.className = 'reading-progress';
            bar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                z-index: 9999;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(bar);
        }
        
        const scrolled = window.pageYOffset;
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const totalHeight = articleHeight - windowHeight;
        
        if (scrolled > articleTop) {
            const progress = ((scrolled - articleTop) / totalHeight) * 100;
            document.querySelector('.reading-progress').style.width = Math.min(100, Math.max(0, progress)) + '%';
        } else {
            document.querySelector('.reading-progress').style.width = '0%';
        }
    }
    
    if (document.querySelector('article.post-content')) {
        window.addEventListener('scroll', updateReadingProgress);
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(function() {
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(function() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }
    
    // === THEME TOGGLE ===
    const themeToggle = document.getElementById('theme-toggle');
    
    // Load saved theme immediately on page load (before DOMContentLoaded)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Add animation to the button
            this.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 400);
        });
    }

    // === ENHANCED TERMINAL EFFECTS ===
    
    // Typewriter effect for hero heading
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const text = "Hello, I'm Luca";
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // 100ms delay between characters
            } else {
                // After typing is done, make cursor blink
                document.querySelector('.typewriter-cursor').style.animation = 'cursorBlink 1s step-start infinite';
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // Enhanced Terminal Cursor Effect
    const terminalElements = document.querySelectorAll('.terminal-blink');
    terminalElements.forEach(element => {
        // Add a cursor span after terminal elements
        if (!element.querySelector('.terminal-cursor')) {
            const cursor = document.createElement('span');
            cursor.className = 'terminal-cursor';
            cursor.textContent = '▊';
            cursor.style.marginLeft = '4px';
            cursor.style.animation = 'terminalBlink 1s step-start infinite';
            element.appendChild(cursor);
        }
    });

    // === STAT COUNTER ANIMATION ===
    const statBoxes = document.querySelectorAll('.stat-animate');
    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const counter = entry.target.querySelector('.counter');
                
                if (counter && !counter.textContent.includes('∞')) {
                    const target = parseInt(entry.target.dataset.count) || parseInt(counter.textContent);
                    if (!isNaN(target)) {
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                                clearInterval(timer);
                            } else {
                                counter.textContent = Math.ceil(current);
                            }
                        }, 30);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    statBoxes.forEach(box => countUpObserver.observe(box));

    // === COFFEE INFINITY SYMBOL ANIMATION ===
    const coffeeCounter = document.querySelector('.coffee-counter');
    if (coffeeCounter) {
        let coffeeCount = 0;
        setInterval(() => {
            coffeeCount = (coffeeCount + 1) % 360;
            coffeeCounter.style.transform = `rotate(${coffeeCount}deg)`;
        }, 50);
    }

    // Particles now move automatically via CSS animations

    // === SCROLL PROGRESS INDICATOR ===
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // === CARD TILT EFFECT (3D) ===
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #60a5fa; font-size: 16px; font-weight: bold;');
    console.log('%c💻 Made with ❤️ and lots of ☕', 'color: #94a3b8; font-size: 12px;');
});