import React, { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Groceries", description: "Weekly shopping", category: "Food" },
    { id: 2, name: "Electricity Bill", description: "Monthly bill", category: "Utilities" },
    { id: 3, name: "Netflix", description: "Subscription", category: "Entertainment" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.category) return;

    const newExpense = {
      id: Date.now(),
      ...form
    };

    setExpenses([...expenses, newExpense]);
    setForm({ name: "", description: "", category: "" });
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSort = (field) => {
    setSortField(field);
    setExpenses([
      ...[...expenses].sort((a, b) =>
        a[field].toLowerCase().localeCompare(b[field].toLowerCase())
      )
    ]);
  };

  const filteredExpenses = expenses.filter((exp) =>
    exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h1>Expense Tracker</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by name or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "300px" }}
      />

      {/* ➕ Add Expense Form */}
      <form onSubmit={handleAddExpense} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      {/* 📋 Expenses Table */}
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Description
              <button onClick={() => handleSort("description")}>↕</button>
            </th>
            <th>
              Category
              <button onClick={() => handleSort("category")}>↕</button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.name}</td>
                <td>{exp.description}</td>
                <td>{exp.category}</td>
                <td>
                  <button onClick={() => handleDelete(exp.id)}>❌ Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No expenses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
