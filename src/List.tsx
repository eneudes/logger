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
    <div className="flex flex-col items-center justify-center min-h-full bg-neutral-950">
      <Navbar />
      <div className="bg-neutral-900 p-6  shadow-lg w-full border border-neutral-800 mt-10">
        <h2 className="text-lg font-bold mb-4 text-neutral-100">
          Registros Salvos
        </h2>

        {/* Mobile: stacked cards */}
        <div className="space-y-2 md:hidden">
          {registros.length > 0 ? (
            registros.map((r) => (
              <div
                key={r.id}
                className="rounded-lg p-4 shadow-lg bg-neutral-800 border border-neutral-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-neutral-400">Servidor</div>
                    <div className="font-medium text-neutral-100">
                      {r.servidor}
                    </div>
                  </div>
                  <div className="ml-4">
                    <CopyButton textToCopy={r.caminho} />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-neutral-300">
                  <div>
                    <div className="text-neutral-400">Pasta</div>
                    <div className="break-words text-neutral-200">
                      {r.pasta}
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-400">Palavra Chave</div>
                    <div className="break-words text-neutral-200">
                      {r.palavraChave}
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-400">Caminho</div>
                    <div className="break-words text-neutral-200">
                      {r.caminho}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-neutral-400">
              Carregando Registros do banco...
            </div>
          )}
        </div>

        {/* Desktop/tablet: show table on md+ */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse border border-neutral-800 text-sm">
            <thead>
              <tr className="bg-neutral-800">
                <th className="border border-neutral-800 p-2 text-neutral-100">
                  Servidor
                </th>
                <th className="border border-neutral-800 p-2 text-neutral-100">
                  Pasta
                </th>
                <th className="border border-neutral-800 p-2 text-neutral-100">
                  Palavra Chave
                </th>
                <th className="border border-neutral-800 p-2 text-neutral-100">
                  Caminho
                </th>
                <th className="border border-neutral-800 p-2 text-neutral-100">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-neutral-700 transition-colors"
                >
                  <td className="border border-neutral-800 p-2 text-neutral-200">
                    {r.servidor}
                  </td>
                  <td className="border border-neutral-800 p-2 text-neutral-200">
                    {r.pasta}
                  </td>
                  <td className="border border-neutral-800 p-2 text-neutral-200">
                    {r.palavraChave}
                  </td>
                  <td className="border border-neutral-800 p-2 break-words text-neutral-200">
                    {r.caminho}
                  </td>
                  <td className="border border-neutral-800 p-2 flex justify-center items-center">
                    <CopyButton textToCopy={r.caminho} />
                  </td>
                </tr>
              ))}
              {registros.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-neutral-400">
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
