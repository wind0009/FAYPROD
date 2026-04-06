document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Sticky Header with class toggle
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations (IntersectionObserver)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Hero parallax on scroll (subtle)
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
            }
        });
    }

    // 5. Cinematic WhatsApp Form Submission Handling
    const form = document.getElementById('contact-form');
    const statusText = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalBtnText = btn.innerHTML;
            
            // Animation de chargement professionnelle
            btn.innerHTML = 'Traitement en cours... <i class="fa-solid fa-circle-notch fa-spin"></i>';
            btn.disabled = true;
            btn.classList.add('loading-pulse');

            // Récupération des données
            const name = document.getElementById('name').value;
            const projectSelect = document.getElementById('service');
            const projectType = projectSelect.options[projectSelect.selectedIndex].text;
            const budgetInput = document.getElementById('budget');
            const budget = budgetInput ? budgetInput.value : '';
            const message = document.getElementById('message').value;

            // Préparation du message WhatsApp
            const waNumber = "22600000000"; // Numéro WhatsApp
            let waText = `Bonjour, je viens de remplir le formulaire sur votre site pour un projet de type *${projectType}*.\n\n`;
            waText += `*Nom / Marque :* ${name}\n`;
            if (budget.trim() !== '') {
                waText += `*Budget :* ${budget}\n\n`;
            } else {
                waText += `*Budget :* À discuter\n\n`;
            }
            waText += `*Détails du projet :*\n${message}\n\n`;
            waText += `Discutons-en !`;

            const encodedText = encodeURIComponent(waText);
            const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

            // Simulation d'une attente cinématique
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Redirection vers WhatsApp...';
                
                setTimeout(() => {
                    window.open(waUrl, '_blank');
                    
                    // Réinitialisation du bouton après l'ouverture
                    setTimeout(() => {
                        btn.innerHTML = originalBtnText;
                        btn.disabled = false;
                        btn.classList.remove('loading-pulse');
                        form.reset();
                    }, 2000);
                }, 800);
            }, 1500);
        });
    }

    // 6. Active nav link highlight on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.style.color = '#C8A84B';
                } else if (!navLink.classList.contains('nav-cta')) {
                    navLink.style.color = '';
                }
            }
        });
    });
});
