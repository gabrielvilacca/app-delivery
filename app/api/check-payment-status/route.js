import { NextResponse } from "next/server";

// ESTE OBJETO É UM ARMAZENAMENTO TEMPORÁRIO E NÃO É INDICADO PARA PRODUÇÃO.
// Dados serão perdidos se o servidor for reiniciado.
const confirmedPayments = {};

// Função para ser chamada pelo webhook para "salvar" a confirmação
export function setPaymentConfirmed(transactionId) {
  confirmedPayments[transactionId] = true;
  console.log(`Pagamento confirmado e registrado: ${transactionId}`);
}

// Rota de API para o frontend checar o status do pagamento
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get("transactionId");

  if (!transactionId) {
    return NextResponse.json(
      { error: "ID da transação não fornecido." },
      { status: 400 }
    );
  }

  const isConfirmed = confirmedPayments[transactionId] === true;
  return NextResponse.json({ confirmed: isConfirmed }, { status: 200 });
}

// ATENÇÃO: É necessário exportar a função `setPaymentConfirmed`
// para que o seu webhook possa acessá-la.
