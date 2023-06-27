import { HistoryRow } from "@/components/HistoryRow";
import React from "react";
import BackButton from "@/components/BackButton";
import type { GetServerSideProps } from "next";

type HistorySchedule = {
  historySchedule: Schedule[];
};

export const getServerSideProps: GetServerSideProps<{
  historySchedule: Schedule[];
}> = async () => {
  const response = await fetch("http://localhost:3000/api/schedule");

  const historySchedule = await response.json();

  return { props: { historySchedule } };
};

export default function History({ historySchedule }: HistorySchedule) {
  return (
    <div className="h-screen flex w-screen justify-center items-center">
      <BackButton customClass="mr-8 -ml-[439px] mt-4 h-10" />
      <div className="w-full px-4 md:w-2/3 xl:w-1/3 grid gap-4">
        <h1 className="text-2xl mx-auto font-bold text-primary">
          HISTÓRICO DE CONSULTAS
        </h1>
        {historySchedule.map((schedule) => (
          <HistoryRow
            doctorName={schedule.doctorName}
            scheduleDate={schedule.date}
            status={schedule.status}
          />
        ))}
      </div>
    </div>
  );
}
