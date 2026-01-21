import { useState } from "react";
import { Menu, X } from "lucide-react";
import imgLoger from "../assets/logger.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-neutral-900 shadow-md  p-4 mb-1">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-neutral-100">
          <img
            src={imgLoger}  
            alt="Logo"
            className="w-8 h-8 mr-2 inline-block"
          />
          Logger
        </div>

        <div className="hidden md:flex space-x-4">
          <a
            href="/"
            className="text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            Buscar
          </a>
          <a
            href="/list"
            className="text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            Lista
          </a>
          <a
            href="/create"
            className="text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            Novo
          </a>
        </div>

        <div className="md:hidden bg-neutral-900">
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded border-0 shadow-md bg-neutral-900 text-neutral-300"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 md:hidden flex flex-col space-y-2 border-t-neutral-700 border-t-1">
          <a
            href="/"
            className="text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            Buscar
          </a>
          <a
            href="/list"
            className="text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            Lista
          </a>
          <a
            href="/create"
            className="text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            Novo
          </a>
        </div>
      )}
    </nav>
  );
}
