"use client";

import { useEffect, useRef } from "react";

export const QRCodeGenerator = ({ data, size = 200, className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const generateQRCode = async () => {
      try {
        // Usar a API do QR Code do navegador se disponível
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
          data
        )}`;

        // Criar uma imagem para verificar se carregou
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          // Configurar canvas
          canvas.width = size;
          canvas.height = size;

          // Desenhar a imagem do QR Code
          ctx.drawImage(img, 0, 0, size, size);
        };

        img.onerror = () => {
          // Fallback: criar QR Code simples com texto
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          canvas.width = size;
          canvas.height = size;

          // Fundo branco
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, size, size);

          // Borda
          ctx.strokeStyle = "#000";
          ctx.lineWidth = Math.max(1, size * 0.01);
          ctx.strokeRect(size * 0.05, size * 0.05, size * 0.9, size * 0.9);

          // Texto central
          ctx.fillStyle = "#000";
          ctx.font = `${Math.max(8, size * 0.04)}px Arial`;
          ctx.textAlign = "center";
          ctx.fillText("QR Code PIX", size / 2, size / 2 - size * 0.04);
          ctx.fillText("Disponível", size / 2, size / 2 + size * 0.04);
        };

        img.src = qrCodeUrl;
      } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
      }
    };

    generateQRCode();
  }, [data, size]);

  if (!data) {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <p className="text-gray-500 text-center text-xs">
          QR Code
          <br />
          não disponível
        </p>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
};
