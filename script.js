const transactionUl = document.querySelector('#transactions');

const transactions = [    
    { id: 1, name: 'Salário', amount: 1600 },
    { id: 2, name: 'Cartão C6 Banck', amount: -50 },
    { id: 3, name: 'Cartão Americanas', amount: -100 },
    { id: 4, name: 'Cartão Casas Bahia', amount: -20 },
    { id: 5, name: 'Cartão Nubank', amount: -10 },
    { id: 6, name: 'Flash (VR)', amount: 1000 }
];

const addTransactions = transaction => {

    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
        ${ transaction.name } <span> ${ operator } R$ ${ amountWithoutOperator }</span><button class="delete-btn">x</button>
    `

    transactionUl.prepend(li);

};

