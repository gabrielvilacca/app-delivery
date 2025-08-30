"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import Combo from "@/public/exemplo-combo.jpeg";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "@/components/CartSheet";
import Coments from "@/components/Coments";
import Chespy from "@/public/artesanal/chespy-bacon.png";
import TripleBacon from "@/public/artesanal/triple-bacon.png";
import Salada from "@/public/artesanal/salada.png";
import DoubleBacon from "@/public/artesanal/double-bacon.png";
import Cheddar from "@/public/artesanal/cheddar.png";
import Barca from "@/public/artesanal/barca.jpeg";
import Gorgonzola from "@/public/artesanal/gorgonzola.png";
import Picanha from "@/public/artesanal/picanha.png";
import Brigadeiro from "@/public/artesanal/brigadeiro.png";
import ModaCasa from "@/public/artesanal/moda-casa.png";
import Chicken from "@/public/artesanal/chicken.jpeg";
import MiniBurgers from "@/public/combos/mini-burgers.jpeg";
import DoubleCheeseburger from "@/public/combos/double-cheeseburger.jpeg";
import DuploBurger from "@/public/combos/duploBurger.jpeg";
import DoubleChicken from "@/public/combos/double-chicken.jpeg";
import BatataFrita from "@/public/combos/BatataFrita.jpeg";
import Monstro from "@/public/mais-vendidos/monstro.jpeg";
import BaconSalad from "@/public/mais-vendidos/BaconSalad.jpeg";
import Power from "@/public/mais-vendidos/power.jpeg";
import FritasOverloaded from "@/public/mais-vendidos/fritas-overloaded.jpeg";
import CaixinhaBurger from "@/public/super-combos/caixinha-burger.jpeg";
import PequenoMedio from "@/public/sorvetes/pequeno-medio.jpeg";
import Grande from "@/public/sorvetes/grande.jpeg";
import BarcaAcai from "@/public/sorvetes/barca.jpeg";
import Familia from "@/public/promocao/familia.jpeg";
import Festa from "@/public/promocao/festa.jpeg";
import Bebidas from "@/components/Bebidas";

