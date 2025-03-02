import "../index.css";

interface Transaction {
  description: string;
  category?: { name: string };
  created_at?: string;
  type: string;
  amount: number;
}

interface TransactionsProps {
  data: Transaction[];
}

function Transactions({ data }: TransactionsProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-6 flex flex-col gap-5">
      <p className="text-2xl font-semibold">Transacciones Recientes</p>

      {/* Envuelve la tabla en un div con overflow-y-scroll y altura máxima */}
      <div className="max-h-[350px] overflow-y-scroll hide-scrollbar">
        <table className="w-full ">
          <thead>
            <tr className="border-b-1 border-gray-300 text-sm text-[#71717a] hover:bg-gray-50 transition-all ease-in-out">
              <th className="text-start px-4 py-2 font-medium">Descripción</th>
              <th className="text-start px-4 py-2 font-medium">Categoría</th>
              <th className="text-start px-4 py-2 font-medium">Fecha</th>
              <th className="text-start px-4 py-2 font-medium">Monto</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 text-sm hover:bg-gray-50 transition-all ease-in-out"
                >
                  <td className="text-start px-4 py-2">{item.description}</td>
                  <td className="text-start px-4 py-2">
                    {item.category ? item.category.name : "Ingreso"}
                  </td>
                  <td className="text-start px-4 py-2">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "Sin fecha"}
                  </td>
                  <td
                    className={`text-start px-4 py-2 ${
                      item.type === "ingreso"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    s/{item.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-500">
                  No hay transacciones recientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
