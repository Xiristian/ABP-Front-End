type Schedule = {
  id: string;
  patientName: string;
  healthCenter: string;
  appointmentType: string;
  period: string;
  date: string | Date;
  hour: string;
  doctorName: string;
  status: "Confirmado" | "Aguardando aprovação" | "Cancelado";
  description: string;
};
