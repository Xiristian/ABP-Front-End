import React from "react";
import { FaTimesCircle, FaClock, FaCheckCircle } from "react-icons/fa";

type HistoryRowProps = {
  doctorName: string;
  scheduleDate: Date | string;
  status: "Confirmado" | "Aguardando aprovação" | "Cancelado";
};

export function HistoryRow({
  doctorName,
  scheduleDate,
  status,
}: HistoryRowProps) {
  return (
    <div className="bg-gray-400 p-4 rounded font-bold text-xl flex text-white w-full justify-between">
      <div>
        {doctorName} - {String(scheduleDate)} - {status}
      </div>
      <div className="">
        {status === "Confirmado" && (
          <FaCheckCircle className="w-[25px] h-[25px]" color="white" />
        )}
        {status === "Aguardando aprovação" && (
          <FaClock className="w-[25px] h-[25px]" color="white" />
        )}
        {status === "Cancelado" && (
          <FaTimesCircle className="w-[25px] h-[25px]" color="white" />
        )}
      </div>
    </div>
  );
}
