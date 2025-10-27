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
    <div className={`flex flex-col items-center justify-center min-h-full bg-gray-400`}>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-400 mt-8">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-400 p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
        >
          <h1 className="text-2xl font-bold">Cadastro de Pasta</h1>

          <input
            type="text"
            name="servidor"
            placeholder="Nome do Servidor"
            value={form.servidor}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          <input
            type="text"
            name="pasta"
            placeholder="Nome da Pasta"
            value={form.pasta}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          <textarea
            name="palavraChave"
            placeholder="Palavras-chave"
            value={form.palavraChave}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg h-24"
            required
          />

          <input
            type="text"
            name="caminho"
            placeholder="Caminho da Pasta"
            value={form.caminho}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
