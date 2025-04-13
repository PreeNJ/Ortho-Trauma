import React, { useState, useEffect } from "react";

export default function ExpenseForm({ onAddExpense, editingExpense }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    amount: "",
    date: ""
  });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        name: editingExpense.name,
        description: editingExpense.description,
        category: editingExpense.category,
        amount: editingExpense.amount,
        date: editingExpense.date
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.description ||
      !form.category ||
      !form.amount ||
      !form.date
    )
      return;
    onAddExpense({ ...form, amount: parseFloat(form.amount) });
    setForm({ name: "", description: "", category: "", amount: "", date: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
      <input
        name="name"
        placeholder="Expense Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />
      <button type="submit">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}
