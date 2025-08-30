import { NextResponse } from "next/server";
import crypto from "crypto";
import { headers } from "next/headers";

// Função para gerar o hash SHA256 dos dados para anonimato, conforme exigido pelo Facebook
const hash = (value) => {
  return crypto.createHash("sha256").update(value).digest("hex");
};

export async function POST(req) {
  try {
    const body = await req.json();

    // 1. Verificar se o evento é de uma transação paga
    if (
      body.event === "TRANSACTION_PAID" &&
      body.transaction.status === "COMPLETED"
    ) {
      console.log("Webhook de pagamento recebido com sucesso.");

      const { transaction, client, orderItems } = body;

      // Obtém o cabeçalho do user-agent e o IP do cliente
      const userAgent = headers().get("user-agent");
      const clientIp = req.ip || headers().get("x-forwarded-for");

      const eventData = {
        // ID único da transação
        event_id: transaction.id,
        // Nome do evento que será enviado para o Facebook
        event_name: "Purchase",
        // Horário do evento (em segundos desde a época Unix)
        event_time: Math.floor(Date.now() / 1000),
        // URL da página onde a compra ocorreu (a homepage, no seu caso)
        event_source_url: `${req.nextUrl.origin}/`,
        // Adicionando a fonte da ação para melhor atribuição
        action_source: "website",
        // Parâmetros do usuário (hasheado para privacidade)
        user_data: {
          // Envia o email e telefone como um array, seguindo a documentação
          em: client.email ? [hash(client.email)] : undefined,
          ph: client.phone
            ? [hash(client.phone.replace(/\D/g, ""))]
            : undefined,
          fn: client.name ? hash(client.name.split(" ")[0]) : undefined,
          ln: client.name
            ? hash(client.name.split(" ").slice(1).join(" "))
            : undefined,
          // Inclui o IP e o User-Agent para melhorar a correspondência
          client_ip_address: clientIp,
          client_user_agent: userAgent,
        },
        // Dados personalizados da conversão
        custom_data: {
          value: transaction.amount,
          currency: transaction.currency,
          content_ids: orderItems.map((item) => item.product.externalId),
          content_type: "product",
          contents: orderItems.map((item) => ({
            id: item.product.externalId,
            quantity: 1,
            item_price: item.price,
          })),
        },
      };

      // 2. Enviar o evento para o Facebook via API de Conversões
      const facebookResponse = await fetch(
        `https://graph.facebook.com/v19.0/${process.env.FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: [eventData] }),
        }
      );

      const facebookData = await facebookResponse.json();

      if (!facebookResponse.ok) {
        console.error("Erro ao enviar evento para o Facebook:", facebookData);
        return NextResponse.json(
          { error: "Falha ao enviar evento para o Facebook." },
          { status: 500 }
        );
      }

      console.log(
        "Evento de compra enviado para o Facebook com sucesso:",
        facebookData
      );

      // Retornar 200 OK para a NinjaPay
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      // Ignorar outros eventos (TRANSACTION_CREATED, CANCELED, etc.)
      console.log(
        `Webhook recebido, mas o evento não é de pagamento concluído. Evento: ${body.event}`
      );
      return NextResponse.json(
        { success: true, message: "Evento não processado." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Erro no servidor do webhook:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro interno no servidor do webhook." },
      { status: 500 }
    );
  }
}
