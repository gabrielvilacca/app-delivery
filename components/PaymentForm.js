"use client";

import { useEffect, useState } from "react";
import { Copy, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PixDisplay } from "./PixDisplay"; // Importa o componente para exibir o Pix

export const PaymentForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    address: {
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "BR",
    },
  });
  const [pixData, setPixData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const carrinhoSalvo = JSON.parse(
        localStorage.getItem("carrinho") || "[]"
      );
      setCartItems(carrinhoSalvo);
    } catch (err) {
      console.error("Falha ao carregar o carrinho do localStorage:", err);
    }
  }, []);

  useEffect(() => {
    let pollingInterval;

    if (pixData?.transactionId) {
      pollingInterval = setInterval(async () => {
        try {
          const response = await fetch(
            `/api/check-payment-status?transactionId=${pixData.transactionId}`
          );
          const data = await response.json();

          if (data.confirmed) {
            setIsPaymentConfirmed(true);
            clearInterval(pollingInterval);
            console.log(
              "Pagamento confirmado! O botão de rastreamento será exibido."
            );
          }
        } catch (err) {
          console.error("Erro no polling de pagamento:", err);
        }
      }, 3000);
    }

    return () => clearInterval(pollingInterval);
  }, [pixData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (cartItems.length === 0) {
      setError("Seu carrinho está vazio. Adicione produtos para continuar.");
      setIsLoading(false);
      return;
    }

    const orderItems = cartItems.map((item) => ({
      name: item.nome,
      quantity: item.quantidade,
      price: parseFloat(item.valorTotal),
    }));
    const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

    const payload = {
      totalAmount,
      client: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        document: formData.document,
      },
      orderItems,
    };

    try {
      const response = await fetch("/api/pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha na requisição. Tente novamente.");
      }

      setPixData({
        pixCode: data.pix.code,
        transactionId: data.transactionId,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {pixData ? (
        <PixDisplay
          pixData={pixData}
          onPaymentConfirmed={() => router.push("/track-order")}
        />
      ) : (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {step === 1 ? (
            <>
              <h3 className="text-xl font-bold text-center text-zinc-800">
                Seus dados para o pedido
              </h3>
              <p className="text-sm text-center text-gray-500">
                Precisamos de algumas informações para processar sua compra.
              </p>
              {error && <p className="text-red-500 text-center">{error}</p>}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CPF ou CNPJ
                  </label>
                  <input
                    type="text"
                    name="document"
                    value={formData.document}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Próximo passo <ArrowRight size={16} className="ml-2" />
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-center text-zinc-800">
                Onde devemos entregar?
              </h3>
              <p className="text-sm text-center text-gray-500">
                Seu endereço de entrega é importante para o motoboy.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CEP
                  </label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Rua
                    </label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Número
                    </label>
                    <input
                      type="text"
                      name="address.number"
                      value={formData.address.number}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Complemento
                  </label>
                  <input
                    type="text"
                    name="address.complement"
                    value={formData.address.complement}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bairro
                    </label>
                    <input
                      type="text"
                      name="address.neighborhood"
                      value={formData.address.neighborhood}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Gerar QR Code Pix"
                )}
              </Button>
            </>
          )}
        </form>
      )}
    </div>
  );
};
