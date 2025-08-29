"use client";

import { ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PaymentForm } from "./PaymentForm";
import { CardForm } from "./CardForm";

export const CartSheet = ({ open, onOpenChange }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    if (open) {
      try {
        const carrinhoSalvo = JSON.parse(
          localStorage.getItem("carrinho") || "[]"
        );
        setCarrinho(carrinhoSalvo);
      } catch (error) {
        console.error("Falha ao carregar o carrinho do localStorage:", error);
        setCarrinho([]);
      }
    }
  }, [open]);

  useEffect(() => {
    let newSubtotal = 0;
    carrinho.forEach((item) => {
      newSubtotal += parseFloat(item.valorTotal);
    });
    setSubtotal(newSubtotal);
  }, [carrinho]);

  const handleRemoveItem = (indexToRemove) => {
    const newCarrinho = carrinho.filter((_, index) => index !== indexToRemove);
    setCarrinho(newCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(newCarrinho));
  };

  const getDialogContent = () => {
    switch (paymentMethod) {
      case "pix":
        return <PaymentForm />;
      case "card":
        return <CardForm />;
      default:
        return (
          <>
            <DialogDescription>
              Selecione como você gostaria de pagar o seu pedido.
            </DialogDescription>
            <div className="grid gap-4 py-4">
              <button
                onClick={() => setPaymentMethod("pix")}
                className="w-full bg-black text-yellow-400 font-bold py-3 rounded-md hover:bg-black/80 transition-colors"
              >
                Pix
              </button>
              <button
                onClick={() => setPaymentMethod("card")}
                className="w-full bg-black text-yellow-400 font-bold py-3 rounded-md hover:bg-black/80 transition-colors"
              >
                Cartão de Crédito
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f5f7]">
      <div className="flex justify-between items-center bg-white p-4 border-b">
        <h2 className="text-xl font-bold">Imperio dos Combos</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-700">Sua sacola</h2>
        </div>
        {carrinho.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <ShoppingBag size={48} className="mx-auto" />
            <p className="mt-4">Sua sacola está vazia.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {carrinho.map((item, index) => (
              <div
                key={index}
                className="bg-white text-gray-500 border border-border rounded-lg p-4 flex gap-4 items-center"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.quantidade}x {item.nome}
                  </h3>
                </div>

                <span className="font-semibold">
                  R$ {parseFloat(item.valorTotal).toFixed(2).replace(".", ",")}
                </span>

                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 font-semibold text-red-800 text-lg cursor-pointer"
          >
            Adicionar mais itens{" "}
          </button>{" "}
        </div>
      </div>

      <div className="p-4 bg-white border-t space-y-2 text-gray-700">
        <div className="flex justify-between font-semibold text-sm">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Taxa de entrega</span>
          <span className="text-green-800 font-medium">
            {" "}
            Gratuita de Lançamento
          </span>
        </div>
        <div className="flex justify-between font-bold text-xl mt-4">
          <span>Total</span>
          <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
        </div>

        <Dialog onOpenChange={() => setPaymentMethod(null)}>
          <DialogTrigger asChild>
            <button className="mt-4 w-full py-4 text-black bg-yellow-400 rounded-lg font-bold text-xl hover:bg-yellow-600 transition-colors">
              Finalizar compra
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Finalizar Pedido</DialogTitle>
            </DialogHeader>
            {getDialogContent()}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
