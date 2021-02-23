const transactionUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactonAmount = document.querySelector('#amount');

// let transactions = [    
//     { id: 1, name: 'Salário', amount: 1600 },
//     { id: 2, name: 'Cartão C6 Banck', amount: -50 },
//     { id: 5, name: 'Cartão Nubank', amount: -10 },
//     { id: 6, name: 'Flash (VR)', amount: 1000 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const removeTransaction = ID => {
    
    transactions = transactions.filter(transaction => transaction.id !== ID);

    init();

}

const addTransactions = transaction => {

    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
        ${ transaction.name } 
        <span> ${ operator } R$ ${ amountWithoutOperator }</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `

    transactionUl.prepend(li);

};

const updateBalanceValues = () => {

    const transactionsAmounts = transactions
        .map(transaction => transaction.amount);
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2);
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2);

    const expense = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0));

    balanceDisplay.textContent = `R$ ${ total }`;
    incomeDisplay.textContent = `R$ ${ income }`;
    expenseDisplay.textContent = `R$ ${ expense }`

}


// Executa o preenchimento das transações no DOM quando a página for carregada (Adiciona as transações no DOM).

const init = () => {

    transactionUl.innerHTML = '';
    
    transactions.forEach(addTransactions);
    updateBalanceValues();

}

init();

const generateID = () => Math.round(Math.random() * 1000);

form.addEventListener('submit', event => {

    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactonAmount.value.trim();

    if(transactionName === '' || transactionAmount === '') {
        alert('Por favor, preencha o nome e valor da transação!');
        return;
    };

    const transaction = { 
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    };

    transactions.push(transaction);

    init();

    inputTransactionName.value = '';
    inputTransactonAmount.value = '';

});