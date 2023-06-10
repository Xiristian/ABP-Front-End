import { Request, Response } from 'express';
import { generateId } from "../../../env";

const DB = {
  clients: [
    { id: generateId(), name: "Christian", number: "48999999999", cpf: "12345678900", address: { street: "Rua Artur Tal de Tal", city: "Criciúma", neighborhood: "Pinheirinho", state: 'SC', number: 456 } },
    { id: generateId(), name: "Luz", number: "48999999998", cpf: "12345678901", address: { street: "Rua Pedro Tal Tal", city: "Sombrio", neighborhood: "Tal", state: 'SC', number: 123 } }
  ],
};

export default function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    return res.status(200).json(DB.clients);
  } else if (req.method === "POST" || req.method === "PUT") {

    if ("id" in req.body && !!req.body?.id) {
      const clientIndex = DB.clients.findIndex(client => client.id === req.body.id);
      if (+clientIndex >= 0) {
        DB.clients[clientIndex] = { ...DB.clients[clientIndex], ...req.body };
        return res.status(200).json(DB.clients[clientIndex]);
      }

      return res.status(200).json(null);
    }

    const newClient = { id: generateId(), ...req.body };
    DB.clients = [...DB.clients, newClient];

    return res.status(200).json(newClient);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    if (id) {
      DB.clients = DB.clients.filter(client => client.id !== id);
    }

    return res.status(200).json({ id, deleted: true });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
