"use client";

import Image from "next/image";
import Burguer from "@/public/burger-1.jpeg";
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

const Master = () => {
  const router = useRouter();

  const BASE_PRICE = 84.0; // Preço base do combo

  // Estado para gerenciar as escolhas do cliente e a quantidade do combo
  const [escolhas, setEscolhas] = useState({
    pizza: null,
    acai: {
      Morango: 0,
      "Leite Condensado": 0,
      Paçoca: 0,
      "Leite em Pó": 0,
      Nutella: 0,
    },
    refrigerante: null,
    esfihas: {
      Carne: 0,
      Queijo: 0,
      Frango: 0,
      "Frango Catupiry": 0,
      Chocolate: 0,
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

  // Funções para adicionar e remover esfihas
  const handleEsfihaChange = (sabor, tipo) => {
    setEscolhas((prev) => {
      const novaQuantidade =
        prev.esfihas[sabor] + (tipo === "adicionar" ? 1 : -1);
      if (novaQuantidade >= 0) {
        return {
          ...prev,
          esfihas: {
            ...prev.esfihas,
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
      nome: "master",
      quantidade: comboQuantity,
      valorTotal: total,
    };

    // Pega o carrinho existente do localStorage ou cria um novo
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

    // Adiciona o novo combo ao carrinho
    carrinho.push(novoCombo);

    // Salva o carrinho atualizado de volta no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(`Combo master adicionado ${comboQuantity} vez(es)!`);

    router.back();
  };

  // Dados com descrições e imagens para os produtos
  const opcoes = {
    pizza: [
      {
        sabor: "Calabresa",
        descricao: "Molho, mussarela, calabresa e orégano.",
      },
      {
        sabor: "4 Queijos",
        descricao: "Molho, mussarela, provolone, parmesão e catupiry.",
      },
      {
        sabor: "Frango",
        descricao: "Molho, mussarela, frango desfiado e catupiry.",
      },
    ],
    esfiha: [
      {
        sabor: "Carne",
        descricao: "Carne moída temperada, cebola e tomate.",
        imagem: esfirraExemplo,
      },
      {
        sabor: "Queijo",
        descricao: "Queijo mussarela derretido com orégano.",
        imagem: esfirraExemplo,
      },
      {
        sabor: "Frango",
        descricao: "Frango desfiado.",
        imagem: esfirraExemplo,
      },
      {
        sabor: "Frango Catupiry",
        descricao: "Frango desfiado com uma camada de catupiry.",
        imagem: esfirraExemplo,
      },
      {
        sabor: "Chocolate",
        descricao: "Chocolate derretido.",
        imagem: esfirraExemplo,
      },
      {
        sabor: "Nutella",
        descricao: "Nutella pura e irresistível.",
        imagem: esfirraExemplo,
      },
    ],
    refrigerante: [
      {
        sabor: "Coca-Cola",
        descricao: "2L",
      },
      {
        sabor: "Sprite",
        descricao: "1.5L",
      },
      {
        sabor: "Fanta",
        descricao: "2L",
      },
    ],
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
        sabor: "Nutella",
      },
    ],
  };

  // Calcula o total de esfihas escolhidas
  const totalEsfihas = Object.values(escolhas.esfihas).reduce(
    (sum, current) => sum + current,
    0
  );

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
            src={Burguer}
            alt="Burguer"
            layout="fill"
            objectFit="cover"
            priority
          />
          {/* Botão de Voltar */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 z-20 p-2 bg-white bg-opacity-30 backdrop-blur-sm rounded-full text-white hover:bg-opacity-50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Card de Informações */}
        <div className="relative z-10 -mt-12 p-4 bg-white rounded-t-3xl border border-border text-black">
          <div>
            <div className="w-full space-y-3">
              <h3 className="text-base font-medium leading-6 text-gray-700">
                Combo Master – A Casa Toda
              </h3>
              <p className="text-sm font-light text-gray-500 whitespace-pre-wrap">
                1 Pizza Grande (sabor à escolha), 1 Hambúrguer Artesanal, 1
                Barca de Batata Cheddar e Bacon, 2 Esfihas (sabores à escolha),
                1 Refrigerante 2L, 1 Açaí 500ml com 2 acompanhamentos grátis
              </p>
            </div>
            <div className="mt-3 md:mt-6">
              <div className="flex flex-wrap font-semibold items-center gap-2">
                <span className="text-base text-green-500">R$ 84,00</span>
                <span className="text-sm text-gray-500 line-through">
                  R$ 98,90
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Opções de Escolha */}
      <section className="space-y-4 pt-4 bg-[#f4f5f7]">
        {/* Opções de Pizza */}
        <div className="bg-white p-4 mx-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-md font-semibold text-gray-800">
                Escolha o sabor da Pizza
              </h4>
              <p className="text-sm font-light text-gray-500">
                Escolha 1 opção
              </p>
            </div>
            {/* Indicador de progresso */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-green-600">
                {isPizzaChosen ? "1/1" : "0/1"}
              </span>
              <CheckCircle
                size={20}
                className={isPizzaChosen ? "text-green-600" : "text-gray-400"}
              />
            </div>
          </div>
          <div className="flex flex-col">
            {opcoes.pizza.map((op) => (
              <button
                key={op.sabor}
                onClick={() => handleEscolha("pizza", op.sabor)}
                className={`flex justify-between items-center w-full py-4 px-2 border-b last:border-b-0 border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
                  escolhas.pizza === op.sabor ? "bg-gray-50" : ""
                }`}
              >
                <div className="text-left">
                  <h5 className="text-sm font-medium text-gray-800">
                    {op.sabor}
                  </h5>
                  <p className="text-xs text-gray-500 mt-1">{op.descricao}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    escolhas.pizza === op.sabor
                      ? "bg-green-600 border-green-600"
                      : "bg-white border-gray-400"
                  }`}
                ></div>
              </button>
            ))}
          </div>
        </div>

        {/* Opções de Hambúrguer (exemplo fixo) */}
        <div className="bg-white p-4 mx-4 rounded-xl shadow-sm">
          <h4 className="text-lg font-bold mb-4 text-gray-800">
            Hambúrguer Artesanal
          </h4>
          <p className="text-sm text-gray-500">
            O hambúrguer é fixo: blend de carne, queijo e molho especial.
          </p>
        </div>

        {/* Seção de Esfihas (Multi-escolha com + e -) */}
        <div className="bg-white p-4 mx-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-md font-semibold text-gray-800">
                Escolha os sabores das esfihas
              </h4>
              <p className="text-sm font-light text-gray-500">
                Escolha 2 opções
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-green-600">
                {totalEsfihas}/2
              </span>
              <CheckCircle
                size={20}
                className={
                  totalEsfihas === 2 ? "text-green-600" : "text-gray-400"
                }
              />
            </div>
          </div>
          <div className="flex flex-col">
            {opcoes.esfiha.map((op) => (
              <div
                key={op.sabor}
                className="flex items-center justify-between w-full py-4 px-2 border-b last:border-b-0 border-gray-200"
              >
                {/* Imagem e texto da esfiha */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={op.imagem}
                    alt={op.sabor}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-800">
                      Esfiha de {op.sabor}
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">{op.descricao}</p>
                  </div>
                </div>
                {/* Botões de + e - */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEsfihaChange(op.sabor, "remover")}
                    disabled={escolhas.esfihas[op.sabor] === 0}
                    className="text-gray-600 disabled:text-gray-300"
                  >
                    <MinusCircle size={24} />
                  </button>
                  <span className="font-semibold text-lg w-6 text-center">
                    {escolhas.esfihas[op.sabor]}
                  </span>
                  <button
                    onClick={() => handleEsfihaChange(op.sabor, "adicionar")}
                    disabled={totalEsfihas >= 2}
                    className="text-green-600 disabled:text-gray-300"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opções de Refrigerante */}
        <div className="bg-white p-4 mx-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-md font-semibold text-gray-800">
                Escolha o Refrigerante
              </h4>
              <p className="text-sm font-light text-gray-500">
                Escolha 1 opção
              </p>
            </div>
            {/* Indicador de progresso */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-green-600">
                {isRefrigeranteChosen ? "1/1" : "0/1"}
              </span>
              <CheckCircle
                size={20}
                className={
                  isRefrigeranteChosen ? "text-green-600" : "text-gray-400"
                }
              />
            </div>
          </div>
          <div className="flex flex-col">
            {opcoes.refrigerante.map((op) => (
              <button
                key={op.sabor}
                onClick={() => handleEscolha("refrigerante", op.sabor)}
                className={`flex justify-between items-center w-full py-4 px-2 border-b last:border-b-0 border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
                  escolhas.refrigerante === op.sabor ? "bg-gray-50" : ""
                }`}
              >
                <div className="text-left">
                  <h5 className="text-sm font-medium text-gray-800">
                    {op.sabor}
                  </h5>
                  <p className="text-xs text-gray-500 mt-1">{op.descricao}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    escolhas.refrigerante === op.sabor
                      ? "bg-green-600 border-green-600"
                      : "bg-white border-gray-400"
                  }`}
                ></div>
              </button>
            ))}
          </div>
        </div>

        {/* Opções de Açaí */}
        <div className="bg-white p-4 mx-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-md font-semibold text-gray-800">
                Escolha os adicionais do Açaí
              </h4>
              <p className="text-sm font-light text-gray-500">
                Escolha 2 opções
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-green-600">
                {totalAcai}/2
              </span>
              <CheckCircle
                size={20}
                className={totalAcai === 2 ? "text-green-600" : "text-gray-400"}
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
                    disabled={totalAcai >= 2}
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

export default Master;
