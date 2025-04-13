// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SearchBar from "./components/SearchBar";
import "./App.css"; // keep your styles here

function App() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Ugali Matumbo",
      description: "Wednesday's Lunch",
      category: "food",
      amount: 150,
      date: "2025-04-10"
    },
    {
      id: 2,
      name: "KPLC tokens",
      description: "power tokens",
      category: "utilities",
      amount: 500,
      date: "2025-04-09"
    },
    {
      id: 3,
      name: "Buy shoes",
      description: "Add to my shoe collection",
      category: "shopping",
      amount: 3000,
      date: "2025-04-08"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [sortBy, setSortBy] = useState(""); // for sorting

  const addExpense = (expense) => {
    if (editingExpense) {
      setExpenses(
        expenses.map((exp) =>
          exp.id === editingExpense.id ? { ...expense, id: exp.id } : exp
        )
      );
      setEditingExpense(null);
    } else {
      setExpenses([{ ...expense, id: Date.now() }, ...expenses]);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);
  };

  let filteredExpenses = expenses.filter(
    (exp) =>
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === "category") {
    filteredExpenses.sort((a, b) => a.category.localeCompare(b.category));
  } else if (sortBy === "amount") {
    filteredExpenses.sort((a, b) => a.amount - b.amount);
  } else if (sortBy === "date") {
    filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} editingExpense={editingExpense} />
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      >
        <option value="">-- Sort by --</option>
        <option value="category">Category (A-Z)</option>
        <option value="amount">Amount (Low to High)</option>
        <option value="date">Date (Newest First)</option>
      </select>
      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={editExpense}
        onDelete={deleteExpense}
      />
    </div>
  );
}

export default App;
