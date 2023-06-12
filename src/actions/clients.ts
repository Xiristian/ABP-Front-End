import { API_URI } from "../../env";

export type Client = {
  id: string;
  name: string;
  number: string;
  cpf: string;
  adress: {
    street: string;
    city: string;
    neighborhood: string;
    state: string;
    number: BigInteger;
  };
}

export async function getClients() {
  const response = await fetch(`${API_URI}/client`);
  return await response.json();
}

export async function postClient(newClient: Client) {
  const response = await fetch(`${API_URI}/client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newClient),
  });
  return await response.json();
}

export async function deleteClient(id: string) {
  const response = await fetch(`${API_URI}/client/?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}
