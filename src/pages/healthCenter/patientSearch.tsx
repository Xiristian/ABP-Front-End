import { Client, getClients } from "@/actions/clients";
import BackButton from "@/components/BackButton";
import { useState, FormEvent } from "react";
import { QueryClient, dehydrate, useQuery } from "react-query";

export default function PatientSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const clients = useQuery({ queryKey: ["client"], queryFn: getClients });

  const [selectedClientId, setSelectedClientId] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    patientSearch();
  };

  const patientSearch = () => {
    const filteredClients = clients.data?.filter((client: Client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSelectedClientId("");
  
  };

  const toggleClientDetails = (clientId: string) => {
    setSelectedClientId((prevSelectedClientId) =>
      prevSelectedClientId === clientId ? "" : clientId
    );
  };

  return (
    <div className="container mx-auto py-8">
      <BackButton customClass=""></BackButton>
      <h1 className="text-2xl font-bold text-blue-950 mb-4 pl-1">
        Buscar Pacientes
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome do paciente"
          className="border border-gray-300 rounded-md px-4 py-2 w-96"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="bg-blue-950 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md ml-4"
        >
          Buscar
        </button>
      </form>

      <div className="mt-8">
        {clients.data?.filter((client: Client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 ? (
          <p className="text-gray-600 pl-1">Nenhum resultado encontrado.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Nome</th>
              </tr>
            </thead>
            <tbody>
              {clients.data
                ?.filter((client: Client) =>
                  client.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((client: Client) => (
                  <tr
                    key={client.id}
                    onClick={() => toggleClientDetails(client.id)}
                    className="cursor-pointer"
                  >
                    <td className="py-2 px-4">{client.id}</td>
                    <td className="py-2 px-4">{client.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedClientId !== "" && (
        <div className="bg-gray-200 p-4 mt-4">
          <h2 className="text-lg font-bold text-gray-800">
            Detalhes do Cliente
          </h2>
          {clients.data
            ?.filter((client: Client) => client.id === selectedClientId)
            .map((client: Client) => (
              <div key={client.id}>
                <p>Nome: {client.name}</p>
                <p>Número: {client.number}</p>
                <p>CPF: {client.cpf}</p>
                <p>
                  Endereço: {client.address.street}, {client.address.number} -{" "}
                  {client.address.neighborhood}, {client.address.city},{" "}
                  {client.address.state}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

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
