class Transaction {
    constructor(id, name, amount) {
        this.id = id;
        this.name = name;
        this.amount = amount;
    }
}

const dummyTransactions = [
    new Transaction(1, "Bolo de brigadeiro", -20),
    new Transaction(2, "Salário", 300),
    new Transaction(3, "Torta de frango", -10),
    new Transaction(4, "Violão", 150),
];

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    console.log(operator);
    // <li class="minus">
    //   Salário <span>-$400</span><button class="delete-btn">x</button>
    // </li>
}

addTransactionIntoDOM(dummyTransactions[1]);