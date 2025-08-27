"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CardForm = () => {
  // Estado para controlar as etapas do formulário
  const [step, setStep] = useState(1);
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
    card: {
      number: "",
      owner: "",
      expiresAt: "",
      cvv: "",
    },
    installments: 1,
  });
  const [transactionData, setTransactionData] = useState(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Lida com campos aninhados (address e card)
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

  const handleInstallmentsChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      installments: Number(e.target.value),
    }));
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

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.valorTotal,
      0
    );
    const orderItems = cartItems.map((item) => ({
      name: item.nome,
      quantity: item.quantidade,
      price: item.valorTotal,
    }));

    // Formata a data de validade para AAAA-MM
    const [month, year] = formData.card.expiresAt.split("/");
    const formattedExpiresAt = `20${year}-${month}`;

    try {
      const response = await fetch("/api/processar-cartao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount,
          client: formData, // Inclui todos os dados do cliente e endereço
          card: {
            ...formData.card,
            expiresAt: formattedExpiresAt,
          },
          installments: formData.installments,
          orderItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Falha na transação. Verifique os dados e tente novamente."
        );
      }

      setTransactionData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Redireciona o usuário para a página track-order após a transação
  if (transactionData) {
    window.location.href = "/track-order";
    return (
      <div className="flex flex-col items-center text-center p-4">
        <h3 className="text-xl font-bold text-green-600 mb-4">
          Redirecionando para o rastreamento do pedido...
        </h3>
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* Etapas do formulário */}
      {step === 1 && (
        // Etapa 1: Dados do Cliente
        <>
          <h3 className="text-xl font-bold text-center text-zinc-800">
            Dados do Cliente
          </h3>
          <p className="text-sm text-center text-gray-500">
            Preencha seus dados pessoais.
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
      )}

      {step === 2 && (
        // Etapa 2: Endereço de Entrega
        <>
          <h3 className="text-xl font-bold text-center text-zinc-800">
            Endereço de Entrega
          </h3>
          <p className="text-sm text-center text-gray-500">
            Preencha os dados para a entrega.
          </p>
          {error && <p className="text-red-500 text-center">{error}</p>}
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
          <div className="flex flex-col justify-between space-y-4">
            <Button
              type="button"
              onClick={() => setStep(3)}
              className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Próximo passo <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button
              type="button"
              onClick={() => setStep(1)}
              variant="outline"
              className="w-full py-4 text-black border-yellow-400 font-bold rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" /> Voltar
            </Button>
          </div>
        </>
      )}

      {step === 3 && (
        // Etapa 3: Dados do Cartão
        <>
          <h3 className="text-xl font-bold text-center text-zinc-800">
            Dados do Cartão de Crédito
          </h3>
          <p className="text-sm text-center text-gray-500">
            Suas informações de pagamento são seguras.
          </p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número do Cartão
              </label>
              <input
                type="text"
                name="card.number"
                value={formData.card.number}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome do Titular
              </label>
              <input
                type="text"
                name="card.owner"
                value={formData.card.owner}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Validade (MM/YY)
                </label>
                <input
                  type="text"
                  name="card.expiresAt"
                  value={formData.card.expiresAt}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="card.cvv"
                  value={formData.card.cvv}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número de Parcelas
              </label>
              <select
                name="installments"
                value={formData.installments}
                onChange={handleInstallmentsChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <option key={i} value={i}>
                    {i}x
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Finalizar Pagamento com Cartão"
              )}
            </Button>
            <Button
              type="button"
              onClick={() => setStep(2)}
              variant="outline"
              className="w-full py-4 text-black border-yellow-400 font-bold rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" /> Voltar
            </Button>
          </div>
        </>
      )}
    </form>
  );
};
