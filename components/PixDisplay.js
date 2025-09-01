"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeGenerator } from "./QRCodeGenerator";

export const PixDisplay = ({ pixData, onPaymentConfirmed }) => {
  const [copyStatus, setCopyStatus] = useState(null);

  const copyToClipboard = async () => {
    if (pixData?.pixCode) {
      try {
        await navigator.clipboard.writeText(pixData.pixCode);
        setCopyStatus("Código copiado!");
        setTimeout(() => setCopyStatus(null), 3000);
      } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = pixData.pixCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopyStatus("Código copiado!");
        setTimeout(() => setCopyStatus(null), 3000);
      }
    }
  };

  if (!pixData) {
    return (
      <div className="text-center text-gray-500">
        <p>Dados do PIX não disponíveis</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center max-w-sm mx-auto">
      <h3 className="text-xl font-bold mb-4 text-zinc-800">
        Pagamento via Pix
      </h3>

      <p className="text-gray-600 mb-4 text-sm">
        Escaneie o QR Code com o app do seu banco ou use o código Pix copia e
        cola.
      </p>

      <div className="w-56 h-56 bg-white p-3 border-2 border-gray-200 rounded-lg shadow-md mb-4">
        <QRCodeGenerator
          data={pixData.pixCode}
          size={200}
          className="w-full h-full"
        />
      </div>

      <div className="w-full bg-gray-50 p-3 rounded-lg border-2 border-dashed border-gray-300 mb-4">
        <p className="text-xs text-gray-500 mb-2">Código PIX (Copia e Cola)</p>
        <p className="text-xs break-all font-mono text-gray-700 bg-white p-2 rounded border">
          {pixData.pixCode || "Código PIX não disponível"}
        </p>
      </div>

      <div className="w-full mb-4">
        <Button
          onClick={copyToClipboard}
          disabled={!pixData.pixCode}
          className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-400 text-sm"
        >
          {copyStatus === "Código copiado!" ? (
            <>
              <Check size={16} className="mr-2" /> Código Copiado!
            </>
          ) : (
            <>
              <Copy size={16} className="mr-2" /> Copiar Código
            </>
          )}
        </Button>
      </div>

      {copyStatus && (
        <div className="w-full p-2 bg-green-100 border border-green-300 rounded-lg mb-3">
          <p className="text-green-700 text-xs font-medium">{copyStatus}</p>
        </div>
      )}

      <div className="w-full p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-blue-800 font-medium">ID da Transação</p>
            <p className="text-blue-600 font-mono text-xs break-all">
              {pixData.transactionId}
            </p>
          </div>
          <div>
            <p className="text-blue-800 font-medium">Status</p>
            <p className="text-blue-600 font-medium">{pixData.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
