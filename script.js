const powerSwitch = document.getElementById('power-switch');
const clickSound = document.getElementById('click-sound');
const greetingElement = document.getElementById('smart-greeting');

powerSwitch.addEventListener('change', () => {

    document.body.classList.toggle('dark-mode');
    
    if (powerSwitch.checked) {
        document.body.style.transform = "scale(1.005)";
        setTimeout(() => document.body.style.transform = "scale(1)", 100);
    }
});
function setSmartGreeting() {
    const hour = new Date().getHours();
    const date = new Date();
    const isBirthday = date.getDate() === 6 && date.getMonth() === 11; 

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


const username = "keroashraf12"; 
const statsContainer = document.getElementById('stats-container');

async function fetchGitHubStats() {
    try {
        
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        if (data.message === "Not Found") {
            statsContainer.innerHTML = "❌ User not found";
            return;
        }

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

        animateNumbers();

    } catch (error) {
        console.error("Error fetching stats:", error);
        statsContainer.innerHTML = "⚠️ Failed to load stats";
    }
}

function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(num => {
        const target = +num.innerText;
        const increment = target / 20; 
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

fetchGitHubStats();


const projectType = document.getElementById('project-type');
const addDatabase = document.getElementById('add-database');
const addDesign = document.getElementById('add-design');
const addUrgent = document.getElementById('add-urgent');
const finalPriceDisplay = document.getElementById('final-price');

function calculatePrice() {

    let price = parseInt(projectType.value, 10);


    if (addDatabase.checked) {
        price += parseInt(addDatabase.value, 10);
    }
    if (addDesign.checked) {
        price += parseInt(addDesign.value, 10);
    }


    if (addUrgent.checked) {
        price = price * parseFloat(addUrgent.value);
    }

    finalPriceDisplay.innerText = price.toLocaleString(); 
    
    finalPriceDisplay.parentElement.style.transform = "scale(1.05)";
    setTimeout(() => {
        finalPriceDisplay.parentElement.style.transform = "scale(1)";
    }, 200);
}

[projectType, addDatabase, addDesign, addUrgent].forEach(element => {
    element.addEventListener('change', calculatePrice);
});

calculatePrice();


function calculateTex() {
    const price = parseFloat(document.getElementById('tex-price').value) || 0;
    const qty = parseFloat(document.getElementById('tex-qty').value) || 0;
    const discount = parseFloat(document.getElementById('tex-discount').value) || 0;
    const consoleDiv = document.getElementById('tex-output');

    consoleDiv.innerHTML = "> Processing order...<br>";

    setTimeout(() => {
        const subtotal = price * qty;
        const discountValue = subtotal * (discount / 100);
        const total = subtotal - discountValue;

        consoleDiv.innerHTML += `
            > -------------------------<br>
            > Subtotal: ${subtotal} EGP<br>
            > Discount: -${discountValue} EGP<br>
            > <strong>TOTAL: ${total} EGP</strong><br>
            > -------------------------<br>
            > Status: Order Confirmed ✅
        `;
    }, 500); 
}


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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const db = firebase.database();
const messagesRef = db.ref('guestbook_messages');

function sendMessage() {
    const nameInput = document.getElementById('guest-name');
    const msgInput = document.getElementById('guest-msg');
    
    const name = nameInput.value.trim();
    const msg = msgInput.value.trim();

    if (name === "" || msg === "") {
        alert("Please enter both name and message!");
        return;
    }

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

    msgInput.value = "";
}

const msgList = document.getElementById('messages-list');

messagesRef.on('child_added', (snapshot) => {
    if(document.querySelector('.msg-loading')) {
        document.querySelector('.msg-loading').remove();
    }

    const data = snapshot.val();
    const date = new Date(data.timestamp).toLocaleTimeString();
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message-bubble');
    msgDiv.innerHTML = `
        <div class="msg-header">
            <span class="msg-name">${data.name}</span>
            <span class="msg-time">${date}</span>
        </div>
        <div class="msg-text">${data.message}</div>
    `;

    msgList.prepend(msgDiv);
});
