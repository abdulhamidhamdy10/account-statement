window.onload = function () {
    loadIncomeData();
    loadExpenseData();
    updateBalance(); // تحديث الفرق عند تحميل الصفحة
};

// create data
function addIncomeRow() {
    const incomeType = document.getElementById("incomeType").value;
    const incomeValue = parseFloat(document.getElementById("incomeValue").value);
    const currentDate = new Date().toLocaleDateString('ar-EG'); // الحصول على تاريخ الإضافة

    if (incomeType && !isNaN(incomeValue)) {
        const incomeBody = document.getElementById("incomeBody");
        const newRow = incomeBody.insertRow(incomeBody.rows.length);

        newRow.insertCell(0).textContent = incomeType;
        newRow.insertCell(1).textContent = incomeValue.toFixed(2);
        newRow.insertCell(2).innerHTML = `
            <button class="btn btn-danger btn-sm" onclick="deleteIncomeRow(this)">حذف</button>
            <button class="btn btn-warning btn-sm" onclick="editIncomeRow(this)">تعديل</button>
            <div style="margin-top: 5px; font-size: 0.9em;">تاريخ الإضافة: ${currentDate}</div>
        `;

        updateIncomeTotal();
        saveIncomeData();
        updateBalance(); // تحديث الفرق بعد إضافة إيراد

        document.getElementById("incomeType").value = '';
        document.getElementById("incomeValue").value = '';
    } else {
        alert("يرجى ملء جميع الحقول بشكل صحيح.");
    }
}

function addExpenseRow() {
    const expenseType = document.getElementById("expenseType").value;
    const expenseValue = parseFloat(document.getElementById("expenseValue").value);
    const currentDate = new Date().toLocaleDateString('ar-EG'); // الحصول على تاريخ الإضافة

    if (expenseType && !isNaN(expenseValue)) {
        const expenseBody = document.getElementById("expenseBody");
        const newRow = expenseBody.insertRow(expenseBody.rows.length);

        newRow.insertCell(0).textContent = expenseType;
        newRow.insertCell(1).textContent = expenseValue.toFixed(2);
        newRow.insertCell(2).innerHTML = `
            <button class="btn btn-danger btn-sm" onclick="deleteExpenseRow(this)">حذف</button>
            <button class="btn btn-warning btn-sm" onclick="editExpenseRow(this)">تعديل</button>
            <div style="margin-top: 5px; font-size: 0.9em;">تاريخ الإضافة: ${currentDate}</div>
        `;

        updateExpenseTotal();
        saveExpenseData();
        updateBalance(); // تحديث الفرق بعد إضافة مصروف

        document.getElementById("expenseType").value = '';
        document.getElementById("expenseValue").value = '';
    } else {
        alert("يرجى ملء جميع الحقول بشكل صحيح.");
    }
}

// update data
function updateIncomeTotal() {
    const incomeBody = document.getElementById("incomeBody");
    const rows = incomeBody.getElementsByTagName("tr");
    let total1 = 0;

    for (let row of rows) {
        const value = parseFloat(row.cells[1].textContent);
        if (!isNaN(value)) {
            total1 += value;
        }
    }

    document.getElementById("incomeTotal").textContent = `مجموع الدخل: ${total1.toFixed(2)} جنيه`;
}

function updateExpenseTotal() {
    const expenseBody = document.getElementById("expenseBody");
    const rows = expenseBody.getElementsByTagName("tr");
    let total2 = 0;

    for (let row of rows) {
        const value = parseFloat(row.cells[1].textContent);
        if (!isNaN(value)) {
            total2 += value;
        }
    }

    document.getElementById("expenseTotal").textContent = `مجموع الدفع: ${total2.toFixed(2)} جنيه`;
}

function updateBalance() {
    const incomeTotal = parseFloat(document.getElementById("incomeTotal").textContent.replace("مجموع الدخل: ", "").replace(" جنيه", "")) || 0;
    const expenseTotal = parseFloat(document.getElementById("expenseTotal").textContent.replace("مجموع الدفع: ", "").replace(" جنيه", "")) || 0;
    const balance = incomeTotal - expenseTotal;

    if(balance < 0){
        document.getElementById("balanceTotal").style = 'color : red'
        document.getElementById("balanceTotal").textContent = `( عليك : ${balance.toFixed(2)} جنيه )`;
    }else if(balance > 0){
        document.getElementById("balanceTotal").style = 'color : green'
        document.getElementById("balanceTotal").textContent = `( معاك : ${Math.abs(balance).toFixed(2)} جنيه )`;
    }else{
        document.getElementById("balanceTotal").style = 'color : white'
        document.getElementById("balanceTotal").textContent = `( معاك : ${balance.toFixed(2)} جنيه )`;
    }

    saveBalanceData(balance); // حفظ الفرق في localStorage
}

