import { dehydrate, QueryClient, useQuery } from "react-query";

import { getSchedules, Schedule } from "../actions/schedules";

export default function Schedules() {
  var schedules = useQuery({ queryKey: ["schedule"], queryFn: getSchedules });

  return (
    <div>
      {!!schedules.isLoading && <p className="text-lg font-bold text-gray-400">Carregando próximos agendamentos...</p>}
      <ul className="mx-5 my-4 flex space-x-4">
        {schedules.data?.filter((schedule: Schedule) => (schedule.patientName === "Christian"))
          .map((schedule: Schedule) => (
            <li key={schedule.id} className="py-px">
              <div className="border-blue-950 border rounded text-white text-center text-2xl">
                <div className="bg-blue-950 p-1">
                  <h1>{schedule.appointmentType}</h1>
                </div>
                <div className="bg-blue-950 opacity-50 text-start p-2">
                  <h1>Data: {schedule.date}</h1>
                  <h1>Horário: {schedule.hour}</h1>
                  <h1>Unidade: {schedule.healthCenter}</h1>
                  <h1>Especialista: {schedule.doctorName}</h1>
                </div>
              </div>
            </li>
          ))}
      </ul>
      {!schedules.isLoading && schedules.data?.length === 0 && (
        <p className="font-semibold text-gray-600">Nenhum agendamento marcado</p>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["schedule"],
    queryFn: getSchedules,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
