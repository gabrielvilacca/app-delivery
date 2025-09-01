"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";
import { Card } from "./ui/card";

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
    preco: 7.0,
    imagem: FantaLitro,
  },
  {
    id: "fantalata",
    nome: "Fanta 350ml",
    descricao: "Lata 350l",
    preco: 4.0,
    imagem: FantaLata,
  },
  {
    id: "fantauva",
    nome: "Fanta Uva 350ml",
    descricao: "Lata 350ml",
    preco: 4.0,
    imagem: FantaUvaLata,
  },
  {
    id: "guaranalitro",
    nome: "Guaraná Original 2l",
    descricao: "Garrafa 2l",
    preco: 7.0,
    imagem: GuaranaLitro,
  },
  {
    id: "guaranalata",
    nome: "Guaraná Original 350ml",
    descricao: "Lata 350ml",
    preco: 4.0,
    imagem: GuaranaLata,
  },
  {
    id: "pepsilitro",
    nome: "Pepsi Original 2l",
    descricao: "Garrafa 2l",
    preco: 7.0,
    imagem: PepsiLitro,
  },
  {
    id: "pepsizerolitro",
    nome: "Pepsi Zero 2l",
    descricao: "Garrafa 2l",
    preco: 7.0,
    imagem: PepsiZeroLitro,
  },
  {
    id: "pepsilata",
    nome: "Pepsi Original 350ml",
    descricao: "Lata 350ml",
    preco: 4.0,
    imagem: PepsiLata,
  },
  {
    id: "spritelitro",
    nome: "Sprite Original 2l",
    descricao: "Garrafa 2l",
    preco: 7.0,
    imagem: SpriteLitro,
  },
];

export const Bebidas = ({ carrinho, onUpdateCarrinho }) => {
  const handleQuantityChange = (id, tipo) => {
    const novaQuantidade =
      (carrinho.find((item) => item.id === id)?.quantidade || 0) +
      (tipo === "adicionar" ? 1 : -1);

    if (novaQuantidade < 0) return;

    const novaLista = [...carrinho];
    const itemIndex = novaLista.findIndex((item) => item.id === id);
    const bebida = bebidas.find((b) => b.id === id);

    if (novaQuantidade === 0) {
      if (itemIndex !== -1) {
        novaLista.splice(itemIndex, 1);
      }
    } else {
      const novoItem = {
        id: bebida.id,
        nome: bebida.nome,
        quantidade: novaQuantidade,
        valorTotal: (bebida.preco * novaQuantidade).toFixed(2),
      };

      if (itemIndex !== -1) {
        novaLista[itemIndex] = novoItem;
      } else {
        novaLista.push(novoItem);
      }
    }

    // Agora, em vez de salvar no localStorage, chamamos a função do componente pai
    onUpdateCarrinho(novaLista);
  };

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
                  disabled={!carrinho.find((item) => item.id === bebida.id)}
                  className="text-gray-600 disabled:text-gray-300"
                >
                  <MinusCircle size={24} />
                </button>
                <span className="font-bold text-lg w-6 text-center">
                  {carrinho.find((item) => item.id === bebida.id)?.quantidade ||
                    0}
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
    </div>
  );
};

export default Bebidas;
