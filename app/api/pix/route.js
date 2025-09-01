import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { totalAmount, client, orderItems } = await req.json();

    if (
      !totalAmount ||
      !client ||
      !client.name ||
      !client.email ||
      !client.document
    ) {
      return NextResponse.json(
        { error: "Dados do cliente incompletos." },
        { status: 400 }
      );
    }

    // Limpa os campos de telefone e documento, removendo todos os caracteres não-dígitos
    const cleanedDocument = client.document.replace(/\D/g, "");
    const cleanedPhone = client.phone.replace(/\D/g, "");

    const callbackUrl = `${req.nextUrl.origin}/api/webhook/ninjapay`;

    const ninjapayBody = {
      identifier: `pedido-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`,
      amount: parseFloat(totalAmount),
      client: {
        name: client.name,
        email: client.email,
        phone: cleanedPhone, // Usa o número limpo
        document: cleanedDocument, // Usa o documento limpo
      },
      callbackUrl: callbackUrl,
    };

    const response = await fetch(
      "https://app.ninjapaybr.com/api/v1/gateway/pix/receive",
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
    console.log("Resposta completa da NinjaPay:", data);

    if (!response.ok) {
      console.error("Erro na requisição da NinjaPay:", data);
      return NextResponse.json(
        { error: "Falha ao gerar o Pix. Tente novamente." },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro interno no servidor." },
      { status: 500 }
    );
  }
}
