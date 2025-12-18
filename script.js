document.addEventListener('DOMContentLoaded', () => {

    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    const clockEl = document.getElementById('live-clock');
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
        showToast(newTheme === 'dark' ? 'Dark Mode On 🌙' : 'Light Mode On ☀️', 'info');
    });

    function updateIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    setInterval(() => {
        const now = new Date();
        clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: false });
    }, 1000);

    const hour = new Date().getHours();
    const greetEl = document.getElementById('greeting-text');
    let msg = "Welcome back, Engineer";
    if (hour < 12) msg = "Good Morning, Sir";
    else if (hour < 18) msg = "Good Afternoon, Sir";
    else msg = "Good Evening, Sir";
    greetEl.innerText = msg;

    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = type === 'success' ? 'check-circle' : 'info-circle';
        if(type === 'error') icon = 'exclamation-circle';
        
        toast.innerHTML = `<i class="fas fa-${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s reverse forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }


    async function loadStats() {
        const container = document.getElementById('stats-container');
        const username = "keroashraf12"; 
        
        try {
            await new Promise(r => setTimeout(r, 1500)); 
            
            const res = await fetch(`https://api.github.com/users/${username}`);
            if(!res.ok) throw new Error();
            const data = await res.json();

            container.innerHTML = `
                <div class="stat-card">
                    <div class="icon-box blue"><i class="fas fa-folder"></i></div>
                    <div><span class="stat-value">${data.public_repos}</span><span class="stat-label">Projects</span></div>
                </div>
                <div class="stat-card">
                    <div class="icon-box green"><i class="fas fa-users"></i></div>
                    <div><span class="stat-value">${data.followers}</span><span class="stat-label">Followers</span></div>
                </div>
                <div class="stat-card">
                    <div class="icon-box purple"><i class="fas fa-code"></i></div>
                    <div><span class="stat-value">Online</span><span class="stat-label">Status</span></div>
                </div>
            `;
        } catch {
            container.innerHTML = `<p style="color:red; padding:20px;">API Error (Check Internet)</p>`;
        }
    }
    loadStats();


    const calcBtn = document.getElementById('do-calc');
    const historyList = document.getElementById('history-list');

    if(calcBtn) {
        calcBtn.addEventListener('click', () => {
            const price = parseFloat(document.getElementById('calc-price').value);
            const qty = parseFloat(document.getElementById('calc-qty').value);

            if (price && qty) {
                const total = price * qty;
                                const li = document.createElement('li');
                li.innerHTML = `<span>${qty} x ${price}</span> <strong>${total.toLocaleString()} EGP</strong>`;
                                if(historyList.querySelector('.empty-hint')) historyList.innerHTML = '';
                
                historyList.prepend(li);
                showToast(`Result: ${total.toLocaleString()} EGP`);
            } else {
                showToast('Please enter valid numbers', 'error');
            }
        });
    }


    const estInputs = document.querySelectorAll('#est-type, #est-db, #est-api');
    const estTotal = document.getElementById('est-total');

    function calculateEst() {
        let total = parseInt(document.getElementById('est-type').value) || 0;
        if (document.getElementById('est-db').checked) total += parseInt(document.getElementById('est-db').value);
        if (document.getElementById('est-api').checked) total += parseInt(document.getElementById('est-api').value);
        
        estTotal.innerHTML = `${total.toLocaleString()} <small>EGP</small>`;
    }
    estInputs.forEach(el => el.addEventListener('change', calculateEst));

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


        function escapeHTML(str) {
            return str.replace(/[&<>'"]/g, tag => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
            }[tag]));
        }


        ref.limitToLast(20).on('child_added', (snap) => {
            const data = snap.val();
            const feed = document.getElementById('messages-feed');
            
            const spinner = feed.querySelector('.loading-spinner');
            if(spinner) spinner.remove();

            const div = document.createElement('div');
            div.className = 'message-bubble';
            
            div.innerHTML = `
                <div class="msg-meta">
                    <strong>${escapeHTML(data.name)}</strong>
                    <span>Just now</span>
                </div>
                <div class="msg-text">${escapeHTML(data.message)}</div>
            `;
            feed.prepend(div);
        });
        

    try {
        const chartEl = document.getElementById('myChart');
        if (chartEl && typeof Chart !== 'undefined') {
            new Chart(chartEl, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Contributions',
                        data: [12, 19, 3, 5, 2, 3],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59,130,246,0.08)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });  
            chartEl.style.minHeight = '160px';
        } else if (!chartEl) {
            console.warn('Chart canvas (#myChart) not found in DOM.');
        } else {
            console.warn('Chart.js is not loaded.');
        }
    } catch (e) {
        console.error('Failed to initialize chart:', e);
    }

    try {
        if (typeof Typed !== 'undefined') {
            var typed = new Typed('#typed-text', {
                strings: ['Software Engineer.', 'Web Developer.', 'Problem Solver.'],
                typeSpeed: 50,
                backSpeed: 30,
                loop: true
            });
        } else {
            console.warn('Typed.js not loaded.');
        }
    } catch (e) {
        console.error('Typed.js init error:', e);
    }
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
                    showToast('Message sent successfully!');
                } else {
                    showToast('Please fill all fields', 'error');
                }
            });
        }
    }
});
