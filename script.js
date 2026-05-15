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

    // Skill Snackbar Logic
    const snackbar = document.getElementById('snackbar');
    const snackTitle = document.getElementById('snackbar-title');
    const snackDesc = document.getElementById('snackbar-desc');
    const snackIcon = document.getElementById('snackbar-icon-container');
    const skillTags = document.querySelectorAll('.skill-tag');

    const icons = {
        ps: 'https://api.iconify.design/logos:adobe-photoshop.svg',
        ae: 'https://api.iconify.design/logos:adobe-after-effects.svg',
        pr: 'https://api.iconify.design/logos:adobe-premiere.svg',
        ai: 'https://api.iconify.design/logos:adobe-illustrator.svg',
        au: 'https://api.iconify.design/simple-icons:adobeaudition.svg?color=%2301E4AC',
        fl: 'https://img.icons8.com/color/48/adobe-flash.png',
        dw: 'https://api.iconify.design/logos:adobe-dreamweaver.svg',
        cd: 'https://api.iconify.design/simple-icons:coreldraw.svg?color=%2300A339',
        cv: 'https://api.iconify.design/simple-icons:canvas.svg?color=%2300C4CC',
        sv: 'https://api.iconify.design/simple-icons:sony.svg?color=white',
        filmora: 'https://img.icons8.com/color/48/filmora.png',
        capcut: 'https://www.google.com/s2/favicons?domain=capcut.com&sz=64',
        flutter: 'https://api.iconify.design/logos:flutter.svg',
        python: 'https://api.iconify.design/logos:python.svg',
        js: 'https://api.iconify.design/logos:javascript.svg',
        java: 'https://api.iconify.design/logos:java.svg',
        csharp: 'https://api.iconify.design/logos:c-sharp.svg',
        cpp: 'https://api.iconify.design/logos:c-plusplus.svg',
        laravel: 'https://api.iconify.design/logos:laravel.svg',
        it: 'https://api.iconify.design/mdi:face-agent.svg?color=%23ccaa7d',
        troubleshooting: 'https://api.iconify.design/mdi:tools.svg?color=%23ccaa7d',
        desktop_eng: 'https://api.iconify.design/mdi:monitor-cellphone.svg?color=%23ccaa7d',
        github: 'https://api.iconify.design/mdi:github.svg?color=white',
        star: 'https://api.iconify.design/material-symbols:star.svg?color=%23ccaa7d'
    };

    const skillData = {
        'Photoshop': { desc: 'Aplikasi buat edit foto biar makin cakep atau manipulasi gambar jadi karya seni.', icon: icons.ps },
        'After Effects': { desc: 'Alat buat bikin efek visual keren dan animasi gerak (motion graphics) kayak di film.', icon: icons.ae },
        'Premiere': { desc: 'Software standar industri buat potong-potong video dan bikin konten sinematik.', icon: icons.pr },
        'Audition': { desc: 'Studio audio digital buat bersihin suara dan mixing musik biar jernih.', icon: icons.au },
        'Illustrator': { desc: 'Aplikasi buat bikin desain logo atau gambar yang gak bakal pecah meski diperbesar.', icon: icons.ai },
        'Flash': { desc: 'Software legendaris buat bikin animasi interaktif dan game berbasis web.', icon: icons.fl },
        'Dreamweaver': { desc: 'Alat buat bangun dan kelola website secara visual maupun lewat baris kode.', icon: icons.dw },
        'CorelDraw': { desc: 'Aplikasi desain vektor yang populer buat bikin desain cetak dan ilustrasi.', icon: icons.cd },
        'Canvas': { desc: 'Alat desain grafis online yang praktis buat bikin poster atau konten medsos.', icon: icons.cv },
        'Sony Vegas': { desc: 'Software edit video yang powerful tapi ringan, fokus ke alur kerja yang cepat.', icon: icons.sv },
        'Filmora': { desc: 'Software edit video yang simpel dan sat-set, cocok buat konten kreator.', icon: icons.filmora },
        'CapCut': { desc: 'Aplikasi edit video favorit sejuta umat yang gampang banget dipake.', icon: icons.capcut },
        'Flutter & Dart': { desc: 'Teknologi buat bikin aplikasi HP yang super mulus buat Android & iPhone sekaligus.', icon: icons.flutter },
        'Vanilla JS/CSS': { desc: 'Bahasa dasar buat bikin website jadi hidup dan tampil cantik.', icon: icons.js },
        'C#': { desc: 'Bahasa pemrograman Microsoft buat bikin software Windows atau game Unity.', icon: icons.csharp },
        'C++': { desc: 'Bahasa tingkat tinggi buat performa maksimal, sering dipake buat software berat.', icon: icons.cpp },
        'Java': { desc: 'Bahasa pemrograman legendaris yang kuat dan banyak dipake di sistem besar.', icon: icons.java },
        'Laravel': { desc: 'Framework PHP favorit buat bikin sistem website yang canggih dan aman.', icon: icons.laravel },
        'Python': { desc: 'Bahasa pemrograman yang populer karena simpel, cocok buat AI dan data.', icon: icons.python },
        'IT Support': { desc: 'Pahlawan teknologi yang siap bantuin kalau ada kendala hardware/software.', icon: icons.it },
        'Troubleshooting': { desc: 'Seni nyari sumber masalah teknis terus dibenerin sampe tuntas.', icon: icons.troubleshooting },
        'Desktop Engineering': { desc: 'Ahli yang ngurusin infrastruktur komputer biar selalu lancar jaya.', icon: icons.desktop_eng },
        'GitHub': { desc: 'Tempat kumpulnya para developer buat kolaborasi kode pemrograman.', icon: icons.github }
    };

    let snackTimeout;

    const showSnackbar = (skillName, target) => {
        const data = skillData[skillName] || { desc: `Keahlian dalam menggunakan ${skillName} untuk menciptakan karya digital.`, icon: icons.star };
        
        snackTitle.innerText = skillName;
        snackDesc.innerText = data.desc;
        snackIcon.innerHTML = `<img src="${data.icon}" class="snackbar-icon" alt="${skillName}">`;
        
        const rect = target.getBoundingClientRect();
        
        // Calculate position (Default: Above the tag)
        let top = rect.top - 10; 
        let left = rect.left + (rect.width / 2);

        snackbar.style.left = `${left}px`;
        snackbar.style.top = `${top}px`;
        snackbar.style.transform = `translate(-50%, -100%) scale(0.8)`;

        clearTimeout(snackTimeout);
        snackbar.classList.add('show');
        
        setTimeout(() => {
            const updatedRect = snackbar.getBoundingClientRect();
            if (updatedRect.left < 10) {
                snackbar.style.left = '10px';
                snackbar.style.transform = `translate(0, -100%) scale(1)`;
            } else if (updatedRect.right > window.innerWidth - 10) {
                snackbar.style.left = `${window.innerWidth - 10}px`;
                snackbar.style.transform = `translate(-100%, -100%) scale(1)`;
            } else {
                snackbar.style.transform = `translate(-50%, -100%) scale(1)`;
            }
        }, 10);
    };

    const hideSnackbar = () => {
        snackTimeout = setTimeout(() => {
            snackbar.classList.remove('show');
        }, 300);
    };

    skillTags.forEach(tag => {
        const name = tag.innerText.trim();
        const data = skillData[name];
        
        // Inject icon into tag
        if (data && data.icon) {
            const iconImg = document.createElement('img');
            iconImg.className = 'tag-icon';
            iconImg.src = data.icon;
            tag.prepend(iconImg);
        }

        // Desktop Hover
        tag.addEventListener('mouseenter', () => showSnackbar(name, tag));
        tag.addEventListener('mouseleave', hideSnackbar);
        
        // Mobile/Click
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            showSnackbar(name, tag);
            clearTimeout(snackTimeout);
            snackTimeout = setTimeout(hideSnackbar, 3000);
        });
    });
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
