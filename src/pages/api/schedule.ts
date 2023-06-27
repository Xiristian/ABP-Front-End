import { Request, Response } from 'express';
import { generateId } from "../../../env";

const DB = {
  schedules: [
    { id: generateId(), patientName: "Christian", healthCenter: "Pinheirinho", appointmentType: "Denstista", period: "Manhã", date: "11/07/2023", hour: "09:10", doctorName: "Dra. Ana", status: "Confirmado", description: "Ai que dorrrrr" },
    { id: generateId(), patientName: "Christian", healthCenter: "Pinheirinho", appointmentType: "Rotina", period: "Tarde", date: "11/07/2023", hour: "", doctorName: "Dra. Julia", status: "Aguardando aprovação", description: "Eu to morrendo socorro" },
    { id: generateId(), patientName: "Luz", healthCenter: "Tal", appointmentType: "Pediatra", period: "Tarde", date: "10/07/2023", hour: "", doctorName: "Dr Xiristian", status: "Confirmado" },
    { id: generateId(), patientName: "Luz", healthCenter: "Tal", appointmentType: "Pediatra", period: "Tarde", date: "10/07/2023", hour: "", doctorName: "Dra Ana", status: "Cancelado" }
  ],
};

export default function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    return res.status(200).json(DB.schedules);
  } else if (req.method === "POST" || req.method === "PUT") {

    if ("id" in req.body && !!req.body?.id) {
      const scheduleIndex = DB.schedules.findIndex(schedule => schedule.id === req.body.id);
      if (+scheduleIndex >= 0) {
        DB.schedules[scheduleIndex] = { ...DB.schedules[scheduleIndex], ...req.body };
        return res.status(200).json(DB.schedules[scheduleIndex]);
      }

      return res.status(200).json(null);
    }

    const newSchedule = { id: generateId(), ...req.body };
    DB.schedules = [...DB.schedules, newSchedule];

    return res.status(200).json(newSchedule);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    if (id) {
      DB.schedules = DB.schedules.filter(schedule => schedule.id !== id);
    }

    return res.status(200).json({ id, deleted: true });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
