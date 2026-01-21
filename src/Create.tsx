import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "./components/Navbar";
import { Check, AlertCircle } from "lucide-react";

interface FormData {
  servidor: string;
  pasta: string;
  palavraChave: string;
  caminho: string;
}

export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    servidor: "",
    pasta: "",
    palavraChave: "",
    caminho: "",
  });

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
    visible: boolean;
  }>({
    type: "success",
    message: "",
    visible: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addDoc(collection(db, "banco"), form);
      
      setNotification({
        type: "success",
        message: "✓ Dados salvos com sucesso!",
        visible: true,
      });

      setForm({ servidor: "", pasta: "", palavraChave: "", caminho: "" });

      setTimeout(() => {
        navigate("/list");
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setNotification({
        type: "error",
        message: "✗ Erro ao salvar dados. Tente novamente.",
        visible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, visible: false });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-full bg-neutral-950`}>
      <Navbar />

      {notification.visible && (
        <div
          className={`fixed top-4 right-4 flex items-center gap-3 px-6 py-4 rounded-lg font-medium shadow-lg transition-all duration-300 ease-in-out transform ${
            notification.visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-96"
          } ${
            notification.type === "success"
              ? "bg-emerald-900 text-emerald-100 border border-emerald-700"
              : "bg-red-900 text-red-100 border border-red-700"
          }`}
        >
          {notification.type === "success" ? (
            <Check size={20} className="flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="flex-shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="flex items-center justify-center bg-neutral-950 mt-8">
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
            disabled={isLoading}
            className="w-full bg-neutral-700 text-neutral-100 p-3 rounded-lg hover:bg-neutral-600 active:bg-neutral-500 transition-all duration-200 font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
}
