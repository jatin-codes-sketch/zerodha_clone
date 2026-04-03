import { useState, useEffect, useContext } from "react";
import api from "../api/axios"
import GeneralContext from "./GeneralContext";
import "./style/holding.css";

const Holding = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    api
      .get("/AllHoldings")
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch holdings", err);
      });
  }, [refreshKey]);

  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0
  );

  const currentValue = allHoldings.reduce(
    (acc, stock) => acc + stock.price * stock.qty,
    0
  );

  const pnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment ? (pnl / totalInvestment) * 100 : 0;
  const pnlClass = pnl >= 0 ? "profit" : "loss";

  return (
    <div className="holding-container">
      <h3 className="holding-title">
        Holdings ({allHoldings.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const rowPnl = curValue - stock.avg * stock.qty;
              const profClass = rowPnl >= 0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{rowPnl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="holding-summary">
        <div className="summary-card">
          <h5>
            ₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </h5>
          <p>Total investment</p>
        </div>

        <div className="summary-card">
          <h5>
            ₹{currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </h5>
          <p>Current value</p>
        </div>

        <div className="summary-card">
          <h5 className={pnlClass}>
            ₹{pnl.toLocaleString("en-IN", { minimumFractionDigits: 2 })}{" "}
            <span>({pnlPercent.toFixed(2)}%)</span>
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>
    </div>
  );
};

export default Holding;
