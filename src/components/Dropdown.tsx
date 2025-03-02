import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

type Props = {
  titulo: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  setSelectId: React.Dispatch<React.SetStateAction<number>>;
  disable: boolean;
};

function Dropdown({ titulo, placeholder, data, setSelectId, disable }: Props) {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(placeholder);
  return (
    <div className={`flex flex-col gap-2 relative transition-all ease-linear `}>
      <p className="font-medium">{titulo}</p>
      <div
        onClick={() => !disable && setOpen(!open)}
        className={`border border-gray-300 rounded-md px-4 py-2  ${
          disable
            ? "cursor-not-allowed bg-[#efefef] text-[#989898]"
            : "cursor-pointer"
        } `}
      >
        <div className="flex justify-between text-sm items-center ">
          <span className="capitalize">
            {select !== "" ? select : placeholder}
          </span>
          <ChevronDown
            className={`${
              open
                ? "rotate-180 transition-all ease-in duration-200"
                : "rotate-0 transition-all ease-in duration-200"
            }`}
          />
        </div>
        <div
          className={`absolute top-full overflow-hidden transition-all ease-linear delay-150 left-0 w-full bg-white border border-gray-300 rounded-md p-1 mt-0.5 z-30
            ${open ? "max-h-[200px]" : "max-h-0"}
            `}
        >
          {data.map((item: { id: number; name: string }) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelect(item.name);
                  setSelectId(item.id);
                  setOpen(false);
                }}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 py-1 px-10 "
              >
                <span className="capitalize">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
