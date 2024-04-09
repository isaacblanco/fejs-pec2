/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class ExpenseController {
  constructor(service, view) {
    this.service = service;
    this.view = view;

    // Explicit binding
    this.service.bindExpenseListChanged(this.onExpenseListChanged);
    this.view.bindAddExpense(this.handleAddExpense);
    this.view.bindEditExpense(this.handleEditExpense);
    this.view.bindDeleteExpense(this.handleDeleteExpense);

    // Display initial expenses
    this.onExpenseListChanged(this.service.expenses);
  }

  onExpenseListChanged = (expenses) => {
    this.view.displayExpenses(expenses);
  };

  handleAddExpense = (text, amount) => {
    console.log("Expense to add in controller: ", text, amount);
    this.service.addExpense(text, amount);
  };

  handleEditExpense = (id, text, amount) => {
    this.service.editExpense(id, text, amount);
  };

  handleDeleteExpense = (id) => {
    this.service.deleteExpense(id);
  };
}
