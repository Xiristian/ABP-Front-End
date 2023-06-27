import { FormEvent, useState } from "react";
import { QueryClient, dehydrate, useMutation, useQuery, useQueryClient } from "react-query";
import { postSchedule, Schedule } from "../../actions/schedules";
import BackButton from "@/components/BackButton";
import { getUserLogged } from "@/actions/userLogged";
import { Client, getClients } from "@/actions/clients";

export default function newSchedules() {
    const userLogged = useQuery({ queryKey: ["userLogged"], queryFn: getUserLogged });
    const name = userLogged.data?.[0]?.name;
    const healthCenter = typeof name === "string" ? name : "";
    const clients = useQuery({ queryKey: ["client"], queryFn: getClients });


    const [errorMessage, setErrorMessage] = useState("");

    function addSchedule(event: FormEvent) {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        let scheduleDate = "";
        console.log(formData.get("newScheduleDate"));
        if (
            formData.get("newSchedulePatient") !== "" &&
            formData.get("newScheduleAppointmentType") !== "" &&
            formData.get("newScheduleHour") !== "" &&
            formData.get("newScheduleDate") !== "" &&
            formData.get("newScheduleDescription") !== "" &&
            formData.get("newScheduleDoctor") !== ""
        ) {
            scheduleDate = formData.get("newScheduleDate") as string;
            const newSchedule = {
                patientName: formData.get("newSchedulePatient"),
                healthCenter: healthCenter,
                doctorName: formData.get("newScheduleDoctor"),
                appointmentType: formData.get("newScheduleAppointmentType"),
                hour: formData.get("newScheduleHour"),
                date: `${scheduleDate.substring(8, 10)}/${scheduleDate.substring(
                    5,
                    7
                )}/${scheduleDate.substring(0, 4)}`,
                description: formData.get("newScheduleDescription"),
                status: "Confirmado",
            } as Schedule;

            mutationPost.mutate(newSchedule);

            form.reset();
            setErrorMessage("");
        } else {
            setErrorMessage("Preencha todos os campos!");
        }
    }

    const queryClient = useQueryClient();

    const mutationPost = useMutation(
        (newSchedule: Schedule) => postSchedule(newSchedule),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("schedules");
                alert("Agendamento Confirmado")
            },
        }
    );

    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center">
            <div className="flex flex-row">
                <BackButton customClass="mr-80 -ml-[439px] mt-[10px]"></BackButton>
                <h1 className="font-bold text-blue-950 text-2xl whitespace-nowrap">
                    NOVO AGENDAMENTO
                </h1>
            </div>
            <form
                onSubmit={addSchedule}
                method="post"
                className="space-y-4 text-left mt-10 ml-1"
            >
                <fieldset disabled={mutationPost.isLoading}>
                    <div className="flex space-x-15">
                        <div>
                            <label
                                htmlFor="newSchedulePatient"
                                className="block font-bold text-blue-950 text-2xl"
                            >
                                Paciente:
                            </label>
                            <select
                                id="newSchedulePatient"
                                name="newSchedulePatient"
                                className="input w-[1085px] h-10 bg-gray-300 rounded-md pl-2">
                                <option value="">Selecione o paciente</option>
                                {clients.data?.map((client: Client) => (
                                    <option value={client.name}>{client.name}</option>
                                )
                                )
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="newScheduleDoctor"
                            className="block font-bold text-blue-950 text-2xl"
                        >
                            Médico:
                        </label>
                        <select
                            id="newScheduleDoctor"
                            name="newScheduleDoctor"
                            className="input w-[1085px] h-10 bg-gray-300 rounded-md pl-2">

                            <option value="" selected>
                                Selecione o médico
                            </option>
                            <option value="Dra. Júlia">Dra. Júlia</option>
                            <option value="Dra. Ana">Dra. Ana</option>
                            <option value="Dr. Artur">Dr. Artur</option>
                        </select>

                    </div>
                    <div className="flex">
                        <div>
                            <label
                                htmlFor="newScheduleAppointmentType"
                                className="block font-bold text-blue-950 text-2xl"
                            >
                                Tipo de Atendimento:
                            </label>
                            <select
                                id="newScheduleAppointmentType"
                                name="newScheduleAppointmentType"
                                className="input w-[440px] bg-gray-300 rounded-md h-10 pl-2"
                            >
                                <option value="">Selecione o tipo de consulta</option>
                                <option value="Pediatra">Pediatra</option>
                                <option value="Dentista">Dentista</option>
                                <option value="Rotina">Rotina</option>
                                <option value="Dermatologista">Dermatologista</option>
                            </select>

                            <div className="flex space-x-15 mt-4">
                                <div>
                                    <label
                                        htmlFor="newScheduleDate"
                                        className="block font-bold text-blue-950 text-2xl "
                                    >
                                        Data:
                                    </label>
                                    <input
                                        type="date"
                                        id="newScheduleDate"
                                        name="newScheduleDate"
                                        className="input bg-gray-300 rounded-md h-10 w-44 pl-2"
                                    />
                                </div>

                                <div className="ml-[90px]">
                                    <label
                                        htmlFor="newScheduleHour"
                                        className="block font-bold text-blue-950 text-2xl "
                                    >
                                        Horário:
                                    </label>
                                    <input
                                        id="newScheduleHour"
                                        name="newScheduleHour"
                                        className="input w-[100px] h-[32px] bg-white text-black rounded-xl pl-6 mt-2 text-center "
                                        type="time"

                                    ></input>
                                </div>
                            </div>
                        </div>

                        <div className="ml-64">
                            <label
                                htmlFor="newScheduleDescription"
                                className="block font-bold text-blue-950 text-2xl"
                            >
                                Sintomas:
                            </label>
                            <textarea
                                id="newScheduleDescription"
                                name="newScheduleDescription"
                                className="input w-96 h-32  bg-gray-300 rounded-md pl-2"
                            ></textarea>
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="text-center h-0 text-red-600 ml-10">
                            <h1>{errorMessage}</h1>
                        </div>
                    )}
                    <div className="self-center text-center">
                        <button
                            disabled={mutationPost.isLoading}
                            type="submit"
                            className="btn w-80 h-12 rounded-3xl bg-blue-950 self-center mt-8 text-2xl text-white ml-10 mb-2"
                        >
                            ENVIAR
                        </button>
                    </div>
                </fieldset>
            </form>
        </div >
    );
}
export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["userLogged"],
        queryFn: getUserLogged,
    });
    await queryClient.prefetchQuery({
        queryKey: ["client"],
        queryFn: getClients,
    });
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}