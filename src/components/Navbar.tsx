import { useState } from "react";
import {Menu, X} from "lucide-react"
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-amber-400 shadow-md  p-4 mb-1">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">Logger</div>

        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-gray-900 hover:text-amber-600">Buscar</a>
          <a href="/list" className="text-gray-900 hover:text-amber-600">Lista</a>
          <a href="/create" className="text-gray-900 hover:text-amber-600">Novo</a>
        </div>

        <div className="md:hidden bg-amber-400">
          <button onClick={() => setOpen((v) => !v)} className="p-2 rounded border-0 shadow-md bg-amber-400"> 
            {open ? <X/> : <Menu/> }  
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 md:hidden flex flex-col space-y-2 border-t-gray-900 border-t-1">
          <a href="/" className="text-gray-900 hover:text-amber-600" >Buscar</a>
          <a href="/list" className="text-gray-900 hover:text-amber-600">Lista</a>
          <a href="/create" className="text-gray-900 hover:text-amber-600">Novo</a>
        </div>
      )}
    </nav>
  );
}
