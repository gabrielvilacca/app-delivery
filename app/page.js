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
      totalValor += item.valorTotal;
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
  }, []); // Use [] se o localStorage não muda, ou uma variável de estado que o atualize

  return (
    <section className="relative w-full bg-[#f4f5f7]">
      <Hero />
      <div className="flex flex-col p-4 gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-between items-center h-12 p-2 bg-white w-full rounded border border-border hover:bg-slate-100 duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-zinc-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <span className="font-semibold text-zinc-600 text-sm">
              Calcular taxa e tempo de entrega
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-zinc-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Como você quer receber o pedido?
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Entrega</DropdownMenuItem>
            <DropdownMenuItem>Retirada</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex flex-col p-3 bg-black/90 text-white border space-y-3 rounded-md">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <div class="p-2 rounded-full bg-yellow-400 shadow-lg text-black shadow-yellow-500/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
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
            <span class="text-lg font-medium ">Promoção de Inuguração</span>{" "}
          </div>
          <div class="flex flex-col flex-1 space-y-2">
            <span class=" text-md">
              <span class="font-medium">15% de desconto</span> em qualquer combo
              ou lanche!
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
            <DropdownMenuItem>Promoção de Hoje!</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Os Mais Vendidos</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Super Combos</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Do Seu Jeitinho</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Bebidas</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="">
          <h2 className="font-bold text-zinc-800 text-xl mb-2">Super Combos</h2>
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

            <Link href="/supercombo/familia" passHref>
              <Card className="border border-border relative flex flex-row w-full h-full p-2 min-h-28 cursor-pointer">
                <div className="flex flex-col justify-between flex-1 p-2">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6 text-gray-700 line-clamp-2">
                      Combo Familia – A Casa Toda
                    </h3>
                    <p className="text-sm font-light text-gray-500 line-clamp-3">
                      2 Pizzas Grandes (sabores à escolha), 4 Hambúrgueres
                      Artesanais, 1 Barca de Batata Cheddar e Bacon, 2
                      Refrigerantes de 2L
                    </p>
                  </div>
                  <div className="mt-3 md:mt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base text-green-500">
                        R$ 149,90
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        R$ 259,00
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
          </div>
        </div>
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
