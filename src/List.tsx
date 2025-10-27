import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "./components/Navbar";
import CopyButton from "./components/CopyButton";

type Registro = {
  id: string;
  servidor: string;
  pasta: string;
  palavraChave: string;
  caminho: string;
};

export default function List() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  // Carregar registros do Firestore
  const carregarRegistros = async () => {
    const querySnapshot = await getDocs(collection(db, "banco"));
    const lista: Registro[] = [];
    querySnapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() } as Registro);
    });
    setRegistros(lista);
  };

  // Carrega ao iniciar
  useEffect(() => {
    carregarRegistros();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-400">
      <Navbar />

      {/* Registros: mobile cards + table for md+ */}
      <div className="bg-gray-400 p-6 rounded-2xl shadow-lg w-full max-w-5xl mt-10">
        <h2 className="text-lg font-bold mb-4">Registros Salvos</h2>

        {/* Mobile: stacked cards */}
        <div className="space-y-2 md:hidden">
          {registros.length > 0 ? (
            registros.map((r) => (
              <div key={r.id} className=" rounded-lg p-4 shadow-lg bg-gray-500">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-200">Servidor</div>
                    <div className="font-medium">{r.servidor}</div>
                  </div>
                  <div className="ml-4">
                    <CopyButton textToCopy={r.caminho} />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700">
                  <div>
                    <div className="text-gray-200">Pasta</div>
                    <div className="break-words text-gray-900">{r.pasta}</div>
                  </div>
                  <div>
                    <div className="text-gray-200">Palavra Chave</div>
                    <div className="break-words text-gray-900">{r.palavraChave}</div>
                  </div>
                  <div>
                    <div className="text-gray-200">Caminho</div>
                    <div className="break-words text-gray-900">{r.caminho}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500">Carregando Registros do banco...</div>
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
              {registros.map((r) => (
                <tr key={r.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{r.servidor}</td>
                  <td className="border border-gray-300 p-2">{r.pasta}</td>
                  <td className="border border-gray-300 p-2">{r.palavraChave}</td>
                  <td className="border border-gray-300 p-2 break-words">{r.caminho}</td>
                  <td className="border border-gray-300 p-2"><CopyButton textToCopy={r.caminho} /></td>
                </tr>
              ))}
              {registros.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    Carregando Registros do banco...
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
