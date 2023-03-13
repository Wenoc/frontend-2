import { useState } from "react";
import savedData from "../assets/kuldesek.json";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import e from "express";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FoundationData {
  name: string;
  value: number;
}

interface Entry {
  time: string;
  ip: string;
  foundationData: FoundationData[];
}

function Data() {
  const [data, setData] = useState<Entry[]>(savedData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const startRow = currentPage * rowsPerPage;
  const endRow = startRow + rowsPerPage;

  const sum: { [key: string]: number } = {};
  data.forEach((item, index) => {
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
      data.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );
    } else {
      setSortOrder("asc");
      data.sort(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
      );
    }
  };

  const handleDelete = async (event) => {
    const id = event.target.id;
    try {
      await axios.post("http://localhost:5000/delete", {
        id,
      });
      console.log("Deleted")
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  }


  const labels = ['Szent Istvan Kiraly Alapitvany', 'Autizmus Alapitvany', 'Elelmiszer Bank Egyesulet', "Lampas '97 Alapitvany"];
  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [{
      label: 'Polok szama az alapitvanyoknak',
      data: [sum["Szent Istvan Kiraly Alapitvany"], sum["Autizmus Alapitvany"], sum["Elelmiszer Bank Egyesulet"], sum["Lampas '97 Alapitvany"]],
      backgroundColor: [
        'rgb(153, 102, 255)'
      ],
      borderColor: [
        'rgb(153, 102, 255)'
      ],
      borderWidth: 1
    }]
  });

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
        Utolso kuldes:
        <span>
          {new Date(data[data.length - 1].time).toLocaleString("en-US", {
            timeZone: "Europe/Belgrade",
          })}
        </span>
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
              <th>Delete</th>
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
                {entry.foundationData.map((foundation) => (
                  <td key={foundation.name}>
                    {foundation.name === "Szent Istvan Kiraly Alapitvany" &&
                      foundation.value}
                    {foundation.name === "Autizmus Alapitvany" &&
                      foundation.value}
                    {foundation.name === "Elelmiszer Bank Egyesulet" &&
                      foundation.value}
                    {foundation.name === "Lampas '97 Alapitvany" &&
                      foundation.value}
                  </td>
                ))}
                <td className="deleteRow"><span id={entry.time} onClick={handleDelete}>Del</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            disabled={endRow >= data.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

        <Bar className="chart" data={chartData} />;
      </div>
    </div>
  );
}
export default Data;
