// views/expense.views.js

class ExpenseView {
  constructor() {
    this.app = this.getElement("#root");

    // Título principal
    this.title = this.createElement("h2");
    this.title.textContent = "Expense Tracker";

    // Contenedor principal
    this.container = this.createElement("div", "container");

    // Balance actual
    this.balanceTitle = this.createElement("h4");
    this.balanceTitle.textContent = "Your Balance";
    this.balance = this.createElement("h1", "balance");
    this.balance.textContent = "$0.00";

    // Contenedores de ingresos y gastos
    this.incExpContainer = this.createElement("div", "inc-exp-container");

    // Ingresos
    this.incomeContainer = this.createElement("div");
    this.incomeTitle = this.createElement("h4");
    this.incomeTitle.textContent = "Income";
    this.incomeAmount = this.createElement("p", "money", "plus");
    this.incomeAmount.id = "money-plus";
    this.incomeAmount.textContent = "+$0.00";

    // Gastos
    this.expenseContainer = this.createElement("div");
    this.expenseTitle = this.createElement("h4");
    this.expenseTitle.textContent = "Expense";
    this.expenseAmount = this.createElement("p", "money", "minus");
    this.expenseAmount.id = "money-minus";
    this.expenseAmount.textContent = "-$0.00";

    // Lista de transacciones
    this.historyTitle = this.createElement("h3");
    this.historyTitle.textContent = "History";
    this.expensesList = this.createElement("ul", "expenses-list");

    // Formulario para añadir nuevas transacciones
    this.form = this.createElement("form");
    this.form.id = "form";

    // Campo de texto
    this.textField = this.createElement("div", "form-control");
    this.textLabel = this.createElement("label");
    this.textLabel.setAttribute("for", "concept");
    this.textLabel.textContent = "Concept";
    this.textInput = this.createElement("input");
    this.textInput.type = "text";
    this.textInput.id = "concept";
    this.textInput.placeholder = "Enter concept...";

    // Campo de cantidad
    this.amountField = this.createElement("div", "form-control");
    this.amountLabel = this.createElement("label");
    this.amountLabel.setAttribute("for", "amount");
    this.amountLabel.innerHTML =
      "Amount <br /> (negative - expense, positive - income)";
    this.amountInput = this.createElement("input");
    this.amountInput.type = "number";
    this.amountInput.id = "amount";
    this.amountInput.placeholder = "Enter amount...";

    // Botón de submit
    this.submitButton = this.createElement("button", "btn");
    this.submitButton.textContent = "Add transaction";

    // Poniendo los componentes del formulario
    this.textField.append(this.textLabel, this.textInput);
    this.amountField.append(this.amountLabel, this.amountInput);
    this.form.append(this.textField, this.amountField, this.submitButton);

    // Lo metemos en el contenedor
    this.incomeContainer.append(this.incomeTitle, this.incomeAmount);
    this.expenseContainer.append(this.expenseTitle, this.expenseAmount);
    this.incExpContainer.append(this.incomeContainer, this.expenseContainer);
    this.container.append(
      this.balanceTitle,
      this.balance,
      this.incExpContainer,
      this.historyTitle,
      this.expensesList,
      this.form
    );

    // Añadiendo al elemento raíz
    this.app.append(this.title, this.container); //

    // Continue with other elements
    this._temporaryExpenseConceptText = "";
    this._temporaryExpenseAmountText = "";
    this._initLocalListeners();
  }

  get _ExpensiveText() {
    return this.textField.value;
  }

  get _AmountText() {
    return this.amountField.value;
  }

  _resetInput() {
    console.log("entra _resetInput");
    this.textField.value = "";
    this.amountField.value = "";
  }

  createElement(tag, ...classNames) {
    const element = document.createElement(tag);
    if (classNames) element.classList.add(...classNames); // Spread operator para manejar múltiples clases
    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }
  x;

  displayExpenses(expenses) {
    // Logic to display the expenses in the list
    while (this.expensesList.firstChild) {
      this.expensesList.removeChild(this.expensesList.firstChild);
    }

    // Show default message
    if (expenses.length === 0) {
      const p = this.createElement("p");
      p.textContent = "No expenses yet";
      this.expensesList.append(p);
    } else {
      expenses.forEach((expense) => {
        const li = this.createElement("li");
        // Usando data-id para evitar posibles conflictos con otros elementos del DOM
        li.id = expense.id;

        const span = this.createElement("span");
        span.contentEditable = true;
        span.classList.add("editable");
        // legibilidad
        span.textContent = `${expense.text} $${Math.abs(expense.amount)} `;

        const deleteButton = this.createElement("button", "delete");
        deleteButton.textContent = "Delete";
        li.append(span, deleteButton);

        this.expensesList.append(li);
      });

      this.calculateBalance(expenses);
    }
  }

  calculateBalance(expenses) {
    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;

    expenses.forEach((expense) => {
      // Actualizar totales de ingresos y gastos
      if (expense.amount > 0) {
        totalIncome += Math.abs(expense.amount); // Si no, da guerra
      } else {
        totalExpenses += Math.abs(expense.amount); // si no, da guerra
      }
    });

    // Calcula el balance general
    totalBalance = totalIncome - totalExpenses;
    // Actualiza los elementos del DOM con los totales calculados
    this.balance.textContent = `$${totalBalance.toFixed(2)}`;
    this.incomeAmount.textContent = `+$${totalIncome.toFixed(2)}`;
    this.expenseAmount.textContent = `-$${totalExpenses.toFixed(2)}`;
  }

  _initLocalListeners() {
    this.expensesList.addEventListener("input", (event) => {
      if (event.target.className === "editable") {
        this._temporaryExpenseConceptText = event.target.innerText;
      }
    });
  }

  bindAddExpense(handler) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      const text = this.textInput.value.trim();
      const amount = this.amountInput.value.trim();
      if (text && amount) {
        handler(text, amount);
        this._resetInput();
      }
    });
  }

  bindDeleteExpense(handler) {
    // Logic to bind remove button click event
    this.expensesList.addEventListener("click", (event) => {
      if (event.target.className === "delete") {
        const id = event.target.parentElement.id;
        handler(id);
      }
    });
  }

  bindEditExpense(handler) {
    this.expensesList.addEventListener("focusout", (event) => {
      if (this._temporaryExpenseConceptText) {
        const id = event.target.parentElement.id;

        handler(id, this._temporaryExpenseConceptText);
        this._temporaryExpenseConceptText = "";
      }
    });
  }
}
