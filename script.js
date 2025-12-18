const powerSwitch = document.getElementById('power-switch');
const clickSound = document.getElementById('click-sound');
const greetingElement = document.getElementById('smart-greeting');

// 1. تشغيل الصوت والوضع الليلي
powerSwitch.addEventListener('change', () => {
    // شغل صوت التكة لو الملف موجود
    // clickSound.play(); 
    
    document.body.classList.toggle('dark-mode');
    
    // هزة بسيطة للشاشة كأن الكهرباء اشتغلت
    if (powerSwitch.checked) {
        document.body.style.transform = "scale(1.005)";
        setTimeout(() => document.body.style.transform = "scale(1)", 100);
    }
});

// 2. الترحيب الذكي
function setSmartGreeting() {
    const hour = new Date().getHours();
    const date = new Date();
    const isBirthday = date.getDate() === 6 && date.getMonth() === 11; // 6 December (Month is 0-indexed)

    if (isBirthday) {
        greetingElement.innerText = "🎉 Happy Birthday to Me! 🎉";
        greetingElement.style.color = "gold";
    } else if (hour < 12) {
        greetingElement.innerText = "Good Morning, Engineer.";
    } else if (hour < 18) {
        greetingElement.innerText = "Good Afternoon.";
    } else {
        greetingElement.innerText = "Good Evening, Coder.";
    }
}

setSmartGreeting();
// ==========================================
// GitHub API Integration (Level 1)
// ==========================================

const username = "keroashraf12"; // ⚠️ استبدل ده باليوزر نيم بتاعك الحقيقي على جيت هب
const statsContainer = document.getElementById('stats-container');

async function fetchGitHubStats() {
    try {
        // بنعمل Request لـ GitHub API
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        // لو اليوزر مش موجود أو فيه مشكلة
        if (data.message === "Not Found") {
            statsContainer.innerHTML = "❌ User not found";
            return;
        }

        // عرض البيانات بشكل HTML جوه الصفحة
        statsContainer.innerHTML = `
            <div class="stat-card">
                <i class="fab fa-github"></i>
                <span class="stat-number">${data.public_repos}</span>
                <span class="stat-label">Public Repos</span>
            </div>
            <div class="stat-card">
                <i class="fas fa-users"></i>
                <span class="stat-number">${data.followers}</span>
                <span class="stat-label">Followers</span>
            </div>
            <div class="stat-last-update">
                Last active: ${new Date(data.updated_at).toLocaleDateString()}
            </div>
        `;

        // إضافة تأثير حركة بسيط (Animation) للأرقام
        animateNumbers();

    } catch (error) {
        console.error("Error fetching stats:", error);
        statsContainer.innerHTML = "⚠️ Failed to load stats";
    }
}

// دالة بسيطة عشان تعمل حركة للعداد
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(num => {
        const target = +num.innerText;
        const increment = target / 20; // سرعة العد
        let current = 0;

        const updateCount = () => {
            current += increment;
            if(current < target) {
                num.innerText = Math.ceil(current);
                setTimeout(updateCount, 40);
            } else {
                num.innerText = target;
            }
        };
        updateCount();
    });
}

// استدعاء الدالة لما الموقع يفتح
fetchGitHubStats();

// =========================================
// Freelance Calculator Logic (Level 2)
// =========================================
const projectType = document.getElementById('project-type');
const addDatabase = document.getElementById('add-database');
const addDesign = document.getElementById('add-design');
const addUrgent = document.getElementById('add-urgent');
const finalPriceDisplay = document.getElementById('final-price');

function calculatePrice() {
    // 1. السعر الأساسي (Base Price)
    let price = parseInt(projectType.value, 10);

    // 2. الإضافات (Add-ons)
    if (addDatabase.checked) {
        price += parseInt(addDatabase.value, 10);
    }
    if (addDesign.checked) {
        price += parseInt(addDesign.value, 10);
    }

    // 3. الاستعجال (Multiplier)
    if (addUrgent.checked) {
        price = price * parseFloat(addUrgent.value);
    }

    // 4. تحديث الرقم في الشاشة مع حركة بسيطة
    // نعمل Formating للرقم عشان يبقى شكله حلو (3,000 بدل 3000)
    finalPriceDisplay.innerText = price.toLocaleString(); 
    
    // حركة بصرية إن الرقم ينور لما يتغير
    finalPriceDisplay.parentElement.style.transform = "scale(1.05)";
    setTimeout(() => {
        finalPriceDisplay.parentElement.style.transform = "scale(1)";
    }, 200);
}

