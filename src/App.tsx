import BigCard from "./components/BigCard";
import Card from "./components/Card";
import Transactions from "./components/Transactions";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { getBalance, getCategories, getTransactions } from "./service/Api";

function App() {
  const [data, setData] = useState<{
    balance?: number;
    income?: number;
    expense?: number;
  }>({});
  const [dataCategory, setDataCategory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataTransaction, setDataTransaction] = useState([]);

  const fetchData = async () => {
    const balance = await getBalance();
    const categories = await getCategories();
    const transactions = await getTransactions();
    setData(balance);
    setDataCategory(categories);
    setDataTransaction(transactions.transactions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen lg:py-6 p-6 lg:w-[80%] mx-auto flex flex-col gap-10 ">
      {openModal && (
        <Modal
          setOpen={setOpenModal}
          dataCategory={dataCategory}
          fetchData={fetchData}
        />
      )}
      <div className="flex justify-between items-center">
        <p className="md:text-3xl text-xl font-bold">Control de gastos</p>
        <button
          onClick={() => setOpenModal(true)}
          className="flex gap-2 bg-black text-white rounded-md py-2 px-4 hover:cursor-pointer hover:bg-black/80 transition-all ease-linear"
        >
          <span>+</span>
          Nuevo Gasto
        </button>
      </div>

      <div className="grid grid-row-3 gap-4 md:grid-cols-3 transition-all ease-linear">
        <Card titulo="Total" importe={data.balance} />
        <Card titulo="Ingresos" importe={data.income} tipo="ing" />
        <Card titulo="Gastos" importe={data.expense} tipo="gas" />
      </div>

      <div className="flex flex-col gap-4 lg:grid md:grid-cols-2 transition-all ease-linear lg:h-[450px]">
        <BigCard data={dataTransaction} />
        <Transactions data={dataTransaction} />
      </div>
    </div>
  );
}

export default App;
