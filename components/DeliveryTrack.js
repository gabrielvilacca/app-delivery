"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  CircleDot,
  Truck,
  ChefHat,
  CreditCard,
  Package,
} from "lucide-react";

export const DeliveryTrack = () => {
  const [step, setStep] = useState(0);
  const deliveryStages = [
    { text: "Pedido Feito", icon: <Package size={20} /> },
    { text: "Pagamento Confirmado", icon: <CreditCard size={20} /> },
    { text: "Na Cozinha", icon: <ChefHat size={20} /> },
    { text: "A caminho da entrega", icon: <Truck size={20} /> },
    { text: "Entregue", icon: <CheckCircle size={20} /> },
  ];

  useEffect(() => {
    // Simula o progresso da entrega
    if (step < deliveryStages.length - 1) {
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 5000); // Avança uma etapa a cada 5 segundos
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-zinc-50 min-h-screen font-sans">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-zinc-800">
          Status da sua Entrega
        </h2>

        {/* Linha do Tempo do Rastreamento - Vertical */}
        <div className="relative flex flex-col items-start w-full mb-12">
          {/* Linha de progresso vertical */}
          <div className="absolute top-0 left-6 w-1 h-full bg-gray-200 -z-10">
            <div
              className="w-1 bg-yellow-500 rounded-full transition-all duration-1000 ease-in-out"
              style={{
                height: `${(step / (deliveryStages.length - 1)) * 100}%`,
              }}
            ></div>
          </div>

          {/* Etapas */}
          {deliveryStages.map((stage, index) => (
            <div key={index} className="flex items-center mb-8 last:mb-0 z-10">
              <div
                className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-500 mr-4
                  ${
                    index < step
                      ? "bg-green-500 text-white" // Etapa concluída
                      : index === 3 && step >= 3 // Condição para a etapa 'A caminho da entrega'
                      ? "bg-yellow-500 text-black shadow-lg animate-pulse" // Etapa de entrega em andamento
                      : index === step
                      ? "bg-yellow-500 text-black shadow-lg" // Outras etapas atuais
                      : "bg-gray-300 text-gray-500" // Etapa futura
                  }`}
              >
                {index < step ? (
                  <CheckCircle size={20} />
                ) : index === 3 && step >= 3 ? (
                  <Truck size={20} className="animate-bounce" /> // Animação de caminhão apenas na etapa de entrega
                ) : (
                  stage.icon
                )}
              </div>
              <p
                className={`text-sm font-semibold 
                  ${
                    index === step ? "text-zinc-800 font-bold" : "text-gray-500"
                  }`}
              >
                {stage.text}
              </p>
            </div>
          ))}
        </div>

        {/* Status Atual */}
        <div className="text-center mt-8 p-4 border rounded-lg bg-gray-50 border-gray-200">
          <p className="text-xl font-bold text-zinc-800">Status Atual:</p>
          <p className="text-2xl font-bold text-yellow-500 animate-pulse mt-2">
            {deliveryStages[step].text}
          </p>
        </div>
      </div>
    </div>
  );
};
