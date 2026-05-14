document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section, article, div[id]');

    // Reveal Animation on Scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(el => revealObserver.observe(el));

    // Floating Nav Active State Update
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href').includes(current)) {
                dot.classList.add('active');
            }
        });
    });

    // Form Handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            // Get form values
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;

            // WhatsApp formatting
            const waNumber = "6282226800063";
            const waMessage = `Halo Bintang! Saya ${name} (${email}).\n\n${message}`;
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
            
            btn.innerText = 'REDIRECTING TO WA... 📱';
            btn.style.borderColor = '#25D366';
            btn.style.color = '#25D366';
            
            setTimeout(() => {
                window.open(waUrl, '_blank');
                btn.innerText = originalText;
                btn.style.borderColor = 'var(--accent-gold)';
                btn.style.color = 'var(--accent-gold)';
                form.reset();
            }, 1500);
        });
    }

    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            
            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === target) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // Magical Particles for Character Portrait
    const particleContainer = document.querySelector('.particles-container');
    if (particleContainer) {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'magic-particle';
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: var(--accent-gold);
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: 0;
                box-shadow: 0 0 10px var(--accent-gold);
                animation: particleMove ${duration}s linear ${delay}s infinite;
            `;

            particleContainer.appendChild(particle);
        };

        for (let i = 0; i < 20; i++) {
            createParticle();
        }
    }

    // Portrait Toggle for Mobile
    const portraitToggle = document.getElementById('portrait-toggle');
    if (portraitToggle) {
        portraitToggle.addEventListener('click', () => {
            portraitToggle.classList.toggle('active');
        });
    }

    // Background Music Control (Local File)
    const musicControl = document.getElementById('music-control');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = musicControl.querySelector('.music-icon');
    let isPlaying = false;

    if (musicControl && bgMusic) {
        const playMusic = () => {
            bgMusic.play().then(() => {
                musicControl.classList.add('playing');
                isPlaying = true;
            }).catch(e => {
                console.error("Audio play failed. Ensure assets/bg-music.mp3 exists.", e);
            });
        };

        musicControl.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                bgMusic.pause();
                musicControl.classList.remove('playing');
            } else {
                playMusic();
            }
            isPlaying = !isPlaying;
        });

        // "Autoplay" on first interaction
        document.addEventListener('click', () => {
            if (!isPlaying) {
                playMusic();
            }
        }, { once: true });
    }
});

// Particle Animation Style (Injecting via JS for convenience or add to CSS)
const style = document.createElement('style');
style.textContent = `
    @keyframes particleMove {
        0% { transform: translateY(0) scale(0); opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { transform: translateY(-50px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);