export default function Home() {
  const [cartSummary, setCartSummary] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Lê o localStorage quando o componente é montado
  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

    let totalQuantidade = 0;
    let totalValor = 0;

    carrinho.forEach((item) => {
      totalQuantidade += item.quantidade;
      // CONVERSÃO DE STRING PARA NÚMERO
      totalValor += parseFloat(item.valorTotal);
    });

    if (totalQuantidade > 0) {
      const summary = {
        count: totalQuantidade,
        totalPrice: totalValor.toFixed(2).replace(".", ","),
      };
      setCartSummary(summary);
    } else {
      setCartSummary(null);
    }
  }, []);

  // Função para lidar com a navegação na página
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Usa scrollIntoView para rolar suavemente até o elemento
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#f4f5f7]">
      <Hero />
      <div className="flex flex-col p-4 gap-4">
        <div className="flex flex-col p-3 bg-black/90 text-white border border-gray-700 space-y-3 rounded-md animate-shadow-pulse">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="p-2 rounded-full bg-yellow-400 shadow-lg text-black shadow-yellow-500/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
              </div>
            </div>
            <span className="text-lg font-medium">Promoção de Aniversário</span>
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <span className="text-md">
              <span className="font-medium">55% de desconto</span> em qualquer
              combo ou lanche!
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-between items-center h-12 p-2 bg-white w-full rounded border border-border hover:bg-slate-100 duration-200">
            <span className="font-semibold text-zinc-600 text-sm">
              Lista de categorias{" "}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-zinc-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full text-lg font-semibold">
            <DropdownMenuItem onClick={() => handleScrollToSection("promocao")}>
              Promoção de Hoje!
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleScrollToSection("mais-vendidos")}
            >
              Os Mais Vendidos
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleScrollToSection("super-combos")}
            >
              Super Combos
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleScrollToSection("combos")}>
              Combos
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleScrollToSection("artesanal")}
            >
              Hambúrguer Artesanal{" "}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleScrollToSection("sorvetes")}>
              Sorvetes
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleScrollToSection("bebidas")}>
              Bebidas
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="">
          <h2 id="promocao" className="font-bold text-zinc-800 text-xl mb-2">
            Promoção de Hoje!
          </h2>
          <div className="flex flex-col gap-4">
            <Link href="/promocao/familia" passHref>
              <Card className="border-2 border-yellow-400 shadow-lg shadow-yellow-400 animate-scale-pulse relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer ">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Combo Família
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      2 Pizzas Grandes (Calabresa, Mussarela ou Toscana) + 1
                      Refri 2L à escolha
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 59,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 80,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Familia}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/promocao/festa" passHref>
              <Card className="border-2 border-yellow-400 shadow-lg shadow-yellow-400 animate-scale-pulse relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Mega Combo Festa
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      4 Pizzas Grandes (sabores à escolha) + 2 Refrigerantes de
                      2L
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 90,00
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 159,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Festa}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/combos/miniBurgers" passHref>
              <Card className="border-2 border-yellow-400 shadow-lg shadow-yellow-400 animate-scale-pulse  relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Mini Burgers no Brioche
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      🍔 Mini Burgers no Brioche – carne bovina suculenta +
                      cheddar derretido 🧀 🍟 Batata Cheddar & Bacon – fritas
                      crocantes + cheddar cremoso 🧡 + bacon triturado 🥓 +
                      cebolinha 🌱 🧅 Onion Rings – cebola empanada crocante +
                      molho cheddar 🧀
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 32,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 75,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={MiniBurgers}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <h2
            id="mais-vendidos"
            className="font-bold text-zinc-800 text-xl my-4"
          >
            Os Mais Vendidos
          </h2>
          <div className="flex flex-col gap-4">
            <Link href="/mais-vendidos/monstro" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Burger Monstro
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      pão com gergelim 🌟 + dupla de carnes smash 🥩🔥 + cheddar
                      derretido 🧀 + bacon crocante 🥓 + mac & cheese cremoso
                      🍝🧡 + temperinho verde 🌱
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 17,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 40,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Monstro}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/mais-vendidos/baconSalad" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Bacon Salad Burger
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      pão com gergelim ✨ + carne bovina 🥩 + queijo 🧀 + bacon
                      🥓 + alface 🥬 + molho cremoso 🤤 🍟 Porção de fritas
                      douradinhas 🥫 Molho American Burger pra turbinar o sabor
                      🧡
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 24,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 59,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={BaconSalad}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/mais-vendidos/fritasOverloaded" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Fritas Overloaded
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      batata crocante + cheddar cremoso 🧡 + bacon em tiras
                      suculentas 🥓 🥫 Molhos especiais: 🌿 Verde temperado | 🍯
                      Barbecue | 🧀 Cheddar/Maionese
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 16,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 39,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={FritasOverloaded}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/mais-vendidos/power" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Burger Power
                    </h3>
                    <p className="text-sm font-normal text-gray-500">
                      3 carnes smash 🥩🔥 + 3 queijos cheddar 🧀 + bacon
                      crocante 🥓 + 2 ovos fritos 🍳🍳 no brioche fofinho ✨{" "}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 21,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 45,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Power}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <h2
            id="super-combos"
            className="font-bold text-zinc-800 text-xl my-4"
          >
            Super Combos
          </h2>
          <div className="flex flex-col gap-3">
            <Link href="/supercombo/master" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Combo Master – A Casa Toda
                    </h3>
                    <p className="text-sm font-light text-gray-500 line-clamp-3">
                      1 Pizza Grande (sabor à escolha) 1 Hambúrguer Artesanal 🍔
                      1 Barca de Batata Cheddar e Bacon 🥓🧀 2 Esfihas (sabores
                      à escolha) 🥙 1 Refrigerante 2L 🥤 1 Açaí 500ml com 2
                      acompanhamentos grátis 🍫🍓🍌
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base text-green-500">R$ 84,00</span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 98,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Combo}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/supercombo/caixinha" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Caixinha Burger
                    </h3>
                    <p className="text-sm font-light text-gray-500 ">
                      6 mini burgers no brioche fofinho 🥩🧀 🍗 Franguinhos
                      crocantes empanados 🤎 🍟 Fritas cheddar & bacon
                      irresistíveis 🧀🥓
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base text-green-500">R$ 33,90</span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 59,00
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={CaixinhaBurger}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <h2 id="combos" className="font-bold text-zinc-800 text-xl my-4">
            Combos
          </h2>
          <div className="flex flex-col gap-4">
            <Link href="/combos/doubleCheeseburger" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Double Cheeseburger{" "}
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      2 carnes smash 🥩🔥 + cheddar derretido 🧀 + molho
                      especial 🥤 Guaraná geladinho 🟢 🍪 Cookie de sobremesa 🍫
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 19,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 39,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={DoubleCheeseburger}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/combos/duplo-bacon" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Smash Duplo + Bacon Burger{" "}
                    </h3>
                    <p className="text-sm font-normal text-gray-500">
                      🍔 Smash Duplo – duas carnes suculentas 🥩🔥 + cheddar
                      derretido 🧀 🍔 Bacon Burger – carne smash 🥩 + bacon
                      crocante 🥓 + cheddar 🧡{" "}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 23,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 39,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={DuploBurger}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/combos/doubleChicken" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Double Chicken Burger{" "}
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      2 filés de frango empanado crocante 🍗 + alface 🥬 +
                      tomate 🍅 + maionese cremosa 🤍 🥤 Coca-Cola gelada 🥶 🍪
                      Cookies doces na medida 🍫
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 19,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 45,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={DoubleChicken}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/combos/batata-frita" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Combo batata frita{" "}
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      Pague 1 leve 3
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 12,00
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 23,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={BatataFrita}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <h2 id="artesanal" className="font-bold text-zinc-800 text-xl my-4">
            Hambúrguer Artesanal
          </h2>
          <div className="flex flex-col gap-4">
            <Link href="/artesanal/chespy" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Rafa&apos;s Chespy Bacon
                    </h3>
                    <p className="text-sm font-normal text-gray-500 line-clamp-3">
                      2 Adicionais Grátis
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 23,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 45,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Chespy}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/artesanal/tripleBacon" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Rafa&apos;s Triple Bacon
                    </h3>
                    <p className="text-sm font-normal text-gray-500 line-clamp-3">
                      2 Adicionais Grátis
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 19,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 59,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={TripleBacon}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/artesanal/salada" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Rafa&apos;s Salada
                    </h3>
                    <p className="text-sm font-normal text-gray-500 line-clamp-3">
                      2 Adicionais Grátis
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 19,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 39,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Salada}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/artesanal/doubleSmash" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Double Bacon Smash
                    </h3>
                    <p className="text-sm font-normal text-gray-500 line-clamp-3">
                      2 Adicionais Grátis
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 19,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 45,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={DoubleBacon}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/artesanal/cheddar" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Rafa&apos;s Cheddar
                    </h3>
                    <p className="text-sm font-normal text-gray-500 line-clamp-3">
                      2 Adicionais Grátis
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 23,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 34,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Cheddar}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/artesanal/gorgonzola" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Rafa&apos;s Gorgonzola Melt
                    </h3>
                    <p className="text-sm font-normal text-gray-500 line-clamp-3">
                      2 Adicionais Grátis
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 21,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 38,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Gorgonzola}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/artesanal/picanha" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Rafa&apos;s Picanha
                    </h3>
                    <p className="text-sm font-normal text-gray-500 line-clamp-3">
                      2 Adicionais Grátis
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 19,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 47,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Picanha}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/artesanal/brigadeiro" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Rafa&apos;s Brigadeiro
                    </h3>
                    <p className="text-sm font-normal text-gray-500 line-clamp-3">
                      2 Adicionais Grátis
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 19,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 28,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Brigadeiro}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/artesanal/moda-casa" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Rafa&apos;s Moda da Casa
                    </h3>
                    <p className="text-sm font-normal text-gray-500 line-clamp-3">
                      2 Adicionais Grátis
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 24,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 49,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={ModaCasa}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/artesanal/chicken" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Chicken Burger
                    </h3>
                    <p className="text-sm font-normal text-gray-500 line-clamp-3">
                      2 Adicionais Grátis
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 24,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 49,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Chicken}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/artesanal/barca" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      BARCA CHEDDAR BOAT{" "}
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      2 lanches duplos no pão brioche Piscina de cheddar cremoso
                      Farofa de bacon por todo lado E batata pra fechar o combo
                      com chave de ouro.. SERVE 2 PESSOAS{" "}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 24,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 49,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Barca}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <h2 id="sorvetes" className="font-bold text-zinc-800 text-xl my-4">
            Sorvetes
          </h2>
          <div className="flex flex-col gap-4">
            <Link href="/sorvetes/pequeno" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Açaí 300ml
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      A porção perfeita para quem quer se refrescar com muito
                      sabor! Cremoso, geladinho e com adicionais grátis 🍌🍫🥜
                      para você montar do seu jeito. 👉 Dica: leve 2 e garanta
                      ainda mais sabor por um preço que cabe no bolso!
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 10,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={PequenoMedio}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/sorvetes/medio" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Açaí 500ml
                    </h3>
                    <p className="text-sm font-normal text-gray-500 ">
                      Nosso tamanho mais pedido! A porção ideal para matar a
                      fome com muito sabor, super cremoso e com adicionais
                      grátis 🍌🍫🥜 pra você montar a combinação perfeita. 👉
                      Peça 2 de 500ml e tenha o combo perfeito pra compartilhar!
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 16,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={PequenoMedio}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/sorvetes/grande" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Açaí 700ml
                    </h3>
                    <p className="text-sm font-normal text-gray-500">
                      Uma explosão de sabor e fartura! Açaí cremoso, geladinho,
                      servido em grande estilo, com adicionais grátis 🍌🍓🍫🥜
                      pra você montar do seu jeito.
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 23,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={Grande}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/sorvetes/barca" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Barca de Açaí
                    </h3>
                    <p className="text-sm font-normal text-gray-500">
                      Uma explosão de sabor e fartura! Açaí cremoso, geladinho,
                      servido em grande estilo, com adicionais grátis 🍌🍓🍫🥜
                      pra você montar do seu jeito. 👉 Ideal para compartilhar
                      com a galera ou se deliciar sozinho(a) sem pressa!
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-green-700">
                        R$ 27,90
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-1 ml-4">
                  <div className="overflow-hidden rounded-lg w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30">
                    <div className="lazyload-wrapper w-full h-full">
                      <Image
                        src={BarcaAcai}
                        alt="Compre 12 Esfihas com [15% off]"
                        className="bg-gray-100 object-cover object-center w-28 h-28 lg:w-32 lg:h-32 sm:w-30 sm:h-30 block"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <h2 id="bebidas" className="font-bold text-zinc-800 text-xl mt-2">
            Bebidas
          </h2>
          <p className="text-zinc-600 text-md mb-2">
            Selecione as bebidas que você quer e clique no botão de
            &quot;Adicionar Bebida Selecionada&quot;.
          </p>
          <Bebidas />
        </div>

        {/* Comentarios */}
        <Coments />
      </div>
      {/* Botão flutuante "Ver sacola" */}
      {/* Botão flutuante "Ver sacola" */}
      {/* Botão flutuante "Ver sacola" */}
      {cartSummary && cartSummary.count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center justify-between w-full p-4 bg-yellow-400 text-black rounded-lg shadow-lg">
                <div className="relative">
                  <ShoppingBag size={24} />
                  <div className="absolute -top-1 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cartSummary.count}
                  </div>
                </div>
                <span className="font-bold text-xl">Ver sacola</span>
                <span className="font-bold text-xl">
                  R$ {cartSummary.totalPrice}
                </span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="w-full h-full p-0">
              <CartSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
            </SheetContent>
          </Sheet>
        </div>
      )}
    </section>
  );
}
