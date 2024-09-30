let expenses = [];

const addOrUpdateExpense = () => {
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const editIndex = document.getElementById("editIndex").value;

  if (!description || !amount || !date) {
    alert("Please fill in all fields.");
    return;
  }

  if (editIndex === "") {
    const expense = {
      description,
      amount: parseFloat(amount),
      date,
      category,
    };
    expenses.push(expense);
  } else {
    expenses[editIndex] = { description, amount: parseFloat(amount), date, category };
    document.getElementById("editIndex").value = "";
  }

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
  document.getElementById("category").value = "Food";

  saveToLocalStorage();
  displayExpenses();
};

const displayExpenses = () => {
  const expensesList = document.getElementById("expensesList");
  expensesList.innerHTML = "";

  expenses.forEach((expense, index) => {
    expensesList.innerHTML += `
      <tr>
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
        <td>${expense.date}</td>
        <td>${expense.category}</td>
        <td>
          <button onclick="editExpense(${index})" class="btn btn-info btn-sm">Edit</button>
          <button onclick="deleteExpense(${index})" class="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    `;
  });
};

const editExpense = (index) => {
  const expense = expenses[index];
  document.getElementById("description").value = expense.description;
  document.getElementById("amount").value = expense.amount;
  document.getElementById("date").value = expense.date;
  document.getElementById("category").value = expense.category;
  document.getElementById("editIndex").value = index;
};

const deleteExpense = (index) => {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenses.splice(index, 1);
    saveToLocalStorage();
    displayExpenses();
  }
};

const sortExpenses = (field, order) => {
  expenses.sort((a, b) => (order === "asc" ? a[field] - b[field] : b[field] - a[field]));
  displayExpenses();
};

const saveToLocalStorage = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

const loadFromLocalStorage = () => {
  const storedExpenses = localStorage.getItem("expenses");
  if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);
    displayExpenses();
  }
};

loadFromLocalStorage();
