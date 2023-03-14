import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
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
  //@ts-ignore
  const [data, setData] = useState<Entry[]>(null);
  const sum: { [key: string]: number } = {};
  const [foundationData, setFoundationData] = useState([0, 0, 0, 0]);
  const [mostRecent, setMostRecent] = useState(new Date());

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://165.22.23.123/data");
        const d = res.data;
        setData(d);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const startRow = currentPage * rowsPerPage;
  const endRow = startRow + rowsPerPage;

  const labels = [
    "Szent Istvan Kiraly Alapitvany",
    "Autizmus Alapitvany",
    "Elelmiszer Bank Egyesulet",
    "Lampas '97 Alapitvany",
  ];

  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Pulcsik száma az alapítványoknak",
        data: [
          sum["Szent Istvan Kiraly Alapitvany"],
          sum["Autizmus Alapitvany"],
          sum["Elelmiszer Bank Egyesulet"],
          sum["Lampas '97 Alapitvany"],
        ],
        backgroundColor: ["rgb(153, 102, 255)"],
        borderColor: ["rgb(153, 102, 255)"],
        borderWidth: 1,
      },
    ],
  });

  const sumData = () => {
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
  };

  const handleRecentlySent = () => {
    setMostRecent(new Date(data[0].time));
    data.forEach((entry) => {
      if (mostRecent > new Date(entry.time)) {
        setMostRecent(new Date(entry.time));
      }
    });
  };

  useEffect(() => {
    if (data) {
      sumData();
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Pulcsik száma az alapítványoknak",
            data: [
              sum["Szent Istvan Kiraly Alapitvany"],
              sum["Autizmus Alapitvany"],
              sum["Elelmiszer Bank Egyesulet"],
              sum["Lampas '97 Alapitvany"],
            ],
            backgroundColor: ["rgb(153, 102, 255)"],
            borderColor: ["rgb(153, 102, 255)"],
            borderWidth: 1,
          },
        ],
      });

      handleRecentlySent();

      setFoundationData([
        sum["Szent Istvan Kiraly Alapitvany"],
        sum["Autizmus Alapitvany"],
        sum["Elelmiszer Bank Egyesulet"],
        sum["Lampas '97 Alapitvany"],
      ]);
    }
  }, [data]);

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

  const handleDelete = async (event: any) => {
    const id = event.target.id;
    try {
      await axios.post("http://165.22.23.123/delete", {
        id,
      });
      console.log("Deleted");
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  if (!data) {
    return <div>loading..</div>;
  }

  if (data.length === 0) {
    return <div>nincsenek adat</div>;
  }

  return (
    <div className="dataPage">
      <Link to={"/"}>
        <button>Vissza</button>
      </Link>
      <p>
        Küldések száma: <span>{data.length}</span>
      </p>
      <span>Szent Istvan Kiraly Alapitvany: {foundationData[0]}</span>
      <br />
      <span>Autizmus Alapitvany: {foundationData[1]}</span>
      <span>
        <br />
        lelmiszer Bank Egyesulet: {foundationData[2]}
      </span>
      <br />
      <span>Lampas '97 Alapitvany: {foundationData[3]}</span>
      <br />
      <p>
        Utolsó küldés:{" "}
        <span>
          {mostRecent.toLocaleString("en-US", {
            timeZone: "Europe/Belgrade",
          })}
        </span>
      </p>
      <div>
        <table>
          <thead>
            <tr>
              <th onClick={handleSort}>Dátum</th>
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
                <td className="deleteRow">
                  <span id={entry.time} onClick={handleDelete}>
                    Del
                  </span>
                </td>
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
        <Bar className="chart" data={chartData} />
      </div>
    </div>
  );
}
export default Data;
