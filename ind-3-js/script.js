// Array to store transactions

let transactions = [
    {
        id: generateUniqueId(),
        date: new Date('2024-05-16T10:00:00'), // Установим время 10:00:00
        amount: 150.00,
        category: 'Продукты',
        description: 'Покупка продуктов в магазине'
    },
    {
        id: generateUniqueId(),
        date: new Date('2024-05-16T12:00:00'), // Установим время 12:00:00
        amount: 6000.00,
        category: 'Зарплата',
        description: 'Месячная зарплата'
    },
    {
        id: generateUniqueId(),
        date: new Date('2024-05-15T15:30:00'), // Установим время 15:30:00
        amount: 60.00,
        category: 'Транспорт',
        description: 'Проезд на такси'
    },
    {
        id: generateUniqueId(),
        date: new Date('2024-05-15T18:45:00'), // Установим время 18:45:00
        amount: 100.00,
        category: 'Развлечения',
        description: 'Покупка билета в кино'
    },
    {
        id: generateUniqueId(),
        date: new Date('2024-05-14T09:15:00'), // Установим время 09:15:00
        amount: 500.00,
        category: 'Одежда',
        description: 'Покупка платья'
    }
]

/**
 * Add a new transaction to the transactions array based on user input.
 * @param {number} amount - The transaction amount.
 * @param {string} category - The category of the transaction.
 * @param {string} description - The description of the transaction.
 */

function addTransaction() {
    const id = generateUniqueId();
    const date = new Date();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const newTransaction = { id, date, amount, category, description };
    transactions.push(newTransaction);

    const tableBody = document.getElementById('transactionBody');
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', newTransaction.id); // Добавляем атрибут data-id
    newRow.innerHTML = `
        <td>${newTransaction.id}</td>
        <td>${newTransaction.date.toLocaleString()}</td>
        <td>${newTransaction.category}</td>
        <td>${newTransaction.description}</td>
        <td>${newTransaction.amount.toFixed(2)}</td>
        <td><button onclick="deleteTransaction('${newTransaction.id}')">Удалить</button></td>
    `;
    newRow.style.backgroundColor = newTransaction.amount >= 0 ? 'lightgreen' : 'lightcoral';
    tableBody.appendChild(newRow);

    updateTotalAmount();
}

/**
 * Delete a transaction from the transactions array based on its ID.
 * @param {string} id - The ID of the transaction to delete.
 */

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    const tableRow = document.querySelector(`tr[data-id="${id}"]`);
    tableRow.remove();

    updateTotalAmount();
}

/**
 * Calculate the total amount of all transactions.
 * @returns {number} The total amount of all transactions.
 */

function calculateTotal() {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

/**
 * Update the total amount displayed in the HTML.
 */

function updateTotalAmount() {
    const totalAmount = calculateTotal().toFixed(2);
    document.getElementById('totalAmount').textContent = totalAmount;
}

document.getElementById('transactionTable').addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'TD') {
        const tr = target.closest('tr');
        const description = tr.querySelector('td:nth-child(4)').textContent;
        document.getElementById('transactionDescription').textContent = description;
    }
});

addTransactions(); // Вызываем функцию для инициализации таблицы при загрузке страницы
