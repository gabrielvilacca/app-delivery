"use client";

import Image from "next/image";
import Medio from "@/public/sorvetes/pequeno-medio.jpeg";
import {
  X,
  ShoppingBag,
  CheckCircle,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import esfirraExemplo from "@/public/esfirra-exemplo.jpg";

const MedioAcai = () => {
  const router = useRouter();

  const BASE_PRICE = 16.9; // Preço base do combo

  // Estado para gerenciar as escolhas do cliente e a quantidade do combo
  const [escolhas, setEscolhas] = useState({
    acai: {
      Morango: 0,
      Banana: 0,
      kiwi: 0,
      Granola: 0,
      Amendoim: 0,
      Ovolmatine: 0,
      "Calda de Chocolate": 0,
      "Gotas de Chocolate": 0,
      "Balas Fini": 0,
      Marshmallow: 0,
      "Leite Condensado": 0,
      Paçoca: 0,
      "Leite em Pó": 0,
      Nutella: 0,
    },
  });

  const [comboQuantity, setComboQuantity] = useState(1);

  // Função para atualizar as escolhas de pizza, refri, etc
  const handleEscolha = (item, valor) => {
    setEscolhas((prev) => ({ ...prev, [item]: valor }));
  };

  // Função para atualizar as escolhas de açaí (multi-escolha)
  const handleAcaiChange = (sabor, tipo) => {
    setEscolhas((prev) => {
      const novaQuantidade = prev.acai[sabor] + (tipo === "adicionar" ? 1 : -1);
      if (novaQuantidade >= 0) {
        return {
          ...prev,
          acai: {
            ...prev.acai,
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
        return Math.max(1, prev - 1); // Garante que a quantidade não seja menor que 1
      }
    });
  };

  // Função para adicionar o combo ao "carrinho"
  const handleAddToCart = () => {
    const total = BASE_PRICE * comboQuantity;

    // Cria um objeto para o combo atual
    const novoCombo = {
      nome: "Açai 300ml",
      quantidade: comboQuantity,
      valorTotal: total,
    };

    // Pega o carrinho existente do localStorage ou cria um novo
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

    // Adiciona o novo combo ao carrinho
    carrinho.push(novoCombo);

    // Salva o carrinho atualizado de volta no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(`Combo Medio adicionado ${comboQuantity} vez(es)!`);

    router.back();
  };

  // Dados com descrições e imagens para os produtos
  const opcoes = {
    acai: [
      {
        sabor: "Morango",
      },
      {
        sabor: "Leite em Pó",
      },
      {
        sabor: "Paçoca",
      },
      {
        sabor: "Leite Condensado",
      },
      {
        sabor: "Banana",
      },
      {
        sabor: "Ovolmatine",
      },
      {
        sabor: "Amendoim",
      },
      {
        sabor: "Granola",
      },

      {
        sabor: "kiwi",
      },

      {
        sabor: "Marshmallow",
      },
      {
        sabor: "Balas Fini",
      },
      {
        sabor: "Gotas de Chocolate",
      },
      {
        sabor: "Calda de Chocolate",
      },
    ],
  };

  // Calcula o total de açai escolhidas
  const totalAcai = Object.values(escolhas.acai).reduce(
    (sum, current) => sum + current,
    0
  );

  // Verifica se a pizza foi escolhida para o ícone de check
  const isPizzaChosen = !!escolhas.pizza;

  const isRefrigeranteChosen = !!escolhas.refrigerante;

  // Valor total a ser exibido no botão
  const totalValue = (BASE_PRICE * comboQuantity).toFixed(2).replace(".", ",");

  return (
    <main className="bg-[#f4f5f7]">
      <section className="relative w-full font-sans">
        {/* Container do Banner */}
        <div className="relative w-full h-[300px] md:h-[250px] overflow-hidden">
          <Image
            src={Medio}
            alt="Medio"
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
                Açai 500ml
              </h3>
              <p className="text-sm font-light text-gray-500 whitespace-pre-wrap">
                Nosso tamanho mais pedido! A porção ideal para matar a fome com
                muito sabor, super cremoso e com adicionais grátis 🍌🍫🥜 pra
                você montar a combinação perfeita.
              </p>
            </div>
            <div className="mt-3 md:mt-6">
              <div className="flex flex-wrap font-semibold items-center gap-2">
                <span className="text-base text-green-500">R$ 16,90</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Opções de Escolha */}
      <section className="space-y-4 pt-4 bg-[#f4f5f7]">
        {/* Opções de Açaí */}
        <div className="bg-white p-4 mx-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-md font-semibold text-gray-800">
                Escolha os adicionais do Açaí
              </h4>
              <p className="text-sm font-light text-gray-500">
                Escolha 6 opções
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-green-600">
                {totalAcai}/13
              </span>
              <CheckCircle
                size={20}
                className={totalAcai === 6 ? "text-green-600" : "text-gray-400"}
              />
            </div>
          </div>
          <div className="flex flex-col">
            {opcoes.acai.map((op) => (
              <div
                key={op.sabor}
                className="flex items-center justify-between w-full py-4 px-2 border-b last:border-b-0 border-gray-200"
              >
                {/* Imagem e texto da acai */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-800">
                      {op.sabor}
                    </h5>
                  </div>
                </div>
                {/* Botões de + e - */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAcaiChange(op.sabor, "remover")}
                    disabled={escolhas.acai[op.sabor] === 0}
                    className="text-gray-600 disabled:text-gray-300"
                  >
                    <MinusCircle size={24} />
                  </button>
                  <span className="font-semibold text-lg w-6 text-center">
                    {escolhas.acai[op.sabor]}
                  </span>
                  <button
                    onClick={() => handleAcaiChange(op.sabor, "adicionar")}
                    disabled={totalAcai >= 6}
                    className="text-green-600 disabled:text-gray-300"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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

export default MedioAcai;
