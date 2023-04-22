import { useState } from "react";

import { ExpenseList, Expense } from "./expense-tracker/components/ExpenseList";
import { ExpenseFilter } from "./expense-tracker/components/ExpenseFilter";
import {
  ExpenseForm,
  ExpenseFormData,
} from "./expense-tracker/components/ExpenseForm";

function App() {
  const [category, setCategory] = useState("");

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: "desc 1", amount: 1, category: "sport" },
    { id: 2, description: "desc 2", amount: 2, category: "food" },
    { id: 3, description: "desc 3", amount: 3, category: "books" },
    { id: 4, description: "desc 4", amount: 4, category: "food" },
  ]);

  const handleSelectCategory = (category: string) => setCategory(category);

  const handleAdd = (data: ExpenseFormData) => {
    setExpenses((expenses) => [
      ...expenses,
      { ...data, id: expenses.length + 1 },
    ]);
  };

  const handleDelete = (id: number) =>
    setExpenses((expenses) => expenses.filter((expense) => expense.id !== id));

  const visibleExpenses = category
    ? expenses.filter((expense) => expense.category === category)
    : expenses;

  return (
    <div>
      <h3>Add product</h3>
      <div className="mb-4">
        <ExpenseForm onAdd={handleAdd} />
      </div>
      <div className="mb-4">
        <h3>Filter</h3>
        <ExpenseFilter onSelect={handleSelectCategory} />
      </div>
      <div>
        <h3>Products</h3>
        <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
