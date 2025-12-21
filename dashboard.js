let members = [];
let expenses = [];

/* GROUP */
function saveGroupName() {
    if (!groupNameInput.value.trim()) return;
    groupNameSection.style.display = "none";
    savedGroupNameBox.style.display = "flex";
    savedGroupName.textContent = groupNameInput.value;
}

function resetTrip() {
    members = [];
    expenses = [];
    nameTags.innerHTML = "";
    expenseList.innerHTML = "";
    summaryBox.innerHTML = "";
    payerSelect.innerHTML = "<option disabled selected>Select Payer</option>";
    groupNameSection.style.display = "flex";
    savedGroupNameBox.style.display = "none";
}

/* MEMBERS */
nameInput.addEventListener("keypress", e => {
    if (e.key === "Enter" && nameInput.value.trim()) {
        members.push(nameInput.value.trim());
        nameInput.value = "";
        renderMembers();
    }
});

function renderMembers() {
    nameTags.innerHTML = "";
    payerSelect.innerHTML = "<option disabled selected>Select Payer</option>";
    members.forEach(m => {
        nameTags.innerHTML += `<div class="tag">${m}</div>`;
        payerSelect.innerHTML += `<option>${m}</option>`;
    });
}

/* RECEIPT SCAN (OCR) */
receiptInput.addEventListener("change", () => {
    const file = receiptInput.files[0];
    if (!file) return;

    scanStatus.textContent = "🔍 Scanning receipt...";

    Tesseract.recognize(file, 'eng')
        .then(({ data: { text } }) => {
            scanStatus.textContent = "✅ Receipt scanned";

            let amountMatch = text.match(/₹\s?\d+(\.\d+)?|\b\d{2,6}(\.\d{1,2})?\b/);
            if (amountMatch) {
                amountInput.value = amountMatch[0].replace("₹", "");
            }

            let lines = text.split("\n").filter(l => l.trim().length > 4);
            if (lines.length) descInput.value = lines[0];
        })
        .catch(() => {
            scanStatus.textContent = "❌ Scan failed";
        });
});

/* ADD EXPENSE */
function addExpense() {
    if (!descInput.value || !amountInput.value || !payerSelect.value) return;

    expenses.push({
        desc: descInput.value,
        payer: payerSelect.value,
        amount: Number(amountInput.value)
    });

    descInput.value = "";
    amountInput.value = "";
    payerSelect.selectedIndex = 0;

    renderExpenses();
    updateSummary();
}

/* EXPENSE LIST */
function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(e => {
        expenseList.innerHTML += `
        <div class="expense-card">
            <b>${e.desc}</b>
            <p>Payer: ${e.payer}</p>
            <p>₹ ${e.amount}</p>
        </div>`;
    });
}

/* SUMMARY */
function updateSummary() {
    summaryBox.innerHTML = "";

    let total = expenses.reduce((s,e)=>s+e.amount,0);
    let share = total / members.length;

    let paid = {}, balance = {};
    members.forEach(m => paid[m] = balance[m] = 0);

    expenses.forEach(e => paid[e.payer] += e.amount);
    members.forEach(m => balance[m] = paid[m] - share);

    summaryBox.innerHTML += `<div>Total: ₹${total}</div>`;
    summaryBox.innerHTML += `<div>Each Share: ₹${share.toFixed(2)}</div>`;
    summaryBox.innerHTML += `<hr>`;

    members.forEach(m => {
        if (balance[m] > 0)
            summaryBox.innerHTML += `<div style="color:green">${m} receives ₹${balance[m].toFixed(2)}</div>`;
        else if (balance[m] < 0)
            summaryBox.innerHTML += `<div style="color:red">${m} pays ₹${Math.abs(balance[m]).toFixed(2)}</div>`;
        else
            summaryBox.innerHTML += `<div>${m} settled</div>`;
    });
}
