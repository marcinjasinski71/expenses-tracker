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
		console.log(`ok`);
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

// ======================================================
// listenery
addTransactionBtn.addEventListener(`click`, showPanel);
cancelBtn.addEventListener(`click`, closePanel);
saveBtn.addEventListener(`click`, checkForm);
