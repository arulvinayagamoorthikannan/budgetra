// Store all transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


// Get HTML elements
const form = document.getElementById("transactionForm");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");

const transactionList = document.getElementById("transactionList");


// Add transaction
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    transactions.push(transaction);

    saveTransactions();

    displayTransactions();

    updateSummary();

    form.reset();

});


// Save transactions to LocalStorage
function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// Display transactions
function displayTransactions() {

    transactionList.innerHTML = "";

    if (transactions.length === 0) {

        transactionList.innerHTML =
            '<p class="empty">No transactions yet.</p>';

        return;
    }


    transactions.forEach(function(transaction) {

        const transactionElement = document.createElement("div");

        transactionElement.classList.add("transaction");

        const sign = transaction.type === "income" ? "+" : "-";

        transactionElement.innerHTML = `

            <div class="transaction-info">

                <h3>${transaction.description}</h3>

                <p>${transaction.category}</p>

            </div>

            <div>

                <span class="amount ${transaction.type}">
                    ${sign} ₹${transaction.amount.toFixed(2)}
                </span>

                <button 
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>

            </div>

        `;

        transactionList.appendChild(transactionElement);

    });

}


// Update summary
function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;


    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            totalIncome += transaction.amount;

        } else {

            totalExpense += transaction.amount;

        }

    });


    const balance = totalIncome - totalExpense;


    incomeElement.textContent =
        `₹${totalIncome.toFixed(2)}`;

    expenseElement.textContent =
        `₹${totalExpense.toFixed(2)}`;

    balanceElement.textContent =
        `₹${balance.toFixed(2)}`;

}


// Delete transaction
function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {

        return transaction.id !== id;

    });

    saveTransactions();

    displayTransactions();

    updateSummary();

}


// Load data when page opens
displayTransactions();
updateSummary();