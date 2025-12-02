let members = [];
let balances = {};

// -------- PROFILE DROPDOWN ----------
document.getElementById("profileIcon").addEventListener("click", () => {
    const box = document.getElementById("logoutBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
});


// -------- TAG INPUT SYSTEM ----------
const nameInput = document.getElementById("nameInput");
const tagBox = document.getElementById("nameTags");

// Enter or comma adds tag
nameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(nameInput.value.trim());
        nameInput.value = "";
    }
});

// Add on blur (click outside)
nameInput.addEventListener("blur", () => {
    if (nameInput.value.trim() !== "") {
        addTag(nameInput.value.trim());
        nameInput.value = "";
    }
});

function addTag(name) {
    if (!name) return;
    if (members.includes(name)) return;

    members.push(name);
    balances[name] = 0;

    updateDropdowns();

    let tag = document.createElement("div");
    tag.classList.add("tag");
    tag.innerHTML = `${name} <span onclick="removeTag('${name}')">×</span>`;
    tagBox.appendChild(tag);
}

function removeTag(name) {
    members = members.filter(n => n !== name);
    delete balances[name];

    tagBox.innerHTML = "";
    members.forEach(n => addTag(n));

    updateDropdowns();
}


// -------- UPDATE DROPDOWNS ----------
function updateDropdowns() {
    let payer = document.getElementById("payerSelect");
    let payerPay = document.getElementById("payerPaySelect");
    let receiver = document.getElementById("receiverSelect");

    payer.innerHTML = "";
    payerPay.innerHTML = "";
    receiver.innerHTML = "";

    members.forEach(m => {
        payer.innerHTML += `<option value="${m}">${m}</option>`;
        payerPay.innerHTML += `<option value="${m}">${m}</option>`;
        receiver.innerHTML += `<option value="${m}">${m}</option>`;
    });
}


// -------- ADD EXPENSE ----------
function addExpense() {
    let desc = document.getElementById("descInput").value.trim();
    let payer = document.getElementById("payerSelect").value;
    let amount = parseFloat(document.getElementById("amountInput").value);

    if (!desc || !payer || !amount) return;

    let share = amount / members.length;

    members.forEach(m => {
        if (m === payer) {
            balances[m] += amount - share;
        } else {
            balances[m] -= share;
        }
    });

    updateBalances();

    document.getElementById("descInput").value = "";
    document.getElementById("amountInput").value = "";
}


// -------- RECORD PAYMENT ----------
function recordPayment() {
    let payer = document.getElementById("payerPaySelect").value;
    let receiver = document.getElementById("receiverSelect").value;
    let amount = parseFloat(document.getElementById("payAmount").value);

    if (payer === receiver || !amount) return;

    balances[payer] += amount;
    balances[receiver] -= amount;

    updateBalances();

    document.getElementById("payAmount").value = "";
}


// -------- UPDATE BALANCES ----------
function updateBalances() {
    const box = document.getElementById("balances");
    box.innerHTML = "";

    for (let m in balances) {
        box.innerHTML += `<div>${m}: ₹${balances[m].toFixed(2)}</div>`;
    }
}
