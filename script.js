// ======= NAVBAR =======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ======= HAMBURGER =======
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');

    if (navLinks.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ======= SCROLL REVEAL =======
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ======= SMOOTH SCROLL =======
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

// ======= ACTIVE NAV =======
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
                link.style.color = 'var(--brown-dark)';
            }
        }
    });
});

// ======= BACK TO TOP =======
document.querySelector('.back-top')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ======= CONTACT FORM (WEB3FORMS) =======
const form = document.getElementById('contactForm');
if (form) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';

        const formData = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            const json = await response.json();
            if (response.status === 200 && json.success) {
                // Redirect straight to thank you page
                window.location.href = 'thankyou.html';
            } else {
                btnText.textContent = json.message || 'Something went wrong. Try again.';
                submitBtn.disabled = false;
            }
        })
        .catch(() => {
            btnText.textContent = 'Something went wrong. Try again.';
            submitBtn.disabled = false;
        });
    });
}

// ======= CUSTOM CURSOR (PC ONLY) =======
(function () {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    const dot = document.createElement('div');
    dot.id = 'cursorDot';
    dot.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 6px;
        height: 6px;
        background: #6B4F2F;
        border-radius: 50%;
        pointer-events: none;
        z-index: 999999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        will-change: left, top;
    `;

    const ring = document.createElement('div');
    ring.id = 'cursorRing';
    ring.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 26px;
        height: 26px;
        border: 2px solid #C4A882;
        border-radius: 50%;
        pointer-events: none;
        z-index: 999998;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0.5;
        will-change: left, top;
    `;

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    document.body.style.cursor = 'none';
    document.querySelectorAll('*').forEach(el => {
        el.style.cursor = 'none';
    });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function followRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = Math.round(ringX) + 'px';
        ring.style.top = Math.round(ringY) + 'px';
        requestAnimationFrame(followRing);
    }
    followRing();

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '0.5';
    });
})();
