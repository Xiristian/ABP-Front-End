import { FormEvent, useState } from "react";
import { dehydrate, QueryClient, useMutation, useQueryClient } from "react-query";

import { postSchedule, Schedule } from "../../actions/schedules";
import Link from "next/link";

export default function newSchedules() {
    const [errorMessage, setErrorMessage] = useState("");

    function addSchedule(event: FormEvent) {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        if (formData.get("newScheduleHealthCenter") !== "" && formData.get("newScheduleAppointmentType") !== ""
            && formData.get("newSchedulePeriod") !== "" && formData.get("newScheduleDate") !== "") {
            const newSchedule = {
                patientName: "Ana",
                healthCenter: formData.get("newScheduleHealthCenter"),
                appointmentType: formData.get("newScheduleAppointmentType"),
                period: formData.get("newSchedulePeriod"),
                date: formData.get("newScheduleDate"),
                status: "Aguardando aprovação",
                doctorName: "",
                hour: "",
            } as Schedule;

            mutationPost.mutate(newSchedule);

            form.reset();
            setErrorMessage("");
        } else {
            setErrorMessage("Preencha todos os campos!");
        }
    }

    const queryClient = useQueryClient();

    const mutationPost = useMutation
        ((newSchedule: Schedule) =>  postSchedule(newSchedule), {
            onSuccess: () => {
                queryClient.invalidateQueries("schedules");
            },
        });

    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center">
            <h1 className="font-bold text-blue-950 text-2xl whitespace-nowrap ml-10">NOVO AGENDAMENTO</h1>
            <form onSubmit={addSchedule} method="post" className="space-y-4 text-left mt-10 ">
                <fieldset disabled={mutationPost.isLoading}>
                    <div className="flex space-x-15">
                        <div>
                            <label htmlFor="estado" className="block font-bold text-blue-950 text-2xl">Estado:</label>
                            <select id="estado" name="estado" className="input w-[440px] bg-gray-300 rounded-md h-10">
                                <option value="">Selecione o estado</option>
                                <option value="SC">Santa Catarina</option>
                            </select>
                        </div>

                        <div className="ml-64">
                            <label htmlFor="cidade" className="block font-bold text-blue-950 text-2xl">Cidade:</label>
                            <select id="cidade" name="cidade" className="input w-96 h-10 bg-gray-300 rounded-md">
                                <option value="">Selecione a cidade</option>
                                <option value="criciuma">Criciúma</option>
                                <option value="sombrio">Sombrio</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="newScheduleHealthCenter" className="block font-bold text-blue-950 text-2xl">Posto de Saúde:</label>
                        <select id="newScheduleHealthCenter" name="newScheduleHealthCenter" className="input w-[1085px] h-10 bg-gray-300 rounded-md">
                            <option value="">Selecione o posto</option>
                            <option value="Tal">Posto Centro</option>
                            <option value="Minadomato">Posto Mina do Mato</option>
                            <option value="Pinheirinho">Posto Pinheirinho</option>
                            <option value="Sombrio">Posto Sombrio</option>
                        </select>
                    </div>

                    <div className="flex space-x-15">
                        <div>
                            <label htmlFor="newScheduleAppointmentType" className="block font-bold text-blue-950 text-2xl">Tipo de Atendimento:</label>
                            <select id="newScheduleAppointmentType" name="newScheduleAppointmentType" className="input w-[440px] bg-gray-300 rounded-md h-10">
                                <option value="">Selecione o tipo de consulta</option>
                                <option value="Pediatra">Pediatra</option>
                                <option value="Dentista">Dentista</option>
                                <option value="Rotina">Rotina</option>
                                <option value="Dermatologista">Dermatologista</option>
                            </select>

                            <div className="flex space-x-15 mt-4">
                                <div>
                                    <label htmlFor="newScheduleDate" className="block font-bold text-blue-950 text-2xl">Data:</label>
                                    <input type="date" id="newScheduleDate" name="newScheduleDate" className="input bg-gray-300 rounded-md h-10 w-44" />
                                </div>

                                <div className="ml-[90px]">
                                    <label htmlFor="newSchedulePeriod" className="block font-bold text-blue-950 text-2xl">Período:</label>
                                    <select id="newSchedulePeriod" name="newSchedulePeriod" className="input bg-gray-300 rounded-md h-10 w-44">
                                        <option value="">Selecione o Período</option>
                                        <option value="Manhã">Manhã</option>
                                        <option value="Tarde">Tarde</option>
                                        <option value="Noite">Noite</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="ml-64">
                            <label htmlFor="sintomas" className="block font-bold text-blue-950 text-2xl">O que você está sentindo:</label>
                            <textarea id="sintomas" name="sintomas" className="input w-96 h-32  bg-gray-300 rounded-md"></textarea>
                        </div>
                    </div>
                    <div className="self-center text-center">
                        <button
                            disabled={mutationPost.isLoading}
                            type="submit"
                            className="btn w-80 h-12 rounded-3xl bg-blue-950 self-center mt-11 text-2xl text-white ml-10">
                            ENVIAR
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>

    )
}