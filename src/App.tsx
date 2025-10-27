import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import CopyButton from "./components/CopyButton";
import Navbar from "./components/Navbar";

type Registro = {
  id: string;
  servidor: string;
  pasta: string;
  palavraChave: string;
  caminho: string;
};

export default function App() {
  // no dark mode — single light theme

  const [busca, setBusca] = useState("");
  const [todosRegistros, setTodosRegistros] = useState<Registro[]>([]);
  const [resultados, setResultados] = useState<Registro[]>([]);

  // Carrega todos os registros ao iniciar
  useEffect(() => {
    const carregarRegistros = async () => {
      const snapshot = await getDocs(collection(db, "banco"));
      const lista: Registro[] = [];
      snapshot.forEach((doc) => lista.push({ id: doc.id, ...doc.data() } as Registro));
      setTodosRegistros(lista);
      // mostra todos inicialmente

    };
    carregarRegistros();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = busca.trim().toLowerCase();

    if (!texto) {
      setResultados(todosRegistros); // mostra todos se não digitou nada
      return;
    }

    // Filtra localmente usando includes()
    const filtrados = todosRegistros.filter((r) =>
      r.palavraChave.toLowerCase().includes(texto)
    );
    setResultados(filtrados);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-full bg-gray-400`}>
      <Navbar/>
      <form onSubmit={handleSearch} className="bg-gray-400 p-6 rounded-2xl shadow-lg md:w-200 space-y-4 mb-6 mt-10" id="search-form">
        <h2 className="text-xl font-bold text-center">Buscar Palavra Chave</h2>
        <input
          type="text" 
          placeholder="Digite qualquer parte da palavra"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="md:w-3/4 w-full border p-2 rounded bg-gray-400 border-gray-900"
        />
        <button className="md:w-1/4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer">Consultar</button>
      </form>

      <div className="bg-gray-400 p-6 rounded-2xl shadow-lg w-full max-w-5xl">
        <h2 className="text-lg font-bold mb-4">Resultados</h2>

        {/* Mobile: stacked cards */}
        <div className="space-y-4 md:hidden">
          {resultados.length > 0 ? (
            resultados.map((r) => (
              <div key={r.id} className="border border-gray-900 rounded-lg p-4 shadow-sm bg-gay-700">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-500">Servidor</div>
                    <div className="font-medium">{r.servidor}</div>
                  </div>
                  <div className="ml-4">
                    <CopyButton textToCopy={r.caminho} />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700">
                  <div>
                    <div className="text-gray-500">Pasta</div>
                    <div className="break-words">{r.pasta}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Palavra Chave</div>
                    <div className="break-words">{r.palavraChave}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Caminho</div>
                    <div className="break-words">{r.caminho}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500">Nenhum registro encontrado</div>
          )}
        </div>

        {/* Desktop/tablet: show table on md+ */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Servidor</th>
                <th className="border border-gray-300 p-2">Pasta</th>
                <th className="border border-gray-300 p-2">Palavra Chave</th>
                <th className="border border-gray-300 p-2">Caminho</th>
                <th className="border border-gray-300 p-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((r) => (
                <tr key={r.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{r.servidor}</td>
                  <td className="border border-gray-300 p-2">{r.pasta}</td>
                  <td className="border border-gray-300 p-2">{r.palavraChave}</td>
                  <td className="border border-gray-300 p-2 break-words">{r.caminho}</td>
                  <td className="border border-gray-300 p-2"><CopyButton textToCopy={r.caminho} /></td>
                </tr>
              ))}
              {resultados.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    Nenhum registro encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

