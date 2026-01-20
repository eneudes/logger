import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, label = "Copiar" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar o texto:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium 
        transition-all duration-200 cursor-pointer
        ${copied ? "bg-green-600 text-white" : "bg-neutral-700 hover:bg-neutral-600 text-neutral-100"}`}
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {copied ? "Copiado!" : label}
    </button>
  );
};

export default CopyButton;
