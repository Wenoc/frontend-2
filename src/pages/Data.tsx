import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import savedData from "../assets/kuldesek.json";

function Data() {
  const [data, setData] = useState(savedData);
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const startRow = currentPage * rowsPerPage;
  const endRow = startRow + rowsPerPage;

  const sum = {};
  data.forEach((item) => {
    item.foundationData.forEach((foundation) => {
      const name = foundation.name;
      const value = foundation.value;
      if (sum[name]) {
        sum[name] += value;
      } else {
        sum[name] = value;
      }
    });
  });

  const handleSort = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
      data.sort((a, b) => new Date(b.time) - new Date(a.time));
    } else {
      setSortOrder("asc");
      data.sort((a, b) => new Date(a.time) - new Date(b.time));
    }
  };

  const serbiaTimeString = new Date(data[data.length - 1].time).toLocaleString(
    "en-US",
    {
      timeZone: "Europe/Belgrade",
    }
  );

  return (
    <div className="dataPage">
      <p>
        Kuldesek szama: <span>{data.length}</span>
      </p>
      <p>Osszes Adat:</p>
      <span>
        Szent Istvan Kiraly Alapitvany: {sum["Szent Istvan Kiraly Alapitvany"]}
      </span>
      <br />
      <span>Autizmus Alapitvany: {sum["Autizmus Alapitvany"]}</span>
      <span>
        <br />
        lelmiszer Bank Egyesulet: {sum["Elelmiszer Bank Egyesulet"]}
      </span>
      <br />
      <span>Lampas '97 Alapitvany: {sum["Lampas '97 Alapitvany"]}</span>
      <br />
      <p>
        Utolso kuldes: <span>{serbiaTimeString}</span>
      </p>
      <div>
        <table>
          <thead>
            <tr>
              <th onClick={handleSort}>Date</th>
              <th>IP</th>
              <th>Szent Istvan Kiraly Alapitvany</th>
              <th>Autizmus Alapitvany</th>
              <th>Elelmiszer Bank Egyesulet</th>
              <th>Lampas '97 Alapitvany</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(startRow, endRow).map((entry) => (
              <tr key={entry.time}>
                <td>
                  {new Date(entry.time).toLocaleString("en-US", {
                    timeZone: "Europe/Belgrade",
                  })}
                </td>
                <td>{entry.ip}</td>
                <td>
                  {
                    entry.foundationData.find(
                      (d) => d.name === "Szent Istvan Kiraly Alapitvany"
                    ).value
                  }
                </td>
                <td>
                  {
                    entry.foundationData.find(
                      (d) => d.name === "Autizmus Alapitvany"
                    ).value
                  }
                </td>
                <td>
                  {
                    entry.foundationData.find(
                      (d) => d.name === "Elelmiszer Bank Egyesulet"
                    ).value
                  }
                </td>
                <td>
                  {
                    entry.foundationData.find(
                      (d) => d.name === "Lampas '97 Alapitvany"
                    ).value
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endRow >= data.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Data;
