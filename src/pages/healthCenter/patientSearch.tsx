import { useState, useEffect } from "react";

export default function PatientSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    { id: number; name: string }[]
  >([]);
  const [clients, setClients] = useState<{
    id: number;
    name: string;
    number: string;
    cpf: string;
    address: {
      street: string;
      city: string;
      neighborhood: string;
      state: string;
      number: number;
    };
  }[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/client");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Erro ao obter os clientes:", error);
    }
  };

  useEffect(() => {
    patientSearch();
  }, [searchTerm, clients]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    patientSearch();
  };

  const patientSearch = () => {
    const filteredClients = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredClients);
    setSelectedClientId(null);
  };

  const toggleClientDetails = (clientId: number) => {
    setSelectedClientId((prevSelectedClientId) =>
      prevSelectedClientId === clientId ? null : clientId
    );
  };

  return (
    <div className="container mx-auto py-8">
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
        {searchResults.length === 0 && (
          clients.length === 0 ? (
            <p className="text-gray-600 pl-1">Nenhum cliente cadastrado.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Nome</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
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
          )
        )}

        {searchResults.length > 0 && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Nome</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((client) => (
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

      {selectedClientId !== null && (
        <div className="bg-gray-200 p-4 mt-4">
          <h2 className="text-lg font-bold text-gray-800">
            Detalhes do Cliente
          </h2>
          {clients
            .filter((client) => client.id === selectedClientId)
            .map((client) => (
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
