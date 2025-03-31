import { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaPlus,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  // Load initial state
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    setExpenses(savedExpenses);
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Save expenses
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: +amount,
      category,
      date: new Date(date).toLocaleDateString(),
    };

    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
    setDate("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    const icons = {
      Food: "🍔",
      Travel: "✈️",
      Entertainment: "🎬",
      Shopping: "🛍️",
      Bills: "🧾",
      Other: "💼",
    };
    return icons[category] || "💼";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark:bg-gray-900 bg-gray-900"
          : "bg-gradient-to-r from-blue-50 to-purple-50"
      } p-4 md:p-8`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`${
            darkMode
              ? "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          } p-6 rounded-lg mb-6 shadow-lg transition-colors duration-300`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FaMoneyBillWave className="text-3xl" /> Expense Tracker
              </h1>
            </div>
            <div className="text-right ">
            <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-opacity-20 bg-slate-700 hover:bg-gray-100 transition-colors 
                relative left-5 bottom-5"
              >
                {darkMode ? (
                  <FaSun className="text-xl" />
                ) : (
                  <FaMoon className="text-xl" />
                )}
              </button>
              <p className="text-sm opacity-90 ml-5">Total Spent</p>
              <p className="text-3xl font-bold">
                ${totalExpenses.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Add Expense Form */}
        <form
          onSubmit={addExpense}
          className={`${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
          } p-6 rounded-lg shadow-md mb-6 transition-colors duration-300`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Expense Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-purple-400"
                  : "border focus:ring-purple-500"
              }`}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-purple-400"
                  : "border focus:ring-purple-500"
              }`}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-purple-400"
                  : "border focus:ring-purple-500"
              }`}
            >
              {[
                "Food",
                "Travel",
                "Entertainment",
                "Shopping",
                "Bills",
                "Other",
              ].map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className={darkMode ? "bg-gray-800" : ""}
                >
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-purple-400"
                  : "border focus:ring-purple-500"
              }`}
            />
          </div>
          <button
            type="submit"
            className={`mt-4 px-6 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto ${
              darkMode
                ? "bg-purple-400 hover:bg-purple-300 text-gray-900"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            <FaPlus /> Add Expense
          </button>
        </form>

        {/* Filters */}
        <div
          className={`${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
          } p-4 rounded-lg shadow-md mb-6 transition-colors duration-300`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch
                className={`absolute top-3 left-3 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 p-2 w-full rounded-lg focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-purple-400"
                    : "border focus:ring-purple-500"
                }`}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-purple-400"
                  : "border focus:ring-purple-500"
              }`}
            >
              {[
                "All",
                "Food",
                "Travel",
                "Entertainment",
                "Shopping",
                "Bills",
                "Other",
              ].map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className={darkMode ? "bg-gray-800" : ""}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Expenses List */}
        <div className="space-y-4">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className={`${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                  : "bg-white hover:bg-gray-50"
              } p-4 rounded-lg shadow-md flex items-center justify-between transition-colors duration-300`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">
                  {getCategoryIcon(expense.category)}
                </span>
                <div>
                  <h3 className="font-semibold">{expense.title}</h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {expense.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-lg font-bold ${
                    expense.amount > 100
                      ? darkMode
                        ? "text-red-400"
                        : "text-red-600"
                      : darkMode
                      ? "text-green-400"
                      : "text-green-600"
                  }`}
                >
                  ${expense.amount}
                </span>
                <button>
                  <MdEdit/>
                </button>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className={`${
                    darkMode
                      ? "text-red-400 hover:text-red-300"
                      : "text-red-500 hover:text-red-700"
                  } transition-colors`}
                >
                  <MdDelete className="text-xl" />
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
