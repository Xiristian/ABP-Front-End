import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getSchedules, Schedule } from "../../actions/schedules";
import BackButton from "@/components/BackButton";
import { getUserLogged } from "@/actions/userLogged";

export default function RequestsList() {
  const [expandedId, setExpandedId] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const schedulesQuery = useQuery({ queryKey: ["schedule"], queryFn: getSchedules });
  const schedules = schedulesQuery.data;
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelReason, setShowCancelReason] = useState(false);
  const [choiceTime, setChoiceTime] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [submitCancelReason, setSubmitCancelreason] = useState("");

  const cardClick = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? "" : id));
  };

  const confirmClick = (id: string) => {
    setShowCancelReason(false);
    setChoiceTime("");
    setShowOptions((prevState) => !prevState);
    setSelectedProfessional("");
    console.log("Profissional selecionado:", selectedProfessional);
  };

  const cancelClick = (id: string) => {
    setShowCancelReason((prevState) => !prevState);
    setShowOptions(false);
    console.log(`Atendimento ${id} cancelado.`);
  };

  const cancelRealClick = (id: string) => {
    setShowCancelReason(false);
    setCancelReason("");
    setSubmitCancelreason(cancelReason);
  };

  const submitedCancelReason = (id: string) => {
    setShowCancelReason(false);
    setSubmitCancelreason(cancelReason);
  };

  const userLogged = useQuery({ queryKey: ["userLogged"], queryFn: getUserLogged });
  const name = userLogged.data?.[0]?.name;

  const filteredRequests = schedules?.filter((schedule: Schedule) => 
     schedule.healthCenter === name && schedule.status === 'Aguardando aprovação' 
  );


  return (
    <div className="flex min-h-full w-full items-center text-left justify-center flex-col">
      <div className="ml-80 flex flex-row">
        <BackButton customClass="mr-8 -ml-[439px] mt-4 h-10" />
        <h1 className="font-bold text-blue-950 text-3xl  my-4 whitespace-nowrap">
          NOVAS SOLICITAÇÕES DE AGENDAMENTO:
        </h1>
      </div>
      <ul className="mx-5 my-4 space-y-4">
        {filteredRequests?.map((schedule: Schedule) => (
          <li key={schedule.id}>
            <div
              className={`border-blue-950 rounded-lg text-white text-start text-xl px-10 ${
                expandedId === schedule.id
                  ? "bg-blue-950"
                  : "bg-blue-950 opacity-50"
              } p-2`}
              onClick={() => cardClick(schedule.id)}
            >
              <div className="p-1">
                <p>Data: {schedule.date}</p>
                <p>Período: {schedule.period}</p>
                <p>Paciente: {schedule.patientName}</p>
              </div>
              {expandedId === schedule.id && (
                <div className="text-start">
                  <p>Atendimento: {schedule.appointmentType}</p>
                  <p>Descrição: {schedule.description}</p>
                  <hr />
                </div>
              )}
            </div>
            <div className="flex mt-4 justify-between">
              <div className="mt-4">
                <button
                  className="bg-blue-950 rounded-full text-white h-10 w-[320px] px-4 py-2 mr-2"
                  onClick={() => confirmClick(schedule.id)}
                >
                  Confirmar Agendamento
                </button>
                {expandedId === schedule.id && showOptions && (
                  <div className="mt-4 flex bg-blue-950 bg-opacity-50 rounded-xl w-[330px] h-[150px]">
                    <div>
                      <h3 className="text-center font-bold  text-black underline mt-10 whitespace-nowrap">
                        Profissional Responsável
                      </h3>
                      <select
                        className="input w-[190px] bg-white  text-black rounded-xl h-8 pl-2 mt-2 m-2"
                        value={selectedProfessional ?? ""}
                        onChange={(e) =>
                          setSelectedProfessional(e.target.value)
                        }
                      >
                        <option value="" disabled selected>
                          Selecione o profissional
                        </option>
                        <option value="1">Dra. Júlia</option>
                        <option value="2">Dra. Ana</option>
                        <option value="3">Dr. Artur</option>
                      </select>
                    </div>
                    <div className="ml-2 mt-2">
                      <h3 className="text-center font-bold text-black underline mt-8 whitespace-nowrap">
                        Horário
                      </h3>
                      <input
                        className="input w-[100px] h-[32px] bg-white text-black rounded-xl pl-6 mt-2 text-center "
                        type="time"
                        value={choiceTime}
                        onChange={(e) => setChoiceTime(e.target.value)}
                      ></input>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-950 rounded-full text-white h-10 w-80 px-4 py-2 ml-2 "
                  onClick={() => cancelClick(schedule.id)}
                >
                  Cancelar Atendimento
                </button>
              </div>
            </div>
            <div>
              {expandedId === schedule.id && showCancelReason && (
                <div className="mt-2 ml-2 flex justify-end ">
                  <div className=" mr-6 mt-2 mb-12 ml- flex-col bg-blue-950 bg-opacity-50 rounded-xl w-[260px] h-[120px]">
                    <textarea
                      placeholder=" Justifique o cancelamento"
                      className="input w-[245px] h-[100px] ml-2 bg-white rounded-md mt-2 mb-4 "
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between ">
                      <button
                        className="bg-blue-950 w-[200px] h-[40px] rounded-xl text-white font-bold px-4 py-2"
                        onClick={() => {
                          cancelRealClick(schedule.id);
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        className="bg-blue-950 ml-2 w-[200px] h-[40px] rounded-xl text-white font-bold px-4 py-2 "
                        onClick={() => {
                          submitedCancelReason(schedule.id);
                        }}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {filteredRequests?.length === 0 && (
        <p className="font-semibold text-blue-950 my-4 -mt-8">Nenhuma nova solicitação</p>
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
