import { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "./components/Navbar";

interface FormData {
  servidor: string;
  pasta: string;
  palavraChave: string;
  caminho: string;
}

export default function Create() {
  const [form, setForm] = useState<FormData>({
    servidor: "",
    pasta: "",
    palavraChave: "",
    caminho: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "banco"), form);
      alert("Dados salvos no Firestore!");
      setForm({ servidor: "", pasta: "", palavraChave: "", caminho: "" });
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-full bg-neutral-950`}>
      <Navbar />
      <div className="flex items-center  justify-center bg-neutral-950 mt-8">
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 p-6 md:rounded-2xl shadow-md w-full space-y-4 border border-neutral-800"
        >
          <h1 className="text-2xl font-bold text-neutral-100">Cadastro de Pasta</h1>

          <input
            type="text"
            name="servidor"
            placeholder="Nome do Servidor"
            value={form.servidor}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 transition-all duration-200 shadow-sm"
            required
          />

          <input
            type="text"
            name="pasta"
            placeholder="Nome da Pasta"
            value={form.pasta}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 transition-all duration-200 shadow-sm"
            required
          />

          <textarea
            name="palavraChave"
            placeholder="Palavras-chave"
            value={form.palavraChave}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg h-24 bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 transition-all duration-200 shadow-sm resize-none"
            required
          />

          <input
            type="text"
            name="caminho"
            placeholder="Caminho da Pasta"
            value={form.caminho}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 transition-all duration-200 shadow-sm"
            required
          />

          <button
            type="submit"
            className="w-full bg-neutral-700 text-neutral-100 p-3 rounded-lg hover:bg-neutral-600 active:bg-neutral-500 transition-all duration-200 font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