// تشغيل الدالة كل ما اليوزر يغير أي حاجة
// بنضيف "Event Listeners" لكل المدخلات
[projectType, addDatabase, addDesign, addUrgent].forEach(element => {
    element.addEventListener('change', calculatePrice);
});

// Initialize
calculatePrice();

// =========================================
// Al-Naeem Tex Mini-App Logic
// =========================================
function calculateTex() {
    // 1. قراءة المدخلات
    const price = parseFloat(document.getElementById('tex-price').value) || 0;
    const qty = parseFloat(document.getElementById('tex-qty').value) || 0;
    const discount = parseFloat(document.getElementById('tex-discount').value) || 0;
    const consoleDiv = document.getElementById('tex-output');

    // 2. محاكاة التفكير (Processing...)
    consoleDiv.innerHTML = "> Processing order...<br>";

    setTimeout(() => {
        // 3. الحسابات
        const subtotal = price * qty;
        const discountValue = subtotal * (discount / 100);
        const total = subtotal - discountValue;

        // 4. عرض النتيجة زي الـ CMD
        consoleDiv.innerHTML += `
            > -------------------------<br>
            > Subtotal: ${subtotal} EGP<br>
            > Discount: -${discountValue} EGP<br>
            > <strong>TOTAL: ${total} EGP</strong><br>
            > -------------------------<br>
            > Status: Order Confirmed ✅
        `;
    }, 500); // تأخير نص ثانية عشان يحس انه بيحمل
}

// =========================================
// Guestbook Logic (Firebase Realtime DB)
// =========================================

// دي بيانات مشروعك الحقيقية (تم تعديلها لتعمل مع HTML)
const firebaseConfig = {
    apiKey: "AIzaSyB47U_HoMgBD2UGAtaZmbJ4D-C0OOPL_Ek",
    authDomain: "kerullus-portfolio.firebaseapp.com",
    projectId: "kerullus-portfolio",
    storageBucket: "kerullus-portfolio.firebasestorage.app",
    messagingSenderId: "159934978422",
    appId: "1:159934978422:web:b51c0ba691b13e2a940257",
    measurementId: "G-JWX6S4CTGQ",
    // ⚠️ ضفتلك اللينك ده، ده العنوان الافتراضي للداتابيز بتاعتك
    databaseURL: "https://kerullus-portfolio-default-rtdb.firebaseio.com" 
};

// تهيئة فايربيس (التأكد إنه مش شغال بالفعل)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // لو شغال هاته
}

const db = firebase.database();
const messagesRef = db.ref('guestbook_messages');

// 1. دالة إرسال الرسالة
function sendMessage() {
    const nameInput = document.getElementById('guest-name');
    const msgInput = document.getElementById('guest-msg');
    
    const name = nameInput.value.trim();
    const msg = msgInput.value.trim();

    if (name === "" || msg === "") {
        alert("Please enter both name and message!");
        return;
    }

    // إرسال للداتابيز
    const newMsgRef = messagesRef.push();
    newMsgRef.set({
        name: name,
        message: msg,
        timestamp: Date.now()
    }).then(() => {
        console.log("Message Sent!");
    }).catch((error) => {
        console.error("Error sending message: ", error);
        alert("Error: " + error.message);
    });

    // فضي الخانات
    msgInput.value = "";
}

// 2. دالة استقبال الرسائل (Live)
const msgList = document.getElementById('messages-list');

// الكود ده بيشتغل أوتوماتيك كل ما حد يضيف رسالة جديدة
messagesRef.on('child_added', (snapshot) => {
    // أول مرة بس شيل كلمة Loading
    if(document.querySelector('.msg-loading')) {
        document.querySelector('.msg-loading').remove();
    }

    const data = snapshot.val();
    
    // تحويل الوقت لتاريخ مفهوم
    const date = new Date(data.timestamp).toLocaleTimeString();

    // إنشاء كارت الرسالة
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message-bubble');
    msgDiv.innerHTML = `
        <div class="msg-header">
            <span class="msg-name">${data.name}</span>
            <span class="msg-time">${date}</span>
        </div>
        <div class="msg-text">${data.message}</div>
    `;

    // ضيف الرسالة في الأول
    msgList.prepend(msgDiv);
});