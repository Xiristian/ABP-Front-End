import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import BackButton from "@/components/BackButton";
import { postClient, Client } from "../../actions/clients";

export default function Register() {

  const [errorMessage, setErrorMessage] = useState("");

  function addUser(event: FormEvent) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    if (
      formData.get("name") !== "" &&
      formData.get("phoneNumber") !== "" &&
      formData.get("cpf") !== "" &&
      formData.get("street") !== "" &&
      formData.get("city") !== "" &&
      formData.get("neighborhood") !== "" &&
      formData.get("state") !== "" &&
      formData.get("addressNumber") !== ""
    ) {
      const newUser = {
        name: formData.get("name") as string,
        number: formData.get("phoneNumber") as string,
        cpf: formData.get("cpf") as string,
        address: {
          street: formData.get("street") as string,
          city: formData.get("city") as string,
          neighborhood: formData.get("neighborhood") as string,
          state: formData.get("state") as string,
          number: formData.get("addressNumber") as unknown as BigInteger,
        },
      } as Client;

      mutationPost.mutate(newUser);

      form.reset();
      setErrorMessage("");
    } else {
      setErrorMessage("Preencha todos os campos!");
    }
  }

  const queryClient = useQueryClient();

  const mutationPost = useMutation((newUser: Client) => postClient(newUser), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center">
      <div className="flex flex-row items-center pt-1">
        <BackButton customClass="mr-40 -ml-[286px]" />
        <h1 className="font-bold text-blue-950 text-2xl whitespace-nowrap">
          CADASTRO DE USUÁRIO
        </h1>
      </div>
      <form
        onSubmit={addUser}
        method="post"
        className="space-y-4 text-left mt-10 "
      >
        <fieldset disabled={mutationPost.isLoading}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block font-bold text-blue-950 text-2xl"
              >
                Nome:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input w-full h-10 bg-gray-300 rounded-md pl-2"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block font-bold text-blue-950 text-2xl"
              >
                Número de Telefone:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="input w-96 h-10 bg-gray-300 rounded-md pl-2"
              />
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="block font-bold text-blue-950 text-2xl"
              >
                CPF:
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                className="input w-96 h-10 bg-gray-300 rounded-md pl-2"
              />
            </div>

            <div>
              <label
                htmlFor="neighborhood"
                className="block font-bold text-blue-950 text-2xl"
              >
                Bairro:
              </label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                className="input h-10 bg-gray-300 rounded-md pl-2 w-96"
              />
            </div>
            
            <div className="flex space-x-4">
            <div>
              <label
                htmlFor="city"
                className="block font-bold text-blue-950 text-2xl"
              >
                Cidade:
              </label>
              <select
                id="city"
                name="city"
                className="input w-60 h-10 bg-gray-300 rounded-md pl-2"
              >
                <option value="">Selecione a cidade</option>
                <option value="city1">Criciúma</option>
                <option value="city2">Sombrio</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="state"
                className="block font-bold text-blue-950 text-2xl"
              >
                Estado:
              </label>
              <select
                id="state"
                name="state"
                className="input w-32 h-10 bg-gray-300 rounded-md pl-2 "
              >
                <option value="">Selecione o estado</option>
                <option value="state1">SC</option>
              </select>
            </div>
            </div>

            <div>
              <label
                htmlFor="street"
                className="block font-bold text-blue-950 text-2xl"
              >
                Rua:
              </label>
              <input
                type="text"
                id="street"
                name="street"
                className="input w-96 h-10 bg-gray-300 rounded-md pl-2"
              />
            </div>

            <div>
              <label
                htmlFor="addressNumber"
                className="block font-bold text-blue-950 text-2xl"
              >
                Nº:
              </label>
              <input
                type="text"
                id="addressNumber"
                name="addressNumber"
                className="input w-24 h-10 bg-gray-300 rounded-md pl-2"
              />
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
    </div>
  );
}
