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

const addTransactionIntoDOM = ({ amount, name, id }) => {
    const operator = amount < 0 ? '-' : '+';
    const CssClass = amount < 0 ? "minus" : "plus";
    const amountWithoutOperator = Math.abs(amount);
    const li = document.createElement("li");

    li.classList.add(CssClass);
    li.innerHTML = `
        ${name}
        <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onclick="removeTransaction(${id})">x</button>
    `;

    transactionUl.append(li);
}

const getTotal = transactionsAmount => transactionsAmount
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);

const getIncome = transactionsAmount => transactionsAmount
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

const getExpenses = transactionsAmount => Math.abs(transactionsAmount
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);

const updateBalanceValues = () => {
    const transactionsAmount  = transactions.map(({ amount }) => amount);
    const total = getTotal(transactionsAmount);
    const income = getIncome(transactionsAmount);
    const expense = getExpenses(transactionsAmount);
    
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

const addToTransactionArray = (transactionName, transactionAmount) => {
    const transaction = {
        id: generateId(),
        name: transactionName,
        amount: +transactionAmount
    };

    transactions.push(transaction);
}

const clearInputs = () => {
    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
}

const handleFormSubmit = e => {
    e.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    const isSomeInputEmpty = transactionName === '' || transactionAmount === '';

    if (isSomeInputEmpty) {
        alert("Por favor, preencha tanto o nome quanto o valor da transação.");
        return;
    }

    addToTransactionArray(transactionName, transactionAmount);
    init();
    updateLocalStorage();
    clearInputs();
}

form.addEventListener("submit", handleFormSubmit);