import { Request, Response } from 'express';
import { generateId } from "../../../env";
import { UserLogged } from "../../actions/userLogged";

const DB: { userLogged: UserLogged[] } = {
  userLogged: [],
};

export default function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    return res.status(200).json(DB.userLogged);
  } else if (req.method === "POST" || req.method === "PUT") {

    const newUserLogged = { id: generateId(), ...req.body };
    DB.userLogged = [...DB.userLogged, newUserLogged];

    return res.status(200).json(newUserLogged);
  } else if (req.method === "DELETE") {
    DB.userLogged = [];

    return res.status(200).json({ deleted: true });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
