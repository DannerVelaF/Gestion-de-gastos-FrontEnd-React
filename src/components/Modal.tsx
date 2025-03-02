import { ChevronDown, X } from "lucide-react";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { createTransaction } from "../service/Api";
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataCategory: Category[];
  fetchData: () => void;
};

type Category = {
  id: number;
  name: string;
};

type Transaction = {
  description: string;
  amount: number;
  category_id: number | null;
  type: string;
};

function Modal({ setOpen, dataCategory, fetchData }: Props) {
  const [dataForm, setDataForm] = useState<Transaction>({
    description: "",
    amount: 0,
    category_id: null,
    type: "",
  });
  const [error, setError] = useState({
    descriptionError: "",
    typeError: "",
  });

  const tipoData = [
    {
      id: 1,
      name: "ingreso",
    },
    {
      id: 2,
      name: "gasto",
    },
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(dataForm);

    e.preventDefault();
    const response = await createTransaction(dataForm);
    console.log(response);
    if (response.status === 200) {
      setOpen(false);
      setDataForm({
        description: "",
        amount: 0,
        category_id: null,
        type: "",
      });
      fetchData();
    } else {
      setError({
        descriptionError: response.data.errors.description[0],
        typeError: response.data.errors.type[0],
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/80 flex justify-center items-center text-sm font-medium">
      <form
        className="bg-white md:w-[25%] w-[80%] p-6 rounded-md flex flex-col gap-6"
        onSubmit={onSubmit}
      >
        <div className="flex justify-between">
          <p className="font-semibold text-xl">Agregar Transacción</p>
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </div>

        <div className="flex flex-col gap-4">
          {/* Descripción */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-medium">
              Descripción
            </label>
            <input
              type="text"
              value={dataForm.description}
              onChange={(e) => {
                setDataForm({ ...dataForm, description: e.target.value });
                setError({ ...error, descriptionError: "" });
              }}
              id="description"
              className="border border-gray-300 rounded-md px-4 py-2"
            />
            {
              // Si hay un error, muestra un mensaje de error
              error.descriptionError && (
                <p className="text-red-500 text-sm">{error.descriptionError}</p>
              )
            }
          </div>

          {/* Monto */}
          <div className="flex flex-col gap-2">
            <label htmlFor="monto" className="font-medium">
              Monto
            </label>
            <input
              type="number"
              id="monto"
              value={dataForm.amount || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Asegura que solo haya números
                  setDataForm({
                    ...dataForm,
                    amount: value === "" ? 0 : parseInt(value, 10),
                  });
                }
              }}
              className="border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <Dropdown
            titulo="Categoría"
            placeholder="Selecciona una categoría"
            data={dataCategory}
            setSelectId={(id) => setDataForm({ ...dataForm, category_id: id })}
            disable={dataForm.type === "ingreso"}
          />
          <Dropdown
            titulo="Tipo"
            placeholder="Seleccionar tipo"
            data={tipoData}
            setSelectId={(id) => {
              setDataForm({
                ...dataForm,
                type: id === 1 ? "ingreso" : "gasto",
              });
              setError({ ...error, typeError: "" });
            }}
          />
          {
            // Si hay un error, muestra un mensaje de error
            error.typeError && (
              <p className="text-red-500 text-sm">{error.typeError}</p>
            )
          }
          <div>
            <button className="bg-black text-white w-full font-semibold py-2 px-4 rounded-md hover:cursor-pointer hover:bg-black/90 transition-all ease-linear">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Modal;
