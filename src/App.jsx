import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function addCommas(num) {
  // Convert the number to a string
  const numStr = num.toString();

  // Split the number into integer and decimal parts
  const parts = numStr.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1] ? "." + parts[1] : "";

  // Add commas every four digits in the integer part
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(integerPart)) {
    integerPart = integerPart.replace(pattern, "$1,$2");
  }

  // Return the formatted number
  return integerPart + decimalPart;
}

function App() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expense, setExpense] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage]);

  const addExpense = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z\s]+$/.test(description)) {
      alert("Please enter a valid description (text only).");
      return;
    }
  
    // Validate amount (number only)
    if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
      alert("Please enter a valid amount (number only).");
      return;
    }

    setExpense([...expense, { id: Date.now(), description, amount }]);
    setDescription("");
    setAmount("");
    setSuccessMessage("Expense successfully added!");
  };

  const totalExpense = useMemo(
    () =>
  expense.reduce(
    (total, currentExpense) => total + parseFloat(currentExpense.amount),
    0
  ),
  [expense] );

  const handleDelete = (id) => {
    setExpense(expense.filter(t => t.id !== id))
  }

  const expenseList = useMemo(() => {
    if (expense.length === 0) {
      return <div className="no-expense">No Expense Written.</div>;
    }

    return (
      <table className="expense-table">
        <tbody>
          {expense.map((t) => (
            <tr key={t.id}>
              <td>
                <b>{t.description}</b>
              </td>
              <td
                className={`amount ${
                  parseFloat(t.amount) > 100 ? "highlighted" : ""
                }`}
              >
                <b>₱ </b>
                {addCommas(t.amount)}
              </td>
              <td className="functions-btn">
                <button
                  className="delete-btn"
                  onClick={(e) => handleDelete(t.id)}
                >
                  {" "}
                  <FontAwesomeIcon icon={faTrash} />{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }, [expense]);

  return (
    <>
      <div className="main">
        <header>
          <div className="title">Expense Tracker</div>
          <div className="author">by Karl Andoque</div>
        </header>

        <form onSubmit={addExpense}>
          <div className="form-container">
            <div className="form-group">
              <label>Description</label>
              <input
                name="description"
                type="text"
                placeholder="Enter Description"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                name="amount"
                type="text"
                placeholder="Enter Amount"
                required
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>

            <button className="submit-btn" type="submit">
              Add Expense
            </button>
          </div>
          {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        </form>

        <div className="content">
          <div className="total-expense">
            <span>
              Total Expense <b>₱ {addCommas(totalExpense.toFixed(2))}</b>
            </span>
          </div>

          <div className="title-label">
            <span>Expenses</span>
          </div>
          <div className="expense-table-container"> {expenseList}</div>
        </div>

        <footer>
          <span>© 2023 Hackademy</span>
        </footer>

      </div>
    </>
  );
}

export default App;
