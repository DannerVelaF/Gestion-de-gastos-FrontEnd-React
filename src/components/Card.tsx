type Props = {
  titulo?: string;
  importe?: number;
  tipo?: string;
};

import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  DollarSignIcon,
} from "lucide-react";

function Card({ titulo, importe = 0, tipo }: Props) {
  return (
    <div className="border border-gray-300 rounded-lg p-6">
      <div className="flex justify-between text-sm">
        <p className="font-medium">{titulo}</p>
        {tipo === "ing" ? (
          <ArrowUpCircleIcon className="text-green-500 w-5 h-5" />
        ) : tipo === "gas" ? (
          <ArrowDownCircleIcon className="text-red-500 w-5 h-5" />
        ) : (
          <DollarSignIcon className="text-gray-500 w-5 h-5" />
        )}
      </div>
      {/* Solución: Eliminar el <p> anidado */}
      <p className="text-2xl font-bold text-gray-800">
        <span
          className={
            tipo === "ing"
              ? "text-green-500"
              : tipo === "gas"
              ? "text-red-500"
              : ""
          }
        >
          s/{importe}
        </span>
      </p>
    </div>
  );
}

export default Card;