// operation
function deleteIncomeRow(button) {
    const row = button.parentNode.parentNode;

    const confirmation = confirm("هل أنت متأكد أنك تريد حذف هذا الصف؟");
    if (confirmation) {
        row.remove();
        updateIncomeTotal();
        saveIncomeData();
        updateBalance(); // تحديث الفرق بعد حذف إيراد
    }
}

function deleteExpenseRow(button) {
    const row = button.parentNode.parentNode;

    const confirmation = confirm("هل أنت متأكد أنك تريد حذف هذا الصف؟");
    if (confirmation) {
        row.remove();
        updateExpenseTotal();
        saveExpenseData();
        updateBalance(); // تحديث الفرق بعد حذف مصروف
    }
}

function editIncomeRow(button) {
    const row = button.parentNode.parentNode;
    const incomeType = row.cells[0].textContent;
    const incomeValue = parseFloat(row.cells[1].textContent);

    const newIncomeType = prompt("تعديل نوع الدخل:", incomeType);
    const newIncomeValue = prompt("تعديل قيمة الدخل:", incomeValue);

    if (newIncomeType && !isNaN(newIncomeValue)) {
        row.cells[0].textContent = newIncomeType;
        row.cells[1].textContent = parseFloat(newIncomeValue).toFixed(2);

        updateIncomeTotal();
        saveIncomeData();
        updateBalance(); // تحديث الفرق بعد تعديل إيراد
    }
}

function editExpenseRow(button) {
    const row = button.parentNode.parentNode;
    const expenseType = row.cells[0].textContent;
    const expenseValue = parseFloat(row.cells[1].textContent);

    const newExpenseType = prompt("تعديل نوع الدفع:", expenseType);
    const newExpenseValue = prompt("تعديل قيمة الدفع:", expenseValue);

    if (newExpenseType && !isNaN(newExpenseValue)) {
        row.cells[0].textContent = newExpenseType;
        row.cells[1].textContent = parseFloat(newExpenseValue).toFixed(2);

        updateExpenseTotal();
        saveExpenseData();
        updateBalance(); // تحديث الفرق بعد تعديل مصروف
    }
}

// localStorage
function saveIncomeData() {
    const incomeBody = document.getElementById("incomeBody");
    const rows = incomeBody.getElementsByTagName("tr");
    const incomeData = [];

    for (let row of rows) {
        incomeData.push({
            type: row.cells[0].textContent,
            value: parseFloat(row.cells[1].textContent),
            date: row.cells[2].querySelector('div').textContent // الحصول على تاريخ الإضافة
        });
    }

    localStorage.setItem("incomeData", JSON.stringify(incomeData));
}

function loadIncomeData() {
    const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
    const incomeBody = document.getElementById("incomeBody");

    incomeData.forEach(data => {
        const newRow = incomeBody.insertRow(incomeBody.rows.length);
        newRow.insertCell(0).textContent = data.type;
        newRow.insertCell(1).textContent = data.value.toFixed(2);
        newRow.insertCell(2).innerHTML = `
            <button class="btn btn-danger btn-sm" onclick="deleteIncomeRow(this)">حذف</button>
            <button class="btn btn-warning btn-sm" onclick="editIncomeRow(this)">تعديل</button>
            <div style="margin-top: 5px; font-size: 0.9em;">${data.date}</div>
        `;
    });

    updateIncomeTotal();
}

function saveExpenseData() {
    const expenseBody = document.getElementById("expenseBody");
    const rows = expenseBody.getElementsByTagName("tr");
    const expenseData = [];

    for (let row of rows) {
        expenseData.push({
            type: row.cells[0].textContent,
            value: parseFloat(row.cells[1].textContent),
            date: row.cells[2].querySelector('div').textContent // الحصول على تاريخ الإضافة
        });
    }

    localStorage.setItem("expenseData", JSON.stringify(expenseData));
}

function loadExpenseData() {
    const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
    const expenseBody = document.getElementById("expenseBody");

    expenseData.forEach(data => {
        const newRow = expenseBody.insertRow(expenseBody.rows.length);
        newRow.insertCell(0).textContent = data.type;
        newRow.insertCell(1).textContent = data.value.toFixed(2);
        newRow.insertCell(2).innerHTML = `
            <button class="btn btn-danger btn-sm" onclick="deleteExpenseRow(this)">حذف</button>
            <button class="btn btn-warning btn-sm" onclick="editExpenseRow(this)">تعديل</button>
            <div style="margin-top: 5px; font-size: 0.9em;">${data.date}</div>
        `;
    });

    updateExpenseTotal();
}

function saveBalanceData(balance) {
    localStorage.setItem("balanceData", balance);
}

function loadBalanceData() {
    const savedBalance = localStorage.getItem("balanceData");
    if (savedBalance !== null) {
        document.getElementById("balanceTotal").textContent = `الفرق: ${parseFloat(savedBalance).toFixed(2)} جنيه`;
    }
}
