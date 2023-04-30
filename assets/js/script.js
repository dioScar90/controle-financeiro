const transactionUl = document.querySelector("#transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");



const localStorageTransactions = JSON.parse(localStorage
    .getItem("transactions"));
let transactions = localStorage
    .getItem("transactions") !== null ? localStorageTransactions : [];

// let transactions = [
//     { id: 1, name: "Bolo de brigadeiro", amount: -20 },
//     { id: 2, name: "Salário", amount: 300 },
//     { id: 3, name: "Torta de frango", amount: -10 },
//     { id: 4, name: "Violão", amount: 150 }
// ];

const removeTransaction = id => {
    transactions = transactions
        .filter(trans => trans.id !== id);

    updateLocalStorage();
    init();
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CssClass = transaction.amount < 0 ? "minus" : "plus";
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement("li");

    li.classList.add(CssClass);
    li.innerHTML = `
        ${transaction.name}
        <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    transactionUl.append(li);
}

const updateBalanceValues = () => {
    const transactionsAmount  = transactions
        .map(transaction => transaction.amount);
    const total = transactionsAmount
        .reduce((acc, trans) => acc + trans, 0)
        .toFixed(2);
    const income = transactionsAmount
        .filter(value => value > 0)
        .reduce((acc, val) => acc + val, 0)
        .toFixed(2);
    const expense = Math.abs(transactionsAmount
        .filter(value => value < 0)
        .reduce((acc, val) => acc + val, 0))
        .toFixed(2);
    
    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expense}`;
}

const init = () => {
    transactionUl.replaceChildren();

    transactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();
}

init();

const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

const generateId = () => Math.round(Math.random() * 1000);

form.addEventListener("submit", e => {
    e.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();

    if (transactionName === '' || transactionAmount === '') {
        alert("Por favor, preencha tanto o nome quanto o valor da transação.");
        return;
    }

    const transaction = {
        id: generateId(),
        name: transactionName,
        amount: +transactionAmount
    };

    transactions.push(transaction);
    init();
    updateLocalStorage();

    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
})