document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Animations (AOS)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // 2. Stats Counter Animation (عداد الأرقام)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        
        let current = 0;
        const timer = setInterval(() => {
            current += 1;
            counter.innerText = current + "+";
            if (current >= target) clearInterval(timer);
        }, stepTime);
    });

    // 3. Typed.js
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: ['Embedded Systems.', 'AI Integration.', 'Software Solutions.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // 4. Project Modal Logic
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    const projectsData = {
        'smart-class': {
            title: 'Smart Voice Controlled Class',
            tags: ['ESP32', 'C++', 'IoT', 'Flutter'],
            desc: 'Advanced IoT automation for University classrooms. Controls AC, Lights, and Projectors via AI Voice Commands.',
            features: ['AI Voice Recognition', 'Auto-shutdown sensors', 'ESP32 Relay Control', 'Mobile App Integration']
        },
        'church-app': {
            title: 'Church Management Platform',
            tags: ['Flutter', 'PHP', 'MySQL'],
            desc: 'Digital ecosystem for church administration, tracking attendance and generating analytics reports.',
            features: ['QR Attendance', 'Statistical Reporting', 'Servant Database', 'Admin Dashboard']
        },
        'hospital': {
            title: 'Hospital Management ERP',
            tags: ['Java', 'Swing', 'MySQL'],
            desc: 'Desktop software for managing hospital resources, patient appointments, and billing cycles.',
            features: ['Patient Records', 'Doctor Scheduling', 'Billing System', 'Secure Login']
        }
    };

    window.openModal = function(id) {
        const data = projectsData[id];
        if(!data) return;
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-desc').innerText = data.desc;
        document.getElementById('modal-tags').innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');
        document.getElementById('modal-features-list').innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
        modal.style.display = 'block';
    }

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; }

    // 5. Chart.js (Skills)
    const ctx = document.getElementById('myChart');
    if(ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Java', 'Embedded', 'Web'],
                datasets: [{
                    data: [40, 35, 25],
                    backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'right', labels: { color: '#94a3b8' } } }
            }
        });
    }

    // 6. Calculator
    const calcBtn = document.getElementById('do-calc');
    if(calcBtn) {
        calcBtn.addEventListener('click', () => {
            const p = parseFloat(document.getElementById('calc-price').value);
            const q = parseFloat(document.getElementById('calc-qty').value);
            const res = document.getElementById('calc-result');
            if(p && q) {
                res.innerText = `${(p * q).toLocaleString()} EGP`;
                res.style.color = '#10b981';
            } else res.innerText = 'Invalid Input';
        });
    }
});

