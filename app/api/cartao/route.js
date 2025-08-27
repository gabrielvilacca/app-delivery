// app/api/processar-cartao/route.js

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Receber os dados do cliente e do cartão do frontend
    const { totalAmount, client, card, installments, orderItems } =
      await req.json();

    // 2. Obter o IP do cliente a partir dos headers da requisição
    const clientIp = req.headers.get("x-forwarded-for") || req.ip;

    // Adicionando um log para depuração
    console.log("Dados recebidos do frontend:", {
      totalAmount,
      client,
      card,
      installments,
      orderItems,
      clientIp,
    });

    // 3. Montar o corpo da requisição para o gateway
    const ninjapayBody = {
      identifier: `pedido-cartao-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`,
      amount: totalAmount,
      client: {
        name: client.name,
        email: client.email,
        phone: client.phone,
        document: client.document,
        address: client.address,
      },
      clientIp: clientIp, // IP do cliente para a transação
      card: {
        number: card.number,
        owner: card.owner,
        expiresAt: card.expiresAt,
        cvv: card.cvv,
      },
    };

    // 4. Fazer a requisição para a API da NinjaPay
    const response = await fetch(
      "https://app.ninjapaybr.com/api/v1/gateway/card/receive",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-public-key": process.env.NINJAPAY_PUBLIC_KEY,
          "x-secret-key": process.env.NINJAPAY_SECRET_KEY,
        },
        body: JSON.stringify(ninjapayBody),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro na requisição da NinjaPay (Cartão):", data);
      return NextResponse.json(
        { error: "Falha no processamento do cartão. Tente novamente." },
        { status: response.status }
      );
    }

    // 5. Retornar a resposta da API para o frontend
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro interno no servidor." },
      { status: 500 }
    );
  }
}
