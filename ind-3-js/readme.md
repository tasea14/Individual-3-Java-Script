# Отчет по индивидуальной работе номер 3
#### Выполнила : Дяконица Наталья I2302
#### Проверил : Нартя Никита

## Цель

 Понимание работы основ взаимодействия JS с DOM-деревом на основе веб-приложения для **учета личных финансов**.

## Ход работы 

### Создание script.js
```js
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

```
Этот фрагмент кода определяет массив `transactions`, содержащий несколько объектов транзакций. Каждый объект представляет собой транзакцию с уникальным идентификатором, датой, суммой, категорией и описанием. Однако функция `generateUniqueId()`, которая используется для генерации уникальных идентификаторов транзакций, не определена. Также не хватает кода для отображения этих транзакций на веб-странице и взаимодействия с пользователем.

### Создание index.html

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Транзакции</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Список Транзакций</h1>
    <table id="transactionTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Дата и время</th>
                <th>Категория транзакции</th>
                <th>Краткое описание транзакции</th>
                <th>Действие</th>
            </tr>
        </thead>
        <tbody id="transactionBody">
        </tbody>
    </table>
    <center><h2>Общая сумма:</h2></center>
    <center><h2 id="totalAmount">0</h2></center>
    <center>
        <div id="transactionDetails">
            <h2>Подробное описание транзакции</h2>
            <p id="transactionDescription"></p>
        </div>
    </center>
    <input type="text" id="amount" placeholder="Сумма">
    <input type="text" id="category" placeholder="Категория">
    <input type="text" id="description" placeholder="Описание">
    <button onclick="addTransaction()">Добавить транзакцию</button>
    <script src="script.js"></script>
</body>
</html>
```
Этот фрагмент кода создает таблицу в которую мы добавляем транзакции. У каждой транзакции есть данные которые записываются в отдельные столбцы :  
1. ID. 
2. Дата и Время
3. Категория транзакции
4. Краткое описание транзакции
5. Действие (кнопка удаления транзакции)

### Добавление транзакций и управление
```js
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

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    const tableRow = document.querySelector(`tr[data-id="${id}"]`);
    tableRow.remove();

    updateTotalAmount();
}

```

Этот JavaScript-код добавляет функционал для добавления и удаления транзакций на веб-странице.

### Подсчет суммы транзакции
```js
function calculateTotal() {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

function updateTotalAmount() {
    const totalAmount = calculateTotal().toFixed(2);
    document.getElementById('totalAmount').textContent = totalAmount;
}
```
Эти функции рассчитывают и обновляют общую сумму всех транзакций, хранящихся в массиве transactions.

## Контрольные вопросы

1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript? С помощью функций `getElementById()`, `querySelector()`, `querySelectorAll()`.

2. Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM? Это техника, при которой события обрабатываются на родительском элементе, но с использованием информации о том, на каком именно элементе произошло событие. При клике на один из дочерних элементов списка, событие обрабатывается на родительском элементе списка, и в коде можно определить, какой именно дочерний элемент был кликнут.

3. Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки? Изменение содержимого элемента DOM:
Используя свойство textContent для изменения текстового содержимого элемента.
С помощью свойства innerHTML, которое позволяет изменять HTML содержимое элемента (осторожно с безопасностью, так как это открывает двери к потенциальным XSS атакам).
Через свойства innerText и outerText для изменения текста с учетом форматирования и соседних элементов.

4. Как можно добавить новый элемент в DOM дерево с помощью JavaScript? Добавление нового элемента в DOM:

Используя метод createElement() для создания нового элемента.
Используя метод appendChild() или insertBefore() для добавления нового элемента в DOM дерево.






