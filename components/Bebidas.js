"use client";

import Image from "next/image";
import { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

// NOTE: Substitua os caminhos de importação das imagens pelos seus próprios.
import CocaLitro from "@/public/bebidas/coca-litro.jpg";
import CocaZeroLitro from "@/public/bebidas/coca-zero-litro.jpeg";
import CocaLata from "@/public/bebidas/coca-lata.jpg";
import CocaZeroLata from "@/public/bebidas/coca-zero-lata.jpg";
import FantaLitro from "@/public/bebidas/fanta-litro.jpeg";
import FantaLata from "@/public/bebidas/fanta-lata.png";
import FantaUvaLata from "@/public/bebidas/fanta-uva-lata.png";
import GuaranaLitro from "@/public/bebidas/guarana-litro.jpg";
import GuaranaLata from "@/public/bebidas/guarana-lata.jpeg";
import PepsiLitro from "@/public/bebidas/pepsi-litro.jpeg";
import PepsiZeroLitro from "@/public/bebidas/pepsi-zero-litro.jpg";
import PepsiLata from "@/public/bebidas/pepsi-lata.jpg";
import SpriteLitro from "@/public/bebidas/sprite-litro.jpg";
import { Card } from "./ui/card";

// Array de dados com as informações das bebidas
const bebidas = [
  {
    id: "cocalitro",
    nome: "Coca-Cola Original 2l",
    descricao: "Garrafa 2l",
    preco: 12.0,
    imagem: CocaLitro,
  },
  {
    id: "cocazerolitro",
    nome: "Coca-Cola Zero 2l",
    descricao: "Garrafa 2l",
    preco: 12.0,
    imagem: CocaZeroLitro,
  },
  {
    id: "cocalata",
    nome: "Coca-Cola Lata 350ml",
    descricao: "Lata 350ml",
    preco: 7.0,
    imagem: CocaLata,
  },
  {
    id: "cocazerolata",
    nome: "Coca-Cola Zero 350ml",
    descricao: "Lata 350ml",
    preco: 7.0,
    imagem: CocaZeroLata,
  },
  {
    id: "fantalitro",
    nome: "Fanta Original 2l",
    descricao: "Garrafa 2l",
    preco: 10.0,
    imagem: FantaLitro,
  },
  {
    id: "fantalata",
    nome: "Fanta Zero 350ml",
    descricao: "Lata 350l",
    preco: 7.0,
    imagem: FantaLata,
  },
  {
    id: "fantauva",
    nome: "Fanta Uva 350ml",
    descricao: "Lata 350ml",
    preco: 7.0,
    imagem: FantaUvaLata,
  },
  {
    id: "guaranalitro",
    nome: "Guaraná Original 2l",
    descricao: "Garrafa 2l",
    preco: 10.0,
    imagem: GuaranaLitro,
  },
  {
    id: "guaranalata",
    nome: "Guaraná Original 350ml",
    descricao: "Lata 350ml",
    preco: 7.0,
    imagem: GuaranaLata,
  },
  {
    id: "pepsilitro",
    nome: "Pepsi Original 2l",
    descricao: "Garrafa 2l",
    preco: 10.0,
    imagem: PepsiLitro,
  },
  {
    id: "pepsizerolitro",
    nome: "Pepsi Zero 2l",
    descricao: "Garrafa 2l",
    preco: 10.0,
    imagem: PepsiZeroLitro,
  },
  {
    id: "pepsilata",
    nome: "Pepsi Original 350ml",
    descricao: "Lata 350ml",
    preco: 7.0,
    imagem: PepsiLata,
  },
  {
    id: "spritelitro",
    nome: "Sprite Original 2l",
    descricao: "Garrafa 2l",
    preco: 10.0,
    imagem: SpriteLitro,
  },
];

const Bebidas = () => {
  // Estado para armazenar as quantidades de cada bebida
  const [quantidades, setQuantidades] = useState({});

  // Função para adicionar ou remover itens
  const handleQuantityChange = (id, tipo) => {
    setQuantidades((prev) => {
      const novaQuantidade = (prev[id] || 0) + (tipo === "adicionar" ? 1 : -1);
      if (novaQuantidade >= 0) {
        return {
          ...prev,
          [id]: novaQuantidade,
        };
      }
      return prev;
    });
  };

  // Função para adicionar os itens ao carrinho e salvar no localStorage
  const handleAddToCart = () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

    // Adiciona cada item com quantidade maior que zero ao carrinho
    Object.keys(quantidades).forEach((id) => {
      const quantidade = quantidades[id];
      if (quantidade > 0) {
        const bebida = bebidas.find((b) => b.id === id);
        const itemCarrinho = {
          id: bebida.id,
          nome: bebida.nome,
          quantidade: quantidade,
          valorTotal: (bebida.preco * quantidade).toFixed(2),
        };
        carrinho.push(itemCarrinho);
      }
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Bebidas adicionadas ao carrinho!");

    // Limpar o estado após adicionar ao carrinho
    setQuantidades({});
  };

  // Calcula o valor total dos itens selecionados
  const totalValue = Object.keys(quantidades)
    .reduce((total, id) => {
      const quantidade = quantidades[id];
      const bebida = bebidas.find((b) => b.id === id);
      return total + bebida.preco * quantidade;
    }, 0)
    .toFixed(2)
    .replace(".", ",");

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {bebidas.map((bebida) => (
          <Card
            className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer"
            key={bebida.id}
          >
            <div className="flex flex-col justify-between flex-1 p-2">
              <div className="space-y-2">
                <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                  {bebida.nome}
                </h3>
                <p className="text-sm font-normal text-gray-500 line-clamp-3">
                  {bebida.descricao}
                </p>
              </div>
              <div className="mt-3 md:mt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-bold text-green-700">
                    R$ {bebida.preco.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-1 ml-4 flex flex-col items-center justify-between">
              <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                <Image
                  src={bebida.imagem}
                  alt={bebida.nome}
                  className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                />
              </div>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <button
                  onClick={() => handleQuantityChange(bebida.id, "remover")}
                  disabled={
                    quantidades[bebida.id] === 0 || !quantidades[bebida.id]
                  }
                  className="text-gray-600 disabled:text-gray-300"
                >
                  <MinusCircle size={24} />
                </button>
                <span className="font-bold text-lg w-6 text-center">
                  {quantidades[bebida.id] || 0}
                </span>
                <button
                  onClick={() => handleQuantityChange(bebida.id, "adicionar")}
                  className="text-green-600"
                >
                  <PlusCircle size={24} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="sticky my-4 p-4 bg-white border-t flex items-center justify-between space-x-4 border-gray-200 shadow-md">
        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center w-full py-4 text-white bg-green-400 rounded-lg hover:bg-green-500 transition-colors"
        >
          <span className="font-bold text-xl">Adicionar ao Carrinho</span>
          <span className="ml-2 font-bold text-xl">R${totalValue}</span>
        </button>
      </div>
    </div>
  );
};

export default Bebidas;
