document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle (Robust for Mobile)
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    
    // Load Saved Theme safely
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if(themeIcon) themeIcon.className = 'fas fa-sun';
        }
    } catch(e) { console.log('Local storage blocked'); }

    if(themeBtn) themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Update Icon
        if(themeIcon) themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        
        // Show Toast
        showToast(isDark ? 'Dark Mode 🌙' : 'Light Mode ☀️');

        // Save safely
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch(e) {}
    });

    // 2. Clock
    const clockEl = document.getElementById('live-clock');
    if(clockEl) {
        setInterval(() => {
            const now = new Date();
            clockEl.innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }, 1000);
    }

    // 3. Greeting
    const hour = new Date().getHours();
    const greetEl = document.getElementById('greeting-text');
    let msg = "Welcome back";
    if (hour < 12) msg = "Good Morning, Engineer";
    else if (hour < 18) msg = "Good Afternoon, Sir";
    else msg = "Good Evening, Sir";
    if(greetEl) greetEl.innerText = msg;

    // 4. Toast Function
    function showToast(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>${message}</span>`;
        container.appendChild(toast);
        
        // Remove after 2.5s
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // 5. GitHub Stats
    async function loadStats() {
        const container = document.getElementById('stats-container');
        const username = "keroashraf12"; 
        
        try {
            // Fake loading effect
            await new Promise(r => setTimeout(r, 1000)); 
            
            const res = await fetch(`https://api.github.com/users/${username}`);
            if(!res.ok) throw new Error();
            const data = await res.json();

            container.innerHTML = `
                <div class="stat-card">
                    <span class="stat-value">${data.public_repos}</span>
                    <span class="stat-label">Projects</span>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${data.followers}</span>
                    <span class="stat-label">Followers</span>
                </div>
                <div class="stat-card">
                    <span class="stat-value">Active</span>
                    <span class="stat-label">Status</span>
                </div>
            `;
        } catch {
            container.innerHTML = `<p style="font-size:0.8rem; padding:10px; color:red">Offline</p>`;
        }
    }
    loadStats();

    // 6. Tools Logic (Calculator)
    const calcBtn = document.getElementById('do-calc');
    const historyList = document.getElementById('history-list');

    if(calcBtn) {
        calcBtn.addEventListener('click', () => {
            const price = parseFloat(document.getElementById('calc-price').value);
            const qty = parseFloat(document.getElementById('calc-qty').value);

            if (price && qty) {
                const total = price * qty;
                const li = document.createElement('li');
                li.innerHTML = `<span style="font-size:0.9rem">${qty} x ${price}</span> <strong>${total.toLocaleString()}</strong>`;
                
                if(historyList.querySelector('.empty-hint')) historyList.innerHTML = '';
                historyList.prepend(li);
                showToast(`Total: ${total.toLocaleString()} EGP`);
            } else {
                showToast('Enter valid numbers');
            }
        });
    }

    // 7. Tools Logic (Estimator)
    const estInputs = document.querySelectorAll('#est-type, #est-db, #est-api');
    const estTotal = document.getElementById('est-total');

    function calculateEst() {
        let total = parseInt(document.getElementById('est-type').value) || 0;
        if (document.getElementById('est-db').checked) total += parseInt(document.getElementById('est-db').value);
        if (document.getElementById('est-api').checked) total += parseInt(document.getElementById('est-api').value);
        
        estTotal.innerHTML = `${total.toLocaleString()} <small>EGP</small>`;
    }
    estInputs.forEach(el => el.addEventListener('change', calculateEst));

    // 8. Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyB47U_HoMgBD2UGAtaZmbJ4D-C0OOPL_Ek",
        authDomain: "kerullus-portfolio.firebaseapp.com",
        projectId: "kerullus-portfolio",
        storageBucket: "kerullus-portfolio.firebasestorage.app",
        messagingSenderId: "159934978422",
        appId: "1:159934978422:web:b51c0ba691b13e2a940257",
        measurementId: "G-JWX6S4CTGQ",
        databaseURL: "https://kerullus-portfolio-default-rtdb.firebaseio.com"
    };

    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        const ref = db.ref('guestbook_messages');

        ref.limitToLast(10).on('child_added', (snap) => {
            const data = snap.val();
            const feed = document.getElementById('messages-feed');
            
            const spinner = feed.querySelector('.loading-spinner');
            if(spinner) spinner.remove();

            const div = document.createElement('div');
            div.className = 'message-bubble';
            const safeName = data.name ? data.name.replace(/</g, "&lt;") : 'User';
            const safeMsg = data.message ? data.message.replace(/</g, "&lt;") : '...';
            
            div.innerHTML = `
                <div class="msg-meta">${safeName}</div>
                <div class="msg-text">${safeMsg}</div>
            `;
            feed.prepend(div);
        });

        // Chart.js Init (Safe)
        try {
            const chartEl = document.getElementById('myChart');
            if (chartEl && typeof Chart !== 'undefined') {
                new Chart(chartEl, {
                    type: 'bar', // غيرت لـ bar عشان أوضح في الموبايل
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                        datasets: [{
                            label: 'Activity',
                            data: [12, 19, 8, 15],
                            backgroundColor: '#3b82f6',
                            borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { y: { beginAtZero: true, grid: { display: false } } }
                    }
                });  
            }
        } catch (e) {}

        // Typed.js (Safe)
        try {
            if (typeof Typed !== 'undefined') {
                new Typed('#typed-text', {
                    strings: ['Software Engineer.', 'Web Developer.', 'Creative.'],
                    typeSpeed: 50,
                    backSpeed: 30,
                    loop: true,
                    showCursor: false // Cursor makes layout jump sometimes
                });
            }
        } catch (e) {}

        // Send Msg
        const sendBtn = document.getElementById('gb-send');
        if(sendBtn) {
            sendBtn.addEventListener('click', () => {
                const nameIn = document.getElementById('gb-name');
                const msgIn = document.getElementById('gb-msg');
                if(nameIn.value.trim() && msgIn.value.trim()) {
                    ref.push().set({ 
                        name: nameIn.value.trim(), 
                        message: msgIn.value.trim(), 
                        timestamp: Date.now() 
                    });
                    msgIn.value = ''; 
                    showToast('Sent!');
                }
            });
        }
    }
});
