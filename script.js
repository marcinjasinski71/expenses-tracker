// glowne
const incomeSection = document.querySelector(`.income-area`);
const expensesSection = document.querySelector(`.expenses-area`);
const availableMoney = document.querySelector(`.available-money`);
const addTransactionPanel = document.querySelector(`.add-transaction-panel`);

// inputy
const nameInput = document.querySelector(`#name`);
const amountInput = document.querySelector(`#amount`);
const categorySelect = document.querySelector(`#category`);

// przyciski
const addTransactionBtn = document.querySelector(`.add-transaction`);
const saveBtn = document.querySelector(`.save`);
const cancelBtn = document.querySelector(`.cancel`);
const deleteBtn = document.querySelector(`.delete`);
const deleteAllBtn = document.querySelector(`.delete-all`);
const lightStyleBtn = document.querySelector(`.light`);
const darkStyleBtn = document.querySelector(`.dark`);

// rest
let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

// otwieranie panelu -> display flex na niego
const showPanel = () => {
	addTransactionPanel.style.display = `flex`;
};
// zamykanie -> jw display none + clear inputów
const closePanel = () => {
	addTransactionPanel.style.display = `none`;
	clearInputs();
};
// sprawdzamy formularz dodawania nowej transakcji - czy nie jest pusty input + kategoria
const checkForm = () => {
	if (
		nameInput.value !== '' &&
		amountInput.value !== '' &&
		categorySelect.value !== 'none'
	)
		createNewTransaction();
	else {
		alert(`Wypełnij wszystkie pola !`);
	}
};
// czysciciel inputów, wszelkie zło tego swiata
const clearInputs = () => {
	nameInput.value = ``;
	amountInput.value = ``;
	categorySelect.selectedIndex = 0;
};
// nowa transakcja
const createNewTransaction = () => {
	const newTransaction = document.createElement(`div`);
	newTransaction.classList.add(`transaction`);
	// przypisujemy ID, domyślnie ID = 0
	newTransaction.setAttribute(`id`, ID);

	checkCategory(selectedCategory);

	newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value}zł
    <button class="delete" onclick="deleteTransaction(${ID})">
    <i class="fas fa-times"></i></button></p>
    `;
	//  sprawdzamy kwote inputa - jezeli jest wieksza niz zero to dodajemy jako dziecko funkcje newTransaction z klasą income, jezeli jest ponizej zera czyli wydatek to dodajemy newTransaction z klasa expense
	amountInput.value > 0
		? incomeSection.appendChild(newTransaction) &&
		  newTransaction.classList.add(`income`)
		: expensesSection.appendChild(newTransaction) &&
		  newTransaction.classList.add(`expense`);
	// dodajemy pieniadze do tablicy
	moneyArr.push(parseFloat(amountInput.value));
	countMoney(moneyArr);
	closePanel();
	ID++;
	clearInputs();
};

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

// sprawdzanie kategorii transakcji
const checkCategory = transaction => {
	switch (transaction) {
		case `[ + ] Przychód`:
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
			break;
		case `[ - ] Zakupy`:
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
			break;
		case `[ - ] Jedzenie`:
			categoryIcon = '<i class="fas fa-hamburger"></i>';
			break;
		case `[ - ] Rozrywka`:
			categoryIcon = '<i class="fas fa-film"></i>';
			break;
	}
};
// funckcja pokazująca ile mamy dostępnych środków
const countMoney = money => {
	const newMoney = money.reduce((a, b) => a + b);
	availableMoney.textContent = `${newMoney}zł`;
};

// usuwanie transakcji
const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id);
	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[3].innerText
	);
	const indexOfTransaction = moneyArr.indexOf(transactionAmount);

	moneyArr.splice(indexOfTransaction, 1);

	// operator warunkowy
	transactionToDelete.classList.contains(`income`)
		? incomeSection.removeChild(transactionToDelete)
		: expensesSection.removeChild(transactionToDelete);

	countMoney(moneyArr);
};

const deleteAllTransactions = () => {
	incomeSection.innerHTML = '<h3>Przychód:</h3>';
	expensesSection.innerHTML = '<h3>Wydatki:</h3>';
	availableMoney.textContent = `0zł`;
	moneyArr = [0];
};

const changeStyleToLight = () => {
	root.style.setProperty(`--first-color`, `#f9f9f9`);
	root.style.setProperty(`--second-color`, `#14161f`);
	root.style.setProperty(`--border-color`, `rgba(0, 0, 0, 0.2)`);
};

const changeStyleToDark = () => {
	root.style.setProperty(`--first-color`, `#14161f`);
	root.style.setProperty(`--second-color`, `#f9f9f9`);
	root.style.setProperty(`--border-color`, `rgba(255,255,255, 0.4)`);
};

// ======================================================
// listenery
addTransactionBtn.addEventListener(`click`, showPanel);
cancelBtn.addEventListener(`click`, closePanel);
saveBtn.addEventListener(`click`, checkForm);
deleteAllBtn.addEventListener(`click`, deleteAllTransactions);

lightStyleBtn.addEventListener(`click`, changeStyleToLight);
darkStyleBtn.addEventListener(`click`, changeStyleToDark);
