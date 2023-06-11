import { API_URI } from "../../env";

export type Schedule = {
  id: string;
  patientName: string;
  healthCenter: string;
  appointmentType: string;
  doctorName: string;
  period: string;
  date: string;
  hour: string;
  status: string;
  description: string;
}

export async function getSchedules() {
  const response = await fetch(`${API_URI}/schedule`);
  return await response.json();
}

export async function postSchedule(newSchedule: Schedule) {
  const response = await fetch(`${API_URI}/schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSchedule),
  });
  return await response.json();
}

export async function deleteSchedule(id: string) {
  const response = await fetch(`${API_URI}/schedule/?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}
