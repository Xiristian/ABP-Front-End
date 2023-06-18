import { API_URI } from "../../env";

export type UserLogged = {
    id: string;
    name: string;
    type: string
}

export async function getUserLogged() {
    const response = await fetch(`${API_URI}/userLogged`);
    return await response.json();
}

export async function postUserLogged(newUserLogged: UserLogged) {
    const response = await fetch(`${API_URI}/userLogged`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserLogged),
    });
    return await response.json();
}

export async function deleteUserLogged() {
    const response = await fetch(`${API_URI}/userLogged`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await response.json();
}
