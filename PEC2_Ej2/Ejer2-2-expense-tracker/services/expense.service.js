/**
 * @class Service
 *
 * Manages the data of the application.
 */
class ExpenseService {
  constructor() {
    this.expenses = (
      JSON.parse(localStorage.getItem("transactions")) || []
    ).map((expense) => new Expense(expense));
  }
  bindExpenseListChanged(callback) {
    this.onExpenseListChanged = callback;
  }

  _commit(expenses) {
    this.onExpenseListChanged(expenses);
    localStorage.setItem("transactions", JSON.stringify(expenses));
  }

  addExpense(text, amount) {
    const expense3 = new Expense({
      text: text,
      amount: amount,
    });
    this.expenses.push(expense3);
    this._commit(this.expenses);
  }

  editExpense(id, updatedText, updatedAmount) {
    this.expenses = this.expenses.map((expense) =>
      expense.id === id
        ? new Expense({
            ...expense,
            text: updatedText,
            amount: updatedAmount,
          })
        : expense
    );

    this._commit(this.expenses);
  }

  deleteExpense(_id) {
    this.expenses = this.expenses.filter(({ id }) => id !== _id);
    this._commit(this.expenses);
  }
}
