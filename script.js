document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const reveals = document.querySelectorAll('.reveal');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

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

    // Form Handling (Mock)
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Terkirim! ✨';
            btn.style.background = 'var(--accent-secondary)';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))';
                form.reset();
            }, 3000);
        });
    }

    // Custom Mouse Glow Effect (Optional addition for "Wow" factor)
    const glow1 = document.querySelector('.glow-spot:nth-child(2)');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Subtly move one of the glow spots with the mouse
        glow1.style.transform = `translate(${(x - window.innerWidth/2) * 0.05}px, ${(y - window.innerHeight/2) * 0.05}px)`;
    });
});
