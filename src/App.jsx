import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [c1, setC1] = useState("USD");
  const [c2, setC2] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [output, setOutput] = useState({});
  const [loading, setLoading] = useState(false);

  const handleC1 = (e) => {
    setC1(e.target.value);
  };

  const handleC2 = (e) => {
    setC2(e.target.value);
  };

  const { rates } = output;

  useEffect(() => {
    const fetching = async () => {
      if (amount) {
        setLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${c1}&to=${c2}`
        );

        const data = await res.json();
        console.log(data);
        setOutput(data);
        setLoading(false);
      }
    };
    fetching();
  }, [amount, c1, c2]);

  return (
    <div className="container">
      <input
        type="text"
        onChange={(e) => setAmount(Number(e.target.value))}
        value={amount}
        placeholder="Enter amount"
      />
      <select onChange={handleC1} value={c1}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={handleC2} value={c2}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {loading && amount && <p className="loading">Loading...</p>}
      {!amount && <p>Please Enter a Number</p>}
      {!loading && amount && (
        <p>
          {rates && rates[c2] !== undefined
            ? `${rates[c2]} ${c2}`
            : "Same Currency!!😅"}
        </p>
      )}
    </div>
  );
};

export default App;
