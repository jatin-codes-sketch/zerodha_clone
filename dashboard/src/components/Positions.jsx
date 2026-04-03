import { useState, useEffect, useContext } from "react";
import api from "../api/axios"
import GeneralContext from "./GeneralContext";
import "./style/positions.css";

const Positions = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    api
      .get("/AllPositions")
      .then((res) => {
        setPositions(res.data);
      })
      .catch((err) => console.error("Failed to fetch positions", err));
  }, [refreshKey]);

  return (
    <div className="positions-container">
      <h3 className="positions-title">
        Positions ({positions.length})
      </h3>

      <div className="positions-table-wrapper">
        <table className="positions-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const rowPnl = curValue - stock.avg * stock.qty;
              const profClass = rowPnl >= 0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>{rowPnl.toFixed(2)}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;
