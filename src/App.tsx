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
    <div className={`flex flex-col items-center justify-center min-h-full bg-neutral-950`}>
      <Navbar/>
      <form onSubmit={handleSearch} className="bg-neutral-900 p-6 rounded-2xl shadow-lg md:w-200 space-y-4 mb-6 mt-10 border border-neutral-800" id="search-form">
        <h2 className="text-xl font-bold text-center text-neutral-100">Buscar Palavra Chave</h2>
        <input
          type="text" 
          placeholder="Digite qualquer parte da palavra"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="md:w-3/4 w-full border p-3 rounded-lg bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 transition-all duration-200 shadow-sm"
        />
        <button className="md:w-1/6 w-full bg-neutral-700 text-neutral-100 p-3 md:ml-1 rounded-lg hover:bg-neutral-600 active:bg-neutral-500 cursor-pointer transition-all duration-200 font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50">Consultar</button>
      </form>

      <div className="bg-neutral-900 p-6  md:shadow-lg w-full border border-neutral-800">
        <h2 className="text-lg font-bold mb-4 text-neutral-100">Resultados</h2>
        {/* Mobile: stacked cards */}
        <div className="space-y-4 md:hidden">
          {resultados.length > 0 ? (
            resultados.map((r) => (
              <div key={r.id} className="border border-neutral-800 rounded-lg p-4 shadow-sm bg-neutral-800">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-neutral-400">Servidor</div>
                    <div className="font-medium text-neutral-100">{r.servidor}</div>
                  </div>
                  <div className="ml-4">
                    <CopyButton textToCopy={r.caminho} />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-neutral-300">
                  <div>
                    <div className="text-neutral-400">Pasta</div>
                    <div className="break-words text-neutral-200">{r.pasta}</div>
                  </div>
                  <div>
                    <div className="text-neutral-400">Palavra Chave</div>
                    <div className="break-words text-neutral-200">{r.palavraChave}</div>
                  </div>
                  <div>
                    <div className="text-neutral-400">Caminho</div>
                    <div className="break-words text-neutral-200">{r.caminho}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-neutral-400">Nenhum registro encontrado</div>
          )}
        </div>
        {/* Desktop/tablet: show table on md+ */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse border rounded-4xl border-neutral-800 text-sm">
            <thead>
              <tr className="bg-neutral-800">
                <th className="border border-neutral-800 p-2 text-neutral-100">Servidor</th>
                <th className="border border-neutral-800 p-2 text-neutral-100">Pasta</th>
                <th className="border border-neutral-800 p-2 text-neutral-100">Palavra Chave</th>
                <th className="border border-neutral-800 p-2 text-neutral-100">Caminho</th>
                <th className="border border-neutral-800 p-2 text-neutral-100">Ação</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((r) => (
                <tr key={r.id} className="hover:bg-neutral-700 transition-colors">
                  <td className="border border-neutral-800 p-2 text-neutral-200">{r.servidor}</td>
                  <td className="border border-neutral-800 p-2 text-neutral-200">{r.pasta}</td>
                  <td className="border border-neutral-800 p-2 text-neutral-200">{r.palavraChave}</td>
                  <td className="border border-neutral-800 p-2 break-words text-neutral-200">{r.caminho}</td>
                  <td className="border border-neutral-800 p-2"><CopyButton textToCopy={r.caminho} /></td>
                </tr>
              ))}
              {resultados.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-neutral-400">
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