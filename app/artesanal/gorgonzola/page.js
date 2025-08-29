"use client";

import Image from "next/image";
import Gorgonzola from "@/public/artesanal/gorgonzola.png";
import { X, CheckCircle, PlusCircle, MinusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import esfirraExemplo from "@/public/esfirra-exemplo.jpg"; // Mantendo a importação, caso precise no futuro

// Componente reutilizável para opções de escolha com contador
const QuantityChoices = ({
  title,
  subtitle,
  options,
  selectedItems,
  onQuantityChange,
  maxItems,
}) => {
  const totalChosen = Object.values(selectedItems).reduce(
    (sum, current) => sum + current,
    0
  );

  return (
    <div className="bg-white p-4 mx-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-md font-semibold text-gray-800">{title}</h4>
          <p className="text-sm font-light text-gray-500">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-green-600">
            {totalChosen}/{maxItems}
          </span>
          <CheckCircle
            size={20}
            className={
              totalChosen === maxItems ? "text-green-600" : "text-gray-400"
            }
          />
        </div>
      </div>
      <div className="flex flex-col">
        {options.map((op) => (
          <div
            key={op.sabor}
            className="flex items-center justify-between w-full py-4 px-2 border-b last:border-b-0 border-gray-200"
          >
            <div className="flex items-center space-x-4">
              {op.imagem && (
                <Image
                  src={op.imagem}
                  alt={op.sabor}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h5 className="text-sm font-medium text-gray-800">
                  {op.sabor}
                </h5>
                {op.descricao && (
                  <p className="text-xs text-gray-500 mt-1">{op.descricao}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onQuantityChange(op.sabor, "remover")}
                disabled={selectedItems[op.sabor] === 0}
                className="text-gray-600 disabled:text-gray-300"
              >
                <MinusCircle size={24} />
              </button>
              <span className="font-semibold text-lg w-6 text-center">
                {selectedItems[op.sabor]}
              </span>
              <button
                onClick={() => onQuantityChange(op.sabor, "adicionar")}
                disabled={totalChosen >= maxItems}
                className="text-green-600 disabled:text-gray-300"
              >
                <PlusCircle size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GorgonzolaArte = () => {
  const router = useRouter();

  const BASE_PRICE = 21.9; // Preço base do combo

  // Estado para gerenciar as escolhas do cliente
  const [escolhas, setEscolhas] = useState({
    adicionais: {
      "Cebola Caramelizada": 0,
      "Queijo Provolone": 0,
      Hambúrguer: 0,
      "Alface e Tomate": 0,
      Catupiry: 0,
      Bacon: 0,
    },
    refrigerantes: {
      "Coca-Cola": 0,
      "Coca-Cola Zero": 0,
      Sprite: 0,
      Pepsi: 0,
      "Fanta Laranja": 0,
      "Guaraná Antártica": 0,
    },
  });

  const [comboQuantity, setComboQuantity] = useState(1);

  // Função para atualizar as escolhas de múltiplos itens (adicionais e refrigerante)
  const handleMultiChoiceChange = (category, sabor, tipo) => {
    setEscolhas((prev) => {
      const novaQuantidade =
        prev[category][sabor] + (tipo === "adicionar" ? 1 : -1);
      if (novaQuantidade >= 0) {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [sabor]: novaQuantidade,
          },
        };
      }
      return prev;
    });
  };

  // Funções para adicionar e remover a quantidade do combo
  const handleQuantityChange = (tipo) => {
    setComboQuantity((prev) => {
      if (tipo === "adicionar") {
        return prev + 1;
      } else {
        return Math.max(1, prev - 1);
      }
    });
  };

  // Função para adicionar o combo ao "carrinho"
  const handleAddToCart = () => {
    const total = BASE_PRICE * comboQuantity;

    const novoCombo = {
      nome: "Gorgonzola",
      quantidade: comboQuantity,
      valorTotal: total,
      opcoes: escolhas, // Armazena as escolhas de adicionai e refri
    };

    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinho.push(novoCombo);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(`Combo adicionado ${comboQuantity} vez(es)!`);

    router.back();
  };

  // Dados com descrições e imagens para os produtos
  const opcoes = {
    adicionais: [
      {
        sabor: "Cebola Caramelizada",
      },
      {
        sabor: "Queijo Provolone",
      },
      {
        sabor: "Hambúrguer",
      },
      {
        sabor: "Alface e Tomate",
      },
      {
        sabor: "Catupiry",
      },
      {
        sabor: "Bacon",
      },
    ],
    refrigerantes: [
      {
        sabor: "Coca-Cola",
        descricao: "2L",
      },
      {
        sabor: "Sprite",
        descricao: "1.5L",
      },
      {
        sabor: "Fanta Laranja",
        descricao: "2L",
      },
      {
        sabor: "Guaraná Antártica",
        descricao: "2L",
      },
      {
        sabor: "Pepsi",
        descricao: "2L",
      },
      {
        sabor: "Coca-Cola Zero",
        descricao: "2L",
      },
    ],
  };

  const totalValue = (BASE_PRICE * comboQuantity).toFixed(2).replace(".", ",");

  return (
    <main className="bg-[#f4f5f7]">
      <section className="relative w-full font-sans">
        {/* Container do Banner */}
        <div className="relative w-full h-[300px] md:h-[250px] overflow-hidden">
          <Image
            src={Gorgonzola}
            alt="Gorgonzola"
            layout="fill"
            objectFit="cover"
            priority
          />
          {/* Botão de Voltar */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 z-20 p-2 bg-white bg-opacity-30 backdrop-blur-sm rounded-full text-gray-800 hover:bg-opacity-50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Card de Informações */}
        <div className="relative z-10 -mt-12 p-4 bg-white rounded-t-3xl border border-border text-black">
          <div>
            <div className="w-full space-y-3">
              <h3 className="text-base font-medium leading-6 text-gray-700">
                Rafa's Gorgonzola Melt
              </h3>
              <p className="text-sm font-light text-gray-500 whitespace-pre-wrap">
                Hambúrguer suculento envolvido por uma generosa camada de creme
                de gorgonzola com pedacinhos do autêntico queijo azul. Tudo isso
                no pão brioche leve e dourado, pra quem ama sabor com
                personalidade.
              </p>
            </div>
            <div className="mt-3 md:mt-6">
              <div className="flex flex-wrap font-semibold items-center gap-2">
                <span className="text-base text-green-500">R$ 21,90</span>
                <span className="text-sm text-gray-500 line-through">
                  R$ 38,90
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Opções de Escolha */}
      <section className="space-y-4 pt-4 bg-[#f4f5f7]">
        {/* Usando o componente para a escolha das adicionais (até 4) */}
        <QuantityChoices
          title="Escolha os adicionais"
          subtitle="Escolha 2 opções"
          options={opcoes.adicionais}
          selectedItems={escolhas.adicionais}
          onQuantityChange={(sabor, tipo) =>
            handleMultiChoiceChange("adicionais", sabor, tipo)
          }
          maxItems={2}
        />

        {/* Usando o componente para a escolha dos Refrigerantes (até 2) */}
        <QuantityChoices
          title="Escolha os Refrigerantes"
          subtitle="Escolha 2 opções"
          options={opcoes.refrigerantes}
          selectedItems={escolhas.refrigerantes}
          onQuantityChange={(sabor, tipo) =>
            handleMultiChoiceChange("refrigerantes", sabor, tipo)
          }
          maxItems={1}
        />
      </section>

      {/* Botão de Adicionar à Sacola */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t flex items-center justify-between space-x-4 border-gray-200 shadow-md">
        {/* Contador de Quantidade */}
        <div className="flex-shrink-0 flex items-center justify-between border border-gray-300 rounded-lg px-2 py-1 space-x-4">
          <button
            onClick={() => handleQuantityChange("remover")}
            className="text-gray-600 disabled:text-gray-300"
            disabled={comboQuantity === 1}
          >
            <MinusCircle size={24} />
          </button>
          <span className="font-bold text-lg">{comboQuantity}</span>
          <button
            onClick={() => handleQuantityChange("adicionar")}
            className="text-green-600"
          >
            <PlusCircle size={24} />
          </button>
        </div>
        {/* Botão de Adicionar à Sacola com Preço */}
        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center w-full py-4 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
        >
          <span className="font-bold text-xl">Adicionar</span>
          <span className="ml-2 font-bold text-xl">R${totalValue}</span>
        </button>
      </div>
    </main>
  );
};

export default GorgonzolaArte;
