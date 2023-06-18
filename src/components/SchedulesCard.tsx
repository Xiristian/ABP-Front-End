import { dehydrate, QueryClient, useQuery } from "react-query";

import { getSchedules, Schedule } from "../actions/schedules";
import { getUserLogged } from "@/actions/userLogged";

export default function Schedules() {
  const schedulesQuery = useQuery({ queryKey: ["schedule"], queryFn: getSchedules });
  const schedules = schedulesQuery.data;

  const userLogged = useQuery({ queryKey: ["userLogged"], queryFn: getUserLogged });
  const name = userLogged.data?.[0]?.name;
  const type = userLogged.data?.[0]?.type;

  const filteredSchedules = schedules?.filter((schedule: Schedule) => {
    if (type === 'patient') {
      return schedule.patientName === name && schedule.status === 'Confirmado';
    } else if (type === 'healthCenter') {
      return schedule.healthCenter === name && schedule.status === 'Confirmado';
    }
    return false;
  });

  const isLoading = schedulesQuery.isLoading;

  return (
    <div>
      {!!isLoading && <p className="text-lg font-bold text-gray-400">Carregando próximos agendamentos...</p>}
      <ul className="mx-5 my-4 flex space-x-4">
        {filteredSchedules?.map((schedule: Schedule) => (
          <li key={schedule.id} className="py-px">
            <div className="border-blue-950 border rounded text-white text-center text-2xl max-w-xs">
              <div className="bg-blue-950 p-1">
                <h1>{schedule.date} - {type === 'patient' ? schedule.appointmentType: schedule.hour}</h1>
              </div>
              {type === 'patient' &&
              (<div className="bg-blue-950 opacity-50 text-start p-2">
                <h1>Horário: {schedule.hour}</h1>
                <h1>Unidade: {schedule.healthCenter}</h1>
                <h1>Especialista: {schedule.doctorName}</h1>
              </div>)}
              {type === 'healthCenter' &&
              (<div className="bg-blue-950 opacity-50 text-start p-2">
                <h1>Nome: {schedule.patientName}</h1>
                <h1>Profissional: {schedule.doctorName}</h1>
                <h1 className="break-words">Motivo: {schedule.description}</h1>
              </div>)}
            </div>
          </li>
        ))}
      </ul>
      {!isLoading && filteredSchedules?.length === 0 && (
        <p className="font-semibold text-blue-950 my-4 -mt-8">Nenhum agendamento marcado</p>
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

  await queryClient.prefetchQuery({
    queryKey: ["userLogged"],
    queryFn: getUserLogged,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
