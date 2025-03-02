import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Gastos",
    },
  },
};

interface Transaction {
  description: string;
  category?: { name: string };
  created_at?: string;
  type: string;
  amount: string;
}

interface TransactionsProps {
  data: Transaction[];
}

function BigCard({ data = [] }: TransactionsProps) {
  const [filter, setFilter] = useState("category");
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Gastos",
        data: [] as number[],
        backgroundColor: "rgba(24, 24, 27, 0.8)",
      },
    ],
  });

  useEffect(() => {
    if (data.length === 0) return;

    let groupedData: Record<string, number> = {};

    if (filter === "category") {
      groupedData = data.reduce((acc, item) => {
        if (item.type === "gasto") {
          const categoryName = item.category?.name || "Sin categoría";
          acc[categoryName] =
            (acc[categoryName] || 0) + parseFloat(item.amount);
        }
        return acc;
      }, {} as Record<string, number>);
    } else {
      groupedData = data.reduce((acc, item) => {
        if (item.type === "gasto" && item.created_at) {
          const month = new Date(item.created_at).toLocaleString("es-ES", {
            month: "long",
          });
          acc[month] = (acc[month] || 0) + parseFloat(item.amount);
        }
        return acc;
      }, {} as Record<string, number>);
    }

    setChartData({
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: "Gastos",
          data: Object.values(groupedData),
          backgroundColor: "rgba(24, 24, 27, 0.8)",
        },
      ],
    });
  }, [data, filter]);

  return (
    <div className="border border-gray-300 rounded-lg p-6 flex flex-col gap-5">
      <div className="flex items-center gap-4 justify-between">
        <p className="md:text-2xl text-lg font-semibold">Gastos</p>
        <select
          className="text-xs md:text-sm"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="category">Por Categoría</option>
          <option value="month">Por Mes</option>
        </select>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BigCard;
