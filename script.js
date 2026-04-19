document.addEventListener('DOMContentLoaded', () => {
    // --- Live Local Clock (IST / Bangalore) ---
    function updateClock() {
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        document.getElementById('clock').textContent = formatter.format(new Date());
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Typing Animation ---
    const typingText = document.getElementById('typing-text');
    const titles = [
        'HR Manager',
        'People Operations Leader',
        'Talent Acquisition Specialist',
        'Performance Strategist',
        'Strategic Team Builder'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // --- Scroll Reveal ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // --- Environmental Verification (Camera) ---
    const verifyBtn = document.getElementById('verify-presence');
    const cameraOverlay = document.getElementById('camera-overlay');
    const closeBtn = document.getElementById('close-camera');
    const videoFeed = document.getElementById('video-feed');
    let stream = null;

    verifyBtn.addEventListener('click', async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoFeed.srcObject = stream;
            cameraOverlay.classList.remove('hidden');
            
            // Logic for "Candidate Verified" message after 3 seconds
            const statusLabel = document.querySelector('.camera-status');
            setTimeout(() => {
                statusLabel.textContent = "CANDIDATE VERIFIED: SHALVI RANI READY FOR INTERVIEW";
                statusLabel.style.color = "#00ff00";
            }, 3000);
            
        } catch (err) {
            console.error("Camera access denied:", err);
            alert("Environmental verification requires camera access. Please enable permissions.");
        }
    });

    closeBtn.addEventListener('click', () => {
        cameraOverlay.classList.add('hidden');
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    });

    // --- Micro-interactions (Skill Chips Glow) ---
    document.querySelectorAll('.skill-chip').forEach(chip => {
        chip.addEventListener('mousemove', (e) => {
            const rect = chip.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            chip.style.setProperty('--x', `${x}px`);
            chip.style.setProperty('--y', `${y}px`);
        });
    });
});
